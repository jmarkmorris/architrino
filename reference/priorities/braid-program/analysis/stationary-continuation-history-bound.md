# Retained-History Error at the Stationary Binary Frontier

## Scope

This analysis concerns the opposite-polarity binary released from a held stationary history, with normalized wake speed $c_f=1$. Its purpose is to distinguish uncertainty in the numerical history from an event in the underlying motion. The [dated reproduction](../evidence/2026-09-14-stationary-continuation-diagnosis.md) and [independent repair follow-through](../evidence/2026-09-14-zero-acceleration-and-binary-validation.md) own measurements; this document owns the analytical bounds and their limits. No result here establishes binary binding or a complete close approach.

The causal emission time $S<T$ solves

$$
g(S)=\|\mathbf X_i(T)-\mathbf X_j(S)\|-(T-S)=0.
$$

Here $T$ is the receiver time, and the two positions refer to the receiver now and transmitter at emission. The retained numerical histories enclose positions rather than specifying their exact values. A root certificate must cover the emission times consistent with those enclosures. More arithmetic precision reduces rounding error, but it does not remove uncertainty already admitted by the history representation.

## Geometry and prescribed initial history

The problem is a symmetric, opposite-polarity pair released from rest. Source inspection of `stationary_paths`, `stationary_history`, and `request` in the [stationary fixture](../../../../src/eom/native/eom_stationary_joint_frontier_fixture_cli.cpp) establishes the following prescribed data. Positions use the fixture's length unit, time is absolute time, and wake speed is normalized to $c_f=1$.

| Path | Charge in the fixture convention | Position throughout $-20\le T\le0$ | Velocity throughout that interval |
| --- | --- | --- | --- |
| Positive | $q_+=+1/6$ | $\mathbf X_+(T)=(1/2,0,0)$ | $\dot{\mathbf X}_+(T)=(0,0,0)$ |
| Negative | $q_-=-1/6$ | $\mathbf X_-(T)=(-1/2,0,0)$ | $\dot{\mathbf X}_-(T)=(0,0,0)$ |

The charge inputs are finite decimal representations of the displayed fractions. The separation is one, the midpoint is the origin, and neither path has an initial transverse velocity. Only these two paths are supplied; an ambient population is not part of this fixture. The interaction coupling is $\kappa=36\times0.2862286103053385$, so the nominal signed pair factor is $\kappa q_+q_-\approx-0.2862286103053385$ in the fixture convention. These are numerical normalization choices, not SI charge or mass assignments.

At $T=0$, free evolution begins under the delayed master equation. The stationary past is prescribed preparation data; the fixture does not simulate how it was held and does not establish that this past is a freely sustained equilibrium. No future orbit is prescribed. The retained past is the finite interval $[-20,0]$, not an assertion of stationarity for all earlier times. Because the interaction samples earlier positions, this history is part of the initial conditions in addition to the release positions and velocities.

**Derived initial causal geometry.** At release, either receiver is one unit from its stationary partner at every available emission time. The partner root therefore satisfies $1=0-S$, giving $S=-1$. A same-path stationary history has zero displacement and cannot satisfy $0=0-S$ for $S<0$; the coincident endpoint is excluded. These statements concern the prescribed release geometry and do not determine the subsequent binary motion. A different initial displacement or a nonstationary prescribed past would require recomputing these roots.

For numerical representation, each stationary history uses 200 constant cubic segments of duration $0.1$. The ordinary representation carries position and velocity error tokens of $10^{-14}$, alongside the fixture's exact joint representation of the nominal stationary history. These are history-enclosure settings, not initial physical motion or a distribution of prepared positions. Later integration-step choices likewise change the numerical construction rather than these initial conditions.

## Radial uncertainty cannot be removed by recentering

**Derived, conditional analytical reference.** Let the nominal delayed displacement be $(r,0,0)$ with $r>0$, and let its uncertainty be purely radial, $(u,0,0)$ with $|u|\le R<r$. Then

$$
\|(r+u,0,0)\|-r=u.
$$

