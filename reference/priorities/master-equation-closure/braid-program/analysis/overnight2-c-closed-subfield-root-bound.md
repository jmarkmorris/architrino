# Explicit root regularity on the closed subfield domain

## Scope and result

Claim grade: derived, pending independent reconstruction. Take complete common-center planar circular histories with angular rate $u=|\omega|$, every radius at most a fixed $R>0$, and every speed at most $c_f=1$. At a positive-delay partner root between distinct present positions, write the present separation as $d>0$, the delay as $\tau$, and the unchanged transmitter factor as $D=1-n\cdot v_s$. Here $n$ is the unit vector from the emission position to the receiver and $v_s$ is the source velocity at emission. Then

$$
\frac d2\le\tau\le2R,\qquad
D\ge\frac{\tau^2}{32R^2}\ge\frac{d^2}{128R^2}>0.
$$

For the fixed logarithmic coefficient $K_{\log}=1$, each unsigned received row obeys

$$
\left|\frac{n}{\tau D}\right|\le\frac{256R^2}{d^3}.
$$

These estimates require no fixed margin below wake speed, no equilibrium assumption, no selected phase sector and no numerical root sampling. They apply to every partner root of the declared complete histories. They quantify the regularity argument in the [uniform separation proof](overnight2-c-uniform-subfield-separation.md), without supplying its uncomputed separation constant.

## The two endpoint velocities bound the source factor

Reflect the plane if needed so that the angular rate is nonnegative. Let $x$ be the reception position, $z$ the emission position, $x-z=\tau n$, and let $J$ denote rotation through ninety degrees. Define $w=uJz$ and $v=uJx$. Their speeds are both at most one, and

$$
v-w=u\tau Jn,\qquad n\cdot v=n\cdot w=1-D.
$$

Write $w=(1-D)n+\beta Jn$. The two speed bounds yield

$$
(1-D)^2+\beta^2\le1,\qquad
(1-D)^2+(\beta+u\tau)^2\le1.
$$

The larger of $|\beta|$ and $|\beta+u\tau|$ is at least $u\tau/2$, so

$$
(1-D)^2+\frac{u^2\tau^2}{4}\le1,
\qquad 2D-D^2\ge\frac{u^2\tau^2}{4}.
$$

In particular $D\ge0$ and

$$
D\ge\frac{u^2\tau^2}{8}.
$$

For $u>0$ and a positive root this is already strict, including the case where one or both endpoint speeds equal one. For $u=0$, $D=1$ directly. The argument concerns the actual source factor; the equality of the two projections is a circular-geometric identity and introduces no receiver response into the equation.

To eliminate $u$, split into two cases. If $u\ge1/(2R)$, the preceding inequality gives $D\ge\tau^2/(32R^2)$. If $u<1/(2R)$, then $D\ge1-|w|\ge1-uR>1/2$, whereas $\tau\le2R$ implies $\tau^2/(32R^2)\le1/8$. The same claimed bound therefore holds in both cases.

The radius bound gives $\tau=|x-z|\le2R$. The source travels at speed at most one, so its displacement over the delay has length at most $\tau$. Applying the triangle inequality between its present position, its emission position and the receiver gives $d\le2\tau$. Combining these inequalities proves the stated delay, factor and logarithmic-row bounds. The constants are explicit but deliberately loose.

## Complete root coverage and boundary continuity

For a distinct source and receiver present position, the distance-minus-delay function is continuous, starts positive and is nonpositive by delay $2R$. It is nonincreasing because the source path has speed at most one. At every positive root the preceding factor bound makes its derivative strictly negative. Thus there is exactly one positive root: two roots of a nonincreasing function would require a zero interval, contradicting the strictly negative derivative at either root. A self channel has no positive root, because for $u>0$ its chord length is $2a|\sin(u\tau/2)|<au\tau\le\tau$, and for $u=0$ it is zero. Consequently the six-member class retains exactly thirty partner roots and zero positive self roots throughout the noncolliding closed subfield domain.

If a present-separation floor $d\ge\delta>0$ is supplied, every delay belongs to $[\delta/2,2R]$, every partner factor is at least $\delta^2/(128R^2)$, and every row norm is at most $256R^2/\delta^3$. The implicit root equation has a nonzero delay derivative at every such point; its unique partner root and received row vary smoothly locally in the geometric parameters. Compactness makes these bounds uniform over any closed parameter set with the stated separation floor. Equal radii cause no problem when present member positions remain distinct.

