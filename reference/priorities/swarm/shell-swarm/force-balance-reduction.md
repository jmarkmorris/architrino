# Force-Balance Reduction

Promotion status: `priority-only`. This packet derives necessary force-balance equations for a same-level tri-binary carrier. It does not prove existence, stability, energy/action closure, observer export, or migration readiness. Its role is to make the tangential and radial/support-band residuals from [Shell Braid Branch Mathematics](shell-swarm-branch-mathematics.md) analytically checkable on the same active-root convention used by [octahedral-carrier-worked-example.md](octahedral-carrier-worked-example.md).

---

## 1. Inputs And Active-Root Partition

Work in the same-level branch chart

$$
\mathbf{x}_i(t)=\mathbf{C}(t)+\mathbf{y}_i(t),
\qquad
\mathbf{u}_i(t)=\dot{\mathbf{y}}_i(t),
\qquad
q_i=\sigma_i\epsilon,
\qquad
\sigma_i\in\{+1,-1\}.
$$

For a retained causal root, write

$$
\tau_{ij}^{\alpha}(t)=t-s_{ij}^{\alpha}(t),
\qquad
\mathbf{r}_{ij}^{\alpha}(t)
=
\mathbf{x}_i(t)-\mathbf{x}_j\!\left(s_{ij}^{\alpha}(t)\right),
$$

$$
r_{ij}^{\alpha}(t)
=
\left\|\mathbf{r}_{ij}^{\alpha}(t)\right\|
=
c_f\tau_{ij}^{\alpha}(t),
\qquad
\hat{\mathbf{r}}_{ij}^{\alpha}(t)
=
\frac{\mathbf{r}_{ij}^{\alpha}(t)}{r_{ij}^{\alpha}(t)}.
$$

The per-hit line-of-action force is

$$
\mathbf{F}_{ij}^{\alpha}(t)
=
\lambda_{ij}^{\alpha}(t)\hat{\mathbf{r}}_{ij}^{\alpha}(t),
$$

with

$$
\lambda_{ij}^{\alpha}(t)
=
\kappa\sigma_i\sigma_j
\frac{\epsilon^2}
{\left(r_{ij}^{\alpha}(t)\right)^2
\left|J_{ij}^{\alpha}(t)\right|}.
$$

Here "line-of-action" means radial along the delayed causal wake hit. It is distinct from the support-band radial direction defined below.

For a six-site tri-binary carrier, let $b(i)\in\{1,2,3\}$ be the binary label and let $\bar{i}$ be the partner of $i$ in the same binary. For each receiver $i$, partition the retained architrino-root set into

$$
\mathcal{P}_i(t)
=
\{(j,\alpha)\in\mathcal{A}_i(t):j=\bar{i}\},
$$

$$
\mathcal{X}_i(t)
=
\{(j,\alpha)\in\mathcal{A}_i(t):b(j)\ne b(i)\},
$$

$$
\mathcal{S}_i(t)
=
\{(j,\alpha)\in\mathcal{A}_i(t):j=i
\text{ and the row is retained or regularized}\}.
$$

The class-separated architrino force sums are

$$
\mathbf{F}_i^{\mathrm{partner}}(t)
=
\sum_{(j,\alpha)\in\mathcal{P}_i(t)}
\mathbf{F}_{ij}^{\alpha}(t),
$$

$$
\mathbf{F}_i^{\mathrm{cross}}(t)
=
\sum_{(j,\alpha)\in\mathcal{X}_i(t)}
\mathbf{F}_{ij}^{\alpha}(t),
$$

$$
\mathbf{F}_i^{\mathrm{self}}(t)
=
\sum_{(j,\alpha)\in\mathcal{S}_i(t)}
\mathbf{F}_{ij}^{\alpha}(t).
$$

The self/fold-layer term is included only when a declared `regularized-fold-layer` supplies a controlled $\eta>0$ contribution and weak limit, or when a `split-source-retained` representative supplies its own nonordinary source row. The ordinary same-curve arclength self root is excluded by [same-source-self-root-exclusion-lemma.md](same-source-self-root-exclusion-lemma.md). If the same-source row is absent, tangent, or unresolved, the branch status is a root-ledger fact, not a symmetry cancellation.

Let

$$
\mathbf{F}_i^{\mathrm{med}}(t)
$$

denote the declared Noether sea medium-response contribution, if any. This packet does not assume a constitutive law for $\mathbf{F}_i^{\mathrm{med}}$. A retained branch must define it on the same time window and prove that it is compatible with the event ledger and weak-limit row.

