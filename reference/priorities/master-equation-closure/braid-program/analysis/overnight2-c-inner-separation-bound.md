# Explicit inner-pair separation bounds

## Statement

Claim grade: derived, pending independent review. Under the coefficient-one logarithmic equation with $K_{\log}=c_f=1$, unchanged transmitter factor and all ordinary causal hits, consider exact common-center circular histories of three fixed neutral antipodal unit-polarity pairs. Normalize $r_1=1<r_2<r_3$ and assume $|\omega|r_3<1$. The smallest simultaneous cross-pair separation $d$ between a member of the radius-one pair and a member of the middle pair must satisfy

$$
d>\begin{cases}(r_3-1)^3/24,&1<r_3<2,\\1/21,&r_3\ge2.\end{cases}
$$

Both bounds hold at the shared endpoint $r_3=2$, where the stronger one is $1/21$. These are numerical separation restrictions on one boundary regime. They hold for every relative phase and do not require a fixed speed margin for the outer pair. They complement the [qualitative collision theorem](overnight2-c-collision-speed-boundary.md), which does not supply numerical separation constants. A small middle-radius gap alone is not excluded, because the relative phase can keep the members separated.

## Complete geometry and received rows

Write $X_{a,s}(t)=s r_a e^{i(\omega t+\phi_a)}$ for all real $t$, with $q_{a,s}=s$. Strict subfield speeds give exactly one positive-delay root in each of the thirty directed partner channels and no positive self root, by strict decrease of distance minus delay. Every root has positive source factor. Hence five partner rows enter each receiver equation, without a suppressed root or source.

Put $u=|\omega|$. For a source of speed at most $v<1$ and present separation $h$, triangle inequalities give

$$
\frac{h}{1+v}\le\tau\le\frac{h}{1-v},\qquad 1-v\le D\le1+v.
$$

Since the logarithmic row norm is $1/(\tau D)$, its lower bound is $(1-v)/((1+v)h)$. For circular receiver/source radii $a,b$, the sharper geometric factor bound $D\ge1-u\min(a,b)$ follows from $ab|\sin\theta|/\tau\le\min(a,b)$. These inequalities refer to the actual delayed chord and source velocity, not an instantaneous replacement law.

By antipodal symmetry choose the positive radius-one receiver and a middle-pair endpoint at distance $d$ from it. The nearer of the two endpoints realizes the minimum cross-pair distance. Its polarity may be either sign; only norms will be used. The reverse triangle inequality gives $r_2\le1+d$.

Assume for contradiction that $d\le1/21$ while $r_3\ge2$. Then $u<1/r_3\le1/2$ and the middle source speed satisfies

$$
v_2=u r_2\le\frac{1+d}{2}\le\frac{11}{21}.
$$

The nearby row consequently has norm at least

$$
|A_{\mathrm{near}}|\ge\frac{1-v_2}{(1+v_2)d}
\ge\frac{1-11/21}{(1+11/21)(1/21)}
=\frac{105}{16}.
$$

This large row must be canceled by the other four rows and the prescribed circular acceleration. We now bound all of them.

## Bounds on the remaining four rows

The own antipodal partner has delay $\tau_0=2\cos(u\tau_0/2)$ and factor $D_0=1+u\sin(u\tau_0/2)\ge1$, since $u<1/2$ and $0<\tau_0\le2$. Its present separation is two, so $\tau_0\ge2/(1+u)$. Therefore its norm is at most $(1+u)/2\le3/4$.

Let $x$ be the receiver position, $|x|=1$, and $y$ the nearby middle endpoint. The other endpoint is $-y$. Since $|x-y|=d$, its present separation obeys

$$
|x+y|=|2x-(x-y)|\ge2-d\ge\frac{41}{21}.
$$

Its source speed is the same $v_2\le11/21$, so its causal delay is at least $(41/21)/(1+11/21)=41/32$. At the radius-one receiver the geometric factor floor is $D\ge1-u\ge1/2$, independent of whether the middle source is near its own speed bound. Thus the far middle row norm is at most $64/41$.

