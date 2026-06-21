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

- default the standalone page to the central solver bridge `pairInteraction` replay path;
- keep a temporary mock adapter labeled `representative_mock_solver_replay` as the immediate fallback and as an explicit `?replay=mock` review mode;
- keep every runtime dataset shaped like a solver result;
- expose the bridge target as `central_solver_bridge_path_history_stream`;
- use the central solver bridge for frame samples, path-history samples, delayed-hit rows, and compact diagnostics when a solver client, worker, or WASM module factory is available.

Current central-bridge inspection:

- [SolverAppBridge.mjs](../../../src/solver/app/SolverAppBridge.mjs) exposes `createSolverAppBridgeClient` and supports path-history, motion-simulation, pair-interaction, delayed-hit, causal-root, shared-geometry, validation-replay, and app-playback run kinds.
- [SolverAppAdapters.mjs](../../../src/solver/app/SolverAppAdapters.mjs) and [SolverAppBridge.mjs](../../../src/solver/app/SolverAppBridge.mjs) now recognize `causal-delay-feedback` as a central-bridge app id for motion-simulation, pair-interaction, path-history, causal-root, delayed-hit, app-playback, and validation-replay lanes.
- [CausalDelayFeedbackCentralBridgeAdapter.js](../../../src/apps/causal-delay-feedback/CausalDelayFeedbackCentralBridgeAdapter.js) now defines the causal-delay replay request contract, packages replay data as bridge-valid app-playback motion frames, delayed-hit rows, and geometry metadata, then normalizes app-shaped, bridge app-playback, central `pairInteraction`, or central `motionSimulation` responses into the canvas runtime dataset shape. In default pair mode it runs one central `pairInteraction` request for both architrinos, then one `delayedHits` request per visible wake link. It fails closed when frame samples, retained path-history samples, or delayed-hit rows are missing.
- The runtime uses the central bridge replay adapter by default, while `?replay=mock`, `?solver=mock`, or `?adapter=mock` forces the temporary representative replay adapter for visual review.
- The query-gated page path now provides default browser-side solver bridge options that dynamically load `.tmp/solver-build/wasm/architrino_solver_wasm_smoke.mjs` when the built solver artifact is available, while still allowing injected solver clients, workers, or factories through `ARCHITRINO_CAUSAL_DELAY_FEEDBACK_SOLVER_BRIDGE_OPTIONS`.
- The page attempts the central `pairInteraction` replay path by default: the bridge advances the positrino and electrino together from the declared initial positions and velocities, emits paired frame rows and path-history stream metadata, then runs central delayed-hit solves for the visible cross-path wake links.
- Unconstrained central pair replay is projected into the app's time-space canvas after the solver run: the horizontal coordinate is replay time from the 5% to 95% time-axis span, and the vertical coordinate fits the solver space coordinate into the visible space-axis band. Draft replays with retained path constraints are not reprojected, so dragged endpoint or retained-point positions remain exact.
- The current central pair-interaction lane can run through the optional native C/WASM C ABI when the loaded solver artifact exports it, and falls back to a JavaScript bridge integrator for stale artifacts or explicit no-WASM `pairInteraction` bridge runs through the shared client resolver. Retained path constraints now enter the pair-integration loop as finite-time target constraints, non-step-aligned retained times are emitted as real frame samples instead of being painted onto the path after integration, and each adjacent retained-knot interval contributes deterministic quarter, midpoint, and three-quarter frame samples when those samples are not already on the step grid. The bridge reports `pathConstraintFrameRefinementSampleCount` so review runs can distinguish ordinary step-grid samples from additional retained-knot subinterval samples. Non-start retained constraint hits seed their velocity from neighboring retained knots before the final boundary pass, and intermediate constrained samples target the retained-knot boundary path instead of aiming only at the next retained point. When finite boundary relaxation is requested, ordinary retained-knot guidance is bypassed during the initial pair integration; constrained frame samples are reseeded from the law-aware retained-knot boundary curve before residual measurement and relaxation. They then receive a finite-difference boundary relaxation pass that preserves retained knot positions exactly and rebuilds velocities/path rows from the relaxed frame path. The relaxation pass solves each contiguous non-retained frame block between retained knots as a tridiagonal line solve with the current pair-law acceleration frozen for a predictor candidate, recomputes the pair-law acceleration at the predicted frame state for a first corrector candidate, recomputes again at the full first-corrector predicted frame state for a second corrector candidate, recomputes once more at the full second-corrector predicted frame state for a third corrector candidate, blends current and predicted pair-law accelerations for additional Picard-style candidates, projects candidate same-time pair frames onto the mass-weighted center-of-mass line implied by retained knots while preserving candidate pair separation, builds residual-defect correction candidates at the current, predictor, first-corrector, second-corrector, and third-corrector predicted frame states by solving a tridiagonal correction equation against the measured finite-difference pair-law residual with retained endpoint deltas fixed at zero, adds a directional linearized defect-correction candidate that probes the current defect direction and applies a clamped minimum-residual scale, adds a local Newton defect-correction candidate that includes the same-point pair-law derivative in the residual step estimate, adds a coupled local Newton defect-correction candidate that solves the same-time positrino/electrino residual Jacobian together before line search, and adds block-coupled Newton defect-correction candidates that solve each retained-knot interval with temporal finite-difference neighbor terms and same-frame pair-law cross derivatives from the current, predictor, first-corrector, second-corrector, and third-corrector predicted frame states. It then line-searches all candidates with a guarded `1.25` over-relaxation trial followed by full step down through `1/256` and accepts the candidate that gives the lowest non-worsening relaxable-frame maximum, mean, and RMS residual. Across accepted sweeps, the native C/WASM lane and JavaScript fallback retain the lowest aggregate residual frame state and restore that best state before rebuilding velocities/path rows. The central bridge re-derives native C/WASM boundary-relaxation status from max/mean/RMS before/after residual evidence before publishing solver status, so a stale native `converged` code without residual samples cannot create a boundary-value claim. It accepts an optional residual convergence tolerance and an optional accepted-step tolerance, reports the requested iteration budget, applied iteration count, stop reason, selected candidate family, center-of-mass-projected selection count, non-empty candidate-variant count, line-search trial count, `converged` status when the relaxable-frame residual reaches the residual tolerance, and `step_converged` status when the accepted position update reaches the step tolerance first. Retained-position diagnostics report `pathConstraintPositionResidualSampleCount`, max/mean/RMS retained-position residuals, and optional `pathConstraintPositionResidualTolerance` acceptance status so review runs can prove that dragged start, interior, and final path-history knots remain exactly where the app submitted them. Residual diagnostics compare the constrained integrated path against the current pair-interaction law. Boundary-residual diagnostics compare retained-knot finite-difference acceleration against the pair law at the retained knots, and for staggered retained times they now place the other same-time architrino states on the same law-aware retained-knot boundary curve used by boundary seeding instead of a linear retained-position surrogate. Guidance diagnostics remain available only for relaxation-disabled diagnostic runs where `pathConstraintBoundaryRelaxationIterationCount=0`. Retained path-history drafts now request `64` relaxation sweeps and tolerance `10` first, then retry once at `256` sweeps and tolerance `1` when the first solver response does not meet the stronger default residual target; URL or injected request options override both the default and the retry. Constrained central replays surface as `solver guided replay` in the source chip when relaxation is disabled and guidance remains diagnostic, `solver boundary-seed replay` when finite-difference relaxation has boundary-seeded the retained path without a converged residual claim, or `solver boundary replay` when the finite-difference boundary relaxation converges under the requested residual tolerance; the source-chip help still states that this is finite-difference retained-knot boundary relaxation, not the full physical pair-interaction/path-constraint boundary-value solver. Constrained bridge summaries also carry `pathConstraintPhysicalBoundarySolverStatus=physical_boundary_solver_pending` and `pathConstraintPhysicalBoundarySolverClaim=retained_knot_guidance_not_physical_boundary_value_solve` so the finite-difference replay cannot be mistaken for the intended physical boundary-value solve. Remaining solver work is graduating retained-knot boundary seeding and the relaxation pass into the intended full physical pair-interaction boundary-value solver behind the same `pairInteraction` contract.
- The pending physical-boundary-solver status now includes `pathConstraintPhysicalBoundarySolverBlockingReason`, derived from the constrained replay evidence as `retained_knot_guidance_acceleration_required`, `finite_difference_boundary_relaxation_not_converged`, `initial_velocity_boundary_not_preserved`, `retained_knot_boundary_residual_not_preserved`, or `physical_boundary_solver_not_implemented`. When finite-difference boundary relaxation has converged, retained positions are preserved, the submitted initial velocity is preserved to the automatic exactness threshold or an explicitly requested tolerance, and any explicitly requested retained-knot boundary-residual tolerance is satisfied, the blocker is reported as `physical_boundary_solver_not_implemented`; the prior retained-knot guidance is then treated as seed history rather than the active remaining blocker.
- Native C/WASM and JavaScript-fallback pair runs now report initial-velocity boundary diagnostics: `pathConstraintInitialVelocityResidualSampleCount`, max/mean/RMS initial-velocity residuals, optional `pathConstraintInitialVelocityResidualTolerance`, `pathConstraintInitialVelocityResidualStatus`, and compact app readouts as `initVelRows`, `initVelErr`, `initVelTol`, and `initVelStatus`. This measures whether the first free frame still agrees with the submitted initial velocity after retained-knot seeding and relaxation, and it can fail closed when a review run asks for an explicit initial-velocity residual tolerance. Preserving submitted starting conditions is a prerequisite for promoting constrained replays toward the intended physical boundary-value solver.
- Review URLs and injected bridge options can pass `pairInteractionSignalSpeed` or `signalSpeed` into the central `pairInteraction` request. When this fixed signal speed is present and the native/WASM C ABI is available, the bridge now routes the central `pairInteraction` request through that native lane; explicit no-WASM review runs still use the JavaScript fallback. Fixed-signal-speed runs report retained-knot boundary residuals in `causal_delay_pair_law` mode by comparing each receiver knot against the delayed source point on the opposite retained boundary path, and drive finite-difference boundary-relaxation residuals with delayed source points sampled from the evolving frame history. Default pair runs still report `same_time_pair_law` residuals, and fixed-signal-speed runs now surface `pathConstraintBoundaryRelaxationResidualMode=causal_delay_pair_law` so review runs can prove which residual the line search minimized. Fixed-signal-speed native/WASM and JavaScript-fallback runs both include a `causal_delay_numerical_newton_defect_correction` candidate family that numerically differentiates the delayed-source residual with respect to each receiver-frame position before the existing line search. Native ABI `0.13.0` now carries an optional pair-interaction `signal_speed` field, reports `pairInteractionRequestF64Bytes=88`, and adds an explicit retained-knot boundary-residual mode to the pair-interaction summary so native fixed-signal-speed residual evidence can identify `causal_delay_pair_law`; stale native/WASM artifacts fail closed at ABI validation instead of silently using the old layout. Native C++ now measures fixed-signal-speed retained-knot boundary residuals and boundary-relaxation residuals from delayed source states sampled out of frame history, and direct bridge smoke proves the module-backed fixed-signal-speed pair route uses `executionPath=native_c_abi` with the causal-delay numerical Newton defect-correction family present in the relaxation candidate mask. The full coupled causal-delay Jacobian remains pending math work rather than a completed physical boundary-value solver.
- Center-of-mass projection candidates now sample the law-aware retained-knot boundary curve for each path at the candidate frame time, so staggered retained histories can produce projection targets across their overlapping time ranges without requiring exact same-time retained knots on both paths.
- The older `pair_segmented_attraction_seed` and one-shot `pair_initial_attraction_seed` motion policies remain available as explicit comparison modes and test fixtures through central `motionSimulation`.
- Explicit central review URLs still work. `?replay=central&solverReplay=pair-interaction` selects the default central pair replay, `?replay=central&solverReplay=motion` selects central motion-seed replay directly, and `?replay=central&solverReplay=app-playback` keeps the bridge app-playback review path available. Motion-policy review URLs can pass `motionPolicy=pair_segmented_attraction_seed` or `motionPolicy=pair_initial_attraction_seed`, plus optional `pairSegmentCount` and `pairAccelerationScale` values. The central pair replay now defaults to `pairInteractionLaw=inverse_distance_pair_attraction_v1` with `pairAccelerationScale=4000` in the app's display-unit geometry so the solver-owned path crosses and then visibly turns back under attraction; review URLs can pass `pairInteractionLaw=display_pair_attraction_v1` or another `pairAccelerationScale` to compare alternate paths. Review URLs can also pass `pathConstraintBoundaryResidualTolerance` or `boundaryResidualTolerance`; when set, a constrained pair replay fails closed if the retained-knot boundary residual exceeds that tolerance or cannot be measured. Review URLs can pass `pathConstraintPositionResidualTolerance` or `positionResidualTolerance`; when set, a constrained pair replay fails closed if the retained-position residual exceeds that tolerance or cannot be measured. Review URLs can pass `pathConstraintInitialVelocityResidualTolerance` or `initialVelocityResidualTolerance`; when set, a pair replay fails closed if the returned first-frame velocity no longer matches the submitted initial velocity within that tolerance. Review URLs can pass `pathConstraintGuidanceAccelerationTolerance` or `guidanceAccelerationTolerance`; when set, a constrained pair replay fails closed if the maximum retained-knot guidance acceleration exceeds that tolerance or cannot be measured. Guidance acceleration tolerance is a diagnostic-guidance gate: use `pathConstraintBoundaryRelaxationIterationCount=0` when the review is intended to exercise retained-knot guidance, because relaxation-requested runs bypass guidance and report `no_guidance_samples` for that audit. Review URLs can pass `pathConstraintBoundaryRelaxationIterationCount` or `boundaryRelaxationIterations` to tune the finite-difference boundary relaxation sweep count, `pathConstraintBoundaryRelaxationTolerance` or `boundaryRelaxationTolerance` to request early convergence when the relaxable-frame residual reaches that threshold, and `pathConstraintBoundaryRelaxationStepTolerance` or `boundaryRelaxationStepTolerance` to request early settling when the accepted position update reaches that threshold; the default iteration budget remains `8`, and the bridge validates the values as nonnegative within the supported relaxation budget.
- Without a solver execution source, the page keeps the representative mock replay and shows `representative fallback`.
- `node scripts/check-solver-app-bridge.mjs` passes for the current bridge, including causal-delay app-playback, native-C-ABI pair-interaction, resolver-created no-WASM JavaScript-fallback pair-interaction, module-backed fixed-signal-speed native-C-ABI causal-delay boundary and boundary-relaxation residuals, fixed-signal-speed JavaScript-fallback causal-delay boundary and boundary-relaxation residuals, fixed-signal-speed causal-delay numerical Newton candidate-family mask evidence in both execution paths, native and no-WASM JavaScript-fallback retained-knot subinterval frame-refinement runs, finite boundary-relaxation residual and accepted-step tolerance runs, staggered retained-knot boundary-residual parity for the law-aware boundary-state sampler, staggered overlap center-of-mass projection parity for retained histories with no shared exact interior times, boundary-seeded diagnostic status for unconverged relaxation, fail-closed boundary-residual, retained-position residual, initial-velocity residual, and diagnostic guidance-acceleration tolerance gates, full finite-difference relaxation candidate-family mask coverage for constrained native and JavaScript-fallback pair runs, physical-boundary-solver pending metadata on constrained pair replays, motion-simulation, and delayed-hit smoke runs. `tests/solver-app-bridge-native-pair-status.test.js` also proves the central bridge downgrades a stale native `converged` boundary-relaxation code to `no_relaxable_samples` when residual samples are absent, keeping the replay in the diagnostic claim class while still reporting the physical boundary solver as pending. The remaining causal-delay solver work is the intended full physical pair-interaction and path-constraint model rather than repairing the generic bridge.
- `node scripts/check-solver-contract-fixtures.mjs` passes for the pair-interaction contract surface, including optional fixed `signalSpeed`, retained-knot frame-refinement count, finite-difference candidate-family telemetry, retained-knot boundary-residual mode and acceptance status, retained-position residual acceptance status, initial-velocity residual tolerance/status fields, guidance-acceleration acceptance tolerance/status fields, physical-boundary-solver pending status fields, and `pairInteractionRequestF64Bytes` ABI metadata in both the JSON schema and TypeScript declaration surface.
- `.tmp/solver-build/native/architrino_solver_motion_smoke` now verifies the native C ABI carries optional pair-interaction `signal_speed`, retained-knot frame-refinement count, boundary-relaxation candidate-variant count, line-search trial count, and candidate-family mask in parity with the C++ pair-interaction result.

