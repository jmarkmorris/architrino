# Higher-Fold Fold-Coordinate Endpoint-Functional Domain/Evaluation-Map Contract

## Verdict

The endpoint-functional domain/evaluation-map contract is now explicit, but no
realization is supplied. The packet declares the domain chart and evaluation
map objects required for all four `fc_*` endpoint functionals, while keeping
all row-consumption and branch-chart locks closed.

| Quantity | Value |
| --- | ---: |
| Endpoint functionals | 4 |
| Endpoint contracts declared | 4 |
| Endpoint realizations supplied | 0 |
| Domain charts realized | 0 |
| Evaluation maps realized | 0 |
| Endpoint motion rules realized | 0 |
| Exact $B\xi=0$ certificates realized | 0 |
| Rank certificates realized | 0 |
| Contract-ready rows | 0 |
| Row consumption count | 0 |

## Contract Rule

A fold-coordinate endpoint functional is contract-ready only after the row-local endpoint locator is paired with an explicit endpoint-functional domain, domain chart, domain coordinate rule, basis vector binding, evaluation map, endpoint evaluation rule, endpoint motion rule, non-target zero rule, exact $B\xi=0$ certificate, rank certificate, same-packet candidate artifacts, topology recertification, and proof-interval v1-v6 replay.

Endpoint locations, row-local endpoint q-values, screen coefficients, and target equations $E_j(\Psi_j)=\pm 1$ do not determine endpoint-functional domains or evaluation maps. Without an explicit domain chart, coordinate rule, evaluation map, endpoint-motion rule, and exact same-packet replay certificates, $E_j(\Psi_j)=\pm 1$ remains a desired boundary action rather than a constructed functional.

Do not promote endpoint refs, scalar endpoint q-values, target equations, or tolerance-level $B\xi$ residuals into endpoint-functional domain/evaluation-map data.

## Endpoint Contracts

| Variable | Functional | Contract declared | Realization fields present | Realization supplied | Target equation |
| --- | --- | --- | ---: | --- | --- |
| `fc_sigma_source_lower` | `E_lower_source_inner_boundary` | true | 0 / 26 | false | `E_lower_source_inner_boundary(Psi_fc_sigma_source_lower) = -1` |
| `fc_rho_receiver_lower` | `E_raise_receiver_lower_boundary` | true | 0 / 26 | false | `E_raise_receiver_lower_boundary(Psi_fc_rho_receiver_lower) = +1` |
| `fc_sigma_source_upper` | `E_raise_source_inner_boundary` | true | 0 / 26 | false | `E_raise_source_inner_boundary(Psi_fc_sigma_source_upper) = +1` |
| `fc_rho_receiver_upper` | `E_lower_receiver_upper_boundary` | true | 0 / 26 | false | `E_lower_receiver_upper_boundary(Psi_fc_rho_receiver_upper) = -1` |

## Contract Declaration Audit

| Field | Endpoint contracts declared |
| --- | ---: |
| `endpoint_locator_declared` | 4 / 4 |
| `row_local_endpoint_value_declared` | 4 / 4 |
| `target_equation_declared` | 4 / 4 |
| `target_action_sign_declared` | 4 / 4 |
| `endpoint_functional_domain_symbol_declared` | 4 / 4 |
| `domain_chart_symbol_declared` | 4 / 4 |
| `domain_coordinate_rule_declared` | 4 / 4 |
| `basis_vector_domain_binding_declared` | 4 / 4 |
| `evaluation_map_symbol_declared` | 4 / 4 |
| `endpoint_evaluation_rule_declared` | 4 / 4 |
| `endpoint_motion_rule_declared` | 4 / 4 |
| `non_target_zero_rule_declared` | 4 / 4 |
| `exact_screen_rank_replay_requirements_declared` | 4 / 4 |

## Endpoint Required-Field Audit

