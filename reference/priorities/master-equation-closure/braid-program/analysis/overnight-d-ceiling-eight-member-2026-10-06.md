# Overnight D: neutral eight-member ceiling releases

## Execution record

Status: ✓ Bounded finite-history successor completed with a sharper independently checked comparison, certified initialization, and conditional interval kick bounds; a complete evolution enclosure, actual escape, and coincidence remain unproved. Actual start measured by `clock.curr_time`: 2026-10-06 23:29:48 UTC (2026-10-06 19:29:48 EDT). Deadline exactly twelve elapsed hours later: 2026-10-07 11:29:48 UTC (07:29:48 EDT). New exploration stops at 09:59:48 UTC (05:59:48 EDT), reserving ninety minutes for checking and closeout. Prior-phase early closeout measured by `clock.curr_time`: 2026-10-07 00:37:32 UTC (October 6, 20:37:32 EDT), after 1 hour 7 minutes 44 seconds. The successor was selected by the operator's “do 1”, with startup clock read 00:43:25 UTC; the original deadline is unchanged. The completed conditional results and remaining exact-fate obligations are distinguished below.

The [coordinator plan](overnight-braid-research-plan-2026-10-06.md) selects assignment D. The primary target is original balance 1, seed 1 from the local `geometry-session-20261004/results/0186.json` and `geometry-session-20261006/ceiling/census_cap.py` inputs under `.local-data/master-equation-closure/`. Original balance 1 seed 2 and balance 0 seeds 1 and 2 are subsequent independent items. Input identity and known controls have passed; the sections below distinguish conditional derivations, finite numerical evidence, and unresolved actual-fate claims.

Fixed scenario: inclusive projected ceiling with $K=c_f=c_a=1$, original-weight ordinary partner rows, zero self acceleration, and projection after the complete sum. Complete original rigid histories and literal NumPy kicks must be retained. No new kicks, contact rules, smoothing, changed equation, or continuation outside the ordinary domain is selected. The source describes eight members with neutral total polarity; component-braid membership is unassigned.

## Work and evidence plan

Legend: ✓ Done; ◐ In progress; ○ Not done.

1. ✓ Recover and fingerprint exact inputs; reconstruct complete histories and kicks; check exact circular response and ceiling entry/exit against independent known cases before target calculations.
2. ✓ Derive and independently check a sufficient outward-history region controlling every pair, delayed range, source clock, and ceiling member; complete the actual-entry attempt at the conditional tail-neighborhood grade, with the finite exact-history enclosure unresolved.
3. ✓ Assess original balance 1 seed 2 and balance 0 seeds; distinguish conditional complete separation, unresolved actual fate, and finite stopping thresholds.
4. ✓ Independently check the consequential results, isolate failed entry/comparison inequalities, record reproducibility and open obligations, and close owned processes.

Only this report and `overnight-d-` companions in the Braid Program analysis/evidence owners are writable durable deliverables. Scratch: `.tmp/overnight-d/`; bulky local evidence: `.local-data/master-equation-closure/overnight-d/`. Shared owners, coordinator plan, original data, other assignments, production solver, and regular tests remain read-only. Owned computations and their terminal receipts are recorded below; process ownership remains separate from scientific validation.

## Exact preparation and initial controls

The source bytes measured by `shasum -a 256` are recorded below as operational provenance. The shared interpreter executed successfully at `/Users/markmorris/vibe/.venv/bin/python`, reporting NumPy 2.2.4 and SciPy 1.15.2. The full rigid history for each label is

$$
\mathbf X_i(S)=(r_i\cos(\phi_i+\omega S),r_i\sin(\phi_i+\omega S),z_i),\qquad S\le0.
$$

Here $r_i,\phi_i,z_i,\omega$ are the literal binary64 values parsed from the assigned JSON, and its axial translation is zero. The positive labels are 0–3; negative labels are 4–7. Labels 0–1 share the positive-height circle, 2–3 its negative-height mirror, and 4–5 and 6–7 the two negative central circles. The assembly is spatial; each complete rigid member path is planar. No component-braid membership is declared. A seed $k$ means `rng = np.random.default_rng(k); kick = rng.normal(size=(8, 3)); kick *= 1e-4/np.linalg.norm(kick)`, exactly as in the census. Positions remain continuous, and this kick changes only the right-hand velocity at zero; the earlier source history stays unchanged.

| Input | SHA-256 |
| --- | --- |
| `geometry-session-20261004/results/0186.json` | `d937eee01771c6a75b49b07ed1f6d1125ed1a91c82fbb4a9b76bf2f529c6d56d` |
| `geometry-session-20261006/ceiling/census_cap.py` | `c1cae9955066800da6e86e70e79cc30b1771e8e33ac0efcf2433c362b1695b97` |
| `geometry-session-20261006/ceiling/census-cap-v2.json` | `875581b3ae2c6517a9c6a3daa74c23d161b86ad7f7d13cc731cd6512d52ade8b` |
| `geometry-session-20261006/ceiling/release_cap.py` | `ad1514b5a4bf06a0031ea6ed4fb77d8af3f11bce6d7eab97274de74ab25c422b` |

All paths in this table are relative to `.local-data/master-equation-closure/`; these are local provenance inputs, not fresh-CI assets. The [diagnostic reproducer](overnight-d-release-diagnostics.py) imports the unchanged local subject and records its dependency boundary. It is a research instrument, not an EOM acceptance instrument.

A Node selector first returned exactly the intended row from three synthetic records, then selected the four target census records. That source inspection reports a `far` stopping event for balance 1 at both seeds and a `contact` threshold for balance 0 at both seeds. These labels do not establish actual dispersal or coincidence. At the finer census setting, balance 1 seed 1 has no members still capped, while seed 2 has members 2 and 3 capped. Source reading alone does not independently verify those trajectories.

The reproducer's `controls` command passed the following independently specified known cases before its first target run:

- Exact capped circular pair: with $D=\cos D$, $R=[4\cos D(1+\sin D)]^{-1}$ and $\omega=1/R$, the ordinary radial component is $-1/R$ and the positive forward component is $\sin D/[4R^2\cos^2D(1+\sin D)]$. Measured maximum kernel discrepancy was $6.217248937900877\times10^{-15}$; quarter-period positional deviation divided by $R$ was $1.5426608204725452\times10^{-11}$.
- Supplied input response, independently of delayed coupling: initial $V_x=1/2$, input $+1$ until time 1 then $-1$. The exact response enters the ceiling at $1/2$, leaves at 1 and has $V_x=3/4$ at $5/4$. Measured final velocity error was $3.7495229143758024\times10^{-11}$; the instrument recorded both entry and exit. This does not certify coupled switching accuracy on a target trajectory.
- Static source root: source fixed at zero and receiver at $(3,0,0)$ returned delay 3. The sum-before-projection vector witness $(2,0,0)+(-1,1,0)$ returned $(0,1,0)$ at velocity $(1,0,0)$.

