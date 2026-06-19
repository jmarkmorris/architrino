# Causal Delay Feedback App

## Workstream Metadata

- Kind: `priority-app`
- Rank: `proposed`
- Value: `high`
- Cost: `unscored`
- ROI: `unscored`
- Status: `active`

## Current

This folder owns the priority packet for a single-page animation app that teaches causal-delay feedback depth in $\mathbb{A}\mathbb{A}\mathbb{A}$.

The app should make one point visually clear: the present Virtual Observer readout is not determined only by current source and Virtual Observer positions. It depends on causal-delay hits from retained source history, and deeper retained histories can still affect the outcome when their contribution remains active.

## Objective

Build a compact teaching app with one main animation canvas, solver-generated architrino paths, solver-shaped replay data, and lightweight live diagnostics for causal-delay feedback depth.

The first runnable version uses a temporary mock replay adapter that matches the intended solver output shape. It should teach path-history and delayed-hit mechanics without claiming to solve full Noether sea feedback, exact many-body recurrence, or optical surface routing. The path geometry in production modes should come from solver output given declared starting conditions.

## Core Teaching Claims

- Present interaction depends on source history, not only source position at `now`.
- Each active feedback depth represents another retained causal-delay contribution.
- Older contributions should fade only because the declared geometry, $1/r$ falloff, and coupling make them weaker, not because old history is assumed irrelevant.
- Invalid or inactive causal-wake paths should be visible as rejected rows or faded paths, so the user can see why they do not contribute.
- The Virtual Observer readout is a sum of active contributions, not a single nearest or most recent event.
- Moving architrino paths must be computed from starting conditions rather than hand-shaped by the display layer.

## App Shape

- Route target: `causal-delay-feedback.html`.
- Runtime target: focused modules under `src/apps/causal-delay-feedback/`.
- Page structure: full-viewport canvas with a compact floating toolbar, small legend chips, and a hover label, not a dense side-panel app.
- First runnable model: one representative positrino/electrino replay pair, six retained path-history points per path, and ten cross-path causal-wake links generated from a solver-shaped mock dataset.
- Visual style: reuse Ideal Swarm-style architrino markers, orbit/path trails, purple-background canvas treatment, and emitter-colored causal-wake arcs where practical.
- Interaction style: the canvas is the control surface. The first implementation prioritizes replay, preset selection, reset, hover labels, canvas-color settings, and compact speed settings. Path history is always visible.

## Visual And UI Conventions

- Use purple as the background atmosphere: a dark purple / near-black canvas with restrained purple depth fields behind the motion.
- Use the standard app font stack: `"Helvetica Neue", Arial, sans-serif`.
- Color causal-wake arcs by their emitter: positrino-sourced wakes inherit the positrino color, and electrino-sourced wakes inherit the electrino color.
- Do not use purple as the causal-wake color. Purple belongs to the canvas atmosphere and background depth field.
- Neutral, mixed, or aggregate wake summaries should use a desaturated outline, split-color bundle, or faint white/lavender diagnostic treatment only if it remains distinct from the purple background.
- Use red/blue polarity markers for positrino/electrino objects when polarity is shown, and keep their emitted wake arcs in the same color family.
- Keep panels at or below an 8px radius, with restrained borders and translucent dark fills.
- Prefer icon buttons, including a settings gear, and draggable handles over labeled slider rows except for compact speed settings where exact values matter.
- Keep text small and functional: labels should name the selected object, time, depth, or contribution rather than explain the whole app.

## Reusable App Design References

Recent app work has several reusable design patterns for this app:

- [Molecule Visualization](../../../molecule.html) provides the best compact app-shell reference: a full canvas, top floating title block, small toolbar, color legend chips, hover label, and compact bottom readout.
- [MoleculeRuntime.js](../../../src/apps/molecule/MoleculeRuntime.js) has useful viewport-fit logic that keeps the main object clear of the readout. Reuse that idea so the Virtual Observer, moving architrino paths, and contribution stack do not collide at different canvas sizes.
- [IdealSwarmRuntime.js](../../../src/apps/ideal-swarm/IdealSwarmRuntime.js) remains the primary marker and trail grammar reference for architrino motion: glow-backed positrino/electrino markers, layered path ribbons, faded wake layers, and dark full-canvas atmosphere.
- [PhotonSwarmVisualRuntime.js](../../../src/apps/photon/PhotonSwarmVisualRuntime.js) has a useful 2D arc-tail primitive: segmented curved arcs with width and alpha falloff. Adapt that pattern for causal-wake arcs and $1/r$ thinning.
- Do not import Molecule's dense side preset rail or Ideal Swarm's four-corner panel layout into v1. The causal-delay app should keep the canvas-first, low-control direction already selected.

## V1 Product Direction

The first build should feel simpler than Photon or Ideal Swarm:

- one canvas-first scene;
- one floating toolbar with a preset dropdown, play/pause, reset, and settings gear;
- no always-open control panel;
- no large formula panel;
- a compact named preset dropdown, consistent with the Photon app pattern;
- no search, export, or markdown reader in v1;
- no more than two live architrino markers visible at startup;
- no proof metadata panels on the canvas;
- and one compact hover label for retained path points.

The app should behave more like a small physics replay sandbox than a parameter dashboard. Users should first see the causal-delay feedback geometry animate without setup, then gain direct-manipulation controls once those controls can rerun the solver path.

## Solver-Backed Model

The app should use the architrino motion and geometry solver as its source of truth for paths.

