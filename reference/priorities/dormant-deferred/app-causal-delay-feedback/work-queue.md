# Causal Delay Feedback Work Queue

This file tracks unresolved learner-facing Causal Delay Feedback work. On 2026-10-31 the operator requested queue entries to test the Binary pair features added in this chat. Test intake is reopened only for CDF-072 through CDF-077; the immediate feature-implementation lane remains closed and the older advanced teaching backlog remains deferred. This request records the test tasks; it does not execute them.

## Rules

1. Add a row only for a new operator-directed request or a reproducible current regression.
2. Use `Deferred / blocked` for intentionally parked teaching work and `Queued`, `In progress`, or `Awaiting verification` only after the lane is reopened.
3. Require focused tests and any relevant current served-browser confirmation before calling work verified.
4. After verification, promote durable copy, architecture, interaction, or claim-boundary decisions into [v1-product-requirements.md](v1-product-requirements.md), then remove the row.
5. Keep routine fixes, superseded proposals, withdrawn ideas, and detailed verification narratives in Git history.

## Ranked Next Objects

1. `cdf_two_tilt_reference` — [CDF-072](#cdf-072--two-tilt-analytical-and-display-correctness). Status: ○ `Queued`.
2. `cdf_breathing_reference` — [CDF-073](#cdf-073--breathing-and-common-motion-geometry). Status: ○ `Queued`.
3. `cdf_binary_navigation` — [CDF-074](#cdf-074--scenario-navigation-and-direct-links). Status: ○ `Queued`.
4. `cdf_binary_transport` — [CDF-075](#cdf-075--binary-playback-and-finite-endpoints). Status: ○ `Queued`.
5. `cdf_binary_accessibility` — [CDF-076](#cdf-076--responsive-and-accessible-binary-lessons). Status: ○ `Queued`.
6. `cdf_binary_delivery` — [CDF-077](#cdf-077--built-and-deployed-binary-lesson-delivery). Status: ○ `Queued`; live-site observation depends on delivery of the identified candidate.
7. `cdf_story_and_prediction` — [CDF-067](#cdf-067--story-and-prediction). Status: `Deferred / blocked`.
8. `cdf_path_history_ledger` — [CDF-068](#cdf-068--path-history-ledger). Status: `Deferred / blocked`.
9. `cdf_roots_mode` — [CDF-069](#cdf-069--roots-mode). Status: `Deferred / blocked`.
10. `cdf_self_hit_near_cf` — [CDF-070](#cdf-070--self-hit-near-field-speed). Status: `Deferred / blocked`.
11. `cdf_branch_geometry_explorer` — [CDF-071](#cdf-071--branch-geometry-explorer). Status: `Deferred / blocked`.

## Open Work

CDF-072 through CDF-077 are unstarted test tasks for the implemented second scenario. Resume only the selected test row or explicitly selected group. The [2026-10-29 local checks](work-log.md) are prior scoped evidence, not a fresh run or closure of these entries. Each row must compare the current implementation with the [accepted binary requirements](v1-product-requirements.md#binary-pair-scenario--operator-directed-addition-2026-10-29) and the [mathematical treatment](manuscript.md#7-a-second-scenario-binary-pair-motion), record the exact source or candidate inspected, and separate analytical comparison, prescribed geometry, local browser observation, built-payload observation and public-site observation.

The agreement is the operator's 2026-10-31 queue-entry request for this bounded feature family. No recurring cadence, hook, CI job, required PR status, broad scientific campaign or new testing framework is authorized by these entries. When resumed, reuse the focused CDF tests and existing browser tools; add a focused explicit-use diagnostic only when it detects a consequential gap. Planning ceilings are five minutes for a selected Node diagnostic and fifteen minutes for a row's representative browser journey, with setup recorded separately; these are proposed execution bounds, not measured costs or instructions to spend the whole allowance. Measure actual cost during execution, stop for an unexplained overrun, and document any narrower remaining coverage. A failure limits acceptance of the affected feature and becomes a scoped defect; it does not automatically block unrelated publication. Remove completed rows after recording durable outcomes in the existing owners.

### CDF-072 — Two-tilt analytical and display correctness

- **Status:** ○ `Queued` — not run under this request.
- **Source / value:** [Binary lessons and analytical sampler](../../../../src/apps/causal-delay-feedback/CausalDelayFeedbackBinaryLessons.js), [binary renderer](../../../../src/apps/causal-delay-feedback/CausalDelayFeedbackBinaryRenderer.js), and the independently derived [first-order response](../../master-equation-closure/binary-research/analysis/slow-binary-first-order-drift.md#forced-response-about-the-zero-delay-circle). Readers depend on the signs and units to understand why an initial increase coexists with a full-turn loss.
- **Next step / scope:** Review the existing phase-control cases in [the focused mode tests](../../../../tests/causal-delay-feedback-modes.test.js), then run those selected tests and inspect all four two-tilt lessons in the served app. Use the source derivation as the reference, not values copied from the sampler. Check release, the first balance, half a reference turn, the second balance and the full-turn endpoint; compare the plotted point, contribution readout, desktop bars and arrow directions at the same phase.
- **Acceptance / falsifier:** In the declared relative units, release has net rate $+1$ and zero accumulated change; half a turn has inward rate $-4$, net rate $-3$ and accumulated change $-\pi$; the full turn has net rate $+1$ and accumulated change $-2\pi$. The rate means are forward $+1$, inward $-2$ and net $-1$. The extrema occur at reference phases $\pi/3$ and $5\pi/3$. Any mismatched sign, factor, phase or rate-versus-accumulated-change label fails the affected display. The pair stays mirrored about its midpoint and the enlarged widening/arrows agree with the documented schematic mapping; do not require the schematic path to be a quantitative EOM trajectory.
- **Evidence boundary:** Derived finite-time, slow near-circular comparison with $c_f=1$. The check must preserve the schematic label and the distinction between actual instantaneous speed and the secular comparison. Do not modify the scientific reference alongside the implementation or infer an indefinite binary fate from the display.
- **Completion:** Current known-answer results and served-browser observations support the four lessons, with discrepancies repaired within the affected scope or explicitly left unresolved. Historical passing counts alone do not close this row.

### CDF-073 — Breathing and common-motion geometry

- **Status:** ○ `Queued` — not run under this request.
- **Source / value:** [Prescribed breathing geometry](../../../../src/apps/causal-delay-feedback/CausalDelayFeedbackBreathingGeometry.js), [lesson treatment](manuscript.md#72-breathing-turning-and-shared-motion-are-separate-geometric-contributions), and the [unchanged Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md). This protects readers from incorrect emission events, velocity arrows or a false averaged-sign conclusion.
- **Next step / scope:** Start with an independently known stationary or straight-transmitter reception and a known derivative control before checking the turning, nearly radial and reversing examples. Reuse the relevant cases in [the focused mode tests](../../../../tests/causal-delay-feedback-modes.test.js). Check positive separation, shared/radial/turning velocity decomposition, emission-time transmitter velocity, causal delay and the transmitter denominator in the received contribution. Inspect the matching emission marker and arrows in lessons five and six.
- **Acceptance / falsifier:** The emission-to-receiver distance equals the positive wake travel time at $c_f=1$ within the declared diagnostic tolerance. Position differencing agrees with the displayed velocity components; the received row uses the earlier partner position and its emission-time velocity. Turning passes regularly through zero and reverses without an inverse-angular-momentum singularity, a nonfinite readout or a finite arrow falsely representing a zero vector. The nearly radial selector resets and pauses the selected example. An unavailable received row must not retain a plausible stale contribution.
- **Evidence boundary:** Unit reduced coupling, $c_f=1$, finite prescribed input paths and evaluated acceleration contributions; no EOM evolution. Preserve separate analytical and prescribed labels. The examples must not inherit the mirror-pair speed law, transfer a sign between averaging weights, claim a repeating full-law solution or present the complete-history exclusion as observed scattering or proof of existence.
- **Completion:** Known controls, current prescribed-case checks and served observations support both lessons and both selectable turning cases, with any unreachable failure-path coverage identified rather than fabricated.

### CDF-074 — Scenario navigation and direct links

- **Status:** ○ `Queued` — not run under this request.
- **Source / value:** [Scenario registry and links](../../../../src/apps/causal-delay-feedback/CausalDelayFeedbackLessonScenarios.js), [mode controller](../../../../src/apps/causal-delay-feedback/CausalDelayFeedbackModeController.js), and [focused mode tests](../../../../tests/causal-delay-feedback-modes.test.js). Readers must reach the intended geometry without losing the original lessons or confusing their data with the binary.
- **Next step / scope:** Exercise both scenario buttons, every binary lesson, reloads of each named `lesson` link, browser Back/Forward, and invalid scenario/lesson queries. Repeat a representative link with an unrelated replay query and URL fragment. Switch scenarios from playing, paused and completed states, then return to the last selected lesson in each scenario.
- **Acceptance / falsifier:** The selected button, lesson title, geometry and URL agree; unrelated URL parameters survive. Scenario changes stop playback and clear stale completion/resume state. The eight original Path history lessons retain their order and copy, with Roots and Laboratory scoped to that scenario. Binary navigation remains in the same app/runtime/state, and its final lesson does not silently enter the original geometry. A mismatched scene, discarded query, inaccessible lesson or lost original view fails the affected route.
- **Completion:** Focused navigation results and a current browser journey cover direct entry, both history directions, scenario restoration and the original-scenario regression check without adding a second route or runtime.

### CDF-075 — Binary playback and finite endpoints

- **Status:** ○ `Queued` — not run under this request.
- **Source / value:** [Shared runtime](../../../../src/apps/causal-delay-feedback/CausalDelayFeedbackRuntime.js), [declared lesson windows](../../../../src/apps/causal-delay-feedback/CausalDelayFeedbackBinaryLessons.js), and [focused runtime tests](../../../../tests/causal-delay-feedback-runtime.test.js). A stale or wrapping clock can show correct formulas at the wrong phase and reverse the lesson's meaning.
- **Next step / scope:** Check First frame, Play/Pause/Resume, Last frame, pointer scrubbing, slider keyboard controls, canvas frame stepping and reduced-motion entry for analytical and prescribed lessons. Include the partial first-sixth and first-sixth-to-half-turn windows, a full-turn lesson and the breathing-case selector. Repeat after fresh direct-link entry and after the asynchronous replay provider settles.
- **Acceptance / falsifier:** The diagram, graph point, readout and scrubber share the declared phase/window. Pause holds the frame and Resume continues it. Last frame and automatic completion hold the finite endpoint without wrapping; First frame resets only the selected lesson. Scenario/lesson/case changes discard the preceding scene's held frame. Reduced motion starts paused but allows manual playback. A cursor jump, time-label mismatch, stale held frame or endpoint wrap fails the affected transport behavior.
- **Completion:** Current runtime cases and browser observations cover segment entry, pause/resume, stepping, scrubbing and completion, including the prior finite-cursor regression, with no extra animation loop.

### CDF-076 — Responsive and accessible binary lessons

- **Status:** ○ `Queued` — not run under this request.
- **Source / value:** [App shell and responsive styles](../../../../causal-delay-feedback.html), [lesson controller](../../../../src/apps/causal-delay-feedback/CausalDelayFeedbackModeController.js), and [binary renderer](../../../../src/apps/causal-delay-feedback/CausalDelayFeedbackBinaryRenderer.js). Readers must be able to see and operate the new geometry and understand it without relying on color alone.
- **Next step / scope:** Inspect representative desktop and 390×844 phone layouts, plus a shorter viewport to expose overlap or clipping. Exercise the desktop lesson list, compact phone picker, scenario/case selectors, scrolling lesson copy and transport using keyboard and touch/pointer. Inspect accessible names, focus restoration and the text-equivalent explanation/readout; check reduced motion and the geometric contrast at release, half turn and the full endpoint.
- **Acceptance / falsifier:** The pair, arrows, graph labels and transport remain visible and usable; longer copy and comparison limits can be read by scrolling. Every binary lesson and prescribed variant is reachable. Focus remains usable after lesson controls are rebuilt, and text identifies directions/contributions without color alone. The phone view must not refer learners to a missing graphic or hide the only explanation of schematic/prescribed authority. Any inaccessible control, clipped essential label or overlapping chart/panel fails that layout.
- **Completion:** Current desktop and phone observations, with screenshots where useful, identify the exact inspected dimensions and interactions. Saved screenshots are review evidence for those observations, not a new pixel-golden or recurring freshness gate.

### CDF-077 — Built and deployed binary lesson delivery

- **Status:** ○ `Queued` — not run under this request; public-site verification depends on the identified candidate being deployed.
- **Source / value:** [App entry](../../../../causal-delay-feedback.html?scenario=binary-pair), [product requirements](v1-product-requirements.md), and the [agreed Pages build and testing process](../../../op/testing-regime.md#6-current-decisions-and-transition). This catches a local-only module or route that prevents visitors from opening the new lessons.
- **Next step / scope:** At the next authorized publication/deployment check, use that procedure's existing built payload rather than creating a separate build campaign. Open the binary entry and representative analytical and breathing deep links from that payload, then repeat the principal interaction on the matching public deployment. Check required module/font requests and browser errors, scenario selection and playback.
- **Acceptance / falsifier:** The candidate payload and, when available, public site load the new modules and intended lesson without missing assets or a bootstrap error. Record the candidate identity and published revision when available; a healthy local server or the old public page cannot certify a newer candidate. A missing module, broken deep link or nonworking principal interaction fails that delivery. If the candidate has not been deployed, leave the live observation pending and state the dependency.
- **Evidence boundary / completion:** Distinguish local, built and public observations in the existing work log and close only the supported delivery scope. This entry does not authorize commit, push, merge, deployment or changes to publication gates.

## Deferred / blocked

### CDF-067 — Story and Prediction

- **Status:** Deferred / blocked
- **Source:** [Learner progression plan](causal-delay-feedback-advancement.md)
- **Request / acceptance:** Teach one wake/reception prediction from the canonical causal-root evaluator while Story and Prediction consume one learner state.
- **Evidence / blocker:** The accepted eight-lesson surface is closed and this priority owner remains dormant-deferred.
- **Completion:** One shared state drives the animation, answer, reveal, and matching source-history identity without a mode-local calculator.

### CDF-068 — Path-History Ledger

- **Status:** Deferred / blocked
- **Source:** [Learner progression plan](causal-delay-feedback-advancement.md)
- **Request / acceptance:** Link timeline rows to retained source history, emission event, receiver event, causal-root identity, and producer-carried contribution.
- **Evidence / blocker:** Reopening the learner surface is deferred.
- **Completion:** Selecting a ledger row selects the same emission point, wake intersection, receiver event, causal root, and scene contribution.

### CDF-069 — Roots Mode

- **Status:** Deferred / blocked
- **Source:** [Roots mode plan](roots-mode-plan.md) and [learner progression plan](causal-delay-feedback-advancement.md)
- **Request / acceptance:** Synchronize delay-map zeroes, causal-wake intersections, ordinary-fold behavior, root identity, and active-root counts in the existing app.
- **Evidence / blocker:** The existing Roots view is live at `causal-delay-feedback.html?mode=roots` inside the shared application shell. The deferred object is only the more advanced synchronized linked-view lesson; no standalone product route, duplicate runtime, evaluator, state store, or wake renderer is authorized.
- **Completion:** Ordinary folds are legible and checkable without generalizing their $\Delta N=\pm2$ law to unresolved coincident same-source birth.

### CDF-070 — Self-Hit Near Field Speed

- **Status:** Deferred / blocked
- **Source:** [Learner progression plan](causal-delay-feedback-advancement.md)
- **Request / acceptance:** Compare sub-, at-, and super-field-speed source paths using causal-root geometry and the producer's current transversality diagnostics.
- **Evidence / blocker:** The advanced lesson remains deferred and may not silently resolve open signed-derivative or naming questions.
- **Completion:** The lesson makes self-hit depend on line-of-sight causal-root geometry rather than a total-speed label and fails closed on unavailable producer fields.

### CDF-071 — Branch Geometry Explorer

- **Status:** Deferred / blocked
- **Source:** [Learner progression plan](causal-delay-feedback-advancement.md)
- **Request / acceptance:** Show accepted, rejected, unresolved, and unavailable branches with stable identities, producer-carried contributions, filters, and explicit reasons.
- **Evidence / blocker:** Reopening the learner surface is deferred; the app may not recompute missing branch authority.
- **Completion:** Every displayed verdict and vector-sum component is carried by the same producer rows shown individually.

## Safe Resume State

- Implemented surface: Path history with eight lessons, Roots and Laboratory; Binary pair with six guided lessons.
- Accepted copy and durable requirements: [v1-product-requirements.md](v1-product-requirements.md).
- Test intake: CDF-072 through CDF-077 are ○ `Queued`; no executor is assigned and no check was run by the queue-entry request.
- Active feature-implementation owner: none.
- Deferred teaching backlog: CDF-067 through CDF-071.
- Pending binary verification: the six queued rows above; earlier local evidence does not mark them complete.
- Solver task: none. The app can display a supplied recorded EOM dataset but does not run the EOM solver.
- Evidence boundary: all app fixtures, recorded-path display, local previews, and browser proofs remain display-only.

The five older teaching rows remain parked. The new test rows cover only the implemented Binary pair addition and are resumed explicitly; they do not reopen the deferred teaching sequence or solver development.
