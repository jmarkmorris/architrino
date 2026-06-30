# T3 App

## Workstream Metadata

- Kind: `priority`
- Status: `design-open`
- Claim level: `priority-design`
- Primary design packet: [requirements-and-design](requirements-and-design.md)
- Outbound face replay packet: [outbound-face-wake-replay](outbound-face-wake-replay.md)
- Native bridge audit packet: [native-bridge-audit-and-first-screen](native-bridge-audit-and-first-screen.md)

## Scope

This workstream defines the app-facing design lane for an interactive T3 simulation surface. The app target is a periodic T3 sandbox where the operator can choose scale, architrino initial conditions, path-history policy, wake-history policy, and display diagnostics while the production simulation path remains the native central solver.

The workstream is not an implementation license for a new solver. Missing motion, causal-root, delayed-hit, path-history, wake-history, or T3 stepping capabilities must extend the central solver contract, native implementation, bridge schema, and validation fixtures.

## Current Decisions

1. Use `reference/priorities/t3-app/` as the priority-side working directory for design, requirements, and build handoffs.
2. Keep the priority index and the detailed requirements/design packet separate. The index tracks status and task order; the design packet carries durable requirements and implementation constraints.
3. Model architrino primitives directly. Do not introduce assembly primitives as the app's base entities.
4. Do not assign physical mass to architrino primitives. Any `mass` or mass-like field entering a comparison run remains a numerical integration weight, comparison-kernel parameter, or legacy/toy interaction coefficient.
5. Treat the T3 universe as a periodic cube with a fundamental domain and universal-cover image labels, not as 27 independent neighboring cubes containing duplicate architrinos.
6. Preserve path history and wake history as solver-owned data products, with app controls and visualization reading from solver manifests, streams, checkpoints, wake rows, and diagnostics.
7. Keep the UI minimal, elegant, and contemporary by default, while still exposing required solver state, wake history, path history, winding labels, velocity vectors, and fail-closed diagnostics when the run or selected object needs them.
8. Use optional viewport layers for path history, expanding wake streams, velocity arrows, winding labels, and diagnostics so the default screen stays streamlined without losing inspectability.
9. Support 3D viewport rotation and zoom as camera controls only; visual navigation must not change T3 scale, side length, causal speed, solver precision, or simulation-envelope fields.
10. Use the first logarithmic UI prototype rules for scale, velocity arrows, wake strength, and timeline navigation, while always exposing exact solver values and whether a displayed quantity is linear, logarithmic, normalized, or display-only.
11. Use the first-screen control layout to keep camera navigation, viewport layer toggles, and simulation-envelope scale controls in separate regions, with `view zoom`, `sideLength`, `scaleFactor`, `historyDepth`, and `wakeHorizon = c_f h` labeled separately.
12. Use the first-screen layer control layout to keep `fundamental-domain` and `architrino-position` visible by default, place path history, wake streams, velocity vectors, winding labels, and outbound-face background behind toggles, and route selected-object details to compact tags plus the diagnostics rail.
13. Require every run and displayed solver-derived value to carry visible error-budget and value-authority status, including global, stage-level, and selected-object error information where available.
14. Use the first diagnostic status vocabulary for displayed values: `authoritative-solver-output`, `app-facing-projection`, `display-only-visualization`, `missing-error-budget`, `exceeded-error-budget`, and `fail-closed-value`.
15. Treat outbound cube-face wake statistics as a candidate background/noise replay model only for unresolved or subthreshold wakes; replayed statistical noise must never replace retained wake rows, winding labels, or same-record causal-root evidence.
16. Keep T3 results candidate-level unless same-record retained evidence binds a run to the relevant causal-root, branch row, and wake-history records.

## Task Queue

