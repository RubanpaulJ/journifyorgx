import { useState } from "react";
import { Search } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { api } from "../utils/api";

export function TrackOrderPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function track() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const order = await api.trackOrder(code.trim());
      setResult(order);
    } catch {
      setError("Tracking code not found.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Order tracking
        </div>
        <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
          Track your order status
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Enter the tracking code shared by the admin team.
        </p>
      </div>

      <Card>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g., PP-AB12CD34"
            className="flex-1 rounded-xl border border-slate-900/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
          />
          <Button onClick={track} disabled={!code.trim() || loading}>
            <Search className="h-4 w-4" />
            {loading ? "Checking…" : "Track"}
          </Button>
        </div>
        {error ? <div className="mt-3 text-sm text-rose-600 dark:text-rose-300">{error}</div> : null}
      </Card>

      {result ? (
        <Card>
          <div className="text-sm font-extrabold">Status</div>
          <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            <div>
              <span className="font-bold">Tracking:</span> {result.trackingCode}
            </div>
            <div>
              <span className="font-bold">Package:</span> {result.package}
            </div>
            <div>
              <span className="font-bold">Topic:</span> {result.topic}
            </div>
            <div className="mt-3">
              <span className="font-bold">Current status:</span>{" "}
              <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-xs font-extrabold text-indigo-700 dark:text-indigo-300">
                {result.status}
              </span>
            </div>
            {result.timelineNotes?.length ? (
              <div className="mt-4">
                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Timeline
                </div>
                <ul className="mt-2 list-disc pl-5">
                  {result.timelineNotes.map((n: string, i: number) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Card>
      ) : null}
    </div>
  );
}

