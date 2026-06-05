# Independent Target Ref/Value Equation Promotion Rule Without Contract Link Target

## Verdict

Status: priority-only-fold-coordinate-endpoint-functional-independent-target-ref-value-equation-promotion-rule-without-contract-link-target-fail-closed-candidate-rule-stated-proof-burdens-separated-no-row-consumption

This target follows the independent target ref/value equations without contract
link proof attempt. It states the candidate proof target that would discharge
the first exact blocker
`independent_target_ref_value_equation_promotion_rule_without_contract_link_present`,
but it does not mark that rule, its derivation, its soundness proof, its
endpoint application proof, or any proof-grade target ref/value equation package
present.

The target is priority-only. It consumes 0 rows, constructs 0 branch-chart
artifacts, imports no `witness_object_has_contract_link` premise, and does not
promote any proof rule into reader-facing corpus prose.

## Source State

The latest proof attempt permits these facts to be reused as premises:

| Premise field | Current count | How this target may use it |
| --- | ---: | --- |
| `target_endpoint_boundary_binding_object_packet_input_present` | 4 / 4 | Source packet for each target endpoint boundary-binding object. |
| `no_contract_link_premise_packet_input_present` | 4 / 4 | Source packet for the no-contract-link premise audit. |
| `no_contract_link_independence_guard_declared` | 4 / 4 | Guard that the target proof must avoid importing `witness_object_has_contract_link`. |
| `target_boundary_binding_object_has_endpoint_refs` | 4 / 4 | Target-object endpoint refs that the rule must preserve as targets, not proof-grade equations. |
| `target_boundary_binding_object_has_endpoint_values` | 4 / 4 | Target-object endpoint values that the rule must preserve as targets, not proof-grade equations. |
| `endpoint_value_binding_map_constructed` | 4 / 4 | Endpoint value maps that bind target endpoint values. |
| `endpoint_value_binding_map_ref_values_certified` | 4 / 4 | Value-map ref/value certifications that the rule may use as attachment evidence only. |
| `target_endpoint_ref_value_source_equations_present` | 4 / 4 | Source-equation sets for the target endpoint refs and values. |
| `target_endpoint_ref_value_source_equations_all_source_only` | 4 / 4 | Guard that the source equations are not proof-grade target ref/value equations. |
| `value_map_source_equations_source_equation_only` | 4 / 4 | Guard that the value-map equations remain source-scope. |
| `value_map_ref_value_payload_matches_target_object` | 4 / 4 | Payload match between the value map and target object. |
| `target_ref_value_equations_without_contract_link_source_inputs_ready` | 4 / 4 | Confirms that each endpoint has the source inputs for a no-link rule attempt. |
| individual target ref/value source equations matched by value-map bindings | 6 / 6 | Confirms equation/value-map matching before promotion. |
| row source-equation/value-map/no-link input pairs | 3 / 3 | Confirms source and receiver inputs are paired at the row level before promotion. |

The same proof attempt forbids these facts from being claimed:

| Missing field | Current count | Why it remains missing |
| --- | ---: | --- |
| `independent_target_ref_value_equation_promotion_rule_without_contract_link_present` | 0 / 4 | No rule states when source equations and value-map bindings become proof-grade target ref/value equations without the link premise. |
| `independent_target_ref_value_equation_derivation_without_contract_link_present` | 0 / 4 | No derivation applies such a rule endpoint by endpoint. |
| `independent_target_ref_value_equation_soundness_without_contract_link_present` | 0 / 4 | No soundness proof blocks simple renaming of source equations as proof-grade equations. |
| `independent_target_ref_value_equation_endpoint_application_without_contract_link_present` | 0 / 4 | No endpoint application proof instantiates the rule for all four endpoint functionals. |
| `source_target_ref_value_equations_proof_grade` | 0 / 4 | No inherited source packet supplies proof-grade target ref/value equations. |
| `independent_target_ref_value_equations_without_contract_link_proof_grade` | 0 / 4 | No proof-grade target ref/value equation package exists without the link premise. |
| `independent_contract_target_satisfaction_without_contract_link_proof_present` | 0 / 4 | Target satisfaction remains downstream of proof-grade target ref/value equations. |
| `independent_endpoint_boundary_binding_ref_compatibility_without_contract_link_present` | 0 / 4 | Endpoint-boundary-binding ref compatibility is not part of this rule target. |
| `independent_first_primitive_compatibility_without_contract_link_present` | 0 / 4 | First-primitive compatibility is not part of this rule target. |
| `row_consumption_authorized` | 0 / 4 | No row may be consumed from this target alone. |
| `branch_chart_authorized` | 0 / 4 | No branch chart may be authorized from this target alone. |

## Candidate Promotion Rule Family

For each endpoint functional, the candidate rule target is:

```text
premises:
  target_boundary_binding_object_has_endpoint_refs(e)
  target_boundary_binding_object_has_endpoint_values(e)
  endpoint_value_binding_map_constructed(e)
  endpoint_value_binding_map_ref_values_certified(e)
  target_endpoint_ref_value_source_equations_present(e)
  target_endpoint_ref_value_source_equations_all_source_only(e)
  value_map_source_equations_source_equation_only(e)
  value_map_ref_value_payload_matches_target_object(e)
  no_contract_link_independence_guard_declared(e)
  contract_link_premise_not_imported(e)
excluded premise:
  witness_object_has_contract_link(e)
conclusion target:
  independent_target_ref_value_equation_promotion_rule_without_contract_link_present(e)
```

This is a rule target, not a theorem. It says what a later proof packet must
establish before the source-equation/value-map payload can be upgraded. It does
not itself perform the upgrade.

