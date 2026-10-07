# A vanishing self delay requires a second loss of divisor margin

## The question

An individual recent self contribution can grow without bound as its delay approaches zero. That alone does not prove divergence of the complete acceleration: other roots could contribute in the opposite direction. The following estimate makes the necessary compensation explicit for bounded-acceleration exact histories with uniformly separated members. A small self delay then requires a small absolute divisor at another root whose delay stays bounded away from zero.

This is a derived analytical subject awaiting independent review. Use the canonical scenario $K=c_f=1$, unit polarity magnitudes, positive self polarity, all ordinary positive-delay roots and the absolute source divisor. Retain the complete $C^2$, finite-member, collision-free exact-domain hypotheses of the [recent-gap theorem](overnight2-b-independent-wake-speed-crossing.md) and [finite-chart theorem](overnight2-b-independent-exact-root-chart-structure.md), including a locally uniform finite complete-past delay cutoff. Exactness holds on a connected future interval. The selected six-member class satisfies the unit polarity-magnitude convention; no new interaction weight is introduced.

For one receiver assume:
- its speed is at least one throughout the future, as supplied by the sign theorem when the connected exact interval contains a strict above-wake reception;
- its acceleration norm is uniformly bounded by $M>0$ on the future;
- all source speeds are uniformly bounded by $V_*<\infty$ on that future;
- every simultaneous receiver-partner separation is at least $s_*>0$ there.

The finite-chart theorem gives a fixed finite total root count $N$ for this receiver on the connected exact interval. Only its finite-chart conclusion is used; no parity inference from an insufficient remote hypothesis is needed. Suppose there are receptions $t_n\to\infty$ with positive self causal delays $d_n\to0$.

Choose once and for all
$$
0<\eta\le \min\left\{\frac1M,\frac{s_*}{2(1+V_*)}\right\}. \tag{1}
$$
For all sufficiently late receptions, all source-time segments of length at most $\eta$ lie in the future where the uniform bounds hold.

The proposed conclusion is that, at those same receptions, some root with delay at least $\eta$ has absolute divisor $\nu_n$ satisfying
$$
0<\nu_n\le
\frac{N}{\eta^2\left(1/(M d_n^3)-M\right)}
\le \frac{2NM}{\eta^2}d_n^3
\longrightarrow0, \tag{2}
$$
where the last bound applies once $d_n^3\le1/(2M^2)$. It need not be a partner root: a nonrecent self root can also supply the compensation. The conclusion is a simultaneous approach to a second divisor degeneracy, not a finite-time event or a selected cancellation rule.

## Recent partners are uniformly absent

At reception $t$, for a partner source and $0<d\le\eta$,
$$
|X_i(t)-X_j(t-d)|
\ge |X_i(t)-X_j(t)|-|X_j(t)-X_j(t-d)|
\ge s_*-V_*d.
$$
Therefore its distance-minus-delay gap is at least
$$
s_*-(1+V_*)d\ge s_*/2>0.
$$
There are no partner roots in this recent interval. This uniform exclusion uses both the separation floor and the source-speed bound. Pointwise collision freedom alone would not give a single $\eta$ for the whole tail.

## Recent self projections have the same sign

At each reception define the unit vector $e=\dot X_i(t)/|\dot X_i(t)|$. At a self root of delay $0<d<\eta$, the unit chord direction $n$ is the delayed average of this member's velocity. The acceleration bound gives
$$
|n-\dot X_i(t)|\le Md/2.
$$
Since $|\dot X_i(t)|\ge1$ and $M\eta\le1$,
$$
e\cdot n\ge|\dot X_i(t)|-Md/2\ge1/2.
$$
Every recent self row has positive projection along the same receiving vector $e$, regardless of its signed divisor:
$$
e\cdot a_d=\frac{e\cdot n}{d^2|D_d|}
\ge\frac1{2d^2|D_d|}>0. \tag{3}
$$
At the particular small root $d_n$, compare the average velocity to the delayed source velocity instead:
$$
|n_n-\dot X_i(t_n-d_n)|\le Md_n/2.
$$
Using $|n_n|=1$ yields
$$
|D_n|=|1-n_n\cdot\dot X_i(t_n-d_n)|
\le Md_n/2.
$$
Thus its individual projected contribution obeys
$$
e_n\cdot a_{d_n}\ge\frac1{M d_n^3}. \tag{4}
$$
All other recent self contributions are nonnegative in this projection by (3), so they cannot cancel (4). This projection is chosen separately at each reception; no common fixed direction over an infinite time interval is asserted.

