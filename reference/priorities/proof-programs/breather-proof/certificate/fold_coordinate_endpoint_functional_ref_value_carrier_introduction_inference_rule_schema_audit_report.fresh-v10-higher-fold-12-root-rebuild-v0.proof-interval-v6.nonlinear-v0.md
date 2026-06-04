# Ref/Value Carrier-Introduction Inference-Rule Schema Audit

## Verdict

Status: priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-inference-rule-schema-audit-fail-closed-contract-roots-and-derivation-targets-present-inference-schema-admissibility-preservation-and-same-witness-lemmas-absent-no-row-consumption

This priority-only packet lowers the carrier-introduction derivation blocker to
the inference-rule schema and lemma layer. It asks whether the ready
endpoint-boundary-binding ref contract root, endpoint value-binding map contract
root, and joint same-witness carrier-pair rule root already include a proof-grade
schema that derives the missing carrier-introduction rules.

The audit remains fail-closed. It records 4 / 4
inference-schema source scopes, 4 / 4
ref contract roots, 4 / 4
value-map contract roots, 4 / 4
joint same-witness carrier-pair rule roots, and 4 / 4
derivation target triples. It records 0 / 4
ref contract-to-carrier inference schemata, 0 / 4
value-map contract-to-carrier inference schemata, 0 / 4
same-witness pairing schemata, 0 / 4
admissibility lemmas, 0 / 4
preservation lemmas, 0 / 4
same-witness carrier-pairing lemmas, and 0 / 4
complete inference-rule schema bundles. It consumes 0
rows and authorizes no branch chart.

## Source Artifacts

| Source | Artifact | SHA-256 |
| --- | --- | --- |
| ref_value_carrier_introduction_rule_derivation_attempt | fold_coordinate_endpoint_functional_ref_value_carrier_introduction_rule_derivation_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 20b1e4cef966b277af4d85631c3cc21edc5938eefb6a92d07bea6bba0068ece7 |
| inherited_ref_value_carrier_introduction_rule_theorem_attempt | fold_coordinate_endpoint_functional_ref_value_carrier_introduction_rule_theorem_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 6a38e0cd27d7e2f74f71077c13712db9e62a059c6f3553fc920849d0b47b8c86 |
| inherited_ref_value_non_domain_carrier_rule_target | fold_coordinate_endpoint_functional_ref_value_non_domain_carrier_rule_target.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 5683b5c1e49282d96f3bb67fb6af26590c6cac6948599e98405aa2e1f43ca1c1 |
| inherited_ref_value_carrier_introduction_route_decision | fold_coordinate_endpoint_functional_ref_value_carrier_introduction_route_decision.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 9fbf4e6bd4bbec9f8cfb10ee3bd311f6009de0ddf25ee18771805d0a7c1fdf41 |
| inherited_full_endpoint_boundary_binding_contract_target | fold_coordinate_endpoint_functional_full_endpoint_boundary_binding_contract_target.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 8b302f55ff7b0d520baaf6d4a1b4a4a40d1d547e3616553bea8cd868e2ba135b |
| inherited_endpoint_boundary_binding_primitive_rule_witness_record | fold_coordinate_endpoint_functional_endpoint_boundary_binding_primitive_rule_witness_record_construction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 3528e431bd23d5aee3a39293d53aa115e15ecb2a470ff65582bf8efa313ae596 |
| inherited_endpoint_boundary_binding_ref_carrier_full_binding | fold_coordinate_endpoint_functional_endpoint_boundary_binding_ref_carrier_full_binding_construction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 6904d4a57e58918918ca5583a44c50cd3150967e4fdd9000f78178621b04c5be |
| inherited_endpoint_value_binding_map | fold_coordinate_endpoint_functional_endpoint_value_binding_map_construction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | be4bd97a224256f16b2a8b538834841238ddaf2bbe12f35fac005260f8b4004e |
| inherited_binding_contract_full_binding_carrier_admission_attempt | fold_coordinate_endpoint_functional_binding_contract_full_binding_carrier_admission_construction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 49b9f0e9db17df1197691a190f175545b05668950b81725e01875c3535549c9a |

## Audit Target

State and prove the inference-rule schemata and lemmas needed to derive ref, value-map, and joint same-witness carrier-introduction rules from the ready contract roots.

Accepted as blocker discharge if: Every endpoint has the ref contract-to-carrier inference schema, value-map contract-to-carrier inference schema, joint same-witness pairing schema, admissibility lemma, preservation lemma, source-handle non-promotion lemma, and resulting schema bundle present.

