import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import { useAppConfig } from "../state/AppConfig";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { whatsappLink } from "../utils/whatsapp";

export function HomePage() {
  const { config } = useAppConfig();
  const wa = whatsappLink(
    config.whatsappNumber,
    `Hi ${config.appName}, I want guidance for paper publishing and final year project.`
  );

  return (
    <div className="space-y-14">
      <section className="relative overflow-hidden rounded-3xl border border-slate-900/10 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-8 text-white shadow-2xl shadow-indigo-600/20 md:p-12">
        <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_30%,white,transparent_35%),radial-gradient(circle_at_40%_90%,white,transparent_40%)]" />
        <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-xs font-extrabold">
              <ShieldCheck className="h-4 w-4" /> Trusted guidance for students & scholars
            </div>
            <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight md:text-5xl">
              Publish Your Research Faster with Expert Guidance
            </h1>
            <p className="mt-4 text-sm text-white/90 md:text-base">
              From idea to implementation to publication — we support everything.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/contact">
                <Button>
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href={wa} target="_blank" rel="noreferrer">
                <Button variant="secondary">Talk to Expert (WhatsApp)</Button>
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { label: "Projects Completed", value: "500+" },
                { label: "Papers Published", value: "300+" },
                { label: "Client Satisfaction", value: "95%" }
              ].map((s) => (
                <div key={s.label} className="glass rounded-2xl p-4 text-center">
                  <div className="text-2xl font-black">{s.value}</div>
                  <div className="mt-1 text-[11px] font-bold text-white/80">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid gap-3"
          >
            <Card className="bg-white/10">
              <div className="text-sm font-extrabold">What we deliver</div>
              <ul className="mt-3 space-y-2 text-sm text-white/90">
                {[
                  "Final year project development (CSE/IT/AI/ML/Web)",
                  "Conference / journal paper writing guidance",
                  "Research implementation with code + documentation",
                  "Plagiarism reduction & report",
                  "Journal selection & submission guidance",
                  "Fast-track assistance (no acceptance guarantee)"
                ].map((x) => (
                  <li key={x} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="bg-white/10">
              <div className="text-sm font-extrabold">Trust note</div>
              <p className="mt-2 text-sm text-white/90">
                We provide guidance and expert support. Journal acceptance depends on research
                quality and the review process.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Student-friendly process",
            desc: "Simple English, clear milestones, predictable deliverables."
          },
          { title: "Quality + ethics", desc: "Plagiarism-safe writing and proper citations." },
          { title: "Implementation-ready", desc: "Code + documentation + PPT & viva support." }
        ].map((x) => (
          <Card key={x.title}>
            <div className="text-base font-extrabold">{x.title}</div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{x.desc}</p>
          </Card>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-900/10 bg-white/60 p-8 dark:border-white/10 dark:bg-white/5">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              How it works
            </div>
            <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">
              From requirement to submission guidance
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              A step-by-step workflow designed for final year students, postgraduates and research
              scholars.
            </p>
            <div className="mt-5">
              <Link to="/how-it-works">
                <Button variant="ghost" className="px-0">
                  View steps <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid gap-3">
            {[
              "Submit Requirement",
              "Expert Consultation",
              "Development & Writing",
              "Review & Corrections",
              "Submission Guidance"
            ].map((s, i) => (
              <div
                key={s}
                className="flex items-center justify-between rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3 text-sm font-bold dark:border-white/10 dark:bg-white/5"
              >
                <span>
                  <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-600 text-xs font-black text-white">
                    {i + 1}
                  </span>
                  {s}
                </span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-black tracking-tight md:text-3xl">
          Ready to start your final year project or paper?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Final year project help, IEEE paper writing service, Scopus journal assistance India, and
          research paper implementation — all in one place.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/services">
            <Button variant="secondary">Explore services</Button>
          </Link>
          <Link to="/pricing">
            <Button>See pricing</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

