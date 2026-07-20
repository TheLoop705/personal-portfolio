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

The project is configured for `https://sultandayani.com` and can be published to GitHub Pages with:

```bash
npm run deploy
```

The resume action currently opens an email request because no current resume PDF is stored in the repository. Add the approved file under `public/` and update the resume links in `src/App.jsx` before changing that action to a download.
