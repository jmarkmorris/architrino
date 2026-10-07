# Released balances: blind reproduction, 2026-10-06

This is the record of an independent checker that was given only the problem statement and the input file `.local-data/master-equation-closure/geometry-session-20261006/blind-release.json`. The checker was not told the expected outcomes, read no other file under `.local-data/master-equation-closure/`, and read no repository analysis of released balances. Every number below is graded measured, by the instrument described under Method, in units with wake speed $c_f=1$ and coupling $K=1$. Code and raw output are in `.local-data/master-equation-closure/geometry-session-20261006/independent-release/`; `summary.json` there collates the runs.

## Result

All three arrangements end by event (a): one member reaches wake speed long before six periods, with no close approach. Times are in units of the period $2\pi/w$. Member indices follow the listed order and start at 0. The initial speed is the speed on the rigid motion before the kick.

| Arrangement | Members | First event | Member index, polarity, initial speed | Event time in periods | Error estimate | Smallest transmitter factor on any row |
| --- | --- | --- | --- | --- | --- | --- |
| L1 | 3 | (a) speed reaches 1 | 2, polarity $-1$, speed 0.715769 | 0.4966362206 | $\pm 3\times10^{-10}$ | 0.633348 (receiver 0 from emitter 1, at the event) |
| L2 | 6 | (a) speed reaches 1 | 1, polarity $+1$, speed 0.971338 | 0.84760878 | $\pm 2\times10^{-8}$ | 0.500491 (receiver 4 from emitter 1, at the event) |
| L3 | 7 | (a) speed reaches 1 | 4, polarity $-1$, speed 0.882655 | 0.3210279812 | $\pm 2\times10^{-11}$ | 0.501329 (receiver 3 from emitter 4, at the event) |

The number of causal roots per pair stayed one throughout every run. This was measured by counting sign changes of $g(s)=t-s-\lvert x_i(t)-X_j(s)\rvert$ over the whole sampled past of each ordered pair, at every tenth accepted step of a dedicated run (246 counts for L1, 962 for L2, 399 for L3, each count covering all ordered pairs), and at coarser spacing in every other run; no count differed from one. The same conclusion is derived independently of the sampling: every stored speed stayed below 1 until the event, and $g'(s)=-D<0$ for an emitter below wake speed, so $g$ is strictly decreasing and has exactly one root.

At the event the smallest pair separation was 0.2895 in L1 (pair 1, 2), 2.2377 in L2 (pair 1, 4) and 0.6203 in L3 (pair 3, 4), against a close-approach threshold of $10^{-3}$ of the largest initial radius, so event (b) was not near. The member that reaches wake speed had departed from its rigid position by 0.147, 0.049 and 0.085 of the largest initial radius in L1, L2 and L3 respectively. In L2 the member's mirror partner (index 3, same initial speed) had slowed to 0.9588 at the event.

**Growth rate for L1 with the kick scaled by $10^{-4}$.** The departure from the rigid motion grows exponentially at $3.297\,w$ (rate 14.94 in the stated units, one e-fold per 0.048 period), fitted by least squares to the logarithm of the departure while the departure is between $10^{-6}$ and $10^{-4}$ of the largest initial radius; that window ran from 0.366 to 0.588 period. The fit gives $3.2970\,w$ for the root-sum-square departure over members and $3.2976\,w$ for the largest single-member departure. The rate is not yet constant across the window: fitted on four consecutive quarters of the window it is $3.288$, $3.297$, $3.2991$ and $3.2993$ in units of $w$, so the late-window value $3.2993\,w$ is the better estimate of the asymptotic rate and the window average understates it by about $0.002\,w$. Three step sizes of the main stepper agree on the window fit to $1\times10^{-6}\,w$, and the second stepper gives $3.29764\,w$ for the largest single-member departure at both of its tolerances.

Side observation, not requested: the full-kick traces of all three arrangements show the same kind of smooth exponential departure from the first tenth of a period onward, at roughly $3.25$ to $3.28\,w$ for L1, $1.57$ to $1.59\,w$ for L2 and $5.23\,w$ for L3 (fits of the largest single-member departure between $10^{-3}$ and $3\times10^{-2}$ of the largest initial radius; these windows are already weakly nonlinear and the values are rough).

Falsifier: a separately authored integration of the same statement that reports a different event type or member for any arrangement, or an event time outside the stated error, or an L1 rate outside $3.29$ to $3.30\,w$ in the stated window, would overturn this record. The raw per-run values to compare against are in `summary.json`.

## Method

**Equation as implemented.** Receiver $i$ at $x$ at time $t$ takes from each other member $j$ the row $s_i s_j\,(x-X_j(s))/(\tau^3\lvert D\rvert)$ with $\tau=t-s=\lvert x-X_j(s)\rvert$, $n=(x-X_j(s))/\tau$ and $D=1-n\cdot V_j(s)$, and the acceleration is the sum of rows over $j\ne i$. No member receives a row from its own path. The acceleration does not depend on the receiver's velocity.

