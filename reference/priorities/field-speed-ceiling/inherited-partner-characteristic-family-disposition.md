# Inherited partner characteristic family at mirror coincidence

## Purpose

This note calculates the causal incidence geometry of the actual ceiling-cap
history used in Section 10.7 of
[the mathematics packet](mathematics-geometry-dynamical-system.md). It
separates the exact coincidence event from a candidate path on the open
right-hand interval. Its purpose is to determine which source times are roots;
it does not select a continuation or assign a nonordinary event response.

## Hypotheses and notation

Work in Euclidean space with absolute time. Normalize the wake speed to
$c_f=1$ for the calculation; factors of $c_f$ can be restored by dimensional
scaling. Put coincidence at $T=0$, choose a unit vector $\mathbf e$, and let
the retained incoming ceiling cap have duration $L>0$:

$$
\mathbf X_1(s)=s\mathbf e,
\qquad
\mathbf X_2(s)=-s\mathbf e,
\qquad -L\le s\le0.
$$

Thus label 1 approaches the origin from the negative $\mathbf e$ side and
label 2 approaches from the positive side. For receiver 1 and transmitter 2,
write

$$
g_{1\leftarrow2}(T,s)
=
\left\|\mathbf X_1(T)-\mathbf X_2(s)\right\|-(T-s).
$$

At positive range, use

$$
D_t=1-\hat{\mathbf r}\mathbin{\cdot}\mathbf V_t,
\qquad
D_r=1-\hat{\mathbf r}\mathbin{\cdot}\mathbf V_r,
$$

where $\hat{\mathbf r}$ points from transmitter to receiver.

The analysis assumes only the closed path-speed domain
$\|\mathbf V_i\|\le1$ and the displayed retained cap. It does not assume a
right-hand continuation law.

## Exact coincidence: the cap interval is an event family

At $T=0$, every cap emission $s\in[-L,0)$ satisfies

$$
g_{1\leftarrow2}(0,s)
=
\left\|s\mathbf e\right\|+s
=0.
$$

Hence the incoming partner cap is a nonzero-length emission-time
characteristic interval at coincidence. For $s<0$,

$$
\hat{\mathbf r}=-\mathbf e,
\qquad
\mathbf V_t=-\mathbf e,
\qquad
\mathbf V_r=+\mathbf e,
$$

so

$$
D_t=0,
\qquad
D_r=2.
$$

This is not a selected simple root and has no ordinary receiver row. The
endpoint $s=0$ lies on the excluded zero-delay diagonal, where the arriving
direction and the two factors are not ordinary positive-range objects.

The same-label cap is also characteristic at coincidence. For label 1 as both
receiver and transmitter, $s\in[-L,0)$ has

$$
\hat{\mathbf r}=+\mathbf e,
\qquad
D_t=D_r=0.
$$

The packet's same-transmitter convention classifies neither cap interval as
an ordinary isolated row. Exact coincidence therefore presents an event family
rather than a finite ordinary ledger.

Claim grade: `derived retained-history incidence calculation`. It is falsified
by a cap emission $s\in[-L,0)$ for which the displayed causal equality fails.

Plainly: all earlier cap fronts arrive together at coincidence. They are a
family at one event, not a sequence of ordinary partner receptions.

## Candidate straight-through right trace

For the velocity-preserving, straight-through trial,

$$
\mathbf X_1(T)=T\mathbf e,
\qquad
\mathbf X_2(T)=-T\mathbf e,
\qquad T>0.
$$

The partner cap equation becomes

$$
g_{1\leftarrow2}(T,s)=|T+s|-(T-s),
\qquad -L\le s\le0.
$$

For $s<-T$, this is $-2T<0$; for $-T\le s\le0$, it is $2s$.
Thus its only zero is the endpoint $s=0$:

$$
\{s\in[-L,0]:g_{1\leftarrow2}(T,s)=0\}=\{0\}.
$$

At that positive-range root,

$$
\hat{\mathbf r}=+\mathbf e,
\qquad
D_t=2,
\qquad
D_r=0,
\qquad
S(T)=0.
$$

It is the receiver-side frozen branch already identified in Section 10.9. The
earlier cap interval $[-L,0)$ is not causal on this specified right trace.

The self channel is different: on the same straight ray,

$$
g_{1\leftarrow1}(T,s)=|T-s|-(T-s)=0
\qquad(s<T),
$$

so the retained self history is a same-transmitter characteristic family. It
remains nonordinary under the existing same-transmitter convention.

Claim grade: `derived conditional trace calculation`. It verifies only this
prescribed right trace and does not supply a history-to-solution continuation.
It is falsified by one $s<0$ solving the displayed partner equation for the
given straight-through trace.

