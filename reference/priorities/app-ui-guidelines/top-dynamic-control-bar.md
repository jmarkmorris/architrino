# Top Dynamic Control Bar

## Purpose

This note defines the accepted standard for the top dynamic control bar and records the current migration audit across the main webapp, standalone apps, markdown displays, and page-like utilities.

The standard is intentionally implementation-facing. Canonical user-facing UI preferences remain in [../../../content/markdown/aaa/archie/ui-guidelines.md](../../../content/markdown/aaa/archie/ui-guidelines.md), while this file tracks what needs to move in code.

## Acceptance

The standard and exception policy were accepted on 2026-09-02. Acceptance fixes the control semantics, order, dimensions, responsive behavior, and page classes below. It does not claim that every current page conforms, and it does not authorize moving app-local transport, solver, editor, timeline, filter, or viewport controls into global chrome.

Plainly: the shared strip now has one rulebook. The audit still identifies the pages that need migration.

## Control-Bar Definition

The top dynamic control bar is the compact action strip that appears at the top-right of an interactive Architrino surface.

It should answer four questions without the user learning a new app-specific pattern:

1. How do I get back to the project/app hub?
2. How do I search this surface?
3. How do I open or manage the current notes/document view?
4. How do I open settings or enter a local editing mode?

## Target Behavior

### Placement

- Place the bar at the top-right safe area for canvas-first apps.
- Place the bar in the right side of a sticky page header for document or utility pages.
- Keep the active scene/page title outside the action buttons, usually at top-left or in a compact title block.
- On mobile, wrap or collapse optional secondary groups before shrinking the accepted `32px` icon shell. Preserve the safe-area inset, visible focus, and the relative order of every control that remains visible.

### Visual Standard

- Use icon buttons for shared controls.
- Use a single shell style per surface: dark translucent fill, thin border, currentColor SVG icon, visible focus state, and no text label inside the button.
- Use `Helvetica Neue`, then `Arial, sans-serif`, for labels, popovers, and page headers.
- Keep shared icon buttons at `32px` square with the accepted circular shell in both the main scene and standalone full-standard bars. Text-bearing page-header actions and local app controls may retain their separately owned compact geometry.
- Use `aria-label`, `title` where helpful, `aria-expanded` for popovers, and `aria-pressed` for stateful toggles.
- Do not use emoji or text glyphs for shared icons.

### Action Order

Use this order when the controls exist:

1. `TOC`
2. `Back`
3. `Forward`
4. `Home`
5. `Search`
6. `Notes` or `Documents`
7. `Layout`
8. `Print` or `PDF`
9. `Settings`
10. `Edit` or app-specific mode entry
11. `Close`, only when the bar is inside a panel header

The bar is dynamic, so not every surface shows every action. The visible order should remain stable among the actions that are present.

### Home

- Main webapp: `Home` returns to the root scene.
- Standalone apps: `Home` returns to the Applications scene through `index.html#scene=content%2Fscenes%2Farchie%2Fapplications.json`.
- Home navigation must use browser-history-preserving navigation. Do not replace the current history entry for ordinary user navigation.
- Shared standalone app home helpers should remain centralized in [../../../src/apps/navigator/StandaloneAppHomeRuntime.js](../../../src/apps/navigator/StandaloneAppHomeRuntime.js).

### Search

- Main webapp: `Search` opens scene search.
- Standalone apps: the full-standard `Search` opens global scene search. A specialized app search, such as equation, molecule, document, or collection search, remains local to the surface it filters and does not silently replace global search.
- If a page class is exempt from global scene search or an app has not yet adopted the full bar, omit the global control rather than showing a dead control.
- Search popovers should clear the query and focus the input on open, close on `Escape`, and close on outside interaction when safe.

### Documents And Markdown Displays

- Document-entry controls can appear in the top bar when they open app-wide notes or guides.
- Reading-surface controls should prefer a panel header when a markdown panel is open: `Layout`, `Print` / `PDF`, and `Close`.
- The main webapp, Photon, and Ideal Braid keep reading-only controls in their markdown-panel headers rather than global chrome.

