# Finite-Width Close-Approach And Caustic Route — Seed 0

## Verdict

- Date: 2026-07-16
- Claim level: `measured-current-binary`
- Route packet:
  [../finite-width-close-approach-caustic-route.md](../finite-width-close-approach-caustic-route.md)
- Outcome: `adjudicated-halt`
- Transit claim: none
- Publication: atomic through `1.3959374999999998`; the rejected candidate was
  not published
- Evolution halt: `caustic_transit_uncertified`
- First failed contract row: `FWC-REG-02`
- Nested failure: core-scale refinement level 2 exhausted the declared
  finite-width event cell budget

The route eliminates the generic `minimum_step_exhausted` terminal label for
this run. It does not certify passage through the encounter. Enforcing the
existing finite-width dispatch on every consumed `caustic_route_required` pair
exposes an earlier uncertified event for ordered pair `1006 <- 1003` around
$T=1.39$; the prior engine continued through that event without a regulator
certificate and failed later near $T=1.49$.

Falsifier: rerun the command below on the recorded source and obtain either
`minimum_step_exhausted`, a published segment after the failed event, no
`1006 <- 1003` regulator record, or a complete passing core-scale ladder.

## Reproduction

Build:

```bash
cmake -S src/eom -B /tmp/architrino-eom-build -DCMAKE_BUILD_TYPE=Release
cmake --build /tmp/architrino-eom-build --parallel 8
```

Measured run:

```bash
node scripts/eom/profile-borg-incremental-chunks.mjs \
  /tmp/architrino-eom-build/eom_borg_shadow_cli 28
```

Build freshness:

| Object | Timestamp |
| --- | --- |
| `src/eom/src/CoupledEvolution.cpp` | `2026-07-16 17:59:51 -0400` |
| `/tmp/architrino-eom-build/eom_borg_shadow_cli` | `2026-07-16 18:07:55 -0400` |

The binary is newer than the last route-source change.

## Live Outcome

| Field | Measured value |
| --- | ---: |
| Status | `halted` |
| Accepted end time | `1.3959374999999998` |
| Accepted atomic steps in the terminal chunk | 7 |
| Rejected atomic steps in the terminal chunk | 8 |
| Final attempted window | `[1.3959374999999998, 1.3960374999999998]` |
| Final attempted step | `0.0001` |
| Final correction residual | `1.62506e-5` |
| Native terminal-chunk wall time | `36.961 s` |
| Baseline chunk-28 wall time before route enforcement | `4.43897 s` |
| Baseline generic terminal time before route enforcement | `1.4904687499999998` |
| Baseline generic terminal-chunk wall time | `6.019 s` |

Cost claim grade: `measured`. Route enforcement made the terminal chunk about
$8.33\times$ the earlier chunk-28 wall time. This comparison measures current
execution cost, not equal accepted physics coverage, because the enforced route
halts at the earlier uncertified event.

Cost falsifier: repeat both binaries on the same machine and inputs and obtain a
materially different wall-time ratio after separating ordinary machine load.

## Causal-Width Ladder

The base core scale is held fixed at $\epsilon_c=0.2$.

| Level | $\eta$ | Impulse delta from prior | Position-moment delta from prior | Impulse enclosure width | Position-moment enclosure width | Cells | Status |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 0 | `0.2` | — | — | `4.09879e-8` | `2.20301e-10` | 286 | certified |
| 1 | `0.1` | `1.99117e-7` | `2.20319e-10` | `5.90091e-8` | `2.06308e-10` | 286 | certified |
| 2 | `0.05` | `1.32550e-7` | `2.06605e-10` | `9.55967e-8` | `2.06637e-10` | 286 | certified |

- Maximum ladder impulse delta: `2.32739e-7`
- Maximum ladder position-moment delta: `2.20352e-10`
- Declared convergence tolerance: `1e-3`
- Causal-width series verdict: `certified_convergent`

Claim grade: `measured`. Falsifier: any rerun level is uncertified or either
maximum ladder delta exceeds `1e-3`.

## Core-Scale Ladder And First Failure

The base causal width is held fixed at $\eta=0.2$.

| Level | $\epsilon_c$ | Impulse delta from prior | Position-moment delta from prior | Impulse enclosure width | Position-moment enclosure width | Cells | Status |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 0 | `0.2` | — | — | `4.09879e-8` | `2.20301e-10` | 286 | certified |
| 1 | `0.1` | `9.49168e-6` | `1.16532e-9` | `9.96278e-8` | `1.16531e-9` | 5,581 | certified |
| 2 | `0.05` | — | — | `2.42035e-7` | `8.73494e-10` | 200,001 | `event_impulse_cell_limit_exhausted` |

The first failed row is regulator certification, not coupled correction: the
final correction residual is inside the declared `0.1` correction tolerance,
while the level-2 core quadrature does not fit the `1e-7` impulse enclosure
budget before the 200,000-cell ceiling. The candidate therefore remains
unpublished.

Claim grade: `measured`. Falsifier: the same level-2 request certifies within
200,000 cells and all core-ladder deltas fit the declared convergence budget.

## Independent Reference

The independent reference is the Decimal interval joint causal-triangle
integrator in `scripts/eom/oracle/phase4_acceptance.py`. It now returns both

$$
\mathbf I_{ij}=\int_{T_0}^{T_1}\mathbf A_{ij}(T)\,dT
$$

and

$$
\mathbf M_{ij}=\int_{T_0}^{T_1}(T_1-T)\mathbf A_{ij}(T)\,dT.
$$

The reference extension was committed before the C++ engine change. The native
binary64 and MPFR synthetic-fold enclosures overlap the independently authored
Decimal oracle for every component of both vectors.

Claim grade: `measured-test`. Falsifier: either native vector has a component
whose interval does not overlap the corresponding Decimal oracle interval.

## Validation

| Validation | Result |
| --- | --- |
| `python -m unittest discover -s tests -p 'test_eom_*.py'` | 134 passed |
| `node --test tests/borg-*.test.js` | 61 passed |
| Native/Decimal event impulse and position-moment overlap | passed in binary64 and MPFR controls |
| Event resource exhaustion | failed closed |
| Atomic publication on route failure | passed; input histories retained |

## Disposition

This evidence is `priority-only`. It authorizes the named fail-closed
adjudication path, not a production transit claim. The next closure object is a
core-scale level-2 certificate within the declared resource envelope or an
independently justified replacement resource policy, followed by a rerun that
tests both impulse and position-moment state overlap before sharp-chart exit.
