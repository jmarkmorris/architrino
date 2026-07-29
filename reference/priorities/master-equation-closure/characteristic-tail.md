# Characteristic-Tail Action Repair: Explanation and Investigation Program

## Status and authority

- **Purpose:** explain the characteristic-tail action proposal in enough detail
  to support an operator decision and a complete mathematical investigation.
- **Claim level:** `derivation-target`.
- **Current positive result:** the normalized tail kernel satisfies the required
  receiver-gradient identity on the declared regularized chart.
- **Current negative result:** the pure scalar $1/r$ causal action is not a
  universal exact action for the canonical Master Equation.
- **Unresolved:** the full worldline variation, future-reception terms,
  characteristic-endpoint interpretation, finite-memory closure, singular
  transitions, and energy-momentum-angular-momentum closure on one realized
  retained branch.
- **Promotion classification:** `priority-only`.
- **Ontology effect:** none. This packet does not add an independent wake
  substance or change the Master Equation.

Plainly: one calculation has succeeded and one candidate has failed. The simple
$1/r$ action produces an extra term that the Master Equation does not contain.
The characteristic-tail kernel removes that extra term in the receiver part of
the calculation. We have not yet shown that the whole action is causal, that all
of its boundary terms are legitimate, or that it conserves the three required
accounts on an actual solution.

