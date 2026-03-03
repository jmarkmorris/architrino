# About

## What This Is

`architrino.com` is an interactive 3D knowledge graph for the Architrino Assembly Architecture.

The webapp combines:

- Scene-based navigation (spheres and linked scenes)
- Markdown documentation (with section and full-doc views)
- Specialized overlays/tools (for example, Periodic Table and Composer)
- Search and history navigation for fast traversal

## Core Navigation Model

- A sphere represents a node in a hierarchy.
- Selecting a sphere can open a child scene or content.
- `Back` returns one step in your navigation history.
- `Forward` moves one step forward in history when available.
- `Home` returns to the root scene.
- `Archie` opens/toggles the meta ring space.

## Content Model

A node may resolve to:

- Markdown documentation
- Another scene (sub-graph)
- A dedicated app/tool view (for example, Composer)
- Periodic-table element routing/overlays
- Media or mixed experiences

## Interface Controls

Top HUD controls include:

- `Back` and `Forward` history buttons
- `Home` reset button
- Scene search toggle
- Info reopen button (for detail panel)
- `Archie` meta-ring button
- Notes button (open scene notes when available)

Markdown panel controls include:

- Open full document from section view
- Toggle `1-column` / `2-column` layout
- Close notes panel

## Search and Shortcuts

- `Cmd/Ctrl + K`: open/close scene search
- `Enter` in search: open first result
- `Escape`: close search

## Camera and Interaction

- Click/tap a sphere to descend
- Drag to pan
- Wheel or pinch to zoom

## Runtime Content Contract

Runtime routing is manifest-driven:

- Runtime search reads `content/graph/scene_graph.json`
- Periodic grid routing reads `runtimeRoutes.periodicGrid` in `content/graph/scene_graph.json`
- Element legend targets are generated into `runtimeRoutes.elementLegendTargets`

Generated artifacts used by runtime and authoring:

- `content/scenes/scenes_index.json`
- `content/markdown/markdown_index.json`
- `content/graph/scene_graph.json`

## Project Status

This environment is actively evolving. Scene structure, labels, and document depth may change as content is refined.

## Technologies

- Three.js for WebGL rendering and CSS2D overlays
- KaTeX for TeX/LaTeX typesetting
- `markdown-it` for markdown rendering
- Periodic Table data sourced from https://github.com/Bowserinator/Periodic-Table-JSON

## Contact

- CEO: Marko
- inquiries@neoclassical.ai
