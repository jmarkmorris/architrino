# Causal Delay Feedback Learner Work Queue

This is the canonical intake and execution ledger for learner-facing Causal Delay Feedback changes. The handoff snapshot under the operator's Documents folder is non-canonical.

## Rules

1. Add every new idea as **Queued**; do not rely on chat history as the only record.
2. An agent claims an item by setting it to **In progress** and naming itself.
3. An item is **Verified** only after focused tests plus relevant browser confirmation. A code edit alone does not consume it.
4. An item remains in this file after verification as a short durable decision record.
5. If a new request changes an earlier decision, add a new row referencing the superseded row; do not silently rewrite history.

## Audit Baseline

Live comparison on 2026-07-25 used the current checkout, focused CDF source and test inspection, and `causal-delay-feedback.html?replay=mock` in the browser. `Landed`, `partial`, and `missing` below describe that baseline; none of those labels means Verified. A row marked **Awaiting verification** has implementation and focused-test coverage but still needs the relevant current browser confirmation. Rows are grouped by lifecycle: **Awaiting verification**, **In progress**, **Queued**, **Verified**, **Superseded / merged**, then **Withdrawn / defunct**.

**Next real tests:** none. The operator reports no active CDF work at present.

## Awaiting verification

## In progress

## Queued

## Verified

### CDF-018

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Add Lesson Seven, **Wakes Combine by Superposition**, using three shared-frame paths/bodies: the original lower electrino starts at `t=0`, the positrino/red path starts at 25% of its path, and a second middle electrino/blue path starts at 50%. On Play, all three advance together. Deliberately show only two fading causal arcs, each from an electrino to the positrino; this is a selected subset, not the full six reciprocal directions. At the red positrino, show one white component arrow tracing back along each fading arc toward its emission/transmission origin; declare both contributions attractive in this teaching fixture, with the nearer electrino's contribution visually larger. Show one white net acceleration/vector-sum arrow on the positrino, approximately downward from the two contributions. Add top-left learner copy explaining that the two selected electrino contributions combine into the displayed net acceleration of the positrino, while preserving the display-only teaching-fixture boundary: this visual does not establish a physical force law, measured magnitude, binding, stability, or solved trajectory. Keep individual contributions secondary and omit a data panel. CDF-017 is merged into this row as superseded history, not a separate Lesson Seven implementation.
- **Current evidence or blocker:** **Implementation and current served browser proof landed; Awaiting verification.** Lesson Seven is enabled and highlighted in the live eight-lesson menu between active Lessons Six and Eight. Its single Story runtime declares the lower electrino at `t=0`, red positrino at 25%, and middle electrino at 50%; Play advances all three through the full shared 50% span, ending at 50%/75%/100%. The three visible labels copy Lesson One's treatment: lowercase `electrino`, `positrino`, `electrino`, with the positrino label in full red and both electrino labels in the same lighter blue. The scene draws exactly two standard curved fading electrino-to-positrino causal arcs, two white component arrows back toward their transmission origins, a visibly larger nearer contribution, and an approximately downward white net-acceleration arrow. All three white arrows have the same stroke thickness and ordinary clean triangular arrowheads. Each shaft now ends at its triangle base, fully beneath the filled head, so no round-cap dot or terminal marker reaches the arrow tip. The learner copy states the selected-subset and display-only boundaries, and no data panel is added. Focused Lesson Seven/navigation/runtime coverage passes 200/200; the complete Causal Delay Feedback test set passes 229/229. Fresh current-server desktop and 390×844 endpoint proofs pass their machine-readable scene/menu/geometry/label/shaft-end contracts. The in-app served route selected Lesson Seven and its Last frame control reported path times `0.50,0.75,1.00`, `superpositionAllAdvanceTogether=true`, exactly two arcs/components, clean-triangle arrowheads, `triangle-base-no-terminal-marker` shaft ends, equal `3.2` white-arrow stroke, lowercase labels, and display-only authority. Operator visual acceptance remains pending.
- **Verification protocol:** Hard-refresh `http://127.0.0.1:5173/causal-delay-feedback.html?mode=story&replay=mock`, select **7. Wakes Combine by Superposition**, and confirm it is highlighted between enabled Lessons Six and Eight. Confirm the three colored bodies begin at 0%/25%/50%; their only labels are lowercase `electrino`, `positrino`, `electrino`, with the red/blue treatment matching Lesson One. Inspect all three white arrow tips closely: each shaft must disappear beneath a clean triangular head, with no white dot, terminal marker, or rounded-cap protrusion at the tip. Confirm the nearer component remains longer, all three shafts retain one stroke thickness, and the net-acceleration arrow remains approximately downward. Press Play through completion and confirm the bodies stop at 50%/75%/100% while the clean heads, two-contribution display, and display-only/no-data-panel boundaries remain intact. Repeat once at a narrow phone width and confirm the clean tips remain visible.
- **Source / tests:** `CausalDelayFeedbackSuperpositionMode.js`; `CausalDelayFeedbackStoryMode.js`; `CausalDelayFeedbackModeController.js`; `CausalDelayFeedbackRuntime.js`; `tests/causal-delay-feedback-superposition.test.js`; `tests/causal-delay-feedback-modes.test.js`; `tests/causal-delay-feedback-runtime.test.js`; `scripts/capture-causal-delay-feedback-browser-qa.mjs` (`superposition-lesson-seven-desktop`, `superposition-lesson-seven-phone`); `browser-qa/lesson-seven-superposition-purple-1440x900.png`; `browser-qa/lesson-seven-superposition-purple-390x844.png`; CDF-060; CDF-017; operator verification pending

### CDF-016

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Add Lesson Six, **Wake Strength Decreases as it Expands**, on the shared paired-path frame. Start both architrinos at the 50% position and keep them fixed for the full lesson. During Play, both emit expanding circular wakes continuously at a declared constant rate. Preserve the approved learner copy exactly: `Both architrinos remain fixed. They emit wakes continuously at a constant rate. The emission spreads over the growing spherical wakefront area, 4πR². As radius R grows, the acceleration action on a receiving architrino decreases as 1/R².` End the learner copy after that fourth sentence; do not add or substitute a disclaimer or any further learner copy without operator direction. Do not restore the rejected comparison graphic, formula clutter, or dot/star treatment, and do not generalize the teaching fixture to an unsupported field-amplitude or physical interaction-law claim.
- **Current evidence or blocker:** **Implementation and current served browser proof landed; Awaiting verification.** Lesson Six is enabled and highlighted in the live eight-lesson menu between active Lessons Five and Seven. Its shared paired-path scene samples both bodies at exactly 50% arc-length progress and reuses those same fixed points for every frame. Play advances an equal-interval constant-rate emission sequence from both bodies; every visible wake is a full expanding circle centered on its fixed source point, and every emission carries the same declared amount. The learner-facing title and four-sentence body now match the operator-approved copy byte-for-byte and end after the approved `1/R²` sentence, with no appended disclaimer or explanation. Internal display authority retains the no-field-amplitude/no-physical-law boundary without adding it to learner copy. There is no comparison graphic, on-canvas formula label, or dot/star treatment. Copy-focused Lesson Six/navigation/runtime coverage passes 196/196; the complete current Causal Delay Feedback test set passes 229/229. Fresh current-server desktop and 390×844 proofs compare the rendered title and body for exact equality, select the enabled route, press Play and Pause through the normal controls, confirm advancing wakes with immobile bodies, verify equal emission spacing and geometric dilution, and report clean diagnostics. Fresh served desktop/phone preservation proofs also pass for Lessons Seven and Eight and for the full ordered lesson list. Operator visual acceptance and any further explanatory learner copy remain pending.
- **Verification protocol:** Hard-refresh `http://127.0.0.1:5173/causal-delay-feedback.html?mode=story&replay=mock`, select **6. Wake Strength Decreases as it Expands**, and confirm it is enabled and highlighted between Lessons Five and Seven. Confirm the visible body is exactly `Both architrinos remain fixed. They emit wakes continuously at a constant rate. The emission spreads over the growing spherical wakefront area, 4πR². As radius R grows, the acceleration action on a receiving architrino decreases as 1/R².` and ends there without a disclaimer or other sentence. Confirm both labeled architrinos begin halfway along their existing paths and never move. Press Play and confirm both continuously produce concentric expanding circular wakes at equal intervals. Confirm there is no comparison graphic, separate formula display, or dot/star treatment. Repeat once at a narrow phone width and confirm the chart, copy, eight-lesson menu, and transport remain readable.
- **Source / tests:** `CausalDelayFeedbackInverseSquareMode.js`; `CausalDelayFeedbackStoryMode.js`; `CausalDelayFeedbackModeController.js`; `CausalDelayFeedbackRuntime.js`; `tests/causal-delay-feedback-inverse-square.test.js`; `tests/causal-delay-feedback-modes.test.js`; `tests/causal-delay-feedback-runtime.test.js`; `scripts/capture-causal-delay-feedback-browser-qa.mjs` (`inverse-square-lesson-six-desktop`, `inverse-square-lesson-six-phone`); `browser-qa/lesson-six-inverse-square-spreading-purple-1440x900.png`; `browser-qa/lesson-six-inverse-square-spreading-purple-390x844.png`; CDF-060; operator verification pending

