# EQ-07B Black-Hole Accretion, Jet Release, And Horizon Thermodynamics

## Workstream Metadata

- Kind: `priority-packet`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Source audit: [Equation Closure Pass 2026-06-25 B](equation-closure-pass-2026-06-25-b.md)
- Parent packet: [EQ-07 Through EQ-10 And EQ-17 Through EQ-19 Effective Metric / Cosmology Packet](eq-07-10-17-19-effective-metric-cosmology-packet.md)
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

No existing script or fixture currently supplies this carrier.

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

## Attack Card Summary

- Current score and closure driver: unscored; prove or fail one accretion-to-release residual over $\Theta_{\mathrm{AGN}}$ before adding `EQ-07B` to the main score table.
- Primary AAA carrier: $\Theta_{\mathrm{AGN}}(W,T)$ plus $\theta_W$, $\mathcal L_{E\mathbf p\mathbf J}$, Noether sea loading, release-channel rows, and $\mathcal B_H$.
- Smallest score-moving evidence object: accepted `agn_accretion_release_carrier` with source-backed inflow, accretion, jet, radiation, feedback, horizon-label, event-ledger, and no-retune rows.
- Exact first blocker: `missing_accepted_agn_accretion_release_carrier`.
- Existing scripts/fixtures/packets found: no direct `EQ-07B` script; related consumers include effective-metric, pressure/effective-$\Lambda$, radiation source-ledger, and finite-window thermodynamic runners.
- Candidate breakthrough angle: start with the existing AGN release-channel selector and force launch, collimation, radiation, and feedback onto one state before horizon thermodynamics.
- Fail-closed negative control: jet/lobe/radiation fits that split inflow, Noether sea loading, angular-momentum drain, and feedback records.
- Next action smaller than broad report: build one blocked source-backed carrier shell for `agn_accretion_release_carrier`, or defer checker creation until a concrete retained source row exists.

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

Defer with blocker: this packet names the carrier and residual target. It does not derive black-hole accretion, jet release, or horizon thermodynamics, and it does not assign a score in the main equation table.
