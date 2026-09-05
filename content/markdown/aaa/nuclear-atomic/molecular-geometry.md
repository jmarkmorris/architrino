# Molecular Geometry

This chapter states the molecular-geometry closure target within the assembly framework: a molecular shape must arise from atomic assemblies, directional bonding corridors, exclusion geometry, phase compatibility, and local Noether sea response.

Start with the ordinary fact: molecules have repeatable shapes. Water is bent, carbon dioxide is linear, methane is tetrahedral, and those shapes come with repeatable bond lengths, bond angles, and vibration spectra. In $\mathbb{A}\mathbb{A}\mathbb{A}$, those patterns are not imported as orbital pictures that already explain themselves. They are targets that the assembly, corridor, exclusion, phase, and Noether sea response story has to recover.

A molecule finds a stable arrangement only when its bonding corridors can share wake structure, avoid incompatible exclusion, keep phase-compatible resonances, and sit in a local Noether sea response that does not tear the arrangement apart.

The required atomic constituents, resonance behavior, medium response, and exclusion geometry are developed in [Atomic Structure](atomic-structure.md), [Atomic Spectra](atomic-spectra.md), [Condensed Matter](condensed-matter.md), and [Molecular Exclusion and Noether Sea Response](../spacetime/molecular-exclusion-and-noether-sea-response.md).

Spin and Pauli language in this chapter is downstream of [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md) and [Fermi-Dirac and Bose-Einstein Statistics](../quantum/fermi-dirac-and-bose-einstein-statistics.md). Molecular singlet/triplet labels, bonding selection rules, electron-pair exclusion, and orbital-hybridization language should be treated as validation targets for those lower proofs, not as separate explanations.

## Derivation Boundary

The master equation has not yet been shown to produce molecular shape. A successful derivation must combine the ingredients below without importing orbital templates as substrate causes.

## Framing

Molecular geometry should emerge from the coupled equilibrium of atomic-scale assemblies, directional bonding corridors, and delayed path-history constraints that favor particular angular arrangements and bond lengths.

At the constituent level this points back to [Electron](../assemblies/fermions/electron.md) and [Nucleon Structure](nucleon-structure.md).

## Binding Corridors and Angle Selection

The molecular-bonding problem is not only an electron-sharing problem. In this framework, a bond is an effective corridor in which two or more atomic assemblies lower their combined energy by sharing wake structure, exclusion geometry, and local Noether sea response. The corridor is not a Noether-sea-free gap: the local Noether sea response is present around the electron assemblies, between electron assemblies and nuclei, and through the interstitial bonding region. Exclusion measures the cost of forcing phase-locked matter ledgers and their surrounding medium response into incompatible corridor, packing, or penetration states. Bond length is the radial equilibrium of that corridor; bond angle is the angular equilibrium after neighboring corridors compete for exclusion stress and phase compatibility.

A first useful decomposition is:

- **corridor attraction:** the energy decrease from shared wake and resonance structure,
- **exclusion cost:** the rise in energy when electron assemblies, nucleon envelopes, and their surrounding Noether sea response over-compress or demand incompatible branch occupancy,
- **phase compatibility:** the condition that coupled electron resonances remain stable over repeated cycles,
- **medium response:** the local Noether sea density, delay, and tensor-response contribution to corridor stiffness and shielding.

This decomposition can organize molecular shape before the spin proof is complete, but it cannot close molecular occupancy by itself. The exclusion-cost term must eventually inherit Pauli/statistics closure, while phase compatibility must eventually be connected to the completed atomic spin and orbital ledger.

The first mathematical object should be an effective corridor functional on nuclear positions, electron-envelope branch data, and local Noether sea response:

$$
\mathcal E_{\mathrm{mol}}
=
\mathcal E_{\mathrm{mol}}\!\left(
\{\mathbf R_A\},
\mathcal B_{e,1},\ldots,\mathcal B_{e,N},
\mathcal B_{\mathrm{bond},1},\ldots,\mathcal B_{\mathrm{bond},K},
\mathcal{N}_{\mathrm{sea}}^{(\ell)}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-8a8a41fe393b8ba9)

with one bonding-corridor record $\mathcal B_{\mathrm{bond},k}$ per realized bond.

