# Pointwise-subfield fate of the admitted departing logarithmic family

## Result and scope

Claim grade: derived candidate, awaiting independent assessment. Every sufficiently small member of the already admitted complete compatible mirror-planar perturbation family has the following alternative after its proved finite departure. Either its maximal regular strict-subfield interval ends at finite time with unit limiting speed, or its continuation exists for all future time and its radius, positive geometric angular momentum and unwrapped angle all tend to infinity. The infinite-time conclusion requires only pointwise speed below one. It does not require one speed margin valid for all future time, and therefore includes an all-future member whose speed approaches one along a sequence.

This result does not select which alternative a specified member realizes. In particular it proves neither an all-future speed margin nor finite arrival at unit speed. It does exclude arbitrarily late returns to any fixed bounded separation on every infinite strict-subfield continuation of the actual family.

The [fixed case and admitted analytical method](authorized-cases-ten-hour-c-spiral-method-admission.md) retain the registered logarithmic law with $p=1$ and $K=R_*=c_f=1$, the exact certified base parameters, complete held tail and polynomial velocity patch, fixed finite-support modal variation and smaller compatibility correction. No numerical perturbation amplitude, new history, equality response or root selection is introduced. The [accepted torque result](authorized-cases-ten-hour-reference-c-torque-adjudication.md) supplies the strict initial orientation and its preservation, and the already accepted finite-endpoint classification. The new step is an estimate over the entire actual causal interval that has no inverse power of an all-future speed margin.

## Geometry and the endpoint estimate

Write the positive member as $x(t)$ and the opposite member as $-x(t)$. Set $r(t)=|x(t)|$, $v=x'$, and $h=x\times v$, where the planar cross product is signed in the admitted positive orientation. Let $s=s(t)<t$ be the unique partner source, and define

$$
R=t-s=|x(t)+x(s)|,\qquad n=\frac{x(t)+x(s)}R,
\qquad D=1+n\cdot v(s).
$$

On each finite regular strict-subfield interval the complete past has a strict speed margin, so the ordinary complete-root proof gives exactly this partner root and no positive-delay self roots. These are consequences of the actual history, not excluded contributions. The increasing clock never samples earlier than its release value $s_0=s(0)<0$.

For the sufficiently small admitted family, the initial sampled segment has

$$
h_*:=\min_{s_0\le u\le0}h(u)>0.
$$

The accepted orientation theorem gives $h(t)\ge h(0)\ge h_*$, and the continuous angular lag satisfies $0<\delta(t)=\theta(t)-\theta(s(t))<\pi/2$. In particular $r>h_*$ on the regular future, since $h\le r|v|<r$. Every point in every sampled interval has positive radius and $h\ge h_*$. The exact torque is

$$
h'(t)=\frac{r(t)r(s)\sin\delta(t)}{R^2D},\qquad
\delta(t)=\int_s^t\frac{h(u)}{r(u)^2}\,du.
\tag{1}
$$

The useful observation is that the unit speed bound controls each intermediate radius from both ends of the interval. Abbreviate $b=r(t)$, $a=r(s)$ and write $u=s+y$, with $0\le y\le R$. Then

$$
r(s+y)\le m(y):=\min\{a+y,\ b+R-y\}.
\tag{2}
$$

The two bounds meet at $y_*=(b+R-a)/2$, inside $[0,R]$ because $|a-b|\le R$. Their common value is $(a+b+R)/2$. Both pieces can therefore be integrated exactly:

$$
\int_s^t\frac{du}{r(u)^2}
\ge\frac1a+\frac1b-\frac4{a+b+R}.
\tag{3}
$$

Multiplying by $ab$ exposes the cancellation that avoids any assumption about $a/b$:

$$
ab\int_s^t\frac{du}{r(u)^2}
\ge\frac{(a-b)^2+(a+b)R}{a+b+R}
\ge\frac R2.
\tag{4}
$$

The last inequality uses only $R=|x(t)+x(s)|\le a+b$. Thus a very large source radius weakens the angle integral but also enlarges the torque numerator. Estimating the two factors together retains a positive bound.

Since $\sin\delta\ge2\delta/\pi$ in the actual acute lag interval, (1) and (4), followed by $D\le2$, yield

$$
h'(t)\ge\frac{h_*}{\pi RD}
\ge\frac{h_*}{2\pi R}
\ge\frac{h_*}{2\pi(t-s_0)}.
\tag{5}
$$

The denominator bound $D\le2$ uses pointwise subfield source speed only. No lower bound for $D$ valid at all future times is needed in this lower torque estimate.

## Separation tends to infinity without a fixed speed margin

Integration of (5) gives the explicit physical-time estimate

