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
6. `hydrogen_fermion_sea_boundary` — Derive the four-fermion hydrogen boundary map that separates exact assembly-ledger membership from dynamic exclusion-envelope and Noether-Sea coarse-graining boundaries. Status: `scaffolded`. Depends on: `confinement_energetics`, `nuclear_binding_closure`.

## Scope

This workstream owns the remaining Standard Model-facing closure tasks that are not already carried by [mass-map](../mass-map/mass-map.md), [angular-momentum-spin](../angular-momentum-spin/angular-momentum-spin.md), or [quantum-closure](../quantum-closure/quantum-closure.md).

The quark catalog and basic $SU(3)\times SU(2)\times U(1)$ bookkeeping are in place. The remaining leverage is mass prediction, explicit overlap-integral flavor mixing, confinement energetics, weak-sector exposure/gauge closure, and nuclear coarse-graining. Weak `V-A` chirality and weak-reaction provenance are preserved as subgates of `weak_sector_gauge_closure`, not as separate top-level queue items.

The hydrogen boundary question is now a staged standard-model-to-atomic bridge. Its value is not another validation gate; it is the first clean local map between four charged fermion assemblies, the proton's color-singlet closure, the electron resonance envelope, and the ambient Noether-Sea coarse-graining used as local spacetime.

## Hydrogen Boundary Closure Object

The current scaffold separates three objects that must not be collapsed:

$$
\mathcal{A}_{\mathrm{H}}(t)
=
\mathcal{A}_{e}(t)
\cup
\mathcal{A}_{u_1}(t)
\cup
\mathcal{A}_{u_2}(t)
\cup
\mathcal{A}_{d}(t)
\cup
\mathcal{L}_{\mathrm{strong}}^{uud}(t),
$$

$$
S_{\mathrm{sea}}^{\Omega_{\mathrm{H}}}(t)
=
S(t)\big|_{\Omega_{\mathrm{H}}}
\setminus
\mathcal{A}_{\mathrm{H}}(t),
$$

and

$$
\partial\Omega_f(D_*,t)
=
\left\{
\mathbf{x}\in\Sigma_t:
D_f(\mathbf{x},t)=D_*
\right\}.
$$

Here $\mathcal{A}_{\mathrm{H}}$ is the exact hydrogen matter-assembly ledger, $S_{\mathrm{sea}}^{\Omega_{\mathrm{H}}}$ is the local Noether-Sea complement, and $\partial\Omega_f(D_*,t)$ is the effective spatial interface extracted from locked-assembly wake dominance. The closure target is to derive $D_f$ from the same Noether-core geometry and causal-wake ledgers used for mass, confinement, and atomic orbital recovery.

Failure modes:

- `hydrogen.ledger_surface_blend`: exact assembly membership is mistaken for a literal hard spatial surface.
- `hydrogen.orbital_body_blend`: the electron resonance envelope is treated as the electron's Noether-core boundary.
- `hydrogen.sea_core_count_blend`: the four matter Noether cores are counted as the local spacetime medium rather than as assemblies embedded in the ambient Noether Sea.
- `hydrogen.proton_quark_split`: the three quark assemblies are treated as free Noether cores rather than as a color-singlet proton closure.

## Element-Dependent Response Extension

The hydrogen boundary scaffold generalizes to heavier atoms only if the element name is expanded into state data. The priority object is not `Fe`, `Ne`, or `transition metal` as a label. It is the local assembly record: isotope, nuclear closure ledger, electron-envelope branch, shell stability gap, and any realized bonding, lattice, or magnetic branch.

For an element or isotope window $\Omega_E$, the promoted target is

$$
S_{\mathrm{sea}}^{\Omega_E}(t)
=
S(t)\big|_{\Omega_E}
\setminus
\left(
\mathcal A_{\mathrm{nuc}}^{Z,N}(t)
\cup
\mathcal A_{\mathrm{e-env}}^{\mathcal B_e}(t)
\cup
\mathcal L_{\mathrm{bond}}^{\mathcal B_{\mathrm{lat}}}(t)
\right),
$$

with response decomposition

$$
\theta_E^{(\ell)}
=
\theta_{\mathrm{bg}}^{(\ell)}
+
\delta\theta_{\mathrm{nuc}}^{(\ell)}
\!\left[
Z,N,\Sigma_{\mathrm{ax}}^{Z,N},\mathcal L_{\mathrm{nuc}}^{Z,N}
\right]
+
\delta\theta_{\mathrm{e-env}}^{(\ell)}
\!\left[
\mathcal B_e
\right]
+
\delta\theta_{\mathrm{bond}}^{(\ell)}
\!\left[
\mathcal B_{\mathrm{lat}}
\right].
$$

The associated medium-response tensor target is

$$
\mathcal M_{\mathrm{sea},E}^{ab}
=
\mathcal M_0^{ab}
+
\Delta\mathcal M_{\mathrm{nuc}}^{ab}
\!\left(
Z,N,\Sigma_{\mathrm{ax}}^{Z,N}
\right)
+
\Delta\mathcal M_{\mathrm{e}}^{ab}
\!\left(
\mathcal B_e,C_{\mathrm{shell}}
\right)
+
\Delta\mathcal M_{\mathrm{bond}}^{ab}
\!\left(
\mathcal B_{\mathrm{lat}}
\right).
$$

This extension creates benchmark classes without adding a new top-level validation gate:

| Benchmark class | Continuum input to compute | Observer summaries to keep downstream |
| --- | --- | --- |
| Light atoms | $Z,N$, minimal nuclear ledger, low-order electron envelope, weak local $\delta\theta_E^{(\ell)}$ | `light atom`, element symbol, simple $s/p$ label |
| Closed-shell atoms | Large $C_{\mathrm{shell}}$, low external multipole stress, stable electron envelope | `noble gas`, inertness, ionization-energy maximum |
| Transition metals | Nearby anisotropic $d$-envelope branches, multiple corridor-compatible electron states | `transition metal`, oxidation-state family, coordination-rich chemistry |
| Iron-group elements | Isotope-specific nuclear ledger, $3d$ branch structure, and material magnetic/lattice branch when present | `iron group`, metallurgy, abundance, conventional stability narrative |

Failure modes:

- `element.label_boundary_blend`: a periodic-table family name is treated as a Noether-Sea boundary condition without an explicit assembly record.
- `element.chemistry_source_blend`: oxidation state, electronegativity, or atomic radius is used as an input rather than a recovered observer-level summary.
- `element.lattice_isolated_blend`: lattice, bonding, or magnetic response is assigned to an isolated atom without a realized material branch.

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
