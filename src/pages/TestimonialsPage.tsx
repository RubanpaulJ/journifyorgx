import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { api } from "../utils/api";
import { Card } from "../components/ui/Card";

type Testimonial = {
  _id: string;
  name: string;
  college: string;
  rating: number;
  quote: string;
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-700"}`}
        />
      ))}
    </div>
  );
}

export function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);

  useEffect(() => {
    api
      .listTestimonials()
      .then((t) => setItems(t))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Testimonials
        </div>
        <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
          Student reviews
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Real feedback from final year students, postgraduates and research scholars.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {items.map((t) => (
          <Card key={t._id} className="flex flex-col">
            <Stars rating={t.rating} />
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">“{t.quote}”</p>
            <div className="mt-4 text-sm font-extrabold">{t.name}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">{t.college}</div>
          </Card>
        ))}
        {!items.length ? (
          <Card>
            <div className="text-sm font-extrabold">No testimonials yet</div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Run backend seed (`npm run seed`) to load sample testimonials.
            </p>
          </Card>
        ) : null}
      </div>
    </div>
  );
}

