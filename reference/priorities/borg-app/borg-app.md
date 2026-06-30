# Borg App

## Workstream Metadata

- Kind: `priority`
- Status: `design-open`
- Claim level: `priority-design`
- Primary design packet: [requirements-and-design](requirements-and-design.md)
- Face boundary replay packet: [face-boundary-replay](face-boundary-replay.md)
- Native bridge audit packet: [native-bridge-audit-and-first-screen](native-bridge-audit-and-first-screen.md)
- Dataset manifest packet: [borg-dataset-manifest.v1](borg-dataset-manifest.v1.md)

## Scope

This workstream defines the app-facing design lane for an interactive finite-window simulation surface. The app target is a cubic simulation window for an unbounded-universe approximation. The operator can choose scale, architrino initial conditions, path-history policy, wake-history policy, statistical face-boundary policy, and display diagnostics while the production simulation path remains the native central solver.

The workstream is not an implementation license for a new solver. Missing motion, causal-root, delayed-hit, path-history, wake-history, face-boundary, or simulation-window stepping capabilities must extend the central solver contract, native implementation, bridge schema, and validation fixtures.

## Current Decisions

1. Use `reference/priorities/borg-app/` as the priority-side working directory for design, requirements, and build handoffs.
2. Keep the priority index and the detailed requirements/design packet separate. The index tracks status and task order; the design packet carries durable requirements and implementation constraints.
3. Model architrino primitives directly. Do not introduce assembly primitives as the app's base entities.
4. Do not assign physical mass to architrino primitives. Any numerical integration scalar must be labeled `integrationWeight` / `integrationWeights`, not physical mass.
5. Treat the first app model as a finite cubic simulation window in an unbounded-universe approximation, with an outer computed cube and a displayed interior central cube.
6. Treat exiting architrinos at the outer computed faces as outbound face events; later inbound entries are boundary-generated unless retained external path history is present.
7. Preserve path history and wake history as solver-owned data products, with app controls and visualization reading from solver manifests, streams, checkpoints, wake rows, boundary rows, and diagnostics.
8. Keep the UI minimal, elegant, contemporary, and parsimonious by default, while still exposing required solver state, wake history, path history, face-boundary status, velocity rays, and fail-closed diagnostics when the run or selected object needs them.
9. Use optional viewport layers for path history, wake streams, velocity rays, face-boundary status, and diagnostics so the default screen stays streamlined without losing inspectability.
10. Support 3D viewport rotation and zoom as camera controls only; visual navigation must not change side length, causal speed, solver precision, or simulation-envelope fields.
11. Use the first logarithmic UI prototype rules for scale, velocity rays, wake strength, and timeline navigation, while always exposing exact solver values and whether a displayed quantity is linear, logarithmic, normalized, or display-only.
12. Use the first-screen layer control layout to keep `simulation-window` and `architrino-position` visible by default, place path history, wake streams, velocity rays, face-boundary status, and outbound-face background behind toggles, and route selected-object details to compact tags plus the diagnostics rail.
13. Require every run and displayed solver-derived value to carry visible error-budget and value-authority status, including global, stage-level, and selected-object error information where available.
14. Use the first diagnostic status vocabulary for displayed values: `authoritative-solver-output`, `app-facing-projection`, `display-only-visualization`, `missing-error-budget`, `exceeded-error-budget`, and `fail-closed-value`.
15. Treat outbound cube-face architrino and wake statistics as a candidate unbounded-window boundary model; replayed statistical boundary rows must never replace retained local wake rows, retained local path history, or same-record causal-root evidence.
16. Interpret primary results in a declared `centralVolume`; the displayed `centralArchitrinoCount` is not the total solver `architrinoCount` when `faceBufferMargin` is nonzero, and the outer computed count must be derived from central number density and buffer volume.
17. The outer computed cube must provide a `faceBufferMargin` that satisfies $b_{\mathrm{face}}(\mathcal C)\ge\max(c_fh,\ v_{\max}T_{\mathcal C})$ for strict central-volume buffer status, or else statistical inbound architrinos and reconstructed wake history are admissible only when $R_{\mathrm{boundary\to central}}\le\tau_{\mathcal C}$.
18. Measure deployment budget separately from solver throughput: static bundle transfer, static asset transfer, browser heap, GPU memory, browser storage, GitHub Pages bandwidth, GitHub Actions artifacts, and native solver throughput are distinct budgets.
19. Use `borg-dataset-manifest.v1` as the first app-facing run cover sheet, but defer save, export, import, and load workflows until the first-screen contract and native-backed fixture are stable.

