# Independent Target Ref/Value Equation Promotion Rule Without Contract Link Proof Attempt

## Verdict

Status: priority-only-fold-coordinate-endpoint-functional-independent-target-ref-value-equation-promotion-rule-without-contract-link-proof-attempt-fail-closed-target-present-source-inputs-present-rule-derivation-soundness-application-absent-no-row-consumption

This priority-only packet tests whether the candidate promotion-rule target can
be discharged by deriving a promotion rule from existing source data. It imports
the independent target ref/value equations without contract link proof attempt
and the promotion-rule target note. It is not a primitive-rule acceptance,
target-satisfaction, compatibility, binding-contract, row-consumption, or
branch-chart packet.

The attempt remains fail-closed. It records 4 / 4
promotion-rule target-note inputs, 4 / 4
target-note hash matches, 4 / 4
target ref/value source-input bundles, 4 / 4
source-equation sets, 4 / 4
source-equation-only guards, 4 / 4
endpoint-value-map-only guards, 4 / 4
value-map payload matches, 4 / 4
contract-link premise non-import guards, and 4 / 4
no-link independence guards declared. The source bundle covers 6 / 6
target ref/value source equations and 6
value-map bindings.

It records 0 / 4
promotion rules, 0 / 4
derivations, 0 / 4
soundness proofs, 0 / 4
endpoint application proofs, 0 / 4
proof-grade target ref/value equation packages, 0 / 4
target-satisfaction proofs, 0 / 4
endpoint-boundary-binding ref compatibility proofs, 0 / 4
first-primitive compatibility proofs, 0 consumed rows, and
`branch_chart_authorized=false`.

Primitive-rule acceptance is explicitly not used: 4 / 4
endpoints keep `primitive_rule_acceptance_not_used=true`.

## Source Artifacts

| Source | Artifact | SHA-256 |
| --- | --- | --- |
| independent_target_ref_value_equations_without_contract_link_proof_attempt | fold_coordinate_endpoint_functional_independent_target_ref_value_equations_without_contract_link_proof_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 27ffe0923436fb6a021e609f6d3cc43d0371acfa4546275ce130b64839a34a86 |
| independent_target_ref_value_equation_promotion_rule_without_contract_link_target | fold_coordinate_endpoint_functional_independent_target_ref_value_equation_promotion_rule_without_contract_link_target.md | 60d4e68fa0be4de6603ed93e334882b083605616dd84421050c5caa88f61e69a |

## Target

Derive the independent target ref/value equation promotion rule without importing `witness_object_has_contract_link`.

Accepted if: Each endpoint has a derived promotion-rule statement, no-link derivation, soundness proof, endpoint application proof, and proof-grade target ref/value equation package.

## No Primitive Acceptance

The candidate target note is an obligation record only. It is not a proof-grade promotion rule, and this attempt does not accept the rule as a primitive.

## No-Promotion Rule

Target endpoint refs/values, source equations, endpoint-value-map certifications, payload matches, and no-link guards are not promoted into proof-grade target ref/value equations without a derived promotion rule, derivation, soundness proof, and endpoint application proof.

## Proof Burdens

| Burden | Missing field | Required evidence |
| --- | --- | --- |
| promotion_rule_statement_from_existing_source_data | independent_target_ref_value_equation_promotion_rule_without_contract_link_present | A proof-grade rule statement derived from target objects, endpoint value maps, source-equation-only guards, endpoint-value-map-only guards, payload matches, and no-link guards. |
| promotion_rule_derivation_without_contract_link | independent_target_ref_value_equation_derivation_without_contract_link_present | A derivation of the promotion rule that does not import `witness_object_has_contract_link` directly or through a selected route. |
| promotion_rule_soundness_without_contract_link | independent_target_ref_value_equation_soundness_without_contract_link_present | A soundness proof that source equations and endpoint-value-map certifications are not renamed as proof-grade target ref/value equations. |
| promotion_rule_endpoint_application_without_contract_link | independent_target_ref_value_equation_endpoint_application_without_contract_link_present | Endpoint-by-endpoint application proof for all four endpoint functionals. |
| proof_grade_target_ref_value_equations_without_contract_link | independent_target_ref_value_equations_without_contract_link_proof_grade | A proof-grade target ref/value equation package produced only after the rule, derivation, soundness proof, and endpoint application proof are present. |

