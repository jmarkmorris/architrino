# Solver Precision

This note owns the central solver's precision and dynamic-range strategy. The main [solver.md](solver.md) file keeps the cross-cutting requirement and task pointer; this document carries the detailed numeric forensics and policy.

## Core Problem

$\mathbb{A}\mathbb{A}\mathbb{A}$ solver variables can span many orders of magnitude in the general case and even inside one assembly. The stress is not only large absolute values. It also includes tiny local differences riding on large absolute coordinates, near-collision geometry, small Jacobians, branch births and deaths, field-speed threshold crossings, long path histories, and residuals whose meaningful scale may be far smaller than the raw terms used to compute them.

The precision problem appears in at least these variable families:

| Variable family | Precision stress | Solver consequence |
| --- | --- | --- |
| Position and radius | Absolute coordinates can be huge while local separations remain tiny. | Use local frames, scale normalization, and explicit authority labels for absolute display values. |
| Velocity and speed ratios | Orbital speed and assembly speed may differ by many decades and may cross the field-speed threshold. | Use speed-regime metadata, ratio charts such as $v / c_f$, event-local root handling, and precision escalation near threshold rows. |
| Acceleration and curvature | Fast orbital motion can ride on slower assembly drift. | Use multirate integration, interpolation error bounds, and synchronization diagnostics. |
| Potential and branch weights | Contributions can differ by many decades and may nearly cancel. | Use compensated or pairwise summation, cancellation diagnostics, signed-magnitude records, and stricter precision when needed. |
| Causal roots and delays | Residuals depend on differences between path geometry and signal distance. | Use robust bracketing, residual certificates, branch deduplication, and unresolved-root halt behavior. |
| Jacobian factors | Small $\lvert J_{ij} \rvert$ amplifies contributions and magnifies numeric error. | Use small-Jacobian diagnostics, interval or extended precision paths, and explicit branch-weight authority. |
| Path-history streams | Long histories mix storage precision, replay precision, and app projection precision. | Store numeric type, precision path, scale normalization, and error budgets in every stream manifest. |

Standard `f64` floating point already contains a sign, significand, and exponent. It can represent very large and very small magnitudes, but it does not automatically preserve local detail, cancellation safety, or root residual fidelity. Values such as `1e30` and `1e30 + 1` collapse to the same `f64`; subtracting nearly equal large terms can destroy meaningful digits; and a root residual can look clean in raw units while being badly conditioned relative to the declared tolerance.

### Position And Radius Metrics

The clearest value of the numeric-chart idea is position and radius tracking. A solver can need huge absolute coordinates for app display, persisted context, or inter-assembly placement while also needing tiny local differences for path intersections, causal roots, and near-collision geometry. The table uses `epsilon = 2^-52 ~= 2.22e-16` as an order-of-magnitude `f64` spacing estimate. Exact unit-in-the-last-place spacing depends on the binary exponent bucket, so these are scale diagnostics rather than bit-level certificates.

| Metric | Current absolute-coordinate path | Proposed chart-aware path | Cost or negative effect |
| --- | --- | --- | --- |
| Smallest distinguishable position step near coordinate magnitude `1e12` | Roughly `2.2e-4` coordinate units. | If the active local frame keeps the same path segment near magnitude `1e3`, roughly `2.2e-13` local units. | Requires frame origin, basis, unit, transform error, and authority metadata. |
| Smallest distinguishable position step near coordinate magnitude `1e18` | Roughly `2.2e2` coordinate units; small local motion can disappear. | If the active local frame keeps the local geometry near `1e3`, roughly `2.2e-13` local units. | Requires chart validity checks when paths drift far from the frame origin. |
| Smallest distinguishable position step near coordinate magnitude `1e30` | Roughly `2.2e14` coordinate units; `1e30 + 1` is not distinguishable from `1e30` in `f64`. | Local path geometry can still be tracked near its own scale if the chart remains valid; absolute display may be approximate or display-only. | Absolute values must carry authority labels so app display does not masquerade as solver authority. |
| Radius or separation comparisons across many decades | Direct subtraction or comparison can lose the small separation being tested. | Use nondimensional ratios, local-frame deltas, or log/signed-log magnitude where the operation is well conditioned. | Signed values, zero crossings, and vector subtraction need special handling; log charts are not universal. |
| Causal-root residual near large path coordinates | Residuals can look numerically small or large in raw units while being poorly conditioned. | Evaluate residuals in a chart tied to the local path segment and declared tolerance scale. | Bad chart selection must trigger precision escalation or a halt, not silent continuation. |

