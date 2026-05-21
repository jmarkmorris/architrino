# Bounded Speed Factor Center-Time Dynamics

Promotion status: `priority-only`. This packet converts the bounded speed factor model from intrinsic arclength parameters to a common center-time/event-time chart. It depends on the architecture and bounded-speed packets [tri-binary-architecture.md](tri-binary-architecture.md), [variable-speed-factor-extension.md](variable-speed-factor-extension.md), [bounded-speed-factor-executable-solver-protocol.md](bounded-speed-factor-executable-solver-protocol.md), [bounded-speed-factor-speed-ode-solvability.md](bounded-speed-factor-speed-ode-solvability.md), and [bounded-speed-factor-event-normal-forms.md](bounded-speed-factor-event-normal-forms.md).

The purpose is not to retain a branch. The purpose is to make explicit which equations are evaluated at a shared center time $u$, which equations are evaluated at delayed event time $u-\eta$, and how the intrinsic arclength equations become velocity, acceleration, root, and force-projection residuals in that chart.

---

## 1. Center Time And Site Clocks

Let each site curve remain arclength-parametrized:

$$
\mathbf{Y}_i:\mathbb{R}/L_i\mathbb{Z}\to\mathbb{R}^3,
\qquad
\|\mathbf{Y}_i'(\lambda_i)\|=1.
$$

Write

$$
\mathbf{T}_i(\lambda_i)=\mathbf{Y}_i'(\lambda_i),
\qquad
\mathbf{K}_i(\lambda_i)=\mathbf{Y}_i''(\lambda_i),
\qquad
P_i^\perp(\lambda_i)=I-\mathbf{T}_i(\lambda_i)\mathbf{T}_i(\lambda_i)^T.
$$

The bounded speed factor is a positive dimensionless function

$$
0<\nu_-\le \nu_i(\lambda_i)\le \nu_+<\infty.
$$

Define the common dimensionless center time by

$$
u=\frac{c_f(t-t_0)}{R_*}.
$$

The site clock map is

$$
\chi_i(\lambda_i)
=
\int_0^{\lambda_i}\frac{d\xi}{\nu_i(\xi)}.
$$

Since $\nu_i>0$, $\chi_i$ is strictly increasing on a lifted interval. Its inverse is

$$
\Lambda_i(u)=\chi_i^{-1}(u),
\qquad
\frac{d\Lambda_i}{du}
=
\nu_i(\Lambda_i(u)).
$$

The dimensionless center-time trajectory is

$$
\mathbf{X}_i(u)
=
\mathbf{Y}_i(\Lambda_i(u)),
$$

and the physical center-gauge trajectory is

$$
\mathbf{x}_i(t)
=
R_*\mathbf{X}_i(u)
=
R_*\mathbf{Y}_i(\Lambda_i(u)).
$$

The physical return row is the center-time period row

$$
H_i=\chi_i(L_i)
=
\int_0^{L_i}\frac{d\lambda}{\nu_i(\lambda)}.
$$

An equal-period branch requires $H_i=H_*$ for all sites. A winding branch instead declares integers $m_i\in\mathbb{N}$ and requires

$$
m_iH_i=H_{\mathrm{com}}.
$$

Equal arclength length is therefore not the retained period row in the bounded-speed model. Equal center-time return is the retained row.

---

## 2. Event-Time Root Chart

At receiver center time $u$, the receiver arclength is

$$
\lambda_i(u)=\Lambda_i(u).
$$

For a dimensionless delay $\eta>0$, the source event time is

$$
u^- = u-\eta,
$$

and the delayed source arclength is

$$
\lambda_j^-(u,\eta)=\Lambda_j(u-\eta).
$$

The bounded-speed causal-root equation is

$$
G_{ij}^{\nu}(u,\eta)
=
\left\|
\mathbf{Y}_i(\Lambda_i(u))
-
\mathbf{Y}_j(\Lambda_j(u-\eta))
\right\|
-\eta
=0.
$$

For a retained root label $r=(i,j,\alpha)$, write the root as $\eta_r(u)$ and define

$$
\mathbf{R}_r(u)
=
\mathbf{Y}_i(\lambda_i(u))
-
\mathbf{Y}_j(\lambda_j^-(u,\eta_r(u))),
\qquad
\widehat{\mathbf{R}}_r(u)=\frac{\mathbf{R}_r(u)}{\eta_r(u)}.
$$

The delayed source speed factor is

$$
\nu_j^-(u)=\nu_j(\lambda_j^-(u,\eta_r(u))).
$$

At fixed receiver time $u$,

$$
\frac{\partial\lambda_j^-}{\partial\eta}
=
-\nu_j^-.
$$

