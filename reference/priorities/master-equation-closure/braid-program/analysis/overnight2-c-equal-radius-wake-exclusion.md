# Equal-radius wake-speed boundary: radial exclusion

## Claim and assumptions

**Derived claim, pending independent reconstruction:** no exact three-neutral-antipodal-pair circular configuration has a common radius $a>0$, distinct member positions and common speed $v=|\omega|a=1$ under coefficient-one logarithmic reception with $K_{\log}=c_f=1$, unchanged transmitter weighting and the complete infinite circular histories. This excludes arbitrary phases at this equal-radius wake-speed boundary, not merely a prescribed regular hexagon. It supplies no stability statement, superfield continuation or exclusion of all strictly subfield equal-radius configurations.

The [complete angle chart](overnight2-c-equal-radius-chart-independent-review.md) proves exactly thirty directed positive partner roots and no positive self roots throughout this domain, including $v=1$. Reflection allows positive rotation. The [polarity-order theorem](overnight2-c-polarity-order-independent-review.md) shows that exactness would require alternating cyclic polarity. The remaining proof uses radial balance alone.

## Strict convexity of the radial response

Let $\beta\in(0,2\pi)$ be clockwise present separation and $\alpha=H_1^{-1}(\beta)$ the emission angle, where

$$
H_1(\alpha)=\alpha-2\sin(\alpha/2),\quad
D=1-\cos(\alpha/2)>0,\quad R(\beta)=D^{-1}.
$$

Put $s=\sin(\alpha/2)>0$ and $c=\cos(\alpha/2)\in(-1,1)$. Implicit differentiation gives

$$
R'(\beta)=-\frac{s}{2D^3},\qquad
R''(\beta)=-\frac{c+2c^2-3}{4D^5}
=\frac{(1-c)(2c+3)}{4D^5}>0.
$$

Thus $R$ is strictly decreasing and strictly convex on the whole open angle interval. The paired radial response

$$
P(x)=R(x)-R(x+\pi),\qquad 0<x<\pi,
$$

is strictly decreasing, because $P'(x)=R'(x)-R'(x+\pi)<0$. The derivative may diverge near excluded coincidences; neither differentiation nor the order argument requires a uniform endpoint derivative bound.

## Three linked radial equations force equal gaps

Order the three positive phases counterclockwise and write their gaps $G_i\in(0,\pi)$, with sum $2\pi$. Define $x_i=\pi-G_i>0$, so $x_1+x_2+x_3=\pi$. Cyclic indices are understood. At positive receiver $i$, the preceding positive and its antipode contribute $P(\pi-x_{i-1})/(2a)$; the following positive and its antipode contribute $-P(x_i)/(2a)$; its own negative antipode contributes $-R(\pi)/(2a)$. These are all five partners. Equal circular radial acceleration $-1/a$ therefore requires

$$
P(\pi-x_{i-1})-P(x_i)=R(\pi)-2,
\qquad i=1,2,3.
$$

This also follows from the [full gap reduction](overnight2-c-alternating-gap-next-step.md), but the five-row enumeration here states the radial dependency directly. Since $P$ is strictly decreasing, comparison of any two receiver equations reverses ordering between a predecessor gap and its successor gap. Equivalently, at the three values actually assumed, the relation defines a strictly decreasing single-valued map

$$
x_i=f(x_{i-1}),\qquad
f(t)=P^{-1}\bigl(P(\pi-t)-[R(\pi)-2]\bigr).
$$

Only the three arguments occurring in a putative solution need lie in its range. A strictly decreasing map has no nonconstant odd cycle: its third iterate is strictly decreasing wherever the orbit is defined, so it has at most one fixed point, whereas every member of a three-cycle is such a fixed point. Equivalently, order reversal composed three times reverses order while returning to the original three-element ordered set, which is impossible unless all its values coincide. Hence $x_1=x_2=x_3=\pi/3$. Every radial-balanced configuration at this boundary would therefore be the regular alternating hexagon.

## The remaining regular case fails radial balance

At a positive receiver of that regular hexagon, the clockwise partner angles are $\beta_k=k\pi/3$, $k=1,\ldots,5$, with signs $-,+,-,+,-$. Write $R_k=R(\beta_k)$. Its dimensionless complete radial sum is

$$
2aA_r=-R_1+(R_2-R_3)+(R_4-R_5)>-R_1.
$$

The strict differences are positive because $R$ decreases. Furthermore

$$
H_1(2\pi/3)=2\pi/3-\sqrt3<\pi/3.
$$

For an elementary exact check, $\pi<4$ and $4/3<\sqrt3$ imply $\pi/3<\sqrt3$. Strict monotonicity of $H_1$ now gives $\alpha(\pi/3)>2\pi/3$, hence $\cos(\alpha/2)<1/2$ and $R_1<2$. Therefore $2aA_r>-2$, whereas circular balance at $v=1$ requires exactly $-2$. This contradiction excludes the regular case and completes the arbitrary-phase boundary exclusion. No sampled residual or tangential inequality enters the argument.

## Consequence for approaching ordered-radius configurations

A qualitative neighborhood consequence follows for exact strictly subfield configurations in the already selected class $r_1=1\le r_2\le r_3<35$. The independently reconstructed [compact-domain theorem](overnight2-c-compact-domain-independent-review.md) supplies a fixed simultaneous separation floor and continuous complete partner rows through the closed speed boundary. If exact configurations had both $r_3\to1$ and $v_3=\omega r_3\to1$, compactness of relative phases would give a subsequence converging to a distinct-member equal-radius wake-speed configuration. Every limiting partner remains ordinary, the thirty-root census persists, and continuity passes all radial equations to the limit, contradicting the theorem above.

Consequently there exists $\varepsilon>0$ such that every exact strictly subfield configuration in this bounded ordered-radius class obeys

$$
\max\{r_3-1,\ 1-\omega r_3\}\ge\varepsilon.
$$

This is a qualitative joint restriction near the equal-radius wake-speed corner. No numerical value of $\varepsilon$, neighborhood width, computational cost or exclusion of the entire equal-radius boundary is asserted. The compact theorem's separation floor is essential: distinctness of each individual configuration alone would not prevent a coincident limiting phase.

## Verification boundary, alternative and falsifiers

The radial response derivatives, odd-cycle argument, five-partner enumeration and regular-case inequality require separate reconstruction before integration as checked results. A sign error in $R''$, an indexing defect, a nonconstant three-cycle for the declared strict order reversal, or a complete radial-balanced configuration at $v=1$ would overturn the exclusion. A failure of the earlier uniform separation or root continuity would reopen the neighborhood consequence separately.

The same convexity argument does not immediately cover $v<1$: the general numerator is $c+2vc^2-3v$, which is positive near $c=1$ for every fixed $v<1$, so $R_v''$ is negative there. Thus global radial convexity on all phase separations fails below wake speed. A useful next alternative is to exploit the previously proved separation floor to restrict the angle domain, or retain both radial and tangential equations on the alternating gap simplex. Neither property may be inferred from the boundary proof alone.

The second allocation keeps launch 2026-10-07 03:25:15 UTC, exploration stop 13:55:15 UTC and hard deadline 15:25:15 UTC. This is a new analytic boundary result within the existing history class. No numerical instrument, new equation, broad cover, production change or outside-ownership edit was used.
