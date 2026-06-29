# EQ-29 Radiation Source Carrier Source-Field Map

## Workstream Metadata

- Kind: `priority`
- Parent: [EQ-26 Through EQ-31 Observation-First Precision Packet](eq-26-31-observation-first-precision-packet.md)
- Source runner: [eq29-radiation-source-ledger-residual.mjs](../../../scripts/equation-mapping/eq29-radiation-source-ledger-residual.mjs)
- Source fixtures:
  - [eq29-synchrotron-source-ledger-attempt.v1.json](../../../scripts/equation-mapping/eq29-synchrotron-source-ledger-attempt.v1.json)
  - [eq29-radiation-source-carrier-source-attempt.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-carrier-source-attempt.v1.json)
  - [eq29-radiation-source-carrier-source-evidence-probe.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-carrier-source-evidence-probe.v1.json)
  - [eq29-radiation-source-carrier-metadata-missing-negative-control.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-carrier-metadata-missing-negative-control.v1.json)
  - [eq29-radiation-source-carrier-channel-family-source-evidence-probe.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-carrier-channel-family-source-evidence-probe.v1.json)
  - [eq29-radiation-source-carrier-channel-family-metadata-missing-negative-control.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-carrier-channel-family-metadata-missing-negative-control.v1.json)
  - [eq29-radiation-source-carrier-channel-family-collapse-negative-control.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-carrier-channel-family-collapse-negative-control.v1.json)
  - [eq29-radiation-source-carrier-channel-family-source-mechanism-source-evidence-probe.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-carrier-channel-family-source-mechanism-source-evidence-probe.v1.json)
  - [eq29-radiation-source-carrier-channel-family-source-mechanism-metadata-missing-negative-control.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-carrier-channel-family-source-mechanism-metadata-missing-negative-control.v1.json)
  - [eq29-radiation-source-carrier-channel-family-source-mechanism-collapse-negative-control.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-carrier-channel-family-source-mechanism-collapse-negative-control.v1.json)
  - [eq29-radiation-source-carrier-channel-family-source-mechanism-nonsynchrotron-negative-control.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-carrier-channel-family-source-mechanism-nonsynchrotron-negative-control.v1.json)
  - [eq29-radiation-source-ledger-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-ledger-coordination-source-negative-control.v1.json)
  - [eq29-radiation-source-ledger-probe-source-negative-control.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-ledger-probe-source-negative-control.v1.json)
  - [eq29-radiation-source-ledger-unrelated-durable-source-negative-control.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-ledger-unrelated-durable-source-negative-control.v1.json)
- Related source prose: [Synchrotron](../../../content/markdown/aaa/reactions/synchrotron.md)
- Row served: `EQ-29`
- Claim level: candidate source-field map and attack card
- Promotion status: priority-only

## Boundary

This map does not populate accepted retained evidence. It narrows `EQ-29` to one mechanism-declared `radiation_source_carrier` for a single synchrotron source ledger. Standard Larmor, Lienard, synchrotron, bremsstrahlung, and thermal formulas remain benchmark residuals only; they are not source-mechanism evidence without one accepted carrier, source branch, Noether sea magnetic-state row, photon Gate A/B output row, source depletion row, event ledger, provenance, and no-hidden-retune witness.

No score changes.

## Equation Attack Card

