# Equal-radius exclusion reduced to two speed-sign certificates

## Conditional theorem and fixed domain

**Derived conditional claim, pending independent reconstruction:** suppose the paired tangential response $Q_v$ is strictly convex on $(0,\pi)$ and the two inequalities

$$
Q_v'(\pi/2)>0,\qquad
S(v):=\sum_{k=1}^{5}(-1)^kB_v(k\pi/3)>0
$$

hold for every $9/16\le v\le1$. Then no exact distinct-member three-neutral-antipodal-pair equal-radius circular configuration exists for $0<v\le1$ under the unchanged coefficient-one logarithmic law, $K_{\log}=c_f=1$ and complete circular histories. The static case is already excluded by its radial sum. At the time of freezing this note the speed signs are certificate targets, not claimed results. The [convexity proof](overnight2-c-tangential-pair-convexity.md) has its own independent-review obligation.

All roots remain those of the [complete angle chart](overnight2-c-equal-radius-chart-independent-review.md): exactly thirty directed positive partner roots and no positive self roots. A proof of the two scalar signs would establish a full-phase exclusion through the following analytical reduction, not by sampling phases or claiming that finite speed samples cover a continuum.

## Why tangential balance would force regular gaps

The [polarity-order theorem](overnight2-c-polarity-order-independent-review.md) excludes every nonalternating exact configuration. The [lower-speed condition](overnight2-c-speed-bound-independent-review.md) requires $v>9/16$. Thus every remaining exact reference lies in the declared speed interval and has alternating complementary gaps $x_i>0$, with $x_1+x_2+x_3=\pi$. The exact complete tangential equations are

$$
Q_v(\pi-x_{i-1})-Q_v(x_i)=B_v(\pi),
$$

where cyclic indices are used. Since $v>0$, the ordinary inverse angle at present separation $\pi$ exceeds $\pi$, so $B_v(\pi)<0$.

Strict convexity and divergence at both endpoints give a unique minimum $m_v$ of $Q_v$. The first sign implies $m_v<\pi/2$. The tangential equations require $x_i<m_v$ for every $i$: otherwise $\pi-x_{i-1}=x_i+x_{i+1}>x_i$ lies strictly farther into the increasing branch of $Q_v$, contradicting the negative difference.

For any putative solution, all three inputs $x_i$ therefore lie on the strictly decreasing branch, whereas all three complementary arguments $\pi-x_i>\pi/2>m_v$ lie on its strictly increasing branch. Rearranging the complete tangential equation defines a successor relation only on the three attained values,

$$
x_i=f_v(x_{i-1}),\qquad
f_v(t)=\left(Q_v\big|_{(0,m_v)}\right)^{-1}
\left(Q_v(\pi-t)-B_v(\pi)\right).
$$

Its inverse is well-defined at those attained right-hand sides because the putative solution supplies their preimages. Increasing $t$ decreases $Q_v(\pi-t)$ on the complementary increasing branch; applying the decreasing left-branch inverse therefore increases $f_v(t)$. Thus the successor relation is strictly increasing on its finite orbit.

A strictly increasing map has no nonconstant finite cycle. If $x_1<x_2=f_v(x_1)$, repeated order preservation gives $x_2<x_3<x_1$, a contradiction; the opposite initial inequality gives the reversed contradiction. Equality propagates. Hence $x_1=x_2=x_3=\pi/3$. The common circle would have the regular alternating hexagon phases.

## The second sign completes the contradiction

At a positive receiver of the regular alternating hexagon, the five clockwise partner angles are $k\pi/3$ with signs $(-1)^k$. Therefore $S(v)=2aA_t$ is the complete tangential acceleration sum, not a radial approximation or a selected-source sum. The second sign makes $A_t>0$, while an exact prescribed circle requires $A_t=0$. Thus the regular case also fails. With the preceding radial exclusions below $9/16$ and outside alternating polarity, this would exclude every distinct equal-radius configuration throughout $0\le v\le1$.

The same argument with $Q_v'(\pi/2)=0$ would give $m_v=\pi/2$ and still work, because the gaps are strictly smaller than the minimum. Strict positive certificates are selected to avoid an equality decision in the numerical stage.

## Proposed interval certificate and limits

The one-dimensional sign checks use exact root inclusion through the complete angle chart, not a root search over a sampled history. For each present angle, $\partial\alpha/\partial v=2\sin(\alpha/2)/D>0$, so endpoint root brackets enclose its whole speed-cell image. Outward interval evaluation then encloses both signed quantities for every speed in that cell. A positive lower endpoint on every cell, plus exact coverage of the speed interval, would certify the continuum statements. Any cell with a nonpositive lower endpoint remains unresolved; it cannot be silently discarded.

The declared partition has 448 consecutive cells of width $1/1024$ covering $[9/16,1]$, including both endpoints. Before a full target, one independent reviewer is assigned known static and manufactured controls, followed by a four-cell pilot at indices 0, 149, 298 and 447 to measure cost and sign resolution. Limits are 120 instrument seconds, 150 supervisor seconds, 400 MB observed memory, 1 MB output and one numerical thread. The full target requires the pilot's measured result and explicit continuation selection. This is a new reduced one-dimensional sign problem; no old phase grid, interval leaf or cover is rerun.

The original launch 03:25:15 UTC, exploration stop 13:55:15 UTC and deadline 15:25:15 UTC on October 7 remain unchanged. Independent review must reconstruct the finite-orbit argument and root-domain coverage, separately from the target instrument. No general unequal-radius, superfield, trajectory or stability conclusion follows. An incorrect convexity claim, branch placement, cycle argument, row inventory or incomplete sign certificate would reopen the conditional exclusion.
