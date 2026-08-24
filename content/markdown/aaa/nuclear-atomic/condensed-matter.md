# Condensed Matter

This chapter states the condensed-matter closure target for medium-level behavior in the Noether sea. Its current focus is Noether sea transport: the distinction between reversible inertial response, true resistance, and threshold behavior when matter moves through a densely coupled background of neutral Noether braids.

This note bridges [Atomic Structure](atomic-structure.md), [Particle Masses](../assemblies/particle-masses.md), [Noether Sea Pro/Anti Coupling](../spacetime/noether-sea-pro-anti-coupling.md), and [Molecular Exclusion and Noether Sea Response](../spacetime/molecular-exclusion-and-noether-sea-response.md), since all four depend on how the Noether sea stores stress and permits transport.

At present this is a closure target rather than a finished derivation. The residual and its critical value must still be extracted from stable assembly dynamics, Noether sea constitutive response, and the relevant stability diagnostics.

## Noether Sea Transport

The condensed-matter claim is not that ordinary matter feels a continuous dissipative drag from the Noether sea. In the validated weak regime, a stable assembly should move by reversible retuning: its internal causal ledger and local Noether sea coupling deform, store stress, and return that stress without opening a net loss channel.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f1e6b138902c1fde)

Here $\mathbf{V}_{\text{cm}}$ and $\mathbf{a}_{\text{cm}}$ record center-of-mass transport, $\rho_{\text{NS}}$ and $\chi_{\text{sea}}$ record the local Noether sea state, $\mathcal{M}_{\text{sea}}^{ab}$ records the medium-response tensor, and $\Delta_{\mathbf{k}}$ is the canonical assembly non-symmetry Floquet gap inherited from the branch certificate. It is unrelated to the Bloch wavevector $\mathbf k$ used later in this chapter. The equation defines the diagnostic target; it does not yet prove the constitutive form of $\mathcal{R}_{\text{tr}}$.

The critical surface is

$$
\mathcal{R}_{\text{tr}}
=
\mathcal{R}_{\text{tr},*}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f45f41d4bdc27fc0)

It separates three regimes:

| Regime | Meaning |
| --- | --- |
| $\mathcal{R}_{\text{tr}} < \mathcal{R}_{\text{tr},*}$ | Reversible medium-dressed inertial response; no ordinary drag term is allowed. |
| $\mathcal{R}_{\text{tr}}\approx\mathcal{R}_{\text{tr},*}$ | Onset of medium excitation, action shedding, or branch instability. |
| $\mathcal{R}_{\text{tr}} > \mathcal{R}_{\text{tr},*}$ | Dissipative transport, radiation-like shedding, medium heating, or structural transition must be logged. |

### Reversible Response Below Threshold

Below the critical surface, the response belongs to the mass and inertia program rather than to a friction law. The closure target is that the assembly's shielded internal ledger contributes an internal momentum response of the form

$$
p_{\text{int}}^a
\approx
\alpha_{\mathrm{m}}\,\zeta(A)E_{\text{internal}}(A)\,
\mathcal{M}_{\text{sea}}^{ab}V_{\text{cm},b}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-20365054f2b08d21)

This is the condensed-matter version of medium-dressed inertial response. The Noether sea may shape the response tensor, the local delay factor, and the stability margin, but it must not drain energy from a stable bound state merely because that state is moving through the Noether sea.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-ee1f858bd8d144c9)

The below-threshold reversible energy is the quadratic form

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-ea7571efc9fc9808)

The antisymmetric part drops out of the scalar energy because

$$
V_{\text{cm},a}\mathcal{M}_{-}^{ab}V_{\text{cm},b}=0
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f45d9b5503a1757b)

but it need not vanish from the momentum response. Define the branch-preserving gyroscopic contribution by

