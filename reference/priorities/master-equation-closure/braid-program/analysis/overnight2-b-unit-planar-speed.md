# Unit planar speed forbids an oscillating height in the ordinary exact domain

## Statement

A short chord connecting two equal-height receptions has only its planar displacement. If the planar path runs at unit speed, that chord cannot outrun the wake. This elementary geometric fact conflicts with the positive recent self-gap sign forced by any nonzero axial velocity in an exact ordinary history.

This derived subject awaits independent analytical review. Retain the [accepted wake-speed sign theorem](overnight2-b-independent-wake-speed-crossing.md): finitely many complete $C^2$ paths, collision-free simultaneous positions, a locally uniform finite complete-past delay bound, every positive-delay root ordinary, all self and partner roots included, positive self polarity, the absolute source divisor, and a finite canonical acceleration sum equal to the prescribed acceleration on a connected reception interval $I$. The scenario is $K=c_f=1$. Bounded complete past positions are sufficient for the remote assumption. No ceiling, source truncation or event response is introduced.

For one member write its physical position as
$$
X(t)=(Y(t),z(t))\in\mathbb R^2\times\mathbb R,
$$
and assume
$$
|\dot Y(t)|=1\qquad(t\in I). \tag{1}
$$
The proposed structural conclusion is:

**Either the axial coordinate $z$ is constant on $I$, or it is strictly monotone on $I$.**

In particular, a complete nonconstant periodic axial profile is impossible if exactness and (1) hold over its whole history. The planar path may have variable radius and angular rate; only its speed is fixed in (1). The conclusion is a necessary condition, not an existence theorem for monotone or constant height.

## Positive recent-gap sign

If $z$ is nonconstant on $I$, the mean-value theorem on a compact subinterval gives a reception with $\dot z\ne0$. At that point
$$
|\dot X|^2=|\dot Y|^2+\dot z^2=1+\dot z^2>1.
$$
The accepted exact-history theorem then gives the constant recent-gap sign $\sigma=+1$ throughout the connected interval. More precisely, near every interior reception $t_0$ there are a reception neighborhood $U$ and a number $d_*>0$ such that
$$
|X(t)-X(t-d)|>d\qquad(t\in U,\ 0<d\le d_*). \tag{2}
$$
The local uniformity in both reception and delay is essential. A sign statement only at the fixed reception $t_0$ would not exclude nearby equal-height chords approaching it. The accepted theorem supplies exactly this local uniform form, including at unit-speed receptions.

## Equal-height chords imply local injectivity

Choose a smaller open interval $V$ containing $t_0$, with its closure in $U\cap I$ and length less than $d_*$. Suppose two different times $u<v$ in $V$ satisfy $z(u)=z(v)$. The full displacement then has only its planar component, and by (1)
$$
|X(v)-X(u)|
=|Y(v)-Y(u)|
\le\int_u^v|\dot Y(s)|\,ds
=v-u.
$$
But $v\in U$ and $0<v-u<d_*$, so (2) requires the strict opposite inequality. This is a contradiction. Thus $z$ is injective on $V$.

A continuous injective real-valued function on an interval is strictly monotone there. For completeness, if three ordered arguments had a middle value outside the order established by the endpoint values, the intermediate-value theorem on the adjacent subintervals would produce the same value at two different arguments. Therefore each local interval $V$ has a definite increasing or decreasing orientation.

The orientation agrees on overlapping local intervals, because their open intersection contains two ordered distinct times. The sets of interior receptions with increasing and decreasing local orientation are disjoint open sets whose union is the connected interior of $I$. Only one can be nonempty. Hence every point has the same local orientation. A finite overlapping cover of any compact subinterval propagates the strict order between its endpoints, proving global strict monotonicity on the interior. Continuity extends that strict order to included endpoints: a hypothetical equality with an endpoint would conflict with strict order at an intermediate interior point.

This proves the stated alternative. The proof uses only $C^1$ kinematics after invoking the accepted $C^2$ exact-history theorem; no third derivative or nondegenerate turning point is needed. Plateaus, degenerate turns and arbitrarily flat extrema are all included in the exclusion.

## A planar projection bounded by wake speed

The equal-height chord argument only needs $|\dot Y|\le1$. More generally, suppose this weaker planar bound holds on $I$ and the full history has at least one strict above-wake reception there. The accepted sign theorem again supplies (2), and the identical local-injectivity proof makes $z$ strictly monotone throughout $I$. In this implication the above-wake reception is an explicit premise; nonconstant height alone does not supply it when the planar speed is smaller than one.

