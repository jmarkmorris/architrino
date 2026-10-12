# Release-hypothesis measurements for the 24 uncounted arrivals (serial task 7, 2026-10-11)

The [release analysis](released-balances-and-nonrigid-search-2026-10-05.md) reports 276 releases of the 126 rigid balances below wake speed, 274 of them ending with a member arriving at wake speed. Its opening applies the curved-path arrival theorem, Theorem U of the [curved-path obstruction](../../analysis/curved-path-wake-speed-obstructions.md), to all 274. Its claim-grade line supports that only for the 250 arrivals where a rate of arrival and the transmitter factors were recorded. This report identifies the other 24, recovers what the retained records already hold for them, and measures what was missing. The Master Equation is unchanged: every positive-delay causal root, own-path roots included, no speed cap, no event rule, $c_f=K=1$. Nothing is continued past an arrival at wake speed. The frozen analysis, its instruments and its records are unchanged.

**Outcome.** The 24 are identified from the retained records and the frozen table, not by subtraction: they are the kicks of size $10^{-4}$ given to five named balances with the first, fixed-step instrument. Ten of them are the same preparation as a census run that did have its rate recorded, with a different instrument and step; fourteen had no rate evidence anywhere. All 24 were replayed with the original instrument and each again at half the step. Every retained record was reproduced: same event, same member, the same time to the last digit. In all 24 the sampled indicators that Theorem U needs are present at both step sizes: the arriving member's sampled speeds are below one until the event step and rise at a positive rate, each partner contributes exactly one root with a transmitter factor of at least $0.71$ at the event, and no partner's received emission crosses the kick time within the last 89 steps before the event. These are sampled float measurements. They do not prove the theorem's hypotheses, which are statements about every instant, and no record is promoted to a theorem application by this report. After the coordinator's review the measurements were repeated at the located crossing of speed one, several claims were corrected, and one flag was withdrawn; Section 10 records this, and it governs wherever it differs from the earlier sections.

## 1. The count, reconciled

All figures in this section were recomputed from the retained files by the [join script](../evidence/serial-release-hypothesis-join-2026-10-11.py) (measured, by reading the files).

| Group | Source | Runs | Arrivals at wake speed | Arrivals with rate and factors recorded |
| --- | --- | --- | --- | --- |
| First search, census | `census-rates.json` (2026-10-06 repeat of the three census files) | 130 | 130 | 130 |
| First search, named releases | five `release-<name>.json` files, kicks of size $10^{-4}$ at the base step | 24 | 24 | 0 |
| Second campaign, census | `census-rates2.json` and `census-rates3.json` | 122 | 120 | 120 |
| Total | | 276 | 274 | 250 |

- The three first-census files hold 186 records. The 130 with every member below wake speed cover 65 balances, two seeds each, all ending in an arrival; `census-rates.json` has exactly the same 130 keys, each with a rate and a smallest factor.
- The second campaign's two files hold 122 distinct records over 61 balances: 120 arrivals, each with a rate and a smallest factor, and 2 dispersals.
- So $276=130+24+122$, $274=130+24+120$, $250=130+120$, and the difference is the 24 named releases.

**Why these 24 and not others (measured, from the frozen text and the retained records).** The five named files hold 35 records for balances below wake speed, not 24. Three facts fix the 24 among them.

1. The frozen analysis's first table has a column "Kicks of size $10^{-4}$" with 6, 6, 6, 3 and 3 for these five balances, which sums to 24. The retained files hold exactly 6, 6, 6, 3 and 3 records at amplitude $10^{-4}$ and the base step, with seeds 1 to 6 or 1 to 3.
2. The same table's time ranges, $0.50$ to $0.57$, $0.78$ to $1.37$, $1.00$ to $1.27$, $0.32$ to $0.33$ and $0.16$ to $0.17$ periods, equal the rounded extremes of those base-step records for all five balances. Adding the amplitude-$10^{-6}$ records breaks two of the five ranges ($0.72$ for the travelling three-member balance and $1.54$ for the travelling six-member one). The analysis also says all 154 runs ended by $1.37$ periods; the amplitude-$10^{-6}$ record at $1.54$ is later than that.
3. The session's own audit notes state the arithmetic as "24 tabulated + 130 census = 154 runs".

The other 11 retained records are not among the 24: eight repeat one of the 24 preparations at half the step, which the analysis counts separately as step refinement, and three use a kick of size $10^{-6}$. The three are arrivals too, were replayed here, and are listed in Section 5; they are outside the 276.

**Repeated preparations.** A preparation here means one balance, one kick seed and one kick amplitude. The named releases and the census use the same kick construction, so named seeds 1 and 2 of each balance are the same preparations as that balance's two census runs. Ten of the 24 are therefore individual historical runs of a preparation that the census also ran, with a different instrument (adaptive step, 1,200 base steps per period) and so a different resolution. I keep them as distinct records and do not merge resolutions. For those ten the census record already gives a rate and a smallest factor, shown in the identity table. The other fourteen preparations (seeds 3 to 6, or seed 3) appear nowhere else.

## 2. The 24 records

Balance sources are the retained result files of the 2026-10-04 search, with their full rigid past: `results/0151.json` (travelling three-member), `results/0022.json` (planar six-member), `results/0090.json` (travelling six-member), `results/0199.json` (three-dimensional seven-member) and `results/0152.json` (travelling eight-member), balance index 0 in each. Every kick has amplitude $10^{-4}$ and is `default_rng(seed).normal(size=(N, 3))` scaled to that norm, applied to every member's velocity at time zero. The instrument is `release.py`, fixed-step, with the step equal to the period divided by the number shown. Every record's event is an arrival at wake speed from below. "Member" is the arriving member's index.

