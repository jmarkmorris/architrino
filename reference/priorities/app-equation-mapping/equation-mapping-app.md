# Equation Mapping App

## LLM Instructions

- Keep this packet focused on the equation-mapping app. Do not move equation-row scoring, source evidence, or theorem-closure material out of [../equation-mapping/equation-mapping.md](../equation-mapping/equation-mapping.md).
- Treat app output as an explanatory working surface, not as accepted equation-mapping evidence or score movement.
- Keep user-facing app language plain. Use `equation`, `comment`, `pointer line`, `section of the formula`, `subject`, and `background`; do not expose animation-engine or scene-language terminology.
- Keep [requirements-and-design.md](requirements-and-design.md) stable and descriptive. Move task-shaped implementation work into `Task Queue`.

## Workstream Metadata

- Kind: `priority-app`
- Rank: `unranked`
- Value: `TBD`
- Cost: `TBD`
- ROI: `TBD`
- Status: `seeded`

## Current

This folder owns the priority packet for a new equation-mapping app that helps the operator work through mappings between $\mathbb{A}\mathbb{A}\mathbb{A}$ equations and existing physics equations.

The app is intended to feel like a simple static equation annotation surface: one centered equation layer, explanatory overlay comments, and thin pointer lines that point to exact terms or sections of the formula.

The first implementation is not an animation authoring system. It should support static text layers before any timing, transition, or scripted-animation feature is considered.

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

## Task Queue

1. `static_layer_model` - Define the v1 static equation-map document format: equation TeX, subject area, term/section anchors, overlay comments, pointer-line side, and background setting. Status: `active`. Depends on: none.
2. `first_page_shell` - Build the standalone route with a centered equation layer, top-right home button, search menu, collapsible subject index, and four-color background settings. Status: `next`. Depends on: `static_layer_model`.
3. `formula_section_pointing` - Implement measured formula-section targeting so a comment can draw a thin pointer line to a horizontal line above or below the selected section of the formula. Status: `pending`. Depends on: `first_page_shell`.
4. `comment_math_rendering` - Render comment rectangles with Helvetica Neue prose and KaTeX math inside the same compact box. Status: `pending`. Depends on: `first_page_shell`.
5. `seed_review_equations` - Seed a small equation index by subject area from selected equation-mapping rows without implying proof acceptance. Status: `pending`. Depends on: `comment_math_rendering`.
6. `browser_qa` - Capture desktop and mobile screenshots proving the equation remains centered, the subject index collapses, the pointer lines stay attached, and text does not overlap. Status: `pending`. Depends on: `seed_review_equations`.

## Detailed Priority Files

| File | Role | Primary promotion targets |
| --- | --- | --- |
| [requirements-and-design.md](requirements-and-design.md) | Stable v1 requirements, layer model, visual language, subject index, settings, and implementation boundaries. | `equation-mapping.html`, `src/apps/equation-mapping/`, and selected equation-mapping review fixtures. |

## Related Priority Notes

- [Equation Mapping](../equation-mapping/equation-mapping.md)
- [New Apps](../app-ideas/app-ideas.md)
