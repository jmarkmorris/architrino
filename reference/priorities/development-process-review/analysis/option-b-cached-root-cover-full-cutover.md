# Cached root-cover full Option B transfer

## Result and authority

The operator requested migration of cached root-cover full after the two pilot transfers. Its operational entry and launcher now use the shared captured B reader, a profile-specific external source manifest and the caller-selected `--source-map-sha256` argument. The [admission contract](../contracts/option-b-current-source-admission.md) owns this mechanism. Source admission permits existing operational checks to proceed; it does not authorize scientific execution or accept a numerical result.

The [baseline descriptor](../contracts/option-b-cached-root-cover-full-baseline.json) selects the existing A generation at commit `7c957f86c1ca8c7ff8d4cf8341f2b3e2748b4b09`. The transfer checker retrieves the original entry with `git show`, without executing it, and compares all 34 original bindings against that descriptor. A known one-binding extraction fixture passed before the target inventory. Before edits, the serial baseline selection passed 136 tests across manifest/admission controls, remaining A bindings, full-profile units and adjacent emission/refined/acceleration controls.

## Binding roles and preservation

The transfer checker reports 23 inherited current-source identities, 11 retained evidence identities, 26 B source records and 51 relationships. Every transferred digest equals its retained A value. The three additional records identify the entry, launcher and captured reader. The [full manifest](../contracts/option-b-cached-root-cover-full-sources.jsonld) digest at verification is `438ff3f9f36852070598c213c83ea333402fc65002dd88038091c6f8cc410f8c`. The two pilot manifests pass the same checker with their previously recorded digests unchanged.

The eleven fixed evidence inputs comprise the original history/reconstruction/guard records, seven saved pilot outputs or operational records, and the saved [pilot launch plan](../../braid-program/evidence/2026-08-27-f6c-cached-root-cover-pilot-launch.v1.json). Although that plan lives under `reference/`, it is historical evidence for the full comparison, not a current operational source. Its digest remains `5f5afcced38878828d65e0c5482f1764092f6449c2cba36ac6b99a1bbf9f9f86`. The checker explicitly retains that path, rejects descriptor reclassification and keeps it outside the current-source graph. Admission tests verify all eleven identities remain in the combined plan bindings.

The executable literal census, measured with `git show <baseline>:<path> | rg -o '[a-f0-9]{64}' | wc -l` and current `rg` over the full entry/launcher pair, changes from 34 entry literals plus one launcher literal to eleven entry literals and none in the launcher. This retires 24 literal occurrences: 23 current-source identities and the duplicate outer-helper identity. It does not classify scientific or historical hashes elsewhere as redundant.

Before edits, `rg -l --hidden` searches for the full entry, launcher and process-test basenames under `scripts/`, `tests/`, `reference/op/`, `reference/priorities/` and `.github/` identified active controls, registered spawn sites and historical consumers. Reading the parent emission wrapper and variable-cell adapter showed explicit historical `.source` routes with their own generation identities. Those routes are preserved. The full historical construction test retrieves and verifies both original process-test sources from retained Git before applying the original transformation; current process tests exercise B transport separately.

At verification, `git diff --numstat` reports no changes to the cached preparation, comparison or cached oracle, variable-cell adapter, parent emission wrapper, saved pilot plan or full resource plan, using those seven explicit file paths. The transfer checker additionally verifies the 23 current-source identities against retained A bytes. This is a scoped preservation measurement, not a claim that unrelated files in the shared checkout are unchanged.

## Full operational boundary

The [full resource plan](../../braid-program/evidence/2026-08-27-f6c-cached-root-cover-full-resource-plan.md) remains bound to its original `8263f700a35af04b07690c81c17e0d1078eadb1fb32550cc60226b6efa0f6378` digest. The full unit controls verify the exact 160-cell scope, 10,240 pair-cell certificates, 8,960 ordinary rows, 1,280 self-exclusion rows and 17,920 face/piece records. Pilot scope and the prior resource plan are rejected.

The entry/launcher diff and retained unit controls preserve sequential consumer/comparison dispatch, the inclusive 1800-second deadline, 2 GiB aggregate RSS ceiling, at-most-one-second observation gap, 15-second heartbeat, launch minima of 40 percent free memory and 64 GiB disk, stop minima of 20 percent and 16 GiB, 64 MiB scientific-file bounds and 16 MiB log bounds. This transfer does not rerun or revise the historical timing estimate, reuse a pilot prefix, or execute the EOM solver.

