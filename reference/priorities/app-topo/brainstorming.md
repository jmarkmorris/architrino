# Topo App Brainstorming

This file preserves provisional `app-topo` ideas. Promote a testable object into [work-queue.md](work-queue.md) and remove the promoted text here in the same edit.

## Routing Rules

- Keep Topo-specific interaction, layout, contour, and teaching ideas here.
- Route reusable potential calculation and publication ideas to [Potential](../app-potential/priorities.md).
- Route shared interchange, service, and scenario-record infrastructure to [AAA Core](../app-aaa-core/priorities.md).
- Keep dynamics out of the first static-snapshot release.

## Provisional Ideas

- The fixed source at $x=2/3$ leaves more canvas behind than ahead, which may be useful for comparing the trailing wake with the leading buildup. The final aspect ratio and source position should be checked visually rather than treated as theory.
- A small horizontal arrow above the source can make the represented positive-$x$ translation unmistakable even though the camera keeps the marker fixed.
- The zero contour may deserve a slightly stronger purple stroke than the other contours when a multi-source scenario later contains both signs. For a single source, zero may occur only at a boundary or limit and must not be fabricated for visual balance.
- The contour-level control might offer a slider and a numeric field. A provisional default of $24$ levels is intentionally tunable, not a scientific choice.
- A dynamics app or dynamics mode may later animate successive accepted products, but forward evolution should remain outside Topo.

### 2026-08-08 — Receiver-selected partner-wake view

- **Claim level — derivation/display design:** In either two-source prescribed scenario, a receiver-selected view can retain only the opposite architrino's source row and display that partner's signed ordinary wake-intensity product. The current Topo scalar remains wake intensity, not potential: a potential mode needs a separately versioned fixed-history scalar whose receiver-coordinate gradient or work crosswalk reproduces the declared acceleration contribution.
- **Assumptions and proof burden:** The selected prescribed histories have no ordinary positive-delay self root for $\beta\leq1$; the straight $\beta=1$ self record is a nonordinary degenerate family and must be excluded explicitly rather than represented as zero. Verify this statement against both scenario contracts, finite-history coverage, and endpoint state handling before promotion.
- **Interaction proposal:** Add one pair-only `Perspective` radio group: `Combined wake`, `Electrino receives`, and `Positrino receives`. In either receiver mode, keep both body markers, add a restrained selection halo to the receiver, mask only the emitting partner's singular point in the scalar product, and expose a receiver readout containing receiver identity, retained source identity, causal delay, emission event, raw value, and typed state.
- **Calculation boundary:** Filter the active source ledger before root/state aggregation; do not calculate the combined field and subtract the selected receiver's row afterward. This preserves singular, unavailable, unresolved, and finite-history states and requires the perspective/source-set identity in raw-frame, contour, and cache keys.
- **Distinct future view:** A partner-wake map reports the incoming source-signed scalar. A receiver-response or acceleration view would additionally require receiver polarity, coupling, and line-of-action geometry and must remain a separately named observable.
- **Promotion target:** If accepted, promote this into `requirements-and-design.md` plus a receiver-filter interaction/source-ledger contract and focused CPU/GPU parity tests.
- **Next artifact:** Write the three-mode state-and-test table, including selected-receiver sampling, emitter-only masking, $\beta=1$ endpoint behavior, source-ledger provenance, frame identity, and uninterrupted collinear/orbiting playback checks.
