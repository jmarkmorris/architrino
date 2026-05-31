# Fresh v10 Hermite Dual Obstruction

## Scope

This packet is a priority-only numerical dual obstruction for the fresh v10
Hermite same-itinerary strict-gap LP. It asks whether the finite sampled LP has
nonnegative multipliers proving an upper bound
$$
\gamma\le b^T\lambda
$$
for the sampled strict-gap margin.

It does not claim a rational dual certificate, an outward-rounded interval
certificate, a repaired candidate, a proof-interval pre-ledger pass, a live
ledger update, branch-chart authorization, or a theorem in AAA prose.

Artifacts:

- `fresh_v10_hermite_dual_obstruction.v0.json`
- `fresh_v10_hermite_dual_obstruction.v0.md`
- `../../../../../scripts/proof-programs/fresh-v10-hermite-dual-obstruction.py`

## Executed Command

```bash
/Users/markmorris/vibe/.venv/bin/python scripts/proof-programs/fresh-v10-hermite-dual-obstruction.py --pretty
```

## Dual Form

For each sampled Hermite level, the primal screen is written as
$$
\max_x e_\gamma^Tx
\qquad
\text{subject to}
\qquad
Ax\le b.
$$
The dual certificate solves
$$
\min_{\lambda\ge0} b^T\lambda
\qquad
\text{subject to}
\qquad
A^T\lambda=e_\gamma.
$$
Any feasible dual multiplier vector gives the sampled upper bound
$$
\gamma\le b^T\lambda.
$$

Because this packet uses binary64 numerical multipliers, it also records a
residual-adjusted upper bound by adding
$$
\left|A^T\lambda-e_\gamma\right|\cdot B_x,
$$
where $B_x$ is the declared variable box bound vector for nodal values, nodal
derivatives, and the disclosed $\gamma$ residual cap. That cap is not included
as a proof row in the dual LP.

## Level Results

| Half-grid | Nodes | Primal vars | Dual vars | primal gamma | dual upper | residual allowance | adjusted upper | nonzero lambdas | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 64 | 78 | 157 | 3070 | -6.20532162208465e-06 | -6.20532162208531e-06 | 4.38889517330757e-15 | -6.20532161769642e-06 | 46 | negative_upper_bound_with_float_residual_allowance |
| 96 | 110 | 221 | 3198 | -1.53720769876349e-06 | -1.5372076987985e-06 | 3.32373973172672e-15 | -1.53720769547476e-06 | 46 | negative_upper_bound_with_float_residual_allowance |
| 128 | 142 | 285 | 3326 | -6.81623204553644e-07 | -6.81623205156523e-07 | 2.53764457407061e-15 | -6.81623202618878e-07 | 76 | negative_upper_bound_with_float_residual_allowance |
| 160 | 174 | 349 | 3454 | -2.72528745944093e-07 | -2.72528746403378e-07 | 4.02478636302037e-15 | -2.72528742378591e-07 | 98 | negative_upper_bound_with_float_residual_allowance |
| 192 | 206 | 413 | 3582 | -2.87814934837103e-08 | -2.87814931826738e-08 | 6.11443773987393e-16 | -2.878149257123e-08 | 30 | negative_upper_bound_with_float_residual_allowance |
| 224 | 238 | 477 | 3710 | -2.12149879427681e-09 | -2.12149861567035e-09 | 2.59717383278115e-15 | -2.12149601849651e-09 | 13 | negative_upper_bound_with_float_residual_allowance |
| 256 | 270 | 541 | 3838 | -2.20865953292879e-10 | -2.20865936650938e-10 | 3.72735941171401e-15 | -2.20862209291526e-10 | 23 | negative_upper_bound_with_float_residual_allowance |

The tightest residual-adjusted upper bound occurs at half-grid
`256`:
$$
\gamma\le -2.20862209291526e-10.
$$

## Dominant Multipliers At Tightest Level

| Row | Kind | lambda | theta | receiver theta | source theta |
| --- | --- | --- | --- | --- | --- |
| `C_w_A2_A0_left_v10_2` | sampled_gap | 0.5 | null | 0.349137745401563 | 0.11508361765 |
| `C_u_A4_A2_left_v10_7` | sampled_gap | 0.428865919782433 | null | 0.859455471504687 | 0.61508361765 |
| `C_u_A4_A2_left_v10_7` | sampled_gap | 0.0331423237275503 | null | 0.848551154638672 | 0.61508361765 |
| `C_u_A4_A2_left_v10_7` | sampled_gap | 0.0270280045747446 | null | 0.866725016082031 | 0.61508361765 |
| `C_u_A4_A2_left_v10_7` | sampled_gap | 0.0109637519152718 | null | 0.863090243793359 | 0.61508361765 |
| `speed_minus_354` | sampled_field_speed_sign | 0.00381971489417413 | 0.3545 | null | null |
| `speed_minus_352` | sampled_field_speed_sign | 0.00376054114427181 | 0.3525 | null | null |
| `speed_minus_356` | sampled_field_speed_sign | 0.00369936150454251 | 0.3565 | null | null |
| `speed_minus_350` | sampled_field_speed_sign | 0.00357487061101963 | 0.3505 | null | null |
| `speed_minus_358` | sampled_field_speed_sign | 0.00351025571407675 | 0.3585 | null | null |
| `speed_minus_357` | sampled_field_speed_sign | 0.00226029716241968 | 0.3575 | null | null |
| `speed_minus_351` | sampled_field_speed_sign | 0.00219753695936315 | 0.3515 | null | null |

