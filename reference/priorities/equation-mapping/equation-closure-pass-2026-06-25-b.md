# Equation Closure Pass 2026-06-25 B

## Workstream Metadata

- Kind: `priority`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Claim level: team-agent high-energy process audit, suffix-row proposals, and priority-only packet plan
- Promotion status: priority-only

## Scope

This pass audits high-energy astrophysics and cosmology process equations that are missing or underdeveloped in the equation-mapping workstream. Standard formulae are treated as inverse clues and benchmark constraints, not as imported ontology. The shard reports covered compact stars and collapse, explosive transients, black-hole accretion, early-universe recombination, radiation/high-energy thresholds, and gravitational-wave source equations.

The coordinator decision is conservative:

- no score changes;
- no reader-facing `content/markdown/aaa` promotion;
- no generated artifacts;
- no renumbering of existing rows;
- suffix rows are proposed here as packet targets and should enter [equation.md](equation.md) only when their first priority packet is written with an initial score and blocker.

## Team-Agent Shard Merge

| Shard | Process family | Coordinator disposition |
| --- | --- | --- |
| A | Compact-star support and collapse: Chandrasekhar scaling, TOV, electron capture, photodisintegration, dense-matter EOS. | Required. Stage as `EQ-07A` because it specializes the effective-metric/strong-collapse spine and should first add a variable dictionary. |
| B | Novae, supernovae, shocks, explosive nucleosynthesis, radioactive heating, NSE, r/s-process candidates. | Required. Stage as `EQ-23A` because it extends source-window reaction networks beyond BBN into stellar explosive windows. |
| C | Black-hole exterior scales, SMBH accretion/growth, jet release, horizon thermodynamics. | Required but high risk. Stage as `EQ-07B` to avoid colliding with compact-star `EQ-07A`; it consumes metric, radiation, thermodynamic, and horizon ledgers. |
| D | Early-universe thermal history through recombination: neutrino decoupling, $e^+e^-$ annihilation, Saha/Peebles, visibility, sound horizon, Silk damping. | Required. Stage as `EQ-22B`, distinct from `EQ-22A` Planck blackbody mode occupancy. |
| E | Radiation, high-energy particles, and gravitational-wave sources. | Split. Deepen existing `EQ-29` for synchrotron/bremsstrahlung; propose `EQ-28A` for inverse-Compton/SZ path-frequency exchange and `EQ-11A` for gravitational-wave source recovery. Keep GZK-like thresholds optional until a concrete consumer appears. |

## Ranked Process Packets

### 1. `EQ-07A` Compact-Star Support And Collapse Scale Residual

Priority: required. Risk: high.

Grounded formula families:

$$
p_F\sim\hbar n_e^{1/3},
\qquad
P_{e,\mathrm{nr}}\propto\rho^{5/3},
\qquad
P_{e,\mathrm{rel}}\propto\rho^{4/3},
$$

$$
P_{\mathrm{grav}}\sim\frac{GM^2}{R^4},
\qquad
M_{\mathrm{Ch}}\propto Y_e^2M_\odot,
$$

and the TOV pressure-gravity comparison

$$
\frac{dP}{dr}
\sim
-\frac{
G(\epsilon+P/c_0^2)(m+4\pi r^3P/c_0^2)
}{
r^2(1-2Gm/(rc_0^2))
}.
$$

These are not mere curve fits: the pressure exponents come from Fermi state counting plus nonrelativistic and relativistic energy-momentum scaling, while the support boundary comes from hydrostatic comparison and composition through $Y_e$.

Current coverage:

- [eq-07-10-17-19-effective-metric-cosmology-packet.md](eq-07-10-17-19-effective-metric-cosmology-packet.md) already defines the collapse scale-compression residual.
- [black-holes.md](../../../content/markdown/aaa/spacetime/black-holes.md) already carries the collapse ladder, Chandrasekhar scaling, iron-core handoff, and neutron-star branch framing.
- [singularity-resolution.md](../../../content/markdown/aaa/spacetime/singularity-resolution.md) owns horizon-interface continuation.

Missing or weak map:

No compact variable dictionary yet ties $(n_e,p_F,x_F,Y_e,\mu_e,M,R,\epsilon,P_{\mathrm{EOS}})$ to $\lambda_A$, $\mathcal{S}_{\mathrm{mat}}$, $P_{\mathrm{pack}}^\theta$, $\Theta_{\mathrm{NS}}(r)$, $\mathcal{L}_{E\mathbf p\mathbf J}^{(\Omega)}$, reaction provenance, and $\mathcal{S}_{\mathrm{metric}}$.

Native carriers:

Noether braid packing and scale rows; Noether sea density, delay, cadence, stress, and response rows; compact-region event ledger; electron-capture and photodisintegration reaction provenance; neutrino channel; photon channel; effective metric; finite-window thermal record.

First mathematical object:

Add a compact-star variable dictionary before adding another checker. The existing residual

$$
\mathcal{R}_{\mathrm{coll}\text{-}\mathrm{support}}(\theta;\Omega,W)
$$

is useful, but it cannot be populated cleanly until the standard variables and native carriers are declared in one table.

Promotion target after blocker clears:

- [black-holes.md](../../../content/markdown/aaa/spacetime/black-holes.md)
- [singularity-resolution.md](../../../content/markdown/aaa/spacetime/singularity-resolution.md)

Blocker:

Imported-formula risk and hidden-retune risk remain high. The compact-star map must not overclaim geometric packing as full fermionic pressure before spin-statistics/state-counting recovery is supplied.

### 2. `EQ-22B` Recombination, Visibility, Sound Horizon, And Acoustic Transfer

Priority: required. Risk: medium.

Grounded formula families:

Saha equilibrium, Peebles non-equilibrium recombination, Thomson optical depth and visibility, sound horizon, Silk diffusion damping, and tight-coupled photon-baryon acoustic equations. These are detailed-balance, rate-competition, collision-operator, and radiative-transfer constraints rather than fitted origin-story parameters.

Current coverage:

- `EQ-22` covers the broad CMB transfer row.
- `EQ-22A` covers Planck blackbody and photon occupancy.
- `EQ-23` covers BBN freezeout.
- [eq-21-23-32-shared-observation-residual-packet.md](eq-21-23-32-shared-observation-residual-packet.md) names the shared observation record, but does not expand recombination kinetics or damping equations.
- [CMB.md](../../../content/markdown/aaa/cosmology/CMB.md) names last scattering, blackbody, thermalization, acoustic phase, and damping targets.

Missing or weak map:

The weak layer is recombination-to-acoustic transfer:

$$
x_e^\theta(t),\quad
n_e^\theta(t),\quad
\tau_T^\theta,\quad
g^\theta,\quad
r_s^\theta,\quad
k_D^\theta,\quad
R_b^\theta,\quad
\theta_{\gamma b}^\theta.
$$

The $e^+e^-$ annihilation and neutrino-decoupling handoff also needs photon-sector entropy heating, neutrino free-streaming, $T_\nu/T_\gamma$, and $N_{\text{eff}}^\theta$ as reaction-provenance and finite-window thermal rows.

Native carriers:

Use $\Theta_{\mathrm{src}}$, $\Theta_{\mathrm{therm/prov}}$, $\Theta_{\mathrm{read}}$, $\Theta_{\mathrm{bb}}$, the photon channel, the neutrino channel, the Noether sea state, and $\mathcal{L}_{E\mathbf p\mathbf J}$. Do not add new ontology.

First mathematical object:

Define

$$
\Theta_{\mathrm{rec/ac}}
=
\left(
x_e^\theta,
n_e^\theta,
\Gamma_T^\theta,
\tau_T^\theta,
g^\theta,
r_s^\theta,
k_D^\theta,
R_b^\theta,
\theta_{\gamma b}^\theta,
\Theta_{\mathrm{therm/prov}},
\Theta_{\mathrm{read}},
\mathcal{L}_{E\mathbf p\mathbf J}
\right),
$$

with

$$
\Gamma_T^\theta=n_e^\theta\sigma_T^\theta c_\gamma^\theta
$$

and the first decoupling gate $\Gamma_T^\theta\approx H_{\mathrm{eff}}^\theta$. The proposed residual is

