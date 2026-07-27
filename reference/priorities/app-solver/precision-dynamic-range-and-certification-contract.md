# EOM Precision, Dynamic Range, And Certification Contract

## Status

- Contract id: eom_numeric_certification/v0
- Stage: frozen-requirements
- Mathematical authority: [master-eom-binding-v1.md](master-eom-binding-v1.md)
- Evolution authority: [evolution-contract-v1.md](evolution-contract-v1.md)
- Production implementation: not selected
- Production language and accelerator stack: not selected
- Non-EOM output of any origin: no numeric authority for EOM

## Purpose

This contract defines when an EOM calculation is numerically resolved well
enough to extend an accepted retained history. It applies to the independent
oracle, CPU prototypes, production CPU kernels, GPU and multi-GPU kernels,
distributed execution, checkpoint continuation, and every precision-escalation
path.

Performance is measured only on accepted or correctly rejected work. A backend
does not become faster by publishing a step whose root count, branch identity,
sign decisions, error budget, or history continuation is unresolved.

## Certification Object

The unit of acceptance is an immutable coupled-history step. For a proposed
advance from $T_n$ to $T_{n+1}$, the numeric certificate covers:

1. every history value and interpolation enclosure consumed by the step;
2. every ordered transmitter-receiver pair, including same-transmitter pairs;
3. every admitted causal root and a root-free certificate for the retained
   complement;
4. every $D_t$, $D_r$, polarity, core-kernel, and acceleration contribution;
5. the deterministic or enclosed accumulation of those contributions;
6. the local truncation and propagation error of the coupled advance;
7. the appended history segment and all continuation-critical controller state.

The step is accepted atomically or rejected atomically. A diagnostic record
computed after the state advance cannot certify the state that was actually
advanced.

## Scale And Coordinate Declaration

Every run declares physical units and a scale map before numerical work begins.
The map contains at least a length scale $L_\star$, time scale $T_\star$, charge
scale $Q_\star$, velocity scale $V_\star=L_\star/T_\star$, and acceleration
scale $A_\star=L_\star/T_\star^2$. Dimensionless working variables are

$$
\widetilde{\mathbf X}
=
\frac{\mathbf X-\mathbf O}{L_\star},
\qquad
\widetilde T
=
\frac{T-T_{\mathrm{epoch}}}{T_\star},
\qquad
\widetilde{\mathbf V}
=
\frac{\mathbf V}{V_\star}
$$

The origin $\mathbf O$, epoch $T_{\mathrm{epoch}}$, and scales are recorded
with the history slab they govern. A scale change is a certified coordinate
transformation of the same physical history, never a change in the Master
Equation.

Pair geometry is evaluated in one declared local frame. When two history
segments use different origins or scales, their transform into the pair frame
must be exact or enclosed before subtraction. Subtracting two large global
coordinates and hoping their small separation survives is prohibited.

## Absolute-Time Representation

Absolute time is represented as an epoch plus a local offset:

$$
T=T_{\mathrm{epoch}}+\tau
$$

The epoch remains fixed over a declared history slab. Local offsets, step
endpoints, emission times, and brackets are compared without first collapsing
them into one lower-precision scalar. An implementation may use integer ticks,
dyadic offsets, floating-point expansions, arbitrary precision, or another
representation only when it preserves the required ordering and enclosure.

The following condition is mandatory:

$$
T_{n+1}>T_n
$$

must be certified in the time representation itself. A step that rounds back
to $T_n$, changes ordering under precision escalation, or cannot distinguish an
emission time from a boundary is rejected. Repeated floating-point addition to
a large absolute epoch is not an accepted time integrator.

## Discrete And Continuous Decisions

Numeric outcomes are divided into two classes.

### Discrete Decisions

The following must be exact or certified by non-overlapping enclosures:

- time and event ordering;
- causal-root count and root identity;
- membership inside the retained history interval;
- the sign of $D_t$ away from a declared fold chart;
- active, inactive, excluded-coincidence, unresolved, and certified-pruned
  classifications;