$$
p_{\mathrm{gyro}}^{a}
=
\alpha_{\mathrm{m}}\zeta(A)E_{\text{internal}}(A)\,
\mathcal{M}_{-}^{ab}V_{\text{cm},b},
\qquad
V_{\text{cm},a}p_{\mathrm{gyro}}^{a}=0
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-bae59a54faf4b03e)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f5b74ab212e2f758)

which need not vanish. Over a closed path $C_V$ in velocity space,

$$
\Delta E_{\mathrm{gyro}}[C_V]
=
\oint_{C_V}V_{\text{cm},a}\,d p_{\mathrm{gyro}}^a
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-cded86daf17ca75b)

may therefore record a finite reversible exchange with the material-orientation or Noether sea circulation ledger. It must not be classified as dissipation unless the completed cycle leaves an unreturned excitation or heating channel.

A sufficient acceleration-level form for a strictly workless transverse response is instead

$$
A_{\mathrm{gyro}}^a
=
\mathcal G^{ab}V_{\text{cm},b},
\qquad
\mathcal G^{ab}=-\mathcal G^{ba},
\qquad
V_{\text{cm},a}A_{\mathrm{gyro}}^a=0.
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-a14da50e76e59777)

This row changes direction without changing $V_{\text{cm}}^2$ at that instant. The momentum-response and acceleration-response forms are not interchangeable without the constitutive map that relates $\mathcal M_-^{ab}$, $\mathcal G^{ab}$, and the medium exchange record.

Thus the directional inertial readout below threshold is

$$
m_{\mathrm{eff}}(\hat v;A,\theta_{\mathrm{sea}})
=
\alpha_{\mathrm{m}}\zeta(A)E_{\text{internal}}(A)\,
\hat v_a\mathcal{M}_{+}^{ab}(\theta_{\mathrm{sea}})\hat v_b
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-a3830ba90fdb2d71)

The dimensional convention is fixed by the weak isotropic limit $\mathcal{M}_{\text{sea}}^{ab}\to\delta^{ab}/c_{\text{eff}}^2$, so $m_{\mathrm{eff}}$ reduces to the roadmap scalar $\alpha_{\mathrm{m}}\zeta(A)E_{\text{internal}}(A)/c_{\text{eff}}^2$ of [Particle Masses](../assemblies/particle-masses.md). This is not a completed derivation of $\mathcal{M}_{+}^{ab}$, $\mathcal{M}_{-}^{ab}$, or $\mathcal G^{ab}$; it is the reversible-response lemma that any derivation must satisfy. Below $\mathcal{R}_{\text{tr},*}$, a nonzero antisymmetric momentum term is admissible in steady transport or with its acceleration-cycle exchange balanced by the orientation/circulation ledger. A strictly workless transverse term must satisfy the acceleration-level contraction above. Any drag-like coefficient or net work-loss term must instead vanish in the branch-preserving limit or be routed to an excitation, heating, radiation-like, boundary-exchange, or branch-transition channel.

## Lattice and Band-Response Recovery

The first standard condensed-matter recovery target is not a new substrate ontology. It is the observer-level band description that must emerge when electron assemblies move through a periodic material branch. Fix a material branch $\mathcal B_{\mathrm{lat}}$ with primitive lattice vectors $\mathbf a_i$, reciprocal vectors $\mathbf b_i$ satisfying

$$
\mathbf a_i\cdot\mathbf b_j=2\pi\delta_{ij}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-0749c651c4d38bdd)

and a Brillouin zone $\mathrm{BZ}$ given by the Wigner-Seitz cell of the reciprocal lattice. The effective electron-envelope states should admit a Bloch-form recovery

$$
\psi_{\alpha\mathbf k}(\mathbf x)
=
e^{i\mathbf k\cdot\mathbf x}
u_{\alpha\mathbf k}(\mathbf x),
\qquad
u_{\alpha\mathbf k}(\mathbf x+\mathbf R)=u_{\alpha\mathbf k}(\mathbf x),
\qquad
\mathbf R\in\Lambda
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-8754efcd4b0fb4ef)

