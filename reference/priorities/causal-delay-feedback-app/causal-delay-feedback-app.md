# Causal Delay Feedback App

## Workstream Metadata

- Kind: `priority-app`
- Rank: `proposed`
- Value: `high`
- Cost: `unscored`
- ROI: `unscored`
- Status: `queued`

## Current

This folder owns the priority packet for a single-page animation app that teaches causal-delay feedback depth in $\mathbb{A}\mathbb{A}\mathbb{A}$.

The app should make one point visually clear: the present receiver state is not determined only by current source and receiver positions. It depends on causal-delay hits from retained source history, and deeper retained histories can still affect the outcome when their contribution remains active.

## Objective

Build a compact teaching app with one main animation canvas, direct dragging interactions, solver-generated architrino paths, and lightweight live diagnostics for causal-delay feedback depth.

The first version should be a candidate-level explanatory model. It should teach path-history and delayed-hit mechanics without claiming to solve full Noether sea feedback, exact many-body recurrence, or optical surface routing. The path geometry itself should still come from solver output given declared starting conditions.

## Core Teaching Claims

- Present interaction depends on source history, not only source position at `now`.
- Each active feedback depth represents another retained causal-delay contribution.
- Older contributions should fade only because the declared geometry, $1/r$ falloff, and coupling make them weaker, not because old history is assumed irrelevant.
- Invalid or inactive causal-wake paths should be visible as rejected rows or faded paths, so the user can see why they do not contribute.
- The receiver state is a sum of active contributions, not a single nearest or most recent event.
- Moving architrino paths must be computed from starting conditions rather than hand-shaped by the display layer.

## App Shape

- Route target: `causal-delay-feedback.html`.
- Runtime target: a focused module under `src/apps/causal-delay-feedback/` when implementation starts.
- Page structure: full-viewport canvas with a compact floating toolbar and a small collapsible readout, not a dense side-panel app.
- First model: a few draggable initial-condition handles for architrinos, one receiver probe, and a small finite set of retained causal-delay paths computed from solver history.
- Visual style: reuse Ideal Swarm-style architrino markers, orbit/path trails, purple-background canvas treatment, and emitter-colored causal-wake arcs/pulses where practical.
- Interaction style: the canvas is the control surface. Users should learn by dragging source markers, receiver probes, velocity arrows, and history-depth handles.

## Visual And UI Conventions

- Use purple as the background atmosphere: a dark purple / near-black canvas with restrained purple depth fields behind the motion.
- Use the standard app font stack: `"Helvetica Neue", Arial, sans-serif`.
- Color causal-wake arcs and pulses by their emitter: positrino-sourced wakes inherit the positrino color, and electrino-sourced wakes inherit the electrino color.
- Do not use purple as the causal-wake color. Purple belongs to the canvas atmosphere and background depth field.
- Neutral, mixed, or aggregate wake summaries should use a desaturated outline, split-color bundle, or faint white/lavender diagnostic treatment only if it remains distinct from the purple background.
- Use red/blue polarity markers for positrino/electrino objects when polarity is shown, and keep their emitted wake arcs/pulses in the same color family.
- Keep panels at or below an 8px radius, with restrained borders and translucent dark fills.
- Prefer icon buttons, including a settings gear, and draggable handles over labeled slider rows.
- Keep text small and functional: labels should name the selected object, time, depth, or contribution rather than explain the whole app.

## V1 Product Direction

The first build should feel simpler than Photon or Ideal Swarm:

- one canvas-first scene;
- one floating toolbar with a preset dropdown, play/pause, reset, reset preset, path visibility, readout toggle, and settings gear;
- no always-open control panel;
- no large formula panel;
- a compact named preset dropdown, consistent with the Photon app pattern;
- no search, export, or markdown reader in v1;
- no more than three primary draggable objects visible at startup;
- and one compact readout that updates from the current selection.

