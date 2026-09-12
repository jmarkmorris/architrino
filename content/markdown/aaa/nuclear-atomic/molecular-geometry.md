# Molecular Geometry

This chapter is an exploratory mapping study for the Architrino Assembly Architecture, $\mathbb{A}\mathbb{A}\mathbb{A}$. Molecular geometry means the arrangement of atomic nuclei, described by bond lengths and angles. The proposed route starts with architrinos, point entities with fixed polarity and no primitive mass, whose earlier emissions form causal wakes. The [Master Equation](../dynamics/master-equation.md) uses those delayed path histories to determine acceleration in the fixed Euclidean void and absolute time. Atomic assemblies and the Noether sea, the proposed ambient population of neutral assemblies, belong to higher levels whose molecular response remains to be derived.

Observed molecules have repeatable shapes: water is bent, carbon dioxide is linear, and methane has four bond directions toward the vertices of a tetrahedron. Their bond lengths, angles, and vibration spectra are observer-level recovery targets. A bonding corridor here means a proposed region of coupled assembly and wake response linking atomic constituents; exclusion geometry describes restrictions on compatible occupancy, and phase compatibility describes the maintenance of relative timing between repeated motions. These are proposed mapping variables, not established molecular mechanisms.

The mapping hypothesis is that stable molecular arrangements correspond to bonding corridors that share wake structure, avoid incompatible exclusion, and maintain phase-compatible resonances in a local Noether sea response. Its claim grade is guessed. Once a common functional and its domain, parameters, and comparison tolerances are specified, a controlled mismatch with the declared geometry or vibration benchmarks rejects that candidate on that domain. An absent derivation leaves the proposal unresolved; failure of one candidate does not exclude every assembly-based account.

The proposed atomic constituents, resonance behavior, medium response, and exclusion geometry are discussed in [Atomic Structure](atomic-structure.md), [Atomic Spectra](atomic-spectra.md), [Condensed Matter](condensed-matter.md), and [Molecular Exclusion and Noether Sea Response](../spacetime/molecular-exclusion-and-noether-sea-response.md). Those interfaces do not establish a molecular branch.

Spin and Pauli language in this chapter is downstream of [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md) and [Fermi-Dirac and Bose-Einstein Statistics](../quantum/fermi-dirac-and-bose-einstein-statistics.md). Spin labels describe effective angular-momentum transformation and measurement behavior; Pauli exclusion restricts occupation of the same complete effective electron state, not all spatial overlap. Singlet/triplet labels distinguish total-spin sectors, selection rules specify allowed transitions or bonding channels, and orbital hybridization combines effective orbital descriptions into directional ones. These are recovery targets for the lower proof programs.

## Derivation Boundary

The master equation has not yet been shown to produce molecular shape. A successful derivation must combine the ingredients below without importing orbital templates as substrate causes.

## Framing

The mapping target is for molecular geometry to emerge, after the relevant effective atomic interface has been recovered, from coupled assembly variables, directional bonding corridors, and delayed path-history constraints that favor particular angular arrangements and bond lengths. The corpus does not yet derive this result from the master equation.

At the constituent level this points back to [Electron](../assemblies/fermions/electron.md) and [Nucleon Structure](nucleon-structure.md).

## Binding Corridors and Angle Selection

The exploratory molecular-bonding map proposes that, after effective atomic interfaces are recovered, a bond can be represented by a corridor in which assemblies lower their combined effective energy through shared wake structure, exclusion geometry, and local Noether sea response. The corridor need not exclude the Noether sea. In this proposed map, bond length and bond angle follow from simultaneous radial and angular equilibrium; neighboring corridors couple through exclusion cost and phase compatibility. The candidate must predict these observables from common $\mathbb{A}\mathbb{A}\mathbb{A}$ variables without inserting molecule-specific orbital, Pauli, or chemical templates.

A first useful decomposition is:

- **corridor attraction:** the energy decrease from shared wake and resonance structure,
- **exclusion cost:** the rise in energy when electron assemblies, nucleon envelopes, and their surrounding Noether sea response over-compress or demand incompatible branch occupancy,
- **phase compatibility:** the condition that coupled electron resonances remain stable over repeated cycles,
- **medium response:** the local Noether sea density, delay, and tensor-response contribution to corridor stiffness and shielding.

This decomposition can organize molecular shape before the spin proof is complete, but it cannot close molecular occupancy by itself. The exclusion-cost term must eventually inherit Pauli/statistics closure, while phase compatibility must eventually be connected to the completed atomic spin and orbital ledger.

