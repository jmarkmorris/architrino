# Standard Model Geometry-First Program

This detailed priority file supports [Standard Model Closure](standard-model-closure.md). It is developer-facing source material for promotion into deployed $\mathbb{A}\mathbb{A}\mathbb{A}$ documents, not a second canonical textbook chapter.

The file gathers the geometry-first closure program for quark masses, CKM / PMNS mixing, confinement energetics, weak `V-A` chirality, and weak-corridor provenance. The main workstream file keeps rank, status, and queue control.

## Target AAA Notes

| Target | Promotion role |
| --- | --- |
| [quarks](../../../content/markdown/aaa/assemblies/fermions/quarks.md) | First-pass mass predictions for `u,d,c,s,t,b` and any geometry needed to define mass-basis states. |
| [quantum-number-mapping](../../../content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md) | Remaining quantum-number dictionary pieces from tri-binary geometry. |
| [color-charge-su3](../../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md) | Confinement energetics and color-singlet bound-state checks. |
| [weak-mixing-ckm](../../../content/markdown/aaa/theory-bridges/weak-mixing-ckm.md) | CKM / PMNS overlap-integral derivations, CP phase tests, and weak `V-A` chirality. |
| [electroweak-bosons](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md) | Weak corridor provenance and the status of $W^\pm$ as charge-routing bundles versus carriers of pro/anti Noether-core provenance. |

## Remaining Leverage

- Extend [quarks](../../../content/markdown/aaa/assemblies/fermions/quarks.md) from catalog closure to first-pass mass predictions for `u,d,c,s,t,b`.
- Finish the remaining quantum-number dictionary pieces from the tri-binary geometry.
- Move from mixing-angle checks against Standard Model pulls to explicit overlap-integral derivations for CKM and PMNS data.

## Main Directions

- Extend [quarks](../../../content/markdown/aaa/assemblies/fermions/quarks.md) from catalog closure to first-pass mass predictions.
- Derive CKM / PMNS data from explicit overlap integrals rather than fit knobs.
- Derive confinement behavior from topological or strain energetics.
- Work the chirality crisis hard enough to test weak `V-A` closure.
- Close the provenance question for weak corridors: whether $W^\pm$ should be modeled as carrying final-state pro/anti Noether-core identity, or only as transient charge-routing bundles while the local pro/anti core reservoir supplies outgoing lepton cores.

## Geometry Program

- Compute the exact 3D charge distributions or effective wavefunctions of the Gen I, II, and III core geometries and use them as the mass-basis and weak-basis objects.
- Derive the overlap integrals
  $$
  V_{ij} = \int \psi_{j,\text{mass}}^\ast \psi_{i,\text{weak}} \, d\mu
  $$
  rather than treating transport costs as fit knobs.
- Derive $\kappa_{12}$, $\kappa_{23}$, and analogous transport parameters from radii ratios, medium-dressed transport response, and shielding mismatch.
- Test whether the CP phase can be recovered as a holonomy or torsion consequence, including the current closure target $\cos\delta = s_{13}/(s_{12}s_{23})$.
- Derive confinement-scale behavior from topological or strain energetics of flux tubes, braids, or other line defects, aiming for linear tension $V \propto r$ or $\sigma_{\mathrm{eff}} L$ and finite relaxed bounds for closed color-singlet configurations.

## Hard Failure Tests

- Work the chirality crisis explicitly: if spiral handedness cannot generate the weak `V-A` selection rule, the model fails on this front.
- If right-handed neutrinos couple to `W` with the same strength as left-handed ones, the model fails.
- Keep trying to derive $\alpha$ and the other coupling constants from geometry rather than treating them as arbitrary inputs.
- If the model cannot say where outgoing weak-reaction lepton and antilepton cores actually come from, then electroweak provenance closure remains incomplete even if coarse CKM-style bookkeeping is reproduced.

## Promotion Gates

| Topic | Gate |
| --- | --- |
| Quark masses | State the geometric variables, mass-basis objects, and mass-map dependencies before promoting first-pass numerical claims. |
| CKM / PMNS mixing | Express the entries as overlap integrals with defined measures, basis states, and normalization conditions. |
| CP phase | Decide whether the current $\cos\delta = s_{13}/(s_{12}s_{23})$ target is derived, falsified, or only a heuristic comparison. |
| Confinement | Produce a line-defect, braid, or strain-energy mechanism that yields effective linear tension or a finite relaxed bound for color-singlet configurations. |
| Weak chirality | Show how geometry selects weak `V-A` behavior, or record the failure explicitly. |
| Weak corridor provenance | Decide whether $W^\pm$ corridors carry pro/anti Noether-core provenance or only charged transaction delta, and name the source of outgoing lepton / antilepton cores. |