## Active Multipliers At Tightest Level

Rows with $\lambda>1e-12$ are the concrete numerical
target for proof-grade rationalization or outward-rounded intervalization.

| Index | Row | Kind | lambda | theta | receiver theta | source theta | base row value |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1186 | `C_w_A2_A0_left_v10_2` | sampled_gap | 0.5 | null | 0.349137745401563 | 0.11508361765 | 0.215739465896843 |
| 1591 | `C_u_A4_A2_left_v10_7` | sampled_gap | 0.0331423237275503 | null | 0.848551154638672 | 0.61508361765 | -0.215541515383734 |
| 1618 | `C_u_A4_A2_left_v10_7` | sampled_gap | 0.428865919782433 | null | 0.859455471504687 | 0.61508361765 | -0.219382415771534 |
| 1627 | `C_u_A4_A2_left_v10_7` | sampled_gap | 0.0109637519152718 | null | 0.863090243793359 | 0.61508361765 | -0.220469821653705 |
| 1636 | `C_u_A4_A2_left_v10_7` | sampled_gap | 0.0270280045747446 | null | 0.866725016082031 | 0.61508361765 | -0.221268937285071 |
| 2568 | `speed_minus_348` | sampled_field_speed_sign | 1.92790238605801e-06 | 0.3485 | null | null | 0.0531570720677619 |
| 2570 | `speed_minus_349` | sampled_field_speed_sign | 0.00210892907614262 | 0.3495 | null | null | 0.0546759574016988 |
| 2572 | `speed_minus_350` | sampled_field_speed_sign | 0.00357487061101963 | 0.3505 | null | null | 0.0559036326985376 |
| 2574 | `speed_minus_351` | sampled_field_speed_sign | 0.00219753695936315 | 0.3515 | null | null | 0.0568283419609481 |
| 2576 | `speed_minus_352` | sampled_field_speed_sign | 0.00376054114427181 | 0.3525 | null | null | 0.0574388146579514 |
| 2578 | `speed_minus_353` | sampled_field_speed_sign | 0.00204593479019208 | 0.3535 | null | null | 0.0577242865287115 |
| 2580 | `speed_minus_354` | sampled_field_speed_sign | 0.00381971489417413 | 0.3545 | null | null | 0.0576745194713317 |
| 2582 | `speed_minus_355` | sampled_field_speed_sign | 0.00209143365022715 | 0.3555 | null | null | 0.0572798204806042 |
| 2584 | `speed_minus_356` | sampled_field_speed_sign | 0.00369936150454251 | 0.3565 | null | null | 0.0565310596003687 |
| 2586 | `speed_minus_357` | sampled_field_speed_sign | 0.00226029716241968 | 0.3575 | null | null | 0.0554196868579402 |
| 2588 | `speed_minus_358` | sampled_field_speed_sign | 0.00351025571407675 | 0.3585 | null | null | 0.0539377481498964 |
| 2590 | `speed_minus_359` | sampled_field_speed_sign | 0.00136967867891379 | 0.3595 | null | null | 0.0520779000504168 |
| 2594 | `speed_minus_361` | sampled_field_speed_sign | 0.000326233065116772 | 0.3615 | null | null | 0.0471982364570118 |
| 2596 | `speed_minus_362` | sampled_field_speed_sign | 0.000212171788576428 | 0.3625 | null | null | 0.0441669051673317 |
| 2598 | `speed_minus_363` | sampled_field_speed_sign | 0.000194669896716365 | 0.3635 | null | null | 0.0407346545679299 |
| 2600 | `speed_minus_364` | sampled_field_speed_sign | 0.000153093873980949 | 0.3645 | null | null | 0.0368973772692369 |
| 2602 | `speed_minus_365` | sampled_field_speed_sign | 0.000193104871110521 | 0.3655 | null | null | 0.0326516414217937 |
| 2604 | `speed_minus_366` | sampled_field_speed_sign | 0.000108546874138552 | 0.3665 | null | null | 0.02799469734564 |

## Conclusion

For every tested level, the numerical dual multipliers give a residual-adjusted negative upper bound on the sampled strict-gap margin.

Recommended next step: Rationalize or outward-round the active dual rows if a proof-grade same-itinerary obstruction is needed; otherwise make the itinerary/structural ansatz decision.

## Capture Decision

Priority-only. This numerical dual certificate materially strengthens the
same-itinerary no-go evidence, but promotion to proof-grade obstruction requires
rational or outward-rounded multipliers and interval-enclosed row data.
