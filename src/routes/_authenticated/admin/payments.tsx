import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import {
  Loader2,
  Search,
  Download,
  CheckCircle2,
  XCircle,
  IndianRupee,
  Clock,
  LogOut,
} from "lucide-react";
import { listPayments } from "@/lib/payments/razorpay.functions";

export const Route = createFileRoute("/_authenticated/admin/payments")({
  head: () => ({
    meta: [
      { title: "Admin · Payments — Global Safety Enterprises" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPayments,
});

type Payment = {
  id: string;
  invoice_no: string;
  razorpay_order_id: string;
  razorpay_payment_id: string | null;
  status: "created" | "paid" | "failed" | string;
  amount: number;
  currency: string;
  product: string;
  customer_name: string;
  company_name: string | null;
  email: string;
  phone: string;
  address: string | null;
  error_reason: string | null;
  created_at: string;
};

function AdminPayments() {
  const navigate = useNavigate();
  const fetchPayments = useServerFn(listPayments);
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "paid" | "failed" | "created">("all");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: () => fetchPayments(),
    enabled: authorized === true,
    retry: false,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) {
        if (!cancelled) navigate({ to: "/auth" });
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", u.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (!cancelled) setAuthorized(Boolean(roles));
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const payments = (data?.payments ?? []) as Payment[];

  const stats = useMemo(() => {
    let total = 0,
      paid = 0,
      failed = 0,
      revenue = 0;
    for (const p of payments) {
      total++;
      if (p.status === "paid") {
        paid++;
        revenue += Number(p.amount) || 0;
      } else if (p.status === "failed") failed++;
    }
    return { total, paid, failed, revenue };
  }, [payments]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return payments.filter((p) => {
      if (filter !== "all" && p.status !== filter) return false;
      if (!q) return true;
      return (
        p.customer_name.toLowerCase().includes(q) ||
        (p.company_name ?? "").toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.invoice_no.toLowerCase().includes(q) ||
        (p.razorpay_payment_id ?? "").toLowerCase().includes(q)
      );
    });
  }, [payments, search, filter]);

  function exportCsv() {
    const headers = [
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
      "Razorpay Payment",
    ];
    const rows = filtered.map((p) => [
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
      p.razorpay_payment_id ?? "",
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payments-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (authorized === null) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (authorized === false) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-md text-center">
        <h1 className="font-display text-2xl font-bold text-primary">Access denied</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Your account does not have admin access. Ask an administrator to grant you the{" "}
          <code className="bg-secondary px-1 rounded">admin</code> role.
        </p>
        <button
          onClick={signOut}
          className="mt-6 inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 md:py-14">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-primary">
            Payments Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">All Razorpay transactions in one place.</p>
        </div>
        <button
          onClick={signOut}
          className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm hover:border-primary hover:text-primary transition-smooth"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Stat label="Total" value={stats.total} icon={Clock} />
        <Stat label="Successful" value={stats.paid} icon={CheckCircle2} tone="accent" />
        <Stat label="Failed" value={stats.failed} icon={XCircle} tone="destructive" />
        <Stat
          label="Revenue"
          value={`₹ ${stats.revenue.toLocaleString("en-IN")}`}
          icon={IndianRupee}
          tone="primary"
        />
      </div>

      <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
        <div className="p-4 md:p-5 flex flex-wrap items-center gap-3 border-b border-border">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, company, invoice…"
              className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="all">All status</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
            <option value="created">Pending</option>
          </select>
          <button
            onClick={exportCsv}
            disabled={filtered.length === 0}
            className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold hover:bg-primary-deep transition-smooth disabled:opacity-50"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
          <button
            onClick={() => refetch()}
            className="text-xs text-muted-foreground hover:text-primary"
          >
            Refresh
          </button>
        </div>

        {isLoading ? (
          <div className="p-12 grid place-items-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="p-8 text-sm text-destructive">
            Failed to load payments: {(error as Error).message}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-sm text-muted-foreground">
            No payments yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-left">
                <tr>
                  <Th>Date</Th>
                  <Th>Invoice</Th>
                  <Th>Customer</Th>
                  <Th>Product</Th>
                  <Th className="text-right">Amount</Th>
                  <Th>Status</Th>
                  <Th>Payment ID</Th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-t border-border hover:bg-secondary/30">
                    <Td>
                      <div>{new Date(p.created_at).toLocaleDateString("en-IN")}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(p.created_at).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </Td>
                    <Td className="font-mono text-xs">{p.invoice_no}</Td>
                    <Td>
                      <div className="font-medium">{p.customer_name}</div>
                      {p.company_name && (
                        <div className="text-xs text-muted-foreground">{p.company_name}</div>
                      )}
                      <div className="text-xs text-muted-foreground">{p.email}</div>
                    </Td>
                    <Td>{p.product}</Td>
                    <Td className="text-right font-semibold">
                      ₹{Number(p.amount).toLocaleString("en-IN")}
                    </Td>
                    <Td>
                      <StatusBadge status={p.status} />
                      {p.error_reason && (
                        <div className="text-xs text-destructive mt-0.5">{p.error_reason}</div>
                      )}
                    </Td>
                    <Td className="font-mono text-xs break-all max-w-[180px]">
                      {p.razorpay_payment_id ?? "—"}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground ${className}`}>
      {children}
    </th>
  );
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    paid: "bg-accent/15 text-accent",
    failed: "bg-destructive/15 text-destructive",
    created: "bg-secondary text-muted-foreground",
  };
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${map[status] ?? "bg-secondary"}`}>
      {status === "created" ? "Pending" : status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
  tone = "muted",
}: {
  label: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "muted" | "primary" | "accent" | "destructive";
}) {
  const tones: Record<string, string> = {
    muted: "text-muted-foreground bg-secondary",
    primary: "text-primary bg-primary/10",
    accent: "text-accent bg-accent/10",
    destructive: "text-destructive bg-destructive/10",
  };
  return (
    <div className="rounded-xl bg-card border border-border p-4 shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className={`h-8 w-8 grid place-items-center rounded-lg ${tones[tone]}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-3 text-2xl font-display font-bold text-primary">{value}</div>
    </div>
  );
}
