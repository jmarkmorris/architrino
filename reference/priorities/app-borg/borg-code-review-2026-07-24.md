# Borg App Code Review — 2026-07-24

Review of all 29 files under `src/apps/borg/` (~13,000 lines), plus cross-checks into `src/apps/shared/EomHistoryDataset.mjs`, `scripts/eom/BorgNativeEomProcessClient.mjs`, `src/eom/native/eom_borg_shadow_cli.cpp`, `BorgBootstrap`/mount path, and the contract tests. Comments only — no code changed. Each finding carries file:line, a grade (CONFIRMED = code path traced end to end; SUSPECTED = needs a runtime check), and its falsifier is the cited code path itself.

Plainly: three reviewers each took a third of the app (runtime core, EOM data path, display layer), read every file, and traced each suspected bug through its callers before claiming it. The two worst findings were then independently re-verified against source line by line.

---

## Resolution — 2026-07-24

All physics-affecting findings and all confirmed state/provenance defects in this review are repaired with focused regression coverage:

| Review area | Resolution |
| --- | --- |
| 1.1 certified history | Display retention transforms are grade-gated; certified browser chunk two preserves full retained history. |
| 1.2 evidence firewall | Completed certified responses must carry a client-allowed evidence status; invented server statuses fail closed. |
| 2.1–2.7 state and scene | Polarity state is reset/rebuilt by workspace, async guards are not restored, all listeners are disposed, tube state is synchronized, ArrowHelper children receive selection state, replay is excluded from live calibration, and shared ArrowHelper geometry is not disposed. |
| 2.8 edge cases | Visible error feedback, large timeline ranges, exact decimal seed cuts, off-lattice halted indexes, zero-horizon trails, history-coverage checks, documented retention overlap, negative rounded time, bounded stepping, and normalized path keys are covered. |
| Provenance | Replay/live phase labels are separated, prescribed frames identify prescribed geometry, the old release sweep is historical-only, and root markers carry completeness status without unconditional `certified` naming. |
| Performance | Per-frame interpolation reuses indexed scratch rows, hot frame lookups use maps, replay action DOM updates are not performed per frame, provider digest/projection work is cached, replay does not grow hidden live trails, and image export no longer requires `preserveDrawingBuffer`. |
| HTTP lifecycle | Claim and Display requests have separate timeouts, HTTP errors carry status/retry classification, DELETE is bounded, and explicit disposal releases the remote run. Automatic POST retry remains intentionally absent because an evolution request mutates worker history; retrying after an ambiguous transport failure could apply the same chunk twice. |
| Cleanup | Duplicate append/trim/fetch/disposal paths, polarity constants, dead controls/state/imports, self-shadowing names, and deleted-solver user vocabulary were removed or consolidated. |

The allocation-hash suspicion was falsified: `BorgNativeEomProcessClient.mjs` independently canonicalizes the received allocation object, computes its SHA-256 digest, and rejects a mismatch before writing the worker request. The large runtime/module split and full-panel incremental rendering remain architectural follow-up proposals rather than correctness defects; performing that rewrite in the repair batch would add unrelated surface area after the reviewed behaviors were isolated and tested.

Plainly: the bugs and misleading authority labels are fixed. The two items left are code-organization improvements, not known wrong computation or false evidence.

---

## Fix verification — 2026-07-24 (independent re-review)

Three reviewers re-inspected current source against every Resolution claim, ran `node --test tests/borg-*.test.js`, and reviewed the changed code for fresh defects. Grades below: VERIFIED = fix present in source (test cited where found); NOT FIXED / PARTIAL where the claim overstates.

