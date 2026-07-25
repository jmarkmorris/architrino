# Independent Causal Wake-State Minimum and Obstruction

## Status

- Purpose: execute the independently evolving wake-state route selected for
  Master Equation closure.
- Claim grade: derived minimum-state requirements and derived obstruction under
  the current Architrino primitives.
- Result: a smallest necessary state class can be written, but its coupling and
  conserved accounts are not determined by the current primitives. No finite
  accepted coincident same-transmitter transition follows.
- Promotion: priority-only; no ontology, canon, or EOM solver change is licensed.

## Finding in plain language

Replacing the future-reception part of the two-time action requires a wake state
that exists and advances at the present absolute time. A single number attached
to an emitted wake is not enough. The state must distinguish direction on the
expanding wake surface and must determine three kinds of information: how
strongly that surface can accelerate a receiver, its scalar energy account, and
its vector momentum account. These need not be three independent stored
numbers; a later constitutive rule could derive them from fewer underlying
variables. No such rule is presently available. Orbital angular momentum can
then be computed as position crossed with wake momentum; an additional intrinsic
angular account would be required only if a future construction introduces one.

That minimum state exposes a hard obstruction. The current primitives do not say
how much energy or momentum is placed into a newly emitted wake, how reception
changes that wake, or which kinetic and momentum functions convert the
acceleration-first update into conserved motion accounts. They also do not select
the more-than-quadratic suppression required at coincident same-transmitter
birth. Filling those gaps by subtracting whatever the receiver just gained is
post hoc balancing, not a derived update.

The selected wake-state route has therefore advanced to a minimum-state theorem
and a no-go boundary, not to an accepted new Master Equation.

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

No separate intrinsic angular-momentum variable is needed under the present
line-of-action exchange assumption. The wake orbital angular momentum about a
fixed origin is

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

Claim grade: **derived information requirement, inferred minimal
representation**. A smaller state would falsify the inferred representation if
it independently changed one local reception, determined bounded energy and
vector momentum, and distinguished different directions on the same emitted
wake. A non-line-of-action wake exchange would also require the angular account
to be enlarged.

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
law.

At a reception event $\mathsf h=(r,t,T_r,T_t)$, one predeclared local map must
produce both the receiver continuation and the wake continuation:

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

## 3. Coincident-birth requirement

On the exact quadratic same-transmitter control, the unsuppressed acceleration
is proportional to $T^{-3}$. If the wake-state coupling replaces it by
$M(T)T^{-3}$, finite accumulated acceleration requires

$$
\int_0^L\frac{M(T)}{T^3}\,dT<\infty.
$$

Hence

$$
M(T)=O\!\left(T^{2+\delta}\right)
\qquad
\text{for some }\delta>0.
$$

Using the native dimensionless variable $z=|D_t|/c_f$, the same condition is

$$
M(z)=O\!\left(z^{2+\delta}\right).
$$

If the near-birth update is analytic in $z$, the first admissible integer power
is cubic. The wake-state route must therefore make its effective maturity obey

$$
m_i=O(z^3)
$$

on the endpoint-born same-transmitter branch, while recovering $m_i=1$ on the
declared regular domain.

This condition is necessary, not sufficient. Functions such as
$z^3/(1+z^3)$, $z^4/(1+z^4)$, and infinitely many others all make the local
impulse finite and produce different outgoing histories. The current primitives
select none of them and supply no transition scale or matching condition.

Claim grade: **derived necessity and underdetermination**. A finite accepted
transition with $M$ failing the displayed integrability condition would falsify
the necessity claim. A unique $M$ derived from existing primitives would
falsify the underdetermination claim.

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

Suppose every uniformly emitted wake element carries positive energy before any
reception. Continuous emission then increases wake energy even for a stationary,
isolated transmitter. Conservation requires a simultaneous debit from some
declared account, but the present primitives provide no emission debit rule.

Suppose instead that a newly emitted wake has zero energy and acquires the
negative of a receiver's energy gain only at reception. Repeated like-polarity
acceleration can then drive the wake account downward without a derived lower
bound. That balances algebraically but fails bounded energy.

Thus a bounded-energy wake state needs a predeclared emission capacity and a
rule that supplies that capacity from the complete state. Neither follows from
uniform causal-surface emission or polarity alone.

## 7. Ordinary folds and causal boundaries

If $m_i$ remains bounded and approaches its regular value on an ordinary fold
with nonzero separation, the known $|T_r-T_0|^{-1/2}$ acceleration remains
integrable. The wake-state extension therefore need not change the ordinary-fold
impulse theorem.

Finite retained history requires explicit flux of $e_i$ and
$\boldsymbol\pi_i$ when a stored surface element exits the retained domain.
Silently dropping it would manufacture conservation loss. Missing history still
routes to handling requiring verification before advancement.

## 8. Disposition

The independently evolving wake-state route is not closed. The analysis has
derived the smallest necessary state class and four mandatory conditions:

1. directional surface resolution;
2. a coupling variable with more-than-quadratic coincident-birth suppression;
3. scalar energy and vector momentum wake accounts;
4. one predeclared emission, propagation, reception, and boundary update tied to
   fixed motion-account functions.

The current primitives determine free propagation and the regular receiver
acceleration, but not the maturity law, motion-account functions, emission
capacity, or reception transfer. No accepted transition or conserved branch may
be inferred until those items are supplied by one non-circular construction.

The regular part of that statement now has an executable state reduction:
`scripts/equation-mapping/derive-causal-wake-update-law.mjs` advances fixed
emission-site centers and radii at $c_f$, derives the surface-normal line of
action, and reproduces $c_f/|D_t|$ by fixed-reception source-time collapse.
This closes the regular kinematic substate only. It does not supply any of the
four missing constitutive objects named above, so the obstruction and
fail-closed disposition are unchanged.

Promotion classification: **closed negatively under the current primitive set;
retain as the first-ranked derivation target, with singular evolution fail
closed**.
