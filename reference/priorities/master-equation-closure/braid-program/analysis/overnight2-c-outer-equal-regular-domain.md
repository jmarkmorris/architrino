# Explicit phase and root bounds on the outer-equal branch

## Claims and dependency boundary

**Derived claims pending independent reconstruction.** For any exact distinct-member configuration of the selected coefficient-one logarithmic circular class with $r_1=1$, $r_2=r_3=b\ge2$ and $0\le\omega b\le1$, order the two positive outer phases with clockwise separation $\beta\in(0,\pi)$. Then

$$
\rho=\min(\beta,\pi-\beta)\ge\frac1{32}.
$$

This phase bound does not depend on the new proposed radius-five exclusion. If that [separate certificate](overnight2-c-outer-equal-sharpening.md) is completed, every exact configuration in this branch lies in the compact containing domain

$$
2\le b\le5,\qquad 0\le\omega\le1/b,\qquad
1/32\le\beta\le\pi-1/32,\qquad \chi\in\mathbb T,
$$

where $\chi$ is the remaining inner positive phase after one outer positive phase is rotated to zero. Exact configurations exclude $b=5$; retaining it closes the containing set. At every point of that set, whether exact or prescribed for comparison, all thirty ordinary partner roots and zero positive self roots occur, with

$$
d_{\min}\ge\frac1{32},\qquad \frac1{64}\le\tau\le10,\qquad D\ge\frac1{128}.
$$

The law, full histories, unit persistent polarities and transmitter weighting are unchanged, with $K_{\log}=c_f=1$. No zero-angular-rate equilibrium is asserted by including that endpoint in a containing set. No numerical target is selected by this note.

## Phase separation from the two outer receivers

Scale length and time by $b$. The two equal pair radii become one, the remaining pair has radius $a=1/b\le1/2$, and the common speed is $v=\omega b\le1$. As in the [checked outer-equal proof](overnight2-c-outer-equal-independent-review.md), the complete equal-radius contribution to the two selected tangential equations has difference

$$
L=\frac{Q_v(\beta)+Q_v(\pi-\beta)}2>0.
$$

The smaller pair's four received rows can oppose this by at most

$$
C(a)=\frac{4a}{(1-a)^2(1+a)}\le C(1/2)=\frac{16}{3}.
$$

The [checked small-angle response estimate](overnight2-c-inner-phase-independent-review.md) depends only on the complete unit-circle response, not on which pair is smaller. It gives $Q_v(\gamma)\ge1/(3\gamma)$ when $0<\gamma\le1/16$, with $Q_v$ positive at every other argument in $(0,\pi)$. Thus, if $\rho\le1/16$, the complete difference satisfies $L\ge1/(6\rho)$. Exact tangential balance requires $L\le C(a)\le16/3$, so $\rho\ge1/32$. If $\rho>1/16$, the same conclusion is immediate. This uses both outer receivers and all four smaller-source rows. No arbitrary phase cutoff is imposed.

## A same-circle factor bound from the present angle

The following bound holds independently of exactness. For a complete same-circle channel at speed $0\le v\le1$, let clockwise present angle $\gamma\in(0,2\pi)$ correspond to emission angle $\alpha\in(0,2\pi)$ through

$$
H_v(\alpha)=\alpha-2v\sin(\alpha/2)=\gamma,
\qquad D_v(\alpha)=1-v\cos(\alpha/2).
$$

The factor is nondecreasing on this entire emission interval because $D_v'(\alpha)=(v/2)\sin(\alpha/2)\ge0$. Since $H_v(0)=0$ and $H_v'=D_v$,

$$
\gamma=\int_0^\alpha D_v(s)\,ds\le\alpha D_v(\alpha).
$$

If $\alpha\le\pi$, this yields $D_v(\alpha)\ge\gamma/\pi$. If $\alpha\ge\pi$, the factor is at least one. Therefore for any set of same-circle channels whose present angles are at least $\rho\le\pi/2$,

$$
D_v\ge\rho/\pi>\rho/4.
$$

The two outer antipodal pairs have present partner angles among $\beta$, $\pi-\beta$, $\pi$, $\pi+\beta$ and $2\pi-\beta$. Every such angle is at least $\rho$, in either directed interaction. Consequently every outer-to-outer factor is greater than $1/128$ when $\rho\ge1/32$, including at $v=1$. The elementary inequality $\pi<4$ supplies the rational floor.

## Remaining factors and all geometric bounds

For any circular receiver/source radii $r,s$, chord angle $\psi$ and delay $\tau$, the exact square identity proves $rs|\sin\psi|/\tau\le\min(r,s)$. Therefore $D\ge1-\omega\min(r,s)$. Every channel involving an inner member has $\min(r,s)=1$ and hence $D\ge1-\omega\ge1-1/b\ge1/2$. This includes both directions of each mixed-radius interaction; it is derived from the actual circular transmitter velocity. Inner own-antipode channels in fact have factor at least one. Together with the preceding outer-to-outer calculation this exhausts all thirty partner factors and gives the stated common floor $1/128$.

The smallest cross-pair distance on the outer circle is $2b\sin(\rho/2)\ge b\rho/2\ge1/32$, using $\sin z\ge z/2$ on $0\le z\le\pi/4$ and $b\ge2$. Own outer antipodes are separated by $2b\ge4$, inner own antipodes by two, and mixed-radius members by at least $b-1\ge1$. Thus every simultaneous separation is at least $1/32$ throughout the containing domain, even at parameters not satisfying balance.

The [complete circular-root theorem](overnight2-c-root-bound-independent-review.md) applies to all of these distinct configurations with speeds at most one. It supplies one positive ordinary root per directed distinct pair and no positive self root, without a finite-history cutoff. Since source speed is at most one, present distance satisfies $d\le2\tau$, giving $\tau\ge1/64$. The causal chord is at most the sum of the two radii, at most $2b\le10$. All partner delays therefore lie in the claimed interval.

## Interpretation, controls and falsifiers

The phase restriction and factor inequality are analytic consequences independent of the pending radius-five premise. If that premise is certified, the displayed closed parameter set is compact and the complete six balance equations are continuous on it by the positive factor and delay floors. This is a containing-domain reduction, not an exclusion of that domain or a claim of practical numerical-cover cost. The branch $1<b<2$, the inner-equal higher-speed branch and general unequal radii remain outside this compact restriction.

Hand controls include $C(1/2)=16/3$, the static factor $D_0=1$, and the own-antipode emission range $\alpha\ge\pi$. A missed directed outer angle, an invalid transfer of the small-angle $Q$ estimate, wrong source factor, absent positive root or erroneous radius-five premise would falsify the corresponding step. An exact configuration with $b\ge2$ and $\rho<1/32$ would falsify the phase result regardless of the interval certificate. Numerical intervals containing zero inside the containing set are not evidence of existence.
