import { Link, NavLink } from "react-router-dom";
import journifyLogo from '../../assets/journify-logo.png';
import { Moon, Sun, MessageCircle } from "lucide-react";

import { useTheme } from "../../state/Theme";
import { useAppConfig } from "../../state/AppConfig";
import { Button } from "../ui/Button";
import { whatsappLink } from "../../utils/whatsapp";

const navItem =
  "text-sm font-semibold text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white";

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { config } = useAppConfig();

  const wa = whatsappLink(
    config.whatsappNumber,
    `Hi ${config.appName}, I want guidance for my final year project / paper.`
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-900/10 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={journifyLogo} alt="Journify Logo" className="h-9 w-9 rounded-xl object-cover shadow-lg" />
          <div className="leading-tight">
            <div className="text-sm font-extrabold tracking-tight">{config.appName}</div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400">
              Project • Paper • Publication guidance
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          <NavLink className={navItem} to="/services">
            Services
          </NavLink>
          <NavLink className={navItem} to="/how-it-works">
            How it works
          </NavLink>
          {/* Portfolio removed */}
          <NavLink className={navItem} to="/pricing">
            Pricing
          </NavLink>
          {/* Blog removed */}
          <NavLink className={navItem} to="/contact">
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <a href={wa} target="_blank" rel="noreferrer">
            <Button variant="secondary" className="inline-flex">
              <MessageCircle className="h-4 w-4" />
              Talk to Expert
            </Button>
          </a>

          <button
            onClick={toggle}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-900/10 bg-white/70 text-slate-700 shadow-sm hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}