### CDF-022

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Add Lesson Eight, **Continuous Delayed Feedback** (reciprocal causal chain) on the standard paired-path diagram. Begin at `t=0` with both architrinos at the left ends. During Play, only the two active causal arcs move; each freezes permanently as history when it reaches the partner path, then launches the paired return arcs. Repeat for several clear alternating rounds so the learner sees a growing fixed faded crisscross chain. Teach that feedback is continuous but delayed, and state that the drawn arcs are sampled trace points rather than discrete-only physics. Keep all model/display claims scoped.
- **Current evidence or blocker:** **Verified.** The current learner list exposes enabled Lesson Six `Wake Strength Decreases as it Expands`, enabled Lesson Seven `Wakes Combine by Superposition`, then active Lesson Eight `Continuous Delayed Feedback`. The exact approved paragraph is: `This illustration samples how delayed feedback flows back and forth between two architrinos. The underlying interaction is continuous: an arriving wake applies acceleration to its receiver, while every contribution still arrives after a delay.` Lesson Eight uses the same live-series `getWakeFrontProgresses` branch and shared `getWakeFrontSpacing()` mechanism as Lesson Two. Fresh served desktop and narrow proofs cover the denser matched cadence, accumulating fixed history, and only the active pair moving. The operator explicitly verified and closed CDF-022.
- **Source / tests:** `CausalDelayFeedbackStoryMode.js`; `CausalDelayFeedbackModeController.js`; `CausalDelayFeedbackRuntime.js`; `tests/causal-delay-feedback-modes.test.js`; `tests/causal-delay-feedback-runtime.test.js`; `scripts/capture-causal-delay-feedback-browser-qa.mjs` (`continuous-delayed-feedback-desktop`, `continuous-delayed-feedback-phone`); CDF-060; operator acceptance

### CDF-036

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** In Laboratory only, place the exact **Causal Delay Laboratory** title text in the same title position used by Lessons One through Five. Reuse the Story title structure and positioning rules; do not introduce an independent centering concept, optical offset, or different baseline. The panel/lozenge position is already correct; do not move or resize it. Preserve the exact title wording, Arcs/Full controls, chart scale/framing, hidden provider chip, transport, and every Story lesson. Settings scope is removed under CDF-050.
- **Current evidence or blocker:** **Verified.** Laboratory uses the same empty-meta/title structure, `h1` typography, line height, 10px title gap, panel padding, and top alignment as Story, with the prior Laboratory-only `translateY` offset removed. The operator explicitly accepted the final Laboratory title position.
- **Source / tests:** `causal-delay-feedback.html` (`.is-sandbox-mode .causal-toolbar .causal-title strong`); `tests/causal-delay-feedback-runtime.test.js` (`Laboratory header mirrors the Story panel treatment`); served `settings-removed-desktop` and `settings-removed-phone` browser proofs; CDF-050; CDF-064; operator acceptance

### CDF-033

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Align Lesson Four's `Expanded` and `Compressed` labels to the visible wake geometry at every speed and frame. `Expanded` is left-aligned with the outermost trailing/rear wake ring; `Compressed` is right-aligned with the outermost leading/front wake ring. Derive both anchors from actual visible wake extents rather than free caption positions, while preserving readability and preventing initial overlap.
- **Current evidence or blocker:** **Verified.** The operator explicitly accepted the current Lesson Four label placement: the `E` of `Expanded` sits beneath the farthest-left outer edge of the largest wake ring and the `D` of `Compressed` sits beneath the farthest-right outer edge of the largest wake ring.
- **Source / tests:** `CausalDelayFeedbackRuntime.js` (`drawStoryMotionWakeComparison`); `CausalDelayFeedbackStoryMode.js`; focused extent/label geometry tests; operator acceptance

### CDF-044

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Laboratory uses the same standard lesson chart coordinate frame, scale, and template: shared axes, usable spatial and time extent, path presentation, margins, and transforms. Diagnose and remove any Laboratory-only viewport/display-contract shrinkage by consuming the shared chart contract rather than applying a one-off visual enlargement. Require focused geometry-contract coverage plus desktop and phone browser proof.
- **Current evidence or blocker:** **Verified.** Laboratory now uses the shared standard lesson chart coordinate frame, scale, and template, with matched axes, spatial/time extent, path presentation, margins, and transforms. CDF-061 is the implemented evidence and its focused desktop/phone geometry coverage and operator browser acceptance establish this result; CDF-003 remains scoped to lesson-to-lesson parity.
- **Source / tests:** `CausalDelayFeedbackDisplayContract.js`; `CausalDelayFeedbackRuntime.js` (Story/Laboratory viewport and transform selection); focused shared-frame geometry test; desktop/phone browser QA; CDF-061; operator acceptance

### CDF-062

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Protect Stage 0 of the Causal Delay Feedback stabilization plan with one machine-readable five-lesson golden baseline and a real browser transition matrix covering cold load, direct Lesson One through Five entry, One→Two, Two→Three handoff, pointer and keyboard scrub held frames, pause/resume, First/Last, shared pace, desktop and portrait navigation, and Laboratory entry. Exercise normal UI paths only; do not change runtime behavior, learner copy, visual layout, or add lessons.
- **Current evidence or blocker:** **Verified.** The Stage 0 golden baseline and transition-matrix artifacts, runner, and focused baseline test are preserved. The focused CDF suite passes 213/213; current in-app browser checks cover cold load, all five direct entries, both lesson handoffs, pause/resume, First/Last, shared pace, desktop/portrait navigation, Laboratory entry, and clean browser diagnostics. The historical native-range automation limitation (pointer/arrow injection did not drive the native range control and standalone Chromium CDP exited before DevTools) is retained as non-blocking context, not an unresolved status.
- **Source / tests:** `reference/priorities/app-causal-delay-feedback/browser-qa/stage-0-golden-baseline.json`; `reference/priorities/app-causal-delay-feedback/browser-qa/stage-0-transition-matrix.json`; `scripts/run-causal-delay-feedback-stage0-browser-matrix.mjs`; `tests/causal-delay-feedback-stage0-baseline.test.js`; `node --test tests/causal-delay-feedback-*.test.js`; current in-app browser retest; operator acceptance

### CDF-066

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** In Lesson Five only, make every emitted expanding wake circular/isotropic in screen/canvas space on both uphill and downhill path segments. Preserve CDF-008's body/front anchoring, emission-zero/no-inherited-history rules, current shared pace, paths, labels, Laboratory, and every other lesson. Do not alter CDF-020's scope or the paused CDF-065 task.
- **Current evidence or blocker:** **Verified.** The defect was in `getForwardWakeBuildupSphereGeometry`: the old projection combined the body-to-emission vector with an unrotated screen sine axis, producing slope-dependent ellipses. Lesson Five now constructs each closed front from an orthonormal screen-space basis, so every sampled point has the same screen radius while the body remains the leading radial point and no front leads it in that direction. Focused coverage passes the existing seven-fraction CDF-008 contract plus explicit uphill and downhill slope cases; the served `--proof=forward-buildup` browser proof passes with positive and negative path slopes, isotropic radius checks, preserved front anchoring, emission-zero reset, approved copy, current pace, and clean diagnostics. Fresh capture: `browser-qa/forward-buildup-purple-1440x900.png`. No CDF-020 scope, CDF-065, Laboratory, other-lesson, copy, pace, or path changes were made. The operator explicitly verified CDF-066: Lesson Five wakes remain circular regardless of uphill/downhill path direction.
- **Verification protocol:** Hard-refresh `http://127.0.0.1:5173/causal-delay-feedback.html?mode=story&replay=mock`, select **5. Wake Buildup at Field Speed**, confirm the approved title/body and clean emission-zero first frame, then Play and inspect early, middle, and late playback. Confirm both red and blue emitted wakes remain round (not uphill/downhill ellipses), the white current-emission dots stay on the leading radial edge with no ring ahead of either dot, and the result remains unchanged after navigating to Lesson Four and back to Lesson Five. Confirm no console warnings/errors.
- **Source / tests:** `src/apps/causal-delay-feedback/CausalDelayFeedbackRuntime.js` (`getForwardWakeBuildupSphereGeometry`); `tests/causal-delay-feedback-runtime.test.js` (`Lesson Five starts at emission zero...`; `Lesson Five wakefronts stay circular on uphill and downhill path slopes`); `scripts/capture-causal-delay-feedback-browser-qa.mjs` (`forward-buildup`); `browser-qa/forward-buildup-purple-1440x900.png`; CDF-008; operator verification

### CDF-008

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Promote **Forward Wake Buildup** to Lesson Five. Remove its separate mode and “Declared field speed display fixture” supertitle. Use the Lesson One frame, start at the normal path origins at emission zero with no inherited wake history, and grow the first fronts from both emitters. The moving bodies must make the declared field-speed buildup visibly distinct from Lesson One while preserving the shared coordinate template. Do not call it a bow shock.
- **Current evidence or blocker:** **Verified.** After CDF-057 became operator Verified, `node scripts/capture-causal-delay-feedback-browser-qa.mjs --proof=forward-buildup` completed and wrote a fresh 1440×900 capture. The proof checks the approved Lesson Five title/body, emission-zero start, seven playback fractions, closed two-sided fronts for both emitters, upper/lower persistence, emission centering, no front ahead of the white current-emission dot, navigation return reset, and clean browser diagnostics. Focused CDF-008 tests pass, `git diff --check` passes, and no learner copy, runtime behavior, Laboratory, roadmap, CDF-061, or CDF-063 changes were made in this reconciliation. The current served Lesson Five check reports rate `0.800`, duration `28.125000`, finite replay advance `0.035555556`, and no console warnings/errors. The operator explicitly verified CDF-008.
- **Source / tests:** `CausalDelayFeedbackRuntime.js`; `CausalDelayFeedbackStoryMode.js`; `tests/causal-delay-feedback-runtime.test.js`; `scripts/capture-causal-delay-feedback-browser-qa.mjs` (`forward-buildup`); `browser-qa/forward-buildup-purple-1440x900.png`; CDF-052; CDF-057; CDF-059; operator verification

