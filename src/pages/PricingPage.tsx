import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

const plans = [
  {
    key: "basic",
    name: "Basic Package",
    price: "₹7,999+",
    subtitle: "Project only",
    features: [
      "Topic finalization guidance",
      "Implementation plan",
      "Source code delivery",
      "Documentation outline"
    ]
  },
  {
    key: "standard",
    name: "Standard Package",
    price: "₹15,999+",
    subtitle: "Project + Paper",
    featured: true,
    features: [
      "Everything in Basic",
      "Paper writing guidance",
      "Formatting (IEEE template)",
      "Plagiarism reduction plan",
      "Review & correction rounds"
    ]
  },
  {
    key: "premium",
    name: "Premium Package",
    price: "₹24,999+",
    subtitle: "Project + Paper + Journal Support",
    features: [
      "Everything in Standard",
      "Journal selection shortlist",
      "Submission checklist",
      "Revision guidance (responses)"
    ]
  }
];

export function PricingPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Pricing
        </div>
        <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
          Simple packages, clear deliverables
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Pricing depends on complexity, timeline and required outputs. Share your requirement for
          an exact quote.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((p) => (
          <Card
            key={p.key}
            className={`relative flex flex-col ${p.featured ? "ring-2 ring-indigo-500/40" : ""}`}
          >
            {p.featured ? (
              <div className="absolute right-4 top-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-extrabold text-white">
                Most chosen
              </div>
            ) : null}
            <div className="text-base font-extrabold">{p.name}</div>
            <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">{p.subtitle}</div>
            <div className="mt-4 text-3xl font-black tracking-tight">{p.price}</div>
            <div className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
              {p.features.map((f) => (
                <div key={f} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-emerald-500" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link to={`/contact?package=${encodeURIComponent(p.key)}&topic=${encodeURIComponent(p.name)}`}>
                <Button className="w-full">Enquire now</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="text-sm font-extrabold">Important disclaimer</div>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          We provide guidance and support. Journal acceptance depends on research quality and the
          review process. We do not guarantee acceptance.
        </p>
      </Card>
    </div>
  );
}