The app should behave more like a small physics sandbox than a parameter dashboard. Users should change the state by moving objects, not by filling out a form.

## Solver-Backed Model

The app should use the architrino motion and geometry solver as its source of truth for paths.

The direct-manipulation canvas sets initial conditions:

- architrino initial position;
- architrino initial velocity;
- polarity or role when shown;
- receiver probe position;
- run duration;
- output stride;
- and retained history depth.

The solver returns:

- frame samples with architrino positions and velocities;
- path-history samples for replay;
- active causal-root rows;
- delayed-hit rows;
- rejected or unresolved root diagnostics;
- and compact contribution summaries for the receiver probe.

The app renders those returned datasets. It should not draw physically meaningful architrino trajectories from CSS, pointer interpolation, or hand-authored Bezier paths except as a temporary drag preview before a solver run completes.

## Simulation Flow

1. User drags an initial-condition handle.
2. App updates the local draft setup immediately.
3. App submits the setup to the solver or app-worker adapter.
4. Solver computes the architrino path history, causal roots, delayed hits, and diagnostics.
5. App replays the solver dataset on the canvas.
6. User scrubs `now` across the replayed path history and sees which delayed hits are active.

During dragging, the canvas may show a lightweight preview path so the interface feels responsive. After release, the authoritative displayed path should be replaced by the solver result.

## Contact Sheet Proofs

Contact sheet proofs may use representative mock solver-replay paths before the app has real solver integration. The proof goal is visual readability, not numerical correctness.

Mock proof datasets must be labeled as `representative mock solver replay` in the proof artifact or local proof notes. They should imitate the solver output shape closely enough to test layout:

- frame samples for one positrino/electrino pair;
- path-history samples;
- active causal-root rows;
- delayed-hit rows;
- emitter colors;
- contribution summaries;
- and inactive or rejected rows for at least one proof variant.

The baseline contact sheet scene is one pair: one positrino, one electrino, one receiver probe, three retained feedback depths, and a visible contribution stack. This is the first landscape proof case because it tests the essential readability burden without turning the design into a many-body view.

The contact-sheet frame should be YouTube-compatible landscape. The standard target is 16:9, with 1920x1080 as the primary proof tile. Scale checks may use other 16:9 YouTube resolutions, but the first proof should not mix 16:10 or 4:3 frames.

Accepted first proof constraints:

- Keep one pair only: one positrino, one electrino, and one receiver probe.
- Use three retained feedback depths.
- Show both wake modes across the proof set: `partial_propagating_arcs` and `full_circular_arcs`.
- Use 16:9 framing, with 1920x1080 as the design target.

Landscape contact sheets should use the accepted six-variant proof set. Each variant should preserve the one-pair, three-depth scope and be framed as a 16:9 YouTube-compatible landscape tile.

- `1920x1080` primary proof tile;
- `1280x720` downscale readability check;
- `3840x2160` upscale spacing check when a 4K proof is useful;

Accepted first contact sheet variants:

| Variant | Purpose |
| --- | --- |
| `partial_arcs_on_default_purple_canvas` | Default teaching scene with one pair, one receiver, three retained depths, and smaller outward-propagating emitter-colored curved arcs. |
| `full_circular_arcs_on_default_purple_canvas` | Full emitted circular wake geometry with emitter-colored arcs and active receiver intersections highlighted. |
| `dense_history_on_default_purple_canvas` | Overlap stress case with multiple emitter-colored curved arcs on the primary purple canvas background. |
| `partial_arcs_on_deep_purple_canvas` | Same default teaching scene on a darker purple / near-black canvas atmosphere. |
| `partial_arcs_on_lifted_purple_canvas` | Same default teaching scene on a lifted purple canvas atmosphere for contrast comparison. |
| `contrast_stress` | Red/blue wakes, selected cyan highlights, amber warnings, inactive/rejected rows, faded depths, and white text. |

## Resolved Landscape Design Decisions

