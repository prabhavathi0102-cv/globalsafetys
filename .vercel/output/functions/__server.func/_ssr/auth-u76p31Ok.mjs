import { r as __toESM } from "../_runtime.mjs";
import { i as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageHero } from "./Section-Bi3BSgky.mjs";
import { J as LoaderCircle, x as Lock } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-CivPjuNb.mjs";
import { F as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-u76p31Ok.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [info, setInfo] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getUser().then(({ data }) => {
			if (data.user) navigate({ to: "/admin/payments" });
		});
	}, [navigate]);
	async function submit(e) {
		e.preventDefault();
		setError(null);
		setInfo(null);
		setBusy(true);
		try {
			if (mode === "signin") {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
				navigate({ to: "/admin/payments" });
			} else {
				const { error } = await supabase.auth.signUp({
					email,
					password,
					options: { emailRedirectTo: window.location.origin + "/admin/payments" }
				});
				if (error) throw error;
				setInfo("Account created. You can sign in now (admin access must be granted separately).");
				setMode("signin");
			}
		} catch (err) {
			setError(err?.message || "Authentication failed.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		title: "Admin Sign In",
		subtitle: "Access the payments dashboard."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container mx-auto px-4 max-w-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-card border border-border p-8 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setMode("signin"),
							className: `flex-1 rounded-md py-2 text-sm font-semibold ${mode === "signin" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`,
							children: "Sign in"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setMode("signup"),
							className: `flex-1 rounded-md py-2 text-sm font-semibold ${mode === "signup" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`,
							children: "Create account"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									required: true,
									value: email,
									onChange: (e) => setEmail(e.target.value),
									className: "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5",
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									required: true,
									minLength: 6,
									value: password,
									onChange: (e) => setPassword(e.target.value),
									className: "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
								})]
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-md border border-destructive/50 bg-destructive/5 text-destructive text-sm px-3 py-2",
								children: error
							}),
							info && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-md border border-accent/50 bg-accent/5 text-accent text-sm px-3 py-2",
								children: info
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: busy,
								className: "w-full inline-flex items-center justify-center gap-2 rounded-md bg-fire-gradient py-3 font-semibold text-accent-foreground shadow-fire hover:scale-[1.01] transition-smooth disabled:opacity-60",
								children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4" }), mode === "signin" ? "Sign in" : "Create account"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-xs text-muted-foreground text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "hover:text-primary",
							children: "← Back to website"
						})
					})
				]
			})
		})
	})] });
}
//#endregion
export { AuthPage as component };
