# Option B F6c coordinator cutover

## Scope and independent acceptance

The operator approved the checker-first contract, a separate reviewing agent and subsequent coordinator migration on September 12. The [current closure contract](../contracts/option-b-f6c-current-closure.md) and [independent review](../evidence/option-b-f6c-closure-review.md) record the accepted first phase. The checker was frozen before coordinator implementation. This record covers that coordinator and the necessary immediate caller changes; it does not close the remaining F6c family in [B-REM-1](option-b-remaining-migration-plan.md).

`shasum -a 256` after implementation confirms the accepted checker remains `9887632e2900efb1feecf0dfe24ae5f138e46ba7ab870c56eede66a522e84609`, its new controls remain `a8decb91a48773cbfe0a8a408c2c6fd12217a0f154676464a272bc64c99e8618`, historical controls remain `a01885b905f72d1f1a933c6d5282d684c702a2d42378f4f02eb3e6e3f3499c56`, and the contract remains `1c08c60d570c56dc682cdfa60f8397e9ba9107adc329cf0cec2f192a6d54c19d`. The independent review accepted 13 checker controls and 21 additional boundary probes before the coordinator changed. These establish a bounded protocol contract, not scientific correctness.

## Admission and caller changes

The [authored source map](../contracts/option-b-f6c-bounded-operation-sources.jsonld) selects six source records: the coordinator, its controls, the existing manifest reader, and three operational helpers. Ten relationships preserve explicit dependency and admission coverage. Including the manifest itself, seven physical bindings enter the coordinator lifetime. The coordinator requires an external map digest on both serial and streamed CLI routes, captures the selected reader before import, checks the exact six-source composition and retains original file identities. File workers receive the admitted canonical root and selected manifest digest from the lifetime, overriding any job-supplied values while retaining the original deadline.

| Owner under `scripts/eom/` | Current change and boundary |
| --- | --- |
| `f6c-bounded-operation.mjs` | Replaces its three inline operational helper selections with the explicit manifest. Both CLI routes require `--source-map-sha256`. Source, output, process and resource predicates remain. |
| `observe-parent-batch.mjs` | Requires externally selected coordinator and manifest digests, independently captures the selected graph before dispatch, saves the expected invocation and passes that expectation to the frozen checker after actual exit and process observation. |
| `prepare-f6c-parent-refinement-batch.mjs` | Uses preparation schema v3 with an explicit `sourceMap`; requires coordinator/map CLI selections, complete admitted-source coverage and forwards those selections to the observer. Old configurations are not silently upgraded. |
| `run-f6c-parent-emission-refinement-pilot.mjs` | Uses the coordinator selected in its bound plan and verifies the plan's admitted map/source coverage. Current batch completion requires external closure v2. Its scientific and historical selections remain separate. |
| `run-f6c-evidence-packaging.mjs` | Verifies the coordinator source map selected by its bound plan and includes admitted physical sources in the producer budget. Its own operational/scientific tables have not migrated in full. |
| `run-f6c-streamed-leaf-diagnostic.mjs` | Retains an explicit operational selection of the successor coordinator and its controls. Process fixtures pass an external map digest. Its own map transfer and separate streamed acceptance owner remain distinct. |

The required Content Integrity admission-test selection in `scripts/check-content-integrity.mjs` now includes the coordinator admission controls and frozen current closure controls. The long, host-dependent synthetic process test remains a separately selected check; adding the short tests does not claim that the whole Content Integrity pipeline ran.

## Baseline and source roles

The pre-edit coordinator was `6d544440f81267564f8e05eca4b0c6889bdb20ed079dbac02887b331140e349d` by the saved eleven-file SHA-256 inventory. The successor is `f0a310b0902b66b60b98ab2f6b2109f352a1263ad23cc1bd5b53763c197bcd7c`; its control is `a71ef095189f0bae802db6286868c4b99f4a756382c111e7980e9fa38ad4504b`. The final authored manifest is `7bb1bf565b0f146c69f5547caf1ccb9c796ff17508a44ff51630cccd246e7baf`, all measured by `shasum -a 256` on those files.

The manifest's baseline commit `ab3ed93a59e69a5807397c24cefcfcb3a9642487` identifies the retained checkout ancestry, not a claim that every selected source equals that commit. `git show HEAD:scripts/eom/f6c-bounded-operation.mjs` shows earlier helper identities. The current prescribed and diagnostics helper successors were already selected by the preceding [paired migration](option-b-prescribed-response-and-acceleration-cutover.md) before this phase; the circular helper remained unchanged. This phase does not disguise those successor selections as unchanged Git-baseline transfers.

| Operational dependency | Selected SHA-256 | Disposition |
| --- | --- | --- |
| `launch-prescribed-response-pilot.mjs` | `fc758e8ffc1feaa566cc8e1849f73a0c8907f5ad7567e43fffd151eeceac30a1` | Previously migrated operational helper; no helper-source edit in this phase |
| `launch-subfield-circular-root-pilot.mjs` | `71974054ddce7fc29b8464b9a7a63f8fbb04ee5b425dc997df4d40b2804341aa` | Preserved operational helper |
| `launch-f6c-emission-refinement-pilot.mjs` | `8a7759d803c49470f471ef4e58171bbe010466aaf0d7abe92f6f9897881bbbb0` | Preserved pre-edit successor; its own B transfer remains pending |

