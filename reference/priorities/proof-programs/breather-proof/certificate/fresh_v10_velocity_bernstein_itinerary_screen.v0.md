# Fresh v10 Velocity-Bernstein Itinerary Screen

## Scope

This packet is a priority-only finite sampled LP screen for a velocity-first
same-itinerary structural ansatz. It parameterizes
$U(\theta)=X'(\theta)/T_0$ on the three first-half arcs cut by the shifted
separator phases, then recovers $X$ by quadrature and half-period
anti-periodicity. Field-speed itinerary preservation is built into the
Bernstein control corridor:

- subfield arcs: $-1+\eta\le U\le 1-\eta$,
- superfield arc: $U\le -1-\eta$,
- separator controls: $U=-1$.

It does not claim an interval certificate, a repaired candidate, a proof-interval
preledger pass, a live ledger update, branch-chart authorization, or a theorem
in AAA prose.

Artifacts:

- `fresh_v10_velocity_bernstein_itinerary_screen.v0.json`
- `fresh_v10_velocity_bernstein_itinerary_screen.v0.md`
- `../../../../../scripts/proof-programs/fresh-v10-velocity-bernstein-itinerary-screen.py`

## Executed Command

```bash
VIRTUAL_ENV="${AAA_VENV:-../.venv}" "${AAA_VENV:-../.venv}/bin/python" scripts/proof-programs/fresh-v10-velocity-bernstein-itinerary-screen.py --pretty
```

## Structural Screen

For each tested degree, the LP variables are Bernstein control values for
$U$ on the three first-half arcs and a sampled strict-gap margin $\gamma$.
The period is fixed at $T_0=6.28318530718$.
The screen imposes the selected oriented null-coordinate gaps after reconstructing
$$
X(\theta)=T_0\left(\int_0^\theta U(s)\,ds
-\frac12\int_0^0.5U(s)\,ds\right)
$$
on the first half and extending by $X(\theta+1/2)=-X(\theta)$.

| Degree | Controls | Variables | gamma sample | max violation | Status |
| --- | --- | --- | --- | --- | --- |
| 3 | 12 | 13 | -0.32120844387235 | 0 | no_positive_sampled_margin_found |
| 5 | 18 | 19 | -0.219662345874622 | 0 | no_positive_sampled_margin_found |
| 7 | 24 | 25 | -0.174207762893804 | 0 | no_positive_sampled_margin_found |
| 9 | 30 | 31 | -0.141779488453668 | 0 | no_positive_sampled_margin_found |
| 11 | 36 | 37 | -0.117326792419193 | 0 | no_positive_sampled_margin_found |
| 15 | 48 | 49 | -0.0824891303489776 | 7.39528438487014e-11 | no_positive_sampled_margin_found |
| 21 | 66 | 67 | -0.0471216791393921 | 1.21029580801846e-09 | no_positive_sampled_margin_found |
| 31 | 96 | 97 | -0.0126050167182319 | 6.50291598347508e-10 | no_positive_sampled_margin_found |

Best sampled margin:
$$
\gamma_{\mathrm{sample}}=-0.0126050167182319.
$$

The best tested degree is `31` with `96`
velocity controls and `97` LP variables.

## Speed-Margin Sensitivity

| Degree | speed margin | gamma sample | max violation |
| --- | --- | --- | --- |
| 11 | 0.005 | -0.114286184348976 | 0 |
| 11 | 0.01 | -0.115801753697235 | 0 |
| 11 | 0.015 | -0.117326792419193 | 0 |
| 11 | 0.025 | -0.120384898969348 | 0 |
| 21 | 0.005 | -0.043658455500804 | 1.21553883625225e-09 |
| 21 | 0.01 | -0.0453878954230901 | 1.21291721111305e-09 |
| 21 | 0.015 | -0.0471216791393921 | 1.21029580801846e-09 |
| 21 | 0.025 | -0.0505892465719964 | 1.20505272427351e-09 |
| 31 | 0.005 | -0.0081251215494525 | 6.56894094674954e-10 |
| 31 | 0.01 | -0.0103650691338425 | 6.53592735488928e-10 |
| 31 | 0.015 | -0.0126050167182319 | 6.50291598347508e-10 |
| 31 | 0.025 | -0.0170849118870115 | 6.43690212243087e-10 |

## Limiting Rows At Best Degree

| Row | Kind | Slack | receiver theta | source theta | arc | control |
| --- | --- | --- | --- | --- | --- | --- |
| `C_u_A4_A2_left_v10_7` | sampled_gap | -6.50291598347508e-10 | 0.84491638235 | 0.61508361765 |  |  |
| `C_w_A2_A1_left_v10_4` | sampled_gap | -2.82451895206037e-10 | 0.39557273896875 | 0.31991638235 |  |  |
| `C_w_A2_A0_left_v10_2` | sampled_gap | -1.49193546405968e-10 | 0.3786872867625 | 0 |  |  |
| `U_I0_subfield_0_lower` | velocity_corridor | 0 | null | null | I0_subfield | 0 |
| `U_I0_subfield_1_lower` | velocity_corridor | 0 | null | null | I0_subfield | 1 |
| `U_I0_subfield_2_lower` | velocity_corridor | 0 | null | null | I0_subfield | 2 |
| `U_I0_subfield_3_lower` | velocity_corridor | 0 | null | null | I0_subfield | 3 |
| `U_I0_subfield_4_lower` | velocity_corridor | 0 | null | null | I0_subfield | 4 |

## Conclusion

The velocity-first Bernstein sign-corridor ansatz does not find a positive sampled strict-gap margin at any tested degree or speed-margin sensitivity run.

Recommended next step: This closes the tested bounded fixed-separator velocity-corridor route as a constructive same-itinerary screen; the remaining same-itinerary options require nonlinear fold-coordinate collocation or an itinerary rebuild.

## Capture Decision

Priority-only. This screen is structurally different from additive Hermite
enrichment because it treats the velocity sign itinerary as a convex-hull
control law and derives the position function by quadrature. Promotion should
wait for either a positive candidate that survives interval collar checks and
the proof-interval preledger, or for an explicit itinerary rebuild.
