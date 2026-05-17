# Standard Model Closure

## Workstream Metadata

- Kind: `priority`
- Rank: `11`
- Value: `18.69`
- Cost: `6.2`
- ROI: `3.01`
- Status: `queued`

## Task Queue

1. `quark_mass_predictions` — Extend quark geometry from catalog closure to first-pass mass predictions. Status: `next`. Depends on: none.
2. `overlap_integrals` — Derive CKM and PMNS overlap integrals from geometry. Status: `pending`. Depends on: `quark_mass_predictions`.
3. `confinement_energetics` — Derive confinement-scale behavior from topological or strain energetics. Status: `pending`. Depends on: `overlap_integrals`.
4. `weak_sector_gauge_closure` — Unify weak axial-frame exposure, `V-A`, CKM/PMNS overlap, weak-corridor provenance, and effective gauge covariance into one closure packet. Status: `review`. Depends on: `overlap_integrals`.
5. `nuclear_binding_closure` — Build the first nuclear benchmark ladder from hadronic geometry and residual strong channels: deuteron, saturation, alpha-like cluster, and beta stability. Status: `review`. Depends on: `confinement_energetics`.
6. `hydrogen_fermion_sea_boundary` — Derive the four-fermion hydrogen boundary map that separates exact assembly-ledger membership from dynamic exclusion-envelope and Noether-Sea coarse-graining boundaries. Status: `seeded`. Depends on: `confinement_energetics`, `nuclear_binding_closure`.

## Scope

This workstream owns the remaining Standard Model-facing closure tasks that are not already carried by [mass-map](../mass-map/mass-map.md), [angular-momentum-spin](../angular-momentum-spin/angular-momentum-spin.md), or [quantum-closure](../quantum-closure/quantum-closure.md).

The quark catalog and basic $SU(3)\times SU(2)\times U(1)$ bookkeeping are in place. The remaining leverage is mass prediction, explicit overlap-integral flavor mixing, confinement energetics, weak-sector exposure/gauge closure, and nuclear coarse-graining. Weak `V-A` chirality and weak-reaction provenance are preserved as subgates of `weak_sector_gauge_closure`, not as separate top-level queue items.

The hydrogen boundary question is now a staged standard-model-to-atomic bridge. Its value is not another validation gate; it is the first clean local map between four charged fermion assemblies, the proton's color-singlet closure, the electron resonance envelope, and the ambient Noether-Sea coarse-graining used as local spacetime.

## Detailed Priority Files

| File | Role | Target $\mathbb{A}\mathbb{A}\mathbb{A}$ notes |
| --- | --- | --- |
| [geometry-first-program.md](geometry-first-program.md) | Preserves the geometry-first closure program, promotion gates, and hard failure tests for quark masses, flavor mixing, and confinement; weak chirality/provenance content now routes through the weak-sector packet. | [quarks](../../../content/markdown/aaa/assemblies/fermions/quarks.md), [weak-mixing-ckm](../../../content/markdown/aaa/theory-bridges/weak-mixing-ckm.md), [color-charge-su3](../../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md), [electroweak-bosons](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md) |
| [weak-sector-gauge-closure.md](weak-sector-gauge-closure.md) | Detailed packet for axial-frame misalignment, weak-coupling-triad exposure, `V-A`, CKM/PMNS overlap, weak-corridor provenance, and gauge-covariance compatibility. | [weak-mixing-angle](../../../content/markdown/aaa/assemblies/fermions/weak-mixing-angle.md), [weak-mixing-ckm](../../../content/markdown/aaa/theory-bridges/weak-mixing-ckm.md), [electroweak-bosons](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md), [gauge-symmetries](../../../content/markdown/aaa/interactions/gauge-symmetries.md), [gauge-structure-emergence](../../../content/markdown/aaa/interactions/gauge-structure-emergence.md) |
| [nuclear-binding-closure.md](nuclear-binding-closure.md) | Detailed packet for the first hadronic-to-nuclear benchmark ladder and effective $V_{NN}$ target. | [nuclear-binding](../../../content/markdown/aaa/nuclear-atomic/nuclear-binding.md), [nucleon-structure](../../../content/markdown/aaa/nuclear-atomic/nucleon-structure.md), [mesons](../../../content/markdown/aaa/assemblies/mesons/mesons.md) |

