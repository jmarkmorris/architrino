# App UI Guidelines

## LLM Instructions

- Keep this folder focused on implementation-facing UI standardization. Reader-facing canon stays in [../../../content/markdown/aaa/archie/ui-guidelines.md](../../../content/markdown/aaa/archie/ui-guidelines.md) and [../../../content/markdown/aaa/archie/navigation-and-controls.md](../../../content/markdown/aaa/archie/navigation-and-controls.md).
- Treat this folder as the migration tracker for webapp chrome, standalone app chrome, markdown display controls, and page-level exceptions.
- Do not turn every app-specific control into global chrome. The shared top dynamic control bar owns navigation, search, document, settings, and mode-entry actions; domain controls stay near the canvas, timeline, editor, or panel that they operate.
- Use plain app-facing language in standards: `Home`, `Search`, `Notes`, `Documents`, `Settings`, `Edit`, `Back`, `Forward`, `Close`, `Print`, and `Layout`.
- When a task is done, remove it from `Task Queue` and renumber the remaining items.

## Workstream Metadata

- Kind: `priority-ui`
- Rank: `21`
- Value: `0.76`
- Cost: `3.5`
- ROI: `0.22`
- Status: `standalone-migration-in-progress-eligible-non-borg-non-braid-complete`

## Current

The top dynamic control-bar standard is accepted. The live audit now distinguishes structurally conforming full bars, near or partial migrations, lightweight headers, exempt content, and retired redirects.

- The main webapp and Animator now consume the canonical shared runtime and stylesheet; the same generated bar moves between their headers without duplicated IDs or listeners.
- Lattice Lab and Wake Topography now consume the canonical shared runtime through the standalone adapter; their domain controls remain locally owned.
- Photon, Causal Delay Feedback, and Equation Mapping now consume the same standalone adapter while their document, lesson, replay, equation-search, editing, settings, and scientific controls remain locally owned. Ideal Braid, Borg, and Braid Search carry the accepted full navigation structure but still use the pre-runtime standalone composition path pending migration.
- Greek Letter Match, PDG Edit, and Molecule now consume the canonical standalone adapter while their game, pronunciation, reaction-picker, filter, editing, molecule-session, and preset controls remain local. Borg Library remains a partial migration.
- Website Stats, public feedback, Brand Visual Identity, and Solver GPU Harness conform to their accepted lightweight policies. The brand page retains its existing explicit project-return identity link, and the harness now exposes a compact Applications action beside live status.
- PDG Edit Review, generated reading copies, iOS reader mounts, and local children's-book review pages remain explicitly exempt; Assembly Explorer is a retired redirect.

The [accepted runtime design](top-dynamic-control-bar-runtime-design-v1.md) is implemented by `TopDynamicControlBarRuntime.js`, its canonical stylesheet, and the thin standalone adapter. The main webapp and Animator were the first migrated surfaces, and the main reader matches Photon and Ideal Braid by keeping full-document, layout, print/PDF, and Close actions in its reading-surface header. The [UI-007 browser receipt](evidence/ui-007-top-dynamic-control-bar-browser-captures.2026-09-02.json) binds current desktop/mobile captures for those first two surfaces. UI-005 browser receipts bind [Lattice Lab and Wake Topography](evidence/ui-005-batch-1-lattice-topo-browser-captures.2026-09-02.json), [Photon](evidence/ui-005-batch-2-photon-browser-captures.2026-09-02.json), [Causal Delay Feedback](evidence/ui-005-batch-3-causal-delay-feedback-browser-captures.2026-09-02.json), the [two lightweight headers](evidence/ui-005-batch-4-lightweight-headers-browser-captures.2026-09-02.json), [Greek Letter Match](evidence/ui-005-batch-5-greek-letter-match-browser-captures.2026-09-02.json), [Equation Mapping](evidence/ui-005-batch-6-equation-mapping-browser-captures.2026-09-02.json), [PDG Edit](evidence/ui-005-batch-7-pdgedit-browser-captures.2026-09-02.json), and [Molecule](evidence/ui-005-batch-8-molecule-browser-captures.2026-09-02.json). UI-005 remains active only for Ideal Braid, Braid Search, Borg, and Borg Library; those surfaces are excluded from this workstream's current operator scope because their queues are active elsewhere.

Local playback surfaces now share the accepted [transport-control standard](transport-controls.md) and icon runtime. This does not move those controls into the top dynamic control bar.

## Objective

Standardize top-right navigation and document controls across the webapp, standalone apps, markdown displays, and page-like utilities.

The accepted standard defines:

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
| Discovery and documents | global `Search` and optional reading-surface entry; panel-local `Full document`, `Layout`, `Print` / `PDF`, and `Close` when applicable | Show only controls that the current surface can honor. Once a reading surface is open, its document operations belong in that surface's header rather than global chrome. |
| App mode | optional `Settings`, optional `Edit`, optional app-specific mode entry | Use icon buttons for mode entry. Keep play, scrub, reset, solver, timeline, and canvas-local toggles near the affected work surface. |

The detailed accepted standard and refreshed audit live in [top-dynamic-control-bar.md](top-dynamic-control-bar.md).

## Product Boundaries

- This workstream does not redesign the scene graph, sphere navigation, markdown renderer, or app-specific domain controls.
- The standard should not force generated reading-copy HTML to carry webapp chrome.
- iOS reader shells may mirror the same action grammar, but native navigation should remain owned by the iOS app.
- Static review pages can use a lighter page-header policy unless they become public-facing product pages.
- A shared icon/button primitive is useful only after the first standard is accepted. Avoid moving every app into a new abstraction before the visual and interaction contract is clear.

## Work Queue

The locally ranked standardization tasks, dependencies, and acceptance boundaries live in [work-queue.md](work-queue.md).

## Detailed Priority Files

| File | Role | Primary targets |
| --- | --- | --- |
| [top-dynamic-control-bar.md](top-dynamic-control-bar.md) | Candidate control-bar standard, current surface inventory, non-conformer migration plan, and validation expectations. | `index.html`, standalone app HTML entrypoints, app runtimes under `src/apps/`, and markdown display controls. |
| [top-dynamic-control-bar-runtime-design-v1.md](top-dynamic-control-bar-runtime-design-v1.md) | Accepted canonical runtime, stylesheet, adapter, extension, focus, migration, and verification design. | `src/runtime/`, `src/apps/navigator/`, main scene and standalone composition roots. |
| [transport-controls.md](transport-controls.md) | Accepted transport semantics, canonical glyph set, shared implementation path, and migration record. | Borg, Animator, Causal Delay Feedback, Ideal Braid, Photon, and `src/runtime/TransportControlIcons.js`. |

## Related Guidance

- [UI Guidelines](../../../content/markdown/aaa/archie/ui-guidelines.md)
- [Navigation & Controls](../../../content/markdown/aaa/archie/navigation-and-controls.md)
- [Equation Mapping App](../app-equation-mapping/priorities.md)
- [Causal Delay Feedback App](../dormant-deferred/app-causal-delay-feedback/priorities.md)
- [Photon App](../app-photon/priorities.md)
- [Animator Design and Interfaces](../dormant-deferred/app-animator/design-and-interfaces.md)
