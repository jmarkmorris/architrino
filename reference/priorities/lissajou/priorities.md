# Lissajou

## Workstream Metadata

- Kind: `priority-candidate`
- Rank: `unscored-candidate`
- Value: `unscored`
- Cost: `unscored`
- ROI: `unscored`
- Status: `idea`

## Scope

This lane investigates the correspondence between Lissajous-class figures and Noether braid phase closure. The working observation is that a single-frequency rotating-wave braid row traces a helix, while a second frequency — radial breathing against rotation, or nested-layer cadences — produces Lissajous-class figures, with the classical dichotomy mapping onto braid bookkeeping: closed Lissajous figures correspond to rational frequency locks, which are exactly the integer phase-closure winding counts $k_a$ recorded in the reduced closure label $\Lambda_{\text{NS}}$; irrational ratios give quasi-periodic torus-filling paths. On this reading, the winding integers select which Lissajous-type figure closes, and the frequency families such as `4:2:1` are specific closed figures in the catalog.

The lane is also an external-contact opportunity: Lissajous and spherical-Lissajous trajectories are well studied in optics, acoustics, orbital mechanics, and scanning systems, and published figure catalogs, stability results, and datasets may supply comparison material for braid phase-closure diagnostics without importing any external framework as a closure target.

## Task Queue

1. `lissajou_phase_closure_map` - State the exact correspondence between closed Lissajous figures on the reduced channels (planar, spherical, and torus cases) and the integer phase-closure labels, including which braid variables play the two-frequency roles. Status: `next`. Depends on: none.
2. `spherical_lissajou_survey` - Survey the spherical-Lissajous and two-frequency closed-curve literature for classification results, closure criteria, and datasets usable as comparison material for braid winding diagnostics. Status: `pending`. Depends on: `lissajou_phase_closure_map`.
3. `eigen_braid_figure_catalog` - When the axis-neutral rotating-wave spectrum work produces admissible rows, classify each row's traced figure (helix, closed Lissajous class, quasi-periodic) and attach the figure class to the branch label. Status: `pending`. Depends on: `lissajou_phase_closure_map`. Notes: the 2026-07-07 breathing hunt in the braid-ideal lane produced no admissible rows (cycle-averaged tangential pump strictly positive across the scanned box), so the catalog remains empty; its classifier interface is implemented in the hunt script (rational-lock label $p/q$ on the frequency ratio $\Omega/\omega$ with bounded-$q$ continued-fraction detuning) and will attach to any future row.

## Related Priorities

- [braid-ideal](../braid-ideal/priorities.md)
- [braid-retained-branch-closure](../braid-retained-branch-closure/priorities.md)
- [braid-angular-momentum-spin](../braid-angular-momentum-spin/priorities.md)

## Related AAA Notes

- [shell-braid](../../../content/markdown/aaa/noether-braid/explored-braid-geometries.md)
- [nested-shell-braid](../../../content/markdown/aaa/noether-braid/explored-braid-geometries.md)
- [noether-braid-doubling-frequency-resonance-lock](../../../content/markdown/aaa/noether-braid/noether-braid-doubling-frequency-resonance-lock.md)
