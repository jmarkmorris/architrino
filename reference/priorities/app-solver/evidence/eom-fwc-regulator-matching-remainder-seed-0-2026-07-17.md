# FWC Regulator-Matching Remainder And Seed-0 Transit Evidence

## Scope And Outcome

- Date: 2026-07-17
- Binding authority:
  the ratified regulator-limit common-domain matching decision
- Route:
  [Finite-Width Close-Approach And Caustic Route](../contracts/finite-width-close-approach-caustic-route.md)
- Run grade: `certified`
- Regulator and event budgets: unchanged
- Decimal oracle: unchanged
- Outcome: first atomically published certified finite-width transit
- Published through: `T=0.34281250000000002`
- Later halt: `minimum_step_exhausted` after
  `numeric_step_budget_exceeded`; this is not an FWC row

The accepted child carries passing entry, regulator, endpoint assembly,
common-domain regulator matching, and exit rows for both routed ordered pairs.
It is therefore the first certified finite-width passage produced by this
route. The run then reaches the unchanged local step-error floor before a
second encounter or dispersal, so no broader horizon claim is made.

Claim grade: `measured` for the emitted certificates and atomic publication;
`derived` that a complete accepted FWC row set discharges this event under the
bound route. Falsifier: the recorded command does not publish the child, any
required row is absent or nonpassing, or the terminal failure is an FWC row.

## Implementation Certificate

The common-domain certificate schema is
`eom_native_fwc_common_domain_chart_certificate/v1`. It emits:

- the certified emission-coordinate $\partial_u^2P_0$ bound;
- the integrated Amendment 1 leading core-plus-causal-width term;
- the outward higher-order, tail, complement, and complete-integral residual;
- $R_I^{\mathrm{reg}}$ and $R_M^{\mathrm{reg}}$;
- the existing $R^{\mathrm{num}}$ rows;
- raw distance, regulator radius, complete remainder, and post-accounting
  distance.

For a sharp emission-time jet, the source-normal floor authorizes

$$
\frac{d^2P_0}{du^2}
=
\frac{P_{0,SS}}{D_s^2}
-
\frac{P_{0,S}D_{s,S}}{D_s^3}.
$$

The code never evaluates this quotient when the interval for $D_s$ contains
zero. A row does not advance if either its post-accounting distance is positive or
its complete remainder exceeds the unchanged event budget.

Claim grade: `derived-implementation`. Falsifier: direct differentiation gives
a different coordinate conversion; a zero-containing $D_s$ interval reaches
the quotient; or a certificate reports success with a positive
post-accounting distance or an over-budget remainder.

## Independent Analytic Control

The named independent reference is Amendment 1's stationary simple-root
closed form. The fixture uses separation `r=0.5`, causal width `eta=0.05`, core
scale `epsilon_c=0.1`, coupling `0.0001`, retained start `-2`, and reception
interval `[0,0.001]`. Direct normal-CDF evaluation gives:

| Quantity | Closed-form value |
| --- | ---: |
| Sharp impulse, component 0 | `-4.0000000000000003e-7` |
| Finite-width impulse, component 0 | `-3.7714641372727696e-7` |
| Exact regulator difference | `2.285358627272307e-8` |
| Sharp position moment, component 0 | `-2.0000000000000001e-10` |
| Finite-width position moment, component 0 | `-1.8857320686363847e-10` |
| Exact position-moment regulator difference | `1.1426793136361535e-11` |

The common-domain route emitted
`R_reg,I,0 = [-2.5918113797288757e-8,
2.5918113797288757e-8]`, which contains the exact difference. The stationary
$\partial_u^2P_0$ value is zero and is contained by the emitted outward
interval.
$R_{reg,M,0}=[-5.9485905372557729e-11,
5.9485905372557729e-11]$ likewise contains the exact position-moment
difference.

Claim grade: `derived analytic control` for the closed form and `measured` for
native containment. Falsifier: independently recomputing the normal-CDF
expression gives a value outside the emitted interval, or the stationary
second derivative is excluded.

## Recorded Raw-Gap Prediction

The accepted Amendment 1 route passes before the former minimum-height raw
overlap cell is naturally reached. A diagnostic rebuild that restored only
the former raw-overlap decision, without changing either chart evaluation,
revisited the recorded cell. The diagnostic switch was removed and the
production binary was rebuilt before acceptance testing.

