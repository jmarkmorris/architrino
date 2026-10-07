# Released Pair: Blind Independent Reproduction (2026-10-06)

This record reports a blind check of two released cases, Q1 and Q2, of one two-member arrangement under the delayed acceleration law with wake speed $c_f=1$ and coupling $K=1$. The checker built its own integrator from the written statement of the equation and the task, read only the input file `blind-release-pair.json` and the repository policy file `AGENTS.md`, and was not told the expected outcomes. Every number below is graded **measured** with the instrument `relpair.py` described under Method, in double precision, unless a sentence says otherwise. Times are in periods $P=2\pi/w=3.019155441802719$ unless marked as time units; $R_0=0.7547888604506797$ is the larger radius.

## Result

Both cases start from the same rigid motion (member 0 at speed $\pi/2$, member 1 at speed $0.4900215$) and differ only in the velocity kick at time zero. Q1 ends by event (a) and Q2 by event (b); the two cases therefore end by different events. The quoted value is from resolution r3 and the quoted error is the largest difference between r3 and its two neighbours r2 and r4 (see Controls).

### Case Q1

| Quantity | Value | Error estimate |
| --- | --- | --- |
| Terminating event | (a) member 1 reaches speed 1 | same event at r1, r2, r3, r4 |
| Member | 1 | |
| Event time | $1.8442290677$ periods ($5.56801423$ time units) | $\pm 4\times10^{-10}$ periods |
| Smallest separation | $0.0033057650$ ($0.0043797215\,R_0$) | $\pm 2\times10^{-11}$ |
| Time of smallest separation | $1.84283035$ periods | $\pm 6\times10^{-9}$ periods |
| Largest speed of member 0 | $28.73275$ at $1.84281146$ periods | $\pm 4\times10^{-7}$ in speed |
| State at the event | member 0 speed $5.4139575$, separation $0.0312745$ ($0.041435\,R_0$) | |
| Number of root changes before the event | 1 (a birth, listed below) | same at every resolution |
| Smallest $\lvert D\rvert$ away from the birth | $0.502103$ on the row received by member 0 from member 1, at $1.843982$ periods | $\pm 2\times10^{-7}$ (node sampling) |
| Smallest $\lvert D\rvert$ per row away from the birth | $0.502103$ (0 from 1), $0.862407$ (0 from its own path), $0.868670$ (1 from 0, original root) | |
| Smallest delay on any row | $0.00245471$ time units (0 from 1, near the closest approach) | |

"Away from the birth" means all integration nodes farther than $10^{-4}$ periods from the birth instant; because the event follows the birth by only $9.6\times10^{-7}$ periods, this is the whole run before the birth. On the two newborn rows $\lvert D\rvert$ starts at zero at the birth and rises as the square root of the time since birth; the sampled values are $1.08\times10^{-3}$ at $10^{-11}$ time units after the birth, $0.037$ by $10^{-7}$ time units and $0.42$ by $10^{-6}$ time units.

### Case Q2

| Quantity | Value | Error estimate |
| --- | --- | --- |
| Terminating event | (b) member 0 falls to speed 1 | same event at r1, r2, r3, r4 |
| Member | 0 | |
| Event time | $2.98474059$ periods ($9.0113958$ time units) | $\pm 7\times10^{-8}$ periods |
| Smallest separation | $0.676652575684$ ($0.896479282\,R_0$), the starting separation | attained at $t=0$; the separation rate just after the kick is $+9.34\times10^{-5}$ and no later node is lower |
| Time of smallest separation | $0$ | |
| Largest speed of member 0 | $1.5708362379$ at $0.341127$ periods | $\pm 1\times10^{-10}$ in speed, $\pm 3\times10^{-7}$ periods in time |
| State at the event | separation $2.5910565$ ($3.43282\,R_0$), member 1 speed $0.4076358$, tangential acceleration of member 0 $-0.0212211$ | |
| Number of root changes before the event | 0 | same at every resolution |
| Smallest $\lvert D\rvert$ on any row | $0.655786$ on the row member 0 receives from its own path, reached at the event (still decreasing there) | $\pm 5\times10^{-7}$ |
| Smallest $\lvert D\rvert$ per row | $0.999949$ (0 from 1), $0.655786$ (0 from its own path), $0.999953$ (1 from 0) | |
| Smallest delay on any row | $0.51931747$ time units | |

### Root changes

