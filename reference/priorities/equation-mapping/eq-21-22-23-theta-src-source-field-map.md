# EQ-21/EQ-22/EQ-23 Theta-Src Source-Field Map

## Workstream Metadata

- Kind: `priority`
- Parent: [EQ-21 Through EQ-23 And EQ-32 Shared-Observation Residual Packet](eq-21-23-32-shared-observation-residual-packet.md)
- Source runner: [shared-observation-residual.mjs](../../../scripts/equation-mapping/shared-observation-residual.mjs)
- Source fixture: [shared-observation-residual-attempt.v1.json](../../../scripts/equation-mapping/shared-observation-residual-attempt.v1.json)
- Rows served: `EQ-21`, `EQ-22`, and `EQ-23`
- Boundary row: `EQ-32`
- Claim level: candidate source-field map and attack card
- Promotion status: priority-only

## Boundary

This map narrows the shared-observation first blocker from the umbrella `missing_accepted_theta_obs` toward the source-window row already present in the checker, `theta_src`. It does not populate accepted retained evidence. It also does not let `EQ-32` ride the same route: low-acceleration galaxy response remains upstream of `missing_accepted_theta_sea_rho_NS` and a declared `delta_a_star` projection.

No score changes.

## Equation Attack Cards

| Row | Current score | Primary carrier | Exact first blocker | Smallest blocker-moving object |
| --- | --- | --- | --- | --- |
| `EQ-21` | `3` | `Theta_obs` narrowed to `Theta_src + Theta_read + growth projection` | `missing_accepted_theta_obs`; proposed sharper source blocker `missing_accepted_theta_src` | Accepted `Theta_src` row with `W_src`, `rho_bar`, `rho_A`, `N_sea(W_src)`, `P_seed`, and shared readout keys consumed by growth, lensing, shear/RSD, and BAO rows. |
| `EQ-22` | `3` | `Theta_src + Theta_therm/prov + Theta_read` | `missing_accepted_theta_obs`, with child blockers at `missing_accepted_theta_gamma_packet`, `missing_accepted_recombination_acoustic_carrier`, and `missing_accepted_theta_therm` | Accepted CMB source handoff row tying `eta`, `N_eff`, `Y_p`, photon loading, thermal depth, neutrino energy, and event provenance to the same `W_src`. |
| `EQ-23` | `3` | `Theta_src` plus `Theta_therm/prov` | `missing_accepted_theta_obs`; proposed sharper source blocker `missing_accepted_theta_src` | Accepted BBN/source-window ledger with `T_theta(t)`, `rho_theta(t)`, `eta_theta`, `N_eff_theta`, `Y_BBN_theta`, source event rows, and thermal provenance. |
| `EQ-32` | `3` | `Theta_gal` inside `Theta_obs`, but upstream first carrier is `theta_sea_rho_NS` | `missing_accepted_theta_obs` in the shared checker; sharper physical blockers are `missing_accepted_theta_sea_rho_NS` and `delta_a_star` | Source-backed `theta_sea_rho_NS` same-window density-compression bundle plus an actual `delta_a_star` projection before any private galaxy readout row is accepted. |

## Source-Window Contract

Use the current fixture key unless a later source map globally renames it:

```text
theta_src.id: Theta_src_attempt_0001
theta_obs.id: Theta_obs_attempt_0001
```

The accepted `Theta_src` row must be one source-window record with:

- concrete `id`, `sourcePath`, and event/source-window provenance;
- `W_src` support and source-window boundaries;
- `N_sea(W_src)` with `rho_NS`, `n`, `chi_sea`, `Gamma_N`, `u_sea`, and `M_sea_ab` keys;
- baryonic and neutral-assembly loading rows, `rho_bar` and `rho_A`;
- BBN/source rows `T_theta(t)`, `rho_theta(t)`, `eta_theta`, `N_eff_theta`, and `Y_BBN_theta`;
- photon loading and neutrino handoff keys consumed unchanged by CMB and recombination/acoustic rows;
- shared readout keys `H_eff` and `a_eff` imported from the `theta_cos`/FRW handoff only after that handoff is accepted;
- event ledger reference shared by source, photon, weak, baryon, neutrino, and medium exchange rows;
- no-hidden-retune witness that rejects source-window, readout, BBN, CMB, growth, or galaxy splits.

## Child-Carrier Handoffs

| Child route | Required relationship to `Theta_src` |
| --- | --- |
| `theta_therm_CMB` | Consumes `W_src`, thermal provenance, photon loading, source-to-decoupling ledger ids, and shared Noether sea keys without replacing `Theta_src`. |
| `Theta_rec/ac` | Consumes BBN handoff, thermal/provenance, photon/neutrino handoff, readout, and event-ledger slots on one recombination/acoustic carrier. |
| `theta_bb` | Consumes the thermal photon source and mode-counting support after `theta_gamma_packet` exists; it is not the parent source row. |
| `theta_gamma_packet` | Supplies photon packet support for blackbody and recombination consumers; it does not substitute for source-window BBN/CMB provenance. |
| `theta_cos` | Supplies accepted readout handoff rows; it does not let `Theta_src` fit its own `H_eff` or `a_eff`. |

## Fail-Closed Controls

| Control | Expected failure |
| --- | --- |
| `cosmology.source_window_split` | BBN, CMB, and growth rows use different `W_src` or event-ledger ids; the source row must fail before projection residuals count. |
| `cosmology.blackbody_yield_split` | Planck/blackbody support and BBN photon loading use incompatible source/thermal provenance; the CMB child handoff must fail. |
| `cosmology.growth_transfer_split` | Growth transfer uses a different `rho_bar`, `rho_A`, `P_seed`, or readout handoff than CMB/BBN; the growth projection must fail. |
| `cosmology.galaxy_response_leakage` | `EQ-32` attempts a galaxy response row without accepted `theta_sea_rho_NS` and `delta_a_star`; the galaxy route remains blocked upstream. |

## Next Action

Add a checker-consumable `Theta_src` source attempt only after choosing one finite `W_src` candidate and the exact BBN-to-CMB handoff keys it preserves. Until then, the correct checker result remains `missing_accepted_theta_obs`; this map only names the smaller source-window object to pursue next.
