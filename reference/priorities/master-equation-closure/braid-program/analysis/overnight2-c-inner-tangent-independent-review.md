# Independent reconstruction of the inner-equal tangential exclusion

## Verdict and scope

**Derived verdict:** the [frozen correlated tangential proof](overnight2-c-inner-equal-tangential-bound.md) is correct. Under the selected coefficient-one logarithmic equation, three neutral persistent antipodal unit-polarity pairs with $r_1=r_2=1$, $r_3=b\ge4$, distinct simultaneous positions, common angular rate $\omega\ge0$, and all member speeds at most one have two positively labeled inner receivers, ordered as specified below, for which

$$
A_{1,t}-A_{2,t}\ge\frac4{585}>0.
$$

Consequently at least one of their absolute tangential residuals is at least $2/585$, and an exact configuration on this partial-equality boundary must have $1<b<4$. No defect was found. The proof includes arbitrary phases, zero speed, and outer speed equal to one. It preserves $K_{\log}=c_f=1$, the unchanged transmitter factor, and all thirty directed partner roots with zero positive self roots. It does not decide the remaining $1<b<4$ sector, the outer-equal boundary, arbitrary unequal radii, superfield motion, or stability.

## Complete source orientation and correlated inner sum

Let $v=\omega$ be the common speed of the unit-radius inner members. Distinctness excludes coincidence or antipodality between their positive endpoints. Thus the pair labels can be ordered so the clockwise separation from the first positive endpoint to the second is $\beta\in(0,\pi)$. Set the first phase to zero and the second to $-\beta$ for this geometric calculation; their negative partners are at phases $\pi$ and $\pi-\beta$.

At the first positive receiver, its other positive source is clockwise $\beta$ away, the corresponding negative source is clockwise $\beta+\pi$ away, and its own negative antipode is at $\pi$. At the second positive receiver, those three separations are $2\pi-\beta$, $\pi-\beta$, and $\pi$, respectively. With $B_v$ from the complete equal-radius chart and $Q_v(x)=B_v(x)-B_v(x+\pi)$, all three inner-source rows therefore sum to

$$
2A^{\mathrm{inner}}_{1,t}=Q_v(\beta)-B_v(\pi),\qquad
2A^{\mathrm{inner}}_{2,t}=-Q_v(\pi-\beta)-B_v(\pi).
$$

The tangential components are each measured in their own positive-rotation local frame. Exact circular motion requires both components to vanish, so their scalar difference is a legitimate balance restriction; no identification of their Cartesian frames is assumed. Subtraction cancels the common own-antipode contribution and gives

$$
A^{\mathrm{inner}}_{1,t}-A^{\mathrm{inner}}_{2,t}
=\frac{Q_v(\beta)+Q_v(\pi-\beta)}2
\ge Q_v(\pi/2).
$$

The last inequality is midpoint convexity on the interval between $\beta$ and $\pi-\beta$, using the independently proved strict convexity of the complete paired response. Equality is possible at $\beta=\pi/2$, so the non-strict Jensen bound is correctly stated. No radial or tangential balance assumption enters this comparison.

## Independent rational lower bounds for the paired response

The outer speed condition gives $0\le v\le1/b\le1/4$. At present separation $\pi/2$, the causal equation is $\alpha=\pi/2+2v\sin(\alpha/2)$, whence

$$
\pi/2\le\alpha\le\pi/2+2v<\pi.
$$

Thus $\cot(\alpha/2)>0$, $0<D\le1$, and $\cot(\alpha/2)\ge\cot(\pi/4+v)$. Also $\alpha/2\le\pi/4+1/4<\pi/3$, since $\pi>3$. Therefore $\cos(\alpha/2)>1/2$ and $D\le1-v/2$. These denominator inequalities give lower, not upper, bounds on the positive row factor.

At present separation $3\pi/2$, the complete root has $3\pi/2\le\alpha<2\pi$. Hence $-\cot(\alpha/2)\ge1$, while $0<D\le1+v$. It follows that

$$
-B_v(3\pi/2)\ge\frac1{1+v}.
$$

For the remaining elementary estimates, $\sin v\le v$ and $\cos v\ge1-v^2/2>0$ on this interval imply $\tan v\le f(v):=v/(1-v^2/2)$. Direct differentiation gives $f'(v)=(1+v^2/2)/(1-v^2/2)^2>0$. Since the fractional function $(1-z)/(1+z)$ decreases for $z\ge0$, the addition formula for $\cot(\pi/4+v)$ preserves the following lower bounds.

For $0\le v\le1/8$, $f(v)\le16/127$, so $\cot(\pi/4+v)\ge111/143$. Since $D\le1$ at the first angle,

$$
B_v(\pi/2)\ge\frac{111}{143}>\frac34,
\qquad
-B_v(3\pi/2)\ge\frac89>\frac45.
$$

Here $4\cdot111-3\cdot143=15>0$ and $5\cdot8-4\cdot9=4>0$ verify the strict rational comparisons. Thus $Q_v(\pi/2)>31/20>836/585$; the last comparison has positive cross-multiplied difference $31\cdot585-20\cdot836=1415$.

For $1/8\le v\le1/4$, $f(v)\le8/31$, so $\cot(\pi/4+v)\ge23/39$. Now the improved factor bound gives $D\le1-v/2\le15/16$, and therefore

