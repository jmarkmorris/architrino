# EQ-07B Black-Hole Accretion, Jet Release, And Horizon Thermodynamics

## Workstream Metadata

- Kind: `priority-packet`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Source audit: [Equation Closure Pass 2026-06-25 B](equation-closure-pass-2026-06-25-b.md)
- Parent packet: [EQ-07 Through EQ-10 And EQ-17 Through EQ-19 Effective Metric / Cosmology Packet](eq-07-10-17-19-effective-metric-cosmology-packet.md)
- Source fixture: [eq07b-agn-accretion-release-carrier-source-attempt.v1.json](../../../scripts/equation-mapping/eq07b-agn-accretion-release-carrier-source-attempt.v1.json)
- Assigned ID: `EQ-07B`
- Related corpus material: [Black Holes](../../../content/markdown/aaa/spacetime/black-holes.md), [Dark Energy](../../../content/markdown/aaa/cosmology/dark-energy.md), [Radiation](../../../content/markdown/aaa/reactions/radiation.md)
- Claim level: observer-level accretion/release benchmark, native carrier dictionary, and fail-closed residual target
- Promotion status: priority-only
- Current score: unscored; not yet integrated into the main score table

## Purpose

`EQ-07B` splits the black-hole accretion-to-release problem out of the broader effective-metric and strong-field rows. The row asks whether one strong-field carrier can bind:

- inflow and accretion rates;
- disk, wind, sheath, and opacity readouts;
- radiative output and Eddington-style limits;
- jet energy, momentum, angular momentum, collimation, loading, and dissipation;
- horizon-interface label and horizon-thermodynamic comparisons;
- feedback into the surrounding Noether sea;
- and the no-hidden-retune witness tying these channels to one source state.

The row is not a claim that black-hole accretion or jet launching has already been derived in $\mathbb{A}\mathbb{A}\mathbb{A}$. It is a bounded equation-mapping packet that turns the existing AGN release-channel material into one carrier target with explicit blockers.

## Standard Benchmarks

The useful comparison equations are force-balance, transport, conservation, and state-counting constraints rather than loose empirical fits. The first packet should keep these families observer-level:

- Schwarzschild/Kerr exterior scales, ISCO, and launch radius comparisons;
- Bondi-like inflow and disk transport rows for $\dot M_{\mathrm{in}}$ and $\dot M_{\mathrm{acc}}$;
- Eddington luminosity and opacity comparisons;
- Salpeter-style growth time;
- thin-disk flux and radiative efficiency rows;
- Blandford-Znajek-style jet-power comparison;
- jet speed, opening angle, loading, and collimation benchmarks;
- horizon area/entropy and detailed-balance comparisons;
- population-level source terms only when they remain tied to ordinary formation, feeding, and release histories.

The observer-level jet speed benchmark already staged in the black-hole chapter is

$$
\mathcal{R}_{v,\mathrm{jet}}
\equiv
\frac{v_j}{v_{\mathrm{esc}}(R_{\mathrm{launch}})}
\sim
1,
\qquad
v_{\mathrm{esc}}(R_{\mathrm{launch}})
=
\left(\frac{2G_{\mathrm{eff}}M}{R_{\mathrm{launch}}}\right)^{1/2}.
$$

This benchmark does not promote Newtonian escape speed into substrate ontology. It asks whether the same strong-field or disk-interface record that powers release also sets the observed launch-speed scale.

## Native Carrier Dictionary

For a strong-field source window $W$ and release-history interval $T$, define the first `EQ-07B` carrier as

$$
\Theta_{\mathrm{AGN}}(W,T)
=
\left(
\theta_W,
\mathcal L_{E\mathbf p\mathbf J},
M,\mathbf J,
\dot M_{\mathrm{in}},
\dot M_{\mathrm{acc}},
\Phi_{\mathrm{eff}}^{\mathrm{obs}},
\mathcal A_{\mathrm{NS}},
\Sigma_{\mathrm{wind}},
\mathcal B_H,
\mathcal Q_{\mathrm{jet}},
\mathcal S_{\mathrm{rad}},
\mathcal F_{\mathrm{fb}},
\mathcal R_{\mathrm{AGN}}
\right).
$$

The carrier requires:

| Variable or row | Role in `EQ-07B` | Required native attachment |
| --- | --- | --- |
| $\theta_W$ | Strong-field/effective-metric state. | Same constitutive discipline used by `EQ-07` through `EQ-10`; not a private black-hole geometry row. |
| $\mathcal L_{E\mathbf p\mathbf J}$ | Event ledger for energy, momentum, angular momentum, and medium update. | Shared with radiation, reaction, and feedback rows. |
| $M,\mathbf J$ | Compact-object mass and angular-momentum readouts. | Observer-level labels projected from the strong-field carrier and remnant ledger. |
| $\dot M_{\mathrm{in}}$ and $\dot M_{\mathrm{acc}}$ | Inflow and launch/accretion rates. | Same source history; no independent inflow and jet-fit histories. |
| $\Phi_{\mathrm{eff}}^{\mathrm{obs}}$ | Magnetic-flux comparison diagnostic. | Observer-level comparison row, not substrate field ontology. |
| $\mathcal A_{\mathrm{NS}}$ | Noether sea anisotropy and loading state. | Mapped Noether sea row that also controls collimation and feedback coupling. |
| $\Sigma_{\mathrm{wind}}$ | Disk wind, sheath, or confinement row. | Same disk-interface record as launch and propagation. |
| $\mathcal B_H$ | Horizon-interface and horizon-thermodynamic label ensemble. | State-counting/detailed-balance comparison tied to the same strong-field support. |
| $\mathcal Q_{\mathrm{jet}}$ | Jet channel record. | Energy, momentum, angular momentum, speed, opening angle, loading, and dissipation readouts from one release selector. |
| $\mathcal S_{\mathrm{rad}}$ | Radiation and high-energy output rows. | Photon, synchrotron, Compton, hadronic, pair-cascade, cosmic-ray, and neutrino channels as comparison outputs. |
| $\mathcal F_{\mathrm{fb}}$ | Environmental feedback row. | Heating, cavities, cocoons, bubbles, and duty-cycle work bound to the same release history. |

The first score-moving carrier should be source-backed as one accepted `agn_accretion_release_carrier`. A packet that accepts only jet power, only radio lobes, or only horizon entropy does not populate `EQ-07B`.

## Release Residual

The narrow residual should consume one $\Theta_{\mathrm{AGN}}$:

$$
\mathcal R_{\mathrm{AGN}}(\Theta_{\mathrm{AGN}})
=
\mathcal R_{\dot M}
+
\mathcal R_{\mathrm{Edd}}
+
\mathcal R_{\mathrm{disk}}
+
\mathcal R_{\mathrm{jet}}
+
\mathcal R_{\mathrm{fb}}
+
\mathcal R_{S_H}
+
\mathcal S_{\mathrm{retune}}.
$$

The components are:

| Residual | Required comparison |
| --- | --- |
| $\mathcal R_{\dot M}$ | Inflow, accretion, launch, and outflow rates close one mass/source history. |
| $\mathcal R_{\mathrm{Edd}}$ | Luminosity, opacity, and radiative efficiency are compared without using a private radiation record. |
| $\mathcal R_{\mathrm{disk}}$ | Disk stress, wind/sheath confinement, launch radius, and surface-density/readout rows share the same source state. |
| $\mathcal R_{\mathrm{jet}}$ | $\dot E_j$, $\dot{\mathbf P}_j$, $\dot{\mathbf J}_j$, $\Gamma_j$, $\theta_j$, loading, shocks, hot spots, and dissipation read from one release selector. |
| $\mathcal R_{\mathrm{fb}}$ | Cocoon, bubble, environmental heating, and duty-cycle work stay tied to the launch and radiation ledgers. |
| $\mathcal R_{S_H}$ | Horizon-interface entropy or detailed-balance comparison is not fit separately from inflow and release. |
| $\mathcal S_{\mathrm{retune}}$ | Hidden-retune witness between inflow, disk, radiation, jet, feedback, Noether sea loading, and horizon labels. |

The residual fails if near-hole launch, downstream radio structure, high-energy radiation, feedback, and horizon thermodynamics are fit by separate states.

## First Blocker

The first blocker is:

```text
missing_accepted_agn_accretion_release_carrier
```

This blocker should be resolved before adding an `EQ-07B` checker or score row. The first accepted object must be a durable carrier row with:

- concrete `carrierId`, `sourceWindowId`, `releaseWindowId`, and `supportId`;
- accepted $\theta_W$ or declared parent strong-field support;
- source-backed $\dot M_{\mathrm{in}}$, $\dot M_{\mathrm{acc}}$, $L_{\mathrm{rad}}$, $\dot E_j$, $\dot{\mathbf P}_j$, and $\dot{\mathbf J}_j$ rows;
- one declared Noether sea anisotropy/loading row $\mathcal A_{\mathrm{NS}}$;
- one release-channel selector linking jet, wind, dark-sector, and radiation possibilities by state rather than by separate fits;
- one event-ledger balance over energy, momentum, angular momentum, recoil/remnant, medium update, and feedback;
- one horizon-interface label or horizon-thermodynamic comparison row when entropy or state-counting claims are included;
- one no-hidden-retune witness across inflow, radiation, jet, feedback, and horizon rows.

