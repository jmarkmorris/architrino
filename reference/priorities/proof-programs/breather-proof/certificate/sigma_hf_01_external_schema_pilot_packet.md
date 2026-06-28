# Sigma_hf_01 External Schema Pilot Packet

Status: `priority-only-pilot-scope-materialized-no-external-schema-received-no-row-consumption-no-live-ledger-update-no-branch-chart-authorization`

## Claim Level

Priority-only pilot intake packet for the `Sigma_hf_01` slice of the
external proof-grade derivation schema blocker. This packet does not construct
an external schema, does not accept a source packet, does not make a
proof-rule or primitive-acceptance decision, consumes 0 rows, keeps
`preledger_pass=false`, keeps `updates_live_ledger=false`, and authorizes no
branch chart.

## Imported Contract

This pilot is subordinate to
[external proof-grade derivation schema acceptance contract](external_proof_grade_derivation_schema_acceptance_contract.md)
and the external-input obligation packet:

- [report](higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_external_input_obligation_packet_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.md)
- [JSON](higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_external_input_obligation_packet.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json)

The contract remains authoritative. This file only narrows the first pilot to
one separator event and its row slots.

## Scope Locks

| Lock | Pilot value |
| --- | --- |
| Packet identity | `fresh-v10-higher-fold-12-root-rebuild-v0` |
| Proof interval | `proof-interval-v6` |
| Lambda branch | `lambda0305` |
| Separator event | `Sigma_hf_01` |
| Fold interval | `F01` |
| Compatible schema role | `source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema` |
| Compatible proof object role | `source_packet_acceptance_rule_derivation_proof_object` |
| Derivation proof target | `source_packet_acceptance_rule_derivation_proof_for_live_same_packet_separator_aggregate_family` |

Any candidate input that changes one of these locks is outside the pilot and
cannot satisfy a `Sigma_hf_01` obligation slot.

## Pilot Slots

The pilot contains 12 obligation slots: the separator aggregate plus the 11 row
slots below.

| Slot | Ledger | Receiver interval | Source interval | Current row status | First external blocker |
| --- | --- | --- | --- | --- | --- |
| `Sigma_hf_01` | separator | `F01` | aggregate | `external_input_required` | `source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema_external_input_required` |
| `R_u_A01_F01` | `u` | `A01` | `F01` | `split_required` | `source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema_external_input_required` |
| `R_u_F01_A00` | `u` | `F01` | `A00` | `split_required` | `source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema_external_input_required` |
| `R_u_F01_F01` | `u` | `F01` | `F01` | `split_required` | `source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema_external_input_required` |
| `R_w_A01_F01` | `w` | `A01` | `F01` | `split_required` | `source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema_external_input_required` |
| `R_w_A02_F01` | `w` | `A02` | `F01` | `split_required` | `source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema_external_input_required` |
| `R_w_A03_F01` | `w` | `A03` | `F01` | `split_required` | `source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema_external_input_required` |
| `R_w_A04_F01` | `w` | `A04` | `F01` | `split_required` | `source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema_external_input_required` |
| `R_w_A05_F01` | `w` | `A05` | `F01` | `split_required` | `source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema_external_input_required` |
| `R_w_A06_F01` | `w` | `A06` | `F01` | `split_required` | `source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema_external_input_required` |
| `R_w_F01_A00` | `w` | `F01` | `A00` | `split_required` | `source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema_external_input_required` |
| `R_w_F01_F01` | `w` | `F01` | `F01` | `split_required` | `source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema_external_input_required` |

All 11 row slots share the same current failure code:
`trig_range_overlap_touches_fold_layer_candidate`.

## Pilot Intake Predicate

For this pilot, a slot may move only from `external_input_required` to
`external_schema_input_received_for_schema_validation` when an external object
binds to that exact slot and supplies all eight required fields:

| Required field | Pilot check |
| --- | --- |
| `compatible_schema_role_lock` | Must match the role lock above. |
| `compatible_proof_object_role_lock` | Must target a proof object, not primitive source-packet evidence. |
| `derivation_proof_target_lock` | Must target the live same-packet separator aggregate family. |
| `derivation_proof_source_data_record_lock` | Must bind to `Sigma_hf_01` or the exact row id in the pilot slot. |
| `rule_kernel_obligation_binding` | Must discharge derivation proof, soundness proof, and endpoint-application proof obligations. |
| `rule_kernel_derivation_payload_target_binding` | Must bind the proof to the declared payload construction target for the same slot. |
| `proof_grade_derivation_schema_statement` | Must contain hypotheses, inference steps, conclusion, and checkable correspondence to the source-data record. |
| `non_reinterpretation_guard` | Must prove that diagnostics, source certificates, target packets, and absence classifiers are not being reinterpreted as proof-grade input. |

If any one of these fields is absent or mismatched, the slot remains
`external_input_required`. If the external object satisfies all eight fields,
the slot is still not consumed; it only authorizes a follow-on validation
artifact to test whether the received schema constructs a rule-kernel
derivation payload.

## First Candidate Schema Intake Record

The first candidate intake record is intentionally a separator-slot test, not a
row-slot sweep. It must bind one external object to `Sigma_hf_01` and preserve
the eight-field predicate above before any row slot is opened.

| Intake field | Required value for first candidate | Current value |
| --- | --- | --- |
| `candidate_external_schema_ref` | A stable file, citation, or proof-object identifier for the external schema. | absent |
| `target_slot` | `Sigma_hf_01` before any `R_*` row slot is considered. | `Sigma_hf_01` selected; no object received |
| `source_data_record_lock` | Exact binding to the `Sigma_hf_01` separator source-data record under `fresh-v10-higher-fold-12-root-rebuild-v0`, `proof-interval-v6`, and `lambda0305`. | absent |
| `required_fields_present` | All eight predicate fields present on the same object. | `0 / 8` |
| `schema_statement_check` | Hypotheses, inference steps, conclusion, and correspondence to the payload target are explicit enough for validation. | not started |
| `non_reinterpretation_check` | The object proves that fail-closed diagnostics, target packets, and absence classifiers are not being used as proof-grade input. | not started |
| `slot_result` | `external_schema_input_received_for_schema_validation` only after every row above passes. | `external_input_required` |

This record is the smallest acceptable next artifact for the pilot. A prose
idea, current-pool rescan, source certificate, or target packet may be cited as
context, but it does not move the slot unless it supplies the candidate
external schema object and all eight required fields for `Sigma_hf_01`.

## Pilot Verdict

Current pilot result:

- external schema inputs received: 0 / 12;
- external schema slots accepted for validation: 0 / 12;
- rule-kernel derivation payloads constructed: 0 / 12;
- accepted source packets: 0 / 12;
- consumed rows: 0;
- `preledger_pass`: `false`;
- `updates_live_ledger`: `false`;
- branch chart authorization: none.

Smallest continuation. Receive or construct one candidate external schema for
`Sigma_hf_01`, then test the separator slot first. If the separator slot cannot
supply all eight fields, the 11 row slots remain parked and no row-specific
schema validation should run.
