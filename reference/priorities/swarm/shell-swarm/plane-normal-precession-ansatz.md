# Plane-Normal Precession Ansatz

Promotion status: `priority-only`. This packet develops the plane-normal precession ansatz for same-level tri-binary intrinsic curve dynamics. It extends the short precession row in [deformed-carrier-dynamics-ansatz.md](deformed-carrier-dynamics-ansatz.md) using the arclength dynamics equation in [intrinsic-curve-dynamics-equation.md](intrinsic-curve-dynamics-equation.md) and the theorem target in [minimal-dynamics-closure-theorem.md](minimal-dynamics-closure-theorem.md).

Claim level: deformation theorem-target and simulation-target material. This packet does not claim a retained branch. It supplies the curve family, arclength constraints, curvature terms, root-ledger variations, and residual entries that a retained shell swarm dynamics packet would have to close.

---

## 1. Baseline Frame

Index the six same-level sites by

$$
i=(a,\sigma),
\qquad
a\in\{1,2,3\},
\qquad
\sigma\in\{+1,-1\}.
$$

Use three oriented orthonormal plane frames

$$
(\mathbf{e}_a,\mathbf{f}_a,\mathbf{n}_a),
\qquad
\mathbf{n}_a=\mathbf{e}_a\times\mathbf{f}_a,
$$

with the rigid octahedral representative

$$
\mathbf{p}_a(q)
=
\mathbf{e}_a\cos q+\mathbf{f}_a\sin q,
\qquad
\mathbf{p}_a'(q)
=
-\mathbf{e}_a\sin q+\mathbf{f}_a\cos q.
$$

Thus

$$
\|\mathbf{p}_a\|=1,
\qquad
\|\mathbf{p}_a'\|=1,
\qquad
\mathbf{p}_a\times\mathbf{p}_a'=\mathbf{n}_a,
\qquad
\mathbf{p}_a''=-\mathbf{p}_a.
$$

The rigid exact-antipodal seed is

$$
\mathbf{Y}_{a,\sigma}^{0}(\lambda)
=
\sigma\mathbf{p}_a(\lambda),
\qquad
\mathbf{T}_{a,\sigma}^{0}
=
\sigma\mathbf{p}_a',
\qquad
\mathbf{K}_{a,\sigma}^{0}
=
-\sigma\mathbf{p}_a.
$$

The precession ansatz keeps the exact-antipodal row unless a separate antipodal-relaxation packet explicitly changes it:

$$
\mathbf{Y}_{a,+}+\mathbf{Y}_{a,-}=\mathbf{0}.
$$

Therefore the center-gauge row closes automatically for equal site weights in this subfamily.

---

## 2. Exact Curve Form

Let each binary plane carry a periodic rotation

$$
Q_a(q)\in SO(3),
\qquad
Q_a(q+2\pi)=Q_a(q),
$$

and define the construction-coordinate curve

$$
\mathbf{X}_{a,\sigma}(q)
=
\sigma Q_a(q)\mathbf{p}_a(q).
$$

The body angular-rate vector $\boldsymbol{\Omega}_a(q)$ is defined by

$$
Q_a(q)^TQ_a'(q)\mathbf{v}
=
\boldsymbol{\Omega}_a(q)\times\mathbf{v}
$$

for every vector $\mathbf{v}$. Then

$$
\frac{d\mathbf{X}_{a,\sigma}}{dq}
=
\sigma Q_a(q)\mathbf{w}_a(q),
$$

where

$$
\mathbf{w}_a(q)
=
\mathbf{p}_a'(q)
+
\boldsymbol{\Omega}_a(q)\times\mathbf{p}_a(q).
$$

The construction-coordinate speed is

$$
S_a(q)=\|\mathbf{w}_a(q)\|.
$$

The intrinsic arclength coordinate is

$$
\ell_a(q)=\int_0^q S_a(\zeta)\,d\zeta,
\qquad
L_a=\ell_a(2\pi),
$$

