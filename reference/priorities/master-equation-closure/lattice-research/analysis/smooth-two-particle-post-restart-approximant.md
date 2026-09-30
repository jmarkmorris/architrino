# Target continuation after the population restart

## Fixed inputs and numerical boundary

The [constructor](smooth-two-particle-post-restart-approximant.py) extends the common-height target proposal from $15/4$ to the bounded endpoint $33/8$. It seeks the next positive-to-negative vertical-velocity crossing under the same supplied history, infinite alternating cubic lattice, $g=16$ and $c_f=1$. The [preceding independent adjudication](smooth-two-particle-population-restart-independent-adjudication.md) accepts actual complete-population continuation and strictly rising targets through $15/4$. The later interval requires its own continuation, full-law residual and propagated-error checks.

The incoming source table is the frozen complete population proposal through $13/4$: 504 environmental histories and the left target, with the right target stored separately. All 505 stored sources enter the conservative target candidate list. The right target is excluded from its own source list, and inactive source histories contribute zero. Selecting all stored candidates avoids a numerical range cutoff; independent first-excitation and causal-root analysis must establish that no omitted population identity has an active earlier emission. Every source query is rejected beyond $13/4$.

Every source node is copied unchanged. The right target retains all 3841 nodes through $15/4$ and appends to 4225 nodes at $33/8$, using the same grid $1/1024$ and exact-dyadic quintic interpretation. The left-target prefix remains its exact reflected counterpart. No environmental history is frozen or extrapolated beyond the available cut: the entire target suffix samples earlier, already constructed histories.

The numerical center includes the canonical transmitter-density changed rows and supplied-pulse rows. It omits the infinite stationary reference field only as a candidate-construction choice. The full unchanged stationary term must be included in the independent residual. The construction therefore supplies a polynomial comparison object, not an additional production solver or an actual-motion theorem by itself.

## Controls and bounded execution

Before target evolution, the controls compare a constant-velocity causal root and density row with an independent 70-digit closed form, reproduce a known quintic source history and zero generated past, reject future source queries, verify exact rational endpoint conditions, and locate the exact maximum of a constant-acceleration trajectory at time $1/2$ with height $1/4$. Previous reference instruments and arrays remain frozen.

The local outputs belong under the literal path `.local-data/master-equation-closure/post-restart/approximant/`. A `known.json` pass precedes `candidate.npz` and `candidate.json`; the latter records the full source order, zero cuts, history-domain margins, locator events, diagnostic polynomial norms, preservation checks and hashes. A numerical maximum would still require an independent negative-acceleration window and continuous velocity signs. Failure to find one by $33/8$ calls for a state and bounds report, not a claim that the requested maximum has been reached or that no later maximum exists.

## First bounded result through $33/8$

The constructor completed in 14.298 wall seconds with 11906 acceleration evaluations and five-second progress messages. It found no positive-to-negative vertical-velocity crossing. The candidate endpoint is

$$
z(33/8)=0.003906609125811917,\qquad
z'(33/8)=0.00819574033616655,\qquad
z''(33/8)=0.014498516935741172.
$$

At the appended grid nodes, vertical velocity ranges from $0.004685373595767277$ to $0.00819574033616655$, and vertical acceleration from $0.006893635953157292$ to $0.014498516935741172$. These are numerical observations, not continuous actual-motion sign enclosures. The target polynomial coefficient-sum diagnostics are $0.003906611638801873$ in position, $0.008195804998451623$ in velocity and $0.014499827363269395$ in acceleration.

The largest sampled emission time is $3.1290483152643085$, leaving $0.12095168473569151$ before the source cut. The smallest sampled range is $0.9959516847356918$ and transmitter factor $0.9997100018227514$. The root residual stayed below $8.881784197001252\times10^{-16}$. All prior source and target node-preservation checks passed. The frozen archive hash is `42a16db9065950150c2365d4c767b9a5f0c071f6a1069d7485e5637308107393`; the constructor hash is `c6d2595f959b08724d4843a90c9ee48723de2f2c951a914b8f9f0c7d352bb58c`. This bounded computation did not locate the requested maximum.

