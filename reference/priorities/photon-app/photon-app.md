# Photon App

## Workstream Metadata

- Kind: `priority-app`
- Rank: `proposed`
- Value: `high`
- Cost: `unscored`
- ROI: `unscored`
- Status: `active`

## Current

This folder owns the next photon-focused application project. The first packet is [photon-app-requirements](photon-app-requirements.md), which stages the visual model, controls, polarization panel, formula panel, and implementation boundaries for the initial app.

The app begins from the candidate photon picture already used in the photon Gate B priority material: a coaxial contra-rotating planar pair whose observer-facing transverse ledger must still be derived, tested, and routed through analyzer behavior. This priority packet does not claim photon closure, Malus-law recovery, helicity recovery, or a physical free photon branch.

The implementation name should be `photon`: use `photon.html` for the route and `src/apps/photon/` for dedicated source files.

## Objective

Build a 2D interactive diagnostic for a photon candidate modeled as two contra-rotating flat Noether swarms moving at $c_f$ in the first version, with a later path to local $c$. The app should make the pair geometry, binary rotation, layer frequencies, layer radii, layer phases, pair separation, polarization controls, and observer-level field readouts adjustable enough to support exploratory closure work.

## Scope

The first implementation should include:

- two side-by-side flat Noether swarm views;
- counter-clockwise rotation in the left trailing swarm and clockwise rotation in the right leading swarm;
- per-swarm controls for I/M/O frequency, radius, and phase in degrees;
- pair separation along the line of translation;
- architrino markers, path tinting, and layered trails that match the Ideal Swarm app visual grammar;
- pause/play and reset controls;
- a lower observer-field panel for external $\mathbf E$ and comparison $\mathbf B$ readouts;
- polarization visualization controls;
- and a formula panel containing Malus' law plus the additional polarization formulas needed by the diagnostic.

The first implementation should not include:

- a 3D swarm renderer;
- group rotation of the 2D swarm views;
- a claim that the app proves photon closure;
- or reader-facing corpus promotion before the app supplies useful diagnostics.

## Task Queue

1. `requirements_seed` - Stage the first requirements packet for the photon app, including candidate model, layout, controls, formulas, diagnostics, and implementation boundaries. Status: `staged`; packet: [photon-app-requirements](photon-app-requirements.md).
2. `runtime_boundary` - Use `photon.html` and `src/apps/photon/`, then choose focused modules and shared helper boundaries before implementation begins. Status: `open`.
3. `two_swarm_stage` - Implement the 2D side-by-side flat Noether swarm renderer with I/M/O layers, binary rotation, Ideal Swarm-style architrino markers and trails, propagation cue, and pair-separation control. Status: `open`.
4. `observer_field_panel` - Implement the lower $\mathbf E$ / comparison $\mathbf B$ field panel with phase, amplitude, and polarization readouts derived from the current candidate parameters. Status: `open`.
5. `polarization_formula_panel` - Implement polarization controls, analyzer angle, Malus-law readout, and related formula diagnostics without treating observer formulas as substrate proof. Status: `open`.
6. `preset_and_diagnostic_capture` - Add parameter presets, import/export, and snapshot diagnostics so exploratory states can be preserved for later proof or simulation packets. Status: `open`.

## Claim Discipline

The photon app is an exploratory diagnostic. It may visualize candidate planar-pair behavior, expose residual-style readouts, and help identify promising parameter regimes. It must not promote a parameter preset, animation state, or visual fit into a photon Gate B pass without a separate branch certificate or simulation packet that populates the needed substrate ledger rows.

## Related Priorities

- [Photon planar-pair ledger substrate packet](../angular-momentum-spin/photon-planar-pair-ledger-substrate-packet.md)
- [Planar-pair symbolic substrate instance](../angular-momentum-spin/planar-pair-symbolic-substrate-instance.md)
- [Photon event ledger balance diagnostic](../angular-momentum-spin/photon-event-ledger-balance-diagnostic.md)
- [Malus' law](../cross-theory-mapping/malus-law.md)
