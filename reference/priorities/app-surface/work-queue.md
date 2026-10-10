# Surface Work Queue

[Priorities](priorities.md) owns the current scope. The operator selected the constrained app direction; this queue separates its next design artifact from implementation dependent on solver capability. The lane is unranked globally and has no assigned numerical scores. Local ordering below follows dependencies.

Legend: ✓ Done, ◐ Partial, ○ Not done. Queue lifecycle labels remain explicit; completed objects are removed from the live list and recorded in [work-log.md](work-log.md).

## Ranked Next Objects

1. SURFACE-001 — Specify the EOM-owned normal-constrained experiment and independently reviewed controls.

## Queued

### SURFACE-001 — Normal-constrained evolution specification

- **Status:** ○ Not done — Queued; design scope.
- **Request:** Translate the operator-selected fixed-surface study into an EOM experimental-mode proposal using [the manuscript's application brief](manuscript.md#application-brief) and [the constrained equation](manuscript.md#the-normal-only-constrained-equation).
- **Owner boundary:** Surface supplies app requirements; EOM owns the evolution interface, implementation and acceptance. Existing spherical research retains scientific ownership.
- **Shared mode dependency:** Use the standard EOM solver with a common equation/speed-mode contract; default to canonical interaction and no speed limit. Specify geometric support independently, retain mode identity through output and restart, and distinguish precise analytical results or reductions from numerical evolution. The [solver owner](../app-solver/manuscript.md#9-equation-modes-and-precise-analytical-methods) owns reusable modes across consumers.
- **Completion:** A concrete EOM contract proposal identifies the selected equation variant and speed regime, sphere/oblate-spheroid/ring-torus definitions, ordinary-chart support, dense-history consistency, numerical errors, restart, singular-event boundaries and distinguishable output authority. Specify tangent projection of the receiver total and records of the discarded normal vector only after superposition, separately from curvature and total support. A separately authored mathematical review checks the general support equation, spherical reduction, acceleration split and named analytical controls. Record any unresolved event or history obligation explicitly.
- **Evidence / blocker:** The current canonical evolution contract excludes future constraints; this folder does not change it. Implementation follows the reviewed experimental design and the applicable owner decision.

## Deferred / blocked

### SURFACE-002 — First spherical six-member evolution and viewer

- **Status:** ○ Not done — Deferred behind SURFACE-001 and EOM experimental capability.
- **Scope:** Surface/history setup, the 3:3 population, actual solver evolution, path display and the separate support/readout inspection specified in the design.
- **Completion:** A controlled finite spherical calculation with retained input/output records, independently checked interaction and geometry, visible evidence labels and operator-viewport verification. No future curve is supplied as an evolution result.

### SURFACE-003 — Oblate spheroid and ring torus comparisons

- **Status:** ○ Not done — Deferred behind verified spherical evolution.
- **Scope:** Fixed oblate-spheroid semiaxes and ring-torus radii, center and orientation, surface-consistent histories, tangent preparation and comparisons under the same selected equation variant and speed regime.
- **Completion:** Independently checked normal geometry, recovery of the sphere at equal ellipsoid semiaxes and reproducible spheroid and torus calculations with actual dense-history constraint errors and net discarded-normal records. The torus must satisfy $L>r>0$ throughout its fixed definition. Shape or topology change carries no energy interpretation by itself.

### SURFACE-004 — Pattern qualification and free release

- **Status:** ○ Not done — Deferred behind a measured candidate and supported free-release capability.
- **Scope:** Full-history recurrence, bounded perturbation comparisons and unconstrained continuation from the same supported past.
- **Completion:** The scientific owner records what recurs, what survives release, numerical limits and the qualification verdict. A finite animation loop cannot close this object.