The first controls invocation encountered a NumPy integer JSON-serialization error after the numerical assertions; the serializer was repaired and the entire controls command was rerun successfully before targets. Logs are local `overnight-d/controls.log` and `controls.json`. The balance 1 seed 1 pilot at 1200 steps per period reached $0.05083333333333327$ periods in 62 stored nodes, with 0.534 seconds measured integration/diagnostic wall time and 74,547,200 bytes peak RSS. Initialization time is outside that wall figure. This justifies one bounded, single-worker endpoint reconstruction with a 600-second supervisor deadline and a 1 GB in-process memory guard; it is not a long-run cost prediction.

Claim grade: measured by the named commands and research reproducer over these controls and pilot. Falsifier: rerunning the exact controls with the frozen dependencies and observing a failed assertion, or finding that a target ran before the successful control receipt. The numerical trajectory remains floating-point evidence, including Hermite-interpolation and ceiling-switching error; no enclosure of the exact solution has been established.

## A sufficient all-pair tail condition

This subsection develops a conservative escape criterion that permits members to remain on the ceiling. It controls changes in velocity by bounding the entire remaining acceleration, and controls delayed roots by a geometric separation margin. The first task is to test its inequalities on an actual retained history; their mere availability does not settle any assigned preparation.

Fix a prospective entry time $T_0$, an earlier source time $S_*<T_0$, and anchor velocities $\mathbf U_i=\mathbf V_i(T_0)$. Write $L=T_0-S_*>0$. For each unordered pair choose a fixed unit vector $\mathbf e_{ij}$ directed from $j$ to $i$, with $\mathbf e_{ji}=-\mathbf e_{ij}$, and define

$$
d_{ij}=\mathbf e_{ij}\cdot[\mathbf X_i(T_0)-\mathbf X_j(T_0)]>0,\qquad
c_{ij}=\mathbf e_{ij}\cdot(\mathbf U_i-\mathbf U_j)-\eta_i-\eta_j>0.
$$

The positive numbers $\eta_i$ are proposed uniform bounds on velocity deviation from $\mathbf U_i$. Their past part must be verified for every $S\in[S_*,T_0]$, not only stored nodes. For each ordered pair also require its current root to have emission time strictly later than $S_*$. Define

$$
m_{ij}=\min\{d_{ij}/L,c_{ij}\}-2\eta_j>0,\qquad
B_i=\sum_{j\ne i}\frac{8}{m_{ij}^{\,2}c_{ij}d_{ij}}<\eta_i.
$$

Here $m_{ij}$ bounds a directional difference between the received wake normal and its transmitter velocity. The quantity $B_i$ bounds the entire future change of receiver $i$'s velocity. The strict inequalities and past velocity bounds form the proposed sufficient entry test. Pairwise directions can differ; their role is to prove that every separation grows, excluding bounded surviving subclusters.

### Root and acceleration bounds on the proposed region

For the derivation assume an ordinary solution is available and stays in the velocity region until the time under examination. Put $u=T-T_0\ge0$. Integrating the velocity bounds gives

$$
\mathbf e_{ij}\cdot[\mathbf X_i(T)-\mathbf X_j(T)]\ge d_{ij}+c_{ij}u.
$$

For fixed emission time $S_*$ the causal gap $g(T,S_*)=|\mathbf X_i(T)-\mathbf X_j(S_*)|-(T-S_*)$ is nonincreasing because receiver speed is at most one. Its strictly negative initial value therefore persists. Bounded rigid remote past makes the gap negative for sufficiently early emissions, while positive present separation gives a positive gap at $S=T$. Every partner channel has a root, and its emission lies after $S_*$. Thus its delay $\tau=T-S$ satisfies $\tau\le L+u$.

At that root let $\mathbf n=[\mathbf X_i(T)-\mathbf X_j(S)]/\tau$ be the unit wake normal. Subtracting the transmitter endpoint velocity from its average velocity on $[S,T]$ gives

$$
\begin{aligned}
\mathbf n-\mathbf V_j(S)
&=\frac{\mathbf X_i(T)-\mathbf X_j(T)}\tau
 +\frac1\tau\int_S^T[\mathbf V_j(v)-\mathbf V_j(S)]\,dv,\\
\mathbf e_{ij}\cdot[\mathbf n-\mathbf V_j(S)]
&\ge\frac{d_{ij}+c_{ij}u}{L+u}-2\eta_j\ge m_{ij}.
\end{aligned}
$$

The speed cap then turns this directional difference into a transmitter-factor floor:

$$
D_{t,ij}=1-\mathbf n\cdot\mathbf V_j(S)
=\frac{1-|\mathbf V_j(S)|^2+|\mathbf n-\mathbf V_j(S)|^2}{2}
\ge\frac{m_{ij}^2}{2}.
$$

This bound does not assume strict subfield transmitter speed. Monotonicity of the causal gap and this positive derivative at a root exclude a second root or a root interval, so the partner census is complete. The source-clock derivative obeys $0\le dS/dT=D_r/D_t\le4/m_{ij}^2$ wherever defined. No strictly positive lower source-clock rate is asserted: a ceiling receiver can pause its source clock. The selected self acceleration stays zero.

The current separation is at most twice the delayed range, since the source moves no faster than one over the delay. Therefore $\tau\ge(d_{ij}+c_{ij}u)/2$. Original unit coupling and polarity magnitude one yield

$$
|\mathbf A_i^{\mathrm{eff}}(T)|\le|\mathbf A_i^{\mathrm{ord}}(T)|
\le\sum_{j\ne i}\frac{8}{m_{ij}^2(d_{ij}+c_{ij}u)^2},\qquad
\int_{T_0}^{\infty}|\mathbf A_i^{\mathrm{eff}}(T)|\,dT\le B_i.
$$

Projection after summation is essential to the first inequality: it removes an orthogonal forward component from the summed vector and cannot increase that vector's norm. Integrating acceleration gives $|\mathbf V_i(T)-\mathbf U_i|\le B_i<\eta_i$. A first exit from the proposed velocity region is consequently impossible. Every pair separates at least linearly, and each velocity has a finite limit because its total variation is finite.

Claim grade: derived conditional theorem with the independent continuation reconstruction and strengthened regularity stated below. The initial derivation left this restart obligation open; the subsequent independent review discharged it under the explicit hypotheses. No actual entry of the exact preparation is established. Falsifier: a history meeting every strict condition but violating the stated transmitter-factor or acceleration-integral inequality, or a finite regular continuation obstruction not prevented by the displayed range, factor, and velocity bounds. A failed entry inequality refutes this criterion's applicability to that state, not escape itself.

## First actual-entry test: balance 1, seed 1

The unchanged subject replay at 2400 base steps per period exactly reproduces the recorded census endpoint, $T_0=236.17424208263077$ or $3.457469675801305$ periods. This establishes deterministic reconstruction with the literal preparation, not independent trajectory accuracy. The complete numerical history is retained in local `overnight-d/b1-s1-h2400-original-endpoint.npz`; the companion JSON supplies states, all 56 partner rows at each diagnostic time, and ceiling episodes. Supervisor run `9f6f4e41-12fe-47f0-aa63-f2812d70d471` completed with exit code zero and `processGroupClosed: true`, after 164.035 supervisor seconds; target integration plus diagnostics measured 161.40505649987608 seconds and 79,839,232 bytes peak RSS.

