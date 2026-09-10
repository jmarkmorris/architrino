# Reading Equations Through Source, Symbols, and Visual Structure

## 1. An Explanatory Surface with a Defined Authority

### 1.1. The equation and its explanation

Equation Mapping presents an equation together with its source context, symbol definitions, and optional commentary directed at particular terms. Its purpose is to help readers compare existing physics equations with candidate Architrino equations and understand what an explanation refers to. A centered formula, restrained comment rectangles, thin pointer lines, and marked formula sections provide the visual vocabulary. The useful baseline is static; understanding this surface does not require an animation language, timeline, camera model, or scene graph.

The distinction between an equation and its explanation governs the whole application. Canonical Markdown supplies the equation and its surrounding argument. A generated record makes that occurrence searchable and addressable. A curated map can add comments and visual decomposition. Neither the generated record nor a persuasive arrangement of comments establishes that a proposed mapping is correct. Equation-row evidence, proof obligations, and score changes remain with their scientific owners.

The three declared claim levels make that separation explicit. Candidate commentary is a working explanation or proposed mapping. An accepted source reference is an existing-physics equation or reference used for comparison. An accepted Architrino derivation identifies a derivation already accepted in its proper corpus or priority source. The app displays these distinctions when material; it does not award them through rendering, search rank, carousel placement, or visual emphasis.

### 1.2. Reading in the app, authoring in the repository

The retained implementation account describes a read-only static shell. Equation-map content is changed in the repository; the app has no in-page content editor or browser-local document draft. Browser-local state is reserved for display preferences. Reading, comparing, and discussing an annotation therefore differ from editing its stored formula, targets, or comments.

This boundary is especially important when a design description calls the surface an annotation workspace. Here, annotation is authored content presented to the reader, not a promise of live browser editing. The historical local editor and its draft store were removed. Their absence is a deliberate ownership decision, not an unfinished editor to restore by implication. The source reports implementation and validation of this decision; this exposition does not inspect or exercise a running app.

The [requirements and design](contracts/requirements-and-design.md) specify the visual model. The [registry and authoring contract](contracts/registry-and-authoring-contract.md) specifies how source occurrences become app records. Together they define a reader-facing surface whose explanatory richness can grow without changing an equation's authority.

## 2. An Address for Each Source Occurrence

### 2.1. Stable identity and source context

The binding contract assigns each corpus display-equation occurrence one stable semantic page ID, an ordinary Markdown link immediately after the formula, a generated read-only document, a source binding, and a structured symbol collection. The link carries the ID. When the formula or nearby prose changes, the generator preserves an existing ID instead of treating the revised occurrence as unrelated.

Occurrence identity matters even when two formulas look alike. Each occurrence is addressable in its own source context; authors are not required to classify duplicates or merge them into a context-free formula catalog. A reader can return to the particular argument, heading, and passage from which the equation was opened. The stable ID joins source and app page, while the source binding identifies the passage that gives the formula its use.

A generated record supplies the semantic ID, formula TeX, title, subject, promotion flag, source path and heading, line span, route, nearby context, search text, and symbol records. Chapter browsing additionally uses source title and source order derived from the textbook table of contents. A chapter absent from that ordering retains its canonical Markdown title and a null order, sorting after textbook chapters. The registry records this information for retrieval; canonical Markdown remains its equation and context authority.

### 2.2. Baseline access and editorial promotion

Every registered equation receives the same baseline access: formula rendering, search, direct addressing, source context, hover or keyboard-focus symbol help, and a click- or tap-accessible scrollable symbols-and-source view. A non-promoted occurrence is not a lesser source record. Promotion changes carousel placement and adds curated callouts or editorial mapping; it does not change searchability, addressability, symbol access, or equation status.

The source describes both a generated corpus-wide registry and a small repository-authored collection of promoted overlays. It reports 23 promoted pages in its recorded baseline. That number is a source-time inventory, not a newly measured total. The broader corpus counts are kept in generated data rather than duplicated as a live promise in this explanation.

An additional carousel entry needs an explanatory reason: a named comprehension gap or comparison use case, an equation whose decomposition addresses it, suitable callouts, a clear claim boundary, and a review condition that can show whether the addition helps. Adding an arbitrary equation simply to enlarge the carousel does not satisfy that purpose. This editorial requirement concerns reader value, not scientific promotion.