The current implementation path is:

- default the standalone page to the central solver bridge motion replay path;
- keep a temporary mock adapter labeled `representative_mock_solver_replay` as the immediate fallback and as an explicit `?replay=mock` review mode;
- keep every runtime dataset shaped like a solver result;
- expose the bridge target as `central_solver_bridge_path_history_stream`;
- use the central solver bridge for frame samples, path-history samples, delayed-hit rows, and compact diagnostics when a solver client, worker, or WASM module factory is available.

Current central-bridge inspection:

- [SolverAppBridge.mjs](../../../src/solver/app/SolverAppBridge.mjs) exposes `createSolverAppBridgeClient` and already supports path-history, motion-simulation, delayed-hit, causal-root, shared-geometry, validation-replay, and app-playback run kinds.
- [SolverAppAdapters.mjs](../../../src/solver/app/SolverAppAdapters.mjs) and [SolverAppBridge.mjs](../../../src/solver/app/SolverAppBridge.mjs) now recognize `causal-delay-feedback` as a central-bridge app id for motion-simulation, path-history, causal-root, delayed-hit, app-playback, and validation-replay lanes.
- [CausalDelayFeedbackCentralBridgeAdapter.js](../../../src/apps/causal-delay-feedback/CausalDelayFeedbackCentralBridgeAdapter.js) now defines the causal-delay replay request contract, packages replay data as bridge-valid app-playback motion frames, delayed-hit rows, and geometry metadata, then normalizes app-shaped, bridge app-playback, or central motion-simulation responses into the canvas runtime dataset shape. In central motion mode it runs one `motionSimulation` request per architrino and one `delayedHits` request per visible wake link. It fails closed when frame samples, retained path-history samples, or delayed-hit rows are missing.
- The runtime uses the central bridge replay adapter by default, while `?replay=mock`, `?solver=mock`, or `?adapter=mock` forces the temporary representative replay adapter for visual review.
- The query-gated page path now provides default browser-side solver bridge options that dynamically load `.tmp/solver-build/wasm/architrino_solver_wasm_smoke.mjs` when the built solver artifact is available, while still allowing injected solver clients, workers, or factories through `ARCHITRINO_CAUSAL_DELAY_FEEDBACK_SOLVER_BRIDGE_OPTIONS`.
- The page attempts the central motion-simulation replay path by default: the bridge runs one motion simulation per architrino from the declared initial conditions, merges those solver-produced frame rows into the canvas dataset, then runs central delayed-hit solves for the visible cross-path wake links.
- Explicit central review URLs still work. `?replay=central&solverReplay=motion` selects central motion replay directly; `?replay=central&solverReplay=app-playback` keeps the bridge app-playback review path available.
- Without a solver execution source, the page keeps the representative mock replay and shows `representative fallback`.
- `node scripts/check-solver-app-bridge.mjs` passes for the current bridge, including causal-delay app-playback, motion-simulation, and delayed-hit smoke runs. The remaining causal-delay work is fuller causal-root diagnostics beyond the compact readout, direct-manipulation controls beyond initial position/velocity handles, and browser visual QA rather than repairing the generic bridge.

The direct-manipulation canvas sets initial conditions:

- architrino initial position;
- architrino initial velocity;
- polarity or role when shown;
- Virtual Observer position;
- run duration;
- output stride;
- and retained history depth.

The solver returns:

- frame samples with architrino positions and velocities;
- path-history samples for replay;
- active causal-root rows;
- delayed-hit rows;
- rejected or unresolved root diagnostics;
- and compact contribution summaries for the Virtual Observer readout.

The app renders solver-shaped datasets. It should not draw physically meaningful architrino trajectories from CSS, pointer interpolation, or hand-authored Bezier paths except as temporary proof data or a temporary drag preview before a solver run completes.

## Simulation Flow

1. App loads a named replay preset.
2. The runtime creates or receives a solver-shaped dataset with frame samples, retained path-history points, and causal-wake links.
3. App replays the dataset on the canvas.
4. User changes the named preset, play state, canvas color, or compact speed settings without opening a dense control panel.
5. After the central solver bridge is available, dragging an initial-condition handle should submit the setup to the solver or app-worker adapter.
6. Solver computes the architrino path history, causal roots, delayed hits, and diagnostics.
7. App replaces the draft or mock replay with the solver dataset.
8. User scrubs `now` across the replayed path history and sees which delayed hits are active.

During dragging, the canvas may show a lightweight preview path so the interface feels responsive. After release, the authoritative displayed path should be replaced by the solver result.

## Contact Sheet Proofs

Contact sheet proofs may use representative mock solver-replay paths before the app has real solver integration. The proof goal is visual readability, not numerical correctness.

[NPQG Fundamentals - Paths.pptx](NPQG Fundamentals - Paths.pptx) is a conceptual and geometry reference for path-history, expanding emissions, circular wake intersections, and action-at-intersection scenes. It is not the art-direction target. The contact sheet proofs should improve on the old slide aesthetic while preserving the useful causal-delay ideas.

Mock proof datasets must be labeled as `representative mock solver replay` in the proof artifact or local proof notes. They should imitate the solver output shape closely enough to test layout:

- frame samples for one positrino/electrino pair;
- path-history samples;
- active causal-root rows;
- delayed-hit rows;
- emitter colors;
- contribution summaries;
- and inactive or rejected rows for at least one proof variant.

