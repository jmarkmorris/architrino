# Gauge Symmetries

This chapter provides a minimal theorem-backed bridge from architrino/assembly dynamics to the effective gauge symmetry structure used elsewhere.

Interface chapters:
- Electroweak emergence narrative: [gauge-structure-emergence](./gauge-structure-emergence.md)
- Color SU(3) algebra closure: [color-charge-su3](../assemblies/fermions/color-charge-su3.md)
- Variational substrate: [effective-lagrangian](../dynamics/effective-lagrangian.md)

## Regularized Setting

Work in the $\eta>0$ regularized regime, with coarse-grained fields obtained from the same kernel used in the master/effective-action chapters.

Assume:
- **(G1)** Existence of coarse-grained matter field $\Psi$ and finite-energy histories on bounded windows.
- **(G2)** Action density depends on $\Psi$ only through $\Psi$, $\partial_\mu\Psi$, and symmetry-compatible contractions.
- **(G3)** Color axis-exceptionality space is $\mathcal{H}^{\text{color}}\cong\mathbb{C}^3$.
- **(G4)** Weak-coupling triad is a local two-state channel at each point (effective doublet sector).

## Standard Model Recovery Gate

The gauge bridge is allowed to use the language of connections and covariant derivatives because those are the tested observer-level structures. It is not allowed to promote a larger symmetry, extra sector, or hidden channel merely because that larger package contains the Standard Model as a subcase. The first recovery target is the low-energy effective gauge record

$$
\mathcal{G}_{\mathrm{SM}}^{\mathrm{eff}}
=
U(1)_Y\times SU(2)_L\times SU(3)_c,
\qquad
Q=T_3+\frac{Y}{2},
$$

together with the observed charge assignments, chiral weak couplings, anomaly cancellations, running couplings, and mixing data consumed by the fermion and reaction chapters. A compact residual for this chapter is

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
\right),
$$

where $d_{\mathrm{rep}}$ checks representation and charge bookkeeping, $d_{\mathrm{run}}$ checks the scale-dependent effective couplings, and $d_{\mathrm{chiral}}$ checks the weak-coupling-triad exposure record against observed charged-current handedness. This chapter's bridge is promotable only if

$$
\mathcal{R}_{\mathrm{gauge}}(\theta)\le\epsilon_{\mathrm{gauge}}
\qquad\text{and}\qquad
\mathcal{R}_{\mathrm{null}}(\theta)=0,
$$

with $\mathcal{R}_{\mathrm{null}}$ defined in [Failure Criteria](../validation/failure-criteria.md#null-result-residual-for-added-channels). Thus larger group unification, supersymmetry, Kaluza-Klein-style geometry, and similar constructions remain comparison frameworks unless an $\mathbb{A}\mathbb{A}\mathbb{A}$ branch record recovers the observed gauge sector while also suppressing every added observable channel from the same shared state variables.

### Gauge Redundancy and Anomaly Ledger

The effective gauge variables are redundant coordinates on an observer-level record. In the bridge theory, a gauge transformation must move within one physical equivalence class rather than between two distinct substrate states:
$$
A_\mu\sim A_\mu+\partial_\mu\alpha,\qquad
W_\mu\sim U W_\mu U^{-1}+\frac{i}{g_2}U\partial_\mu U^{-1},
\qquad
G_\mu\sim V G_\mu V^{-1}+\frac{i}{g_3}V\partial_\mu V^{-1}.
$$
This is why the chapter treats $A_\mu,W_\mu,G_\mu$ as effective connections. The substrate burden is not to find primitive gauge fields, but to recover one gauge-invariant record of forces, phases, holonomies, and charge ledgers from causal-wake and assembly histories.

Global symmetries and gauge redundancies have different tests. For a genuine global transformation $\delta\Psi=\epsilon X(\Psi)$, the regularized effective action gives a Noether current through
$$
\delta S_{\mathrm{eff}}
=
-\int d^4x\,\epsilon(x)\,\partial_\mu J^\mu,
\qquad
\partial_\mu J^\mu=0
$$
on solutions. In the quantum/effective bridge this becomes a Ward-identity recovery target for the coarse-grained generating functional. A local gauge redundancy, by contrast, is acceptable only if the unphysical directions are quotiented out and no anomalous gauge variation remains.

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
\right)_\theta .
$$
For the Standard Model recovery gate this vector must equal
$$
\mathcal{A}_{\mathrm{gauge}}(\theta)=(0,0,0,0,0,0).
$$
The second entry is the non-perturbative $SU(2)$ Witten check: the number of left-handed $SU(2)$ doublets must be even. Global anomalies that are part of known physics, such as axial-current violation and pion-to-photon anomaly matching, may be retained as observer-level recovery targets, but a gauge anomaly is a consistency failure rather than an optional correction.

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
\bigr),
$$

