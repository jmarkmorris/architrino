# Independent six-member Surface recurrence design review

## Scope, inspected state and disposition

The display assignment is `surface-004 recurrence design review`, retaining worker/session identity `01a12837-6640-7931-a21d-8eafdd30f1e3`. The operator selected definition of the experiment, with Root's work window 10:48:30–16:48:30 UTC on 2026-10-18. This review evaluates the mathematical criterion and implementation feasibility; it is not forward evolution or a worker computation lasting six hours. Root owns integration. This reviewer writes only this record and explicit-use scratch controls under `.tmp/surface-recurrence-review/`.

**Claim grade: measured.** The repository `receive-file` dispatcher returned verified payload `78f4a5b3-9a2f-4ffc-b67f-06963a393e57`, with payload SHA-256 `f0b57988ee7d27ee523d5d74d5a4e8201945de4d1523e1a9495a3007e56718bd`. Before target review or edits, `shasum -a 256` matched all three dispatched source identities: [experiment packet](recurrence-experiment-2026-10-18.md) `0c75f7744f360d767cd5851fe1c9976fb9a30b145d6a947e81c188d6ebfd3fb1`, [manuscript](../manuscript.md) `a5232e57b6589fe46ef87484c377e74242f0ea6fd28110aa0cc0cb52705bd478`, and `src/eom/src/SurfacePublication.cpp` `32c6b2f2a08448c754768555e69b801773e6c753d2fecb65de0287f0426f5bc9`. The first attempted dispatcher invocation failed before delivery because it had an extra trailing argument; the corrected invocation supplied the assignment. These hashes identify the reviewed baseline, not future immutability of Root's evolving files.

**Disposition:** the full-history return definition is mathematically coherent and suitable for an explicit-use readout after the concrete repairs below. It does not establish an executable long campaign. In particular, the unchanged 0.01 base step cannot reach the minimum repeated-return horizon under the current cumulative attempt/memory contract, and its 0.005 refinement cannot reach even the proposed first anchor. A separately specified larger-step calibration is a conditional option, not a demonstrated capability. No recurrence, stability, physical confinement, new solver capability or new scientific acceptance is established here.

The review follows the live [core geometry review procedure](../../../office-of-research/cto/prompts/core-geometry-theorem-reviewer.md), with the explicit assignment overriding its default read-only capture restriction for this separate record. No external literature, standard-physics premise, production source edit, browser action, EOM run, regular-test enrollment, new agent, generator write or publication is used.

## What the design gets right

The packet compares six complete recent histories, including position and velocity, rather than six simultaneous positions. It fixes the model, preparation, shape, polarity and allowed coordinate identifications. One common transformation acts throughout each window. It distinguishes exact symmetry from decimal phases resembling a hexagon, constrained motion from free assembly motion, numerical uncertainty from physical thresholds, and finite returns from attraction or stability. The actual [v2 contract](../../app-solver/contracts/evolution-contract-v2.md) supports the intended exact polynomial/error data and original-preparation-bound continuation; it does not authorize history pruning, changing controls on resume, generic cubic preparation or unsupported chart transitions.

These distinctions are necessary. A compact surface bounds positions but does not supply an invariant probability measure, a globally regular history flow, a velocity bound for all time or a recurrence theorem. The history state is a function on an interval, not a point in the compact surface. Even a trajectory that slows monotonically toward a limiting position can pass a fixed finite-tolerance return test at many lags without having an oscillation period. No compactness or conservation theorem is imported into this review.

## Causal memory and chart eligibility

### A sufficient recent-history bound

**Claim grade: derived.** Assume every relevant true emission and reception position lies in an ambient ball of radius $B_*$, use $c_f=1$, and retain the selected sharp root equation $T-S=\|\mathbf X_i(T)-\mathbf X_j(S)\|$. Every positive-delay root has $T-S\le2B_*$. For the selected tube radius bound $B_*=0.1501$, the upper delay bound is 0.3002. Thus $\tau=0.31$ is conservative. This is an ambient chord argument; travel along the torus surface is irrelevant to the emitted wake distance.

For fixed reception time $T$, define $f(S)=T-S-\|\mathbf X_i(T)-\mathbf X_j(S)\|$. If the coherent source speed is at most $u<1$, the reverse triangle inequality gives

$$
f(S_2)-f(S_1)\le -(1-u)(S_2-S_1)<0\qquad(S_2>S_1).
$$

