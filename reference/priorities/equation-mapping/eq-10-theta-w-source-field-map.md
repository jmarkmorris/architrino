# EQ-10 Theta-W Source-Field Map

## Workstream Metadata

- Kind: `priority`
- Parent: [EQ-07 Through EQ-10 And EQ-17 Through EQ-19 Effective Metric / Cosmology Packet](eq-07-10-17-19-effective-metric-cosmology-packet.md)
- Source runner: [effective-metric-weak-field-residual.mjs](../../../scripts/equation-mapping/effective-metric-weak-field-residual.mjs)
- Source fixture: [effective-metric-weak-field-attempt.v1.json](../../../scripts/equation-mapping/effective-metric-weak-field-attempt.v1.json)
- Coordination-source control: [effective-metric-weak-field-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/effective-metric-weak-field-coordination-source-negative-control.v1.json)
- Row served: `EQ-10`, with upstream support from `EQ-07` through `EQ-09`
- Claim level: candidate source-field map and attack card
- Promotion status: priority-only

## Boundary

This map does not populate accepted retained evidence. It narrows `EQ-10` to the same source-backed `theta_W` weak-field record required by `EQ-07` through `EQ-09`, then names the local `EQ-10` consumers: `null_eikonal_row` and `geodesic_action_row`. Proper-time action and geodesic behavior remain observer-level variational projections; they are not substrate ontology.

No score changes.

## Equation Attack Card

| Coordinate | Current answer |
| --- | --- |
| Row | `EQ-10` |
| Current score and closure driver | Score `3`; proper-time/geodesic benchmarks are present, but action-to-acceleration and null/eikonal rows need one branch-derived weak-field record. |
| Primary AAA carrier | `theta_W`: one weak-field effective-metric record carrying lapse, drift, spatial compliance, signal delay, cadence, weak-clock, redshift, Shapiro, lensing, acceleration, PPN, null/eikonal, and geodesic-action rows. |
| Smallest score-moving evidence object | One accepted source-backed `theta_W` record with accepted row bindings for all required weak-field rows, common carrier id, shared keys, source provenance, and no-hidden-retune witness. |
| Exact first blocker | `missing_accepted_theta_W`. |
| Existing scripts/fixtures/packets found | The weak-field checker and attempt fixture listed above; [Equation Closure Pass 2026-06-23 AJ](equation-closure-pass-2026-06-23-aj.md); the parent effective-metric/cosmology packet. |
| Candidate breakthrough angle | Use `EQ-10` as the variational consistency consumer: once `EQ-07` through `EQ-09` supply a single metric projection, `EQ-10` should ask whether the same record also makes the null/eikonal and action-to-acceleration residuals vanish, rather than introducing a separate geodesic fit. |
| Fail-closed negative control | `scalar_delay_half_lensing`: a scalar-delay-only fixture can match Shapiro or acceleration while missing the spatial-compliance half of light bending, so it must fail before `EQ-10` geodesic action can be reviewed. |
| Smaller next action | Populate or reject one source-backed `theta_W` weak-field source report with the required rows below; then run the existing checker in normal and `--require-populated` modes. |

## Accepted-Object Contract

The smallest useful object is:

$$
\Theta_W^{(\ell,W)}
=
\left(
\theta_W,
\mathcal C_{\mathrm{sea}},
\Pi_{\mathrm{metric}},
N,
u^i_{\text{sea}},
\gamma_{ij},
\chi_{\text{sea}},
\Gamma_N,
\mathbf p_{\mathrm{PPN}},
\mathcal R_{\mathrm{null}},
\mathcal R_{\mathrm{geo}},
\mathcal S_{\mathrm{retune}}
\right).
$$

Required rows on one `commonCarrierId`:

| Checker row | Minimum source-field content |
| --- | --- |
| `theta_W` | Accepted weak-field carrier id, retained window, durable source path, and support for `EQ-07` through `EQ-10`. |
| `noether_sea_cell` | Same window and carrier, with $\rho_{\text{NS}}$, $\chi_{\text{sea}}$, drift, strain/stress, and cadence inputs declared. |
| `constitutive_response` | One response vector or tensor that feeds clock, signal, spatial compliance, and PPN rows without per-observable retuning. |
| `metric_projection` | $N$, $u^i_{\text{sea}}$, $e^a{}_i$, $\gamma_{ij}$, and $g_{\mu\nu}^{\mathrm{eff}}$ projected from the same carrier. |
| `lapse_row`, `drift_row`, `spatial_compliance_row`, `signal_delay_row` | The weak-field metric coefficients that jointly support redshift, Shapiro delay, lensing, acceleration, and null propagation. |
| `cadence_row`, `weak_clock_row`, `redshift_row` | Shared $\Gamma_N$ and endpoint-clock extraction, not a separate redshift-only carrier. |
| `shapiro_row`, `lensing_row`, `acceleration_row`, `ppn_decision_row` | Same $\gamma_{\mathrm{PPN}}$ and preferred-frame bound vector used across weak-field observables. |
| `null_eikonal_row` | `EQ-10` null/eikonal residual from the same metric projection, not from a photon-only route. |
| `geodesic_action_row` | `EQ-10` proper-time action-to-acceleration residual from the same clock, ruler, matter, and signal record. |
| `source_provenance`, `no_hidden_retune_witness` | Durable source provenance plus explicit proof that no row changes `theta_W`, $\chi_{\text{sea}}$, $\Gamma_N$, $\gamma_{\mathrm{PPN}}$, or metric coefficients per observable. |

