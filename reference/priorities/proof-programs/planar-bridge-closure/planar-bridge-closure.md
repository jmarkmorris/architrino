# Planar Bridge Closure

## Workstream Metadata

- Kind: `proof-subprogram`
- Rank: `1.2`
- Value: `6`
- Cost: `5`
- ROI: `1.20`
- Status: `queued`

## Task Queue

1. `planar_seed_packet` — Define the reduced planar history space, seed packet, and quantitative section transversality. Status: `next`. Depends on: none.
2. `cone_branch_regularity` — Prove local sectorized cone control and short-time branch regularity on the first excursion slab. Status: `pending`. Depends on: `planar_seed_packet`.
3. `bounded_fold_transit` — Prove bounded caustic transit through the first planar fold tube. Status: `pending`. Depends on: `cone_branch_regularity`.
4. `radial_turnaround` — Prove radial turnaround with inward delayed forcing beating centrifugal leakage. Status: `pending`. Depends on: `bounded_fold_transit`.
5. `tame_return_map` — Assemble the tame-envelope return theorem with continuous gauge reset. Status: `pending`. Depends on: `radial_turnaround`.

## Scope

This workstream isolates the first higher-dimensional closure problem that can move the dynamics stack forward decisively. The exact delayed law and branch-topology machinery already exist. What is still missing is a theorem-backed bridge showing that a genuinely planar delayed system admits a controlled section class, local branch regularity, bounded caustic transit, a genuine radial turnaround, and a return map that closes on a controlled envelope.

## Position In The Dynamics Stack

This chapter sits between:

1. [master-equation](../../../../content/markdown/aaa/dynamics/master-equation.md),
2. [causal-action-functional](../../../../content/markdown/aaa/dynamics/causal-action-functional.md),
3. [collinear-breather](../../../../content/markdown/aaa/proof-programs/collinear-breather.md),
4. [master-equation-breather](../../../../content/markdown/aaa/proof-programs/master-equation-breather.md).

Its role is narrower than the full breather program. It does not attempt immediate many-body closure. It focuses on the first planar binary regime in which line-order arguments fail, tangential escape becomes real, and branch topology must be controlled together with radial recapture.

## Main Closure Targets

- Define the rotational gauge and return section cleanly enough that the reduced return map is well posed.
- Prove a local directional-cone result that keeps delayed chords and instantaneous velocities inside a finite admissible angular atlas on a short post-section interval.
- Prove a bounded fold-transit theorem so Jacobian-null events are crossed as part of the mechanism rather than excluded as pathologies.
- Prove a strict radial majorization in which inward delayed forcing beats centrifugal leakage on the inbound leg.
- Close a convex tame envelope of reduced planar histories under one-cycle return plus gauge reset.

## Failure Alternatives

If the bridge does not close, the useful obstruction alternatives are:

1. no seed packet with quantitative section transversality can be maintained;
2. local cone control fails before the first useful excursion slab is complete;
3. fold transit produces unbounded delayed impulse or uncontrolled branch proliferation;
4. centrifugal leakage outruns radial recapture before turnaround;
5. the reduced return map loses continuity under gauge reset.

Each of these outcomes is still informative because it identifies the exact geometric obstruction rather than leaving the whole higher-dimensional closure program vague.

## Why This Matters

- This is the first regime where the proof architecture must leave the line while still retaining enough symmetry to remain mathematically tractable.
- If it closes, it becomes the substrate basis for planar lock, terminal aligned modes, and the horizon-facing chirality questions.
- If it fails, several downstream chapters should become more conditional rather than continuing to rely on an unstated planar bridge.

## Immediate Work Order

1. Define the reduced planar history space, seed packet, and quantitative section transversality.
2. Prove local sectorized cone control and short-time branch regularity on the first excursion slab.
3. Prove a bounded caustic-transit theorem for the first planar fold tube.
4. Prove a radial-turnaround inequality in which inward delayed forcing beats centrifugal leakage.
5. Assemble these ingredients into a tame-envelope return theorem with continuous gauge reset.

## Related Priorities

- [breather-proof](../breather-proof/breather-proof.md)
- [master-equation-closure](../../master-equation-closure/master-equation-closure.md)
- [dyadic-lock](../../dyadic-lock/dyadic-lock.md)
- [strong-field-hypotheses](../../strong-field-hypotheses/strong-field-hypotheses.md)

## Related AAA Notes

- [planar-bridge-closure](../../../../content/markdown/aaa/proof-programs/planar-bridge-closure.md)
- [master-equation](../../../../content/markdown/aaa/dynamics/master-equation.md)
- [causal-action-functional](../../../../content/markdown/aaa/dynamics/causal-action-functional.md)
- [collinear-breather](../../../../content/markdown/aaa/proof-programs/collinear-breather.md)
- [master-equation-breather](../../../../content/markdown/aaa/proof-programs/master-equation-breather.md)
- [horizon-chirality](../../../../content/markdown/aaa/dynamics/horizon-chirality.md)
