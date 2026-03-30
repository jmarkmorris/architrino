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

## Remaining Leverage

- Extend [quarks.md](../../content/markdown/aaa/assemblies/fermions/quarks.md) from catalog closure to first-pass mass predictions for `u,d,c,s,t,b`.
- Finish the remaining quantum-number dictionary pieces from the tri-binary geometry.
- Move from mixing-angle checks against Standard Model pulls to explicit overlap-integral derivations for CKM and PMNS data.

## Main Directions

- Extend [quarks.md](../../content/markdown/aaa/assemblies/fermions/quarks.md) from catalog closure to first-pass mass predictions.
- Derive CKM / PMNS data from explicit overlap integrals rather than fit knobs.
- Derive confinement behavior from topological or strain energetics.
- Work the chirality crisis hard enough to test weak `V-A` closure.

## Geometry-First Program

- Compute the exact 3D charge distributions or effective wavefunctions of the Gen I, II, and III core geometries and use them as the mass-basis and weak-basis objects.
- Derive the overlap integrals
$$
V_{ij} = \int \psi_{j,\text{mass}}^\ast \psi_{i,\text{weak}} \, d\mu
$$
rather than treating transport costs as fit knobs.
- Derive `\kappa_{12}`, `\kappa_{23}`, and analogous transport parameters from radii ratios, field drag, and shielding mismatch.
- Test whether the CP phase can be recovered as a holonomy or torsion consequence, including the current closure target `\cos\delta = s_{13}/(s_{12}s_{23})`.
- Derive confinement-scale behavior from topological or strain energetics of flux tubes, braids, or other line defects, aiming for linear tension `V \propto r` or `\sigma_{\mathrm{eff}} L` and finite relaxed bounds for closed color-singlet configurations.

## Hard Failure Tests

- Work the chirality crisis explicitly: if spiral handedness cannot generate the weak `V-A` selection rule, the model fails on this front.
- If right-handed neutrinos couple to `W` with the same strength as left-handed ones, the model fails.
- Keep trying to derive `\alpha` and the other coupling constants from geometry rather than treating them as arbitrary inputs.

## Related Action Items

- [mass-map](../mass-map/mass-map.md)
- [3x3](../3x3/3x3.md)
- [glyph](../glyph/glyph.md)
- [master-equation-closure](../master-equation-closure/master-equation-closure.md)

## Related AAA Notes

- [quarks](../../content/markdown/aaa/assemblies/fermions/quarks.md)
- [quantum-number-mapping](../../content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md)
- [color-charge-su3](../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md)
- [weak-mixing-ckm](../../content/markdown/aaa/assemblies/fermions/weak-mixing-ckm.md)
- [electroweak-bosons](../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md)
