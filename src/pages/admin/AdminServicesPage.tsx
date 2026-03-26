import { useEffect, useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { api } from "../../utils/api";

type Service = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  priceFromInr: number;
  isActive: boolean;
};

export function AdminServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const [slug, setSlug] = useState("new-service");
  const [title, setTitle] = useState("New Service");
  const [description, setDescription] = useState("Description…");
  const [priceFromInr, setPriceFromInr] = useState(999);

  async function load() {
    setLoading(true);
    try {
      const data = await api.adminGet("/services");
      setItems(data.services);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load().catch(() => {});
  }, []);

  async function create() {
    await api.adminPost("/services", { slug, title, description, priceFromInr, isActive: true });
    await load();
  }

  async function toggle(id: string, current: boolean) {
    await api.adminPatch(`/services/${id}`, { isActive: !current });
    await load();
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Services
        </div>
        <h1 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">Manage services</h1>
      </div>

      <Card>
        <div className="text-sm font-extrabold">Add service</div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="grid gap-1 text-sm font-bold">
            Slug
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="rounded-xl border border-slate-900/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
            />
          </label>
          <label className="grid gap-1 text-sm font-bold">
            Title
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl border border-slate-900/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
            />
          </label>
          <label className="grid gap-1 text-sm font-bold md:col-span-2">
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="rounded-xl border border-slate-900/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
            />
          </label>
          <label className="grid gap-1 text-sm font-bold">
            Price from (INR)
            <input
              type="number"
              value={priceFromInr}
              onChange={(e) => setPriceFromInr(Number(e.target.value))}
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
        <div className="text-sm font-extrabold">All services</div>
        <div className="mt-4 overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-500">
              <tr>
                <th className="py-2 pr-3">Title</th>
                <th className="py-2 pr-3">Slug</th>
                <th className="py-2 pr-3">Active</th>
                <th className="py-2 pr-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((s) => (
                <tr key={s._id} className="border-t border-white/10">
                  <td className="py-3 pr-3 font-extrabold">{s.title}</td>
                  <td className="py-3 pr-3 text-xs text-slate-500">{s.slug}</td>
                  <td className="py-3 pr-3">{String(s.isActive)}</td>
                  <td className="py-3 pr-3">
                    <Button variant="ghost" onClick={() => toggle(s._id, s.isActive)}>
                      Toggle
                    </Button>
                  </td>
                </tr>
              ))}
              {!items.length ? (
                <tr>
                  <td className="py-4 text-slate-500" colSpan={4}>
                    No services yet.
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

