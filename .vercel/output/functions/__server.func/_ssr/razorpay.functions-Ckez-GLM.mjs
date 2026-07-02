import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { n as objectType, r as stringType, t as numberType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-QP6BYy5L.mjs";
import { createHmac, timingSafeEqual } from "crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/razorpay.functions-Ckez-GLM.js
var CustomerSchema = objectType({
	name: stringType().trim().min(1).max(120),
	company: stringType().trim().max(150).optional().default(""),
	email: stringType().trim().email().max(255),
	phone: stringType().trim().regex(/^[0-9+\-\s()]{7,20}$/, "Invalid phone"),
	address: stringType().trim().max(500).optional().default("")
});
var CreateOrderSchema = objectType({
	product: stringType().trim().min(1).max(200),
	amount: numberType().positive().max(1e7),
	customer: CustomerSchema
});
function razorpayAuthHeader() {
	const id = process.env.RAZORPAY_KEY_ID;
	const secret = process.env.RAZORPAY_KEY_SECRET;
	if (!id || !secret) throw new Error("Razorpay keys not configured");
	return "Basic " + Buffer.from(`${id}:${secret}`).toString("base64");
}
var createRazorpayOrder_createServerFn_handler = createServerRpc({
	id: "4ada7f861624c4f58d49271efc9395ed8d752e76baca56080b8ee75529fd11b2",
	name: "createRazorpayOrder",
	filename: "src/lib/payments/razorpay.functions.ts"
}, (opts) => createRazorpayOrder.__executeServer(opts));
var createRazorpayOrder = createServerFn({ method: "POST" }).inputValidator((input) => CreateOrderSchema.parse(input)).handler(createRazorpayOrder_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-D1oHePJa.mjs");
	const { data: invRows, error: invErr } = await supabaseAdmin.rpc("next_invoice_no");
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
			Authorization: razorpayAuthHeader()
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
				phone: data.customer.phone
			}
		})
	});
	const orderJson = await orderRes.json().catch(() => ({}));
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
		address: data.customer.address || null
	});
	if (insErr) {
		console.error("payments insert error", insErr);
		throw new Error("Could not save payment record");
	}
	return {
		orderId: orderJson.id,
		keyId: process.env.RAZORPAY_KEY_ID,
		invoiceNo,
		amount: amountPaise,
		currency: "INR"
	};
});
var VerifySchema = objectType({
	razorpay_order_id: stringType().min(1),
	razorpay_payment_id: stringType().min(1),
	razorpay_signature: stringType().min(1)
});
var verifyRazorpayPayment_createServerFn_handler = createServerRpc({
	id: "03a47993cfaf4779f6f57da554b09ec9afec88ca5e46f35ac2ef975e070f90b9",
	name: "verifyRazorpayPayment",
	filename: "src/lib/payments/razorpay.functions.ts"
}, (opts) => verifyRazorpayPayment.__executeServer(opts));
var verifyRazorpayPayment = createServerFn({ method: "POST" }).inputValidator((input) => VerifySchema.parse(input)).handler(verifyRazorpayPayment_createServerFn_handler, async ({ data }) => {
	const secret = process.env.RAZORPAY_KEY_SECRET;
	if (!secret) throw new Error("Razorpay not configured");
	const expected = createHmac("sha256", secret).update(`${data.razorpay_order_id}|${data.razorpay_payment_id}`).digest("hex");
	const a = Buffer.from(expected);
	const b = Buffer.from(data.razorpay_signature);
	if (!(a.length === b.length && timingSafeEqual(a, b))) {
		const { supabaseAdmin } = await import("./client.server-D1oHePJa.mjs");
		await supabaseAdmin.from("payments").update({
			status: "failed",
			error_reason: "Signature mismatch"
		}).eq("razorpay_order_id", data.razorpay_order_id);
		throw new Error("Payment signature verification failed");
	}
	const { supabaseAdmin } = await import("./client.server-D1oHePJa.mjs");
	const { data: updated, error } = await supabaseAdmin.from("payments").update({
		status: "paid",
		razorpay_payment_id: data.razorpay_payment_id,
		razorpay_signature: data.razorpay_signature,
		error_reason: null
	}).eq("razorpay_order_id", data.razorpay_order_id).select().maybeSingle();
	if (error || !updated) {
		console.error("payments update error", error);
		throw new Error("Could not update payment");
	}
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
		ok: true,
		invoiceNo: updated.invoice_no,
		paymentId: data.razorpay_payment_id
	};
});
var FailSchema = objectType({
	razorpay_order_id: stringType().min(1),
	reason: stringType().trim().max(500).optional().default("Payment failed")
});
var recordRazorpayFailure_createServerFn_handler = createServerRpc({
	id: "648f1e9e127dbc761c38481b315e37994d02a3c6f477350d8fa683ab8b25ab8f",
	name: "recordRazorpayFailure",
	filename: "src/lib/payments/razorpay.functions.ts"
}, (opts) => recordRazorpayFailure.__executeServer(opts));
var recordRazorpayFailure = createServerFn({ method: "POST" }).inputValidator((input) => FailSchema.parse(input)).handler(recordRazorpayFailure_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-D1oHePJa.mjs");
	await supabaseAdmin.from("payments").update({
		status: "failed",
		error_reason: data.reason
	}).eq("razorpay_order_id", data.razorpay_order_id).eq("status", "created");
	return { ok: true };
});
var listPayments_createServerFn_handler = createServerRpc({
	id: "1e60f1d85a98a5e5ff8ee03e1fb8f43402addf7b103ab2b0cd1caa901fdf830c",
	name: "listPayments",
	filename: "src/lib/payments/razorpay.functions.ts"
}, (opts) => listPayments.__executeServer(opts));
var listPayments = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listPayments_createServerFn_handler, async ({ context }) => {
	const { data: roleRow } = await context.supabase.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
	if (!roleRow) throw new Error("Forbidden");
	const { supabaseAdmin } = await import("./client.server-D1oHePJa.mjs");
	const { data, error } = await supabaseAdmin.from("payments").select("*").order("created_at", { ascending: false }).limit(1e3);
	if (error) throw error;
	return { payments: data ?? [] };
});
async function appendToSheet(row) {
	const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
	if (!url) return;
	await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			type: "payment",
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
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
			address: row.address
		}),
		redirect: "follow"
	});
}
async function sendConfirmationEmail(row) {
	const lovableKey = process.env.LOVABLE_API_KEY;
	const resendKey = process.env.RESEND_API_KEY;
	if (!lovableKey || !resendKey) return;
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
			"X-Connection-Api-Key": resendKey
		},
		body: JSON.stringify({
			from: "Global Safety Enterprises <onboarding@resend.dev>",
			to: [row.email],
			subject: `Payment received — Invoice ${row.invoice_no}`,
			html
		})
	});
}
function escapeHtml(s) {
	return s.replace(/[&<>"']/g, (c) => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#39;"
	})[c]);
}
//#endregion
export { createRazorpayOrder_createServerFn_handler, listPayments_createServerFn_handler, recordRazorpayFailure_createServerFn_handler, verifyRazorpayPayment_createServerFn_handler };