- The emitter-color rule is accepted: causal-wake arcs and pulses use the color of the emitting architrino.
- The landscape layout is accepted: full 16:9 canvas, compact floating toolbar, compact readout, receiver-side contribution stack, and no dense side panel.
- Causal wakes should be drawn as curved arcs, not straight rays.
- A full-circular-arc preset should exist because it teaches the complete emitted wake geometry.
- The default teaching view should use smaller outward-propagating arcs moving toward each intersection, because partial arcs keep the screen less busy and make feedback arrivals easier to see.
- The first contact sheet proof scope is accepted: one positrino, one electrino, one receiver probe, three retained feedback depths, and both wake modes shown across 16:9 proof variants.
- The settings gear is accepted; canvas color should be one of the first settings so purple-background variants can be tested without adding a dense control panel.
- Six landscape contact sheet variants are enough for the first visual proof pass.
- Contribution magnitude should use a $1/r$ falloff law in v1.
- Causal-wake fading and thinning should be tunable from computed contribution magnitude; weak or subthreshold wakes may desaturate toward white as an assembly-relevance indicator, but their source identity should remain readable.

## Visualization

### Canvas

- Use one large canvas with a horizontal space axis and a subtle time-depth stack behind it.
- Keep the source, receiver, active paths, and arriving pulses visible at the same time.
- Reserve a small edge strip or inset for the contribution stack so the main animation does not become crowded.
- Use stable scaling: changing field speed or feedback depth should not resize the whole scene unexpectedly.
- Keep the default composition sparse: two architrino initial-condition handles, one receiver probe, three visible feedback-depth rows, and a thin contribution stack.
- Let the main source path and receiver location occupy the first viewport immediately; avoid a landing-page feel.

### Objects

- Draw the source setup as one draggable positrino/electrino pair or a compact draggable architrino initial-condition marker.
- Draw the receiver as a draggable probe with a visible `now` marker.
- Draw each retained feedback depth as a separate solver-returned curved causal-wake arc with its own depth index and emitter color.
- Draw pulses as small moving packets on the causal-wake paths, using the same color as the emitting architrino.
- Draw inactive or invalid paths as faint dashed paths with a rejection reason.
- Draw a draggable velocity arrow attached to the source. Pulling the arrow should change speed and direction without requiring a numeric control.
- Draw a small depth handle or plus/minus chip near the contribution stack for adding or removing retained depths.
- Support two wake-arc display modes: `partial_propagating_arcs` for the default teaching view and `full_circular_arcs` for the full-geometry preset.

### Animation

- Animate architrino markers along solver-returned path samples.
- Animate partial causal-wake arcs expanding outward from prior source positions toward each active intersection.
- Animate pulses on those visible arcs and land them on the receiver at `now`.
- In full-circular-arc mode, draw complete emitted circles or near-circles as background geometry, then highlight the active arc segment that reaches the receiver.
- Keep every pulse and wake arc color-locked to its emitter for the full trip, including faded older depths.
- Fade and thin older paths by computed contribution strength using the $1/r$ falloff while keeping their depth index and emission time readable.
- Let weak paths approach a thin desaturated or white endpoint state below the assembly-relevance threshold, provided the wake's emitter identity remains clear from the active segment, pulse, depth row, or endpoint label.
- When a pulse lands, add its signed contribution to the receiver's contribution stack.
- When geometry changes, animate paths entering or leaving the active set instead of snapping them silently on and off.
- Provide pause/play, reset, slow/fast, and frame-step controls.
- While dragging, pause or slow the animation enough that users can see path geometry update continuously.
- On release, briefly highlight the changed paths and updated contribution rows.

## Visual QA Requirements

