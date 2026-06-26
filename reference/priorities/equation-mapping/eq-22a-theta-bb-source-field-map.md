# EQ-22A Theta-BB Source-Field Map

## Workstream Metadata

- Kind: `priority`
- Parent: [EQ-12 Theta-Gamma Packet Source Shell](eq-12-theta-gamma-packet-source-shell.md)
- Source runner: [planck-alpha-braid-residual.mjs](../../../scripts/equation-mapping/planck-alpha-braid-residual.mjs)
- Source fixture: [planck-alpha-braid-attempt.v1.json](../../../scripts/equation-mapping/planck-alpha-braid-attempt.v1.json)
- Rows served: `EQ-22A`, with support from `EQ-12`, `EQ-12A`, `EQ-22`, and `EQ-25`
- Claim level: candidate source-field map and attack card
- Promotion status: priority-only

## Boundary

This map does not populate accepted retained evidence. It narrows the local `EQ-22A` child route under the shared `theta_gamma_packet` parent. The current parent blocker remains `missing_accepted_theta_gamma_packet`; after that parent is populated, the local child route begins with `thermal_mode_counting_row` inside a finite-window thermal photon carrier, $\Theta_{\mathrm{bb}}$.

No score changes.

## Equation Attack Card

| Coordinate | Current answer |
| --- | --- |
| Row | `EQ-22A` |
| Current score and closure driver | Score `2`; recover Planck blackbody law from shared mode counting, photon occupancy, zero photon chemical potential, and thermalization depth without per-bin temperature fitting. |
| Primary AAA carrier | $\Theta_{\mathrm{bb}}$: finite-window thermal photon carrier with thermal mode count, Planck occupancy, temperature-clock conversion, Gate B two-mode transversality, thermalization depth, shared $h_\vartheta$, $T_\theta$, $c_\gamma$, and $\theta_{\mathrm{sea}}$. |
| Smallest score-moving evidence object | One accepted source-backed `theta_bb` packet under accepted `theta_gamma_packet`, beginning with `thermal_mode_counting_row`, `planck_occupancy_row`, and `temperature_clock_conversion_row`. |
| Exact first blocker | Parent: `missing_accepted_theta_gamma_packet`; local child after parent: `missing_accepted_thermal_mode_counting_row`. |
| Existing scripts/fixtures/packets found | The Planck/alpha runner and fixture listed above; [EQ-25 Theta-Therm CMB Source-Field Map](eq-25-theta-therm-cmb-source-field-map.md); [EQ-21 Through EQ-23 And EQ-32 Shared Observation Residual Packet](eq-21-23-32-shared-observation-residual-packet.md). |
| Candidate breakthrough angle | Follow the local proof order: no conserved photon-number current, Gate B two-mode transversality, maximum entropy on the mode measure, then finite-window thermal closure. |
| Fail-closed negative control | `wrong_mode_count_dimension`: halving or otherwise changing the mode density must fail the blackbody residual before occupancy is accepted. |
| Smaller next action | Create a checker contract that names `theta_bb` and binds the three first child rows without marking them accepted. |

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

Until the parent and child rows are accepted, the correct result remains no score movement.
