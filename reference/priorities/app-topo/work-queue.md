# Topo App Work Queue

This is the canonical execution ledger for accepted `app-topo` work. [priorities.md](priorities.md) owns strategy, [requirements-and-design.md](requirements-and-design.md) owns the application envelope, and [brainstorming.md](brainstorming.md) holds provisional ideas.

## Rules

1. Promote an idea here only when it has a testable completion condition.
2. Keep the scientific observable, Potential product, Topo rendering, and EOM evolution as separate responsibilities.
3. Treat every rendered map as display-only unless its producing product grants stronger authority.
4. Never use coloring, clipping, masking, or contour placement to supply a missing scientific value.

## Ranked Next Objects

1. `topo_interaction_and_color_contract_v1` — [TOPO-002](#topo-002--topo-interaction-and-color-contract-v1). Status: `Queued`.
2. `topo_reference_surface` — [TOPO-003](#topo-003--topo-reference-surface). Status: `Deferred / blocked`.
3. `topo_scenario_registry` — [TOPO-004](#topo-004--topo-scenario-registry). Status: `Deferred / blocked`.
4. `topo_dynamics_phase` — [TOPO-005](#topo-005--topo-dynamics-phase). Status: `Deferred / blocked`.

## Queued

### TOPO-002 — Topo interaction and color contract v1

- **Status:** Queued
- **Priority object:** `topo_interaction_and_color_contract_v1`
- **Request / acceptance:** Freeze the first scenario menu, fixed-source camera, $\beta$ slider, contour-count control, legend, raw-value inspection, unavailable-state presentation, and comparison protocol for linear, signed-log2, and asinh transforms. Bind the shared dark neutral-purple shell, top-right application control bar, shared open/closed left-panel icon and slide behavior, focus and reduced-motion states, and desktop/mobile responsive treatment rather than creating Topo-local variants.
- **Evidence / blocker:** The requested interaction and palette anchors are known. Final level range, transform default, reference scale, accessibility behavior, and high-magnitude clipping remain open display decisions.
- **Completion:** One compact interaction contract and static mockup specify every control and state; the three transforms are compared against the same declared synthetic signed surface; positive, neutral, negative, singular, unavailable, loading, and complete states remain visually and accessibly distinct; changing display parameters leaves raw sample values unchanged; and the shared top-right controls, dark-purple stage, collapsible left rail, keyboard focus, reduced-motion behavior, and responsive layout are explicitly verified.

## Deferred / blocked

### TOPO-003 — Topo reference surface

- **Status:** Deferred / blocked
- **Priority object:** `topo_reference_surface`
- **Request / acceptance:** Implement the correctness-first two-dimensional contour surface with the source at $(2/3,1/2)$, left-to-right motion, the electrino/positrino menu, $\beta$ slider, contour control, transform selector, legend, and raw-value probe.
- **Evidence / blocker:** [TOPO-001](topo-observable-and-reference-geometry-v1.md) now supplies the accepted v1 wake-intensity product. Implementation remains blocked on TOPO-002. Any later true scalar-potential mode additionally depends on a declared product route from [Potential](../app-potential/priorities.md).
- **Completion:** Focused tests establish scenario identity, source placement, slider-to-map identity, raw-value agreement with an independent analytical reference, sign reversal, no stale-frame mixing, singular/unavailable treatment, display-transform isolation, accessibility, and clean browser behavior.

### TOPO-004 — Topo scenario registry

- **Status:** Deferred / blocked
- **Priority object:** `topo_scenario_registry`
- **Request / acceptance:** Replace the initial two hard-bounded single-source choices with an extensible registry carrying scenario identity, source records, allowed controls, observable product, domain, defaults, authority, and unavailable behavior.
- **Evidence / blocker:** The first scenario must be validated before a generalized schema is justified. The registry must align with AAA Core and Potential rather than introduce another interchange format.
- **Completion:** The initial electrino and positrino scenarios round-trip through the registry without behavioral change, malformed and scientifically unsupported entries fail closed, and one synthetic future entry demonstrates extension without granting it scientific authority.

### TOPO-005 — Topo dynamics phase

- **Status:** Deferred / blocked
- **Priority object:** `topo_dynamics_phase`
- **Request / acceptance:** Define, in a separately reviewed phase, how Topo may display time-varying or EOM-produced products without becoming a forward solver.
- **Evidence / blocker:** Explicitly outside the first electrostatic/static-snapshot release. Depends on a verified static surface, Potential live-product contract, and accepted AAA Core stream boundary.
- **Completion:** A later versioned contract distinguishes fixed-time products, progressive time slices, accepted-through state, playback, and EOM ownership. No implementation begins from this placeholder alone.

## Awaiting verification

No rows.

## In progress

No rows.

## Verified

No rows.

## Superseded / withdrawn

No rows.