Each outer source has delayed range at least $r_3-1\ge1$. Its factor again has the receiver-based floor $D\ge1-u\ge1/2$. Each of the two outer row norms is therefore at most two, for a combined bound four. This estimate remains valid as the outer speed tends to one from below.

Finally, the required circular acceleration at radius one has norm $u^2\le1/4$. The triangle inequality for the exact vector equation would force

$$
|A_{\mathrm{near}}|\le\frac34+\frac{64}{41}+4+\frac14
=\frac{269}{41}.
$$

But the lower bound exceeds this upper bound by the exact positive margin

$$
\frac{105}{16}-\frac{269}{41}=\frac1{656}>0.
$$

This contradiction proves $d>1/21$ for every exact configuration in the stated domain. No direction cancellation, phase fitting or additional response factor is assumed.

## Outer radii approaching one

It remains to prove the first branch. Put $s=r_3=1+h$ with $0<h\le1$, and suppose $d\le h^3/24$. The nearby middle radius satisfies $r_2\le1+d$, while $u<1/s$, so its speed obeys $v_2\le(1+d)/s$. The near-row lower bound becomes

$$
|A_{\mathrm{near}}|\ge\frac{s-1-d}{d(s+1+d)}.
$$

Since $d\le h^3/24\le h/24$ and $h\le1$, the numerator is at least $23h/24$ and $s+1+d\le73/24$. Therefore

$$
|A_{\mathrm{near}}|\ge\frac{23h}{73d}\ge\frac{552}{73h^2}.
$$

The own-partner norm and required circular acceleration are each at most one. The far middle endpoint has present distance at least $2-d$, source speed at most $(1+d)/s$ and factor at least $1-u\ge h/s$. Its norm is thus at most

$$
\frac{s+1+d}{h(2-d)}\le\frac{73}{47h}\le\frac{73}{47h^2}.
$$

The two outer rows have delayed ranges at least $h$ and factors at least $h/s$, for combined norm at most $2s/h^2\le4/h^2$. Because $h\le1$, each of the two unit bounds also lies below $1/h^2$. The complete cancellation capacity is consequently at most

$$
\frac{1+1+4+73/47}{h^2}=\frac{355}{47h^2}.
$$

The near row exceeds this by at least

$$
\frac1{h^2}\left(\frac{552}{73}-\frac{355}{47}\right)
=\frac{29}{3431h^2}>0.
$$

The exact vector equation is impossible under the assumed bound, proving $d>(r_3-1)^3/24$ for $1<r_3\le2$. In particular, any exact sequence with this inner/middle separation tending to zero must have $r_3\to1$ and, eventually, $r_3-1<(24d)^{1/3}$. This is a quantitative restriction on a hypothetical sequence, not evidence that the sequence exists. It supplies a necessary spatial scaling for the remaining collision/wake-speed analysis.

## Phase-radius interpretation and verification boundary

Let $\rho=\operatorname{dist}(\phi_2-\phi_1,\pi\mathbb Z)\in[0,\pi/2]$, so the phase chooses the nearer middle endpoint independently of its polarity. The minimum cross-pair separation obeys

$$
d^2=(r_2-1)^2+4r_2\sin^2(\rho/2).
$$

For $r_3\ge2$, the inequality therefore excludes the continuous region where this expression is at most $1/441$. A small radial gap alone does not imply exclusion; the relative phase must also place endpoints close together. This is a necessary condition, not an existence certificate for the complementary region.

Exact arithmetic and independent reconstruction are recorded in the ongoing report. Falsifiers are a failed causal norm estimate, an incorrect receiver-radius factor floor, a missed root, an invalid antipodal far-distance bound, an arithmetic sign error in the $1/656$ margin, or an exact circular reference within the displayed excluded region. This result does not address superfield histories, actual-time contact, singular continuation or stability.