This finite-difference argument remains valid even when a distance derivative is unavailable. At $S=T-\tau$, the radius premise gives $f(S)\ge\tau-2B_*=0.0098>0$. Positive simultaneous partner separation gives $f(T)<0$. Continuity and strict monotonicity therefore give exactly one strictly past partner root in that recent interval. For the self path, coherent speed instead gives $f(S)\ge(1-u)(T-S)>0$ for $S<T$, excluding positive-delay self roots without deleting roots by policy. The root-floor and regularity conditions required by the acceleration evaluation still need their own certificates.

The older-tail condition is indispensable: unprovided emissions older than the window are excluded only if those older positions also obey the stated ambient bound. A bounded future cannot constrain unknown older emissions. If that premise is absent, label the result as a declared-retained-memory experiment rather than globally complete history. The bound also does not grant checkpoint pruning: current persistence requires the full original preparation and accepted carriers.

The window $[t-\tau,t]$ contains generated future history when $t\ge\tau$. For accelerations throughout that window to receive generated emissions, the sufficient condition is $t\ge\tau+2B_*=0.6102$; the packet's $t\ge2\tau=0.62$ is slightly more conservative. Its anchor $a=1$ therefore has the intended eligibility, conditional on actual accepted coverage and chart certificates. Existing 0→0.15 archives cannot supply that window.

**Falsifiers:** an actual contributing position outside the admitted ball, a missing interval, failure of coherent subwake speed, simultaneous partner contact or an unbounded unprovided tail defeats the corresponding conclusion. Inspect the complete radius/speed/root certificates and declared older-tail assumption, not a nominal surface label or point-root count alone.

### The stronger implementation condition

Direct reads of `SurfacePublication.cpp::slab_interaction` show an additional method-of-steps requirement: all partner emissions must lie strictly before the accepted whole-step start. `certify_surface_publication` passes that same whole-step start to both retained half-segments. Subwake speed and a diameter bound do not by themselves establish this stricter step gap.

**Claim grade: derived.** If simultaneous partner separation throughout a step is at least $d_*>0$ and source speed is at most $u<1$, a root delay $\delta$ satisfies $\delta\ge d_* /(1+u)$, because simultaneous separation is at most the delayed separation $\delta$ plus source travel $u\delta$. Therefore a step shorter than that lower bound is sufficient for the gap, subject to the actual full-slab enclosure. Shrinking separation can force smaller steps even while speed remains well below 1. Conversely every valid whole step must be shorter than the maximum partner delay, hence shorter than 0.3002 under the selected radius premise. This is a necessary upper bound, not a recommendation to use a step close to it.

The full-slab production gate supplies coherent-solution inclusion and true source-acceleration bounds; pointwise reference residuals do not re-prove that existence result. `ProviderTransport.cpp` exposes accepted `surfaceSolutions`, `accelerationBound`, `solutionSpeedUpper` and complete polynomial/error tokens. Those records are the suitable premises for coverage, chart and continuous-window readout. Rounded app summaries and sampled diagnostics cannot replace them.

## Full-history comparison and symmetry

Let $H_t$ collect all six true position/velocity paths on $[-\tau,0]$. Use the packet's metric: position discrepancy divided by $\ell=0.15$ and velocity discrepancy divided by $c_f=1$. Taking the maximum over all members and the whole window is a valid nonsingular comparison even at zero speed. Nominal polynomial derivatives provide nominal velocities; independently published velocity error bounds must still be applied. Derivatives of position error tokens do not supply velocity errors.

For the selected centered torus, use one proper axial rotation $Q=R_z(\alpha)$ and one polarity-preserving permutation $\pi$. There are $3!3!=36$ such permutations. A sphere can use $SO(3)$; an oblate spheroid or torus cannot inherit arbitrary sphere rotations. For a nontrivial fixed orientation, conjugate the body-axis subgroup by the recorded orientation. In every case the admitted transformation must preserve the actual geometry, rather than a convenient drawing. Coordinates must use the recorded fixed center.

**Claim grade: derived.** Rotations preserve the norm and dot-product root/kernel data; matching relabeling preserves polarity products and the shared model parameters. The defining surface's normal and differentiated constraint transform covariantly when the rotation preserves the shape. Thus the selected sharp constrained equation is equivariant under these constant transformations on its regular chart. Time-dependent rotations add derivatives to velocities and accelerations, and are not permitted by that argument.

