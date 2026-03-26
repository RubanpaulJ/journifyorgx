import React from "react";

export function Card({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`glass rounded-2xl p-5 shadow-sm ${className}`}>{children}</div>;
}