## Direct Geometry Layer

| Standard comparison term | AAA geometric readout | Required carrier or row | Same-record binding | Fail-closed negative control | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| Weak-field carrier identity | `theta_W` retained weak-field record, not a geodesic-only or PPN-only fit | `theta_W` | Same `commonCarrierId`, retained window, source path, Noether sea cell, constitutive response, and metric projection across `EQ-07` through `EQ-10` | Coordination-source guard; `hidden_metric_retune` | Durable source-backed `theta_W` row with explicit support for `EQ-07` through `EQ-10` and accepted row bindings. |
| Noether sea constitutive response | Shared response vector/tensor producing lapse, drift, spatial compliance, signal delay, cadence, and PPN coefficients | `noether_sea_cell`, `constitutive_response`, `metric_projection` | Same Noether sea cell, response coefficients, metric projection, and carrier id as all weak-field observables | `hidden_metric_retune`; `clock_signal_split` | Accepted response/metric rows that feed clock, signal, spatial, acceleration, PPN, null/eikonal, and geodesic rows without per-observable changes. |
| Redshift, Shapiro, lensing, and acceleration benchmarks | Observer-level weak-field observable readouts from the same metric projection | `lapse_row`, `drift_row`, `spatial_compliance_row`, `signal_delay_row`, `redshift_row`, `shapiro_row`, `lensing_row`, `acceleration_row` | Same weak-clock row, endpoint cadence, spatial compliance, signal delay, and carrier id | `scalar_delay_half_lensing`; `clock_signal_split` | Accepted weak-field observable rows proving scalar delay does not replace spatial compliance. |
| PPN and preferred-frame comparison terms | PPN decision row as a bounded projection of the same weak-field response | `ppn_decision_row` | Same $\gamma_{\mathrm{PPN}}$, preferred-frame vector, response row, and metric projection as Shapiro/lensing/acceleration rows | `preferred_frame_leak`; `hidden_metric_retune` | Accepted PPN row whose coefficients are read from the same `theta_W` source report. |
| Null/eikonal comparison | `EQ-10` null/eikonal residual as photon-trajectory consumer of the same metric projection | `null_eikonal_row` | Same carrier, metric projection, signal-delay row, spatial-compliance row, and photon/effective-metric handoff as the weak-field rows | `scalar_delay_half_lensing`; photon-only route split | Accepted null/eikonal row showing null propagation consumes `theta_W` rather than a separate photon-only route. |
| Proper-time/geodesic action comparison | `EQ-10` geodesic-action residual from the same clock, ruler, matter, and signal record | `geodesic_action_row` | Same weak-clock, metric projection, acceleration row, matter/ruler support, source provenance, and no-hidden-retune witness | `scalar_delay_half_lensing`; `hidden_metric_retune` | Accepted geodesic-action row whose action-to-acceleration residual is bound to the accepted `theta_W` carrier. |
| Source provenance and no-hidden-retune witness | Retained-source witness proving no observable chooses a private metric coefficient or response row | `source_provenance`, `no_hidden_retune_witness`, shared-key rows | Same source report, carrier id, Noether sea cell, response coefficients, $\chi_{\text{sea}}$, $\Gamma_N$, $\gamma_{\mathrm{PPN}}$, and metric coefficients across all rows | Coordination-source guard; `hidden_metric_retune` | Populated weak-field packet with all required rows accepted from durable retained evidence. |

## Fail-Closed Controls

Keep the existing four controls as first-line guards:

- `scalar_delay_half_lensing`: catches a scalar-delay-only map that misses spatial compliance.
- `clock_signal_split`: catches hidden clock/signal delay splitting.
- `preferred_frame_leak`: catches out-of-bound preferred-frame coefficients.
- `hidden_metric_retune`: catches per-observable metric retuning.

For `EQ-10`, the decisive negative control is `scalar_delay_half_lensing`: if spatial compliance is missing, a proper-time or geodesic fit is not an accepted source-field object even when acceleration-like numerics look right.

The coordination-source control flips the weak-field rows to accepted-looking statuses while leaving their source paths on priority packets, authored AAA prose, attempt fixtures, or mocks. The checker must keep `nextBlocker=missing_accepted_theta_W` and report `accepted_without_evidence_source` for those rows. This prevents priority prose or existing attempt files from satisfying the retained-evidence contract.

## Next Action

Create one durable source-backed `theta_W` report and run:

```sh
node scripts/equation-mapping/effective-metric-weak-field-residual.mjs --summary --pretty
node scripts/equation-mapping/effective-metric-weak-field-residual.mjs --require-populated --summary --pretty
node scripts/equation-mapping/effective-metric-weak-field-residual.mjs --input scripts/equation-mapping/effective-metric-weak-field-coordination-source-negative-control.v1.json --summary --pretty
```

Until that row exists, the correct result remains `missing_accepted_theta_W`.
