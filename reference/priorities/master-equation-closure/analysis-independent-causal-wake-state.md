# Independent Causal Wake-State Minimum and Obstruction

## Status

- Purpose: execute the independently evolving wake-state route selected for
  Master Equation closure.
- Claim grade: derived minimum-information requirements and derived obstruction
  under the current Architrino primitives.
- Result: necessary direction-resolved output obligations can be written, but
  no coordinate-minimal representation, coupling, or conserved accounts are
  determined by the current primitives. No finite accepted coincident
  same-transmitter transition follows.
- Promotion: priority-only; no ontology, canon, or EOM solver change is licensed.

Research provenance: [Causal Wake-State Closure Research Findings and Proposed
Incorporation](../../research-office/research-history/review-packets/terence-tao-causal-wake-state-closure-research-findings-and-proposed-incorporation-2026-07-28.md)
supplies the weighted-integrability correction, representation forks, angular
identities, well-posedness obligations, and kinetic-account scope used here. It
is reference evidence only; it selects no constitutive update and establishes
no conservation law, wake ontology, retained branch, stability, photon Gate B
result, or EOM solver authority.

## Finding in plain language

Replacing the future-reception part of the two-time action requires a wake state
that exists and advances at the present absolute time. A single number attached
to an emitted wake is not enough. The state must distinguish direction on the
expanding wake surface and must determine three kinds of information: how
strongly that surface can accelerate a receiver, its scalar energy account, and
its vector momentum account. These need not be three independent stored
numbers; a later constitutive rule could derive them from fewer underlying
variables. No such rule is presently available. Orbital angular momentum can
then be computed as position crossed with wake momentum only after the account
booking point and free-propagation torque are declared. Whether an additional
intrinsic angular account is required remains representation-dependent.

That minimum information requirement exposes a hard obstruction. The current
primitives do not say how much energy or momentum is placed into a newly
emitted wake, how reception changes that wake, or which kinetic and momentum
functions convert the acceleration-first update into conserved motion accounts.
They also do not select any coupling satisfying the exact
weighted-integrability requirement at coincident same-transmitter birth.
Filling those gaps by subtracting whatever the receiver just gained is post hoc
balancing, not a derived update.

The selected wake-state route has therefore advanced to a minimum-information
theorem and a no-go boundary, not to an accepted new Master Equation.

## 1. Smallest information that any candidate state must determine

For each transmitter $i$, emission time $T_t$, and emission direction
$\boldsymbol\omega\in S^2$, the freely propagating surface element is at

$$
\mathbf Y_i(T;T_t,\boldsymbol\omega)
=
\mathbf X_i(T_t)+c_f(T-T_t)\boldsymbol\omega,
\qquad T\ge T_t.
$$

The smallest account-complete local description presently available is

$$
\mathcal W_i(T;T_t,\boldsymbol\omega)
=
\left(
m_i,
e_i,
\boldsymbol\pi_i
\right).
$$

The three entries have distinct jobs. They are required outputs of the state,
not a proof that they must be independent primitive variables:

1. $m_i$ is a nonnegative acceleration-coupling or maturity variable. It says
   whether the surface element has its regular strength or is suppressed near a
   same-transmitter birth.
2. $e_i$ is its scalar energy account.
3. $\boldsymbol\pi_i$ is its vector momentum account.

No separate intrinsic angular-momentum variable is needed only under a
representation whose reception booking and free-propagation torque make the
orbital account sufficient. Under that conditional representation, the wake
orbital angular momentum about a fixed origin is

$$
\mathbf J_{\mathcal W}(T)
=
\sum_i
\int
\mathbf Y_i(T;T_t,\boldsymbol\omega)
\times
\boldsymbol\pi_i(T;T_t,\boldsymbol\omega)
\,dT_t\,d\boldsymbol\omega.
$$

The complete present-time state would therefore be

$$
\mathcal S_T
=
\left(
\{\mathcal H_i^T\}_{i=1}^{N},
\{\mathcal W_i(T;T_t,\boldsymbol\omega)\}_{T_t\le T}
\right).
$$

This state is surface-resolved: it stores values separately over the directions
of an expanding wake. That resolution is necessary because two receivers can
intersect different parts of the same emitted surface. One scalar per emission
cannot update one intersection without silently changing all the others.

