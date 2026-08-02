# Raw event carrier and mirror vector-pairing test

**Status:** exact mirror-incidence calculation and projected-exhaustion
calculation complete.
**Claim grade:** derived no-go theorem for obtaining equal-and-opposite raw
vectors from the current source polarity, radial propagation geometry, and
receiver kernel; derived zero effective exhaustion value under the candidate
event extension of the boundary projection. No nonordinary-event ownership or
outgoing history is adopted.

## Purpose

This note defines the smallest event-incidence carrier already supported by
the model and tests whether the exact opposite-polarity mirror cap produces a
zero vector wake there. It keeps source provenance, scalar source strength,
arrival direction, and receiver coupling distinct.

## Canonical event-incidence carrier

Put the common incidence event at $(T_{\mathrm c},\mathbf x_{\mathrm c})$
and write the cap lookback time as

$$
\tau=T_{\mathrm c}-s\in(0,L].
$$

Choose a unit vector $\mathbf e$. For the exact mirror cap,

$$
q_1=+q,
\qquad
q_2=-q,
\qquad
\mathbf n_1=+\mathbf e,
\qquad
\mathbf n_2=-\mathbf e,
$$

where $\mathbf n_j$ is the radial direction from source $j$ at emission to
the common event. The event-incidence carrier is

$$
\mathcal C_{\mathrm{event}}
=
(0,L]\times\{1,2\},
$$

with the marks $(q_j,\mathbf n_j)$ and the original source labels retained.
Its label-forgetting scalar pushforward is

$$
d\mu_{\mathrm{scalar}}(\tau)
=
(q_1+q_2)\,d\tau
=0.
$$

This is a valid scalar cancellation. It is not yet a vector wake or a receiver
acceleration.

Plainly: after forgetting which side each wake came from, the positive and
negative source amounts add to zero. The carrier still knows the two arrival
directions, because the Master Equation needs them.

## Vector-pairing no-go theorem

Any receiver-independent radial vectorization compatible with the canonical
line-of-action kernel has the form

$$
d\boldsymbol\mu_{\mathrm{rad}}(\tau)
=
c(\tau)
\sum_{j=1}^2 q_j\mathbf n_j\,d\tau,
\qquad c(\tau)>0,
$$

up to a common positive normalization absorbed into the coupling. Mirror
symmetry acts by

$$
(q_1,\mathbf n_1)
\longmapsto
(q_2,\mathbf n_2)
=
(-q_1,-\mathbf n_1).
$$

Therefore the radial signed vector is even under the mirror map:

$$
q_2\mathbf n_2
=
(-q_1)(-\mathbf n_1)
=
q_1\mathbf n_1,
$$

and hence

$$
\boxed{
q_1\mathbf n_1+q_2\mathbf n_2
=
2q\mathbf e
\ne\mathbf0.
}
$$

Thus the proposed identity
$\mathsf W_+(\tau)+\mathsf W_-(\tau)=\mathbf0$ cannot be derived from a raw
radial vector that preserves the current source polarity and arrival
direction. It would be an additional noncanonical event rule.

Plainly: both the sign and the direction reverse. Two reversals cancel each
other, so the arrows point the same way rather than opposite ways.

## Direct receiver-kernel check

The current pre-coarea vector kernel is

$$
\mathbf K_{ij}
=
\kappa\,\operatorname{sign}(q_jq_i)|q_jq_i|
\frac{c_f}{r^2}\mathbf n_j.
$$

At the common event $r=c_f\tau$. For receiver label $1$, the self and partner
vectors are

$$
\mathbf K_{1\leftarrow1}
=
+\frac{\kappa q^2}{c_f\tau^2}\mathbf e,
\qquad
\mathbf K_{1\leftarrow2}
=
(-1)\frac{\kappa q^2}{c_f\tau^2}(-\mathbf e)
=
+\frac{\kappa q^2}{c_f\tau^2}\mathbf e.
$$

For receiver label $2$, both vectors equal the negative of those vectors.
Consequently,