The current contact sheet scene is one pair shown in a time-space diagram: the electrino path starts at the lower-left, the positrino path starts at the upper-left, both paths move left to right, cross near the middle, and then begin turning back toward each other as if attraction is bending the later motion. The proof images do not draw a Virtual Observer. The retained history labels are ordered from older to newer: `1` through `6`, with the path start as `1` and the path end as `6`. The visible wake links test cross-path causal feedback from each point `n` to the opposite path point `n+1`.

The contact-sheet frame should be YouTube-compatible landscape. The standard target is 16:9, with 1920x1080 as the primary proof tile. Scale checks may use other 16:9 YouTube resolutions, but the first proof should not mix 16:10 or 4:3 frames.

Accepted first proof constraints:

- Keep one pair only: one positrino path and one electrino path.
- Use six retained history points per path, shown as `1` through `6`.
- Use cross-path growing partial wake arcs in the current proof set. Keep `full_circular_arcs` as a later named preset rather than mixing it into this comparison sheet.
- Use 16:9 framing, with 1920x1080 as the design target.

Landscape contact sheets should use the accepted six-variant proof set. Each variant should preserve the one-pair, six-point, five-link-per-direction scope and be framed as a 16:9 YouTube-compatible landscape tile.

- `1920x1080` primary proof tile;
- `1280x720` downscale readability check;
- `3840x2160` upscale spacing check when a 4K proof is useful;

Accepted first contact sheet variants:

| Variant | Purpose |
| --- | --- |
| `cross_feedback_baseline_15_fronts` | Accepted sample-2-plus-sample-5 baseline: tight receiver-sector fronts with brighter visibility treatment. |
| `cross_feedback_tight_fronts` | Tighter receiver sector to test cleaner arrivals. |
| `cross_feedback_wide_fronts` | Slightly wider receiver sector to test readability. |
| `cross_feedback_thin_fronts` | Lighter/thinner wake traces to test low-clutter contrast. |
| `cross_feedback_bright_fronts` | Brighter wake traces to stress-test visibility on purple. |
| `cross_feedback_strong_falloff` | Stronger old-hit fading to test whether $1/r$ falloff should be visually amplified. |

Generated contact sheet proof artifacts:

- Generator: [generate_contact_sheet_mockups.py](generate_contact_sheet_mockups.py).
- Composite review sheet: [contact-sheet-six-variants.png](contact-sheets/contact-sheet-six-variants.png).
- Manifest: [manifest.json](contact-sheets/manifest.json).

| Variant | Proof tile |
| --- | --- |
| `cross_feedback_baseline_15_fronts` | [cross_feedback_baseline_15_fronts.png](contact-sheets/cross_feedback_baseline_15_fronts.png) |
| `cross_feedback_tight_fronts` | [cross_feedback_tight_fronts.png](contact-sheets/cross_feedback_tight_fronts.png) |
| `cross_feedback_wide_fronts` | [cross_feedback_wide_fronts.png](contact-sheets/cross_feedback_wide_fronts.png) |
| `cross_feedback_thin_fronts` | [cross_feedback_thin_fronts.png](contact-sheets/cross_feedback_thin_fronts.png) |
| `cross_feedback_bright_fronts` | [cross_feedback_bright_fronts.png](contact-sheets/cross_feedback_bright_fronts.png) |
| `cross_feedback_strong_falloff` | [cross_feedback_strong_falloff.png](contact-sheets/cross_feedback_strong_falloff.png) |

## Resolved Landscape Design Decisions