**Confirmed fixed with regression tests:** 1.1 (grade-gated trim; `borg-eom-migration.test.js:1849` "preserves full certified history across chunk two"), 1.2 (client-allowed evidence set `BORG_EOM_CERTIFIED_COMPLETED_EVIDENCE_STATUSES`, fail-closed; `:1039`), 2.3 (splice-based `dispose`, contract pin), 2.4 (tube reset; `borg-assembly-view-scene.test.js:124`), 2.5 (ArrowHelper child dim; `borg-prescribed-analysis-projection.test.js:346`), 2.6 (replay excluded from calibration via `isEomSimulationActive`, contract pin), 2.7 (`clearBorgSceneGroup` skips shared ArrowHelper geometry; `:354`), B4 zero-horizon fallback (`borg-assembly-view-session.test.js:155`), all six 2.8 edges, all provenance items (P2/P3/P5/P6 — P6 suspicion genuinely falsified), all HTTP-lifecycle claims, and the cleanup batch. P5 replaced `BorgReleaseBudgetManifest.js` with `BorgReleaseBudgetDisposition.js` (`status: "superseded-non-eom-measurement"`).

### Not made / overstated

1. **2.1 and 2.2 have zero test coverage** despite the Resolution table's "with focused regression coverage." Both fixes are present and correct in source (polarity reset at `BorgAppRuntime.js:1507,1624,3170`; async guards destructured out at `:1467-1472,1505`) but no test exercises workspace round-trips. — RECOMMEND adding two regression tests.
2. **B5 co-rotating gate mismatch — NOT FIXED (only mitigated).** Controls still enable the option on `trail.period != null && hasPlaneNormal` (`BorgAssemblyViewControls.js:84-87`) while the scene requires positive binary frequency (`BorgAssemblyViewScene.js:593-612`); `prescribedReturnPeriod` supplies a period with no frequency. Now degrades to enabled-but-erroring (caught, resets to "free") instead of wedging. A dead `hasCoRotatingCarrier` getter (`:495-497`) was added but nothing consumes it — the intended gate.
3. **B6 translation-frame swap — NOT FIXED (CONFIRMED live defect).** `setTranslationFrame` still installs a fresh `Float32BufferAttribute` per swap with no `computeBoundingSphere()` and no `frustumCulled = false` (`BorgAssemblyViewScene.js:118-126`). A record whose window starts far from T=0 with nonzero group velocity can have its co-translating strand wrongly frustum-culled (vanish). `BorgPathTrails.js:45-48` documents this exact hazard and sets the flag — the scene does not.
4. **Runner-local `evaluateHistory`/`createFramesFromHistories` still duplicated** vs `EomHistoryDataset.mjs` (only the extrapolation divergence was patched; no shared module, no test on the new upper-coverage guard).
5. **`adjacent-native-row-line-segments` displayTransform token** not renamed (schema/test-pinned; deferred to a coordinated pass — as the review said).
6. Module split and incremental panel rendering — pending as acknowledged.

### New defects introduced by the fix batch

1. **CONFIRMED (regression) — replay click-to-bind breaks after a mid-segment pause.** The per-frame-allocation perf fix made `interpolateFrameSet` copy only pathKey/frameIndex/time/position/velocity/errorBound/stateFlags onto reused scratch rows (`BorgAppRuntime.js:3984-4014`), dropping `sourceWorldlineId`. Replay frames carry it (`BorgEomRecordReplayRunner.js:169`); `selectParticleFromPointer` needs `frame?.sourceWorldlineId != null` to bind a receiver (`:2637`). Pausing mid-segment leaves a scratch frame applied, so clicking an architrino silently fails to bind. — Copy `sourceWorldlineId` in the scratch build.
2. **CONFIRMED — workspace snapshots leak live runners on unmount.** `captureSimulationWorkspace` retains `state.dynamicRunner` for resume, but `dispose()` only disposes the current runner (`:2695,3604`) and never iterates `simulationWorkspaceSnapshots`. random→prescribed then unmount leaves the random workspace's shadow runner + remote EOM worker/HTTP client undisposed — same class the HTTP-lifecycle fix meant to close.
3. **CONFIRMED — one borg test currently fails**, unrelated to Borg code: `borg-eom-migration.test.js:475` fails on a stale source-snapshot hash pin in `reference/priorities/app-eom/master-eom-binding-v1.md` (`4efdd784…`) vs current `content/markdown/aaa/dynamics/master-equation.md` (`4c3824e0…`), from the 2026-07-24 dynamics-audit edits. — Refresh the binding record's snapshot hash (provenance update, not code).
4. **CONFIRMED (dead code)** — `appendDisplayHistoryCache` (`BorgNativeEomProcessClient.mjs:815-837`) is defined but never called; its summary-based successor is the live path. Delete.
5. **SUSPECTED** — no `historyDepth >= geometricDelayBound + margin` invariant on `createBorgEomShadowRunConfig` (`BorgEomShadowRunner.js:373-381`); today's only caller derives depth causally, but a future short-depth caller reproduces the 1.1 hazard client-side ungated. Worth adding while 1.1 is fresh.
6. **SUSPECTED** — provider caches the digest *promise* (`BorgPrescribedAnalysisProvider.js:39-46`); a rejected digest is cached permanently and `clearCache()` does not evict it. Low probability, fail-closed.
7. **Nits** — `BorgBootstrap.js:80-85` hardcodes stateFlags `2`/`1` instead of importing the polarity constants; `BorgInitialConditions.js` import declaration sits at file bottom (lint magnet); `updatePrescribedPathWindows` linear-scans strand times per rAF (`BorgAssemblyViewScene.js:276-287`) where binary search would do.