The solver therefore needs precision paths: declared simulation methods chosen by regime, not one universal numerical path.

## Local Idea History

The current precision policy grew from a scale question: $\mathbb{A}\mathbb{A}\mathbb{A}$ potentials, velocities, radii, accelerations, delays, and residuals can span dozens of decades, so the solver may lose precision even when a raw floating-point value remains representable. The first concrete proposal was to track `ln()` of scale-sensitive variables and treat the logarithm as an external translation at the solver edge rather than as a change to the $\mathbb{A}\mathbb{A}\mathbb{A}$ model.

The forensics resolved that proposal into a narrower and stronger design:

1. Tracking `ln(variable)` directly is not the model. It is a numeric chart.
2. Standard floating point already has exponent-like scale range, but it does not protect local distinguishability, cancellation, root residuals, or vector geometry when operations mix scales.
3. Other scientific fields use nondimensionalization, local frames, log-domain arithmetic, signed-log magnitude, adaptive precision, interval arithmetic, compensated summation, multirate integration, and validation replay.
4. $\mathbb{A}\mathbb{A}\mathbb{A}$ needs those techniques as a first-class solver contract because causal roots, field-speed thresholds, assembly-local state, path histories, and app replay all interact with scale at the same time.
5. The resulting design goal is a scale-native solver: the fundamental $\mathbb{A}\mathbb{A}\mathbb{A}$ model remains the same across scale, while the implementation selects numeric charts and precision paths that preserve that model up to declared precision and tractability limits.

The advancement is therefore not "use logarithms instead of floating point." The advancement is making numeric coordinate charts, chart authority, chart failure modes, and precision escalation explicit parts of the solver contract.

## Numeric Chart Principle

Decision: the $\mathbb{A}\mathbb{A}\mathbb{A}$ model remains authoritative in physical variables. The solver may use numeric coordinate charts at the implementation layer to preserve precision across scale. These charts are external translations at the solver boundary, not replacements for the model.

The strongest form of the log-scale idea is not to replace a variable by `ln(variable)` everywhere. It is to give the solver scale-aware charts for quantities where that representation improves conditioning:

```text
positive magnitude = exp(logMagnitude) * unit
signed scalar = sign * exp(logMagnitude) * unit
vector = direction * exp(logMagnitude) * unit
```

Useful chart families:

| Chart | Good for | Required metadata |
| --- | --- | --- |
| Local coordinate frame | Positions and path segments near an active region. | Origin, basis, unit convention, absolute-display authority, transform error. |
| Nondimensional ratio | Radii, distances, speed ratios, timestep ratios, and residual ratios. | Reference scale, unit, valid range, claim level. |
| Log magnitude | Positive scale variables such as radius magnitude, distance scale, potential magnitude when sign is separate, and timestep scale. | Unit, zero policy, lower cutoff, conversion error. |
| Signed log magnitude | Potentials, scalar residual families, and contributions that can change sign. | Sign, zero flag, log magnitude, cancellation diagnostics. |
| Direction plus log magnitude | Vectors whose direction and magnitude have different numeric stresses. | Unit direction, log magnitude, zero vector policy, direction error. |
| Interval or bounded chart | Root brackets, uncertain path segments, and strict validation replay. | Endpoint convention, rounding mode, containment guarantee, authority label. |

For velocity, the natural scale chart is often $\log(\lvert v \rvert / c_f)$ plus sign or direction and speed-regime metadata. In that chart, sub-field-speed regimes are negative, field speed is near zero, and super-field-speed regimes are positive. The chart is useful because it compresses many decades while keeping the field-speed threshold explicit.

The chart system must not hide zero crossings, sign changes, vector cancellation, or branch transitions. Any chart that cannot represent the requested operation safely must trigger a stricter chart, a stricter precision path, or a halt with a precise diagnostic.

## Relation To Floating Point