For $(gH)_i=QH_{\pi(i)}$, rotation and relabeling act on different indices, giving $(g^kH)_i=Q^kH_{\pi^k(i)}$. This must be applied to the entire recent window, including velocity and its uncertainty. Exact all-history equality plus older-tail exclusion and local continuation uniqueness supports continuation equivalence. Approximate finite equality supplies no theorem of exact future periodicity or stability.

### Required distinction between repeated comparisons

**Finding R1 — ○ Required clarification/repair.** The baseline packet asks for $H_{a+P}$ close to $gH_a$ and $H_{a+2P}$ close to $g^2H_a$, both at tolerance $\epsilon$, while describing one common per-return transformation. Those two tests imply only a $2\epsilon$ bound for $H_{a+2P}$ versus $gH_{a+P}$. The scalar example $H_a=0$, $H_{a+P}=\epsilon$, $H_{a+2P}=-\epsilon$, $g=I$ attains that factor of two. Either explicitly call the selected criterion two returns to one transformed anchor, or additionally require the consecutive-window test $H_{a+2P}\approx gH_{a+P}$ at the same thresholds. The stronger three-comparison rule is recommended because it tests the stated common increment directly. Distinct refitted transformations cannot substitute for powers of one fixed $g$.

**Finding R2 — ○ Required wording repair.** The three windows are disjoint because $P\ge1>\tau$, but disjoint observations in one deterministic delayed trajectory are not statistically independent trials. They share an anchor, history and dynamics. Use “disjoint observed comparison windows” and preserve the finite repeated-observation grade; do not assign an independent-replication probability from their number.

## A sufficient continuous-window enclosure

The strongest immediate theorem target is an enclosure for a fixed candidate, not a global stability or recurrence theorem. It can be established from already retained data without integrating another equation.

**Claim grade: derived.** Partition the comparison window at every retained boundary on either side after the exact time shift. On each common cell, express the two nominal cubic centerlines in one local time coordinate, apply the fixed rotation and permutation, and subtract. The squared position discrepancy has degree at most six; the squared velocity discrepancy has degree at most four. Exact rational decimal coefficients and a rational proper rotation make these polynomials exact rational data. Conversion to Bernstein coefficients on the cell encloses the polynomial range, since Bernstein basis functions are nonnegative and sum to one. Subdivision tightens the upper bound. Exact evaluated witness times provide lower bounds; the minimum Bernstein coefficient is not a lower bound for the maximum tight enough to replace these witnesses automatically.

Let $m$ bound a nominal maximum from below and above by $m_-,m_+$, and let $E$ bound the sum of both trajectories' Euclidean error radii on the cell. Then

$$
\max(0,m_- - E)\le \sup\|\mathbf X_B-Q\mathbf X_A\|\le m_+ + E.
$$

The same argument applies to velocities with their own radii. A simple valid $E$ is the sum of the two Euclidean norms of the component-error vectors, because a proper rotation preserves Euclidean norm. Alternatively, a transformed component box uses $e_B+|Q|e_A$, followed by its norm. Reusing raw unrotated component maxima without either argument can undercount error. Use a certified square-root enclosure; a floating-point square root is not exact rational arithmetic.

Taking maxima across cells and members gives the full-window interval. Compare absolute position bounds to $\ell\epsilon_X=0.00015$, with allowed interval width at most 0.000015. Compare velocity bounds to $c_f\epsilon_V=0.0001$, with width at most 0.00001. Bounds above a threshold prove rejection of that fixed candidate; overlapping bounds or excessive width are unresolved. Actual emitted errors, not requested tolerances, determine whether the width rule is achievable. A nominal match does not waive the rule.

If the rotation is fitted numerically, either replace it by an explicitly represented exact proper rotation that is then held fixed, or bound its operator-norm discrepancy from a proper rotation. The packet's additions $\eta_QB_X$ and $\eta_QB_V$ are correct by the operator norm inequality. Powers $Q^k$ need their own exact representation or propagated error; a certificate for $Q$ alone cannot silently be reused unchanged for $Q^2$.

Every visited cell must have complete accepted coverage and valid error bounds. Nominal adjacent cubics need not join with exact equal decimal endpoint derivatives: the certified coherent trajectory is the common object within their tubes. Conversely simple overlap of endpoint tubes is not independent proof of coherent solution existence. Keep the production inclusion/provenance premise explicit, and include both sides of a retained join in the enclosure.