At this endpoint the [diagnostic reproducer](overnight-d-release-diagnostics.py) measures positive radial separation rate for all 28 unordered pairs. The smallest separation is 74.72822602758093 for labels 1 and 5, also the pair with the smallest radial rate, 0.44119555512571584. Those statements concern one numerical state, not all later times. No member is then capped; member 2's speed is 0.9964097435956754.

The earliest emission still being received is from source 6 to receiver 2 at $S=68.72506636685907$, with delay 167.4491757157717. Its $D_t=1.3604990175207146$ is well away from zero, but its receiver factor is only $D_r=0.0049542575723448$. Thus the source clock advances slowly because the receiver nearly keeps pace with the wake. This is a history-memory obstruction, not a small transmitter-factor obstruction at this endpoint. Source times for receiver 2's other channels include 70.6065, 71.9831 and 72.7142, overlapping the release's first ceiling episode near time 72.2664.

The [tail-entry diagnostic](overnight-d-tail-entry.py) checks extrema of each cubic-Hermite segment's quadratic velocity by finding stationary points of its squared distance from the anchor velocity. It first passed a constant-velocity segment and the exactly known maximum $3/4$ at $q=1/2$ for the cubic position $x(q)=q^3-(3/2)q^2$. Only then did it examine the retained target history. These are floating polynomial extrema, not outward-rounded enclosures of the numerical interpolation or the exact trajectory.

Choose each direction along the present separation and allow the largest possible common history cutoff, the earliest current emission. Every strictly earlier cutoff needed by the theorem retains this interval as well. The minimum required velocity radii over that retained interval are

$$
(\eta_0,\ldots,\eta_7)\ \ge\
(0.80889,0.59060,1.43252,1.17921,1.21027,1.26083,0.86172,0.80034).
$$

The displayed values are rounded diagnostic lower requirements, not selected theorem margins. With the unrounded values, the first failed separation inequality is especially large for pair 2,4:

$$
c_{24}=0.678855858472529-1.4325195302838707-1.210265760399656
=-1.9639294322109977.
$$

Increasing those radii or moving the common cutoff earlier only worsens this inequality. More strongly, the relative anchor-speed magnitude for this pair is only 0.6800686755973344, so no choice of unit direction can repair $c_{24}>0$ with these history radii. The current geometric direction is therefore not the important limitation; requiring one small velocity region to contain the release transient is. The later $m_{ij}$ and impulse-budget tests cannot be admitted once this first condition fails.

Claim grade: measured by the entry diagnostic on the retained binary64/Hermite history; derived for the inference that the stated velocity-ball criterion cannot pass for this numerical history at this endpoint with any common cutoff earlier than its earliest root. This is not an obstruction to the actual escape of the exact solution. Falsifier: a valid recomputation of the retained history showing smaller mandatory radii sufficient for positive $c_{24}$, or a proved entry construction that avoids the common-history velocity-ball hypothesis. The next sharper route is to bound the already emitted transient separately from the future velocity region, rather than demand that both fit the same small ball.

### Independent continuation result and required regularity

The [independent reconstruction](overnight-d-tail-independent-review-2026-10-06.md) checks the preceding constants and supplies the missing continuation proof. Its additional hypotheses are complete-past $1$-Lipschitz position paths and compatible Lipschitz velocities on the root-accessible interval $[S_*,T_0]$. Thus the accessible positions are $C^{1,1}$: they have continuous velocity with a finite Lipschitz bound, while acceleration may jump. Taking $S_*>0$ avoids the original velocity kick. The remote past is retained for root exclusion and need not share that post-kick regularity.

The proof uses positive delays to make a sufficiently short next step depend only on already known source paths. Positive range and transmitter-factor floors make the resulting ordinary acceleration Lipschitz in receiver position. The supplied-input normal-cone response has a constant-one integral comparison bound; integrating candidate velocities to positions therefore gives a contraction with factor $L_Fh^2/2$ for sufficiently small step length $h$, where $L_F$ is the ordinary acceleration's position Lipschitz constant. This construction includes ceiling entry, residence and exit, and permits $D_r=0$. The tail bounds preserve the retained-source regularity and every required root margin at any finite endpoint, allowing restart there and establishing global continuation under these hypotheses.

Claim grade: derived conditional global tail theorem, independently reconstructed in the linked companion and inspected here. The frozen initial derivation's continuation reservation is discharged by these explicitly added hypotheses and construction, not by an appeal to an existing broader theorem. In particular, the existing FSC-007 owner assumes a positive receiver-factor floor and cannot by itself supply this extension. The actual-entry gap remains: the measured seed-1 history fails the first separation inequality, before any numerical-certification issue is reached.

## Persistent ceiling motion need not flush its old sources

A receiver that remains at the ceiling can keep receiving a bounded interval of old emissions even while every present pair separates. This makes it unsafe to assume that a larger endpoint will eventually remove the transient history from the problem. The conclusion below is conditional; no assigned receiver has yet been proved to remain capped forever.

Suppose an ordinary separated tail has limiting velocities $\mathbf U_k^\infty$, an acceleration bound $|\dot{\mathbf V}_i(T)|\le C/(1+T)^2$ after some positive time, and receiver $i$ remains exactly at speed one throughout that tail. Suppose also $\mathbf U_i^\infty\cdot\mathbf U_j^\infty<1$ for source $j$. The all-pair tail theorem, if admitted, supplies these acceleration and velocity properties whenever this receiver stays capped; its strictly distinct limiting velocities give the last inequality. Set $\mathbf e=\mathbf U_i^\infty$, so $|\mathbf e|=1$. The integrable acceleration bound gives $|\mathbf V_i(T)-\mathbf e|\le C/(1+T)$, and exact unit speed yields

$$
1-\mathbf e\cdot\mathbf V_i(T)=\tfrac12|\mathbf V_i(T)-\mathbf e|^2\le\frac{C^2}{2(1+T)^2}.
$$

Consequently the longitudinal lag $H_i(T)=T-\mathbf e\cdot\mathbf X_i(T)$ has a finite upper limit: its derivative is nonnegative and integrable. At every partner root, the range dominates its projection onto $\mathbf e$, so

$$
T-S=|\mathbf X_i(T)-\mathbf X_j(S)|\ge\mathbf e\cdot\mathbf X_i(T)-\mathbf e\cdot\mathbf X_j(S),\qquad
S-\mathbf e\cdot\mathbf X_j(S)\le H_i(T).
$$

If the source clock were unbounded, source-velocity convergence would give $[S-\mathbf e\cdot\mathbf X_j(S)]/S\to1-\mathbf e\cdot\mathbf U_j^\infty>0$, contradicting the bounded right-hand side. Since the source clock is nondecreasing on the ordinary capped chart, it therefore converges to a finite emission time. This is a derived obstruction to the proposed strategy of simply waiting for all source clocks to leave a transient interval; it is compatible with complete spatial dispersal. It does not prove that the limiting emission lies inside any particular initial transient, or that the clock is exactly constant at a finite reception time.

