import { useEffect, useState } from "react";
import { Card } from "../components/ui/Card";
import { api } from "../utils/api";

type Project = {
  _id: string;
  title: string;
  slug: string;
  techStack: string[];
  abstract: string;
  screenshots: string[];
};

export function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    api
      .listProjects()
      .then((p) => setProjects(p))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Projects / Portfolio
        </div>
        <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
          Sample projects & implementations
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          A small glimpse of domains we support: AI/ML, web apps, blockchain, and research
          implementations.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <Card key={p.slug} className="space-y-3">
            <div className="text-base font-extrabold">{p.title}</div>
            <div className="flex flex-wrap gap-2">
              {(p.techStack || []).map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-bold text-slate-700 dark:bg-white/10 dark:text-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{p.abstract}</p>
            <div className="grid grid-cols-2 gap-2">
              {(p.screenshots || []).slice(0, 2).map((s) => (
                <div
                  key={s}
                  className="aspect-video overflow-hidden rounded-2xl border border-slate-900/10 bg-gradient-to-br from-slate-100 to-slate-200 dark:border-white/10 dark:from-white/5 dark:to-white/10"
                  title={s}
                >
                  <div className="p-3 text-xs font-bold text-slate-500 dark:text-slate-400">
                    Screenshot placeholder
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
        {!projects.length ? (
          <Card>
            <div className="text-sm font-extrabold">No projects yet</div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Run backend seed (`npm run seed`) to load sample portfolio data.
            </p>
          </Card>
        ) : null}
      </div>
    </div>
  );
}