| Pair and first side cell | Raw component-0 gap | $R_I^{num}$ | $R_I^{reg}$ | Matched distance |
| --- | ---: | ---: | ---: | ---: |
| `1004 <- 1006`, `[0.3425,0.34250000610351566]` | `3.51437e-11` | `6.29988e-16` | `5.11160e-11` | `0` |
| `1004 <- 1002`, same cell | `1.70130e-10` | `1.54408e-15` | `4.24835e-10` | `0` |

The first raw gap is unchanged from the Amendment 1 prediction. The new row
contains both recorded law differences, and both complete sums are below
`1e-7`.

Claim grade: `measured diagnostic control` for the reproduced raw gaps and
emitted remainder radii; `derived` for the zero matched distances calculated
from those outward values. Falsifier: repeating the diagnostic on the same
track moves the raw gap outside ordinary interval-token reproducibility, the
production source retains the diagnostic decision, or either regulator radius
fails to contain its gap.

## Per-Row Adjudication

The accepted atomic child is `[0.3425,0.3428125]`.

| Contract row | Result |
| --- | --- |
| `FWC-ENTRY-02` | pass; the routed event set contains `1004 <- 1006` and `1004 <- 1002` |
| `FWC-REG-01` | pass; both causal-width and core-scale series are `certified_convergent` |
| `FWC-REG-02` | pass; both accepted event impulses are `certified_complete`; the accepted child terminal core level uses `epsilon_c=0.05` and 276-277 cells per emitted evaluation |
| `FWC-STATE-01` endpoint assembly | pass for every accepted state certificate |
| `FWC-STATE-01` matching | pass; worst emitted accepted-child component has raw gap `5.62272e-8`, `R_num=2.02803e-12`, `R_reg=8.17978e-8`, total `8.17999e-8`, and post-accounting distance `0` |
| `FWC-EXIT-01` | pass for every accepted state certificate |
| Atomic result | accepted and published through `0.3428125` |

The parent regulator control still reproduces the previously certified
`epsilon_c=0.05` level with 5,440 cells and impulse width `9.69534e-8` before
the controller selects the smaller accepted child. No regulator value,
tolerance, cell ceiling, or event budget changed.

Claim grade: `measured`. Falsifier: the same rebuilt binary emits a different
first failed/passing row, changes a regulator input or budget, reports a
positive matched distance, or does not publish the child atomically.

## Continuation And Cost

The seven requested 0.05-time chunks produced:

| Requested interval | Accepted through | EOM solver wall seconds |
| --- | ---: | ---: |
| `[0,0.05]` | `0.05` | `0.169845` |
| `[0.05,0.10]` | `0.10` | `0.295415` |
| `[0.10,0.15]` | `0.15` | `0.402880` |
| `[0.15,0.20]` | `0.20` | `0.510242` |
| `[0.20,0.25]` | `0.25` | `0.620840` |
| `[0.25,0.30]` | `0.30` | `0.734458` |
| `[0.30,0.35]` | `0.3428125` | `5.09915` |

The terminal request accepted 18 atomic steps, rejected 6, then halted at the
minimum step after `numeric_step_budget_exceeded`. It therefore survives the
certified encounter but reaches neither a second encounter nor dispersal.

Claim grade: `measured cost` on the local machine. Falsifier: a repeat under
ordinary host load does not reproduce the same accepted endpoint and terminal
code, or wall timing falls outside normal load variation.

## Build And Validation

The production binary timestamp `2026-07-17 00:58:57 -0400` follows the last
route source timestamp `2026-07-17 00:58:35 -0400`. Its SHA-256 is
`cce9c94628e3b25648789742c8995fc6587c70f40c367d1dbbda8c4960138d86`.

The deterministic evolution fixture was run twice and produced the identical
SHA-256 `d38cb2c08d2f5ff297f5abf95556986468fba83566d9970970afd76575d464a0`.
The earlier certified fixture SHA is intentionally not a parity target for
this change because Amendment 1 changes the certified FWC status and adds
required certificate fields. Non-FWC behavior remains covered by the existing
deterministic and oracle tests.

| Validation | Result |
| --- | --- |
| Focused coupled-evolution Python | 22 passed |
| All `test_eom_*.py` | 145 passed in `147.110 s` |
| Borg JavaScript | 67 passed |
| `.githooks/pre-commit` | passed |
| Decimal oracle files changed | none |

Claim grade: `measured`. Falsifier: a repeat fixture digest changes, any suite
fails, an oracle file enters the implementation diff, or a relevant source is
newer than the tested binary.
