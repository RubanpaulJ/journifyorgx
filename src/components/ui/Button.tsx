import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<NonNullable<Props["variant"]>, string> = {
  primary:
    "bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30",
  secondary:
    "glass text-indigo-700 dark:text-white border border-indigo-500/20 hover:border-indigo-400/40",
  ghost: "text-slate-700 hover:bg-slate-900/5 dark:text-slate-200 dark:hover:bg-white/10"
};

export function Button({ variant = "primary", className = "", ...props }: Props) {
  return <button {...props} className={`${base} ${variants[variant]} ${className}`} />;
}

