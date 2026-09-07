# Process Repair and Validation

Date: 2026-09-07. The operator authorized both the normal-completion/cancellation repair and the consequential repair audit. The [audit](consequential-repair-audit.md) records the separate historical-binding findings and remaining source-generation blocker.

## Result and contract

The shared registered supervisor now allows a workload to return naturally and drain its referenced timers and output. The watchdog's child-process and IPC references no longer keep an otherwise finished runner alive. When its parent IPC channel closes, the watchdog observes parent departure for at most one second; it exits without signalling after reparenting, or cancels its still-live parent group if the parent remains. Its supervisor connection, explicit cancellation, and signal handlers stay armed during that observation. No historical PID becomes signalling authority.

The supervisor separately waits, within the original work deadline and a one-second bound, for the authenticated watchdog to finish after runner close. It does not extend that wait to unexplained workload descendants. The final process census, clean runner exit, gate measurements, log bindings, and admission checks remain required. Normal completion does not invoke a forced successful exit.

The original minimal probe, unchanged, reports acceptance in 0.268 s and independently finds both recorded processes absent after the repair. Its baseline natural-return failure took 5.314 s before deadline cleanup. This operational comparison uses the same probe on the same Mac Node v26.3.0; it makes no scientific validity claim. The repaired supervisor SHA-256 is `35f00bb0b97a045447f3053ed2705bddceaa62d1ebdd522e9f6eb44943215826` by `shasum -a 256`.

## Tests and coverage

| Instrument | Result | Coverage and limits |
| --- | --- | --- |
| Final nine-file Node process regression command, recorded in [runs.json](../evidence/repair-validation/runs.json) | 85 passed, 0 failed, 0 cancelled, 0 skipped; 89.804 s test duration, 89.883 s outer lease duration | Shared launcher, F5 startup, seven pilot compositions. Tests include natural return, pending 2 MiB output, referenced timer, import failure, watchdog IPC loss with a still-live runner, deadline cancellation, monitor/diagnostic faults, unrelated-process preservation, and independent recorded-PID absence. Python targets use the shared venv; scientific admission is deliberately synthetic. |
| Final cached pilot/full source-composition suites | 65 passed, 0 failed, 0 cancelled, 0 skipped; 1.677 s test duration | Complete source-retargeting assertions remain intact and select the revised process controls. |
| Earlier four-file source/layout run | 111 passed, 3 failed out of 114 | Two failures were source-test pins made stale by this repair's later fixture changes; the final 65-test run resolves them. One preparation-generation mismatch remains, described below. Markdown layout tests passed, including the audited priority-link case. |
| Priority-ranking validator | Passed: 26 active owners, 14 ranked rows | Queue/ranking structure only. |
| Startup-router check | Current | No generated files rewritten. |
| `git diff --check` | Passed | Tracked whitespace validation. |
| Whole-file comparison for the 32 operational binding files, normalizing only SHA-256 values | Passed | Every byte outside digest values equals `HEAD`; this is syntax preservation, not mathematical acceptance. |

Full command arguments, exit statuses, durations, and process-group closure results are retained in [runs.json](../evidence/repair-validation/runs.json), with complete stdout/stderr alongside it. Earlier unsuccessful runs are retained too: initial operational pin refusal (2/11 passed), the exposed acceleration fixture race (10/11 passed), and the first seven-file matrix (50/61 passed). These failures were investigated rather than removed from the record. The final combined run verifies the corrections together.

## Test corrections

The bootstrap interruption test observes the newly created runner and its direct children before deliberately rejecting authentication. Its independent PID-absence assertions are restored for both interruption timings. Those observations remain test witnesses, not signalling authority supplied to the supervisor.

Monitor faults previously depended on the sixth process-table query. That count could occur before the stubborn target started, so the tests sometimes exercised startup cancellation instead of their advertised active-target case. The synthetic targets now write a readiness marker after installing their stubborn signal behavior, and fault injection waits for that marker. Existing target registration and independent absence checks remain.

Monitor loss may be observed first by the outer resource monitor or the registered supervisor. The three Python composition fixtures now accept only the exact injected monitor error or the supervisor's explicit interruption error, while still requiring failure, started targets, no comparison dispatch, and cleanup. Log/diagnostic failure can leave process inspection available: in that case a complete cleanup census is stronger than the fallback PID-only observation. Tests accept either explicitly reported cleanup route and retain independent process-absence assertions. They do not interpret missing fields alone as success.

## Remaining blocker: preparation pin

The refined-acceleration source-generation test still fails because `run-f6c-refined-acceleration-pilot.mjs` pins its preparation script at `738c716f…52842c`. Before this repair, `git show HEAD:scripts/eom/prepare-f6c-refined-acceleration.py | shasum -a 256` gives `6786bcda…b9d7c4c`, already different. The current preparation script differs from those baseline bytes only in reviewed operational hashes, but that does not establish what the older expected generation contained.

Hashing the seven available versions from that path's history rooted at `36d34a262` did not recover the expected value. This is a bounded history search, not proof the blob is unrecoverable. The expectation has not been replaced. Recover its original bytes and compare the intended source contract before deciding whether to update the current-generation pin or preserve a separate historical dependency. Owner: braid-program/OPS-024 source-generation review. This is a genuine outstanding validation failure, not an environmental exclusion.

The historical full-entry binding problem found in the audit is another explicit blocker for historical evidence authentication. Those bindings remain unmodified. Neither blocker is evidence that the repaired process-lifetime behavior failed its 85 controls, and those passing controls do not clear either blocker.

## Boundaries

No broad sweep, scientific computation, compiled EOM run, Git publication, or CI re-enablement occurred. Validation is on Mac Node v26.3.0; Node 22 and a GitHub Linux runner have not been measured in this repair. The generic owned-compute startup-deadline finding remains separate and open. Test jobs ran under the canonical outer supervisor with explicit deadlines and five-second heartbeat records; Final `owned-compute-supervisor.mjs closeout --owner-task` returned `clear` after checking 260 leases; the focused controls additionally perform independent recorded-PID checks. The owned-compute launch-policy and machine-artifact-retention validators also passed. Original agent reports and post-report responses retain their previously measured SHA-256 values.
