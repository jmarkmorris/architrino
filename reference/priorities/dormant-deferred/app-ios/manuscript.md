# An Offline Textbook Reader for iPhone and iPad

## 1. A Reading Surface Around One Textbook

### 1.1 Purpose and evidence boundary

The retained design for Architrino Reader combines an offline textbook package with native navigation on iPhone and iPad. Its central purpose is continuous reading: open the textbook, find a section, follow its links, inspect its mathematics and return to the same place later. Search, bookmarks and appearance controls support that activity. They do not create a separate memorization product, editing environment, proof checker or simulation-authoring system.

The [design and implementation record](priorities.md) is the source for this account. It describes a reported prototype and a set of requirements, rather than supplying fresh evidence about the present application, generated package or physical devices. The architecture below preserves those design choices; implementation and release claims are bounded separately in Chapter 7. No physical theory result follows from displaying the textbook or its visualizations.

The reader uses the same canonical textbook source as the other reading surfaces. The app does not become a second place to author scientific prose. Its generated package is a development snapshot with an identifiable version, so an installed reader can remain useful even when that snapshot predates the current corpus. Package regeneration is an on-demand development operation, rather than an obligation attached to every unrelated content change.

### 1.2 Native structure and local page content

The chosen first rendering path assigns navigation and application state to SwiftUI and the textbook body to generated local HTML in WKWebView. SwiftUI owns the tabs, reading controls, search and bookmark interfaces, saved position, settings and the iPad split view. Local WebKit pages preserve the existing Markdown and TeX rendering path, including KaTeX, tables, links and section anchors. Chapter Markdown remains package source or fallback material alongside the generated HTML reading copies.

This division concentrates application behavior around a stable reading surface. It still requires careful styling, asset packaging and a link bridge between page content and native navigation. The choice is the source's design judgment about the first prototype, not a measured claim that WebKit is universally cheaper or better than other renderers.

The source compares two alternatives. A PDF-only reader offers familiar print-like presentation and sharing, but makes dynamic text, internal routing, section-level state and interactive links less direct. A fully native Markdown renderer offers close integration with selection, accessibility and native state, while taking on the existing TeX, table and link edge cases as custom rendering work. PDF therefore remains an optional reproducible export or fallback. A more fully native renderer can be reconsidered after the package contract is established; neither alternative is needed to invent a second textbook source.

## 2. The Offline Package and Its Provenance

### 2.1 Reading order and chapter units

The package takes its reading order, scene titles, Markdown paths and section anchors from the generated textbook table of contents. In the source this artifact is named `textbook_toc.json`. Directory layout, filenames and display labels are not substitutes for that order. Chapter, scene and section entries remain separately navigable even when they share a containing reading copy.

The initial package is chapter-oriented. It contains the chapter reading copies and the images, styles and scripts needed to present them locally. The generated human-readable table of contents and full-text export remain useful companion artifacts, but the app runtime does not require one monolithic book file. This permits chapter loading while retaining canonical paths and anchors as the identity of a destination.

The first package ships inside the app bundle. Offline reading therefore does not depend on downloading content after installation. A later remote-update mechanism would be a distinct content-delivery feature with its own integrity and failure behavior; its possibility does not weaken the initial bundle contract.

### 2.2 Manifest, identity and validation

The source describes a deterministic package manifest containing content and source hashes, a generation date, package version, schema version, table-of-contents checksum and file map. Reading-copy hashes connect packaged pages to the content used to generate them. The reader exposes package identity so a report can identify the snapshot actually installed, rather than assuming that every device has the latest text.

Deterministic content identity and generation metadata have different roles. The implementation record specifically reports that search-index hashing excludes nondeterministic fields. That statement does not establish that every manifest field is invariant between builds. Generation date records when a snapshot was produced; content hashes identify the relevant generated or source bytes under the declared hashing rules.

Repeated heading titles also need an identity rule. The source reports deterministic suffix anchors and nonfatal diagnostics for repeated titles. That is distinct from accepting a duplicated final anchor or broken destination. Package validation is required to detect missing files, invalid internal links, duplicate anchors, missing assets and unsupported Markdown constructs before the package is used for a requested build.

The package has a focused exporter and validator owner. Its saved output is excluded from the general generated-Markdown audit, and its links and manifest are checked through that package owner. This separates a retained development snapshot from current authored text; it does not exempt a newly requested package or release archive from strict validation. No exporter or package check was executed for this account.

## 3. Destinations, Links and Reference Material

### 3.1 Stable destinations and explicit handoff

Reading position and bookmarks use canonical path-and-anchor keys. A bookmark also retains human-readable title, chapter and section information, but navigation does not depend on display text alone. Internal links resolve to the corresponding chapter or section within the reader. Search results identify chapter, section and a short snippet so the reader can inspect a destination before opening it.

