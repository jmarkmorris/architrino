# Characteristic-Tail Receiver-Gradient Identity and Action Adjudication

## Status and authority

- **Purpose:** preserve the mathematical audit of the characteristic-tail action proposal and its unresolved admissibility boundary.
- **Claim level:** `INCOMPLETE for the frozen whole action; derived cross-worldline future-transmitter term`.
- **Current positive result:** the normalized tail kernel satisfies the required receiver-gradient identity on the declared regularized chart.
- **Current negative result:** the pure scalar $1/r$ causal action is not a universal exact action for the canonical Master Equation.
- **Decisive audit result:** direct variation and an independently authored finite-difference action check reproduce the future-transmitter coefficient on the regular cross-worldline sector. The frozen whole action nevertheless retains every $i=j$, $t>s$ self-history pair while excluding only $t=s$. That domain has no uniform positive separation floor and its finite-width kernel is nonintegrable at the self diagonal under the stated $C^1$ history class.
- **Final disposition:** `INCOMPLETE`; MEC-001 is `Awaiting verification`. The receiver-gradient identity survives, but neither the whole-action variation nor the advertised transverse control is admissible until a predeclared self-diagonal or core prescription defines the functional.
- **Promotion classification:** `priority-only`.
- **Reader-facing incorporation:** preserve only the exact receiver-gradient identity and its scope as a mathematical construction. Keep the complete action adjudication, counterexample, and route-closure reasoning in this priority packet.
- **Ontology effect:** none. This packet does not add an independent wake substance or change the Master Equation.

Plainly: one local calculation has succeeded, and the cross-worldline part of the candidate has the disputed future dependence. The simple $1/r$ action produces an extra term that the Master Equation does not contain. The characteristic-tail kernel removes that extra term in the receiver part of the calculation. But the frozen action also integrates arbitrarily near every self-history diagonal, where its own regular-domain assumption fails and the kernel diverges. The future term is therefore a confirmed formal cross-pair result, not yet an independently verified Euler coefficient of the complete frozen functional.