- **Q1, one birth.** Time $1.8442281057\pm4\times10^{-10}$ periods ($5.56801132$ time units). Receiver member 1, source member 0. Count before 1, count after 3. Delay of the newborn pair at birth $0.0040860995$ time units ($1.353392\times10^{-3}$ periods), so the newborn roots were emitted at $1.84287471$ periods, which is $4.44\times10^{-5}$ periods after the closest approach. The surviving original root has delay $0.91554439$ time units ($0.303245$ periods) at that instant. The terminating event follows the birth by $9.61985\times10^{-7}$ periods ($2.90438\times10^{-6}$ time units); this interval is the same to six digits at all four resolutions.
- **Q1, all other receiver and source combinations.** No change before the event: member 0 receives exactly one row from member 1 and exactly one row from its own path throughout, and member 1 has no root on its own path.
- **Q2.** No change of any kind before the event: one row for member 0 from member 1, one row for member 0 from its own path, one row for member 1 from member 0, none for member 1 from its own path.

Reading of Q1, graded inferred from the measured sequence: the pair spirals inward, member 0 passes member 1 at separation $0.0033$ with speed $28.7$, and the wake emitted by member 0 just after that passage reaches member 1 as a newborn root pair with delay $0.0041$. Each newborn row scales as $1/(\tau^2\lvert D\rvert)\approx6\times10^{4}/\lvert D\rvert$, and member 1's speed, which was $0.506$ just before the birth, first dips to $0.486$ and then reaches 1 within $2.9\times10^{-6}$ time units. Reading of Q2, graded inferred: the pair separates, member 0 decelerates slowly along an outgoing path, and its speed crosses 1 at separation $3.43\,R_0$ with no singular row involved.

Falsifier for this record: an independently written integrator that finds a different terminating event, an event time outside the stated error, a root-count change in Q2, or any Q1 root-count change other than the single listed birth, would overturn the corresponding line. The raw outputs to compare against are the per-run `Q1_r*.json` and `Q2_r*.json` files in `.local-data/master-equation-closure/geometry-session-20261006/independent-release-pair/`.

## Method

**Equation as implemented.** Planar motion (the input has zero height, zero axial velocity and zero out-of-plane kick). For receiver $i$ at position $\mathbf x$ and time $t$, every delay $\tau>0$ with $g(\tau)=\tau-\lvert\mathbf x-\mathbf X_j(t-\tau)\rvert=0$ contributes the acceleration row $s_is_j(\mathbf x-\mathbf X_j)/(\tau^3\lvert D\rvert)$ with $D=1-\mathbf n\cdot\mathbf V_j(t-\tau)$ and $\mathbf n=(\mathbf x-\mathbf X_j)/\tau$. The instrument uses the identity $D=dg/d\tau$. Rows are summed over all roots from the other member and over all roots on the receiver's own past path with polarity product $+1$ and zero delay excluded. For $s\le0$ the source path is the analytic rigid circle; the kick is applied to the velocities at $t=0$ with continuous positions.

**Time stepping.** Dormand-Prince 5(4) with step-size control on all eight state components (tolerance relative to $1+\lvert y\rvert$) and a cap on the step. The path history for $s>0$ is a quintic Hermite interpolant through position, velocity and acceleration at the accepted nodes, and the velocity used in $D$ is the exact derivative of that interpolant, so $D$ is exactly $dg/d\tau$ of the interpolated path. Steps are limited to one quarter of the smallest root delay so that every emission time needed inside a step lies in stored history. Resolutions: r1 (step cap $8\times10^{-3}$, tolerance $10^{-9}$), r2 ($4\times10^{-3}$, $10^{-11}$), r3 ($2\times10^{-3}$, $10^{-12}$), r4 ($10^{-3}$, $10^{-13}$).

**Root finding at every derivative evaluation.** For the two source-0 combinations (member 0 from its own path, member 1 from member 0) the instrument scans $g$ and $D$ at every Runge-Kutta stage, not only once per step, over the whole delay range in which a root can exist: from a provable lower bound (separation divided by $1+1.3\,v_{\max}$ for the cross row, $10^{-6}$ for the own-path row) up to $\lvert\mathbf x_i\rvert+1.02\,\max\lvert\mathbf X_j\rvert+0.02$, beyond which $g>0$. The scan points are the union of a uniform grid (240 to 520 points), a geometric grid (110 points), and the delay of every stored integration node of the source in the window. The node points matter: the integrator's own steps shrink wherever the source path has fine time structure (down to $10^{-6}$ time units through the Q1 close passage), so the scan resolves that structure automatically. Every sign change of $g$ is bracketed and solved to rounding. Every sign change of $D$ is an extremum of $g$; it is solved to rounding and the value $e$ of $g$ there is compared with the neighbouring scan points, which exposes a pair of roots lying between two adjacent scan points. Member 1 stays below wake speed until the terminating event, so $D>0$ on every row it emits, $g$ is monotone, and the row member 0 receives from member 1 has exactly one root (solved by Newton iteration); for the same reason member 1 has no root on its own path. Both statements are also checked by the exhaustive census under Controls.

