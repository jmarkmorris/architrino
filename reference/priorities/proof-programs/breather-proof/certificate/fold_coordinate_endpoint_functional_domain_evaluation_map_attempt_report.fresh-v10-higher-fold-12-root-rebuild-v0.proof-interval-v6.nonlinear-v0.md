# Higher-Fold Fold-Coordinate Endpoint-Functional Domain/Evaluation-Map Attempt

## Verdict

The endpoint-functional domain/evaluation-map attempt fail-closes. The current
proof-program data locate all four `fc_*` endpoint targets and their row-local
endpoint values, but no artifact supplies an explicit endpoint-functional
domain chart or evaluation map.

| Quantity | Value |
| --- | ---: |
| Endpoint functionals checked | 4 |
| Endpoint locators resolved | 4 |
| Row-local endpoint values present | 4 |
| Functional target equations defined | 4 |
| Endpoint boundary bindings present | 0 |
| Endpoint-functional domains present | 0 |
| Domain charts declared | 0 |
| Domain coordinate rules declared | 0 |
| Evaluation maps declared | 0 |
| Endpoint evaluation rules declared | 0 |
| Endpoint values bound to evaluation map | 0 |
| Endpoint motion rules present | 0 |
| Exact $B\xi=0$ endpoint certificates | 0 |
| Rank certificates | 0 |
| Domain/evaluation maps constructed | 0 |
| Rows ready for domain/evaluation-map consumption | 0 |
| Method evaluations | 20 |
| Row consumption count | 0 |

## No-Go Lemma

Endpoint locations and target equations do not determine endpoint-functional domains. Without a domain chart and evaluation map, E_j(Psi_j)=+/-1 remains a desired boundary action, not a constructed linear functional on a same-packet perturbation space.

The row-local endpoint q-values remain valid locator data. They do not define
the perturbation space, the chart on that space, or the rule by which $E_j$
evaluates $\Psi_j$.

## Domain/Evaluation Rule

A fold-coordinate endpoint functional E_j requires an explicit endpoint-functional domain chart, a coordinate/evaluation rule for the perturbation basis, an endpoint-boundary binding, and a map from the basis perturbation to same-packet endpoint motion; target endpoint q-values and equations are admissible only as locator data until those objects are present.

## Methods Tested

| Method | Required fields | Description |
| --- | ---: | --- |
| `row_local_endpoint_ref_as_domain_chart` | 6 | Try to promote row-local endpoint refs and q-values into an endpoint-functional domain chart. |
| `target_equation_as_evaluation_map` | 8 | Try to promote the target equation E_j(Psi_j)=+/-1 into the endpoint evaluation map. |
| `basis_formula_as_endpoint_motion_map` | 10 | Try to build the evaluation map from an explicit same-packet basis formula and endpoint-motion rule. |
| `binding_contract_import_as_domain_evaluation_map` | 5 | Try to import an already-certified endpoint binding contract as the domain/evaluation-map certificate. |
| `exact_screen_rank_as_chart_certificate` | 5 | Try to certify the endpoint domain/evaluation map from exact screen-zero and rank data. |

## Failure Codes

| Failure code | Count |
| --- | ---: |
| `missing_basis_derivative_formula_present` | 4 |
| `missing_basis_formula_present` | 4 |
| `missing_basis_vector_bound_to_domain` | 4 |
| `missing_domain_chart_declared` | 12 |
| `missing_domain_coordinate_rule_declared` | 4 |
| `missing_endpoint_boundary_binding_present` | 8 |
| `missing_endpoint_evaluation_rule_declared` | 4 |
| `missing_endpoint_functional_domain_present` | 12 |
| `missing_endpoint_motion_rule_present` | 8 |
| `missing_endpoint_value_bound_to_evaluation_map` | 8 |
| `missing_evaluation_map_declared` | 12 |
| `missing_exact_screen_zero_certified` | 4 |
| `missing_mesh_update_rule_present` | 4 |
| `missing_non_target_endpoint_functionals_zero_certified` | 4 |
| `missing_rank_certified` | 4 |
| `missing_receiver_monotonicity_rule_present` | 4 |
| `missing_same_packet_history_update_formula_present` | 4 |
| `missing_source_monotonicity_rule_present` | 4 |
| `missing_theta_support_present` | 4 |
| `missing_x_update_basis_present` | 4 |
| `missing_xdot_update_basis_present` | 4 |

## Endpoint Domain/Evaluation Attempts

| Variable | Functional | Locator | Endpoint value | Domain chart | Evaluation map | Endpoint motion | Exact $B\xi=0$ | Constructed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `fc_sigma_source_lower` | `E_lower_source_inner_boundary` | true | true | false | false | false | false | false |
| `fc_rho_receiver_lower` | `E_raise_receiver_lower_boundary` | true | true | false | false | false | false | false |
| `fc_sigma_source_upper` | `E_raise_source_inner_boundary` | true | true | false | false | false | false | false |
| `fc_rho_receiver_upper` | `E_lower_receiver_upper_boundary` | true | true | false | false | false | false | false |

## Endpoint-Field Audit

| Field | Endpoint functionals certified |
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
| `same_packet_history_update_formula_present` | 0 / 4 |
| `non_target_endpoint_functionals_zero_certified` | 0 / 4 |
| `exact_screen_zero_certified` | 0 / 4 |
| `rank_certified` | 0 / 4 |
| `domain_evaluation_map_constructed` | 0 / 4 |

## Row Domain/Evaluation Attempts

| Row | Locator | Source map | Receiver map | Proof-grade opening | Ready |
| --- | --- | --- | --- | --- | --- |
| `R_w_A04_A03` | true | false | false | false | false |
| `R_u_A10_A09` | true | false | false | false | false |
| `R_u_A07_A06` | true | false | false | false | false |

## Row-Field Audit

| Field | Rows certified |
| --- | ---: |
| `row_locator_resolved` | 3 / 3 |
| `source_domain_evaluation_map_constructed` | 0 / 3 |
| `receiver_domain_evaluation_map_constructed` | 0 / 3 |
| `combined_domain_evaluation_pair_constructed` | 0 / 3 |
| `screen_positive_candidate_change_row` | 3 / 3 |
| `proof_grade_boundary_opening_certified` | 0 / 3 |
| `same_packet_history_update_formula_present` | 0 / 3 |
| `candidate_artifacts_present` | 0 / 3 |
| `root_topology_recertified_for_candidate_change` | 0 / 3 |
| `proof_interval_v1_v6_rerun_for_candidate_change` | 0 / 3 |
| `row_consumed` | 0 / 3 |
| `branch_chart_authorized` | 0 / 3 |

## Closure Burden

The next mathematical object must supply the missing domain and evaluation
layer itself: an endpoint-functional domain chart, domain coordinate rule,
endpoint-boundary binding, evaluation map, endpoint evaluation rule, basis
formula, derivative formula, same-packet history update, mesh and endpoint
motion rules, monotonicity preservation, exact $B\xi=0$, rank certification,
candidate artifacts, topology recertification, and v1-v6 replay. Without those
fields, no endpoint-functional basis, row consumption, preledger pass, or
branch chart is authorized.

## Capture Decision

Priority-only theorem attempt. This packet confirms that the current blocker is
not another endpoint locator audit: the missing object is the explicit
endpoint-functional domain/evaluation-map construction. It is not ready for
authored AAA prose because it records a fail-closed obstruction rather than a
completed proof.
