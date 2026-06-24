# Equation Closure Pass 2026-06-23 AF

## Scope

- `EQ-18` effective-FRW handoff from one retained cosmology record.
- `EQ-19` Friedmann and cosmological continuity residuals on that same record.
- The upstream handoff row consumed later by the shared-observation residual family.

## Result

This pass adds [effective-frw-handoff-residual.mjs](../../../scripts/equation-mapping/effective-frw-handoff-residual.mjs) and the attempt fixture [effective-frw-handoff-attempt.v1.json](../../../scripts/equation-mapping/effective-frw-handoff-attempt.v1.json). The checker is deliberately score-neutral. It locates the missing retained rows for the effective-FRW and Friedmann handoff; it does not fit cosmology, promote void expansion, or raise any equation score.

| Row family | Executable check | Attempt result | Score effect |
| --- | --- | --- | --- |
| `EQ-18` and `EQ-19` | Common `theta_cos` carrier, effective-FRW projection, $H_{\mathrm{eff}}$ finite-difference check, Friedmann residual $R_H$, continuity residual $R_\rho$, source-provenance residual, fixed-void witness, shared-key compatibility, and no-hidden-retune witness. | `blocked_missing_rows`, `scoreDecision: no_score_increase`, `nextBlocker: missing_accepted_theta_cos`. | No score change; `EQ-18` remains `3` and `EQ-19` remains `3`. |

## Effective-FRW Handoff Object

The score-moving object is a retained cosmology record

$$
\theta_{\mathrm{cos}}
=
\left(
\mathcal C_{07\text{-}10,17\text{-}19}^{(W,X)},
\Pi_{\mathrm{metric}},
\Pi_{\mathrm{red}},
\Pi_{\mathrm{FRW}}
\right),
$$

with one accepted source-backed row set for metric, redshift, effective-FRW, Friedmann, and readout projections. The checker names the row set explicitly:

```text
theta_cos
cosmology_carrier
noether_sea_window
assembly_provenance_record
metric_projection
redshift_transfer_handoff
pi_frw
theta_read
scale_factor_row
hubble_row
effective_density_row
effective_pressure_row
effective_coupling_row
effective_lambda_row
curvature_row
source_term_row
friedmann_residual
continuity_residual
source_provenance
no_hidden_retune_witness
```

An accepted run must bind those rows to the same `theta_cos` carrier and durable source path before any score movement is eligible.

## Residual Vector

The executable residual decomposes the handoff into scalar diagnostics:

$$
\mathcal R_{\mathrm{FRW,hand}}
=
\left(
\Delta_H,
R_H,
R_\rho,
R_{\mathrm{src}},
R_{\mathrm{void}},
R_{\mathrm{keys}},
R_{\mathrm{retune}}
\right).
$$

The toy values are internally coherent: $H_{\mathrm{eff}}$ is computed from $a_{\mathrm{eff}}$, the Friedmann target matches $H_{\mathrm{eff}}^2$ within tolerance, the continuity residual is zero on the same $\rho_{\mathrm{eff}}$ row, source provenance has declared transport and Noether sea exchange rows, and the fixed-void witness reports no Euclidean-void scale drift. Those numeric passes are not score evidence because every source-bearing row is still `attempt`.

## Downstream Interface

This artifact is the upstream `frw_handoff` producer for the shared-observation packet. It supplies the row shape that [shared-observation-residual.mjs](../../../scripts/equation-mapping/shared-observation-residual.mjs) should consume once an accepted $\Theta_{\mathrm{obs}}$ record exists. The downstream `EQ-21`, `EQ-22`, `EQ-23`, and `EQ-32` scores are unchanged.

`EQ-20` is also unchanged. The fixture carries $P_{\mathrm{eff}}$ only as a Friedmann/continuity variable; it does not derive the pressure law or $\Lambda_{\mathrm{eff}}$ from Noether sea tension, pressure, or relaxation.

## Score Disposition

No score changes.

- `EQ-18` remains `3`: the effective-FRW handoff is executable, but no accepted retained $\theta_{\mathrm{cos}}$ row or source-backed $\Pi_{\mathrm{FRW}}$ projection is populated.
- `EQ-19` remains `3`: $R_H$ and $R_\rho$ are executable on a coherent attempt fixture, but Friedmann and continuity rows still lack accepted retained provenance.
- `EQ-20`, `EQ-21`, `EQ-22`, `EQ-23`, and `EQ-32` remain unchanged.

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

Defer with blocker: promote only after one retained cosmology carrier supplies accepted, source-backed metric, redshift, effective-FRW, Friedmann, source-provenance, and no-hidden-retune rows, with the handoff residual below tolerance on the same carrier.
