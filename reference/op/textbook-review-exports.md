# Textbook Review Exports

Responses and working-document capture follow the [operator explanation standard](operator-explanation-standard.md); explanatory prose follows the [academic style guide](../../content/markdown/aaa/archie/academic-style-guide.md).

This procedure owns maintainer instructions for the [PDF download page](../../content/markdown/aaa/archie/download-textbook-pdf.md). The public page explains access, reading order, and snapshot limitations; it does not carry build commands.

Run writes only after an explicit regeneration or fix-drift request, or during the [final branch/PR process](git/codex-pr-branch.md). Ordinary edits use check mode and record drift for that process under the AGENTS.md generated-artifact rule, rather than raising it with the operator.

## Source and Reading Order

The scene graph defines reading order. The generated manifest is `content/graph/textbook_toc.json`; do not infer chapter order from filenames. Canonical Markdown feeds generated reading-copy Markdown, which feeds review PDFs.

## Regeneration

From the repository root, refresh affected dependencies before their consumers:

```bash
node scripts/build-scene-graph.mjs --write --strict
node scripts/build-equation-mapping-corpus.mjs --write
node scripts/build-textbook-md-pdf.mjs --write
node scripts/build-textbook-review-pdfs.mjs --write
```

The equation step maintains functional equation links and their search context. The PDF exporter rebuilds its review set as a unit. The order matters: refresh the source-derived indexes first, then assemble the reading copies from them, then verify that the exported documents match the inputs they were built from. Check the same outputs afterward:

```bash
node scripts/build-scene-graph.mjs --check --strict
node scripts/build-equation-mapping-corpus.mjs --check
node scripts/build-textbook-md-pdf.mjs --check
node scripts/build-textbook-review-pdfs.mjs --check
```

When the public source-index snapshot is part of the authorized refresh, rebuild it after reading copies with `node scripts/archie-service/build-full-corpus-source-index.mjs --write` and rerun the corresponding `--check`. Its copied content needs publication review separately from its machine integrity metadata.

Inspect visible text for development instructions and raw hashes, preserving legitimate URLs and anchors. Extract PDF text and inspect representative rendered pages when PDF content changes. Follow [long-running job guidance](long-running-test-heartbeats.md) for PDF builds. iOS textbook packaging remains an independent on-demand export and is not included.