**Root births and merges.** At each accepted node the instrument holds, for every extremum of $g$, its delay, its value $e$, its exact time derivative $\dot e=-\mathbf n\cdot(\mathbf v_i(t)-\mathbf V_j(t-\tau_e))$ and the curvature $g''$. An extremum with $e\,g''>0$ carries no roots yet; if $-e/\dot e>0$ the step is cut to land short of the predicted crossing, the prediction is repeated (Newton iteration in time) until the remaining interval is below $10^{-10}$ time units, and the state is then advanced analytically across the birth to $10^{-11}$ time units after it. Across that interval the newborn rows are integrated in closed form using $\lvert D\rvert\propto\sqrt{t-t_b}$, which gives a velocity increment of twice the time since birth times the newborn acceleration at the landing point. After the birth the step restarts at $2\times10^{-12}$ and grows geometrically, limited to a fraction $q$ of $\lvert e/\dot e\rvert$ ($q=0.30,0.20,0.14,0.10$ for r1 to r4) and by the error control; the acceptance test carries a rounding allowance for the newborn rows. A merge is handled by the mirror procedure (geometric approach, closed-form crossing); no merge occurred in either case.

**How a missed root is excluded.** A step is accepted only if the number of roots of every combination is the same at the start node, at all six later stages and at the end node; any unpredicted change rejects the step and halves it, and a change that survives to a step of $10^{-13}$ stops the run with an error rather than continuing. A root pair can therefore escape only if both roots and two extrema of $g$ sit inside one scan cell at every evaluation, which cannot persist because the scan cells are no wider than the source's own integration steps. Independently of that argument, an exhaustive census with 400001 uniform delay points and no use of the integrator's root logic was run on 13 to 16 stored nodes of every run, for all four receiver and source combinations (see Controls).

**Derivative breaks.** The kick makes the source velocity discontinuous at emission time zero, so each row's acceleration jumps when its emission time crosses zero, and those instants in turn become higher-order breaks for later rows. The instrument lands a step exactly on every instant at which any row's emission time crosses a break of order 0, 1 or 2 of its source path (16 landings in Q1, 12 in Q2), and stores a node on each side so that the interpolant never straddles a break.

**Stop conditions.** Speeds and separation are tested on the stored interpolant in each accepted step and the crossing is solved to rounding. For event (b) the steps are cut to land on the predicted crossing and the event is declared when the excess of member 0's speed over 1 is below $10^{-7}$; the remaining interval (about $1.4\times10^{-6}$ time units) is closed by linear extrapolation. Smallest separation and largest speed are refined on the interpolant around the best node.

## Controls

**Control 1, balance and census at time zero.** The summed rows reproduce the centripetal acceleration $-w^2\mathbf X_j$ of the rigid motion with relative residual $2.7\times10^{-16}$ for member 0 and $3.7\times10^{-16}$ for member 1. Census: member 0 receives one row from member 1 (delay $0.5193269$) and one row from its own path (delay $1.5095777$, delay angle $w\tau/\pi=1.0000000000000000$); member 1 receives one row from member 0 (delay $0.9902508$) and none from its own path. $D=1$ on all three rows to $1\times10^{-16}$. The only extremum of $g$ at time zero is the minimum of the own-path function of member 0 at delay $0.8463662$ with value $-0.3177867$.

**Control 2, zero kick for two periods.** The largest distance of either member from the rigid motion over two periods is $2.9\times10^{-8}$ (r1), $9.5\times10^{-10}$ (r2), $3.7\times10^{-11}$ (r3) and $7.7\times10^{-10}$ (r4). The deviation grows exponentially at $0.853\,w$ to $0.856\,w$ in r1, r2 and r4, which matches the stated fastest growth rate of about $0.85\,w$; dividing by the two-period amplification $e^{0.854\cdot4\pi}\approx4.6\times10^{4}$ gives equivalent seeds of $6\times10^{-13}$, $2\times10^{-14}$, $8\times10^{-16}$ and $2\times10^{-14}$. r3 is at the rounding level; r4 is worse than r3 because its larger number of steps accumulates more rounding, so r3 is the reference resolution and r4 is used only as a bound. The root counts stayed at one, one, one and zero throughout.

**Control 3, convergence.**

