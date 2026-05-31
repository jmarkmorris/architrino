# Fresh v10 Finite-Itinerary Strict-Gap Screen

## Scope

This packet is a priority-only finite sampled LP screen for the shifted-separator
strict-gap basis. It asks whether the declared shifted coefficients can open the
sampled v10 parent-complement collars while preserving the sampled field-speed
sign itinerary away from separator/contact neighborhoods.

It does not claim an interval certificate, a repaired candidate, a proof-interval
pre-ledger pass, a live ledger update, or branch-chart authorization.

Artifacts:

- `fresh_v10_finite_itinerary_strict_gap_screen.shifted_separator.v0.json`
- `fresh_v10_finite_itinerary_strict_gap_screen.shifted_separator.v0.md`
- `../../../../../scripts/proof-programs/fresh-v10-finite-itinerary-strict-gap-screen.py`

## Executed Command

```bash
/Users/markmorris/vibe/.venv/bin/python scripts/proof-programs/fresh-v10-finite-itinerary-strict-gap-screen.py --pretty
```

## Finite Screen

The LP variables are the shifted-separator coefficients and a sampled strict-gap
margin $\gamma$. Each coefficient is bounded by
$|h_j|\le 1.0$.

For every sampled receiver/source pair in each v10 collar, the screen imposes
$$
z_{\ell,h}(\theta_r)-z_{\ell,h}(\theta_s)\ge \gamma
$$
or the reversed sampled orientation chosen by the v10 strict-gap target. For
retained field-speed samples it also imposes
$$
\operatorname{sign}(\dot X_{\mathrm{fresh}}(\theta)-v)
\bigl(\dot X_h(\theta)-v\bigr)\ge 0,
\qquad v\in\{-1,+1\}.
$$
Samples within the speed guard are treated as separator/contact neighborhoods
and are not counted as sign-preservation guards.

| Constraint class | Count |
| --- | --- |
| total | 2762 |
| bound | 12 |
| sampled\_gap | 810 |
| sampled\_field\_speed\_sign | 1940 |
| excluded\_field\_speed\_near\_contact | 60 |

## Solver Result

Status: `sampled_itinerary_constraints_block_positive_strict_gap_margin`

Sampled strict-gap margin:
$$
\gamma_{\mathrm{sample}}=-0.207816886605516.
$$

| Coefficient | Value |
| --- | --- |
| `h_A0s1` | -0.10319061657963 |
| `h_A0s2` | -0.0212166572301295 |
| `h_A1s1` | 0.0243516956581845 |
| `h_A1s2` | 0.0340508048509331 |
| `h_A2s1` | 0.00692278685287924 |
| `h_A2s2` | 0.167775465015321 |

## Limiting Sampled Gap Rows

| Collar | Slack | receiver theta | source theta |
| --- | --- | --- | --- |
| `C_u_A4_A2_left_v10_7` | 0 | 0.866725016082031 | 0.61508361765 |
| `C_u_A4_A2_left_v10_7` | 6.79724748958721e-06 | 0.870359788370703 | 0.61508361765 |
| `C_u_A4_A2_left_v10_7` | 0.000189482535867563 | 0.863090243793359 | 0.61508361765 |
| `C_u_A4_A2_left_v10_7` | 0.000305747244583987 | 0.873994560659375 | 0.61508361765 |
| `C_u_A4_A2_left_v10_7` | 0.000496970996833712 | 0.859455471504687 | 0.61508361765 |
| `C_u_A4_A2_left_v10_7` | 0.000861183719186698 | 0.855820699216016 | 0.61508361765 |
| `C_u_A4_A2_left_v10_7` | 0.0012361846331844 | 0.852185926927344 | 0.61508361765 |
| `C_u_A4_A2_left_v10_7` | 0.00158894869946813 | 0.848551154638672 | 0.61508361765 |

## Limiting Field-Speed Sign Rows

| Row | Target | theta | Slack |
| --- | --- | --- | --- |
| `speed_plus_979` | 1.0 | 0.9795 | 0 |
| `speed_minus_16` | -1.0 | 0.0165 | 0 |
| `speed_minus_84` | -1.0 | 0.0845 | 0 |
| `speed_minus_130` | -1.0 | 0.1305 | 0 |
| `speed_minus_260` | -1.0 | 0.2605 | 0 |
| `speed_minus_368` | -1.0 | 0.3685 | 0 |
| `speed_minus_479` | -1.0 | 0.4795 | 0 |
| `speed_plus_760` | 1.0 | 0.7605 | 0 |

## Separator Derivative Audit

The shifted bumps have zero derivative at the declared separator phases, so the
declared separator contacts remain fixed to first order in this basis.

| Separator | theta | fresh xdot | max abs basis xdot derivative |
| --- | --- | --- | --- |
| `sigma_1` | 0.12758361765 | -0.999999999997892 | 0 |
| `sigma_2` | 0.33241638235 | -0.999999999997893 | 0 |
| `sigma_3` | 0.62758361765 | 0.999999999997892 | 0 |
| `sigma_4` | 0.83241638235 | 0.999999999997892 | 2.48385920947331e-14 |

## Conclusion

Under this bounded shifted-separator basis and retained field-speed sign samples, the sampled LP optimum has nonpositive strict-gap margin; the declared bounded basis is not enough for a finite itinerary-preserving strict-gap repair.

Recommended next step: Move from this declared shifted basis to a richer finite constrained basis or an explicit higher-fold itinerary decision; do not keep following single tangent rays in this basis.

## Capture Decision

Priority-only. This screen sharpens the solver route but is not corpus-ready
theorem prose. Promotion should wait for an interval-certified repaired
candidate or for an explicit decision to replace the current itinerary.