- Test whether the purple background leaves enough contrast for red positrino wakes, blue electrino wakes, selected cyan highlights, amber warning states, and white text.
- Test at least one dense history scene where multiple emitter-colored arcs overlap against the purple background.
- Test both normal and dimmed/faded causal-wake arcs so old history remains readable without overwhelming the canvas.
- Test $1/r$-driven fade and stroke-width mappings, including a weak/subthreshold state that can approach white without looking like a new emitter color.
- If emitter colors are hard to distinguish on purple, revise the background saturation/value before changing the emitter-color rule.
- Preserve the rule that causal-wake arcs and pulses are colored by their emitter unless a later visual test proves a specific accessibility exception is required.
- Include the accepted six-variant contact sheet proof set in the first visual pass.

## Presets

V1 should include a compact named preset dropdown in the floating toolbar, following the Photon app's basic pattern: load a complete named state, then allow `Reset preset` to restore the last loaded preset.

The preset dropdown should be small and secondary. It should not turn the app back into a control-dense inspector.

Named presets should load complete app state:

- initial positions;
- initial velocities;
- polarity or role;
- receiver probe position;
- run duration;
- retained history depth;
- path visibility mode;
- wake-arc display mode;
- readout visibility;
- canvas color or purple-background atmosphere variant;
- and proof dataset source when a contact sheet is using mock replay data.

Initial preset set:

| Preset | Purpose |
| --- | --- |
| `one_pair_baseline` | Default one positrino/electrino pair with three readable causal-wake depths. |
| `one_pair_dense_history` | Stress test for overlapping emitter-colored causal-wake arcs on purple background. |
| `full_circular_arcs` | Full emitted circular wake geometry with active receiver intersections highlighted. |
| `partial_propagating_arcs` | Default teaching view with smaller outward-propagating arcs moving toward each active intersection. |
| `wide_delay_gap` | Clearer teaching preset with long travel times and visibly separated arrivals. |
| `near_receiver` | Short-delay preset where current position and recent history compete visually. |
| `contrast_stress` | Visual QA preset for red/blue wakes, faded depths, selection cyan, warnings, and white text. |

Search, export, import, and session-preset promotion should stay out of v1. They can follow the Photon pattern later if configuration exploration becomes useful.

## Settings

V1 should include a compact settings gear in the floating toolbar. The gear opens a small popover, not a side panel.

Initial settings:

- Canvas color: choose among the approved purple-background atmosphere variants and any test fallback color.
- Background depth field: on/off.
- Reduced motion: on/off.
- High contrast paths: on/off.

Canvas color is a first-class app setting. It should be stored with named presets and mock contact-sheet datasets so visual proofs can compare the same scene across background variants.

The settings popover should close when the user clicks outside it or selects a setting. It should not introduce long explanatory text or dense slider rows.

## Direct Manipulation Model

Primary interactions:

- Drag the source marker to change the source initial position.
- Drag the receiver probe to change the hit geometry.
- Drag the source velocity arrow to change source initial velocity.
- Drag a source-path ghost point only as a draft setup handle when the app is in a solver-prep mode; ordinary replay paths remain solver-owned.
- Click a feedback-depth path to select it and show its row in the compact readout.
- Use a small depth stepper near the contribution stack to add or remove retained depths.

Secondary interactions:

- Hover a pulse to show emission time, hit time, travel time, and contribution magnitude.
- Hover an inactive path to show the rejection reason.
- Click the contribution stack to highlight the path that produced that contribution.
- Use the mouse wheel or pinch to zoom only when the pointer is over the canvas background, not while dragging an object.

## Controls

V1 should avoid a large controls panel. The visible controls should be limited to:

- Preset dropdown.
- Play/pause.
- Reset.
- Reset preset.
- Paths on/off.
- Readout on/off.
- Settings gear.
- Slow/fast as a compact two-button or segmented control.
- Feedback depth plus/minus.

Canvas handles should replace these traditional controls:

