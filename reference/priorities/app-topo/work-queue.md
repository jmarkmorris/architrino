# Topo App Work Queue

This is the canonical execution ledger for accepted `app-topo` work. [priorities.md](priorities.md) owns strategy, [requirements-and-design.md](requirements-and-design.md) owns the application envelope, and [brainstorming.md](brainstorming.md) holds provisional ideas.

## Rules

1. Promote an idea here only when it has a testable completion condition.
2. Keep the scientific observable, Potential product, Topo rendering, and EOM evolution as separate responsibilities.
3. Treat every rendered map as display-only unless its producing product grants stronger authority.
4. Never use coloring, clipping, masking, or contour placement to supply a missing scientific value.

## Current Numbered Review Inventory

Use this stable numbering for the current user-led Topo review. Implementation and automated checks do not replace the named user test.

| Item | Status | Concise scope | Next user-facing test / action |
| --- | --- | --- | --- |
| **Topo 1 — Circular-binary contour map** | **Paused** | The orbiting-binary prescribed wake display is currently heatmap-only; the visible circle is the prescribed path guide, not a contour. The requested field-contour overlay remains unimplemented. | After the awaiting-verification items are reviewed, decide whether to resume the bounded sampled-field contour implementation. Do not label the result as equal-potential contours. |
| **Topo 2 — Beta-zero outer-label spacing** | **Archived — user-tested / passed** | In the saved local app, the left `e = -3` label is placed outside the outer beta-zero ring while retaining the five-pixel gap rule; focused and live checks passed, and the user accepted the result. | None; reopen only if the label overlaps the outer ring again. |
| **Topo 2a — Label-spacing worktree copy** | **Archived — superseded** | The isolated-worktree version was replaced by Topo 2 in the saved local project. | None. |
| **Topo 3 — Source-local legend recalibration** | **Archived — superseded** | The first correction changed the legend transfer, contrary to the later instruction to preserve the original legend; Topo 3a replaced it. | None. |
| **Topo 3a — Source-local map color correction** | **Archived — user-tested / passed** | Restored the original legend and changed only the Source-local canvas color transfer so exponent colors follow it; raw values and contour geometry remain unchanged. The user confirmed that the Source-local map color grading lines up with the unchanged lower-left legend. | None; reopen only if the map and legend grading diverge again. |
| **Topo 4 — Display map-scale control** | **Active code task** | Final decision: keep both **Display scale** and the contour controls. Display scale must implement true map-extent semantics: lower scale shows a wider spatial region and additional eligible contours; higher scale shows a narrower region, while raw values, physical geometry, and scenario state remain unchanged. Observed defect: after scaling, the emissions/field layer and/or Topo contour layer can occupy only part of the panel or be cut off. The user-passed Topo 10 interaction fix must remain intact. | Recompute and redraw both field and contour layers across the full viewport after every scale change. At lower and higher scale, confirm no blank bands, clipped old bounds, or layer misalignment; confirm wider/narrower extent and eligible-contour behavior, unchanged scientific state, retained contour controls, and the passed Topo 10 pointer/keyboard interaction. |
| **Topo 5 — Equal-radius exponent chart** | **Archived — user-tested / passed** | The stationary single-electrino equal-radius chart is accepted, and the approaching-pair Combined wake contours passed uninterrupted $\beta=0.50$ user playback before, through, and after crossing. Crossing-specific adaptive live sampling is a display implementation detail. The explicit constant-velocity incoming prescribed prehistory is provenance-bearing prescribed input, not inferred dynamics; genuinely unavailable source contributions remain fail-closed. | None; reopen only if the accepted single-source chart or continuously reshaping pair contours regress. |
| **Topo 6 — Continuous collinear contours** | **Paused** | Read-only diagnosis found that sampled pair contours are intentionally suppressed during playback; no implementation or validation was performed. | Resume as a later code task, then have the user watch an approaching-collinear playback and confirm contours update through intermediate frames as well as at the endpoint. |
| **Topo 7 — Prescribed-speed slider hover** | **Archived — verified / no change** | The live value did not change on hover without a press, changed normally on deliberate drag or click, and the user confirmed the hover defect was absent; no code was changed. | None; reopen only if hover changes the value again. |
| **Topo 8 — Source-local control shape regression** | **Paused** | Newly reported styling regression: controls in the Source-local row appear as vertical ovals instead of circles. No code change has started. | In the next code slot, reproduce and fix the owning style narrowly; then confirm the controls remain circular at the user’s current panel width. |
| **Topo 9 — Remove user-visible exponent terminology** | **Planned / not implemented** | Remove exponent terminology everywhere user-visible in Topo: map `e =` labels in every view, the **Signed ordinary values** text that states an exponent range, color-grading legend and tick labels showing `e = ...`, and any view or control wording that exposes exponent terminology. During later implementation, replace wording only where needed with non-exponent user-facing descriptions. Preserve the underlying contour-level values, calculations, contour lines, and geometry. | Authorize a separate code task; afterward inspect every scene, coordinate mode, panel, and legend and confirm that no exponent terminology remains visible while the underlying contour levels, calculations, and positions are unchanged. |
| **Topo 10 — Display-scale slider hover regression** | **Archived — user-tested / passed** | The range helper now tracks the initiating pointer, requires the primary button during movement, and clears ownership on release, cancel, lost capture, or same-pointer movement without the primary press. The user confirmed that hover, click-drag, release, and keyboard behavior pass. | None; reopen only if the interaction regression recurs. |
| **Topo 11 — All-scene gradual color-progression audit** | **Planned / not implemented** | Audit every Topo scene and coordinate mode against the user-passed Source-local gradual color grading, then display-tune each applicable scene until its visual color progression is comparably gradual. The passed chart is a visual reference only: preserve raw field values, contour levels and geometry, scenario semantics, and visible unavailable and singular states. | After separately approved implementation, run scene-by-scene user visual QA across every scene and coordinate mode, confirming gradual progression where applicable while checking that scientific values, contours, semantics, and nonnumeric-state visibility remain unchanged. |
| **Topo 12 — Animation timeline scrubber** | **Planned / not implemented** | Add a timeline scrubber between **Play** and **Reset** for prescribed scenarios. The user can drag to any playback position; releasing the scrubber leaves playback paused at that exact position for practical frame inspection. Preserve the existing Play and Reset controls. | Drag through intermediate approaching-pair frames, release, and confirm a stable paused frame at the selected position; then resume with Play and confirm Reset restores the prescribed starting state. |
| **Topo 13 — Graded contour visibility** | **Planned / not implemented** | Visually emphasize the most intense contours nearest the Architrino/source and progressively fade the outer, weaker contours. This is a display-only opacity and visual-weight treatment; preserve every contour level value and location, the underlying field, and all contour geometry. | Run user visual QA across every available contour view, confirming that inner intense contours read most strongly and outer weaker contours fade progressively while every contour remains at its unchanged level and position. |

