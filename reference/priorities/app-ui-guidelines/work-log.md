# App UI Guidelines Work Log

This file is the chronological work log for the `app-ui-guidelines` priority area. Use it for dated agent status, proof-attempt notes, checker narratives, handoffs, failed paths, and operator/developer communication that must remain discoverable but should not crowd the live priority tracker.

Use `brainstorming.md` for provisional ideas, insights, conceptual maps, and draft app-facing guidance. Use `priorities.md` for strategy, status, blockers, and promotion routing, and use `work-queue.md` for accepted executable tasks and their local order. Keep focused standards, app specs, and requirement notes in their own sibling files when they need a stable structure.

## Log Entries

### 2026-09-02 — UI-008 repaired invisible shared-navigation glyphs

- Reproduced the operator-reported incomplete bars on Lorentz Geometry, Braid Search, and Borg Library: the canonical action shells, labels, order, and search behavior were present, but the Back, Forward, Home, and Search glyph nodes used the HTML namespace and their rendered geometry measured `0x0`.
- Corrected the canonical `TopDynamicControlBarRuntime.js` icon factory to create real SVG elements. This one change repairs every full-bar consumer without adding page-specific markup or a second navigation path.
- Added canonical border-box and `32px` minimum-height ownership. This prevents Borg Library's generic `button { min-height: 34px; }` rule from expanding shared actions beyond the accepted size.
- Added regression checks for the SVG namespace and canonical size declarations. The final focused shared-navigation and three-page suite passed `46/46`.
- Browser verification at `1440x900` and `390x844` confirmed the five accepted actions in order on all three pages, four SVG icon roots plus nonzero child geometry, viewport-bounded global Search, input focus, `Escape` focus restoration, and no document-level horizontal overflow. Borg Library's action height now measures exactly `32px` rather than `34px`.
- Added a [tracked repair receipt](evidence/ui-008-shared-navigation-icon-repair.2026-09-02.json). The older UI-005 receipts remain valid for composition, routing, and layout, but they did not instrument SVG namespace or rendered icon geometry and therefore did not establish visible glyphs.

Plainly: the three apps already called the shared navigation code, but that code drew empty-looking button shells. The shared owner now creates real SVG icons and protects the same control size on every app.

### 2026-09-02 — UI-005 batch 9 completed the Borg and Braid migrations

- Migrated Lorentz Geometry, Braid Search, Borg, and Borg Library to `StandaloneAppNavigationRuntime.js` and the canonical top dynamic control-bar stylesheet.
- Removed Lorentz Geometry and Borg's repeated static navigation markup, Braid Search's local constructor and event wiring, and Borg Library's text-only Applications link. Deleted the superseded standalone stylesheet after the final import was removed.
- Preserved Lorentz Geometry's simulation and markdown controls, Braid Search's dashboard filters and views, Borg's viewport and timeline controls, and Borg Library's collection search, filters, playback, and Workbench route.
- Added a centrally registered icon extension so Borg Diagnostics remains the permitted app-mode action after Search while the Borg-owned controller continues to own panel state and rendering.
- Added compact content clearance on Lorentz Geometry and Borg, and right-aligned Borg Library's wrapped mobile header so its global Search popover remains viewport-bounded.
- Focused shared-navigation, Lorentz Geometry, Braid Search, Borg, and Borg Library tests passed `73/73` after updating the migration contracts. Desktop/mobile browser checks confirmed canonical order, viewport-bounded Search, exact Applications routing, Escape focus restoration, no horizontal overflow, no console errors, and working Borg Diagnostics.
- Stored eight reproducible captures under ignored `.local-data/app-ui-guidelines/ui-005-batch-9/` and bound them with a [tracked evidence receipt](evidence/ui-005-batch-9-borg-braid-browser-captures.2026-09-02.json).
- UI-005 is verified. The workstream retains the accepted standard and audit but has no remaining executable queue object.