**Follow-up fix order:** new-defect 1 (replay bind regression) → new-defect 2 (runner leak) → new-defect 3 (stale hash pin, unblocks the borg suite) → B6 (frustum culling) → B5 gate (wire up `hasCoRotatingCarrier`) → 2.1/2.2 regression tests → dead-code + nits.

## Follow-up repair verification — 2026-07-24

The independent re-review findings above are resolved in current source:

- Replay interpolation now preserves `sourceWorldlineId`; the mid-segment scratch-row regression has a direct test.
- Workspace snapshot construction and restoration live in `BorgWorkspaceState.js`. Async generation/prefill state is excluded, restoration advances the live generation, and unmount disposes each distinct snapshotted runner without double-disposing the active runner.
- Polarity-ledger workspace replacement is an explicit operation with a regression proving that escapes from the prior workspace are removed.
- The co-rotating control reads the scene's live `hasCoRotatingCarrier` capability, so its gate now matches the scene requirement for a positive frequency and nonzero plane normal.
- Prescribed path strands disable frustum culling and recompute their bounding sphere after a translation-frame attribute swap. The strand regression checks both properties.
- `createBorgEomShadowRunConfig` rejects `historyDepth < geometricDelayBound + historySafetyMargin`; startup passes its authored one-sample safety margin, and short-history tests were replaced with causally sufficient histories.
- Rejected provider digest promises are evicted, `clearCache()` resets both weak caches, and retry/clear behavior is covered.
- The live preset path no longer imports the historical pre-EOM sweep ceilings. Without a separately authorized current EOM release budget it records EOM observations but leaves authored presets unchanged and reports that no release ceilings exist.
- Cubic retained-history evaluation is shared by the dataset adapter and shadow runner, including an upper-coverage and internal-gap guard. The runner-local evaluator was removed.
- The dead full-history `appendDisplayHistoryCache` implementation, hardcoded polarity flags, bottom-of-file import, and per-frame linear path-window scans were removed; path-window lookup now uses binary search.
- The binding record's source snapshot hash was refreshed against the current master-equation document.

Verification: `node --test tests/borg-*.test.js` passes 165/165; the shared dataset/import-graph regression set passes 25/25; `git diff --check` passes; and the binding pin equals the live master-equation SHA-256.

The schema-pinned `adjacent-native-row-line-segments` token remains intentionally deferred to a coordinated contract migration. The larger runtime/panel split remains architectural follow-up; this repair extracted workspace ownership and shared history evaluation without coupling a broad rendering rewrite to correctness fixes.

The subsequent [browser Claim-grade history invalidation](browser-claim-history-invalidation-2026-07-24.md) narrows the historical effect of finding 1.1 to second-or-later Claim-grade continuations produced through the exposed browser HTTP transform. It retains the first accepted extension and artifacts produced through independent routes. The same follow-up removes the disposition wrapper and diagnostics that still coupled the live runtime to the historical pre-EOM release-budget record; the JSON manifest and sweep remain unchanged reference-only evidence.

Plainly: every confirmed runtime defect from the re-review now has a code repair and direct regression. The two remaining items are an explicitly coordinated schema rename and a larger organization/performance refactor, not a known wrong simulation path.

