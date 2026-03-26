import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock } from "lucide-react";

import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { api } from "../../utils/api";
import { useAppConfig } from "../../state/AppConfig";

export function AdminLoginPage() {
  const { config } = useAppConfig();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@paperpro.local");
  const [password, setPassword] = useState("Admin@12345");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    setError(null);
    try {
      const user = await api.adminLogin(email, password);
      if (user?.role !== "admin") throw new Error("Not admin");
      navigate("/admin");
    } catch {
      setError("Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-md space-y-6">
        <div>
          <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
            Admin login
          </div>
          <div className="mt-1 text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            {config.appName}
          </div>
        </div>

        <Card>
          <div className="flex items-center gap-2 text-sm font-extrabold">
            <Lock className="h-4 w-4" /> Sign in
          </div>
          <div className="mt-4 grid gap-3">
            <label className="grid gap-1 text-sm font-bold">
              Email
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border border-slate-900/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
              />
            </label>
            <label className="grid gap-1 text-sm font-bold">
              Password
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="rounded-xl border border-slate-900/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
              />
            </label>

            <Button onClick={login} disabled={loading || !email || !password}>
              {loading ? "Signing in…" : "Login"}
            </Button>

            {error ? (
              <div className="rounded-xl bg-rose-500/10 p-3 text-sm text-rose-700 dark:text-rose-300">
                {error}
              </div>
            ) : null}

            <div className="text-xs text-slate-500">
              Default seed credentials are in `server/.env` (`ADMIN_SEED_*`). Change them before
              deployment.
            </div>
          </div>
        </Card>

        <Link to="/" className="text-sm font-bold text-indigo-600 dark:text-indigo-300">
          ← Back to website
        </Link>
      </div>
    </div>
  );
}

