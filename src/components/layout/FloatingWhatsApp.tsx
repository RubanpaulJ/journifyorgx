import { MessageCircle } from "lucide-react";
import { useAppConfig } from "../../state/AppConfig";
import { whatsappLink } from "../../utils/whatsapp";

export function FloatingWhatsApp() {
  const { config } = useAppConfig();
  const href = whatsappLink(
    config.whatsappNumber,
    `Hi ${config.appName}, I want to know the best package for my project / paper.`
  );
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-sm font-bold text-white shadow-xl shadow-emerald-500/20 hover:bg-emerald-600"
      aria-label="WhatsApp chat"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}

