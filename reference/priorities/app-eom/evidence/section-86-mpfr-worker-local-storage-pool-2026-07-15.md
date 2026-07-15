# Section 86 MPFR worker-local storage pool — 2026-07-15

## Question

Can each exact-pair worker reuse initialized MPFR storage, removing the
allocation/free cost of short-lived interval values without changing an
interval bound or certificate decision?

## Baseline profile

**Measured:** a `sample` profile of the sign-directed pre-pool binary covered
4.238 seconds of the matched five-accepted-step run at one-millisecond
intervals. Its collapsed active leaves included:

- 1,025 `_xzm_free` samples, or `241.859` samples per profiled second;
- 776 tiny-allocation samples, or `183.105` per second;
- 164 `mpfr_init2` samples, or `38.6975` per second; and
- 145 `mpfr_free_func` samples, or `34.2143` per second.

The pre-pool diagnostic binary was linked at `2026-07-15 12:00:27 -0400`
from the sign-directed library built at `05:31:43`, after its source timestamp
of `05:31:24`.

## Retained implementation

Each exact-pair worker thread now owns a precision-keyed MPFR storage pool.
`MpFloat` construction leases an already initialized buffer when one is free;
destruction returns that buffer to an intrusive free list instead of calling
`mpfr_clear`. New storage is initialized only when a worker reaches a larger
simultaneous-live-value peak at that precision.

The 128-, 256-, and 512-bit free lists are separate. A leased buffer belongs
to exactly one `MpFloat`, and every arithmetic helper still overwrites the
destination with the same MPFR operation and rounding direction. Copy and move
operations preserve the prior numerical semantics. The pool is constructed
before the thread-local decimal cache, ensuring that cached values return
their buffers before the pool is destroyed when a worker exits.

**Derived:** storage retained by one worker is bounded by the maximum number of
simultaneously live `MpFloat` values reached at each precision, not by the
number of recursive cells or requests processed. This is a code-level bound,
not a measured resident-memory result. Growth in resident memory across
repeated identical batches would falsify the intended bounded-reuse behavior.

## Matched measurement

No other Section 86 process was running. The clean timing result excludes the
runs to which `sample` attached.

| Quantity | Baseline 1 | Baseline 2 | Baseline mean | Pooled 1 | Pooled 2 | Pooled mean |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Wall seconds | `39.666699917` | `39.765622500` | `39.716161209` | `21.488506167` | `21.526426750` | `21.507466459` |
| Final-step seconds | `31.2604` | `31.2811` | `31.27075` | `13.0843` | `13.1339` | `13.1091` |
| Root MPFR CPU seconds | `57.796160165` | `57.865932503` | `57.831046334` | `21.473825207` | `21.613957624` | `21.543891416` |
| MPFR attempts | 42 | 42 | 42 | 42 | 42 | 42 |
| Root pairs | 1980 | 1980 | 1980 | 1980 | 1980 | 1980 |
| Re-evaluated root cells | 683502 | 683502 | 683502 | 683502 | 683502 | 683502 |
| Warm-excluded root cells | 168716 | 168716 | 168716 | 168716 | 168716 | 168716 |

**Derived from the matched timings:**

- total wall time is `1.846622x` faster and `45.8471%` lower;
- the final MPFR-heavy interval is `2.385423x` faster and `58.0787%` lower;
- summed root MPFR CPU is `2.684336x` faster and `62.7468%` lower; and
- mean cost is `4.301493` seconds per accepted step.

## Post-change profile

**Measured:** the equivalent post-change `sample` profile ended when the
faster process completed, covering 3.221 seconds. `_xzm_free` contributed 16
collapsed leaves, or `4.9674` per profiled second: `97.9462%` below the
normalized baseline rate. Tiny allocation, `mpfr_init2`, and `mpfr_free_func`
each fell below the profiler's five-sample reporting threshold. Relative to
their normalized baseline rates, those thresholds imply reductions greater
than `99.1522%`, `95.9886%`, and `95.4630%`, respectively.

MPFR multiplication and the free-list-backed `MpFloat` constructor are now
the largest exact-pair arithmetic leaves. The allocator/free bottleneck is no
longer visible at its former scale.

## Bound and trajectory checks

**Measured:** the two clean baselines, both clean pooled runs, and the sampled
pre/post runs produced byte-identical trajectory CSVs with SHA-256
`48d245cb35bf95a093621495a50a6b5aa790e0d4d1b0f283bc40388d6075b351`.
Accepted/rejected steps, controller decisions, corrector iterations, MPFR
attempts, and root-cell counts were also identical.

**Derived:** pooling changes storage lifetime only. The same MPFR operation,
operands, precision, and directed rounding write every result, so it cannot
change an interval bound unless buffer ownership aliases or a value is read
before being overwritten. Exclusive leases and the passing worker-lifetime
tests exclude those two mechanisms on the exercised paths. A differing full
certificate token or an independent decimal-oracle failure would falsify this
claim.

## Validation

- EOM CMake build: passed.
- `PYTHONPATH=. ${AAA_VENV:-../.venv}/bin/python tests/test_eom_native_history_layer.py`:
  15 passed, including the independently authored decimal interval oracle.
- `PYTHONPATH=. ${AAA_VENV:-../.venv}/bin/python tests/test_eom_native_coupled_evolution.py`:
  17 passed.
- Scoped whitespace check: passed.
- Final source/library/binary timestamps: `12:02:40`, `12:02:52`, and
  `12:03:23 -0400`, respectively.

## Claim grades

- **Measured:** profiles, matched timings, work counts, trajectory hashes, and
  test results.
- **Derived:** bounded pool ownership, unchanged interval arithmetic, speedups,
  and percentage reductions calculated from the measurements.
- **Inferred:** repeated MPFR initialization and destruction caused most of the
  removed CPU and wall cost. The allocator profile collapse, matched CPU/wall
  reductions, unchanged work, and reference-binary parity support the
  inference.