**History.** For emission times at or before zero the emitter position and velocity are the analytic rigid motion with the pre-kick velocity. For emission times after zero they are read from the stored computed motion, whose first node at time zero carries the post-kick velocity.

**Main stepper (`release_check.py`).** Classic fourth-order Runge-Kutta on positions and velocities of all members. The step is $h=(2\pi/n)\,\theta$, where $n$ is the resolution parameter and $\theta$ is the smallest of $1/w$, speed over acceleration magnitude for each moving member, and pair separation over the sum of the two speeds for each pair, multiplied by the ratio of the current smallest transmitter factor to its initial value when that ratio is below one, and capped at a quarter of the smallest separation so that every emission time used inside a step lies before the step began. This gives about $1.6\,n$ steps per period for L1 and about $3.8\,n$ for L2 and $4.2\,n$ for L3.

**Interpolation of delayed quantities.** Positions and velocities of every member are stored at every accepted step. A delayed position is the cubic Hermite interpolant through the two bracketing nodes using their positions and velocities; a delayed velocity is the time derivative of that same cubic. Nothing is extrapolated: the step cap keeps emission times inside stored nodes.

**Delay solve.** For each ordered pair the emission time is the root of $g(s)=t-s-\lvert x-X_j(s)\rvert$, found by Newton iteration with $g'(s)=-D$, started from the previous stage's root advanced by the stage offset, and stopped when $\lvert g\rvert\le16\,\epsilon\,(\lvert t\rvert+\lvert s\rvert+\tau+1)$ with $\epsilon$ the double-precision rounding unit. A bracketed bisection is coded as a fallback and was never used in any run; the Newton iteration took 1.2 to 1.4 updates per acceleration evaluation on average.

**Velocity jump at time zero.** The kick makes each emitter's velocity discontinuous at emission time zero, so each receiver's acceleration jumps at the moment its emission time for that emitter crosses zero. The stepper places a step node on each such crossing: a trial step that carries an uncrossed pair's emission time past zero is shortened by a false-position search until that emission time is zero to within $10^{-10}/w$, the step is completed on the rigid branch, and the pair is then switched to the stored branch for all later evaluations. Crossings closer together than $10^{-9}/w$ are merged. The later, weaker discontinuities (in the derivative of acceleration, when an emission time crosses a time at which the emitter itself experienced a jump) are not placed on nodes.

**Event location.** After every step the event function, the larger of (largest speed minus 1) and (threshold minus smallest separation), is tested; when it is non-negative the step is repeated at fractional length by bisection (60 halvings) to the first time it vanishes, and the event type is whichever term is larger there.

**Error control.** There is no embedded local error estimate in the main stepper; error is controlled by repeating each run at resolution parameter $n=1000$, 2000, 3000, 4000, 8000 and 16000 and by a second stepper.

**Second stepper (`crosscheck_dop853.py`).** A separately written method-of-steps integration: SciPy's adaptive eighth-order DOP853 with relative tolerance $10^{-9}$, $10^{-11}$ and $10^{-13}$, run on segments shorter than 0.4 of the smallest separation; delayed positions and velocities are read from the DOP853 dense output of earlier segments (so velocity is interpolated directly, not differentiated); the branch is chosen by the sign of the emission time; no nodes are placed on the zero crossings; the event is located by a bracketing root-finder on the dense output. It shares with the main stepper only the reading of the equation and the author.

**Convergence of the event times.** Event time in periods at each setting:

| Setting | L1 | L2 | L3 |
| --- | --- | --- | --- |
| Main, $n=1000$ | 0.496636226016 | 0.847608782088 | 0.321027981189 |
| Main, $n=2000$ | 0.496636220872 | 0.847608781575 | 0.321027981194 |
| Main, $n=3000$ | 0.496636220707 | 0.847608781676 | 0.321027981198 |
| Main, $n=4000$ | 0.496636220658 | 0.847608781695 | 0.321027981199 |
| Main, $n=8000$ | 0.496636220624 | 0.847608781630 | 0.321027981199 |
| Main, $n=16000$ | 0.496636220646 | 0.847608781645 | 0.321027981203 |
| Second, tolerance $10^{-9}$ | 0.496636468816 | 0.847569078728 | 0.321027982314 |
| Second, tolerance $10^{-11}$ | 0.496636226133 | 0.847608830731 | 0.321027981035 |
| Second, tolerance $10^{-13}$ | 0.496636220636 | 0.847608767402 | 0.321027981194 |

The event type, the member and the smallest transmitter factor (to ten digits) are the same in all 27 runs. The quoted errors are the spread of the main stepper from $n=2000$ upward for L1 and L3, where the second stepper at its tightest tolerance falls inside that spread. For L2 the main stepper's spread from $n=2000$ upward is $1.2\times10^{-10}$, but the second stepper at its tightest tolerance still differs by $1.4\times10^{-8}$ and is visibly not yet converged (its successive changes are $4.0\times10^{-5}$ and $6.3\times10^{-8}$), so the quoted L2 error is the cross-stepper difference rather than the smaller internal spread.