**Finding R3 — ○ Required kernel-result repair.** Read-only inspection of Root's `window-bounds.mjs` at SHA-256 `970af45f5958125a5fa14e06f4a2bd5ecd004a12f1c12ebe4d3a48e09ddeecc6` found that cell-budget exhaustion returns an upper bound calculated only over completed cells, despite unvisited cells remaining. The status is unresolved, so this does not create a false passing result, but that number is not an upper bound for the entire window. Return an explicit unavailable/unbounded upper bound and `fullCoverage: false`, while retaining a valid lower witness and any rejection established by it. A partial maximum must never be labeled the full-window enclosure.

**Finding R4 — ○ Required adapter boundary.** The same inspected kernel accepts physical threshold arguments, not normalized metric thresholds; its default position threshold 0.001 must not be passed through as the torus's normalized 0.001. The future adapter must supply the absolute 0.00015 threshold or normalize bounds explicitly. It must enforce generated-window eligibility, $P\ge1$, both return powers, original model/preparation/accepted-only bindings, and actual geometry. Its present axial guard names `oblate-spheroid`, while the v2 wire kind is `oblate`; the adapter must normalize or reject that mismatch. The mathematical kernel alone does not enforce these scientific or transport premises. An arbitrary proper rotation is not sufficient for an oblate or torus claim.

## Aliasing, lag search and persistent rotation

**Claim grade: derived.** Fixed sampling can miss continuous discrepancies even when both position and velocity agree at every sampled instant. A $C^1$ piecewise-cubic bump rises with $3u^2-2u^3$ between times 0 and 1/4, falls with its reversed form between 1/4 and 1/2, and stays zero afterward. Its value and derivative vanish at times 0, 1/2 and 1, while its interior displacement is one. The retained piecewise-cubic class therefore does not make a coarse position/velocity grid a continuous certificate. The exact control below checks the bump and zero endpoint derivatives; it is a readout counterexample, not a prescribed solution of the delayed equation.

For a rigidly rotating candidate $\mathbf X_i(t)=R_z(\Omega t)\mathbf a_i$ with $\mathbf V_i=\Omega\mathbf e_z\times\mathbf X_i$, every lag satisfies $H_{t+P}=R_z(\Omega P)H_t$. A relative return at all lags identifies a possible relative equilibrium, not a fundamental period. This is a kinematic counterexample; the trajectory would still need its full delayed-equation residual checked before being called a solution. A symmetry stabilizer, meaning transformations leaving the history unchanged, can also make fitted rotations/permutations nonunique. Decimal near-hexagonal phases do not establish an exact stabilizer.

**Finding R5 — ○ Recommended readout clarification.** Retain activity/excursion and lag-band information alongside every accepted finite return. Near-stationary motion or a broad low-discrepancy band must not acquire an oscillation frequency from the smallest searched lag. Distinguish position-distribution organization from identified-member returns. Pair-distance summaries can aid discovery but also discard orientation and identity information; only the full fixed-proper-transformation audit establishes the selected return claim.

An exact decimal lag selected from discovery is a definite candidate, even when discovery used floating-point fits. A pass certifies only that candidate, not an interval of nearby lags or its optimality. If lag or anchor uncertainty is retained, propagate it through true velocity/acceleration bounds over enlarged accepted coverage; derivatives of nominal error tokens do not provide these bounds. For lag perturbation $\Delta P$, a sufficient discrepancy inflation for the $k$th return is $kM_V|\Delta P|/\ell$ in position and $kM_A|\Delta P|/c_f$ in velocity, using certified true speed/acceleration maxima over the swept intervals. Missing enlarged coverage is unresolved.

The same estimate can bound fixed-transformation lag-grid gaps. It cannot exclude all rotations/permutations from one locally fitted transformation. A no-candidate grid result must retain its tested anchors/lags/transforms, resolution and horizon. A fundamental-period claim needs a separate continuous exclusion problem, including symmetry degeneracies. The baseline packet correctly defers that stronger claim.

## Execution feasibility under the live interface

**Claim grade: measured.** Direct reads of the existing `surface-torus-run.mjs` request constructor show `maximumStep: 0.01` for base, 0.005 for half-step/tight variants, `maxStepAttempts: 80`, `maxRejectedSteps: 20` and the v2 maximum memory allowance 2 GiB. `CoupledEvolution.cpp::validate_request` checks cumulative initial accepted/rejected counts against the same attempt budget. The v8 contract binds numerical/resource controls to the original request. Resuming shorter chunks therefore does not reset the budget, and changing that budget on resume is not an existing branch capability.

