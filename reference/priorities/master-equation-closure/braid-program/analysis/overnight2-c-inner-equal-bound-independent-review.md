# Independent reconstruction of the inner-equal outer-radius restriction

## Verdict and complete domain

**Derived verdict:** the [frozen inner-equal boundary proof](overnight2-c-inner-equal-outer-bound.md) is correct. In the distinct-member three-neutral-antipodal-pair circular class with $r_1=r_2=1$, $r_3=b\ge12$, common angular rate $\omega\ge0$, all speeds at most one, $K_{\log}=c_f=1$, unchanged transmitter factor, and complete histories, at least one positive inner receiver satisfies

$$
F_r\le-\frac{13115}{226512}<0.
$$

Consequently an exact configuration on this partial-equality boundary must have $1<b<12$. No defect was found. The proof includes every outer phase and the endpoint where outer speed equals one, without borrowing a strictly ordered outer-radius bound. It neither decides the remaining interval $1<b<12$ nor the other partial-equality boundary, arbitrary unequal radii, superfield motion, or stability.

## Independent clockwise selection and inner-source inventory

Let $v=\omega$ be the common inner speed; then $0\le v\le1/b<1$. The two positive inner endpoints cannot coincide or be antipodal, since either case would make two persistent labels occupy the same position. Of their two directed clockwise separations, exactly one therefore lies in $(0,\pi)$. Relabel the pairs for this static calculation so receiver candidate one has phase zero and the other positive endpoint has phase $-\beta$, with $0<\beta<\pi$.

Choose that second positive endpoint, at phase $-\beta$, as the actual receiver. Direct phase subtraction gives its complete three inner sources:

| Inner source | Polarity product | Clockwise present separation |
|---|---|---|
| Other positive endpoint at phase zero | $+1$ | $2\pi-\beta$ |
| Other negative endpoint at phase $\pi$ | $-1$ | $\pi-\beta$ |
| Receiver's own negative antipode | $-1$ | $\pi$ |

For the unit-radius complete chart each radial row is its polarity product times $R_v(\gamma)/2$. Since $\pi-\beta<2\pi-\beta$, strict decrease of $R_v$ at $v>0$ gives

$$
2A_{\mathrm{inner},r}
=-R_v(\pi)+R_v(2\pi-\beta)-R_v(\pi-\beta)
\le-R_v(\pi).
$$

At $v=0$, $R_0=1$ makes the other neutral pair's two radial terms cancel, so the same non-strict inequality holds with equality. The own-antipode source factor obeys $0<D\le1+v$, hence $R_v(\pi)\ge1/(1+v)$ and

$$
A_{\mathrm{inner},r}\le-\frac1{2(1+v)}.
$$

This establishes the bound at the selected receiver only. It does not average the two inner positive receivers or assert an identical bound at the other one.

## Deriving the receiver-controlled factor bound

At reception rotate the selected inner receiver to $x=(1,0)$, and let the outer source emission point be $z=b(\cos\theta,\sin\theta)$. Put $p=x-z$, $\tau=|p|>0$, and $n=p/\tau$. Its source velocity is $v_s=\omega Jz$, where $J$ is the counterclockwise quarter-turn. Since $z=x-p$ and $n\cdot Jp=0$,

$$
n\cdot v_s=\omega n\cdot Jx,\qquad
|n\cdot v_s|\le\omega|x|=v.
$$

This independently gives $D=1-n\cdot v_s\ge1-v>0$ using the receiver's radius. It is not the bound $1-|v_s|$, which could be zero at outer wake speed. In angular coordinates the same identity becomes

$$
\tau^2=1+b^2-2b\cos\theta,\qquad
D=1+\frac{\omega b\sin\theta}{\tau},
$$

and

$$
\tau^2-b^2\sin^2\theta=(b\cos\theta-1)^2\ge0.
$$

Thus $|b\sin\theta|/\tau\le1$, reproducing the receiver-controlled factor estimate and its sign convention directly from the chord geometry.

For each of the two outer persistent sources, its present separation from the receiver is at least $b-1$. Its speed throughout its complete circular history is at most one, so over its causal delay it travels at most $\tau$. The triangle inequality between present source, emission source, and receiver gives

$$
b-1\le|x-y(0)|\le|x-y(-\tau)|+|y(-\tau)-y(0)|\le2\tau.
$$

The complete coefficient-one logarithmic row therefore has norm

$$
|A|=\frac1{\tau D}\le\frac2{(b-1)(1-v)}.
$$

