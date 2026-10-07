# Independent review of the inner-equal regular containing domain

## Verdict and dependency discharge

**Derived verdict: supported; no mathematical defect found.** Every exact distinct-member configuration in the selected inner-equal circular class with $b\ge2$ lies in the proposed compact domain. Every prescribed configuration in that domain, whether exact or not, has thirty ordinary positive partner roots, zero positive self roots and the stated uniform distance, delay and transmitter-factor bounds.

The frozen subject is [the regular-domain note](overnight2-c-inner-equal-regular-domain.md), supplied SHA-256 `858d80a43c95e42349692e6dee1b225e577cbb92d06f0abf1cc7c59e1ef3998a`. Its mathematical dependencies have now been independently discharged: [the inner-equal tangential review](overnight2-c-inner-tangent-independent-review.md) excludes $b\ge4$; [the phase-gap review](overnight2-c-inner-phase-independent-review.md) proves the necessary phase minimum; and [the low-speed review](overnight2-c-inner-low-speed-independent-review.md), completed immediately before this review, excludes $2\le b\le4$, $\omega\le1/80$. Their domains are precisely the distinct-position, coefficient-one logarithmic circular class needed here, and none requires strict ordering of the two equal inner radii.

The law remains $K_{\log}=c_f=1$, with unchanged transmitter weighting, persistent unit polarities and complete circular histories. This review uses the live Ramon E. Moore lens. The clock tool returned 2026-10-07 09:44:31 UTC during review; the original exploration stop 13:55:15 UTC and hard deadline 15:25:15 UTC remain unchanged. No numerical instrument, target or cover was run. Only this new independent review is written for the present assignment.

## Exact-set containment and closure

Let $r_1=r_2=1$, $r_3=b\ge2$, with two positive inner phases ordered as $0,-\beta$ for $0<\beta<\pi$, and outer positive phase $\chi$. The phase-gap theorem gives $\rho=\min(\beta,\pi-\beta)\ge\min(1/16,k(b))$, where

$$
k(b)=\frac{(b-1)^2(b+1)}{24b^2}=\frac{b-1-b^{-1}+b^{-2}}{24}.
$$

Independent differentiation and factorization give

$$
k'(b)=\frac{b^3+b-2}{24b^3}=\frac{(b-1)(b^2+b+2)}{24b^3}>0,
$$

while $k(2)=3/96=1/32$. Both arguments of the minimum are therefore at least $1/32$ for $b\ge2$. Exact configurations have $1/32\le\beta\le\pi-1/32$. The two completed exclusion theorems also require $b<4$ and $\omega>1/80$. The hypothesis that all speeds are at most one gives $\omega b\le1$.

Closing the two strict exclusion endpoints produces the containing set

$$
2\le b\le4,\qquad 1/80\le\omega\le1/b,\qquad
1/32\le\beta\le\pi-1/32,\qquad \chi\in\mathbb T.
$$

This is a closed subset of a bounded Euclidean parameter rectangle times the phase torus, hence compact. Closing $b=4$ and $\omega=1/80$ does not assert exactness at those boundaries. They are prescribed comparison configurations included for a convenient compact containing domain. The normalization and relabeling retain the three persistent antipodal pairs; they change neither polarity nor the law.

## All simultaneous separations and delays

The cross-pair chords among the four inner members have smallest angular distance $\rho=\min(\beta,\pi-\beta)$, so their minimum distance is $2\sin(\rho/2)$. Since $\rho\in[1/32,\pi/2]$, the elementary chord estimate $\sin z\ge z/2$ for $0\le z\le\pi/4$ gives $2\sin(\rho/2)\ge\rho/2\ge1/64$. Each inner pair's own antipodes are separated by two. Every inner-to-outer simultaneous distance is at least the radius gap $b-1\ge1$, and the outer antipodes are separated by $2b\ge4$. These categories exhaust the fifteen undirected distinct-member pairs. Thus every point in the containing set is collision-free and satisfies $d_{\min}\ge1/64$.