with $\mathbf k$ identified modulo reciprocal-lattice vectors, $\Lambda$ the direct Bravais lattice generated by the $\mathbf a_i$, and $\Lambda^*$ its reciprocal lattice. Here $\mathbf x$, and later $t$, are effective material-chart coordinates; the native closure still owes the map from $(T,\mathbf X)$ into that chart. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this is an effective envelope statement: the periodic material branch constrains the electron assembly's resonance envelope, while the underlying causal-wake and Noether sea records remain the native dynamics.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-3543ddb5c3c0994e)

Near a non-degenerate band extremum, the effective mass tensor is the required local curvature object,

$$
\left(m_{\alpha,*}^{-1}\right)^{ij}
=
\frac{1}{\hbar^2}
\frac{\partial^2 E_\alpha}{\partial k_i\partial k_j}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-0cce5aa29136cf0e)

This tensor is a material-response readout, not the primitive mass of the electron assembly. It belongs beside the medium-dressed inertial response above: the exposed assembly mass determines how the electron assembly enters the material branch, while the band curvature determines how that branch responds to slow envelope perturbations.

The Fermi-surface target is likewise a recovery target. For a chemical potential $\mu$,

$$
\mathcal F_{\alpha}
=
\left\{
\mathbf k\in\mathrm{BZ}:
E_\alpha(\mathbf k)=\mu
\right\}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-0d3160ceecccadfa)

Metal-like branches have a nonempty $\mathcal F_\alpha$ and therefore low-energy response at arbitrarily small excitation cost along the surface. Band-insulator branches have filled bands separated by a positive gap,

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-12d57e2d9a64aa49)

Semiconductor, Mott-insulator, and topological-insulator comparisons should enter as refinements of this gap-and-branch classification. A Mott branch cannot be recovered by single-electron band filling alone; it requires an interaction or exclusion residual that blocks double occupancy or its assembly-level analogue. A topological branch cannot be promoted from gap size alone; it needs a Berry-curvature or boundary-mode invariant tied to the same effective connection used by the electromagnetic recovery program.

The minimal transport consistency condition is that a perfect periodic branch has no ordinary Drude loss term. If a current relaxes, the relaxation time $\tau$ must be traced to disorder, vacancies, phonons, boundary exchange, or another logged branch disturbance. The observer-level Drude comparison may keep

$$
\sigma
=
\frac{e^2\tau n_{\mathrm{car}}}{m_*}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-429648e1cef4b658)

but $\tau^{-1}$ must vanish in the ideal branch limit and must not be confused with Noether sea drag below $\mathcal{R}_{\text{tr},*}$. This is the condensed-matter version of the no-drag rule: stable Bloch transport is coherent envelope transport until a material imperfection, lattice excitation, or branch transition opens a logged loss channel.

## Lattice Scattering and Phonon Response

The scattering target should recover reciprocal-lattice selectivity before interpreting material images or diffraction data. For incident and outgoing wavevectors $\mathbf k$ and $\mathbf k'$, let $\mathbf q=\mathbf k-\mathbf k'$. A periodic lattice branch must give constructive elastic scattering only on reciprocal-lattice transfers,

$$
\mathbf q\in\Lambda^*
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-7244db1c04aa44fa)

with basis dependence carried by a structure factor

$$
S(\mathbf q)
=
\sum_i f_i(\mathbf q)e^{i\mathbf q\cdot\mathbf d_i}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-41ba897b02d5c97a)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-8926a2ad442dba57)

tests whether the declared lattice branch, basis, and atom-local Noether sea response generate the same reciprocal-space selection rule. Thermal or zero-point lattice motion may reduce peak intensity through an effective Debye-Waller factor, but it should not move the reciprocal-lattice condition unless the material branch itself changes.

Phonons are the next material-response layer. For a branch displacement vector $\mathbf u_n(t)$ about equilibrium sites, the harmonic branch is governed by a dynamical matrix $D_{ij}(\mathbf k)$:

