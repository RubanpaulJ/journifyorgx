import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../utils/api";

export type AppConfig = {
  appName: string;
  whatsappNumber: string;
};

type AppConfigCtx = {
  config: AppConfig;
  setAppName: (name: string) => void;
};

const defaultConfig: AppConfig = {
  appName: "Journify",
  whatsappNumber: "7708673061"
};

const Ctx = createContext<AppConfigCtx | null>(null);

export function AppConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<AppConfig>(() => {
    const saved = localStorage.getItem("paperpro_config");
    if (saved) {
      try {
        return { ...defaultConfig, ...(JSON.parse(saved) as Partial<AppConfig>) };
      } catch {
        return defaultConfig;
      }
    }
    return defaultConfig;
  });

  useEffect(() => {
    let cancelled = false;
    api
      .getPublicConfig()
      .then((remote) => {
        if (cancelled) return;
        setConfig((c) => ({ ...c, ...remote }));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("paperpro_config", JSON.stringify(config));
  }, [config]);

  const value = useMemo<AppConfigCtx>(
    () => ({
      config,
      setAppName: (name) => setConfig((c) => ({ ...c, appName: name }))
    }),
    [config]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppConfig() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppConfig must be used within AppConfigProvider");
  return ctx;
}

