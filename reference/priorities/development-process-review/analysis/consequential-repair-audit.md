# Consequential Test and Pin Repair Audit

Date: 2026-09-07. Scope: the seven commits named in agent 2's report, their consequential test changes, the shared supervisor's antecedent change, and the operational binding update required by the newly authorized supervisor repair. This is an audit of attribution and selected contracts, not certification of every scientific dependency or the full repository test collection.

## Findings

**The normal-return defect predates the seven repair commits.** `git diff 00710092e^ 00710092e -- scripts/eom/launch-subfield-circular-root-pilot.mjs` introduces the root watchdog, its referenced child relationship, and its disconnect-to-cancellation path. The earlier [independent workload controls](first-process-investigation.md) reproduce a failed natural return at the reviewed baseline. The seven-commit inventory shows only digest substitutions in that launcher during the repair campaign. This supports a pre-existing operational defect exposed by bringing current launchers into use; it does not establish which agent originally authored the defective change or that every earlier process failure had this cause. A different pre-change reproduction would narrow or overturn the attribution.

**The bootstrap test repair preserved an important authentication boundary but removed an independent cleanup check.** `git show 582efe4bf -- tests/f5-prehistory-handoff-build-startup.test.js` changes the expected bootstrap interruption to an unauthenticated-birth cleanup failure and permits an absent runner identity. That is consistent with the current source contract: an inspection rejected before return must not authorize signalling a historical PID. The same diff removes the recorded-PID absence assertion for this case. This repair restores independent observation before the injected interruption and checks those observed processes are absent afterward, without passing their identities to the supervisor as signalling authority. It preserves failure rejection and the absence of target acknowledgement.

**The layout test change is consistent with the live path.** `git show 36d34a262 -- tests/markdown-runtime-layout.test.js` changes two input links to `mapping-benchmarks/analysis/malus-law.md`; it does not change renderer logic or the expected navigation assertion. The live destination exists by `ls`, and reading the test shows that its assertion already requires that destination. This evidence supports a fixture-path correction, not a broad weakening of link validation.

**Historical source bindings were advanced along with current source bindings. This needs repair before historical computations can be authenticated.** The intact local full-run admission receipt has the SHA-256 expected by the current parent-refinement code. Its `sourceBindings` record the full entry as `1398a005…73352b`, the old launcher as `5aa154b1…995baa`, and the enclosure contract as `f20e4bda…17f68`. By contrast, `git show HEAD:scripts/eom/prepare-f6c-parent-emission-refinement.py` names `9e71ac12…3ee792` as `ORIGINAL.fullEntry`. The [comparison evidence](../evidence/repair-audit/historical-source-binding-comparison.json) contains the exact values, receipt identity, and commit-by-commit transition.

This mismatch was already present at the parent of the first audited commit: its `ORIGINAL.fullEntry` is `373930ca…99bb0`. Four subsequent audited commits advance it again. Therefore this audit does **not** attribute the original corruption solely to Claude's latest campaign. It establishes that the campaign continued advancing a historical binding without making it match the recorded computation. Reading `authenticate_full` in the parent preparation code shows why this matters: it derives the expected historical source set from the captured full-entry pins and compares those pins with the old admission's source bindings. Matching a new entry's file hash cannot establish that old source set.

No historical receipt, source archive, mathematical oracle, or evidence document was rewritten in this repair. Four consumers' `fullEntry` history bindings were explicitly excluded from the new operational update: the variable-cell adapter, parent preparation, parent verification, and parent pilot runner. Their existing historical mismatch remains an explicit blocker, not an environmental exception or a passing scientific result. The next repair should recover the actual source generation named by the intact receipt, use the existing historical routing/archival contract, and verify the original source set independently. It should not regenerate old evidence to match current code.

## Commit attribution

The [inventory](../evidence/repair-audit/commit-change-inventory.json) is produced from actual parent/child file bytes, not commit subjects. Its [instrument](../evidence/repair-audit/commit-audit.mjs) passed known controls for a digest-only substitution, a code change, and an assertion removal before examining the target commits. “Digest-only” means whole-file equality after replacing lowercase 64-digit hexadecimal tokens; it establishes syntax preservation outside those tokens, not semantic permission to advance a pin.

| Commit | Changed files | Digest-only file changes | Other changes |
| --- | ---: | ---: | --- |
| `730940e16` | 4 | 0 | Operations/self-test and queue records |
| `295a24ce2` | 48 | 46 | Two queue records |
| `590ddc942` | 50 | 49 | Braid queue record |
| `582efe4bf` | 42 | 40 | Braid queue and bootstrap-test expectation |
| `959247191` | 41 | 41 | None outside digests |
| `bb9d82d94` | 2 | 0 | Two queue records |
| `36d34a262` | 7 | 1 | Operations/braid/field-speed records, conversion ledger, two layout-fixture links |

These are 194 commit/file changes, including repeated changes to the same file; 177 are digest-only by the stated instrument. This corrects the report's unverified commit-to-file attribution. In particular, the previously uninspected `590ddc942` changes 49 code/test files only through digest values; it also updates the braid queue. The historical-binding finding above demonstrates why that syntactic result is insufficient to approve those values.

## Current operational update

The normal-return repair changes the operational supervisor's event-loop lifetime and bounded watchdog shutdown. Its direct digest consumers were enumerated with repository `rg` before updating them. The transitive [binding plan](../evidence/repair-audit/operational-binding-update.json) records 32 current code/test files, exact old/new values, affected lines, and dependency paths. It was computed in memory before application, using known two-level and unchanged-source controls. Only pins equal to a tracked baseline source's actual digest could propagate; unrelated stale values were not “fixed.” The four historical `fullEntry` edges above were explicitly withheld. A before-write comparison rejected concurrent edits.

The affected preparation/verification modules change only operational or transitively affected current-source digest values. No formula, numerical tolerance, mathematical reference implementation, historical output hash, or admission criterion was changed there. Source-composition tests still compare complete source text and keep their original assertions; their current-source digest values select the reviewed operational generation. This is operational compatibility, not renewed scientific acceptance of old computations.

The repair also exposes and addresses process-test defects: query-count-based fault injection can fire before its advertised target starts, and a test demanding the fallback cancellation field can reject a valid complete cleanup census. Synthetic targets now signal readiness before monitor faults are injected. Tests require actual target registration, independent PID absence, failure rejection, and either the applicable complete census or the explicitly narrower cancellation observation. Failed test runs and their subsequent corrections are retained in the validation record; none are reclassified as harmless environmental failures.

The subsequent source-binding test also exposes a pre-existing refined-acceleration preparation pin that disagrees with baseline source bytes. Its expected generation was not recovered in the bounded history search and was not replaced; the [validation record](process-repair-validation.md#remaining-blocker-preparation-pin) names the exact test and values. Two source-composition test files also required later digest updates after their process fixtures were repaired; the [second binding plan](../evidence/repair-audit/process-test-binding-update.json) preserves those changes. Both source-composition suites then passed all 65 tests.

## Remaining scope

The broader mathematical consequences of earlier proof-document edits, configuration identity changes, enclosure certificate rewrites, and other reported failure families remain with their existing owners. This pass neither restores the old entire branch nor certifies the new entire branch. The next highest-value task is restoring the historical source/evidence distinction, followed by the explicitly inventoried failure families. Generic owned-compute startup deadline failure remains a separate operational defect from the pilot watchdog repaired here.