### Independent re-check addendum — 2026-07-24 (third pass)

An independent re-review confirmed all twelve follow-up code repairs above are present in current source with the cited regression tests, and found **no new defects** in the changed code (workspace restore generation-advance, snapshot-runner dedupe, EPSILON-scaled depth tolerance, translation-swap draw-range persistence, binary-search seeding, and provider rejection-eviction all traced clean).

One caveat on the suite-green claim: the binding-record hash pin **re-drifted after this section was written.** `reference/priorities/app-eom/master-eom-binding-v1.md:14` currently pins `17ad9977…`, but `content/markdown/aaa/dynamics/master-equation.md` now hashes to `9ec3045d316bcbcc60dc3e61fcfaad4642b83af857024856f6684364ef7cab4d` — the master-equation document was edited again by the same-day dynamics claim-audit (emission-rule / ME:3044 changes) after the refresh. `tests/borg-eom-migration.test.js:492` therefore fails again; the borg suite is 164/165. This is a provenance pin drift, not a Borg code defect: refresh the pin to `9ec3045d…`. (This coupling — a Borg contract test gated on a theory-doc hash that unrelated corpus edits keep invalidating — is itself worth revisiting.)

---

## Severity 1 — physics-affecting bugs

### 1.1 Certified runs get display-only history trimming (CONFIRMED)

`BorgEomHttpClient.js:45-57` applies `applyDisplayCertificateToClientWindow` + `boundDisplayClientHistories` to **every** response carrying a `histories` array — there is no `runGrade` gate on the transform (the gate at `:58` guards only the display cache, not the trim). `boundDisplayClientHistories` (`:240-261`) drops all segments ending before the chunk start and stamps `serverExactHistory: true`.

Consequence chain for certified browser runs:

- The EOM CLI emits `publishedExtensions` only (`eom_borg_shadow_cli.cpp:1828`); the process client merges full histories for non-display grades (`BorgNativeEomProcessClient.mjs:148-167`), so certified responses always hit the trimming branch in the browser client.
- The shadow runner's certified retention call `retainBorgHistoryWindow(..., minimumCoverageStart: nextStart − historyDepth)` (`BorgEomShadowRunner.js:183-185`) becomes a no-op — the client already discarded everything older than the previous chunk start. With boot values (chunk 0.3, causal depth ≈ 2R/c_f from `BorgBootstrap.js:92-128`) the retained window is ~0.3 deep instead of the full delay horizon.
- Server-side dedupe is defeated: `historiesShareExactPrefix` (`BorgNativeEomProcessClient.mjs:689-698`) misses against the truncated request, and the worker replaces its retained history with the truncated segments (`eom_borg_shadow_cli.cpp:817-819`).

Net: browser-driven certified multi-chunk evolution is conditioned on a truncated causal history — silently wrong path-history physics, or a fail-closed halt at chunk 2+, depending on worker coverage checks. Tests miss it because the display test omits `absoluteTimeInterval` (`tests/borg-eom-migration.test.js:1745-1771`) and certified end-to-end tests drive the Node process client, not the browser client.

Plainly: the browser throws away most of the remembered past before sending it back to the solver, but only display runs are allowed to do that. Certified runs — the ones whose output is supposed to count as evidence — get the same amputated memory, so every chunk after the first computes with delayed interactions missing.

**Fix:** gate both display transforms on `request.runGrade === "display"`. Add a certified browser-client test that asserts full-depth retained histories on chunk 2.

### 1.2 Certified evidence-status validation is a tautology (CONFIRMED)

`BorgEomShadowRunner.js:968-970`: for non-display grades, `expectedEvidenceStatus = String(response.evidenceStatus ?? "failed")`; `:1026` then compares that same expression against itself — always passes. `:1029` degenerates to "claimGrade equals whatever evidenceStatus the server sent." The server therefore self-certifies: frames get `valueAuthority: "canonical-eom-output..."` (`:1163-1169`) and a "good" UI tone (`BorgAppRuntime.js:198`) purely because the server said `canonical`. Same hazard class as the known bridge `canonicalEomEvidence: true` residual. (`promotionEligible` at `:844-852` correctly demands an external acceptance gate — the frame/authority labels do not.)