and the arclength curve is

$$
\mathbf{Y}_{a,\sigma}(\lambda)
=
\mathbf{X}_{a,\sigma}(q_a(\lambda)),
\qquad
\ell_a(q_a(\lambda))=\lambda
\pmod{L_a}.
$$

This gives the unit-speed row exactly:

$$
\left\|
\frac{d\mathbf{Y}_{a,\sigma}}{d\lambda}
\right\|=1.
$$

The equal-period same-level row is

$$
L_1=L_2=L_3,
$$

or, in a declared winding class,

$$
m_aL_a=L_{\mathrm{com}}
\qquad
\text{for integers }m_a\ge1.
$$

No retained branch claim follows from this kinematics alone. The same curve family must still close the active root ledger and the force-versus-curvature equation.

---

## 3. Small Plane-Normal Coordinates

For a finite-mode search write

$$
Q_a(q)
=
\exp\!\left(\varepsilon[\boldsymbol{\mu}_a(q)]_{\times}\right),
\qquad
0<\varepsilon\ll1.
$$

The component of $\boldsymbol{\mu}_a$ parallel to $\mathbf{n}_a$ only rotates the in-plane phase at first order. That component belongs to phase modulation, not plane-normal precession. The pure plane-normal precession gauge is therefore

$$
\boldsymbol{\mu}_a(q)\cdot\mathbf{n}_a=0.
$$

Equivalently,

$$
\boldsymbol{\mu}_a(q)
=
u_a(q)\mathbf{e}_a+v_a(q)\mathbf{f}_a.
$$

Then the first-order displacement is

$$
\delta\mathbf{Y}_{a,\sigma}^{(\mu)}(q)
=
\sigma\boldsymbol{\mu}_a(q)\times\mathbf{p}_a(q)
=
\sigma h_a(q)\mathbf{n}_a,
$$

with

$$
h_a(q)
=
u_a(q)\sin q-v_a(q)\cos q.
$$

Thus the normal-changing precession modes move each site out of its instantaneous carrier plane while preserving the support radius to first order:

$$
\mathbf{p}_a\cdot
\left(\boldsymbol{\mu}_a\times\mathbf{p}_a\right)=0.
$$

A low-order search may use

$$
u_a(q)=\sum_{m=0}^{M}
\left(U_{a,m}^{c}\cos mq+U_{a,m}^{s}\sin mq\right),
$$

and

$$
v_a(q)=\sum_{m=0}^{M}
\left(V_{a,m}^{c}\cos mq+V_{a,m}^{s}\sin mq\right).
$$

The orientation gauge removes the constant common rotation mode. One convenient linear gauge is

$$
\sum_{a=1}^{3}
\int_0^{2\pi}
\boldsymbol{\mu}_a(q)\,dq
=
\mathbf{0}.
$$

For the octahedral coordinate planes this eliminates the mean global orientation mode because

$$
\sum_{a=1}^{3}
\left(I-\mathbf{n}_a\mathbf{n}_a^T\right)
=
2I.
$$

---

## 4. Arclength And Unit-Speed Constraints

At first order,

$$
\frac{d}{dq}
\left[
\mathbf{p}_a+\varepsilon\boldsymbol{\mu}_a\times\mathbf{p}_a
\right]
=
\mathbf{p}_a'
+
\varepsilon
\left(
\boldsymbol{\mu}_a'\times\mathbf{p}_a
+
\boldsymbol{\mu}_a\times\mathbf{p}_a'
\right).
$$

The first-order construction-speed variation is

$$
\delta S_a
=
\mathbf{p}_a'\cdot
\left(
\boldsymbol{\mu}_a'\times\mathbf{p}_a
+
\boldsymbol{\mu}_a\times\mathbf{p}_a'
\right).
$$

Since