| No. | Balance | Retained record | Seed | Steps per period | Member | Time, periods | Half-step record | Same preparation in the census |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Travelling three-member | `release-travel3.json#0` | 1 | 2000 | 2 | $0.49700$ | `release-travel3.json#7` | yes: member 2 at $0.4967$, rate $5.12$, smallest factor $0.633$ |
| 2 | Travelling three-member | `release-travel3.json#1` | 2 | 2000 | 2 | $0.52350$ | `release-travel3.json#8` | yes: member 2 at $0.5242$, rate $5.22$, smallest factor $0.633$ |
| 3 | Travelling three-member | `release-travel3.json#2` | 3 | 2000 | 2 | $0.56650$ | new, this task | no |
| 4 | Travelling three-member | `release-travel3.json#3` | 4 | 2000 | 2 | $0.51800$ | new, this task | no |
| 5 | Travelling three-member | `release-travel3.json#4` | 5 | 2000 | 2 | $0.54250$ | new, this task | no |
| 6 | Travelling three-member | `release-travel3.json#5` | 6 | 2000 | 2 | $0.50750$ | new, this task | no |
| 7 | Planar six-member | `release-planar6.json#1` | 1 | 1500 | 1 | $0.84800$ | `release-planar6.json#6` | yes: member 1 at $0.8481$, rate $0.0116$, smallest factor $0.501$ |
| 8 | Planar six-member | `release-planar6.json#0` | 2 | 1500 | 1 | $0.77667$ | `release-planar6.json#7` | yes: member 1 at $0.7764$, rate $0.0116$, smallest factor $0.500$ |
| 9 | Planar six-member | `release-planar6.json#2` | 3 | 1500 | 0 | $1.37333$ | new, this task | no |
| 10 | Planar six-member | `release-planar6.json#3` | 4 | 1500 | 0 | $1.09933$ | new, this task | no |
| 11 | Planar six-member | `release-planar6.json#4` | 5 | 1500 | 2 | $1.33200$ | new, this task | no |
| 12 | Planar six-member | `release-planar6.json#5` | 6 | 1500 | 1 | $0.92333$ | new, this task | no |
| 13 | Travelling six-member | `release-travel6.json#1` | 1 | 1500 | 4 | $1.05533$ | `release-travel6.json#7` | yes: member 4 at $1.0550$, rate $1.43$, smallest factor $0.566$ |
| 14 | Travelling six-member | `release-travel6.json#2` | 2 | 1500 | 0 | $1.26867$ | `release-travel6.json#8` | yes: member 0 at $1.2683$, rate $0.0496$, smallest factor $0.565$ |
| 15 | Travelling six-member | `release-travel6.json#0` | 3 | 1500 | 0 | $1.05067$ | new, this task | no |
| 16 | Travelling six-member | `release-travel6.json#3` | 4 | 1500 | 5 | $1.00667$ | new, this task | no |
| 17 | Travelling six-member | `release-travel6.json#4` | 5 | 1500 | 0 | $0.99533$ | new, this task | no |
| 18 | Travelling six-member | `release-travel6.json#5` | 6 | 1500 | 4 | $1.07133$ | new, this task | no |
| 19 | Three-dimensional seven-member | `release-mirror7.json#0` | 1 | 1500 | 4 | $0.32133$ | `release-mirror7.json#3` | yes: member 4 at $0.3214$, rate $0.919$, smallest factor $0.501$ |
| 20 | Three-dimensional seven-member | `release-mirror7.json#2` | 2 | 1500 | 5 | $0.33400$ | new, this task | yes: member 5 at $0.3339$, rate $0.902$, smallest factor $0.501$ |
| 21 | Three-dimensional seven-member | `release-mirror7.json#1` | 3 | 1500 | 4 | $0.33133$ | new, this task | no |
| 22 | Travelling eight-member | `release-travel8.json#1` | 1 | 1500 | 1 | $0.17133$ | `release-travel8.json#3` | yes: member 1 at $0.1711$, rate $5.09$, smallest factor $0.388$ |
| 23 | Travelling eight-member | `release-travel8.json#0` | 2 | 1500 | 1 | $0.16400$ | new, this task | yes: member 1 at $0.1643$, rate $5.11$, smallest factor $0.388$ |
| 24 | Travelling eight-member | `release-travel8.json#2` | 3 | 1500 | 0 | $0.17400$ | new, this task | no |

## 3. What the retained records already held, and what was missing

**Recovered (measured by the original runs, read from the retained files).** For each of the 24: the event kind, the arriving member, the event time, the smallest transmitter factor on any row during the whole run (between $0.388$ and $0.633$), the smallest pair distance, every member's largest speed, every member's speed in the rigid past (all below one), and the initial root census, which is one root for each ordered pair of distinct members and none from a member's own path. The original instrument stops if a rescan every 25 steps finds a different census, so no change of census was seen at those rescans. For the ten repeated preparations, the census record adds a rate and a smallest factor at another resolution.

**Missing.** No named record holds a rate of arrival, the speed history near the event, the rows at the event, or anything about the kick. The first three are what Theorem U's first hypothesis and the boundedness of the rows need; the last bears on the continuity of the rows.

## 4. Fresh measurements

### 4.1 Instrument, and one substitution

The [replay script](../evidence/serial-release-hypothesis-replay-2026-10-11.py) imports the original `release.py` by path after checking its hash, builds each preparation exactly as the original driver did, runs it, and measures only afterwards from the stored trajectory. The stepping is untouched.

One thing had to be substituted, and it is a real platform limit. `release.py` imports a root finder from a compiled scientific library that cannot be loaded in the shared environment on this host today. The script places a plain bisection under that name before loading `release.py`; `release.py` itself is not edited. The bisection only seeds the roots at the first scan and counts them at rescans; every tracked root is re-solved by `release.py`'s own Newton iteration each time it is used.

**Known cases, run and recorded before any target.** Six passed on the second run of the script: the bisection on three closed-form roots; `release.py` with the substitution holding the closed-form pair with no kick for one period, departure $8.5\times10^{-10}$; the growth of a kick of $10^{-8}$ on that pair at $0.8501\,\omega$ for two kick directions, against the largest located characteristic root $0.8531\,\omega$ and the original instrument's documented $0.8498\,\omega$ and $0.8530\,\omega$; my separately written row sum reproducing the rigid acceleration on every member of all five balances to $9\times10^{-14}$, with the wrong sign failing; and the kick construction being deterministic with the stated norm. The first run failed the growth-rate case: I had used a larger kick and a fitting window that takes in the early transient, which gave $0.878\,\omega$. That was my misposed control, not the documented one; I replaced it by the documented kick and window with the same tolerance of $0.01\,\omega$, and retained the failed run and its source.

