# Condensed Matter

This chapter is an exploratory mapping study for effective condensed-matter behavior in the Architrino Assembly Architecture, $\mathbb{A}\mathbb{A}\mathbb{A}$. Its proposed Noether sea transport map distinguishes reversible inertial response, resistance, and threshold behavior of matter in a coupled medium of neutral Noether braids. An [architrino](../foundations/architrino.md) is a point entity with polarity and a retained path history; its expanding causal wake contributes to other architrinos' acceleration through the [Master Equation](../dynamics/master-equation.md). A Noether braid is a candidate neutral assembly of such histories, and the [Noether sea](../spacetime/noether-sea.md) is their proposed ambient population. The transport map is not a completed derivation of atomic, molecular, or chemical behavior.

This note bridges [Atomic Structure](atomic-structure.md), [Particle Masses](../assemblies/particle-masses.md), [Noether Sea Pro/Anti Coupling](../spacetime/noether-sea-pro-anti-coupling.md), and [Molecular Exclusion and Noether Sea Response](../spacetime/molecular-exclusion-and-noether-sea-response.md), since all four depend on how the Noether sea stores stress and permits transport.

The transport account is a closure target rather than a finished derivation. Its residual and critical value must still be extracted from stable assembly dynamics, Noether sea constitutive response, and the relevant stability diagnostics.

## Noether Sea Transport

The exploratory transport hypothesis is not that ordinary matter feels a continuous dissipative drag from the Noether sea. In the proposed weak-regime map, a stable effective assembly would move by reversible retuning: its internal causal ledger and local Noether sea coupling deform, store stress, and return that stress without opening a net loss channel. This remains a mapping target; its falsifier is a controlled calculation in which the same retained record produces net loss below the declared threshold or cannot recover the effective transport benchmark.

### Transport Residual and Critical Surface

The useful diagnostic is a transport residual:

$$
\mathcal{R}_{\text{tr}}
=
\mathcal{R}_{\text{tr}}\!\left(
\mathbf{V}_{\text{cm}},
\mathbf{a}_{\text{cm}},
\rho_{\text{NS}},
\chi_{\text{sea}},
\mathcal{M}_{\text{sea}}^{ab},
\Delta_{\mathbf{k}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-f1e6b138902c1fde)

Here $\mathbf{V}_{\text{cm}}$ is assembly group velocity relative to the local sea flow, extracted from a declared response center in absolute time $T$, and $\mathbf{a}_{\text{cm}}=d\mathbf V_{\text{cm}}/dT$. The center-of-mass label does not assign mass weights to primitive architrinos; its observer interpretation requires the response-center map in [Particle Masses](../assemblies/particle-masses.md). The number density $\rho_{\text{NS}}$, delay factor $\chi_{\text{sea}}=c_f/c_{\text{eff}}$, and tensor $\mathcal{M}_{\text{sea}}^{ab}$ describe the same medium record. The assembly non-symmetry Floquet gap $\Delta_{\mathbf{k}}$ measures separation of the non-neutral return-map modes from the declared stability boundary, when a periodic retained branch and its certificate supply that quantity. It is unrelated to the Bloch wavevector $\mathbf k$ used later. This argument list proposes a diagnostic; its norm, units, history window, sufficiency, and constitutive form remain to be derived.

The proposed critical level set is

$$
\mathcal{R}_{\text{tr}}
=
\mathcal{R}_{\text{tr},*}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f45f41d4bdc27fc0)

The following classification is a hypothesis to test after the residual, its orientation, and its critical value have been independently specified. A level set is a regular surface only where the residual is differentiable with nonzero gradient; neither regularity nor the classification follows from naming the residual.

| Regime | Meaning |
| --- | --- |
| $\mathcal{R}_{\text{tr}} < \mathcal{R}_{\text{tr},*}$ | Proposed reversible regime after material scattering, driving, and boundary exchanges have been separated. |
| $\mathcal{R}_{\text{tr}}\approx\mathcal{R}_{\text{tr},*}$ | Candidate onset region, with a declared comparison tolerance. |
| $\mathcal{R}_{\text{tr}} > \mathcal{R}_{\text{tr},*}$ | Candidate excitation or transition regime; the actual outgoing channel must be established from the record. |

### Reversible Response Below Threshold

Below the critical surface, the response belongs to the mass and inertia program rather than to a friction law. The closure target is that the assembly's shielded internal ledger contributes an internal momentum response of the form

$$
p_{\text{int}}^a
\approx
\alpha_{\mathrm{m}}\,\zeta(A)E_{\text{internal}}(A)\,
\mathcal{M}_{\text{sea}}^{ab}V_{\text{cm},b}
$$

[View →](../../../../equation-mapping.html#corpus-equation-20365054f2b08d21)

This is a small-group-velocity response ansatz, not an established momentum law. The assembly label $A$, positive calibration $\alpha_{\mathrm m}$, probe-facing exposure fraction $\zeta(A)$, and candidate internal energy $E_{\text{internal}}(A)$ inherit the reference level, energy units, and separation from sea-coupled energy in [Particle Masses](../assemblies/particle-masses.md). The no-drag target concerns uniform unforced transport on the declared branch. Internal binding alone does not exclude loss of translational energy or exchange with a driven medium.

The algebraic reason for this distinction is that the reversible kinetic scalar can consume only the symmetric part of the medium-response tensor. Decompose

$$
\mathcal{M}_{\text{sea}}^{ab}
=
\mathcal{M}_{+}^{ab}
+
\mathcal{M}_{-}^{ab},
\qquad
\mathcal{M}_{+}^{ab}
=
\frac{1}{2}
\left(
\mathcal{M}_{\text{sea}}^{ab}
+
\mathcal{M}_{\text{sea}}^{ba}
\right),
\qquad
\mathcal{M}_{-}^{ab}
=
\frac{1}{2}
\left(
\mathcal{M}_{\text{sea}}^{ab}
-
\mathcal{M}_{\text{sea}}^{ba}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-ee1f858bd8d144c9)

For fixed assembly and medium data, take a real, velocity-independent response tensor in a Euclidean orthonormal frame, with repeated spatial indices summed. The candidate reversible energy is the quadratic form

$$
K_{\mathrm{rev}}
=
\frac{1}{2}\alpha_{\mathrm{m}}\zeta(A)E_{\text{internal}}(A)\,
V_{\text{cm},a}\mathcal{M}_{+}^{ab}V_{\text{cm},b},
\qquad
p_{\mathrm{rev}}^{a}
=
\frac{\partial K_{\mathrm{rev}}}{\partial V_{\text{cm},a}}
=
\alpha_{\mathrm{m}}\zeta(A)E_{\text{internal}}(A)\,
\mathcal{M}_{+}^{ab}V_{\text{cm},b}
$$

[View →](../../../../equation-mapping.html#corpus-equation-ea7571efc9fc9808)

The stated derivative holds with the prefactor and tensor held fixed; velocity-dependent coefficients contribute additional derivatives. A positive kinetic-energy interpretation further requires the prefactor times $\mathcal M_+$ to be positive definite on the admitted velocity directions. Neither requirement is a stability proof. The antisymmetric part drops out of the scalar energy because

$$
V_{\text{cm},a}\mathcal{M}_{-}^{ab}V_{\text{cm},b}=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-f45d9b5503a1757b)

but it need not vanish from the proposed momentum response. Define its antisymmetric, or gyroscopic, contribution by

$$
p_{\mathrm{gyro}}^{a}
=
\alpha_{\mathrm{m}}\zeta(A)E_{\text{internal}}(A)\,
\mathcal{M}_{-}^{ab}V_{\text{cm},b},
\qquad
V_{\text{cm},a}p_{\mathrm{gyro}}^{a}=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-bae59a54faf4b03e)

