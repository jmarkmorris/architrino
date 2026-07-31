# Capped Collinear Endpoint Reanalysis

**Date:** 2026-07-30  
**Status:** conditional bounded analytic recheck complete; continuation `Not advanced`
**Scope:** stationary mirror-symmetric collinear release under the proposed closed primitive domain $\|\mathbf V\|\le c_f=1$.

## Conditional input through first field-speed arrival

MEC-007 remains `Awaiting verification`. Conditional on its incoming packet,
assume the first field-speed event $T_\ast$ satisfies

$$
u(T_\ast)=1,\qquad q(T_\ast)>0.
$$

The same conditional input supplies one simple inward partner root in each
ordered partner channel, with

$$
D_{t,\mathrm p}=1-u(T_t)>0,\qquad D_{r,\mathrm p}=2.
$$

There is no positive-delay self root at equality; the only self solution is the excluded diagonal. The incoming partner acceleration is finite, nonzero, and inward, so the left-limit velocity reaches field speed with finite increment.

## What the ceiling removes

The MEC-007 newborn sharp-law self root requires a continuous extension with $u(T_r)>1$. A closed domain forbids that history, so that particular divergent post-threshold root is not admitted. This is a domain restriction, not root deletion from an otherwise admitted history.

## Equality is still a boundary question

For the one-dimensional self condition, set $h(T)=x(T)-T$. Under the ceiling,

$$
\dot h=u-1\le0.
$$

A positive-delay self root requires equal values of $h$ at emission and reception. It is absent for a touch-and-turn history, but a nonzero unit-speed plateau gives a continuum of self candidates with $D_t=0$. Such a continuum is not one ordinary canonical root and is not evaluated by the sharp simple-root sum.

At $T_\ast$ the canonical partner row has a positive speed-increasing component:

$$
\dot u(T_\ast^-)=\frac{K}{R_{\mathrm p}^2\bigl(1-u(T_t)\bigr)}>0.
$$

Consequently, the speed cap by itself does not determine a hold, turn, passage, or outbound real-history solution. A unit-speed hold is specifically not an automatic finite answer.

## Independent cap-segment ledger recheck

Assume the candidate total-ledger ceiling response holds after $T_\ast$ until
the first new ledger boundary. Write

$$
T_{\mathrm c}=T_\ast+q_\ast,
\qquad
q(T)=q_\ast-(T-T_\ast)
\quad
\text{for }
T_\ast\le T<T_{\mathrm c}.
$$

For either ordered partner channel, a root emitted on the retained
pre-threshold history satisfies

$$
q(T)+q(s)-(T-s)=0.
$$

Solving this equation for reception time gives

$$
T(s)
=
\frac{q_\ast+T_\ast+q(s)+s}{2},
\qquad
\frac{dT}{ds}
=
\frac{1-u(s)}{2}>0.
$$

The assumed incoming root at $T_\ast$ therefore continues uniquely and
monotonically through the conditional pre-threshold history, with

$$
s(T)\longrightarrow T_\ast
\quad\text{as}\quad
T\longrightarrow T_{\mathrm c}^{-}.
$$

No older self root appears on this segment. For $s<T_\ast$,

$$
q(s)-q_\ast
=
\int_s^{T_\ast}u(\tau)\,d\tau
<
T_\ast-s,
$$

so the older-history self-root equality cannot hold. Emissions with
$T_\ast\le s<T$ instead form the already declared non-isolated co-moving
self-contact interval. A cap-emitted partner root would require

$$
q(T)+q(s)=T-s,
$$

which reduces to $T=T_{\mathrm c}$. Hence there is no cap-emitted partner root
before coordinate coincidence.

Plainly: throughout the open cap segment, each receiver has exactly one old
ordinary partner root and one inactive co-moving self-contact family. No other
partner or self root arrives before coincidence.

The old partner row becomes pointwise unbounded because
$D_{t,\mathrm p}=1-u(s)\to0$, but its accumulated raw contribution on the open
segment is finite. Indeed,

$$
A_{\mathrm p}(T)
=
\frac{K}{R_{\mathrm p}(T)^2(1-u(s(T)))},
\qquad
dT
=
\frac{1-u(s)}{2}\,ds,
$$

and therefore

$$
\int A_{\mathrm p}(T)\,dT
=
\int
\frac{K}{2R_{\mathrm p}(s)^2}\,ds.
$$

Since $R_{\mathrm p}(s)\ge q_\ast>0$ on the declared segment, this integral has
finite total variation. The candidate ceiling response projects the purely
speed-increasing partner row to zero at every ordinary point of the open
segment, so its effective acceleration integral is also finite and equals
zero there.

Plainly: the partner acceleration grows without bound at the last instant, but
the root moves through emission time quickly enough that the accumulated raw
update before that instant stays finite. This does not define the instant
itself or anything after it.

