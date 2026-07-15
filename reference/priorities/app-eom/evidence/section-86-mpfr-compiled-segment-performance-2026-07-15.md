# Section 86 MPFR compiled-segment performance — 2026-07-15

## Question

Can the remaining MPFR allocation and constant-copy cost be removed by
compiling retained-history segments once per precision attempt, without
changing a certificate or trajectory?

## Retained implementation

Each MPFR precision attempt now compiles the receiver and source retained
histories into immutable segment images containing:

- directed start- and end-time intervals;
- all twelve directed cubic position-coefficient intervals;
- the three derivative polynomials, using the same directed `3*c3` and `2*c2`
  operations as the previous per-evaluation path;
- directed position- and velocity-error intervals; and
- a pointer to the owning canonical cubic segment.

`mp_polynomial`, `mp_velocity`, correlated self-displacement, endpoint
screening, segment joins, and recursive cell geometry now reference these
compiled constants. Interval multiplication also uses fixed four-element
candidate arrays instead of allocating temporary vectors. Candidate order,
rounding modes, Horner order, cell splits, tolerances, precision levels, and
certificate rules are unchanged.

The compiled history exists only for one exact-pair precision attempt and is
rebuilt separately at 128, 256, or 512 bits. It cannot leak constants across
precision levels or requests.

## Profile transition

The prior decimal-token cache removed `mpfr_strtofr` from the active profile
but left cache lookup and allocator traffic visible. A one-second,
10-millisecond sample of the compiled-segment run contained neither decimal
parsing nor cache lookup among collapsed leaves. MPFR/GMP multiplication was
the largest active leaf; residual allocation/free traffic remained smaller.

## Matched measurements

All runs used the same Section 86 `imx` configuration, eight threads,
certificate-cost feedback, five accepted steps, one advisory rejection, and
the rounding-equivalent receiver endpoint near `t=0.003661130157804306`.

| Quantity | Decimal-cache mean | Compiled run 1 | Compiled run 2 | Compiled mean |
| --- | ---: | ---: | ---: | ---: |
| Wall seconds | `174.517416876` | `74.158367708` | `73.169065167` | `73.663716438` |
| Final-step seconds | `164.1975` | `65.2265` | `64.339` | `64.78275` |
| Root MPFR CPU seconds | `321.731566063` | `125.306818330` | `123.580508835` | `124.443663583` |
| Final-step MPFR attempts | 18 | 18 | 18 | 18 |
| Total MPFR attempts | 42 | 42 | 42 | 42 |
| Root pairs | 1980 | 1980 | 1980 | 1980 |
| Re-evaluated root cells | 683502 | 683502 | 683502 | 683502 |
| Warm-excluded root cells | 168716 | 168716 | 168716 | 168716 |

Derived performance:

- compiled segments versus the decimal-cache mean: `2.369110x` speedup and
  `57.7900%` less wall time;
- final MPFR step: `2.534587x` speedup and `60.5458%` less wall time;
- root MPFR CPU: `2.585359x` speedup and `61.3207%` less CPU time;
- compiled segments plus the prior decimal cache versus the paired pre-cache
  certificate-feedback baseline (`299.337702083` seconds): `4.063570x`
  speedup and `75.3911%` less wall time;
- the complete retained stack versus the paired continuous-only control
  (`318.615554583` seconds): `4.325271x` speedup and `76.8801%` less wall time;
- mean cost: `14.732743288` seconds per accepted step.

The precompiled-cache trajectory and both compiled-segment trajectories are
byte-identical with SHA-256
`48d245cb35bf95a093621495a50a6b5aa790e0d4d1b0f283bc40388d6075b351`.
Controller decisions, endpoint, MPFR attempts, root cells, and corrector
iterations are also identical.

## Validation

- EOM CMake build: passed.
- `PYTHONPATH=. ${AAA_VENV:-../.venv}/bin/python tests/test_eom_native_history_layer.py`:
  15 passed.
- `PYTHONPATH=. ${AAA_VENV:-../.venv}/bin/python tests/test_eom_native_coupled_evolution.py`:
  17 passed.
- Scoped `git diff --check`: passed.

## Claim grades

- **Measured:** profiles, timings, work counts, trajectory hashes, and test
  results.
- **Derived:** speedups and percentage reductions calculated from those
  measurements.
- **Inferred:** repeated constant construction and temporary allocation were
  causal cost drivers. The profile transition, identical work counts,
  byte-identical trajectory, and matched CPU/wall reductions support the
  inference; implementation parity is not an independent physical oracle.
