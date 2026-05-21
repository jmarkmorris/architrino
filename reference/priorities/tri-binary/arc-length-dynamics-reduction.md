# Arc-Length Dynamics Reduction

Promotion status: `priority-only`. This packet corrects the dynamics formulation used by the first deformation screens. Those screens parameterized a deformed carrier by a common angle $\theta=\omega t$ and then treated fixed-speed failure as a residual. For a retained same-level branch, the cleaner formulation is to parameterize each support curve by an internal coordinate and build the physical time map from arclength. Fixed speed then becomes an exact constraint, and the remaining dynamics are force-versus-curvature closure on the active causal-root ledger.

This packet does not retain a branch. It changes the next search target.

---

## 1. Curve Before Clock

Let each site $i=(a,\sigma)$ have a periodic support-band curve

$$
\mathbf{X}_i(q)
\in\mathbb{R}^3,
\qquad
q\in\mathbb{R}/2\pi\mathbb{Z},
$$

inside the same-level branch chart

$$
\mathbf{x}_i(t)=\mathbf{C}(t)+\mathbf{y}_i(t).
$$

The geometric curve supplies

$$
\mathbf{X}'_i(q)=\frac{d\mathbf{X}_i}{dq},
\qquad
S_i(q)=\|\mathbf{X}'_i(q)\|.
$$

Assume a nondegenerate curve-speed floor

$$
S_i(q)\ge s_{\min}>0.
$$

Define arclength from a chosen origin by

$$
\ell_i(q)=\int_0^q S_i(\zeta)\,d\zeta,
\qquad
L_i=\ell_i(2\pi).
$$

The fixed carrier speed $c_f$ determines physical time along the curve:

$$
t_i(q)=\frac{\ell_i(q)}{c_f}.
$$

Thus the inverse phase map $q_i(t)$ is defined by

$$
\ell_i(q_i(t))=c_f t
\pmod{L_i}.
$$

This is the point missed by the first low-order screens: after a radial or phase deformation, $\theta$ is no longer physical time unless $S_i$ is constant.

---

## 2. Period Compatibility

A six-site same-level branch requires a common recurrence period, or a declared rational winding relation. The simplest retained row requires

$$
L_i=L_*
\qquad
\text{for all six sites }i.
$$

Then

$$
T_*=\frac{L_*}{c_f}
$$

is the common internal period. If the lengths are not equal, the branch can still be studied only after supplying integer winding data

$$
m_i L_i=L_{\mathrm{com}},
\qquad
m_i\in\mathbb{N},
$$

with a common period $T_{\mathrm{com}}=L_{\mathrm{com}}/c_f$. The first retained-branch search should use the equal-length row unless a nontrivial winding relation is part of the ansatz.

The period-compatibility residual is therefore

$$
\mathcal{R}_{L,i}=L_i-L_1,
\qquad
i=2,\ldots,6.
$$

This replaces the naive speed residual used in the first deformation screen.

---

## 3. Fixed-Speed Kinematics

With $q=q_i(t)$, the internal relative position is

$$
\mathbf{y}_i(t)=\mathbf{X}_i(q_i(t)),
$$

and

$$
\dot{q}_i(t)=\frac{c_f}{S_i(q_i(t))}.
$$

The velocity is

$$
\mathbf{u}_i(t)
=
\dot{\mathbf{y}}_i(t)
=
c_f\mathbf{T}_i(q_i(t)),
$$

where

