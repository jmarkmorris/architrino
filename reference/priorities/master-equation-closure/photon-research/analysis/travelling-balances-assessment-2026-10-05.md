# Do the finite travelling balances bear on the translating carrier? An assessment

## Result

The Braid Program's search found four finite arrangements that satisfy the unchanged Master Equation exactly while rotating about an axis and moving steadily along it, with every member below wake speed. This note assesses them against this owner's translating carrier.

**Recommended ruling: relevant as controls, not as candidates.** The four balances are the first exact histories on record that satisfy this owner's [axial balance identity](translating-carrier-root-and-axial-constraints.md#exact-axial-balance-identity) with a nonzero translation speed, and they confirm it to rounding. They are not the twelve-member candidate, they do not resemble it in the respects that matter, and all four are unstable. The ruling itself is the operator's; this note supplies the facts for it.

| Property | The four travelling balances | The twelve-member candidate |
| --- | --- | --- |
| Members | 3, 6, 8 and 8 | 12 |
| Internal motion | Rigid: every member turns at one angular rate in one sense | Two rings turning in opposite senses, so not rigid |
| Translation speed, in $c_f$ | $0.110$, $0.282$, $0.453$, $0.298$ | A carrier with fixed axial offsets cannot translate at or above wake speed on ordinary roots; the speed of the candidate is not fixed by a balance |
| Net polarity | $+1$, $+2$, $+4$ and $0$ | $0$ |
| Standing | Exact solutions, interval-enclosed; the three-member and six-member ones separately certified | Prescribed; the retained branch is missing |
| Nearby histories | 9, 16, 25 and 32 growing roots; released, a member reaches wake speed within about a period | No reference |

**Claim grade:** measured for the identity check, by direct evaluation on the enclosed balances; the comparison restates the owners. The equation is unchanged, with $c_f=1$ and $K=1$.

## The axial identity, checked on exact carriers

For a carrier whose members keep constant axial offsets $\chi_i$ while translating at speed $U$, this owner derived that the axial acceleration of member $i$ is $A_{x,i}=US_i+C_i$, where $S_i$ is the signed sum of the scalar weights $\sigma_{ij}K/(r^2\lvert D_t\rvert)$ over all rows and $C_i$ is the same sum weighted by $(\chi_i-\chi_j)/r$ over rows from other planes. Steady translation needs $US_i+C_i=0$ for every member. The identity had no exact instance with $U\ne0$: the single-ring screws to which it had been applied are all excluded.

A rigid travelling balance has constant axial offsets, so the identity applies to it without change. Evaluated on the enclosed solutions, with one representative member per ring:

| Balance | $U$ | Member (polarity, radius, height) | $S_i$ | $C_i$ | $US_i+C_i$ |
| --- | --- | --- | --- | --- | --- |
| Three members | $-0.110061$ | $+$, $0.177$, $0$ | $-1.5489$ | $-0.1705$ | $5\times10^{-15}$ |
| | | $+$, $0.200$, $0.440$ | $-3.4972$ | $-0.3849$ | $4\times10^{-16}$ |
| | | $-$, $0.156$, $0.275$ | $-31.657$ | $-3.4842$ | $5\times10^{-15}$ |
| Six members | $0.282373$ | $+$, $3.181$, $0$ | $-0.2011$ | $+0.0568$ | $-7\times10^{-17}$ |
| | | $+$, $2.101$, $1.620$ | $-0.0125$ | $+0.0035$ | $-4\times10^{-17}$ |
| | | $-$, $1.417$, $0.582$ | $-0.3348$ | $+0.0945$ | $-1\times10^{-16}$ |
| Eight members, no net polarity | $0.297916$ | $+$, $0.610$, $0$ | $-16.809$ | $+5.0076$ | $4\times10^{-15}$ |
| | | $+$, $0.684$, $0.236$ | $-0.9678$ | $+0.2883$ | $-4\times10^{-16}$ |
| | | $-$, $0.413$, $-0.089$ | $-5.3327$ | $+1.5887$ | $-4\times10^{-16}$ |
| | | $-$, $0.839$, $0.334$ | $-1.1941$ | $+0.3557$ | $-3\times10^{-15}$ |

The fourth balance, eight members with net polarity $+4$, satisfies the identity to the same accuracy; two of its members have positive total weight $S_i$ and two negative. In the other three every member has negative total weight, as on the excluded single-ring screws, and the cross-plane term supplies the balance. The six-member balance is listed here in the mirror orientation of the Braid Program's table, with heights measured from its large pair.

Two things follow. The identity is confirmed on exact histories, which it had not been. And its necessary conditions can be met by finite arrangements: a negative total weight on every member does not exclude steady translation once members sit in more than one plane.

## Why they are not the candidate

A rigid arrangement turns in one sense. The candidate's two rings turn in opposite senses, so its members' relative positions change with time and it is not a rigid balance; this owner has shown that equal-frequency regular hexagons turning in opposite senses admit no rigid circular correction. The count of conditions that makes a rigid arrangement travel, one more axial condition than unknowns unless it moves along its axis, does not carry over to a history whose shape changes in time.

The travelling balances fix their own speed, between a ninth and a half of wake speed, and none approaches wake speed. Each is unstable, and the three-member, six-member and neutral eight-member ones, [released with a small kick](../../braid-program/analysis/released-balances-and-nonrigid-search-2026-10-05.md), lose a member to wake speed within about one period, an arrival to which the parent's [curved-path obstruction](../../analysis/curved-path-wake-speed-obstructions.md) applies when its hypotheses hold: it then has no continuation with continuous velocity.

## What the owner could do with this

- **Not relevant.** Record the balances as a different object and close the entry.
- **Relevant as controls (recommended).** Cite them as exact instances of the axial identity, and use them to test any instrument that evaluates axial sums before it is applied to the twelve-member candidate.
- **A reason to search.** A rigid travelling arrangement of twelve members, for example two alternating hexagons turning in the same sense at different heights, lies in the family the Braid Program's search samples. A search of that family was run on 2026-10-05 and is recorded in the Braid Program's [travelling twelve-member search](../../braid-program/analysis/released-balances-and-nonrigid-search-2026-10-05.md#a-search-for-rigid-travelling-arrangements-of-twelve-members). It found two rigid travelling arrangements of twelve members, each four triangles at four heights, one of them with no net polarity and an axial speed of $0.314$; both are enclosed and both are unstable. In 629 starts of the family that contains them it found none with the triangles paired into two regular alternating hexagons, the nearest rigid relative of the candidate; that negative is thin. These are rigid objects and not the contra-rotating candidate.
- **Added 2026-10-06.** The Braid Program's [second campaign](../../braid-program/analysis/rigid-balance-search-2026-10-04.md#a-second-campaign-2026-10-06) found six more travelling balances below wake speed, of seven to sixteen members, all enclosed and all unstable, with 18 to 89 growing roots. One, a member on the axis followed by three like pairs, travels at $0.81$ of wake speed, against $0.453$ for the fastest before. None has zero net polarity. They are further controls of the same kind and do not change the ruling recommended here.

## Limits and falsifiers

The identity check is a float evaluation on solutions that are themselves enclosed. Nothing here bears on formation, on propagation through a population, or on the candidate's own missing branch. A travelling balance whose members fail $US_i+C_i=0$ beyond rounding would refute either the identity or the balance.