$$
\omega_s^2(\mathbf k)\,e_{s,i}(\mathbf k)
=
D_{ij}(\mathbf k)e_{s,j}(\mathbf k)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-6f127603d0fb4b14)

with $e_{s,i}(\mathbf k)$ the mode polarization vectors; the symbol $\epsilon$ stays reserved for the polarity unit.

In a long-wavelength isotropic elastic limit, the same branch should reduce to a displacement field $u_i(\mathbf x,t)$ in the effective material chart declared above. The strain is

$$
u_{ij}
=
\frac{1}{2}
\left(
\frac{\partial u_i}{\partial x_j}
+
\frac{\partial u_j}{\partial x_i}
\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-356ed2aea8331094)

and elastic action

$$
S_{\mathrm{el}}
=
\int dt\,d^3x
\left[
\frac{\rho_{\mathrm{mat}}}{2}
\left(
\frac{\partial u_i}{\partial t}
\right)^2
-
\mu u_{ij}u_{ij}
-
\frac{\lambda}{2}u_{ii}u_{jj}
\right]
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-04de828484fba635)

Here $\mu$ and $\lambda$ are the standard Lamé coefficients of the material branch, not the chemical potential $\mu$ used elsewhere in this chapter and not the canonical envelope scale ratio $\lambda$. The acoustic recovery target is

$$
\omega_{\mathrm L}^2
=
\frac{2\mu+\lambda}{\rho_{\mathrm{mat}}}k^2,
\qquad
\omega_{\mathrm T}^2
=
\frac{\mu}{\rho_{\mathrm{mat}}}k^2
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-08e361307cf0b9f7)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-0a04478195f31bed)

where $V$ is the crystal volume and $\Delta N_s$ is the dimensionless per-mode phonon occupation change in the effective branch description. A coherent recoil-free or elastic event has $\Delta N_s=0$ for the relevant phonon channels and must route momentum through the whole branch or boundary record. This is the material analogue of distinguishing reversible retuning from heating.

## Order-Parameter Defects and Critical Transport

Defect and vortex language is useful only when a material branch supplies an effective order-parameter record. Let
$$
Q:\Omega\setminus D\longrightarrow\mathcal{Q}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f28384fbdf809f56)
be an observer-level order-parameter map for a material region with defect set $D$ and target space $\mathcal{Q}$. A loop $\gamma$ around a line defect may then carry a homotopy label
$$
\mathcal{I}_\gamma
=
\left[Q|_\gamma\right]\in\pi_1(\mathcal{Q})
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-ad2007bf49b5e07f)

read up to conjugacy when $\pi_1(\mathcal{Q})$ is non-abelian, since a free loop fixes only a conjugacy class, or, in a phase-like branch,
$$
\nu_\gamma
=
\frac{1}{2\pi}\oint_\gamma d\varphi
\in\mathbb Z
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-91e5a7da1acb8027)
These are recovery or comparison objects. They do not replace the architrino, causal-wake, or Noether sea branch records that must generate the effective material description.

The transport consequence is a gap rule. A stable branch may deform, strain, or retune without changing its defect label while the relevant stability gap remains open:
$$
\Delta_{\mathbf{k}}>0
\quad\Longrightarrow\quad
\Delta\mathcal{I}_\gamma=0
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-5a29e240f1fbea66)
for branch-preserving perturbations. If a material event changes the topological label, creates a vortex or dislocation, unbinds a defect pair, or opens an edge mode, the event has crossed a branch threshold. In the condensed-matter closure target that means
$$
\Delta\mathcal{I}_\gamma\ne0
\quad\Longrightarrow\quad
\Delta_{\mathbf{k}}\to0
\quad\text{or}\quad
\mathcal{R}_{\text{tr}}\ge\mathcal{R}_{\text{tr},*}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-47b7f6e464fe79fc)
Below that threshold the response remains reversible retuning or coherent transport. Above it, the energy and momentum ledger must route the event through lattice excitation, surface transport, heating, radiation-like shedding, boundary exchange, or structural transition.

