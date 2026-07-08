# Attraction/Repulsion Force-Moment Decomposition

Promotion status: `priority-only`. This packet advances the dynamics implications of the neutral same-level braid inventory without converting the inventory count into a branch-retention claim. It refines [attraction-repulsion-inventory-theorem.md](attraction-repulsion-inventory-theorem.md), [free-support-bounded-speed-dynamics.md](free-support-bounded-speed-dynamics.md), [bounded-speed-factor-speed-ode-solvability.md](bounded-speed-factor-speed-ode-solvability.md), and [bounded-speed-factor-normal-reconstruction-theorem.md](bounded-speed-factor-normal-reconstruction-theorem.md).

The packet's purpose is narrow: decompose the bounded-speed force ledger into opposite-polarity attractive and same-polarity repulsive source-site sums, then expose the tangent-power, normal-curvature, and support-radial moment rows that the $3$-$2$ source inventory can bias. It does not retain a branch, derive the action scale, solve the speed ODE, reconstruct the normal curve, or certify support viability.

Closure decision for the sub-$c_f$ observation. In a $v < c_f$ neutral braid branch where the distinct-site all-pairs ledger is active and same-source self-hit rows are absent or separately emitted, the observation should be represented by the restoring support-radial moment, not by a new force law. The $3$ attractive / $2$ repulsive source-site inventory produces a certifiable inward binding bias only after the weighted projection row proves

$$
\Gamma(r_i-R_i^0)b_i^\nu <0
$$

with a declared margin on the same causal-root ledger, or after a site-kernel equality row reduces that weighted inequality to the count coefficient $3-2=1$. Without one of those rows, the correct status is

$$
\texttt{structural-attraction-bias-not-closure},
$$

not branch retention and not force closure.

---

## 1. Source-Site And Root-Ledger Split

Let the neutral same-level braid site set be

$$
I=\{1,2,3\}\times\{+,-\},
$$

with polarity sign $\sigma_i\in\{+1,-1\}$. For a receiver $i$, define the opposite-polarity attractive source sites and same-polarity repulsive source sites by

$$
A_i=\{j\in I:j\ne i,\ \sigma_j=-\sigma_i\},
\qquad
R_i=\{j\in I:j\ne i,\ \sigma_j=\sigma_i\}.
$$

Then

$$
|A_i|=3,
\qquad
|R_i|=2.
$$

On a bounded speed factor causal-root ledger $\mathcal{A}_i^\nu(u)$, write a retained root as $r=(i,j(r),\alpha)$ and define the positive root weight

$$
\omega_r^\nu(u)
=
\frac{W_{r,\nu}^{\mathrm{rec}}(u)}{\eta_r(u)^2}.
$$

The source-site subledgers are

$$
\mathcal{A}_{i,A}^\nu(u)
=
\{r\in\mathcal{A}_i^\nu(u):j(r)\in A_i\},
\qquad
\mathcal{A}_{i,R}^\nu(u)
=
\{r\in\mathcal{A}_i^\nu(u):j(r)\in R_i\}.
$$

With $\widehat{\mathbf{R}}_r$ pointing from the delayed source position toward the receiver, the architrino force decomposes as

$$
F_{i,\mathrm{arch}}^\nu(u)
=
F_{i,A}^\nu(u)+F_{i,R}^\nu(u),
$$

where

$$
\boxed{
F_{i,A}^\nu(u)
=
-
\sum_{r\in\mathcal{A}_{i,A}^\nu(u)}
\omega_r^\nu(u)\widehat{\mathbf{R}}_r(u)
}
$$

and

$$
\boxed{
F_{i,R}^\nu(u)
=
\sum_{r\in\mathcal{A}_{i,R}^\nu(u)}
\omega_r^\nu(u)\widehat{\mathbf{R}}_r(u).
}
$$

The full force consumed by the dynamics rows is

$$
F_i^\nu
=
F_{i,A}^\nu+F_{i,R}^\nu
+F_{i,\mathrm{self}}^\nu
+F_{i,\mathrm{med}}^\nu,
$$

with self and medium-response rows present only when they are emitted on the same center-time and event-time convention.

For site-resolved diagnostics, define

$$
U_{ij}^\nu(u)
=
\sum_{\substack{r\in\mathcal{A}_i^\nu(u)\\ j(r)=j}}
\omega_r^\nu(u)\widehat{\mathbf{R}}_r(u).
$$

