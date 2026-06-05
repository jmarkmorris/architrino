# Ref/Value Carrier-Introduction Rule Derivation Attempt

## Verdict

Status: priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-rule-derivation-attempt-fail-closed-ref-contract-value-map-contract-and-same-witness-rule-roots-present-derivations-soundness-application-absent-no-row-consumption

This priority-only packet lowers the carrier-introduction rule theorem blocker
to the derivation layer. It asks whether the existing endpoint-boundary-binding
ref contract, endpoint value-binding map contract, primitive rule/witness
record, and selected carrier-admission route already derive the three
carrier-introduction rules.

The attempt remains fail-closed. It records 4 / 4
derivation premise sets, 4 / 4
ref derivation targets, 4 / 4
value-map derivation targets, and 4 / 4
joint same-witness derivation targets. It records 0 / 4
ref contract-to-ref-carrier rule derivations, 0 / 4
value-map contract-to-value-map-carrier rule derivations, 0 / 4
joint same-witness derivations, 0 / 4
derivation soundness bridges, and 0 / 4
complete rule-theorem bundles. It consumes 0
rows and authorizes no branch chart.

## Source Artifacts

| Source | Artifact | SHA-256 |
| --- | --- | --- |
| ref_value_carrier_introduction_rule_theorem_attempt | fold_coordinate_endpoint_functional_ref_value_carrier_introduction_rule_theorem_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 6a38e0cd27d7e2f74f71077c13712db9e62a059c6f3553fc920849d0b47b8c86 |
| ref_value_non_domain_carrier_rule_target | fold_coordinate_endpoint_functional_ref_value_non_domain_carrier_rule_target.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 5683b5c1e49282d96f3bb67fb6af26590c6cac6948599e98405aa2e1f43ca1c1 |
| ref_value_carrier_introduction_route_decision | fold_coordinate_endpoint_functional_ref_value_carrier_introduction_route_decision.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 9fbf4e6bd4bbec9f8cfb10ee3bd311f6009de0ddf25ee18771805d0a7c1fdf41 |
| full_endpoint_boundary_binding_contract_target | fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_contract_target.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 8b302f55ff7b0d520baaf6d4a1b4a4a40d1d547e3616553bea8cd868e2ba135b |
| endpoint_boundary_binding_primitive_rule_witness_record | fold_coordinate_endpoint_functional_endpoint_boundary_binding_primitive_rule_witness_record_construction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 3528e431bd23d5aee3a39293d53aa115e15ecb2a470ff65582bf8efa313ae596 |
| endpoint_boundary_binding_ref_carrier_full_binding | fold_coordinate_endpoint_functional_endpoint_boundary_binding_ref_carrier_full_binding_construction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 6904d4a57e58918918ca5583a44c50cd3150967e4fdd9000f78178621b04c5be |
| endpoint_value_binding_map | fold_coordinate_endpoint_functional_endpoint_value_binding_map_construction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | be4bd97a224256f16b2a8b538834841238ddaf2bbe12f35fac005260f8b4004e |
| binding_contract_full_binding_carrier_admission_attempt | fold_coordinate_endpoint_functional_binding_contract_full_binding_carrier_admission_construction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 49b9f0e9db17df1197691a190f175545b05668950b81725e01875c3535549c9a |

## Theorem Target

Derive the ref carrier-introduction rule, value-map carrier-introduction rule, and joint same-witness ref/value carrier-pair rule from the existing endpoint-boundary-binding and value-map contracts.

Accepted as blocker discharge if: Every endpoint has the ref contract-to-rule derivation, value-map contract-to-rule derivation, joint same-witness derivation, and derivation soundness bridge present.

First exact blocker: ref_contract_to_ref_carrier_rule_derivation_present, value_map_contract_to_value_map_carrier_rule_derivation_present, and joint_same_witness_carrier_pair_rule_derivation_present

## No-Promotion Rule

Contract targets, constructed refs, value maps, primitive rule/witness records, and selected carrier-admission routes are premises for derivation attempts; they do not derive carrier-introduction rules without an explicit proof.

