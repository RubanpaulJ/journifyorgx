import { useEffect, useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { api } from "../../utils/api";

type Project = {
  _id: string;
  title: string;
  slug: string;
  techStack: string[];
  abstract: string;
  isPublic: boolean;
};

export function AdminProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("New Project");
  const [slug, setSlug] = useState("new-project");
  const [techStack, setTechStack] = useState("React, Node.js, MongoDB");
  const [abstract, setAbstract] = useState("Short abstract…");
  const [isPublic, setIsPublic] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await api.adminGet("/projects");
      setItems(data.projects);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load().catch(() => {});
  }, []);

  async function create() {
    await api.adminPost("/projects", {
      title,
      slug,
      techStack: techStack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      abstract,
      screenshots: [],
      isPublic
    });
    await load();
  }

  async function toggle(id: string, current: boolean) {
    await api.adminPatch(`/projects/${id}`, { isPublic: !current });
    await load();
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Projects
        </div>
        <h1 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">Portfolio upload</h1>
      </div>

      <Card>
        <div className="text-sm font-extrabold">Add project</div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="grid gap-1 text-sm font-bold">
            Title
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl border border-slate-900/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
            />
          </label>
          <label className="grid gap-1 text-sm font-bold">
            Slug
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="rounded-xl border border-slate-900/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
            />
          </label>
          <label className="grid gap-1 text-sm font-bold md:col-span-2">
            Tech stack (comma separated)
            <input
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="rounded-xl border border-slate-900/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
            />
          </label>
          <label className="grid gap-1 text-sm font-bold md:col-span-2">
            Abstract
            <textarea
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              rows={4}
              className="rounded-xl border border-slate-900/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
            />
          </label>
          <label className="flex items-center gap-2 text-sm font-bold">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            Public
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
        <div className="text-sm font-extrabold">All projects</div>
        <div className="mt-4 overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-500">
              <tr>
                <th className="py-2 pr-3">Title</th>
                <th className="py-2 pr-3">Slug</th>
                <th className="py-2 pr-3">Public</th>
                <th className="py-2 pr-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p._id} className="border-t border-white/10">
                  <td className="py-3 pr-3 font-extrabold">{p.title}</td>
                  <td className="py-3 pr-3 text-xs text-slate-500">{p.slug}</td>
                  <td className="py-3 pr-3">{String(p.isPublic)}</td>
                  <td className="py-3 pr-3">
                    <Button variant="ghost" onClick={() => toggle(p._id, p.isPublic)}>
                      Toggle
                    </Button>
                  </td>
                </tr>
              ))}
              {!items.length ? (
                <tr>
                  <td className="py-4 text-slate-500" colSpan={4}>
                    No projects yet.
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

