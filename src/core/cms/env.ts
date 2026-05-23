// src/core/cms/env.ts
const viteEnv: Record<string, unknown> = {
  ENGINE_MODE: import.meta.env.ENGINE_MODE,
  ENGINE_STRICT_ENV: import.meta.env.ENGINE_STRICT_ENV,
  SHEETS_SETTINGS_CSV: import.meta.env.SHEETS_SETTINGS_CSV,
  SHEETS_ROOMS_CSV: import.meta.env.SHEETS_ROOMS_CSV,
  SHEETS_OFFERS_CSV: import.meta.env.SHEETS_OFFERS_CSV,
  SHEETS_EXPERIENCES_CSV: import.meta.env.SHEETS_EXPERIENCES_CSV,
  SHEETS_REVIEWS_CSV: import.meta.env.SHEETS_REVIEWS_CSV,
  SHEETS_PAGES_CSV: import.meta.env.SHEETS_PAGES_CSV,
};

function readEnv(key: string): string | undefined {
  const v =
    // Astro/Vite server-side. Keep keys explicit; Vite module runner rejects import.meta.env[key].
    viteEnv[key] ??
    // Node runtime
    (process as any)?.env?.[key];

  if (typeof v !== "string") return undefined;
  const s = v.trim();
  return s.length ? s : undefined;
}

export function getEnv(key: string): string | undefined {
  return readEnv(key);
}

export function isStrictEnv(): boolean {
  const mode = readEnv("ENGINE_MODE");
  const strict = readEnv("ENGINE_STRICT_ENV");
  return mode === "strict" || strict === "1" || strict === "true";
}

// Лишаємо "жорсткий" requireEnv для тих місць, де це справді must-have.
export function requireEnv(key: string): string {
  const v = readEnv(key);
  if (v) return v;
  throw new Error(`Missing env var: ${key}`);
}
