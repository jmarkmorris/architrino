# A correlated tangential restriction on the inner-equal boundary

## Proposed continuous exclusion

**Derived claim pending independent reconstruction:** for the selected distinct-member circular class with $r_1=r_2=1$, $r_3=b\ge4$, common angular rate $\omega\ge0$ and all member speeds at most one, the two positive inner receivers satisfy

$$
A_{1,t}-A_{2,t}\ge\frac4{585}.
$$

Their labels are chosen as specified below. Thus at least one of their absolute tangential residuals is at least $2/585$, and exact configurations on this boundary require $1<b<4$. This strengthens the previously checked radial upper bound twelve. The equation remains $K_{\log}=c_f=1$, persistent unit polarities, the unchanged transmitter factor and complete circular histories. The thirty partner and zero positive self roots are retained, including the endpoint where the outer speed equals one. The remaining interval $1<b<4$ and the other partial-equality boundary are outside this conclusion.

## Correlating the two inner receivers

Set $v=\omega$, the unit-radius inner speed. Choose the positive inner endpoint labels so their clockwise separation from the first to the second is $\beta\in(0,\pi)$; distinct member positions exclude the two endpoints of this interval. Use the previously checked complete equal-radius chart

$$
H_v(\alpha)=\alpha-2v\sin(\alpha/2)=\gamma,\qquad
D=1-v\cos(\alpha/2),\qquad
B_v(\gamma)=\frac{\cot(\alpha/2)}D,
$$

and its neutral-pair tangential response $Q_v(x)=B_v(x)-B_v(x+\pi)$. Each signed unit-radius tangential row is its polarity product times $B_v/2$.

At the first positive inner receiver, the other positive inner endpoint is clockwise $\beta$ away and its negative partner is $\beta+\pi$ away. At the second receiver those two angles are respectively $2\pi-\beta$ and $\pi-\beta$. Each receiver has its own negative antipode at $\pi$. Hence the complete three-inner-source tangential sums are

$$
2A^{\mathrm{inner}}_{1,t}=Q_v(\beta)-B_v(\pi),\qquad
2A^{\mathrm{inner}}_{2,t}=-Q_v(\pi-\beta)-B_v(\pi).
$$

Subtracting cancels the identical own-antipode terms. The independently proved strict convexity of $Q_v$ on $(0,\pi)$ gives

$$
A^{\mathrm{inner}}_{1,t}-A^{\mathrm{inner}}_{2,t}
=\frac{Q_v(\beta)+Q_v(\pi-\beta)}2
\ge Q_v(\pi/2).
$$

This holds for arbitrary inner phase separation, without a radial- or tangential-balance hypothesis. Unlike separate bounds at each receiver, it retains their linked source ordering.

## A rational lower bound on the paired response

For $b\ge4$, closed-subfield motion gives $0\le v\le1/4$. At present angle $\pi/2$, the complete root obeys

$$
\frac\pi2\le\alpha\le\frac\pi2+2v<\pi.
$$

Thus $B_v(\pi/2)>0$, $D\le1$, and $\cot(\alpha/2)\ge\cot(\pi/4+v)$. Also $\alpha/2\le\pi/4+1/4<\pi/3$ using $\pi>3$, so $\cos(\alpha/2)>1/2$ and $D\le1-v/2$. At present angle $3\pi/2$, the root satisfies $3\pi/2\le\alpha<2\pi$, giving $-\cot(\alpha/2)\ge1$ and

$$
-B_v(3\pi/2)\ge\frac1{1+v}.
$$

The elementary inequalities $\sin v\le v$ and $\cos v\ge1-v^2/2>0$ give $\tan v\le v/(1-v^2/2)$. Together with

$$
\cot(\pi/4+v)=\frac{1-\tan v}{1+\tan v},
$$

these yield two exact speed bounds:

