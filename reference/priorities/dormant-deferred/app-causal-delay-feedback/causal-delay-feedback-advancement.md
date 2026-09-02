Closure goal: Turn `causal-delay-feedback.html` into one progressive learner journey that begins with Story and Prediction and advances through Path History, Roots, Self-Hit, Branch Lab, and Sandbox while every mode shares one causal-history state, root evaluator, wake renderer, and source/receiver geometry.

# Objective

Advance the deployed Causal Delay Feedback app without splitting its related teaching requirements into separate products or disconnected mini-apps.

## Packet Status

Status: `deferred`; owner: Causal Delay Feedback; queue rows: CDF-067 through CDF-071 in [work-queue.md](work-queue.md). Moving this packet into the dormant owner does not reopen implementation.

The completed app should let a learner move through one coherent sequence:

1. **Story** — watch one wake leave a source and reach a receiver;
2. **Prediction** — pause before reception and choose the earlier source position that will matter;
3. **Path History** — connect the chosen event to the retained-history ledger;
4. **Roots** — connect delay-map zero crossings to wake intersections and root count;
5. **Self-Hit** — inspect same-source roots near $c_f$ without treating total speed as the answer;
6. **Branch Lab** — inspect every accepted and rejected delayed-hit branch and its acceleration contribution; and
7. **Sandbox** — expose the existing replay and direct-manipulation surface after the guided sequence has established the causal-delay idea.

Story and Prediction are the first learner-facing implementation slice. Build and verify them first, then continue through the later stages using the same state and geometry. Do not replace the existing Sandbox with a second runtime.

# Required First Inspection

Before editing:

1. Read `AGENTS.md` and `reference/op/agent-startup-orientation.generated.md`.
2. Run `git status --short --untracked-files=all` and preserve unrelated work.
3. Read:
   - `reference/priorities/dormant-deferred/app-causal-delay-feedback/priorities.md`;
   - `reference/priorities/dormant-deferred/app-causal-delay-feedback/brainstorming.md`;
   - `reference/priorities/dormant-deferred/app-causal-delay-feedback/v1-product-requirements.md`;
   - `reference/priorities/dormant-deferred/app-causal-delay-feedback/roots-mode-plan.md`;
   - `reference/priorities/dormant-deferred/app-causal-delay-feedback/roots-requirements-and-design.md`;
   - `content/markdown/aaa/dynamics/master-equation.md`, especially causal roots and caustic transit;
   - `content/markdown/aaa/archie/navigation-and-controls.md`;
   - `content/markdown/aaa/archie/ui-guidelines.md`;
   - `causal-delay-feedback.html`;
   - every current module under `src/apps/causal-delay-feedback/`;
   - the focused causal-delay tests; and
   - `scripts/capture-causal-delay-feedback-browser-qa.mjs`.
4. Start the live development runtime and inspect the rendered desktop and narrow-screen app before editing. Exercise play/pause, scrub, reset, settings, path dragging, wake selection, replay loading, and the current readout. Record the actual integration seam and any current browser warning or error.
5. Trace the live data path from the selected replay adapter through the runtime's causal-history and wake-link calculations to rendering. Name which existing calculation is authoritative before extracting or reusing it.

Do not infer the design from screenshots alone. Use the rendered behavior and the code path that produces it.

# Canonical State And Ownership

Use exactly one canonical learner-state object across every mode. It must carry or reference:

- stable source and receiver identities;
- source and receiver paths;
- retained source history;
- receiver time $T_r$;
- transmit or emission time $T_t$;
- the current causal roots and their stable identities;
- accepted and rejected branch rows with reasons;
- source and receiver geometry;
- wake display geometry;
- selected root or ledger row;
- playback state; and
- replay provenance and authority.

Use one canonical causal-root evaluator. If the current runtime already contains the required calculation, extract that calculation into the single owner named in the Allowed Edit Scope below and make every mode consume it. Do not add a Story-only answer calculator, a Roots-only root finder, or a Branch-Lab-only approximation.

Use one wake renderer and one source/receiver geometry projection. Simple modes may hide advanced glyphs and diagnostics, but they must not substitute different paths, root identities, emission times, receiver times, or wake intersections.

The EOM replay adapter and the representative mock adapter retain their current authority boundaries. A teaching replay may explain its carried geometry; it does not become physical causal-delay solver evidence by being shown in a guided mode.

# Notation And Theory Boundary

Use normalized numerical units with $c_f=1$ in every new fixture, calculation, tolerance, protocol example, and UI example. Keep symbolic $c_f$ where the dependence matters.

