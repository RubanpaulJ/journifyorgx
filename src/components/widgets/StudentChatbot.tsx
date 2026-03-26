import { useMemo, useState } from "react";
import { Bot, X, Sparkles } from "lucide-react";
import { Card } from "../ui/Card";

type Msg = { from: "bot" | "user"; text: string };

const qa: { q: string; a: string }[] = [
  {
    q: "How do I start?",
    a: "Send your requirement (domain, topic idea, college format). We schedule a short consultation and share a clear plan, timeline and deliverables."
  },
  {
    q: "Do you guarantee IEEE/Scopus acceptance?",
    a: "No. We provide expert guidance and support. Acceptance depends on research quality and the review process."
  },
  {
    q: "Can you implement with code + documentation?",
    a: "Yes. We support research paper implementation with clean source code, results, documentation, PPT and viva preparation."
  },
  {
    q: "Do you help reduce plagiarism?",
    a: "Yes. We guide rewriting, citation improvement, and provide a plagiarism reduction plan and report."
  }
];

export function StudentChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "👋 Hello! I’m your Advanced AI Assistant. How can I help you achieve your academic goals today?" }
  ]);

  const suggested = useMemo(() => qa.map((x) => x.q), []);

  function ask(q: string) {
    const found = qa.find((x) => x.q === q);
    setMessages((m) => [
      ...m,
      { from: "user", text: q },
      { from: "bot", text: found?.a || "Share your topic and requirements, I’ll guide you." }
    ]);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-pink-500 px-5 py-3 text-base font-extrabold text-white shadow-2xl hover:scale-105 transition-transform duration-200"
      >
        <Sparkles className="h-6 w-6 animate-pulse" />
        <span className="hidden sm:inline">Advanced AI Assistant</span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center" onClick={() => setOpen(false)}>
          <div
            className="relative mb-10 sm:mb-0 w-full max-w-md mx-auto animate-fadeInUp"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="p-0 overflow-hidden rounded-3xl shadow-2xl border-0 bg-gradient-to-br from-white/90 to-slate-100/80 dark:from-slate-900/90 dark:to-slate-800/80">
              <div className="flex items-center justify-between border-b border-slate-200/40 px-6 py-4 bg-gradient-to-r from-indigo-500/10 to-fuchsia-500/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-fuchsia-500 animate-pulse" />
                  <span className="text-base font-extrabold text-slate-900 dark:text-white">Advanced AI Assistant</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl hover:bg-slate-200/40 dark:hover:bg-slate-700/40"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[50vh] overflow-auto px-6 py-4 space-y-3">
                {messages.map((m, idx) => (
                  <div key={idx} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-md ${
                        m.from === "user"
                          ? "bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white"
                          : "bg-white/80 text-slate-900 dark:bg-slate-800/80 dark:text-white"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200/40 p-4 bg-slate-50/60 dark:bg-slate-900/60">
                <div className="flex flex-wrap gap-2">
                  {suggested.map((q) => (
                    <button
                      key={q}
                      onClick={() => ask(q)}
                      className="rounded-full bg-gradient-to-r from-indigo-500/10 to-fuchsia-500/10 px-4 py-2 text-xs font-bold text-slate-900 dark:text-white hover:bg-fuchsia-500/20"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      ) : null}
    </>
  );
}

