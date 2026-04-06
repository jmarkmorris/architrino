# Architrino Assembly Architecture

## Run locally
Use a local web server so ES modules load correctly.

```bash
cd architrino
node scripts/dev/start-local-dev.mjs
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
- Textbook TOC data is generated into `content/graph/textbook_toc.json`.
- Textbook TOC scene markdown is generated into `content/markdown/generated/textbook-toc.md`.
- Keep the manifest up to date after content changes.

## Authoring Contract (Explicit Scene Network)
- Source of truth is explicit scene files under `content/scenes/**/*.json`.
- Authored navigation/content fields are:
  - `objects[]`
  - `objects[].subScenes[]`
  - `objects[].markdownPath`
  - `objects[].markdownSection`
- Generated artifacts are not hand-authored:
  - `content/scenes/scenes_index.json`
  - `content/markdown/markdown_index.json`
  - `content/graph/scene_graph.json`
  - `content/graph/textbook_toc.json`
  - `content/markdown/generated/textbook-toc.md`
- After scene/markdown edits, regenerate artifacts before commit:
  - `node scripts/validate-content.mjs --write`
  - `node scripts/build-scene-graph.mjs --write`

## Content Validation
Run these from the repo root:

```bash
node scripts/validate-content.mjs --check
node scripts/validate-content.mjs --write
node scripts/build-scene-graph.mjs --check
node scripts/build-scene-graph.mjs --write
node scripts/smoke-option3.mjs
```

The Reaction library is now a request manifest at
`content/contracts/examples/reaction-library/manifest.v1.json`.
Each entry points to a canonical `solver-request/v1` fixture, and the Reaction
app solves that request in memory when the entry is selected.

If `--write` updates index or graph files intentionally, include those file changes in your commit.
