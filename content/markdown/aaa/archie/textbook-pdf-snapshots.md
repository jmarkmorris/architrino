# Textbook Markdown to PDF

This scene is the markdown-to-PDF workspace for textbook reading copies. The released webapp at [architrino.com](https://www.architrino.com) remains the content of record. A local PDF is a reader-generated copy made from a downloaded reading-copy Markdown file.

## Overview

Use the scene nodes to download generated reading-copy Markdown files. The generated chapter and full-textbook files are download-only in this scene so the browser does not try to render the full textbook inline.

This keeps the source flow simple:

```text
Textbook source markdown -> generated reading-copy Markdown -> local PDF
```

Refresh the reading-copy files after canonical textbook markdown, textbook scene ordering, or the generated Textbook TOC changes:

```bash
node scripts/build-scene-graph.mjs --write --strict
node scripts/build-textbook-md-pdf.mjs --write
node scripts/build-textbook-md-pdf.mjs --check
```

### Source of Record

The webapp remains the source of record because it can change faster, preserve interactive context, and expose the current Textbook TOC. A local PDF is useful for reading, printing, sharing, citation, and offline review, but it is not the canonical source.

### Publication Export Pipeline

A dedicated publication exporter for durable public PDF releases should read the generated Textbook TOC from:

```text
content/graph/textbook_toc.json
```

The exporter should not infer reading order from directories or filenames. The scene graph owns reading order, and the Textbook TOC is the generated publication manifest for that order.

## Full Textbook

Download the full-textbook reading-copy Markdown file, then create a local PDF from that file outside the scene.

## Foundations

Download the Foundations reading-copy Markdown file, then create a local PDF from that file outside the scene.

## Dynamics

Download the Dynamics reading-copy Markdown file, then create a local PDF from that file outside the scene.

## Noether Sea and Effective Spacetime

Download the Noether Sea and Effective Spacetime reading-copy Markdown file, then create a local PDF from that file outside the scene.

## Noether Swarm

Download the Noether Swarm reading-copy Markdown file, then create a local PDF from that file outside the scene.

## Standard Model Assemblies

Download the Standard Model Assemblies reading-copy Markdown file, then create a local PDF from that file outside the scene.

## Atomic and Nuclear Assemblies

Download the Atomic and Nuclear Assemblies reading-copy Markdown file, then create a local PDF from that file outside the scene.

## Reactions

Download the Reactions reading-copy Markdown file, then create a local PDF from that file outside the scene.

## Quantum

Download the Quantum reading-copy Markdown file, then create a local PDF from that file outside the scene.

## Theory Bridges

Download the Theory Bridges reading-copy Markdown file, then create a local PDF from that file outside the scene.

## Cosmology

Download the Cosmology reading-copy Markdown file, then create a local PDF from that file outside the scene.

## Validation

Download the Validation reading-copy Markdown file, then create a local PDF from that file outside the scene.

## Proof Programs

Download the Proof Programs reading-copy Markdown file, then create a local PDF from that file outside the scene.

## Philosophy-History

Download the Philosophy-History reading-copy Markdown file, then create a local PDF from that file outside the scene.