Plainly: the four owner-coordinated apps now share the same navigation implementation without surrendering their own controls, and no legacy full-bar path remains.

### 2026-09-02 — UI-005 batch 8 migrated Molecule

- Added one declarative global-navigation host and the canonical stylesheet, then mounted `StandaloneAppNavigationRuntime.js` from the Molecule runtime.
- Removed the page's copied Applications button, SVG, styles, DOM requirement, and click path. The canonical adapter now owns textbook TOC, browser Back/Forward, Applications Home, global scene Search, focus dismissal, and lifecycle cleanup.
- Preserved molecule presets, canvas interaction, atom navigation, ledger readouts, session formulas, session names, shared links, and the concurrent explicit PubChem opt-in work without changing their behavior or claim scope.
- Reserved the desktop preset-list top row for the canonical bar and moved the compact title block below the bar. This keeps app content clear without placing preset or session controls in global chrome.
- Added Molecule to the atomic migration matrix. The shared navigation, launch, control-bar, search, and browser-import suite passed `32/32`.
- Browser verification at `1440x900` and `390x844` confirmed canonical order and dimensions, ten scene-search results, `Escape` focus restoration, exact Applications routing, zero title/bar and preset/bar overlap in the closed state, a `12px` compact title clearance, 26 visible preset controls in the document, no boot error, and no horizontal overflow.
- Stored three reproducible captures under ignored `.local-data/app-ui-guidelines/ui-005-batch-8/` and bound them with a [tracked evidence receipt](evidence/ui-005-batch-8-molecule-browser-captures.2026-09-02.json).
- UI-005 remains active only for Lorentz Geometry, Braid Search, Borg, and Borg Library. Those surfaces are outside this workstream's current operator scope because their queues are active elsewhere.

Plainly: every eligible non-Borg, non-Braid standalone surface now uses the canonical global bar, and Molecule's own controls remain with the molecule.

### 2026-09-02 — UI-005 batch 7 migrated PDG Edit

- Added one declarative global-navigation host and the canonical stylesheet, then mounted `StandaloneAppNavigationRuntime.js` from the PDG Edit runtime.
- Removed the page's copied Home SVG, button, helper, and click path. The canonical adapter now owns textbook TOC, browser Back/Forward, Applications Home, global scene Search, focus dismissal, and navigation cleanup.
- Preserved the document picker, reaction search, Exact 0:0 and Probability filters, creation controls, editing gestures, and reaction diagram as local app behavior. Opening global Search closes the document picker and hides its toolbar; `Escape` restores focus and the toolbar.
- Removed the page-wide `1648px` minimum width. The `1600px` reaction strip now has a fixed internal width inside the surface's horizontal scroller, keeping the document and both chrome rows viewport-wide without shrinking the diagram.
- Added PDG Edit to the atomic migration matrix and focused regression coverage for the internal wide-surface boundary. The combined PDG Edit and shared-navigation suite passed `39/39`.
- Browser verification at `1440x900` and `390x844` confirmed canonical order and dimensions, ten scene-search results, local reaction filtering, `Escape` focus restoration, exact Applications routing, viewport-reachable local controls, no document-level horizontal overflow, a `1600px` internal surface scroll extent, and no boot error.
- Stored four reproducible captures under ignored `.local-data/app-ui-guidelines/ui-005-batch-7/` and bound them with a [tracked evidence receipt](evidence/ui-005-batch-7-pdgedit-browser-captures.2026-09-02.json).
- UI-005 remains in progress; this batch verifies chrome ownership and wide-surface containment only, not particle-data content or editing correctness.

Plainly: PDG Edit keeps its wide reaction workspace, but navigation and document selection no longer disappear beyond the viewport.

### 2026-09-02 — UI-005 batch 6 migrated Equation Mapping

