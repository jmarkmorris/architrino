# EQ-21/EQ-22/EQ-23 Theta-Src Source-Field Map

## Workstream Metadata

- Kind: `priority`
- Parent: [EQ-21 Through EQ-23 And EQ-32 Shared-Observation Residual Packet](eq-21-23-32-shared-observation-residual-packet.md)
- Source runner: [shared-observation-residual.mjs](../../../scripts/equation-mapping/shared-observation-residual.mjs)
- Source fixtures:
  - [shared-observation-residual-attempt.v1.json](../../../scripts/equation-mapping/shared-observation-residual-attempt.v1.json)
  - [shared-observation-theta-src-source-attempt.v1.json](../../../scripts/equation-mapping/shared-observation-theta-src-source-attempt.v1.json)
- Accepted evidence: [shared-observation-provider-backed-consumer-evidence.v1.json](../../../scripts/equation-mapping/shared-observation-provider-backed-consumer-evidence.v1.json)
- Accepted input: [shared-observation-provider-backed-consumer-accepted.v1.json](../../../scripts/equation-mapping/shared-observation-provider-backed-consumer-accepted.v1.json)
- Rows served: `EQ-21`, `EQ-22`, and `EQ-23`
- Boundary row: `EQ-32`
- Claim level: candidate source-field map and attack card
- Promotion status: priority-only

## Boundary

This map now has accepted score-neutral shared-observation consumer evidence. The accepted route consumes the shared `EQ-11`/`EQ-20` residual, `theta_W`, output-projection evidence, and `theta_cos` handoff, then populates `BBN`, `CMB`, `growth`, and `RAR` projection-family rows without hidden shared-key retune. The first score-neutral `EQ-21` growth child consumes that parent and computes $f\sigma_8$ without private growth-key retune; the matter-power child consumes both the parent and the accepted growth child to compute a normalized $P(k,z)$ grid without private shared-key retune; the CMB-lensing child consumes the parent, accepted growth child, and accepted matter-power child to compute a normalized $C_L^{\phi\phi}$ grid without private shared-key retune; the shear/RSD child consumes the parent, accepted growth child, accepted matter-power child, and accepted CMB-lensing child to compute same-chain shear-band and RSD growth readouts without private shared-key retune; the halo/cluster child consumes the same chain plus the accepted shear/RSD child to check lensing/shear/RSD inversion back to the inherited $P(k,z)$ samples without private shared-key retune; the nonlinear child consumes the same chain plus the accepted halo/cluster child to compute a deterministic dimensionless-power nonlinear readout without private shared-key retune; the `EQ-32` galaxy-response child consumes the same parent plus the accepted `delta_a_star` output projection to compute RAR/BTFR, lensing-consistency, and high-acceleration recovery readouts without private shared-key retune. The attempt and source-contract routes remain useful guards: they still prove that priority packets, source contracts, authored prose, attempts, mocks, probes, and generic durable JSON do not satisfy shared-observation evidence.

No score changes.

## Equation Attack Cards