Claim grade: derived conditional clock-limit lemma, independently reconstructed in the [review companion](overnight-d-tail-independent-review-2026-10-06.md). Falsifier: a trajectory meeting persistent unit speed, the stated acceleration decay, ordinary root monotonicity and distinct limiting velocities, yet having an unbounded source clock. A receiver that eventually leaves the ceiling, an acceleration tail not covered by the bound, or equal limiting velocity with its source lies outside the lemma.

## Comparison across the original preparations

The original fine-setting reconstructions use exactly the same histories and kick generator; no input perturbation was selected for this comparison. Balance 1 seed 2 ends at $T=234.62285322508606$ with all 28 present pair radial rates positive. Its smallest present pair distance is 100.76221582334448 and its smallest radial rate is 0.6079542397849277. Members 2 and 3 remain on the ceiling at that finite endpoint. Its earliest source time is 63.90399422690308, still well before its strong release deformation. The common-history entry test again fails: for pair 2,5, the measured mandatory radii are 1.1549926639212276 and 1.963601221935145, whereas the current projected relative velocity is 0.9663373983451276, giving $c_{25}=-2.152256487511245$.

| Preparation | First ceiling arrival, in periods | First member | Original stopping time, in periods | Finite endpoint |
| --- | ---: | ---: | ---: | --- |
| Balance 0, seed 1 | 0.3540365733647789 | 4 | 0.5455981971995915 | Pair 3,4 crosses the contact-distance threshold |
| Balance 0, seed 2 | 0.36339183389301755 | 5 | 0.5545980611575777 | Pair 2,5 crosses the contact-distance threshold |
| Balance 1, seed 1 | 1.0579433998085546 | 2 | 3.457469675801305 | Maximum separation crosses 40 initial sizes |
| Balance 1, seed 2 | 1.0534413695251537 | 5 | 3.434758139255079 | Maximum separation crosses 40 initial sizes |

These are measured replay values, and their agreement with the original census establishes reconstruction only. Balance 0 begins with larger circular speeds, up to approximately 0.824, than balance 1's approximately 0.721; literal values are determined by $r_i\omega$. The table identifies a reproducible difference in first ceiling timing and membership. It does not establish that either difference causes the eventual finite stopping category, or that neutral polarity predicts fate.

### Bounding the other six members near each approaching pair

At the original balance-0 thresholds, the mutual pair rows are much larger than the rows from the other six labels. The diagnostic measures norms before projection, so the comparison does not silently alter post-summation projection. For seed 1, receivers 3 and 4 have external row-norm sums 0.996701099672561 and 0.9971183444528828, versus mutual row norms 170770.03283953926 and 172165.65695867167. For seed 2, receivers 2 and 5 have external sums 0.9899008310386018 and 0.9903426712842144, versus mutual norms 170596.52057072593 and 172028.89829068203. These are instantaneous measurements, not a coincidence proof.

There is also a finite-window bound that can be checked against retained source history without integrating the close pair beyond its threshold. Fix an external row at reception $T_0$, with emission $S_0$, delayed range $r_0=T_0-S_0>0$ and transmitter factor $D_0>0$. Choose a future window $h>0$ and set $\epsilon=8h/D_0$. Suppose the entire source bracket $[S_0-\epsilon,S_0+\epsilon]$ lies before $T_0$ and has speed at most one and velocity Lipschitz constant $M$. For any capped receiver continuation over this window, define

$$
r_{\min}=r_0-h-\epsilon>0,\qquad
\Lambda=\frac{2(h+\epsilon)}{r_{\min}}+M\epsilon<\frac{D_0}{2}.
$$

A receiver moves at most $h$ and the source moves at most $\epsilon$ within that bracket, so range stays above $r_{\min}$. The unit-direction change is at most $2(h+\epsilon)/r_{\min}$ and source velocity changes by at most $M\epsilon$; together they bound the transmitter-factor loss by $\Lambda$. Hence $D_t>D_0/2$ throughout the bracket. At $T_0$ the bracket endpoints have causal gaps beyond $\pm4h$; the change in reception time and receiver position changes either gap by at most $2h$. Their opposite signs persist. Complete capped-history monotonicity then gives the one ordinary external root, with

$$
|\mathbf a_{i\leftarrow j}(T)|\le\frac{2}{D_0r_{\min}^2},\qquad T_0\le T\le T_0+h,
$$

for as long as the full solution remains in its ordinary domain. Summing six such bounds limits the external raw perturbation without prescribing the close pair's own motion. Projection cannot be distributed over those six rows: their effect on the total response must be considered at the level of the summed input.

The [background diagnostic](overnight-d-background-bound.py) first passed a restricted cubic's exact acceleration maximum, then evaluated the source brackets of both assigned approaching preparations. At $h=0.001$, its algebraic inequalities pass on the numerical retained histories; the six-row bounds are 2.011905940088616 and 2.0127561516212347 for seed 1, and 1.9982785822812414 and 1.9991780689792817 for seed 2. An independent reconstruction reproduced these figures at floating precision. These particular source brackets have speeds below one, even though other portions of the full Hermite interpolation violate the ceiling slightly. The missing exact-source error bounds are therefore a numerical-certification gap; they must not be erased by the bracket's apparent margin.

Claim grade: derived for the conditional finite-window external-row bound; measured for its numerical-history evaluation and the instantaneous row ratios. Falsifier: failure of the source bracket, speed, Lipschitz, range or factor hypotheses, or an independently recomputed external row exceeding the bound while those hypotheses hold. This result isolates the external-six contribution; it supplies neither a bound on the close pair's delayed-range/present-distance ratio nor an unconditional coincidence theorem. No trajectory was continued through a zero range, degenerate root or coincidence, and Claude's C1 case was not reused.

## Numerical history and independent evolution checks

Independent snapshot reconstruction finds a material boundary between the exact ceiling theorem and the stored numerical interpolation. End-node speeds are at most one up to floating roundoff, but the quadratic velocities of the cubic-Hermite segments have larger interior maxima. Using coefficients expressed in position differences to reduce cancellation, the independent checker measures maxima 1.000000341100984, 1.0000000632437087, 1.0000020623247245 and 1.0000003077844668 for balance 0 seeds 1/2 and balance 1 seeds 1/2 respectively. These are floating extrema of the interpolation, not a claim that the exact solution violates the ceiling. They prevent direct application of the exact speed-monotonic root proof to this interpolation.

A separately authored [C++ research approximation](overnight-d-independent-release.cpp) uses midpoint evolution with post-summation ceiling response, quadratic position history and linear interpolation of endpoint velocities. Positions advance by the trapezoid of the endpoint velocities, so the retained derivative is exactly that interpolated velocity. Its speed stays inside the convex unit ball whenever both endpoint velocities do, apart from floating roundoff. Partner roots use safeguarded Newton/bisection against this history and the literal complete circular past. The [input exporter](overnight-d-prepare-independent-inputs.py) checks binary64 round-trip text and exact equality of the NumPy kick with the primary preparation. This is an independent numerical discretization for finite comparison, not an exact solution or a production solver.