- Added the declarative global-navigation host and canonical stylesheet to Equation Mapping, then mounted `StandaloneAppNavigationRuntime.js` from the page runtime.
- Removed the app's duplicate Home helper, icon, and click path. The canonical adapter now owns textbook TOC, browser Back/Forward, Applications Home, global scene Search, focus dismissal, and lifecycle cleanup.
- Preserved equation Search, promoted-map Edit, and canvas Settings as a separate local toolbar. Opening global Search hides that toolbar and closes local panels; `Escape` restores focus and the local toolbar, so the two search layers cannot stack or compete for focus.
- Made a compact viewport open with the equation index collapsed even when an older saved desktop setting says otherwise; the existing index toggle still opens it during the session.
- Added Equation Mapping to the atomic migration matrix and added focused regression coverage for global/local ownership and compact startup. The combined Equation Mapping and shared-navigation suite passed `82/82`.
- Browser verification at `1440x900` and `390x844` confirmed canonical order and dimensions, ten scene-search results, `Escape` focus restoration, local equation-search focus, exact Applications routing, zero toolbar overlap, a viewport-bounded popover, no boot error, and no horizontal overflow.
- Stored three reproducible captures under ignored `.local-data/app-ui-guidelines/ui-005-batch-6/` and bound them with a [tracked evidence receipt](evidence/ui-005-batch-6-equation-mapping-browser-captures.2026-09-02.json).
- UI-005 remains in progress; this batch verifies navigation and responsive control ownership only, not equation content or editor persistence.

Plainly: Equation Mapping now has the same global navigation as the other migrated apps, while its equation-specific tools remain local and do not compete with global Search.

### 2026-09-02 — UI-005 batch 5 migrated Greek Letter Match

- Added one declarative navigation host to `greek-letter-match.html`, loaded the canonical stylesheet, and replaced the runtime-built text-only Applications button with `StandaloneAppNavigationRuntime.js`.
- Removed the local Home listener and its dedicated button rules. The canonical adapter now owns TOC, browser Back/Forward, Applications Home, global Search, focus dismissal, and lifecycle cleanup.
- Preserved the game title, 24 fixed letter choices, mode and symbol controls, answer flow, session scoring, results chart, and pronunciation controls.
- Added the page to the atomic-migration regression matrix. Focused Greek and shared-navigation tests passed `44/44`.
- Browser verification at `1440x900` and `390x844` confirmed canonical order and dimensions, ten search results, `Escape` focus restoration, exact Applications routing, no horizontal overflow, and zero browser log entries. The mobile header gives the title its own row with `12.5px` clearance below the bar, while the stage remains `378x378` and all 24 choices remain mounted.
- Stored desktop, mobile-search, and mobile-closed captures under ignored `.local-data/app-ui-guidelines/ui-005-batch-5/` and bound them with a [tracked evidence receipt](evidence/ui-005-batch-5-greek-letter-match-browser-captures.2026-09-02.json).
- UI-005 remains in progress; this batch does not assess pronunciation correctness or learning efficacy.

Plainly: Greek Letter Match now shares global navigation with the other migrated apps, while everything that makes it a learning game stays inside the game.

### 2026-09-02 — UI-005 batch 4 closed two lightweight-header gaps

- Rechecked Brand Visual Identity against the accepted public-reference policy. Its existing `42px` identity link is explicitly labeled `Return to Branding and Marketing in Archie`, returns to the owning project scene, and coexists with local section navigation. The earlier audit instruction to add another project/Home action was stale; no redundant control was added.
- Added a compact `Applications` action beside live GPU status in the Solver GPU Harness header. The link uses the exact Applications scene target, preserves ordinary link history, and leaves benchmark controls local.
- Added a focused harness-navigation regression test. It passed with the current Branding & Marketing suite (`8/8`). The older `solver-gpu-harness-static.test.js` remains independently unable to load because it imports the absent `reference/priorities/app-solver/gpu-feasibility-harness.md`; this batch did not fabricate or restore that unrelated priority document.
- Browser verification at `1440x900` and `390x844` confirmed both `42px` actions, responsive header layout, visible local controls, exact Solver Applications routing, no horizontal overflow, and zero browser log entries.
- Stored four reproducible captures under ignored `.local-data/app-ui-guidelines/ui-005-batch-4/` and bound them with a [tracked evidence receipt](evidence/ui-005-batch-4-lightweight-headers-browser-captures.2026-09-02.json).
- UI-005 remains in progress because several full-standard standalone surfaces still require migration.

