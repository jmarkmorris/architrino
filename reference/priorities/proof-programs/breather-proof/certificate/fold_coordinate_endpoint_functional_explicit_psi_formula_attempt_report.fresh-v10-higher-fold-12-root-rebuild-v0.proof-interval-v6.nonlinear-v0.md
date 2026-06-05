# Higher-Fold Fold-Coordinate Endpoint-Functional Explicit Psi Formula Attempt

## Verdict

The packet writes concrete endpoint-local cubic $\Psi_j$ formula candidates for
all four `fc_*` endpoint variables. The local interpolation identities pass:
4 / 4 formulas and derivatives are declared, and 4 / 4 target endpoint actions
evaluate exactly to the contract sign. The attempt still fail-closes because
0 / 4 formulas are promoted to same-packet endpoint-functional
domain/evaluation maps, 0 / 4 non-target zero certificates are supplied, and
0 / 3 row-ready domain/evaluation pairs are constructed.

| Quantity | Value |
| --- | ---: |
| Endpoint functionals | 4 |
| Explicit $\Psi_j$ formula candidates declared | 4 |
| Local target actions exact | 4 |
| Explicit $\Psi_j$ formulas constructed | 0 |
| Endpoint domain/evaluation maps constructed | 0 |
| Non-target zero certificates | 0 |
| Candidate-only method passes | 4 |
| Proof method passes | 0 |
| Row formula-candidate pairs declared | 3 |
| Row domain/evaluation pairs constructed | 0 |
| Row-ready count | 0 |
| Row consumption count | 0 |

## Formula Rule

For each endpoint component with theta interval [L,R], use s=(theta-L)/(R-L). A lo-theta endpoint uses H_left(s)=1-3s^2+2s^3; a hi-theta endpoint uses H_right(s)=3s^2-2s^3; the component is multiplied by the endpoint contract target_sign.

Lower `fc_*` variables are component-union candidates over two row intervals; upper `fc_*` variables are single-component candidates. Component unions remain formula candidates until a global same-packet domain chart and gluing rule are constructed.

Do not promote endpoint-local polynomial identities into same-packet endpoint-functional maps unless the packet also supplies endpoint boundary binding, endpoint-functional domain/chart/rule, evaluation map, endpoint-motion rule, non-target zero certificate, exact $B\xi=0$, rank, topology recertification, and proof-interval v1-v6 replay.

## Endpoint Attempts

| Variable | Functional | Support intervals | Formula candidate | Local target exact | Formula constructed | Domain/evaluation map | Target equation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `fc_sigma_source_lower` | `E_lower_source_inner_boundary` | `A03, A09` | true | true | false | false | `E_lower_source_inner_boundary(Psi_fc_sigma_source_lower) = -1` |
| `fc_rho_receiver_lower` | `E_raise_receiver_lower_boundary` | `A04, A10` | true | true | false | false | `E_raise_receiver_lower_boundary(Psi_fc_rho_receiver_lower) = +1` |
| `fc_sigma_source_upper` | `E_raise_source_inner_boundary` | `A06` | true | true | false | false | `E_raise_source_inner_boundary(Psi_fc_sigma_source_upper) = +1` |
| `fc_rho_receiver_upper` | `E_lower_receiver_upper_boundary` | `A07` | true | true | false | false | `E_lower_receiver_upper_boundary(Psi_fc_rho_receiver_upper) = -1` |

## Support Components

| Basis | Row | Support interval | Endpoint ref | Theta anchor | Shape | Local identity exact |
| --- | --- | --- | --- | --- | --- | --- |
| `Psi_fc_sigma_source_lower` | `R_w_A04_A03` | `A03` | `source_inner_range_q.lo` | `hi` | `H_right` | true |
| `Psi_fc_sigma_source_lower` | `R_u_A10_A09` | `A09` | `source_inner_range_q.lo` | `hi` | `H_right` | true |
| `Psi_fc_rho_receiver_lower` | `R_w_A04_A03` | `A04` | `receiver_range_q.lo` | `lo` | `H_left` | true |
| `Psi_fc_rho_receiver_lower` | `R_u_A10_A09` | `A10` | `receiver_range_q.lo` | `lo` | `H_left` | true |
| `Psi_fc_sigma_source_upper` | `R_u_A07_A06` | `A06` | `source_inner_range_q.hi` | `hi` | `H_right` | true |
| `Psi_fc_rho_receiver_upper` | `R_u_A07_A06` | `A07` | `receiver_range_q.hi` | `hi` | `H_right` | true |

