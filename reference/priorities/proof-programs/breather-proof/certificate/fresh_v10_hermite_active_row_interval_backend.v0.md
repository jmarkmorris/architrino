# Fresh v10 Hermite Active-Row Interval Backend

## Scope

This packet is a priority-only interval backend for the active half-grid-256
Hermite dual rows. It takes the exact-rational active multipliers from
`fresh_v10_hermite_dual_rationalization_audit.v0.json`, reconstructs the
active sampled Hermite rows, encloses the trigonometric row bounds with rational
interval arithmetic, and audits the dual upper bound with exact stationarity
residual allowance.

It does not claim a continuous-in-the-collar obstruction, a repaired candidate,
a proof-interval pre-ledger pass, a live ledger update, branch-chart
authorization, or a theorem in AAA prose.

## Executed Command

```bash
node scripts/proof-programs/fresh-v10-hermite-active-row-interval-backend.mjs --pretty
```

## Result

Status: `proof_grade_sampled_dual_obstruction_closed`

| Quantity | Value |
| --- | --- |
| Active rows | 23 |
| Nodes | 270 |
| Objective interval | -0.000000000221428231006974 .. -0.000000000220546406841486 |
| Stationarity residual allowance | 0.000000000000046889309839 |
| Adjusted upper interval | -0.000000000221381341697135 .. -0.000000000220499517531647 |
| Nonzero stationarity residuals | 23 |
| Gamma residual cap used | no |
| Adjusted multiplier row | 1186 |
| Active speed guard lower bound | 0.027994697344905384 |
| Active speed guard satisfied | yes |

## Active Row Contributions

| Index | Row | Kind | lambda | row bound interval | lambda times bound |
| --- | --- | --- | --- | --- | --- |
| 1186 | `C_w_A2_A0_left_v10_2` | sampled_gap | 0.499999999999999 | 0.215739465896122791 .. 0.21573946589705727 | 0.10786973294806136 .. 0.1078697329485286 |
| 1591 | `C_u_A4_A2_left_v10_7` | sampled_gap | 0.03314232372755 | -0.215541515383946008 .. -0.215541515383015473 | -0.007143546679581511 .. -0.007143546679550671 |
| 1618 | `C_u_A4_A2_left_v10_7` | sampled_gap | 0.428865919782433 | -0.219382415771914212 .. -0.219382415771146868 | -0.094085641524114208 .. -0.09408564152378512 |
| 1627 | `C_u_A4_A2_left_v10_7` | sampled_gap | 0.010963751915271 | -0.220469821654066548 .. -0.220469821653321408 | -0.002417176429419402 .. -0.002417176429411232 |
| 1636 | `C_u_A4_A2_left_v10_7` | sampled_gap | 0.027028004574744 | -0.221268937285415305 .. -0.221268937284691322 | -0.00598045784919909 .. -0.005980457849179523 |
| 2568 | `speed_minus_348` | sampled_field_speed_sign | 0.000001927902386 | 0.053157072067272891 .. 0.053157072068055201 | 0.000000102481646074 .. 0.000000102481646075 |
| 2570 | `speed_minus_349` | sampled_field_speed_sign | 0.002108929076142 | 0.054675957401204587 .. 0.054675957401999376 | 0.000115307716329335 .. 0.000115307716331012 |
| 2572 | `speed_minus_350` | sampled_field_speed_sign | 0.003574870611019 | 0.055903632698038315 .. 0.055903632698845911 | 0.000199848253581453 .. 0.00019984825358434 |
| 2574 | `speed_minus_351` | sampled_field_speed_sign | 0.002197536959363 | 0.056828341960504684 .. 0.056828341961286868 | 0.000124882381797537 .. 0.000124882381799255 |
| 2576 | `speed_minus_352` | sampled_field_speed_sign | 0.003760541144271 | 0.057438814657507899 .. 0.057438814658289815 | 0.000216001025797761 .. 0.000216001025800701 |
| 2578 | `speed_minus_353` | sampled_field_speed_sign | 0.002045934790192 | 0.057724286528267605 .. 0.057724286529049656 | 0.000118100126047198 .. 0.000118100126048798 |
| 2580 | `speed_minus_354` | sampled_field_speed_sign | 0.003819714894174 | 0.057674519470887687 .. 0.05767451947167025 | 0.000220300221037285 .. 0.000220300221040274 |
| 2582 | `speed_minus_355` | sampled_field_speed_sign | 0.002091433650227 | 0.057279820479820114 .. 0.057279820480773274 | 0.000119796944030466 .. 0.000119796944032459 |
| 2584 | `speed_minus_356` | sampled_field_speed_sign | 0.003699361504542 | 0.056531059599588521 .. 0.056531059600530797 | 0.000209128825693716 .. 0.000209128825697201 |
| 2586 | `speed_minus_357` | sampled_field_speed_sign | 0.002260297162419 | 0.0554196868571645 .. 0.055419686858096198 | 0.000125264960945436 .. 0.000125264960947542 |
| 2588 | `speed_minus_358` | sampled_field_speed_sign | 0.003510255714076 | 0.053937748149124863 .. 0.053937748150046271 | 0.000189335288644898 .. 0.000189335288648132 |
| 2590 | `speed_minus_359` | sampled_field_speed_sign | 0.001369678678913 | 0.052077900049649595 .. 0.052077900050560983 | 0.000071329989340607 .. 0.000071329989341856 |
| 2594 | `speed_minus_361` | sampled_field_speed_sign | 0.000326233065116 | 0.047198236456253646 .. 0.047198236457145747 | 0.000015397625347229 .. 0.00001539762534752 |
| 2596 | `speed_minus_362` | sampled_field_speed_sign | 0.000212171788576 | 0.044166905166577857 .. 0.044166905167460665 | 0.000009370971265078 .. 0.000009370971265265 |
| 2598 | `speed_minus_363` | sampled_field_speed_sign | 0.000194669896716 | 0.040734654567180829 .. 0.040734654568054564 | 0.000007929810997369 .. 0.000007929810997539 |
| 2600 | `speed_minus_364` | sampled_field_speed_sign | 0.00015309387398 | 0.036897377268492285 .. 0.036897377269357157 | 0.00000564876242577 .. 0.000005648762425902 |
| 2602 | `speed_minus_365` | sampled_field_speed_sign | 0.00019310487111 | 0.032651641421054154 .. 0.032651641421910365 | 0.000006305191008159 .. 0.000006305191008324 |
| 2604 | `speed_minus_366` | sampled_field_speed_sign | 0.000108546874138 | 0.027994697344905384 .. 0.027994697345753131 | 0.000003038736889244 .. 0.000003038736889336 |

## Conclusion

The selected exact-rational active multipliers and outward-rounded active row bounds prove a negative upper bound for the finite sampled Hermite dual row system.

## Capture Decision

Priority-only. This packet advances the same-itinerary closure route by
checking the exact-rational active multipliers against outward-rounded sampled
row bounds. Any further use must still distinguish this finite sampled dual
obstruction from a continuous Hermite-family obstruction or a pre-ledger pass.