## Tested Non-Routes

The following direct routes are rejected by this target:

| Route | Status | Rejected promotion |
| --- | --- | --- |
| target-object-only | rejected | `target_boundary_binding_object_has_endpoint_refs` and `target_boundary_binding_object_has_endpoint_values` are target declarations, not proof-grade target ref/value equations. |
| source-equation-only | rejected | `target_endpoint_ref_value_source_equations_present`, `target_endpoint_ref_value_source_equations_all_source_only`, and `value_map_source_equations_source_equation_only` are source facts, not proof-grade target ref/value equations. |
| certification-only | rejected | `endpoint_value_binding_map_ref_values_certified` and `endpoint_value_map_proof_grade_status_endpoint_value_map_only` certify endpoint-value-map attachment only. |
| inherited-source-status | rejected | `source_target_ref_value_equations_proof_grade` is absent and cannot be substituted by parent-packet readiness. |
| contract-link route | rejected | Neither `witness_object_has_contract_link`, `witness_object_contract_link_constructed`, nor actual contract-link rule application may enter this target's premise set. |
| compatibility route | rejected | Endpoint-boundary-binding ref compatibility and first-primitive compatibility remain downstream proof targets. |
| target-satisfaction route | rejected | Target-satisfaction proof promotion remains downstream of proof-grade target ref/value equations. |

## Required Proof Stack

A later proof packet can discharge this target only by supplying the following
objects:

1. Rule statement: a proof-grade statement of
   `independent_target_ref_value_equation_promotion_rule_without_contract_link_present`
   whose premises are limited to target objects, endpoint value maps, source
   equations, value-map payload matches, and no-link guards.
2. Non-import proof: a proof that the rule's premise set excludes
   `witness_object_has_contract_link` and does not smuggle that field through a
   selected route, inherited source status, or binding-contract test.
3. Derivation: a proof of
   `independent_target_ref_value_equation_derivation_without_contract_link_present`
   for each of the four endpoint functionals.
4. Soundness proof: a proof of
   `independent_target_ref_value_equation_soundness_without_contract_link_present`
   showing that source equations, endpoint-value-map certifications, and target
   declarations are not merely renamed as proof-grade equations.
5. Endpoint application proof: a proof of
   `independent_target_ref_value_equation_endpoint_application_without_contract_link_present`
   for all four endpoint functionals, preserving the six matched individual
   target ref/value source equations.
6. Proof-grade package: construction of
   `independent_target_ref_value_equations_without_contract_link_proof_grade`
   only after the rule statement, derivation, soundness proof, and endpoint
   application proof are present.

## Endpoint Application Targets

The endpoint application proof must instantiate the candidate rule for each
endpoint functional:

| Endpoint | Role | Source inputs ready | Current rule status | Current package status |
| --- | --- | ---: | --- | --- |
| `fc_sigma_source_lower` | source | true | no promotion rule | no proof-grade target ref/value equation package |
| `fc_rho_receiver_lower` | receiver | true | no promotion rule | no proof-grade target ref/value equation package |
| `fc_sigma_source_upper` | source | true | no promotion rule | no proof-grade target ref/value equation package |
| `fc_rho_receiver_upper` | receiver | true | no promotion rule | no proof-grade target ref/value equation package |

## Row Pair Targets

The three row source-equation/value-map/no-link input pairs may be used only as
application targets after both the source and receiver endpoint functionals have
proof-grade target ref/value equation packages without the link premise.

| Row | Pair target status | Current row status |
| --- | --- | --- |
| `R_w_A04_A03` | source and receiver applications required | not unblocked; not consumed |
| `R_u_A10_A09` | source and receiver applications required | not unblocked; not consumed |
| `R_u_A07_A06` | source and receiver applications required | not unblocked; not consumed |

This target does not create:

- source or receiver target-satisfaction proofs;
- source or receiver endpoint-boundary-binding ref compatibility proofs;
- source or receiver first-primitive compatibility proofs;
- binding-contract satisfaction without the link premise;
- residual-data-ready rows;
- `row_consumption_authorized`;
- `row_unblocked`;
- `row_consumed`;
- row consumption;
- live-ledger updates;
- branch-chart authorization.

## Failure Modes

- If the proof treats `target_endpoint_ref_value_source_equations_present` as a
  proof-grade equation package, it violates the source-equation-only guard.
- If the proof treats `endpoint_value_binding_map_ref_values_certified` as a
  target ref/value equation, it violates the endpoint-value-map-only guard.
- If the proof imports `witness_object_has_contract_link` directly or through a
  selected carrier-admission route, it fails the no-link target.
- If the proof skips soundness, it may only rename target declarations as
  proof-grade equations.
- If the proof skips endpoint application, it may state a rule that none of the
  four endpoint functionals actually satisfies.
- If the proof consumes rows before target satisfaction and compatibility are
  proved downstream, it exceeds this target's authority.

## First Safe Proof Route

The low-risk next proof attempt is a derivation-from-existing-source-data route:
prove the promotion rule from target endpoint boundary-binding objects, endpoint
value maps, source-equation sets, value-map payload matches, and no-link guards.
That route remains fail-closed unless it supplies the complete rule statement,
non-import proof, derivation, soundness proof, endpoint application proof, and
proof-grade package.

Accepting the promotion rule as a new primitive proof rule would be a theory
decision. That decision is not made here.

## Capture Decision

Priority-only; records the candidate independent target ref/value equation
promotion-rule target without contract link and does not promote to
`content/markdown/aaa`. Promotion is deferred until the rule is either derived
from existing source data or explicitly accepted after operator discussion as a
new proof rule.