| Row | Current score | Primary carrier | Exact first blocker | Smallest accepted evidence route |
| --- | --- | --- | --- | --- |
| `EQ-21` | `3` | `Theta_obs` narrowed to `Theta_src + Theta_read + growth projection` | Accepted parent route: `nextBlocker=null`; accepted $f\sigma_8$ child route: `nextBlocker=null`; accepted matter-power child route: `nextBlocker=null`; accepted CMB-lensing child route: `nextBlocker=null`; accepted shear/RSD child route: `nextBlocker=null`; accepted halo/cluster child route: `nextBlocker=null`; accepted nonlinear child route: `nextBlocker=null`; attempt and contract routes still block at `missing_accepted_theta_obs` / `missing_accepted_theta_src`. | [shared-observation-provider-backed-consumer-evidence.v1.json](../../../scripts/equation-mapping/shared-observation-provider-backed-consumer-evidence.v1.json), with accepted `growth` projection and shared Noether sea/readout keys, [eq21-growth-transfer-child-evidence.v1.json](../../../scripts/equation-mapping/eq21-growth-transfer-child-evidence.v1.json) for the score-neutral $f\sigma_8$ child, [eq21-matter-power-transfer-child-evidence.v1.json](../../../scripts/equation-mapping/eq21-matter-power-transfer-child-evidence.v1.json) for the score-neutral normalized $P(k,z)$ child, [eq21-lensing-transfer-child-evidence.v1.json](../../../scripts/equation-mapping/eq21-lensing-transfer-child-evidence.v1.json) for the score-neutral normalized $C_L^{\phi\phi}$ child, [eq21-shear-rsd-transfer-child-evidence.v1.json](../../../scripts/equation-mapping/eq21-shear-rsd-transfer-child-evidence.v1.json) for the score-neutral shear/RSD child, [eq21-halo-cluster-transfer-child-evidence.v1.json](../../../scripts/equation-mapping/eq21-halo-cluster-transfer-child-evidence.v1.json) for the score-neutral halo/cluster child, and [eq21-nonlinear-transfer-child-evidence.v1.json](../../../scripts/equation-mapping/eq21-nonlinear-transfer-child-evidence.v1.json) for the score-neutral nonlinear child. |
| `EQ-22` | `3` | `Theta_src + Theta_therm/prov + Theta_read` | Accepted route: `nextBlocker=null`; child blockers remain for `theta_gamma_packet`, recombination/acoustic carrier, and `theta_therm`. | Accepted shared-observation evidence tying `eta`, `N_eff`, `Y_p`, `H_eff`, `a_eff`, CMB projection, and BBN/growth/RAR shared keys to the same provider-backed record. |
| `EQ-23` | `3` | `Theta_src` plus `Theta_therm/prov` | Accepted route: `nextBlocker=null`; predictive BBN source-window mechanism remains open. | Accepted `BBN` projection row and shared `eta`, `N_eff`, `Y_p`, `H_eff`, and `a_eff` keys under the shared-observation evidence object. |
| `EQ-32` | `3` | `Theta_gal` inside `Theta_obs`, with upstream `theta_sea_rho_NS` and `delta_a_star` now accepted | Accepted shared-observation route: `nextBlocker=null`; accepted galaxy-response child route: `nextBlocker=null`; score-review compatibility remains open. | Accepted output projection for `delta_a_star` plus accepted `RAR` projection row under the shared-observation evidence object, consumed by [eq32-galaxy-response-child-evidence.v1.json](../../../scripts/equation-mapping/eq32-galaxy-response-child-evidence.v1.json). |

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

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Negative control required for advancement | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| Source-window identity for BBN, CMB, growth, and RAR rows | $\Theta_{\mathrm{src}}(W_{\mathrm{src}})$ as one finite source-window readout, not four fitted observation summaries | `theta_src`, with parent `theta_obs` now accepted in the provider-backed consumer route | One `W_src`, event-ledger id, source-window id, and no-hidden-retune witness across BBN, CMB, growth, and RAR projections | `cosmology.source_window_split` | [shared-observation-provider-backed-consumer-evidence.v1.json](../../../scripts/equation-mapping/shared-observation-provider-backed-consumer-evidence.v1.json), with accepted `theta_obs`, `theta_src`, readout, thermal/provenance, galaxy, event-ledger, and no-hidden-retune rows. |
| BBN source terms: $T_\theta(t)$, $\rho_\theta(t)$, $\eta$, $N_{\text{eff}}$, and $Y_p$ | Thermal/source-window ledger values produced inside `Theta_src`, then consumed by the BBN projection | `theta_src` plus `thermal_provenance_ledger` and the `BBN` projection row | Same `W_src`, thermal-provenance id, and event ledger as the CMB photon-loading route | `cosmology.blackbody_yield_split` | Accepted `BBN` projection and shared-key rows under the provider-backed shared-observation evidence object; predictive BBN child rows remain downstream. |
| CMB photon loading, blackbody, and recombination/acoustic inputs | Photon-channel and thermal-depth readouts exported from `Theta_src` to `theta_gamma_packet`, `theta_bb`, and `Theta_rec/ac` | `theta_gamma_packet`, `theta_bb`, `Theta_rec/ac`, and `theta_therm_CMB` child routes | Same thermal-provenance id, photon-loading id, neutrino handoff, and source-window id as the BBN row | `cosmology.blackbody_yield_split` | Accepted `CMB` projection and shared-key rows under the provider-backed shared-observation evidence object; photon, blackbody, recombination/acoustic, and `theta_therm` child carriers remain downstream. |
| Growth, lensing, shear/RSD, halo/cluster, nonlinear, and BAO transfer terms | Shared medium-and-assembly readouts `rho_NS`, `n`, `chi_sea`, `Gamma_N`, `M_sea_ab`, `rho_bar`, `rho_A`, and `P_seed` consumed by one growth projection family | `theta_read`, `growth` projection row, shared-key rows, and `frw_handoff` | Same `Theta_src`, `Theta_read`, `H_eff`, `a_eff`, baryon row, architrino-loading row, and source-window id as the CMB/BBN rows | `cosmology.growth_transfer_split` | Accepted `growth` projection under the provider-backed shared-observation evidence object, accepted score-neutral $f\sigma_8$ child evidence, accepted score-neutral normalized $P(k,z)$ child evidence, accepted score-neutral normalized $C_L^{\phi\phi}$ child evidence, accepted score-neutral shear/RSD child evidence, accepted score-neutral halo/cluster child evidence, and accepted score-neutral nonlinear child evidence; BAO and score-review transfer remain downstream. |
| Low-acceleration galaxy response terms | Boundary readout `theta_gal` consumes `theta_sea_rho_NS` and `delta_a_star`; it cannot be imported from `Theta_src` alone | `theta_gal`, `theta_sea_rho_NS`, and `delta_a_star` | Same readout handoff and source-window provenance as the shared observation record, plus the accepted output-projection carrier | `cosmology.galaxy_response_leakage` | Accepted `delta_a_star` output projection plus accepted `RAR` projection under the provider-backed shared-observation evidence object, with accepted score-neutral galaxy-response child evidence in [eq32-galaxy-response-child-evidence.v1.json](../../../scripts/equation-mapping/eq32-galaxy-response-child-evidence.v1.json). |
| Source provenance and no-hidden-retune term | Retained-source witness `S_retune` proving BBN, CMB, growth, and galaxy routes did not choose separate source windows or private readout clocks | `no_hidden_retune_witness`, `event_ledger`, and all accepted shared-key rows | One source path class accepted by the checker, one event ledger, one `W_src`, and one transformation ledger across all rows | All four controls above, plus checker rejection of coordination, authored-prose, generated, attempt, mock, probe, and negative-control sources | Durable non-priority evidence source with explicit `theta_src` support metadata and same-record ids for every accepted shared-observation row. |