| Traditional control | V1 replacement |
| --- | --- |
| Source speed | Drag the initial-velocity arrow. |
| Source-receiver separation | Drag the receiver probe or source marker. |
| Feedback depth count | Use the depth plus/minus chip beside the contribution stack. |
| History window length | Drag the history-window bracket on the trail. |
| Minimum contribution threshold | Drag a faint threshold line on the contribution stack. |
| Show inactive paths | Use the path visibility button cycle: `active`, `active+inactive`, `all`. |

Later controls may include:

- Receiver motion.
- Coupling sign and strength.
- Noise or perturbation seed for threshold demonstrations.
- Multi-source background mode.
- Export current settings as a preset.

## Diagnostics

The first version should show diagnostics as a compact readout tied to the current selection, not as a large always-open table.

Always-visible readouts:

- current `now`;
- solver status;
- active feedback-depth count;
- total receiver state;
- strongest active contribution;
- and selected object label.

Selected-depth readouts:

- emission time for each active depth;
- hit time for each active depth;
- causal travel time for each active depth;
- path distance;
- contribution sign;
- contribution magnitude;
- $1/r$ falloff factor;
- assembly-relevance threshold state;
- active, inactive, or rejected state;
- and total receiver state from the active contribution sum.

The diagnostic table may exist behind the readout toggle, but v1 should not make it the main interaction surface. Selecting a row should highlight the matching source position, causal-wake path, arriving pulse, and contribution-stack entry.

## Interaction Requirements

- Scrubbing time should move the visible `now` marker and recompute which history rows are active.
- Dragging the receiver should update path distances and contribution rows in real time.
- Changing feedback depth should add or remove rows without losing the current source-motion settings.
- Toggling inactive paths should preserve rejected rows in the table when they are relevant to understanding the geometry.
- Selecting a contribution-stack entry should highlight the causal-wake path that produced it.
- Drag targets must have generous hit areas so the app works on trackpads and tablets.
- Dragging a marker must update the visual paths first, then the numeric readout; the app should feel spatial before it feels tabular.
- Releasing a dragged initial-condition handle should enqueue or rerun the solver and mark previous paths as preview or stale until the new solver result arrives.
- If the dragged state creates no active paths, the canvas should show an empty active set and name why rather than freezing the prior paths.
- The initial scene should teach without any required setup: one moving source, one receiver, three retained paths, and a visible contribution stack.

## Data Model Requirements

Each retained depth row should be represented as structured state:

| Field | Meaning |
| --- | --- |
| `depth` | Feedback-depth index. |
| `sourceTime` | Source emission time for the retained contribution. |
| `emitterId` | Solver id of the source architrino that emitted the wake. |
| `emitterPolarity` | Positrino, electrino, neutral, or aggregate emitter classification. |
| `emitterColor` | Display color inherited by the causal-wake arc and pulse. |
| `hitTime` | Receiver hit time. |
| `travelTime` | Delay between source emission and receiver hit. |
| `sourcePosition` | Source position at emission. |
| `receiverPosition` | Receiver position at hit. |
| `pathDistance` | Spatial distance used by the causal-delay calculation. |
| `falloffLaw` | Contribution falloff law; v1 uses `$1/r$`. |
| `falloffFactor` | Computed distance factor from the $1/r$ falloff. |
| `contributionSign` | Signed direction or polarity of the contribution. |
| `contributionMagnitude` | Contribution strength after distance, coupling, and fade rules. |
| `assemblyThreshold` | Tunable threshold for marking a contribution as likely or unlikely to affect an assembly. |
| `thresholdState` | `above_threshold`, `near_threshold`, or `below_threshold`. |
| `visualWeight` | Derived stroke width, alpha, and desaturation level for drawing the wake. |
| `status` | `active`, `inactive`, or `rejected`. |
| `reason` | Plain reason for inactive or rejected rows. |

Each solver run should also carry a compact setup record:

| Field | Meaning |
| --- | --- |
| `runId` | Stable id for the solver result currently displayed. |
| `presetId` | Named preset currently loaded, when any. |
| `datasetSource` | `solver`, `representative_mock_solver_replay`, or `draft_preview`. |
| `canvasColor` | Selected canvas color or purple-background atmosphere variant. |
| `wakeArcDisplayMode` | `partial_propagating_arcs` or `full_circular_arcs`. |
| `initialConditions` | Initial positions, velocities, polarity or role, and run duration. |
| `solverStatus` | `draft`, `running`, `ready`, `stale`, `failed`, or `unsupported`. |
| `frameStride` | Display stride for replayed frame samples. |
| `historyDepth` | Retained path-history depth requested from the solver. |
| `assemblyThreshold` | Current visual/diagnostic threshold for weak contribution treatment. |
| `haltReason` | Solver halt status or completion reason. |

## First Build Queue

1. `solver_setup_contract` - Define the initial-condition request and solver dataset shape needed by the app, including mock contact-sheet dataset shape. Status: `active`.
2. `contact_sheet_mock_replay` - Produce the accepted six-variant one-pair representative mock solver-replay contact sheet, including full-circular-arc and partial-propagating-arc variants. Status: `pending`.
3. `named_preset_dropdown` - Add a compact preset dropdown and `Reset preset` behavior consistent with the Photon app pattern. Status: `pending`.
4. `direct_manipulation_mock` - Create a static canvas layout with purple background, draggable source initial position, receiver, initial-velocity arrow, retained emitter-colored causal-wake paths, depth labels, and contribution stack. Status: `pending`.
5. `solver_replay_adapter` - Replay solver-returned frame samples, path-history samples, causal roots, delayed hits, emitter colors, $1/r$ falloff factors, thresholds, and contribution summaries. Status: `pending`.
6. `drag_to_solver_loop` - Make source, receiver, velocity arrow, and history-depth handles update setup state and rerun the solver on release. Status: `pending`.
7. `pulse_animation` - Animate source motion, outward-propagating causal-wake arcs, and emitter-colored pulses along solver-returned retained paths. Status: `pending`.
8. `compact_readout` - Add selected-object, selected-depth, and solver-status readouts without a dense default panel. Status: `pending`.
9. `settings_gear` - Add a compact settings popover with canvas color, background depth field, reduced motion, and high contrast paths. Status: `pending`.
10. `toolbar_minimum` - Add preset dropdown, play/pause, reset, reset preset, paths cycle, slow/fast, readout toggle, settings gear, and rerun indicator. Status: `pending`.
11. `purple_background_contrast_pass` - Verify the purple background against emitter-colored wake arcs, pulse fades, weak-to-white threshold states, selected highlights, warnings, and text. Status: `pending`.
12. `invalid_path_states` - Show inactive, rejected, unresolved, and stale paths with clear visual states and concise reasons. Status: `pending`.

## Implementation Boundaries

- Do not model this as literal optical surface behavior.
- Do not hand-author meaningful architrino paths in the app runtime; use solver output for path history.
- Do not let contact-sheet mock paths become accepted runtime physics; they are representative proof data only.
- Do not claim Noether sea closure from the toy feedback-depth model.
- Keep the page as a usable animation app first, not a prose explainer with a small graphic.
- Keep any end-user language plain: explain causal delay as influence arriving after travel time.
- Do not let the app grow into another control-dense inspector before the direct-manipulation loop is working.
- Do not use the word `electron` for the draggable primitives in the app UI when the object is meant to be an architrino, electrino, positrino, source marker, or receiver probe.

## Open Questions

- Should the first build use line motion, orbit motion, or both?
- Should the default receiver be fixed, or should receiver motion be available from the start?
- Should v1 include signed red/blue polarity, or keep the first source neutral until the timing model is clear?
- Should the first visual mock use SVG/canvas 2D for speed of iteration, or Three.js with an orthographic camera to reuse more existing app rendering conventions?
- Should the first implementation call the current JavaScript assembly-dynamics solver path as a bridge, or wait for the central solver app bridge to expose motion simulation plus causal-root rows?
