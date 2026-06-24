# Equation Closure Pass 2026-06-23 AH

## Scope

- Target: Noether sea density-compression surface-slice consumer-readiness reporting.
- Primary runner: [noether-sea-density-compression-surface-slice.mjs](../../../scripts/spacetime/noether-sea-density-compression-surface-slice.mjs).
- Retained-attempt input: [noether-sea-density-compression-surface-slice-retained-attempt.v1.json](../../../scripts/spacetime/noether-sea-density-compression-surface-slice-retained-attempt.v1.json).
- Claim level: score-neutral executable reporting refinement.
- Score disposition: no score changes.

This pass does not add a new checker. It extends the existing density-compression surface-slice runner so the same $\Theta_{\mathrm{sea}}^{(\ell,W)}$ report names which downstream equation rows can consume the current projection outputs, and which row or output blocks them first.

## Consumer-Readiness Object

For the density-compression surface vector

$$
\delta\mathbf y_{\mathrm{sea}}^X
=
\left(
\delta c_X^2,\,
\delta C_{ij}{}^{kl},\,
\delta N,\,
\delta\gamma_{ij},\,
\delta G_{\mathrm{eff}},\,
\delta P_{\mathrm{eff}},\,
\delta a_\star
\right)^T,
$$

each downstream row $i$ declares a required output set $O_i$. The runner now reports

$$
\mathcal R_i^{\mathrm{consume}}
=
\left(
\mathrm{status}(\Theta_{\mathrm{sea}}^{(\ell,W)}),\,
B_{\mathrm{slice}},\,
O_i,\,
B_i^{\mathrm{proj}}
\right),
$$

where $B_{\mathrm{slice}}$ is the first retained-slice blocker and $B_i^{\mathrm{proj}}$ is the first missing output required by row $i$. A row is `ready_for_consumer_review` only when the slice status is `populated` and every output in $O_i$ is projected. Otherwise the row remains `blocked`.

This object is a routing report, not a score gate. It prevents a partial projection from being mistaken for accepted Noether sea constitutive closure.

## Consumer Sets

| Consumer | Required outputs | Current retained-attempt projection status |
| --- | --- | --- |
| `EQ-24` density-compression coefficient bundle | `delta_c_X_squared`, `delta_C_ij_kl` | `projected`, but blocked by `sliceBlocker=missing_accepted_theta_sea_rho_NS`. |
| `EQ-11` weak-gravity metric/coupling projection | `delta_N`, `delta_gamma_ij`, `delta_G_eff` | `blocked_declared_missing_output`, first `projectionBlocker=delta_N`. |
| `EQ-20` pressure/effective-$\Lambda$ projection | `delta_P_eff` | `blocked_declared_missing_output`, first `projectionBlocker=delta_P_eff`. |
| `EQ-32` low-acceleration response projection | `delta_a_star` | `blocked_declared_missing_output`, first `projectionBlocker=delta_a_star`. |

The retained-attempt skeleton therefore sharpens the near frontier: `EQ-24` has the first consumer output shape, but it is still not score evidence because the retained Noether sea rows are only `attempt` rows and the first blocker remains `missing_accepted_theta_sea_rho_NS`. `EQ-11`, `EQ-20`, and `EQ-32` are deliberately explicit downstream consumers, not private coefficient fits.

## Runner Shape

The compact summary now exposes one `consumerReadiness` object. Each consumer report contains:

| Field | Meaning |
| --- | --- |
| `row` | Target equation row. |
| `purpose` | Human-readable reason the row consumes the surface slice. |
| `readiness` | `ready_for_consumer_review` only for a populated slice with all required outputs projected; otherwise `blocked`. |
| `sliceBlocker` | First retained-slice blocker, for example `missing_accepted_theta_sea_rho_NS`. |
| `projectionBlocker` | First required output missing for that consumer, or `null` when all required outputs are projected. |
| `projectionStatus` | Stable status: `projected`, `blocked_declared_missing_output`, or `blocked_undeclared_missing_output`. |
| `requiredOutputs` | Output keys the consumer needs from $\delta\mathbf y_{\mathrm{sea}}^X$. |
| `outputStatuses` | Per-output status: `projected`, `declared_missing_output`, or `undeclared_missing_output`. |

Nested non-null output objects count as projected only when at least one nested value is a finite number. This keeps placeholder objects from satisfying a downstream projection.

## Current Runs

Command used for the mock:

```sh
node scripts/spacetime/noether-sea-density-compression-surface-slice.mjs --summary --pretty --out /tmp/noether-sea-mock-ah.json
```

Mock result:

| Field | Result |
| --- | --- |
| Status | `blocked_missing_rows` |
| Score decision | `no_score_increase` |
| Next blocker | `missing_accepted_theta_sea_rho_NS` |
| Projected outputs | `delta_c_X_squared`, `delta_N`, `delta_P_eff` |
| Declared missing outputs | `delta_C_ij_kl`, `delta_gamma_ij`, `delta_G_eff`, `delta_a_star` |

Command used for the retained attempt:

```sh
node scripts/spacetime/noether-sea-density-compression-surface-slice.mjs --input scripts/spacetime/noether-sea-density-compression-surface-slice-retained-attempt.v1.json --summary --pretty --out /tmp/noether-sea-retained-ah.json
```

Retained-attempt result:

| Field | Result |
| --- | --- |
| Status | `blocked_missing_rows` |
| Score decision | `no_score_increase` |
| Next blocker | `missing_accepted_theta_sea_rho_NS` |
| `EQ-24` consumer | `projectionStatus=projected`, `readiness=blocked` |
| `EQ-11` consumer | `projectionStatus=blocked_declared_missing_output`, `projectionBlocker=delta_N` |
| `EQ-20` consumer | `projectionStatus=blocked_declared_missing_output`, `projectionBlocker=delta_P_eff` |
| `EQ-32` consumer | `projectionStatus=blocked_declared_missing_output`, `projectionBlocker=delta_a_star` |
| Acoustic/elastic arithmetic | `numericAgreementStatus=passed` |
| Accepted acoustic/elastic status | `acousticElasticAgreementStatus=attempt_numeric_passed` |

The retained-attempt run also keeps `--require-populated` fail-closed: the command exits nonzero until accepted retained rows populate the slice.

## Score Disposition

No `6/23 b` score changes follow from this pass.

| Row | Current `6/23 b` score | AH disposition |
| --- | --- | --- |
| `EQ-11` | `3` | Still blocked until weak-gravity projection outputs are derived from a populated Noether sea constitutive state. |
| `EQ-20` | `3` | Still blocked until the pressure/effective-$\Lambda$ output is derived from the populated state and the inherited FRW handoff is accepted. |
| `EQ-24` | `3` | Nearest score-moving route, but still blocked by `missing_accepted_theta_sea_rho_NS` and attempt-level acoustic/elastic agreement. |
| `EQ-32` | `3` | Still blocked until $a_\star$ is derived from the same Noether sea state while preserving the shared observation record. |

`EQ-06` remains the retained Noether sea population and moment-closure producer row for this lane, not a downstream consumer readiness row in the AH output.

## Promotion Disposition

Priority-only. This pass improves solver reporting and preserves the mathematical target

$$
\mathsf J_{\rho}^{X}
\left[
\Theta_{\mathrm{sea}}^{(\ell,W)}
\right]
\delta\ln n,
$$

but it does not populate the shared Noether sea constitutive state. Corpus promotion remains blocked until one accepted retained coefficient extraction has durable source-backed row references, same-window acoustic/elastic agreement, delayed-support or response-kernel evidence, explicit missing outputs, and a zero hidden-retune witness.