**Finding R6 — ○ Required campaign-feasibility repair.** Reusing the base attempt limit cannot reach $T=1$: at least 100 accepted steps are needed with maximum step 0.01. The half-step variant needs at least 200. The minimum repeated-return endpoint is $a+2P\ge3$, needing at least 300 base or 600 half-step accepted steps before allowing any rejection. The previous budget 80 is insufficient for all of these goals. It must be explicitly replaced before initial admission, not silently refreshed by checkpoints.

Raising that limit encounters a second boundary. Direct source inspection shows the six-path Surface carrier reservation includes

$$
6\cdot512\cdot7\cdot(\operatorname{sizeof}(\texttt{SurfaceReceiverDiagnostic})+512+2)\cdot(A+1),
$$

where $A$ is the configured maximum attempt count and 2 is the largest `p0`…`p5` identifier length. Root's retained known-static-assert-first ABI measurement at `.local-data/eom/surface-recurrence-design-2026-10-18/admission-size.stdout.log` reports diagnostic size 376, history-segment size 936 and string size 24. Independently substituting the diagnostic size into the inspected formula gives 19,138,560 bytes per $(A+1)$. The carrier term alone is 2,143,518,720 bytes at $A=111$, below 2 GiB by only 3,964,928 bytes; at $A=112$ it already exceeds 2 GiB. All other working-set terms consume additional allowance. Thus 111 is only an optimistic ABI-specific upper bound, not an admitted budget or resident-memory measurement. Even ignoring the ABI size entirely, the fixed 512-byte component alone gives the weaker universal optimistic bound $A\le194$ for this six-path formula.

The $T=1$ base pilot might be admissible with at least 100 attempts and limited remaining headroom, but only actual complete-request admission can establish it. No feasibility forecast follows from the bound. The 0.005 refinement to $T=1$, and both base/refined executions through the minimum repeated-return horizon, are impossible under this unchanged attempt-reservation contract. Increasing the step changes numerical design and needs its own qualification; it is not a way to claim the original refinements completed. Moreover, the necessary step bound below 0.3002 implies at least 214 accepted steps to reach 64, already above even the optimistic universal cap. The later 64/128 goals are unavailable in this chart/resource combination, not simply unknown in wall time.

**Recommended decision:** separate a conditional base-only feasibility pilot from a complete recurrence campaign. Keep all forward execution deferred under this design-only assignment. Before selecting a campaign, resolve an explicit resource/persistence/cumulative-budget design or select and qualify a genuinely executable different numerical protocol. Do not introduce a second solver, prune carriers, reseal modified checkpoints, reset counters or change the acceleration law to make a desired horizon appear reachable.

Actual cost and response sizes remain unmeasured for the longer horizon. The v2 contract's 32 MiB symmetric checkpoint budget, direct/server transport framing, 256 MiB retained raw cap, 12 MiB projected playback cap and 2 GiB record-directory admission can independently halt persistence or consumer delivery. Streaming stdout avoids a client buffer, not a response cap or quadratic proof-carrier reservation. Preserve accepted-prefix data and nondurability failures explicitly. Future budgets must name the selected transport and record/checkpoint ownership, rather than assuming app and raw CLI limits are interchangeable.

## Independent mathematical controls and evidence boundary

**Claim grade: measured.** Before opening the target packet/manuscript/chart, `node .tmp/surface-recurrence-review/math-controls.mjs` exited 0. Its stdout is retained as `known-controls.stdout.json`, stderr as `known-controls.stderr.log`, with `status: passed`, `targetReads: 0` and `productionImports: 0`. `shasum -a 256` froze the source as `696f23c6963ddb6f5297670466414a5a50897f9b3718d2f2776ccb9ce918a580`. It was not modified after target review began. The source uses BigInt rational arithmetic and no production imports; it does not read trajectory targets or compare against generated solver output.

The known controls establish exact rational arithmetic, an endpoint-invisible quadratic excursion, exact Bernstein subdivision of that excursion, the coarse-grid-invisible $C^1$ piecewise-cubic bump, a position-only velocity negative, pass/reject/unresolved uncertainty decisions, a polarity-preserving three-cycle's second/third powers and explicit sphere diameter/subwake constants. The proofs and counterexamples in this review are the independent mathematical reference. These controls support the named readout mechanisms only; they do not validate Root's whole implementation or any delayed evolution. The source review findings above are separately derived from the named inspected code, not inferred from a matching output flag.