## Tested Promotion Rule Routes

| Route | Status | Required fields | Limitation |
| --- | --- | --- | --- |
| candidate_target_note_as_present_promotion_rule | rejected-target-note-only | candidate_promotion_rule_target_note_input_present, independent_target_ref_value_equation_promotion_rule_without_contract_link_present | The target note states a rule target; it is not itself a proof-grade promotion rule. |
| source_inputs_as_promotion_rule_derivation | rejected-source-input-only | promotion_rule_target_source_inputs_ready, independent_target_ref_value_equation_derivation_without_contract_link_present | Ready source inputs do not derive the promotion rule without a proof step. |
| no_link_guards_as_soundness_proof | rejected-guard-only | contract_link_premise_not_imported, no_contract_link_independence_guard_declared, independent_target_ref_value_equation_soundness_without_contract_link_present | Contract-link premise non-import guards and no-link independence guards declared are necessary guards, not soundness proofs. |
| payload_match_as_endpoint_application | rejected-payload-match-only | value_map_ref_value_payload_matches_target_object, independent_target_ref_value_equation_endpoint_application_without_contract_link_present | Payload matching is not an endpoint application proof of the promotion rule. |
| primitive_rule_acceptance | rejected-decision-required | primitive_rule_acceptance_not_used, independent_target_ref_value_equation_promotion_rule_without_contract_link_present | Accepting the promotion rule as a primitive rule would be an operator decision and is not used in this proof attempt. |
| derivation_from_existing_source_data | absent | promotion_rule_target_source_inputs_ready, independent_target_ref_value_equation_promotion_rule_without_contract_link_present, independent_target_ref_value_equation_derivation_without_contract_link_present, independent_target_ref_value_equation_soundness_without_contract_link_present, independent_target_ref_value_equation_endpoint_application_without_contract_link_present, independent_target_ref_value_equations_without_contract_link_proof_grade | No derivation from existing source data supplies the promotion rule, soundness proof, endpoint application proof, or proof-grade package. |

## Endpoint Attempts

| Endpoint | Role | Source inputs ready | Link not imported | Primitive acceptance not used | Source equations | Value bindings | Payload matches | Rule | Derivation | Soundness | Endpoint application | Proof-grade package | First blockers |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| fc_sigma_source_lower | source | true | true | true | 2 | 2 | true | false | false | false | false | false | independent_target_ref_value_equation_promotion_rule_without_contract_link_present, independent_target_ref_value_equation_derivation_without_contract_link_present, independent_target_ref_value_equation_soundness_without_contract_link_present, independent_target_ref_value_equation_endpoint_application_without_contract_link_present, independent_target_ref_value_equations_without_contract_link_proof_grade |
| fc_rho_receiver_lower | receiver | true | true | true | 2 | 2 | true | false | false | false | false | false | independent_target_ref_value_equation_promotion_rule_without_contract_link_present, independent_target_ref_value_equation_derivation_without_contract_link_present, independent_target_ref_value_equation_soundness_without_contract_link_present, independent_target_ref_value_equation_endpoint_application_without_contract_link_present, independent_target_ref_value_equations_without_contract_link_proof_grade |
| fc_sigma_source_upper | source | true | true | true | 1 | 1 | true | false | false | false | false | false | independent_target_ref_value_equation_promotion_rule_without_contract_link_present, independent_target_ref_value_equation_derivation_without_contract_link_present, independent_target_ref_value_equation_soundness_without_contract_link_present, independent_target_ref_value_equation_endpoint_application_without_contract_link_present, independent_target_ref_value_equations_without_contract_link_proof_grade |
| fc_rho_receiver_upper | receiver | true | true | true | 1 | 1 | true | false | false | false | false | false | independent_target_ref_value_equation_promotion_rule_without_contract_link_present, independent_target_ref_value_equation_derivation_without_contract_link_present, independent_target_ref_value_equation_soundness_without_contract_link_present, independent_target_ref_value_equation_endpoint_application_without_contract_link_present, independent_target_ref_value_equations_without_contract_link_proof_grade |

