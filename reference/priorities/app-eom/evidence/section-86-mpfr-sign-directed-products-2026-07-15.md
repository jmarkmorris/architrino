# Section 86 MPFR sign-directed products — 2026-07-15

## Question

Can certificate-equivalent interval algebra reduce the MPFR multiplication
cost exposed after retained-history constants were compiled once per precision
attempt?

## Profile

A five-second, one-millisecond live sample of the matched five-accepted-step
case placed `mpfr_mul` at the top of the active exact-pair leaves with 1,115
samples. Allocator/free leaves followed with 1,041 and 843 samples. The call
graph placed multiplication throughout `mp_geometry`, including cubic
polynomial evaluation, vector norms, normalization, and normal-factor dot
products.

The generic MPFR interval product evaluated all four corners twice: once with
downward rounding and once with upward rounding. It therefore paid eight MPFR
multiplications regardless of operand signs. A nonzero interval square paid
four.

## Certificate-equivalent algebra

For real intervals $X=[x_-,x_+]$ and $Y=[y_-,y_+]$, multiplication is monotone
in each operand on every fixed-sign quadrant. Consequently:

- fixed-sign or one-mixed-sign products need one lower corner and one upper
  corner;
- mixed-sign by mixed-sign needs two candidate lower corners and two candidate
  upper corners; and
- a nonzero interval square needs the endpoint nearest zero for its lower
  bound and the endpoint farthest from zero for its upper bound.

The retained implementation classifies the exact MPFR endpoint signs and
evaluates only those extremal corners. It uses the same operands and the same
`MPFR_RNDD` or `MPFR_RNDU` direction as the exhaustive implementation. Thus
the usual product uses two MPFR multiplications instead of eight,
mixed-by-mixed uses four, and a nonzero square uses two instead of four. No
bound is narrowed by approximation; only mathematically dominated corners are
omitted.

## Matched A-B-A measurement

PID 25817 was running an unrelated Section 86 finite-width campaign throughout
the comparison. It was not stopped or modified. Absolute timings therefore do
not replace an uncontested baseline. The pre-change and post-change binaries
were alternated under that same ambient load, and all runs used the same
five-accepted-step `imx` endpoint and certificate-cost policy.

| Quantity | Baseline A | Optimized 1 | Optimized 2 | Baseline B | Baseline mean | Optimized mean |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Wall seconds | `69.358749250` | `40.120734583` | `40.370535625` | `66.504099542` | `67.931424396` | `40.245635104` |
| Final-step seconds | `59.7657` | `31.5064` | `31.4641` | `58.1682` | `58.96695` | `31.48525` |
| Root MPFR CPU seconds | `114.593327000` | `58.252989253` | `58.249055128` | `111.636495249` | `113.114911125` | `58.251022191` |
| MPFR attempts | 42 | 42 | 42 | 42 | 42 | 42 |
| Root pairs | 1980 | 1980 | 1980 | 1980 | 1980 | 1980 |
| Re-evaluated root cells | 683502 | 683502 | 683502 | 683502 | 683502 | 683502 |
| Warm-excluded root cells | 168716 | 168716 | 168716 | 168716 | 168716 | 168716 |

Derived paired performance:

- total wall time: `1.687920x` faster and `40.7555%` lower;
- final crossing: `1.872844x` faster and `46.6053%` lower; and
- root MPFR CPU: `1.941853x` faster and `48.5028%` lower.

An equivalent five-second post-change sample contained 526 `mpfr_mul` leaves,
a measured `52.8251%` reduction. Allocation/free became larger than
multiplication in the active-leaf list. That transition identifies MPFR object
lifetime and temporary allocation as the next performance question; it does
not by itself establish that a particular allocation change will be safe or
valuable.

## Parity and validation

The two baselines, both optimized runs, the pre-existing compiled-segment run,
and the profiling run produced byte-identical trajectory CSVs with SHA-256
`48d245cb35bf95a093621495a50a6b5aa790e0d4d1b0f283bc40388d6075b351`.
Controller decisions, accepted/rejected steps, MPFR attempts, root cells, and
corrector iterations were unchanged.

- EOM CMake build: passed.
- `PYTHONPATH=. ${AAA_VENV:-../.venv}/bin/python tests/test_eom_native_history_layer.py`:
  15 passed.
- `PYTHONPATH=. ${AAA_VENV:-../.venv}/bin/python tests/test_eom_native_coupled_evolution.py`:
  17 passed.
- Scoped whitespace check: passed.

## Claim grades

- **Measured:** samples, A-B-A timings, work counts, trajectory hashes, and
  test results.
- **Derived:** the interval-corner reduction and its enclosure equivalence;
  speedups and percentage reductions calculated from matched measurements.
- **Inferred:** removing dominated MPFR products caused most of the measured
  CPU and wall-time reduction. The profile transition, unchanged work counts,
  byte-identical trajectory, and matched bracket support the inference;
  implementation parity is not an independent physical oracle.
