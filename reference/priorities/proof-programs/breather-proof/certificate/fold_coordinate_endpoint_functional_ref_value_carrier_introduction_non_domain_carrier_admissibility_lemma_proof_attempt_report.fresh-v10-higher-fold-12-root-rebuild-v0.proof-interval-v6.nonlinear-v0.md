# Ref/Value Carrier-Introduction Non-Domain Carrier Admissibility Lemma Proof Attempt

## Verdict

Status: priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-non-domain-carrier-admissibility-lemma-proof-attempt-fail-closed-source-scopes-and-admission-routes-present-carrier-field-and-admissibility-proof-absent-no-row-consumption

This priority-only packet attempts the `L_adm` lemma below the
ref/value carrier-introduction definition-lemma stack. It keeps primitive-rule
acceptance, schema-family acceptance, derivation bundles, row consumption, and
branch-chart authorization out of scope.

The proof attempt remains fail-closed. It records 4 / 4
definition source scopes, 4 / 4
selected carrier-admission routes, 4 / 4
carrier-admission tests applied, 4 / 4
source endpoint-boundary-binding refs, 4 / 4
source endpoint value-binding maps, 4 / 4
non-domain carrier obstructions, 4 / 4
ref non-domain carrier source candidates, and 4 / 4
value-map non-domain carrier source candidates. It records 0 / 4
ref candidate carrier fields, 0 / 4
value-map candidate carrier fields, 0 / 4
carrier-admission definition bridges, 0 / 4
witness-object field membership proofs, 0 / 4
source-handle non-promotion guards, and 0 / 4
definition-derived admissibility derivations. It consumes 0
rows and authorizes no branch chart.

## Source Artifacts

| Source | Artifact | SHA-256 |
| --- | --- | --- |
| ref_value_carrier_introduction_definition_lemma_stack | fold_coordinate_endpoint_functional_ref_value_carrier_introduction_definition_lemma_stack_proof_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | b210580b8f686ece3fbf8ad07800b95566196b6306c6784ef4f8de85d629a3cd |
| same_packet_constructed_witness_object_identity_attempt | fold_coordinate_endpoint_functional_same_packet_constructed_witness_object_identity_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 9d86723d45faa601df0a6bacc41122dcaac1b616d49915e1695e152725a75bd9 |
| same_packet_endpoint_boundary_binding_witness_object_non_domain_carrier_obstruction_packet | fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_non_domain_carrier_obstruction_packet.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | bcd2fd6b78b82338003146cf227b3071c5eb865f8dc79dcffb9947bbc42a9898 |
| binding_contract_full_binding_carrier_admission_attempt | fold_coordinate_endpoint_functional_binding_contract_full_binding_carrier_admission_construction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 49b9f0e9db17df1197691a190f175545b05668950b81725e01875c3535549c9a |

## Proof Attempt Target

Attempt to prove `L_adm`: constructed ref/value carrier fields are admissible non-domain witness-object fields under the existing carrier-admission and non-promotion definitions.

Accepted as blocker discharge if: Every endpoint has same-packet ref/value carrier fields, a carrier-admission definition bridge, witness-object membership proofs, source-handle non-promotion proof, and a definition-derived admissibility derivation.

First exact blockers: ref_candidate_carrier_field_constructed, value_map_candidate_carrier_field_constructed, carrier_admission_definition_bridge_present, non_domain_witness_object_field_membership_proof_present, source_handle_non_promotion_guard_proven, and non_domain_carrier_admissibility_derivation_from_definitions_present

## Primitive-Rule Policy

Primitive acceptance, schema-family acceptance, derivation bundles, row consumption, and branch-chart authorization are out of scope for this admissibility proof attempt.

## Route-Only Carrier Admission Policy

The selected carrier-admission route and carrier-admission test application are source-scope facts only. They do not discharge `L_adm` unless the packet also supplies same-packet carrier fields, a definition bridge, membership proofs, a source-handle non-promotion proof, and an admissibility derivation.

## Proof Burdens

| Burden | Missing field | Required evidence |
| --- | --- | --- |
| L_adm_ref_carrier_field | ref_candidate_carrier_field_constructed | A same-packet non-domain carrier field for the endpoint-boundary-binding ref, not merely a source ref handle or matching endpoint id. |
| L_adm_value_map_carrier_field | value_map_candidate_carrier_field_constructed | A same-packet non-domain carrier field for the endpoint value-binding map, not merely a source value map bound to the first primitive. |
| L_adm_carrier_admission_bridge | carrier_admission_definition_bridge_present | A definition-level bridge from the selected carrier-admission route to the constructed ref/value carrier fields. |
| L_adm_membership_proof | non_domain_witness_object_field_membership_proof_present | Membership proofs that the ref carrier field and value-map carrier field are fields of the same constructed witness object. |
| L_adm_source_non_promotion_guard | source_handle_non_promotion_guard_proven | A proof that source handles are not promoted into carrier fields by id adjacency, inherited source status, or route selection alone. |
| L_adm_discharge | non_domain_carrier_admissibility_derivation_from_definitions_present | A definition-derived derivation that the constructed ref/value carrier fields are admissible non-domain witness-object fields. |

## Tested Routes

