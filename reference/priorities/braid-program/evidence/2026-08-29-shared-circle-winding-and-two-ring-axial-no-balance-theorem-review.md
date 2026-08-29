# Shared-Circle Winding and Two-Ring Axial No-Balance Theorem Review

Date: 2026-08-29  
Review mode: theorem review  
Source authority: canonical [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md)  
Disposition: both claims independently established within the separate scopes below

## Independence and Claim Boundary

The shared-circle result was rederived from continuous angular lifts and the connected components of $\mathbb R\setminus2\pi\mathbb Z$. It does not consume a causal-wake calculation. The two-ring result was rederived by projecting each term of the canonical Master Equation onto the fixed ring axis and by proving that a bounded complete opposite-plane history contains a causal root. It does not consume a prescribed-path residual or an earlier numerical output as its oracle. Existing exploratory statements are corroborating history only.

Plainly: the two conclusions do not support each other. One is a fact about labeled paths on a circle; the other is a sign theorem for canonical delayed acceleration contributions between two separated planes.

## Claim 1 — Collision-Free Shared-Circle Winding

### Assumptions

Let $M\ge2$ labeled paths $\mathbf X_i:[0,P]\to\mathbb R^3$ be continuous. Assume:

1. There is one fixed center, one fixed plane, and one radius $R>0$ such that every path remains on that circle for all $T\in[0,P]$.
2. The return is labelwise: $\mathbf X_i(P)=\mathbf X_i(0)$ for every $i$.
3. No two labels coincide at any time, including the endpoints: $\mathbf X_i(T)\ne\mathbf X_j(T)$ for $i\ne j$.
4. One circle orientation and angular coordinate are used for every label, and each path is assigned a continuous lift $\theta_i:[0,P]\to\mathbb R$ of that coordinate.

No velocity constancy, common instantaneous angular velocity, polarity assignment, or Master Equation balance is assumed.

### Derivation

The labelwise return makes

$$
w_i
=
\frac{\theta_i(P)-\theta_i(0)}{2\pi}
\in\mathbb Z
$$

the signed winding number of label $i$. For $i\ne j$, set $\delta_{ij}=\theta_i-\theta_j$. Noncoincidence is exactly the statement $\delta_{ij}(T)\notin2\pi\mathbb Z$. Continuity therefore confines $\delta_{ij}$ to one connected component $(2\pi m,2\pi(m+1))$ of $\mathbb R\setminus2\pi\mathbb Z$. Its two endpoint values lie in the same interval, so their difference has magnitude less than $2\pi$. But

$$
\delta_{ij}(P)-\delta_{ij}(0)
=
2\pi(w_i-w_j),
$$

which is an integer multiple of $2\pi$. It must be zero. Thus $w_i=w_j$ for every pair, and all labels have the same signed mean lap rate $w_i/P$.

Plainly: labels can speed up, slow down, and even reverse temporarily, but they cannot accumulate different net lap counts without two labels meeting, without losing labelwise closure, or without leaving the declared circle.

### Scope, Counterexamples, and Falsifier

Claim grade: **derived topology**. The result excludes a collision or an accepted collision continuation, return only as an unlabeled set modulo permutation, departure from the shared circle, a changing circle not supplied with a separate trivialization theorem, the degenerate boundary $R=0$, and paths without a common labeled period. Unequal instantaneous velocities are not counterexamples. Persistent opposite circulation or unequal signed net laps is impossible only inside the stated collision-free labeled-periodic scope.

Falsifier: exhibit continuous labeled worldlines on one fixed nondegenerate circle, with one common labelwise period and no pairwise coincidence, whose continuous lifts have unequal winding numbers.

## Claim 2 — Super-Field-Speed Extension of the Polarity-Segregated Two-Ring Axial No-Balance Result

### Assumptions

Fix an oriented axis $\hat{\mathbf n}$ and $h>0$. Assume:

1. Every worldline remains throughout the complete active emission-to-reception history in one of two fixed parallel planes $\hat{\mathbf n}\cdot\mathbf X=s_i h$, $s_i\in\{+1,-1\}$, with stationary axial center.
2. All sites in either plane share one polarity and the other plane has the opposite polarity; polarity magnitudes and $\kappa$ are nonzero and $\kappa>0$.
3. The histories are continuous, bounded, and complete into the retained past, and they are differentiable with finite velocity at every admitted root.
4. Every admitted hit has positive range and is an ordinary simple causal root with finite nonzero $D_{t,ij}$.
5. The acceleration is the canonical radial per-hit Master Equation sum, with no external, constraint, or Noether-sea acceleration.

Rigid common-frequency co-rotation is included, but neither common angular speed, constant member velocity, nor any member-speed ceiling is required.

