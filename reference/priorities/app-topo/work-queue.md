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
| **Topo 1 — Circular-binary contour map** | **Archived — completed / superseded** | Its original binary-contour requirement is covered by the later implemented automatic Combined binary topology and user-passed Topo 11 and Topo 13 work. The remaining maximum-$\beta$ smoothness issue belongs solely to active Topo 15. | None; Topo 15 owns any remaining binary contour-rendering correction. |
| **Topo 2 — Beta-zero outer-label spacing** | **Archived — user-tested / passed** | In the saved local app, the left `e = -3` label is placed outside the outer beta-zero ring while retaining the five-pixel gap rule; focused and live checks passed, and the user accepted the result. | None; reopen only if the label overlaps the outer ring again. |
| **Topo 2a — Label-spacing worktree copy** | **Archived — superseded** | The isolated-worktree version was replaced by Topo 2 in the saved local project. | None. |
| **Topo 3 — Source-local legend recalibration** | **Archived — superseded** | The first correction changed the legend transfer, contrary to the later instruction to preserve the original legend; Topo 3a replaced it. | None. |
| **Topo 3a — Source-local map color correction** | **Archived — user-tested / passed** | Restored the original legend and changed only the Source-local canvas color transfer so exponent colors follow it; raw values and contour geometry remain unchanged. The user confirmed that the Source-local map color grading lines up with the unchanged lower-left legend. | None; reopen only if the map and legend grading diverge again. |
| **Topo 4 — Display map-scale control** | **Archived — user-tested / passed** | Display scale uses scale-aware world-to-pixel mapping with shared field and contour rerender handling across $0.50\times$–$2.00\times$. The user confirmed the full-panel wider/lower and closer/higher map-extent behavior works. | None; reopen only if map extent, full-panel rendering, or scale interaction regresses. |
| **Topo 5 — Equal-radius exponent chart** | **Archived — user-tested / passed** | The stationary single-electrino equal-radius chart is accepted, and the approaching-pair Combined wake contours passed uninterrupted $\beta=0.50$ user playback before, through, and after crossing. Crossing-specific adaptive live sampling is a display implementation detail. The explicit constant-velocity incoming prescribed prehistory is provenance-bearing prescribed input, not inferred dynamics; genuinely unavailable source contributions remain fail-closed. | None; reopen only if the accepted single-source chart or continuously reshaping pair contours regress. |
| **Topo 6 — Continuous collinear contours** | **Archived — completed / superseded** | Its intermediate-frame continuous playback requirement was user-tested and passed in archived Topo 5; Topo 12 later added and passed scrubber inspection of intermediate frames. | None; reopen only if continuous approaching-pair playback or scrubber inspection regresses. |
| **Topo 7 — Prescribed-speed slider hover** | **Archived — verified / no change** | The live value did not change on hover without a press, changed normally on deliberate drag or click, and the user confirmed the hover defect was absent; no code was changed. | None; reopen only if hover changes the value again. |
| **Topo 8 — Source-local control shape regression** | **Archived — user-tested / passed** | Custom radios retain their intended circular shape and alignment at normal and narrow widths, and the user confirmed the correction passes. | None; reopen only if the circular-control regression recurs. |
| **Topo 9 — Remove user-visible exponent terminology** | **Archived — user-tested / passed** | User-facing exponent terminology was replaced with level, tenfold, or reference-contour language while internal contour schedules, values, identifiers, field law, and geometry remained unchanged; the user confirmed the result passes. | None; reopen only if visible exponent terminology recurs. |
| **Topo 10 — Display-scale slider hover regression** | **Archived — user-tested / passed** | The range helper now tracks the initiating pointer, requires the primary button during movement, and clears ownership on release, cancel, lost capture, or same-pointer movement without the primary press. The user confirmed that hover, click-drag, release, and keyboard behavior pass. | None; reopen only if the interaction regression recurs. |
| **Topo 11 — All-scene gradual color-progression audit** | **Archived — user-tested / passed** | The accepted ordinary UI provides **Contour count**, **Shading spread**, **Contour strength**, and **Display scale**; contour extent is fixed internally at the canonical default. Automatic routing uses Source-local presentation only for stationary single sources and Combined shared-coordinate topology for moving or multi-source scenes. The user confirmed the final Contour-reach removal and remaining controls pass. | None; reopen only if the accepted ordinary controls, fixed extent, or automatic routing regresses. |
| **Topo 12 — Animation timeline scrubber** | **Archived — user-tested / passed** | The user confirmed both approaching-pair and circular-binary scrubbers seek and pause at the released phase, Play resumes there, and Reset returns to phase zero paused. | None; reopen only if scrubber pause, resume, reset, or synchronization regresses. |
| **Topo 13 — Graded contour visibility** | **Archived — user-tested / passed** | Stationary single-source, approaching-pair, and orbiting-binary grading passed user testing. In the final binary retest, weaker contours disappeared first at low nonzero strength while stronger contours increased toward the center as strength rose, preserving the intended actual-level hierarchy. | None; reopen only if contour-strength hierarchy, sign symmetry, zero treatment, or geometry independence regresses. |
| **Topo 14 — Display-scale center-anchor drift** | **Archived — user-tested / passed** | The pair source midpoint and world viewport center share the canvas center across field, contours, source overlays, guide diagnostics, and frame/cache keys at every scale. The user confirmed Display scale looks fine. | None; reopen only if center-anchor drift, clipping, blank bands, or layer mismatch recurs. |
| **Topo 15 — Orbiting-binary central chunk/block artifact** | **Archived — user-tested / passed** | The user accepted the final $\beta=1$ current-frame two-pass GPU renderer, including smooth playback and reference-consistent continuous noncircular contours. | None; reopen only if the accepted binary contour geometry, continuity, or playback cadence regresses. |
| **Topo 16 — Halve electrino display radius in all scenes** | **Failed user testing — retest deferred until Topo 17 marker simplification** | The user accepts the exact $X/2$ visible body radii for both species but rejects the final marker rendering: on Purple the moving pair still flashes and shows a purple ring plus a small white edge, while White shows a large misshapen white border. Do not claim the flicker is fixed. Topo 16 remains open for final size and flicker acceptance after Topo 17 removes the rejected marker ornament. Preserve the accepted half-size body radii, centers, positions and paths, overlap and split behavior, scientific and mask radii, raw field values, contours and topology, histories and provenance, timing, scrubber and playback, Display scale, hit behavior, controls, Topo 15 GPU behavior, and every accepted result. | After Topo 17 passes, repeat stationary-size and uninterrupted approaching-pair playback checks on Purple and White at $\beta=0.5$ and $\beta=1$ and minimum, $1\times$, and maximum scale. Confirm both bodies remain exactly half-size and moving markers do not flash, with no geometry, timing, or control regression. |
| **Topo 17 — Remove white outlines from all Architrino markers** | **Implemented — awaiting user test** | The one canonical production marker painter now emits exactly one species-color fill disk only—blue electrino or red positrino—with every outline and stroke, center dot, and background, purple, or white ring or halo layer removed while retaining the accepted exact $X/2$ visible radii. Every stationary, pair always-bisector, binary split, live, paused, and scrubbed path routes through it. Scientific and mask radii, centers, positions, paths and orbits, overlap and split behavior, raw field values, contours and topology, histories and provenance, timing, transport, Display scale, hit and accessibility behavior, controls, and every accepted result are unchanged. Broad QA and relevant tests passed as implementation evidence only, not user acceptance. The full Topo suite retains the unrelated pre-existing four-versus-five view-radio static assertion failure; it was not changed. | First run the approaching pair at $\beta=0.5$ and $\beta=1$, Purple then White, at $1\times$ live through crossing and with scrub and pause. Confirm solid blue and red disks only, with no rings, outlines, center dots, halos, or flashing. If that passes, spot-check stationary singles and orbiting binary at minimum, $1\times$, and maximum Display scale. |
| **Topo 18 — Approaching-pair starts paused with spacebar playback** | **Planned / not implemented** | Both prescribed animated scenarios—approaching collinear electrino–positrino and orbiting binary electrino–positrino—must start at the true phase-zero frame and remain stopped on selection, opening, refresh, and Reset. Exact binary reproduction: Purple supports Space start and pause, but White does not; if White is selected first, Space already fails to start playback, so this is not only a Purple-to-White transition failure. Treat White-background state as part of the reproducer while diagnosing focus and keyboard routing rather than assuming the visual theme is causal. Inspect focus movement from background-radio selection, keydown-listener scope and installation, default radio Space behavior, event-target filtering, stale playback ownership or state, rerender or listener replacement, and whether deliberate canvas or panel refocus is required. Context-safe Space must toggle Play and Pause after scenario selection and every background change, while Space on a focused radio activates only that radio without double-toggling playback and sliders, text inputs, and native controls remain unhijacked. Preserve mouse Play, scrubber and resume, Reset-paused behavior, true-zero starts, field and contours, Display scale, controls, and every accepted Topo behavior. | Begin with a fresh orbiting-binary scenario and select White first; from the intended non-control context confirm Space starts and pauses. Then select Purple and confirm Space start and pause, switch to White again and repeat, exercising pointer and keyboard background selection separately. Confirm native radio Space behavior, no double activation or control-keyboard hijacking, then spot-check the approaching-pair true-zero and transport contract. |
| **Topo 19 — Orbiting-binary Contour strength regression** | **Planned / not implemented** | In the orbiting binary electrino–positrino scenario, Contour strength no longer changes visible contour strength after the two-pass GPU renderer. Diagnose the control value and output, event path, and uniform or style propagation into every selected GPU-threshold draw across live and paused frames, White and Purple, and low, intermediate, and high nonzero strengths; zero must hide contours. Restore the user-passed graded hierarchy: strongest selected levels remain stronger, weaker levels fade sooner, and Contour strength scales the visible profile without moving or changing contour geometry, count, or topology. Preserve raw signed wake, thresholds, masks and unavailable states, the current-frame two-pass renderer, cadence, phase synchronization, histories and provenance, Display scale, scrubber and playback, and every accepted control. | At a representative orbiting-binary phase on White and Purple, test 100%, intermediate, low nonzero, and zero strength in live and paused states. Confirm visible strength responds, the graded hierarchy remains, zero hides contours, and geometry keys, positions, counts, and topology are unchanged. |

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
