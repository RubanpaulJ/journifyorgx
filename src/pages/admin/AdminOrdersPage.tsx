import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { api } from "../../utils/api";

type Order = {
  _id: string;
  trackingCode: string;
  customerName: string;
  package: string;
  topic: string;
  amountInr: number;
  status: string;
  createdAt: string;
};

export function AdminOrdersPage() {
  const [items, setItems] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [topic, setTopic] = useState("Final year project + paper");
  const [pkg, setPkg] = useState<"basic" | "standard" | "premium">("standard");
  const [amount, setAmount] = useState(15999);
  const [customerName, setCustomerName] = useState("Student");
  const [customerEmail, setCustomerEmail] = useState("student@email.com");
  const [customerPhone, setCustomerPhone] = useState("7708673061");

  async function load() {
    setLoading(true);
    try {
      const data = await api.adminGet("/orders");
      setItems(data.orders);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load().catch(() => {});
  }, []);

  async function create() {
    const trackingCode = `PP-${nanoid(8).toUpperCase()}`;
    await api.adminPost("/orders", {
      trackingCode,
      customerName,
      customerEmail,
      customerPhone,
      package: pkg,
      topic,
      amountInr: amount
    });
    await load();
  }

  async function setStatus(id: string, status: string) {
    await api.adminPatch(`/orders/${id}`, { status });
    await load();
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Orders
        </div>
        <h1 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">Track orders</h1>
      </div>

      <Card>
        <div className="text-sm font-extrabold">Create order</div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="grid gap-1 text-sm font-bold">
            Customer name
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="rounded-xl border border-slate-900/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
            />
          </label>
          <label className="grid gap-1 text-sm font-bold">
            Email
            <input
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="rounded-xl border border-slate-900/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
            />
          </label>
          <label className="grid gap-1 text-sm font-bold">
            Phone
            <input
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="rounded-xl border border-slate-900/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
            />
          </label>
          <label className="grid gap-1 text-sm font-bold">
            Package
            <select
              value={pkg}
              onChange={(e) => setPkg(e.target.value as any)}
              className="rounded-xl border border-slate-900/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
            >
              <option value="basic">basic</option>
              <option value="standard">standard</option>
              <option value="premium">premium</option>
            </select>
          </label>
          <label className="grid gap-1 text-sm font-bold md:col-span-2">
            Topic
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="rounded-xl border border-slate-900/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
            />
          </label>
          <label className="grid gap-1 text-sm font-bold">
            Amount (INR)
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="rounded-xl border border-slate-900/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
            />
          </label>
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={create}>Create</Button>
          <Button variant="secondary" onClick={() => load()} disabled={loading}>
            Refresh
          </Button>
        </div>
      </Card>

      <Card>
        <div className="text-sm font-extrabold">All orders</div>
        <div className="mt-4 overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-500">
              <tr>
                <th className="py-2 pr-3">Tracking</th>
                <th className="py-2 pr-3">Customer</th>
                <th className="py-2 pr-3">Package</th>
                <th className="py-2 pr-3">Status</th>
                <th className="py-2 pr-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((o) => (
                <tr key={o._id} className="border-t border-white/10">
                  <td className="py-3 pr-3">
                    <div className="font-extrabold">{o.trackingCode}</div>
                    <div className="text-xs text-slate-500">{o.topic}</div>
                  </td>
                  <td className="py-3 pr-3 text-xs text-slate-500">{o.customerName}</td>
                  <td className="py-3 pr-3">{o.package}</td>
                  <td className="py-3 pr-3">
                    <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-xs font-extrabold text-indigo-700 dark:text-indigo-300">
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 pr-3">
                    <div className="flex flex-wrap gap-2">
                      {["received", "consultation", "in_progress", "review", "completed"].map((s) => (
                        <Button key={s} variant="ghost" onClick={() => setStatus(o._id, s)}>
                          {s}
                        </Button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
              {!items.length ? (
                <tr>
                  <td className="py-4 text-slate-500" colSpan={5}>
                    No orders yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

