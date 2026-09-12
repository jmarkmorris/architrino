# Original source recovery and current binding repair

Date: 2026-09-07. The operator authorized this recovery after publishing the preceding process repair. `git --no-optional-locks status -sb` and `git show HEAD` establish the starting checkout as clean at `713c53a0acf5c8c78002873d9ebc8887bd8d4bcc`. This work distinguishes the bytes used by an earlier calculation from the sources selected for a new execution. A hash is a fingerprint of bytes; a pin is an expectation that a particular input has that fingerprint. Neither establishes mathematical correctness.

Legend: ✓ Done, ◐ Partial, ○ Not done. The investigation below is historical; its original measurements are preserved. Current follow-through is:

| Follow-through | Current status and evidence |
| --- | --- |
| Reconstruct the selected preparation generation | ✓ Done — exact reconstruction and controls below |
| Implement parent authored-evidence and external coordinator contracts | ✓ Done — current transport boundary |
| Migrate the fourth authored historical binding | ✓ Done — current source-binding repair |
| Retire external-environment identity tracking | ✓ Done — current host capabilities are not historical inputs |
| Complete refined current execution | ◐ Partial — Blocked; the [current caller contract](remaining-caller-contracts.md) retains its original-utility requirement |

## The preparation pin identified an intermediate edit

The preparation generation expected by the refined-acceleration pilot was recovered exactly. `git show baa3e7323` introduces the expected `738c716f…52842c` pin while changing two dependency digests in the preparation source. Reconstructing the parent source with only its helper digest replaced yields that exact expected SHA-256. Applying both substitutions gives the bytes actually committed, whose fingerprint differs. Thus the pin selects an intermediate source state rather than the state in that commit. This is measured byte attribution; it does not establish which person or agent calculated the pin, or whether concurrent activity, edit ordering, or a stale calculation caused its publication.

The [recovery instrument](../evidence/source-recovery/recover-sources.mjs) checks a known single substitution, duplicate-substitution refusal, and the standard SHA-256 value for `abc` before reconstruction. Its [receipt](../evidence/source-recovery/recovery-receipt.json) identifies the parent commit, exact substitution, expected fingerprint, byte count, and retained nonexecuting source. The initial exploratory four-combination calculation preceded these controls; it is a lead, not the verification instrument. The controlled reconstruction independently repeats and verifies the result. An independently retained source with that fingerprint and different bytes would overturn the reconstruction claim; disagreement about the cause of publication would not.

Whole-file `diff -u` between the reconstructed intermediate source and the starting current preparation source finds only digest substitutions. Some substitutions select current execution dependencies; others occur in historical-contract predicates and remain a separate authentication problem. This syntactic observation does not certify every previous pin change. The present repair preserves all mathematics, tolerances, assertions, and historical evidence and repairs only the reviewed current execution composition.

## Further current composition mismatches

The first focused Node run passed the repaired preparation comparison and stopped at the next stale pin. The [complete current composition inventory](../evidence/source-recovery/current-composition-inventory.json) then checked every path selected by that test, rather than stopping at its first assertion. Two further starting mismatches were found: the refined-acceleration checker controls and its current declaration.

The [expanded Git object search](../evidence/source-recovery/expanded-git-blob-search.json) recovered both exact expected versions. `git diff 0fb575921 HEAD -- tests/test_f6c_refined_acceleration.py` shows one change: the synthetic outer-heartbeat schema follows the renamed operational launcher. No assertion or numerical fixture changed. The same command on the projection declaration shows only terminology replacements in its title and resource-lock description. Its definition, proof, premises, acceptance boundary, and numerical limits are unchanged. These comparisons justify selecting those current versions for the current composition; they do not recreate an earlier calculation or authorize a new scientific run.

Current declaration and control pins are kept consistent across their current preparation, verification, and pilot consumers. The [seed record](../evidence/source-recovery/current-binding-seeds.json) and [reviewed dependency propagation](../evidence/source-recovery/current-binding-propagation.json) enumerate the changes. The pre-existing [binding instrument](../evidence/repair-audit/binding-plan.mjs) passed its two-level and unchanged-source controls before proposing the propagation; every proposed occurrence was reviewed before application. Historical `fullEntry` and `refinedClosure` tuples were withheld. Existing exact source-composition assertions remain in place.

## Historical sources recovered, historical verification still blocked

The original full-entry script was recovered from Git blob `53db9db24faeebb297f166a89c463cd77540f827`. Its 27,166 bytes hash to `1398a005…73352b`, exactly the value in the independently intact full-admission receipt. The receipt itself still matches its expected SHA-256 and is unchanged.

The independent [literal-text inspection](../evidence/source-recovery/verify-recovered-entry.mjs) passes known path, constant, duplicate, and unknown-constant controls before reading the archived entry. All 35 extracted pins match the intact receipt by absolute logical path and hash, as recorded in its [result](../evidence/source-recovery/recovered-entry-validation.json). No archived JavaScript is evaluated. This checks the recovered entry's internal binding set against the receipt; it does not validate the receipt's scientific claims.