The relative acceleration demanded by the force ledger is therefore

$$
\mathbf{a}_i^{\mathrm{rel}}(t)
=
\mathbf{F}_i^{\mathrm{partner}}(t)
+
\mathbf{F}_i^{\mathrm{cross}}(t)
+
\mathbf{F}_i^{\mathrm{self}}(t)
+
\mathbf{F}_i^{\mathrm{med}}(t)
-
\ddot{\mathbf{C}}(t).
$$

In the center-gauge branch-existence chart, $\ddot{\mathbf{C}}=\mathbf{0}$. Moving-branch exports must keep the center-acceleration term.

---

## 2. Carrier Projections

Define the instantaneous support radius and outward support normal by

$$
\rho_i(t)=\left\|\mathbf{y}_i(t)\right\|,
\qquad
\hat{\mathbf{n}}_i(t)=\frac{\mathbf{y}_i(t)}{\rho_i(t)}.
$$

For an active fixed-speed carrier row,

$$
\left\|\mathbf{u}_i(t)\right\|=c_f,
\qquad
\hat{\mathbf{t}}_i(t)=\frac{\mathbf{u}_i(t)}{c_f}.
$$

For a bounded speed factor row from [variable-speed-factor-extension.md](variable-speed-factor-extension.md), replace this by

$$
\mathbf{u}_i(t)=c_f\nu_i(t)\hat{\mathbf{t}}_i(t),
\qquad
0<\nu_-\le\nu_i(t)\le\nu_+.
$$

For each retained hit, define the two scalar projections

$$
T_{ij}^{\alpha}(t)
=
\hat{\mathbf{t}}_i(t)\cdot\hat{\mathbf{r}}_{ij}^{\alpha}(t),
\qquad
N_{ij}^{\alpha}(t)
=
\hat{\mathbf{n}}_i(t)\cdot\hat{\mathbf{r}}_{ij}^{\alpha}(t).
$$

Thus

$$
\mathbf{u}_i(t)\cdot\mathbf{F}_{ij}^{\alpha}(t)
=
c_f\lambda_{ij}^{\alpha}(t)T_{ij}^{\alpha}(t),
$$

and

$$
\hat{\mathbf{n}}_i(t)\cdot\mathbf{F}_{ij}^{\alpha}(t)
=
\lambda_{ij}^{\alpha}(t)N_{ij}^{\alpha}(t).
$$

The same line-of-action hit can have both tangential and support-radial projections. A branch cannot keep only the geometrically convenient projection unless the omitted projection is proved to cancel on the retained root ledger.

---

## 3. Tangential Fixed-Speed Reduction

The fixed-speed condition implies

$$
\frac{d}{dt}
\left(
\frac{1}{2}\left\|\mathbf{u}_i(t)\right\|^2
\right)
=
\mathbf{u}_i(t)\cdot\dot{\mathbf{u}}_i(t)
=0.
$$

Using $\dot{\mathbf{u}}_i=\mathbf{a}_i^{\mathrm{rel}}$, the necessary tangential closure equation is

$$
\mathcal{R}_{\mathrm{tan},i}(t)
=
\mathbf{u}_i(t)\cdot\mathbf{a}_i^{\mathrm{rel}}(t)
=0.
$$

In the bounded speed factor row, the same projection is not zero. It is the speed-factor evolution equation:

$$
\mathbf{u}_i(t)\cdot\mathbf{a}_i^{\mathrm{rel}}(t)
=
c_f^2\nu_i(t)\dot{\nu}_i(t).
$$

In arclength form this is

$$
\nu_i\nu_i'
=
\Gamma\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i.
$$

Thus a nonzero tangential force projection is admissible only if it is ledgered as bounded speed-factor exchange. The fixed-speed model is the subcase $\nu_i'=0$.

Substituting the class-separated sums gives

$$
0
=
\sum_{(j,\alpha)\in\mathcal{P}_i(t)}
c_f\lambda_{ij}^{\alpha}(t)T_{ij}^{\alpha}(t)
+
\sum_{(j,\alpha)\in\mathcal{X}_i(t)}
c_f\lambda_{ij}^{\alpha}(t)T_{ij}^{\alpha}(t)
$$

