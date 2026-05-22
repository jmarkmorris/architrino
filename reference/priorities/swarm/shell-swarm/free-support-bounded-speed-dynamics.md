# Free-Support Bounded Speed Dynamics

Promotion status: `priority-only`. This packet answers the support-geometry concern for the bounded speed factor tri-binary model. The base branch model does not assume that architrino paths lie on a sphere. It assumes closed arclength curves in the Euclidean substrate $\mathbb{R}^3$, with a declared support-band row. Fixed-sphere or fixed-radius motion is only a special sector obtained by setting the support radius constant.

This packet refines the support geometry used by [bounded-speed-factor-center-time-dynamics.md](bounded-speed-factor-center-time-dynamics.md), [swarm-architecture.md](swarm-architecture.md), [nested-shell-swarm-model-card.md](../nested-shell-swarm/nested-shell-swarm-model-card.md), and [force-balance-reduction.md](force-balance-reduction.md). It does not retain a branch, compute a causal-root ledger, or authorize corpus migration.

---

## 1. Base Geometry: Closed Free-Support Curves

Let each architrino site be represented by a closed arclength curve

$$
\mathbf{Y}_i:\mathbb{R}/L_i\mathbb{Z}\to\mathbb{R}^3,
\qquad
\|\mathbf{Y}_i'(\lambda)\|=1.
$$

Let $\mathbf{C}\in\mathbb{R}^3$ be the declared branch center in the normalized center-gauge chart. The support radius is

$$
r_i(\lambda)=\|\mathbf{Y}_i(\lambda)-\mathbf{C}\|.
$$

The base support condition is a band row, not a spherical constraint:

$$
R_i^-(\lambda)
\le
r_i(\lambda)
\le
R_i^+(\lambda),
$$

or, in the same-level constant-band shorthand,

$$
R-\delta
\le
r_i(\lambda)
\le
R+\delta.
$$

The support-band row may be narrow, wide, fixed in center time, continued along a branch, or partition-indexed in a nested shell or shell swarm case. None of these choices makes the curve spherical unless the retained packet adds the stronger equality row

$$
r_i(\lambda)\equiv R_i.
$$

Thus the default object is a free-support closed curve in $\mathbb{R}^3$:

$$
\texttt{closed-arclength-curve-in-R3-with-support-band}.
$$

It is not

$$
\texttt{spherical-curve-assumed}.
$$

---

## 2. Radial And Support Decomposition

Assume $r_i(\lambda)>0$ on the retained window and define the outward support normal

$$
\mathbf{n}_i(\lambda)
=
\frac{\mathbf{Y}_i(\lambda)-\mathbf{C}}{r_i(\lambda)}.
$$

Let

$$
\mathbf{T}_i=\mathbf{Y}_i',
\qquad
\mathbf{K}_i=\mathbf{Y}_i'',
\qquad
P_{T,i}^{\perp}=I-\mathbf{T}_i\mathbf{T}_i^T,
$$

and define the support-tangent projector

$$
P_{S,i}=I-\mathbf{n}_i\mathbf{n}_i^T.
$$

The radial derivative is

$$
r_i'=\mathbf{n}_i\cdot\mathbf{T}_i.
$$

The tangent decomposes into radial and support-tangent parts:

$$
\mathbf{T}_i
=
r_i'\mathbf{n}_i
+
\mathbf{w}_i,
\qquad
\mathbf{w}_i=P_{S,i}\mathbf{T}_i.
$$

Since $\|\mathbf{T}_i\|=1$,

