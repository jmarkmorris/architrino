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
| Primary $\mathbb{A}\mathbb{A}\mathbb{A}$ carrier | $\Theta_{\mathrm{GWsrc}}(W,P)$ with source window $W$ and detector path-history window $P$. |
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

## Direct Geometry Layer

This source-window layer applies the Direct Geometry Layer requirement to the concrete `GW150914-v3` candidate. The row remains candidate-level: it names the retained-record geometry that would have to exist, not accepted evidence that it already exists.

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Fail-closed negative control | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| $\mathcal M_c$ from component masses | Component-mass and chirp-mass readout from one binary source event ledger. | `gw_source_carrier`, `source_event_ledger`, `chirp_mass_row` | One `carrierId`, `sourceWindowId`, `supportId`, and `eventId` bind $m_1$, $m_2$, and $\mathcal M_c$ to `GW150914-v3`. | `gw.source_window_split` rejects a chirp row whose source event or support id differs from the carrier. | Accepted `gw_source_carrier` row plus component-mass and chirp-mass row sourced to a durable GWOSC/LVK event record with artifact hashes. |
| $\dot f_{\mathrm{GW}}$ | Inspiral phase-rate readout from the same chirp mass and tensor-channel constants. | `chirp_mass_row`, `theta_sea`, `effective_metric_tensor_channel` | The chirp row, Noether sea row, and effective metric tensor channel share the carrier identity before the chirp-rate residual is scored. | Probe-source and theta-sea content-source controls reject probe JSON or authored Noether sea prose as retained evidence. | Accepted `theta_sea` and effective-metric tensor rows bound to the accepted GW source carrier. |
| Peters-Mathews $\dot a$ or $\dot P_b$ | Orbital-decay readout from the same source masses, orbital state, and tensor-radiation channel. | `peters_decay_row`, `source_event_ledger`, `effective_metric_tensor_channel` | The decay row consumes the same source-event ledger as the chirp, radiated-output, and remnant rows. | Split-source control rejects orbital decay imported from a separate binary source window. | Accepted orbital-decay row whose source ledger and tensor channel match the GW150914 carrier. |
| $P_{\mathrm{GW}}$ and quadrupole power | Effective quadrupole and radiated-power readout from the binary source ledger. | `quadrupole_source_row`, `source_event_ledger`, `effective_metric_tensor_channel` | $Q_{ij}^{\mathrm{eff}}$, $E_{\mathrm{rad}}$, and $\mathbf J_{\mathrm{rad}}$ bind to the same source/remnant ledger. | Unledgered-power control rejects standalone quadrupole arithmetic without source-ledger identity. | Accepted quadrupole row plus radiated energy/angular-momentum ledger sourced to one event record. |
| $\mathcal F_{\mathrm{GW}}$ | Detector path-history strain-flux readout for $h_+$ and $h_\times$. | `strain_flux_row`, `detector_strain_record`, `effective_metric_tensor_channel` | H1/L1 strain, detector calibration/nuisance state, path-history window, and source event share one `supportId`. | Strain-only controls reject one-polarization or detector-only fits not bound to the source carrier. | Accepted detector strain record and strain-flux row with source-window binding and artifact hashes. |
| Ringdown $f_{\mathrm{ring}}$, $\tau_{\mathrm{ring}}$ | Final compact-object label after radiated energy and angular momentum update the remnant. | `ringdown_label_row`, `source_event_ledger` | Ringdown label, final mass/spin, radiated ledger, and remnant id remain on the same source event ledger. | Split-ringdown control rejects final-state labels imported from another event or retuned after the chirp fit. | Accepted ringdown label row bound to the same remnant ledger as the source carrier. |
| Source identity and $\mathcal S_{\mathrm{retune}}$ | No-hidden-retune witness for the whole GW150914 retained record. | `source_provenance`, `no_hidden_retune_witness`, all required rows | Every required row cites durable non-priority evidence and the same `carrierId`, `sourceWindowId`, `supportId`, and `eventId`. | Coordination-source, probe-source, and content-source controls reject priority packets, probes, authored prose, generated paths, and temporary paths. | A checker-consumable $\Theta_{\mathrm{GWsrc}}(W,P)$ packet whose required rows are accepted, source-backed, same-record bound, and fail closed under the existing checker. |

The smallest accepted evidence object is therefore not a better normalized numerical sample. It is a retained $\Theta_{\mathrm{GWsrc}}(W,P)$ source packet for `GW150914-v3` whose carrier, Noether sea/effective-metric rows, source-event ledger, detector strain record, radiated-output ledger, ringdown label, source provenance, and no-hidden-retune witness all survive the existing accepted-source and same-record checks.

## Channel Boundary

