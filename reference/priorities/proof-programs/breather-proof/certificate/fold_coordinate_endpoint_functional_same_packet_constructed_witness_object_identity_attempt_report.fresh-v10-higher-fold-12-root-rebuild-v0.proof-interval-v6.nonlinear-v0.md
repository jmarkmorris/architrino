# Higher-Fold Endpoint-Functional Same-Packet Constructed Witness-Object Identity Attempt

## Verdict

Status: `priority-only-fold-coordinate-endpoint-functional-same-packet-constructed-witness-object-identity-attempt-fail-closed-domain-chart-ref-value-sources-present-non-domain-carriers-and-identity-proof-absent-no-row-consumption`.

This priority-only packet tests the recommended first route above the actual
contract-link rule/membership proof target: construct the same-packet witness
object identity before attempting the actual contract-link rule.

It records 4 / 4
domain-chart carrier subfields, 4 / 4
source endpoint-boundary-binding refs, 4 / 4
source endpoint value-binding maps, and 4 / 4
non-domain carrier obstruction records.

The packet remains fail-closed. It has 0 / 4
same-packet endpoint-boundary-binding ref carrier fields, 0 / 4
same-packet endpoint value-binding map carrier fields, 0 / 4
carrier-complete witness objects, 0 / 4
constructed witness-object identities, 0 / 4
same constructed-witness-object membership proofs, and 0 / 4
actual witness-object contract links. It consumes 0
rows and authorizes no branch chart.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
| `actual_contract_link_rule_membership_proof_target` | `fold_coordinate_endpoint_functional_actual_contract_link_rule_membership_proof_target.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | true | `3fe5935cc12de5501dbbdf690bc3ee97ae8678afbee07ae6a8bdbe3b04370b07` |
| `same_packet_non_domain_carrier_obstruction` | `fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_non_domain_carrier_obstruction_packet.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | true | `bcd2fd6b78b82338003146cf227b3071c5eb865f8dc79dcffb9947bbc42a9898` |
| `endpoint_boundary_binding_ref_source_packet` | `fold_coordinate_endpoint_functional_endpoint_boundary_binding_ref_carrier_full_binding_construction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | true | `6904d4a57e58918918ca5583a44c50cd3150967e4fdd9000f78178621b04c5be` |
| `endpoint_value_binding_map_source_packet` | `fold_coordinate_endpoint_functional_endpoint_value_binding_map_construction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | true | `be4bd97a224256f16b2a8b538834841238ddaf2bbe12f35fac005260f8b4004e` |

## No-Promotion Rule

Source ref/value handles, domain-chart carriers, matching witness-object symbols, and endpoint IDs do not supply a constructed same-packet witness-object identity or ref/value co-membership proof.

## Proof Burdens

| Burden | Missing field | Required evidence |
| --- | --- | --- |
| `same_packet_endpoint_boundary_binding_ref_carrier_field` | `same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed` | A non-domain carrier field inside the same witness object for the endpoint-boundary-binding ref, not only a source reference field from an earlier packet. |
| `same_packet_endpoint_value_binding_map_carrier_field` | `same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed` | A non-domain carrier field inside the same witness object for the endpoint value-binding map, not only a source value map bound to the first primitive. |
| `carrier_complete_witness_object` | `all_carrier_fields_constructed` | All seven witness-object carrier fields, including the six non-domain carrier families, constructed in one same-packet witness object. |
| `constructed_witness_object_identity` | `same_constructed_witness_object_identity_proof_present` | A proof-grade same-packet witness-object identity attached to a constructed witness object id. |
| `endpoint_boundary_binding_ref_membership` | `endpoint_boundary_binding_ref_member_of_witness_object_proven` | A membership proof that the endpoint-boundary-binding ref is a field of the constructed witness object. |
| `endpoint_value_binding_map_membership` | `endpoint_value_binding_map_member_of_witness_object_proven` | A membership proof that the endpoint value-binding map is a field of the same constructed witness object. |
| `co_membership_not_source_adjacency` | `membership_source_not_id_adjacency_proven` | A proof that ref/value co-membership follows from the constructed witness object, not from matching IDs, symbols, inherited field claims, or source-candidate adjacency. |

