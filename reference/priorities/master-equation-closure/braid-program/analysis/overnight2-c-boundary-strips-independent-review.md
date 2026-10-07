# Independent review of the partial-equality exclusion strips

## Verdict and fixed premises

**Derived verdict: both strips are supported; no mathematical defect found.** In the original exact strictly ordered strictly subfield circular class, with $r_1=1$, the stated constants imply

$$
r_3\ge4\ \Longrightarrow\ r_2-1>\varepsilon_{\mathrm{in}},\qquad
r_3\ge9\ \Longrightarrow\ r_3-r_2>\varepsilon_{\mathrm{out}}.
$$

The proof uses the already checked original-class bound $r_3<R=35$, constructive separation floor $0<\delta<1$, complete circular root theorem and the two independently reconstructed partial-equality residual margins. The frozen subject is [the boundary-strip note](overnight2-c-partial-boundary-strips.md), supplied SHA-256 `e4dd9e718f770cbd02795330bd50ac84fcbb1f1b1f6a065ffb09abdcc11cc411`. The law remains the logarithmic $K_{\log}=c_f=1$ law with unchanged transmitter weighting, unit persistent polarities and all positive-delay roots. The review is analytical, uses the live Ramon E. Moore lens, and introduces no numerical target or instrument.

The constants are exactly

$$
t_0=\frac\delta4,\qquad d_0=\frac{\delta^2}{512R^2},\qquad
\mu_{\mathrm{in}}=\frac2{585},\qquad \mu_{\mathrm{out}}=\frac9{320R},
$$

$$
\varepsilon_j=\min\left(\frac\delta4,\frac{\mu_j d_0^3t_0^2}{212}\right)>0.
$$

Here $d_0$ is a lower bound on the dimensionless transmitter factor, not a distance. The proof needs both entries in the minimum: one maintains separation and the other limits residual change.

## Independent interpolation and complete-root reconstruction

Start at the hypothetical exact configuration and move only the middle pair radius linearly by an amount of magnitude $h$ while keeping the angular rate and all phases fixed. Each member's position derivative at any fixed time has norm at most $h$, and its displacement from the exact starting configuration is at most $h$. Consequently every present pair distance on the path is at least $\delta-2h\ge\delta/2$ when $h\le\delta/4$. This is conservative because only one pair moves, but it correctly includes that pair's own antipodal separation as well as cross-pair separations.

For the inner strip, the middle radius decreases from $r_2$ to one. For the outer strip it increases from $r_2$ to $r_3$. In both cases every radius lies in $[1,r_3]$, so every speed is at most the original outer speed $\omega r_3<1$. In particular, increasing the middle radius never introduces a new maximum speed or a wake-speed crossing. The original-class radius theorem is used solely at the exact starting configuration; it is not reapplied to the partially equal endpoint or intermediate prescribed circles.

The [complete-root bound](overnight2-c-root-bound-independent-review.md) is geometric and does not require balance of these comparison histories. It gives one ordinary positive root for each directed distinct pair, zero positive self roots and

$$
\tau\ge\frac{\delta/2}{2}=t_0,\qquad
D\ge\frac{(\delta/2)^2}{128R^2}=d_0.
$$

Thus all thirty partner roots persist throughout the path. Distinctness excludes coincident labels even at partial equality, and the positive factor floor prevents singular-root loss. The unique roots are differentiable by the ordinary implicit-function theorem, with the usual one-sided interpretation at path endpoints.

## Independent derivative and constant accounting

Fix reception time zero, write $p=x(q)-y(q,-\tau(q))=\tau n$, and let $v_s$ denote the source velocity at its emission time. Partial $q$ derivatives below hold source time fixed. The chain rule gives

$$
\dot p=x_q-y_q+v_s\dot\tau,\qquad
\dot\tau=n\cdot\dot p,
$$

$$
D\dot\tau=n\cdot(x_q-y_q),\qquad D=1-n\cdot v_s.
$$

The sign of $v_s\dot\tau$ is positive in the chord derivative because the source position is subtracted and its time argument is $-\tau$. With $|x_q|,|y_q|\le h$, $|v_s|\le1$ and $d_0\le1$, this yields

$$
|\dot\tau|\le2h/d_0,\qquad |\dot p|\le4h/d_0.
$$

Using $\dot n=(I-nn^{\mathsf T})\dot p/\tau$ actually gives the stronger bound $4h/(d_0t_0)$, so the subject's conservative $8h/(d_0t_0)$ is sound. At fixed time, $|\partial_qv_s|\le\omega h\le h$; circular source acceleration has norm $\omega^2r_s\le1$. Including the moving emission time gives

