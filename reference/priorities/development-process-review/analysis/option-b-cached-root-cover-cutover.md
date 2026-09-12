# Cached root-cover pilot Option B transfer

## Result and authority

The operator requested migration of the cached root-cover pilot after the first root-cover transfer. Its operational entry and launcher now use the shared B reader, a profile-specific external source manifest, and the caller-selected `--source-map-sha256` argument. The [admission contract](../contracts/option-b-current-source-admission.md) owns that mechanism and its authority limits. Source admission permits the existing checks to proceed; it does not authorize scientific execution or accept a numerical result.

The [retained baseline](../contracts/option-b-cached-root-cover-baseline.json) selects commit `7c957f86c1ca8c7ff8d4cf8341f2b3e2748b4b09`, the existing A generation. The shared transfer checker retrieves its original entry with `git show`, without executing it, and compares its complete literal binding map with the descriptor and the [current manifest](../contracts/option-b-cached-root-cover-sources.jsonld). A known one-binding parser fixture passed before the target inventory. The pre-edit serial selection passed 72 tests across the shared manifest controls, A bindings, cached pilot and cached full unit controls.

## Binding inventory and preservation

The transfer checker reports 22 inherited repository identities, three retained numerical-evidence identities, 25 B source records and 49 relationships. Every inherited repository digest equals its original A value. The three additional B sources are the entry, launcher and captured reader. The cached manifest digest at verification is `78df2502d31d65462c3995cbbfcf20f168e106727def1e2b65f973a63cfbcf30`. The first profile's manifest remains `c5524aedb2d0a6bccd16df1f96bf86815cdc676b5c57d0c3fdac21ea7b340b14` and passes the same checker.

The exact before/after source selections are enumerated in the baseline and manifest. Their roles include cached preparation and comparison, cached and uncached references, scientific tests, scientific declarations, the cache-equivalence argument, the pilot resource plan and the earlier full resource-plan input required by the comparison. The existing independent comparison's 20 fixed bindings are still checked in actual `planBindings` coverage. None of those source digests is refreshed.

The literal census, measured by `git show <baseline>:<path> | rg -o '[a-f0-9]{64}' | wc -l` before and `rg -o '[a-f0-9]{64}'` over the current entry/launcher after, changes from 25 entry literals plus one launcher literal to three entry literals and none in the launcher. Thus 23 executable literal occurrences are retired: 22 distinct current repository identities and the duplicate outer-helper identity. The three remaining literals bind retained numerical evidence. This census is confined to the migrated executable pair; scientific reference and historical test hashes are not redundant merely because they use the same syntax.

Before edits, scoped `rg -l --hidden` searches for both executable basenames and the process-test basename under `scripts/`, `tests/`, `reference/op/`, `reference/priorities/development-process-review/` and `.github/` identified active tests, the owned-compute path census, historical migration receipts/source archives and the variable-cell adapter's historical identities. Actual control reads separated those roles. The owned-compute policy counts registered spawn sites, which this transfer does not change. The variable-cell adapter and its historical source archives retain their existing generation identities. `git diff --numstat` reports no changes to that adapter, the cached preparation/comparison or the cached reference source at verification; the transfer check additionally verifies all 22 selected current repository sources against the retained A digests.

## Operational and historical controls

Both actual CLIs require the caller-selected source-map digest. Tests show a wrong digest fails before a deliberately missing plan can be read; the correct digest reaches that missing-plan check. Captured entry and worker tests verify admission and subsequent rejection of altered map bytes. Source replacement, deletion, reader substitution, graph mutation under an old digest, missing coverage and wrong-profile selection fail. The tests also verify that every B source and the map enter the plan's combined binding set and that a conflicting composition identity is rejected.

The cached manifest cannot authorize the uncached entry, and the uncached manifest cannot authorize the cached entry, even with the supplied manifest's correct digest. The shared transfer checker admits only its explicitly configured profile paths and scopes. Both profiles are covered by the existing required Content Integrity invocation; the A current-binding test now retains only cached full, prescribed-response and acceleration.