The norm is linear on this positive radial interval because $r+u$ never changes sign. Its exact residual range is $[-R,R]$, of width $2R$. Moving the center of that interval does not change its width. If the local residual is $g(S)=m(S-S_0)+u$ with constant $m>0$, the complete root set is $[S_0-R/m,S_0+R/m]$, of width $2R/m$.

The last formula is exact for the stated constant-slope family. For a moving transmitter, a certified lower bound on $|g'(S)|=|D_t(S)|$ instead supplies an upper bound on root width; it is not a lower-bound theorem for the physical trajectory. In particular, the numerical history box may contain combinations that no actual trajectory realizes. Removing such combinations requires justified dependency information, not selecting the desired part of the box.

The live `RootTimeBudget.cpp` bounds the nonlinear norm remainder by $\rho^2/[2(r-\rho)]$, where $\rho$ bounds the complete displacement perturbation and $r>\rho$. At the reproduced failing row, the projected independent remainder is approximately $3.815\times10^{-6}$ and the nonlinear radius is approximately $1.259\times10^{-11}$. This measured decomposition makes removal of nonlinear slack an inadequate remedy for the observed roughly two-percent root-width excess. It does not prove that every tighter history method must fail.

**Falsifier and scope check.** For the analytical radial statement, a displacement within $|u|\le R<r$ whose norm differs from $r+u$ would contradict the proof. For the numerical diagnosis, a fresh fixed-control row with materially different affine, independent or nonlinear contributions would supersede the measured decomposition.

## Prospective endpoint symbols

An accepted endpoint error can be expressed using a variable that retains its identity during subsequent propagation. Suppose the current position and velocity errors have the representation

$$
\delta\mathbf x_0=B_x\boldsymbol\xi+\mathbf r_x,
\qquad
\delta\mathbf v_0=B_v\boldsymbol\xi+\mathbf r_v,
$$

where the existing shared variables satisfy $\xi_k\in[-1,1]$, and each component of the independent remainders obeys $|r_{x,a}|\le P_a$ and $|r_{v,a}|\le V_a$. Introduce fresh, independent variables $\eta_{x,a},\eta_{v,a}\in[-1,1]$ and write

$$
r_{x,a}=P_a\eta_{x,a},
\qquad
r_{v,a}=V_a\eta_{v,a}.
$$

**Derived representation statement.** This replacement preserves the endpoint Cartesian set exactly: every old remainder value has a corresponding variable value, and every new variable value lies in the old remainder interval. If a radius is zero, choose its variable to be zero. This statement makes no assumption about correlations between different paths, components, or the two remainders.

The new variables must remain the same variables in every later certified propagation map. The older retained history keeps its original independent remainders and receives zero coefficients for the new variables. That earlier history may then be a conservative enlargement of the true joint set, but it acquires no invented relation with the new endpoint. The operation cannot retrospectively reconstruct dependencies discarded during earlier integration.

