# Architrino Assembly Architecture

## Run locally
Use a local web server so ES modules load correctly.

```bash
cd architrino
python3 -m http.server 5173
```

Then open `http://localhost:5173/`.

## Controls
- Click/tap a sphere to descend into its contents.
- Pinch in/out to zoom (trackpad pinch supported).
- Drag to pan.

## Deployed to GitHub Pages via architrino.com

## Content Validation
Run these from the repo root:

```bash
node scripts/validate-content.mjs --check
node scripts/validate-content.mjs --write
```

If `--write` updates index files intentionally, include those index file changes in your commit.


