# Section 86 MPFR decimal-cache performance — 2026-07-15

## Question

Does the certificate-cost result replicate, and can the remaining middle
self-pair MPFR crossing be made cheaper without changing the certificate or
trajectory?

## Replicated controller comparison

The current pre-cache binary was rebuilt after the certificate-cost feedback
implementation. Two runs on that same binary reached the rounding-equivalent
receiver time near `t=0.003661130157804306`:

| Policy | Wall seconds | Accepted steps | Advisory rejections | Final-step seconds |
| --- | ---: | ---: | ---: | ---: |
| Continuous only | `318.615554583` | 4 | 0 | `311.842` |
| Certificate-cost feedback | `299.337702083` | 5 | 1 | `290.256` |

The paired controller result is a measured `1.064402x` speedup and `6.0505%`
wall-time reduction. This reproduces the direction of the 2026-07-14 result,
but not its earlier one-sample `13.5223%` magnitude. The feedback run retained
18 final-step MPFR attempts and the same accepted endpoint.

## Direct profile

A one-second, 10-millisecond live sample of the old-binary final crossing found
two active exact-pair workers. The other worker-pool threads were waiting. The
largest active collapsed leaf was `mpfr_strtofr`; `parsed_string_to_mpfr` and
allocator/free leaves were also prominent. Call paths placed these conversions
inside `mp_polynomial` and `mp_geometry`.

The implementation reparsed immutable decimal tokens—segment coefficients,
error radii, and time bounds—on every recursive MPFR cell evaluation.

## Retained change

`ExactPairBatch.cpp` now keeps a thread-local, attempt-local cache keyed by the
decimal token and directed rounding mode. Each token is parsed once at each
precision level. Cache values are copied at the same MPFR precision, which is
exact and preserves the original directed enclosure. The cache resets for each
128/256/512-bit attempt, so values never cross precision levels or requests.

No interval operation, split point, root tolerance, cell limit, precision
ladder, certificate decision, or controller rule changed.

An equivalent live sample after the change contained no
`mpfr_strtofr` or `parsed_string_to_mpfr` collapsed leaf. Allocation/copying
and MPFR arithmetic became the next visible costs.

## Matched optimized measurements

Two optimized certificate-feedback runs used the same command and endpoint as
the pre-cache feedback baseline:

| Quantity | Pre-cache paired baseline | Cache run 1 | Cache run 2 | Cache mean |
| --- | ---: | ---: | ---: | ---: |
| Wall seconds | `299.337702083` | `171.606387417` | `177.428446334` | `174.517416876` |
| Final-step seconds | `290.256` | `161.499` | `166.896` | `164.1975` |
| Root MPFR CPU seconds | `574.619258458` | `316.378604418` | `327.084527708` | `321.731566063` |
| Final-step MPFR attempts | 18 | 18 | 18 | 18 |
| Total MPFR attempts | 42 | 42 | 42 | 42 |
| Accepted/rejected attempts | 5/1 | 5/1 | 5/1 | 5/1 |

Derived performance:

- cache versus paired feedback baseline: `1.715231x` speedup and `41.6988%`
  less wall time;
- final MPFR step: `1.767725x` speedup and `43.4301%` less wall time;
- root MPFR CPU: `1.786021x` speedup and `44.0096%` less CPU time;
- combined cache plus feedback versus the paired continuous-only control:
  `1.825695x` speedup and `45.2263%` less wall time.

All three feedback trajectory CSVs—the pre-cache baseline and both optimized
runs—are byte-identical with SHA-256
`48d245cb35bf95a093621495a50a6b5aa790e0d4d1b0f283bc40388d6075b351`.
Root cells, warm exclusions, MPFR attempts, accepted steps, rejected steps,
corrector iteration counts, and endpoint time also remained identical.

## Validation

- EOM CMake build: passed.
- `PYTHONPATH=. ${AAA_VENV:-../.venv}/bin/python tests/test_eom_native_history_layer.py`:
  15 passed.
- `PYTHONPATH=. ${AAA_VENV:-../.venv}/bin/python tests/test_eom_native_coupled_evolution.py`:
  17 passed.
- Scoped `git diff --check`: passed.

## Claim grades

- **Measured:** run timings, sample stacks, attempt counts, cell counts,
  trajectory hashes, and test results.
- **Derived:** speedups and percentage reductions calculated from the measured
  timings.
- **Inferred:** repeated decimal parsing was a causal cost driver. The live
  stack removal, unchanged work counts, byte-identical trajectory, and matched
  wall/CPU reductions support this inference; the performance comparison is
  not an independent proof of implementation correctness.
