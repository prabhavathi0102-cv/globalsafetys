import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CreditCard, Lock, CheckCircle2, XCircle, Loader2, Smartphone, ExternalLink, Copy, Check } from "lucide-react";
import { PageHero } from "@/components/site/Section";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
  recordRazorpayFailure,
} from "@/lib/payments/razorpay.functions";

export const Route = createFileRoute("/payment")({
  head: () => ({
    meta: [
      { title: "Make a Payment — Global Safety Enterprises" },
      {
        name: "description",
        content:
          "Pay invoices securely online with Razorpay — UPI, credit/debit cards, net banking, and wallets accepted.",
      },
    ],
  }),
  component: PaymentPage,
});

const PRODUCTS = [
  "Fire Alarm System",
  "Public Address System",
  "Fire Extinguishers",
  "Hydrant System",
  "Valves & Couplings",
  "Fire-Rated Cables",
  "Fire Doors",
  "Annual Maintenance Contract",
  "Installation & Commissioning",
  "Other / Custom Invoice",
];

type Status = "form" | "processing" | "success" | "failed";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

function PaymentPage() {
  const createOrder = useServerFn(createRazorpayOrder);
  const verifyPayment = useServerFn(verifyRazorpayPayment);
  const recordFailure = useServerFn(recordRazorpayFailure);

  const [status, setStatus] = useState<Status>("form");
  const [product, setProduct] = useState(PRODUCTS[0]);
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ invoiceNo: string; paymentId: string } | null>(null);
  const [failReason, setFailReason] = useState<string>("");

  const amountNum = useMemo(() => Number(amount), [amount]);
  const canSubmit =
    name.trim().length > 1 &&
    /^\S+@\S+\.\S+$/.test(email) &&
    /^[0-9+\-\s()]{7,20}$/.test(phone) &&
    amountNum > 0 &&
    product.trim().length > 0;

  useEffect(() => {
    void loadRazorpay();
  }, []);

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setStatus("processing");

    const ready = await loadRazorpay();
    if (!ready) {
      setError("Could not load payment gateway. Please check your connection and try again.");
      setStatus("form");
      return;
    }

    let order: Awaited<ReturnType<typeof createOrder>>;
    try {
      order = await createOrder({
        data: {
          product,
          amount: amountNum,
          customer: { name, company, email, phone, address },
        },
      });
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Could not create payment order.");
      setStatus("form");
      return;
    }

    const options = {
      key: order.keyId,
      amount: order.amount,
      currency: order.currency,
      name: "Global Safety Enterprises (P) Ltd",
      description: product,
      order_id: order.orderId,
      prefill: { name, email, contact: phone },
      notes: { invoice_no: order.invoiceNo, company },
      theme: { color: "#b91c1c" },
      method: { upi: true, card: true, netbanking: true, wallet: true, emi: false },
      handler: async (resp: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) => {
        try {
          const v = await verifyPayment({ data: resp });
          setResult({ invoiceNo: v.invoiceNo, paymentId: v.paymentId });
          setStatus("success");
        } catch (err: any) {
          console.error(err);
          setFailReason(err?.message || "Verification failed");
          setStatus("failed");
        }
      },
      modal: {
        ondismiss: async () => {
          try {
            await recordFailure({
              data: { razorpay_order_id: order.orderId, reason: "User dismissed checkout" },
            });
          } catch {}
          setStatus("form");
        },
      },
    };

    const rzp = new window.Razorpay!(options);
    rzp.on("payment.failed", async (resp: any) => {
      const reason = resp?.error?.description || "Payment failed";
      try {
        await recordFailure({
          data: { razorpay_order_id: order.orderId, reason },
        });
      } catch {}
      setFailReason(reason);
      setStatus("failed");
    });
    rzp.open();
  }

  function reset() {
    setStatus("form");
    setResult(null);
    setError(null);
    setFailReason("");
  }

  if (status === "success" && result) {
    return (
      <div>
        <PageHero title="Payment Successful" subtitle="Thank you — a receipt has been emailed." />
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-xl">
            <div className="rounded-2xl bg-card border border-border p-8 shadow-card text-center">
              <div className="h-16 w-16 rounded-full bg-accent/15 text-accent mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="font-display text-2xl font-bold text-primary">Payment Successful</h2>
              <p className="mt-2 text-muted-foreground">
                Invoice <strong>{result.invoiceNo}</strong>
              </p>
              <div className="mt-6 text-3xl font-display font-bold text-fire-gradient">
                ₹ {Number(amount || 0).toLocaleString("en-IN")}
              </div>
              <p className="mt-2 text-xs text-muted-foreground font-mono break-all">
                Payment ID: {result.paymentId}
              </p>
              <button
                onClick={reset}
                className="mt-8 inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-2.5 text-sm font-semibold hover:border-primary hover:text-primary transition-smooth"
              >
                Make another payment
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div>
        <PageHero title="Payment Failed" subtitle="Your transaction could not be completed." />
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-xl">
            <div className="rounded-2xl bg-card border border-border p-8 shadow-card text-center">
              <div className="h-16 w-16 rounded-full bg-destructive/15 text-destructive mx-auto flex items-center justify-center mb-4">
                <XCircle className="h-8 w-8" />
              </div>
              <h2 className="font-display text-2xl font-bold text-primary">
                Payment Failed. Please try again.
              </h2>
              {failReason && (
                <p className="mt-2 text-sm text-muted-foreground">{failReason}</p>
              )}
              <button
                onClick={reset}
                className="mt-8 inline-flex items-center justify-center rounded-md bg-fire-gradient px-6 py-2.5 text-sm font-semibold text-accent-foreground shadow-fire hover:scale-[1.01] transition-smooth"
              >
                Try again
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        title="Make a Payment"
        subtitle="Pay securely via UPI, credit/debit card, net banking or wallet. Powered by Razorpay."
      />
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          <form
            onSubmit={handlePay}
            className="rounded-2xl bg-card border border-border p-6 md:p-8 shadow-card"
          >
            <h3 className="font-display text-xl font-semibold text-primary">Product / Service</h3>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <label className="block sm:col-span-2">
                <Lbl>Product / Service</Lbl>
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {PRODUCTS.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </label>
              <Field label="Amount (₹)" value={amount} onChange={setAmount} type="number" placeholder="0.00" required />
            </div>

            <h3 className="mt-8 font-display text-xl font-semibold text-primary">Your details</h3>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <Field label="Name" value={name} onChange={setName} placeholder="V. Sivasankar" required />
              <Field label="Company Name" value={company} onChange={setCompany} placeholder="ABC Pvt Ltd" />
              <Field label="Email" value={email} onChange={setEmail} type="email" placeholder="you@company.com" required />
              <Field label="Phone" value={phone} onChange={setPhone} placeholder="+91 98XXXXXXXX" required />
              <label className="block sm:col-span-2">
                <Lbl>Address</Lbl>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  placeholder="Billing address"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </label>
            </div>

            {error && (
              <div className="mt-6 rounded-md border border-destructive/50 bg-destructive/5 text-destructive text-sm px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!canSubmit || status === "processing"}
              className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-md bg-fire-gradient py-3.5 font-semibold text-accent-foreground shadow-fire hover:scale-[1.01] transition-smooth disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {status === "processing" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Opening secure checkout…
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" /> Pay ₹{amount ? Number(amount).toLocaleString("en-IN") : "0"} securely
                </>
              )}
            </button>

            <p className="mt-4 text-xs text-muted-foreground flex items-center gap-1.5">
              <CreditCard className="h-3.5 w-3.5" />
              Accepts UPI, Visa, Mastercard, RuPay, Net Banking & Wallets
            </p>
          </form>

          <aside className="space-y-4">
            <div className="rounded-2xl bg-brand-gradient text-primary-foreground p-6 shadow-glow">
              <h4 className="font-display font-semibold">Secure & Encrypted</h4>
              <p className="mt-2 text-sm opacity-90">
                Payments are processed by Razorpay over 256-bit TLS. We never see or store your card or UPI credentials.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {["PCI DSS Level 1 gateway", "Instant payment confirmation", "GST invoice on email"].map((b) => (
                  <li key={b} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-glow flex-shrink-0 mt-0.5" /> {b}
                  </li>
                ))}
              </ul>
            </div>

            <DirectUpiCard amount={amount} name={name} />

          </aside>
        </div>
      </section>
    </div>
  );
}

function Lbl({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
      {children}
    </span>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <Lbl>{label}</Lbl>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}

const UPI_VPA = "9840655558@upi";
const UPI_PAYEE = "Global Safety Enterprises";

function isMobileUA() {
  if (typeof navigator === "undefined") return false;
  return /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);
}

function buildUpiUri(amount: string, note: string) {
  const params = new URLSearchParams({
    pa: UPI_VPA,
    pn: UPI_PAYEE,
    cu: "INR",
  });
  const amt = Number(amount);
  if (amt > 0) params.set("am", amt.toFixed(2));
  if (note) params.set("tn", note.slice(0, 80));
  return `upi://pay?${params.toString()}`;
}

function DirectUpiCard({ amount, name }: { amount: string; name: string }) {
  const [showQr, setShowQr] = useState(false);
  const [copied, setCopied] = useState(false);
  const note = name ? `Payment from ${name}` : "Website payment";
  const uri = buildUpiUri(amount, note);
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(uri)}`;

  async function copyVpa() {
    try {
      await navigator.clipboard.writeText(UPI_VPA);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  function openUpi() {
    if (isMobileUA()) {
      window.location.href = uri;
    } else {
      setShowQr((s) => !s);
    }
  }

  return (
    <div className="rounded-2xl bg-card border border-border p-6">
      <div className="flex items-center gap-2 text-primary font-semibold">
        <Smartphone className="h-4 w-4" /> Direct UPI
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Prefer paying directly? Send to UPI ID{" "}
        <code className="bg-secondary px-1.5 py-0.5 rounded font-mono text-xs">{UPI_VPA}</code>
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={openUpi}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-semibold text-primary hover:border-primary transition-smooth"
        >
          {isMobileUA() ? (
            <>Open in UPI App <ExternalLink className="h-3 w-3" /></>
          ) : (
            <>{showQr ? "Hide QR" : "Show QR to pay"}</>
          )}
        </button>
        <button
          type="button"
          onClick={copyVpa}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-semibold hover:border-primary hover:text-primary transition-smooth"
        >
          {copied ? <><Check className="h-3.5 w-3.5" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy UPI ID</>}
        </button>
        <a
          href={uri}
          className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-smooth"
        >
          upi:// link
        </a>
      </div>
      {showQr && (
        <div className="mt-4 flex flex-col items-center gap-2 rounded-lg bg-background border border-border p-4">
          <img src={qrSrc} alt="UPI QR code" width={240} height={240} className="rounded" />
          <p className="text-xs text-muted-foreground text-center">
            Scan with any UPI app (GPay, PhonePe, Paytm, BHIM){Number(amount) > 0 ? ` — ₹${Number(amount).toLocaleString("en-IN")}` : ""}
          </p>
        </div>
      )}
    </div>
  );
}
