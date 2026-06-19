import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/site/Section";
import { Loader2, Lock } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Global Safety Enterprises" },
      { name: "description", content: "Admin sign-in for Global Safety Enterprises." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin/payments" });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin/payments" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin/payments" },
        });
        if (error) throw error;
        setInfo("Account created. You can sign in now (admin access must be granted separately).");
        setMode("signin");
      }
    } catch (err: any) {
      setError(err?.message || "Authentication failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageHero title="Admin Sign In" subtitle="Access the payments dashboard." />
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-md">
          <div className="rounded-2xl bg-card border border-border p-8 shadow-card">
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setMode("signin")}
                className={`flex-1 rounded-md py-2 text-sm font-semibold ${
                  mode === "signin"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                }`}
              >
                Sign in
              </button>
              <button
                onClick={() => setMode("signup")}
                className={`flex-1 rounded-md py-2 text-sm font-semibold ${
                  mode === "signup"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                }`}
              >
                Create account
              </button>
            </div>
            <form onSubmit={submit} className="space-y-4">
              <label className="block">
                <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Email
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
              <label className="block">
                <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Password
                </span>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
              {error && (
                <div className="rounded-md border border-destructive/50 bg-destructive/5 text-destructive text-sm px-3 py-2">
                  {error}
                </div>
              )}
              {info && (
                <div className="rounded-md border border-accent/50 bg-accent/5 text-accent text-sm px-3 py-2">
                  {info}
                </div>
              )}
              <button
                type="submit"
                disabled={busy}
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-fire-gradient py-3 font-semibold text-accent-foreground shadow-fire hover:scale-[1.01] transition-smooth disabled:opacity-60"
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                {mode === "signin" ? "Sign in" : "Create account"}
              </button>
            </form>
            <p className="mt-6 text-xs text-muted-foreground text-center">
              <Link to="/" className="hover:text-primary">← Back to website</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
