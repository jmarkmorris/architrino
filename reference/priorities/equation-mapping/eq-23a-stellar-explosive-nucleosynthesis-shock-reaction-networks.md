# EQ-23A Stellar Explosive Nucleosynthesis And Shock-Driven Reaction Networks

## Workstream Metadata

- Kind: `priority-packet`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](priorities.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Source-audit basis: the consolidated high-energy survey separated stellar explosive nucleosynthesis into `EQ-23A` while leaving it unscored and priority-only until one explosive source window binds shock, heating, yield, photon, remnant, event-ledger, provenance, and no-hidden-retune rows.
- Parent packet: [EQ-21 Through EQ-23 And EQ-32 Shared Observation Residual Packet](eq-21-23-32-shared-observation-residual-packet.md)
- Source fixture: [eq23a-explosive-source-window-identity-attempt.v1.json](../../../scripts/equation-mapping/eq23a-explosive-source-window-identity-attempt.v1.json)
- Assigned ID: `EQ-23A`
- Related corpus material: [BBN Constraints](../../../content/markdown/aaa/cosmology/BBN-constraints.md), [Radiation](../../../content/markdown/aaa/reactions/radiation.md), [Black Holes](../../../content/markdown/aaa/spacetime/black-holes.md)
- Claim level: observer-level explosive source-window benchmark, native carrier dictionary, and fail-closed residual target
- Promotion status: priority-only
- Current score: unscored; not yet integrated into the main score table

## Purpose

`EQ-23A` splits stellar explosive nucleosynthesis and shock-driven reaction networks out of the broader `EQ-23` BBN/freezeout row. The row asks whether one declared explosive source window can bind:

- shock jump and blast propagation;
- neutrino heating;
- reaction-network yields and NSE-like abundance constraints;
- radioactive decay heating;
- photon output and diffusion/heating balance;
- remnant and medium heating;
- event-ledger balance;
- and a no-hidden-retune witness across all of those rows.

The row should not become a supernova taxonomy. Type Ia, core-collapse, nova, kilonova, and related event classes are later benchmark labels. The first object is one carrier and one residual family.

## Standard Benchmarks

The grounded comparison families are:

- Rankine-Hugoniot shock jump rows;
- Sedov-Taylor blast scaling;
- thermonuclear runaway energy balance;
- neutrino heating;
- radioactive decay heating;
- Arnett-style peak balance as a loose diffusion/heating benchmark, not ontology;
- NSE chemical-potential constraints;
- reaction-network ODEs and arrested yield rows.

The source audit gives the blast benchmark as

$$
R_s\propto\left(\frac{Et^2}{\rho_0}\right)^{1/5}.
$$

The local BBN material supplies the source-window discipline: reaction outputs must be carried by the same thermal, photon-loading, neutrino, matter-asymmetry, and Noether sea record, not repaired by one-channel retuning.

## Native Carrier Dictionary

For a source domain $\Omega$, explosive source window $W_{\mathrm{expl}}$, and readout interval $T$, define the first `EQ-23A` carrier as

$$
\Theta_{\mathrm{expl}}(\Omega,W_{\mathrm{expl}},T)
=
\left(
\Theta_{\mathrm{src}},
\Theta_{\mathrm{therm/prov}},
\mathcal L_{E\mathbf p\mathbf J},
\mathcal N_{\mathrm{sea}},
\mathcal R_{\mathrm{expl}}
\right),
$$

with carrier fields:

| Field | Role in `EQ-23A` | Required native attachment |
| --- | --- | --- |
| `carrierId` | Concrete carrier identity. | Shared by every row and witness. |
| `sourceWindowId` | Declared explosive source window. | Distinguishes the retained source window from later event-class labels. |
| `supportId` | Retained support or finite-window support. | Source-backed and common across shock, reaction, radiation, and remnant rows. |
| `parentRows` | Parent equation rows. | `EQ-23`, `EQ-24`, `EQ-25`, `EQ-29`, and `EQ-31` as consumers or sources of row grammar. |
| `shock_jump_blast_row` | Shock jump, shock speed/radius, and blast propagation. | Same source window as the yields and energy ledger. |
| `neutrino_heating_row` | Neutrino luminosity/spectrum/heating contribution. | Same thermal/provenance carrier as reaction and remnant rows. |
| `reaction_yield_row` | NSE/reaction-network abundance output and $Y_e$. | Same reaction ledger as source provenance and photon output. |
| `radioactive_heating_row` | Radioactive inventory and decay heating. | Same yield/remnant record; not a light-curve-only fit. |
| `photon_output_row` | Photon diffusion, luminosity, and spectral output. | Same event ledger as shock and radioactive heating. |
| `remnant_medium_heating_row` | Remnant, ejecta, and surrounding Noether sea/medium update. | Same $\mathcal L_{E\mathbf p\mathbf J}$ balance. |
| `event_ledger_row` | Energy, momentum, angular momentum, medium, and remnant balance. | Shared finite-window ledger. |
| `source_provenance` | Source-window provenance. | Durable path from initial source state to yield/readout rows. |
| `no_hidden_retune_witness` | No private state for shock, yield, radioactive, photon, or remnant rows. | Must vanish before residual comparison is evidence. |

The first score-relevant object is an accepted `explosive_source_window_carrier`. No existing checker or fixture supplies it.

The first checker-consumable identity shell is [eq23a-explosive-source-window-identity-attempt.v1.json](../../../scripts/equation-mapping/eq23a-explosive-source-window-identity-attempt.v1.json). It does not compute residuals and does not populate retained evidence. Its purpose is to freeze the shared `carrierId`, `thetaSrcId`, `thetaThermProvId`, `sourceWindowId`, `supportId`, `eventLedgerId`, Noether sea update id, readout interval id, and no-retune witness id that a future checker must require before scoring shock, yield, photon, remnant, or medium rows.

The score-neutral identity checker is [eq23a-explosive-source-window-identity-check.mjs](../../../scripts/equation-mapping/eq23a-explosive-source-window-identity-check.mjs):

```bash
node scripts/equation-mapping/eq23a-explosive-source-window-identity-check.mjs --summary --pretty
```

The current run returns `status: blocked_missing_rows`, `scoreDecision: no_score_increase`, `nextBlocker: missing_accepted_explosive_source_window_carrier`, and `residualArithmeticEvaluated: false`. Its embedded negative controls reject source-window splits, private neutrino thermal/provenance rows, radioactive-inventory ledger splits, private photon-output carriers, remnant/medium Noether sea update splits, and private retune witnesses before any shock, yield, radiation, remnant, or ledger arithmetic is evaluated.

## Direct Geometry Layer

This layer is priority-only and score-neutral. It maps the comparison equations to the native geometric readouts that must be present on one explosive source-window carrier before any shock, yield, photon, remnant, or medium residual can count as evidence.

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Fail-closed negative control | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| Rankine-Hugoniot shock jump rows | Finite-window discontinuity in density, velocity, pressure, and energy flux across the declared explosive source window. | `shock_jump_blast_row` on `explosive_source_window_carrier`. | Same `carrierId`, `sourceWindowId`, `supportId`, and `eventLedgerId` as yield, photon, remnant, and ledger rows. | `explosive.source_window_split`: shock/blast and yield rows use different `sourceWindowId` values and fail before residual scoring. | Source-backed accepted carrier plus accepted `shock_jump_blast_row` on the same source window. |
| Sedov-Taylor blast radius/speed scaling $R_s\propto(Et^2/\rho_0)^{1/5}$ | Readout of deposited event energy, ambient medium density, support radius, and readout interval on one finite source support. | `shock_jump_blast_row`, `event_ledger_row`, and `remnant_medium_heating_row`. | Same `supportId`, `readoutIntervalId`, `eventLedgerId`, and Noether sea update id. | Split blast support or omitted remnant/medium row blocks before the blast residual is compared. | Accepted carrier with source-backed blast-support, event-ledger, and medium-update rows. |
| Neutrino heating term | Thermal/provenance energy-transfer row that heats the shock or yield channel without private retuning. | `neutrino_heating_row` on `Theta_therm/prov`. | Same `thetaThermProvId`, `carrierId`, `sourceWindowId`, and `eventLedgerId` as reaction-yield and remnant rows. | `explosive.neutrino_private_heating`: neutrino row uses a private thermal/provenance carrier and fails at `thermal_provenance_split_before_residual_scoring`. | Source-backed accepted carrier plus accepted neutrino heating row bound to the shared thermal/provenance carrier. |
| NSE or reaction-network yield rows | Reaction provenance ledger for $Y_e$, temperature, density, species inventory, and arrested yields. | `reaction_yield_row` and `source_provenance`. | Same `thetaSrcId`, `thetaThermProvId`, `sourceWindowId`, `supportId`, and `eventLedgerId` as shock and photon rows. | `explosive.arnett_fit_without_yields`: photon or peak-balance rows fit while yield/inventory rows are absent. | Accepted carrier with source-backed yield and provenance rows on one reaction ledger. |
| Radioactive decay heating and Arnett-style peak balance | Inventory-to-heating readout that connects radioactive products to photon diffusion without turning the light curve into the carrier. | `radioactive_heating_row` and `photon_output_row`. | Same `carrierId`, `reaction_yield_row`, `remnant_medium_heating_row`, and `eventLedgerId`. | Arnett-style photon fit without radioactive inventory fails before residual scoring. | Accepted carrier with source-backed radioactive inventory and photon-output rows tied to the same yield/remnant record. |
| Photon output and diffusion/heating balance | Photon-channel output of the explosive event ledger, not a standalone luminosity fit. | `photon_output_row` plus downstream `EQ-29` radiation-source grammar. | Same `sourceWindowId`, `supportId`, `eventLedgerId`, and readout interval as shock, yield, and radioactive rows. | Photon output sourced to a separate carrier or source window fails as carrier/source-window split. | Accepted carrier with source-backed photon-output row and source provenance on the same explosive window. |
| Remnant, ejecta, and medium/Noether sea update | Finite event-ledger update for remnant state, ejecta, surrounding medium, and Noether sea response. | `remnant_medium_heating_row` with `noetherSeaUpdateId`. | Same `carrierId`, `supportId`, `eventLedgerId`, and Noether sea update id as the source identity. | `explosive.remnant_medium_missing`: yields and photon rows fit while remnant/medium update is absent. | Accepted carrier with source-backed remnant/medium row and Noether sea update id. |
| Energy, momentum, angular momentum, and hidden-retune checks | One finite-window $\mathcal L_{E\mathbf p\mathbf J}$ balance plus a no-hidden-retune witness across shock, heating, yield, photon, remnant, and medium rows. | `event_ledger_row` and `no_hidden_retune_witness`. | Same `eventLedgerId`, `retuneWitnessId`, `carrierId`, `sourceWindowId`, and `supportId` across every required row. | Probe/source-evidence-probe, source-contract, priority, authored prose, generated, attempt, mock, toy, temporary, or negative-control sources fail at `accepted_without_evidence_source`; record splits fail before residual arithmetic. | Source-backed accepted `explosive_source_window_carrier` with all required rows accepted and bound to the same source identity. |

## Explosive Source Residual

The residual target is

$$
\mathcal R_{\mathrm{expl}}
=
\mathcal R_{\mathrm{jump}}
+
\mathcal R_{\mathrm{blast}}
+
\mathcal R_{\nu\text{-}\mathrm{heat}}
+
\mathcal R_{\mathrm{rxn}}
+
\mathcal R_{\gamma/\mathrm{decay}}
+
\mathcal R_{\mathrm{rem/med}}
+
\mathcal R_{E\mathbf p\mathbf J}
+
\mathcal S_{\mathrm{retune}}.
$$

The components are:

| Residual | Required comparison |
| --- | --- |
| $\mathcal R_{\mathrm{jump}}$ | Shock jump rows preserve density, velocity, pressure, and energy relations on the declared source window. |
| $\mathcal R_{\mathrm{blast}}$ | Blast radius/speed and deposited energy use the same source support. |
| $\mathcal R_{\nu\text{-}\mathrm{heat}}$ | Neutrino heating is bound to the same thermal/provenance carrier as yields. |
| $\mathcal R_{\mathrm{rxn}}$ | Reaction-network or NSE-like yield rows share $Y_e$, temperature, density, and source history. |
| $\mathcal R_{\gamma/\mathrm{decay}}$ | Radioactive heating and photon output are tied to the same yield/remnant inventory. |
| $\mathcal R_{\mathrm{rem/med}}$ | Remnant and surrounding medium/Noether sea update are recorded rather than discarded. |
| $\mathcal R_{E\mathbf p\mathbf J}$ | Energy, momentum, angular momentum, and medium update close on one finite event ledger. |
| $\mathcal S_{\mathrm{retune}}$ | Hidden-retune witness across shock, heating, yield, photon, remnant, and medium rows. |

## First Blocker

The first blocker is:

```text
missing_accepted_explosive_source_window_carrier
```

The carrier must be accepted before any event-class benchmark, light-curve comparison, yield comparison, or shock model can count as equation-map evidence. A packet that fits shock propagation and yield rows using different `carrierId` or `sourceWindowId` values remains score-neutral.

The score-neutral identity shell is [eq23a-explosive-source-window-identity-attempt.v1.json](../../../scripts/equation-mapping/eq23a-explosive-source-window-identity-attempt.v1.json), and the checker is [eq23a-explosive-source-window-identity-check.mjs](../../../scripts/equation-mapping/eq23a-explosive-source-window-identity-check.mjs):

```bash
node scripts/equation-mapping/eq23a-explosive-source-window-identity-check.mjs --summary --pretty
```

The current run returns `status: blocked_missing_rows`, `scoreDecision: no_score_increase`, `nextBlocker: missing_accepted_explosive_source_window_carrier`, `residualArithmeticEvaluated: false`, and `6/6` negative controls passing.

The carrier-shell source-contract boundary is [eq23a-explosive-source-window-carrier-shell-source-contract.v1.json](../../../scripts/equation-mapping/eq23a-explosive-source-window-carrier-shell-source-contract.v1.json), with checker input [eq23a-explosive-source-window-carrier-shell-source-contract-attempt.v1.json](../../../scripts/equation-mapping/eq23a-explosive-source-window-carrier-shell-source-contract-attempt.v1.json):

```bash
node scripts/equation-mapping/eq23a-explosive-source-window-identity-check.mjs --input scripts/equation-mapping/eq23a-explosive-source-window-carrier-shell-source-contract-attempt.v1.json --summary --pretty
```

This boundary marks only the parent `explosive_source_window_carrier` accepted-looking against a source-contract file while every child row remains `attempt`. The hardened checker rejects the contract shell as non-evidence, so the expected result is `status: blocked_accepted_without_evidence_source`, `nextBlocker: accepted_without_evidence_source`, `sourceEvidenceAccepted: false`, `sourceEvidenceFailureCount: 1`, `scoreDecision: no_score_increase`, `residualArithmeticEvaluated: false`, and `6/6` negative controls passing. The same command with `--require-populated` must exit nonzero. This is a fail-closed boundary test, not accepted retained evidence.

The probe-source source-evidence guard is [eq23a-explosive-source-window-probe-source-negative-control.v1.json](../../../scripts/equation-mapping/eq23a-explosive-source-window-probe-source-negative-control.v1.json):

```bash
node scripts/equation-mapping/eq23a-explosive-source-window-identity-check.mjs --input scripts/equation-mapping/eq23a-explosive-source-window-probe-source-negative-control.v1.json --summary --pretty
```

This control marks the carrier and required rows accepted-looking while pointing their `sourcePath` values at a source-evidence-probe JSON. The checker now returns `status: blocked_accepted_without_evidence_source`, `nextBlocker: accepted_without_evidence_source`, and `residualArithmeticEvaluated: false`; the `--require-populated` form exits nonzero. Authored AAA prose, toy files, probe files, source-evidence-probe files, source-contract shells, generated files, temporary files, priority packets, attempts, mocks, and negative controls cannot satisfy accepted explosive-window evidence.

## Candidate Breakthrough Angle

Reuse the BBN source-window grammar, but narrow it to one explosive source window $W_{\mathrm{expl}}$. The reusable structure is:

$$
\Theta_{\mathrm{src}}
\quad
\Theta_{\mathrm{therm/prov}}
\quad
\mathcal L_{E\mathbf p\mathbf J}
\quad
\mathcal S_{\mathrm{retune}}.
$$

The new work is the explosive-window delta: shock jump/blast, neutrino heating, radioactive heating, reaction yield, photon output, and remnant/medium heating. This keeps the row from becoming a broad astrophysical taxonomy while preserving the cross-row carrier requirement that `EQ-23`, `EQ-24`, `EQ-25`, `EQ-29`, and `EQ-31` all need.

## Fail-Closed Negative Control

| Negative control | Required failure |
| --- | --- |
| `explosive.source_window_split` | Shock/blast and reaction-yield rows pass numerically, but use different `carrierId` or `sourceWindowId` values. The checker or packet must fail before residual scoring with `carrier_split` or a hidden-retune failure. |
| `explosive.arnett_fit_without_yields` | Arnett-style peak balance or photon output fits while radioactive inventory and reaction-yield rows are absent. |
| `explosive.neutrino_private_heating` | Neutrino heating repairs the shock or yield row using a private thermal/provenance carrier. |
| `explosive.remnant_medium_missing` | Photon output and yields fit while remnant and medium/Noether sea update rows are absent. |
| `explosive.probe_source_accepted_carrier` | Accepted-looking carrier and rows point only to a probe/source-evidence-probe fixture; the checker fails at `accepted_without_evidence_source`. |

The current identity shell implements the pre-residual subset of those controls as executable identity failures: `explosive.source_window_split`, `explosive.neutrino_private_heating`, `explosive.radioactive_inventory_split`, `explosive.photon_output_private_carrier`, `explosive.remnant_medium_update_split`, and `explosive.retune_witness_private`. They are score-neutral guardrails; they do not populate accepted retained evidence.

## Equation Attack Card

| Field | Current answer |
| --- | --- |
| Current score and closure driver | Unscored; prove or fail one explosive source-window residual before adding `EQ-23A` to the main score table. |
| Primary $\mathbb{A}\mathbb{A}\mathbb{A}$ carrier | $\Theta_{\mathrm{expl}}(\Omega,W_{\mathrm{expl}},T)$ consuming $\Theta_{\mathrm{src}}$, $\Theta_{\mathrm{therm/prov}}$, $\mathcal L_{E\mathbf p\mathbf J}$, and Noether sea update rows. |
| Smallest accepted evidence object | Accepted `explosive_source_window_carrier` with shock, neutrino, reaction-yield, radioactive, photon, remnant/medium, event-ledger, provenance, and no-retune rows. |
| Smallest next artifact | One source-backed explosive-window carrier report that binds `carrierId`, `sourceWindowId`, `supportId`, `thetaSrcId`, `thetaThermProvId`, `eventLedgerId`, `noetherSeaUpdateId`, and `retuneWitnessId` before any residual arithmetic is scored. |
| Exact first blocker | `missing_accepted_explosive_source_window_carrier`. |
| Existing scripts/fixtures/packets found | [eq23a-explosive-source-window-identity-attempt.v1.json](../../../scripts/equation-mapping/eq23a-explosive-source-window-identity-attempt.v1.json) is the score-neutral identity shell, and [eq23a-explosive-source-window-identity-check.mjs](../../../scripts/equation-mapping/eq23a-explosive-source-window-identity-check.mjs) enforces source-window and thermal/provenance identity before residual arithmetic; related consumers include shared-observation, thermodynamic-record, and radiation source-ledger runners. |
| Direct Geometry Layer | Present in this packet; it binds shock, blast, neutrino heating, reaction yields, radioactive heating, photon output, remnant/medium update, event ledger, and no-hidden-retune witness to one explosive source-window carrier. |
| Candidate breakthrough angle | Reuse BBN source-window grammar while adding only explosive-window deltas. |
| Fail-closed negative control | The identity shell embeds six pre-residual controls covering source-window split, private neutrino thermal/provenance, radioactive-inventory ledger split, private photon-output carrier, remnant/medium Noether sea update split, and private retune witness; accepted-looking rows sourced only to a probe/source-evidence-probe file fail at `accepted_without_evidence_source`. |
| Smaller next action | Replace the carrier-shell source contract with a real source-backed parent carrier, then populate the first child `shock_jump_blast_row` on the same `carrierId`, `sourceWindowId`, `supportId`, and `eventLedgerId`. |
| Current implementation target | The identity shell, six fail-closed identity controls, probe-source guard, and carrier-shell source-contract guard now exist. The next smaller action is a retained `shock_jump_blast_row` evidence object after a real parent-carrier source replaces the contract shell, not a broader shock/yield report. |

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

Defer with blocker: this packet names the carrier and residual target. It does not derive explosive nucleosynthesis or shock recovery, and it does not assign a score in the main equation table.