$$
B_v(\pi/2)\ge\frac{23}{39}\frac{16}{15}=\frac{368}{585},
\qquad
-B_v(3\pi/2)\ge\frac45=\frac{468}{585}.
$$

Adding yields $Q_v(\pi/2)\ge836/585$. The two closed intervals cover every permitted inner speed, including zero, the shared splitting point, and $1/4$. All angle roots and factor bounds used here belong to the complete chart; no numerical root approximation or speed sample was used.

## Independent reconstruction of both outer geometric bounds

At a unit-radius inner receiver rotated to $x=(1,0)$, an outer emission point is $z=b(\cos\theta,\sin\theta)$. The chord delay and transmitter factor are

$$
\tau^2=1+b^2-2b\cos\theta,\qquad
D=1+\frac{vb\sin\theta}{\tau}.
$$

The first square identity follows by direct expansion:

$$
\tau^2-b^2\sin^2\theta=(b\cos\theta-1)^2\ge0.
$$

It gives $|b\sin\theta|\le\tau$, hence $D\ge1-v>0$. Equivalently, with $n=(x-z)/\tau$ and source velocity $v_s=\omega Jz$, one has $n\cdot v_s=\omega n\cdot Jx$, because $n\cdot J(x-z)=0$. This makes explicit why the lower factor bound is controlled by the inner receiver speed and survives an outer source speed of one.

For the second identity set $A=1+b^2$ and $c=\cos\theta$. Expanding its left side gives

$$
(A-2bc)^2-(b^2-1)^2(1-c^2)
=A^2c^2-4Abc+4b^2=(Ac-2b)^2\ge0.
$$

Since $b>1$ and $\tau^2>0$, taking nonnegative square roots gives $\tau^2\ge(b^2-1)|\sin\theta|$. Thus, including the case $\sin\theta=0$ without dividing by it, the exact signed outer row obeys

$$
|A_t|=\frac{b|\sin\theta|}{\tau^2D}
\le\frac{b}{(b^2-1)(1-v)}
\le\frac{b^2}{(b-1)^2(b+1)}.
$$

The last inequality uses $v\le1/b$, so $1-v\ge(b-1)/b$. This is the full tangential component of the logarithmic row; it has no additional half factor. The half factor in the unit-radius equal-source chart has already been accounted for separately in the inner contribution.

Two outer sources occur at each of the two selected receivers, for four directed rows in their difference. Triangle inequalities therefore bound the magnitude of their total effect on that difference by $4g(b)$, where $g(b)=b^2/[(b-1)^2(b+1)]$. Direct logarithmic differentiation gives

$$
\frac{g'(b)}{g(b)}=\frac2b-\frac2{b-1}-\frac1{b+1}
=-\frac{b^2+b+2}{b(b-1)(b+1)}<0.
$$

Hence $4g(b)\le4g(4)=64/45$ throughout $b\ge4$. The two polarities and their potentially different emission times have been bounded individually; no cancellation or correlation among the outer rows was presumed.

## Complete residual comparison and census

Combining the correlated inner lower bound with the absolute bound on the outer difference gives

$$
A_{1,t}-A_{2,t}\ge\frac{836}{585}-\frac{64}{45}
=\frac{836-832}{585}=\frac4{585}.
$$

The triangle inequality then gives $2\max(|A_{1,t}|,|A_{2,t}|)\ge|A_{1,t}-A_{2,t}|\ge4/585$. Prescribed circular motion has zero tangential acceleration, so these are already tangential balance residuals. The resulting $2/585$ component margin contradicts exactness.

At either chosen inner receiver, the three inner rows and two outer rows exhaust all five partner sources. The complete closed-subfield root theorem gives one ordinary positive-delay root per distinct directed partner and no positive self roots, for thirty partner and zero self roots in the six-member system. The receiver factor bound here is at least $1-v\ge3/4$, even when outer speed reaches one. The other channels retain the independently checked closed-subfield root census. No outer-radius bound from a strictly ordered family, finite-history cutoff, or omitted ordinary hit is needed.

## Hand controls, falsifiers, and provenance

At zero speed, the independently known chart gives $Q_0(x)=2\csc x$. The correlated inner difference is then $2\csc\beta\ge2$, agreeing with Jensen's value $Q_0(\pi/2)=2$ and comfortably exceeding the rational lower bound used above. For the outer identities, $\theta=0$ makes the physical tangential component zero and both displayed square relations reduce to direct radial-chord identities. These are hand controls of geometry and constants, not new numerical target runs.

The conclusion would be falsified by an incorrectly oriented inner-source list, failure of the independently checked convexity, a reversed factor inequality in the positive first-angle row, an invalid square identity, or omission of one of the four directed outer rows. An exact distinct configuration in the declared sector with $b\ge4$ would contradict the complete residual margin. The result does not rely on a previously assumed failure of balance at either selected receiver.

The frozen subject SHA-256 measured with `shasum -a 256` was `ab5321213d52347a5deb0eece7f4bd057c42be5c9b069d267ea6f7719d385be0`. The live clock returned 2026-10-07 08:36:53 UTC at review start. The allocation retains its original launch 03:25:15 UTC, exploration stop 13:55:15 UTC, and hard deadline 15:25:15 UTC.

Only this new independent-review Markdown file was written. The subject, main report, prior reviews and certificates, shared owners and other agents' files were preserved. No numerical target, background worker, recursive delegation, other-chat message, Git mutation, or automation change was performed. This completes the assigned review; the parent owns integration.