The first version instead used piecewise-linear position history. Before target use, a circular control using only finite-step projection failed its declared $10^{-4}$ threshold, with deviation approximately $6.38\times10^{-4}$ at 4000 steps per period. Applying the equation's forward-component removal at the midpoint stages corrected that control. This first history approximation then reached the same finite separation category, but its endpoint-velocity discrepancies were nonmonotonic and too large for close agreement. The historical source and outputs are retained locally as `independent-release-linear-history.cpp` and `independent-b1-s1-h*.json`; this approximation is not the current reproducer.

The current quadratic-history version was built after its source change (source mtime 2026-10-06 19:57:15 EDT, binary 19:57:16 EDT, by `stat`). Its rebuilt static-root, circular-kernel, supplied ceiling entry/exit and circular evolution controls passed before targets. Quarter-period circular deviations were $2.9081552370834879\times10^{-7}$ at 4000 and $7.2706024229286112\times10^{-8}$ at 8000 base steps per period. This refinement ratio supports the intended local order on that known case; it is not a global error enclosure for the releases.

| Preparation | Base steps per period | Stopping time, in periods | Largest member velocity discrepancy from original 2400-step endpoint |
| --- | ---: | ---: | ---: |
| Balance 1, seed 1 | 9600 | 3.457186125553088 | 0.0013932200883113805 |
| Balance 1, seed 1 | 19200 | 3.457242158794658 | 0.0005111454986905275 |
| Balance 1, seed 1 | 38400 | 3.4572656249970697 | 0.00028375768300641053 |
| Balance 1, seed 1 | 76800 | 3.4572656250222527 | 0.00023636629756098955 |
| Balance 1, seed 2 | 38400 | 3.4343749999970905 | 0.0007355075026329801 |
| Balance 1, seed 2 | 76800 | 3.434361979188574 | 0.0004500251440549093 |
| Balance 0, seed 1 | 19200 | 0.5456090282618739 | 0.0005118223236950365 |
| Balance 0, seed 1 | 38400 | 0.5456427050401399 | 0.004984612771814401 |
| Balance 0, seed 2 | 19200 | 0.5546003141126886 | 0.0010025429582370103 |
| Balance 0, seed 2 | 38400 | 0.5546003205241946 | 0.0012640480621503964 |

All balance-1 rows end at the original far-distance threshold, and all balance-0 rows end at the original contact-distance threshold. The comparison uses each instrument's own threshold time, not a common-time sample. The balance-0 velocity discrepancies do not decrease monotonically, so the agreement establishes only the finite stopping category and approximate timing. No coincidence or all-future separation follows. Files `independent-q-b*-s*-h*.json` retain the exact coordinates and velocities for recomputation.

For balance 1 seed 1, `/usr/bin/time -l` measured 2.24, 4.72, 10.28 and 22.84 real seconds and peak RSS 20,267,008; 38,404,096; 75,005,952; and 141,623,296 bytes across the four refinements. The supervisor closed each batch's process group. The completed original-subject 4800-step refinement and its comparison are recorded below.

## Separating old emissions from future motion

The [split-history tail derivation](overnight-d-split-history-tail.md) removes the common-history requirement that the release transient fit inside small outgoing velocity balls. Old emissions are bounded using the causal geometry allowed by unit receiver speed; future emissions use velocity balls only after the proposed entry time. Its mathematical sufficiency has passed independent review; numerical candidates and the exact-entry gap are recorded below. It changes neither the law nor the preparation.

The [candidate diagnostic](overnight-d-split-tail.py) passed exact spherical-cap support, old-impulse, ballistic-onset and linear-history controls before loading the seed-1 target. At the original endpoint, samples at retained nodes and midpoints give old-emission impulse majorants per receiver of approximately 0.35733, 0.39115, 0.35067, 0.33809, 0.43463, 0.44073, 0.27259 and 0.28730. These are sampled estimates, not continuous-history enclosures. No uniform velocity radius in the tested set 0.01–0.18 passes the full closure inequalities. In fact, the old contribution alone already exceeds every radius tested. The earlier receiver-direction cone prototype is retained locally as `split-tail-receiver-cone-prototype.py`; it failed its own geometric preconditions for several receivers and is superseded by the explicit causal normal cone in the current derivation.

This failure motivates a targeted entry search or a sharper old-emission integral, rather than interpreting the original finite threshold as escape. Even a numerical candidate would still require an enclosure connecting the retained approximation to the exact selected preparation and continuous source-history margins.

### Reviewed criterion and targeted continuation

The [independent split-tail review](overnight-d-split-tail-independent-review-2026-10-06.md) reconstructs the theorem and strengthens its future factor floor to include $c_{ij}^2/2$. It also makes the required $C^{1,1}$ history interval extend through the entire remaining old history and assigns the possibly frozen boundary clock at $S=T_0$ to one partition. The current derivation adopts these corrections. The original floor remains valid but weaker. The first seed-1 continuation loaded that original floor before the update; its exact diagnostic source is retained locally as `split-tail-original-future-floor.py`, SHA-256 `60f23110be664d78137241e38d4238fec1b9318eeeaec7a07334b105ea768dab`. Later evaluations use the stronger reviewed floor.

The original-subject refinement at 4800 base steps per period ends at 3.4573218881041785 periods. Its maximum member velocity difference from the original 2400-step endpoint is 0.00012690156285566722, and from the independent 76800-step endpoint is 0.00011041225760325387. The latter comparison again uses each method's own threshold time. The refinement took 187.083 measured target seconds with peak RSS 104,726,528 bytes; supervisor run `6805db65-0080-48f1-a6e7-48ad7c1dd31d` ended successfully with its process group closed. These values support finite numerical consistency, not an exact error bound.

The [tail search](overnight-d-tail-search.py) restores the complete retained history rather than starting from a present-state snapshot. Before targets, a capped-circle restoration control produced identical next-step positions to the uninterrupted calculation, with measured difference zero; this checks persistence, while the separately stated exact-circle control checks the response. The continuation retains contact, factor and step-domain guards. It replaces only the census's far-distance stopping threshold with repeated tail-inequality assessment. Its selected base step is one period divided by 600; all earlier history is retained unchanged. A short seed-1 pilot used 0.842 target seconds and 118,161,408 bytes peak RSS before the bounded continuation.

With the weaker floor, the first screened strict inequality occurred at 28.06403083261491 periods, with largest impulse/radius ratio 0.9894094330286658. The requested screening margin was 0.8, so this run continued to its explicit 40-period search budget and reported `horizon`, rather than falsely claiming that stronger margin. Its endpoint is $T=2732.383882001036$, or 40.000697499270665 periods. Supervisor run `03bbb9ac-9367-4829-a4e5-71cbc545040a` completed and closed its group after 250.699 wall seconds; the target reported 249.018 seconds and peak RSS 486,686,720 bytes. This larger endpoint was obtained as an inequality-entry search, not used as an escape verdict.

