# About the Webapp

## What This Is

`architrino.com` is an interactive 3D knowledge graph for the Architrino Assembly Architecture.

The webapp combines:

- Scene-based navigation (spheres and linked scenes)
- Markdown documentation (with section and full-doc views)
- Specialized overlays/tools (for example, Periodic Table and Composer)
- Search and history navigation for fast traversal

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

- [architrino@gmail.com](mailto:architrino@gmail.com)