where $\mu$ is the observer-level probe scale and $\theta$ is the retained branch and constitutive record. The term $d_{\mathrm{run}}$ measures the distance between this output and the observed running record across a declared scale window; it is not permission to fit each sector independently at one reference energy.

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
\frac{g_i^2(\mu;\theta)}{4\pi}.
$$

This diagnostic is subordinate to $d_{\mathrm{run}}$ and $\mathcal{R}_{\mathrm{null}}$. A small $\Delta_{\mathrm{meet}}$ does not promote a grand-unified container unless the same branch record recovers the observed low-energy gauge record, reproduces the scale dependence, and explains the absence of mirror matter, superpartners, proton-instability channels, extra gauge bosons, hidden transport modes, and other non-baseline outputs in the tested regime.

For a proposed symmetry container $C$, a compact audit form is
$$
\mathcal{R}_{\mathrm{container}}(\theta;C)
=
w_g\mathcal{R}_{\mathrm{gauge}}(\theta)
+w_f\mathcal{R}_{\mathrm{fact}}(\theta)
+w_0\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}(\theta),
$$
where $\mathcal{R}_{\mathrm{fact}}$ measures failure of the recovered observer-level scattering and gauge sector to factor into the validated spacetime and internal-gauge records once those effective records exist. The container is only comparison language unless one shared $\theta$ drives all terms below tolerance; in particular, $\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}=0$ must follow from the accepted branch family rather than from sector-specific hiding parameters.

The same filter applies to especially elegant symmetry containers, including grand-unified and exceptional-group embeddings. It is not enough for a larger algebra to contain $U(1)_Y\times SU(2)_L\times SU(3)_c$ or to organize one generation of fermions. The promoted record must also explain why mirror matter, superpartners, proton-instability channels, extra gauge bosons, hidden transport modes, and other non-baseline outputs are absent in the tested regime. If those absences require separate masses, thresholds, compactification choices, or sector-specific suppressions, the construction remains a comparison framework rather than an $\mathbb{A}\mathbb{A}\mathbb{A}$ gauge closure.

## U(1) Sector

**Theorem 1 (Global phase invariance implies charge continuity).**  
If the effective action is invariant under
$$
\Psi \mapsto e^{i\alpha}\Psi,\qquad \alpha\in\mathbb{R},
$$
then there exists a conserved current $j^\mu$ such that
$$
\partial_\mu j^\mu=0.
$$

*Proof sketch:* Apply Noether's theorem in the regularized variational setting; invariance under constant phase shifts yields the continuity equation.

**Corollary (Local phase covariance requires a connection).**  
For local $\alpha(x)$, invariance requires a compensating field $A_\mu$ and covariant derivative
$$
D_\mu=\partial_\mu-i g_1 A_\mu,
$$
with $U(1)$ gauge transform
$$
\Psi\mapsto e^{i\alpha(x)}\Psi,\qquad
A_\mu\mapsto A_\mu+\frac{1}{g_1}\partial_\mu\alpha.
$$

### Aharonov-Bohm Holonomy Benchmark