At that endpoint, a measured member has returned to the ceiling: member 2 is capped, while the earliest partner source time is still 68.97634712446597. The smallest present pair distance is 1095.4137242661686 and every present pair has positive radial rate, the smallest being 0.4026655305406499. These observations illustrate why complete current separation and unflushed old emissions must be handled together; they do not prove persistent future capping.

### Continuous-segment bounds and explicit error allowances

The current stronger formula, evaluated on the same seed-1 endpoint, has maximum impulse/radius ratio 0.9004425175402789 using radii

$$
(0.028185690737168416,\ 0.05413916642722417,\ 0.025243041515752202,\ 0.024939723773167697,\ 0.042574627348796655,\ 0.03756332484057954,\ 0.027734121854987085,\ 0.05596471892194112).
$$

The [whole-segment diagnostic](overnight-d-tail-segment-bounds.py) replaces point samples with analytical boxes covering every retained cubic segment. A cubic's acceleration is linear, so the maximum norm of its two endpoint accelerations bounds the whole segment. Around the segment midpoint, multiplying that bound by the half-width bounds velocity variation; multiplying the resulting speed bound by the half-width bounds position variation. These boxes enlarge the causal spherical cap and lower its range bound over the full segment. Exact linear and cubic controls and a negative-cap support control passed before the target. Binary64 evaluation of these whole-segment formulas gives maximum ratio 0.9004829614514444, slightly larger than the sampled value. This is still a floating evaluation of analytical bounds, not a directed-rounding certificate.

The error interface in the split-history derivation permits fixed velocity centers, uniform history position and velocity errors, and a negative causal gap at a cutoff preceding each current root. Using hypothetical certified allowances $\epsilon_x=0.1$, $\epsilon_v=0.001$, initial velocity allowance 0.001, and cutoffs two time units before each approximate root, the whole-segment calculation still returns a strict largest ratio of 0.9390466349354354. The smallest old transmitter floor is 0.25628210170255894, smallest old range bound 547.5716526676966, smallest future projected separation rate 0.3110619541957354, and smallest future transmitter floor 0.1453713283052653. The largest cutoff-gap upper estimate is -0.8010801597304635. Local results are `b1-s1-tail-current-floor.json`, `b1-s1-tail-segment-bounds.json` and `b1-s1-tail-error-budget.json`.

These allowances are requirements, not established errors of the original preparation. An actual escape proof still needs a rigorous finite-history enclosure putting the selected exact release inside those allowances. The independent interval calculation below supplies outward-rounded tail evaluation for seed 1; agreement between numerical approximations does not supply the finite-history enclosure. The conditional theorem and the numerical candidate are therefore separate results. A failure of either error allowance or a nonpositive recomputed margin defeats this candidate application without proving that the actual release fails to escape.

### Effect of the other six rows after projection

The external-six bound also controls their absolute contribution to the projected response at a fixed velocity. Let $\mathcal R_{\mathbf V}(\mathbf A)$ denote the original response after the whole raw sum. If $|\mathbf V|<1$, this map is the identity. At $|\mathbf V|=1$, decompose the input into its tangential part and scalar forward component:

$$
\mathcal R_{\mathbf V}(\mathbf A)=\mathbf A_{\perp}+\min(\mathbf V\cdot\mathbf A,0)\mathbf V.
$$

The scalar function $x\mapsto\min(x,0)$ is $1$-Lipschitz. Orthogonality therefore gives, for any two raw inputs at this same velocity,

$$
|\mathcal R_{\mathbf V}(\mathbf A+\mathbf E)-\mathcal R_{\mathbf V}(\mathbf A)|\le|\mathbf E|.
$$

Thus each conditional six-row bound near 2 also bounds the absolute change in effective acceleration caused by adding those rows to the mutual row, even when the added rows change which forward component is removed. This is nonexpansiveness of the full response map; it does not distribute projection across individual rows. The small raw external/mutual ratios do not by themselves imply a small relative response error, since the mutual row could be largely removed by projection.

Claim grade: derived pointwise perturbation bound. Its fixed-state qualifier matters: comparing an actual eight-member trajectory with a separate isolated-pair trajectory also changes velocities, positions and delayed source histories. The displayed inequality alone supplies no integrated trajectory-error bound and no coincidence theorem. Falsifier: two inputs at the same admitted velocity whose projected-response difference exceeds their raw difference. This bound is specific enough to use the external-six estimates without importing a contact result from another preparation.

The [fixed-state diagnostic](overnight-d-projection-perturbation.py) first passed two exact vector controls, including a change across the forward-removal boundary, then used the independent snapshot rows. For balance 0 seed 1, receivers 3 and 4 have actual external-vector norms 0.33446016685562935 and 0.33474553594217765; adding them changes the projected response by 0.32860898849693293 and 0.32931811533590216. The mutual-only projected response norms are 879.0216020087345 and 871.7607204942178. For seed 2, receivers 2 and 5 give corresponding external norms 0.3265028755968199 and 0.3268054011895821, response changes 0.3198920640932583 and 0.3206422711068468, and mutual-only response norms 878.5653829683886 and 871.2457613772817. These measured numbers respect the derived absolute bound and show why comparing only the raw mutual norms near 170,000 understates the relative size after projection.

### Seed-2 tail candidate

The same unchanged-history search for balance 1 seed 2, using the stronger reviewed floor, reached its declared ratio target at $T=1230.3317169023526$, or 18.011424805919955 periods. Its maximum sampled ratio is 0.9449633593370375. The complete history is retained in `b1-s2-tail-search-h600.npz`; the JSON companion records the preparation, exact script hashes, roots, endpoint, radii, and intermediate screens. Supervisor run `b5bd0bd5-5517-46ec-944e-221383099188` completed with a closed process group after 106.212 seconds; target wall time was 104.212 seconds and peak RSS 220,430,336 bytes. Its prior short pilot took 0.810 seconds and 95,895,552 bytes peak RSS.

Whole-segment binary64 bounds with the same hypothetical errors $\epsilon_x=0.1$, $\epsilon_v=0.001$, initial allowance 0.001, and two-unit cutoff padding produce a largest ratio of 0.9520953090081032. Every cutoff gap remains negative in that diagnostic. The fixed radii are

$$
(0.056470207088220814,\ 0.09277621474562898,\ 0.09511943354947706,\ 0.10265589533770082,\ 0.05594353080333865,\ 0.08832171175064246,\ 0.18076499307497035,\ 0.11984435104611084).
$$

This provides a second preparation-specific numerical candidate for complete separation under the conditional theorem. It does not convert either preparation into an exact all-future result. The same finite-history enclosure and arithmetic-certification obligations remain; the two numerical histories are separate preparations, not independent proofs of one another.

## Independent interval admission of the seed-1 tail neighborhood