## Construction Methods

| Method | Output kind | Required fields | Description |
| --- | --- | ---: | --- |
| `ref_value_source_pair_check` | `same-packet-witness-object-source-pair` | 12 | Check whether the endpoint has a domain-chart carrier subfield plus source endpoint-boundary-binding ref and endpoint value-binding map handles. |
| `same_packet_carrier_completeness_check` | `carrier-complete-witness-object` | 8 | Check whether the ref, value-map, contract-link, algebraic, motion/evaluation, and artifact/topology/replay non-domain carrier fields are constructed in the same witness object. |
| `constructed_witness_object_identity_check` | `constructed-witness-object-identity` | 4 | Check whether carrier completeness supplies a constructed same-packet witness-object identity. |
| `same_witness_object_field_membership_check` | `same-constructed-witness-object-membership-proof` | 8 | Check whether the endpoint-boundary-binding ref and endpoint value-binding map are proved fields of the same constructed witness object. |
| `actual_contract_link_authorization_guard` | `actual-contract-link-authorization` | 14 | Keep actual contract-link, binding contract, full binding, carrier admission, residual, row, and branch-chart outputs locked unless the constructed witness-object identity and membership proof exist. |

## Endpoint Attempts

| Endpoint | Role | Ref/value source | Domain chart | All carriers | Witness identity | Identity proof | Membership proof | Contract link | Missing burdens |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `fc_sigma_source_lower` | `source` | true | true | false | false | false | false | false | 7 |
| `fc_rho_receiver_lower` | `receiver` | true | true | false | false | false | false | false | 7 |
| `fc_sigma_source_upper` | `source` | true | true | false | false | false | false | false | 7 |
| `fc_rho_receiver_upper` | `receiver` | true | true | false | false | false | false | false | 7 |

## Row Attempts

| Row | Failed side | Ref/value source pair | Domain-chart pair | Non-domain obstruction pair | All carrier pair | Identity pair | Membership proof pair | Consumed |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `R_w_A04_A03` | `lo` | true | true | true | false | false | false | false |
| `R_u_A10_A09` | `lo` | true | true | true | false | false | false | false |
| `R_u_A07_A06` | `hi` | true | true | true | false | false | false | false |

## Endpoint Field Counts

