# EQ-21/EQ-22/EQ-23 Theta-Src Source-Field Map

## Workstream Metadata

- Kind: `priority`
- Parent: [EQ-21 Through EQ-23 And EQ-32 Shared-Observation Residual Packet](eq-21-23-32-shared-observation-residual-packet.md)
- Source runner: [shared-observation-residual.mjs](../../../scripts/equation-mapping/shared-observation-residual.mjs)
- Source fixtures:
  - [shared-observation-residual-attempt.v1.json](../../../scripts/equation-mapping/shared-observation-residual-attempt.v1.json)
  - [shared-observation-theta-src-source-attempt.v1.json](../../../scripts/equation-mapping/shared-observation-theta-src-source-attempt.v1.json)
- Rows served: `EQ-21`, `EQ-22`, and `EQ-23`
- Boundary row: `EQ-32`
- Claim level: candidate source-field map and attack card
- Promotion status: priority-only

## Boundary

This map narrows the shared-observation first blocker from the umbrella `missing_accepted_theta_obs` toward the source-window row already present in the checker, `theta_src`. It does not populate accepted retained evidence. It also does not let `EQ-32` ride the same route: low-acceleration galaxy response remains upstream of `missing_accepted_theta_sea_rho_NS` and a declared `delta_a_star` projection.

No score changes.

## Equation Attack Cards

| Row | Current score | Primary carrier | Exact first blocker | Smallest accepted evidence route |
| --- | --- | --- | --- | --- |
| `EQ-21` | `3` | `Theta_obs` narrowed to `Theta_src + Theta_read + growth projection` | Summary blocker `missing_accepted_theta_obs`; diagnostic-only focused blocker `missing_accepted_theta_src` | Accepted `Theta_src` row with `W_src`, `rho_bar`, `rho_A`, `N_sea(W_src)`, `P_seed`, and shared readout keys consumed by growth, lensing, shear/RSD, and BAO rows. |
| `EQ-22` | `3` | `Theta_src + Theta_therm/prov + Theta_read` | `missing_accepted_theta_obs`, with child blockers at `missing_accepted_theta_gamma_packet`, `missing_accepted_recombination_acoustic_carrier`, and `missing_accepted_theta_therm` | Accepted CMB source handoff row tying `eta`, `N_eff`, `Y_p`, photon loading, thermal depth, neutrino energy, and event provenance to the same `W_src`. |
| `EQ-23` | `3` | `Theta_src` plus `Theta_therm/prov` | Summary blocker `missing_accepted_theta_obs`; diagnostic-only focused blocker `missing_accepted_theta_src` | Accepted BBN/source-window ledger with `T_theta(t)`, `rho_theta(t)`, `eta_theta`, `N_eff_theta`, `Y_BBN_theta`, source event rows, and thermal provenance. |
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

## Direct Geometry Layer

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Fail-closed negative control | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| Source-window identity for BBN, CMB, growth, and RAR rows | $\Theta_{\mathrm{src}}(W_{\mathrm{src}})$ as one finite source-window readout, not four fitted observation summaries | `theta_src`, with parent `theta_obs` still blocked until the other retained rows are accepted | One `W_src`, event-ledger id, source-window id, and no-hidden-retune witness across BBN, CMB, growth, and RAR projections | `cosmology.source_window_split` | Accepted `theta_src` row with durable source support for `W_src`, event ledger, Noether sea keys, baryon/architrino loading, photon loading, neutrino handoff, and readout references. |
| BBN source terms: $T_\theta(t)$, $\rho_\theta(t)$, $\eta$, $N_{\text{eff}}$, and $Y_p$ | Thermal/source-window ledger values produced inside `Theta_src`, then consumed by the BBN projection | `theta_src` plus `thermal_provenance_ledger` and the `BBN` projection row | Same `W_src`, thermal-provenance id, and event ledger as the CMB photon-loading route | `cosmology.blackbody_yield_split` | Source-backed BBN handoff row whose keys remain unchanged when CMB and recombination/acoustic consumers read them. |
| CMB photon loading, blackbody, and recombination/acoustic inputs | Photon-channel and thermal-depth readouts exported from `Theta_src` to `theta_gamma_packet`, `theta_bb`, and `Theta_rec/ac` | `theta_gamma_packet`, `theta_bb`, `Theta_rec/ac`, and `theta_therm_CMB` child routes | Same thermal-provenance id, photon-loading id, neutrino handoff, and source-window id as the BBN row | `cosmology.blackbody_yield_split` | Accepted CMB source handoff row tying photon loading, thermal depth, neutrino energy, and event provenance to one `W_src`. |
| Growth, lensing, shear/RSD, and BAO transfer terms | Shared medium-and-assembly readouts `rho_NS`, `n`, `chi_sea`, `Gamma_N`, `M_sea_ab`, `rho_bar`, `rho_A`, and `P_seed` consumed by one growth projection family | `theta_read`, `growth` projection row, shared-key rows, and `frw_handoff` | Same `Theta_src`, `Theta_read`, `H_eff`, `a_eff`, baryon row, architrino-loading row, and source-window id as the CMB/BBN rows | `cosmology.growth_transfer_split` | Accepted growth source row showing the projection consumes the same shared keys as BBN/CMB rather than private transfer parameters. |
| Low-acceleration galaxy response terms | Boundary readout `theta_gal` remains downstream of `theta_sea_rho_NS` and `delta_a_star`; it cannot be imported from `Theta_src` alone | `theta_gal`, `theta_sea_rho_NS`, and `delta_a_star` | Same readout handoff and source-window provenance as the shared observation record, plus a separate accepted galaxy-response carrier | `cosmology.galaxy_response_leakage` | Source-backed `theta_sea_rho_NS` density-compression bundle plus an actual `delta_a_star` projection before any `EQ-32` row is accepted. |
| Source provenance and no-hidden-retune term | Retained-source witness `S_retune` proving BBN, CMB, growth, and galaxy routes did not choose separate source windows or private readout clocks | `no_hidden_retune_witness`, `event_ledger`, and all accepted shared-key rows | One source path class accepted by the checker, one event ledger, one `W_src`, and one transformation ledger across all rows | All four controls above, plus checker rejection of coordination, authored-prose, generated, attempt, mock, probe, and negative-control sources | Durable non-priority evidence source with explicit `theta_src` support metadata and same-record ids for every accepted shared-observation row. |

