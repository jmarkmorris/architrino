# A1 Lorentz Geometry (ideal-braid) Code Review — 2026-07-24

Review scope: `src/apps/ideal-braid/IdealBraidRuntime.js` (2349 lines), `IdealBraidPathPotentialProfile.js` (334), `main.js`, `ideal-braid.html` (1136), `tests/ideal-braid-runtime.test.js`, plus dependency skims (`PrescribedPathAnalysis.mjs`, animator scaffold/geometry runtimes, `MarkdownRuntime.js`, `StandaloneAppHomeRuntime.js`). Comments only — no code changes were made by this review. Math and behavioral claims were verified by executing the real modules under Node 22; the two headline behavioral bugs (H1, H4) were confirmed by harness.

Same-day context: the node:crypto barrel-import regression (blank canvas) was diagnosed and fixed separately today; the four app files now import `PrescribedPathAnalysis.mjs` directly and `tests/browser-import-graph-node-builtins.test.js` guards the browser import graph. That fix is not re-flagged here.

## Architecture Summary

Single-mount THREE.js lesson surface. `main.js` assigns `window.__IDEAL_BRAID__ = mountIdealBraid()` with no error handling. The model derives 3 binaries / 6 architrinos from `createAnimatorDefaultCoreSpec("ideal_braid")` (radii 0.9/1.26/1.62, frequencies 0.42/0.26/0.16 Hz, orthogonal plane normals), designating binary 2's path speed (≈2.0584) as the field-speed reference c_f. The Lorentz lesson is three pure functions — `computeLorentzState`, `computeLorentzAlignedOrbitBasis`, `computeAssemblyMomentumContractionMatrix` — all numerically verified correct (T∥≡T⊥ to 1e-12; ‖Mn̂‖=ξ, ‖Mt̂‖=1; R∥=R⊥/γ exactly, matching the guide).

Two async solver paths route through prescribed-path analysis: a one-shot circular self-hit span batch at mount (feeds wake-span tint profiles) and a debounced (120 ms edit / 180 ms min-interval / ⅛-s time-quantum) delayed-potential surface solve over 1200 spherical samples × 6 transmitters, with generation counter + stateKey staleness guards. The scheduler is single-flight, so out-of-order responses are structurally impossible (adversarial check clean). Transmitters are straight-line linearizations of the circular orbits (`simplificationPolicy: "linear-transmitter-segment"`).

DOM id contract checked selector-by-selector: all 36 ids present, no drift. Display-name discipline ("A1 Lorentz Geometry" public / `ideal-braid` machine) holds and is test-pinned.

## HIGH Findings

### H1 — Cross-document links inside the guide close the overlay instead of navigating (verified by harness)

`IdealBraidRuntime.js:1503-1512` passes every clicked link target as `showMarkdownPanel({ id: target, ... })`. `MarkdownRuntime.js` only extracts a path from `runtime:markdown:*`-prefixed ids; ordinary links resolve to plain repo paths → `markdownPath: null` → `hideMarkdownPanel()`. Harness confirmed: open guide → click any of the four "Read this alongside" links (`ideal-braid-guide.md:11-14`) → panel closes. Photon has the correct implementation (`PhotonRuntime.js:291-305`): branch on the `runtime:markdown:` prefix and pass `{ markdownPath: target }` otherwise. Fix: copy photon's branch; derive the panel name from a path map instead of hardcoded "Guide".

### H2 — Surface-solver failure is swallowed silently, then retried at frame rate with no backoff

`surfaceSolverError` is assigned (`IdealBraidRuntime.js:1687, 1727, 1782, 1819, 1827`) and never read — no status, no console. On failure the surface silently renders the all-zero fallback (uniform mid-purple). After a failure the snapshot is never updated, so `stateChanged` stays true, which skips the 180 ms min-interval gate (1759-1765), and the catch disarms the edit-debounce (1826). `updateSurface` schedules every frame (1995), so a persistently failing analysis is re-issued ~60×/s forever. The one-shot orbit-profile solve is quieter still: `.catch(() => { orbitProfileSolverPromise = null; })` (1859-1861) — wake span silently stays at the π/2 placeholder. Fix: surface the error into `.ideal-braid-status` (console.error at minimum); make the min-interval gate unconditional or add backoff keyed off the error state.

### H3 — `destroy()` leaks essentially every GPU resource and event listener