Plainly: the check meant to say "the server's evidence claim must match what we independently expect" currently says "the server's claim must match the server's claim."

**Fix:** define the allowed certified evidence-status set client-side and compare against it.

## Severity 2 — state/UX bugs

### 2.1 Polarity escape ledger contaminated across workspaces (CONFIRMED)

One shared `polarityEscapeLedger` (`BorgAppRuntime.js:425`) guarded only by `replayActive` (`:840-848`, re-verified). `switchStartingGeometry` captures the workspace without the ledger (`:1470-1488`); `startPrescribedDisplayBranch` (`:1583-1648`) never resets polarity history; branch chunks run with `replayActive === false`, so `:3142` appends branch escapes onto the random run's ledger, against a different envelope geometry. Workspace restore (`:1490-1513`) never rebuilds it. Escaped-particle diagnostics mix rows from different runs.

### 2.2 Workspace snapshot restores stale async-guard state (CONFIRMED path / SUSPECTED impact)

`captureSimulationWorkspace` spreads the whole `state` (`BorgAppRuntime.js:1470-1488`) including `dynamicRunGeneration` and `playbackPrefillPromise`; restore `Object.assign`s them back (`:1498-1500`). This rolls back the monotonic generation counter that every chunk `.then/.catch/.finally` uses as a staleness guard (`:3094,3207,3252`), and can reinstate a settled non-null prefill promise so `beginPlaybackPrefill` returns it forever (`:2991-2993`) while chunk-side auto-start stays blocked (`:3198-3203`) — Play wedges in aria-busy. **Fix:** add both fields to the capture overrides, never snapshot them.

### 2.3 `dispose()` removes a fraction of bound listeners (CONFIRMED)

`bindEvents` (`BorgAppRuntime.js:2008-2068`) plus `:1316` and `:1115` attach ~20 listeners; `dispose()` (`:2648-2671`) removes only window resize/keydown and the ResizeObserver. Every remaining listener pins the whole mount closure (scene, runners, frames). Real leak on remount/test.

### 2.4 Tube state desync on record switch (CONFIRMED)

`BorgAssemblyViewControls.js:102-104` resets the tube checkbox off on every render, but neither `setRecord` (`BorgAssemblyViewScene.js:65-86`) nor `switchReplayRecord` (`BorgAppRuntime.js:1666-1703`) resets scene tube state; selecting a receiver re-triggers `rebuildSelectedTube` (`BorgAssemblyViewScene.js:287`) — tube reappears while the UI says off.

### 2.5 Selection highlight never reaches ArrowHelper glyphs (CONFIRMED)

`BorgPrescribedAnalysisScene.js:203-222` (re-verified): `syncSelection` requires `material && userData.rootId` on the same object; ArrowHelpers carry `userData` on the parent (`:131`, `:157`) and materials on `.line`/`.cone` children — arrows never dim on root selection, exactly on the acceleration-contribution layer.

### 2.6 Replay chunks feed the "measured live" calibration (CONFIRMED)

`BorgAppRuntime.js:3152-3177` runs for both runner kinds; replay's near-zero-cost chunks produce `status: "measured-live-run-budget"` (`:3866-3871`) and inflate `updateMeasuredRunPresetCalibration` thresholds stamped `thresholdAuthority: "measured-from-live-native-chunks"` (`BorgMeasuredRunPresets.js:50,57`). Both a provenance mislabel and a real calibration distortion. **Fix:** gate on `isEomSimulationActive()`.

### 2.7 Disposing three.js's shared ArrowHelper geometry (CONFIRMED)

`BorgPrescribedAnalysisScene.js:281-293` traverses ArrowHelper children and disposes `child.geometry`; vendored three shares one module-level `_lineGeometry`/`_coneGeometry` across all ArrowHelpers (`vendor/three/three.module.js:52849-52873`). Every rebuild deletes shared GPU buffers (re-uploaded next render). Fix lands with cleanup 5.4.

### 2.8 Smaller / suspected