The proposed mathematical object is an effective corridor energy functional, a scalar assigned to nuclear positions, electron-envelope branch data, bonding-corridor records, and local Noether sea response:

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

Here $\mathbf R_A$ is the position of nucleus $A$ in a declared effective molecular Cartesian chart, $\mathcal B_{e,n}$ is electron-envelope branch record $n$, and $N$ is the number of those records. An envelope summarizes the spatial response of a candidate electron assembly. There is one bonding-corridor record $\mathcal B_{\mathrm{bond},k}$ per bond represented on the selected candidate branch, with $K$ such records. The symbol $\mathcal{N}_{\mathrm{sea}}^{(\ell)}$ denotes the local Noether sea record at averaging resolution $\ell$. Assigning these arguments does not define the functional or prove that its gradient reproduces molecular response.

For the derivatives below, a smooth branch with fixed electronic state and bond connectivity must specify how electron, corridor, and medium variables respond to nuclear displacement at fixed external conditions. If those variables relax along the branch, write $\mathcal E_{\mathrm{mol}}$ for the resulting reduced function of nuclear positions and include their induced changes when differentiating it. Holding them fixed gives a different, frozen-response Hessian. A conservative reduction is an additional recovery assumption: the resulting restoring response must agree with the coarse-grained delayed dynamics. The [Energy](../dynamics/energy.md) and [Causal Action Functional](../dynamics/causal-action-functional.md) chapters do not license a molecular variational law merely by supplying scalar bookkeeping.

For a twice continuously differentiable reduced energy, a candidate local minimum must satisfy the necessary conditions

$$
\frac{\partial\mathcal E_{\mathrm{mol}}}{\partial R_A^i}=0,
\qquad
\mathcal H_{Ai,Bj}
=
\frac{\partial^2\mathcal E_{\mathrm{mol}}}{\partial R_A^i\partial R_B^j}
\succeq 0
$$

