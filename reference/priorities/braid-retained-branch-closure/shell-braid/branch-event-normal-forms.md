# Branch-Event Normal Forms

Promotion status: `priority-only`. This packet refines [branch-event-classification-theorem.md](branch-event-classification-theorem.md) by giving local normal forms for the first event surfaces in exact-antipodal $M=3$ arclength-inverse continuation. It is a dynamics packet: it says how the coefficient-space branch approaches an event and what ledger reset or termination rule follows.

The normal forms are local to one support-complete root stratum, one source-pair policy, one memory convention, one action convention, and one pseudo-arclength parameter $s$ from [coefficient-space-branch-continuation-theorem.md](coefficient-space-branch-continuation-theorem.md). They classify chart and ledger events. If all event margins remain positive but the dynamics/action derivative gains an extra kernel direction, the correct packet is [branch-switching-bifurcation-theorem.md](branch-switching-bifurcation-theorem.md), not an event reset.

---

## 1. Event Surface Setup

Let $z(s)$ be a smooth certified coefficient-space branch satisfying

$$
\mathcal{G}(z(s))=0
$$

on an interval before the first event. Let $e(z)$ be one scalar event margin. A simple event surface is

$$
\Sigma_e
=
\{z:e(z)=0\},
$$

with transversality

$$
D e(z_*)\dot z(s_*)\ne0.
$$

If $e(z)>0$ is the admissible side and $e(z_*)=0$, the sign of

$$
\dot e_*
=
D e(z_*)\dot z(s_*)
$$

determines whether the branch exits the certified chart or only touches the boundary. A simple exit has $\dot e_*<0$.

For multiple event margins, define

$$
E(z)=\min_k e_k(z).
$$

If more than one $e_k$ vanishes at $z_*$, the point is a multi-event boundary. The solver must reparameterize, refine, or split the event packet before assigning a single branch meaning.

---

## 2. Memory-Window Exit

For a root label $a$, the event function is

$$
e_{\mathrm{mem},a}(z)
=
\eta_{\mathrm{mem}}-\eta_a(z).
$$

On a stable root stratum,

$$
\dot e_{\mathrm{mem},a}
=
\dot\eta_{\mathrm{mem}}
-
\dot\eta_a,
$$

where

$$
\dot\eta_a
=
\frac{
\widehat{\mathbf{R}}_a\cdot
\left(
\dot{\mathbf{Y}}_{i(a)}(\lambda)
-
\dot{\mathbf{Y}}_{j(a)}(\lambda-\eta_a)
\right)
}{J_a}.
$$

The simple memory-exit normal form is

$$
e_{\mathrm{mem},a}(s)
=
\dot e_{\mathrm{mem},a,*}(s-s_*)
+
O((s-s_*)^2),
\qquad
\dot e_{\mathrm{mem},a,*}<0.
$$

Because $J_a$ remains positive, the root continues beyond the event. The branch reset rule is:

1. increase $\eta_{\mathrm{mem}}$ so that the root lies in the active window with margin;
2. recompute force, $\Gamma$, curl, action, tail, and event rows on the deeper ledger;
3. classify the post-reset row as `memory-window-reset` until the successor certificate passes.

This event is not a root fold and not an exact-antipodal obstruction.

---

## 3. Tail Exclusion Or Assimilation Transition

Let the support tail margin be

$$
e_{\mathrm{tail}}(z)
=
\min
\left\{
m_{\mathrm{sup}}(z),
\delta_{\mathrm{tail}}(z)
\right\},
$$

where $m_{\mathrm{sup}}=\eta_{\mathrm{mem}}-2r_{\max}-m_\eta$ and $\delta_{\mathrm{tail}}$ is the minimum tail-slab certificate margin. The normal form for a tail-certificate loss is

$$
e_{\mathrm{tail}}(s)
=
\dot e_{\mathrm{tail},*}(s-s_*)
+
O((s-s_*)^2),
\qquad
\dot e_{\mathrm{tail},*}<0.
$$

The transition is not a branch failure by itself. The reset rule is:

| Tail rescreen result | Branch action |
| --- | --- |
| all slabs root-free | continue with `tail-exclusion-restored` |
| roots found and bracketed | apply [tail-root-assimilation-theorem.md](tail-root-assimilation-theorem.md), then recompute all dynamics/action rows |
| roots possible but uncertified | stop retention with `tail-certificate-failure` or `tail-force-error-unbounded` |

If assimilation preserves the extended-ledger residual and action rows, the branch continues on a new support-complete root stratum. If it destroys descent or action compatibility, the failure belongs to the recomputed row, not to the mere existence of tail roots.

---

## 4. Root Jacobian Fold

For a retained root label $a$, the fold event is

$$
G_a(\eta_a;z)=0,
\qquad
J_a(z)=0.
$$

A simple root-fold normal form requires

$$
\partial_{\eta\eta}G_a(\eta_a;z_*)\ne0,
\qquad
D_zG_a(\eta_a;z_*)\dot z_*\ne0.
$$

In local coordinates

$$
x=\eta-\eta_*,
\qquad
y=s-s_*,
$$

the root equation has the fold form

$$
G_a
=
c_2x^2+c_1y+O(|x|^3+|xy|+y^2),
$$

with