This map may reuse source-ledger structure from `EQ-29`: `carrierId`, `sourceWindowId`, event provenance, source depletion/radiated-output rows, and no-hidden-retune witness. It must not reuse the photon carrier or radiation-source mechanism rows. For `EQ-11A`, the channel is the gravitational-wave effective-metric tensor disturbance; `EQ-29` remains the photon-channel source-mechanism row.

`EQ-23A` contributes a useful source-window vocabulary: `carrierId`, `sourceWindowId`, `supportId`, event ledger, provenance, and split-source negative control. It does not supply shock, yield, or radioactive rows to `EQ-11A`.

## Coordination-Source Negative Control

The fail-closed source check for the gravitational-wave source carrier is [eq11a-gravitational-wave-source-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-coordination-source-negative-control.v1.json):

```sh
node scripts/equation-mapping/eq11a-gravitational-wave-source-residual.mjs --input scripts/equation-mapping/eq11a-gravitational-wave-source-coordination-source-negative-control.v1.json --summary --pretty
```

This control marks the top-level `gw_source_carrier` candidate as accepted-looking while pointing the carrier `sourcePath` back to this priority source-field map. The intended result is `status: blocked_missing_accepted_gw_source_carrier`, `carrierReason: accepted_without_evidence_source`, and `scoreDecision: no_score_increase`. A source-field map can name `GW150914-v3` and the required row identities, but it cannot satisfy accepted retained evidence for $\Theta_{\mathrm{GWsrc}}(W,P)$.

## Source-Evidence Probe

The one-row source-evidence probe is [eq11a-gravitational-wave-source-evidence-probe.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-evidence-probe.v1.json):

```sh
node scripts/equation-mapping/eq11a-gravitational-wave-source-residual.mjs --input scripts/equation-mapping/eq11a-gravitational-wave-source-evidence-probe.v1.json --summary --pretty
node scripts/equation-mapping/eq11a-gravitational-wave-source-residual.mjs --input scripts/equation-mapping/eq11a-gravitational-wave-source-evidence-probe.v1.json --summary --pretty --require-populated
```

The probe marks only the top-level carrier and `gw_source_carrier` row as accepted-looking against a guard-passing local GWOSC/LVK report source. It leaves `theta_sea`, the effective-metric tensor channel, event ledger, source rows, strain record, provenance row, and no-hidden-retune witness at `attempt`. The expected result is `status: blocked_missing_rows`, `scoreDecision: no_score_increase`, and `nextBlocker: missing_accepted_theta_sea`; the `--require-populated` form must exit nonzero.

Current checker finding: the source-evidence probe exposes the next blocker without closing it. The default attempt remains blocked at `missing_accepted_gw_source_carrier`; the probe advances only to `missing_accepted_theta_sea`, with `6/6` negative controls passing and `scoreDecision: no_score_increase`. This confirms that the smallest score-moving object is not a single accepted-looking `gw_source_carrier`; it must include accepted `theta_sea`, effective-metric tensor, source-event ledger, detector-strain, ringdown, provenance, and no-hidden-retune rows bound to the same retained record.

The checker now requires each accepted-looking row to carry a row-specific `sourceEvidence` contract in addition to a durable non-priority source path. The contract must name `supportsEquationRows=["EQ-11A"]`, include the exact row id in `supportsRows`, and bind `sourceWindowId=GW150914-v3`, `supportId=H1L1_GWTC1_PE_v3`, and `eventId=GWTC-1-confident/GW150914/v3`. This keeps a generic GWOSC/LVK source note from satisfying `theta_sea`, tensor-channel, event-ledger, or detector-strain rows unless the source explicitly supports that row on the same source record.

The probe-source negative control is [eq11a-gravitational-wave-source-probe-source-negative-control.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-probe-source-negative-control.v1.json):

```sh
node scripts/equation-mapping/eq11a-gravitational-wave-source-residual.mjs --input scripts/equation-mapping/eq11a-gravitational-wave-source-probe-source-negative-control.v1.json --summary --pretty
```

It marks the same carrier and `gw_source_carrier` row accepted-looking while pointing their source paths at a source-evidence-probe JSON. The intended result is `status: blocked_missing_accepted_gw_source_carrier`, `carrierReason: accepted_without_evidence_source`, `sourceIdentityPass: true`, and `scoreDecision: no_score_increase`. The same command with `--require-populated` must exit nonzero. Probe files can expose blocker order, but they cannot satisfy retained source evidence for $\Theta_{\mathrm{GWsrc}}(W,P)$.

## Theta-Sea Content-Source Negative Control

The `theta_sea` content-source negative control is [eq11a-gravitational-wave-source-theta-sea-content-source-negative-control.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-theta-sea-content-source-negative-control.v1.json):

```sh
node scripts/equation-mapping/eq11a-gravitational-wave-source-residual.mjs --input scripts/equation-mapping/eq11a-gravitational-wave-source-theta-sea-content-source-negative-control.v1.json --summary --pretty
```