### Settings

- Use the gear icon for app or canvas settings.
- Settings panels should anchor below the button that opened them.
- Settings panels should expose only app-level display or behavior settings. Domain controls such as play/pause, reset, solver run, path toggles, and timeline scrubbers stay near their local work surface.

### Editing And Mode Entry

- Use edit/mode-entry icons for broad mode switches such as Equation Mapping's map editor.
- Do not move direct manipulation controls, timeline controls, solver controls, or viewport toggles into the shared bar unless they affect the whole surface and cannot be more clearly placed near the object they control.

## Current Surface Audit

| Surface | Current top-control shape | Conformance | Migration note |
| --- | --- | --- | --- |
| [index.html](../../../index.html) | Runtime-built TOC, Back, Forward, Home, and global Search bar; reading actions remain panel-local. | Full — canonical runtime | UI-003 removed the static button/SVG copy and migrated state, search, focus, and responsive presentation to the canonical runtime. |
| [animator.html](../../../animator.html) | The same runtime-built bar moves into the Animator header while Animator viewport, scene, solver, library, docs, and Exit controls remain local. | Full — canonical runtime | UI-003 removed the forked scene-HUD copy and verified Applications Home routing plus desktop/mobile app-content clearance. |
| [equation-mapping.html](../../../equation-mapping.html) | Runtime-built TOC, Back, Forward, Home, and global Search bar above a separate equation Search, optional Edit, and Settings group. | Full — canonical runtime | UI-005 batch 6 removed the duplicate local Home path, preserved the three local tools, prevents simultaneous global/local search layers, and collapses the equation index by default on compact screens. |
| [molecule.html](../../../molecule.html) | Runtime-built TOC, Back, Forward, Home, and global Search bar; molecule preset and session controls remain local. | Full — canonical runtime | UI-005 batch 8 removed the copied Home button and runtime path, reserved the desktop preset-list row for the bar, and placed the compact title below it. |
| [photon.html](../../../photon.html) | Runtime-built TOC, Back, Forward, Home, and global Search bar; markdown overlay owns Layout, Print, and Close. | Full — canonical runtime | UI-005 batch 2 removed the repeated static shell; Photon configuration, playback, diagnostics, plots, document entry, and markdown actions remain local. |
| [ideal-braid.html](../../../ideal-braid.html) | Shared TOC, Back, Forward, Home, and Search bar; markdown overlay owns Layout, Print, and Close. | Full | Structurally conforms; preserve braid controls in the app panels. |
| [causal-delay-feedback.html](../../../causal-delay-feedback.html) | Runtime-built TOC, lesson Previous/Next, Home, and global Search bar plus a separate replay toolbar. | Full — canonical runtime | UI-005 batch 3 preserved lesson sequence semantics and local replay/wake controls while removing the repeated static shell. |
| [assembly-explorer.html](../../../assembly-explorer.html) | Compatibility redirect to the Borg Assembly Library. | Retired | No independent app chrome remains. |
| [pdgedit.html](../../../pdgedit.html) | Runtime-built TOC, Back, Forward, Home, and global Search bar above a separate document picker with reaction search and filters. | Full — canonical runtime | UI-005 batch 7 removed the copied Home path, kept document work local, and confined the fixed-width reaction strip to an internal horizontal scroller so both chrome rows remain viewport-reachable. |
| [borg.html](../../../borg.html) | Shared TOC, Back, Forward, Home, Search, and Diagnostics bar; viewport and timeline controls remain local. | Full | Structurally conforms; Diagnostics is the permitted app-mode entry after Search. |
| [borg-library.html](../../../borg-library.html) | Custom catalog header with text Applications and Workbench links plus local collection search. | Partial | Adopt the full bar while retaining collection search, filters, grouping, and playback locally. |
| [topo.html](../../../topo.html) | Runtime-built TOC, Back, Forward, Home, and global Search bar; the collapsible scenario panel remains local. | Full — canonical runtime | UI-005 batch 1 removed the repeated static shell and aligned the accepted order without moving scenario, playback, or map controls. |
| [lattice-lab.html](../../../lattice-lab.html) | Runtime-built TOC, Back, Forward, Home, and global Search bar; gallery and lattice controls remain local. | Full — canonical runtime | UI-005 batch 1 removed the repeated static shell and verified the narrow mobile wrap and unobstructed search popover. |
| [braid-search.html](../../../braid-search.html) | Runtime-built shared TOC, Back, Forward, Home, and Search bar. | Full | Structurally conforms; dashboard filters and views remain local. |
| [greek-letter-match.html](../../../greek-letter-match.html) | Runtime-built TOC, Back, Forward, Home, and global Search bar above the app title and game surface. | Full — canonical runtime | UI-005 batch 5 removed the local text-only Applications button; game setup, answers, session results, and pronunciation remain local. |
| [brand-visual-identity.html](../../../brand-visual-identity.html) | Public reference header with an explicit project-return identity link and local section navigation. | Lightweight header — conforming | The existing `42px` identity link is the accepted project action; adding a second Home link would duplicate its responsibility. |
| [feedback.html](../../../feedback.html) | Public-utility header with a compact `Return to Applications` action. | Lightweight header | Conforms to the lightweight utility policy; feedback form controls remain local. |
| [website-stats.html](../../../website-stats.html) | Sticky utility header with compact Home and Archie actions plus analytics opt-out. | Lightweight header | Conforms to the lightweight utility policy; analytics controls remain local. |
| [solver-gpu-harness.html](../../../solver-gpu-harness.html) | Developer-harness header with compact Applications action and live GPU status. | Lightweight header — conforming | Batch 4 added the missing action; benchmark controls remain local and Search, Documents, and Settings remain omitted. |
| [pdgedit-review.html](../../../pdgedit-review.html) | Static review page header and form controls. | Exempt — static review | Keep the review header and controls without product chrome unless an explicit productization decision promotes the page. |
| Generated reading-copy HTML | Content-only generated HTML files under `apps/ios/.../GeneratedTextbookPackage/reading-copies/`. | Exempt — generated content | Do not manually add chrome to generated content-only files. The owning reader shell supplies navigation. |
| iOS reader shells | `ReaderShell.html` and `SearchSnippetShell.html` mount native reader content. | Native-shell parity | Native SwiftUI owns navigation and top controls; the web content mounts stay minimal. |
| Children's-book review pages | On-demand local review pages under `.local-data/childrens-books/exports/<book>/review/`; see the [pilot export procedure](../../learning-office/childrens-books/production/README.md). | Exempt — local review | Keep the local review header and links without public product chrome unless an explicit productization decision promotes a page. |

