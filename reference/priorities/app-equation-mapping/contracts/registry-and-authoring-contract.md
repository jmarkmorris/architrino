# Equation Mapping Registry And Authoring Contract

## Accepted Binding

Every corpus display-equation occurrence has one stable semantic page ID, one ordinary Markdown link immediately after the display equation, one generated read-only Equation Mapping document, one source binding, and one structured symbol collection. The link carries the durable ID. The generator preserves that ID when the formula or surrounding prose changes and uses it as the machine-readable join between source and app page.

The canonical Markdown remains the equation and source-context authority. [build-equation-mapping-corpus.mjs](../../../../scripts/build-equation-mapping-corpus.mjs) scans that source, preserves or assigns IDs, and generates [corpus-equations.json](../../../../content/generated/equation-mapping/corpus-equations.json) under schema `equation-mapping-corpus-registry.v1`. [EquationMappingData.js](../../../../src/apps/equation-mapping/EquationMappingData.js) contains only the curated promoted overlays. Promotion affects carousel placement and additional editorial mapping; it does not affect searchability, addressability, source context, symbol access, or equation status.

Static clients can fetch `content/generated/equation-mapping/corpus-equations.json`. Each record supplies the semantic ID, formula TeX, title, subject, promotion flag, source path and heading, line span, source route, nearby context, search text, and symbol records. The source also supplies `sourceTitle` and `sourceOrder` for chapter browsing, derived from the textbook table of contents. Chapters absent from that table use their canonical Markdown title and a null order, sorting after textbook chapters. Counts are reported in the generated payload rather than duplicated here.

On the Equation Mapping page, clients may use:

```js
const pages = window.ArchitrinoEquationMapping.list();
const page = window.ArchitrinoEquationMapping.get("lorentz-clock-rate");
const href = window.ArchitrinoEquationMapping.href("eq-02-lorentz-clock-rate");
```

The interface returns frozen page records under schema `equation-mapping-registry.v1`. `list()` returns every corpus equation page. `get(id)` accepts a semantic page ID and retains the promoted stable-ID/title aliases; it returns `null` for an unknown ID. `href(id)` returns the canonical app-page link or `null` for an unknown ID.

## Author-Owned Registration

When an author adds or materially revises a display equation, the author must:

1. author the display equation normally in canonical Markdown;
2. define each introduced symbol in the local source prose and keep those definitions valid when revising the formula;
3. preserve the existing `View →` link when revising an existing equation; and
4. run `node scripts/build-equation-mapping-corpus.mjs --check` during ordinary editing and include explicit final regeneration with `node scripts/build-equation-mapping-corpus.mjs --write` in the publication workflow.

The write command assigns a deterministic ID to a new occurrence, inserts its source-relative ordinary Markdown link, and rebuilds the generated registry. It does not require an author to duplicate the equation, hand-author a basic app document, edit a source-binding table, or classify duplicates. Each occurrence is addressable in its own source context. The check command rejects duplicate IDs, missing links, stale generated data, missing source context, incomplete symbol records, or a promoted equation absent from the corpus inventory. It is also part of [check-content-integrity.mjs](../../../../scripts/check-content-integrity.mjs).

Promotion is a separate editorial change. To promote an existing equation into the carousel, an editor adds or updates its curated document and callouts in `EquationMappingData.js`; the baseline link, page, source context, API record, and symbol access already exist.

The source-relative Markdown link and its `View →` label are the portable reader contract, including in VS Code preview. The web reader additionally presents the link as a styled action beside the display equation, preserves the exact source route for return navigation, and opens the local standalone app page. The iOS package exporter classifies the same `.html` target as a public `https://architrino.com/equation-mapping.html#...` redirect. Generated reading copies inherit the link from the canonical Markdown source.

## Review Boundary

The source binding states where a reader can inspect an equation; it does not promote the equation's claim level, prove a mapping, or change an equation-mapping score. Generated symbol records distinguish definitions detected in local source context from descriptions inferred from shared corpus notation, and the latter explicitly direct the reader to the source excerpt for exact use. A resolving link and complete registry record satisfy the product contract but are not mathematical evidence.
