# AAA Core Potential v1

`aaa_core_potential/v1` is the single supported computational boundary for application requests that need declared Potential samples. AAA Core owns request validation, dispatch to the declared prescribed-path analysis provider, complete contribution accounting, reduction into sample values, and the exact unavailable-output failure. The scientific owner of a selected kernel retains responsibility for its mathematical meaning and evidence grade; the EOM solver retains forward evolution and accepted-history authority.

Plainly: applications ask Core for Potential values. Core returns a complete, traceable sample batch or reports that the batch is unavailable.

## Supported consumers

The v1 contract supports Lorentz Geometry (`ideal-braid`) and Topo (`topo`). Lorentz Geometry uses the API for its existing display-only surface. Topo has a thin consumer boundary for a separately approved Potential mode but does not relabel its current signed ordinary wake-intensity map as Potential. Equation Mapping may retrieve a published Potential product through the general AAA Core client; it is not a separate calculation owner.

Visualization remains application-owned. A consumer may choose cameras, colors, contours, clipping, playback, and interaction, but it must preserve the returned product identity, coverage, claim boundary, and unavailable state. No `Potential` scene, public route, or standalone product application is part of this contract.

Plainly: Topo and Lorentz Geometry decide how to show valid values. They do not calculate a second version of those values or draw zero when Core has no answer.

## Fail-closed output rule

The current sample API is atomic. For $N$ sample points and $M$ declared transmitters, the analysis provider must return exactly $NM$ uniquely identified contribution rows. Every row must have success status and a finite Potential value. A missing row, duplicate row, unavailable status, nonfinite value, provider exception, or unsupported consumer produces `potential_output_unavailable` or an explicit request error; the API publishes no partial numeric batch.

Plainly: one missing contribution makes the requested batch unavailable. Zero is returned only when complete valid contributions actually sum to zero.

## Contract artifacts

- Machine contract: [`aaa-core-potential.v1.json`](aaa-core-potential.v1.json)
- Potential product contract: [`potential/potential-product-contract.v1.json`](../potential/potential-product-contract.v1.json)
- Live product state machine: [`potential/potential-live-pipeline-contract-v1.md`](../potential/potential-live-pipeline-contract-v1.md)
- Core implementation: [`../../../src/aaa-core/potential-v1.mjs`](../../../../src/aaa-core/potential-v1.mjs)
- Topo consumer: [`../../../src/apps/topo/TopoPotentialConsumer.js`](../../../../src/apps/topo/TopoPotentialConsumer.js)
- Lorentz Geometry consumer: [`../../../src/apps/ideal-braid/IdealBraidSurfaceSolverScheduler.js`](../../../../src/apps/ideal-braid/IdealBraidSurfaceSolverScheduler.js)
- Focused contract tests: [`../../../tests/aaa-core-potential-v1.test.js`](../../../../tests/aaa-core-potential-v1.test.js)

Passing the focused tests establishes API ownership, supported-consumer wiring, complete-row refusal behavior, and absence of a public standalone Potential route or scene. It does not independently validate the delayed-Potential kernel or establish a physical Potential result.
