import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-BdCH8w9S.mjs";
import { n as objectType, r as stringType, t as numberType } from "../_libs/zod.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-QP6BYy5L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/razorpay.functions-BR42dfSd.js
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
var createRazorpayOrder = createServerFn({ method: "POST" }).inputValidator((input) => CreateOrderSchema.parse(input)).handler(createSsrRpc("4ada7f861624c4f58d49271efc9395ed8d752e76baca56080b8ee75529fd11b2"));
var VerifySchema = objectType({
	razorpay_order_id: stringType().min(1),
	razorpay_payment_id: stringType().min(1),
	razorpay_signature: stringType().min(1)
});
var verifyRazorpayPayment = createServerFn({ method: "POST" }).inputValidator((input) => VerifySchema.parse(input)).handler(createSsrRpc("03a47993cfaf4779f6f57da554b09ec9afec88ca5e46f35ac2ef975e070f90b9"));
var FailSchema = objectType({
	razorpay_order_id: stringType().min(1),
	reason: stringType().trim().max(500).optional().default("Payment failed")
});
var recordRazorpayFailure = createServerFn({ method: "POST" }).inputValidator((input) => FailSchema.parse(input)).handler(createSsrRpc("648f1e9e127dbc761c38481b315e37994d02a3c6f477350d8fa683ab8b25ab8f"));
var listPayments = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("1e60f1d85a98a5e5ff8ee03e1fb8f43402addf7b103ab2b0cd1caa901fdf830c"));
//#endregion
export { verifyRazorpayPayment as i, listPayments as n, recordRazorpayFailure as r, createRazorpayOrder as t };
