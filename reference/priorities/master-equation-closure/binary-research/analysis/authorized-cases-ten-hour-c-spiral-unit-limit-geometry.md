# Infinite unit-speed approach has regular outward grazing limits

## Derived candidate

Suppose an all-future strict-subfield continuation of the admitted logarithmic family has times $t_j\to\infty$ with $|v(t_j)|\to1$. Then

$$
n(t_j)\cdot v(t_j)\longrightarrow0,
\qquad \liminf_j r'(t_j)>0.
\tag{1}
$$

Every normalized subsequential limiting trajectory through those times has a regular unit-speed point at scaled time one. Its source denominator and separation remain positive. At that point,

$$
v=Jn,\qquad
\Lambda:=(n+v)\cdot v_s\ge0.
\tag{2}
$$

If $\Lambda>0$, the limiting curve has an isolated quadratic unit touch followed locally by return below unit speed. If $\Lambda=0$, this calculation does not classify the higher-order contact. These are statements about limits of actual strict trajectories, not an assertion that a perturbed member reaches unit speed or that any continuation rule has been selected.

Claim grade: derived candidate pending independent assessment. The fixed family and law are those of the [method admission](authorized-cases-ten-hour-c-spiral-method-admission.md). The result uses the independently assessed [compact infinite regime](authorized-cases-ten-hour-c-spiral-compact-infinite-regime.md) and the exact [speed-extremum identity](authorized-cases-ten-hour-c-spiral-speed-extrema.md). It assumes no uniform total-speed margin and no scalar speed limit.

## A positive lag floor is already available

The compact-regime theorem gives an eventual tangential-speed floor $h/r\ge z_0>0$ and comparable source/receiver radii $r_s\ge c_s r$. The two-endpoint angular estimate used in the accepted torque proof gives

$$
\delta=\int_s^t\frac{h(u)}{r(u)^2}\,du
\ge\frac{h(s)R}{2rr_s}
\ge\frac{z_0}{2},
\tag{3}
$$

using $R\ge r$ and the late source. The acute upper bound remains $\delta<\pi/2$. Thus the positive lag cannot vanish along the proposed unit-speed sequence.

The chord decomposition at any stationary speed with positive orientation gives

$$
v=bJn,\qquad
p=\frac{b r_s\sin\delta}{R}.
\tag{4}
$$

At a limiting unit-speed point, (3), $R\le r+r_s$, and the source-radius comparison therefore imply the positive lower bound

$$
p\ge\frac{c_s}{1+c_s}\sin(z_0/2)>0.
\tag{5}
$$

The constants are existential and specific to the admitted infinite regime. Their positivity, rather than a numerical value, is the conclusion used here.

## Compactness turns the unit sequence into a regular maximum

Let $w_j=t_j-s_0$ and rotate each normalized path by its current angle:

$$
Q_j(u)=\frac{e^{-i\theta(t_j)}x(s_0+w_j u)}{w_j}.
$$

The compact-regime theorem gives a subsequence converging in $C^2$ on every compact positive $u$ interval to an exact ordinary logarithmic trajectory $Q$. Its speed is at most one everywhere and equals one at $u=1$. Its range, source radius and denominator retain positive margins. The positive tangential-speed floor fixes the orientation.

Because $u=1$ is an interior maximum of the limiting speed, $Q'(1)\cdot Q''(1)=0$. The unchanged response $Q''=-n/(RD)$ gives $n\cdot Q'=0$, and positive angular momentum selects $Q'=Jn$. This proves the limiting version of (1), and (5) gives its positive radial velocity.

These conclusions hold for every subsequence extracted from the original unit sequence. Failure of $n(t_j)\cdot v(t_j)\to0$ or of a uniform positive lower radial velocity would yield a further convergent subsequence contradicting those limiting conclusions. Thus (1) holds on the original sequence, not merely on one extracted subfamily.

The exact response also supplies the regularity needed to differentiate speed again. On compact positive windows, differentiating the response uses only convergent source position, velocity and acceleration, along with the ordinary source-clock derivative. Consequently the $C^2$ convergence upgrades to $C^3$ on such windows. No singular endpoint derivative or unproved compactness at zero scaled time is invoked.

## Curvature and interpretation at the limiting touch

At a stationary speed $b$, the exact identity is

$$
b''=\frac{1-b^2D-v\cdot v_s}{bR^2D^2}.
$$

At the limiting unit point this becomes

$$
b''(1)=-\frac{(n+v)\cdot v_s}{R^2D^2}
=-\frac{\Lambda}{R^2D^2}.
\tag{6}
$$

A local maximum has $b''(1)\le0$, proving $\Lambda\ge0$. If the inequality is strict, Taylor's theorem on this existing limiting solution gives $b(u)<1$ on both punctured sides sufficiently near one. That is an isolated quadratic touch and return of the limiting trajectory. The zero-curvature case needs higher information.

The limiting root census is inherited from the compact-regime proof. A positive-delay self root would require a unit straight segment, incompatible with the nonzero partner acceleration; the partner root remains ordinary and unique. A unit point in this limit is therefore a regular geometric touch. It is not a divergence hidden by a discarded root or by a receiver multiplier.

For the actual strict-domain member, every finite $t_j$ still has speed below one. The theorem says that any such asymptotic unit approach is outward and has a regular grazing description after normalization. It does not turn the limiting unit point into a finite event on that member. If its upper limiting speed equals one, the earlier speed-limit rigidity and extrema theorem also require recurrent lower-speed passages; a monotone all-future approach to one remains excluded.

## Remaining case and falsifiers

Finite first unit arrival remains a separate branch with its own source geometry and continuation obstruction. The present result concerns only infinite strict continuations. It also does not establish the existence of an infinite member with upper limiting speed one or choose between asymptotic return to the spiral and another compact recurrent history.

Falsifiers are a failure of the compact infinite-regime theorem; loss of source-velocity or source-acceleration convergence on its positive scaled windows; a gap in the two-endpoint lag estimate (3); incorrect orientation selection in (4); or a sign error in (6). A limiting degenerate touch with $\Lambda=0$ does not refute the theorem, because its higher-order fate is explicitly left open.

The exact admitted spiral is a consistency case for the lag and radius bounds and has no unit-speed sequence. The curvature formula agrees algebraically with the independently established logarithmic grazing expression. No new numerical instrument, amplitude, history or response is introduced. Only this new subject is written; prior sources and references remain frozen, and no owned computation is active. Independent assessment is required before integration.
