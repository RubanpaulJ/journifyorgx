import { Link } from "react-router-dom";
import { useAppConfig } from "../../state/AppConfig";

export function Footer() {
  const { config } = useAppConfig();
  return (
    <footer className="border-t border-slate-900/10 bg-white/50 dark:border-white/10 dark:bg-slate-950/30">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="text-lg font-extrabold tracking-tight">{config.appName}</div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Professional, student-friendly guidance for final year projects and research
            publication workflows.
          </p>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-500">
            Disclaimer: We provide guidance and support. Journal acceptance depends on research
            quality and the review process.
          </p>
        </div>
        <div className="text-sm">
          <div className="font-bold">Quick links</div>
          <div className="mt-3 grid gap-2 text-slate-600 dark:text-slate-400">
            <Link to="/services" className="hover:text-slate-950 dark:hover:text-white">
              Services
            </Link>
            <Link to="/portfolio" className="hover:text-slate-950 dark:hover:text-white">
              Portfolio
            </Link>
            <Link to="/pricing" className="hover:text-slate-950 dark:hover:text-white">
              Pricing
            </Link>
            <Link to="/track" className="hover:text-slate-950 dark:hover:text-white">
              Track order
            </Link>
          </div>
        </div>
        <div className="text-sm">
          <div className="font-bold">Legal</div>
          <div className="mt-3 grid gap-2 text-slate-600 dark:text-slate-400">
            <Link to="/legal/privacy" className="hover:text-slate-950 dark:hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/legal/terms" className="hover:text-slate-950 dark:hover:text-white">
              Terms & Conditions
            </Link>
            <Link to="/legal/refund" className="hover:text-slate-950 dark:hover:text-white">
              Refund Policy
            </Link>
            <a
              href="/admin/login"
              className="hover:text-slate-950 dark:hover:text-white"
            >
              Admin login
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-900/10 py-5 text-center text-xs text-slate-500 dark:border-white/10 dark:text-slate-500">
        © {new Date().getFullYear()} {config.appName}. All rights reserved.
      </div>
    </footer>
  );
}