`shasum -a 256` on both emission/refined entry-launcher pairs and `prepare-f6c-streamed-leaf-invocation.mjs` reproduces their pre-edit inventory values. Source-diff review in the independent record confirms the parent scientific/history tables, packaging scientific tables, preparation expectations and streamed numerical/history selections were not changed by this coordinator work. This is declaration and source preservation, not scientific execution or reacceptance of historical outputs.

## Verification and discovered defect

The independent reviewer found a real serial wiring defect after the first unit passes: the shared file-worker helper automatically invokes an exported source initializer, but the initial coordinator change did not supply its root and manifest digest. A known literal worker passed before the reviewer demonstrated that rejection. The fix stores the admitted selection in the lifetime and forwards it to serial workers. A new worker regression control checks missing/wrong digests and successful capture. The actual synthetic serial operation then passed against the unchanged checker. The independent reviewer accepted the corrected handoff after 55 focused controls and retained serial-evidence inspection; final-selection serial and streamed runs subsequently passed as recorded below. An older source-shape assertion was updated to require the added context while retaining its deadline/prior-context checks. No checker predicate was weakened.

| Instrument and scope | Measured result |
| --- | --- |
| Ten-file serial Node selection below | 183 tests pass; zero failures, skips or cancellations; 13.095 seconds |
| `node --test --test-concurrency=1 tests/option-b-f6c-coordinator-process.test.mjs` | Two tests pass; known literal hook/serializer/SHA checks precede the actual serial invocation. Real exit-zero, process-group closure, lock release and v2 observer acceptance pass; two wrong externally selected digests reject before dispatch. Final selection run: 1.304 seconds. |
| Final full `tests/f6c-streamed-leaf-diagnostic.test.js` run under the owned supervisor | 69 tests pass; zero failures, skips or cancellations; 209.181 seconds. The supervisor reports completed, exit zero, no signal and closed process group. The earlier pre-fix run also passed 69 controls in 209.788 seconds. |
| `node scripts/equation-mapping/check-current-source-maps.mjs` | All five original profile transfers pass. This checker does not count the coordinator as an additional original profile. |
| `node scripts/check-owned-compute-launch-policy.mjs` | Passes the declared launch-policy scope |
| `node scripts/validate-content.mjs --check --strict` | Zero errors and warnings in the checked content scope |

```bash
node --test --test-concurrency=1 tests/current-source-manifest.test.mjs tests/option-b-root-cover-admission.test.mjs tests/option-b-f6c-coordinator-admission.test.mjs tests/f6c-bounded-operation-current-closure.test.js tests/f6c-bounded-operation.test.js tests/f6c-parent-emission-refinement-pilot.test.js tests/f6c-parent-refinement-batch-preparation.test.js tests/f6c-evidence-packaging.test.js tests/f6c-emission-refinement-pilot.test.js tests/f6c-refined-acceleration-pilot.test.js
node --test --test-concurrency=1 tests/option-b-f6c-coordinator-process.test.mjs
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --deadline-seconds 420 --heartbeat-seconds 15 -- node --test --test-concurrency=1 tests/f6c-streamed-leaf-diagnostic.test.js
```

The serial run's complete invocation, owned exit, process snapshot and closure are retained locally under `.local-data/braid-analysis/option-b-current-closure-CDq38G/observer/`. They are operational evidence only. The final full streamed lease is `352f49e8-7e50-4266-bc3d-23b6aa7f3b22`; the earlier lease is `d44c01ce-a3f4-4fe0-914a-321335d849c7`. Both retain exact commands, heartbeats and closed process-group observations in the ignored owned-compute store. Python-dependent synthetic controls use the shared venv, whose executable reported Python 3.13.2 before the full run. No new production scientific computation, generated-artifact write or Git publication was performed.

The independent reviewer subsequently confirmed the final-map serial receipt, including its 16 original source identities and five output identities, in the review's final-selection section. `git diff HEAD --check` passes over the combined staged and unstaged changes; this task did not alter the ambient index. `node scripts/dev/owned-compute-supervisor.mjs closeout --owner-task "$CODEX_SESSION_ID"` reports `clear` for this task after final process verification. Neither result is an overall repository-health claim.

## Remaining work and falsifier

B-REM-1 remains partial. Its emission/refined entry-launcher pairs and the parent, packaging and streamed callers still need their own complete operational-map transfers and dependent-path validation. Updating the streamed caller's coordinator identity is necessary compatibility work, not completion of its B transfer. The existing streamed preparer still emits v4 while the current caller requires v5, by reviewer inspection of both live and HEAD sources; that deferred scientific transport must not be represented as repaired here. Packages B-REM-2 through B-REM-5 remain unselected.

Claim grade is measured for the named tests, captures and scoped source comparisons; the conclusion is bounded operational coordinator support. A selected-map bypass, a serial worker accepting substituted admission context, acceptance with incomplete exit/process/lock closure, changed original source identities, or an altered frozen checker would falsify that conclusion. Completing this prerequisite does not establish scientific acceptance or close the original dependency-closed F6c package.