Plainly: the brand page was already doing the accepted lightweight job; the harness was not, and now it is. Neither page received unnecessary full-app chrome.

### 2026-09-02 — UI-005 batch 3 migrated Causal Delay Feedback

- Replaced the repeated static TOC, lesson Previous/Next, Home, global Search, SVG, and legacy stylesheet path with a declarative host consuming the canonical standalone adapter and stylesheet.
- Preserved the app's lesson-sequence semantics through adapter callbacks: Previous remains disabled on the first lesson, Next advances the shared learner state, and Previous returns. The mode controller still owns enabled state and lesson rendering.
- Removed duplicate Home, TOC, and scene-search wiring from the page runtime. The adapter now owns Applications Home, textbook TOC, global Search, search focus/dismissal, and the existing lesson-list displacement callback.
- Preserved lesson selection, causal charts, local replay controls, wake controls, canvas interaction, and their current evidence boundaries.
- Focused learner-mode and shared-navigation tests passed `56/56` after removing one stale assertion that expected the main-app stylesheet to duplicate the canonical standalone search-item rule.
- Browser verification at `1440x900` and `390x844` confirmed accepted dimensions and order, ten search results, viewport-bounded popovers, lesson-list displacement and restoration, exact Applications Home routing, no horizontal overflow, and zero browser log entries. It also exercised Next and Previous against the visible lesson title and disabled states.
- Stored two reproducible captures under ignored `.local-data/app-ui-guidelines/ui-005-batch-3/` and bound them with a [tracked evidence receipt](evidence/ui-005-batch-3-causal-delay-feedback-browser-captures.2026-09-02.json).
- UI-005 remains in progress; this batch verifies interface ownership and interaction only, not the scientific content or replay dataset.

Plainly: the shared toolbar now owns global navigation while the learning app still owns what Previous and Next mean inside its lesson sequence.

### 2026-09-02 — UI-005 batch 2 migrated Photon

- Replaced Photon's repeated static TOC, Back, Forward, Home, global Search, SVG, and legacy stylesheet path with one declarative host consuming `StandaloneAppNavigationRuntime.js` and the canonical stylesheet.
- Removed Photon's direct global-navigation and scene-search listeners. The adapter now owns the shared lifecycle, including re-initialization after destroy, and routes Home to the accepted Applications scene rather than the root homepage.
- Preserved Photon configuration search, presets, playback, measurement controls, diagnostics, braid and field plots, document-entry buttons, and panel-local markdown actions.
- Focused Photon and shared-navigation tests passed `35/35`; `git diff --check` passed.
- Browser verification at `1440x900` and `390x844` confirmed accepted order and `32px` control heights, ten global-search results, viewport-bounded popovers, `Escape` focus restoration, exact Applications Home routing, one canonical stylesheet, no legacy stylesheet, no horizontal overflow, and zero browser log entries.
- Stored two reproducible captures under ignored `.local-data/app-ui-guidelines/ui-005-batch-2/` and bound them with a [tracked evidence receipt](evidence/ui-005-batch-2-photon-browser-captures.2026-09-02.json).
- UI-005 remains in progress; this receipt establishes Photon only and does not grade its scientific model.

Plainly: Photon now uses the same toolbar implementation as the other migrated apps without moving or changing the controls that operate Photon itself.

### 2026-09-02 — UI-005 batch 1 migrated Lattice Lab and Wake Topography

