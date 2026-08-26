# Five-Coordinate Matched Three-Binary Initialization Ledger

## Status And Adjudication

- Kind: focused priority-side exact initialization derivation and pre-EOM ledger
- Created: 2026-08-24
- Permanent short name: `SD3`, meaning sector-differential three-pair geometry; provenance-bound `candidateB` machine fields retain their recorded schema names
- Registry status: admitted candidate on the strength of the exact centered five-coordinate position-and-velocity chart; no retained branch is implied
- Claim level: derived affine geometry, measured implementation checks, and a geometry-only authorization boundary
- Parent comparison: [Pair-Conjugate And Sector-Differential Three-Binary Geometry](three-binary-orbiting-endpoint-comparison.md)
- Scope: one common A2 seed, five position coordinates, five rate coordinates, exact whole centering, inverse maps, tangent metrics, collision and normalized-speed guards
- Exclusions: no Master Equation evaluation, causal-root certificate, binding, return, retention, stability, current, spin, electromagnetic recovery, particle identity, or EOM solver result

**Decision: the five-coordinate initialization prerequisite closes, with one exact non-equivalence recorded in the ledger.** Both candidates now have injective affine maps from the same five length coordinates and five speed coordinates, the same declared center and center velocity, the same six-member root-mean-square displacement and speed metric, and an exactly identical three-coordinate A2 locus. Their remaining two directions cannot be memberwise identical: Candidate A must preserve polarity-antisymmetric pair conjugacy, whereas SD3's two additional centered directions are polarity-symmetric pair-midpoint motion. The selected Candidate-A complement is a seed-derived, zero-sum cyclic scale doublet with the same norm and coordinate units.

Plainly: the earlier six-to-six comparison failed because one SD3 parameter moved the whole assembly. The repaired comparison uses five real shape directions on each side. Three directions are literally the same motion. The other two are normalized competitor modes: Candidate A changes conjugate-pair scales, while SD3 moves pair midpoints without moving the whole center.

This result changes the previous pre-EOM status from “missing matched chart” to **go for authoring one bounded five-coordinate EOM solver comparison protocol**. That authorized comparison is now complete in [Bounded Five-Coordinate Three-Binary EOM Comparison](three-binary-five-coordinate-bounded-eom-comparison.md) for the one declared row through $T=0.15$. It does not authorize interpreting the measured difference as the effect of pair conjugacy alone. Away from the common three-coordinate locus, the polarity parity and fixed-history symmetry of the two structural complements differ as a mathematical consequence of the competing geometry.

Plainly: a bounded dynamical comparison can now be specified fairly, but its result would compare two complete geometry packages. SD3 keeps exact threefold symmetry while breaking pair antipodality; Candidate A keeps pair antipodality while its two extra module-scale modes break pointwise threefold symmetry.

## Common Frame And Seed

Retain the orthonormal axes, order-three map $Q$, phase offsets $phi_a=2pi(a-1)/3$, and transverse frames from the parent comparison. Define

$$
\hat{\mathbf k}=\frac{1}{\sqrt3}(1,1,1),
\qquad
\mathbf b_c=\frac{1}{\sqrt2}(1,-1,0),
\qquad
\mathbf b_s=\frac{1}{\sqrt6}(1,1,-2).
$$

Then $(\mathbf b_c,\mathbf b_s,\hat{\mathbf k})$ is an orthonormal frame and $\mathbf b_c,\mathbf b_s\in\hat{\mathbf k}^{\perp}$. The subscript labels are local cosine and sine coordinate labels, not new braid-family terminology.

Choose one A2 seed at the initialization time $T_0$:

$$
\mathbf d_0
=
h_0\hat{\mathbf n}_1
+
\rho_0\mathbf r_1(\theta_0),
\qquad
R_0=\|\mathbf d_0\|>0,
\qquad
\mathbf g=\frac{\mathbf d_0}{R_0}.
$$

Its internal seed velocity is

