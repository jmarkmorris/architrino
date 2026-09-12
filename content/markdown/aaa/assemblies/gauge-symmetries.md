# Gauge Symmetries

This chapter states conditional mathematical results and recovery targets for the gauge bridge. Gauge symmetry is treated here as a tested structure of the observer-level record, not as a primitive substance in the Euclidean void. The bridge question is whether architrino assemblies, axial-layer bookkeeping, causal-wake history, and Noether sea response can reproduce the same effective redundancy, charge assignments, anomaly cancellations, and running couplings that the Standard Model uses.

An [architrino](../foundations/architrino.md) is a persistent polarity-bearing point transceiver whose emitted causal wake reaches other architrinos after a delay. An assembly is an organized collection of architrinos; the [Noether sea](../spacetime/noether-sea.md) is the ambient population of neutral assemblies. The axial layer is the six-site accessory arrangement used in the assembly mapping. Gauge recovery asks whether these histories supply a consistent observer description while added channels remain within the tested null limits.

The reader-facing rule is direct: gauge symmetry is a recovery constraint on the record, not a new ontology for the void. The Standard Model gauge structure survives here only if it can be produced as effective bookkeeping over real assembly histories, with no extra observable channels introduced by the same move.

Three companion chapters develop the parts of this bridge used below:
- Electroweak emergence narrative: [Gauge Structure Emergence](./gauge-structure-emergence.md)
- Color $SU(3)$ algebra closure: [Color Charge SU(3)](fermions/color-charge-su3.md)
- Conditional variational mapping: [Effective Lagrangian](../dynamics/effective-lagrangian.md)

## Regularized Setting