Historical construction controls retain their original transformations and independently recorded predecessor hashes. They now retrieve both sides of the pre-B construction comparison from the retained Git generation. The downstream full-profile test retrieves the original cached process test from that generation and verifies its original `433452397ac00c2deaa6a9300b84510f553943c491fd49c965a7573a691b0cf7` digest. Its current full-profile target and other `.source` fixtures are unchanged. This preserves the historical claim while the active cached controls exercise B.

An intermediate compatibility run passed 82 tests and failed one cached preflight-coverage test: its synthetic plan still supplied placeholder entry/launcher identities, conflicting with the new manifest's actual composition identities. The test fixture now supplies those actual identities for that coverage assertion. The admission check was not weakened. No scientific failure is inferred from this fixture mismatch.

## Verification

The final serial selection passed 127 tests, with zero failures, skips or cancellations, in approximately 5.3 seconds:

```bash
node --test --test-concurrency=1 tests/current-source-manifest.test.mjs tests/option-b-root-cover-admission.test.mjs tests/f6c-root-cover-pilot.test.js tests/f6c-cached-root-cover-pilot-launcher.test.js tests/f6c-cached-root-cover-full.test.js tests/current-launch-bindings.test.js tests/content-integrity-reporting.test.js tests/pr-validation-receipt.test.js
node scripts/equation-mapping/check-current-source-maps.mjs
```

The cached process selection passed six tests under approved host process-observation access:

```bash
node --test --test-concurrency=1 tests/f6c-cached-root-cover-pilot-process.test.js
```

These process controls use synthetic targets, covering two-stage closure, first-target failure, final-output monitoring, startup interruption, lost process monitoring and monitor-log failure. They do not run the scientific pilot. The unit selection includes synthetic Python bootstrap/runtime controls using the shared project venv. `node scripts/validate-content.mjs --check --strict` passed with zero errors and warnings after documentation integration, and `git diff --check` passed. No full Content Integrity aggregate, broad repository test sweep, mathematical-map approval, scientific pilot or publication is part of this result.

Claim grade: measured for the named byte comparisons and tests at their stated scopes; inferred for the suitability of this bounded operational replacement. A changed source admitted under the previous selected manifest digest, a lost inherited comparison binding, acceptance of the wrong profile or a failed retained process/scientific control would overturn the corresponding result. The wider migration is incomplete.

## Authored write set

| Group | Files |
| --- | --- |
| Cached operational integration | [Entry](../../../../scripts/eom/run-f6c-cached-root-cover-pilot.mjs), [launcher](../../../../scripts/eom/launch-f6c-cached-root-cover-pilot.mjs) |
| Shared B integration | [Transfer checker](../../../../scripts/equation-mapping/check-current-source-maps.mjs), [admission controls](../../../../tests/option-b-root-cover-admission.test.mjs), [Content Integrity label](../../../../scripts/check-content-integrity.mjs), [remaining A profiles](../../../../tests/current-launch-bindings.test.js) |
| Cached and downstream controls | [Cached unit](../../../../tests/f6c-cached-root-cover-pilot-launcher.test.js), [cached process](../../../../tests/f6c-cached-root-cover-pilot-process.test.js), [full historical control](../../../../tests/f6c-cached-root-cover-full.test.js) |
| Policy and data | [Baseline](../contracts/option-b-cached-root-cover-baseline.json), [manifest](../contracts/option-b-cached-root-cover-sources.jsonld), [admission contract](../contracts/option-b-current-source-admission.md) |
| Integration and evidence | [This record](option-b-cached-root-cover-cutover.md), [inventory](option-b-current-source-cutover-inventory.md), [readiness](option-b-integration-readiness.md), [architecture](../../../op/git/git-backed-knowledge-architecture.md), [priorities](../priorities.md), [campaign](../processes-git-codex-claude.md), [work log](../work-log.md) |

## Continuation

The subsequent [cached-full transfer](option-b-cached-root-cover-full-cutover.md) completes that profile's B admission while preserving its full-coverage resource limits, fixed pilot evidence and historical composition controls. The measurements above remain the cached-pilot checkpoint.

1. ○ Not done — migrate prescribed-response and acceleration current-source roles with their own inventories and retained historical/scientific distinctions.
2. ○ Not done — disposition scientific preparation/verifier source bindings separately before changing their inherited scientific source identities. None of the current root-cover transfers relaxes those obligations.
