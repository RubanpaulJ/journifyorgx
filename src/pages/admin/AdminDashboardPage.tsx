import { useEffect, useState } from "react";
import { Card } from "../../components/ui/Card";
import { api } from "../../utils/api";

export function AdminDashboardPage() {
  const [stats, setStats] = useState<{ enquiries: number; orders: number; users: number } | null>(
    null
  );

  useEffect(() => {
    Promise.all([api.adminGet("/enquiries"), api.adminGet("/orders"), api.adminGet("/users")])
      .then(([e, o, u]) => {
        setStats({ enquiries: e.enquiries.length, orders: o.orders.length, users: u.users.length });
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Dashboard
        </div>
        <h1 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">Overview</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
            Enquiries
          </div>
          <div className="mt-2 text-3xl font-black">{stats?.enquiries ?? "—"}</div>
        </Card>
        <Card>
          <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Orders</div>
          <div className="mt-2 text-3xl font-black">{stats?.orders ?? "—"}</div>
        </Card>
        <Card>
          <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Users</div>
          <div className="mt-2 text-3xl font-black">{stats?.users ?? "—"}</div>
        </Card>
      </div>

      <Card>
        <div className="text-sm font-extrabold">Reminder</div>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Update `.env` before deploying: `JWT_SECRET`, mail credentials, and admin seed password.
        </p>
      </Card>
    </div>
  );
}

