# Scene Taxonomy

This note is the normative reference for what kinds of scenes exist in the webapp and what each kind is responsible for. Its purpose is to prevent hierarchy, presentation, and generation rules from drifting into ad hoc conventions by making scene roles explicit and reviewable.

Read it as the architecture guide for reader-facing scene behavior: first the governing claims, then the ownership boundaries, then the specific scene classes.

## Purpose

This note defines the current scene taxonomy for the Architrino webapp. It is a normative reference for how scenes are classified, what each scene type is responsible for, and where hierarchy, presentation, and generation belong in the system.

This guide should be read alongside:

- [about-the-webapp.md](../../../content/markdown/aaa/archie/about-the-webapp.md)
- [navigation-and-controls.md](../../../content/markdown/aaa/archie/navigation-and-controls.md)
- [software-architecture-and-maintenance.md](../../../content/markdown/aaa/archie/software-architecture-and-maintenance.md)

## Core Claim

A scene is the primary reader-facing unit of navigation in the webapp. Scene taxonomy is therefore organized by scene role, not by filesystem location, media format, or implementation accident.

The governing distinction is:

- structural scenes organize other scenes,
- presentation scenes present content or tools,
- markdown is one important content medium, but it is not the taxonomy itself.

## Ownership Boundaries

The system remains coherent only if ownership is explicit.

The current ownership split is:

- markdown owns intra-document structure,
- scene JSON owns cross-document navigation, scene typing, and display behavior,
- generated manifests own runtime lookup and search acceleration,
- directories own storage convenience only.

This prevents the common failure mode in which markdown headings, directory layout, and scene definitions all compete to define the same hierarchy.

## Taxonomy Principles

### Explicit declaration over discovery

Scene structure should be authored explicitly. The runtime should not discover hierarchy by walking directories.

That means:

- parent-child scene relationships are declared in scene data,
- scene membership is visible and reviewable,
- filesystem layout does not silently create ontology,
- and moving files does not implicitly rewrite the reader-facing hierarchy.

### Role before medium

A scene should first be classified by what job it performs for the reader.

Examples:

- organizing a branch,
- presenting one markdown document,
- expanding a markdown tree,
- exposing an interactive tool,
- presenting a diagram or animation.

Markdown matters at the presentation layer, but it should not be mistaken for the top-level ontology of the app.

### Bounded generation

Generated behavior is allowed where it is conceptually local and predictable.

This is why markdown split/tree scenes are appropriate: they derive local navigation from one declared source document. Generation is not appropriate when it would blur authored cross-document structure.

### Stable reader hierarchy

The scene graph is the reader-facing hierarchy. Scene titles, scene types, and child relations therefore need to be treated as part of the public information architecture, not as disposable implementation detail.

## Primary Scene Classes

### Scene-Index

`Scene-Index` is the canonical structural scene type.

Its job is to organize child scenes and provide branch-level navigation.

Responsibilities:

- present a set of child scenes,
- define explicit parent-child structure,
- support recursive composition,
- provide the main ring-based knowledge-graph navigation pattern.

Constraints:

- children must be declared explicitly,
- child scenes may be other `Scene-Index` scenes or presentation scenes,
- it is not a generic document renderer,
- it does not infer hierarchy from directories or markdown files.

Operational meaning: a `Scene-Index` is the app's chapter-of-chapters construct.

### Presentation Scenes

Presentation scenes are scenes whose primary job is to present content, reading surfaces, or interactive tools rather than to organize structural hierarchy.

A presentation scene may still link outward to other scenes. What makes it a presentation scene is its primary role, not the absence of outgoing connections.

The current taxonomy uses several presentation-scene patterns.

## Markdown Presentation Types

### Scene-Markdown-View

`Scene-Markdown-View` renders one markdown document directly, optionally with a configured section focus.

Responsibilities:

- provide a stable reading surface,
- support full-document reading,
- support section-targeted reading when configured,
- honor display settings such as one-column or two-column modes.

Use this type when the document should be read as a document rather than navigated as a generated node tree.

Authoring implication:

- the markdown source should open with a real `#` title,
- the opening block should orient a cold reader before the first major section,
- and auto-open view scenes should not rely on surrounding scene context to explain what the document is doing.

Display implication:

- when scene chrome already presents the document title, the reading surface may suppress the duplicate visible `#` heading,
- but the markdown source should still keep that `#` as the canonical title for authored structure and manifest generation.

### Scene-Markdown-Split

`Scene-Markdown-Split` derives a set of navigable nodes from one heading level in one markdown document.

Responsibilities:

- parse one declared source markdown file,
- derive peer nodes from a bounded heading level,
- present those nodes as a local scene,
- preserve document-level reading while exposing section-level entry points.