$$
c_2=\frac{1}{2}\partial_{\eta\eta}G_a(\eta_*;z_*),
\qquad
c_1=D_zG_a(\eta_*;z_*)\dot z_*.
$$

The branch has two nearby root labels on one side of the fold and none on the other when $c_1c_2y<0$ changes sign. Since the retained force contains $1/|J_a|$, the ordinary root ledger stops at the fold:

$$
\texttt{jacobian-root-fold}.
$$

Continuation beyond this event requires a separate regularized fold-layer action theorem or a different source representative. It is not a proof-budget stall.

---

## 5. Root Merger And Noncollision Event

For two root labels $a,b$, the root-merger event function is

$$
e_{\mathrm{merge},ab}(z)
=
|\eta_a-\eta_b|-\epsilon_{\eta,\mathrm{merge}}.
$$

A simple merger has

$$
\frac{d}{ds}
(\eta_a-\eta_b)\bigg|_{s=s_*}
\ne0.
$$

When $e_{\mathrm{merge},ab}=0$, the labels cannot be treated as isolated unless a refined bracket split restores positive separation. The reset rule is:

1. reslab the local delay interval;
2. either recover separated brackets with positive $J$ floors, or stop with `root-merge-risk`;
3. do not preserve a force/action row across the merger without recomputing the ledger.

For Euclidean collision, the event function is

$$
e_{\mathrm{coll},ij}(z)
=
\|\mathbf{Y}_i-\mathbf{Y}_j\|-\epsilon_x.
$$

If $e_{\mathrm{coll},ij}$ crosses zero, the noncollision chart fails with `projection-collision`.

---

## 6. Support-Band Escape

The support-band event function is

$$
e_{\mathrm{band}}(z)
=
\min_{i,\lambda}
\left\{
\|\mathbf{Y}_i(\lambda)\|-(R-\delta),
(R+\delta)-\|\mathbf{Y}_i(\lambda)\|
\right\}.
$$

At a simple boundary point $(i_*,\lambda_*)$,

$$
\dot e_{\mathrm{band},*}
=
\pm
\widehat{\mathbf{Y}}_{i_*}(\lambda_*)\cdot
\dot{\mathbf{Y}}_{i_*}(\lambda_*)
\ne0.
$$

If $\dot e_{\mathrm{band},*}<0$, the branch exits the declared same-level support band. The reset rule is to declare a widened support row and recompute:

$$
\eta_{\mathrm{mem}},
\quad
\mathcal{A}_{\eta},
\quad
\widetilde{\mathbf{F}},
\quad
\Gamma_B,
\quad
\mathcal{R}_{\mathrm{curl}},
\quad
\mathcal{R}_{\mathrm{tail}}.
$$

Until that recomputation passes, the status is `support-band-escape`, not retained continuation.

---

## 7. Chart-Speed And Equal-Period Qualification

The inverse-arclength chart has event functions

$$
e_{\mathrm{speed}}(z)
=
s_{\min}-s_0,
\qquad
e_{\mathrm{ep}}(z)
=
\sigma_{\min}(D\mathbf{L})-\epsilon_L.
$$

If $e_{\mathrm{speed}}$ crosses zero, the inverse arclength map is no longer a certified diffeomorphism. If $e_{\mathrm{ep}}$ crosses zero, equal-period tangent coordinates lose constraint qualification. In either case the residual derivative, Krawczyk row, and root-sensitivity row must be rebuilt in a new chart. The normal form is a chart event, not a physical force obstruction.

---

## 8. Action And $\Gamma$ Obstruction

Define

$$
e_{\mathrm{curl}}(z)
=
\epsilon_{\mathrm{curl}}
-
\frac{\|\mathcal{C}\|_{\mathrm{F}}}{1+\|W\|_{\mathrm{F}}},
$$

and

$$
e_{\Gamma}(z)
=
\tau_{\Gamma}
-
|\Gamma_K^{\mathrm{fit}}-\Gamma_B|\,\|A_{\mathrm{force}}\|.
$$

A simple action event occurs when one of these crosses zero while the root and support margins remain positive. The branch may still solve the dynamics residual, but it is not an action-derived branch on the declared ledger. The reset rule is:

1. check that root sensitivities and inverse-arclength variations were included;
2. recompute the history action on the same ledger;
3. if the sign remains failed, classify as `action-gamma-curl-obstruction`.

This is an action obstruction, not an exact-antipodal geometry obstruction. Antipodal relaxation is not opened by this event unless the support-complete dynamics cokernel and pair-midpoint column certificates also pass.

---

## 9. Normal-Form Theorem Target

**Theorem target.** Suppose $z(s)$ is a certified support-complete exact-antipodal $M=3$ branch with positive event margins on $[s_0,s_*)$, and suppose exactly one event function $e$ has a simple zero at $s_*$. Then in a local coordinate $y=s-s_*$, either

$$
e(z(s))=\dot e_*y+O(y^2),
\qquad
\dot e_*\ne0,
$$

or, for a root fold, the root equation has the quadratic form

$$
G=c_2x^2+c_1y+\text{higher-order terms},
\qquad
c_1c_2\ne0.
$$

The event class and reset rule are those stated above. Only a support-complete cokernel lower bound produces `exact-antipodal-obstructed`; only a failed root/Jacobian/noncollision/fold row stops the ordinary root ledger; and only a failed action row blocks action-derived retention.