## Hall and Topological Response Benchmarks

Hall response is a high-value comparison because it separates ordinary transport loss from transverse, nondissipative response. The classical Hall branch supplies the baseline tensor target

$$
\rho_{xy}
=
\frac{B}{n_{\mathrm{car}}e},
\qquad
\rho_{xx}
=
\frac{m_*}{n_{\mathrm{car}}e^2\tau}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-13c92fa67d65752b)

This baseline is observer-level bookkeeping. The effective magnetic-state map must still be derived from the photon/action ledger and material branch, and the Lorentz-force form must remain a recovery target rather than a primitive substrate law.

The integer quantum Hall recovery target is stronger. In a two-dimensional gapped branch, the Hall conductivity must reduce to

$$
\sigma_{xy}
=
\frac{e^2}{2\pi\hbar}\,C,
\qquad
C\in\mathbb Z
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-c88fc143217cb216)

where $C$ is the first Chern number of the filled effective band bundle,

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-ae35dcfd1eb9ce3f)

Here $A_i(\mathbf k)=-i\langle u_{\mathbf k}|\partial_{k_i}u_{\mathbf k}\rangle$ is an effective Berry connection over the Brillouin zone. This is a comparison/recovery object: it tests whether the effective U(1) connection and material branch reproduce topological quantization. It should not be imported as a fundamental gauge-potential ontology.

The robustness condition is that a small branch perturbation cannot change $C$ while the gap stays open:

$$
\Delta_{\mathrm{top}}>0
\quad\Longrightarrow\quad
\delta C=0
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-0bb6b552ca638c2c)

Disorder may localize non-transporting states and widen observed plateaux, but the plateau value must come from the topological invariant of the extended branch, not from disorder as a fitted correction. A compact Hall residual is

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-29c80575bd6a49a0)

Fractional quantum Hall states, anyons, non-Abelian edge sectors, Chern-Simons effective actions, and chiral boundary liquids are valuable comparison material, but they should stay in the recovery/comparison bucket unless a local $\mathbb{A}\mathbb{A}\mathbb{A}$ closure target consumes them directly. The safe present requirement is narrower: recover quantized Hall response, edge robustness, fractional charge/statistics as observer-level collective behavior where experimentally required, and keep every topological field description downstream of the effective material branch rather than treating it as substrate ontology.

### Superconducting Response Benchmark

Superconductivity is the strongest low-loss transport benchmark for the threshold picture. A superconducting material branch must recover persistent current and vanishing longitudinal resistive loss below its declared critical surface while remaining distinct from an ideal normal-metal branch. Crossing a critical temperature, current, magnetic loading, vortex-motion threshold, or material defect must open the corresponding excitation, heating, or branch-transition channel rather than being hidden as Noether sea drag.

The magnetic comparison has two coupled requirements. The same effective U(1) material connection must recover the Meissner response in the applicable branch and the conventional paired-branch flux quantum

$$
\Phi_0
=
\frac{h}{2e}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-7c77191a24746bb2)

as an observer-level benchmark. The factor $2e$ tests the branch's composite pairing and exchange-statistics map; it is not inserted as a new substrate carrier or as proof that every superconducting branch shares one microscopic mechanism. Type-II vortex transport further sharpens the threshold ledger: pinned vortices may preserve a zero-loss branch, while vortex motion must appear as a logged resistive channel.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-64671ac2c4f51c5a)

where the five entries test zero longitudinal resistance, magnetic expulsion, flux quantization, paired-branch statistics, and the declared critical surface. The benchmark fails if these observables require unrelated material maps or if a persistent current loses energy below threshold without a logged disturbance.

### Photon-Coupled Surface Transport