$$
\mathcal{R}_{\mathrm{rec/ac}}^\theta
=
\mathcal{R}_{x_e}^\theta
+\lambda_\tau\mathcal{R}_{\tau_T}^\theta
+\lambda_g\mathcal{R}_{\mathrm{vis}}^\theta
+\lambda_s\mathcal{R}_{r_s}^\theta
+\lambda_D\mathcal{R}_{\mathrm{Silk}}^\theta
+\lambda_{\mathrm{ac}}\mathcal{R}_{\mathrm{acoustic}}^\theta
+\lambda_{\mathrm{shared}}\mathcal{S}_{\mathrm{retune}}.
$$

Promotion target after blocker clears:

- [CMB.md](../../../content/markdown/aaa/cosmology/CMB.md)
- [BBN-constraints.md](../../../content/markdown/aaa/cosmology/BBN-constraints.md)
- [structure-formation.md](../../../content/markdown/aaa/cosmology/structure-formation.md)

Blocker:

The equations must remain observer-level kinetic and radiative-transfer constraints. They cannot imply expansion of the Euclidean void or become substrate ontology.

### 3. `EQ-23A` Stellar Explosive Nucleosynthesis And Shock-Driven Reaction Networks

Priority: required. Risk: high.

Grounded formula families:

Rankine-Hugoniot jumps, Sedov-Taylor blast scaling $R_s\propto(E t^2/\rho_0)^{1/5}$, thermonuclear runaway energy balance, neutrino heating, radioactive decay heating, Arnett-style peak balance, NSE chemical-potential constraints, and reaction-network ODEs. Arnett-style peak balance should be the loosest member: a diffusion/heating benchmark, not ontology.

Current coverage:

- `EQ-23` covers BBN reaction networks and freezeout.
- `EQ-24` covers fluid/acoustic/medium equations.
- `EQ-25` covers finite-window thermal records.
- `EQ-29` covers radiation source ledgers.
- `EQ-31` covers widths, lifetimes, and branching fractions.
- [black-holes.md](../../../content/markdown/aaa/spacetime/black-holes.md) covers core-collapse support failure but not shock revival, breakout, radioactive heating, or explosive yield packets.

Missing or weak map:

There is no unified stellar-explosion carrier for standard variables $(\rho,u,P,E)$, shock radius/speed, ejecta mass, opacity, radioactive inventory, neutrino luminosity/spectrum, electron fraction $Y_e$, NSE abundances, and reaction-network yields.

Native carriers:

Finite-window compact-region event ledger, Noether braid scale/cadence rows, Noether sea density/flow/stress/delay rows, reaction provenance, photon channel output, neutrino channel output, remnant/medium heating, and finite-window thermal record.

First mathematical object:

Add

$$
\mathcal R_{\mathrm{expl}}(\theta;\Omega,W)
=
\mathcal R_{\mathrm{jump}}
+\mathcal R_{\mathrm{blast}}
+\mathcal R_{\nu\text{-}\mathrm{heat}}
+\mathcal R_{\mathrm{rxn}}
+\mathcal R_{\gamma/\mathrm{decay}}
+\mathcal R_{E\mathbf p\mathbf J}
+\mathcal S_{\mathrm{retune}}.
$$

This fails if shock propagation, neutrino heating, radioactive decay, nucleosynthesis yields, and photon output require different $\theta$ records.

Promotion target after blocker clears:

- [black-holes.md](../../../content/markdown/aaa/spacetime/black-holes.md)
- [radiation.md](../../../content/markdown/aaa/reactions/radiation.md)
- [BBN-constraints.md](../../../content/markdown/aaa/cosmology/BBN-constraints.md), only for shared reaction-network discipline

### 4. `EQ-11A` Gravitational-Wave Source, Chirp, Orbital-Decay, And Ringdown Recovery

Priority: required. Risk: high.

Grounded formula families:

Quadrupole flux, chirp mass, Peters-Mathews orbital decay, calibrated strain flux, and ringdown QNM comparisons. These are conservation, waveform, and final compact-object label constraints, not loose fits.

Representative comparison forms:

$$
P_{\mathrm{GW}}
=
\frac{G_{\mathrm{eff}}}{5c_{\mathrm{GW}}^5}
\left\langle
\dddot Q_{ij}\dddot Q^{ij}
\right\rangle,
$$