Equilibrium molecular geometry is the stationary branch

$$
\frac{\partial\mathcal E_{\mathrm{mol}}}{\partial R_A^i}=0,
\qquad
\mathcal H_{Ai,Bj}
=
\frac{\partial^2\mathcal E_{\mathrm{mol}}}{\partial R_A^i\partial R_B^j}
\succeq 0
$$

[View →](../../../../equation-mapping.html#corpus-equation-8af2343fe5f88db3)

after removing overall translation and rotation modes: linear molecules reduce by five zero modes, nonlinear molecules by six. A rigid stable geometry requires $\mathcal H\succ0$ on the reduced space; the semidefinite boundary case is admitted only when a declared soft mode, such as a near-free torsion, remains. The Hessian $\mathcal H$ is the molecular analogue of the lattice dynamical matrix: its eigenvalues give the local vibrational stiffnesses, while its eigenvectors identify stretching, bending, and torsional response. This supplies a concrete way to test bond lengths and angles without importing an orbital-hybridization template as the cause.

The stationary solution defines the equilibrium geometry, so the first bond-length and bond-angle comparisons should use equilibrium values $r_e$. Vibrationally averaged values such as $r_0$ belong to the small-oscillation calculation below and must not be absorbed into the corridor stiffness as if they were the stationary geometry.

For a stable molecule, the small-oscillation target is

$$
\omega_s^2\,u_{s,Ai}
=
\sum_{C,k}
\sum_{B,j}
\left(M^{-1}\right)_{Ai,Ck}
\mathcal H_{Ck,Bj}\,
u_{s,Bj}
$$

[View →](../../../../equation-mapping.html#corpus-equation-fa2efe0a271db22d)

where $u_{s,Ai}$ are the displacement-eigenvector components of mode $s$ and $M$ is the observer-level mass-response matrix of the participating nuclei or molecular fragments. For numerical work the equivalent symmetric mass-weighted form $M^{-1/2}\mathcal H M^{-1/2}$ has the same eigenvalues. The normal-mode spectrum is therefore a validation surface for the same corridor, exclusion, and medium-response functional that fixes shape. A geometry fit fails if it recovers equilibrium angles only by using one functional while vibrational frequencies require an unrelated stiffness map.

## Closure Targets

A completed molecular-geometry derivation should recover, at minimum, the familiar qualitative sequence of linear, bent, trigonal-planar, trigonal-pyramidal, and tetrahedral arrangements from assembly geometry rather than imposing them as orbital templates. The first practical benchmark should be a small set of molecules whose standard geometries are sharply constrained: $\mathrm{H}_2$, $\mathrm{H}_2\mathrm{O}$, $\mathrm{CO}_2$, $\mathrm{BF}_3$, $\mathrm{NH}_3$, and $\mathrm{CH}_4$.

Within that set, the sharp qualitative success criterion is the monotone bond-angle compression

$$
\angle\mathrm{HCH}
\approx
109.5^\circ
>
\angle\mathrm{HNH}
\approx
107^\circ
>
\angle\mathrm{HOH}
\approx
104.5^\circ
$$

[View →](../../../../equation-mapping.html#corpus-equation-2602f15ed942ed30)

from methane through ammonia to water. The corridor-plus-exclusion functional must recover this pattern without inserting lone-pair or hybridization templates as substrate causes. Ethane adds the first soft-mode case: the same Hessian and branch functional should recover a finite hindered-rotation barrier and the associated torsional mode rather than classifying the motion as either perfectly rigid or freely rotating.

The immediate derivation target is therefore a corridor-plus-exclusion functional that predicts equilibrium bond length and angle for those cases while remaining compatible with [Atomic Spectra](atomic-spectra.md), [Condensed Matter](condensed-matter.md), and [Molecular Exclusion and Noether Sea Response](../spacetime/molecular-exclusion-and-noether-sea-response.md).

For spin-sensitive chemistry, the later derivation should recover singlet/triplet distinctions and bonding selection rules only after the atomic angular-momentum ledger and spin-statistics proof are available. Until then, this chapter should keep molecular geometry as a corridor-plus-exclusion closure target, not a foundation for spin or Pauli behavior.
