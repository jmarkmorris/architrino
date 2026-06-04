# Ref/Value Carrier-Introduction Inference-Schema Lemma Target

## Verdict

Status: priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-inference-schema-lemma-target-fail-closed-candidate-schema-family-stated-proof-burdens-separated-no-row-consumption

This target follows the ref/value carrier-introduction inference-rule schema
audit. It states the candidate schema family that would discharge the first
exact blockers,
`ref_contract_to_carrier_inference_schema_present`,
`value_map_contract_to_carrier_inference_schema_present`, and
`joint_same_witness_pairing_schema_present`, but it does not mark those
schemata or lemmas present.

The target is priority-only. It consumes 0 rows, constructs 0 branch chart
artifacts, and does not promote any proof rule into reader-facing corpus prose.

## Source State

The latest audit permits these facts to be reused as premises:

| Premise field | Current count | How this target may use it |
| --- | ---: | --- |
| `ref_contract_root_ready` | 4 / 4 | Source root for an endpoint-boundary-binding ref contract-to-carrier schema. |
| `value_map_contract_root_ready` | 4 / 4 | Source root for an endpoint value-binding map contract-to-carrier schema. |
| `joint_same_witness_carrier_pair_rule_root_ready` | 4 / 4 | Source root for a joint same-witness carrier-pairing schema. |
| `source_derivation_premise_set_ready` | 4 / 4 | Local premise bundle for deriving a carrier-introduction rule. |
| `direct_source_promotion_rejected` | 4 / 4 | Guard against treating source handles as carrier fields. |
| `carrier_admission_route_selected` | 4 / 4 | Selected route through binding contract, full endpoint boundary binding, and carrier admission. |
| `derivation_targets_declared` | 4 / 4 | Names the rule derivations that remain to be proved. |
| `inference_schema_source_scope_ready` | 4 / 4 | Confirms that the audit has the right source scope for a schema attempt. |
| `inference_rule_schema_target_declared` | 4 / 4 | Confirms that the inference-schema layer is the current proof target. |
| `missing_axiom_lemma_layer_identified` | 4 / 4 | Confirms that the missing layer is an axiom-or-lemma family, not source data. |

The same audit forbids these facts from being claimed:

| Missing field | Current count | Why it remains missing |
| --- | ---: | --- |
| `carrier_introduction_inference_rule_schema_present` | 0 / 4 | The schema family has not been proved or accepted. |
| `ref_contract_to_carrier_inference_schema_present` | 0 / 4 | No rule maps a ref contract root to a ref carrier derivation. |
| `value_map_contract_to_carrier_inference_schema_present` | 0 / 4 | No rule maps a value-binding map contract root to a value-map carrier derivation. |
| `joint_same_witness_pairing_schema_present` | 0 / 4 | No rule pairs the ref and value-map carriers in one witness object. |
| `non_domain_carrier_admissibility_lemma_present` | 0 / 4 | No admissibility lemma makes the introduced carrier a valid witness-object field. |
| `non_domain_carrier_membership_preservation_lemma_present` | 0 / 4 | No preservation lemma keeps the introduced carrier non-domain rather than promoted source data. |
| `same_witness_carrier_pairing_lemma_present` | 0 / 4 | No lemma proves the two introduced carriers occupy the same packet witness object. |
| `source_handle_non_promotion_lemma_present` | 0 / 4 | No lemma blocks direct promotion except as a recorded route decision. |
| `inference_rule_schema_soundness_proof_present` | 0 / 4 | No soundness proof validates the schema family. |
| `endpoint_instantiation_lemma_present` | 0 / 4 | No endpoint-by-endpoint proof instantiates all schema premises. |
| `derivation_bundle_present` | 0 / 4 | No complete bundle derives available carrier rules. |
| `ref_value_non_domain_carrier_pair_constructed` | 0 / 4 | The downstream carrier pair remains absent. |

## Candidate Schema Family

For each endpoint functional $e$, the candidate family has three schemata.

### Ref Contract-To-Carrier Schema

`S_ref(e)` is the target schema:

```text
premises:
  ref_contract_root_ready(e)
  carrier_admission_route_selected(e)
  direct_source_promotion_rejected(e)
  non_domain_carrier_admissibility_lemma_present(e)
  non_domain_carrier_membership_preservation_lemma_present(e)
  source_handle_non_promotion_lemma_present(e)
  endpoint_instantiation_lemma_present(e)
conclusion:
  ref_contract_to_ref_carrier_rule_derivation_present(e)
```

This schema may not treat the endpoint-boundary-binding ref source handle as a
carrier field. It must prove that the selected carrier-admission route adds a
new non-domain carrier field while preserving the no-promotion guard.

### Value-Map Contract-To-Carrier Schema

`S_val(e)` is the target schema:

```text
premises:
  value_map_contract_root_ready(e)
  carrier_admission_route_selected(e)
  direct_source_promotion_rejected(e)
  non_domain_carrier_admissibility_lemma_present(e)
  non_domain_carrier_membership_preservation_lemma_present(e)
  source_handle_non_promotion_lemma_present(e)
  endpoint_instantiation_lemma_present(e)
conclusion:
  value_map_contract_to_value_map_carrier_rule_derivation_present(e)
```

This schema must prove the value-binding map carrier by the same route as the
ref carrier, without reusing source-handle availability as field membership.

### Same-Witness Carrier-Pairing Schema

`S_pair(e)` is the target schema:

```text
premises:
  joint_same_witness_carrier_pair_rule_root_ready(e)
  ref_contract_to_ref_carrier_rule_derivation_present(e)
  value_map_contract_to_value_map_carrier_rule_derivation_present(e)
  same_witness_carrier_pairing_lemma_present(e)
  inference_rule_schema_soundness_proof_present(e)
conclusion:
  joint_same_witness_carrier_pair_rule_derivation_present(e)
```

This schema must prove that the two separately introduced carrier derivations
land in the same constructed witness object for endpoint $e$. Matching endpoint
ids, source handles, or witness-object symbols are not enough.

## Lemma Stack

The following lemma stack is the first proof-grade route that could turn the
candidate family into derivations:

1. Ref contract-to-carrier lemma: prove that a ready endpoint-boundary-binding
   ref contract root plus the selected carrier-admission route licenses
   `S_ref(e)`.
2. Value-map contract-to-carrier lemma: prove that a ready endpoint value-binding
   map contract root plus the selected carrier-admission route licenses
   `S_val(e)`.
3. Non-domain carrier admissibility lemma: prove that each introduced ref or
   value-map carrier is an admissible witness-object field.
4. Non-domain carrier membership preservation lemma: prove that carrier
   introduction preserves non-domain carrier status.
5. Source-handle non-promotion lemma: prove that source refs and value maps
   cannot be promoted directly into carrier fields without the schema.
6. Same-witness carrier-pairing lemma: prove that the two introduced carriers
   are co-members of one constructed witness object.
7. Inference-schema soundness proof: prove that `S_ref(e)`, `S_val(e)`, and
   `S_pair(e)` are sound for the endpoint carrier-introduction targets.
8. Endpoint instantiation lemma: prove the schema premises for all four endpoint
   functionals and all three row source-scope pairs.

## First Safe Proof Route

The low-risk next proof attempt is to derive the schema family from the existing
witness-object and carrier-admission definitions. That route keeps the packet
fail-closed unless all eight lemma-stack items discharge.

Accepting `S_ref`, `S_val`, or `S_pair` as a new primitive proof rule would be a
theory decision, because it would add an axiom-or-lemma family that current
packets only identify as missing. That decision is not made here.

## Failure Modes

- If the proof treats a ready contract root as a carrier field, it violates the
  source-handle non-promotion guard.
- If the proof skips admissibility, it can create a field that is not a valid
  witness-object component.
- If the proof skips membership preservation, it can collapse a non-domain
  carrier into source adjacency data.
- If the proof skips same-witness pairing, the ref carrier and value-map carrier
  may live in separate constructed witness objects.
- If the proof skips endpoint instantiation, it may state a schema that none of
  the four endpoint functionals actually satisfies.
- If the proof skips schema soundness, it may name derivations without making
  carrier rules available.

## Capture Decision

Priority-only; records the candidate carrier-introduction inference-schema
lemma target and does not promote to `content/markdown/aaa`. Promotion is
deferred until the schema family is either derived from existing definitions or
explicitly accepted after operator discussion as a new proof rule.
