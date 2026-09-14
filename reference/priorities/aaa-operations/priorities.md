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

This workstream tracks operational questions and executable maintenance for the public webapp surface, static assets, generated artifacts, simulations, and user base. It is not a theory lane or solver-design lane. The current policies, baselines and decisions are explained in [manuscript.md](manuscript.md); this file keeps the questions, priorities and routes that may require future action.

## Current considerations

- Queue [OPS-034](work-queue.md#ops-034--replace-pages-and-pr-testing-with-agreed-webapp-coverage), [OPS-035](work-queue.md#ops-035--replace-local-test-rotation-in-bounded-slices) and [OPS-036](work-queue.md#ops-036--remove-superseded-testing-machinery) to replace agreed Pages/PR and local coverage while removing the superseded structure in the same bounded slices. Implementation starts after the current PR; no permanent dual rotation or project-wide migration prerequisite.
- The [four research suites removed from rotation](manuscript.md#734-operator-decision-four-suites-removed-from-rotation) are explicit-use only. Restoring regular execution requires the operator's acceptance of a concrete current consumer, consequential distinct coverage and measured cost justification.
- Follow the official [Testing Philosophy and Process](../../op/testing-regime.md): use agreed testing and require the proposer to justify disputed additions when needed. No comprehensive testing audit or rehabilitation campaign is a prerequisite to project progress. The manuscript retains the [explanation and decisions](manuscript.md#7-testing-philosophy-and-execution-regimen), and Development Process Review retains dated measurements.
- Maintain ○ [OPS-033 monthly retention reviews](work-queue.md#ops-033--periodic-retention-review), first due October 14, 2026. Review continued purpose and recoverability under the [retention owner](../../op/machine-artifact-retention.md#recurring-retention-review); report proposed dispositions while preserving the circular-family milestone deferral.
- Maintain [OPS-031 corpus scans](work-queue.md#ops-031--periodic-reader-facing-corpus-scan) and [OPS-032 priority-assets scans](work-queue.md#ops-032--periodic-priority-assets-scan): weekly priority-state checks; priority-ordered corpus cycles with Foundations/Dynamics monthly, core theory quarterly, supporting chapters every six months and validation/simulation annually; monthly priority-asset samples; and earlier review of affected dependencies after material advances. The [90-day review policy](../../op/periodic-document-review.md) balances confirmed improvements against regressions, document churn and review burden; model changes earn a pilot before wider use. The approved cycles are scheduled through one shared daily task check-in; due-date checks govern actual work and no automatic rewrite is authorized.
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
