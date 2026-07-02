import { r as __toESM } from "../_runtime.mjs";
import { i as require_jsx_runtime, n as QueryClientProvider, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { O as Flame, S as Linkedin, Y as House, _ as Menu, f as Send, g as MessageCircle, h as Phone, j as Facebook, n as X, v as MapPin, w as Instagram, y as Mail } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-CivPjuNb.mjs";
import { I as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, k as redirect, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as hero_default } from "./hero-D0BC_AiM.mjs";
import { createHmac, timingSafeEqual } from "crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C4E0gSfh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-Coc-YVaf.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var logo_default = "/assets/logo-vMFY-XZM.png";
var nav = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/products",
		label: "Products"
	},
	{
		to: "/services",
		label: "Services"
	},
	{
		to: "/distributors",
		label: "Distributors"
	},
	{
		to: "/payment",
		label: "Pay"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function SiteHeader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-primary-deep text-primary-foreground text-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container mx-auto px-4 py-2 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline",
						children: "FSAI Corporate Member • Authorized Distributor across India"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "tel:+919840655558",
						className: "inline-flex items-center gap-2 font-medium hover:text-accent-glow transition-smooth",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3.5 w-3.5" }), " +91 98406 55558"]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container mx-auto px-4 h-20 flex items-center justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-3 group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: logo_default,
							alt: "Global Safety Enterprises logo",
							width: 48,
							height: 48,
							className: "h-12 w-12 transition-smooth group-hover:scale-105"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display font-bold text-primary text-lg sm:text-xl",
								children: "Global Safety"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
								children: "Enterprises (P) Ltd"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "hidden lg:flex items-center gap-1",
						children: [nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: n.to,
							className: "px-3 py-2 text-sm font-medium text-foreground/80 rounded-md hover:text-primary hover:bg-secondary transition-smooth",
							activeProps: { className: "px-3 py-2 text-sm font-semibold text-primary bg-secondary rounded-md" },
							activeOptions: { exact: n.to === "/" },
							children: n.label
						}, n.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "ml-2 inline-flex items-center justify-center rounded-md bg-fire-gradient px-4 py-2 text-sm font-semibold text-accent-foreground shadow-fire hover:scale-[1.03] transition-smooth",
							children: "Get Quote"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"aria-label": "Toggle menu",
						onClick: () => setOpen((v) => !v),
						className: "lg:hidden p-2 rounded-md text-primary hover:bg-secondary",
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
					})
				]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:hidden border-t border-border bg-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container mx-auto px-4 py-3 flex flex-col gap-1",
					children: [nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: n.to,
						onClick: () => setOpen(false),
						className: "px-3 py-2.5 rounded-md text-foreground/80 hover:bg-secondary hover:text-primary font-medium",
						activeProps: { className: "px-3 py-2.5 rounded-md bg-secondary text-primary font-semibold" },
						activeOptions: { exact: n.to === "/" },
						children: n.label
					}, n.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						onClick: () => setOpen(false),
						className: "mt-2 inline-flex items-center justify-center rounded-md bg-fire-gradient px-4 py-2.5 text-sm font-semibold text-accent-foreground",
						children: "Get Quote"
					})]
				})
			})
		]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-primary-deep text-primary-foreground mt-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container mx-auto px-4 py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: logo_default,
							alt: "Logo",
							width: 44,
							height: 44,
							className: "h-11 w-11",
							loading: "lazy"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display font-bold text-lg",
							children: "Global Safety"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-widest opacity-70",
							children: "Enterprises (P) Ltd"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm opacity-80 leading-relaxed",
						children: "Protecting lives & properties with trusted fire safety solutions — authorized distributor of leading brands across India."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex gap-3",
						children: [
							Facebook,
							Linkedin,
							Instagram
						].map((Icon, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							"aria-label": "social",
							className: "h-9 w-9 rounded-full bg-white/10 hover:bg-accent transition-smooth flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
						}, i))
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-display font-semibold mb-4 text-base",
					children: "Quick Links"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2 text-sm opacity-85",
					children: [
						{
							to: "/about",
							label: "About Us"
						},
						{
							to: "/products",
							label: "Products"
						},
						{
							to: "/services",
							label: "Services"
						},
						{
							to: "/distributors",
							label: "Distributors"
						},
						{
							to: "/payment",
							label: "Make Payment"
						},
						{
							to: "/contact",
							label: "Contact"
						}
					].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: "hover:text-accent-glow transition-smooth",
						children: l.label
					}) }, l.to))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-display font-semibold mb-4 text-base",
					children: "Products"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2 text-sm opacity-85",
					children: [
						"Fire Alarm Systems",
						"PA Systems",
						"Fire Extinguishers",
						"Hydrant Systems",
						"Valves",
						"Cables",
						"Fire Doors"
					].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/products",
						className: "hover:text-accent-glow transition-smooth",
						children: p
					}) }, p))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-display font-semibold mb-4 text-base",
					children: "Contact"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-3 text-sm opacity-85",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 mt-0.5 flex-shrink-0 text-accent-glow" }), " 295, M.K.N Road, Alandur, Chennai - 600016"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 mt-0.5 flex-shrink-0 text-accent-glow" }),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "tel:+919840655558",
									className: "hover:text-accent-glow",
									children: "+91 98406 55558"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 mt-0.5 flex-shrink-0 text-accent-glow" }),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "mailto:info@globalsafetys.in",
									className: "hover:text-accent-glow break-all",
									children: "info@globalsafetys.in"
								})
							]
						})
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-white/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container mx-auto px-4 py-5 text-xs opacity-70 flex flex-col sm:flex-row gap-2 justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "© 2026 Global Safety Enterprises (P) Ltd. All Rights Reserved." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "www.globalsafetys.in" })]
			})
		})]
	});
}
var QUICK = [
	"Which fire extinguisher is suitable for electrical fires?",
	"What is the cost of a fire alarm system?",
	"Do you provide AMC services?",
	"How can I request a quotation?",
	"What products do you supply?",
	"Where are you located?"
];
var QNA = [
	{
		keywords: [
			"electrical",
			"class c",
			"co2",
			"clean agent"
		],
		answer: "For electrical fires (Class C), we recommend CO2 or Clean Agent extinguishers — both are non-conductive and leave no residue. We stock 2kg, 4.5kg & 6.8kg CO2 models from Safex."
	},
	{
		keywords: [
			"abc",
			"powder",
			"dry chemical"
		],
		answer: "ABC Dry Powder extinguishers (4kg, 6kg, 9kg) are versatile — effective on Class A (solids), B (liquids) and C (gases). Ideal for offices, shops, warehouses and vehicles."
	},
	{
		keywords: [
			"kitchen",
			"class k",
			"cooking",
			"oil"
		],
		answer: "For commercial kitchens and cooking oil fires (Class K), we supply Wet Chemical extinguishers — they cool the oil and form a soapy film that prevents re-ignition."
	},
	{
		keywords: [
			"foam",
			"class b",
			"flammable liquid",
			"petrol",
			"diesel"
		],
		answer: "Mechanical Foam (AFFF) extinguishers handle Class B flammable liquid fires — petrol, diesel, paints, solvents. Available in 9L stored-pressure models."
	},
	{
		keywords: [
			"cost",
			"price",
			"quote",
			"quotation",
			"rate"
		],
		answer: "Pricing depends on site area, panel type (conventional/addressable) and detector count. Please share your requirement via the Contact page or call +91 98406 55558 — we send detailed quotes within 24 hours."
	},
	{
		keywords: [
			"amc",
			"maintenance",
			"service contract"
		],
		answer: "Yes — we offer comprehensive AMC contracts covering preventive maintenance, quarterly inspections, refilling and emergency repairs for fire alarms, hydrants, extinguishers and PA systems."
	},
	{
		keywords: ["refill", "refilling"],
		answer: "We refill all types of fire extinguishers — ABC, CO2, Foam, Water and Wet Chemical — as per IS 2190 standards, with hydro-testing every 5 years."
	},
	{
		keywords: [
			"hydrant",
			"landing valve",
			"hose reel",
			"sprinkler"
		],
		answer: "A hydrant system uses pressurised water through landing valves, hose reels and pipework to fight large fires. We supply Omex landing valves, hose reels, hoses and sprinklers, with full installation."
	},
	{
		keywords: [
			"alarm",
			"detector",
			"smoke",
			"heat",
			"call point"
		],
		answer: "We supply Conventional & Addressable Fire Alarm panels from Ravel, plus smoke/heat detectors and manual call points. Installation, commissioning and AMC included."
	},
	{
		keywords: [
			"pa",
			"public address",
			"voice evacuation",
			"honeywell"
		],
		answer: "We are authorised distributors for Honeywell PA & Voice Evacuation systems — speakers, amplifiers, BGM and emergency announcement systems."
	},
	{
		keywords: ["fire door", "door"],
		answer: "We supply 60/90/120-minute rated fire doors with certified hinges, locks and door closers — for staircases, lift lobbies and electrical rooms."
	},
	{
		keywords: [
			"install",
			"installation",
			"commission"
		],
		answer: "We provide turnkey installation for fire alarms, hydrants, PA systems and fire doors with certified technicians and post-install commissioning support."
	},
	{
		keywords: [
			"noc",
			"approval",
			"tac",
			"certificate"
		],
		answer: "We assist with TAC-approved products and documentation for Fire Department NOC — drawings, calculations and compliance certificates included."
	},
	{
		keywords: [
			"training",
			"demo",
			"mock drill"
		],
		answer: "We conduct on-site fire safety training and mock-drill demonstrations for your staff — extinguisher handling, evacuation procedure and emergency response."
	},
	{
		keywords: [
			"product",
			"supply",
			"brand",
			"what do you sell"
		],
		answer: "We supply fire extinguishers (Safex), hydrant components (Omex), fire alarm systems (Ravel), PA & voice evacuation (Honeywell), sprinklers, hoses, fire doors and signage."
	},
	{
		keywords: [
			"hour",
			"open",
			"timing"
		],
		answer: "Office hours: Mon–Sat, 9:30 AM – 6:30 PM. Emergency support: 24×7 on +91 98406 55558."
	},
	{
		keywords: [
			"contact",
			"address",
			"location",
			"office",
			"where"
		],
		answer: "Chennai: 295, M.K.N Road, Alandur, Chennai 600016. Tirupur: 3/2, Govindarajulu St, Avinashi Rd, Tirupur 641602. Email: info@globalsafetys.in"
	},
	{
		keywords: [
			"distributor",
			"dealer",
			"partner"
		],
		answer: "We are authorised distributors for Safex, Omex, Ravel and Honeywell. Visit our Distributors page for the full list of brands we represent."
	},
	{
		keywords: [
			"payment",
			"pay",
			"upi",
			"bank"
		],
		answer: "We accept UPI, NEFT/RTGS and cheque payments. Visit the Payment page on our site for UPI details and a secure online payment option."
	},
	{
		keywords: [
			"hello",
			"hi",
			"hey",
			"namaste",
			"good morning",
			"good evening"
		],
		answer: "Hello! 👋 I'm the Fire Safety Assistant. How can I help you today — products, AMC, installation, or a quote?"
	}
];
var FAREWELL_KEYWORDS = [
	"thank you",
	"thanks",
	"thank u",
	"thx",
	"good bye",
	"goodbye",
	"bye",
	"nothing",
	"fine",
	"no thanks",
	"that's all",
	"thats all"
];
function isFarewell(text) {
	const t = text.toLowerCase().trim();
	return FAREWELL_KEYWORDS.some((k) => t === k || t.includes(k));
}
function botReply(input) {
	const t = input.toLowerCase();
	if (isFarewell(t)) return "Goodbye, see you later.";
	const match = QNA.find((q) => q.keywords.some((k) => t.includes(k)));
	if (match) return match.answer;
	return "Thanks for your message! I can help with product recommendations, AMC, installation, quotes and contact details. You can also call +91 98406 55558 or use the Contact form for a personalised response.";
}
var WELCOME = {
	role: "bot",
	text: "Hi! I'm Fire Safety Assistant 🔥 — ask me about products, AMC, installation, or quotes."
};
function FloatingActions() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [input, setInput] = (0, import_react.useState)("");
	const [msgs, setMsgs] = (0, import_react.useState)([WELCOME]);
	function send(text) {
		const value = text.trim();
		if (!value) return;
		const reply = botReply(value);
		setMsgs((m) => [
			...m,
			{
				role: "user",
				text: value
			},
			{
				role: "bot",
				text: reply
			}
		]);
		setInput("");
	}
	function resetToMenu() {
		setMsgs([WELCOME, {
			role: "bot",
			text: "Back to main menu — pick a topic below or type your question."
		}]);
		setInput("");
	}
	const showQuick = msgs.length <= 1 || msgs[msgs.length - 1]?.role === "bot" && msgs[msgs.length - 1]?.text.includes("Back to main menu");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed right-4 bottom-4 z-50 flex flex-col gap-3 items-end",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "https://wa.me/919840655558",
				target: "_blank",
				rel: "noreferrer",
				"aria-label": "WhatsApp",
				className: "h-12 w-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-smooth",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					viewBox: "0 0 24 24",
					className: "h-6 w-6 fill-current",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20.52 3.48A11.86 11.86 0 0012.04 0C5.5 0 .22 5.28.22 11.82c0 2.08.55 4.11 1.6 5.9L0 24l6.45-1.78a11.8 11.8 0 005.59 1.43h.01c6.54 0 11.82-5.28 11.82-11.82a11.74 11.74 0 00-3.35-8.35zM12.05 21.3h-.01a9.46 9.46 0 01-4.82-1.32l-.34-.2-3.83 1.06 1.02-3.74-.22-.36a9.45 9.45 0 1117.65-4.93 9.46 9.46 0 01-9.45 9.49zm5.41-7.07c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.18-.24-.58-.49-.5-.66-.51l-.56-.01c-.2 0-.52.07-.79.37-.27.3-1.03 1-1.03 2.44s1.06 2.83 1.2 3.03c.15.2 2.08 3.17 5.04 4.45.7.3 1.25.49 1.68.62.7.22 1.34.19 1.84.12.56-.08 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.34z" })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "tel:+919840655558",
				"aria-label": "Call now",
				className: "h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-smooth",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"aria-label": "Open chat",
				onClick: () => setOpen((v) => !v),
				className: "h-14 w-14 rounded-full bg-fire-gradient text-accent-foreground flex items-center justify-center shadow-fire animate-pulse-ring hover:scale-110 transition-smooth",
				children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-6 w-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-6 w-6" })
			})
		]
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed right-4 bottom-24 z-50 w-[92vw] max-w-sm rounded-2xl bg-card shadow-card-hover border border-border overflow-hidden animate-float-up",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-brand-gradient text-primary-foreground p-4 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-10 w-10 rounded-full bg-white/15 flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-5 w-5 animate-flame" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display font-semibold",
						children: "Fire Safety Assistant"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs opacity-80",
						children: "Typically replies instantly"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: resetToMenu,
					"aria-label": "Back to main menu",
					title: "Back to main menu",
					className: "h-9 px-2.5 rounded-lg bg-white/15 hover:bg-white/25 transition-smooth flex items-center gap-1.5 text-xs font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline",
						children: "Main menu"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "h-80 overflow-y-auto p-4 space-y-3 bg-secondary/30",
				children: [msgs.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: m.role === "user" ? "flex justify-end" : "flex justify-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: m.role === "user" ? "max-w-[80%] rounded-2xl rounded-br-sm bg-primary text-primary-foreground px-3.5 py-2 text-sm" : "max-w-[85%] rounded-2xl rounded-bl-sm bg-card border border-border px-3.5 py-2 text-sm text-foreground",
						children: m.text
					})
				}, i)), showQuick && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pt-2 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold",
						children: "Try asking"
					}), QUICK.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => send(q),
						className: "block w-full text-left text-xs rounded-lg border border-border bg-card hover:border-primary hover:text-primary px-3 py-2 transition-smooth",
						children: q
					}, q))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					send(input);
				},
				className: "flex items-center gap-2 p-3 border-t border-border bg-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: resetToMenu,
						"aria-label": "Back to main menu",
						title: "Back to main menu",
						className: "h-10 w-10 rounded-lg border border-input bg-background hover:border-primary hover:text-primary flex items-center justify-center transition-smooth",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: input,
						onChange: (e) => setInput(e.target.value),
						placeholder: "Type your question...",
						className: "flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						"aria-label": "Send",
						className: "h-10 w-10 rounded-lg bg-fire-gradient text-accent-foreground flex items-center justify-center shadow-fire hover:scale-105 transition-smooth",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
					})
				]
			})
		]
	})] });
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$12 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Global Safety Enterprises (P) Ltd — Fire & Safety Solutions" },
			{
				name: "description",
				content: "Authorized distributor of fire alarm systems, PA systems, fire extinguishers, hydrant systems, valves, cables & fire doors across India."
			},
			{
				name: "author",
				content: "Global Safety Enterprises (P) Ltd"
			},
			{
				property: "og:title",
				content: "Global Safety Enterprises (P) Ltd — Fire & Safety Solutions"
			},
			{
				property: "og:description",
				content: "Authorized distributor of fire alarm systems, PA systems, fire extinguishers, hydrant systems, valves, cables & fire doors across India."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:title",
				content: "Global Safety Enterprises (P) Ltd — Fire & Safety Solutions"
			},
			{
				name: "twitter:description",
				content: "Authorized distributor of fire alarm systems, PA systems, fire extinguishers, hydrant systems, valves, cables & fire doors across India."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/70992ada-f725-4ffe-a810-d2660e5c0156/id-preview-28aab391--0e7b5588-21d4-4013-8ad1-8e336101ddcc.lovable.app-1781501641338.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/70992ada-f725-4ffe-a810-d2660e5c0156/id-preview-28aab391--0e7b5588-21d4-4013-8ad1-8e336101ddcc.lovable.app-1781501641338.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$12.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-screen flex flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingActions, {})
			]
		})
	});
}
var BASE_URL = "";
var entries = [
	{
		path: "/",
		changefreq: "weekly",
		priority: "1.0"
	},
	{
		path: "/about",
		changefreq: "monthly",
		priority: "0.8"
	},
	{
		path: "/products",
		changefreq: "weekly",
		priority: "0.9"
	},
	{
		path: "/services",
		changefreq: "monthly",
		priority: "0.8"
	},
	{
		path: "/distributors",
		changefreq: "monthly",
		priority: "0.7"
	},
	{
		path: "/payment",
		changefreq: "yearly",
		priority: "0.5"
	},
	{
		path: "/contact",
		changefreq: "yearly",
		priority: "0.6"
	}
];
var Route$11 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map((e) => `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`).join("\n")}\n</urlset>`;
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$9 = () => import("./services-B5naiwya.mjs");
var Route$10 = createFileRoute("/services")({
	head: () => ({ meta: [{ title: "Services — Installation, AMC & Fire Safety Consultation" }, {
		name: "description",
		content: "Installation, AMC, preventive maintenance, fire safety audit, site inspection and compliance guidance for industrial & commercial projects."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./products-CFf8y5mA.mjs");
var Route$9 = createFileRoute("/products")({
	head: () => ({ meta: [{ title: "Products Catalogue — Fire & Safety Equipment" }, {
		name: "description",
		content: "Browse our fire safety products: fire alarms, PA, extinguishers, hydrants, valves, cables and fire doors with brand & spec details."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./payment-BgMvn2Ci.mjs");
var Route$8 = createFileRoute("/payment")({
	head: () => ({ meta: [{ title: "Make a Payment — Global Safety Enterprises" }, {
		name: "description",
		content: "Pay invoices securely online with Razorpay — UPI, credit/debit cards, net banking, and wallets accepted."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./distributors-Bpw-4Ob3.mjs");
var Route$7 = createFileRoute("/distributors")({
	head: () => ({ meta: [{ title: "Authorized Distributors — Global Safety Enterprises" }, {
		name: "description",
		content: "Authorized distributor for Ravel, Honeywell, Safety First, Safex, Omex, Lehry, Orbit and ASES Security across India."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./contact-e3vqpcRi.mjs");
var Route$6 = createFileRoute("/contact")({
	head: () => ({ meta: [{ title: "Contact — Global Safety Enterprises (P) Ltd" }, {
		name: "description",
		content: "Get in touch with Global Safety Enterprises in Chennai & Tirupur. Call +91 98406 55558 or email info@globalsafetys.in for quotes & support."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./auth-u76p31Ok.mjs");
var Route$5 = createFileRoute("/auth")({
	head: () => ({ meta: [
		{ title: "Sign in — Global Safety Enterprises" },
		{
			name: "description",
			content: "Admin sign-in for Global Safety Enterprises."
		},
		{
			name: "robots",
			content: "noindex,nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./about-CNfaSeGh.mjs");
var Route$4 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About Us — Global Safety Enterprises (P) Ltd" },
		{
			name: "description",
			content: "Trusted fire safety solutions provider — fire alarms, PA systems, extinguishers, hydrants, fire doors, installation & maintenance services."
		},
		{
			property: "og:title",
			content: "About Global Safety Enterprises"
		},
		{
			property: "og:description",
			content: "Our mission, vision and certifications."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./route-Di7iQBCH.mjs");
var Route$3 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./routes-CijWaABM.mjs");
var Route$2 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Global Safety Enterprises (P) Ltd — Fire & Safety Solutions" },
		{
			name: "description",
			content: "Authorized distributor of fire alarm systems, PA systems, fire extinguishers, hydrant systems, valves, cables & fire doors across India. Installation, AMC & 24×7 support."
		},
		{
			property: "og:title",
			content: "Global Safety Enterprises — Trusted Fire Safety Solutions"
		},
		{
			property: "og:description",
			content: "Protecting lives & properties with certified fire safety solutions, installation and AMC support."
		},
		{
			property: "og:image",
			content: hero_default
		},
		{
			name: "twitter:image",
			content: hero_default
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var Route$1 = createFileRoute("/api/public/razorpay-webhook")({ server: { handlers: { POST: async ({ request }) => {
	const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
	if (!secret) return new Response("Webhook secret not configured", { status: 500 });
	const signature = request.headers.get("x-razorpay-signature") ?? "";
	const body = await request.text();
	const expected = createHmac("sha256", secret).update(body).digest("hex");
	const a = Buffer.from(expected);
	const b = Buffer.from(signature);
	if (a.length !== b.length || !timingSafeEqual(a, b)) return new Response("Invalid signature", { status: 401 });
	let payload;
	try {
		payload = JSON.parse(body);
	} catch {
		return new Response("Bad JSON", { status: 400 });
	}
	const event = payload?.event ?? "";
	const orderEntity = payload?.payload?.payment?.entity ?? payload?.payload?.order?.entity ?? {};
	const orderId = orderEntity.order_id ?? orderEntity.id;
	const paymentId = payload?.payload?.payment?.entity?.id;
	const errorReason = payload?.payload?.payment?.entity?.error_description;
	if (!orderId) return new Response("ok", { status: 200 });
	const { supabaseAdmin } = await import("./client.server-D1oHePJa.mjs");
	if (event === "payment.captured" || event === "order.paid") await supabaseAdmin.from("payments").update({
		status: "paid",
		razorpay_payment_id: paymentId ?? null,
		error_reason: null
	}).eq("razorpay_order_id", orderId).neq("status", "paid");
	else if (event === "payment.failed") await supabaseAdmin.from("payments").update({
		status: "failed",
		error_reason: errorReason ?? "payment.failed"
	}).eq("razorpay_order_id", orderId).neq("status", "paid");
	return new Response("ok", { status: 200 });
} } } });
var $$splitComponentImporter = () => import("./payments-Dq3fFtRP.mjs");
var Route = createFileRoute("/_authenticated/admin/payments")({
	head: () => ({ meta: [{ title: "Admin · Payments — Global Safety Enterprises" }, {
		name: "robots",
		content: "noindex,nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var SitemapDotxmlRoute = Route$11.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$12
});
var ServicesRoute = Route$10.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => Route$12
});
var ProductsRoute = Route$9.update({
	id: "/products",
	path: "/products",
	getParentRoute: () => Route$12
});
var PaymentRoute = Route$8.update({
	id: "/payment",
	path: "/payment",
	getParentRoute: () => Route$12
});
var DistributorsRoute = Route$7.update({
	id: "/distributors",
	path: "/distributors",
	getParentRoute: () => Route$12
});
var ContactRoute = Route$6.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$12
});
var AuthRoute = Route$5.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$12
});
var AboutRoute = Route$4.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$12
});
var AuthenticatedRouteRoute = Route$3.update({
	id: "/_authenticated",
	getParentRoute: () => Route$12
});
var IndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$12
});
var ApiPublicRazorpayWebhookRoute = Route$1.update({
	id: "/api/public/razorpay-webhook",
	path: "/api/public/razorpay-webhook",
	getParentRoute: () => Route$12
});
var AuthenticatedRouteRouteChildren = { AuthenticatedAdminPaymentsRoute: Route.update({
	id: "/admin/payments",
	path: "/admin/payments",
	getParentRoute: () => AuthenticatedRouteRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AboutRoute,
	AuthRoute,
	ContactRoute,
	DistributorsRoute,
	PaymentRoute,
	ProductsRoute,
	ServicesRoute,
	SitemapDotxmlRoute,
	ApiPublicRazorpayWebhookRoute
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
