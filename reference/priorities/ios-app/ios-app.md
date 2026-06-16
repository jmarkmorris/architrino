# iOS App

## Workstream Metadata

- Kind: `priority-app`
- Rank: `proposed`
- Value: `high`
- Cost: `unscored`
- ROI: `unscored`
- Status: `active`

## Purpose

This workstream owns a future iOS app for reading and inspecting the Architrino textbook on iPhone and iPad.

The first priority is a calm, offline-capable textbook reader with a table of contents, internal links, search, reading position, bookmarks, and reliable math rendering. The first secondary surface is Molecule Visualization, kept subordinate to the reader rather than becoming a broad app platform.

## Decisions

1. The first iOS prototype belongs in this repo.
2. The first textbook content package ships inside the app bundle only. Downloadable content updates can come later.
3. The first visualization candidate is Molecule Visualization, reusing the existing [Molecule scene](../../../content/scenes/archie/molecule.json) and [Molecule runtime](../../../src/apps/molecule/MoleculeRuntime.js) as the starting surface.
4. The app scope is limited to reading and visualization; there is no separate memorization or review feature in the first product plan.
5. The first minimum deployment target is iOS 18.0 and iPadOS 18.0, built with the current Xcode SDK available at implementation time. This avoids older compatibility constraints while preserving room to raise the floor if a needed app, rendering, or visualization API requires it.

## Design Thesis

The app should feel parsimonious: one clear reading path, one clear place to search, one clear way to jump through the textbook, and small supporting tools that explain rather than distract.

The first implementation should use a native iOS shell around a generated textbook content package bundled with the app:

- SwiftUI owns navigation, app state, tabs, reader chrome, bookmarks, reading position, search UI, settings, and iPad split view.
- The textbook body can initially render through local WebKit pages generated from the existing markdown pipeline, because that keeps TeX, KaTeX, links, tables, and existing web content behavior closer to the current source of record.
- PDF remains a useful export and sharing format, but it should not be the only reading surface unless the native package path proves too expensive.

This keeps the first version practical: native app experience outside the page, web-quality math and markdown inside the page, and no second hand-authored textbook source.

## Current Source Inputs

The app should consume generated artifacts rather than infer reading order from directories:

| Source | Role |
| --- | --- |
| [textbook_toc.json](../../../content/graph/textbook_toc.json) | Canonical textbook reading order, scene titles, markdown paths, and section anchors. |
| [toc.md](../../../content/generated/markdown/textbook/toc.md) | Human-readable generated table of contents. |
| [architrino-textbook.md](../../../content/generated/markdown/textbook/reading-copies/architrino-textbook.md) | Full reading-copy markdown for export, full-text indexing, and possible PDF generation. |
| [foundations.md](../../../content/generated/markdown/textbook/reading-copies/foundations.md) and sibling chapter reading copies | Chapter-level reading-copy markdown. |

The app package should be generated after the existing scene graph and textbook reading-copy checks pass, then copied into the app bundle for the first prototype. The iOS app should not become a new canonical source for textbook prose.

## First Prototype Target

Build the smallest useful iOS prototype as an in-repo, offline reader:

1. `in_repo_xcode_project` - Create the SwiftUI iOS project inside this repo, with iOS 18.0 and iPadOS 18.0 as the first minimum deployment target. Status: `active`. Depends on: none.
2. `textbook_package_export` - Add or define an export step that packages `textbook_toc.json`, chapter reading-copy markdown, local assets, link metadata, and a lightweight search index for app-bundle inclusion. Status: `active`. Depends on: `in_repo_xcode_project`.
3. `native_reader_shell` - Create a SwiftUI app shell with a Textbook tab, iPhone navigation stack, iPad sidebar, persistent reading position, and local bundle content loading. Status: `active`. Depends on: `textbook_package_export`.
4. `toc_and_internal_links` - Render the generated textbook TOC as navigable app state and route scene links plus markdown section links inside the app. Status: `active`. Depends on: `native_reader_shell`.
5. `math_and_markdown_rendering` - Prove that TeX, KaTeX, headings, tables, callouts, and internal anchors render correctly on iPhone and iPad. Status: `active`. Depends on: `native_reader_shell`.
6. `reader_basics` - Add search, bookmarks, reading position, text size controls, light/dark mode, and next/previous section navigation. Status: `next`. Depends on: `math_and_markdown_rendering`.
7. `molecule_visualization` - Embed or port the existing Molecule Visualization as the first visualization surface, with a direct route from relevant textbook sections. Status: `pending`. Depends on: `reader_basics`.

