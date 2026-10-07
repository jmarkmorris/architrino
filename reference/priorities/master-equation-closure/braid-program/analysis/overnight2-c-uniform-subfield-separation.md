# Uniform separation through the subfield wake-speed boundary

## Statement

Claim grade: derived, pending independent reconstruction. Consider exact complete circular histories of three fixed neutral antipodal unit-polarity pairs under the logarithmic inverse-distance equation, with $K_{\log}=c_f=1$, unchanged transmitter factor and every ordinary positive-delay hit. Normalize $r_1=1<r_2<r_3<35$, take a common center, plane and angular rate, and require $u r_3<1$, where $u=|\omega|$. There exists a constant $d_*>0$ such that every exact configuration in this class has every simultaneous distinct-member separation at least $d_*$.

Unlike the preceding [collision theorem](overnight2-c-collision-speed-boundary.md), this assertion requires no fixed margin below wake speed. The proof below removes the simultaneous collision/wake-speed limit left by that theorem. The value of $d_*$ remains uncomputed. No exact reference, numerical whole-domain exclusion, stability or actual-time continuation is claimed.

The earlier independently checked finite outer-radius bound supplies the value thirty-five. The collision argument itself uses only a fixed finite upper radius bound and the radius-one normalization. It preserves all thirty partner roots and absence of positive self roots in each strictly subfield configuration. It uses the boundary only as a limit of such configurations, not as a new selected response law.

## Noncolliding rows remain regular at the closed speed boundary

Let reception positions be $x_i$, let $J$ rotate planar vectors by ninety degrees, and write $X_i(t)=R(\omega t)x_i$. For one row set $z=X_j(-\tau)$, $\tau n=x_i-z$, $|n|=1$, and

$$
D=1-n\cdot\omega Jz,
\qquad A_{ij}=q_iq_j\frac{n}{\tau D}.
$$

Every strictly subfield source gives a strictly decreasing distance-minus-delay function. Each distinct-member channel has exactly one positive root, no self channel has a positive root, and every partner root has $D>0$. Every delay lies below $r_i+r_j<70$.

Consider a convergent parameter sequence whose limit has all speeds at most one and whose receiver and source remain at distinct present positions. The causal triangle inequality gives $\tau\ge|x_i-x_j|/2$, so its limiting delay is positive. The source factor cannot vanish there. Indeed, $D=0$ and source speed at most one would require source speed exactly one and $n$ parallel to its velocity. Then $n\perp z$, and the chord gives

$$
|x_i|^2=|z+\tau n|^2=|z|^2+\tau^2>|z|^2.
$$

But $u|z|=1$ and $u|x_i|\le1$ imply $|x_i|\le|z|$, a contradiction. Compactness therefore bounds every row whose present separation has a positive limiting lower bound, even if the limiting outer speed is one. No generic fold assumption is needed.

Conversely, if source and receiver tend to the same present point, their positive delay tends to zero. Otherwise a positive limiting delay would solve the same-circle self equation

$$
\tau=2a|\sin(u\tau/2)|<a u\tau\le\tau,
$$

which is impossible for $u>0$; at $u=0$ the chord is zero and the same contradiction is immediate. Since $D\le2$, the unsigned row norm $1/(\tau D)$ then tends to infinity.

## Reduction to one three-member cluster and its antipode

Suppose exact configurations had minimum separation tending to zero. Pass to a convergent subsequence of all reception positions, angular rates and fixed labels. Group labels by identical limiting present position. Every collision cluster contains at most one member of each antipodal pair, because each pair retains separation $2r_a\ge2$.

A cluster with exactly two members is impossible. Its one internal received row diverges in norm, while every row from outside that cluster is bounded by the preceding argument and the required circular acceleration is bounded. Thus no exact receiver equation can hold there.

Any remaining cluster has exactly three members, one from each pair. Their antipodes form the other cluster, and all three radii tend to one. The preceding independently reconstructed [collision restriction](overnight2-c-collision-independent-review.md) gives $u r_3\to1$ for a collision sequence, so here $u\to1$. Equivalently, its fixed-speed-margin proof excludes any subsequence with smaller limiting speed. The two cluster positions tend to $x_*$ and $-x_*$, with $|x_*|=1$. All rows joining these two clusters remain bounded. Every internal row has delay tending to zero.