**Reproduction of the retained records (measured).** All 35 retained records of the five balances were replayed. Every one gives the same event and the same member, an event time that differs by exactly zero, a smallest factor within $2\times10^{-13}$, a smallest pair distance within $7\times10^{-13}$ and final speeds within $4\times10^{-12}$. So the substitution does not change these trajectories at any digit that matters. This is a deterministic reproduction by the same instrument. It is not independent evidence that the trajectories are right.

**Half-step runs.** Eight of the 24 have a retained half-step record. For the other sixteen I ran the half step, which is new measurement with no historical counterpart. In all 24 the arriving member is the same at both steps and the event times differ by at most $0.0007$ of a period.

### 4.2 What Theorem U asks, and what was measured for each

Place the event at time zero. The theorem needs: (U1) the arriving member's speed below one at every earlier time, a velocity continuous up to the event with speed one there, and $1-v(s)\ge a\lvert s\rvert$ on some interval before the event with $a>0$; (U2) on such an interval the velocity absolutely continuous and equal to the integral of the rows from the other members, and that sum of rows $\mathbf B$ bounded near the event and continuous at the event along the path and its continuation.

| No. | Rate, last step (base; half) | Rate, 5 and 20 steps (base) | Sampled lower slope, 20 steps (base; half) | Row projection $\mathbf e\cdot\mathbf B$ at steps $-1$, $0$ (base) | Largest earlier speed of the member | Largest speed of any other member | Smallest factor on its rows at the event | Smallest delay at the event | Nearest member, sizes | Partners still received from the rigid past | Nearest kick crossing before the event, steps (base) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | $5.187$; $5.17$ | $5.058$, $4.61$ | $4.588$; $4.865$ | $5.154$, $5.219$ | $0.999008$ | $0.9112$ | $0.713$ | $0.201$ | $1.215$ | 0 of 2 | $571$ |
| 2 | $5.152$; $5.168$ | $5.025$, $4.579$ | $4.573$; $4.863$ | $5.12$, $5.185$ | $0.997238$ | $0.9112$ | $0.713$ | $0.201$ | $1.215$ | 0 of 2 | $624$ |
| 3 | $12.4$; $12.34$ | $11.96$, $10.44$ | $10.36$; $11.3$ | $12.29$, $12.51$ | $0.997808$ | $0.9112$ | $0.847$ | $0.212$ | $0.990$ | 0 of 2 | $710$ |
| 4 | $12.25$; $12.3$ | $11.81$, $10.3$ | $10.29$; $11.28$ | $12.14$, $12.36$ | $0.992314$ | $0.9112$ | $0.846$ | $0.212$ | $0.993$ | 0 of 2 | $613$ |
| 5 | $5.162$; $5.177$ | $5.034$, $4.587$ | $4.575$; $4.866$ | $5.129$, $5.194$ | $0.997929$ | $0.9112$ | $0.713$ | $0.201$ | $1.215$ | 0 of 2 | $662$ |
| 6 | $5.187$; $5.17$ | $5.059$, $4.611$ | $4.589$; $4.866$ | $5.155$, $5.22$ | $0.998994$ | $0.9112$ | $0.714$ | $0.201$ | $1.215$ | 0 of 2 | $592$ |
| 7 | $0.01156$; $0.01153$ | $0.01136$, $0.01065$ | $0.01063$; $0.01106$ | $0.0115$, $0.01161$ | $0.999909$ | $0.9713$ | $0.753$ | $1.767$ | $0.498$ | 0 of 5 | $925$ |
| 8 | $0.01166$; $0.01164$ | $0.01146$, $0.01075$ | $0.01071$; $0.01115$ | $0.01161$, $0.01172$ | $0.999959$ | $0.9714$ | $0.753$ | $1.766$ | $0.498$ | 0 of 5 | $818$ |
| 9 | $0.1126$; $0.1125$ | $0.1126$, $0.1125$ | $0.1125$; $0.1125$ | $0.1126$, $0.1126$ | $0.997930$ | $0.9714$ | $0.973$ | $2.170$ | $0.797$ | 0 of 5 | $1712$ |
| 10 | $0.1677$; $0.1671$ | $0.1661$, $0.1601$ | $0.1597$; $0.1634$ | $0.1673$, $0.168$ | $0.999966$ | $0.9714$ | $1.007$ | $1.820$ | $0.638$ | 0 of 5 | $1301$ |
| 11 | $0.154$; $0.1538$ | $0.1531$, $0.1491$ | $0.1489$; $0.1514$ | $0.1538$, $0.1543$ | $0.999650$ | $0.9714$ | $0.999$ | $1.882$ | $0.667$ | 0 of 5 | $1650$ |
| 12 | $0.01139$; $0.01141$ | $0.01119$, $0.0105$ | $0.01049$; $0.01093$ | $0.01134$, $0.01144$ | $0.999873$ | $0.9769$ | $0.753$ | $1.767$ | $0.498$ | 0 of 5 | $1038$ |
| 13 | $1.44$; $1.431$ | $1.378$, $1.131$ | $1.117$; $1.271$ | $1.425$, $1.454$ | $0.997258$ | $0.9425$ | $0.805$ | $0.870$ | $0.274$ | 0 of 5 | $1338$ |
| 14 | $0.04954$; $0.04954$ | $0.04895$, $0.04676$ | $0.04667$; $0.04808$ | $0.04939$, $0.04969$ | $0.999727$ | $0.9327$ | $0.762$ | $1.604$ | $0.754$ | 0 of 5 | $1578$ |
| 15 | $0.06294$; $0.06284$ | $0.0615$, $0.05662$ | $0.05646$; $0.05949$ | $0.06257$, $0.06331$ | $0.999506$ | $0.8879$ | $0.741$ | $1.408$ | $0.524$ | 0 of 5 | $1251$ |
| 16 | $1.414$; $1.423$ | $1.342$, $1.092$ | $1.085$; $1.246$ | $1.397$, $1.432$ | $0.987188$ | $0.8879$ | $0.809$ | $0.887$ | $0.271$ | 0 of 5 | $1265$ |
| 17 | $0.05412$; $0.05425$ | $0.05342$, $0.05067$ | $0.05062$; $0.05249$ | $0.05395$, $0.0543$ | $0.999372$ | $0.8879$ | $0.752$ | $1.289$ | $0.438$ | 0 of 5 | $1168$ |
| 18 | $1.263$; $1.268$ | $1.214$, $1.023$ | $1.021$; $1.148$ | $1.251$, $1.274$ | $0.983101$ | $0.8955$ | $0.844$ | $0.881$ | $0.285$ | 0 of 5 | $1362$ |
| 19 | $0.9179$; $0.9274$ | $0.8484$, $0.641$ | $0.6344$; $0.7632$ | $0.8996$, $0.9364$ | $0.997376$ | $0.9336$ | $0.875$ | $0.444$ | $0.552$ | 0 of 6 | $123$ |
| 20 | $0.908$; $0.917$ | $0.8392$, $0.6339$ | $0.6315$; $0.7595$ | $0.89$, $0.9263$ | $0.995984$ | $0.9538$ | $0.876$ | $0.444$ | $0.553$ | 0 of 6 | $142$ |
| 21 | $0.9242$; $0.9146$ | $0.8543$, $0.6455$ | $0.6364$; $0.7582$ | $0.9059$, $0.9428$ | $0.998204$ | $0.8828$ | $0.875$ | $0.443$ | $0.552$ | 0 of 6 | $138$ |
| 22 | $5.183$; $5.111$ | $4.648$, $3.123$ | $3.034$; $3.904$ | $5.042$, $5.327$ | $0.996080$ | $0.8557$ | $0.782$ | $0.269$ | $0.443$ | 4 of 7 | $101$ |
| 23 | $4.96$; $5.029$ | $4.443$, $2.976$ | $2.973$; $3.873$ | $4.823$, $5.099$ | $0.978924$ | $0.8557$ | $0.783$ | $0.271$ | $0.445$ | 4 of 7 | $90$ |
| 24 | $5.178$; $5.106$ | $4.643$, $3.12$ | $3.033$; $3.902$ | $5.037$, $5.321$ | $0.995727$ | $0.8557$ | $0.782$ | $0.269$ | $0.443$ | 4 of 7 | $105$ |

