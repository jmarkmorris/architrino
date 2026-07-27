# Borg App Code Review — 2026-07-24

Status: reconciled against current Borg source and tests on 2026-07-26. This packet preserves the review history and the remaining engineering follow-up; it is not solver, physics, or acceptance evidence. The original findings were rechecked against the live implementation rather than carried forward from their 2026-07-24 line numbers.

## Current Verdict

One current contract failure remains: the master-equation source snapshot hash in `reference/priorities/app-eom/master-eom-binding-v1.md:14` is stale again. One non-blocking architecture follow-up also remains: the Borg composition root and its full-row panel rendering are still large and coupled. All original correctness, state-isolation, replay-provenance, HTTP-lifecycle, and bounded-history findings are closed in current source with the evidence below.

`node --test tests/borg-*.test.js` currently reports 164 passes and one failure. The failure is `tests/borg-eom-migration.test.js:492-516`: the binding record pins `9ec3045d316bcbcc60dc3e61fcfaad4642b83af857024856f6684364ef7cab4d`, while the live `content/markdown/aaa/dynamics/master-equation.md` hashes to `f1ae1137484b7c5367eb094ad49a0bfdfb72161d21aa06556de4e0ba2d99d72c`.

Plainly: the Borg repairs are still present. The suite is red because a provenance receipt points to an older version of the master-equation document, not because a reviewed Borg runtime path regressed.

## Remaining Actionable Findings

### A1. Refresh or redesign the master-equation source snapshot binding — confirmed

- **Current evidence:** `reference/priorities/app-eom/master-eom-binding-v1.md:14` and `tests/borg-eom-migration.test.js:492-516`.
- **Claim grade:** measured contract-test failure plus directly recomputed SHA-256.
- **Scope:** app-EOM provenance contract; not a Borg application-behavior defect.
- **Remediation:** update the binding record through its owning app-EOM provenance procedure, or replace the repeatedly drifting whole-document pin with a stable, explicitly owned source snapshot whose update rule is enforced outside unrelated Borg runtime tests.
- **Acceptance condition:** `node --test tests/borg-*.test.js` passes 165/165 and the recorded digest equals a fresh SHA-256 of the declared source.
- **Dependency / duplicate:** this is the same recurring binding-pin issue recorded in the former second- and third-pass addenda. Keep one owner under `app-eom`; do not duplicate it in the Borg work queue.
- **Falsifier:** a fresh suite run passes without changing the binding record, or the test is shown to read a different declared source.

Plainly: either refresh the receipt each time its source changes, or redesign the receipt so ordinary theory-document edits do not repeatedly break a Borg contract test. This packet does not choose or execute that app-EOM policy change.

### A2. Decompose the runtime and measure before changing panel rendering — confirmed structure, inferred cost

- **Current evidence:** `src/apps/borg/BorgAppRuntime.js` is 4,235 lines; `src/apps/borg/BorgEomShadowRunner.js` is 1,324 lines; `src/apps/borg/BorgAssemblyViewControls.js` is 763 lines. Each accepted chunk still calls `renderSourceFields()` and `refreshDiagnosticsPanel()` at `BorgAppRuntime.js:3227-3229`, and `renderFieldRows()` clears and rebuilds its container at `:1065-1080`.
- **Claim grade:** derived structural observation. Runtime cost has not been profiled, so this packet makes no performance claim.
- **Remediation:** preserve the now-tested behavior while extracting focused owners for run-session orchestration, response/provenance normalization, exact-decimal utilities, panel row construction, run presets/budget measurement, and assembly-view presentation. Profile panel work before replacing full-row rebuilds with incremental updates.
- **Acceptance condition:** existing Borg tests remain green; new module tests own moved contracts; source-text pins in `tests/borg-eom-runtime-contract.test.js` move with their owners; a browser interaction pass shows unchanged run/replay controls and no console errors. Any performance claim additionally requires before/after wall-time or browser-profile evidence.
- **Dependency / duplicate:** this single item absorbs the original full-panel-rebuild performance note and the runtime, controls, and shadow-runner reorganization proposal. `BorgWorkspaceState.js`, `BorgSceneDisposal.js`, shared cubic-history evaluation, and `BorgLivePlaybackController.js` are completed partial extractions, not separate open findings.
- **Falsifier:** the named responsibilities are already owned by focused modules with the composition root limited to wiring, or profiling shows panel work is negligible and no maintainability objective remains.

