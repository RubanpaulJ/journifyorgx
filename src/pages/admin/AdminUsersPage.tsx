import { useEffect, useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { api } from "../../utils/api";

type User = { _id: string; name: string; email: string; role: string; createdAt: string };

export function AdminUsersPage() {
  const [items, setItems] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await api.adminGet("/users");
      setItems(data.users);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load().catch(() => {});
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Users
        </div>
        <h1 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">Manage users</h1>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <div className="text-sm font-extrabold">All users</div>
          <Button variant="secondary" onClick={() => load()} disabled={loading}>
            Refresh
          </Button>
        </div>
        <div className="mt-4 overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-500">
              <tr>
                <th className="py-2 pr-3">Name</th>
                <th className="py-2 pr-3">Email</th>
                <th className="py-2 pr-3">Role</th>
                <th className="py-2 pr-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {items.map((u) => (
                <tr key={u._id} className="border-t border-white/10">
                  <td className="py-3 pr-3 font-extrabold">{u.name}</td>
                  <td className="py-3 pr-3 text-xs text-slate-500">{u.email}</td>
                  <td className="py-3 pr-3">{u.role}</td>
                  <td className="py-3 pr-3 text-xs text-slate-500">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {!items.length ? (
                <tr>
                  <td className="py-4 text-slate-500" colSpan={4}>
                    No users yet.
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

