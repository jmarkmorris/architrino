# Coincidence Continuation Scratchpad

**Status:** exploratory working notes; not part of the main mathematical
document and not a proposed law.

## Question

After an idealized equal-speed, mirror-collinear partner coincidence with the
proposed zero-impulse event rule, can a labeled pair admit a finite ordinary
causal-wake continuation on an open interval immediately after coincidence?

## Exact straight-through trial

Use normalized equal-speed units $c_a=c_f=1$, put the coincidence at $T=0$,
and take the velocity-preserving outgoing trial

$$
\mathbf X_1(T)=T\mathbf e,
\qquad
\mathbf X_2(T)=-T\mathbf e,
\qquad T>0.
$$

For receiver 1 at $T=\delta>0$ and a source emission from path 2 at
$s\in[0,\delta)$, the causal equation is

$$
\|\mathbf X_1(\delta)-\mathbf X_2(s)\|
=
\delta-s.
$$

The left side is $\delta+s$, so the unique candidate is $s=0$. Its positive
delay is $\delta$, its range is $\delta$, and its transmitter factor is $2$.
If that coincidence-time source record is retained as an admissible later
source, its per-channel magnitude scales as $\delta^{-2}$.

This calculation identifies a candidate obstruction. It does not decide its
sign in the complete ledger, its event ownership, or whether the source record
is admitted under a future nonordinary-event law.

For the declared opposite-polarity convention
$\sigma_{12}=\sigma_{21}=-1$, the exact leading partner terms are

$$
\mathbf a_{1\leftarrow2}(\delta)
=
-\frac{\kappa|q_1q_2|}{2\delta^2}\mathbf e,
\qquad
\mathbf a_{2\leftarrow1}(\delta)
=
\frac{\kappa|q_1q_2|}{2\delta^2}\mathbf e.
$$

Each is opposite its receiver's outgoing velocity. Thus the proposed
path-speed-ceiling response would retain this leading contribution rather than
remove it as forward speed-increasing. This per-channel calculation is exact
for the stated straight trial. It remains insufficient by itself, because the
complete ledger may contain separately owned contributions of the same order.

## Near-straight outgoing traces

Let the one-sided paths be $C^{1,\alpha}$ with the same outgoing velocity
data, so that

$$
\mathbf X_1(\delta)=\delta\mathbf e+O(\delta^{1+\alpha}),
\qquad
\mathbf X_2(s)=-s\mathbf e+O(s^{1+\alpha}).
$$

The speed bound gives $g_{1\leftarrow2}(\delta,0)\le0$, while strict label
separation gives $g_{1\leftarrow2}(\delta,\delta)>0$. Therefore a positive-
delay partner root exists by continuity. Expanding the root equation near
$s=0$ gives

$$
g_{1\leftarrow2}(\delta,s)
=
2s+O(\delta^{1+\alpha})+O(s^{1+\alpha}),
$$

provided the outgoing directions remain nondegenerate. The expected root
scale is consequently $s=O(\delta^{1+\alpha})$, with range asymptotic to
$\delta$ and transmitter factor asymptotic to $2$. The leading geometric
direction is the outward line direction from the partner toward the receiver.

This is a derivation target, not yet a theorem: the error estimate, isolation,
and the corresponding statement in the reverse ordered channel must be proved
in the declared solution class.

## Consequence to test

For opposite polarities, the candidate partner direction is backward relative
to the outward straight-through velocity. If the complete leading ledger has a
nonzero backward coefficient, the path-speed-ceiling response retains it. A
$\delta^{-2}$ retained effective acceleration has divergent receiver-time
variation and is incompatible with a finite-BV velocity continuation.

This is conditional on complete-ledger classification and on the absence of a
separately owned competing stratum or leading cancellation.

## Candidate resolution classes

1. **Cancellation theorem.** Prove that a separately admitted contribution
   cancels the complete leading coefficient. This requires source labels and
   event ownership to be specified; cancellation cannot be assumed from a
   single partner row.
2. **No straight-through continuation theorem.** Prove that any regular
   separating labeled trace has the same nonintegrable retained leading term.
   This would rule out the trial trace, not select a rebound or a bound state.
3. **Nonordinary event interval.** Replace the point-only postulate by a
   separately declared finite event interval with an outgoing retained-history
   record. This is a new law and must explain how the ordinary ledger is
   recovered at its endpoint.
4. **Different near-event geometry.** Prove that a transverse or otherwise
   non-collinear continuation changes the root topology before the singular
   partner term forms. This is a geometry result, not yet available.
5. **Source-event rule.** Specify whether and how the coincidence-time source
   record participates in later receptions. Omitting it without a law would
   break the retained-history ledger; retaining it without further structure
   leads to the candidate obstruction above.

## Next derivations

- Derive the two ordered root asymptotics for a $C^{1,\alpha}$ outgoing pair.
- Derive the signed leading coefficient from the declared polarity convention.
- Classify every contribution of order $\delta^{-2}$ before applying the
  post-summation response.
- Prove or refute a finite-BV continuation under those explicit hypotheses.