| Field | Endpoint contracts certified |
| --- | ---: |
| `endpoint_locator_resolved` | 4 / 4 |
| `row_local_endpoint_value_present` | 4 / 4 |
| `functional_target_equation_defined` | 4 / 4 |
| `target_action_sign_consistent` | 4 / 4 |
| `endpoint_boundary_binding_present` | 0 / 4 |
| `endpoint_functional_domain_present` | 0 / 4 |
| `domain_chart_declared` | 0 / 4 |
| `domain_coordinate_rule_declared` | 0 / 4 |
| `basis_vector_bound_to_domain` | 0 / 4 |
| `evaluation_map_declared` | 0 / 4 |
| `endpoint_evaluation_rule_declared` | 0 / 4 |
| `endpoint_value_bound_to_evaluation_map` | 0 / 4 |
| `theta_support_present` | 0 / 4 |
| `basis_formula_present` | 0 / 4 |
| `basis_derivative_formula_present` | 0 / 4 |
| `x_update_basis_present` | 0 / 4 |
| `xdot_update_basis_present` | 0 / 4 |
| `mesh_update_rule_present` | 0 / 4 |
| `endpoint_motion_rule_present` | 0 / 4 |
| `source_monotonicity_rule_present` | 0 / 4 |
| `receiver_monotonicity_rule_present` | 0 / 4 |
| `periodic_extension_rule_present` | 0 / 4 |
| `c1_gluing_rule_present` | 0 / 4 |
| `same_packet_history_update_formula_present` | 0 / 4 |
| `non_target_endpoint_functionals_zero_certified` | 0 / 4 |
| `exact_screen_zero_certified` | 0 / 4 |
| `rank_certified` | 0 / 4 |
| `domain_evaluation_map_constructed` | 0 / 4 |

## Realization-Field Audit

| Field | Endpoint realizations present |
| --- | ---: |
| `endpoint_boundary_binding` | 0 / 4 |
| `endpoint_functional_domain` | 0 / 4 |
| `domain_chart` | 0 / 4 |
| `domain_coordinate_rule` | 0 / 4 |
| `basis_vector_bound_to_domain` | 0 / 4 |
| `evaluation_map` | 0 / 4 |
| `endpoint_evaluation_rule` | 0 / 4 |
| `endpoint_value_bound_to_evaluation_map` | 0 / 4 |
| `theta_support` | 0 / 4 |
| `basis_formula` | 0 / 4 |
| `basis_derivative_formula` | 0 / 4 |
| `x_update_basis` | 0 / 4 |
| `xdot_update_basis` | 0 / 4 |
| `mesh_update_rule` | 0 / 4 |
| `endpoint_motion_rule` | 0 / 4 |
| `source_monotonicity_rule` | 0 / 4 |
| `receiver_monotonicity_rule` | 0 / 4 |
| `periodic_extension_rule` | 0 / 4 |
| `c1_gluing_rule` | 0 / 4 |
| `same_packet_history_update_formula` | 0 / 4 |
| `non_target_endpoint_functionals_zero_certificate` | 0 / 4 |
| `exact_B_xi_zero_certificate` | 0 / 4 |
| `rank_certificate` | 0 / 4 |
| `candidate_artifact_writers` | 0 / 4 |
| `root_topology_recertification` | 0 / 4 |
| `proof_interval_v1_v6_replay` | 0 / 4 |

## Row Contracts

| Row | Locator | Source contract | Receiver contract | Domain/evaluation pair constructed | Signed delta contract | Ready |
| --- | --- | --- | --- | --- | --- | --- |
| `R_w_A04_A03` | true | true | true | false | true | false |
| `R_u_A10_A09` | true | true | true | false | true | false |
| `R_u_A07_A06` | true | true | true | false | true | false |

## Row-Field Audit

| Field | Rows certified |
| --- | ---: |
| `row_locator_resolved` | 3 / 3 |
| `source_domain_evaluation_map_constructed` | 0 / 3 |
| `receiver_domain_evaluation_map_constructed` | 0 / 3 |
| `combined_domain_evaluation_pair_constructed` | 0 / 3 |
| `screen_positive_candidate_change_row` | 3 / 3 |
| `signed_boundary_delta_contract_defined` | 3 / 3 |
| `proof_grade_boundary_opening_certified` | 0 / 3 |
| `same_packet_history_update_formula_present` | 0 / 3 |
| `candidate_artifacts_present` | 0 / 3 |
| `root_topology_recertified_for_candidate_change` | 0 / 3 |
| `proof_interval_v1_v6_rerun_for_candidate_change` | 0 / 3 |
| `row_consumed` | 0 / 3 |
| `branch_chart_authorized` | 0 / 3 |

## Closure Burden

The immediate proof object is no longer a locator, binding-label, or target
equation audit. A constructive successor must provide the same-packet
$\Psi_j$ formulas and the domain/evaluation-map realization for every
`fc_*` endpoint functional, then emit candidate artifacts, recertify root
topology, and rerun proof-interval v1-v6 in the candidate namespace before any
one-leaf row can be consumed.

## Capture Decision

Priority-only theorem/generator contract. This packet is useful because it
fixes the exact mathematical object required next. It is not ready for authored
AAA prose because it defines a burden rather than proving a branch certificate.
