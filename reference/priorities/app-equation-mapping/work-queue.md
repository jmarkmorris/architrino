# Equation Mapping App Work Queue

This is the canonical execution ledger for accepted Equation Mapping app work. [priorities.md](priorities.md) owns the app strategy and claim boundary; [brainstorming.md](brainstorming.md) holds provisional ideas.

## Ranked Next Objects

1. `equation_page_api_access` — [AEM-001](#aem-001--equation-page-api-access). Status: `Queued`.
2. `seed_review_equations_expansion` — [AEM-002](#aem-002--seed-review-equations-expansion). Status: `Queued`.
3. `review_packet_export` — [AEM-003](#aem-003--review-packet-export). Status: `Queued`.

## Queued

### AEM-001 — Equation-page API access

- **Status:** Queued
- **Priority object:** `equation_page_api_access`
- **Request / acceptance:** Provide stable API access to Equation Mapping pages and their app-owned equation documents so a corpus reader or another authorized client can address a specific equation by stable ID without scraping the rendered interface. The design pass must determine whether the current static deployment is best served by a versioned JSON manifest, a read-only HTTP endpoint, or a shared runtime interface; it must preserve the existing direct-page hash route and avoid creating a second equation-document authority.
- **Evidence / blocker:** The app already has stable document IDs and direct hash routing, but its seeded documents currently live inside the app runtime rather than behind a declared external access contract. The deployment and consumer requirements must be inspected before selecting the API transport.
- **Completion:** A versioned read-only contract can list available equation documents, retrieve one normalized document by stable ID, and return or resolve its canonical Equation Mapping page link; unknown IDs fail clearly; claim-level fields retain their existing meanings; focused contract and integration tests pass; and concise developer documentation includes example access and response shapes.

### AEM-002 — Seed review equations expansion

- **Status:** Queued
- **Priority object:** `seed_review_equations_expansion`
- **Request / acceptance:** Add a small set of selected equation-mapping review documents by subject area without implying proof acceptance.
- **Evidence / blocker:** Depends on an accepted seed-data update or local editor-created review drafts selected for promotion.
- **Completion:** The selected documents use the app-owned schema, preserve claim-level boundaries, and pass focused Equation Mapping tests and browser review.

### AEM-003 — Review packet export

- **Status:** Queued
- **Priority object:** `review_packet_export`
- **Request / acceptance:** Export a static equation-map packet for review, including document JSON and a screenshot.
- **Evidence / blocker:** Depends on local editor draft state.
- **Completion:** The exported packet contains the normalized document data and a readable screenshot with enough provenance to identify its source equation and claim level.

## In progress

No rows.

## Awaiting verification

No rows.

## Verified

No rows.

## Deferred / blocked

No rows.

## Superseded / withdrawn

No rows.