## Implementation Tickets

Treat these as backlog tickets in execution order. Keep each ticket one engineer-week or less where feasible:

### Phase 0: Foundation

1. `ios_project_scaffold` - Create the SwiftUI project in-repo with iOS 18.0 / iPadOS 18.0 deployment targets, a lightweight tab shell (Textbook / Visualizations / Settings), and basic routing.
2. `content_bundle_schema_v1` - Define and document a deterministic `textbook_bundle.json` manifest schema for the app package (content hashes, generated-on, version id, TOC checksum, file map).
3. `content_export_script` - Add an export script that copies `content/graph/textbook_toc.json`, generated reading-copy markdown, and related assets into `ios-app` bundle-ready structure.
4. `bundle_validation_smoke` - Add a local check that ensures manifest consistency and detects missing markdown links, duplicate anchors, and absent assets before build integration.

### Phase 1: Reader Core

5. `local_asset_loader` - Implement startup bootstrap for app-bundle textbook loading and package fingerprint display.
6. `toc_renderer_state` - Render TOC from `textbook_toc.json` into persistent app state with chapter/section navigation.
7. `reader_router` - Implement internal anchor/link routing for markdown section links and scene links (no external browser handoff unless explicitly requested by link type).
8. `reader_position_bookmarks` - Persist reading position and bookmark entries by canonical path + anchor key.
9. `basic_controls` - Add text-size control, theme control (light/dark), previous/next navigation, and search invocation.

### Phase 2: Reader Quality

10. `math_and_anchor_rendering` - Verify representative math-heavy, equation-heavy, and table-heavy sections render in local WebKit and keep TeX delimiters stable.
11. `full_text_indexing` - Add index generation from reading-copy markdown for title/section/body search and structured result snippets.
12. `search_and_bookmarks_ux` - Build dedicated search and bookmarks screens/panes with deterministic navigation into active sections.
13. `iPad_reading_layout` - Implement split-view reading workspace with sidebar content and reading pane.

### Phase 3: Molecule Visualization

14. `molecule_entry_points` - Add deep links from canonical textbook sections into Molecule routes.
15. `molecule_embed_or_bridge` - Choose and implement one of two concrete paths for version 0:
    1. embed existing Molecule web runtime in a SwiftUI/WebKit container using canonical scene JSON and runtime bundle;
    2. implement native SwiftUI/SceneKit equivalent for Molecule interaction if the embedding path blocks launch quality.
16. `molecule_tab_integration` - Add Visualizations tab item with list-detail flow and only minimal controls needed for the concept.

### Post-Prototype

17. `download_update_path` - Add a non-blocking background plan for remote updates after app-bundle contract stabilizes.
18. `sync_and_export` - Add optional cross-device sync and optional sharing links once core package and reader parity are stable.

## Required Capabilities

### Textbook Reader

- The Textbook tab opens directly to the last reading position or the top-level TOC on first launch.
- The TOC follows the generated textbook order from `content/graph/textbook_toc.json`.
- Chapter entries, scene entries, and section entries are separately navigable.
- Internal links route within the app instead of leaving the reader context.
- External links open through an explicit browser handoff.
- Reading position is preserved per chapter and per section.
- Bookmarks store title, chapter, section, source path, and anchor.
- Search covers titles, headings, body text, glossary-like entries, and equations where indexing can preserve useful text.
- Search results show the chapter, section, and a short snippet.
- The reader supports offline use from the app-bundled textbook package.
- Text size, light/dark appearance, and iOS accessibility text settings are respected.
- TeX delimiters and KaTeX-rendered math must remain stable; markdown emphasis must not corrupt subscripts, superscripts, or inequalities.

### Content Pipeline

- The app content package is generated from canonical repo artifacts and copied into the app bundle for the first prototype.
- The package includes a manifest with source hashes, generation time, schema version, textbook TOC hash, and reading-copy hashes.
- The app can report which textbook package version is installed.
- Package validation checks missing files, broken internal links, duplicate anchors, missing assets, and unsupported markdown constructs.
- App-side link routing uses stable markdown paths and section keys from the TOC, not display text alone.
- The pipeline keeps PDF export optional and reproducible rather than central to the reader.

### App Structure

