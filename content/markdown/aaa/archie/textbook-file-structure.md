# Textbook File Structure

## Purpose

This note defines the current file-structure standard for textbook-facing content in the Architrino webapp. It is not a speculative repository memo. It is the working guidance for how content should be organized, named, linked, and expanded within the present scene-driven system.

This guide should be read alongside:

- [academic-style-guide.md](academic-style-guide.md)
- [mathematics-style-guide.md](mathematics-style-guide.md)
- [mathematics-terminology.md](mathematics-terminology.md)
- [scene-taxonomy.md](scene-taxonomy.md)
- [navigation-and-controls.md](navigation-and-controls.md)

## Core Principle

The filesystem is a storage and maintenance layer. The reader-facing hierarchy is the scene graph. Markdown documents supply conceptual content; scene JSON supplies traversal, grouping, and presentation behavior.

The practical consequence is straightforward:

- directories should be stable and legible,
- markdown files should correspond to coherent conceptual objects,
- links inside markdown should be portable,
- and scene structure should not be inferred from directory walking.

## Current Content Topology

The primary textbook corpus lives under `content/markdown/aaa`. The current top-level thematic directories are:

- `archie`
- `assemblies`
- `cosmology`
- `dynamics`
- `foundations`
- `nuclear-atomic`
- `philosophy-history`
- `quantum`
- `reactions`
- `spacetime`
- `tools`
- `validation`

These directories are thematic containers, not an ontology in themselves. Their role is to keep authorship, review, and maintenance tractable.

## What Belongs in One Markdown File

A markdown file should normally own one conceptual object that can be read as a unit.

Good candidates for one file include:

- one theory chapter,
- one historical chapter,
- one comparative map,
- one methodology note,
- one validation ledger,
- one glossary-style reference document,
- one public-process or community note,
- one reader-facing research journal used as a split-backed notebook,
- one style or authoring guide.

A file should not serve as a random accumulation point for loosely related notes. When a document begins to contain multiple peer objects that deserve distinct scene nodes, split it.

## Relationship Between Markdown and Scenes

The current system uses three main markdown-facing scene patterns:

- `Scene-Markdown-View`: read one full markdown document or one declared section view.
- `Scene-Markdown-Split`: derive navigable nodes from one heading level in one markdown file.
- `Scene-Markdown-Tree`: derive a bounded heading hierarchy from one markdown file.

This yields a simple ownership rule:

- markdown owns the local document structure,
- scene JSON owns cross-document navigation and display behavior,
- directories own neither hierarchy nor reading order.

## Authoring Implication for Headings

Because some scenes derive nodes from headings, heading structure is not cosmetic. It is part of the authored navigation contract.

Use headings with clear intent:

- `#` for the document title,
- `##` for major navigable sections,
- `###` for subsection nodes when a tree scene uses deeper expansion,
- deeper headings for ordinary in-leaf exposition unless a specific scene configuration requires otherwise.

Do not create decorative heading depth. If a heading level is present, it should correspond either to a real conceptual division or to a scene-derived navigation layer.

## Naming Standard

Use lowercase, hyphen-separated filenames.

Preferred pattern:

```text
concept-name.md
concept-subtopic.md
concept-subtopic-detail.md
```

Examples from the current corpus:

- `absolute-time-defense.md`
- `master-equation.md`
- `theory-mapping.md`
- `unknowns-paradoxes.md`
- `mathematics-style-guide.md`
- `mathematics-terminology.md`

Naming rules:

- use concise but descriptive names,
- avoid spaces,
- avoid underscores unless a technical reason forces them,
- avoid version numbers in filenames,
- avoid workflow markers such as `draft`, `temp`, `new`, or `final`,
- avoid personal names unless the document is explicitly biographical or historical.

The full formal title belongs in the markdown heading, not in the filename.

## Directory Standard

Keep the directory model shallow and thematic.

Preferred practice:

- top-level thematic grouping under `content/markdown/aaa`,
- at most one additional subdivision when the area genuinely contains multiple stable families,
- file placement based on conceptual home, not on temporary project convenience.

Current examples of justified second-level subdivision include:

- `assemblies/bosons`
- `assemblies/fermions`
- `assemblies/mesons`
- `validation/simulations`

Do not create deep trees for the sake of mirroring every conceptual sub-branch. The scene system already supplies navigable hierarchy at the reader level.

## Cross-Reference Standard

Use relative markdown links relative to the current document.

Example from an Archie document linking into foundations:

```markdown
See [Absolute Time Defense](../foundations/absolute-time-defense.md).
```

