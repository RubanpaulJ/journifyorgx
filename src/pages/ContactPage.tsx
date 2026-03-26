import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MapPin, MessageCircle, Upload } from "lucide-react";

import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { api } from "../utils/api";
import { useAppConfig } from "../state/AppConfig";
import { whatsappLink } from "../utils/whatsapp";

export function ContactPage() {
  const { config } = useAppConfig();
  const [params] = useSearchParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectTopic, setProjectTopic] = useState(params.get("topic") || "");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const packageHint = params.get("package");
  const wa = useMemo(() => {
    const msg = `Hi ${config.appName}, I want to enquire.\n\nName: ${name || "-"}\nTopic: ${
      projectTopic || "-"
    }\nPackage: ${packageHint || "-"}\nPhone: ${phone || "-"}`;
    return whatsappLink(config.whatsappNumber, msg);
  }, [config.appName, config.whatsappNumber, name, projectTopic, packageHint, phone]);

  async function submit() {
    setStatus("sending");
    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("email", email);
      fd.append("phone", phone);
      fd.append("projectTopic", projectTopic);
      fd.append("message", packageHint ? `Package: ${packageHint}\n${message}` : message);
      if (files) {
        Array.from(files)
          .slice(0, 3)
          .forEach((f) => fd.append("files", f));
      }
      await api.submitEnquiry(fd);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Contact
        </div>
        <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
          Tell us your requirement
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Share your project topic, paper goal and timeline. We’ll respond with a clear plan and
          next steps.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <div className="text-sm font-extrabold">Enquiry form</div>
          <div className="mt-4 grid gap-3">
            <label className="grid gap-1 text-sm font-bold">
              Name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl border border-slate-900/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
                placeholder="Your full name"
              />
            </label>
            <label className="grid gap-1 text-sm font-bold">
              Email
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border border-slate-900/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
                placeholder="you@email.com"
              />
            </label>
            <label className="grid gap-1 text-sm font-bold">
              Phone
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-xl border border-slate-900/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
                placeholder="WhatsApp number"
              />
            </label>
            <label className="grid gap-1 text-sm font-bold">
              Project Topic
              <input
                value={projectTopic}
                onChange={(e) => setProjectTopic(e.target.value)}
                className="rounded-xl border border-slate-900/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
                placeholder="e.g., AI Fake Currency Detection"
              />
            </label>
            <label className="grid gap-1 text-sm font-bold">
              Message (optional)
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="rounded-xl border border-slate-900/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
                placeholder="Timeline, college format, required deliverables…"
              />
            </label>

            <label className="grid gap-1 text-sm font-bold">
              Upload (optional)
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  className="w-full text-sm"
                />
                <Upload className="h-4 w-4 text-slate-500" />
              </div>
              <div className="text-xs text-slate-500">
                Upload up to 3 files (proposal, abstract, screenshots). Max size enforced by server.
              </div>
            </label>

            <div className="mt-2 flex flex-wrap gap-2">
              <Button
                onClick={submit}
                disabled={!name || !email || !phone || !projectTopic || status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Submit"}
              </Button>
              <a href={wa} target="_blank" rel="noreferrer">
                <Button variant="secondary">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </Button>
              </a>
            </div>

            {status === "sent" ? (
              <div className="rounded-xl bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-300">
                Enquiry submitted. We’ll contact you shortly.
              </div>
            ) : null}
            {status === "error" ? (
              <div className="rounded-xl bg-rose-500/10 p-3 text-sm text-rose-700 dark:text-rose-300">
                Could not submit. Please try WhatsApp or retry.
              </div>
            ) : null}
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <div className="flex items-start gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-extrabold">Location</div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Online-first support across India. On request, we can schedule a call/meet for
                  consultations.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-0 overflow-hidden">
            <iframe
              title="map"
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=India&output=embed"
            />
          </Card>

          <Card>
            <div className="text-sm font-extrabold">Trust elements</div>
            <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              We can share sample papers, publication screenshots and client proof (with permission)
              during consultation.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