$$
\mathcal F_{\mathrm{GW}}
=
\frac{c_{\mathrm{GW}}^3}{32\pi G_{\mathrm{eff}}}
\left\langle
\dot h_+^2+\dot h_\times^2
\right\rangle.
$$

Current coverage:

- [gravitational-waves.md](../../../content/markdown/aaa/spacetime/gravitational-waves.md) has propagation, polarization, detector, merger/ringdown, stochastic, and comparison gates.
- [run-protocols.md](../../../content/markdown/aaa/validation/simulations/run-protocols.md) names public gravitational-wave benchmark protocol material.
- [equation.md](equation.md) has no dedicated row for gravitational-wave source equations.

Missing or weak map:

The equation map lacks a direct row tying source quadrupole, inspiral chirp, orbital decay, radiated energy/angular momentum, ringdown, and the effective metric tensor channel to one Noether sea/effective-metric record. Peters-Mathews-style orbital decay is effectively absent from the equation table.

Native carriers:

Effective metric tensor channel, Noether sea constitutive record, event ledger for binary source energy and angular momentum, detector strain record, and final compact-object labels. Reaction provenance is relevant only for coincident non-GW channels.

First mathematical object:

Define

$$
\Theta_{\mathrm{GWsrc}}
=
\left(
\theta_{\mathrm{sea}},
Q_{ij}^{\mathrm{eff}},
h_+,
h_\times,
E_{\mathrm{rad}},
\mathbf J_{\mathrm{rad}},
\mathcal M_c,
\dot P_b,
\theta_{\mathrm{ring}},
\mathcal R_{\mathrm{GWsrc}}
\right).
$$

The row should fail if propagation speed, two-mode tensor content, chirp mass, orbital decay, and final ringdown labels are fit by different effective-metric or Noether sea records.

Promotion target after blocker clears:

- [gravitational-waves.md](../../../content/markdown/aaa/spacetime/gravitational-waves.md)
- [emergent-metric.md](../../../content/markdown/aaa/spacetime/emergent-metric.md), only after shared constitutive recovery is stronger

### 5. `EQ-07B` Black-Hole Accretion, Jet Release, And Horizon Thermodynamics

Priority: required. Risk: high.

Grounded formula families:

Schwarzschild/Kerr exterior scales, ISCO, Eddington luminosity, Salpeter time, Bondi accretion, thin-disk flux, Blandford-Znajek-style jet power, and horizon thermodynamics. These come from force balance, continuity, stress transport, energy/angular-momentum conservation, and state counting or detailed-balance comparisons.

Current coverage:

- [black-holes.md](../../../content/markdown/aaa/spacetime/black-holes.md) has exterior scales, horizon interface, entropy ledger, AGN jet residual, SMBH recycling, and cosmological coupling.
- Equation-map coverage is currently split across `EQ-07` through `EQ-11`, `EQ-20`, `EQ-24`, `EQ-25`, `EQ-29`, and `EQ-31`.

Missing or weak map:

Inflow is weaker than release: Bondi variables, disk surface density, stress/viscosity, optical depth, radiative efficiency, Eddington opacity, Salpeter growth, spin, magnetic-flux comparison, and jet extraction are not yet one shared Noether sea/event-ledger record.

Native carriers:

Use the existing strong-field record $\theta_W$, AGN record $\Theta_{\mathrm{AGN}}$, event ledger $\mathcal{L}_{E\mathbf p\mathbf J}$, Noether sea variables, photon channel rows, reaction provenance rows, release-channel rows, and horizon label ensemble $\mathcal B_H$.

First mathematical object:

Add an accretion-to-release residual consuming one $\Theta_{\mathrm{AGN}}$:

$$
\mathcal R_{\mathrm{AGN}}(\Theta_{\mathrm{AGN}})
=
\mathcal R_{\dot M}
+\mathcal R_{\mathrm{Edd}}
+\mathcal R_{\mathrm{disk}}
+\mathcal R_{\mathrm{jet}}
+\mathcal R_{\mathrm{feedback}}
+\mathcal R_{S_H}
+\mathcal S_{\mathrm{retune}}.
$$