The [independent interval review](overnight-d-tail-interval-independent-review-2026-10-06.md) discharges the tail-arithmetic obligation for the seed-1 candidate, conditional on its stated finite IEEE binary64 elementary-operation contract. Its separately authored [checker](overnight-d-tail-interval-independent-check.py) encloses every old-source segment and all future-row formulas using outward adjacent-float bounds, with square-root brackets checked by outward squaring. Exact rational squared-norm checks put all eight literal velocity centers inside the unit ball; none needed modification.

For $\epsilon_x=0.1$ and $\epsilon_v=\epsilon_i^0=0.001$, it covers all 56 channels and 1,088,168 full or clipped source segments. The largest enclosed budget/radius upper bound is 0.9390466349354595, and the largest cutoff-gap upper bound is -0.8010801597283715. The smallest required cutoff is 66.97634712446597. Thus the theorem applies to any exact admitted history in the specified neighborhood on the required source intervals through $T_0=2732.383882001036$. Whether the selected release belongs to that neighborhood is still unproved.

Known rational arithmetic, verified square roots, exact polynomial segments, spherical-cap support and analytic future-impulse controls passed before target execution. The supervised target, run `ec8780a1-6d92-4c29-9176-8b7e558f79d9`, completed in 3.46 seconds with a closed process group; the reviewer's owner closeout returned clear. The companion records exact source/input hashes, every channel's limiting segment, arithmetic assumptions and falsifiers. This is an independent interval certificate of the conditional tail-neighborhood test, not an interval solution of the original evolution.

## Remaining finite-history enclosure work

The next mathematical target is the [finite-history error comparison](overnight-d-finite-history-error.md). It uses the exact normal-cone response to bound velocity-error energy, while explicitly accounting for numerical position/velocity incompatibility and a possible interior use of a boundary reaction. A diagnostic normal multiplier is only residual bookkeeping; it changes no exact equation. The proposed partner-row bound must control displaced source times, ordinary brackets and the original kick discontinuity.

The [finite-defect screen](overnight-d-finite-defect-screen.py) is a preliminary floating instrument for deciding whether this route has a plausible error budget. It checks projection derivatives, free/capped supplied residuals and an exact circular delayed residual before target use; the circle residual was $4.440892098500626\times10^{-15}$ with zero measured complementarity defect. An eight-sample pilot on the 4800-step seed-1 prefix took 0.067 target seconds. Neither a sampled residual nor a pointwise Lipschitz estimate is an error enclosure; any such result remains a diagnostic until its full time/source intervals and root-domain bootstrap are certified.

### Finite-enclosure attempt and its present limit

The finite-error proposal has now passed [independent review](overnight-d-finite-history-independent-review-2026-10-06.md) on smooth ordinary source brackets. The live note adopts the required kick-straddle term, noncircular root-bracket admission, strictly positive comparison allowance, and conversion $E_v+|\rho^x|\le0.001$ back to the Hermite velocity used by the tail certificate. A separate existence treatment is required for any nontransversal source-kick crossing; no selector or new rule was introduced.

The 256-sample diagnostic on the original 4800-step prefix measured maximum kinematic defect $4.361392617882911\times10^{-9}$, velocity residual $2.863865682995598\times10^{-5}$, and complementarity defect $2.514721760952503\times10^{-12}$, in 2.191 target seconds. Its nominal half-margin pointwise sensitivity coefficients reached $L_x=467.55433662182253$ and $L_v=15.572618618780206$. These are point samples, not interval maxima over the prefix or admissible exact-error neighborhoods.

A further explicitly noncertifying experiment holds each sampled coefficient over the preceding sample interval and integrates the resulting two-component linear comparison exactly by a matrix exponential. The analytic supplied-acceleration control returned the expected $(E_x,E_v)=(9,6)$ at time 3 before reading the target. Even with the positive complementarity contribution omitted, this experiment reaches $E_v=0.029360612466264743$ at $t=2.8675299569945354$, already above the required 0.001 allowance. The sampled coefficients there are approximately $L_x=18.21735$ and $L_v=3.30037$, while the sampled residual is only $4.73637\times10^{-9}$. Thus the crude absolute-norm comparison magnifies small defects severely in this diagnostic.

This is evidence about the proposed comparison calculation, not a lower bound on actual integration error and not a proof that every finite enclosure must fail. It does not justify claiming that the original trajectory lies outside the tail neighborhood. It identifies the next unresolved mathematical task: obtain a sharper validated finite-history enclosure that retains enough geometry or linearized error structure to avoid this scalar growth, while handling every source-kick event and root-domain condition. Repeating the same endpoint integrations or extending their horizons would not supply that missing proof.

The bounded assignment's conditional-theorem outcome is established: a sufficient complete-separation theorem, a checked seed-1 tail neighborhood with explicit finite-history allowances, a second numerical candidate, and approaching-pair perturbation bounds. Actual escape of either original release and actual coincidence of either approaching preparation remain unresolved. The finite-error route is retained with its accepted inequalities and exact open obligations; it has not been promoted to an admitted enclosure.

## Reproducibility and verification record

[Reproduction notes](overnight-d-reproduction-notes.md) give the local dependency boundary, exact commands and formula-version distinction. Every scientific input remains at its original path and the fixed input/subject hashes still match by `shasum -a 256`; the inherited implementation dependencies are separately identified with their later measurement boundary. Known-case controls precede the target calculations. Independent reviews cover the common-history theorem, source-clock limit, endpoint snapshots, external-six bound, split-history theorem, error-neighborhood interface, interval tail evaluation and smooth-bracket finite-error comparison.

A shared-venv `py_compile` pass covered the nine then-existing owned Python files, with bytecode directed to task scratch. One earlier syntax invocation mistakenly included the C++ source and failed as a Python parse; the corrected Python-only selection passed. This was a command-selection error, not a C++ defect. A known-case-first Node link check found all 27 local file targets in the five then-existing owned Markdown files, skipped fenced examples, and found no trailing whitespace; it did not check fragment anchors. Final expanded-scope checks and process closeout are recorded below.


Final scoped validation: shared-venv `py_compile` passed all 11 owned Python files. A known-case-first fenced-link extractor found all 44 local file targets across the nine owned Markdown documents; fragment anchors were outside its scope. Separate `git diff --no-index --check /dev/null <file>` calls covered all 21 owned durable files and produced no whitespace diagnostics, including files not yet tracked by Git. The independent interval checker's known controls and target receipt remain in its review; the unchanged C++ source had passed its rebuilt controls before every reported target batch. No regular test suite or generated owner was changed.

Owner-specific `owned-compute-supervisor.mjs closeout` returned `status: clear` for this chat at closeout. Each of the ten primary supervised scientific runs has a completed lease and `processGroupClosed: true`; the reviewer's interval run also has a completed, closed lease and independent owner closeout. No computation was handed off, and no other chat's processes were controlled. The local evidence directory occupied 47,756 KiB and scratch 1,132 KiB at the earlier `du -sk` measurement, before the last small review/diagnostic additions; these figures are allocation observations, not retention or recovery certification.