The first checker-consumable identity shell is [eq07b-agn-accretion-release-carrier-source-attempt.v1.json](../../../scripts/equation-mapping/eq07b-agn-accretion-release-carrier-source-attempt.v1.json). It does not compute residuals and does not populate retained evidence. Its purpose is to freeze the shared `carrierId`, `thetaWId`, `sourceWindowId`, `releaseWindowId`, `supportId`, `eventLedgerId`, `noetherSeaLoadingId`, `releaseSelectorId`, `horizonInterfaceId`, `radiationChannelId`, `feedbackRowId`, and `retuneWitnessId` that a future checker must require before scoring inflow, radiation, jet, feedback, or horizon rows.

The score-neutral identity checker is [eq07b-agn-accretion-release-carrier-identity-check.mjs](../../../scripts/equation-mapping/eq07b-agn-accretion-release-carrier-identity-check.mjs):

```bash
node scripts/equation-mapping/eq07b-agn-accretion-release-carrier-identity-check.mjs --summary --pretty
```

The current run returns `status: blocked_missing_rows`, `scoreDecision: no_score_increase`, `nextBlocker: missing_accepted_agn_accretion_release_carrier`, and `residualArithmeticEvaluated: false`. Its embedded negative controls reject `agn.jet_power_only_fit` as `blocked_release_selector_split`, `agn.horizon_entropy_private_row` as `blocked_horizon_interface_split`, `agn.noether_sea_feedback_missing` as `blocked_noether_sea_loading_missing`, and `agn.radiation_child_promoted_to_parent` as `blocked_carrier_split` before release residual arithmetic is evaluated.

The carrier-shell source-contract boundary is [eq07b-agn-accretion-release-carrier-shell-source-contract.v1.json](../../../scripts/equation-mapping/eq07b-agn-accretion-release-carrier-shell-source-contract.v1.json), with checker input [eq07b-agn-accretion-release-carrier-shell-source-contract-attempt.v1.json](../../../scripts/equation-mapping/eq07b-agn-accretion-release-carrier-shell-source-contract-attempt.v1.json):

```bash
node scripts/equation-mapping/eq07b-agn-accretion-release-carrier-identity-check.mjs --input scripts/equation-mapping/eq07b-agn-accretion-release-carrier-shell-source-contract-attempt.v1.json --summary --pretty
```

This boundary marks only the parent `agn_accretion_release_carrier` accepted-looking against a durable source-contract file while every child row remains `attempt`. The expected checker result is `status: blocked_missing_rows`, `nextBlocker: missing_accepted_strong_field_parent_support`, `carrierAccepted: true`, `scoreDecision: no_score_increase`, `residualArithmeticEvaluated: false`, and `4/4` negative controls passing. The same command with `--require-populated` must exit nonzero. This is a boundary test, not accepted retained evidence.

The probe-source source-evidence guard is [eq07b-agn-accretion-release-carrier-probe-source-negative-control.v1.json](../../../scripts/equation-mapping/eq07b-agn-accretion-release-carrier-probe-source-negative-control.v1.json):

```bash
node scripts/equation-mapping/eq07b-agn-accretion-release-carrier-identity-check.mjs --input scripts/equation-mapping/eq07b-agn-accretion-release-carrier-probe-source-negative-control.v1.json --summary --pretty
```

This control marks the carrier and required rows accepted-looking while pointing their `sourcePath` values at a source-evidence-probe JSON. The checker now returns `status: blocked_accepted_without_evidence_source`, `nextBlocker: accepted_without_evidence_source`, and `residualArithmeticEvaluated: false`; the `--require-populated` form exits nonzero. Authored AAA prose, toy files, probe files, source-evidence-probe files, generated files, temporary files, priority packets, attempts, mocks, and negative controls cannot satisfy accepted AGN source evidence.

## Direct Geometry Layer

