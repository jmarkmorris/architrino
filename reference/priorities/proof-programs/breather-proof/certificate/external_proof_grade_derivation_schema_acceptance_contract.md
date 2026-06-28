# External Proof-Grade Derivation Schema Acceptance Contract

Status: `priority-only-external-proof-grade-derivation-schema-acceptance-contract-no-schema-received-no-row-consumption-no-live-ledger-update-no-branch-chart-authorization`

## Claim Level

Priority-only decision artifact. This contract narrows the live
`source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema_external_input_required`
blocker into the minimum proof object that can be admitted as external input.
It does not construct that input, does not accept a source packet, does not make
a primitive-acceptance or proof-rule decision, consumes 0 rows, keeps
`preledger_pass=false`, keeps `updates_live_ledger=false`, and authorizes no
branch chart.

## Imported Frontier

| Frontier report | Role in this contract |
| --- | --- |
| [external-input obligation packet](./higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_external_input_obligation_packet_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.md) | Declares the external schema requirement, 124 obligation slots, 8 required fields per slot, 0 satisfied slots, and 0 received external schema inputs. |
| [schema current-pool absence classifier](./higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_current_pool_absence_classifier_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.md) | Proves the current certificate JSON pool contains no compatible proof-grade derivation schema object. |
| [derivation-proof object current-pool absence classifier](./higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_current_pool_absence_classifier_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.md) | Proves the current certificate JSON pool contains no compatible `source_packet_acceptance_rule_derivation_proof` object. |
| [current certificate-pool route exhaustion closure classifier](./higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_interval_certified_status_current_certificate_pool_route_exhaustion_closure_classifier_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.md) | Proves both accepted-status evidence routes are exhausted in the current pool and that no mechanical continuation is available from current inputs. |

## Scope Locks

| Lock | Required value |
| --- | --- |
| Packet identity | `fresh-v10-higher-fold-12-root-rebuild-v0` |
| Proof interval | `proof-interval-v6` |
| Lambda branch | `lambda0305` |
| Compatible schema role | `source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema` |
| Compatible proof object role | `source_packet_acceptance_rule_derivation_proof_object` |
| Derivation proof target | `source_packet_acceptance_rule_derivation_proof_for_live_same_packet_separator_aggregate_family` |
| Separator scope | `Sigma_hf_01` through `Sigma_hf_12` |
| Row scope | 112 fold-layer rows preserved by the external-input obligation packet |
| External obligation slots | 124 total: 12 separator slots plus 112 row slots |

Any candidate input that changes these locks is not a compatible external
schema for the live breather-certificate frontier.

## Accepted External Schema Object

A compatible external proof-grade derivation schema must provide all eight
fields for each admitted separator or row slot. Partial input may be staged as a
candidate, but it cannot satisfy an obligation slot until every required field
below is present and bound to the same record.

| Required field | Proof-grade meaning | Fail-closed rejection |
| --- | --- | --- |
| `compatible_schema_role_lock` | The object explicitly claims the live schema role above. | Reject if the object is a target packet, absence classifier, diagnostic report, source-data record, source certificate, or any other role. |
| `compatible_proof_object_role_lock` | The schema is for a `source_packet_acceptance_rule_derivation_proof_object`, not for a primitive accepted-status shortcut. | Reject if it can only be read as proof-grade accepted-status evidence, primitive source-packet evidence, or a source-packet acceptance rule by reinterpretation. |
| `derivation_proof_target_lock` | The proof target is the live same-packet separator aggregate family. | Reject if it targets the historical cosine packet, another lambda branch, a different packet identity, or a generic source-packet acceptance theorem. |
| `derivation_proof_source_data_record_lock` | The schema binds to the exact separator or row source-data record already declared ready by the current frontier. | Reject if the source data are cited only by prose, by unmatched row id, or by a hash/packet mismatch. |
| `rule_kernel_obligation_binding` | The schema states how the rule-kernel obligations are discharged: derivation proof, soundness proof, and endpoint-application proof. | Reject if any of the three rule-kernel obligation classes remains only named, assumed, or imported from a fail-closed artifact. |
| `rule_kernel_derivation_payload_target_binding` | The schema binds the rule-kernel proof to the declared payload construction target for the same separator or row. | Reject if the payload target is absent, mismatched, or supplied by the target packet itself rather than by a derivation schema. |
| `proof_grade_derivation_schema_statement` | The object contains the actual derivation schema: hypotheses, inference steps, conclusion, and checkable correspondence to the source-data record and payload target. | Reject if it only reports that source material exists, that a target was declared, or that the current pool is absent. |
| `non_reinterpretation_guard` | The object proves it does not reinterpret diagnostics, source certificates, target packets, or absence classifiers as proof-grade derivation input. | Reject if any required proof step depends on role reinterpretation, primitive acceptance without a decision, row consumption, live-ledger update, or branch-chart authorization. |

## Slot Acceptance Rule

For a separator or row slot $s$, define the slot predicate
`external_schema_slot_accepted(s)` as:

1. `s` is one of the 124 declared external-input obligation slots.
2. All scope locks in this contract match the candidate object.
3. The candidate object supplies the eight required fields for `s`.
4. The `proof_grade_derivation_schema_statement` proves the
   rule-kernel derivation payload schema for `s` rather than merely naming the
   target or recording current-pool absence.
5. The `non_reinterpretation_guard` rejects every fail-closed source already
   rejected by the current-pool absence classifiers.

Only then may the slot move from `external_input_required` to
`external_schema_input_received_for_schema_validation`. That state is not row
consumption. It only authorizes the next proof-program artifact to test whether
the received schema constructs a rule-kernel derivation payload.

## Pivot Decision Table

| Candidate next route | Decision | Reason |
| --- | --- | --- |
| External proof-grade derivation schema satisfying this contract | Continue | This is the direct missing input named by the live blocker. |
| External `source_packet_acceptance_rule_derivation_proof` object containing an embedded compatible schema and payload proof | Continue after schema-field extraction | It may satisfy the same frontier only if it exposes the eight schema fields and the rule-kernel derivation payload target binding per slot. |
| Current-pool rescan without new input | Reject as non-advancing | The pool has already been scanned at 271 certificate JSON files and 37 / 37 accepted-status lane files fail-closed. |
| Constructor-basis or formation-rule lane | Park unless proof-grade constructor-basis or formation-rule derivation is supplied | The constructor-basis handoff remains stopped at 0 predicate-symbol, argument-sort, judgment-codomain, endpoint-localization, soundness, derivation, formation-rule, declaration, row-consumption, and branch-chart fields. |
| Fold-layer source-field or separator-field lane | Park unless it supplies the accepted-status schema fields above | Existing fold-layer field packets preserve source material but do not construct the proof-grade derivation schema required by the current blocker. |
| Primitive/source-packet acceptance decision | Operator/developer decision required | This would be a proof-rule or primitive-acceptance decision, outside this priority-only contract. |

## Smallest Next Artifact

The smallest useful continuation is now materialized as the
[Sigma_hf_01 external schema pilot packet](sigma_hf_01_external_schema_pilot_packet.md).
It freezes the separator slot and 11 row slots for `Sigma_hf_01`, preserving
0 / 12 received external schema inputs, 0 / 12 accepted validation slots,
0 rule-kernel derivation payloads, 0 consumed rows, `preledger_pass=false`,
`updates_live_ledger=false`, and no branch-chart authorization.

The next live proof-program action is not another 124-slot scan. It is to
receive or construct one candidate external schema for the `Sigma_hf_01`
separator slot and test the eight required fields above. If the separator slot
cannot satisfy those fields, the 11 row slots remain parked.
