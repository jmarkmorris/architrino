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

No rows. Completed records are retained in [work-log.md](work-log.md) and focused packets.

## Deferred / blocked

No rows.

## Superseded / withdrawn

### AEM-005 — Review packet export

- **Status:** Withdrawn
- **Priority object:** `review_packet_export`
- **Reason:** Withdrawn on 2026-09-06. The task existed to export an operator-selected local editor draft for review, and the live local editor and its browser-local draft store were removed on operator direction that equation-map content is changed in the repository. The blocking condition can no longer be satisfied, so the row is retired rather than left deferred against an unreachable trigger.
- **Re-entry condition:** A review-packet export must be proposed as a new task naming what is exported, the repository-held source it is exported from, and the review decision the packet supports.

### AEM-004 — Curated carousel promotion review

- **Status:** Withdrawn
- **Priority object:** `curated_carousel_promotion_review`
- **Reason:** Withdrawn by operator decision on 2026-09-01 because promoting an arbitrary equation adds no justified reader or operator value.
- **Re-entry condition:** A carousel addition must be proposed as a new task with a named comprehension gap or comparison use case, a selected equation whose visual decomposition addresses it, explicit callouts and claim boundary, and a review condition that can show whether the addition helps.