- The emitter-color rule is accepted: causal-wake arcs use the color of the emitting architrino.
- Use the official polarity colors in proof images: positrino red `#ff0000` and electrino blue `#0000ff`, with halo/outline treatment only for readability on purple.
- The landscape app layout may use compact runtime readouts, but the contact-sheet proof layout should be a full 16:9 canvas with only the compact floating toolbar and small legend.
- The comparison proof layout should use a time-space diagram: time on the horizontal axis, space on the vertical axis, and both paths moving left to right.
- The current comparison proof should not draw the Virtual Observer; it should show cross-path causal feedback between retained positrino and electrino history points.
- The representative pair should start separated on the left side: blue/electrino at lower-left and red/positrino at upper-left.
- The representative pair should cross near the middle and then begin bending back toward each other so the mock replay suggests attraction after the crossover.
- The final red/blue positions should remain separated enough that the late wake fronts are readable and do not overlap into a single bundle.
- Retained history points `1` and `2` should sit well left of the crossover on both paths so the crossover remains visually clean.
- Causal wakes should be drawn as curved arcs, not straight rays.
- Architrino path history should be drawn as solid trails, while causal wakes should be drawn as dotted arcs so the two uses of positrino/electrino color remain distinct.
- Active dotted wake arcs in the proof tiles should begin at the emitting history point and grow outward toward the later receiving history point on the opposite path.
- The visible wake segment length should grow linearly as each emitted band approaches its receiving path point.
- Wake progression and live architrino motion should use the same replay clock, so the final wake front reaches a receiving history point at the same time the receiving architrino reaches that point.
- Once a wake arc series reaches its receiving point in a simulation loop, that series is complete for the loop and should disappear until the next loop begins. Do not keep drawing additional post-receipt arcs from the receiver.
- Partial wake presets should use denser emission-to-receipt bands than the original contact-sheet count so the traveling series is easier to read.
- Clicking a receiving path-history point should select the point, not synthesize a final wake arc. The final arrival arc belongs to the normal timed progression.
- In the temporary mock replay, dragging a retained path-history point may deform the displayed path with a smooth local spline-style falloff, update the connected wake endpoints, and move the live architrino marker along the edited path. Solver-backed modes should replace this preview with a solver rerun.
- The accepted default wake-front treatment combines the tighter receiver sector from sample `2` with the brighter visibility treatment from sample `5`.
- Dotted wake fronts should be bolder near the emitter and fade lighter as they approach the receiver.
- Current proof wake arcs should only cover the emitter-to-receiver sector, not full circles or unrelated off-path arcs.
- Prototype proof tiles should not draw pulse dots or architrino-like markers on top of dotted wake arcs; the dotted wake stroke itself carries the wake geometry.
- A full-circular-arc preset should exist because it teaches the complete emitted wake geometry.
- The default teaching view should use smaller outward-propagating arcs moving toward each intersection, because partial arcs keep the screen less busy and make feedback arrivals easier to see.
- The first contact sheet proof scope is accepted: one positrino path, one electrino path, no Virtual Observer drawn, six retained path points per path, five cross-path feedback links per direction, and six 16:9 proof variants that compare undecided growing-arc treatments.
- The revised contact sheet proof canvas should be a solid purple field with no grid.
- Prototype canvases should not include a per-tile title panel; variant names belong in the contact-sheet manifest or surrounding review sheet, not inside each 1920x1080 proof tile.
- Contact-sheet proof tiles should not include the bottom data/readout panel or the right-edge `Feedback Links` panel; keep proof metadata in the manifest or review sheet.
- Toolbar proof icons should use recognizable meanings: play, reset, and settings. Avoid abstract placeholder glyphs that read as unrelated marks.
- All path-history points on the architrino paths should use the same dot treatment; selected rows may highlight the causal path or stack row, but not make one history dot look like a different class of object.
- Label each retained history point on each path as `1` through `6`, ordered older to newer.
- The proof image should communicate the active cross-path feedback links directly through the path labels and dotted wake arcs, not through a separate links panel.
- The positrino and electrino mock replay paths should not look like equal-and-opposite mirror curves; use visibly different path histories so the pair reads as two solver-owned trajectories.
- The representative mock pair should end in the upper-right region with visibly different slopes and curvature so the red and blue causal-wake arcs separate clearly as they reach later path points.
- Full circular wake geometry should keep every background circle at the same faint opacity so the nearest circle does not dominate the proof tile.
- The proof images should not draw straight source-to-receiver connector lines from history points; the dotted wake arc should carry the causal-hit geometry.
- The first proof should use linear or gently curved path-history motion. Orbit-motion scenes can come later.
- The first visual proof should use 2D canvas/SVG-style mock proof generation. Three.js can be deferred until runtime needs it.
- Contact sheet proofs can proceed with representative mock solver-replay paths before the real solver bridge is selected.
- The first landscape proof should not reserve a right-edge contribution stack.
- Use `Virtual Observer` as the end-user UI term for the observation point. Retain `receiver` only when referring to canonical causal-root math and solver/data fields.
- When the Virtual Observer appears in runtime app modes, it is not an architrino. The current contact-sheet proof omits it so the cross-path feedback links are easier to read.
- Signed positrino/electrino polarity color should be visible from the start.
- The settings gear is accepted; canvas color should be one of the first settings so purple-background variants can be tested without adding a dense control panel.
- Six landscape contact sheet variants are enough for the first visual proof pass.
- Contribution magnitude should use a $1/r$ falloff law in v1.
- Causal-wake fading and thinning should be tunable from computed contribution magnitude; weak or subthreshold wakes should use threshold-only cues.

## Visualization

### Canvas

- Use one large canvas with a light horizontal `time` axis and a light vertical `space` axis.
- Keep the source path points, receiving path points, active paths, and arriving wake segments visible at the same time.
- Do not reserve a proof-only right-edge panel; use the full canvas width for the path geometry.
- Use stable scaling: changing field speed or feedback depth should not resize the whole scene unexpectedly.
- In the representative replay, both architrino paths should start at 5% of the time-axis width and end at 95% of the time-axis width.
- Keep the current proof composition sparse: two solver-replay architrino paths, six retained points per path, and ten visible cross-path feedback links.
- Treat the beginning and ending of each path as first-class path-history points: the starting marker is point `1`, both endpoints are visible markers, and both endpoints can be dragged like the interior retained points.
- Keep the moving positrino and electrino as solver-owned architrino paths.
- Let the main path geometry occupy the first viewport immediately; avoid a landing-page feel.

### Objects

- Draw the source setup as one draggable positrino/electrino pair or a compact draggable architrino initial-condition marker.
- In runtime modes that include an observation point, draw the Virtual Observer as a draggable sample point with a visible `now` marker.
- In the current contact-sheet proof, omit the Virtual Observer and draw each retained cross-path feedback link as a separate curved dotted causal-wake arc with its own retained-hit index and emitter color.
- Do not draw separate pulse or particle markers on the causal-wake paths in the first proof; the dotted wake segment itself is the arrival cue.
- Draw inactive or invalid paths as faint dashed paths with a rejection reason.
- Draw a draggable velocity arrow attached to the source. Pulling the arrow should change speed and direction without requiring a numeric control.
- Draw a small depth handle or plus/minus chip near the contribution stack for adding or removing retained depths.
- Support two wake-arc display modes: `partial_propagating_arcs` for the default teaching view and `full_circular_arcs` for the full-geometry preset.