The non-evolving prefix diagnostic records all-source, environmental, partner and per-path position, velocity and acceleration bounds at every cut $90/32$ through $101/32$ in the local `prefix-norms.json`, with known controls in `prefix-norms-known.json`. These are continuous polynomial coefficient-sum diagnostics, not outward actual-history bounds. They support the separate search for a tighter continuation estimate without introducing another trajectory run.

## Next method-of-steps construction

The [history constructor](smooth-two-particle-post-restart-history-approximant.py) fills complete environmental histories from $13/4$ to $15/4$ using the already constructed 506 incoming histories through $13/4$. The targets through $15/4$ are copied from their accepted prior data. Its integer census adds 170 environmental labels in first-old shells 22, 24, 25 and 26, yielding 674 environmental paths plus both targets. Its measured candidate graph contains 19578 generated rows. The resulting source prefix supports a separate bounded target scout through $9/2$, provided every source-time query remains covered. The $33/8$ candidate remains unchanged and is also copied to named bridge files before this work.

The refresh uses each incoming history's exact early-zero cut to remove candidate edges whose anchor distance exceeds the remaining time plus a combined displacement allowance $1/32$. A runtime check enforces that allowance for each acceleration evaluation. An independently certified causal census remains necessary. This candidate selection changes no retained acceleration row and inserts no stationary-field replacement. The full-law residual must still recover the unchanged stationary sum.

Fresh controls passed before the graph enumeration and population construction: explicit integer-shell examples, the exact shell-25 lower onset cut, a hand-computed candidate graph with self-exclusion, exact quadratic Hermite interpolation and derivatives, stationary generated history, and rejection of a source query past the stored cut. The local `history-known.json` and `history-plan.json` retain those checks and the complete ordering. They establish the stated instrument controls; the independent full-law residual and continuation remain separate obligations.

The ongoing event search also measures environmental displacement against the original comparison-class ceiling $1/16$, and simultaneous distances between pairs occupying neighboring lattice anchors. These observations are numerical diagnostics until independently enclosed. A class-ceiling crossing would identify a boundary of this comparison argument, not failure of the Master Equation. Simultaneous distance reports stop at the common population-history endpoint; extending a target alone supplies no simultaneous future environment positions.

## Complete population through $15/4$ and target scout through $9/2$

The population refresh completed in 247.342 seconds. Every inherited node through $13/4$ was preserved exactly, as were the target histories through $15/4$ and the exact reflection defining partner index 76. The output is the local `population-h15-4.npz`, with SHA-256 `a58a3b76d5a13b0161de861cc809657d24f680d7237725b18156604fd34fc06e`. Its 675 source paths and separate right target all end at $15/4$. Its edges index the 505 previous source paths followed by the previous right target at index 505. The latest sampled emission was $2.7514202628001447$, below the incoming cut $13/4$ by $0.49857973719985527$.

The fresh-controlled, non-evolving diagnostics give environmental polynomial position and speed bounds $0.0013327618699310942$ and $0.004784578737260041$. These are coefficient-sum numerical bounds, not outward enclosures of actual paths. The largest sampled environmental displacement is $0.0013327618698831616$ at label $(1,1,0)$ and time $15/4$, or approximately $2.1324\%$ of the original environmental comparison ceiling. The smallest sampled simultaneous distance between neighboring lattice anchors is $0.9974068780619996$, between $(0,0,0)$ and $(0,0,1)$ at that same time. The distance helper includes stationary neighbors outside the represented population; its exact stationary and moving-neighbor controls passed before the target extraction. The local `population-diagnostics.json` states its sampled-time scope. Per-path and grouped prefix norms at every $1/32$ endpoint from $105/32$ through $120/32$ are in `refreshed-prefix-norms.json`.

Using the refreshed sources, the target scout completed in 28.992 seconds and found no positive-to-negative vertical-velocity crossing through $9/2$. Its endpoint is

$$
z(9/2)=0.008425836371441084,\qquad
z'(9/2)=0.018434032539149194,\qquad
z''(9/2)=0.06087223053769039.
$$