## Page Exception Policy

All public interactive app and workbench surfaces not named below target the full dynamic-control-bar standard. An exception changes the amount or owner of shared chrome; it does not waive accessible names, keyboard access, visible focus, or usable touch targets for controls that remain.

| Surface class | Disposition | Required control ownership | Current named surfaces | Promotion trigger |
| --- | --- | --- | --- | --- |
| Public utility | Lightweight header | Show the page title and a compact Home/project action. Keep utility-specific controls local; omit Search, Documents, and Settings unless the utility actually implements them. | [website-stats.html](../../../website-stats.html), [feedback.html](../../../feedback.html) | Adopt the full standard only if the utility becomes an interactive app or workbench with app-level navigation, search, documents, or settings. |
| Public reference page | Lightweight header | Show the reference title, compact project/Home navigation, and local section navigation where useful. | [brand-visual-identity.html](../../../brand-visual-identity.html) | Adopt the full standard only if the reference becomes an interactive app or workbench. |
| Developer harness | Lightweight header | Show the harness title/status and compact Home navigation when reachable from app navigation. Keep benchmark and diagnostic controls local. | [solver-gpu-harness.html](../../../solver-gpu-harness.html) | Adopt the full standard only after an explicit decision to make the harness a public app surface with shared app-level actions. |
| Static review artifact | Exempt | The review page owns only its review title, metadata, and review controls. | [pdgedit-review.html](../../../pdgedit-review.html) | Reclassify before public product navigation or app-level behavior is added. |
| Generated reading content | Exempt | The generator emits content only; its owning reader shell supplies navigation. Never patch generated copies to add shared chrome. | `apps/ios/ArchitrinoReader/GeneratedTextbookPackage/reading-copies/*.html` | Change the canonical generator or owning shell only when the reader contract changes. |
| Native content mount | Native-shell parity | Native SwiftUI owns navigation and top controls; embedded HTML stays a minimal content mount. | `ReaderShell.html`, `SearchSnippetShell.html` | Reclassify only if a shell becomes a standalone web destination rather than an embedded native surface. |
| Local review output | Exempt | The local review exporter owns simple review navigation and controls. | `.local-data/childrens-books/exports/<book>/review/index.html` | Reclassify before any review output is promoted to a public-facing product surface. |

