# Sultan Dayani — Professional Portfolio

A focused, one-page portfolio positioning Sultan Dayani around technical leadership, AI enablement, developer experience, and cloud platforms.

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