The Aharonov-Bohm effect is the sharp U(1) benchmark because it separates local force from phase transport. The validated observable is not merely that an effective connection can be written, but that two force-free arms can accumulate a relative phase fixed by enclosed flux. In this chapter the benchmark is therefore a closure target for the emergent connection, not evidence that $A_\mu$ is substrate ontology.

For two interferometer arms $\gamma_1$ and $\gamma_2$ whose local force channel vanishes along the arms,
$$
\mathbf{F}_{\mathrm{eff}}\big|_{\gamma_1}
=
\mathbf{F}_{\mathrm{eff}}\big|_{\gamma_2}
=
\mathbf{0},
$$
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
\pmod{2\pi}.
$$
Here $\mathcal{S}_{\mathrm{wake}}[\gamma_a]$ is the effective action accumulated by the coarse-grained causal-wake history assigned to arm $\gamma_a$, and $\Phi_B$ is the standard enclosed magnetic-flux observable. A useful residual is
$$
\Delta_{\mathrm{AB}}
=
\sup_{\Phi_B}
\left|
\Delta\phi_{\mathrm{AB}}^{\mathbb{A}\mathbb{A}\mathbb{A}}(\Phi_B)
-
\frac{q_{\mathrm{eff}}}{\hbar}\Phi_B
\right|.
$$
When the benchmark is evaluated as a concrete interferometer packet, the force-free and phase requirements should be checked together rather than fitted separately. For a branch record $\theta$, one compact validation residual is
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
\right|,
$$
with $w_F$ and $w_\phi$ fixed by the declared interferometer tolerance. The benchmark passes only when $\mathcal{V}_{\mathrm{AB}}(\theta)\le\varepsilon_{\mathrm{AB}}$ for the same wake/action ledger, so a model cannot trade a hidden local force for phase recovery or tune the phase apart from the local electromagnetic-force record.

The U(1) closure passes this benchmark only if $\Delta_{\mathrm{AB}}$ remains below the declared interferometric tolerance while the same effective connection also preserves charge continuity and ordinary electromagnetic force recovery. If the phase recovery requires a local force on the arms, a separate phase fit, or a literal promotion of $A_\mu$ to substrate ontology, this gauge bridge has failed at the AB gate.

### Global Gauge-Topology Completion Target

The Aharonov-Bohm benchmark is local in the sense that it tests one enclosed-flux holonomy. A stronger gauge bridge must also recover the global content usually hidden by chartwise potential language: flux quantization, charge compatibility, and the way local effective potentials glue across overlapping regions. This remains an effective-connection target, not evidence that a gauge potential is substrate ontology.

Let $\Gamma_{\mathrm{AB}}$ be a benchmark family of closed observer-level loops $\gamma$ and spanning surfaces $S$ for which the local force channel vanishes on the loop. The shared wake/action and effective-connection record should satisfy
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
\right|.
$$
Here $F_{\mathrm{eff}}$ is the observer-level curvature recovered from the same effective gauge record used for force and phase transport. The integer $N$ records the allowed $2\pi$ ambiguity of the phase, not an independent hidden sector.

A compact sector check inside the same target is useful when the benchmark includes disconnected flux sectors or instanton-like sectors rather than a single loop. Let $\mathcal{C}_{\mathrm{top}}$ be the declared family of observer-level gauge-topology sectors, and let $\mathcal{O}_{\mathrm{SM}}(s)$ be the corresponding Standard Model comparison record for sector $s$. The same wake/action ledger may define
$$
\Delta_{\mathrm{sector}}(\theta)
=
\sup_{s\in\mathcal{C}_{\mathrm{top}}}
\left[
\inf_{n_s\in\mathbb{Z}}
\left|
\mathcal{Q}^{\mathbb{A}\mathbb{A}\mathbb{A}}_{\mathrm{wake}}(s;\theta)-n_s
\right|
+
d_{\mathrm{obs}}\!\left(
\mathcal{O}_\theta(s),
\mathcal{O}_{\mathrm{SM}}(s)
\right)
\right].
$$
Here $\mathcal{Q}^{\mathbb{A}\mathbb{A}\mathbb{A}}_{\mathrm{wake}}$ is only the sector label extracted from the retained causal-wake/action record. It is not an independent topological charge assigned after the effective gauge description has already been fitted.

