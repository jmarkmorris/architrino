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

## Concrete Deliverables

- Derive one tri-binary attractor family with radii, frequencies, binding scales, and a shielding-extraction protocol.
- Derive `\zeta(A)` strongly enough to predict a baseline electron mass and a first hierarchy check such as `m_\mu / m_e`.
- Decide which shared inputs survive across the mass-side program, especially `\kappa`, the role of `\eta`, and whether the first map also constrains `h` and `G`.

## Core Work

- Solve the exact 6-body non-Markovian tri-binary equations or locate robust attractors.
- Derive `R_{\text{min}}`, radii ratios, frequency structure, binding scales, and leakage factors directly from the delayed kernel.
- Test the first map against electron / muon / tau or hadron constraints.