Plainly: the remaining code concern is organization, not a known wrong result. Split it only behind the current regression net, and do not advertise a speedup until it is measured.

## Finding-by-Finding Current Adjudication

Every `closed` disposition below is falsified if its cited regression fails or the cited current path no longer enforces the stated boundary.

### Severity 1

| Original finding | Current disposition | Direct current evidence |
| --- | --- | --- |
| 1.1 Display trimming reached Claim-grade history | **Closed.** History-prefix release and client-window bounding are gated on `request.runGrade === "display"`. | `src/apps/borg/BorgEomHttpClient.js:57-86`; `tests/borg-eom-migration.test.js:1870-1947`. |
| 1.2 Certified evidence-status check was tautological | **Closed.** The client owns the completed-status allowlist and rejects an invented server status. | `src/apps/borg/BorgEomShadowRunner.js:37-40,964-972,1028-1037`; `tests/borg-eom-migration.test.js:1060-1076`. |

Plainly: Claim-grade continuations keep the retained past supplied to them, and a server cannot promote its own response by inventing an evidence label.

### Severity 2

| Original finding | Current disposition | Direct current evidence |
| --- | --- | --- |
| 2.1 Polarity ledger crossed workspaces | **Closed.** Workspace replacement rebuilds or resets the ledger. | `src/apps/borg/BorgAppRuntime.js:833-857,1496`; `tests/borg-polarity-diagnostics.test.js:38-54`. |
| 2.2 Snapshot restored stale asynchronous guards | **Closed.** Snapshot creation omits generation/prefill state and restore advances the live generation. | `src/apps/borg/BorgWorkspaceState.js:1-25`; `tests/borg-workspace-state.test.js:10-42`. |
| 2.3 Mount listeners leaked on dispose | **Closed.** One registration helper records removers and dispose drains them. | `src/apps/borg/BorgAppRuntime.js:2068-2072,2671-2696`; `tests/borg-eom-runtime-contract.test.js:554-556`. |
| 2.4 Tube state desynchronized on record switch | **Closed.** `setRecord()` resets selection and tube visibility; the scene regression checks the reset. | `src/apps/borg/BorgAssemblyViewScene.js:66-87`; `tests/borg-assembly-view-scene.test.js:127-185`. |
| 2.5 ArrowHelper selection did not reach child materials | **Closed.** Selection traverses each root object and updates child materials. | `src/apps/borg/BorgPrescribedAnalysisScene.js:204-230`; `tests/borg-prescribed-analysis-projection.test.js:364-390`. |
| 2.6 Replay contaminated live calibration | **Closed.** Budget and preset updates run only for an active EOM simulation. | `src/apps/borg/BorgAppRuntime.js:3170-3207`; `tests/borg-eom-runtime-contract.test.js:563-566`. |
| 2.7 Shared ArrowHelper geometry was disposed | **Closed.** Shared ArrowHelper geometry is excluded by the common scene-group disposer. | `src/apps/borg/BorgSceneDisposal.js:1-16`; `tests/borg-prescribed-analysis-projection.test.js:364-390`. |

Plainly: switching workspaces no longer mixes run state, record changes keep the scene and controls aligned, replay cannot train live-run limits, and scene cleanup no longer destroys shared Three.js geometry.

### Former 2.8 edge cases