**What "at the event" means in this table (corrected, R7-02).** The values in this table and in the paragraphs below are taken at stored steps: "the event" is the first stored step at which the arriving member's speed is at least one, which lies just past the arrival. Section 10.2 gives the same quantities at the located crossing of speed one.

Rates are per unit time. "Row projection" is $\mathbf e\cdot\mathbf B$, the rate of change of the speed that the equation itself gives from the rows, computed by a root scan and row sum written for this task and not by the instrument's tracked roots. Steps $-1$ and $0$ are the last stored step with speed below one and the event step. The event step is the first stored step at which the speed is at least one; it overshoots by up to $0.02$, the crossing time is interpolated within that step, and the run is not continued.

**The whole past below wake speed (U1, first part).** Derived for the rigid past: each member's speed there is constant and below one, the largest being $0.971$. Measured for the computed part: the arriving member's speed just after the kick and at every stored step before the event step is below one in all 24, at both step sizes; its largest earlier value is in the table. Between stored steps the speed is not sampled.

**A positive rate (U1, last part).** Measured: the rate over the last step is positive in all 24, from $0.0114$ to $12.4$, and the half-step value agrees within $1.4$ percent. The equation's own rate $\mathbf e\cdot\mathbf B$ at steps $-1$ and $0$ brackets the measured rate in every record. The sampled lower slope, the smallest value of $(1-v)/\lvert s\rvert$ over the last 20 stored steps with $s$ measured from the interpolated crossing, is positive in all 24, from $0.0105$ to $10.4$; over the last 50 steps it is from $0.0093$ to $7.8$. The speed rose at every one of the last 50 steps in every run. The smallest rates are those of the planar six-member balance, as the frozen analysis found. A sampled positive slope is evidence for the inequality on an interval; it is not a proof of it.

**Complete rows (U2).** Measured: an independent scan of the delay, out to twice the instrument's scan range, finds exactly one root for each partner at each of the last 21 stored steps, in all 24 at both step sizes, and no own-path sign change at step $-1$. The complete-root argument, corrected (R7-01), is a conditional statement about continuous paths and does not follow from sampled speeds: if a source's continuous history has speed at most some $u_j<1$ at every past instant, its delay residual increases strictly with the delay, so it has at most one root; and it has one, because the residual is negative at vanishing delay for separated members and tends to infinity along the prescribed rigid tail, whose axial speed is below one and whose rotation stays bounded. Sub-wake speed at every past instant alone would not give that last step. A receiver whose continuous history is strictly below wake speed has no own-path root. For the stored trajectories these hypotheses are checked only as far as Section 10.1 says. The finite scan above finds one sign change per partner within its range and resolution; it is not a proof that no other root exists.

**Bounded rows (U2).** Measured at the event: the smallest transmitter factor on the arriving member's rows is between $0.713$ and $1.007$, the smallest delay between $0.20$ and $2.17$, and the nearest other member between $0.27$ and $1.2$ sizes away. Over the last 20 steps the sum of rows is at most $15.2$ in size, and its change per step halves when the step is halved, in every record. Derived, under the continuous-path hypotheses just stated: the factor is at least one minus the source's speed bound, so the rows are bounded while the sources stay below that bound and apart.