All three root-cover profiles now require external manifest selection in the actual launch and stage CLIs. Shared controls cover captured workers, changed/deleted source files, changed reader or graph bytes, wrong/missing digests, missing coverage and all six directed cross-profile substitutions. A rejected initialization clears prior bindings. At this full-profile checkpoint the remaining A current-binding test covered prescribed-response and acceleration; the subsequent [paired transfer](option-b-prescribed-response-and-acceleration-cutover.md) now completes those profiles.

## Verification

After implementation, 58 focused tests passed. The final broader serial selection passed 217 tests with zero failures, skips or cancellations in 14,800.858375 ms:

```bash
node --test --test-concurrency=1 tests/current-source-manifest.test.mjs tests/option-b-root-cover-admission.test.mjs tests/f6c-root-cover-pilot.test.js tests/f6c-cached-root-cover-pilot-launcher.test.js tests/f6c-cached-root-cover-full.test.js tests/current-launch-bindings.test.js tests/content-integrity-reporting.test.js tests/pr-validation-receipt.test.js tests/f6c-emission-refinement-pilot.test.js tests/f6c-refined-acceleration-pilot.test.js tests/f6c-acceleration-pilot.test.js
node scripts/equation-mapping/check-current-source-maps.mjs
```

The full process selection passed six tests with zero failures, skips or cancellations in 6860.549667 ms, with approved host process-observation access:

```bash
node --test --test-concurrency=1 tests/f6c-cached-root-cover-full-process.test.js
```

These are synthetic transport controls: two-stage closure, first-target failure, monitored final publication, startup interruption, lost process monitoring and monitor-log failure. They do not execute the scientific full campaign. Python-backed unit fixtures use the shared project venv. `node scripts/validate-content.mjs --check --strict` passed with zero errors and warnings after documentation integration, `node scripts/check-owned-compute-launch-policy.mjs` passed its registered spawn-site census, and `git diff --check` passed. The whole Content Integrity aggregate, full repository test suite, mathematical-map approval, scientific execution and publication are outside this result.

Claim grade: measured for the stated byte comparisons and selected tests; inferred for the suitability of the bounded operational replacement. A source change admitted under the previously selected map digest, a missing inherited binding, a changed historical pilot identity, wrong-profile admission or failure of a retained full resource/process control would overturn the corresponding result. The wider Option B migration remains incomplete.

## Authored write set

- Operational integration: [full entry](../../../../scripts/eom/run-f6c-cached-root-cover-full.mjs) and [full launcher](../../../../scripts/eom/launch-f6c-cached-root-cover-full.mjs).
- Admission and controls: [transfer checker](../../../../scripts/equation-mapping/check-current-source-maps.mjs), [shared admission tests](../../../../tests/option-b-root-cover-admission.test.mjs), [full unit tests](../../../../tests/f6c-cached-root-cover-full.test.js), [full process tests](../../../../tests/f6c-cached-root-cover-full-process.test.js) and [remaining A tests](../../../../tests/current-launch-bindings.test.js).
- Source records: [full baseline](../contracts/option-b-cached-root-cover-full-baseline.json), [full manifest](../contracts/option-b-cached-root-cover-full-sources.jsonld) and [shared contract](../contracts/option-b-current-source-admission.md).
- Integration and evidence: this record, [inventory](option-b-current-source-cutover-inventory.md), [cached-pilot continuation](option-b-cached-root-cover-cutover.md), [full operational owner](full-root-cover-current-migration.md), [readiness](option-b-integration-readiness.md), [architecture](../../../op/git/git-backed-knowledge-architecture.md), [priorities](../priorities.md), [campaign](../processes-git-codex-claude.md) and [work log](../work-log.md).

## Continuation

The subsequent [paired transfer](option-b-prescribed-response-and-acceleration-cutover.md) completes prescribed-response and acceleration. The [remaining migration plan](option-b-remaining-migration-plan.md) now owns B-REM-1 through B-REM-5, including scientific-source dispositions and repository-wide closeout; these transfers do not relax scientific controls.
