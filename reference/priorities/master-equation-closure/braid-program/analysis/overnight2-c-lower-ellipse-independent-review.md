# Independent review of the lower-radius ellipse strip

## Verdict and frozen domain

**Derived verdict: supported; no mathematical defect found.** On the entire closed strip $\sqrt3\le b\le7/4$, $0\le v=\omega\le1/10000$, $|\beta-\pi/2|\le1/1000$ and arbitrary $\chi$, the complete first-inner vector residual has norm strictly greater than $177/160000$. Some radial or tangential component therefore exceeds $177/240000$ in absolute value. Exact full circular balance is excluded there.

The frozen subject is [the lower-radius ellipse note](overnight2-c-lower-radius-ellipse-strip.md), supplied SHA-256 `32db3011986e49013233a80ae4139055e9bfde17d1b9ea7f2e0fe87b672099e4`. The fixed scenario retains radii $1,1,b$, positive phases $0,-\beta,\chi$, persistent unit polarities, the coefficient-one logarithmic law $K_{\log}=c_f=1$, unchanged transmitter weighting and all complete circular histories. The live Ramon E. Moore lens and Specialist charter apply. The clock tool returned 2026-10-07 13:49:38 UTC at review start; the original exploration stop is 13:55:15 UTC and hard deadline is 15:25:15 UTC. This is bounded verification of the frozen claims and adds no numerical instrument, target or scientific exploration.

## Static controls and required response

The known complete-circle static values are $R_0=1$, $P_0=0$, $B_0(\pi)=0$ and $Q_0(\beta)=2\csc\beta$. Substitution into the independently checked first-inner linked equation gives the required outer response $W_0=1/2-i\csc\beta$, with the negative tangential sign fixed by the clockwise gap convention. For the static outer neutral pair, the reciprocal ellipse has semiaxes $u=(b^2-1)/(2b)$ and $w=(b^2+1)/(2b)$, and its response satisfies

$$
J(z)=|z|^4-\frac{(\operatorname{Re}z)^2}{u^2}-\frac{(\operatorname{Im}z)^2}{w^2}=0.
$$

The exact controls $J(-1/u)=J(-i/w)=0$ verify both axis assignments. At $b=\sqrt3$, $\beta=\pi/2$, one has $W_0=1/2-i$, $u^{-2}=3$, $w^{-2}=3/4$, giving $J(W_0)=25/16-3/4-3/4=1/16$. These analytical controls identify the positive static mismatch used below; they are not exact six-member references.

## Uniform static distance from the full pair curve

Both $u$ and $w$ increase for $b>1$. Thus throughout $b\ge\sqrt3$, $u^{-2}\le3$ and $w^{-2}\le3/4$. With $t=\csc^2\beta\ge1$,

$$
J(W_0)\ge(1/4+t)^2-3/4-(3/4)t
=t^2-t/4-11/16\ge1/16.
$$

The last polynomial has derivative $2t-1/4>0$ for $t\ge1$. For $h=|\beta-\pi/2|\le1/1000$, $\sin\beta=\cos h\ge1-h^2/2\ge1-1/2000000>1000/1001$. It follows that

$$
|W_0|^2\le\frac14+\left(\frac{1001}{1000}\right)^2
=\frac{1252001}{1000000}<\frac{81}{64},\qquad |W_0|<9/8.
$$

In real two-dimensional coordinates, $\nabla J(z)=4|z|^2z-2Mz$, with $M=\operatorname{diag}(u^{-2},w^{-2})$ of norm at most three. Therefore for $|z|\le5/4$,

$$
|\nabla J(z)|\le4|z|^3+6|z|\le245/16<16.
$$

Fix any point $G$ on the full static response curve. If $|G-W_0|\le1/8$, its line segment to $W_0$ lies inside $|z|<5/4$ by the triangle inequality. The mean-value bound, $J(G)=0$ and $J(W_0)\ge1/16$ imply $1/16\le(245/16)|G-W_0|<16|G-W_0|$, hence $|G-W_0|>1/256$. If the distance exceeds $1/8$, the same conclusion already follows. This two-case argument avoids incorrectly applying a local gradient bound to the whole static curve. It proves a uniform strict distance from every phase, not only the coordinate axes.

## Independent complete inner rate derivative

To bound the required response away from zero rate, it is legitimate to work on the larger auxiliary interval $0\le v\le1/8$. For each channel $\gamma\in\{\pi,\beta,\beta+\pi\}$, write $x=\alpha/2$ and use $x=\gamma/2+v\sin x$. The complete physical root has $0<x<\pi$, hence

$$
\pi/4-1/2000\le x\le3\pi/4+1/2000+1/8.
$$