### CDF-050

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Remove the entire learner-facing Settings gear and menu. Remove the learner-facing canvas-color choices, Animation Speed control, and Architrino Speed control with that menu; do not relocate any of them into the shared shell, transport rail, motion/experiment controls, or another learner surface. Preserve the established global Home and Search semantics. Keep CDF-014 as verified historical evidence for the behavior of the menu while it existed. Require focused absence/focus-order/state tests plus desktop and phone browser acceptance before verification.
- **Current evidence or blocker:** **Verified.** The Settings surface/preset state and all learner-facing theme/speed controls are absent. Desktop and phone preflight found no forbidden DOM nodes, visible labels, relocated controls, off-screen controls, or console errors in Lesson One or Laboratory; Home and Search preserve their global semantics. The prior 193/202 suite blocker is resolved: the current complete focused CDF suite passes 211/211. The operator explicitly accepted the desktop and phone browser result: learner-facing Settings controls are absent and global Home/Search still work.
- **Source / tests:** `CausalDelayFeedbackEomReplayAdapter.js`; `tests/causal-delay-feedback-eom-replay-adapter.test.js`; `tests/causal-delay-feedback-runtime.test.js` (`one fixed learner display with no settings surface`); current desktop/phone browser preflight; complete focused CDF suite; operator acceptance; CDF-014; CDF-048; CDF-049

### CDF-060

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Historical CDF-060 acceptance for the disabled future-lesson roadmap, exact muted `— Coming soon` treatment, responsive lesson list, and Laboratory placement. The live sequence is now intentionally superseded by CDF-022's promotion of Continuous Delayed Feedback to Lesson Eight.
- **Current evidence or blocker:** **Verified as historical evidence; superseded for current ordering by CDF-016, CDF-018, and CDF-022.** The accepted CDF-060 snapshot had five working lessons followed by disabled future-lesson previews and Laboratory. That historical disabled-preview treatment remains the accepted boundary for the surface while it existed; current proofs under CDF-016, CDF-018, and CDF-022 own the enabled Lessons Six, Seven, and Eight order and routes.
- **Source / tests:** Historical `CausalDelayFeedbackStoryMode.js`; `CausalDelayFeedbackModeController.js`; `causal-delay-feedback.html`; focused CDF navigation/style tests; CDF-022 superseding evidence; operator acceptance of the historical disabled-preview treatment

### CDF-061

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** In the learner-facing Laboratory only, replace the generic toolbar title **Causal Delay Feedback** with the operator-chosen **Causal Delay Laboratory**. Restore the Laboratory chart/world scale and framing to the established standard chart transform used by Lessons One, Two, Three, and Five; Lesson Four is not a reference. Preserve the Arc and Full wake displays, removed decorative endpoint circles, CDF-063's hidden visible provider ribbon, paths, endpoint editing/hit behavior, transport, and every Story lesson.
- **Current evidence or blocker:** **Verified.** The Laboratory viewport uses the same safe chart bounds and Story design bounds as the standard lessons: at 1440×900 the served Laboratory reports `18,278,1422,810` and scale `0.693611`, matching the standard Story template; at 390×844 it uses the responsive safe window between the expanded lesson list and transport rail (`18,549,372,731`) with positive fitted scale and no toolbar/TOC/rail overlap. Focused frame/title/render-order/ornament-absence/endpoint-interaction coverage passes; the complete focused CDF suite passes 215/215. The operator explicitly accepted the scale/framing result: “we’re good on that.” CDF-057 and Scene Nine were untouched.
- **Source / tests:** `CausalDelayFeedbackRuntime.js` (`createLaboratoryViewport`); `causal-delay-feedback.html` (Laboratory title/status surface and hidden-chip rule); `tests/causal-delay-feedback-runtime.test.js` (`Laboratory matches the Story chart frame at desktop and keeps a safe narrow frame`, plus title/render-order/ornament-absence/endpoint-interaction/status regressions); current served Laboratory desktop and phone screenshots; CDF-037; CDF-041; CDF-047; CDF-063; operator acceptance

### CDF-042

- **Status:** Verified
- **Owner:** Operator decision
- **Request / acceptance:** Withdrawn TOC-label intake: the final Laboratory entry was proposed to display **Lab. Laboratory** without becoming Lesson 6.
- **Current evidence or blocker:** **Verified as a durable non-action decision.** The operator deliberately did not adopt “Lab. Laboratory.” Keep the final TOC entry exactly `Laboratory`; do not change the Laboratory title, route/mode identity, search label, or lesson sequence for this intake.
- **Source / tests:** `CausalDelayFeedbackModeController.js` (`renderTabs`); durable superseded decision record; no implementation or browser QA required

### CDF-063

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** In the learner-facing Laboratory only, remove the top-right replay/provider status ribbon (including “provider unavailable · sample only” and equivalent labels). Preserve internal replay provenance, data attributes, meaningful accessibility text outside the hidden ribbon, the Causal Delay Laboratory title, endpoint cleanup, Arcs/Full, transport, paths, and every Story lesson. Do not alter CDF-061's deferred scale item or status.
- **Current evidence or blocker:** **Verified.** The Laboratory status element remains in the DOM with its text, state, title, and replay provenance, while `.causal-source-chip[hidden] { display: none; }` makes the hidden state genuinely absent visually. Guided Story lessons retain their visible status behavior. Desktop and phone served checks report `hidden=true`, `display:none`, and a zero-sized status rectangle in Laboratory; the Laboratory accessible canvas summary does not claim a visible status label identifies authority. The operator explicitly verified CDF-063.
- **Source / tests:** `causal-delay-feedback.html` (`causal-delay-feedback-replay-status`, `.causal-source-chip[hidden]`); `CausalDelayFeedbackRuntime.js` (`updateReplayStatus`, Laboratory mode transition); `CausalDelayFeedbackModeController.js` (Laboratory summary); `tests/causal-delay-feedback-runtime.test.js` (hidden ribbon/provenance and CSS hidden-state regression); CDF-019 (superseded only for the Laboratory visible-chip presentation); operator acceptance

### CDF-064

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** In the learner-facing Laboratory only, make the header use the common Story top-left panel treatment for typography, spacing, title/control alignment, and responsive sizing. Preserve the exact title **Causal Delay Laboratory**, Arcs/Full controls, CDF-061 chart scale/framing, CDF-063 hidden provider chip, endpoint cleanup/hit behavior, transport, and every Story lesson.
- **Current evidence or blocker:** **Verified.** Laboratory desktop uses the Story panel's 640px width, 12px radius, 16px padding, dark panel surface, 24px/1.12 title treatment, and aligned 34px controls; the ≥1380px top-left offset matches the Story panel. Phone layout uses the same 12px panel treatment, 13px padding, 20px title, and full-width responsive controls. Served screenshots at 1440×900 and 390×844 show the exact title, matched panel/header spacing, Arcs/Full controls, absent provider chip, unchanged chart/transport, and visible roadmap navigation. CDF-061 is separately operator-verified and remains unchanged. The operator explicitly verified CDF-064.
- **Source / tests:** `causal-delay-feedback.html` (`.is-sandbox-mode .causal-toolbar` parity overrides); `tests/causal-delay-feedback-runtime.test.js` (`Laboratory header mirrors the Story panel treatment` plus existing title/status/transport regressions); current served Laboratory desktop and phone screenshots; CDF-061; CDF-063; operator acceptance

### CDF-020

- **Status:** Verified
- **Owner:** Codex
- **Request / acceptance:** Rebuild focused browser QA around the final lesson order at desktop and portrait sizes, including reduced motion, high contrast, transport state, Lesson Two→Three handoff, Lesson Four speed reset, Lesson Five emission-zero start, Laboratory drag, and no retired learner surfaces. Keep CDF-008 visual acceptance and CDF-050 Settings-removal acceptance as separately owned auxiliary proofs rather than CDF-020 prerequisites.
- **Current evidence or blocker:** **Verified by operator.** The CDF-020 ordered-surface assertion matches the accepted live surface of five working lessons, four disabled `Coming soon` roadmap entries, and Laboratory; no lesson or runtime behavior changed. Focused CDF tests pass 195/195 and the capture script passes syntax validation. The current served CDF-020 suite passes all ten proofs at desktop and portrait widths: lesson order, Lesson Two→Three handoff, Lesson Four speed reset, transport, Lesson Five emission-zero boundary, Laboratory path drag, reduced-motion playback, high-contrast rendering, keyboard journey to Laboratory, and retired-surface absence. The normal in-app browser retest covered cold Lesson One, Lesson One→Two via Next, Lesson Two→Three via Next, Lesson Four speed reset, Lesson Five initial/play/pause, Laboratory entry, and a real portrait-width Laboratory path drag; the drag remains a local display-only preview. Operator explicitly verified CDF-020.
- **Source / tests:** `scripts/capture-causal-delay-feedback-browser-qa.mjs`; `tests/causal-delay-feedback-modes.test.js`; `tests/causal-delay-feedback-runtime.test.js`; `tests/transport-control-icons.test.js`; `tests/causal-delay-feedback-stage0-baseline.test.js`; `reference/priorities/app-causal-delay-feedback/browser-qa/` CDF-020 captures; CDF-008; CDF-050; CDF-052; CDF-058

### CDF-057

