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
| **Topo 16 — Halve electrino display radius in all scenes** | **Archived — user-tested / passed** | The user confirmed the fixed marker size works across Display scale. Both species use one canonical 2.25 CSS-pixel visible radius at $0.5\times$, $1\times$, and $2\times$; Display scale changes mapped centers and field and contour extent, not glyph radius. Solid species-color disks, ring-free styling, aligned centers and paths, archived Topo 17 and Topo 21 behavior, and scale-independent scientific scalar and contour authority remain preserved. Focused tests, syntax, and diff checks are implementation evidence; the user's report supplies acceptance. | None; reopen only if marker pixel radius changes with Display scale or marker centers, field extent, contours, styling, or scientific authority regress. |
| **Topo 17 — Remove white outlines from all Architrino markers** | **Archived — user-tested / passed** | The user passed the combined prepared test: solid $X/2$ species-color markers remained stable with Contour strength $0$, with no outline, center dot, ring, halo, or exposed mask pixels. The disk-edge mask and fail-closed center remain accepted; lossless contour-off evidence and the user test establish that the marker path does not own the former flicker. | None; reopen only if marker styling, disk-edge masking, exposed pixels, or marker-specific stability regresses. |
| **Topo 18 — Approaching-pair starts paused with spacebar playback** | **Archived — user-tested / passed** | The user accepted the prescribed-animation paused-start behavior. Approaching collinear opens on its true starting frame and remains paused; motion begins only through deliberate Play activation or context-safe Space, and Space toggles Play and Pause without changing the accepted Reset-paused, scrub-and-resume, pointer, or native-control keyboard contracts. | None; reopen only if an animated scenario auto-plays on entry or Reset, deliberate Play or context-safe Space fails, or focused-control keyboard behavior regresses. |
| **Topo 19 — Orbiting-binary Contour strength regression** | **Planned / not implemented** | In the orbiting binary electrino–positrino scenario, Contour strength no longer changes visible contour strength after the two-pass GPU renderer. Diagnose the control value and output, event path, and uniform or style propagation into every selected GPU-threshold draw across live and paused frames, White and Purple, and low, intermediate, and high nonzero strengths; zero must hide contours. Restore the user-passed graded hierarchy: strongest selected levels remain stronger, weaker levels fade sooner, and Contour strength scales the visible profile without moving or changing contour geometry, count, or topology. Preserve raw signed wake, thresholds, masks and unavailable states, the current-frame two-pass renderer, cadence, phase synchronization, histories and provenance, Display scale, scrubber and playback, and every accepted control. | At a representative orbiting-binary phase on White and Purple, test 100%, intermediate, low nonzero, and zero strength in live and paused states. Confirm visible strength responds, the graded hierarchy remains, zero hides contours, and geometry keys, positions, counts, and topology are unchanged. |
| **Topo 20 — Nonzero minimum beta for animated scenarios** | **Implemented — awaiting user test** | Approaching collinear electrino–positrino and orbiting binary electrino–positrino now enforce prescribed $\beta\geq0.05$ across slider minimum, Home, Arrow and pointer input, programmatic and default values, scenario synchronization, displayed output, and accessibility text. Stationary singles retain exact $\beta=0$ and slider minimum $0$. Pair and binary enter paused at phase zero; Play, Space, pause, scrub, and Reset contracts remain intact. Focused live checks covered pair Home, Arrow, pointer, Play, pause, scrub, and Reset plus binary White-first Space, Space, and Reset; 78 of 78 focused and full tests, syntax, and diff checks passed. This is implementation evidence only, not user acceptance. Preserve field law, trajectories except through selected beta, histories and provenance, contour geometry and topology, timing, controls, and every accepted result. | Switch between stationary and animated scenarios: confirm stationary permits exact zero, each animated scenario starts or clamps at $\beta\geq0.05$, Home cannot select zero, and Play visibly advances from the paused phase-zero frame. Verify Arrow and pointer input, pause, scrub, Reset, output and accessibility text, binary White-first Space, and that switching back does not corrupt stationary zero. |
| **Topo 21 — Low-beta near-source contour refinement** | **Archived — user-tested / passed** | The user passed the prepared approaching-pair test at $\beta=0.10$, White, $1\times$, phases approximately 20–35, and Contour strength $75\%$: the first two contours were round and continuous with no flashing; the restored $75\%$ view and Purple spot-check also passed. The accepted bounded same-scalar whole-component refinement remains limited to $\beta\leq0.25$ outside the crossing window, with no smoothing, prescribed circles, mask fill, threshold changes, or topology fabrication; crossing and $\beta=0.5$ or $1$ remain unchanged. | None; reopen only if low-beta near-source contours become polygonal, discontinuous, or flash again. |
| **Topo 22 — Single-electrino beta-zero legacy display regression** | **Planned / not implemented** | Exact observed scene: Electrostatic single electrino at $\beta=0$ shows a thick purple ring around the electrino and shading that resembles an old Enhanced or legacy presentation rather than the recently user-passed ordinary gradual shading. Reproduce and capture the exact visible frame before diagnosing; do not assume Enhanced is selected. Audit automatic ordinary-view routing, stationary beta-zero Source-local presentation, current Shading spread and Physical-versus-legacy transfer, marker, mask, and ring layers, Purple and White backgrounds, cache or state retained from prior scenarios, and stale CSS, WebGL, or canvas paths. Required behavior is the current accepted Source-local ordinary shading with a solid half-size blue marker and no purple or white ring or halo; controls and legend must match the actual transfer. Preserve raw field values, the mask-to-disk-edge and fail-closed-center contract, contour thresholds and geometry, Display scale, and every accepted behavior. | From a fresh load and by switching from another scenario, open Electrostatic single electrino at $\beta=0$ on Purple and White. Exercise the current ordinary controls at tight and broad Shading spread and representative Contour count, Contour strength, and Display scale settings; confirm accepted gradual shading, no legacy presentation or ring, an accurate legend, and no cache dependence. Compare the positrino scene. |
| **Topo 23 — Approaching-pair pause contour blank-frame flash** | **Planned / not implemented** | In approaching collinear electrino–positrino playback, pressing Space to pause briefly removes every contour line before they return. Treat this as a live-preview to paused/full-density handoff defect, not intended refinement. Diagnose Space and Pause event ordering, playback cancellation, contour-canvas clear timing, preview-frame retention, asynchronous full-density sampling and extraction completion, frame, cache, and temporal-key swaps, stale-result guards, error and fallback paths, and whether button Pause or scrub release behaves similarly. On pause, retain the last complete visible live contour frame until the same-phase paused/full-density contour frame is complete, then swap atomically; never present a clear-only, blank, stale, or mixed-phase frame. Preserve the exact selected phase, raw field and topology, masks, near-source refinements, crossing grids, scrubber, Play, Reset, and Space behavior, Display scale, cadence, controls, and every accepted result. | In the approaching pair at low, $0.5$, and $1$ prescribed beta on White and Purple, pause with Space and the button before, at, and after crossing; also release the scrubber and test minimum, $1\times$, and maximum scale. Confirm contours remain continuously visible at one phase with no disappearance or pop, then refined geometry replaces the live frame atomically. Spot-check the binary if it shares transport. |

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
