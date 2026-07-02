import { r as __toESM } from "../_runtime.mjs";
import { i as require_jsx_runtime, r as require_react, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { J as LoaderCircle, P as Download, R as Clock, T as IndianRupee, X as CircleX, Z as CircleCheck, b as LogOut, p as Search } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-CivPjuNb.mjs";
import { F as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useServerFn } from "./createSsrRpc-BdCH8w9S.mjs";
import { n as listPayments } from "./razorpay.functions-BR42dfSd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/payments-Dq3fFtRP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminPayments() {
	const navigate = useNavigate();
	const fetchPayments = useServerFn(listPayments);
	const [authorized, setAuthorized] = (0, import_react.useState)(null);
	const [search, setSearch] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["admin-payments"],
		queryFn: () => fetchPayments(),
		enabled: authorized === true,
		retry: false
	});
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		(async () => {
			const { data: u } = await supabase.auth.getUser();
			if (!u.user) {
				if (!cancelled) navigate({ to: "/auth" });
				return;
			}
			const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", u.user.id).eq("role", "admin").maybeSingle();
			if (!cancelled) setAuthorized(Boolean(roles));
		})();
		return () => {
			cancelled = true;
		};
	}, [navigate]);
	const payments = data?.payments ?? [];
	const stats = (0, import_react.useMemo)(() => {
		let total = 0, paid = 0, failed = 0, revenue = 0;
		for (const p of payments) {
			total++;
			if (p.status === "paid") {
				paid++;
				revenue += Number(p.amount) || 0;
			} else if (p.status === "failed") failed++;
		}
		return {
			total,
			paid,
			failed,
			revenue
		};
	}, [payments]);
	const filtered = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		return payments.filter((p) => {
			if (filter !== "all" && p.status !== filter) return false;
			if (!q) return true;
			return p.customer_name.toLowerCase().includes(q) || (p.company_name ?? "").toLowerCase().includes(q) || p.email.toLowerCase().includes(q) || p.invoice_no.toLowerCase().includes(q) || (p.razorpay_payment_id ?? "").toLowerCase().includes(q);
		});
	}, [
		payments,
		search,
		filter
	]);
	function exportCsv() {
		const csv = [[
			"Invoice No",
			"Date",
			"Status",
			"Customer",
			"Company",
			"Email",
			"Phone",
			"Product",
			"Amount (INR)",
			"Razorpay Order",
			"Razorpay Payment"
		], ...filtered.map((p) => [
			p.invoice_no,
			new Date(p.created_at).toISOString(),
			p.status,
			p.customer_name,
			p.company_name ?? "",
			p.email,
			p.phone,
			p.product,
			String(p.amount),
			p.razorpay_order_id,
			p.razorpay_payment_id ?? ""
		])].map((r) => r.map((c) => `"${String(c).replace(/"/g, "\"\"")}"`).join(",")).join("\n");
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `payments-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
		document.body.appendChild(a);
		a.click();
		a.remove();
		URL.revokeObjectURL(url);
	}
	async function signOut() {
		await supabase.auth.signOut();
		navigate({ to: "/auth" });
	}
	if (authorized === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-[60vh] grid place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" })
	});
	if (authorized === false) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container mx-auto px-4 py-20 max-w-md text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-bold text-primary",
				children: "Access denied"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: [
					"Your account does not have admin access. Ask an administrator to grant you the",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "bg-secondary px-1 rounded",
						children: "admin"
					}),
					" role."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: signOut,
				className: "mt-6 inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Sign out"]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container mx-auto px-4 py-10 md:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl md:text-3xl font-bold text-primary",
					children: "Payments Dashboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "All Razorpay transactions in one place."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: signOut,
					className: "inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm hover:border-primary hover:text-primary transition-smooth",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Sign out"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Total",
						value: stats.total,
						icon: Clock
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Successful",
						value: stats.paid,
						icon: CircleCheck,
						tone: "accent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Failed",
						value: stats.failed,
						icon: CircleX,
						tone: "destructive"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Revenue",
						value: `₹ ${stats.revenue.toLocaleString("en-IN")}`,
						icon: IndianRupee,
						tone: "primary"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-card border border-border shadow-card overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 md:p-5 flex flex-wrap items-center gap-3 border-b border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex-1 min-w-[200px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: search,
								onChange: (e) => setSearch(e.target.value),
								placeholder: "Search by name, company, invoice…",
								className: "w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: filter,
							onChange: (e) => setFilter(e.target.value),
							className: "rounded-md border border-input bg-background px-3 py-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "All status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "paid",
									children: "Paid"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "failed",
									children: "Failed"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "created",
									children: "Pending"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: exportCsv,
							disabled: filtered.length === 0,
							className: "inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold hover:bg-primary-deep transition-smooth disabled:opacity-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Export CSV"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => refetch(),
							className: "text-xs text-muted-foreground hover:text-primary",
							children: "Refresh"
						})
					]
				}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-12 grid place-items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" })
				}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-8 text-sm text-destructive",
					children: ["Failed to load payments: ", error.message]
				}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-12 text-center text-sm text-muted-foreground",
					children: "No payments yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-secondary/60 text-left",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Date" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Invoice" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Customer" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Product" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
									className: "text-right",
									children: "Amount"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Status" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Payment ID" })
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border hover:bg-secondary/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: new Date(p.created_at).toLocaleDateString("en-IN") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: new Date(p.created_at).toLocaleTimeString("en-IN", {
										hour: "2-digit",
										minute: "2-digit"
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
									className: "font-mono text-xs",
									children: p.invoice_no
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium",
										children: p.customer_name
									}),
									p.company_name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: p.company_name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: p.email
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: p.product }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, {
									className: "text-right font-semibold",
									children: ["₹", Number(p.amount).toLocaleString("en-IN")]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: p.status }), p.error_reason && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-destructive mt-0.5",
									children: p.error_reason
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
									className: "font-mono text-xs break-all max-w-[180px]",
									children: p.razorpay_payment_id ?? "—"
								})
							]
						}, p.id)) })]
					})
				})]
			})
		]
	});
}
function Th({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
		className: `px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground ${className}`,
		children
	});
}
function Td({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
		className: `px-4 py-3 align-top ${className}`,
		children
	});
}
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${{
			paid: "bg-accent/15 text-accent",
			failed: "bg-destructive/15 text-destructive",
			created: "bg-secondary text-muted-foreground"
		}[status] ?? "bg-secondary"}`,
		children: status === "created" ? "Pending" : status.charAt(0).toUpperCase() + status.slice(1)
	});
}
function Stat({ label, value, icon: Icon, tone = "muted" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-card border border-border p-4 shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `h-8 w-8 grid place-items-center rounded-lg ${{
					muted: "text-muted-foreground bg-secondary",
					primary: "text-primary bg-primary/10",
					accent: "text-accent bg-accent/10",
					destructive: "text-destructive bg-destructive/10"
				}[tone]}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 text-2xl font-display font-bold text-primary",
			children: value
		})]
	});
}
//#endregion
export { AdminPayments as component };
