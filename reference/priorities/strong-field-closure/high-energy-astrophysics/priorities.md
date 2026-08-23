# High-Energy Astrophysics event routing

## Workstream Metadata

- Kind: `strong-field-closure supporting packet`
- Parent: [Strong-Field Quantitative Closure](../priorities.md)
- Status: `routing`

## Ranked Next Objects

Ordered by marginal ROI on 2026-07-17. Dependency burden is included in the ranking rather than used to hide the highest-value object.

1. `source_window_carrier_map` — Bind one retained event class to its source window and history, channel-resolved event ledger, observer benchmarks and validity regime, uncertainty/cross-channel covariance, remnant and medium update, no-hidden-retune witness, first verification incomplete blocker, and owning closure lane. First scoped trial: prepare an EQ-07A compact-star observer-routing record with the native carrier field unresolved. Status: `pending`.
2. `equation_family_survey` — Assign the retained standard benchmark families to same-record carrier targets. Status: `started`.
3. `event_scale_taxonomy` — Complete the operator-facing event-class map needed by the carrier selection. First scoped action: apply the carrier-satisfiability equivalence relation below and record failures to join visually similar, label-similar, or far-field-similar events. Status: `next`.
4. `geometry_handoff_map` — Route retained event-scale clues to their existing owner lanes without promoting observations as native geometry. Status: `pending`.

## Detailed Task Inventory

1. `event_scale_taxonomy` - Build the operator-facing event-class map for neutron stars, compact-star collapse, black holes, AGN and quasar jets, supernovae, kilonovae, mergers, gamma-ray bursts, high-energy neutrinos, cosmic rays, and catastrophic or diffuse release candidates. Group records only when one declared carrier target, under predeclared parameter variation, can satisfy each complete record within declared uncertainty and cross-channel covariance without hidden retuning. Status: `next`. Depends on: none.
2. `equation_family_survey` - Examine the standard equation families for black holes proper, neutron-star support, black-hole / neutron-star / mixed compact-object mergers, jet and wind release, black-hole formation by collapse, and CMB energy distribution by scale, then assign each family to one same-record carrier target. Status: `started`; black-hole-proper is now split into [EQ-07C](../../mapping-equations/eq-07c-black-hole-horizon-interface-noether-braid-map.md). Depends on: `event_scale_taxonomy`.
3. `source_window_carrier_map` - For each retained event class, distinguish source window and history, observer benchmark and validity regime, channel-resolved event ledger, remnant and medium update, uncertainty and cross-channel covariance, owning route, no-hidden-retune witness, and first verification incomplete blocker before sending it into equation mapping or strong-field closure. Require the detachability test below before observer pressure is admitted. The first scoped trial is an EQ-07A compact-star observer-routing record with the native carrier field left unresolved. Status: `pending`. Depends on: `event_scale_taxonomy`, `equation_family_survey`.
4. `geometry_handoff_map` - Route event-scale clues into [strong-field-closure](../priorities.md), [EQ-07A](../../mapping-equations/eq-07a-compact-star-support-collapse-scale-residual.md), [EQ-07B](../../mapping-equations/eq-07b-black-hole-accretion-jet-release-horizon-thermodynamics.md), [EQ-07C](../../mapping-equations/eq-07c-black-hole-horizon-interface-noether-braid-map.md), [EQ-11A](../../mapping-equations/eq-11a-gravitational-wave-source-recovery.md), [EQ-23A](../../mapping-equations/eq-23a-stellar-explosive-nucleosynthesis-shock-reaction-networks.md), [EQ-25 CMB thermalization](../../mapping-equations/eq-25-theta-therm-cmb-source-field-map.md), radiation, cosmology, and nuclear / Standard Model closure without promoting observations as native geometry. Status: `pending`. Depends on: `source_window_carrier_map`.
5. `observational_constraint_shelf` - Keep candidate source families and observation leads visible only when they supply a benchmark equation, source-window record, event ledger, source-mining target, or discriminating observable. Status: `pending`. Depends on: `event_scale_taxonomy`.

## Scope

This priority-candidate bucket owns event-scale astrophysical routing. It is the place to talk about high-energy objects and events at scale: compact stars, black holes, supernovae, kilonovae, mergers, jets, transients, high-energy neutrinos, cosmic rays, CMB-scale energy distribution clues, and related source or sink families.

