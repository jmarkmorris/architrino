# Equation Closure Pass 2026-06-23 AN

## Metadata

- Target: score-neutral `EQ-29` radiation source-ledger residual.
- Runner: [eq29-radiation-source-ledger-residual.mjs](../../../scripts/equation-mapping/eq29-radiation-source-ledger-residual.mjs).
- Primary attempt input: [eq29-synchrotron-source-ledger-attempt.v1.json](../../../scripts/equation-mapping/eq29-synchrotron-source-ledger-attempt.v1.json).
- Related packet: [EQ-26 Through EQ-31 Observation-First Precision Packet](eq-26-31-observation-first-precision-packet.md).
- Score disposition: no score changes.

## Closure Object

This pass makes the `EQ-29` radiation row executable as a mechanism-declared source ledger. The checker separates the carrier/channel family from the source mechanism and begins with the synchrotron packet

$$
\mathbf R_{29}^{\mathrm{syn}}
=
\left(
\Delta_P,
\Delta_{\nu_c},
\Delta_{\mathrm{cool}},
\Delta_{\mathrm{pol}},
\Delta_{\mathrm{evt}},
\mathcal S_{\mathrm{retune}}
\right),
$$

where all entries must consume one source branch, one anisotropic Noether sea magnetic-state row, one photon Gate A/B output row, one source-depletion row, one recoil/medium/wake/remnant row, one event ledger, and one no-hidden-retune witness.

The executable residual checks:

- synchrotron power from source depletion against $P_{\mathrm{syn}}\sim(4/3)\sigma_T cU_B\gamma^2$ with the declared pitch and speed factors;
- characteristic frequency against $\nu_c\sim(3/2)\gamma^2(eB_{\mathrm{eff}}/2\pi m_e)\sin\alpha$;
- cooling time against source energy divided by emitted power;
- Gate B polarization handoff residual;
- event-balance norm across source, photon, recoil, medium, wake, and remnant rows;
- source provenance and no-hidden-retune rows.

The negative controls detect source/channel collapse, benchmark power without source depletion, hidden $B_{\mathrm{eff}}$ or $\gamma$ retuning, polarization accepted without Gate B, and thermal/free-free fitting without an event ledger.

## Attempt Fixture Result

The attempt fixture passes the arithmetic shape checks but blocks at the retained-row boundary:

| Field | Result |
| --- | --- |
| Status | `blocked_missing_rows` |
| Score decision | `no_score_increase` |
| Next blocker | `missing_accepted_radiation_source_carrier` |
| Common carrier pass | `true` |
| Source-ledger numeric pass | `true` |
| Power pass | `true` |
| Characteristic-frequency pass | `true` |
| Cooling pass | `true` |
| Polarization pass | `true` |
| Event-balance pass | `true` |
| Source-provenance pass | `true` |
| Hidden-retune pass | `true` |
| Negative controls passed | `5/5` |

Every required row in the attempt fixture is marked `attempt`, so the successful arithmetic diagnostics are not score evidence.

## Required Accepted Rows

The first score-review-eligible packet must replace the attempt rows with source-backed accepted rows for:

- `radiation_source_carrier`;
- `carrier_channel_family_row`;
- `source_mechanism_row`;
- `source_branch_row`;
- `noether_sea_magnetic_state_row`;
- `closure_residual_planar_mode_row`;
- `photon_output_gate_A_B_row`;
- `source_depletion_row`;
- `recoil_medium_wake_remnant_rows`;
- `power_spectrum_benchmark_row`;
- `cooling_row`;
- `polarization_angular_momentum_handoff_row`;
- `event_ledger_row`;
- `source_provenance`;
- `no_hidden_retune_witness`.

The first row is deliberately the parent `radiation_source_carrier`; without one accepted carrier, a passing power or frequency formula would only be a benchmark match, not an $\mathbb{A}\mathbb{A}\mathbb{A}$ source-ledger closure.

## Score Disposition

No `6/23 b` score changes follow from this pass.

| Row | Current `6/23 b` score | AN disposition |
| --- | --- | --- |
| `EQ-29` | `3` | Still below `4` because the synchrotron source ledger is populated only by attempt rows. |
| `EQ-12` | `3` | No change; photon Gate A/B handoff is a required consumer, not accepted evidence here. |
| `EQ-13` | `3` | No change; effective field recovery still waits on accepted charge/current, stress, gauge, and event-ledger rows. |
| `EQ-28` | `3` | No change; Compton/recoil remains a distinct event replay and must not be collapsed into synchrotron source emission. |

This runner is a success marker under the existing score-5 route. It turns the radiation row into an executable fail-closed object and protects the important distinction between the photon carrier/channel family and the source mechanism.

## Promotion Classification

Priority-only.

Promote now: no.

Defer with blocker: promotion waits for a retained radiation source ledger whose accepted evidence binds synchrotron source branch, Noether sea magnetic state, photon Gate A/B output, source depletion, recoil/medium/wake/remnant rows, event balance, source provenance, and no-hidden-retune witness on one carrier.

## Next Concrete Step

Populate one accepted `radiation_source_carrier` for a synchrotron source ledger. The minimum score-moving packet should begin with source-backed carrier, source mechanism, source branch, and Noether sea magnetic-state rows, then add source depletion, photon output, power/spectrum, cooling, polarization, event-balance, and no-hidden-retune rows on the same carrier.
