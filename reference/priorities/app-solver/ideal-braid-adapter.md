# Ideal Braid Adapter

Status: `closed-app-adapter`

Kind: `solver-app-adapter-closeout`

Source task: `ideal_braid_adapter` in [priorities.md](priorities.md)

Primary dependencies:

- [minimal-causal-root-core.md](minimal-causal-root-core.md)
- [baseline-comparison-sandbox.md](baseline-comparison-sandbox.md)
- [geometry-centralization-inventory.md](geometry-centralization-inventory.md)
- [app-bridge-contract.md](app-bridge-contract.md)

Implementation surfaces:

- [IdealBraidRuntime.js](../../../src/apps/ideal-braid/IdealBraidRuntime.js)
- [IdealBraidPathPotentialProfile.js](../../../src/apps/ideal-braid/IdealBraidPathPotentialProfile.js)
- IdealBraidSolverBridgeOptions.js (removed with the zombie-solver migration: `src/apps/ideal-braid/IdealBraidSolverBridgeOptions.js`)
- `src/solver/app/SolverAppAdapters.mjs`
- `scripts/check-solver-baseline-sandbox.mjs`
- [ideal-braid-runtime.test.js](../../../tests/ideal-braid-runtime.test.js)

## Adapter Scope

The Ideal Braid adapter task is scoped to replacing app-local delayed-potential,
flight-time, and circular self-hit calculations with shared solver geometry.

It does not claim that all Ideal Braid rendering geometry is solver-owned. Orbit
ribbons, Lorentz chart geometry, potential-surface mesh construction, color
mapping, viewport transforms, and visual presentation remain app responsibilities.

## Current Bridge Paths

| Adapter path | Current route |
| --- | --- |
| Delayed-potential samples | `computePotentialSamplesWithSolverBridge` builds shared-geometry run requests and consumes solver delayed-potential rows. |
| Flight-time row | `solveFlightTimeRowWithSolverBridge` runs through the shared solver bridge with direct client, worker, factory, or WebAssembly module options. |
| Circular self-hit span | `solveCircularSelfHitSpanRowsWithSolverBridge`, `solveCircularSelfHitSpanRowWithSolverBridge`, and `solveCircularSelfHitSpanWithSolverBridge` run through shared solver geometry requests. |
| App bridge options | `createIdealBraidSolverBridgeOptions` centralizes the app-owned bridge client and WebAssembly loader setup. |

## Validation Evidence

Current validation evidence:

- `scripts/check-solver-baseline-sandbox.mjs`
  includes five Ideal Braid cases: causal-root smoke, shared-geometry smoke,
  flight-time facade, flight-time WebAssembly client, and self-hit WebAssembly
  client.
- The current baseline sandbox manifest classifies all five Ideal Braid cases as
  `baseline_within_tolerance`.
- `scripts/check-solver-migration-parity.mjs`
  includes all five Ideal Braid cases in the ordered migration parity report.
- [ideal-braid-runtime.test.js](../../../tests/ideal-braid-runtime.test.js)
  covers solver-bridge potential samples, flight-time rows, client/worker bridge
  creation, and circular self-hit span bridge rows.

## Remaining Boundaries

Remaining Ideal Braid work is not this adapter task:

- move remaining source-history normalization and circular-to-segment conversion
  into solver-owned descriptors before deleting app-local request-building
  helpers;
- keep mesh aggregation, color mapping, orbit ribbons, and chart transforms
  app-side;
- remove fallback span authority only after every rendered binary receives
  solver rows or explicit solver failure rows.

## Completion Judgment

`ideal_braid_adapter` is complete for delayed-potential, flight-time, and
circular self-hit solver geometry. The app routes those calculations through the
shared solver bridge, and the baseline/migration parity harness covers the
required Ideal Braid bridge cases.
