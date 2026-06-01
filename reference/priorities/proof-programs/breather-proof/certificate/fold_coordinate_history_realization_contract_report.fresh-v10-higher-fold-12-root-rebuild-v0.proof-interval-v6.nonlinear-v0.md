# Higher-Fold Fold-Coordinate History-Realization Contract

## Verdict

The fold-coordinate history-realization contract is now explicit, but no
history-realization proof is supplied yet. The contract defines the finite
same-packet update that a future generator must satisfy before candidate
`phi_cyc`, `mesh`, preledger input, topology, or preledger replay artifacts
can be accepted.

| Quantity | Value |
| --- | ---: |
| Contract rows | 3 |
| Screen-positive rows | 3 |
| Fold-coordinate variables | 4 |
| Variables with contract defined | 4 |
| Variables with realization supplied | 0 |
| Variable realization fields per variable | 8 |
| Packet generator fields | 16 |
| Source bindings | 4 |
| Replay plan stages | 6 |
| Signed boundary-delta contract rows | 3 |
| Candidate artifacts present | 0 / 5 |
| Contract-ready rows | 0 |
| Row consumption count | 0 |

## Theorem Contract

The required same-packet form is

$$
X_{\mathrm{fc}}(\theta;\xi)
= X_{\mathrm{fresh}}(\theta)
+ \Delta X_{\mathrm{fc}}(\theta;\xi),
\qquad
\Delta X_{\mathrm{fc}}(\theta;\xi)
= \sum_j \xi_j \Psi_j(\theta).
$$

The derivative contract is

$$
\dot X_{\mathrm{fc}}(\theta;\xi)
= \dot X_{\mathrm{fresh}}(\theta)
+ \sum_j \xi_j \frac{d\Psi_j}{d\theta}(\theta).
$$

Each basis function $\Psi_j$ must supply:
`same_packet_history_update_formula`, `theta_support`, `x_update_basis`, `xdot_update_basis`, `mesh_update_rule`, `endpoint_motion_rule`, `source_monotonicity_rule`, `receiver_monotonicity_rule`.

The current $B\xi$ evidence is only screen-level: tolerance verification is
`true`,
exact zero certification is
`false`, and
rank certification is `false`.

## Variable Contracts

| Variable | Source symbol | Witness coefficient | Signed boundary contract | Realization fields present | Realization supplied |
| --- | --- | ---: | --- | ---: | --- |
| `fc_sigma_source_lower` | `sigma_source_lower` | `0.5` | `decrease source inner lower boundary by sigma_source_lower` | 0 / 8 | false |
| `fc_rho_receiver_lower` | `rho_receiver_lower` | `0.5` | `increase receiver lower boundary by rho_receiver_lower` | 0 / 8 | false |
| `fc_sigma_source_upper` | `sigma_source_upper` | `0.5` | `increase source inner upper boundary by sigma_source_upper` | 0 / 8 | false |
| `fc_rho_receiver_upper` | `rho_receiver_upper` | `0.5` | `decrease receiver upper boundary by rho_receiver_upper` | 0 / 8 | false |

## Row Boundary Contract

| Row | Failed side | Source variable | Source delta | Receiver variable | Receiver delta | Combined opening | Margin | Contract pass |
| --- | --- | --- | ---: | --- | ---: | ---: | ---: | --- |
| `R_w_A04_A03` | `lo` | `fc_sigma_source_lower` | `-0.5` | `fc_rho_receiver_lower` | `0.5` | `1` | `0.999973308003475` | false |
| `R_u_A10_A09` | `lo` | `fc_sigma_source_lower` | `-0.5` | `fc_rho_receiver_lower` | `0.5` | `1` | `0.999973308003475` | false |
| `R_u_A07_A06` | `hi` | `fc_sigma_source_upper` | `0.5` | `fc_rho_receiver_upper` | `-0.5` | `1` | `0.999753815697289` | false |

Lower-side rows require a source lower-boundary decrease and a receiver
lower-boundary increase. The upper-side row requires a source upper-boundary
increase and a receiver upper-boundary decrease. These signed deltas encode the
screen inequality as an actual boundary-motion contract; they are not yet a
same-packet history update.