## Ranked Next Objects

1. `topo_reference_surface` — [TOPO-003](#topo-003--topo-reference-surface). Status: `Queued`.
2. `topo_scenario_registry` — [TOPO-004](#topo-004--topo-scenario-registry). Status: `Deferred / blocked`.
3. `topo_dynamics_phase` — [TOPO-005](#topo-005--topo-dynamics-phase). Status: `Deferred / blocked`.

## Queued

### TOPO-003 — Topo reference surface

- **Status:** Queued
- **Priority object:** `topo_reference_surface`
- **Request / acceptance:** Implement the correctness-first two-dimensional contour surface with the source at $(2/3,1/2)$, left-to-right motion, the electrino/positrino menu, $\beta$ slider, the fixed inverse-square logarithmic contour lattice and range/visibility controls, the one signed base-10 color mapping, and the signed-value legend.
- **Evidence / blocker:** [TOPO-001](topo-observable-and-reference-geometry-v1.md) supplies the accepted v1 wake-intensity product and [TOPO-002](topo-interaction-and-color-contract-v1.md) supplies the accepted display contract. Any later true scalar-potential mode additionally depends on a declared product route from [Potential](../app-potential/priorities.md).
- **Completion:** Focused tests establish scenario identity, source placement, slider-to-map identity, raw-value agreement with an independent analytical reference, sign reversal, no stale-frame mixing, singular/unavailable treatment, fixed decade anchors and contour-range isolation, accessibility, and clean browser behavior.

## Deferred / blocked

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

### TOPO-006 — Prescribed circular binary display

- **Status:** Verified
- **Priority object:** `topo_prescribed_circular_binary`
- **Result:** Added the prescribed circular binary, finite-history signed superposition, 1%-to-45% orbital-radius control, both angular directions, shared half-size source markers, adaptive solid prescribed-orbit guide, option-colored background comparison, contained source masking, and one-orbit accessible transport under [the v1 contract](topo-circular-binary-prescribed-history-v1.md).
- **Boundary:** Display-only prescribed paths; no EOM evolution, binding, stability, conservation, potential, or acceptance claim.

### TOPO-007 — Shared controls and canonical collinear contours

- **Status:** Verified
- **Priority object:** topo_collinear_canonical_contours
- **Result:** Replaced the scenario select with four native radios, unified the compact Scenario panel, persisted the shared Purple/White display choice, repaired shared transport toggling, and made the collinear integer-decade contour controls consume the matching sampled raw frame.
- **Boundary:** Prescribed display only. Circular-binary contours remain disabled; no potential, EOM, stability, binding, conservation, acceptance, or release claim.

## Superseded / withdrawn

No rows.