- branch creation, continuation, merger, and memory-boundary exit;
- timestep acceptance or rejection;
- precision-route and backend-route decisions.

A point estimate cannot decide a discrete record when its certified enclosure
contains the decision boundary.

### Continuous Quantities

Positions, velocities, accelerations, emission times, interpolation values,
branch strengths, regulator contributions, and integrated states carry either
a rigorous enclosure or a declared error estimate whose validation class is
recorded. The independent oracle uses arbitrary-precision interval or ball
arithmetic for the acceptance envelope. A production backend may use a cheaper
estimate only after the oracle demonstrates that the estimate is conservative
on the promoted workload.

## Error-Budget Ledger

Each accepted step carries the stage budget

$$
\mathcal E_n
=
\left(
E_{\mathrm{hist}},
E_{\mathrm{interp}},
E_{\mathrm{root}},
E_{\mathrm{geom}},
E_{D_t},
E_{D_r},
E_{\mathrm{kernel}},
E_{\mathrm{sum}},
E_{\mathrm{step}},
E_{\mathrm{output}}
\right)_n
$$

The accepted-state enclosure obeys a propagated bound of the form

$$
E_{n+1}
\le
G_n E_n
+
\sum_k C_{n,k}E_{n,k}
$$

where $G_n$ is the local history-to-history amplification bound and $C_{n,k}$
maps each stage error into the accepted state. The oracle may evaluate these
coefficients by interval automatic differentiation, higher-precision
perturbation bounds, or an analytically derived Lipschitz estimate. A backend
may not set them to one without evidence.

The caller supplies a total accepted-state budget. The run policy partitions
that budget among stages and records unused margin. A stage may borrow margin
only through an explicit recomputation of the propagated total. Hidden
per-kernel tolerances are prohibited.

## Required Condition Indicators

The engine evaluates condition indicators before accepting a point-format
result.

| Decision or quantity | Required indicator |
| --- | --- |
| Absolute-time resolution | Ratio of local representable spacing to requested step and event separation. |
| History interpolation | Basis conditioning plus a remainder or enclosure for the requested derivative order. |
| Simple causal root | $1/|D_t|$ together with the root bracket width and residual enclosure. |
| Root playback | An enclosure of $D_r/D_t$ after the $D_t$ floor is certified; $D_r=0$ is an allowed playback turn. |
| Core proximity | $r/\epsilon_c$ and the enclosure of the complete zero-extended transmitter-factor vector integrand. |
| Pair subtraction | Separation scale divided by the magnitude and uncertainty of the coordinates being differenced. |
| Acceleration cancellation | $\sum_k\|\mathbf a_k\|/\|\sum_k\mathbf a_k\|$ with a declared zero-result route. |
| Integrator step | Estimated or enclosed local error divided by the allocated step budget. |
| History propagation | Bound on amplification from the input-history enclosure to the output-history enclosure. |

An infinite or undefined indicator is not automatically a failure of the
physical law. It selects a different numeric chart: finite-width caustic
integration, zero-result enclosure, local coordinates, or higher precision.
The run fails only when the required chart cannot be certified within its
declared resource limits.

## Precision Ladder

The common precision ladder is:

| Level | Role |
| --- | --- |
| Hardware binary64 | Bulk computation for rows proven well conditioned under the current budget. |
| Verified hardware extended format | Host-only acceleration when its actual mantissa, exponent, rounding, and storage behavior are tested on the target. |
| Double-double, quad-double, expansion, or binary128-class arithmetic | Local difficult rows, reductions, roots, and correction stages. |
| Arbitrary-precision floating point | Precision selected in bits with explicit rounding and reproducible library metadata. |
| Interval or ball arithmetic | Certified enclosures for roots, signs, branch decisions, state values, and oracle outputs. |
| Exact or adaptive predicates | Sign, order, coincidence, topology, and other discrete decisions that admit an exact formulation. |

