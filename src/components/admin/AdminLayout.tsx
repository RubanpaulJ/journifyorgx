import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, FileText, Layers, Mail, Users, Package, BookOpen } from "lucide-react";

import { api } from "../../utils/api";
import { useAppConfig } from "../../state/AppConfig";

const item =
  "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-900/5 dark:text-slate-200 dark:hover:bg-white/10";

export function AdminLayout() {
  const { config } = useAppConfig();
  const navigate = useNavigate();

  const token = localStorage.getItem("paperpro_admin_token");
  if (!token) {
    // Lazy guard: if not logged in, force login page
    window.location.href = "/admin/login";
    return null;
  }

  function logout() {
    api.adminLogout();
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 md:grid-cols-[240px_1fr]">
        <aside className="glass rounded-2xl p-4">
          <Link to="/" className="block">
            <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Admin
            </div>
            <div className="mt-1 text-lg font-black tracking-tight">{config.appName}</div>
          </Link>

          <nav className="mt-5 grid gap-1">
            <NavLink to="/admin" end className={item}>
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </NavLink>
            <NavLink to="/admin/enquiries" className={item}>
              <Mail className="h-4 w-4" /> Enquiries
            </NavLink>
            <NavLink to="/admin/orders" className={item}>
              <Package className="h-4 w-4" /> Orders
            </NavLink>
            <NavLink to="/admin/projects" className={item}>
              <Layers className="h-4 w-4" /> Projects
            </NavLink>
            <NavLink to="/admin/services" className={item}>
              <FileText className="h-4 w-4" /> Services
            </NavLink>
            <NavLink to="/admin/blog" className={item}>
              <BookOpen className="h-4 w-4" /> Blog
            </NavLink>
            <NavLink to="/admin/users" className={item}>
              <Users className="h-4 w-4" /> Users
            </NavLink>
          </nav>

          <button onClick={logout} className={`${item} mt-4 w-full justify-start`}>
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </aside>

        <main className="rounded-2xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