The cluster polarities are either all equal or mixed. The proof must cover both cases and allow arbitrary ratios among its three internal separation scales.

## Exact inverse of an unsigned circular response

Fix a receiver position $x$, positive angular rate $\omega$ and receiver velocity $v=\omega Jx$ with $|v|<1$. Reflection permits positive rotation without changing the question. For any source hit, $z=x-\tau n$, so

$$
D=1-n\cdot\omega Jz=1-n\cdot v.
$$

This is an identity for the actual transmitter factor in common circular rotation, not a receiver multiplier inserted into the law. Remove the unit polarity product and write $k=n/(\tau D)$. Its amplitude is positive. Thus

$$
n=\frac{k}{|k|},\qquad
\tau=\frac1{|k|-v\cdot k},\qquad
Y(k)=R(\omega\tau)(x-\tau n).
$$

The map $Y$ recovers the present source position exactly. It is defined for every nonzero $k$ when $|v|<1$. With $P=I-nn^{\mathsf T}$, differentiation at fixed receiver data gives

$$
d\tau=-\tau^2(n-v)^{\mathsf T}dk,\qquad dn=\tau DP\,dk,
$$

$$
DY(k)=\tau^2 R(\omega\tau)
\left[(n-v+\omega\tau Jn)(n-v)^{\mathsf T}-DP\right].
$$

The lack of a denominator $D$ in this derivative is useful, but is not by itself a uniform cancellation estimate. The next bounds compare it to the actual present separation.

## A relative inverse estimate uniform as speed approaches one

In the three-member collision limit, eventually $1/2\le\omega\le1$, $1/2\le|v|<1$, and every internal delay is below one. The upper angular-rate bound follows from the radius-one normalization and strict subfield speed. Use these bounds in the following local inverse estimate.

For an arbitrary response vector along a segment where $0<\tau\le1$, let

$$
\bar v=\frac{x-R(-\omega\tau)x}{\tau},\qquad
L=|n-\bar v|=\frac{|Y(k)-x|}{\tau},\qquad d(k)=|Y(k)-x|.
$$

The average velocity magnitude is $|\bar v|=|v|\operatorname{sinc}(\omega\tau/2)$, where $\operatorname{sinc}(s)=\sin s/s$ with its continuous value at zero. For $0\le s\le1/2$, the elementary sine upper bound gives

$$
1-\operatorname{sinc}(s)\ge\frac{s^2}{7}.
$$

Indeed $\sin s/s\le1-s^2/6+s^4/120$, and $1/6-1/480=79/480>1/7$. Therefore

$$
L\ge1-|\bar v|\ge(1-|v|)+\frac{\tau^2}{224},
\qquad d(k)\ge\frac{\tau^3}{224}.
$$

The average velocity differs from the reception velocity by at most $\tau/2$: circular acceleration has magnitude $\omega|v|\le1$. Hence $|n-v|^2\le2L^2+\tau^2/2$. The exact identity $2D=|n-v|^2+1-|v|^2$, together with $L\le2$, now gives

$$
D\le L^2+\frac{\tau^2}{4}+(1-|v|)\le59L=\frac{59d(k)}{\tau}.
$$

Also $|n-v|^2\le2D$. Taking the operator norm of the exact inverse derivative yields

$$
\|DY(k)\|\le\tau^2\left(3D+\tau\sqrt{2D}\right)
\le177\tau d(k)+\sqrt{118}\,\tau^{5/2}\sqrt{d(k)}
\le340\tau d(k).
$$

The last inequality uses $d(k)\ge\tau^3/224$ and $\sqrt{118\cdot224}<163$. These constants are deliberately loose; their role is a uniform factor tending to zero with the delay, not an optimal separation estimate.

Now let $k_1,k_2$ be two actual internal unsigned rows at the same receiver, assume $|k_2-k_1|\le M$ for a fixed $M$, and let their first delay $\tau_1$ tend to zero. Set $k(t)=k_1+t(k_2-k_1)$ for $0\le t\le1$. Because $|k_1|\ge1/(2\tau_1)\to\infty$, this segment avoids zero eventually. The function $f(k)=|k|-v\cdot k$ is two-Lipschitz, and $f(k_1)=1/\tau_1$. Consequently $\tau(t)=1/f(k(t))\le2\tau_1$ for all $t$ once $2M\tau_1\le1/2$. The entire segment is inside the inverse domain and has $\tau(t)\le1$ eventually; it need not correspond to a source remaining in the original parameter box, which the inverse estimate does not require.

