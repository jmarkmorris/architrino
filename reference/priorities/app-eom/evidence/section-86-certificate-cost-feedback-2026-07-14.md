# Section 86 certificate-cost feedback — 2026-07-14

## Question

Can the continuous adaptive controller avoid MPFR-heavy certificate intervals
without surrendering its measured reduction in accepted-step count?

## Implemented policy

The feature is opt-in (`use_certificate_cost_feedback`). It does not use wall
time as a controller input and does not alter an acceptance tolerance.

1. Endpoint exact-pair searches run their binary64 rail first.
2. A pair that would escalate to MPFR can return the advisory failure
   `numeric_precision_escalation_deferred_for_cost_feedback` before paying the
   escalation cost.
3. The controller makes at most one deterministic `0.5` landing adjustment.
4. An adjusted acceptance suppresses immediate continuous-controller regrowth
   and starts a four-accepted-step cooldown. During cooldown, certification
   proceeds normally. This makes the policy cross a persistent precision
   boundary instead of approaching it through repeated subdivision.
5. The cooldown is included in the model fingerprint and checkpoint schema
   `eom_native_evolution_checkpoint/v3`, so restart behavior is deterministic.

Telemetry reports probe state, deferred pair count, MPFR attempts, and cooldown
state per attempted step. The Section 86 runner exposes the policy and its
parameters in the heartbeat header.

## Live policy discovery

Measured on the six-worldline Section 86 `imx` trajectory, eight threads,
`sharp_with_finite_width_fallback`, with position and velocity tolerances
`2e-6`, acceleration and quadrature tolerances `5e-3`, and correction tolerance
`2e-7`:

- The first expensive proposal, from `t=0.0020687264137924989` to
  `t=0.0036611301578043064`, identified exactly two deferred endpoint pairs:
  `M+<-M+` and `M-<-M-`. The advisory rejection took `0.111315792` seconds and
  performed zero MPFR attempts.
- A repeated-subdivision prototype reached `t=0.0032630292218013544` in
  `18.220548417` seconds with zero MPFR, but a matched-end run approached a
  persistent boundary near `t=0.00343` with ever-smaller accepted steps. This
  was a measured Zeno failure and was removed.
- A `1.25` landing-growth prototype found that endpoints through approximately
  `t=0.006` still required MPFR. Its bounded fallback was stopped after
  `10:34`, already at least `1.56x` slower than the continuous-only baseline.
  The growth policy was removed.

These measurements establish that this trajectory enters a persistent MPFR
certificate regime; the controller can make the crossing cheaper, but it
cannot skip the regime by endpoint selection within the tested step range.

## Retained result

The retained one-adjustment policy and the continuous-only controller reached
the same receiver time:

| Quantity | Continuous only | Cost feedback | Ratio or delta |
| --- | ---: | ---: | ---: |
| Accepted receiver time | `0.0036611301578043064` | `0.0036611301578043059` | rounding-equivalent |
| Wall seconds | `405.305441583` | `350.498944625` | `1.156367x` speedup |
| Accepted steps | 4 | 5 | one additional accepted step |
| Attempted steps | 4 | 6 | one advisory rejection |
| Advisory rejection rate | 0% | 16.667% | no error-budget rejection |
| Mean seconds per accepted step | `101.326360396` | `70.099788925` | `1.445459x` |
| MPFR attempts on the final accepted step | not separately retained | 18 | unavoidable crossing |

Measured wall time fell `13.5223%`. Relative to a pinned `0.0005` schedule,
the receiver time requires eight accepted steps (seven full steps plus the
remainder). Cost feedback used five, a `37.5%` step-count reduction. The
continuous-only run used four, so the retained policy preserves three of the
continuous controller's four saved accepted steps (`75%` of its step-count
gain).

The cost-feedback endpoint tracks the continuous-only reference:

- maximum position midpoint component delta: `1.637343038929373e-10`;
- maximum velocity midpoint component delta: `1.9535730633180037e-7`;
- all position interval components overlap;
- all velocity interval components overlap.

The midpoint deltas are below the unchanged `2e-6` position and velocity
tolerances. This comparison is implementation parity between two accepted
paths, not an independent physical oracle.

## Build and validation

The latest relevant source change was `2026-07-14 23:55:58 -0400`. The native
library was rebuilt at `23:56:05` and the diagnostic binary was relinked at
`23:56:10`, so the measured binary was 12 seconds newer than the latest source.

- `PYTHONPATH=. ${AAA_VENV:-../.venv}/bin/python tests/test_eom_native_history_layer.py`:
  15 passed.
- `PYTHONPATH=. ${AAA_VENV:-../.venv}/bin/python tests/test_eom_native_coupled_evolution.py`:
  17 passed.
- CMake native build: passed.

## Claim grades

- **Measured:** the live timings, attempted/accepted counts, MPFR telemetry,
  midpoint deltas, interval overlap, and failed prototype behavior above.
- **Derived:** the `1.156367x` speedup, `13.5223%` wall reduction, `37.5%`
  pinned-step reduction, and `75%` retained step-count gain.
- **Inferred:** splitting immediately before the persistent boundary reduces
  the work of the unavoidable MPFR crossing. The timing and MPFR telemetry
  support this interpretation, but no independent cost decomposition isolates
  the causal mechanism.

