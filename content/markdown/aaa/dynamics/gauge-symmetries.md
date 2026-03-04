# Gauge Symmetries

This chapter provides a minimal theorem-backed bridge from architrino/assembly dynamics to the effective gauge symmetry structure used elsewhere.

Interface chapters:
- Electroweak emergence narrative: [gauge-structure-emergence](./gauge-structure-emergence.md)
- Color SU(3) algebra closure: [color-charge-su3](../assemblies/fermions/color-charge-su3.md)
- Variational substrate: [effective-lagrangian](./effective-lagrangian.md)

## Regularized Setting

Work in the $\eta>0$ regularized regime, with coarse-grained fields obtained from the same kernel used in the master/effective-action chapters.

Assume:
- **(G1)** Existence of coarse-grained matter field $\Psi$ and finite-energy histories on bounded windows.
- **(G2)** Action density depends on $\Psi$ only through $\Psi$, $\partial_\mu\Psi$, and symmetry-compatible contractions.
- **(G3)** Color axis-exceptionality space is $\mathcal{H}^{\text{color}}\cong\mathbb{C}^3$.
- **(G4)** Weak-coupling triad is a local two-state channel at each point (effective doublet sector).

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
where omitted terms are higher-order constitutive corrections from the Noether-sea medium.

This is an emergent effective description, not a claim that gauge fields are ontologically fundamental.

## Closure Interface: Gauge-Topology Compatibility

For integration with the topological and metric closure programs, impose compatibility between gauge-covariant effective dynamics and topology-derived sector separation.

Required consistency conditions:
1. **Topology respect:** effective gauge transport must preserve the admissible axis-exceptionality sector decomposition used in confinement/topology chapters.
2. **No leakage contradiction:** constitutive preferred-frame leakage terms (from spacetime closure) must not force leading-order gauge-breaking operators.
3. **Energy-side compatibility:** gauge sector must admit open-vs-closed braid scaling laws without violating local covariance of the effective Lagrangian.

Interface chapters:
- topology and action invariants: `dynamics/causal-action-functional.md`
- color structure and confinement geometry: `assemblies/fermions/color-charge-su3.md`
- preferred-frame closure: `spacetime/ppn-parameters.md`

## Failure Conditions

This gauge-emergence spine fails if any of the following occur in the calibrated low-energy regime:
- Measured effective continuity violation: $\partial_\mu j^\mu\neq 0$ beyond numerical/experimental tolerance.
- Weak channel requires non-SU(2)-covariant terms at leading order.
- Color generator set fails closure or requires dimension other than 8 in the one-axis-exceptionality sector.
- Preferred-frame leakage forces explicit gauge-breaking operators at leading order.

These are theory-level falsifiers for this chapter's bridge.
