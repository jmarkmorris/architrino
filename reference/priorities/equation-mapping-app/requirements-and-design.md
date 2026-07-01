# Equation Mapping App Requirements And Design

## Purpose

The equation-mapping app is a focused visual workspace for comparing existing physics equations with candidate $\mathbb{A}\mathbb{A}\mathbb{A}$ equations and explanatory commentary.

The first version should make a single equation easy to read, mark up, and discuss. It should not try to become a general animation language. The useful first product is static: layers of text, equation math, comment rectangles, and pointer lines.

## Non-Negotiable V1 Requirements

1. The main equation appears centered vertically and horizontally in the canvas.
2. Each explanatory overlay is a rectangle with concise comment text.
3. Overlay comments may include equations.
4. Each overlay can point to a specific term or section of the formula with a thin pointer line.
5. The pointed-to section of the formula can show a thin horizontal line above or below that section.
6. The side subject index is collapsible.
7. The app uses a top-right home button and search menu consistent with the standalone app shell.
8. The settings panel exposes four background colors, reusing the known app palette: Purple, Light, Warm, and Dark.
9. Text outside equations uses `"Helvetica Neue", Arial, sans-serif`.
10. Equation rendering targets KaTeX.
11. The visible design should be economical: quiet rules, sparse color, no ornamental gradients, no decorative panels, and no explanatory text that merely describes the controls.
12. User-facing language stays plain and direct. Do not expose Manim-like command language in v1.

## V1 Layer Model

The first app model has these visible layers:

| Layer | Role | Requirement |
| --- | --- | --- |
| Background | Holds one of the four selected canvas colors. | Must not carry decorative effects that compete with the equation. |
| Equation | Renders the active equation in the visual center of the canvas. | Must remain readable on desktop and mobile. |
| Formula section line | Marks a selected formula term or section with a thin horizontal line above or below the formula. | Must align to the measured rendered formula section, not just to a rough hand-placed coordinate. |
| Pointer line | Connects a comment rectangle to the selected formula section line. | Must be thin, restrained, and attached after resize. |
| Comment rectangle | Holds explanatory prose and optional equation snippets. | Must use Helvetica Neue for prose and KaTeX for math. |
| Subject index | Lists equations by subject area. | Must collapse to preserve canvas focus. |
| Top-right controls | Holds home, search, and settings. | Must stay compact and avoid overlapping the equation. |

## Equation Document Shape

V1 should use an app-owned document shape that can be serialized, reviewed, and tested before deeper runtime work.

Minimum fields:

| Field | Meaning |
| --- | --- |
| `id` | Stable equation-map id. |
| `title` | Short equation title. |
| `subject` | Subject-area grouping shown in the side index. |
| `formulaTeX` | Main equation TeX. |
| `anchors` | Named formula terms or sections that overlays may point to. |
| `overlays` | Comment rectangles with target anchor, position, pointer side, and comment content. |
| `backgroundId` | One of `architrinoPurple`, `light`, `warm`, or `dark`. |
| `claimLevel` | Mapping note status such as `candidate-commentary`, `accepted-source-reference`, or `accepted-aaa-derivation`. |

The `anchors` field is important. Saved overlays should target named formula sections rather than raw screen coordinates so the pointer line and section line can survive font, viewport, and background changes.

## Subject Index

The first subject index should be a left rail that collapses to an icon-width control.

Initial subject groups:

- Classical mechanics
- Relativity and effective metric
- Quantum and QFT
- Statistical mechanics and thermodynamics
- Cosmology and astrophysics
- $\mathbb{A}\mathbb{A}\mathbb{A}$ native rows

The subject index should support search filtering. Search should match title, subject, visible equation text, and overlay text where practical.

## Visual Language

The visual direction is Edward Tufte-like economy: maximize the amount of equation meaning carried by each line, label, and mark.

Design rules:

- Keep most of the canvas empty around the equation.
- Use thin rules for pointer lines and formula section lines.
- Use restrained comment boxes with low border contrast and no heavy shadows.
- Use a small number of accent colors, mainly for selected anchors and active search matches.
- Avoid large cards, nested cards, glow fields, bokeh, and decorative background texture.
- Keep all comments short enough to read without covering the equation.
- Prefer a light or warm reading background for dense equations, while retaining Purple and Dark as standard app settings.

## Comment Rectangles

Comment rectangles should behave like labels, not dashboard cards.

Requirements:

- Comments can contain plain prose and inline or display equations.
- Comments should wrap cleanly and never overlap the equation unless the operator intentionally places one over empty formula-space.
- Each comment has one pointer line by default.
- Multiple comments may target the same formula section.
- The active comment should reveal its target line more strongly than inactive comments.
- Comments should support concise status tags only when they clarify claim level, for example `candidate` or `accepted source`.

## Pointer Lines And Formula Section Lines

The pointer system is the core interaction.

Requirements:

- A formula section can be marked above or below the rendered equation with a thin horizontal line.
- The pointer line connects from the comment rectangle to that section line, not directly to an arbitrary point in the equation.
- Lines should route simply, with one straight segment when possible and one bend only when needed to avoid covering formula text.
- Pointer lines should remain attached after resize, background change, side-index collapse, or search-panel open/close.
- The target section should be computed from rendered formula measurements or explicit span metadata rather than from hard-coded pixels.

## Settings

V1 settings:

- background color: Purple, Light, Warm, Dark;
- section-line placement: above or below formula section;
- comment density: compact or roomy;
- equation scale: small, medium, large;
- index collapsed state.

The app should remember settings in browser-local state once the first implementation exists. It should not require account or server state.

## Search Menu

The search menu should reuse the normal top-right app pattern.

Search requirements:

- Search equations by title, subject, and formula text.
- Search overlay comments.
- Selecting a result opens that equation and briefly highlights the matching formula anchor or comment.
- Search should remain useful when the subject index is collapsed.

## Claim-Level Discipline

This app helps the operator see mappings; it does not certify them.

The app should display claim level when it is material:

| Claim level | Meaning |
| --- | --- |
| `candidate-commentary` | A working explanation or proposed mapping. |
| `accepted-source-reference` | A standard-physics source equation or reference used for comparison. |
| `accepted-aaa-derivation` | An accepted $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation already landed in the proper corpus or priority packet. |

No visual state in this app should imply equation-mapping score movement unless the underlying equation-mapping priority row and accepted evidence already support that movement.

## Implementation Boundaries

- Keep route glue thin in `equation-mapping.html`.
- Put runtime logic under `src/apps/equation-mapping/`.
- Do not add new behavior to root `app.js`.
- Keep rendering, document normalization, subject-index state, search, settings, and pointer measurement in separate focused modules when implementation begins.
- Use the shared app-home convention, with home navigation returning to `index.html`.
- Reuse the known four-background setting from existing app code where practical.
- Do not introduce a production solver path or equation-proof checker for this app.

## First Browser QA Targets

V1 is not complete until screenshots prove:

- desktop and mobile layouts keep the main equation centered;
- the subject index opens and collapses without covering the equation;
- top-right home, search, and settings controls remain reachable;
- comment rectangles stay readable;
- pointer lines remain attached to the intended formula section;
- the four background colors render with sufficient contrast;
- equations inside comments render through KaTeX;
- and no text overlaps incoherently.
