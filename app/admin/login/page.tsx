"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Coffee } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { t } = useLanguage();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Login failed");
        return;
      }

      const { token } = await response.json();
      
      // Store token in localStorage
      localStorage.setItem("authToken", token);
      
      // Redirect to admin dashboard
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center px-4 relative overflow-hidden select-none py-12">
      {/* Subtle organic background decoration */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      {/* Language Switcher container - styled neatly */}
      <div className="absolute top-6 right-6">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-lg z-10">
        <div className="text-center mb-8">
          <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-card shadow-md border-gold-emboss mb-4 relative overflow-visible group">
            {/* Animated Steam Lines */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1.5 items-end h-8 overflow-visible pointer-events-none">
              <svg className="w-2 h-6 text-primary/60 steam-line-1" viewBox="0 0 10 30" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5,25 Q0,18 5,12 T5,0" />
              </svg>
              <svg className="w-2 h-6 text-primary/80 steam-line-2" viewBox="0 0 10 30" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5,25 Q10,18 5,12 T5,0" />
              </svg>
              <svg className="w-2 h-6 text-primary/60 steam-line-3" viewBox="0 0 10 30" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5,25 Q0,18 5,12 T5,0" />
              </svg>
            </div>
            <Coffee className="h-10 w-10 text-primary" />
          </div>
          
          <h1 className="text-4xl font-extrabold text-foreground font-moul tracking-normal mb-1 leading-relaxed">
            លីនី កាហ្វេ
          </h1>
          <h2 className="text-xl font-bold text-primary tracking-normal mb-3">
            Leenee Coffee Admin Portal
          </h2>
          <p className="text-base text-muted-foreground max-w-sm mx-auto leading-relaxed">
            សូមវាយបញ្ចូល អ៊ីមែល និងលេខកូដសម្ងាត់ ដើម្បីចូលទៅកាន់ផ្ទាំងគ្រប់គ្រង
            <span className="block text-xs mt-1 text-muted-foreground/75 font-medium">(Please sign in to manage your menu items)</span>
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-xl p-8 relative overflow-hidden">
          {/* Subtle top brand line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gold-gradient" />

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-xl text-base flex items-start gap-2.5">
                <div className="text-xl mt-0.5 select-none">⚠️</div>
                <div className="leading-relaxed">
                  <p className="font-bold">ព័ត៌មានមិនត្រឹមត្រូវ / Sign-in Failed</p>
                  <p className="text-sm text-red-600/95 mt-0.5">
                    {error === "Login failed" 
                      ? "អ៊ីមែល ឬលេខកូដសម្ងាត់ មិនត្រឹមត្រូវទេ។ សូមពិនិត្យម្តងទៀត! / Incorrect email or password. Please verify your credentials and try again!" 
                      : "បណ្តាញមានបញ្ហា ឬព័ត៌មានមិនត្រឹមត្រូវ។ / " + error}
                  </p>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-base font-bold text-foreground mb-2 flex items-center gap-1.5"
              >
                📧 អាសយដ្ឋានអ៊ីមែល / Email Address <span className="text-primary">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-3.5 border-2 border-border/80 rounded-xl bg-background text-foreground text-lg focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary transition-all duration-200 placeholder:text-muted-foreground/50 font-medium"
                placeholder="ឧ. admin@leeneecoffee.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-base font-bold text-foreground mb-2 flex items-center gap-1.5"
              >
                🔑 លេខកូដសម្ងាត់ / Password <span className="text-primary">*</span>
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-3.5 border-2 border-border/80 rounded-xl bg-background text-foreground text-lg focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary transition-all duration-200 placeholder:text-muted-foreground/50 tracking-wide font-medium"
                placeholder="វាយលេខកូដសម្ងាត់ទីនេះ"
              />
              
              {/* Senior-friendly password visibility toggle */}
              <label className="flex items-center gap-3 cursor-pointer select-none mt-3.5 group">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="h-6 w-6 rounded border-2 border-border/80 text-primary focus:ring-primary accent-primary cursor-pointer transition-colors"
                />
                <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                  បង្ហាញលេខកូដសម្ងាត់ / Show Password
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-gradient text-white py-4 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-white border-r-transparent" />
                  <span className="font-bold">កំពុងចូល... / Signing In...</span>
                </>
              ) : (
                <>
                  <span className="font-bold">🔑 ចូលប្រព័ន្ធ / Sign In</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-base font-bold text-primary hover:text-foreground flex items-center justify-center gap-1.5 transition-colors leading-relaxed hover:underline underline-offset-4"
          >
            ← ត្រឡប់ទៅទំព័រដើម / Back to Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
