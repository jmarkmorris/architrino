# Ref/Value Non-Domain Carrier-Pair Theorem Attempt

## Verdict

Status: priority-only-fold-coordinate-endpoint-functional-ref-value-non-domain-carrier-pair-theorem-attempt-fail-closed-source-pairs-and-rule-targets-present-carrier-introduction-rules-derivations-soundness-application-proofs-and-same-packet-carrier-pair-absent-no-row-consumption

This priority-only packet tests the first exact blocker isolated by the
independent constructed witness-object membership theorem attempt:
`ref_value_non_domain_carrier_pair_constructed`. It asks whether the current
same-packet source data can be raised into a theorem constructing the
endpoint-boundary-binding ref and endpoint value-binding map as non-domain
carrier fields in one same-packet witness object.

The attempt remains fail-closed. It records 4 / 4
ref/value source pairs, 4 / 4
ref carrier source candidates, 4 / 4
value-map carrier source candidates, and 4 / 4
carrier-pair rule targets. It records 0 / 4
ref carrier rules, 0 / 4
value-map carrier rules, 0 / 4
joint carrier-pair rules, 0 / 4
soundness proofs, 0 / 4
application proofs, and 0 / 4
constructed carrier pairs. It consumes 0 rows and
authorizes no branch chart.

## Source Artifacts

| Source | Artifact | SHA-256 |
| --- | --- | --- |
| independent_constructed_witness_object_membership_theorem_attempt | fold_coordinate_endpoint_functional_independent_constructed_witness_object_membership_theorem_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 8c78172679c8fe5e580a04a3511e090bb7da54b61aaf8cd2d8ba18eaccf28e67 |
| ref_value_non_domain_carrier_rule_target | fold_coordinate_endpoint_functional_ref_value_non_domain_carrier_rule_target.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 5683b5c1e49282d96f3bb67fb6af26590c6cac6948599e98405aa2e1f43ca1c1 |
| ref_value_carrier_introduction_route_decision | fold_coordinate_endpoint_functional_ref_value_carrier_introduction_route_decision.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 9fbf4e6bd4bbec9f8cfb10ee3bd311f6009de0ddf25ee18771805d0a7c1fdf41 |
| same_packet_constructed_witness_object_identity_attempt | fold_coordinate_endpoint_functional_same_packet_constructed_witness_object_identity_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 9d86723d45faa601df0a6bacc41122dcaac1b616d49915e1695e152725a75bd9 |
| non_domain_carrier_obstruction_packet | fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_non_domain_carrier_obstruction_packet.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | bcd2fd6b78b82338003146cf227b3071c5eb865f8dc79dcffb9947bbc42a9898 |
| endpoint_boundary_binding_ref_carrier_full_binding | fold_coordinate_endpoint_functional_endpoint_boundary_binding_ref_carrier_full_binding_construction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 6904d4a57e58918918ca5583a44c50cd3150967e4fdd9000f78178621b04c5be |
| endpoint_value_binding_map | fold_coordinate_endpoint_functional_endpoint_value_binding_map_construction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | be4bd97a224256f16b2a8b538834841238ddaf2bbe12f35fac005260f8b4004e |

## Theorem Target

For each endpoint functional, construct the endpoint-boundary-binding ref and endpoint value-binding map as non-domain carrier fields of one same-packet witness object using proof-grade carrier-introduction rules, derivations, soundness proof, and application proof.

Accepted as blocker discharge if: Every endpoint has the rule fields, carrier-pair output fields, theorem derivation, theorem soundness proof, and endpoint application proof; every residual row then has source/receiver carrier-pair theorem outputs.

First exact blocker: ref_carrier_introduction_rule_available and value_map_carrier_introduction_rule_available, with joint blocker ref_value_carrier_pair_rule_available

## No-Promotion Rule

A ref/value source pair, source-candidate declaration, carrier-obstruction record, or carrier-pair rule target does not construct a non-domain carrier pair without proof-grade rule derivation, soundness, and endpoint application.

## Proof Burdens