### Animation

- Animate architrino markers along solver-returned path samples.
- Use linear or gently curved path-history motion for the first proof scenes.
- Animate partial dotted causal-wake arcs expanding outward from prior source positions toward each active intersection.
- Animate those visible wake segments so their leading edge reaches the receiving path point at the active hit time.
- In full-circular-arc mode, draw complete emitted circles or near-circles as background geometry, then highlight the active arc segment that reaches the receiver.
- Keep every wake arc color-locked to its emitter for the full trip, including faded older depths.
- Fade and thin older paths by computed contribution strength using the $1/r$ falloff while keeping their depth index and emission time readable.
- Let weak paths approach a thin or desaturated endpoint state below the assembly-relevance threshold, provided the wake's emitter identity remains clear from the active segment, depth row, or endpoint label.
- When a wake segment reaches its receiver, add its signed contribution to the contribution stack.
- When geometry changes, animate paths entering or leaving the active set instead of snapping them silently on and off.
- Provide pause/play, reset, slow/fast, and frame-step controls.
- While dragging, pause or slow the animation enough that users can see path geometry update continuously.
- On release, briefly highlight the changed paths and updated contribution rows.

## Visual QA Requirements

- Test whether the purple background leaves enough contrast for red positrino wakes, blue electrino wakes, selected cyan highlights, amber warning states, and white text.
- Test at least one dense history scene where multiple emitter-colored arcs overlap against the purple background.
- Test both normal and dimmed/faded causal-wake arcs so old history remains readable without overwhelming the canvas.
- Test $1/r$-driven fade and stroke-width mappings, including a weak/subthreshold state that remains readable through threshold-only cues.
- If emitter colors are hard to distinguish on purple, revise the background saturation/value before changing the emitter-color rule.
- Preserve the rule that causal-wake arcs are colored by their emitter unless a later visual test proves a specific accessibility exception is required.
- Include the accepted six-variant contact sheet proof set in the first visual pass.

## Presets

V1 should include a compact named preset dropdown in the floating toolbar, following the Photon app's basic pattern: load a complete named state, then allow `Reset preset` to restore the last loaded preset.

The preset dropdown should be small and secondary. It should not turn the app back into a control-dense inspector.

Named presets should load complete app state:

- initial positions;
- initial velocities;
- polarity or role;
- Virtual Observer position;
- run duration;
- retained history depth;
- wake-arc display mode;
- weak contribution cue mode;
- readout visibility;
- canvas color or purple-background atmosphere variant;
- and proof dataset source when a contact sheet is using mock replay data.

Initial preset set:

| Preset | Purpose |
| --- | --- |
| `one_pair_baseline` | Default one positrino/electrino pair with three readable causal-wake depths. |
| `one_pair_dense_history` | Stress test for overlapping emitter-colored causal-wake arcs on purple background. |
| `full_circular_arcs` | Full emitted circular wake geometry with active Virtual Observer intersections highlighted. |
| `partial_propagating_arcs` | Default teaching view with smaller outward-propagating arcs moving toward each active intersection. |
| `wide_delay_gap` | Clearer teaching preset with long travel times and visibly separated arrivals. |
| `near_virtual_observer` | Short-delay preset where current position and recent history compete visually. |
| `contrast_stress` | Visual QA preset for red/blue wakes, faded depths, selection cyan, warnings, and white text. |

Search, export, import, and session-preset promotion should stay out of v1. They can follow the Photon pattern later if configuration exploration becomes useful.

## Settings

V1 should include a compact settings gear in the floating toolbar. The gear opens a small popover, not a side panel.

Initial settings:

- Canvas color: choose among the four iOS reader theme backgrounds: Purple, Light, Warm, and Dark.
- $c_f$ speed: compact slider that changes field-speed replay tempo between slow and fast without changing the retained geometry.
- Architrino speed: compact 10-stop slider/clicker for $v/c_f$ with exact stops `0.1`, `0.3`, `0.5`, `0.7`, `0.9`, `0.99`, `0.999`, `0.9999`, `0.99999`, and `0.999999`.
- Retained points: compact depth selector that reduces or restores active path-history points and feedback rows without changing the solver replay dataset.
- Background depth field: on/off.
- Weak contribution cue: off or threshold-only.
- Reduced motion: on/off.
- High contrast paths: on/off.

Canvas color is a first-class app setting. It should use the same four backgrounds allowed by the iOS reader app and should be stored with named presets and mock contact-sheet datasets so visual proofs can compare the same scene across those variants.

The settings popover should close when the user clicks outside it or selects a setting that behaves like a choice. It should not introduce long explanatory text, and any slider rows should stay compact.

## Future iPhone App Integration

The causal-delay feedback app should be designed so it can later integrate with the [iOS app](../ios-app/ios-app.md) as a post-v1 visualization.

The iPhone/iPad version may start as an embedded web runtime if that preserves behavior fastest. A native SwiftUI/SceneKit/Canvas rewrite can follow only if the embedded route blocks quality, performance, or offline packaging.

Orientation behavior should be planned early:

- Landscape: use the full 16:9 canvas composition with the floating toolbar kept compact; runtime readouts should stay unobtrusive and should not recreate the removed proof-panel layout.
- Portrait: keep the same one-pair scene, but stack the compact toolbar, canvas, contribution stack, and readout vertically so the moving architrino paths remain visible.
- iPad: prefer a landscape-like canvas with optional inspector/readout space; do not add extra conceptual panels just because more screen space is available.
- The orientation change should preserve the current preset, `now` time, selected path, wake-arc display mode, and weak contribution cue setting.

