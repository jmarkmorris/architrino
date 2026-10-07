# A phase-independent lower speed on the equal-radius boundary

## Statement

Claim grade: derived, pending independent reconstruction. Under the complete equal-radius logarithmic three-binary assumptions of the [polarity-order theorem](overnight2-c-equal-radius-polarity-order.md), any exact configuration with $0<v\le1$ must obey

$$
2v^2(1+v)>1.
$$

In particular $v>9/16$. Equivalently the speed exceeds the unique positive solution of $2v^3+2v^2=1$. The root equation, not a rounded decimal, defines the sharper threshold. This restriction covers every distinct-phase arrangement: the nonalternating arrangements are already excluded by their unequal radial accelerations, and the argument below handles all remaining alternating arrangements. It is a necessary condition, not an existence or stability result.

## Complete alternating radial sum

At any positive receiver, list the other five endpoints in strictly increasing clockwise separation,

$$
0<\beta_1<\beta_2<\beta_3<\beta_4<\beta_5<2\pi.
$$

Alternating cyclic polarity makes their signs $-,+,-,+,-$. The equal-radius chart gives the strictly decreasing positive radial factor $R_v(\beta)=1/[1-v\cos(\alpha(\beta)/2)]$. Consequently the complete dimensionless radial sum satisfies

$$
2aA_r=-R_v(\beta_1)+R_v(\beta_2)-R_v(\beta_3)+R_v(\beta_4)-R_v(\beta_5)
<-R_v(\beta_5).
$$

For a distinct partner $0<\alpha(\beta_5)<2\pi$, so $\cos(\alpha/2)>-1$ and $R_v(\beta_5)>1/(1+v)$. Thus

$$
2aA_r<-\frac1{1+v}.
$$

Exact circular motion requires $2aA_r=-2v^2$. Reversing signs therefore gives $2v^2>1/(1+v)$, as asserted. Every directed partner row at this receiver is included and there is no positive self root for $v\le1$.

The polynomial $2v^2(1+v)$ is strictly increasing for $v>0$. At $v=9/16$ it equals $2025/2048<1$, with positive gap $23/2048$. Therefore every speed at or below $9/16$ is excluded. This rational check is elementary exact arithmetic; it does not round the root of the cubic or instantiate a different wake speed.

## Boundary and continuation

The theorem does not assert that speeds above its threshold can balance. It imposes no new equation, coefficient, damping, root exclusion or singular event rule. It applies only to equal-radius complete circles with distinct positions; a uniform extension to unequal radii requires additional estimates. Together with the polarity-order result it reduces the remaining equal-radius question to alternating six-member configurations above a fixed positive speed, with arbitrary unequal angular gaps still allowed.

Falsifiers are failure of strict radial-factor ordering, a mistaken cyclic sign count, an omitted partner or self root, a reversed inequality when substituting circular acceleration, or an exact configuration at a speed violating the displayed cubic condition. Independent reconstruction must check these points before this restriction is promoted into the checked report.
