# Cloudflare Pages deploy

This project is prepared as a static Astro site for Cloudflare Pages.

## Cloudflare settings

- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `22`

## Production variables

Set the real production domain before launching on a custom domain:

```txt
SITE_URL=https://your-domain.example
PUBLIC_SITE_URL=https://your-domain.example
ENGINE_CMS_SOURCE=local
```

`ENGINE_CMS_SOURCE=local` uses the local concept content in
`src/vertical/cms/localData.ts`.

Set `ENGINE_CMS_SOURCE=sheets` only if Google Sheets should be used again. In
that mode, also provide the `SHEETS_*_CSV` variables. For a strict Sheets build,
set `ENGINE_STRICT_ENV=1`.

## Local verification

```sh
npm run verify
```

Cloudflare Pages will also copy `public/_redirects` and `public/_headers` into
the generated `dist` folder during `npm run build`.
