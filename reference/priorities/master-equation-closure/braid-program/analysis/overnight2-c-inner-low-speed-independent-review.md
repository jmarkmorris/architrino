# Independent review of the inner-equal low-speed exclusion

## Verdict and frozen domain

**Derived verdict: supported; no mathematical defect found.** For distinct circular members with $r_1=r_2=1$, $2\le b=r_3\le4$ and $0\le\omega\le1/80$, the ordered positive inner receivers have tangential acceleration difference at least $55/912$. At least one absolute tangential balance residual is at least $55/1824$, precluding exact circular balance throughout this rectangle and for every noncollision phase configuration.

The subject is [the frozen low-speed note](overnight2-c-inner-equal-low-speed.md). Its SHA-256 measured with `shasum -a 256` is `38873d09b1128e754ee7901a0d2c29a897a9becffc35529b7fcbfd284dae72ba`, matching the supplied identity. The law is the selected coefficient-one logarithmic law with $K_{\log}=c_f=1$, unchanged transmitter factor, persistent unit polarities and complete circular histories. This independent reconstruction uses the live Ramon E. Moore lens. The clock tool returned 2026-10-07 09:42:10 UTC at review start; the original exploration stop 13:55:15 UTC and hard deadline 15:25:15 UTC remain unchanged. Only this new review is written, and no numerical instrument or target is run.

## Inner inventory and its lower bound

Order the positive inner phases as $0,-\beta$ with $0<\beta<\pi$, and put $v=\omega$. At the first receiver, the other inner neutral pair contributes $Q_v(\beta)/2$ tangentially; at the second it contributes $-Q_v(\pi-\beta)/2$. Their own-antipode contributions are identical $-B_v(\pi)/2$. Thus the complete inner difference is

$$
L=\frac{Q_v(\beta)+Q_v(\pi-\beta)}2.
$$

The [previously independently reconstructed convexity theorem](overnight2-c-tangential-convexity-independent-review.md) gives $Q_v''>0$ on $(0,\pi)$ for all $0\le v\le1$. Jensen's inequality therefore yields $L\ge Q_v(\pi/2)$ for this much smaller speed interval, without requiring a phase-separation floor.

For the complete inner angle chart, $\gamma=\alpha-2v\sin(\alpha/2)$ and $D=1-v\cos(\alpha/2)$. At $\gamma=\pi/2$ the root satisfies $\pi/2\le\alpha\le\pi/2+2v<\pi$. Its cotangent is positive, and $D\le1$. Hence

$$
B_v(\pi/2)\ge\cot(\pi/4+v).
$$

On $0\le v\le1/80$, $\sin v\le v$ and $\cos v\ge1-v^2/2\ge1/2$ give $t=\tan v\le2v<1$. The exact identity $\cot(\pi/4+v)=(1-t)/(1+t)$ and the difference

$$
\frac{1-t}{1+t}-(1-2t)=\frac{2t^2}{1+t}\ge0
$$

give $B_v(\pi/2)\ge1-4v$. At $\gamma=3\pi/2$, the emission angle is at least $3\pi/2$ and remains below $2\pi$, so the negative cotangent has magnitude at least one, while $D\le1+v$. Therefore $-B_v(3\pi/2)\ge1/(1+v)\ge1-v$. These signs prove the stated uniform lower bound

$$
L\ge Q_v(\pi/2)\ge2-5v.
$$

## Independent static neutral-pair sum

At a unit receiver, a static positive radius-$b$ source at counterclockwise angle $\theta$ contributes $-b\sin\theta/(1+b^2-2b\cos\theta)$ tangentially. Its negative antipode contributes $-b\sin\theta/(1+b^2+2b\cos\theta)$. Adding these two signed rows gives

$$
G^{(0)}_t(\theta)=-\frac{2b(b^2+1)\sin\theta}{(b^2-1)^2+4b^2\sin^2\theta}.
$$

For $s=|\sin\theta|$, the identity $(b^2-1-2bs)^2\ge0$ gives a denominator lower bound $4b(b^2-1)s$. If $s>0$, division yields $|G^{(0)}_t|\le(b^2+1)/(2(b^2-1))$; if $s=0$, the response is zero. The bound decreases with $b>1$ and equals $5/6$ at $b=2$. The absolute difference between the two receivers' complete static outer-pair contributions is consequently at most $5/3$.

The static bound holds for each whole neutral pair, before bounding the two-receiver difference. It does not treat the individual static source rows as independently adjustable, and it assumes no static balance. The bound need not be attained at every $b$ to be valid.