1. If $0\le v\le1/8$, then $\tan v\le16/127$, so $B_v(\pi/2)\ge111/143>3/4$. Also $-B_v(3\pi/2)\ge8/9>4/5$. Hence $Q_v(\pi/2)>31/20>836/585$.
2. If $1/8\le v\le1/4$, then $\tan v\le8/31$ and $\cot(\pi/4+v)\ge23/39$. Now $D\le1-v/2\le15/16$, so $B_v(\pi/2)\ge368/585$. The other term is at least $4/5=468/585$, giving $Q_v(\pi/2)\ge836/585$.

The rational tangent bound increases on this interval, as direct differentiation of $v/(1-v^2/2)$ gives $(1+v^2/2)/(1-v^2/2)^2>0$. Thus the endpoint substitutions are justified. The two speed intervals cover every permitted $v$, including zero and $1/4$. No numerical sampling or transcendental interval run is needed for this bound.

## The outer pair cannot cancel the required difference

At either inner receiver, let $\theta$ be an outer source's emission angle relative to that receiver. The ordinary causal row has

$$
\tau^2=1+b^2-2b\cos\theta,\qquad
D=1+\frac{vb\sin\theta}{\tau}\ge1-v,
$$

where the receiver-controlled factor bound follows from $\tau^2-b^2\sin^2\theta=(b\cos\theta-1)^2\ge0$. It stays positive even if the outer speed $vb$ equals one.

The magnitude of its tangential component is $b|\sin\theta|/(\tau^2D)$. A second exact geometric identity is

$$
(1+b^2-2b\cos\theta)^2-(b^2-1)^2\sin^2\theta
=((1+b^2)\cos\theta-2b)^2\ge0.
$$

Since all relevant denominators are positive for $b>1$, it gives

$$
|A_t|\le\frac{b}{(b^2-1)(1-v)}
\le\frac{b^2}{(b-1)^2(b+1)}.
$$

The last step uses $v\le1/b$. There are two outer sources at each of two receivers, so their contribution to the difference is bounded in absolute value by

$$
\left|A^{\mathrm{outer}}_{1,t}-A^{\mathrm{outer}}_{2,t}\right|
\le\frac{4b^2}{(b-1)^2(b+1)}\le\frac{64}{45},\qquad b\ge4.
$$

For the last inequality, logarithmic differentiation of the positive radius function gives

$$
\frac{d}{db}\log\frac{b^2}{(b-1)^2(b+1)}
=-\frac{b^2+b+2}{b(b-1)(b+1)}<0.
$$

This estimate includes both outer polarities separately; it does not presume cancellation or equal delays between them. It bounds their largest possible ability to oppose the required inner-source difference.

Combining the complete inner and outer contributions gives

$$
A_{1,t}-A_{2,t}\ge\frac{836}{585}-\frac{64}{45}
=\frac4{585}>0.
$$

The prescribed circular acceleration has zero tangential component, so this is already a difference of balance residuals. The triangle inequality gives $\max\{|A_{1,t}|,|A_{2,t}|\}\ge2/585$. Therefore no configuration in this full continuous sector can satisfy all vector equations.

## Evidence boundary and falsifiers

The argument uses the [complete equal-radius chart](overnight2-c-equal-radius-chart-independent-review.md), [strict paired tangential convexity](overnight2-c-tangential-convexity-independent-review.md), and [closed-subfield root theorem](overnight2-c-root-bound-independent-review.md). It does not reuse a numerical target or infer a continuum result from samples. At $v=0$, the inner chart gives $Q_0(x)=2/\sin x$, which supplies a hand control of the correlated difference. At $\theta=0$, the outer tangential row vanishes; the displayed square identities give direct geometric checks of both bounds.

An incorrectly oriented source inventory, failure of paired convexity, a reversed denominator inequality, a missing outer row or causal root, or an exact configuration with $b\ge4$ would falsify the relevant step. The frozen argument requires independent reconstruction before its improved upper radius bound is integrated as a completed finding. No statement is made about general unequal radii, outer-equal configurations, superfield motion or stability.