## Promotion Map

| Task | Detailed file | Primary promotion target | Promotion gate |
| --- | --- | --- | --- |
| `quark_mass_predictions` | [geometry-first-program.md](geometry-first-program.md) | [quarks](../../../content/markdown/aaa/assemblies/fermions/quarks.md) | First-pass mass-basis geometry for `u,d,c,s,t,b`, with mass-map dependencies named explicitly. |
| `overlap_integrals` | [geometry-first-program.md](geometry-first-program.md) | [weak-mixing-ckm](../../../content/markdown/aaa/theory-bridges/weak-mixing-ckm.md) | CKM and PMNS entries stated as geometry-derived overlap integrals rather than fit knobs. |
| `confinement_energetics` | [geometry-first-program.md](geometry-first-program.md) | [color-charge-su3](../../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md) | Confinement-scale behavior derived from topological or strain energetics with a color-singlet bound-state check. |
| `weak_sector_gauge_closure` | [weak-sector-gauge-closure.md](weak-sector-gauge-closure.md) | [weak-mixing-angle](../../../content/markdown/aaa/assemblies/fermions/weak-mixing-angle.md), [weak-mixing-ckm](../../../content/markdown/aaa/theory-bridges/weak-mixing-ckm.md), [electroweak-bosons](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md), [gauge-symmetries](../../../content/markdown/aaa/interactions/gauge-symmetries.md), and [gauge-structure-emergence](../../../content/markdown/aaa/interactions/gauge-structure-emergence.md) | One weak-exposure domain supports `V-A`, CKM/PMNS overlap, weak-reaction provenance, and effective gauge covariance without leading-order preferred-frame leakage. |
| `nuclear_binding_closure` | [nuclear-binding-closure.md](nuclear-binding-closure.md) | [nuclear-binding](../../../content/markdown/aaa/nuclear-atomic/nuclear-binding.md), [nucleon-structure](../../../content/markdown/aaa/nuclear-atomic/nucleon-structure.md), and [mesons](../../../content/markdown/aaa/assemblies/mesons/mesons.md) | The hadronic program binds $p+n$, avoids an unphysical $p+p$ bound state, explains saturation and alpha-like enhancement, and keeps beta stability in one ledger. |
| `hydrogen_fermion_sea_boundary` | This file | [atomic-structure](../../../content/markdown/aaa/nuclear-atomic/atomic-structure.md) and [noether-core-geometry](../../../content/markdown/aaa/spacetime/noether-core-geometry.md) | The hydrogen atom is used to derive the distinction between exact fermion assembly membership, dynamic exclusion envelope, electron resonance envelope, and ambient Noether-Sea coarse-graining. |

## Related Priorities

- [mass-map](../mass-map/mass-map.md)
- [3x3](../deferred/3x3/3x3.md)
- [master-equation-closure](../master-equation-closure/master-equation-closure.md)
- [validation-gates](../validation-gates/validation-gates.md)

## Related $\mathbb{A}\mathbb{A}\mathbb{A}$ Notes

- [quarks](../../../content/markdown/aaa/assemblies/fermions/quarks.md)
- [quantum-number-mapping](../../../content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md)
- [color-charge-su3](../../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md)
- [weak-mixing-angle](../../../content/markdown/aaa/assemblies/fermions/weak-mixing-angle.md)
- [weak-mixing-ckm](../../../content/markdown/aaa/theory-bridges/weak-mixing-ckm.md)
- [electroweak-bosons](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md)
- [gauge-symmetries](../../../content/markdown/aaa/interactions/gauge-symmetries.md)
- [gauge-structure-emergence](../../../content/markdown/aaa/interactions/gauge-structure-emergence.md)
- [nuclear-binding](../../../content/markdown/aaa/nuclear-atomic/nuclear-binding.md)
- [nucleon-structure](../../../content/markdown/aaa/nuclear-atomic/nucleon-structure.md)
- [atomic-structure](../../../content/markdown/aaa/nuclear-atomic/atomic-structure.md)
- [mesons](../../../content/markdown/aaa/assemblies/mesons/mesons.md)