| Coordinate | Current answer |
| --- | --- |
| Row | `EQ-29` |
| Current score and closure driver | Score `3`; radiation documents define the residual/event grammar, but emitted power, direction, polarization, spectrum, recoil, medium/Noether sea updates, and source cooling are not derived from one source ledger. |
| Primary AAA carrier | `radiation_source_carrier` for one declared synchrotron source mechanism on one `commonCarrierId`. |
| Smallest accepted evidence object | One accepted source-backed row bundle beginning with `radiation_source_carrier`, then source mechanism, source branch, Noether sea magnetic state, closure residual/planar-mode threshold, photon Gate A/B output, source depletion, recoil/medium/wake/remnant, benchmark, cooling, polarization, event-ledger, provenance, and no-hidden-retune rows on one carrier. |
| Exact first blocker | `missing_accepted_radiation_source_carrier`. |
| Existing scripts/fixtures/packets found | The `EQ-29` checker and attempt fixture listed above, [Equation Closure Pass 2026-06-23 AN](equation-closure-pass-2026-06-23-an.md), [EQ-13 And EQ-28 e_gamma_e_0 Gate A Source-Field Map](eq-13-28-e-gamma-e0-gate-a-source-field-map.md), [EQ-12 Theta-Gamma Packet Source Shell](eq-12-theta-gamma-packet-source-shell.md), and [EQ-28A Path-Frequency Exchange](eq-28a-path-frequency-exchange.md). |
| Candidate breakthrough angle | Use one native event record from the synchrotron lane: a charged assembly path segment with $\Gamma_{e^\pm}(t)$, causal-root/Jacobian data, $\mathcal V_{\mathrm{NS}}$, $G_{\text{grad}}$, wake-strain threshold status, photon Gate A/B output, and source-depletion identity. |
| Fail-closed negative control | `source_channel_collapse`: a Compton/frequency-exchange row or photon Gate A object must not satisfy the synchrotron source mechanism row. |
| Smaller next action | Draft one checker-consumable candidate `radiation_source_carrier` row for a single event window with concrete ids and durable sources while keeping status `attempt`; then rerun the existing checker and require the first blocker to stay at `missing_accepted_radiation_source_carrier` until accepted evidence exists. |

## Accepted-Object Contract

The smallest useful source object is:

$$
\Theta_{\mathrm{rad,source}}^{(\mathrm{syn},W)}
=
\left(
\Gamma_{e^\pm},
\mathcal C_{o'j},
J_{o'j},
\mathcal V_{\mathrm{NS}},
G_{\text{grad}},
\mathcal R_{\Theta}^{\mathrm{syn}},
\mathcal L_{\gamma}^{A/B},
\mathcal L_{\mathrm{deplete}},
\mathcal L_{\mathrm{recoil/med/wake/rem}},
\mathbf R_{29}^{\mathrm{syn}},
\mathcal S_{\mathrm{retune}}
\right).
$$

Required rows on one `commonCarrierId`:

| Checker row | Minimum source-field content |
| --- | --- |
| `radiation_source_carrier` | Accepted carrier id, retained event window, declared mechanism family, durable source path, and support for `EQ-29`. |
| `carrier_channel_family_row` | Photon-channel output family row; frequency exchange, photon output, reaction-product carrier, and tensor disturbance remain distinct families. Accepted-looking rows must explicitly declare `carrier_channel_family_row`, `carrier_channel_family`, and `photon-channel output family` support. |
| `source_mechanism_row` | Mechanism declared as `synchrotron`, not Compton exchange, thermal/free-free, bremsstrahlung, or generic radiation. Accepted-looking rows must explicitly declare `source_mechanism_row`, `source_mechanism`, and `synchrotron source mechanism` support. |
| `source_branch_row` | One curved charged-assembly branch with $\Gamma_{e^\pm}(t)$, causal-root data, transport path, and source branch identity. |
| `noether_sea_magnetic_state_row` | One anisotropic Noether sea magnetic-state row carrying $\mathcal V_{\mathrm{NS}}$, $G_{\text{grad}}$, and the effective magnetic comparison inputs. |
| `closure_residual_planar_mode_row` | Closure residual and planar-mode threshold row for the photon-producing event. |
| `photon_output_gate_A_B_row` | Photon Gate A/B output row; it may consume photon-packet or Gate A evidence but cannot replace the source carrier. |
| `source_depletion_row` | Energy, momentum, and angular-momentum depletion from the charged source ledger. |
| `recoil_medium_wake_remnant_rows` | Recoil, medium update, wake, and remnant balance rows tied to the same event. |
| `power_spectrum_benchmark_row` | Observer-level $P_{\mathrm{syn}}$ and $\nu_c$ benchmark residuals, not source evidence by themselves. |
| `cooling_row` | Cooling time from source energy divided by emitted power on the same source ledger. |
| `polarization_angular_momentum_handoff_row` | Gate B polarization and angular-momentum handoff row. |
| `event_ledger_row` | Event balance across source, photon, recoil, medium, wake, and remnant rows. |
| `source_provenance`, `no_hidden_retune_witness` | Durable source provenance plus proof that $B_{\mathrm{eff}}$, $\gamma$, pitch, source branch, and Noether sea state are not retuned between power, frequency, cooling, and polarization rows. |

Accepted rows must also declare EQ-29/radiation-source support in row metadata such as `sourceFamily`, `sourceKind`, `sourceRole`, `sourceSupport`, or `evidenceFamily`. A durable file path is not enough by itself: unrelated durable sources can be real files while still not being retained radiation-source evidence.

## Direct Geometry Layer

This layer keeps radiation source recovery as one source-ledger geometry problem. It does not let a photon-channel output row, a Compton exchange row, a generic radiation note, or an observer-level power/spectrum benchmark substitute for a retained synchrotron source mechanism.

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Fail-closed negative control | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| $P_L$ / Lienard power and synchrotron $P_{\mathrm{syn}}$ | Source-depletion and emitted-power readout from one curved charged-assembly source ledger. | `radiation_source_carrier`, `source_depletion_row`, `power_spectrum_benchmark_row` | One `commonCarrierId`, event window, source branch id, and source-depletion ledger feed both power and benchmark rows. | `power_without_source_depletion` rejects benchmark power without a source-depletion ledger. | Accepted `radiation_source_carrier` plus source-depletion and benchmark rows with EQ-29/radiation-source support metadata. |
| Critical frequency $\nu_c$ and spectrum shape | Photon output spectrum readout from the same source branch and Noether sea magnetic-state row. | `carrier_channel_family_row`, `source_mechanism_row`, `noether_sea_magnetic_state_row`, `power_spectrum_benchmark_row` | $B_{\mathrm{eff}}$, $\gamma$, pitch, channel family, and synchrotron mechanism remain on one source branch. | `hidden_B_or_gamma_retune`, `carrier_channel_family_source_contract_mismatch`, and `source_mechanism_source_contract_mismatch` reject retuned or generic rows. | Accepted photon-channel family and synchrotron source-mechanism rows after the parent radiation carrier passes. |
| Source mechanism class | Mechanism-specific readout that distinguishes synchrotron from Compton exchange, bremsstrahlung, thermal/free-free, and generic radiation. | `source_mechanism_row`, `source_branch_row` | One source branch id binds the mechanism declaration, causal-root path, charged-assembly branch, and event ledger. | `source_channel_collapse` and `source_mechanism_nonsynchrotron` reject photon Gate A, Compton exchange, generic radiation, and non-synchrotron metadata. | Accepted source-mechanism row declaring synchrotron source-mechanism support plus the accepted source-branch row. |
| Photon Gate A/B output and polarization | Photon-channel output, Gate B polarization, and angular-momentum handoff from the same event ledger. | `photon_output_gate_A_B_row`, `polarization_angular_momentum_handoff_row` | Photon output, polarization, angular momentum, and source depletion use one event ledger and carrier id. | `polarization_without_gate_B` rejects polarization rows without Gate B handoff. | Accepted photon Gate A/B output and polarization/angular-momentum rows on the source carrier. |
| Recoil, medium, wake, and remnant updates | Conservation readout across source, photon, recoil, medium, wake, and remnant rows. | `recoil_medium_wake_remnant_rows`, `event_ledger_row` | Recoil, medium update, wake, remnant, photon output, and source depletion cite one event ledger. | Event-ledger controls reject thermal/free-free or benchmark-only fits without the full ledger. | Accepted recoil/medium/wake/remnant rows plus event-ledger row on one carrier. |
| Cooling time | Cooling readout from source energy divided by emitted power on the same ledger. | `cooling_row`, `source_depletion_row`, `power_spectrum_benchmark_row` | Cooling, source energy, emitted power, and source depletion share one event and source branch. | Hidden-retune controls reject changing source energy, $B_{\mathrm{eff}}$, $\gamma$, or pitch between power and cooling. | Accepted cooling row bound to accepted source-depletion and benchmark rows. |
| $\mathcal S_{\mathrm{retune}}$ and source provenance | No-hidden-retune witness plus durable source provenance for carrier, family, mechanism, branch, source state, photon output, depletion, recoil, cooling, and polarization rows. | `source_provenance`, `no_hidden_retune_witness`, all required rows | All required rows cite durable evidence and the same `commonCarrierId`, source branch, event ledger, and row-specific source-support metadata. | Coordination-source, probe-source, unrelated-durable, metadata-missing, family-collapse, mechanism-collapse, and non-synchrotron controls reject false evidence sources. | A checker-consumable $\Theta_{\mathrm{rad,source}}^{(\mathrm{syn},W)}$ packet whose required rows are accepted, source-backed, metadata-supported, same-record bound, and fail closed under the existing checker. |

The smallest accepted evidence object is therefore not a radiation benchmark residual by itself. It is the accepted radiation-source carrier, followed by accepted carrier-channel-family and synchrotron source-mechanism rows with the row-specific support metadata already exercised by the source-evidence probes and metadata/collapse controls.

## Fail-Closed Controls

Keep the existing controls as first-line guards:

- `source_channel_collapse`: catches Compton exchange, photon Gate A, or generic radiation being used as the synchrotron source mechanism.
- `power_without_source_depletion`: catches benchmark power with no source-depletion ledger.
- `hidden_B_or_gamma_retune`: catches different $B_{\mathrm{eff}}$, $\gamma$, pitch, or Noether sea rows between power and frequency.
- `polarization_without_gate_B`: catches polarization accepted without Gate B handoff.
- `thermal_fit_without_event_ledger`: catches thermal/free-free fitting without an event ledger.
- `accepted_without_evidence_source`: catches accepted-looking rows sourced only to priority packets, authored prose, generated files, temporary files, attempt fixtures, mocks, or negative-control fixtures.
- `unrelated_durable_source`: catches accepted-looking rows sourced to a durable but unrelated file that does not declare EQ-29/radiation-source support.
- `metadata_missing_source`: catches an accepted-looking `radiation_source_carrier` row whose durable source path exists but whose row metadata does not declare EQ-29/radiation-source support.
- `carrier_channel_family_metadata_missing`: catches an accepted-looking `carrier_channel_family_row` whose durable source path exists but whose row metadata does not declare channel-family support.
- `carrier_channel_family_source_contract_mismatch`: catches a row whose metadata declares only generic EQ-29/radiation-source carrier support, rather than photon-channel output family support.
- `source_mechanism_metadata_missing`: catches an accepted-looking `source_mechanism_row` whose durable source path exists but whose row metadata does not declare source-mechanism support.
- `source_mechanism_source_contract_mismatch`: catches a row whose metadata declares only generic EQ-29/radiation-source support, rather than synchrotron source-mechanism support.
- `source_mechanism_nonsynchrotron`: catches a row whose metadata declares source-mechanism support for a non-synchrotron mechanism.

## Next Action

The single-event source-attempt fixture is now:

```sh
node scripts/equation-mapping/eq29-radiation-source-ledger-residual.mjs --input scripts/equation-mapping/eq29-radiation-source-carrier-source-attempt.v1.json --summary --pretty
```

Expected result: `status=blocked_missing_rows`, `nextBlocker=missing_accepted_radiation_source_carrier`, `sourceLedgerNumericPass=true`, and six of six negative controls pass, including `gate_a_not_radiation_source_carrier`.

The one-row carrier source-evidence probe is:

```sh
node scripts/equation-mapping/eq29-radiation-source-ledger-residual.mjs --input scripts/equation-mapping/eq29-radiation-source-carrier-source-evidence-probe.v1.json --summary --pretty
```

Expected result: `status=blocked_missing_rows`, `nextBlocker=missing_accepted_carrier_channel_family_row`, `sourceEvidencePass=true`, and `sourceEvidenceFailureCount=0`. This is still score-neutral: only `radiation_source_carrier` is accepted-looking, while the carrier/channel family, source mechanism, source branch, Noether sea magnetic state, Gate A/B output, depletion, recoil/wake/remnant, benchmark, cooling, polarization, event ledger, provenance, and no-retune rows remain `attempt`.

The metadata-missing carrier control is:

```sh
node scripts/equation-mapping/eq29-radiation-source-ledger-residual.mjs --input scripts/equation-mapping/eq29-radiation-source-carrier-metadata-missing-negative-control.v1.json --summary --pretty
```

Expected result: `status=blocked_missing_rows`, `nextBlocker=missing_accepted_radiation_source_carrier`, `sourceEvidenceFailureCount=1`, and `rowStatuses.radiation_source_carrier.reason=accepted_without_evidence_source`. The same command with `--require-populated` must exit nonzero. This protects the checker from treating an existing durable file as source evidence unless the row declares EQ-29/radiation-source support.

The coordination-source fail-closed control is:

```sh
node scripts/equation-mapping/eq29-radiation-source-ledger-residual.mjs --input scripts/equation-mapping/eq29-radiation-source-ledger-coordination-source-negative-control.v1.json --summary --pretty
```

Expected result: `status=blocked_source_evidence`, `nextBlocker=accepted_without_evidence_source`, and `sourceEvidenceFailureCount=15`. The same command with `--require-populated` must exit nonzero.

The probe-source fail-closed control is:

```sh
node scripts/equation-mapping/eq29-radiation-source-ledger-residual.mjs --input scripts/equation-mapping/eq29-radiation-source-ledger-probe-source-negative-control.v1.json --summary --pretty
```

Expected result: `status=blocked_source_evidence`, `nextBlocker=accepted_without_evidence_source`, and `sourceEvidenceFailureCount=15`. This protects `EQ-29` from treating toy or `source-evidence-probe` fixtures as retained radiation source evidence.

The unrelated-durable-source fail-closed control is:

```sh
node scripts/equation-mapping/eq29-radiation-source-ledger-residual.mjs --input scripts/equation-mapping/eq29-radiation-source-ledger-unrelated-durable-source-negative-control.v1.json --summary --pretty
```

Expected result: `status=blocked_source_evidence`, `nextBlocker=accepted_without_evidence_source`, and `sourceEvidenceFailureCount=15`. This protects `EQ-29` from treating a durable but unrelated source, such as a reaction-statistics file, as retained radiation-source evidence merely because the path exists and is not forbidden.

The two-row channel-family source-evidence probe is:

```sh
node scripts/equation-mapping/eq29-radiation-source-ledger-residual.mjs --input scripts/equation-mapping/eq29-radiation-source-carrier-channel-family-source-evidence-probe.v1.json --summary --pretty
```

Expected result: `status=blocked_missing_rows`, `nextBlocker=missing_accepted_source_mechanism_row`, `sourceEvidencePass=true`, and `sourceEvidenceFailureCount=0`. This remains score-neutral because all source-mechanism, source-branch, Noether sea, Gate A/B, depletion, recoil/wake/remnant, benchmark, cooling, polarization, event-ledger, provenance, and no-retune rows remain `attempt`.

The channel-family metadata-missing control is:

```sh
node scripts/equation-mapping/eq29-radiation-source-ledger-residual.mjs --input scripts/equation-mapping/eq29-radiation-source-carrier-channel-family-metadata-missing-negative-control.v1.json --summary --pretty
```

Expected result: `status=blocked_missing_rows`, `nextBlocker=missing_accepted_carrier_channel_family_row`, `sourceEvidenceFailureCount=1`, and `rowStatuses.carrier_channel_family_row.reason=accepted_without_evidence_source`. The same command with `--require-populated` must exit nonzero.

The channel-family collapse control is:

```sh
node scripts/equation-mapping/eq29-radiation-source-ledger-residual.mjs --input scripts/equation-mapping/eq29-radiation-source-carrier-channel-family-collapse-negative-control.v1.json --summary --pretty
```

Expected result: `status=blocked_missing_rows`, `nextBlocker=missing_accepted_carrier_channel_family_row`, `sourceEvidenceFailureCount=1`, and `rowStatuses.carrier_channel_family_row.reason=carrier_channel_family_source_contract_mismatch`. The same command with `--require-populated` must exit nonzero. This proves generic EQ-29/radiation-source support metadata cannot collapse carrier identity into photon-channel output family evidence.

The three-row source-mechanism source-evidence probe is:

```sh
node scripts/equation-mapping/eq29-radiation-source-ledger-residual.mjs --input scripts/equation-mapping/eq29-radiation-source-carrier-channel-family-source-mechanism-source-evidence-probe.v1.json --summary --pretty
```

Expected result: `status=blocked_missing_rows`, `nextBlocker=missing_accepted_source_branch_row`, `sourceEvidencePass=true`, and `sourceEvidenceFailureCount=0`. This remains score-neutral because all source-branch, Noether sea, Gate A/B, depletion, recoil/wake/remnant, benchmark, cooling, polarization, event-ledger, provenance, and no-retune rows remain `attempt`.

The source-mechanism metadata-missing control is:

```sh
node scripts/equation-mapping/eq29-radiation-source-ledger-residual.mjs --input scripts/equation-mapping/eq29-radiation-source-carrier-channel-family-source-mechanism-metadata-missing-negative-control.v1.json --summary --pretty
```

Expected result: `status=blocked_missing_rows`, `nextBlocker=missing_accepted_source_mechanism_row`, `sourceEvidenceFailureCount=1`, and `rowStatuses.source_mechanism_row.reason=accepted_without_evidence_source`. The same command with `--require-populated` must exit nonzero.

The source-mechanism collapse control is:

```sh
node scripts/equation-mapping/eq29-radiation-source-ledger-residual.mjs --input scripts/equation-mapping/eq29-radiation-source-carrier-channel-family-source-mechanism-collapse-negative-control.v1.json --summary --pretty
```

Expected result: `status=blocked_missing_rows`, `nextBlocker=missing_accepted_source_mechanism_row`, `sourceEvidenceFailureCount=1`, and `rowStatuses.source_mechanism_row.reason=source_mechanism_source_contract_mismatch`. The same command with `--require-populated` must exit nonzero. This proves generic EQ-29/radiation-source support metadata cannot collapse carrier identity or photon-channel family support into synchrotron source-mechanism evidence.

The non-synchrotron source-mechanism control is:

```sh
node scripts/equation-mapping/eq29-radiation-source-ledger-residual.mjs --input scripts/equation-mapping/eq29-radiation-source-carrier-channel-family-source-mechanism-nonsynchrotron-negative-control.v1.json --summary --pretty
```

Expected result: `status=blocked_missing_rows`, `nextBlocker=missing_accepted_source_mechanism_row`, `sourceEvidenceFailureCount=1`, and `rowStatuses.source_mechanism_row.reason=source_mechanism_source_contract_mismatch`. The same command with `--require-populated` must exit nonzero. This proves non-synchrotron mechanism metadata cannot satisfy the synchrotron source-mechanism row.

Until accepted source-backed rows exist beyond the source-mechanism probe, the correct retained-evidence state remains score-neutral.
