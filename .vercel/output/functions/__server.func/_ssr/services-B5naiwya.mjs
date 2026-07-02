import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as SectionHeader, t as PageHero } from "./Section-Bi3BSgky.mjs";
import { A as FileSearch, C as Lightbulb, F as DoorOpen, H as Building, V as Calendar, W as BookOpen, l as Siren, q as TriangleAlert, r as Wrench, u as Shield, v as MapPin, z as ClipboardCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services-B5naiwya.js
var import_jsx_runtime = require_jsx_runtime();
var groups = [
	{
		title: "Installation Services",
		icon: Wrench,
		items: [
			{
				icon: Siren,
				label: "Fire Alarm Installation"
			},
			{
				icon: Building,
				label: "Hydrant Installation"
			},
			{
				icon: Shield,
				label: "PA System Installation"
			},
			{
				icon: DoorOpen,
				label: "Fire Door Installation"
			}
		]
	},
	{
		title: "Maintenance Services",
		icon: Calendar,
		items: [
			{
				icon: ClipboardCheck,
				label: "AMC Contracts"
			},
			{
				icon: Wrench,
				label: "Preventive Maintenance"
			},
			{
				icon: TriangleAlert,
				label: "Emergency Repairs"
			},
			{
				icon: FileSearch,
				label: "Annual Inspections"
			}
		]
	},
	{
		title: "Consultation",
		icon: Lightbulb,
		items: [
			{
				icon: Shield,
				label: "Fire Safety Audit"
			},
			{
				icon: MapPin,
				label: "Site Inspection"
			},
			{
				icon: Lightbulb,
				label: "Product Recommendation"
			},
			{
				icon: BookOpen,
				label: "Compliance Guidance"
			}
		]
	}
];
function ServicesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		title: "Services",
		subtitle: "Turnkey installation, scheduled maintenance and expert consultation — all under one roof."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container mx-auto px-4 space-y-14",
			children: groups.map((g, gi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: `0${gi + 1}`,
				title: g.title,
				center: false
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-5",
				children: g.items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group rounded-2xl bg-card border border-border p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-smooth animate-float-up",
					style: { animationDelay: `${i * 70}ms` },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-12 w-12 rounded-xl bg-fire-gradient text-accent-foreground flex items-center justify-center shadow-fire mb-4 group-hover:scale-110 transition-smooth",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(it.icon, { className: "h-6 w-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display font-semibold text-primary",
						children: it.label
					})]
				}, it.label))
			})] }, g.title))
		})
	})] });
}
//#endregion
export { ServicesPage as component };