## Completion and remaining ownership

✓ Done — Bounded mathematical design review, causal-memory proof, fixed-transformation/group-power analysis, continuous polynomial/tube enclosure argument, false-positive controls and current-interface feasibility assessment are captured here. Root received the actionable findings during review. The baseline definition can be retained at finite-return grade. The revision review below records source-level repairs; remaining scientific-adapter and campaign conditions must be explicit before a complete executable design is claimed. R5 is a recommended interpretation/readout safeguard.

○ Root integration — Integrate the selected repairs into the owning packet/manuscript and explicitly distinguish a conditional base pilot from the currently unavailable full base/refined recurrence campaign. Root owns final source snapshots, readout implementation, resource decisions and retention of useful scratch instruments/receipts. This review does not close those integration duties or authorize future execution.

The strongest next rigorous foothold is the fixed-candidate continuous-window enclosure lemma and its independently falsifying controls. A full return measurement then requires frozen executable requests, accepted generated windows, newly reached trajectory qualification, fixed candidate manifest, complete enclosure coverage and an executable confirmation protocol. No such interacting recurrence measurement has been made by this review.

## Bounded revision review

**Claim grade: measured.** A subsequent `shasum -a 256` and direct read of Root's evolving `window-bounds.mjs` identify snapshot `4c9af015145b22a198a38c599ea56926f7c3bee6458fb0e7543c09ead096678b`. The original bound packet still had its dispatched hash at that read. The independent control source remains hash-identical to its pre-target freeze. These observations name the inspected states; they make no claim about later modifications.

✓ R1 code repair — `auditRepeated` now computes both transformed-anchor comparisons and the adjacent $H_{a+2P}$ versus $gH_{a+P}$ comparison at the same thresholds. Group powers are exact rational matrix multiplication and permutation composition. This resolves the source-level factor-of-two ambiguity; Root owns matching packet wording. The scalar counterexample above remains a useful independently specified negative control for that adapter, rather than relying only on a constant-history positive case.

✓ R3 code repair — Exhausted `auditPair` output now returns `null` for each upper bound while retaining a lower witness, with `exhausted: true`; its status cannot become a match on incomplete traversal. This is a sound explicit unavailability representation for the full-window upper bound.

◐ R4 code repair and scientific boundary — The new wrapper scales normalized position thresholds by extent, requires numerical field speed 1, checks the conservative anchor arithmetic, excludes overlapping/short lags and uses consistent group powers. The axial guard recognizes actual `oblate` wire kind. These changes resolve the named arithmetic/interface mismatches. Caller-supplied `memory` and `extent` are not themselves proofs of the causal radius bound or model geometry, and array coverage is not coherent-solution provenance. The source must therefore remain labeled a conditional mathematical readout until a frozen-record adapter binds those premises. No interacting target or full transport adapter was exercised by this reviewer.

◐ R2/R5 integration — The repeated-readout scope string now calls the windows “disjoint, dependent” and explicitly disclaims a fundamental period, stability and equation qualification. Root owns the integrated explanation, activity/lag-band reporting and final protocol selection.

**Conditional calibration option.** Root proposed maximum steps 0.06 and 0.03 with 110 cumulative attempts as a separately declared base/refined calibration through $T=3$. These need at least 50 and 100 accepted steps, respectively, so they do not have the unchanged 0.01/0.005 attempt-count impossibility. They change numerical resolution, not the selected equation. The full request's initial memory estimate, proof workspace, method-of-steps gap, accumulated error widths, raw/checkpoint sizes and independent delayed-equation qualification are still unverified. This option is mathematically legitimate to design; it is not a measured feasible run, a selection to execute or a replacement for the existing refinements' scientific identity.

The preparation's $2\pi/0.1\approx62.83$ angular period is neither a predicted future period nor a lower bound on one. Relabeling, relative symmetries and actual meridional dynamics can yield different or undefined period readouts. A conditional $T=3$ calibration cannot be advertised as coverage of that preparation timescale, and the preparation timescale cannot be used to forbid shorter scientifically defined finite returns.