The [original-binding inventory](../evidence/source-recovery/original-binding-inventory.json), produced by a [known-case-tested instrument](../evidence/source-recovery/inventory-original-bindings.mjs), reads all 198 absolute paths recorded by that receipt and compares length and SHA-256. It finds 176 exact matches, 21 differing files, and one absent file. This is a read-time inventory, not a race-safe launch admission. The nonmatching set comprises 19 repository sources and three macOS utilities. The [Git search](../evidence/source-recovery/search-git-blobs.mjs) recovers all 19 repository sources, including the absent renamed launcher. Exact bytes are retained as `.source` data, with original logical paths, fingerprints, sizes, and Git blob identities in the [historical source archive](../evidence/source-recovery/historical-source-archive.json). They are never imported or executed by this investigation.

The unrecovered versions are the historical `/bin/ps`, `/usr/bin/git`, and `/usr/bin/memory_pressure` bytes. Their complete expected identities are in the archive manifest. Their current installed bytes differ. The bounded local Git search found no matching blob; no claim is made that an operating-system backup or another machine lacks them. Installing or downgrading system utilities is neither necessary nor authorized by this recovery.

The existing parent consumers cannot yet use this archive to authenticate the old computation. Their `historicalDocumentRoutes` contract admits only two exact document generations, with document path/extension restrictions; it does not admit archived source code or host tools. The original source pool also captures the full entry at its live execution path. Updating its pin alone would continue to fail and would not fix those obligations. Further historical predicates have been advanced too: for example, the preparation code's cached-prior comparison-contract expectations select later verifier and declaration hashes rather than the old plan's recorded pair. Those predicates must be reviewed against their actual historical receipts rather than included in a current-source refresh.

Accordingly the four authored historical `fullEntry` bindings remain an explicit unresolved defect. The next implementation needs a coherent authored-logical-identity to physical-archive contract and source-set verification against the intact receipt. It must never execute archived code or infer historical scientific acceptance from fresh operational tests. Current host capabilities remain outside the historical source set.

## Validation

The [focused-run record](../evidence/source-recovery/validation-runs.json) retains exact commands, final states, and complete stdout/stderr, including unsuccessful attempts. Tests ran on Mac Node v26.3.0 and the shared Python venv under the owned supervisor with five-second lease heartbeats. All five recorded jobs closed their process groups. No broad test sweep, historical replay, compiled EOM run, source-archive execution, CI change, or Git publication was performed.

| Check | Result | Meaning |
| --- | --- | --- |
| Final refined-acceleration Node composition | 31/31 passed, within the two-file run | Recovered current preparation, declaration, and control bindings agree; synthetic admission and rejection assertions remain intact. |
| Parent-refinement Node composition in the same run | 11/12 passed; two-file total 42/43, 4.085 s | Remaining coordinator-generation failure described below. |
| Final six affected Python suites | 225/226 passed, 109.017 s | Preparation, checker, parent mapping, single-leaf and streamed-session controls; one historical full-entry failure described below. |
| Initial preparation-only Python run | 44/44 passed, 0.809 s | Independent exact-arithmetic and failure controls before the later declaration/control pin propagation. |
| Initial current-source Node run | 30/31 passed | Exposed the checker-controls mismatch after the preparation correction; retained rather than discarded. |
| Initial combined Python run | Incomplete at the selected 90-second outer deadline | Not a pass or diagnosis of a hang. The same six suites then finished under a 300-second hard bound with named-test output. |
| Recovered original entry versus intact receipt | 35/35 pins agree | Literal-text inspection only. |

Two measured failures remained at this historical handoff. Their later repairs do not change these original test outcomes:

1. **✓ Done — Subsequent archive-contract repair, linked above.** Original finding: `tests/test_f6c_parent_emission_refinement_verification.py:342` expects the historical full entry at the current executable path. The current bytes are `20c8d44e…734b7`, its existing asserted tuple is `9e71ac12…3ee792`, and the intact historical receipt names `1398a005…73352b`. `git show HEAD:scripts/eom/run-f6c-cached-root-cover-full.mjs | shasum -a 256` confirms the same current value at this turn's starting commit. None of these three identities may be substituted for another. This failure is part of the unresolved archive contract above.
2. **✓ Done — Subsequent external coordinator-contract repair, linked above.** Original finding: `tests/f6c-parent-emission-refinement-pilot.test.js:26` rejects the generic coordinator: its expected generation is `5428e4b8…90b885`, while `git show HEAD:scripts/eom/f6c-bounded-operation.mjs | shasum -a 256` returns `47c2828c…8a4098`. That coordinator was not changed in this repair. Its generation mismatch is a separate current-source blocker needing exact-source attribution and contract review; its pin was not guessed or suppressed to make this run green.

These are not environmental exclusions. Passing current controls also does not approve the advanced historical comparison-contract predicates or authenticate an old scientific computation. The source-only streamed diagnostic's whole-process fixtures explicitly remain not run ready pending their external closure envelope; this pass ran its affected Python lifecycle controls, not those disabled whole-process fixtures. Final source-preservation, metadata, and ownership checks are recorded in the work log.