It does not replace [strong-field-closure](../priorities.md). Strong-field closure owns the native Noether braid / Noether sea geometry side: horizon-interface boundary conditions, maximum-curvature packed-state barriers, terminal alignment, entropy targets, release-channel selection, and observer-level strong-field predictions.

The intended flow is:

```text
high-energy astrophysics event class
-> source-window carrier and observer benchmark
-> equation-mapping or residual-routing packet
-> native geometry closure lane
```

In plain terms, this bucket collects the large-scale event facts and pressure points. The geometry lanes decide what those facts imply about the Noether braid, Noether sea response, compact-region support, release channels, and event-ledger closure.

## Event-Scale Carrier Shell

For a high-energy astrophysical event class $C$, source domain $\Omega$, source window $W_{\mathrm{src}}$, and readout interval $T$, the first routing object is only a carrier shell:

$$
\Theta_{\mathrm{HEA}}(C,\Omega,W_{\mathrm{src}},T)
=
\left(
C,
\Omega,
W_{\mathrm{src}},
T,
\Theta_{\mathrm{src}},
\mathcal{H}_{\mathrm{src}},
\mathcal{L}_{E\mathbf{p}\mathbf{J}},
\mathcal{N}_{\mathrm{sea}},
\mathcal{B}_{\mathrm{std}},
\mathcal{V}_{\mathrm{std}},
\mathcal{O}_{\mathrm{obs}},
\Sigma_{\mathrm{obs}},
\Pi_{\mathrm{route}},
\mathcal{S}_{\mathrm{retune}}
\right).
$$

Here $\Theta_{\mathrm{src}}$ is the declared source state, $\mathcal{H}_{\mathrm{src}}$ is the relevant source history, $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ is the channel-resolved event ledger for energy, momentum, angular momentum, remnant, recoil, and medium update, $\mathcal{N}_{\mathrm{sea}}$ records the relevant Noether sea state or update, $\mathcal{B}_{\mathrm{std}}$ carries observer-level benchmark equations, $\mathcal{V}_{\mathrm{std}}$ declares their validity regime, $\mathcal{O}_{\mathrm{obs}}$ carries the observation family and declared observable map, $\Sigma_{\mathrm{obs}}$ carries uncertainty including cross-channel covariance, $\Pi_{\mathrm{route}}$ names the owning equation or geometry packet, and $\mathcal{S}_{\mathrm{retune}}$ is the no-hidden-retune witness.

This shell is not accepted evidence. It becomes useful only when the same source window and support record bind the event ledger, observer benchmark, remnant or medium update, and downstream geometry route. If those rows require separate source windows or private fitted states, the event remains a comparison clue rather than a closure object.

### Event-Class Equivalence

For two event records $D_a$ and $D_b$, write $D_a\sim_{\mathrm{HEA}}D_b$ only if there is one declared carrier target $\Theta_\Pi(\lambda)$ and one predeclared allowed parameter domain $\Lambda_\Pi$ such that parameters $\lambda_a,\lambda_b\in\Lambda_\Pi$ satisfy both complete covariance-aware observer residuals and both no-hidden-retune witnesses:

$$
\mathcal{R}_{\mathrm{obs}}
\left(
D_k\mid\Theta_\Pi(\lambda_k),\Sigma_k
\right)
\le \epsilon_k,
\qquad
\mathcal{S}_{\mathrm{retune},k}
\ \text{passes},
\qquad
k\in\{a,b\}.
$$

Plainly: two records share an event class only when one declared kind of carrier target can cover both within their stated uncertainty using only the parameter changes allowed in advance. A shared object label, visual resemblance, waveform resemblance, release-channel resemblance, or far-field likeness is insufficient.

Compact-star and black-hole records remain separate under this relation unless the full source-window records satisfy it. Black-hole/black-hole, neutron-star/neutron-star, and mixed merger records also remain separate unless their waveform, matter/ejecta, remnant, release, and medium-update rows pass the same declared target. Similar release channels do not establish equivalent source windows.

### Observer-Benchmark Detachability

An observation supplies legitimate observer-level benchmark pressure only when it enters through a declared observable map, its uncertainty-aware residual can fail, and removing that observation leaves the substrate premise set unchanged. This is a proposed routing test, not an accepted theorem or a claim that any current observable map has passed it.

Plainly: an observation may test the candidate theory, but it may not silently become one of the architrino-level rules used to construct the candidate.

### First Scoped Trial: EQ-07A Compact-Star Support

The smallest safe first implementation step is to prepare one EQ-07A compact-star observer-routing record containing:

