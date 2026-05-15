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
The U(1) closure passes this benchmark only if $\Delta_{\mathrm{AB}}$ remains below the declared interferometric tolerance while the same effective connection also preserves charge continuity and ordinary electromagnetic force recovery. If the phase recovery requires a local force on the arms, a separate phase fit, or a literal promotion of $A_\mu$ to substrate ontology, this gauge bridge has failed at the AB gate.

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
- Added partner families, extra gauge modes, baryon-instability channels, or hidden transport channels produce $\mathcal{R}_{\mathrm{null}}(\theta)>0$.
- Preferred-frame leakage forces explicit gauge-breaking operators at leading order.

These are theory-level falsifiers for this chapter's bridge.
