# Zero-Mean Normal-Candidate Fixture

This fixture supplies the optional packet chain consumed by
`scripts/neutral-braid/octahedral-zero-mean-correction-intake.mjs` to exercise a
bounded-speed normal-reconstruction candidate path plus the fail-closed
after-normal action/stability intake boundary.

It is a schema and plumbing fixture only. It uses supplied same-ledger rows with
ideal residuals to prove that the intake can carry a
`bounded-speed-normal-reconstruction-candidate` packet without retaining a
branch. The after-normal packet also declares a fail-closed
`bounded_speed_live_ledger` target whose required same-ledger rows are all
`blocked:bounded-speed-live-ledger-open`. Its nested
`live_ledger_identity_target` records the exact identity tuple, the closed row
already supplied by the normal candidate, and the missing downstream closed
rows that prove the tuple is not yet a certified bounded-speed live ledger. Its
`action_derived_scale_target` makes the first missing downstream row executable
and rejects this fixture by
`same-ledger-tuple-without-action-scale-rows-not-action-derived-scale`. The
nested `action_measure_row_target` records that no same-ledger action-measure
row is supplied; tuple identity alone is rejected by
`same-ledger-tuple-without-action-functional-not-action-measure-row`, with
`branch_scope` as the first missing measure field. Its
`branch_scope_source_audit` checks eight current neutral-braid branch-scope
artifacts and rejects each because none carries the same bounded-speed
live-ledger tuple or an `action_measure_row`. The audit records its searched
roots, searched terms, acceptance criteria, and per-candidate missing identity
and action-measure fields so that branch-scope cannot be accepted by
provenance-only reuse. It also records `action_measure_field_statuses` for each
candidate, distinguishing `branch_scope` as present only off-ledger from
`period_rows` as conditional-blocked until branch-scope binds on the
normal-candidate ledger. Its nearest-candidate lineage readout names the
certified fixed-speed all-pairs root ledger as closest, but that source is
provenance only: it has `branch_scope` while missing
`bounded_speed_ledger_id`, `force_checksum_id`, `consumer_checksum_id`,
`source_normal_reconstruction_candidate_id`, `action_measure_row`,
`period_rows`, `action_functional`, and `root_support_event_rows`.
The nested `same_ledger_action_measure_row_with_branch_scope_attempt` records
the next object attempt and fails closed: no action-measure row is constructed,
`branch_scope` is still not accepted on the normal-candidate ledger, and the
first conditional subfield after branch-scope is `period_rows`, represented by a
target-only `period_rows_target` blocked by
`same_ledger_branch_scope_source_missing`; no `period_rows` source is promoted
until branch-scope binds on the same ledger. The nested
`fail_closed_action_measure_row_target` lists the complete attempted row fields:
the normal-candidate ledger supplies only `bounded_speed_ledger_id`,
`force_checksum_id`, `consumer_checksum_id`, and
`source_normal_reconstruction_candidate_id`; `branch_scope`, `period_rows`,
`action_functional`, and `root_support_event_rows` have no same-ledger binding,
and its `field_statuses_on_normal_candidate_ledger` rows keep those four
fields separated from the supplied identity tuple. The row remains absent and
non-certifying.
Every packet keeps `certifies_bounded_speed_live_ledger=false` and
`retained_branch=false`.

Rebuild and validate the fixture artifact with:

```sh
node scripts/neutral-braid/octahedral-zero-mean-correction-intake.mjs \
  --samples 120 \
  --subdivisions 240 \
  --live-derivative-matrix scripts/neutral-braid/fixtures/zero-mean-normal-candidate/live-derivative-matrix.json \
  --live-correction-direction scripts/neutral-braid/fixtures/zero-mean-normal-candidate/live-correction-direction.json \
  --speed-primitive-feasibility scripts/neutral-braid/fixtures/zero-mean-normal-candidate/speed-primitive-feasibility.json \
  --speed-clock-length scripts/neutral-braid/fixtures/zero-mean-normal-candidate/speed-clock-length.json \
  --normal-reconstruction-handoff scripts/neutral-braid/fixtures/zero-mean-normal-candidate/normal-reconstruction-handoff.json \
  --bounded-speed-normal-reconstruction-candidate scripts/neutral-braid/fixtures/zero-mean-normal-candidate/bounded-speed-normal-reconstruction-candidate.json \
  --action-stability-after-normal-candidate scripts/neutral-braid/fixtures/zero-mean-normal-candidate/action-stability-after-normal-candidate.json \
  --out .tmp/zero-mean-normal-candidate-artifact.json \
  --pretty
node scripts/neutral-braid/octahedral-zero-mean-correction-intake.mjs \
  --validate .tmp/zero-mean-normal-candidate-artifact.json
```
