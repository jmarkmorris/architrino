# iOS App

## Workstream Metadata

- Kind: `priority-app`
- Rank: `proposed`
- Value: `high`
- Cost: `unscored`
- ROI: `unscored`
- Status: `active`

## Purpose

This workstream owns a future iOS app for reading, studying, and inspecting the Architrino textbook on iPhone and iPad.

The first priority is a calm, offline-capable textbook reader with a table of contents, internal links, search, reading position, bookmarks, and reliable math rendering. Visualizations and Flashcards are secondary surfaces that should help readers understand the theory without turning the app into a scattered feature collection.

## Design Thesis

The app should feel parsimonious: one clear reading path, one clear place to search, one clear way to jump through the textbook, and small supporting tools that explain rather than distract.

The first implementation should use a native iOS shell around a generated textbook content package:

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

The app package should be generated after the existing scene graph and textbook reading-copy checks pass. The iOS app should not become a new canonical source for textbook prose.

## First Prototype Target

Build the smallest useful iOS prototype as a local, offline reader:

1. `textbook_package_export` - Add or define an export step that packages `textbook_toc.json`, chapter reading-copy markdown, local assets, link metadata, and a lightweight search index for the app. Status: `active`. Depends on: none.
2. `native_reader_shell` - Create a SwiftUI app shell with a Textbook tab, iPhone navigation stack, iPad sidebar, persistent reading position, and local content loading. Status: `active`. Depends on: `textbook_package_export`.
3. `toc_and_internal_links` - Render the generated textbook TOC as navigable app state and route scene links plus markdown section links inside the app. Status: `active`. Depends on: `native_reader_shell`.
4. `math_and_markdown_rendering` - Prove that TeX, KaTeX, headings, tables, callouts, and internal anchors render correctly on iPhone and iPad. Status: `active`. Depends on: `native_reader_shell`.
5. `reader_basics` - Add search, bookmarks, reading position, text size controls, light/dark mode, and next/previous section navigation. Status: `next`. Depends on: `math_and_markdown_rendering`.
6. `visualization_candidates` - Choose one small visualization to embed or port first, preferably a focused existing app surface such as Photon or Ideal Swarm rather than a new broad simulator. Status: `pending`. Depends on: `reader_basics`.
7. `flashcards_candidate` - Define a minimal Flashcards surface using glossary terms, section headings, equations, and operator-approved prompt/answer cards. Status: `pending`. Depends on: `reader_basics`.

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
- The reader supports offline use after the app bundle or downloaded content package is installed.
- Text size, light/dark appearance, and iOS accessibility text settings are respected.
- TeX delimiters and KaTeX-rendered math must remain stable; markdown emphasis must not corrupt subscripts, superscripts, or inequalities.

### Content Pipeline

- The app content package is generated from canonical repo artifacts.
- The package includes a manifest with source hashes, generation time, schema version, textbook TOC hash, and reading-copy hashes.
- The app can report which textbook package version is installed.
- Package validation checks missing files, broken internal links, duplicate anchors, missing assets, and unsupported markdown constructs.
- App-side link routing uses stable markdown paths and section keys from the TOC, not display text alone.
- The pipeline keeps PDF export optional and reproducible rather than central to the reader.

### App Structure

- Primary tabs: Textbook, Visualizations, Flashcards, and Settings.
- Textbook is the first tab and the default launch surface.
- Visualizations and Flashcards are allowed to be empty or experimental in the first prototype as long as Textbook is usable.
- Settings stays small: content version, appearance, offline package state, and diagnostic/export controls.
- iPad uses a sidebar and reading pane; iPhone uses a navigation stack with TOC, search, and bookmarks as sheets or pushed views.
- Reader controls stay quiet: TOC, search, bookmark, text size, previous, and next.

### Visualizations

- Each visualization should explain one concept or one app-derived model.
- Reuse existing web app behavior first when that is cheaper and more faithful than a native rewrite.
- Candidate first visualizations:
  - Photon candidate planar pair and Virtual Observer diagnostic.
  - Ideal Swarm layered trails and causal path-history intuition.
  - Causal-root delay diagram for source time, observer time, distance, and branch weight.
  - Noether swarm layer comparison with Inner, Middle, and Outer roles.
- A visualization must have a clear textbook entry point: a chapter or section link that can open the relevant visual context.
- Visualizations should avoid becoming editable research tools in the first iOS version.

### Flashcards

- Flashcards should be a study helper, not a separate theory canon.
- First cards should come from approved glossary terms, section summaries, equations, and short operator-reviewed prompts.
- Each card stores its source path and section anchor.
- A card answer can link back to the exact textbook section.
- The first review system can be simple: new, learning, due, and done.
- Spaced repetition is a nice-to-have after the basic card loop works.

## Nice To Haves

- Downloadable textbook package updates independent of app releases.
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

### Flashcards

Flashcards use a simple review loop:

- queue: due count and source filter;
- card front: prompt;
- card back: answer, source link, and review buttons;
- source view: jump back into the textbook section.

## Design Boundaries

- Do not create a new textbook source inside the iOS app.
- Do not infer textbook order from folders or filenames.
- Do not make a marketing landing page the first app screen.
- Do not make Visualizations block the first Textbook reader prototype.
- Do not make Flashcards depend on generated claims that have not been approved in the corpus.
- Do not build broad editing, proof-checking, or simulation-authoring tools into the first iOS app.

## Open Decisions

1. Should the first prototype be a private local Xcode project in this repo, or a separate app repo with generated content copied in?
2. Should the first content package ship inside the app bundle only, or should it also support downloadable package updates from the website?
3. Which existing visualization should be the first iOS candidate: Photon, Ideal Swarm, causal-root delay diagram, or Noether swarm layer comparison?
4. Should Flashcards start manual-only, generated-from-glossary, or generated-from-section-summaries with operator review?
5. What is the minimum supported iOS and iPadOS version for the first prototype?

## First Done Criteria

The first prototype is useful when:

- a reader can open the app offline and read the textbook from the generated TOC;
- internal links jump to the correct chapter or section;
- search finds real textbook content;
- math renders correctly in representative sections;
- reading position and bookmarks persist across app restarts;
- the app can identify the content package version it is using;
- and the implementation path does not create a second source of truth for textbook content.
