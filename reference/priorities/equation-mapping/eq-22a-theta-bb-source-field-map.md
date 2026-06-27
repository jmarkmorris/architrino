# EQ-22A Theta-BB Source-Field Map

## Workstream Metadata

- Kind: `priority`
- Parent: [EQ-12 Theta-Gamma Packet Source Shell](eq-12-theta-gamma-packet-source-shell.md)
- Source runner: [planck-alpha-braid-residual.mjs](../../../scripts/equation-mapping/planck-alpha-braid-residual.mjs)
- Source fixture: [planck-alpha-braid-attempt.v1.json](../../../scripts/equation-mapping/planck-alpha-braid-attempt.v1.json)
- Source-attempt fixture: [planck-alpha-braid-theta-bb-source-attempt.v1.json](../../../scripts/equation-mapping/planck-alpha-braid-theta-bb-source-attempt.v1.json)
- Coordination-source negative control: [planck-alpha-braid-theta-gamma-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/planck-alpha-braid-theta-gamma-coordination-source-negative-control.v1.json)
- Rows served: `EQ-22A`, with support from `EQ-12`, `EQ-12A`, `EQ-22`, and `EQ-25`
- Claim level: candidate source-field map and attack card
- Promotion status: priority-only

## Boundary

This map does not populate accepted retained evidence. It narrows the local `EQ-22A` child route under the shared `theta_gamma_packet` parent. The current parent blocker remains `missing_accepted_theta_gamma_packet`; after that parent is populated, the local child route begins with `thermal_mode_counting_row` inside a finite-window thermal photon carrier, $\Theta_{\mathrm{bb}}$.

Findability note: blackbody ultraviolet catastrophe belongs here. Classical Rayleigh-Jeans high-frequency divergence is a fail-closed control for mode counting plus occupancy, and it is distinct from QFT ultraviolet divergence or renormalization.

No score changes.

## Equation Attack Card

| Coordinate | Current answer |
| --- | --- |
| Row | `EQ-22A` |
| Current score and closure driver | Score `2`; recover Planck blackbody law from shared mode counting, photon occupancy, zero photon chemical potential, and thermalization depth without per-bin temperature fitting. |
| Primary $\mathbb{A}\mathbb{A}\mathbb{A}$ carrier | $\Theta_{\mathrm{bb}}$: finite-window thermal photon carrier with thermal mode count, Planck occupancy, temperature-clock conversion, Gate B two-mode transversality, thermalization depth, shared $h_\vartheta$, $T_\theta$, $c_\gamma$, and $\theta_{\mathrm{sea}}$. |
| Smallest score-moving evidence object | One accepted source-backed `theta_bb` packet under accepted `theta_gamma_packet`, beginning with `thermal_mode_counting_row`, `planck_occupancy_row`, and `temperature_clock_conversion_row`. |
| Exact first blocker | Parent: `missing_accepted_theta_gamma_packet`; local child after parent: `missing_accepted_thermal_mode_counting_row`. |
| Existing scripts/fixtures/packets found | The Planck/alpha runner and fixture listed above; [EQ-25 Theta-Therm CMB Source-Field Map](eq-25-theta-therm-cmb-source-field-map.md); [EQ-21 Through EQ-23 And EQ-32 Shared Observation Residual Packet](eq-21-23-32-shared-observation-residual-packet.md). |
| Candidate breakthrough angle | Follow the local proof order: no conserved photon-number current, Gate B two-mode transversality, maximum entropy on the mode measure, then finite-window thermal closure. |
| Fail-closed negative control | `wrong_mode_count_dimension`: halving or otherwise changing the mode density must fail the blackbody residual before occupancy is accepted. |
| Smaller next action | The checker contract fixture already names `theta_bb` and binds the three first child rows without marking them accepted; the next smaller action is a durable mode-count source report after the parent `theta_gamma_packet` blocker is resolved. |

## Accepted-Object Contract

The smallest useful child object is:

$$
\Theta_{\mathrm{bb}}^{(W)}
=
\left(
\Theta_\gamma,
W,
\mathcal T_\gamma^{B},
\mathcal N_{\mathrm{mode}},
\bar n_\nu,
T_\theta,
h_\vartheta,
c_\gamma,
\theta_{\mathrm{sea}},
\mathcal D_{\mathrm{therm}},
\mathcal S_{\mathrm{retune}}
\right).
$$

Required rows:

| Row | Minimum source-field content |
| --- | --- |
| `thermal_mode_counting_row` | Finite window $W$, Gate B transverse mode count, two-mode transversality, no longitudinal leakage, and durable source path. |
| `planck_occupancy_row` | $\bar n_\nu=(e^{h_\vartheta\nu/k_BT_\theta}-1)^{-1}$ from the same mode measure and temperature-clock row. |
| `temperature_clock_conversion_row` | Source-backed relation between $T_\theta$, local clock/cadence, Noether sea state, and thermalization depth. |
| `thermalization_depth` | Minimum depth or collision/detailed-balance evidence for the declared window. |
| `source_provenance`, `no_hidden_retune_witness` | Same $h_\vartheta$, $c_\gamma$, $\theta_{\mathrm{sea}}$, mode measure, and temperature-clock conversion across frequency bins. |

The source-attempt fixture names the first child surface without claiming accepted
evidence:

| Field | Source-attempt value |
| --- | --- |
| `commonCarrierId` | `theta_bb_source_attempt_0001` |
| `finiteWindowId` | `W_bb_source_attempt_0001` |
| `gateBModeCountId` | `gateB_two_mode_count_source_attempt_0001` |
| `thermalModeCountingRowId` | `thermal_mode_counting_row_theta_bb_source_attempt_row` |
| `planckOccupancyRowId` | `planck_occupancy_row_theta_bb_source_attempt_row` |
| `temperatureClockConversionRowId` | `temperature_clock_conversion_row_theta_bb_source_attempt_row` |
| `thermalizationDepthId` | `thermalization_depth_theta_bb_source_attempt_0001` |

