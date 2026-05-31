# Fresh v10 Period-Coupled Hermite Itinerary Screen

## Scope

This packet is a priority-only finite sampled LP screen for a different
same-itinerary structural ansatz. It keeps the anti-periodic cubic Hermite
deformation but adds a period tangent $b_T$ and locks the field-speed separator
contacts by the numerator condition
$$
H'(\sigma_i)-v_i b_T=0.
$$
The retained field-speed sign constraints are imposed directly on
$$
X'_{\mathrm{fresh}}(\theta)+H'(\theta)-v(T_0+b_T),
\qquad v\in\{-1,+1\}.
$$

It does not claim an interval certificate, a repaired candidate, a proof-interval
preledger pass, a live ledger update, branch-chart authorization, or a theorem
in AAA prose.

Artifacts:

- `fresh_v10_period_coupled_hermite_itinerary_screen.v0.json`
- `fresh_v10_period_coupled_hermite_itinerary_screen.v0.md`
- `../../../../../scripts/proof-programs/fresh-v10-period-coupled-hermite-itinerary-screen.py`

## Executed Command

```bash
/Users/markmorris/vibe/.venv/bin/python scripts/proof-programs/fresh-v10-period-coupled-hermite-itinerary-screen.py --pretty
```

## Structural Screen

The variables are $b_T$, nodal values $H_i$, nodal derivatives $H'_i$, and a
sampled strict-gap margin $\gamma$. The screen imposes
$|b_T|\le 0.25$,
$|H_i|\le 1.0$,
and $|H'_i|\le 80.0$.

For every sampled receiver/source pair in each v10 collar, the screen imposes
the selected oriented null-coordinate gap with
$$
z_{\ell,H,b_T}(\theta)= (T_0+b_T)\theta \pm (X_{\mathrm{fresh}}(\theta)+H(\theta)).
$$

| Half-grid | Nodes | Variables | b_T | gamma sample | max violation | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 16 | 30 | 62 | -0.25 | -0.000280519122008085 | 4.2632564145606e-13 | no_positive_sampled_margin_found |
| 24 | 38 | 78 | -0.25 | -8.72212816646772e-05 | 9.85878045867139e-13 | no_positive_sampled_margin_found |
| 32 | 46 | 94 | -0.25 | -4.43863692182615e-05 | 1.29496413592278e-12 | no_positive_sampled_margin_found |
| 48 | 62 | 126 | 0.25 | -1.20481033023875e-05 | 1.424638185199e-12 | no_positive_sampled_margin_found |
| 64 | 78 | 158 | -0.25 | -6.2053216220794e-06 | 1.19015908239817e-13 | no_positive_sampled_margin_found |
| 80 | 94 | 190 | -0.25 | -3.23889031331881e-06 | 7.87636622590071e-12 | no_positive_sampled_margin_found |
| 96 | 110 | 222 | 0.25 | -1.5372076987422e-06 | 4.2366110619696e-13 | no_positive_sampled_margin_found |
| 128 | 142 | 286 | 0.25 | -6.81623205081327e-07 | 1.55431223447522e-12 | no_positive_sampled_margin_found |
| 160 | 174 | 350 | 0.25 | -2.72460689360688e-07 | 3.00737212910462e-12 | no_positive_sampled_margin_found |
| 192 | 206 | 414 | 0.25 | -2.87814932596073e-08 | 3.74367203903603e-12 | no_positive_sampled_margin_found |
| 224 | 238 | 478 | 0.25 | -2.12149859092268e-09 | 2.47517562002031e-11 | no_positive_sampled_margin_found |
| 256 | 270 | 542 | 0.25 | -2.20865843237662e-10 | 4.89261964276011e-11 | no_positive_sampled_margin_found |

Best sampled margin:
$$
\gamma_{\mathrm{sample}}=-2.20865843237662e-10.
$$

The best tested level is `256` with
`270` Hermite nodes and `542`
LP variables. Its period tangent is
$$
b_T=0.25.
$$

## Period-Bound Sensitivity

| Half-grid | period bound | b_T | gamma sample | max violation |
| --- | --- | --- | --- | --- |
| 128 | 0.05 | 0.05 | -6.81623205137867e-07 | 1.49857903863904e-12 |
| 128 | 0.1 | 0.1 | -6.81623205025115e-07 | 1.50945922428036e-12 |
| 128 | 0.176804284695 | 0.176804284695 | -6.81623205057933e-07 | 1.52589052504482e-12 |
| 128 | 0.25 | 0.25 | -6.81623205081327e-07 | 1.55431223447522e-12 |
| 128 | 0.5 | 0.5 | -6.81623205030883e-07 | 1.60893520728678e-12 |
| 256 | 0.05 | 0.05 | -2.20865721037294e-10 | 4.91535701030443e-11 |
| 256 | 0.1 | 0.1 | -2.20865791396188e-10 | 4.90967266841835e-11 |
| 256 | 0.176804284695 | 0.176804284695 | -2.20865835651874e-10 | 4.89261964276011e-11 |
| 256 | 0.25 | 0.25 | -2.20865843237662e-10 | 4.89261964276011e-11 |
| 256 | 0.5 | 0.5 | -2.20865803735646e-10 | 4.87556661710187e-11 |

## Limiting Rows At Best Level

| Row | Kind | Slack | theta | receiver theta | source theta |
| --- | --- | --- | --- | --- | --- |
| `speed_plus_395` | sampled_field_speed_sign | -4.89261964276011e-11 | 0.3955 | null | null |
| `speed_minus_140` | sampled_field_speed_sign | -2.48512321832095e-11 | 0.1405 | null | null |
| `speed_plus_845` | sampled_field_speed_sign | -1.40820688443455e-11 | 0.8455 | null | null |
| `speed_plus_117` | sampled_field_speed_sign | -9.74509362094977e-12 | 0.1175 | null | null |
| `speed_minus_244` | sampled_field_speed_sign | -9.59055057592195e-12 | 0.2445 | null | null |
| `speed_plus_873` | sampled_field_speed_sign | -9.40314492936523e-12 | 0.8735 | null | null |
| `speed_plus_115` | sampled_field_speed_sign | -8.58335624798201e-12 | 0.1155 | null | null |
| `speed_plus_119` | sampled_field_speed_sign | -8.06110733719834e-12 | 0.1195 | null | null |

## Conclusion

The sampled period-coupled Hermite ansatz does not find a positive strict-gap margin at any tested level or period-bound sensitivity run.

Recommended next step: Treat period coupling plus separator speed locks as another exhausted same-itinerary structural ansatz; the next constructive route should rebuild the itinerary or use a non-additive structural law.

## Capture Decision

Priority-only. This screen tests a structural route distinct from mere Hermite
basis enrichment because the period tangent is part of the solve and the
separator field-speed contacts are locked through the same numerator used by
the retained speed-sign guards. Promotion should wait for either a positive
candidate that survives finite integration and proof-interval checks, or for a
decision to rebuild the itinerary.