These levels may be composed. For example, an arbitrary-precision midpoint may
carry a ball radius, or a binary64 bulk reduction may terminate in a
long-accumulator certificate. The nominal type name is not evidence; achieved
precision, rounding behavior, and enclosure width are recorded.

## Escalation Unit And Triggers

The smallest independent unit that can be recomputed without changing accepted
inputs is escalated first: predicate, interpolation evaluation, root bracket,
interaction row, reduction bin, correction solve, or complete candidate step.
Escalation never substitutes values from a different model, regulator, history,
or timestep.

Escalation is mandatory when any of the following occurs:

- a time, sign, order, or inclusion enclosure contains its decision boundary;
- a root residual or bracket cannot certify existence, uniqueness, or absence;
- the retained complement cannot be certified root free;
- the $D_t$ enclosure contains zero on a supposed simple-root chart;
- the complete core-integrand enclosure is not finite;
- an accumulated acceleration enclosure exceeds its allocated budget;
- two worker counts, backends, or precision levels disagree on a discrete row;
- a timestep controller changes its decision under required precision replay;
- the propagated accepted-state enclosure exceeds the caller's budget;
- a nonfinite value appears without a certified mathematical interpretation.

If increasing precision shows that $D_t=0$ is a real event, the record leaves
the sharp chart and enters the finite-width fold route. If it shows that
$D_r=0$ with $D_t\ne0$, the root remains active, its signed playback turns
through zero, and its transmitter-factor acceleration remains ordinary.
Precision escalation must not erase either event.

## Root Certification

For every ordered pair, root work proceeds as:

1. partition the retained emission-time interval into certified search cells;
2. enclose $g_{ij}$ on each cell;
3. discard a cell only when its enclosure excludes zero;
4. isolate a simple root with a certified method such as interval Newton or a
   safeguarded bracket plus derivative enclosure;
5. certify uniqueness and the sign of $D_t$ on the final root interval;
6. merge or separate neighboring root intervals only through certified overlap
   and topology rules;
7. certify the unclaimed complement root free.

Continuation supplies candidates, not completeness. Near multiple roots or
folds, the sharp root method yields to the bound finite-width law and event
subdivision. Maximum precision without a certified root count returns
numeric_root_count_uncertified and rejects the coupled step.

## History Interpolation

Every history segment records its interpolation basis, coefficient precision,
time chart, continuity class, derivative availability, and error enclosure.
Interpolation is permitted only inside accepted retained segments. Extrapolation
cannot supply a causal root or acceleration record.

The interpolation enclosure includes:

- stored-node uncertainty;
- coefficient-construction rounding;
- evaluation rounding;
- truncation or reconstruction remainder;
- transformation into the pair's local scale and coordinate frame.

Dense output used by a multirate method is part of the accepted history and
must satisfy the same contract as step endpoints.

## Accumulation And Reproducibility

Ordered-pair contributions are reduced under a versioned policy. The baseline
certificate uses a fixed logical ordering and one of:

- pairwise or binned summation with an enclosure;
- compensated summation with an independently justified residual bound;
- floating-point expansion or long accumulator;
- stricter-precision or interval accumulation.

Compensation alone is not a certificate. The selected method must bound
cancellation and overflow. Parallel scheduling may vary, but the logical bins,
merge tree, and rounding policy are deterministic or the final enclosure must
contain every allowed schedule result.

Single-thread, multithread, GPU, and distributed runs must agree on every
discrete decision. Their continuous enclosures must overlap and satisfy the
same accepted-state budget.

## GPU And Heterogeneous Precision

Accelerators may compute bulk candidates in their fastest promoted format.
Rows whose indicators or enclosures fail the bulk gate are compacted with their
original inputs and returned to a stricter device kernel or host precision
service. The stricter result replaces the candidate under the same row identity.

A GPU point result cannot finalize:

