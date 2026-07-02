import { r as __toESM } from "../_runtime.mjs";
import { i as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageHero } from "./Section-Bi3BSgky.mjs";
import { P as Download, Z as CircleCheck, k as FileText, p as Search } from "../_libs/lucide-react.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as product_hydrant_default, i as product_firedoor_default, n as product_cables_default, o as product_pa_default, r as product_extinguisher_default, s as product_valves_default, t as product_alarm_default } from "./product-firedoor-Cht9Zi30.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-CFf8y5mA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRODUCTS = [
	{
		id: "fa-conv",
		name: "Conventional Fire Alarm Panel",
		category: "Fire Alarm",
		brand: "Ravel",
		img: product_alarm_default,
		specs: [
			"2 / 4 / 8 zone variants",
			"Battery backup",
			"IS/EN 54 compliant"
		]
	},
	{
		id: "fa-addr",
		name: "Addressable Fire Alarm Panel",
		category: "Fire Alarm",
		brand: "Ravel",
		img: product_alarm_default,
		specs: [
			"Up to 250 devices/loop",
			"Network ready",
			"Touch display"
		]
	},
	{
		id: "fa-smk",
		name: "Optical Smoke Detector",
		category: "Fire Alarm",
		brand: "Ravel",
		img: product_alarm_default,
		specs: [
			"Photoelectric",
			"Low-profile base",
			"LED indicator"
		]
	},
	{
		id: "pa-spk",
		name: "PA Ceiling Speaker",
		category: "PA Systems",
		brand: "Honeywell",
		img: product_pa_default,
		specs: [
			"6W / 100V line",
			"EN 54-24 ready",
			"Ceiling mount"
		]
	},
	{
		id: "pa-amp",
		name: "PA Amplifier 240W",
		category: "PA Systems",
		brand: "Honeywell",
		img: product_pa_default,
		specs: [
			"Mixer-amplifier",
			"Mic & line inputs",
			"Zone outputs"
		]
	},
	{
		id: "ex-abc",
		name: "ABC Powder Extinguisher",
		category: "Fire Extinguishers",
		brand: "Safex",
		img: product_extinguisher_default,
		specs: [
			"4 kg / 6 kg / 9 kg",
			"Class A/B/C",
			"BIS marked"
		]
	},
	{
		id: "ex-co2",
		name: "CO2 Extinguisher",
		category: "Fire Extinguishers",
		brand: "Safety First",
		img: product_extinguisher_default,
		specs: [
			"2 kg / 4.5 kg",
			"Electrical fires",
			"Non-conductive"
		]
	},
	{
		id: "ex-cln",
		name: "Clean Agent Extinguisher",
		category: "Fire Extinguishers",
		brand: "Safex",
		img: product_extinguisher_default,
		specs: [
			"HFC227ea",
			"Server room safe",
			"Residue-free"
		]
	},
	{
		id: "hy-lv",
		name: "Landing Valve (Single Outlet)",
		category: "Hydrant Systems",
		brand: "Omex",
		img: product_hydrant_default,
		specs: [
			"63 mm gunmetal",
			"PN 1.6 MPa",
			"IS 5290 compliant"
		]
	},
	{
		id: "hy-hr",
		name: "Hose Reel Drum",
		category: "Hydrant Systems",
		brand: "Omex",
		img: product_hydrant_default,
		specs: [
			"30 m hose",
			"Swing arm",
			"Wall mounted"
		]
	},
	{
		id: "va-bf",
		name: "Butterfly Valve",
		category: "Valves",
		brand: "Lehry",
		img: product_valves_default,
		specs: [
			"Wafer / lug",
			"DI body",
			"PN16"
		]
	},
	{
		id: "va-gt",
		name: "Gate Valve",
		category: "Valves",
		brand: "Lehry",
		img: product_valves_default,
		specs: [
			"Rising stem",
			"Flanged ends",
			"Cast iron"
		]
	},
	{
		id: "cb-fr",
		name: "Fire-resistant Cable",
		category: "Cables",
		brand: "Orbit",
		img: product_cables_default,
		specs: [
			"FRLS / FR-LSH",
			"IS 7098 compliant",
			"Multi-core"
		]
	},
	{
		id: "fd-st",
		name: "Fire-rated Steel Door",
		category: "Fire Doors",
		brand: "ASES Security",
		img: product_firedoor_default,
		specs: [
			"60 / 90 / 120 min rating",
			"Single & double leaf",
			"Push bar option"
		]
	}
];
var CATS = [
	"All",
	"Fire Alarm",
	"PA Systems",
	"Fire Extinguishers",
	"Hydrant Systems",
	"Valves",
	"Cables",
	"Fire Doors"
];
function ProductsPage() {
	const [q, setQ] = (0, import_react.useState)("");
	const [cat, setCat] = (0, import_react.useState)("All");
	const filtered = (0, import_react.useMemo)(() => {
		return PRODUCTS.filter((p) => (cat === "All" || p.category === cat) && (q === "" || p.name.toLowerCase().includes(q.toLowerCase()) || p.brand.toLowerCase().includes(q.toLowerCase())));
	}, [q, cat]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		title: "Product Catalogue",
		subtitle: "Browse our complete fire & safety portfolio. Filter by category, search by name or brand, and request a quotation."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container mx-auto px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-card border border-border p-4 sm:p-5 shadow-card flex flex-col md:flex-row gap-4 items-stretch md:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Search products or brands...",
							className: "w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: CATS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setCat(c),
							className: (cat === c ? "bg-primary text-primary-foreground border-primary " : "bg-background text-foreground/80 hover:text-primary border-border ") + "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-smooth",
							children: c
						}, c))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6",
					children: filtered.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "group rounded-2xl bg-card border border-border overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-smooth animate-float-up",
						style: { animationDelay: `${i * 50}ms` },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-[4/3] overflow-hidden bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: p.img,
								alt: p.name,
								loading: "lazy",
								width: 800,
								height: 600,
								className: "h-full w-full object-cover group-hover:scale-105 transition-smooth duration-700"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-[11px] uppercase tracking-widest font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-accent",
										children: p.brand
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: p.category
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-1.5 font-display font-semibold text-primary",
									children: p.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-3 space-y-1.5",
									children: p.specs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2 text-xs text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-accent flex-shrink-0" }),
											" ",
											s
										]
									}, s))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/contact",
										className: "flex-1 inline-flex items-center justify-center gap-1 rounded-md bg-fire-gradient px-3 py-2 text-xs font-semibold text-accent-foreground shadow-fire hover:scale-[1.02] transition-smooth",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5" }), " Request Quote"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "inline-flex items-center justify-center gap-1 rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground/80 hover:text-primary hover:border-primary transition-smooth",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), " Brochure"]
									})]
								})
							]
						})]
					}, p.id))
				}),
				filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center py-16 text-muted-foreground",
					children: "No products match your search."
				})
			]
		})
	})] });
}
//#endregion
export { ProductsPage as component };
