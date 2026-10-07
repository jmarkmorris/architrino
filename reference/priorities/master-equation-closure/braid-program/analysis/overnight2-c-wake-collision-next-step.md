# The remaining simultaneous collision and wake-speed boundary

## Current question

This is ongoing research, not an exclusion theorem. The [checked collision restriction](overnight2-c-collision-independent-review.md) requires any exact subfield collision sequence to approach wake speed at its closest cluster's limiting outermost radius. The new explicit inner/middle separation proof supplies a cubic relation to the outer radius when that particular pair approaches coincidence. These restrictions leave simultaneous collision and wake-speed approach unresolved. The next deciding question is whether the actual circular source factors permit the divergent nearby contributions to cancel across all six receiver equations.

Keep the original coefficient-one logarithmic law, $c_f=1$, fixed neutral antipodal pairs, complete circular histories and all ordinary roots. This note develops exact geometry and a local expansion for that same class. Neither a constant-velocity replacement at wake speed nor a continuation through coincidence is selected. The identities below have been derived by the parent; separate reconstruction is still required before a consequential exclusion relies on them.

## Exact inverse of one received row in common rotation

At reception time zero fix receiver position $x$, angular rate $\omega>0$ and receiver velocity $v=\omega Jx$, where $J$ rotates by ninety degrees. Let a source emit from $z=x-\tau n$, where $|n|=1$ and $\tau>0$. Because all paths share rigid rotation, its emission velocity is $\omega Jz$. Therefore the source factor has the exact receiver-based representation

$$
D=1-n\cdot\omega Jz=1-n\cdot v.
$$

The term containing $n\cdot Jn$ vanishes. This identity does not insert a receiver response factor; it rewrites the actual source factor using this particular geometry. If $|v|<1$, then $D>0$ for every positive-delay root, even if that source has a larger circular speed.

Remove the unit polarity product from one acceleration contribution and call the resulting vector $k=n/(\tau D)$. It has positive amplitude, so

$$
n=\frac{k}{|k|},\qquad
\tau=\frac1{|k|-v\cdot k}.
$$

The source's present position is determined exactly by

$$
y=R(\omega\tau)(x-\tau n),
$$

where $R(\alpha)$ is planar rotation by $\alpha$. Thus equal unsigned response vectors at the same subfield receiver determine the same present source position. This extends the injectivity observation used in the constant-velocity cluster limit to an exact inverse for common circular rotation. It does not by itself prove that two nearly equal large contributions cannot balance contributions from other members.

For later estimates the derivative of this inverse, at fixed $x,\omega$, is explicit. With $P=I-nn^{\mathsf T}$,

$$
d\tau=-\tau^2(n-v)^{\mathsf T}dk,\qquad dn=\tau D P\,dk,
$$

$$
\frac{\partial y}{\partial k}
=\tau^2 R(\omega\tau)
\left[(n-v+\omega\tau Jn)(n-v)^{\mathsf T}-DP\right].
$$

Although solving a causal root directly becomes poorly conditioned near zero $D$, this inverse derivative has no explicit division by $D$. That is a proposed route to controlling near-cancellation. A useful estimate must still be uniform over the segment between the relevant response vectors and compatible with every separation scale in the cluster. Those requirements have not been proved here.

## Why the previous constant-velocity limit is not uniform

For a source on radius $b$, receiver radius $a$, present phase difference $\delta$ and positive delay $\tau$, the exact squared gap is

$$
G(\tau)=\tau^2-(a-b)^2-4ab\sin^2((\delta-\omega\tau)/2).
$$

Put $h=b-a$ and $\mu=1-\omega^2ab$. For small $\delta-\omega\tau$, elementary Taylor expansion gives

$$
G(\tau)=\mu\tau^2+2\omega ab\delta\tau-ab\delta^2-h^2
+\frac{ab}{12}(\delta-\omega\tau)^4
+O\!\left(ab|\delta-\omega\tau|^6\right).
$$

In the strictly subfield region $\mu>0$, but it can vanish at the unresolved boundary. The quadratic term can then be comparable to the quartic curvature term. Depending on the relative scales of $\mu$, $h$ and $\delta$, positive causal delays need not remain proportional to simultaneous separation. The earlier cluster proof deliberately required a fixed speed margin to obtain that proportionality; replacing it by the same constant-velocity kernel at speed one would therefore be unjustified.

This expansion is a local algebraic guide, not a root certificate. A deciding argument must either keep the exact trigonometric gap or give a signed remainder bound, separate all scaling regimes without gaps, and retain the entire positive-root interval. It must also bound sources outside the smallest cluster: those sources can approach the same wake-speed boundary on a larger spatial scale, and their source factors may become small. Calling them bounded merely because their distance divided by the minimum distance diverges is not justified without a new uniform estimate.

## Next selected step and stopping boundary

Investigate whether the exact inverse-row derivative gives a uniform comparison between cancellation error and source separation for a closest two- or three-member cluster as receiver speed tends to one from below. Distinguish a two-outer-pair cluster with the inner pair at a positive radial distance from a three-pair cluster with all radii tending to one. Use the explicit separation inequalities to constrain the latter. If the inverse route fails, record the exact failing scale relation and examine the exact squared gap with a controlled remainder; do not enlarge the old interval-cover budget.

This remains within the original ordered-radius boundary assignment. No new CPU allocation is selected, no case is claimed excluded by this note, and the current exploration stop and hard deadline remain unchanged. A future successful estimate must receive independent reconstruction before it is added to the checked findings. A counterexample to the inverse formula, an invalid uniform derivative bound, an omitted scale regime or an uncontrolled outside-cluster row would invalidate the proposed route.