This layer is priority-only and score-neutral. It maps the observer-level black-hole accretion, release, jet, feedback, and horizon comparison terms to the $\mathbb{A}\mathbb{A}\mathbb{A}$ readouts that must remain bound to one `agn_accretion_release_carrier`.

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Fail-closed negative control | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| Schwarzschild/Kerr exterior scales, ISCO, and launch-radius comparisons | Strong-field/effective-metric support, mass/spin readouts, and horizon-interface labels projected from one source support. | `strong_field_parent_support`, `mass_spin_readout_row`, and `horizon_interface_label_row`. | Same `thetaWId`, `carrierId`, `sourceWindowId`, `supportId`, and `eventLedgerId` as inflow, release, radiation, and feedback rows. | `agn.horizon_entropy_private_row`: horizon bookkeeping uses a private horizon-interface id and fails before residual scoring. | Source-backed accepted carrier with accepted strong-field support, mass/spin readout, and horizon-interface row when horizon claims are included. |
| Bondi-like inflow, disk transport, and $\dot M_{\mathrm{in}}/\dot M_{\mathrm{acc}}$ rows | Source-history and disk-interface rate readouts for inflow, accretion, launch, and outflow. | `inflow_accretion_row` on `agn_accretion_release_carrier`. | Same `releaseWindowId`, `sourceWindowId`, `supportId`, and `eventLedgerId` as jet and radiation rows. | `agn.jet_power_only_fit`: jet power fits while inflow/accretion and release-selector identity split. | Accepted carrier with source-backed inflow/accretion row tied to the release window. |
| Eddington luminosity, thin-disk flux, opacity, and radiative efficiency | Radiation-output row read from the AGN release carrier, not promoted into the parent carrier. | `radiation_output_row` with `radiationChannelId`. | Same `carrierId`, `releaseWindowId`, `radiationChannelId`, `eventLedgerId`, and `supportId` as jet and feedback rows. | `agn.radiation_child_promoted_to_parent`: downstream radiation source is promoted as the parent carrier and fails at `carrier_split_before_residual_scoring`. | Accepted carrier with source-backed radiation-output row and parent release identity. |
| Blandford-Znajek-style jet power, launch speed, opening angle, loading, shocks, hot spots, and dissipation | Release-selector readout for jet energy, momentum, angular momentum, collimation, loading, and dissipation on one source state. | `jet_channel_row` plus `wind_sheath_confinement_row`. | Same `releaseSelectorId`, `releaseWindowId`, `radiationChannelId`, `supportId`, and `eventLedgerId` as radiation and feedback rows. | `agn.lobe_without_launch`: large-scale lobe or bubble fit is rejected when launch, wind/sheath, and angular-momentum drain rows are absent or split. | Accepted carrier with source-backed jet-channel and wind/sheath rows bound to one release selector. |
| Noether sea anisotropy/loading and environmental feedback | Surrounding Noether sea loading, cocoon/bubble heating, cavity work, and duty-cycle feedback as one response row. | `noether_sea_loading_row` and `feedback_row`. | Same `noetherSeaLoadingId`, `feedbackRowId`, `carrierId`, `sourceWindowId`, and `eventLedgerId` as release and radiation rows. | `agn.noether_sea_feedback_missing`: release/radiation rows pass while Noether sea loading is missing. | Accepted carrier with source-backed Noether sea loading and feedback rows. |
| Horizon area, entropy, and detailed-balance comparisons | Horizon-interface label ensemble tied to the same inflow/release event ledger, not a standalone entropy fit. | `horizon_interface_label_row`. | Same `horizonInterfaceId`, `thetaWId`, `carrierId`, `supportId`, and `eventLedgerId` as inflow and release rows. | `agn.horizon_entropy_private_row` blocks private horizon rows before residual arithmetic. | Accepted carrier with a source-backed horizon-interface row only when horizon/state-counting comparisons are claimed. |
| Energy, momentum, angular momentum, feedback, and no-hidden-retune balance | One finite-window $\mathcal L_{E\mathbf p\mathbf J}$ balance and one hidden-retune witness across inflow, radiation, jet, feedback, Noether sea loading, and horizon labels. | `event_ledger_row`, `source_provenance`, and `no_hidden_retune_witness`. | Same `eventLedgerId`, `retuneWitnessId`, `carrierId`, `sourceWindowId`, `releaseWindowId`, `supportId`, `releaseSelectorId`, `radiationChannelId`, `feedbackRowId`, and `horizonInterfaceId`. | Accepted-looking rows sourced only to probe/source-evidence-probe, priority, authored prose, generated, attempt, mock, toy, temporary, or negative-control files fail at `accepted_without_evidence_source`; identity splits fail before residual arithmetic. | Source-backed accepted `agn_accretion_release_carrier` with every required row accepted and bound to the same source identity. |

## Candidate Breakthrough Angle

The narrow bypass is the AGN jet selector already staged in the black-hole chapter. Instead of starting from all black-hole thermodynamics, begin with one release-channel packet:

