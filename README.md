# Sultan Dayani — Professional Portfolio

A focused, one-page portfolio positioning Sultan Dayani around technical leadership, AI enablement, developer experience, and cloud platforms.

## Project imagery

The recent-project section leads with Nova IPTV, Beratungsstudio and CaféPOS,
including real app screenshots and three feature highlights per project.
Seven recent projects share a coverflow with neighboring previews, a slide counter,
seven progress segments, direct links, keyboard navigation and touch swipes.
Automatic playback advances every eight seconds and preserves remaining time when
hovered, focused, touched, outside the viewport, in a hidden tab or showing open
details. A persistent pause control and reduced-motion support keep playback under
the visitor's control. Short highlights stay visible; full descriptions,
feature explanations and Cartyators' architecture expand on demand.
It also features Cartyators (`saas-autohandel`), Ekko, Grano Bar
and Sattari Automobile, alongside the existing Options Workstation, PAIA and Pulse
work. Screenshots were sourced from current Windows and Mac mini checkouts; the
website previews show local versions, which may differ from their public deployments.

Optimized WebP assets live under `public/projects/`. Source paths, demo-data checks
and feature status are documented in `docs/project-sources-*.md`. App screenshots
use demo or preview data. Cartyators' AI backend is opt-in and its native companion
is in development; Ekko's music analytics are previews and dashboard edits currently
stay in the companion app.

Cartyators is a private repository. Its public architecture overview is exported
as SVG from an editable Excalidraw scene; both are under
`public/projects/saas-autohandel/architecture.*`. The page displays the diagram
without separate full-size or download controls, or a link to private source code.

## Local development

```bash
npm install
npm start
```

The app runs at `http://localhost:3000`.

## Verification

```bash
npm test -- --watchAll=false
npm run build
```

## Deployment

Production is hosted by the existing Cloudflare Pages Direct Upload project
`personal-portfolio`. A push to `main` runs the deployment workflow, which:

1. installs the locked dependencies;
2. runs the test suite;
3. creates the production build;
4. stores the build as a short-lived GitHub artifact; and
5. deploys `build/` to Cloudflare Pages with Wrangler.

The repository requires these GitHub Actions secrets:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN` — a dedicated token limited to **Account → Cloudflare Pages → Edit**

The workflow can also be started manually from GitHub Actions. Cloudflare retains
previous Pages deployments for rollback, and GitHub retains each workflow's build
artifact for 14 days.

The resume action currently opens an email request because no current resume PDF is stored in the repository. Add the approved file under `public/` and update the resume links in `src/App.jsx` before changing that action to a download.