- Added the thin `StandaloneAppNavigationRuntime.js` adapter over the canonical control-bar, Applications Home, and global scene-search owners. The adapter composes TOC, browser Back/Forward, Home, Search, capability omission, lifecycle cleanup, and accepted app-mode extensions without admitting domain controls.
- Replaced repeated static toolbar markup, SVG fragments, legacy stylesheet imports, and direct navigation/search listeners in Lattice Lab and Wake Topography. Gallery, lattice, scenario, map, and playback controls remain locally owned.
- Corrected scene-search activation across the generated bar by ensuring the scene index before explicitly opening the existing search runtime; this preserves ten populated results, input focus, `Escape` dismissal, and focus restoration.
- Added focused adapter and page-migration tests. The clean focused suite passed `75/75`; the combined Topo sweep passed `114/115`, with the one repeatable failure limited to an untouched assertion that expects a literal legacy color-token declaration while the current token file aliases it through the canonical brand variable.
- Browser verification passed on both pages at `1440x900` and `390x844`: accepted order, `32px` controls, ten global-search results, focus restoration, no horizontal overflow, one canonical stylesheet, no legacy stylesheet, and zero browser log entries. Lattice Home reached the exact Applications scene. Topo's expanded `336px` mobile panel retained visible scenario and speed controls and cleared the vertical bar by `1.44px`.
- Stored five reproducible PNGs under ignored `.local-data/app-ui-guidelines/ui-005-batch-1/` and added a [tracked evidence receipt](evidence/ui-005-batch-1-lattice-topo-browser-captures.2026-09-02.json) with hashes, dimensions, routes, measurements, interactions, and a two-page claim boundary.
- UI-005 remains in progress because other standalone pages still use partial or repeated composition paths.

Plainly: Lattice Lab and Wake Topography now use the same real toolbar implementation as the main app, while their scientific controls stayed in their own panels. This closes only the first standalone batch.

### 2026-09-02 — UI-007 desktop/mobile visual evidence captured

- Closed UI-007 with four current browser captures: main webapp and Animator at `1440x900` and `390x844`, each with Search open and its input focused.
- Visual inspection confirmed stable TOC, Back, Forward, Home, Search order; `32px` icon shells; title and app-local control clearance; mobile row wrapping; viewport-bounded popovers; and no horizontal overflow. Animator scene, solver, library, exit, timeline, and canvas controls remained visibly local.
- Stored the reproducible PNGs under ignored `.local-data/app-ui-guidelines/ui-007/` and added a [compact receipt](evidence/ui-007-top-dynamic-control-bar-browser-captures.2026-09-02.json) with SHA-256 identities, byte counts, routes, viewports, element rectangles, focus state, zero browser log entries, reproduction steps, and an explicit two-surface claim boundary.
- Added the dedicated ignore rule so current and future UI captures cannot become accidental repository payloads. Removed UI-007 from the live queue; UI-005 remains the sole ranked item.

Plainly: the migration now has reviewable pictures and measurements at desktop and phone sizes without checking image payloads into Git.

### 2026-09-02 — UI-003 canonical bar runtime live in main and Animator

