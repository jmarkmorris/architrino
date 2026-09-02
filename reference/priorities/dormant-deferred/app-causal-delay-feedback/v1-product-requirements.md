# Causal Delay Feedback Current Product Requirements

This document is the durable authority for the accepted Causal Delay Feedback learner surface. The immediate implementation lane is closed. The executable source remains `causal-delay-feedback.html`, `src/apps/causal-delay-feedback/`, and the focused CDF tests.

## Status And Purpose

- Route: `causal-delay-feedback.html`
- Direct Roots link: `causal-delay-feedback.html?mode=roots`
- Default learner mode: `story`
- Live surface: eight ordered lessons followed by Roots and Laboratory
- Product posture: canvas-first, low-control, public teaching surface
- Implementation posture: one shared runtime, learner state, causal-root evaluator, timed-path sampler, and wake renderer
- Evidence posture: display-only

The app teaches that a present reception depends on an earlier transmission point because the wake takes time to travel. It does not establish the physical correctness of a trajectory, interaction law, retained branch, binding state, or stability result.

Plainly: the app explains causal-delay geometry. It is not a numerical physics acceptance instrument.

## Accepted Learner Copy

The following titles and bodies are exact accepted copy. Do not revise, append disclaimers to, or paraphrase them without an operator-directed copy change.

| Lesson | Id | Exact title | Exact body |
| --- | --- | --- | --- |
| 1 | `meet` | `Meet the Electrino and Positrino Transceivers` | `Each architrino transmits continuously at a constant rate. The solid dot on each body marks its current emission point. Earlier transmission points remain visible as wake history. Each full circle is a two-dimensional view of an expanding spherical wake. Wakes emitted earlier have had longer to expand, so they have a larger radius.` |
| 2 | `emission` | `Wakes Received Now Were Transmitted in the Past` | `Wakes arriving at a receiver now were transmitted earlier in the transmitter’s path history. The fading red and blue arcs show where the transmissions arriving now were emitted. The white dot marks where that wake was transmitted. By the time the wake is received, both architrinos have moved on from their earlier positions.` |
| 3 | `meaning` | `Two Reciprocal Causal Relationships` | `Each full circle is a two-dimensional view of an expanding spherical wake. The matching fading red or blue arc highlights the portion that meets the other architrino. The circle and the arc share the same earlier transmission point and the same reception point.` |
| 4 | `motion` | `Motion Changes Wake Shape` | `For a moving architrino, the wake is compressed in front and expanded behind. These evaluator-backed display fixtures use the same transmission times with C_f=1; only transmitter speed changes. Higher speed tightens the fronts ahead and spreads them farther behind.` |
| 5 | `forward-buildup` | `Wake Buildup at Field Speed` | `At field speed, each architrino moves with the advancing edge of the wakes it continually emits. As successive wakes expand, their forward edges stay together at the moving front. The wake builds up there.` |
| 6 | `inverse-square-spreading` | `Wake Strength Decreases as it Expands` | `Both architrinos remain fixed. They emit wakes continuously at a constant rate. The emission spreads over the growing spherical wakefront area, 4πR². As radius R grows, the acceleration action on a receiving architrino decreases as 1/R².` |
| 7 | `superposition` | `Wakes Combine by Superposition` | `Lower blue electrino: t=0. Red positrino: 25%. Middle blue electrino: 50%. All three advance together. Two selected electrino wakes reach the red positrino. White component arrows trace back along the fading arcs, with the nearer contribution larger; the downward white arrow is their net acceleration. Only these two incoming wakes are shown. Display-only: no physical acceleration law, measured magnitude, binding, stability, or solved trajectory.` |
| 8 | `continuous-delayed-feedback` | `Continuous Delayed Feedback` | `This illustration samples how delayed feedback flows back and forth between two architrinos. The underlying interaction is continuous: an arriving wake applies acceleration to its receiver, while every contribution still arrives after a delay.` |

Lesson Three also carries these exact relationship lines:

- `Relationship One` — `Electrino transmitter → Positrino receiver`
- `Relationship Two` — `Positrino transmitter → Electrino receiver`

The Laboratory title is exactly `Causal Delay Laboratory`. Lesson Four’s selector label is exactly `Compare transmitter speeds`, with declared choices `0.3 C_f`, `0.6 C_f`, and `0.9 C_f`.

Plainly: source, accessible summaries, tests, and browser-proof expectations must move together whenever an authorized copy change occurs.

## Accepted Surface

- Keep the persistent lesson-and-tools list in the order above, followed by Roots and Laboratory.
- Keep the standard top-right Home, Search, previous-view, and next-view controls.
- Keep one shared bottom timeline rail with First frame, Play/Pause, Last frame, and the scrubber.
- Keep the timeline aligned to the chart’s time axis and clear of the chart, copy panel, and app controls at desktop and phone widths.
- Keep one mutually exclusive `Arcs` or `Full` wake-display control. Selecting one turns the other off.
- Keep one fixed learner display with no Settings surface, gear, canvas-theme picker, animation-speed control, architrino-speed control, or reset-preset menu.
- Keep the purple canvas atmosphere, Helvetica-family typography, red positrino treatment, and lighter-blue electrino treatment.
- Keep Lesson Four speed selection lesson-local: a changed speed returns that lesson to its first frame, stops playback, clears completion/resume state, and preserves the selected speed.
- Keep Lessons Two and Three joined at the accepted shared handoff frame.
- Keep Lesson Five at emission zero on entry, with no inherited wake history. Its emitted fronts remain circular in screen space and no front may lead the body.
- Keep Lesson Six bodies fixed while equal-interval wakes expand.
- Keep Lesson Seven to the declared three-body fixture, exactly two selected incoming wakes, two component arrows, and one net-acceleration arrow.
- Keep Lesson Eight’s sampled active pair and accumulated frozen screen history visibly distinct.
- Keep Laboratory direct manipulation limited to the established canvas interactions. Endpoint ornaments and initial-velocity handles remain hidden even where internal hit or preview helpers exist.