- one quasi-static source window and its relevant source history;
- the selected Chandrasekhar or TOV observer benchmark rows and declared validity regime;
- channel-resolved support/readout rows, with any remnant and medium update stated explicitly;
- the uncertainty record and cross-channel covariance used by the observer residual;
- the EQ-07A owner route and current first blocker;
- the no-hidden-retune witness; and
- the detachability disposition for each observer benchmark.

Leave the native carrier field unresolved. The trial is a coordination record shape only: it does not name or promote a compact-region carrier, establish retention or stability, supply a dense-matter branch, demonstrate physical realization, create accepted evidence, or change the EQ-07A score. Population rates, distributions, selection effects, and other ensemble statistics are out of scope for this single-event trial unless an existing owner later supplies an explicit ensemble route.

## Equation Examination Capture

The near-term research question is not a general literature survey. It is a same-record equation survey: choose the standard equations that make each high-energy source class hard to fake, then ask what Noether braid, Noether sea, event-ledger, and observer-readout rows must be bound to the same carrier.

For an event family $C$, source domain $\Omega$, source window $W_{\mathrm{src}}$, equation family $\mathcal{E}$, and readout interval $T$, the survey object is
$$
\Theta_{\mathrm{HEA,eq}}(C,\Omega,W_{\mathrm{src}},\mathcal{E},T)
=
\left(
\Theta_{\mathrm{HEA}},
\mathcal{B}_{\mathrm{std}}^{\mathcal{E}},
\mathcal{R}_{\mathcal{E}},
\Pi_{\mathrm{native}},
\mathcal{S}_{\mathrm{retune}}
\right),
$$
where $\mathcal{B}_{\mathrm{std}}^{\mathcal{E}}$ is the selected observer-level equation family, $\mathcal{R}_{\mathcal{E}}$ is the residual target, $\Pi_{\mathrm{native}}$ names the projection into the owning native geometry or equation packet, and $\mathcal{S}_{\mathrm{retune}}$ rejects separately fitted source states.