The 21 durable additions are all `overnight-d-` files in this analysis directory: the main report, reproduction notes, two theorem/error-development notes, five independent reviews, eleven small Python instruments and one C++ research instrument. Original inputs, shared priorities, ledgers, manuscripts, production code and other assignments were not edited by this task. No Git publication, linked worktree, generator rewrite, new equation or additional sidebar chat was performed.

Disposition: the conditional-theorem branch is complete and ready for parent assessment. The exact-fate successor is the finite-history enclosure described above, including its kick-event and interpolation-velocity obligations; it has no admitted certificate in this work. The approaching-pair successor still requires a preparation-specific delayed-range/present-distance argument or another actual coincidence proof. Those open scientific claims must not be marked closed by integration of this bounded report.

The existing `d-overnight-braid-research` heartbeat was paused through the app automation tool under the plan's early-completion clause; `rg` on its exact configuration verified `status = "PAUSED"` and this chat's target ID. No replacement scheduler was created. A known SHA-256 fixture passed before capturing the final 21-file identity manifest in local `overnight-d/closeout-manifest.json`; a repeated no-index whitespace check over all 21 files emitted no diagnostics. The manifest records durable source identity, not scientific acceptance.

## Finite-history successor selected by the operator

The operator's “do 1” selected development of a sharper finite-history enclosure, including source-kick crossings. This successor preserves the prior bounded closeout above as history. The [geometry-preserving comparison](overnight-d-finite-geometry-enclosure.md) replaces the first absolute scalar estimate with exact row derivatives in a receiver translation and a source-velocity addition. It sums signed receiver matrices before taking growth bounds, retains delayed source errors at their own emission times, and keeps a dissipative term from the existing normal-cone ceiling response. It is a residual-based comparison along a moving approximation, not a stability calculation about the unproved mirror balance.

The [new diagnostic](overnight-d-finite-geometry-screen.py) passed independent analytic static-source tensors, constant-velocity causal-quadratic derivatives, and oscillator cancellation before target use. A later circular-source chain-rule control also passed. The 1,024-step nominal screen first exceeded the velocity allowance at $t=45.99609375$, with weighted error $0.0010238837370674667$; the 2,048-step refinement first exceeded it at $t=47.16796875$, with $0.0010001913094922592$. Their respective measured target wall times were 6.2154 and 14.2784 seconds. Both stop before time 57 on a weighted-error threshold of 0.01. These screens omit complementarity and kick-mismatch terms, use nominal rather than interval matrices, and assume an unvalidated initial representation allowance. They are diagnostic failures of this particular comparison before the tail's earliest required cutoff $66.97634712446597$, not lower bounds on the exact numerical error.

The independently authored [kick checker](overnight-d-kick-crossing-independent-check.py) addresses a different missing obligation. Conditional on exact position error at most 0.1 and velocity error at most 0.001 relative to the retained Hermite path over the prefix, it covers all 56 source-kick fronts and 959,448 channel-segment boxes. The unique crossing brackets lie between $t=4.2550444523144675$ and $13.049751714957642$. Its interval lower bounds include receiver factor $0.6113348677974948$, range $4.233048922147843$, and left/right transmitter factors $0.6200165204364746$ and $0.6199671490483573$. The largest certified exact/reference event-time difference is $0.15636175382629533$. Thus no grazing or frozen kick clock occurs within this specified error region; the original one-sided law can be concatenated across these transverse fronts if the ordinary finite solution and error-region bootstrap are established.

The same independent instrument also treats the larger region needed by the translation comparison. It encloses the small analytic-past/stored-node join discrepancy and the right-velocity representation error, with uniform upper bounds $4\times10^{-12}$ and $4\times10^{-13}$ respectively. Translating only the negative-time comparison position history by the initial discrepancy makes that reference continuous; its derivatives and the positive Hermite path remain unchanged. This is a reference construction for error analysis, not a change to the original preparation. For scale $\alpha=0.2$, the independently checked common initial allowance $E_i=2\times10^{-12}$ covers the prescribed past and right trace. The earlier floating screens used the unshifted history and do not supply that initialization proof.

For each fixed reception, the affine receiver translation can meet the source-zero sphere at most twice. Accounting for both possible crossings, rather than only different endpoint source branches, gives a bounded integrated kick contribution on the certified enlarged front region. At translation radius 0.2 and velocity addition 0.001, the largest interval receiver sum is $7.69821865678055\times10^{-6}$. This contribution is an input to the error comparison and must still be propagated through the later dynamics. The [kick companion](overnight-d-kick-crossing-independent-review-2026-10-07.md) records the complete hypotheses, arithmetic receipts, and separate exact-front and comparison-front inventories. The [geometry review](overnight-d-finite-geometry-independent-review-2026-10-07.md) independently confirms the derivative, damping, and delayed comparison arguments. Its warning is retained: an integrated forcing allowance cannot simply be injected early and then allowed to decay before a possible later event.

Actual finite-history admission remains unresolved. This successor removes the unclassified kick-crossing and initial-join issues from the comparison construction, while exposing the remaining loss in absolute norms of the delayed source blocks. Completing an exact escape proof requires a validated bound that preserves more of the coupled delayed variation or an independently controlled reference with smaller residuals. Increasing a numerical endpoint would not discharge this obligation.

### Successor verification and bounded disposition

The independent proof review accepted the frozen smooth identities and supplied the reference-join, two-crossing, initialization, and kick-propagation qualifications now incorporated into the geometry note. The final interval inventory ran under supervisor `d4821fd1-7d5a-4510-b76b-23f1a286e166`, completed with exit zero in 1.388 supervisor seconds, and closed its process group. The earlier control and fail-closed diagnostic attempts are retained in the kick review. No failed box was silently accepted.

Shared-venv `py_compile` passed both new Python instruments. A known-case-first fenced-link extractor verified all 45 local file targets across the six successor-touched Markdown documents; fragment anchors were not checked. File-scoped `git diff --no-index --check` emitted no whitespace diagnostics across all eight successor-touched files. SHA-256 comparison against the prior closeout manifest confirms that its 18 untouched artifacts, including the original numerical subjects and independent oracles, retain their prior bytes; only the three intended existing summaries changed. The new kick checker's recorded source, primitive, and three input hashes match their files. These are scoped artifact checks, not an evolution certificate.

The successor added five durable files: the geometry derivation and its independent review, its floating screen, and the independent kick checker and review. It updated this report, the first finite-history note, and reproduction notes. The original phase's identity manifest and its validation receipts remain historical; a separate successor manifest records the new source state. Shared owners and production code remain outside the write scope.

Primary owner closeout returned `status: clear` after authorized process inspection, and the reviewer's closeout independently returned clear. The short primary screens exited normally; no computation was handed off. The existing heartbeat remains paused and no scheduler was added. Bounded successor closeout measured by `clock.curr_time`: 2026-10-07 01:06:02 UTC. This is completion of the sharper-comparison and conditional-event development, not completion of the original release's finite-history enclosure. The next mathematical obstacle is the remaining delayed-source error amplification, together with off-front root/matrix certification and residual integration on the joined reference.