Hence

$$
\partial_\eta G_{ij}^{\nu}
=
\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_r-1
=
-J_r^\nu,
$$

with bounded-speed root Jacobian

$$
J_r^\nu
=
1-\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_r.
$$

At fixed delay,

$$
\partial_uG_{ij}^{\nu}
=
\widehat{\mathbf{R}}_r\cdot
\left(
\nu_i\mathbf{T}_i-\nu_j^-\mathbf{T}_j^-
\right).
$$

Therefore a regular root sheet satisfies

$$
\frac{d\eta_r}{du}
=
\frac{
\widehat{\mathbf{R}}_r\cdot
\left(
\nu_i\mathbf{T}_i-\nu_j^-\mathbf{T}_j^-
\right)
}{
J_r^\nu
}.
$$

The retained event-time root chart requires a positive delay floor, a finite active-root ledger, and a fixed Jacobian-sign floor

$$
\eta_r(u)\ge \eta_0>0,
\qquad
\zeta_rJ_r^\nu(u)\ge J_0>0,
\qquad
\zeta_r\in\{+1,-1\}.
$$

If a same-source event interval appears, it must use the short-duration, overspeed-budget, action, and event rows from the bounded-speed event normal-form packet.

---

## 3. Center-Time Velocity And Acceleration

The center-time derivative of the dimensionless trajectory is

$$
\frac{d\mathbf{X}_i}{du}
=
\nu_i\mathbf{T}_i.
$$

The physical velocity is therefore

$$
\dot{\mathbf{x}}_i(t)
=
c_f\nu_i(\lambda_i(u))\mathbf{T}_i(\lambda_i(u)).
$$

A second center-time derivative gives

$$
\frac{d^2\mathbf{X}_i}{du^2}
=
\nu_i\nu_i'\mathbf{T}_i
+
\nu_i^2\mathbf{K}_i,
$$

where $\nu_i'=d\nu_i/d\lambda_i$. Thus

$$
\ddot{\mathbf{x}}_i(t)
=
\frac{c_f^2}{R_*}
\left(
\nu_i\nu_i'\mathbf{T}_i
+
\nu_i^2\mathbf{K}_i
\right).
$$

The center-time acceleration splits into tangent and normal rows:

$$
\mathbf{T}_i\cdot\frac{d^2\mathbf{X}_i}{du^2}
=
\nu_i\nu_i',
$$

and

$$
P_i^\perp\frac{d^2\mathbf{X}_i}{du^2}
=
\nu_i^2\mathbf{K}_i.
$$

This is the center-time form of the intrinsic bounded-speed dynamics. The speed factor turns tangential force into speed evolution; it is no longer an automatic zero row unless $\nu_i$ is constant.

---

## 4. Center-Time Force Ledger

On a retained event-time root ledger $\mathcal{A}_i^\nu(u)$, define the dimensionless delayed force by

$$
\widetilde{\mathbf{F}}_i^\nu(u)
=
\sum_{r\in\mathcal{A}_i^\nu(u)}
\sigma_i\sigma_j
\frac{
\widehat{\mathbf{R}}_r(u)
}{
\eta_r(u)^2|J_r^\nu(u)|
}
+
\widetilde{\mathbf{F}}_{i,\mathrm{self}}^\nu(u)
+
\widetilde{\mathbf{F}}_{i,\mathrm{med}}^\nu(u).
$$

Here the self and medium terms are present only when their ledgers are explicitly supplied on the same event-time convention. The dynamics residual at center time $u$ is

$$
\mathcal{R}_{\mathrm{dyn},i}^\nu(u)
=
\nu_i\nu_i'\mathbf{T}_i
+
\nu_i^2\mathbf{K}_i
-
\Gamma\widetilde{\mathbf{F}}_i^\nu(u).
$$

Equivalently, the force projection residuals are

$$
\mathcal{R}_{\parallel,i}^\nu(u)
=
\nu_i\nu_i'
-
\Gamma\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^\nu(u),
$$

and

$$
\mathcal{R}_{\perp,i}^\nu(u)
=
\nu_i^2\mathbf{K}_i
-
\Gamma P_i^\perp\widetilde{\mathbf{F}}_i^\nu(u).
$$

Thus

$$
\mathcal{R}_{\mathrm{dyn},i}^\nu=0
\quad\Longleftrightarrow\quad
\mathcal{R}_{\parallel,i}^\nu=0
\ \text{and}\
\mathcal{R}_{\perp,i}^\nu=\mathbf{0}.
$$

The corresponding center-time residual vector is

