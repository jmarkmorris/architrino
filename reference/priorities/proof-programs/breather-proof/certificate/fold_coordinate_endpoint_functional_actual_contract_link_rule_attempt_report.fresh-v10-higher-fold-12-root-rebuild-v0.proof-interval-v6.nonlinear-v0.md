# Higher-Fold Endpoint-Functional Actual Contract-Link Rule Attempt

## Verdict

Status: `priority-only-fold-coordinate-endpoint-functional-actual-contract-link-rule-attempt-fail-closed-source-candidates-present-rule-obligations-unsatisfied-witness-object-contract-links-absent-no-row-consumption`.

This priority-only packet attempts the actual witness-object contract-link
rule above the source-candidate packet. It imports 4 / 4
source candidates and applies 4 / 4
actual-rule attempts, but the proof-grade obligations needed to promote those
source candidates into actual witness-object contract links are not satisfied.

The packet remains fail-closed. It satisfies 0 / 4
actual-rule obligation sets, leaves 40
endpoint-level actual-link obligations missing, constructs
0 / 4 witness-object contract links,
satisfies 0 / 4 binding contracts, constructs
0 / 4 full endpoint boundary bindings,
admits 0 / 4
endpoint-boundary-binding reference carriers, admits
0 / 4 endpoint value-map carriers,
and consumes 0 rows.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
| `witness_object_contract_link_source_candidate_construction_attempt` | `fold_coordinate_endpoint_functional_witness_object_contract_link_construction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | true | `a07209d3e444711f8046813b3e156da25ebdeeb792ac2102d6af9d59306b81ed` |

## Attempted Rule

A source candidate can be promoted to an actual witness-object contract link only if a proof rule is present and every listed obligation proves witness-object membership, contract-target satisfaction, proof-grade target ref/value equations, endpoint-ref and first-primitive compatibility, carrier admission, motion/evaluation, algebraic certificates, and candidate replay.

Source-candidate integrity and actual-rule attempt application do not construct a witness-object contract link. The packet stays fail-closed unless every actual-rule obligation is satisfied in proof-grade form.

## Actual-Link Rule Obligations

| Obligation | Source evidence | Description |
| --- | --- | --- |
| `actual_contract_link_rule_available` | `absent` | A declared proof rule must state when a witness object, contract target, endpoint value-binding map, endpoint-boundary-binding ref, first primitive, and target ref/value equations assemble into an actual witness-object contract link. |
| `witness_object_membership_proof_present` | `ids-only` | The candidate must prove that the endpoint-boundary-binding ref and endpoint value-binding map are fields of the same constructed witness object rather than only adjacent referenced IDs. |
| `contract_target_satisfaction_proof_present` | `contract-test-applied-contract-not-satisfied` | The candidate must prove satisfaction of the inherited full endpoint boundary-binding contract target. |
| `target_ref_value_equations_proof_grade` | `source-equation-only` | Every target ref/value equation must be promoted beyond source-equation-only status into proof-grade contract-link evidence. |
| `endpoint_boundary_binding_ref_compatibility_proof_present` | `ref-carrier-locked` | The endpoint-boundary-binding ref must be certified compatible with the target endpoint boundary-binding object on the domain-chart carrier. |
| `first_primitive_compatibility_proof_present` | `primitive-id-only` | The first endpoint boundary-binding primitive must be certified compatible with the value map and contract target. |
| `carrier_admission_bridge_present` | `carrier-admission-absent` | The packet must bridge the actual link into endpoint-boundary-binding reference carrier and endpoint value-map carrier admission. |
| `motion_evaluation_bridge_present` | `motion-evaluation-absent` | The packet must connect the link to endpoint motion/evaluation maps, including full endpoint and global domain evaluation maps. |
| `algebraic_certificate_bridge_present` | `algebraic-certificates-absent` | The packet must supply non-target zero, exact screen zero, and rank certificates needed by full endpoint boundary binding. |
| `candidate_replay_bridge_present` | `replay-absent` | The packet must supply candidate artifacts, topology recertification, and proof-interval replay before row consumption. |

## Construction Methods

| Method | Output kind | Required fields | Description |
| --- | --- | ---: | --- |
| `source_candidate_integrity_check` | `source-candidate-integrity` | 15 | Check that the predecessor supplied a complete witness-object contract-link source candidate with all required ID attachments and target ref/value equations. |
| `actual_contract_link_rule_obligation_check` | `actual-contract-link-rule` | 12 | Check whether the source candidate is supported by a proof-grade rule and every obligation needed to promote it into an actual witness-object contract link. |
| `actual_contract_link_construction_check` | `witness-object-contract-link` | 3 | Check whether all actual-rule obligations construct and attach the witness-object contract link. |
| `downstream_contract_and_carrier_admission_check` | `full-endpoint-boundary-binding` | 6 | Check whether the actual link unlocks binding contract satisfaction, full endpoint boundary binding, and both carrier admissions. |

## Endpoint Rule Attempts

| Endpoint | Role | Source candidate | Rule attempt | Obligations satisfied | Missing obligations | Link constructed | Link attached | Contract | Full binding | Ref carrier | Value-map carrier |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `fc_sigma_source_lower` | `source` | true | true | false | 10 | false | false | false | false | false | false |
| `fc_rho_receiver_lower` | `receiver` | true | true | false | 10 | false | false | false | false | false | false |
| `fc_sigma_source_upper` | `source` | true | true | false | 10 | false | false | false | false | false | false |
| `fc_rho_receiver_upper` | `receiver` | true | true | false | 10 | false | false | false | false | false | false |

## Row Rule Attempts

| Row | Failed side | Source-candidate pair | Rule-attempt pair | Obligation pair | Contract-link pair | Contract pair | Full-binding pair | Ref-carrier pair | Consumed |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `R_w_A04_A03` | `lo` | true | true | false | false | false | false | false | false |
| `R_u_A10_A09` | `lo` | true | true | false | false | false | false | false | false |
| `R_u_A07_A06` | `hi` | true | true | false | false | false | false | false | false |

## Endpoint Field Counts

| Field | Count |
| --- | ---: |
| `witness_object_contract_link_input_ready` | 4 / 4 |
| `witness_object_contract_link_source_candidate_declared` | 4 / 4 |
| `witness_object_contract_link_source_candidate_targets_contract_target` | 4 / 4 |
| `witness_object_contract_link_source_candidate_targets_endpoint_value_binding_map` | 4 / 4 |
| `witness_object_contract_link_source_candidate_targets_endpoint_boundary_binding_ref` | 4 / 4 |
| `witness_object_contract_link_source_candidate_targets_witness_object_attempt` | 4 / 4 |
| `witness_object_contract_link_source_candidate_value_equations_attached` | 4 / 4 |
| `witness_object_contract_link_source_candidate_recorded` | 4 / 4 |
| `source_candidate_id_present` | 4 / 4 |
| `contract_target_id_present` | 4 / 4 |
| `endpoint_value_binding_map_id_present` | 4 / 4 |
| `witness_object_endpoint_boundary_binding_ref_id_present` | 4 / 4 |
| `source_witness_object_attempt_id_present` | 4 / 4 |
| `first_endpoint_boundary_binding_primitive_id_present` | 4 / 4 |
| `target_endpoint_value_binding_source_equations_present` | 4 / 4 |
| `actual_contract_link_rule_available` | 0 / 4 |
| `witness_object_membership_proof_present` | 0 / 4 |
| `contract_target_satisfaction_proof_present` | 0 / 4 |
| `target_ref_value_equations_proof_grade` | 0 / 4 |
| `endpoint_boundary_binding_ref_compatibility_proof_present` | 0 / 4 |
| `first_primitive_compatibility_proof_present` | 0 / 4 |
| `carrier_admission_bridge_present` | 0 / 4 |
| `motion_evaluation_bridge_present` | 0 / 4 |
| `algebraic_certificate_bridge_present` | 0 / 4 |
| `candidate_replay_bridge_present` | 0 / 4 |
| `actual_contract_link_rule_attempt_applied` | 4 / 4 |
| `actual_contract_link_rule_obligations_satisfied` | 0 / 4 |
| `witness_object_contract_link_constructed` | 0 / 4 |
| `witness_object_has_contract_link` | 0 / 4 |
| `binding_contract_satisfied` | 0 / 4 |
| `full_endpoint_boundary_binding_constructed` | 0 / 4 |
| `endpoint_boundary_binding_ref_carrier_unblocked` | 0 / 4 |
| `endpoint_value_binding_map_carrier_unblocked` | 0 / 4 |

## Row Field Counts

| Field | Count |
| --- | ---: |
| `row_locator_resolved` | 3 / 3 |
| `source_witness_object_contract_link_source_candidate_recorded` | 3 / 3 |
| `receiver_witness_object_contract_link_source_candidate_recorded` | 3 / 3 |
| `combined_witness_object_contract_link_source_candidate_pair_recorded` | 3 / 3 |
| `source_actual_contract_link_rule_attempt_applied` | 3 / 3 |
| `receiver_actual_contract_link_rule_attempt_applied` | 3 / 3 |
| `combined_actual_contract_link_rule_attempt_pair_applied` | 3 / 3 |
| `source_actual_contract_link_rule_obligations_satisfied` | 0 / 3 |
| `receiver_actual_contract_link_rule_obligations_satisfied` | 0 / 3 |
| `combined_actual_contract_link_rule_obligations_satisfied` | 0 / 3 |
| `source_witness_object_contract_link_constructed` | 0 / 3 |
| `receiver_witness_object_contract_link_constructed` | 0 / 3 |
| `combined_witness_object_contract_link_pair_constructed` | 0 / 3 |
| `source_witness_object_has_contract_link` | 0 / 3 |
| `receiver_witness_object_has_contract_link` | 0 / 3 |
| `combined_witness_object_contract_link_pair_attached` | 0 / 3 |
| `source_binding_contract_satisfied` | 0 / 3 |
| `receiver_binding_contract_satisfied` | 0 / 3 |
| `combined_binding_contract_pair_satisfied` | 0 / 3 |
| `source_full_endpoint_boundary_binding_constructed` | 0 / 3 |
| `receiver_full_endpoint_boundary_binding_constructed` | 0 / 3 |
| `combined_full_endpoint_boundary_binding_pair_constructed` | 0 / 3 |
| `source_endpoint_boundary_binding_ref_carrier_unblocked` | 0 / 3 |
| `receiver_endpoint_boundary_binding_ref_carrier_unblocked` | 0 / 3 |
| `combined_endpoint_boundary_binding_ref_carrier_pair_unblocked` | 0 / 3 |
| `source_endpoint_value_binding_map_carrier_unblocked` | 0 / 3 |
| `receiver_endpoint_value_binding_map_carrier_unblocked` | 0 / 3 |
| `combined_endpoint_value_binding_map_carrier_pair_unblocked` | 0 / 3 |
| `residual_data_construction_ready` | 0 / 3 |
| `row_unblocked` | 0 / 3 |
| `row_consumed` | 0 / 3 |
| `branch_chart_authorized` | 0 / 3 |

## Capture Decision

Priority-only. This packet attempts the actual witness-object contract-link rule above the recorded source candidates. It records that 4 / 4 source candidates pass integrity checks and 4 / 4 actual-rule attempts are applied, but 40 proof-grade actual-link obligations remain missing, so it constructs 0 / 4 actual witness-object contract links, satisfies 0 / 4 binding contracts, constructs 0 / 4 full endpoint boundary bindings, admits 0 / 4 reference carriers, admits 0 / 4 value-map carriers, prepares 0 residual-data rows, authorizes no branch chart, and consumes 0 rows.