$$
\|\mathbf{w}_i\|^2
=
1-(r_i')^2.
$$

When $\|\mathbf{w}_i\|>0$, define the unit support-tangent direction

$$
\mathbf{s}_i
=
\frac{\mathbf{w}_i}{\|\mathbf{w}_i\|}.
$$

The curvature vector also splits into support-radial and support-tangent-plane parts:

$$
\mathbf{K}_i
=
(\mathbf{n}_i\cdot\mathbf{K}_i)\mathbf{n}_i
+
P_{S,i}\mathbf{K}_i.
$$

The scalar support-radius identity is

$$
r_i''
=
\mathbf{n}_i\cdot\mathbf{K}_i
+
\frac{1-(r_i')^2}{r_i}.
$$

Equivalently,

$$
\mathbf{n}_i\cdot\mathbf{K}_i
=
r_i''
-
\frac{1-(r_i')^2}{r_i}.
$$

This identity is the arclength version of the radial/support-band reduction in the force-balance packet. It is a kinematic identity for curves in $\mathbb{R}^3$ and does not require a sphere.

---

## 3. Bounded Speed Factor In Center Time

Let the bounded speed factor be

$$
0<\nu_-\le\nu_i(\lambda)\le\nu_+<\infty.
$$

The center-time clock is

$$
\chi_i(\lambda)
=
\int_0^\lambda\frac{d\xi}{\nu_i(\xi)},
\qquad
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
\mathbf{Y}_i(\Lambda_i(u)).
$$

Its velocity and acceleration are

$$
\frac{d\mathbf{X}_i}{du}
=
\nu_i\mathbf{T}_i,
$$

and

$$
\frac{d^2\mathbf{X}_i}{du^2}
=
\nu_i\nu_i'\mathbf{T}_i
+
\nu_i^2\mathbf{K}_i,
$$

where every right-hand quantity is evaluated at $\lambda=\Lambda_i(u)$ and $\nu_i'=d\nu_i/d\lambda$.

The physical center-gauge velocity and acceleration are

$$
\dot{\mathbf{x}}_i(t)-\dot{\mathbf{C}}_{\mathrm{phys}}(t)
=
c_f\nu_i\mathbf{T}_i,
$$

and

$$
\ddot{\mathbf{x}}_i(t)-\ddot{\mathbf{C}}_{\mathrm{phys}}(t)
=
\frac{c_f^2}{R_*}
\left(
\nu_i\nu_i'\mathbf{T}_i
+
\nu_i^2\mathbf{K}_i
\right),
$$

when $u=c_f(t-t_0)/R_*$. The center-gauge branch-existence chart sets $\ddot{\mathbf{C}}_{\mathrm{phys}}=\mathbf{0}$; moving-branch exports must keep the center-acceleration term.

The support radius in center time is

$$
\rho_i(u)
=
r_i(\Lambda_i(u)).
$$

Its first two center-time derivatives are

$$
\frac{d\rho_i}{du}
=
\nu_i r_i',
$$

and

$$
\frac{d^2\rho_i}{du^2}
=
\nu_i\nu_i' r_i'
+
\nu_i^2 r_i''.
$$

Combining the radius identity with the bounded speed factor acceleration gives the support-radial projection

$$
\mathbf{n}_i\cdot
\frac{d^2\mathbf{X}_i}{du^2}
=
\frac{d^2\rho_i}{du^2}
-
\frac{\nu_i^2\left(1-(r_i')^2\right)}{r_i}.
$$

Thus radial drift is not omitted. It is carried by $\rho_i'$, $\rho_i''$, and the support-band barriers.

---

## 4. Force Ledger And Four Dynamics Rows

On one bounded speed factor causal-root ledger, let the dimensionless delayed force be

$$
\widetilde{\mathbf{F}}_i^\nu(u)
=
\sum_{r\in\mathcal{A}_i^\nu(u)}
\sigma_i\sigma_j
\frac{\widehat{\mathbf{R}}_r(u)}
{\eta_r(u)^2|J_r^\nu(u)|}
+
\widetilde{\mathbf{F}}_{i,\mathrm{self}}^\nu(u)
+
\widetilde{\mathbf{F}}_{i,\mathrm{med}}^\nu(u),
$$

with self and medium-response terms present only when their ledgers are supplied on the same event-time convention.

If the support descriptor is enforced by active support multipliers rather than by an inactive viability margin, the dynamics ledger must use the same force convention as the action ledger. Define

$$
\widetilde{\mathbf{F}}_{i,\mathrm{tot}}^\nu
=
\widetilde{\mathbf{F}}_i^\nu
+
\widetilde{\mathbf{F}}_{i,\mathrm{supp}}^\nu,
\qquad
\widetilde{\mathbf{F}}_{i,\mathrm{supp}}^\nu
=
\left(\mu_i^+-\mu_i^-\right)\mathbf{n}_i,
$$

with the support multipliers, complementarity rows, and support-work ledger supplied by [free-support-action-compatibility-theorem.md](free-support-action-compatibility-theorem.md). If the branch instead treats support viability as a variational inequality, the residual rows below are read in the tangent cone of the admissible support band. In the inactive-support sector $\widetilde{\mathbf{F}}_{i,\mathrm{tot}}^\nu=\widetilde{\mathbf{F}}_i^\nu$.

The full center-time dynamics residual is

$$
\mathcal{R}_{\mathrm{dyn},i}^{\nu}
=
\nu_i\nu_i'\mathbf{T}_i
+
\nu_i^2\mathbf{K}_i
-
\Gamma\widetilde{\mathbf{F}}_{i,\mathrm{tot}}^\nu.
$$

For a free-support branch, this residual should be read through four rows.

### 4.1 Tangent Row

The tangent row is

$$
\mathcal{R}_{\parallel,i}^{\nu}
=
\mathbf{T}_i\cdot\mathcal{R}_{\mathrm{dyn},i}^{\nu}
=
\nu_i\nu_i'
-
\Gamma\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_{i,\mathrm{tot}}^\nu.
$$

For a bounded speed factor branch, tangent force is allowed only when it is accounted for as speed-factor evolution. The fixed-speed tangent-zero row is recovered only when $\nu_i'\equiv0$.

### 4.2 Normal-Curvature Row

The curve-normal row is

$$
\mathcal{R}_{\perp T,i}^{\nu}
=
P_{T,i}^{\perp}\mathcal{R}_{\mathrm{dyn},i}^{\nu}
=
\nu_i^2\mathbf{K}_i
-
\Gamma P_{T,i}^{\perp}\widetilde{\mathbf{F}}_{i,\mathrm{tot}}^\nu.
$$

This is the curvature-balancing row from the intrinsic bounded speed factor dynamics. It is a curve-normal condition. It is not the same thing as a fixed-radius radial equation unless $r_i$ is constant.

### 4.3 Radial-Support Row

The support-radial projection is

$$
\mathcal{R}_{r,i}^{\nu}
=
\mathbf{n}_i\cdot\mathcal{R}_{\mathrm{dyn},i}^{\nu}.
$$

Equivalently,

$$
\mathcal{R}_{r,i}^{\nu}
=
\frac{d^2\rho_i}{du^2}
-
\frac{\nu_i^2\left(1-(r_i')^2\right)}{r_i}
-
\Gamma\mathbf{n}_i\cdot\widetilde{\mathbf{F}}_{i,\mathrm{tot}}^\nu.
$$

A prescribed support-radius branch requires

$$
\mathcal{R}_{r,i}^{\nu}=0
$$

on the retained window. A free-support branch may instead treat $\rho_i$ as an unknown curve output and impose the support-band viability row below. In either case, the radial-support row is computed from the actual curve; it is not imposed by placing the path on a sphere.

The support-tangent-plane force row, useful when separating angular bending from radial support, is

$$
\mathcal{R}_{S,i}^{\nu}
=
P_{S,i}\mathcal{R}_{\mathrm{dyn},i}^{\nu}.
$$

Together, $\mathcal{R}_{r,i}^{\nu}$ and $\mathcal{R}_{S,i}^{\nu}$ are equivalent to the vector residual, but they expose which part controls the support radius and which part bends the path inside the instantaneous support shell.

### 4.4 Support-Band Row

For a constant same-level support band, define

$$
B_i^+(\lambda)=r_i(\lambda)-R-\delta,
\qquad
B_i^-(\lambda)=R-\delta-r_i(\lambda).
$$

The band inclusion row is

$$
B_i^+(\lambda)\le0,
\qquad
B_i^-(\lambda)\le0.
$$

In center time this becomes

$$
\mathcal{B}_i^+(u)=\rho_i(u)-R-\delta\le0,
\qquad
\mathcal{B}_i^-(u)=R-\delta-\rho_i(u)\le0.
$$

The boundary viability tests are

$$
\mathcal{B}_i^+(u)=0,
\quad
\frac{d\mathcal{B}_i^+}{du}=0
\quad\Longrightarrow\quad
\frac{d^2\mathcal{B}_i^+}{du^2}\le0,
$$

and

$$
\mathcal{B}_i^-(u)=0,
\quad
\frac{d\mathcal{B}_i^-}{du}=0
\quad\Longrightarrow\quad
\frac{d^2\mathcal{B}_i^-}{du^2}\le0.
$$

For a variable band $R(u)\pm\delta(u)$, replace $\rho_i-R-\delta$ and $R-\delta-\rho_i$ by the corresponding time-dependent barriers and retain their first and second center-time derivatives.

The free-support residual vector is therefore

$$
\mathcal{F}_{\mathrm{free}}^\nu
=
\left(
\mathcal{R}_{\mathrm{gauge}},
\mathcal{R}_{H},
\mathcal{R}_{\mathrm{root}}^\nu,
\mathcal{R}_{\parallel}^\nu,
\mathcal{R}_{\perp T}^\nu,
\mathcal{R}_{r}^\nu,
\mathcal{R}_{\mathrm{support\text{-}band}}^\nu,
\mathcal{R}_{\Gamma}^\nu,
\mathcal{R}_{\mathrm{event}}^\nu
\right).
$$

The support rows are retained alongside the root, clock, action, and event rows. They do not replace those rows.

---

## 5. Fixed-Sphere / Fixed-Radius Special Case

The fixed-sphere sector is obtained by adding

$$
r_i(\lambda)\equiv R_i.
$$

Then

$$
r_i'=0,
\qquad
r_i''=0,
\qquad
\mathbf{T}_i\cdot\mathbf{n}_i=0.
$$

The support-radius identity gives

$$
\mathbf{n}_i\cdot\mathbf{K}_i
=
-\frac{1}{R_i}.
$$

The center-time support-radial acceleration becomes

$$
\mathbf{n}_i\cdot
\frac{d^2\mathbf{X}_i}{du^2}
=
-\frac{\nu_i^2}{R_i}.
$$

Thus the radial-support row reduces to the centripetal-support equation

$$
0
=
-\frac{\nu_i^2}{R_i}
-
\Gamma\mathbf{n}_i\cdot\widetilde{\mathbf{F}}_i^\nu.
$$

Equivalently,

$$
\Gamma\mathbf{n}_i\cdot\widetilde{\mathbf{F}}_i^\nu
=
-\frac{\nu_i^2}{R_i}.
$$

For fixed speed, $\nu_i\equiv1$, this becomes

$$
\Gamma\mathbf{n}_i\cdot\widetilde{\mathbf{F}}_i^1
=
-\frac{1}{R_i},
$$

which is the normalized version of the rigid-radius centripetal row in the force-balance packet.

Therefore fixed-sphere dynamics are a strict subcase:

$$
\texttt{free-support-bounded-speed}
\quad
\xrightarrow{\,r_i\equiv R_i\,}
\quad
\texttt{fixed-radius-bounded-speed}
\quad
\xrightarrow{\,\nu_i\equiv1\,}
\quad
\texttt{fixed-radius-fixed-speed}.
$$

The implication does not reverse. A proof packet that works only in the fixed-radius sector has not proved the free-support bounded speed factor branch.

---

## 6. Certificate Output

A free-support bounded speed factor branch packet must emit at least:

| Row | Required output |
| --- | --- |
| `curve_geometry` | closed arclength curves $\mathbf{Y}_i$, center $\mathbf{C}$, nonzero support-radius floor, and period or winding data |
| `support_descriptor` | sector type, support functional or support band, support margins, radial/support residuals, and fixed-radius-special-case status |
| `support_radius` | $r_i$, $r_i'$, $r_i''$, $\mathbf{n}_i$, and $P_{S,i}$ as the curve data consumed by `support_descriptor` |
| `speed_factor` | positive bounded speed factor $\nu_i$, clock $\chi_i$, inverse clock $\Lambda_i$, and center-time period row |
| `speed_ode_solvability` | zero-mean tangent forcing, primitive excursion, speed-band feasibility, and clock/length speed from [bounded-speed-factor-speed-ode-solvability.md](bounded-speed-factor-speed-ode-solvability.md) |
| `root_ledger` | bounded speed factor roots, delays, Jacobians, and source-pair policy on the same center-time chart |
| `dynamics_rows` | tangent, curve-normal, support-radial, and support-band residuals evaluated on the same force ledger |
| `sector_status` | one of `free-support`, `fixed-radius-special-case`, `same-level-band`, `nested-band`, or `transition-band` |
| `support_action_work` | support multipliers, support work, and Noether support residuals from [free-support-action-compatibility-theorem.md](free-support-action-compatibility-theorem.md), or a certified inactive-support row |
| `event_action_status` | action-derived scale row or `gamma-fitted-not-derived`, plus event-ledger status |

The minimum theorem target is:

**Theorem target: free-support bounded speed dynamics.** Fix one bounded speed factor branch chart, one source-pair policy, one support-band convention, one event/action convention, and one row-weight convention. Suppose closed arclength curves $\mathbf{Y}_i$ in $\mathbb{R}^3$ have positive support-radius floor, positive speed-factor floor, finite active causal-root ledger with positive Jacobian floors, finite memory depth, support-band viability, and vanishing free-support dynamics residual $\mathcal{F}_{\mathrm{free}}^\nu$ within the retained proof budget. Then the branch is a bounded speed factor free-support dynamics candidate. It becomes a fixed-radius candidate only if the additional equality row $r_i\equiv R_i$ is certified.

Current status:

$$
\texttt{free-support-bounded-speed-dynamics-open}.
$$
