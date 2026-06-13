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

The first prototype now exists at `photon.html`. It implements the dedicated `src/apps/photon/` runtime, 2D side-by-side swarm stage, Ideal Swarm-style markers and trails, a three-cycle Virtual Observer $\mathbf E$ plot based on causal-root branch sums, visible controls, formulas, diagnostics, reset, JSON import/export, and an in-app Markdown document viewer.

The operator-facing app guide is [photon-guide](photon-guide.md). The photon UI exposes Markdown buttons for the guide, this project packet, and the requirements packet.

## Objective

Build a 2D interactive diagnostic for a photon candidate modeled as two contra-rotating flat Noether swarms moving at $c_f$ in the first version, with a later path to local $c$. The app should make the pair geometry, binary rotation, layer frequencies, layer radii, layer phases, pair separation, polarization controls, and observer-level field readouts adjustable enough to support exploratory closure work.

## Scope

The first implementation should include:

- two fixed-spacing face-on flat Noether swarm views plus an edge-on side view of the same pair;
- counter-clockwise rotation in the left trailing swarm and clockwise rotation in the right leading swarm;
- per-swarm controls for I/M/O frequency, radius, and phase in degrees;
- enabled checkboxes for each of the six binaries, default checked, with unchecked binaries removed from both the display and Virtual Observer branch sums;
- pair separation along the line of translation, shown by the edge-on side-view trace spacing;
- architrino markers, path tinting, and layered trails that match the Ideal Swarm app visual grammar;
- pause/play and reset controls;
- a lower observer-field panel for branch-weighted external $\mathbf E$ readouts at a configurable Virtual Observer coordinate;
- polarization visualization controls;
- a formula panel containing Malus' law plus the additional polarization formulas needed by the diagnostic;
- and in-app Markdown access to [photon-guide](photon-guide.md), [photon-app](photon-app.md), and [photon-app-requirements](photon-app-requirements.md).

The first implementation should not include:

- a 3D swarm renderer;
- group rotation of the 2D swarm views;
- a claim that the app proves photon closure;
- or reader-facing corpus promotion before the app supplies useful diagnostics.

## Task Queue

1. `named_presets` - Add named preset selection for balanced contra-rotating pair, linear polarization candidate, right circular candidate, left circular candidate, phase-offset stress test, and layer-radius stress test. Status: `open`.
2. `shared_visual_extraction` - Extract shared Ideal Swarm / photon architrino marker, orbit-path, tint-profile, and layered-trail helpers if the visual grammar needs to be maintained across both apps. Status: `open`.
3. `substrate_mapping_refinement` - Refine the Virtual Observer branch-sum mapping from I/M/O layer parameters to transverse observer-field amplitudes, while preserving claim discipline. Status: `open`.
4. `local_c_continuation` - Add a later speed mode that replaces fixed $c_f$ with local $c$ from declared Noether sea state variables. Status: `open`.

## Claim Discipline

The photon app is an exploratory diagnostic. It may visualize candidate planar-pair behavior, expose residual-style readouts, and help identify promising parameter regimes. It must not promote a parameter preset, animation state, or visual fit into a photon Gate B pass without a separate branch certificate or simulation packet that populates the needed substrate ledger rows.

## Related Priorities

- [Photon planar-pair ledger substrate packet](../angular-momentum-spin/photon-planar-pair-ledger-substrate-packet.md)
- [Planar-pair symbolic substrate instance](../angular-momentum-spin/planar-pair-symbolic-substrate-instance.md)
- [Photon event ledger balance diagnostic](../angular-momentum-spin/photon-event-ledger-balance-diagnostic.md)
- [Malus' law](../cross-theory-mapping/malus-law.md)
