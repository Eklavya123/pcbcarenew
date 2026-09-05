# pcbcare-web — Setup & Deployment

This is a **separate** Next.js project from the existing CRA app. It does not
touch `shop.pcbcare.in`'s code, database writes, or auth. It reads the same
Supabase tables (`blog_posts`, `pages`, `wiring_diagrams`) read-only.

## 1. Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Fill in `.env.local`:
- Supabase URL/key are pre-filled with the same public anon key already
  shipped in the live shop app's JS bundle — no change needed unless you
  rotate it.
- `NEXT_PUBLIC_BUSINESS_PHONE`, `NEXT_PUBLIC_BUSINESS_HOURS`,
  `NEXT_PUBLIC_GBP_URL` are blank on purpose. Until filled in, the site
  renders visible red "TODO" markers instead of silently launching with
  missing NAP data — don't remove those markers by hardcoding placeholder
  values, fill in the real ones.

## 2. Before this can show real content

The homepage links to `/ac-pcb-repair`, `/washing-machine-pcb-repair`, etc.
(see `lib/constants.js` → `SERVICES`). These resolve through
`app/[slug]/page.js` against the `pages` table — **you need to create a
published row for each slug in the existing admin panel** (Admin → Pages)
or those links 404. Same for any service-area pages you want beyond what's
already there.

`SERVICE_AREAS` in `lib/constants.js` is an empty placeholder — fill in the
actual Jabalpur localities you serve. This doesn't create pages by itself;
it's just the list rendered on the homepage. Actual per-area content lives
in the `pages` table via the admin panel, using `schema_type: "service"` and
the `service_areas` field to target multiple nearby towns from one page
(this avoids near-duplicate "doorway pages" per city, which the existing
code already correctly reasoned through — see `lib/seo.js` comments).

## 3. RLS check (do this before deploying)

Confirm in Supabase that `blog_posts`, `pages`, and `wiring_diagrams` have a
Row Level Security policy allowing the **anon** role to `SELECT` rows —
otherwise every fetch in `lib/supabase.js` returns empty and every page
looks blank despite having content in the database. If `shop.pcbcare.in`
already reads these same tables client-side successfully, RLS is very
likely already correct; this is just a "confirm before assuming" step.

## 4. Deploy

1. Push this project to its own GitHub repo (separate from the CRA app's repo).
2. Create a **new** Vercel project from that repo.
3. Add environment variables from `.env.local` in Vercel project settings.
4. Add `pcbcare.in` (apex) as the domain on this new Vercel project.

## 5. DNS (at Hostinger)

- Point the apex `pcbcare.in` at this new Vercel project — Vercel will show
  you the exact A record (or ALIAS/ANAME) once you add the domain in step 4.
- `shop.pcbcare.in` already resolves correctly to the existing CRA project —
  don't touch that record.
- If `pcbcare.in` apex is currently still pointing at the old CRA project,
  moving it to the new project is a cutover: old root-domain traffic will
  briefly 404 or show stale content until DNS propagates (usually under an
  hour, sometimes up to 24h). Do this at a low-traffic time, not urgently.

## 6. After deploy — verify indexing is actually fixed

- View source (not "Inspect Element") on the live `pcbcare.in` homepage —
  you should see full text content in the raw HTML, not a blank shell with
  "You need to enable JavaScript." That's the entire fix, confirmed.
- Submit `https://pcbcare.in/sitemap.xml` in Google Search Console.
- Use Search Console's URL Inspection tool on a couple of `/blog/:slug` and
  `/:service-slug` pages to confirm Google sees full content immediately.

## What's intentionally NOT in this project

- Shop, product pages, Error Code Lookup, Find Remote, Sensor Values, Part
  Finder, Requests, Invoices, and all admin/CRUD screens — all stay on
  `shop.pcbcare.in`, untouched.
- Any writes to Supabase — this project only reads published rows.
- Auth of any kind — this site has no login, on purpose.