`IdealBraidRuntime.js:2342-2347` disposes only `resizeObserver` and `renderer`. Never disposed: architrino geometry + 6 materials, 3 orbit-line geometries/materials, 12 trail-ribbon geometries + 12 ShaderMaterials, 3 shell geometries/materials, surface geometry/material, axis-reference group assets. Never removed: ~18 `addEventListener` registrations (2205-2319) plus the MarkdownRuntime body click listener. (`renderer.dispose()` does not free scene-graph resources; the rAF loop is correctly guarded — that part is fine.) Fix: scene traversal dispose + a single `AbortController` for all listeners.

### H4 — Delayed-potential surface computed with hardcoded `fieldSpeed: 6`, contradicting the app's own c_f (verified numerically)

`IdealBraidRuntime.js:1775, 1792` (builder defaults `?? 6` at 448, 563). Everywhere else c_f is binary 2's path speed (≈2.0584; the guide says so explicitly). The solver propagates at 6 — 2.91× faster — so the β_f slider, the wake-regime table, and the self-hit spans use one signal speed while the surface uses another; at c_f=6 the inner binary (2.375) is not super-field for the potential solve while the table calls it "faster". Also `softening: 0.1` at the call sites silently overrides the builders' documented 0.08 default. Fix: pass `fieldSpeed: model.fieldSpeed` (or document 6 as a deliberate display normalization in the guide) and pin with a request-consistency test.

## MEDIUM Findings

- **M1 — Linearized transmitter histories produce large emission-point errors.** `createIdealBraidFlightTimeTransmitterSegment` (687-723) back-extrapolates a tangent line. Measured (inner binary, fieldSpeed 6): emission-point error 0.087/0.341/0.746 world units at distances 1/2/3 (up to 83% of orbit radius). At model c_f the flight arc would be 2.56 rad — qualitatively wrong. Declared only in machine metadata, never user-visible. Subdivide into multiple segments or surface "linearized preview" in the UI.
- **M2 — Self-hit iteration budget cannot meet the declared tolerance; the test pins the truncated value.** `SELF_HIT_SOLVE_ITERATIONS = 28` vs claimed `1e-12` tolerance: 28 bisections of the π/72 bracket leave width 1.63e-10; kernel default (48) converges at iteration 31. The test constant `2.0534765827345125` is exactly the 28-iteration truncated value (converged: 2.053476582744672). The override worsens precision versus doing nothing. Delete it or lower the claimed tolerance to ~1e-9.
- **M3 — `DEFAULT_PATH_SPEED_PRODUCTS` duplicates animator scaffold constants** (`IdealBraidPathPotentialProfile.js:15-25` vs `AnimatorDraftScaffoldRuntime.js:43,58-60`) with no consistency test. Derive or pin.
- **M4 — Probe-point/`samplePotential` is dead but costs a solve column and skews normalization.** Extra `(radius,0,0)` point (1716) adds 6 rows per solve; `state.samplePotential` is written, never displayed; probe included in `surfaceRange` min/max (672-674), affecting surface color normalization. Remove or display.
- **M5 — "Closure" readouts hidden by CSS and tautological.** `ideal-braid.html:429-431` hides the T∥/T⊥/closure rows yet `syncControls` updates them every frame; `closureResidual = tParallel − tPerp` is an algebraic identity (verified ≡ 0 across the β grid) — a closure check that cannot fail. Show and derive independently, or delete.
- **M6 — Per-frame DOM churn.** Every frame: `renderTable` rebuilds `tableBody.innerHTML` (2154-2159); ~20 output writes; pause-button SVG re-parsed via `innerHTML` (`TransportControlIcons.js:40`); the static Lorentz chart redrawn (322 `computeLorentzState` calls/frame). Gate on dirty flags; pre-render the chart.
- **M7 — Surface solver keeps running while the Surface toggle is off** (1993-2020 schedules and rewrites 1200 positions/colors regardless of `state.surfaceVisible`). Skip when hidden.
- **M8 — Dead production API.** `createIdealBraidFlightTimeRunRequest`, `solveFlightTimeWithPrescribedPathAnalysis`, `solveFlightTimeRowWithPrescribedPathAnalysis`, `extractIdealBraidFlightTimeRow` (442-553), scalar `solveCircularSelfHitSpanWithPrescribedPathAnalysis`, `getOrbitPathTintProfileWithPrescribedPathAnalysis`, `formatScientific` — no caller outside tests (repo-wide grep). Delete or mark as intentional public API; tests currently give dead code the appearance of coverage.
- **M9 — Contraction matrix squashes architrino marker spheres into lenses at high β.** `sphereContents.matrix` (2029) contracts children's shapes; at β=0.99 the six point-charge markers render as flattened disks — architrinos are points; only the assembly envelope should flatten. Apply to positions or counter-scale markers.
- **M10 — No boot-path error surface.** `main.js` calls `mountIdealBraid()` bare; any throw yields a blank page — the exact node:crypto failure mode. Wrap in try/catch and inject a visible failure banner.
- **M11 — Terminology: "Retarded" identifiers in the imported package.** `src/prescribed-path-analysis/B1CompleteCycleProbeProtocol.mjs:290,292,511` (`latestRetardedReach`, `conservativeRetardedHistoryMargin`) violate the delayed-only rule. App-scope files are clean.
- **M12 — `markdownContent` never passed to `createMarkdownRuntime`** (1514-1525), so scroll reset and open-focus silently no-op; second document retains prior scroll, keyboard focus never enters the panel. Photon shares the omission — fix pattern-wide.