Then

$$
F_{i,A}^\nu=-\sum_{j\in A_i}U_{ij}^\nu,
\qquad
F_{i,R}^\nu=\sum_{j\in R_i}U_{ij}^\nu.
$$

This is the exact place where the source-site count enters the weighted force ledger. The count controls only how many signed site sums appear. It does not control their root multiplicities, weights, directions, or projections.

---

## 2. Projection Rows Produced By The Split

Let

$$
\mathbf{T}_i(u)=\mathbf{Y}_i'(\Lambda_i(u)),
\qquad
P_i^\perp=I-\mathbf{T}_i\mathbf{T}_i^T.
$$

When a support descriptor is active, let

$$
r_i=\|\mathbf{Y}_i-\mathbf{C}\|,
\qquad
\mathbf{n}_i=\frac{\mathbf{Y}_i-\mathbf{C}}{r_i},
$$

and choose the declared support-center radius $R_i^0$ for the radial moment diagnostic. In a constant same-level band, $R_i^0=R$.

For each root, define the tangent and support-radial cosines

$$
c_{r,T}= \mathbf{T}_i\cdot\widehat{\mathbf{R}}_r,
\qquad
c_{r,n}= \mathbf{n}_i\cdot\widehat{\mathbf{R}}_r.
$$

### 2.1 Tangent Power

The scalar tangent forcing split is

$$
f_i^\nu
=
\mathbf{T}_i\cdot F_i^\nu
=
f_{i,A}^\nu+f_{i,R}^\nu
+f_{i,\mathrm{self}}^\nu
+f_{i,\mathrm{med}}^\nu,
$$

where

$$
\boxed{
f_{i,A}^\nu
=
-
\sum_{r\in\mathcal{A}_{i,A}^\nu}
\omega_r^\nu c_{r,T},
\qquad
f_{i,R}^\nu
=
\sum_{r\in\mathcal{A}_{i,R}^\nu}
\omega_r^\nu c_{r,T}.
}
$$

The dimensionless center-time tangent power is

$$
\mathcal{P}_i^\nu
=
\nu_i f_i^\nu,
$$

with split

$$
\mathcal{P}_{i,A}^\nu=\nu_i f_{i,A}^\nu,
\qquad
\mathcal{P}_{i,R}^\nu=\nu_i f_{i,R}^\nu.
$$

The speed ODE consumes $f_i^\nu$, not the inventory count:

$$
\frac{d\nu_i}{du}
=
\Gamma f_i^\nu.
$$

### 2.2 Normal Curvature Drive

The normal curvature drive implied by the force ledger is

$$
\mathcal{K}_{i,\mathrm{drive}}^\nu
=
\frac{\Gamma}{\nu_i^2}P_i^\perp F_i^\nu.
$$

The attraction/repulsion split is

$$
\boxed{
\mathcal{K}_{i,A}^\nu
=
-
\frac{\Gamma}{\nu_i^2}
\sum_{r\in\mathcal{A}_{i,A}^\nu}
\omega_r^\nu P_i^\perp\widehat{\mathbf{R}}_r,
}
$$

and

$$
\boxed{
\mathcal{K}_{i,R}^\nu
=
\frac{\Gamma}{\nu_i^2}
\sum_{r\in\mathcal{A}_{i,R}^\nu}
\omega_r^\nu P_i^\perp\widehat{\mathbf{R}}_r.
}
$$

The normal reconstruction row is the equality

$$
\mathbf{K}_i
=
\mathcal{K}_{i,A}^\nu+\mathcal{K}_{i,R}^\nu
+\mathcal{K}_{i,\mathrm{self}}^\nu
+\mathcal{K}_{i,\mathrm{med}}^\nu.
$$

The $3$-$2$ inventory can bias the normal drive only through the projected weighted sums above. It does not by itself close tangent holonomy, position closure, support-radial compatibility, or root-ledger persistence.

### 2.3 Support-Radial Moment

The support-radial force split is

$$
b_i^\nu
=
\mathbf{n}_i\cdot F_i^\nu
=
b_{i,A}^\nu+b_{i,R}^\nu
+b_{i,\mathrm{self}}^\nu
+b_{i,\mathrm{med}}^\nu,
$$

where