The latest sampled emission is $3.5088026433916584$, leaving $0.24119735660834163$ before the source cut. The sampled minimum causal range is $0.991197356608342$ and transmitter factor $0.9985772268047105$. The archive `target-h9-2.npz` has SHA-256 `8b390a4a33c89eb401fa04dd9aa94c250f37d85b4c1bc818a8274e342a59104f` and preserves the complete earlier target prefix. This remains a numerical proposal; neither this endpoint nor failure to locate a maximum establishes actual monotonic motion beyond the accepted interval.

## The next center includes the stationary cubic term

The next [bounded constructor](smooth-two-particle-post-restart-cubic-approximant.py) refreshes the complete population to $17/4$ and then scouts the target to $5$. Its known-controlled integer enumeration selects 834 environmental labels plus both targets, and 34254 generated candidate edges from the 676 incoming histories through $15/4$. It preserves those incoming nodes and uses the available target proposal for the reflected partner.

This constructor includes the explicit stationary acceleration approximation

$$
16\,a_0\,\mathbf T(\mathbf y),\qquad a_0=14.31433,
\qquad T_i(\mathbf y)=y_i^3-\frac32y_i\sum_{j\ne i}y_j^2.
$$

Here $\mathbf y$ is displacement from a lattice anchor. The [stationary-field derivation](smooth-two-particle-post-restart-stationary.md) supplies the infinite-series coefficient and the fifth-order remainder. The stated decimal $a_0$ is a declared numerical center, not a substituted physical law. The independent residual must include both $(a-a_0)\mathbf T$ and the full stationary remainder, multiplied by $g=16$. Exact axis and diagonal values of $\mathbf T$ were tested before running this new constructor. Keeping inherited acceleration nodes also preserves the exact $C^2$ joins where the new center begins; the residual, rather than a silent change of the inherited polynomial, measures that join's agreement with the law.

## Numerical explanation of the later upward acceleration

A non-evolving row extraction at $t=9/2$ reconstructs the candidate's generated acceleration contribution from its retained source polynomials. The positive vertical changed rows sum to $0.10162295210794682$, the negative rows to $-0.04075072157025645$, and their net is $0.06087223053769039$. The old supplied-pulse contribution is zero at that reception time. The largest upward changed rows come from the vertical neighbors $(1,0,1)$ and $(1,0,-1)$, contributing respectively $0.035577813436822196$ and $0.031376944329804035$. They sample emissions near $3.5088$ and $3.4912$, where those neighbors have negative vertical displacements and negative vertical velocities. The partner's generated contribution adds $0.01066668034536433$.

These quantities are changes relative to stationary reference rows. They do not describe the entire acceleration supplied by each individual neighbor, and their signs cannot be read as static attraction or repulsion alone. They explain the present numerical rise through the delayed geometry and transmitter-density factors. They do not establish actual acceleration signs without the independent full-law enclosure. The helper passed an independent constant-displacement kernel and causal-root control before evaluating the endpoint; `endpoint-rows-h9-2.json` retains every source label, sampled emission, source displacement and velocity, range, denominator and row.

In this numerical geometry, the upper neighbor's downward displacement strengthens its upward contribution, while the lower neighbor's downward displacement weakens its downward contribution. Their sampled transmitter factors, approximately $0.99858$ above and $1.00130$ below, reinforce this imbalance. Consequently both changed rows point upward. A turnaround cannot be inferred merely from the presence of a nearby lattice neighbor; its delayed position, velocity, polarity and denominator enter the actual acceleration row.

## Controlled RK4 proposals for later bounded stages

The [RK4 constructor](smooth-two-particle-post-restart-rk4-approximant.py) prepares subsequent half-unit method-of-steps stages using the same history grid and stationary cubic center. It applies the classical four-stage Runge–Kutta formula to the position–velocity state at spacing $1/1024$, then evaluates nodal acceleration. The saved shared position, velocity and acceleration nodes again define exact dyadic $C^2$ quintic comparison paths. All earlier nodes remain unchanged. The algorithm is a way to construct a comparison polynomial; only its continuous full-law residual, coupled with source-error and continuation bounds, can turn that polynomial into an actual-motion statement.