## Exact balance forces a nonrecent divisor to shrink

Separate the complete finite sum into roots with delay $d<\eta$ and roots with $d\ge\eta$. The recent part consists only of self rows. If the nonrecent list were empty, exactness and (4) would imply
$$
\frac1{M d_n^3}\le e_n\cdot\ddot X_i(t_n)\le M,
$$
which is impossible once $d_n^3<1/M^2$. Hence at sufficiently small $d_n$ there is at least one nonrecent root.

Let $\nu_n$ be the minimum of $|D|$ over that nonempty finite nonrecent list. Every one of its rows has norm at most $1/(\eta^2\nu_n)$, so its total norm is at most $N/(\eta^2\nu_n)$. Exact balance gives
$$
\frac1{M d_n^3}
\le e_n\cdot A_{\rm recent}
=e_n\cdot\ddot X_i(t_n)-e_n\cdot A_{\rm nonrecent}
\le M+\frac{N}{\eta^2\nu_n}.
$$
For a positive left-hand excess, rearrangement proves the first bound in (2). If $M^2d_n^3\le1/2$, then
$$
\frac1{M d_n^3}-M\ge\frac1{2M d_n^3},
$$
which proves the cubic upper bound in (2). The selected minimum is attained at an actual retained root, so the estimate concerns an actual ordinary source divisor at that reception.

The argument does not assume that this particular root supplies all compensation, identify a unique branch, or declare that the total acceleration diverges. It proves only that uniformly ordinary nonrecent rows cannot compensate the increasingly large recent projection when the total acceleration remains bounded.

## Relation to bounded slow planar projections

The [bounded-projection subject](overnight2-b-bounded-projection-root-collapse.md), under its own separate review, derives $d_n\to0$ at late receptions for bounded above-wake motion whose planar projection has speed at most one. Combining its accepted version, if obtained, with the additional uniform acceleration, source-speed and simultaneous-separation assumptions here would require both:
$$
d_n\to0,\qquad |D_n|\le Md_n/2\to0
$$
at recent self roots, and
$$
d_{\rm nonrecent}\ge\eta,\qquad |D_{\rm nonrecent}|\le 2NMd_n^3/\eta^2\to0
$$
at some other roots at those same receptions.

This describes a necessary paired loss of ordinary margins if such an exact aperiodic bounded history exists. It does not construct one, prove finite-time failure, infer stability or authorize a continuation through either boundary. If the uniform simultaneous-separation floor is absent, partner roots could become recent and this particular positive-projection decomposition would need a new analysis. If source velocities or receiving acceleration are unbounded, the stated constants also fail.

## Evidence and falsifiers

The proof is entirely analytical: source-distance triangle inequality, the average-velocity estimate from bounded acceleration, the canonical absolute-divisor row, finite root counts and exact vector balance. No numerical target, solver run or independent row-cancellation assumption is used.

A small self root with negative receiving-velocity projection under (1) would refute (3). A partner root below $\eta$ would refute the declared separation/speed guard. An exact history meeting every uniform hypothesis and a sequence $d_n\to0$ while all nonrecent divisors stay uniformly bounded away from zero would refute (2). A change of root count despite the accepted finite ordinary chart hypotheses would defeat the count premise. These falsifiers distinguish failure of a stated bound from a new physical event rule.

Independent review must reconstruct the common recent projection, the threshold and cubic coefficient, the existence of a nonrecent root and the fixed finite count premise. Parent integration belongs in [the current research account](overnight2-b-followup-and-research-2026-10-07.md). All earlier subjects, references, instruments and receipts remain unchanged.