## Method Audit

| Method | Endpoint passes |
| --- | ---: |
| `component_local_cubic_endpoint_shape_identity` | 4 / 4 |
| `component_union_as_same_packet_endpoint_basis` | 0 / 4 |
| `local_target_action_as_evaluation_map` | 0 / 4 |
| `explicit_psi_candidate_as_row_consumption` | 0 / 4 |

## Formula-Field Audit

| Field | Endpoint formula fields |
| --- | ---: |
| `explicit_psi_formula_declared` | 4 / 4 |
| `explicit_psi_derivative_formula_declared` | 4 / 4 |
| `explicit_psi_support_declared` | 4 / 4 |
| `explicit_psi_coordinate_domain_declared` | 4 / 4 |
| `explicit_psi_periodic_extension_rule_declared` | 0 / 4 |
| `explicit_psi_c1_gluing_rule_declared` | 0 / 4 |
| `explicit_psi_bound_to_fc_variable` | 4 / 4 |
| `explicit_psi_endpoint_boundary_binding_declared` | 4 / 4 |
| `explicit_psi_endpoint_motion_rule_declared` | 4 / 4 |
| `explicit_psi_endpoint_evaluation_rule_declared` | 4 / 4 |
| `explicit_psi_target_action_evaluated` | 4 / 4 |
| `explicit_psi_target_action_exact` | 4 / 4 |
| `explicit_psi_non_target_actions_evaluated` | 0 / 4 |
| `explicit_psi_non_target_actions_zero_certified` | 0 / 4 |
| `explicit_psi_same_packet_history_update_declared` | 0 / 4 |
| `explicit_psi_mesh_update_rule_declared` | 0 / 4 |
| `explicit_psi_promoted_to_domain_evaluation_map` | 0 / 4 |
| `explicit_psi_formula_constructed` | 0 / 4 |

## Proof-Field Audit

| Field | Endpoint proof fields |
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

## Row Attempts

| Row | Formula pair declared | Local target pair exact | Formula pair constructed | Domain/evaluation pair constructed | Screen positive | Signed delta contract | Ready |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `R_w_A04_A03` | true | true | false | false | true | true | false |
| `R_u_A10_A09` | true | true | false | false | true | true | false |
| `R_u_A07_A06` | true | true | false | false | true | true | false |

## Row-Field Audit

| Field | Rows certified |
| --- | ---: |
| `row_locator_resolved` | 3 / 3 |
| `source_endpoint_contract_declared` | 3 / 3 |
| `receiver_endpoint_contract_declared` | 3 / 3 |
| `source_formula_candidate_declared` | 3 / 3 |
| `receiver_formula_candidate_declared` | 3 / 3 |
| `source_explicit_psi_formula_constructed` | 0 / 3 |
| `receiver_explicit_psi_formula_constructed` | 0 / 3 |
| `source_target_action_exact` | 3 / 3 |
| `receiver_target_action_exact` | 3 / 3 |
| `source_non_target_zero_certified` | 0 / 3 |
| `receiver_non_target_zero_certified` | 0 / 3 |
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

The explicit formula candidate removes one ambiguity: the endpoint-local
polynomial identities are no longer missing. What remains is the global
same-packet construction burden. A successor must bind these candidates to a
domain chart and evaluation map, solve gluing/periodicity as a same-packet
history update, certify all non-target endpoint functionals vanish, and replay
the candidate through exact $B\xi=0$, rank, topology, and proof-interval v1-v6
checks before any row can be consumed.

## Capture Decision

Priority-only formula attempt. This packet is useful because it separates the
local $\Psi_j$ formula identities from the still-missing same-packet
domain/evaluation construction. It is not ready for authored AAA prose because
it is a failed construction packet rather than a branch certificate.
