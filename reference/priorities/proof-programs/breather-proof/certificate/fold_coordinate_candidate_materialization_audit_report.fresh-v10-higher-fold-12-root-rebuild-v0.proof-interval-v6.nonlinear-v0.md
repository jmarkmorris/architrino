# Higher-Fold Fold-Coordinate Candidate Materialization Audit

## Verdict

The fold-coordinate candidate history materialization attempt fail-closes before
writing candidate `phi_cyc`, `mesh`, or preledger-input files. The inherited
screen remains positive for all 3 one-leaf
rows, but the fold-coordinate columns are boundary-opening variables rather
than same-packet history update formulas.

| Quantity | Value |
| --- | ---: |
| Materialization rows | 3 |
| Screen-positive rows | 3 |
| Fold-coordinate boundary-opening columns | 4 |
| Variables with history realization | 0 |
| Variables missing history realization | 4 |
| Candidate artifacts present | 0 / 5 |
| Rows with variables present | 3 |
| Rows with variables realized as history | 0 |
| Rows with `phi_cyc` materialized | 0 |
| Rows with `mesh` materialized | 0 |
| Rows with preledger input screen materialized | 0 |
| Root-topology certificate rows | 0 |
| Preledger replay rows | 0 |
| Materialization-ready rows | 0 |
| Row consumption count | 0 |

## Fold-Coordinate Variable Audit

| Variable | Source symbol | Realization fields present | History realization |
| --- | --- | ---: | --- |
| `fc_sigma_source_lower` | `sigma_source_lower` | 0 / 8 | false |
| `fc_rho_receiver_lower` | `rho_receiver_lower` | 0 / 8 | false |
| `fc_sigma_source_upper` | `sigma_source_upper` | 0 / 8 | false |
| `fc_rho_receiver_upper` | `rho_receiver_upper` | 0 / 8 | false |

Required realization fields are:
`same_packet_history_update_formula`, `theta_support`, `x_update_basis`, `xdot_update_basis`, `mesh_update_rule`, `endpoint_motion_rule`, `source_monotonicity_rule`, `receiver_monotonicity_rule`.

## Expected Candidate Artifacts

| Artifact | Expected file | Present |
| --- | --- | --- |
| `expected_phi_cyc` | `phi_cyc.fresh-v10-higher-fold-12-root-rebuild-v0.fold-coordinate-candidate.nonlinear-v0.json` | false |
| `expected_mesh` | `mesh.fresh-v10-higher-fold-12-root-rebuild-v0.fold-coordinate-candidate.nonlinear-v0.json` | false |
| `expected_preledger_input_screen` | `causal_preledger_input_screen.fresh-v10-higher-fold-12-root-rebuild-v0.fold-coordinate-candidate.nonlinear-v0.json` | false |
| `expected_root_topology_certificate` | `fresh_v10_higher_fold_root_tube_interval_certificate.fold-coordinate-candidate.nonlinear-v0.v0.json` | false |
| `expected_preledger_replay` | `fold_coordinate_candidate_preledger_replay_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | false |

## Direct-Path Contrast

| Artifact | File | Present |
| --- | --- | --- |
| `lambda0305_phi_cyc` | `phi_cyc.fresh-v10-higher-fold-12-root-rebuild-v0.lambda0305.json` | true |
| `lambda0305_mesh` | `mesh.fresh-v10-higher-fold-12-root-rebuild-v0.lambda0305.json` | true |
| `lambda0305_preledger_input_screen` | `causal_preledger_input_screen.fresh-v10-higher-fold-12-root-rebuild-v0.lambda0305.json` | true |
| `lambda0305_root_topology_certificate` | `fresh_v10_higher_fold_root_tube_interval_certificate.lambda0305.v0.json` | true |
| `lambda0305_preledger_replay` | `lambda0305_preledger_replay_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json` | true |

The direct-path artifacts are not reusable for this candidate because they
materialize the `lambda=0.305` shifted-separator seed, not a fold-coordinate
history update for the boundary-opening variables.

## Row Audit

| Row | Failed side | Source variable | Receiver variable | Screen positive | Variables realized | `phi_cyc` present | Root cert present | Materialization pass |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `R_w_A04_A03` | `lo` | `fc_sigma_source_lower` | `fc_rho_receiver_lower` | true | false | false | false | false |
| `R_u_A10_A09` | `lo` | `fc_sigma_source_lower` | `fc_rho_receiver_lower` | true | false | false | false | false |
| `R_u_A07_A06` | `hi` | `fc_sigma_source_upper` | `fc_rho_receiver_upper` | true | false | false | false | false |

## Required-Field Audit

| Field | Rows certified |
| --- | ---: |
| `screen_positive_candidate_change_row` | 3 / 3 |
| `fold_coordinate_variables_present` | 3 / 3 |
| `fold_coordinate_variables_have_history_realization` | 0 / 3 |
| `same_packet_phi_cyc_materialized` | 0 / 3 |
| `same_packet_mesh_materialized` | 0 / 3 |
| `same_packet_preledger_input_screen_materialized` | 0 / 3 |
| `candidate_root_topology_certificate_present` | 0 / 3 |
| `candidate_preledger_replay_present` | 0 / 3 |
| `direct_path_artifacts_reusable_for_fold_coordinate_candidate` | 0 / 3 |
| `materialization_ready_row` | 0 / 3 |
| `row_consumed` | 0 / 3 |
| `branch_chart_authorized` | 0 / 3 |

## Closure Burden

The next mathematical object is a fold-coordinate realization theorem or
generator extension. It must state how
`fc_sigma_source_lower`, `fc_rho_receiver_lower`,
`fc_sigma_source_upper`, and `fc_rho_receiver_upper` become a finite
same-packet update of the candidate history and mesh. Only after that rule
exists can the topology certificate and proof-interval preledger be rerun for a
fold-coordinate candidate.

## Capture Decision

Priority-only materialization audit. This packet should not be promoted into
authored AAA prose because it is diagnostic and fail-closed. It does sharpen the
current blocker from "candidate artifacts absent" to the exact missing
mathematical object: a history-realization rule for the fold-coordinate
boundary-opening variables.