## Exact inversion identity and moving-row error

Keep each receiver at the same reception point in the moving and static comparisons. For one outer source, write $p=x-y(-\tau)$, $p_0=x-y(0)$, $|p|=\tau$ and $|p_0|=d\ge b-1>0$. Its constant circular speed is $w=vb\le1/20$. Integrating source speed over the full delay gives $|p-p_0|\le w\tau$, without a short-delay approximation.

For any two nonzero Euclidean vectors, expanding the squared norm gives

$$
\left|\frac p{|p|^2}-\frac{p_0}{|p_0|^2}\right|^2
=\frac{|p|^2+|p_0|^2-2p\cdot p_0}{|p|^2|p_0|^2}
=\frac{|p-p_0|^2}{\tau^2d^2}.
$$

Thus the inversion difference is at most $w/d$. The actual transmitter factor is still $D=1-n\cdot v_s$, so $D\ge1-w$ and $|D-1|\le w$. For either polarity $\sigma=\pm1$, the difference between the complete moving row and the static row decomposes exactly as

$$
A-A^{(0)}=\sigma\left[\frac1D\left(\frac p{\tau^2}-\frac{p_0}{d^2}\right)+\frac{p_0}{d^2}\left(\frac1D-1\right)\right].
$$

Each term has norm at most $w/[d(1-w)]$, giving

$$
|A-A^{(0)}|\le\frac{2w}{d(1-w)}\le\frac{2vb}{(b-1)(1-vb)}.
$$

This calculation includes the entire factor difference; it does not replace the target history or silently set $D=1$. The source's antipode has its own delay and receives the same separate estimate. Two sources at each of two receivers make four rows. Projection on each receiver's local tangent does not increase the norm, and subtraction of the two receiver responses is bounded by the sum of those four errors. Consequently the total comparison error is at most

$$
\frac{8vb}{(b-1)(1-vb)}\le\frac{16v}{1-4v},
$$

using $b/(b-1)\le2$ and $vb\le4v$ for $2\le b\le4$. All denominators are positive, including the rectangle's endpoints.

## Exact margin and complete census

Combining the inner lower bound, static pair-difference cap and moving-row error gives

$$
A_{1,t}-A_{2,t}\ge\frac13-5v-\frac{16v}{1-4v}.
$$

The right side decreases with $v$ because the subtracted terms have derivatives $5$ and $16/(1-4v)^2>0$. Its value at $v=1/80$ is

$$
\frac13-\frac1{16}-\frac4{19}
=\frac{304-57-192}{912}=\frac{55}{912}>0.
$$

For any two real tangential components, their maximum absolute value is at least half the absolute difference. This proves $55/1824$ for at least one component. Required circular acceleration is radial, so no additional tangential term is missing from the residual. In conjunction with the independently reviewed $b\ge4$ exclusion, exact inner-equal configurations with $b\ge2$ necessarily have $b<4$ and $\omega>1/80$.

The speed bounds are strictly subfield throughout: inner speed is at most $1/80$ and outer speed at most $1/20$. Distinct circular positions therefore have the full thirty ordinary positive partner roots and zero positive self roots by the reviewed root theorem. The selected two receivers each retain all three inner and both outer source rows. The other equations need not be tested once these two necessary tangential equations are incompatible. At zero angular rate the delays remain positive static distances, and the comparison error vanishes; no positive-root contribution is lost by taking that endpoint.

## Controls and verification limits

Analytical hand controls are $v=0$, where $Q_0(\beta)=2/\sin\beta$ gives $L\ge2$ and the moving/static error vanishes; $\theta=0$, where the static pair tangential sum is zero; and $\theta=\pi/2$, where it is $-2b/(b^2+1)$. The inversion identity is independently verified by the exact norm expansion above. The four-row count and rational subtraction were checked directly, without a new instrument or reuse of numerical targets.

The result excludes only the stated inner-equal low-speed rectangle, and the combined necessary speed condition uses the previously checked large-$b$ theorem. It does not settle $1<b<2$, higher speeds with $2\le b<4$, the outer-equal family, general unequal radii, stability or actual-time continuation. A wrong static polarity sign, failure of the inversion identity, an omitted factor-difference term, a root beyond the accounted census, or fewer than four moving-row errors would invalidate the relevant estimate. An exact configuration in the declared rectangle would falsify the exclusion. The frozen subject and all prior evidence remain unchanged; parent integration is separate. This completes the assigned review.