Before any target construction with this new instrument, independent controls reproduce constant acceleration, demonstrate fourth-order error reduction against the exact scalar solution $e^t$, and find the exact quadratic maximum at $t=1/2$ with height $1/4$. These controls are supplemented by the causal-domain, interpolation, graph, cubic-tensor and sampled class-crossing checks. They do not establish target convergence or physical accuracy. The record `rk4-known.json` precedes the first target use.

The RK4 stage graph uses a declared combined displacement allowance $1/8$ and checks it during every acceleration evaluation. That computational allowance is distinct from the original environmental comparison ceiling $1/16$. Every evolved environmental receiver is checked against that displacement ceiling and unit speed during each Runge–Kutta stage; the target is checked against unit speed. On the first detected boundary, numerical bisection by shortened RK4 steps records a time bracket and the offending path identity and state. Only completed uniform nodes preceding the boundary enter the archive. The metadata records the requested endpoint separately from the achieved endpoint, and a later stage refuses an incomplete input interval. The boundary bracket is a numerical proposal; an actual first crossing still requires independent continuous enclosures and the corresponding root analysis. The exact linear-speed and two-receiver displacement controls locate their known crossings before this stopping logic is used on the research paths.

## Population through $17/4$ and target through $5$

The complete polynomial population through $17/4$ contains 834 environmental paths plus both targets. Its frozen archive `population-h17-4.npz` has SHA-256 `d3b20784dcd8ce5665f2293ffd847fa3dc85179d035729e9aca411e3bb17e6c6`. The 34254 candidate generated rows use incoming histories only through $15/4$; the largest sampled emission is $3.2574799561169074$. The environmental position, speed and acceleration coefficient-sum diagnostics are $0.007099578859393912$, $0.023754649604115035$ and $0.0661039854706291$. The largest sampled environmental displacement occurs at $(-1,0,0)$ and reaches approximately $11.3593\%$ of the original displacement ceiling. The smallest sampled simultaneous neighbor distance is $0.9896720811194477$, between $(0,-1,0)$ and $(0,-1,1)$, at $17/4$.

The target scout through $5$ found no maximum. Its endpoint is

$$
z(5)=0.038028420580814196,\qquad
z'(5)=0.1355303676873786,\qquad
z''(5)=0.49682147983197905.
$$

The archive `target-h5.npz` has SHA-256 `5454057a486468b692e00ccc5b7d66900bf488f80bb88e80b99bf69853e002d5`. Its latest sampled source emission is $4.040831135351966$, below the source cut $17/4$ by $0.20916886464803408$. The target position diagnostic $0.03803016223993791$ exceeds the earlier auxiliary stationary radius $1/64$. This does not leave the original target comparison class; it requires the stationary remainder to be enclosed on a larger radius. The cubic stationary center is present, and all later motion remains numerical until the coupled full-law obligations are discharged.

## Accepted frontier and the target unit-speed candidate

The [class-preserving independent adjudication](smooth-two-particle-class-preserving-independent-adjudication.md) accepts actual complete-population continuation and strictly rising common height through $19/4$. The complete population's displacement, speed and acceleration are respectively below $0.043639265$, $0.173612594$ and $0.863730737$. The target comparison uses position, velocity and acceleration error budgets $0.00344$, $0.0184$ and $0.0936$. At $19/4$, the common height lies in $[0.012785475708099207,0.019665475708099244]$, vertical velocity lies in $[0.032026026975332335,0.06882602697533245]$, and vertical acceleration exceeds $0.121641686$. Vertical velocity remains positive throughout the new interval $[9/2,19/4]$. Consequently the requested next maximum has not yet occurred within the accepted interval. The later polynomials and both class and speed boundary markers remain numerical proposals; no actual boundary event is asserted.