| Field | Count |
| --- | ---: |
| `domain_chart_carrier_subfield_constructed` | 4 / 4 |
| `domain_chart_carrier_preserved_as_partial_source` | 4 / 4 |
| `source_endpoint_boundary_binding_ref_constructed` | 4 / 4 |
| `source_witness_object_has_endpoint_boundary_binding_ref` | 4 / 4 |
| `source_endpoint_value_binding_map_constructed` | 4 / 4 |
| `source_witness_object_has_endpoint_value_binding_map` | 4 / 4 |
| `source_endpoint_value_bound_to_boundary_binding` | 4 / 4 |
| `actual_contract_link_rule_source_conditions_present` | 4 / 4 |
| `constructed_witness_object_source_ready` | 4 / 4 |
| `non_domain_carrier_obstruction_present` | 4 / 4 |
| `endpoint_boundary_binding_ref_non_domain_carrier_source_candidate_declared` | 4 / 4 |
| `endpoint_value_binding_map_non_domain_carrier_source_candidate_declared` | 4 / 4 |
| `same_packet_witness_object_endpoint_boundary_binding_ref_carrier_field_constructed` | 0 / 4 |
| `same_packet_witness_object_endpoint_value_binding_map_carrier_field_constructed` | 0 / 4 |
| `same_packet_witness_object_contract_link_carrier_field_constructed` | 0 / 4 |
| `same_packet_witness_object_algebraic_certificate_refs_carrier_field_constructed` | 0 / 4 |
| `same_packet_witness_object_motion_evaluation_refs_carrier_field_constructed` | 0 / 4 |
| `same_packet_witness_object_artifact_topology_replay_refs_carrier_field_constructed` | 0 / 4 |
| `all_carrier_fields_constructed` | 0 / 4 |
| `constructed_witness_object_id_present` | 0 / 4 |
| `endpoint_boundary_binding_witness_object_constructed` | 0 / 4 |
| `same_constructed_witness_object_identity_proof_present` | 0 / 4 |
| `endpoint_boundary_binding_ref_member_of_witness_object_proven` | 0 / 4 |
| `endpoint_value_binding_map_member_of_witness_object_proven` | 0 / 4 |
| `endpoint_ref_and_value_map_same_witness_object_proven` | 0 / 4 |
| `membership_source_not_id_adjacency_proven` | 0 / 4 |
| `witness_object_membership_proof_present` | 0 / 4 |
| `actual_contract_link_rule_available` | 0 / 4 |
| `actual_contract_link_rule_derivation_present` | 0 / 4 |
| `actual_contract_link_rule_soundness_proof_present` | 0 / 4 |
| `actual_contract_link_rule_application_proof_present` | 0 / 4 |
| `witness_object_contract_link_constructed` | 0 / 4 |
| `witness_object_has_contract_link` | 0 / 4 |
| `binding_contract_satisfied` | 0 / 4 |
| `full_endpoint_boundary_binding_constructed` | 0 / 4 |
| `endpoint_boundary_binding_ref_carrier_unblocked` | 0 / 4 |
| `endpoint_value_binding_map_carrier_unblocked` | 0 / 4 |
| `residual_data_construction_ready` | 0 / 4 |
| `row_consumption_authorized` | 0 / 4 |
| `branch_chart_authorized` | 0 / 4 |

## Row Field Counts

| Field | Count |
| --- | ---: |
| `row_locator_resolved` | 3 / 3 |
| `source_domain_chart_carrier_subfield_constructed` | 3 / 3 |
| `receiver_domain_chart_carrier_subfield_constructed` | 3 / 3 |
| `combined_domain_chart_carrier_subfield_pair_constructed` | 3 / 3 |
| `source_ref_value_source_pair_ready` | 3 / 3 |
| `receiver_ref_value_source_pair_ready` | 3 / 3 |
| `combined_ref_value_source_pair_ready` | 3 / 3 |
| `source_non_domain_carrier_obstruction_present` | 3 / 3 |
| `receiver_non_domain_carrier_obstruction_present` | 3 / 3 |
| `combined_non_domain_carrier_obstruction_pair_present` | 3 / 3 |
| `source_all_carrier_fields_constructed` | 0 / 3 |
| `receiver_all_carrier_fields_constructed` | 0 / 3 |
| `combined_all_carrier_fields_constructed` | 0 / 3 |
| `source_constructed_witness_object_identity_present` | 0 / 3 |
| `receiver_constructed_witness_object_identity_present` | 0 / 3 |
| `combined_constructed_witness_object_identity_pair_present` | 0 / 3 |
| `source_witness_object_membership_proof_present` | 0 / 3 |
| `receiver_witness_object_membership_proof_present` | 0 / 3 |
| `combined_witness_object_membership_proof_pair_present` | 0 / 3 |
| `residual_data_construction_ready` | 0 / 3 |
| `row_unblocked` | 0 / 3 |
| `row_consumed` | 0 / 3 |
| `branch_chart_authorized` | 0 / 3 |

## Capture Decision

Priority-only. This packet proves the recommended route is still blocked at same-packet witness-object identity: ref/value source handles and domain-chart carriers are present, but non-domain carrier fields, constructed witness-object identity, same-witness membership proof, actual contract links, and row consumption are absent.