Some textbook links refer to interactive web applications rather than bundled chapters. The design gives those links an explicit browser handoff to the corresponding site route instead of allowing a missing local asset to fail silently. Likewise, a table-of-contents node for a web-app scene shows a local notice and requires an explicit Safari action; it is not presented as a local chapter. These routing rules preserve the distinction between an offline page and an online interactive surface.

An external link also requires an explicit browser handoff. The source's plain-word interface requirement applies to these notices and controls: mathematical notation belongs in the textbook body, while destination labels and helper text should communicate the action directly.

### 3.2 The unresolved glossary destination

The source contains two glossary descriptions. Its numbered decision specifies an explicit reader action opening a bundled in-app reference document when that document is included in the package. Its required-capabilities section says that the comparative glossary opens in-browser, apart from the main reading surface.

Both descriptions establish a separate, deliberate reference action, but they do not settle its destination semantics. “In-browser” could require an external handoff or could describe a separate embedded reading surface; the local records do not define that distinction sufficiently to reconcile it with the bundled in-app decision. The implementation was not inspected here. This account therefore preserves both requirements without selecting a route or claiming that either describes the running application. A later scoped routing decision must determine the intended destination and its offline behavior.

## 4. Reading State and Device Parity

### 4.1 Common reader behavior

The Textbook tab is the launch surface. First launch opens the top-level table of contents; subsequent launches resume the saved position. The design retains chapter and section position, bookmarks across restarts, internal navigation, next and previous movement, and search over titles, headings, body text and glossary-like entries.

Text size, appearance and margins are reader controls. The requirements also include accessibility text settings and stable mathematical presentation. Markdown processing must preserve TeX delimiters and must not corrupt subscripts, superscripts or inequalities. A package that loads successfully but damages those relationships has not met the reader's content requirements.

Settings remains small: appearance, content version, offline package state and focused diagnostic or export controls. Textbook and Settings are the primary tabs. The first screen is not a marketing page, and the supporting controls do not grow into general editing or simulation tools.

### 4.2 iPhone and iPad layouts

On iPhone, a navigation stack organizes the reading path. The top bar carries the chapter title, table of contents and search. The bottom controls offer previous section, bookmark, text size and next section. Swipe-back returns through the reading or table-of-contents hierarchy. Search and bookmarks use focused sheets or corresponding full-screen surfaces where appropriate.

On iPad, the same content and functions occupy a two-pane workspace: a persistent table-of-contents sidebar and the current reading pane. Search, bookmarks, appearance, package information and About use adaptive reader controls and constrained sheets. The larger display creates space for navigation beside the page; it does not add a different set of product concepts.

iPad is an equal first-release quality target. It shares the package, navigation, search, bookmarks, appearance controls and local persistence expected on iPhone. A layout that merely launches on iPad is weaker than this parity requirement. Physical-device evidence for that requirement remains distinct from the source's reported implementation of a split-view interface.

### 4.3 Local state and feedback

The first version keeps theme, font size, bookmarks and reading position on the device, without an account system or cloud synchronization. The source's conditional privacy declaration depends on that scope and must be reconsidered if later analytics, accounts, crash reporting, network services or synchronization change the application's behavior. This is a retained product condition, not a current privacy or store-policy certification.

The source describes two feedback paths. An About action opens a prefilled GitHub issue URL and tells the reader that submitting it requires GitHub login. Credentials or backend tokens are not embedded in the app. A page-feedback action uses orange-only PencilKit handwriting over the current page, blanks the surrounding reader header and footer in the annotation view, and sends the marked screenshot with package and location context to the user-controlled share sheet.

This bounded screenshot-feedback workflow is different from a private annotation library, persistent notes or a broader Apple Pencil feature. Those remain later possibilities in the source. Describing the feedback requirement does not establish that every annotation feature is implemented, nor does it transmit a report or authorize sharing the reader's content.

## 5. The Reported Prototype and a Useful First Version

The source marks six prototype capabilities as implemented: the in-repository project, textbook export, native reader shell, table-of-contents and internal routing, mathematical Markdown presentation, and basic reading tools. Its more detailed history records thirteen closed implementation items across foundation, reader core and reader quality. These entries describe the source-time baseline; they are not fresh code inspection or current device-test results.

The foundation record includes the project scaffold, manifest schema, exporter and package-validation smoke checks. Reader-core entries cover local asset loading and fingerprint display, persistent table-of-contents state, internal and web-app routing, canonical bookmark/position storage and basic controls. Quality entries cover math and anchor rendering, full-text indexing, dedicated search/bookmark surfaces and the iPad workspace. The recorded project name is ArchitrinoReader and its bundle identifier is `com.architrino.reader`. Those identities anchor one implementation path; they do not prove that a present archive builds or runs.

The first useful-reader criteria are concrete. A reader can open the bundled textbook offline, navigate from the generated table of contents, follow internal destinations, find real content through search, read representative mathematical sections, preserve position and bookmarks after restarting, and identify the installed package. iPad must provide the same reader functions in a usable split view. Visualizations do not block this first milestone, and the content pipeline must retain one source of truth.

