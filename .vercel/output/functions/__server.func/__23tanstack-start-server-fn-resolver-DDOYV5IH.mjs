//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-DDOYV5IH.js
var manifest = {
	"03a47993cfaf4779f6f57da554b09ec9afec88ca5e46f35ac2ef975e070f90b9": {
		functionName: "verifyRazorpayPayment_createServerFn_handler",
		importer: () => import("./_ssr/razorpay.functions-Ckez-GLM.mjs")
	},
	"1e60f1d85a98a5e5ff8ee03e1fb8f43402addf7b103ab2b0cd1caa901fdf830c": {
		functionName: "listPayments_createServerFn_handler",
		importer: () => import("./_ssr/razorpay.functions-Ckez-GLM.mjs")
	},
	"4ada7f861624c4f58d49271efc9395ed8d752e76baca56080b8ee75529fd11b2": {
		functionName: "createRazorpayOrder_createServerFn_handler",
		importer: () => import("./_ssr/razorpay.functions-Ckez-GLM.mjs")
	},
	"648f1e9e127dbc761c38481b315e37994d02a3c6f477350d8fa683ab8b25ab8f": {
		functionName: "recordRazorpayFailure_createServerFn_handler",
		importer: () => import("./_ssr/razorpay.functions-Ckez-GLM.mjs")
	},
	"dd0992fc8b96de4110d17ca30460b5f0fd1152e7a702f9a472f2ac592a38c2fa": {
		functionName: "submitEnquiry_createServerFn_handler",
		importer: () => import("./_ssr/enquiry.functions-B7xVCFl6.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