First exact blocker: ref_contract_to_carrier_inference_schema_present, value_map_contract_to_carrier_inference_schema_present, and joint_same_witness_pairing_schema_present

## No-Promotion Rule

Contract roots, derivation targets, route decisions, and primitive witness records are source scope only; they do not imply an inference-rule schema or lemma.

## Candidate Inference-Rule Schemata

| Schema | Status | Premises | Conclusion | Missing rule schema |
| --- | --- | --- | --- | --- |
| ref_contract_to_ref_carrier_introduction_schema_candidate | candidate-obligation-not-proved | ref_contract_root_ready, non_domain_carrier_admissibility_lemma_present, non_domain_carrier_preservation_lemma_present, source_handle_non_promotion_lemma_present | ref_contract_to_ref_carrier_rule_derivation_present | ref_contract_to_carrier_inference_schema_present |
| value_map_contract_to_value_map_carrier_introduction_schema_candidate | candidate-obligation-not-proved | value_map_contract_root_ready, non_domain_carrier_admissibility_lemma_present, non_domain_carrier_preservation_lemma_present, source_handle_non_promotion_lemma_present | value_map_contract_to_value_map_carrier_rule_derivation_present | value_map_contract_to_carrier_inference_schema_present |
| joint_same_witness_carrier_pairing_schema_candidate | candidate-obligation-not-proved | joint_same_witness_carrier_pair_rule_root_ready, ref_contract_to_ref_carrier_rule_derivation_present, value_map_contract_to_value_map_carrier_rule_derivation_present, same_witness_carrier_pairing_lemma_present | joint_same_witness_carrier_pair_rule_derivation_present | joint_same_witness_pairing_schema_present |

## Proof Burdens

| Burden | Missing field | Required evidence |
| --- | --- | --- |
| carrier_introduction_inference_rule_schema | carrier_introduction_inference_rule_schema_present | A proof-grade inference-rule schema family that jointly licenses ref, value-map, and same-witness carrier-pair introduction. |
| ref_contract_to_carrier_inference_schema | ref_contract_to_carrier_inference_schema_present | A proof-grade inference schema that turns an endpoint-boundary-binding ref contract root into the ref carrier-introduction rule derivation. |
| value_map_contract_to_carrier_inference_schema | value_map_contract_to_carrier_inference_schema_present | A proof-grade inference schema that turns an endpoint value-binding map contract root into the value-map carrier-introduction rule derivation. |
| joint_same_witness_pairing_schema | joint_same_witness_pairing_schema_present | A proof-grade pairing schema that derives the joint same-witness carrier-pair rule from the two carrier-rule derivations. |
| ref_contract_to_ref_carrier_axiom_or_lemma | ref_contract_to_ref_carrier_axiom_or_lemma_present | A proof-grade axiom or lemma that specifically maps the endpoint-boundary-binding ref contract root to a ref carrier-introduction derivation. |
| value_map_contract_to_value_map_carrier_axiom_or_lemma | value_map_contract_to_value_map_carrier_axiom_or_lemma_present | A proof-grade axiom or lemma that specifically maps the endpoint value-binding map contract root to a value-map carrier-introduction derivation. |
| joint_same_witness_carrier_pair_axiom_or_lemma | joint_same_witness_carrier_pair_axiom_or_lemma_present | A proof-grade axiom or lemma that specifically maps the two carrier derivations into one same-witness carrier-pair derivation. |
| non_domain_carrier_admissibility_lemma | non_domain_carrier_admissibility_lemma_present | A lemma proving that the non-domain carrier fields introduced by the schema are admissible witness-object fields. |
| non_domain_carrier_preservation_lemma | non_domain_carrier_membership_preservation_lemma_present | A lemma proving that carrier introduction preserves non-domain carrier status rather than promoting source handles by adjacency. |
| same_witness_carrier_pairing_lemma | same_witness_carrier_pairing_lemma_present | A lemma proving that the ref carrier and value-map carrier produced by the two schemata land in one same-packet witness object. |
| source_handle_non_promotion_lemma | source_handle_non_promotion_lemma_present | A lemma excluding direct promotion of endpoint-boundary-binding refs or value maps into carrier fields without the inference schema. |
| inference_rule_schema_soundness | inference_rule_schema_soundness_proof_present | A proof that the inference-rule schema family is sound for the endpoint carrier-introduction targets. |
| endpoint_instantiation_lemma | endpoint_instantiation_lemma_present | A proof that each endpoint functional instantiates every premise of the carrier-introduction inference-rule schema. |
| carrier_rule_derivation_discharge | inference_rule_schema_bundle_present | The schema, axiom/lemma layer, soundness proof, endpoint instantiation lemma, and derived carrier-rule fields marked present together. |

