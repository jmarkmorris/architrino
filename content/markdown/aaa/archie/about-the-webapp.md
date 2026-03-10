# About the Webapp

## Purpose

This note explains what the Architrino webapp is, what kinds of content and interaction it supports, and how its runtime content model is organized.

It is a reader-facing orientation document, not a development log.

This guide should be read alongside:

- [navigation-and-controls.md](navigation-and-controls.md)
- [scene-taxonomy.md](scene-taxonomy.md)
- [textbook-file-structure.md](textbook-file-structure.md)

## What the Webapp Is

`architrino.com` is an interactive 3D knowledge graph for the Architrino Assembly Architecture. It combines scene-based navigation, long-form markdown reading, generated document views, and specialized tools inside one reader-facing environment.

The webapp is not merely a document repository with visual decoration. Its central design claim is that conceptual structure should be navigable spatially as well as readable textually.

## Primary Content Layers

The current webapp brings together several content layers.

### Scene-based navigation

The main interface presents knowledge branches as scenes composed of spheres and child scene links. This provides the primary traversal model for moving through the corpus.

### Markdown reading surfaces

Much of the explanatory and reference content is authored in markdown. Depending on scene type, the reader may encounter:

- a full document view,
- a section view into one document,
- a split view derived from one heading layer,
- a bounded tree view derived from a local document hierarchy.

### Specialized tools and overlays

The webapp also includes non-document surfaces where interaction is primary.

Current examples include:

- Composer-related tools,
- periodic-table and element navigation overlays,
- other domain-specific scene behaviors where the scene is more than a reading panel.

## Information Architecture Claim

The webapp uses scenes rather than directories as the reader-facing hierarchy.

That means:

- scene relationships define navigable branch structure,
- markdown supplies conceptual content,
- generated manifests supply fast runtime lookup,
- filesystem layout supports maintenance rather than public ontology.

This separation makes the system more stable under editorial growth and reorganization.

## Runtime Content Contract

Runtime routing is manifest-driven.

Important generated artifacts include:

- `content/scenes/scenes_index.json`
- `content/markdown/markdown_index.json`
- `content/graph/scene_graph.json`

These generated files support runtime discovery, search, and graph-level linking without requiring the app to infer structure by walking directories at load time.

Additional runtime routes are generated into the graph manifest where needed, including periodic-grid and element-legend targets.

## Reader Experience

From the reader's standpoint, the webapp supports two complementary modes of understanding.

### Spatial understanding

A reader can move through branches, sub-branches, and neighboring topics by traversing scenes. This supports orientation, comparison, and topological understanding of the corpus.

### Documentary understanding

A reader can open notes and read sustained prose, formal derivations, taxonomies, and reference material in a conventional document mode.

The point is not to replace documents with graphics. It is to combine navigable structure with durable reading surfaces.

## Technologies in Use

The current webapp stack includes:

- Three.js for WebGL rendering and CSS2D overlays,
- KaTeX for TeX and LaTeX rendering,
- `markdown-it` for markdown parsing and rendering.

These technologies matter operationally because they shape what kinds of scenes, mathematical notation, and document behaviors the runtime can support directly.

## Project Status

The environment is active and still evolving.

That means:

- scene labels may be refined,
- content depth may increase,
- scene bindings may change as documents are reorganized,
- and additional presentation types may be added over time.

The governing architecture, however, is already clear: scenes organize the reader-facing graph, markdown carries the long-form content, and generated manifests stabilize runtime access.

## What This Document Is Not

This note is not:

- a style guide,
- a scene taxonomy specification,
- a navigation instruction sheet,
- or a complete development architecture document.

Those functions belong to adjacent Archie documents with narrower purposes.

## Contact

For project contact, use [architrino@gmail.com](mailto:architrino@gmail.com).
