import { ArrowRight } from "lucide-react";
import { Card } from "../components/ui/Card";

const steps = [
  {
    title: "Submit Your Requirements",
    desc: "Provide your research domain, topic, university guidelines, deadlines, and specific deliverables. This helps us understand your objectives and expectations from the outset."
  },
  {
    title: "Personalized Expert Consultation",
    desc: "Engage in a one-on-one session with our subject matter experts to clarify your goals, discuss feasible approaches, and receive a tailored project plan with clear timelines and deliverables."
  },
  {
    title: "Comprehensive Development & Writing",
    desc: "Our team executes your project with precision—covering source code development, technical documentation, data analysis, and presentation materials, all aligned with academic standards."
  },
  {
    title: "Rigorous Review & Quality Assurance",
    desc: "Benefit from multiple review cycles, plagiarism checks, and constructive feedback to ensure your work meets the highest standards of originality and quality."
  },
  {
    title: "Submission & Publication Support",
    desc: "Receive end-to-end guidance for journal or conference submission, including formatting, checklist preparation, and expert advice for responding to reviewer comments."
  }
];

export function HowItWorksPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          How It Works
        </div>
        <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
          Our Professional Workflow
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Experience a streamlined, transparent process designed for academic excellence. From initial consultation to final submission, we ensure every step is handled with expertise and attention to detail.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {steps.map((s, i) => (
          <Card key={s.title} className="relative overflow-hidden">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-600/30 to-fuchsia-600/30 blur-2xl" />
            <div className="relative flex items-start gap-4">
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-sm font-black text-white">
                {i + 1}
              </div>
              <div>
                <div className="text-base font-extrabold">{s.title}</div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{s.desc}</p>
              </div>
            </div>
            {/* Removed 'Next ->' for a cleaner look */}
          </Card>
        ))}
      </div>

      <Card>
        <div className="text-sm font-extrabold">Priority & Ethical Commitment</div>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          We offer fast-track options for urgent projects whenever possible. Please note: while we provide expert guidance and support, acceptance by journals or conferences depends on the quality of research and the review process. We uphold the highest standards of academic integrity and ethics in every engagement.
        </p>
      </Card>
    </div>
  );
}