Operationally, a Markov present state must distinguish any two wake sectors
that can be updated independently and later distinguished by an admitted
reception observation. This is a quotient requirement on the complete state,
not a component-count proof for $(m,e,\boldsymbol\pi)$.

Under the narrower assumption that a reception map can inspect only one unit
direction $\boldsymbol\omega$ and is equivariant under proper rotations, its
vector output has the form

$$
\Delta\boldsymbol\pi
=
\alpha\,\boldsymbol\omega.
$$

Plainly: sector blindness plus rotational covariance forces a radial vector
output, but only because no other vector is available to the map.

If the map can also inspect a retained-history velocity $\mathbf V_r^-$, then
the rotationally covariant counterexample

$$
\Delta\boldsymbol\pi
=
\alpha\boldsymbol\omega
+
\beta\left(
\mathbf V_r^-
-
(\mathbf V_r^-\cdot\boldsymbol\omega)\boldsymbol\omega
\right)
$$

contains an allowed transverse term. Rotational symmetry therefore does not
select radial transfer until the map's admissible inputs are fixed.

Plainly: representation choice comes before a radiality theorem; retained
history can supply a second direction.

Claim grade: **derived information requirement, inferred minimal
representation**. A smaller state would falsify the inferred representation if
it independently changed one local reception, determined bounded energy and
vector momentum, and distinguished different directions on the same emitted
wake. A sector-blind equivariant map with a nonzero transverse output would
falsify the radial one-vector theorem.

## 2. Causal update form

Away from emission, reception, and retained-window boundaries, the surface
element moves at $c_f$ without consulting a future receiver. In radius-age
coordinates its free update has the transport form

$$
\left(\partial_T+c_f\partial_R\right)
\left(m_i,e_i,\boldsymbol\pi_i\right)
=
\mathbf0.
$$

This equation is only the statement that each stored surface element advances
outward by $c_f\,dT$ in absolute time. It is not an imported observer-level field
law. In particular, it transports the stored value $m_i$ unchanged along a free
characteristic. An age-changing effective maturity must therefore be either a
reception-time output computed from invariant stored state and current root
geometry, an event update, or the solution of a separately declared sourced
transport law. The homogeneous transport equation cannot also make stored
$m_i$ mature continuously.

At a reception event $\mathsf h=(r,t,T_r,T_t)$, one predeclared local map must
produce both the receiver continuation and the wake continuation:

Before that map can be evaluated, the missing objects must be supplied in this
logical order:

0. an allocation rule stating how much of one emitted surface account a single
   reception may claim;
1. the account representation and measure class;
2. the observation operator that reads that representation;
3. the reception transfer;
4. any maturity or suppression output;
5. the motion, wake, and boundary account maps; and
6. the account-bearing retained-boundary update.

The allocation rule is prior because the acceleration samples a surface density
at one direction, while a finite account debit removes a measure. An exact point
receiver intercepts a singleton of zero surface measure, so density evaluation
alone does not define a finite share.

Plainly: before asking how much a receiver takes, the update must say what counts
as that receiver's share of the emitted surface.

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
\mathcal W_t(T;T_t,\boldsymbol\omega_{\mathsf h})
\right).
$$

On a certified regular chart, its receiver component must reproduce

$$
\frac{d\mathbf V_r}{dT_r}
=
\kappa\,\sigma_{tr}|q_tq_r|
\frac{c_f}{r^2|D_t|}
\hat{\mathbf r}_t.
$$

Like polarity gives $\sigma_{tr}=+1$ and therefore outward acceleration;
opposite polarity gives $\sigma_{tr}=-1$ and therefore inward acceleration.
The polarity test is passed by the required receiver component. It does not by
itself determine the wake-account changes.

### 2.1 Reception representation and observation

This owner does not select whether $e_i$ and $\boldsymbol\pi_i$ are ordinary
densities, finite Radon measures, finite-patch accounts, or outputs of a
nonlocal redistribution. Each proposed reception law must declare one of these
classes before its finite-transfer claim can be evaluated.

If they are ordinary $L^1(dT_t\,d\boldsymbol\omega)$ densities and an exact
reception changes them only at one coordinate
$a=(T_t,\boldsymbol\omega_{\mathsf h})$, then