On the central interval $[\pi/4,3\pi/4]$ sine is at least $1/\sqrt2$. On either added end interval its unit Lipschitz bound gives the common lower estimate $1/\sqrt2-(1/8+1/2000)>7/10-251/2000=1149/2000>1/2$. Therefore $|\cot x|\le2$, $\csc^2x\le4$ and $D=1-v\cos x\ge7/8$ for all three channels.

At fixed present angle, differentiating $x-v\sin x=\gamma/2$ gives $\partial_vx=\sin x/D$. The total derivative of the factor is $\partial_vD=-\cos x+v\sin x\,\partial_vx$. Thus $|\partial_vx|\le8/7$ and $|\partial_vD|\le1+(1/8)(8/7)=8/7$. Direct differentiation now gives

$$
|\partial_vR|\le\frac{512}{343}<\frac32,
$$

$$
|\partial_vB|\le\frac{4(8/7)}{7/8}+\frac{2(8/7)}{(7/8)^2}
=\frac{256}{49}+\frac{1024}{343}=\frac{2816}{343}<9.
$$

These are total rate derivatives through the complete implicit roots, not derivatives with the emission angle held fixed.

The first-inner required vector is the circular term plus the own-antipode and other-inner-pair terms,

$$
W(v)=-v^2+\frac{R_v(\pi)-R_v(\beta)+R_v(\beta+\pi)}2
+\frac i2\{B_v(\pi)-B_v(\beta)+B_v(\beta+\pi)\}.
$$

Its radial derivative magnitude is at most $2v+3(3/2)/2\le5/2$, and its tangential derivative magnitude is at most $3\cdot9/2=27/2$. Bounding the complex norm by the sum of absolute component bounds gives $|\partial_vW|\le16$. Integrating from zero with fixed phases proves $|W(v)-W_0|\le16v$ throughout the target strip. All three inner source channels and the required circular acceleration have been differentiated; no equilibrium along this rate comparison is presumed.

## Actual delayed outer pair and final exact constants

The independently checked common shifted comparison retains both actual outer source delays and their transmitter factors. It gives $|G_{1,b}(\chi;v)-G_b^{(0)}(\chi-vb)|\le E$ with

$$
E=\frac{2v(2b-1)}{(b-1)^2(1-v)}.
$$

For the enclosing radius and auxiliary rate bounds, $\sqrt3>17/10$ follows from $3>289/100$, $b\le7/4$ gives $2b-1\le5/2$, and $v\le1/8$ gives $1-v\ge7/8$. Thus $E\le(4000/343)v<12v$ for $v>0$, while $E=0$ at zero. The constant comparison is exact: $4000<12\cdot343=4116$.

For the static response at the one actual comparison phase, the already proved uniform distance applies. Two applications of the reverse triangle inequality therefore give

$$
|G_{1,b}(\chi;v)-W(v)|>1/256-28v
\ge1/256-28/10000
=\frac{625-448}{160000}=\frac{177}{160000}>0.
$$

Strictness survives at $v=0$ because the static distance was already strict, and at positive $v$ the same strict static margin suffices even with nonstrict error estimates. For a two-component vector, its largest absolute component is at least the norm divided by $\sqrt2$. Using $\sqrt2<3/2$ gives a component strictly greater than $(2/3)(177/160000)=177/240000$.

The residual here is exactly actual outer response minus required outer response, hence the full first-inner acceleration balance residual. One nonzero required-zero component excludes exact full balance regardless of the other receiver equations. Every outer phase is included because the static distance bound was uniform over the entire curve.

## Complete roots, limits and disposition

The narrow inner phase band lies strictly inside $(0,\pi)$, so the four inner positions are distinct. The outer antipodes are distinct and $b>1$ precludes mixed-radius coincidence. In the actual target the inner speed is at most $1/10000$ and outer speed at most $7/40000$, both strictly subfield. The complete circular-root theorem therefore gives thirty ordinary positive partner roots and no positive self roots over the entire circular history. The selected receiver retains its three inner and two outer rows. The static comparison and the auxiliary rate derivative introduce no root cutoff or replacement response law.

The result is limited to the declared closed lower-radius/rate/phase strip. It establishes no global exclusion, exact reference, numerical performance, stability or actual-time fate, and does not decide other lower-radius phases or larger rates. A failed static $J$ margin, an unjustified gradient neighborhood, a missed implicit rate derivative, underestimated complete pair error, omitted root, or exact configuration in the strip would falsify the corresponding conclusion. Every check here is analytical; no scientific instrument or numerical target was run. Only this new review was written. The frozen subject, previous evidence, main report and shared owners were preserved. Parent integration remains separate; the assigned verification is complete.