The complete population proposal through $19/4$ contains 1068 environmental paths plus both targets, with 60768 generated candidate rows. It stayed below both numerical event guards. Its environmental position, speed and acceleration diagnostics are $0.03135684113998941$, $0.08438020501963865$ and $0.23539112021715974$. The largest sampled displacement, at $(-1,0,0)$, is approximately $50.1709\%$ of the original environmental ceiling. The smallest sampled simultaneous neighboring-anchor distance is $0.9561353413635211$, between $(0,1,0)$ and $(0,1,1)$. The archive `population-h19-4.npz` has SHA-256 `553a4321d0b84fa3afa89417d1f94ac87fabb96ad3a4d7af8252ef00f7a55266`.

The next target construction reached its numerical unit-speed guard before its planned endpoint $11/2$. The separately refined numerical bracket is

$$
t_{\mathrm{speed}}\in[5.471436805091798,5.471436806023121].
$$

Immediately before that bracket's upper side, the refined comparison state has $z\approx0.22211002676672753$, horizontal velocity approximately $0.03067501230084149$ and vertical velocity approximately $0.9995294100233858$. Unit speed refers to the full velocity norm. The uniform archive stops earlier, at $2801/512=5.470703125$, where $z=0.22137847023642443$ and the velocity norm remains below one. No vertical maximum was located in the saved polynomial prefix. The latest checked source emission is $4.715163497230404<19/4$.

The file `target-h11-2.npz` is named for the requested endpoint; its manifest states the achieved endpoint $2801/512$ and the candidate boundary separately. Its SHA-256 is `aa85b798144f2c56641fa9e718de7630da9c4fc45e89ffac10485b77d840b38d`. No trajectory after the speed guard is stored. The kernel construction omits positive self roots under its subunit-speed applicability condition, so passing this boundary requires a new causal-root analysis. The numerical bracket is neither an actual speed-crossing certificate nor proof that a positive self root appears at exactly that time.

For this final target-only stage, every one of the 1069 incoming source paths is retained as a generated-row candidate, including the reflected partner. The target's own identity is excluded. The no-self-root implication follows directly while the complete intervening path has speed bounded by some $v_*<1$: for $s<t$, $|X(t)-X(s)|\le v_*(t-s)<t-s$, so the self-root equation cannot hold. Reaching unit speed removes this strict argument; it does not itself establish a positive self root. The finite generated list is accompanied by the supplied old-history rows and the stationary cubic center, with the unchanged infinite stationary sum left to the independent residual enclosure.

An initial report attempt failed after writing this archive because NumPy's polynomial root routine rejected the extended-precision coefficient type. The earlier quadratic known case did not enter that linear-algebra branch. An added exact quartic known case passed after converting locator coefficients explicitly to binary64. Recovery reconstructed the manifest and boundary from the saved prefix without reintegrating or rewriting the archive; reconstructed node values were checked against the stored arrays. The source used for the original construction is retained under the local `instrument-sources/14009bec89a42283f29ebf884713471febd4be982b721e51a26175a04725451f.py`, while the recovery receipt records the updated instrument. These are numerical instrument controls, not substitutes for the independent residual proof.

## Earlier environmental comparison-boundary candidate

The final authorized population-only refresh was requested through $21/4$, with stopping at the first numerical environmental displacement $1/16$ or unit speed. It stopped at the displacement guard for the environmental identity anchored at $(-1,0,0)$, source index 11, with numerical bracket

$$
t_{\mathrm{environment}}\in[5.022064637392759,5.022064638324082].
$$

Its refined pre-boundary displacement is approximately $(0.0006540547731807083,0,0.06249657751007984)$ and velocity approximately $(0.0018931418672008735,0,0.14774777587469418)$. The first rejected trial has displacement norm $0.06250000004256966$. Only completed uniform nodes through $2571/512=5.021484375$ are retained. Thus the environmental comparison-class candidate precedes the separately constructed target unit-speed candidate. This numerical ordering identifies which assumption needs attention first; it proves neither an actual class exit nor a breakdown of the Master Equation. In particular, leaving the present displacement class would call for a larger comparison domain and its accompanying stationary-field and causal-graph bounds.