It preserves the accepted-looking top carrier and `gw_source_carrier` row from the source-evidence probe, then marks only `theta_sea` accepted-looking while pointing that row to [Noether Sea](../../../content/markdown/aaa/spacetime/noether-sea.md). The expected result is `status: blocked_missing_rows`, `nextBlocker: missing_accepted_theta_sea`, `scoreDecision: no_score_increase`, and `rowStatuses.theta_sea.reason=accepted_without_evidence_source`. The same command with `--require-populated` must exit nonzero. Authored Noether sea prose can define the parent concept, but it cannot replace a retained Noether sea/effective-metric source row for `EQ-11A`.

## Theta-Sea Generic-Source Negative Control

The row-specific source-support control is [eq11a-gravitational-wave-source-theta-sea-generic-source-negative-control.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-theta-sea-generic-source-negative-control.v1.json):

```sh
node scripts/equation-mapping/eq11a-gravitational-wave-source-residual.mjs --input scripts/equation-mapping/eq11a-gravitational-wave-source-theta-sea-generic-source-negative-control.v1.json --summary --pretty
```

It keeps the accepted-looking carrier and `gw_source_carrier` row source-backed by the durable GWOSC/LVK mining note, then marks only `theta_sea` accepted-looking against that same durable source while giving the row a `sourceEvidence.supportsRows=["gw_source_carrier"]` contract. The expected result remains `status: blocked_missing_rows`, `nextBlocker: missing_accepted_theta_sea`, `scoreDecision: no_score_increase`, and `rowStatuses.theta_sea.reason=source_contract_row_mismatch`. The command with `--require-populated` must exit nonzero. A durable gravitational-wave source note can expose the source carrier, but it cannot stand in for the retained Noether sea/effective-metric tensor row unless the source contract names that row directly.

## Smallest Next Source Object

The score-neutral `theta_sea` source-contract boundary is staged in [eq11a-gravitational-wave-source-theta-sea-source-contract.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-theta-sea-source-contract.v1.json), with checker input [eq11a-gravitational-wave-source-theta-sea-source-contract-attempt.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-theta-sea-source-contract-attempt.v1.json):

```sh
node scripts/equation-mapping/eq11a-gravitational-wave-source-residual.mjs --input scripts/equation-mapping/eq11a-gravitational-wave-source-theta-sea-source-contract-attempt.v1.json --summary --pretty
node scripts/equation-mapping/eq11a-gravitational-wave-source-residual.mjs --input scripts/equation-mapping/eq11a-gravitational-wave-source-theta-sea-source-contract-attempt.v1.json --summary --pretty --require-populated
```

The first command advances only to `nextBlocker=missing_accepted_effective_metric_tensor_channel`, with `scoreDecision=no_score_increase`; the `--require-populated` form exits nonzero. This boundary is not accepted retained evidence. It only proves that a row-specific `sourceEvidence` contract can move the checker from the parent source carrier and `theta_sea` row to the tensor-channel blocker while leaving the tensor channel, source event ledger, quadrupole, chirp, Peters-decay, strain-flux, ringdown, detector-strain, provenance, and no-hidden-retune rows at `attempt`.

The score-neutral tensor-channel boundary is staged in [eq11a-gravitational-wave-source-effective-metric-tensor-source-contract.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-effective-metric-tensor-source-contract.v1.json), with checker input [eq11a-gravitational-wave-source-effective-metric-tensor-source-contract-attempt.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-effective-metric-tensor-source-contract-attempt.v1.json):

```sh
node scripts/equation-mapping/eq11a-gravitational-wave-source-residual.mjs --input scripts/equation-mapping/eq11a-gravitational-wave-source-effective-metric-tensor-source-contract-attempt.v1.json --summary --pretty
node scripts/equation-mapping/eq11a-gravitational-wave-source-residual.mjs --input scripts/equation-mapping/eq11a-gravitational-wave-source-effective-metric-tensor-source-contract-attempt.v1.json --summary --pretty --require-populated
```

The first command advances only to `nextBlocker=missing_accepted_source_event_ledger`, with `scoreDecision=no_score_increase`; the `--require-populated` form exits nonzero. [eq11a-gravitational-wave-source-effective-metric-tensor-row-mismatch-negative-control.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-effective-metric-tensor-row-mismatch-negative-control.v1.json) keeps an accepted-looking tensor row blocked at `missing_accepted_effective_metric_tensor_channel` when its `sourceEvidence` names the wrong row.

## Current Disposition

The source map is ready for a source-event-ledger source-contract attempt, not a score change. A future candidate input should preserve `status: attempt` until all row bindings are source-backed, durable, and accepted by the existing checker contract.

No score changes.