## Direct Manipulation Model

Primary interactions:

- Drag the source marker to change the source initial position.
- Drag the Virtual Observer to change the contribution readout geometry.
- Drag the source velocity arrow to change source initial velocity.
- Drag a source-path ghost point only as a draft setup handle when the app is in a solver-prep mode; ordinary replay paths remain solver-owned.
- Right-click a path to insert a retained reception point at that replay time; the app also inserts the paired retained point on the opposite path, renumbers both paths, and rebuilds all valid cross-path wake links from point `n` to point `n+1`.
- Click a retained wake-hit path to select it and show its row in the compact readout.
- Use a small retained-hit stepper near the contribution stack for adding or removing retained wake-hit rows.

Secondary interactions:

- Hover a wake hit to show emission time, hit time, travel time, and contribution magnitude.
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
- Retained-hit plus/minus.

Canvas handles should replace these traditional controls:

| Traditional control | V1 replacement |
| --- | --- |
| Source speed | Drag the initial-velocity arrow, or use the compact architrino-speed fraction setting when an exact $v/c_f$ value is needed. |
| Contribution distance | Drag the Virtual Observer or source marker. |
| Retained wake-hit count | Use the retained-hit plus/minus chip beside the contribution stack. |
| History window length | Drag the history-window bracket on the trail. |
| Minimum contribution threshold | Drag a faint threshold line on the contribution stack. |

Later controls may include:

- Virtual Observer motion.
- Coupling sign and strength.
- Noise or perturbation seed for threshold demonstrations.
- Multi-source background mode.
- Export current settings as a preset.

## Diagnostics

The first version should show diagnostics as a compact readout tied to the current selection, not as a large always-open table.

Always-visible readouts:

- current `now`;
- solver status;
- active retained wake-hit count;
- total Virtual Observer readout;
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
- and total Virtual Observer readout from the active contribution sum.

The diagnostic table may exist behind a compact inspector, but v1 should not make it the main interaction surface. Selecting a row should highlight the matching source position, causal-wake path, arriving wake segment, and contribution-stack entry.

## Interaction Requirements

- Scrubbing time should move the visible `now` marker and recompute which history rows are active.
- Dragging the Virtual Observer should update receiver-to-observer contribution distances and contribution rows in real time, without rewriting the retained source/receiver wake hits.
- Changing retained wake-hit count should add or remove rows without losing the current source-motion settings.
- Toggling inactive paths should preserve rejected rows in the table when they are relevant to understanding the geometry.
- Selecting a contribution-stack entry should highlight the causal-wake path that produced it.
- Drag targets must have generous hit areas so the app works on trackpads and tablets.
- Dragging a marker must update the visual paths first, then the numeric readout; the app should feel spatial before it feels tabular.
- Pressing the spacebar should toggle play/pause unless focus is inside a native control such as the preset dropdown or a toolbar button.
- Releasing a dragged initial-condition handle should enqueue or rerun the solver and mark previous paths as preview or stale until the new solver result arrives.
- If the dragged state creates no active paths, the canvas should show an empty active set and name why rather than freezing the prior paths.
- The initial scene should teach without any required setup: one moving positrino/electrino pair, retained path-history points, and visible cross-path causal-wake arrivals.

## Data Model Requirements

Each retained depth row should be represented as structured state:

| Field | Meaning |
| --- | --- |
| `depth` | Feedback-depth index. |
| `sourceTime` | Source emission time for the retained contribution. |
| `emitterId` | Solver id of the source architrino that emitted the wake. |
| `emitterPolarity` | Positrino, electrino, neutral, or aggregate emitter classification. |
| `emitterColor` | Display color inherited by the causal-wake arc. |
| `hitTime` | Receiver hit time. |
| `travelTime` | Delay between source emission and retained receiver hit. |
| `sourcePosition` | Source position at emission. |
| `receiverPosition` | Solver receiver position at hit; separate from the Virtual Observer coordinate in cross-path feedback modes. |
| `pathDistance` | Spatial distance used by the causal-delay calculation. |
| `falloffLaw` | Contribution falloff law; v1 uses `$1/r$`. |
| `falloffFactor` | Computed distance factor from the $1/r$ falloff. |
| `contributionSign` | Signed direction or polarity of the contribution. |
| `contributionMagnitude` | Contribution strength after distance, coupling, and fade rules. |
| `assemblyThreshold` | Tunable threshold for marking a contribution as likely or unlikely to affect an assembly. |
| `thresholdState` | `above_threshold`, `near_threshold`, or `below_threshold`. |
| `visualWeight` | Derived stroke width, alpha, and desaturation level for drawing the wake. |
| `status` | `active`, `inactive`, `stale`, or `rejected`. |
| `reason` | Plain reason for inactive or rejected rows. |

Each solver run should also carry a compact setup record:

| Field | Meaning |
| --- | --- |
| `runId` | Stable id for the solver result currently displayed. |
| `presetId` | Named preset currently loaded, when any. |
| `datasetSource` | `solver`, `representative_mock_solver_replay`, or `draft_preview`. |
| `canvasColor` | Selected canvas color or purple-background atmosphere variant. |
| `wakeArcDisplayMode` | `partial_propagating_arcs` or `full_circular_arcs`. |
| `weakCueMode` | `off` or `threshold_only`. |
| `initialConditions` | Initial positions, velocities, polarity or role, and run duration. |
| `solverStatus` | `draft`, `running`, `ready`, `stale`, `failed`, or `unsupported`. |
| `frameStride` | Display stride for replayed frame samples. |
| `historyDepth` | Retained path-history depth requested from the solver. |
| `assemblyThreshold` | Current visual/diagnostic threshold for weak contribution treatment. |
| `haltReason` | Solver halt status or completion reason. |