The bounded review is complete. No further implementation, browser action or numerical campaign is selected for this reviewer. Root's integrated design must retain the explicit unresolved execution conditions rather than convert source-level readout acceptance into trajectory acceptance.

## Final integrated adjudication

### Inspected final packet and exact identity

The same review received final dispatch `a6cfd332-b762-4c64-93c1-e185456184d8` through the required repository `receive-file` command. The machine returned `payloadVerified: true`, payload digest `6fc82502343276f1854967f7898a66bddfd10d1ae9728c533a602ce8103497a8`, and `transportVerified: false`. The local payload/source checks are not represented as an independent transport-authentication result. Before this appended adjudication, `shasum -a 256` matched all four dispatched final source identities:

| Inspected source | SHA-256 |
| --- | --- |
| `reference/priorities/app-surface/analysis/recurrence-experiment-2026-10-18.md` | `ee2662f76fa14f8c2d6a4c639bc629ba4d021b36f21056ec7b9b4ce514bcccc6` |
| `reference/priorities/app-surface/manuscript.md` | `f57c5b3f1927935f3431cb6c960da90b2092e05f71a6ded1ea22325dab693708` |
| `.tmp/surface-recurrence-design/window-bounds.mjs` | `c8b3296709a9812520123c8ff4fb07981845f2c7479bcaf0184aae467ed6d856` |
| `.local-data/eom/surface-recurrence-design-2026-10-18/proposed-cases/manifest.json` | `0122745edcbbb86cfe40ae7a7d1f0a1065958d0c289939787881653a88ffd5ec` |

Direct reads covered the whole updated packet, the manuscript's integrated recurrence section, the mathematical readout, the proposed-case manifest and all three proposed requests. Additional `shasum -a 256` checks match the manifest's base request `378881bcaeee69dac7c1c941f9f5af79d6b78dbbf28e87f0ca2a5fde55038433`, refined request `4e55409c0b9200ef0e0ff57f8ff702495f4ab7fae954a5853e002d7201132609` and tight request `b239a4c2e131eb56573b7f8c9daaeab334732376ecd10c978838cc2909139ed9`. The reviewer's frozen independent control source remains `696f23c6963ddb6f5297670466414a5a50897f9b3718d2f2776ccb9ce918a580`. These are identities of the inspected states; subsequent status-only integration must retain its own provenance.

### Closure of the findings

| Finding | Final disposition at the selected design scope |
| --- | --- |
| R1, adjacent return | ✓ Closed. Packet, manuscript and wrapper require all three comparisons at the same thresholds. Direct read of the added control shows smooth zero-endpoint-velocity cubic bridges between the three constant windows, with discrepancies $+\epsilon$ and $-\epsilon$ from the anchor. Its expected results are `match`, `match`, `rejected`, so the adjacent test detects the independent factor-of-two counterexample. |
| R2, dependence | ✓ Closed. The packet and manuscript explicitly call the windows disjoint but dependent parts of one deterministic trajectory. No independent-trial probability is asserted. |
| R3, exhausted enclosure | ✓ Closed. Incomplete traversal returns `null` upper bounds and cannot pass; a valid lower witness can still reject. The bounded mathematical output no longer presents a partial maximum as a full-window upper enclosure. |
| R4, metric and adapter | ✓ Closed as a design boundary. The wrapper uses $\ell\epsilon_X$, field speed 1, exact powers and actual `oblate` axis refusal. The packet explicitly requires a future scientific adapter to bind centered actual geometry, model/preparation identity, true radius/memory premises, coherent-solution/error provenance and contiguous accepted raw parts. Generic translated/rotated geometry is outside the prepared centered-torus case. The mathematical array wrapper is not mislabeled as that adapter. |
| R5, period interpretation | ✓ Closed. Activity/excursion enclosures, near-stationary drift, broad lag bands and transform ambiguities are explicit. The finite lag grid and exact rational rotation proposals do not claim a continuous optimum or exclusion between grid points. Neither low activity nor steady relative rotation supplies an oscillation frequency. |
| R6, capacity | ✓ Closed as an explicit feasibility disposition. The unchanged fine-step campaign is identified as unavailable under its cumulative attempt reservation. The prepared 0.06/0.03 alternative is explicitly unexecuted and not known-admissible; longer/finer work requires a selected capacity design or proved analytical reduction. No reset-counter, pruned-checkpoint or alternate-solver bypass is proposed. |

