# A wider search for rigid balances, with a count of growing modes for each

## Result

On 2026-10-04 a random-start search looked for exact rigid balances of the unchanged Master Equation in 211 families of arrangements, from about 288,000 starts, and counted the growing characteristic roots of every balance it found. A rigid balance is an arrangement that turns about an axis at one angular rate, with or without steady motion along that axis, and satisfies the equation exactly for all time.

The search found 93 distinct balances with two to twenty members. Every one has growing modes. The smallest count is five, and no balance has fewer than two growing roots per member; the typical number is three per member.

Sixty-five of the balances have every member below wake speed. All 65 are enclosed in interval arithmetic, which makes their existence and local uniqueness computer-assisted derived and not only measured.

Five kinds of balance are new to the record.

1. **Balances that travel.** Four arrangements rotate and move steadily along their rotation axis, at $0.11$ to $0.45$ of wake speed, with every member below wake speed. The smallest has three members. One has no net polarity.
2. **Three-dimensional balances.** Twenty-four balances are not planar: rings sit above and below a mirror plane, some with members at rest on the axis.
3. **Balances with no net polarity below wake speed.** Sixteen of the 65 are neutral. They include pairs of nested alternating rings, each ring of the kind that cannot balance alone below wake speed.
4. **Balances with no symmetry.** Three or four members on unequal circles balance when at least one member is above wake speed. A three-member one has six growing roots.
5. **A two-member balance in closed form**, an opposite pair on unequal circles with one member below wake speed, recorded in the [binary analysis](../../binary-research/analysis/asymmetric-opposite-pair-closed-form.md).

So existence is common in every class searched, below wake speed and across it, planar and three-dimensional, resting in place and travelling, charged and neutral. Stability was not found anywhere.

**Claim grade:** computer-assisted derived for the existence and local uniqueness of the 65 balances below wake speed, by interval enclosure with one instrument; three of them, the planar six-member balance and the travelling six-member and three-member balances, also have separately constructed certificates. Measured for the 28 balances with a member above wake speed, by exact root finding in float arithmetic with the residual confirmed by a second evaluator. Measured for every count of growing roots: the roots are formal modes of the delayed first variation and carry no nonlinear statement. The statement that no balance without growing roots was found is a statement about a random search and excludes nothing. The equation is unchanged: every positive-delay causal root is included, own-path roots among them, with no speed cap and no event rule. Values use $c_f=1$ and $K=1$.

This search follows the [six-member balance below wake speed](six-member-balance-below-wake-speed.md), whose closing remark was that a wider search with the stability count as a filter is the direct way to look for a balance without growing roots.

## What a rigid balance is, and why balances are isolated

Member $j$ has a radius $R_j$, an angle $\phi_j$, a height $z_j$ and a polarity, and follows

$$
X_j(s)=\bigl(R_j\cos(\phi_j+\omega s),\ R_j\sin(\phi_j+\omega s),\ z_j+us\bigr),
$$

with one angular rate $\omega$ and one axial velocity $u$ for the whole arrangement. The equation asks that each member's received acceleration equal the acceleration of its own path, which is centripetal: $-\omega^2R_j$ along its radius, nothing along its motion, nothing along the axis.

Counting conditions against unknowns decides what to expect.