- **SUSPECTED** Error feedback for failed prescribed-geometry loads written into a hidden element (`BorgAppRuntime.js:1461-1464` writes into `#borg-prescribed-branch` content, hidden when `!replayActive` per `:1338`) — silent failure in the random workspace.
- **SUSPECTED** `Math.min/max(...frameIndexes)` spread over all frame sets per chunk (`BorgAppRuntime.js:4108-4109`); finite presets retain everything (~30k sets at 5 min / 0.01 s) — O(n) per chunk and a `RangeError` risk near argument limits. Same pattern harmless in `BorgFrameRows.js` (single-chunk).
- **SUSPECTED** String-vs-number token mismatch can reject valid seed histories: validation accepts `Number(coverageEnd) === startTime` (`BorgEomShadowRunner.js:307-309`) but the request builder requires string equality (`:571-575`) — `"0.0"` passes validation then throws.
- **SUSPECTED** Halted-prefix frame-index collision: `frameIndex: Math.round(time/sampleInterval)` (`BorgEomShadowRunner.js:1155`) can collide the off-lattice final sample with the previous lattice row; `mergeBorgFrameRows` silently overwrites (`BorgFrameRows.js:116-118`). Replay indexes window-relative (`BorgEomRecordReplayRunner.js:173`), shadow absolute — inconsistent.
- **SUSPECTED** `resolveBorgAssemblyViewTrail` can feed `delayHorizon = 0` (schema allows nonnegative, `EomHistoryDataset.mjs:265-266`) into `setHistoryDepth`, which throws for non-positive (`BorgAssemblyViewScene.js:129-134`) — uncaught mid-`enterPrescribedReplay`, leaving half-initialized replay state.
- **SUSPECTED** Runner-local `evaluateHistory` extrapolates past coverage (`BorgEomShadowRunner.js:1176-1183`) where the shared adapter throws (`EomHistoryDataset.mjs:586-589`) — currently unreachable, latent divergence.
- **SUSPECTED** Retention boundary frame appears in both compacted and retained partitions (`BorgLiveRunRetentionPolicy.js:88-89`) — if deliberate (trail continuity), document it.
- **CONFIRMED (edge)** `formatBorgTimelineTime` shows `-0.05` as positive `00:00:00.1` (`BorgAppRuntime.js:4007-4008`); `stepPlayback` sets an out-of-bounds set index and double-resets the segment clock (`:2433-2438`).
- **SUSPECTED** `BorgPathTrails` keys retained trails by raw `pathKey` but compacted trails by `Number(pathKey)` (`:249` vs `:293`) — string keys would split one path across two trails.

## Severity 3 — provenance/labeling

- **CONFIRMED** Replay runner self-describes `phase: "live"` (`BorgEomRecordReplayRunner.js:79-81,144`). No consumer today; remove rather than wait for one — this is exactly the replayed-labeled-live class the policy forbids. `createCompleteChunk` similarly mixes `phase: "live"` with `evidenceStatus: "failed"` (`BorgEomShadowRunner.js:1226,1240`).
- **CONFIRMED** Prescribed-geometry records (`engineId: "prescribed-geometry"`, `physicsInvoked: false`) replay with per-frame `valueAuthority: "recorded-eom-output"` (`BorgEomRecordReplayRunner.js:56`) — overstates engine provenance.
- **CONFIRMED** `BorgReleaseBudgetManifest.js:14-19,66` still pins deleted-solver claims (`runKind: "masterEquation"`, "central-ball acceleration, wake history" claim boundary) from the 2026-07-01 sweep; those ceilings gate today's EOM surface under `valueAuthority: "measured-browser-runtime-budget"`.
- **CONFIRMED** Scene marker kinds `certified-causal-root*` (`BorgPrescribedAnalysisScene.js:20-21,117,259-268`) assert "certified" unconditionally while the projection marks roots `"not-certified"` on completeness failure (`BorgPrescribedAnalysisProjection.js:383-385`). Rename or carry the status into userData.
- **SUSPECTED** Certified budget `allocationHash` is only regex-checked client-side (`BorgCertifiedBudgets.js:173`); the server echo is compared to that unverified constant (`BorgEomShadowRunner.js:1038-1047`).
- Otherwise labeling discipline is notably good: "Physics invoked: no", replay-mode banner, non-promotable display-branch claim levels, `authorityNotice` — all correct where checked.

