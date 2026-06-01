# Higher-Fold One-Leaf Direct-Path Lambda Shift Screen

## Verdict

The direct-path lambda route gives a positive finite screen for the three
one-leaf boundary targets, but remains fail-closed as a proof artifact.

At the baseline packet value
`lambda=0.3`, the one-leaf constructor
records exact probe thresholds. Screening the same direct-path formula at
`lambda=0.305` gives positive sampled
active-endpoint boundary openings for
3 / 3
rows. The largest active-endpoint threshold predicted by this screen is
`lambda>0.301815056706425`,
so the trial value has margin
`0.00318494329357499`.

This does not consume any row. The trial lambda has not been recertified for
root topology or rerun through the proof-interval preledger, and it does not
prove monotonicity, memory margins, endpoint ownership/no-double-counting,
branch-reuse exclusion, or non-owned-complement closure.

| Quantity | Value |
| --- | ---: |
| Screen rows | 3 |
| Active endpoint stable rows | 3 |
| Trial sampled defects opened | 3 |
| Combined openings above probe thresholds | 3 |
| Proof-grade rows | 0 |
| Row consumption count | 0 |

## Screen Rows

| Row | Failed side | Probe threshold | Baseline sampled defect | Trial sampled defect | Combined opening | Opening margin | Active-endpoint lambda threshold | Positive screen |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| `R_w_A04_A03` | `lo` | 0.000026691996524 | 0.0000245932237599167 | -0.00016076283641997 | 0.000185356060179886 | 0.000158664063655886 | 0.300720019526139 | true |
| `R_u_A10_A09` | `lo` | 0.000026691996524 | 0.0000245932237596946 | -0.00016076283641997 | 0.000185356060179664 | 0.000158664063655664 | 0.300720019526139 | true |
| `R_u_A07_A06` | `hi` | 0.00024618430271 | 0.000243596080269803 | -0.000434576402819964 | 0.000678172483089767 | 0.000431988180379767 | 0.301815056706425 | true |

## Interpretation

For the two low-side rows, increasing `lambda` lowers the source boundary more
than it lowers the receiver boundary, so the combined lower-boundary opening is
positive. For the high-side row, increasing `lambda` lowers the receiver upper
boundary more than it lowers the source upper boundary, so the combined
upper-boundary opening is positive. These are candidate-change directions, not
accepted same-packet theorem fields.

## Capture Decision

Priority-only finite screen. The result identifies a concrete next candidate
route: rebuild or recertify the higher-fold packet near
`lambda=0.305`, then rerun the root topology and
proof-interval preledger before trying to consume the one-leaf rows. The screen
does not replace the one-leaf candidate-change boundary-data constructor; it
supplies the first positive candidate-change direction that could feed a future
proof-grade constructor.
