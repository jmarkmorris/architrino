# Sigma_hf_01 External-Label Decoy Negative Control

Status: `sigma_hf_01_external_schema_candidate_external_label_decoy_negative_control_rejected_8_of_8_fields_external_labels_without_accepted_provenance_no_schema_validation_intake_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization`

## Claim Level

Priority-only negative control. This local packet supplies external-looking
candidate labels and 8 / 8 structurally present schema fields, then proves that
the `Sigma_hf_01` separator slot still cannot enter schema-validation intake
unless the accepted external provenance predicate succeeds.

## Scope

- Packet identity: `fresh-v10-higher-fold-12-root-rebuild-v0`
- Proof interval: `proof-interval-v6`
- Lambda branch: `lambda0305`
- Target slot: `Sigma_hf_01`
- Fold interval: `F01`
- Candidate ref: `external-proof-looking-label:Sigma_hf_01:fresh-v10-higher-fold-12-root-rebuild-v0:proof-interval-v6:lambda0305`
- Candidate status: `local_external_label_decoy_negative_control_not_external_proof_grade_schema`

## Candidate Field Screen

| Required field | Candidate reading | Verdict |
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

- Slot result after intake: `external_input_required`
- Candidate external schema received: `false`
- Row slots parked: 11
- Row consumption count: 0
- `preledger_pass`: `false`
- `updates_live_ledger`: `false`
- Branch chart authorized: `false`

This negative control does not construct or accept an external schema, does not
make a proof-rule or primitive-acceptance decision, consumes no rows, updates
no live ledger, and authorizes no branch chart.