- **Status:** Verified
- **Owner:** Codex
- **Request / acceptance:** Supersede CDF-056's rejected Lesson Five paragraph while preserving its operator-accepted title **Wake Buildup at Field Speed**. Use the operator's exact replacement: “At field speed, each architrino moves with the advancing edge of the wakes it continually emits. As successive wakes expand, their forward edges stay together at the moving front. The wake builds up there.” Preserve all existing behavior, navigation, provenance boundaries, CDF-008 rendering repair, CDF-052 scrubber repair, and unrelated/new-worktree lesson implementations. Require focused exact-copy and current browser confirmation before returning this row to Awaiting verification.
- **Current evidence or blocker:** **Implemented, focused-tested, current served browser-checked, and operator-verified.** The authored body and accessible canvas summary carry the exact approved replacement byte-for-byte, while the Lesson Five title remains **Wake Buildup at Field Speed**. Focused copy coverage passes 24/24; the Causal Delay Feedback runtime suite passes 160/160, including the Lesson Five wake-front regression. The dedicated served `forward-buildup` browser proof passes with the exact paragraph precondition and existing wake-front checks, and its current 1440×900 capture visibly shows the approved title/body. No runtime, layout, CDF-008 rendering, CDF-052 scrubber, Laboratory, roadmap, or new-lesson behavior was changed for this copy repair. Operator explicitly verified CDF-057.
- **Source / tests:** `CausalDelayFeedbackStoryMode.js`; `CausalDelayFeedbackModeController.js`; `tests/causal-delay-feedback-modes.test.js`; current served Lesson Five browser check; CDF-056; CDF-008; CDF-052

### CDF-056

- **Status:** Verified
- **Owner:** Operator decision + CDF-057 superseding evidence
- **Request / acceptance:** Rename Lesson Five to **Wake Buildup at Field Speed** and explain its displayed idealized model in plain learner language: the architrinos move at field speed and continuously emit wakes; the wakes do not get ahead of them; successive expanding wake fronts meet at the advancing front, where their displayed contributions build into a visibly concentrated front. Do not use “emission zero,” fixture or diagnostic jargon, unsupported physics claims, or any statement that a wake outruns its source. Preserve the lesson ID, causal/evidence boundaries, renderer, behavior, navigation position, provenance, CDF-008 rendering repair, CDF-052 scrubber repair, and new-worktree lesson implementations. Require focused exact-copy/forbidden-language expectations plus current browser confirmation before returning this row to Awaiting verification.
- **Current evidence or blocker:** **Closed as superseded history.** The operator accepted the title **Wake Buildup at Field Speed**, but rejected the original CDF-056 paragraph; that paragraph was not accepted. The replacement wording and operator verification are recorded under CDF-057. Do not present the rejected CDF-056 paragraph for acceptance.
- **Source / tests:** Historical `CausalDelayFeedbackStoryMode.js` and `tests/causal-delay-feedback-modes.test.js`; superseded by operator-verified CDF-057; CDF-008; CDF-052

### CDF-045

- **Status:** Verified
- **Owner:** Operator decision + CDF-052 superseding evidence
- **Request / acceptance:** Follow up on CDF-032 without rewriting its accepted history: use darker purple `#7a36aa` for the bottom scrubber track, retain the existing lighter purple `#8b4fbf` for the thumb, and retain the accepted light outline. Preserve contrast and visible keyboard focus, and keep transport chrome distinct from source/wake colors.
- **Current evidence or blocker:** **Closed as superseded historical work.** The permanent-thumb-border proposal was superseded by operator-verified CDF-052, whose accepted final behavior is a borderless pointer state with a keyboard-only focus ring. The old CDF-045 endpoint is not the final visual behavior and must not be presented as accepted.
- **Source / tests:** `causal-delay-feedback.html` (`causal-timeline-range`); `tests/causal-delay-feedback-runtime.test.js` (`bottom scrubber uses a dedicated purple transport theme`); superseded by CDF-052; operator acceptance

### CDF-011

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Repeated Laboratory interior drags keep both fixed endpoints unchanged and keep the editable path on screen. Add a regression that exercises repeated drags, not only one drag.
- **Current evidence or blocker:** **Verified.** Existing focused endpoint-immobility and path-drag coverage is preserved. The operator explicitly confirmed that repeated Laboratory interior drags preserve both fixed endpoints and keep the editable path on screen.
- **Source / tests:** `CausalDelayFeedbackRuntime.js` (`deformPathAroundPathTime`); `tests/causal-delay-feedback-runtime.test.js` (`path line drag keeps path endpoints fixed`); operator acceptance

### CDF-021

- **Status:** Verified
- **Owner:** Operator browser review + focused tests
- **Request / acceptance:** Preserve public teaching launch readiness: the standalone route and apps-page exposure remain live, the complete lesson flow is navigable and understandable without operator explanation, and Laboratory remains simple enough for younger learners.
- **Current evidence or blocker:** **Verified.** The operator explicitly accepted the current public teaching launch readiness, including standalone route/apps exposure, a navigable lesson flow, and a sufficiently simple Laboratory. Historical route, app-exposure, lesson-flow, and Laboratory evidence remains the boundary for this acceptance.
- **Source / tests:** `causal-delay-feedback.html`; `src/apps/navigator/StandaloneAppLaunchRuntime.js`; `priorities.md`; final focused tests and browser QA; operator acceptance

### CDF-035

- **Status:** Verified
- **Owner:** Operator decision + CDF-037/CDF-064 superseding evidence
- **Request / acceptance:** Review the Laboratory header/control row where **Causal Delay Feedback** appears beside **Arcs**, **Full**, and Settings. Define the heading's role and its relationship to lesson/Laboratory framing, then present any proposed title change for explicit operator approval. Do not choose or implement a new title without that approval.
- **Current evidence or blocker:** **Verified as validated/superseded history.** The header/control-row review led to the accepted shorter Laboratory title under CDF-037 and the accepted common Story header parity under CDF-064. Do not restore the old generic **Causal Delay Feedback** wording or prior Settings control assumptions.
- **Source / tests:** `causal-delay-feedback.html` (`causal-toolbar`, `causal-title`, `causal-switch-row`); lesson/Laboratory framing in `CausalDelayFeedbackModeController.js`; CDF-037; CDF-064; operator acceptance

### CDF-037

- **Status:** Verified
- **Owner:** Operator decision
- **Request / acceptance:** In Laboratory, change the header label from **Causal Delay Feedback** to **Causal Delay Feedback Laboratory**. Preserve the shared header geometry and its relationship to the neighboring controls.
- **Current evidence or blocker:** **Verified as the accepted title decision.** The operator selected the shorter final Laboratory title **Causal Delay Laboratory** and explicitly rejected restoring the longer wording. CDF-061 is the implemented superseding surface and retains the title/evidence.
- **Source / tests:** Historical `causal-delay-feedback.html` (`causal-title`, `causal-toolbar`); CDF-035; superseded by CDF-061; operator acceptance

### CDF-059

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Recover the prior shared Story presentation pace without using any currently rendered lesson as the reference and without treating the change as modeled velocity. Trace the intended clock from source history and focused tests, make pacing independent of causal-root availability and navigation history, and preserve Lesson Five's accepted title/body, CDF-008 wake geometry, and CDF-052 scrubber behavior. Require finite expected rate metadata and effective one-second replay advancement for fresh direct entry into at least Lessons One, Two, Four, and Five plus a controlled current served-app comparison.
- **Current evidence or blocker:** **Verified.** Commit `f769a3ac7` established the single `0.8` Story presentation-rate control, a 28.125-second shared-path traversal, and scene durations derived from that clock. Fresh Lesson One synchronization can legitimately leave no causal roots at time zero, but `createStoryScene` returned early in that state without duration/rate metadata; runtime then silently used its 3.2-second fallback. The same defect made other direct-entry lessons depend on whether an earlier lesson had repopulated roots. Story timing is now composed independently of interaction availability, and the canvas exposes duration and replay-advance metadata. A focused exact-one-second regression covers fresh direct entry into Lessons One, Two, Four, and Five. Fresh served-app loads report rate `0.800`, durations `28.125000`, `8.997566`, `7.500000`, and `28.125000`, and finite declared advances `0.035555556`, `0.035555556`, `0.080000000`, and `0.035555556`, respectively. Lesson Five's accepted title/body is byte-for-byte unchanged, browser diagnostics are clean, the complete focused CDF suite passes 211/211, and `git diff --check` passes. After hard refresh, the operator explicitly accepted the restored calm shared pace in Lessons One, Two, Four, and Five, with no rapid fallback or disproportionate lesson speed remaining.
- **Source / tests:** `CausalDelayFeedbackStoryMode.js` (`createStoryScene`, historical `STORY_WAKE_DISPLAY_RATE_SCALE`); `CausalDelayFeedbackRuntime.js` (`render`, `tick`, `drawStoryScene`); `tests/causal-delay-feedback-runtime.test.js` (`fresh Story navigation preserves the prior shared playback clock`); current fresh-load served Story comparison; operator acceptance; CDF-008; CDF-052; CDF-057; CDF-058

### CDF-052

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Supersede only CDF-045's permanent thumb-border treatment: keep the bottom scrubber's simple lighter-purple thumb against its darker-purple track, but remove the permanent white/light border or ring because it obscures that color distinction. Preserve an accessibility outline/ring only while the scrubber has visible keyboard focus; it must not appear permanently. Require fresh-load synchronization plus focused default-versus-focus styling, color-role, contrast, pointer-drag, keyboard-value, replay-time, scene-redraw, and immediate two-source early-wake coverage before operator browser review.
- **Current evidence or blocker:** **Verified.** The held Lesson One scene derived sampled circular wakes only from reciprocal-root interactions. Immediately after the synchronized zero frame there were no roots; the positrino root then became available before the electrino root, so both bodies moved while circles appeared late and source-asymmetrically. Lesson One's sampled history now supplements each missing transmitter from the shared path start with the same normalized wake scale and cadence. Exact zero still has zero positive-radius circles. At replay time `0.001000`, the served app has two positive-radius circles from two sources while both body positions update; at `0.010000`, both sources remain present and the visible screenshot confirms one early circle around each body. The focused fresh-load, pointer-drag, early-wake, keyboard, and focus checks pass 6/6; runtime plus shared transport passes 166/166, and `git diff --check` passes. The operator explicitly accepted the browser behavior: Lesson One begins clean at zero; an immediate early scrub shows visible potential/wake spheres from both bodies and leaves pale history dots with no source lag.
- **Source / tests:** `CausalDelayFeedbackStoryMode.js` (`createStorySampledWakeFronts` missing-source supplement); `CausalDelayFeedbackRuntime.js` (`storyWakeSourceCount` browser proof); `tests/causal-delay-feedback-runtime.test.js` (`Lesson One early pointer scrub immediately draws circular wakes from both sources` plus prior CDF-052 coverage); `causal-delay-feedback.html` (accepted default/focus thumb treatment); current served-app early-scrub proof; operator acceptance; CDF-045

