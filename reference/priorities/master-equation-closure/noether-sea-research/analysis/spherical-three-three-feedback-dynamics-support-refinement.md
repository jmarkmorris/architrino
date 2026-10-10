# Primary prepared hexagon: support reversal before moving preparation arrives

## Frozen result and admitted scope

**Derived, pending independent review.** In the primary cell $K=1$, $R=10$, $c_f=1$, $g=1/10$, $\beta=1/4$, the actual normally constrained motion has a unique signed normal-support zero in its stationary-source segment, at a reached phase

$$
\frac18<\Phi_*<\frac3{20}.
$$

Support is outward before that zero and inward afterward through the first moving-preparation arrival. The zero is transverse and occurs before any moving source emission arrives, hence before the accepted first release-emission arrival and positive-source feedback interval. This settles the first support reversal; it does not decide whether support reverses again after moving preparation begins.

This is a new analytical subject. It preserves the [domain checkpoint](spherical-three-three-feedback-dynamics-domain.md), SHA-256 `c23d19794b20191232109856a7b1d5396554ccff7c272a9b83b39d3adf0284ee`, and [reached-feedback proof](spherical-three-three-feedback-dynamics-reached-feedback.md), SHA-256 `d1a59cab071dbb6aa597f94777651b97745c50e310c6ac33bdcdcef5af884e85`. The coordinator reports independent acceptance of those subjects, with strictly positive source time after the feedback interval's left endpoint. Their admitted motion and complete root history are premises here. No new reviewer support findings were read before this derivation. This subject remains separately reviewable and is not self-accepted.

The law, normal-only constraint, supplied preparation and variable speed are unchanged. No motion beyond the accepted horizon, prescribed future trajectory, numerical evolution, energy interpretation or physical provider of support is introduced.

## Exact stationary-source identity

While all five partner roots read the stationary source history, write $h=\Phi/2$, $x_k=k\pi/6-h$, $\sigma_k=(-1)^k$. The exact dimensionless radial and tangent fields are

$$
N(\Phi)=\frac14\sum_{k=1}^5\sigma_k\csc x_k,
\qquad
f(\Phi)=-\frac14\sum_{k=1}^5\sigma_k\frac{\cos x_k}{\sin^2x_k}.
$$

Direct differentiation, independent of a trajectory approximation, gives $N'=-f/2$. The actual scalar equation $u\,du/d\Phi=g f$ therefore gives

$$
u^2=\frac1{16}+\frac15\int_0^\Phi f(a)\,da,
$$

$$
\ell=R\lambda=-u^2-gN
=\ell_0-\frac3{20}\int_0^\Phi f(a)\,da,
\qquad
\ell_0=\frac{C_0}{10}-\frac1{16},
\qquad C_0=\frac54-\frac1{\sqrt3}.
$$

This first integral is purely a mathematical identity for this stationary-source portion. It is not used after a moving source arrives and has no physical energy interpretation. Exact initial controls are $f(0)=0$, $N(0)=-C_0$, and $u(0)=1/4$.

The squared rational comparisons $4096<3\cdot37^2=4107$ and $3\cdot23^2=1587<1600$ imply

$$
\frac{43}{64}<C_0<\frac{27}{40},
\qquad
\frac3{640}<\ell_0<\frac1{200}.
$$

## Separate derivative certificate on the required phase interval

Let $H=3/40$, so $0\le h\le H$ when $0\le\Phi\le3/20$. Define

$$
J(x)=2\csc^3x-\csc x.
$$

For $0<x<\pi$, $J\ge1$ and

$$
J''(x)=\frac{24-20\sin^2x+\sin^4x}{\sin^5x}>0.
$$

Also $j(y)=2y^{-3}-y^{-1}$ decreases for $0<y\le1$. Differentiating the five-term field gives exactly

$$
8f'(\Phi)=J(x_1)-J(x_2)+J(x_3)-J(x_4)+J(x_5).
$$

Reflection gives $J(x_5)=J(\pi/6+h)$. Convexity gives $J(x_1)+J(x_5)\ge2J(\pi/6)=28$. For the even pair, the smaller sine is at $x_2=\pi/3-H$. Using $\sqrt3/2>45/52$, $\cos H\ge1-H^2/2=3191/3200$ and $\sin H\le H$ yields

$$
\sin x_2\ge\sin(\pi/3-H)
>\frac{45}{52}\frac{3191}{3200}-\frac3{80}
=\frac{137355}{166400}>\frac{33}{40}.
$$

The other even sine is at least $\sqrt3/2>33/40$. Thus each even $J$ is less than

$$
j(33/40)=\frac{84440}{35937}<\frac52.
$$

Together with $J(x_3)\ge1$, this proves $8f'>28-5+1=24$.

For an independent upper enclosure, convexity makes $J(\pi/6-h)+J(\pi/6+h)$ increasing in $h\ge0$. At its maximum $h=H$, the elementary sine bounds give

$$
\sin(\pi/6-H)
>\frac12\frac{3191}{3200}-\frac78\frac3{40}
=\frac{2771}{6400}>\frac37,
$$

$$
\sin(\pi/6+H)
>\frac12\frac{3191}{3200}+\frac67\left(\frac3{40}-\frac16\left(\frac3{40}\right)^3\right)
=\frac{504286}{896000}>\frac9{16}.
$$

Consequently the nearest-pair $J$ sum is less than

$$
j(3/7)+j(9/16)=\frac{623}{27}+\frac{6896}{729}=\frac{23717}{729}.
$$

The antipodal sine is $\cos h\ge3191/3200>99/100$, giving

$$
J(x_3)<j(99/100)=\frac{1019900}{970299}<\frac54.
$$