$$
\dot{\mathbf d}_0
=
\dot h_0\hat{\mathbf n}_1
+
\dot\rho_0\mathbf r_1(\theta_0)
+
\rho_0\dot\theta_0\mathbf t_1(\theta_0).
$$

Claim grade: **derived**. The displayed vectors supply an orthonormal cyclic-axis frame, and $R_0>0$ makes the seed-derived scale direction $\mathbf g$ unique. A nonorthogonal reconstructed frame or a zero seed displacement falsifies this ledger declaration.

Plainly: both candidates start from the same A2 member positions and velocities. The two transverse vectors span every direction that is not a translation along the threefold axis. The unit vector $\mathbf g$ points along the seed binary displacement and gives Candidate A a scale direction without adding an external preferred axis.

## Five Shared Coordinate Labels

Let

$$
\boldsymbol\xi
=
(\xi_h,\xi_\rho,\xi_\tau,\xi_c,\xi_s),
\qquad
\dot{\boldsymbol\xi}
=
(\dot\xi_h,\dot\xi_\rho,\dot\xi_\tau,\dot\xi_c,\dot\xi_s).
$$

Every $\xi_j$ has length units and every $\dot\xi_j$ has speed units. In particular, $\xi_\tau$ is a tangential arc-length coordinate at $T_0$, not an angle. Define the common displacement and rate vectors

$$
\mathbf v
=
\xi_h\hat{\mathbf n}_1
+
\xi_\rho\mathbf r_1(\theta_0)
+
\xi_\tau\mathbf t_1(\theta_0),
$$

$$
\dot{\mathbf v}
=
\dot\xi_h\hat{\mathbf n}_1
+
\dot\xi_\rho\mathbf r_1(\theta_0)
+
\dot\xi_\tau\mathbf t_1(\theta_0),
$$

and the gauge-fixed transverse midpoint vectors

$$
\mathbf w=\xi_c\mathbf b_c+\xi_s\mathbf b_s,
\qquad
\dot{\mathbf w}=\dot\xi_c\mathbf b_c+\dot\xi_s\mathbf b_s.
$$

Because $\mathbf w,\dot{\mathbf w}\perp\hat{\mathbf k}$, neither contains the removed common translation coordinate $\gamma$ or its rate.

Plainly: the first three controls are the same axial, radial, and tangential displacement of the common A2 representative. The last two controls span the only two allowed sideways directions around the cyclic axis. Expressing every control as a length prevents an angular coordinate from receiving a misleading equal numerical amplitude.

## Candidate A Map: Pair-Conjugate Scale Doublet

For $a\in\{1,2,3\}$, define the real cyclic weights

$$
\omega_a(\boldsymbol\xi)
=
\sqrt2
\left[
\xi_c\cos\phi_a
+
\xi_s\sin\phi_a
\right].
$$

The Candidate-A pair displacement, position, and velocity rows are

$$
\mathbf d_a^{A}
=
Q^{a-1}
\left(
\mathbf d_0+\mathbf v+\omega_a\mathbf g
\right),
$$

$$
\mathbf X_{a,\sigma}^{A}
=
\mathbf C+\sigma\mathbf d_a^{A},
$$

$$
\dot{\mathbf X}_{a,\sigma}^{A}
=
\dot{\mathbf C}
+
\sigma Q^{a-1}
\left(
\dot{\mathbf d}_0
+
\dot{\mathbf v}
+
\dot\omega_a\mathbf g
\right).
$$

This map stays inside generic A3 wherever the reconstructed transverse radii are nonzero and stays pair conjugate everywhere. The identities

$$
\sum_a\cos\phi_a
=
\sum_a\sin\phi_a
=
\sum_a\cos\phi_a\sin\phi_a
=0,
$$

$$
\sum_a\cos^2\phi_a
=
\sum_a\sin^2\phi_a
=\frac32
$$

make the scale doublet orthogonal to all three common A2 directions and normalize its two columns.