The geometric [complete-root theorem](overnight2-c-root-bound-independent-review.md) requires only distinct circular positions and actual speeds at most one, not exact balance. It therefore applies everywhere on this containing domain, including $\omega b=1$. Each directed distinct pair has exactly one ordinary positive causal root; each of the six self channels has no positive root. The full census is thirty partner roots and zero self roots.

For each partner root, write the present distance as $d=|x-y(0)|$ and its causal distance as $\tau=|x-y(-\tau)|$. Source speed at most one gives

$$
d\le|x-y(-\tau)|+|y(-\tau)-y(0)|\le2\tau.
$$

The causal chord cannot exceed the sum of its two radii, at most $2b\le8$. Hence all thirty roots satisfy $1/128\le\tau\le8$. The upper bound is a geometric bound on the entire history domain, rather than a finite-history truncation. The lower bound keeps all partner roots apart from the excluded zero-delay diagonal.

## Factor floor checked by channel type

In the receiver frame, for radii $a,c$, delayed source phase $\psi$ and common angular rate $\omega$, direct chord geometry gives

$$
\tau^2=a^2+c^2-2ac\cos\psi,\qquad
D=1+\frac{\omega ac\sin\psi}{\tau}.
$$

If $a\le c$, subtracting $c^2\sin^2\psi$ from $\tau^2$ yields $(c\cos\psi-a)^2\ge0$. Thus $ac|\sin\psi|/\tau\le a$. Exchanging $a,c$ gives the other ordering, proving the symmetric estimate $ac|\sin\psi|/\tau\le\min(a,c)$.

Every directed partner channel involving an inner member has $\min(a,c)=1$, including all inner-to-inner, inner-to-outer and outer-to-inner channels. Consequently

$$
D\ge1-\omega\ge1-1/b\ge1/2.
$$

This bound uses the shared circular geometry and works in both source-receiver directions. It does not mistakenly assign the inner speed to an outer transmitter or infer a positive outer source-speed margin at the wake boundary.

The only remaining partner channels are the two directions between the outer antipodes. Their clockwise present angle is $\pi$ and their complete emission angle satisfies

$$
\alpha-2v_b\sin(\alpha/2)=\pi,\qquad v_b=\omega b\le1.
$$

The complete root lies in $0<\alpha<2\pi$. Since its subtracted sine term is nonnegative, $\alpha\ge\pi$. Thus $\cos(\alpha/2)\le0$ and $D=1-v_b\cos(\alpha/2)\ge1$. This covers the two exceptional channels and proves the uniform floor $D\ge1/2$ for the entire thirty-row inventory. Zero self rows are not assigned artificial factors or added to the sum.

## Continuity, controls and verification limits

The prescribed histories vary smoothly with the parameters. Uniqueness of each positive partner root, the positive delay floor and $D\ge1/2$ allow the ordinary implicit-function theorem to follow each persistent ordered channel throughout the domain. The [linked six-component response equations](overnight2-c-linked-response-independent-review.md) are therefore continuous there, including the closed speed boundary and the torus identification. The component formulas retain all source signs and separately determined emission times. Equal inner radii introduce no collision because the phase interval is separated from zero and $\pi$.

Hand controls are $k(2)=1/32$, the exact square identity at $c\cos\psi=a$ when attainable, and the static outer-antipode limit $\alpha=\pi$, $D=1$. The latter is an algebraic control of the channel formula, not a point asserted to belong to the positive-speed containing domain. No computed enclosure or runtime estimate accompanies this proof.

The result is a regular compact containing domain for the exact inner-equal branch with $b\ge2$, not an exclusion of the domain or a claim that any exact configuration exists in it. The lower-radius branch $1<b<2$, outer-equal configurations, general unequal radii and stability remain outside this conclusion. A failed dependency, separation below $1/64$, extra positive root, delay outside $[1/128,8]$, or factor below $1/2$ at an admissible parameter point would falsify the relevant bound. An exact inner-equal configuration with $b\ge2$ outside the stated necessary parameter inequalities would falsify containment. Numerical residual intervals containing zero would establish neither existence nor a defect in this reduction. The frozen subject and previous artifacts remain unchanged; parent integration is separate. This completes the assigned review queue.