| Resolution | Q1 event time (periods) | Q1 birth time (periods) | Q1 smallest separation | Q2 event time (periods) |
| --- | --- | --- | --- | --- |
| r1 | 1.844229063869 | 1.844228101884 | 0.00330576500969 | 2.984740700491 |
| r2 | 1.844229067295 | 1.844228105310 | 0.00330576500768 | 2.984740636704 |
| r3 | 1.844229067657 | 1.844228105672 | 0.00330576500769 | 2.984740589601 |
| r4 | 1.844229067771 | 1.844228105786 | 0.00330576502320 | 2.984740654759 |

Q1 converges monotonically (successive differences $3.4\times10^{-9}$, $3.6\times10^{-10}$, $1.1\times10^{-10}$ periods). Q2 does not converge below about $5\times10^{-8}$ periods: its values scatter by $\pm7\times10^{-8}$ around r3. The Q2 scatter is consistent with the zero-kick seeds, graded inferred: Q2 takes $1.14$ periods longer than Q1 to leave the rigid motion, so its kick excites the fastest-growing motion roughly $e^{0.854\cdot2\pi\cdot1.14}\approx450$ times more weakly, and the same absolute seed displaces its clock about 450 times more. The largest speed of member 0 in Q1 is $28.7327519194$ (r2), $28.7327519250$ (r3), $28.7327515722$ (r4).

**Additional control, exhaustive census.** On 13 to 16 stored nodes of each of the twelve runs (two cases and the zero-kick case at four resolutions), spread over the run and including nodes after the Q1 birth, a uniform 400001-point scan of $g$ for all four receiver and source combinations returned the same counts as the integrator in every instance, including 3 for member 1 from member 0 after the Q1 birth and 0 for member 1 from its own path.

**Additional control, width of the closed-form birth crossing.** Repeating Q1 at r2 with the crossing width set to $10^{-10}$, $10^{-11}$ (default) and $10^{-12}$ time units leaves the birth time unchanged to 13 digits and changes the birth-to-event interval by $3.5\times10^{-11}$ and $3.9\times10^{-12}$ periods, far below the quoted error.

**Additional control, sensitivity to break handling.** Two earlier passes of the same instrument are kept beside the final outputs. Without landing on derivative breaks the Q1 event time was $1.8442064$, $1.8442277$, $1.8442288$ (r1 to r3) and the Q2 event time $2.9841225$, $2.9847388$, $2.9847415$, $2.9847405$ (r1 to r4), that is, scattered at the $10^{-6}$ to $10^{-4}$ period level, with the same terminating events, the same single Q1 birth and the same birth-to-event interval. Landing on the breaks removed that scatter. These passes share code with the final one and are a sensitivity statement, not independent evidence.

## Limits

- Double precision only. The Q2 event time cannot be tightened below about $5\times10^{-8}$ periods with this instrument because rounding seeds are amplified by the instability before the pair separates; the quoted $\pm7\times10^{-8}$ is a spread, not a proven bound.
- The four resolutions share one code path, so their agreement tests step-size and tolerance convergence, not the correctness of the implemented rule. The independent references behind the instrument are the closed-form rigid balance (Control 1), the stated growth rate (Control 2), and the exhaustive census, which uses none of the integrator's root logic but does use its stored path.
- The integration stops at the first event. In Q1 the last accepted step overshoots member 1's speed to $1.018$ without including rows from member 1's own path (which would exist only above speed 1); the event time is solved inside that step from the interpolant. Nothing after either event is claimed.
- The birth instant makes member 1's velocity non-smooth (square-root onset). The instrument does not treat that instant as a derivative break for rows that later read member 1's path through it; in Q1 the run ends $2.9\times10^{-6}$ time units after the birth while every row sourced from member 1 has delay above $0.02$, so no row reads through it before the event.
- Breaks of order 3 and higher are left to the error control.
- The exclusion of missed roots rests on the scan argument and the sampled census, not on a proof; a root pair that is born and merges again entirely between two consecutive stage evaluations and inside one scan cell would not be seen. No extremum of $g$ other than the listed birth came within reach of zero in either run by the instrument's own extremum tracking.
- Planar motion only; out-of-plane perturbations are not excited by these kicks and their stability is not tested.
- All code and raw output are in `.local-data/master-equation-closure/geometry-session-20261006/independent-release-pair/`: `relpair.py` (instrument), `balance.json`, `Q1_r1..r4.json`, `Q2_r1..r4.json`, `Q1_r1..r4_k0.json` (zero kick), `Q1_r2_epsA.json` and `Q1_r2_epsB.json` (crossing-width variants), the matching `*_nodes.npy` node tables, `final_table_all.txt`, and the two earlier passes in `pass1_no_breakpoint_landing/` and `pass2_one_sided_break_nodes/`.