$$
\int\Delta e_i\,dT_t\,d\boldsymbol\omega=0,
\qquad
\int\Delta\boldsymbol\pi_i\,dT_t\,d\boldsymbol\omega=\mathbf0.
$$

Plainly: one point has zero measure for an ordinary density, so a pointwise
change cannot book a finite account transfer.

An atom, a derived finite patch, or an explicitly nonlocal redistribution can
represent a finite transfer, but the present primitives select none of them.
If a finite Radon account $\mu$ is proposed, its later observation operator
must be declared with it. For any bounded linear observation $\mathcal O$,

$$
\mathcal O[\mu+q\delta_p]-\mathcal O[\mu]
=
q\,\mathcal O[\delta_p].
$$

Plainly: an atom is visible exactly when the declared reader assigns a nonzero
value to that point mass; measure class alone does not decide visibility.

If $\mathcal O[\delta_p]=0$ on every realizable point, then $\mathcal O$
factors through the quotient by the closed atomic subspace. It need not factor
through the absolutely continuous part because singular-continuous content may
remain visible. No current root theorem proves that a later self-hit revisits
every earlier reception atom.

A finite-patch proposal must also declare its geometry. If $\varepsilon<r$ is
the Euclidean transverse radius of a circular spherical cap on a shell of
radius $r$, then

$$
\theta_\varepsilon=\arcsin(\varepsilon/r),
\qquad
|\Omega_\varepsilon|
=
2\pi(1-\cos\theta_\varepsilon)
=
\pi\frac{\varepsilon^2}{r^2}
\left(
1+\frac14\frac{\varepsilon^2}{r^2}
+O(\varepsilon^4/r^4)
\right).
$$

Plainly: this coefficient belongs to the stated spherical-cap convention; a
planar-disc convention has a different higher-order correction.

For a uniform finite account $\Delta Q$ on a controlled shrinking cap family,

$$
\Delta\mu_\varepsilon
\overset{*}{\rightharpoonup}
\Delta Q\,\delta_{\boldsymbol\omega_{\mathsf h}},
\qquad
\frac{\Delta Q}{|\Omega_\varepsilon|}
\sim
\frac{\Delta Q\,r^2}{\pi\varepsilon^2}.
$$

Plainly: the total account stays finite while the density grows like inverse
patch area and converges weakly to an atom.

The transverse patch radius $\varepsilon$, wake thickness, and any
emission-time regulator are distinct controls. This angular marginal supplies
no regulator-path-independence theorem for the full
emission-label-by-direction state.

Claim grade: **derived conditional representation obstructions and cap
scaling; representation and observation choices unresolved**. A nonzero
ordinary-density integral supported on one singleton, or a direct calculation
contradicting the declared cap geometry, would falsify the corresponding
mathematical statement.

## 3. Coincident-birth requirement

On

$$
\mathbf X(T)
=
\mathbf X_0+\mathbf V_0T+\frac12\mathbf A_0T^2,
$$

write $s=T_r-T_e$ and $T_m=\tfrac12(T_r+T_e)$. The exact displacement is

$$
\mathbf X(T_r)-\mathbf X(T_e)
=
s\,\mathbf V(T_m).
$$

The self-hit condition therefore becomes $\|\mathbf V(T_m)\|=c_f$. If
$g(T)=\|\mathbf V(T)\|-c_f$ has a simple zero at $T_c$, $g'(T_c)\ne0$, and
$\tau=T_r-T_c$, then

$$
s=2\tau,
\qquad
r=2c_f\tau,
\qquad
D_t=\tau g'(T_c),
\qquad
D_r=-\tau g'(T_c),
\qquad
\frac{dT_e}{dT_r}=-1,
$$

and