- root count or branch topology;
- a sign interval containing zero;
- a near-caustic row;
- an unresolved core row;
- a reduction whose enclosure exceeds budget;
- a candidate step whose accept/reject decision changes on replay.

Transfer compaction, difficult-row replay, and final assembly are included in
performance measurements. Reporting only the regular GPU kernel excludes the
cost that determines accepted EOM throughput.

## Multirate And Many-Order Timesteps

Fast and slow histories may use different step schedules only when:

- all interaction evaluations use time-aligned accepted history enclosures;
- a fast path never reads an unaccepted future segment of a slow path;
- block boundaries provide deterministic synchronization and rollback;
- dense output and cross-rate interpolation satisfy the history budget;
- event detection can subdivide every affected rate group;
- convergence toward a resolved common-step reference is demonstrated.

A reduced slow-sector law is a separate approximation with its own measured
error envelope. It cannot be introduced as a scheduling optimization of the
canonical Master Equation.

## Run Numeric Policy

Every request declares or resolves to a versioned policy containing:

- physical units and all nondimensional scales;
- epoch, local-time, and coordinate-frame representation;
- target absolute and relative budgets for position, velocity, root time,
  acceleration, and retained history;
- stage-budget allocation;
- initial and maximum precision in bits;
- permitted precision levels and libraries;
- maximum escalations, subdivisions, and rejected steps;
- rounding and enclosure modes;
- deterministic reduction policy;
- minimum and maximum timestep and history-slab rules;
- regulator values and regulator-refinement posture;
- CPU, accelerator, and distributed backend permissions;
- resource limits required for advancement.

Defaults may exist only inside a named policy version. Every result records the
fully resolved values rather than only the policy name.

## Failure Codes

At minimum, the numeric layer can reject with:

- numeric_time_unresolvable;
- numeric_scale_transform_uncertified;
- numeric_history_interpolation_uncertified;
- numeric_root_count_uncertified;
- numeric_root_identity_uncertified;
- numeric_transmitter_factor_sign_uncertified;
- numeric_receiver_factor_null_uncertified;
- numeric_core_integrand_uncertified;
- numeric_accumulation_budget_exceeded;
- numeric_step_budget_exceeded;
- numeric_cross_backend_disagreement;
- numeric_checkpoint_representation_incomplete;
- numeric_precision_limit_exhausted;
- numeric_resource_limit_exhausted.

Failure returns the best enclosures and provenance accumulated so far, but no
candidate history segment is labeled accepted or canonical.

## Acceptance Tests

The independent oracle and every promoted backend must pass:

1. epoch-shift invariance across steps many orders below the absolute epoch;
2. origin and scale-map invariance for identical physical histories;
3. manufactured root problems with known counts, tangencies, close pairs, and
   root-free complements;
4. $D_t$ sign and fold routing under increasing precision;
5. $D_r$ zero-crossing with uninterrupted root activity and acceleration;
6. core-coincidence zero-extension and $\epsilon_c$ refinement;
7. cancellation-heavy ordered-pair reductions against a stricter enclosure;
8. timestep and history-interpolation refinement;
9. cross-precision enclosure nesting or justified overlap;
10. single-thread and worker-count replay;
11. CPU, GPU, and difficult-row-return agreement;
12. checkpoint/restart with identical discrete decisions and overlapping
    accepted-state enclosures;
13. deliberate maximum-precision and resource-limit failures that publish no
    accepted step.

## Freeze Boundary

This contract is frozen as the numeric acceptance requirement for EOM v0.
Implementation choices may exceed it, but weakening a discrete certificate,
error budget, escalation route, or condition required for advancement requires an explicit
contract amendment or successor version.

The contract does not select a language, numeric library, integrator, CPU
layout, or accelerator API. Those decisions follow independent-oracle and
representative benchmark evidence.

## Priority Disposition

This packet is priority-only. It defines the numeric authority that the
independent oracle and later production implementations must satisfy; it does
not itself promote a physical trajectory, application result, or closure claim.