| Equation family to examine | Standard benchmark pressure | First route | First blocker or capture discipline |
| --- | --- | --- | --- |
| Black holes proper, excluding accretion disk as the primary object | Schwarzschild/Kerr horizon scales, trapped-surface comparison, surface gravity / area / entropy rows, exterior $(M,\mathbf{J},Q)$ readout, light-ring / null-orbit rows, planar-photon recovery when photon-path evidence is consumed, finite-curvature continuation, and ringdown labels when a remnant is involved. | [EQ-07C black-hole horizon-interface map](../../mapping-equations/eq-07c-black-hole-horizon-interface-noether-braid-map.md), [strong-field-closure](../priorities.md), [black-holes](../../../../content/markdown/aaa/spacetime/black-holes.md), and [singularity-resolution](../../../../content/markdown/aaa/spacetime/singularity-resolution.md). | `missing_accepted_black_hole_horizon_interface_carrier`; the accepted carrier must bind $F_H=0$, terminal-alignment rows, light-ring/null-orbit separation or derived coincidence, planar-photon recovery when used, $\mathcal{R}_H(\Omega)<\infty$, $\mathcal{B}_H(M,\mathbf{J},Q)$, and exterior metric readout without private horizon state. |
| Neutron stars and compact-star support | Fermi-state counting, $P_{e,\mathrm{nr}}\propto\rho^{5/3}$, $P_{e,\mathrm{rel}}\propto\rho^{4/3}$, $M_{\mathrm{Ch}}\propto Y_e^2M_\odot$, TOV pressure balance, mass-radius / compactness / tidal-readout rows. | [EQ-07A compact-star support](../../mapping-equations/eq-07a-compact-star-support-collapse-scale-residual.md) and [strong-field-closure](../priorities.md). | `missing_accepted_compact_region_carrier`; neutron-star radial support, dense-matter support, compact-region event ledger, and exterior metric response must share one compact-region carrier. |
| Binary mergers of compact objects | Chirp mass, inspiral frequency drift, Peters-Mathews orbital decay, quadrupole power, strain flux, radiated energy / angular momentum, remnant mass/spin, ringdown labels, kilonova/ejecta rows for neutron-rich mergers. | [EQ-11A gravitational-wave source recovery](../../mapping-equations/eq-11a-gravitational-wave-source-recovery.md), compact-star support for matter-bearing mergers, and [strong-field-closure](../priorities.md). | Keep black-hole / black-hole, neutron-star / neutron-star, and mixed mergers separated until one event ledger binds waveform, matter/ejecta, remnant, ringdown, release, and Noether sea update rows. |
| Jets, winds, and release channels | Eddington-style limits, launch radius / escape speed comparisons, Blandford-Znajek-style jet-power comparison, collimation, loading, luminosity, neutrino / cosmic-ray channels, and feedback work on the surrounding medium. | [EQ-07B accretion / release](../../mapping-equations/eq-07b-black-hole-accretion-jet-release-horizon-thermodynamics.md), [radiation](../../../../content/markdown/aaa/reactions/radiation.md), and release-channel selection under [strong-field-closure](../priorities.md). | `missing_accepted_agn_accretion_release_carrier`; jet evidence can sharpen the release selector but cannot stand in for the black-hole-proper horizon carrier. |
| Black-hole formation by collapse | Chandrasekhar support loss, electron capture, photodisintegration, neutrino transport, TOV failure, trapped-surface comparison, compact-region ledger closure, and horizon-interface activation. | [EQ-07A compact-star support](../../mapping-equations/eq-07a-compact-star-support-collapse-scale-residual.md), [EQ-23A explosive source window](../../mapping-equations/eq-23a-stellar-explosive-nucleosynthesis-shock-reaction-networks.md), and [singularity-resolution](../../../../content/markdown/aaa/spacetime/singularity-resolution.md). | Collapse must not switch carriers at the horizon handoff: support failure, reaction inventory, compact-region ledger, metric compliance, and $F_H=0$ must be projections of one retained source history or explicitly split with a failure reason. |
| CMB energy distribution by scale | Blackbody energy density, spectral-distortion controls, anisotropy and polarization spectra, damping scale, lensing handoff, BBN/recombination provenance, and any proposed horizon/release contribution to photon loading. | [EQ-25 CMB thermalization](../../mapping-equations/eq-25-theta-therm-cmb-source-field-map.md), [EQ-17 transfer](../../mapping-equations/eq-17-theta-transfer-source-field-map.md), [EQ-18/19 theta-cos](../../mapping-equations/eq-18-19-theta-cos-source-field-map.md), and [CMB](../../../../content/markdown/aaa/cosmology/CMB.md). | `missing_accepted_theta_therm` and related `theta_transfer` / `theta_cos` blockers; energy-by-scale clues are admissible only if the same source-to-decoupling path preserves spectrum, anisotropy, polarization, damping, lensing, BBN handoff, and no-hidden-retune witnesses. |

