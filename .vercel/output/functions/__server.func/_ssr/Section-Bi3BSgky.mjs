import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Section-Bi3BSgky.js
var import_jsx_runtime = require_jsx_runtime();
function SectionHeader({ eyebrow, title, description, center = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: center ? "max-w-2xl mx-auto text-center mb-12" : "max-w-2xl mb-10",
		children: [
			eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "inline-flex items-center gap-2 rounded-full bg-accent/10 text-accent px-3 py-1 text-xs font-semibold uppercase tracking-widest mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-accent" }),
					" ",
					eyebrow
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl md:text-4xl font-bold text-primary",
				children: title
			}),
			description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted-foreground text-base md:text-lg leading-relaxed",
				children: description
			})
		]
	});
}
function PageHero({ title, subtitle, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden bg-brand-gradient text-primary-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 opacity-20 pointer-events-none",
			style: { backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,255,255,.25), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,80,80,.35), transparent 45%)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container mx-auto px-4 py-20 md:py-28 relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl",
					children: title
				}),
				subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-lg md:text-xl opacity-90 max-w-2xl",
					children: subtitle
				}),
				children
			]
		})]
	});
}
//#endregion
export { SectionHeader as n, PageHero as t };
