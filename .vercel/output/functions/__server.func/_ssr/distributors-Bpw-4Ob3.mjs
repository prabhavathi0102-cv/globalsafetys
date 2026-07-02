import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as SectionHeader, t as PageHero } from "./Section-Bi3BSgky.mjs";
import { Q as BadgeCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/distributors-Bpw-4Ob3.js
var import_jsx_runtime = require_jsx_runtime();
var rows = [
	{
		cat: "Fire Alarm",
		brands: ["Ravel"]
	},
	{
		cat: "PA Systems",
		brands: ["Honeywell"]
	},
	{
		cat: "Fire Extinguisher",
		brands: ["Safety First", "Safex"]
	},
	{
		cat: "Hydrant System",
		brands: ["Omex"]
	},
	{
		cat: "Valves",
		brands: ["Lehry Valves"]
	},
	{
		cat: "Cables",
		brands: ["Orbit Wires & Cables"]
	},
	{
		cat: "Fire Doors",
		brands: ["ASES Security"]
	}
];
function DistributorsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		title: "Authorized Distributors",
		subtitle: "We partner with leading manufacturers to deliver certified, warrantied fire safety products across India."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container mx-auto px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: "Brand Partners",
				title: "Category-wise brand authorizations"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid md:grid-cols-2 gap-6",
				children: rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-card border border-border p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-smooth animate-float-up",
					style: { animationDelay: `${i * 60}ms` },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] uppercase tracking-widest text-muted-foreground font-semibold",
							children: "Product Category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl text-primary font-semibold mt-1",
							children: r.cat
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-8 w-8 text-accent" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: r.brands.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center rounded-full bg-secondary text-primary px-3 py-1 text-xs font-semibold",
							children: b
						}, b))
					})]
				}, r.cat))
			})]
		})
	})] });
}
//#endregion
export { DistributorsPage as component };