## Markdown Display Audit

| Surface | Current controls | Migration note |
| --- | --- | --- |
| Main webapp markdown panel | Panel-local `Full document` when a section has a parent document, `Layout`, `Print` / `PDF`, and `Close` icon buttons in a visible header. | Conforming; UI-004 moved the actions out of global chrome and passed desktop/mobile rendered checks. |
| Photon markdown panel | Panel-local `Layout`, `Print`, and `Close` icon buttons. | Good reference for reading-surface-local markdown actions. |
| Ideal Braid markdown panel | Panel-local `Layout`, `Print`, and `Close` icon buttons. | Good reference for reading-surface-local markdown actions. |
| iOS ReaderShell | Native-shell content mount with no web top controls. | Treat as native reader parity, not webapp chrome. |
| Generated reading-copy HTML | Content-only HTML. | Exempt generated output. |

## Migration Plan

### Phase 1: Accepted Standard — Complete

- Use `32px` circular shared icon controls.
- Use `TOC`, Back, Forward, Home, Search, document actions, Settings, and mode entry in that relative order when present.
- Keep full-document, layout, print/PDF, and Close actions in the reading-surface header.
- Preserve the accepted generated, native-shell, static/local review, developer-harness, public-utility, and public-reference page classes.

### Phase 2: Build Shared Primitives

Create a small shared runtime/style layer only after Phase 1:

- shared icon SVG builders for Home, Back, Forward, Search, Document, Layout, Print/PDF, Settings, Edit, and Close;
- shared standalone Home target resolution;
- shared action metadata with `aria-label`, `title`, `pressed`, `expanded`, and disabled handling;
- shared popover anchoring and outside-dismiss behavior;
- shared CSS tokens for button size, border, fill, text color, focus, and responsive wrapping.

Candidate homes:

- `src/apps/navigator/` for navigation-specific helpers;
- `src/runtime/` for shared webapp chrome behavior;
- a small CSS import or constructable style helper only if the repo's current app packaging supports it cleanly.

### Phase 3: Pilot Migrations

1. Equation Mapping: complete; the canonical global bar coexists with explicitly local equation Search, Edit, and Settings controls, with browser evidence bound by the [UI-005 batch-6 receipt](evidence/ui-005-batch-6-equation-mapping-browser-captures.2026-09-02.json).
2. Molecule: complete; the canonical global bar replaces the copied Applications button while preset, session-formula, and visualization controls remain local. Evidence is bound by the [UI-005 batch-8 receipt](evidence/ui-005-batch-8-molecule-browser-captures.2026-09-02.json).
3. Main webapp plus Animator: complete; one generated bar moves between the scene and Animator headers.
4. Lattice Lab plus Wake Topography: complete; both consume the standalone adapter and canonical runtime, with browser evidence bound by the [UI-005 batch-1 receipt](evidence/ui-005-batch-1-lattice-topo-browser-captures.2026-09-02.json).

### Phase 4: Panel-Heavy Apps

