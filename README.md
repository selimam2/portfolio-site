# samielimam.com

Personal portfolio site, plus Math Blitz (`/game`), a small mental-math game with a shared leaderboard.

Next.js 16 (App Router), Tailwind CSS 4, deployed on Vercel.

## Where the content lives

All copy is hardcoded in the section components. There are no separate data files.

| Section | File |
|---|---|
| Hero / intro | `app/components/Hero.tsx` |
| Work experience | `app/components/Experience.tsx` (`jobs` array) |
| Education | `app/components/Education.tsx` |
| Projects | `app/components/Projects.tsx` (`projects` array, rendered in order) |
| Skills | `app/components/Skills.tsx` (`skillGroups` array) |
| Contact | `app/components/Contact.tsx` → `app/api/contact/route.ts` |
| Site metadata, JSON-LD | `app/layout.tsx`, `app/opengraph-image.tsx` |

## Environment variables

| Variable | Used by |
|---|---|
| `GMAIL_USER`, `GMAIL_APP_PASSWORD` | Contact form (Gmail SMTP via nodemailer) |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Math Blitz leaderboard |

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```