### CDF-058

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Repair the major Lesson Two runtime regression reported during CDF-020 browser review: entering Lesson Two from the fresh Lesson One frame must show both reciprocal arcs immediately and play at the established lesson pacing. Do not alter other lessons or the CDF-008/CDF-052 repairs. Require focused navigation/reset coverage plus current served-app confirmation before operator acceptance.
- **Current evidence or blocker:** **Verified.** Lesson Two was creating its scene from Lesson One's newly synchronized receiver time `0`; because no reciprocal roots exist there, `createStoryScene` returned its rootless fallback with no arcs, no declared display-rate metadata (`NaN` in the canvas dataset), and default fallback pacing. Lesson Two reset now refreshes at its established two-to-three handoff state before deriving the canonical earliest reciprocal-arc frame. Focused regression confirms the fresh Lesson One → Lesson Two path starts above zero with two arcs, finite `0.8` rate metadata, and a duration longer than the fallback `3.2` seconds. The served-app preflight showed first frame `0.180087`, both arcs visibly present, and one wall-clock second advancing replay by `0.045984`; the operator explicitly validated the focused Lesson Two browser repair.
- **Source / tests:** `CausalDelayFeedbackRuntime.js` (`resetStoryScenarioPlayback`); `tests/causal-delay-feedback-runtime.test.js` (`navigating from fresh Lesson One gives Lesson Two both arcs and normal pacing`); current `causal-delay-feedback.html?replay=mock` served-app check; operator acceptance; CDF-020; CDF-052

### CDF-055

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Supersede only CDF-004's stale Lesson One color wording: describe the solid dot on each body as the current emission point without naming its color. Preserve the transmission-rate, wake-history, spherical-wake projection, and larger-radius teaching meaning. Do not alter CDF-008 or CDF-052. Require focused exact-copy/color-absence coverage plus current browser confirmation before returning this row to Awaiting verification.
- **Current evidence or blocker:** **Verified.** Lesson One says, “The solid dot on each body marks its current emission point.” Its exact-copy regression preserves the complete teaching paragraph and rejects white, pink, blue, red, or generic color wording. The current served Lesson One rendered the neutral sentence in the visible information panel with no color claim and no browser warnings/errors. The operator explicitly approved the neutral solid-dot/current-emission sentence.
- **Source / tests:** `CausalDelayFeedbackStoryMode.js`; `tests/causal-delay-feedback-modes.test.js` (`Story reads both reciprocal roots selected by the shared learner state`); current served Lesson One browser check; operator acceptance; CDF-004; CDF-008; CDF-052

### CDF-051

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Supersede only the top-right TOC action from CDF-001/CDF-024: it navigates to the canonical website/textbook Table of Contents route, analogous to Home navigating to the site root. The local CDF lesson list remains permanently visible in every CDF scene as independent app content for direct lesson jumps; neither global TOC nor global Search may hide/toggle it. Keep lesson back/forward in the shared strip. Reflow temporary global Search content so it does not cover the persistent lesson list.
- **Current evidence or blocker:** **Verified.** Canonical `--ui-label-*` tokens align global Search results and the persistent CDF lesson list. Focused route/persistence coverage remains green. The operator accepted global TOC at desktop and phone widths, verified that returning to CDF preserves the visible local lesson list, and confirmed Search does not cover it.
- **Source / tests:** `ui-tokens.css`; `style.css` (`.scene-search-item`); `causal-delay-feedback.html` (`.causal-app-icon-strip .scene-search-item`, `.causal-mode-tab`); `SceneSearchRuntime.js`; `StandaloneAppSceneSearchRuntime.js`; `CausalDelayFeedbackModeController.js`; `tests/standalone-app-launch.test.js`; `tests/causal-delay-feedback-modes.test.js` (`shared top-right shell keeps Search and the local lesson list persistent`); operator browser acceptance; CDF-001; CDF-024

### CDF-054

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Make the CDF global Table of Contents lozenge use the exact canonical site-shell control contract: same styling, typography, dimensions, focus/active behavior, and icon/text treatment as the homepage TOC. Eliminate the copied app-local selector/rules so later shell changes cannot drift CDF apart. Preserve CDF-024/CDF-051 navigation semantics and the persistent local lesson list.
- **Current evidence or blocker:** **Verified.** The app-local `.causal-toc-toggle` ruleset and class were removed, leaving the shared `#textbook-toc-button` control contract. Focused coverage remains green, and the operator approved CDF’s TOC lozenge after desktop and phone comparison with the homepage.
- **Source / tests:** `causal-delay-feedback.html`; `style.css` (`#textbook-toc-button`); `tests/causal-delay-feedback-modes.test.js`; operator browser acceptance; CDF-024; CDF-051

### CDF-053

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Keep the lesson information panel learner-only: remove the `Lesson n of N` metadata and all replay/provider/fixture/display-authority text from every guided lesson header. The persistent right-side lesson list remains the sole sequence/navigation indicator. Preserve non-learner diagnostic/provenance behavior outside the teaching header.
- **Current evidence or blocker:** **Verified.** Story rendering leaves its metadata field empty, and focused coverage pins that omission. The operator verified that lesson headers show only title and teaching text—with no lesson count, provider, fixture, or replay wording—and that the persistent right-side lesson list remains visible.
- **Source / tests:** `src/apps/causal-delay-feedback/CausalDelayFeedbackModeController.js`; `tests/causal-delay-feedback-modes.test.js` (`guided lesson header leaves sequence and replay provenance out of learner copy`); operator browser acceptance; CDF-001

### CDF-019

- **Status:** Verified
- **Owner:** Codex focused CDF tests + browser audit
- **Request / acceptance:** Keep the teaching/model/evidence boundary explicit across every lesson and Laboratory state. Representative replay, EOM record replay, declared display fixtures, local drag previews, and unavailable providers must remain visibly and semantically distinct; display parity is not physics acceptance.
- **Current evidence or blocker:** **Verified for the current five Lessons and Laboratory.** One shared display-authority contract now distinguishes representative teaching replay, recorded EOM path display, generic recorded replay, declared Story fixtures, local drag preview, and unavailable/loading providers. Every current Lesson exposes the boundary and replay status in its uncluttered accessible canvas summary, while Laboratory keeps a visible live authority chip; canvas datasets carry `display-only`, `physicsAcceptance=false`, and `displayParityEstablishesPhysicsAcceptance=false`. Recorded source provenance remains separate from viewer authority. The full focused CDF suite passes 202/202. Browser audit at desktop and 390×844 confirmed representative, unavailable-provider, and local-drag labels remain clear and distinct, including a phone-fit correction to the compact unavailable-provider label. Lessons Six through Eight remain separately queued and must consume this shared contract when implemented.
- **Source / tests:** `CausalDelayFeedbackCausalHistory.js`; `CausalDelayFeedbackReplayAdapter.js`; `CausalDelayFeedbackEomReplayAdapter.js`; `CausalDelayFeedbackStoryMode.js`; `CausalDelayFeedbackModeController.js`; `CausalDelayFeedbackRuntime.js`; `causal-delay-feedback.html`; focused CDF tests; current desktop/phone browser audit

### CDF-003

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Every lesson that uses the paired positrino/electrino paths uses the exact Lesson One coordinate template: axes, margins, path origins, stroke width, body size, and label placement.
- **Current evidence or blocker:** **Verified for shared lesson chart-template parity.** Focused tests pin the shared Story chart viewport and display-contract geometry through Lesson Five. The operator played Lessons One and Five to completion and confirmed that their axes and paths remained fixed throughout, reporting that the result looked perfect. This acceptance is limited to shared chart-template parity: it does not accept CDF-008's separate Lesson Five wake-front/body relationship, and CDF-044's Laboratory frame/scale obligation remains open.
- **Source / tests:** `CausalDelayFeedbackDisplayContract.js`; `CausalDelayFeedbackRuntime.js`; `tests/causal-delay-feedback-runtime.test.js` (`Story graph viewport`, `all Story steps use one desktop chart template`); operator Lesson One/Five playback acceptance; CDF-008; CDF-044

### CDF-024

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Treat the entire top-right strip as the shared web-app shell in this order: Table of Contents, lesson back, lesson forward, Home, Search. Lesson back/forward remain lesson-sequence navigation. Home targets the actual site homepage, Search retains canonical global behavior, and all icons remain persistent in the standard layout. The TOC semantic boundary is superseded by CDF-051: it navigates to the canonical website/textbook TOC. The separate local CDF lesson list remains permanently visible independent app content for direct lesson jumps.
- **Current evidence or blocker:** **Verified after TOC repair and operator recheck.** Home reaches the site homepage and Search reaches global Search. An earlier browser check found that TOC toggled/hid the local lesson list rather than navigating globally. After repair, the operator confirmed that TOC reaches the textbook and, after returning to CDF, the persistent lesson list remains visible. Focused shell, route, and persistence coverage was already present.
- **Source / tests:** `causal-delay-feedback.html`; `style.css`; `SceneSearchRuntime.js`; `StandaloneAppSceneSearchRuntime.js`; `StandaloneAppHomeRuntime.js`; `CausalDelayFeedbackModeController.js`; `CausalDelayFeedbackRuntime.js`; `tests/standalone-app-launch.test.js`; `tests/causal-delay-feedback-modes.test.js`; CDF-051; operator Home/Search/TOC/list-persistence acceptance