Use the live Roots packet's receiver/transmit notation:

$$
g(T_r;T_t)=0,
$$

where $T_r$ is receiver time and $T_t$ is transmit or emission time. Pane, tooltip, code, and test naming should preserve that distinction.

The provisional delay-map label `c()` must not reach the end-user implementation. Before implementing the Roots display, locate every live use or draft reference to `c()` and resolve it against $g(T_r;T_t)$. Use `g` for the delay-map function unless the owning Roots packet and Master Equation together prove that a different current symbol is required. Do not create two names for the same plotted quantity.

Use `source`, `receiver`, `causal root`, `emission`, `reception`, `causal history`, and `acceleration`. Do not use force language at the architrino level.

Do not import a shock-front, Mach-cone, Cherenkov, relativistic, quantum, or mass-based mechanism as a premise. Standard-physics comparisons, if retained at all, must be clearly secondary and cannot drive the calculation.

# Learner Progression

## 1. Story

Build the first useful mode around one source, one emitted wake, one receiver, and one reception:

- introduce the source and receiver in plain language;
- show the wake leaving the source at $T_t$;
- keep the emission point visible while the source and receiver move;
- show the wake reaching the receiver at $T_r$;
- draw the causal line from reception back to the earlier emission point; and
- end with the plain-language statement that the arriving influence came from the source's earlier position.

Story controls should be limited to play/pause, replay, next/back, sound-free visual cues, and a route to Sandbox. Do not expose the existing dense settings surface during the first scene.

## 2. Prediction

Pause immediately before reception and ask the learner to choose which earlier source position matters.

- Offer a small number of positions drawn from the same source history.
- Generate the correct answer from the canonical root evaluator.
- Reveal the wake intersection and the matching ledger row after the choice.
- Keep scoring light, explain an incorrect choice, and allow retry.
- Add moving-source, moving-receiver, curved-path, and hidden-wake rounds only after the single-root round passes its acceptance tests.
- Never bake answer coordinates into the Story module or HTML.

## 3. Path History

Add a synchronized retained-history ledger:

- inactive history;
- currently causal history;
- selected root history;
- rejected or unavailable history; and
- producer-carried acceptance or rejection reason.

Selecting a ledger row must select the same emission point, wake intersection, root identity, receiver event, and branch contribution in the scene. The learner-facing first layer can hide interior samples, but diagnostics must remain available without changing the underlying state.

## 4. Roots

Implement Roots as a linked mode of this app, not as `roots.html`.

At the current $T_r$, plot $g(T_r;T_t)$ against $T_t$ and mark every zero crossing. Synchronize:

- each plotted zero crossing;
- the matching wake intersection;
- root identity and ordinal;
- active root count;
- emission time $T_t$;
- receiver time $T_r$;
- the selected history row; and
- the scene's selected branch.

The number of visible zero crossings must equal the displayed active-root count for the same receiver event. A mismatch must fail a focused test and produce a visible unavailable state rather than two disagreeing displays.

For an ordinary interior fold:

- slow or snap the playback near the fold;
- show the tangent zero becoming two roots or two roots annihilating;
- show $\Delta N=\pm2$ only for the generic ordinary fold covered by the live packet;
- distinguish the pointwise per-hit acceleration spike from the finite accumulated velocity change;
- plot the accumulated velocity change on a finite scale; and
- explain that an unbounded pointwise value does not imply an infinite accumulated kick through the ordinary fold.

Do not generalize this ordinary-fold lesson to unresolved coincident same-source root birth. The sharp same-source coincident case is not advanced; verification remains incomplete unless a separate accepted treatment supplies the missing regularization or singular-stratum result.

## 5. Self-Hit

Use the same evaluator and geometry to compare sub-$c_f$, threshold, and super-$c_f$ source paths:

- draw earlier wakes and their intersections with the later source path;
- vary speed and curvature without changing the coordinate convention;
- expose absent, tangent, active, unresolved, and failed-floor cases;
- show the packet-owned transversality quantities with their exact current names and definitions; and
- teach that self-hit depends on line-of-sight causal-root geometry, not on a total-speed label alone.

Do not silently resolve the Roots packet's open naming or signed-derivative questions. If its current $D_s$/$D_t$ usage conflicts with the Master Equation or the producer fields, use the producer's actual field name, show the mismatch as a documentation blocker, and do not relabel values in the browser.

## 6. Branch Lab

For one source/receiver event:

