# Fold-Coordinate Endpoint Functional Ref/Value Non-Domain Carrier Rule Target

Status: `priority-only-fold-coordinate-endpoint-functional-ref-value-non-domain-carrier-rule-target-fail-closed-ref-value-sources-and-carrier-candidates-present-carrier-introduction-rules-absent-no-row-consumption`

Claim level: priority-only fail-closed rule-target packet; source handles and source candidates are present, but carrier-introduction rules and constructed carrier fields are absent

Output JSON: `fold_coordinate_endpoint_functional_ref_value_non_domain_carrier_rule_target.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json`

Output JSON SHA-256: `5683b5c1e49282d96f3bb67fb6af26590c6cac6948599e98405aa2e1f43ca1c1`

## Source Artifacts

| source | artifact | sha256 |
| --- | --- | --- |
| same_packet_constructed_witness_object_identity_attempt | fold_coordinate_endpoint_functional_same_packet_constructed_witness_object_identity_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 9d86723d45faa601df0a6bacc41122dcaac1b616d49915e1695e152725a75bd9 |
| non_domain_carrier_obstruction_packet | fold_coordinate_endpoint_functional_same_packet_endpoint_boundary_binding_witness_object_non_domain_carrier_obstruction_packet.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | bcd2fd6b78b82338003146cf227b3071c5eb865f8dc79dcffb9947bbc42a9898 |
| endpoint_boundary_binding_ref_packet | fold_coordinate_endpoint_functional_endpoint_boundary_binding_ref_carrier_full_binding_construction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 6904d4a57e58918918ca5583a44c50cd3150967e4fdd9000f78178621b04c5be |
| endpoint_value_binding_map_packet | fold_coordinate_endpoint_functional_endpoint_value_binding_map_construction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | be4bd97a224256f16b2a8b538834841238ddaf2bbe12f35fac005260f8b4004e |

## No-Promotion Rule

Endpoint-boundary-binding ref and endpoint value-binding map source handles, even with source-candidate declarations, do not count as same-packet non-domain witness-object carrier fields without explicit carrier-introduction rules, rule derivations, a soundness proof, and endpoint-level application proofs.

The packet therefore records a narrow fail-closed result: all four endpoint
functionals have ref/value source premises and declared carrier source
candidates, but zero carrier-introduction rules, zero derivations, zero
soundness/application proofs, zero ref/value carrier pairs, zero constructed
witness-object identities, and zero row consumptions.

## Summary

- endpoint functionals: 4
- residual consumer rows: 3
- source endpoint-boundary-binding refs constructed: 4
- source endpoint value-binding maps constructed: 4
- ref carrier source candidates declared: 4
- value-map carrier source candidates declared: 4
- ref carrier rule targets declared: 4
- value-map carrier rule targets declared: 4
- ref/value pair rule targets declared: 4
- ref carrier rules available: 0
- value-map carrier rules available: 0
- ref/value pair rules available: 0
- carrier rule soundness proofs present: 0
- carrier rule application proofs present: 0
- ref/value non-domain carrier pairs constructed: 0
- row ref/value source premises ready: 3
- row carrier rule target pairs ready: 3
- row ref/value carrier pairs constructed: 0
- row consumption count: 0
- branch chart authorized: false

## Method Results

| method | output | endpoint result |
| --- | --- | --- |
| ref_value_carrier_source_premise_check | ref-value-carrier-source-premises | pass |
| carrier_introduction_rule_target_check | carrier-introduction-rule-target | pass |
| carrier_introduction_rule_availability_check | carrier-introduction-rule-availability | fail |
| ref_value_non_domain_carrier_construction_check | ref-value-non-domain-carrier-pair | fail |
| constructed_identity_unlock_check | constructed-witness-object-identity-unlock | fail |

## Endpoint Results

| endpoint | role | ref source | value source | ref candidate | value candidate | rule target | rules available | carrier pair | identity proof |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| fc_sigma_source_lower | source | yes | yes | yes | yes | yes | no | no | no |
| fc_rho_receiver_lower | receiver | yes | yes | yes | yes | yes | no | no | no |
| fc_sigma_source_upper | source | yes | yes | yes | yes | yes | no | no | no |
| fc_rho_receiver_upper | receiver | yes | yes | yes | yes | yes | no | no | no |

## Row Results

| row | source | receiver | source premises | rule targets | carrier pair | consumed |
| --- | --- | --- | --- | --- | --- | --- |
| R_w_A04_A03 | fc_sigma_source_lower | fc_rho_receiver_lower | yes | yes | no | no |
| R_u_A10_A09 | fc_sigma_source_lower | fc_rho_receiver_lower | yes | yes | no | no |
| R_u_A07_A06 | fc_sigma_source_upper | fc_rho_receiver_upper | yes | yes | no | no |

## Missing Proof Burdens

| burden | missing field | required evidence |
| --- | --- | --- |
| endpoint_boundary_binding_ref_carrier_introduction_rule | ref_carrier_introduction_rule_available | A proof-grade rule that promotes the endpoint-boundary-binding ref source handle into a same-packet non-domain witness-object carrier field. |
| endpoint_value_binding_map_carrier_introduction_rule | value_map_carrier_introduction_rule_available | A proof-grade rule that promotes the endpoint value-binding map source handle into a same-packet non-domain witness-object carrier field. |
| ref_value_carrier_pair_rule | ref_value_carrier_pair_rule_available | A joint rule that places the ref and value-map carrier fields in one same-packet witness object. |
| carrier_introduction_rule_derivation | ref_carrier_rule_derivation_present | A derivation for the ref carrier-introduction rule from the existing endpoint-boundary-binding construction contract. |
| value_map_carrier_rule_derivation | value_map_carrier_rule_derivation_present | A derivation for the value-map carrier-introduction rule from the endpoint value-binding map contract. |
| carrier_introduction_rule_soundness | carrier_rule_soundness_proof_present | A soundness proof that the rule preserves the same-packet witness-object carrier contract. |
| carrier_introduction_rule_application | carrier_rule_application_proof_present | An application proof for each endpoint that verifies every premise of the carrier-introduction rule. |
| ref_value_non_domain_carrier_pair | ref_value_non_domain_carrier_pair_constructed | Constructed ref and value-map non-domain carrier fields that are proved to belong to one same-packet witness object. |
| constructed_witness_object_identity_unlock | same_constructed_witness_object_identity_proof_present | A constructed same-packet witness-object identity and membership proof after the carrier pair exists. |

## Capture Decision

priority-only: the packet resolves the next blocker as carrier-introduction rule absence, not ref/value source absence; defer corpus promotion until a proof-grade rule and same-packet carrier construction exist.