Plainly: on the exact straight-through trial, the old partner cap does not
remain as a partner interval after coincidence. The receiver rides only the
coincidence endpoint front; its own retained cap remains a separate
same-transmitter family.

## General right-trace dichotomy for the retained partner cap

Let $\mathbf X_1(0)=\mathbf0$ and let the candidate right trace obey
$\|\mathbf V_1\|\le1$. For $T>0$ and $s\in[-L,0)$,

$$
\left\|\mathbf X_1(T)-\mathbf X_2(s)\right\|
\le
\left\|\mathbf X_1(T)\right\|+(-s)
\le T-s.
$$

Equality, and hence $g_{1\leftarrow2}(T,s)=0$, holds if and only if both
inequalities are equalities. Therefore it requires

$$
\mathbf X_1(T)=-T\mathbf e.
$$

The equality condition does not depend on $s$. Consequently, at each fixed
$T>0$, the retained partner cap has either no root at all or the full interval
$[-L,0)$ as a characteristic family. It cannot generate one isolated older-cap
root.

If the full interval occurs for every $T$ in a nondegenerate right-time
interval, then equality in the path-speed bound forces

$$
\mathbf X_1(T)=-T\mathbf e
$$

throughout that interval. For this exact rebound ray,

$$
\hat{\mathbf r}=-\mathbf e,
\qquad
D_t=D_r=0
$$

for every $s\in[-L,0)$. The inherited partner cap is then a nonordinary
characteristic family, not a frozen simple branch, an atom, or an ordinary
reception.

Claim grade: `derived conditional geometry theorem`. It is falsified by a
ceiling-admissible right trace and an $s\in[-L,0)$ with a partner cap root at
some $T>0$ while $\mathbf X_1(T)\ne-T\mathbf e$.

Plainly: after coincidence, the old partner cap is not automatically carried
along. It disappears from the partner root set on the straight-through ray and
survives only on the exact maximum-speed rebound ray, where it survives as a
whole nonordinary family.

## What the raw-event carrier resolves, and what it does not

The exact mirror raw-event carrier is now defined and its canonical radial
vector pairing is decided in the
[raw event carrier and vector-pairing test](raw-event-carrier-vector-pairing-no-go.md).
The scalar signed source pushforward is zero, but the canonical oriented
factors reinforce because mirror reflection reverses both polarity and arrival
direction. Raw vector cancellation therefore does not assign a zero
acceleration impulse under the current kernel.

A different candidate event completion remains open: truncate the cap family,
form the complete finite local vector sum for each receiver, apply the candidate
event extension of the boundary projection once, and take the effective cutoff
limit. The candidate
value is zero because every truncated local total is forward. Its independence
from label-preserving positive exhaustion and orientation-preserving
parameterization is derived for the candidate event extension of the boundary
projection. Adopting that extension for this nonordinary family remains open. Neither route deletes
source labels or retained source records.

The geometric dichotomy above shows that the post-event partner family depends
on the right trace. A selected continuation cannot be inferred from the event
carrier, swept-source reception, the candidate projected-cutoff completion, or
the zero-impulse data alone. In
particular:

- the endpoint $s=0$ on the straight-through trial is a receiver-side frozen
  branch, to which the proposed swept-source rule assigns no repeated ordinary
  row;
- the old cap interval on the rebound ray is a characteristic family with
  $D_t=D_r=0$, which swept-source reception does not classify; and
- a generic right trace need not retain an old-cap partner root at all.

## Minimum missing event-family datum

To turn the immediate coincidence data into a delayed-system continuation, an
event-family completion must at minimum specify:

1. the right-hand retained history record for each source label;
2. which candidate right traces are admissible after the event; and
3. the ownership and acceleration disposition of a retained characteristic
   interval if a selected right trace produces one.

If it permits the exact rebound ray, it must assign the $D_t=D_r=0$ partner
family as a nonordinary interval. If it selects straight-through motion, the
old partner cap has no right-hand root, but the completion must still provide
that selected history rather than infer it from the zero impulse alone.

No pairwise cancellation of separately receiver-indexed vector contributions
is used here.

## Claim boundary

This note does not prove a continuation, free passage, rebound, a breather,
event uniqueness, or a finite event measure. It does not adopt the proposed
forward-ray cutoff completion. It corrects only the causal
incidence statement: the inherited partner cap is a characteristic family at
exact coincidence, and its right-hand presence is trace-dependent rather than
automatic.

## Closure goal

State and test one event-family completion that supplies a right-hand retained
history and a disposition for a $D_t=D_r=0$ inherited partner characteristic
interval, if that interval is present. Then prove or refute local continuation
within that declared class.