$$
\left\|\mathbf A_{ii}\right\|
=
\frac{\kappa q^2}{4c_f|g'(T_c)|\,\tau^3}.
$$

The normalized-$c_f=1$ Leg 0 playback check is therefore exact on this control:

$$
\frac{r}{2c_f\tau}=1,
\qquad
\frac{D_t}{\tau g'(T_c)}=1,
\qquad
\frac{dT_e}{dT_r}=-1.
$$

Plainly: the approved playback leg closes analytically on the quadratic control.
It checks the local identity only; it supplies no wake account, birth
continuation, or conserved branch.

Because $z=|g'(T_c)|\tau/c_f$ is linear in $\tau$, conditions written in $z$
and $\tau$ are equivalent on this control. That equivalence is not yet proved
for generic higher-order controls.

For nonnegative measurable $M$, if the wake-state coupling replaces the
singular term by $M(T)T^{-3}$, finite accumulated acceleration is equivalent to

$$
\int_0^L\frac{M(T)}{T^3}\,dT<\infty.
$$

Plainly: the exact requirement is weighted integrability, not a pointwise
power-law bound.

At impulse level, nonnegativity makes this absolute integrability. Within a
predeclared regulator class admitting one uniform integrable dominator,
dominated convergence gives a regulator-family-independent impulse. The
compact-bump multiplicative cutoff, Gaussian mollification, and hard cutoff
families satisfy this only when their shared dominator is part of the declared
protocol.

The family

$$
M_\eta(z)
=
z^3+a\eta^2\varphi(z/\eta),
$$

with $\varphi$ supported on $[1,2]$, converges pointwise to $z^3$ but can leave
a nonzero weighted residue. It lies outside the dominated class and shows why
the class must be declared. For the full nonlinear state, impulse convergence
still does not select a continuation; uniqueness of the limiting integral
equation is an additional obligation.

The apply-now acceptance condition is therefore

$$
M\ge0,
\qquad
\int_0^L M(T)T^{-3}\,dT<\infty,
$$

together with a declared uniformly dominated regulator class and a uniqueness
certificate for the post-birth limit continuation.

Plainly: the birth kick can be regulator-independent inside a controlled class
while the outgoing trajectory remains nonunique. Both questions must pass.

A bound $M(T)=O(T^{2+\delta})$ for some $\delta>0$ is sufficient but not
necessary. After nondimensionalizing $T$ by $L$, the continuous example

$$
M(T)
=
\frac{(T/L)^2}{\log^2(eL/T)}
$$

has a finite weighted integral but is not
$O(T^{2+\delta})$ for any $\delta>0$.

Plainly: logarithmic decay beyond the quadratic borderline can be integrable
without gaining any fixed positive power.

If $M$ is nonnegative and nondecreasing as $T$ moves away from birth, weighted
integrability implies $M(T)=o(T^2)$ as $T\downarrow0$. That pointwise
condition is still not sufficient: after the same nondimensionalization,

$$
M(T)
=
\frac{(T/L)^2}{\log(eL/T)}
$$

is $o(T^2)$ and nondecreasing near birth, but its weighted integral diverges.

Plainly: monotonicity rules out narrow spikes and yields a sharper necessary
pointwise limit, but only the weighted integral decides finiteness.

For a pure power $M(T)\sim C T^p$ with $C>0$, weighted integrability is
equivalent to $p>2$. If $M$ is analytic in the exact linear variable $z$ and
is not identically zero, write

$$
M(z)=a_kz^k+O(z^{k+1}),
\qquad
a_k\ne0.
$$

Then $k>2$. Cubic is therefore the first possible nonzero analytic order, not
a selected term; quartic and every higher leading order remain admissible.

Plainly: analyticity turns the integral test into an integer-order test, but it
does not require a nonzero cubic coefficient.

No current allocation candidate derives that cubic order:

| Allocation rule | $M$ near birth | Order | Disposition |
| --- | --- | ---: | --- |
| strict per-patch, point receiver | $0$ | — | eliminated: a singleton has zero measure |
| geometric cross-section $\sigma/R^2$ | $\propto z$ | $1$ | eliminated: nonintegrable and makes the cap depend on $D_r$ |
| whole-label allocation | $\min(1,(\tau/\tau_*)^3)$ | $3$ | eliminated: drains directions away from the interception |
| fixed angular fraction $f$ | $\propto z^3$ | $3$ | conditional on a new declared allocation postulate |

The whole-label failure is witnessed by two receivers intercepting antipodal
directions of one emission label. If the first reception drains the label, the
second receiver's otherwise identical regular acceleration depends on a remote
earlier reception; if both claim the full label, the account becomes negative.
Reception order changes the result.

Plainly: cubic suppression appears only after declaring how much angular surface
one reception owns. The current primitives do not select that share.

The integral condition also fails to select the complete law or its scale.
Let $z_0>0$, set $\tau=c_fz_0/\alpha$, and consider the inverse constructions

$$
M_3(z)
=
\begin{cases}
(z/z_0)^3,&0\le z<z_0,\\
1,&z\ge z_0,
\end{cases}
\qquad
M_4(z)
=
\begin{cases}
(z/z_0)^4,&0\le z<z_0,\\
1,&z\ge z_0.
\end{cases}
$$

For a scalar singular coefficient $A\,T^{-3}$, their birth-region accumulated
accelerations are

$$
I_3
=
A\int_0^\tau\frac{(T/\tau)^3}{T^3}\,dT
=
\frac{A}{\tau^2},
\qquad
I_4
=
A\int_0^\tau\frac{(T/\tau)^4}{T^3}\,dT
=
\frac{A}{2\tau^2}.
$$

Plainly: both laws are finite and match the regular value at the same declared
threshold, yet they produce different outgoing velocity changes.

Smooth perturbations supported inside $(0,z_0)$ preserve weighted
integrability and endpoint matching while changing the accumulated
acceleration. These functions are counterexamples, not candidate laws selected
by $\mathbb{A}\mathbb{A}\mathbb{A}$.

Claim grade: **derived necessity and underdetermination**. A finite accepted
transition with $M$ failing the displayed integrability condition would falsify
the necessity claim. An allowed native functional equation that uniquely fixes
the complete law and scale would falsify the underdetermination claim.

## 4. Conservation equations expose missing information

Let the motion accounts be fixed functions

$$
E_{\mathrm{motion}}=\sum_i K(\|\mathbf V_i\|),
\qquad
\mathbf P_{\mathrm{motion}}
=
\sum_iP(\|\mathbf V_i\|)\hat{\mathbf V}_i.
$$

For a finite present-time domain, the candidate totals would be

$$
E_{\mathrm{tot}}
=
E_{\mathrm{motion}}
+
\sum_i\int e_i\,dT_t\,d\boldsymbol\omega,
$$

$$
\mathbf P_{\mathrm{tot}}
=
\mathbf P_{\mathrm{motion}}
+
\sum_i\int\boldsymbol\pi_i\,dT_t\,d\boldsymbol\omega,
$$

$$
\mathbf J_{\mathrm{tot}}
=
\sum_i\mathbf X_i\times
P(\|\mathbf V_i\|)\hat{\mathbf V}_i
+
\mathbf J_{\mathcal W}.
$$

One update would have to prove

$$
\Delta E_{\mathrm{tot}}+\Phi_E=0,
\qquad
\Delta\mathbf P_{\mathrm{tot}}+\boldsymbol\Phi_P=\mathbf0,
\qquad
\Delta\mathbf J_{\mathrm{tot}}+\boldsymbol\Phi_J=\mathbf0.
$$

The present Master Equation fixes $\Delta\mathbf V_i$ but does not fix $K$ or
$P$. Consequently the required $\Delta e_i$ and
$\Delta\boldsymbol\pi_i$ are not determined. Defining them afterward as the
negative motion-account residual would make every acceleration equation appear
conservative and is therefore rejected.

Claim grade: **derived obstruction**. A predeclared Architrino-native $K$, $P$,
emission map, and reception map that close the three equations on nonsymmetric
histories would falsify it.

Two non-circularity requirements sharpen that obstruction:

1. The balances must hold as identities in inputs not fixed by the acceleration
   geometry. At fixed $(r,\hat{\mathbf r},D_t)$ these include the present
   receiver velocity $\mathbf V_r$ and higher transmitter-history derivatives.
   Varying shell age while holding $r$ fixed is not an independent test because
   reception fixes $T_r-T_e=r/c_f$.
2. The debit must follow from an independently declared allocation or extraction
   rule and remain bounded by available capacity. Defining it as the negative
   motion change has no falsifiable content.

To first order,

$$
\Delta E_{\mathrm{motion}}
=
K'(v_r)\hat{\mathbf V}_r\cdot\Delta\mathbf V_r.
$$

At fixed causal geometry $\Delta\mathbf V_r$ is fixed while
$\mathbf V_r$ can vary. Unless $K'\equiv0$, an energy-closing reception map
must therefore read the present receiver velocity. This requirement belongs to
the account update only: it does not insert $\mathbf V_r$ or $D_r$ into the
canonical acceleration.

Plainly: the account may need to know the receiver's present motion even though
the acceleration law must remain receiver-velocity independent.

### 4.1 Angular booking and finite-increment scope

Let $\Delta\mathbf p_r$ be the receiver momentum-account increment and let the
wake debit be $-\Delta\mathbf p_r$. Under same-reception-point booking,

$$
\int\mathbf Y\times d\boldsymbol{\mathsf\Pi}
=
-\mathbf X_r\times\Delta\mathbf p_r.
$$

Plainly: the two angular increments use the same lever arm and cancel for every
transfer direction; this booking choice does not force radial transfer.

If the wake debit is instead booked at the emission center $\mathbf C$, the
event residual is

$$
\mathbf X_r\times\Delta\mathbf p_r
-
\mathbf C\times\Delta\mathbf p_r
=
R\boldsymbol\omega_{\mathsf h}\times\Delta\mathbf p_r.
$$

Plainly: under emission-center booking with $R>0$, event-wise orbital closure
requires a radial transfer unless another account supplies the residual.

For a freely propagating wake element with constant stored momentum account,

$$
\frac{d}{dT}
\left(
\mathbf Y\times\boldsymbol\pi
\right)
=
c_f\boldsymbol\omega\times\boldsymbol\pi.
$$

Plainly: a nonradial stored vector changes this orbital account during
propagation unless another sector supplies the torque.

A finite-increment affine-rigidity theorem is available only under an explicit
richness hypothesis. Let $D\subseteq\mathbb R^3$ be connected and open, and
assume for every $\mathbf u,\mathbf w\in D$ that

$$
\mathbf p(\mathbf w)-\mathbf p(\mathbf u)
\parallel
\mathbf w-\mathbf u.
$$

Non-collinear velocity triangles force one common scale on every edge, and
overlapping neighborhoods propagate it across $D$:

$$
\mathbf p(\mathbf V)=a\mathbf V+\mathbf b.
$$

If $\mathbf0\in D$ and $\mathbf p(\mathbf0)=\mathbf0$, or if proper-rotation
equivariance removes the offset, then $\mathbf p(\mathbf V)=a\mathbf V$.

Plainly: the linear form follows from the all-pairs or separately proved
triangle-connected increment condition. It does not follow from radial
acceleration alone or from one realized trajectory.

This theorem is conditional on emission-center booking, event-wise angular
closure, and the stated richness of admissible increments. The coefficient
$a$ is an undetermined account scale, not primitive architrino mass. None of
these booking identities derives physical conservation or selects a momentum
account.

## 5. Regular-law and conservation trilemma

An independently evolving wake can respond to reception in only three relevant
ways:

1. **No reception update.** Later receivers see the canonical transmitter-history
   wake, but the wake supplies no balancing change for the receiver's motion.
2. **Reception changes the intercepted wake or emits a dynamically active
   response wake.** Conservation may become possible, but later receivers can
   then distinguish histories with identical transmitter motion and different
   earlier receptions. Their acceleration is no longer the universal
   transmitter-history-only law.
3. **Reception creates an account that never affects any later acceleration.**
   The regular law is preserved, but the added account is dynamically inert and
   its balancing value is again an unselected ledger assignment.

Therefore the present universal regular-domain acceleration, independent
reception-updated wake dynamics, and non-circular conservation cannot all be
retained without another rule that specifies which changed wake components are
dynamically visible and how their stored accounts are bounded.

This is not an argument for transmitter acceleration caused by emission. The
missing opposite account is required somewhere in the complete causal state;
the current primitives do not say where or how it is carried.

## 6. Positive-energy emission obstruction

If every wake element emitted uniformly in absolute time carries the positive
energy fixed by the conditional account-density result, an isolated stationary
transmitter's stored wake energy grows linearly unless the corresponding
coefficient $C_e$ is zero.

The resulting alternatives are:

1. $C_e=0$, so the proposed wake energy account is vacuous;
2. emission has a predeclared debit from another bounded account; or
3. uniform fixed-capacity emission in absolute time is not the correct
   constitutive rule.

If the debit is assigned to a motion account at constant rate
$\varepsilon_0|q|$, the comparison bookkeeping
$K=\tfrac12\mu_{\mathrm{arch}}v^2$ gives

$$
v^2(T)
=
v_0^2-\frac{2\varepsilon_0|q|}{\mu_{\mathrm{arch}}}T,
\qquad
T_{\mathrm{stop}}
=
\frac{\mu_{\mathrm{arch}}v_0^2}{2\varepsilon_0|q|}.
$$

Here $\mu_{\mathrm{arch}}$ is only the declared units constant used by that
comparison account, not architrino mass. The finite stopping time rejects this
simple motion-debit construction; it does not select another source.

Plainly: fixed positive capacity emitted every second needs a source. Charging
ordinary motion would halt a free carrier on a schedule, so the open pressure
falls on the uniform-emission assumption or on a different derived account.

## 7. Ordinary folds and causal boundaries

If $m_i$ remains bounded and approaches its regular value on an ordinary fold
with nonzero separation, the known $|T_r-T_0|^{-1/2}$ acceleration remains
integrable. The wake-state extension therefore need not change the ordinary-fold
impulse theorem.

Finite retained history requires explicit flux of $e_i$ and
$\boldsymbol\pi_i$ when a stored surface element exits the retained domain.
Silently dropping it would manufacture conservation loss. Missing history still
routes to handling requiring verification before advancement.

## 8. One-sided well-posedness burden

Finite accumulated acceleration does not prove unique continuation. The scalar
control

$$
\dot S
=
T^{-1/2}\operatorname{sgn}(S)\sqrt{|S|},
\qquad
S(0)=0
$$

has an integrable time envelope but admits the zero solution and, for every
$a\ge0$,

$$
S_a(T)
=
\left(
\max(0,\sqrt T-\sqrt a)
\right)^2.
$$

Plainly: a solution can wait at zero for an arbitrary time and then leave, so
finite accumulated size alone does not prevent branching.

A future coincident-birth theorem must therefore declare:

1. one complete retained-history phase space;
2. a one-sided birth normal form and predeclared branch rule;
3. integrable acceleration and state sensitivity on that chart;
4. continuous and transverse event-time or root maps;
5. single-valued jump maps with Lipschitz or Osgood control;
6. an event-ordering rule and a nonaccumulation or controlled-Zeno theorem; and
7. a solution class, such as BV or càdlàg, compatible with any genuine jumps.

A useful local sensitivity target is

$$
\int_0^\varepsilon
\left(
\|A(T,S)\|
+
\operatorname{Lip}_S A(T,\cdot)
\right)dT
<
\infty.
$$

Plainly: both the accumulated acceleration and the sensitivity of that
acceleration to the present state need finite area near birth.

This is a proof architecture, not a new generic gate or a theorem for an
unspecified reception map. It must be checked on one complete predeclared
constitutive system, including its events and boundary behavior.

This center-relative account analysis supplies no constraint on
assembly-level angular structure and no consequence for photon Gate B. No
photon status or cross-reference follows.

## 9. Disposition

The independently evolving wake-state route is not closed. The analysis has
derived a conditional state class and seven mandatory obligations:

1. a reception allocation rule compatible with direction resolution and finite
   account measure;
2. directional surface resolution;
3. a coupling output satisfying exact weighted integrability at coincident
   birth, with cubic only the first possible analytic order;
4. scalar energy and vector momentum account outputs in a declared density,
   measure, patch, or nonlocal representation;
5. a declared observation operator and angular-booking convention;
6. one predeclared emission, propagation, reception, and boundary update tied
   to fixed motion-account functions; and
7. a one-sided birth, event, and jump architecture sufficient for local
   well-posedness.

The current primitives determine free propagation and the regular receiver
acceleration, but not the maturity law, motion-account functions, emission
capacity, or reception transfer. No accepted transition or conserved branch may
be inferred until those items are supplied by one non-circular construction.

The regular part of that statement now has an executable state reduction:
`scripts/equation-mapping/derive-causal-wake-update-law.mjs` advances fixed
emission-site centers and radii at $c_f$, derives the surface-normal line of
action, and reproduces $c_f/|D_t|$ by fixed-reception source-time collapse.
This closes the regular kinematic substate only. It does not supply any of the
missing constitutive objects named above, so the obstruction and fail-closed
disposition are unchanged.

Promotion classification: **closed negatively under the current primitive set;
retain as the first-ranked derivation target, with singular evolution fail
closed**.