## Tested Routes

| Route | Status | Required fields | Limitation |
| --- | --- | --- | --- |
| contract_roots_as_inference_schema_route | rejected-root-only | inference_schema_source_scope_ready, ref_contract_to_carrier_inference_schema_present, value_map_contract_to_carrier_inference_schema_present | Ready contract roots are inputs to a rule schema; they are not the schema or lemma that licenses carrier introduction. |
| derivation_targets_as_inference_schema_route | rejected-target-only | derivation_targets_declared, joint_same_witness_pairing_schema_present, same_witness_carrier_pairing_lemma_present | Derivation targets name what must be proven; they do not provide the inference rule or same-witness pairing lemma. |
| ref_contract_inference_schema_route | blocked | ref_contract_root_ready, ref_contract_to_carrier_inference_schema_present, non_domain_carrier_admissibility_lemma_present | No explicit rule schema maps an endpoint-boundary-binding ref contract to a ref non-domain carrier rule. |
| value_map_contract_inference_schema_route | blocked | value_map_contract_root_ready, value_map_contract_to_carrier_inference_schema_present, non_domain_carrier_preservation_lemma_present | No explicit rule schema maps an endpoint value-binding map contract to a value-map non-domain carrier rule. |
| same_witness_pairing_schema_route | blocked | joint_same_witness_carrier_pair_rule_root_ready, joint_same_witness_pairing_schema_present, same_witness_carrier_pairing_lemma_present | No pairing schema proves that the introduced ref carrier and value-map carrier occupy one same-packet witness object. |
| admissibility_preservation_lemma_route | blocked | non_domain_carrier_admissibility_lemma_present, non_domain_carrier_preservation_lemma_present, source_handle_non_promotion_lemma_present | No lemma proves admissibility, preservation of non-domain carrier status, or source-handle non-promotion. |
| schema_to_derivation_route | blocked-downstream | inference_rule_schema_bundle_present, ref_contract_to_ref_carrier_rule_derivation_present, value_map_contract_to_value_map_carrier_rule_derivation_present, joint_same_witness_carrier_pair_rule_derivation_present | The three derivations remain downstream of a complete inference-rule schema bundle. |
| row_consumption_after_inference_schema_route | blocked-downstream | derivation_bundle_present, ref_value_non_domain_carrier_pair_constructed, row_consumption_authorized, branch_chart_authorized | Rows cannot be consumed until derivations, soundness, endpoint application, and carrier-pair construction exist. |

## Endpoint Audits

| Endpoint | Role | Source scope | Ref schema | Value schema | Pairing schema | Admissibility | Preservation | Same-witness lemma | Schema bundle | Derivation bundle | First blocker |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| fc_sigma_source_lower | source | true | false | false | false | false | false | false | false | false | carrier_introduction_inference_rule_schema_present |
| fc_rho_receiver_lower | receiver | true | false | false | false | false | false | false | false | false | carrier_introduction_inference_rule_schema_present |
| fc_sigma_source_upper | source | true | false | false | false | false | false | false | false | false | carrier_introduction_inference_rule_schema_present |
| fc_rho_receiver_upper | receiver | true | false | false | false | false | false | false | false | false | carrier_introduction_inference_rule_schema_present |

## Row Audits

| Row | Source scopes | Schema bundle pair | Derivation bundle pair | Ref derivation pair | Value derivation pair | Joint derivation pair | Consumed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| R_w_A04_A03 | true | false | false | false | false | false | false |
| R_u_A10_A09 | true | false | false | false | false | false | false |
| R_u_A07_A06 | true | false | false | false | false | false | false |

## Endpoint Field Counts

