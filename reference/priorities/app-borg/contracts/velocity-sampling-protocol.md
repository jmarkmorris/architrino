Closure goal: Measure one bounded velocity-scale-aware boundary-shell replay policy on EOM-extracted shell rows, keep calibration and holdout seeds separate, and fail closed unless every declared distribution, tail, correlation, seed-variance, patch-replay, and central-contribution check passes.

# Borg Velocity-Sampling Protocol v1

Status: analysis split, sampling policy, and acceptance limits frozen before result-bearing campaign execution on 2026-09-01. Two rejected preflight requests corrected only the EOM input-domain coverage: the central comparison time moved inside its declared receiver domain, and exact affine history was extended backward far enough for delayed-root evaluation. Neither correction used holdout metric values.

## Scope

The protocol id is `borg-velocity-sampling-protocol.v1`. Numerical work uses normalized $c_f=1$. The declared speed-magnitude range is $[0.2,0.8]$. Three calibration seeds (`101`, `202`, `303`) and two withheld holdout seeds (`404`, `505`) each produce six exact affine retained histories over $-10\leq T\leq5$. Every history lies at radius $0.1$ at $T=0$, crosses the EOM-declared radius-$1$ shell during $0\leq T\leq5$, and is advanced by the EOM solver from $T=5$ to $T=5.001$. The requested initial step is $10^{-3}$ and the certified controller may subdivide to $10^{-6}$ without changing the measured shell window. The shell uses the source-oriented `equal-area-zphi/v1` partition with two $z$ bands, four azimuth sectors, and two time bins.

The deterministic policy under test is `stratified-empirical-magnitude-and-patch.v1`. It resamples only calibration shell-crossing rows, with no invented velocity or patch. Replay seeds select complete observed rows; the policy does not interpolate a velocity, invent a tail sample, change polarity, or reuse a same-record path identity.

Plainly: the policy may repeat an observed calibration row, but it may not manufacture a new velocity. The two holdout seeds are not used to construct its empirical source pool.

## Frozen Checks

| Check | Definition | Limit |
| --- | --- | --- |
| Velocity-distribution residual | Relative weighted $L^2$ difference of six fixed-width speed-bin masses over $[0.2,0.8]$ | $\leq0.20$ |
| Tail-mass residual | Absolute difference in mass with speed $\geq0.7$ | $\leq0.10$ |
| Correlation residual | Absolute difference between speed/absolute-normal-velocity Pearson correlations | $\leq0.15$ |
| Seed-variance residual | Maximum standard deviation of speed-bin mass over 32 deterministic replay seeds | $\leq0.12$ |
| Patch-replay residual | Total-variation distance across the eight declared shell patches | $\leq0.25$ |
| Central-contribution residual | Relative difference of the mean EOM acceleration-contribution magnitude attached to crossing transmitters, with denominator floor $10^{-12}$ | $\leq10^{-3}$ |

Every check is required. `measured-within-budget`, holdout `passed`, and `measured-reduced-pass` are permitted only if all six pass and every EOM run reports complete shell coverage, zero unresolved crossing segments, a path-derived influence row for every crossing, and passing V11 paired residual transport rows. Otherwise the selected policy remains null, the holdout status is `failed` or `fail-closed`, and replay-affected central values remain `fail-closed-value`.

## Independence And Claim Boundary

The holdout split is independent of policy fitting because its seeds and EOM rows are withheld until the calibration pool and limits above are frozen. It is not an independent EOM-correctness oracle: every run uses the same current EOM executable and the same shell extractor. The campaign measures this bounded sampling policy against these EOM-run rows only. It cannot establish an unbounded constitutive distribution, physical benign noise, retained dynamics, stability, binding, or scientific acceptance.

Falsifier: any holdout seed enters the calibration pool; a replay row lacks an exact calibration source id; a speed lies outside the declared range; shell coverage is incomplete; a required metric is absent or exceeds its limit; or a non-passing campaign grants reduced-model value authority.
