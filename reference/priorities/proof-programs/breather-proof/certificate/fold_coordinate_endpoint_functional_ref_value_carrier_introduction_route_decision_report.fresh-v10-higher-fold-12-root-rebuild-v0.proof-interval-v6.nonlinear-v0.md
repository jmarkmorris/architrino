# Ref/Value Carrier-Introduction Route Decision

Status: priority-only-fold-coordinate-endpoint-functional-ref-value-carrier-introduction-route-decision-fail-closed-direct-source-promotion-rejected-carrier-admission-route-selected-no-row-consumption

Claim level: priority-only fail-closed route decision; direct source-handle promotion is rejected for 4 / 4 endpoint functionals because carrier-introduction rules, derivations, soundness, application proof, and same-packet carrier outputs are absent; the binding/full-binding/carrier-admission route is selected but blocked

Output JSON: fold_coordinate_endpoint_functional_ref_value_carrier_introduction_route_decision.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json

## Source Artifacts

| Source | Artifact | SHA-256 |
| --- | --- | --- |
| ref_value_non_domain_carrier_rule_target | fold_coordinate_endpoint_functional_ref_value_non_domain_carrier_rule_target.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 5683b5c1e49282d96f3bb67fb6af26590c6cac6948599e98405aa2e1f43ca1c1 |
| binding_contract_full_binding_carrier_admission_construction_attempt | fold_coordinate_endpoint_functional_binding_contract_full_binding_carrier_admission_construction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json | 49b9f0e9db17df1197691a190f175545b05668950b81725e01875c3535549c9a |

## Route Decision

Direct source-handle promotion is rejected for the current packet. The source
endpoint-boundary-binding refs and endpoint value-binding maps are available as
source handles and source candidates, but no carrier-introduction rule,
derivation, soundness proof, application proof, or same-packet carrier output
is present. The selected route is the binding-contract, full endpoint
boundary-binding, and carrier-admission route; it is selected but still blocked.

## Endpoint Route Table

| Endpoint | Direct source route | Selected route | Contract satisfied | Full binding | Ref carrier | Value-map carrier |
| --- | --- | --- | --- | --- | --- | --- |
| fc_sigma_source_lower | rejected-unsound-with-current-evidence | selected-but-blocked | false | false | false | false |
| fc_rho_receiver_lower | rejected-unsound-with-current-evidence | selected-but-blocked | false | false | false | false |
| fc_sigma_source_upper | rejected-unsound-with-current-evidence | selected-but-blocked | false | false | false | false |
| fc_rho_receiver_upper | rejected-unsound-with-current-evidence | selected-but-blocked | false | false | false | false |

## Row Route Table

| Row | Direct pair rejected | Admission pair selected | Contract pair | Full-binding pair | Ref-carrier pair | Consumed |
| --- | --- | --- | --- | --- | --- | --- |
| R_w_A04_A03 | true | true | false | false | false | false |
| R_u_A10_A09 | true | true | false | false | false | false |
| R_u_A07_A06 | true | true | false | false | false | false |

## Summary

- Endpoint functionals: 4
- Residual consumer rows: 3
- Direct source premise sets ready: 4
- Direct source-promotion routes rejected: 4
- Carrier-admission routes selected: 4
- Binding contracts satisfied: 0
- Full endpoint boundary bindings constructed: 0
- Ref/value non-domain carrier pairs constructed: 0
- Row consumption count: 0
- Branch chart authorized: false

## Proof Burdens

| Burden | Missing field | Required evidence |
| --- | --- | --- |
| direct_source_promotion_rule_soundness | carrier_rule_soundness_proof_present | A proof that direct promotion of source endpoint-boundary-binding refs and endpoint value-binding maps preserves the same-packet witness-object carrier contract. |
| direct_source_promotion_application | carrier_rule_application_proof_present | Endpoint-by-endpoint application proof for any direct source-handle carrier-introduction rule. |
| binding_contract_satisfaction | binding_contract_satisfied | A satisfaction proof for the inherited full endpoint boundary-binding contract target. |
| witness_object_contract_link | witness_object_has_contract_link | An actual witness-object contract link tying the endpoint value-binding map to the full binding contract. |
| full_endpoint_boundary_binding | full_endpoint_boundary_binding_constructed | A proof-grade full endpoint boundary binding, not only a source value map or first primitive binding. |
| endpoint_boundary_binding_ref_carrier_admission | endpoint_boundary_binding_ref_carrier_unblocked | Carrier admission for the endpoint-boundary-binding reference after the full endpoint boundary binding exists. |
| endpoint_value_binding_map_carrier_admission | endpoint_value_binding_map_carrier_unblocked | Carrier admission for the endpoint value-binding map after the full endpoint boundary binding exists. |
| same_packet_ref_value_carrier_pair | ref_value_non_domain_carrier_pair_constructed | A same-packet non-domain carrier pair for the endpoint-boundary-binding ref and endpoint value-binding map. |
| constructed_witness_object_identity | same_constructed_witness_object_identity_proof_present | Constructed witness-object identity and membership proof after the carrier fields exist. |

## Capture Decision

priority-only; the packet records a fail-closed proof-route decision and should not be promoted to reader-facing corpus prose until the selected carrier-admission route supplies a constructive theorem step.
