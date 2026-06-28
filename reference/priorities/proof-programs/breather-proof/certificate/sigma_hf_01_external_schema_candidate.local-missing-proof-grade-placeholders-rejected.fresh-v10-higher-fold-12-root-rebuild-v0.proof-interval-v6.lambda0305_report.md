# Sigma_hf_01 Local Source-Data Partial External Schema Candidate

Status: `local_missing_proof_grade_field_placeholders_rejected_not_external_schema`

## Scope

- Packet identity: `fresh-v10-higher-fold-12-root-rebuild-v0`
- Proof interval: `proof-interval-v6`
- Lambda branch: `lambda0305`
- Target slot: `Sigma_hf_01`
- Fold interval: `F01`
- Candidate ref: `local-placeholder-rejection:Sigma_hf_01:fresh-v10-higher-fold-12-root-rebuild-v0:proof-interval-v6:lambda0305`
- External provenance accepted: `false`
- External provenance status: `external_schema_provenance_required`

## Candidate Field Screen

| Required field | Candidate reading | Verdict |
| --- | --- | --- |
| `compatible_schema_role_lock` | present | `present_on_candidate_for_intake_screen` |
| `compatible_proof_object_role_lock` | present | `present_on_candidate_for_intake_screen` |
| `derivation_proof_target_lock` | present | `present_on_candidate_for_intake_screen` |
| `derivation_proof_source_data_record_lock` | present | `present_on_candidate_for_intake_screen` |
| `rule_kernel_obligation_binding` | supplied but rejected | `external_input_required` |
| `rule_kernel_derivation_payload_target_binding` | supplied but rejected | `external_input_required` |
| `proof_grade_derivation_schema_statement` | supplied but rejected | `external_input_required` |
| `non_reinterpretation_guard` | present | `present_on_candidate_for_intake_screen` |

Current count: 5 / 8 required fields present.

## Placeholder Rejection

- Status: `local_missing_proof_grade_field_placeholders_rejected_not_external_schema`
- Placeholder fields: `rule_kernel_obligation_binding`, `rule_kernel_derivation_payload_target_binding`, `proof_grade_derivation_schema_statement`
- Required fields after rejection: 5 / 8
- Slot result after rejection: `external_input_required`

The placeholder fields are intentionally supplied in forms that do not satisfy
the intake predicates. This proves local placeholders cannot replace the missing
external proof-grade derivation schema object.


## Missing Proof-Grade Fields

| Field | Blocker | Source status |
| --- | --- | --- |
| `rule_kernel_obligation_binding` | `source_packet_acceptance_rule_derivation_proof_absent` | retained_rule_kernel_obligation_slots_satisfied=0 |
| `rule_kernel_derivation_payload_target_binding` | `source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_absent` | rule_kernel_derivation_payload_present=false |
| `proof_grade_derivation_schema_statement` | `source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema_absent` | proof_grade_derivation_schema_present=false |

## Authorization Locks

- Slot result after intake: `external_input_required`
- Row consumption count: 0
- `preledger_pass`: `false`
- `updates_live_ledger`: `false`
- Branch chart authorized: `false`

This candidate is an internally generated source-data partial, not a received
proof-grade external schema. It records the exact local fields available for
the `Sigma_hf_01` screen and keeps schema validation, row consumption,
live-ledger update, accepted-source-packet status, and branch-chart
authorization locked false.