The direct-manipulation canvas sets initial conditions:

- architrino initial position through path-history point `1`;
- path beginning and ending positions as first-class numbered path-history markers, with the beginning always numbered `1` and the ending numbered as the final retained point after any insertion or renumbering;
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
4. User changes the named preset, play state, canvas color, compact speed settings, or `now` time without opening a dense control panel.
5. The compact `now` scrubber pauses replay, moves live architrino markers and wake fronts to the selected replay time, and refreshes any selected path-history or wake readout.
6. After the central solver bridge is available, dragging any path-history point, including start point `1` and the final endpoint, the velocity arrow, or the Virtual Observer should submit the setup to the solver or app-worker adapter.
7. Solver computes the architrino path history, causal roots, delayed hits, and diagnostics.
8. App replaces the draft or mock replay with the solver dataset.

During dragging, the canvas may show a lightweight preview path so the interface feels responsive. After release, the authoritative displayed path should be replaced by the solver result when the edited state is expressible as solver input. Retained path-history edits, including start and final endpoint drags, now submit path constraints through the central pair replay contract and request the residual-monotone finite boundary relaxation defaults. The remaining solver work is replacing the current retained-knot boundary guidance and discrete relaxation with the intended full physical path-constraint boundary-value solver.

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

Browser QA proof artifacts:

- Rebuild command: `node scripts/capture-causal-delay-feedback-browser-qa.mjs`.
- The capture script starts or reuses the local dev server, opens a Chromium-family browser through the Chrome DevTools Protocol, pins the replay time and selected wake row, verifies central proofs use `central_solver_bridge_replay`, `central_solver_bridge_replay_adapter`, and `pairInteraction`, verifies the retained-edit, point-`1` initial-position, final-endpoint, context-menu reception-insertion, and explicit boundary-relaxation proofs return `solver boundary replay` with `discrete_boundary_value_converged` and `finite_difference_pair_boundary_value_solve_converged`, verifies the boundary-seeded proof returns `solver boundary-seed replay` with `boundary_seeded_constraint_path` and `finite_difference_boundary_relaxation_not_converged`, verifies the fixed-signal proof runs through `executionPath=native_c_abi` with `signalSpeed=8000` and causal-delay residual modes, verifies boundary proofs meet their retained-position, initial-velocity, retained-knot boundary-residual, and residual-evidence gates, verifies the initial-velocity proof returns `solver pair replay`, and writes central desktop/portrait, central retained-edit desktop, central boundary-retained-edit desktop, central boundary-seeded retained-edit desktop, central fixed-signal retained-edit desktop, central initial-position desktop, central final-endpoint desktop, central reception-insertion desktop, central initial-velocity desktop, plus representative mock desktop/portrait PNG proofs.
- [central-pair-purple-1920x1080.png](browser-qa/central-pair-purple-1920x1080.png) - 1920x1080 runtime capture of the default central `pairInteraction` replay through `central_solver_bridge_replay_adapter` with the iOS Purple canvas, selected solver-hit diagnostics, and the settings panel closed.
- [central-pair-purple-390x844.png](browser-qa/central-pair-purple-390x844.png) - 390x844 portrait runtime capture of the default central `pairInteraction` replay through `central_solver_bridge_replay_adapter` at 2x device scale, proving the central solver replay path renders in the phone-shaped layout instead of only the representative mock portrait proof.
- [central-retained-edit-purple-1920x1080.png](browser-qa/central-retained-edit-purple-1920x1080.png) - 1920x1080 runtime capture after a scripted retained-point drag and central replay rerun, proving the direct-manipulation path returns a converged discrete boundary replay by default with `maxPathConstraintBoundaryRelaxationResidualAfter <= 1`, `pathConstraintBoundaryRelaxationResidualEvidenceStatus=aggregate_non_worsening`, retained-position evidence, initial-velocity evidence, and explicit retained-knot boundary-residual acceptance instead of staying in mock, draft, or merely guided state.
- [central-boundary-retained-edit-purple-1920x1080.png](browser-qa/central-boundary-retained-edit-purple-1920x1080.png) - 1920x1080 runtime capture after the same retained-point drag with explicit finite relaxation settings, proving the central replay can surface `solver boundary replay` with `discrete_boundary_value_converged` and `finite_difference_pair_boundary_value_solve_converged` when the finite-difference boundary relaxation meets the requested tolerance and the source-chip evidence includes accepted retained-position, initial-velocity, and retained-knot boundary-residual diagnostics. The proof currently requires `pathConstraintBoundaryRelaxationTolerance=10`, `pathConstraintBoundaryRelaxationIterationCount=64`, `maxPathConstraintBoundaryRelaxationResidualAfter <= 10`, `pathConstraintBoundaryRelaxationResidualRatio <= 0.02`, and `pathConstraintBoundaryRelaxationResidualEvidenceStatus=aggregate_non_worsening`.
- [central-boundary-seeded-retained-edit-purple-1920x1080.png](browser-qa/central-boundary-seeded-retained-edit-purple-1920x1080.png) - 1920x1080 runtime capture after the same retained-point drag with deliberately strict finite relaxation settings, proving the central replay can surface `solver boundary-seed replay` with `boundary_seeded_constraint_path`, diagnostic constraint claim scope, and `pathConstraintPhysicalBoundarySolverBlockingReason=finite_difference_boundary_relaxation_not_converged` when the finite-difference boundary relaxation seeds the retained path but does not justify a boundary-value convergence claim. The proof currently requires `pathConstraintBoundaryRelaxationTolerance=0.000001`, `pathConstraintBoundaryRelaxationIterationCount=1`, `pathConstraintBoundaryRelaxationResidualEvidenceStatus=aggregate_non_worsening`, and retained-position residual evidence.
- [central-signal-speed-retained-edit-purple-1920x1080.png](browser-qa/central-signal-speed-retained-edit-purple-1920x1080.png) - 1920x1080 runtime capture after the same retained-point drag with `pairInteractionSignalSpeed=8000`, proving the browser page routes fixed-signal-speed central `pairInteraction` through the native/WASM C ABI when available and returns `signalSpeed=8000`, `pathConstraintBoundaryRelaxationResidualMode=causal_delay_pair_law`, and `pathConstraintBoundaryResidualMode=causal_delay_pair_law`.
- [central-initial-position-edit-purple-1920x1080.png](browser-qa/central-initial-position-edit-purple-1920x1080.png) - 1920x1080 runtime capture after a scripted path-history point `1` drag and central replay rerun, proving the source-position handle is the first numbered path-history marker and returns a converged discrete boundary replay with the edited initial condition preserved, `maxPathConstraintBoundaryRelaxationResidualAfter <= 1`, `pathConstraintBoundaryRelaxationResidualEvidenceStatus=aggregate_non_worsening`, initial-velocity evidence, and explicit retained-knot boundary-residual acceptance.
- [central-final-position-edit-purple-1920x1080.png](browser-qa/central-final-position-edit-purple-1920x1080.png) - 1920x1080 runtime capture after a scripted final path-history marker drag and central replay rerun, proving the ending marker is the final numbered path-history point and returns a converged discrete boundary replay with the edited endpoint preserved, `maxPathConstraintBoundaryRelaxationResidualAfter <= 1`, `pathConstraintBoundaryRelaxationResidualEvidenceStatus=aggregate_non_worsening`, initial-velocity evidence, and explicit retained-knot boundary-residual acceptance.
- [central-reception-insert-purple-1920x1080.png](browser-qa/central-reception-insert-purple-1920x1080.png) - 1920x1080 runtime capture after a scripted canvas context-menu insertion, proving retained points renumber to seven per path, wake links rebuild as `source n -> receiver n+1`, and the central replay returns a converged discrete boundary dataset with `maxPathConstraintBoundaryRelaxationResidualAfter <= 1`, `pathConstraintBoundaryRelaxationResidualEvidenceStatus=aggregate_non_worsening`, initial-velocity evidence, and explicit retained-knot boundary-residual acceptance.
- [central-initial-velocity-edit-purple-1920x1080.png](browser-qa/central-initial-velocity-edit-purple-1920x1080.png) - 1920x1080 runtime capture after a scripted initial-velocity handle drag and central replay rerun, proving source velocity edits return a central pair replay instead of staying in mock or draft state.
- [contrast-stress-purple-1920x1080.png](browser-qa/contrast-stress-purple-1920x1080.png) - 1920x1080 runtime capture of `?preset=contrast_stress&replay=mock` with the iOS Purple canvas, selected rejected-wake diagnostics, and the settings panel open.
- [contrast-stress-purple-390x844.png](browser-qa/contrast-stress-purple-390x844.png) - 390x844 portrait runtime capture of `?preset=contrast_stress&replay=mock` at 2x device scale with the iOS Purple canvas, compact toolbar, settings panel, readable path labels, active wake readout, and right-edge Virtual Observer label kept inside the canvas.

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
- The beginning and ending of each path are path-history markers, not separate endpoint controls. They should be draggable and should stay visible even when the retained wake-depth view hides interior points.
- For the accepted six-point proof tiles, label each retained history point on each path as `1` through `6`, ordered older to newer. In the runtime, point `1` remains the start marker and the path end is the current final numbered marker after any insertion and renumbering.
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
- Treat the beginning and ending of each path as first-class path-history points: the starting marker is point `1`, both endpoints are visible markers, and both endpoints can be dragged like the interior retained points. Endpoint handles remain visible even when a lower retained-depth setting hides deeper interior wake rows.
- Keep the moving positrino and electrino as solver-owned architrino paths.
- Let the main path geometry occupy the first viewport immediately; avoid a landing-page feel.