| Burden | Missing field | Required evidence |
| --- | --- | --- |
| endpoint_boundary_binding_ref_carrier_introduction_rule | ref_carrier_introduction_rule_available | A proof-grade rule that promotes the endpoint-boundary-binding ref source handle into a same-packet non-domain witness-object carrier field. |
| endpoint_value_binding_map_carrier_introduction_rule | value_map_carrier_introduction_rule_available | A proof-grade rule that promotes the endpoint value-binding map source handle into a same-packet non-domain witness-object carrier field. |
| ref_value_carrier_pair_rule | ref_value_carrier_pair_rule_available | A joint rule proving that the ref carrier and value-map carrier occupy one same-packet witness object. |
| ref_carrier_rule_derivation | ref_carrier_rule_derivation_present | A derivation of the ref carrier-introduction rule from the endpoint-boundary-binding construction contract. |
| value_map_carrier_rule_derivation | value_map_carrier_rule_derivation_present | A derivation of the value-map carrier-introduction rule from the endpoint value-binding map contract. |
| carrier_rule_soundness | carrier_rule_soundness_proof_present | A soundness proof that the rule preserves the same-packet witness-object carrier contract and does not promote source handles by adjacency. |
| carrier_rule_application | carrier_rule_application_proof_present | Endpoint-by-endpoint application proof verifying every premise of the carrier-introduction rule. |
| same_packet_ref_carrier_field | same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed | A constructed non-domain carrier field for the endpoint-boundary-binding ref in the same witness object. |
| same_packet_value_map_carrier_field | same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed | A constructed non-domain carrier field for the endpoint value-binding map in the same witness object. |
| same_witness_object_carrier_pair_proof | ref_value_carrier_fields_same_witness_object_proven | A proof that the ref carrier field and value-map carrier field belong to one same-packet witness object. |
| ref_value_non_domain_carrier_pair | ref_value_non_domain_carrier_pair_constructed | A constructed ref/value non-domain carrier pair with both fields proved to belong to one same-packet witness object. |
| carrier_pair_theorem_derivation | carrier_pair_theorem_derivation_present | A derivation that the rule outputs imply `ref_value_non_domain_carrier_pair_constructed` for each endpoint. |
| carrier_pair_theorem_soundness | carrier_pair_theorem_soundness_proof_present | A theorem-level soundness proof that the carrier pair is not inferred from source-handle adjacency. |
| carrier_pair_theorem_application | carrier_pair_theorem_application_proof_present | Endpoint-level application proof for the carrier-pair theorem on all four endpoint functionals. |

## Tested Routes

| Route | Status | Required fields | Limitation |
| --- | --- | --- | --- |
| direct_source_handle_promotion_route | rejected-unsound-with-current-evidence | domain_chart_carrier_subfield_constructed, ref_value_source_pair_ready, source_endpoint_boundary_binding_ref_constructed, source_witness_object_has_endpoint_boundary_binding_ref, source_endpoint_value_binding_map_constructed, source_witness_object_has_endpoint_value_binding_map, endpoint_boundary_binding_ref_carrier_source_candidate_declared, endpoint_value_binding_map_carrier_source_candidate_declared, non_domain_carrier_obstruction_present, carrier_rule_target_declared, direct_source_promotion_rejected, carrier_rule_soundness_proof_present, carrier_rule_application_proof_present, ref_value_non_domain_carrier_pair_constructed | Source endpoint-boundary-binding refs and endpoint value-binding maps remain source handles and source candidates; they cannot be promoted into carrier fields by adjacency, matching ids, or witness-object symbols. |
| proof_grade_carrier_introduction_rule_route | blocked | ref_carrier_introduction_rule_available, value_map_carrier_introduction_rule_available, ref_value_carrier_pair_rule_available, ref_carrier_rule_derivation_present, value_map_carrier_rule_derivation_present, carrier_rule_soundness_proof_present, carrier_rule_application_proof_present, carrier_pair_theorem_derivation_present, carrier_pair_theorem_soundness_proof_present, carrier_pair_theorem_application_proof_present | The source packets declare rule targets but contain no proof-grade carrier-introduction rules, derivations, soundness proof, application proof, or theorem-level derivation. |
| same_packet_ref_value_carrier_pair_route | blocked | same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed, same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed, ref_value_carrier_fields_same_witness_object_proven, ref_value_non_domain_carrier_pair_constructed, all_carrier_fields_constructed | No same-packet ref carrier field, value-map carrier field, same-witness-object carrier proof, or constructed ref/value non-domain carrier pair is present. |
| selected_carrier_admission_route | selected-but-blocked | carrier_admission_route_selected, binding_contract_satisfied, full_endpoint_boundary_binding_constructed, endpoint_boundary_binding_ref_carrier_unblocked, endpoint_value_binding_map_carrier_unblocked | The selected carrier-admission route remains useful as the downstream proof contract, but it is blocked and does not provide an independent carrier-pair theorem in this packet. |
| constructed_identity_unlock_route | blocked-downstream | ref_value_non_domain_carrier_pair_constructed, all_carrier_fields_constructed, constructed_witness_object_id_present, same_constructed_witness_object_identity_proof_present, witness_object_membership_proof_present | Constructed witness-object identity and membership remain locked until the same-packet ref/value carrier pair exists. |

## Endpoint Attempts

| Endpoint | Role | Source pair | Pair target | Ref rule | Value rule | Pair rule | Soundness | Application | Carrier pair | Theorem | First blocker |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| fc_sigma_source_lower | source | true | true | false | false | false | false | false | false | false | ref_carrier_introduction_rule_available |
| fc_rho_receiver_lower | receiver | true | true | false | false | false | false | false | false | false | ref_carrier_introduction_rule_available |
| fc_sigma_source_upper | source | true | true | false | false | false | false | false | false | false | ref_carrier_introduction_rule_available |
| fc_rho_receiver_upper | receiver | true | true | false | false | false | false | false | false | false | ref_carrier_introduction_rule_available |

## Row Attempts

