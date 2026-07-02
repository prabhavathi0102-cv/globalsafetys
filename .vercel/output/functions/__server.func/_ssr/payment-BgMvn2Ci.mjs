import { r as __toESM } from "../_runtime.mjs";
import { i as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageHero } from "./Section-Bi3BSgky.mjs";
import { B as Check, I as CreditCard, J as LoaderCircle, L as Copy, N as ExternalLink, X as CircleX, Z as CircleCheck, c as Smartphone, x as Lock } from "../_libs/lucide-react.mjs";
import { n as useServerFn } from "./createSsrRpc-BdCH8w9S.mjs";
import { i as verifyRazorpayPayment, r as recordRazorpayFailure, t as createRazorpayOrder } from "./razorpay.functions-BR42dfSd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/payment-BgMvn2Ci.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRODUCTS = [
	"Fire Alarm System",
	"Public Address System",
	"Fire Extinguishers",
	"Hydrant System",
	"Valves & Couplings",
	"Fire-Rated Cables",
	"Fire Doors",
	"Annual Maintenance Contract",
	"Installation & Commissioning",
	"Other / Custom Invoice"
];
function loadRazorpay() {
	return new Promise((resolve) => {
		if (typeof window === "undefined") return resolve(false);
		if (window.Razorpay) return resolve(true);
		const s = document.createElement("script");
		s.src = "https://checkout.razorpay.com/v1/checkout.js";
		s.onload = () => resolve(true);
		s.onerror = () => resolve(false);
		document.body.appendChild(s);
	});
}
function PaymentPage() {
	const createOrder = useServerFn(createRazorpayOrder);
	const verifyPayment = useServerFn(verifyRazorpayPayment);
	const recordFailure = useServerFn(recordRazorpayFailure);
	const [status, setStatus] = (0, import_react.useState)("form");
	const [product, setProduct] = (0, import_react.useState)(PRODUCTS[0]);
	const [amount, setAmount] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [company, setCompany] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [address, setAddress] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [result, setResult] = (0, import_react.useState)(null);
	const [failReason, setFailReason] = (0, import_react.useState)("");
	const amountNum = (0, import_react.useMemo)(() => Number(amount), [amount]);
	const canSubmit = name.trim().length > 1 && /^\S+@\S+\.\S+$/.test(email) && /^[0-9+\-\s()]{7,20}$/.test(phone) && amountNum > 0 && product.trim().length > 0;
	(0, import_react.useEffect)(() => {
		loadRazorpay();
	}, []);
	async function handlePay(e) {
		e.preventDefault();
		if (!canSubmit) return;
		setError(null);
		setStatus("processing");
		if (!await loadRazorpay()) {
			setError("Could not load payment gateway. Please check your connection and try again.");
			setStatus("form");
			return;
		}
		let order;
		try {
			order = await createOrder({ data: {
				product,
				amount: amountNum,
				customer: {
					name,
					company,
					email,
					phone,
					address
				}
			} });
		} catch (err) {
			console.error(err);
			setError(err?.message || "Could not create payment order.");
			setStatus("form");
			return;
		}
		const options = {
			key: order.keyId,
			amount: order.amount,
			currency: order.currency,
			name: "Global Safety Enterprises (P) Ltd",
			description: product,
			order_id: order.orderId,
			prefill: {
				name,
				email,
				contact: phone
			},
			notes: {
				invoice_no: order.invoiceNo,
				company
			},
			theme: { color: "#b91c1c" },
			method: {
				upi: true,
				card: true,
				netbanking: true,
				wallet: true,
				emi: false
			},
			handler: async (resp) => {
				try {
					const v = await verifyPayment({ data: resp });
					setResult({
						invoiceNo: v.invoiceNo,
						paymentId: v.paymentId
					});
					setStatus("success");
				} catch (err) {
					console.error(err);
					setFailReason(err?.message || "Verification failed");
					setStatus("failed");
				}
			},
			modal: { ondismiss: async () => {
				try {
					await recordFailure({ data: {
						razorpay_order_id: order.orderId,
						reason: "User dismissed checkout"
					} });
				} catch {}
				setStatus("form");
			} }
		};
		const rzp = new window.Razorpay(options);
		rzp.on("payment.failed", async (resp) => {
			const reason = resp?.error?.description || "Payment failed";
			try {
				await recordFailure({ data: {
					razorpay_order_id: order.orderId,
					reason
				} });
			} catch {}
			setFailReason(reason);
			setStatus("failed");
		});
		rzp.open();
	}
	function reset() {
		setStatus("form");
		setResult(null);
		setError(null);
		setFailReason("");
	}
	if (status === "success" && result) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		title: "Payment Successful",
		subtitle: "Thank you — a receipt has been emailed."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container mx-auto px-4 max-w-xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-card border border-border p-8 shadow-card text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-16 w-16 rounded-full bg-accent/15 text-accent mx-auto flex items-center justify-center mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-8 w-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-bold text-primary",
						children: "Payment Successful"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-muted-foreground",
						children: ["Invoice ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: result.invoiceNo })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 text-3xl font-display font-bold text-fire-gradient",
						children: ["₹ ", Number(amount || 0).toLocaleString("en-IN")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted-foreground font-mono break-all",
						children: ["Payment ID: ", result.paymentId]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: reset,
						className: "mt-8 inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-2.5 text-sm font-semibold hover:border-primary hover:text-primary transition-smooth",
						children: "Make another payment"
					})
				]
			})
		})
	})] });
	if (status === "failed") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		title: "Payment Failed",
		subtitle: "Your transaction could not be completed."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container mx-auto px-4 max-w-xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-card border border-border p-8 shadow-card text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-16 w-16 rounded-full bg-destructive/15 text-destructive mx-auto flex items-center justify-center mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-8 w-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-bold text-primary",
						children: "Payment Failed. Please try again."
					}),
					failReason && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: failReason
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: reset,
						className: "mt-8 inline-flex items-center justify-center rounded-md bg-fire-gradient px-6 py-2.5 text-sm font-semibold text-accent-foreground shadow-fire hover:scale-[1.01] transition-smooth",
						children: "Try again"
					})
				]
			})
		})
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		title: "Make a Payment",
		subtitle: "Pay securely via UPI, credit/debit card, net banking or wallet. Powered by Razorpay."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-16 md:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container mx-auto px-4 grid lg:grid-cols-[1fr_360px] gap-8 items-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handlePay,
				className: "rounded-2xl bg-card border border-border p-6 md:p-8 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl font-semibold text-primary",
						children: "Product / Service"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid sm:grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lbl, { children: "Product / Service" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: product,
								onChange: (e) => setProduct(e.target.value),
								className: "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
								children: PRODUCTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: p }, p))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Amount (₹)",
							value: amount,
							onChange: setAmount,
							type: "number",
							placeholder: "0.00",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-8 font-display text-xl font-semibold text-primary",
						children: "Your details"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid sm:grid-cols-2 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Name",
								value: name,
								onChange: setName,
								placeholder: "V. Sivasankar",
								required: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Company Name",
								value: company,
								onChange: setCompany,
								placeholder: "ABC Pvt Ltd"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Email",
								value: email,
								onChange: setEmail,
								type: "email",
								placeholder: "you@company.com",
								required: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Phone",
								value: phone,
								onChange: setPhone,
								placeholder: "+91 98XXXXXXXX",
								required: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lbl, { children: "Address" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: address,
									onChange: (e) => setAddress(e.target.value),
									rows: 3,
									placeholder: "Billing address",
									className: "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
								})]
							})
						]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 rounded-md border border-destructive/50 bg-destructive/5 text-destructive text-sm px-4 py-3",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: !canSubmit || status === "processing",
						className: "mt-8 w-full inline-flex items-center justify-center gap-2 rounded-md bg-fire-gradient py-3.5 font-semibold text-accent-foreground shadow-fire hover:scale-[1.01] transition-smooth disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100",
						children: status === "processing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Opening secure checkout…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4" }),
							" Pay ₹",
							amount ? Number(amount).toLocaleString("en-IN") : "0",
							" securely"
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-xs text-muted-foreground flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-3.5 w-3.5" }), "Accepts UPI, Visa, Mastercard, RuPay, Net Banking & Wallets"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-brand-gradient text-primary-foreground p-6 shadow-glow",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-display font-semibold",
							children: "Secure & Encrypted"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm opacity-90",
							children: "Payments are processed by Razorpay over 256-bit TLS. We never see or store your card or UPI credentials."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-6 space-y-2 text-sm",
							children: [
								"PCI DSS Level 1 gateway",
								"Instant payment confirmation",
								"GST invoice on email"
							].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-accent-glow flex-shrink-0 mt-0.5" }),
									" ",
									b
								]
							}, b))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DirectUpiCard, {
					amount,
					name
				})]
			})]
		})
	})] });
}
function Lbl({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5",
		children
	});
}
function Field({ label, value, onChange, placeholder, type = "text", required }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lbl, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type,
			value,
			required,
			onChange: (e) => onChange(e.target.value),
			placeholder,
			className: "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
		})]
	});
}
var UPI_VPA = "9840655558@upi";
var UPI_PAYEE = "Global Safety Enterprises";
function isMobileUA() {
	if (typeof navigator === "undefined") return false;
	return /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);
}
function buildUpiUri(amount, note) {
	const params = new URLSearchParams({
		pa: UPI_VPA,
		pn: UPI_PAYEE,
		cu: "INR"
	});
	const amt = Number(amount);
	if (amt > 0) params.set("am", amt.toFixed(2));
	if (note) params.set("tn", note.slice(0, 80));
	return `upi://pay?${params.toString()}`;
}
function DirectUpiCard({ amount, name }) {
	const [showQr, setShowQr] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const uri = buildUpiUri(amount, name ? `Payment from ${name}` : "Website payment");
	const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(uri)}`;
	async function copyVpa() {
		try {
			await navigator.clipboard.writeText(UPI_VPA);
			setCopied(true);
			setTimeout(() => setCopied(false), 1800);
		} catch {}
	}
	function openUpi() {
		if (isMobileUA()) window.location.href = uri;
		else setShowQr((s) => !s);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-card border border-border p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-primary font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "h-4 w-4" }), " Direct UPI"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: [
					"Prefer paying directly? Send to UPI ID",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "bg-secondary px-1.5 py-0.5 rounded font-mono text-xs",
						children: UPI_VPA
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: openUpi,
						className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-semibold text-primary hover:border-primary transition-smooth",
						children: isMobileUA() ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Open in UPI App ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: showQr ? "Hide QR" : "Show QR to pay" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: copyVpa,
						className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-semibold hover:border-primary hover:text-primary transition-smooth",
						children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }), " Copied"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" }), " Copy UPI ID"] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: uri,
						className: "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-smooth",
						children: "upi:// link"
					})
				]
			}),
			showQr && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col items-center gap-2 rounded-lg bg-background border border-border p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: qrSrc,
					alt: "UPI QR code",
					width: 240,
					height: 240,
					className: "rounded"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground text-center",
					children: ["Scan with any UPI app (GPay, PhonePe, Paytm, BHIM)", Number(amount) > 0 ? ` — ₹${Number(amount).toLocaleString("en-IN")}` : ""]
				})]
			})
		]
	});
}
//#endregion
export { PaymentPage as component };
