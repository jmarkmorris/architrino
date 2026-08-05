# AAA Core Brainstorming

This file preserves suite-wide path, interchange, shared-compute, and application-service ideas that are not yet accepted implementation tasks.

## Routing Rules

- Keep cross-application path and shared-service ideas here until they become testable Core tasks.
- Keep app-specific presentation and interaction in the owning application lane.
- Keep EOM evolution and acceptance in `app-solver`; Core may carry and dispatch its records but may not reproduce the solver.
- Preserve observer-level experimental provenance and uncertainty through every import and transform.

## 2026-08-02 — Initial Ecosystem Ideas

### Intercommunicating Application Suite

- **Claim level:** effective/software-architecture proposal.
- **Trigger:** A suite of applications needs to exchange paths, histories, analysis records, experiment definitions, and derived views.
- **Strongest defensible claim:** AAA Core can decouple producers from consumers through versioned path and product contracts without requiring a monolithic application.
- **Assumptions and proof burden:** Identity, units, time, precision, provenance, authority, compatibility, and failure state must survive every boundary; two independent applications must demonstrate the same contract.
- **Promotion target:** [AAA Core architecture v0](architecture-v0.md) and [CORE-008](work-queue.md#core-008--application-client-sdk).
- **Next artifact:** an application/service conformance matrix after `aaa_core_path_interchange/v0` is fixture-backed.

### Experimental Path Import

- **Claim level:** effective comparison proposal.
- **Trigger:** Collider and other measured paths should enter the same ecosystem as solver and prescribed histories.
- **Strongest defensible claim:** Observer-level reconstructed tracks can be imported as provenance-bound path products and queried beside model-produced histories.
- **Assumptions and proof burden:** Detector coordinates, calibration, uncertainty, reconstruction assumptions, time basis, track identity, selection history, and model transforms remain explicit. Visual overlap is not validation.
- **Promotion target:** [CORE-007](work-queue.md#core-007--experimental-path-import-profile).
- **Next artifact:** one synthetic collider-track fixture with uncertainty and coordinate-transform fields.

### Signal Filters And Reproducible Shaping

- **Claim level:** effective/application-analysis proposal.
- **Trigger:** Each application or experiment asks which part of a path-derived signal matters for its purpose.
- **Strongest defensible claim:** Immutable query and transform manifests can make selection and shaping reproducible without rewriting the source paths.
- **Assumptions and proof burden:** Ordered operations, parameters, hashes, precision changes, uncertainty, coverage, and authority changes must be explicit.
- **Promotion target:** [CORE-005](work-queue.md#core-005--query-transform-and-publication-contract).
- **Next artifact:** a minimal filter algebra with composition, stable cache identity, and three cross-app examples.

### Reaction Workspace As A Core Consumer

- **Claim level:** speculation with a concrete software route.
- **Trigger:** A reaction study can combine theory, EOM evolution, optimization, visualization, and experimental evidence.
- **Strongest defensible claim:** A future reaction app could compose versioned histories, EOM outputs, ledgers, searches, maps, and comparison records through AAA Core without collapsing their evidence grades.
- **Assumptions and proof burden:** Reaction semantics, observable mappings, acceptance gates, and experimental residuals must come from their owning scientific lanes.
- **Promotion target:** a future reaction-app packet plus the Core derived-product contract.
- **Next artifact:** an object-flow sketch for one bounded synthetic reaction naming every producer, consumer, transform, and authority boundary.

### Observable-Aware Codec Selection

- **Claim level:** effective/software-architecture proposal.
- **Trigger:** Storage-optimal, solver-continuation, experimental-source, map-tile, and live-display representations preserve different information and have different decode paths.
- **Strongest defensible claim:** Codec negotiation can choose among registered providers using the consumer's observable, error budget, access pattern, latency, and device-layout requirements without changing the canonical logical path model.
- **Assumptions and proof burden:** Each provider must publish measurable error and performance behavior, exact refusal cases, and authority effects. End-to-end consumer results, not compression ratio alone, decide suitability.
- **Promotion target:** [CORE-003](work-queue.md#core-003--path-codec-profile-contracts).
- **Next artifact:** a capability-selection fixture in which continuation, experimental replay, potential mapping, and live display choose different providers from the same logical product family.