Photon absorption, reflection, and surface heating are thresholded transport events in the same condensed-matter sense. The incoming photon ledger does not permit a continuous drag term on the material, and the material does not act as a hard spatial wall. A surface cell supplies electron-envelope, bonding or lattice, nuclear-source, and local Noether sea records that route the incoming planar-pair ledger into coherent re-release, capture, scattering, heat, recoil, or retained excitation.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-5071023c2a21c6f1)

where $a_{\perp}$ is the incoming photon transverse ledger, $\mathcal B_e$ is the realized electron-envelope branch, $\mathcal B_{\mathrm{lat}}$ is the material bonding or lattice branch, $\Theta_E^{(\ell)}$ is the local Noether sea response record, $\mathcal M_{\text{sea}}^{ab}$ is the medium-response tensor, and $\Delta_{\mathbf{k}}$ is the relevant stability gap. The surface channel becomes dissipative only when the selected route opens a logged excitation or heating channel; otherwise the event is coherent transport or reversible retuning.

The corresponding energy row is

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-204583549c087acb)

For a metal-like branch, the conduction-electron response supports a coherent re-release channel with large $E_{\gamma,\mathrm{out}}$. For an ultra-black multiple-capture branch, repeated capture and dephasing through the material geometry drive $E_{\gamma,\mathrm{out}}$ toward zero while the ledger closes through electron-envelope excitation, lattice heating, Noether sea update, recoil, and remnant terms. Ordinary optical surface routing must preserve nuclear inventory, so $\Delta Z=0$ and $\Delta A=0$ unless a separate nuclear-reaction gate is supplied.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-65cf91c16a6adc5a)

for ordinary planetary differentiation. Here $\mathcal{N}_{\mathrm{Fe}}$ is the number density of iron nuclei and $\mathbf{J}_{\mathrm{Fe}}$ is their segregation flux. A nonzero $S_{\mathrm{Fe}}^{\mathrm{nuc}}$ would be a nuclear-reaction claim, not a condensed-matter pressure claim; it would have to preserve proton, neutron, charge, energy, momentum, and medium-provenance bookkeeping in the same spirit as [BBN Constraints](../cosmology/BBN-constraints.md) and [Nuclear Binding](nuclear-binding.md).

The pressure-side bridge may instead use a segregation functional of the form

$$
\mathbf{J}_{\mathrm{Fe}}
=
-D_{\mathrm{Fe}}\nabla_{\mathrm{eff}}\!\left[
\mu_{\mathrm{Fe}}(P,T,\theta_{\mathrm{sea}})
+
M_{\mathrm{sh}}(\mathrm{Fe};\theta_{\mathrm{sea}})\Phi_{\mathrm{eff}}
\right]
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-084e8d113c9b36a7)

where $\theta_{\mathrm{sea}}$ denotes the local Noether sea state record, including $\rho_{\text{NS}}$, $\chi_{\text{sea}}$, $\mathcal{M}_{\text{sea}}^{ab}$, and strain data. The term $M_{\mathrm{sh}}(\mathrm{Fe};\theta_{\mathrm{sea}})$ is the medium-dressed exposed mass response of an iron assembly, not a new nuclear species; the symbol $A$ stays reserved in this section for the nuclear mass number. In this form the reason iron sinks is not that the center creates iron, but that existing iron-bearing assemblies minimize the relevant chemical, gravitational, and medium-response potential in dense planetary interiors.

The sharper equilibrium hypothesis is that the iron-rich metallic branch is compatible with higher normalized Noether braid density than a silicate branch at the same pressure and temperature. Let

$$
\Delta\mu_{\mathrm{Fe/silicate}}^{\mathrm{metal}}
\left(
n,P,T,\mathcal B_{\mathrm{lat}}
\right)
=
\mu_{\mathrm{Fe}}^{\mathrm{metal}}
\left(
n,P,T,\mathcal B_{\mathrm{lat}}
\right)
-
\mu_{\mathrm{silicate}}
\left(
n,P,T,\mathcal B_{\mathrm{sil}}
\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-dbf3b3193ca1d2ff)