## First Pass Implemented

- `route_runtime_scaffold` - Add `causal-delay-feedback.html`, `src/apps/causal-delay-feedback/`, and the standalone navigator route.
- `temporary_mock_solver_replay_adapter` - Create `representative_mock_solver_replay` data with frame samples, retained path-history points, cross-path wake links, official red/blue polarity colors, and the future central solver bridge target.
- `solver_adapter_boundary` - Isolate the temporary mock replay in a focused adapter module so the central solver bridge can replace the data source without rewriting the canvas renderer.
- `named_preset_dropdown` - Add named replay presets matching the accepted contact-sheet comparison family, plus a full circular wake mode.
- `preset_review_url` - Allow direct review links such as `causal-delay-feedback.html?preset=full_circular_arcs` and canvas-color variants through URL query settings.
- `toolbar_minimum` - Add compact play/pause, reset, preset, and settings controls.
- `spacebar_play_pause` - Toggle play/pause from the spacebar while preserving native control behavior when focus is on the preset dropdown or toolbar buttons.
- `central_solver_replay_contract_adapter` - Add a central-bridge replay request builder and response normalizer for causal-delay feedback datasets, with injected bridge-run support for tests and future worker wiring.
- `central_bridge_causal_delay_app_id` - Add `causal-delay-feedback` to the central solver bridge app-id contract and smoke it through built-in app playback.
- `central_bridge_app_playback_shape` - Package causal-delay replay data as bridge-valid app-playback motion frames, delayed-hit rows, and geometry metadata, then normalize bridge app-playback responses back into the runtime dataset shape.
- `central_bridge_runtime_loader` - Let the page select the central bridge replay adapter by query flag, load async replay datasets, ignore stale async responses, and keep the temporary mock replay as a fallback when the bridge is unavailable.
- `central_bridge_browser_wasm_loader` - Give the central replay path default browser-side WASM loader options for the built solver artifact, while preserving configured solver client, worker, factory, and run-callback overrides.
- `central_motion_solver_replay` - Add `?replay=central&solverReplay=motion`, advertise causal-delay `motionSimulation` bridge capability, smoke it through `check-solver-app-bridge`, and let the central adapter generate positrino/electrino frame samples from declared initial positions and velocities.
- `central_delayed_hit_solver_replay` - In central motion replay, build root requests from the solver-produced path samples and run central `delayedHits` once per visible wake link, preserving the numbered source/receiver path-point timing used by the canvas proof.
- `central_solver_default_replay` - Make the standalone page attempt central motion replay by default, keep the mock replay as the immediate fallback, and preserve `?replay=mock` for representative visual review.
- `contrast_stress_runtime_preset` - Add a selectable representative-only `contrast_stress` preset that uses the iOS Purple canvas and a mixed-state wake dataset with active, root-only/inactive, stale, and rejected rows for browser visual QA, without replacing that QA scene through the central bridge.
- `central_wake_solver_readout` - Carry central delayed-hit root/hit counts, solver hit time, residual, and status codes into selected wake-link readouts without adding a persistent diagnostics panel.
- `root_status_diagnostic_readout` - Surface solver root-status code, severity, and compact message details in selected rejected or root-only wake rows so invalid paths explain why they do not contribute.
- `contribution_threshold_wake_state` - Derive selected-wake contribution magnitude from `weight * 1/r`, classify it against the assembly threshold, and dim/desaturate solver links with no delayed hit.
- `invalid_wake_visual_tiers` - Keep inactive/root-only, stale, and rejected wake links visually distinct with separate alpha, radius, and desaturation tiers while preserving the emitter-color hue.
- `aggregate_contribution_summary` - Use the compact readout strip as the default no-selection view, summarizing received, in-flight, pending, inactive, and rejected wake links plus signed red/blue/net contribution totals for the current replay time.
- `replay_source_status_chip` - Show a compact toolbar chip for `representative replay`, `solver bridge loading`, `solver bridge replay`, `representative fallback`, and `draft preview` so the operator can tell which data source is currently driving the canvas.
- `wake_arrival_animation` - Animate source motion and outward-propagating dotted causal-wake arcs along retained path-history links, using the replay clock so each wake reaches its receiving point with the receiving architrino, without particle-like markers on wake paths.
- `wake_receiver_arrival_sync` - Refresh each visible wake link from its designated retained source/receiver points whenever a replay dataset or draft path edit changes, assert that the final wake front and receiving architrino reach the receiver point at the same replay time, snap a crossed visible-wake animation frame to the receiver point for one rendered pass so the final arc is visible, and keep any solver-reported hit-time offset as diagnostics rather than as the canvas arrival schedule.
- `post_reception_wake_suppression` - Stop drawing a wake arc series immediately after its retained receiver point has been reached; the same series becomes drawable again only when the replay clock wraps into the next loop and reaches the source-to-receiver interval again.
- `full_circular_arcs_preset` - Add faint equal-opacity full circular wake rings as a named preset.
- `settings_gear` - Add a compact settings popover with canvas-color swatches.
- `field_and_architrino_speed_settings` - Add compact settings controls for $c_f$ replay speed and architrino speed as $v/c_f$, with the architrino speed setting using the exact 10-stop sequence `0.1`, `0.3`, `0.5`, `0.7`, `0.9`, `0.99`, `0.999`, `0.9999`, `0.99999`, and `0.999999`.
- `retained_depth_setting` - Add compact retained-point controls in the settings popover, filter the active history points and wake rows without mutating the solver-shaped replay dataset, and preserve the selected depth across central replay reruns after initial-condition edits.
- `compact_selection_readout` - Let clicks on retained path-history points and wake links show a small canvas readout strip and subtle canvas highlight without adding a side panel.
- `wake_timing_readout` - Extend selected wake-link readouts with emission time, hit time, travel time, pending/active/received state, and the v1 `$1/r$` falloff factor.
- `retained_point_drag_preview` - Let retained path-history points be dragged in the temporary mock replay with smooth local path deformation, wake endpoint updates, live architrino markers that follow the edited path, and a `draft preview` source chip so edited canvas state is not confused with a solver result.
- `stale_solver_draft_state` - When a draft path or initial-condition edit changes geometry that has solver diagnostics attached, mark those wake rows `stale` so prior solver hits remain visible as context but no longer count as current solved contributions.
- `initial_condition_drag_preview` - Add draggable initial-condition handles that translate the selected setup and replay path during a draft preview, then submit edited initial positions through the central replay adapter on release when that adapter is active.
- `initial_velocity_arrow_drag_preview` - Make the attached velocity arrow endpoint a draggable handle; pulling it updates the selected architrino's initial `vx/vy`, bends the draft preview path forward from the initial time, and submits edited velocity through the central replay adapter on release.
- `virtual_observer_drag_preview` - Add a draggable Virtual Observer handle that updates the live contribution readout through the receiver-to-observer $1/r$ factor, carries the edited observer point in replay request options, and submits it through the central replay adapter on release without marking already solved cross-path wake roots stale.
- `direct_edit_rejection_diagnostics` - If a central replay rerun rejects an edited initial condition, velocity, or Virtual Observer state, keep the edited draft on the canvas, show `solver rejected edit` in the status chip, and surface the compact rejection reason in the current readout instead of replacing the edit with the representative fallback.
- `context_reception_point_insert` - Add a canvas context-menu path insertion gesture that creates a retained reception point, inserts the paired opposite-path point at the same replay time, renumbers retained points on both paths, refreshes retained-depth controls, and rebuilds cross-path wake links dynamically as `source n -> receiver n+1`.
- `causal_delay_runtime_test` - Add focused Node tests for selected history readout, selected wake timing/falloff readout, dense wake bands, retained-point dragging, initial-position dragging, initial-velocity dragging, spacebar play/pause, direct preset review URLs, async bridge replay loading, bridge fallback behavior, stale async replay protection, replay-source status labels, and central bridge replay normalization.