Those criteria are broader than a render parse and narrower than store acceptance. The source's August device report says that the reader had been tried on the operator's devices and basically worked; it explicitly treats that experience as preliminary. The reported workflow and routing test passes concern packaging policy and link behavior, not comprehensive physical-device quality. No current build, archive, package, test suite or device session was executed for this manuscript.

## 6. Deferred Evolution

### 6.1 Visual explanations after the reader

The first planned post-v1 visualization is Molecule Visualization, beginning from the existing scene and runtime rather than an independently invented duplicate. Its eventual integration requires canonical textbook entry links and a single chosen embedded-web or native implementation path, with a minimal list-detail interface. Reusing a web surface is a design option when a scoped assessment finds it cheaper and more faithful; no measured cost comparison is claimed here.

Other source candidates are a photon planar-pair and Virtual Observer diagnostic; Lorentz Geometry trails and causal-history intuition; one-pair Causal Delay Feedback with partial/full wakes and orientation-adaptive iPhone/iPad layout; a causal-root diagram connecting source time, observer time, distance and branch weight; and a Noether-braid Inner/Middle/Outer comparison. Each needs a clear textbook entry point and a bounded explanatory role. Their presence in a candidate list does not adopt a scientific result or activate implementation.

The source separately defers the Molecule visualization itself, its entry points, the embed-or-bridge choice and its tab integration. These remain future design steps rather than missing requirements for the textbook-only first version.

### 6.2 Content delivery, synchronization and optional tools

Downloadable textbook updates wait for a stable bundled-content contract. An accepted update path would need versioning, integrity checks, rollback and defined failure behavior. Optional cross-device synchronization and sharing wait for stable local reader parity and explicit privacy and data-ownership decisions. Neither capability belongs to the bundle-only initial scope.

The remaining possibilities are private notes and annotations, stable section-sharing links, reproducible PDF generation or viewing, selected-section read-aloud, glossary popovers, equation and symbol indexes, figure and visualization indexes, guided reading paths, broader Pencil support and a resume widget or shortcut. These are optional families rather than commitments. They should extend reading without turning the app into a competing authoring system or duplicating canonical content.

## 7. Development Snapshots and the Deferred Release Plan

### 7.1 Retained capability and historical evidence

The reader and exporter remain retained development capabilities. The [work log](work-log.md) records an August 2026 decision to package on demand and defer release, followed by the September archive of the workstream. Saved packages can therefore be older snapshots. Routine corpus or web-content work does not itself require a fresh iOS package, while explicitly requested iOS package or build work still carries its own validation requirements.

The source fixes the initial deployment floor at iOS and iPadOS 18 and records a no-signing build under Xcode 26.5. These are historical configuration and implementation statements, not a current SDK recommendation or a build performed for this account. The original policy also rejects lowering the first-release floor merely to absorb compatibility code, layout compromises or tool friction.

The six remaining tasks in the [deferred queue](work-queue.md) are not executable from this manuscript. Device QA/archive, distribution and commercial planning, and review/publication require theory closure and an explicit operator release decision. The publication step additionally depends on accepted device/archive evidence and the distribution plan. Molecule integration waits for the first release, while remote updates and synchronization retain their later stability and ownership dependencies.

### 7.2 Conditional distribution planning

The recorded first-public-release plan is unlisted App Store distribution, with a direct approved install link. The source describes TestFlight for prerelease device work, an app account under the retained bundle identity, an explicit unlisted-distribution review note, and eventual site and repository links after approval. GitHub is the source, release-note and support home rather than the iPhone installation channel.

These are source-time planning statements. Apple distribution rules, review requirements, available beta routes, pricing, agreements, taxes, banking, commission programs, promotion and code policies were not refreshed for this manuscript. The deferred release task explicitly requires checking current authoritative policy before any submission or commercial action. No statement here is a present eligibility determination, pricing recommendation or authorization to publish.

The source assumes a local-only public-to-link product without account gates, and defers alternative marketplace, direct web, custom-app and business distribution channels unless a separate need appears. Its unlisted-link concept is not an access-control mechanism. Those assumptions would be reassessed in the later authorized distribution task.

The recorded release evidence includes a current identified package, strict package validation, verification of version/date on hardware, physical iPhone and iPad testing, release screenshots, a complete icon set and a signed archive. The icon requirements include iPhone, iPad and marketing assets; exact platform slots remain supporting release specifications. These conditions were preserved when release was deferred. Neither the preliminary device report nor the reported implementation inventory fulfills them by itself.

The architecture is thus a maintained route from canonical textbook content to an identifiable offline reader, with separately bounded obligations for routing, device quality and eventual distribution. Its unresolved glossary destination, deferred evolution and incomplete release evidence remain visible rather than being converted into claims of present completion.