**Continuity of the rows, and the kick (U2).** This is the point the task singled out. Positions are continuous at the kick but every member's velocity jumps there, by an amount of total norm $10^{-4}$. A row depends on the source's velocity at the emission time through its transmitter factor. So the row that member $w$ receives from member $j$ jumps, by a relative amount of at most the kick over the factor, at the reception time when the emission received from $j$ crosses the kick time. The arriving member's acceleration therefore has one small jump for each partner whose emission has crossed the kick, and its velocity stays continuous and Lipschitz there. Theorem U asks for the sum of rows to be bounded near the event and continuous at the event, so what matters is whether such a crossing coincides with the event. Derived: away from a crossing, with one ordinary root per partner, each row is a continuous function of the receiver's position and of the source's position and velocity at the emission time. Measured: where the crossings are.

- Records 1 to 21: every partner's emission has already crossed the kick by the event. The latest crossing is between 123 and 1,712 base steps before the event, that is between $0.40$ and $33$ units of time. No crossing falls within the last 50 steps at either step size.
- Records 22 to 24 (the travelling eight-member balance, whose events come at $0.16$ to $0.17$ of a period): four of the seven partners are still received from the rigid past at the event. The latest earlier crossing is 90 to 105 steps before the event, $0.39$ to $0.46$ units of time. Extending the last step linearly gives $0.086$, $0.180$ and $0.041$ units of time to the next crossing ($0.088$, $0.182$ and $0.043$ at the half step). These are extrapolations of a path that was not computed. They are not crossings of any continuation and not bounds on anything (corrected, R7-03).

So in all 24 no crossing is at the event at this measured grade; the measured margin is the kick residual at the located crossing, in Section 10.2. An earlier version of this paragraph said that for records 22 to 24 the rows stay continuous for "at most" $0.04$ to $0.18$ units of time after the event and left open whether the theorem needs more. Both statements are withdrawn (R7-03). Having now read the whole proof: its Step 2 chooses the working interval after the event as small as continuity requires, with no minimum length, and the contradiction in Step 5 holds on any such interval. A kick reception strictly after the arrival is therefore no obstacle to the theorem, given its hypotheses.

**Receiver regularity (U1, U2).** The kick is between 246 and 2,060 base steps before the event, so it lies outside any short interval before the event. The earlier wording, that the computed velocity is the integral of the rows "by construction of the integrator", is withdrawn (R7-02). The stored history is a fixed-step fourth-order approximation with cubic interpolation between steps; its last step runs through the arrival to a stored point with speed above one, where the stop rule ends the run. It is not an exact history that stops at the arrival, and it is not a solution of the equation by construction. Section 10.2 measures how far the interpolant's acceleration is from the row sum at the crossing.

### 4.3 Result for each record

Under rules written into the join script before it read the measurements, a record is flagged if a sampled speed of the arriving member reached one before the event step, if a sampled slope or row projection is not positive, if the root count per partner is not one at a checked step, if a partner's emission crosses the kick within the last 50 steps, if another member reached wake speed, or if the arriving member differs between step sizes. **None of the 24 is flagged.** The separate note about records 22 to 24 in the first version is withdrawn in Section 4.2.

What this supports, by grade:

- **Measured (float, original instrument, two step sizes, sampled):** for each of the 24, the indicators of (U1) and (U2) listed above.
- **Derived, conditional on continuous-path hypotheses that the sampled speeds do not supply (corrected, R7-01):** one root per partner at every delay, no own-path root, bounded rows, and continuity of the rows away from kick receptions.
- **Not established for any record:** that the speed is below one at every instant before the event and not only at stored steps; the inequality $1-v(s)\ge a\lvert s\rvert$ as a statement on an interval; continuity of the rows at the event as an exact statement, since it rests on float margins; that the float history is a solution of the equation.

No record is promoted. The measurement gap between 250 and 274 is closed at the same sampled, float grade that the 250 have, with more detail than the census records hold; it is not closed at the grade of a theorem.

## 5. The three records at kick size $10^{-6}$

These retained records are outside the 276 and are reported for completeness. Each is an arrival, replayed at its retained step only: the travelling three-member balance, member 2 at $0.7190$ periods, rate $5.17$; the planar six-member balance, member 1 at $1.2960$, rate $0.0116$; the travelling six-member balance, member 4 at $1.5367$, rate $1.36$. Their sampled lower slopes over 20 steps are $4.58$, $0.0107$ and $1.08$, and none has a kick crossing in the last 50 steps. No half-step run was made for them.

## 6. Independence, limits and falsifiers

- **One instrument.** Every trajectory here comes from the original `release.py`. The replay reproduces the retained records and adds measurements; it does not test the instrument. The independent elements are the row scan and row sum written for this task, tested on the exact balances, and the three [blind reproductions](released-balances-blind-reproduction-2026-10-06.md) already on record for one kick each of the travelling three-member, planar six-member and three-dimensional seven-member balances, which are the preparations of records 1, 7 and 19: the blind input file's geometry and kick vectors equal those of the replays exactly (Section 10.4).
- **Sampled, not continuous.** Speeds, rows and root counts are evaluated at stored steps. The history between steps is the instrument's cubic interpolation.
- **Fixed-step integration across the small acceleration jumps** at kick crossings loses accuracy locally; the half-step agreement is the only evidence about its size.
- **The kick-crossing times after the event** are linear estimates along the last step, not computed continuations.
- **Substitution.** The root finder substitution is declared in Section 4.1 and tested only by the known cases and the reproduction.
- **No certified trajectory** and no interval arithmetic.

**Falsifiers.** A retained record for these five balances at amplitude $10^{-4}$ and the base step that is not in the identity table, or a count other than 6, 6, 6, 3, 3. A replay by the unmodified instrument, on a host where its library loads, whose event, member or time differs from the retained record. A separately written integrator of the same equation and preparation that finds, for any of the 24, a different arriving member, a non-positive rate, more than one root for some partner, or a partner emission crossing the kick at the event.

## 7. Failures and limitations

