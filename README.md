# Tejas Badhe — Portfolio

Personal portfolio built with **Next.js**, **React Three Fiber** (Three.js) and **Framer Motion**.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # writes the finished site to ./out
```

Node 20.9 or newer.

## Where to change things

| What | File |
| --- | --- |
| Name, intro, email, social links, experience, skills, projects | `data/site.ts` |
| Colours, fonts, spacing (light and dark) | `app/globals.css` (tokens at the top) |
| 3D scene on the home page | `components/HeroScene.tsx` |
| Project images | `public/images/projects/` |
| Résumé | `public/resume.pdf` |

Blog posts come from Contentful (content type `tejasPortfolioBlogPost`) and load in the browser, so a new post shows up without redeploying.

## Extras

- Press <kbd>⌘K</kbd> / <kbd>Ctrl K</kbd> anywhere for the command menu
- Light and dark mode follow the device setting and remember the visitor's choice
- Animations switch off for people who turn on "reduce motion"
- The 3D scene pauses when scrolled out of view and falls back to a gradient if WebGL isn't available

## Hosting (Render)

`render.yaml` builds with `npm ci && npm run build` and publishes `./out`. Old blog links (`/blog/<post-name>`) are rewritten to the post reader.
