# Proof Programs

## Workstream Metadata

- Kind: `priority`
- Rank: `3`
- Value: `23.71`
- Cost: `4.3`
- ROI: `5.51`
- Status: `active`

## Task Queue

1. `breather_certificate` — Generate the finite collinear-breather certificate packet and close the conditional Schauder theorem only after the audit passes. Status: `next`. Depends on: none.
2. `planar_bridge` — Develop the first planar delayed-bridge closure as the higher-dimensional extension of the breather proof architecture. Status: `queued`; do not promote ahead of the collinear certificate unless that certificate fails with an explicit obstruction that the planar bridge is meant to resolve. Depends on: `breather_certificate`.
3. `proof_program_handoff` — Keep theorem-program chapters, certificate artifacts, and downstream priority links aligned as proof targets are promoted or retired. Status: `active`. Depends on: `breather_certificate`, `planar_bridge`.

## Scope

This directory consolidates active proof-program priorities whose main deliverable is mathematical closure rather than general dynamics exposition. The shared pattern is: state a theorem target, isolate the finite or geometric certificate needed for that target, and keep promotion from conjectural architecture to proved result explicit.

This file is the parent control surface for proof programs. The nested structure is intentional here because proof programs can have local theorem targets, certificate artifacts, and promotion gates that are too specific for the parent queue.

## Nested Workstreams

- [breather-proof](./breather-proof/breather-proof.md): active finite-certificate program for the 1D collinear breather. Its next executable gates are the candidate cycle packet, the named null-coordinate pre-ledger target, and the branch-chart certificate.
- [planar-bridge-closure](./planar-bridge-closure/planar-bridge-closure.md): queued higher-dimensional bridge from the collinear program to the first planar delayed return map.

## Promotion Map

| Task | Detailed source | Primary promotion target | Promotion gate |
| --- | --- | --- | --- |
| `breather_certificate` | [breather-proof](./breather-proof/breather-proof.md) and [seed chart packet](./breather-proof/certificate/seed_chart_packet.md) | [collinear-breather](../../../content/markdown/aaa/proof-programs/collinear-breather.md) and [master-equation-breather](../../../content/markdown/aaa/proof-programs/master-equation-breather.md) | The finite certificate reports one candidate cycle and mesh on the same certified domain, null-coordinate causal ledger, authorized branch chart, monodromy diagnostic, returned-sample report, and topology ledger before theorem promotion. |
| `planar_bridge` | [planar-bridge-closure](./planar-bridge-closure/planar-bridge-closure.md) | [planar-bridge-closure](../../../content/markdown/aaa/proof-programs/planar-bridge-closure.md) | The planar bridge is promoted only after the collinear certificate passes, or after a specific collinear obstruction justifies the planar extension. |
| `proof_program_handoff` | This file | [master-equation-closure](../master-equation-closure/master-equation-closure.md), [tri-binary-causal-closure](../tri-binary-causal-closure/tri-binary-causal-closure.md), and [dyadic-lock](../dyadic-lock/dyadic-lock.md) | Downstream priority links and AAA theorem-program chapters are updated whenever a proof target is promoted, blocked, or retired. |

## Related AAA Proof-Program Notes

- [closed-form-collinear-breather-ansatz](../../../content/markdown/aaa/proof-programs/closed-form-collinear-breather-ansatz.md)
- [collinear-breather](../../../content/markdown/aaa/proof-programs/collinear-breather.md)
- [master-equation-breather](../../../content/markdown/aaa/proof-programs/master-equation-breather.md)
- [planar-bridge-closure](../../../content/markdown/aaa/proof-programs/planar-bridge-closure.md)

## Related Priorities

- [master-equation-closure](../master-equation-closure/master-equation-closure.md)
- [tri-binary-causal-closure](../tri-binary-causal-closure/tri-binary-causal-closure.md)
- [dyadic-lock](../dyadic-lock/dyadic-lock.md)