Example from one philosophy-history document linking to another in the same directory:

```markdown
See [major-thinkers.md](major-thinkers.md).
```

Do not use:

- absolute filesystem paths such as `/Users/...`,
- root-absolute deployment-sensitive paths such as `/content/...`,
- fragile links that assume a specific machine layout.

Relative links keep the corpus portable across local development, deployment, export, and future repository moves.

## Reading Order and Structural Order

Reading order should be expressed by scenes, scene index membership, split/tree behavior, and the prose itself. It should not be encoded by numbering every filename.

Therefore:

- do not prefix textbook filenames with sequence numbers,
- do not assume alphabetical order is meaningful,
- do not treat directory listing order as a pedagogy layer.

If a sequence matters, express it in one of these ways:

- a scene index,
- a chapter overview,
- a document overview section,
- explicit cross-references,
- local section introductions that tell the reader what comes before and after.

## Meta Material Versus Domain Material

The `archie` directory is for meta-reference material about the webapp, its editorial rules, navigation model, scene model, terminology standards, and other reader- or author-facing framework notes.

Examples that belong in `archie`:

- style guides,
- navigation explanations,
- scene taxonomy,
- comparative glossaries or meta help,
- GitHub/community process notes,
- research notebooks that document major project inflection points for readers,
- authoring structure guidance.

Examples that do not belong in `archie`:

- foundational theory chapters,
- domain derivations,
- reaction or cosmology analyses,
- discipline-specific content that belongs under its thematic home.

## Split and Tree Authoring Guidance

When a markdown file is used by a split or tree scene, write it with leaf quality in mind.

That means:

- each derived leaf should be able to stand on its own,
- each leaf should inherit the parent document's template logic,
- section titles should be specific enough to work as node labels,
- and the document overview should explain the organizational principle of the file.

For split documents, the major sections are the navigation units. For tree documents, both section depth and subsection naming discipline matter.

The research notebook in `archie` is a useful example of a split-backed document with dated `##` entries. In that pattern, the overview explains the notebook's purpose and the dated sections function as the peer navigation units. Ordering should remain deliberate rather than incidental.

## Overview Sections

For textbook-facing documents that teach an area rather than merely record notes, the overview should explain:

- what the document is about,
- why the topic matters,
- how the file is organized,
- what kind of distinctions the reader should expect,
- and how the document relates to the wider $\mathbb{A}\mathbb{A}\mathbb{A}$ architecture.

This is especially important in files used as split or tree sources, because the overview stabilizes interpretation before the reader enters individual leaves.

## Prose and Mathematical Governance

File structure and style are connected.

In practice:

- prose should follow [academic-style-guide.md](academic-style-guide.md),
- notation and formal dialect should follow [mathematics-style-guide.md](mathematics-style-guide.md),
- canonical symbol use should follow [mathematics-terminology.md](mathematics-terminology.md).

A structurally correct file that ignores these standards is still editorially out of conformance.

## What Not to Put in Textbook Markdown

Do not place the following inside public textbook-facing documents unless the document explicitly exists to discuss them:

- private workflow chatter,
- conversational drafting residue,
- temporary TODO lists for internal coordination,
- personal attributions that are irrelevant to the content,
- stale planning notes about repo structures no longer in use.

The document should read as an instructional artifact, not as a surviving chat transcript.

## Status of Frontmatter

YAML frontmatter is not the current organizing mechanism for this corpus.

If a future toolchain requires structured frontmatter, that can be introduced deliberately. For now, document identity comes from:

- its path,
- its title heading,
- its scene bindings,
- and its internal heading structure.

Do not add frontmatter speculatively across the corpus.

## Practical Checklist

Before considering a new textbook-facing markdown file structurally complete, verify the following:

1. The filename is concise, lowercase, and hyphenated.
2. The file lives in the thematic directory that best matches its content.
3. The `#` heading states the document's formal title.
4. The heading hierarchy is intentional and scene-safe.
5. Cross-references use relative paths.
6. The overview explains purpose, organization, and conceptual stakes.
7. The prose matches the academic textbook standard.
8. The mathematical notation matches the canonical dialect where relevant.
9. The document does not contain internal-chat residue or stale planning language.

## Summary

The current standard is simple:

- one coherent conceptual object per markdown file,
- stable thematic directories,
- scene-owned navigation rather than filesystem-owned hierarchy,
- relative cross-references,
- and textbook-grade prose and notation discipline.

This structure keeps the corpus portable, navigable, and compatible with the current scene architecture without forcing the filesystem to do work that properly belongs to authored scenes and documents.