## Architecture

The live learner route has three modes:

1. `story` renders the eight lessons.
2. `roots` renders the existing causal-root exploration through the shared learner state and evaluator.
3. `sandbox` renders Laboratory.

The implementation is organized around:

- `main.js` for route bootstrap and replay-provider selection;
- `CausalDelayFeedbackRuntime.js` for the single canvas runtime and interaction state;
- `CausalDelayFeedbackModeController.js` for the ordered lesson/Roots/Laboratory surface;
- `CausalDelayFeedbackStoryMode.js`, `CausalDelayFeedbackInverseSquareMode.js`, and `CausalDelayFeedbackSuperpositionMode.js` for declared lesson fixtures;
- `CausalDelayFeedbackCausalHistory.js` for normalized causal-root evaluation and display authority;
- `CausalDelayFeedbackRootsMode.js` for the Roots projection of that shared evaluation;
- `CausalDelayFeedbackTimedPath.js` for the shared path sampler; and
- `CausalDelayFeedbackWakeRenderer.js` for wake geometry and rendering.

The `mode` query selects a view without loading another application shell. Mode selections use browser history, browser Back/Forward restores the matching view in the same runtime, and unrelated replay parameters and URL fragments remain intact. The default `story` mode omits the query; the supported Roots direct link is `?mode=roots`.

Do not create duplicate product routes, lesson routes, state stores, evaluators, path samplers, root finders, or wake renderers. Roots is a live mode of Causal Delay Feedback, while the other internal history and branch helpers are not separate live learner modes and should not be documented as current navigation.

Plainly: every lesson and Laboratory should agree about paths, timing, root identity, and wake geometry because they use one coherent implementation.

## Replay And EOM Provenance

The app does not invoke the EOM solver as an active animation or recomputation path.

By default, `main.js` selects `CausalDelayFeedbackEomReplayAdapter.js` unless an explicit mock query is present. The adapter accepts only a supplied recorded `eom_evolution_contract/v0` dataset; an ordinary route with no injected record therefore falls back to the representative teaching replay. When a record is supplied, the adapter projects its recorded time-position samples onto the canvas and preserves the record-carried `engineId`, `claimGrade`, `evidenceStatus`, run id, window, and worldline-role provenance. It does not run the EOM solver, recompute the record, infer delayed hits, or accept canvas edits as solver input. Recorded datasets without delayed-hit rows carry `causalEvaluation.enabled=false` and `reason=record_has_no_delayed_hit_rows`.

The record’s own evidence metadata and the app’s display authority are separate:

- record provenance says what the supplied record claims about itself;
- the CDF viewer always labels its use as `recorded_eom_path_display`, `evidenceStatus: "display-only"`, and `physicsAcceptance: false`.

If no recorded dataset is supplied or the provider is unavailable, the runtime uses `representative_mock_solver_replay` through `temporary_mock_adapter`. That dataset is a representative teaching fixture shaped like replay output. It is not solver output or independent numerical evidence.

Canvas path edits are local teaching previews. They do not alter a recorded EOM record, rerun a solver, or gain physics authority.

Plainly: a recorded path can be displayed faithfully while the display still proves nothing about delayed-hit correctness or physical acceptance.

## Numerical And Claim Boundaries

- Numerical teaching fixtures use normalized field-speed units with $c_f=1$.
- At architrino level, use acceleration language rather than force language.
- Story fixtures, evaluator-derived geometry, representative replay, local previews, and browser parity remain display-only.
- Lesson Six’s accepted $1/R^2$ learner statement is scoped to its declared spherical spreading fixture; the app does not independently establish a general physical interaction law.
- Lesson Seven explicitly establishes no physical acceleration law, measured magnitude, binding, stability, or solved trajectory.
- Lesson Eight’s frozen arcs are retained screen history in a teaching animation, not a solved continuous trajectory or numerical validation.
- Recorded EOM paths do not supply delayed-hit rows merely because they came from an EOM record.
- Same-implementation replay or matching browser pixels establish determinism and display conformance only.

## Validation Authority

Use the focused CDF suite as the executable requirement check:

```text
node --test tests/causal-delay-feedback-*.test.js
```

Use `scripts/capture-causal-delay-feedback-browser-qa.mjs` for current served-browser proofs. Its PNG outputs are reproducible review artifacts rather than durable requirements.

Retain:

- `browser-qa/stage-0-golden-baseline.json`
- `browser-qa/stage-0-transition-matrix.json`

Those two JSON files are live inputs to `tests/causal-delay-feedback-stage0-baseline.test.js` and `scripts/run-causal-delay-feedback-stage0-browser-matrix.mjs`.

## Reopening Rules

There is no active build queue. A new task belongs in [work-queue.md](work-queue.md) only when it names:

- the learner-visible request or reproducible regression;
- the exact preserved copy and excluded scope;
- the relevant claim boundary;
- focused source/test coverage; and
- any required current served-browser confirmation.

Verified micro-fixes, superseded proposals, rejected visual variants, and old screenshots belong in Git history unless they establish one of the durable requirements above.
