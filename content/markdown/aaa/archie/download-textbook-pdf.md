# Download Textbook PDF

This scene is the PDF review shelf for textbook reading copies. The released webapp at [architrino.com](https://www.architrino.com) remains the content of record. A generated PDF review copy is a stable exchange artifact for reading, annotation, forwarding, citation, and offline review.

Think of the PDF as a snapshot. It is useful when a reader wants a stable packet, but it is generated from the living source flow and should not be treated as a hand-authored canon file.

## Overview

Use the scene nodes to open generated PDF review copies. The PDF layer is generated from the same textbook reading-copy Markdown that feeds the reader package; it is not the source of record.

This keeps the source flow simple:

```text
Textbook source markdown -> generated reading-copy Markdown -> generated PDF review copy
```

Refresh the review copies after canonical textbook markdown, textbook scene ordering, or the generated Textbook TOC changes:

```bash
node scripts/build-scene-graph.mjs --write --strict
node scripts/build-textbook-md-pdf.mjs --write
node scripts/build-textbook-md-pdf.mjs --check
node scripts/build-textbook-review-pdfs.mjs --write
node scripts/build-textbook-review-pdfs.mjs --check
```

### Source of Record

The webapp remains the source of record because it can change faster, preserve interactive context, and expose the current Textbook TOC. A generated PDF is useful for exchange and review, but it is not the canonical source.

### Publication Export Pipeline

The PDF review exporter reads the generated Textbook TOC from:

```text
content/graph/textbook_toc.json
```

The exporter should not infer reading order from directories or filenames. The scene graph owns reading order, and the Textbook TOC is the generated publication manifest for that order.

## Full Textbook

Open the full-textbook generated PDF review copy.

## Foundations

Open the Foundations generated PDF review copy.

## Dynamics

Open the Dynamics generated PDF review copy.

## Noether Sea and Effective Spacetime

Open the Noether Sea and Effective Spacetime generated PDF review copy.

## Noether Braid

Open the Noether Braid generated PDF review copy.

## Standard Model Assemblies

Open the Standard Model Assemblies generated PDF review copy.

## Atomic and Nuclear Assemblies

Open the Atomic and Nuclear Assemblies generated PDF review copy.

## Reactions

Open the Reactions generated PDF review copy.

## Quantum

Open the Quantum generated PDF review copy.

## Cosmology

Open the Cosmology generated PDF review copy.

## Validation

Open the Validation generated PDF review copy.

## Philosophy-History

Open the Philosophy-History generated PDF review copy.

## Comparative Glossary

Open the Comparative Glossary generated PDF review copy.