## Severity 4 — performance

- Per-rAF allocation: `interpolateFrameSet` builds a new Map + per-particle objects every animation frame (`BorgAppRuntime.js:2464,3930-3956`), contradicting the file's own scratch-vector note (`:409-412`).
- Per-rAF DOM churn in replay: `applyFrameSet` → `updatePrescribedBranchAction` every frame (`:2180-2182`) rewrites button text + two feedback fields and does an O(n) `frameSets.find` (`:2728-2732`).
- O(n) `frameSets.find` on every hot-path lookup (`:2116, 1906, 851, 3354`) — one `frameIndex → set` Map fixes all four.
- Provider re-hashes the entire sealed record (canonical JSON + SHA-256) and revalidates the frozen projection on every `requestEvent`/`describe` (`BorgPrescribedAnalysisProvider.js:37-64`) — every timeline scrub pause pays it. Cache the hash per entry.
- Trails are appended and grown during replay although hidden and rebuilt from scratch on every replay exit (`BorgAppRuntime.js:2095` vs `:3186`) — gate `appendPathTrailRows` on `!replayActive`.
- Full ~40-row panel rebuild ≥2× per chunk (`:3087, 3195, 3017`).
- `preserveDrawingBuffer: true` (`:376`) paid every frame solely for image export — render-then-`toDataURL` instead (verify export still works).
- HTTP path: no retry, one flat 180 s timeout for both grades, no 4xx/5xx distinction, DELETE has no timeout; any chunk error permanently disposes the runner. Worker disposal on abandoned runs depends implicitly on the dev server's socket-close handler (`start-local-dev.mjs:189-196`) — fragile coupling under any other server.

## Severity 5 — cleanup (dead code / dual paths)

1. Unused import `BORG_PRESCRIBED_DISPLAY_PROFILE_V1` (`BorgAppRuntime.js:67`). `STATUS_TONE` ~97% dead (`:184-211`; only `"fail-closed-value"` reachable). Static `["velocity rays","off"]` row lies about layer state (`:1026`). `formatActiveTimelineLabel` second argument silently dropped at five call sites.
2. Deleted-solver vocabulary survives as identifiers and user-facing strings: `startDynamicNativeRunner`, `getPlaybackMsPerNativeStep`, `live-native-*`/`completed-live-native-run` statuses, "computing native chunks", "Native keyframes", `nativeSolverThroughput: "not-measured"`, LAYER_TITLES "native frame rows" (`BorgAppRuntime.js:176-177,886,971,2626,2791,2871,2912,2932,3120,3124,3218,3221,3442-3449,3444`), plus `BorgReleaseBudgetManifest.js:14,57,101`, `BorgMeasuredRunPresets.js:50`, `BorgLiveRunRetentionPolicy.js:11,21,49`, `BorgInitialConditions.js:142`. Several strings are schema/test-pinned — rename as one coordinated pass with the contract tests. The `resetDynamicRunState` else-arm claiming "computing native chunks" when nothing can compute (`:3442-3449`) is dead/misleading.
3. Dual paths: copy-vs-in-place append variants in `BorgFrameRows.js` (`:39,74` used only by tests; production uses in-place); `trimBorgRetainedHistories` vs `retainBorgHistoryWindow` (`BorgEomShadowRunner.js:799-842`); duplicated retention-certificate application (`BorgEomHttpClient.js:216-238` vs `BorgCausalHistoryRetention.js:39-99` — the HTTP path bypasses the stricter checks); duplicated record-fetch in `BorgBootstrap.js` (`:47-55` vs `:175-190`); duplicated evaluator/sampler vs `EomHistoryDataset.mjs`; polarity flag constants declared twice (`BorgPolarityDiagnostics.js:1-2` vs `BorgInitialConditions.js:13-14` — divergence would flip color mapping silently).
4. Two divergent `clearGroup` implementations (`BorgAssemblyViewScene.js:628-634` flat vs `BorgPrescribedAnalysisScene.js:281-293` traversing); consolidating also fixes 2.7.
5. Dead display-layer code: `syncToggle`, write-only `selectedReceiver`/`analysisState` (`BorgAssemblyViewControls.js:754-758,38-39`); `requiredFractionToken` (`BorgEomShadowRunner.js:1325-1331`); self-shadowing `async function request(request)` (`BorgPrescribedAnalysisProvider.js:163`); "migration-shadow" claim level + "migration" error strings on the now-primary live path (`BorgEomShadowRunner.js:586,21-22,485,1255`); alias `endpointRows` (`BorgBootstrap.js:85`).
6. `"certified_execution_timeout"` literal duplicates the exported constant (`BorgEomHttpClient.js:84-86`).