The log-chart idea is not a replacement for floating point. It is a conditioning strategy layered on top of numeric types.

Floating point already uses an exponent and therefore already handles broad magnitude range. The remaining problem is relative precision in operations that mix scales. The solver must distinguish:

- representability: whether the numeric type can store a magnitude at all;
- local distinguishability: whether two nearby values remain distinct after scaling;
- operation conditioning: whether additions, subtractions, roots, and vector operations retain meaningful digits;
- model authority: whether a stored value is authoritative, approximate, broad-phase-only, or display-only.

Log-domain arithmetic is excellent for multiplication, division, powers, ratios, probability-like products, and scale comparisons. It is not automatically safe for vector addition, subtraction, root residuals with cancellation, or any operation that crosses zero. Those cases need `log-sum-exp` style techniques, signed-log arithmetic, local-frame recentering, compensated summation, interval checks, or precision escalation.

## Existing Numerical Practice

The scale problem is not unique to $\mathbb{A}\mathbb{A}\mathbb{A}$. Astrophysics, orbital mechanics, plasma simulation, molecular dynamics, cosmology, chemical kinetics, radiation transport, Bayesian inference, and machine learning probabilities all handle many orders of magnitude.

Common techniques include:

- nondimensionalization: solve in natural units rather than raw physical units;
- local coordinate frames: solve local geometry near an origin instead of huge absolute coordinates;
- log-domain arithmetic: track logarithms for positive multiplicative quantities;
- signed log magnitude: keep sign and magnitude separate for values that may become negative;
- adaptive precision: escalate from `f64` to extended precision or multiprecision when conditioning requires it;
- interval arithmetic and directed rounding: track bounds rather than only point estimates;
- compensated or pairwise summation: reduce error when adding many terms;
- multirate integration: handle fast and slow clocks with different step policies;
- event-local root solving: isolate sharp transitions and branch changes with specialized methods;
- validation replay: rerun a production result with stricter tolerances or a stricter precision path.

$\mathbb{A}\mathbb{A}\mathbb{A}$ is not unique because it has scale. $\mathbb{A}\mathbb{A}\mathbb{A}$ is distinctive because the solver must combine huge scale range with causal roots, field-speed threshold behavior, many path histories, self and partner interactions, assembly-local state, and app-facing replay artifacts. That combination makes scale-aware representation a core solver contract rather than a late optimization.

## Precision Path Strategy

Decision: use an automatic precision-path selector that classifies the run before and during simulation. The selector considers orbital speed, assembly speed, field speed, relative speed ratios, path curvature, minimum separation, delayed-root density, Jacobian conditioning, target runtime, requested claim level, numeric chart suitability, and cancellation risk.

Chosen precision paths:

| Precision path | Use when | Required controls |
| --- | --- | --- |
| `scaled_f64_fast` | Interactive app runs where scales are moderate and conditioning is clean. | Nondimensionalized variables, explicit tolerances, residual checks, and fast failure when conditioning leaves the accepted range. |
| `scaled_f64_strict` | App or batch runs where `f64` is acceptable but cancellation, root bracketing, or dynamic range is tighter. | Local coordinate frames, compensated or pairwise summation, stricter root tolerances, deterministic reductions, and tighter diagnostics. |
| `adaptive_multirate` | Orbital and assembly speeds differ by large factors, or fast orbital motion rides on slower assembly drift. | Separate clock policies, substeps or event steps for fast motion, interpolation error bounds, and synchronization diagnostics. |
| `event_root_focused` | Causal roots, delayed hits, or branch transitions dominate accuracy. | Robust bracketing, root isolation, branch deduplication, residual certificates, and explicit unresolved-root halt behavior. |
| `extended_precision` | Scale separation, near-collision geometry, small $\lvert J_{ij} \rvert$, cancellation, or unsafe chart conversion makes ordinary scaled `f64` insufficient. | Arbitrary precision or interval-backed kernels, directed rounding where needed, strict error budgets, and lower-throughput batch/offline expectation. |
| `validation_replay` | A production result needs an independent precision check. | Replay with stricter tolerances or a higher precision path, compare residuals and path samples, and emit a parity report. |

