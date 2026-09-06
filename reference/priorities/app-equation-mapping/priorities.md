# Equation Mapping App

## LLM Instructions

- Keep this packet focused on the equation-mapping app. Do not move equation-row scoring, source evidence, or theorem-closure material out of [../mapping-equations/priorities.md](../mapping-equations/priorities.md).
- Treat app output as an explanatory working surface, not as accepted equation-mapping evidence or score movement.
- Keep user-facing app language plain. Use `equation`, `comment`, `pointer line`, `section of the formula`, `subject`, and `background`; do not expose animation-engine or scene-language terminology.
- Keep [requirements-and-design.md](contracts/requirements-and-design.md) stable and descriptive. Move task-shaped implementation work into [work-queue.md](work-queue.md).

## Workstream Metadata

- Kind: `priority-app`
- Rank: `unranked`
- Value: `not scored`
- Cost: `not scored`
- ROI: `not scored`
- Status: `blocked-review-packet-export`

## Current

This folder owns the priority packet for the equation-mapping app that helps the operator work through mappings between $\mathbb{A}\mathbb{A}\mathbb{A}$ equations and existing physics equations.

The app is intended to feel like a simple static equation annotation surface: one centered equation layer, explanatory overlay comments, and thin pointer lines that point to exact terms or sections of the formula.

The first implementation is now a static shell with a local draft editor at [equation-mapping.html](../../../equation-mapping.html). It supports static text layers before any timing, transition, or scripted-animation feature is considered.

The live queue is maintained in [work-queue.md](work-queue.md). The ordinary Markdown link plus structured registry/API contract binds every registered corpus display-equation occurrence to a searchable, addressable, source-grounded read-only page with symbol access. No carousel promotion is active. The remaining review-packet export is blocked until an operator-selected local editor draft exists, so this lane has no executable object and carries no current attention score.

## Carousel Addition Trigger

A future carousel addition must begin as a new operator-accepted task tied to a named reader or operator need. Its request must identify the comprehension gap or comparison use case, the equation whose visual decomposition addresses that need, the intended callouts, the claim boundary, and a review condition that can show whether the addition helps. A standing request to promote another equation merely to expand the carousel is not accepted work.

## Accepted Link, Definition, And Authoring Direction

- Ordinary Markdown links are the portable source-level binding. Each link immediately follows its display-equation occurrence and opens the app by a stable semantic page ID.
- The generated registry/API is the structured authority for equation-page discovery, normalized document retrieval, canonical links, source bindings, search text, and symbol records. Markdown remains the equation and context authority; the generated registry does not create a second authoring surface.
- Every equation receives the same baseline: formula rendering, search, direct addressing, source context, hover/focus symbol help, and a click/tap-accessible scrollable symbols-and-source panel. Promotion changes only carousel placement and additional curated callouts/editorial mapping.
- Equation registration is author-owned but mechanically light. Authors add or revise the equation and define symbols in local prose; the generator preserves or assigns the stable ID, inserts the ordinary link for a new occurrence, creates the basic app record, and rejects incomplete or stale coverage.
- The operational and API details live in [registry-and-authoring-contract.md](contracts/registry-and-authoring-contract.md).

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
- Source data target: a generated corpus-wide equation registry plus a small app-owned promoted-overlay document format.
- UI form: a full-viewport equation canvas with a collapsible left subject index, a compact top-right control group, and a small settings panel.

## Implemented Baseline

- Route: [equation-mapping.html](../../../equation-mapping.html).
- Runtime: [EquationMappingData.js](../../../src/apps/equation-mapping/EquationMappingData.js), [EquationMappingRuntime.js](../../../src/apps/equation-mapping/EquationMappingRuntime.js), and [main.js](../../../src/apps/equation-mapping/main.js).
- Corpus baseline: generated read-only equation pages and symbol records cover the registered corpus; 23 pages are promoted for carousel/editorial mapping.
- Static layer model: equation TeX parts, named anchors, overlay comments, pointer-line side, section-line placement, subject area, claim level, and background setting.
- UI: centered equation layer, collapsible subject index, top-right home/search/edit/settings controls, four background colors, KaTeX rendering, and pointer lines attached to measured formula sections.
- Editor: local draft editing for formula-section labels/formula text/search text, overlay comment title/status/text/equation, pointer target, section-line placement, and comment placement.
- Browser QA capture filenames (not retained in this checkout): `equation-mapping-desktop-1280x720.png`, `equation-mapping-mobile-390x844.png`, and `equation-mapping-editor-desktop-1280x720.png`.

## Detailed Priority Files

| File | Role | Primary promotion targets |
| --- | --- | --- |
| [work-queue.md](work-queue.md) | Ranked executable app tasks, lifecycle state, acceptance boundary, and completion conditions. | Equation Mapping API, runtime, data, tests, and review artifacts. |
| [requirements-and-design.md](contracts/requirements-and-design.md) | Stable v1 requirements, layer model, visual language, subject index, settings, and implementation boundaries. | `equation-mapping.html`, `src/apps/equation-mapping/`, and selected equation-mapping review fixtures. |
| [registry-and-authoring-contract.md](contracts/registry-and-authoring-contract.md) | Stable link/registry contract, read-only API usage, and author registration procedure. | Corpus equation links, Equation Mapping registry, focused validators, and contributor guidance. |

## Related Priority Notes

- [Equation Mapping](../mapping-equations/priorities.md)
