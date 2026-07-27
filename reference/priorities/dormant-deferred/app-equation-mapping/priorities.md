# Equation Mapping App

## LLM Instructions

- Keep this packet focused on the equation-mapping app. Do not move equation-row scoring, source evidence, or theorem-closure material out of [../equation-mapping/priorities.md](../equation-mapping/priorities.md).
- Treat app output as an explanatory working surface, not as accepted equation-mapping evidence or score movement.
- Keep user-facing app language plain. Use `equation`, `comment`, `pointer line`, `section of the formula`, `subject`, and `background`; do not expose animation-engine or scene-language terminology.
- Keep [requirements-and-design.md](requirements-and-design.md) stable and descriptive. Move task-shaped implementation work into `Task Queue`.

## Workstream Metadata

- Kind: `priority-app`
- Rank: `17`
- Value: `2.10`
- Cost: `2.7`
- ROI: `0.78`
- Status: `v1-editor`

## Current

This folder owns the priority packet for the equation-mapping app that helps the operator work through mappings between $\mathbb{A}\mathbb{A}\mathbb{A}$ equations and existing physics equations.

The app is intended to feel like a simple static equation annotation surface: one centered equation layer, explanatory overlay comments, and thin pointer lines that point to exact terms or sections of the formula.

The first implementation is now a static shell with a local draft editor at [equation-mapping.html](../../../equation-mapping.html). It supports static text layers before any timing, transition, or scripted-animation feature is considered.

## Objective

Build a compact single-page app for reading, annotating, and comparing equations by subject area.

The first useful version should let the operator:

- choose an equation from a collapsible subject index;
- see the equation centered vertically and horizontally in the canvas;
- add or inspect explanatory comment rectangles that may include equations;
- point each comment to a term or section of the equation with a thin line;
- show the target section with a thin horizontal line above or below that section of the formula;
- switch among the standard four background colors;
- and use the normal top-right home button and search menu.

## Product Boundaries

- The app is a mapping and explanation aid, not a proof checker.
- A visual map does not promote an equation row, close a blocker, or change equation-mapping score by itself.
- The app must preserve the difference between candidate commentary, accepted source evidence, and accepted $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation.
- The v1 interface should avoid complicated language. It should not ask users to learn Manim-like commands, scene graphs, timelines, cameras, or animation primitives.
- Equations and equation fragments should render through the repo's math-rendering path, with KaTeX as the web target.

## App Shape

- Route target: `equation-mapping.html`.
- Runtime target: focused modules under `src/apps/equation-mapping/`.
- Priority owner: this folder.
- Source data target: a small app-owned equation-map document format, with seeded examples drawn from active equation-mapping priority rows only after those rows are explicitly selected for app review.
- UI form: a full-viewport equation canvas with a collapsible left subject index, a compact top-right control group, and a small settings panel.

## Implemented Baseline

- Route: [equation-mapping.html](../../../equation-mapping.html).
- Runtime: [EquationMappingData.js](../../../src/apps/equation-mapping/EquationMappingData.js), [EquationMappingRuntime.js](../../../src/apps/equation-mapping/EquationMappingRuntime.js), and [main.js](../../../src/apps/equation-mapping/main.js).
- Seed document: `poisson-weak-field-source-map`.
- Static layer model: equation TeX parts, named anchors, overlay comments, pointer-line side, section-line placement, subject area, claim level, and background setting.
- UI: centered equation layer, collapsible subject index, top-right home/search/edit/settings controls, four background colors, KaTeX rendering, and pointer lines attached to measured formula sections.
- Editor: local draft editing for formula-section labels/formula text/search text, overlay comment title/status/text/equation, pointer target, section-line placement, and comment placement.
- Browser QA proofs: [desktop 1280x720](browser-qa/equation-mapping-desktop-1280x720.png), [mobile 390x844](browser-qa/equation-mapping-mobile-390x844.png), and [editor desktop 1280x720](browser-qa/equation-mapping-editor-desktop-1280x720.png).

## Task Queue

1. `seed_review_equations_expansion` - Add a small set of selected equation-mapping review documents by subject area without implying proof acceptance. Status: `pending`. Depends on: an accepted seed-data update or local editor-created review drafts selected for promotion.
2. `review_packet_export` - Export a static equation-map packet for review, including document JSON and a screenshot. Status: `pending`. Depends on: local editor draft state.

## Detailed Priority Files

| File | Role | Primary promotion targets |
| --- | --- | --- |
| [requirements-and-design.md](requirements-and-design.md) | Stable v1 requirements, layer model, visual language, subject index, settings, and implementation boundaries. | `equation-mapping.html`, `src/apps/equation-mapping/`, and selected equation-mapping review fixtures. |

## Related Priority Notes

- [Equation Mapping](../equation-mapping/priorities.md)
- [New Apps](../app-ideas/priorities.md)
