# Operations Priorities

## Workstream Metadata

- Kind: `priority-operations`
- Rank: `unranked active owner`
- Value: `0.00`
- Cost: `0.0`
- ROI: `0.00`
- Status: `active-with-executable-object`
- Claim level: `operations-priority`
- Scope: deployment discipline, service limits, release readiness, cost visibility, reliability, and webapp growth operations.

## Purpose

This workstream tracks operational questions and executable maintenance for the public webapp surface, static assets, generated artifacts, simulations, and user base. It is not a theory lane or solver-design lane. [manuscript.md](manuscript.md) explains current policies and decisions; [work-queue.md](work-queue.md) owns accepted work and [work-log.md](work-log.md) preserves chronology and evidence links.

The shared OPS-031/OPS-032 automation is paused by operator direction. OPS-031's [current corpus state](evidence/ops-031-coverage-state-2026-10-29-master-integrated.json) retains second-cycle early coverage 10/15, core 18/46, supporting 15/95 and validation 8/43; the queue retains every due date, remaining path and capacity risk. The latest Master Equation and envelope/core corrections are separately verified in the corpus owner's [maintenance dispositions](../aaa-corpus-rewrite/work-queue.md); CRW-005 remains closed. OPS-032 retains its [weekly control baseline](evidence/ops-032-control-state-2026-10-25.json), [monthly substantive review](evidence/ops-032-monthly-substantive-review-2026-10-13.md) and [latest focused check](evidence/ops-032-trigger-review-2026-10-30.md), with no unfinished selected control pass. Resumption requires operator direction; dates remain planning checkpoints while paused.

## Current considerations

**Accepted lighter logging.** Routine OPS-032 consistency checks use one short dated work-log entry; detailed receipts are reserved for consequential findings, disputed state, substantive reviews or necessary coverage/version evidence. Active trackers retain current state, open follow-ups, resumable coverage and links to history. Existing receipts and the chronological work log remain intact under the [record-size rule](../../op/periodic-document-review.md#record-size-and-active-tracker-hygiene). The [October 31 decision](work-log.md#2026-10-31--lighter-ops-032-logging-and-active-tracker-cleanup) records the measured buildup and approved change.

- The [four research suites removed from rotation](manuscript.md#734-operator-decision-four-suites-removed-from-rotation) are explicit-use only. Restoring regular execution requires the operator's acceptance of a concrete current consumer, consequential distinct coverage and measured cost justification.
- Follow the official [Testing Philosophy and Process](../../op/testing-regime.md): use agreed testing and require the proposer to justify disputed additions when needed. No comprehensive testing audit or rehabilitation campaign is a prerequisite to project progress. The manuscript retains the [explanation and decisions](manuscript.md#7-testing-philosophy-and-execution-regimen), and Development Process Review retains dated measurements.
- ○ Paused — [OPS-033 retention reviews](work-queue.md#ops-033--periodic-retention-review), with November 14 retained as a planning checkpoint pending operator resumption. The [completed October 31 housekeeping](evidence/ops-033-operational-cruft-assessment-2026-10-31.md#completed-implementation--october-31) removes qualified old copies and expanded benchmark bulk with exact-byte recovery, prunes 256 selected unreferenced closed-job records, isolates stop-hook tests and adopts disposable-output lifetimes. The [selected retained-job actions](evidence/ops-033-operational-cruft-assessment-2026-10-31.md#selected-retained-job-cleanup-and-compression--october-31) are complete: eight incidental tests discarded, 68 redundant live triples retired with verified recovery, and [verified archive adoption](evidence/ops-033-operational-cruft-assessment-2026-10-31.md#verified-job-archive-adopted--october-31) complete for 337 evidence-bearing jobs: 1,011 originals removed, all archived bytes recovered and verified afterward. Recovery instructions remain in the retained operations owner. Scientific evidence and the circular-family deferral remain preserved; the schedule stays paused.
- Maintain [OPS-031 corpus scans](work-queue.md#ops-031--periodic-reader-facing-corpus-scan) and [OPS-032 priority-assets scans](work-queue.md#ops-032--periodic-priority-assets-scan): weekly priority-state checks; priority-ordered corpus cycles with Foundations/Dynamics monthly, core theory quarterly, supporting chapters every six months and validation/simulation annually; monthly priority-asset samples; and earlier review of affected dependencies after material advances. The [90-day review policy](../../op/periodic-document-review.md) balances confirmed improvements against regressions, document churn and review burden; model changes earn a pilot before wider use. The approved cycles use one shared daily task check-in, currently paused by operator direction; resumption requires operator direction, due-date checks govern actual work and no automatic rewrite is authorized.
- Review the operator communication policy through [OPS-029](work-queue.md#ops-029--operator-explanation-standard-review), checking clarity, consistency, precedence and practical usability while preserving explicit operator decisions.
- Review the protected children’s production stories under the [production procedure](../../office-of-learning/childrens-books/production/README.md) before authorizing manuscript or artwork changes. The priority questions concern trace persistence, common emission and speed assumptions, unspecified bead coupling, and earlier-position emission; preserve recorded approvals and pending QA decisions until the proper review.
- Verify the safety, developmental and external compliance assumptions in the [play-surface proposal](../../office-of-learning/play-surface/README.md) before design decisions depend on them.
- Define a maintainable internal section-numbering convention for suitable document classes without conflating reader-facing numbers with work-queue identifiers.
- Maintain the nine project-scoped skills through the adopted monthly and change-triggered review policy; the work queue owns the next pass and its completion evidence.
- Keep the priority-manuscript synthesis campaign as a control record and coverage index in its [campaign owner](campaigns/priority-manuscript-synthesis.md), not as a second operational manuscript. Its detailed completion records belong in [work-log.md](work-log.md) and the campaign evidence.

## Work Queue

Detailed executable tasks, acceptance conditions, blockers, completed dispositions and verification records live in [work-queue.md](work-queue.md). Do not duplicate those records here.

## Ownership

- [manuscript.md](manuscript.md) owns the current explanatory account of operational policies, baselines, decisions and evidence limits.
- [work-log.md](work-log.md) owns completed work, dated receipts and chronology.
- [work-queue.md](work-queue.md) owns executable work and its completion conditions.
- Contracts own machine-readable operational rules; evidence files own dated measurements.
- Corpus Dragnet may supply read-only inventories and correlation findings; Corpus Rewrite owns reader-facing conversion; Development Process Review owns incident evidence and recovery reasoning; App Solver owns its technical computation account while scientific law and acceptance remain with scientific owners.
