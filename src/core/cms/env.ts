import "dotenv/config";

function stripQuotes(v: string) {
  return String(v).replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
}

export function getEnv(name: string): string | undefined {
  const v =
    (process.env[name] ?? (import.meta as any)?.env?.[name]) as string | undefined;
  return v ? stripQuotes(v) : undefined;
}

export function requireEnv(name: string): string {
  const v = getEnv(name);
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}