- Primary tabs: Textbook, Visualizations, and Settings.
- Textbook is the first tab and the default launch surface.
- Visualizations may stay experimental in the first prototype as long as Textbook is usable.
- Settings stays small: content version, appearance, offline package state, and diagnostic/export controls.
- iPad uses a sidebar and reading pane; iPhone uses a navigation stack with TOC, search, and bookmarks as sheets or pushed views.
- Reader controls stay quiet: TOC, search, bookmark, text size, previous, and next.

### Visualizations

- Each visualization should explain one concept or one app-derived model.
- Reuse existing web app behavior first when that is cheaper and more faithful than a native rewrite.
- First visualization candidate: Molecule Visualization.
- Later visualization candidates:
  - Photon candidate planar pair and Virtual Observer diagnostic.
  - Ideal Swarm layered trails and causal path-history intuition.
  - Causal-root delay diagram for source time, observer time, distance, and branch weight.
  - Noether swarm layer comparison with Inner, Middle, and Outer roles.
- A visualization must have a clear textbook entry point: a chapter or section link that can open the relevant visual context.
- Visualizations should avoid becoming editable research tools in the first iOS version.

## Nice To Haves

- Downloadable textbook package updates independent of app releases, after the app-bundle package path is stable.
- Cross-device bookmark and reading-position sync.
- Reader annotations and private notes.
- Shareable links to app sections using stable scene or markdown paths.
- PDF generation or PDF viewing from the same content package.
- Audio read-aloud for selected sections.
- Glossary popovers for canonical terms.
- Equation index and symbol index.
- Figure index and visualization index.
- Small guided reading paths such as Foundations, Photon, Relativity Bridge, and Proof Programs.
- TestFlight distribution before App Store packaging.
- Apple Pencil annotations on iPad.
- Widget or shortcut for resuming the last section.

## Native Versus PDF Direction

| Option | Strength | Weakness | Recommendation |
| --- | --- | --- | --- |
| PDF-only reader | Fastest path to a familiar reading object; good for sharing and print-like review. | Weaker dynamic text, search, internal routing, section-level state, and interactive links; math is static. | Keep as export and fallback, not the main app. |
| SwiftUI-native markdown renderer | Strong native feel, Dynamic Type, selection, and app-state integration. | TeX, KaTeX, tables, links, and current markdown edge cases may require a large custom renderer. | Reconsider after the WebKit package proves the content contract. |
| Native shell plus local WebKit content | Best first balance of native navigation and reliable textbook rendering. | The page body is web-rendered, so styling and link bridge need careful packaging. | Use for the first prototype. |

## High-Level UI Design

### iPhone

The first screen is the Textbook reader. On first launch it shows the top-level TOC; afterward it resumes the last section.

Reader chrome:

- top bar: current chapter title, TOC button, search button;
- bottom bar: previous section, bookmark, text size, next section;
- swipe back returns to the previous section or TOC level;
- search and bookmarks open as focused sheets.

### iPad

The default layout is a two-pane reading workspace:

- left sidebar: TOC, search results, bookmarks, and package status;
- right pane: current textbook section;
- optional inspector: section outline, related visualizations, and source links.

The iPad design should not add extra conceptual surfaces just because there is more screen space.

### Visualizations

Visualizations use a list-detail pattern:

- list: visualization title, linked textbook area, and one-line purpose;
- detail: interactive canvas or embedded web app, with a small source-section link;
- controls: only the variables needed for that visualization.

## Design Boundaries

- Do not create a new textbook source inside the iOS app.
- Do not infer textbook order from folders or filenames.
- Do not make a marketing landing page the first app screen.
- Do not make Visualizations block the first Textbook reader prototype.
- Do not build broad editing, proof-checking, or simulation-authoring tools into the first iOS app.

## Remaining Design Choices

1. Choose the exact in-repo path for the Xcode project when scaffolding starts.
2. Decide whether the first Molecule Visualization pass should embed the existing local web runtime or start a native iOS visualization port.
3. Decide which textbook sections should deep-link into the first Molecule Visualization route.

## First Done Criteria

The first prototype is useful when:

- a reader can open the app offline and read the textbook from the generated TOC;
- internal links jump to the correct chapter or section;
- search finds real textbook content;
- math renders correctly in representative sections;
- reading position and bookmarks persist across app restarts;
- the app can identify the content package version it is using;
- and the implementation path does not create a second source of truth for textbook content.