$$
\mathbf{T}_i(q)=\frac{\mathbf{X}'_i(q)}{S_i(q)}
$$

is the unit tangent. Therefore

$$
\|\mathbf{u}_i(t)\|=c_f
$$

identically, as long as $S_i(q)>0$.

The acceleration is

$$
\dot{\mathbf{u}}_i(t)
=
c_f^2\boldsymbol{\kappa}_i(q_i(t)),
$$

where the curvature vector is

$$
\boldsymbol{\kappa}_i(q)
=
\frac{1}{S_i(q)}
\frac{d\mathbf{T}_i}{dq}.
$$

Since $\mathbf{T}_i\cdot\boldsymbol{\kappa}_i=0$, any retained force ledger must still obey tangential closure:

$$
\mathbf{T}_i(q_i(t))\cdot
\mathbf{F}_i(t)
=0.
$$

But tangential closure is now a projection of the force-versus-curvature equation, not a substitute for the speed equation.

---

## 4. Causal Roots In The Arclength Clock

For a receiver time $t$ and source time $s<t$, the active root equation becomes

$$
G_{ij}(t,s)
=
\left\|
\mathbf{C}(t)-\mathbf{C}(s)
+\mathbf{X}_i(q_i(t))
-\mathbf{X}_j(q_j(s))
\right\|
-c_f(t-s)
=0.
$$

The root Jacobian remains

$$
J_{ij}(t,s)
=
1-
\frac{\mathbf{v}_j(s)\cdot\hat{\mathbf{r}}_{ij}(t,s)}
{c_f},
$$

with

$$
\mathbf{v}_j(s)
=
\dot{\mathbf{C}}(s)
+c_f\mathbf{T}_j(q_j(s)).
$$

Thus the existing root-floor condition remains valid:

$$
J_{\min}
=
\inf_{(i,j,\alpha,t)\in\mathcal{A}}
|J_{ij}^{\alpha}(t)|
>
\epsilon_J.
$$

The difference is that the source phase $q_j(s)$ is no longer $s+\phi_j$; it is the inverse arclength phase determined by the deformed source curve.

---

## 5. Dynamics Residual

Let the retained force ledger be

$$
\mathbf{F}_i(t)
=
\mathbf{F}_i^{\mathrm{partner}}(t)
+\mathbf{F}_i^{\mathrm{cross}}(t)
+\mathbf{F}_i^{\mathrm{self}}(t)
+\mathbf{F}_i^{\mathrm{med}}(t).
$$

In the center-gauge branch-existence chart, $\ddot{\mathbf{C}}=\mathbf{0}$. The arclength dynamics residual is

$$
\mathcal{R}_{\mathrm{dyn},i}(t)
=
\mathbf{F}_i(t)
-c_f^2\boldsymbol{\kappa}_i(q_i(t)).
$$

The retained branch condition is the vector equation

$$
\mathcal{R}_{\mathrm{dyn},i}(t)=\mathbf{0}
\qquad
\text{for all }i,t,
$$

plus the period, root, noncollision, event, and action ledgers.

The old residuals are recovered as projections:

$$
\mathcal{R}_{\mathrm{tan},i}(t)
=
c_f\mathbf{T}_i(q_i(t))\cdot\mathbf{F}_i(t),
$$

and, for a chosen support normal $\hat{\mathbf{n}}_i$,

$$
\mathcal{R}_{\mathrm{support},i}(t)
=
\hat{\mathbf{n}}_i(q_i(t))\cdot
\left[
\mathbf{F}_i(t)
-c_f^2\boldsymbol{\kappa}_i(q_i(t))
\right].
$$

The support equation must use curvature of the deformed curve, not only $c_f^2/R$ from the rigid circle.

---

## 6. Consequence For The Existing Screens

The low-order deformation screens in [low-order-deformation-search-results.md](low-order-deformation-search-results.md) remain useful as evidence about line-of-action force projections, but their speed residuals are not decisive against the underlying curve shapes. They used

$$
q_i(t)=t+\phi_i
$$

for deformed curves, so a nonconstant $S_i(q)$ necessarily appeared as a speed error.

The correct next screen should:

1. choose a support-band curve family $\mathbf{X}_i(q)$;
2. enforce $S_i(q)>0$;
3. enforce equal arclength periods $L_i=L_*$ or declare rational winding data;
4. compute inverse phase maps $q_i(t)$ by arclength;
5. solve causal roots in physical time $t,s$;
6. minimize $\mathcal{R}_{\mathrm{dyn}}$, not the naive $\mathcal{R}_{\mathrm{speed}}$.

This reinterprets the best breathing-only row. Its tangential improvement may be real, while its speed failure may only mean that the wrong clock was used.

---

## 7. Retained-Branch Theorem Target

A retained arclength branch can be stated as the following theorem target.

**Theorem target.** Fix a six-curve support-band family $\mathbf{X}_i(q;\alpha)$ and retained active-root convention $\mathcal{A}$. Suppose there exists a parameter $\alpha_*$ such that:

$$
S_i(q;\alpha_*)\ge s_{\min}>0,
$$

$$
L_i(\alpha_*)=L_*(\alpha_*)
\qquad
\text{for all }i,
$$

$$
d_{\min}(\alpha_*)>\epsilon_x,
\qquad
J_{\min}(\alpha_*)>\epsilon_J,
$$

and

$$
\mathcal{R}_{\mathrm{dyn},i}(t;\alpha_*)=\mathbf{0}
\qquad
\text{for all }i,t.
$$

If the event/action and exposure ledgers also close on the same active-root convention, then $\alpha_*$ is a retained same-level tri-binary dynamics branch.

For continuation, require the finite-dimensional collocation map

$$
\mathcal{F}(\alpha)
=
\left(
\mathcal{R}_{\mathrm{dyn}},
\mathcal{R}_{L},
\mathcal{R}_{\mathrm{event}},
\mathcal{R}_{\mathrm{action}}
\right)
$$

to have a transverse zero after quotienting rigid rotations, time translation, and center gauge. This is the arclength replacement for the current residual-search protocol.

