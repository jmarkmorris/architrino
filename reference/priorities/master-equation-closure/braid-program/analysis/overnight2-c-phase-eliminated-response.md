# Eliminating the common neutral-pair phase

## Fixed class and provisional status

**Derived formulation pending independent reconstruction.** This advances the remaining linked radial–tangential condition for the complete logarithmic three-binary histories with radii $1,1,b$, $b>1$, positive phases $0,-\beta,\chi$, $0<\beta<\pi$, $\omega\ge0$ and $\omega b\le1$. The equation remains $K_{\log}=c_f=1$ with persistent unit polarities, unchanged transmitter weighting and all thirty ordinary positive partner roots, with no positive self roots. No numerical target, enlarged cover or new history is selected.

The [linked equations](overnight2-c-linked-response-independent-review.md) define the two required complex inner responses $W_1,W_2$ in radial-plus-$i$-tangential coordinates. The independently checked [common shifted comparison](overnight2-c-centered-response-independent-review.md) supplies simultaneous errors at most

$$
E=\frac{2\omega(2b-1)}{(b-1)^2(1-\omega)}
$$

from the same static neutral pair at phases $s=\chi-\omega b$ and $s+\beta$. This note eliminates that common phase exactly at zero comparison error and derives necessary error-inflated conditions for the actual moving problem. Passing them is not exact balance.

## A real-linear rotation of the reciprocal ellipse

Put

$$
u=\frac{b^2-1}{2b},\qquad w=\frac{b^2+1}{2b},\qquad k=\frac wu>1,
\qquad F(s)=\frac1{G_b^{(0)}(s)}=-u\cos s+iw\sin s.
$$

Direct trigonometric addition gives

$$
F(s+\beta)=A F(s)+B\overline{F(s)},
$$

$$
A=\cos\beta-\frac i2(k+k^{-1})\sin\beta,\qquad
B=\frac i2(k^{-1}-k)\sin\beta.
$$

Indeed the cross term has real part $(u/w)\operatorname{Im}F\sin\beta$ and imaginary part $-(w/u)\operatorname{Re}F\sin\beta$. The real-linear map has determinant one, so it is invertible. Its Euclidean operator norm, as is also the norm of $z\mapsto A\bar z+Bz$, equals

$$
\kappa_\beta=|A|+|B|
=\sqrt{1+q^2\sin^2\beta}+q|\sin\beta|,\qquad
q=\frac{k-k^{-1}}2.
$$

For the norm equality, rotate the input phase so the two summands align; the triangle bound is then attained. The identity $(k+k^{-1})^2/4=1+q^2$ gives the displayed expression. In particular $1\le\kappa_\beta\le k$.

## Two phase-free algebraic conditions

For complex $z_1,z_2$, define

$$
H_\beta(z_1,z_2)=|z_1|^2-z_2(A\bar z_1+Bz_1),
$$

$$
J(z_1)=|z_1|^4-\frac{(\operatorname{Re}z_1)^2}{u^2}
-\frac{(\operatorname{Im}z_1)^2}{w^2}.
$$

For the actual static pair $z_1=G_b^{(0)}(s)$, $z_2=G_b^{(0)}(s+\beta)$, multiplication of the reciprocal identity by $z_2|z_1|^2$ proves $H_\beta=0$. The ellipse equation for $1/z_1$ proves $J=0$.

Conversely, if $z_1\ne0$, $J(z_1)=0$ puts $1/z_1$ on the parametrized ellipse, so it equals $F(s)$ for some phase $s$. Invertibility of the real-linear map implies $A\bar z_1+Bz_1\ne0$. The equation $H_\beta=0$ then determines $z_2=1/F(s+\beta)$. Thus these two equations, with $z_1\ne0$, characterize exactly the two linked static response values. The nonzero qualification is essential: the two polynomial equations admit the artificial branch $z_1=0$ with arbitrary $z_2$.

## Necessary finite-speed inequalities

At exact moving balance, $|W_j-z_j|\le E$ for one common static pair. Triangle inequalities and the operator norm give

$$
|H_\beta(W_1,W_2)|
\le E\left[(2+\kappa_\beta)|W_1|+\kappa_\beta|W_2|\right]
+(1+\kappa_\beta)E^2.
$$

To check the error accounting, the squared-norm change is at most $2|W_1|E+E^2$. Writing $T(z)=A\bar z+Bz$, the product change is bounded by

$$
|W_2T(W_1)-z_2T(z_1)|
\le\kappa_\beta E(|W_1|+|W_2|+E).
$$

The corresponding ellipse restriction is

$$
|J(W_1)|\le (|W_1|+E)^4-|W_1|^4
+\frac{2|W_1|E+E^2}{u^2}.
$$

The fourth-power norm bound follows from $||z_1|-|W_1||\le E$ and monotonicity; its outward difference dominates the inward difference. The weighted quadratic form has operator norm $u^{-2}$ because $0<u<w$, giving its remaining error. These inequalities require no division by either required response and remain necessary if $W_1=0$. They are not jointly sufficient when $E>0$ and may be weak as $b\downarrow1$. The outer receiver's two original component equations remain additional necessary conditions.

## Exact controls and a quantified limitation

For a static pair at $s=0$, $\beta=\pi/2$, take $z_1=-1/u$, $z_2=-i/w$. Substitution gives $H_{\pi/2}=J=0$, verifying the signed axes and phase orientation. At $\beta=0$, $A=1$, $B=0$ and $H=z_1(\bar z_1-z_2\bar z_1/z_1)$ reduces directly to $|z_1|^2-z_2\bar z_1$; its nonzero solutions have $z_2=z_1$. This degenerate-gap algebraic control is not an admissible distinct-member target. The finite-speed error bounds vanish identically at $E=0$.

There is a concrete failure if the ellipse equation is omitted. At $b=\sqrt3$, $\omega=0$, $\beta=\pi/2$, the required inner values from the complete circle chart are $W_1=1/2-i$, $W_2=1/2+i$. Here $u=1/\sqrt3$, $w=2/\sqrt3$ and $k=2$. Then

$$
A=-\frac54i,\qquad B=-\frac34i,\qquad
A\bar W_1+BW_1=\frac12-i,
$$

so $W_2(A\bar W_1+BW_1)=5/4=|W_1|^2$ and $H=0$. However,

$$
J(W_1)=\frac{25}{16}-3\left(\frac14\right)-\frac34
=\frac1{16}>0.
$$

Thus the phase-compatibility polynomial alone cannot exclude this fibre, while the ellipse equation does. This is an exact algebraic limitation and static control, not a new moving exclusion or an exact reference. It illustrates why retaining a common phase relation alone is insufficient without membership in the response ellipse.

## Scope and next boundary

The outcome is a phase-free necessary test retaining both radial and tangential correlation, with explicit finite-speed error. No moving parameter box has been tested, and no gain or cost relative to previous enclosures is claimed. The exact static characterization is stronger than either equation alone, but the error-inflated tests are only necessary. Their unresolved moving usefulness is the next deciding issue, subject to the original exploration stop. Independent reconstruction must check the signs, nonzero condition, norm, perturbation bounds and rational control before any numerical instrument relies on this formulation. A wrong reciprocal map, omitted ellipse condition or causal root, underestimated error, or a moving exact configuration violating the necessary inequalities would falsify the corresponding claim.
