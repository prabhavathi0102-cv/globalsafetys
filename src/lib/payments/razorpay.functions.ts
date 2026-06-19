import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createHmac, timingSafeEqual } from "crypto";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const CustomerSchema = z.object({
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().max(150).optional().default(""),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().regex(/^[0-9+\-\s()]{7,20}$/, "Invalid phone"),
  address: z.string().trim().max(500).optional().default(""),
});

const CreateOrderSchema = z.object({
  product: z.string().trim().min(1).max(200),
  amount: z.number().positive().max(10_000_000), // rupees
  customer: CustomerSchema,
});

function razorpayAuthHeader() {
  const id = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!id || !secret) throw new Error("Razorpay keys not configured");
  return "Basic " + Buffer.from(`${id}:${secret}`).toString("base64");
}

export const createRazorpayOrder = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => CreateOrderSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Reserve invoice number
    const { data: invRows, error: invErr } = await supabaseAdmin.rpc("next_invoice_no" as never);
    if (invErr || !invRows) {
      console.error("invoice_no error", invErr);
      throw new Error("Could not allocate invoice number");
    }
    const invoiceNo = String(invRows);

    const amountPaise = Math.round(data.amount * 100);

    const orderRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: razorpayAuthHeader(),
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: "INR",
        receipt: invoiceNo,
        notes: {
          product: data.product,
          customer_name: data.customer.name,
          company: data.customer.company,
          email: data.customer.email,
          phone: data.customer.phone,
        },
      }),
    });

    const orderJson = (await orderRes.json().catch(() => ({}))) as {
      id?: string;
      error?: { description?: string };
    };
    if (!orderRes.ok || !orderJson.id) {
      console.error("Razorpay order error", orderRes.status, orderJson);
      throw new Error(orderJson.error?.description || "Razorpay order creation failed");
    }

    const { error: insErr } = await supabaseAdmin.from("payments").insert({
      invoice_no: invoiceNo,
      razorpay_order_id: orderJson.id,
      status: "created",
      amount: data.amount,
      currency: "INR",
      product: data.product,
      customer_name: data.customer.name,
      company_name: data.customer.company || null,
      email: data.customer.email,
      phone: data.customer.phone,
      address: data.customer.address || null,
    });
    if (insErr) {
      console.error("payments insert error", insErr);
      throw new Error("Could not save payment record");
    }

    return {
      orderId: orderJson.id,
      keyId: process.env.RAZORPAY_KEY_ID!,
      invoiceNo,
      amount: amountPaise,
      currency: "INR",
    };
  });

const VerifySchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

export const verifyRazorpayPayment = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => VerifySchema.parse(input))
  .handler(async ({ data }) => {
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) throw new Error("Razorpay not configured");

    const expected = createHmac("sha256", secret)
      .update(`${data.razorpay_order_id}|${data.razorpay_payment_id}`)
      .digest("hex");

    const a = Buffer.from(expected);
    const b = Buffer.from(data.razorpay_signature);
    const ok = a.length === b.length && timingSafeEqual(a, b);
    if (!ok) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      await supabaseAdmin
        .from("payments")
        .update({ status: "failed", error_reason: "Signature mismatch" })
        .eq("razorpay_order_id", data.razorpay_order_id);
      throw new Error("Payment signature verification failed");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: updated, error } = await supabaseAdmin
      .from("payments")
      .update({
        status: "paid",
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_signature: data.razorpay_signature,
        error_reason: null,
      })
      .eq("razorpay_order_id", data.razorpay_order_id)
      .select()
      .maybeSingle();
    if (error || !updated) {
      console.error("payments update error", error);
      throw new Error("Could not update payment");
    }

    // Best-effort side effects (do not fail user on these)
    try {
      await appendToSheet(updated);
    } catch (e) {
      console.error("sheet append failed", e);
    }
    try {
      await sendConfirmationEmail(updated);
    } catch (e) {
      console.error("email send failed", e);
    }

    return {
      ok: true as const,
      invoiceNo: updated.invoice_no,
      paymentId: data.razorpay_payment_id,
    };
  });

const FailSchema = z.object({
  razorpay_order_id: z.string().min(1),
  reason: z.string().trim().max(500).optional().default("Payment failed"),
});

export const recordRazorpayFailure = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => FailSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin
      .from("payments")
      .update({ status: "failed", error_reason: data.reason })
      .eq("razorpay_order_id", data.razorpay_order_id)
      .eq("status", "created");
    return { ok: true as const };
  });

export const listPayments = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: roleRow } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) throw new Error("Forbidden");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("payments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1000);
    if (error) throw error;
    return { payments: data ?? [] };
  });

// ---- helpers ----

type PaymentRow = {
  invoice_no: string;
  razorpay_order_id: string;
  razorpay_payment_id: string | null;
  amount: number;
  currency: string;
  product: string;
  customer_name: string;
  company_name: string | null;
  email: string;
  phone: string;
  address: string | null;
  status: string;
};

async function appendToSheet(row: PaymentRow) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "payment",
      timestamp: new Date().toISOString(),
      invoice_no: row.invoice_no,
      reference_number: row.invoice_no,
      razorpay_order_id: row.razorpay_order_id,
      razorpay_payment_id: row.razorpay_payment_id,
      status: row.status,
      amount: row.amount,
      currency: row.currency,
      product: row.product,
      customer_name: row.customer_name,
      name: row.customer_name,
      company_name: row.company_name,
      company: row.company_name,
      email: row.email,
      mobile: row.phone,
      phone: row.phone,
      address: row.address,
    }),
    redirect: "follow",
  });
}

async function sendConfirmationEmail(row: PaymentRow) {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  if (!lovableKey || !resendKey) {
    // Email is optional; skip silently when not configured.
    return;
  }
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:auto;padding:24px;border:1px solid #eee;border-radius:12px;">
      <h2 style="color:#b91c1c;margin:0 0 8px;">Payment Received</h2>
      <p>Dear ${escapeHtml(row.customer_name)},</p>
      <p>Thank you for your payment to <strong>Global Safety Enterprises (P) Ltd</strong>.</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        <tr><td style="padding:6px 0;color:#555;">Invoice No</td><td style="padding:6px 0;"><strong>${escapeHtml(row.invoice_no)}</strong></td></tr>
        <tr><td style="padding:6px 0;color:#555;">Product / Service</td><td style="padding:6px 0;">${escapeHtml(row.product)}</td></tr>
        <tr><td style="padding:6px 0;color:#555;">Amount</td><td style="padding:6px 0;"><strong>₹ ${Number(row.amount).toLocaleString("en-IN")}</strong></td></tr>
        <tr><td style="padding:6px 0;color:#555;">Payment ID</td><td style="padding:6px 0;font-family:monospace;font-size:12px;">${escapeHtml(row.razorpay_payment_id || "")}</td></tr>
      </table>
      <p style="color:#555;font-size:13px;">A GST invoice will be sent separately. For any queries, reach us at +91 98406 55558.</p>
    </div>`;
  await fetch("https://connector-gateway.lovable.dev/resend/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": resendKey,
    },
    body: JSON.stringify({
      from: "Global Safety Enterprises <onboarding@resend.dev>",
      to: [row.email],
      subject: `Payment received — Invoice ${row.invoice_no}`,
      html,
    }),
  });
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!),
  );
}
