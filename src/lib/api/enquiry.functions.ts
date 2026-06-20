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
      // Keep these first so generic "append all values" Apps Scripts log them in the leftmost columns
      reference_number: referenceNumber,
      referenceNumber,
      timestamp: now.toISOString(),
      submitted_at: now.toISOString(),
      ...data,
      // Aliases so Apps Scripts using either naming convention work
      name: data.customerName,
      customer_name: data.customerName,
      customerName: data.customerName,
      company: data.companyName,
      company_name: data.companyName,
      companyName: data.companyName,
    };


    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    const responseText = await res.text().catch(() => "");
    if (!res.ok) {
      console.error("Sheet webhook non-2xx", res.status, responseText);
      throw new Error(`Sheet save failed (${res.status})`);
    }
    // Google Apps Script returns HTML error pages (e.g. "Fout") with HTTP 200 when the deployment is misconfigured
    if (responseText.trim().startsWith("<") || responseText.includes("Fout")) {
      console.error("Sheet webhook returned an HTML error page instead of JSON:", responseText.slice(0, 500));
      throw new Error("Google Sheet webhook is misconfigured. Please check your Apps Script deployment (must be a Web App with 'Anyone' access, using the /exec URL).");
    }
    console.log("Sheet webhook response:", res.status, responseText.slice(0, 500));
    return { ok: true as const, referenceNumber, submittedAt: now.toISOString() };
  });