$$
\quad
+
\sum_{(j,\alpha)\in\mathcal{S}_i(t)}
c_f\lambda_{ij}^{\alpha}(t)T_{ij}^{\alpha}(t)
+
\mathbf{u}_i(t)\cdot\mathbf{F}_i^{\mathrm{med}}(t)
-
\mathbf{u}_i(t)\cdot\ddot{\mathbf{C}}(t).
$$

Equivalently, in a fixed-radius screening row with $\rho_i=R$ and

$$
y_{ij}^{\alpha}(t)=\frac{c_f\tau_{ij}^{\alpha}(t)}{R},
$$

one may remove the common factor $c_f\kappa\epsilon^2/R^2$ from the architrino-hit terms and require

$$
0
=
\Theta_i^{\mathrm{partner}}(t)
+
\Theta_i^{\mathrm{cross}}(t)
+
\Theta_i^{\mathrm{self}}(t)
+
\Theta_i^{\mathrm{med}}(t)
-
\Theta_i^{C}(t),
$$

where

$$
\Theta_i^{\mathrm{partner}}(t)
=
\sum_{(j,\alpha)\in\mathcal{P}_i(t)}
\frac{\sigma_i\sigma_j T_{ij}^{\alpha}(t)}
{
\left(y_{ij}^{\alpha}(t)\right)^2
\left|J_{ij}^{\alpha}(t)\right|
},
$$

$$
\Theta_i^{\mathrm{cross}}(t)
=
\sum_{(j,\alpha)\in\mathcal{X}_i(t)}
\frac{\sigma_i\sigma_j T_{ij}^{\alpha}(t)}
{
\left(y_{ij}^{\alpha}(t)\right)^2
\left|J_{ij}^{\alpha}(t)\right|
},
$$

$$
\Theta_i^{\mathrm{self}}(t)
=
\sum_{(j,\alpha)\in\mathcal{S}_i(t)}
\frac{\sigma_i\sigma_j T_{ij}^{\alpha}(t)}
{
\left(y_{ij}^{\alpha}(t)\right)^2
\left|J_{ij}^{\alpha}(t)\right|
}.
$$

The medium-response and center-acceleration normalizations are

$$
\Theta_i^{\mathrm{med}}(t)
=
\frac{R^2}
{c_f\kappa\epsilon^2}
\mathbf{u}_i(t)\cdot\mathbf{F}_i^{\mathrm{med}}(t),
$$

$$
\Theta_i^{C}(t)
=
\frac{R^2}
{c_f\kappa\epsilon^2}
\mathbf{u}_i(t)\cdot\ddot{\mathbf{C}}(t).
$$

This is a necessary equation for every receiver $i$ and every $t$ in the retained window. A phase-averaged cancellation is not enough unless the theorem also proves pointwise or declared-norm closure of $\mathcal{R}_{\mathrm{tan}}$.

---

## 4. Radial And Support-Band Reduction

The support radius obeys the kinematic identity

$$
\dot{\rho}_i(t)
=
\hat{\mathbf{n}}_i(t)\cdot\mathbf{u}_i(t),
$$

and

$$
\ddot{\rho}_i(t)
=
\hat{\mathbf{n}}_i(t)\cdot\dot{\mathbf{u}}_i(t)
+
\frac{
\left\|\mathbf{u}_i(t)\right\|^2
-
\left(\dot{\rho}_i(t)\right)^2
}
{\rho_i(t)}.
$$

For a fixed-speed carrier this becomes

$$
\hat{\mathbf{n}}_i(t)\cdot\dot{\mathbf{u}}_i(t)
=
\ddot{\rho}_i(t)
-
\frac{c_f^2-\left(\dot{\rho}_i(t)\right)^2}{\rho_i(t)}.
$$

For a bounded speed factor carrier, the same identity uses $\|\mathbf{u}_i\|^2=c_f^2\nu_i^2$:

$$
\hat{\mathbf{n}}_i(t)\cdot\dot{\mathbf{u}}_i(t)
=
\ddot{\rho}_i(t)
-
\frac{c_f^2\nu_i(t)^2-\left(\dot{\rho}_i(t)\right)^2}{\rho_i(t)}.
$$

Using $\dot{\mathbf{u}}_i=\mathbf{a}_i^{\mathrm{rel}}$, the radial support closure residual is

$$
\mathcal{R}_{\mathrm{rad},i}(t)
=
\hat{\mathbf{n}}_i(t)\cdot\mathbf{a}_i^{\mathrm{rel}}(t)
-
\ddot{\rho}_i(t)
+
\frac{c_f^2-\left(\dot{\rho}_i(t)\right)^2}{\rho_i(t)}.
$$

