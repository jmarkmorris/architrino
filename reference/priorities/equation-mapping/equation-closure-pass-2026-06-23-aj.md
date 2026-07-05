# Equation Closure Pass 2026-06-23 AJ

## Scope

- Target: score-neutral weak-field effective-metric residual for `EQ-07` through `EQ-10`.
- Primary runner: [effective-metric-weak-field-residual.mjs](../../../scripts/equation-mapping/effective-metric-weak-field-residual.mjs).
- Primary attempt input: [effective-metric-weak-field-attempt.v1.json](../../../scripts/equation-mapping/effective-metric-weak-field-attempt.v1.json).
- Related packet: [EQ-07 Through EQ-10 And EQ-17 Through EQ-19 Effective Metric / Cosmology Packet](eq-07-10-17-19-effective-metric-cosmology-packet.md).
- Claim level: score-neutral executable weak-field residual shape.
- Score disposition: no score changes.

## Closure Question

The missing route was not another cosmology handoff or Noether sea density-compression consumer. Those already have fail-closed runners. The under-instrumented part was the weak-field effective-metric record itself:

$$
\theta_W
\longmapsto
\left(
N,
u^i_{\mathrm{sea,eff}},
\gamma_{ij}^{\mathrm{eff}},
\chi_{\text{sea}},
\Gamma_N,
\Phi_{\mathrm{eff}},
\mathbf p_{\mathrm{PPN}},
\mathcal R_{\mathrm{null}},
\mathcal R_{\mathrm{geo}}
\right).
$$

The new runner asks whether one weak-field record can feed lapse, drift, spatial compliance, signal delay, cadence, weak-clock, redshift, Shapiro, lensing, acceleration, PPN, null/eikonal, and proper-time action rows without hidden retune.

## Executable Shape

Run:

```sh
node scripts/equation-mapping/effective-metric-weak-field-residual.mjs --summary --pretty
```

Current summary:

| Field | Value |
| --- | --- |
| Status | `blocked_missing_rows` |
| Score decision | `no_score_increase` |
| Next blocker | `missing_accepted_theta_W` |
| Common carrier pass | `true` |
| Shared keys accepted | `true` |
| Weak-field numeric pass | `true` |
| Static response pass | `true` |
| Shared delay pass | `true` |
| Weak clock pass | `true` |
| PPN pass | `true` |
| Observable pass | `true` |
| Source provenance pass | `true` |
| Hidden retune pass | `true` |
| Negative controls | `4/4` pass |

The populated mode fails as intended:

```sh
node scripts/equation-mapping/effective-metric-weak-field-residual.mjs --require-populated --summary --pretty
```

It exits nonzero until every required row is accepted and source-backed.

## Required Rows

The runner currently requires these rows on one carrier:

| Row | Supported equations |
| --- | --- |
| `theta_W` | `EQ-07`, `EQ-08`, `EQ-09`, `EQ-10` |
| `noether_sea_cell` | `EQ-06`, `EQ-07`, `EQ-08` |
| `constitutive_response` | `EQ-07`, `EQ-08`, `EQ-09`, `EQ-11` |
| `metric_projection` | `EQ-07`, `EQ-09`, `EQ-10` |
| `lapse_row` | `EQ-07`, `EQ-08` |
| `drift_row` | `EQ-07`, preferred-frame leakage |
| `spatial_compliance_row` | `EQ-07`, `EQ-09` |
| `signal_delay_row` | `EQ-07`, `EQ-09`, `EQ-17` |
| `cadence_row` | `EQ-08`, `EQ-17`, hydrogen handoff |
| `weak_clock_row` | `EQ-08` |
| `redshift_row` | `EQ-08`, `EQ-17` |
| `shapiro_row` | `EQ-09` |
| `lensing_row` | `EQ-09` |
| `acceleration_row` | `EQ-09`, `EQ-10` |
| `ppn_decision_row` | `EQ-09` |
| `null_eikonal_row` | `EQ-10`, `EQ-12` handoff |
| `geodesic_action_row` | `EQ-10` |
| `source_provenance` | `EQ-07` through `EQ-11` |
| `no_hidden_retune_witness` | all weak-field rows |

Every row in the attempt fixture is marked `attempt`, so the arithmetic passes are not score evidence.

## Residuals And Negative Controls

The attempt fixture verifies the arithmetic shape for:

- static response endpoint and inverse clock-rate rows;
- shared clock/signal delay, requiring $a_\chi=1+\gamma_{\mathrm{eff}}$;
- weak-clock target $d\tau/dt\approx1+\Phi_N/c_0^2-\lVert\mathbf w\rVert^2/(2c_0^2)$;
- Shapiro and lensing factors through the same $\gamma_{\mathrm{PPN}}$ row;
- Newtonian acceleration, null/eikonal, and geodesic-action residuals;
- PPN bound vector $\mathbf q_{\mathrm{PPN}}$;
- source-provenance and no-hidden-retune residuals.

The negative controls are:

| Control | Intended caught failure |
| --- | --- |
| `scalar_delay_half_lensing` | A scalar-delay-only map that misses the spatial-compliance half of light bending. |
| `clock_signal_split` | A clock/signal delay split hidden inside a compensated endpoint row. |
| `preferred_frame_leak` | A nonzero preferred-frame coefficient outside the bound vector. |
| `hidden_metric_retune` | A metric row that changes the weak-field record per observable. |

All four controls fail where expected.

## Score Disposition

No `6/23 b` score changes follow from this pass.

| Row | Current `6/23 b` score | AJ disposition |
| --- | --- | --- |
| `EQ-07` | `4` | Still below `5` because the shared lapse, drift, spatial-compliance, signal-delay, and metric-projection rows are not accepted retained rows. |
| `EQ-08` | `4` | Still below `5` because $\Gamma_N$, weak-clock, redshift, and cadence rows remain attempt-level. |
| `EQ-09` | `4` | Still below `5` because Shapiro, lensing, acceleration, PPN, and preferred-frame rows are only arithmetic diagnostics. |
| `EQ-10` | `3` | Still below `4` or `5` because null/eikonal and proper-time action rows have no accepted source-backed $\theta_W$ record. |

This runner is a useful success marker under the existing score-5 route. It turns the weak-field metric route into an executable fail-closed object and names the next evidence target: one source-backed $\theta_W$ whose rows bind the same carrier, shared keys, weak-field observables, PPN vector, source-provenance row, and zero-retune witness.

## Promotion Disposition

Priority-only. The new runner does not supply a reader-facing derivation. Promotion remains blocked until the weak-field residual is populated on one accepted retained Noether sea and metric record.

## Next Closure Target

Populate one accepted $\theta_W$ weak-field record. The minimum score-review-eligible packet must include source-backed rows for lapse, drift, spatial compliance, signal delay, cadence, weak-clock, redshift, Shapiro, lensing, acceleration, PPN/preferred-frame, null/eikonal, action-to-acceleration, source provenance, and a no-hidden-retune witness on the same carrier.
