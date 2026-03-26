# Execute the Frozen Breather Proof Program

## Workstream Metadata

- Kind: `priority`
- Rank: `1`
- Value: `10`
- Cost: `4`
- ROI: `2.50`
- Status: `active`

## Task Queue

1. `seed_margin_persistence` — Formalize the delayed seed-margin persistence lemma. Status: `next`. Depends on: none.
2. `branch_regularity_chain` — Polish the no-accumulation and simple-branch persistence lemmas. Status: `pending`. Depends on: `seed_margin_persistence`.
3. `type_ii_caustic_transit` — Formalize the sharpened Type II caustic-transit integral estimate. Status: `pending`. Depends on: `branch_regularity_chain`.

## Scope

Treat [collinear-breather.md](../../content/markdown/aaa/dynamics/collinear-breather.md) as a frozen reference scaffold and [master-equation-breather.md](../../content/markdown/aaa/dynamics/master-equation-breather.md) as the frozen proof-program blueprint. The active job is proof execution inside the existing theorem DAG, not architectural redesign.

## Current State

- The 1D scaffold is architecturally frozen through collapse-to-crossing, caustic transit, recapture, outer-turn closure, invariant-envelope synthesis, and the Schauder capstone.
- The reduced-planar, unreduced-planar, and planar three-body bridge notes all carry full theorem-program ladders with explicit failure alternatives.
- Repeated review-and-repair cycles have frozen the bridge architecture. The next phase should be literal proof writing.

## Pivots To Preserve

- Integrate the hinge caustic as bounded caustic transit rather than excluding it.
- Preserve the sorting-map and deep-past relocation logic from the 1D scaffold.
- Keep the fixed-point route anchored to a closed convex tame envelope rather than mismatched domains.

## Active Handoff

- Read the seed-side through Schauder packages in [master-equation-breather.md](../../content/markdown/aaa/dynamics/master-equation-breather.md) treating the architecture as frozen.
- Do not add fresh theorem layers unless a real proof-breaking defect is discovered.
- Start with seed-side and early branch-regularity lemmas because they feed the rest of the DAG.