- **Planar, $u=0$.** Each member contributes a radius and an angle, and one overall rotation is free; the rate $\omega$ is unknown. That is $2N$ unknowns for $2N$ conditions. Balances are isolated points, and the equation fixes their size, because the inverse-square law with a fixed wake speed has no scaling freedom.
- **Three-dimensional, $u=0$.** Heights add $N-1$ unknowns and the axial conditions add $N$. The system is overdetermined by one unless a symmetry removes a condition. Reflection in a plane perpendicular to the axis does that, so three-dimensional balances at rest along the axis are sought among mirror-symmetric arrangements.
- **Travelling, $u\ne0$.** The axial velocity supplies the missing unknown. An arrangement with no mirror symmetry is therefore expected to balance, if at all, only while moving along its axis. This is the finite counterpart of the [twisted strands](../../lattice-research/analysis/rotating-alternating-ladder.md#twisted-structures-move-along-their-axis), which are driven along their axis for the same reason.

Rotational symmetry reduces the work. If every member is repeated $m$ times around the axis, one member represents each ring. The families searched are built from rings of $m$ members, with $m$ from $1$, meaning no symmetry, to $12$.

## What was searched

| Class | Members allowed | Families | Starts | Distinct balances |
| --- | --- | --- | --- | --- |
| Planar, every member below wake speed | Up to six rings of 1, 2, 3, 4, 5, 6, 8 or 12 members, with or without a central member at rest | 89 | 87,699 | 37 |
| Mirror-symmetric in three dimensions, below wake speed | Rings of 2, 3, 4 or 6 in the plane or in pairs above and below it; members at rest at the centre or in pairs on the axis | 88 | 108,455 | 24 |
| Travelling along the axis, below wake speed | Two to four rings of 1, 2, 3 or 4 at their own heights; a member on the axis | 17 | 6,804 | 4 |
| Planar at any speed up to $4\,c_f$, every causal root | Two to four rings of 1, 2, 3 or 4, with or without a central member | 17 | 85,329 | 28 |

A family fixes the ring size, the kinds of ring and their polarities. Polarity assignments that differ by reversing every polarity, or by relabelling identical rings, are one family; assignments with a single polarity were omitted, because the outermost member of such an arrangement is pushed outward by every row. Each family received a fixed time, between one and ten minutes, of least-squares solves from random starts; four small families with no symmetry were then repeated three times at ten minutes each. A solve was accepted when its residual fell below $10^{-10}$ in scaled units, no two members were closer than a thousandth of the largest radius, and every speed was inside the declared range. Accepted balances were then deduplicated, including polarity-reversed and mirror-image twins.

Below wake speed the acceleration is a smooth function of the unknowns, since each source contributes exactly one causal root, and the search is reliable in the sense that a start near a balance converges to it. Above wake speed roots appear and disappear as the unknowns change and the residual has jumps, so the fourth class is a coarser sieve.

Two results in the table of families are negative and worth stating. No balance was found with fewer than six members, all below wake speed and all in one plane, among arrangements with no imposed symmetry: three, four and five members returned nothing in about 2,500 starts, and six members returned only the known [six-member balance](six-member-balance-below-wake-speed.md). And no travelling balance of two members was found, which the [binary analysis](../../binary-research/analysis/asymmetric-opposite-pair-closed-form.md#both-below-wake-speed-never-balances) proves cannot exist below wake speed.

## Instruments and controls

All instruments are retained in `.local-data/master-equation-closure/geometry-session-20261004/`.

- **`rigid.py`** holds two separately written evaluators of a member's acceleration. One uses Newton iteration for the single causal root of each source and is valid only below wake speed. The other scans the delay for every positive-delay root, own-path roots included, and is valid at any speed. It also builds the characteristic matrix of the delayed first variation and counts its zeros.
- **`search.py`** and **`campaign.py`** run the families; **`fewbody.py`** repeats the small asymmetric families with longer times; **`nested_rings.py`** searches nested alternating rings directly.
- **`enclosure/enclose_general.py`** is the interval instrument; **`recount.py`** and **`locate.py`** produce the final counts and root locations.

The controls in `validate.py` ran before any target.

- **First variation, end to end.** Every member's history was displaced by a small multiple of a trial mode, the accelerations were recomputed by direct root finding, and the change was compared with the characteristic matrix. On a four-member arrangement below wake speed that rotates and travels, with one member on the axis, the relative difference was $1\times10^{-9}$. On the six-member ring above wake speed, which has own-path roots, it was $7\times10^{-9}$.
- **Certified growth rates.** The determinant vanishes at the ring research's [certified rates](ring-other-inventories-stability-2026-10-03.md), $0.8596290682$ and $10.6584241740$ for the six-member ring and $2.4629630593$ and $20.0645430148$ for the four-member ring, to the digits shown.
- **Recorded counts.** The instrument returns thirteen growing roots for the planar six-member balance and fifteen for the [charged trimer](charged-trimer-above-wake-speed.md), the recorded values.
- **Recovery of known balances.** The search returned, without being told of them, the six- and eighteen-member balances below wake speed, both five-member balances, the charged trimer, and the two-, four-, six- and eight-member alternating rings at their first references above wake speed.
- **Interval instrument.** Its delay enclosure reproduces the closed-form delay of a uniformly moving source to $2\times10^{-41}$, and it reproduces the enclosure of the planar six-member balance obtained by the first, special-purpose instrument.

**How growing roots are counted.** With $\lambda=\omega\mu$, the characteristic matrix is $M(\mu)=(\mu+J)^2-A+\sum e^{-\mu\omega\tau}(B+\mu C)$, summed over rows, where $J$ generates rotation about the axis and $A$, $B$, $C$ are constant blocks built from the row variation. A root with non-negative real part satisfies $\lvert\mu\rvert^2\le\lVert A_0\rVert+\lvert\mu\rvert\lVert A_1\rVert+b+\lvert\mu\rvert c$, where $b$ and $c$ bound the delayed blocks, because each exponential has modulus at most one there. This gives an explicit radius beyond which no growing root can lie. The count is the winding number of $\det M$ around a rectangle from real part $0.0005$ to that radius. The contour starts from a fine grid with a denser patch beside the neutral roots on the imaginary axis; any step with a phase change above $0.35$ radian is bisected, and when none remains every interval is bisected once more and the count must not change. An earlier, coarser rule miscounted the planar six-member balance as fifteen on one rectangle; the control caught it and the rule above replaced it.

Three limits of the count should be kept in view. It is a float computation, the bound uses float norms, and roots with real part between $0$ and $0.0005\,\omega$ are not counted. For eight balances, moving the left edge from $0.004$ to $0.0005$ added two roots, so slowly growing roots do occur near the axis.

## Balances that travel along their axis

| Members | Arrangement | Net polarity | Speeds, in $c_f$ | Axial speed | Growing roots | Largest growth rate over $\omega$ |
| --- | --- | --- | --- | --- | --- | --- |
| 3 | Single members: $+$, $+$, $-$ | $+1$ | $0.716$, $0.811$, $0.911$ | $0.110$ | 9 | $3.32$ |
| 6 | Pairs: $+$, $+$, $-$ | $+2$ | $0.469$, $0.624$, $0.888$ | $0.282$ | 16 | $1.56$ |
| 8 | Pairs: $+$, $+$, $+$, $-$ | $+4$ | $0.520$, $0.606$, $0.645$, $0.898$ | $0.453$ | 25 | $3.13$ |
| 8 | Pairs: $+$, $+$, $-$, $-$ | $+0$ | $0.494$, $0.655$, $0.718$, $0.856$ | $0.298$ | 32 | $9.54$ |

Each of these is an exact solution for all time in which the whole arrangement turns about an axis and moves along it at constant velocity. No member is at or above wake speed, so no member receives its own wake. The mirror image of each, with heights and axial velocity reversed, is also a solution.

**Three members.** Two positive architrinos and one negative one move on three different circles at three different heights.

| Member | Polarity | Radius | Angle | Height | Speed |
| --- | --- | --- | --- | --- | --- |
| 1 | $+$ | $0.177266$ | $0^\circ$ | $0$ | $0.811$ |
| 2 | $+$ | $0.199592$ | $77.14^\circ$ | $0.439665$ | $0.911$ |
| 3 | $-$ | $0.156069$ | $-17.27^\circ$ | $0.274915$ | $0.716$ |

The angular rate is $4.531690$ and the axial velocity is $-0.110061$, so the arrangement moves toward the side of member 1 and advances $0.153$ per turn. The three are between $0.28$ and $0.50$ apart. This is the smallest balance on record with every member below wake speed; in one plane and without travel the search found none below six members. It has nine growing roots, in units of $\omega$: $3.299$, and the pairs $0.874\pm0.404\,i$, $0.434\pm1.002\,i$, $0.118\pm1.840\,i$ and $0.104\pm3.262\,i$. A [separately constructed check](../../binary-research/analysis/small-exact-balances-independent-adjudication-2026-10-04.md) confirms this balance: it refined the solution beyond fifty digits, certified existence and local uniqueness with its own interval test, confirmed the mirror solution, and found exactly nine roots with positive real part, at these locations, with no threshold on the real part.

**Six members.** Three antipodal like pairs, two positive and one negative, sit at three heights.

| Pair | Polarity | Radius | Angle | Height | Speed |
| --- | --- | --- | --- | --- | --- |
| 1 | $+$ | $2.101400$ | $0^\circ$ | $0$ | $0.624$ |
| 2 | $-$ | $1.417191$ | $82.15^\circ$ | $1.037793$ | $0.469$ |
| 3 | $+$ | $3.181010$ | $51.77^\circ$ | $1.619584$ | $0.888$ |

The angular rate is $0.264618$ and the axial velocity is $-0.282373$: the arrangement moves away from the side on which the large pair sits, with pair 1 leading. It has the same members as the planar six-member balance, which is a different, isolated solution; the interval test finds no travelling solution within $10^{-6}$ of the planar one. It has sixteen growing roots, all complex, the fastest at $(1.554\pm0.083\,i)\,\omega$.

This balance has a [separately constructed check](translating-six-member-balance-independent-adjudication-2026-10-04.md), written from a description alone. It refined the solution to ninety digits, certified existence and uniqueness with its own interval test in a box a hundred times wider than claimed, confirmed sixteen growing roots on contours reaching $300\,\omega$ with a derived bound of $5.96\,\omega$, located all sixteen, and confirmed the mirror solution. It found no discrepancy beyond one sixteenth digit. Its own first root counter aliased near the neutral roots and returned 16, 18 and 19 on contours that must agree; it replaced that counter with one cross-checked against the logarithmic derivative. That is the same hazard recorded under the instruments above, met independently.

**Eight members with no net polarity.** Four antipodal like pairs, two positive and two negative, at radii $0.610$, $0.684$, $0.413$ and $0.839$ and heights $0$, $0.236$, $-0.089$ and $0.334$, turn at rate $0.956$ and travel at $0.298$ of wake speed. It has 32 growing roots, the fastest at $9.5\,\omega$.

## Three-dimensional balances at rest along the axis

| Members | Arrangement | Net polarity | Speeds, in $c_f$ | Growing roots | Largest growth rate over $\omega$ |
| --- | --- | --- | --- | --- | --- |
| 7 | Pairs: $+$ twice, above and below, $-$; centre $-$ | $+1$ | $0.804$, $0.883$ | 16 | $5.25$ |
| 8 | Pairs: $+$ twice, above and below, $-$, $-$ | $+0$ | $0.457$, $0.739$, $0.824$ | 24 | $4.87$ |
| 8 | Pairs: $+$ twice, above and below, $-$, $-$ | $+0$ | $0.221$, $0.381$, $0.721$ | 25 | $1.76$ |
| 8 | Pairs: $+$ twice, above and below, $+$, $-$ | $+4$ | $0.333$, $0.450$, $0.977$ | 28 | $3.19$ |
| 10 | Pairs: $+$ twice, above and below, $-$ twice, above and below, $+$ | $+2$ | $0.341$, $0.560$, $0.975$ | 26 | $1.90$ |
| 10 | Pairs: $+$ twice, above and below, $-$ twice, above and below, $+$ | $+2$ | $0.312$, $0.371$, $0.489$ | 30 | $2.35$ |
| 10 | Squares: $+$, $-$; axis pair $+$ | $+2$ | $0.438$, $0.805$ | 33 | $3.02$ |
| 10 | Pairs: $+$ twice, above and below, $-$ twice, above and below, $+$ | $+2$ | $0.486$, $0.506$, $0.811$ | 39 | $6.68$ |
| 10 | Triangles: $+$ twice, above and below, $-$; centre $-$ | $+2$ | $0.857$, $0.903$ | 41 | $7.30$ |
| 11 | Triangles: $+$ twice, above and below, $-$; axis pair $-$ | $+1$ | $0.363$, $0.745$ | 34 | $3.16$ |
| 11 | Triangles: $+$ twice, above and below, $-$; axis pair $-$ | $+1$ | $0.825$, $0.989$ | 37 | $3.06$ |
| 12 | Triangles: $+$ twice, above and below, $-$, $-$ | $+0$ | $0.515$, $0.746$, $0.803$ | 37 | $6.03$ |
| 12 | Triangles: $+$ twice, above and below, $-$, $-$ | $+0$ | $0.167$, $0.237$, $0.485$ | 42 | $3.24$ |
| 12 | Triangles: $+$ twice, above and below, $+$, $-$ | $+6$ | $0.403$, $0.502$, $0.934$ | 99 | $7.58$ |
| 13 | Squares: $+$ twice, above and below, $-$; centre $+$ | $+5$ | $0.384$, $0.670$ | 53 | $5.24$ |
| 13 | Squares: $+$ twice, above and below, $-$; centre $-$ | $+3$ | $0.887$, $0.905$ | 76 | $12.53$ |
| 14 | Squares: $+$ twice, above and below, $-$; axis pair $-$ | $+2$ | $0.888$, $0.938$ | 52 | $6.38$ |
| 15 | Triangles: $+$ twice, above and below, $-$ twice, above and below, $+$ | $+3$ | $0.419$, $0.463$, $0.528$ | 41 | $5.64$ |
| 15 | Triangles: $+$ twice, above and below, $-$ twice, above and below, $+$ | $+3$ | $0.356$, $0.501$, $0.854$ | 43 | $2.37$ |
| 15 | Triangles: $+$ twice, above and below, $-$ twice, above and below, $+$ | $+3$ | $0.204$, $0.216$, $0.356$ | 47 | $3.02$ |
| 16 | Squares: $+$ twice, above and below, $-$, $-$ | $+0$ | $0.556$, $0.751$, $0.792$ | 50 | $7.15$ |
| 20 | Squares: $+$ twice, above and below, $-$ twice, above and below, $+$ | $+4$ | $0.410$, $0.446$, $0.474$ | 54 | $6.59$ |
| 20 | Squares: $+$ twice, above and below, $-$ twice, above and below, $+$ | $+4$ | $0.235$, $0.304$, $0.557$ | 69 | $4.26$ |
| 20 | Hexagons: $+$ twice, above and below, $-$; axis pair $-$ | $+4$ | $0.894$, $0.902$ | 158 | $18.51$ |

In this table a polarity followed by "twice, above and below" is a ring repeated at heights $+h$ and $-h$; an axis pair is two members at rest on the axis at $+h$ and $-h$; the centre is a member at rest at the origin.

The smallest has seven members: two positive pairs at radius $1.022$ and heights $\pm0.524$, a negative pair in the plane at radius $1.122$, and a negative member at rest at the centre. It has sixteen growing roots. The next, with eight members and no net polarity, replaces the central member by a second negative pair in the plane.

Members at rest on the axis away from the centre occur in five balances. They are held in place along the axis by rings of both polarities and are the first exact configurations on record in which a member at rest sits at a point other than the centre of a moving arrangement.

## Planar balances below wake speed

| Members | Arrangement | Net polarity | Speeds, in $c_f$ | Growing roots | Largest growth rate over $\omega$ |
| --- | --- | --- | --- | --- | --- |
| 6 | Single members: $+$, $+$, $+$, $+$, $-$, $-$ | $+2$ | $0.527$, $0.561$, $0.971$ | 13 | $1.64$ |
| 9 | Pairs: $+$, $+$, $-$, $-$; centre $+$ | $+1$ | $0.180$, $0.344$, $0.360$, $0.518$ | 25 | $7.32$ |
| 9 | Triangles: $+$, $+$, $-$ | $+3$ | $0.455$, $0.498$, $0.788$ | 26 | $2.22$ |
| 10 | Triangles: $+$, $+$, $-$; centre $+$ | $+4$ | $0.649$, $0.678$, $0.953$ | 28 | $2.25$ |
| 10 | Pairs: $+$, $+$, $+$, $-$, $-$ | $+2$ | $0.155$, $0.192$, $0.214$, $0.249$, $0.380$ | 29 | $5.00$ |
| 11 | Pairs: $+$, $+$, $+$, $-$, $-$; centre $-$ | $+1$ | $0.172$, $0.342$, $0.489$, $0.587$, $0.634$ | 25 | $13.27$ |
| 11 | Pairs: $+$, $+$, $+$, $-$, $-$; centre $-$ | $+1$ | $0.475$, $0.565$, $0.592$, $0.639$, $0.817$ | 42 | $15.08$ |
| 12 | Triangles: $+$, $+$, $+$, $-$ | $+6$ | $0.403$, $0.716$, $0.774$, $0.970$ | 35 | $2.85$ |
| 12 | Triangles: $+$, $+$, $-$, $-$ | $+0$ | $0.116$, $0.263$ | 35 | $4.67$ |
| 12 | Squares: $+$, $+$, $-$ | $+4$ | $0.377$, $0.416$, $0.631$ | 35 | $3.37$ |
| 12 | Pairs: $+$, $+$, $+$, $-$, $-$, $-$ | $+0$ | $0.174$, $0.272$, $0.416$, $0.456$, $0.616$, $0.788$ | 51 | $20.64$ |
| 13 | Squares: $+$, $+$, $-$; centre $-$ | $+3$ | $0.375$, $0.522$, $0.759$ | 37 | $2.53$ |
| 13 | Triangles: $+$, $+$, $+$, $-$; centre $+$ | $+7$ | $0.496$, $0.735$, $0.798$, $0.978$ | 38 | $3.06$ |
| 13 | Squares: $+$, $+$, $-$; centre $+$ | $+5$ | $0.550$, $0.557$, $0.789$ | 42 | $2.61$ |
| 13 | Triangles: $+$, $+$, $-$, $-$; centre $+$ | $+1$ | $0.206$, $0.443$, $0.690$, $0.987$ | 148 | $40.42$ |
| 15 | Triangles: $+$, $+$, $+$, $+$, $-$ | $+9$ | $0.293$, $0.613$, $0.771$, $0.834$, $0.990$ | 39 | $3.35$ |
| 15 | Triangles: $+$, $+$, $+$, $-$, $-$ | $+3$ | $0.530$, $0.556$, $0.679$, $0.817$, $0.825$ | 44 | $15.74$ |
| 15 | Pentagons: $+$, $+$, $-$ | $+5$ | $0.273$, $0.302$, $0.454$ | 46 | $4.96$ |
| 16 | Squares: $+$, $+$, $-$, $-$ | $+0$ | $0.403$, $0.429$, $0.657$, $0.896$ | 43 | $3.15$ |
| 16 | Squares: $+$, $+$, $-$, $-$ | $+0$ | $0.387$, $0.403$, $0.704$, $0.770$ | 47 | $5.18$ |
| 16 | Squares: $+$, $+$, $+$, $-$ | $+8$ | $0.445$, $0.694$, $0.741$, $0.898$ | 48 | $3.21$ |
| 16 | Pentagons: $+$, $+$, $-$; centre $-$ | $+4$ | $0.306$, $0.377$, $0.552$ | 48 | $3.95$ |
| 16 | Squares: $+$, $+$, $-$, $-$ | $+0$ | $0.413$, $0.763$ | 50 | $5.05$ |
| 16 | Pentagons: $+$, $+$, $-$; centre $+$ | $+6$ | $0.411$, $0.418$, $0.598$ | 56 | $4.02$ |
| 16 | Squares: $+$, $+$, $-$, $-$ | $+0$ | $0.519$, $0.939$ | 63 | $7.20$ |
| 17 | Squares: $+$, $+$, $+$, $-$; centre $+$ | $+9$ | $0.500$, $0.708$, $0.757$, $0.904$ | 49 | $3.36$ |
| 17 | Squares: $+$, $+$, $-$, $-$; centre $+$ | $+1$ | $0.355$, $0.471$, $0.700$, $0.920$ | 49 | $2.59$ |
| 17 | Squares: $+$, $+$, $+$, $-$; centre $-$ | $+7$ | $0.339$, $0.697$, $0.740$, $0.919$ | 56 | $3.03$ |
| 17 | Squares: $+$, $+$, $-$, $-$; centre $+$ | $+1$ | $0.214$, $0.377$, $0.608$, $0.793$ | 63 | $11.54$ |
| 18 | Hexagons: $+$, $+$, $-$ | $+6$ | $0.075$, $0.082$, $0.128$ | 51 | $9.62$ |
| 19 | Hexagons: $+$, $+$, $-$; centre $-$ | $+5$ | $0.183$, $0.215$, $0.321$ | 55 | $6.30$ |
| 19 | Hexagons: $+$, $+$, $-$; centre $+$ | $+7$ | $0.222$, $0.231$, $0.339$ | 56 | $7.16$ |
| 20 | Pentagons: $+$, $+$, $-$, $-$ | $+0$ | $0.408$, $0.433$, $0.653$, $0.779$ | 55 | $6.06$ |
| 20 | Pentagons: $+$, $+$, $-$, $-$ | $+0$ | $0.354$, $0.379$, $0.547$, $0.747$ | 57 | $4.12$ |
| 20 | Pentagons: $+$, $+$, $+$, $-$ | $+10$ | $0.467$, $0.675$, $0.715$, $0.847$ | 57 | $3.56$ |
| 20 | Pentagons: $+$, $+$, $-$, $-$ | $+0$ | $0.509$, $0.832$ | 60 | $5.58$ |
| 20 | Pentagons: $+$, $+$, $-$, $-$ | $+0$ | $0.559$, $0.910$ | 75 | $7.00$ |

The first row is the six-member balance, found here from starts with no symmetry imposed. Rows with a single ring size and three rings of polarities $+,+,-$ are the family already recorded; the search adds four-ring and five-ring arrangements, arrangements about a central member of either polarity, and the neutral balances discussed next.

## Nested alternating rings

A regular ring of alternating polarity cannot balance alone at any speed up to wake speed: the [ring research proved](ring-arbitrary-inventory-low-speed-independent-adjudication-2026-10-03.md#verdict-and-scope) that its members are pushed forward at every positive speed. Two such rings, one inside the other, can balance each other. A direct search over two concentric alternating rings of $2M$ members each, one member per ring representing the ring, returned the following.

| Members | Rings | Radii, in $K/c_f^2$ | Speeds, in $c_f$ | Turn of the second ring, in units of $\pi/M$ | Growing roots |
| --- | --- | --- | --- | --- | --- |
| 12 | Two alternating 6-gons | $13.7659$, $31.1383$ | $0.116$, $0.263$ | $1.0004$ | 35 |
| 16 | Two alternating 8-gons | $4.3164$, $2.3371$ | $0.763$, $0.413$ | $1.0035$ | 50 |
| 16 | Two alternating 8-gons | $0.7202$, $1.3022$ | $0.519$, $0.939$ | $1.1038$ | 63 |
| 20 | Two alternating 10-gons | $4.8413$, $2.9618$ | $0.832$, $0.509$ | $1.0299$ | 60 |
| 20 | Two alternating 10-gons | $2.4527$, $1.5063$ | $0.910$, $0.559$ | $0.9518$ | 75 |
| 20 | Two alternating 10-gons | $10.0652$, $13.9566$ | $0.692$, $0.960$ | $0.6912$ | 60 |
| 24 | Two alternating 12-gons | $5.0408$, $7.5527$ | $0.557$, $0.835$ | $0.9123$ | 72 |
| 24 | Two alternating 12-gons | $2.1919$, $3.3006$ | $0.603$, $0.908$ | $1.0236$ | 93 |
| 28 | Two alternating 14-gons | $13.8789$, $10.0292$ | $0.838$, $0.605$ | $1.1820$ | 77 |
| 28 | Two alternating 14-gons | $2.7564$, $3.9191$ | $0.640$, $0.910$ | $1.0145$ | 103 |
| 32 | Two alternating 16-gons | $3.3022$, $4.4961$ | $0.669$, $0.910$ | $1.0099$ | 117 |

No nested pair was found for rings of two or four members, and no nested triple for rings of up to eight, in a few hundred starts each. The twelve-member balance, two alternating hexagons, is slow: its members move at $0.12$ and $0.26$ of wake speed. In most of them the second ring is turned by close to $\pi/M$, which puts a member of the opposite polarity nearly on each member's own radius in the other ring.

These are the first exact balances on record that are neutral, lie entirely below wake speed and are built from the alternating rings that the Braid Program studies above wake speed. They are unstable, with 35 to 117 growing roots.

## Balances with a member above wake speed

| Members | Arrangement | Net polarity | Speeds, in $c_f$ | Growing roots | Largest growth rate over $\omega$ |
| --- | --- | --- | --- | --- | --- |
| 2 | Single members: $+$, $-$ | $+0$ | $3.070$ | 5 | $2.12$ |
| 2 | Single members: $+$, $-$ | $+0$ | $0.490$, $1.571$ | 5 | $0.85$ |
| 3 | Single members: $+$, $+$, $-$ | $+1$ | $0.655$, $0.671$, $1.345$ | 6 | $1.36$ |
| 3 | Single members: $+$, $+$, $-$ | $+1$ | $0.658$, $2.332$, $3.120$ | 7 | $0.88$ |
| 3 | Single members: $+$, $+$, $-$ | $+1$ | $0.322$, $0.664$, $1.201$ | 7 | $1.68$ |
| 3 | Single members: $+$, $+$, $-$ | $+1$ | $0.648$, $1.321$, $1.513$ | 9 | $6.38$ |
| 3 | Single members: $+$, $+$, $-$ | $+1$ | $0.652$, $1.117$, $1.472$ | 11 | $3.06$ |
| 3 | Pairs: $+$; centre $-$ | $+1$ | $1.276$ | 15 | $4.05$ |
| 4 | Single members: $+$, $+$, $-$, $-$ | $+0$ | $0.648$, $1.150$, $1.613$, $2.011$ | 11 | $3.80$ |
| 4 | Single members: $+$, $+$, $-$, $-$ | $+0$ | $0.734$, $1.190$, $1.764$, $2.230$ | 12 | $2.25$ |
| 4 | Single members: $+$, $+$, $-$, $-$ | $+0$ | $0.460$, $0.725$, $1.448$, $1.940$ | 13 | $1.35$ |
| 4 | Single members: $+$, $+$, $-$, $-$ | $+0$ | $0.445$, $0.746$, $1.120$, $1.913$ | 15 | $3.21$ |
| 4 | Pairs: $+$, $-$ | $+0$ | $2.147$ | 15 | $3.88$ |
| 4 | Single members: $+$, $+$, $-$, $-$ | $+0$ | $1.724$, $2.413$, $2.442$, $3.133$ | 17 | $5.28$ |
| 4 | Single members: $+$, $+$, $-$, $-$ | $+0$ | $1.264$, $2.306$, $2.864$, $3.434$ | 21 | $4.64$ |
| 5 | Pairs: $+$, $-$; centre $+$ | $+1$ | $0.835$, $1.406$ | 11 | $1.81$ |
| 5 | Pairs: $+$, $-$; centre $+$ | $+1$ | $1.829$, $2.680$ | 26 | $2.75$ |
| 6 | Pairs: $+$, $+$, $-$ | $+2$ | $0.633$, $0.658$, $1.104$ | 16 | $2.22$ |
| 6 | Pairs: $+$, $+$, $-$ | $+2$ | $2.077$, $2.079$, $2.603$ | 21 | $7.33$ |
| 6 | Triangles: $+$, $-$ | $+0$ | $1.826$ | 29 | $5.71$ |
| 6 | Pairs: $+$, $+$, $-$ | $+2$ | $0.899$, $2.061$, $2.883$ | 34 | $1.82$ |
| 7 | Triangles: $+$, $-$; centre $+$ | $+1$ | $0.710$, $1.303$ | 21 | $1.66$ |
| 7 | Triangles: $+$, $-$; centre $+$ | $+1$ | $0.725$, $1.477$ | 24 | $2.39$ |
| 7 | Triangles: $+$, $-$; centre $+$ | $+1$ | $1.697$, $1.961$ | 29 | $4.91$ |
| 7 | Triangles: $+$, $-$; centre $+$ | $+1$ | $1.245$, $2.261$ | 76 | $3.41$ |
| 8 | Squares: $+$, $-$ | $+0$ | $1.660$ | 39 | $7.59$ |
| 9 | Squares: $+$, $-$; centre $+$ | $+1$ | $1.605$, $1.714$ | 39 | $7.24$ |
| 9 | Squares: $+$, $-$; centre $+$ | $+1$ | $1.234$, $1.681$ | 212 | $5.43$ |

Rows with one ring size and polarities $+,-$ at a single speed are the alternating rings of the ring research at their first references, returned here as controls: two members at $3.070$, four at $2.147$, six at $1.826$ and eight at $1.660$. Their counts of 5, 15, 29 and 39 are float counts of all growing roots in all sectors, out of the plane included. The ring research's certified results concern particular sectors and are not replaced by these numbers.

The arrangements of single members are new. Three architrinos, two of one polarity and one of the other, on three unequal circles with no symmetry, balance in at least five ways; in each, one or two members are above wake speed. The one with the fewest growing roots has members at radii $1.705$, $0.851$ and $0.830$ and speeds $1.345$, $0.671$ and $0.655$, with six growing roots: $1.357\,\omega$, $0.541\,\omega$, and the pairs $(0.252\pm1.094\,i)\,\omega$ and $(0.011\pm2.156\,i)\,\omega$. Six four-member arrangements of the same kind, with two members of each polarity, were found; none with three of one polarity and one of the other.

The two-member row at speeds $0.490$ and $1.571$ is the [closed-form pair](../../binary-research/analysis/asymmetric-opposite-pair-closed-form.md).

Two rows have very large counts, 76 and 212. Their bounds on growing roots are also large, because a transmitter factor is small or a delay is long, and they show that above wake speed the number of growing roots is not tied to the number of members.

## What the counts show

- **No balance is free of growing roots.** The smallest count is five, for both two-member balances. Among balances entirely below wake speed the smallest is nine, for the travelling three-member balance, then thirteen for the planar six-member balance.
- **The count scales with the number of members.** Across all 93 balances the number of growing roots per member is never below two; its median is three. For the 65 below wake speed it lies between $2.2$ and $11.4$.
- **Three per member is what near-total instability looks like.** A system of $N$ members has $3N$ coordinates. In the zero-delay comparison its characteristic roots come in pairs of opposite sign, so at most $3N$ can grow. A count near $3N$ means that almost every mode of the arrangement grows. This is an observation about the counts (inferred), not a derived property of the delayed equation, which has infinitely many roots.
- **Fewer members is the only trend toward fewer growing roots.** Speed, net polarity, dimension and travel do not lower the count per member in any systematic way. The slowest balance, three concentric hexagons at $0.13$ of wake speed, has 51.
- **Growth is fast.** The largest growth rate is at least $0.85\,\omega$ for every balance and at least $1.56\,\omega$ for every balance below wake speed. The slowest-growing balances are the closed-form pair and one asymmetric trimer.

## What it means

- **The equation has many exact finite solutions below wake speed.** Before 2026-10-03 the record held none, and that day's session found seven. There are now 65 with enclosures, and the families that produced them were sampled thinly.
- **Finite arrangements can travel.** A steadily moving, rotating, finite exact solution exists with as few as three members and with no member at wake speed. Whether such a structure bears on the [translating carrier](../../photon-research/priorities.md) sought by the photon research is a question for that owner; the carriers found here are unstable, move well below wake speed, and are not the twelve-member construction that owner specifies.
- **Neutral assemblies below wake speed exist**, including nested versions of the Braid Program's rings.
- **Stability is still the obstacle, and rigid balances now look like the wrong place to find it.** Ninety-three balances from every class searched share one property. The remaining candidates for a persistent structure are motions that are not rigid, structures supported by a surrounding population, and the equation-level decisions already before the operator.

## Limits and falsifiers

The search is random and thin: a family received at most ten minutes, and most families with more than three rings were sampled by a few hundred starts. Absence of a balance in a family is weak evidence. Absence of a balance without growing roots is a statement about 93 balances. Only rigid motion about a fixed axis was considered. Rings above wake speed were searched only up to $4\,c_f$, only in one plane and only for small arrangements.

The enclosures use one interval instrument and one library, apart from the three balances with separate certificates. The counts of growing roots are float computations; they omit roots with real part below $0.0005\,\omega$, and the bound that closes the contour uses float norms. Only five balances have a separately constructed count: the travelling six-member and three-member balances, the planar six-member balance, the charged trimer and the closed-form pair. The largest growth rates in the tables were found by bisection on the contour and are accurate to about two percent; an independent check found two of them high by $0.7$ percent. Root locations quoted in the text were located directly and are accurate to the digits shown.

A balance in these tables whose interval enclosure fails under a second instrument, a causal root missed by the census, or a member at or above wake speed in a balance listed as below it would refute the entry. A rigid balance with no growing characteristic root would overturn the main conclusion, and so would an error in the characteristic matrix that survives the finite-difference controls.