| Field | Count |
| --- | ---: |
| ref_contract_root_ready | 4 / 4 |
| value_map_contract_root_ready | 4 / 4 |
| joint_same_witness_carrier_pair_rule_root_ready | 4 / 4 |
| source_derivation_premise_set_ready | 4 / 4 |
| direct_source_promotion_rejected | 4 / 4 |
| carrier_admission_route_selected | 4 / 4 |
| derivation_targets_declared | 4 / 4 |
| inference_schema_source_scope_ready | 4 / 4 |
| inference_rule_schema_target_declared | 4 / 4 |
| ref_contract_carrier_lemma_target_declared | 4 / 4 |
| value_map_carrier_lemma_target_declared | 4 / 4 |
| joint_same_witness_lemma_target_declared | 4 / 4 |
| non_promotion_soundness_lemma_target_declared | 4 / 4 |
| endpoint_instantiation_lemma_target_declared | 4 / 4 |
| missing_axiom_lemma_layer_identified | 4 / 4 |
| carrier_introduction_inference_rule_schema_present | 0 / 4 |
| ref_contract_to_carrier_inference_schema_present | 0 / 4 |
| value_map_contract_to_carrier_inference_schema_present | 0 / 4 |
| joint_same_witness_pairing_schema_present | 0 / 4 |
| ref_contract_to_ref_carrier_axiom_or_lemma_present | 0 / 4 |
| value_map_contract_to_value_map_carrier_axiom_or_lemma_present | 0 / 4 |
| joint_same_witness_carrier_pair_axiom_or_lemma_present | 0 / 4 |
| non_domain_carrier_admissibility_lemma_present | 0 / 4 |
| non_domain_carrier_preservation_lemma_present | 0 / 4 |
| non_domain_carrier_membership_preservation_lemma_present | 0 / 4 |
| same_witness_carrier_pairing_lemma_present | 0 / 4 |
| source_handle_non_promotion_lemma_present | 0 / 4 |
| carrier_rule_soundness_schema_present | 0 / 4 |
| inference_rule_schema_soundness_proof_present | 0 / 4 |
| endpoint_application_schema_present | 0 / 4 |
| endpoint_instantiation_lemma_present | 0 / 4 |
| inference_rule_schema_bundle_present | 0 / 4 |
| ref_contract_to_ref_carrier_rule_derivation_present | 0 / 4 |
| value_map_contract_to_value_map_carrier_rule_derivation_present | 0 / 4 |
| joint_same_witness_carrier_pair_rule_derivation_present | 0 / 4 |
| derivation_soundness_bridge_present | 0 / 4 |
| carrier_rule_soundness_proof_present | 0 / 4 |
| carrier_rule_application_proof_present | 0 / 4 |
| ref_carrier_introduction_rule_available | 0 / 4 |
| value_map_carrier_introduction_rule_available | 0 / 4 |
| ref_value_carrier_pair_rule_available | 0 / 4 |
| ref_value_non_domain_carrier_pair_constructed | 0 / 4 |
| derivation_bundle_present | 0 / 4 |
| row_consumption_authorized | 0 / 4 |
| branch_chart_authorized | 0 / 4 |

## Row Field Counts

| Field | Count |
| --- | ---: |
| row_locator_resolved | 3 / 3 |
| source_inference_schema_source_scope_ready | 3 / 3 |
| receiver_inference_schema_source_scope_ready | 3 / 3 |
| combined_inference_schema_source_scope_ready | 3 / 3 |
| source_inference_rule_schema_bundle_present | 0 / 3 |
| receiver_inference_rule_schema_bundle_present | 0 / 3 |
| combined_inference_rule_schema_bundle_present | 0 / 3 |
| source_derivation_bundle_present | 0 / 3 |
| receiver_derivation_bundle_present | 0 / 3 |
| combined_derivation_bundle_present | 0 / 3 |
| source_ref_contract_to_ref_carrier_rule_derivation_present | 0 / 3 |
| receiver_ref_contract_to_ref_carrier_rule_derivation_present | 0 / 3 |
| combined_ref_contract_to_ref_carrier_rule_derivation_present | 0 / 3 |
| source_value_map_contract_to_value_map_carrier_rule_derivation_present | 0 / 3 |
| receiver_value_map_contract_to_value_map_carrier_rule_derivation_present | 0 / 3 |
| combined_value_map_contract_to_value_map_carrier_rule_derivation_present | 0 / 3 |
| source_joint_same_witness_carrier_pair_rule_derivation_present | 0 / 3 |
| receiver_joint_same_witness_carrier_pair_rule_derivation_present | 0 / 3 |
| combined_joint_same_witness_carrier_pair_rule_derivation_present | 0 / 3 |
| row_unblocked | 0 / 3 |
| row_consumed | 0 / 3 |
| branch_chart_authorized | 0 / 3 |

## Capture Decision

priority-only; records a fail-closed carrier-introduction inference-rule schema audit and does not promote to reader-facing corpus prose.