## LOW Findings

- L1 Phase table (2148-2151) recomputes phase ignoring `motion.phase`, `direction`, and the electrino π offset — correct only for current defaults.
- L2 `#ideal-braid-potential-strip` draws the Lorentz chart, not potentials — leftover name.
- L3 Dead duplicate CSS rule `.ideal-braid-range-row` (html:189-192, overridden at 240-243).
- L4 `#markdown-layout-toggle` permanently `hidden` yet required and wired (shared with photon).
- L5 Column inconsistency: configured docs use `markdownColumns: 1`, link-opened would use 2 — surfaces once H1 is fixed.
- L6 `createIdealBraidRuntimeAnalysisOptions` is an async wrapper returning a constant.
- L7 Clock inconsistency: render loop uses global `performance.now()`, solver uses `getIdealBraidRuntimeNowMs(windowLike)`.
- L8 `preserveDrawingBuffer: true` with no readback anywhere.
- L9 `setPixelRatio` fixed at mount; stale on DPI change.
- L10 Surface pole rings: 48 identical points at each pole → ~576 redundant delayed-potential rows per solve.
- L11 KaTeX/markdown vendor pulled from the iOS bundle path (html:8-12); markdown-it loaded without `defer`.
- L12 `getOrbitPathTintProfile` re-export (286-288) drops the underlying `options` parameter.
- L13 `forceLawVersion: "causal-delay-v1"` schema key — "force" wording at contract level; shared with photon, coordinate a schema-wide rename.
- L14 `canvas.focus()` at mount steals page focus.
- L15 Helper triplication (`clampNumber`/normalizers) across the two app files and the analysis module.

## Checked And Clean

DOM id contract (36/36); Lorentz math (γ, ξ, ledger, T∥≡T⊥, contraction matrix, tilt endpoints); self-hit residual physics (chord condition correct; inner span 1.8266 rad within clamp); out-of-order solver responses (impossible by construction); freeze/pause vs scheduler; `itemIndex` row alignment; home navigation and route contracts; "retarded" absent in app scope; display-name discipline.

## Test-Quality Verdict

Mixed. Pure-math tests are real (γ=1.25 at β=0.6, tilt monotonicity, contraction matrix). Every `*WithPrescribedPathAnalysis` test injects a fake solver and asserts a constant fed into the fake comes back out — useful request-shape pins, zero real math — and the span constant pins the M2 precision defect. Not one test calls the real `runPrescribedPathAnalysisRequest`. Nothing in this file would have caught the node:crypto blanking (mock injection means the real import graph is never load-bearing); the browser-import-graph guard now covers that class. Still unpinned: `mountIdealBraid` (36-id DOM contract, listener wiring, destroy, render loop — zero coverage), the surface-solver scheduler (closure-trapped, untestable — H2 lives exactly there), the markdown link handler (H1), fieldSpeed consistency (H4), and any real self-hit integration value.

## Fix Order