[View →](../../../../equation-mapping.html#corpus-equation-8af2343fe5f88db3)

Here $R_A^i$ is Cartesian component $i$ of nucleus $A$, and $\mathcal H$ is the Hessian, the matrix of second derivatives on the declared reduced branch. The symbol $\succeq0$ means that every displacement has nonnegative quadratic energy change. A positive definite Hessian, $\mathcal H\succ0$, on the internal displacement space is sufficient for a nondegenerate local minimum. A zero eigenvalue is inconclusive: for a scalar displacement $z$, the energies $z^4$ and $-z^4$ have the same zero gradient and Hessian at $z=0$ but a minimum and a maximum, respectively. Thus a declared soft mode, a direction with weak restoring response, does not by itself resolve stability. Nonlinear terms along zero modes must be examined. None of these energy tests proves stability under the full delayed dynamics without the conservative reduction.

Remove only actual rigid-motion symmetries of the effective energy. For an isolated molecule in a homogeneous isotropic environment, the nuclear Cartesian displacement space has three translational zero modes and either two rotational modes for a linear configuration or three for a nonlinear one. Rotation about the axis of a linear molecule leaves all its nuclear positions unchanged and adds no displacement mode. For $N_{\mathrm{nuc}}$ nuclei this leaves $3N_{\mathrm{nuc}}-5$ or $3N_{\mathrm{nuc}}-6$ internal modes, respectively. A fixed boundary, spatial gradient, or directional Noether sea response can lift these symmetries; the five- or six-mode subtraction then requires reconsideration.

The Hessian describes local energy stiffness in these coordinates. Its eigenvectors need not be physical vibration modes when inertial responses differ; those modes require the mass-response matrix below. Stretching changes bond lengths, bending changes bond angles, and torsion changes relative orientation around a bond.

A verified local minimum defines a candidate equilibrium geometry. Compare its bond lengths with equilibrium values $r_e$ and its angles with equilibrium angles in the same structural convention. The effective $r_0$ structure is inferred from ground-vibrational-state rotational constants; it is not generally the mean internuclear geometry. Predicting such readouts requires a declared vibrational state or ensemble, the measurement map, and the relevant vibration-rotation and anharmonic corrections. The harmonic Hessian alone supplies neither that state nor those corrections. Their effects must not be absorbed into fitted corridor stiffness as if they were stationary geometry.

After equilibrium and the response reduction have been established, the observer-level harmonic target for small oscillations is

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

Here $s$ labels a mode, $\omega_s$ is its angular frequency measured in effective observer time $t_{\mathrm{eff}}$, and $u_{s,Ai}$ is the displacement of nuclear component $Ai$ in that mode. The sums run over nuclei $B,C$ and Cartesian components $j,k$. The matrix $M$ is the observer-level nuclear mass response in the same coordinates and environment; it assigns no mass to primitive architrinos. This equation assumes that $M$ is real, symmetric, positive definite, and independent of frequency over the declared band, with dissipation and unresolved memory negligible at the stated accuracy. A fragment model needs its own reduced coordinates and projected operators.

Under these assumptions, $M^{-1/2}\mathcal H M^{-1/2}$ is symmetric and has the same eigenvalues as $M^{-1}\mathcal H$ by similarity through $M^{1/2}$. Its eigenvector is $M^{1/2}u_s$, not generally $u_s$. Remove rigid modes in this mass-weighted space or use the corresponding restricted generalized eigenproblem. Recovering this approximation, the mass response, and the clock conversion from absolute time remains a physical obligation. Significant delay, damping, or dispersion requires a response problem that retains those effects.

The normal-mode spectrum tests the same effective branch that fixes shape. A candidate is rejected if matched geometry and vibration benchmarks require incompatible stiffness maps or independently retuned mass responses outside its declared uncertainties. Harmonic frequencies must be compared with harmonic reference values or with measured spectral transitions after the required anharmonic and readout corrections.

## Closure Targets

A completed molecular-geometry derivation should recover linear, bent, trigonal-planar, trigonal-pyramidal, and tetrahedral arrangements from assembly geometry. In the trigonal cases, three bond directions lie in one plane or form a pyramid with the central atom. The proposed first benchmark set is $\mathrm{H}_2$, $\mathrm{H}_2\mathrm{O}$, $\mathrm{CO}_2$, $\mathrm{BF}_3$, $\mathrm{NH}_3$, and $\mathrm{CH}_4$. Each quantitative comparison must declare the isotopic composition, electronic and vibrational state, environment, structural convention, reference uncertainty, and model error tolerance. These specifications are not yet a completed benchmark dataset.

Within that set, a qualitative recovery target is the ordering of the rounded observer-level bond angles

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

from methane through ammonia to water; the central letter in each angle names its vertex atom. These rounded values illustrate the ordering and are not three precision equilibrium measurements under an established common convention. The corridor-plus-exclusion functional must recover the corresponding convention-matched pattern without inserting lone-pair or hybridization templates as substrate causes. A lone pair is an effective pair of electrons not assigned to a bond, not an added substrate ingredient.

Ethane adds a hindered-rotation target: relative rotation of its two methyl groups encounters a finite energy barrier. The full branch functional along a declared relaxed torsional path determines that barrier. The Hessian and mass response at a minimum determine only the local harmonic torsional frequency; local curvature does not fix the barrier without additional assumptions about the potential along the path. This separates a soft but restoring torsion from a freely rotating zero mode.

The immediate derivation target is therefore a corridor-plus-exclusion functional that predicts equilibrium bond length and angle for those cases while remaining compatible with [Atomic Spectra](atomic-spectra.md), [Condensed Matter](condensed-matter.md), and [Molecular Exclusion and Noether Sea Response](../spacetime/molecular-exclusion-and-noether-sea-response.md).

For spin-sensitive chemistry, the later derivation should recover singlet/triplet distinctions and bonding selection rules only after the atomic angular-momentum ledger and spin-statistics proof are available. Until then, this chapter should keep molecular geometry as a corridor-plus-exclusion closure target, not a foundation for spin or Pauli behavior.

## Source Notes

NIST's *Computational Chemistry Comparison and Benchmark Database*, Standard Reference Database 101, Release 22 (2022), supplies the observer-level geometry comparison in its entries for [methane](https://cccbdb.nist.gov/exp2x.asp?casno=74828&charge=0), [ammonia](https://cccbdb.nist.gov/exp2x.asp?casno=7664417&charge=0), and [water](https://cccbdb.nist.gov/exp2x.asp?casno=7732185&charge=0). Their tabulated angles support the rounded ordering above; each entry retains its own source and structural comments. NIST's [Essential Statistical Thermodynamics](https://cccbdb.nist.gov/thermox.asp) distinguishes harmonic, free-rotor, and hindered-rotor comparisons for ethane. These are effective comparison data and methods, not evidence for a molecular Architrino branch.

M. D. Harmony and colleagues, [*Molecular structures of gas-phase polyatomic molecules determined by spectroscopic methods*](https://doi.org/10.1063/1.555605), *Journal of Physical and Chemical Reference Data* 8, 619–722 (1979), distinguishes equilibrium, average, substitution, and effective structural parameters. That distinction governs the geometry readout; it does not provide the missing assembly-to-molecule derivation.