The residual should compare $\dot M_{\mathrm{in}}$, $\dot M_{\mathrm{acc}}$, $L_{\mathrm{rad}}$, $\dot E_j$, $\dot{\mathbf J}_j$, $\mathcal{S}_{\mathrm{BH}}$, and $\Delta S_H$ against Bondi/Eddington/thin-disk/jet/horizon-thermodynamic benchmarks while penalizing hidden retunes between inflow, radiation, jet, feedback, and horizon entropy rows.

Promotion target after blocker clears:

- [black-holes.md](../../../content/markdown/aaa/spacetime/black-holes.md)
- [dark-energy.md](../../../content/markdown/aaa/cosmology/dark-energy.md)
- [cosmology-ontology.md](../../../content/markdown/aaa/cosmology/cosmology-ontology.md)

### 6. `EQ-28A` Inverse-Compton And SZ Path-Frequency Exchange

Priority: required. Risk: medium.

Grounded formula families:

Compton/inverse-Compton frequency exchange, SZ and kSZ signed frequency/temperature shifts, recoil, remnant, and medium energy exchange. These are conservation and path-history ledger constraints.

Current coverage:

- `EQ-28` covers local Compton/recoil/pair thresholds.
- [radiation.md](../../../content/markdown/aaa/reactions/radiation.md) carries a path-frequency exchange row.
- [CMB.md](../../../content/markdown/aaa/cosmology/CMB.md) carries SZ path-history calibration.
- [reaction-cosmology-provenance-ledger.md](../../../content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md) carries SZ/Compton-like provenance requirements.

Missing or weak map:

Native Compton rows still lack accepted photon Gate A/B rows, recoil retained branch, angular-momentum update, Noether sea state row, and accepted medium/remnant support on one event record. SZ is present as provenance and calibration but not as an equation-map row.

Native carriers:

Photon channel, event ledger, reaction provenance, Noether sea path-history exchange, recoil/remnant rows, and finite-window thermal record for CMB side effects.

First mathematical object:

Define

$$
\Theta_{\nu\text{-}\mathrm{ex}}
=
\left(
\gamma_{\mathrm{in}},
\theta_{\mathrm{sea}},
e^-/\mathrm{medium},
\gamma_{\mathrm{out}},
\Delta E,
\Delta\mathbf p,
\Delta\mathbf J,
\mathcal R_{\mathrm{ex}}
\right).
$$

This row should be reusable by local Compton exchange and cosmological SZ calibration without duplicating `EQ-22B`.

Promotion target after blocker clears:

- [radiation.md](../../../content/markdown/aaa/reactions/radiation.md)
- [CMB.md](../../../content/markdown/aaa/cosmology/CMB.md)

### Existing Rows To Deepen Without New Suffixes

| Existing row | Process family | Next action |
| --- | --- | --- |
| `EQ-29` | Synchrotron, bremsstrahlung, Larmor/Lienard radiation power, and thermal channels. | Do not add a suffix yet. Populate the accepted `radiation_source_carrier`: source branch, Noether sea state, photon Gate A/B output, source depletion, power/spectrum/cooling/polarization residuals, and no-hidden-retune rows. |
| `EQ-22A` | Thermal photon bath and Planck blackbody. | Keep blackbody/mode occupancy here; do not move SZ exchange into this row. |
| `EQ-25` | Finite-window thermodynamic and thermalization record. | Reuse for CMB thermalization and shock/radiation thermalization; do not create a new thermal row until one finite-window record is accepted. |
| `EQ-28` | Local Compton, recoil, photoelectric, and pair-threshold events. | Keep local event-threshold closure here; use `EQ-28A` only for path-frequency exchange and SZ-style reuse. |

### High-Energy Threshold Provenance

Priority: high-value. Risk: high.

Grounded formula families:

Pair and high-energy threshold formulae are useful because they are kinematic and provenance constraints, not loose empirical fits. The ordinary photon threshold comparison is

$$
E_\gamma\ge2m_ec^2
$$

only when a target or background can carry the required momentum balance. The two-photon Breit-Wheeler comparison is

$$
s\ge4m_e^2c^4,
$$