### 2.3. Retrieval and portable navigation

The source contract exposes two related records. Static clients can fetch a generated corpus registry; the page also provides a read-only registry interface returning frozen normalized page records. Listing retrieves every corpus equation page. Lookup accepts a semantic ID and retains the source-described promoted stable-ID and title aliases. Unknown lookup and link requests return null, rather than silently selecting another equation. Exact schema and interface names remain in the supporting contract.

The portable source link uses the compact label “View →”. Ordinary Markdown readers can follow it without depending on a web-only transformation. The web reader presents the same binding as a styled action beside the display formula, preserves its exact source route, and restores focus to the originating action on return. Generated reading copies inherit the canonical source link.

The recorded iOS export contract classifies the standalone app's HTML target as a public web redirect. That is a routing description, not a claim that the app is embedded in the reader or that a package has just been regenerated. Source-relative navigation, the stable ID, the app route, and the originating equation together preserve the reader's place across different reading surfaces.

## 3. Symbols, Search, and Reader Orientation

### 3.1. One definition record, several ways to reach it

Symbol help uses the same structured records for concise hover or keyboard-focus disclosure and for the fuller scrollable symbols-and-source view. A reader who cannot hover still needs access through click or tap. Pressing a symbol beneath the equation expands the right rail, marks the matching definition, and scrolls it into view.

A symbol record must distinguish a definition detected in local source prose from a description inferred from shared corpus notation. The latter directs the reader to the source excerpt for exact use. Shared notation can aid orientation, but it cannot substitute for a local definition when the meaning depends on the passage. Complete product metadata is therefore compatible with an explicitly qualified interpretation.

The rail also has its own collapse control. Source context must remain reachable when an equation defines no symbols; a design that only opens the rail through symbol buttons would lose that access. This is why the source describes replacing the former floating panel and title-adjacent opener with a separately controlled rail. The equation title carries the title alone.

### 3.2. Curated groups and the complete corpus

The left rail offers two collection views. Key equations is the default, arranging curated maps in compact, collapsible subject groups; the substrate group is named Dynamics. All equations organizes every occurrence by chapter, section, and equation. Textbook chapter order comes first, supplementary chapters follow in title order, and sections and equations retain source order. Branch contents render when expanded.

A persistent Master Equation shortcut appears first in the index while that equation also remains in its ordinary group. Opening an equation from a textbook link selects All equations and reveals the relevant chapter, section, and row. This changes navigation state, not promotion or identity. The exact source return destination remains available through the standard Back control.

### 3.3. Search without a second meaning for the same control

Equation search is the field inside the expanded left rail. It searches all equations from either collection view by title, subject, formula, symbol, source chapter or section, and overlay text. Results carry chapter and section context, and further results remain available on demand without a fixed access cutoff. Updating the results preserves typing focus and the equation canvas.

Selecting a result opens the equation and reveals it in All equations. Clearing the search restores the chosen collection view. Collapsing the rail hides both the field and the rest of its body; the source implementation account also removes them from the accessibility tree and focus order while collapsed.

The magnifier in the shared top strip performs scene search. It is not a second equation-search entry point. The source records that an app-specific magnifier had been visually indistinguishable from the shared icon while searching a different corpus; on a wide viewport its visible effect could be only a moved focus ring. Removing that duplicate preserves a legible division between equation search in the index and shared scene navigation in the canonical controls.

## 4. Formula Sections as Visual Targets

### 4.1. A small authored document

The app-owned map description contains a stable ID, title, subject, main formula TeX, named anchors, overlays, background choice, and claim level. An overlay identifies its target anchor, position, pointer side, and comment content. These fields make a curated explanation serializable and reviewable without making the browser a second authoring store.

Named anchors identify terms or sections of the formula. Saved comments target those names, rather than relying on raw screen coordinates. Rendering resolves the target to the measured formula section or explicit span metadata. A font change, viewport resize, background change, rail collapse, or search-panel change can then trigger placement against the rendered formula instead of leaving the annotation attached to an obsolete pixel.

