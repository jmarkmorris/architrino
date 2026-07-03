# Equation Closure Pass 2026-06-23 H

## Workstream Metadata

- Kind: `priority`
- Status: `complete`
- Mode: `team-agent continuation with executable reducer integration`
- Parent: [Equation Mapping Internal Priority](priorities.md)
- Score column updated: none
- Claim level: score-neutral constitutive surface-slice check

## Purpose

This pass turned the Noether sea density-compression surface-slice target into a fail-closed executable runner. The target is the first shared coefficient slice:

$$
\delta\mathbf y_{\mathrm{sea}}^X
=
\mathsf J_{\rho}^{X}
\left[
\Theta_{\mathrm{sea}}^{(\ell,W)}
\right]
\delta\ln n
+
\mathbf r_{\rho}^{X},
$$

where

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
\right)^T.
$$

This slice is a shared constitutive packet for `EQ-06`, `EQ-07` through `EQ-11`, `EQ-20`, `EQ-24`, and `EQ-32`. It is score-moving only after one retained $\Theta_{\mathrm{sea}}^{(\ell,W)}$ supplies a perturbation speed and at least one stress/strain or metric-compliance output without hidden retune.

The executable artifacts are [noether-sea-density-compression-surface-slice.mjs](../../../scripts/spacetime/noether-sea-density-compression-surface-slice.mjs), [noether-sea-density-compression-surface-slice-mock.json](../../../scripts/spacetime/noether-sea-density-compression-surface-slice-mock.json), and [noether-sea-density-compression-surface-slice-retained-attempt.v1.json](../../../scripts/spacetime/noether-sea-density-compression-surface-slice-retained-attempt.v1.json).

## Executable Result

Command:

```sh
node scripts/spacetime/noether-sea-density-compression-surface-slice.mjs --summary --pretty
```

Summary:

| Field | Result |
| --- | --- |
| Output schema | `aaa-noether-sea-density-compression-surface-slice-result/v1` |
| Status | `blocked_missing_rows` |
| Score decision | `no_score_increase` |
| Window | `theta-sea-density-compression-mock` |
| Channel | `X_density_compression_acoustic_mock` |
| Supported rows | `EQ-06`, `EQ-07`, `EQ-08`, `EQ-09`, `EQ-10`, `EQ-11`, `EQ-20`, `EQ-24`, `EQ-32` |
| Missing $\Theta_{\mathrm{sea}}$ rows | `rho_NS`, `n`, `u_sea`, `e_sea`, `theta_sea`, `f_N`, `event_ledger_ref` |
| Missing response rows | `channel_declaration_row`, `speed_row`, `causality_row`, `correlation_row`, `stress_strain_row_or_metric_embedding_row` |
| Same-record gate | `fail` |
| Speed plus stress/metric gate | `fail` |

The mock surface vector is deliberately partial:

| Surface component | Value |
| --- | --- |
| `delta_c_X_squared` | `0.0025` |
| `delta_C_ij_kl` | `null` |
| `delta_N` | `-0.0005` |
| `delta_gamma_ij` | `null` |
| `delta_G_eff` | `null` |
| `delta_P_eff` | `0.0012` |
| `delta_a_star` | `null` |

The fail-closed mode is also verified:

```sh
node scripts/spacetime/noether-sea-density-compression-surface-slice.mjs --require-populated --out /tmp/noether-sea-slice-required.json
```

exits nonzero while the retained rows remain missing.

The retained-attempt skeleton

```sh
node scripts/spacetime/noether-sea-density-compression-surface-slice.mjs --input scripts/spacetime/noether-sea-density-compression-surface-slice-retained-attempt.v1.json --summary --pretty
```

also reports `blocked_missing_rows`. It includes the intended row-reference fields and the minimal stress/strain-first surface vector, but its rows are marked `attempt`, not accepted retained rows. The attempt intentionally keeps only `delta_c_X_squared` and bulk `delta_C_ij_kl` non-null; `delta_N`, `delta_gamma_ij`, `delta_G_eff`, `delta_P_eff`, and `delta_a_star` are declared missing outputs.

The retained-attempt summary now also reports `thetaSeaRowStatuses`, `requiredRowStatuses`, and `stressOrMetricRowStatuses`. In the current retained-attempt packet all retained $\Theta_{\mathrm{sea}}$ rows and required response rows report `attempt`; `stress_strain_row` reports `attempt`, and `metric_embedding_row` reports `declared_missing_output`.

Minimal accepted target:

$$
\delta\mathbf y_{\rho}^{X,\min}
=
\left(
\delta c_X^2,\,
\delta C_{\mathrm{bulk}}^X,\,
\varnothing,\,
\varnothing,\,
\varnothing,\,
\varnothing,\,
\varnothing
\right)^T
=
\mathsf J_{\rho}^{X}
\left[
\Theta_{\mathrm{sea}}^{(\ell,W)}
\right]\delta\ln n
+
\mathbf r_{\rho}^{X}.
$$

This is the conservative route: speed plus one bulk stress/strain coefficient from the same retained window, not a metric, gravity, pressure, or low-acceleration claim.

## Interpretation

The runner makes the packet shape executable, but the default mock is not a retained coefficient extraction. It declares a few coefficients, multiplies them by `delta_ln_n=0.001`, and then blocks because the declared coefficients are not tied to accepted retained row references. The hardened runner requires retained row references, a speed coefficient plus stress/strain or metric-compliance coefficient content, delayed-support and correlation evidence, explicit missing outputs, and a zero-retune witness before returning `populated`.

That is the intended disposition. The surface slice is not another gate; it is the smallest common equation object that can later feed medium response, effective metric, weak gravity, pressure, and low-acceleration rows from one Noether sea constitutive state.

## Score Decision

No `6/23 b` score changes are justified.

- `EQ-24` remains `3`: the density-compression runner exists, but no retained acoustic, elastic, stress-strain, or metric-compliance coefficient is populated.
- `EQ-06` through `EQ-11` remain unchanged: the runner provides a shared packet shape, not a low-moment derivation or metric-response recovery.
- `EQ-20` and `EQ-32` remain `3`: $P_{\mathrm{eff}}$ and $a_\star$ must be outputs of the same retained row before pressure or low-acceleration scores move.
- No `Promoted?` cells should be marked `ready` or `complete` from this pass.

## Next Reducer Target

Populate one retained $\Theta_{\mathrm{sea}}^{(\ell,W)}$ with:

- `event_ledger_ref`;
- accepted $\rho_{\text{NS}}$, $n$, $\mathbf u_{\mathrm{sea}}$, $e_{\mathrm{sea}}$, $\theta_{\mathrm{sea}}$, $f_N$, and `event_ledger_ref` rows on the same retained window;
- `speed_row` and `stress_strain_row` for the speed plus bulk stress/strain path;
- `causality_row` with delayed support or $\mathcal R_{\mathrm{KK}}$ behavior;
- `correlation_row`;
- explicit missing-output rows for any uncomputed $N$, $\gamma_{ij}$, $G_{\mathrm{eff}}$, $P_{\mathrm{eff}}$, or $a_\star$ component;
- zero hidden-retune witness.

Once those rows exist, the runner can decide whether the same $\mathsf J_{\rho}^{X}$ supports an `EQ-24` score review and provides reusable evidence for adjacent Noether sea rows.

## Promotion Decision

Priority-only. This pass adds a useful success marker and guardrail under the existing Noether sea constitutive-response program, but it does not create a reader-facing result. Promotion remains blocked until a retained window supplies the coefficient row and residual behavior.