| Route | Status | Required fields | Limitation |
| --- | --- | --- | --- |
| carrier_admission_route_as_admissibility_proof | selected-but-blocked-not-proof | carrier_admission_route_selected, carrier_admission_test_applied, carrier_admission_definition_bridge_present, non_domain_carrier_admissibility_derivation_from_definitions_present | A selected carrier-admission test is not itself a proof that constructed non-domain carrier fields exist or are admissible. |
| source_handles_as_carrier_fields | rejected-source-only | source_endpoint_boundary_binding_ref_constructed, source_endpoint_value_binding_map_constructed, ref_candidate_carrier_field_constructed, value_map_candidate_carrier_field_constructed | Source ref/value handles remain source handles until same-packet non-domain carrier fields are constructed. |
| non_domain_obstruction_as_admissibility_proof | rejected-obstruction-only | non_domain_carrier_obstruction_present, ref_candidate_carrier_field_constructed, value_map_candidate_carrier_field_constructed | The obstruction packet names missing carrier fields; it does not supply the fields or their admissibility proof. |
| same_packet_identity_as_admissibility_proof | blocked | constructed_witness_object_id_present, same_constructed_witness_object_identity_proof_present, non_domain_witness_object_field_membership_proof_present | The same-packet identity proof remains absent, so witness-object membership cannot discharge admissibility. |
| derive_admissibility_from_existing_definitions | blocked | ref_candidate_carrier_field_constructed, value_map_candidate_carrier_field_constructed, carrier_admission_definition_bridge_present, non_domain_witness_object_field_membership_proof_present, source_handle_non_promotion_guard_proven, non_domain_carrier_admissibility_derivation_from_definitions_present | No endpoint has the carrier fields, admission bridge, membership proof, non-promotion proof, and admissibility derivation together. |
| definition_lemma_stack_after_admissibility | blocked-downstream | non_domain_carrier_admissibility_derivation_from_definitions_present, non_domain_carrier_membership_preservation_derivation_from_definitions_present | The definition-lemma stack remains downstream of the missing admissibility lemma and its membership-preservation follow-on. |

## Endpoint Audits

| Endpoint | Role | Definition scope | Admission route | Route-only rejected | Source ref | Source value map | Obstruction | Ref carrier field | Value carrier field | Admission bridge | Membership proof | Non-promotion guard | Admissibility derivation | First blocker |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| fc_sigma_source_lower | source | true | true | true | true | true | true | false | false | false | false | false | false | ref_candidate_carrier_field_constructed |
| fc_rho_receiver_lower | receiver | true | true | true | true | true | true | false | false | false | false | false | false | ref_candidate_carrier_field_constructed |
| fc_sigma_source_upper | source | true | true | true | true | true | true | false | false | false | false | false | false | ref_candidate_carrier_field_constructed |
| fc_rho_receiver_upper | receiver | true | true | true | true | true | true | false | false | false | false | false | false | ref_candidate_carrier_field_constructed |

## Row Audits

| Row | Admissibility source scope pair | Carrier field-object pair | Membership-proof pair | Admissibility derivation pair | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: |
| R_w_A04_A03 | true | false | false | false | false |
| R_u_A10_A09 | true | false | false | false | false |
| R_u_A07_A06 | true | false | false | false | false |

## Endpoint Field Counts

| Field | Count |
| --- | ---: |
| definition_lemma_stack_input_present | 4 |
| definition_source_scope_ready | 4 |
| carrier_admission_route_selected | 4 |
| route_only_carrier_admission_rejected | 4 |
| route_only_carrier_admission_accepted | 0 |
| direct_source_promotion_rejected | 4 |
| carrier_admission_test_applied | 4 |
| source_endpoint_boundary_binding_ref_constructed | 4 |
| source_endpoint_value_binding_map_constructed | 4 |
| non_domain_carrier_obstruction_present | 4 |
| endpoint_boundary_binding_ref_non_domain_carrier_source_candidate_declared | 4 |
| endpoint_value_binding_map_non_domain_carrier_source_candidate_declared | 4 |
| ref_candidate_carrier_field_constructed | 0 |
| value_map_candidate_carrier_field_constructed | 0 |
| constructed_witness_object_id_present | 0 |
| same_constructed_witness_object_identity_proof_present | 0 |
| endpoint_boundary_binding_ref_member_of_witness_object_proven | 0 |
| endpoint_value_binding_map_member_of_witness_object_proven | 0 |
| membership_source_not_id_adjacency_proven | 0 |
| carrier_admission_definition_bridge_present | 0 |
| carrier_admission_field_object_present | 0 |
| non_domain_witness_object_field_membership_proof_present | 0 |
| source_handle_non_promotion_guard_proven | 0 |
| non_domain_carrier_admissibility_derivation_from_definitions_present | 0 |
| non_domain_carrier_membership_preservation_derivation_from_definitions_present | 0 |
| row_consumption_authorized | 0 |
| branch_chart_authorized | 0 |

## Row Field Counts

| Field | Count |
| --- | ---: |
| row_locator_resolved | 3 |
| source_admissibility_source_scope_ready | 3 |
| receiver_admissibility_source_scope_ready | 3 |
| combined_admissibility_source_scope_ready | 3 |
| source_carrier_admission_field_object_present | 0 |
| receiver_carrier_admission_field_object_present | 0 |
| combined_carrier_admission_field_object_present | 0 |
| source_non_domain_witness_object_field_membership_proof_present | 0 |
| receiver_non_domain_witness_object_field_membership_proof_present | 0 |
| combined_non_domain_witness_object_field_membership_proof_present | 0 |
| source_admissibility_derivation_from_definitions_present | 0 |
| receiver_admissibility_derivation_from_definitions_present | 0 |
| combined_admissibility_derivation_from_definitions_present | 0 |
| row_unblocked | 0 |
| row_consumed | 0 |
| branch_chart_authorized | 0 |

## Capture Decision

priority-only; records a fail-closed non-domain carrier admissibility lemma proof attempt and does not promote to reader-facing corpus prose.