The app-facing default is `auto`, not a fixed path. `auto` may select `scaled_f64_fast` only when conditioning is clean and the requested claim level is interactive. Saved runs, exported runs, migration parity runs, and benchmark runs should use at least `scaled_f64_strict` or `validation_replay`.

The precision path must be visible in every dataset and stream manifest. It should be possible to reproduce a run from its selected path, numeric type, numeric chart, scale normalization, tolerance policy, timestep policy, root policy, and error budget.

## Error Budgets And Escalation

Error-budget propagation is part of the precision path. The run manifest must state the global error budget and the stage budgets for root isolation, delayed-hit reconstruction, motion integration, stream encoding, indexed readback, projection, and app-facing display buffers. Each stage must declare whether its output is authoritative, approximate, broad-phase-only, or display-only. A downstream projection must not erase the stricter error bound or numeric type of the authoritative upstream result.

The solver should support automatic escalation when a run leaves the accepted conditioning envelope. Escalation options include:

- shrinking timesteps;
- switching to a local coordinate frame;
- switching to a log-magnitude or signed-log chart;
- increasing root iterations;
- changing summation strategy;
- switching to an interval-backed kernel;
- switching to a stricter precision path;
- halting with a precise diagnostic if the requested output claim level cannot be met.

Automatic escalation may only move toward a stricter or more expensive precision path. A caller may request a stricter path directly, but the solver should reject requests that would weaken the selected claim level. If no available precision path can meet the declared error budget, the solver must halt with a precision diagnostic rather than producing an ambiguous result.

## Renormalization Relationship

Renormalization in particle physics is about how effective parameters or descriptions change with observation scale or energy scale. Renormalization-group methods often use derivatives with respect to $\ln(\mu)$ or another log scale because scale ratios are the natural object. That overlaps with this precision note only at the level of scale awareness and log-scale bookkeeping.

The solver precision strategy is different. It is numerical scale management for one fundamental $\mathbb{A}\mathbb{A}\mathbb{A}$ model. Local frames, nondimensional ratios, log-magnitude charts, interval kernels, and precision escalation are implementation machinery for preserving the same underlying model across scale. They are not scale-dependent replacement laws.

Solver-design position: renormalization is not a first-order problem for this solver because the solver is intended to run a fundamental model with extreme precision across scale, up to declared precision and tractability limits. The solver should not need a scale-dependent replacement law merely to cross decades of radius, speed, potential, acceleration, or delay. It should carry the fundamental model through scale using scale-native numeric charts, explicit error budgets, and precision escalation.

This does not mean every literal macroscopic simulation is computationally practical. Entity count, all-to-all history, memory, and simulated duration can still force reduced models, assembly summaries, or offline/batch workflows. Those are tractability choices. They should remain derivable from, or testable against, the base solver rather than silently replacing the model with an unrelated effective law.

The practical rule is:

- use scale-aware charts and precision paths to preserve the fundamental model across numeric scale;
- use assembly-level or coarse-grained summaries only when the simulation envelope requires tractability reduction;
- label any summary, projection, or reduced model with claim level, omitted interactions, validation obligations, and replay limits;
- never use renormalization language to hide a precision failure, unresolved root, or model boundary.

## Implementation Requirements

The precision contract should add these implementation obligations:

1. Every run manifest records selected precision path, numeric chart, numeric type, unit convention, scale normalization, global error budget, stage error budgets, and claim level.
2. Every stream manifest records stored numeric type, authoritative precision path, scale normalization, and whether app-facing buffers are authoritative or projections.
3. Every root solve records residual scale, absolute residual, normalized residual, root tolerance, iteration count, bracket or isolation metadata, Jacobian value, Jacobian sign stratum, and first-failure code when no root is retained.
4. Every precision escalation records prior path, new path, triggering diagnostic, affected stage, and whether the claim level remains satisfied.
5. Every log or signed-log chart records zero policy, sign policy, reference unit, conversion error, and unsafe-operation diagnostics.
6. Every local-frame result records origin, basis, transform error, and whether any absolute coordinate is display-only.
7. Validation replay reruns saved results with stricter tolerances or stricter precision paths and emits a parity report instead of silently replacing the original result.
8. Precision failure is a halt status when no available path or chart can satisfy the declared claim level.