## Row Attempts

| Row | Target input pair | Link guard pair | Promotion rule pair | Derivation pair | Soundness pair | Endpoint application pair | Ref/value proof-grade pair | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| R_w_A04_A03 | true | true | false | false | false | false | false | false |
| R_u_A10_A09 | true | true | false | false | false | false | false | false |
| R_u_A07_A06 | true | true | false | false | false | false | false | false |

## Endpoint Field Counts

| Field | Count |
| --- | ---: |
| parent_proof_attempt_input_present | 4 / 4 |
| candidate_promotion_rule_target_note_input_present | 4 / 4 |
| candidate_promotion_rule_target_hash_matches | 4 / 4 |
| target_ref_value_equations_without_contract_link_source_inputs_ready | 4 / 4 |
| target_endpoint_ref_value_source_equations_present | 4 / 4 |
| target_endpoint_ref_value_source_equations_all_source_only | 4 / 4 |
| value_map_source_equations_source_equation_only | 4 / 4 |
| endpoint_value_map_proof_grade_status_endpoint_value_map_only | 4 / 4 |
| endpoint_value_binding_map_ref_values_certified | 4 / 4 |
| value_map_ref_value_payload_matches_target_object | 4 / 4 |
| contract_link_premise_not_imported | 4 / 4 |
| no_contract_link_independence_guard_declared | 4 / 4 |
| candidate_rule_target_declared | 4 / 4 |
| witness_object_has_contract_link_excluded | 4 / 4 |
| primitive_rule_acceptance_not_used | 4 / 4 |
| promotion_rule_target_source_inputs_ready | 4 / 4 |
| independent_target_ref_value_equation_promotion_rule_without_contract_link_present | 0 / 4 |
| independent_target_ref_value_equation_derivation_without_contract_link_present | 0 / 4 |
| independent_target_ref_value_equation_soundness_without_contract_link_present | 0 / 4 |
| independent_target_ref_value_equation_endpoint_application_without_contract_link_present | 0 / 4 |
| independent_target_ref_value_equations_without_contract_link_proof_grade | 0 / 4 |
| independent_contract_target_satisfaction_without_contract_link_proof_present | 0 / 4 |
| independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present | 0 / 4 |
| independent_first_primitive_compatibility_without_contract_link_present | 0 / 4 |
| row_consumption_authorized | 0 / 4 |
| branch_chart_authorized | 0 / 4 |

## Row Field Counts

| Field | Count |
| --- | ---: |
| row_locator_resolved | 3 / 3 |
| source_promotion_rule_target_source_inputs_ready | 3 / 3 |
| receiver_promotion_rule_target_source_inputs_ready | 3 / 3 |
| combined_promotion_rule_target_source_inputs_ready | 3 / 3 |
| source_contract_link_premise_not_imported | 3 / 3 |
| receiver_contract_link_premise_not_imported | 3 / 3 |
| combined_contract_link_premise_not_imported | 3 / 3 |
| source_promotion_rule_present | 0 / 3 |
| receiver_promotion_rule_present | 0 / 3 |
| combined_promotion_rule_pair_present | 0 / 3 |
| source_derivation_present | 0 / 3 |
| receiver_derivation_present | 0 / 3 |
| combined_derivation_pair_present | 0 / 3 |
| source_soundness_present | 0 / 3 |
| receiver_soundness_present | 0 / 3 |
| combined_soundness_pair_present | 0 / 3 |
| source_endpoint_application_present | 0 / 3 |
| receiver_endpoint_application_present | 0 / 3 |
| combined_endpoint_application_pair_present | 0 / 3 |
| source_ref_value_equations_proof_grade_without_contract_link | 0 / 3 |
| receiver_ref_value_equations_proof_grade_without_contract_link | 0 / 3 |
| combined_ref_value_equations_proof_grade_without_contract_link | 0 / 3 |
| row_unblocked | 0 / 3 |
| row_consumed | 0 / 3 |
| branch_chart_authorized | 0 / 3 |

## Capture Decision

priority-only; records a fail-closed independent target-ref/value-equation-promotion-rule-without-contract-link proof attempt and does not promote to reader-facing corpus prose.
