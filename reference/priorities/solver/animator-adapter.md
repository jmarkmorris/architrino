# Animator Adapter

Status: `closed-motion-dataset-adapter`

Kind: `solver-app-adapter-closeout`

Source task: `animator_adapter` in [solver.md](solver.md)

Primary dependencies:

- [minimal-causal-root-core.md](minimal-causal-root-core.md)
- [baseline-comparison-sandbox.md](baseline-comparison-sandbox.md)
- [geometry-centralization-inventory.md](geometry-centralization-inventory.md)
- [app-bridge-contract.md](app-bridge-contract.md)

Implementation surfaces:

- [AnimatorSimulationWorkerCoreRuntime.js](../../../src/apps/animator/AnimatorSimulationWorkerCoreRuntime.js)
- [AnimatorSolverBridgeWorkerRuntime.js](../../../src/apps/animator/AnimatorSolverBridgeWorkerRuntime.js)
- [AnimatorDelayedHitRows.mjs](../../../src/solver/app/AnimatorDelayedHitRows.mjs)
- [AnimatorSimulationAuthoringRuntime.js](../../../src/apps/animator/AnimatorSimulationAuthoringRuntime.js)
- [AnimatorSimulationWorker.js](../../../src/apps/animator/AnimatorSimulationWorker.js)
- [SolverAppAdapters.mjs](../../../src/solver/app/SolverAppAdapters.mjs)
- [check-solver-baseline-sandbox.mjs](../../../scripts/check-solver-baseline-sandbox.mjs)
- [animator-simulation-worker-runtime.test.js](../../../tests/animator-simulation-worker-runtime.test.js)
- [animator-simulation-authoring-runtime.test.js](../../../tests/animator-simulation-authoring-runtime.test.js)

## Adapter Scope

The Animator adapter task is scoped to routing Animator simulation worker runs
through the central solver contract while preserving the existing dataset
playback surface.

This closeout covers motion simulation frames, path-history stream identity,
solver metadata, frame-buffer packaging, worker-owned bridge clients, worker
bridge clients, authoring payload configuration, the descriptor path for
delayed-hit shell/path intersections, and the solver app package for field-shell
event cadence. It does not claim that emitter source histories are fully
core-bridge-owned or that `field_shell_events.v1` has a native C++ producer.
Animator delayed-hit shell/path intersections now route through solver-owned
`animator-delayed-hit-stream-descriptors.v1` requests with `path_segment.v1`
receiver descriptors and `delayed_hit_events.v1` row output. Field-shell
emission cadence now routes through `animator-field-shell-event-stream-package.v1`
with bridge-catalogued `field_shell_events.v1` row metadata and durable
native-file stream storage before delayed-hit descriptors consume those emission
events.

## Current Bridge Path

| Adapter path | Current route |
| --- | --- |
| Worker request entrypoint | `runAnimatorSimulationWorkerRequestAsync` routes requests through `runAnimatorSolverBridgeWorkerRequest`. |
| Run request construction | `createAnimatorSolverBridgeRunRequest` creates a central `motionSimulation` run with model, envelope, error budget, precision path, stream id, storage policy, and output request. |
| Bridge execution | The worker can use an injected `runSolverBridge`, create a solver bridge client, or create a solver bridge worker client through the shared resolver. |
| Dataset conversion | `createAnimatorDatasetFromSolverBridgeRun` converts solver frames into the Animator dataset schema and preserves solver run id, dataset id, accepted precision path, path-history stream id, halt status, diagnostics, and frame-buffer output. |
| Worker package | `AnimatorSimulationWorker.js` installs `createAnimatorSolverBridgeWorkerOptions`, which resolves the packaged WebAssembly loader and worker bridge options. |
| Authoring payload | `buildAnimatorSimulationAuthoringWorkerPayload` keeps `solverEngine` on `architrino-solver-app-bridge` and normalizes `solverBridge` to the default enabled bridge configuration. |

## Validation Evidence

Current validation evidence:

- [check-solver-baseline-sandbox.mjs](../../../scripts/check-solver-baseline-sandbox.mjs)
  includes four Animator cases: causal-root smoke, path-history smoke,
  motion dynamic replay smoke, and worker solver bridge smoke.
- The current baseline sandbox manifest classifies all four Animator cases as
  `baseline_within_tolerance`.
- [check-solver-migration-parity.mjs](../../../scripts/check-solver-migration-parity.mjs)
  includes all four Animator cases in the ordered migration parity report.
- [animator-simulation-worker-runtime.test.js](../../../tests/animator-simulation-worker-runtime.test.js)
  covers solver-bridge worker request conversion, owned bridge client creation,
  owned bridge worker client creation, packaged worker options, dataset
  hydration, frame-buffer preservation, cancellation/error behavior, and solver
  metadata in the dataset.
- [animator-simulation-authoring-runtime.test.js](../../../tests/animator-simulation-authoring-runtime.test.js)
  verifies the authoring payload configures and keeps the central solver bridge
  enabled.
- [animator-delayed-hit-runtime.test.js](../../../tests/animator-delayed-hit-runtime.test.js)
  verifies the solver-owned Animator delayed-hit row helper against the legacy
  shell/path fixture and verifies the app delayed-hit runtime only maps solver
  rows into display records.
- [animator-field-shell-event-stream.test.js](../../../tests/animator-field-shell-event-stream.test.js)
  verifies solver-owned field-shell cadence rows, stream-package metadata,
  render shell rows, and delayed-hit emission descriptor handoff.

## Remaining Boundaries

Remaining Animator work is outside this adapter closeout:

- promote emitter position history into the core bridge, and add a native C++
  producer if `field_shell_events.v1` rows need validation-grade diagnostic
  authority beyond the durable JS-side stream package;
- keep playback interpolation, camera bounds, opacity, labels, and authoring
  preview transforms app-side;
- add adapter cases for any future non-linear or multi-path authoring mode before
  deleting compatible request-building helpers.

## Completion Judgment

`animator_adapter` is complete for central solver motion simulation runs and
dataset playback preservation. Animator simulation worker requests route through
the central solver bridge, the resulting solver frames hydrate into the existing
dataset and frame-buffer surfaces, and the baseline/migration parity harness
covers the required Animator bridge cases.
