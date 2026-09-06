# Capped Collinear Endpoint Reanalysis

**Date:** 2026-07-30 **Status:** conditional bounded analytic recheck complete; proposed outgoing contact one-jet added; open post-contact continuation `Not advanced` **Scope:** stationary mirror-symmetric collinear release under the proposed closed primitive domain $\|\mathbf V\|\le c_f=1$. **Reviewed by:** [Jack K. Hale read-only review, captured 2026-07-31](../reviews/jack-k-hale-review-response-2026-07-31.md); [Lars Hörmander read-only review, captured 2026-07-31](../reviews/lars-hormander-review-response-2026-07-31.md); [Albert Einstein second read-only review, captured 2026-08-01](../reviews/albert-einstein-second-review-response-2026-08-01.md).

## Verified incoming input through first field-speed arrival

Completed [MEC-007](../../master-equation-closure/analysis/mirror-close-approach-causal-root-boundary.md) verifies that the stationary incoming history's first field-speed event $T_\ast$ satisfies

$$
u(T_\ast)=1,\qquad q(T_\ast)>0.
$$

The same verified bounded input supplies one simple inward partner root in each ordered partner channel, with

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

Assume the candidate total-ledger ceiling response holds after $T_\ast$ until the first new ledger boundary. Write

$$
T_{\mathrm c}=T_\ast+q_\ast,
\qquad
q(T)=q_\ast-(T-T_\ast)
\quad
\text{for }
T_\ast\le T<T_{\mathrm c}.
$$

For either ordered partner channel, a root emitted on the retained pre-threshold history satisfies

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

The assumed incoming root at $T_\ast$ therefore continues uniquely and monotonically through the conditional pre-threshold history, with

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

so the older-history self-root equality cannot hold. Emissions with $T_\ast\le s<T$ instead form the already declared non-isolated co-moving self-contact interval. A cap-emitted partner root would require

$$
q(T)+q(s)=T-s,
$$

which reduces to $T=T_{\mathrm c}$. Hence there is no cap-emitted partner root before coordinate coincidence.

Plainly: throughout the open cap segment, each receiver has exactly one old ordinary partner root and one inactive co-moving self-contact family. No other partner or self root arrives before coincidence.

The old partner row becomes pointwise unbounded because $D_{t,\mathrm p}=1-u(s)\to0$, but its accumulated raw contribution on the open segment is finite. Indeed,

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

Since $R_{\mathrm p}(s)\ge q_\ast>0$ on the declared segment, this integral has finite total variation. The candidate ceiling response projects the purely speed-increasing partner row to zero at every ordinary point of the open segment, so its effective acceleration integral is also finite and equals zero there.

Plainly: the partner acceleration grows without bound at the last instant, but the root moves through emission time quickly enough that the accumulated raw update before that instant stays finite. This does not define the instant itself or anything after it.

Claim grade: `derived conditional ledger theorem` on the proposed straight cap segment and the MEC-007 conditional monotone pre-threshold history. It is falsified by an admitted root satisfying one of the strict inequalities above, by a complete root census that finds another ordinary root before $T_{\mathrm c}$, or by independent rejection of the consumed MEC-007 input.

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

The limiting old partner root at $s=T_\ast$ is therefore the endpoint of a new non-isolated positive-delay **partner-contact interval**, not an isolated ordinary row. The isolated-crossing self-contact convention does not classify this distinct-transmitter event.

The candidate constrained Master Equation is defined only after a complete finite ordinary root sum exists. It consequently has no ordinary value on this partner-contact interval. For this exact same-path mirror-collinear coincidence, the operator has selected the following narrow event convention for review:

> **Minimal Collinear Partner-Contact Postulate.** The ordinary positive-separation, isolated-reception ledger has no contact row at exact coincidence. The zero-radius point-emission delta is source bookkeeping, not a partner acceleration contribution. One separately recorded contact event owns the nonisolated partner family and limiting old-root transition, and it contributes zero velocity impulse:
>
> $$
> \Delta\mathbf V_{i,\mathrm{contact}}=\mathbf0.
> $$

This is a proposed event postulate, not a consequence of the ordinary causal law, the point delta, or the speed constraint. It does not delete an ordinary row: no isolated positive-separation contact row exists at the event. Both labeled contact-time source measures remain nonzero. The zero velocity impulse is a proposed atomic event coefficient, not a cancellation or finite-part value of a receiver-side contact measure.

Plainly: coincidence presents an entire nonordinary partner family. The new proposal books that family as one event and says the event gives neither label a velocity kick.

For declared left traces

$$
\mathbf V_1(T_{\mathrm c}^{-})=c_f\mathbf e,
\qquad
\mathbf V_2(T_{\mathrm c}^{-})=-c_f\mathbf e,
$$

the proposed reset returns only the velocity-preserving outgoing contact one-jets

