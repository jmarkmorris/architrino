# App Equation Mapping Work Log

This file is the chronological work log for the `app-equation-mapping` priority area. Use it for dated agent status, proof-attempt notes, checker narratives, handoffs, failed paths, and operator/developer communication that must remain discoverable but should not crowd the live priority tracker.

Use `brainstorming.md` for provisional ideas, insights, conceptual maps, and draft corpus-promotable text when this priority area has one. Use `work-queue.md` for executable tasks and their lifecycle state, and use the main priority tracker for strategy, blockers, and promotion routing. Keep focused proof packets, certificates, app specs, and requirement notes in their own sibling files when they need a stable structure.

## Log Entries

### 2026-08-29 — Compact equation-to-app action approved globally

- Promoted the one-equation `View →` reader trial into the canonical web presentation for every corpus display equation carrying the ordinary Equation Mapping source link.
- Preserved the ordinary source-relative Markdown link as the portable binding, retained exact-route return navigation and keyboard focus, and kept equation rows full-width in paginated textbook layouts.
- This presentation change does not alter equation identity, source authority, promotion, proof status, or equation-mapping score.

### 2026-08-24 — Full-corpus equation baseline, symbols, and author workflow verified

- Inventoried all 198 canonical Markdown files and registered all 4,587 display-equation occurrences. Each occurrence now has a stable semantic ID carried by an ordinary source-relative Markdown link and a generated read-only Equation Mapping page with formula TeX, source heading, line span, nearby context, search text, and symbol records.
- Generated 29,590 structured symbol records. The runtime uses the same records for hover and keyboard-focus help and for the click/tap-accessible scrollable symbols-and-source panel; records distinguish locally detected definitions from explicitly labeled shared-notation inference.
- Extended search and the read-only registry/API across all 4,587 pages. Non-promoted results open the same baseline equation/source/symbol surface without carousel or editor controls; the existing 23 promoted pages retain carousel placement and curated callouts. Promotion now means editorial mapping only, not a higher equation status.
- Added author-owned automation: authors maintain the canonical equation and local symbol prose, while `build-equation-mapping-corpus.mjs --write` preserves or assigns IDs, inserts new links, and rebuilds the registry. Its check mode rejects coverage and drift failures and now runs in the content-integrity suite.
- Regenerated 12 textbook reading copies and the strict iOS textbook package. Browser QA verified a non-promoted direct page, hover/click symbol access, the scrollable source panel, all-corpus search, a promoted carousel page, and hash/back-forward synchronization; a hash-routing defect discovered during QA was fixed before closure.
- Moved `AEM-002` and `AEM-003` to verified. The remaining local rank-1 object is optional curated carousel promotion review; no equation claim, proof status, corpus authority, or equation-mapping score changed.

### 2026-08-24 — AEM-001 ordinary-link and registry contract verified

- Added the versioned read-only Equation Mapping registry interface, exposed it on the live app page, and preserved the app's direct hash route and app-owned document authority.
- Registered all 23 supported equation pages with unique semantic IDs, normalized document retrieval, canonical app links, and canonical corpus source bindings. Resolved one pre-existing semantic-ID collision between the per-hit law and the full master equation without changing either stable document ID.
- Added one ordinary Markdown link after each of the 23 selected canonical display equations and added a focused validator that checks registry uniqueness, source existence, exact link placement, and source-to-registry correspondence.
- Preserved Equation Mapping `.html` routes in iOS public-web redirects and added focused routing coverage; registry, runtime, routing, content, scene-graph, priority-ranking, and whitespace checks pass. Browser verification from the rendered Master Equation chapter opens the per-hit-law app route, displays the matching equation region, and reports no page errors.
- Regenerated the textbook reading copies and iOS package under explicit operator authority. The reading copies contain 46 link occurrences across chapter and all-in-one copies, the iOS bundle maps exactly 23 registered targets to `https://architrino.com/equation-mapping.html#...`, and both generator checks pass without drift.
- Moved `AEM-001` to verified and promoted `symbol_definition_disclosure` as the local rank-1 object. No equation claim, proof status, or equation-mapping score changed.

### 2026-08-23 — Corpus links, symbol definitions, and author registration queued

- Expanded `AEM-001` into the ordinary Markdown link plus structured registry/API binding contract and made the app's currently supported equations the first link-enablement tranche.
- Queued one-source progressive disclosure for symbol definitions as `AEM-002`: concise hover or keyboard-focus help backed by the same structured records used in an accessible scrollable detail panel.
- Queued the author-owned equation-registration process as `AEM-003`, including stable IDs, app records, symbol coverage, canonical Markdown links, duplicate-occurrence handling, and focused validation.
- Renumbered seed expansion and review packet export to `AEM-004` and `AEM-005`; no equation claim or equation-mapping score changed.

### 2026-08-23 — Work queue established

- Added the canonical `work-queue.md` required by the current priority-area structure.
- Queued read-only API access to Equation Mapping pages and normalized equation documents as `AEM-001`, the first ranked item.
- Migrated the two existing executable tasks from `priorities.md` into the new queue as `AEM-002` and `AEM-003`.

### 2026-08-23 — Promoted to active priorities

- Moved the priority area from `reference/priorities/dormant-deferred/app-equation-mapping` to `reference/priorities/app-equation-mapping` at operator direction.
- Promoted `equation_page_api_access` as the active local rank-1 object and synchronized the active inventory and unified ranking.
- This promotion changes execution attention and routing only; it does not change any equation claim, proof status, or equation-mapping score.