- Closed UI-003 by adding the canonical `src/runtime/TopDynamicControlBarRuntime.js` and `src/runtime/top-dynamic-control-bar.css`, then replacing the static TOC, Back, Forward, Home, Search, SVG, and popover markup in both `index.html` and `animator.html` with declarative hosts.
- The runtime validates shared kinds, IDs, accessible labels, callbacks, and canonical order; builds icons and the search popover; owns disabled, hidden, pressed, and expanded presentation; keeps one popover open; restores focus on `Escape`; removes listeners on destroy; and rejects local domain actions such as playback.
- The main and Animator adapters reuse one DOM tree and listener set. Entering Animator moves that tree into the Animator header; leaving moves it back to the scene header. Animator viewport, scene, solver, clear, library, docs, Exit, timeline, and canvas controls remain locally owned.
- Removed the migrated bar's old ID-specific rules from `style.css`. Unmigrated standalone pages continue using their existing stylesheet until UI-005 migrates them atomically; migrated pages do not load two bar implementations.
- Focused runtime, search, chrome, tooltip, markdown, scene-HUD, and app-mode tests passed `33/33`. A broader Animator/scene sweep passed `176/178`; the two repeatable failures are pre-existing assertions in untouched default-draft spacing and simulation-frame bounds files, not evidence about this change.
- Browser checks at `1440x900` and `390x844` confirmed canonical action order, `32px` icon shells, disabled history state, search input focus, ten populated results, `Escape` focus restoration, no horizontal overflow, main-title clearance, Animator local-control clearance, and a mobile search panel inside the viewport. Animator Home navigated to the Applications scene without console warnings or errors.
- Final validation passed the focused suite (`33/33`), priority-rank alignment (`30` active owners and `26` aligned ranked rows), strict content validation (`0` errors, `0` warnings), strict scene-graph checking (`0` errors, `0` warnings), and `git diff --check`.
- Removed UI-003 from the live queue and promoted UI-005, the declared standalone-app migration, to local rank 1.
- Claim boundary: the canonical runtime is implemented and accepted on the main and Animator surfaces only. Structurally conforming standalone pages still use the older repeated composition path until UI-005.

Plainly: main and Animator now use one real toolbar implementation, while their app-specific tools stay where they belong.

### 2026-09-02 — UI-004 markdown controls moved into the reading surface

- Closed UI-004 by removing `Full document`, `Layout`, and `Print` / `PDF` from the main global scene toolbar and adding them, in that order, to a visible markdown-panel header followed by the previously missing `Close` action.
- Preserved the existing runtime element IDs and one listener path. The panel header exposes only actions the current markdown target can honor; full-document remains limited to section readers with a corresponding complete document.
- Consolidated the four main-reader controls under one `32px` circular action style, made the document title visible in the panel header, and excluded the header from print output. Photon and Lorentz Geometry already use the same panel-local action model and required no implementation changes.
- Focused tests passed for toolbar ownership and order, markdown panel behavior, and current-scene action state. Rendered checks at `1440x900` and `390x844` measured every visible action at `32x32`, confirmed that content begins below the `49px` header, found no horizontal overflow, exercised the layout toggle and Close action, and found no browser warnings or errors.
- Removed UI-004 from the live queue and promoted UI-003, the atomic main-webapp and Animator shared-HUD cutover, to local rank 1.
- Claim boundary: this closes markdown action ownership for the three named reader panels. It does not implement the accepted shared top-bar runtime or migrate any remaining partial standalone app.

Plainly: document operations now stay with the document, while the global toolbar stays focused on navigation and scene search.

### 2026-09-02 — UI-002 shared bar runtime design accepted

- Closed UI-002 with the accepted [runtime design v1](contracts/top-dynamic-control-bar-runtime-design-v1.md).
- Selected `src/runtime/TopDynamicControlBarRuntime.js` and `src/runtime/top-dynamic-control-bar.css` as the single future markup, icon, order, state, focus, and responsive-style owners; selected a thin `src/apps/navigator/StandaloneAppNavigationRuntime.js` adapter for Applications Home, history, TOC, global scene search, and permitted app-mode extensions.
- Preserved the focused Home and scene-search services while prohibiting a second shared markup or stylesheet owner. The existing standalone stylesheet becomes a migration source that is deleted after the last adopting page, not a permanent compatibility layer.
- Defined app-mode extension eligibility, rejected domain controls and local searches from global chrome, required one open popover with focus restoration, and required atomic per-page migration with old markup and rules removed.
- Removed UI-002 from the live queue and promoted the smaller independent UI-004 markdown-control relocation ahead of the two-surface UI-003 runtime cutover.
- Claim boundary: this is an accepted software design, not a runtime implementation or rendered conformance result.