## Verification Required for Advancement Controls

| Control | Expected failure |
| --- | --- |
| `cosmology.source_window_split` | BBN, CMB, and growth rows use different `W_src` or event-ledger ids; the source row must fail before projection residuals count. |
| `cosmology.blackbody_yield_split` | Planck/blackbody support and BBN photon loading use incompatible source/thermal provenance; the CMB child handoff must fail. |
| `cosmology.growth_transfer_split` | Growth transfer uses a different `rho_bar`, `rho_A`, `P_seed`, or readout handoff than CMB/BBN; the growth projection must fail. |
| `cosmology.galaxy_response_leakage` | `EQ-32` attempts a galaxy response row without consuming the accepted `theta_sea_rho_NS`, `delta_a_star`, and shared-observation evidence; the galaxy route must fail instead of creating a private response ledger. |

## Next Action

Run the accepted route and keep the legacy source-attempt/source-contract guards:

```bash
node scripts/equation-mapping/shared-observation-residual.mjs --input scripts/equation-mapping/shared-observation-provider-backed-consumer-accepted.v1.json --summary --pretty --require-populated
node scripts/equation-mapping/shared-observation-residual.mjs --input scripts/equation-mapping/shared-observation-theta-src-source-attempt.v1.json --summary --pretty --focus-row theta_src
node scripts/equation-mapping/shared-observation-residual.mjs --input scripts/equation-mapping/shared-observation-theta-src-source-contract-attempt.v1.json --summary --pretty --focus-row theta_src
node scripts/equation-mapping/shared-observation-residual.mjs --input scripts/equation-mapping/shared-observation-theta-src-source-contract-attempt.v1.json --summary --pretty --focus-row theta_src --require-populated
```

A normal source-attempt run still reports `nextBlocker=missing_accepted_theta_obs`; running with `--focus-row theta_src` adds diagnostic-only `focusedBlockers.theta_src.nextBlocker=missing_accepted_theta_src` without changing summary blocker order, `scoreDecision`, required rows, or `--require-populated` behavior. The source-contract attempt also reports `nextBlocker=missing_accepted_theta_obs`, but its focused `theta_src` row returns `reason=source_contract_path` and `sourceEvidenceFailureCount=1`; the `--require-populated` form exits nonzero. This proves the contract shell names the accepted-object boundary without becoming accepted retained evidence.