$$
h(t)\ge h(0)+\frac{h_*}{2\pi}
\log\left(1+\frac{t}{-s_0}\right),
\qquad r(t)>h(t).
\tag{6}
$$

Consequently an all-future strict-subfield continuation has $h(t)\to\infty$ and $r(t)\to\infty$. For any prescribed radius $M>h(0)$, a return with $r(t)\le M$ is impossible once

$$
t>(-s_0)\left[\exp\left(\frac{2\pi[M-h(0)]}{h_*}\right)-1\right].
\tag{7}
$$

This is an explicit bound in the exact member's release quantities. It is not a practical numerical threshold for the existential perturbation family. It allows finite radial turns and does not assert eventually positive radial velocity.

The same lower estimate is consistent with the exact admitted spiral. There $h=a^2\omega(1+t)$ and $h'=a^2\omega>0$; its exact clock and torque identities were checked before target work in the method record. The logarithmic estimate is weaker than the spiral's linear growth, as a general lower bound may be.

## The source time and positive angle are unbounded

First suppose, for contradiction, that the increasing source clock is bounded. Then $s(t)\to s_\infty<\infty$, and the source position remains bounded on $[s_0,s_\infty]$. Because the lag remains acute and positive,

$$
\theta(t)<\theta(s(t))+\pi/2,
$$

so the increasing receiving angle has a finite limit $\theta_\infty$. By (6), $r(t)\to\infty$, so the normalized chord satisfies $n(t)\to e_\infty$, where $e_\infty=(\cos\theta_\infty,\sin\theta_\infty)$. The bounded source contributes a vanishing fraction of the growing chord.

Choose a finite $t_1$ after which $e_\infty\cdot n(t)\ge1/2$. The unchanged acceleration then obeys

$$
\frac{d}{dt}(e_\infty\cdot v(t))
=-\frac{e_\infty\cdot n(t)}{RD}
\le-\frac1{4(t-s_0)}.
\tag{8}
$$

Its integral tends to negative infinity, contradicting $|v(t)|<1$. Thus $s(t)\to\infty$.

Now suppose the receiving angle has a finite limit. Its delayed angle has the same limit because $s(t)\to\infty$. Both endpoint directions eventually lie in any fixed narrow cone about $e_\infty$. Their positively weighted sum, and hence $n(t)$, lies in that cone as well, regardless of the radius ratio. Inequality (8) again applies and gives the same contradiction. Therefore $\theta(t)\to+\infty$.

The argument gives divergent positive winding without a fixed margin below unit speed. It does not claim a numerical winding rate, a limiting spiral, limiting speed, a basin of attraction, or simultaneous Cartesian velocity limits. The latter question already has a separate accepted owner in its stated domain.

## Finite endpoints and the actual departing family

The previously accepted finite-endpoint theorem uses only the positive radius floor and pointwise strict-subfield continuation. If the maximal interval ends at $t_*<\infty$, every source near that endpoint lies at least $h_*$ earlier. Its source speeds consequently have one strict margin on that earlier compact interval, so the partner denominator and delay stay positive. Bounded acceleration gives a finite velocity limit, and a limit strictly below one would permit ordinary continuation. The limiting speed must therefore be one.

Combining that accepted incoming classification with (6) and (8) proves the claimed two alternatives for every sufficiently small member of the existing compatible family. These members already undergo the accepted finite departure while remaining strictly subfield. The strengthened infinite-time branch applies to their actual subsequent continuation even if its speed has no uniform future margin. No altered history is used to pass from departure to this theorem.

An endpoint's existence and its velocity-projected acceleration remain unresolved. The separately accepted positive-projection self-birth obstruction and the special grazing touch-return theorem apply only after their respective endpoint hypotheses have been proved. This source supplies neither equality dynamics nor a selection between those endpoint classes.

## Falsifiers and validation

The result would be falsified by a violation of the two endpoint radius bounds for a unit-speed-bounded path; an error in the explicit integral (3) or its product estimate (4); failure of the actual initial-family orientation restriction; a hidden additional root despite the complete finite-time speed bound; or an all-future member of this family returning to bounded radius or retaining finite angle despite (5) or (8). A finite unit-speed endpoint, or infinite-time approach to unit speed during dispersion, does not refute the theorem.

Validation here is analytical: integrate the two elementary reciprocal-square pieces, reconstruct the exact torque and clock from the registered row, and compare against the already admitted exact spiral. No numerical instrument, new certificate or production trajectory is run. The subject is frozen for independent assessment before disclosure of any independently derived reference result. Only this new subject is written; no earlier source or shared owner is edited, and no owned computation is active.