## Derivation Roots

| Root | Source artifact | Source fields | Intended derivation |
| --- | --- | --- | --- |
| endpoint_boundary_binding_ref_contract_root | endpoint_boundary_binding_ref_carrier_full_binding | witness_object_endpoint_boundary_binding_ref_constructed, witness_object_has_endpoint_boundary_binding_ref, endpoint_boundary_binding_ref_targets_first_primitive, endpoint_boundary_binding_ref_target_attachment_certified | ref_contract_to_ref_carrier_rule_derivation_present |
| endpoint_value_binding_map_contract_root | endpoint_value_binding_map | endpoint_value_binding_map_constructed, witness_object_has_endpoint_value_binding_map, endpoint_value_bound_to_boundary_binding, endpoint_value_binding_map_targets_first_primitive, endpoint_value_binding_map_ref_values_certified | value_map_contract_to_value_map_carrier_rule_derivation_present |
| joint_same_witness_carrier_pair_rule_root | ref_value_non_domain_carrier_rule_target | ref_value_carrier_pair_rule_target_declared, same_packet_identity_target_present, non_domain_carrier_obstruction_present, direct_source_promotion_rejected | joint_same_witness_carrier_pair_rule_derivation_present |

## Proof Burdens

| Burden | Missing field | Required evidence |
| --- | --- | --- |
| ref_contract_to_carrier_rule_derivation | ref_contract_to_ref_carrier_rule_derivation_present | A proof-grade derivation from the endpoint-boundary-binding ref contract to the ref carrier-introduction rule. |
| value_map_contract_to_carrier_rule_derivation | value_map_contract_to_value_map_carrier_rule_derivation_present | A proof-grade derivation from the endpoint value-binding map contract to the value-map carrier-introduction rule. |
| joint_same_witness_carrier_pair_derivation | joint_same_witness_carrier_pair_rule_derivation_present | A proof-grade derivation that the two introduced carrier fields occupy one same-packet witness object. |
| derivation_soundness_bridge | derivation_soundness_bridge_present | A soundness bridge showing that the derivations preserve non-domain carrier membership and reject source-handle promotion. |
| source_handle_non_promotion_guard | source_handle_non_promotion_guard_proven | A proof, not only a route decision, that source handles and contract targets cannot be promoted to carrier rules without the derivation layer. |
| ref_carrier_rule_derivation | ref_carrier_rule_derivation_present | The derived ref carrier-introduction rule marked present after the contract-to-rule derivation and soundness bridge exist. |
| value_map_carrier_rule_derivation | value_map_carrier_rule_derivation_present | The derived value-map carrier-introduction rule marked present after the contract-to-rule derivation and soundness bridge exist. |
| ref_value_pair_rule_derivation | ref_value_pair_rule_derivation_present | The derived joint ref/value carrier-pair rule marked present after the same-witness-object derivation and soundness bridge exist. |

## Tested Routes