$$
\Pi_{\mathrm{AGN}}[\Theta_{\mathrm{AGN}}]
\mapsto
\left(
\dot E_j,\dot{\mathbf P}_j,\dot{\mathbf J}_j,
\Gamma_j,\theta_j,
\sigma_j(R),
f_p(R),
R_{\mathrm{ACZ}},
R_{\mathrm{diss}},
\mathcal H_{\mathrm{shock}},
\mathcal S_{\mathrm{rad}},
\mathcal F_{\mathrm{fb}}
\right).
$$

This object can test whether launch speed, collimation, radiation, baryon loading, shock/hot-spot structure, and environmental feedback are all consequences of one source state. If that object fails, `EQ-07B` fails in a useful way before any horizon entropy or cosmological coupling claim is attempted.

## Fail-Closed Negative Controls

| Negative control | Required failure |
| --- | --- |
| `agn.jet_power_only_fit` | Jet power matches an observer-level formula while inflow, disk, Noether sea anisotropy, radiation, and feedback use independent states. |
| `agn.lobe_without_launch` | Large-scale lobes or bubbles fit while launch speed, spin/inflow, wind/sheath confinement, and angular-momentum drain remain unrelated. |
| `agn.horizon_entropy_private_row` | Horizon entropy or area bookkeeping is fit by a row that is not bound to the inflow/release event ledger. |
| `agn.noether_sea_feedback_missing` | Radiation and jet rows pass while the surrounding Noether sea loading/feedback row is absent. |
| `agn.perpetual_recycling` | Outward release appears as free energy rather than redistribution from infalling matter, radiation, or pre-existing medium energy. |
| `agn.radiation_child_promoted_to_parent` | A downstream EQ-29-style radiation carrier is promoted into the parent AGN release carrier while inflow, jet, horizon label, Noether sea loading, and feedback remain private or missing. |

## Attack Card Summary

- Current score and closure driver: unscored; prove or fail one accretion-to-release residual over $\Theta_{\mathrm{AGN}}$ before adding `EQ-07B` to the main score table.
- Primary $\mathbb{A}\mathbb{A}\mathbb{A}$ carrier: $\Theta_{\mathrm{AGN}}(W,T)$ plus $\theta_W$, $\mathcal L_{E\mathbf p\mathbf J}$, Noether sea loading, release-channel rows, and $\mathcal B_H$.
- Smallest score-moving evidence object: accepted `agn_accretion_release_carrier` with source-backed inflow, accretion, jet, radiation, feedback, horizon-label, event-ledger, and no-retune rows.
- Exact first blocker: `missing_accepted_agn_accretion_release_carrier`.
- Existing scripts/fixtures/packets found: [eq07b-agn-accretion-release-carrier-source-attempt.v1.json](../../../scripts/equation-mapping/eq07b-agn-accretion-release-carrier-source-attempt.v1.json) is the score-neutral identity shell, and [eq07b-agn-accretion-release-carrier-identity-check.mjs](../../../scripts/equation-mapping/eq07b-agn-accretion-release-carrier-identity-check.mjs) enforces AGN source/release identity before residual arithmetic; related consumers include effective-metric, pressure/effective-$\Lambda$, radiation source-ledger, and finite-window thermodynamic runners.
- Direct Geometry Layer: present in this packet; it binds strong-field support, inflow/accretion, radiation, jet, wind/sheath, Noether sea loading, feedback, horizon interface, event ledger, provenance, and no-hidden-retune witness to one AGN source/release identity.
- Candidate breakthrough angle: start with the existing AGN release-channel selector and force launch, collimation, radiation, and feedback onto one state before horizon thermodynamics.
- Fail-closed negative control: jet/lobe/radiation fits that split inflow, Noether sea loading, angular-momentum drain, and feedback records; accepted-looking rows sourced only to a probe/source-evidence-probe file fail at `accepted_without_evidence_source`.
- Next action smaller than broad report: replace the carrier-shell source contract with a real source-backed parent carrier, then populate `strong_field_parent_support` on the same `carrierId`, `thetaWId`, `sourceWindowId`, `supportId`, and `eventLedgerId`.
- Current implementation target: the identity shell, four fail-closed identity controls, probe-source guard, and carrier-shell source-contract boundary now exist. The next smaller action is a retained `strong_field_parent_support` evidence object, not a broader horizon-thermodynamics or jet-power report.

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

Defer with blocker: this packet names the carrier and residual target. It does not derive black-hole accretion, jet release, or horizon thermodynamics, and it does not assign a score in the main equation table.
