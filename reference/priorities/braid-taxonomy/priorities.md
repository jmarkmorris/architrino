# Braid Taxonomy

## Workstream Metadata

- Kind: `priority-support`
- Rank: `unranked`
- Value: `TBD`
- Cost: `TBD`
- ROI: `TBD`
- Status: `migration-control`

## Current

This lane is the priority-stage control surface for Noether braid taxonomy migration. The focused migration packet is [migration-plan.md](migration-plan.md). The proof-work routing ledger is [proof-id-crosswalk.md](proof-id-crosswalk.md).

Keep provisional taxonomy ideas in [brainstorming.md](brainstorming.md). Keep dated migration status and validation handoffs in [work-log.md](work-log.md).

## Objective

Maintain a compact queue for taxonomy migration and terminology cleanup without mixing migration history into authored corpus prose.

## Task Queue

1. `proof_id_crosswalk_review` - Use the Proof ID crosswalk as the routing gate before braid-document cleanup, and inspect open questions before assigning Proof IDs to downstream consumers or large proof-packet corpora. Status: `active-control`. Source: [proof-id-crosswalk.md](proof-id-crosswalk.md).
2. `taxonomy_open_question_review` - Decide whether `Noether Braid Topological Charge` should remain the title of the moved assembly-topological-charge chapter or whether the title should stay `Assembly Topological Charge` while only the path and scene move. Status: `pending`. Source: [migration-plan.md](migration-plan.md#open-refinement-questions).
3. `remaining_taxonomy_hit_audit` - Recheck any remaining `tri-binary`, moved-path, scene-id, or generated-artifact references only when a follow-up migration pass is selected. Status: `pending`. Source: [migration-plan.md](migration-plan.md#validation-plan).

## Detailed Priority Files

| File | Role |
| --- | --- |
| [migration-plan.md](migration-plan.md) | Priority-only migration control packet for Noether braid taxonomy, source moves, scene migration, terminology migration, generated artifact handling, and validation. |
| [proof-id-crosswalk.md](proof-id-crosswalk.md) | Priority-only crosswalk ledger mapping existing proof work to Proof IDs while preserving diagnostic, fixture, chart, downstream-consumer, and uninspected-corpus boundaries. |
