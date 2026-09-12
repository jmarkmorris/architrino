# Gauge Structure Emergence

This chapter explains how gauge language enters $\mathbb{A}\mathbb{A}\mathbb{A}$. An [architrino](../foundations/architrino.md) is a polarity-bearing point transceiver whose emitted causal wakes record its past motion; an assembly is an organized collection of these transceivers. The Euclidean void is their fixed spatial container, and absolute time $T$ orders their histories. Gauge fields are observer-level descriptions to be recovered from assembly geometry, exposed axial sites, causal-wake history, boundary records, and any derived Noether sea response.

The target is the low-energy Standard Model gauge record, including $U(1)_Y$, $SU(2)_L$, $SU(3)_c$, electroweak mixing, charge bookkeeping, anomaly cancellation, running couplings, and null results for non-baseline channels. This chapter is a working emergence map, not the formal symmetry theorem chapter. Its job is to show what must be recovered and which substrate records are allowed to carry that recovery before exact closure is finished.

The reader should keep the substrate, assembly, effective, and observer-record levels separate. Architrinos and their causal histories supply the substrate dynamics; assemblies and the Noether sea are organized contents. Effective potentials, fields, gauge connections, and symmetry labels summarize those contents. Charge tables, scattering records, precision couplings, and absence-of-extra-channel constraints test that summary. The emergence target is that one declared source-assembly, causal-history, boundary, and Noether sea record project to the tested effective layer without turning the effective fields into final ontology.

Gauge redundancy means that different local choices of an internal basis describe the same physical record. A connection specifies how to compare those bases at neighboring effective positions; holonomy is the transformation accumulated by transporting a state around a loop. These definitions do not show that a particular assembly realizes a gauge group. That identification requires a map from its delayed history to the effective variables and an observable family that tests the map.

Readers who want the particle dictionary before this emergence map can read [Quantum Number Mapping](./fermions/quantum-number-mapping.md) and [Particle Masses](./particle-masses.md) first.

## Physical Medium: From Vacuum Language to Noether Sea

In standard QFT, the vacuum is represented by quantum fields and their ground-state structure. In $\mathbb{A}\mathbb{A}\mathbb{A}$, that language is retained only as an observer-level comparison. The physical medium is the Noether sea, while the fixed container remains the Euclidean void.

In this chapter, the Noether sea means the dense, permeating medium of coupled, neutral Noether braids occupying the [Euclidean void](../foundations/euclidean-void.md); see [Noether Sea Pro/Anti Coupling](../spacetime/noether-sea-pro-anti-coupling.md). It is not empty space and is not the Euclidean void itself.

- **Occupancy:** Nonzero occupancy of pro/anti Noether braid assemblies.
- **Net properties:** Balanced charge and angular-momentum bookkeeping at the medium scale, schematically $\sum q = 0$ and $\sum S = 0$ over neutral coarse windows, where $S$ denotes spin/angular-momentum bookkeeping rather than the action.
- **Medium-response target:** The Noether sea is a candidate contributor to the effective local permeability $\mu_0$ and permittivity $\epsilon_0$ read by observer-level electrodynamics. The subscripted $\epsilon_0$ is the standard effective permittivity symbol and is unrelated to the polarity unit $\epsilon=|e|/6$. These are not fundamental constants of the void. The constitutive derivation must determine whether they summarize an essential sea response, a modification of direct source-wake response, or a regime in which the sea remains within its balanced reference tolerance.

An assembly-level hypothesis proposes that complementary pro/anti braid orientations pair with relative axes and phases that suppress exposed polar-site leakage. Opposite orientation labels or equal population counts alone do not prove cancellation, persistence, or transparency. Those claims require the paired path histories and their combined acceleration and response records, as explained in [Noether Sea Pro/Anti Coupling](../spacetime/noether-sea-pro-anti-coupling.md).

## Field Language as Effective Bookkeeping

Standard Model fields are often treated as fundamental entities. Here, field language is an **effective bookkeeping tool** for source and assembly history, boundaries, and any resolved Noether sea state, not a second substrate ontology.

The relevant distinction is between the $\mathbb{U}_{\text{now}}$ universe-state perspective and the Physical Observer.

- **Complete-state view:** The $\mathbb{U}_{\text{now}}$ universe-state perspective records architrinos with polarity bookkeeping labels $q=\pm\epsilon$ and their causal-wake histories. There are no primitive continuous gauge fields, only effective potential summaries reconstructed from causal-wake contributions.
- **Physical Observer view:** A Physical Observer lacks direct resolution of individual architrinos and instead measures apparatus responses from which collective fields are inferred. A potential gradient alone represents the electric response only in an appropriate electrostatic chart; general electromagnetic reconstruction must also recover time-dependent connection contributions.
  - **$\mathbf{E}_{\mathrm{eff}}$ and $\mathbf{B}_{\mathrm{eff}}$** are receiver-independent effective projections of the declared source, causal-history, boundary, and Noether sea record. Electric response is constrained by receiver-polarity reversal; magnetic response is constrained by axial, circulation, and motion-dependent assembly measurements. Neither field is defined to be a Noether sea average.
  - **Gauge potentials ($A_\mu^{\mathrm{eff}}$)** are effective connections to be reconstructed from the same wake/action record. Local twists, strains, polarization, or density gradients in the Noether braid network are candidate native carriers, not established meanings of the potential by definition.

### Gauss-Law Source and Closure Benchmarks

The Faraday-to-Gauss field picture is a useful low-energy checkpoint for the effective electromagnetic map. Field lines are visualization aids, not literal strands in the substrate, and the test charge or compass needle is an apparatus probe of a coarse response. What must survive is the closed-surface bookkeeping. In ordinary electrostatics, the electric flux through a closed surface depends only on the net charge enclosed:

$$
\oint_{\partial V}\mathbf{E}_{\mathrm{eff}}\cdot d\mathbf{A}
=
\frac{Q_{\mathrm{enc}}}{\epsilon_0}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f07677f8337128f0)

In standard magnetostatics, the corresponding magnetic flux through a closed surface vanishes in the no-monopole regime:

$$
\oint_{\partial V}\mathbf{B}_{\mathrm{eff}}\cdot d\mathbf{A}
=
0
$$