$$
\mathcal{F}_{\mathrm{center}}^\nu
=
\left(
\mathcal{R}_{\mathrm{gauge}},
\mathcal{R}_{H},
\mathcal{R}_{\nu\mathrm{band}},
\mathcal{R}_{\mathrm{speedODE}}^\nu,
\mathcal{R}_{\parallel}^\nu,
\mathcal{R}_{\perp}^\nu,
\mathcal{R}_{\Gamma}^\nu,
\mathcal{R}_{\mathrm{event}}^\nu
\right),
$$

where $\mathcal{R}_{\Gamma}^\nu$ is either the action-derived scale row or the diagnostic status `gamma-fitted-not-derived`. If the derivative matrix omits the clock maps, inverse maps, speed columns, root Jacobian variations, or event rows, the result is not a bounded-speed center-time certificate.

The row $\mathcal{R}_{\mathrm{speedODE}}^\nu$ is the closed-period scalar tangent equation from [bounded-speed-factor-speed-ode-solvability.md](bounded-speed-factor-speed-ode-solvability.md). It carries the zero-mean tangent-force condition, primitive excursion, speed-band feasibility interval, and clock/length speed selection.

---

## 5. Clock Variation Rows

For coefficient variations $v=(\delta a,\delta b)$, let

$$
\xi_i(\lambda)=D_v\mathbf{Y}_i(\lambda),
\qquad
\rho_i(\lambda)=D_v\nu_i(\lambda).
$$

At fixed arclength,

$$
D_v\chi_i(\lambda)
=
-\int_0^\lambda
\frac{\rho_i(\zeta)}{\nu_i(\zeta)^2}
d\zeta.
$$

At fixed center time,

$$
D_v\Lambda_i(u)
=
-\nu_i(\Lambda_i(u))D_v\chi_i(\Lambda_i(u)).
$$

Therefore the center-time variation of the trajectory is the clock-corrected variation

$$
D_v\mathbf{X}_i(u)
=
\xi_i(\lambda_i)
-
\nu_i(\lambda_i)\mathbf{T}_i(\lambda_i)D_v\chi_i(\lambda_i).
$$

The same correction must be used for delayed source events:

$$
D_v\mathbf{X}_j^-(u,\eta)
=
\xi_j(\lambda_j^-)
-
\nu_j(\lambda_j^-)\mathbf{T}_j(\lambda_j^-)D_v\chi_j(\lambda_j^-).
$$

These formulas are the bridge from intrinsic arclength coefficient variations to center-time Newton, Krawczyk, and event calculations.

---

## 6. Fixed-Speed Limit

**Lemma target: fixed-speed center-time reduction.** Suppose the bounded-speed data satisfy

$$
\nu_i(\lambda)\equiv1
\qquad
\text{for every site }i.
$$

Then

$$
\chi_i(\lambda)=\lambda,
\qquad
\Lambda_i(u)=u,
\qquad
H_i=L_i.
$$

The event-time root equation reduces to

$$
G_{ij}^{1}(u,\eta)
=
\left\|
\mathbf{Y}_i(u)-\mathbf{Y}_j(u-\eta)
\right\|
-\eta,
$$

and the bounded-speed Jacobian reduces to

$$
J_r^1
=
1-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_r.
$$

The center-time velocity and acceleration become

$$
\dot{\mathbf{x}}_i(t)
=
c_f\mathbf{T}_i(u),
\qquad
\ddot{\mathbf{x}}_i(t)
=
\frac{c_f^2}{R_*}\mathbf{K}_i(u).
$$

The force projection residuals become

$$
\mathcal{R}_{\parallel,i}^{1}
=
-\Gamma\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^{1},
$$

and

$$
\mathcal{R}_{\perp,i}^{1}
=
\mathbf{K}_i
-
\Gamma P_i^\perp\widetilde{\mathbf{F}}_i^{1}.
$$

Therefore $\mathcal{R}_{\parallel,i}^{1}=0$ is exactly the fixed-speed tangential closure row, and $\mathcal{R}_{\perp,i}^{1}=0$ is exactly the fixed-speed curvature row.

Proof route:

1. With $\nu_i\equiv1$, every site clock is the identity and center time equals arclength phase.
2. The source event time $u-\eta$ is therefore the fixed-speed delayed source phase.
3. The derivative $d\Lambda_i/du=1$ removes all speed columns from velocity, acceleration, root, and clock-variation formulas.
4. The tangential acceleration $\nu_i\nu_i'\mathbf{T}_i$ vanishes, so tangent dynamics can only close if the delayed force has zero tangent projection.
5. The normal acceleration is the intrinsic curvature vector, giving the fixed-speed curvature equation.

Current status:

$$
\texttt{bounded-speed-center-time-dynamics-open}.
$$
