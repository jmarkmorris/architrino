# Textbook PDF Snapshots

This document defines the public destination and repeatable publication process for portable textbook PDF snapshots. The released webapp at [architrino.com](https://www.architrino.com) remains the content of record. PDF files are dated snapshots for reading, printing, sharing, citation, and offline review.

## Overview

PDF snapshots exist to make the textbook easier to carry outside the webapp. They should not replace the released webapp, because the webapp can change faster, preserve interactive context, and expose the current Textbook TOC.

Every generated PDF should carry visible snapshot metadata:

- snapshot generation date,
- git commit hash,
- source TOC path,
- canonical webapp URL,
- and a short notice that the released webapp is the content of record.

The intended output directory is:

```text
content/generated/pdf/textbook/
```

The intended public catalog file is:

```text
content/generated/pdf/textbook/index.json
```

The PDF exporter should read the generated Textbook TOC from:

```text
content/graph/textbook_toc.json
```

The exporter should not infer reading order from directories or filenames. The scene graph owns reading order, and the Textbook TOC is the generated publication manifest for that order.

### When the Process Runs

During active drafting, PDF generation should be manual. A local PDF snapshot is useful after major content or TOC edits, but it should not run in `pre-commit` because PDF rendering is heavier than source validation.

For public distribution, PDF generation should run after source validation and scene-graph generation on the main branch. That run produces the current public snapshots.

For durable public checkpoints, PDF generation should run as an intentional milestone step. Those milestone PDFs should be dated and archived separately from the current public snapshots.

### Publication Sequence

The publication sequence should be:

```bash
node scripts/validate-content.mjs --write --strict
node scripts/build-scene-graph.mjs --write --strict
node scripts/export-textbook-pdfs.mjs --write
```

The exporter command is the target implementation for the PDF pipeline. Its responsibility is to flatten the Textbook TOC into print-ready hub snapshots, render KaTeX-compatible math, emit PDFs into `content/generated/pdf/textbook/`, and update `content/generated/pdf/textbook/index.json`.

### Snapshot Rules

Each PDF snapshot should include only material reached through the Textbook TOC. If a markdown file exists in the repository but is not present in the Textbook TOC reading order, it should not enter a textbook PDF.

Each hub PDF should deduplicate markdown files during flattening. If a file appears more than once under a hub through section views, the PDF should include the file once in its first reading-order position unless a later export policy explicitly chooses section-only extraction.

The full textbook PDF should use the publication order below. That order follows the Textbook TOC sequence except that Proof Programs is placed after Validation so the main physical, phenomenological, and validation layers come before the densest proof material.

## Full Textbook

Planned output:

```text
content/generated/pdf/textbook/architrino-textbook.pdf
```

This snapshot contains the full Textbook TOC in released reading order. It is the broadest portable edition, suitable for offline reading and archival review.

## Foundations

Planned output:

```text
content/generated/pdf/textbook/foundations.pdf
```

This snapshot contains the Foundations hub in Textbook TOC order.

## Dynamics

Planned output:

```text
content/generated/pdf/textbook/dynamics.pdf
```

This snapshot contains the Dynamics hub in Textbook TOC order.

## Spacetime

Planned output:

```text
content/generated/pdf/textbook/spacetime.pdf
```

This snapshot contains the Spacetime hub in Textbook TOC order.

## Interactions

Planned output:

```text
content/generated/pdf/textbook/interactions.pdf
```

This snapshot contains the Interactions hub in Textbook TOC order.

## Standard Model Assemblies

Planned output:

```text
content/generated/pdf/textbook/standard-model-assemblies.pdf
```

This snapshot contains the Standard Model Assemblies hub in Textbook TOC order.

## Atomic and Nuclear Assemblies

Planned output:

```text
content/generated/pdf/textbook/atomic-and-nuclear-assemblies.pdf
```

This snapshot contains the Atomic and Nuclear Assemblies hub in Textbook TOC order.

## Reactions

Planned output:

```text
content/generated/pdf/textbook/reactions.pdf
```

This snapshot contains the Reactions hub in Textbook TOC order.

## Quantum

Planned output:

```text
content/generated/pdf/textbook/quantum.pdf
```

This snapshot contains the Quantum hub in Textbook TOC order.

## Theory Bridges

Planned output:

```text
content/generated/pdf/textbook/theory-bridges.pdf
```

This snapshot contains the Theory Bridges hub in Textbook TOC order.

## Cosmology

Planned output:

```text
content/generated/pdf/textbook/cosmology.pdf
```

This snapshot contains the Cosmology hub in Textbook TOC order.

## Validation

Planned output:

```text
content/generated/pdf/textbook/validation.pdf
```

This snapshot contains the Validation hub in Textbook TOC order.

## Proof Programs

Planned output:

```text
content/generated/pdf/textbook/proof-programs.pdf
```

This snapshot contains the Proof Programs hub in Textbook TOC order.

## Philosophy-History

Planned output:

```text
content/generated/pdf/textbook/philosophy-history.pdf
```

This snapshot contains the Philosophy-History hub in Textbook TOC order.
