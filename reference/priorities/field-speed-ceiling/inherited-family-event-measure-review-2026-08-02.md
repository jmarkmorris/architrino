# Inherited cap-family event-measure review — 2026-08-02

## Scope and disposition

This is a read-only analysis of the ideal equal-magnitude, opposite-polarity,
mirror-collinear cap approach at its exact coincidence event.  It does not
adopt an event law, alter the Master Equation, or select a continuation.  Its
purpose is to separate three distinct objects that cannot be identified
without new data:

1. the finite labeled source-history measures;
2. the receiver-indexed vector acceleration measures of the ordinary kernel;
3. any proposed common raw-wake object assigned to the shared event in
   absolute time and space.

The central result is negative but useful: the current ordinary vector kernel
does not supply a finite event measure or a vector cancellation.  It gives a
nonisolated characteristic family, and its one-sided receiver-indexed vector
directions reinforce for each receiver.  A finite, cancelling raw event wake
is therefore a possible *new* event-law datum only if a raw propagation object
and an aggregation map are separately defined.

Claim grade: `derived exact-chart geometry and kernel-direction audit`, except
where a paragraph is explicitly labelled `proposed conditional completion`.

## Exact mirror cap coordinates

Put the coincidence at absolute time and position

$$
(T_{\mathrm c},\mathbf x_{\mathrm c})=(0,\mathbf0),
$$

retain $c_f$ symbolically, and let $\mathbf e$ point along the incoming
velocity of label $1$.  On a cap interval $s=-\tau\in[-L,0)$, take

$$
\mathbf X_1(s)=c_f s\mathbf e,
\qquad
\mathbf X_2(s)=-c_f s\mathbf e,
\qquad
q_1=+q,
\qquad
q_2=-q,
$$

with $q\ne0$ and $L>0$.  Thus label $1$ approaches from the negative
$\mathbf e$ direction and label $2$ from the positive direction.  Every
cap emission reaches the shared event at $T=0$.

For receiver $1$ at the event, the self and partner rays are

$$
\begin{aligned}
\mathbf r_{1\leftarrow1}(0,-\tau)&=c_f\tau\mathbf e,
&\hat{\mathbf r}_{1\leftarrow1}&=\mathbf e,\\
\mathbf r_{1\leftarrow2}(0,-\tau)&=-c_f\tau\mathbf e,
&\hat{\mathbf r}_{1\leftarrow2}&=-\mathbf e.
\end{aligned}
$$

Both families satisfy the causal equality, and both have $D_t=0$: they are
nonisolated characteristic intervals, not ordinary simple roots.

## What the current vector kernel says

The declared receiver kernel is

$$
\mathbf K_{ij}(T,s)
=
\kappa\,\operatorname{sign}(q_jq_i)\,|q_jq_i|
\frac{c_f}{r_{i\leftarrow j}(T,s)^2}
\hat{\mathbf r}_{i\leftarrow j}(T,s).
$$

At receiver $1$, direct substitution gives

$$
\begin{aligned}
\mathbf K_{1\leftarrow1}(0,-\tau)
&=+\frac{\kappa q^2}{c_f\tau^2}\mathbf e,\\
\mathbf K_{1\leftarrow2}(0,-\tau)
&=(-1)\frac{\kappa q^2}{c_f\tau^2}(-\mathbf e)
=+\frac{\kappa q^2}{c_f\tau^2}\mathbf e.
\end{aligned}
$$

The two kernel directions reinforce along the incoming velocity of receiver
$1$.  At receiver $2$ they both equal

$$
-\frac{\kappa q^2}{c_f\tau^2}\mathbf e.
$$

Mirror symmetry therefore makes the two *receiver-indexed* directions
opposite between labels; it does not make either receiver's vector sum zero.
The sign reversal from opposite polarity is accompanied by the reversal of
the causal-ray direction.

This does **not** make the displayed quantities ordinary acceleration rows.
The coarea formula would divide them by $|D_t|$, while $D_t=0$ on the full
interval.  The canonical ordinary receiver measure is consequently undefined
on this stratum.  Calling the formal pair a cancellation would be a category
error: it is neither a finite ordinary measure nor a finite pair-total vector.

Falsifier: a change to the declared polarity factor or vector direction in
the Master Equation, or a direct recomputation yielding opposite directions
for the two displayed kernels.

Plainly: the two source signs look opposite only before direction enters.  In
the actual receiver kernel, the second sign reversal comes from the fact that
the two fronts arrive from opposite sides.  The arrows point the same way for
each individual receiver.

## Candidate dispositions

| Candidate | Exact-chart result | Disposition |
| --- | --- | --- |
| Ordinary receiver measure | The cap interval has $D_t=0$ throughout; it is outside isolated-root coarea collapse.  A source-time density built from the current receiver kernel has an endpoint $\tau^{-2}$ singularity. | **Refuted as a finite ordinary event measure.** |
| Swept-source plateau | The post-coincidence $s=0$ front is a plateau and proposed inactive.  The incoming cap interval is instead a jump of the received-history clock at coincidence. | **Does not dispose of the cap interval.**  Jumps remain separately typed nonordinary data. |
| Exact-event raw superposition | The labeled source-history measures each have finite variation on a finite cap interval.  Their scalar signed, label-forgetting pushforward to the event can be zero.  No current law defines that pushforward as a raw *vector wake*, however. | **Undetermined proposed completion, not derived.** |
| Event-owned interval | An event law could own the cap interval once, but the current ordinary kernel gives neither a finite coefficient nor a label-wise response assignment. | **Unmet event-law obligation.** |
| Terminal boundary | The existing ordinary and swept-source rules do not determine a finite event update or open outgoing history. | **Compatible conservative completion, not a derived physical outcome.** |