Claim grade: `derived conditional ledger theorem` on the proposed straight
cap segment and the MEC-007 conditional monotone pre-threshold history. It is
falsified by an admitted root satisfying one of the strict inequalities above,
by a complete root census that finds another ordinary root before
$T_{\mathrm c}$, or by independent rejection of the consumed MEC-007 input.

## Coincidence partner-contact boundary

At $T=T_{\mathrm c}$, every partner emission time on the cap segment satisfies

$$
\left\|
\mathbf X_r(T_{\mathrm c})-\mathbf X_t(s)
\right\|
=
T_{\mathrm c}-s,
\qquad
T_\ast\le s<T_{\mathrm c},
$$

with

$$
D_{t,\mathrm p}=0.
$$

The limiting old partner root at $s=T_\ast$ is therefore the endpoint of a
new non-isolated positive-delay **partner-contact interval**, not an isolated
ordinary row. The isolated-crossing self-contact convention does not classify
this distinct-transmitter event.

The current candidate constrained Master Equation is defined only after a
complete finite ordinary root sum exists. It consequently has no value at this
partner-contact interval. A continuing model must supply a separately declared
event rule that states:

1. whether the interval is inactive, terminal, or an active boundary measure;
2. how its emissions and limiting old root retain unique ledger ownership;
3. the velocity and retained-history update at $T_{\mathrm c}$;
4. the outgoing emission record; and
5. a finite, unique post-event root and acceleration measure.

Plainly: coincidence does not present one difficult root. It presents an
entire partner contact family, and the current proposal contains no rule for
that family.

An unaccelerated straight passage is not a solution of the same ordinary
post-event law. If both labels continue through coincidence at unit speed, the
partner emission at $s=T_{\mathrm c}$ becomes, for
$T=T_{\mathrm c}+\delta$, a regular root with

$$
R_{\mathrm p}=\delta,
\qquad
D_{t,\mathrm p}=2,
\qquad
\left\|
\mathbf A_{\mathrm p}
\right\|
=
\frac{K}{2\delta^2}.
$$

Its direction slows the separating receiver, so the ceiling projection retains
it, and $\int_0^\varepsilon\delta^{-2}\,d\delta$ diverges. This rules out only
the unmodified straight-passage history; it does not select rebound,
termination, sticking, or another boundary update.

Claim grade: `derived conditional obstruction`. It is falsified by a
same-record post-event census showing that the stated partner emission is not
admitted under the unchanged ordinary rule, or by an independently derived
boundary update that changes the event before this ordinary row is formed.

## Local existence and uniqueness verdict

The proposed regular-chart partial model supplies a unique conditional history
on the half-open interval $[T_\ast,T_{\mathrm c})$. At $T_{\mathrm c}$,
however, its declared right-hand side is not defined because the root ledger
is a nonordinary partner-contact interval rather than a finite ordinary sum.
Local existence and uniqueness after coincidence are therefore not false
theorems of the current proposal; they are not yet well-posed claims.

A theorem can be attempted only after one of the event choices below is made
as an explicit model input and is shown to produce a finite outgoing ledger.
The bounded encounter cannot select that input from the desired outcome.

Plainly: the mathematics determines the path up to coincidence and then runs
out of law. More calculation with the same undefined event cannot decide which
future path is correct.

## Permitted model choices, none selected

1. **Terminal boundary:** end the history at $T_\ast$ while retaining the regular partner row and excluded diagonal.
2. **Constrained continuation:** add an explicit causal boundary evolution update that preserves the closed domain and books every regular root and boundary effect exactly once.
3. **Distinct equality object:** declare a separately owned boundary event; it is not an ordinary self root because $R=0$, $D_t=0$, and strict positive delay fails.
4. **Unit-speed sticking:** requires separate non-simple treatment for both
   the self-contact and partner-contact continua.

## Required capped-model certificate

Any continuing model needs the existing incoming ledger, a declared equality
admission rule, one explicit boundary evolution map, proof of $u\le1$ and
finite total acceleration variation, a unique outgoing retained-history state,
and a watch for later partner events with $D_t=0$. The calculation above
verifies the open cap-segment ledger and its finite accumulated partner row,
but the coincidence event fails the finite-ordinary-ledger premise.

## Claim boundary

This analysis does not adopt a field-speed ceiling or establish continuation,
passage, rebound, conservation, physical realization, or advancement of
MEC-002 through MEC-007. It establishes only the conditional open-segment root
inventory, the finite accumulated old-partner contribution, the
partner-contact interval at coincidence, and the straight-passage obstruction.
It is falsified by a capped-history root census that contradicts those bounded
statements or by a complete canonical boundary evolution that resolves the
stated equality conditions differently.