1. **The first known-case run failed**, on my misposed growth-rate control, as described in Section 4.1. It is retained with its source. No target ran before the known cases passed.
2. **One platform limit:** the compiled library that `release.py` imports cannot be loaded in the shared environment on this host, which forced the substitution.
3. **The first-version table was not found.** The identification uses the committed analysis, whose table carries the kick counts; I searched the repository history of that file (one commit), the two session directories and the session's audit notes, and found no earlier table.
4. **Reading coverage.** Read in full: the release instrument and its three drivers for named releases and controls, the adaptive and census instruments' sources, the census and census-rates drivers, and Theorem U's statement, scope, setting and lemmas (lines 1 to 80 of the obstruction note). Read in part: the release analysis (its result, instrument, below-wake-speed sections and first table; not the sections on balances above wake speed, the ring, or the non-rigid search); the theorem's adjudication (the lines found by search, including its item on the plausibility of the hypotheses); the proofs of Theorems D and U and the rest of the obstruction note (lines 80 to 148), read in full after the review, together with the adjudication's acceptance of Theorem U and its item on the hypotheses; the session audit notes (the lines on run counts). The braid priorities and queue were searched for these counts and I read only the lines found. Ledger entry F-BRD-58 was read in full.
5. **The kick-margin reduction ran outside the supervisor**; it reads the retained trajectories and takes seconds.

## 8. Retention

Sources in the parent `evidence/` folder: the replay script and the join script. Owner `.local-data/master-equation-closure/serial-release-hypothesis-measurements-2026-10-11/`: `jobs.json`; `runs/`, with one sub-directory per run (51: the 35 retained records and 16 new half-step runs), each holding `result.json` and the complete stored trajectory; `runs/index.json`; `join-run1/join.json` and `tables.md`; `kick-margin.json` with its source; both known-case runs with the script as it stood at each; supervisor records for four jobs (two known-case runs, the replay and the join), each with a closed process group; closeout; `commands.txt`; `outputs.sha256` and `sources.sha256`. The second has 27 entries: the two durable scripts of this task (replay and join), the original instrument and drivers, the five balance sources, the five named record files, the six census files, the frozen analysis and the obstruction note. Nothing was written into either geometry-session directory.

## 9. Remaining obligations and proposed integration

**Remaining for task 7.**

1. Resolved by reading the proof (Section 10.3): the theorem needs no fixed interval after the event.
2. Any continuous-time statement about the exact solution: none is established for any record.

**Optional work outside this task's selected 24 measurements (corrected, R7-04).** A separately written integrator for the preparations that no other instrument has run; three of the 24 are covered by the earlier blind reproductions. The kick-reception check for the 250 census arrivals, whose records hold nothing about the kick.

**Proposed integration, for the coordinator; not applied.** Where current documents say the hypotheses were measured on 250 of 274 arrivals, they can say that the remaining 24, the named releases at kick size $10^{-4}$, have now been replayed with the original instrument at two step sizes, with positive sampled rates from $0.011$ to $12.4$, one root per partner, factors of at least $0.71$ at the event and $0.39$ over the run, and a kick residual of at least $0.0145$ at the located crossing (smallest measured $0.014556$); and that this is float evidence on stored and interpolated histories, of the same kind as the 250, and not a proof of the hypotheses. The frozen analysis's opening sentence stays as written; the companion statement is this report.

## 10. Corrections after the coordinator's review (2026-10-11)

The coordinator reviewed this report at SHA-256 `0f46a4283b0bcf8aa9d5a024996078090d9ca1a01cec7588360bb4862fafe472` and raised four comments in its [review](serial-release-hypothesis-codex-review-2026-10-11.md). Those bytes are retained as `report-as-reviewed-0f46a428.md` in the supplement owner of Section 10.5. Passages above that were wrong or too broad were corrected in place, each marked with its comment number; no value in the two tables changed. The replay script, the join script, their outputs and both original manifests are unchanged.

