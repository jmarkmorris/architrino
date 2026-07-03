# Braid Assembly Explorer

## Workstream Metadata

- Kind: `app-priority`
- Rank: `11`
- Value: `10.41`
- Cost: `3.6`
- ROI: `2.89`
- Status: `active`

## Purpose

The Assembly Configuration Explorer is the app-side surface for inspecting tri-binary Noether braid configuration-space packets. It is not a replacement for the solver. Its job is to load solver or script outputs, preserve the unquotiented layer records, compute comparison diagnostics, and help identify stable sectors, symmetric duplicates, energy-differential patterns, super-field-speed rows, and accessory-architrino capture targets.

## Search Semantics

The explorer must preserve the general tri-binary search domain from [Tri-Binary Configuration Space](../../../content/markdown/aaa/noether-braid/noether-braid-configuration-space.md):

$$
\widetilde{\mathcal C}_{3B}
=
\left\{
(\mathcal T_1,\mathcal T_2,\mathcal T_3)
\right\}.
$$

The labels $1,2,3$ are input labels only. They are not sorted by frequency, radius, energy, speed, phase, plane normal, or causal-root ledger. The default app behavior is `unquotiented-labeled`: keep all repeated $S_3$-related solutions and display a permutation-canonical key only as an analysis aid.

The quotient policy is:

$$
\mathcal C_{3B}^{\mathrm{quot}}
=
\widetilde{\mathcal C}_{3B}/S_3
$$

only after the user or a solver packet explicitly requests quotient-sector analysis. A quotient-sector view may collapse repeated rows for navigation, but it may not delete the underlying unquotiented evidence.

## Initial Contract

Implementation surfaces:

- [assembly-explorer.html](../../../assembly-explorer.html)
- [AssemblyConfigurationExplorerRuntime.js](../../../src/apps/assembly-explorer/AssemblyConfigurationExplorerRuntime.js)
- [schema.json](../../../src/contracts/assembly-configuration-explorer/v1/schema.json)
- [assembly-configuration-explorer-runtime.test.js](../../../tests/assembly-configuration-explorer-runtime.test.js)

The first dataset contract is `assembly-configuration-explorer.dataset.v1`. A dataset contains:

- `fieldSpeed`
- `searchSemantics.layerOrdering = "unquotiented-labeled"`
- one or more branch rows
- exactly three binary layer records per branch
- per-layer `frequency`, `radius`, `energy`, `speed` or enough data to compute `speed`, `phase`, `normal`, and optional root-ledger data
- optional eigen-braid status, momentum-axis alignment, stability, assembly topological charge, solver reference, and capture rows

The app computes:

- input-order ratios $f_1:f_2:f_3$, $r_1:r_2:r_3$, $E_1:E_2:E_3$, and $s_1:s_2:s_3$
- speed regimes relative to $c_f$
- $D_{\mathrm{plane}}$
- pairwise energy differentials
- branch-level eigen-braid status, including return residual, stability gap, allowed symmetries, and Lorentz-export status when reported
- branch-level total momentum, total angular momentum, and axis-alignment residual/status when reported
- a permutation-canonical key for $S_3$-equivalence checking

## Solver Boundary

The explorer should consume solver and script outputs before it requests live runs. The next adapter should map retained branch-search packets into the explorer dataset shape without changing solver authority:

1. solver/script packet emits branch rows;
2. adapter normalizes those rows into `assembly-configuration-explorer.dataset.v1`;
3. explorer displays and compares rows;
4. solver remains the authority for root, phase, action, energy, return-map, sea, and capture predicates.

## Next Work

1. Add import support for packet JSON files and local run manifests.
2. Add a solver-output adapter for `tri-binary-offset-family-runner.mjs` and equal-frequency candidate outputs.
3. Add a stable-sector atlas view that plots rows by energy differential, speed regime, $D_{\mathrm{plane}}$, and assembly topological charge.
4. Add accessory-architrino capture packet rendering after the capture scanner emits retained rows.
5. Add an optional quotient-sector view that groups by permutation-canonical key while preserving repeated raw rows.
6. Add an eigen-braid filter that separates raw candidate rows from relative-return-passed and retained-eigen-braid rows.
7. Add an axis-alignment plot/filter for total momentum, total angular momentum, and oblate-envelope orientation rows.