For C's radius bound one may set $R=35$. This bounds the closure of the selected strictly ordered subfield family; it does not extend the radius theorem to arbitrary superfield configurations. If the uniform separation theorem is independently verified, it supplies a qualitative $\delta=d_*$ for the closure of exact subfield configurations, and the formulas here then supply qualitative positive delay and factor floors. Since $d_*$ remains uncomputed, these are not numerical constants suitable for launching a finite cover.

This partner-root continuity is asserted on the closed subfield side only. Immediately above wake speed a positive self root appears, and its singular contribution is governed by the separate [self-onset theorem](overnight2-c-superfield-self-onset.md). Smooth continuation of the partner formulas does not authorize omission of that self root or prove continuity of the complete acceleration across the speed boundary.

## A uniform upper delay bound and an isolated-pair restriction

The delay also has an upper bound in terms of present separation that remains valid at wake speed:

$
\tau\le(224R^2d)^{1/3}.
$

To prove it, fix the receiver position $x$ and its speed $v=u|x|\le1$. Rotating the source's present position back to emission gives

$
\frac d\tau=\left|n-\frac{x-R(-u\tau)x}{\tau}\right|
\ge1-v\operatorname{sinc}(u\tau/2).
$

The chord bound gives $u\tau\le u(r_i+r_j)\le2$. For $0\le s\le1$, $1-\operatorname{sinc}(s)\ge s^2/7$, because $1/6-1/120=19/120>1/7$ in the alternating sine bound. If $v\ge1/2$, then $u\ge1/(2R)$ and hence

$
\frac d\tau\ge v\frac{u^2\tau^2}{28}\ge\frac{\tau^2}{224R^2}.
$

If $v<1/2$, then $d/\tau>1/2\ge\tau^2/(8R^2)$ by $\tau\le2R$. Both cases imply $d\ge\tau^3/(224R^2)$. The static case is included. Since $D\le2$, this also gives a lower row-norm bound:

$
\left|\frac{n}{\tau D}\right|\ge\frac{1}{2(224R^2d)^{1/3}}.
$

In the six-member class with minimum radius one and exact circular balance, suppose one receiver has a partner at separation $d$, and its four other distinct partners are each at present separation at least $g>0$. Its required acceleration has magnitude $u^2r_i\le1$, since all speeds are at most one and the radius-one normalization gives $u\le1$. The triangle inequality for its exact equation and the upper row bounds imply

$
\frac{1}{2(224R^2d)^{1/3}}\le1+\frac{1024R^2}{g^3}.
$

Therefore an exact configuration must obey

$
d\ge\frac{1}{1792R^2\left(1+1024R^2/g^3\right)^3}.
$

This explicit estimate excludes arbitrarily close isolated two-member pairs when their four other partners remain separated. It does not assume a sign for those outside contributions. It does not supply a global minimum separation when a third member approaches the pair, because its $g$ then also tends to zero. Its constants are conservative and no practical numerical-cover cost follows from their existence.

## Verification boundary and deciding continuation

The decisive estimate uses two independent speed constraints and the exact velocity difference, not a generic source-only bound. Its elementary known limits are a static row ($u=0$, $D=1$) and opposite signed transverse components $\beta=-u\tau/2$, which saturate the intermediate two-velocity inequality when both speeds are one. These hand substitutions are controls on the displayed algebra, not numerical target verification.

Falsifiers are a wrong sign in $v-w=u\tau Jn$, a missed positive self root at speed at most one, a partner root violating the displayed factor floor, or a root-uniqueness step that does not follow from monotonicity and strict root derivatives. No interval calculation, independent target replay or exact circular reference is asserted. Independent reconstruction must precede treating this note as checked evidence.

The next useful question is constructive separation: obtain an explicit lower bound on the separation of any exact configuration, or identify a bounded-radius region that the existing explicit inner/middle bounds already reduce to a feasible root-regular domain. The present lemma resolves factor regularity once separation is given; it does not resolve the computational cost of a full five-parameter exclusion.
