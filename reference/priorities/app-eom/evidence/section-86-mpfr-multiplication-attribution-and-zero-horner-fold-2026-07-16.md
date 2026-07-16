# Section 86 MPFR multiplication attribution and zero Horner fold — 2026-07-16

## Question

Where does `mpfr_mul` spend time in the merged five-accepted-step workload,
at which precision, and can one multiplication be removed without changing
any interval bound or certificate decision?

## Complete-run attribution

The macOS `sample` profiler was armed with `-wait` before each instrumented
diagnostic launched and sampled the complete run at one-millisecond intervals.
The instrumentation gave the production 128-, 256-, and 512-bit multiply
paths distinct symbols and gave each interval-product caller a distinct
non-inlined wrapper. It did not change operands, rounding, or certificate
logic. Both profiled trajectories have SHA-256
`48d245cb35bf95a093621495a50a6b5aa790e0d4d1b0f283bc40388d6075b351`.

**Measured:** the precision profile attributed 7,213 inclusive multiply-path
samples:

| Precision | General products | Square products | Total | Share |
| --- | ---: | ---: | ---: | ---: |
| 128 bits | 1,373 | 24 | 1,397 | 19.36% |
| 256 bits | 2,285 | 30 | 2,315 | 32.08% |
| 512 bits | 3,465 | 36 | 3,501 | 48.55% |

Square products account for only 90 samples, or 1.25%. This falsifies
specialized squaring as a material target for this workload.

The phase-matched caller profile attributed 7,092 samples that reached a
general multiply wrapper. The matrix is the direct joint attribution by caller
and precision; caller totals include only samples that descended into the
multiply path, not time in surrounding interval logic.

| Caller | 128 bits | 256 bits | 512 bits | Total | Share |
| --- | ---: | ---: | ---: | ---: | ---: |
| Position polynomial | 1,268 | 1,966 | 2,957 | 6,191 | 87.30% |
| Correlated error | 87 | 124 | 201 | 412 | 5.81% |
| Dot product | 39 | 53 | 102 | 194 | 2.74% |
| Velocity polynomial | 32 | 44 | 75 | 151 | 2.13% |
| Reciprocal product | 15 | 25 | 52 | 92 | 1.30% |
| Delay residual | 8 | 8 | 13 | 29 | 0.41% |
| Compiled derivative | 8 | 8 | 7 | 23 | 0.32% |
| **Total** | **1,457** | **2,228** | **3,407** | **7,092** | **100%** |

The corresponding precision shares in the caller profile are 20.54%, 31.42%,
and 48.04%. Sampling is statistical and perturbs scheduling, so these counts
attribute CPU presence; they do not supply the clean wall-time estimate below.

## Retained certificate-equivalent elimination

The position polynomial uses Horner evaluation,
`result * local_time + coefficient`. If either interval multiplicand is
exactly `[0,0]`, the product is exactly `[0,0]`, so the whole expression is the
already compiled `coefficient`. The retained branch copies that coefficient
instead of executing the interval multiply and add. It changes neither MPFR
precision nor any nonzero arithmetic path.

**Measured:** a temporary exact counter on the unoptimized expression found
39,622,752 position-polynomial interval products at each of 128, 256, and 512
bits. Exactly 2,159,928 at each precision had a zero operand: 6,479,784 of
118,868,256 products, or 5.4512%.

**Derived from the sign-directed interval operators:** every such product
would execute two `mpfr_mul` calls, and the following interval addition would
execute two `mpfr_add` calls. The branch therefore removes 12,959,568
`mpfr_mul` calls and the same number of `mpfr_add` calls in the matched
workload. The temporary profiler and counters were removed from production.

## Matched clean timing

No profiler was attached to timing runs. A preserved production binary and the
optimized binary used the same diagnostic main and build settings. The run
order was A-B-A-B-A-B. The optimized library timestamp
(`2026-07-16 03:01:09 -0400`) is newer than its last source change
(`03:00:38`), and the final diagnostic is newer again (`03:02:26`).

| Quantity | Baseline 1 | Optimized 1 | Baseline 2 | Optimized 2 | Baseline 3 | Optimized 3 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Solver wall seconds | 21.056722208 | 21.046027709 | 21.031829458 | 20.868994792 | 21.131540709 | 20.903922208 |
| Final MPFR-heavy step | 12.5805 | 12.3718 | 12.5235 | 12.4099 | 12.6260 | 12.3669 |
| Root-batch wall seconds | 15.275389080 | 15.114092455 | 15.255079333 | 15.088330748 | 15.330842836 | 15.109265376 |
| Root MPFR CPU seconds | 20.475345997 | 20.069045498 | 20.371624961 | 20.108387377 | 20.537888087 | 20.051297912 |

**Measured means and derived reductions:**

- solver wall: 21.073364125 to 20.939648236 seconds, saving 0.133715889
  seconds, or 0.6345% (`1.006386x`);
- seconds per accepted step: 4.214672825 to 4.187929647, saving 0.026743178;
- final MPFR-heavy step: 12.576666667 to 12.382866667 seconds, down 1.5409%;
- root-batch wall: 15.287103750 to 15.103896193 seconds, down 1.1984%; and
- root MPFR CPU: 20.461619682 to 20.076243596 seconds, down 1.8834%.

All three pairwise solver-wall differences favor the branch, but the effect is
small: the paired 95% interval for saved solver wall is -0.143 to 0.410
seconds with only three pairs. The narrower internal measurements are resolved
in this sample: root-batch wall saves 0.100 to 0.266 seconds and root MPFR CPU
saves 0.104 to 0.666 seconds at paired 95%. The retained claim is therefore a
small arithmetic-path improvement, not a statistically precise whole-run
speedup.

Every timing run executed 42 MPFR attempts, 1,980 root pairs, 683,502
re-evaluated root cells, and 168,716 warm-excluded root cells. Each accepted
five steps and rejected the same one cost-feedback probe.

## Bounds, trajectory, and precision validation

**Measured:** all six clean trajectories are byte-identical and have SHA-256
`48d245cb35bf95a093621495a50a6b5aa790e0d4d1b0f283bc40388d6075b351`.
Accepted times, step sizes, error estimates, controller decisions, corrector
iterations, MPFR attempts, and root-cell counts are unchanged.

Validation passed:

- a fresh optimized CMake build;
- 15 native history/root tests, including the independently authored decimal
  interval oracle;
- 17 native coupled-evolution tests;
- forced 96-, 192-, and 384-bit exact-pair fallback checks, each
  `certified_complete` with one root at the requested precision; and
- scoped whitespace validation.

## Claim grades and falsifiers

- **Measured:** profiler sample counts, zero opportunities, clean timings,
  work counts, hashes, fallback results, and test results.
- **Derived:** sample shares, eliminated operation counts, timing reductions,
  confidence intervals, and algebraic equivalence when an operand is exactly
  zero.
- **Inferred:** the eliminated Horner work causes the separated root-batch and
  root-MPFR reductions. The matched order and unchanged work support that
  inference, but three pairs do not isolate every machine-noise source.

A phase-matched repeat in which position-polynomial descendants no longer
dominate would falsify the attribution. Any changed interval bound, trajectory
byte, certificate decision, work count, independent-oracle result, or fallback
precision would falsify certificate equivalence. A larger matched timing set
whose root-batch or root-MPFR interval includes zero gain would overturn the
retention decision; a whole-run reversal would supersede the 0.6345% estimate.
