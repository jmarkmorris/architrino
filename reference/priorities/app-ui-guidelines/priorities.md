# App UI Guidelines

## LLM Instructions

- Keep this folder focused on implementation-facing UI standardization. Reader-facing canon stays in [../../../content/markdown/aaa/archie/ui-guidelines.md](../../../content/markdown/aaa/archie/ui-guidelines.md) and [../../../content/markdown/aaa/archie/navigation-and-controls.md](../../../content/markdown/aaa/archie/navigation-and-controls.md).
- Treat this folder as the migration tracker for webapp chrome, standalone app chrome, markdown display controls, and page-level exceptions.
- Do not turn every app-specific control into global chrome. The shared top dynamic control bar owns navigation, search, document, settings, and mode-entry actions; domain controls stay near the canvas, timeline, editor, or panel that they operate.
- Use plain app-facing language in standards: `Home`, `Search`, `Notes`, `Documents`, `Settings`, `Edit`, `Back`, `Forward`, `Close`, `Print`, and `Layout`.
- When a task is done, remove it from `Task Queue` and renumber the remaining items.

## Workstream Metadata

- Kind: `priority-ui`
- Rank: `30`
- Value: `0.76`
- Cost: `3.5`
- ROI: `0.22`
- Status: `audit-and-standard`

## Current

The repo has several mature UI surfaces, but their top controls have grown independently:

- the main scene webapp uses a top-right scene HUD with history, home, search, and markdown controls;
- the standalone Animator page carries a forked scene HUD;
- Equation Mapping has a compact top-right icon group;
- Molecule has a top floating title block with a single Applications button;
- Photon and Ideal Braid keep Home and document controls inside app-specific side panels;
- Causal Delay Feedback has a floating replay toolbar with settings but no Home or Search;
- PDG Edit uses a document-picker top band with Home;
- Borg, Website Stats, Solver GPU Harness, PDG Edit Review, generated reading copies, iOS reader shells, and children's-book review pages all use separate page patterns.

The next opportunity is to define one top dynamic control bar that can be reused across the webapp and standalone apps without flattening specialized workbench controls into global navigation.

Local playback surfaces now share the accepted [transport-control standard](transport-controls.md) and icon runtime. This does not move those controls into the top dynamic control bar.

## Objective

Standardize top-right navigation and document controls across the webapp, standalone apps, markdown displays, and page-like utilities.

The first useful standard should define:

- which controls belong in the shared top dynamic control bar;
- which controls remain local to a canvas, timeline, editor, or panel;
- how Home behaves in the main webapp versus standalone apps;
- how Search behaves when an app has local search rather than scene search;
- how markdown document controls are shown in the main webapp and standalone document overlays;
- which page classes are exempt because they are generated, static review artifacts, or native-shell content;
- and the migration order for non-conforming surfaces.

## Target Control Model

The shared top dynamic control bar is a compact action strip anchored to the top-right safe area of the viewport or page header.

It has three action groups:

| Group | Controls | Rule |
| --- | --- | --- |
| Navigation | `Home`, optional `Back`, optional `Forward` | Always preserve browser history. Standalone apps route `Home` to the Applications scene; the main webapp routes `Home` to the root scene. |
| Discovery and documents | `Search`, optional `Notes` / `Documents`, optional `Layout`, optional `Print` / `PDF`, optional `Close` | Show only controls that the current surface can honor. Markdown controls should live with the reading surface when practical. |
| App mode | optional `Settings`, optional `Edit`, optional app-specific mode entry | Use icon buttons for mode entry. Keep play, scrub, reset, solver, timeline, and canvas-local toggles near the affected work surface. |

The detailed standard and audit live in [top-dynamic-control-bar.md](top-dynamic-control-bar.md).

## Product Boundaries

- This workstream does not redesign the scene graph, sphere navigation, markdown renderer, or app-specific domain controls.
- The standard should not force generated reading-copy HTML to carry webapp chrome.
- iOS reader shells may mirror the same action grammar, but native navigation should remain owned by the iOS app.
- Static review pages can use a lighter page-header policy unless they become public-facing product pages.
- A shared icon/button primitive is useful only after the first standard is accepted. Avoid moving every app into a new abstraction before the visual and interaction contract is clear.

## Task Queue

1. `standard_acceptance_pass` - Review [top-dynamic-control-bar.md](top-dynamic-control-bar.md) and decide the required baseline controls, visual dimensions, ordering, and exemption classes. Status: `pending`.
2. `shared_bar_runtime_design` - Define the smallest shared module or component for icon SVGs, home target resolution, search panel anchoring, settings popovers, focus handling, and responsive wrapping. Status: `pending`. Depends on: `standard_acceptance_pass`.
3. `main_webapp_and_animator_hud_unification` - Remove the forked top HUD drift between [index.html](../../../index.html) and [animator.html](../../../animator.html), then route both through the shared control model. Status: `pending`. Depends on: `shared_bar_runtime_design`.
4. `markdown_control_relocation` - Decide and implement whether layout, full-document, PDF/print, and close controls live in a reading-surface header across the main markdown panel, Photon markdown panel, and Ideal Braid markdown panel. Status: `pending`. Depends on: `standard_acceptance_pass`.
5. `standalone_app_home_search_settings_migration` - Migrate standalone apps in batches: Equation Mapping and Assembly Explorer first, then Molecule, Causal Delay Feedback, Photon, Ideal Braid, PDG Edit, Borg, Website Stats, and Solver GPU Harness as applicable. Status: `pending`. Depends on: `shared_bar_runtime_design`.
6. `page_exception_policy` - Mark generated reading copies, iOS reader shells, children's-book review pages, PDG Edit Review, and other static review artifacts as either exempt, lightweight-header, or full-top-bar candidates. Status: `pending`.
7. `visual_regression_capture` - Capture desktop and mobile screenshots for the shared bar on the main webapp, one markdown display, one canvas-first app, one panel-heavy app, and one utility page. Status: `pending`. Depends on: first migration batch.

## Detailed Priority Files

| File | Role | Primary targets |
| --- | --- | --- |
| [top-dynamic-control-bar.md](top-dynamic-control-bar.md) | Candidate control-bar standard, current surface inventory, non-conformer migration plan, and validation expectations. | `index.html`, standalone app HTML entrypoints, app runtimes under `src/apps/`, and markdown display controls. |
| [transport-controls.md](transport-controls.md) | Accepted transport semantics, canonical glyph set, shared implementation path, and migration record. | Borg, Animator, Causal Delay Feedback, Ideal Braid, Photon, and `src/runtime/TransportControlIcons.js`. |

## Related Guidance

- [UI Guidelines](../../../content/markdown/aaa/archie/ui-guidelines.md)
- [Navigation & Controls](../../../content/markdown/aaa/archie/navigation-and-controls.md)
- [Equation Mapping App](../app-equation-mapping/priorities.md)
- [Causal Delay Feedback App](../dormant-deferred/app-causal-delay-feedback/priorities.md)
- [Photon App](../app-photon/priorities.md)
- [Animator Design and Interfaces](../app-animator/design-and-interfaces.md)