| Original edge | Current disposition | Direct current evidence |
| --- | --- | --- |
| Hidden prescribed-load error | **Closed.** Failure also writes visible initial-condition feedback. | `src/apps/borg/BorgAppRuntime.js:1459-1465`. |
| Timeline `Math.min/max(...indexes)` spread | **Closed.** Timeline presentation handles large retained sets without argument spread. | `tests/borg-timeline-control.test.js:76-87`. |
| Numeric-equal seed cut rejected by token spelling | **Closed.** Numeric equality is preserved through the exact selected cut. | `src/apps/borg/BorgEomShadowRunner.js:307-320,591`; `tests/borg-eom-migration.test.js:637-669`. |
| Halted off-lattice frame-index collision | **Closed.** Frame indexes are forced strictly increasing. | `src/apps/borg/BorgEomShadowRunner.js:1151-1160`; `tests/borg-eom-migration.test.js:1122-1158`. |
| Zero delay horizon broke trail depth | **Closed.** Record trail depth falls back to a positive sample interval. | `src/apps/borg/BorgAssemblyViewSession.js:264-282`; `tests/borg-assembly-view-session.test.js:155-176`. |
| Runner-local history evaluator extrapolated or diverged | **Closed.** Dataset and runner share `EomCubicHistoryEvaluation.mjs`, including coverage and gap guards. | `src/apps/shared/EomCubicHistoryEvaluation.mjs:1-72`; `tests/borg-eom-history-evaluation.test.js:25-50`. |
| Retention boundary appeared in both partitions without explanation | **Closed.** The shared endpoint is documented as display-trail continuity, not duplicated solver state. | `src/apps/borg/BorgLiveRunRetentionPolicy.js:86-96`. |
| Negative rounded time and out-of-bounds stepping | **Closed.** Negative time formatting and bounded playback advance have regressions. | `src/apps/borg/BorgAppRuntime.js:2409-2511,4065-4077`; `tests/borg-eom-runtime-contract.test.js:99-106`; `tests/borg-timeline-control.test.js:10-87`. |
| String and numeric path keys split trails | **Closed.** Both retained and compacted trail maps normalize keys with `String(pathKey)`. | `src/apps/borg/BorgPathTrails.js:240-263,280-310`; `tests/borg-path-trails.test.js:212-265`. |

Plainly: the smaller failures now either have direct regression coverage or a current code invariant that explains the formerly ambiguous behavior.

### Provenance and labeling

| Original finding | Current disposition | Direct current evidence |
| --- | --- | --- |
| Replay described itself as live | **Closed.** Replay chunks carry recorded source/provenance and no live phase label. | `src/apps/borg/BorgEomRecordReplayRunner.js:53-81,125-148`. |
| Prescribed geometry used `recorded-eom-output` | **Closed.** Prescribed records use `recorded-prescribed-geometry`; evolved records retain recorded EOM wording without gaining authority. | `src/apps/borg/BorgEomRecordReplayRunner.js:53-58`; `tests/borg-eom-runtime-contract.test.js:312-353`. |
| Historical release sweep gated current EOM presets | **Closed.** The historical files are reference-only and current measurements cannot create ceilings without a current authorized budget. | `tests/borg-measured-run-presets.test.js:76-105,191-267`; `reference/priorities/app-borg/browser-claim-history-invalidation-2026-07-24.md:50-56`. |
| Root marker kinds asserted unconditional certification | **Closed.** Marker data carries producer completeness status without unconditional `certified-*` kinds. | `src/apps/borg/BorgPrescribedAnalysisScene.js:268-277`; `tests/borg-prescribed-analysis-projection.test.js:364-390`. |
| Allocation hash might be echo-only | **Falsified.** The Node process client independently canonicalizes and hashes allocations before the worker request. | `scripts/eom/BorgNativeEomProcessClient.mjs:455-478`; `tests/borg-eom-migration.test.js:1253-1352`. |

Plainly: replay remains a viewer, prescribed geometry is not relabeled as EOM output, historical browser budgets do not control the current runtime, and the process boundary recomputes the certified-budget digest rather than trusting an echo.

### Performance and HTTP lifecycle

| Original finding | Current disposition | Direct current evidence |
| --- | --- | --- |
| Per-frame Map and particle allocation | **Closed.** Interpolation reuses a scratch frame set and indexed destination rows. | `src/apps/borg/BorgAppRuntime.js:2074-2087,2481-2487,3970-4010`; `tests/borg-eom-runtime-contract.test.js:109-143,561`. |
| Per-frame replay action DOM churn | **Closed.** Replay action updates occur only while playback is stopped. | `src/apps/borg/BorgAppRuntime.js:2187-2201`. |
| Hot-path linear frame-set lookup | **Closed.** Frame-set and frame-row maps are rebuilt with the buffer and used by active-frame paths. | `src/apps/borg/BorgAppRuntime.js:354-360,861,1906,2074-2087,2135`. |
| Provider rehashed and revalidated on every request | **Closed.** Digest and validated projection caches are record-keyed; rejected promises are evicted and `clearCache()` resets both. | `src/apps/borg/BorgPrescribedAnalysisProvider.js:34-84,167-172`; `tests/borg-prescribed-analysis-projection.test.js:237-305`. |
| Replay grew hidden live trails | **Closed.** Trail rebuild/append is gated on `!replayActive`. | `src/apps/borg/BorgAppRuntime.js:3210-3219`; `tests/borg-eom-runtime-contract.test.js:566`. |
| Full panel rebuilds | **Open only as A2.** Static inspection shows rebuilds; no measured cost claim is retained. | `src/apps/borg/BorgAppRuntime.js:1065-1080,3227-3229`. |
| `preserveDrawingBuffer` paid continuously | **Closed.** The renderer disables it and export renders immediately before `toDataURL()`. | `src/apps/borg/BorgAppRuntime.js:374,1705-1711`; `tests/borg-eom-runtime-contract.test.js:556-560`. |
| Flat timeout, unclassified HTTP errors, unbounded DELETE, implicit abandoned-run cleanup | **Closed.** Claim and Display timeouts are separate, HTTP failures carry status/retry classification without automatic evolution retry, DELETE is bounded, and dispose releases the remote run. | `src/apps/borg/BorgEomHttpClient.js:11-18,26-35,90-164`; `tests/borg-eom-migration.test.js:2179-2250`. |

