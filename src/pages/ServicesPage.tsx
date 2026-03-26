import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { api } from "../utils/api";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

type Service = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  priceFromInr: number;
};

const fallback: Service[] = [
  {
    _id: "1",
    slug: "final-year-project-development",
    title: "Final Year Project Development",
    description:
      "Project development for CSE/IT/AI/ML/Web with documentation and guidance.",
    priceFromInr: 7999
  },
  {
    _id: "2",
    slug: "ieee-paper-writing",
    title: "IEEE Paper Writing",
    description: "Writing + formatting guidance aligned to IEEE templates.",
    priceFromInr: 5999
  },
  {
    _id: "3",
    slug: "scopus-journal-assistance",
    title: "Scopus Journal Assistance",
    description: "Journal selection and submission guidance for indexed journals.",
    priceFromInr: 9999
  },
  {
    _id: "4",
    slug: "implementation-with-source-code",
    title: "Implementation with Source Code",
    description: "Research implementation with code, results and documentation.",
    priceFromInr: 8999
  },
  {
    _id: "5",
    slug: "plagiarism-report",
    title: "Plagiarism Report",
    description: "Plagiarism reduction guidance with report and rewriting support.",
    priceFromInr: 1499
  },
  {
    _id: "6",
    slug: "ppt-viva-preparation",
    title: "PPT & Viva Preparation",
    description: "PPT, viva Q&A and demo plan tailored to your guidelines.",
    priceFromInr: 999
  }
];

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .listServices()
      .then((s) => setServices(s))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const cards = useMemo(() => services, [services]);

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Services
        </div>
        <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
          Academic services for final year & research
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Choose a service and share your requirement. Pricing shown is “starting from” and depends
          on scope, timeline, and deliverables.
        </p>
      </div>

      {loading ? (
        <div className="text-sm text-slate-500">Loading services…</div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((s) => (
          <Card key={s.slug} className="flex flex-col">
            <div className="text-base font-extrabold">{s.title}</div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{s.description}</p>
            <div className="mt-4 text-sm">
              <span className="text-slate-500 dark:text-slate-400">Starting from</span>{" "}
              <span className="text-lg font-black">₹{s.priceFromInr.toLocaleString("en-IN")}</span>
            </div>
            <div className="mt-5">
              <Link to={`/contact?topic=${encodeURIComponent(s.title)}`}>
                <Button className="w-full">
                  Enquire Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="text-sm font-extrabold">Also included (on request)</div>
        <div className="mt-3 grid gap-2 text-sm text-slate-600 dark:text-slate-400 md:grid-cols-2">
          <div>Final Year Project Development (CSE, IT, AI, ML, Web Development)</div>
          <div>Conference Paper Writing</div>
          <div>Journal Paper Writing (Scopus, IEEE, UGC indexed guidance)</div>
          <div>Research Paper Implementation (code + documentation)</div>
          <div>Plagiarism Reduction & Report</div>
          <div>Journal Selection & Submission Guidance</div>
          <div>Fast-track Assistance (expert support, not guaranteed acceptance)</div>
          <div>PPT & Viva Preparation</div>
        </div>
      </Card>
    </div>
  );
}

