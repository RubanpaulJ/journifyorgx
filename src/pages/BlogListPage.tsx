import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { api } from "../utils/api";
import { Card } from "../components/ui/Card";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  publishedAt: string;
};

export function BlogListPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    api
      .listBlogPosts()
      .then((p) => setPosts(p))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Blog
        </div>
        <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
          Publishing tips & student guides
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Practical content around IEEE submissions, Scopus journal shortlisting, and research paper
          implementation.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <Link key={p.slug} to={`/blog/${p.slug}`}>
            <Card className="h-full hover:shadow-lg hover:shadow-indigo-600/10 transition">
              <div className="text-base font-extrabold">{p.title}</div>
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Calendar className="h-4 w-4" />
                <span>{new Date(p.publishedAt).toLocaleDateString()}</span>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{p.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(p.tags || []).map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-bold text-slate-700 dark:bg-white/10 dark:text-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Card>
          </Link>
        ))}
        {!posts.length ? (
          <Card>
            <div className="text-sm font-extrabold">No posts yet</div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Run backend seed (`npm run seed`) to load sample posts.
            </p>
          </Card>
        ) : null}
      </div>
    </div>
  );
}

