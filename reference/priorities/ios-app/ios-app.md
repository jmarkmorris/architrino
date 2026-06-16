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

The first priority is a calm, offline-capable textbook reader with a table of contents, internal links, search, reading position, bookmarks, and reliable math rendering.

## Decisions

Decision 1 (locked): `Xcode` scaffold for v1 lives at `apps/ios/ArchitrinoReader/ArchitrinoReader.xcodeproj` with bundle identifier `com.architrino.reader`.

1. The first iOS prototype belongs in this repo.
2. The first textbook content package ships inside the app bundle only. Downloadable content updates can come later.
3. The first post-v1 visualization candidate is Molecule Visualization, reusing the existing [Molecule scene](../../../content/scenes/archie/molecule.json) and [Molecule runtime](../../../src/apps/molecule/MoleculeRuntime.js) as the eventual starting surface.
4. The app scope is limited to reading and visualization; there is no separate memorization or review feature in the first product plan.
5. The first minimum deployment target is iOS 18.0 and iPadOS 18.0, built with the current Xcode SDK available at implementation time. This avoids older compatibility constraints while preserving room to raise the floor if a needed app, rendering, or visualization API requires it.
6. The v1 milestone intentionally ships textbook-only; visualization work is deferred to a later milestone and does not block v1 completion.
7. The v1 content package stores content as chapter-level markdown bundles plus required assets (images, CSS/JS), referenced directly by `textbook_toc.json` paths; there is no monolithic book file requirement in the app runtime.
8. The v1 Xcode project path is `apps/ios/ArchitrinoReader/ArchitrinoReader.xcodeproj` (project name `ArchitrinoReader`).
9. Default deployment policy: target the latest practical iOS/iPadOS release (currently 18.0 for v1) only if it does not add compatibility code, layout compromises, or tool friction; otherwise defer lower-floor support and keep this v1 single-target.
10. HTML app links (for example `ideal-swarm.html`) in textbook markdown should route to `https://architrino.com/<slug>` in-app via explicit browser handoff rather than failing with missing local assets.
11. v1 rendering path is locked: native SwiftUI shell + local HTML shell (`WKWebView`) + runtime markdown→HTML conversion in-app. No pre-rendered per-chapter HTML artifacts for v1.
12. TOC entries that point to web-app scene nodes (for example `diagram`, `markdown-tree`, `markdown-split`) do not open chapter content in-app. They display a local banner notice and require an explicit Safari handoff action.
13. Glossary access is provided through an explicit reader action and opens through browser handoff using the existing comparative glossary destination.
14. Reader-facing UI text and notices avoid equation-style symbols; keep labels and helper copy as plain words.

## Design Thesis

The app should feel parsimonious: one clear reading path, one clear place to search, one clear way to jump through the textbook, and small supporting tools that explain rather than distract.

The first implementation should use a native iOS shell around a generated textbook content package bundled with the app:

- SwiftUI owns navigation, app state, tabs, reader chrome, bookmarks, reading position, search UI, settings, and iPad split view.
- The textbook body should initially render through local WebKit pages generated from the existing markdown pipeline, because that keeps TeX, KaTeX, links, tables, and existing web content behavior close to the current source of record.
- PDF remains a useful export and sharing format, but it should not be the only reading surface unless the native package path proves too expensive.

This keeps the first version practical: native app experience outside the page, web-quality math and markdown inside the page, and no second hand-authored textbook source.

## Current Source Inputs

The app should consume generated artifacts rather than infer reading order from directories:

| Source | Role |
| --- | --- |
| [textbook_toc.json](../../../content/graph/textbook_toc.json) | Canonical textbook reading order, scene titles, markdown paths, and section anchors. |
| [toc.md](../../../content/generated/markdown/textbook/toc.md) | Human-readable generated table of contents. |
| [architrino-textbook.md](../../../content/generated/markdown/textbook/reading-copies/architrino-textbook.md) | Full text export target (not required for v1 app runtime loading). |
| [foundations.md](../../../content/generated/markdown/textbook/reading-copies/foundations.md) and sibling chapter reading copies | Chapter-level reading-copy markdown bundles used by the app runtime, referenced from TOC. |

The app package should be generated after the existing scene graph and textbook reading-copy checks pass, then copied into the app bundle for the first prototype. The iOS app should not become a new canonical source for textbook prose.

## First Prototype Target

Build the smallest useful iOS prototype as an in-repo, offline reader:

1. `in_repo_xcode_project` - Create the SwiftUI iOS project inside this repo, with iOS 18.0 and iPadOS 18.0 as the first minimum deployment target. Status: `active`. Depends on: none.
2. `textbook_package_export` - Add or define an export step that packages `textbook_toc.json`, chapter reading-copy markdown, local assets, link metadata, and a lightweight search index for app-bundle inclusion. Status: `active`. Depends on: `in_repo_xcode_project`.
3. `native_reader_shell` - Create a SwiftUI app shell with a Textbook tab, iPhone navigation stack, iPad sidebar, persistent reading position, and local bundle content loading. Status: `active`. Depends on: `textbook_package_export`.
4. `toc_and_internal_links` - Render the generated textbook TOC as navigable app state and route scene links plus markdown section links inside the app. Status: `active`. Depends on: `native_reader_shell`.
5. `math_and_markdown_rendering` - Prove that TeX, KaTeX, headings, tables, callouts, and internal anchors render correctly on iPhone and iPad. Status: `active`. Depends on: `native_reader_shell`.
6. `reader_basics` - Add search, bookmarks, reading position, text size controls, light/dark mode, and next/previous section navigation. Status: `next`. Depends on: `math_and_markdown_rendering`.
7. `molecule_visualization` - Defer to a later milestone. Status: `deferred`. Depends on: `reader_basics`.