| Route | Status | Required fields | Limitation |
| --- | --- | --- | --- |
| rule_target_as_derivation_route | rejected-target-only | source_derivation_premise_set_ready, derivation_targets_declared, ref_contract_to_ref_carrier_rule_derivation_present, value_map_contract_to_value_map_carrier_rule_derivation_present, joint_same_witness_carrier_pair_rule_derivation_present, derivation_soundness_bridge_present, source_handle_non_promotion_guard_proven, ref_carrier_rule_derivation_present, value_map_carrier_rule_derivation_present, ref_value_pair_rule_derivation_present | Contract targets and rule targets name obligations; they do not derive carrier-introduction rules by themselves. |
| ref_contract_to_ref_carrier_rule_derivation_route | blocked | ref_contract_root_ready, ref_contract_to_ref_carrier_rule_derivation_present | The witness-object endpoint-boundary-binding ref is present, but no derivation promotes that ref contract into a non-domain carrier-introduction rule. |
| value_map_contract_to_value_map_carrier_rule_derivation_route | blocked | value_map_contract_root_ready, value_map_contract_to_value_map_carrier_rule_derivation_present | The endpoint value-binding map is present and bound to endpoint values, but no derivation promotes that value-map contract into a non-domain carrier-introduction rule. |
| joint_same_witness_carrier_pair_rule_derivation_route | blocked | ref_contract_to_ref_carrier_rule_derivation_present, value_map_contract_to_value_map_carrier_rule_derivation_present, joint_same_witness_carrier_pair_rule_derivation_present | No derivation proves that the ref carrier and value-map carrier introduced by the two rules occupy one same-packet witness object. |
| soundness_after_derivation_route | blocked | ref_contract_to_ref_carrier_rule_derivation_present, value_map_contract_to_value_map_carrier_rule_derivation_present, joint_same_witness_carrier_pair_rule_derivation_present, derivation_soundness_bridge_present | No soundness bridge proves that the attempted derivations preserve non-domain carrier membership and do not promote source handles by adjacency. |
| selected_carrier_admission_as_derivation_route | selected-but-blocked-not-derivation | carrier_admission_route_selected, binding_contract_satisfied, full_endpoint_boundary_binding_constructed, endpoint_boundary_binding_ref_carrier_unblocked, endpoint_value_binding_map_carrier_unblocked | The selected carrier-admission route is recorded, but it remains blocked and cannot substitute for a derivation of the carrier-introduction rules. |
| endpoint_application_after_soundness_route | blocked-downstream | ref_carrier_rule_derivation_present, value_map_carrier_rule_derivation_present, ref_value_pair_rule_derivation_present, carrier_rule_soundness_proof_present, carrier_rule_application_proof_present, carrier_introduction_rule_theorem_bundle_present | Rule soundness, endpoint application, and available carrier rules are downstream of the missing derivations. |
| downstream_carrier_pair_route | blocked-downstream | same_packet_ref_carrier_field_constructed, same_packet_value_map_carrier_field_constructed, ref_value_carrier_fields_same_witness_object_proven, ref_value_non_domain_carrier_pair_constructed, row_consumption_authorized, branch_chart_authorized | Constructed same-witness carrier-pair data and row consumption remain downstream of derived carrier-introduction rules and sound endpoint application. |

## Endpoint Attempts

| Endpoint | Role | Premises | Targets | Ref derivation | Value derivation | Joint derivation | Soundness bridge | Ref rule derivation | Value rule derivation | Pair rule derivation | First blocker |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| fc_sigma_source_lower | source | true | true | false | false | false | false | false | false | false | ref_contract_to_ref_carrier_rule_derivation_present |
| fc_rho_receiver_lower | receiver | true | true | false | false | false | false | false | false | false | ref_contract_to_ref_carrier_rule_derivation_present |
| fc_sigma_source_upper | source | true | true | false | false | false | false | false | false | false | ref_contract_to_ref_carrier_rule_derivation_present |
| fc_rho_receiver_upper | receiver | true | true | false | false | false | false | false | false | false | ref_contract_to_ref_carrier_rule_derivation_present |

## Row Attempts

| Row | Premises | Targets | Ref derivation pair | Value derivation pair | Joint derivation pair | Soundness pair | Rule derivation pair | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| R_w_A04_A03 | true | true | false | false | false | false | false | false |
| R_u_A10_A09 | true | true | false | false | false | false | false | false |
| R_u_A07_A06 | true | true | false | false | false | false | false | false |

## Endpoint Field Counts

