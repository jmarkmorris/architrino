# Photon Adapter

Status: `closed-causal-root-adapter`

Kind: `solver-app-adapter-closeout`

Source task: `photon_adapter` in [priorities.md](priorities.md)

Primary dependencies:

- [minimal-causal-root-core.md](minimal-causal-root-core.md)
- [baseline-comparison-sandbox.md](baseline-comparison-sandbox.md)
- [geometry-centralization-inventory.md](geometry-centralization-inventory.md)
- [app-bridge-contract.md](app-bridge-contract.md)

Implementation surfaces:

- [PhotonFormulaRuntime.js](../../../src/apps/photon/PhotonFormulaRuntime.js)
- PhotonSolverBridgeOptions.js (removed with the zombie-solver migration: `src/apps/photon/PhotonSolverBridgeOptions.js`)
- [SolverAppAdapters.mjs](../../../src/solver/app/SolverAppAdapters.mjs)
- [check-solver-baseline-sandbox.mjs](../../../scripts/check-solver-baseline-sandbox.mjs)
- [photon-runtime.test.js](../../../tests/photon-runtime.test.js)

## Adapter Scope

The Photon adapter task is scoped to replacing Photon-local causal-root
diagnostics with shared source-history and causal-root bridge calls. It covers
ordinary causal roots, circular-source roots/hits ledgers, normalized
circular-source runs, WebAssembly client paths, and phase-diagnostics run
packaging.

This closeout does not claim all Photon formula summaries are solver-owned.
Photon still owns search ranking, UI filtering, plotting, analyzer presentation,
and some observer-field summary logic until the solver emits the required
field-contribution rows.

## Current Bridge Paths

| Adapter path | Current route |
| --- | --- |
| Linear causal roots | `createPhotonCausalRootsSolverRunRequest`, `runPhotonCausalRootsWithSolverBridge`, and `solvePhotonCausalRootsWithSolverBridge` route through the shared run bridge. |
| Circular-source roots/hits ledger | `createPhotonCircularSourceCausalRootRequest`, circular-source run helpers, and `solvePhotonCircularSourceRootsHitsLedgerWithSolverBridge` route through the shared bridge. |
| Normalized circular-source runs | Photon run shapes preserve local authoritative rows and absolute-display metadata for large-coordinate regimes. |
| Phase diagnostics | Photon phase-diagnostics runs use bridge request builders and `phase_at_hit.v1` buffers. |
| App bridge options | `PhotonSolverBridgeOptions.js` centralizes client, worker, and packaged WebAssembly loader options. |

## Validation Evidence

Current validation evidence:

- [check-solver-baseline-sandbox.mjs](../../../scripts/check-solver-baseline-sandbox.mjs)
  includes eight Photon cases: causal-root smoke, facade path, WebAssembly client
  path, circular-source roots/hits ledger facade and WebAssembly paths,
  normalized circular-source ledger, normalized circular-source run, and phase
  diagnostics.
- The current baseline sandbox manifest classifies all eight Photon cases as
  `baseline_within_tolerance`.
- [check-solver-migration-parity.mjs](../../../scripts/check-solver-migration-parity.mjs)
  includes all eight Photon cases in the ordered migration parity report.
- [photon-runtime.test.js](../../../tests/photon-runtime.test.js) covers Photon
  bridge client creation, worker-client creation, circular-source bridge paths,
  formula/plot API bridge results, and solver-bridge search scoring.

## Remaining Boundaries

Remaining Photon work is not this causal-root adapter task:

- move observer-field contribution rows, delayed direction, branch-weighted
  field vectors, and phase summary authority into solver-owned rows before
  deleting the remaining local summary reconstruction;
- keep search scoring, ranking, controls, plotting, and presentation app-owned;
- keep display-only circular orbit/trail geometry app-side unless a renderer
  consumes solver trace buffers directly.

## Completion Judgment

`photon_adapter` is complete for causal-root diagnostics and circular-source
roots/hits bridge migration. The required Photon bridge cases are present in the
baseline sandbox and migration parity report, while broader Photon observer-field
and presentation work remains outside this adapter closeout.
