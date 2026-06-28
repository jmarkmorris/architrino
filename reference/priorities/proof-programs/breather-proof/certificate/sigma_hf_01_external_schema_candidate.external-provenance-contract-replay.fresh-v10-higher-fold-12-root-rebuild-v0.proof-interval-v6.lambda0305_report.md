# Sigma_hf_01 External Provenance Contract Replay

Status: `sigma_hf_01_external_schema_candidate_external_provenance_contract_replay_fail_closed_no_external_provenance_accepted_no_schema_validation_intake_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization`

## Claim Level

priority-only Sigma_hf_01 external provenance contract replay; screens local proof-program JSON paths as attempted candidate refs and proves they cannot satisfy the external proof-grade schema provenance predicate before schema-validation intake

## Replay Summary

- local proof-program JSON paths screened as attempted candidate refs: 280
- external provenance accepted records: 0
- schema-validation intake candidates found: 0
- local path candidate refs rejected: 280
- local or self-authored candidate refs rejected: 280
- field-complete but provenance-rejected records: 0
- external schema inputs received: 0
- first failure: `external_schema_provenance_required_before_schema_validation_intake`

## Eight Schema Predicate Fields

| Field | Intake role |
| --- | --- |
| `compatible_schema_role_lock` | required before schema-validation intake |
| `compatible_proof_object_role_lock` | required before schema-validation intake |
| `derivation_proof_target_lock` | required before schema-validation intake |
| `derivation_proof_source_data_record_lock` | required before schema-validation intake |
| `rule_kernel_obligation_binding` | required before schema-validation intake |
| `rule_kernel_derivation_payload_target_binding` | required before schema-validation intake |
| `proof_grade_derivation_schema_statement` | required before schema-validation intake |
| `non_reinterpretation_guard` | required before schema-validation intake |

## External Provenance Predicate

| Field | Intake role |
| --- | --- |
| `external_schema_provenance.provenance_class` | required external provenance predicate |
| `external_schema_provenance.source_ref` | required external provenance predicate |
| `external_schema_provenance.acceptance_contract_ref` | required external provenance predicate |
| `external_schema_provenance.received_for_schema_validation` | required external provenance predicate |
| `external_schema_provenance.authored_inside_local_proof_program_pool` | required external provenance predicate |
| `external_schema_provenance.derived_from_local_certificate_json` | required external provenance predicate |
| `external_schema_provenance.self_authored_placeholder` | required external provenance predicate |
| `external_schema_provenance.local_path_treated_as_external_evidence` | required external provenance predicate |

## Focused Local Rejections

| Local record | Schema fields present | Provenance status | First failed provenance predicate | Slot result |
| --- | --- | --- | --- | --- |
| `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_current_pool_absence_classifier.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json` | 0 / 8 | `external_schema_provenance_required` | `external_schema_provenance.provenance_class` | `external_input_required` |
| `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_current_pool_absence_classifier.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json` | 0 / 8 | `external_schema_provenance_required` | `external_schema_provenance.provenance_class` | `external_input_required` |
| `sigma_hf_01_external_schema_candidate.local-missing-proof-grade-placeholders-rejected.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json` | 5 / 8 | `external_schema_provenance_required` | `external_schema_provenance.provenance_class` | `external_input_required` |
| `sigma_hf_01_external_schema_candidate.local-source-data-partial.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json` | 5 / 8 | `external_schema_provenance_required` | `external_schema_provenance.provenance_class` | `external_input_required` |
| `sigma_hf_01_external_schema_candidate.missing-proof-grade-fields-derivation-target.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json` | 0 / 8 | `external_schema_provenance_required` | `external_schema_provenance.provenance_class` | `external_input_required` |
| `sigma_hf_01_external_schema_candidate.placeholder-rejection-intake-record.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json` | 0 / 8 | `external_schema_provenance_required` | `external_schema_provenance.provenance_class` | `external_input_required` |
| `sigma_hf_01_external_schema_candidate.proof-object-envelope.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json` | 0 / 8 | `external_schema_provenance_required` | `external_schema_provenance.provenance_class` | `external_input_required` |
| `sigma_hf_01_external_schema_candidate_intake_record.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json` | 0 / 8 | `external_schema_provenance_required` | `external_schema_provenance.provenance_class` | `external_input_required` |

## Actual External Object Binding

- `accepted_external_schema_provenance`
- `all_eight_sigma_hf_01_schema_predicate_fields`
- `same_record_binding_between_source_data_payload_target_and_schema_statement`
- `non_reinterpretation_guard_against_local_diagnostics_target_packets_and_absence_classifiers`
- `post_intake_schema_validation_before_any_row_slot_consumption`

## Authorization Locks

- schema_validation_intake: `false`
- row_consumption: `false`
- accepted_source_packet: `false`
- `preledger_pass`: `false`
- `updates_live_ledger`: `false`
- branch_chart_authorized: `false`

This replay is fail-closed. Local proof-program files, local source-data
partials, self-authored placeholders, target packets, and absence classifiers
do not satisfy external proof-grade provenance. The 11 row slots remain parked
until the `Sigma_hf_01` separator slot first passes provenance intake and
schema validation.
