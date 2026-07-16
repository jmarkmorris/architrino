# Zombie-Solver Retirement — Dispatch Prompts (2026-07-16)

Operator objective: migrate every remaining consumer of the legacy solver (`src/solver`, henceforth **zombie-solver**) to the EOM engine, then delete `src/solver`. Consumer inventory and retirement gate: from the 2026-07-16 survey (recorded in this file's Appendix). Prompts are ordered; each is independently dispatchable to Codex and follows the standard branch/PR process (`reference/op/codex-pr-branch.md`). Two operator decisions are pre-recorded below and may be overridden before dispatch.

**Decision A (recorded, overridable):** `scripts/angular-momentum/tri-binary-offset-family-runner.mjs` + its 2 active tests + the solver-audits fixture referencing it are **frozen-and-retired** with the legacy instruments, consistent with the braid fresh-start (it is a legacy-campaign instrument not covered by the earlier freeze only by accident of directory).
**Decision B (recorded, overridable):** the prescribed-path evaluation kernels (causal-root solving on prescribed orbits, observer-field evaluation) that Photon and Ideal Braid need are **re-homed into a standalone, clearly labeled non-evidence analysis library** (suggest `src/prescribed-path-analysis/`) rather than retired — they are legitimate screening/illustration mathematics, provided every output is labeled `display-only-visualization` / non-evidence and the library is never called an engine.

---

## Prompt 1 — Mechanical shrink: relocate display modules and T3

Closure goal: shrink the zombie-solver's surface with zero engine dependency — relocate the three self-contained Animator display modules and the self-contained T3 model out of `src/solver`, so the architrino scene app and T3 no longer import from the legacy tree.

Context: `src/solver/app/AnimatorDelayedHitRows.mjs`, `AnimatorFieldShellEventStream.mjs`, and `AnimatorReceiverPathDescriptors.mjs` are display kernels with no solver-internal dependencies beyond each other, imported by `src/apps/architrino/ArchitrinoSceneAppRuntime.js`. `src/solver/t3/*` (15 modules) is a self-contained soft-sphere comparison model consumed by `scripts/solver/run-t3-universe-simulator.mjs` and `tests/t3-universe-simulator.test.js`, with an optional `--solver-engine solver` branch using the zombie-solver wasm bridge.

Task: (1) move the three Animator modules to app space (suggest `src/apps/animator/display/`), update the architrino-scene imports and the three module tests (`animator-delayed-hit-runtime`, `animator-field-shell-event-stream`, `animator-receiver-path-descriptors`). (2) Move `src/solver/t3` to `src/t3`; delete the T3 runner's `solver` engine branch (keep the `reference` engine); update the runner import and `tests/t3-universe-simulator.test.js`. (3) Update `scripts/config/foundational-impact-contracts.json` globs touched by these moves. Constraints: no behavior changes beyond the deleted engine branch; full affected test suites green; content validators untouched. Report: files moved, imports updated, test results.

## Prompt 2 — Borg promotion: EOM becomes the only Borg engine

Closure goal: clear Borg's EOM burn-in blocker, pass the promotion ladder, and delete Borg's zombie-solver compatibility path entirely.

Context: Borg already boots EOM by default (`BorgEomShadowRunner.js`, dev endpoint `/api/eom/borg-shadow/v0`); the zombie-solver path survives only behind `?eom=compatibility`. The recorded blocker: the 16-path burn-in halts at interval `[0.06, 0.07]` with `regulator_convergence_failed` (see `reference/priorities/app-eom/migration-plan.md`). Promotion is fail-closed.

Task: (1) diagnose and fix the `regulator_convergence_failed` halt in the EOM engine path — this is engine work; state the root cause with evidence before fixing, and add a regression test at the failing interval. (2) Run the full post-burn-in promotion ladder per the migration plan; record results in the app-eom lane. (3) On promotion PASS only: remove the `?eom=compatibility` branch in `BorgBootstrap.js`; delete `BorgDynamicNativeRunner.js`, `BorgSolverBridgeWorker.js`, `tests/borg-native-solver-contract.test.js`, and `scripts/borg/build-first-native-backed-fixture.mjs`; any replacement fixture is generated only from accepted EOM output with honest provenance labels. Fail-closed: if the ladder does not pass, stop after step 2 and report — do not delete the compatibility path. Report: root cause, ladder results, deletions.

## Prompt 3 — Retire the frozen legacy instruments

Closure goal: retire the zombie-solver's largest consumer block — the frozen legacy-campaign instruments — honoring the artifact-preservation rule.

Context: `scripts/braid-ideal/*` (~80 instruments and fixtures) and their ~82 `tests/braid-ideal-*.test.js` are frozen by the 2026-07-15 braid fresh-start; nothing outside their own tests imports them. Per recorded Decision A, `scripts/angular-momentum/tri-binary-offset-family-runner.mjs`, `tests/rank2-rank6-branch-source-join-report.test.js`, `tests/angular-continuous-interval-witness-producer-target.test.js`, and the `scripts/solver-audits/fixtures/branch-provider-current-candidates.json` reference join this retirement. The migration plan's preservation rule: do not delete artifacts needed to reconstruct existing conclusions.

Task: (1) confirm by grep that no live code outside these files imports them; (2) preserve fixtures per the preservation rule — either verify git history suffices (state this explicitly as the chosen mechanism) or copy fixture data files into `reference/priorities/braid-archive/retired-instrument-fixtures/` with a one-paragraph README; (3) delete the scripts and tests; (4) update `scripts/config/foundational-impact-contracts.json` and any check scripts enumerating these tests. Constraints: no edits inside `reference/priorities/braid-archive` beyond the optional new fixtures directory; full remaining test suite green. Report: counts deleted, preservation mechanism, grep proof of no dangling imports.

## Prompt 4 — EOM history-display adapter; convert Causal-Delay-Feedback and Animator motion

Closure goal: build the one shared EOM dataset-display adapter and convert the two viewer apps that only need it, removing their zombie-solver bridge calls.

Context: `src/apps/causal-delay-feedback/CausalDelayFeedbackCentralBridgeAdapter.js` (replay via zombie-solver `appPlayback`/`motionSimulation`/`pairInteraction` run kinds) and `src/apps/animator/AnimatorSimulationWorkerCoreRuntime.js` (`motionSimulation` run requests) are blocked only on an adapter gap: EOM retained histories already exist in the `eom_evolution_contract/v0` JSON format (Borg's shadow client consumes it). The `pairInteraction` toy law is a prohibited EOM substitution and must not be ported.

Task: (1) build a shared EOM history-dataset adapter (suggest `src/apps/shared/EomHistoryDataset.mjs`) that ingests `eom_evolution_contract/v0` records and exposes the frame/trail interface the two apps' display layers consume; design it to also serve the planned assembly viewer (`reference/priorities/braid-program/campaigns/assembly-viewer-requirements.md` — the `assembly-view-record.v0` sketch; align field names where cheap). (2) Convert Causal-Delay-Feedback: replace the central-bridge adapter's replay source with EOM datasets; delete the `CENTRAL_SOLVER_*` replay modes and the `pairInteraction` path outright; update `causal-delay-feedback-runtime.test.js` and `causal-delay-feedback-central-bridge-adapter.test.js`. (3) Convert the Animator motion worker to EOM dataset ingestion; update `animator-simulation-worker-runtime.test.js`. Constraints: viewers compute no physics; every displayed dataset carries provenance (engine, run id, claim grade). Report: adapter contract, both conversions, test results.

## Prompt 5 — Re-home prescribed-path analysis; free Photon and Ideal Braid

Closure goal: extract the prescribed-path evaluation kernels into a standalone non-evidence analysis library and migrate Photon and Ideal Braid onto it, removing their zombie-solver imports.

Context: Photon (`PhotonRuntime.js`, `PhotonFormulaRuntime.js`, worker) uses causal-root solving on prescribed orbits, `computeMovingCircularObserverFieldF64`, `solveMovingCircularAbsoluteHistoryRunF64`, and run kinds `causalRoots`/`phaseDiagnostics`/`sharedGeometry`; Ideal Braid (`IdealBraidRuntime.js` + friends) uses `sharedGeometry` flight-time and self-hit-span rows plus `delayedHits`. These capabilities are deliberately outside the EOM contract (analytic prescribed futures are prohibited engine substitutions), but they are legitimate screening/illustration mathematics. Per recorded Decision B they are re-homed, not retired.

Task: (1) create `src/prescribed-path-analysis/` and move (not copy) the needed kernels out of `src/solver/app/AbsoluteHistoryRootRuntime.mjs` and the bridge surface: prescribed-orbit causal-root solving (incl. same-source), observer-field evaluation, flight-time and self-hit-span geometry. The library's public API labels every output non-evidence (`display-only-visualization` vocabulary); its README states in one paragraph that it evaluates prescribed motion and cannot produce dynamical or retained-branch evidence. (2) Migrate Photon and Ideal Braid onto the library; delete their solver bridge workers; drop the wasm loader path pins from `tests/photon-runtime.test.js` and `tests/ideal-braid-runtime.test.js`; update `photon-constituent-root-route-diagnostic` and baseline-sandbox entries. (3) The library takes over `absolute-history-root-runtime.test.js`'s kernel tests (moved and renamed). Constraints: pure relocation plus labeling — no numerical changes; all affected suites green. Report: extracted API, both app migrations, test mapping old→new.

## Prompt 6 — Final retirement: delete `src/solver`

Closure goal: verify the retirement gate is empty and delete the zombie-solver.

Context: prompts 1–5 must be landed. The survey's retirement gate is the checklist; the residual false self-label (`canonicalEomEvidence: true` in the bridge's native master-equation path, pinned by `tests/solver-app-bridge-native-master-equation-status.test.js`) dies with the directory.

Task: (1) verify every gate row: repo-wide grep shows no imports of `src/solver` or `solver/app/` outside `src/solver` itself; Borg promotion recorded; instruments retired; viewers converted; analysis library live. (2) Delete `src/solver`, its guard/build scripts (`scripts/check-solver-*`, `scripts/build-solver-*`, `scripts/solver-audits/*`, `check-emission-shell-default-promotion-v1.mjs`), the solver-surface tests (`solver-app-bridge-*`, `solver-h39-*`, `solver-work-packet-transport-contract`, `solver-worker-loopback`), and `.tmp/solver-build` references. (3) Remove `src/solver` globs and reactive commands from `scripts/config/foundational-impact-contracts.json`. (4) Update AGENTS.md §Solver Ownership to the post-retirement statement: EOM is the sole engine; the zombie-solver is deleted (history in git; audit and quarantine records remain in `reference/priorities/app-solver/`). (5) Full test suite + all content validators green. Fail-closed: any non-empty gate row stops the deletion; report the row. Report: gate verification per row, deletion inventory, suite results.

## Prompt 7 — Markdown sweep: `zombie-solver` rename and reference pruning

Closure goal: eliminate unnecessary markdown references to the old solver and rename every remaining live-document prose reference to **zombie-solver**, with one canonical definition.

Context: operator decision 2026-07-16: the old solver's name in live prose becomes `zombie-solver` — a deliberately unmistakable deprecation marker. Census (2026-07-16): corpus 3 (historical research-notebook entries), reference/op 3 (audit pointers), app-solver 93 and app-eom 38 (the subject lanes), app-borg 27 (reading-rule covered), 44 across seven other lanes (stale-scope candidates), braid-archive 281 (exempt), braid-program 0.

Rules:
1. **Canonical definition once:** in AGENTS.md §Solver Ownership, define the term at first use: "the **zombie-solver** — the quarantined former central solver under `src/solver`, a prescribed-orbit evaluator with no integrator (audit 2026-07-12) — " and rename that section's subsequent prose references. Until prompt 6 lands, keep the sentence stating its compatibility-only status; after prompt 6, that section says it is deleted.
2. **Scope:** all markdown outside `reference/priorities/braid-archive/` and `content/generated/` (generated copies follow at regeneration). Filenames, file paths, link targets, code identifiers, JSON keys, and command strings are NOT renamed — prose only. `central-solver-independent-audit-2026-07-12.md` keeps its filename; prose referring to it may read "the zombie-solver audit".
3. **Remove before renaming:** where a reference is a stale scope declaration superseded by the EOM policy (the Borg-class hazard), replace the passage with a one-line EOM re-point (pattern: app-borg `priorities.md` §Scope, 2026-07-16) rather than renaming a sentence that should not exist. The seven candidate lanes: app-animator, app-photon, app-causal-delay-feedback, master-equation-closure, aaa-work-threads, open-problems, operations. Judge each reference: DELETE (stale/redundant), RE-POINT (scope declarations), or RENAME (necessary references, e.g. quarantine records, migration plans).
4. **Historical documents** (the archie research-notebook's dated diary entries; audit and quarantine records in app-solver): rename with a first-use gloss per document — "zombie-solver (then called the central solver)" — so dated entries stay legible; do not otherwise rewrite history.
5. **Corpus:** the three research-notebook references follow rule 4; reading copies regenerate.
6. **Verification:** after the pass, `grep -ri 'central solver' --include='*.md'` outside braid-archive and content/generated returns only filenames/paths/link targets and direct quotes; run `node scripts/validate-content.mjs --check --strict`, scene-graph and textbook checks, and regenerate reading copies per the branch/PR process. Report: per-lane counts of DELETE/RE-POINT/RENAME, the AGENTS.md definition diff, verification grep output.

---

## Appendix — survey summary (2026-07-16)

Consumer clusters and dispositions: Borg (MIGRATE, furthest along; blocker `regulator_convergence_failed` at burn-in `[0.06,0.07]`); Photon (BLOCKED-MIGRATE — needs prescribed-path analysis home; Decision B); Ideal Braid (BLOCKED-MIGRATE — same); Animator display modules + T3 (RELOCATE, unblocked); Animator motion + Causal-Delay-Feedback (MIGRATE via shared EOM history-display adapter); legacy braid-ideal instruments ~80 scripts/~82 tests (RETIRE); angular-momentum runner + 2 tests (Decision A: RETIRE); guard scripts and solver-surface tests (KEEP-UNTIL-LAST, die with the directory); `scripts/config/foundational-impact-contracts.json` wires solver globs into pre-commit (edit at retirement). CI hooks otherwise clean. Known residual: the bridge self-reports `canonicalEomEvidence: true` on its native master-equation path (test-pinned) — guarded at fixture boundaries; deleted with the tree in prompt 6.
