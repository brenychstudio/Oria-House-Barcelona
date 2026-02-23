import { requireEnv } from "../../core/cms/env";
import { fetchCsv } from "../../core/cms/fetchCsv";
import { parseCsv } from "../../core/cms/parseCsv";

export async function fetchSheetRows<T extends Record<string, any>>(
  envName: string
): Promise<T[]> {
  const url = requireEnv(envName);
  const csv = await fetchCsv(url);
  return parseCsv<T>(csv, envName);
}