The derivative bound and $d(t)>0$ give

$$
\left|\frac{d}{dt}d(t)\right|\le680M\tau_1d(t).
$$

Integrating this differential inequality and then the source-position derivative proves

$$
|Y(k_2)-Y(k_1)|
\le d(0)\left(e^{680M\tau_1}-1\right)=o(d(0)).
$$

Thus bounded difference of two diverging internal response vectors forces the separation of their source positions to be negligible relative to either source's separation from that receiver. This statement is uniform at wake speed and does not assume the cluster's three distances have comparable scales.

## Mixed-polarity clusters cannot balance

If the three cluster polarities are mixed, let $i,j$ be the two majority-polarity members and let $k$ be the minority member. At receiver $i$, all outside-cluster rows and the required circular acceleration are bounded, so its exact equation implies

$$
k_{ij}-k_{ik}=O(1),
$$

where each $k_{ab}$ denotes the unsigned actual row from source $b$ to receiver $a$. The relative inverse estimate gives

$$
|x_j-x_k|=o(|x_i-x_j|).
$$

The other majority receiver supplies $k_{ji}-k_{jk}=O(1)$ and therefore

$$
|x_i-x_k|=o(|x_j-x_i|).
$$

The triangle inequality now contradicts both statements, because the nonzero distance $|x_i-x_j|$ cannot be bounded above by two quantities that are each negligible relative to itself. This eliminates the mixed case without choosing a smallest-distance hierarchy or assuming reciprocal received rows.

## Equal-polarity clusters cannot balance

Suppose all three cluster polarities agree. Choose its largest-radius receiver, whose radius $a$ is the global outer radius. Each internal source has radius $b\le a$ and positive polarity product. At its causal root, its radial row is

$$
k_r=\frac{a^2-b^2+\tau^2}{2a\tau^2D}\ge\frac1{2aD}>0.
$$

The complete internal radial sum is bounded because the outside rows and required circular acceleration are bounded. Both positive internal radial rows must therefore be bounded individually, and both factors have a uniform positive lower bound. Their full norms nevertheless diverge since their delays tend to zero. Their chord radial components consequently tend to zero.

In the receiver's orthonormal radial/tangential frame the chord direction must thus tend to one of the two tangential unit directions. The identity $D=1-u a n_t$, with $u a\to1$ and a positive lower factor bound, excludes the positive tangential direction. Both internal chord directions tend to the negative tangential direction, so both tangential rows tend to minus infinity. Their sum cannot be canceled by the bounded outside rows and zero required tangential acceleration. This excludes the equal-polarity case.

## Conclusion and verification boundary

Every hypothetical collision sequence has now been excluded: a two-member limiting cluster by its single divergent row, a three-member mixed cluster by the relative inverse estimate and triangle inequality, and a three-member equal-polarity cluster by its outer receiver's radial and tangential signs. If a uniform positive $d_*$ did not exist, a sequence with minimum separation tending to zero would supply one of these contradictions. This proves existence of $d_*$ conditional on independent verification of the new argument.

Combined with the previous finite-radius and positive-angular-rate restrictions, this removes collision as a missing boundary in a compact-closure analysis. The surviving closure may include equal radii with distinct endpoint positions and an outer speed equal to one. Its noncolliding partner rows are regular by the first lemma, but no existence or nonexistence verdict on that compact closure is supplied here. No numerical value of $d_*$, positive angular-rate infimum or uniform factor floor has been computed, and no old cover is expanded.

This is an analytic proof; no numerical search, approximate candidate or saved residual is a premise. The exact inverse, uniform constants, response-segment domain, two majority equations and same-polarity signs require independent reconstruction. Falsifiers are a noncolliding closed-subfield root with zero factor, a positive limiting self delay at speed at most one, an error in the inverse derivative, failure of its relative bound along the full response segment, a bounded-cancellation pair violating the relative conclusion, a missed cluster polarity case, or an exact bounded-radius collision sequence. In particular, checking the inverse only at its endpoints would not establish the segment argument.