$$
\boxed{
b_{i,A}^\nu
=
-
\sum_{r\in\mathcal{A}_{i,A}^\nu}
\omega_r^\nu c_{r,n},
\qquad
b_{i,R}^\nu
=
\sum_{r\in\mathcal{A}_{i,R}^\nu}
\omega_r^\nu c_{r,n}.
}
$$

The centered support-radial moment diagnostic is

$$
\boxed{
\mathcal{M}_i^\nu
=
(r_i-R_i^0)b_i^\nu,
}
$$

with attraction/repulsion pieces

$$
\mathcal{M}_{i,A}^\nu=(r_i-R_i^0)b_{i,A}^\nu,
\qquad
\mathcal{M}_{i,R}^\nu=(r_i-R_i^0)b_{i,R}^\nu.
$$

This is a diagnostic virtual-work row. The actual support-radial dynamics row remains

$$
\nu_i\nu_i'r_i'
+
\nu_i^2
\left(
r_i''
-
\frac{1-(r_i')^2}{r_i}
\right)
=
\Gamma b_i^\nu,
$$

with the support-band viability rows supplied by the free-support packet.

---

## 3. Exact Algebraic Bias Conditions

The inventory theorem gives

$$
3\text{ attractive source sites}
\quad\text{and}\quad
2\text{ repulsive source sites}.
$$

This section states the exact additional algebra needed before that count becomes a force or speed-ODE bias.

### 3.1 Site Kernels

Define the site-resolved tangent and support-radial kernels

$$
\Theta_{ij}^\nu(u)
=
\mathbf{T}_i(u)\cdot U_{ij}^\nu(u),
\qquad
B_{ij}^\nu(u)
=
\mathbf{n}_i(u)\cdot U_{ij}^\nu(u).
$$

Then

$$
f_{i,\mathrm{arch}}^\nu
=
-
\sum_{j\in A_i}\Theta_{ij}^\nu
+
\sum_{j\in R_i}\Theta_{ij}^\nu,
$$

and

$$
b_{i,\mathrm{arch}}^\nu
=
-
\sum_{j\in A_i}B_{ij}^\nu
+
\sum_{j\in R_i}B_{ij}^\nu.
$$

Thus the exact attraction-dominance scalars are

$$
D_{T,i}^\nu(u)
=
\sum_{j\in A_i}\Theta_{ij}^\nu(u)
-
\sum_{j\in R_i}\Theta_{ij}^\nu(u),
$$

and

$$
D_{r,i}^\nu(u)
=
\sum_{j\in A_i}B_{ij}^\nu(u)
-
\sum_{j\in R_i}B_{ij}^\nu(u).
$$

With no self or medium rows,

$$
f_{i,\mathrm{arch}}^\nu=-D_{T,i}^\nu,
\qquad
b_{i,\mathrm{arch}}^\nu=-D_{r,i}^\nu.
$$

With self or medium rows, replace these by

$$
f_i^\nu
=
-D_{T,i}^\nu
+f_{i,\mathrm{self}}^\nu
+f_{i,\mathrm{med}}^\nu,
$$

and

$$
b_i^\nu
=
-D_{r,i}^\nu
+b_{i,\mathrm{self}}^\nu
+b_{i,\mathrm{med}}^\nu.
$$

### 3.2 Count-To-Radial-Bias Condition

At a sample $u$, the force ledger has a restoring support-radial moment about $R_i^0$ exactly when

$$
\boxed{
\Gamma(r_i-R_i^0)b_i^\nu <0.
}
$$

Equivalently, after substituting the attraction/repulsion split,

$$
\boxed{
\Gamma(r_i-R_i^0)
\left(
-D_{r,i}^\nu
+b_{i,\mathrm{self}}^\nu
+b_{i,\mathrm{med}}^\nu
\right)
<0.
}
$$

For a certified margin, require

$$
\Gamma(r_i-R_i^0)b_i^\nu
\le
-m_{r,i},
\qquad
m_{r,i}>0.
$$

For a support band, the corresponding boundary forms are

$$
r_i=R_i^+
\quad\Longrightarrow\quad
\Gamma b_i^\nu<0,
$$

and

$$
r_i=R_i^-
\quad\Longrightarrow\quad
\Gamma b_i^\nu>0.
$$

The structural count becomes a radial bias by itself only under a stronger site-kernel equality. If there is a scalar $B_i^\nu(u)$ such that

$$
B_{ij}^\nu(u)=B_i^\nu(u)
\qquad
\text{for every }j\in A_i\cup R_i,
$$

and if self and medium radial terms are absent, then

$$
D_{r,i}^\nu
=
3B_i^\nu-2B_i^\nu
=
B_i^\nu,
$$

so

$$
b_{i,\mathrm{arch}}^\nu
=
-B_i^\nu.
$$

The count-only radial result is therefore

$$
\boxed{
\Gamma(r_i-R_i^0)(-B_i^\nu)<0
\quad\Longleftrightarrow\quad
\Gamma(r_i-R_i^0)B_i^\nu>0.
}
$$

This is the exact algebraic condition. The $3$-$2$ count supplies the coefficient $3-2=1$ only after the five site kernels have been proved equal in the support-radial projection. Without that equality, the condition is the weighted inequality above, not the inventory count.

### 3.3 Count-To-Speed-ODE Mean Condition

On a center-time period $H_*$, define the integrated site tangent kernels

$$
\mathfrak{T}_{ij}^\nu
=
\int_0^{H_*}\Theta_{ij}^\nu(u)\,du.
$$

The architrino contribution to the speed-ODE mean is

$$
\int_0^{H_*}f_{i,\mathrm{arch}}^\nu(u)\,du
=
-
\sum_{j\in A_i}\mathfrak{T}_{ij}^\nu
+
\sum_{j\in R_i}\mathfrak{T}_{ij}^\nu.
$$

The exact zero-mean speed-ODE row is

$$
\boxed{
-
\sum_{j\in A_i}\mathfrak{T}_{ij}^\nu
+
\sum_{j\in R_i}\mathfrak{T}_{ij}^\nu
+
\int_0^{H_*}
\left(
f_{i,\mathrm{self}}^\nu+f_{i,\mathrm{med}}^\nu
\right)du
=0.
}
$$

For a winding branch, replace $H_*$ by $H_{\mathrm{com}}$ and evaluate on the lifted ledger.

The count becomes a site-uniform speed-ODE bias only if there is a scalar integrated tangent kernel $\mathfrak{T}_i^\nu$ such that

$$
\mathfrak{T}_{ij}^\nu=\mathfrak{T}_i^\nu
\qquad
\text{for every }j\in A_i\cup R_i.
$$

With no self or medium tangent row, the zero-mean condition becomes

$$
-3\mathfrak{T}_i^\nu+2\mathfrak{T}_i^\nu=0,
$$

hence

$$
\boxed{
\mathfrak{T}_i^\nu=0.
}
$$

With self or medium tangent rows present, the exact site-uniform condition is

$$
\boxed{
-\mathfrak{T}_i^\nu
+
\int_0^{H_*}
\left(
f_{i,\mathrm{self}}^\nu+f_{i,\mathrm{med}}^\nu
\right)du
=0.
}
$$

If the pointwise site kernels are equal,

$$
\Theta_{ij}^\nu(u)=\Theta_i^\nu(u)
\qquad
\text{for every }j\in A_i\cup R_i,
$$

then

$$
f_{i,\mathrm{arch}}^\nu(u)
=
-\Theta_i^\nu(u),
$$

and the speed-ODE mean row requires

$$
\int_0^{H_*}\Theta_i^\nu(u)\,du=0
$$

when no self or medium tangent row is active.

This is a zero-mean bias condition, not a speed-ODE certificate. The primitive excursion

$$
A_i(u)
=
\Gamma\int_0^u f_i^\nu(s)\,ds
$$

must still fit the speed band and the clock/length return row.

---

## 4. Failure Modes: Why Count Alone Is Not Enough

The status `structural-attraction-bias` is not allowed to stand in for a force, moment, or speed-ODE certificate.

The main algebraic failure modes are:

1. **Root multiplicity failure.** A source site can contribute zero, one, or several retained roots, so $|A_i|=3$ and $|R_i|=2$ do not imply equal numbers of force terms.
2. **Weight failure.** The weights $\eta_r^{-2}W_{r,\nu}^{\mathrm{rec}}$ can make the two repulsive source sites dominate the three attractive source sites in a chosen projection.
3. **Projection failure.** A source site can be attractive in sign but have a tangent or support-radial projection with the wrong sign for the intended bias.
4. **Vector cancellation failure.** The normal curvature drive is vector-valued; a scalar count does not determine $P_i^\perp F_i^\nu$ or its holonomy.
5. **Support-side failure.** An inward radial bias can help the upper support boundary and fail the lower support boundary. Two-sided support restoration requires the sign of $(r_i-R_i^0)b_i^\nu$ to be controlled, not only $b_i^\nu$.
6. **Speed primitive failure.** Even if the tangent forcing has zero mean, the primitive $A_i$ may violate the speed band or the clock/length row.
7. **Ledger-coupling failure.** If roots, Jacobians, or self-hit terms depend on $\nu_i$, a frozen count-to-bias diagnostic does not solve the coupled bounded-speed fixed point.
8. **Self/medium omission failure.** Same-source, fold-layer, support-work, and medium-response rows are outside the $3$-$2$ source-site count and must be absent by certificate or included in the same ledger.
9. **Action-scale failure.** A fitted $\Gamma$ can flip or tune apparent bias. A retained dynamics/action packet must identify whether $\Gamma$ is action-derived or only diagnostic.

Therefore the correct implication is

$$
\texttt{3-2-inventory}
\quad+\quad
\texttt{projection-and-weight-conditions}
\quad\Longrightarrow\quad
\texttt{force-moment-bias-diagnostic},
$$

not

$$
\texttt{3-2-inventory}
\quad\Longrightarrow\quad
\texttt{dynamics-closure}.
$$

---

## 5. Exact-Antipodal Pair Consequences

Let $\iota$ be the exact-antipodal involution. Assume the paired geometry and speed are exact-antipodal:

$$
\mathbf{Y}_{\iota i}-\mathbf{C}
=
-(\mathbf{Y}_i-\mathbf{C}),
\qquad
\mathbf{T}_{\iota i}=-\mathbf{T}_i,
\qquad
\mathbf{K}_{\iota i}=-\mathbf{K}_i,
$$

and

$$
\nu_{\iota i}=\nu_i,
\qquad
\chi_{\iota i}=\chi_i,
\qquad
\Lambda_{\iota i}=\Lambda_i.
$$

Assume also that the root ledger is closed under the paired map:

$$
r=(i,j,\alpha)
\quad\Longleftrightarrow\quad
\iota r=(\iota i,\iota j,\alpha),
$$

with

$$
\eta_{\iota r}=\eta_r,
\qquad
J_{\iota r}^\nu=J_r^\nu,
\qquad
\widehat{\mathbf{R}}_{\iota r}=-\widehat{\mathbf{R}}_r,
\qquad
\sigma_{\iota i}\sigma_{\iota j}=\sigma_i\sigma_j.
$$

Then the force split is pair-odd:

$$
F_{\iota i,A}^\nu=-F_{i,A}^\nu,
\qquad
F_{\iota i,R}^\nu=-F_{i,R}^\nu.
$$

Since $\mathbf{T}_{\iota i}=-\mathbf{T}_i$, the tangent forcing and tangent power are pair-even:

$$
f_{\iota i,A}^\nu=f_{i,A}^\nu,
\qquad
f_{\iota i,R}^\nu=f_{i,R}^\nu,
\qquad
\mathcal{P}_{\iota i}^\nu=\mathcal{P}_i^\nu.
$$

Consequently the speed-ODE primitive is pair-even:

$$
A_{\iota i}(u)=A_i(u)
$$

when the initial speeds are paired equally.

The normal curvature drive is pair-odd because $P_{\iota i}^\perp=P_i^\perp$ and $F_{\iota i}^\nu=-F_i^\nu$:

$$
\mathcal{K}_{\iota i,\mathrm{drive}}^\nu
=
-\mathcal{K}_{i,\mathrm{drive}}^\nu.
$$

The support normal is pair-odd,

$$
\mathbf{n}_{\iota i}=-\mathbf{n}_i,
$$

while $r_{\iota i}=r_i$. Therefore the support-radial force and support-radial moment are pair-even:

$$
b_{\iota i,A}^\nu=b_{i,A}^\nu,
\qquad
b_{\iota i,R}^\nu=b_{i,R}^\nu,
\qquad
\mathcal{M}_{\iota i}^\nu=\mathcal{M}_i^\nu.
$$

Thus exact-antipodal geometry and exact-antipodal speed duplicate the scalar diagnostics and negate the vector diagnostics:

| Row | Pair parity |
| --- | --- |
| attraction/repulsion force vectors | pair-odd |
| tangent forcing $f_i^\nu$ | pair-even |
| tangent power $\mathcal{P}_i^\nu$ | pair-even |
| speed primitive $A_i$ | pair-even |
| normal curvature drive $\mathcal{K}_{i,\mathrm{drive}}^\nu$ | pair-odd |
| support-radial force $b_i^\nu$ | pair-even |
| support-radial moment $\mathcal{M}_i^\nu$ | pair-even |

If the geometry is exact-antipodal but the speed is not speed-even, the paired inverse clocks and bounded-speed Jacobians no longer match. The force-moment parity packet must then report

$$
\texttt{antipodal-speed-pair-failure}.
$$

If the speed is pair-even but the root ledger drops a paired root, the inventory count remains true but the force-moment parity row is open:

$$
\texttt{inventory-count-ok-root-parity-open}.
$$

---

## 6. Theorem Target

**Theorem target: attraction/repulsion force-moment decomposition.** Fix one same-level neutral braid site inventory, one bounded speed factor root ledger, one support descriptor, one source-pair policy, one same-source policy, and one row-weight convention. For each receiver $i$, excluding any separately emitted same-source and medium-response rows:

1. the architrino force decomposes exactly into opposite-polarity attractive and same-polarity repulsive source-site sums with weights $\eta_r^{-2}W_{r,\nu}^{\mathrm{rec}}$;
2. the tangent-power, normal-curvature-drive, and support-radial-moment diagnostics are the corresponding projections of the same weighted force split;
3. the structural $3$-$2$ count becomes a radial restoring bias only when the weighted support-radial inequality $\Gamma(r_i-R_i^0)b_i^\nu<0$ holds, or under site-kernel equality when $\Gamma(r_i-R_i^0)B_i^\nu>0$;
4. the structural count becomes a zero-mean speed-ODE bias only when the weighted period integral of the tangent forcing vanishes on the same ledger, with self and medium tangent rows included if active;
5. under exact-antipodal geometry, speed, and root-ledger closure, vector force and normal-curvature rows are pair-odd, while tangent-power, speed-primitive, support-radial force, and support-radial moment rows are pair-even.

Proof route:

1. Split the site set into $A_i$ and $R_i$ using $\sigma_i\sigma_j=-1$ for opposite polarity and $\sigma_i\sigma_j=+1$ for same polarity.
2. Insert that sign split into the bounded-speed force ledger with $\omega_r^\nu=\eta_r^{-2}W_{r,\nu}^{\mathrm{rec}}$.
3. Project the split force onto $\mathbf{T}_i$, $P_i^\perp$, and $\mathbf{n}_i$.
4. Multiply the support-radial projection by $r_i-R_i^0$ to form the support-radial moment diagnostic.
5. Express the radial and speed-ODE conditions as weighted algebraic inequalities or period integrals.
6. Specialize to equal site kernels to identify exactly where the $3-2=1$ coefficient appears.
7. Apply the exact-antipodal involution to paired sites, roots, directions, speed factors, and support normals.

This theorem target is a diagnostic bridge between inventory and dynamics rows. It does not solve the scalar speed ODE, normal reconstruction, support-band viability, action-scale derivation, tail exclusion, Noether/event exchange, stability, or retained-branch promotion.

---

## 7. Solver Packet Output Schema

A solver packet that uses the $3$-$2$ inventory as a dynamics diagnostic must emit:

| Field | Required payload |
| --- | --- |
| `solver_space` | `bounded-speed-force-moment-decomposition`, `fixed-speed-special-case`, or downstream solver name consuming this packet |
| `polarity_inventory` | $\sigma_i$, $A_i$, $R_i$, $|A_i|=3$, $|R_i|=2$, and partner/cross split |
| `root_weight_convention` | $\eta_r$, $D_{s,r}^{\nu}=J_r^\nu$, $D_{T,r}^{\nu}$, $W_{r,\nu}^{\mathrm{rec}}$, $\omega_r^\nu=\eta_r^{-2}W_{r,\nu}^{\mathrm{rec}}$, floors, and event-time convention |
| `source_site_kernels` | $U_{ij}^\nu$, $\Theta_{ij}^\nu$, $B_{ij}^\nu$, and root multiplicity per source site |
| `force_split` | $F_{i,A}^\nu$, $F_{i,R}^\nu$, self and medium force rows if present |
| `tangent_power_split` | $f_{i,A}^\nu$, $f_{i,R}^\nu$, $\mathcal{P}_{i,A}^\nu$, $\mathcal{P}_{i,R}^\nu$, and total $f_i^\nu$ consumed by the speed ODE |
| `speed_ode_mean_bias` | $\int f_i^\nu\,du$, site-kernel equality status if claimed, zero-mean pass/fail, primitive handoff status |
| `normal_curvature_drive_split` | $\mathcal{K}_{i,A}^\nu$, $\mathcal{K}_{i,R}^\nu$, and normal reconstruction handoff status |
| `support_radial_moment_split` | $b_{i,A}^\nu$, $b_{i,R}^\nu$, $\mathcal{M}_{i,A}^\nu$, $\mathcal{M}_{i,R}^\nu$, support-side convention, and restoring-margin row |
| `count_to_bias_conditions` | whether site-kernel equality is proved, whether the exact weighted inequalities replace the count, and which failure mode applies |
| `antipodal_force_moment_parity` | pair map, speed-even row, root-pair row, force parity, tangent-power parity, normal-drive parity, and radial-moment parity |
| `downstream_rows_not_solved` | speed primitive band, clock/length row, normal holonomy, position closure, support viability, action scale, event, tail, stability, and retention status |
| `status` | first failed row or `force-moment-decomposition-certified` |

The packet may feed the speed-ODE solver by passing `tangent_power_split`, and it may feed the normal reconstruction solver by passing `normal_curvature_drive_split` and `support_radial_moment_split`. It is not allowed to mark either downstream solver as certified unless those packets emit their own required rows.

---

## 8. Status Codes

| Status | Meaning |
| --- | --- |
| `force-moment-decomposition-certified` | attraction/repulsion force split and all requested projection diagnostics are emitted on one ledger |
| `source-site-inventory-mismatch` | the neutral same-level $3$-$3$ site inventory or receiver exclusion row is not the declared input |
| `root-weight-split-missing` | roots are not partitioned by opposite-polarity and same-polarity source sites with $\eta_r^{-2}W_{r,\nu}^{\mathrm{rec}}$ weights |
| `weight-receiver-normal-row-open` | delay, source-normal floors, receiver-normal numerators, or same-row branch weights are missing, so the weighted sums are not certified |
| `force-ledger-convention-mismatch` | force, speed, support, self, or medium rows use incompatible center-time or event-time conventions |
| `radial-restoring-bias-certified` | $\Gamma(r_i-R_i^0)b_i^\nu<0$ holds with declared margin on the same ledger |
| `radial-restoring-bias-fails` | the weighted support-radial moment has the wrong sign or no margin |
| `radial-restoring-count-only` | a solver claims restoring behavior from $3$-$2$ count without proving the weighted inequality or site-kernel equality |
| `speed-ode-zero-mean-bias-certified` | the weighted period integral of $f_i^\nu$ vanishes on the same ledger |
| `speed-ode-mean-fails` | the period integral of $f_i^\nu$ is nonzero |
| `speed-primitive-band-not-checked` | zero mean is reported but primitive excursion, speed band, or clock/length return is missing |
| `normal-curvature-drive-open` | $P_i^\perp F_i^\nu$ split is emitted but normal reconstruction rows are not certified |
| `support-radial-moment-open` | support-radial projections are emitted but support-band viability or radial compatibility is not certified |
| `antipodal-force-moment-parity-certified` | exact-antipodal geometry, speed, roots, and projection parity rows all pass |
| `antipodal-speed-pair-failure` | paired geometry is declared but $\nu_{\iota i}=\nu_i$, $\chi_{\iota i}=\chi_i$, or $\Lambda_{\iota i}=\Lambda_i$ fails |
| `inventory-count-ok-root-parity-open` | source-site parity holds but paired root-ledger parity is not certified |
| `structural-attraction-bias-not-closure` | the $3$-$2$ inventory is true but downstream dynamics closure is not certified |
| `gamma-fitted-not-derived` | the sign or size of $\Gamma$ is diagnostic rather than action-derived |
| `fixed-speed-special-case` | $\nu_i\equiv1$ and the output should not be read as a bounded-speed certificate |
| `not-retained` | the packet is diagnostic or priority-only and no retained branch is claimed |

Current status:

$$
\texttt{priority-only},
\qquad
\texttt{force-moment-decomposition-open},
\qquad
\texttt{structural-attraction-bias-not-closure}.
$$