1. H1 — copy photon's `openMarkdownTarget` branch + stub-DOM regression test.
2. H2 — surface the error in `.ideal-braid-status`; unconditional min-interval / backoff; stop swallowing the orbit-profile catch (fold in M7 visibility gate).
3. H4 — `fieldSpeed: model.fieldSpeed` (or document 6 as display normalization) + request-consistency test; resolve softening 0.1-vs-0.08 in the same pass.
4. H3 — full destroy (scene traversal dispose + AbortController).
5. M2 — drop the 28-iteration override; refresh test constant from the real solver; add one non-mocked integration test.
6. M10 + mount smoke test — boot error banner, then `mountIdealBraid` smoke test with stubbed document/window/THREE pinning DOM contract and destroy.
7. Module split (the scheduler bug survived because it is untestable): extract `IdealBraidLorentzMath.js` (~150), `IdealBraidAnalysisAdapters.js` (~450), `IdealBraidOrbitPathVisuals.js` (~600), `IdealBraidSceneAssets.js` (~300), `IdealBraidSurfaceSolverScheduler.js` (~180, injectable clock), `IdealBraidMarkdownDock.js` (~90), leaving the runtime ≈550 lines of mount/state/events/render loop.
8. Sweep M4/M5/M6/M9 and the LOW list opportunistically during the split.

## Resolution — 2026-07-24

The implementation pass addressed the review as follows:

- **H1:** guide links now distinguish runtime markdown targets from repository markdown paths, derive document names from the known-document map or filename, use one-column layout consistently, and pass the scroll/focus container into the shared markdown runtime. A link-navigation regression test covers the real event path.
- **H2:** the surface solver now lives behind a testable scheduler with an unconditional minimum request interval, a one-second failure backoff, visible status output, and console reporting. The orbit-profile solve also reports failures. Surface work stops while the Surface layer is hidden.
- **H3:** all app listeners share one `AbortController`; the markdown-body listener accepts the same signal; `destroy()` cancels the frame, disconnects resize observation, stops the scheduler, traverses the scene to dispose unique geometries/materials, and disposes the renderer. A mount/destroy smoke test pins listener and asset cleanup.
- **H4:** delayed-potential rows use `model.fieldSpeed` and the adapter's documented `0.08` softening. The scheduler request test pins both values.
- **M1–M10 and M12:** the UI labels the tangent-linearized surface as a display-only preview; self-hit requests use 48 iterations and a real analysis integration test converges in 31; field-speed ratios derive from the animator scaffold; the unused probe column and tautological closure rows are gone; per-frame chart/control/table rebuilds are gated or reduced to changed phase cells; hidden surfaces do no work; dead scalar analysis bridges were removed; markers are positioned through the contraction matrix without flattening their sphere geometry; boot failures produce a visible alert; markdown scroll/focus is fixed in Ideal Braid and Photon.
- **L1–L10, L12, L14, and L15:** phase display uses the authored positrino motion, the chart id is accurate, duplicate CSS is removed, the layout control is visible, linked documents use one column, the constant async wrapper is gone, one runtime clock is used, drawing-buffer preservation is disabled, pixel ratio refreshes on resize, pole samples are unique, markdown-it is deferred, option forwarding is preserved, mount no longer steals focus, and shared numeric helpers own normalization.

Three pattern-wide contract/asset items remain intentionally unchanged:

- **M11:** `latestRetardedReach` and `conservativeRetardedHistoryMargin` are shared protocol/result identifiers with test and consumer impact. Renaming them requires an explicit schema migration rather than an app-local edit.
- **L11:** the KaTeX files currently have one repository owner under the reader asset tree and twelve HTML consumers. Moving them requires a coordinated asset-owner migration; this pass only corrected the independent `markdown-it` loading issue.
- **L13:** `forceLawVersion` is a shared solver-app bridge schema field. Repository policy requires a coordinated compatibility decision before renaming that machine contract.

The critical untestable closure was removed by extracting `IdealBraidAnalysisAdapters.js`, `IdealBraidSurfaceSolverScheduler.js`, and `IdealBraidNumeric.js`. Further visual-asset decomposition remains maintenance work, not a blocker for the reviewed behavioral fixes.

Validation: 50 focused Ideal Braid, markdown, import-graph, and standalone-launch tests pass; strict content validation reports 0 errors and 0 warnings; scoped `git diff --check` passes. The full content-integrity command reaches the generated textbook reading-copy check and stops on six ambient drifted reading copies caused by concurrent corpus edits. Per generated-artifact policy, this pass did not run `node scripts/build-textbook-md-pdf.mjs --write`.
