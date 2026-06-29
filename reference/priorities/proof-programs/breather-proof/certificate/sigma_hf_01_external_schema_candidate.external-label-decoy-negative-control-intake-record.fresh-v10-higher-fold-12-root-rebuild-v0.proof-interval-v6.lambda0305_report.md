# Sigma_hf_01 External Schema Candidate Intake Record

Status: `external_input_required`

## Scope

- Packet identity: `fresh-v10-higher-fold-12-root-rebuild-v0`
- Proof interval: `proof-interval-v6`
- Lambda branch: `lambda0305`
- Target slot: `Sigma_hf_01`
- Fold interval: `F01`
- Candidate external schema ref: `external-proof-looking-label:Sigma_hf_01:fresh-v10-higher-fold-12-root-rebuild-v0:proof-interval-v6:lambda0305`
- Candidate external schema received: `false`
- Candidate known local non-external artifact: `true`
- External provenance accepted: `false`
- External provenance status: `external_schema_provenance_required`
- Candidate status: `local_external_label_decoy_negative_control_not_external_proof_grade_schema`

## Intake Predicate

| Required field | Current reading | Verdict |
| --- | --- | --- |
| `compatible_schema_role_lock` | present | `present_on_candidate_for_intake_screen` |
| `compatible_proof_object_role_lock` | present | `present_on_candidate_for_intake_screen` |
| `derivation_proof_target_lock` | present | `present_on_candidate_for_intake_screen` |
| `derivation_proof_source_data_record_lock` | present | `present_on_candidate_for_intake_screen` |
| `rule_kernel_obligation_binding` | present | `present_on_candidate_for_intake_screen` |
| `rule_kernel_derivation_payload_target_binding` | present | `present_on_candidate_for_intake_screen` |
| `proof_grade_derivation_schema_statement` | present | `present_on_candidate_for_intake_screen` |
| `non_reinterpretation_guard` | present | `present_on_candidate_for_intake_screen` |

Current count: 8 / 8 required fields present.
First missing field: none.


## External-Label Decoy Negative Control

- Status: `external_looking_labels_and_8_of_8_fields_rejected_without_accepted_external_provenance`
- Required fields structurally present: 8 / 8
- External provenance accepted: `false`
- Candidate external schema received: `false`
- Expected first failure: `external_schema_provenance_required_before_schema_validation_intake`

This local negative control proves that external-looking candidate labels and
8 / 8 structurally present fields do not authorize schema-validation intake
without accepted external provenance.


## External Provenance Predicate

| Provenance field | Current reading | Verdict |
| --- | --- | --- |
| `external_schema_provenance.provenance_class` | `local_external_label_decoy_negative_control` | `external provenance required` |
| `external_schema_provenance.source_ref` | `external-proof-looking-label:Sigma_hf_01:fresh-v10-higher-fold-12-root-rebuild-v0:proof-interval-v6:lambda0305` | `present` |
| `external_schema_provenance.acceptance_contract_ref` | `reference/priorities/proof-programs/breather-proof/certificate/external_proof_grade_derivation_schema_acceptance_contract.md` | `present` |
| `external_schema_provenance.received_for_schema_validation` | `true` | `present` |
| `external_schema_provenance.authored_inside_local_proof_program_pool` | `true` | `external provenance required` |
| `external_schema_provenance.derived_from_local_certificate_json` | `true` | `external provenance required` |
| `external_schema_provenance.self_authored_placeholder` | `true` | `external provenance required` |
| `external_schema_provenance.local_path_treated_as_external_evidence` | `true` | `external provenance required` |

External provenance accepted: `false`.
First failed provenance field: `external_schema_provenance.provenance_class`.

## Authorization Locks

- Slot result: `external_input_required`
- Row slots parked: 11
- Row consumption count: 0
- `preledger_pass`: `false`
- `updates_live_ledger`: `false`
- Branch chart authorized: `false`

This record is priority-only. It does not construct or accept a proof-grade external schema, accept a source packet, consume rows, update the live ledger, or authorize a branch chart.