The frozen local archive `.local-data/master-equation-closure/post-restart/approximant/population-h21-4.npz` has SHA-256 `b8c445020bbfe88dc3cd13830841050f7d056a81945692df0755e127866ca988`. The filename records the requested endpoint; the manifest records the achieved endpoint. All inherited source nodes through $19/4$ are preserved, and both target histories are copied from the earlier frozen target proposal, with the partner obtained by exact reflection. The saved environmental coefficient-sum position, speed and acceleration diagnostics are $0.06241430588980088$, $0.1702907351831896$ and $0.5572670797624634$. They are numerical polynomial diagnostics, not outward error enclosures of actual paths.

The constructor represents 1348 environmental paths and both targets because its prospective census was prepared for $21/4$. The separately controlled integer census finds only 1172 environmental identities inside the direct first-onset front at the achieved endpoint, hence 1174 including both targets; the remaining 176 environmental paths are exactly zero in the saved position arrays. The exact first-shell threshold is 40. The local `final-census.json` retains the shell-by-shell counts. These are counts within the numerical table; applying them to the actual population also uses the separate first-excitation theorem.

The environmental candidate graph contains 97148 generated rows. Each edge identifies a current environmental receiver and one of the 1070 incoming histories through $19/4$. Equal receiver and source anchors are excluded. The latest sampled source emission is $4.086346523539183$, leaving a stored-history margin of $0.6636534764608166$. The observed combined displacement is $0.0938568410449473$, below the graph allowance $1/8$. Every evaluated positive root was required to have positive range and transmitter factor; their measured minima were $0.9357181138535764$ and $0.9868870753700836$. These runtime checks do not prove completeness of the actual and comparison root graphs. That completeness, including trial-only rows, remains an independent residual obligation. The own-root exclusion relies on subunit speed over the applicable histories and therefore cannot be carried through the later unit-speed candidate without a new analysis.

A known-controlled, non-evolving extraction evaluates the already frozen target polynomial at both ends of the environmental bracket. The common height lies numerically between $0.04114272743857141$ and $0.041142727575378235$, and its vertical velocity between $0.14689520380863064$ and $0.14689520430582045$. These are evaluations at two candidate times, not rigorous enclosures of the trajectory or event. The target speed is approximately $0.146899$. The extraction passed an exact vector-quartic position, velocity and acceleration control before reading the target archive; its local receipt is `boundary-state.json`.

The smallest sampled simultaneous distance between neighboring lattice anchors through the saved population endpoint is $0.8970957352024234$, for $(0,-1,0)$ and $(0,-1,1)$ at $2571/512$. The numerical environment is therefore appreciably displaced while this sampled neighboring pair remains well separated. This is a sampled-time result for anchor-neighbor pairs, not a continuous all-pairs clearance certificate. The local `population-h21-4-diagnostics.json` records the geometry and the independent stationary and moving-neighbor controls. The population refresh stops before its displacement guard, and the earlier target-only scout stops before its own speed guard. That target-only prefix was constructed from older source histories; it supplies no simultaneous environmental continuation after the saved population cut. No additional numerical stage is part of this bounded construction.

## Final illustration and operational closeout

The static scientific figure is retained at the local path `.local-data/master-equation-closure/post-restart/approximant/diagnostics/common-height-boundaries.png`, with an SVG sibling. It separates the independently accepted interval through $19/4$ from the later numerical target curve, enlarges the earlier four turns in an inset, and places the environmental displacement and target unit-speed candidates in separate lower panels. The receipt `diagnostics/plot-receipt.json` binds the trajectory archives, independent assessment, sign and turn receipts, plotting source, and output images. Fresh exact-quadratic interpolation, known-norm and outward-rounding controls passed before rendering. The figure is a visualization of those records; it adds no dynamical acceptance.

The scoped operational receipt `.local-data/master-equation-closure/post-restart/approximant/compute-closeout.json` reports all ten supervised leases belonging to this constructor family as terminal with closed process groups. It uses the canonical supervisor's per-run status after filtering by the shared owner and four exact constructor filenames; parent and sibling jobs are excluded and unchanged. The final guarded population run completed in 413.445 seconds with exit code zero. Operational completion establishes no scientific claim beyond the saved records. The next maximum remains unfound, and actual-event or later-motion claims require the coordinator's independent full-law enclosures and review.
