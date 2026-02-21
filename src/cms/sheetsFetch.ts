import "dotenv/config";
import Papa from "papaparse";

function requireEnv(name: string): string {
  // build/prerender: читаємо з process.env (dotenv уже підвантажив .env)
  // dev: fallback на import.meta.env, якщо треба
  const v =
    (process.env[name] ?? (import.meta as any)?.env?.[name]) as
      | string
      | undefined;

  if (!v) throw new Error(`Missing env var: ${name}`);

  // прибираємо лапки, якщо вони є в .env
  return String(v).replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
}

async function fetchCsv(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`CSV fetch failed: ${res.status} ${res.statusText}`);
  const text = await res.text();

  // Якщо не опубліковано — Google повертає HTML сторінку, не CSV
  if (text.trim().startsWith("<!DOCTYPE html") || text.includes("<html")) {
    throw new Error("Got HTML instead of CSV. Check: Publish to web → CSV.");
  }
  return text;
}

export async function fetchSheetRows<T extends Record<string, any>>(envName: string): Promise<T[]> {
  const url = requireEnv(envName);
  const csv = await fetchCsv(url);

  const parsed = Papa.parse<T>(csv, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
  });

  if (parsed.errors?.length) {
    throw new Error(`CSV parse error (${envName}): ${parsed.errors[0].message}`);
  }

  // Papa може повернути пусті об’єкти для порожніх рядків — фільтруємо
  return (parsed.data || []).filter((row) => {
    const values = Object.values(row ?? {});
    return values.some((v) => String(v ?? "").trim() !== "");
  });
}