Use this type when the document has a flat conceptual segmentation and each major section should function as a peer navigation node.

Display behavior may use more than one local placement mode.

- `scene.layout.type = "rings"` is appropriate when the split behaves like a conceptual cluster of peer topics.
- `scene.layout.type = "grid"` is appropriate when the split behaves like an ordered notebook, ledger, dated sequence, or other list-like surface where row-by-row scanning is more legible than radial symmetry.

The choice is a presentation decision about how locally generated nodes are arranged. It does not change the underlying scene role.

### Scene-Markdown-Tree

`Scene-Markdown-Tree` derives a bounded local hierarchy from one markdown document.

Responsibilities:

- parse one declared source markdown file,
- derive a local node tree from heading structure,
- stop generation at a configured depth,
- leave deeper structure inside the leaf reading surface.

Core configuration logic:

- `rootHeadingLevel` determines where generated navigation begins,
- `maxDepth` determines how many heading levels become navigable nodes,
- deeper headings remain ordinary markdown content inside the leaf.

Use this type when a document has real internal conceptual hierarchy that should remain local to that file.

As with split scenes, local generated-node placement may use ring or grid presentation when that improves legibility of the derived structure.

## Boundary Between Generated Nodes and Ordinary Document Structure

The stopping rule for markdown generation should be conceptual rather than decorative.

Generate scene nodes only while headings are acting as genuine navigation units. Stop generation when the next heading level mainly serves reading structure inside one concept.

Typical in-leaf material includes:

- derivations,
- proofs,
- examples,
- objections and replies,
- evidence blocks,
- implementation notes,
- local clarifications needed for reading but not for branch navigation.

This rule keeps the generated scene local, bounded, and legible.

## Other Presentation Types

The taxonomy should remain open to non-markdown presentation scenes when the primary content object is not a document.

### Tool scenes

A tool scene presents an interactive experience whose primary value is manipulation, exploration, or authoring rather than reading prose.

Current practical example:

- animator-related scenes

### Diagram scenes

A diagram scene is appropriate when the diagram itself is the primary interactive content object and should not be treated as a mere illustration inside a markdown page.

### Animation scenes

An animation scene is appropriate when time-based visual presentation is the primary content mode.

These categories are taxonomically useful even where implementation support is still sparse, because they separate content role from storage medium.

## Structural Relationships

The taxonomy distinguishes several kinds of relationship.

### Children

`children` express scene-owned hierarchy.

Use `children` when one scene structurally contains or organizes another scene in the reader-facing navigation model.

### Links

`links` express cross-scene reference without structural ownership.

Use `links` when a scene should point to another scene for conceptual adjacency, comparison, or lateral navigation.

### Hotspots

`hotspots` express anchored interaction within a scene.

Hotspots remain part of the conceptual model, but generic hotspot support should be treated as a controlled feature rather than a taxonomic shortcut. Their existence does not alter the higher-level distinction between structure and presentation.

## What the Taxonomy Must Not Do

The taxonomy should not collapse together:

- scene role,
- media type,
- runtime implementation detail,
- generated manifest detail,
- filesystem placement,
- and conceptual ownership.

In practical terms, this means:

- directories should not define hierarchy,
- markdown alone should not define cross-document structure,
- generated nodes should not be treated as if they were separately authored scene files,
- and runtime convenience fields should not be mistaken for ontology.

## Runtime Consequence

Because the runtime reads generated manifests and scene definitions rather than discovering content ad hoc, the scene taxonomy supports:

- stable search behavior,
- stable routing,
- explicit review of hierarchy changes,
- portable content organization across deployment contexts.

The taxonomy is therefore not just a naming exercise. It is part of the app's operational architecture.

## Authoring Consequence

When adding or revising a scene, the first question should be: what role does this scene play?

Use this decision order:

1. Is the scene organizing a branch of other scenes? Use `Scene-Index`.
2. Is it presenting one document directly? Use `Scene-Markdown-View`.
3. Is it deriving flat peer nodes from one markdown file? Use `Scene-Markdown-Split`.
4. Is it deriving a bounded local hierarchy from one markdown file? Use `Scene-Markdown-Tree`.
5. Is the primary object an interactive tool, diagram, or animation? Use the corresponding presentation type.

This prevents scene typing from becoming ad hoc.

## Summary

The current taxonomy is built on a simple hierarchy of responsibility:

- scenes own reader-facing navigation,
- markdown owns local document structure,
- generation is allowed only within bounded local scene patterns,
- and filesystem layout is not part of the reader ontology.

That structure keeps the webapp explicit, reviewable, and scalable as the corpus and tool surface continue to grow.
