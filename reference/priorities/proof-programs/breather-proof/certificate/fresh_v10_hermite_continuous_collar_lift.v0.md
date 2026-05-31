# Fresh v10 Hermite Continuous-Collar Lift

## Scope

This packet is a priority-only logical lift from the proof-grade active sampled
Hermite dual obstruction to the declared continuous collar target. It verifies
that the active gap rows are exact samples inside the closed collar products
and that the active speed rows are retained midpoint speed-sign samples. The
proof step is sample-subset inclusion: a continuous same-itinerary Hermite
candidate satisfying the collar and retained speed-sign families must satisfy
these active sampled rows, and those rows already carry an exact-rational
negative dual upper bound.

It does not prove row-variation bounds between samples, accept a repaired
candidate, pass the proof-interval preledger, update a live ledger, authorize a
branch chart, or promote a theorem into AAA prose.

## Executed Command

```bash
node scripts/proof-programs/fresh-v10-hermite-continuous-collar-lift.mjs --pretty
```

## Result

Status: `continuous_same_itinerary_obstructed_by_active_sample_subset`

| Quantity | Value |
| --- | --- |
| Active gap rows embedded | 5 / 5 |
| Active speed rows embedded | 18 / 18 |
| Inherited active sampled adjusted upper interval | -0.000000000221381341697135 .. -0.000000000220499517531647 |
| Gamma residual cap used | no |
| Gap sample count per interval | 9 |
| Speed midpoint samples | 1000 |

## Gap Sample Embeddings

| Index | Row | Orientation | receiver sample | source sample | embedded |
| --- | --- | --- | --- | --- | --- |
| 1186 | `C_w_A2_A0_left_v10_2` | receiver_below_source | 1/8 | 8/8 | yes |
| 1591 | `C_u_A4_A2_left_v10_7` | source_below_receiver | 1/8 | 8/8 | yes |
| 1618 | `C_u_A4_A2_left_v10_7` | source_below_receiver | 4/8 | 8/8 | yes |
| 1627 | `C_u_A4_A2_left_v10_7` | source_below_receiver | 5/8 | 8/8 | yes |
| 1636 | `C_u_A4_A2_left_v10_7` | source_below_receiver | 6/8 | 8/8 | yes |

## Speed Sample Embeddings

| Index | Row | midpoint sample | signed guard lower | embedded |
| --- | --- | --- | --- | --- |
| 2568 | `speed_minus_348` | 348/1000 | 0.053157072067272891 | yes |
| 2570 | `speed_minus_349` | 349/1000 | 0.054675957401204587 | yes |
| 2572 | `speed_minus_350` | 350/1000 | 0.055903632698038315 | yes |
| 2574 | `speed_minus_351` | 351/1000 | 0.056828341960504684 | yes |
| 2576 | `speed_minus_352` | 352/1000 | 0.057438814657507899 | yes |
| 2578 | `speed_minus_353` | 353/1000 | 0.057724286528267605 | yes |
| 2580 | `speed_minus_354` | 354/1000 | 0.057674519470887687 | yes |
| 2582 | `speed_minus_355` | 355/1000 | 0.057279820479820114 | yes |
| 2584 | `speed_minus_356` | 356/1000 | 0.056531059599588521 | yes |
| 2586 | `speed_minus_357` | 357/1000 | 0.0554196868571645 | yes |
| 2588 | `speed_minus_358` | 358/1000 | 0.053937748149124863 | yes |
| 2590 | `speed_minus_359` | 359/1000 | 0.052077900049649595 | yes |
| 2594 | `speed_minus_361` | 361/1000 | 0.047198236456253646 | yes |
| 2596 | `speed_minus_362` | 362/1000 | 0.044166905166577857 | yes |
| 2598 | `speed_minus_363` | 363/1000 | 0.040734654567180829 | yes |
| 2600 | `speed_minus_364` | 364/1000 | 0.036897377268492285 | yes |
| 2602 | `speed_minus_365` | 365/1000 | 0.032651641421054154 | yes |
| 2604 | `speed_minus_366` | 366/1000 | 0.027994697344905384 | yes |

## Lemma Used

If a same-itinerary continuous Hermite candidate satisfies the closed collar gap inequalities and retained midpoint speed-sign inequalities with margin gamma, then it satisfies each active sampled inequality embedded below. The active exact-rational dual certificate therefore bounds every such continuous candidate by the inherited negative sampled upper bound.

This is an obstruction-only lift. It uses the active sampled rows as a subset of the continuous target; it does not need or provide row-variation bounds between samples.

## Conclusion

The active proof-grade sampled dual obstruction embeds into the declared continuous collar target by sample-subset inclusion, so a positive same-itinerary continuous Hermite repair is impossible inside this family.

## Capture Decision

Priority-only. This packet closes the logical continuous-target lift for the
generic same-itinerary Hermite sampled obstruction, but it remains an
obstruction certificate rather than a constructive continuous row-enclosure
certificate. Any positive repaired candidate still needs its own continuous
preledger enclosures.