Plainly: Candidate A spends its last two controls making the three pair sizes unequal in the two independent zero-sum patterns available around a three-member cycle. Every negative member remains the exact opposite of its positive partner, so the price of leaving A2 is loss of pointwise threefold symmetry rather than loss of pair conjugacy.

## SD3 Map: Gauge-Fixed Midpoint Doublet

Define the two module-one representatives

$$
\mathbf y_+
=
\mathbf d_0+\mathbf v+\mathbf w,
\qquad
\mathbf y_-
=
-\mathbf d_0-\mathbf v+\mathbf w.
$$

The SD3 position and velocity rows are

$$
\mathbf X_{a,+}^{B}
=
\mathbf C+Q^{a-1}\mathbf y_+,
\qquad
\mathbf X_{a,-}^{B}
=
\mathbf C+Q^{a-1}\mathbf y_-,
$$

$$
\dot{\mathbf X}_{a,+}^{B}
=
\dot{\mathbf C}
+
Q^{a-1}
\left(
\dot{\mathbf d}_0+\dot{\mathbf v}+\dot{\mathbf w}
\right),
$$

$$
\dot{\mathbf X}_{a,-}^{B}
=
\dot{\mathbf C}
+
Q^{a-1}
\left(
-\dot{\mathbf d}_0-\dot{\mathbf v}+\dot{\mathbf w}
\right).
$$

The removed translation coordinate is identically fixed:

$$
\gamma
=
\frac12\hat{\mathbf k}\mathbin{\cdot}(\mathbf y_++\mathbf y_-)
=
\hat{\mathbf k}\mathbin{\cdot}\mathbf w
=0,
$$

and the whole centroid is exact without a posteriori subtraction:

$$
\sum_{a,\sigma}
(\mathbf X_{a,\sigma}^{B}-\mathbf C)
=
2\sum_aQ^{a-1}\mathbf w
=
6(\hat{\mathbf k}\mathbin{\cdot}\mathbf w)\hat{\mathbf k}
=\mathbf0.
$$

The same equations hold for $\dot\gamma$ and the center-relative velocity sum.

Plainly: SD3 spends its last two controls moving both polarities of one labeled pair in the same sideways direction. The other two pair midpoints follow by cyclic rotation. Their three shifts balance exactly, so the assembly center and center velocity stay fixed without concealing another coordinate in a centroid correction.

## Exact Common Locus And Non-Match Theorem

When

$$
\xi_c=\xi_s=\dot\xi_c=\dot\xi_s=0,
$$

both maps give

$$
\mathbf X_{a,\sigma}^{A}
=
\mathbf X_{a,\sigma}^{B}
=
\mathbf C
+
\sigma Q^{a-1}(\mathbf d_0+\mathbf v),
$$

with the same velocity. This is the shared three-coordinate A2 locus.

At that locus, every centered SD3 tangent has the form

$$
\delta\mathbf X_{a,+}^{B}
=
Q^{a-1}(\delta\mathbf v+\delta\mathbf w),
\qquad
\delta\mathbf X_{a,-}^{B}
=
Q^{a-1}(-\delta\mathbf v+\delta\mathbf w),
$$

where $\delta\mathbf v\in\mathbb R^3$ and $\delta\mathbf w\in\hat{\mathbf k}^{\perp}$. Candidate A requires $\delta\mathbf X_{a,-}^{A}=-\delta\mathbf X_{a,+}^{A}$ for every module. An SD3 tangent can satisfy that condition only if $\delta\mathbf w=\mathbf0$. Therefore

$$
\dim(T_A\cap T_B)=3,
$$

and no five Candidate-A directions can be memberwise identical to the five centered SD3 directions. The SD3 midpoint complement is also orthogonal in six-member Euclidean position space to every polarity-antisymmetric Candidate-A perturbation.

Claim grade: **derived**. Adding and subtracting the two polarity rows proves the intersection and orthogonality. A nonzero $\delta\mathbf w$ that also obeys pair conjugacy would falsify the theorem.

