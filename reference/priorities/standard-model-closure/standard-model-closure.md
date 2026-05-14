# Standard Model Closure

## Workstream Metadata

- Kind: `priority`
- Rank: `8`
- Value: `8`
- Cost: `5`
- ROI: `1.60`
- Status: `queued`

## Task Queue

1. `quark_mass_predictions` — Extend quark geometry from catalog closure to first-pass mass predictions. Status: `next`. Depends on: none.
2. `overlap_integrals` — Derive CKM and PMNS overlap integrals from geometry. Status: `pending`. Depends on: `quark_mass_predictions`.
3. `confinement_energetics` — Derive confinement-scale behavior from topological or strain energetics. Status: `pending`. Depends on: `overlap_integrals`.
4. `chirality_crisis` — Test whether the spiral-handedness story can produce weak V-A selection. Status: `pending`. Depends on: `overlap_integrals`.
5. `weak_corridor_provenance` — Determine whether $W^\pm$ corridors carry pro/anti Noether-core provenance, or only charged transaction delta, and close how outgoing lepton / antilepton cores are sourced in weak reactions. Status: `pending`. Depends on: `overlap_integrals`.

## Scope

This workstream owns the remaining Standard Model-facing closure tasks that are not already carried by [mass-map](../mass-map/mass-map.md), [angular-momentum-spin](../angular-momentum-spin/angular-momentum-spin.md), or [quantum-closure](../quantum-closure/quantum-closure.md).

The quark catalog and basic $SU(3)\times SU(2)\times U(1)$ bookkeeping are in place. The remaining leverage is mass prediction, explicit overlap-integral flavor mixing, confinement energetics, weak `V-A` chirality, and weak-reaction provenance.

## Detailed Priority Files

| File | Role | Target AAA notes |
| --- | --- | --- |
| [geometry-first-program.md](geometry-first-program.md) | Preserves the geometry-first closure program, promotion gates, and hard failure tests for quark masses, flavor mixing, confinement, weak chirality, and weak corridor provenance. | [quarks](../../../content/markdown/aaa/assemblies/fermions/quarks.md), [weak-mixing-ckm](../../../content/markdown/aaa/theory-bridges/weak-mixing-ckm.md), [color-charge-su3](../../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md), [electroweak-bosons](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md) |

## Promotion Map

| Task | Detailed file | Primary promotion target | Promotion gate |
| --- | --- | --- | --- |
| `quark_mass_predictions` | [geometry-first-program.md](geometry-first-program.md) | [quarks](../../../content/markdown/aaa/assemblies/fermions/quarks.md) | First-pass mass-basis geometry for `u,d,c,s,t,b`, with mass-map dependencies named explicitly. |
| `overlap_integrals` | [geometry-first-program.md](geometry-first-program.md) | [weak-mixing-ckm](../../../content/markdown/aaa/theory-bridges/weak-mixing-ckm.md) | CKM and PMNS entries stated as geometry-derived overlap integrals rather than fit knobs. |
| `confinement_energetics` | [geometry-first-program.md](geometry-first-program.md) | [color-charge-su3](../../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md) | Confinement-scale behavior derived from topological or strain energetics with a color-singlet bound-state check. |
| `chirality_crisis` | [geometry-first-program.md](geometry-first-program.md) | [weak-mixing-ckm](../../../content/markdown/aaa/theory-bridges/weak-mixing-ckm.md) and [electroweak-bosons](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md) | Weak `V-A` selection follows from geometry or remains an explicit failure point. |
| `weak_corridor_provenance` | [geometry-first-program.md](geometry-first-program.md) | [electroweak-bosons](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md) | Outgoing weak-reaction lepton and antilepton core provenance is resolved without hiding the source of pro/anti Noether cores. |

## Related Priorities

- [mass-map](../mass-map/mass-map.md)
- [3x3](../deferred/3x3/3x3.md)
- [master-equation-closure](../master-equation-closure/master-equation-closure.md)

## Related AAA Notes

- [quarks](../../../content/markdown/aaa/assemblies/fermions/quarks.md)
- [quantum-number-mapping](../../../content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md)
- [color-charge-su3](../../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md)
- [weak-mixing-ckm](../../../content/markdown/aaa/theory-bridges/weak-mixing-ckm.md)
- [electroweak-bosons](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md)