1. Photon: complete; canonical Applications Home and global Search are live while document buttons and markdown-panel actions remain local. Evidence is bound by the [UI-005 batch-2 receipt](evidence/ui-005-batch-2-photon-browser-captures.2026-09-02.json).
2. Ideal Braid: separate global Home/Search/Settings from local simulation controls.
3. PDG Edit: complete; canonical Applications Home and global Search are live while the document picker, reaction search, filters, and editing surface remain local. Evidence is bound by the [UI-005 batch-7 receipt](evidence/ui-005-batch-7-pdgedit-browser-captures.2026-09-02.json).
4. Borg: add Home; leave viewport and timeline controls local.
5. Causal Delay Feedback: complete; canonical Applications Home and global Search are live, lesson Previous/Next preserve their declared sequence, and replay controls remain local. Evidence is bound by the [UI-005 batch-3 receipt](evidence/ui-005-batch-3-causal-delay-feedback-browser-captures.2026-09-02.json).

### Phase 5: Page Policy

- Website Stats: use the lightweight public-utility header with a compact Home/project action and page-local analytics controls.
- Solver GPU Harness: complete; the lightweight header exposes Applications beside live status and keeps benchmark controls local. Evidence is bound by the [UI-005 batch-4 receipt](evidence/ui-005-batch-4-lightweight-headers-browser-captures.2026-09-02.json).
- PDG Edit Review and children's-book review pages: remain exempt review artifacts unless explicitly productized.
- Generated reading-copy HTML: remains exempt; never manually patch generated chrome.
- iOS reader shells: follow native-shell parity, with SwiftUI owning navigation and embedded HTML remaining content-only.

## Validation Expectations

The current representative-surface evidence is bound by the [UI-007 browser-capture receipt](evidence/ui-007-top-dynamic-control-bar-browser-captures.2026-09-02.json) and the UI-005 receipts for [batch 1](evidence/ui-005-batch-1-lattice-topo-browser-captures.2026-09-02.json), [batch 2](evidence/ui-005-batch-2-photon-browser-captures.2026-09-02.json), [batch 3](evidence/ui-005-batch-3-causal-delay-feedback-browser-captures.2026-09-02.json), [batch 4](evidence/ui-005-batch-4-lightweight-headers-browser-captures.2026-09-02.json), [batch 5](evidence/ui-005-batch-5-greek-letter-match-browser-captures.2026-09-02.json), [batch 6](evidence/ui-005-batch-6-equation-mapping-browser-captures.2026-09-02.json), [batch 7](evidence/ui-005-batch-7-pdgedit-browser-captures.2026-09-02.json), and [batch 8](evidence/ui-005-batch-8-molecule-browser-captures.2026-09-02.json). Their ignored PNGs cover ten full-bar surfaces plus the two lightweight headers at `1440x900` and `390x844`. The receipts record control dimensions and order where applicable, viewport-bounded popovers, horizontal-overflow absence, internal wide-surface scrolling, and surface-specific content clearance.

Plainly: the tracked receipts say exactly what the current pictures prove and where to reproduce them; they do not turn these nine surfaces into evidence for pages that have not migrated.

For migration implementation:

- targeted Node tests for any runtime helpers;
- static tests to prevent bare `./index.html` Home regressions in standalone apps;
- `git diff --check`;
- `node scripts/validate-content.mjs --check --strict`;
- `node scripts/build-scene-graph.mjs --check --strict`;
- browser screenshot checks for at least desktop and mobile on each migrated surface class.

For audit-only edits to this priority folder:

- `git diff --check`;
- `node scripts/validate-content.mjs --check --strict`;
- `node scripts/build-scene-graph.mjs --check --strict`.

## Accepted Decisions

1. The full-standard shared icon shell is circular and `32px` square across main-scene and standalone bars.
2. The full-standard Search action means global scene search. Specialized searches remain local and explicitly named.
3. Reading-surface actions remain explicit in the reading panel rather than being merged into one global document menu.
4. Back and Forward preserve real browser or declared lesson history. Home uses ordinary history-preserving navigation to the root scene in the main webapp and the Applications scene in standalone apps.
5. The exception classes above reduce shared chrome but never waive accessible names, keyboard access, visible focus, or usable control targets.