and a GZK-like photohadron threshold, if brought into this workstream, would use the observer-level condition

$$
s\ge(m_p+m_\pi)^2c^4.
$$

Current coverage:

- `EQ-28` already owns local pair-threshold and recoil event closure.
- [synchrotron.md](../../../content/markdown/aaa/reactions/synchrotron.md) names photon-photon pair production as a distinct channel.
- [reaction-cosmology-provenance-ledger.md](../../../content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md) requires incoming photon assemblies, recruited Noether braid content, final $e^+e^-$ assemblies, recoil, and medium excitation.

Missing or weak map:

The missing object is not another scalar threshold. It is the native identity-routing and recruited-substrate provenance row: incoming photons supply energy, momentum, polarization handoff, and trigger geometry, while local Noether braid content supplies the identities of the outgoing charged assemblies. A GZK-like threshold would add a photon bath, hadronic reaction products, neutrino-channel descendants, and cosmology-facing propagation loss without changing the basic requirement that identities and ledgers close.

Native carriers:

Photon channel, event ledger, reaction provenance, local Noether braid recruitment, recoil/remnant rows, Noether sea photon bath for CMB/EBL targets, and neutrino channel if photopion descendants are followed.

First mathematical object:

Define a threshold-event provenance object

$$
\mathcal E_{\mathrm{th}}
=
\left(
\mathfrak L_{\mathrm{in}},
s_{\mathrm{cmp}},
\mathcal I_{\mathrm{recruit}},
\mathfrak L_{\mathrm{out}},
\mathfrak R_{\mathrm{th}}
\right),
$$

where $\mathfrak L_{\mathrm{in}}$ carries incoming photon or particle ledgers, $s_{\mathrm{cmp}}$ is the observer-level threshold invariant, $\mathcal I_{\mathrm{recruit}}$ records recruited local Noether braid content, $\mathfrak L_{\mathrm{out}}$ records outgoing stable or metastable assemblies, and $\mathfrak R_{\mathrm{th}}$ reports energy, momentum, angular momentum, identity, recoil, medium, and threshold residuals.

Disposition:

Keep ordinary pair thresholds inside `EQ-28`. Add `EQ-28B` only if a concrete high-energy propagation or GZK-like consumer appears, because otherwise a new row would create maintenance load without advancing a live derivation.

Candidate promotion target after blocker clears:

- [synchrotron.md](../../../content/markdown/aaa/reactions/synchrotron.md)
- [reaction-cosmology-provenance-ledger.md](../../../content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md)

### Optional Later Row

`EQ-28B` may be useful for high-energy threshold provenance, including GZK-like photohadron thresholds, only if a concrete source or validation consumer appears. Ordinary pair thresholds can remain in `EQ-28` for now.

## Recommended Packet Creation Order

1. `EQ-07A` compact-star variable dictionary.
2. `EQ-22B` recombination/acoustic residual.
3. `EQ-23A` explosive nucleosynthesis and shock residual.
4. `EQ-11A` gravitational-wave source packet.
5. `EQ-28A` path-frequency exchange packet.
6. `EQ-07B` accretion-to-release residual.
7. `EQ-29` accepted radiation source carrier.
8. Optional `EQ-28B` high-energy threshold provenance only after a concrete consumer exists.

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

Defer with blocker: every proposed suffix row still lacks at least one accepted retained branch, accepted Noether sea coefficient, native event ledger, finite-window thermal record, or shared observation record.

Reader-facing canon already contains several bounded statements from earlier work. This pass did not produce a new derivation strong enough for promotion into `content/markdown/aaa`.

## Score Decision

The audit itself justified no score changes. The first score-bearing follow-up is now [EQ-07A Compact-Star Support And Collapse Scale Residual](eq-07a-compact-star-support-collapse-scale-residual.md), which inserts `EQ-07A` into [equation.md](equation.md) at initial score `2`, adds a score-neutral attempt carrier checker plus Chandrasekhar and TOV solver residuals, and names `missing_accepted_compact_region_carrier` as the first blocker. No existing row scores change. The remaining suffix proposals stay outside [equation.md](equation.md) until their focused packets define an initial score, first blocker, and promotion target.