Readable architecture and equation notes for this survey live in [brainstorming.md](brainstorming.md#equation-id-variable-coverage-matrix). This control file keeps the active queue, routing, blockers, and promotion state.

## Routing Map

| Event family | First priority route | Native or corpus consumer | First blocker or discipline |
| --- | --- | --- | --- |
| White dwarfs, neutron stars, compact-star support, and collapse predecessor sequences | [EQ-07A compact-star support](../../mapping-equations/eq-07a-compact-star-support-collapse-scale-residual.md) | [strong-field-closure](../priorities.md), [black-holes](../../../../content/markdown/aaa/spacetime/black-holes.md), [singularity-resolution](../../../../content/markdown/aaa/spacetime/singularity-resolution.md), [Nested Shell Braid Geometry](../../../../content/markdown/aaa/noether-braid/braid-envelope-geometry.md) | `missing_accepted_compact_region_carrier`; compact-star support and exterior metric response must share one retained compact-region record. |
| Black holes proper: horizon, terminal alignment, light-ring/null-orbit separation, planar-photon recovery when used, interior continuation, exterior $(M,\mathbf{J},Q)$, entropy, and ringdown-facing remnant rows | [EQ-07C black-hole horizon-interface map](../../mapping-equations/eq-07c-black-hole-horizon-interface-noether-braid-map.md) and [strong-field-closure](../priorities.md) | [black-holes](../../../../content/markdown/aaa/spacetime/black-holes.md), [singularity-resolution](../../../../content/markdown/aaa/spacetime/singularity-resolution.md), [general-relativity](../../../../content/markdown/aaa/spacetime/general-relativity.md) | `missing_accepted_black_hole_horizon_interface_carrier`; black-hole-proper equations must not be satisfied by an accretion/release carrier, terminal-alignment row, light-ring row, or planar-photon row alone. |
| AGN, accretion disks, quasar winds, jets, and feedback | [EQ-07B accretion / release](../../mapping-equations/eq-07b-black-hole-accretion-jet-release-horizon-thermodynamics.md) and [strong-field-closure](../priorities.md) | [black-holes](../../../../content/markdown/aaa/spacetime/black-holes.md), [radiation](../../../../content/markdown/aaa/reactions/radiation.md), [dark-energy](../../../../content/markdown/aaa/cosmology/dark-energy.md) | `missing_accepted_agn_accretion_release_carrier`; inflow, radiation, jet, feedback, Noether sea loading, and horizon rows must not be fitted as separate states. |
| Supernovae, novae, kilonovae, shock-driven explosive nucleosynthesis, and radioactive light-curve families | [EQ-23A explosive source window](../../mapping-equations/eq-23a-stellar-explosive-nucleosynthesis-shock-reaction-networks.md) | [BBN Constraints](../../../../content/markdown/aaa/cosmology/BBN-constraints.md), [radiation](../../../../content/markdown/aaa/reactions/radiation.md), [nuclear-binding](../../../../content/markdown/aaa/nuclear-atomic/nuclear-binding.md) | `missing_accepted_explosive_source_window_carrier`; shock, neutrino heating, yield, radioactive inventory, photon output, remnant, and medium update must share one source window. |
| Compact-object mergers, ringdown, and multimessenger gravitational-wave events | [gravitational-waves](../../mapping-benchmarks/gravitational-waves.md), [binary-pulsar-orbital-decay](../../mapping-benchmarks/binary-pulsar-orbital-decay.md), and [strong-field-closure](../priorities.md) | [gravitational-waves](../../../../content/markdown/aaa/spacetime/gravitational-waves.md), [general-relativity](../../../../content/markdown/aaa/spacetime/general-relativity.md), [singularity-resolution](../../../../content/markdown/aaa/spacetime/singularity-resolution.md) | Keep waveform phase, energy loss, remnant, ringdown, and release rows on one event ledger before reading merger data as Noether braid geometry evidence. |
| Gamma-ray bursts, high-energy neutrinos, cosmic rays, and extreme transients | This file until a source-window packet exists | [radiation](../../../../content/markdown/aaa/reactions/radiation.md), residual-routing event ledger, [dark-sector](../../dark-sector/priorities.md), [cosmology-closure](../../cosmology-closure/priorities.md) | Candidate-only unless the event class supplies a concrete source window, channel residual, event ledger, remnant or medium update, and discriminating observable. |
| Little Red Dots, high-redshift compact AGN candidates, direct-collapse candidates, and dense SMBH cocoons | [dark-sector photon-like mode](../../dark-sector/dark-sector-photon-like-mode.md), [EQ-07B](../../mapping-equations/eq-07b-black-hole-accretion-jet-release-horizon-thermodynamics.md), and [cosmology-closure](../../cosmology-closure/priorities.md) | [black-holes](../../../../content/markdown/aaa/spacetime/black-holes.md), [CMB](../../../../content/markdown/aaa/cosmology/CMB.md), [radiation](../../../../content/markdown/aaa/reactions/radiation.md) | Ordinary AGN, dense gas, dust, direct-collapse, starburst, and stellar-population explanations remain active controls before a dark-sector or release-channel residual can be promoted. |
| CMB energy distribution by scale when high-energy source or sink histories are proposed | [EQ-25 CMB thermalization](../../mapping-equations/eq-25-theta-therm-cmb-source-field-map.md), [EQ-17 transfer](../../mapping-equations/eq-17-theta-transfer-source-field-map.md), and [EQ-18/19 theta-cos](../../mapping-equations/eq-18-19-theta-cos-source-field-map.md) | [CMB](../../../../content/markdown/aaa/cosmology/CMB.md), [BBN Constraints](../../../../content/markdown/aaa/cosmology/BBN-constraints.md), [structure-formation](../../../../content/markdown/aaa/cosmology/structure-formation.md) | `missing_accepted_theta_therm` / `missing_accepted_theta_transfer` / `missing_accepted_theta_cos`; scale-energy claims must preserve the same source-to-decoupling path and cannot be repaired by a spectrum-only fit. |

## Promotion Map

| Task | Detailed source | Primary promotion target | Promotion gate |
| --- | --- | --- | --- |
| `event_scale_taxonomy` | This file | This file and [open-problems](../../open-problems/priorities.md) | Event classes are grouped by source-window and ledger needs, not by loose object labels. |
| `equation_family_survey` | This file plus [EQ-07A](../../mapping-equations/eq-07a-compact-star-support-collapse-scale-residual.md), [EQ-07B](../../mapping-equations/eq-07b-black-hole-accretion-jet-release-horizon-thermodynamics.md), [EQ-07C](../../mapping-equations/eq-07c-black-hole-horizon-interface-noether-braid-map.md), [EQ-11A](../../mapping-equations/eq-11a-gravitational-wave-source-recovery.md), [EQ-23A](../../mapping-equations/eq-23a-stellar-explosive-nucleosynthesis-shock-reaction-networks.md), [EQ-25 CMB thermalization](../../mapping-equations/eq-25-theta-therm-cmb-source-field-map.md), and [strong-field-closure](../priorities.md) | [EQ-07C](../../mapping-equations/eq-07c-black-hole-horizon-interface-noether-braid-map.md), future equation-mapping packets, [black-holes](../../../../content/markdown/aaa/spacetime/black-holes.md), [singularity-resolution](../../../../content/markdown/aaa/spacetime/singularity-resolution.md), [gravitational-waves](../../../../content/markdown/aaa/spacetime/gravitational-waves.md), and [CMB](../../../../content/markdown/aaa/cosmology/CMB.md) | Each event class names a benchmark equation family, native projection, first blocker, and no-hidden-retune witness before any claim is promoted. |
| `source_window_carrier_map` | This file plus [EQ-07A](../../mapping-equations/eq-07a-compact-star-support-collapse-scale-residual.md), [EQ-07B](../../mapping-equations/eq-07b-black-hole-accretion-jet-release-horizon-thermodynamics.md), [EQ-07C](../../mapping-equations/eq-07c-black-hole-horizon-interface-noether-braid-map.md), and [EQ-23A](../../mapping-equations/eq-23a-stellar-explosive-nucleosynthesis-shock-reaction-networks.md) | [closure-scorecard](../../../../content/markdown/aaa/validation/closure-scorecard.md), [failure-criteria](../../../../content/markdown/aaa/validation/failure-criteria.md), and the local event-family packets | A source-window carrier names the same source id, support id, event ledger, observation family, and no-hidden-retune witness before residual arithmetic or score movement is considered. |
| `geometry_handoff_map` | This file | [strong-field-closure](../priorities.md), [cosmology-closure](../../cosmology-closure/priorities.md), [radiation](../../../../content/markdown/aaa/reactions/radiation.md), and [nuclear-binding](../../../../content/markdown/aaa/nuclear-atomic/nuclear-binding.md) | Event-scale facts are routed as pressure on native derivations, not as direct proof of Noether braid geometry. |
| `observational_constraint_shelf` | This file and [source-mining](../../source-mining/priorities.md) | Later source-mining packets or event-family packets | A lead stays only if it names a benchmark equation, data release, source family, event ledger, or discriminating observable. |

## Boundaries

- Keep this bucket unranked until it has at least one accepted source-window carrier or a concrete event-family packet strong enough to score.
- Do not duplicate strong-field closure. This bucket routes high-energy event evidence; [strong-field-closure](../priorities.md) owns native horizon-interface and compact-region geometry.
- Do not let jet, wind, or accretion equations substitute for black-hole-proper horizon/interior equations. They may supply release-channel constraints only after the horizon-interface carrier is named.
- Treat CMB energy distribution by scale as a source/transport/thermalization constraint, not as a generic cosmology rewrite. It belongs here only when a high-energy source or sink history is being tested against one shared CMB carrier.
- Do not turn a source family into a new validation gate by name alone. Add a new obligation only when it protects a tested observable or live derivation that existing equation-mapping, residual-routing, radiation, strong-field, cosmology, or Standard Model packets do not already cover.
- Treat supernova classes, GRB classes, AGN subclasses, and compact-object populations as benchmark labels until a same-record carrier makes them equation-bearing.

## Related Priorities

- [strong-field-closure](../priorities.md)
- [mapping-equations](../../mapping-equations/priorities.md)
- residual-routing event ledger
- [radiation](../../../../content/markdown/aaa/reactions/radiation.md)
- [cosmology-closure](../../cosmology-closure/priorities.md)
- [dark-sector](../../dark-sector/priorities.md)
- [standard-model-closure](../../standard-model-closure/priorities.md)
- [nuclear-atomic-molecular-closure](../../nuclear-atomic-molecular-closure/priorities.md)
- [source-mining](../../source-mining/priorities.md)
