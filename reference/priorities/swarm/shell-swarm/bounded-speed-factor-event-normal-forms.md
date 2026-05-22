# Bounded Speed Factor Event Normal Forms

Promotion status: `priority-only`. This packet gives local event surfaces for bounded speed factor continuation. It extends [branch-event-normal-forms.md](branch-event-normal-forms.md) and [branch-event-classification-theorem.md](branch-event-classification-theorem.md), whose displayed normal forms are fixed-speed unless $\nu_i\equiv1$ is declared.

It does not retain a branch. It states how a bounded-speed branch can stop being the same certified branch, and which reset rule is required before continuation resumes.

---

## 1. Augmented Continuation Path

Let

$$
x(s)=(a(s),b(s),\gamma(s))
$$

be a smooth continuation path, where $a$ are curve coefficients, $b$ are bounded speed factor coefficients, and $\gamma$ is the numerical dynamics scale. The branch is inside one bounded-speed ledger while all margins are positive:

$$
E_\nu(x)
=
\min_k e_k^\nu(x)>0.
$$

A simple event occurs at $s=s_*$ when one scalar margin satisfies

$$
e^\nu(x(s_*))=0,
\qquad
\frac{d}{ds}e^\nu(x(s))\bigg|_{s=s_*}\ne0.
$$

If two or more margins vanish, the point is a multi-event boundary. The solver must split or refine the event packet before assigning a single physical interpretation.

---

## 2. Speed-Band Contact

The lower and upper speed-band event functions are

$$
e_{\nu_-,i}(x)
=
\min_{\lambda}\left(\nu_i(\lambda)-\nu_-\right),
$$

and

$$
e_{\nu_+,i}(x)
=
\min_{\lambda}\left(\nu_+-\nu_i(\lambda)\right).
$$

At a simple contact point $\lambda_*$,

$$
\partial_\lambda\nu_i(\lambda_*;x_*)=0,
\qquad
\partial_{\lambda\lambda}\nu_i(\lambda_*;x_*)\ne0,
$$

and the scalar normal form is

$$
e_{\nu_\pm,i}(s)
=
\dot e_{\nu_\pm,i,*}(s-s_*)
+
O((s-s_*)^2).
$$

If the branch crosses out of the declared band, the correct status is

$$
\texttt{bounded-speed-band-exit}.
$$

This is not a dynamics obstruction. It says the chosen speed-band parameter row has failed and the branch must be re-run with a declared wider band or rejected for violating the assumed bounded-speed model.

---

## 3. Physical-Period Contact

The bounded-speed physical period is

$$
H_i(x)
=
\int_0^{L_i(a)}
\frac{d\lambda}{\nu_i(\lambda;b)}.
$$

For an equal-period branch, use event functions

$$
e_{H,i}(x)
=
\tau_H-\left|H_i-H_*\right|,
\qquad
i=1,\ldots,6.
$$

The first variation is

$$
D H_i[v]
=
D L_i[v]\frac{1}{\nu_i(L_i)}
-
\int_0^{L_i}
\frac{D_v\nu_i(\lambda)}{\nu_i(\lambda)^2}
d\lambda,
$$

with the endpoint term omitted when the arclength domain is held fixed by chart convention. A simple period event has

$$
\frac{d}{ds}(H_i-H_*)\bigg|_{s=s_*}\ne0.
$$

The reset rule is to project back to the equal-period or winding manifold, or to reopen the branch as a winding candidate. Without that reset, the status is

$$
\texttt{bounded-speed-period-row-open}.
$$

---

## 4. Bounded-Speed Root Fold

For a retained root label $r$, the bounded-speed root equation is

$$
G_r^\nu(u,\eta;x)=0,
\qquad
J_r^\nu=1-\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_r.
$$

A root fold event satisfies

$$
G_r^\nu=0,
\qquad
J_r^\nu=0,
\qquad
\partial_{\eta\eta}G_r^\nu\ne0.
$$

In local coordinates

$$
y=s-s_*,
\qquad
z=\eta-\eta_*,
$$

the normal form is

$$
G_r^\nu
=
c_2z^2+c_1y+O(|z|^3+|zy|+y^2),
$$

where

$$
c_2=\frac12\partial_{\eta\eta}G_r^\nu(\eta_*;x_*),
\qquad
c_1=D_xG_r^\nu(\eta_*;x_*)\dot x_*.
$$

Since the force row contains $1/|J_r^\nu|$, the ordinary root ledger stops at the fold:

$$
\texttt{bounded-speed-root-fold}.
$$

Continuation through the fold requires either a fold-layer regularization action or a new root ledger that removes the singular ordinary-root contribution.

---

## 5. Same-Source Self-Hit Onset

For a same-source local segment, define

$$
h=\lambda-\lambda^-,
\qquad
\eta=\int_{\lambda^-}^{\lambda}
\frac{d\xi}{\nu_i(\xi)},
$$

and the overspeed excess

$$
\mathcal{A}_i(\lambda^-,\lambda)
=
\int_{\lambda^-}^{\lambda}
\left(1-\frac{1}{\nu_i(\xi)}\right)d\xi.
$$

The chord deficit is