The checker also now rejects accepted-looking rows, projection families, or shared keys whose source paths point only to priority packets, authored AAA prose, generated files, temporary files, source-contract shells, attempt fixtures, mocks, or negative-control fixtures. The existing priority-source control:

```bash
node scripts/equation-mapping/shared-observation-residual.mjs --input scripts/equation-mapping/shared-observation-priority-source-negative-control.v1.json --summary --pretty
```

stays score-neutral at `status=blocked_missing_rows`, `nextBlocker=missing_accepted_theta_obs`, and `sourceEvidenceFailureCount=26`.

The first growth child now runs through:

```bash
node scripts/equation-mapping/eq21-growth-transfer-child-residual.mjs --input scripts/equation-mapping/eq21-growth-transfer-child-accepted.v1.json --summary --pretty --require-populated
```

It reports `status=populated`, `nextBlocker=null`, `scoreDecision=no_score_increase`, and $f\sigma_8=0.4165634684945517$.

The matter-power child now runs through:

```bash
node scripts/equation-mapping/eq21-matter-power-transfer-child-residual.mjs --input scripts/equation-mapping/eq21-matter-power-transfer-child-accepted.v1.json --summary --pretty --require-populated
```

It reports `status=populated`, `nextBlocker=null`, `scoreDecision=no_score_increase`, `parentGrowthTransferAccepted=true`, `sampleCount=6`, and `matterPowerGridNormalizedResidual=0`.

The CMB-lensing child now runs through:

```bash
node scripts/equation-mapping/eq21-lensing-transfer-child-residual.mjs --input scripts/equation-mapping/eq21-lensing-transfer-child-accepted.v1.json --summary --pretty --require-populated
```

It reports `status=populated`, `nextBlocker=null`, `scoreDecision=no_score_increase`, `parentGrowthTransferAccepted=true`, `parentMatterPowerTransferAccepted=true`, `sampleCount=3`, and `cmbLensingGridNormalizedResidual=0`.

The shear/RSD child now runs through:

```bash
node scripts/equation-mapping/eq21-shear-rsd-transfer-child-residual.mjs --input scripts/equation-mapping/eq21-shear-rsd-transfer-child-accepted.v1.json --summary --pretty --require-populated
```

It reports `status=populated`, `nextBlocker=null`, `scoreDecision=no_score_increase`, `parentGrowthTransferAccepted=true`, `parentMatterPowerTransferAccepted=true`, `parentLensingTransferAccepted=true`, `sampleCount=3`, and `shearRsdGridNormalizedResidual=0`.

The halo/cluster child now runs through:

```bash
node scripts/equation-mapping/eq21-halo-cluster-transfer-child-residual.mjs --input scripts/equation-mapping/eq21-halo-cluster-transfer-child-accepted.v1.json --summary --pretty --require-populated
```

It reports `status=populated`, `nextBlocker=null`, `scoreDecision=no_score_increase`, `parentGrowthTransferAccepted=true`, `parentMatterPowerTransferAccepted=true`, `parentLensingTransferAccepted=true`, `parentShearRsdTransferAccepted=true`, `sampleCount=3`, and `haloClusterGridNormalizedResidual=3.0204931705456123e-16`.

The nonlinear child now runs through:

```bash
node scripts/equation-mapping/eq21-nonlinear-transfer-child-residual.mjs --input scripts/equation-mapping/eq21-nonlinear-transfer-child-accepted.v1.json --summary --pretty --require-populated
```

It reports `status=populated`, `nextBlocker=null`, `scoreDecision=no_score_increase`, `parentGrowthTransferAccepted=true`, `parentMatterPowerTransferAccepted=true`, `parentLensingTransferAccepted=true`, `parentShearRsdTransferAccepted=true`, `parentHaloClusterTransferAccepted=true`, `sampleCount=3`, and `nonlinearGridNormalizedResidual=3.0204931705456123e-16`.

The next mathematical additions are BAO or score-review observational growth transfer, CMB transfer or blackbody/acoustic child carriers, BBN source-window mechanism, and galaxy-response law. They must consume the accepted shared-observation evidence instead of replacing it.