Checker-contract finding: [planck-alpha-braid-theta-bb-source-attempt.v1.json](../../../scripts/equation-mapping/planck-alpha-braid-theta-bb-source-attempt.v1.json) already exercises this contract. The current run is score-neutral: it reports `status=blocked_missing_rows`, `nextBlocker=missing_accepted_theta_gamma_packet`, `scoreDecision=no_score_increase`, `blackbodyPass=true`, and `15/15` negative controls passing. The local child rows remain `attempt`, so no score movement follows from the blackbody arithmetic or the source-attempt shape.

## Direct Geometry Layer

This layer keeps the Planck blackbody row as a child of accepted photon/action support. It does not allow frequency-bin fitting, a private temperature clock, or an unbound mode count to stand in for $\Theta_{\mathrm{bb}}$.

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Fail-closed negative control | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| Photon parent packet and shared $h_\vartheta$ | Accepted photon/action support consumed by the finite-window thermal photon carrier. | `theta_gamma_packet`, `retained_orbit_reduction_row`, `geometry_derived_action_period_row` | $\Theta_\gamma$, $h_\vartheta$, $c_\gamma$, and the finite thermal window share one parent support chain. | Theta-gamma coordination/probe-source controls reject priority packets and probe JSON as retained photon evidence. | Accepted `theta_gamma_packet` plus retained action-period rows before any child blackbody score movement. |
| Gate B two-mode count and $\mathcal N_{\mathrm{mode}}$ | Transverse photon mode-count readout for the declared finite window. | `thermal_mode_counting_row`, `photon_packet_row`, `planck_braid_carrier` | Mode count, Gate B transversality, finite window, and photon packet use the same carrier id. | `wrong_mode_count_dimension` and `longitudinal_mode_leakage` reject wrong mode density or hidden modes. | Accepted `theta_bb` packet beginning with accepted thermal mode-counting and photon-packet rows. |
| $\bar n_\nu=(e^{h_\vartheta\nu/k_BT_\theta}-1)^{-1}$ | Planck occupancy readout from the same mode measure and temperature-clock conversion. | `planck_occupancy_row`, `temperature_clock_conversion_row`, `thermal_mode_counting_row` | Occupancy, temperature clock, frequency bins, mode count, and $h_\vartheta$ stay on one finite-window carrier. | `per_bin_temperature_fit` rejects a different temperature or action scale per frequency bin. | Accepted Planck occupancy row plus accepted temperature-clock conversion row. |
| Zero photon chemical potential and thermalization depth | Finite-window detailed-balance readout for photon number nonconservation and equilibration. | `temperature_clock_conversion_row`, `source_provenance`, `no_hidden_retune_witness` | Thermalization depth, temperature conversion, source provenance, and retune witness share one window and parent carrier. | `blackbody_without_thermalization` rejects Planck occupancy without adequate thermalization evidence. | Accepted thermalization/source-provenance rows with one no-hidden-retune witness. |
| $\mathcal S_{\mathrm{retune}}$ across frequency bins | Same-record witness that mode count, occupancy, $h_\vartheta$, $c_\gamma$, and $\theta_{\mathrm{sea}}$ are fixed. | `no_hidden_retune_witness`, `sea_state_fibration_row`, all child rows | All bins and rows cite the same carrier, finite window, source provenance, and Noether sea state. | Hidden-retune controls reject per-bin changes to mode density, temperature, $h_\vartheta$, or sea state. | A source-backed $\Theta_{\mathrm{bb}}^{(W)}$ packet whose child rows are accepted, same-window bound, and checker consumable. |

## Fail-Closed Controls

- `wrong_mode_count_dimension`: catches wrong transverse-mode density.
- `per_bin_temperature_fit`: catches fitting a different temperature per frequency bin.
- `blackbody_without_thermalization`: catches Planck occupancy without adequate thermalization depth.
- `longitudinal_mode_leakage`: catches extra photon modes hidden in the mode count.

## Next Action

Create one durable `theta_bb` source report with the three first child rows, then run:

```sh
node scripts/equation-mapping/planck-alpha-braid-residual.mjs --summary --pretty
```

To check the current source-attempt fixture, run:

```sh
node scripts/equation-mapping/planck-alpha-braid-residual.mjs --input scripts/equation-mapping/planck-alpha-braid-theta-bb-source-attempt.v1.json --summary --pretty
```

Expected result: `blocked_missing_rows`, `nextBlocker=missing_accepted_theta_gamma_packet`,
`scoreDecision=no_score_increase`, `blackbodyPass=true`, and all 15 negative controls
passing. The same command with `--require-populated` must exit nonzero. Until the
parent and child rows are accepted, the correct result remains no score movement.

The shared Planck/alpha runner now rejects priority packets, authored AAA prose,
generated files, attempt files, toy files, probe files, source-evidence-probe
files, mock files, negative-control files, and temporary paths as accepted
retained evidence. The coordination-source control marks `theta_gamma_packet`
accepted-looking while sourcing it only to the theta-gamma priority packet; it
must remain blocked at `missing_accepted_theta_gamma_packet` with the row reason
`source_not_durable`. The probe-source control
[planck-alpha-braid-theta-gamma-probe-source-negative-control.v1.json](../../../scripts/equation-mapping/planck-alpha-braid-theta-gamma-probe-source-negative-control.v1.json)
points the same accepted-looking parent at a `source-evidence-probe` JSON and
must fail the same way. Probe files can sharpen blockers, but they cannot be the
retained source object for $\Theta_\gamma$.