- show every accepted branch;
- show every rejected, unresolved, or unavailable branch;
- preserve stable branch colors and root identities while controls change;
- show branch-local acceleration contributions and their vector sum;
- support filters for history age, contribution magnitude, root kind, and transversality floor; and
- keep every acceptance or rejection reason visible.

The vector sum must consume the same producer rows shown individually. Do not recompute a different hidden sum for the readout.

## 7. Sandbox

Retain the existing replay and direct-manipulation surface as the final mode. Guided modes may set up state, but entering Sandbox must carry the same source, receiver, replay time, paths, and root selection forward. Returning to a guided mode must not silently reset geometry unless the learner explicitly starts a new lesson.

# Stronger Solver Obligation

Keep the stronger physical causal-delay solver as a separate open obligation.

The current pair-interaction replay, retained-path constraint machinery, closed-form fold teaching case, or mock replay may establish their declared local contracts only. None of them, alone or in combination, closes the full coupled physical causal-delay boundary-value solver, Noether sea response, retained physical branch, or theory-wide stability burden.

The implementation report and end-user provenance surface must distinguish:

- guided teaching replay;
- representative mock replay;
- EOM record replay;
- current constrained pair-interaction boundary replay; and
- the still-open stronger physical causal-delay solver.

Do not weaken an existing solver label or evidence gate to make the Story flow look complete.

# Accessibility And Interaction

- Every mode, step, answer choice, ledger row, root row, and transport control must be keyboard reachable.
- Use real buttons, headings, lists, tables, and status regions where those semantics apply.
- Give the main canvas an equivalent text summary that updates with the selected emission and reception.
- Do not encode source, receiver, accepted, rejected, or unresolved state by color alone.
- Preserve `prefers-reduced-motion`; comprehension must not depend on continuous animation.
- Preserve readable focus indicators and minimum pointer targets.
- Test at desktop, 390-by-844 portrait, keyboard-only, reduced-motion, and high-contrast settings.
- Keep narration optional and do not require sound.

# Allowed Edit Scope

Inspect broadly, but edit only these exact files:

- `causal-delay-feedback.html`;
- `src/apps/causal-delay-feedback/main.js`;
- `src/apps/causal-delay-feedback/CausalDelayFeedbackRuntime.js`;
- `src/apps/causal-delay-feedback/CausalDelayFeedbackEomReplayAdapter.js`;
- `src/apps/causal-delay-feedback/CausalDelayFeedbackReplayAdapter.js`;
- new `src/apps/causal-delay-feedback/CausalDelayFeedbackCausalHistory.js`;
- new `src/apps/causal-delay-feedback/CausalDelayFeedbackWakeRenderer.js`;
- new `src/apps/causal-delay-feedback/CausalDelayFeedbackModeController.js`;
- new `src/apps/causal-delay-feedback/CausalDelayFeedbackStoryMode.js`;
- new `src/apps/causal-delay-feedback/CausalDelayFeedbackHistoryMode.js`;
- new `src/apps/causal-delay-feedback/CausalDelayFeedbackRootsMode.js`;
- new `src/apps/causal-delay-feedback/CausalDelayFeedbackBranchLabMode.js`;
- `tests/causal-delay-feedback-runtime.test.js`;
- `tests/causal-delay-feedback-eom-replay-adapter.test.js`;
- new `tests/causal-delay-feedback-modes.test.js`;
- new `tests/causal-delay-feedback-roots-mode.test.js`; and
- `scripts/capture-causal-delay-feedback-browser-qa.mjs`.

Do not edit the app trackers, the Roots packet, the Master Equation, Archie canon, EOM solver, shared EOM history adapter, schemas, generated artifacts, or root `app.js` in this task. Do not create `roots.html` or another standalone app. If the implementation cannot satisfy the acceptance criteria inside this scope, stop and report the exact missing owner or contract.

Use focused modules behind the existing thin page bootstrap. Do not leave a second runtime, evaluator, state store, or renderer after the accepted path is integrated.

# Implementation Sequence

1. Record the current rendered behavior and code/data flow.
2. Define and test the canonical causal-history state and root identity.
3. Extract or centralize the current root evaluator without changing its mathematics.
4. Extract or centralize wake rendering so every mode consumes one renderer.
5. Add the mode controller and persistent cross-mode selection.
6. Implement Story and Prediction and pass their complete acceptance tests.
7. Implement Path History against the same state.
8. Implement Roots and the ordinary-fold linked views.
9. Implement Self-Hit as a Roots submode rather than another app.
10. Implement Branch Lab and its visible accept/reject reasons.
11. Integrate the existing Sandbox as the final mode.
12. Remove superseded duplicate calculations or display paths.
13. Run focused unit, integration, browser, accessibility, and generated-drift checks.