Plainly: three controls can be exactly the same on both sides. The final two cannot. One geometry moves partners oppositely and the other moves them together. The ledger therefore matches their size and units while preserving, rather than erasing, the difference being tested.

## Injectivity And Exact Inverse Maps

For Candidate A, pull each positive pair displacement back to module one:

$$
\mathbf p_a
=
Q^{-(a-1)}
\frac{\mathbf X_{a,+}^{A}-\mathbf X_{a,-}^{A}}{2},
\qquad
\bar{\mathbf p}=\frac13\sum_a\mathbf p_a.
$$

Then

$$
\mathbf v=\bar{\mathbf p}-\mathbf d_0,
$$

so $(\xi_h,\xi_\rho,\xi_\tau)$ are its projections onto $(\hat{\mathbf n}_1,\mathbf r_1,\mathbf t_1)$. If $\eta_a=\mathbf g\mathbin{\cdot}(\mathbf p_a-\bar{\mathbf p})$, then

$$
\xi_c
=
\frac{\sqrt2}{3}
\sum_a\eta_a\cos\phi_a,
\qquad
\xi_s
=
\frac{\sqrt2}{3}
\sum_a\eta_a\sin\phi_a.
$$

For SD3, use the module-one center-relative rows $\mathbf p_+=\mathbf X_{1,+}^{B}-\mathbf C$ and $\mathbf p_-=\mathbf X_{1,-}^{B}-\mathbf C$. The superscript $B$ is retained as a provenance-bound formula label from the original two-column derivation. Then

$$
\mathbf v
=
\frac12(\mathbf p_+-\mathbf p_-)-\mathbf d_0,
\qquad
\mathbf w
=
\frac12(\mathbf p_++\mathbf p_-),
$$

and recover the five coordinates by projection onto the three seed directions and $(\mathbf b_c,\mathbf b_s)$. Replacing positions and $\mathbf d_0$ by center-relative velocities and $\dot{\mathbf d}_0$ recovers all five rates.

Claim grade: **derived**. These displayed left inverses prove both affine initialization maps are injective. A distinct pair of coordinate vectors producing one identical labeled state, or failure of either inverse on an admissible row, would falsify injectivity.

Plainly: neither map merely has numerical rank five at one sample. The coordinates can be reconstructed exactly from the labeled member state. That makes the ledger usable for provenance and same-record comparisons rather than only as a local tangent count.

## Matched Metric And Speed Convention

Use the six-member Euclidean inner product

$$
\langle\delta X,\delta Y\rangle_6
=
\sum_{a,\sigma}
\delta\mathbf X_{a,\sigma}
\mathbin{\cdot}
\delta\mathbf Y_{a,\sigma}.
$$

Let $J_A$ and $J_B$ be the two constant $18\times5$ tangent matrices of the affine maps. The cyclic-weight identities, pair signs, and orthonormal coordinate frames give

$$
J_A^{\mathsf T}J_A
=
J_B^{\mathsf T}J_B
=
6I_5.
$$

Consequently, relative to the common seed,

$$
\frac16
\sum_{a,\sigma}
\|\Delta\mathbf X_{a,\sigma}^{A}\|^2
=
\frac16
\sum_{a,\sigma}
\|\Delta\mathbf X_{a,\sigma}^{B}\|^2
=
\|\boldsymbol\xi\|^2,
$$

and the corresponding perturbation-speed identity is

$$
\frac16
\sum_{a,\sigma}
\|\Delta\dot{\mathbf X}_{a,\sigma}^{A}\|^2
=
\frac16
\sum_{a,\sigma}
\|\Delta\dot{\mathbf X}_{a,\sigma}^{B}\|^2
=
\|\dot{\boldsymbol\xi}\|^2.
$$

The common center velocity is excluded from both internal speed budgets. Every actual member speed must still be checked separately against normalized $c_f=1$ because equal root-mean-square speed does not imply equal maximum member speed.