This orthogonality proves that $p_{\mathrm{gyro}}^a$ cannot be folded into the scalar quadratic energy or scalar mass. It does not by itself prove zero power during acceleration. Even when the prefactor and $\mathcal M_-^{ab}$ are stationary,

$$
\mathcal P_{\mathrm{gyro}}
\equiv
V_{\text{cm},a}\frac{d p_{\mathrm{gyro}}^a}{dT}
=
\alpha_{\mathrm{m}}\zeta(A)E_{\text{internal}}(A)\,
V_{\text{cm},a}\mathcal M_-^{ab}
\frac{dV_{\text{cm},b}}{dT},
$$

[View →](../../../../equation-mapping.html#corpus-equation-f5b74ab212e2f758)

which need not vanish. Over a closed path $C_V$ in velocity space,

$$
\Delta E_{\mathrm{gyro}}[C_V]
=
\oint_{C_V}V_{\text{cm},a}\,d p_{\mathrm{gyro}}^a
$$

[View →](../../../../equation-mapping.html#corpus-equation-cded86daf17ca75b)

may therefore be nonzero even when the velocity returns to its initial value. A reversible interpretation requires a derived exchange with the material-orientation or Noether sea circulation account and recovery of the full state on the relevant cycle. An unreturned coherent excitation is stored energy, not automatically heat; dissipation requires an identified loss or thermalization channel in the declared reduced description.

A sufficient acceleration-level form for preserving Euclidean speed instantaneously is

$$
A_{\mathrm{gyro}}^a
=
\mathcal G^{ab}V_{\text{cm},b},
\qquad
\mathcal G^{ab}=-\mathcal G^{ba},
\qquad
V_{\text{cm},a}A_{\mathrm{gyro}}^a=0.
$$

[View →](../../../../equation-mapping.html#corpus-equation-a14da50e76e59777)

This contribution changes direction without changing $V_{\text{cm}}^2$ at that instant. It is workless for a stationary isotropic quadratic energy, but not for an arbitrary anisotropic $\mathcal M_+$: the latter requires $V_{\text{cm},a}\mathcal M_+^{ab}A_{\mathrm{gyro},b}=0$. Changes in the energy coefficients add further exchange terms. The momentum-response and acceleration-response forms are not interchangeable without the constitutive map relating $\mathcal M_-^{ab}$, $\mathcal G^{ab}$, and the medium exchange account.

Thus the directional inertial readout below threshold is

$$
m_{\mathrm{eff}}(\hat v;A,\theta_{\mathrm{sea}})
=
\alpha_{\mathrm{m}}\zeta(A)E_{\text{internal}}(A)\,
\hat v_a\mathcal{M}_{+}^{ab}(\theta_{\mathrm{sea}})\hat v_b
$$

[View →](../../../../equation-mapping.html#corpus-equation-a3830ba90fdb2d71)

Here $\hat v$ is a unit direction and $\theta_{\mathrm{sea}}$ denotes the retained medium state. The weak isotropic convention $\mathcal{M}_{\text{sea}}^{ab}\to\delta^{ab}/c_{\text{eff}}^2$ gives the roadmap scalar $\alpha_{\mathrm{m}}\zeta(A)E_{\text{internal}}(A)/c_{\text{eff}}^2$ of [Particle Masses](../assemblies/particle-masses.md), with the tensor carrying inverse-speed-squared units. The symmetric/antisymmetric identities are derived algebra under the stated assumptions; the physical response tensors, energy assignment, and no-drag regime remain constitutive proposals. An antisymmetric momentum term needs a consistent full-cycle exchange account. A workless acceleration must be tested against the actual energy metric, and any loss must be assigned to a resolved material, medium, radiation, or boundary channel.

## Lattice and Band-Response Recovery

The first standard condensed-matter recovery target is not a new substrate ontology. It is the observer-level band description that must emerge when electron assemblies move through a periodic material branch. Fix a material branch $\mathcal B_{\mathrm{lat}}$ with primitive lattice vectors $\mathbf a_i$, reciprocal vectors $\mathbf b_i$ satisfying

$$
\mathbf a_i\cdot\mathbf b_j=2\pi\delta_{ij}
$$

[View →](../../../../equation-mapping.html#corpus-equation-0749c651c4d38bdd)

and a Brillouin zone $\mathrm{BZ}$ given by the Wigner-Seitz cell of the reciprocal lattice. The effective electron-envelope states should admit a Bloch-form recovery

$$
\psi_{\alpha\mathbf k}(\mathbf x_{\mathrm{eff}})
=
e^{i\mathbf k\cdot\mathbf x_{\mathrm{eff}}}
u_{\alpha\mathbf k}(\mathbf x_{\mathrm{eff}}),
\qquad
u_{\alpha\mathbf k}(\mathbf x_{\mathrm{eff}}+\mathbf R)=u_{\alpha\mathbf k}(\mathbf x_{\mathrm{eff}}),
\qquad
\mathbf R\in\Lambda
$$

[View →](../../../../equation-mapping.html#corpus-equation-8754efcd4b0fb4ef)

with $\mathbf k$ identified modulo reciprocal-lattice vectors, $\Lambda$ the direct Bravais lattice generated by the $\mathbf a_i$, and $\Lambda^*$ its reciprocal lattice. The band index is $\alpha$, and $u_{\alpha\mathbf k}$ is the cell-periodic part of the effective envelope. The coordinates $\mathbf x_{\mathrm{eff}}$ and time $t_{\mathrm{eff}}$ belong to an effective material chart; its map from $(T,\mathbf X)$ remains owed. Bloch form requires an effective linear spectral problem invariant under lattice translations. A periodic arrangement alone does not derive that spectral problem from delayed architrino dynamics.

The corresponding band residual should compare the recovered dispersion $E_\alpha(\mathbf k)$ to the observed material branch without fitting a separate rule for each probe:

$$
\mathcal R_{\mathrm{band}}
=
\mathcal R_{\mathrm{band}}\!\left(
E_\alpha(\mathbf k),
\mathcal B_e,
\mathcal B_{\mathrm{lat}},
\rho_{\text{NS}},
n,
\chi_{\text{sea}},
\mathcal M_{\text{sea}}^{ab}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-3543ddb5c3c0994e)

Near a non-degenerate band extremum, the effective mass tensor is the required local curvature object,

$$
\left(m_{\alpha,*}^{-1}\right)^{ij}
=
\frac{1}{\hbar^2}
\frac{\partial^2 E_\alpha}{\partial k_i\partial k_j}
$$

[View →](../../../../equation-mapping.html#corpus-equation-0cce5aa29136cf0e)

This is a local curvature readout of a twice-differentiable isolated band, with $\hbar$ the reduced observer-level action quantum. It need not be positive: a band maximum has negative curvature and is conventionally described through holes. Its relation to assembly inertia is a recovery obligation; no primitive architrino mass or equality with the medium-response tensor follows.

The Fermi-surface target is likewise a recovery target. For a chemical potential $\mu$,

$$
\mathcal F_{\alpha}
=
\left\{
\mathbf k\in\mathrm{BZ}:
E_\alpha(\mathbf k)=\mu
\right\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-0d3160ceecccadfa)

In the zero-temperature independent-band comparison, a partially filled dispersive band with accessible states on both sides of $\mu$ supplies the usual metallic response in the thermodynamic limit. A nonempty level set alone is insufficient: it can be an isolated band-edge point or a flat band without the assumed transport response. Band-insulator branches have filled bands separated from empty bands by a positive gap,

$$
\Delta_{\mathrm{band}}
=
\min_{\alpha\in\mathrm{empty},\,\beta\in\mathrm{filled},\,\mathbf k,\mathbf k'}
\left[
E_\alpha(\mathbf k)-E_\beta(\mathbf k')
\right]
>
0
$$

[View →](../../../../equation-mapping.html#corpus-equation-12d57e2d9a64aa49)

Semiconductor, Mott-insulator, and topological-insulator comparisons refine this classification. Mott behavior requires an interaction-driven charge gap beyond independent-band filling; suppressing double occupancy alone does not establish an insulating phase. Topological classification requires a defined occupied-state bundle and its protecting symmetries or invariant. Its momentum-space Berry connection describes changes of band basis and is distinct from the real-space electromagnetic connection; their relation in electromagnetic response must be derived.

In the ideal static, noninteracting periodic comparison, coherent Bloch evolution has no scattering relaxation term. Periodicity alone does not exclude current relaxation in an interacting material: momentum transfer to the lattice, including Umklapp processes that change crystal momentum by a reciprocal vector, can matter. The relaxation time $\tau_{\mathrm{rel}}$ must be derived from the admitted collision and boundary channels. For one isotropic carrier channel, the observer-level Drude comparison is

$$
\sigma
=
\frac{e^2\tau_{\mathrm{rel}} n_{\mathrm{car}}}{m_*}
$$

[View →](../../../../equation-mapping.html#corpus-equation-429648e1cef4b658)

where $e>0$ is the elementary-charge magnitude, $n_{\mathrm{car}}$ the carrier number density, and $m_*>0$ the channel's effective mass. Only when all current-relaxing channels vanish does $\tau_{\mathrm{rel}}^{-1}\to0$; the resulting ballistic limit does not supply a finite steady dissipative conductivity. Material resistance and the proposed Noether sea no-drag condition are separate tests.

## Lattice Scattering and Phonon Response

The scattering target should recover reciprocal-lattice selectivity before interpreting diffraction data. For incident and outgoing wavevectors $\mathbf k$ and $\mathbf k'$, let $\mathbf q=\mathbf k-\mathbf k'$. In the infinite, perfectly periodic kinematic-scattering limit, coherent elastic Bragg peaks lie on reciprocal-lattice transfers,

$$
\mathbf q\in\Lambda^*
$$

[View →](../../../../equation-mapping.html#corpus-equation-7244db1c04aa44fa)

with basis dependence carried by a structure factor

$$
S(\mathbf q)
=
\sum_i f_i(\mathbf q)e^{i\mathbf q\cdot\mathbf d_i}
$$

[View →](../../../../equation-mapping.html#corpus-equation-41ba897b02d5c97a)

The residual

$$
\mathcal R_{\mathrm{diff}}
=
\mathcal R_{\mathrm{diff}}\!\left(
\{\mathbf q_{\mathrm{obs}}\},
\Lambda^*,
S(\mathbf q),
\mathcal B_{\mathrm{lat}},
\Theta_E^{(\ell)}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-8926a2ad442dba57)

tests whether the declared lattice branch, basis, and atom-local Noether sea response reproduce the selection rule. The basis positions are $\mathbf d_i$ and their scattering amplitudes are $f_i(\mathbf q)$; a zero structure factor extinguishes an otherwise allowed reflection. Finite samples broaden peaks and disorder or motion can produce diffuse or inelastic scattering away from reciprocal points. A Debye-Waller factor describes coherent-intensity reduction at fixed mean lattice geometry; thermal expansion can shift peak locations by changing that geometry.

Phonons are effective collective lattice modes. After the same material configuration satisfies its equilibrium equations, expand its effective dynamics to harmonic order in displacements $\mathbf u_n(t_{\mathrm{eff}})$. A mass-normalized dynamical matrix $D_{ij}(\mathbf k)$ then defines the comparison eigenproblem:

$$
\omega_s^2(\mathbf k)\,e_{s,i}(\mathbf k)
=
D_{ij}(\mathbf k)e_{s,j}(\mathbf k)
$$

[View →](../../../../equation-mapping.html#corpus-equation-6f127603d0fb4b14)

with $\omega_s$ the mode angular frequency and $e_{s,i}$ its polarization. For a multi-atom cell, $i,j$ combine basis-site and spatial-component indices. In the conservative harmonic comparison, a Hermitian nonnegative dynamical matrix gives real nonnegative squared frequencies after the relevant symmetry modes are identified. This effective spectrum neither proves native equilibrium nor certifies an assembly Floquet gap.

In a homogeneous, long-wavelength isotropic elastic limit, the same branch should reduce to a displacement field $u_i(\mathbf x_{\mathrm{eff}},t_{\mathrm{eff}})$. The strain is

$$
u_{ij}
=
\frac{1}{2}
\left(
\frac{\partial u_i}{\partial x_{\mathrm{eff}}^j}
+
\frac{\partial u_j}{\partial x_{\mathrm{eff}}^i}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-356ed2aea8331094)

and elastic action

$$
S_{\mathrm{el}}
=
\int dt_{\mathrm{eff}}\,d^3x_{\mathrm{eff}}
\left[
\frac{\rho_{\mathrm{mat}}}{2}
\left(
\frac{\partial u_i}{\partial t_{\mathrm{eff}}}
\right)^2
-
\mu_{\mathrm{el}} u_{ij}u_{ij}
-
\frac{\lambda_{\mathrm{el}}}{2}u_{ii}u_{jj}
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-04de828484fba635)

Here $\rho_{\mathrm{mat}}>0$ is effective material mass density, and $\mu_{\mathrm{el}}$ and $\lambda_{\mathrm{el}}$ are its Lamé elastic coefficients. Positive isotropic strain energy requires $\mu_{\mathrm{el}}>0$ and $3\lambda_{\mathrm{el}}+2\mu_{\mathrm{el}}>0$. Variation of this assumed effective action gives the acoustic comparison

$$
\omega_{\mathrm L}^2
=
\frac{2\mu_{\mathrm{el}}+\lambda_{\mathrm{el}}}{\rho_{\mathrm{mat}}}k^2,
\qquad
\omega_{\mathrm T}^2
=
\frac{\mu_{\mathrm{el}}}{\rho_{\mathrm{mat}}}k^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-08e361307cf0b9f7)

for longitudinal and transverse modes in the low-$k$ limit. Optical phonons require a multi-atom basis and a nonzero branch frequency as $\mathbf k\to0$. These modes are effective collective excitations of the material branch; they are not new primitive particles in the ontology.

This gives a sharper transport accounting rule. If a material event excites a phonon, the energy ledger must record it as a lattice-branch update:

$$
\Delta E_{\mathrm{lat}}
=
V\sum_s\int_{\mathrm{BZ}}
\frac{d^3k}{(2\pi)^3}
\hbar\omega_s(\mathbf k)\,
\Delta N_s(\mathbf k)
$$

[View →](../../../../equation-mapping.html#corpus-equation-0a04478195f31bed)

where $V$ is crystal volume and $\Delta N_s$ is the dimensionless per-mode occupation change at fixed harmonic frequencies. Changes in the frequencies or background energy require additional terms. A no-phonon elastic event has $\Delta N_s=0$ and routes momentum through the whole branch or boundary record. Coherent phonon excitation can have nonzero $\Delta N_s$ without being thermalized heat, so phonon creation alone is not a dissipation criterion.

## Order-Parameter Defects and Critical Transport

Defect and vortex language is useful only when a material branch supplies an effective order-parameter record. Let
$$
Q:\Omega\setminus D\longrightarrow\mathcal{Q}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f28384fbdf809f56)

be a continuous observer-level order-parameter map on a material region $\Omega$ away from the defect set $D$, with target space $\mathcal{Q}$. An order parameter records local material order, such as a phase where its amplitude is nonzero. A closed loop $\gamma$ avoiding $D$ may carry a homotopy label, the class unchanged by continuous deformation within that target space:
$$
\mathcal{I}_\gamma
=
\left[Q|_\gamma\right]\in\pi_1(\mathcal{Q})
$$

[View →](../../../../equation-mapping.html#corpus-equation-ad2007bf49b5e07f)

read up to conjugacy when $\pi_1(\mathcal{Q})$ is non-abelian, since a free loop fixes only a conjugacy class, or, in a phase-like branch,
$$
\nu_\gamma
=
\frac{1}{2\pi}\oint_\gamma d\varphi
\in\mathbb Z
$$

[View →](../../../../equation-mapping.html#corpus-equation-91e5a7da1acb8027)

These are recovery or comparison objects. They do not replace the architrino, causal-wake, or Noether sea branch records that must generate the effective material description.

Homotopy invariance follows when $Q$ stays continuous and defined on the tracked loop throughout the deformation, the target space remains fixed, and no defect crosses the loop or its tracking boundary. For the proposed transport map, one can require
$$
\Delta_{\mathbf{k}}>0
\quad\Longrightarrow\quad
\Delta\mathcal{I}_\gamma=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-5a29e240f1fbea66)

only for perturbations already shown to preserve those homotopy conditions. Here $\Delta\mathcal I_\gamma=0$ means equality of classes, not subtraction in a possibly non-abelian group. An assembly Floquet gap does not establish that a material order parameter remains defined. The proposed diagnostic implication
$$
\Delta\mathcal{I}_\gamma\ne0
\quad\Longrightarrow\quad
\Delta_{\mathbf{k}}\to0
\quad\text{or}\quad
\mathcal{R}_{\text{tr}}\ge\mathcal{R}_{\text{tr},*}
$$

[View →](../../../../equation-mapping.html#corpus-equation-47b7f6e464fe79fc)

therefore needs a separate relation between assembly stability, order-parameter singularities, and transport. A defect can cross a measurement loop through boundary transport without a bulk gap closing; edge modes can already exist on a fixed gapped branch. Such events require an explicit boundary or excitation account and cannot be assigned a universal scalar threshold from topology alone.

## Hall and Topological Response Benchmarks

Hall response compares longitudinal resistance with transverse response. Adopt $E_i=\rho_{ij}j_j$, $j_i=\sigma_{ij}E_j$, and $\boldsymbol\sigma=\boldsymbol\rho^{-1}$ in an oriented material plane. For one isotropic electron channel of charge $-e$ in a perpendicular signed field $B$, the classical comparison is

$$
\rho_{xy}
=
\frac{B}{n_{\mathrm{car}}e},
\qquad
\rho_{xx}
=
\frac{m_*}{n_{\mathrm{car}}e^2\tau_{\mathrm{rel}}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-13c92fa67d65752b)

Here $\rho_{yx}=-\rho_{xy}$; matrix inversion gives $\sigma_{xy}=-\rho_{xy}/(\rho_{xx}^2+\rho_{xy}^2)$ in this isotropic convention. For a sheet, use areal carrier density and sheet resistance/conductance throughout; for a bulk sample, use volumetric density and bulk units. The effective magnetic-state map remains to be derived from the photon/action ledger and material branch; the Lorentz-force form is an observer-level recovery target.

For the integer quantum Hall band comparison, require a two-dimensional effective spectral problem, a fixed occupied subspace separated by a bulk gap, zero-temperature linear response for exact quantization, and consistent current and orientation conventions. Low but nonzero temperature gives an approximation whose corrections must be controlled. Its target is

$$
\sigma_{xy}
=
\frac{e^2}{2\pi\hbar}\,C,
\qquad
C\in\mathbb Z
$$

[View →](../../../../equation-mapping.html#corpus-equation-c88fc143217cb216)

where $C=C_{\mathrm{filled}}$ is the signed first Chern number of the occupied bundle in the convention

$$
C
=
-
\frac{1}{2\pi}
\int_{\mathrm{BZ}}F_{xy}(\mathbf k)\,d^2k,
\qquad
F_{xy}
=
\frac{\partial A_y}{\partial k_x}
-
\frac{\partial A_x}{\partial k_y}
$$

[View →](../../../../equation-mapping.html#corpus-equation-ae35dcfd1eb9ce3f)

Here $A_i(\mathbf k)=-i\langle u_{\mathbf k}|\partial_{k_i}u_{\mathbf k}\rangle$ is the Berry connection for a normalized occupied state on a local momentum-space patch. Multiple isolated occupied bands require summing their curvatures; for a degenerate occupied subspace use the trace of its bundle curvature. Nonzero $C$ requires compatible patches rather than one globally smooth periodic eigenvector, whose exact curvature would integrate to zero on the Brillouin torus. The minus sign defines $C$ for the stated Berry and conductivity conventions; reversing an orientation or connection convention requires translating the signs together. This momentum-space connection is not itself a primitive wake or the real-space electromagnetic potential.

For a continuous family on the same compact Brillouin torus, with fixed-rank occupied projectors and the bulk spectral gap $\Delta_{\mathrm{top}}$ open throughout, integer-valued continuity gives

$$
\Delta_{\mathrm{top}}>0
\quad\Longrightarrow\quad
\delta C=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-0bb6b552ca638c2c)

Disordered systems need a mobility-gap or real-space formulation when Bloch momentum is unavailable; the clean Brillouin-zone formula cannot simply be reused. A compact comparison score is

$$
\mathcal R_{\mathrm{QH}}
=
\left|
\frac{2\pi\hbar}{e^2}\sigma_{xy}
-
C_{\mathrm{filled}}
\right|
+
\frac{\rho_{xx}}{\rho_{xx}^{\mathrm{tol}}}
+
\frac{\max(0,-\Delta_{\mathrm{top}})}{\Delta_{\mathrm{top}}^{\mathrm{tol}}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-29c80575bd6a49a0)

Both tolerance denominators are positive, $\rho_{xx}$ is the passive longitudinal sheet resistance, and the first term compares signed sheet conductivity with the same $C_{\mathrm{filled}}$. This score does not certify a gap: its last term is zero even at $\Delta_{\mathrm{top}}=0$. Acceptance separately requires a resolved positive gap margin, the occupied-bundle hypotheses, and the declared conductivity tolerance.

Fractional quantum Hall states, anyons, non-Abelian edge sectors, Chern-Simons effective actions, and chiral boundary liquids are valuable comparison material, but they should stay in the recovery/comparison bucket unless a local $\mathbb{A}\mathbb{A}\mathbb{A}$ closure target consumes them directly. The safe present requirement is narrower: recover quantized Hall response, edge robustness, fractional charge/statistics as observer-level collective behavior where experimentally required, and keep every topological field description downstream of the effective material branch rather than treating it as substrate ontology.

### Superconducting Response Benchmark

Superconductivity tests persistent current and vanishing longitudinal resistance together with magnetic expulsion, distinguishing it from an ideal normal-metal conductor. Temperature, current, magnetic loading, pinning, and material defects define branch-specific limits; a defect or a change of magnetic loading does not necessarily destroy superconductivity. Any dissipative response requires an identified material or medium channel.

The magnetic comparison has two coupled requirements. The same effective U(1) material connection must recover the Meissner response in the applicable branch and the conventional paired-branch flux quantum

$$
\Phi_0
=
\frac{h}{2e}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7c77191a24746bb2)

as an observer-level benchmark, with $h=2\pi\hbar$. In a paired condensate, single-valued phase constrains the fluxoid, which includes a circulating-current contribution; magnetic flux alone approaches integer multiples of $\Phi_0$ when that contribution vanishes on the chosen contour. The factor $2e$ tests effective paired charge and does not by itself prove exchange statistics or one universal pairing mechanism. Type-II materials admit flux-carrying vortices; their motion needs a resolved response account, and only its dissipative component constitutes longitudinal resistive loss.

A minimal same-record residual may be organized as

$$
\mathcal R_{\mathrm{sc}}
=
\mathcal R_{\rho_{xx}\to0}
+
\mathcal R_{\mathrm{Meissner}}
+
\mathcal R_{\Phi_0}
+
\mathcal R_{\mathrm{pair}}
+
\mathcal R_{\mathrm{crit}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-64671ac2c4f51c5a)

where the five entries test zero longitudinal resistance, magnetic expulsion, flux quantization, paired-branch statistics, and the declared critical surface. The benchmark fails if these observables require unrelated material maps or if a persistent current loses energy below threshold without a logged disturbance.

### Photon-Coupled Surface Transport

Photon absorption, reflection, and surface heating test channel-dependent material response. Their rates and thresholds do not follow from the transport residual's name. The proposed [photon](../assemblies/bosons/electroweak-bosons.md) carrier is a coaxial contra-rotating polarity-conjugate planar pair, whose retained existence and transition dynamics remain open. A surface cell's electron-envelope, bonding or lattice, nuclear, and sea records must determine its coupling. Continuous illumination can transfer momentum and cause radiation pressure or radiation drag; the no-drag target for unforced translation does not prohibit this driven exchange.

This surface-transport language is not a hidden particle-production rule. If a photon-coupled material event yields different outgoing Standard Model assemblies, the local reaction record must add a separate identity-routing row for the target or Noether sea content that supplies those inventories.

A compact surface residual can be treated as a specialization of the transport residual:

$$
\mathcal R_{\mathrm{surf}}
=
\mathcal R_{\mathrm{surf}}\!\left(
a_{\perp},
\mathcal B_e,
\mathcal B_{\mathrm{lat}},
\Theta_E^{(\ell)},
\mathcal M_{\text{sea}}^{ab},
\Delta_{\mathbf{k}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-5071023c2a21c6f1)

where $a_{\perp}$ denotes the proposed incoming photon's transverse accounting data, $\mathcal B_e$ the electron-envelope branch, $\mathcal B_{\mathrm{lat}}$ the material branch, and $\Theta_E^{(\ell)}$ the local medium response averaged on scale $\ell$. The tensor $\mathcal M_{\text{sea}}^{ab}$ and assembly gap $\Delta_{\mathbf{k}}$ retain their earlier meanings. A coherent stored excitation is distinct from thermalized heating, and both must be separated from escaping radiation and boundary transfer.

For one declared event window and energy reference, the proposed energy balance is

$$
E_{\gamma,\mathrm{in}}
=
E_{\gamma,\mathrm{out}}
+
\Delta E_{e\text{-env}}
+
\Delta E_{\mathrm{lat}}
+
\Delta E_{\mathrm{sea}}
+
\Delta E_{\mathrm{recoil}}
+
\Delta E_{\mathrm{rem}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-204583549c087acb)

The outgoing photon energy includes every outgoing photon within the event's declared accounting boundary; the increments partition electron-envelope, lattice, sea, recoil, and remaining stored or exported energy without overlap. This is a balance target, not a derived conservation theorem. A reflecting metal and a strongly absorbing surface select different channel weights according to frequency, angle, material, and geometry; metallicity alone does not fix reflectivity. Delayed thermal emission remains outgoing energy when the window includes it. Ordinary optical routing keeps nuclear charge number $Z$ and mass number $A$ fixed unless a separate nuclear reaction is established.

### Earth-Core Iron as a Boundary Case

Earth-core iron is a useful correction case because it separates three levels that are easy to collapse. In standard geophysics and nucleosynthesis, most iron in Earth formed before Earth accreted, then became incorporated during accretion and segregated into the core during planetary differentiation. The high pressure and temperature of the core stabilize metallic phases and alter transport, electronic, and elastic response. They do not, by themselves, create iron nuclei.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ reinterpretation should therefore treat Earth-core iron as density sorting, metallic phase response, Noether sea strain, local clock and transport modification, and possible branch-preserving retuning of already existing iron assemblies. It should not treat the core as an iron-nucleus production site unless a separate reaction-provenance mechanism is derived. A compact guardrail is

$$
\partial_{t_{\mathrm{eff}}} \mathcal{N}_{\mathrm{Fe}}
+
\nabla_{\mathrm{eff}}\cdot\mathbf{J}_{\mathrm{Fe}}
=
S_{\mathrm{Fe}}^{\mathrm{nuc}},
\qquad
S_{\mathrm{Fe}}^{\mathrm{nuc}}=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-65cf91c16a6adc5a)

for an effective description restricted to ordinary differentiation without iron-producing or iron-consuming nuclear reactions. Here $\mathcal{N}_{\mathrm{Fe}}$ is iron-nucleus number density and $\mathbf{J}_{\mathrm{Fe}}$ its total number flux, including advection when present. A nonzero $S_{\mathrm{Fe}}^{\mathrm{nuc}}$ requires explicit reactant/product inventories and charge, energy, momentum, and medium provenance. Proton and neutron counts must be tracked but need not be separately conserved in weak reactions; [BBN Constraints](../cosmology/BBN-constraints.md) and [Nuclear Binding](nuclear-binding.md) own the reaction comparison.

In an isothermal, diffusion-only effective approximation, a candidate constitutive number flux is

$$
\mathbf{J}_{\mathrm{Fe}}
=
-D_{\mathrm{Fe}}\nabla_{\mathrm{eff}}\!\left[
\mu_{\mathrm{Fe}}(P,T_{\mathrm{temp}},\theta_{\mathrm{sea}})
+
M_{\mathrm{sh}}(\mathrm{Fe};\theta_{\mathrm{sea}})\Phi_{\mathrm{eff}}
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-084e8d113c9b36a7)

Here $P$ is pressure, $T_{\mathrm{temp}}$ thermodynamic temperature, $\mu_{\mathrm{Fe}}$ chemical potential per iron nucleus, and $\Phi_{\mathrm{eff}}$ effective gravitational potential per unit mass. The coefficient $D_{\mathrm{Fe}}\ge0$ is a number-flux mobility, with units of number divided by length, time, and energy; it is not a bare diffusivity. The term $M_{\mathrm{sh}}(\mathrm{Fe};\theta_{\mathrm{sea}})$ is a candidate effective mass response and $\theta_{\mathrm{sea}}$ contains the medium variables and strain. This ansatz moves existing iron down the declared potential gradient; multicomponent flow, buoyancy, convection, and non-isothermal transport need additional terms. It does not derive planetary segregation from assembly dynamics.

The sharper hypothesis compares iron in metallic and silicate-hosted environments at the same pressure and temperature. For a chemical preference, both potentials below must refer to the same transferred iron inventory, the same per-nucleus energy reference, and specified host compositions. Comparing an arbitrary iron potential with an unrelated silicate formula-unit potential would not establish phase preference. With $\mu_{\mathrm{silicate}}$ denoting that iron transfer potential in the silicate host, let

$$
\Delta\mu_{\mathrm{Fe/silicate}}^{\mathrm{metal}}
\left(
n,P,T_{\mathrm{temp}},\mathcal B_{\mathrm{lat}}
\right)
=
\mu_{\mathrm{Fe}}^{\mathrm{metal}}
\left(
n,P,T_{\mathrm{temp}},\mathcal B_{\mathrm{lat}}
\right)
-
\mu_{\mathrm{silicate}}
\left(
n,P,T_{\mathrm{temp}},\mathcal B_{\mathrm{sil}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-dbf3b3193ca1d2ff)

Then the dense-medium preference condition is

$$
\frac{\partial}{\partial n}
\Delta\mu_{\mathrm{Fe/silicate}}^{\mathrm{metal}}
<
0
$$

[View →](../../../../equation-mapping.html#corpus-equation-06879c8305291ea1)

on a declared branch interval, with $n=\rho_{\text{NS}}/\rho_{\text{NS},0}$ and pressure, temperature, composition, and other independent coordinates held fixed in the partial derivative. If those variables change along a planetary profile, the total derivative has additional chain-rule terms. A negative derivative indicates a decreasing relative cost; it does not imply that the cost is negative or that either phase exists in equilibrium. Assembly packing, exclusion, bonding, and medium response must still supply the physical functions.

[Atomic Structure](atomic-structure.md#element-dependent-sea-response) states the general $\Delta\mu_{E/Y}^{B}$ record. This section specializes that record to Earth-core iron and carries the packing sufficient condition explicitly.

A conditional sufficient inequality follows by differentiating a proposed packing penalty. The dynamic exclusion envelope in [Braid Envelope Geometry](../noether-braid/braid-envelope-geometry.md#dynamic-exclusion-envelope) is a channel-dependent region of disruptive wake response, not a rigid body. Its replacement by a hard packing envelope requires a separate derivation; [Molecular Exclusion and Noether Sea Response](../spacetime/molecular-exclusion-and-noether-sea-response.md#levels-of-excluded-volume) preserves that distinction. On a declared interval, assume a positive differentiable ceiling $n_{\max,X}^{\mathrm{obl}}(n)$, a differentiable convex nondecreasing penalty $\Psi$, and a fixed nonnegative energy coefficient $A_X$. For material branch $X$, let

$$
z_X(n)
=
\frac{n}{n_{\max,X}^{\mathrm{obl}}(n)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-2dde8b7c21ec9fd6)

and define the derivative of the penalty $A_X\Psi(z_X(n))$ as the marginal packing term

$$
\mathcal{P}_X(n)
=
A_X
\Psi'\!\left(
z_X(n)
\right)
\frac{1}{n_{\max,X}^{\mathrm{obl}}(n)}
\left(
1
-
n\frac{\partial}{\partial n}
\ln n_{\max,X}^{\mathrm{obl}}(n)
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-57acf9549143e9f9)

The factor $1-n\,\partial_n\ln n_{\max,X}^{\mathrm{obl}}$ comes from differentiating the density-dependent denominator. At fixed $z_X$ and ceiling value, a positive ceiling derivative reduces this factor, but it can also make the marginal term negative; convexity alone does not fix that sign. If $A_X$ or other penalty parameters vary, their derivatives must be added or bounded explicitly. Decompose the candidate branch-potential derivative as

$$
\frac{\partial\mu_X}{\partial n}
=
-G_X(n)
+
\mathcal{P}_X(n)
+
\mathcal{D}_X(n)
+
b_X(n),
\qquad
\left|b_X(n)\right|
\le
\tfrac{1}{2}B_{\mathrm{coeff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-bd93854327385862)

where $G_X\ge0$ denotes hypothesized density-favorable gains, $\mathcal P_X$ the defined packing derivative, $\mathcal D_X$ other explicit medium-response derivatives under the same held-fixed convention, and $b_X$ the remaining error with a uniform bound $B_{\mathrm{coeff}}\ge0$. All terms share the units and inventory normalization of $\partial_n\mu_X$. Since $b_{\mathrm{Fe}}-b_{\mathrm{sil}}\le B_{\mathrm{coeff}}$, subtraction proves $\partial_n\Delta\mu_{\mathrm{Fe/silicate}}^{\mathrm{metal}}<0$ wherever

$$
G_{\mathrm{Fe}}-G_{\mathrm{sil}}
>
\left(
\mathcal{P}_{\mathrm{Fe}}-\mathcal{P}_{\mathrm{sil}}
\right)
+
\left(
\mathcal{D}_{\mathrm{Fe}}-\mathcal{D}_{\mathrm{sil}}
\right)
+
B_{\mathrm{coeff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d3797c9992eca35e)

This implication is already derived arithmetic under the stated decomposition and bound. Its physical antecedent remains unverified: the ceiling, gains, other derivatives, and error bound must come from the same retained assembly and medium record. Selecting favorable functions in this decomposition establishes only a model example, not an iron or silicate constitutive law.

The support-function version of the packing burden is concrete. For a declared branch exclusion envelope $E_X$, let

$$
\bar{s}_X(\hat{\mathbf n})
=
\sup_{\mathbf y\in E_X}
\hat{\mathbf n}\cdot\mathbf y
$$

[View →](../../../../equation-mapping.html#corpus-equation-9de952aee0240ecb)

be its support function in unit direction $\hat{\mathbf n}$. Assume a compact centrally symmetric envelope centered at the chosen origin, three linearly independent cell-edge unit directions $\hat{\mathbf b}_{X,i}$, and declared nonnegative wake and lattice clearances. Define candidate spacings

$$
D_{X,i}
=
2\bar{s}_X(\hat{\mathbf{b}}_{X,i})
+
\delta_{\mathrm{wake},X}
+
\delta_{\mathrm{lat},X,i}
$$

[View →](../../../../equation-mapping.html#corpus-equation-ae33a8d6e0fb2808)

where $2\bar{s}_X$ is the directional width under the centered symmetry assumption. A general envelope, including a centered but asymmetric one, requires $\bar{s}_X(\hat{\mathbf b})+\bar{s}_X(-\hat{\mathbf b})$. Directional widths alone do not prove simultaneous non-overlap for an oblique cell and its neighboring copies.

For the chosen spacings, define the support-function cell volume

$$
V_{\mathrm{cell},X}^{\mathrm{sf}}
=
c_{\mathrm{cell},X}
\left|
\det(
\hat{\mathbf{b}}_{X,1},
\hat{\mathbf{b}}_{X,2},
\hat{\mathbf{b}}_{X,3}
)
\right|
\prod_{i=1}^3D_{X,i}
$$

[View →](../../../../equation-mapping.html#corpus-equation-9cca1c577b16e4f5)

where $c_{\mathrm{cell},X}>0$ is a declared dimensionless cell factor. The determinant formula gives a volume for the specified edge vectors; it does not establish that volume as a minimum over admissible cells. Only if $V_{\mathrm{cell},X}^{\mathrm{sf}}$ is independently proved to be a lower bound on cell volume for a fixed braid count and a declared packing class does its class-restricted ceiling obey

$$
n_{\max,X}^{\mathrm{obl}}
\le
\frac{N_{\mathrm{cell},X}}
{\rho_{\text{NS},0}\,V_{\mathrm{cell},X}^{\mathrm{sf}}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-9edec181cc74e5f7)

where $N_{\mathrm{cell},X}$ is the fixed braid count and $\rho_{\text{NS},0}>0$ a reference number density, making the ratio dimensionless. Constructing one admissible cell instead gives an achievable density and hence a lower bound on the maximum over a class containing it. Equality needs both admissibility and an optimality proof in that class. Neither cell volume nor a larger ceiling alone fixes the Fe/silicate derivative sign; the complete marginal inequality above still has to hold.

The metallic-phase side can be written as

$$
\Delta G_{\mathrm{Fe}}^{\mathrm{metal/silicate}}
=
\Delta G_{\mathrm{std}}(P,T_{\mathrm{temp}})
+
\delta G_{\mathrm{sea}}\!\left(
\rho_{\text{NS}},
\chi_{\text{sea}},
\mathcal{M}_{\text{sea}}^{ab},
\Sigma_{\text{sea},ij}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-9a0b310bf5f438d5)

This proposed free-energy difference must use a fixed transferred inventory or a balanced phase reaction, with one common energy normalization. The $\Delta G_{\mathrm{std}}$ term is a standard comparison baseline; $\delta G_{\mathrm{sea}}$ is a candidate correction that must avoid counting medium effects already represented by that baseline. A free-energy difference alone does not determine conductivity or transport rates. The stress argument $\Sigma_{\text{sea},ij}$ uses the canonical stress in [Noether sea](../spacetime/noether-sea.md). Retuning keeps $\Delta Z_{\mathrm{Fe}}=0$ and $\Delta A_{\mathrm{Fe}}=0$; its clock and envelope interpretation remains subject to [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md) and the explicitly limited [Retuning-Map Toy Model](../validation/simulations/retuning-map-toy-model.md).

The corresponding closure residual is

$$
\mathcal{R}_{\oplus\mathrm{Fe}}
=
\mathcal{R}_{\mathrm{source}}
+
\mathcal{R}_{\mathrm{seg}}
+
\mathcal{R}_{\mathrm{phase}}
+
\mathcal{R}_{\Gamma}
+
\mathcal{R}_{\text{tr}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-b6447516ad4a51bc)

The source term tests the no-new-iron condition, the segregation and phase terms test material response, $\mathcal R_\Gamma$ tests clock-cadence matching, and $\mathcal R_{\text{tr}}$ tests the proposed transport classification. As in the superconducting score, every addend must be a finite nonnegative dimensionless mismatch using a declared norm and positive tolerance; raw signed or dimensionful quantities cannot be added as an acceptance score. A small sum does not replace the individual domain, stability, and source requirements. The bridge fails on the declared benchmark if it requires unlogged nuclear reactions, inconsistent medium records, or unaccounted energy loss.

### Threshold Crossing and Failure Modes

The proposed threshold marks departure from reversible transport only after a channel-resolved constitutive calculation establishes that classification. Energy or action assigned to medium excitation, radiation, heating, or branch transition needs a defined account and conversion; those quantities are not interchangeable merely because both appear in a ledger. Their dynamical obligations remain in [Energy](../dynamics/energy.md) and [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation).

A controlled below-threshold loss in the declared unforced regime would falsify this no-drag transport map; it would not alone demonstrate loss of internal chemical binding or falsify the primitive acceleration law. A measured above-threshold event inconsistent with the predicted channels would refute the classification, while an unbalanced independently defined energy account would expose a bookkeeping failure. If histories with the same proposed diagnostic arguments have different outcomes, the reduced argument list is insufficient and must retain the missing history or boundary information.

## Comparison Sources

David Tong's *Solid State Physics* lecture notes (2017), [Electron Dynamics in Solids, §§3.1–3.2](https://davidtong.org/pdfs/teaching/solid-state-physics/solidstate3.pdf), and [Phonons, §§4.1–4.2](https://davidtong.org/pdfs/teaching/solid-state-physics/solidstate4.pdf), supply the independent-band and harmonic-lattice comparison assumptions. His *Lectures on the Quantum Hall Effect* (2016), [§§1.2, 2.2–2.3, arXiv:1606.06687](https://arxiv.org/abs/1606.06687), explains the Hall tensor and occupied-band topological comparison. These effective theories constrain the recovery targets; they do not establish Architrino assemblies, medium response, or the proposed transport threshold.