[View →](../../../../equation-mapping.html#corpus-equation-83854b3ce6ffb20b)

For $\mathbb{A}\mathbb{A}\mathbb{A}$, these equations are recovery targets for one effective branch record. The electric relation says the retained polarity ledger, declared Noether sea record, and apparatus surface must project to the same enclosed-charge flux. The magnetic relation says the observer-level magnetic response must close through an axial or antisymmetric projection without requiring an untracked isolated magnetic source. If the electric source row, magnetic closure row, and measured force response require different medium records or independently tuned $\epsilon_0$ and $\mu_0$, the effective field description has not yet recovered the Maxwell-level limit.

### Maxwell-Ampere Continuity Benchmark

The charging-capacitor case is a useful low-energy benchmark for this map. In standard electrodynamics, the same boundary loop can be spanned by a surface that cuts the conducting wire or by a bulging surface through the capacitor gap. The observer-level magnetic circulation cannot depend on that arbitrary surface choice, so the Maxwell-Ampere comparison must recover

$$
\oint_{\partial S}\mathbf{B}_{\mathrm{eff}}\cdot d\boldsymbol{\ell}
=
\mu_0
\left(
I_{\mathrm{cond}}
+
\epsilon_0\frac{d\Phi_E}{dt_{\mathrm{eff}}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-3ea82b553ba7973c)

in the validated regime. The useful lesson is not that displacement current is a new substrate current moving through empty space. It is that conduction-current bookkeeping in charged assemblies and changing effective electric flux projected from the source, boundary, and declared Noether sea record must yield the same loop-circulation result. If the two surface choices require different branch records, different medium-response variables, or a hidden retuning of $\mu_0$ and $\epsilon_0$, then the effective electromagnetic map has not recovered Maxwell-level continuity.

## Symmetry Groups as Geometric Deformations

We map the abstract gauge groups of the Standard Model to candidate assembly, causal-wake, and Noether sea records:

1.  **U(1) (Electromagnetism):**
    *   *SM View:* Phase rotation of the complex field.
    *   *$\mathbb{A}\mathbb{A}\mathbb{A}$ View:* A recovery target in which one source-history, assembly, boundary, and Noether sea record must supply charge continuity, effective phase transport, and electric and magnetic response. Potential density and polarization alignment of the Noether sea are candidate carriers. They must be derived or bounded as unnecessary rather than inserted as the definition of U(1). The native acceleration remains the delayed line-of-action hit sum; transverse and velocity-dependent observer-level pieces must arise only after the relevant branch geometry and causal history are aggregated.

2.  **SU(2) (Weak Interaction):**
    *   *SM View:* Non-Abelian rotation in isospin space.
    *   *$\mathbb{A}\mathbb{A}\mathbb{A}$ View:* Chiral deformation of a candidate Noether braid is a proposed carrier of weak response. Handedness and order-dependent deformations do not identify $SU(2)_L$: one must recover the two-component left-handed weak representation, its generators and couplings, and passive local basis changes that leave the physical history fixed.

3.  **SU(3) (Color):**
    *   *SM View:* Non-Abelian color rotation among three quark color labels.
    *   *$\mathbb{A}\mathbb{A}\mathbb{A}$ View:* A color-sector recovery target for axis-exceptionality bookkeeping in the axial frame of the Noether braid assembly; see [Color Charge SU(3)](fermions/color-charge-su3.md).

The emergence claim in this chapter is therefore a mapping target with four required parts. The candidate native mechanisms include delayed causal-wake coupling, axial-layer deformation, and Noether sea response, whose relative roles remain to be derived. The mapping is from closure labels, axial inventories, exposed weak-coupling triads, color axis-exceptionality records, source and boundary history, and any required medium-response variables to the observer-level symbols $U(1)_Y$, $SU(2)_L$, $SU(3)_c$, $g_1$, $g_2$, $g_3$, $\theta_W$, and the charge table. The regime is the low-energy observer sector where stable assemblies, weak gradients, and resolved apparatus records make the coarse variables meaningful. The breakdown occurs at root-ledger changes, unstable axial inventories, unresolved Noether sea updates, or any branch that predicts extra low-energy partners or transport modes.

A compact reader-facing residual for this map is
$$
\mathcal{R}_{\mathrm{EW\text{-}map}}(\theta)
=
d_Q(Q_\theta,Q_{\mathrm{SM}})
+d_{\mathrm{mix}}\!\left((g_1,g_2,\theta_W)_\theta,(g_1,g_2,\theta_W)_{\mathrm{obs}}\right)
+d_{\mathrm{chiral}}(W_\theta,W_{\mathrm{obs}})
+\mathcal{R}_{\mathrm{null}}(\theta)
$$

[View →](../../../../equation-mapping.html#corpus-equation-f84f42dd11cd785a)

Here $\theta$ includes the retained assembly and Noether sea state, causal history, boundaries, apparatus settings, and calibration. The charge table is $Q_\theta$; $W_\theta$ is the handed weak-response record, not a gauge potential. Each distance is dimensionless, normalized to declared comparison scales and uncertainties; its definition and the matching scale must be fixed before a numerical residual is reported. $\mathcal{R}_{\mathrm{null}}$ tests added channels against the applicable experimental bounds. This is a proposed recovery diagnostic, not a measured result.

## Standard Model Recovery Discipline

This working map starts from the measured low-energy pattern, not from a larger symmetry that must later be hidden. The durable observer-level target is the Standard Model gauge record: $U(1)_Y\times SU(2)_L\times SU(3)_c$, the charge relation $Q/|e|=T_3+Y/2$, the observed chiral weak couplings, the charge and generation tables, the running of $g_1,g_2,g_3$, and the absence of additional low-energy partners or transport modes above current bounds.

The hypercharge symbol must be read with its local convention. This chapter uses dimensionful electric charge $Q$ and dimensionless weak generators, so its weak-hypercharge convention is $Q/|e|=T_3+Y/2$. In a source writing charge in units of $|e|$ as $T^3_L+Y_{\mathrm{SM}}$, convert by $Y=2Y_{\mathrm{SM}}$. Use $g_1=g'$ for the coupling multiplying $Y/2$, $g_2=g$, and $g_3$ for the color coupling, all at one declared renormalization scale and convention. The electromagnetic $U(1)_{\mathrm{em}}$ after mixing is distinct from $U(1)_Y$ before mixing. The local product specifies the Lie-algebra and representation target; a global quotient and allowed bundle or line sectors require additional data.

The recovery target is hybrid rather than a single declared finite-cutoff path integral. Color-sector comparisons consume nonperturbative QCD matrix elements or color-singlet operator data; electroweak comparisons consume a renormalized perturbative chiral-gauge chart or a matched weak effective theory; reaction chapters consume the matching map that connects those records to a measured channel. A finite regulator, when present, is auxiliary evidence until its removal or matching map and systematic error budget are declared. It is not a physical Standard Model parameter in the observer-level recovery residual.

The familiar running-coupling plot is a useful bridge for this target. It says that the effective $SU(3)_c$, $SU(2)_L$, and $U(1)_Y$ interaction strengths change with observer-level probe scale, with any high-scale approach depending on the coupling normalization, particle spectrum, and thresholds. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this is not treated as proof of grand-unified ontology. It is a pressure on the mapping: the same Noether sea response, axial-layer exposure, and color axis-exceptionality bookkeeping must generate the scale-dependent effective record discussed in [Gauge Symmetries](gauge-symmetries.md#running-coupling-bridge), while the same branch record keeps non-baseline channels absent.

The proposed translation of "force unification" is a sequence of channel availability. The table is a hypothesis about assembly regimes, not a derived formation history or evidence that neutral braids already supply a gravitational channel:

| Effective stage | Assembly channels present | What is shielded or unavailable | Observer-facing translation |
| --- | --- | --- | --- |
| Noether braid dominated | Neutral Noether braid binding and medium response | Axial charge exposure and free electromagnetic/weak channels | Gravity-like medium response can be active before electric or weak observability |
| Axial association | Stable axial architrino bookkeeping begins to lock to neutral cores | Most internal causal history remains shielded | Inertial response and electroweak differentiation become meaningful |
| Charged assembly regime | Electromagnetic, weak-corridor, and color-singlet hadronic channels can appear | Non-baseline channels remain suppressed by stability and null-result constraints | The Standard Model channel table is the recovery target |
| High-probe comparison | Running couplings and possible approximate convergence appear in observer charts | Larger symmetry groups are not substrate ontology by default | Unification claims must explain both recovered channels and absent channels |

There is a second consistency pressure that is just as important as the charge table. The Standard Model is a chiral gauge theory, so the low-energy fermion collection must cancel gauge anomalies and the $SU(2)$ Witten obstruction as a set. In this working emergence map, anomaly cancellation is read as a recovery condition on the assembly dictionary:
$$
\mathcal{A}_{\mathrm{SM}}^{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\left(
\mathcal{A}_{[SU(3)_c]^3},
N_{2,\mathrm{Weyl}}\bmod2,
\mathcal{A}_{[SU(3)_c]^2U(1)_Y},
\mathcal{A}_{[SU(2)_L]^2U(1)_Y},
\mathcal{A}_{[U(1)_Y]^3},
\mathcal{A}_{[\mathrm{grav}]^2U(1)_Y}
\right)
=(0,0,0,0,0,0)
$$

[View →](../../../../equation-mapping.html#corpus-equation-b4788a5e559fd7ac)

Each $\mathcal A$ denotes the corresponding anomaly coefficient, which must be computed from the full left-handed Weyl representation table, including color and weak multiplicities and conjugated right-handed fields. The second entry counts weak doublets with those multiplicities; its evenness test applies to the Standard Model singlet/doublet inventory, not arbitrary higher weak representations. These zeros are effective quantum-consistency targets. A charge table or six-slot count alone does not establish them.

From the $\mathbb{A}\mathbb{A}\mathbb{A}$ side, that means the Noether sea state and assembly variables must first reproduce the known gauge bookkeeping. Larger group unification, supersymmetric partner bookkeeping, or extra-dimensional geometry may be useful comparison languages, but none of them is native ontology here. They become relevant only if a branch record derives the Standard Model pattern and also explains why every added observable channel is absent without using a separate suppression parameter for each failed prediction.

The local closure discipline is therefore:

1. recover the effective gauge group and representation table from assembly and axial-layer bookkeeping;
2. derive $g_1,g_2,g_3$ and $\theta_W$ as shared effective outputs rather than per-observable fit constants;
3. keep weak chirality, CKM/PMNS overlap, and weak-reaction provenance tied to the same exposed weak-coupling-triad domain;
4. pass the null-result residual in [Failure Criteria](../validation/failure-criteria.md#null-result-residual-for-added-channels) for any predicted non-baseline channel.

Single-medium source-of-interactions models are useful here only as a mode-taxonomy warning. They show how one ground-state medium picture can try to generate scalar, vector, and tensor bosons as collective excitations, but they also show the closure burden this creates. For a candidate observer-level boson channel $b$, define the comparison record
$$
\mathcal{M}_b^\theta
=
\left(
J_b^\theta,\,
P_b^\theta,\,
m_b^\theta,\,
\omega_b^\theta(k),\,
\mathcal{C}_b^\theta
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-e6f37b5a2cb4360c)

where $J_b^\theta$ is the recovered spin label, $P_b^\theta$ the parity or transverse/longitudinal projector record when applicable, $m_b^\theta$ the mass or gap, $\omega_b^\theta(k)$ the dispersion, and $\mathcal{C}_b^\theta$ the coupling ledger to fermion, photon, weak, color, or gravitational channels. A collective-mode interpretation is admissible only when one Noether sea state and assembly branch supplies $\mathcal{M}_b^\theta$ while also suppressing unobserved scalar, vector, tensor, mirror, or hidden channels. Otherwise "boson as excitation" is an analogy, not gauge-structure emergence.

## Gauge-Covariance Recovery Target

The Standard Model gauge equations are comparison constraints on the effective record, not evidence for primitive continuum gauge fields in the substrate. A successful emergence map must recover the covariance structure of a connection and curvature after coarse-graining causal wakes, axial-layer bookkeeping, and Noether sea response into observer-level variables. For a declared low-energy branch $\theta$, choose a smooth effective chart $x_{\mathrm{eff}}^\mu$, a unitary representation, and a fixed nonzero coupling $g_\theta$ at one renormalization scale. The effective coordinates come from a declared clock, ruler, and apparatus map of $(T,\mathbf X)$; they are not substrate four-coordinates. Write the effective comparison operators as
$$
D_\mu^\theta=\partial_{x_{\mathrm{eff}}^\mu}-i g_\theta A_{\mathrm{eff},\mu}^\theta,
\qquad
F_{\mu\nu}^\theta=\frac{i}{g_\theta}[D_\mu^\theta,D_\nu^\theta]
$$

[View →](../../../../equation-mapping.html#corpus-equation-df1219703d066871)

At each effective point the representation space is the fiber, and a bundle is the collection of these spaces with compatible changes of basis on chart overlaps. Neither the fibers nor their gluing are additional material contents. Their reconstruction from the same history remains open. Define $D^{\theta,U}$ and $F^{\theta,U}$ as the transformed chart representatives of the same physical branch. If $U(x_{\mathrm{eff}})$ is an allowed smooth unitary relabeling, then
$$
\Psi_\theta' = U\Psi_\theta,
\qquad
D_\mu^{\theta,U}\Psi_\theta'=U D_\mu^\theta\Psi_\theta,
\qquad
F_{\mu\nu}^{\theta,U}=U F_{\mu\nu}^\theta U^{-1}
$$

[View →](../../../../equation-mapping.html#corpus-equation-1f0df80ad99c0dd6)

Expanding the middle equality gives the connection rule $A_\mu^{\theta,U}=U A_\mu^\theta U^{-1}+(i/g_\theta)U\partial_{x_{\mathrm{eff}}^\mu}U^{-1}$, where $A_\mu^\theta$ abbreviates $A_{\mathrm{eff},\mu}^\theta$. This is a conditional algebraic consequence of covariance, not a derivation of the allowed relabelings from assemblies. Writing a connection that obeys this rule tests consistency of the effective chart; physical recovery also requires its independent reconstruction from the branch record.

The passive/active distinction is load-bearing here. A gauge relabeling is passive when it changes only the effective bookkeeping basis and leaves the retained assembly, causal-wake, axial-layer, and Noether sea record fixed. An active physical change belongs in the branch record $\theta$ itself: it may alter medium response, exposed axial inventory, apparatus coupling, or causal-wake provenance. Gauge covariance is recovered only when passive relabelings preserve the same record. It cannot be used to hide a changed physical branch behind a different chart.

A compact residual for the comparison is
$$
\mathcal{R}_{\mathrm{cov}}(\theta;U)
=
\sup_{\Psi\in\mathcal{D}_\theta}
\frac{
\left\|
D^{\theta,U}(U\Psi)-U D^\theta\Psi
\right\|
}{
\left\|D^\theta\Psi\right\|+\varepsilon_{\mathrm{op}}
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-8940befe85a0dceb)

Here $\mathcal D_\theta$ is a declared family of smooth test sections with fixed boundary conditions and bounded norm, and $U\mathcal D_\theta$ is the corresponding family in the transformed chart. The norm is fixed on the same effective window; $\varepsilon_{\mathrm{op}}>0$ has the units of $\|D^\theta\Psi\|$. The electroweak or color branch passes this covariance test only when the dimensionless residual stays below its declared tolerance on the record used for charge, chirality, mixing, and null-channel tests. If covariance appears only after changing the physical branch ledger, the construction has not recovered gauge redundancy; it has renamed a different physical state.

The same discipline applies to holonomy. For a closed observer-level loop $\gamma$, the non-Abelian comparison object is
$$
W_\gamma^\theta
=
\operatorname{Tr}\,
\mathcal{P}
\exp\!\left(
i g_\theta\oint_\gamma A_{\mathrm{eff},\mu}^\theta\,dx_{\mathrm{eff}}^\mu
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-53b01f7c197128b8)

Here $\mathcal P$ orders the matrices along the loop and $\operatorname{Tr}$ is the trace in the declared representation. Patch transition matrices are included when the loop crosses chart boundaries. Parallel transport transforms by endpoint basis changes; at a closed loop these act by conjugation, leaving the trace invariant. The exponent is dimensionless, so $g_\theta A_{\mathrm{eff},\mu}^\theta dx_{\mathrm{eff}}^\mu$ has no units. This Wilson-loop language tests gauge-invariant loop content. In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, the loop value must be reconstructed from the closed causal-wake and axial-layer provenance sampled by the apparatus channel. It is not a claim that the loop integral is fundamental ontology.

Topological sectors require additional global assumptions. For an effective $SU(N)$ bundle over a closed oriented four-dimensional comparison manifold $\mathcal X_\theta$, use Hermitian generators with $\operatorname{tr}(T_aT_b)=\delta_{ab}/2$ in the fundamental representation. Define the curvature two-form $F^\theta=\tfrac12F_{\mu\nu}^\theta dx_{\mathrm{eff}}^\mu\wedge dx_{\mathrm{eff}}^\nu$. The normalized connection is $g_\theta A^\theta$ and its curvature is $g_\theta F^\theta$, so the characteristic number in this orientation convention is
$$
k_\theta
=
\frac{g_\theta^2}{8\pi^2}
\int_{\mathcal X_\theta}
\operatorname{tr}\!\left(F^\theta\wedge F^\theta\right),
\qquad
\mathcal{R}_{\mathrm{top}}(\theta)
=
\inf_{N\in\mathbb{Z}}
\left|k_\theta-N\right|
$$

[View →](../../../../equation-mapping.html#corpus-equation-2c0fbae2c6d5f3b8)

Integer-valuedness here is conditional on the stated bundle, trace, and global domain. An arbitrary finite apparatus window need not give an integer; a domain with boundary or a noncompact domain requires a specified boundary completion or compactification before this test applies. No such completion is supplied by the Euclidean void alone. Physical recovery requires the admissible sector and its connection to be reconstructed from the same branch record, not inserted as an independent topological label. The comparison normalization and boundary assumptions follow [Tong's Yang–Mills notes](https://www.damtp.cam.ac.uk/user/tong/gaugetheory/2ym.pdf), sections 2.1.1 and 2.3.

The same topological-sector map must recover the strong-$CP$ null result. Let $\bar\theta_{\mathrm{eff}}(\theta)\in[-\pi,\pi]$ be the principal representative of the observer-level $CP$-odd strong-sector angle, including the quark-mass phase contribution, extracted from the declared assembly and Noether sea branch. The target is

$$
\mathcal{R}_{\mathrm{strong}\text{-}CP}(\theta)
=
\left|\bar\theta_{\mathrm{eff}}(\theta)\right|
\lesssim
10^{-10},
$$

[View →](../../../../equation-mapping.html#corpus-equation-ae4e1b4fb0497a92)

at the neutron-electric-dipole comparison scale, with the hadronic matrix-element uncertainty retained. This is the order-of-magnitude bound inferred from the neutron electric dipole limit under the strong-angle interpretation, as reviewed by the [Particle Data Group](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-axions.pdf), not a directly measured angle or a substrate premise. The extraction must also join the kaon twist-phase row in [Mesons](./mesons/mesons.md#cpphase-hook-kaons): the same $CP$-odd contribution cannot be counted once as a strong-sector angle and again as an independently fitted weak-sector phase.

## Scattering-Amplitude Comparison Target

Gauge recovery also has a scattering side. Standard perturbative QFT packages interactions into amplitudes with physical poles, residues, color factors, and numerator identities. In this framework those amplitudes are comparison-layer summaries of finite event windows. The branch ledger must still carry the participating assemblies, causal wakes, transient channel, Noether sea exchange, recoil, and final records.

For a channel $I$ with intermediate invariant $P_I^2$, the observer-level amplitude extracted from branch $\theta$ should factorize at a physical pole:
$$
\mathcal{A}_{n,\theta}
\xrightarrow{P_I^2\to m_h^2}
\sum_h
\mathcal{A}_{L,\theta}^{(h)}
\frac{i}{P_I^2-m_h^2+i0}
\mathcal{A}_{R,\theta}^{(h)}
+\mathcal{A}_{\mathrm{reg},\theta}
$$

[View →](../../../../equation-mapping.html#corpus-equation-e6f8542bcb5cf0dd)

This equation is a locality-emergence test. It says that a boundary of the event-window description must reduce to two lower-channel records connected by the same accepted transient channel $h$. If the pole residue cannot be traced to a replayable branch-boundary decomposition, the amplitude has been fitted but not derived.

Color/kinematics duality supplies a sharper optional comparison. Whenever an oriented color triple satisfies a Jacobi relation, the corresponding kinematic numerators should satisfy the matched relation on a closed representation,
$$
c_i+c_j+c_k=0
\quad\Longrightarrow\quad
n_i^\theta+n_j^\theta+n_k^\theta\to0
$$

[View →](../../../../equation-mapping.html#corpus-equation-4cd36298b163af16)

The native value of this test is not the formal identity by itself. The value is whether the indexed color-exceptionality relation $Q_1+Q_2+Q_3=0$ and the scattering numerator ledger can be derived as two projections of the same branch geometry.

Positive-geometry amplitude work adds one more useful guardrail. If an amplitude is represented by a positive-coordinate auxiliary geometry, then physical boundaries should carry the factorization residues above, while spurious cell boundaries should cancel in the sum. In native terms, a positive-geometry chart is admissible only as a certificate for boundary factorization, spurious-pole cancellation, and record-domain consistency. It does not replace the causal-wake and assembly derivation.

## Higgs Mechanism and VEV Reinterpretation

The Higgs sector supplies an observer-level comparison for a proposed Noether sea response. Its scalar order parameter, meaning a collective variable that distinguishes the effective electroweak state, must be reconstructed rather than equated with medium occupancy.

The Standard Model recovery sequence is still important. In the effective field description, a massless comparison field has no minimum-frequency gap; a restoring term traced to potential curvature creates the same equation structure as a massive quantum. The Higgs mechanism then adds the critical step: a field that would be massless on its own acquires an effective mass term when it couples to a scalar background with nonzero vacuum expectation value. The Higgs boson itself is the small quantized fluctuation around that background, and its observed mass probes the curvature of the Higgs potential at the selected resting value. In $\mathbb{A}\mathbb{A}\mathbb{A}$, that whole packet is a recovery target for the electroweak comparison layer. It is not evidence that the Euclidean void has density, not a replacement for the mass-map derivation, and not a claim that all observed mass comes from the Higgs sector; composite hadron masses remain tied to color-corridor closure, binding, shielding, and Noether sea response.

- **VEV (vacuum expectation value):** In a fixed effective gauge chart, a scalar expectation value represents the electroweak background. A sea variable is a candidate proxy only after its transformation law, normalization, and gauge-invariant response are recovered. Nonzero number density alone does not imply a nonzero Higgs order parameter: a populated medium can have zero average of an oriented or signed collective variable.
- **Symmetry breaking:** Electroweak phase-transition language is a comparison target. A proposed medium history must derive the corresponding change of effective response; neither a stable sea branch nor its transition dynamics follows from the gauge notation.
- **Mass as medium-dressed response:** The mass hypothesis relates assembly inertia to exposed internal history and reversible sea response. The planar photon construction and the response of massive assemblies remain separate recovery targets; this chapter supplies no retained photon or fermion branch. A dissipative drag coefficient cannot replace the inertial response in [Particle Masses: Emergent Inertia in the Noether Sea](particle-masses.md).

## Resolving the Unruh Ambiguity

In the standard flat-spacetime comparison, a uniformly accelerated detector coupled for sufficiently long to the Minkowski vacuum has a thermal response under the stated detector-model assumptions. Inertial and accelerated descriptions agree on the excitation rate of that same detector even though their particle-mode descriptions differ; see [Crispino, Higuchi, and Matsas](https://arxiv.org/abs/0710.5373), section III.1. This is not a contradiction over whether a recorded detector excitation occurred, and it is distinct from the Hawking comparison in curved spacetime.

In $\mathbb{A}\mathbb{A}\mathbb{A}$, assemblies retain definite substrate histories. The proposed explanation is that accelerated detector constituents sample different delayed wake histories and medium couplings. Thermal response does not follow from acceleration alone: the proposal must recover excitation and de-excitation rates over a declared detector gap, trajectory, switching window, and sea state, including energy supplied by the accelerating apparatus. Claim grade: guessed for this mechanism. A mismatch with the standard detector response in its declared comparison regime would falsify that recovery; this chapter supplies no such rate calculation or experimental discriminator.

## Quantization from Stability (Selection Rules)

Why do observer-level electric charges appear in units of $e/3$?
*   The Standard Model's fermion representation table has charges in multiples of $|e|/3$. The $\mathbb{A}\mathbb{A}\mathbb{A}$ proposal is to recover that table through dynamical selection of a six-unit polarity inventory, with the six-site axial layer as a candidate realization.
*   **Stability Selection:** Protection of six slots and exclusion of competing inventories are open dynamical claims. The complete-state perspective supplies the histories to test them; it does not prove that other clusters collapse or disperse.
*   **The Survivors:** Specific geometric configurations of six sign-carrying units are candidate stable resonances where attractive and repulsive accelerations balance through the assembly branch. In the axial-layer realization these appear as six-pole axial patterns supported by a candidate Noether braid; this construction does not assign a taxonomy member. The local combinatorics reproduce the observed charge set; dynamical exclusion of non-SM stable assemblies remains part of the closure burden.

**SM Charge Quantization ($\mathbb{A}\mathbb{A}\mathbb{A}$: Six $\epsilon$ Polarity Slots)**

| split | electrinos | positrinos | net observer-level charge |
|:-----:|:----------:|:----------:|:------------------:|
| polarity label |   $-\epsilon$   |   $+\epsilon$   |        units of $|e|$         |
|     6:0     |         6         |         0         |           $-1$           |
|     5:1     |         5         |         1         |          $-2/3$          |
|     4:2     |         4         |         2         |          $-1/3$          |
|     3:3     |         3         |         3         |            0           |
|     2:4     |         2         |         4         |          +1/3          |
|     1:5     |         1         |         5         |          +2/3          |
|     0:6     |         0         |         6         |           +1           |

Under the six-unit polarity inventory target, sweeping all electrino:positrino splits across the six retained slots yields exactly the Standard Model charge values listed in the table above and no other total charge values within that fixed six-unit inventory. The six-site axial-layer hypothesis is one geometric realization of those slots. Dynamical exclusion of non-Standard-Model stable assemblies remains a separate closure burden.

### Combinatorial Proof (Six $\pm\epsilon$ Slots)

**Proposition (conditional, derived).** Suppose the observer-level charge is the sum of exactly six retained polarity slots, each occupied by $+\epsilon$ or $-\epsilon$, with $\epsilon=|e|/6$. Then the charge can only be
$$
\{-|e|,-2|e|/3,-|e|/3,0,+|e|/3,+2|e|/3,+|e|\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-4defcf4679ebcd5e)

**Proof.** Let $N_+$ be the number of $+\epsilon$ slots and $N_-$ the number of $-\epsilon$ slots. Then
$$
N_+ + N_- = 6,\qquad N_+,N_- \in \{0,1,\dots,6\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-cc4af1db2fb4e01f)

The net observer-level charge carried by the six-slot inventory is
$$
Q=\epsilon(N_+ - N_-)
$$

[View →](../../../../equation-mapping.html#corpus-equation-426c0f692b15e8a3)

Using $N_-=6-N_+$,
$$
Q=\epsilon(2N_+ - 6)=\frac{|e|}{3}(N_+ - 3)
$$

[View →](../../../../equation-mapping.html#corpus-equation-e5052cd60fa821c3)

Since $N_+$ is an integer from $0$ to $6$, $(N_+-3)\in\{-3,-2,-1,0,1,2,3\}$, so
$$
Q\in\left\{-|e|,-\frac{2|e|}{3},-\frac{|e|}{3},0,\frac{|e|}{3},\frac{2|e|}{3},|e|\right\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-fc9c725b3a71b1d7)

No other values are possible under these assumptions. Permutations with the same $(N_+,N_-)$ have identical summed $Q$, although their dynamics can differ. The proposition proves a finite-inventory identity, not stability, a unique geometry, the measured charge-projection law, hypercharge assignments, or exclusion of other inventories. A six-slot sign assignment with a different sum would refute the algebra; an admitted physical branch whose measured charge is not this sum would instead refute the proposed projection.

### Loop-Phase Quantization Target

Dirac's monopole argument concerns global compatibility of electric charge with an effective connection. It does not require the physical phase of every loop to vanish. For the electromagnetic sector, use the dimensionful normalization in which $Q\oint A_{\mathrm{eff}}/\hbar$ is dimensionless; this differs from absorbing the coupling into a matrix connection. If a closed observer-level loop $\gamma$ bounds a surface $S$ on which a smooth single-patch potential exists, ordinary Stokes' theorem gives
$$
\Theta_\gamma(Q)
=
\frac{Q}{\hbar}\oint_\gamma A_{\mathrm{eff}}\cdot d\ell
=
\frac{Q}{\hbar}\int_S F_{\mathrm{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-b7971fadbf8c5a5b)

where $F_{\mathrm{eff}}=dA_{\mathrm{eff}}$ is the electromagnetic curvature two-form and $\hbar$ is the effective action-to-phase normalization. The invariant is the phase factor, with only the representative ambiguity
$$
\exp(i\Theta_\gamma(Q))
=
\exp(i[\Theta_\gamma(Q)+2\pi N_\gamma]),
\qquad N_\gamma\in\mathbb Z
$$

[View →](../../../../equation-mapping.html#corpus-equation-3cbabbd3e60c1476)

Nontrivial values of this phase factor are permitted and are required by the [Aharonov–Bohm comparison](gauge-symmetries.md#aharonov-bohm-holonomy-benchmark). If no spanning surface lies in the chart domain, use the connection holonomy directly, including patch transitions. For two admissible spanning surfaces, consistency requires $Q\int_C F_{\mathrm{eff}}/(2\pi\hbar)\in\mathbb Z$ on the closed two-cycle $C=S_1\cup(-S_2)$; it does not quantize arbitrary open-surface flux. This distinction is developed in [Tong's gauge-theory notes](https://davidtong.org/pdfs/teaching/gauge-theory/gauge1.pdf), sections 1.1.1–1.1.2.

Let $\Theta_{\mathrm{wake},\gamma}^\theta(Q)$ be the phase independently extracted from the declared wake and apparatus histories, and $\Theta_\gamma^{\mathrm{conn},\theta}(Q)$ the phase computed from the effective connection. A comparison residual for the six-slot charge set is
$$
\mathcal{R}_{\mathrm{loop}\text{-}Q}
=
\max_{Q\in\{-|e|,-2|e|/3,-|e|/3,0,|e|/3,2|e|/3,|e|\}}
\inf_{N_\gamma\in\mathbb{Z}}
\left|
\Theta_{\mathrm{wake},\gamma}^\theta(Q)
-\Theta_\gamma^{\mathrm{conn},\theta}(Q)
-2\pi N_\gamma
\right|
$$

[View →](../../../../equation-mapping.html#corpus-equation-f64b6fdc10e1e4e1)

Require this dimensionless residual to stay below a declared phase tolerance $\varepsilon_{\mathrm{loop}\text{-}Q}$ for every loop in the benchmark family, together with the applicable closed-cycle charge-compatibility condition. Computing both phases from the same fitted potential only checks repeatability. Recovery requires independently obtained phase records from the same physical branch that also supplies electromagnetic response. Even a passing comparison leaves six-slot selection and global gauge topology as distinct obligations.

A magnetic-charge comparison branch must also separate formation from capture. In observer-level language a magnetically charged compact object can form with charge or later capture charged defects. The $\mathbb{A}\mathbb{A}\mathbb{A}$ gauge map should not import either story as ontology, but it can retain the provenance distinction as a residual on the effective flux record:
$$
Q_{m,\mathrm{eff}}^\theta(t_{\mathrm{eff}})
=
Q_{m,\mathrm{form}}^\theta
+
\int_{t_{\mathrm{form}}}^{t_{\mathrm{eff}}}
\Gamma_{m,\mathrm{cap}}^\theta(t'_{\mathrm{eff}})\,dt'_{\mathrm{eff}}
-
\int_{t_{\mathrm{form}}}^{t_{\mathrm{eff}}}
\Gamma_{m,\mathrm{loss}}^\theta(t'_{\mathrm{eff}})\,dt'_{\mathrm{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-633c706466aa96f1)

The loop-phase target above then requires the same branch record to support both the effective magnetic-flux label and the allowed electric axial-layer charge set. A compact object that solves a monopole-abundance problem by hiding charge in an untracked capture channel has not recovered gauge structure; it has moved the charge ledger outside the derivation.

## Observer-Level Electroweak Closure Map (Working)

In this map, electroweak "breaking" means a stabilizer and mass-coordinate recovery problem for the effective gauge chart. It does not mean that gauge redundancy is a primitive substrate symmetry that literally breaks. The substrate task is to derive the observer-level photon, $W^\pm$, $Z$, charge, and weak-mixing records from one branch state while preserving the gauge-invariant record of measured reactions.

To connect microdynamics to observer-sector electroweak equations, start from the canonical acceleration-first Master Equation. For receiver $r$ and transmitter $t$,

$$
\mathbf A_{r\leftarrow t}(T_r;T_t)
=
\kappa\,\sigma_{tr}\,
\frac{|q_tq_r|}{r^2(T_r;T_t)}
W_{r\leftarrow t}^{\mathrm{acc}}(T_r;T_t)\,
\hat{\mathbf r}_t(T_r;T_t),
$$

[View →](../../../../equation-mapping.html#corpus-equation-00b33fb2b6839ff5)

with

$$
\mathbf A_r(T_r)
=
\sum_t
\sum_{T_t\in\mathcal C_{r\leftarrow t}(T_r)}
\mathbf A_{r\leftarrow t}(T_r;T_t),
\qquad
W_{r\leftarrow t}^{\mathrm{acc}}
=
\frac{c_f}{\left|c_f-\mathbf V_t(T_t)\cdot\hat{\mathbf r}_t\right|}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-3b2c182162c7f8c8)

Here $\mathcal C_{r\leftarrow t}(T_r)$ contains every retained emission time $T_t<T_r$ satisfying $r=\|\mathbf X_r(T_r)-\mathbf X_t(T_t)\|=c_f(T_r-T_t)$; $\hat{\mathbf r}_t$ points from emission to reception, and $\sigma_{tr}=\operatorname{sign}(q_tq_r)$. The transmitter sum includes same-transmitter self-hits whenever admitted. These sharp-root formulas require positive separation, nonzero $D_t=c_f-\mathbf V_t\cdot\hat{\mathbf r}_t$, and a convergent complete root sum. A caustic or unresolved tail requires the separate treatment in the [Master Equation](../dynamics/master-equation.md#the-master-equation-canonical-form). The effective action below is a recovery target to be derived from these histories, not an already-derived action or a substrate premise.

Fast-mode averaging requires probe frequencies and spatial variation scales separated from the retained internal frequencies and sizes. Compare frequencies only after both have been mapped to the same effective clock, for example $\Omega_{\mathrm{probe}}^{\mathrm{eff}}\ll\Omega_{\mathrm{fast}}^{\mathrm{eff}}$. This separation does not by itself derive a local action. In a nearly flat effective chart, a chiral electroweak comparison density is
$$
\mathcal{L}_{\text{eff}}
=
\sum_\chi\bar{\psi}_\chi i\gamma^\mu D_\mu^{(\chi)}\psi_\chi
-\frac{1}{4}\mathcal{F}_{\mu\nu}\mathcal{F}^{\mu\nu}
-\frac{1}{4}\mathcal{W}_{\mu\nu}^a\mathcal{W}^{a\mu\nu}
+(D_\mu H)^\dagger D^\mu H-V(H)
+\mathcal L_{\mathrm{Yukawa}}
+\mathcal{L}_{\text{comp}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7e073514a964601a)

with representation-dependent derivative
$$
D_\mu^{(\chi)}=\partial_{x_{\mathrm{eff}}^\mu}-i g T_\chi^a W_\mu^a-i g'\frac{Y_\chi}{2}B_\mu
$$

[View →](../../../../equation-mapping.html#corpus-equation-cd2f81d27ae52b9b)

The index $\chi$ labels the chiral fermion multiplets: $T_\chi^a=\tau^a/2$ on left-handed weak doublets and zero on right-handed singlets, with the appropriate dimensionless hypercharge $Y_\chi$. The $\tau^a$ are Pauli matrices; $\gamma^\mu$ and the barred spinors are the effective Dirac algebra and adjoint. $\mathcal F=dB$ is hypercharge curvature, $\mathcal W$ is weak curvature, and $H$ is an effective Higgs doublet of hypercharge $+1$. Its potential $V(H)$ and gauge-invariant Yukawa interactions must be included to generate masses; a bare matrix joining inequivalent left- and right-handed representations does not preserve electroweak covariance. For example, $\bar L H e_R$ is invariant because its hypercharges sum to $+1+1-2=0$. Color and the specified neutrino-mass completion require their own terms. These are comparison fields and couplings, not primitive architrino variables.

Use natural units $\hbar_{\mathrm{eff}}=c_{\mathrm{eff}}=1$ for this effective action and the following operator expansion, without identifying the effective clock or speed with $T$ or $c_f$. In four effective dimensions a fermion has mass dimension $3/2$, a scalar dimension $1$, and a curvature dimension $2$. Composite corrections therefore take the conditional form
$$
\mathcal{L}_{\text{comp}}
=
R_{\mathrm{comp}}^2\sum_i C_i\,\mathcal O_i^{(6)}
+R_{\mathrm{comp}}^4\sum_j C_j^{(8)}\,\mathcal O_j^{(8)}
+\cdots
$$

[View →](../../../../equation-mapping.html#corpus-equation-d62995ddba0279d8)

Here $R_{\mathrm{comp}}$ is a length extracted from the branch, $\mathcal O_i^{(d)}$ is an effective gauge-invariant operator of mass dimension $d$, and each $C_i$ is a dimensionless matching coefficient. Thus each displayed term has mass dimension four. The displayed dimension-six and dimension-eight terms are an illustrative sector; other allowed operator dimensions, including neutrino-mass terms, are not excluded. The operator set, symmetry restrictions, and coefficients remain to be derived; covariance alone fixes neither a unique leading correction nor its numerical coefficient.

For the formal closure layer beneath this working map, see [Gauge Symmetries](./gauge-symmetries.md) and [Effective Lagrangian](../dynamics/effective-lagrangian.md).

### Parameter Dictionary (Substrate -> Electroweak)

Use the charge-bookkeeping identity:
$$
|e|=6\epsilon
$$

[View →](../../../../equation-mapping.html#corpus-equation-3be08633ce7cc70b)

This is separate from the dimensionful electromagnetic coupling normalization used by the force-response map:
$$
\mathcal{G}_{\mathrm{em}}
=
6\epsilon \sqrt{\kappa c_f}\,Z_e
$$

[View →](../../../../equation-mapping.html#corpus-equation-48c6c52b7fdbbf12)

where $Z_e$ is the coarse-graining normalization factor ($Z_e=1$ under canonical normalization choice). In dimensional units $\mathcal{G}_{\mathrm{em}}$ scales as $[\epsilon]\sqrt{[\kappa][c_f]}$ rather than as electric charge, so it must not be identified with the charge label $e$.

Weak mixing is represented as a geometric overlap functional:
$$
\sin^2\theta_W
=
\frac{g'^2}{g^2+g'^2}
=
\mathcal{O}_{\text{shield}}+\Delta_{\text{wake}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-370d941b7462b1c3)

Claim grade: guessed for the assembly-side equality $\mathcal O_{\mathrm{shield}}+\Delta_{\mathrm{wake}}$, where the terms denote a dimensionless exposure overlap and wake correction to be extracted. Their sum must lie between zero and one and match a specified effective weak-angle convention without separate fitting. The branch-increment hypothesis and its falsifier are developed in [Weak Mixing Angle](fermions/weak-mixing-angle.md).

For a single effective Higgs doublet with the standard kinetic normalization, let $v_{\text{eff}}$ be the background magnitude defined in a fixed gauge by $\langle H\rangle=(0,v_{\text{eff}}/\sqrt2)^{\mathsf T}$. The tree-level mass comparison is
$$
m_W^2=\frac{1}{4}g^2 v_{\text{eff}}^2,\qquad
m_Z^2=\frac{1}{4}(g^2+g'^2)\,v_{\text{eff}}^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-063e3ef562bf5d9c)

so at that order
$$
\frac{m_W}{m_Z}=\cos\theta_W
$$

[View →](../../../../equation-mapping.html#corpus-equation-eba4396e8d774cc4)

The angle defined by $g'/g$ at a running scale and the on-shell angle defined from the measured mass ratio require a renormalization and radiative-correction map before precision comparison. The tree-level formulas are not exact identities between all reported weak angles and pole masses.

For a candidate fermion assembly $A_f$, the mass target follows the scalar roadmap of the mass chapter:
$$
m_f \approx
\alpha_{\mathrm m}\,
\frac{\zeta(A_f)E_{\mathrm{internal}}(A_f)}{c_{\mathrm{eff}}^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-599f68fccc5a7ce8)

Here $E_{\mathrm{internal}}$ is the closed internal branch-energy record, $\zeta$ its exposed fraction, and $\alpha_{\mathrm m}$ the single reference normalization for a weak homogeneous regime. These are not primitive architrino kinetic masses or a proved conserved two-body potential. Their extraction, branch persistence, and the sharper medium-response tensor remain the obligations of [Particle Masses: Emergent Inertia in the Noether Sea](particle-masses.md).

### Precision Interface to Measured Quantities

The closure observables are:
$$
\sin^2\theta_W(m_Z),\quad \frac{m_W}{m_Z},\quad a_e,\quad a_\mu,\quad \sigma(e^+e^-\to\mu^+\mu^-;s)
$$

[View →](../../../../equation-mapping.html#corpus-equation-ec0acaa07cedffc1)

The anomalous magnetic moment $a_\ell=(g_{\ell,\mathrm{mag}}-2)/2$ is dimensionless; $g_{\ell,\mathrm{mag}}$ is the measured magnetic response factor, not the weak coupling $g$. The following correction is a phenomenological ansatz, with undetermined dimensionless coefficient $\mathcal C_\ell$:
$$
a_\ell^{\text{model}}
=
a_\ell^{\text{SM,ref}}
+\mathcal{C}_\ell\,(m_\ell R_{\mathrm{comp}})^2
+O\!\left((m_\ell R_{\mathrm{comp}})^4\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-38faea55c5a79327)

In the same effective natural units, a separate illustrative ansatz for lepton-pair production is
$$
F(s)=1-\frac{sR_{\mathrm{comp}}^2}{4},
\qquad
\sigma_{\text{model}}(s)=\sigma_{\text{SM}}(s)\,|F(s)|^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-f636e3e786ad8dd5)

Here $s$ is the squared center-of-mass energy, and this chosen $F(s)$ multiplies the full comparison amplitude. Its coefficient $1/4$ and common multiplication of photon and weak channels are assumptions, not consequences of gauge covariance or of the magnetic-moment ansatz. Use it only for $sR_{\mathrm{comp}}^2\ll1$; omitted amplitude terms start at order $(sR_{\mathrm{comp}}^2)^2$ under this analytic expansion. Near the $Z$ pole a physical comparison also needs the channel couplings, width, interference, and radiative corrections.

For a numerical illustration we use normalized wake-speed units $c_f=1$; the independent effective-unit conversion is $\hbar_{\mathrm{eff}}c_{\mathrm{eff}}=1.973269804\times10^{-16}\,\mathrm{GeV\,m}$. Substitution into the chosen ansatz gives $\Delta\sigma/\sigma=-sR_{\mathrm{comp}}^2/2+s^2R_{\mathrm{comp}}^4/16$. At $R_{\mathrm{comp}}=10^{-19}\,\mathrm m$ this is approximately $-1.44\times10^{-5}$ at $10.58\,\mathrm{GeV}$ and $-1.07\times10^{-3}$ at $91.19\,\mathrm{GeV}$. At the latter energy, $R_{\mathrm{comp}}=3\times10^{-20}\,\mathrm m$ gives approximately $-9.61\times10^{-5}$. These are derived values of the stipulated polynomial, not measured deviations or a derived composite radius. The $10^{-3}$ threshold below is an illustrative test tolerance, not an experimental confidence bound.

### Falsification Gates for This Map

1. Under the stated common-radius ansatz and fixed matching coefficients, a magnetic-moment fit that exceeds the illustrative $10^{-3}$ cross-section tolerance fails that benchmark. Experimental exclusion requires the actual channel data, uncertainties, and electroweak corrections; an adjustable $\mathcal C_\mu$ does not by itself determine $R_{\mathrm{comp}}$.
2. A branch that violates the scale-separation or nonresonance assumptions of its chosen averaging procedure cannot use that reduction as electroweak or Lorentz recovery evidence; another controlled reduction would require its own derivation.
3. If charge reconstruction from six-pole averaging acquires group-velocity-dependent leakage (non-integer multiples of $e/3$), the quantization map fails.
4. If the map predicts additional stable charged fermions, unsuppressed partner channels, proton-instability corridors, extra gauge modes, or other non-baseline observables above null-result bounds, the added structure is not a closed unification result.

## Source Notes

David Tong, *Lectures on Gauge Theory* (2018), sections 1.1.1–1.1.2 and 2.1.1, 2.3, supplies the comparison distinction between holonomy, closed-cycle flux compatibility, and normalized characteristic numbers. These mathematical conditions constrain an effective reconstruction; they do not supply its substrate mechanism.

J. de Blas, S. Dittmaier, and R. Kogler, [*Electroweak Model and Constraints on New Physics*](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-standard-model.pdf), Particle Data Group, 2025 review, sections 10.1–10.2 and 10.4.5, identifies the chiral multiplets, Higgs comparison, and scheme-dependent weak-angle definitions used here. The separate [PDG axion review](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-axions.pdf), section 89.2.1, supports the stated strong-angle bound and its hadronic interpretation.

L. C. B. Crispino, A. Higuchi, and G. E. A. Matsas, *The Unruh Effect and Its Applications* (2008), [arXiv:0710.5373](https://arxiv.org/abs/0710.5373), section III.1, supports agreement of the two descriptions on the same detector response. It does not establish the proposed Noether sea mechanism.

The numerical unit conversion uses the [NIST 2022 CODATA value of the reduced Planck constant times light speed](https://physics.nist.gov/cgi-bin/cuu/Value?hbcmevf). It belongs to the observer-level comparison, not the primitive wake-speed postulate.
