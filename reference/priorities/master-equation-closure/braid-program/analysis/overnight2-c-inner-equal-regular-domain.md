# An explicit regular containing domain for the inner-equal branch

## Claim and dependencies

**Derived claim pending independent reconstruction:** any exact distinct-member three-neutral-pair circular configuration with $r_1=r_2=1$, $r_3=b\ge2$, $\omega\ge0$ and $\omega b\le1$ lies in the compact containing domain

$$
2\le b\le4,\qquad \frac1{80}\le\omega\le\frac1b,\qquad
\frac1{32}\le\beta\le\pi-\frac1{32},\qquad \chi\in\mathbb T.
$$

Here the two positive inner phases are $0,-\beta$ after rotation and ordering, and the positive outer phase is $\chi$. In fact the exact subset obeys the strict inequalities $b<4$ and $\omega>1/80$. Every point of the displayed containing domain, whether exact or not, has thirty ordinary positive partner roots and zero positive self roots, with

$$
d_{\min}\ge\frac1{64},\qquad \frac1{128}\le\tau\le8,\qquad D\ge\frac12.
$$

The law remains the coefficient-one inverse-distance logarithmic equation with $K_{\log}=c_f=1$, unchanged transmitter weighting and complete circular histories. The claim depends on the independently reconstructed [inner-equal tangential exclusion](overnight2-c-inner-equal-tangential-bound.md), [quadratic phase-gap condition](overnight2-c-inner-equal-phase-gap.md), and the new [low-speed exclusion](overnight2-c-inner-equal-low-speed.md), whose independent reconstruction is pending at this writing. No claim here removes that dependency. This is a mathematical containing domain, not a claim of an exact solution or practical covering cost.

## A uniform phase gap on this radius interval

The phase-gap theorem gives, with $\rho=\min(\beta,\pi-\beta)$,

$$
\rho\ge\min\left\{\frac1{16},\frac{(b-1)^2(b+1)}{24b^2}\right\}.
$$

Writing the second term as $k(b)=(b-1-b^{-1}+b^{-2})/24$, its derivative is

$$
k'(b)=\frac{1+b^{-2}-2b^{-3}}{24}
=\frac{(b-1)(b^2+b+2)}{24b^3}>0,\qquad b>1.
$$

Since $k(2)=1/32$, every exact configuration with $b\ge2$ has $\rho\ge1/32$. Combining the checked exclusion $b\ge4$ with the new exclusion $2\le b\le4$, $\omega\le1/80$ supplies the radius and angular-rate bounds stated above. Closing the strict endpoints merely enlarges the containing set.

## Simultaneous separation and complete delays

For the two inner antipodal pairs, the smallest interpair chord is $2\sin(\rho/2)$. Because $0<\rho/2\le\pi/4$, the elementary bound $\sin x\ge x/2$ gives

$$
2\sin(\rho/2)\ge\rho/2\ge1/64.
$$

Every inner-to-outer simultaneous chord is at least $b-1\ge1$. An inner own-antipode chord is $2$, and the outer own-antipode chord is $2b\ge4$. This exhausts the six-member pairwise geometry and proves $d_{\min}\ge1/64$ throughout the containing set.

The established complete circular-root theorem includes the closed speed boundary $\omega b=1$: each distinct partner channel has exactly one positive ordinary root, while each self channel has no positive root. For every causal partner chord, source speed at most one gives $d\le\tau+\tau=2\tau$. Its length is at most the sum of receiver and source radii, hence at most $2b\le8$. Therefore every one of the thirty partner delays satisfies $1/128\le\tau\le8$. No finite-history cutoff is introduced.

## A stronger factor bound from the actual radius pattern

For receiver and source radii $a,c$ and emission phase $\psi$, the factor is $D=1+\omega ac\sin\psi/\tau$. Circular chord geometry gives

$$
\frac{ac|\sin\psi|}{\tau}\le\min(a,c).
$$

For example if $a\le c$, the squared inequality $c^2\sin^2\psi\le\tau^2=a^2+c^2-2ac\cos\psi$ reduces to $(c\cos\psi-a)^2\ge0$. The other ordering is symmetric. Every partner channel involving an inner member therefore satisfies

$$
D\ge1-\omega\ge1-1/b\ge1/2.
$$

The only remaining directed channels join the two outer antipodes. Their clockwise present angle is $\pi$, and the same-circle complete emission angle obeys $\alpha-2v_b\sin(\alpha/2)=\pi$, with $v_b=\omega b\le1$. Thus $\pi\le\alpha<2\pi$, $\cos(\alpha/2)\le0$ and $D=1-v_b\cos(\alpha/2)\ge1$. This treats the entire inventory, including the outer wake-speed endpoint, and proves the uniform $D\ge1/2$ claim.

## What remains

The six complete linked response equations in the [reviewed formulation](overnight2-c-linked-response-independent-review.md) are continuous on this compact domain and retain the same root inventory throughout. A correlated enclosure there can use these radius-pattern bounds instead of the much smaller general separation cutoff. No enclosure has yet been run on this target, and no exclusion of its whole domain is claimed. The lower-radius region $1<b<2$, the outer-equal branch and arbitrary unequal radii remain separate open regions.

A failed phase-gap theorem, low-speed premise, chord estimate, outer-antipode angle range or complete-root theorem would falsify the corresponding reduction. An exact configuration outside the strict necessary bounds would directly falsify the containing-domain claim. An interval enclosure containing zero inside the domain would establish neither existence nor a defect in the reduction. No new computational cost or independent numerical evidence is asserted.
