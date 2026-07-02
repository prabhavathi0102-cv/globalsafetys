import { r as __toESM } from "../_runtime.mjs";
import { i as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageHero } from "./Section-Bi3BSgky.mjs";
import { D as Globe, Z as CircleCheck, a as User, f as Send, h as Phone, v as MapPin, y as Mail } from "../_libs/lucide-react.mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { n as useServerFn, t as createSsrRpc } from "./createSsrRpc-BdCH8w9S.mjs";
import { n as objectType, r as stringType } from "../_libs/zod.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-e3vqpcRi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EnquirySchema = objectType({
	customerName: stringType().trim().min(1).max(100),
	companyName: stringType().trim().max(150).optional().default(""),
	mobile: stringType().trim().regex(/^[0-9+\-\s()]{7,20}$/, "Invalid phone"),
	email: stringType().trim().email().max(255),
	productInterested: stringType().trim().max(100).optional().default(""),
	city: stringType().trim().max(100).optional().default(""),
	message: stringType().trim().max(2e3).optional().default("")
});
var submitEnquiry = createServerFn({ method: "POST" }).inputValidator((input) => EnquirySchema.parse(input)).handler(createSsrRpc("dd0992fc8b96de4110d17ca30460b5f0fd1152e7a702f9a472f2ac592a38c2fa"));
var PRODUCT_INTEREST = [
	"Fire Alarm",
	"PA System",
	"Fire Extinguisher",
	"Hydrant System",
	"Valves",
	"Cables",
	"Fire Door",
	"AMC / Service"
];
function ContactPage() {
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const submitFn = useServerFn(submitEnquiry);
	async function submit(e) {
		e.preventDefault();
		if (submitting) return;
		const form = e.currentTarget;
		const fd = new FormData(form);
		const data = {
			customerName: String(fd.get("customerName") || "").trim(),
			companyName: String(fd.get("companyName") || "").trim(),
			mobile: String(fd.get("mobile") || "").trim(),
			email: String(fd.get("email") || "").trim(),
			productInterested: String(fd.get("productInterested") || "").trim(),
			city: String(fd.get("city") || "").trim(),
			message: String(fd.get("message") || "").trim()
		};
		if (!data.customerName || !data.mobile || !data.email) {
			toast.error("Please fill all required fields.");
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
			toast.error("Please enter a valid email address.");
			return;
		}
		if (!/^[0-9+\-\s()]{7,20}$/.test(data.mobile)) {
			toast.error("Please enter a valid mobile number.");
			return;
		}
		setSubmitting(true);
		try {
			const res = await submitFn({ data });
			form.reset();
			setResult({
				referenceNumber: res.referenceNumber,
				submittedAt: res.submittedAt,
				customerName: data.customerName,
				email: data.email
			});
			toast.success("Enquiry submitted successfully!");
		} catch (err) {
			console.error(err);
			toast.error("Could not submit enquiry. Please try again or call us.");
		} finally {
			setSubmitting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			title: "Get in touch",
			subtitle: "Talk to our team about quotations, AMC, installation or any fire safety requirement."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container mx-auto px-4 grid md:grid-cols-3 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-card border border-border p-6 shadow-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-12 w-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-6 w-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-widest text-muted-foreground font-semibold",
								children: "Managing Director"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 font-display text-lg font-semibold text-primary",
								children: "V.Sivasankar"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-card border border-border p-6 shadow-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-12 w-12 rounded-xl bg-fire-gradient text-accent-foreground flex items-center justify-center shadow-fire mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-6 w-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-widest text-muted-foreground font-semibold",
								children: "Call"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "tel:+919840655558",
								className: "block mt-1 font-display text-lg font-semibold text-primary hover:text-accent",
								children: "+91 98406 55558"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-card border border-border p-6 shadow-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-12 w-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-6 w-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-widest text-muted-foreground font-semibold",
								children: "Email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:info@globalsafetys.in",
								className: "block mt-1 font-display text-base font-semibold text-primary hover:text-accent break-all",
								children: "info@globalsafetys.in"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:globalsafetyenterprisespvtltd@gmail.com",
								className: "block text-sm text-muted-foreground hover:text-accent break-all",
								children: "globalsafetyenterprisespvtltd@gmail.com"
							})
						]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "pb-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container mx-auto px-4 grid lg:grid-cols-[1fr_1fr] gap-8 items-start",
				children: [result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-card border border-border p-6 md:p-8 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-14 w-14 rounded-full bg-accent/15 text-accent flex items-center justify-center flex-shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-7 w-7" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "inline-flex items-center gap-2 rounded-full bg-accent/10 text-accent px-2.5 py-1 text-xs font-semibold uppercase tracking-wider",
										children: "Submitted"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "mt-2 font-display text-2xl font-bold text-primary",
										children: [
											"Thank you, ",
											result.customerName,
											"!"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: [
											"Your enquiry has been received. A confirmation will be sent to ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: result.email
											}),
											". Our team typically responds within one business day."
										]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid sm:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-secondary/40 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Reference Number"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 font-mono text-lg font-bold text-primary break-all",
									children: result.referenceNumber
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-secondary/40 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Submitted On"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-sm font-semibold text-primary",
									children: new Date(result.submittedAt).toLocaleString("en-IN", {
										dateStyle: "medium",
										timeStyle: "short"
									})
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 text-xs text-muted-foreground",
							children: [
								"Please keep your reference number for follow-up. For urgent requests call ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "tel:+919840655558",
									className: "font-semibold text-accent hover:underline",
									children: "+91 98406 55558"
								}),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setResult(null),
							className: "mt-6 inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-2.5 text-sm font-semibold hover:border-primary hover:text-primary transition-smooth",
							children: "Submit another enquiry"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "rounded-2xl bg-card border border-border p-6 md:p-8 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl font-bold text-primary",
							children: "Send an enquiry"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-1",
							children: "We typically respond within one business day."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid sm:grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									label: "Customer Name",
									name: "customerName",
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									label: "Company Name",
									name: "companyName"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									label: "Mobile Number",
									name: "mobile",
									type: "tel",
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									label: "Email ID",
									name: "email",
									type: "email",
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									label: "City",
									name: "city"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "sm:col-span-2 block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5",
										children: "Product Interested"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										name: "productInterested",
										className: "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Select a product / service"
										}), PRODUCT_INTEREST.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: p }, p))]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "sm:col-span-2 block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5",
										children: "Message / Enquiry"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										name: "message",
										rows: 5,
										maxLength: 2e3,
										placeholder: "Tell us about your site, area & requirement...",
										className: "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: submitting,
							className: "mt-6 w-full inline-flex items-center justify-center gap-2 rounded-md bg-fire-gradient py-3.5 font-semibold text-accent-foreground shadow-fire hover:scale-[1.01] transition-smooth disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" }),
								" ",
								submitting ? "Submitting..." : "Submit Enquiry"
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [[{
						title: "Chennai Office",
						lines: [
							"295, M.K.N Road,",
							"Alandur,",
							"Chennai - 600016"
						]
					}, {
						title: "Tirupur Office",
						lines: [
							"3/2, Govindarajulu Street,",
							"Avinashi Road,",
							"Tirupur - 641602"
						]
					}].map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl bg-card border border-border p-6 shadow-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-display font-semibold text-primary text-lg",
								children: o.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-sm text-muted-foreground leading-relaxed",
								children: o.lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: l }, l))
							})] })]
						})
					}, o.title)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-brand-gradient text-primary-foreground p-6 shadow-glow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "www.globalsafetys.in"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm opacity-90",
							children: "For emergency support call our 24×7 line."
						})]
					})]
				})]
			})
		})
	] });
}
function Input({ label, name, type = "text", required }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5",
			children: [label, required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-accent",
				children: " *"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			name,
			type,
			required,
			maxLength: 255,
			className: "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
		})]
	});
}
//#endregion
export { ContactPage as component };
