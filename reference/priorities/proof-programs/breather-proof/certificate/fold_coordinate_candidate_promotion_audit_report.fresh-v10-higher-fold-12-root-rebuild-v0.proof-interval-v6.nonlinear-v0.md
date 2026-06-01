# Higher-Fold Fold-Coordinate Candidate Promotion Audit

## Verdict

The fold-coordinate candidate-change route still fail-closes at the proof-grade
promotion gate. The inherited screen witness gives proposed nonnegative
fold-coordinate shifts for all 3 one-leaf rows,
and all 3 rows remain strictly
screen-positive. No row is consumed because the expected same-packet
fold-coordinate candidate history, root-topology recertification, and
proof-interval preledger replay artifacts are absent.

| Quantity | Value |
| --- | ---: |
| Promotion rows | 3 |
| Screen-positive rows | 3 |
| Proposed shift-assignment rows | 3 |
| Proposed combined-opening rows | 3 |
| Same-packet candidate history materialized rows | 0 |
| Root topology recertified rows | 0 |
| Proof-interval preledger rerun rows | 0 |
| Source monotonicity certified rows | 0 |
| Receiver monotonicity certified rows | 0 |
| Memory-margin certified rows | 0 |
| Endpoint ownership/no-double-counting rows | 0 |
| Simple-root branch-reuse exclusion rows | 0 |
| Non-owned complement closed rows | 0 |
| Periodic endpoint/complement ownership closed rows | 0 |
| Fold-layer certification closed rows | 0 |
| Proof-grade rows | 0 |
| Row consumption count | 0 |
| Expected candidate artifacts present | 0 / 4 |

## Expected Promotion Artifacts

| Artifact | Expected file | Present |
| --- | --- | --- |
| `expected_phi_cyc` | `phi_cyc.fresh-v10-higher-fold-12-root-rebuild-v0.fold-coordinate-candidate.nonlinear-v0.json` | false |
| `expected_mesh` | `mesh.fresh-v10-higher-fold-12-root-rebuild-v0.fold-coordinate-candidate.nonlinear-v0.json` | false |
| `expected_root_topology_certificate` | `fresh_v10_higher_fold_root_tube_interval_certificate.fold-coordinate-candidate.nonlinear-v0.v0.json` | false |
| `expected_preledger_replay` | `fold_coordinate_candidate_preledger_replay_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | false |

The existing `lambda=0.305` replay is recorded only as a non-reusable
contrast. It certifies root topology for the direct-path trial seed, not for a
fold-coordinate candidate-change assignment.

## Row Audit

| Row | Failed side | Proposed opening | Required opening | Proposed margin | Candidate history | Root recertified | Preledger rerun | Promotion pass |
| --- | --- | ---: | ---: | ---: | --- | --- | --- | --- |
| `R_w_A04_A03` | `lo` | 1 | 0.000026691996524 | 0.999973308003475 | false | false | false | false |
| `R_u_A10_A09` | `lo` | 1 | 0.000026691996524 | 0.999973308003475 | false | false | false | false |
| `R_u_A07_A06` | `hi` | 1 | 0.00024618430271 | 0.999753815697289 | false | false | false | false |

## Proposed Fields

| Field | Rows certified |
| --- | ---: |
| `fold_coordinate_theorem_attempt_input_present` | 3 / 3 |
| `screen_positive_candidate_change_row` | 3 / 3 |
| `proposed_shift_assignment_present` | 3 / 3 |
| `proposed_shift_assignment_nonnegative` | 3 / 3 |
| `proposed_combined_opening_gt_threshold` | 3 / 3 |
| `direct_path_lambda_replay_checked_as_non_reusable_contrast` | 3 / 3 |

## Proof-Grade Fields

| Field | Rows certified |
| --- | ---: |
| `same_packet_candidate_history_materialized` | 0 / 3 |
| `same_packet_candidate_change_data_present` | 0 / 3 |
| `root_topology_recertified_for_candidate_change` | 0 / 3 |
| `proof_interval_preledger_rerun_for_candidate_change` | 0 / 3 |
| `source_monotonicity_preserved_under_candidate_change` | 0 / 3 |
| `receiver_monotonicity_preserved_under_candidate_change` | 0 / 3 |
| `memory_margins_all_owned_components` | 0 / 3 |
| `endpoint_ownership_no_double_counting` | 0 / 3 |
| `simple_root_branch_reuse_exclusion` | 0 / 3 |
| `non_owned_complement_closed` | 0 / 3 |
| `periodic_endpoint_complement_ownership_closed` | 0 / 3 |
| `fold_layer_certification_closed` | 0 / 3 |
| `proof_grade_row` | 0 / 3 |
| `row_consumed` | 0 / 3 |
| `branch_chart_authorized` | 0 / 3 |

## Closure Burden

The next mathematical object cannot be another screen over the same witness. It
must choose a realization route and then prove it:

1. materialize a same-packet fold-coordinate candidate history, including
   `phi_cyc` and `mesh` data;
2. rerun outward-rational root-topology certification for that candidate;
3. rerun proof-interval preledger classification for that candidate;
4. prove source and receiver monotonicity, all-owned memory margins, endpoint
   ownership/no-double-counting, simple-root branch-reuse exclusion, and
   non-owned complement closure for the one-leaf rows;
5. close the 8 periodic endpoint/complement rows and the 112 fold-layer rows
   before branch-chart authorization.

## Capture Decision

Priority-only promotion audit. This packet is not ready for authored AAA
promotion because it remains diagnostic and row-blocked. It usefully separates
the already-positive screen assignment from the absent same-packet realization
and replay evidence needed for row consumption.