The owning corpus discussions are [Exact Nonlocal Lagrangian](../../../content/markdown/aaa/dynamics/master-equation.md#exact-nonlocal-lagrangian), [Energy, Symmetry, and Conservation](../../../content/markdown/aaa/dynamics/master-equation.md#energy-symmetry-and-conservation), and the [Causal Action Functional](../../../content/markdown/aaa/dynamics/causal-action-functional.md). The competing or potentially complementary causal-state route is [Independent Causal Wake-State Closure](independent-causal-wake-state-closure.md), with its current obstruction proved in [Independent Causal Wake-State Minimum and Obstruction](analysis-independent-causal-wake-state.md).

The [wake-reception review packet](../../research-office/research-history/review-packets/terence-tao-wake-reception-transfer-and-maturity-2026-07-28.md) supplies a conditional angular-pin falsifier for this packet's momentum chart. Execution remains owned by MEC-004 after MEC-005; this backlink does not supply an account map, conservation result, or action adjudication.

Plainly: the Master Equation chapter owns the equations summarized here. This file is the focused research packet: it explains what they mean, separates proof from proposal, and records why the action route was not promoted.

## 1. Finding in plain language

The desired Master Equation gives the receiver an acceleration contribution along the line from the transmitter's emission point to the receiver. Its magnitude contains an inverse-square separation and a transmitter-side causal-root compression factor. A natural first attempt was to derive that law from a two-time scalar action with a $1/r$ kernel supported on the causal wake surface.

That first attempt gets the desired inverse-square piece, but varying the causal constraint produces an additional derivative-of-constraint piece. The added piece is generally an interior Euler term: it changes the equation of motion. It cannot be discarded as bookkeeping, and the transmitter's role elsewhere in the double integral does not generically cancel it.

Plainly: changing the receiver position changes two things at once. It changes the separation $r$, which correctly produces the $1/r^2$ behavior. It also changes whether the transmitter and receiver lie on the same causal wake surface. That second change produces the unwanted term.

The simple action is therefore correctly falsified only in this precise sense: it is not, by itself, a universal exact action for the Master Equation. The calculation does **not** falsify the Master Equation, delayed path-history dynamics, or the possibility of another action.

A local patch on the same wake surface cannot remove only the unwanted term. Under the stated restricted assumptions, any such patch also changes the wanted inverse-square term. The least invasive known action-level candidate is instead a kernel spread along a characteristic direction behind the primary causal surface. This is the **characteristic tail**.

Plainly: a correction painted only on the same thin wake surface cannot repair the action without damaging the part that was already right. The candidate repair distributes the action contribution through a controlled portion of causal history behind that surface.

The characteristic-tail kernel passes an important local test:

$$
D_{ij}K_{\mathrm{eff}}^{(\eta)}(r,g)
=
-\frac{\delta_\eta(g)}{r^2}.
$$

Plainly: $K_{\mathrm{eff}}^{(\eta)}$ is the proposed regularized effective kernel, $r$ is the transmitter-to-receiver separation, $g$ measures departure from exact causal arrival, $\delta_\eta$ is a narrow regularized delta distribution of width $\eta$, and $D_{ij}$ is the receiver's radial variation operator defined below. The equation says that varying the new kernel produces exactly the desired inverse-square causal-surface term and no derivative-of-delta term in this receiver calculation.

That identity was why the proposal merited complete investigation. It was not acceptance evidence. The transmitter-role calculation fails on the regular cross-worldline sector, but verification of the frozen whole action is blocked earlier by the undeclared self-diagonal prescription.

The complete receiver-plus-transmitter collection has been performed for every regular cross-worldline term. For one worldline point at time $\tau$, the receiver occurrence supplies the desired past-supported term, while the transmitter occurrence supplies a reciprocal term integrated over later receiver times. The latter is not a boundary term and is not determined by the state at $\tau$. This collection cannot yet be promoted to the Euler derivative of the whole frozen action because that action is not defined on its retained self sector.

Plainly: the tail solves the local receiver calculus problem, and each regular cross-pair term creates future dependence when the transmitter is varied. The canonical Master Equation does not contain that future dependence. A final whole-action verdict still requires a mathematically defined self-history sector rather than omission of the near-diagonal terms.

## 2. The target that an action must reproduce

For receiver $i$ at absolute time $T_r$ and transmitter $j$ at emission time $T_t$, define

$$
\mathbf r_{ij}(T_r;T_t)
=
\mathbf X_i(T_r)-\mathbf X_j(T_t),
\qquad
r_{ij}=\|\mathbf r_{ij}\|,
\qquad
\hat{\mathbf r}_{ij}=\frac{\mathbf r_{ij}}{r_{ij}}.
$$

Plainly: $\mathbf X_i$ and $\mathbf X_j$ are the two architrino positions. The vector $\mathbf r_{ij}$ points from the transmitter's past emission point to the receiver's current point. Its length is $r_{ij}$, and $\hat{\mathbf r}_{ij}$ keeps only the direction.

The time-valued causal constraint is

$$
g_{ij}(T_r,T_t)
=
T_r-T_t-\frac{r_{ij}(T_r;T_t)}{c_f}.
$$

Plainly: $c_f$ is the primitive wake speed. The equation $g_{ij}=0$ says that the elapsed absolute time $T_r-T_t$ exactly equals the travel time $r_{ij}/c_f$. A causal root is an emission time $T_t$ that satisfies this equation. The root is selected by $g=0$, not by the fold condition introduced next.

The transmitter-side root Jacobian is

$$
D_{t,ij}
=
c_f-\hat{\mathbf r}_{ij}\cdot\mathbf V_j(T_t),
\qquad
\partial_{T_t}g_{ij}
=
-\frac{D_{t,ij}}{c_f}.
$$

Plainly: $\mathbf V_j$ is the transmitter velocity at emission. $D_{t,ij}$ measures how quickly the causal constraint changes as the emission time is moved. A simple root requires $D_{t,ij}\ne0$. The separate condition $D_{t,ij}=0$ is a fold, where two simple roots can merge or disappear and the ordinary root formula is not valid.

On a certified simple-root chart, the canonical per-root acceleration target is

$$
\mathbf A_{ij}(T_r;T_t)
=
\kappa\,\sigma_{ij}|q_iq_j|
\frac{c_f}{r_{ij}^2|D_{t,ij}|}
\hat{\mathbf r}_{ij}.
$$

Plainly: $\kappa$ is the universal coupling constant, $q_i$ and $q_j$ are the architrino polarities, and $\sigma_{ij}=\operatorname{sign}(q_iq_j)$ chooses outward or inward acceleration. The factor $1/r_{ij}^2$ weakens the contribution with separation. The factor $c_f/|D_{t,ij}|$ accounts for how emission times are compressed or stretched when pulled back to causal roots. This is an acceleration-first substrate law; no primitive architrino mass or $\mathbf F=m\mathbf a$ premise is being introduced.

Any proposed action must reproduce the sum of these contributions on the same retained causal roots, with the same finite-history boundary, positive $D_t$ floor, excluded self-coincidence convention, and regulator limit. The receiver-side playback ratio $D_r/D_t$ may remain in root continuation records, but it is not an acceleration multiplier.

## 3. Why introduce an action at all?

The Master Equation is already stated as an acceleration law. An action is not needed merely to rewrite that law. It is useful only if one symmetry-preserving object can do three jobs without contradiction:

1. reproduce the canonical acceleration on every admitted branch;
2. determine the history terms associated with time translation, spatial translation, and rotation;
3. supply energy, momentum, and angular-momentum balances from that same object.

Plainly: the point of the action is unification. We do not want one rule chosen to give acceleration and separate ledgers invented later to make conservation look right. A successful action would make the motion rule and the conservation accounts different consequences of the same mathematics.

The optional universal constant $\mu_{\mathrm{arch}}$ may be used to convert the acceleration-first equation into action and motion-account units. It is not primitive mass. A quadratic bookkeeping chart may write

$$
K_\mu
=
\sum_i\frac{1}{2}\mu_{\mathrm{arch}}\|\mathbf V_i\|^2,
\qquad
\mathbf P_\mu
=
\sum_i\mu_{\mathrm{arch}}\mathbf V_i,
\qquad
\mathbf J_\mu
=
\sum_i\mathbf X_i\times\mu_{\mathrm{arch}}\mathbf V_i.
$$

Plainly: $K_\mu$, $\mathbf P_\mu$, and $\mathbf J_\mu$ are candidate motion accounts in one quadratic proxy chart. They resemble familiar higher-level formulas, but here $\mu_{\mathrm{arch}}$ is only a universal conversion constant. A successful general action may instead derive different conjugate motion functions. No single-architrino physical mass is assumed.

## 4. The naïve scalar causal action

The first scalar scaffold is

$$
S[\{\mathbf X_i\}]
=
\sum_i\int dT\,
\frac{1}{2}\mu_{\mathrm{arch}}\|\mathbf V_i(T)\|^2
-
\frac{1}{2}\sum_{i\ne j}S_{ij},
$$

Plainly: the first term is the quadratic motion-account part of the scaffold. The second subtracts the sum of pair interactions $S_{ij}$. The factor $1/2$ prevents duplicate pair counting under the declared ordered-pair convention.

$$
S_{ij}
=
\mu_{\mathrm{arch}}\kappa\,\sigma_{ij}|q_iq_j|
\int dT\,dT'\,
\Theta(T-T')
\frac{\delta_\eta(g_{ij}(T,T'))}{r_{ij}(T,T')}.
$$

Plainly: $S$ is the candidate action over whole worldline histories. $\Theta(T-T')$ keeps only emission times $T'$ no later than reception times $T$. The regularized delta $\delta_\eta(g)$ concentrates the interaction near the causal surface $g=0$. The factor $1/2$ prevents counting an ordered pair twice when the full pair sum has the corresponding symmetry. The interaction kernel is the simple scalar $\delta_\eta(g)/r$.

At a simple root, delta collapse gives

$$
\delta(g_{ij}(T_r,T'))
=
\sum_{T_t\in\mathcal C_{ij}(T_r)}
\frac{c_f\,\delta(T'-T_t)}
{|D_{t,ij}(T_r;T_t)|}.
$$

Plainly: $\mathcal C_{ij}(T_r)$ is the set of causal emission times that reach receiver $i$ at $T_r$. The ordinary delta-change-of-variable rule contributes the factor $c_f/|D_t|$. This confirms that the action has the correct transmitter-side root compression in its branch-resolved value. It does not yet show that varying the action gives the correct acceleration.

## 5. Receiver variation: where the simple action fails

For a fixed emission point, moving the receiver changes the separation by

$$
\delta r
=
\hat{\mathbf r}\cdot\delta\mathbf X_i,
\qquad
\delta g
=
-\frac{1}{c_f}\hat{\mathbf r}\cdot\delta\mathbf X_i.
$$

Plainly: only the component of the receiver displacement $\delta\mathbf X_i$ along the separation direction changes $r$ to first order. Because $g$ contains $-r/c_f$, the same displacement also shifts the causal constraint.

For the direct kernel

$$
K_0^{(\eta)}(r,g)
=
\frac{\delta_\eta(g)}{r},
$$

Plainly: $K_0^{(\eta)}$ is the naïve regularized pair kernel. It combines a $1/r$ separation scale with a narrow causal-surface selector $\delta_\eta(g)$.

The radial receiver derivative is

$$
\left(
\partial_r-\frac{1}{c_f}\partial_g
\right)
K_0^{(\eta)}
=
-\frac{\delta_\eta(g)}{r^2}
-
\frac{\delta_\eta'(g)}{c_f r}.
$$

Plainly: the first term is wanted. After the overall action sign is included, it supplies the inverse-square line-of-action contribution. The second term contains $\delta_\eta'(g)$, the derivative of the narrow causal-surface peak. The Master Equation has no corresponding acceleration term, so the second term must cancel or become a legitimate fixed-boundary contribution.

It is useful to name the radial receiver-variation operator

$$
D_{ij}
\equiv
\partial_r-\frac{1}{c_f}\partial_g.
$$

Plainly: this $D_{ij}$ is a differential operator acting on a kernel expressed in the variables $(r,g)$. It is not the transmitter root denominator $D_{t,ij}$. The similar letter records existing corpus notation, so every calculation must keep the two roles explicit.

On a transversal root, where $D_t\ne0$,

$$
\delta_\eta'(g_{ij})
=
-\frac{1}{J_{ij}}\,
\partial_{T'}\delta_\eta(g_{ij}),
\qquad
J_{ij}
=
1-\frac{\hat{\mathbf r}_{ij}\cdot\mathbf V_j(T')}{c_f}
=
\frac{D_{t,ij}}{c_f}.
$$

Plainly: $J_{ij}$ is the dimensionless transmitter-side Jacobian. This identity turns a derivative with respect to causal mismatch $g$ into a derivative with respect to emission time $T'$. It is valid only away from a fold, where $J_{ij}$ is nonzero.

Integration by parts then separates the unwanted piece into an endpoint term and an interior root-chart derivative:

$$
\int dT'\,
\Theta(T-T')
\frac{\delta_\eta'(g_{ij})}{c_fr_{ij}}
\hat{\mathbf r}_{ij}
=
\mathcal B_{ij}^{(\eta)}(T)
+
\int dT'\,
\delta_\eta(g_{ij})
\partial_{T'}
\left[
\Theta(T-T')
\frac{\hat{\mathbf r}_{ij}}
{c_fr_{ij}J_{ij}}
\right].
$$

Plainly: $\mathcal B_{ij}^{(\eta)}$ collects contributions at declared integration endpoints or excluded coincidence boundaries. The remaining integral is inside the varied history interval. It generally does not vanish. Calling the first part a boundary term does not make the second part disappear.

In the sharp simple-root limit, the interior residual is proportional to

$$
\frac{1}{|J_{ij}(T_r;T_t)|}
\left.
\partial_{T'}
\left[
\frac{\hat{\mathbf r}_{ij}(T,T')}
{c_fr_{ij}(T,T')J_{ij}(T;T')}
\right]
\right|_{T'=T_t}.
$$

Plainly: after the narrow delta selects a causal emission time $T_t$, the residual measures how the direction, distance, and root Jacobian change as that emission time is moved. There is no general reason for this derivative to be zero on an arbitrary path-history branch.

### 5.1 Exact meaning of the falsification

If an admitted regular branch has $r_{ij}>0$, $|J_{ij}|>J_{\min}>0$, and

$$
\left.
\partial_{T'}
\left[
\frac{\hat{\mathbf r}_{ij}(T,T')}
{r_{ij}(T,T')J_{ij}(T;T')}
\right]
\right|_{T'=T_t}
\ne
\mathbf0,
$$

Plainly: this condition says that the direction-and-scale factor selected at the causal root changes when the emission time is moved. It is the operator-checkable signature of a nonzero interior residual.

Then the scalar $1/r$ action leaves a nonzero interior receiver residual on that branch.

Plainly: one ordinary counterexample branch is enough to defeat the universal claim that the pure scalar action always yields the Master Equation. The result does not say the Master Equation is wrong. It says this proposed derivation is incomplete.

**Claim grade: derived under the displayed action, branch regularity, and variation conventions.** The claim is falsified if a correct full variation shows that the displayed interior coefficient cancels identically for arbitrary compact receiver variations without changing the canonical acceleration.

Plainly: this is a mathematical result about a particular candidate action, not an experimental result about nature.

## 6. Why transmitter variation is not an automatic rescue

Varying the emission point instead gives

$$
\delta r_{ij}
=
-\hat{\mathbf r}_{ij}\cdot\delta\mathbf X_j(T'),
\qquad
\delta g_{ij}
=
\frac{1}{c_f}
\hat{\mathbf r}_{ij}\cdot\delta\mathbf X_j(T').
$$

Plainly: moving the transmitter's past emission point changes the same separation and causal constraint with the opposite signs.

The corresponding variation is a coefficient of $\delta\mathbf X_j(T')$, whereas the receiver variation is a coefficient of $\delta\mathbf X_i(T)$. For compact variations inside the history window, these are independent variations. A term multiplying one cannot simply be declared to cancel a term multiplying the other.

Plainly: the two terms belong to different coordinates at different times. They may participate together in a global symmetry balance, but that is not the same as cancelling an unwanted local equation-of-motion term.

There is a deeper causal question. When a worldline point is varied in its role as a transmitter, the double integral includes later receivers whose causal wakes intersect that point's emission. The full Euler equation can therefore contain future-supported coefficients unless the action's endpoint convention, auxiliary state, or special structure removes them.

**Claim grade: derived negative on the regular cross-worldline sector.** Section 16.3 displays the receiver and transmitter coefficients for one arbitrary compact worldline variation wherever the pair kernel is regular. The future-supported transmitter coefficient survives. Section 16.1A explains why the undefined retained self sector prevents promotion to a whole-action verdict.

Plainly: the receiver-only calculation did not prove a causal initial-value law. The cross-pair calculation exposes future dependence, but the frozen whole action still needs a finite self prescription before it has an Euler equation to adjudicate.

## 7. Why a local same-surface correction fails

Consider a local scalar correction on the same causal support,

$$
K_{\mathrm{ct}}^{(\eta)}(r,g)
=
a(r,J)\delta_\eta(g).
$$

Plainly: $a(r,J)$ is an unknown scalar coefficient allowed to depend on separation $r$ and the dimensionless root Jacobian $J$. The correction remains concentrated on the same thin surface $g=0$.

Its radial receiver variation contains

$$
D_{ij}K_{\mathrm{ct}}^{(\eta)}
\supset
\partial_r a\,\delta_\eta(g)
-
\frac{a}{c_f}\delta_\eta'(g).
$$

Plainly: choosing $a$ can adjust the unwanted derivative-of-delta term, but the same choice also has an ordinary delta contribution through $\partial_r a$.

Cancelling the original $-\delta_\eta'(g)/(c_fr)$ coefficient requires

$$
a(r,J)=-\frac{1}{r}.
$$

Plainly: the correction must be the negative of the original scalar scale factor if it is to cancel the unwanted derivative term for every admitted receiver displacement.

But then

$$
\partial_r a\,\delta_\eta(g)
=
\frac{\delta_\eta(g)}{r^2},
$$

Plainly: differentiating the required coefficient $a=-1/r$ generates a new positive inverse-square causal-surface term.

This changes the desired inverse-square coefficient.

Plainly: the patch erases the bad term only by also changing the good term. Adding another same-surface scalar patch repeats the same tradeoff.

The obstruction extends to a finite delta-derivative expansion,

$$
K_{\mathrm{ct}}^{(\eta)}(r,g)
=
\sum_{n=0}^{N}a_n(r)\delta_\eta^{(n)}(g).
$$

Plainly: this is the most general finite stack of a delta peak and its first $N$ derivatives with radial coefficients $a_n(r)$. It tests whether a more elaborate but still local surface patch can succeed.

The highest derivative produced by $D_{ij}$ is $-a_N\delta_\eta^{(N+1)}/c_f$, so matching a target containing no such term forces $a_N=0$. Repeating the argument down through the derivative orders forces all $a_n=0$ for $n\ge1$. The remaining $a_0=-1/r$ case is the failed scalar patch above.

Plainly: the proof works from the highest derivative downward. Each extra delta-derivative would create an even higher derivative that has nothing to cancel it, so its coefficient must vanish. The finite local family reduces to the already failed one-term correction.

**Claim grade: derived no-go under restricted assumptions.** It rules out finite same-support scalar or delta-jet corrections built only from the stated variables. It does not rule out a characteristic tail, a velocity-dependent invariant, a richer history functional, or an independently evolving causal wake state.

## 8. Deriving the characteristic-tail equation

The correction should cancel only the unwanted term:

$$
D_{ij}K_{\mathrm{ct}}^{(\eta)}(r,g)
=
\frac{\delta_\eta'(g)}{c_fr}.
$$

Plainly: the right side is exactly the opposite of the bad term produced by the direct $1/r$ kernel. Solving this first-order partial differential equation is the repair problem.

The characteristic invariant is

$$
u
=
g+\frac{r}{c_f},
\qquad
D_{ij}u=0.
$$

Plainly: a characteristic is a path in the $(r,g)$ plane along which the differential operator $D_{ij}$ moves. The combination $u$ stays constant along that path. Because $g=T-T'-r/c_f$, the invariant is also simply $u=T-T'$, the absolute delay age. This gives the tail a direct path-history meaning.

A formal solution is

$$
K_{\mathrm{ct}}^{(\eta)}(r,g)
=
H_{\mathrm{ct}}^{(\eta)}(u)
+
\int_{r_\ast}^{r}
\frac{1}{c_f\rho}
\delta_\eta'
\left(
g+\frac{r-\rho}{c_f}
\right)
d\rho.
$$

Plainly: $\rho$ is a dummy separation variable along one characteristic, $r_\ast$ is a chosen endpoint, and $H_{\mathrm{ct}}^{(\eta)}(u)$ is the undetermined homogeneous part. The differential equation determines how the kernel changes along a characteristic, but an endpoint condition is still needed to choose one unique kernel.

The delayed-interior orientation uses an outgoing endpoint $R_+\ge r$:

$$
K_{\mathrm{ct},+}^{(\eta)}(r,g)
=
H_+^{(\eta)}(u)
-
\int_r^{R_+}
\frac{1}{c_f\rho}
\delta_\eta'
\left(
u-\frac{\rho}{c_f}
\right)
d\rho.
$$

Plainly: instead of integrating inward to a smaller separation, this form integrates outward from the current separation $r$ to $R_+$. In the sharp limit it places support in the delayed interior behind the arriving surface, rather than ahead of it.

## 9. The endpoint is part of the physics

Differentiating the outgoing form gives

$$
D_{ij}K_{\mathrm{ct},+}^{(\eta)}
=
\frac{\delta_\eta'(g)}{c_fr}
-
\frac{D_{ij}R_+}{c_fR_+}
\delta_\eta'
\left(
u-\frac{R_+}{c_f}
\right).
$$

Plainly: the first term is the desired cancellation. The second is leakage from moving the chosen endpoint under receiver variation. Unless that leakage vanishes, the repair adds a new interior acceleration contribution on a second tail surface.

The clean condition is

$$
D_{ij}R_+=0.
$$

Plainly: the endpoint must itself follow a characteristic, so the receiver variation does not move it across the tail. This converts the endpoint contribution into a genuine history-boundary question rather than a hidden change to the local acceleration law.

A finite-window alternative would have to prove

$$
\lim_{\eta\to0^+}
\int_W
\left\|
\frac{D_{ij}R_+}{c_fR_+}
\delta_\eta'
\left(
u-\frac{R_+}{c_f}
\right)
\right\|dT
=
0.
$$

Plainly: $W$ is the tested absolute-time window. If the endpoint is not exactly characteristic, its extra contribution must at least vanish in the same regulator limit used for the action. Merely calling it a boundary term is not a proof.

The current clean candidate chooses

$$
R_+(u)
=
c_f(u+h_+),
\qquad
h_+>0.
$$

Plainly: $h_+$ is an added positive tail-depth parameter in time units. Since $R_+$ depends only on the characteristic invariant $u$, it automatically satisfies $D_{ij}R_+=0$. At exact arrival, $u=r/c_f$, so $R_+=r+c_fh_+$: the outgoing endpoint lies a controlled distance beyond the arrival separation.

This choice is mathematically convenient. `CT-FH-1` freezes $h_+=h$ using the declared retained-history depth, but its physical uniqueness is not adjudicated because the self-inclusive functional is not defined. No endpoint interpretation is promoted from the incomplete action audit.

## 10. Endpoint clearance and normalization

After changing variables to

$$
s
=
u-\frac{\rho}{c_f},
$$

Plainly: $s$ re-expresses the running separation $\rho$ as a causal-mismatch coordinate along a characteristic of fixed delay age $u$.

The outgoing correction becomes

$$
K_{\mathrm{ct},+}^{(\eta)}(r,g)
=
H_+^{(\eta)}(u)
-
\int_{-h_+}^{g}
\frac{\delta_\eta'(s)}
{c_f(u-s)}
ds.
$$

Plainly: $s$ is the causal-mismatch coordinate sampled along the tail. The lower value $-h_+$ is the outgoing endpoint, and the upper value $g$ is the current event's mismatch.

Integration by parts yields

$$
\frac{\delta_\eta(g)}{r}
+
K_{\mathrm{ct},+}^{(\eta)}(r,g)
=
H_+^{(\eta)}(u)
+
\frac{\delta_\eta(-h_+)}
{c_f(u+h_+)}
+
\int_{-h_+}^{g}
\frac{\delta_\eta(s)}
{c_f(u-s)^2}
ds.
$$

Plainly: the first term on the left is the original simple kernel. The right side contains an arbitrary characteristic-only term $H_+$, a finite-endpoint remainder, and the desired normalized tail integral. The endpoint remainder must be removed before the kernel has a unique conservation ledger.

Define the endpoint-clearance term

$$
\mathcal B_+^{(\eta)}(u,h_+)
\equiv
\frac{\delta_\eta(-h_+)}
{c_f(u+h_+)}.
$$

Plainly: if the regularized delta has compact support and $h_+$ lies outside that support, this term is exactly zero. For a Gaussian-like regulator with nonzero tails everywhere, it must be proved to approach zero in the declared limit.

If clearance is not exact at finite $\eta$, normalization requires

$$
H_+^{(\eta)}(u)
=
-\mathcal B_+^{(\eta)}(u,h_+).
$$

Plainly: the homogeneous freedom is fixed to cancel the endpoint remainder. Although $H_+(u)$ does not affect the local receiver-gradient identity, it does affect the history charges. Leaving it arbitrary would make energy, momentum, or angular momentum depend on an unfixed gauge-like choice.

The resulting finite-tail kernel is

$$
K_{\mathrm{eff},h_+}^{(\eta)}(r,g)
=
\int_{-h_+}^{g}
\frac{\delta_\eta(s)}
{c_f(u-s)^2}
ds,
\qquad
u=g+\frac{r}{c_f}.
$$

Plainly: this is the current characteristic-tail candidate. It accumulates regularized causal support from the outgoing endpoint up to the current mismatch. Its denominator is the squared separation associated with each point along the characteristic.

The infinite-endpoint version is

$$
K_{\mathrm{eff}}^{(\eta)}(r,g)
=
\int_{-\infty}^{g}
\frac{\delta_\eta(s)}
{c_f(u-s)^2}
ds.
$$

Plainly: this removes the finite depth $h_+$ but introduces a convergence and infinite-history burden. The finite and infinite versions are not interchangeable until their limits and boundary charges are proved to agree on the same branch.

## 11. The closed local identity

Holding $u$ fixed along $D_{ij}$ and differentiating the normalized kernel gives

$$
D_{ij}K_{\mathrm{eff}}^{(\eta)}(r,g)
=
-\frac{\delta_\eta(g)}{r^2}.
$$

Plainly: the upper integration limit contributes the regularized delta at the current mismatch $g$. Along $D_{ij}$, the invariant $u$ stays fixed while the upper limit changes by $D_{ij}g=-1/c_f$. At that upper limit, $c_f(u-g)^2=c_f(r/c_f)^2=r^2/c_f$. Multiplying the upper-limit integrand by $-1/c_f$ therefore gives $-1/r^2$. No derivative of the delta remains.

The vector receiver gradient is therefore

$$
\nabla_{\mathbf X_i}
K_{\mathrm{eff}}^{(\eta)}
=
\hat{\mathbf r}_{ij}
D_{ij}K_{\mathrm{eff}}^{(\eta)}
=
-\frac{\delta_\eta(g_{ij})}{r_{ij}^2}
\hat{\mathbf r}_{ij}.
$$

Plainly: the receiver gradient points along the emission-to-reception line and has exactly the inverse-square causal-surface form. After the interaction sign and coupling in the action are applied and the delta is collapsed over emission time, this is the correct local receiver-side building block for the canonical $c_f/|D_t|$ acceleration weight.

**Claim grade: derived for the receiver-gradient identity under endpoint-clear normalization.** The identity is falsified by a direct symbolic or independent numerical differentiation that yields any additional interior term on the declared domain.

Plainly: this is the strongest positive result currently owned by the proposal. It is exact mathematics for this kernel. Its scope is one part of the full variation.

## 12. Why the candidate was credible before complete variation

Before the complete variation, the candidate merited investigation because it met four mathematical conditions that the local patches could not meet:

1. it cancels the derivative-of-constraint residual;
2. it leaves one inverse-square causal-surface receiver term;
3. it can use a characteristic endpoint with no receiver-gradient leakage;
4. it depends only on scalar path-history quantities and declared scalar endpoints, preserving time-translation, spatial-translation, and rotational form at the kernel level.

Plainly: the proposal repaired the exact local defect that killed the simple action and did not visibly break the three kernel-level symmetries. That was enough to justify the investigation, not enough to survive it.

That earlier local credibility never meant:

- the full Euler equation would equal the Master Equation;
- future-supported transmitter-role terms would vanish;
- the tail has been shown to be an allowed Architrino causal history rather than a new ontological ingredient;
- energy, momentum, and angular momentum have closed on a realized branch;
- the coincident same-transmitter singularity has been crossed;
- any circular chart has become a periodic solution, binder, or stable assembly.

Plainly: the candidate earned investigation, and the investigation has now closed it negatively. Preserving why it looked promising prevents the valid receiver identity from being confused with a failed or careless proposal.

## 13. Rejected candidate history charges

The following formulas are preserved as the symmetry-boundary expressions that would have accompanied the normalized tail. They are not conservation evidence for the canonical Master Equation because the full action has the wrong interior Euler coefficient.

Plainly: these equations show what the failed route would have counted at a time boundary. They remain useful for auditing the no-go, but they cannot be used as energy, momentum, or angular-momentum charges of the unchanged dynamics.

With endpoint normalization fixed, define the weighted pair kernel

$$
\mathcal K_{ij,\mathrm{eff}}^{(\eta)}(T_1,T_t)
=
\mu_{\mathrm{arch}}\kappa\,\sigma_{ij}|q_iq_j|
\Theta(T_1-T_t)
K_{\mathrm{eff}}^{(\eta)}
\left(
r_{ij}(T_1;T_t),
g_{ij}(T_1,T_t)
\right).
$$

Plainly: $\mathcal K_{ij,\mathrm{eff}}^{(\eta)}$ is the normalized scalar tail including the universal coupling, polarity sign, pair magnitude, and past-causal ordering. $T_1$ is a receiver time and $T_t$ is an emission time.

For a time cut $T_\ast$, define the crossing domain

$$
X_{ij}(T_\ast)
=
\{
(T_1,T_t):
T_t\le T_\ast<T_1,\;
T_1>T_t
\}.
$$

Plainly: this domain contains interactions emitted before the cut $T_\ast$ whose receiver endpoint lies after the cut. They are the path-history interactions still “in flight” across that time boundary.

The candidate wake-history energy increment is

$$
E_{\mathrm{wake,eff}}^{(\eta)}(T_\ast)
=
-\frac{1}{2}
\sum_{i,j}
\int_{X_{ij}(T_\ast)}
\partial_{T_1}
\mathcal K_{ij,\mathrm{eff}}^{(\eta)}
\,dT_t\,dT_1.
$$

Plainly: this quantity measures how the interaction kernel changes when the receiver-time end of every crossing pair is shifted. It is a history functional, not an equal-time pile of particle energies.

The candidate wake-history momentum increment is

$$
\mathbf P_{\mathrm{wake,eff}}^{(\eta)}(T_\ast)
=
-\frac{1}{2}
\sum_{i,j}
\int_{X_{ij}(T_\ast)}
\nabla_{\mathbf X_i(T_1)}
\mathcal K_{ij,\mathrm{eff}}^{(\eta)}
\,dT_t\,dT_1.
$$

Plainly: this is the spatial-translation boundary term. It records the vector motion account carried by crossing path-history interactions. It is not primitive charge momentum such as $q\mathbf v$, and it is not imported $m\mathbf v$.

The candidate wake-history angular-momentum increment is

$$
\mathbf J_{\mathrm{wake,eff}}^{(\eta)}(T_\ast)
=
-\frac{1}{2}
\sum_{i,j}
\int_{X_{ij}(T_\ast)}
\mathbf X_i(T_1)
\times
\nabla_{\mathbf X_i(T_1)}
\mathcal K_{ij,\mathrm{eff}}^{(\eta)}
\,dT_t\,dT_1.
$$

Plainly: this is position crossed with the translation-boundary contribution, integrated over the interactions crossing the time cut. It is the orbital angular account of the history kernel about the chosen origin. No intrinsic single-architrino spin or mass-based angular momentum is being assumed.

These formulas are candidate Noether boundary increments for the normalized tail. The regular cross-worldline variation is not the canonical Euler equation, while the whole self-inclusive variation is undefined, so their prerequisite fails before a same-record conservation test begins.

Plainly: a mathematically written boundary expression is not automatically a conserved physical account. Here the regular part does not generate the accepted motion law, and the complete action has not yet been defined.

## 14. The required same-record conservation test

This section records the test that would follow after Phase A. It is blocked for `CT-FH-1`; evaluating these rows cannot define the missing self contribution or repair the regular future-supported interior coefficient.

Plainly: conservation testing comes after defining the whole action and showing that it produces the right motion. A small balance residual now would describe only a partial action or circular bookkeeping, not the canonical Master Equation.

Let $\mathfrak B$ be one retained branch chart, and let $X_{ij}^{\mathfrak B}(T_\ast)$ restrict the crossing domain to the active root records of that chart. In the quadratic bookkeeping chart, the three tests have the form

$$
\Delta_W
\left(
K_{\mu,\mathfrak B}
+
E_{\mathrm{wake,eff},\mathfrak B}^{(\eta)}
\right)
=
\int_W
\sum_i
\mathbf V_i\cdot
\mathbf R_{i,\mathrm{eff},\mathfrak B}^{(\eta)}
\,dT
+
\int_W
\mathcal B_{E,\mathfrak B}^{(\eta)}
\,dT,
$$

Plainly: the first balance is the energy row. The change in the combined quadratic motion account and tail-history energy equals the accumulated velocity-weighted Euler residual plus declared energy leakage through the boundaries.

$$
\Delta_W
\left(
\mathbf P_{\mu,\mathfrak B}
+
\mathbf P_{\mathrm{wake,eff},\mathfrak B}^{(\eta)}
\right)
=
\int_W
\sum_i
\mathbf R_{i,\mathrm{eff},\mathfrak B}^{(\eta)}
\,dT
+
\int_W
\boldsymbol{\mathcal B}_{P,\mathfrak B}^{(\eta)}
\,dT,
$$

Plainly: the second balance is the momentum row. The change in combined motion and tail-history momentum equals the integrated vector Euler residual plus declared momentum leakage.

$$
\Delta_W
\left(
\mathbf J_{\mu,\mathfrak B}
+
\mathbf J_{\mathrm{wake,eff},\mathfrak B}^{(\eta)}
\right)
=
\int_W
\sum_i
\mathbf X_i\times
\mathbf R_{i,\mathrm{eff},\mathfrak B}^{(\eta)}
\,dT
+
\int_W
\boldsymbol{\mathcal B}_{J,\mathfrak B}^{(\eta)}
\,dT.
$$

Plainly: $W=[T_a,T_b]$ is one tested time window. $\Delta_W$ means final value minus initial value. $\mathbf R_i^{(\eta)}$ is the full Euler residual—the difference between the action-derived equation and the canonical Master Equation. $\mathcal B_E$, $\boldsymbol{\mathcal B}_P$, and $\boldsymbol{\mathcal B}_J$ are declared leakage through finite history, spatial boundaries, period cuts, omitted roots, or tail endpoints. Each total can be constant only when its matching Euler and boundary residuals vanish in the same regulator limit.

The same-record rule is strict:

- the acceleration residual and all three history charges use the same worldline history;
- they use the same retained roots and inactive-root gaps;
- they use the same $D_t$ floor;
- they use the same $\eta$, core convention, $h_+$ or infinite-tail convention, and time window;
- they use the same exclusion of trivial self-coincidence;
- no motion or wake account is fitted afterward to cancel the measured residual.

Plainly: conservation cannot be assembled from the best energy run, a different momentum run, and a third angular-momentum run. One state record must pay every account at once.

For a finite spatial region, the energy boundary term must agree with the surface-resolved flux in [Wake Escapement](../../../content/markdown/aaa/dynamics/energy.md#wake-escapement). An isochron-level escape label is only an earliest-crossing diagnostic; partial interception and partial escape require a surface or solid-angle-resolved flux.

Plainly: an expanding wake surface can partly cross a boundary while another part remains inside. The conservation calculation must count the actual crossing portions rather than marking the entire surface as simply “escaped” or “not escaped.”

## 15. Relation to the independent causal wake-state route

The two routes answer different questions.

### Route A: characteristic-tail worldline action

The tail is computed from worldline history and an endpoint convention. Its receiver gradient is past-supported, but its complete variation is not: varying the same worldline point as a transmitter produces the future coefficient in Section 16.3.

Plainly: Route A tried to keep the ontology small by encoding wake history only in the worldlines. That economy is exactly what makes the earlier transmitter point respond to later receiver endpoints.

The former central risk is now a derived cross-worldline obstruction. Route A remains `Awaiting verification` because the frozen record does not define its near-diagonal self-history contribution.

Plainly: future reception is not an open question for regular cross pairs. The status remains open because the complete candidate action is not yet a finite functional on its stated history class.

### Route B: independently evolving causal wake state

The independent-state route appends a present-time surface-resolved wake state with propagation, reception, energy, momentum, and boundary updates. Its regular kinematic substate has been derived, but the present primitives do not select the maturity law, motion-account functions, emission capacity, or reception transfer.

Plainly: Route B makes the wake an explicit part of the state advanced from one absolute-time slice to the next. That makes causal updating transparent, but it creates constitutive questions: what exactly is stored, how reception changes it, and how its accounts are bounded.

### Exact localization does not bridge the routes

Section 16.6 proves the chain-rule statement that exact elimination of an auxiliary wake state preserves the Euler derivative of a differentiable reduced action. A kinematic wake profile may reproduce the scalar kernel value, but it does not define the missing self prescription or derive the missing reception transfer, motion accounts, maturity, or boundary capacities.

Plainly: hiding a well-defined tail inside an extra variable cannot change its equation. The rule cannot yet be applied to the undefined complete `CT-FH-1` functional. A genuinely causal wake state must add independently justified update rules and remains Route B.

**Claim grade: derived conditional chain-rule no-go; application to `CT-FH-1` is blocked.** The chain-rule claim is falsified by a differentiable past-only auxiliary action whose exact elimination reproduces a reduced functional while the two worldline derivatives differ.

Plainly: the two equal reduced actions would have to have unequal derivatives for that falsifier to occur. Section 16.6 states the chain-rule reason they cannot.

The current relation remains option 3 as a route classification: an independent wake state is the distinct causal-state route, but it is not derived by the characteristic tail. This classification is not a final adjudication of `CT-FH-1`. The existing independent-state analysis separately remains blocked under the current primitive set because maturity, motion-account functions, emission capacity, and reception transfer remain unselected.

Plainly: the characteristic-tail action and the current independent-state attempt have both failed, for different exact reasons. The Master Equation remains unchanged and fail closed at the unsupported singular transition.

## 16. Independent audit and preserved protocol

The steps below are ordered so that cheap mathematical failures occur before expensive branch simulation. Each step must preserve the acceleration-first substrate language and use $c_f=1$ in every numerical instantiation.

### 16.1 Frozen Phase-A candidate

The frozen record `CT-FH-1` uses one finite retained-memory horizon $h>0$, one tail depth $h_+=h$, and one compact-support regulator width $0<3\eta<h$. It is restricted to regular charts with $r_{ij}\ge r_{\min}>0$ and nonzero simple-root floors. No core term is varied inside this regular domain.

Plainly: `CT-FH-1` is the single candidate tested below. The symbol $h$ is the amount of path history retained, $h_+$ is the tail depth and is fixed equal to that existing horizon, $\eta$ is the width of the smooth causal-surface approximation, and $r_{\min}$ keeps the calculation away from coordinate coincidence. No parameter is changed between the receiver and transmitter calculations.

Define the normalized compact bump

$$
\delta_\eta(z)
=
\frac{1}{\eta Z}
\exp\!\left[-\frac{1}{1-(z/\eta)^2}\right]
\mathbf 1_{\{|z|<\eta\}},
\qquad
Z
=
\int_{-1}^{1}
\exp\!\left[-\frac{1}{1-y^2}\right]dy.
$$

Plainly: $z$ is the causal-mismatch argument, $\delta_\eta$ is a smooth nonnegative peak supported only for $|z|<\eta$, $Z$ normalizes its integral to one, $y$ is the dimensionless integration variable, and $\mathbf 1_{\{|z|<\eta\}}$ is one inside the support and zero outside. Because $h>\eta$, the endpoint value $\delta_\eta(-h)$ is exactly zero.

For $u=t-s$, $r_{ij}(t,s)=\|\mathbf X_i(t)-\mathbf X_j(s)\|$, and $g_{ij}=u-r_{ij}/c_f$, freeze

$$
K_{h}^{(\eta)}(r,g)
=
\int_{-h}^{g}
\frac{\delta_\eta(z)}
{c_f(u-z)^2}\,dz,
\qquad
u=g+\frac{r}{c_f}.
$$

Plainly: $t$ is receiver time, $s$ is transmitter time, $u=t-s$ is their absolute-time separation, $r_{ij}$ is their Euclidean separation, and $g_{ij}$ is zero at causal arrival. The kernel $K_h^{(\eta)}$ accumulates the normalized tail from the fixed endpoint $-h$ to the current mismatch $g$. The relation $u=g+r/c_f$ ensures that $u$ stays unchanged during a spatial endpoint variation.

Let $\chi_h(t,s)$ equal one when $0<t-s<h$ and zero otherwise, and define

$$
\Lambda_{ij}
=
\mu_{\mathrm{arch}}\kappa\,
\sigma_{ij}|q_iq_j|.
$$

Plainly: $\chi_h$ enforces strict past ordering and the finite memory horizon. The coefficient $\Lambda_{ij}$ combines the universal bookkeeping conversion $\mu_{\mathrm{arch}}$, coupling $\kappa$, polarity sign $\sigma_{ij}$, and polarity magnitudes $|q_iq_j|$. It is symmetric under exchanging $i$ and $j$.

On a finite interval $I=[T_-,T_+]$, the frozen action is

$$
S_{\mathrm{CT}}^{(\eta,h)}
=
\sum_a
\int_I
\frac{\mu_{\mathrm{arch}}}{2}
\|\dot{\mathbf X}_a(t)\|^2\,dt
-
\frac{1}{2}
\sum_{i,j}
\Lambda_{ij}
\int_I dt
\int_I ds\,
\chi_h(t,s)
K_h^{(\eta)}
\left(r_{ij}(t,s),g_{ij}(t,s)\right).
$$

Plainly: $S_{\mathrm{CT}}^{(\eta,h)}$ is the complete frozen candidate. The first term is the explicitly proxy-grade quadratic motion term. The second is an ordered receiver-transmitter sum; the factor $1/2$ is part of the frozen convention rather than a coefficient to be refitted after variation. The strict inequality in $\chi_h$ excludes the trivial same-transmitter coincidence $t=s$ while retaining nontrivial self-hits with $i=j$ and $t>s$.

Allowed variations are $C^1$ spatial variations with compact support inside $[T_-+h,T_+-h]$. Initial, final, incoming-history, retained-memory, and tail endpoints are fixed; the regulator, $h$, $h_+$, pair factor, and kinetic proxy are not varied.

Plainly: the varied worldline segment stays at least one memory horizon away from the outer time boundaries. This removes accidental endpoint motion and forces every surviving coefficient to be a genuine interior Euler term.

**Step 0 claim grade: derived incomplete.** The formula freezes the named parameters, but its retained self-history domain is incompatible with its positive separation floor. Its operator-checkable falsifier is an explicit existing self-diagonal or core rule that makes the displayed action finite without changing `CT-FH-1`.

Plainly: the formula names most of the candidate, but not the rule needed at arbitrarily short self-history separations. Adding such a rule creates a new candidate unless the rule can be traced to the frozen record.

### 16.1A Independent verification audit

The audit reconstructed the interaction with a general frozen pair coefficient $\alpha$ before setting $\alpha=1/2$. On every regular cross-worldline term, variation of a point $\mathbf X_a(\tau)$ as receiver gives $+\alpha\mathbf R_a^{\mathrm{past}}$, while variation of the same point as transmitter gives $-\alpha\mathbf F_a^{\mathrm{future}}$. The one-sided domain $s<t$ already counts each oriented reception event once: exchanging both endpoint labels and endpoint times violates that same support condition. Consequently, the factor $1/2$ halves both terms rather than removing a duplicate of either one. Setting $\alpha=1$ repairs the receiver normalization but leaves the full future coefficient.

Plainly: the signs and the future term do not come from a copied final formula. They follow by finding every place the varied point occurs in the double integral. The pair coefficient can make both contributions larger or smaller, but it cannot keep the past contribution and delete the future one.

The time-only window $\chi_h(t,s)$ does not vary under the admitted spatial variations. Compact support removes the kinetic and outer-time endpoint terms, the lower tail endpoint $-h$ is fixed, and a homogeneous term depending only on $u=t-s$ has zero spatial endpoint gradient. Pair symmetrization therefore neither cancels the future term nor converts it into a boundary term.

Plainly: none of the declared endpoint, support, or symmetry conventions hides an equal and opposite cross-pair contribution.

The independent second check directly finite-differenced a discretized cross-pair action rather than evaluating the derived Euler formula. It used $c_f=1$, $R=1$, $\Lambda=1$, $h=3$, the frozen compact bump, and a future transverse receiver profile equal to one across the regulator support. The measured derivative of the present transverse Euler coefficient with respect to the future bump converged to the exact cross-pair value $-1/2$:

| Refinement | Values | Measured coefficient |
| --- | --- | --- |
| time spacing, $\eta=0.1$ | $0.04,0.02,0.01,0.005$ | $-0.495379,-0.500907,-0.499621,-0.499702$ |
| regulator width, $\Delta t=0.005$ | $0.2,0.1,0.05$ | $-0.499700,-0.499702,-0.499622$ |
| action probe, $\eta=0.1$ | $10^{-3},5\times10^{-4},2.5\times10^{-4},1.25\times10^{-4}$ | $-0.499701,-0.499702,-0.499702,-0.499702$ |
| future bump amplitude, $\eta=0.1$ | $0.04,0.02,0.01,0.005$ | $-0.498803,-0.499702,-0.499927,-0.499983$ |

Plainly: a separately evaluated double integral reads the future transverse receiver change with the predicted sign and magnitude. This is independent of the hand Euler formula, but it deliberately omits the undefined self terms and therefore verifies only the regular cross-worldline sector.

The frozen whole-action obstruction occurs before that cross-pair result can verify MEC-001. For a $C^1$ self worldline and $u=t-s\downarrow0$, $r_{aa}(t,t-u)\to0$, so no history can satisfy $r_{aa}\ge r_{\min}>0$ on the full declared domain $0<u<h$. On a sufficiently small interval where the compact regulator is bounded below, integrate the kernel over $z\in[g-r/c_f,g]$. Then

$$
K_h^{(\eta)}(r,g)
\ge
\frac{C}{r},
\qquad
r_{aa}(t,t-u)\le M u,
\qquad
\int_0^\epsilon
K_h^{(\eta)}\,du
\ge
\frac{C}{M}
\int_0^\epsilon\frac{du}{u}
=\infty.
$$

Plainly: deleting only the exact point $t=s$ does not delete the arbitrarily near self pairs. Their accumulated tail has a logarithmically divergent lower bound for every locally Lipschitz history; if the worldline revisits the exact same position, the pointwise singularity is stronger.

**Independent verdict: `INCOMPLETE`.** Derived: the receiver identity survives, and the formal regular cross-worldline variation contains $-\mathbf F_a^{\mathrm{future}}/2$. Measured: the independent discretized cross-pair action reproduces that coefficient within the refinement table above. Unresolved: the frozen full action, the complete self contribution, and the advertised static transverse histories are inadmissible without an explicit self-diagonal or core prescription. The verdict is falsified by a pre-existing declared prescription that makes the displayed `CT-FH-1` functional and the transverse control finite while preserving all frozen conventions, followed by independent variation of that complete functional.

Plainly: the future term is real where the kernel is regular, but `Verified` would claim more than the current functional defines. MEC-001 must remain open until the self sector is frozen and checked independently.

### 16.2 Independent receiver-gradient rederivation

Along the spatial receiver-variation operator

$$
D_{ij}
=
\partial_r-\frac{1}{c_f}\partial_g,
\qquad
D_{ij}u=0,
\qquad
D_{ij}g=-\frac{1}{c_f},
$$

Plainly: $D_{ij}$ changes receiver-transmitter separation $r$ while changing the mismatch $g$ by the amount required by its definition. The delay age $u$ stays fixed, and the upper integration limit $g$ moves at rate $-1/c_f$.

the fundamental theorem of calculus gives

$$
D_{ij}K_h^{(\eta)}
=
-\frac{1}{c_f}
\frac{\delta_\eta(g)}
{c_f(u-g)^2}
=
-\frac{\delta_\eta(g)}{r^2}.
$$

Plainly: differentiating the integral samples its integrand at the upper limit $g$. Since $u-g=r/c_f$, the two factors of $c_f$ cancel and leave the required $-1/r^2$ coefficient. This independently reproduces the local identity without using the earlier integration-by-parts construction.

**Step 1 claim grade: derived positive.** The exact hand rederivation agrees with the existing derivation, including the upper-limit sign, both factors of $c_f$, and finite endpoint clearance. The independent finite-difference action check in Section 16.1A also reproduces the associated transverse endpoint gradient on the cross-pair control. The identity is falsified if direct differentiation of the frozen integral produces any additional term.

Plainly: the receiver identity remains correct at finite or infinite depth whenever the stated integral exists. The whole-action blocker is in the self-history domain, not this local differentiation.

### 16.3 Complete receiver-plus-transmitter variation

Define the finite-regulator line-of-action density

$$
\mathbf q_{ij}^{(\eta)}(t,s)
=
\frac{\delta_\eta(g_{ij}(t,s))}
{r_{ij}^2(t,s)}
\hat{\mathbf r}_{ij}(t,s).
$$

Plainly: $\mathbf q_{ij}^{(\eta)}$ points from transmitter $j$ at time $s$ to receiver $i$ at time $t$. Its magnitude is the regularized causal selector divided by squared separation. Coupling and polarity remain outside this definition in $\Lambda_{ij}$.

Translation invariance of the scalar kernel and the identity above give

$$
\nabla_{\mathbf X_i(t)}K_h^{(\eta)}
=
-\mathbf q_{ij}^{(\eta)}(t,s),
\qquad
\nabla_{\mathbf X_j(s)}K_h^{(\eta)}
=
+\mathbf q_{ij}^{(\eta)}(t,s).
$$

Plainly: moving the receiver and moving the transmitter change the same separation in opposite directions. The first gradient is the desired receiver term. The equal-and-opposite second gradient is unavoidable for this translation-invariant worldline kernel and is the source of the future term.

For an arbitrary compact variation of worldline $a$ at time $\tau$, define

$$
\mathbf R_a^{\mathrm{past}}(\tau)
=
\sum_j\Lambda_{aj}
\int_{\tau-h}^{\tau}
\mathbf q_{aj}^{(\eta)}(\tau,s)\,ds,
$$

Plainly: $\mathbf R_a^{\mathrm{past}}$ is the past-supported receiver coefficient. It sums emissions from every transmitter $j$ during the retained history ending at the present time $\tau$.

and

$$
\mathbf F_a^{\mathrm{future}}(\tau)
=
\sum_i\Lambda_{ia}
\int_{\tau}^{\tau+h}
\mathbf q_{ia}^{(\eta)}(t,\tau)\,dt.
$$

Plainly: $\mathbf F_a^{\mathrm{future}}$ is the coefficient created when the same worldline point acts as a transmitter. It sums receiver events at later times $t$ whose causal support reaches back to the emission at $\tau$. The letter $\mathbf F$ here labels “future”; it is not substrate force language.

Formally collecting the kinetic, receiver, and transmitter occurrences on the regular cross-worldline sector gives

$$
\delta S_{\mathrm{CT}}^{(\eta,h)}
=
\int d\tau\,
\mathbf E_a(\tau)\cdot\delta\mathbf X_a(\tau)
+
\left[
\mu_{\mathrm{arch}}\dot{\mathbf X}_a
\cdot\delta\mathbf X_a
\right]_{\text{declared outer endpoints}},
$$

Plainly: $\delta S_{\mathrm{CT}}^{(\eta,h)}$ is the first change of the frozen action, $\tau$ is the time of the arbitrary worldline variation, $\mathbf E_a(\tau)$ is its complete interior Euler coefficient, $\delta\mathbf X_a(\tau)$ is the arbitrary spatial displacement, and the bracket is the kinetic boundary term. The allowed compact variations make that bracket zero.

with

$$
\boxed{
\mathbf E_a(\tau)
=
-\mu_{\mathrm{arch}}\ddot{\mathbf X}_a(\tau)
+
\frac{1}{2}\mathbf R_a^{\mathrm{past}}(\tau)
-
\frac{1}{2}\mathbf F_a^{\mathrm{future}}(\tau)
}.
$$

Plainly: the first term is the quadratic-proxy acceleration coefficient. The second is half of the desired past receiver contribution because the ordered pair factor was frozen at $1/2$. The third is a future-reception contribution with the opposite variational sign. It is an interior coefficient, not one of the declared boundary terms.

In the sharp simple-root limit, the two interaction coefficients collapse differently:

$$
\mathbf R_a^{\mathrm{past}}
\longrightarrow
\sum_j\Lambda_{aj}
\sum_{s\in\mathcal C_{aj}(\tau)}
\frac{c_f}
{r_{aj}^2|D_{t,aj}|}
\hat{\mathbf r}_{aj},
\qquad
\mathbf F_a^{\mathrm{future}}
\longrightarrow
\sum_i\Lambda_{ia}
\sum_{t:\,g_{ia}(t,\tau)=0}
\frac{c_f}
{r_{ia}^2|D_{r,ia}|}
\hat{\mathbf r}_{ia}.
$$

Plainly: the past term collapses over transmitter time $s$ and therefore has the canonical transmitter denominator $D_t$. The future term collapses over later receiver time $t$ and therefore contains the later receiver denominator $D_r$. It also requires the later receiver position and velocity. The canonical present acceleration contains only the first sum.

The action Euler equation is consequently

$$
\mu_{\mathrm{arch}}\ddot{\mathbf X}_a(\tau)
=
\frac{1}{2}\mathbf R_a^{\mathrm{past}}(\tau)
-
\frac{1}{2}\mathbf F_a^{\mathrm{future}}(\tau),
$$

Plainly: setting this formal regular-sector Euler coefficient to zero produces a past-plus-future equation. The unchanged canonical Master Equation would instead set the left side equal to all of $\mathbf R_a^{\mathrm{past}}$ and would contain no $\mathbf F_a^{\mathrm{future}}$. Changing the overall pair factor can rescale both terms but cannot remove only the future one. This equation is not yet the Euler equation of the complete frozen functional because the retained self sector is undefined.

### 16.4 Future-only transverse cross-pair control

Choose two off-shell analytic cross-pair histories. Through time $\tau$, let transmitter $a$ remain at the origin and receiver $b$ remain at $R\mathbf e_x$, where $R>0$ and $2\eta<R/c_f<h-\eta$. Let $t_\ast=\tau+R/c_f$, and change only the future receiver segment by

$$
\mathbf X_b^{(\varepsilon)}(t)
=
R\mathbf e_x
+
\varepsilon\psi(t)\mathbf e_y,
$$

Plainly: $\mathbf e_x$ and $\mathbf e_y$ are perpendicular unit directions, $R$ is the fixed base separation, $t_\ast$ is the future causal reception time, $\varepsilon$ is a small transverse displacement, and $\psi$ is a smooth bump supported strictly after $\tau$ and equal to one across the regulator support around $t_\ast$. The perturbed and unperturbed histories are identical at every time up to and including $\tau$.

At $\varepsilon=0$, the first-order changes of separation and causal mismatch vanish, while the line-of-action direction changes transversely. Therefore

$$
\left.
\frac{d}{d\varepsilon}
\int_{\tau}^{\tau+h}
\mathbf q_{ba}^{(\eta)}(t,\tau)\,dt
\right|_{\varepsilon=0}
=
\frac{\mathbf e_y}{R^3}
\int_{\tau}^{\tau+h}
\psi(t)\,
\delta_\eta(t-\tau-R/c_f)\,dt
=
\frac{\mathbf e_y}{R^3}.
$$

Plainly: the future bump does not change $r$ or $g$ to first order because it is perpendicular to the original separation. It does rotate the unit direction by $\varepsilon\psi/R$. The normalized regulator integrates to one, leaving a nonzero transverse change $\mathbf e_y/R^3$ in the future coefficient.

Hence

$$
\left.
\frac{d\mathbf E_a(\tau)}
{d\varepsilon}
\right|_{\varepsilon=0}
=
-\frac{\Lambda_{ba}}{2R^3}\mathbf e_y
\ne
\mathbf0.
$$

Plainly: two histories with exactly the same complete past state give different present action Euler coefficients solely because their future receiver paths differ. The canonical Master Equation gives the same present acceleration for both histories. The extra transverse vector is also absent from its line-of-action past-root sum.

As a cross-pair control, this is off shell and sufficient to distinguish the two regular-sector operators. It is not an admissible history of the complete frozen action as written: keeping either displayed worldline fixed makes every nontrivial self pair on that worldline coincide, and every $C^1$ replacement still approaches the undeclared self diagonal.

Plainly: the calculation exactly exposes the future sensitivity of the interaction between two distinct worldlines. It cannot independently verify the whole candidate while the same candidate also requires undefined self integrals.

**Steps 2 and 3 claim grade: derived negative for the regular cross-worldline sector; incomplete for `CT-FH-1` as a whole.** The cross-sector result is falsified if correct differentiation removes $\mathbf F_a^{\mathrm{future}}$ for arbitrary compact spatial variations. The whole-candidate blocker is falsified by one declared finite self prescription under which the transverse histories become admissible without changing the frozen record.

Plainly: the cross-pair result is exact at finite $\eta$ and does not rely on a numerical tolerance. The incomplete verdict is caused by the candidate's near-diagonal self domain, not by a hidden numerical cancellation.

### 16.5 Scope of the worldline-only no-go

The obstruction is not specific to the chosen bump regulator. For any translation-invariant scalar worldline kernel with nonzero receiver gradient,

$$
\nabla_{\mathbf X_j(s)}K_{ij}(t,s)
=
-\nabla_{\mathbf X_i(t)}K_{ij}(t,s).
$$

Plainly: a scalar depending only on relative endpoint geometry has equal and opposite spatial gradients at its two endpoints. If one endpoint gradient generates a delayed receiver acceleration, the other endpoint gradient appears when the earlier transmitter point is varied.

With a one-sided ordered interaction domain $s<t$, the first gradient is delayed for the receiver and the second is future-directed for the transmitter. Pair symmetrization, an overall coefficient, a different smooth regulator, or a characteristic homogeneous term can rescale or redistribute both occurrences but cannot delete only the future-directed interior coefficient while preserving the receiver gradient.

Plainly: this no-go covers the frozen worldline-only characteristic-tail family and any endpoint-clear scalar variant with the same relative-endpoint structure. It does not rule out an independently evolving wake state, because that would add variables whose variation and causal update are not equivalent to this reduced worldline action.

**Claim grade: derived conditional structural no-go for well-defined scalar, translation-invariant, relative-endpoint worldline functionals with arbitrary compact variations.** It is falsified by one explicit action in that class whose complete compact variation has the desired nonzero past receiver gradient and identically zero future transmitter coefficient on arbitrary regular histories. It does not supply the missing self prescription for `CT-FH-1`.

Plainly: the theorem rejects a class of action routes, not delayed dynamics, the canonical Master Equation, or every possible action with independent wake degrees of freedom.

### 16.6 Exact-localization corollary

Suppose an auxiliary action $S_{\mathrm{loc}}[\mathbf X,\mathcal W]$ has a unique past-only wake solution $\mathcal W[\mathbf X]$ and exact elimination reproduces the frozen worldline action,

$$
S_{\mathrm{red}}[\mathbf X]
=
S_{\mathrm{loc}}
\left[\mathbf X,\mathcal W[\mathbf X]\right]
=
S_{\mathrm{CT}}^{(\eta,h)}[\mathbf X].
$$

Plainly: $\mathcal W$ denotes any proposed auxiliary present-time wake state, $S_{\mathrm{loc}}$ is its local action with the worldlines, and $S_{\mathrm{red}}$ is the action left after solving for and removing that wake state. Exact localization requires the reduced action to equal the frozen tail action, not merely resemble its receiver kernel.

On the auxiliary equation $\delta S_{\mathrm{loc}}/\delta\mathcal W=0$, the chain rule gives

$$
\frac{\delta S_{\mathrm{red}}}{\delta\mathbf X}
=
\left.
\frac{\delta S_{\mathrm{loc}}}{\delta\mathbf X}
\right|_{\mathcal W[\mathbf X]}
+
\left.
\frac{\delta S_{\mathrm{loc}}}{\delta\mathcal W}
\right|_{\mathcal W[\mathbf X]}
\frac{\delta\mathcal W[\mathbf X]}{\delta\mathbf X}
=
\left.
\frac{\delta S_{\mathrm{loc}}}{\delta\mathbf X}
\right|_{\mathcal W[\mathbf X]}.
$$

Plainly: varying the reduced action has a direct worldline part and an indirect part from how the eliminated wake changes. The indirect part vanishes because the wake satisfies its own Euler equation. The localized and reduced worldline equations are therefore identical after elimination.

For any differentiable reduced functional, exact auxiliary localization consequently preserves its Euler derivative, including a future-supported coefficient. A causal auxiliary update that removes that coefficient must change the reduced functional, impose a non-variational reception rule, or introduce additional constitutive data. The corollary cannot yet be applied to the complete frozen tail action because its self sector does not define that reduced functional.

Plainly: rewriting any well-defined action with exactly eliminable hidden variables cannot change its worldline equation. A successful causal wake update must contain new, independently justified structure rather than relabeling this tail.

**Step 13 claim grade: derived conditional chain-rule result; blocked for `CT-FH-1`.** A receiver-indexed kinematic profile can reproduce the scalar kernel value, but it does not remove the complete-variation obstruction or derive energy, momentum, angular momentum, maturity, emission capacity, and reception transfer. Application to `CT-FH-1` requires a finite differentiable reduced action first. The chain-rule statement is falsified by an exact elimination whose auxiliary Euler equation vanishes but whose reduced and localized worldline derivatives differ.

Plainly: the tail can be stored as a calculable cross-pair profile, but exact localization cannot be assessed for the whole candidate until its self sector defines a differentiable action.

### 16.7 Step 0–14 dispositions

| Step | Disposition | Current mathematical reason |
| --- | --- | --- |
| 0 | `failed` | The record retains all $i=j$, $t>s$ pairs but declares neither a near-diagonal exclusion nor a core kernel; the displayed self action diverges. |
| 1 | `passed` | Exact differentiation and the cross-pair finite-difference check preserve the receiver-gradient identity. |
| 2 | `partially closed` | The regular cross-worldline variation contains $-\mathbf F_a^{\mathrm{future}}/2$; the complete self contribution is undefined. |
| 3 | `partially closed` | The future transverse bump changes the cross-pair coefficient, but the displayed static histories are inadmissible for the whole self-inclusive action. |
| 4 | `blocked` | A finite self-diagonal or core prescription must be frozen before endpoint and memory closure can be assessed. |
| 5 | `blocked` | Cross-pair translation symmetry is clear; symmetry of a repaired complete functional is untested. |
| 6 | `blocked` | Noether charges require a finite complete action and cannot be derived from the regular cross sector alone. |
| 7 | `partially closed` | The exact and numerical cross-pair controls agree; a complete admissible self-inclusive control is missing. |
| 8 | `partially closed` | The bounded cross-pair instrument converges, but it cannot represent the undefined self sector. |
| 9 | `blocked` | A same-record packet requires a finite complete Euler operator. |
| 10 | `blocked` | Realized-branch comparison requires a frozen self prescription. |
| 11 | `blocked` | Fold and retained-window continuation are downstream of a defined action. |
| 12 | `blocked` | The near-diagonal self failure occurs before the distinct coincident-birth question. |
| 13 | `blocked` | The chain-rule corollary requires a differentiable reduced action, which `CT-FH-1` does not yet supply. |
| 14 | `incomplete` | Final disposition is `Awaiting verification` for MEC-001. |

Plainly: the receiver identity and future cross-pair coefficient survived independent checking. The audit stops because the frozen candidate is not a finite whole functional on its own admitted self-history domain. Later conservation, branch, fold, and localization claims cannot be graded until that first definition gap is closed.

The detailed step descriptions below preserve the protocol against which `CT-FH-1` is being judged. Their imperative wording records the planned test; the disposition table above is the authority for what has passed, partially closed, failed, or remains blocked.

Plainly: the remaining step descriptions are both an audit trail and the acceptance boundary. They show what verification still requires after the self-domain failure.

### Step 0 — Freeze the exact candidate and conventions

Write one immutable candidate record containing:

- finite or infinite tail choice;
- regulator family $\delta_\eta$ and normalization;
- $h_+$ or the infinite-endpoint limit;
- trivial self-coincidence exclusion;
- finite retained-history and spatial-boundary conventions;
- ordered-pair counting convention and factor $1/2$;
- kinetic or conjugate motion term, clearly graded as derived or proxy;
- allowed variations at initial, final, history, and tail endpoints.

Plainly: a proof is meaningless if the kernel, regulator, or endpoint rules change between calculations. This record fixes the object being tested.

**Pass:** every later equation can be traced to this one record. **Fail:** any later stage needs an undeclared endpoint, free function, or different regulator to close.

### Step 1 — Independently verify the receiver-gradient identity

Perform three checks:

1. hand differentiation of the finite normalized kernel;
2. symbolic differentiation with the endpoint treated as $R_+(u)$;
3. finite-difference differentiation away from folds and core coincidence.

Use a compact-support regulator and a Gaussian regulator. For numerical checks, set $c_f=1$ and refine $\eta$ and the finite-difference step independently.

Plainly: the same algebra should survive both an exact symbolic check and a separately written numerical check. Refining the regulator and derivative step together would hide which approximation caused an error.

**Pass:** all checks recover $D_{ij}K_{\mathrm{eff}}^{(\eta)}=-\delta_\eta(g)/r^2$ within independently declared error. **Fail:** an endpoint, sign, normalization, or denominator residual remains.

### Step 2 — Derive the complete worldline variation

For one worldline label $a$ and one compact variation $\delta\mathbf X_a(\tau)$, assemble every occurrence of that worldline:

- as a receiver endpoint;
- as a transmitter endpoint;
- in both ordered pair orientations;
- in $r$, $g$, $u$, $R_+$, $\Theta$, and any regulator or core term;
- at retained-history and excluded-coincidence boundaries.

The result must be written as

$$
\delta S
=
\int d\tau\,
\mathbf E_a(\tau)\cdot
\delta\mathbf X_a(\tau)
+
\left[\text{declared endpoint terms}\right].
$$

Plainly: $\mathbf E_a(\tau)$ is the full Euler coefficient for architrino $a$ at time $\tau$. Only after every receiver and transmitter occurrence is collected may it be compared with the Master Equation.

**Pass:** $\mathbf E_a=0$ is exactly the canonical past-history Master Equation on the regular domain, with no future receiver state as input. **Fail:** any future-supported, receiver-velocity-weighted, transverse, duplicate inverse-square, or undeclared endpoint contribution remains.

### Step 3 — Adjudicate causal evolution

Determine whether the full Euler equation can be evaluated from the complete state on a single absolute-time slice without supplying any future receiver trajectory:

$$
\mathcal S_T
\longmapsto
\mathcal S_{T+\Delta T}
$$

Plainly: $\mathcal S_T$ is the complete allowed state at time $T$. A causal evolution rule must produce the next state at $T+\Delta T$ from it without supplying later receiver positions.

Plainly: an action may be symmetric and mathematically elegant yet fail as an initial-value law if today's acceleration requires tomorrow's path. The Master Equation requires a causal update from retained past history.

Test three possibilities separately:

1. direct worldline-only evolution;
2. a fixed-history boundary formulation;
3. localization by an auxiliary causal wake state.

**Pass:** one formulation supplies the next state from present and past data alone and reproduces the receiver identity. **Fail:** all formulations require a future boundary condition or an after-the-fact residual-defined state.

### Step 4 — Prove endpoint support and finite-memory compatibility

For the finite-tail version, prove the exact support of $K_{\mathrm{eff},h_+}^{(\eta)}$ and its derivatives. Show how $h_+$ relates to the retained memory depth $h$ and what occurs when an active root or tail segment exits the window.

For the infinite-tail version, prove convergence of the kernel and all three history charges. State decay assumptions on paths or show that no such assumptions are required.

Plainly: a finite computer or theorem packet keeps only a finite amount of history. Anything leaving that history must appear as boundary flux, not silently disappear. An infinite tail avoids a finite cutoff but must prove its integrals are finite.

**Pass:** endpoint leakage is either exactly zero or an explicit energy, momentum, and angular-momentum boundary flux. **Fail:** the endpoint acts as an interior acceleration source or an uncounted loss.

### Step 5 — Establish symmetry before claiming Noether charges

Apply global transformations to the complete regularized candidate:

1. $T\mapsto T+\varepsilon$;
2. $\mathbf X_i\mapsto\mathbf X_i+\boldsymbol\varepsilon$;
3. $\mathbf X_i\mapsto\mathbf X_i+ \boldsymbol\omega\times\mathbf X_i$ to first order.

Plainly: these are uniform shifts of absolute time, position, and orientation. The action must change only through declared endpoints. The rotation parameter $\boldsymbol\omega$ is a small axial vector, not an imported magnetic right-hand-rule mechanism.

Repeat the proof with finite $\eta$, the actual endpoint, the self-coincidence exclusion, and finite retained memory. Do not prove symmetry for the sharp formal kernel and assume the implementation inherits it.

**Pass:** the only changes are the explicit boundary terms used in the three history increments. **Fail:** the regulator, endpoint, pair ordering, or memory cut breaks a required symmetry in the interior.

### Step 6 — Derive, do not assign, the three charges

From the Step 5 variation, derive energy, momentum, and angular momentum at a time cut. Confirm the signs, pair factor, receiver and transmitter gradients, and origin dependence.

Plainly: the formulas in Section 13 are candidates until this derivation is redone from the frozen full action. They cannot be justified merely because their totals look constant on one run.

Then prove the independence burden: the kernel and its endpoint convention are fixed by the acceleration derivation, while the three conservation rows are tested without fitting any remaining function to them.

**Pass:** one predeclared action independently closes all three rows. **Fail:** a free function, normalization, or wake account is chosen from the measured conservation residual.

### Step 7 — Use independent analytic controls

At minimum, evaluate:

1. a static separated pair as a sign and dimensional control;
2. an affine constant-velocity pair away from folds;
3. a nonsymmetric prescribed path with no symmetry-based cancellation;
4. a simple circular chart only as an off-shell geometry control;
5. a finite-memory boundary-crossing control;
6. an ordinary fold approached from simple-root charts;
7. the exact coincident same-transmitter birth control.

Plainly: symmetric circles can make momentum or torque residuals vanish for accidental reasons. A nonsymmetric path is needed to expose missing vector terms. Prescribed paths test formulas but do not prove that the Master Equation actually realizes those paths.

Each control requires a separate analytic expression or separately authored reference calculation. Agreement between two implementations of the same assumed rule proves only implementation parity.

### Step 8 — Build a scoped numerical instrument

Only after Steps 0–7 close, implement the kernel and charges with:

- $c_f=1$;
- separately refined $\eta$, time step, quadrature step, history depth, and spatial boundary;
- explicit root identities and $D_t$ floors;
- endpoint-clearance residual;
- receiver and transmitter Euler residuals;
- energy, momentum, and angular-momentum residuals;
- surface-resolved boundary flux;
- complete provenance for the frozen candidate.

Plainly: each approximation has its own knob. Changing all knobs together can make a wrong method appear to converge. The output must show which error source is shrinking and which is not.

**Pass:** independent controls converge at their predicted rates and no residual is hidden below an instrument-incapability threshold. **Fail:** the instrument cannot observe a required term, shares its oracle with the implementation, or reports only same-code replay.

### Step 9 — Produce one same-record branch packet

The first branch packet must satisfy the [Reduced Branch-Certificate Targets](../../../content/markdown/aaa/dynamics/causal-action-functional.md#reduced-branch-certificate-targets) and contain:

- retained roots, inactive gaps, and finite memory;
- $D_t$, $D_r$, and $c_f/|D_t|$ on the same boxes;
- full Master EOM residual;
- full action Euler residual;
- endpoint-clearance and boundary records;
- all three tail history charges;
- all three motion accounts;
- all three conservation balances;
- negative controls that correctly fail on missing or mismatched records.

Plainly: this packet binds the geometry, dynamics, action, and conservation claims to one history. No entry may be borrowed from another branch or another regulator state.

The first packet should be nonsymmetric enough that conservation cannot close by mirror cancellation. A prescribed circle may accompany it as a diagnostic but cannot be the promotion object.

### Step 10 — Test a realized retained Master Equation branch

Advance a certified regular initial history with the canonical Master Equation, not with a trajectory prescribed to make the action convenient. Evaluate the frozen tail action and charges along that realized history.

Plainly: an off-shell path is a path chosen for analysis. An on-shell path is a path actually generated by the equation being tested. Exact action status requires agreement on the latter.

**Pass:** the action-derived Euler equation and the canonical Master Equation select the same retained evolution within independently established error, and the three totals close with boundary flux. **Fail:** the action agrees only on prescribed paths or only after branch-wise fitting.

### Step 11 — Cross ordinary folds and retained-window events

Approach an ordinary fold with a positive pre-event $D_t$ floor, use the declared fold handler, and verify the known finite accumulated acceleration. Separately cross a retained-memory boundary and account for every exiting tail segment.

Plainly: the simple-root formula diverges at a fold, but the accumulated acceleration may remain finite. The action and its history charges must cross the same event without silently changing root identity or losing ledger content.

**Pass:** pre-event and post-event records join with finite, regulator-stable increments and explicit boundary changes. **Fail:** continuation depends on the regulator path, omits a root, or invents an event-only correction.

### Step 12 — Confront coincident same-transmitter birth

Test whether the tail action itself supplies the exact weighted-integrability condition required near birth:

$$
\int_0^L
\frac{M(T)}{T^3}\,dT
<
\infty.
$$

Plainly: the bare coincident self contribution behaves like $T^{-3}$. The weighted area of the effective maturity must be finite. A $T^{2+\delta}$ bound is sufficient but not necessary; on the exact linear birth chart, cubic is only the first possible nonzero analytic order. If the tail action does not satisfy the weighted condition, it does not close the full Master Equation transition problem.

**Pass:** one unique, open-neighborhood, regulator-independent continuation is derived from the same candidate. **Fail:** the route remains valid only on the regular domain or needs an unowned event patch.

### Step 13 — Decide whether the tail can derive a causal wake state

Attempt to represent the tail integral through one or more auxiliary variables obeying past-only transport equations. Derive:

- their emission data;
- free propagation;
- reception coupling;
- scalar energy account;
- vector momentum account;
- angular account or proof that orbital position-cross-momentum is sufficient;
- retained-boundary flux;
- elimination back to $K_{\mathrm{eff}}^{(\eta)}$.

Plainly: this is the bridge test between the two closure routes. Success would turn the tail from a formal worldline memory into a concrete present-time causal state whose hidden elimination reproduces the same action.

**Pass:** eliminating the auxiliary state reproduces the frozen kernel and all three charges with no extra free constitutive function. **Fail:** the localization requires future receiver data, residual-defined accounts, or arbitrary maturity and transfer laws.

### Step 14 — Record the promotion decision

The frozen promotion standard required one construction to pass:

1. exact regular-domain Master EOM reproduction;
2. past-only evolution;
3. endpoint and finite-memory closure;
4. time, translation, and rotation symmetry at finite regularization;
5. independently derived energy, momentum, and angular momentum;
6. one nonsymmetric same-record realized-branch certificate;
7. ordinary-fold continuation;
8. finite coincident same-transmitter continuation.

Plainly: local kernel success supplied only item 1's receiver half. Promotion required the full chain.

`CT-FH-1` is not promoted and remains `Awaiting verification`. Its receiver identity and regular cross-pair future term are established, but the complete action and its counterexample require a self-diagonal or core prescription before past-only evolution, endpoint, conservation, realized-branch, fold, or coincident-birth tests can carry acceptance weight.

Plainly: the investigation keeps the calculations that are correct and withholds a final action verdict because the frozen object is not yet finite.

## 17. Investigation matrix

| Question | Current grade | Required evidence | Failure meaning |
| --- | --- | --- | --- |
| Does the pure $1/r$ scalar action universally derive the Master Equation? | derived negative | one regular counterexample residual, plus full-variation confirmation | discard the universal scalar-action claim, not the Master Equation |
| Does the normalized tail have the correct receiver gradient? | derived positive | exact hand differentiation plus the independent cross-pair action check | overturned by any extra derivative term |
| Does the full tail action yield only the canonical Euler equation? | incomplete | freeze a finite self-diagonal or core prescription, then vary the complete functional independently | the present formal cross-sector result cannot verify the whole action |
| Is the evolution past-only? | derived negative on regular cross pairs; incomplete for the whole action | one admissible self-inclusive transverse control | the advertised control is not yet a history in the frozen functional's domain |
| Is the endpoint physical and ledger-complete? | blocked by Step 0 | finite complete action first | endpoint work cannot repair an undefined self integral |
| Are all three charges derived from the unchanged dynamics? | blocked by Step 0 | finite symmetry-preserving complete action | cross-sector formulas are insufficient |
| Do all three balances close independently? | blocked by Step 0 | complete same-record action and boundary accounts | no conservation claim is available |
| Does the tail cross coincident birth? | blocked by Step 0 | distinguish and resolve the ordinary self diagonal first | the earlier divergence prevents this test |
| Can the tail derive the independent wake state? | conditional chain-rule no-go; blocked for `CT-FH-1` | differentiable reduced action | a distinct causal-state construction still needs new constitutive structure |

Plainly: the matrix records an incomplete whole-action adjudication. The receiver identity and cross-pair future dependence are secure, but neither one defines or varies the missing self sector.

## 18. Remaining Master Equation closure objects

MEC-001 first requires one explicit, independently auditable self-diagonal or core convention. Any cutoff, core kernel, subtraction, or exclusion changes the displayed functional unless it can be traced to the frozen candidate, so the repaired record must be named separately and its receiver and transmitter coefficients recomputed.

Plainly: the next MEC-001 calculation is not another replay of the cross-pair formula. It is the missing definition that makes the whole action finite.

MEC-002 remains the independent causal wake-state problem already isolated in [Independent Causal Wake-State Closure](independent-causal-wake-state-closure.md). Its next exact mathematical object is one predeclared reception map

$$
\left(
\Delta\mathbf V_r,
\Delta m_t,
\Delta e_t,
\Delta\boldsymbol\pi_t
\right)
=
\mathcal R_{q_tq_r}
\left(
\mathcal H^T,
\mathcal W_t
\right),
$$

Plainly: $\mathcal R_{q_tq_r}$ is the missing reception rule for transmitter polarity $q_t$ and receiver polarity $q_r$. It must update receiver velocity $\Delta\mathbf V_r$, wake maturity $\Delta m_t$, wake energy $\Delta e_t$, and wake momentum $\Delta\boldsymbol\pi_t$ from the present history $\mathcal H^T$ and present wake state $\mathcal W_t$. It may not inspect a future receiver or be chosen from a measured conservation residual.

That map must be derived together with the conjugate motion functions, emission capacity, a coupling satisfying exact coincident-birth weighted integrability, and retained-boundary flux. The current primitive set selects none of those objects, so the remaining route is fail closed until one construction supplies them together or a broader impossibility theorem closes it.

Plainly: the characteristic tail does not supply the missing rule. The next legitimate advance must explain how a present wake changes and carries all three accounts, not attempt another worldline-only rewriting of the same future-dependent action.

## 19. Nonclaims

This packet does not establish:

- a new Master Equation;
- an accepted action;
- an independently evolving wake substance;
- conserved energy, momentum, or angular momentum;
- primitive architrino mass, charge momentum $q\mathbf v$, or mass momentum $m\mathbf v$;
- a realized circular binary;
- binding, retention, stability, an attractor, or a Noether braid;
- a finite coincident same-transmitter transition;
- promotion of the characteristic tail into reader-facing canon.

Plainly: this file records an incomplete whole-action adjudication, a positive receiver identity, and a negative regular cross-pair result. It deliberately makes no physical branch claim.

## 20. Closure condition

The characteristic-tail investigation remains open until one finite self-inclusive candidate has a declared near-diagonal or core rule, admits the transverse control, and receives an independent complete variation. The regular cross-pair calculation must still reproduce or remove $-\mathbf F_a^{\mathrm{future}}/2$ under that prescription. Only then may MEC-001 receive `CONFIRMED` or `OVERTURNED`.

Plainly: the current work proves what happens between distinct regular endpoints but does not define the whole action it was asked to verify. The unchanged Master Equation, the reader-facing receiver identity, and the separately blocked independent causal wake-state route remain the broader closure context.
