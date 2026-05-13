# Textbook Markdown to PDF

This scene is the markdown-to-PDF workspace for textbook reading copies. The released webapp at [architrino.com](https://www.architrino.com) remains the content of record. A local PDF is a reader-generated copy of the markdown view that is currently open in the app.

## Overview

Use the scene nodes to open a markdown section, then use **Save markdown as PDF** in the toolbar. The button opens the browser print sheet so the reader can choose **Save as PDF**.

This keeps the source flow simple:

```text
Textbook markdown view -> browser print sheet -> local PDF
```

The webapp should open the markdown first. It should not route the reader to a planned file path or a missing generated PDF.

### Source of Record

The webapp remains the source of record because it can change faster, preserve interactive context, and expose the current Textbook TOC. A local PDF is useful for reading, printing, sharing, citation, and offline review, but it is not the canonical source.

### Future Export Pipeline

A dedicated publication exporter can still be added later for durable public releases. That pipeline should read the generated Textbook TOC from:

```text
content/graph/textbook_toc.json
```

The exporter should not infer reading order from directories or filenames. The scene graph owns reading order, and the Textbook TOC is the generated publication manifest for that order.

## Full Textbook

Open the full textbook markdown view, then use **Save markdown as PDF** in the toolbar to create a local PDF from the current reader view.

## Foundations

Open the Foundations markdown view, then use **Save markdown as PDF** in the toolbar to create a local PDF from the current reader view.

## Dynamics

Open the Dynamics markdown view, then use **Save markdown as PDF** in the toolbar to create a local PDF from the current reader view.

## Noether Sea and Effective Spacetime

Open the Noether Sea and Effective Spacetime markdown view, then use **Save markdown as PDF** in the toolbar to create a local PDF from the current reader view.

## Interactions

Open the Interactions markdown view, then use **Save markdown as PDF** in the toolbar to create a local PDF from the current reader view.

## Standard Model Assemblies

Open the Standard Model Assemblies markdown view, then use **Save markdown as PDF** in the toolbar to create a local PDF from the current reader view.

## Atomic and Nuclear Assemblies

Open the Atomic and Nuclear Assemblies markdown view, then use **Save markdown as PDF** in the toolbar to create a local PDF from the current reader view.

## Reactions

Open the Reactions markdown view, then use **Save markdown as PDF** in the toolbar to create a local PDF from the current reader view.

## Quantum

Open the Quantum markdown view, then use **Save markdown as PDF** in the toolbar to create a local PDF from the current reader view.

## Theory Bridges

Open the Theory Bridges markdown view, then use **Save markdown as PDF** in the toolbar to create a local PDF from the current reader view.

## Cosmology

Open the Cosmology markdown view, then use **Save markdown as PDF** in the toolbar to create a local PDF from the current reader view.

## Validation

Open the Validation markdown view, then use **Save markdown as PDF** in the toolbar to create a local PDF from the current reader view.

## Proof Programs

Open the Proof Programs markdown view, then use **Save markdown as PDF** in the toolbar to create a local PDF from the current reader view.

## Philosophy-History

Open the Philosophy-History markdown view, then use **Save markdown as PDF** in the toolbar to create a local PDF from the current reader view.
