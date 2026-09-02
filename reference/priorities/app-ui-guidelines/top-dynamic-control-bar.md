# Top Dynamic Control Bar

## Purpose

This note defines a candidate standard for the top dynamic control bar and records the current migration audit across the main webapp, standalone apps, markdown displays, and page-like utilities.

The standard is intentionally implementation-facing. Canonical user-facing UI preferences remain in [../../../content/markdown/aaa/archie/ui-guidelines.md](../../../content/markdown/aaa/archie/ui-guidelines.md), while this file tracks what needs to move in code.

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
- On mobile, wrap or collapse secondary groups before shrinking icon hit targets below the standard size.

### Visual Standard

- Use icon buttons for shared controls.
- Use a single shell style per surface: dark translucent fill, thin border, currentColor SVG icon, visible focus state, and no text label inside the button.
- Use `Helvetica Neue`, then `Arial, sans-serif`, for labels, popovers, and page headers.
- Keep buttons visually compact and stable: target `32px`-`36px` square buttons, `6px`-`8px` radius for standalone app bars, and the existing circular main-scene shell until the main scene HUD is migrated intentionally.
- Use `aria-label`, `title` where helpful, `aria-expanded` for popovers, and `aria-pressed` for stateful toggles.
- Do not use emoji or text glyphs for shared icons.

### Action Order

Use this order when the controls exist:

1. `Home`
2. `Back`
3. `Forward`
4. `Search`
5. `Notes` or `Documents`
6. `Layout`
7. `Print` or `PDF`
8. `Settings`
9. `Edit` or app-specific mode entry
10. `Close`, only when the bar is inside a panel header

The bar is dynamic, so not every surface shows every action. The visible order should remain stable among the actions that are present.

### Home

- Main webapp: `Home` returns to the root scene.
- Standalone apps: `Home` returns to the Applications scene through `index.html#scene=content%2Fscenes%2Farchie%2Fapplications.json`.
- Home navigation must use browser-history-preserving navigation. Do not replace the current history entry for ordinary user navigation.
- Shared standalone app home helpers should remain centralized in [../../../src/apps/navigator/StandaloneAppHomeRuntime.js](../../../src/apps/navigator/StandaloneAppHomeRuntime.js).

### Search

- Main webapp: `Search` opens scene search.
- Standalone apps: `Search` opens the app's local search when the app has searchable local content.
- If an app has no useful local search, omit Search rather than showing a dead control.
- Search popovers should clear the query and focus the input on open, close on `Escape`, and close on outside interaction when safe.

### Documents And Markdown Displays

- Document-entry controls can appear in the top bar when they open app-wide notes or guides.
- Reading-surface controls should prefer a panel header when a markdown panel is open: `Layout`, `Print` / `PDF`, and `Close`.
- The main webapp currently keeps markdown controls in global chrome; this should be reviewed against Photon and Ideal Braid, where markdown overlays already have local panel headers.

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
| [index.html](../../../index.html) | Main scene HUD with TOC, full document, PDF, layout, Back, Forward, Home, and Search in top-right chrome. | Partial | Strongest base for shared scene navigation, but markdown controls are global rather than reading-surface-local. |
| [animator.html](../../../animator.html) | Forked scene HUD with Back, Forward, Home, scene notes, Search, markdown document, layout, and Archie ring controls. | Partial | Needs unification with `index.html`; current ordering and available markdown controls diverge. |
| Equation Mapping | Runtime-built top-right Home, Search, Edit, Settings icon group. | Near | Good pilot for standalone app bar; should use shared icon/button primitives once they exist. |
| [molecule.html](../../../molecule.html) | Top title block with one Applications/Home icon button. | Partial | Add standard bar wrapper; Search and Settings can remain omitted until local features exist. |
| [photon.html](../../../photon.html) | Home inside inspector header; document buttons in inspector row; markdown overlay has Layout, Print, Close header. | Partial | Move Home and future Search/Settings toward shared top bar; preserve markdown panel header pattern. |
| [ideal-braid.html](../../../ideal-braid.html) | Home inside upper-right control panel; document buttons in control stack; markdown overlay has Layout, Print, Close header. | Partial | Move Home to shared top bar or make the upper-right panel header use the standard bar contract. |
| [causal-delay-feedback.html](../../../causal-delay-feedback.html) | Floating replay toolbar with title, wake switches, play/pause/reset, scrubber, settings, and legend. No Home or Search. | Non-conforming | Add Home to shared bar; keep replay controls in the replay toolbar; Search can remain omitted. |
| [assembly-explorer.html](../../../assembly-explorer.html) | Runtime-built page header with title and text `Home` button. | Non-conforming | Replace text Home with standard icon bar. Add Search only if branch/package search is useful. |
| [pdgedit.html](../../../pdgedit.html) | Top band with document picker/search/filter and Home button. | Partial | Keep document picker local, but make Home and any app-level settings/search use standard icon styling. |
| [borg.html](../../../borg.html) | Side rails, viewport controls, and timeline controls; no Home or Search. | Non-conforming | Add shared Home; keep viewport/timeline controls local. Search likely omitted until datasets are searchable. |
| [website-stats.html](../../../website-stats.html) | Sticky page header with text links and opt-out control. | Lightweight header | Replace the text Home/Archie links with a compact shared Home/project action; keep analytics opt-out as a page-local control. |
| [solver-gpu-harness.html](../../../solver-gpu-harness.html) | Utility page header with status pill and benchmark controls. | Lightweight header | Provide compact Home navigation when the harness is reachable from app navigation; keep benchmark controls local and omit scene Search, Documents, and Settings. |
| [pdgedit-review.html](../../../pdgedit-review.html) | Static review page header and form controls. | Exempt — static review | Keep the review header and controls without product chrome unless an explicit productization decision promotes the page. |
| Generated reading-copy HTML | Content-only generated HTML files under `apps/ios/.../GeneratedTextbookPackage/reading-copies/`. | Exempt — generated content | Do not manually add chrome to generated content-only files. The owning reader shell supplies navigation. |
| iOS reader shells | `ReaderShell.html` and `SearchSnippetShell.html` mount native reader content. | Native-shell parity | Native SwiftUI owns navigation and top controls; the web content mounts stay minimal. |
| Children's-book review pages | On-demand local review pages under `.local-data/childrens-books/exports/<book>/review/`; see the [pilot export procedure](../../learning-office/childrens-books/production/README.md). | Exempt — local review | Keep the local review header and links without public product chrome unless an explicit productization decision promotes a page. |

