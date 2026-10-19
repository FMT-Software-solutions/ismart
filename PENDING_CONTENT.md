# Pending content

Sections that currently show a "coming soon" notice (or a placeholder value)
until real content is supplied. Update this list as items arrive.

## Content to supply

| Area | What is needed | Where it goes |
| --- | --- | --- |
| Campaigns: past initiatives | Verified details for any initiative besides the 2024 Sex Therapy/Coaching Masterclass | `pastInitiatives` in `app/campaigns/data.ts` |
| Campaigns: impact stories | Real testimonials (name, role, photo, quote) with consent | `Testimonials` component in `app/campaigns/components` |
| Research: publications | Articles, reports, policy briefs (with files or links) | `app/research/publications/page.tsx` |
| Research: programme pages | Detail content for each of the 7 research programmes, if separate pages are wanted | `const/research.ts`, new pages under `app/research/` |
| Research: partners | Confirmed partner institutions (and logos) | `app/research/page.tsx` |
| Programs: course catalogue | Course names, outlines, duration, certification for each program | `app/programs/page.tsx`, `const/programs.ts` |
| Home: impact numbers | Confirmed figures for students enrolled, courses offered, trainings & webinars delivered before the website existed | `const/site-stats.ts` (`baseline` / `override`) |
| Media | Videos, picture gallery, news | `app/media/**` (also re-enable `featureFlags.media`) |
| Donate: donor stories | Real donor testimonials with consent | `app/donate/DonatePageClient.tsx` |

## Adding more campaigns or research projects

Active campaigns and research projects are rendered from content files, not
hard-coded pages. To publish another one, add a content file next to the
existing one and register it in the index:

- Campaigns: `const/campaigns/` (see `sexual-intelligence.ts`, register in `index.ts`)
- Research projects: `const/research-projects/` (see `gen-z-sexuality.ts`, register in `index.ts`)

## Notes

- Home page stats count live data: registrations that were not rejected
  (students) and events that are published, completed or archived
  (trainings & webinars). "Courses offered" falls back to the number of
  program areas until a figure is set in `const/site-stats.ts`.
- Countries and continents shown on the home page live in
  `const/site-stats.ts`.