The visible layers have distinct jobs: a quiet background; the centered equation; a thin formula-section line; its pointer line; a comment rectangle; the subject index; the symbols-and-source rail; and one top control strip. Prose uses Helvetica Neue with Arial and sans-serif fallbacks, while equations and formula fragments use the repository's math-rendering path with KaTeX as the web target. The same distinction applies to mathematics inside comments.

### 4.2. Lines that identify a section precisely

A thin horizontal line above or below the formula marks the intended section. The pointer connects the comment rectangle to that section line, rather than to an arbitrary point inside the expression. Its preferred route is a straight segment, with one bend only when needed to avoid covering formula text. The attachment must survive layout changes.

A comment has one pointer by default, and several comments may address the same section. The active comment can emphasize its target more strongly without inventing another claim level. Candidate or accepted-source tags are useful when they clarify the explanation's status; decorative badges cannot confer evidence.

These constraints give visual precision a limited but useful meaning. A line can accurately identify the term a comment discusses. That alignment does not establish that the comment is true, that two formulas are equivalent, or that a proposed recovery has been derived. Pointer correctness and mapping correctness are separate questions.

### 4.3. Readable comments and stable symbol disclosure

Comment rectangles act as labels, with concise prose, optional inline or display mathematics, low-contrast borders, and no heavy shadows. They wrap cleanly and ordinarily avoid the equation; intentional placement over empty formula-space is an explicit authoring exception. Comments remain short enough to leave the main expression readable.

Lower explanation boxes reserve space below the symbol strip for its tallest rendered tooltip and a clear gap. The source requires this space to be computed for every curated map before hover, so moving between symbols does not move the boxes. Tooltips stay above the boxes in the visual stacking order. In a short window, scrolling to the lower boxes preserves the reserved space instead of reclaiming it and creating another collision.

The broader visual grammar is deliberately economical: empty space around the equation, thin rules, sparse accents for selected anchors and search matches, and restrained comment boxes. Large or nested cards, gradients, glow, bokeh, texture, and text that merely explains obvious controls compete with the formula rather than helping read it. Purple is the default background, with Light, Warm, and Dark as the other standard choices.

## 5. A Canvas That Responds to Its Controls

### 5.1. Desktop rails and compact overlays

On the larger layout, the left index and right reference rail take their widths from the canvas. The equation recenters in the remaining space rather than sitting behind an expanded panel. Both rails collapse to narrow strips, and the equation title does not share its centering box with an unrelated opener. The source account describes the right rail as a third grid column with a shared total-rail-width term applied to canvas sizing.

Below 760 CSS pixels, the contract explicitly changes the arrangement. Neither rail remains a grid column: each becomes an overlay pinned to its own edge. Collapsed strips reserve stage clearance. An expanded rail can cover content because the reader is then using the rail rather than reading the equation. This compact exception limits the broader requirement that rails recenter without covering the formula; it must not be silently turned into a universal no-overlap guarantee.

The recorded design keeps both compact collapsed strips at 72 pixels, matching the desktop collapsed width. Consistency was chosen at the cost of available equation space. The source separately records a 216-pixel stage on a 390-pixel viewport and measured formula bounds from a separate browser check. Those are scoped layout observations, not a width law obtained by subtracting two strip widths alone; the retained measurements and their different geometric objects remain in the coverage record.

### 5.2. One control strip and one settings vocabulary

The canonical strip orders table of contents, back, forward, home, scene search, and canvas settings from left to right. The app contributes settings to that shared strip and owns the settings panel. It does not create another private cluster beside or beneath the common controls. Home follows the shared app-home convention.

The settings are background color, comment font size, equation scale, and each rail's collapsed state. Font size and equation scale each offer small, medium, and large. These preferences may persist locally without an account or server. They do not create editable formula documents or local commentary drafts.

The source's control-strip repair illustrates why layout should use rendered measurements where necessary. Adding settings changed the strip's width; a separate title inset with a fixed ceiling could leave the title underneath the buttons. The reported repair measures the strip's left edge and preserves a gap, using the earlier clamp only as an initial floor. Likewise, an intrinsic shared label column replaces a fixed settings-label track, preventing longer rendered labels from intruding into swatches or segments.

### 5.3. Avoiding collisions without moving shared navigation