| Field | Count |
| --- | ---: |
| ref_contract_root_ready | 4 / 4 |
| value_map_contract_root_ready | 4 / 4 |
| joint_same_witness_carrier_pair_rule_root_ready | 4 / 4 |
| full_binding_contract_target_declared | 4 / 4 |
| primitive_construction_rule_applied | 4 / 4 |
| primitive_binding_witness_record_constructed | 4 / 4 |
| direct_source_promotion_rejected | 4 / 4 |
| carrier_admission_route_selected | 4 / 4 |
| source_derivation_premise_set_ready | 4 / 4 |
| binding_contract_satisfied | 0 / 4 |
| full_endpoint_boundary_binding_constructed | 0 / 4 |
| endpoint_boundary_binding_ref_carrier_unblocked | 0 / 4 |
| endpoint_value_binding_map_carrier_unblocked | 0 / 4 |
| ref_carrier_rule_derivation_target_declared | 4 / 4 |
| value_map_carrier_rule_derivation_target_declared | 4 / 4 |
| joint_same_witness_carrier_pair_rule_derivation_target_declared | 4 / 4 |
| derivation_targets_declared | 4 / 4 |
| ref_contract_to_ref_carrier_rule_derivation_present | 0 / 4 |
| value_map_contract_to_value_map_carrier_rule_derivation_present | 0 / 4 |
| joint_same_witness_carrier_pair_rule_derivation_present | 0 / 4 |
| derivation_soundness_bridge_present | 0 / 4 |
| source_handle_non_promotion_guard_proven | 0 / 4 |
| ref_carrier_rule_derivation_present | 0 / 4 |
| value_map_carrier_rule_derivation_present | 0 / 4 |
| ref_value_pair_rule_derivation_present | 0 / 4 |
| carrier_rule_soundness_proof_present | 0 / 4 |
| carrier_rule_application_proof_present | 0 / 4 |
| ref_carrier_introduction_rule_available | 0 / 4 |
| value_map_carrier_introduction_rule_available | 0 / 4 |
| ref_value_carrier_pair_rule_available | 0 / 4 |
| carrier_introduction_rule_theorem_bundle_present | 0 / 4 |
| same_packet_ref_carrier_field_constructed | 0 / 4 |
| same_packet_value_map_carrier_field_constructed | 0 / 4 |
| ref_value_carrier_fields_same_witness_object_proven | 0 / 4 |
| ref_value_non_domain_carrier_pair_constructed | 0 / 4 |
| row_consumption_authorized | 0 / 4 |
| branch_chart_authorized | 0 / 4 |

## Row Field Counts

| Field | Count |
| --- | ---: |
| row_locator_resolved | 3 / 3 |
| source_derivation_premise_set_ready | 3 / 3 |
| receiver_derivation_premise_set_ready | 3 / 3 |
| combined_derivation_premise_set_ready | 3 / 3 |
| source_derivation_targets_declared | 3 / 3 |
| receiver_derivation_targets_declared | 3 / 3 |
| combined_derivation_targets_declared | 3 / 3 |
| source_ref_contract_to_ref_carrier_rule_derivation_present | 0 / 3 |
| receiver_ref_contract_to_ref_carrier_rule_derivation_present | 0 / 3 |
| combined_ref_contract_to_ref_carrier_rule_derivation_present | 0 / 3 |
| source_value_map_contract_to_value_map_carrier_rule_derivation_present | 0 / 3 |
| receiver_value_map_contract_to_value_map_carrier_rule_derivation_present | 0 / 3 |
| combined_value_map_contract_to_value_map_carrier_rule_derivation_present | 0 / 3 |
| source_joint_same_witness_carrier_pair_rule_derivation_present | 0 / 3 |
| receiver_joint_same_witness_carrier_pair_rule_derivation_present | 0 / 3 |
| combined_joint_same_witness_carrier_pair_rule_derivation_present | 0 / 3 |
| source_derivation_soundness_bridge_present | 0 / 3 |
| receiver_derivation_soundness_bridge_present | 0 / 3 |
| combined_derivation_soundness_bridge_present | 0 / 3 |
| source_rule_derivation_present | 0 / 3 |
| receiver_rule_derivation_present | 0 / 3 |
| combined_rule_derivation_present | 0 / 3 |
| source_rule_bundle_present | 0 / 3 |
| receiver_rule_bundle_present | 0 / 3 |
| combined_rule_bundle_present | 0 / 3 |
| row_unblocked | 0 / 3 |
| row_consumed | 0 / 3 |
| branch_chart_authorized | 0 / 3 |

## Capture Decision

priority-only; records a fail-closed carrier-introduction rule derivation attempt and does not promote to reader-facing corpus prose.
