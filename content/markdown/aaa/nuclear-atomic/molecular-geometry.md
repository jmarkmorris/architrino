# Molecular Geometry

This chapter states the molecular-geometry closure target within the assembly framework. Its purpose is to identify what molecular shape depends on in this ontology so the eventual detailed derivation has a stable launch point.

It should be connected to [Atomic Structure](atomic-structure.md), [Atomic Spectra](atomic-spectra.md), [Condensed Matter](condensed-matter.md), and [Molecular Exclusion and Noether Sea Response](../spacetime/molecular-exclusion-and-noether-sea-response.md), which together supply the atomic constituents, resonance behavior, medium response, and exclusion geometry that molecular shapes must reconcile.

Spin and Pauli language in this chapter is downstream of [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md) and [Fermi-Dirac and Bose-Einstein Statistics](../quantum/fermi-dirac-and-bose-einstein-statistics.md). Molecular singlet/triplet labels, bonding selection rules, electron-pair exclusion, and orbital-hybridization language should be treated as validation targets for those lower proofs, not as separate explanations.

## Purpose

This chapter states the first working closure target for molecular geometry in $\mathbb{A}\mathbb{A}\mathbb{A}$. It does not yet derive molecular shape from the master equation. It fixes the ingredients that a later derivation must combine.

## Framing

Molecular geometry should emerge from the coupled equilibrium of atomic-scale assemblies, directional bonding corridors, and delayed path-history constraints that favor particular angular arrangements and bond lengths.

At the constituent level this points back to [Electron](../assemblies/fermions/electron.md) and [Nucleon Structure](nucleon-structure.md).

## Binding Corridors and Angle Selection

The molecular-bonding problem is not only an electron-sharing problem. In this framework, a bond is an effective corridor in which two or more atomic assemblies lower their combined energy by sharing wake structure, exclusion geometry, and local Noether sea response. Bond length is the radial equilibrium of that corridor; bond angle is the angular equilibrium after neighboring corridors compete for exclusion volume and phase compatibility.

A first useful decomposition is:

- **corridor attraction:** the energy decrease from shared wake and resonance structure,
- **exclusion cost:** the rise in energy when electron assemblies or nucleon envelopes over-compress,
- **phase compatibility:** the condition that coupled electron resonances remain stable over repeated cycles,
- **medium response:** the local Noether sea density and delay contribution to stiffness and shielding.

This decomposition can organize molecular shape before the spin proof is complete, but it cannot close molecular occupancy by itself. The exclusion-cost term must eventually inherit Pauli/statistics closure, while phase compatibility must eventually be connected to the completed atomic spin and orbital ledger.

The first mathematical object should be an effective corridor functional on nuclear positions, electron-envelope branch data, and local Noether sea response:

$$
\mathcal E_{\mathrm{mol}}
=
\mathcal E_{\mathrm{mol}}\!\left(
\{\mathbf R_A\},
\mathcal B_{e,1},\ldots,\mathcal B_{e,N},
\mathcal B_{\mathrm{bond}},
\mathcal{N}_{\mathrm{sea}}^{(\ell)}
\right)
$$

Equilibrium molecular geometry is the stationary branch

$$
\frac{\partial\mathcal E_{\mathrm{mol}}}{\partial R_A^i}=0,
\qquad
\mathcal H_{Ai,Bj}
=
\frac{\partial^2\mathcal E_{\mathrm{mol}}}{\partial R_A^i\partial R_B^j}
\succeq 0
$$

after removing overall translation and rotation modes. The Hessian $\mathcal H$ is the molecular analogue of the lattice dynamical matrix: its eigenvalues give the local vibrational stiffnesses, while its eigenvectors identify stretching, bending, and torsional response. This supplies a concrete way to test bond lengths and angles without importing an orbital-hybridization template as the cause.

For a stable molecule, the small-oscillation target is

$$
\omega_s^2\,\epsilon_{s,Ai}
=
\sum_{B,j}
\left(M^{-1}\right)_{Ai,Ck}
\mathcal H_{Ck,Bj}\,
\epsilon_{s,Bj}
$$

where $M$ is the observer-level mass-response matrix of the participating nuclei or molecular fragments. The normal-mode spectrum is therefore a validation surface for the same corridor, exclusion, and medium-response functional that fixes shape. A geometry fit fails if it recovers equilibrium angles only by using one functional while vibrational frequencies require an unrelated stiffness map.

## Closure Targets

A completed molecular-geometry derivation should recover, at minimum, the familiar qualitative sequence of linear, trigonal, tetrahedral, and bent arrangements from assembly geometry rather than imposing them as orbital templates. The first practical benchmark should be a small set of molecules whose standard geometries are sharply constrained: $\mathrm{H}_2$, $\mathrm{H}_2\mathrm{O}$, $\mathrm{CO}_2$, $\mathrm{NH}_3$, and $\mathrm{CH}_4$.

The immediate derivation target is therefore a corridor-plus-exclusion functional that predicts equilibrium bond length and angle for those cases while remaining compatible with [Atomic Spectra](atomic-spectra.md), [Condensed Matter](condensed-matter.md), and [Molecular Exclusion and Noether Sea Response](../spacetime/molecular-exclusion-and-noether-sea-response.md).

For spin-sensitive chemistry, the later derivation should recover singlet/triplet distinctions and bonding selection rules only after the atomic angular-momentum ledger and spin-statistics proof are available. Until then, this chapter should keep molecular geometry as a corridor-plus-exclusion closure target, not a foundation for spin or Pauli behavior.