Plainly: every future migrated bar now has one code destination and a clear rule for what apps may add. No page was changed by this design task.

### 2026-09-02 — UI-001 top dynamic control-bar standard accepted

- Closed UI-001 with an explicit accepted standard for shared control semantics, `32px` circular icon dimensions, stable action order, responsive behavior, reading-surface action ownership, and page exceptions.
- Fixed the relative full-bar order as `TOC`, Back, Forward, Home, Search, optional document actions, Settings, and app-mode entry. Global Search means scene search; app-specific equation, molecule, document, or collection searches remain local and explicitly named.
- Refreshed the audit from live root HTML and runtime ownership. Photon, Lorentz Geometry, Causal Delay Feedback, Borg, Lattice Lab, and Braid Search structurally carry the full bar; Topo and Equation Mapping are near or partial; the main webapp, Animator, Molecule, PDG Edit, Borg Library, and Greek Letter Match remain partial migrations.
- Confirmed lightweight policy conformance for Website Stats and public feedback, and recorded incomplete lightweight Home/project actions for Brand Visual Identity and Solver GPU Harness. Preserved the accepted review, generated-content, native-mount, and local-review exemptions plus the retired Assembly Explorer redirect.
- Promoted UI-002 to local rank 1. The live shared navigation stylesheet is a reusable base, but repeated page markup, SVGs, action metadata, and runtime wiring still need one explicit implementation path and extension contract.
- Claim boundary: this closes the standard and structural code audit only. It does not assert rendered desktop/mobile conformance, migrate a partial surface, or complete the shared runtime.

Plainly: the rulebook is settled and the current exceptions are named. The next task is to remove repeated implementations while preserving the controls each app legitimately owns.

### 2026-09-01 — Page exception policy accepted

- Closed UI-006 by assigning one disposition to every current non-full-standard surface class in [top-dynamic-control-bar.md](contracts/top-dynamic-control-bar.md).
- Classified `website-stats.html` as a lightweight public-utility header and `solver-gpu-harness.html` as a lightweight developer-harness header. Both retain compact Home navigation while utility, benchmark, and diagnostic controls remain local.
- Classified `pdgedit-review.html` and children's-book review outputs as exempt review artifacts, generated textbook reading copies as exempt generated content, and the iOS `ReaderShell.html` and `SearchSnippetShell.html` mounts as native-shell parity surfaces owned by SwiftUI navigation.
- Recorded explicit promotion triggers so an exception cannot silently become public product chrome. All other public interactive apps and workbenches in the current surface audit remain full-standard migration targets.
- Claim boundary: this closes the page-classification policy only. It does not implement lightweight headers, migrate a full-standard surface, or establish that any currently partial surface already conforms.
- Validation passed: priority-rank alignment, `git diff --check`, strict content validation, and strict scene-graph checking all completed without errors or warnings.

### 2026-07-21 - Canonical transport controls

- Accepted `Play`, `Pause`, `First frame`, `Rewind`, `Reset`, and `Stop` as the canonical transport-control set.
- Added one shared SVG/presentation runtime and migrated Borg, Animator, Causal Delay Feedback, Lorentz Geometry, and Photon away from local paths, CSS drawings, and text glyphs.
- Preserved the distinction between transport Reset and camera, preset, or parameter resets.
- Promoted the durable visual and interaction rule into the reader-facing UI guide; retained the implementation contract and migration inventory in [transport-controls.md](contracts/transport-controls.md).
- Focused app/runtime validation passed 230 tests. Browser checks exercised Play/Pause state changes in all five migrated apps and found no console errors; Borg's new two-stroke Pause presentation was visually inspected.
- Scene-graph and textbook reading-copy checks passed. Strict content validation reached one unrelated generated-index warning for the concurrently added `content/markdown/aaa/noether-braid/braid-taxonomy.md`; this batch did not regenerate another agent's index work.