The bounded speed factor residual replaces $c_f^2$ by $c_f^2\nu_i^2$ in this last term.

A prescribed support-radius row must satisfy

$$
\mathcal{R}_{\mathrm{rad},i}(t)=0.
$$

Substituting the class-separated sums gives

$$
0
=
\sum_{(j,\alpha)\in\mathcal{P}_i(t)}
\lambda_{ij}^{\alpha}(t)N_{ij}^{\alpha}(t)
+
\sum_{(j,\alpha)\in\mathcal{X}_i(t)}
\lambda_{ij}^{\alpha}(t)N_{ij}^{\alpha}(t)
$$

$$
\quad
+
\sum_{(j,\alpha)\in\mathcal{S}_i(t)}
\lambda_{ij}^{\alpha}(t)N_{ij}^{\alpha}(t)
+
\hat{\mathbf{n}}_i(t)\cdot\mathbf{F}_i^{\mathrm{med}}(t)
-
\hat{\mathbf{n}}_i(t)\cdot\ddot{\mathbf{C}}(t)
$$

$$
\quad
-
\ddot{\rho}_i(t)
+
\frac{c_f^2-\left(\dot{\rho}_i(t)\right)^2}{\rho_i(t)}.
$$

For a rigid support-radius row,

$$
\rho_i(t)=R,
\qquad
\dot{\rho}_i(t)=0,
\qquad
\ddot{\rho}_i(t)=0,
$$

the necessary radial equation reduces to

$$
\hat{\mathbf{n}}_i(t)\cdot
\left(
\mathbf{F}_i^{\mathrm{partner}}(t)
+
\mathbf{F}_i^{\mathrm{cross}}(t)
+
\mathbf{F}_i^{\mathrm{self}}(t)
+
\mathbf{F}_i^{\mathrm{med}}(t)
-
\ddot{\mathbf{C}}(t)
\right)
+
\frac{c_f^2}{R}
=0.
$$

For a rigid-radius bounded speed factor row, the centripetal term is instead

$$
\frac{c_f^2\nu_i(t)^2}{R}.
$$

This is the centripetal-support equation. With the same fixed-radius normalization as above, it may be written

$$
0
=
\Xi_i^{\mathrm{partner}}(t)
+
\Xi_i^{\mathrm{cross}}(t)
+
\Xi_i^{\mathrm{self}}(t)
+
\Xi_i^{\mathrm{med}}(t)
-
\Xi_i^{C}(t)
+
\Gamma_R,
$$

where

$$
\Xi_i^{\mathrm{partner}}(t)
=
\sum_{(j,\alpha)\in\mathcal{P}_i(t)}
\frac{\sigma_i\sigma_j N_{ij}^{\alpha}(t)}
{
\left(y_{ij}^{\alpha}(t)\right)^2
\left|J_{ij}^{\alpha}(t)\right|
},
$$

$$
\Xi_i^{\mathrm{cross}}(t)
=
\sum_{(j,\alpha)\in\mathcal{X}_i(t)}
\frac{\sigma_i\sigma_j N_{ij}^{\alpha}(t)}
{
\left(y_{ij}^{\alpha}(t)\right)^2
\left|J_{ij}^{\alpha}(t)\right|
},
$$

$$
\Xi_i^{\mathrm{self}}(t)
=
\sum_{(j,\alpha)\in\mathcal{S}_i(t)}
\frac{\sigma_i\sigma_j N_{ij}^{\alpha}(t)}
{
\left(y_{ij}^{\alpha}(t)\right)^2
\left|J_{ij}^{\alpha}(t)\right|
},
$$

$$
\Xi_i^{\mathrm{med}}(t)
=
\frac{R^2}
{\kappa\epsilon^2}
\hat{\mathbf{n}}_i(t)\cdot\mathbf{F}_i^{\mathrm{med}}(t),
$$

$$
\Xi_i^{C}(t)
=
\frac{R^2}
{\kappa\epsilon^2}
\hat{\mathbf{n}}_i(t)\cdot\ddot{\mathbf{C}}(t),
$$

and

$$
\Gamma_R
=
\frac{c_f^2R}{\kappa\epsilon^2}.
$$

Unlike the tangential zero equation, the radial equation contains the nonzero centripetal demand $\Gamma_R$. A radial same-level branch therefore fixes or constrains the scale/coupling relation; it cannot be checked by removing a common force factor alone.

