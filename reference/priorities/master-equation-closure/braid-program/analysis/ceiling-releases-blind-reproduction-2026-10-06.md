# Ceiling releases: blind reproduction of three kicked rigid configurations (2026-10-06)

The equation used throughout this record is the **field-speed ceiling variant** under the frozen specification approved for this test, not the Master Equation: ordinary partner rows $s_is_j\,\mathbf n/(\tau^2|D_t|)$ at the single positive causal delay per ordered pair, zero self acceleration, and the response of [Sections 1.2 to 1.4 of the variant definition](../../equation-variants/field-speed-ceiling/definition.md#12-the-ordinary-causal-root-ledger) applied after the rows are summed, with velocity kept in the closed unit ball by projection ($K=c_f=c_a=1$). Nothing was added to that specification: no smoothing, no softening of the inverse-square rows, no contact or collision rule, no event map, and no speed domain other than $\|\mathbf V\|\le 1$. This is an independent checker's record. The checker was given the three cases, the specification and one exact control, was not told the expected outcomes, and read no other code or result.

## Result

**Plain statement (measured; instrument: the checker's own delay integrator described under Method; domain: the three kicked cases of `blind-ceiling.json`, integrated from $t=0$ to the first listed ending).** Members are numbered from 0 in file order. Times are in periods $P=2\pi/w$ and distances in sizes.

- **C1 ends in contact** (ending a) at $t=0.874685\,P$: member 0 (polarity $+$) and member 2 (polarity $-$) come within $0.001$ sizes, both riding at the ceiling, their separation shrinking at $0.9797$.
- **C2 ends in separation** (ending b) at $t=6.7844\,P$: members 2 and 3 (both $-$) are $40$ sizes apart, no member is at the ceiling, and every pair distance is growing.
- **C3 ends in contact** (ending a) at $t=0.725101\,P$: member 0 ($+$) and member 3 ($-$) come within $0.001$ sizes, both riding at the ceiling, their separation shrinking at $0.9782$.

The kind of ending is the same at every resolution run (three for C2, four for C1 and C3). No run met ending (c) or (d): the delay solve converged on every row at every evaluation, the smallest transmitter factor was $0.147$, and no step size collapsed. The contact threshold is a stopping rule of the task; the equation was still determining the motion at the last node, and nothing beyond the threshold was integrated.

Case constants (derived from the case file): C1 has $P=1.282228$, size $0.196735$, polarities $(+,+,-)$, initial speeds $(0.7680,0.7680,0.8461)$; C2 has $P=20.40379$, size $2.742584$, polarities $(+,+,-,-)$, initial speeds $(0.3854,0.3854,0.8446,0.4372)$; C3 has $P=7.211083$, size $0.965500$, polarities $(+,+,-,-)$, initial speeds $(0.7082,0.7082,0.4460,0.8413)$.

Resolutions: base is a largest step of $P/2000$ with step-control constants $(c_d,c_a,\varepsilon_v,\text{landing tolerance})=(0.05,\,0.02,\,10^{-4},\,10^{-12})$; fine halves all five; finer and finest halve them again each time. The constants are defined under Method.

### C1

| Quantity | base | fine | finer | finest |
| --- | --- | --- | --- | --- |
| Ending and node time ($P$) | a, 0.8746852 | a, 0.8746852 | a, 0.8746852 | a, 0.8746851 |
| Threshold crossing, interpolated ($P$) | 0.8746851 | 0.8746851 | 0.8746851 | 0.8746851 |
| First member at speed 1 | member 2 ($-$) at 0.45982635 | 0.45982635 | 0.45982635 | 0.45982635 |
| Ceiling intervals | 2: member 2 from 0.45982635, member 0 from 0.78119419, both to the end | same | same | same |
| Contact pair | 0 ($+$) and 2 ($-$), both at the ceiling | same | same | same |
| Separation shrink rate at the end | 0.979755 | 0.979747 | 0.979747 | 0.979746 |
| Smallest pair distance (sizes) | 0.00099946 (final node) | 0.00099938 | 0.00099944 | 0.00099989 |
| Smallest $\lvert D_t\rvert$ on any row | 0.445596 (receiver 0, source 2, at $0.7735\,P$) | 0.445596 | 0.445596 | 0.445595 |
| Final speeds | (1, 0.862503, 1) | same | same | same |
| Largest overshoot removed at a ceiling entry | $5.0\times10^{-13}$ | $2.5\times10^{-13}$ | $1.2\times10^{-13}$ | $6.2\times10^{-14}$ |
| Largest speed defect renormalized while riding | $5.5\times10^{-10}$ | $1.3\times10^{-10}$ | $3.1\times10^{-11}$ | $7.9\times10^{-12}$ |
| Accepted steps | 4309 | 6523 | 10818 | 18152 |

### C2

| Quantity | base | fine | finer |
| --- | --- | --- | --- |
| Ending and node time ($P$) | b, 6.784390 | b, 6.784639 | b, 6.784514 |
| Threshold crossing, interpolated ($P$) | 6.784388 | 6.784393 | 6.784392 |
| Farthest pair at the end | 2 ($-$) and 3 ($-$) | same | same |
| First member at speed 1 | member 0 ($+$) at 1.88503289 | 1.88503289 | 1.88503289 |
| Ceiling intervals | 4, one per member | same | same |
| Member 0 ($+$) | 1.8850329 to 1.92603 | 1.8850329 to 1.92603 | 1.8850329 to 1.92603 |
| Member 2 ($-$) | 2.0722120 to 2.08456 | 2.0722120 to 2.08444 | 2.0722120 to 2.08444 |
| Member 1 ($+$) | 2.0814382 to 2.09906 | 2.0814382 to 2.09894 | 2.0814382 to 2.09894 |
| Member 3 ($-$) | 2.3772001 to 2.47520 | 2.3771995 to 2.47520 | 2.3771995 to 2.47507 |
| Final speeds, members 0 to 3 | 0.586888, 0.273392, 0.575547, 0.618432 | 0.586885, 0.273391, 0.575543, 0.618431 | 0.586887, 0.273392, 0.575545, 0.618432 |
| Smallest pair distance (sizes) | 0.446055 (members 1 and 2, at $2.0517\,P$) | 0.446055 | 0.446055 |
| Smallest $\lvert D_t\rvert$ on any row | 0.463973 (receiver 0, source 2, at $3.1994\,P$) | 0.463973 | 0.463973 |
| Largest overshoot removed at a ceiling entry | $5.7\times10^{-13}$ | $2.7\times10^{-13}$ | $2.1\times10^{-13}$ |
| Largest speed defect renormalized while riding | $8.9\times10^{-13}$ | $2.8\times10^{-14}$ | $8.9\times10^{-16}$ |
| Accepted steps | 13634 | 27152 | 54292 |

In C2 every member reaches speed 1 once and leaves the ceiling again; none is at the ceiling after $2.4752\,P$. At the end (finer run) the pair distances in sizes are $d_{01}=31.03$, $d_{02}=12.10$, $d_{03}=35.74$, $d_{12}=25.82$, $d_{13}=27.85$, $d_{23}=40.00$, and all six are increasing, at rates $0.779$, $0.153$, $0.907$, $0.704$, $0.829$, $0.998$ respectively. The closest pair at the end is 0 ($+$) and 2 ($-$), separating slowly.

### C3

| Quantity | base | fine | finer | finest |
| --- | --- | --- | --- | --- |
| Ending and node time ($P$) | a, 0.7251009 | a, 0.7251008 | a, 0.7251008 | a, 0.7251007 |
| Threshold crossing, interpolated ($P$) | 0.7251007 | 0.7251007 | 0.7251007 | 0.7251007 |
| First member at speed 1 | member 3 ($-$) at 0.45835105 | 0.45835105 | 0.45835105 | 0.45835105 |
| Ceiling intervals | 2: member 3 from 0.45835105, member 0 from 0.7130921, both to the end | same | same | same |
| Contact pair | 0 ($+$) and 3 ($-$), both at the ceiling | same | same | same |
| Separation shrink rate at the end | 0.978207 | 0.978203 | 0.978201 | 0.978199 |
| Smallest pair distance (sizes) | 0.00099853 (final node) | 0.00099895 | 0.00099901 | 0.00099997 |
| Smallest $\lvert D_t\rvert$ on any row | 0.147271 (receiver 0, source 3, at $0.7132\,P$) | 0.147270 | 0.147270 | 0.147270 |
| Final speeds, members 0 to 3 | 1, 0.770737, 0.847130, 1 | same | same | same |
| Largest overshoot removed at a ceiling entry | $5.0\times10^{-13}$ | $2.7\times10^{-13}$ | $1.2\times10^{-13}$ | $4.4\times10^{-14}$ |
| Largest speed defect renormalized while riding | $4.6\times10^{-10}$ | $1.0\times10^{-10}$ | $1.4\times10^{-11}$ | $1.0\times10^{-12}$ |
| Accepted steps | 3102 | 5109 | 8974 | 15384 |

### Resolution check

Halving the step and the tolerances changed no ending. The first arrival at speed 1 moved by less than $10^{-10}\,P$ in C1 and $3\times10^{-10}\,P$ in C3 across four resolutions, and by less than $5\times10^{-9}\,P$ in C2 across three. Node ending times differ by up to $10^{-7}\,P$ (C1, C3) and $2.5\times10^{-4}\,P$ (C2) only because the stopping test is made at step nodes; interpolated back to the exact threshold with the measured separation rate they agree to $10^{-7}\,P$ (C1, C3) and $5\times10^{-6}\,P$ (C2). Exit times from the ceiling in C2 are read at nodes and are resolved to one step ($5\times10^{-4}$, $2.5\times10^{-4}$, $1.25\times10^{-4}\,P$). Final speeds in C2 agree to $4\times10^{-6}$. Before any member reaches the ceiling, the fine and finer C3 trajectories differ by $1.3\times10^{-9}$ of their deviation from the rigid motion.

### How the contacts are approached

Measured on the saved fine and finer trajectories. In both contact cases the negative member reaches the ceiling first, the positive member of the eventual pair reaches it later ($0.781\,P$ in C1, $0.713\,P$ in C3), and from then on the two ride at speed 1 with their velocities turning antiparallel (cosine of the angle between them $-0.9999999$ or closer at $0.001$ sizes). Each velocity keeps a component of about $0.490$ toward the other member, that is about $61^\circ$ off the line joining them, so the pair closes on an inward spiral, not head-on. The shrink rate of the separation rises slowly as the distance falls: in C1 it is $0.9286$, $0.9658$, $0.9753$, $0.9788$, $0.9797$ at $0.1$, $0.03$, $0.01$, $0.003$, $0.001$ sizes; in C3 it is $0.5455$, $0.8904$, $0.9588$, $0.9740$, $0.9782$ at the same distances. Because the approach is oblique, the transmitter factors on the two rows of the pair do not approach zero: at the final node they are $0.884$ and $0.884$ in C1 and $0.887$ and $0.888$ in C3 (base runs, `final_rows.json`), with causal delays of about $0.00129$ sizes, and the smallest value in each run occurs earlier ($0.7735\,P$ in C1, $0.7132\,P$ in C3, on the row from the negative member to the positive one, just before the positive member reaches the ceiling). At the final node the summed rows on each member of the pair have magnitude $1.76\times10^{7}$ in C1 and $7.3\times10^{5}$ in C3, almost entirely forward and therefore removed by clause (3); the part that remains and turns the velocity has magnitude $8.8\times10^{3}$ and $1.8\times10^{3}$.

Inferred, not measured: at the measured rates the remaining $0.001$ sizes would be covered in about $1.6\times10^{-4}\,P$ (C1) and $1.4\times10^{-4}\,P$ (C3) if the rate held. Nothing inside the threshold was integrated, and whether the specification determines the motion all the way to coincidence was not tested. Falsifier: a run of the same specification with a smaller contact threshold in which the separation of the named pair stops shrinking.

### How the releases begin

Measured on the finer runs. The kick of order $10^{-5}$ grows roughly exponentially: the largest displacement from the unkicked rigid motion grows by a factor of about $3.2$ per $0.05\,P$ in C1 and C3 (reaching $0.10$ and $0.12$ sizes at $0.45\,P$), and by a factor of about $7$ per $0.4\,P$ in C2 (reaching $0.15$ sizes at $1.6\,P$). The first arrival at speed 1 follows once the displacement is a sizeable fraction of the configuration.

## Method

All code and raw output are in `.local-data/master-equation-closure/geometry-session-20261006/ceiling/independent/` (`ceiling_sim.py` is the integrator; `analyze.py`, `nokick.py`, `compare.py` and `final_rows.py` are the diagnostics; one JSON summary, log and saved trajectory per case and resolution). Python ran only under the shared venv. The case file `blind-ceiling.json` and the definition file named above were the only inputs.

**History.** For emission times $s\le 0$ a row reads the rigid rotation analytically, with the velocity of the rigid motion (the kick is not in it). For $s>0$ it reads stored nodes $(t,\mathbf X,\mathbf V)$ of the computed motion through cubic Hermite interpolation of position, the source velocity being the derivative of that interpolant; node 0 carries the kicked velocity.

**Delay solve.** For each ordered pair the root of $f(\tau)=\tau-\|\mathbf x_i(t)-\mathbf X_j(t-\tau)\|$ is found by Newton iteration with $f'=D_t$, safeguarded by a bracket that uses the monotonicity of $f$ (bisection whenever the Newton step leaves the bracket, expansion while no upper bound is known). Convergence is $|f|\le 10^{-14}\tau+5\times10^{-16}\,\max|\mathbf x|$. No solve failed to converge in any run. The row is then $s_is_j\,\mathbf n/(\tau^2|D_t|)$ with $\mathbf n$ and $D_t$ evaluated at the converged root; the receiver's own path contributes nothing.

**Time stepping.** Classical fourth-order Runge-Kutta on $(\mathbf X,\mathbf V)$. The step is the smallest of the largest step, $c_d$ times the smallest pair distance (which also keeps every delay longer than the step, so every row reads stored history only), and $c_a$ divided by the largest effective acceleration; a step is rejected and halved if the step times the change of effective acceleration across it exceeds $\varepsilon_v$. A transmitter factor is never clipped or floored; a run would stop with ending (d) on a non-finite row or a step below $10^{-13}\,P$, and none did.

**Clause (3) and the projection, exactly as implemented.** At the start of each step a member is labeled *at the ceiling* if its speed is at least $1-10^{-13}$ (after projection the stored speed is 1 to rounding; the margin is a rounding guard only), otherwise *below*. The label is held for the step. In every stage the rows are summed first into $\mathbf A^{\mathrm{ord}}$. For a member below the ceiling the stage acceleration is $\mathbf A^{\mathrm{ord}}$. For a member at the ceiling it is $\mathbf A^{\mathrm{ord}}-\max(\hat{\mathbf v}\cdot\mathbf A^{\mathrm{ord}},0)\,\hat{\mathbf v}$ with $\hat{\mathbf v}$ the unit vector of the stage velocity, so turning and backward slowing are kept and only a positive forward part is removed. At the end of the step the velocity is projected onto the closed unit ball: (i) for a member that was below the ceiling, if the new speed exceeds 1 the step is not accepted as it stands; the step length is reduced by a bracketed secant search until the new speed lies in $[1,1+\text{landing tolerance}]$, and that overshoot (at most $5.7\times10^{-13}$ in any run) is then removed by radial projection, after which the member is at the ceiling; (ii) for a member at the ceiling whose forward part of $\mathbf A^{\mathrm{ord}}$ was positive at all four stages, $\mathbf V+\int\mathbf A^{\mathrm{ord}}$ lies outside the ball and its projection lies on the unit sphere, so the new velocity is rescaled to speed exactly 1 (the size of this rescaling is the "speed defect" in the tables, at most $5.5\times10^{-10}$); (iii) otherwise the velocity is projected only if its speed exceeds 1. A member leaves the ceiling when the forward part of $\mathbf A^{\mathrm{ord}}$ turns negative: the same formula then removes nothing and the speed falls below 1. A ceiling interval is counted from the node at which a member's speed first is 1 to the first node at which it is below $1-10^{-13}$.

This is the pointwise response of Section 1.3 used inside a fourth-order step, with the projection of Section 1.4 applied at each step end. The constructive scheme of Section 1.4 taken literally, $\mathbf V_{k+1}=\Pi(\mathbf V_k+\int\mathbf A^{\mathrm{ord}})$ with no pointwise removal, was also coded as a switch and run on the control only; it is first-order accurate and converges to the same solution (see Controls).

**Step alignment with non-smooth instants.** Two kinds of instant make a row non-smooth in time: the reception of a source's $s=0$ emission (the kick makes the source velocity jump there) and the reception of the instant at which a source entered the ceiling (its acceleration jumps there). The integrator shortens the step so that a node falls on each such reception instant (tolerance $10^{-12}\,P$ in emission time), and a row switches from the rigid branch to the stored-node branch exactly at that node. This is a choice of step length only. A first pass without it gave the same endings, pairs and ceiling members, with times scattered by up to $8\times10^{-6}\,P$ (C1, C3) and $1.4\times10^{-3}\,P$ (C2 ending time) between resolutions; its output is kept under `independent/v1/` and an intermediate pass under `independent/v2/`.

**Endings and reported quantities.** Pair distances are tested at accepted nodes. The smallest $|D_t|$ is taken over all rows at the first stage of every accepted step. The shrink rate is $-(\mathbf x_a-\mathbf x_b)\cdot(\mathbf v_a-\mathbf v_b)/\|\mathbf x_a-\mathbf x_b\|$ at the final node.

## Controls

**Rigid motion at $t=0$ (requested check; measured).** With the rigid past, the summed rows at $t=0$ equal the centripetal acceleration $-w^2(x,y,0)$ with relative residual $(2.4,\,2.4,\,4.8)\times10^{-16}$ in C1, $(7.1,\,7.1,\,3.2,\,4.6)\times10^{-16}$ in C2 and $(8.4,\,8.4,\,2.8,\,0.3)\times10^{-15}$ in C3. All initial speeds are below 1 (largest $0.8461$). This tests the delay solve, the row formula and the sign convention against an independent statement in the task.

**Exact ceiling circle (known solution of this variant; measured).** Two members of opposite polarity, diametrically opposite, at speed exactly 1 on the circle $R=1/(4\cos D\,(1+\sin D))$ with $D=\cos D$ ($D=0.7390851$, $R=0.202112$, angular rate $1/R$, transmitter factor $1+\sin D=1.673612$), started with their exact circular past and no kick. At $t=0$ the summed row has forward part $4.5095$ (positive, removed by clause 3) and inward part equal to $1/R$ to 15 digits. Deviation of position from the exact circle, in units of $R$: at the base resolution $4.9\times10^{-11}$ after one period and $1.2\times10^{-9}$ after two; at the fine resolution $3.9\times10^{-13}$ after one period and $2.4\times10^{-12}$ after two. Radius deviations are $3.2\times10^{-11}$ and $4.9\times10^{-10}$ (base), $2.6\times10^{-13}$ and $8.4\times10^{-13}$ (fine). Speeds are 1 to rounding throughout and both members stay at the ceiling for the whole run. The literal first-order scheme of Section 1.4 on the same control deviates by $3.4\times10^{-2}R$ after one period at the base step and $1.7\times10^{-2}R$ at half that step (ratio $2.0$, first order), and by $0.56R$ and $0.29R$ after two periods; it converges toward the same circle, which supports reading the pointwise rule inside a higher-order step as the same law.

**Unkicked cases (measured).** Integrated without the kick, the three configurations stay on their rigid motion to $4.5\times10^{-11}$ sizes over $0.4\,P$ in C1 and C3 and $4.6\times10^{-9}$ sizes over $1.6\,P$ in C2 at the base resolution ($2.8\times10^{-12}$ and $9.8\times10^{-10}$ at fine). The kicked runs are displaced by $3\times10^{-2}$ to $1.5\times10^{-1}$ sizes at the same times, so the departures reported above come from the kick and not from integration error.

## Limits

- **Equation variant.** Every number here belongs to the field-speed ceiling variant under the frozen specification. It is not a statement about the Master Equation, whose velocity domain is unrestricted, and it does not carry into any other analysis.
- **Independence.** The checker is the same model family as the author who prepared the cases, so agreement with the author's results is not independent evidence in the strong sense. What is independent: the code (written from the task statement and Sections 1.2 to 1.4 only, without sight of any other code or result), the choice of numerical method, and the outcomes, which were not disclosed. What is not independent: the cases themselves, the frozen specification, the reading of that specification by a model of the same family, and the control solution, which was supplied by the task and not re-derived here beyond the $t=0$ balance.
- **What the control covers.** The circle control exercises riding at the ceiling with a positive forward part and a steady turn. It does not exercise entry to the ceiling, exit from it, or a close approach. Those parts rest on the resolution check and on agreement of the pointwise rule with the literal scheme on the control only.
- **Contact is a threshold, not a coincidence.** Ending (a) is the task's stopping rule at $0.001$ sizes. The runs show an oblique spiral approach with finite rows and transmitter factors near $0.88$ on the pair's rows at that threshold. They establish neither coincidence nor any continuation, and the specification supplies no rule for coincidence.
- **Sensitivity.** The configurations amplify small differences strongly before the first ceiling arrival. The times are reproducible to the figures given for these exact kicks; a different kick would give different times and possibly a different ending. No claim is made about kicks other than the three supplied.
- **Sampling.** Smallest distances and smallest $|D_t|$ are sampled at step nodes; exits from the ceiling are located only to one step.
- **Ambiguities in the specification and how they were resolved.** (1) The specification states both the pointwise response and the projection scheme; the pointwise rule was used inside the stages and the projection at step ends, and the literal scheme was checked on the control. (2) "Speed 1" was read as speed within $10^{-13}$ of 1 after projection. (3) A row whose emission time is exactly $0$ reads the rigid (unkicked) velocity; the step alignment makes the choice immaterial. (4) An interval still open when the run ends is counted as one interval. (5) Members are numbered from 0 in file order. (6) "Tolerances" were taken to be the four step-control constants listed above, all halved together with the largest step.

**Falsifiers.** The result would be overturned by an independently written integrator of the same specification that, for the same case file, gives a different kind of ending for any case, a different contact pair, a different first member at the ceiling, or times differing from those above by more than the stated resolution spread. Where to look: the JSON summaries and saved trajectories in the directory named under Method.
