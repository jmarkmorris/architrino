# Exact balances with every member below wake speed: six members, and a family of larger ones

## Result

Six architrinos, arranged as three diametrically opposite like pairs on three different circles and turning together at one angular rate, satisfy the unchanged Master Equation exactly, and every one of them moves slower than the wake speed. Two pairs are positive and one is negative, so the assembly has a net polarity of two.

| Pair | Polarity | Radius, in $K/c_f^2$ | Angle of the pair's line | Speed, in $c_f$ |
| --- | --- | --- | --- | --- |
| 1 | $+$ | $2.436258599386$ | $0^\circ$ | $0.527088513$ |
| 2 | $+$ | $4.489625138713$ | $56.0969^\circ$ | $0.971337706$ |
| 3 | $-$ | $2.592353959287$ | $81.7873^\circ$ | $0.560859998$ |

The common angular rate is $\omega=0.216351627564\,c_f^3/K$, a period of $29.04$.

This is the first finite configuration on record that moves, balances exactly under the unchanged equation, and has no member at or above wake speed. Because no member reaches wake speed, none receives its own wake: each receives exactly one contribution from each of the other five. The balance is therefore free of the self-root birth that obstructs every known approach to wake speed from below.

It is unstable. The delayed first variation has thirteen characteristic roots with positive real part, the largest at $1.64$ times the angular rate.