### Objects

- Draw path-history point `1` as the draggable initial-position marker for each architrino path.
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
- Use one fixed, tight causal-wake front cadence across all presets; do not expose a control or preset field that changes spacing between successive wake fronts.
- In full-circular-arc mode, use the same emission-to-reception timing, fixed cadence, fading, and post-reception suppression as the partial arc series, but draw each visible front as a complete 360-degree circle.
- Keep every wake arc color-locked to its emitter for the full trip, including faded older depths.
- Fade and thin older paths by computed contribution strength using the $1/r$ falloff while keeping their depth index and emission time readable.
- Let weak paths approach a thin or desaturated endpoint state below the assembly-relevance threshold, provided the wake's emitter identity remains clear from the active segment, depth row, or endpoint label.
- When a wake segment reaches its receiver, add its signed contribution to the contribution stack.
- When geometry changes, animate paths entering or leaving the active set instead of snapping them silently on and off.
- Provide pause/play, reset, slow/fast, and frame-step controls. The current low-clutter frame-step control is the keyboard: left/right arrows pause replay and step through solver frame samples.
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
The current standalone page keeps the persistent toolbar as replay-first controls and places `Reset preset` inside the settings popover, where it reloads the current preset through the same adapter path as the preset dropdown.

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
| `full_circular_arcs` | Full emitted circular wake geometry using the same progressing wake-front series as the partial arc mode, with each front drawn as a complete circle. |
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
- Reset preset: compact action that clears direct-manipulation draft state and reloads the current named preset through the active replay adapter.
- Reduced motion: compact toggle that keeps replay paused while preserving scrubber and frame-step navigation.
- High contrast paths: compact toggle that strengthens solid path-history trails and architrino markers without changing causal-wake timing or solver input.
- Weak contribution cue: compact `off` / `threshold_only` setting. The `threshold_only` mode fades, thins, and lightly desaturates active wakes below the assembly-relevance threshold; `off` leaves active wake rendering driven by emitter color and normal wake falloff.
- Background depth field: compact toggle for optional, very faint curved purple depth traces behind the time-space diagram. It defaults off so the accepted solid-purple canvas remains unchanged unless selected.

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

- Drag path-history point `1` to change the source initial position.
- Drag the Virtual Observer to change the contribution readout geometry.
- Drag the source velocity arrow to change source initial velocity.
- Drag interior or final path-history points as retained path-constraint handles; after release, central pair replay receives those constraints and returns a solver-shaped constrained replay. Ordinary replay paths remain solver-owned.
- Right-click a path to insert a retained reception point at that replay time; the app also inserts the paired retained point on the opposite path, renumbers both paths, and rebuilds all valid cross-path wake links from point `n` to point `n+1`.
- Click a retained wake-hit path to select it and show its row in the compact readout.
- Use the compact retained-points selector in the settings popover to reduce or restore active path-history points and feedback rows. Do not add a persistent plus/minus chip or contribution-stack panel in v1.

Secondary interactions:

- Hover a wake hit to show emission time, hit time, travel time, and contribution magnitude.
- Hover an inactive path to show the rejection reason.
- Click the contribution stack to highlight the path that produced that contribution.
- Use the mouse wheel or pinch to zoom only when the pointer is over the canvas background, not while dragging an object.

The runtime now implements background-only wheel and pinch zoom as viewport operations: wheel zoom anchors under the cursor, pinch zoom anchors under the initial two-finger midpoint, minimum zoom clamps back to the fitted 16:9 view, and zoom refuses to activate while dragging or when the pointer is over a selectable path-history point, velocity handle, Virtual Observer, or wake link. This keeps zoom separate from solver input, replay timing, and direct-manipulation handles.

## Controls

V1 should avoid a large controls panel. The visible controls should be limited to:

- Preset dropdown.
- Play/pause.
- Reset replay.
- Now scrubber.
- Solver/source status chip.
- Settings gear.

The settings popover should carry secondary choices without becoming a side panel:

- Canvas color.
- $c_f$ speed.
- Architrino speed as the exact 10-stop $v/c_f$ selector.
- Retained points.
- Reduced motion.
- High contrast paths.
- Weak contribution cue.
- Background depth field.
- Reset preset.

Do not add `Paths on/off`, `Readout on/off`, a hide-path-history button, or a persistent retained-hit plus/minus control in v1. Path history stays visible; readouts appear only as compact selection or hover feedback.

Canvas handles should replace these traditional controls:

| Traditional control | V1 replacement |
| --- | --- |
| Source speed | Drag the initial-velocity arrow, or use the compact architrino-speed fraction setting when an exact $v/c_f$ value is needed. |
| Contribution distance | Drag the Virtual Observer or source/path-history marker. |
| Retained wake-hit count | Use the retained-points selector in the settings popover. |
| History window length | Use the retained-points selector until a solver-backed history-window drag exists. |
| Minimum contribution threshold | Use the weak contribution cue setting; threshold dragging can wait until there is a compact stack design that does not recreate the removed side panel. |

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

Do not add a root-ledger inspector, large diagnostic table, or persistent diagnostics panel in v1. Selected wake rows already expose compact root-ledger details, solver status, timing, contribution, and threshold state in the readout strip; deeper root-ledger inspection can wait until it has a compact canvas-first interaction that does not recreate the removed side-panel layout.

## Interaction Requirements

- Scrubbing time should move the visible `now` marker and recompute which history rows are active.
- Dragging the Virtual Observer should update receiver-to-observer contribution distances and contribution rows in real time, without rewriting the retained source/receiver wake hits.
- Changing retained wake-hit count should add or remove rows without losing the current source-motion settings.
- Toggling inactive paths should preserve rejected rows in the table when they are relevant to understanding the geometry.
- Selecting a contribution-stack entry should highlight the causal-wake path that produced it.
- Drag targets must have generous hit areas so the app works on trackpads and tablets.
- Dragging a marker must update the visual paths first, then the numeric readout; the app should feel spatial before it feels tabular.
- Pressing the spacebar should toggle play/pause unless focus is inside a native control such as the preset dropdown or a toolbar button.
- Pressing the left/right arrow keys should pause replay and step backward or forward through solver frame samples unless focus is inside a native control.
- Releasing a dragged path-history point `1`, velocity arrow, or Virtual Observer should enqueue or rerun the solver and mark previous paths as preview or stale until the new solver result arrives.
- If the dragged state creates no active paths, the canvas should show an empty active set and name why rather than freezing the prior paths.
- The initial scene should teach without any required setup: one moving positrino/electrino pair, retained path-history points, and visible cross-path causal-wake arrivals.

## Data Model Requirements

Each retained depth row should be represented as structured state:

| Field | Meaning |
| --- | --- |
| `depth` | Path-history index; point `1` is the path start and the final point is the path end. |
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
| `pathConstraintFrameRefinementSampleCount` | Number of additional unique frame sample times introduced by retained-knot quarter, midpoint, and three-quarter subinterval refinement after de-duplicating against the ordinary step grid. |
| `pathConstraintInitialVelocityResidualSampleCount` | Number of initial path tangents compared against the submitted initial velocities. |
| `pathConstraintInitialVelocityResidualTolerance` | Optional maximum initial-velocity residual tolerance requested by review URL or injected request options. |
| `pathConstraintInitialVelocityResidualStatus` | `unchecked`, `no_initial_velocity_samples`, `unresolved`, `within_tolerance`, or `exceeded_tolerance`; non-`unchecked` values are surfaced in compact solver diagnostics. |
| `maxPathConstraintInitialVelocityResidual` | Maximum residual between the first emitted path step velocity and the submitted initial velocity. |
| `meanPathConstraintInitialVelocityResidual` | Mean residual between first-step velocities and submitted initial velocities. |
| `rmsPathConstraintInitialVelocityResidual` | RMS residual between first-step velocities and submitted initial velocities. |
| `pathConstraintGuidanceMode` | Optional constrained replay guidance mode, such as `retained_knot_boundary`; present for relaxation-disabled diagnostic guidance runs, not ordinary relaxation-requested boundary-seeded runs. |
| `pathConstraintGuidanceAccelerationTolerance` | Optional maximum retained-knot guidance acceleration tolerance requested by review URL or injected request options; use with `pathConstraintBoundaryRelaxationIterationCount=0` when the review must exercise guidance samples. |
| `pathConstraintGuidanceAccelerationStatus` | `unchecked`, `no_guidance_samples`, `unresolved`, `within_tolerance`, or `exceeded_tolerance`; non-`unchecked` values are surfaced in compact solver diagnostics. |
| `pathConstraintBoundaryMode` | Optional constrained replay boundary path mode, such as `law_aware_retained_knot_boundary`. |
| `pathConstraintBoundarySeedMode` | Optional constrained-frame seeding mode used before finite relaxation, such as `law_aware_retained_knot_boundary_seed`. |
| `pathConstraintBoundarySeedSampleCount` | Number of constrained frame samples reseeded from the retained-knot boundary curve before measuring and relaxing the finite-difference residual. |
| `pathConstraintBoundaryRelaxationMode` | Optional constrained-frame relaxation pass, such as `finite_difference_frame_relaxation_v1`. |
| `pathConstraintBoundaryRelaxationIterationCount` | Requested finite-difference relaxation iteration budget for non-retained constrained frames. |
| `pathConstraintBoundaryRelaxationAppliedIterationCount` | Actual number of finite-difference relaxation sweeps applied before exhaustion, no-update exit, or convergence. |
| `pathConstraintBoundaryRelaxationStopReason` | Exit reason for the relaxation loop, such as `not_requested`, `no_relaxable_samples`, `no_update_candidates`, `line_search_stalled`, `tolerance_reached`, or `iteration_budget_exhausted`. |
| `pathConstraintBoundaryRelaxationTolerance` | Optional relaxable-frame residual threshold for early convergence. |
| `pathConstraintBoundaryRelaxationStatus` | `accepted`, `converged`, `step_converged`, `reverted_no_improvement`, `no_relaxable_samples`, or `not_requested`, indicating whether the relaxed frame path was retained, whether it met an explicit convergence tolerance, whether it settled by accepted-step tolerance, or whether the requested relaxation budget was zero. `accepted`, `converged`, and `step_converged` require non-worsening max, mean, and RMS residual evidence. |
| `pathConstraintBoundaryRelaxationAdaptiveRetry` | Boolean marker that the runtime retried a retained-path draft with the stronger default boundary relaxation request. |
| `pathConstraintBoundaryRelaxationAdaptiveRetryRejected` | Boolean marker that the runtime tried the stronger default retry but kept the first retained-path draft result because the retry did not improve solver status or relaxation residual evidence. |
| `pathConstraintBoundaryRelaxationRetryCount` | Number of stronger default retry requests applied after the first retained-path draft response. |
| `pathConstraintBoundaryRelaxationInitialIterationCount` | First-pass default relaxation iteration budget before the adaptive retry. |
| `pathConstraintBoundaryRelaxationInitialTolerance` | First-pass default relaxation tolerance before the adaptive retry. |
| `maxPathConstraintBoundaryRelaxationResidualAfterInitialAttempt` | First-pass maximum relaxable-frame residual before the stronger retry replaces the dataset. |
| `pathConstraintBoundaryRelaxationRetryIterationCount` | Stronger retry relaxation iteration budget used for the returned dataset. |
| `pathConstraintBoundaryRelaxationRetryTolerance` | Stronger retry relaxation tolerance used for the returned dataset. |
| `pathConstraintBoundaryRelaxationRejectedRetryIterationCount` | Stronger retry relaxation iteration budget from a retry response that was rejected in favor of the first dataset. |
| `pathConstraintBoundaryRelaxationRejectedRetryTolerance` | Stronger retry relaxation tolerance from a retry response that was rejected in favor of the first dataset. |
| `maxPathConstraintBoundaryRelaxationResidualAfterRejectedRetry` | Stronger retry maximum relaxable-frame residual when that retry was rejected in favor of the first dataset. |
| `pathConstraintBoundaryRelaxationResidualSampleCount` | Number of non-retained frame samples measured for relaxation residual improvement. |
| `maxPathConstraintBoundaryRelaxationResidualBefore` | Maximum finite-difference pair-law residual across relaxable frame samples before the relaxation pass. |
| `maxPathConstraintBoundaryRelaxationResidualAfter` | Maximum finite-difference pair-law residual across relaxable frame samples after the relaxation pass. |
| `meanPathConstraintBoundaryRelaxationResidualBefore` | Mean finite-difference pair-law residual across relaxable frame samples before the relaxation pass. |
| `meanPathConstraintBoundaryRelaxationResidualAfter` | Mean finite-difference pair-law residual across relaxable frame samples after the relaxation pass. |
| `rmsPathConstraintBoundaryRelaxationResidualBefore` | RMS finite-difference pair-law residual across relaxable frame samples before the relaxation pass. |
| `rmsPathConstraintBoundaryRelaxationResidualAfter` | RMS finite-difference pair-law residual across relaxable frame samples after the relaxation pass. |
| `pathConstraintBoundaryRelaxationResidualRatio` | Ratio `after / before` for the maximum relaxable-frame residual; values below `1` mean the relaxation pass reduced the measured frame residual. |
| `meanPathConstraintBoundaryRelaxationResidualRatio` | Ratio `after / before` for the mean relaxable-frame residual. |
| `rmsPathConstraintBoundaryRelaxationResidualRatio` | Ratio `after / before` for the RMS relaxable-frame residual. |
| `pathConstraintBoundaryRelaxationResidualSettlingRate` | Per-applied-iteration reduction factor for the maximum relaxable-frame residual, derived from the total residual ratio and applied relaxation count. |
| `meanPathConstraintBoundaryRelaxationResidualSettlingRate` | Per-applied-iteration reduction factor for the mean relaxable-frame residual. |
| `rmsPathConstraintBoundaryRelaxationResidualSettlingRate` | Per-applied-iteration reduction factor for the RMS relaxable-frame residual. |
| `pathConstraintBoundaryRelaxationMaxStep` | Maximum accepted position update during the finite-difference relaxation pass. |
| `pathConstraintBoundaryRelaxationStepTolerance` | Optional accepted-step tolerance requested for early relaxation settling; `step_converged` means the update threshold was met without upgrading the constrained-path claim to residual-converged. |
| `pathConstraintBoundaryRelaxationFinalStepFactor` | Final accepted line-search factor from the relaxation pass. |
| `pathConstraintBoundaryRelaxationResidualEvidenceStatus` | Aggregate evidence status for the finite-difference relaxation residuals: `aggregate_non_worsening`, `aggregate_worsened`, `incomplete_evidence`, or `no_samples`. |
| `pathConstraintBoundaryRelaxationSelectedCandidateKind` | Selected finite-difference relaxation candidate family, such as predictor, corrector, predicted-state residual-defect, linearized-defect, local-Newton, coupled-local-Newton, block-coupled-Newton, blended, or center-of-mass-projected variants. |
| `pathConstraintBoundaryRelaxationCenterOfMassSelectedCount` | Number of finite-difference relaxation sweeps where a center-of-mass-projected candidate was selected. |
| `pathConstraintBoundaryRelaxationCandidateVariantCount` | Number of non-empty finite-difference relaxation candidate variants submitted to line search across the applied or attempted relaxation sweeps. |
| `pathConstraintBoundaryRelaxationLineSearchTrialCount` | Number of candidate line-search factor applications tested against the aggregate residual guard. |
| `pathConstraintBoundaryRelaxationCandidateKindMask` | Bitmask of finite-difference relaxation candidate families submitted to line search; projected center-of-mass variants are normalized back to their base family. |
| `pathConstraintSolverStatus` | Machine-readable constrained-path status: `constraint_snap_only`, `guided_constraint_path`, `boundary_seeded_constraint_path`, `discrete_boundary_value_converged`, or `unconstrained`. |
| `pathConstraintSolverClaim` | Claim scope for the constrained path. Guided and boundary-seeded runs use `diagnostic_constraint_replay_not_boundary_value_solve`; tolerance-converged discrete finite-difference solves use `finite_difference_pair_boundary_value_solve_converged`. The app adapter only derives the finite-difference convergence claim from missing solver status fields when residual samples exist, the requested relaxation tolerance is satisfied, retained positions are preserved, initial velocity is preserved to the automatic exactness threshold or an explicitly requested tolerance, any explicitly requested retained-knot boundary-residual tolerance is satisfied, and max/mean/RMS residuals are all non-worsening. If those convergence conditions are not met but boundary seed samples exist, the app adapter may derive `boundary_seeded_constraint_path` instead. |
| `pathConstraintPhysicalBoundarySolverStatus` | Machine-readable status for the intended physical pair-interaction/path-constraint boundary-value solver. Current constrained replays report `physical_boundary_solver_pending`. |
| `pathConstraintPhysicalBoundarySolverClaim` | Claim scope for the physical boundary solver. Current constrained replays report `retained_knot_guidance_not_physical_boundary_value_solve` so finite-difference boundary replay remains distinct from the intended physical solve. |
| `pathConstraintPhysicalBoundarySolverBlockingReason` | Evidence-backed reason the physical boundary solver is still pending, such as `retained_knot_guidance_acceleration_required`, `finite_difference_boundary_relaxation_not_converged`, `initial_velocity_boundary_not_preserved`, `retained_knot_boundary_residual_not_preserved`, or `physical_boundary_solver_not_implemented`. |
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
- `keyboard_frame_step` - Use left/right arrow keys as low-clutter frame-step controls: pause replay, step backward or forward through solver frame samples, refresh the selected readout, and preserve native control behavior when focus is inside inputs, selects, textareas, or buttons.
- `central_solver_replay_contract_adapter` - Add a central-bridge replay request builder and response normalizer for causal-delay feedback datasets, with injected bridge-run support for tests and future worker wiring.
- `central_bridge_causal_delay_app_id` - Add `causal-delay-feedback` to the central solver bridge app-id contract and smoke it through built-in app playback.
- `central_bridge_app_playback_shape` - Package causal-delay replay data as bridge-valid app-playback motion frames, delayed-hit rows, and geometry metadata, then normalize bridge app-playback responses back into the runtime dataset shape.
- `central_bridge_runtime_loader` - Let the page select the central bridge replay adapter by query flag, load async replay datasets, ignore stale async responses, and keep the temporary mock replay as a fallback when the bridge is unavailable.
- `central_bridge_browser_wasm_loader` - Give the central replay path default browser-side WASM loader options for the built solver artifact, while preserving configured solver client, worker, factory, and run-callback overrides.
- `central_pair_interaction_replay` - Add a central `pairInteraction` run kind for causal-delay feedback, advance the positrino/electrino pair together in one bridge request, emit paired frame rows and path-history dynamic replay metadata, smoke it through `check-solver-app-bridge`, and make it the default standalone replay mode.
- `central_pair_time_space_display_projection` - For unconstrained central pair replay, project solver output into the time-space canvas after integration so time spans the 5% to 95% horizontal axis and the solver space coordinate stays visible in the vertical band. Skip this display projection for retained path-constraint draft replays so dragged points remain exact.
- `path_constraint_residual_diagnostics` - Report retained path-constraint count, residual sample count, max residual, mean residual, and RMS residual from native or JavaScript pair replay so constrained preview paths expose how far the deterministic projection sits from the current pair-interaction law.
- `central_motion_solver_replay` - Add `?replay=central&solverReplay=motion`, advertise causal-delay `motionSimulation` bridge capability, smoke it through `check-solver-app-bridge`, and let the central adapter generate positrino/electrino frame samples from declared initial positions, velocities, and accelerations.
- `central_pair_initial_acceleration_seed` - Make central motion replay derive its default acceleration from the starting positrino/electrino pair geometry instead of reusing the representative mock path's fitted `ax/ay`; preserve an explicit acceleration policy for exact future solver calls and tests.
- `central_pair_segmented_attraction_seed` - Let explicit central motion replay run multiple short bridge motion simulations and recompute the pair-attraction acceleration between segments from the evolving positrino/electrino positions.
- `central_motion_policy_status` - When the central replay is using `pair_initial_attraction_seed` or `pair_segmented_attraction_seed`, show `solver seed replay` in the toolbar source chip and state in the tooltip that this is not the final full pair-interaction path solver.
- `central_delayed_hit_solver_replay` - In central pair or motion replay, build root requests from the solver-produced path samples and run central `delayedHits` once per visible wake link, preserving the numbered source/receiver path-point timing used by the canvas proof.
- `central_solver_default_replay` - Make the standalone page attempt central pair-interaction replay by default, keep the mock replay as the immediate fallback, and preserve `?replay=mock` for representative visual review.
- `contrast_stress_runtime_preset` - Add a selectable representative-only `contrast_stress` preset that uses the iOS Purple canvas and a mixed-state wake dataset with active, root-only/inactive, stale, and rejected rows for browser visual QA, without replacing that QA scene through the central bridge.
- `central_wake_solver_readout` - Carry central delayed-hit root/hit counts, solver hit time, residual, and status codes into selected wake-link readouts without adding a persistent diagnostics panel.
- `root_status_diagnostic_readout` - Surface solver root-status code, severity, and compact message details in selected rejected or root-only wake rows so invalid paths explain why they do not contribute.
- `aggregate_root_reason_summary` - Add compact aggregate invalid-reason buckets to the default feedback summary so root-only, stale, and rejected wake causes are visible without opening a side panel or clicking every wake row.
- `wake_hover_diagnostics` - Include emission time, hit time, travel time, contribution magnitude, and compact inactive/rejected solver state in wake-hover labels while keeping path-point hover labels short.
- `root_ledger_diagnostic_readout` - Preserve central delayed-hit `rootLedgerDetails` on wake links and show compact selected-wake ledger row count, first-row residual, bracket, iteration count, and nonzero ledger status code.
- `root_ledger_inspector_deferred_v1` - Keep deeper root-ledger inspection out of v1 so the app remains canvas-first and low-control; selected wake rows expose enough compact root-ledger detail for the current replay and solver-bridge review without adding another panel.
- `contribution_threshold_wake_state` - Derive selected-wake contribution magnitude from `weight * 1/r`, classify it against the assembly threshold, and dim/desaturate solver links with no delayed hit.
- `invalid_wake_visual_tiers` - Keep inactive/root-only, stale, and rejected wake links visually distinct with separate alpha, radius, and desaturation tiers while preserving the emitter-color hue.
- `aggregate_contribution_summary` - Use the compact readout strip as the default no-selection view, summarizing received, in-flight, pending, inactive, and rejected wake links plus signed red/blue/net contribution totals for the current replay time.
- `aggregate_strongest_contribution_summary` - Include the strongest currently received signed contribution in the compact feedback summary so the default readout identifies the dominant active feedback link instead of only showing red/blue/net totals.
- `empty_active_wake_summary` - When an edited or filtered dataset has no visible wake links, keep the compact contribution summary available with zero counts and a `why=no_wake_links` or `why=no_visible_wake_links` reason instead of hiding the readout or preserving stale path context.
- `aggregate_pair_solver_diagnostic_summary` - Surface compact central pair replay diagnostics in the default feedback summary, including retained-knot guidance mode, guidance sample count, max guidance acceleration, retained-knot boundary residual count/max, and max pair-law residual, without adding a side panel.
- `replay_source_status_chip` - Show a compact toolbar chip for `representative replay`, `solver bridge loading`, `solver pair replay`, `solver bridge replay`, `solver seed replay`, `representative fallback`, and `draft preview` so the operator can tell which data source is currently driving the canvas.
- `wake_arrival_animation` - Animate source motion and outward-propagating dotted causal-wake arcs along retained path-history links, using the replay clock so each wake reaches its receiving point with the receiving architrino, without particle-like markers on wake paths.
- `wake_receiver_arrival_sync` - Refresh each visible wake link from its designated retained source/receiver points whenever a replay dataset or draft path edit changes, assert that the final wake front and receiving architrino reach the receiver point at the same replay time, snap a crossed visible-wake animation frame to the receiver point for one rendered pass so the final arc is visible, and keep any solver-reported hit-time offset as diagnostics rather than as the canvas arrival schedule.
- `post_reception_wake_suppression` - Stop drawing a wake arc series immediately after its retained receiver point has been reached; the same series becomes drawable again only when the replay clock wraps into the next loop and reaches the source-to-receiver interval again.
- `first_class_endpoint_history_handles` - Treat each path start and path end as visible numbered path-history markers. Point `1` is the starting marker, the final retained point is the ending marker, and both remain draggable even when a lower retained-depth setting hides interior wake rows.
- `full_circular_arcs_preset` - Add a named preset where the normal wake-front series is drawn as full 360-degree circular fronts instead of partial receiver-facing arcs.
- `settings_gear` - Add a compact settings popover with canvas-color swatches.
- `field_and_architrino_speed_settings` - Add compact settings controls for $c_f$ replay speed and architrino speed as $v/c_f$, with the architrino speed setting using the exact 10-stop sequence `0.1`, `0.3`, `0.5`, `0.7`, `0.9`, `0.99`, `0.999`, `0.9999`, `0.99999`, and `0.999999`.
- `themed_settings_sliders` - Style the $c_f$ and architrino-speed range controls with the app's dark-purple panel treatment and cyan accent so the settings popover no longer falls back to native white/black slider chrome.
- `now_scrubber` - Add a compact toolbar scrubber that pauses replay, maps the slider to replay time without wrapping the exact end back to the start, redraws wake-front state immediately, and refreshes selected readouts without introducing a side panel.
- `retained_depth_setting` - Add compact retained-point controls in the settings popover, filter the active history points and wake rows without mutating the solver-shaped replay dataset, and preserve the selected depth across central replay reruns after path-history point `1` edits.
- `compact_selection_readout` - Let clicks on retained path-history points and wake links show a small canvas readout strip and subtle canvas highlight without adding a side panel.
- `wake_timing_readout` - Extend selected wake-link readouts with emission time, hit time, travel time, pending/active/received state, and the v1 `$1/r$` falloff factor.
- `retained_point_drag_preview` - Let retained path-history points be dragged in the temporary mock replay with smooth local path deformation, wake endpoint updates, live architrino markers that follow the edited path, and a `draft preview` source chip so edited canvas state is not confused with a solver result.
- `stale_solver_draft_state` - When a draft path edit changes geometry that has solver diagnostics attached, mark those wake rows `stale` so prior solver hits remain visible as context but no longer count as current solved contributions.
- `path_endpoint_history_handles` - Treat the path start and path end as first-class path-history handles: point `1` is the draggable start marker, the final numbered point is the draggable end marker, both use the same history-dot grammar as interior retained points, and both remain visible when a lower retained-depth setting hides interior wake rows.
- `path_start_history_drag_preview` - Use path-history point `1` as the draggable initial-position handle, deform the path start and nearby replay samples during a draft preview, then submit edited initial positions through the central replay adapter on release when that adapter is active.
- `path_start_single_history_handle` - Remove the legacy separate initial-position canvas hit path so the beginning marker is only path-history point `1`; its readout now carries source setup fields and solver-rejection details.
- `initial_velocity_arrow_drag_preview` - Make the attached velocity arrow endpoint a draggable handle; pulling it updates the selected architrino's initial `vx/vy`, bends the draft preview path forward from the initial time, and submits edited velocity through the central replay adapter on release.
- `virtual_observer_drag_preview` - Add a draggable Virtual Observer handle that updates the live contribution readout through the receiver-to-observer $1/r$ factor, carries the edited observer point in replay request options, and submits it through the central replay adapter on release without marking already solved cross-path wake roots stale.
- `background_only_wheel_and_pinch_zoom` - Add background-only canvas wheel and pinch zoom. Wheel zoom anchors under the cursor; pinch zoom anchors under the initial two-finger midpoint; both clamp back to the fitted 16:9 composition at minimum zoom and refuse to activate over selectable path-history points, velocity handles, the Virtual Observer, wake links, or active drags. The zoom is a viewport-only operation and does not change replay data, solver requests, wake timing, or contribution math.
- `direct_edit_rejection_diagnostics` - If a central replay rerun rejects an edited path-history point `1`, velocity, or Virtual Observer state, keep the edited draft on the canvas, show `solver rejected edit` in the status chip, and surface the compact rejection reason in the current readout instead of replacing the edit with the representative fallback.
- `context_reception_point_insert` - Add a canvas context-menu path insertion gesture that creates a retained reception point, inserts the paired opposite-path point at the same replay time, renumbers retained points on both paths, refreshes retained-depth controls, rebuilds cross-path wake links dynamically as `source n -> receiver n+1`, and submits the updated retained-history template through the central replay adapter when available.
- `drag_to_solver_loop` - Complete the direct-manipulation submission loop for v1: path-history point `1`, final/interior retained points, context-menu reception insertion, the Virtual Observer, and initial-velocity handle all update setup/draft state and rerun central replay on release when the central adapter is active. Retained path-history drafts submit retained constraints and adaptive finite boundary-relaxation defaults; Virtual Observer and velocity edits submit setup changes without forcing retained-path relaxation. The remaining physical-solver work is tracked by `central_solver_runtime_switch`.
- `native_pair_interaction_cabi_lane` - Add an optional native C/WASM C ABI lane for the central `pairInteraction` replay so the shared solver bridge can return pair frame samples and path-history rows through the same motion-row contract; keep the JavaScript bridge integrator as a fallback when the loaded solver artifact lacks the optional native export.
- `retained_path_constraint_pair_replay` - Carry retained-history path constraints through the central `pairInteraction` request after retained-point drag or insertion drafts, pass those constraints into the optional native C/WASM C ABI pair lane, rebuild path-history rows and frame buffers from the constrained integration result, and preserve the constraints in dynamic replay validation.
- `constraint_guided_pair_integration` - Move retained path constraints into the native and JavaScript pair-integration loop: add non-step-aligned constraint times to the emitted sample-time set, advance with a finite-time correction toward the next retained target, make the native C ABI result authoritative without a second JS repaint pass, report residual and guidance-acceleration diagnostics through the C ABI/JS bridge/runtime source chip, and verify a `t=0.25` inserted retained point plus nonzero guidance metrics through the solver app bridge smoke.
- `retained_constraint_subinterval_frame_refinement` - Add deterministic quarter, midpoint, and three-quarter frame samples inside each adjacent retained-knot interval when those samples are not already on the integration step grid, mirror the sample schedule in JavaScript fallback and native C/WASM lanes, make the causal-delay adapter reserve the refined frame count for constrained pair replays, and surface `pathConstraintFrameRefinementSampleCount` in bridge summaries, runtime source-chip diagnostics, and compact aggregate feedback details.
- `constraint_tangent_velocity_seeding` - When the pair solver snaps to a retained path constraint after point `1`, seed the constrained state velocity from neighboring retained knots, using a centered retained-knot tangent for interior points and a backward tangent for the final point. Keep point `1` velocity owned by the initial-velocity handle.
- `law_aware_retained_tangents` - Keep retained path-history positions fixed, but make the retained-knot velocity/tangent estimate law-aware when the pair-law acceleration can be evaluated at the retained time. This moves the constrained guided replay away from a purely geometric Hermite path while preserving exact dragged/start/end/reception markers.
- `law_aware_boundary_segments` - When both retained segment endpoints have reconstructable pair-law acceleration, guide intermediate constrained samples along a quintic retained-knot boundary path that preserves endpoint positions, retained-knot tangents, and endpoint accelerations. Fall back to the cubic retained-knot boundary path when those acceleration samples are unavailable.
- `retained_boundary_guidance` - For sample times between retained points, guide the constrained pair replay toward the retained-knot boundary path defined by retained positions, retained-knot tangents, and any available endpoint pair-law accelerations, then keep pair-law residuals and guidance acceleration as diagnostics until the full physical boundary-value solver replaces this guided path.
- `boundary_frame_relaxation_pass` - Before relaxation, reseed constrained frame samples from the law-aware retained-knot boundary curve when a finite relaxation budget is requested. Then relax non-retained frame samples with the coupled finite-difference pair equation while preserving retained path-history knots exactly, and rebuild frame velocities and path rows from the relaxed frame path. This is an incremental boundary-value-solver step; unconverged or merely accepted runs remain guided diagnostic replays, while explicit tolerance-converged runs now get a separate discrete boundary-value status.
- `boundary_relaxation_nonuniform_velocity_rebuild` - After retained-knot boundary relaxation, rebuild interior frame velocities with a nonuniform three-point derivative so inserted or dragged retained points at non-step-aligned times no longer use a previous-to-next chord shortcut. Endpoint samples still fall back to the segment chord velocity, and path rows continue to carry segment-level chord velocities for display and validation.
- `boundary_seed_telemetry` - Carry the constrained-frame boundary seed mode and reseeded sample count through the native C ABI, JavaScript fallback, central pair summary, causal-delay dataset, source-chip tooltip, compact feedback summary, bridge adapter tests, and solver smoke so retained-path boundary replays prove that relaxation began from the retained-knot boundary curve rather than from the unseeded integrated path.
- `boundary_relaxation_metadata` - Carry `pathConstraintBoundaryRelaxationMode` and `pathConstraintBoundaryRelaxationIterationCount` through the central pair summary, causal-delay dataset, source-chip tooltip, and compact feedback summary so constrained replays identify the relaxation pass without adding another panel.
- `boundary_relaxation_iteration_request` - Accept `pathConstraintBoundaryRelaxationIterationCount` through the central pair-interaction request, causal-delay review URL, and native C/WASM ABI reserved request slot so JavaScript fallback and native constrained replays use and report the same finite-difference relaxation sweep count.
- `boundary_relaxation_convergence_tolerance` - Accept optional `pathConstraintBoundaryRelaxationTolerance` through the central pair-interaction request, causal-delay review URL, and native C/WASM ABI request layout; stop the finite-difference relaxation pass early when the relaxable-frame residual reaches that threshold, and report the actual applied iteration count plus `converged` status through the central pair summary, causal-delay dataset, source-chip tooltip, compact feedback summary, contract fixtures, and solver smoke.
- `adaptive_boundary_relaxation_direct_edit_default` - For retained path-history draft releases, request a responsive finite-difference boundary relaxation first, then retry once with the supported maximum relaxation budget and a stricter tolerance when the first central replay does not meet the stronger default residual target; preserve explicit URL or injected relaxation settings without retrying. Adopt the retry only when it improves the solver status rank or finite relaxation residual evidence; otherwise keep the first dataset and surface rejected-retry telemetry in the source chip and compact feedback summary.
- `boundary_relaxation_residual_telemetry` - Measure the maximum finite-difference pair-law residual across non-retained frame samples before and after the boundary relaxation pass, carry the sample count, before/after maxima, and after/before ratio through the native C ABI, JavaScript fallback, central pair summary, causal-delay dataset, source-chip tooltip, and contract fixtures, and require the causal-delay solver smoke to prove the measured residual decreases.
- `boundary_relaxation_distribution_telemetry` - Measure mean and RMS finite-difference pair-law residuals across relaxable frame samples before and after the boundary relaxation pass, carry the before/after values plus mean/RMS residual ratios through the native C ABI, JavaScript fallback, central pair summary, causal-delay dataset, source-chip tooltip, compact feedback summary, bridge adapter tests, solver contract schema, and solver smoke so residual improvement is visible beyond the single maximum sample.
- `boundary_relaxation_aggregate_acceptance` - Require each finite-difference relaxation line-search candidate to keep the maximum, mean, and RMS relaxable-frame pair-law residuals no worse than the previous frame state, and choose among accepted candidates by lowest maximum residual with RMS and mean residual as tie-breakers. Apply the same rule in the native C/WASM solver lane and the JavaScript fallback so explicit no-WASM pair runs keep the same monotone residual contract.
- `boundary_relaxation_best_state_retention` - Retain the lowest aggregate residual frame state seen across accepted finite-difference relaxation sweeps, restore that best state before rebuilding velocities/path rows, and apply the same rule in the native C/WASM solver lane and the JavaScript fallback so epsilon-tie accepted sweeps cannot drift away from the best solved frame state.
- `boundary_relaxation_deeper_line_search` - Test finite-difference boundary-relaxation line-search factors from full step down through `1/256` in both the native C/WASM solver lane and JavaScript fallback so stiff retained-knot updates can still accept a small residual-nonworsening step before reporting `line_search_stalled`.
- `boundary_relaxation_guarded_overstep` - Add a conservative `1.25` over-relaxation candidate before the existing full-step and damped finite-difference relaxation factors. The same aggregate residual no-worse guard still decides acceptance, so this can speed convergent constrained pair replays without weakening retained-knot preservation or fallback/native parity.
- `boundary_relaxation_predictor_corrector` - For each finite-difference relaxation sweep, build a predictor candidate with pair-law acceleration evaluated at the current frame state, build a corrector candidate with pair-law acceleration evaluated at the predicted frame state, line-search both candidates against the same baseline residual, and keep the accepted candidate with the lowest aggregate residual. Apply this in both native C/WASM and JavaScript fallback lanes as an incremental nonlinear boundary-solve step without claiming the full physical path-constraint solver is complete.
- `boundary_relaxation_second_corrector` - Add a second predicted-state corrector candidate to each finite-difference relaxation sweep: after the first corrector is built, apply it at full strength to the same baseline, recompute pair-law acceleration at that first-corrector predicted frame state, build a second corrector candidate, and line-search predictor, first corrector, and second corrector against the same aggregate residual baseline in both native C/WASM and JavaScript fallback lanes.
- `boundary_relaxation_third_corrector` - Add a third predicted-state corrector candidate to each finite-difference relaxation sweep: after the second corrector is built, apply it at full strength to the same baseline, recompute pair-law acceleration at that second-corrector predicted frame state, build a third corrector candidate, and line-search predictor, first corrector, second corrector, and third corrector against the same aggregate residual baseline in both native C/WASM and JavaScript fallback lanes.
- `boundary_relaxation_residual_defect_correction` - Add a residual-defect correction candidate to each finite-difference relaxation sweep: solve a tridiagonal correction for the measured finite-difference pair-law residual with retained endpoint deltas fixed at zero, convert the solved deltas into candidate positions, and line-search that candidate beside the predictor and predicted-state correctors in both native C/WASM and JavaScript fallback lanes.
- `boundary_relaxation_linearized_defect_correction` - Add a directional linearized defect-correction candidate to each finite-difference relaxation sweep: probe the current residual-defect correction direction, estimate a scalar residual response along that direction, clamp the resulting minimum-residual scale, and line-search the candidate under the same aggregate residual no-worse guard in both native C/WASM and JavaScript fallback lanes.
- `boundary_relaxation_local_newton_defect_correction` - Add a local Newton defect-correction candidate to each finite-difference relaxation sweep: estimate the same-point derivative of the residual from the finite-difference operator and pair-law self derivative, clamp the resulting point step by neighboring path spacing and the residual-defect scale, and line-search the candidate under the same aggregate residual no-worse guard in both native C/WASM and JavaScript fallback lanes.
- `boundary_relaxation_coupled_local_newton_defect_correction` - Add a coupled local Newton defect-correction candidate to each finite-difference relaxation sweep: solve the same-frame positrino/electrino residual Jacobian together, including pair-law cross derivatives, clamp the coupled position step by neighboring path spacing and residual-defect scale, and line-search the candidate under the same aggregate residual no-worse guard in both native C/WASM and JavaScript fallback lanes.
- `boundary_relaxation_block_coupled_newton_defect_correction` - Add a block-coupled Newton defect-correction candidate to each finite-difference relaxation sweep: solve all relaxable frame positions inside each retained-knot interval together, including temporal finite-difference neighbor terms and same-frame pair-law cross derivatives, clamp the block step by neighboring path spacing and residual-defect scale, and line-search the candidate under the same aggregate residual no-worse guard in both native C/WASM and JavaScript fallback lanes.
- `boundary_relaxation_predicted_block_coupled_newton_defect_correction` - Evaluate block-coupled Newton defect-correction candidates from the predictor, first-corrector, second-corrector, and third-corrector predicted frame states as well as the current frame state, then line-search those block-level Newton candidates under the same aggregate residual no-worse guard in both native C/WASM and JavaScript fallback lanes.
- `boundary_relaxation_predicted_defect_correction` - Evaluate residual-defect correction candidates from the predictor, first-corrector, second-corrector, and third-corrector predicted frame states as well as the current frame state, then line-search all defect-correction candidates against the same aggregate residual no-worse guard in both native C/WASM and JavaScript fallback lanes.
- `boundary_relaxation_blended_acceleration_candidates` - Add Picard-style blended-acceleration candidates to each finite-difference relaxation sweep by solving retained-knot boundary blocks with pair-law acceleration averaged between the current frame state and the predictor, first-corrector, second-corrector, or third-corrector predicted frame state. Line-search those candidates with the same aggregate residual no-worse guard in both native C/WASM and JavaScript fallback lanes.
- `boundary_relaxation_center_of_mass_projection_candidates` - Add mass-weighted center-of-mass projected variants for finite-difference relaxation candidates: for each unconstrained same-time positrino/electrino frame pair, preserve the candidate pair separation but shift the pair onto the center-of-mass line implied by retained knots. Line-search these projected candidates with the same aggregate residual no-worse guard in both native C/WASM and JavaScript fallback lanes.
- `boundary_relaxation_candidate_selection_telemetry` - Carry the selected finite-difference boundary-relaxation candidate family, center-of-mass-projected selection count, non-empty candidate-variant count, line-search trial count, and candidate-family bitmask through the native C ABI, JavaScript fallback, central pair summary, solver bridge schema and declaration surface, causal-delay dataset, source-chip tooltip, compact feedback summary, bridge adapter tests, and solver smoke. This makes predictor/corrector/defect/projection participation inspectable without upgrading the physical solver claim.
- `pair_interaction_contract_surface_parity` - Keep the pair-interaction JSON schema, TypeScript declarations, and contract fixture aligned with the causal-delay central replay fields: retained-knot frame-refinement count, boundary-relaxation candidate-family telemetry, retained-position residual acceptance status, retained-knot boundary-residual acceptance status, and guidance-acceleration tolerance/status.
- `js_fallback_retained_subinterval_parity` - Extend the solver app bridge check so a no-WASM JavaScript-fallback causal-delay `pairInteraction` run with nonuniform retained-knot times emits the same additional retained-knot subinterval frame samples as the native C/WASM lane. This keeps the temporary fallback solver-shaped while the native central bridge remains the preferred path.
- `boundary_relaxation_settling_rate_telemetry` - Derive max/mean/RMS residual settling rates from the residual ratios and applied relaxation sweep count, then carry those rates through the native C ABI, JavaScript fallback, central pair summary, causal-delay dataset, source-chip tooltip, compact feedback summary, bridge adapter tests, solver contract schema, and solver smoke so reviewers can distinguish total residual reduction from per-sweep settling behavior without upgrading the physical solver claim.
- `boundary_relaxation_step_telemetry` - Measure the maximum accepted position update and final accepted line-search factor during finite-difference boundary relaxation, carry both values through the native C ABI, JavaScript fallback, central pair summary, causal-delay dataset, source-chip tooltip, compact feedback summary, bridge adapter tests, solver contract schema, and solver smoke. This makes solver settling visible without claiming the full physical boundary-value solver is complete.
- `boundary_relaxation_step_tolerance` - Accept optional `pathConstraintBoundaryRelaxationStepTolerance` through the central pair-interaction request, causal-delay review URL, JavaScript fallback, and native C/WASM ABI request layout; stop the finite-difference relaxation pass early with `step_tolerance_reached` and `step_converged` when the accepted position update reaches that threshold, carry the requested tolerance through the central pair summary, causal-delay dataset, source-chip tooltip, compact feedback summary, bridge adapter tests, solver contract schema, and solver smoke, and keep `pathConstraintSolverStatus=guided_constraint_path` because step settling alone is not residual-converged boundary-value closure.
- `boundary_relaxation_stop_reason_telemetry` - Carry the finite-difference boundary relaxation loop stop reason through the native C ABI, JavaScript fallback, central pair summary, causal-delay dataset, source-chip tooltip, compact feedback summary, bridge adapter tests, and solver smoke so accepted, converged, skipped, stalled, and budget-exhausted replays can be distinguished.
- `boundary_relaxation_acceptance_status` - Keep the relaxed frame path only when the measured non-retained-frame residual does not worsen; otherwise restore the pre-relaxation frames and report `reverted_no_improvement`. Accepted constrained replays surface `pathConstraintBoundaryRelaxationStatus=accepted` through the native C ABI, JavaScript fallback, central pair summary, causal-delay dataset, source-chip tooltip, compact feedback summary, and solver smoke checks.
- `boundary_residual_pair_diagnostics` - Add native C ABI and JavaScript fallback diagnostics that compare the acceleration implied by adjacent retained path knots against the pair-interaction law at those same knots, surface the boundary-residual sample count and max/mean/RMS residuals through the central bridge, and show the max retained-knot residual in the causal-delay source-chip tooltip.
- `boundary_residual_boundary_curve_states` - Evaluate retained-knot boundary-residual pair-law states on the same law-aware retained-knot boundary curve used by boundary seeding when the opposite path has staggered retained times, and add a native C/WASM plus JavaScript-fallback smoke case so the residual diagnostic no longer falls back to a linear retained-position surrogate.
- `constraint_solver_status_contract` - Carry `pathConstraintSolverStatus` and `pathConstraintSolverClaim` through the central `pairInteraction` summary and causal-delay runtime dataset so constrained runs are machine-readable as `guided_constraint_path`, `constraint_snap_only`, or `discrete_boundary_value_converged`. Guided and snap-only runs keep the explicit claim `diagnostic_constraint_replay_not_boundary_value_solve`; tolerance-converged finite-difference boundary runs use `finite_difference_pair_boundary_value_solve_converged` without claiming full Noether sea closure.
- `boundary_residual_acceptance_gate` - Add optional `pathConstraintBoundaryResidualTolerance` request/query support so constrained pair replays can fail closed with `path_constraint_boundary_residual_exceeded` when retained-knot boundary residual diagnostics exceed an explicit tolerance; leave the default unset so normal visual replay remains available while the full boundary-value solver is still pending.
- `boundary_residual_acceptance_status` - Carry `pathConstraintBoundaryResidualStatus` through successful and rejected central pair replays so tolerance review runs are machine-readable as `within_tolerance`, `no_boundary_samples`, `unresolved`, `unchecked`, or `exceeded_tolerance`; show non-`unchecked` statuses in the compact source chip and feedback summary without adding a panel, and show `unchecked` on `solver boundary replay` so a finite-difference relaxation result is not mistaken for retained-knot boundary-residual acceptance.
- `position_residual_acceptance_gate` - Add optional `pathConstraintPositionResidualTolerance` request/query support so constrained pair replays can fail closed with `path_constraint_position_residual_exceeded` or `path_constraint_position_residual_unresolved` when retained-position diagnostics do not prove that submitted start, interior, and final path-history points were preserved.
- `guidance_acceleration_acceptance_gate` - Add optional `pathConstraintGuidanceAccelerationTolerance` request/query support so constrained pair replays can fail closed with `path_constraint_guidance_acceleration_exceeded` when retained-knot guidance acceleration remains above an explicit tolerance; leave the default unset so ordinary visual replay remains available while the full boundary-value solver is still pending.
- `guidance_acceleration_acceptance_status` - Carry `pathConstraintGuidanceAccelerationStatus` through successful and rejected central pair replays so tolerance review runs are machine-readable as `within_tolerance`, `no_guidance_samples`, `unresolved`, `unchecked`, or `exceeded_tolerance`; show non-`unchecked` statuses in the compact source chip and feedback summary without adding a panel.
- `pair_interaction_law_default` - Make `inverse_distance_pair_attraction_v1` the causal-delay central-pair default so the app uses the existing $1/r$-attenuated pair law by default, while preserving `pairInteractionLaw=display_pair_attraction_v1` as an explicit comparison URL.
- `browser_qa_capture_script` - Add a reproducible browser-capture script for the contrast-stress purple runtime proofs, including 1920x1080 landscape and 390x844-at-2x portrait captures with pinned replay time, selected wake diagnostics, and the settings panel open.
- `purple_browser_screenshot_proof` - Capture a 1920x1080 browser proof of the contrast-stress purple canvas with selected rejected-wake diagnostics and open settings controls, confirming the canvas, labels, compact readout, and themed controls remain legible together.
- `portrait_browser_screenshot_proof` - Capture a 390x844 portrait browser proof of the contrast-stress purple canvas and flip the Virtual Observer label to the left when it would clip against the portrait right edge.
- `central_browser_screenshot_proof` - Capture a 1920x1080 browser proof of the default central `pairInteraction` replay and fail the proof if the runtime silently falls back to `representative_mock_solver_replay`, `temporary_mock_adapter`, or a non-`pairInteraction` central replay mode.
- `central_portrait_browser_screenshot_proof` - Capture a 390x844 phone-shaped browser proof of the default central `pairInteraction` replay and fail the proof if the runtime silently falls back to `representative_mock_solver_replay`, `temporary_mock_adapter`, or a non-`pairInteraction` central replay mode, so the future iPhone integration path has central-replay evidence rather than only mock portrait evidence.
- `central_direct_edit_browser_screenshot_proof` - Capture a 1920x1080 browser proof after a scripted retained-point drag, wait for the central replay rerun, and fail the proof unless the returned dataset is `central_solver_bridge_replay` through `central_solver_bridge_replay_adapter` with `solverReplayMode=pairInteraction`, `pathConstraintSolverStatus=discrete_boundary_value_converged`, `pathConstraintSolverClaim=finite_difference_pair_boundary_value_solve_converged`, `pathConstraintPhysicalBoundarySolverStatus=physical_boundary_solver_pending`, `pathConstraintPhysicalBoundarySolverClaim=retained_knot_guidance_not_physical_boundary_value_solve`, the edited retained point preserved, retained-position residual evidence covering every submitted path-history marker, initial-velocity evidence accepted, retained-knot boundary-residual evidence accepted, aggregate residual evidence marked `aggregate_non_worsening`, and the source chip reading `solver boundary replay` with `posRows`, `posStatus=within_tolerance`, `initVelRows`, `initVelStatus=within_tolerance`, `boundary`, `bStatus=within_tolerance`, and `relaxEvidence=aggregate_non_worsening`.
- `central_boundary_relaxation_browser_screenshot_proof` - Capture a 1920x1080 browser proof after a scripted retained-point drag with finite `pathConstraintBoundaryRelaxationTolerance` and `pathConstraintBoundaryRelaxationIterationCount` settings, wait for the central replay rerun, and fail the proof unless the returned dataset is `central_solver_bridge_replay` through `central_solver_bridge_replay_adapter` with `solverReplayMode=pairInteraction`, `pathConstraintSolverStatus=discrete_boundary_value_converged`, `pathConstraintSolverClaim=finite_difference_pair_boundary_value_solve_converged`, `pathConstraintPhysicalBoundarySolverStatus=physical_boundary_solver_pending`, `pathConstraintPhysicalBoundarySolverClaim=retained_knot_guidance_not_physical_boundary_value_solve`, `maxPathConstraintBoundaryRelaxationResidualAfter` at or below the requested proof threshold, `pathConstraintBoundaryRelaxationResidualRatio` at or below the requested proof threshold, retained-position residual evidence covering every submitted path-history marker, initial-velocity evidence accepted, retained-knot boundary-residual evidence accepted, aggregate residual evidence marked `aggregate_non_worsening`, and the source chip reads `solver boundary replay` with `posRows`, `posStatus=within_tolerance`, `initVelRows`, `initVelStatus=within_tolerance`, `boundary`, `bStatus=within_tolerance`, and `relaxEvidence=aggregate_non_worsening`.
- `central_initial_position_browser_screenshot_proof` - Capture a 1920x1080 browser proof after a scripted path-history point `1` drag, wait for the central replay rerun, and fail the proof unless the returned dataset is `central_solver_bridge_replay` through `central_solver_bridge_replay_adapter` with `solverReplayMode=pairInteraction`, `pathConstraintSolverStatus=discrete_boundary_value_converged`, `pathConstraintSolverClaim=finite_difference_pair_boundary_value_solve_converged`, `pathConstraintPhysicalBoundarySolverStatus=physical_boundary_solver_pending`, `pathConstraintPhysicalBoundarySolverClaim=retained_knot_guidance_not_physical_boundary_value_solve`, the edited initial condition preserved by the first numbered path-history marker, retained-position residual evidence covering every submitted path-history marker, initial-velocity evidence accepted, retained-knot boundary-residual evidence accepted, aggregate residual evidence marked `aggregate_non_worsening`, and the source chip reading `solver boundary replay` with `posRows`, `posStatus=within_tolerance`, `initVelRows`, `initVelStatus=within_tolerance`, `boundary`, `bStatus=within_tolerance`, and `relaxEvidence=aggregate_non_worsening`.
- `central_final_position_browser_screenshot_proof` - Capture a 1920x1080 browser proof after a scripted final path-history marker drag, wait for the central replay rerun, and fail the proof unless the returned dataset is `central_solver_bridge_replay` through `central_solver_bridge_replay_adapter` with `solverReplayMode=pairInteraction`, `pathConstraintSolverStatus=discrete_boundary_value_converged`, `pathConstraintSolverClaim=finite_difference_pair_boundary_value_solve_converged`, `pathConstraintPhysicalBoundarySolverStatus=physical_boundary_solver_pending`, `pathConstraintPhysicalBoundarySolverClaim=retained_knot_guidance_not_physical_boundary_value_solve`, the edited endpoint preserved as the final numbered path-history point, retained-position residual evidence covering every submitted path-history marker, initial-velocity evidence accepted, retained-knot boundary-residual evidence accepted, aggregate residual evidence marked `aggregate_non_worsening`, and the source chip reading `solver boundary replay` with `posRows`, `posStatus=within_tolerance`, `initVelRows`, `initVelStatus=within_tolerance`, `boundary`, `bStatus=within_tolerance`, and `relaxEvidence=aggregate_non_worsening`.
- `central_reception_insert_browser_screenshot_proof` - Capture a 1920x1080 browser proof after a scripted canvas context-menu reception-point insertion, wait for the central replay rerun, and fail the proof unless the returned dataset is `central_solver_bridge_replay` through `central_solver_bridge_replay_adapter` with `solverReplayMode=pairInteraction`, `pathConstraintSolverStatus=discrete_boundary_value_converged`, `pathConstraintSolverClaim=finite_difference_pair_boundary_value_solve_converged`, `pathConstraintPhysicalBoundarySolverStatus=physical_boundary_solver_pending`, `pathConstraintPhysicalBoundarySolverClaim=retained_knot_guidance_not_physical_boundary_value_solve`, both histories containing seven renumbered points, rebuilt wake links following `source n -> receiver n+1`, retained-position residual evidence covering every submitted path-history marker, initial-velocity evidence accepted, retained-knot boundary-residual evidence accepted, aggregate residual evidence marked `aggregate_non_worsening`, and the source chip reading `solver boundary replay` with `posRows`, `posStatus=within_tolerance`, `initVelRows`, `initVelStatus=within_tolerance`, `boundary`, `bStatus=within_tolerance`, and `relaxEvidence=aggregate_non_worsening`.
- The central direct-edit browser proofs also require `pathConstraintPhysicalBoundarySolverBlockingReason=physical_boundary_solver_not_implemented`, making the remaining physical-solver implementation gap visible after the finite-difference boundary replay has converged.
- `central_initial_velocity_browser_screenshot_proof` - Capture a 1920x1080 browser proof after a scripted initial-velocity handle drag, wait for the central replay rerun, and fail the proof unless the returned dataset is `central_solver_bridge_replay` through `central_solver_bridge_replay_adapter` with `solverReplayMode=pairInteraction` and the source chip reading `solver pair replay`.
- `boundary_tolerance_query_default_fix` - Treat an absent or blank `boundaryResidualTolerance`/`pathConstraintBoundaryResidualTolerance` URL parameter as unset instead of coercing `null` to zero, so ordinary direct-manipulation central reruns do not fail closed unless the operator explicitly requests a tolerance gate.
- `settings_reset_preset` - Add a compact `Reset preset` action to the settings popover that clears direct-manipulation draft edits and reloads the currently selected preset through the active replay adapter, including the central solver bridge when available.
- `display_reduced_motion_high_contrast_paths` - Add compact settings-popover toggles for reduced motion and high contrast paths. Reduced motion pauses automatic replay while leaving scrubber and keyboard frame-step navigation active; high contrast strengthens solid path-history trails and architrino markers without changing wake timing or solver replay input.
- `weak_contribution_cue_setting` - Add a compact settings-popover select for weak contribution cues. `threshold_only` preserves the current assembly-threshold fade/thin/desaturation treatment for active weak wakes, while `off` disables that threshold cue without changing contribution math, solver input, or inactive/stale/rejected visual tiers.
- `background_depth_field_setting` - Add an optional settings-popover toggle for a restrained purple depth field behind the time-space diagram. The setting is render-only, defaults off, and does not affect replay data, solver requests, causal-wake timing, or contribution math.
- `causal_delay_runtime_test` - Add focused Node tests for selected history readout, selected wake timing/falloff readout, dense wake bands, retained-point dragging, path-history point `1` source-position dragging, initial-velocity dragging, spacebar play/pause, direct preset review URLs, async bridge replay loading, bridge fallback behavior, stale async replay protection, replay-source status labels, and central bridge replay normalization.

