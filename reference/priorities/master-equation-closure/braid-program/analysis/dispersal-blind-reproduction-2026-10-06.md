# Blind reproduction of two kicked seven-member trajectories (2026-10-06)

This record reports an independent-instrument reproduction of two delay-equation trajectories, cases D1 and D2 of one seven-member planar rigidly rotating arrangement, each started from the rigid motion with a small velocity kick at $t=0$. The checker was given the equation, the case file and the stopping rules, and was not told the expected outcomes. Units are $K=c_f=1$. Members are named by zero-based index in case-file order; polarities are $(+,+,+,+,-,-,-)$ for indices 0 to 6. The period is $P=2\pi/\omega=1088.1604$ time units and the size is the largest radius, $43.86298$.

## Result

**D1 ends by rule (a): member 6 (polarity $-1$) reaches speed 1 at $t=0.476761\,P$ ($t\approx 518.79$), while closing on member 1 (polarity $+1$) at a separation of 0.0311 sizes.** **D2 ends by rule (b): members 1 and 2 (both polarity $+1$) become 40 sizes apart at $t=2.67163\,P$ ($t\approx 2907.2$), with every member slower than 0.45 at that time, no member ever faster than 0.7022, and all 21 pair distances increasing.** Both statements are measured, the instrument being the checker's own delay-equation integrator described under Method; the kind of ending is the same at all six resolutions tried for each case. Neither case reaches rule (c), four periods.

The table gives each quantity at the base resolution and at the halved-step resolution of the front-resolved schedule (runs `e1` and `e2` under Method), followed by the largest spread across all six runs of that case.

| Quantity | D1 base | D1 halved | D1 spread (6 runs) | D2 base | D2 halved | D2 spread (6 runs) |
| --- | --- | --- | --- | --- | --- | --- |
| Ending rule | (a) | (a) | none | (b) | (b) | none |
| Event time, periods | 0.47676095 | 0.47676103 | $8.0\times10^{-7}$ | 2.67163024 | 2.67163008 | $2.5\times10^{-5}$ |
| Member(s) named by the rule | 6 reaches speed 1 | 6 | none | pair (1, 2) farthest | (1, 2) | none |
| Rate of increase of that member's speed at the event | 0.402934 | 0.402934 | $4.2\times10^{-5}$ | not applicable | not applicable | not applicable |
| Largest speed during the run | 1 (member 6, at the event) | same | none | 0.7022183 (member 3, at $0.464565\,P$) | 0.7022186 | $1.7\times10^{-5}$ |
| Smallest pair distance, sizes | 0.0311472 (pair 1, 6, at the event) | 0.0311472 | $1.9\times10^{-6}$ | 0.0748433 (pair 3, 6, at $0.462722\,P$) | 0.0748432 | $3.7\times10^{-6}$ |
| Smallest $\lvert D\rvert$ on any row | 0.507500 (at the event) | 0.507500 | $1.3\times10^{-5}$ | 0.377061 (near $0.4928\,P$) | 0.377061 | $2.6\times10^{-5}$ |
| All pair distances increasing at the end | no (six pairs closing) | no | none | yes (slowest pair 0, 2 at rate 0.0284) | yes | none |

Speeds of all members at the end, base and halved resolution:

| Member | Polarity | D1 base | D1 halved | D2 base | D2 halved |
| --- | --- | --- | --- | --- | --- |
| 0 | $+$ | 0.244260 | 0.244260 | 0.1929039 | 0.1929036 |
| 1 | $+$ | 0.379487 | 0.379487 | 0.4477541 | 0.4477541 |
| 2 | $+$ | 0.200812 | 0.200812 | 0.3206135 | 0.3206146 |
| 3 | $+$ | 0.362464 | 0.362464 | 0.1813983 | 0.1813993 |
| 4 | $-$ | 0.174508 | 0.174508 | 0.2261686 | 0.2261686 |
| 5 | $-$ | 0.080174 | 0.080174 | 0.0521904 | 0.0521902 |
| 6 | $-$ | 1.000000 | 1.000000 | 0.3492221 | 0.3492227 |