## Controls

**Balance at time zero (known case, run before any target).** On the rigid history the total acceleration of each member was compared with $-w^2(x,y,0)$. The largest component residual, relative to the largest acceleration component, was $1.3\times10^{-15}$ for L1, $1.9\times10^{-15}$ for L2 and $6.9\times10^{-15}$ for L3 in the main stepper ($1.6\times10^{-15}$, $3.3\times10^{-15}$, $8.0\times10^{-15}$ in the second), which is rounding level. The smallest transmitter factor on the rigid motion is 0.633406, 0.513974 and 0.501428 respectively, and the rigid delays span 0.223 to 0.535, 1.90 to 6.74 and 0.533 to 1.91.

**Zero kick (known case, run before any target).** With the kick set to zero the same code, including the switch from the analytic past to the stored motion, was run for 0.6 period and the largest single-member departure from the rigid motion was recorded, relative to the largest initial radius:

| Arrangement | Setting | Departure at half a period | Largest departure up to 0.6 period |
| --- | --- | --- | --- |
| L1 | Main, $n=1000$ | $1.5\times10^{-8}$ | $1.2\times10^{-7}$ |
| L1 | Main, $n=2000$ | $1.4\times10^{-9}$ | $1.1\times10^{-8}$ |
| L1 | Main, $n=4000$ | $1.2\times10^{-10}$ | $9.2\times10^{-10}$ |
| L1 | Second, tolerance $10^{-11}$ | $1.0\times10^{-11}$ | $8.3\times10^{-11}$ |
| L2 | Main, $n=1000$ | $1.1\times10^{-11}$ | $2.1\times10^{-11}$ |
| L2 | Main, $n=2000$ | $3.9\times10^{-12}$ | $1.4\times10^{-11}$ |
| L2 | Main, $n=4000$ | $6.4\times10^{-13}$ | $1.8\times10^{-12}$ |
| L2 | Second, tolerance $10^{-11}$ | $2.1\times10^{-11}$ | $5.8\times10^{-11}$ |
| L3 | Main, $n=1000$ | $1.8\times10^{-11}$ | $4.3\times10^{-11}$ |
| L3 | Main, $n=2000$ | $3.7\times10^{-12}$ | $7.3\times10^{-11}$ |
| L3 | Main, $n=4000$ | $2.7\times10^{-12}$ | $7.1\times10^{-11}$ |
| L3 | Second, tolerance $10^{-11}$ | $3.0\times10^{-10}$ | $8.0\times10^{-9}$ |

The arrangement stays on its rigid motion to the accuracy of the method in every case. The L1 departure falls by a factor of about 11 per halving of the step, consistent with a fourth-order stepper whose delayed velocity is third-order accurate. The zero-kick departure is itself amplified by the same instability that the kicked runs show: in L1 it grows by a factor 7.9 between 0.5 and 0.6 period at every step size, which corresponds to $3.29\,w$ and agrees with the separately fitted growth rate. The L3 zero-kick departure stops improving at about $7\times10^{-11}$, which is the level expected from rounding-size seeds amplified at the L3 rate. Because the L2 event falls after 0.6 period, the L2 zero-kick run was repeated to 0.9 period: the largest departure was $3.7\times10^{-10}$ at $n=2000$ and $4.1\times10^{-11}$ at $n=4000$ (outputs in the `control_long` subdirectory). In every arrangement the zero-kick departure up to the event time is therefore at least six orders of magnitude below the kicked departure at the event.

**Root count.** Reported under Result.

## Limits

- The result is for the one listed kick per arrangement. Which member reaches wake speed and when depend on the kick's direction and size; only the L1 growth rate is a property of the arrangement rather than of the kick, and it was measured from one kick direction only.
- The integration stops at the first event. Nothing is claimed about the motion after a member reaches wake speed.
- The smallest transmitter factor is sampled at accepted step nodes and at the event point, not at intermediate stages. In all three arrangements the minimum falls at the event point, and the two steppers agree on it to ten digits.
- The causal-root count is a sampled sign-change count (4000 samples of the rigid past plus every stored node); the statement that it cannot have exceeded one between samples rests on the derived monotonicity of $g$ for emitters below wake speed.
- Only the first generation of kick-induced discontinuities is placed on step nodes in the main stepper, and none in the second. The step-size series shows no sign that the later generations matter at the quoted accuracy.
- "Size" in the L1 growth window was taken to be the largest initial radius, and the departure is the plain position difference from the unkicked rigid motion, which includes any drift along the rigid family (rotation about the axis, shift along it, shift in time) as well as the growing part. The quarter-window slopes show the growing part is not yet fully dominant early in the window.
- The two steppers were written by the same checker in one session. Their agreement tests time stepping, interpolation and delay solving against each other, not the reading of the equation; that reading is tested only by the rounding-level balance at time zero and by the zero-kick control.
- Double precision only; no extended-precision run was made.
