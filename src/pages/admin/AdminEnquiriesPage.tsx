import { useEffect, useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { api } from "../../utils/api";

type Enquiry = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  projectTopic: string;
  message: string;
  status: "new" | "in_progress" | "resolved";
  createdAt: string;
};

export function AdminEnquiriesPage() {
  const [items, setItems] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await api.adminGet("/enquiries");
      setItems(data.enquiries);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load().catch(() => {});
  }, []);

  async function setStatus(id: string, status: Enquiry["status"]) {
    await api.adminPatch(`/enquiries/${id}`, { status });
    await load();
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Enquiries
        </div>
        <h1 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">Inbox</h1>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <div className="text-sm font-extrabold">Latest enquiries</div>
          <Button variant="secondary" onClick={() => load()} disabled={loading}>
            Refresh
          </Button>
        </div>
        <div className="mt-4 overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-500">
              <tr>
                <th className="py-2 pr-3">Name</th>
                <th className="py-2 pr-3">Topic</th>
                <th className="py-2 pr-3">Status</th>
                <th className="py-2 pr-3">Created</th>
                <th className="py-2 pr-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((e) => (
                <tr key={e._id} className="border-t border-white/10">
                  <td className="py-3 pr-3">
                    <div className="font-extrabold">{e.name}</div>
                    <div className="text-xs text-slate-500">{e.email}</div>
                    <div className="text-xs text-slate-500">{e.phone}</div>
                  </td>
                  <td className="py-3 pr-3">
                    <div className="font-bold">{e.projectTopic}</div>
                    <div className="mt-1 text-xs text-slate-500 line-clamp-2">{e.message}</div>
                  </td>
                  <td className="py-3 pr-3">
                    <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-xs font-extrabold text-indigo-700 dark:text-indigo-300">
                      {e.status}
                    </span>
                  </td>
                  <td className="py-3 pr-3 text-xs text-slate-500">
                    {new Date(e.createdAt).toLocaleString()}
                  </td>
                  <td className="py-3 pr-3">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="ghost" onClick={() => setStatus(e._id, "new")}>
                        New
                      </Button>
                      <Button variant="ghost" onClick={() => setStatus(e._id, "in_progress")}>
                        In progress
                      </Button>
                      <Button variant="ghost" onClick={() => setStatus(e._id, "resolved")}>
                        Resolved
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {!items.length ? (
                <tr>
                  <td className="py-4 text-slate-500" colSpan={5}>
                    No enquiries yet.
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