Further measured detail for D1. At the event the pair (1, 6) is 1.3662 length units apart and still closing at rate $-0.8265$; member 6 has acceleration magnitude 0.4631 and member 1 has speed 0.3795 with speed rising at rate 0.1503. The smallest pair distance and the smallest $\lvert D\rvert$ of the run both occur at the final instant, so they are values at the stopping time and not turning points. The largest pair distance at the event is 1.943 sizes, so the arrangement has not expanded. The motion leaves the plane only slightly: the largest $\lvert z\rvert$ is $4.6\times10^{-3}$ length units. The deviation from the rigid motion grows as $e^{\lambda t}$ with fitted $\lambda=0.02015$ per time unit (window $0.18\,P$ to $0.39\,P$, deviation between 0.03 and 3 length units), reaching 9.57 length units at $0.45\,P$.

Further measured detail for D2. The closest approach (pair 3, 6, opposite polarities, 3.2828 length units) and the largest speed (member 3, 0.70222) occur within $0.002\,P$ of each other near $0.463\,P$, after which the members separate. Per-member largest speeds during the run are 0.2533, 0.4895, 0.4938, 0.7022, 0.3323, 0.2034 and 0.5032 for members 0 to 6. At the event the closest pair is (2, 6) at 2.406 sizes, separating at rate 0.277; the next closest is (0, 2) at 7.64 sizes. Acceleration magnitudes at the event are between $5\times10^{-7}$ and $1.1\times10^{-4}$, and every member's speed is changing at a rate below $10^{-4}$ in magnitude. The largest $\lvert z\rvert$ is 0.075 length units. The fitted growth rate of the deviation before the change of character is $\lambda=0.01969$ per time unit.

Falsifier, in checkable terms. The D1 statement is overturned by any correct integration of the same case in which no member's speed reaches 1 before $0.48\,P$, or in which a member other than 6 reaches it first. The D2 statement is overturned by any correct integration in which some member's speed reaches 1 before a pair is 40 sizes apart, or in which the 40-size separation time differs from $2.6716\,P$ by more than about $10^{-3}\,P$. The raw runs are in `.local-data/master-equation-closure/geometry-session-20261006/independent-dispersal/` (repository-relative), files `D1_e1.json` to `D1_e3.json`, `D1_r1.json` to `D1_r3.json` and the matching `D2_*` files.

## Method

The instrument is `dde.py` in the directory named above, written for this check from the task statement alone. For each ordered pair (receiver $i$, source $j\neq i$) it solves the causal-root condition $\tau=\lvert x_i(t)-X_j(t-\tau)\rvert$ and adds the acceleration contribution $s_is_j\,n/(\tau^2\lvert D\rvert)$ with $n=(x_i(t)-X_j(t-\tau))/\tau$ and $D=1-n\cdot V_j(t-\tau)$. No mass, response factor, softening, root exclusion or other modification is used.

History. For emission times $s\le 0$ the source path is the analytic rigid rotation. For $s>0$ it is the stored computed path, interpolated on each accepted step by the quintic Hermite polynomial matching stored position, velocity and acceleration at both ends (one order above the cubic Hermite minimum the task required); the source velocity is the derivative of the same polynomial. The node at $t=0$ carries the kicked velocity, so no interpolation interval straddles the velocity jump.

Delay solve. The function $g(\tau)=\tau-\lvert x_i(t)-X_j(t-\tau)\rvert$ has slope $D>0$ while the source is slower than 1. The solve is a Newton iteration safeguarded by a maintained bracket, falling back to bisection (or bracket expansion) whenever the Newton step leaves the bracket or $D\le 0$, started from the previous root of the same pair, and stopped at $\lvert g\rvert\le10^{-13}(10+\tau)$. All 42 rows are solved together as arrays.

Time stepping. The Dormand-Prince 5(4) explicit pair advances positions and velocities, with the fifth-order solution propagated and the embedded difference used for step rejection. The step is capped by four limits: a hard maximum $h_{\max}$; a per-step speed-change bound $\delta v/\max\lvert a\rvert$; 0.45 of the smallest current delay, so every causal root lies at or before the last accepted node and the scheme stays explicit (a trial step in which a root falls later is rejected and halved, which never happened in the reported runs); and the remaining time to four periods. The stopping rules are tested after every accepted step; when rule (a) or (b) is first met inside a step, the step is retaken with its length adjusted by a bracketed secant-bisection iteration until the speed equals 1 or the pair distance equals 40 sizes to about $10^{-13}$, so the reported event state is an integrated node and not an interpolation.

