import { useEffect, useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { api } from "../../utils/api";

type Post = {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  isPublic: boolean;
  publishedAt: string;
};

export function AdminBlogPage() {
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const [slug, setSlug] = useState("new-post");
  const [title, setTitle] = useState("New blog post");
  const [excerpt, setExcerpt] = useState("Short excerpt…");
  const [content, setContent] = useState("Write your content here…");
  const [tags, setTags] = useState("IEEE, Scopus");
  const [isPublic, setIsPublic] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await api.adminGet("/blog");
      setItems(data.posts);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load().catch(() => {});
  }, []);

  async function create() {
    await api.adminPost("/blog", {
      slug,
      title,
      excerpt,
      content,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      isPublic
    });
    await load();
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Blog
        </div>
        <h1 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">Manage posts</h1>
      </div>

      <Card>
        <div className="text-sm font-extrabold">Add post</div>
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
            Excerpt
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className="rounded-xl border border-slate-900/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
            />
          </label>
          <label className="grid gap-1 text-sm font-bold md:col-span-2">
            Content
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="rounded-xl border border-slate-900/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
            />
          </label>
          <label className="grid gap-1 text-sm font-bold">
            Tags (comma separated)
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
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
        <div className="text-sm font-extrabold">All posts</div>
        <div className="mt-4 overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-500">
              <tr>
                <th className="py-2 pr-3">Title</th>
                <th className="py-2 pr-3">Slug</th>
                <th className="py-2 pr-3">Public</th>
                <th className="py-2 pr-3">Published</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p._id} className="border-t border-white/10">
                  <td className="py-3 pr-3 font-extrabold">{p.title}</td>
                  <td className="py-3 pr-3 text-xs text-slate-500">{p.slug}</td>
                  <td className="py-3 pr-3">{String(p.isPublic)}</td>
                  <td className="py-3 pr-3 text-xs text-slate-500">
                    {new Date(p.publishedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {!items.length ? (
                <tr>
                  <td className="py-4 text-slate-500" colSpan={4}>
                    No posts yet.
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