## Fail-Closed Controls

| Control | Expected failure |
| --- | --- |
| `cosmology.source_window_split` | BBN, CMB, and growth rows use different `W_src` or event-ledger ids; the source row must fail before projection residuals count. |
| `cosmology.blackbody_yield_split` | Planck/blackbody support and BBN photon loading use incompatible source/thermal provenance; the CMB child handoff must fail. |
| `cosmology.growth_transfer_split` | Growth transfer uses a different `rho_bar`, `rho_A`, `P_seed`, or readout handoff than CMB/BBN; the growth projection must fail. |
| `cosmology.galaxy_response_leakage` | `EQ-32` attempts a galaxy response row without accepted `theta_sea_rho_NS` and `delta_a_star`; the galaxy route remains blocked upstream. |

## Next Action

Use the existing source-attempt fixture as the checker-consumable `Theta_src` scaffold. The score-neutral source-contract boundary is now [shared-observation-theta-src-source-contract.v1.json](../../../scripts/equation-mapping/shared-observation-theta-src-source-contract.v1.json), exercised by [shared-observation-theta-src-source-contract-attempt.v1.json](../../../scripts/equation-mapping/shared-observation-theta-src-source-contract-attempt.v1.json). The attempt marks only `theta_src` accepted-looking with `sourceObjectKind: "theta_src"`, `sourceSupport: ["EQ-21", "EQ-22", "EQ-23", "Theta_src"]`, `sourceWindowId`, `eventLedgerId`, `thetaSrcId`, and `noHiddenRetuneWitnessId`; `theta_obs`, projection families, shared keys, and child rows stay `attempt`.

```bash
node scripts/equation-mapping/shared-observation-residual.mjs --input scripts/equation-mapping/shared-observation-theta-src-source-attempt.v1.json --summary --pretty --focus-row theta_src
node scripts/equation-mapping/shared-observation-residual.mjs --input scripts/equation-mapping/shared-observation-theta-src-source-contract-attempt.v1.json --summary --pretty --focus-row theta_src
node scripts/equation-mapping/shared-observation-residual.mjs --input scripts/equation-mapping/shared-observation-theta-src-source-contract-attempt.v1.json --summary --pretty --focus-row theta_src --require-populated
```

A normal source-attempt run still reports `nextBlocker=missing_accepted_theta_obs`; running with `--focus-row theta_src` adds diagnostic-only `focusedBlockers.theta_src.nextBlocker=missing_accepted_theta_src` without changing summary blocker order, `scoreDecision`, required rows, or `--require-populated` behavior. The source-contract attempt also reports `nextBlocker=missing_accepted_theta_obs`, but its focused `theta_src` row returns `reason=source_contract_path` and `sourceEvidenceFailureCount=1`; the `--require-populated` form exits nonzero. This proves the contract shell names the accepted-object boundary without becoming accepted retained evidence.

The checker also now rejects accepted-looking rows, projection families, or shared keys whose source paths point only to priority packets, authored AAA prose, generated files, temporary files, source-contract shells, attempt fixtures, mocks, or negative-control fixtures. The existing priority-source control:

```bash
node scripts/equation-mapping/shared-observation-residual.mjs --input scripts/equation-mapping/shared-observation-priority-source-negative-control.v1.json --summary --pretty
```

stays score-neutral at `status=blocked_missing_rows`, `nextBlocker=missing_accepted_theta_obs`, and `sourceEvidenceFailureCount=26` before any shared-observation packet can populate.
