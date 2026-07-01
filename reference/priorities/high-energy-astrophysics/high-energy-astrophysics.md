# High-Energy Astrophysics

## Workstream Metadata

- Kind: `priority-candidate`
- Rank: `unranked`
- Value: `unscored`
- Cost: `unscored`
- ROI: `unscored`
- Status: `routing`

## Task Queue

1. `event_scale_taxonomy` - Build the operator-facing event-class map for neutron stars, compact-star collapse, black holes, AGN and quasar jets, supernovae, kilonovae, mergers, gamma-ray bursts, high-energy neutrinos, cosmic rays, and catastrophic or diffuse release candidates. Status: `next`. Depends on: none.
2. `source_window_carrier_map` - For each retained event class, name the source-window carrier, event-ledger rows, observer benchmarks, first fail-closed blocker, and owning closure lane before sending it into equation mapping or strong-field closure. Status: `pending`. Depends on: `event_scale_taxonomy`.
3. `geometry_handoff_map` - Route event-scale clues into [strong-field-closure](../strong-field-closure/strong-field-closure.md), [EQ-07A](../equation-mapping/eq-07a-compact-star-support-collapse-scale-residual.md), [EQ-07B](../equation-mapping/eq-07b-black-hole-accretion-jet-release-horizon-thermodynamics.md), [EQ-23A](../equation-mapping/eq-23a-stellar-explosive-nucleosynthesis-shock-reaction-networks.md), radiation, cosmology, and nuclear / Standard Model closure without promoting observations as native geometry. Status: `pending`. Depends on: `source_window_carrier_map`.
4. `observational_constraint_shelf` - Keep candidate source families and observation leads visible only when they supply a benchmark equation, source-window record, event ledger, source-mining target, or discriminating observable. Status: `pending`. Depends on: `event_scale_taxonomy`.

## Scope

This priority-candidate bucket owns event-scale astrophysical routing. It is the place to talk about high-energy objects and events at scale: compact stars, black holes, supernovae, kilonovae, mergers, jets, transients, high-energy neutrinos, cosmic rays, and related source or sink families.

It does not replace [strong-field-closure](../strong-field-closure/strong-field-closure.md). Strong-field closure owns the native Noether braid / Noether sea geometry side: horizon-interface boundary conditions, maximum-curvature packed-state barriers, terminal alignment, entropy targets, release-channel selection, and observer-level strong-field predictions.

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
\mathcal{L}_{E\mathbf{p}\mathbf{J}},
\mathcal{N}_{\mathrm{sea}},
\mathcal{B}_{\mathrm{std}},
\mathcal{O}_{\mathrm{obs}},
\Pi_{\mathrm{route}},
\mathcal{S}_{\mathrm{retune}}
\right).
$$

Here $\Theta_{\mathrm{src}}$ is the declared source state, $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ is the event ledger for energy, momentum, angular momentum, remnant, recoil, and medium update, $\mathcal{N}_{\mathrm{sea}}$ records the relevant Noether sea state or update, $\mathcal{B}_{\mathrm{std}}$ carries observer-level benchmark equations, $\mathcal{O}_{\mathrm{obs}}$ carries the observation family, $\Pi_{\mathrm{route}}$ names the owning equation or geometry packet, and $\mathcal{S}_{\mathrm{retune}}$ is the no-hidden-retune witness.

This shell is not accepted evidence. It becomes useful only when the same source window and support record bind the event ledger, observer benchmark, remnant or medium update, and downstream geometry route. If those rows require separate source windows or private fitted states, the event remains a comparison clue rather than a closure object.

## Routing Map