### CDF-023

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Trial source-colored path transmission-history markers: pale pink on the positrino path and pale blue on the electrino path, each matching the initial color of that source's fading arc. Keep the markers subtle and preserve path visibility. Compare the trial against the current neutral white-dot baseline before recommending adoption; do not silently replace the baseline.
- **Current evidence or blocker:** **Verified.** Transmission-history markers now transition from the neutral-white baseline to pale pink for positrino history and pale blue for electrino history, using the same source colors as the initial fading arcs. Focused coverage pins both source colors and the neutral current-emission marker. Operator browser review accepted the comparison as intended. CDF-012 current-emission source semantics and CDF-041 endpoint markers remain distinct and unchanged.
- **Source / tests:** `CausalDelayFeedbackRuntime.js` (`drawTransmissionPointMarker`, `getTransmissionHistoryMarkerColor`, and transmission-history call sites); `CausalDelayFeedbackDisplayContract.js` source/wake colors; `tests/causal-delay-feedback-runtime.test.js` (`transmission-history dots use pale source colors while current-emission dots stay neutral`); operator browser acceptance

### CDF-032

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Restyle the bottom scrubber to the app's purple control theme. Use a normal purple active/middle track variation and either a purple-edged or solid-purple thumb, choosing the cleaner accessible treatment. Preserve clear contrast and focus visibility; exclude red, blue, and pink so transport chrome stays semantically distinct from source/wake colors.
- **Current evidence or blocker:** **Verified.** The bottom scrubber uses a dedicated purple midpoint track and solid-purple thumb, both with a clean light edge, plus a high-contrast lavender focus outline. Focused coverage pins both browser-engine selectors and excludes source/wake accent colors. Operator browser review accepted the purple line, thumb, and light/white border treatment.
- **Source / tests:** `causal-delay-feedback.html` (`causal-timeline-range`); `tests/causal-delay-feedback-runtime.test.js` (`bottom scrubber uses a dedicated purple transport theme`); operator browser acceptance

### CDF-012

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** The Laboratory solid white current-emission dot and its fading wake arc use the same freshly calculated emission-point state. After a path drag, their origins remain coincident.
- **Current evidence or blocker:** **Verified.** Laboratory evaluates one live-wake frame per render and passes that same array to wake arcs, foreground emission lines, and current-emission dots. The focused after-drag regression proves strict source-object identity. Operator browser review confirmed that the live emission/current dots move correctly with edited paths and that no stale dots remain.
- **Source / tests:** `CausalDelayFeedbackRuntime.js` (`render`, `drawSandboxTransmissionGhost`, `drawWakes`, `getVisibleWakeSeries`); `tests/causal-delay-feedback-runtime.test.js` (`exact live wake sources after path drag`); `scripts/capture-causal-delay-feedback-browser-qa.mjs` (`laboratory-emission-origin-coincidence`); `browser-qa/laboratory-emission-origin-coincidence-purple-1440x900.png`; operator browser acceptance

### CDF-010

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Laboratory editable paths have real C1 tangent continuity in their evaluated geometry and user-visible rendering after interior drags. Preserve permissible spatial looping, but enforce strictly monotone progression along the displayed time axis with no local reversal or future-path time fold. Hard backward drags near either fixed start must remain endpoint-adjacent C1. Browser regressions must cover a near-start backward drag and an aggressive interior drag.
- **Current evidence or blocker:** **Verified.** Endpoint-tapered deformation plus monotone-cubic displayed-time geometry removes endpoint-adjacent and aggressive-drag tangent failures while retaining permissible spatial loops/crossings. Focused regressions cover hard backward drags near both fixed starts and an aggressive interior drag, pinning C1 continuity and strictly increasing displayed time. Operator browser review confirmed no jagged tangent kinks, accepted spatial looping/crossing, confirmed displayed time cannot be dragged backward, and confirmed playback retains trails around a loop and stops at the end.
- **Source / tests:** `CausalDelayFeedbackTimedPath.js`; `CausalDelayFeedbackRuntime.js` (`deformPathAroundPathTime`, `drawC1TimedPath`); `tests/causal-delay-feedback-runtime.test.js` (`near-start backward drags`, `aggressive interior drag`); `scripts/capture-causal-delay-feedback-browser-qa.mjs`; operator browser acceptance

### CDF-004

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Lesson One is titled **Meet the Electrino and Positrino Transceivers**, keeps the simple default-speed introduction with no speed choices, and includes: “Wakes emitted earlier have had longer to expand, so they have a larger radius.” The solid white current-emission marker appears on both active bodies and remains distinct from wake history.
- **Current evidence or blocker:** **Verified.** Focused copy/render tests pin the exact Lesson One title, required larger-radius sentence, absence of a Lesson One speed selector, and distinct active current-emission markers. Operator browser review confirmed the title is correct, no speed selector is present, and the required “larger radius” copy is visible.
- **Source / tests:** `CausalDelayFeedbackStoryMode.js`; `CausalDelayFeedbackRuntime.js`; `tests/causal-delay-feedback-modes.test.js`; `tests/causal-delay-feedback-runtime.test.js` (`Story 1`, `transmission-point markers`); operator browser acceptance

### CDF-015

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Remove the Laboratory lower-left diagnostic data lozenge and redundant “Positrino above / Electrino below” legend. Keep direct on-path labels.
- **Current evidence or blocker:** **Verified.** Focused tests pin the absence of the learner-facing diagnostic lozenge and redundant polarity legend while retaining direct path labels. Operator browser review confirmed that both the lower-left data box and “Positrino above / Electrino below” legend are absent and the direct labels remain.
- **Source / tests:** `causal-delay-feedback.html`; `CausalDelayFeedbackRuntime.js`; `tests/causal-delay-feedback-runtime.test.js` (`Laboratory omits the redundant polarity legend and readout lozenge`); operator browser acceptance

### CDF-026

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Remove the learner-visible numeric replay-time readout from the bottom rail without leaving an empty spacer. Preserve the scrubber's internal state and expose the current replay time through the slider's accessible value text.
- **Current evidence or blocker:** **Verified.** Focused tests pin removal of the output node/grid column and retain replay time through the slider's accessible value text. Operator browser review confirmed there is no visible replay-time readout, no leftover blank gap, and the scrubber continues to work.
- **Source / tests:** `causal-delay-feedback.html`; `CausalDelayFeedbackRuntime.js` (`updateNowControl`); `tests/causal-delay-feedback-runtime.test.js`; operator browser acceptance

### CDF-031

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Laboratory playback is non-looping. Reaching the final frame stops playback and holds the final state; it must not wrap to the beginning automatically. Play and First Frame remain the explicit ways to continue or return. Browser acceptance must confirm a final-frame hold beyond the prior loop boundary and explicit recovery with First Frame/Play.
- **Current evidence or blocker:** **Verified.** Focused tests pin terminal clamping, stopped playback, and explicit recovery. Operator browser review confirmed that Laboratory reaches and holds its end without auto-looping and that First Frame returns to its beginning.
- **Source / tests:** `CausalDelayFeedbackRuntime.js` (`tick`, `getReplayTimeForElapsedSeconds`, `setPlaying`); `tests/causal-delay-feedback-runtime.test.js`; operator browser acceptance

### CDF-030

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Give Laboratory one stable useful early entry/reset state with bodies and causal-delay paths/wakes already visible. Entering from any lesson or after refresh must use that same Laboratory-owned state rather than inherit an arbitrary story/scrub cursor; First Frame returns to it. Preserve explicit user scrubbing while the learner remains in Laboratory. The final initial-state time is governed by CDF-040's evaluator-derived reciprocal-visible boundary, not a literal fixed percentage.
- **Current evidence or blocker:** **Verified.** Focused tests pin Laboratory-owned entry/reset state and retained in-Laboratory scrubbing. CDF-040 subsequently replaced the provisional fixed fraction with the deterministic earliest time at which both directed reciprocal arcs have visible on-canvas geometry. Operator browser review confirmed that entering Laboratory from lessons or scrubbed positions and using First Frame always returns to that same stable early Laboratory state without inheriting the prior position.
- **Source / tests:** `CausalDelayFeedbackModeController.js`; `CausalDelayFeedbackRuntime.js` (`handleLearnerModeChange`, `resetLaboratoryScenarioPlayback`, `getLaboratoryInitialReplayState`); `tests/causal-delay-feedback-runtime.test.js` (`earliest reciprocal-visible state`); CDF-040; operator browser acceptance

### CDF-029

- **Status:** Verified
- **Owner:** Operator decision + CDF-040 superseding evidence
- **Request / acceptance:** Original Laboratory entry/reset intake: start at literal `t=0` with no inherited story cursor.
- **Current evidence or blocker:** **Verified as superseded historical work.** The literal `t=0` Laboratory-reset intake was not adopted as current behavior. CDF-040 superseded it with the evaluator-derived earliest reciprocal-visible entry rule; do not imply that literal `t=0` is the current reset state.
- **Source / tests:** `CausalDelayFeedbackModeController.js`; `CausalDelayFeedbackRuntime.js`; superseded by CDF-030 and evaluator-derived CDF-040; operator acceptance