| Row | Source pair | Theorem target pair | Direct promotion rejected | Carrier pair | Theorem pair | Cycle-breaker pair | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| R_w_A04_A03 | true | true | true | false | false | false | false |
| R_u_A10_A09 | true | true | true | false | false | false | false |
| R_u_A07_A06 | true | true | true | false | false | false | false |

## Endpoint Field Counts

| Field | Count |
| --- | ---: |
| domain_chart_carrier_subfield_constructed | 4 / 4 |
| ref_value_source_pair_ready | 4 / 4 |
| source_endpoint_boundary_binding_ref_constructed | 4 / 4 |
| source_witness_object_has_endpoint_boundary_binding_ref | 4 / 4 |
| source_endpoint_value_binding_map_constructed | 4 / 4 |
| source_witness_object_has_endpoint_value_binding_map | 4 / 4 |
| endpoint_boundary_binding_ref_carrier_source_candidate_declared | 4 / 4 |
| endpoint_value_binding_map_carrier_source_candidate_declared | 4 / 4 |
| non_domain_carrier_obstruction_present | 4 / 4 |
| carrier_rule_target_declared | 4 / 4 |
| direct_source_promotion_rejected | 4 / 4 |
| ref_carrier_introduction_rule_target_declared | 4 / 4 |
| value_map_carrier_introduction_rule_target_declared | 4 / 4 |
| ref_value_carrier_pair_rule_target_declared | 4 / 4 |
| carrier_introduction_premises_named | 4 / 4 |
| carrier_introduction_conclusion_named | 4 / 4 |
| carrier_admission_route_selected | 4 / 4 |
| ref_carrier_introduction_rule_available | 0 / 4 |
| value_map_carrier_introduction_rule_available | 0 / 4 |
| ref_value_carrier_pair_rule_available | 0 / 4 |
| ref_carrier_rule_derivation_present | 0 / 4 |
| value_map_carrier_rule_derivation_present | 0 / 4 |
| carrier_rule_soundness_proof_present | 0 / 4 |
| carrier_rule_application_proof_present | 0 / 4 |
| same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed | 0 / 4 |
| same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed | 0 / 4 |
| ref_value_carrier_fields_same_witness_object_proven | 0 / 4 |
| ref_value_non_domain_carrier_pair_constructed | 0 / 4 |
| all_carrier_fields_constructed | 0 / 4 |
| carrier_pair_theorem_derivation_present | 0 / 4 |
| carrier_pair_theorem_soundness_proof_present | 0 / 4 |
| carrier_pair_theorem_application_proof_present | 0 / 4 |
| carrier_pair_theorem_present | 0 / 4 |
| constructed_witness_object_id_present | 0 / 4 |
| same_constructed_witness_object_identity_proof_present | 0 / 4 |
| endpoint_boundary_binding_ref_member_of_witness_object_proven | 0 / 4 |
| endpoint_value_binding_map_member_of_witness_object_proven | 0 / 4 |
| endpoint_ref_and_value_map_same_witness_object_proven | 0 / 4 |
| membership_source_not_id_adjacency_proven | 0 / 4 |
| witness_object_membership_proof_present | 0 / 4 |
| independent_constructed_witness_object_membership_theorem_present | 0 / 4 |
| cycle_breaker_available | 0 / 4 |
| row_consumption_authorized | 0 / 4 |
| branch_chart_authorized | 0 / 4 |

## Row Field Counts

| Field | Count |
| --- | ---: |
| row_locator_resolved | 3 / 3 |
| source_ref_value_source_pair_ready | 3 / 3 |
| receiver_ref_value_source_pair_ready | 3 / 3 |
| combined_ref_value_source_pair_ready | 3 / 3 |
| source_carrier_pair_theorem_target_ready | 3 / 3 |
| receiver_carrier_pair_theorem_target_ready | 3 / 3 |
| combined_carrier_pair_theorem_target_ready | 3 / 3 |
| source_direct_source_promotion_rejected | 3 / 3 |
| receiver_direct_source_promotion_rejected | 3 / 3 |
| combined_direct_source_promotion_rejected | 3 / 3 |
| source_ref_value_carrier_pair_constructed | 0 / 3 |
| receiver_ref_value_carrier_pair_constructed | 0 / 3 |
| combined_ref_value_carrier_pair_constructed | 0 / 3 |
| source_carrier_pair_theorem_present | 0 / 3 |
| receiver_carrier_pair_theorem_present | 0 / 3 |
| combined_carrier_pair_theorem_present | 0 / 3 |
| source_cycle_breaker_available | 0 / 3 |
| receiver_cycle_breaker_available | 0 / 3 |
| combined_cycle_breaker_pair_available | 0 / 3 |
| residual_data_construction_ready | 0 / 3 |
| row_unblocked | 0 / 3 |
| row_consumed | 0 / 3 |
| branch_chart_authorized | 0 / 3 |

## Capture Decision

priority-only; records a fail-closed ref/value non-domain carrier-pair theorem attempt and does not promote to reader-facing corpus prose.
