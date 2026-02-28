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

## Runtime Contract
- Runtime search is manifest-only and reads `content/graph/scene_graph.json`.
- Periodic element routing is manifest-only via `runtimeRoutes.periodicGrid` in `content/graph/scene_graph.json`.
- Element legend routing is generated from `content/graph/runtime_routes.json` into `runtimeRoutes.elementLegendTargets`.
- Keep the manifest up to date after content changes.

## Content Validation
Run these from the repo root:

```bash
node scripts/validate-content.mjs --check
node scripts/validate-content.mjs --write
node scripts/build-scene-graph.mjs --check
node scripts/build-scene-graph.mjs --write
node scripts/smoke-option3.mjs
```

If `--write` updates index or graph files intentionally, include those file changes in your commit.
