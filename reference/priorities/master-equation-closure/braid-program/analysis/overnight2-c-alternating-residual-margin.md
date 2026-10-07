# Explicit residual margin for the alternating equal-radius sector

## Conditional quantitative theorem

**Derived conditional claim, pending independent reconstruction and the declared speed certificates:** suppose $Q_v'(\pi/2)>0$ and the regular-hexagon sum $S(v)>9/50$ hold throughout $9/16\le v\le1$. With the separately checked strict convexity of $Q_v$, every alternating distinct-member equal-radius configuration in this high-speed range has some receiver with

$$
A_{i,t}\ge\frac9{100a}.
$$

For $0\le v\le9/16$, every positive receiver of an alternating configuration has radial residual

$$
F_{i,r}:=A_{i,r}+\frac{v^2}a\le-\frac{23}{6400a}.
$$

Consequently the maximum absolute component of the six positive-receiver balance residuals is at least $23/(6400a)$ throughout the entire alternating equal-radius sector $0\le v\le1$. The numerical certificates remain pending when this note is frozen. This is the unchanged coefficient-one logarithmic three-neutral-pair history class, $K_{\log}=c_f=1$, with all thirty partner and no positive self roots. No nonalternating residual margin at zero speed, arbitrary unequal-radius bound or stability statement is asserted here.

## A uniform own-antipode tangential bound

For a present antipode at angle $\pi$, the complete root satisfies $H_v(\alpha)=\pi$ and $H_v(\pi)=\pi-2v$. Since $H_v'\le1+v\le2$,

$$
\alpha-\pi\ge\frac{2v}{1+v}\ge\frac{18}{25},
\qquad 9/16\le v\le1.
$$

Thus $-\cot(\alpha/2)=\tan((\alpha-\pi)/2)\ge9/25$, using $\tan z\ge z$ for $0\le z<\pi/2$. With $D\le2$ this gives

$$
-B_v(\pi)\ge\frac9{50}.
$$

The delay root is interior, so its half-angle displacement is below $\pi/2$ and the tangent inequality is applicable. This bound concerns the actual own-antipode row, not a replaced kernel.

## A gap crossing forces a positive tangential component

Strict convexity and $Q_v'(\pi/2)>0$ put the unique minimum $m_v$ strictly below $\pi/2$. For any alternating gaps $x_i>0$, $\sum_i x_i=\pi$, define the complete dimensionless tangential residual

$$
T_i=2aA_{i,t}=Q_v(\pi-x_{i-1})-Q_v(x_i)-B_v(\pi).
$$

If some $x_i\ge m_v$, the first argument is $x_i+x_{i+1}>x_i$, and $Q_v$ increases beyond its minimum. Then $T_i>-B_v(\pi)\ge9/50$.

Otherwise all gaps lie below $m_v$. The sum of the gaps guarantees a cyclic transition with $x_{i-1}\le\pi/3\le x_i$: either all gaps equal $\pi/3$, or one passes from a below-average gap to an above-average gap somewhere around the cycle, possibly through an equal-average value. Both $x_i$ and $\pi/3$ lie on the decreasing branch, giving $-Q_v(x_i)\ge-Q_v(\pi/3)$. The complementary arguments satisfy $\pi-x_{i-1}\ge2\pi/3>m_v$, giving $Q_v(\pi-x_{i-1})\ge Q_v(2\pi/3)$. Hence

$$
T_i\ge Q_v(2\pi/3)-Q_v(\pi/3)-B_v(\pi)=S(v)>\frac9{50}.
$$

This proves the stated tangential margin without first assuming exact balance or deriving regular spacing. The identity with $S(v)$ includes all five source rows by the checked gap chart. Strict signs are available in both cases; the weaker non-strict displayed bound is sufficient.

## Low-speed radial margin and the combined bound

For any alternating cyclic configuration, the five clockwise partner signs at a positive receiver are $-,+,-,+,-$. At $v>0$, the radial response $R_v$ strictly decreases, so

$$
2aA_{i,r}=-(R_1-R_2)-(R_3-R_4)-R_5<-\frac1{1+v}.
$$

This argument is independent of phase spacing; it is the same complete row ordering used in the [checked lower-speed theorem](overnight2-c-speed-bound-independent-review.md). Therefore

$$
aF_{i,r}<v^2-\frac1{2(1+v)}.
$$

The right side strictly increases for $v\ge0$, and at $9/16$ it equals

$$
\frac{81}{256}-\frac8{25}=-\frac{23}{6400}.
$$

At $v=0$, the exact static radial residual is $-1/(2a)$, which satisfies the same upper bound. Thus the low-speed inequality holds on the whole closed interval. Combining it with the high-speed tangential margin and $23/6400<9/100$ gives the global alternating-sector component margin.

## Verification boundary and falsifiers

The theorem depends on the full interval sign certificates, including the stronger lower threshold $S>9/50$, not merely $S>0$. The frozen speed-sign instrument preserves outward enclosures, so that stronger comparison can be checked from its completed global lower bound without rerunning it. Until that comparison and this argument are independently checked, the quantitative conclusion remains conditional.

An incorrect antipode-angle bound, failure of the cyclic crossing assertion, a sign error on either monotone branch, a speed cell whose certified lower bound does not exceed $9/50$, or an alternating complete residual below the stated margin would overturn the corresponding conclusion. All original clocks, resource bounds and write limits remain unchanged. No new numerical target is requested by this analytic strengthening.