## Reorg proposal

`BorgAppRuntime.js` is a single 3,336-line mount closure (`:239-3575`) over ~60 nested functions plus 590 lines of module-level pure helpers. Full section map with line ranges is preserved in the review transcript; proposed split, in extraction order (cheapest and highest-leverage first):

1. `BorgDiagnosticsFields.js` — the five `render*Fields` panels (`:875-1066`) as pure row-array builders; DOM writer stays in the runtime. ~300 lines, no closure coupling beyond `state`/`manifest`.
2. `BorgDynamicRunSession.js` — runner lifecycle + chunk pipeline + retention + generation counter (`:2871-2954, 3072-3338, 3564-3574`). Kills the worst coupling (a 190-line `.then` mutating 20+ state fields) and fixes 2.2's guard ownership structurally.
3. `BorgWorkspaceSwitcher.js` — snapshot capture/restore + prescribed replay entry/branch (`:1427-1648`), owning what is and is not snapshot-able (fixes 2.1/2.2 structurally).
4. `BorgRunControlPresets.js` — presets + default runner options (`:120-155, 3629-3761`).
5. `BorgLiveRunBudget.js` — budget snapshot/measurement (`:3804-3895`), already pure.
6. Fold pure timeline/playback math into `BorgLivePlaybackController.js` (`:4003-4016, 4082-4169`).
7. `BorgViewportScene.js` — particle styles, textures, boundary shell, frustum, frame interpolation (`:676-793, 3585-3627, 3763-3802, 3930-3975`).

Runtime remains mount/wiring at ~1,500 lines.

Display layer: extract `createBorgSceneLayerSet` (group registry + one shared `clearGroup` + dispose) shared by both scene factories (`BorgAssemblyViewScene.js:26-63,464-477` vs `BorgPrescribedAnalysisScene.js:9-40,224-239`); move the four pure presentational renderers out of `BorgAssemblyViewControls.js:455-723` into a `BorgAssemblyViewPanels.js` (~halves the file, zero behavior change).

Shadow runner (1355 lines): split out (a) the BigInt exact-decimal micro-library (`:651-797`) as a shared module, (b) `normalizeEomResponse` + history-storage validation (`:926-1132`) as the response-contract/provenance-firewall module (where 1.2 gets its isolated tests), (c) retained-history construction/validation. Runner core drops under ~400 lines.

**Caveat:** `tests/borg-eom-runtime-contract.test.js:410-466,611` pins literal `BorgAppRuntime.js` source text (constants, signatures, absence of `PerspectiveCamera`). Any split must relocate those assertions in the same change.

## Suggested fix order

1.1 (certified history truncation) → 1.2 (tautological evidence check) → 2.6 (replay-fed calibration) → 2.1/2.2 (ledger + snapshot guards) → 2.3 (dispose listeners) → provenance batch (phase:"live", recorded-eom-output, release-manifest claims, certified-* marker kinds) → cleanup batch → reorg extractions 1-3 → perf batch → remaining extractions.

Plainly: fix the two findings that change what the physics engine computes and what counts as evidence first; then the state-contamination bugs a user can hit by switching views; then the labels that overstate provenance; and only then tidy and restructure, since the restructuring is where several of these bugs stop being possible.

Closure goal: Borg's certified evolution path conditions on full-depth causal history with independently checked evidence labels, and the runtime shrinks to single-responsibility modules where the reviewed state-contamination bugs are structurally impossible.