Each even $J$ is at least one, so

$$
8f'<\frac{23717}{729}+\frac54-2
=\frac{92681}{2916}<32.
$$

All constants above are explicit rational comparisons after the elementary trigonometric inequalities; there is no sampled phase scan or unverified arithmetic instrument. With $f(0)=0$, the conclusion is

$$
3<f'(\Phi)<4,
\qquad 3\Phi<f(\Phi)<4\Phi
\quad(0<\Phi\le3/20).
$$

## Reached interval and complete stationary-source margin

The derivative certificate must be used on an actual stationary-source interval. Bootstrap until the earlier of reached $\Phi=3/20$ and the first preparation arrival. Since $f>0$, $u>1/4$, hence the actual time to any positive reached phase obeys $\tau<4\Phi$. The leading nearest partner is the closest stationary site throughout this phase range. Its distance is

$$
d_1^0(\Phi)=\cos(\Phi/2)-\sqrt3\sin(\Phi/2)
\ge1-\frac78\Phi-\frac18\Phi^2.
$$

For every $\Phi\le3/20$, its preparation-arrival threshold satisfies

$$
d_1^0(\Phi)-\frac14
\ge\frac{1971}{3200}>\frac35\ge4\Phi>\tau.
$$

Thus a preparation arrival cannot be the first bootstrap exit. If phase $3/20$ had not been reached by $\tau=3/5$, the inequality $u>1/4$ would force that phase to have been reached already. The previously accepted continuation domain contains this time interval. Hence phase $3/20$ is actually reached with all sources still stationary. At that endpoint, each source emission is below $-1/4$ by more than $51/3200$ in dimensionless source time; the leading root attains the smallest such margin and the other four are earlier.

The first integral and $f<4\Phi$ also give

$$
\frac14<u<\sqrt{\frac1{16}+\frac25\Phi^2}
\le\sqrt{\frac{143}{2000}}<\frac{27}{100}.
$$

The whole prior preparation has speed magnitude at most $1/4$. Thus this local history remains strictly sub-wake; its five unique partner roots per receiver and absence of positive-delay self roots agree with the accepted complete ledger. In particular, both transmitter and receiver factors stay positive. Stationary candidates used above are actual roots by that uniqueness, not substituted emissions. The all-six cyclic symmetry is inherited from the accepted actual solution.

## Support enclosure, zero and ordering

Integrating the certified tangent bounds in the exact support identity yields the following strict enclosure for physical signed support on the reached stationary-source interval:

$$
\boxed{\quad
\frac3{6400}-\frac3{100}\Phi^2
<\lambda(\Phi)
<\frac1{2000}-\frac9{400}\Phi^2,
\qquad 0\le\Phi\le\frac3{20}.
\quad}
$$

At $\Phi=1/8$ the lower bound equals zero, so support is still strictly outward. At $\Phi=3/20$ the upper bound equals $-1/160000$, so support is strictly inward. Moreover

$$
\frac{d\lambda}{d\Phi}=-\frac3{200}f(\Phi)<0
\quad(\Phi>0),
$$

which proves exactly one zero between these phases. The earlier domain proof establishes $f>0$ on the remainder of the stationary-source interval through its first preparation arrival, with phase below $1/4$. Applying the same exact stationary-source identity there shows that support stays inward after this zero until that arrival; no second stationary-source zero is possible.

In event order, with $B$ the first moving-preparation arrival and $F$ the first release-emission arrival,

$$
\frac1{64}<\frac18<\Phi_*<\frac3{20}<\Phi_B<\Phi_F.
$$

The support zero occurs at actual dimensionless time $\tau_*$ satisfying $25/54<\tau_*<3/5$: integrate $1/4<u<27/100$ and use the phase bracket. Its physical time therefore obeys

$$
\frac{125}{27}<T_*<6.
$$

Transversality is quantitative. Since $d\Phi/dT=u/10$, at the zero

$$
\left.\frac{d\lambda}{dT}\right|_*
=-\frac3{2000}f(\Phi_*)u_*< -\frac9{64000}<0.
$$

The support sign change is a smooth change in the required normal acceleration, not a root singularity or a change in the selected evolution law. Variable speed and all roots remain present. The accepted broad signed bounds after moving preparation begins remain the only retained enclosures there: this refinement does not decide a later recrossing, a later extremum, or the sign at first feedback.

## Validation, falsifiers and preservation limits

The reference is the exact stationary-source five-site field and its directly differentiated identity $N'=-f/2$, with the independently accepted motion/root domain as premise. Exact initial controls and each rational comparison are displayed above. No new numerical instrument, target calculation, trajectory approximation, compute lease, additional agent or scientific job was launched. There is no runtime/resource profile or numerical replay artifact; analytical reconstruction, rather than a trajectory rerun, is the reproduction obligation. Arithmetic, trigonometric monotonicity, projection signs and continuation must still be checked independently.

Operator-checkable falsifiers are: an incorrect factor in $N'=-f/2$ or the support first integral; failure of any displayed rational inequality; a preparation arrival before reached phase $3/20$ despite the candidate/source margin; a missing root despite the sub-wake ledger; or an additional stationary-source zero despite $f>0$. A later support recrossing does not falsify this result because it is explicitly unresolved. No statement extends the accepted feedback horizon.

This file alone is newly authored for the refinement. The two earlier subject hashes are rechecked at handoff, and a scoped `git diff --no-index --check /dev/null` is used for whitespace hygiene. Those checks establish byte preservation and formatting only. The coordinator receives this frozen subject for separate review and integration; no older subject, independent reference or shared synthesis is edited.