The global gauge-topology target passes only if $\Delta_{\mathrm{gauge,glob}}$ and any declared $\Delta_{\mathrm{sector}}$ stay below tolerance while charge continuity, local force recovery, AB holonomy, and flux/charge compatibility are all read from one shared record. It fails if a chart-dependent potential must be promoted to ontology, if the topological charge is inserted separately from the wake/action ledger, or if the same sector requires different Noether-Sea variables for force, phase, and charge recovery.

## SU(2) Weak Sector

Let $\chi$ denote the local weak doublet (effective exposed-triad channel).

**Proposition 2 (Local weak-basis rotations define an SU(2) connection).**  
If physics is invariant under
$$
\chi(x)\mapsto U_2(x)\chi(x),\qquad U_2(x)\in SU(2),
$$
then the derivative must be promoted to
$$
D_\mu\chi
=
\left(\partial_\mu-i g_2 W_\mu^a\frac{\tau^a}{2}\right)\chi,
$$
with curvature
$$
F_{\mu\nu}^a
=
\partial_\mu W_\nu^a-\partial_\nu W_\mu^a+g_2\epsilon^{abc}W_\mu^bW_\nu^c.
$$

*Proof sketch:* Standard principal-connection construction for local non-Abelian basis changes; the commutator term follows from non-commutativity of $SU(2)$ generators.

## SU(3) Color Sector

**Theorem 3 (Color algebra closure in axis-exceptionality basis).**  
In the ordered basis $(H,M,L)$, the eight generators built from axis mixers and two diagonal traceless operators close a Lie algebra isomorphic to $\mathfrak{su}(3)$.

This is the rigorous closure result already proven in [color-charge-su3](../assemblies/fermions/color-charge-su3.md#algebra-closure-rigorous-statement). Therefore effective color transport acts through
$$
U_3\in SU(3),\qquad
D_\mu=\partial_\mu-i g_3 G_\mu^a T^a.
$$

## Minimal Effective Gauge Lagrangian

Under (G1)-(G4), the lowest-order local gauge-covariant continuum form is
$$
\mathcal{L}_{\text{gauge,min}}
=
-\frac14 F_{\mu\nu}F^{\mu\nu}
-\frac14 W_{\mu\nu}^aW^{a\,\mu\nu}
-\frac14 G_{\mu\nu}^aG^{a\,\mu\nu}
+\bar\Psi\,i\gamma^\mu D_\mu\Psi
+\cdots
$$
where omitted terms are higher-order constitutive corrections from the Noether-Sea medium.

This is an emergent effective description, not a claim that gauge fields are ontologically fundamental.

## Closure Interface: Gauge-Topology Compatibility

For integration with the topological and metric closure programs, impose compatibility between gauge-covariant effective dynamics and topology-derived sector separation.

Required consistency conditions:
1. **Topology respect:** effective gauge transport must preserve the admissible axis-exceptionality sector decomposition used in confinement/topology chapters.
2. **No leakage contradiction:** constitutive preferred-frame leakage terms (from spacetime closure) must not force leading-order gauge-breaking operators.
3. **Energy-side compatibility:** gauge sector must admit open-vs-closed braid scaling laws without violating local covariance of the effective Lagrangian.
4. **Global completion:** local effective connections must assemble into one gauge record whose holonomies, fluxes, and charge ledgers agree across chart boundaries.

Interface chapters:
- topology and action invariants: [dynamics/causal-action-functional.md](../dynamics/causal-action-functional.md)
- color structure and confinement geometry: [assemblies/fermions/color-charge-su3.md](../assemblies/fermions/color-charge-su3.md)
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

These are theory-level falsifiers for this chapter's bridge.
