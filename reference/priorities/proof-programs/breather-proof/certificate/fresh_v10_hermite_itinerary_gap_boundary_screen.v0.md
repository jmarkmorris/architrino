# Fresh v10 Hermite Itinerary Gap Boundary Screen

## Scope

This packet is a priority-only finite sampled LP screen for the shifted-separator
v10 strict-gap route. It asks whether a richer same-itinerary deformation basis,
modeled as an anti-periodic cubic Hermite function on the half period, can open
the sampled parent-complement collars while preserving retained field-speed sign
samples.

It does not claim an interval certificate, a repaired candidate, a proof-interval
pre-ledger pass, a live ledger update, branch-chart authorization, or a theorem
in AAA prose.

Artifacts:

- `fresh_v10_hermite_itinerary_gap_boundary_screen.v0.json`
- `fresh_v10_hermite_itinerary_gap_boundary_screen.v0.md`
- `../../../../../scripts/proof-programs/fresh-v10-hermite-itinerary-gap-boundary-screen.py`

## Executed Command

```bash
/Users/markmorris/vibe/.venv/bin/python scripts/proof-programs/fresh-v10-hermite-itinerary-gap-boundary-screen.py --pretty
```

## Hermite Screen

The variables are nodal values $H_i$, nodal derivatives $H'_i$, and a sampled
strict-gap margin $\gamma$. The screen imposes $|H_i|\le 1.0$
and $|H'_i|\le 80.0$ at the default solves.
The deformation is anti-periodic:
$$
H(\theta+1/2)=-H(\theta),
\qquad
H'(\theta+1/2)=-H'(\theta).
$$
It also locks the shifted separator derivatives by imposing
$$
H'(\sigma_1)=H'(\sigma_2)=0.
$$

For every sampled receiver/source pair in each v10 collar, the screen imposes
$$
z_{\ell,H}(\theta_r)-z_{\ell,H}(\theta_s)\ge \gamma
$$
or the reversed sampled orientation chosen by the v10 strict-gap target. For
retained field-speed samples it imposes
$$
\operatorname{sign}(\dot X_{\mathrm{fresh}}(\theta)-v)
\bigl(\dot X_H(\theta)-v\bigr)\ge 0,
\qquad v\in\{-1,+1\}.
$$

## Grid Refinement Results

| Half-grid | Nodes | Variables | gamma sample | max violation | Status |
| --- | --- | --- | --- | --- | --- |
| 8 | 22 | 45 | -0.00163075859822615 | 1.0547118733939e-14 | no_positive_sampled_margin_found |
| 12 | 26 | 53 | -0.000578689485164263 | 0 | no_positive_sampled_margin_found |
| 16 | 30 | 61 | -0.000280519122008049 | 0 | no_positive_sampled_margin_found |
| 24 | 38 | 77 | -8.72212816647056e-05 | 2.02504679691629e-13 | no_positive_sampled_margin_found |
| 32 | 46 | 93 | -4.43863692182211e-05 | 1.70974345792274e-14 | no_positive_sampled_margin_found |
| 48 | 62 | 125 | -1.2048103302383e-05 | 2.14273043752655e-13 | no_positive_sampled_margin_found |
| 64 | 78 | 157 | -6.20532162188499e-06 | 1.63424829224823e-13 | no_positive_sampled_margin_found |
| 80 | 94 | 189 | -3.23889031351998e-06 | 2.26818563930919e-13 | no_positive_sampled_margin_found |
| 96 | 110 | 221 | -1.53720769861042e-06 | 2.24709140184132e-13 | no_positive_sampled_margin_found |
| 128 | 142 | 285 | -6.81623205168816e-07 | 4.03121980241394e-12 | no_positive_sampled_margin_found |
| 160 | 174 | 349 | -2.7252874638316e-07 | 4.66959804157341e-13 | no_positive_sampled_margin_found |
| 192 | 206 | 413 | -2.87814929111896e-08 | 2.72049049954148e-12 | no_positive_sampled_margin_found |
| 224 | 238 | 477 | -2.12149864635312e-09 | 3.9288572395435e-12 | no_positive_sampled_margin_found |
| 256 | 270 | 541 | -2.20865857936394e-10 | 7.81574804875618e-12 | no_positive_sampled_margin_found |

Best sampled margin:
$$
\gamma_{\mathrm{sample}}=-2.20865857936394e-10.
$$

The best tested level is `256` with
`270` Hermite nodes and `541`
LP variables.

## Derivative-Bound Sensitivity

The derivative cap is not the active bottleneck in the tested high-resolution
screens: changing it over the listed range leaves the sampled margin unchanged
to the displayed precision.

| Half-grid | derivative bound | gamma sample | max violation |
| --- | --- | --- | --- |
| 128 | 40.0 | -6.81623205228031e-07 | 2.07833750209829e-13 |
| 128 | 80.0 | -6.81623205168816e-07 | 4.03121980241394e-12 |
| 128 | 160.0 | -6.81623205179414e-07 | 2.39808173319034e-13 |
| 128 | 320.0 | -6.81623205242773e-07 | 2.07833750209829e-13 |
| 128 | 640.0 | -6.81623205062993e-07 | 2.42111886095131e-13 |
| 256 | 40.0 | -2.20865817497741e-10 | 3.29669624932194e-12 |
| 256 | 80.0 | -2.20865857936394e-10 | 7.81574804875618e-12 |
| 256 | 160.0 | -2.20865817499182e-10 | 1.68609570749823e-11 |
| 256 | 320.0 | -2.20865462083091e-10 | 3.49549278411132e-11 |
| 256 | 640.0 | -2.20866119661056e-10 | 3.15858450505857e-11 |

## Limiting Rows At Best Level

| Row | Kind | Slack | theta | receiver theta | source theta |
| --- | --- | --- | --- | --- | --- |
| `speed_plus_395` | sampled_field_speed_sign | -7.81574804875618e-12 | 0.3955 | null | null |
| `speed_minus_140` | sampled_field_speed_sign | -3.8951064595949e-12 | 0.1405 | null | null |
| `speed_plus_845` | sampled_field_speed_sign | -2.26063612274174e-12 | 0.8455 | null | null |
| `speed_plus_117` | sampled_field_speed_sign | -1.3855583347322e-12 | 0.1175 | null | null |
| `speed_minus_246` | sampled_field_speed_sign | -1.25877086532e-12 | 0.2465 | null | null |
| `speed_minus_130` | sampled_field_speed_sign | -1.09001696557698e-12 | 0.1305 | null | null |
| `speed_minus_248` | sampled_field_speed_sign | -1.07358566481253e-12 | 0.2485 | null | null |
| `speed_plus_115` | sampled_field_speed_sign | -8.91287044169076e-13 | 0.1155 | null | null |

## Conclusion

The sampled Hermite sequence approaches the finite-itinerary boundary from below and does not find a positive strict-gap margin at any tested level.

Recommended next step: If this is pursued further, leave the same-itinerary bounded-basis repair route and make an explicit itinerary-changing branch decision or derive an interval dual obstruction.

## Capture Decision

Priority-only. This screen materially sharpens the proof route by showing that a
substantially richer same-itinerary Hermite basis reaches the sampled boundary
but still fails to produce positive strict-gap margin. Promotion should wait for
either an interval dual obstruction or an explicitly authorized itinerary change.
