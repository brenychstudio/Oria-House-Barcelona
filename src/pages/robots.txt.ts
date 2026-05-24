import { SITE_URL } from "../hotel/seo/siteSeo";

export const prerender = true;

export function GET() {
  return new Response(
    `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    }
  );
}
