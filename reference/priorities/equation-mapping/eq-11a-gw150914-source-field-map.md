# EQ-11A GW150914 Source-Field Map

## Status

- Kind: `priority`
- Scope: source-field map for `missing_accepted_gw_source_carrier`
- Rows served: `EQ-11A`, with source-ledger grammar reusable by `EQ-29` only at the provenance/event-ledger level
- Claim level: candidate source map; not accepted retained evidence
- Score disposition: no score changes

This map narrows the first accepted-evidence candidate for [EQ-11A Gravitational-Wave Source Recovery](eq-11a-gravitational-wave-source-recovery.md). It uses `GW150914-v3` as a concrete source-window candidate because the public GWOSC event page names the event UID, release, GPS/UTC time, posterior-sample release, strain files, masses, final state, radiated energy, peak luminosity, distance, and source redshift. Those fields are source candidates only; this file does not mark any `EQ-11A` row accepted.

## Source Window Candidate

| Field | Candidate value or source | Status |
| --- | --- | --- |
| `sourceWindowId` | `GW150914-v3` from [GWOSC GW150914 detail page](https://gwosc.org/eventapi/html/GWTC-1-confident/GW150914/v3/) | candidate |
| Release | `GWTC-1-confident` | candidate |
| Event time | GPS `1126259462.4`, UTC `2015-09-14 09:50:44` | candidate |
| Detector path-history window `P` | H1/L1 strain products from the same GWOSC event page | candidate |
| Parameter-estimation source | GWTC-1 PE posterior-sample release and data URL from the event page | candidate |
| Discovery/source papers | [GW150914 discovery paper](https://arxiv.org/abs/1602.03837), [properties paper](https://arxiv.org/abs/1602.03840), and [minimal-assumptions transient paper](https://arxiv.org/abs/1602.03843) | candidate |

The candidate source is suitable for a source-field map because it is versioned and event-specific. It is not by itself an accepted $\Theta_{\mathrm{GWsrc}}(W,P)$ carrier, because no row below has been converted into a checker-consumable retained record with accepted status, carrier ids, artifact hashes, nuisance/calibration rows, and a no-hidden-retune witness.

## Equation Attack Card

| Field | Current result |
| --- | --- |
| Current score | `2` |
| Closure driver | Recover quadrupole, chirp, orbital decay, detector strain, radiated energy/angular momentum, and ringdown from one source carrier. |
| Primary AAA carrier | $\Theta_{\mathrm{GWsrc}}(W,P)$ with source window $W$ and detector path-history window $P$. |
| Smallest score-moving evidence object | Accepted source-backed `gw_source_carrier` plus accepted bindings for all `EQ-11A` required rows in one source-window record. |
| Exact first blocker | `missing_accepted_gw_source_carrier` |
| Existing scripts/fixtures/packets | [eq11a-gravitational-wave-source-residual.mjs](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-residual.mjs), [eq11a-gravitational-wave-source-attempt.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-attempt.v1.json), [EQ-11A Gravitational-Wave Source Recovery](eq-11a-gravitational-wave-source-recovery.md) |
| Breakthrough angle | Reuse `EQ-29` source-ledger grammar and `EQ-23A` source-window identity fields, while keeping the gravitational-wave effective-metric tensor channel separate from photon radiation or explosive-source carriers. |
| Fail-closed negative control | `gw.source_window_split`: chirp, quadrupole, strain, and ringdown rows pass numerically but use different `carrierId`, `sourceWindowId`, or detector path-history window. Expected failure: carrier split or hidden-retune failure before residual scoring. |
| Next action | Build a checker-consumable candidate input with concrete ids and source paths for the rows below, all still `attempt`, then run the existing EQ11A checker. |

## Required Row Map

| Checker row | `GW150914-v3` source-field candidate | Current blocker |
| --- | --- | --- |
| `gw_source_carrier` | `carrierId=theta_gwsrc_GW150914_v3`, `sourceWindowId=GW150914-v3`, `supportId=H1L1_GWTC1_PE_v3`, source page plus PE/data URLs. | Row not accepted; no checker-consumable source packet exists. |
| `theta_sea` | Noether sea/effective-metric constitutive row consumed from the parent weak-gravity lane. | Parent `EQ-11` still blocks at `missing_accepted_theta_11_20`; cannot be inferred from GWOSC data alone. |
| `effective_metric_tensor_channel` | Tensor-channel propagation/readout row for $h_+$ and $h_\times$ tied to the same detector path-history window. | Candidate detector strain data exists, but no accepted effective-metric tensor row has been populated. |
| `source_event_ledger` | Source/remnant ledger: initial binary, radiated energy, radiated angular momentum target, final mass/spin, and detector readout provenance. | Needs one retained ledger; current public data are source fields, not retained ledger rows. |
| `quadrupole_source_row` | Component masses, orbital/inspiral source parameters, and quadrupole benchmark constraints from event PE/source papers. | Needs accepted projection from one source ledger, not independent formula fitting. |
| `chirp_mass_row` | Chirp mass from the GWOSC/GWTC-1 PE record, bound to component masses on the same `sourceWindowId`. | Candidate field exists; row remains attempt until bound to the carrier and source ledger. |
| `peters_decay_row` | Orbital-decay comparison row using the same source masses/orbital state and effective metric channel. | No retained orbital-decay row exists in the source map yet. |
| `strain_flux_row` | H1/L1 strain products plus $h_+$/$h_\times$ strain-flux comparison for the same path-history window. | Candidate strain products exist; calibrated flux row and detector response binding are not accepted. |
| `ringdown_label_row` | Final mass/spin and ringdown label from the same source/remnant record. | Candidate final-state fields exist; no accepted ringdown retained label exists. |
| `detector_strain_record` | H1/L1 strain file identifiers, sample rate/window choice, calibration state, and detector mask. | Needs artifact hashes, calibration/nuisance row, and source-window binding. |
| `source_provenance` | GWOSC event page, PE/data URLs, source-paper URLs, and event-version record. | Candidate provenance exists; not accepted until the evidence packet records exact source fields and hashes. |
| `no_hidden_retune_witness` | One witness that chirp, quadrupole, decay, strain, radiated energy/angular momentum, and ringdown rows use the same event version and carrier ids. | Missing; current attempt only has normalized no-retune arithmetic. |

## Channel Boundary

This map may reuse source-ledger structure from `EQ-29`: `carrierId`, `sourceWindowId`, event provenance, source depletion/radiated-output rows, and no-hidden-retune witness. It must not reuse the photon carrier or radiation-source mechanism rows. For `EQ-11A`, the channel is the gravitational-wave effective-metric tensor disturbance; `EQ-29` remains the photon-channel source-mechanism row.

`EQ-23A` contributes a useful source-window vocabulary: `carrierId`, `sourceWindowId`, `supportId`, event ledger, provenance, and split-source negative control. It does not supply shock, yield, or radioactive rows to `EQ-11A`.

## Coordination-Source Negative Control

The fail-closed source check for the gravitational-wave source carrier is [eq11a-gravitational-wave-source-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-coordination-source-negative-control.v1.json):

```sh
node scripts/equation-mapping/eq11a-gravitational-wave-source-residual.mjs --input scripts/equation-mapping/eq11a-gravitational-wave-source-coordination-source-negative-control.v1.json --summary --pretty
```

This control marks the top-level `gw_source_carrier` candidate as accepted-looking while pointing the carrier `sourcePath` back to this priority source-field map. The intended result is `status: blocked_missing_accepted_gw_source_carrier`, `carrierReason: accepted_without_evidence_source`, and `scoreDecision: no_score_increase`. A source-field map can name `GW150914-v3` and the required row identities, but it cannot satisfy accepted retained evidence for $\Theta_{\mathrm{GWsrc}}(W,P)$.

## Current Disposition

The source map is ready for a checker-consumable attempt packet, not a score change. A future candidate input should preserve `status: attempt` until all row bindings are source-backed, durable, and accepted by the existing checker contract.

No score changes.