## Task Queue

1. `requirements_design_packet` — Maintain the first requirements and design packet for the Borg app, including scale controls, initial conditions, native solver boundary, path-history retention, wake-history retention, face-boundary replay, diagnostics, and claim-level limits. Status: `complete`; source: [requirements-and-design](requirements-and-design.md).
2. `native_solver_capability_gap` — Compare the requirements packet against the current native solver bridge and list missing capabilities as central-solver contract extensions, not app-local solver work. Status: `pending-refresh`; source: [native-bridge-audit-and-first-screen](native-bridge-audit-and-first-screen.md). Current boundary: native stepping, initial conditions, current state, checkpoints, trajectory frames, and bounded trails exist; statistical face-boundary rows, retained wake rows, diagnostic status manifests, durable path-history streams, and 3-D first-screen app behavior remain gaps.
3. `logarithmic_ui_prototype_rules` — Define the first logarithmic UI prototype rules for scale, velocity rays, wake strength, and timeline navigation while keeping exact solver values visible. Status: `complete`; source: [requirements-and-design](requirements-and-design.md).
4. `first_screen_control_layout` — Define the first-screen control layout for camera navigation, layer toggles, and simulation-envelope scale controls so visual zoom and physical simulation scale are impossible to confuse. Status: `complete`; source: [requirements-and-design](requirements-and-design.md).
5. `first_screen_layer_control_layout` — Define the first-screen layer control layout: default-visible layers, toggle-hidden layers, contextual layers, and selected-object diagnostics behavior. Status: `complete`; source: [requirements-and-design](requirements-and-design.md).
6. `smallest_elegant_first_screen` — Identify the smallest elegant first-screen design that still shows scale, initial conditions, path history, wake history, face-boundary status, and fail-closed diagnostics under the current native bridge boundary. Status: `complete`; source: [native-bridge-audit-and-first-screen](native-bridge-audit-and-first-screen.md).
7. `app_surface_design` — Draft the first operator-facing screen model: minimal, elegant, contemporary simulation-window scale controls, initial-condition editor, logarithmic UI exploration, run controls, playback, 3D rotate/zoom, optional viewport layers, path-history view, wake-history view, velocity-ray mode, face-boundary status, and diagnostics. Status: `pending`; depends on: `native_solver_capability_gap`, `logarithmic_ui_prototype_rules`, `first_screen_control_layout`, `first_screen_layer_control_layout`, and `smallest_elegant_first_screen`.
8. `face_boundary_replay_schema` — Define the first unbounded-window face-boundary schema: outbound architrino path statistics, inbound replay path rows, self-similar replay run, wake reconstruction from paths, and $R_{\mathrm{face\ replay}}$ pass/fail threshold. Status: `complete`; source: [face-boundary-replay](face-boundary-replay.md).
9. `six_face_boundary_noise_policy` — Define the first self-similar reduced-model policy that turns outgoing architrino path records from all six cube faces into artificial inbound path inputs after a history-hiding transform; wakes are reconstructed from paths through the declared path-index policy. Status: `pending`; source: [face-boundary-replay](face-boundary-replay.md); depends on: `face_boundary_replay_schema`, `central_volume_boundary_budget`, and `dataset_manifest_contract`. The pass/fail criterion is central-volume residual control, not wake-magnitude drop alone. The possible Noether sea gradient or gravity-relevant signal is future-only and not part of the first benign-noise fixture.
10. `diagnostic_status_vocabulary` — Define the first app diagnostic status vocabulary for authoritative solver output, app-facing projection, display-only visualization, missing error budget, exceeded error budget, and fail-closed value. Status: `complete`; source: [requirements-and-design](requirements-and-design.md).
11. `simulation_envelope_wake_row_rule` — Define the simulation-envelope rule that separates resolved wake rows, aggregated wake-noise/background rows, boundary-generated rows, and forbidden silent truncation. Status: `complete`; source: [requirements-and-design](requirements-and-design.md).
12. `integration_weight_contract` — Keep architrino mass out of the app contract and label any numerical integration scalar as `integrationWeight` / `integrationWeights`. Status: `complete`; source: [requirements-and-design](requirements-and-design.md).
13. `central_volume_boundary_budget` — Define the central-volume observation rule: the solver may calculate an outer computed cube while the viewport displays an interior central cube; boundary-generated inbound architrinos are new identities with reconstructed wake history; strict central-volume buffer status requires $b_{\mathrm{face}}(\mathcal C)\ge\max(c_fh,\ v_{\max}T_{\mathcal C})$, otherwise central-volume values require $R_{\mathrm{boundary\to central}}\le\tau_{\mathcal C}$ or a fail-closed downgrade. Status: `complete`; source: [requirements-and-design](requirements-and-design.md), [face-boundary-replay](face-boundary-replay.md).
14. `population_count_split` — Derive total solver `architrinoCount` from displayed `centralArchitrinoCount`, central side length, and buffer margin so exterior computed architrinos protect the central cube without being counted as the primary observation set. Status: `complete`; source: [requirements-and-design](requirements-and-design.md).
15. `deployment_budget_split` — Measure bundle size, static asset transfer, GitHub Pages bandwidth, browser heap, GPU memory, browser storage, GitHub Actions artifacts, and native solver throughput as separate budgets. Status: `complete`; source: [requirements-and-design](requirements-and-design.md).
16. `dataset_manifest_contract` — Define `borg-dataset-manifest.v1` as the app-facing run cover sheet, with fields for topology, simulation envelope, outer computed side length, displayed central volume, buffer margin, central architrino count, outer computed architrino count, buffer architrino count, deployment budget fields, central-volume velocity bound, central observation interval, initial conditions, current state frames, trajectory/path-history sources, native bridge status, diagnostic status, value authority, explicit gap rows for wake history, outbound/inbound face-boundary replay, error budget, candidate/resolved/aggregated/failure wake row conservation, boundary-to-central residual status, and retained-local versus boundary-generated evidence status. Do not include save, export, import, or load workflow design in this task. Status: `complete`; source: [borg-dataset-manifest.v1](borg-dataset-manifest.v1.md).
17. `first_native_backed_fixture` — Select the smallest native-backed finite-window run that emits `borg-dataset-manifest.v1` while exercising scale, face crossings, path-history replay, and at least one wake-history or boundary-status diagnostic without making proof-level claims. Status: `pending`; depends on: `dataset_manifest_contract` and `six_face_boundary_noise_policy`.
18. `save_export_import_load_workflows` — Design saving, exporting, importing, and loading app datasets after the manifest contract, first-screen app surface, and first native-backed fixture are stable. Status: `deferred`; depends on: `dataset_manifest_contract`, `app_surface_design`, and `first_native_backed_fixture`.

## Normal Workflow Pattern

Yes: this follows the normal priority workflow pattern for an app or theory-adjacent build that is not ready to become canonical corpus prose or production app code. The priority directory holds the live workstream, and the separate design packet prevents the priority index from becoming a large requirements document.

The expected promotion path is:

1. keep design and open obligations in this priority directory;
2. move implementation into the appropriate app and solver paths only after the native-solver capability gap is explicit;
3. promote only stable explanatory material into `content/markdown/aaa` when the claim level is evidence-bound and no longer merely app-design guidance.