$$
\dot v_s=\partial_qv_s-\partial_t v_s\dot\tau,\qquad
|\dot v_s|\le3h/d_0.
$$

Therefore, since $t_0\le1$,

$$
|\dot D|\le|\dot n|\,|v_s|+|\dot v_s|\le11h/(d_0t_0).
$$

The inequalities $d_0,t_0\le1$ follow from the declared $0<\delta<1$, $R=35$. For a signed row $A=\sigma n/(\tau D)$, the direction, delay and factor derivatives contribute bounds $8h/(d_0^2t_0^2)$, $2h/(d_0^2t_0^2)$ and $11h/(d_0^3t_0^2)$ respectively. Their sum is no greater than

$$
\frac{(10d_0+11)h}{d_0^3t_0^2}\le\frac{21h}{d_0^3t_0^2}.
$$

Each receiver has five partner rows. Its required circular acceleration changes at rate at most $\omega^2h\le h$. The local radial and tangential directions at reception remain fixed because the phase does not vary with $q$. Thus each scalar residual, and in fact its two-component vector norm, changes over the unit parameter interval by at most

$$
\frac{5\cdot21h}{d_0^3t_0^2}+h\le\frac{106h}{d_0^3t_0^2}.
$$

This accumulation includes all roots and both changing-emission-time terms. It does not use a special sign for the radius derivative, so increasing the middle radius is as admissible as decreasing it. No additional response factor has entered the estimate.

## Both endpoint contradictions

For $r_3\ge4$, suppose $h=r_2-1\le\varepsilon_{\mathrm{in}}$. The comparison endpoint has equal unit inner radii and unchanged $r_3$. The [independently reviewed inner tangential theorem](overnight2-c-inner-tangent-independent-review.md) gives maximum absolute tangential residual at least $\mu_{\mathrm{in}}=2/585$ for this arbitrary prescribed circle. Exactness at the starting point and the sensitivity estimate instead bound every endpoint scalar residual by

$$
\frac{106h}{d_0^3t_0^2}\le\frac{\mu_{\mathrm{in}}}{2}.
$$

This is impossible. It excludes equality at the proposed strip width as well as smaller gaps, establishing the strict inner-gap bound.

For $r_3\ge9$, suppose $h=r_3-r_2\le\varepsilon_{\mathrm{out}}$. The comparison endpoint has equal outer radii $b=r_3<R$. The [outer-equal independent review](overnight2-c-outer-equal-independent-review.md) establishes maximum absolute tangential residual strictly greater than $9/(320b)>\mu_{\mathrm{out}}$. The same change estimate from the exact starting point gives at most $\mu_{\mathrm{out}}/2$. This contradiction proves the strict outer-gap bound. The positivity of both widths and $212=2\cdot106$ make the contradiction quantitative without evaluating their very small values numerically.

The boundary inputs are residual lower bounds for arbitrary distinct comparison configurations. They are stronger than nonexistence statements and are exactly what the quantitative transfer requires. No assumption of exactness at either comparison endpoint is made.

## Hand controls, limits and falsifiers

Zero displacement gives identically zero parameter derivatives and residual change. As a separate static check of the implicit-root sign and signed-row derivative, an opposite pair of radius $r(q)=1+q\eta$ has $\tau=2r$, $D=1$, $\dot\tau=2\eta$ and own-antipode radial contribution $-1/(2r)$ with derivative $\eta/(2r^2)$. The reconstructed formulas reproduce those identities directly. These are analytical hand controls; no computation or target was run.

The result constrains only the named high-outer-radius sectors of the original exact strictly ordered strictly subfield class. It does not exclude the remaining compact interior, the lower-radius partial-equality regions, superfield configurations or arbitrary trajectories, and it makes no stability or feasible-cover-cost claim. A failed boundary residual margin, a path radius exceeding the original $r_3$, loss of the $\delta/2$ separation or $d_0$ factor floor, an omitted positive root, or an incorrect time-composition derivative would invalidate the relevant step. An exact original-class configuration inside either closed proposed strip would falsify the corresponding conclusion.

The live report clock retains launch 03:25:15 UTC, exploration stop 13:55:15 UTC and deadline 15:25:15 UTC on October 7, 2026; the clock tool returned 08:45:47 UTC during this review. Only this new independent review was authored for the strip assignment. The frozen subject, previous reviews, main report and shared owners were preserved. Parent integration is separate; this completes the assigned review queue.
