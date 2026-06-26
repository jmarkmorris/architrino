# EQ-29 Radiation Source Carrier Source-Field Map

## Workstream Metadata

- Kind: `priority`
- Parent: [EQ-26 Through EQ-31 Observation-First Precision Packet](eq-26-31-observation-first-precision-packet.md)
- Source runner: [eq29-radiation-source-ledger-residual.mjs](../../../scripts/equation-mapping/eq29-radiation-source-ledger-residual.mjs)
- Source fixtures:
  - [eq29-synchrotron-source-ledger-attempt.v1.json](../../../scripts/equation-mapping/eq29-synchrotron-source-ledger-attempt.v1.json)
  - [eq29-radiation-source-carrier-source-attempt.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-carrier-source-attempt.v1.json)
  - [eq29-radiation-source-ledger-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-ledger-coordination-source-negative-control.v1.json)
  - [eq29-radiation-source-ledger-probe-source-negative-control.v1.json](../../../scripts/equation-mapping/eq29-radiation-source-ledger-probe-source-negative-control.v1.json)
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
| Smallest score-moving evidence object | One accepted source-backed row bundle beginning with `radiation_source_carrier`, then source mechanism, source branch, Noether sea magnetic state, closure residual/planar-mode threshold, photon Gate A/B output, source depletion, recoil/medium/wake/remnant, benchmark, cooling, polarization, event-ledger, provenance, and no-hidden-retune rows on one carrier. |
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
| `carrier_channel_family_row` | Photon-channel output family row; frequency exchange, photon output, reaction-product carrier, and tensor disturbance remain distinct families. |
| `source_mechanism_row` | Mechanism declared as `synchrotron`, not Compton exchange, thermal/free-free, bremsstrahlung, or generic radiation. |
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

## Fail-Closed Controls

Keep the existing controls as first-line guards:

- `source_channel_collapse`: catches Compton exchange, photon Gate A, or generic radiation being used as the synchrotron source mechanism.
- `power_without_source_depletion`: catches benchmark power with no source-depletion ledger.
- `hidden_B_or_gamma_retune`: catches different $B_{\mathrm{eff}}$, $\gamma$, pitch, or Noether sea rows between power and frequency.
- `polarization_without_gate_B`: catches polarization accepted without Gate B handoff.
- `thermal_fit_without_event_ledger`: catches thermal/free-free fitting without an event ledger.
- `accepted_without_evidence_source`: catches accepted-looking rows sourced only to priority packets, authored prose, generated files, temporary files, attempt fixtures, mocks, or negative-control fixtures.

## Next Action

The single-event source-attempt fixture is now:

```sh
node scripts/equation-mapping/eq29-radiation-source-ledger-residual.mjs --input scripts/equation-mapping/eq29-radiation-source-carrier-source-attempt.v1.json --summary --pretty
```

Expected result: `status=blocked_missing_rows`, `nextBlocker=missing_accepted_radiation_source_carrier`, `sourceLedgerNumericPass=true`, and six of six negative controls pass, including `gate_a_not_radiation_source_carrier`.

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

Create one durable, accepted `radiation_source_carrier` evidence row for a single synchrotron event window, then run:

```sh
node scripts/equation-mapping/eq29-radiation-source-ledger-residual.mjs --summary --pretty
```

Until accepted source-backed rows exist, the correct result remains `missing_accepted_radiation_source_carrier`.
