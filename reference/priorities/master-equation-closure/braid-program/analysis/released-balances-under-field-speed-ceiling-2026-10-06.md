# Released balances under the field-speed ceiling: the variant's first multi-member test

**The equation in this record is the field-speed ceiling variant, not the Master Equation.** It is an authorized research variation with the canonical equation retained as baseline. Nothing here adopts it.

## Result

Exact rigid balances of the unchanged Master Equation with every member below wake speed were released with a small velocity kick and followed under the [existing field-speed ceiling definition](../../equation-variants/field-speed-ceiling/definition.md#13-the-velocity-constraint-and-response-order). Under the unchanged equation almost all of these releases stop when a member arrives at wake speed, where that equation has no regular continuation. The ceiling definition does continue them: the member rides at wake speed while the rows push it forward. This record asks where they go next.

**They do not settle. Most end with two members of opposite polarity running into each other, an event the definition leaves unresolved; the rest disperse. No release stays bound.**

| Balances | Runs | End with two opposite members coming together | Disperse | Still together at 10 periods | Did not finish |
| --- | --- | --- | --- | --- | --- |
| 3 to 10 members, 36 balances, corrected instrument | 72 | 60 | 12 | 0 | 0 |
| 11 to 16 members, 50 balances, first instrument | 100 | 93 | 6 | 0 | 1 |
| All, 86 balances | 172 | 153 | 18 | 0 | 1 |

The census was stopped there for time. It covers every balance of 3 to 15 members and two of the ten with 16; the other 40 balances, of 16 to 20 members, were not run.

- **The ceiling does what it was written to do at the first event.** The first member reaches the ceiling at the same instant at which the unchanged equation's release stops, and then rides at exactly wake speed with its forward push removed. In all but two of the 172 runs at least one member reaches the ceiling; the median run has three or four members there at some time.
- **Contact follows quickly.** In the 60 contacts of the first row the two members are always of opposite polarity; in 48 both are at the ceiling and in 12 one is. The contact comes between $0.006$ and $0.82$ of a period after the first member reaches the ceiling, with a median of $0.18$. The separation is shrinking at about the wake speed when the run stops, with a median rate of $0.98$.
- **Dispersal is the only other ending.** Twelve runs of eight balances come apart, eleven of them after one or more members had ridden the ceiling. In five of them some members are still at the ceiling when the arrangement is 40 sizes across, and in the two runs of one seven-member travelling balance all seven are.
- **Net polarity makes no visible difference.** The seven balances of the first row with no net polarity give 11 contacts and 3 dispersals.

**What this means for the variation.** The ceiling removes the obstruction at wake speed and replaces it, in these histories, with the contact of two opposite members at the ceiling. The [definition](../../equation-variants/field-speed-ceiling/definition.md#current-scope-and-evidence-boundary) already records that the singular partner event is unresolved for a collinear pair; this test shows the same event is where most multi-member releases arrive. The ceiling alone is therefore not a closure for these histories: it moves the open question from the arrival at wake speed to the contact.

**Claim grade:** measured, by a float integrator at two settings; 167 of the 172 runs converged between settings by the rule below. Three releases were reproduced blind by a delegated checker with its own integrator, with the same endings and times that agree to about a hundred-thousandth of a period. Values use $K=c_f=c_a=1$.

## Approval and frozen specification

The operator approved this test on 2026-10-06. A list of numbered next actions began with "Decide D-OP-8 (run the released balances under the field-speed ceiling variant)", where ledger decision D-OP-8 asks whether the released balances may be run under the existing field-speed ceiling definition as that variation's first multi-member test. The operator replied "do 1 thru 4". The [variant index](../../equation-variants/README.md) records this reading and its limits. If the operator did not intend it, this record is unapproved evidence.

The specification was frozen before any target run and is the existing definition, Sections 1.2 to 1.4, with the ceiling at wake speed and the closed speed domain:

1. Ordinary partner rows at their original weight. For each other member $j$ and the positive delay $\tau$ with $\tau=\lvert\mathbf x_i(t)-\mathbf X_j(t-\tau)\rvert$, the row is $s_is_j\,\mathbf n/(\tau^2\lvert D_t\rvert)$ with $D_t=1-\mathbf n\cdot\mathbf V_j$.
2. Zero self acceleration. No row from a member's own path is admitted.
3. The regular response, applied after the rows are summed: the acceleration is the sum when the speed is below one, and the sum with its positive forward part removed when the speed is one. A member at the ceiling keeps its turning and may slow.

Nothing else was added: no event map, no contact rule, no smoothing, no strict-inequality domain, no ceiling above wake speed. Balances with a member above wake speed are outside the closed speed domain and were not run. Where the specification stops determining the motion the run stops and says why.

## Instrument and controls

`release_cap.py` integrates the delayed equation with a stored history and cubic Hermite interpolation. With every speed at most one the causal-root function is monotone in the delay, so each ordered pair has one root, found by a safeguarded Newton solve with a bracketing fallback. The response of clause 3 is applied inside each Runge–Kutta stage to members at the ceiling, and the velocity is projected onto the closed unit ball at the end of each step. Four step rules matter. The step shrinks with the smallest pair distance. A free member lands on the ceiling: a step that would carry it past wake speed by more than $10^{-9}$ is shortened until it does not. A transmitter factor below $0.3$ may change by at most a fifth per step. A member at the ceiling takes steps no longer than a fifth of the reciprocal of its summed row, because at the ceiling the velocity turns toward the summed row at that rate and a longer step is numerically unstable.

A run stops at the first of: two members closer than a thousandth of the size ("contact"); a pair more than 40 sizes apart ("dispersal"); 10 periods; a transmitter factor below $10^{-9}$; or a collapsed step. A run is called converged when settings of 1,200 and 2,400 base steps per period, with the distance and transmitter-factor tolerances halved, give the same ending, the same pair at a contact, and ending times within $0.02$ of a period.

**Two versions.** The first version lacked the landing rule and the last step rule. A delegated [blind reproduction](ceiling-releases-blind-reproduction-2026-10-06.md) showed that its endings and times were right but its last steps before a contact were not: it reported closing rates near $0.2$ and spurious departures from the ceiling where the true motion has a closing rate of $0.98$ and none. The corrected version reproduces the blind values. All balances of up to ten members were rerun with it; the two versions give the same ending in 71 of those 72 runs, with ending times within $0.0007$ of a period in those 71, and differ in one run that did not converge in either. The rows for 11 to 16 members above come from the first version and are used only for the kind of ending and its time.

| Control | Result |
| --- | --- |
| Ceiling never reached: the seven-member dispersal of the [release analysis](released-balances-and-nonrigid-search-2026-10-05.md#balances-entirely-below-wake-speed) | Dispersal at $2.6724$ periods; the unchanged-equation instruments give $2.6719$ and the blind reproduction there $2.67163$ |
| First arrival at the ceiling against the unchanged equation's arrival at wake speed, three-member balance | $0.45982$ periods in both |
| Exact solution of the variant: the [circular pair at wake speed](../../binary-research/manuscript.md#11-the-exact-circular-binary), radius $0.2021113735$, no kick | Held for five periods; deviation $2\times10^{-9}$ and $2.5\times10^{-10}$ of the radius after one period at the two settings, growing about thirteen-fold per period; transmitter factor $1.673612$ and removed forward part $4.509461$, both equal to their exact values |
| Blind reproduction of three releases, outcomes not disclosed | Same endings, pairs and ceiling members; contact at $0.8746851$ and $0.7251007$ periods against $0.874698$ and $0.725097$ here; dispersal at $6.78439$ against $6.7831$ and $6.785$; first arrival at the ceiling to seven digits; smallest transmitter factors $0.445596$ and $0.147270$ against $0.445597$ and $0.147272$; closing rates $0.97975$ and $0.97820$ against $0.97979$ and $0.97820$ |

One by-product of the third control: the variant's own exact circular pair is unstable in this instrument, and with a kick of size $10^{-4}$ it opens and disperses, 40 sizes apart at $9.149$ periods at both settings, with both members at $0.63$ of wake speed. The binary owner's record should be consulted before this is treated as new.

## What the runs show

**Up to the first event the two equations agree.** Zero self acceleration changes nothing while every member is below wake speed on a curved path, since no own-path root exists there. The release therefore follows the unchanged equation until a member's speed reaches one.

**At the ceiling.** The member's forward push is removed and its turning is kept, so it moves at exactly wake speed along a path that bends toward the summed row. Members leave the ceiling when the forward part turns negative; the median run has three separate intervals at the ceiling, one for each member involved. In the runs of up to ten members the time spent at the ceiling, summed over members, has a median of $0.40$ of the run's length.

**The contact.** The blind reproduction examined the approach closely. The two members are of opposite polarity and both at wake speed. Their velocities become antiparallel, each with a component of about $0.49$ toward the other, so the approach is an inward spiral and not head-on, and the separation shrinks at $0.93$ to $0.98$ of wake speed as the distance falls from a tenth to a thousandth of the size. The transmitter factors on the pair's rows stay near $0.88$, so the rows grow as the inverse square of the distance and not faster. Almost all of each summed row is forward and is removed; the part that remains turns the velocity. Nothing inside a thousandth of the size was integrated: that the members actually meet is inferred from the measured rate, about a ten-thousandth of a period further on, and was not tested. A later [contact study](ceiling-contact-two-hour-2026-10-06.md) continues one of these approaches, the three-member release called C1 in the blind reproduction, below this threshold and gives a conditional theorem for coincidence, which remains inferred and not proved.

**Small transmitter factors.** In several runs a transmitter factor passes within $10^{-8}$ of zero when a member at the ceiling points almost exactly at a receiver's later position. The two settings sample that narrow spike differently, and still agree on the ending and its time. This is expected: in emission time the row is regular, and the part of it delivered while the factor is below a small value shrinks with the square root of that value. An exact zero is a degenerate root in the definition's sense and would stop a run; none occurred.

**Dispersals.** The twelve dispersals of the first row last from $2.0$ to $6.8$ periods. One, the seven-member balance with its second kick, never reaches the ceiling and is the same history as under the unchanged equation. In the others members ride the ceiling and leave it, and the arrangement then comes apart with final speeds from $0.05$ to one. Where members are still at the ceiling at the end, their forward push has not yet turned negative; how long that lasts was not followed.

## Limits and falsifiers

- This is one variation under one frozen specification. It says nothing about a strict ceiling, a ceiling above wake speed, a contact rule, or the unchanged equation.
- The runs are float trajectories from two kicks per balance. Contact is a distance threshold and not a coincidence. The later [contact study](ceiling-contact-two-hour-2026-10-06.md) examines coincidence for one release and leaves it inferred and not proved. Five runs did not converge between settings, one of them because it did not finish.
- The balances of 11 to 16 members were run with the first version of the instrument, which is reliable for the ending and its time and not for the last steps before a contact. Forty balances of 16 to 20 members were not run.
- The blind checker and this session are instances of one model family; its code and method are independent and the cases, the specification and its reading are not.
- The start is a balance of the unchanged equation below wake speed. Balances that are exact under the ceiling itself, other than the circular pair used as a control, were not sought.

**Falsifiers.** A release under this specification that remains together and regular through ten periods; a contact between members of like polarity; a converged run in which the ceiling is reached and the release returns toward its balance; or an independent integrator that gives a different ending for one of the converged runs.

## Where the instruments are

`.local-data/master-equation-closure/geometry-session-20261006/ceiling/`: `release_cap.py`, `census_cap.py`, `cap_control.py`, `cap_final.py`, results `census-cap-v2.json` (corrected, up to ten members) and `census-cap.json` (first version, all sizes), and the blind checker's code under `independent/`.