A third script, [`serial-release-hypothesis-crossing-2026-10-11.py`](../evidence/serial-release-hypothesis-crossing-2026-10-11.py), reads the retained trajectories and integrates nothing. It imports neither the release instrument nor any compiled library beyond the array library; its interpolation, rigid past, root scan and row sum are written in it. Its seven known cases passed, before any target, on its third run: a segment with linear velocity crossing speed one at the midpoint with the analytic rate; a planted segment with endpoint speeds one half and interior speed five quarters, which its speed bound must not report below five quarters; its row sum at an off-grid time on each of the five exact rigid balances, equal to the rigid acceleration within $6\times10^{-9}$ (measured $5.19\times10^{-9}$; the case's threshold is $10^{-6}$), with the wrong sign failing; the interpolant's acceleration on those exact grids, within $6\times10^{-7}$ of the rigid one; the kick residual of a receiver at rest; and a planted duplicate run directory, which its ingestion must report. The first run stopped on a fault of mine in listing the run directory. The second failed the first known case for a real defect that the case was there to catch: my sign scan missed a root lying exactly on a scan point. I made exact zeros count as roots, and made the delay scan stop if a residual vanishes exactly on a scan point. Both failed runs are retained with their sources, and neither read a target.

### 10.1 R7-01: what the speed bounds do and do not support

**Disposition: corrected in Sections 4.2 and 4.3.** The complete-root argument is conditional on continuous-path hypotheses, as restated there, and it also needs the rigid tail to make the delay residual tend to infinity.

What can be said about the stored histories (measured, float, on the interpolant): between two stored steps the cubic interpolant's velocity is a quadratic in the step fraction, and its speed on the segment is at most the largest norm of its three Bernstein controls. With that bound, in all 48 selected runs every other member's speed is below $0.976977$ on its whole interpolated history, and the arriving member's is below $0.999979$ on every segment before the last. The coordinator's separately written reduction gives the same two numbers. The largest source speed at any emission actually received at a crossing is $0.9718$. These are bounds on the interpolant in float arithmetic. They are not bounds on the exact solution of the equation, and nothing here certifies that solution.

### 10.2 R7-02: measurements at the located crossing

**Disposition: added; the grid-endpoint values of Section 4.2 are kept as they were.** In the last segment of the arriving member the equation $\lvert\mathbf x'\rvert=1$ has exactly one root in each of the 48 runs. At that time, with the receiver at its interpolated position:

| No. | Crossing time, periods (base; half) | Interpolant's rate (base; half) | Row-sum rate $\mathbf e\cdot\mathbf B$ (base; half) | Smallest factor (base) | Smallest delay (base) | Nearest member, sizes (base) | Smallest kick residual, absolute (base; half) | Partners received from the rigid past |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | $0.49664$; $0.49664$ | $5.172$; $5.172$ | $5.172$; $5.172$ | $0.713$ | $0.201$ | $1.215$ | $0.285$; $0.285$ | 0 of 2 |
| 2 | $0.52339$; $0.52339$ | $5.17$; $5.17$ | $5.17$; $5.17$ | $0.713$ | $0.201$ | $1.215$ | $0.323$; $0.323$ | 0 of 2 |
| 3 | $0.56613$; $0.56613$ | $12.35$; $12.35$ | $12.35$; $12.35$ | $0.845$ | $0.212$ | $0.992$ | $0.379$; $0.379$ | 0 of 2 |
| 4 | $0.51795$; $0.51795$ | $12.33$; $12.33$ | $12.33$; $12.33$ | $0.846$ | $0.212$ | $0.993$ | $0.341$; $0.341$ | 0 of 2 |
| 5 | $0.54229$; $0.54230$ | $5.167$; $5.167$ | $5.167$; $5.167$ | $0.713$ | $0.201$ | $1.215$ | $0.351$; $0.351$ | 0 of 2 |
| 6 | $0.50714$; $0.50715$ | $5.173$; $5.173$ | $5.173$; $5.173$ | $0.714$ | $0.201$ | $1.215$ | $0.3$; $0.3$ | 0 of 2 |
| 7 | $0.84761$; $0.84759$ | $0.01155$; $0.01155$ | $0.01155$; $0.01155$ | $0.753$ | $1.768$ | $0.498$ | $16.7$; $16.7$ | 0 of 5 |
| 8 | $0.77612$; $0.77611$ | $0.01163$; $0.01163$ | $0.01163$; $0.01163$ | $0.753$ | $1.767$ | $0.498$ | $15.7$; $15.7$ | 0 of 5 |
| 9 | $1.37330$; $1.37336$ | $0.1126$; $0.1125$ | $0.1126$; $0.1125$ | $0.973$ | $2.170$ | $0.797$ | $34$; $34$ | 0 of 5 |
| 10 | $1.09867$; $1.09867$ | $0.1673$; $0.1673$ | $0.1673$; $0.1673$ | $1.010$ | $1.823$ | $0.638$ | $24.4$; $24.4$ | 0 of 5 |
| 11 | $1.33141$; $1.33128$ | $0.1539$; $0.1538$ | $0.1539$; $0.1538$ | $1.002$ | $1.883$ | $0.668$ | $33$; $33$ | 0 of 5 |
| 12 | $0.92305$; $0.92307$ | $0.01139$; $0.01139$ | $0.01139$; $0.01139$ | $0.753$ | $1.768$ | $0.498$ | $18.2$; $18.2$ | 0 of 5 |
| 13 | $1.05475$; $1.05477$ | $1.429$; $1.429$ | $1.429$; $1.429$ | $0.806$ | $0.887$ | $0.275$ | $16.3$; $16.3$ | 0 of 5 |
| 14 | $1.26823$; $1.26810$ | $0.0495$; $0.04951$ | $0.0495$; $0.04951$ | $0.762$ | $1.604$ | $0.754$ | $20.6$; $20.6$ | 0 of 5 |
| 15 | $1.05033$; $1.05025$ | $0.06294$; $0.06294$ | $0.06294$; $0.06294$ | $0.740$ | $1.409$ | $0.524$ | $15.7$; $15.7$ | 0 of 5 |
| 16 | $1.00638$; $1.00639$ | $1.417$; $1.417$ | $1.417$; $1.417$ | $0.809$ | $0.896$ | $0.271$ | $15.5$; $15.5$ | 0 of 5 |
| 17 | $0.99516$; $0.99512$ | $0.0542$; $0.05422$ | $0.05421$; $0.05422$ | $0.752$ | $1.290$ | $0.439$ | $14.8$; $14.8$ | 0 of 5 |
| 18 | $1.07123$; $1.07122$ | $1.27$; $1.27$ | $1.27$; $1.27$ | $0.844$ | $0.884$ | $0.285$ | $16.6$; $16.6$ | 0 of 5 |
| 19 | $0.32103$; $0.32102$ | $0.9194$; $0.9193$ | $0.9194$; $0.9194$ | $0.877$ | $0.445$ | $0.553$ | $0.902$; $0.902$ | 0 of 6 |
| 20 | $0.33389$; $0.33389$ | $0.9202$; $0.9202$ | $0.9202$; $0.9202$ | $0.877$ | $0.445$ | $0.553$ | $0.95$; $0.95$ | 0 of 6 |
| 21 | $0.33091$; $0.33092$ | $0.9194$; $0.9194$ | $0.9194$; $0.9194$ | $0.876$ | $0.445$ | $0.553$ | $0.939$; $0.939$ | 0 of 6 |
| 22 | $0.17078$; $0.17079$ | $5.091$; $5.091$ | $5.091$; $5.091$ | $0.783$ | $0.271$ | $0.445$ | $0.0316$; $0.0316$ | 4 of 7 |
| 23 | $0.16398$; $0.16398$ | $5.09$; $5.09$ | $5.091$; $5.091$ | $0.783$ | $0.271$ | $0.445$ | $0.075$; $0.075$ | 4 of 7 |
| 24 | $0.17346$; $0.17346$ | $5.091$; $5.091$ | $5.091$; $5.091$ | $0.783$ | $0.271$ | $0.445$ | $0.0146$; $0.0146$ | 4 of 7 |

- *Time.* The located crossing differs from the linear estimate of Section 4.2 by at most $4.9\times10^{-5}$ units of time (largest measured $4.82\times10^{-5}$), and between the two step sizes by at most $0.00014$ of a period (largest measured $0.000130$).
- *Rate.* The interpolant's rate $\mathbf e\cdot\mathbf x''$ is between $0.01139$ and $12.35$. The row-sum rate $\mathbf e\cdot\mathbf B$ at the same time and position, from an independent scan of every partner's delay, is between $0.01139$ and $12.35$. The two agree within $1.6\times10^{-4}$ relative in every run, and the half-step row-sum rate is within $0.04$ percent of the base one.
- *Interpolant and equation.* The interpolant's acceleration is not the equation's row sum. At the crossing they differ by at most $1.5\times10^{-4}$ of the row sum's size (largest measured $1.416\times10^{-4}$). That residual measures how well the stored history satisfies the equation at that instant; it is not zero and is not claimed to be.
- *Rows.* One sign change of the delay residual per partner in every run, over a range twice the instrument's. The smallest transmitter factor is $0.713$, and every factor is positive; the smallest delay is $0.201$; the nearest other member is $0.271$ sizes away; the row sum is at most $15.1$ in size.
- *Kick.* The kick residual for partner $j$ is $t^*-\lvert\mathbf x_w(t^*)-\mathbf X_j(0)\rvert$: negative while $j$ is still received from its rigid past, zero at a kick reception. Its smallest absolute value over all partners and all 48 runs is $0.014556$, in record 24 at the half step; over records 1 to 21 it is $0.285$. It is nonzero in every run.

All of this is float reduction of one instrument's stored histories. It gives regularity indicators at the interpolant's crossing; it does not establish the theorem's hypotheses for the exact solution.

### 10.3 R7-03: the theorem needs no fixed interval after the event

**Disposition: the flag on records 22 to 24 and the "at most" statements are withdrawn; corrected in the outcome paragraph and Sections 4.2, 4.3 and 9.** I read the whole proof of Theorem U and the adjudication's acceptance of it. Step 1 obtains a positive forward push of the partners at the event from the rate hypothesis. Step 2 uses continuity of the rows and of the direction of motion at the event to choose a working interval, as small as needed, on which that push is at least half the rate and on which the conditions of the two root lemmas hold. Steps 3 to 5 then give a logarithmic divergence on any such interval. Nothing fixes a least length. I agree with the coordinator's reading: a kick reception strictly after the arrival does not block the theorem, conditional on its hypotheses at the event.

**The row jump, stated with one-sided factors (derived).** At a kick reception the source's position, the delay and the direction $\mathbf n$ agree on the two sides, and the source's velocity jumps by its kick $\Delta\mathbf V_j$. The factor is $D_-$ just before and $D_+=D_--\mathbf n\cdot\Delta\mathbf V_j$ just after, in order of emission time. With both positive, the row keeps its direction and its size changes by the ratio $D_-/D_+$, a relative jump of $\lvert\Delta D\rvert/D_+$, which is at most the kick's size over the factor. Away from a reception, an ordinary root of a separated partner gives a locally continuous row.

**What is measured and what is not.** Measured: the kick residual at the located crossing, which is the actual margin from a reception at the arrival. Not measured, and not claimed: when any later reception would occur. The linear figures in Section 4.2 extrapolate a path that the instrument did not compute and that, under the theorem, has no continuation of the stated class.

### 10.4 R7-04: duplicates, blind identities, and the manifest description

**Disposition: a new guard added; the original join is unchanged.**

- *Duplicates.* The original join put the replay results into a dictionary before testing for duplicates, so a duplicated run directory would have been collapsed silently, and its planted test exercised only the helper. The new script lists every run directory's identity from its own result file and tests that list before building any dictionary. Its planted case, three directories with one identity duplicated, goes through that same ingestion and is reported. On the real directory it finds 51 run directories and 51 distinct identities, the count the coordinator's reduction also found.
- *Blind preparations.* The blind reproduction's input file, `blind-release.json` of the 2026-10-06 session, holds three arrangements with their kick vectors. Each equals the replay's balance and kick exactly, in radius, angle, height, polarity, angular rate, axial velocity and every kick component: the first is the travelling three-member balance with seed 1 (record 1), the second the planar six-member with seed 1 (record 7), the third the three-dimensional seven-member with seed 1 (record 19). Each differs from the seed 2 and seed 3 kicks. The earlier identification by event time is replaced by this.
- *Optional work.* A separately written integrator for the other preparations, and the kick check on the 250 census arrivals, are outside this task's 24 selected measurements; Section 9 now says so.
- *Manifest description.* The original source manifest has 27 entries, of which two are this task's durable scripts; the kick-margin reducer is retained among the outputs. Section 8 is corrected.

### 10.5 Retention and what remains

Supplement owner `.local-data/master-equation-closure/serial-release-hypothesis-supplement-2026-10-11/`: the report as reviewed; `crossing-run3.json` (passing) with per-run rows and residuals; the two failed runs with their error streams; the script as it stood at each run; supervisor records for the three runs, each with a closed process group; closeout; `commands.txt`; `outputs.sha256` and `sources.sha256`. The sources manifest pins the three scripts, the retained join, the blind input file, the obstruction note, its adjudication, the coordinator's review and the original owner's two manifests. The original owner and the coordinator's `codex-review-1` folder are untouched.

**Remaining boundaries.** No hypothesis of Theorem U is established for the exact solution in any record. The measurements are on stored and interpolated float histories of one instrument, with one declared substitution. The scans are finite. No trajectory was continued and no further run was made.

**Rounding of stated bounds (R7-05, 2026-10-11).** After a further review comment, five descriptive bounds in this section and Section 9 were re-rounded so that each stated bound contains its measured value: the rigid row-sum agreement ($6\times10^{-9}$), the interpolant-minus-row-sum difference ($1.5\times10^{-4}$), the crossing-minus-linear-estimate difference ($4.9\times10^{-5}$), the base-to-half crossing difference ($0.00014$ of a period), and the smallest kick residual ($0.014556$, stated as at least $0.0145$). The first four were rounded the wrong way before; the last was mine to find, of the same kind. No measurement, script, output or manifest changed. The bytes reviewed before this change, SHA-256 `818eb21f7284504b6047627599c2a7d25445c35830997b5571b67368c535cc07`, are retained as `report-as-reviewed-818eb21f.md` in `.local-data/master-equation-closure/serial-release-hypothesis-supplement-2-2026-10-11/`.