### CDF-040

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Laboratory fresh entry and First Frame use one deterministic earliest replay time at which both directed reciprocal fading arcs have valid visible on-canvas geometry. Derive it from the live evaluator and display geometry as the later of the two directed first-visibility times; do not retain a hard-coded fraction that shows only one direction. Preserve CDF-030 as historical evidence and do not alter paths unless evaluation proves no valid common entry exists.
- **Current evidence or blocker:** **Verified.** The live evaluator/display search finds positrino-to-electrino first visibility near `t=0.1537` and electrino-to-positrino near `t=0.1806`, then deterministically selects the later time for fresh Laboratory entry and First Frame without changing the paths. Focused tests and the 1440×900 proof pin valid sampled on-canvas geometry for both directions. Operator browser review confirmed that after refresh, opening Laboratory with Arcs enabled shows both reciprocal fading arcs before Play.
- **Source / tests:** `CausalDelayFeedbackRuntime.js` (`getLaboratoryInitialReplayState`, `findFirstVisibleLaboratoryWakeTime`, `hasVisibleLaboratoryWakeArcGeometry`); `tests/causal-delay-feedback-runtime.test.js` (`earliest reciprocal-visible state`); `scripts/capture-causal-delay-feedback-browser-qa.mjs` (`laboratory-reciprocal-entry`); `browser-qa/laboratory-reciprocal-entry-purple-1440x900.png`; operator browser acceptance

### CDF-046

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF evidence
- **Request / acceptance:** At the deterministic reciprocal-visible Laboratory entry and Laboratory First Frame, evaluate each current body and each earlier emission origin from the same replay state. The current positrino and electrino bodies must be visibly forward along their paths relative to the transmission origins of the reciprocal arcs; neither body may falsely read as the path's fixed start/endpoint marker. Diagnose whether replay-time rendering or marker semantics cause the mismatch, preserve the CDF-040 both-arc rule, and do not alter endpoint-marker styling or behavior without separate operator review. Require focused body/origin state-consistency tests and a browser frame showing both reciprocal arcs with correct current positions.
- **Current evidence or blocker:** **Verified.** Preserved the reciprocal-visible Laboratory entry and body-versus-emission-origin evidence: the current positrino and electrino bodies are evaluated alongside earlier reciprocal emission origins, remain visibly forward along their paths, and are not treated as fixed start/endpoint markers. CDF-040's both-arc rule and endpoint-marker boundaries remain intact.
- **Source / tests:** `CausalDelayFeedbackRuntime.js` (Laboratory replay state, live body markers, wake emission origins, endpoint handles); `CausalDelayFeedbackCausalHistory.js`; CDF-040 initial-state evaluator; focused reciprocal body/origin regression; desktop browser proof; operator acceptance

### CDF-047

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF evidence
- **Request / acceptance:** Supersede CDF-041: remove all decorative fixed path-endpoint circles/handles from normal Laboratory learner rendering; do not replace them with colored dots. Preserve current-emission and transmission-history markers. Retain endpoint manipulation only if the Laboratory interaction model needs it and it can be exposed as a non-decorative, unambiguous edit affordance rather than a persistent marker. Inspect and test endpoint hit, hover/focus/selection, drag, and discoverability behavior before implementation.
- **Current evidence or blocker:** **Verified.** The accepted normal-render ornament removal is implemented under CDF-061: the four persistent white circles and their renderer are gone, while `getPathEndpointHandles`, enlarged endpoint hit targets, and endpoint drag behavior remain unchanged. CDF-061 explicitly preserves path manipulation; the broader interaction-affordance boundary remains documented for any future decision to replace invisible endpoint hit zones with a discoverable non-decorative edit affordance. Do not restore persistent endpoint circles.
- **Source / tests:** `CausalDelayFeedbackRuntime.js` (`render`, `getPathEndpointHandles`, `findNearestPathEndpointHit`, endpoint drag flow); focused normal-render absence and endpoint hit/drag tests; CDF-041; CDF-061; future interaction-affordance decision; operator acceptance

### CDF-002

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Remove learner-facing Path History, Routes/Roots, and Branch Lab from normal navigation while retaining useful diagnostic code dormant. Do not create duplicate routes, runtimes, state stores, or evaluators.
- **Current evidence or blocker:** **Verified.** Focused tests pin the ordered learner sequence and keep retired diagnostics behind the same runtime/state/evaluator. Operator browser review confirmed that learner navigation contains only Lessons and Laboratory, with no Path History, Routes/Roots, or Branch Lab destination.
- **Source / tests:** `CausalDelayFeedbackModes.js`; `CausalDelayFeedbackModeController.js`; `CausalDelayFeedbackRuntime.js`; `tests/causal-delay-feedback-modes.test.js` (`retired learner surfaces`, `no separate Roots route`); operator browser acceptance

### CDF-014

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** The Laboratory settings popover stays open after option changes until explicit dismiss or click outside.
- **Current evidence or blocker:** **Verified before the Settings surface was removed.** The focused interaction regression passed with retained open/expanded state through inside `pointerdown`, canvas-color selection, and reset, while proving true outside/button dismissal. Operator browser review then accepted Purple → White → Taupe → Black with Settings remaining open. CDF-050 later removed the complete Settings surface and its obsolete interaction regression; the current focused absence test now protects that superseding state without erasing this verified history.
- **Source / tests:** Historical `CausalDelayFeedbackRuntime.js` settings handlers and focused interaction regression; current `tests/causal-delay-feedback-runtime.test.js` (`one fixed learner display with no settings surface`); CDF-050; operator browser acceptance

### CDF-001

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Replace the old top-right Story / Path History / Roots / Forward Buildup / Sandbox lozenges with a scalable ordered, directly clickable table of contents. Show `Lesson n of N` beside each title; Laboratory is the final entry. Back and Next follow the same order.
- **Current evidence or blocker:** **Verified.** Focused tests cover the ordered lesson sequence and retired destinations. Operator browser review accepted nonsequential Lesson Two/Three jumps and confirmed that each jump updates the correct top-left copy and scene.
- **Source / tests:** `causal-delay-feedback.html`; `CausalDelayFeedbackModeController.js`; `CausalDelayFeedbackModes.js`; `tests/causal-delay-feedback-modes.test.js`

### CDF-005

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Lesson Two ends at the same state where Lesson Three starts: the 50% time-axis state. Lesson Three advances from there to 80%.
- **Current evidence or blocker:** **Verified.** Shared constants and focused tests pin the 50%→80% handoff; operator browser review accepted Lesson Two's stop, Lesson Three's identical start, and its advance to 80%.
- **Source / tests:** `CausalDelayFeedbackStoryMode.js`; `tests/causal-delay-feedback-modes.test.js`; `tests/causal-delay-feedback-runtime.test.js`

### CDF-006

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Lesson Three contains the reciprocal-relationship explanation and omits implementation caveats such as progress-alignment narration.
- **Current evidence or blocker:** **Verified.** Focused tests pin the learner-facing Lesson Three copy. Operator browser review confirmed the progress-alignment caveat is absent and accepted the reciprocal explanation as jointly carried—without redundant prose—by the title, Relationship One/Two block, and graph.
- **Source / tests:** `CausalDelayFeedbackStoryMode.js`; `CausalDelayFeedbackModeController.js`; `tests/causal-delay-feedback-modes.test.js`; operator browser acceptance

### CDF-007

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Lesson Four teaches wake shape changing with speed. Changing speed returns the animation to its initial frame, stops playback, clears completion/resume state, and shows Play.
- **Current evidence or blocker:** **Verified.** Focused tests pin reset of playing, resumable, and completed state after speed changes. From the completed Lesson Four state, operator browser review confirmed that selecting 0.3 then 0.9 returns each scenario to its initial frame with Play restored, selected-speed focus retained, and Expanded/Compressed labels following the selected scenario.
- **Source / tests:** `CausalDelayFeedbackStoryMode.js`; `CausalDelayFeedbackModeController.js`; `tests/causal-delay-feedback-modes.test.js`; `tests/causal-delay-feedback-runtime.test.js`; operator browser acceptance

### CDF-009

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Use one shared bottom timeline rail across lessons and Laboratory with timeline-only First Frame, Play/Pause, and matching Last Frame controls followed by the scrubber. Space pauses/resumes without restarting. A completed lesson must not overload Play as Replay. Lesson-sequence navigation belongs in the separate standard top-right icon strip. Remove playback controls from the lesson-information panel and top header; accessible labels/tooltips are required.
- **Current evidence or blocker:** **Verified.** The shared rail contains only First Frame, Play/Pause, Last Frame, and scrubber. Focused tests cover shared icons, pause/resume, completion, repeated endpoints, keyboard transport, and DOM separation. Desktop/390×844 browser QA confirmed the layout, and the operator explicitly accepted exact-frame resume plus repeatable First/Last behavior and the absence of bottom lesson navigation.
- **Source / tests:** `causal-delay-feedback.html`; `src/runtime/TransportControlIcons.js`; `CausalDelayFeedbackRuntime.js`; `CausalDelayFeedbackModeController.js`; `tests/transport-control-icons.test.js`; focused CDF tests; operator browser acceptance

### CDF-013

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** The shared timeline scrubber remains available for slow replay-time inspection in a clean bottom canvas rail, outside the top header and below the time axis. The rail never covers axes, paths, lesson information, lesson navigation, or other controls at desktop or phone widths. Keep the ordered lesson plan below the separate standard top-right app-icon strip.
- **Current evidence or blocker:** **Verified.** Both story and Laboratory viewports reserve the bottom rail. Desktop and 390×844 browser QA confirmed separation from axes, paths, information, TOC, and controls; the mobile information-panel clearance was corrected before acceptance. The operator explicitly accepted the completed chart-aligned bottom-rail layout.
- **Source / tests:** `causal-delay-feedback.html`; `CausalDelayFeedbackRuntime.js`; `tests/causal-delay-feedback-runtime.test.js`; operator browser acceptance

### CDF-025

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Move the shared `time` axis label just above the horizontal axis in every Lesson and Laboratory so the bottom timeline rail cannot underlap it. Use one display-contract token for the position, preserve the axis/frame, and avoid the paths and lesson-information panel.
- **Current evidence or blocker:** **Verified.** `TIME_AXIS_LABEL_POSITION` is shared by the one background renderer, the focused contract test pins it north of the axis, and operator browser review accepted the resulting global placement.
- **Source / tests:** `CausalDelayFeedbackDisplayContract.js`; `CausalDelayFeedbackRuntime.js` (`drawBackground`); `tests/causal-delay-feedback-runtime.test.js`

