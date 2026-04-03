# Simulations, Regularization, and Shell Numerics

## Workstream Metadata

- Kind: `priority`
- Rank: `7`
- Value: `8`
- Cost: `5`
- ROI: `1.60`
- Status: `queued`

## Task Queue

1. `tier0_tier1_runs` — Implement tier-0 and tier-1 simulation protocols. Status: `next`. Depends on: none.
2. `convergence_and_provenance` — Publish convergence plots and U-now provenance logs. Status: `pending`. Depends on: `tier0_tier1_runs`.
3. `eta_positive_package` — Consolidate the formal eta-greater-than-zero existence and continuation package. Status: `pending`. Depends on: `tier0_tier1_runs`.

## Scope

Lock the simulation and numerics side tightly enough to support the analytic closure program. This includes tier-0 / tier-1 runs, convergence, maximum-curvature orbit behavior, and the formal `\eta > 0` package.

## Main Work

- Implement tier-0 and tier-1 simulations per [run-protocols](../../content/markdown/aaa/validation/simulations/run-protocols.md) and the `validation/simulations/action-energy/*` material.
- Lock the maximum-curvature orbit, history resolution, and binary / tri-binary stability numerically.
- Publish convergence plots and `\mathbb{U}_{\text{now}}` provenance logs.
- Consolidate a formal `\eta > 0` package covering existence, uniqueness, continuation criteria, and no-runaway bounds.
- Tie the Planck mapping back to the master equation and validate it numerically instead of leaving key identifications conjectural.
- If a quick intuition tool would help, build a simple model with sliders for escaping potential versus different frequencies so the `f_{\mathrm{MCB}}` behavior is easier to see.

## Related Priorities

- [master-equation-closure](../master-equation-closure/master-equation-closure.md)
- [mass-map](../mass-map/mass-map.md)
- [dyadic-lock](../dyadic-lock/dyadic-lock.md)
- [quantum-closure](../quantum-closure/quantum-closure.md)
- [strong-field-closure](../strong-field-closure/strong-field-closure.md)

## Related AAA Notes

- [run-protocols](../../content/markdown/aaa/validation/simulations/run-protocols.md)
- [convergence-tests](../../content/markdown/aaa/validation/simulations/convergence-tests.md)
- [synthetic-observables](../../content/markdown/aaa/validation/simulations/synthetic-observables.md)
- [well-posedness-and-regularization](../../content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md)
- [mapping-Planck-scale](../../content/markdown/aaa/dynamics/mapping-Planck-scale.md)