Its outward radial component is no larger than its norm regardless of polarity. There are exactly two outer sources, so their combined outward radial component is at most $4/[(b-1)(1-v)]$. Since $vb\le1$, one has $1-v\ge(b-1)/b>0$, giving the bound $4b/(b-1)^2$. No cancellation between the outer polarities is assumed, and neither source is omitted.

## Root coverage at closed speed

The complete closed-subfield circular theorem applies to these distinct present positions for each finite $b$; it does not require a prior universal upper bound on $b$. Its distance-minus-delay function is nonincreasing when the source speed is at most one, and every ordinary root is simple. At the selected inner receiver, the just-derived $D\ge1-v>0$ verifies simplicity even when an outer source moves at speed one. Other directed channels retain the previously checked complete closed-subfield root theorem, including the outer antipodal channel. Each distinct partner has exactly one positive root and each self channel has none. Thus the six-member system has thirty partner roots and zero positive self roots.

At the receiver used in the estimate, the three inner sources and the two outer sources exhaust all five partner hits. No older emission-time interval supplies an uncounted row. The static endpoint also has exactly one positive partner delay equal to present separation and no positive self delay. The continuous upper-speed boundary therefore introduces no missing contribution to the radial bound.

## Exact arithmetic and the radial contradiction

The selected receiver's prescribed circular radial term adds $v^2$ to its acceleration sum. Combining all five rows yields

$$
F_r\le v^2-\frac1{2(1+v)}+\frac{4b}{(b-1)^2}.
$$

For $b\ge12$, the speed condition gives $0\le v\le1/12$. Accordingly $v^2\le1/144$ and $-1/[2(1+v)]\le-6/13$. The outer bound decreases for $b>1$, as direct differentiation gives $-4(b+1)/(b-1)^3<0$, so it is at most $48/121$. The common denominator is $144\cdot13\cdot121=226512$, and the three numerators are $1573$, $-104544$, and $89856$. Their sum is $-13115$. Hence

$$
F_r\le\frac1{144}-\frac6{13}+\frac{48}{121}
=-\frac{13115}{226512}<0.
$$

Every inequality is in the direction of an upper bound on the complete radial residual. The strict negativity contradicts exact radial balance at the chosen receiver, without any assumption about tangential balance or the other receivers. It includes $b=12$ and $v=1/12$, so the necessary upper radius bound is strict. At $v=0$ the direct inner sum $-1/2$ and the same outer estimates also give the stated upper bound.

## Independent hand controls, falsifiers, and limits

For a phase-orientation control, take $\beta=\pi/3$. At the chosen second receiver, the other positive endpoint is clockwise $5\pi/3$ away, its antipode is clockwise $2\pi/3$ away, and the receiver's own antipode is at $\pi$. The more distant positive row has the smaller radial response, checking the inward sign of the other inner pair. At zero speed those two rows cancel radially, leaving the known own-antipode row $-1/2$.

For the receiver-factor identity, $\theta=0$ gives $\tau=b-1$ and $D=1$, while $\theta=-\pi/2$ gives $\tau=\sqrt{1+b^2}$ and $D=1-\omega b/\sqrt{1+b^2}>1-\omega$. These hand controls confirm that the estimate is governed by the unit receiver radius and stays positive even if $\omega b=1$. They are not new numerical target evaluations.

The result would be falsified by a reversed clockwise inventory, a failure of $n\cdot v_s=\omega n\cdot Jx$, an additional positive root, omission of either outer row, or a configuration in the stated domain whose selected complete residual exceeds the bound. A claimed exact configuration with $b\ge12$ would directly contradict the theorem. Nothing here resolves $1<b<12$ or transfers the bound to $r_1<r_2=r_3$.

## Provenance and execution

The frozen subject SHA-256 measured with `shasum -a 256` was `dd3c6446b9a14dd2287bf307b670a03c0575e325eda4d0590edecbdd9ae83b48`. Only this new independent-review Markdown file was written. The subject, prior reviews, main report, shared owners, numerical certificates and other agents' files were preserved. No numerical target, grid, process, Git mutation, or recursive delegation was launched.

The live clock returned 2026-10-07 07:51:25 UTC at review start. The unchanged allocation retains launch 03:25:15 UTC, exploration stop 13:55:15 UTC, and hard deadline 15:25:15 UTC. This completes the assigned boundary review; the parent owns checkpoint integration and selection of remaining partial-equality work.
