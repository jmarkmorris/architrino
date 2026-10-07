# Blind reference: uniform subfield margin excludes asymptotically radial motion

**Derived conditional reference, frozen before the new subject.** Retain the actual all-future logarithmic mirror family, positive angular orientation, acute source lag, $r,h,s\to\infty$, and assume additionally one complete-history speed bound $|v|\le\beta<1$. The additional bound is not proved for a departing member here. Write $z=h/r$ for tangential speed. The claim tested is whether $z$ can tend to zero along a late sequence, and what follows if it cannot.

## Entire causal arcs remain comparable

For a causal interval $[s,t]$, let $R=t-s$ and $C=[x(s)+x(t)]/2$. The complete bound gives

$$
|x(u)-C|\le\beta R/2\quad(s\le u\le t),\qquad
\frac{1-\beta}{2}R\le r(u)\le\frac{1+\beta}{2}R. \tag{1}
$$

Both root factors stay at least $1-\beta$. Thus at every positive-radius point of a scaled limit, its complete sampled arc lies in the same positive-radius component, and the exact row supplies locally bounded acceleration and regular clocks. No endpoint-only comparison is substituted for (1).

Suppose there are $t_j\to\infty$ with $h(t_j)/r(t_j)\to0$. Set $r_j=r(t_j)\to\infty$ and $q_j(u)=x(t_j+r_ju)/r_j$. Position compactness holds on the limiting positive-physical-time domain. Around every compact part of its positive-radius component containing zero, (1) provides source coverage and positive radii, and the fixed speed margin gives source-velocity and acceleration compactness. The accepted advancing source ratio prevents a retained source from reaching the lower scaled time boundary. Passing to a subsequence yields a regular solution of the unchanged row on that component, with $|q(0)|=1$ and speed at most $\beta$.

Its angular quantity at zero vanishes. Since the original $h$ is positive and increasing, all preceding points in that same component have limiting angular quantity zero as well. The limiting past there lies on one fixed radial ray. Its source arcs remain in that component by (1). Local uniqueness and radial invariance therefore continue it radially for positive scaled times as long as radius is positive. This step uses the whole limiting sampled past, not merely zero angular quantity at one instant.

## A bounded-speed radial limit is impossible

On the radial limit, both endpoints point along that ray, $n=e$, and radial velocity $p$ obeys

$$
p'=-\frac1{RD}\le-\frac{c_\beta}{r},\qquad
c_\beta=\frac{1-\beta}{2(1+\beta)}>0. \tag{2}
$$

A finite right endpoint of the positive-radius component would have radius tending to zero. Bounded speed then gives $r(u)\le\beta(U-u)$ near that endpoint, so the integral of $1/r$ diverges. Equation (2) would force unbounded negative radial velocity, contradicting the inherited bound. Hence the component extends to all future scaled times. But then $r(u)\le1+\beta u$, and the integral of its reciprocal also diverges at infinity. Equation (2) gives the same contradiction. Therefore the assumed sequence cannot exist:

$$
\liminf_{t\to\infty}\frac{h(t)}{r(t)}>0. \tag{3}
$$

The lower constant is existential and may depend on the actual member and its complete speed margin. No numerical value has been extracted from the compactness argument.

## Linear radius and compact normalized histories

Choose $\eta>0$ such that $z\ge\eta$ eventually. Since sources escape, every sufficiently late causal arc lies in this regime. From (1),

$$
\delta=\int_s^t\frac{z(u)}{r(u)}du\ge\frac{2\eta}{1+\beta}.
$$

The acute-lag inequality $\sin\delta\ge2\delta/\pi$, the torque identity and (1) then give

$$
h'=\frac{rr_s\sin\delta}{R^2D}
\ge\frac{\eta(1-\beta)^2}{\pi(1+\beta)^2}>0. \tag{4}
$$

Integrating proves a positive linear lower bound for $h$, hence for $r$ because $h\le\beta r$. The upper bound $r\le r(0)+\beta t$ is already available. Thus the actual radius is comparable to elapsed time on the whole sufficiently late future, without assuming that scalar speed converges.

Time-normalized histories now have uniform positive radii on every fixed positive scale interval. The advancing source ratio, (1), and the fixed denominator margin place their source histories in corresponding compact regular intervals. Exact-row bounds give equicontinuous position and velocity; using bounded source acceleration gives equicontinuity of the scaled acceleration as well. Consequently the histories are precompact locally in $C^2$ on positive scale intervals, including any fixed window containing the normalized source and receiver. Removing the current planar rotation preserves precompactness.

This does not identify the limit set with the single spiral orbit: the limiting speed may vary. It supplies neither a scalar speed limit, a fixed phase offset, attraction, nor proof that any nonzero member retains the hypothesized uniform margin. The exact spiral satisfies all statements and is the known analytical case. Falsifiers are a source leaving the positive-radius component despite (1), invalid radial invariance from the whole limiting past, or a bounded-speed positive-radius radial solution evading the divergent integral in (2). No numerical target or changed physical preparation is introduced.