Fix a declared family of admissible histories of the [Master Equation](../dynamics/master-equation.md#the-master-equation-canonical-form), including transmitter identities, causal roots, boundary data, and any Noether sea response. Its primitive law sums delayed acceleration contributions with transmitter-side weight $W^{\mathrm{acc}}=c_f/|D_t|$, where $c_f$ is the causal-wake speed, $D_t=c_f-\mathbf V_t\cdot\hat{\mathbf r}$, and $\hat{\mathbf r}$ points from emission to reception. A causal root selects the past emission whose wake reaches the receiver now; $\mathbf V_t$ is the transmitter velocity at that emission. A regularization of width $\eta>0$ must approximate that law on its declared domain; smoothing alone supplies neither a local action nor an observer field map.

This section starts in the effective layer on purpose. The symbols look like field theory because the benchmark is field-theoretic. The substrate claim is weaker and harder: those effective fields must be recoverable from regularized assembly, wake, and Noether sea records.

Assume:
- **(G1)** Existence of coarse-grained matter field $\Psi$ and finite-energy histories on bounded windows.
- **(G2)** A differentiable local effective action is available on an observer chart $M_{\mathrm{eff}}$, with first derivatives of the matter fields and declared boundary conditions. Its relation to the delayed law is an additional recovery assumption. In the effective formulas, $\partial_\mu=\partial/\partial x_{\mathrm{eff}}^\mu$, with $x_{\mathrm{eff}}^0=t_{\mathrm{eff}}$; these are observer coordinates, distinct from absolute time $T$ and void positions $\mathbf X$.
- **(G3)** Color axis-exceptionality space is $\mathcal{H}^{\text{color}}\cong\mathbb{C}^3$: the three basis states record which persistent braid axis carries the exceptional axial pattern. The complex linear structure and norm are effective assumptions.
- **(G4)** The weak-coupling triad, the three-site weak-coupling geometry, supplies a local two-component effective channel. The assumed doublet representation does not itself derive left-handed exposure or its transport law.

These assumptions specify an effective comparison setting. Deriving its fields, finite-energy domain, and action from the retained histories remains open. Throughout the local gauge identities, $g_1,g_2,g_3$ are nonzero constants at a fixed probe scale; running compares different scales, not a position-dependent coupling inside the same derivative.

## Standard Model Recovery Gate

The gauge bridge is allowed to use the language of connections and covariant derivatives because those are the tested observer-level structures. It is not allowed to promote a larger symmetry, extra sector, or hidden channel merely because that larger package contains the Standard Model as a subcase. The first recovery target is the low-energy effective gauge record

$$
\mathcal{G}_{\mathrm{SM}}^{\mathrm{eff}}
=
U(1)_Y\times SU(2)_L\times SU(3)_c,
\qquad
Q=T_3+\frac{Y}{2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-e60c842d3adea99a)

together with the observed charge assignments, chiral weak couplings, anomaly cancellations, running couplings, and mixing data consumed by the fermion and reaction chapters.

This chapter uses the weak-hypercharge convention in the displayed relation. Sources that use $Q=T^3_L+Y_{\mathrm{SM}}$ must be converted by $Y=2Y_{\mathrm{SM}}$ before their charge tables or anomaly coefficients are compared to this residual. A compact residual for this chapter is

$$
\mathcal{R}_{\mathrm{gauge}}(\theta)
=
d_{\mathrm{rep}}\!\left(
\mathcal{G}_{\mathrm{eff}}(\theta),
\mathcal{G}_{\mathrm{SM}}^{\mathrm{eff}}
\right)
+
d_{\mathrm{run}}\!\left(
(g_1,g_2,g_3,\theta_W)_{\theta},
(g_1,g_2,g_3,\theta_W)_{\mathrm{obs}}
\right)
+
d_{\mathrm{chiral}}\!\left(
\mathcal{E}_{\mathrm{weak}}(\theta),
\mathcal{E}_{\mathrm{weak}}^{\mathrm{obs}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-4340276771619a0f)

Here $\theta$ is the shared retained-history and constitutive record. The nonnegative discrepancies $d_{\mathrm{rep}}$, $d_{\mathrm{run}}$, and $d_{\mathrm{chiral}}$ compare representations and charges, running couplings, and charged-current handedness, respectively. An evaluation must declare the observable family, nonempty scale window, reference data, uncertainty model, and dimensionless normalization of every discrepancy before using the sum; the formula alone is not an evaluated test. This chapter's bridge is promotable only if

$$
\mathcal{R}_{\mathrm{gauge}}(\theta)\le\epsilon_{\mathrm{gauge}}
\qquad\text{and}\qquad
\mathcal{R}_{\mathrm{null}}(\theta)=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-6b002ae8ece50288)

with $\mathcal{R}_{\mathrm{null}}$ defined in [Failure Criteria](../validation/failure-criteria.md#null-result-residual-for-added-channels). Thus larger group unification, supersymmetry, Kaluza-Klein-style geometry, and similar constructions remain comparison frameworks unless an $\mathbb{A}\mathbb{A}\mathbb{A}$ branch record recovers the observed gauge sector while also suppressing every added observable channel from the same shared state variables.

The representation term is local gauge bookkeeping unless the branch also makes claims about global line or bundle sectors. The local product notation $U(1)_Y\times SU(2)_L\times SU(3)_c$ is enough for the charge and anomaly residual above, but it does not by itself decide the global quotient or the allowed line-operator spectrum. A branch that uses those global sectors must declare the additional bundle and line data as part of $d_{\mathrm{rep}}$ rather than hiding it inside the local Lie-algebra match.

### Gauge Redundancy and Anomaly Ledger

A gauge redundancy changes the coordinates used for one effective physical state. Fix a space $\mathcal C_{\mathrm{eff}}$ of matter fields and connections on $M_{\mathrm{eff}}$, with representations, regularity, boundary data, and bundle sector declared. Let $\mathscr G_{\mathrm{red}}$ be the group of admissible gauge transformations that preserve those data and act trivially on all observables in the declared record. The equivalence relation is $c\sim c'$ exactly when $c'=g\cdot c$ for some $g\in\mathscr G_{\mathrm{red}}$. The quotient $\mathcal C_{\mathrm{eff}}/\mathscr G_{\mathrm{red}}$ consists of these gauge orbits; it is not defined by closeness of measured numbers.

A recovery map $\Pi:\mathcal H_{\mathrm{adm}}\to\mathcal C_{\mathrm{eff}}/\mathscr G_{\mathrm{red}}$ must assign an orbit to each admitted complete history. Changing the representative of $\Pi(h)$ does not change the history $h$. Distinct histories can nevertheless have the same coarse output; this loss of information does not turn their substrate differences into gauge transformations. A gauge fixing selects representatives on a declared domain, accounts for any residual transformations, and requires overlapping selections if no single global selection exists. Transformations that change boundary charges or boundary records cannot simply be quotiented out.

On a local chart, the connection transformations are
$$
A_\mu\sim A_\mu+\frac{1}{g_1}\partial_\mu\alpha,\qquad
W_\mu\sim U W_\mu U^{-1}+\frac{i}{g_2}U\partial_\mu U^{-1},
\qquad
G_\mu\sim V G_\mu V^{-1}+\frac{i}{g_3}V\partial_\mu V^{-1}
$$

[View →](../../../../equation-mapping.html#corpus-equation-13316968984b4020)

Here $\alpha$, $U\in SU(2)$, and $V\in SU(3)$ are smooth functions of $x_{\mathrm{eff}}$, and matter fields transform simultaneously in their declared representations. The matrices $W_\mu$ and $G_\mu$ use Hermitian generators. The $U(1)$ parameter is normalized consistently with the sector convention below, so $g_1$ remains explicit rather than being absorbed into $\alpha$. This is why the chapter treats $A_\mu,W_\mu,G_\mu$ as effective connections. The substrate burden is to recover one gauge-invariant record of observer-level forces, phases, holonomies, and charge ledgers from causal-wake and assembly histories.

Global symmetries and gauge redundancies have different tests. For a continuous internal global symmetry $\delta\Psi=\varepsilon_{\mathrm N}X(\Psi)$ of the differentiable local action in (G2), promote its constant infinitesimal parameter to a smooth compactly supported test function. Including all transformed fields and any action-boundary improvement in the current gives
$$
\delta S_{\mathrm{eff}}
=
-\int_{M_{\mathrm{eff}}} d^4x_{\mathrm{eff}}\,\varepsilon_{\mathrm N}(x_{\mathrm{eff}})\,\partial_\mu J^\mu,
\qquad
\partial_\mu J^\mu=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-9bb18d704ce4909e)

The divergence vanishes on solutions of that effective action because its first variation vanishes for every such test function. Here $X(\Psi)$ is the infinitesimal symmetry generator, $J^\mu$ is the Noether current, and $\varepsilon_{\mathrm N}$ is unrelated to primitive polarity magnitude. Conservation of the integrated charge additionally needs zero net boundary flux. A curved effective chart requires the corresponding invariant measure and covariant divergence. None of these local identities proves a conserved functional of the delayed substrate law. A Ward identity is the corresponding quantum correlation identity and additionally requires a compatible measure and regulator.

A discrete transformation has no infinitesimal continuous parameter, so this Noether argument supplies no current for it. Discrete relabelings are redundancies only when the full representation and observable record are unchanged. Changing an assembly's physical handedness, polarity, or retained provenance is not a bookkeeping freedom. Similarly, a spatially constant gauge transformation is not automatically a physical global symmetry; its status depends on the boundary conditions and charges. For a dynamical effective gauge action, the gauge constraint equations must hold and be preserved by evolution as well as by $\mathscr G_{\mathrm{red}}$. Quotienting field coordinates alone does not establish those constraints or remove a gauge anomaly, an obstruction to preserving the redundancy in the quantum record.

The anomaly ledger for a candidate branch record $\theta$ is therefore
$$
\mathcal{A}_{\mathrm{gauge}}(\theta)
=
\left(
\mathcal{A}_{[SU(3)_c]^3},
N_{2,\mathrm{Weyl}}\bmod 2,
\mathcal{A}_{[SU(3)_c]^2U(1)_Y},
\mathcal{A}_{[SU(2)_L]^2U(1)_Y},
\mathcal{A}_{[U(1)_Y]^3},
\mathcal{A}_{[\mathrm{grav}]^2U(1)_Y}
\right)_\theta
$$

[View →](../../../../equation-mapping.html#corpus-equation-cebb275d46fea303)

For the Standard Model recovery gate this vector must equal
$$
\mathcal{A}_{\mathrm{gauge}}(\theta)=(0,0,0,0,0,0)
$$

[View →](../../../../equation-mapping.html#corpus-equation-2caea01285fdabb9)

For the Standard Model's weak singlets and doublets on a spin spacetime, the second entry is the non-perturbative $SU(2)$ Witten check: the number $N_{2,\mathrm{Weyl}}$ of left-handed weak doublets, including spectator multiplicities, must be even. This vector is not a complete anomaly classification for additional representations or different global bundle data; those require their own anomaly analysis. Global anomalies that are part of known physics, such as axial-current violation and pion-to-photon anomaly matching, may be retained as observer-level recovery targets, but a gauge anomaly is a consistency failure rather than an optional correction.

Chiral gauge structure also constrains how this bridge may be regulated. A finite lattice, cutoff, or discrete branch approximation is not automatically a physical explanation of the Standard Model because weak handedness and gauge anomaly cancellation must survive the regulator. In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, a cutoff is admissible only as an approximation to one retained branch and observer-level gauge record. It fails if left-handed weak exposure, charge bookkeeping, anomaly cancellation, locality, and unitarity can be made compatible only by changing the underlying Noether sea state, axial inventory, or reaction provenance from row to row.

When this vector is evaluated from a fermion table, all entries are counted generation-by-generation with the correct spectator multiplicities and left-handed conjugate fields. For example, color multiplicity contributes to weak-doublet counting and weak multiplicity contributes to color anomaly sums. A visually correct charge table that passes only after dropping these multiplicities has not passed the Standard Model recovery gate.

### Running-Coupling Bridge

The standard high-energy plot of $U(1)_Y$, $SU(2)_L$, and $SU(3)_c$ interaction strengths is read here as a scale-dependent effective gauge record, not as evidence that three substrate fields literally merge. The $SU(3)_c$ curve tests how color axis-exceptionality transport is exposed at short causal-wake and assembly scales. The $SU(2)_L$ curve tests the exposed weak-coupling-triad channel. The $U(1)_Y$ curve tests the hypercharge/electromagnetic bookkeeping before electroweak mixing. A candidate branch record must therefore output the running vector

$$
\mathbf{g}_{\mathbb{A}\mathbb{A}\mathbb{A}}(\mu;\theta)
=
\bigl(
g_1(\mu;\theta),
g_2(\mu;\theta),
g_3(\mu;\theta),
\theta_W(\mu;\theta)
\bigr)
$$

[View →](../../../../equation-mapping.html#corpus-equation-7acf81a61afd7016)

Here $\mu$ is the observer-level probe scale and $\theta$ is the retained branch and constitutive record. Couplings must use the same renormalization scheme, hypercharge generator normalization, threshold conventions, and nonempty window $W_{\mathrm{run}}$ as the comparison data. Rescaling the hypercharge generator while inversely rescaling $g_1$ preserves the covariant derivative but changes its plotted meeting with the other couplings; the meeting diagnostic has meaning only after that convention is fixed. The term $d_{\mathrm{run}}$ measures the distance between this output and the observed running record across that window; it is not permission to fit each sector independently at one reference energy.

Near-convergence at high scale may be tracked as a comparison diagnostic by

$$
\Delta_{\mathrm{meet}}(\theta)
=
\inf_{\mu\in W_{\mathrm{run}}}
\max_{i,j\in\{1,2,3\}}
\left|
\alpha_i^{\mathbb{A}\mathbb{A}\mathbb{A}}(\mu;\theta)
-
\alpha_j^{\mathbb{A}\mathbb{A}\mathbb{A}}(\mu;\theta)
\right|,
\qquad
\alpha_i^{\mathbb{A}\mathbb{A}\mathbb{A}}(\mu;\theta)
=
\frac{g_i^2(\mu;\theta)}{4\pi}
$$

[View →](../../../../equation-mapping.html#corpus-equation-b19d6be99a5b03f3)

This diagnostic is subordinate to $d_{\mathrm{run}}$ and $\mathcal{R}_{\mathrm{null}}$. A small $\Delta_{\mathrm{meet}}$ does not promote a grand-unified container unless the same branch record recovers the observed low-energy gauge record, reproduces the scale dependence, and explains the absence of mirror matter, superpartners, proton-instability channels, extra gauge bosons, hidden transport modes, and other non-baseline outputs in the tested regime.

For a proposed symmetry container $C$, a compact audit form is
$$
\mathcal{R}_{\mathrm{container}}(\theta;C)
=
w_g\mathcal{R}_{\mathrm{gauge}}(\theta)
+w_f\mathcal{R}_{\mathrm{fact}}(\theta)
+w_0\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}(\theta)
$$

[View →](../../../../equation-mapping.html#corpus-equation-60e832831cb199bb)

Here the weights $w_g,w_f,w_0$ are fixed positive normalization factors, and $\mathcal{R}_{\mathrm{fact}}$ is a declared nonnegative discrepancy measuring failure of the recovered observer-level scattering and gauge sector to factor into the validated spacetime and internal-gauge records once those effective records exist. The container is only comparison language unless one shared $\theta$ drives all terms below tolerance; in particular, $\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}=0$ must follow from the accepted branch family rather than from sector-specific hiding parameters.

The same filter applies to especially elegant symmetry containers, including grand-unified and exceptional-group embeddings. It is not enough for a larger algebra to contain $U(1)_Y\times SU(2)_L\times SU(3)_c$ or to organize one generation of fermions. The promoted record must also explain why mirror matter, superpartners, proton-instability channels, extra gauge bosons, hidden transport modes, and other non-baseline outputs are absent in the tested regime. If those absences require separate masses, thresholds, compactification choices, or sector-specific suppressions, the construction remains a comparison framework rather than an $\mathbb{A}\mathbb{A}\mathbb{A}$ gauge closure.

## U(1) Sector

**Theorem 1 (Global phase invariance implies charge continuity).**  
Under (G2), suppose a continuous global phase acts nontrivially on the fields, preserves the action up to an accounted boundary term, and acts as
$$
\Psi \mapsto e^{i\alpha}\Psi,\qquad \alpha\in\mathbb{R}
$$

[View →](../../../../equation-mapping.html#corpus-equation-88fc4c3f087c3a8a)

then there exists a conserved current $j^\mu$ such that
$$
\partial_\mu j^\mu=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-c997a8a80b006f32)

*Proof sketch:* The compact-support variation above gives $\partial_\mu j^\mu=0$ on solutions. The current is defined up to the usual boundary improvement; a nonzero integrated charge and its identification with measured electric or hypercharge bookkeeping require a normalization and boundary-flux account. This is a derived implication in the assumed effective action, not a derivation of that action from the Master Equation.

**Corollary (Local phase covariance requires a connection).**  
If local phase changes are required to act on a charged field whose kinetic term uses a linear covariant first derivative satisfying the product rule, a connection cancels the derivative of the phase. For an effective multiplet $\Psi_r$ of hypercharge weight $y_r=Y_r/2$, use
$$
D_\mu^{(r)}=\partial_\mu-i g_1 y_r A_\mu
$$

[View →](../../../../equation-mapping.html#corpus-equation-9a0d1052e557f099)

with $U(1)$ gauge transform
$$
\Psi_r\mapsto e^{i y_r\alpha(x_{\mathrm{eff}})}\Psi_r,\qquad
A_\mu\mapsto A_\mu+\frac{1}{g_1}\partial_\mu\alpha
$$

[View →](../../../../equation-mapping.html#corpus-equation-aa7c2557657d3751)

Direct differentiation gives $D_\mu^{(r)\prime}\Psi_r'=e^{i y_r\alpha}D_\mu^{(r)}\Psi_r$. A neutral multiplet has $y_r=0$. The earlier common phase is a unit-weight example; it is not the hypercharge assignment of every Standard Model multiplet. The compact group period and charge lattice must be declared consistently with these weights when global sectors are used. Global phase symmetry alone does not require a propagating connection or determine its dynamics.

Here $A_\mu$ is the $U(1)_Y$ connection before electroweak mixing. The electromagnetic benchmark below instead uses $A_\mu^{\mathrm{em}}=\cos\theta_W A_\mu+\sin\theta_W W_\mu^3$ in the conventional electroweak comparison chart, with $g_1=g'$ and $g_2=g$. Deriving that mixing map and the signed electric charge $q_{\mathrm{eff}}$ is part of the recovery target.

### Aharonov-Bohm Holonomy Benchmark

The Aharonov-Bohm effect is the sharp electromagnetic U(1) benchmark because it separates local force from phase transport. The validated observable is that two force-free arms can accumulate a relative phase fixed by enclosed flux. In this chapter the benchmark is a closure target for the emergent electromagnetic connection, not evidence that $A_\mu^{\mathrm{em}}$ is substrate ontology.

For two oriented interferometer arms $\gamma_1$ and $\gamma_2$ with common source and detector events, use one electromagnetic calibration and a nonempty declared flux window $W_\Phi$. The ideal magnetic benchmark has a vanishing observer-level electromagnetic force channel along the arms,
$$
\mathbf{F}_{\mathrm{eff}}\big|_{\gamma_1}
=
\mathbf{F}_{\mathrm{eff}}\big|_{\gamma_2}
=
\mathbf{0}
$$

[View →](../../../../equation-mapping.html#corpus-equation-2478579fd6c6c50e)

the coarse-grained wake/action ledger must still produce the observer-level phase shift
$$
\Delta\phi_{\mathrm{AB}}^{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\frac{1}{\hbar_{\mathrm{eff}}}
\left(
\mathcal{S}_{\mathrm{wake}}[\gamma_1]
-
\mathcal{S}_{\mathrm{wake}}[\gamma_2]
\right)
\stackrel{!}{=}
\frac{q_{\mathrm{eff}}}{\hbar}\Phi_B
\pmod{2\pi}
$$

[View →](../../../../equation-mapping.html#corpus-equation-87c3ddb9f4b398df)

Here $\mathcal{S}_{\mathrm{wake}}[\gamma_a]$ is the flux-dependent effective arm action after subtracting a common declared reference experiment; geometric and other dynamical phase differences must be included in that calibration. The flux $\Phi_B$ is oriented by the closed path $\gamma_1\circ\gamma_2^{-1}$ and belongs to the electromagnetic connection. Neither the existence of this action map nor its phase conversion follows from primitive polarity alone. The equality also carries a calibration burden: a validated branch must identify the emergent phase quantum with the measured one on this benchmark window, $\hbar_{\mathrm{eff}}=\hbar$, rather than fitting two independent phase scales. A useful residual is
$$
\Delta_{\mathrm{AB}}
=
\sup_{\Phi_B\in W_\Phi}
\inf_{N\in\mathbb Z}
\left|
\Delta\phi_{\mathrm{AB}}^{\mathbb{A}\mathbb{A}\mathbb{A}}(\Phi_B)
-
\frac{q_{\mathrm{eff}}}{\hbar}\Phi_B
-2\pi N
\right|
$$

[View →](../../../../equation-mapping.html#corpus-equation-303a339b8e81f4d6)

The integer minimization compares phases on the circle, so changing a phase representative by $2\pi$ leaves the residual unchanged. When the benchmark is evaluated as a concrete interferometer packet, the force-free and phase requirements must be checked together. For a branch record $\theta$, one compact validation residual is
$$
\mathcal{V}_{\mathrm{AB}}(\theta)
=
w_F\sum_{a=1}^{2}\int_{\gamma_a}
\left\|\mathbf{F}_{\mathrm{eff}}(\theta)\right\|^2\,ds
+
w_\phi
\inf_{N\in\mathbb{Z}}
\left|
\Delta\phi_{\mathrm{AB}}^{\mathbb{A}\mathbb{A}\mathbb{A}}(\theta)
-
\frac{q_{\mathrm{eff}}}{\hbar}\Phi_B
-
2\pi N
\right|
$$

[View →](../../../../equation-mapping.html#corpus-equation-ed2dcdfb29c76484)

Here $ds$ is observer-level spatial arclength, and $w_F,w_\phi>0$ normalize the integrated squared force and circular phase error using fixed tolerances. A small integral alone does not bound a sharply localized force. Acceptance therefore also requires separate declared force and phase bounds on the same record, including $\sup_{a,s}\|\mathbf F_{\mathrm{eff}}(\gamma_a(s);\theta)\|\le F_{\mathrm{tol}}$ when pointwise force suppression is claimed. The aggregate condition $\mathcal V_{\mathrm{AB}}(\theta)\le\varepsilon_{\mathrm{AB}}$ is a diagnostic, not permission to trade one component's failure against another's success.

The U(1) closure passes this benchmark only if $\Delta_{\mathrm{AB}}$ remains below the declared interferometric tolerance while the same effective connection also preserves charge continuity and ordinary electromagnetic force recovery. If the phase recovery requires a local force on the arms, a separate phase fit, or a literal promotion of $A_\mu^{\mathrm{em}}$ to substrate ontology, this gauge bridge has failed at the AB gate.

### Global Gauge-Topology Completion Target

The Aharonov-Bohm benchmark tests global phase transport around one loop: its holonomy. A stronger gauge bridge must also specify charge compatibility and how local effective potentials glue across overlapping regions. Flux quantization applies only in sectors whose topology and charge lattice require it; an arbitrary externally imposed solenoid flux is not thereby quantized. This remains an effective-connection target, not evidence that a gauge potential is substrate ontology.

Let $\Gamma_{\mathrm{AB}}$ be a nonempty declared family of oriented closed observer-level loops $\gamma$ with oriented spanning surfaces $S$, $\partial S=\gamma$, over which the electromagnetic curvature is defined. The ideal force channel vanishes on the loop. The shared wake/action and effective-connection record should satisfy
$$
\Delta_{\mathrm{gauge,glob}}(\theta)
=
\sup_{(\gamma,S)\in\Gamma_{\mathrm{AB}}}
\inf_{N\in\mathbb{Z}}
\left|
\Delta\phi_{\mathrm{wake}}^{\mathbb{A}\mathbb{A}\mathbb{A}}(\gamma;\theta)
-
\frac{q_{\mathrm{eff}}}{\hbar}\int_S F_{\mathrm{eff}}(\theta)
-
2\pi N
\right|
$$

[View →](../../../../equation-mapping.html#corpus-equation-7085ca2178a29614)

Here $F_{\mathrm{eff}}=dA^{\mathrm{em}}$ is the electromagnetic curvature two-form, with physical flux normalization, and $N$ records the $2\pi$ ambiguity of the phase. For two admissible surfaces with the same boundary, consistency requires $(q_{\mathrm{eff}}/\hbar)\int_{S-S'}F_{\mathrm{eff}}\in2\pi\mathbb Z$ for every allowed charge. Local potentials must be related on overlaps by the declared gauge transformations, whose transition functions compose to the identity on triple overlaps.

If a loop does not bound a surface in the retained domain, the displayed surface residual is unavailable. Its holonomy must be retained and tested separately: a flat connection, with zero local curvature, can still have a nontrivial phase around a noncontractible loop. Extending a surface through an excluded flux region requires the corresponding extended field record. Zero curvature in the accessible region alone cannot determine that holonomy.

A compact sector check inside the same target is useful when the benchmark includes disconnected flux sectors or instanton-like sectors rather than a single loop. Let $\mathcal{C}_{\mathrm{top}}$ be a nonempty declared family of observer-level sectors with a justified integer invariant and fixed comparison label $n_{\mathrm{ref}}(s)$. Let $\mathcal{O}_{\mathrm{SM}}(s)$ be the corresponding Standard Model comparison record. Sectors without such an integer normalization need their own specified invariant. The same wake/action ledger may define
$$
\Delta_{\mathrm{sector}}(\theta)
=
\sup_{s\in\mathcal{C}_{\mathrm{top}}}
\left[
\left|
\mathcal{Q}^{\mathbb{A}\mathbb{A}\mathbb{A}}_{\mathrm{wake}}(s;\theta)-n_{\mathrm{ref}}(s)
\right|
+
d_{\mathrm{obs}}\!\left(
\mathcal{O}_\theta(s),
\mathcal{O}_{\mathrm{SM}}(s)
\right)
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-d15e501b45aa5af9)

Here $\mathcal{Q}^{\mathbb{A}\mathbb{A}\mathbb{A}}_{\mathrm{wake}}$ is only the sector label extracted from the retained causal-wake/action record. It is not an independent topological charge assigned after the effective gauge description has already been fitted. Its orientation, normalization, and assignment to $s$ must match the fixed reference; proximity to an arbitrary integer cannot establish that the correct sector was recovered. The observable discrepancy $d_{\mathrm{obs}}$ uses declared dimensionless tolerances.

The global gauge-topology target passes only if $\Delta_{\mathrm{gauge,glob}}$ and any declared $\Delta_{\mathrm{sector}}$ stay below tolerance while charge continuity, local force recovery, AB holonomy, and flux/charge compatibility are all read from one shared record. It fails if a chart-dependent potential must be promoted to ontology, if the topological charge is inserted separately from the wake/action ledger, or if the same sector requires different Noether sea variables for force, phase, and charge recovery.

## SU(2) Weak Sector

Let $\psi_L$ denote the local left-handed weak doublet in the effective exposed weak-coupling-triad channel.

**Proposition 2 (Local weak-basis rotations define an SU(2) connection).**  
If the effective weak kinetic term has a linear first derivative, satisfying the product rule, required to transform covariantly under
$$
\psi_L(x_{\mathrm{eff}})\mapsto U_2(x_{\mathrm{eff}})\psi_L(x_{\mathrm{eff}}),\qquad U_2(x_{\mathrm{eff}})\in SU(2)
$$

[View →](../../../../equation-mapping.html#corpus-equation-8174965f15888f12)

then a compatible connection is represented by
$$
D_\mu\psi_L
=
\left(\partial_\mu-i g_2 W_\mu^a\frac{\tau^a}{2}\right)\psi_L
$$

[View →](../../../../equation-mapping.html#corpus-equation-d2f039773e1d296c)

with curvature
$$
F_{\mu\nu}^a
=
\partial_\mu W_\nu^a-\partial_\nu W_\mu^a+g_2\epsilon^{abc}W_\mu^bW_\nu^c
$$

[View →](../../../../equation-mapping.html#corpus-equation-abaa56fa2138ac7b)

Here $\tau^a$ are the Pauli matrices and $W_\mu=W_\mu^a\tau^a/2$. The curvature is defined by $[D_\mu,D_\nu]=-i g_2F_{\mu\nu}^a\tau^a/2$. The symbol $\epsilon^{abc}$ is the $SU(2)$ Levi-Civita structure constant; it is unrelated to the polarity-unit magnitude $\epsilon$ used in axial-inventory bookkeeping.

*Proof sketch:* Enforcing $D_\mu'\psi_L'=U_2D_\mu\psi_L$ gives the connection transformation above; expanding the derivative commutator gives the displayed curvature. This is a derived covariance identity under the effective representation assumption. It does not derive a propagating weak field, weak handedness, or a kinetic action from the two-state channel.

## SU(3) Color Sector

**Theorem 3 (Color algebra closure in axis-exceptionality basis).**  
In the assumed complex color space with persistently indexed basis $(1,2,3)$, the six Hermitian axis mixers and two diagonal traceless generators span the traceless Hermitian matrices. With bracket $-i[A,B]$, their real span is a Lie algebra isomorphic to $\mathfrak{su}(3)$; equivalently, the anti-Hermitian generators $-iT^a$ close under the ordinary commutator.

This is the conditional matrix-algebra result in [Color Charge and SU(3)](fermions/color-charge-su3.md#algebra-closure-rigorous-statement). Matrix units satisfy $E_{ab}E_{cd}=\delta_{bc}E_{ad}$, so their commutators preserve the traceless matrix span. The eight independent Hermitian matrices exhaust its eight real dimensions under the stated bracket. Physical color transport does not follow from this algebra alone. If the retained-history map additionally supplies local norm-preserving, determinant-one color transport and a covariant derivative, its effective representation has the form
$$
U_3\in SU(3),\qquad
D_\mu=\partial_\mu-i g_3 G_\mu^a T^a
$$

[View →](../../../../equation-mapping.html#corpus-equation-218e64f89bfca649)

## Minimal Effective Gauge Lagrangian

Assumptions (G1)-(G4) alone do not determine a gauge kinetic action, Lorentz covariance, field normalization, or spinor matter. With those additional effective assumptions, the familiar local gauge and fermion kinetic terms provide the following comparison ansatz on a flat observer chart:
$$
\mathcal{L}_{\text{gauge,min}}
=
-\frac14 F_{\mu\nu}F^{\mu\nu}
-\frac14 W_{\mu\nu}^aW^{a\,\mu\nu}
-\frac14 G_{\mu\nu}^aG^{a\,\mu\nu}
+\bar\Psi\,i\gamma^\mu D_\mu\Psi
+\cdots
$$

[View →](../../../../equation-mapping.html#corpus-equation-57c72afc5264eac5)

Here $F_{\mu\nu}$ is the hypercharge curvature, $W_{\mu\nu}^a$ is the weak curvature denoted $F_{\mu\nu}^a$ in the preceding weak section, and $G_{\mu\nu}^a$ is the color curvature. Indices are contracted with the declared effective Lorentz metric, not the Euclidean substrate metric. The matrices $\gamma^\mu$ act on effective spinors; $\Psi$ abbreviates the specified chiral multiplets, and $D_\mu$ acts in each multiplet's own representation. The ellipsis includes other terms required by the comparison theory, such as scalar, scalar-fermion, and allowed topological terms, as well as higher-order constitutive corrections. It does not assert that all omitted terms are higher order.

This remains a recovery ansatz. Gauge covariance permits further operators and does not fix their coefficients; the retained history and response map must select the effective terms and show their validity regime.

## Closure Interface: Gauge-Topology Compatibility

For integration with the topological and metric closure programs, impose compatibility between gauge-covariant effective dynamics and topology-derived sector separation.

Required consistency conditions:
1. **Topology respect:** effective gauge transport must preserve the admissible color representation space and any independently established topological sectors. It may mix basis states corresponding to different exceptional axes; those individual basis labels are not invariant sectors.
2. **No leakage contradiction:** constitutive preferred-frame leakage terms (from spacetime closure) must not force leading-order gauge-breaking operators.
3. **Energy-side compatibility:** gauge sector must admit open-vs-closed braid scaling laws without violating local covariance of the effective Lagrangian.
4. **Global completion:** local effective connections must assemble into one gauge record whose holonomies, fluxes, and charge ledgers agree across chart boundaries.

The corresponding topology, confinement, and preferred-frame conditions are developed in these chapters:
- topology and action invariants: [dynamics/causal-action-functional.md](../dynamics/causal-action-functional.md)
- color structure and confinement geometry: [assemblies/fermions/color-charge-su3.md](fermions/color-charge-su3.md)
- preferred-frame closure: [spacetime/ppn-parameters.md](../spacetime/ppn-parameters.md)

## Failure Conditions

This gauge-emergence spine fails if any of the following occur in the calibrated low-energy regime:
- Measured effective continuity violation: $\partial_\mu j^\mu\neq 0$ beyond numerical/experimental tolerance.
- Weak channel requires non-SU(2)-covariant terms at leading order.
- Color generator set fails closure or requires dimension other than 8 in the one-axis-exceptionality sector.
- The Standard Model representation, coupling-running, or chirality residual $\mathcal{R}_{\mathrm{gauge}}$ cannot be kept below tolerance using one shared gauge record.
- Global holonomies, fluxes, and charge compatibility cannot be recovered from the same effective gauge record that supplies local force and phase transport.
- Added partner families, extra gauge modes, baryon-instability channels, or hidden transport channels produce $\mathcal{R}_{\mathrm{null}}(\theta)>0$.
- Preferred-frame leakage forces explicit gauge-breaking operators at leading order.

These observations would falsify the specified gauge bridge on its declared domain. Failure of an assumed effective action, selector, or representation map does not by itself refute the primitive delayed acceleration law. No retained-history derivation or measured gauge-recovery result is established here.

## Source Notes

The standard comparison formulas are supported by J. de Blas, S. Dittmaier, and R. Kogler, *Electroweak Model and Constraints on New Physics*, Particle Data Group review, revised November 2025, §10.1, especially Eq. (10.3) and the hypercharge relation ([review](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-standard-model.pdf)). Its hypercharge potential $B_\mu$ is this chapter's $A_\mu$; its photon potential is this chapter's $A_\mu^{\mathrm{em}}$.

David Tong, *Gauge Theory* (2018), §§1.1.1–1.1.2, explains the phase and chart-overlap comparison used in the global electromagnetic target ([lecture notes](https://www.damtp.cam.ac.uk/user/tong/gaugetheory/1em.pdf)). Juven Wang, Xiao-Gang Wen, and Edward Witten, *A New SU(2) Anomaly* (2019), arXiv:1810.00844, distinguishes the usual anomaly from the additional representation and spacetime cases ([paper](https://arxiv.org/abs/1810.00844)). These sources constrain the observer-level comparison; they are not premises for architrino dynamics.
