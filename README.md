# Mubarak Al-Qahtani — Portfolio

Personal portfolio of **Mubarak bin Saad Al-Qahtani**.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4 and Lucide icons.

## Run it locally

You need Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Static build into `out/` (what GitHub Pages serves) |
| `npm run preview` | Serve `out/` locally to check the build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run assets` | Re-scan `public/images` after adding photos |

## Editing content

Personal content lives in typed data files. Components never contain hard-coded personal information.

```
src/data/
  profile.ts          name, hero text, about story, goals, contact links
  achievements.ts     Defenseathon, Future of Mobility, Tuwaiq CTF, Black Hat
  education.ts        learning-journey timeline
  certifications.ts   PCEP (+ future certificates)
  skills.ts           skill categories + learning platforms
  projects.ts         projects (section hidden while empty)
```

**Adding photos, certificates and links:** see [ASSETS_GUIDE.md](./ASSETS_GUIDE.md).

## Project structure

```
src/
  app/                   layout (fonts, SEO), page, OG image, globals.css (design tokens)
  components/layout/     Navbar, Footer
  components/sections/   Hero, Achievements, About, Learning, Skills, Projects, Contact
  components/ui/         Lightbox (Photo, Gallery)
  data/                  all personal content
  lib/                   formatting, asset lookup, nav
public/images/           photos (see ASSETS_GUIDE.md)
```

Projects and Contact are hidden until they have real content (see ASSETS_GUIDE.md).

## Deploying (GitHub Pages, free)

The site is a fully static export (`output: "export"` in `next.config.ts`): no server, no database, no API.

- `.github/workflows/deploy.yml` builds the site and publishes `out/` to GitHub Pages on every push to `main`.
- The repository must be named `<username>.github.io` and have **Settings → Pages → Source: GitHub Actions**.
- Site address: `https://<username>.github.io`.
- Images are served as-is (no image server), so keep new photos compressed. ASSETS_GUIDE.md explains how.

## Accessibility

- Semantic landmarks and a skip link.
- Keyboard-navigable menu and image viewer, with visible focus rings.
- No decorative animation; the only transitions are hover states and the image viewer fade, which respects *Reduce motion*.
