# Monotonically widening displacement barriers

The constant relative-speed barriers fail their measured inequalities for $(h,\rho)=(1/32,1/32)$ on an intermediate displacement interval. This is a failure of those candidates, not a dynamical obstruction. A monotone width permits an additional derivative margin while retaining the already assessed complete functional bounds.

Let $v(d)>0$ be the fixed nominal template, $E(d)=v(d)^2/2$, and let $0<e(d)<1$ be nondecreasing and piecewise differentiable. Define

$$
l(d)=(1-e(d))v(d),\qquad m(d)=(1+e(d))v(d).
$$

For any fixed receiver displacement $d$ and source displacement $0\le z\le d$, the history inequalities $l(z)\le u(z)\le m(z)$ imply

$$
(1-e(d))v(z)\le u(z)\le(1+e(d))v(z).
$$

Therefore the same complete-history functional enclosure from the [position-barrier theorem](alternatives-screen-2026-10-05-width-entry-position-barriers.md) applies at this receiver with the constant factors $\alpha_d=1-e(d)$ and $\beta_d=1+e(d)$. This enclosure may be conservative because it uses the largest width for the entire source history, but it introduces no omitted source support or time approximation.

The candidate kinetic derivatives are exactly

$$
\left(\frac{l^2}2\right)'=(1-e)^2E'-2(1-e)e'E,
\qquad
\left(\frac{m^2}2\right)'=(1+e)^2E'+2(1+e)e'E.
$$

Thus the original first-crossing proof applies whenever the lower functional bound exceeds the first expression and the upper functional bound is below the second, with both one-sided checks at every width seam. The exact preparation must still lie strictly between these candidates. The initial coefficient sandwich may use the narrowest width $e(0)$; the actual/nominal release collar remains a separate finite check.

A preregistered candidate for the fourth law is the exact rational function

$$
e(d)=\min\left(\frac3{40},\frac1{100}+\frac34d\right),
$$

whose seam is $d=13/150$. This starts with one-percent width, grows over the measured failing region, and ends with $7.5$ percent width. Its candidate contact lower speed is $(37/40)v(1/2)$; the existing measured nominal value makes this approximately $8.3041>8$, but no actual contact bound follows without complete validation. The proposed instrument first repeats independent constant-width and affine controls, then measures feasibility at the fixed receiver sample set plus both width-seam sides. Directed application follows only if the scientific implication and candidate merits are assessed.

> Grade: derived conditional barrier extension; proposed exact candidate. A failed source-history containment, either derivative inequality, preparation coverage or contact threshold falsifies the corresponding certificate. A sampled pass alone is measured feasibility.