**Claim grade:** computer-assisted derived for the existence and local uniqueness of the balance, by the [interval enclosure](#interval-enclosure) of 2026-10-04, after measurement by three evaluators that agree to rounding and a separately constructed check at 60 digits; measured for the characteristic roots, which are formal growing modes of the first variation and carry no nonlinear statement. The larger balances in the table further down remain float measurements. The equation is unchanged: all causal roots, no speed cap, no event rule. Values use $c_f=1$ and $K=1$.

## How it was found

The [slow rotor analysis](slow-rigid-rotor-first-order-torque.md) showed that opposite-polarity neighbours push a member forward and like-polarity neighbours brake it, and the [charged-assembly analysis](charged-trimer-above-wake-speed.md) found a five-member balance in which one pair is below wake speed. That suggested a balance might exist with every member below wake speed if the configuration had enough freedom.

The family searched is $n$ concentric antipodal pairs, each pair of one polarity, with or without a central member at rest, all at one angular rate. The two members of a pair are equivalent by a half turn. One member of each pair must have zero acceleration along its motion and the centripetal value radially, which is $2n$ conditions on $2n$ unknowns: the radii, the angular rate, and the angles between the pairs. Solutions are therefore isolated points.

Below wake speed each source has exactly one causal root, found by fixed-point iteration, and the conditions are smooth functions of the unknowns. The instrument `subfield_search.py` solves them by least squares from random starts and keeps only solutions whose largest speed is below $0.999$ and whose members are distinct. Its evaluator was compared with the general all-root evaluator at a test point, to sixteen digits.

| Pairs | Central member | Random starts | Balances found |
| --- | --- | --- | --- |
| 2 | None, $+$ or $-$ | 800 each | None |
| 3 | None | 1600 over four polarity assignments | One: the balance above |
| 3 | $+$ or $-$ | 1600 each | None |
| 4 | $+$ or $-$ | A few hundred; the run stopped before completion | One, and its polarity-reversed copy: see the section on larger balances |
| 2 like triangles | None, $+$ or $-$ | 600 each | None |
| 3 like triangles | None | 600 | One: see the section on larger balances |
| 3 like triangles | $+$ | 600 | One |
| 3 like squares | None | 600 | One |
| 3 like pentagons | None | 240 | One |
| 3 like hexagons | None | 240 random, then 120 extrapolated | One, from the extrapolated starts |
| 3 like heptagons | None | 120 extrapolated | None |
| 3 like octagons | None | 240 | None |
| 4 pairs | None | 480 | None |
| 5 pairs | None | 400 | None |

The search is random and not exhaustive. Two-pair configurations with no member above wake speed were not found in 4200 starts over two runs; the five-member balance of the charged-assembly analysis has its outer pair above wake speed.

## The balance in detail

The table gives, for one member of each pair, the contribution of every other member: its delay, its transmitter factor $D=1-\mathbf n\cdot\mathbf V$, and its radial and tangential parts in units of $c_f^4/K$, positive outward and forward. Delays are in units of $K/c_f^3$.

| Receiver | Source | Delay | $D$ | Radial | Tangential |
| --- | --- | --- | --- | --- | --- |
| Pair 1 | Its partner | $4.344$ | $1.239$ | $+0.03814$ | $-0.01937$ |
| Pair 1 | Pair 2, nearer | $2.505$ | $1.400$ | $-0.07414$ | $-0.08640$ |
| Pair 1 | Pair 2, farther | $6.745$ | $1.162$ | $+0.01800$ | $-0.00582$ |
| Pair 1 | Pair 3, nearer | $2.272$ | $1.484$ | $-0.05161$ | $+0.11986$ |
| Pair 1 | Pair 3, farther | $4.949$ | $0.904$ | $-0.04442$ | $-0.00827$ |
| Pair 2 | Its partner | $6.714$ | $1.645$ | $+0.01008$ | $-0.00896$ |
| Pair 2 | Pair 1, nearer | $6.475$ | $0.748$ | $+0.03081$ | $+0.00828$ |
| Pair 2 | Pair 1, farther | $4.326$ | $1.515$ | $+0.02991$ | $-0.01870$ |
| Pair 2 | Pair 3, nearer | $1.901$ | $1.049$ | $-0.26333$ | $+0.01330$ |
| Pair 2 | Pair 3, farther | $6.383$ | $1.317$ | $-0.01762$ | $+0.00608$ |
| Pair 3 | Its partner | $4.565$ | $1.266$ | $+0.03338$ | $-0.01797$ |
| Pair 3 | Pair 1, nearer | $4.732$ | $0.816$ | $-0.05169$ | $-0.01793$ |
| Pair 3 | Pair 1, farther | $2.697$ | $1.458$ | $-0.05433$ | $+0.07704$ |
| Pair 3 | Pair 2, nearer | $5.181$ | $0.514$ | $-0.03617$ | $-0.06281$ |
| Pair 3 | Pair 2, farther | $5.185$ | $1.486$ | $-0.01253$ | $+0.02167$ |

The radial totals are $-0.114036$, $-0.210150$ and $-0.121343$, equal to $-\omega^2R$ for the three radii. The tangential totals vanish. Every transmitter factor is positive and the smallest is $0.514$, so no root is near a fold. The closest two members are $2.43$ apart.

Each member is held in by the opposite-polarity pair: the negative pair pulls both positive pairs inward, and both positive pairs pull the negative pair inward. Each member's like-polarity partner brakes it, as in every like pair. The forward pushes that cancel the braking come from opposite-polarity members, and the delays are long enough, up to a quarter of a period, that the direction of each contribution differs greatly from the present line between the members. This is not a small correction to a zero-delay shape: the outer pair moves at $0.97\,c_f$, and no zero-delay rotor of this polarity count resembles it.

## Evidence

Three evaluations of the balance agree.

- The search evaluator, after refinement, leaves residuals below $2\times10^{-15}$.
- The general all-root evaluator of `circ_delay.py`, which scans for every root including own-path roots, finds exactly thirty ordered roots, five per member and none from a member's own path, and a balance residual of $4\times10^{-16}$.
- The separate 40-digit evaluator `field.py`, given the float parameters, finds the worst departure from centripetal acceleration over the six members to be $5\times10^{-16}$.

All instruments and outputs are retained in `.local-data/master-equation-closure/geometry-session-20261003/`. The controls of `field.py` are a stationary source and a uniformly moving source; the controls of `circ_delay.py` are a finite-difference test of the row variation and the ring research's certified growth rates, each reproduced to ten digits.

**Independent check.** A separately constructed analysis, written from a description of the configuration alone, confirmed the balance with 60-digit arithmetic. Newton iteration from the quoted values reduced the residual to $10^{-20}$, $10^{-39}$ and $10^{-61}$ in successive steps, with every member's departure from centripetal acceleration below $3\times10^{-58}$. Its refined values are radii $2.43625859938589$, $4.48962513871338$ and $2.59235395928726$, angular rate $0.216351627564378$, and angles $0.311649300700242\,\pi$ and $0.454373718056209\,\pi$. The Jacobian of the six conditions is nonsingular there, with determinant $-1.85\times10^{-4}$ and condition number $80$, so the root is isolated. It found five causal roots per member and none from a member's own path. Its record is retained at `.local-data/master-equation-closure/geometry-session-20261003/independent/six-member-subfield-balance.md`. Both analyses were produced within one working session.

Quadratic convergence to sixty digits with a nonsingular Jacobian is strong numerical evidence for an exact root. It is not a proof: the convergence test used a sampled, not an enclosed, bound on the second derivatives. The interval enclosure below supplies the proof.

## Interval enclosure

On 2026-10-04 the six balance conditions were enclosed in interval arithmetic. Interval arithmetic carries a lower and an upper bound through every operation and rounds them outward, so an inclusion it reports is a statement about the exact equations and not about a rounded evaluation.

**What is proved.** Write $p=(R_1,R_2,R_3,\omega,\phi_2,\phi_3)$ for the three radii, the angular rate and the angles of the second and third pairs, and $F(p)$ for the six conditions: the tangential acceleration, and the radial acceleration plus $\omega^2R_k$, for one member of each pair. The other member of each pair follows by the half-turn symmetry. In the box of half-width $2\times10^{-6}$ in every coordinate about the values below, $F$ has exactly one zero. The table prints its first 28 digits; the instrument's enclosure of the zero has half-width below $5\times10^{-39}$.

| Unknown | Enclosed value |
| --- | --- |
| $R_1$ | $2.436258599385893611529337578$ |
| $R_2$ | $4.489625138713379489560271006$ |
| $R_3$ | $2.592353959287255790418337446$ |
| $\omega$ | $0.216351627564378001183095687$ |
| $\phi_2$ | $0.979075153576277820218673647$ |
| $\phi_3$ | $1.427457134629667711448342018$ |

Over the whole box the three speeds lie in $[0.527083,0.527094]$, $[0.971328,0.971348]$ and $[0.560854,0.560866]$. Every member is therefore below wake speed for every parameter value in the box, the zero included.

**The root census is derived, not scanned.** For a receiver at $x_i$ and a source path $X_j$, a causal root is a delay $\tau>0$ with $\tau=\lvert x_i-X_j(-\tau)\rvert$. Put $g(\tau)=\tau-\lvert x_i-X_j(-\tau)\rvert$. The distance changes with $\tau$ no faster than the source moves, so for a source below wake speed $g$ is strictly increasing. For another member $g(0)<0$ and $g$ grows without bound, so there is exactly one root. For the receiver's own path $g(0)=0$, so there is no positive root. With the certified speed bounds, each member receives exactly five rows and none from its own path.

**Method.** For a source at radius $R_j$ and angle $\alpha_j$ and a receiver at radius $R_i$ and angle $\phi_i$, put $\psi=\phi_i-\alpha_j+\omega\tau$. The delay satisfies $\tau^2=R_i^2+R_j^2-2R_iR_j\cos\psi$, and the row has radial and tangential parts

$$
\frac{\sigma\,(R_i-R_j\cos\psi)}{\tau^2\,(\tau-R_iR_j\omega\sin\psi)},\qquad\frac{\sigma\,R_j\sin\psi}{\tau^2\,(\tau-R_iR_j\omega\sin\psi)},
$$

where $\sigma$ is the product of the two polarities and $\tau-R_iR_j\omega\sin\psi$ is $\tau$ times the transmitter factor. The delay of each of the fifteen rows was enclosed over the whole box by an interval Newton step and differentiated implicitly, and the Jacobian $F'$ over the box was obtained by forward-mode differentiation in interval arithmetic. The test is the Krawczyk operator

$$
K(X)=m-C\,F(m)+\bigl(I-C\,F'(X)\bigr)(X-m),
$$

where $X$ is the box, $m$ its centre and $C$ an approximate inverse of $F'(m)$. If $K(X)$ lies in the interior of $X$, then $F$ has exactly one zero in $X$, and it lies in $K(X)$. The inclusion held for boxes of half-width $2\times10^{-6}$, $10^{-6}$, $10^{-8}$ and $10^{-30}$. At half-width $10^{-5}$ the delay enclosure of one row did not contract; that limits the size of the certified box and says nothing about zeros outside it. On every row and over the whole box, $\tau$ times the transmitter factor is at least $1.99$, so every transmitter factor is positive.

**Instrument and limits.** The instrument is `enclose.py` in `.local-data/master-equation-closure/geometry-session-20261004/enclosure/`, using the interval arithmetic of mpmath at 40 digits. The certificate rests on that library's outward rounding. It concerns existence and local uniqueness of the balance only; the stability counts below remain float measurements, and nothing is proved about zeros elsewhere in parameter space.

**Separately constructed certificate.** An [independent adjudication](exact-balance-enclosures-independent-adjudication-2026-10-04.md), written from the problem statement without this instrument, accepts the claim. It treats every delay as an unknown of a 21-dimensional Cartesian system, applies the Krawczyk test at 260 bits, and encloses the same zero with every printed digit above confirmed. Its formulation certifies uniqueness in a larger box, of half-width $3\times10^{-4}$. It corrected four last-digit entries of the row table above and the wording of the precision statement; both corrections are applied. The two certificates share the problem statement and the interval library, and were produced within one working session.

## Stability

The delayed first variation was assembled for all six members, with displacement out of the plane included, giving an eighteen-by-eighteen characteristic matrix. The argument-principle count of zeros with real part above $0.02\,\omega$ is twelve on each of three nested rectangles reaching to $10$, $40$ and $120$ times $\omega$. The roots located, divided by $\omega$, are $1.643$, $1.636$, $1.115$ and $0.405$ on the real axis, and the complex pairs $0.862\pm0.790\,i$, $0.657\pm0.885\,i$, $0.348\pm1.573\,i$ and $0.246\pm1.615\,i$. The independent check reproduced all twelve and found a thirteenth to the left of that edge: a real root at $0.0150\,\omega$, belonging to motion out of the plane, confirmed by a sign change at 50 digits. With the contour's left edge at $0.005\,\omega$ or below the count is thirteen.

The assembly is linearly unstable in the formal sense. The growth is somewhat slower, relative to the angular rate, than for the other exact assemblies examined: the [charged trimer](charged-trimer-above-wake-speed.md) has fifteen growing roots with the largest at $4.0\,\omega$, and the [rotating ladder](../../lattice-research/analysis/rotating-alternating-ladder.md) has a largest rate between $0.52\,\omega$ and $0.99\,\omega$ depending on speed.

## Larger balances below wake speed

The same search, extended to four pairs and to concentric like triangles, squares and pentagons in place of pairs, found six more balances in which no member reaches wake speed. Each was refined, checked with the general all-root evaluator, and passed to the stability instrument.

| Members | Arrangement | Radii | Speeds, in $c_f$ | Angular rate | Growing roots | Largest growth rate divided by $\omega$ |
| --- | --- | --- | --- | --- | --- | --- |
| 6 | Three pairs, $+,+,-$ | $2.4363$, $4.4896$, $2.5924$ | $0.527$, $0.971$, $0.561$ | $0.216352$ | 13 | $1.64$ |
| 9 | Four pairs, $+,+,-,-$, about a central $+$ at rest | $5.1030$, $4.8772$, $7.3486$, $2.5591$ | $0.360$, $0.344$, $0.518$, $0.180$ | $0.070532$ | 25 | $7.37$ |
| 9 | Three triangles, $+,+,-$ | $4.5423$, $7.8630$, $4.9678$ | $0.455$, $0.788$, $0.498$ | $0.100171$ | 26 | $2.23$ |
| 10 | Three triangles, $+,-,+$, about a central $+$ at rest | $7.3646$, $5.0134$, $5.2350$ | $0.953$, $0.649$, $0.678$ | $0.129424$ | 28 | $2.26$ |
| 12 | Three squares, $+,+,-$ | $7.2737$, $12.1960$, $8.0351$ | $0.377$, $0.631$, $0.416$ | $0.051772$ | 35 | $3.35$ |
| 15 | Three pentagons, $+,+,-$ | $11.5592$, $19.2120$, $12.7903$ | $0.273$, $0.454$, $0.302$ | $0.023611$ | 46 | $4.96$ |
| 18 | Three hexagons, $+,+,-$ | $68.8638$, $117.4257$, $75.6014$ | $0.075$, $0.128$, $0.082$ | $0.001091$ | 51 | Not located; all growing roots are complex |

The balance residuals of the six larger rows are below $10^{-15}$ in the general evaluator, with one causal root from every other member and none from a member's own path. Their root counts are from rectangles starting at real part $0.01\,\omega$ or $0.005\,\omega$ and reaching to between $30\,\omega$ and $100\,\omega$; they may miss roots closer to the imaginary axis, as happened for the six-member balance, and on the largest rectangles the phase advanced by up to two radians between contour samples, which is adequate but not generous. None of the six has had a separately constructed check. For the eighteen-member row a first contour was sampled too coarsely and was repeated: with phase steps of about one radian the count is 44 inside $8\,\omega$ and 51 inside $20\,\omega$, and a scan of the real axis to $40\,\omega$ finds no real growing root, so all 51 are complex.

Five of the rows form one family: three concentric like rings, two of one polarity and one of the other, each ring a pair, a triangle, a square, a pentagon or a hexagon. As the rings gain members the balance moves to larger radius and lower speed, with the fastest ring at $0.971$, $0.788$, $0.631$, $0.454$ and $0.128$ of wake speed, and the number of growing roots rises: 13, 26, 35, 46, 51. The hexagon balance was not found by random starts; it was found by extrapolating the earlier members, and it lies much farther out than the trend suggested. Rings of seven members were sought from 120 extrapolated starts and not found; whether the family continues is open.

The slowest balance is the eighteen-member one: no member exceeds $0.13\,c_f$. It is an exact balance at a speed small enough for the first-order description to apply, which means that for this shape the first-order push along the motion nearly vanishes and the remainder is balanced at second order. The slow-rotor analysis found no such shape among rotors of up to six members. Among the balances whose largest rate was located, the slower ones have the larger rates, and the count of growing roots rises steadily with the number of members. That fits the zero-delay picture: the slower a structure, the closer it is to the comparison dynamics, in which every rotor with more than two members is strongly unstable.

**Rechecked on 2026-10-04.** The [wider search](rigid-balance-search-2026-10-04.md) found all six larger balances again from random starts, with a separately written evaluator, and enclosed each in interval arithmetic with one instrument, so their existence and local uniqueness are now computer-assisted derived. Its root counter, which closes each contour at a derived bound on the size of any growing root and places the left edge at $0.0005\,\omega$, returns the same counts: 25, 26, 28, 35, 46 and 51, and 13 for the six-member balance. It also located the largest rate of the eighteen-member balance, $9.6\,\omega$. Rings of seven members were not sought again. The same search found 58 further balances below wake speed, including ones that travel along their axis, three-dimensional ones and neutral ones; the family in this table is a small part of what exists.

## What it means

- **Exact finite assemblies are not confined to speeds above wake speed.** Before this session every finite moving solution of the unchanged equation on record lay above wake speed, where each member receives its own wake. This balance has no own-path root at all.
- **Balance below wake speed needs speeds that are not small.** At small speed the first-order push cannot vanish on any finite rigid rotor found. Here the outer pair is at $0.97\,c_f$ and the delays are a sizeable fraction of a period.
- **It is still unstable.** Existence was not the obstacle; stability is. The count of growing roots, thirteen, is lower than for the trimer and comparable to the mixed-speed five-member balance.
- **The family is large.** Seven balances came from a few thousand starts in a handful of small subfamilies. Larger numbers of pairs, rings of other multiplicities, pairs with unequal members, and arrangements out of the plane had barely been searched when this was written. Each balance found was passed through the stability instrument, and none is free of growing roots. The [wider search with the same filter](rigid-balance-search-2026-10-04.md) has since been run: it found 93 distinct balances and none free of growing roots.

## Limits and falsifiers

The six-member balance is enclosed; the larger balances are float measurements. The stability count is linear and formal; this analysis's own count excluded roots with real part below $0.02\,\omega$ and missed one, which the independent check supplied. The search was random. Uniqueness is certified only inside the stated box.

An interval evaluation that excludes a zero of the six conditions near the stated parameters, a sixth causal root for any member, or a member at or above wake speed at the refined solution would refute the balance. A characteristic determinant that does not vanish at the listed roots, or a different count on a larger contour, would refute the stability result.