### Ordinary receiver measure

The partner cap family has a definite receiver-side factor at the incoming
event:

$$
D_r=2c_f.
$$

If one *proposes* to extend swept source through its jump by the natural
source-time expression, the partner contribution has direction
$+\mathbf e$ for receiver $1$ and formal magnitude

$$
\int_0^L
\frac{\kappa q^2}{2c_f^2\tau^2}\,d\tau,
$$

which diverges.  The self cap family is co-moving with $D_r=0$ and is not
the same kind of swept arrival.  These facts reinforce the distinction:
neither the ordinary formula nor swept-source reception currently supplies a
finite joint cap-family event measure.

Falsifier: a completed event measure whose coefficient agrees with the
ordinary kernel on regular split cap histories and remains finite as the
splitting tends to the exact diagonal corner.

### Swept-source reception

Swept-source reception has a precise limited success.  On the outgoing
straight trace it classifies the single persistent partner front at $s=0$ as
an inactive plateau.  It cannot classify an incoming cap interval as a
plateau, because every member of that interval arrives at the event at once:
the selected source clock jumps through the interval.  The present statement
of the law deliberately leaves jump components unowned.

Thus SSR is compatible with either an event completion or a terminal boundary,
but does not choose between them.  It also does not imply that source labels
are erased or that the cap interval is neutralized.

Falsifier: an adopted extension of SSR that assigns all jump components a
unique finite event response from the existing declared data alone.

### Exact-event raw superposition

The canonical labeled source histories are finite on the cap interval:

$$
\mathsf E_1\!\restriction_{[-L,0)}
=q\,\delta_{\mathbf X_1(s)}\,ds,
\qquad
\mathsf E_2\!\restriction_{[-L,0)}
=-q\,\delta_{\mathbf X_2(s)}\,ds.
$$

If one forgets labels and pushes only their scalar signed amounts to the
single shared event, corresponding parameters cancel.  But source labels live
on disjoint typed carriers in the canonical records, so this cancellation is
not an equality of the labeled source measures.  It requires a new aggregation
map from retained labeled records to a common raw-event carrier.

More importantly, scalar cancellation does not determine vector cancellation.
A natural vectorization proportional to signed source strength times the
outgoing ray normal has the same reinforcement found in the receiver kernel.
The ordinary kernel is not itself a raw wake law, but it is an exact
counterexample to any claim that equal-and-opposite scalar source strengths
*alone* force vector cancellation.

Therefore the following is only a proposed conditional completion:

> Define a raw wake carrier, a label-preserving provenance record plus an
> event aggregation map, and a raw propagation map.  If the propagation map
> assigns every mirror-matched cap pair equal-and-opposite raw vector wakes at
> the same absolute time and position, their aggregate raw event wake is zero.
> If, in addition, the proposed event response is zero-preserving, then each
> labeled velocity update at that event is zero.

This does not follow from the Master Equation.  It does not supply any
open-interval continuation, and it leaves retained records intact.

Falsifiers:

1. one matched cap pair with nonzero aggregate raw vector wake under the
   newly defined propagation map;
2. a raw event response that maps a zero raw wake to a nonzero labeled update;
3. a need for source-label deletion rather than a separate aggregate carrier
   to obtain cancellation.

### Event-owned interval and the outgoing family

An event-owned interval rule may declare that the nonisolated cap family is
owned once at coincidence.  It must still specify its coefficient, whether
the event is finite, how its outcome is assigned to both labels, and how the
outgoing retained histories are constructed.  The exact current laws do none
of these.

Even a zero event update does not by itself select a trace for $T>0$. SSR
silences only the single frozen $s=0$ partner front on the prescribed
straight-through trace. On that trace, the older partner cap interval has no
post-coincidence root. On the exact maximum-speed rebound trace, however, the
whole older partner cap interval remains a $D_t=D_r=0$ characteristic family;
on a generic right trace it need not remain at all. An exact-event scalar or
vector cancellation does not select among those right traces or delete their
retained labeled source histories.

Falsifier: a complete outgoing root census plus adopted reception/event law
that classifies every cap-family branch produced by the selected trace and
constructs a compatible retained history on an open right interval.

## Bottom line

The exact cap interval cannot be represented as a finite ordinary
receiver-measure event under the current kernel.  Its labeled source measure
is finite, but scalar signed source cancellation is not a vector-wake theorem
and is not an equality of label-retaining source records.  The current vector
kernel's directions reinforce per receiver.  A raw-event cancellation is
therefore a coherent proposed event law only after its raw carrier,
propagation, aggregation, zero-preserving response, and label assignment are
all supplied. It remains compatible with SSR, but SSR alone neither creates
that cancellation nor selects or constructs the outgoing retained history.