This is a set-representation proof, not a proof that the production propagation route passes every known case. The initial independent numerical control rejected lifted single-path inertial evolution because incompatible outward-rounded exact-zero acceleration bounds were manufactured during representation. The [original evidence](../evidence/2026-09-14-stationary-continuation-diagnosis.md#known-controls-and-independent-boundary) preserves that result. The [subsequent repair](../evidence/2026-09-14-zero-acceleration-and-binary-validation.md#known-case-validation-before-binary-use) passes the complete lifted inertial interval and restart against the analytical motion and uncertainty formulas, including 0, 12 and 96 extra unused symbols. That scoped validation does not independently solve the interacting binary.

## Independent inertial reference

For a single straight path below wake speed, every positive delay satisfies $\|\mathbf X(T)-\mathbf X(S)\|=v(T-S)<T-S$. Thus no positive-delay self root exists. With no other paths and the coincident endpoint excluded, the acceleration sum is empty and the path remains inertial under the stated law.

In one coordinate, with elapsed time $t$ from the lifted endpoint, the exact propagated error is

$$
\delta x(t)=P\eta_x+tV\eta_v.
$$

At two subsequent times $t$ and $s$,

$$
\delta x(t)-\delta x(s)=(t-s)V\eta_v.
$$

The common position offset cancels because it is the same offset at both times. By contrast, a comparison to an older segment with independent error still includes that older error. These identities provide a known analytical control for symbol transport and cancellation. They do not independently solve the interacting binary.

## Exact zero and finite interval quotients

The inertial reference requires the empty acceleration sum to remain exactly zero regardless of how many unused uncertainty symbols are carried. Two elementary identities govern its representation: adding an exact zero changes no value, and subtracting a singleton from its identical represented center has zero remainder. They do not permit canceling independently varying non-singleton intervals. Applying those identities to acceleration reduction and corrector residual construction removes fabricated rounding intervals without changing the represented physical or numerical uncertainty.

A separate arithmetic issue arises when a positive corrector radius is subnormal. Computing $x/r$ as $x(1/r)$ may overflow in the reciprocal even when the quotient is finite; $x=0$ and $x=r$ are immediate examples. On a Cartesian rectangle whose denominator interval excludes zero, the quotient extrema occur at its four corners. Computing those endpoint quotients directly and rounding the minimum downward and maximum upward therefore preserves enclosure without requiring a representable reciprocal. A zero-containing denominator remains outside this division domain. The implementation retains the existing candidate radii and containment inequalities; the independent subnormal controls and full inertial restart are recorded with the repair.

## Existing implementation and bounded experiment

Source inspection with `rg` and `sed` in `src/eom/src/` locates the relevant operations in `lift_joint_endpoint_remainders` and `append_joint_candidate_segments` in `CoupledEvolution.cpp`, and endpoint evaluation in `JointAffineHistory.cpp`. The evolution controller lifts at the beginning of a fresh invocation; the stationary fixture's direct atomic replay does not enter that controller. The corrector still turns its certified correction image into independent coordinate radii. Preserving prospective endpoint symbols therefore tests a narrower capability than retaining the full implicit corrector sensitivity.

The bounded experiment resumes the same accepted prefix through the existing controller, with initial, minimum and maximum steps all `0.005`. The prefix, sharp acceleration law, root tolerance, state tolerances and precision ceiling remain unchanged. Ordinary-history dominance, complete root accounting and atomic rejection continue to govern acceptance. The diagnostic has its own output schema so that a controller result cannot be mistaken for reproduction of the historical direct-atomic fixture.

If endpoint lifting does not clear the barrier, the next justified comparison is a tighter construction of the earlier history or a certified time-dependent remainder. If it does clear it, the next requirement is continuation through the event needed for classification, with independent evolution checks. Neither outcome licenses a broad parameter campaign or permanent-binding claim.

In the September 14 measured comparison, endpoint lifting alone retains the same rejected boundary, while halving the prefix step-size range reaches the previously rejected endpoint. The accepted endpoint roots use the ordinary directed-interval route. This supports further investigation of history construction rather than treating a change from remainder radii to affine symbols as an error reduction by itself.

## Finite separation at the later root-width halt

The later quarter-prefix construction with continuation step $0.0025$ accepts through $T=1.5424999999999929$ and rejects the proposed endpoint $T=1.5449999999999928$. The [binary validation record](../evidence/2026-09-14-zero-acceleration-and-binary-validation.md#quarter-prefix-with-half-continuation-step) reports the unchanged root-width gate and the failed budget. This halt does not require contact or a singular causal root: a finite numerical uncertainty can exceed a fixed absolute root-time tolerance while both distance and root slope remain positive.

**Derived sensitivity on the regular symmetric chart.** Write the positions as $X_\pm(T)=\pm y(T)$. The partner root satisfies

$$
S+y(S)=T-y(T),\qquad
D_t=1+y'(S),\qquad D_r=1-y'(T).
$$

The present separation is $2y(T)$, whereas the distance in the delayed acceleration is $y(T)+y(S)=T-S$. Differentiating the causal equation gives $dS/dT=D_r/D_t$. At fixed reception time, small perturbations of the receiver position and the retained source position give

$$
\delta S=-\frac{\delta y(T)+\delta y(S)}{D_t}.
$$

Here the source perturbation is evaluated at the unperturbed emission time; the source displacement caused by changing $S$ is already included in $D_t$. The last equation is a first-variation identity; a finite uncertainty bound uses a positive lower bound for $D_t$ over the relevant root set. It explains why residual position uncertainty becomes a larger emission-time interval as the source-side factor decreases. $D_r$ describes playback of emission time as reception time advances and does not multiply the acceleration law.

**Measured independent reference values.** The frozen reference described in the [first-interval derivation](stationary-binary-first-interval.md) gives the following values. The second column is within the independently checked accepted trajectory; the third is a reference prediction at the rejected endpoint, not an accepted production state.

| Quantity | Accepted time $T\approx1.5425$ | Rejected proposed time $T\approx1.545$ |
| --- | ---: | ---: |
| Present separation $2y(T)$ | 0.15855591120856488 | 0.1542514591297849 |
| Delayed distance $T-S$ | 0.364088443849657 | 0.3587267799729261 |
| Emission time $S$ | 1.1784115561503359 | 1.1862732200270667 |
| Source velocity $y'(S)$ | -0.4060048943447514 | -0.4104857860690676 |
| Transmitter factor $D_t$ | 0.5939951056552486 | 0.5895142139309324 |
| Receiver factor $D_r$ | 1.856290086784426 | 1.8655482116247204 |
| Inverse root slope $1/D_t$ | 1.6835155550597993 | 1.6963119401853137 |
| Playback rate $D_r/D_t$ | 3.125093235804886 | 3.1645517063703714 |

The accepted production root certificate reports $D_t$ between 0.5939632229954498608 and 0.5940181531127318501. Thus its certified root is simple, and the measured reference at the next endpoint still has $D_t\approx0.5895$, rather than a factor approaching zero. The delayed distance is more than twice the present separation. Finite distance alone is not the simple-root test; the positive source-side factor supplies that test here. These facts give no physical fold diagnosis at the stopping point.

The failed positive cross row reports projected radii $1.4540819861709156\times10^{-6}$ from shared affine variables, $1.5933055388285454\times10^{-6}$ from independent remainders, and $1.2943959205378324\times10^{-11}$ from the nonlinear norm bound. Their sum is approximately $R=3.047400469\times10^{-6}$. The implementation in [RootTimeBudget.cpp](../../../../src/eom/src/RootTimeBudget.cpp) bounds the root width by $2R/\inf|D_t|$. Combining the printed radius and width reconstructs $\inf|D_t|\approx0.589468724$, subject to rounding of those printed diagnostics. The resulting width is $1.0339481458240394\times10^{-5}$, about $3.3948\%$ above the fixed $10^{-5}$ gate.

The affine and independent terms contribute approximately $47.7155\%$ and $52.2841\%$ of this radius; the nonlinear term contributes only $0.000424754\%$. Even substituting the independent reference's point value $D_t=0.5895142139\ldots$ gives width approximately $1.033868360404182\times10^{-5}$, still above the gate. That substitution is a diagnostic calculation, not an admissible replacement for the certified slope bound. With the same certified slope, a radius reduction of approximately $3.2834\%$ would be needed to clear this particular budget. Neither removing the small nonlinear term nor more accurately rounding the current factor is sufficient by this decomposition.

Both displayed emissions precede the continuation restart at $T\approx1.24$, so their source positions come from the earlier prefix. The receiver state also inherits prefix uncertainty and later correction remainders. The printed budget combines their displacement uncertainty; it does **not** split the independent radius into source and receiver contributions. Consequently the entire independent term cannot be attributed to the older source history. Prospective endpoint symbols still cannot manufacture a correlation with old source errors that was absent from their representation. A correction to the propagation or history construction must preserve the actual shared dependencies and the independent errors it cannot justify canceling.

The short calculation is retained as quarter-half-delay-sensitivity.jsonl (local artifact: `.local-data/braid-program/2-braid-2026-09-14/quarter-half-delay-sensitivity.jsonl`); its stationary-source sensitivity and budget-extraction controls passed before the target calculation. These are local analytical identities, evaluations by the frozen independent reference, and inspection of printed production certificates. They establish neither a continuous error theorem nor the later encounter outcome. A new trace with a materially different budget or a transmitter factor containing zero would require a new diagnosis.

## Independent root discrepancy in the longer retry trace

**Measured comparison, with an unresolved failure.** The later corrector-retry trace with eighth-prefix construction reaches accepted time $1.5724999999999922$ and contains 763 accepted frames. The frozen independent state instrument checks all 1,526 path samples without a position or velocity containment failure. The frozen root observer reports one failing frame at $T=1.5687499999999923$: both partner emission brackets exclude the independently computed emission time. All 1,526 self rows have the expected zero-root inventory, and all partner rows have the expected single-root inventory and contain the independent $D_t,D_r$ values. The other 762 frames pass the complete sampled root comparison. Thus the complete 763-frame trajectory has **not** passed independent root validation.

At the failing frame, both printed partner brackets are approximately

$$
[1.2668748437499989,\;1.2668751562499989],
$$

with width $3.125\times10^{-7}$. The finest independent emission estimate is $S=1.266875166831569$, exceeding the printed upper bound by approximately $1.05815701\times10^{-8}$. Three frozen-reference refinements return 1.266875166716877, 1.2668751668346503 and 1.266875166831569. Their spread is approximately $1.17773347\times10^{-10}$, about ninety times smaller than the miss, and all three estimates lie above the printed upper bound. This is a measured numerical discrepancy; refinement agreement is not a rigorous bound on reference error.

The companion state and root results use the stem corrector-retry-eighth-prefix-event under the September 14 local evidence owner. The discrepancy packet (local artifact: `.local-data/braid-program/2-braid-2026-09-14/corrector-retry-eighth-prefix-root-discrepancy.json`) retains the full frame, exact printed bounds, reference values and refinement spread. No frozen reference was changed. The receipt separates this accepted-frame discrepancy from the subsequent rejected step; successful partner rows in a rejected snapshot alone do not establish which other condition caused that rejection.

### Why an unproved probe cannot restrict a root family

**Derived counterexample to an enclosure rule.** Consider the exact family of residuals

$$
g_u(S)=S-B-u,\qquad |u|\le R,\qquad g_u'(S)=1.
$$

Its complete root set is $[B-R,B+R]$. At the center $B$, the residual interval is $[-R,R]$, so the mean-value calculation $B-g(B)/g'$ returns exactly that complete set. Suppose a search procedure has merely chosen a smaller probe $P=[B-r,B+r]$ with $0<r<R$, without proving that it contains every admissible root. Intersecting the mean-value enclosure with $P$ returns $P$ and discards legitimate roots, including the root $B+R$ for $u=R$. A short output interval does not cure this omission.

For example, $R=10^{-6}$ and $r=10^{-5}/64=1.5625\times10^{-7}$ give a full root-set width $2\times10^{-6}$ and an improperly clipped width $3.125\times10^{-7}$. Both are below the same $10^{-5}$ tolerance; the shorter interval fails because it excludes roots, not because its width is too large. At the probe endpoints the family residuals do not have strict opposite signs. The monotone derivative and a center residual containing zero do not provide the missing enclosure premise.

A contraction may safely intersect with a domain already proved to contain the relevant roots, or it may certify a restricted domain while separately proving the omitted complement root-free. Merely selecting a probe provides neither fact. Source inspection of the segment-join call to [enclose_mp_monotone_root](../../../../src/eom/src/ExactPairBatch.cpp) finds that it intersects the mean-value candidate with its supplied probe before the join routine evaluates the later strict endpoint-sign checks. The interior call has different surrounding bracket premises and must be assessed separately. The counterexample establishes the need for a premise at that operation; attributing the observed frame to this particular branch requires a diagnostic replay.

The failing bracket's center and width are consistent with a join probe of radius $10^{-5}/64$, but that agreement is an inference, not branch provenance. Whole accepted-endpoint samples also omit the internal half-step cubic data, so an endpoint-Hermite reconstruction cannot establish the exact retained nominal root. The next adjudication needs the actual branch record and retained segment data, followed by the unchanged independent state and root checks.