Consequently, for a complete exact history with periodic axial coordinate and planar speed everywhere at most one, full speed must be everywhere at most one as well. If a strict above-wake reception existed, strict axial monotonicity would contradict periodicity. This includes constant periodic height: it cannot be strictly monotone, and its full speed already equals its planar speed. This is a derived geometric restriction, not a modification of the equation.

For a complete periodic exact path having some strict above-wake speed, every fixed planar projection must therefore have speed strictly above one at some reception. Indeed, if one orthogonal projection had speed at most one everywhere, its complementary scalar coordinate would be periodic and the preceding argument would apply. The receptions can depend on the projection. This necessary condition neither says that all projections exceed one simultaneously nor replaces the complete-root requirements.

## Selected six-member consequence

For the existing six-member radius/phase/height class, write normalized time $\tau=t/R$ and physical positions
$$
X_\ell(t)=R\bigl(\rho(\tau)\cos(\beta\tau+p(\tau)+\ell\pi/3),
\rho(\tau)\sin(\beta\tau+p(\tau)+\ell\pi/3),
(-1)^\ell z(\tau)\bigr).
$$
A dot below means normalized-time differentiation. The physical planar speed is
$$
|\dot Y_\ell|^2=\dot\rho^2+\rho^2(\beta+\dot p)^2.
$$
Whenever this expression equals one at every reception, the theorem prohibits a nonconstant periodic height under complete bounded ordinary exactness. If it is merely at most one, periodic height instead requires full speed at most one. The conclusion is independent of the common scale $R$.

The particular constant-radius case $\rho=1$, $p=0$, $\beta=1$ therefore excludes **every** nonconstant periodic $C^2$ height profile at every amplitude and frequency, provided the stated complete-history assumptions hold. This includes all cosines $H\cos(\kappa\tau)$ with $H,\kappa>0$. It is stronger in this restricted class than the independently reviewed [turning-curvature test](overnight2-b-independent-wake-speed-tangency.md), which examines the gap at the turning reception itself. The stronger proof compares nearby equal-height receptions using the uniform recent-gap theorem; it does not invalidate that earlier local necessary condition.

Positive planar radius makes the six simultaneous positions distinct. Bounded periodic radius and height supply the complete-past position bound. A proposed unit-planar-speed coupled profile that violates either property does not acquire this theorem's hypotheses automatically. Relatively periodic planar rotation suffices; absolute periodicity of the whole spatial position is unnecessary.

## Why large turning curvature does not evade the result

For the cosine at a height maximum, the fixed-reception recent gap can have positive leading coefficient when $H\kappa^2>1/\sqrt3$. That is consistent with the earlier necessary curvature test. It does not establish a uniform recent-root gap in a neighborhood of that reception.

At neighboring normalized times $-\epsilon$ and $+\epsilon$, the cosine heights agree exactly. Their normalized delay is $2\epsilon$, and their planar chord has length $2|\sin\epsilon|<2\epsilon$. Thus their full chord lies below the wake cone for every small positive $\epsilon$. At the later reception the instantaneous speed is strictly above one when $\sin(\kappa\epsilon)\ne0$. Continuity of the gap in positive delay then yields a recent self root between zero and $2\epsilon$ for the prescribed cosine history. Those roots approach zero as $\epsilon\downarrow0$.

This last construction is a kinematic illustration, not an exact evolution or a claim that every such root is ordinary. Either nonordinariness occurs, or the accumulating recent roots are incompatible with the locally uniform gap of an exact ordinary history. No cancellation or discarded root is used. It explains why increasing turning acceleration cannot restore exact ordinary balance in the unit-planar-speed oscillating class.

## Falsifiers and evidence boundary

The derived conclusion would be refuted by a history meeting every exact-domain assumption and unit planar speed on one connected interval, but having a nonconstant nonmonotone axial coordinate there. A failure of local uniformity in the accepted recent-gap theorem, an equal-height chord longer than its unit planar arclength, or a continuous locally injective scalar function on an interval that changes monotonic orientation would defeat the respective proof step.

The theorem does not exclude arbitrary profiles whose planar speed exceeds one at some receptions, profiles with constant height and full speed at most one, or strictly monotone bounded height on an unbounded interval. It neither constructs those histories nor establishes stability. General above-wake motion remains permitted by the selected canonical equation; the restrictions use the explicit unit or at-most-unit planar projection hypotheses.

Independent review must reconstruct the local-to-global monotonicity step and verify that the cosine illustration uses reception-dependent chords, not the earlier fixed-reception expansion. No numerical instrument or target is required. The parent owns integration into [the current research account](overnight2-b-followup-and-research-2026-10-07.md), preserving all frozen earlier subjects and independent reports.