$$
\mathbf{p}_a'\cdot
\left(\boldsymbol{\mu}_a\times\mathbf{p}_a'\right)=0
$$

and

$$
\mathbf{p}_a'\cdot
\left(\boldsymbol{\mu}_a'\times\mathbf{p}_a\right)
=
\boldsymbol{\mu}_a'\cdot
\left(\mathbf{p}_a\times\mathbf{p}_a'\right)
=
\boldsymbol{\mu}_a'\cdot\mathbf{n}_a,
$$

the pure plane-normal gauge gives

$$
\delta S_a=0.
$$

Thus plane-normal precession has no first-order unit-speed defect when $\boldsymbol{\mu}_a\cdot\mathbf{n}_a=0$. This is the arclength advantage over a naive angle-clock deformation: the normal-changing modes can alter force projections without immediately spending first-order freedom on speed repair.

At finite amplitude the retained packet must still compute

$$
S_a(q)
=
\left\|
\mathbf{p}_a'(q)
+
\boldsymbol{\Omega}_a(q)\times\mathbf{p}_a(q)
\right\|
$$

and enforce one of the following rows:

| Row | Condition |
| --- | --- |
| exact arclength chart | use $\ell_a(q)$ and $q_a(\lambda)$ so $\|\mathbf{Y}'\|=1$ identically |
| collocation arclength | impose $S_a(q_n)=1$ at collocation nodes after quotienting phase and orientation gauges |
| common-period row | enforce $L_a=L_1$ for $a=2,3$, or the declared winding equation |

The pure precession search should prefer the exact arclength chart. A collocation shortcut is only a numerical screen.

---

## 5. Tangent And Curvature Terms

Define the covariant construction derivative

$$
D_a\mathbf{z}
=
\mathbf{z}'
+
\boldsymbol{\Omega}_a\times\mathbf{z}.
$$

Then

$$
\mathbf{T}_{a,\sigma}
=
\sigma Q_a\frac{\mathbf{w}_a}{S_a},
$$

and

$$
\mathbf{K}_{a,\sigma}
=
\sigma Q_a
\left[
\frac{D_a\mathbf{w}_a}{S_a^2}
-
\frac{\mathbf{w}_a
\left(\mathbf{w}_a\cdot D_a\mathbf{w}_a\right)}
{S_a^4}
\right].
$$

This formula is the curvature vector in the intrinsic arclength coordinate. It is automatically perpendicular to $\mathbf{T}_{a,\sigma}$.

In the small pure-precession gauge, $S_a=1+O(\varepsilon^2)$ and the first-order tangent variation is

$$
\delta\mathbf{T}_{a,\sigma}^{(\mu)}
=
\sigma
\left(
\boldsymbol{\mu}_a'\times\mathbf{p}_a
+
\boldsymbol{\mu}_a\times\mathbf{p}_a'
\right).
$$

The first-order curvature variation is

$$
\delta\mathbf{K}_{a,\sigma}^{(\mu)}
=
\sigma
\left(
\boldsymbol{\mu}_a''\times\mathbf{p}_a
+
2\boldsymbol{\mu}_a'\times\mathbf{p}_a'
-
\boldsymbol{\mu}_a\times\mathbf{p}_a
\right).
$$

In scalar normal-displacement form this is simply

$$
\delta\mathbf{Y}_{a,\sigma}^{(\mu)}
=
\sigma h_a\mathbf{n}_a,
\qquad
\delta\mathbf{T}_{a,\sigma}^{(\mu)}
=
\sigma h_a'\mathbf{n}_a,
\qquad
\delta\mathbf{K}_{a,\sigma}^{(\mu)}
=
\sigma h_a''\mathbf{n}_a.
$$

The vector form is more useful when coupling precession to phase modulation or when the finite rotation $Q_a$ is evaluated beyond first order. The scalar form exposes the main linearized effect: pure plane-normal precession supplies out-of-plane curvature components without a first-order radius or speed change.

---

## 6. Root-Ledger Effects

For receiver $i=(a,\sigma)$, source $j=(b,\tau)$, and dimensionless delay $\eta>0$, the active root equation is

$$
G_{ij}(\lambda,\eta)
=
\left\|
\mathbf{Y}_i(\lambda)
-
\mathbf{Y}_j(\lambda-\eta)
\right\|
-
\eta
=0.
$$

Write

$$
\widehat{\mathbf{R}}_{ij}
=
\frac{
\mathbf{Y}_i(\lambda)-\mathbf{Y}_j(\lambda-\eta)
}{\eta},
\qquad
J_{ij}
=
1-
\mathbf{T}_j(\lambda-\eta)
\cdot
\widehat{\mathbf{R}}_{ij}.
$$

On a fixed active-root stratum, the first-order delay shift for the precession column is

$$
\delta\eta_{ij}^{(\mu)}
=
\frac{
\widehat{\mathbf{R}}_{ij}^{0}\cdot
\left[
\delta\mathbf{Y}_{i}^{(\mu)}(\lambda)
-
\delta\mathbf{Y}_{j}^{(\mu)}(\lambda-\eta_{ij}^{0})
\right]
}
{J_{ij}^{0}}.
$$

The total line-vector variation at the shifted source is

$$
\delta\mathbf{R}_{ij}^{(\mu)}
=
\delta\mathbf{Y}_{i}^{(\mu)}(\lambda)
-
\delta\mathbf{Y}_{j}^{(\mu)}(\lambda-\eta_{ij}^{0})
+
\mathbf{T}_{j}^{0}(\lambda-\eta_{ij}^{0})
\delta\eta_{ij}^{(\mu)}.
$$

The unit line-of-action variation is

$$
\delta\widehat{\mathbf{R}}_{ij}^{(\mu)}
=
\frac{
\left(I-\widehat{\mathbf{R}}_{ij}^{0}
\widehat{\mathbf{R}}_{ij}^{0T}\right)
\delta\mathbf{R}_{ij}^{(\mu)}
}{\eta_{ij}^{0}}.
$$

The source-tangent variation evaluated at the shifted source is

$$
\delta\mathbf{T}_{j,*}^{(\mu)}
=
\delta\mathbf{T}_{j}^{(\mu)}(\lambda-\eta_{ij}^{0})
-
\mathbf{K}_{j}^{0}(\lambda-\eta_{ij}^{0})
\delta\eta_{ij}^{(\mu)}.
$$

Hence

$$
\delta J_{ij}^{(\mu)}
=
-
\delta\mathbf{T}_{j,*}^{(\mu)}
\cdot
\widehat{\mathbf{R}}_{ij}^{0}
-
\mathbf{T}_{j}^{0}
\cdot
\delta\widehat{\mathbf{R}}_{ij}^{(\mu)}.
$$

For a retained hit with polarity sign

$$
\chi_{ij}=\sigma_i\sigma_j,
$$

the dimensionless force contribution is

$$
\widetilde{\mathbf{F}}_{ij}
=
\chi_{ij}
\frac{
\widehat{\mathbf{R}}_{ij}
}{
\eta_{ij}^{2}|J_{ij}|
}.
$$

Its first-order precession variation is

$$
\delta\widetilde{\mathbf{F}}_{ij}^{(\mu)}
=
\chi_{ij}
\left[
\frac{
\delta\widehat{\mathbf{R}}_{ij}^{(\mu)}
}{
\left(\eta_{ij}^{0}\right)^2|J_{ij}^{0}|
}
-
\frac{
2\widehat{\mathbf{R}}_{ij}^{0}\delta\eta_{ij}^{(\mu)}
}{
\left(\eta_{ij}^{0}\right)^3|J_{ij}^{0}|
}
-
\frac{
\widehat{\mathbf{R}}_{ij}^{0}
\operatorname{sgn}(J_{ij}^{0})
\delta J_{ij}^{(\mu)}
}{
\left(\eta_{ij}^{0}\right)^2|J_{ij}^{0}|^2
}
\right].
$$

The retained-root floor for the precession row is therefore not just a noncollision condition. The row must also report

$$
\eta_{\min}>0,
\qquad
J_{\min}>\epsilon_J,
\qquad
|\mathcal{A}_i(\lambda)|<\infty,
$$

with the same root labels used in the force, energy/action, and event rows.

---

## 7. Why Precession Changes The Missing Projections

Pure radial breathing has first-order displacement

$$
\delta\mathbf{Y}_{a,\sigma}^{(b)}
=
\sigma b_a(q)\mathbf{p}_a(q).
$$

It changes support radius and range, but its receiver-source displacement column lies in the span of the instantaneous carrier radii:

$$
\delta\mathbf{Y}_{i}^{(b)}
-
\delta\mathbf{Y}_{j}^{(b)}
\in
\operatorname{span}\{\mathbf{p}_{a_i},\mathbf{p}_{a_j}\}.
$$

By contrast, pure plane-normal precession gives

$$
\delta\mathbf{Y}_{a,\sigma}^{(\mu)}
=
\sigma h_a(q)\mathbf{n}_a.
$$

For a cross-binary hit $a\ne b$,

$$
\delta\mathbf{Y}_{i}^{(\mu)}
-
\delta\mathbf{Y}_{j}^{(\mu)}
=
\sigma h_a(\lambda)\mathbf{n}_a
-
\tau h_b(\lambda-\eta)\mathbf{n}_b.
$$

The vectors $\mathbf{n}_a$ and $\mathbf{n}_b$ are not generally contained in the radial two-plane spanned by $\mathbf{p}_a$ and $\mathbf{p}_b$ at that causal hit. Therefore the projected line-of-action variation

$$
\left(I-\widehat{\mathbf{R}}_{ij}^{0}
\widehat{\mathbf{R}}_{ij}^{0T}\right)
\left(
\delta\mathbf{Y}_{i}^{(\mu)}
-
\delta\mathbf{Y}_{j}^{(\mu)}
\right)
$$

contains directions unavailable to radial breathing.

This matters because the tangential residual uses

$$
\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i,
$$

and the curvature residual uses

$$
\mathbf{K}_i-\Gamma P_i^\perp\widetilde{\mathbf{F}}_i.
$$

Radial breathing can reduce tangential leakage by changing distances and inverse-square weights, but the arclength screens show that it does not align the full delayed force with curvature. Plane-normal precession changes the direction of cross-binary line-of-action contributions and simultaneously supplies out-of-plane curvature components $h_a''\mathbf{n}_a$. It is therefore the smallest pure-geometry ansatz that attacks both the force projection and curvature-direction failures without introducing a self/fold-layer or medium-response term.

---

## 8. Residual Vector Entries

For a finite precession search with parameter vector

$$
\alpha_{\mu}
=
\{U_{a,m}^{c},U_{a,m}^{s},V_{a,m}^{c},V_{a,m}^{s}\}_{a,m}
$$

after gauge removal, evaluate the residual vector

$$
\mathcal{F}_{\mu}(\alpha_{\mu},\Gamma)
=
\left(
\mathcal{R}_{\mathrm{state}},
\mathcal{R}_{L},
\mathcal{R}_{\mathrm{root}},
\mathcal{R}_{\mathrm{tan}},
\mathcal{R}_{\mathrm{curv}},
\mathcal{R}_{\mathrm{return}}
\right).
$$

The state rows are

$$
\mathcal{R}_{\mathrm{state}}
=
\left(
\mathcal{R}_{\mathrm{support}},
\mathcal{R}_{\mathrm{center}},
\mathcal{R}_{\mathrm{anti}},
\mathcal{R}_{\mathrm{orient}},
\mathcal{R}_{x}
\right),
$$

where

$$
\mathcal{R}_{\mathrm{support}}
=
\max_{i,\lambda}
\left|
\|\mathbf{Y}_i(\lambda)\|-1
\right|,
$$

$$
\mathcal{R}_{\mathrm{center}}
=
\max_{\lambda}
\left\|
\sum_i\omega_i\mathbf{Y}_i(\lambda)
\right\|,
$$

$$
\mathcal{R}_{\mathrm{anti}}
=
\max_{a,\lambda}
\left\|
\mathbf{Y}_{a,+}(\lambda)+\mathbf{Y}_{a,-}(\lambda)
\right\|,
$$

and

$$
\mathcal{R}_{x}
=
\max\left(0,\epsilon_x-d_{\min}\right).
$$

The precession orientation row may be recorded as

$$
\mathcal{R}_{\mathrm{orient}}
=
\left\|
\sum_{a=1}^{3}
\int_0^{L_a}
\boldsymbol{\mu}_a(\lambda)\,d\lambda
\right\|.
$$

The common-period row is

$$
\mathcal{R}_{L}
=
\left(L_2-L_1,L_3-L_1\right),
$$

or the corresponding winding residual.

The root row contains the sampled root equations and hard-floor penalties:

$$
\mathcal{R}_{\mathrm{root}}
=
\left(
G_{ij}^{\beta},
\max(0,\epsilon_J-J_{\min}),
\max(0,\eta_{\min}^{-1}\epsilon_{\eta}-1),
\mathcal{R}_{\mathrm{status}}
\right).
$$

The tangential row is

$$
\mathcal{R}_{\mathrm{tan},i}(\lambda)
=
\mathbf{T}_i(\lambda)\cdot
\widetilde{\mathbf{F}}_i(\lambda).
$$

The curvature row is

$$
\mathcal{R}_{\mathrm{curv},i}(\lambda)
=
\mathbf{K}_i(\lambda)
-
\Gamma P_i^\perp(\lambda)
\widetilde{\mathbf{F}}_i(\lambda),
$$

with

$$
P_i^\perp=I-\mathbf{T}_i\mathbf{T}_i^T.
$$

The scalar diagnostic coupling may be fitted as

$$
\Gamma_*
=
\frac{
\sum_{i,n}
\left(
P_i^\perp\widetilde{\mathbf{F}}_{i,n}
\right)
\cdot
\mathbf{K}_{i,n}
}{
\sum_{i,n}
\left\|
P_i^\perp\widetilde{\mathbf{F}}_{i,n}
\right\|^2
},
$$

but a retained physical branch must derive the normalization from the action, energy, and branch-inertia ledger. A fitted $\Gamma_*$ is a screen, not a proof.

The return row is a branch-stability placeholder unless computed:

$$
\mathcal{R}_{\mathrm{return}}
=
\Pi_{\mathrm{ng}}\left(P(Z_*)-Z_*\right).
$$

If the return map is not computed, record this row as `not_computed`; do not convert the dynamics screen into a stable branch claim.

---

## 9. Linearized Precession Columns

At a seed row, the first-order tangential column is

$$
\delta\mathcal{R}_{\mathrm{tan},i}^{(\mu)}
=
\delta\mathbf{T}_i^{(\mu)}
\cdot
\widetilde{\mathbf{F}}_i^{0}
+
\mathbf{T}_i^{0}
\cdot
\sum_{(j,\beta)\in\mathcal{A}_i^{0}}
\delta\widetilde{\mathbf{F}}_{ij}^{(\mu,\beta)}.
$$

The first-order curvature column is

$$
\delta\mathcal{R}_{\mathrm{curv},i}^{(\mu)}
=
\delta\mathbf{K}_i^{(\mu)}
-
\delta\Gamma
P_i^{0\perp}\widetilde{\mathbf{F}}_i^{0}
-
\Gamma
\left[
P_i^{0\perp}
\sum_{(j,\beta)\in\mathcal{A}_i^{0}}
\delta\widetilde{\mathbf{F}}_{ij}^{(\mu,\beta)}
+
\delta P_i^{\perp}
\widetilde{\mathbf{F}}_i^{0}
\right],
$$

where

$$
\delta P_i^{\perp}
=
-
\delta\mathbf{T}_i^{(\mu)}
\mathbf{T}_i^{0T}
-
\mathbf{T}_i^{0}
\delta\mathbf{T}_i^{(\mu)T}.
$$

The gauge-reduced finite-mode necessary screen is

$$
\operatorname{rank}(A_{\mu,\mathrm{red}})
=
\operatorname{rank}
\left(
\begin{bmatrix}
A_{\mu,\mathrm{red}} & -\mathbf{r}_{\mathrm{red}}^{0}
\end{bmatrix}
\right).
$$

Equivalently,

$$
\mathbf{y}^T\mathbf{r}_{\mathrm{red}}^{0}=0
\qquad
\text{for every }
\mathbf{y}\in\ker(A_{\mu,\mathrm{red}}^T).
$$

Failure of this augmented-rank condition proves only that the selected finite precession family cannot perturbatively close the selected residual rows near the seed. Passing it does not retain a branch; it only justifies a nonlinear arclength search with the same active-root convention.

---

## 10. Nonlinear Search Packet

A minimal nonlinear plane-normal precession screen should report:

| Output | Meaning |
| --- | --- |
| `plane_normal_modes` | Fourier coefficients of $u_a$ and $v_a$ after orientation-gauge removal |
| `normal_displacement_modes` | Fourier coefficients of $h_a=u_a\sin q-v_a\cos q$ |
| `curve_lengths` | $L_a$ and $\mathcal{R}_{L}$ |
| `root_ledger` | retained labels, $\eta_{\min}$, $J_{\min}$, root counts, and statuses |
| `support_center_antipodal` | $\mathcal{R}_{\mathrm{support}}$, $\mathcal{R}_{\mathrm{center}}$, and $\mathcal{R}_{\mathrm{anti}}$ |
| `tangential_residual` | RMS and maximum of $\mathcal{R}_{\mathrm{tan}}$ |
| `curvature_residual` | RMS and maximum of $\mathcal{R}_{\mathrm{curv}}$ at the diagnostic $\Gamma_*$ |
| `projection_gain` | reduction in line-of-action projection residual relative to the arclength breathing row |
| `failure_code` | first failing row: `rank-fail`, `jacobian-floor-violation`, `projection-collision`, `tangential-residual-open`, `curvature-residual-open`, or `event-action-not-computed` |

The search objective should use the intrinsic residuals:

$$
\mathcal{J}_{\mu}
=
\|\mathcal{R}_{L}\|^2
+
\|\mathcal{R}_{\mathrm{root}}\|^2
+
\|\mathcal{R}_{\mathrm{tan}}\|^2
+
\|\mathcal{R}_{\mathrm{curv}}\|^2
+
\mathcal{P}_{x}
+
\mathcal{P}_{J}
+
\mathcal{P}_{\mathrm{support}}
+
\mathcal{P}_{\mathrm{orient}}.
$$

The branch remains rejected if any hard floor closes:

$$
d_{\min}\le\epsilon_x,
\qquad
J_{\min}\le\epsilon_J,
\qquad
\eta_{\min}\le0,
$$

or if the active-root ledger changes without a declared root-status transition.

---

## 11. Priority Decision

This packet is `priority-only`.

The ansatz is mathematically valuable because it supplies force-projection and curvature directions unavailable to pure radial breathing while preserving unit speed to first order in the pure plane-normal gauge. It becomes promotion material only after a run packet supplies one active-root ledger and one curve family for which

$$
\mathcal{R}_{\mathrm{state}}
=
\mathcal{R}_{L}
=
\mathcal{R}_{\mathrm{root}}
=
\mathcal{R}_{\mathrm{tan}}
=
\mathcal{R}_{\mathrm{curv}}
=
\mathbf{0}
$$

within declared tolerances, with strict noncollision and Jacobian floors, and with event/action rows either closed or explicitly marked outside a narrower dynamics-only claim.
