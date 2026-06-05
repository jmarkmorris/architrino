# Higher-Fold Endpoint-Functional Endpoint Boundary-Binding Ref Carrier And Full Binding Construction Attempt

## Verdict

Status: `priority-only-fold-coordinate-endpoint-functional-endpoint-boundary-binding-ref-carrier-full-binding-construction-attempt-partial-pass-witness-object-ref-fields-constructed-full-binding-and-carrier-admission-locked-no-row-consumption`.

This priority-only packet continues after the endpoint boundary-binding
primitive rule/witness-record construction attempt. It constructs
4 /
4 witness-object endpoint-boundary-binding
reference fields by pointing them to the first endpoint boundary-binding
primitives and certifying 4 /
4 target attachments.

The packet remains fail-closed for carrier admission and row closure. It
constructs 0 / 4 full endpoint boundary bindings,
unblocks 0 / 4 endpoint-boundary-binding
reference carriers, constructs 0 / 4 endpoint
value bindings, satisfies 0 / 4 contracts, and
consumes 0 rows.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
| `primitive_rule_witness_record_construction_attempt` | `fold_coordinate_endpoint_functional_endpoint_boundary_binding_primitive_rule_witness_record_construction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | true | `3528e431bd23d5aee3a39293d53aa115e15ecb2a470ff65582bf8efa313ae596` |

## Construction Rule

An applied primitive rule and primitive binding witness record may be lifted into a witness-object endpoint-boundary-binding reference field by pointing the witness object to the first endpoint boundary-binding primitive and certifying that the primitive target ref/value attachment is the referenced target.

A witness-object reference field is not carrier admission and is not a full endpoint boundary binding. Carrier admission still requires full_endpoint_boundary_binding_constructed plus endpoint_boundary_binding_ref_carrier_unblocked, and row closure still requires value binding, contract satisfaction, motion/evaluation, algebraic certificates, artifact/topology/replay data, and residual-data construction.

## Construction Methods

| Method | Output kind | Required fields | Description |
| --- | --- | ---: | --- |
| `first_primitive_source_ready` | `input-readiness` | 6 | Check that the prior packet supplied the first endpoint boundary-binding primitive with rule, witness-record, domain-chart attachment, and target ref/value attachment. |
| `witness_object_endpoint_boundary_binding_ref_field_construction` | `witness-object-reference-field` | 7 | Construct a witness-object endpoint-boundary-binding reference field that points to the first endpoint boundary-binding primitive and certifies the target attachment. |
| `reference_field_as_carrier_admission` | `carrier-admission` | 4 | Test whether the witness-object reference field also admits the endpoint-boundary-binding reference carrier. |
| `reference_field_as_full_endpoint_boundary_binding` | `full-binding-contract` | 15 | Test whether the reference field also supplies the full endpoint boundary-binding contract, value binding, motion/evaluation, algebraic certificates, artifacts, topology recertification, and proof replay. |

## Endpoint Construction Attempts

| Endpoint | Role | First primitive | Ref field | Full binding | Ref carrier | Value binding | Contract |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `fc_sigma_source_lower` | `source` | true | true | false | false | false | false |
| `fc_rho_receiver_lower` | `receiver` | true | true | false | false | false | false |
| `fc_sigma_source_upper` | `source` | true | true | false | false | false | false |
| `fc_rho_receiver_upper` | `receiver` | true | true | false | false | false | false |

## Row Construction Attempts

| Row | Failed side | Primitive pair | Ref-field pair | Ref-carrier pair | Full-binding pair | Consumed |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| `R_w_A04_A03` | `lo` | true | true | false | false | false |
| `R_u_A10_A09` | `lo` | true | true | false | false | false |
| `R_u_A07_A06` | `hi` | true | true | false | false | false |

## Endpoint Field Counts

| Field | Count |
| --- | ---: |
| `primitive_payload_target_ready` | 4 / 4 |
| `primitive_construction_rule_applied` | 4 / 4 |
| `primitive_binding_witness_record_constructed` | 4 / 4 |
| `primitive_domain_chart_attachment_certified` | 4 / 4 |
| `primitive_target_ref_value_attachment_certified` | 4 / 4 |
| `endpoint_boundary_binding_constructed` | 4 / 4 |
| `witness_object_endpoint_boundary_binding_ref_declared` | 4 / 4 |
| `witness_object_endpoint_boundary_binding_ref_constructed` | 4 / 4 |
| `witness_object_has_endpoint_boundary_binding_ref` | 4 / 4 |
| `endpoint_boundary_binding_ref_targets_first_primitive` | 4 / 4 |
| `endpoint_boundary_binding_ref_target_attachment_certified` | 4 / 4 |
| `full_endpoint_boundary_binding_constructed` | 0 / 4 |
| `endpoint_boundary_binding_ref_carrier_unblocked` | 0 / 4 |
| `endpoint_boundary_binding_witness_constructed` | 0 / 4 |
| `endpoint_boundary_binding_witness_object_constructed` | 0 / 4 |
| `endpoint_value_bound_to_boundary_binding` | 0 / 4 |
| `binding_contract_satisfied` | 0 / 4 |
| `same_packet_history_update_formula_present` | 0 / 4 |
| `endpoint_motion_rule_constructed` | 0 / 4 |
| `endpoint_evaluation_map_constructed` | 0 / 4 |
| `full_endpoint_evaluation_map_constructed` | 0 / 4 |
| `global_domain_evaluation_map_constructed` | 0 / 4 |
| `non_target_endpoint_zero_certified` | 0 / 4 |
| `exact_screen_zero_certified` | 0 / 4 |
| `rank_certified` | 0 / 4 |
| `candidate_artifacts_present` | 0 / 4 |
| `root_topology_recertified_for_candidate_change` | 0 / 4 |
| `proof_interval_v1_v6_rerun_for_candidate_change` | 0 / 4 |

## Row Field Counts

| Field | Count |
| --- | ---: |
| `row_locator_resolved` | 3 / 3 |
| `source_endpoint_boundary_binding_primitive_constructed` | 3 / 3 |
| `receiver_endpoint_boundary_binding_primitive_constructed` | 3 / 3 |
| `combined_endpoint_boundary_binding_primitive_pair_constructed` | 3 / 3 |
| `source_witness_object_endpoint_boundary_binding_ref_constructed` | 3 / 3 |
| `receiver_witness_object_endpoint_boundary_binding_ref_constructed` | 3 / 3 |
| `combined_witness_object_endpoint_boundary_binding_ref_pair_constructed` | 3 / 3 |
| `source_endpoint_boundary_binding_ref_carrier_unblocked` | 0 / 3 |
| `receiver_endpoint_boundary_binding_ref_carrier_unblocked` | 0 / 3 |
| `combined_endpoint_boundary_binding_ref_carrier_pair_unblocked` | 0 / 3 |
| `source_full_endpoint_boundary_binding_constructed` | 0 / 3 |
| `receiver_full_endpoint_boundary_binding_constructed` | 0 / 3 |
| `combined_full_endpoint_boundary_binding_pair_constructed` | 0 / 3 |
| `source_endpoint_value_bound_to_boundary_binding` | 0 / 3 |
| `receiver_endpoint_value_bound_to_boundary_binding` | 0 / 3 |
| `combined_endpoint_value_binding_pair_constructed` | 0 / 3 |
| `combined_binding_contract_pair_satisfied` | 0 / 3 |
| `combined_endpoint_evaluation_map_pair_constructed` | 0 / 3 |
| `residual_data_construction_ready` | 0 / 3 |
| `row_unblocked` | 0 / 3 |
| `row_consumed` | 0 / 3 |
| `branch_chart_authorized` | 0 / 3 |

## Capture Decision

Priority-only. This packet closes the witness-object endpoint-boundary-binding reference-field blocker by constructing 4 / 4 reference fields and 3 / 3 row reference-field pairs. It intentionally does not promote those reference fields into full endpoint boundary bindings, endpoint-boundary-binding reference-carrier admission, endpoint value bindings, contract satisfaction, residual-data readiness, row closure, live-ledger update, branch-chart authorization, or row consumption.
