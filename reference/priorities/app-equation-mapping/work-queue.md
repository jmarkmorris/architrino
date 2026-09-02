# Equation Mapping App Work Queue

This is the canonical execution ledger for accepted Equation Mapping app work. [priorities.md](priorities.md) owns the app strategy and claim boundary; [brainstorming.md](brainstorming.md) holds provisional ideas.

## Ranked Next Objects

No rows.

## Queued

No rows.

## In progress

No rows.

## Awaiting verification

No rows.

## Verified

### AEM-003 — Author equation-registration workflow

- **Status:** Verified
- **Priority object:** `author_equation_registration_workflow`
- **Request / acceptance:** Make complete equation registration an author-owned part of adding or materially revising any corpus display equation without requiring duplicated app records or hand-edited generated artifacts.
- **Evidence:** The author contract and mathematics style guide now require local symbol definitions and preservation of an existing ordinary link. `build-equation-mapping-corpus.mjs --write` assigns a deterministic semantic ID and inserts the source-relative link for every new display-equation occurrence, then generates the basic document, source binding, search record, and symbol records. `--check` rejects missing links, duplicate IDs, stale generated data, missing source context, incomplete symbol records, or missing promoted occurrences, and the check is part of the content-integrity suite.
- **Completion:** Satisfied on 2026-08-24. Authors maintain the canonical equation and local definitions; generation owns registration mechanics. Existing links preserve identity across equation or prose edits, every occurrence is independently addressable, and promotion is a separate optional editorial action.

### AEM-002 — Symbol-definition disclosure

- **Status:** Verified
- **Priority object:** `symbol_definition_disclosure`
- **Request / acceptance:** Give every corpus equation structured symbol access through one record used by concise hover/focus help and an accessible scrollable detail panel.
- **Evidence:** The generated registry contains 29,590 complete symbol records across all 4,587 equation pages. Every symbol chip renders through KaTeX, exposes its definition in the hover/focus title and accessible label, and opens the shared symbols-and-source panel on click or tap. The panel renders every symbol, scope, definition basis, source path, source heading, line span, local excerpts, and source route. Records distinguish local source definitions from explicitly labeled shared-notation inferences; validator and runtime tests cover completeness, and browser QA verified both views on a non-promoted direct page.
- **Completion:** Satisfied on 2026-08-24. The same normalized symbol records power hover, keyboard focus, touch/click, screen-reader labels, and the scrollable detail panel for every corpus equation.

### AEM-001 — Equation link and registry contract

- **Status:** Verified
- **Priority object:** `equation_page_api_access`
- **Request / acceptance:** Establish ordinary Markdown links plus one structured Equation Mapping registry/API as the binding contract between corpus equations and app pages. Begin with the equations already supported by the app: give each a canonical app link, identify its canonical corpus occurrence or explicitly record that none has yet been selected, and add the ordinary Markdown link immediately after the supported display equation where the authoring context permits it. A corpus reader or another authorized client must be able to address a specific equation by stable semantic ID without scraping the rendered interface. The implementation preserves the existing direct-page hash route and avoids creating a second equation-document authority.
- **Evidence:** The versioned read-only registry lists and retrieves all 23 normalized seed documents, supplies canonical links, rejects unknown IDs with `null`, records one canonical corpus binding per page, and is exposed to the live page as `window.ArchitrinoEquationMapping`. All 23 canonical Markdown links pass the focused source-binding validator. Browser verification from the rendered Master Equation chapter opens `equation-mapping.html#causal-wake-per-hit-law`, displays the matching `Causal Wake Per-Hit Law` region, and reports no page errors. Regeneration produced 46 link occurrences across chapter and all-in-one reading copies and exactly 23 public Equation Mapping URLs in the iOS link bundle. The textbook and strict iOS generator checks, 70 focused tests, strict content and scene-graph checks, priority ranking, and whitespace validation pass.
- **Completion:** Satisfied on 2026-08-24. Every supported app equation has a unique stable semantic ID, canonical source binding, ordinary Markdown link, normalized registry record, and generated iOS public-web route. One pre-existing semantic-ID collision was removed while preserving both stable document IDs. Claim-level fields retain their existing meanings, and the author-facing contract includes example access, response shape, and registration procedure.

## Deferred / blocked

### AEM-005 — Review packet export

- **Status:** Deferred
- **Priority object:** `review_packet_export`
- **Request / acceptance:** Export a static equation-map packet for review, including document JSON and a screenshot.
- **Evidence / blocker:** No operator-selected local editor draft is available to export. The task becomes executable only when such a draft exists and the operator requests its review packet.
- **Completion:** The exported packet contains the normalized document data and a readable screenshot with enough provenance to identify its source equation and claim level.

## Superseded / withdrawn

### AEM-004 — Curated carousel promotion review

- **Status:** Withdrawn
- **Priority object:** `curated_carousel_promotion_review`
- **Reason:** Withdrawn by operator decision on 2026-09-01 because promoting an arbitrary equation adds no justified reader or operator value.
- **Re-entry condition:** A carousel addition must be proposed as a new task with a named comprehension gap or comparison use case, a selected equation whose visual decomposition addresses it, explicit callouts and claim boundary, and a review condition that can show whether the addition helps.
