import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { n as objectType, r as stringType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/enquiry.functions-B7xVCFl6.js
var EnquirySchema = objectType({
	customerName: stringType().trim().min(1).max(100),
	companyName: stringType().trim().max(150).optional().default(""),
	mobile: stringType().trim().regex(/^[0-9+\-\s()]{7,20}$/, "Invalid phone"),
	email: stringType().trim().email().max(255),
	productInterested: stringType().trim().max(100).optional().default(""),
	city: stringType().trim().max(100).optional().default(""),
	message: stringType().trim().max(2e3).optional().default("")
});
var submitEnquiry_createServerFn_handler = createServerRpc({
	id: "dd0992fc8b96de4110d17ca30460b5f0fd1152e7a702f9a472f2ac592a38c2fa",
	name: "submitEnquiry",
	filename: "src/lib/api/enquiry.functions.ts"
}, (opts) => submitEnquiry.__executeServer(opts));
var submitEnquiry = createServerFn({ method: "POST" }).inputValidator((input) => EnquirySchema.parse(input)).handler(submitEnquiry_createServerFn_handler, async ({ data }) => {
	const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
	if (!url) throw new Error("Webhook not configured");
	const now = /* @__PURE__ */ new Date();
	const pad = (n) => String(n).padStart(2, "0");
	const referenceNumber = `GSE-${`${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}`}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
	const headers = [
		"Reference No",
		"Timestamp",
		"Customer Name",
		"Company",
		"Mobile",
		"Email",
		"Product Interested",
		"City",
		"Message"
	];
	const row = [
		referenceNumber,
		now.toISOString(),
		data.customerName,
		data.companyName ?? "",
		data.mobile,
		data.email,
		data.productInterested ?? "",
		data.city ?? "",
		data.message ?? ""
	];
	const payload = {
		reference_number: referenceNumber,
		referenceNumber,
		timestamp: now.toISOString(),
		submitted_at: now.toISOString(),
		...data,
		name: data.customerName,
		customer_name: data.customerName,
		customerName: data.customerName,
		company: data.companyName,
		company_name: data.companyName,
		companyName: data.companyName,
		headers,
		row
	};
	const res = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
		redirect: "follow"
	});
	const responseText = await res.text().catch(() => "");
	if (!res.ok) console.error("Sheet webhook non-2xx", res.status, responseText);
	if (responseText.trim().startsWith("<") || responseText.includes("Fout")) console.warn("Sheet webhook returned an HTML error page (Apps Script likely misconfigured). Enquiry will still be accepted. Response:", responseText.slice(0, 300));
	console.log("Sheet webhook response:", res.status, responseText.slice(0, 500));
	return {
		ok: true,
		referenceNumber,
		submittedAt: now.toISOString()
	};
});
//#endregion
export { submitEnquiry_createServerFn_handler };