Plainly: the same five-number perturbation has the same total size and the same total internal speed on both sides. A difference in the largest individual member speed remains real and is recorded rather than normalized away.

## Initialization Ledger

| Ledger field | Candidate A | SD3 | Exact comparison status |
| --- | --- | --- | --- |
| member inventory and labels | three $+/-$ pairs | three $+/-$ module labels | identical |
| base positions and velocities | common A2 seed | same common A2 seed | identical at $\xi_c=\xi_s=\dot\xi_c=\dot\xi_s=0$ |
| center and center velocity | declared $\mathbf C,\dot{\mathbf C}$ | same declared $\mathbf C,\dot{\mathbf C}$ | identical and exact |
| first three coordinates | common axial, radial, tangential length | same | memberwise identical |
| final two coordinates | zero-sum cyclic pair-scale doublet | transverse pair-midpoint doublet | same units and metric; different polarity parity |
| coordinate count | five | five | matched |
| rate count | five | five | matched |
| tangent Gram matrix | $6I_5$ | $6I_5$ | matched exactly |
| inverse map | displayed Fourier/projection inverse | displayed sector projection inverse | both injective |
| pair conjugacy | exact | only on common locus | controlled structural difference |
| generic fixed-history symmetry | extra doublet breaks pointwise $C_3$ | $C_3$ remains exact | unavoidable coupled difference |
| removed translation | absent by pair centering | $\gamma=\dot\gamma=0$ gauge | absent on both sides |
| collision guard | all 15 labeled pair distances positive | same | checked separately |
| speed guard | every member speed below $c_f=1$ | same | checked separately |
| causal history | not supplied by this ledger | not supplied by this ledger | required before EOM evaluation |

Plainly: the ledger makes every equality and every remaining difference explicit. It does not describe the last two controls as identical motions; it proves that they are the same size, use the same units, and occupy the two competitor-specific directions left after the common A2 motions are removed.

## Instrument And Measured Sample

The focused implementation is [three-binary-five-coordinate-initialization-ledger.mjs](../../../scripts/mapping-electromagnetism/three-binary-five-coordinate-initialization-ledger.mjs). It constructs both affine maps, recovers all coordinates and rates, reports both tangent Gram matrices, verifies the gauge and common locus, and fails closed on malformed values, zero seed displacement, collision, or a member speed at or above $c_f=1$.

The independent test file is [three-binary-five-coordinate-initialization-ledger.test.js](../../../tests/three-binary-five-coordinate-initialization-ledger.test.js). Its expected inverse equations, polarity parities, common-locus identity, $6I_5$ metric, gauge condition, moving-center recovery, and failure controls are specified directly from the displayed derivation. Test agreement checks the implementation of this theorem; it is not independent evidence for Master Equation behavior.

For the declared sample

$$
(h_0,\rho_0,\theta_0)=(0.28,0.19,0.42),
$$

$$
(\dot h_0,\dot\rho_0,\dot\theta_0)=(0.01,-0.02,0.30),
$$

$$
\boldsymbol\xi=(0.020,-0.015,0.010,0.012,-0.008),
$$

$$
\dot{\boldsymbol\xi}=(0.030,-0.020,0.040,0.010,-0.015),
$$

the instrument measured:

| Check | Candidate A | SD3 |
| --- | ---: | ---: |
| tangent rank | $5$ | $5$ |
| maximum $|J^{\mathsf T}J-6I_5|$ | $2.23\times10^{-15}$ | $2.67\times10^{-15}$ |
| coordinate inverse residual | $2.26\times10^{-17}$ | $1.74\times10^{-17}$ |
| rate inverse residual | $6.94\times10^{-18}$ | $6.94\times10^{-18}$ |
| whole-centroid residual | $0$ | $1.61\times10^{-17}$ |
| minimum labeled pair distance | $0.2683453709$ | $0.2715072709$ |
| maximum member speed in $c_f=1$ units | $0.1144985399$ | $0.1295661680$ |
| cyclic fixed-history residual | $0.0352538031$ | $0$ |

