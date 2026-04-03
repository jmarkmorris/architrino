# Noether-Core Stability and First Mass Map

## Workstream Metadata

- Kind: `priority`
- Rank: `2`
- Value: `10`
- Cost: `4`
- ROI: `2.50`
- Status: `active`

## Task Queue

1. `derive_first_attractor_family` — Derive the first tri-binary attractor family with shielding extraction. Status: `next`. Depends on: none.
2. `derive_zeta` — Derive zeta(A) and target a baseline electron-mass prediction. Status: `pending`. Depends on: `derive_first_attractor_family`.
3. `mass_hierarchy_check` — Test the first mass map against hierarchy ratios and hadron constraints. Status: `pending`. Depends on: `derive_zeta`.

## Scope

This is the parameter-closure and first mass-formula bucket. Treat [parameter-ledger.md](../../content/markdown/aaa/validation/parameter-ledger.md) as bookkeeping only. The live target is one reusable derived mass map.

## Program Notes

- For scorecard purposes, this is the main Parameter Closure + Mass Formulas bucket.
- If the goal is the fastest score lift, pair this workstream with [chapter-authoring](../chapter-authoring/chapter-authoring.md) for Parameter Closure + Coverage.
- Keep the constants question attached to the mass map only when it sharpens the derivation. Otherwise it belongs in background notes, not in the active deliverable.

## Concrete Deliverables

- Derive one tri-binary attractor family with radii, frequencies, binding scales, and a shielding-extraction protocol.
- Derive `\zeta(A)` strongly enough to predict a baseline electron mass and a first hierarchy check such as `m_\mu / m_e`.
- Decide which shared inputs survive across the mass-side program, especially `\kappa`, the role of `\eta`, and whether the first map also constrains `h` and `G`.

## Core Work

- Solve the exact 6-body non-Markovian path-history equations for the tri-binary and locate the relevant limit cycles or other robust attractors.
- Derive the minimum radius `R_{\text{min}}`, radii ratios, frequency structure, binding scales, shielding and leakage factors, and far-field cancellation directly from the delayed `1/r^2` kernel rather than from calibration targets.
- Turn `\zeta` from a placeholder into a derived quantity and use it to predict the baseline electron mass plus a first hierarchy check such as `m_\mu / m_e`.
- Test whether the same derived geometry explains the structural origin of the fine-structure constant `\alpha` from `\kappa` and `c_f`.
- Test the first map against electron / muon / tau or hadron constraints.

## Open Decisions

- Decide which quantities survive as shared inputs across the whole mass-side program, especially `\kappa` and the physical role of `\eta`.
- Decide whether the first mass map should also constrain the bridge to `h` and `G`, or whether those constants should remain downstream until the mass derivation is stable.

## Related Priorities

- [standard-model-closure](../standard-model-closure/standard-model-closure.md)
- [master-equation-closure](../master-equation-closure/master-equation-closure.md)
- [simulations](../simulations/simulations.md)
- [3x3](../3x3/3x3.md)

## Related AAA Notes

- [parameter-ledger](../../content/markdown/aaa/validation/parameter-ledger.md)
- [noether-core](../../content/markdown/aaa/assemblies/noether-core.md)
- [particle-masses](../../content/markdown/aaa/assemblies/particle-masses.md)
- [architrino-si-base-units](../../content/markdown/aaa/validation/architrino-si-base-units.md)