## Generator Contract

Required packet fields are:
`base_packet_id`, `candidate_run_id`, `candidate_packet_id`, `artifact_stem`, `source_bindings`, `coefficient_assignment`, `delta_x_formula`, `periodic_extension_rule`, `phi_cyc_writer`, `mesh_writer`, `preledger_input_screen_writer`, `candidate_artifact_namespace`, `candidate_replay_output_dir`, `root_topology_recertification_rule`, `proof_interval_v1_v6_replay_rule`, `v1_to_v6_previous_ledger_plan`.

The candidate artifact namespace is
`fresh-v10-higher-fold-12-root-rebuild-v0.fold-coordinate-candidate.nonlinear-v0`.

The candidate replay output directory is
`/private/tmp/proof-programs-fold-coordinate-candidate-nonlinear-v0/preledger`. This directory
carries the fold-coordinate candidate identity because the preledger scripts
emit hard-coded proof-interval basenames.

| Artifact | Expected file | Present |
| --- | --- | --- |
| `expected_phi_cyc` | `phi_cyc.fresh-v10-higher-fold-12-root-rebuild-v0.fold-coordinate-candidate.nonlinear-v0.json` | false |
| `expected_mesh` | `mesh.fresh-v10-higher-fold-12-root-rebuild-v0.fold-coordinate-candidate.nonlinear-v0.json` | false |
| `expected_preledger_input_screen` | `causal_preledger_input_screen.fresh-v10-higher-fold-12-root-rebuild-v0.fold-coordinate-candidate.nonlinear-v0.json` | false |
| `expected_root_topology_certificate` | `fresh_v10_higher_fold_root_tube_interval_certificate.fold-coordinate-candidate.nonlinear-v0.v0.json` | false |
| `expected_preledger_replay` | `fold_coordinate_candidate_preledger_replay_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | false |

Replay order:

1. emit candidate `phi_cyc`;
2. emit candidate `mesh`;
3. emit candidate preledger input screen;
4. rerun candidate root-tube binary64 certificate;
5. rerun candidate root-tube outward-rational interval certificate;
6. rerun proof-interval preledger v1 through v6 in the candidate namespace.

The direct-path `lambda=0.305` artifacts remain contrast artifacts only. They
do not satisfy this fold-coordinate realization contract.

## Required-Field Audit

| Field | Rows certified |
| --- | ---: |
| `screen_positive_candidate_change_row` | 3 / 3 |
| `source_boundary_delta_contract_defined` | 3 / 3 |
| `receiver_boundary_delta_contract_defined` | 3 / 3 |
| `same_packet_history_update_formula_supplied` | 0 / 3 |
| `theta_support_supplied` | 0 / 3 |
| `x_update_basis_supplied` | 0 / 3 |
| `xdot_update_basis_supplied` | 0 / 3 |
| `mesh_update_rule_supplied` | 0 / 3 |
| `endpoint_motion_rule_supplied` | 0 / 3 |
| `source_monotonicity_rule_supplied` | 0 / 3 |
| `receiver_monotonicity_rule_supplied` | 0 / 3 |
| `candidate_phi_cyc_writer_authorized` | 0 / 3 |
| `candidate_mesh_writer_authorized` | 0 / 3 |
| `candidate_preledger_input_screen_writer_authorized` | 0 / 3 |
| `root_topology_recertified_for_candidate_change` | 0 / 3 |
| `proof_interval_v1_v6_rerun_for_candidate_change` | 0 / 3 |
| `row_consumed` | 0 / 3 |
| `branch_chart_authorized` | 0 / 3 |

## Capture Decision

Priority-only theorem/generator contract. This is not ready for authored AAA
promotion because it supplies the exact proof burden rather than the proof. It
does close the previous ambiguity: candidate artifact emission is blocked until
the four `fc_*` variables have same-packet basis functions, derivative
consistency, mesh and endpoint update rules, monotonicity preservation, root
topology recertification, and a v1-v6 preledger replay in the candidate
namespace.