1. `requirements_design_packet` — Create the first requirements and design packet for the T3 app, including topology, scale controls, initial conditions, native solver boundary, path-history retention, wake-history retention, diagnostics, and claim-level limits. Status: `complete`; source: [requirements-and-design](requirements-and-design.md).
2. `native_solver_capability_gap` — Compare the requirements packet against the current native T3 solver bridge and list missing capabilities as central-solver contract extensions, not app-local solver work. Status: `complete`; source: [native-bridge-audit-and-first-screen](native-bridge-audit-and-first-screen.md). Current boundary: native T3 stepping, topology, initial conditions, current state, image offsets, checkpoints, trajectory frames, and bounded trails exist; retained wake rows, wake winding labels, outbound-face replay, diagnostic status manifests, durable T3 path-history streams, and 3-D first-screen app behavior remain gaps.
3. `logarithmic_ui_prototype_rules` — Define the first logarithmic UI prototype rules for scale, velocity arrows, wake strength, and timeline navigation while keeping exact solver values visible. Status: `complete`; source: [requirements-and-design](requirements-and-design.md).
4. `first_screen_control_layout` — Define the first-screen control layout for camera navigation, layer toggles, and simulation-envelope scale controls so visual zoom and physical T3 scale are impossible to confuse. Status: `complete`; source: [requirements-and-design](requirements-and-design.md).
5. `first_screen_layer_control_layout` — Define the first-screen layer control layout: default-visible layers, toggle-hidden layers, contextual layers, and selected-object diagnostics behavior. Status: `complete`; source: [requirements-and-design](requirements-and-design.md).
6. `smallest_elegant_first_screen` — Identify the smallest elegant first-screen design that still shows scale, initial conditions, path history, wake history, winding labels, and fail-closed diagnostics under the current native bridge boundary. Status: `complete`; source: [native-bridge-audit-and-first-screen](native-bridge-audit-and-first-screen.md).
7. `app_surface_design` — Draft the first operator-facing screen model: minimal, elegant, contemporary T3 scale controls, initial-condition editor, logarithmic UI exploration, run controls, playback, 3D rotate/zoom, optional viewport layers, path-history view, wake-history view, velocity-vector mode, winding/image labels, and diagnostics. Status: `pending`; depends on: `native_solver_capability_gap`, `logarithmic_ui_prototype_rules`, `first_screen_control_layout`, `first_screen_layer_control_layout`, and `smallest_elegant_first_screen`.
8. `outbound_face_wake_replay_schema` — Define the first outbound-face wake summary schema and validation fixture: explicit-wrap run, face-summary extraction, statistical replay run, and $R_{\mathrm{face\ replay}}$ pass/fail threshold. Status: `complete`; source: [outbound-face-wake-replay](outbound-face-wake-replay.md).
9. `diagnostic_status_vocabulary` — Define the first T3 app diagnostic status vocabulary for authoritative solver output, app-facing projection, display-only visualization, missing error budget, exceeded error budget, and fail-closed value. Status: `complete`; source: [requirements-and-design](requirements-and-design.md).
10. `dataset_manifest_contract` — Define `t3-app-dataset-manifest.v1` with fields for topology, simulation envelope, initial conditions, current state frames, trajectory/path-history sources, native bridge status, diagnostic status, value authority, and explicit gap rows for wake history, winding labels, outbound-face replay, and error budget. Status: `pending`; depends on: `native_solver_capability_gap`, `smallest_elegant_first_screen`, `outbound_face_wake_replay_schema`, `diagnostic_status_vocabulary`, `logarithmic_ui_prototype_rules`, `first_screen_control_layout`, and `first_screen_layer_control_layout`.
11. `first_native_backed_fixture` — Select the smallest native-backed T3 run that exercises scale, image offsets, path-history replay, and at least one wake-history diagnostic without making proof-level claims. Status: `pending`; depends on: `dataset_manifest_contract`.

## Normal Workflow Pattern

Yes: this follows the normal priority workflow pattern for an app or theory-adjacent build that is not ready to become canonical corpus prose or production app code. The priority directory holds the live workstream, and the separate design packet prevents the priority index from becoming a large requirements document.

The expected promotion path is:

1. keep design and open obligations in this priority directory;
2. move implementation into the appropriate app and solver paths only after the native-solver capability gap is explicit;
3. promote only stable explanatory material into `content/markdown/aaa` when the claim level is evidence-bound and no longer merely app-design guidance.