$$
\left(
\mathbf X_i(T_{\mathrm c}^{+}),
\mathbf V_i(T_{\mathrm c}^{+})
\right)
=
\left(
\mathbf X_{\mathrm c},
\mathbf V_i(T_{\mathrm c}^{-})
\right).
$$

This one-jet is position-and-one-sided-velocity data at the event. It does not assert a right-hand path expansion, labeled passage, separation, or a solution on any open post-contact interval.

An unaccelerated straight passage is not a solution of the same ordinary post-event law. If both labels continue through coincidence at unit speed, the partner emission at $s=T_{\mathrm c}$ becomes, for $T=T_{\mathrm c}+\delta$, a regular root with

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

Its direction slows the separating receiver, so the ceiling projection retains it, and $\int_0^\varepsilon\delta^{-2}\,d\delta$ diverges. This is a conditional obstruction for the prescribed unaccelerated straight separating right trace only. It is not a universal continuation no-go. It does not contradict the proposed zero-impulse reset at the single contact event, and it does not supply the later finite retained-history evolution.

Claim grade: `derived conditional obstruction`. It is falsified by a same-record post-event census showing that the stated partner emission is not admitted under the unchanged ordinary rule, or by an independently derived boundary update that changes the event before this ordinary row is formed.

### One-sided zero-range comparison

The two sides of the contact are not interchangeable:

1. On the half-open incoming cap segment, every reception time $T<T_{\mathrm c}$ still has one finite ordinary partner ledger. Its net partner contribution is forward and speed-increasing, so the proposed response removes it only after that finite ledger is formed.
2. At $T=T_{\mathrm c}$, the positive-delay partner family is nonisolated and no complete ordinary ledger exists. Only the separate proposed event reset assigns the zero atomic velocity update.
3. On the prescribed unaccelerated straight separating right trace, the first positive-delay partner row is backward and proportional to $\delta^{-2}$, so the proposed response retains it.

The third statement has not been proved for every sufficiently regular separating trace. That extension, including both channels, competing strata, and the full leading and remainder response, is FSC-005.

Plainly: before contact the cap removes a forward row at each ordinary time; at contact there is no ordinary row to cap; after contact the one prescribed straight path produces a backward row that the cap cannot remove. These three facts do not join themselves into a unique motion through contact.

## Local existence and uniqueness verdict

The proposed regular-chart partial model supplies a unique conditional history on $[T_\ast,T_{\mathrm c})$. The proposed reset assigns a velocity-preserving outgoing contact one-jet at $T_{\mathrm c}$. It does not define a right-hand trace, locally finite acceleration, or retained-history update on any open interval $(T_{\mathrm c},T_{\mathrm c}+\varepsilon)$.

Local existence and uniqueness after coincidence are therefore still not established. The first ordinary post-contact row in the prescribed unaccelerated straight separating trace has nonintegrable magnitude, and no accepted rule yet supplies a finite alternative evolution. Whether the same $\delta^{-2}$ incompatibility holds for every sufficiently regular separating right trace is the queued [near-contact theorem target](near-contact-separating-trace-incompatibility-theorem-target.md), not a result of this reanalysis.

Plainly: the new postulate determines the no-jump outgoing one-jet. The mathematics still supplies no right-hand path.

## Selected proposed event choice and remaining choices

1. **Selected for this exact contact only:** a separately owned collinear partner-contact event with no ordinary row, no partner acceleration from the source delta, and $\Delta\mathbf V_{\mathrm{contact}}=\mathbf0$.
2. **Not selected:** a general inactive, terminal, sticking, active-boundary-measure, rebound, or transverse event rule for other nonordinary contacts.
3. **Not established:** a compatible right-hand history or locally finite post-contact root and acceleration measure for the outgoing one-jet.

## Required capped-model certificate

Any complete continuing model needs the existing incoming ledger, the proposed contact event record, proof of $u\le1$ and finite total acceleration variation, a unique retained-history state on an open post-contact interval, and a watch for later partner events with $D_t=0$. The calculation above verifies the open cap-segment ledger, its finite accumulated partner row, and the velocity-preserving outgoing contact one-jet conditional on the new postulate. It does not supply the required finite post-contact ledger.

## Claim boundary

This analysis does not adopt a field-speed ceiling, establish a general or open-interval continuation, claim conservation or stability, establish physical realization, or advance MEC-002 through MEC-007. It establishes the conditional open-segment root inventory, the finite accumulated old-partner contribution, the partner-contact interval, the velocity-preserving outgoing contact one-jet that follows from the proposed zero-impulse reset, and the conditional straight-trace obstruction. It is falsified by a capped-history root census that contradicts those bounded statements, by a nonzero contact velocity jump under the selected postulate, or by a complete canonical boundary evolution that resolves the stated equality conditions differently.
