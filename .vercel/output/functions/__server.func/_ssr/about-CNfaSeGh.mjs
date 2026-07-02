import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as SectionHeader, t as PageHero } from "./Section-Bi3BSgky.mjs";
import { G as Award, M as Eye, Q as BadgeCheck, U as Building2, d as ShieldCheck, o as Target } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-CNfaSeGh.js
var import_jsx_runtime = require_jsx_runtime();
var offerings = [
	"Fire Alarm Systems",
	"Public Address Systems",
	"Fire Extinguishers",
	"Hydrant Systems",
	"Fire Doors",
	"Safety Equipment",
	"Installation & Maintenance"
];
var certifications = [
	{
		icon: Award,
		title: "FSAI Corporate Member",
		text: "Fire & Security Association of India"
	},
	{
		icon: BadgeCheck,
		title: "Authorized Distributor",
		text: "Honeywell, Ravel, Safex, Omex, Lehry, Orbit, ASES"
	},
	{
		icon: ShieldCheck,
		title: "Compliance Certified",
		text: "BIS & NBC compliant product portfolio"
	}
];
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			title: "About Global Safety Enterprises",
			subtitle: "A trusted fire safety solutions provider committed to protecting lives and properties with reliable products, quality service and timely support."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
						eyebrow: "Our Company",
						title: "Reliable fire safety, end to end",
						center: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted-foreground leading-relaxed",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-foreground",
							children: "Global Safety Enterprises (P) Ltd"
						}), " is a trusted fire safety solutions provider specializing in the supply, installation and maintenance of complete fire & life safety systems for industrial, commercial and residential projects across India."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted-foreground leading-relaxed",
						children: "We are committed to protecting lives and properties by delivering reliable products, quality service and timely support — backed by authorized distributorships from leading global brands."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-card border border-border p-6 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display font-semibold text-primary text-lg",
							children: "What we specialize in"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid sm:grid-cols-2 gap-3",
						children: offerings.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-accent" }),
								" ",
								o
							]
						}, o))
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-16 bg-secondary/40",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container mx-auto px-4 grid md:grid-cols-2 gap-6",
				children: [{
					icon: Target,
					title: "Mission",
					text: "To provide world-class fire safety solutions ensuring maximum protection and customer satisfaction."
				}, {
					icon: Eye,
					title: "Vision",
					text: "To become one of India's most trusted and preferred fire safety solution providers."
				}].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-card border border-border p-8 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-12 w-12 rounded-xl bg-fire-gradient text-accent-foreground flex items-center justify-center shadow-fire mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(b.icon, { className: "h-6 w-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl font-bold text-primary",
							children: b.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-muted-foreground leading-relaxed",
							children: b.text
						})
					]
				}, b.title))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container mx-auto px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					eyebrow: "Certifications",
					title: "Certified & authorized",
					description: "We hold corporate memberships and authorized distributorships that back every product and service we deliver."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid md:grid-cols-3 gap-6",
					children: certifications.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-card border border-border p-6 text-center shadow-card hover:shadow-card-hover transition-smooth",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-14 w-14 rounded-2xl bg-primary text-primary-foreground mx-auto flex items-center justify-center mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, { className: "h-7 w-7" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-display font-semibold text-primary",
								children: c.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: c.text
							})
						]
					}, c.title))
				})]
			})
		})
	] });
}
//#endregion
export { AboutPage as component };
