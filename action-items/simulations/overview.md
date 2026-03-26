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

- Implement the run protocols in the validation simulation material.
- Lock history resolution and binary / tri-binary stability numerically.
- Publish convergence plots and provenance logs.
- Validate the Planck mapping numerically against the master equation.
