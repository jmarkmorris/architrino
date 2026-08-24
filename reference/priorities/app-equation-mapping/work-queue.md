# Equation Mapping App Work Queue

This is the canonical execution ledger for accepted Equation Mapping app work. [priorities.md](priorities.md) owns the app strategy and claim boundary; [brainstorming.md](brainstorming.md) holds provisional ideas.

## Ranked Next Objects

1. `equation_page_api_access` — [AEM-001](#aem-001--equation-link-and-registry-contract). Status: `Awaiting verification`.
2. `symbol_definition_disclosure` — [AEM-002](#aem-002--symbol-definition-disclosure). Status: `Queued`.
3. `author_equation_registration_workflow` — [AEM-003](#aem-003--author-equation-registration-workflow). Status: `Queued`.
4. `seed_review_equations_expansion` — [AEM-004](#aem-004--seed-review-equations-expansion). Status: `Queued`.
5. `review_packet_export` — [AEM-005](#aem-005--review-packet-export). Status: `Queued`.

## Queued

### AEM-002 — Symbol-definition disclosure

- **Status:** Queued
- **Priority object:** `symbol_definition_disclosure`
- **Request / acceptance:** Define every symbol used by each supported equation through one structured symbol-definition record. A record may reuse a shared definition, but the equation response must resolve it to a complete contextual definition. Present short definitions when the reader hovers a symbol or reaches it by keyboard focus, and make the same records available through an accessible, scrollable detail panel for touch devices, longer explanations, notation scope, and related material. Hover text and panel content must be two views of one record rather than separately authored explanations.
- **Evidence / blocker:** The current app has named formula-section anchors and explanatory comment rectangles, but the document schema has no symbol-definition collection and the interface does not guarantee a definition for every symbol. Hover alone would exclude touch and keyboard-only use; an always-open panel would compete with the equation canvas.
- **Completion:** The normalized document contract supports symbol records with a stable symbol ID, rendered token or expression, plain-language definition, scope or qualifiers, and one or more formula-part targets; every symbol in the selected pilot equations is covered or explicitly classified as standard punctuation/operator notation; pointer and keyboard focus reveal a concise definition; the same record opens in a scrollable detail panel; touch interaction has an explicit path; screen-reader labels are meaningful; incomplete or orphaned symbol records fail focused validation; and desktop, mobile, keyboard, and screen-reader-oriented tests pass.

### AEM-003 — Author equation-registration workflow

- **Status:** Queued
- **Priority object:** `author_equation_registration_workflow`
- **Request / acceptance:** Make equation registration an author-owned part of adding or materially revising a corpus equation. Define the smallest declarative submission process by which the author assigns or reuses a stable semantic ID, supplies the app equation record and contextual symbol definitions or shared-definition references, places the ordinary Markdown link immediately after the canonical display equation, names any intentionally unlinked duplicate occurrences, and runs one focused validation command. The workflow must not require authors to hand-edit generated artifacts or duplicate the equation in multiple authoritative stores.
- **Evidence / blocker:** The current seed documents are authored inside the app runtime, while corpus Markdown has no declared registration checklist, source binding, or completeness validator. Requiring app specialists to discover new equations after publication would make coverage retrospective and allow drift.
- **Completion:** A concise author procedure and copyable example identify the canonical source file, semantic ID, app-owned record, symbol-definition obligation, link form, duplicate-occurrence rule, claim level, and validation command; one validator checks ID uniqueness, link resolution, source-to-registry correspondence, and symbol coverage; contribution or review guidance assigns failures to the authoring change; and a pilot equation can be added end to end without manually editing generated output.
- **Operational sequence:** Author the canonical display equation; register its stable and semantic IDs; supply the app record and contextual symbol definitions or shared references; add the source-relative Markdown link; classify duplicate occurrences; run the focused validator; and include the result in review. The author owns the submission, while validation owns completeness and drift detection.

### AEM-004 — Seed review equations expansion

- **Status:** Queued
- **Priority object:** `seed_review_equations_expansion`
- **Request / acceptance:** Add a small set of selected equation-mapping review documents by subject area without implying proof acceptance.
- **Evidence / blocker:** Depends on the accepted author-registration workflow and an accepted seed-data update or local editor-created review drafts selected for promotion.
- **Completion:** The selected documents use the app-owned schema, preserve claim-level boundaries, and pass focused Equation Mapping tests and browser review.

### AEM-005 — Review packet export

- **Status:** Queued
- **Priority object:** `review_packet_export`
- **Request / acceptance:** Export a static equation-map packet for review, including document JSON and a screenshot.
- **Evidence / blocker:** Depends on local editor draft state.
- **Completion:** The exported packet contains the normalized document data and a readable screenshot with enough provenance to identify its source equation and claim level.

## In progress

No rows.

## Awaiting verification

### AEM-001 — Equation link and registry contract

- **Status:** Awaiting verification
- **Priority object:** `equation_page_api_access`
- **Request / acceptance:** Establish ordinary Markdown links plus one structured Equation Mapping registry/API as the binding contract between corpus equations and app pages. Begin with the equations already supported by the app: give each a canonical app link, identify its canonical corpus occurrence or explicitly record that none has yet been selected, and add the ordinary Markdown link immediately after the supported display equation where the authoring context permits it. A corpus reader or another authorized client must be able to address a specific equation by stable semantic ID without scraping the rendered interface. The design pass must determine whether the current static deployment is best served by a versioned JSON manifest, a read-only HTTP endpoint, or a shared runtime interface; it must preserve the existing direct-page hash route and avoid creating a second equation-document authority.
- **Evidence:** The versioned read-only registry now lists and retrieves all 23 normalized seed documents, supplies canonical links, rejects unknown IDs with `null`, records one canonical corpus binding per page, and is exposed to the live page as `window.ArchitrinoEquationMapping`. All 23 canonical Markdown links pass the focused source-binding validator. Runtime and iOS routing tests pass, including the public `.html` Equation Mapping route. Browser verification from the rendered Master Equation chapter opens `equation-mapping.html#causal-wake-per-hit-law`, displays the matching `Causal Wake Per-Hit Law` region, and reports no page errors. One pre-existing semantic-ID collision was removed while preserving both stable document IDs.
- **Completion:** Every currently supported app equation has a stable semantic ID and canonical app link in a versioned read-only contract; the contract can list available equation documents and retrieve one normalized document by stable ID; the supported-equation inventory records its corpus binding state; eligible canonical corpus occurrences contain a resolving ordinary Markdown link; unknown IDs fail clearly; claim-level fields retain their existing meanings; links work in the supported web, iOS, and generated reading surfaces; focused contract, link-resolution, and integration tests pass; and concise developer documentation includes example access and response shapes.
- **Verification remaining:** Under explicit regeneration authority, run `node scripts/build-textbook-md-pdf.mjs --write` and `node scripts/export-ios-textbook-package.mjs --write`; rerun their corresponding strict checks; then verify representative generated-reading-copy and iOS-package links. The canonical reading-copy check currently reports the expected 12 generated Markdown files as stale, while the iOS package check also reports pre-existing hash drift in six generated Archie guide references.

## Verified

No rows.

## Deferred / blocked

No rows.

## Superseded / withdrawn

No rows.