Then the dense-medium preference condition is

$$
\frac{\partial}{\partial n}
\Delta\mu_{\mathrm{Fe/silicate}}^{\mathrm{metal}}
<
0
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-06879c8305291ea1)

along the planetary-interior branch, with $n=\rho_{\text{NS}}/\rho_{\text{NS},0}$. This does not say that Noether sea density creates iron. It says that, after iron already exists, the metallic iron branch may reduce relative chemical and medium-response cost as ambient Noether braid density increases. In ordinary terms, iron-rich material sinks because it is dense; in the native theory, density must eventually be derived from assembly packing, exclusion-volume response, metallic bonding, pressure response, and Noether sea coupling.

[Atomic Structure](atomic-structure.md#element-dependent-sea-response) states the general $\Delta\mu_{E/Y}^{B}$ record. This section specializes that record to Earth-core iron and carries the packing sufficient condition explicitly.

A local sufficient condition can be stated by differentiating the packing ceiling rather than treating it as a fixed phase label. The exclusion-envelope geometry is inherited from [Braid Envelope Geometry](../noether-braid/braid-envelope-geometry.md#dynamic-exclusion-envelope), while [Molecular Exclusion and Noether Sea Response](../spacetime/molecular-exclusion-and-noether-sea-response.md#levels-of-excluded-volume) keeps the ordinary matter-channel occupancy baseline separate from Noether sea response. Use a convex packing-penalty function $\Psi(z)$ on the occupancy ratio $z_X$; $\Psi'(z_X)$ is the marginal penalty for pushing the branch toward its oblate exclusion-envelope packing ceiling. For a material branch $X$, let

$$
z_X(n)
=
\frac{n}{n_{\max,X}^{\mathrm{obl}}(n)}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-2dde8b7c21ec9fd6)

and define the marginal packing term

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-57acf9549143e9f9)

The factor $1-n\,\partial_n\ln n_{\max,X}^{\mathrm{obl}}$ is the packing-headroom correction: if the branch-derived oblate-envelope packing ceiling rises with ambient density, the marginal exclusion penalty is reduced. For each material branch, decompose the marginal dense-medium response of the branch potential as

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-bd93854327385862)

where $G_X \ge 0$ collects the density-favorable coordination and Noether sea coupling gains, $\mathcal{P}_X$ is the marginal packing term above, $\mathcal{D}_X$ collects the delay, strain, and pressure derivative terms, and $b_X$ bounds the remaining coefficient drift. Subtracting the iron and silicate rows shows the sign condition $\partial_n\Delta\mu_{\mathrm{Fe/silicate}}^{\mathrm{metal}} < 0$ is guaranteed on a branch interval if

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-d3797c9992eca35e)

This is a sufficient inequality, not yet a completed derivation. It becomes a derivation only when $n_{\max,X}^{\mathrm{obl}}(n)$ comes from exclusion-envelope packing, $G_X$ comes from metallic coordination and Noether sea coupling, and $\mathcal{D}_X$ comes from the same local Noether sea state record used for clock, delay, strain, and transport response.

The support-function version of the packing burden is concrete. For a declared branch exclusion envelope $E_X$, let

$$
\bar{s}_X(\hat{\mathbf n})
=
\sup_{\mathbf y\in E_X}
\hat{\mathbf n}\cdot\mathbf y
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-9de952aee0240ecb)

be its support function in direction $\hat{\mathbf n}$. For branch-cell directions $\hat{\mathbf{b}}_{X,i}$, define support-function spacings

$$
D_{X,i}
=
2\bar{s}_X(\hat{\mathbf{b}}_{X,i})
+
\delta_{\mathrm{wake},X}
+
\delta_{\mathrm{lat},X,i}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-ae33a8d6e0fb2808)

