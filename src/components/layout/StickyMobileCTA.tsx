import { Link } from "react-router-dom";
import { MessageCircle, Rocket } from "lucide-react";
import { useAppConfig } from "../../state/AppConfig";
import { whatsappLink } from "../../utils/whatsapp";

export function StickyMobileCTA() {
  const { config } = useAppConfig();
  const wa = whatsappLink(
    config.whatsappNumber,
    `Hi ${config.appName}, I want to get started. Please guide me.`
  );
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-900/10 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70 md:hidden">
      <div className="mx-auto flex max-w-6xl gap-2 px-3 py-2">
        <Link
          to="/contact"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-3 py-3 text-sm font-extrabold text-white"
        >
          <Rocket className="h-4 w-4" />
          Get Started
        </Link>
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-extrabold text-white"
        >
          <MessageCircle className="h-4 w-4" />
          Chat
        </a>
      </div>
    </div>
  );
}

