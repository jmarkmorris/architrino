# Standard Model Closure

## Workstream Metadata

- Kind: `priority`
- Rank: `6`
- Value: `8`
- Cost: `5`
- ROI: `1.60`
- Status: `queued`

## Task Queue

1. `quark_mass_predictions` — Extend quark geometry from catalog closure to first-pass mass predictions. Status: `next`. Depends on: none.
2. `overlap_integrals` — Derive CKM and PMNS overlap integrals from geometry. Status: `pending`. Depends on: `quark_mass_predictions`.
3. `confinement_energetics` — Derive confinement-scale behavior from topological or strain energetics. Status: `pending`. Depends on: `overlap_integrals`.
4. `chirality_crisis` — Test whether the spiral-handedness story can produce weak V-A selection. Status: `pending`. Depends on: `overlap_integrals`.

## Scope

The quark catalog and basic `SU(3)\times SU(2)\times U(1)` bookkeeping are in place. The remaining leverage is mass prediction, explicit overlap-integral flavor mixing, confinement energetics, and the chirality crisis.

## Main Directions

- Extend [quarks.md](../../content/markdown/aaa/assemblies/fermions/quarks.md) from catalog closure to first-pass mass predictions.
- Derive CKM / PMNS data from explicit overlap integrals rather than fit knobs.
- Derive confinement behavior from topological or strain energetics.
- Work the chirality crisis hard enough to test weak `V-A` closure.
