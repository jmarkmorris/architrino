# Proof Programs

## Workstream Metadata

- Kind: `priority`
- Rank: `1`
- Value: `10`
- Cost: `4`
- ROI: `2.50`
- Status: `active`

## Task Queue

1. `breather_certificate` — Generate the finite collinear-breather certificate packet and close the conditional Schauder theorem only after the audit passes. Status: `next`. Depends on: none.
2. `planar_bridge` — Develop the first planar delayed-bridge closure as the higher-dimensional extension of the breather proof architecture. Status: `queued`. Depends on: `breather_certificate`.
3. `proof_program_handoff` — Keep theorem-program chapters, certificate artifacts, and downstream priority links aligned as proof targets are promoted or retired. Status: `active`. Depends on: `breather_certificate`, `planar_bridge`.

## Scope

This directory consolidates active proof-program priorities whose main deliverable is mathematical closure rather than general dynamics exposition. The shared pattern is: state a theorem target, isolate the finite or geometric certificate needed for that target, and keep promotion from conjectural architecture to proved result explicit.

## Nested Workstreams

- [breather-proof](./breather-proof/breather-proof.md): active finite-certificate program for the 1D collinear breather.
- [planar-bridge-closure](./planar-bridge-closure/planar-bridge-closure.md): queued higher-dimensional bridge from the collinear program to the first planar delayed return map.

## Related AAA Proof-Program Notes

- [closed-form-collinear-breather-ansatz](../../../content/markdown/aaa/proof-programs/closed-form-collinear-breather-ansatz.md)
- [collinear-breather](../../../content/markdown/aaa/proof-programs/collinear-breather.md)
- [master-equation-breather](../../../content/markdown/aaa/proof-programs/master-equation-breather.md)
- [planar-bridge-closure](../../../content/markdown/aaa/proof-programs/planar-bridge-closure.md)

## Related Priorities

- [master-equation-closure](../master-equation-closure/master-equation-closure.md)
- [tri-binary-causal-closure](../tri-binary-causal-closure/tri-binary-causal-closure.md)
- [dyadic-lock](../dyadic-lock/dyadic-lock.md)
