# Fresh v10 Hermite Dual Rationalization Audit

## Scope

This packet is a priority-only rational-multiplier audit for the fresh v10
Hermite sampled dual obstruction. It asks whether the active binary64 dual
multipliers can be replaced by exact rationals while preserving a negative
residual-adjusted upper bound against the current sampled row matrix.

It does not claim an outward-rounded interval row certificate, a repaired
candidate, a proof-interval pre-ledger pass, a live ledger update, branch-chart
authorization, or a theorem in AAA prose.

Artifacts:

- `fresh_v10_hermite_dual_rationalization_audit.v0.json`
- `fresh_v10_hermite_dual_rationalization_audit.v0.md`
- `../../../../../scripts/proof-programs/fresh-v10-hermite-dual-rationalization-audit.py`

## Executed Command

```bash
/Users/markmorris/vibe/.venv/bin/python scripts/proof-programs/fresh-v10-hermite-dual-rationalization-audit.py --pretty
```

## Denominator Cap Results

| Cap | Active | max abs delta | max denominator | dual objective | residual allowance | adjusted upper | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1000000 | 23 | 6.38835338795385e-12 | 993155 | -2.20527837310747e-10 | 1.42718606104405e-09 | 1.2066582237333e-09 | nonnegative_adjusted_bound_for_binary64_rows |
| 1000000000 | 23 | 1.11022302462516e-16 | 986613153 | -2.20865964406514e-10 | 5.68801850834115e-15 | -2.20860276388005e-10 | negative_adjusted_bound_for_binary64_rows |
| 1000000000000 | 23 | 1.11022302462516e-16 | 990329960595 | -2.20865964406514e-10 | 1.74052033822234e-15 | -2.20864223886175e-10 | negative_adjusted_bound_for_binary64_rows |

The selected denominator cap is `1000000000`. Against the current binary64
row matrix, the selected rational multipliers give
$$
\gamma\le -2.20860276388005e-10.
$$

This remains negative, so rationalizing the multiplier side is not the blocker.
The blocker is the missing outward-rounded interval row backend for the active
Hermite rows.

## Selected Active Rational Multipliers

| Index | Row | Kind | numerator | denominator | decimal | theta | receiver theta | source theta |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1186 | `C_w_A2_A0_left_v10_2` | sampled_gap | 1 | 2 | 0.5 | null | 0.349137745401563 | 0.11508361765 |
| 1591 | `C_u_A4_A2_left_v10_7` | sampled_gap | 27498197 | 829700332 | 0.0331423237275503 | null | 0.848551154638672 | 0.61508361765 |
| 1618 | `C_u_A4_A2_left_v10_7` | sampled_gap | 232893523 | 543045069 | 0.428865919782433 | null | 0.859455471504687 | 0.61508361765 |
| 1627 | `C_u_A4_A2_left_v10_7` | sampled_gap | 5249883 | 478840003 | 0.0109637519152718 | null | 0.863090243793359 | 0.61508361765 |
| 1636 | `C_u_A4_A2_left_v10_7` | sampled_gap | 3826741 | 141584296 | 0.0270280045747446 | null | 0.866725016082031 | 0.61508361765 |
| 2568 | `speed_minus_348` | sampled_field_speed_sign | 992 | 514548873 | 1.9279023860577e-06 | 0.3485 | null | null |
| 2570 | `speed_minus_349` | sampled_field_speed_sign | 593879 | 281602168 | 0.00210892907614262 | 0.3495 | null | null |
| 2572 | `speed_minus_350` | sampled_field_speed_sign | 3157839 | 883343579 | 0.00357487061101963 | 0.3505 | null | null |
| 2574 | `speed_minus_351` | sampled_field_speed_sign | 2164606 | 985014605 | 0.00219753695936316 | 0.3515 | null | null |
| 2576 | `speed_minus_352` | sampled_field_speed_sign | 3125396 | 831102727 | 0.00376054114427181 | 0.3525 | null | null |
| 2578 | `speed_minus_353` | sampled_field_speed_sign | 1324332 | 647299223 | 0.00204593479019208 | 0.3535 | null | null |
| 2580 | `speed_minus_354` | sampled_field_speed_sign | 2888191 | 756127376 | 0.00381971489417413 | 0.3545 | null | null |
| 2582 | `speed_minus_355` | sampled_field_speed_sign | 929941 | 444642841 | 0.00209143365022715 | 0.3555 | null | null |
| 2584 | `speed_minus_356` | sampled_field_speed_sign | 1812864 | 490047809 | 0.00369936150454251 | 0.3565 | null | null |
| 2586 | `speed_minus_357` | sampled_field_speed_sign | 2186759 | 967465268 | 0.00226029716241968 | 0.3575 | null | null |
| 2588 | `speed_minus_358` | sampled_field_speed_sign | 449309 | 127998937 | 0.00351025571407675 | 0.3585 | null | null |
| 2590 | `speed_minus_359` | sampled_field_speed_sign | 1351343 | 986613153 | 0.00136967867891378 | 0.3595 | null | null |
| 2594 | `speed_minus_361` | sampled_field_speed_sign | 175351 | 537502230 | 0.000326233065116772 | 0.3615 | null | null |
| 2596 | `speed_minus_362` | sampled_field_speed_sign | 118953 | 560644753 | 0.000212171788576429 | 0.3625 | null | null |
| 2598 | `speed_minus_363` | sampled_field_speed_sign | 4033 | 20717122 | 0.000194669896716349 | 0.3635 | null | null |
| 2600 | `speed_minus_364` | sampled_field_speed_sign | 27169 | 177466278 | 0.000153093873980949 | 0.3645 | null | null |
| 2602 | `speed_minus_365` | sampled_field_speed_sign | 69383 | 359302174 | 0.000193104871110521 | 0.3655 | null | null |
| 2604 | `speed_minus_366` | sampled_field_speed_sign | 24510 | 225801067 | 0.000108546874138553 | 0.3665 | null | null |

## Conclusion

The active Hermite dual multipliers admit an exact-rational candidate with
denominator cap `1000000000` while preserving a negative binary64-row
residual-adjusted upper bound. This is not proof-grade, but it narrows the next
proof task to interval-enclosing the active Hermite row coefficients and
checking the rational multipliers against those outward-rounded rows.

## Capture Decision

Priority-only. This audit strengthens the proof-grade intervalization route by
showing that the multiplier side can be made exact; the row-coefficient
interval backend remains the live obstruction.