Resolutions. The base resolution is $h_{\max}=0.5$, tolerance $10^{-10}$, $\delta v=0.02$; the halved resolution is $h_{\max}=0.25$, $10^{-11}$, $0.01$; the quarter resolution is $h_{\max}=0.125$, $10^{-12}$, $0.005$. Each was run in two step schedules. In the plain schedule (`r1`, `r2`, `r3`) those limits hold throughout. In the front-resolved schedule (`e1`, `e2`, `e3`) $h_{\max}$ is additionally multiplied by 0.02 for $t<120$, the interval in which each receiver first sees each source's kicked velocity. The reason is that the kick makes each row's acceleration jump (by a relative amount of order $10^{-6}$ of the member's acceleration) at the instant its causal root crosses emission time zero, between $t\approx19$ and $t\approx76$; a step straddling such a jump is only first-order accurate there, and the instability then amplifies that error. Smallest steps taken were about $5\times10^{-4}$ (near the D1 event and the D2 closest approach).

| Run | Event time, periods (D1) | Speed rate of member 6 (D1) | Event time, periods (D2) | Largest speed (D2) |
| --- | --- | --- | --- | --- |
| `r1` plain, base | 0.4767617521 | 0.4029761 | 2.6716105924 | 0.7022323 |
| `r2` plain, halved | 0.4767613624 | 0.4029367 | 2.6716352942 | 0.7022151 |
| `r3` plain, quarter | 0.4767610692 | 0.4029347 | 2.6716309544 | 0.7022185 |
| `e1` front-resolved, base | 0.4767609486 | 0.4029338 | 2.6716302373 | 0.7022183 |
| `e2` front-resolved, halved | 0.4767610342 | 0.4029337 | 2.6716300755 | 0.7022186 |
| `e3` front-resolved, quarter | 0.4767610575 | 0.4029344 | 2.6716301484 | 0.7022184 |

Halving the step changes the D1 event time by $3.9\times10^{-7}\,P$ (plain) or $8.6\times10^{-8}\,P$ (front-resolved), and a further halving by $2.9\times10^{-7}\,P$ or $2.3\times10^{-8}\,P$; the corresponding D2 changes are $2.5\times10^{-5}\,P$ then $4.3\times10^{-6}\,P$ (plain) and $1.6\times10^{-7}\,P$ then $7.3\times10^{-8}\,P$ (front-resolved). The plain schedule converges toward the front-resolved values, which supports the stated cause (inferred, not separately proved). The D2 final speeds change by at most $8\times10^{-5}$ between plain base and plain halved and by at most $1.1\times10^{-6}$ between front-resolved base and halved.

Extrema. Speeds, pair distances and $\lvert D\rvert$ are sampled at accepted nodes, and $\lvert D\rvert$ also at the internal stages of accepted steps. The D2 largest speed and smallest pair distance in the Result table were then refined between nodes with the stored quintic Hermite path (`analyze.py`); refinement moved them by at most $1.2\times10^{-5}$ (in speed, or in sizes) from the node values.

## Controls

Rigid-motion residual (requested check). At $t=0$ the largest component of the difference between the equation's acceleration on the rigid history and the centripetal acceleration $-\omega^2X_j$ is $2.7\times10^{-18}$, against a largest acceleration of $1.462\times10^{-3}$: a relative residual of $1.9\times10^{-15}$, which is rounding level. The same check at $t=-300$ and $t=-77.7$ gives $4.2\times10^{-18}$ and $2.5\times10^{-18}$. The rigid motion's largest speed is 0.25327, its delays run from 19.27 to 76.33, and its smallest $\lvert D\rvert$ is 0.8593.

Known case passed before the target runs. For an opposite-polarity pair on a common circle of radius 5 the delay and the acceleration have a closed form (one scalar root for the delay, then direct evaluation); solving the radial balance gives $\omega=0.0442148$, and the instrument's acceleration, delay and $D$ at $t=0$ agree with the closed form to $1.5\times10^{-16}$, $5\times10^{-14}$ and $0$ respectively (`known_case.py`, output in `known_case.out`). This tests the row evaluation and the root solve on the analytic history; it does not test the time stepper.

Zero-kick control over one period. With the kick set to zero the run reaches $t=P$ with no stopping rule met, and the largest deviation of any member from the rigid motion over the period is at $t=P$: $7.7\times10^{-6}$ length units at base resolution, $1.4\times10^{-5}$ at halved and $2.5\times10^{-5}$ at quarter resolution ($1.8\times10^{-7}$ to $5.8\times10^{-7}$ sizes). The deviation is about $5\times10^{-14}$ at $0.05\,P$, $10^{-10}$ to $3.6\times10^{-10}$ at the D1 event time $0.4768\,P$, and grows as $e^{\lambda t}$ with fitted $\lambda=0.0198$, $0.0199$ and $0.0196$ per time unit at the three resolutions: an e-folding time of about 50.5 time units ($0.046\,P$) and a factor of about $10^{9.3}$ per period. The seed is rounding error, not truncation error, which is why the deviation grows with the number of steps instead of shrinking; the growth is the arrangement's own instability. This rate matches the growth of the kicked runs' deviation (0.0202 for D1, 0.0197 for D2). At the time either case changes character the integrator's own amplified error is therefore about $10^{-10}$ length units against a kick-driven deviation of order 10.

A-posteriori defect audit (`defect.py`, `defect.out`). At step midpoints of the stored paths, the second derivative of the stored quintic Hermite path was compared with the equation's acceleration evaluated afresh on the stored history. Eight runs were audited (the six front-resolved runs and the two plain base runs), at 429 to 3729 midpoints per run, including the last 400 steps and the 300 steps of smallest pair distance. The median relative defect is $3\times10^{-12}$ to $4.3\times10^{-11}$. The largest relative defect in any run is $2.5\times10^{-6}$. In four runs (front-resolved halved and plain base, both cases) the largest defect, $4.9\times10^{-7}$ to $2.5\times10^{-6}$, lies at $t\approx24$ to $52$, where the kick fronts arrive, so it is the acceleration jump itself. In the four runs whose largest defect lies elsewhere (all near the change of character, $0.474\,P$ to $0.499\,P$) it is $5.8\times10^{-7}$ and $9\times10^{-8}$ at front-resolved base resolution and $1.2\times10^{-8}$ and $2\times10^{-9}$ at quarter resolution.

## Limits

Independence. The checker is the same model family as the author who prepared the cases, so agreement between this record and the author's outcome is not independent evidence in the strong sense. What is independent: the code (written from the task statement, with no other code or results under `.local-data` read and no other document under the master-equation-closure priority read), the choice of integrator, interpolation order, root solver, step control and event location, and the blindness to the expected outcomes. What is not independent: the model family and its habits of error; the equation and its sign and row conventions, which both sides took from the same statement; the case file, including the claim that it is a rigid solution (checked here only by the residual above); and the stopping rules. A shared misreading of the equation would not be exposed by this agreement.

Scope of the endings. Rule (a) stops D1 at the instant a speed equals 1; nothing is established about any continuation, and the smallest pair distance and smallest $\lvert D\rvert$ reported for D1 are stopping-time values of quantities still decreasing. Rule (b) stops D2 at a 40-size separation; all pair distances increasing at that instant, with small accelerations, does not by itself prove that no pair later returns, and no such claim is made. The pair (2, 6) is only 2.4 sizes apart at the D2 event.

Resolution and sensitivity. Convergence was checked by step refinement within one method, not by a second method. The two cases differ only in the kick, and they end differently; D2 passes a near approach (pair 3, 6 at 3.28 length units with a speed of 0.70) that D1's counterpart (pair 1, 6) does not survive below speed 1. The outcome class is therefore sensitive to the kick, and these two runs say nothing about other kicks, other kick amplitudes or the fraction of kicks giving either ending. The reported digits are those stable across the six runs per case; the event times are trusted to about $10^{-6}\,P$ for D1 and $10^{-5}\,P$ for D2 on that basis (inferred from the refinement spread).

Sampling. The smallest $\lvert D\rvert$ is taken over accepted nodes and internal stages, not over continuous time, and its spread across runs ($2.6\times10^{-5}$ for D2) reflects that sampling. One root per ordered pair was assumed and solved, which holds while every member is slower than 1; that condition held at every stored node of every run up to the stopping time.