### Canonical Axial Projection

For an admitted root, the canonical contribution is

$$
\mathbf A_{ij}
=
\kappa\,\sigma_{ij}\frac{|q_iq_j|}{r_{ij}^{2}}
W^{\mathrm{acc}}_{ij}\hat{\mathbf r}_{ij},
\qquad
W^{\mathrm{acc}}_{ij}
=
\frac{c_f}{|D_{t,ij}|}>0.
$$

If transmitter $j$ is in receiver $i$'s plane, including $j=i$, both emission and reception events have the same axial height, so $\hat{\mathbf n}\cdot\hat{\mathbf r}_{ij}=0$. If $j$ is in the opposite plane, then $s_j=-s_i$, $\sigma_{ij}=-1$, and

$$
\hat{\mathbf n}\cdot\hat{\mathbf r}_{ij}
=
\frac{2s_i h}{r_{ij}},
\qquad
\hat{\mathbf n}\cdot\mathbf A_{ij}
=
-s_i\frac{2\kappa|q_iq_j|h}{r_{ij}^{3}}W^{\mathrm{acc}}_{ij}.
$$

Every cross-plane term is therefore nonzero and points toward the midplane. Multiple partner or same-transmitter roots at super-field speed change the ledger and the positive magnitudes; they cannot reverse any axial sign. Same-plane roots remain exactly axial-zero.

Plainly: the absolute value in the canonical transmitter weight is decisive. Super-field-speed motion may create additional roots, but an ordinary root never enters with a negative weight that could turn an inward cross-plane contribution outward.

### Root and Balance Scope

For a cross-plane pair at reception time $T$, write the delay as $\tau\ge0$ and define

$$
F(\tau)
=
c_f\tau-\|\mathbf X_i(T)-\mathbf X_j(T-\tau)\|.
$$

At $\tau=0$, $F(0)<0$ because the range is at least $2h>0$. Bounded history supplies a finite separation bound $B$, so $F(\tau)>0$ for $\tau>B/c_f$. Continuity gives at least one causal root. On the theorem's ordinary chart, at least one such root is simple; if a crossing is non-simple, that event is outside this theorem rather than evidence of cancellation.

A fixed-height rigid path has $\hat{\mathbf n}\cdot\ddot{\mathbf X}_i=0$. The complete canonical sum has at least one strictly inward cross-plane term and no outward axial term, so it cannot equal that kinematic axial acceleration. The fixed-height polarity-segregated two-ring history is not acceleration-balanced at nonzero separation.

Plainly: the contradiction is between zero required axial acceleration and a strictly nonzero canonical axial acceleration. It is not an evolution claim about what the rings do after the prescribed history is released.

### Scope, Counterexamples, and Falsifier

Claim grade: **derived on the ordinary simple-root Master Equation chart**. The result applies to finite sub-field, field-speed, and super-field-speed member motion under the assumptions above. It preserves the following exclusions: caustic or non-simple roots and their event contributions; collisions; incomplete or unbounded retained histories; variable ring height or breathing; plane or axis precession; axial center translation; historical segments outside the fixed planes; mixed polarity within a plane; $h=0$; and any added external, constraint, or Noether-sea acceleration. These cases are not counterexamples because they violate a premise. A polarity assignment that alternates within a plane can introduce opposite axial signs and is a genuine outside-scope candidate family.

Falsifier: exhibit a complete bounded positive-range history satisfying the fixed-plane and polarity-segregation assumptions, with a complete ordinary simple-root canonical ledger, for which the exact axial acceleration sum vanishes for every member.

## Propagation and Non-Inference

The derived shared-circle statement is reader-facing in [Binary Dynamics](../../../../content/markdown/aaa/dynamics/binary-dynamics.md#collision-free-shared-circle-winding-lemma). The derived axial statement is reader-facing in [B1 Hypotheses and Discrete Symmetry](../../../../content/markdown/aaa/noether-braid/braid-b1-symmetry.md#fixed-plane-axial-no-balance-lemma), summarized in [Braid Mathematics](../../../../content/markdown/aaa/noether-braid/braid-mathematics.md#scoped-anti-damping-results), and applied to the owning [A2 rotating-chart evidence](../neutral-six-point-balance-and-a2-rotation.md#rotating-a2-without-an-external-constraint).

Neither theorem establishes retention, stability, formation, selection, post-release fate, or a physical braid family. The axial theorem does not apply to the orthogonal-plane weave because its worldlines do not occupy two fixed parallel polarity-segregated planes. No success or failure of that weave is inferred here.

Plainly: the promoted scope consists of one collision-free winding constraint and one fixed-parallel-plane axial sign obstruction. Everything beyond those statements remains open.