Moving source context into the right rail exposed two further dependencies in the source account. The viewport-anchored control strip occupied the rail's corner, while a settings panel anchored inside the smaller canvas could drift away from its opening button. The reported design hangs the rail beneath the strip and anchors the panel to the viewport. It does not move the shared strip for this one app or leave the controls sitting on the rail's own header surface.

In compact mode, clearance from both collapsed strips contributes to the stage, and equation and overlay sizing follows the stage content box. That common rule addresses both edges. These are source-described fixes and design reasons; the original browser measurements are retained with their viewport and harness conditions. No fresh application measurement is inferred from this manuscript's own rendering.

## 6. Authoring and Maintenance Without a Second Source of Truth

### 6.1. Registration follows the equation

The author writes or revises the display equation in canonical Markdown and defines introduced symbols in the local prose. Existing source links are preserved during revision. The source generator's ordinary check mode detects missing or stale coverage; explicit regeneration belongs to the authorized publication workflow. Regeneration assigns a deterministic ID to a new occurrence, inserts its ordinary source-relative link, and rebuilds the basic registry record.

The author does not duplicate the formula into a second basic app document, maintain a parallel source-binding table, or manually classify repeated occurrences. The check contract rejects duplicate IDs, missing links, stale generated data, absent source context, incomplete symbol records, and a promoted equation missing from the corpus inventory. A complete record must continue to represent the passage that owns it.

Curated promotion is a separate repository editorial change. The detailed contract names a curated overlay data module, while the strategy describes callouts as corpus-authored. Their shared boundary is clear: the app reads rather than edits this material. The exact storage-language difference remains explicit in the supporting coverage; it is not resolved here by moving content or inventing a new authoring interface.

### 6.2. Focused responsibilities and excluded machinery

The source architecture keeps route glue thin and places app behavior in focused modules. Rendering, normalization, subject-index state, search, settings, and pointer measurement have distinct responsibilities. New behavior does not belong in the root application file. Reuse of shared navigation and palette conventions avoids another competing set of controls.

There is no production solver or equation-proof checker in this product contract. A source link makes an argument inspectable; a symbol record makes its notation accessible; and a pointer makes commentary precise about its target. None of those mechanisms supplies missing derivation, source acceptance, or scientific evidence. The app remains useful because it exposes those relationships without changing their grade.

## 7. What the Retained Validation Can Establish

### 7.1. Visual and interaction obligations

The design's browser checks concern a readable centered equation on desktop and mobile; rail behavior within the layout's stated exception; symbol-to-definition access; reachable canonical controls; non-overlapping settings; readable comments; correctly attached pointers; contrast across four backgrounds; mathematics inside comments; and coherent text placement. They are product checks with observable targets, not equation validation.

The work log reports focused runtime and browser checks for control consolidation, editor removal, rail access, pointer behavior, and source navigation. It also names historical screenshot files that are not retained in the checkout. Those reports support a source-grounded implementation history, but an absent image cannot be independently reinspected. This exposition has not rerun the app's tests or inspected its implementation.

### 7.2. Measurements, inferred causes, and harness limits

The source separates one inferred cause from a measured layout response. A screenshot suggested that settings-label text had grown large enough to exceed a fixed track; the label-size inference would require the operator browser's computed font size to confirm. The recorded browser test instead forced a larger label size and measured the replacement column's behavior. Testing that condition does not retrospectively measure the screenshot's original font size.

The same browser account reports that its automated pane marked the document hidden, so animation-frame callbacks did not fire and layout passes were invoked directly. That check has a narrower reach than observing the normal scheduling path in a visible app. Reported static positions and control reachability remain useful within that harness, while callback scheduling requires its own observation.

### 7.3. A count mismatch is not a routing failure

One source correction is particularly important for interpreting generated-data tests. An earlier failure had been described as an iOS package losing equation-link routes. Subsequent inspection showed that every equation link in the recorded package still had a matching route; the failing assertion was a stale fixed count. The package lagged the corpus, which the on-demand packaging policy allowed, while remaining internally consistent.

The corrected account preserves both facts: package freshness and internal link completeness are different properties. Updating a count pin can be justified by the actual inventory and its owning coverage check, but a failed count assertion alone cannot diagnose missing links. A separate reported release-gate failure concerned an insufficient evidence receipt in another application lane and was left with that owner. Neither historical issue changed an equation claim, proof status, source authority, or mapping score.