The retained `known-adjacent.stdout.log` reports passing controls including the $C^1$ factor-of-two negative and actual oblate-axis refusal; its paired stderr is empty by direct concatenated log reads. `known-final.stdout.log` supplies the preceding mathematical control scope. The direct source reading above explains why the new negative has the specified result rather than relying solely on a `passed` label. The existing-coverage receipt remains only an admission observation that 0→0.15 is shorter than the required memory. No new trajectory target was evaluated for this final adjudication, and the frozen independent reference was not modified.

### Conditional root-sensitivity lemma

The added lemma is sound at its stated scope. After aligning the two receptions and source histories by the one fixed transformation, position discrepancies at most $\delta_X$ change the norm in the causal residual by at most $2\delta_X$. Uniform coherent source speed at most $u<1$ bounds the residual's source-time slope away from zero by $1-u$. For two roots interior to the common memory this gives $|\Delta S|\le2\delta_X/(1-u)$. The numerical illustration $0.0003/0.98<0.000307$ is correct for its separately assumed $u\le0.02$. A true source-acceleration bound over the interval joining those emissions adds at most $M_A|\Delta S|$ to a same-time velocity discrepancy.

This is not a theorem that the compared recent windows alone bound every earlier source needed for accelerations at all times inside those windows. The actual contributing common source intervals must satisfy the lemma's position/speed/derivative premises; full retained histories and production carriers remain available for those checks. Positive separation, factor floors and root-interior margins are still needed for an acceleration-conditioning statement. The packet names these conditions and does not convert the root estimate into stability or global propagation of errors. The original causal-memory proof and older-tail assumption remain intact.

### Prepared execution and limits

The request bytes agree with the manifest's `prepared-not-executed` status: each initially requests 0→1, uses the selected centered outer torus and the six original decimal phases, $c_f=1$, coupling $10^{-6}$, 110 cumulative attempts and 2 GiB memory allowance. Base/refined use preparation step 0.02; tight uses 0.01 and explicitly has different interpolant/error bytes and preparation identity for the same underlying analytic past. No exact numerical-preparation identity is silently transferred between those meshes. Same-run continuation to 3 is a declared future endpoint, not an already produced checkpoint or result.

The proposed 50/100 step figures are lower bounds for directly spanning 0→3 at maximum steps 0.06/0.03. Forcing the intermediate endpoint 1 gives stronger arithmetic lower bounds of 51/101 accepted steps across the two invocations, before rejection or adaptive narrowing. This remains within the proposed count 110 in the ideal arithmetic case, but supplies no admission or accuracy guarantee. The small remaining reservation, accumulated histories/carriers, checkpoint encoding and actual retained error widths may still prevent continuation. These are execution conditions, not an unresolved error in the completed definition.

The packet distinguishes its direct streamed CLI capture proposal from the app record route. Its proposed 512 MiB per-invocation/4 GiB campaign disk allowances do not override the 32 MiB request/checkpoint envelope or the app's independent raw/projection caps. Incomplete streams and nondurable checkpoints remain failures with retained evidence, not fabricated accepted results. Deadline/progress, build, independent-reference and integration allocations are explicit future budgets, not measured throughput. A newly authored frozen interval/reference is required because the original frozen torus instrument admits only its original finite interval.

The six-hour October 18 selection is consistently described as a definition work window. The separately proposed future six-hour execution budget is not represented as an executed simulation or six units of simulated time. The 62.83 preparation turn remains a reference timescale, not a future period prediction or lower bound. The manuscript makes the same finite-evidence distinctions.

### Final disposition and residual conditions

✓ Accepted — The bounded experiment definition, mathematical readout specification, targeted controls and feasibility alternatives are ready for the selected design handoff. R1–R6 have appropriate dispositions in the inspected integrated state. The draft packet's in-progress status can be closed by Root for this definition work, while SURFACE-004's future trajectory/persistence/free-release obligations remain separate.

Future execution still requires a selected campaign, fresh exact build/source/executable binding, full actual request/resource admission, the scientific record adapter, true chart/error certificates, a separately frozen independent reference, durable raw/checkpoint evidence and candidate freezing before refined/tight adjudication. These are explicit future requirements of the accepted design; their absence does not turn a design-only task into an unfinished simulation task. No recurrence, fundamental period, stability, energy law, unconstrained persistence, actual cost or future reach is accepted here. No additional research, EOM work or browser action was launched by this review.
