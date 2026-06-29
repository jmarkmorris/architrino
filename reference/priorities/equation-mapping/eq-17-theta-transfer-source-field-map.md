# EQ-17 Theta-Transfer Source-Field Map

- Parent packet: [EQ-07 Through EQ-10 And EQ-17 Through EQ-19 Effective Metric / Cosmology Packet](eq-07-10-17-19-effective-metric-cosmology-packet.md)
- Inventory row: [EQ-17: Redshift Factorization](equation.md#eq-17-redshift-factorization)
- Checker: [signed-frequency-transfer-ledger.mjs](../../../scripts/equation-mapping/signed-frequency-transfer-ledger.mjs)
- Default attempt: [signed-frequency-transfer-attempt.v1.json](../../../scripts/equation-mapping/signed-frequency-transfer-attempt.v1.json)
- Source-guard control: [signed-frequency-transfer-priority-source-negative-control.v1.json](../../../scripts/equation-mapping/signed-frequency-transfer-priority-source-negative-control.v1.json)
- Row served: `EQ-17`
- Claim level: priority-only source-field map and attack card
- Promotion status: priority-only

## Boundary

This packet narrows `EQ-17` to one signed source-path-receiver transfer carrier. It does not treat a redshift fit, a priority packet, an authored prose explanation, or a path-history analogy as accepted retained evidence. No score changes.

## Equation Attack Card

| Field | Value |
| --- | --- |
| Standard comparison target | $1+z_X\approx\Gamma_{N,E}\mathcal P_{E\to R}/(\Gamma_{N,R}B_XD_v)$ plus segment energy exchange. |
| Current score and closure driver | Score `4`; close gravitational, Doppler, source, and path-history redshift through one source-path-receiver record rather than a single fitted redshift factor. |
| Primary AAA carrier | `theta_transfer`: the signed frequency-transfer ledger that binds endpoint cadence, source branch, launch geometry, path-history propagation, photon-channel record, event ledger, energy-exchange segments, path-quality constraints, and no-hidden-retune witness. |
| Smallest score-moving evidence object | A durable source-backed `theta_transfer` parent row with accepted endpoint cadence, source-branch, launch-geometry, path-history, photon-channel, event-ledger, segment-energy, path-quality, and no-hidden-retune child rows on the same `event_id`, `source_branch_id`, `receiver_branch_id`, path window, and transfer id. |
| Exact first blocker | `missing_accepted_theta_transfer`, emitted by [signed-frequency-transfer-ledger.mjs](../../../scripts/equation-mapping/signed-frequency-transfer-ledger.mjs) on the default attempt. |
| Existing scripts/fixtures/packets found | [signed-frequency-transfer-ledger.mjs](../../../scripts/equation-mapping/signed-frequency-transfer-ledger.mjs), [signed-frequency-transfer-attempt.v1.json](../../../scripts/equation-mapping/signed-frequency-transfer-attempt.v1.json), [signed-frequency-transfer-priority-source-negative-control.v1.json](../../../scripts/equation-mapping/signed-frequency-transfer-priority-source-negative-control.v1.json), and the broad parent DGL in [EQ-07 Through EQ-10 And EQ-17 Through EQ-19 Effective Metric / Cosmology Packet](eq-07-10-17-19-effective-metric-cosmology-packet.md#direct-geometry-layer). |
| Candidate breakthrough angle | Use one clean spectral family first: endpoint gravitational redshift, Doppler launch, or deep-space path accumulation, then bind every factor and segment-energy exchange to the same absolute event/path record. |
| Fail-closed negative control | `signed_frequency_transfer_priority_source_negative_control`: accepted-looking rows sourced only to priority prose must remain blocked with `coordination_source_path` and `scoreDecision: no_score_increase`. |
| Smaller next action | Replace the priority-source control with a real durable `theta_transfer` source report, then populate child rows one at a time under `--require-populated` until the checker advances beyond `missing_accepted_theta_transfer`. |

## Direct Geometry Layer

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Fail-closed negative control | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| $1+z_X\approx\Gamma_{N,E}\mathcal P_{E\to R}/(\Gamma_{N,R}B_XD_v)$ | One signed source-path-receiver transfer budget with endpoint cadence, source branch, launch geometry, and path-history factors kept as separate readouts. | `theta_transfer`, `endpoint_cadence_emitter`, `endpoint_cadence_receiver`, `source_branch_factor`, `launch_geometry_factor`, `path_history_propagation`. | Same `event_id`, `source_branch_id`, `receiver_branch_id`, path window, and factor values across endpoint, source, launch, and path rows. | Priority-source false positive; redshift factor collapse into one fitted scalar. | Durable source-backed `theta_transfer` parent row with all factor rows accepted on the same transfer. |
| Segment energy exchange | $h(\nu^+-\nu^-)+\Delta E_{\mathrm{med}}+\Delta E_{\mathrm{recoil}}+\Delta E_{\mathrm{rem}}$ closes on each path-history segment. | `energy_exchange_segments`, `photon_channel_record`, `event_ledger`. | Same photon channel, event ledger, segment ids, and transfer id as the frequency row. | Tired-light path-history substitution; segment residual failure with hidden medium/recoil/remnant terms. | Accepted segment ledger bound to the parent `theta_transfer` record. |
| Path-history quality | Path-history propagation constrained by image sharpness, chromaticity, spectral coherence, and time-dilation consistency. | `path_history_propagation`, `path_quality_constraints`. | Same path window and transfer id as the endpoint and segment rows. | A private path-history propagation row that matches frequency while failing image or spectral controls. | Accepted path-quality row on the same transfer. |
| Shared keys and no-retune | No private retune of $\Gamma_{N,E}$, $\Gamma_{N,R}$, $B_X$, $D_v$, $Y_{X,E\to R}$, $\chi_\gamma$, $\chi_{\text{sea}}$, `event_id`, `source_branch_id`, or `receiver_branch_id`. | Required shared keys and `no_hidden_retune_witness`. | The same key values appear across endpoint, source, path, photon, and event projections. | Shared-key mismatch or hidden retune that preserves the redshift scalar while changing carrier identity. | Full same-record packet accepted from durable evidence. |

## Runnable Status

Default attempt:

```sh
node scripts/equation-mapping/signed-frequency-transfer-ledger.mjs \
  --input scripts/equation-mapping/signed-frequency-transfer-attempt.v1.json \
  --summary --pretty
```

Expected score-neutral result: `status: blocked_missing_rows`, `scoreDecision: no_score_increase`, and `nextBlocker: missing_accepted_theta_transfer`.

Priority-source guard:

```sh
node scripts/equation-mapping/signed-frequency-transfer-ledger.mjs \
  --input scripts/equation-mapping/signed-frequency-transfer-priority-source-negative-control.v1.json \
  --summary --pretty
```

Expected score-neutral result: `status: blocked_missing_rows`, `scoreDecision: no_score_increase`, `nextBlocker: missing_accepted_theta_transfer`, and `rows.theta_transfer.reason: coordination_source_path`.

## Next Action

Create a durable source-backed `theta_transfer` source report for one clean spectral family. The report must make endpoint cadence, source-branch factor, launch geometry, path-history propagation, photon-channel record, event ledger, energy-exchange segments, path-quality constraints, and no-hidden-retune witness concrete under one transfer id. Until those rows exist as accepted retained evidence, the correct disposition is no score movement.
