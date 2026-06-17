import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const EnquirySchema = z.object({
  customerName: z.string().trim().min(1).max(100),
  companyName: z.string().trim().max(150).optional().default(""),
  mobile: z.string().trim().regex(/^[0-9+\-\s()]{7,20}$/, "Invalid phone"),
  email: z.string().trim().email().max(255),
  productInterested: z.string().trim().max(100).optional().default(""),
  city: z.string().trim().max(100).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => EnquirySchema.parse(input))
  .handler(async ({ data }) => {
    const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (!url) throw new Error("Webhook not configured");

    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const datePart = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}`;
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    const referenceNumber = `GSE-${datePart}-${rand}`;

    const payload = {
      timestamp: now.toISOString(),
      referenceNumber,
      reference_number: referenceNumber,
      ...data,
      // Aliases so Apps Scripts using either naming convention work
      name: data.customerName,
      customer_name: data.customerName,
      customerName: data.customerName,
      company: data.companyName,
      company_name: data.companyName,
      companyName: data.companyName,
    };

    // Send as application/x-www-form-urlencoded so Apps Script handlers that
    // read e.parameter.<field> work. Apps Script can also read the raw body
    // via e.postData.contents if it prefers JSON-style parsing.
    const form = new URLSearchParams();
    for (const [k, v] of Object.entries(payload)) {
      form.append(k, String(v ?? ""));
    }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
      redirect: "follow",
    });

    const responseText = await res.text().catch(() => "");
    if (!res.ok) {
      console.error("Sheet webhook non-2xx", res.status, responseText);
      throw new Error(`Sheet save failed (${res.status})`);
    }
    console.log("Sheet webhook response:", res.status, responseText.slice(0, 500));
    return { ok: true as const, referenceNumber, submittedAt: now.toISOString() };
  });