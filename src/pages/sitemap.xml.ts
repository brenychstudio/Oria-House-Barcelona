// src/pages/sitemap.xml.ts
import { LANGS } from "../content/languages";
import { buildSitemapXml } from "../core/seo/sitemap";
import { SITE_URL } from "../hotel/seo/siteSeo";
import { getSitemapEntries } from "../seo/sitemap";

export async function GET() {
  const origin = SITE_URL;
  const today = new Date().toISOString().slice(0, 10);

  const entries = await getSitemapEntries({ origin, today, langs: LANGS });

  const xml = buildSitemapXml(entries);

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