The SD3 gauge residual was $1.61\times10^{-17}$, its gauge-rate residual was $8.68\times10^{-19}$, and the common-locus position and velocity residuals were exactly zero in the implementation.

Claim grade: **measured** by the named initialization instrument on the immutable declared sample. Rerunning the command and obtaining values outside the declared floating-point tolerances falsifies the receipt. The measurements establish implementation consistency, sample clearance, and sample speed allocation only.

Plainly: the numerical audit reconstructs every input coordinate, confirms that both five-column maps have the promised metric, and shows that the sample is clear and comfortably below the normalized speed ceiling. The nonzero Candidate-A symmetry residual is expected from its activated scale doublet and is part of the comparison record.

## Pre-EOM Authorization Boundary

The geometry prerequisite is **go** only for a bounded comparison whose initialization rows preserve all of the following:

1. one immutable common A2 seed and one immutable center history prefix;
2. the exact five coordinates and rates above, with no sixth SD3 internal parameter;
3. $\gamma=\dot\gamma=0$ for SD3;
4. the $6I_5$ tangent metric and exact inverse-map provenance;
5. all 15 labeled pair clearances and every member speed in $c_f=1$ units;
6. the recorded distinction between three shared directions and two orthogonal structural complements;
7. complete causal-root histories and identical EOM solver tolerances, history enclosure, stop conditions, and output cadence; and
8. separate reporting of center acceleration, normal leakage, pair-conjugacy residual, cyclic-symmetry residual, and every return action.

A future EOM solver result may compare survival time, root completeness, clearance, speed allocation, normal leakage, and declared return residuals. It may not attribute a difference solely to pair conjugacy, declare retention from a finite run, infer stability without equilibrium, or promote a particle, current, spin, or electromagnetic identity.

Plainly: the initialization question is closed. The dynamics question is untouched. A fair solver run must carry the exact ledger forward and report the symmetry difference rather than treating it as numerical noise.

## Claim Boundary And Falsifiers

| Claim | Grade | Operator-checkable falsifier |
| --- | --- | --- |
| both initialization maps are injective | derived | either displayed left inverse fails on an admissible labeled state |
| SD3 has no group-translation coordinate | derived | $\gamma$ or $\dot\gamma$ is nonzero for a declared ledger row |
| both tangent metrics equal $6I_5$ | derived and measured | exact column products or the focused audit disagree |
| the common memberwise tangent has dimension three | derived | a nonzero midpoint mode also satisfies pair conjugacy |
| the two structural complements are orthogonal by polarity parity | derived | their six-member Euclidean inner product is nonzero |
| the selected Candidate-A doublet is a useful dynamical comparator | inferred | bounded EOM rows show the choice is dominated by another predeclared pair-conjugate doublet under the same metric and guards |
| either candidate binds, returns, or has a physical role | guessed and unsupported | no accepted EOM solver record establishes such a result |

No equilibrium has been established, so no stability spectrum is defined. No reader-facing corpus promotion or equation-score change follows from this initialization ledger.

Plainly: the ledger proves what was needed to start a fair bounded comparison and states exactly what such a comparison still cannot establish.

## Durable Handoff

- The six-to-six no-go remains correct and is not weakened.
- The exact five-coordinate repair is complete in this document, the focused implementation, and its tests.
- Session 22 remains priority-side under existing Family-A terminology; no new canonical family name is introduced.
- The mapping-electromagnetism queue and `EMAP-001` are unchanged because this focused geometry request does not complete an accepted electromagnetic recovery object.
- The separate bounded EOM solver artifact is complete for the one declared row and does not generalize its result to the full A3 family.

Closure goal: preserve the completed bounded result at its one-row scope and require a separately predeclared covering campaign before making any full-A3-family inference.