## Implementation Tickets

Treat these as backlog tickets in execution order. Keep each ticket one engineer-week or less where feasible:

### Phase 0: Foundation

1. `ios_project_scaffold` - Create the SwiftUI project in-repo with iOS 18.0 / iPadOS 18.0 deployment targets, a lightweight tab shell (Textbook / Settings), and basic routing. Status: `active` (project file and generic iOS build validation complete; simulator runtime check pending).
   - Scaffolded folder and Swift sources now exist at `apps/ios/ArchitrinoReader/`.
   - Xcode project file now exists at `apps/ios/ArchitrinoReader/ArchitrinoReader.xcodeproj`.
   - Generic no-signing iOS build passes with Xcode 26.5 using the `ArchitrinoReader` scheme.
2. `content_bundle_schema_v1` - Define and document a deterministic `textbook_bundle.json` manifest schema for the app package (content hashes, generated-on, version id, TOC checksum, file map). Status: `active`.
   - Schema: `apps/ios/ArchitrinoReader/textbook_bundle_schema_v1.json`.
3. `content_export_script` - Add an export script that copies `content/graph/textbook_toc.json`, generated reading-copy markdown, and related assets into `ios-app` bundle-ready structure. Status: `active`.
   - Script: `scripts/export-ios-textbook-package.mjs`.
   - Run with `node scripts/export-ios-textbook-package.mjs --write` and validate with `--check`.
   - Search index generation now excludes non-deterministic fields from content hashing and reports repeated heading titles as non-fatal diagnostics after assigning deterministic suffix anchors.
   - The generated app package is excluded from the repo-wide markdown audit; `export-ios-textbook-package.mjs` owns its link and manifest validation.
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

### Phase 3: Visualization (Post-v1)

14. `molecule_entry_points` - Add deep links from canonical textbook sections into Molecule routes. Status: `deferred`.
15. `molecule_embed_or_bridge` - Choose and implement one of two concrete paths for version 0:
    1. embed existing Molecule web runtime in a SwiftUI/WebKit container using canonical scene JSON and runtime bundle;
    2. implement native SwiftUI/SceneKit equivalent for Molecule interaction if the embedding path blocks launch quality.
    Status: `deferred`.
16. `molecule_tab_integration` - Add Visualizations tab item with list-detail flow and only minimal controls needed for the concept. Status: `deferred`.

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
- Search covers titles, headings, body text, and glossary-like entries.
- A Glossary action opens the comparative glossary entry point in-browser while remaining off-main-content from the v1 reader surface.
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

- Primary tabs: Textbook and Settings.
- Textbook is the first tab and the default launch surface.
- Visualizations are deferred from v1.
- Settings stays small: content version, appearance, offline package state, and diagnostic/export controls.
- iPad uses a sidebar and reading pane; iPhone uses a navigation stack with TOC, search, and bookmarks as sheets or pushed views.
- Reader controls stay quiet: TOC, search, bookmark, text size, previous, and next.

### Visualizations

- Visualizations are optional in post-v1 and should explain one concept or one app-derived model.
- Reuse existing web app behavior first when that is cheaper and more faithful than a native rewrite.
- First visualization candidate when resumed: Molecule Visualization.
- Later visualization candidates:
  - Photon candidate planar pair and Virtual Observer diagnostic.
  - Ideal Swarm layered trails and causal path-history intuition.
  - Causal-root delay diagram for source time, observer time, distance, and branch weight.
  - Noether swarm layer comparison with Inner, Middle, and Outer roles.
- A visualization should have a clear textbook entry point: a chapter or section link that can open the relevant visual context.

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

Visualizations are out of v1 scope; the list-detail pattern is a post-v1 integration shape.

## Design Boundaries

- Do not create a new textbook source inside the iOS app.
- Do not infer textbook order from folders or filenames.
- Do not make a marketing landing page the first app screen.
- Do not make Visualizations block the first Textbook reader prototype.
- Do not build broad editing, proof-checking, simulation-authoring, or visualization tools into the first iOS app.

## Remaining Design Choices

1. Confirm any future compatibility deltas after the v1 baseline stabilizes.

## First Done Criteria

The first prototype is useful when:

- a reader can open the app offline and read the textbook from the generated TOC;
- internal links jump to the correct chapter or section;
- search finds real textbook content;
- math renders correctly in representative sections;
- reading position and bookmarks persist across app restarts;
- the app can identify the content package version it is using;
- visualizations remain out of v1 scope;
- and the implementation path does not create a second source of truth for textbook content.

## Deferred by Explicit Choice

- `molecule_visualization`: defer until textbook-only v1 ships.
- `molecule_entry_points`: defer until the first post-v1 planning pass.
- `molecule_embed_or_bridge`: defer until visualization re-entry.
- `molecule_tab_integration`: defer until the first post-v1 planning pass.