Plainly: the demonstrated hot-path allocations and lifecycle gaps are repaired. Panel rebuilding remains a candidate to profile and restructure, not a measured bottleneck.

### Cleanup, follow-up regressions, and reorganization

- **Closed:** obsolete solver wording, duplicate retention/fetch/evaluator paths, duplicate polarity constants, self-shadowing names, and the local duplicate timeout literal no longer appear on the reviewed live paths. `BorgBootstrap.js:47-58,182-223`, `BorgCausalHistoryRetention.js`, `BorgSceneDisposal.js`, `BorgPolarityDiagnostics.js:1-2`, and `BorgEomHttpClient.js:5-9,97-100` are the consolidated owners. The retained `STATUS_TONE`, velocity-layer row, frame-row merge helper, and one-argument `formatActiveTimelineLabel()` all have current consumers or contract pins, so their old “dead” characterization is closed rather than carried forward.
- **Closed:** `adjacent-native-row-line-segments` remains only as the established `displayTransform` schema token in `BorgAppManifest.js:177`, its design description, and its contract test. Repository policy permits `native` in established schema/provenance compatibility tokens. Rename it only in an explicitly versioned contract migration; it is not a current defect.
- **Closed:** the follow-up replay binding regression preserves `sourceWorldlineId` (`BorgAppRuntime.js:4001-4008`; `tests/borg-eom-runtime-contract.test.js:109-143`).
- **Closed:** snapshotted runners are deduplicated and disposed (`BorgWorkspaceState.js:28-41`; `tests/borg-workspace-state.test.js:44-60`).
- **Closed:** co-rotating availability and translated-strand bounds use the scene carrier, fresh bounding sphere, and disabled frustum culling (`BorgAssemblyViewControls.js:80-88`; `BorgAssemblyViewScene.js:108-130,497-499`; `tests/borg-assembly-view-scene.test.js:127-218`).
- **Closed:** EOM history depth must cover the geometric delay bound plus its safety margin (`BorgEomShadowRunner.js:364-392`; `tests/borg-eom-migration.test.js:384-419`).
- **Closed:** rejected provider digests are evicted, hardcoded polarity flags are gone, and prescribed path-window lookup uses binary search (`BorgPrescribedAnalysisProvider.js:39-50`; `BorgBootstrap.js:14-15,85-89`; `BorgAssemblyViewScene.js:280-287,632-658`).
- **Remaining:** the repeatedly stale binding pin is A1. The broad module split and panel rendering proposal is consolidated into A2.

Plainly: the old cleanup list is no longer an active backlog. Only the cross-owned provenance receipt and the explicitly consolidated architecture packet remain.

## Historical Defect Impact

The separate [browser Claim-grade history invalidation](browser-claim-history-invalidation-2026-07-24.md) remains the authority for the historical reach of original finding 1.1. It invalidates only second-or-later Claim-grade continuations produced through the exposed browser transform during the stated interval. It does not upgrade any retained artifact, prescribed replay, UI behavior, or same-implementation replay into independent solver or physical acceptance.

## Durable Disposition

This reconciliation is `priority-only`. It corrects an engineering review packet and identifies no reader-facing theory result suitable for promotion into `content/markdown/aaa`.

Closure goal: resolve the app-EOM binding-pin owner decision, then perform any Borg modularization as a behavior-preserving, separately profiled refactor.
