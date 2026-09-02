# Wake Topography App Concept Synthesis

This document synthesizes provisional Wake Topography interaction and observable concepts that are not accepted tasks. Wake Topography remains a display-only prescribed-history viewer; forward evolution belongs exclusively to the EOM solver.

## Prescribed and Evolved Motion

The current scenarios show the wake geometry implied by authored paths. A working replay or causal-root evaluation does not make those paths natural motion. Any future EOM-evolved mode must consume accepted solver histories with retained-history, causal-root, acceleration, and step provenance, and it must not expose authored future-orbit parameters as evolution controls.

## Receiver-Selected Partner Wake

A receiver-selected view filters the active transmitter set before root and state aggregation, retains both body markers, and reports the selected receiver, partner transmitter, delay, emission event, raw value, and typed state. It is distinct from an acceleration view, which also requires receiver polarity, coupling, and line-of-action geometry. Singular, unavailable, unresolved, finite-history, and the nonordinary straight $\beta=1$ family remain typed rather than being replaced by zero.

Plainly: the partner view shows what arrives from the other architrino. It does not yet show the receiver's full acceleration response.

## Display Boundaries

Canvas balance, motion arrows, contour emphasis, contour count, and playback are display choices. They may clarify the represented direction or scalar structure but cannot fabricate a zero contour, change an observable, or imply dynamics.

## Unresolved Ideas

- **[inferred] Prescribed-versus-evolved provenance matrix.** Define visible copy, inputs, allowed controls, evidence badge, failure behavior, record identity, and tests for separate What-if path and EOM-evolved modes; likely destination: [requirements-and-design.md](requirements-and-design.md) if accepted.
- **[inferred] Receiver-selected partner-wake contract.** Define the three view states, source-ledger filtering, emitter-only masking, $\beta=1$ behavior, provenance, cache identity, and CPU/GPU parity; promotion is blocked until the scenario contracts verify the root-status claims.
- **[display idea] Translation arrow and canvas balance.** Visually test source position, aspect ratio, and a restrained positive-$x$ arrow; no theory claim follows from the chosen layout.
- **[display idea] Contour controls.** Evaluate zero-contour emphasis only where a genuine zero exists and test a paired slider/numeric input for contour count; defaults remain tunable display choices.
- **[guessed] Successive accepted-product playback.** Consider animation only as a consumer of accepted time-indexed products; forward evolution remains outside Wake Topography.
