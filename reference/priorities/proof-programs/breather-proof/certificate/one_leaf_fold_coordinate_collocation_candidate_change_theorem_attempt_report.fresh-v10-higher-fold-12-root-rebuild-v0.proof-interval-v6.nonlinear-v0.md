# Higher-Fold One-Leaf Fold-Coordinate Candidate-Change Theorem Attempt

## Verdict

The fold-coordinate candidate-change theorem attempt still fail-closes for
packet `fresh-v10-higher-fold-12-root-rebuild-v0`, but it records a real screen-level advance. The
nonlinear fold-coordinate collocation witness supplies positive lower and upper
fold-coordinate boundary-opening variables, and those variables strictly open
all 3 one-leaf candidate-change boundary
targets.

This is not a proof-grade candidate-change theorem. The witness is a bounded
tangent screen, not an accepted same-packet deformation or endpoint-tightening
certificate. Therefore 0 / 3 theorem rows pass, no row is consumed, and branch-chart authorization remains locked off.

| Quantity | Value |
| --- | ---: |
| Theorem-attempt rows | 3 |
| Constructor rows matched | 3 |
| Fold-coordinate screen rows | 3 |
| Fold-coordinate screen positive rows | 3 |
| Strict threshold identities inherited | 3 |
| Same-packet candidate-change data present | 0 |
| Proof-grade combined boundary openings | 0 |
| Source monotonicity certified rows | 0 |
| Receiver monotonicity certified rows | 0 |
| Memory-margin certified rows | 0 |
| Endpoint ownership/no-double-counting rows | 0 |
| Simple-root branch-reuse exclusion rows | 0 |
| Non-owned complement closed rows | 0 |
| Proof-grade rows | 0 |
| Minimum fold-coordinate screen margin | 0.999753815697289 |
| Gap constraint count | 10 |
| Structural constraint count | 3 |
| Variable count | 7 |
| Fold-coordinate column count | 4 |
| Row consumption count | 0 |

## Required-Field Audit

| Field | Rows certified |
| --- | ---: |
| `one_leaf_candidate_change_boundary_data_input_present` | 3 / 3 |
| `fold_coordinate_collocation_input_present` | 3 / 3 |
| `fold_coordinate_collocation_result_present` | 3 / 3 |
| `row_identity_matched` | 3 / 3 |
| `candidate_change_boundary_target_declared` | 3 / 3 |
| `combined_boundary_opening_condition_declared` | 3 / 3 |
| `strict_threshold_identity_inherited_from_constructor` | 3 / 3 |
| `fold_coordinate_symbol_mapping_matched` | 3 / 3 |
| `fold_coordinate_screen_witness_present` | 3 / 3 |
| `fold_coordinate_screen_combined_opening_gt_threshold` | 3 / 3 |
| `finite_tangent_matrix_status_feasible` | 3 / 3 |
| `declared_structural_rows_satisfied_with_tolerance` | 3 / 3 |
| `same_packet_candidate_change_data_present` | 0 / 3 |
| `strict_combined_boundary_opening_gt_threshold` | 0 / 3 |
| `source_monotonicity_preserved_under_candidate_change` | 0 / 3 |
| `receiver_monotonicity_preserved_under_candidate_change` | 0 / 3 |
| `memory_margins_all_owned_components` | 0 / 3 |
| `endpoint_ownership_no_double_counting` | 0 / 3 |
| `simple_root_branch_reuse_exclusion` | 0 / 3 |
| `non_owned_complement_closed` | 0 / 3 |
| `root_topology_recertified_for_candidate_change` | 0 / 3 |
| `proof_interval_preledger_rerun_for_candidate_change` | 0 / 3 |
| `row_consumed` | 0 / 3 |
| `branch_chart_authorized` | 0 / 3 |

## One-Leaf Fold-Coordinate Rows

| Row | Failed side | Fold-coordinate opening | Witness opening | Required opening | Screen margin | Screen pass | Theorem pass |
| --- | --- | --- | ---: | ---: | ---: | --- | --- |
| `R_w_A04_A03` | `lo` | `fc_sigma_source_lower` + `fc_rho_receiver_lower` | 1 | 0.000026691996524 | 0.999973308003475 | true | false |
| `R_u_A10_A09` | `lo` | `fc_sigma_source_lower` + `fc_rho_receiver_lower` | 1 | 0.000026691996524 | 0.999973308003475 | true | false |
| `R_u_A07_A06` | `hi` | `fc_sigma_source_upper` + `fc_rho_receiver_upper` | 1 | 0.00024618430271 | 0.999753815697289 | true | false |

## Interpretation

The imported screen witness uses
`fc_sigma_source_lower = fc_rho_receiver_lower = fc_sigma_source_upper = fc_rho_receiver_upper = 0.5`.
Thus each one-leaf row receives a screen-level combined opening of `1`,
which is strictly larger than the exact candidate-change boundary target. This
is the first positive bridge from the fold-coordinate collocation screen back
into the one-leaf candidate-change theorem stack.

The remaining blocker is proof-grade promotion: the tangent witness must become
a same-packet candidate change and must preserve source monotonicity, receiver
monotonicity, memory margins, endpoint ownership/no-double-counting,
simple-root branch-reuse exclusion, and non-owned complement closure before any
row can enter a causal preledger or branch chart.

## Capture Decision

Priority-only theorem attempt. This packet sharpens the current blocker by
separating the solved screen-level boundary opening from the unsolved
same-packet proof obligations. It is not ready for promotion into authored
AAA prose because it remains diagnostic and row-blocked.