$$
\boxed{
\mathbf K_{1\leftarrow1}+\mathbf K_{1\leftarrow2}
=
+\frac{2\kappa q^2}{c_f\tau^2}\mathbf e,
}
$$

$$
\boxed{
\mathbf K_{2\leftarrow1}+\mathbf K_{2\leftarrow2}
=
-\frac{2\kappa q^2}{c_f\tau^2}\mathbf e.
}
$$

The two receiver-indexed totals cancel only after summing across the two
different receivers. The Master Equation instead assigns one complete local
ledger to each receiver before that receiver responds. Neither local vector is
zero. Moreover, $D_t=0$ on the cap interval, so these expressions are a
kernel-direction audit rather than finite ordinary receiver rows.

Plainly: the pair as a whole has opposite mirror vectors, but each architrino
sees a forward pile-up in its own local ledger. Cancellation between different
receivers cannot supply either receiver's update.

## Projected-exhaustion theorem

Write the incoming ceiling velocities as

$$
\mathbf V_1=c_f\mathbf e,
\qquad
\mathbf V_2=-c_f\mathbf e,
\qquad
\hat{\mathbf v}_i=\frac{\mathbf V_i}{c_f}.
$$

Let $E\subset(0,L]$ be any measurable carrier truncation bounded away from
zero. After summing both source labels in receiver $i$'s local vector carrier,

$$
\mathbf A_{i,E}
=
\alpha_E\hat{\mathbf v}_i,
\qquad
\alpha_E
=
\frac{2\kappa q^2}{c_f}
\int_E\frac{d\tau}{\tau^2}
\ge0.
$$

The candidate event extension uses the same algebraic projection as the
proposed regular boundary response:

$$
\mathcal P_{\mathbf V_i}(\mathbf A)
=
\mathbf A
-
\bigl(\hat{\mathbf v}_i\mathbin{\cdot}\mathbf A\bigr)_+
\hat{\mathbf v}_i.
$$

Consequently,

$$
\boxed{
\mathcal P_{\mathbf V_i}(\mathbf A_{i,E})
=
\mathbf0
}
$$

for every such $E$ and for both receivers. Therefore, for every
label-preserving positive exhaustion $E_n\uparrow(0,L]$,

$$
\boxed{
\lim_{n\to\infty}
\mathcal P_{\mathbf V_i}(\mathbf A_{i,E_n})
=
\mathbf0.
}
$$

This value is independent of exhaustion shape and of any orientation-
preserving reparameterization of the carrier: those choices alter only the
nonnegative scalar $\alpha_E$, and the boundary response removes every finite
nonnegative multiple of $\hat{\mathbf v}_i$.

Plainly: take any finite piece of the pile-up, add both labeled contributions
seen by one architrino, and then apply the proposed speed-ceiling response.
The result is always zero because the complete vector points only forward.
Changing how the same carrier is labeled or how the endpoint is approached
changes its size, not its direction, so it still projects to zero.

**Claim grade:** `derived algebraic theorem for the candidate event extension
of the proposed boundary projection`. The calculation proves the zero
effective exhaustion value within that extension. It does not adopt the rule
that this exhaustion owns a nonordinary event. The current regular response is
declared only for complete finite ordinary ledgers, whereas the cap interval
is nonordinary and its unprojected total diverges. Extending the projection by
this limit remains new event-family completion data, not raw vector
cancellation.

## Claim boundary

This note proves that scalar source cancellation does not lift to the desired
canonical radial vector identity. It does not rule out an explicitly new raw
event law with different transformation behavior, but such a law would not be
derived from the present Master Equation kernel. It proves the effective zero
limit for every label-preserving positive exhaustion under the candidate event
extension of the boundary projection, but does not adopt that limiting
prescription as the nonordinary event law, select an outgoing trace, or
establish conservation, passage, rebound, or a breather.

## Closure goal

Decide whether the proved complete-local-ledger projected exhaustion is the
event-family completion, and, if adopted, specify its retained-history and
right-trace output without applying the ceiling response separately to
individual wakes.