## Current Build Queue

1. `central_solver_runtime_switch` - The standalone page now attempts central `pairInteraction` replay by default, can execute the central bridge through the browser-side WASM loader when the built solver artifact exists, advances the positrino/electrino pair together in one bridge request, uses the optional native C ABI pair-interaction lane when available, defaults that request to the existing `inverse_distance_pair_attraction_v1` law, can enforce explicit retained-position residual, retained-knot boundary-residual, and guidance-acceleration tolerances for fail-closed review runs, rejects constrained tolerance-gated runs when the requested audit samples are missing or unresolved, accepts residual and accepted-step relaxation tolerances for review runs, reports retained-position and boundary-residual acceptance status for tolerance review runs, and can fall back to the JavaScript bridge integrator or representative mock replay when the bridge is unavailable. The public bridge entrypoint and shared client resolver now also allow explicit no-WASM `pairInteraction` runs to use that JavaScript fallback while keeping module-required run kinds fail-closed. Retained constraints now participate in the integration loop instead of being applied as a post-run display projection, the constrained sample schedule adds deterministic quarter, midpoint, and three-quarter subinterval frame samples inside adjacent retained-knot intervals, constrained hits after point `1` seed law-aware retained-knot tangents when the pair-law acceleration can be evaluated at that retained time, intermediate constrained samples use a law-aware quintic retained-knot boundary segment when endpoint accelerations are available and fall back to cubic retained-knot boundary guidance otherwise, relaxation-requested constrained runs bypass active guidance during initial pair integration, constrained frame samples are reseeded from that law-aware retained-knot boundary curve before aggregate-residual-monotone finite-difference boundary relaxation, the relaxation loop evaluates predictor, first predicted-state-corrector, second predicted-state-corrector, third predicted-state-corrector, blended current/predicted pair-law acceleration, center-of-mass projected candidate variants, residual-defect correction candidates from the current, predictor, first-corrector, second-corrector, and third-corrector predicted frame states, a directional linearized defect-correction candidate that probes and scales the current defect direction, local and coupled-local Newton defect-correction candidates that include pair-law derivatives, and block-coupled Newton defect-correction candidates from the current, predictor, first-corrector, second-corrector, and third-corrector predicted frame states that solve retained-knot intervals with temporal neighbor terms and same-frame pair-law cross derivatives, tests a guarded `1.25` over-relaxation candidate followed by full step through `1/256`, restores the best aggregate-residual frame state before rebuilding velocities/path rows, and constrained runs expose retained-position residual diagnostics, retained-knot boundary-residual diagnostics, boundary-seed metadata, relaxation mode/iteration metadata, max/mean/RMS relaxable-frame residual before/after, ratio telemetry, per-sweep settling-rate telemetry, accepted-step telemetry and tolerance stops, selected relaxation candidate telemetry, candidate-variant, candidate-family mask, and line-search trial counts, relaxation acceptance status, `pathConstraintSolverStatus`/`pathConstraintSolverClaim`, and `pathConstraintPhysicalBoundarySolverStatus`/`pathConstraintPhysicalBoundarySolverClaim` in the source chip and compact summary. Relaxation-disabled constrained runs still expose finite-time guidance diagnostics for explicit `pathConstraintBoundaryRelaxationIterationCount=0` review. Explicit guided/snap solver status fields remain authoritative, but an explicit `discrete_boundary_value_converged` status is now revalidated by the causal-delay adapter before it reaches the UI; if a bridge response omits solver status fields, the app adapter derives `discrete_boundary_value_converged` only from converged finite-difference relaxation telemetry with residual samples, a satisfied relaxation tolerance, retained-position preservation evidence, and aggregate non-worsening max/mean/RMS residual evidence, and otherwise derives `boundary_seeded_constraint_path` when boundary seed samples exist without converged evidence. The physical boundary-solver status remains `physical_boundary_solver_pending` for constrained replays until the intended physical pair-interaction/path-constraint boundary-value solver exists behind the same `pairInteraction` contract. The solver-side finite-difference convergence and accepted-step statuses also require that same aggregate max/mean/RMS evidence, so a loose tolerance cannot convert a worsened or incompletely measured relaxation pass into a boundary-replay claim. Retained path-history drafts now start at `64` relaxation sweeps and tolerance `10`, retry once at `256` sweeps and tolerance `1` when the first response does not meet the stronger default target, report `discrete_boundary_value_converged` when the finite-difference relaxation converges by residual tolerance, and report `boundary_seeded_constraint_path` for boundary-seeded relaxation results that remain diagnostic. Remaining work is replacing retained-knot boundary seeding and discrete finite relaxation with the intended full physical pair-interaction/path-constraint boundary-value solver behind the same `pairInteraction` contract. Status: `active`.