For a support band rather than an exact radius, the state must also satisfy

$$
R(t)-\delta(t)\le\rho_i(t)\le R(t)+\delta(t).
$$

Define the band barriers

$$
B_i^+(t)=\rho_i(t)-R(t)-\delta(t),
\qquad
B_i^-(t)=R(t)-\delta(t)-\rho_i(t).
$$

The support-band theorem target is not only $\mathcal{R}_{\mathrm{rad},i}=0$ for a prescribed $\rho_i(t)$, but also the viability condition

$$
B_i^+(t)\le0,
\qquad
B_i^-(t)\le0,
$$

with outward boundary acceleration controlled by

$$
B_i^+(t)=0,\quad \dot{B}_i^+(t)=0
\quad\Longrightarrow\quad
\ddot{B}_i^+(t)\le0,
$$

and

$$
B_i^-(t)=0,\quad \dot{B}_i^-(t)=0
\quad\Longrightarrow\quad
\ddot{B}_i^-(t)\le0.
$$

Substituting the radial identity converts these boundary tests into inequalities on the same partner, cross-binary, self/fold-layer, medium-response, and center-acceleration projections above.

---

## 5. Symmetry Is Not Force Balance

Instantaneous geometric symmetry is not enough to infer either $\mathcal{R}_{\mathrm{tan}}=0$ or radial support closure. A same-level branch proof must compute the retained causal-root sums because:

1. The force is evaluated between $\mathbf{x}_i(t)$ and delayed source positions $\mathbf{x}_j(s_{ij}^{\alpha}(t))$, not between simultaneous vertices of an instantaneous polyhedron.
2. The weights contain $\left(y_{ij}^{\alpha}\right)^{-2}$ and $\left|J_{ij}^{\alpha}\right|^{-1}$. Equal simultaneous distances do not imply equal causal delays or equal Jacobian flux weights.
3. Partner, cross-binary, and self/fold-layer rows can have different root counts, root statuses, and delay branches. A missing or regularized same-source row changes the force ledger.
4. The reciprocal hit from $j$ to $i$ is generally a different delayed equation. The same-level causal-wake force law does not give an instantaneous equal-and-opposite pair cancellation at time $t$ without a separate event-ledger proof.
5. Polarity signs $\sigma_i\sigma_j$ and medium-response contributions may transform differently from the spatial carrier symmetry. Their representation under the branch choreography must be proved, not assumed.
6. The tangential residual is a power-like projection $\mathbf{u}_i\cdot\mathbf{F}$. A force pattern that looks radially balanced in simultaneous coordinates may still do nonzero tangential work on the fixed-speed carrier.
7. The radial equation includes the centripetal demand $c_f^2/R$ for a rigid row. Symmetric cancellation of architrino-hit radial projections would fail the support equation unless a medium-response, center-acceleration, or scale/coupling term supplies the required inward acceleration.

Thus force balance is a root-ledger theorem target. Symmetry may reduce the number of independent equations only after the proof shows that the active-root sets, delays, Jacobians, polarity products, projections, and medium-response terms are equivariant under the same symmetry.

---

## 6. Certificate Use

A retained shell braid branch packet must supply, for every receiver $i$ and every retained time $t$:

1. The active-root partition $\mathcal{P}_i(t)$, $\mathcal{X}_i(t)$, and $\mathcal{S}_i(t)$, including the self/fold-layer status.
2. The scalar data $y_{ij}^{\alpha}$, $J_{ij}^{\alpha}$, $T_{ij}^{\alpha}$, and $N_{ij}^{\alpha}$ for every retained root.
3. The medium-response projections $\Theta_i^{\mathrm{med}}$ and $\Xi_i^{\mathrm{med}}$, or a proof that the medium-response term is absent on the declared branch.
4. Pointwise or declared-norm closure of $\mathcal{R}_{\mathrm{tan},i}=0$.
5. Radial support closure through $\mathcal{R}_{\mathrm{rad},i}=0$ for a prescribed support-radius row, or support-band viability through the barrier inequalities.
6. The scale/coupling row encoded by $\Gamma_R$ when a rigid fixed-radius carrier is asserted.

If any one of these rows is `not_computed`, the force-balance status remains priority-only. If the computed tangential equation fails, the certificate stop is `tangential-residual-open`. If the radial/support-band equation fails, the branch has not supplied the same-level support closure needed for retention.
