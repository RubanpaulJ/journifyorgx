import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { api } from "../utils/api";
import { Card } from "../components/ui/Card";

export function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    api
      .getBlogPost(slug)
      .then((p) => setPost(p))
      .catch(() => setError("Post not found"));
  }, [slug]);

  if (error) {
    return (
      <Card>
        <div className="text-sm font-extrabold">{error}</div>
        <Link to="/blog" className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-indigo-600">
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>
      </Card>
    );
  }

  if (!post) return <div className="text-sm text-slate-500">Loading…</div>;

  return (
    <div className="space-y-6">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <div>
        <h1 className="text-3xl font-black tracking-tight md:text-4xl">{post.title}</h1>
        <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {new Date(post.publishedAt).toLocaleDateString()}
        </div>
      </div>

      <Card className="prose prose-slate max-w-none dark:prose-invert">
        <div style={{ whiteSpace: "pre-wrap" }}>{post.content}</div>
      </Card>
    </div>
  );
}