Boundary-replay status derivation now treats non-worsening residual evidence as an aggregate max/mean/RMS requirement: max, mean, and RMS relaxable-frame residuals must all be no worse after finite-difference relaxation before the app adapter or solver-side status helper may report finite-difference boundary convergence. The native C++ relaxation status source, central bridge native-response normalization, and causal-delay adapter all enforce that aggregate evidence rule, so stale bridge summaries cannot report `accepted`, `step_converged`, or `converged` when max/mean/RMS residual evidence is incomplete or worsened; contradictory strong statuses downgrade to `no_relaxable_samples` or `reverted_no_improvement` before the dataset reaches the UI. When explicit solver status fields are absent, the app adapter also validates an explicit `aggregate_non_worsening` residual-evidence label against the numeric max/mean/RMS before/after residuals before deriving `discrete_boundary_value_converged`; stale or contradictory evidence falls back to `aggregate_worsened` or `incomplete_evidence` and does not create a boundary-value claim. Explicit `discrete_boundary_value_converged` fields from a bridge response are also revalidated against the same retained-position, initial-velocity, retained-knot boundary-residual, and aggregate residual evidence before they reach the causal-delay dataset, so stale boundary claims from older adapters fail closed instead of overriding the evidence gate. Derived and explicit boundary claims both require retained-position residual samples covering the submitted constraints with the retained knots preserved to the automatic exactness threshold or an explicit retained-position tolerance, require initial velocity to be preserved to the automatic exactness threshold or an explicit initial-velocity tolerance, and require any explicitly requested retained-knot boundary-residual tolerance to be satisfied. The source-chip tooltip surfaces retained-position status and boundary-relaxation residual-evidence status on boundary replays, and explicitly warns when retained-position preservation evidence is unchecked.

Physical-boundary-solver pending status now includes `pathConstraintPhysicalBoundarySolverBlockingReason`, so constrained replays identify whether the current blocker is retained-knot guidance acceleration, unconverged finite-difference relaxation, unmet initial-velocity preservation evidence, unmet explicit retained-knot boundary-residual evidence, or absence of the intended physical solver implementation.

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
- Treat the beginning and ending marker on each architrino path as first-class path-history points. The starting marker is path-history point `1`, the ending marker is the final numbered path-history point, and both endpoint markers must be movable with the same retained-point drag behavior as interior history points. Submit endpoint and interior retained-point drags as retained path constraints through the central pair replay contract. Current solver behavior uses retained-knot boundary seeding plus finite-difference relaxation for ordinary constrained replays, while retained-knot guidance remains a relaxation-disabled diagnostic mode and the full physical path-constraint boundary-value solver is still pending.
