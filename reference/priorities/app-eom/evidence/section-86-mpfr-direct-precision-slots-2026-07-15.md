# Section 86 MPFR direct precision slots — 2026-07-15

## Question

Does replacing the worker-local MPFR pool's linear precision-bucket lookup
with direct 128-, 256-, and 512-bit slots reduce `MpFloat` construction cost
without changing certificate-facing output?

## Retained implementation

Each exact-pair worker now owns fixed free-list slots for the production
128-, 256-, and 512-bit precision ladder. `MpFloatStorage` remembers the
free list from which it was acquired, so release is a direct pointer update
instead of a second precision search. API-valid nonstandard precisions retain
a stable fallback list whose nodes do not move when the owning vector grows.

The implementation changes storage lookup only. MPFR operations, operands,
precision, directed rounding, interval bounds, and certificate decisions are
unchanged.

## Matched clean timing

No other EOM process was running. The preserved linear-lookup and direct-slot
binaries were built from the same source stack except for the pool lookup
change. Profiled runs are excluded from the clean timing means.

| Quantity | Linear 1 | Linear 2 | Linear mean | Direct 1 | Direct 2 | Direct mean |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Solver wall seconds | `23.273814292` | `22.032284458` | `22.653049375` | `21.373767917` | `21.362277125` | `21.368022521` |
| Seconds per accepted step | — | — | `4.530609875` | — | — | `4.273604504` |
| Final MPFR-heavy step seconds | `13.9656` | `13.3569` | `13.66125` | `12.6339` | `12.9221` | `12.778` |
| Root MPFR CPU seconds | `22.853607789` | `21.960140331` | `22.406874060` | `20.567472291` | `20.976658253` | `20.772065272` |

**Derived from the matched measurements:**

- total solver wall time is `1.060138x` faster and `5.6726%` lower;
- mean cost falls by `0.257005371` seconds per accepted step;
- the final MPFR-heavy interval is `1.069123x` faster and `6.4654%` lower;
  and
- summed root MPFR CPU is `1.078702x` faster and `7.2960%` lower.

Every run used 42 MPFR attempts, 1,980 root pairs, 683,502 re-evaluated root
cells, and 168,716 warm-excluded root cells.

## Phase-matched constructor profile

The macOS `sample` profiler was armed with `-wait` before each preserved
binary launched, then covered the complete five-accepted-step run at a
one-millisecond interval. This removes the earlier phase mismatch: both
profiles begin at process start, execute identical work, and end when the
process exits.

| Collapsed top-of-stack sample | Linear lookup | Direct slots |
| --- | ---: | ---: |
| Main samples | `19,365` | `19,230` |
| `MpFloat::MpFloat(long)` | `1,938` | `1,335` |
| Constructor share of main samples | `10.007746%` | `6.942278%` |
| `mpfr_mul` | `2,982` | `2,985` |
| `mpfr_mul` share of main samples | `15.398916%` | `15.522621%` |

**Derived:** normalized constructor presence fell `30.6310%`, or
`1.441565x`. The nearly unchanged normalized `mpfr_mul` presence (`+0.8033%`)
is a useful control: the lookup change removed constructor work without
removing arithmetic work.

Sampling perturbs scheduling, so the profile runs are evidence about where
CPU time is spent, not the wall-time speedup. The clean unsampled runs above
provide the cost measurement.

## Bounds, trajectory, and precision checks

**Measured:** all clean, full-profile, and merged-validation trajectories are
byte-identical with SHA-256
`48d245cb35bf95a093621495a50a6b5aa790e0d4d1b0f283bc40388d6075b351`.
Accepted and rejected steps, controller decisions, corrector iterations,
MPFR attempts, and root-cell counts are unchanged.

An API-level smoke program forced exact-pair certification at 96, 192, and
384 bits. Each completed with one root at the requested precision, exercising
the nonstandard fallback rather than the direct production slots.

## Merged-build validation

The EOM diagnostic/checkpoint work was subsequently merged. The final source
timestamp was `2026-07-15 16:43:48 -0400`, the native library was newer at
`17:01:34`, and the merged diagnostic was freshly linked at `17:38:16`.

Two clean merged-build runs took `24.229747458` and `23.124036583` solver
seconds, averaging `23.676892021`, or `4.735378404` seconds per accepted
step. These are current-build absolute measurements, not a matched estimate
of the slot speedup: later merged code and machine conditions differ from the
preserved A/B pair. Their trajectories and all work counts match the A/B
records.

Validation passed:

- EOM CMake build;
- 15 native history/root-layer tests, including the independently authored
  decimal interval oracle;
- 17 native coupled-evolution tests;
- forced 96-, 192-, and 384-bit fallback smoke checks; and
- scoped whitespace validation.

## Claim grades and falsifiers

- **Measured:** clean timings, complete-run profiles, work counts, hashes,
  precision-smoke results, merged-build timings, and test results.
- **Derived:** speedups, percentage reductions, normalized profile shares,
  and direct release ownership from the implementation.
- **Inferred:** linear bucket search was responsible for most of the removed
  constructor samples. The unchanged arithmetic sample share and work counts
  support that inference.

A repeated phase-matched profile with no constructor-share reduction would
falsify the profile claim. A changed full trajectory hash, certificate token,
work count, or independent decimal-oracle result would falsify the unchanged-
bounds claim. A new matched A/B timing whose confidence interval includes no
gain would supersede the `5.6726%` cost estimate.