### CDF-027

- **Status:** Verified
- **Owner:** Operator browser review + focused CDF tests
- **Request / acceptance:** Size and align the entire bottom timeline rail to the transformed chart axis: its left edge begins at the Y-axis/X-axis intersection and its right edge ends immediately before the time-axis arrowhead. Use the same shared geometry in every Lesson and Laboratory, retain only a small arrowhead-safe inset, and keep the rail below rather than over the axis.
- **Current evidence or blocker:** **Verified.** The focused geometry test pins the rail to the transformed shared axis constants. Desktop and 390×844 browser QA showed the rail below the chart without panel/axis overlap, and the operator explicitly accepted the chart-aligned timeline span.
- **Source / tests:** `CausalDelayFeedbackDisplayContract.js`; `CausalDelayFeedbackRuntime.js` (`alignBottomRailToTimeAxis`); `tests/causal-delay-feedback-runtime.test.js`; operator browser acceptance

### CDF-028

- **Status:** Verified
- **Owner:** Operator browser review + focused shared-transport tests
- **Request / acceptance:** First Frame returns the active lesson to its initial state; Last Frame jumps to the final frame with wakes visible; either action remains repeatable and never changes the selected lesson. Last Frame uses the shared right-pointing triangle plus right-side vertical-bar icon and accessible label.
- **Current evidence or blocker:** **Verified.** Focused tests pin the shared Last Frame SVG/label and runtime transport state. Operator browser review confirmed Last→First→Last behavior and the expected initial/final scenes.
- **Source / tests:** `src/runtime/TransportControlIcons.js`; `CausalDelayFeedbackRuntime.js` (`resetReplayTime`, `jumpToLastFrame`); `tests/transport-control-icons.test.js`; `tests/causal-delay-feedback-runtime.test.js`


CDF-001 and CDF-005 were promoted to **Verified** after focused-test coverage and explicit operator browser acceptance.

## Superseded / merged

### CDF-017

- **Status:** Merged into CDF-018 (superseded)
- **Owner:** —
- **Request / acceptance:** Add Lesson Seven, **Acceleration**, on the shared paired-path frame at a calm 50% start. Teach that a wake changes velocity: from behind may increase speed, from ahead may decrease speed, and off-axis may turn the path. Do not imply every acceleration is sideways.
- **Current evidence or blocker:** **Merged into CDF-018; not a separate Lesson Seven implementation.** Preserve the original proposal and isolated-worktree evidence: the current learner list exposes only the muted-gray `Acceleration — Coming soon` roadmap label. A dedicated-worktree implementation exists, but its local CDF-059 provenance ID conflicts with the canonical current-checkout CDF-059 pacing-recovery record and must be reconciled before any sequential integration. Routing evidence from that worktree is not live-app acceptance. CDF-018 is the superseding Lesson Seven row.
- **Source / tests:** `CausalDelayFeedbackStoryMode.js`; `CausalDelayFeedbackModeController.js`; CDF-060; isolated Acceleration worktree `/Users/markmorris/.codex/worktrees/73e1/architrino`; focused tests and capture script; superseded by CDF-018

## Withdrawn / defunct

### CDF-034

- **Status:** Withdrawn (defunct)
- **Owner:** Operator decision
- **Request / acceptance:** Diagnose and prevent Laboratory settings failures or sluggishness observed when selecting **White Background** after **Full** wakes appeared. Capture browser/runtime error evidence and measured input-to-render timing before claiming a fix; settings changes must avoid app-side exceptions and blocking response. Popover behavior remains governed by CDF-014.
- **Current evidence or blocker:** **Withdrawn/defunct by explicit operator decision; do not implement.** Preserve the reported White Background/Settings sluggishness sequence as durable defect history, but it has no implementation path because the learner-facing Settings menu and white-background setting were removed under accepted CDF-050. Do not restore those surfaces to reproduce the old intake.
- **Source / tests:** Historical `CausalDelayFeedbackRuntime.js` settings path; CDF-014; superseded by accepted CDF-050; no implementation or browser QA change required

### CDF-038

- **Status:** Withdrawn (defunct)
- **Owner:** —
- **Request / acceptance:** Diagnose and correct the Laboratory **Arcs**/**Full** rendering intersection. At the stable Laboratory entry with Arcs enabled, expected arcs must be present. The sequence entry → Arcs enabled → Full enabled must render the intended wake geometry without a faint straight connector from the positrino path's left/start point to the current electrino and without any degenerate-arc substitute. Do not claim fixed without focused initial-state/toggle-sequence tests and visual browser QA.
- **Current evidence or blocker:** **Withdrawn/defunct by explicit operator decision; operator-misdiagnosed.** Preserve the original Arcs/Full intersection report as history, but do not dispatch or implement rendering fixes from this intake. The separate paused CDF-065 mutually exclusive Arcs-or-Full requirement is independent and unchanged.
- **Source / tests:** Historical `CausalDelayFeedbackRuntime.js` (`getVisibleWakeSeries`, `drawWakes`, `drawFullCircularWakes`, `drawForegroundWakeEmissionLines`, `drawWakeEmissionLine`); stable entry from CDF-030; no implementation or browser QA change required; CDF-065 remains separate and paused

### CDF-039

- **Status:** Withdrawn (defunct)
- **Owner:** —
- **Request / acceptance:** Remove the stray purple dot observed above or within the **Arcs** control unless it is given an explicit, operator-approved learner-facing meaning; none is currently defined. Confirm the control remains clean in its enabled and disabled states at desktop and phone widths.
- **Current evidence or blocker:** **Withdrawn/defunct by explicit operator decision; do not implement.** The reported purple dot was an external browser/OS control overlay, absent from app page pixels, with no app-side implementation path.
- **Source / tests:** External browser/OS overlay diagnosis; app page-pixel inspection; no app implementation or browser QA change required

### CDF-041

- **Status:** Withdrawn (defunct)
- **Owner:** —
- **Request / acceptance:** Replace every Laboratory fixed start/end path marker with a filled, borderless source-color dot: red for both positrino path endpoints and blue for both electrino path endpoints. Apply the treatment consistently on every canvas background, including white and purple, while retaining a clear semantic distinction from current-emission/transmission markers. Require desktop and phone browser acceptance on white and purple canvases.
- **Current evidence or blocker:** **Withdrawn/defunct by explicit operator decision; do not implement.** Preserve this proposal as durable history. CDF-047 superseded its endpoint-marker proposal, and the current accepted direction is no decorative endpoint circles.
- **Source / tests:** `CausalDelayFeedbackRuntime.js` (`drawPathEndpointHandles`, `getPathEndpointHandles`); superseded by CDF-047; current accepted no-decorative-endpoint direction

### CDF-043

- **Status:** Withdrawn (defunct)
- **Owner:** —
- **Request / acceptance:** Extend Lesson Five, **Forward Wake Buildup**, with the same `0.3 C_f`, `0.6 C_f`, and `0.9 C_f` speed choices as Lesson Four. In Lesson Five, the choice selects one full buildup scenario rather than Lesson Four's simultaneous comparative display. Every selection must reset Lesson Five to emission zero with no inherited wake history, then show the selected-speed buildup. Reuse shared speed-selector and learner-state semantics where safe while retaining Lesson Five's distinct teaching copy. Require focused selection/state/reset tests and operator browser review.
- **Current evidence or blocker:** **Withdrawn/defunct by explicit operator decision; do not implement.** The proposed Lesson Five speed choices are not needed because the concept is already taught in Lesson Four. Preserve this intake as durable history and do not dispatch implementation work from it.
- **Source / tests:** `CausalDelayFeedbackStoryMode.js` (`STORY_MOTION_SPEED_FRACTIONS`, `forward-buildup` scene); `CausalDelayFeedbackModeController.js` (`renderStory`, speed selection state); `CausalDelayFeedbackRuntime.js` (`drawStoryForwardWakeBuildup`); historical focused Lesson Five selection/reset requirements; operator decision

### CDF-048

- **Status:** Withdrawn (defunct)
- **Owner:** Operator decision
- **Request / acceptance:** Promote the Laboratory gear visual into a standard page-settings icon in the canonical shared top-right page-control area, preserving global Home and Search semantics rather than retaining a one-off Laboratory toolbar layout.
- **Current evidence or blocker:** **Withdrawn/defunct by explicit operator decision; do not implement.** Causal Delay has no learner-facing Settings panel, gear, or relocated settings icon; accepted CDF-050 removed those surfaces. Preserve this intake as durable decision history and do not create or relocate a Settings control.
- **Source / tests:** `causal-delay-feedback.html` (`scene-hud-tools`, `causal-delay-feedback-settings`); CDF-024; superseded by accepted CDF-050; no implementation or browser QA change required

### CDF-049

- **Status:** Withdrawn (defunct)
- **Owner:** Operator decision
- **Request / acceptance:** Keep Canvas Settings limited to canvas/display choices and separate its two speed controls without conflating them: Animation Speed belongs with playback/transport controls, while Architrino Speed belongs in a distinct motion/experiment control area. Investigate shared ownership and state consequences first; do not choose exact placements without explicit operator approval.
- **Current evidence or blocker:** **Withdrawn/defunct by explicit operator decision; do not implement.** This settings-speed-control placement intake has no implementation path because the learner-facing Settings panel and both speed controls were removed under accepted CDF-050. Preserve the distinct historical semantics, but do not relocate or restore either learner-facing control.
- **Source / tests:** `causal-delay-feedback.html` settings panel and bottom transport rail; `CausalDelayFeedbackRuntime.js` animation and architrino speed state; superseded by accepted CDF-050; no implementation or browser QA change required
