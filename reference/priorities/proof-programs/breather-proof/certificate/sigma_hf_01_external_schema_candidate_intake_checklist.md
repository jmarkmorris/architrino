# Sigma_hf_01 External Schema Candidate Intake Checklist

Status: `priority-only-fail-closed-current-checklist-local-source-data-partial-external-input-required-no-row-consumption-no-live-ledger-update-no-branch-chart-authorization`

## Claim Level

This checklist is the current intake object for the first
`Sigma_hf_01` separator-slot test. It records the internal locks already fixed
by the pilot packet and the local source-data partial candidate that can be
screened without constructing an external proof-grade schema. It does not
accept a proof object, consumes 0 rows, keeps `preledger_pass=false`, keeps
`updates_live_ledger=false`, and authorizes no branch chart.

## Locked Scope

| Field | Current value | Verdict |
| --- | --- | --- |
| `target_slot` | `Sigma_hf_01` | locked |
| `fold_interval` | `F01` | locked |
| `packet_identity` | `fresh-v10-higher-fold-12-root-rebuild-v0` | locked |
| `proof_interval` | `proof-interval-v6` | locked |
| `lambda_branch` | `lambda0305` | locked |
| `candidate_external_schema_ref` | `local-source-data-partial:Sigma_hf_01:fresh-v10-higher-fold-12-root-rebuild-v0:proof-interval-v6:lambda0305` | local source-data partial; not proof-grade external schema |

## Eight-Field Intake Predicate

| Required field | Current value | Verdict |
| --- | --- | --- |
| `compatible_schema_role_lock` | present on local candidate | `present_on_candidate_for_intake_screen` |
| `compatible_proof_object_role_lock` | present on local candidate | `present_on_candidate_for_intake_screen` |
| `derivation_proof_target_lock` | present on local candidate | `present_on_candidate_for_intake_screen` |
| `derivation_proof_source_data_record_lock` | present on local candidate | `present_on_candidate_for_intake_screen` |
| `rule_kernel_obligation_binding` | absent | `external_input_required` |
| `rule_kernel_derivation_payload_target_binding` | absent | `external_input_required` |
| `proof_grade_derivation_schema_statement` | absent | `external_input_required` |
| `non_reinterpretation_guard` | present on local candidate | `present_on_candidate_for_intake_screen` |

Current count: 5 / 8 required fields present. First missing field:
`rule_kernel_obligation_binding`.

Machine-checkable current record:
[sigma_hf_01_external_schema_candidate_intake_record.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json](sigma_hf_01_external_schema_candidate_intake_record.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json)
and
[report](sigma_hf_01_external_schema_candidate_intake_record.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305_report.md).
Local source-data partial candidate:
[sigma_hf_01_external_schema_candidate.local-source-data-partial.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json](sigma_hf_01_external_schema_candidate.local-source-data-partial.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json)
and
[report](sigma_hf_01_external_schema_candidate.local-source-data-partial.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305_report.md).
The producer is
[fresh-v10-higher-fold-sigma-hf-01-external-schema-candidate-intake-record.mjs](../../../../../scripts/proof-programs/fresh-v10-higher-fold-sigma-hf-01-external-schema-candidate-intake-record.mjs).
It emits `external_input_required` in absent-input mode, records the
`Sigma_hf_01` local source-data partial candidate in
`--local-source-candidate` mode, and permits a complete synthetic candidate
only to reach
`external_schema_input_received_for_schema_validation`; it still consumes 0
rows, keeps `preledger_pass=false`, keeps `updates_live_ledger=false`, and
authorizes no branch chart.

## Non-Consumption Guard

The current proof-program pool may supply diagnostics, accepted-status target
packets, absence classifiers, source certificates, and route handoffs as
context only. The local source-data partial candidate records the five fields
that can be screened from those records, but it is not an external proof-grade
derivation schema for `Sigma_hf_01`, so it cannot move the slot to
`external_schema_input_received_for_schema_validation`.

Smallest continuation: supply `rule_kernel_obligation_binding`,
`rule_kernel_derivation_payload_target_binding`, and
`proof_grade_derivation_schema_statement` on one `Sigma_hf_01` proof-grade
schema object before any row-slot sweep starts.