| Event family | First priority route | Native or corpus consumer | First blocker or discipline |
| --- | --- | --- | --- |
| White dwarfs, neutron stars, compact-star support, and collapse predecessor sequences | [EQ-07A compact-star support](../equation-mapping/eq-07a-compact-star-support-collapse-scale-residual.md) | [strong-field-closure](../strong-field-closure/strong-field-closure.md), [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md), [singularity-resolution](../../../content/markdown/aaa/spacetime/singularity-resolution.md), [Nested Shell Braid Geometry](../../../content/markdown/aaa/noether-braid/nested-shell-braid-geometry.md) | `missing_accepted_compact_region_carrier`; compact-star support and exterior metric response must share one retained compact-region record. |
| Black holes, AGN, accretion disks, quasar winds, jets, and feedback | [EQ-07B accretion / release](../equation-mapping/eq-07b-black-hole-accretion-jet-release-horizon-thermodynamics.md) and [strong-field-closure](../strong-field-closure/strong-field-closure.md) | [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md), [radiation](../../../content/markdown/aaa/reactions/radiation.md), [dark-energy](../../../content/markdown/aaa/cosmology/dark-energy.md) | `missing_accepted_agn_accretion_release_carrier`; inflow, radiation, jet, feedback, Noether sea loading, and horizon rows must not be fitted as separate states. |
| Supernovae, novae, kilonovae, shock-driven explosive nucleosynthesis, and radioactive light-curve families | [EQ-23A explosive source window](../equation-mapping/eq-23a-stellar-explosive-nucleosynthesis-shock-reaction-networks.md) | [BBN Constraints](../../../content/markdown/aaa/cosmology/BBN-constraints.md), [radiation](../../../content/markdown/aaa/reactions/radiation.md), [nuclear-binding](../../../content/markdown/aaa/nuclear-atomic/nuclear-binding.md) | `missing_accepted_explosive_source_window_carrier`; shock, neutrino heating, yield, radioactive inventory, photon output, remnant, and medium update must share one source window. |
| Compact-object mergers, ringdown, and multimessenger gravitational-wave events | [gravitational-waves](../cross-theory-mapping/gravitational-waves.md), [binary-pulsar-orbital-decay](../cross-theory-mapping/binary-pulsar-orbital-decay.md), and [strong-field-closure](../strong-field-closure/strong-field-closure.md) | [gravitational-waves](../../../content/markdown/aaa/spacetime/gravitational-waves.md), [general-relativity](../../../content/markdown/aaa/spacetime/general-relativity.md), [singularity-resolution](../../../content/markdown/aaa/spacetime/singularity-resolution.md) | Keep waveform phase, energy loss, remnant, ringdown, and release rows on one event ledger before reading merger data as Noether braid geometry evidence. |
| Gamma-ray bursts, high-energy neutrinos, cosmic rays, and extreme transients | This file until a source-window packet exists | [radiation](../../../content/markdown/aaa/reactions/radiation.md), [residual-routing event ledger](../braid-nested-shell-causal-closure/residual-routing-event-ledger.md), [dark-sector](../dark-sector/dark-sector.md), [cosmology-closure](../cosmology-closure/cosmology-closure.md) | Candidate-only unless the event class supplies a concrete source window, channel residual, event ledger, remnant or medium update, and discriminating observable. |
| Little Red Dots, high-redshift compact AGN candidates, direct-collapse candidates, and dense SMBH cocoons | [dark-sector photon-like mode](../dark-sector/dark-sector-photon-like-mode.md), [EQ-07B](../equation-mapping/eq-07b-black-hole-accretion-jet-release-horizon-thermodynamics.md), and [cosmology-closure](../cosmology-closure/cosmology-closure.md) | [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md), [CMB](../../../content/markdown/aaa/cosmology/CMB.md), [radiation](../../../content/markdown/aaa/reactions/radiation.md) | Ordinary AGN, dense gas, dust, direct-collapse, starburst, and stellar-population explanations remain active controls before a dark-sector or release-channel residual can be promoted. |

## Promotion Map

| Task | Detailed source | Primary promotion target | Promotion gate |
| --- | --- | --- | --- |
| `event_scale_taxonomy` | This file | This file and [open-problems](../open-problems/open-problems.md) | Event classes are grouped by source-window and ledger needs, not by loose object labels. |
| `source_window_carrier_map` | This file plus [EQ-07A](../equation-mapping/eq-07a-compact-star-support-collapse-scale-residual.md), [EQ-07B](../equation-mapping/eq-07b-black-hole-accretion-jet-release-horizon-thermodynamics.md), and [EQ-23A](../equation-mapping/eq-23a-stellar-explosive-nucleosynthesis-shock-reaction-networks.md) | [closure-scorecard](../../../content/markdown/aaa/validation/closure-scorecard.md), [failure-criteria](../../../content/markdown/aaa/validation/failure-criteria.md), and the local event-family packets | A source-window carrier names the same source id, support id, event ledger, observation family, and no-hidden-retune witness before residual arithmetic or score movement is considered. |
| `geometry_handoff_map` | This file | [strong-field-closure](../strong-field-closure/strong-field-closure.md), [cosmology-closure](../cosmology-closure/cosmology-closure.md), [radiation](../../../content/markdown/aaa/reactions/radiation.md), and [nuclear-binding](../../../content/markdown/aaa/nuclear-atomic/nuclear-binding.md) | Event-scale facts are routed as pressure on native derivations, not as direct proof of Noether braid geometry. |
| `observational_constraint_shelf` | This file and [source-mining](../source-mining/source-mining.md) | Later source-mining packets or event-family packets | A lead stays only if it names a benchmark equation, data release, source family, event ledger, or discriminating observable. |

## Boundaries

- Keep this bucket unranked until it has at least one accepted source-window carrier or a concrete event-family packet strong enough to score.
- Do not duplicate strong-field closure. This bucket routes high-energy event evidence; [strong-field-closure](../strong-field-closure/strong-field-closure.md) owns native horizon-interface and compact-region geometry.
- Do not turn a source family into a new validation gate by name alone. Add a new obligation only when it protects a tested observable or live derivation that existing equation-mapping, residual-routing, radiation, strong-field, cosmology, or Standard Model packets do not already cover.
- Treat supernova classes, GRB classes, AGN subclasses, and compact-object populations as benchmark labels until a same-record carrier makes them equation-bearing.

## Related Priorities

- [strong-field-closure](../strong-field-closure/strong-field-closure.md)
- [equation-mapping](../equation-mapping/equation-mapping.md)
- [residual-routing event ledger](../braid-nested-shell-causal-closure/residual-routing-event-ledger.md)
- [radiation](../../../content/markdown/aaa/reactions/radiation.md)
- [cosmology-closure](../cosmology-closure/cosmology-closure.md)
- [dark-sector](../dark-sector/dark-sector.md)
- [standard-model-closure](../standard-model-closure/standard-model-closure.md)
- [nuclear-atomic-molecular-closure](../nuclear-atomic-molecular-closure/nuclear-atomic-molecular-closure.md)
- [source-mining](../source-mining/source-mining.md)