where $2\bar{s}_X$ is the full envelope width for a centrally symmetric envelope such as a centered oblate spheroid; a non-centered envelope would instead need $\bar{s}_X(\hat{\mathbf{b}})+\bar{s}_X(-\hat{\mathbf{b}})$,

and the support-function cell volume

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-9cca1c577b16e4f5)

Then the oblate packing ceiling must satisfy

$$
n_{\max,X}^{\mathrm{obl}}
\le
\frac{N_{\mathrm{cell},X}}
{\rho_{\text{NS},0}\,V_{\mathrm{cell},X}^{\mathrm{sf}}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-9edec181cc74e5f7)

where $N_{\mathrm{cell},X}$ is the declared braid count per branch cell and the $\rho_{\text{NS},0}$ normalization keeps the ceiling dimensionless for comparison with $n=\rho_{\text{NS}}/\rho_{\text{NS},0}$. Equality is only a replay assumption for a declared branch cell. The Fe/silicate sign can therefore be credited to packing only when the Fe metallic branch earns a smaller support-function cell volume, higher effective coordination, or lower spacing anisotropy from the declared exclusion-envelope geometry.

The metallic-phase side can be written as

$$
\Delta G_{\mathrm{Fe}}^{\mathrm{metal/silicate}}
=
\Delta G_{\mathrm{std}}(P,T)
+
\delta G_{\mathrm{sea}}\!\left(
\rho_{\text{NS}},
\chi_{\text{sea}},
\mathcal{M}_{\text{sea}}^{ab},
\Sigma_{\text{sea},ij}
\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-9a0b310bf5f438d5)

The $\delta G_{\mathrm{sea}}$ term is admissible as a medium-response correction to phase stability, conductivity, elastic response, or transport. The stress argument uses $\Sigma_{\text{sea},ij}$, the component form of the canonical Noether sea stress $\Sigma_{\text{sea}}$ from [Noether sea](../spacetime/noether-sea.md). It is not admissible as a hidden transmutation channel. Branch-preserving retuning of an iron assembly must keep the nuclear inventory fixed, for example $\Delta Z_{\mathrm{Fe}}=0$ and $\Delta A_{\mathrm{Fe}}=0$, while any cadence, envelope, or transport change remains subordinate to the clock and retuning programs in [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md) and [Retuning-Map Toy Model](../validation/simulations/retuning-map-toy-model.md).

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-b6447516ad4a51bc)

The source term enforces the no-new-iron guardrail, the segregation and phase terms test the density-sorting and metallic-response claims, $\mathcal{R}_{\Gamma}$ tests the local clock-cadence handoff, and $\mathcal{R}_{\text{tr}}$ tests whether transport remains reversible or crosses into logged excitation, heating, radiation-like shedding, or branch transition. The bridge fails if it requires unlogged iron-nucleus creation, independent medium parameters for phase and clock behavior, or an ordinary drag channel below the transport threshold.

### Threshold Crossing and Failure Modes

Crossing $\mathcal{R}_{\text{tr},*}$ is the point at which reversible transport stops being the adequate description. Above threshold, some transported energy or action must route into an explicit channel: medium excitation, radiation-like transport, local heating, action shedding, or branch transition. For the dynamical bookkeeping of those channels, see [Energy](../dynamics/energy.md) and [A1 Dynamics](../noether-braid/braid-a1-dynamics.md#a1-dynamics).

The main failure modes are therefore sharp. If $\mathcal{R}_{\text{tr}} < \mathcal{R}_{\text{tr},*}$ still produces ordinary dissipative drag in stable atoms, the framework loses chemical stability. If $\mathcal{R}_{\text{tr}} > \mathcal{R}_{\text{tr},*}$ occurs without a logged excitation, radiation, heating, or branch-transition channel, the energy ledger is incomplete. If the threshold cannot be expressed in terms of assembly motion, local Noether sea state, medium response, and stability gap data, the medium-transport picture has not matured into a usable transport closure.