Do not stop after adding navigation chrome. The first accepted slice requires a working Story and Prediction flow whose answers come from the canonical root evaluator.

# Focused Tests

Add or update tests for:

1. one canonical state shared across all modes;
2. stable source, receiver, root, and branch identities across mode changes;
3. one-root Story reception with analytically known emission time;
4. Prediction answer generation from the root evaluator;
5. incorrect-answer explanation and retry;
6. zero-crossing count equals wake-intersection count equals active-root count;
7. synchronized $T_r$ and $T_t$ across plot, scene, ledger, and readout;
8. no end-user `c()` delay-map label;
9. ordinary-fold $\Delta N=\pm2$ behavior;
10. pointwise acceleration spike displayed separately from finite accumulated velocity change;
11. coincident same-source root birth remains unresolved and is not assigned the ordinary-fold verdict;
12. self-hit absent, tangent, active, unresolved, and failed-floor states;
13. every accepted and rejected branch remains visible with reason;
14. branch contributions and displayed vector sum use identical rows;
15. Story-to-Sandbox and Sandbox-to-Story state continuity;
16. representative mock, EOM replay, and unavailable-provider authority labels;
17. keyboard operation, focus order, reduced motion, and text-equivalent state;
18. no force-language regression in new UI copy; and
19. no separate Roots product route or second root evaluator; direct mode selection remains on `causal-delay-feedback.html?mode=roots`.

Use independently known closed-form fixtures for the simple-root and ordinary fold mathematics. Agreement between two consumers of the same production evaluator proves synchronization, not mathematical correctness.

# Browser QA

Extend the focused browser QA script and inspect the actual runtime at minimum in these scenarios:

1. desktop Story and first Prediction round;
2. 390-by-844 portrait Story and Prediction;
3. keyboard-only progression through Story, answer choice, Path History, and Sandbox;
4. reduced-motion Story and ordinary-fold Roots mode;
5. a Roots fold with synchronized plot, wake scene, ledger, and accumulated velocity view;
6. a self-hit unresolved or failed-floor case;
7. a Branch Lab case with both accepted and rejected rows; and
8. EOM replay unavailable or incomplete data, which must fail visibly and preserve the teaching/runtime authority label.

Capture browser warnings and errors. Treat a clean source test with a broken rendered interaction as a feature failure.

# Acceptance Criteria

The task is complete only when:

- Story and Prediction are usable without operator explanation;
- every Prediction answer comes from the canonical evaluator;
- Path History, Roots, Self-Hit, Branch Lab, and Sandbox are stages of one app;
- all stages share one causal-history state, root evaluator, wake renderer, and source/receiver geometry;
- delay-map zero crossings, wake intersections, root count, $T_t$, and $T_r$ agree exactly;
- the end-user delay-map label is $g(T_r;T_t)$ rather than provisional `c()`;
- ordinary-fold pointwise acceleration and finite accumulated velocity change are visually and numerically distinct;
- coincident same-source root birth remains not advanced;
- all architrino-level language is acceleration-first;
- the stronger physical causal-delay solver remains visibly open;
- desktop, portrait, keyboard, reduced-motion, and high-contrast QA pass;
- focused tests pass;
- `git diff --check` passes;
- changed relative Markdown links pass;
- strict content and scene checks appropriate to the changed files pass; and
- generated drift is reported without running generator `--write` commands unless separately authorized.

# Validation And Reporting

Determine exact live commands from the repository rather than copying stale inventories. At minimum run the focused Node tests, the browser QA script, `git diff --check`, strict content validation, strict scene-graph checking, and check-only generators affected by the edit.

Report:

1. the learner-visible result;
2. the canonical state/evaluator/renderer ownership;
3. the Story and Prediction flow;
4. later mode integration;
5. notation resolution;
6. ordinary-fold versus coincident same-source treatment;
7. solver and claim boundaries;
8. accessibility and browser QA;
9. every file changed;
10. every validation command and result;
11. generated drift; and
12. remaining blockers.

Distinguish measured browser behavior, derived closed-form fixture results, implementation facts, and design decisions. Preserve unrelated changes.

Closure goal: Deliver one causal-delay learning progression whose simple Story and advanced root diagnostics are different views of the same causal history, while keeping the stronger physical solver obligation open.
