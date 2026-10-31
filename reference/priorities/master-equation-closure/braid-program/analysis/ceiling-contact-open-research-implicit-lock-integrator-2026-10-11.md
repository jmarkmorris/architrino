# An integrator that treats the lock implicitly, and release C1 followed to $3\times10^{-8}$ sizes (ceiling-contact open research, problem 3)

**The equation in this record is the field-speed ceiling variant, not the Master Equation.** It is an authorized research variation with the canonical equation retained as baseline; the frozen specification is the [existing definition](../../equation-variants/field-speed-ceiling/definition.md#12-the-ordinary-causal-root-ledger), Sections 1.2 to 1.4, with $K=c_f=c_a=1$, ordinary partner rows at their original weight, zero self acceleration and the inclusive response applied after summation. Nothing here adopts it, and nothing here selects a contact rule, event map, smoothing, softening or continuation: the run stops at a separation threshold and integrates nothing at or past coincidence.

This record closes obligation 3 of the [contact study](ceiling-contact-two-hour-2026-10-06.md#10-validation-files-remaining-obligations-and-review-status) under the [launch brief](ceiling-contact-open-research-launch-brief.md): build an integrator of the frozen specification that treats the lock implicitly, so that the region inside $10^{-4}$ sizes is refined by tolerance at a cost that does not grow as $1/r$; pass the exact ceiling circular pair and reproduce the stored approach between $10^{-2}$ and $10^{-4}$ sizes before any new target use. Sizes are $0.196735$; $P=1.282228$.

## 1. Result

**The instrument exists, passed both required known cases in order, and costs ninety steps per decade of separation at every depth (measured).** A three-stage implicit collocation scheme of order five steps the direction equation at the ceiling implicitly, with the step a fixed fraction of the pair's delayed range. From $10^{-2}$ to $10^{-7}$ sizes the accepted steps per decade were $91$, $90$, $90$, $89$, $90$, with no rejected step and no failed iteration, about a hundred seconds of wall time per decade on this machine. The study's explicit integrators cost, at $10^{-4}$ sizes, about $176{,}000$ steps per further factor of two (subject) or were held at their stability limit without resolving the lock (blind reference); at $10^{-7}$ sizes the implicit step is about a million times the reciprocal of the lock's relaxation rate.

**C1 follows the spiral, with the lock resolved, down to $5\times10^{-7}$ sizes, and with the slow quantities resolved down to $3\times10^{-8}$ sizes (measured).** This is two to three decades below the study's deepest stored node ($10^{-5}$ sizes, lock unresolved) and three and a half decades below its deepest resolved lock ($10^{-4}$ sizes). The separation and both delayed ranges decrease at every one of the 497 nodes. The pointing error over delayed range is $1.98631$ at every level from $5.6\times10^{-6}$ to $5.5\times10^{-7}$ sizes, against the closed-form $1.986309$; the turning rate times separation is $1.74334$ against $1.743336$; the delay ratio, transmitter factor and closing rate differ from the spiral's values by amounts proportional to the separation over five and a half decades, reaching $1.290061$, $0.883193$ and $0.9801944$ (spiral: $1.290061$, $0.883193$, $0.9801944$). Every hypothesis of the study's Theorem B continues to hold with margin: pointing error below $1.99\tau$ against the bound $3\tau$, delay ratio at most $1.290061$ against any constant from $1.29$ to $1.95$. The inferred coincidence instant settles to $t^\ast=0.874841659374\,P$ and is unchanged in its last digit from $3\times10^{-6}$ sizes inward.

**Refinement (measured).** Halving and doubling the step ($0.01$, $0.02$, $0.04$ of the delayed range, each with its own circular-pair control) changes the slow quantities inside $10^{-4}$ sizes by at most $1.5\times10^{-7}$, the pointing error over delayed range by at most $4\times10^{-6}$, and the inferred coincidence instant by $4\times10^{-13}\,P$. The stopping distance was varied separately: the run to $10^{-4}$ sizes and the run to $3\times10^{-8}$ sizes share their first 181 nodes exactly.

**Where it stops, and why (measured, with a derived cause).** Below about $3\times10^{-7}$ sizes the pointing error is no longer resolved to five digits ($1.9862$, $1.9868$, $1.9870$, $1.9885$, $1.9795$ at the last five levels), and at $2.6\times10^{-8}$ sizes the stage iteration no longer converges to the tolerance. The cause is arithmetic and not the scheme: the response subtracts the forward part of the summed row, of size $1/(\tau^2(1-b))$, from the row itself to leave a turning part of size $1.74/r$, a cancellation whose relative size is proportional to the separation; in double precision, with positions already recentred on the meeting point, the turning part loses digits in proportion to $1/r$ and has about eight left at $10^{-7}$ sizes and fewer than the tolerance asks for at $3\times10^{-8}$. Going deeper needs the turning part evaluated without that subtraction, or extended precision; it does not need a different method. This is a limit of the instrument and not an ending of the motion.

**What this changes in the study's claims.** The study's measured statement "C1 follows the spiral to $10^{-5}$ sizes" is extended to $3\times10^{-8}$ sizes for the slow quantities and its resolved-lock statement from $10^{-4}$ to $5\times10^{-7}$ sizes, by an instrument that is not stability-limited. The inference that C1 reaches coincidence remains an inference: the [delay-ratio record](ceiling-contact-open-research-delay-ratio-bound-2026-10-11.md) proves the missing contraction in the planar symmetric pursuit limit and names what a proof for C1 still needs.

## 2. The instrument

`ccor_implicit.py`, in `.local-data/master-equation-closure/ceiling-contact-open-research-20261011/`, numpy only. It shares no code with either frozen integrator.

**Right side.** Exactly the three frozen clauses: for each ordered pair the positive causal root, found by bisection and Newton polish on the stored history; rows $s_is_j\mathbf n/(\tau^2\lvert D_t\rvert)$ summed; for a member riding the ceiling the positive forward part removed, $\mathbf A-(\mathbf u\cdot\mathbf A)_+\mathbf u$ with $\mathbf u$ the unit velocity; no self row. At the end of each accepted step a riding member's velocity is rescaled to unit length (the projection of Section 1.4 of the definition), and a riding member whose forward part turned negative would be released; none did.

**Scheme.** Three-stage Radau IIA collocation, order five and stiffly accurate, on the positions and velocities of all three members. The stage equations are solved by Newton iteration with a finite-difference Jacobian evaluated at each predicted stage (step $10^{-6}$ of the pair separation in position and $10^{-6}$ in velocity), in variables scaled by the pair separation for positions. The starting guess places each riding member's stage velocity along the ordinary acceleration at the stage, with stage positions made consistent by four sweeps of the collocation formula. The step is $0.02$ of the pair's delayed range (and at most $0.2$ of the smallest delayed range of any row), so every stage reads stored history only; an error estimate by step doubling at relative tolerance $10^{-8}$, scaled by the pair separation for positions, guards each step and never rejected one.

**History.** Emission times after the restart read the integrator's own nodes through quintic Hermite interpolation (positions, velocities and accelerations at both ends); earlier emission times read the stored trajectory the run restarts from, through its cubic Hermite interpolant, and before $t=0$ the exact rigid rotation of the case. Positions are recentred on a fixed point near the meeting point and times are measured from the restart, so that rounding is relative to the current separation and not to the size of the configuration.

**Three design points were forced by controls and are recorded because they were defects first.** (i) With cubic Hermite interpolation of the integrator's own nodes the circular-pair control failed (deviation $1.2\times10^{-4}R$): at steps of a few hundredths of the delay the interpolated emission velocity was not accurate enough; the quintic interpolant passes at $5\times10^{-12}R$. (ii) A Jacobian frozen at the start of the step, the usual economy, made the stage iteration diverge once the step exceeded about a thirtieth of the delay, because the lock turns the stiff direction over the step; the first version therefore crawled, with hundreds of rejected steps, and stalled near $1.3\times10^{-6}$ sizes. Jacobians at the predicted stages converge in three iterations at steps up to a fifth of the delay. (iii) The convergence test first compared the correction with a thousandth of the tolerance scale, below the rounding floor of the forward-part cancellation at depth; it now accepts a correction below a twentieth of the tolerance scale, or an iteration that has stagnated below half of it, and counts the latter (zero such acceptances in any run that stops at $10^{-4}$ or $10^{-5}$ sizes; 222 in the deep run, which are therefore all inside $10^{-5}$ sizes). Each version passed the two known cases before its own deeper run; the results reported are from the final version only.

## 3. Known cases, in the order run

**K1, exact ceiling circular pair for one period** (radius $R=0.2021113735$, $D=\cos D$; the receipt is asserted by the driver before any restart):

| Step / delayed range | Steps | Position deviation after one period | Forward part at start | Inward part times $R$ | Smallest transmitter factor | Result |
| --- | --- | --- | --- | --- | --- | --- |
| $0.02$ | 213 | $2.8\times10^{-11}R$ | $4.50946078$ | $1$ to $3\times10^{-16}$ | $1.6736120292$ (exact $1.6736120292$) | pass |
| $0.04$ | 107 | $9.1\times10^{-10}R$ | same | same | $1.6736120290$ | pass |
| $0.01$ | 426 | $6.0\times10^{-11}R$ | same | same | same to ten digits | pass |

The deviation at the default step is of the size of the frozen blind reference's ($4.9\times10^{-11}R$ at its base setting). No step was rejected and no iteration failed.

**K2, the stored approach between $10^{-2}$ and $10^{-4}$ sizes.** Restart from the frozen finest blind-reference trajectory `C1-finest-traj.npz` at its node 16000 ($r=9.9886\times10^{-3}$ sizes, $t=0.87327458\,P$; members 0 and 2 riding, member 1 not), run to $10^{-4}$ sizes: 181 steps, none rejected, no failed iteration, 176 seconds. Its ladder was compared with the study's four stored ladders (blind reference at base and fine, subject at coarse and fine) by `ccor_implicit_k2.py`, which interpolates each stored ladder linearly in $r$ to the new levels, since the deviations from the spiral are proportional to $r$:

| Stored ladder | Levels | Largest difference: closing rate | delay ratio | transmitter factor | pointing error over delayed range |
| --- | --- | --- | --- | --- | --- |
| blind reference, base | 8 | $1.1\times10^{-5}$ | $1.5\times10^{-6}$ | $1.8\times10^{-5}$ | $0.115$ (that run does not resolve it) |
| blind reference, fine | 8 | $1.0\times10^{-5}$ | $1.5\times10^{-6}$ | $2.0\times10^{-5}$ | $0.024$ (not resolved) |
| subject, coarse | 7 | $7.4\times10^{-6}$ | $1.5\times10^{-6}$ | $2.0\times10^{-5}$ | $2.0\times10^{-5}$ |
| subject, fine | 5 | $7.4\times10^{-6}$ | $1.5\times10^{-6}$ | $2.0\times10^{-5}$ | $2.0\times10^{-5}$ |

Tolerances asserted: $3\times10^{-5}$ in the three slow quantities against all four, and $2\times10^{-3}$ in the pointing error against the two subject ladders, which resolve it. All pass. The residual $2\times10^{-5}$ in the transmitter factor is the interpolation between quarter-decade levels near $10^{-2}$ sizes, where the dependence on $r$ is not yet linear; inside $10^{-3}$ sizes the differences are below $10^{-6}$.

## 4. The target run

Same restart, stopping at $3\times10^{-8}$ sizes: 497 steps, none rejected, no failed iteration, 520 seconds, 106,777 evaluations of the right side (about 215 per step, most of them in the finite-difference Jacobians).

| $r$ (sizes) | $-\dot r$ | $\tau_0/r$ | $1-b_0$ | $\sin\psi_0/\tau_0$ | turning rate $\times r$ | $(\tau_0/r)$ minus spiral value | inferred $t^\ast$ ($P$) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| $9.80\times10^{-4}$ | $0.9797532$ | $1.289337$ | $0.883976$ | $1.98802$ | $1.74380$ | $-7.2\times10^{-4}$ | $0.874841623649$ |
| $9.78\times10^{-5}$ | $0.9801520$ | $1.289985$ | $0.883274$ | $1.98641$ | $1.74338$ | $-7.6\times10^{-5}$ | $0.874841659023$ |
| $9.75\times10^{-6}$ | $0.9801901$ | $1.290053$ | $0.883201$ | $1.98632$ | $1.74334$ | $-7.6\times10^{-6}$ | $0.874841659371$ |
| $9.98\times10^{-7}$ | $0.9801939$ | $1.290060$ | $0.883194$ | $1.98631$ | $1.74333$ | $-7.8\times10^{-7}$ | $0.874841659374$ |
| $5.54\times10^{-7}$ | $0.9801941$ | $1.290060$ | $0.883194$ | $1.98631$ | $1.74334$ | $-4.3\times10^{-7}$ | $0.874841659374$ |
| $9.95\times10^{-8}$ | $0.9801943$ | $1.290061$ | $0.883193$ | $1.98698$ | $1.74392$ | $-7.8\times10^{-8}$ | $0.874841659374$ |
| $3.14\times10^{-8}$ | $0.9801944$ | $1.290061$ | $0.883191$ | $1.97954$ | $1.73740$ | $-2.5\times10^{-8}$ | $0.874841659374$ |
| spiral | $0.9801944$ | $1.290061$ | $0.883193$ | $1.986309$ | $1.743336$ | | |

The two arms agree to the digits shown at every level from $10^{-4}$ sizes inward. The difference of the delay ratio from its spiral value is $-0.78$ times the separation in sizes over five decades, the linear law the study measured over three; the same holds for the transmitter factor ($+0.83$) and the closing rate ($-0.43$). The inferred coincidence instant, the crossing time plus $r/0.980194$, is $0.874841659374\,P$, against the study's $0.874841659356\,P$ from the blind reference continued to $10^{-5}$ sizes; the two share the outer history up to $10^{-2}$ sizes, so their agreement to $2\times10^{-11}\,P$ is a statement about the inner approach only. The smallest transmitter factor on any row during the run is $0.8197$ (a row involving member 1); the pair's own factors lie between $0.8832$ and $0.8887$.

**Cost per decade.** Accepted steps in the decades $10^{-2}$–$10^{-3}$, …, $10^{-6}$–$10^{-7}$: $91$, $90$, $90$, $89$, $90$; the step is $0.0265$ of the separation throughout. The cost per decade is constant because the scheme's step is tied to the delayed range and not to the lock's relaxation time.

## 4a. Correction and continuation, 2026-10-20

**Correction: the stated cause of the depth limit was wrong in size, and the pointing error's drift had a different cause (measured).** Section 1 attributed the loss of resolution below about $3\times10^{-7}$ sizes to the response's subtraction of the forward part of the summed row. That subtraction does lose digits, but by the record's own estimate it leaves a relative error of about $2\times10^{-9}$ in the turning part at $10^{-7}$ sizes, while the observed drift of the pointing error there was $3\times10^{-4}$. The cause of the drift is the size of the time variable. The run measured time from the restart, so time was about $2\times10^{-3}$ while the delayed range was about $10^{-8}$. Each emission time $t-\tau$ is then quantized at about $4\times10^{-19}$, which moves the direction to the image by about $3\times10^{-11}$ radians against a pointing error of $1.5\times10^{-8}$ radians. A rebasing version of the instrument (below) moves the time origin to the current node and the space origin to the pair's midpoint whenever the separation has fallen fourfold. Over the range where the first instrument drifted, it resolves the pointing error at the closed-form value:

| $r$ (sizes) | $\sin\psi_0/\tau_0$, first instrument | the same, rebased |
| --- | --- | --- |
| $3.15\times10^{-7}$ | $1.98623$ | $1.986310$ |
| $1.75\times10^{-7}$ | $1.98675$ | $1.986310$ |
| $1.00\times10^{-7}$ | $1.98698$ | $1.986309$ |
| $5.6\times10^{-8}$ | $1.98845$ | $1.986309$ |
| $3.15\times10^{-8}$ | $1.97954$ | $1.986309$ |
| spiral, closed form | $1.986309$ | |

The statements in Section 1 and Section 4 that the lock is resolved only to $5\times10^{-7}$ sizes, and that the limit is the forward-part cancellation, are superseded by this subsection. The lock is resolved to $3.2\times10^{-8}$ sizes. The slow quantities in the table of Section 4 are unaffected, and so is the inferred coincidence instant, $0.874841659374\,P$, which both instruments give.

**The depth limit itself remains, and its cause is not identified (measured; one hypothesis refuted).** Both the first instrument and the rebasing one stop advancing near $2.6\times10^{-8}$ sizes. From about $2\times10^{-7}$ sizes inward the stage iteration stagnates at about half its tolerance and then fails, and the step collapses. I tested one hypothesis. The finite-difference Jacobian's relative error, about $10^{-6}$ with forward differences, times the step's stiffness, about $0.023/\tau$, passes one near $\tau\sim2\times10^{-8}$. A run with central differences, whose Jacobian error is about $10^{-10}$, began failing at $1.75\times10^{-7}$ sizes and stopped at $3.2\times10^{-8}$ sizes, exactly as the forward-difference run did. The hypothesis is therefore refuted. A stagnation along each riding member's direction of motion, which the renormalization to unit speed makes irrelevant, was found and removed by measuring that member's velocity error across its direction of motion only. The remaining stagnation is across the direction of motion. Candidates not yet tested: rounding in the response at depth, and the smoothness of the instrument's own quintic interpolation at its nodes.

**Instrument and known cases, in order (2026-10-20).** `ccor_implicit2.py` imports the first instrument unchanged and adds four things:
- *Rebasing:* time and space are rebased as described above.
- *Velocity tolerance:* $10^{-4}$ times twice the pair's delayed range, so that the pointing error itself is controlled to relative $10^{-4}$, with a floor of $64$ units in the last place.
- *Transverse velocity errors:* a riding member's velocity error is measured across its direction of motion only.
- *Jacobian option:* a choice of forward or central differences.

Its known cases ran in this order:
- *K1:* the exact ceiling circular pair for one period with a rebase forced every 40 steps. Five rebases; deviation $1.16\times10^{-9}R$, against the first instrument's $2.8\times10^{-11}R$, because the velocity tolerance scales with the delayed range, which is large on the circle.
- *K2:* restart from the frozen finest blind-reference trajectory at $10^{-2}$ sizes, ladder compared with the study's four stored ladders from $10^{-2}$ to $10^{-4}$ sizes. Largest differences $1.1\times10^{-5}$ in the closing rate, $1.5\times10^{-6}$ in the delay ratio and $2.0\times10^{-5}$ in the transmitter factor; $2.0\times10^{-5}$ in the pointing error against the two subject ladders.
- *K3:* agreement with the first instrument from $10^{-4}$ to $5\times10^{-7}$ sizes, where that one resolved the lock. Largest differences $1.0\times10^{-11}$ in the delay ratio, $1.4\times10^{-9}$ in the transmitter factor and $5.5\times10^{-6}$ in the pointing error.

All passed, for both Jacobian settings. One earlier attempt at K2 and K3 failed by stagnation along the direction of motion; that failure led to the transverse measure, and its log is kept as `ccor-implicit2-k2-k3-attempt-forward-noise.log`.

**Deep runs (measured).** Forward differences: 1,180 steps, 384 rejected, 2,368 stage solves accepted at their rounding floor, nine rebases, ending at the 3,300-second wall at $2.6\times10^{-8}$ sizes. Central differences: 755 steps, 171 rejected, 1,018 accepted at the floor, nine rebases, ending at the wall at $3.2\times10^{-8}$ sizes. In both, every ladder row from $10^{-2}$ to $3.2\times10^{-8}$ sizes has the delay ratio $1.290061$, the transmitter factor $0.883193$ and the closing rate $0.980194$ to the digits shown in Section 4. The inferred coincidence instant is $0.874841659374\,P$.

| Claim | Grade | Falsifier, and where to look |
| --- | --- | --- |
| The first instrument's pointing-error drift below $3\times10^{-7}$ sizes came from quantization of the time variable | Measured: removing it by rebasing removes the drift; the size estimate derived | A rebased run that still drifts over the same range; `ccor-implicit2-*.json` |
| The forward-part cancellation was the depth limit (Section 1) | Withdrawn: wrong by about five orders of magnitude for the drift | — |
| The lock is resolved at $1.986309$ to $3.2\times10^{-8}$ sizes | Measured; one rebasing instrument at two Jacobian settings | A different integrator giving a different pointing error over that range |
| The finite-difference Jacobian causes the stage stagnation near $10^{-7}$ sizes | Refuted: central differences change nothing | — |
| The cause of the remaining depth limit near $2.6\times10^{-8}$ sizes | Not identified | — |

Commands, from the local directory, under the shared venv (numpy only): `python ccor_implicit2.py control`, `python ccor_implicit2.py k2`, `python ccor_implicit2.py run 1e-12 3300 deep-1e-2-to-1e-12`, and the same three with the environment setting `CCOR_JAC=central`. Receipts `ccor-implicit2-control*.json`, `ccor-implicit2-k2-k3*.json`, `ccor-implicit2-deep-1e-2-to-1e-12*.json`; logs `ccor-implicit2-*.log`. The central-difference sequence was briefly run twice in parallel by mistake. The older copy was stopped, together with an orphaned deep run it had started, and the receipts are from runs that each completed in order. Review status of these additions: self-review only.

**Diagnosis of the remaining stall, 2026-10-21 (measured; cause still open).** The rebasing instrument saved its full state at five depths, from $10^{-6}$ to $10^{-7}$ sizes. A diagnostic, `ccor_stall_diag.py`, repeats one stage solve from each saved state and records which coordinate's correction is largest at each iteration. Two further hypotheses were tested and refuted:
- *Member 1's position scale.* The position tolerance is $10^{-8}$ of the pair's separation for every member, and member 1's coordinates, about $0.43$ from the pair, carry rounding of about $5.6\times10^{-17}$. Tested and refuted: member 1's position is never the worst coordinate.
- *The Jacobian*, already refuted by the central-difference runs above.

The stagnation is in the transverse velocities of the two riding members, mostly at the last collocation stage. Its absolute size, the largest correction over iterations 6 to 19, grows as the pair closes:

| Pair separation (absolute) | Velocity tolerance | Stagnation floor (absolute) |
| --- | --- | --- |
| $1.96\times10^{-7}$ | $5.1\times10^{-11}$ | $1.3\times10^{-12}$ |
| $1.09\times10^{-7}$ | $2.8\times10^{-11}$ | $2.8\times10^{-12}$ |
| $6.2\times10^{-8}$ | $1.6\times10^{-11}$ | $7.1\times10^{-12}$ |
| $3.5\times10^{-8}$ | $8.9\times10^{-12}$ | $5.6\times10^{-12}$ |
| $2.0\times10^{-8}$ | $5.1\times10^{-12}$ | $1.5\times10^{-11}$ |

The floor scales roughly as $3\times10^{-19}$ divided by the separation, the signature of a rounding source whose relative size grows as the pair closes. The tolerance falls in proportion to the separation, so the floor reaches the iteration's acceptance threshold, half the tolerance, near a separation of $4\times10^{-8}$ in absolute terms, about $2\times10^{-7}$ sizes. That is where failures begin. The source itself is not identified. Candidates are named for a later attempt: the subtraction in the response, evaluated in extended precision; and the interpolation of the instrument's own history, tested by repeating the stage solve with the history refined. Files: `ccor_stall_diag.py`, `ccor-implicit2-state-diag-dump-*.npz`, `ccor-implicit2-state-diag-dump-*-diag.json`.

## 5. Independence and limits

- **What is independent.** The code, the numerical method (implicit collocation against two explicit Runge–Kutta integrators) and the interpolation. The closed-form spiral constants are an independent reference in kind for all five tabulated quantities.
- **What is not.** The restart inherits the frozen blind reference's history up to $10^{-2}$ sizes, so nothing here re-tests the breakup or the outer approach. The instrument, both frozen integrators and the study belong to one model family and one reading of the specification.
- **The lock is resolved to $5\times10^{-7}$ sizes, and bounded but not resolved from there to $3\times10^{-8}$.** The slow quantities are resolved throughout. The 222 iterations accepted at a rounding floor all occurred inside $10^{-5}$ sizes; their effect is visible only in the pointing error and turning rate of the last five ladder levels.
- **One release, one kick.** C3 and the converted one-rider contacts of the [C3 record](ceiling-contact-open-research-c3-and-one-rider-contacts-2026-10-11.md) were not run in this instrument.
- **Nothing at or past coincidence.** The run ends at a threshold; the [coincidence record](ceiling-contact-open-research-coincidence-and-continuation-2026-10-11.md) states what the specification determines there.

## 6. Claim grades and falsifiers

| Claim | Grade | Falsifier, and where to look |
| --- | --- | --- |
| The instrument integrates the frozen specification: circular pair held to $2.8\times10^{-11}R$; stored approach reproduced to $2\times10^{-5}$ ($10^{-6}$ inside $10^{-3}$ sizes) | Measured; controls asserted before the target | A known solution of the variant that it fails; `ccor-implicit-control-*.json`, `ccor-implicit-k2.json` |
| Cost of ninety steps per decade, independent of depth, down to $10^{-7}$ sizes | Measured (step counts and wall time on this machine) | A decade needing materially more steps at the same settings; `ccor-implicit-deep-1e-2-to-3e-8.json` |
| C1 follows the spiral with strictly decreasing separation to $3\times10^{-8}$ sizes; lock resolved to $5\times10^{-7}$ sizes at $1.98631\tau$ | Measured; one implicit integrator at three step settings to $10^{-5}$ sizes and one setting below | An integrator of the same specification, written outside this model family, giving a non-monotone separation or constants departing from the table inside $10^{-5}$ sizes |
| The depth limit is the forward-part cancellation in double precision | Derived estimate, consistent with the measured onset; not confirmed by an extended-precision run | A double-precision evaluation of the turning part without the subtraction that fails at the same depth |

## 7. Validation, files and review status

Commands, from the local directory above, under the shared venv `../.venv/bin/python` relative to the repository root (`AAA_VENV` unset; numpy only):

```
python ccor_implicit.py control 1e-8
python ccor_implicit.py run 1e-8 1e-2 1e-4 1500 repro-1e-2-to-1e-4
python ccor_implicit_k2.py
python ccor_implicit.py run 1e-8 1e-2 3e-8 1500 deep-1e-2-to-3e-8
CCOR_HFRAC=0.04 python ccor_implicit.py control 1e-8 ; CCOR_HFRAC=0.04 python ccor_implicit.py run 1e-8 1e-2 1e-5 2400 refine-hfrac0.04
CCOR_HFRAC=0.01 python ccor_implicit.py control 1e-8 ; CCOR_HFRAC=0.01 python ccor_implicit.py run 1e-8 1e-2 1e-5 2400 refine-hfrac0.01
python ccor_implicit_refine.py
```

Every run was bounded by a wall limit given on the command line and emitted a heartbeat every thirty seconds (relative time, steps, rejections, separation, step); the control took 63 seconds, the reproduction 176, the target 520, the refinements 149 and 535. Three earlier attempts at the deep run with earlier versions of the instrument stalled (near $1.3\times10^{-6}$ sizes twice, then at $2.6\times10^{-8}$ sizes) and were stopped by hand; their partial logs are overwritten except `ccor-implicit-debug-1e-4.json`, a diagnostic restart from the study's base trajectory that is not used for any result. No process of this record was left running at closeout (checked by process listing).

Files: `ccor_implicit.py`, `ccor_implicit_k2.py`, `ccor_implicit_refine.py`; receipts `ccor-implicit-control-rtol1e-08*.json`, `ccor-implicit-k2.json`, `ccor-implicit-repro-1e-2-to-1e-4.json`, `ccor-implicit-deep-1e-2-to-3e-8.json`, `ccor-implicit-refine-hfrac0.04.json`, `ccor-implicit-refine-hfrac0.01.json`, `ccor-implicit-refine.json`; trajectories `ccor-implicit-*-traj.npz`; logs. The frozen trajectories and case file were read and not edited.

Review status: self-review only. No reader of another model family and no human has reviewed the instrument or its results.