## Page Exception Policy

All public interactive app and workbench surfaces not named below target the full dynamic-control-bar standard. An exception changes the amount or owner of shared chrome; it does not waive accessible names, keyboard access, visible focus, or usable touch targets for controls that remain.

| Surface class | Disposition | Required control ownership | Current named surfaces | Promotion trigger |
| --- | --- | --- | --- | --- |
| Public utility | Lightweight header | Show the page title and a compact Home/project action. Keep utility-specific controls local; omit Search, Documents, and Settings unless the utility actually implements them. | [website-stats.html](../../../website-stats.html) | Adopt the full standard only if the utility becomes an interactive app or workbench with app-level navigation, search, documents, or settings. |
| Developer harness | Lightweight header | Show the harness title/status and compact Home navigation when reachable from app navigation. Keep benchmark and diagnostic controls local. | [solver-gpu-harness.html](../../../solver-gpu-harness.html) | Adopt the full standard only after an explicit decision to make the harness a public app surface with shared app-level actions. |
| Static review artifact | Exempt | The review page owns only its review title, metadata, and review controls. | [pdgedit-review.html](../../../pdgedit-review.html) | Reclassify before public product navigation or app-level behavior is added. |
| Generated reading content | Exempt | The generator emits content only; its owning reader shell supplies navigation. Never patch generated copies to add shared chrome. | `apps/ios/ArchitrinoReader/GeneratedTextbookPackage/reading-copies/*.html` | Change the canonical generator or owning shell only when the reader contract changes. |
| Native content mount | Native-shell parity | Native SwiftUI owns navigation and top controls; embedded HTML stays a minimal content mount. | `ReaderShell.html`, `SearchSnippetShell.html` | Reclassify only if a shell becomes a standalone web destination rather than an embedded native surface. |
| Local review output | Exempt | The local review exporter owns simple review navigation and controls. | `.local-data/childrens-books/exports/<book>/review/index.html` | Reclassify before any review output is promoted to a public-facing product surface. |

## Markdown Display Audit

| Surface | Current controls | Migration note |
| --- | --- | --- |
| Main webapp markdown panel | Panel has content only; `Full document`, `PDF`, and `Layout` live in global top chrome; close behavior is wired through `#markdown-close` but no visible close button appears in the shipped panel. | Decide whether to add a visible reading-surface header matching Photon and Ideal Braid. |
| Photon markdown panel | Panel-local `Layout`, `Print`, and `Close` icon buttons. | Good reference for reading-surface-local markdown actions. |
| Ideal Braid markdown panel | Panel-local `Layout`, `Print`, and `Close` icon buttons. | Good reference for reading-surface-local markdown actions. |
| iOS ReaderShell | Native-shell content mount with no web top controls. | Treat as native reader parity, not webapp chrome. |
| Generated reading-copy HTML | Content-only HTML. | Exempt generated output. |

## Migration Plan

### Phase 1: Accept The Standard

- Confirm the action order.
- Confirm whether standalone app buttons should settle on `32px`, `36px`, or a responsive range.
- Confirm whether main-webapp markdown controls move into a reading-surface header.
- Confirm page exception classes: generated, native-shell, static review, developer harness, and public utility.

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

1. Equation Mapping: keep current control set, replace local icon/button rendering with shared primitives.
2. Assembly Explorer: replace text Home with shared Home icon and add the standard bar wrapper.
3. Molecule: wrap the existing Applications button in the shared bar contract.
4. Main webapp plus Animator: deduplicate the scene HUD and align button order.

### Phase 4: Panel-Heavy Apps

1. Photon: standardize Home and app-level controls while preserving document buttons and markdown panel actions.
2. Ideal Braid: separate global Home/Search/Settings from local simulation controls.
3. PDG Edit: standardize Home and possibly top-right app settings; keep document picker/filter local.
4. Borg: add Home; leave viewport and timeline controls local.
5. Causal Delay Feedback: add Home and keep replay toolbar focused on replay controls.

### Phase 5: Page Policy

- Website Stats: use the lightweight public-utility header with a compact Home/project action and page-local analytics controls.
- Solver GPU Harness: use the lightweight developer-harness header when reachable from app navigation; keep benchmark controls local.
- PDG Edit Review and children's-book review pages: remain exempt review artifacts unless explicitly productized.
- Generated reading-copy HTML: remains exempt; never manually patch generated chrome.
- iOS reader shells: follow native-shell parity, with SwiftUI owning navigation and embedded HTML remaining content-only.

## Validation Expectations

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

## Open Decisions

1. Should the main scene HUD move from circular `32px` buttons to the standalone app `36px` rounded-square shell, or should shared primitives support both shells?
2. Should `Search` always mean scene search, or should standalone apps use local search under the same icon when scene search is unavailable?
3. Should `Notes` and document-guide buttons appear as one document menu in the top bar, or stay as explicit document buttons inside app panels?
