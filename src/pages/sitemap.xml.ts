import { LANGS } from "../content/languages";
import { getRooms, getOffers, getExperiences } from "../cms/sheets";

type Entry = { loc: string; lastmod?: string };

function esc(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function joinOrigin(origin: string, path: string) {
  return origin.replace(/\/$/, "") + path;
}

export async function GET({ site }: { site?: URL }) {
  const origin = site?.origin ?? "http://localhost:4321";
  const today = new Date().toISOString().slice(0, 10);

  const rooms = await getRooms();
  const offers = await getOffers();
  const exps = await getExperiences();

  const staticPaths = ["", "rooms", "offers", "experiences", "contact", "location"];

  const entries: Entry[] = [];

  for (const lang of LANGS) {
    for (const p of staticPaths) {
      const path = p === "" ? `/${lang}/` : `/${lang}/${p}/`;
      entries.push({ loc: joinOrigin(origin, path), lastmod: today });
    }

    for (const r of rooms) {
      entries.push({
        loc: joinOrigin(origin, `/${lang}/rooms/${r.slug}/`),
        lastmod: (r as any).updated_at || today,
      });
    }

    for (const o of offers) {
      entries.push({
        loc: joinOrigin(origin, `/${lang}/offers/${o.slug}/`),
        lastmod: (o as any).updated_at || today,
      });
    }

    for (const x of exps) {
      entries.push({
        loc: joinOrigin(origin, `/${lang}/experiences/${x.slug}/`),
        lastmod: (x as any).updated_at || today,
      });
    }
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    entries
      .map((e) => {
        return (
          `<url>` +
          `<loc>${esc(e.loc)}</loc>` +
          (e.lastmod ? `<lastmod>${esc(e.lastmod)}</lastmod>` : ``) +
          `</url>`
        );
      })
      .join("") +
    `</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}