$$
\mathcal{D}_i(\lambda^-,\lambda)
=
h-
\left\|
\mathbf{Y}_i(\lambda)-\mathbf{Y}_i(\lambda^-)
\right\|.
$$

The self-hit hinge is the event surface

$$
E_{\mathrm{hit},i}
=
\mathcal{A}_i-\mathcal{D}_i=0.
$$

A simple onset has

$$
\frac{d}{ds}E_{\mathrm{hit},i}(x(s))\bigg|_{s=s_*}\ne0
$$

and a positive same-source Jacobian floor

$$
J_{\mathrm{self}}^\nu
=
1-\nu_i^-\mathbf{T}_i^-\cdot\widehat{\mathbf{R}}_{\mathrm{self}}
\ge J_{\mathrm{self},0}>0.
$$

The crossed side $E_{\mathrm{hit},i}>0$ may contain ordinary same-source roots. They are admissible only on a declared event interval $\mathcal{H}_i$ with

$$
\operatorname{dur}_u(\mathcal{H}_i)\le\tau_{\mathrm{hit}}^u,
\qquad
\int_{\mathcal{H}_i}(\nu_i-1)_+\,d\lambda\le B_{\mathrm{hit}}.
$$

Here $\operatorname{dur}_u(\mathcal{H}_i)=|\chi_i(\mathcal{H}_i)|$ is dimensionless center-time duration. Physical duration is $\operatorname{dur}_t=(R_*/c_f)\operatorname{dur}_u$.

If the ordinary self-hit appears without those rows, the status is

$$
\texttt{self-hit-mode-unledgered}.
$$

If $J_{\mathrm{self}}^\nu=0$ at onset, the event is not an ordinary self-hit. It is a fold-layer event requiring the regularized fold action.

For a first birth of a self-hit interval, use the local hinge maximum rather than a single preselected pair. Let $q$ collect the two local segment coordinates and define

$$
H_i(q,x)=\mathcal{A}_i(q,x)-\mathcal{D}_i(q,x).
$$

The generic birth condition is

$$
\max_qH_i(q,x_*)=0,
\qquad
\nabla_qH_i(q_*,x_*)=0,
\qquad
-\nabla_q^2H_i(q_*,x_*)>0.
$$

Then, with $y=s-s_*$,

$$
H_i(q,x(s))
=
\dot h_*y
-
\frac12(q-q_*)^TQ(q-q_*)
+
O(|q-q_*|^3+|y|\,|q-q_*|+y^2),
$$

where $Q$ is positive definite. This is the ordinary self-hit birth normal form when $J_{\mathrm{self}}^\nu$ has a positive floor.

---

## 6. Antipodal Speed-Pair Event

The exact-antipodal chart uses

$$
\mathbf{Y}_{\iota i}(\lambda)
=
-\mathbf{Y}_i(\lambda).
$$

For bounded speed factor parity to survive, the speed factors must also be paired:

$$
\nu_{\iota i}(\lambda)
=
\nu_i(\lambda).
$$

Equivalently, the causal-time maps satisfy

$$
\chi_{\iota i}(\lambda)=\chi_i(\lambda).
$$

Define the antipodal speed-pair margin

$$
e_{\mathrm{anti}\nu,i}
=
\tau_{\mathrm{anti}\nu}
-
\sup_\lambda
\left|
\nu_{\iota i}(\lambda)-\nu_i(\lambda)
\right|.
$$

If $e_{\mathrm{anti}\nu,i}$ reaches zero in an exact-antipodal solve, the copied parity relations for roots, Jacobians, force signs, and residual blocks are no longer certified. The reset rule is:

1. either enforce $\nu_{\iota i}=\nu_i$ as an exact chart row;
2. or leave the exact-antipodal chart and open an antipodal-relaxation branch with independent speed factors.

Until one of those rows is chosen, the status is

$$
\texttt{bounded-speed-antipodal-speed-pair-open}.
$$

---

## 7. Theorem Target

**Theorem target: bounded speed factor first-event classification.** Fix a bounded-speed continuation path $x(s)=(a(s),b(s),\gamma(s))$ on one root, speed, action, and event ledger. Suppose all margins are continuous and positive on $[s_0,s_*)$, and exactly one simple margin vanishes at $s_*$. Then the first event is one of:

$$
\texttt{bounded-speed-band-exit},
\quad
\texttt{bounded-speed-period-row-open},
\quad
\texttt{bounded-speed-root-fold},
\quad
\texttt{bounded-speed-self-hit-onset},
\quad
\texttt{bounded-speed-antipodal-speed-pair-open},
$$

or one of the inherited fixed-speed geometric, memory, support, tail, proof-budget, or action events with all root and action quantities replaced by their bounded-speed versions.

Proof route:

1. positivity of $\nu_i$ gives a smooth causal-time chart;
2. positive $J^\nu$ floors give root-sheet continuation by the implicit function theorem;
3. speed-band and period rows are ordinary scalar inequality/equality margins;
4. the self-hit hinge is a scalar event surface separating fixed-speed exclusion from ordinary self-hit possibility;
5. antipodal force parity requires paired speed factors, so a speed-pair violation is a chart event rather than a dynamics obstruction.

Current status:

$$
\texttt{bounded-speed-event-normal-forms-open}.
$$
