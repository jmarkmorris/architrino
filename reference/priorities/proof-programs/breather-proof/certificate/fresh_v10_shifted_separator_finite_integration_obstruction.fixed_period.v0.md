# Fresh v10 Shifted-Separator Finite-Integration Obstruction

## Scope

This packet is a priority-only audit of the direct finite integration of the
shifted-separator fixed-period strict-gap witness for
`fresh-same-packet-fold-shear-seed-v0`.

It does not claim a repaired candidate, a proof-interval pre-ledger pass, an
outward-rounded interval root count, a live ledger update, or branch-chart
authorization.

Artifacts:

- `gap_opening_fresh_v10_strict_gap_input.shifted_separator_fixed_period.v0.json`
- `gap_opening_fresh_v10_strict_gap_result.shifted_separator_fixed_period.v0.json`
- `fresh_v10_shifted_separator_finite_integration_obstruction.fixed_period.v0.json`
- `../../../../../scripts/proof-programs/fresh-v10-shifted-separator-strict-gap-matrix-builder.mjs`
- `../../../../../scripts/proof-programs/fresh-v10-shifted-separator-finite-integration-audit.mjs`

## Executed Commands

```bash
node scripts/proof-programs/fresh-v10-shifted-separator-strict-gap-matrix-builder.mjs --pretty
node scripts/proof-programs/null-coordinate-gap-opening-scanner.mjs --input reference/priorities/proof-programs/breather-proof/certificate/gap_opening_fresh_v10_strict_gap_input.shifted_separator_fixed_period.v0.json --out reference/priorities/proof-programs/breather-proof/certificate/gap_opening_fresh_v10_strict_gap_result.shifted_separator_fixed_period.v0.json --pretty
node scripts/proof-programs/fresh-v10-shifted-separator-finite-integration-audit.mjs --pretty
```

## Tangent Result

The shifted basis uses the current fresh separator phases as the arc endpoints,
so the $C^1$ bumps have zero $\theta$-derivative at those phases. At fixed
period this preserves the separator velocities to first order.

The scanner accepts the declared candidate witness:

```json
{
  "h_A0s": -1,
  "h_A1s": -1,
  "h_A2s": -1
}
```

For the declared finite matrix, the minimum post-margin tangent surplus is
positive. This is a useful tangent-space result, but it is not a finite
candidate.

## Strict-Gap Threshold

For each v10 collar, the direct finite path has the form
$$
g_m(\lambda)=-\kappa_m+\lambda a_m.
$$
The threshold at which all listed collars first become nonnegative is
$$
\lambda_{\min}=0.264833953926991.
$$
Strict opening requires any value $\lambda > \lambda_{\min}$.

| Controlling collar | Required margin | Witness derivative | lambda_min |
| --- | --- | --- | --- |
| `C_u_A4_A2_left_v10_7` | 0.25055598013026 | 0.94608707235226 | 0.264833953926991 |

## Field-Speed Itinerary Audit

The direct finite path is
$$
X_\lambda(\theta)
=
X_{\mathrm{fresh}}(\theta)
+\lambda H_{\mathrm{shifted}}(\theta),
\qquad
T_\lambda=T_0.
$$
The root scan counts solutions of
$$
\dot X_\lambda(\theta)=1
\quad\text{or}\quad
\dot X_\lambda(\theta)=-1
$$
with 50000 phase subintervals and bisection refinement.

| lambda | field-speed roots | max abs(xdot) sampled |
| --- | --- | --- |
| 0 | 4 | 1.29545029980074 |
| 0.01 | 4 | 1.31600063667639 |
| 0.02 | 4 | 1.33759275531511 |
| 0.03 | 8 | 1.35985638808351 |
| 0.04 | 8 | 1.38257734390509 |
| 0.05 | 8 | 1.40562354302886 |
| 0.1 | 8 | 1.52351272676189 |
| 0.2 | 12 | 1.76420443960142 |
| 0.264833953926991 | 12 | 1.92139610770217 |
| 0.3 | 12 | 2.00682070185171 |
| 0.4 | 16 | 2.25009042470909 |
| 1 | 24 | 4.25078726697125 |

At the strict-gap threshold, the direct path has
`12` field-speed roots.

## Obstruction

The shifted-separator basis is better than the original free-period local-shear
direction as a tangent-space object: it opens all 10 v10 collars at fixed period
and preserves the separator velocities to first order. Direct finite integration
still does not stay inside the current itinerary. The finite amplitude required
to open all collars creates additional field-speed roots before the strict-gap
threshold is reached.

Therefore the shifted witness should not be promoted directly to a repaired
candidate. Its value is to define the next constrained solver basis: keep the
shifted-separator degrees of freedom, but solve the finite strict-gap problem
with explicit field-speed-itinerary inequalities rather than following the
linear tangent ray.

## Capture Decision

Priority-only. This is a solver-direction artifact and a direct-path
obstruction, not reader-facing theorem prose. Promotion should wait until a
finite nonlinear candidate preserves the itinerary and reruns the proof-interval
pre-ledger with strict margins.