## Current Build Queue

1. `purple_background_contrast_pass` - The runtime now includes a `contrast_stress` preset for iOS Purple browser QA against active, root-only/inactive, stale, and rejected emitter-colored wakes. Remaining work is rendered browser/screenshot inspection for selected highlights, warning text, white labels, and compact controls. Status: `active`.
2. `central_solver_runtime_switch` - The standalone page now attempts central motion replay by default, can execute the central bridge through the browser-side WASM loader when the built solver artifact exists, and can fall back to the representative mock replay when the bridge is unavailable. Remaining work is fuller causal-root diagnostics beyond the selected-row compact readout. Status: `active`.
3. `drag_to_solver_loop` - Initial source-position, velocity-arrow, Virtual Observer, retained-point drag, and right-click retained-point insertion handles now update setup state, show only a temporary `draft preview` during dragging or insertion, rerun central replay on release when the central adapter is active, preserve the active retained-depth setting across reruns, and keep rejected edits visible with compact solver rejection diagnostics. Remaining work is replacement of the mock-seeded replay with solver-produced paths. Status: `active`.
4. `solver_diagnostics_readout` - The compact readout now includes central delayed-hit solver status, root/hit counts, solver hit time, residual, nonzero status codes, root-status code/severity/message details, selected-wake contribution magnitude, threshold state, and default aggregate signed contribution totals across the current replay time. Remaining work is fuller causal-root diagnostics beyond the selected-row compact readout. Status: `active`.

## Implementation Boundaries

- Do not model this as literal optical surface behavior.
- Do not hand-author meaningful architrino paths in the app runtime; use solver output for path history.
- Do not let contact-sheet mock paths become accepted runtime physics; they are representative proof data only.
- Do not claim Noether sea closure from the toy feedback-depth model.
- Do not clone the older PowerPoint slide aesthetic as the app's visual target; use it only as a source of causal-delay visualization ideas.
- Keep the page as a usable animation app first, not a prose explainer with a small graphic.
- Keep any end-user language plain: explain causal delay as influence arriving after travel time.
- Do not let the app grow into another control-dense inspector before the direct-manipulation loop is working.
- Do not use the word `electron` for the draggable primitives in the app UI when the object is meant to be an architrino, electrino, positrino, source marker, or Virtual Observer.

## Resolved Implementation Direction

- Use the temporary mock replay adapter for the first runnable canvas.
- Keep the central solver bridge as the authoritative integration target.
- Defer dragging initial conditions until after the canvas replay is stable and the solver bridge can accept setup state.