The owning corpus discussions are [Exact Nonlocal
Lagrangian](../../../content/markdown/aaa/dynamics/master-equation.md#exact-nonlocal-lagrangian),
[Energy, Symmetry, and
Conservation](../../../content/markdown/aaa/dynamics/master-equation.md#energy-symmetry-and-conservation),
and the [Causal Action
Functional](../../../content/markdown/aaa/dynamics/causal-action-functional.md).
The competing or potentially complementary causal-state route is
[Independent Causal Wake-State
Closure](independent-causal-wake-state-closure.md), with its current obstruction
proved in [Independent Causal Wake-State Minimum and
Obstruction](analysis-independent-causal-wake-state.md).

Plainly: the Master Equation chapter owns the equations summarized here. This
file is the focused research packet: it explains what they mean, separates proof
from proposal, and lists the work required before any promotion.

## 1. Finding in plain language

The desired Master Equation gives the receiver an acceleration contribution
along the line from the transmitter's emission point to the receiver. Its
magnitude contains an inverse-square separation and a transmitter-side
causal-root compression factor. A natural first attempt was to derive that law
from a two-time scalar action with a $1/r$ kernel supported on the causal wake
surface.

That first attempt gets the desired inverse-square piece, but varying the causal
constraint produces an additional derivative-of-constraint piece. The added
piece is generally an interior Euler term: it changes the equation of motion.
It cannot be discarded as bookkeeping, and the transmitter's role elsewhere in
the double integral does not generically cancel it.

Plainly: changing the receiver position changes two things at once. It changes
the separation $r$, which correctly produces the $1/r^2$ behavior. It also
changes whether the transmitter and receiver lie on the same causal wake
surface. That second change produces the unwanted term.

The simple action is therefore correctly falsified only in this precise sense:
it is not, by itself, a universal exact action for the Master Equation. The
calculation does **not** falsify the Master Equation, delayed path-history
dynamics, or the possibility of another action.

A local patch on the same wake surface cannot remove only the unwanted term.
Under the stated restricted assumptions, any such patch also changes the wanted
inverse-square term. The least invasive known action-level candidate is instead
a kernel spread along a characteristic direction behind the primary causal
surface. This is the **characteristic tail**.

Plainly: a correction painted only on the same thin wake surface cannot repair
the action without damaging the part that was already right. The candidate
repair distributes the action contribution through a controlled portion of
causal history behind that surface.

The characteristic-tail kernel passes an important local test:

$$
D_{ij}K_{\mathrm{eff}}^{(\eta)}(r,g)
=
-\frac{\delta_\eta(g)}{r^2}.
$$

Plainly: $K_{\mathrm{eff}}^{(\eta)}$ is the proposed regularized effective
kernel, $r$ is the transmitter-to-receiver separation, $g$ measures departure
from exact causal arrival, $\delta_\eta$ is a narrow regularized delta
distribution of width $\eta$, and $D_{ij}$ is the receiver's radial variation
operator defined below. The equation says that varying the new kernel produces
exactly the desired inverse-square causal-surface term and no
derivative-of-delta term in this receiver calculation.

That identity is why the proposal is mathematically credible. It is not why the
proposal is already accepted. A complete action must also pass the
transmitter-role variation, causal-update, endpoint, symmetry, conservation,
singular-transition, and realized-branch tests listed later in this packet.

## 2. The target that an action must reproduce

For receiver $i$ at absolute time $T_r$ and transmitter $j$ at emission time
$T_t$, define

$$
\mathbf r_{ij}(T_r;T_t)
=
\mathbf X_i(T_r)-\mathbf X_j(T_t),
\qquad
r_{ij}=\|\mathbf r_{ij}\|,
\qquad
\hat{\mathbf r}_{ij}=\frac{\mathbf r_{ij}}{r_{ij}}.
$$

Plainly: $\mathbf X_i$ and $\mathbf X_j$ are the two architrino positions.
The vector $\mathbf r_{ij}$ points from the transmitter's past emission point
to the receiver's current point. Its length is $r_{ij}$, and
$\hat{\mathbf r}_{ij}$ keeps only the direction.

The time-valued causal constraint is

$$
g_{ij}(T_r,T_t)
=
T_r-T_t-\frac{r_{ij}(T_r;T_t)}{c_f}.
$$

Plainly: $c_f$ is the primitive wake speed. The equation $g_{ij}=0$ says that
the elapsed absolute time $T_r-T_t$ exactly equals the travel time
$r_{ij}/c_f$. A causal root is an emission time $T_t$ that satisfies this
equation. The root is selected by $g=0$, not by the fold condition introduced
next.

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

Plainly: $\mathbf V_j$ is the transmitter velocity at emission. $D_{t,ij}$
measures how quickly the causal constraint changes as the emission time is
moved. A simple root requires $D_{t,ij}\ne0$. The separate condition
$D_{t,ij}=0$ is a fold, where two simple roots can merge or disappear and the
ordinary root formula is not valid.

On a certified simple-root chart, the canonical per-root acceleration target is

$$
\mathbf A_{ij}(T_r;T_t)
=
\kappa\,\sigma_{ij}|q_iq_j|
\frac{c_f}{r_{ij}^2|D_{t,ij}|}
\hat{\mathbf r}_{ij}.
$$

Plainly: $\kappa$ is the universal coupling constant, $q_i$ and $q_j$ are the
architrino polarities, and $\sigma_{ij}=\operatorname{sign}(q_iq_j)$ chooses
outward or inward acceleration. The factor $1/r_{ij}^2$ weakens the
contribution with separation. The factor $c_f/|D_{t,ij}|$ accounts for how
emission times are compressed or stretched when pulled back to causal roots.
This is an acceleration-first substrate law; no primitive architrino mass or
$\mathbf F=m\mathbf a$ premise is being introduced.

Any proposed action must reproduce the sum of these contributions on the same
retained causal roots, with the same finite-history boundary, positive
$D_t$ floor, excluded self-coincidence convention, and regulator limit. The
receiver-side playback ratio $D_r/D_t$ may remain in root continuation records,
but it is not an acceleration multiplier.

## 3. Why introduce an action at all?

The Master Equation is already stated as an acceleration law. An action is not
needed merely to rewrite that law. It is useful only if one symmetry-preserving
object can do three jobs without contradiction:

1. reproduce the canonical acceleration on every admitted branch;
2. determine the history terms associated with time translation, spatial
   translation, and rotation;
3. supply energy, momentum, and angular-momentum balances from that same object.

Plainly: the point of the action is unification. We do not want one rule chosen
to give acceleration and separate ledgers invented later to make conservation
look right. A successful action would make the motion rule and the conservation
accounts different consequences of the same mathematics.

The optional universal constant $\mu_{\mathrm{arch}}$ may be used to convert
the acceleration-first equation into action and motion-account units. It is not
primitive mass. A quadratic bookkeeping chart may write

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

Plainly: $K_\mu$, $\mathbf P_\mu$, and $\mathbf J_\mu$ are candidate motion
accounts in one quadratic proxy chart. They resemble familiar higher-level
formulas, but here $\mu_{\mathrm{arch}}$ is only a universal conversion
constant. A successful general action may instead derive different conjugate
motion functions. No single-architrino physical mass is assumed.

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

Plainly: the first term is the quadratic motion-account part of the scaffold.
The second subtracts the sum of pair interactions $S_{ij}$. The factor
$1/2$ prevents duplicate pair counting under the declared ordered-pair
convention.

$$
S_{ij}
=
\mu_{\mathrm{arch}}\kappa\,\sigma_{ij}|q_iq_j|
\int dT\,dT'\,
\Theta(T-T')
\frac{\delta_\eta(g_{ij}(T,T'))}{r_{ij}(T,T')}.
$$

Plainly: $S$ is the candidate action over whole worldline histories.
$\Theta(T-T')$ keeps only emission times $T'$ no later than reception times
$T$. The regularized delta $\delta_\eta(g)$ concentrates the interaction near
the causal surface $g=0$. The factor $1/2$ prevents counting an ordered pair
twice when the full pair sum has the corresponding symmetry. The interaction
kernel is the simple scalar $\delta_\eta(g)/r$.

At a simple root, delta collapse gives

$$
\delta(g_{ij}(T_r,T'))
=
\sum_{T_t\in\mathcal C_{ij}(T_r)}
\frac{c_f\,\delta(T'-T_t)}
{|D_{t,ij}(T_r;T_t)|}.
$$

Plainly: $\mathcal C_{ij}(T_r)$ is the set of causal emission times that reach
receiver $i$ at $T_r$. The ordinary delta-change-of-variable rule contributes
the factor $c_f/|D_t|$. This confirms that the action has the correct
transmitter-side root compression in its branch-resolved value. It does not yet
show that varying the action gives the correct acceleration.

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

Plainly: only the component of the receiver displacement
$\delta\mathbf X_i$ along the separation direction changes $r$ to first order.
Because $g$ contains $-r/c_f$, the same displacement also shifts the causal
constraint.

For the direct kernel

$$
K_0^{(\eta)}(r,g)
=
\frac{\delta_\eta(g)}{r},
$$

Plainly: $K_0^{(\eta)}$ is the naïve regularized pair kernel. It combines a
$1/r$ separation scale with a narrow causal-surface selector
$\delta_\eta(g)$.

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

Plainly: the first term is wanted. After the overall action sign is included,
it supplies the inverse-square line-of-action contribution. The second term
contains $\delta_\eta'(g)$, the derivative of the narrow causal-surface peak.
The Master Equation has no corresponding acceleration term, so the second term
must cancel or become a legitimate fixed-boundary contribution.

It is useful to name the radial receiver-variation operator

$$
D_{ij}
\equiv
\partial_r-\frac{1}{c_f}\partial_g.
$$

Plainly: this $D_{ij}$ is a differential operator acting on a kernel expressed
in the variables $(r,g)$. It is not the transmitter root denominator
$D_{t,ij}$. The similar letter records existing corpus notation, so every
calculation must keep the two roles explicit.

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

Plainly: $J_{ij}$ is the dimensionless transmitter-side Jacobian. This identity
turns a derivative with respect to causal mismatch $g$ into a derivative with
respect to emission time $T'$. It is valid only away from a fold, where
$J_{ij}$ is nonzero.

Integration by parts then separates the unwanted piece into an endpoint term
and an interior root-chart derivative:

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

Plainly: $\mathcal B_{ij}^{(\eta)}$ collects contributions at declared
integration endpoints or excluded coincidence boundaries. The remaining
integral is inside the varied history interval. It generally does not vanish.
Calling the first part a boundary term does not make the second part disappear.

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

Plainly: after the narrow delta selects a causal emission time $T_t$, the
residual measures how the direction, distance, and root Jacobian change as that
emission time is moved. There is no general reason for this derivative to be
zero on an arbitrary path-history branch.

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

Plainly: this condition says that the direction-and-scale factor selected at
the causal root changes when the emission time is moved. It is the
operator-checkable signature of a nonzero interior residual.

Then the scalar $1/r$ action leaves a nonzero interior receiver residual on that
branch.

Plainly: one ordinary counterexample branch is enough to defeat the universal
claim that the pure scalar action always yields the Master Equation. The result
does not say the Master Equation is wrong. It says this proposed derivation is
incomplete.

**Claim grade: derived under the displayed action, branch regularity, and
variation conventions.** The claim is falsified if a correct full variation
shows that the displayed interior coefficient cancels identically for arbitrary
compact receiver variations without changing the canonical acceleration.

Plainly: this is a mathematical result about a particular candidate action, not
an experimental result about nature.

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

Plainly: moving the transmitter's past emission point changes the same
separation and causal constraint with the opposite signs.

The corresponding variation is a coefficient of
$\delta\mathbf X_j(T')$, whereas the receiver variation is a coefficient of
$\delta\mathbf X_i(T)$. For compact variations inside the history window,
these are independent variations. A term multiplying one cannot simply be
declared to cancel a term multiplying the other.

Plainly: the two terms belong to different coordinates at different times.
They may participate together in a global symmetry balance, but that is not the
same as cancelling an unwanted local equation-of-motion term.

There is a deeper causal question. When a worldline point is varied in its role
as a transmitter, the double integral includes later receivers whose causal
wakes intersect that point's emission. The full Euler equation can therefore
contain future-supported coefficients unless the action's endpoint convention,
auxiliary state, or special structure removes them.

**Claim grade: unresolved for the characteristic-tail action.** The current
receiver-gradient identity does not adjudicate the full transmitter-role
variation. A complete derivation must display every coefficient of one
worldline variation after both roles are assembled.

Plainly: a receiver-only calculation cannot prove that the full action gives a
causal initial-value law. This is one of the two largest remaining risks, the
other being the endpoint and conservation ledger.

## 7. Why a local same-surface correction fails

Consider a local scalar correction on the same causal support,

$$
K_{\mathrm{ct}}^{(\eta)}(r,g)
=
a(r,J)\delta_\eta(g).
$$

Plainly: $a(r,J)$ is an unknown scalar coefficient allowed to depend on
separation $r$ and the dimensionless root Jacobian $J$. The correction remains
concentrated on the same thin surface $g=0$.

Its radial receiver variation contains

$$
D_{ij}K_{\mathrm{ct}}^{(\eta)}
\supset
\partial_r a\,\delta_\eta(g)
-
\frac{a}{c_f}\delta_\eta'(g).
$$

Plainly: choosing $a$ can adjust the unwanted derivative-of-delta term, but the
same choice also has an ordinary delta contribution through $\partial_r a$.

Cancelling the original $-\delta_\eta'(g)/(c_fr)$ coefficient requires

$$
a(r,J)=-\frac{1}{r}.
$$

Plainly: the correction must be the negative of the original scalar scale
factor if it is to cancel the unwanted derivative term for every admitted
receiver displacement.

But then

$$
\partial_r a\,\delta_\eta(g)
=
\frac{\delta_\eta(g)}{r^2},
$$

Plainly: differentiating the required coefficient $a=-1/r$ generates a new
positive inverse-square causal-surface term.

This changes the desired inverse-square coefficient.

Plainly: the patch erases the bad term only by also changing the good term.
Adding another same-surface scalar patch repeats the same tradeoff.

The obstruction extends to a finite delta-derivative expansion,

$$
K_{\mathrm{ct}}^{(\eta)}(r,g)
=
\sum_{n=0}^{N}a_n(r)\delta_\eta^{(n)}(g).
$$

Plainly: this is the most general finite stack of a delta peak and its first
$N$ derivatives with radial coefficients $a_n(r)$. It tests whether a more
elaborate but still local surface patch can succeed.

The highest derivative produced by $D_{ij}$ is
$-a_N\delta_\eta^{(N+1)}/c_f$, so matching a target containing no such term
forces $a_N=0$. Repeating the argument down through the derivative orders forces
all $a_n=0$ for $n\ge1$. The remaining $a_0=-1/r$ case is the failed scalar
patch above.

Plainly: the proof works from the highest derivative downward. Each extra
delta-derivative would create an even higher derivative that has nothing to
cancel it, so its coefficient must vanish. The finite local family reduces to
the already failed one-term correction.

**Claim grade: derived no-go under restricted assumptions.** It rules out
finite same-support scalar or delta-jet corrections built only from the stated
variables. It does not rule out a characteristic tail, a velocity-dependent
invariant, a richer history functional, or an independently evolving causal
wake state.

## 8. Deriving the characteristic-tail equation

The correction should cancel only the unwanted term:

$$
D_{ij}K_{\mathrm{ct}}^{(\eta)}(r,g)
=
\frac{\delta_\eta'(g)}{c_fr}.
$$

Plainly: the right side is exactly the opposite of the bad term produced by the
direct $1/r$ kernel. Solving this first-order partial differential equation is
the repair problem.

The characteristic invariant is

$$
u
=
g+\frac{r}{c_f},
\qquad
D_{ij}u=0.
$$

Plainly: a characteristic is a path in the $(r,g)$ plane along which the
differential operator $D_{ij}$ moves. The combination $u$ stays constant along
that path. Because $g=T-T'-r/c_f$, the invariant is also simply
$u=T-T'$, the absolute delay age. This gives the tail a direct path-history
meaning.

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

Plainly: $\rho$ is a dummy separation variable along one characteristic,
$r_\ast$ is a chosen endpoint, and $H_{\mathrm{ct}}^{(\eta)}(u)$ is the
undetermined homogeneous part. The differential equation determines how the
kernel changes along a characteristic, but an endpoint condition is still
needed to choose one unique kernel.

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

Plainly: instead of integrating inward to a smaller separation, this form
integrates outward from the current separation $r$ to $R_+$. In the sharp
limit it places support in the delayed interior behind the arriving surface,
rather than ahead of it.

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

Plainly: the first term is the desired cancellation. The second is leakage
from moving the chosen endpoint under receiver variation. Unless that leakage
vanishes, the repair adds a new interior acceleration contribution on a second
tail surface.

The clean condition is

$$
D_{ij}R_+=0.
$$

Plainly: the endpoint must itself follow a characteristic, so the receiver
variation does not move it across the tail. This converts the endpoint
contribution into a genuine history-boundary question rather than a hidden
change to the local acceleration law.

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

Plainly: $W$ is the tested absolute-time window. If the endpoint is not exactly
characteristic, its extra contribution must at least vanish in the same
regulator limit used for the action. Merely calling it a boundary term is not a
proof.

The current clean candidate chooses

$$
R_+(u)
=
c_f(u+h_+),
\qquad
h_+>0.
$$

Plainly: $h_+$ is an added positive tail-depth parameter in time units. Since
$R_+$ depends only on the characteristic invariant $u$, it automatically
satisfies $D_{ij}R_+=0$. At exact arrival, $u=r/c_f$, so
$R_+=r+c_fh_+$: the outgoing endpoint lies a controlled distance beyond the
arrival separation.

This choice is mathematically convenient, but its physical status is not yet
settled. The investigation must decide whether $h_+$ is fixed by an already
declared retained-history depth, removed in an $R_+\to\infty$ limit, derived
from a core or boundary convention, or an inadmissible new free scale.

## 10. Endpoint clearance and normalization

After changing variables to

$$
s
=
u-\frac{\rho}{c_f},
$$

Plainly: $s$ re-expresses the running separation $\rho$ as a causal-mismatch
coordinate along a characteristic of fixed delay age $u$.

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

Plainly: $s$ is the causal-mismatch coordinate sampled along the tail. The
lower value $-h_+$ is the outgoing endpoint, and the upper value $g$ is the
current event's mismatch.

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

Plainly: the first term on the left is the original simple kernel. The right
side contains an arbitrary characteristic-only term $H_+$, a finite-endpoint
remainder, and the desired normalized tail integral. The endpoint remainder
must be removed before the kernel has a unique conservation ledger.

Define the endpoint-clearance term

$$
\mathcal B_+^{(\eta)}(u,h_+)
\equiv
\frac{\delta_\eta(-h_+)}
{c_f(u+h_+)}.
$$

Plainly: if the regularized delta has compact support and $h_+$ lies outside
that support, this term is exactly zero. For a Gaussian-like regulator with
nonzero tails everywhere, it must be proved to approach zero in the declared
limit.

If clearance is not exact at finite $\eta$, normalization requires

$$
H_+^{(\eta)}(u)
=
-\mathcal B_+^{(\eta)}(u,h_+).
$$

Plainly: the homogeneous freedom is fixed to cancel the endpoint remainder.
Although $H_+(u)$ does not affect the local receiver-gradient identity, it does
affect the history charges. Leaving it arbitrary would make energy, momentum,
or angular momentum depend on an unfixed gauge-like choice.

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

Plainly: this is the current characteristic-tail candidate. It accumulates
regularized causal support from the outgoing endpoint up to the current
mismatch. Its denominator is the squared separation associated with each point
along the characteristic.

The infinite-endpoint version is

$$
K_{\mathrm{eff}}^{(\eta)}(r,g)
=
\int_{-\infty}^{g}
\frac{\delta_\eta(s)}
{c_f(u-s)^2}
ds.
$$

Plainly: this removes the finite depth $h_+$ but introduces a convergence and
infinite-history burden. The finite and infinite versions are not
interchangeable until their limits and boundary charges are proved to agree on
the same branch.

## 11. The closed local identity

Holding $u$ fixed along $D_{ij}$ and differentiating the normalized kernel gives

$$
D_{ij}K_{\mathrm{eff}}^{(\eta)}(r,g)
=
-\frac{\delta_\eta(g)}{r^2}.
$$

Plainly: the upper integration limit contributes the regularized delta at the
current mismatch $g$. Along $D_{ij}$, the invariant $u$ stays fixed while the
upper limit changes by $D_{ij}g=-1/c_f$. At that upper limit,
$c_f(u-g)^2=c_f(r/c_f)^2=r^2/c_f$. Multiplying the upper-limit integrand by
$-1/c_f$ therefore gives $-1/r^2$. No derivative of the delta remains.

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

Plainly: the receiver gradient points along the emission-to-reception line and
has exactly the inverse-square causal-surface form. After the interaction sign
and coupling in the action are applied and the delta is collapsed over emission
time, this is the correct local receiver-side building block for the canonical
$c_f/|D_t|$ acceleration weight.

**Claim grade: derived for the receiver-gradient identity under endpoint-clear
normalization.** The identity is falsified by a direct symbolic or independent
numerical differentiation that yields any additional interior term on the
declared domain.

Plainly: this is the strongest positive result currently owned by the proposal.
It is exact mathematics for this kernel. Its scope is one part of the full
variation.

## 12. What “credible repair candidate” means

The candidate is credible because it meets four mathematical conditions that
the local patches could not meet:

1. it cancels the derivative-of-constraint residual;
2. it leaves one inverse-square causal-surface receiver term;
3. it can use a characteristic endpoint with no receiver-gradient leakage;
4. it depends only on scalar path-history quantities and declared scalar
   endpoints, preserving time-translation, spatial-translation, and rotational
   form at the kernel level.

Plainly: the proposal repairs the exact local defect that killed the simple
action, and it does so without obviously breaking the three symmetries needed
for conservation arguments.

“Credible” does **not** mean:

- the full Euler equation has been derived;
- future-supported transmitter-role terms have been removed;
- the tail has been shown to be an allowed Architrino causal history rather
  than a new ontological ingredient;
- energy, momentum, and angular momentum have closed on a realized branch;
- the coincident same-transmitter singularity has been crossed;
- any circular chart has become a periodic solution, binder, or stable
  assembly.

Plainly: the candidate has earned investigation, not acceptance.

## 13. Candidate history charges

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

Plainly: $\mathcal K_{ij,\mathrm{eff}}^{(\eta)}$ is the normalized scalar tail
including the universal coupling, polarity sign, pair magnitude, and
past-causal ordering. $T_1$ is a receiver time and $T_t$ is an emission time.

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

Plainly: this domain contains interactions emitted before the cut
$T_\ast$ whose receiver endpoint lies after the cut. They are the
path-history interactions still “in flight” across that time boundary.

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

Plainly: this quantity measures how the interaction kernel changes when the
receiver-time end of every crossing pair is shifted. It is a history
functional, not an equal-time pile of particle energies.

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

Plainly: this is the spatial-translation boundary term. It records the vector
motion account carried by crossing path-history interactions. It is not
primitive charge momentum such as $q\mathbf v$, and it is not imported
$m\mathbf v$.

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

Plainly: this is position crossed with the translation-boundary contribution,
integrated over the interactions crossing the time cut. It is the orbital
angular account of the history kernel about the chosen origin. No intrinsic
single-architrino spin or mass-based angular momentum is being assumed.

These formulas are definitions of candidate Noether boundary increments for
the normalized tail. They become conserved charges only if the full action
variation is correct, the declared symmetries survive the regulator and
endpoints, and all Euler and boundary residuals vanish on the same retained
solution.

## 14. The required same-record conservation test

Let $\mathfrak B$ be one retained branch chart, and let
$X_{ij}^{\mathfrak B}(T_\ast)$ restrict the crossing domain to the active root
records of that chart. In the quadratic bookkeeping chart, the three tests have
the form

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

Plainly: the first balance is the energy row. The change in the combined
quadratic motion account and tail-history energy equals the accumulated
velocity-weighted Euler residual plus declared energy leakage through the
boundaries.

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

Plainly: the second balance is the momentum row. The change in combined motion
and tail-history momentum equals the integrated vector Euler residual plus
declared momentum leakage.

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

Plainly: $W=[T_a,T_b]$ is one tested time window.
$\Delta_W$ means final value minus initial value.
$\mathbf R_i^{(\eta)}$ is the full Euler residual—the difference between the
action-derived equation and the canonical Master Equation.
$\mathcal B_E$, $\boldsymbol{\mathcal B}_P$, and
$\boldsymbol{\mathcal B}_J$ are declared leakage through finite history,
spatial boundaries, period cuts, omitted roots, or tail endpoints. Each total
can be constant only when its matching Euler and boundary residuals vanish in
the same regulator limit.

The same-record rule is strict:

- the acceleration residual and all three history charges use the same worldline
  history;
- they use the same retained roots and inactive-root gaps;
- they use the same $D_t$ floor;
- they use the same $\eta$, core convention, $h_+$ or infinite-tail
  convention, and time window;
- they use the same exclusion of trivial self-coincidence;
- no motion or wake account is fitted afterward to cancel the measured
  residual.

Plainly: conservation cannot be assembled from the best energy run, a different
momentum run, and a third angular-momentum run. One state record must pay every
account at once.

For a finite spatial region, the energy boundary term must agree with the
surface-resolved flux in [Wake
Escapement](../../../content/markdown/aaa/dynamics/energy.md#wake-escapement).
An isochron-level escape label is only an earliest-crossing diagnostic; partial
interception and partial escape require a surface or solid-angle-resolved flux.

Plainly: an expanding wake surface can partly cross a boundary while another
part remains inside. The conservation calculation must count the actual
crossing portions rather than marking the entire surface as simply “escaped”
or “not escaped.”

## 15. Relation to the independent causal wake-state route

The two routes answer different questions.

### Route A: characteristic-tail worldline action

The tail is computed from worldline history and an endpoint convention. If it
remains fully determined by past path histories, it need not introduce freely
specifiable wake variables. Its attraction is that the same kernel may generate
both the receiver acceleration and the symmetry boundary charges.

Plainly: Route A tries to keep the ontology small. The wake history is encoded
in a nonlocal functional of the architrino paths.

Its central risk is that a two-time worldline action normally varies each
worldline point in both receiver and transmitter roles. The transmitter role
can refer to later receivers, so an action that looks past-causal in its
integrand may still fail to define a past-only evolution law.

### Route B: independently evolving causal wake state

The independent-state route appends a present-time surface-resolved wake state
with propagation, reception, energy, momentum, and boundary updates. Its
regular kinematic substate has been derived, but the present primitives do not
select the maturity law, motion-account functions, emission capacity, or
reception transfer.

Plainly: Route B makes the wake an explicit part of the state advanced from one
absolute-time slice to the next. That makes causal updating transparent, but it
creates constitutive questions: what exactly is stored, how reception changes
it, and how its accounts are bounded.

### Possible bridge, not an accepted result

A high-value possibility is to **localize the characteristic tail**: introduce
an auxiliary causal wake variable whose present-time solution, after being
eliminated, reproduces $K_{\mathrm{eff}}^{(\eta)}$. This would be valuable only
if the auxiliary update and its accounts are derived from the tail action
rather than guessed from the residuals.

Plainly: the nonlocal integral may be the result of hiding a simpler
present-time transport state. If that state can be reconstructed uniquely, the
action route could tell the independent-wake route what its missing
constitutive quantities must be.

**Claim grade: inferred research opportunity.** It fails if no past-only
auxiliary transport system can reproduce the tail kernel and its three boundary
increments without extra free functions or future receiver data.

The two routes must not be silently merged. The investigation must conclude
one of the following:

1. the tail action is independently sufficient;
2. the tail action can be localized and thereby derives the required causal
   wake state;
3. the independent wake state is necessary but not derived by the tail;
4. both routes fail under the current primitives.

## 16. Complete investigation program

The steps below are ordered so that cheap mathematical failures occur before
expensive branch simulation. Each step must preserve the acceleration-first
substrate language and use $c_f=1$ in every numerical instantiation.

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

Plainly: a proof is meaningless if the kernel, regulator, or endpoint rules
change between calculations. This record fixes the object being tested.

**Pass:** every later equation can be traced to this one record.
**Fail:** any later stage needs an undeclared endpoint, free function, or
different regulator to close.

### Step 1 — Independently verify the receiver-gradient identity

Perform three checks:

1. hand differentiation of the finite normalized kernel;
2. symbolic differentiation with the endpoint treated as $R_+(u)$;
3. finite-difference differentiation away from folds and core coincidence.

Use a compact-support regulator and a Gaussian regulator. For numerical checks,
set $c_f=1$ and refine $\eta$ and the finite-difference step independently.

Plainly: the same algebra should survive both an exact symbolic check and a
separately written numerical check. Refining the regulator and derivative step
together would hide which approximation caused an error.

**Pass:** all checks recover
$D_{ij}K_{\mathrm{eff}}^{(\eta)}=-\delta_\eta(g)/r^2$ within independently
declared error.
**Fail:** an endpoint, sign, normalization, or denominator residual remains.

### Step 2 — Derive the complete worldline variation

For one worldline label $a$ and one compact variation
$\delta\mathbf X_a(\tau)$, assemble every occurrence of that worldline:

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

Plainly: $\mathbf E_a(\tau)$ is the full Euler coefficient for architrino $a$
at time $\tau$. Only after every receiver and transmitter occurrence is
collected may it be compared with the Master Equation.

**Pass:** $\mathbf E_a=0$ is exactly the canonical past-history Master Equation
on the regular domain, with no future receiver state as input.
**Fail:** any future-supported, receiver-velocity-weighted, transverse,
duplicate inverse-square, or undeclared endpoint contribution remains.

### Step 3 — Adjudicate causal evolution

Determine whether the full Euler equation can be evaluated from the complete
state on a single absolute-time slice without supplying any future receiver
trajectory:

$$
\mathcal S_T
\longmapsto
\mathcal S_{T+\Delta T}
$$

Plainly: $\mathcal S_T$ is the complete allowed state at time $T$. A causal
evolution rule must produce the next state at $T+\Delta T$ from it without
supplying later receiver positions.

Plainly: an action may be symmetric and mathematically elegant yet fail as an
initial-value law if today's acceleration requires tomorrow's path. The Master
Equation requires a causal update from retained past history.

Test three possibilities separately:

1. direct worldline-only evolution;
2. a fixed-history boundary formulation;
3. localization by an auxiliary causal wake state.

**Pass:** one formulation supplies the next state from present and past data
alone and reproduces the receiver identity.
**Fail:** all formulations require a future boundary condition or an
after-the-fact residual-defined state.

### Step 4 — Prove endpoint support and finite-memory compatibility

For the finite-tail version, prove the exact support of
$K_{\mathrm{eff},h_+}^{(\eta)}$ and its derivatives. Show how $h_+$ relates to
the retained memory depth $h$ and what occurs when an active root or tail
segment exits the window.

For the infinite-tail version, prove convergence of the kernel and all three
history charges. State decay assumptions on paths or show that no such
assumptions are required.

Plainly: a finite computer or theorem packet keeps only a finite amount of
history. Anything leaving that history must appear as boundary flux, not
silently disappear. An infinite tail avoids a finite cutoff but must prove its
integrals are finite.

**Pass:** endpoint leakage is either exactly zero or an explicit energy,
momentum, and angular-momentum boundary flux.
**Fail:** the endpoint acts as an interior acceleration source or an uncounted
loss.

### Step 5 — Establish symmetry before claiming Noether charges

Apply global transformations to the complete regularized candidate:

1. $T\mapsto T+\varepsilon$;
2. $\mathbf X_i\mapsto\mathbf X_i+\boldsymbol\varepsilon$;
3. $\mathbf X_i\mapsto\mathbf X_i+
   \boldsymbol\omega\times\mathbf X_i$ to first order.

Plainly: these are uniform shifts of absolute time, position, and orientation.
The action must change only through declared endpoints. The rotation parameter
$\boldsymbol\omega$ is a small axial vector, not an imported magnetic
right-hand-rule mechanism.

Repeat the proof with finite $\eta$, the actual endpoint, the self-coincidence
exclusion, and finite retained memory. Do not prove symmetry for the sharp
formal kernel and assume the implementation inherits it.

**Pass:** the only changes are the explicit boundary terms used in the three
history increments.
**Fail:** the regulator, endpoint, pair ordering, or memory cut breaks a
required symmetry in the interior.

### Step 6 — Derive, do not assign, the three charges

From the Step 5 variation, derive energy, momentum, and angular momentum at a
time cut. Confirm the signs, pair factor, receiver and transmitter gradients,
and origin dependence.

Plainly: the formulas in Section 13 are candidates until this derivation is
redone from the frozen full action. They cannot be justified merely because
their totals look constant on one run.

Then prove the independence burden: the kernel and its endpoint convention are
fixed by the acceleration derivation, while the three conservation rows are
tested without fitting any remaining function to them.

**Pass:** one predeclared action independently closes all three rows.
**Fail:** a free function, normalization, or wake account is chosen from the
measured conservation residual.

### Step 7 — Use independent analytic controls

At minimum, evaluate:

1. a static separated pair as a sign and dimensional control;
2. an affine constant-velocity pair away from folds;
3. a nonsymmetric prescribed path with no symmetry-based cancellation;
4. a simple circular chart only as an off-shell geometry control;
5. a finite-memory boundary-crossing control;
6. an ordinary fold approached from simple-root charts;
7. the exact coincident same-transmitter birth control.

Plainly: symmetric circles can make momentum or torque residuals vanish for
accidental reasons. A nonsymmetric path is needed to expose missing vector
terms. Prescribed paths test formulas but do not prove that the Master Equation
actually realizes those paths.

Each control requires a separate analytic expression or separately authored
reference calculation. Agreement between two implementations of the same
assumed rule proves only implementation parity.

### Step 8 — Build a scoped numerical instrument

Only after Steps 0–7 close, implement the kernel and charges with:

- $c_f=1$;
- separately refined $\eta$, time step, quadrature step, history depth, and
  spatial boundary;
- explicit root identities and $D_t$ floors;
- endpoint-clearance residual;
- receiver and transmitter Euler residuals;
- energy, momentum, and angular-momentum residuals;
- surface-resolved boundary flux;
- complete provenance for the frozen candidate.

Plainly: each approximation has its own knob. Changing all knobs together can
make a wrong method appear to converge. The output must show which error source
is shrinking and which is not.

**Pass:** independent controls converge at their predicted rates and no residual
is hidden below an instrument-incapability threshold.
**Fail:** the instrument cannot observe a required term, shares its oracle with
the implementation, or reports only same-code replay.

### Step 9 — Produce one same-record branch packet

The first branch packet must satisfy the [Reduced Branch-Certificate
Targets](../../../content/markdown/aaa/dynamics/causal-action-functional.md#reduced-branch-certificate-targets)
and contain:

- retained roots, inactive gaps, and finite memory;
- $D_t$, $D_r$, and $c_f/|D_t|$ on the same boxes;
- full Master EOM residual;
- full action Euler residual;
- endpoint-clearance and boundary records;
- all three tail history charges;
- all three motion accounts;
- all three conservation balances;
- negative controls that correctly fail on missing or mismatched records.

Plainly: this packet binds the geometry, dynamics, action, and conservation
claims to one history. No entry may be borrowed from another branch or another
regulator state.

The first packet should be nonsymmetric enough that conservation cannot close
by mirror cancellation. A prescribed circle may accompany it as a diagnostic
but cannot be the promotion object.

### Step 10 — Test a realized retained Master Equation branch

Advance a certified regular initial history with the canonical Master Equation,
not with a trajectory prescribed to make the action convenient. Evaluate the
frozen tail action and charges along that realized history.

Plainly: an off-shell path is a path chosen for analysis. An on-shell path is a
path actually generated by the equation being tested. Exact action status
requires agreement on the latter.

**Pass:** the action-derived Euler equation and the canonical Master Equation
select the same retained evolution within independently established error, and
the three totals close with boundary flux.
**Fail:** the action agrees only on prescribed paths or only after branch-wise
fitting.

### Step 11 — Cross ordinary folds and retained-window events

Approach an ordinary fold with a positive pre-event $D_t$ floor, use the
declared fold handler, and verify the known finite accumulated acceleration.
Separately cross a retained-memory boundary and account for every exiting tail
segment.

Plainly: the simple-root formula diverges at a fold, but the accumulated
acceleration may remain finite. The action and its history charges must cross
the same event without silently changing root identity or losing ledger
content.

**Pass:** pre-event and post-event records join with finite, regulator-stable
increments and explicit boundary changes.
**Fail:** continuation depends on the regulator path, omits a root, or invents
an event-only correction.

### Step 12 — Confront coincident same-transmitter birth

Test whether the tail action itself supplies the more-than-quadratic
near-birth suppression already proved necessary:

$$
\int_0^L
\frac{M(T)}{T^3}\,dT
<
\infty,
\qquad
M(T)
=
O(T^{2+\delta}),
\quad
\delta>0.
$$

Plainly: the bare coincident self contribution behaves like $T^{-3}$. The
effective maturity $M(T)$ must go to zero faster than $T^2$ for the total
velocity change to remain finite. If the tail action supplies no such
suppression, it does not close the full Master Equation transition problem.

**Pass:** one unique, open-neighborhood, regulator-independent continuation is
derived from the same candidate.
**Fail:** the route remains valid only on the regular domain or needs an
unowned event patch.

### Step 13 — Decide whether the tail can derive a causal wake state

Attempt to represent the tail integral through one or more auxiliary variables
obeying past-only transport equations. Derive:

- their emission data;
- free propagation;
- reception coupling;
- scalar energy account;
- vector momentum account;
- angular account or proof that orbital position-cross-momentum is sufficient;
- retained-boundary flux;
- elimination back to $K_{\mathrm{eff}}^{(\eta)}$.

Plainly: this is the bridge test between the two closure routes. Success would
turn the tail from a formal worldline memory into a concrete present-time causal
state whose hidden elimination reproduces the same action.

**Pass:** eliminating the auxiliary state reproduces the frozen kernel and all
three charges with no extra free constitutive function.
**Fail:** the localization requires future receiver data, residual-defined
accounts, or arbitrary maturity and transfer laws.

### Step 14 — Make the promotion decision

The characteristic-tail route may be promoted only if one frozen construction
passes:

1. exact regular-domain Master EOM reproduction;
2. past-only evolution;
3. endpoint and finite-memory closure;
4. time, translation, and rotation symmetry at finite regularization;
5. independently derived energy, momentum, and angular momentum;
6. one nonsymmetric same-record realized-branch certificate;
7. ordinary-fold continuation;
8. finite coincident same-transmitter continuation.

Plainly: local kernel success is only item 1's receiver half. Promotion requires
the full chain.

If only items 1–6 pass, the result may support an exact regular-domain action
with an explicit singular-boundary exclusion, but it does not close the full
Master Equation priority. If future-supported variation survives, the
worldline-only action route fails as a causal evolution law even if its formal
Noether charges are elegant.

## 17. Investigation matrix

| Question | Current grade | Required evidence | Failure meaning |
| --- | --- | --- | --- |
| Does the pure $1/r$ scalar action universally derive the Master Equation? | derived negative | one regular counterexample residual, plus full-variation confirmation | discard the universal scalar-action claim, not the Master Equation |
| Does the normalized tail have the correct receiver gradient? | derived positive | symbolic and independent numerical differentiation | kernel algebra or endpoint normalization is wrong |
| Does the full tail action yield only the canonical Euler equation? | unresolved | complete receiver-plus-transmitter variation | action changes the dynamics |
| Is the evolution past-only? | unresolved | one-slice update or derived causal localization | worldline-only action is not a causal evolution law |
| Is the endpoint physical and ledger-complete? | unresolved | characteristic proof and finite/infinite boundary convergence | hidden acceleration or hidden loss remains |
| Are all three charges derived from one action? | unresolved | finite-regularization symmetry derivation | conservation remains diagnostic bookkeeping |
| Do all three balances close independently? | unresolved | nonsymmetric same-record branch packet | a missing term or fitted account remains |
| Does the tail cross coincident birth? | unresolved | finite unique open-neighborhood continuation | route is regular-domain only |
| Can the tail derive the independent wake state? | inferred opportunity | exact auxiliary-state localization | the two routes remain separate |

Plainly: the matrix shows the current center of gravity. One local equation is
proved, while the action, causality, conservation, and singular-transition
questions remain open.

## 18. Immediate next calculations

The next useful work is mathematical, not a broad simulation campaign:

1. freeze the finite characteristic candidate with a compact-support
   $\delta_\eta$, $c_f=1$, and $h_+$ beyond regulator support;
2. redo the full variation for one arbitrary worldline point in both endpoint
   roles;
3. isolate future-supported terms before any Noether manipulation;
4. derive the exact finite-$\eta$ time-, translation-, and rotation-boundary
   terms;
5. test the result on one nonsymmetric affine prescribed history with an
   independent analytic calculation;
6. only then decide whether a numerical branch packet or auxiliary-state
   localization is the higher-value continuation.

Plainly: the full variation can kill the proposal cheaply. We should resolve
that before building a large solver feature or claiming conservation.

## 19. Nonclaims

This packet does not establish:

- a new Master Equation;
- an accepted action;
- an independently evolving wake substance;
- conserved energy, momentum, or angular momentum;
- primitive architrino mass, charge momentum $q\mathbf v$, or mass momentum
  $m\mathbf v$;
- a realized circular binary;
- binding, retention, stability, an attractor, or a Noether braid;
- a finite coincident same-transmitter transition;
- promotion of the characteristic tail into reader-facing canon.

Plainly: this file records a serious action-repair program and the exact tests
that can accept or reject it. It deliberately makes no physical branch claim.

## 20. Closure condition

The characteristic-tail investigation is complete only when one frozen
candidate receives an explicit verdict on all fourteen steps above. A
receiver-gradient identity alone is not closure. A conservation plot alone is
not closure. A prescribed circular chart alone is not closure. The decisive
artifact is one past-causal, same-record, nonsymmetric retained solution on
which the full Euler equation and all three independently derived history
charges close, together with a separate verdict on coincident
same-transmitter birth.

Plainly: success means one mechanism, one history, one regulator convention,
one causal update, and all required accounts agreeing without fitted repairs.
Anything less remains a useful but incomplete scaffold.
