# Cross-Report Evidence Assessment

Review date: 2026-09-07. This is an analysis of the five preserved reports, their post-report statements, and targeted source/history reads in the receiving task. It is not a new full test run or an exhaustive semantic audit of the merged branch. See the [proposed order](review-and-repair-plan.md) and [operator concerns](operator-concerns.md).

## What the collection establishes

Agent 2 describes the hash/pin repair campaign. Agent 3 describes the earlier publication attempt at its then-current branch tip. Agent 1 describes the subsequent publication/CI containment episode. Agents 4 and 5 describe access setup; they report no test repairs. Report numbering is a stable identifier, not a guaranteed global chronology. Their dates, overlapping sessions, and changing repository tips must be aligned to commands and commits where causality matters.

Reports establish what their authors reported. Embedded original output strengthens particular observations, but omitted logs, filtered output, and summaries of other sessions still limit independent review. The receiving task's earlier successful local gate and merge verification are recorded in the [initial assessment](initial-assessment.md#subsequent-verification); they supersede historical “no PR/no receipt” statements without demonstrating full-suite health.

## Independently inspected findings

| Finding | Instrument and scope in this review | Implication and limit |
| --- | --- | --- |
| The disputed enclosure document's first recorded content change breaks the old digest. | `git log --follow` on `2026-08-27-f6c-continuous-reception-enclosure-contract.md`, then `git show <commit>:<path> \| shasum -a 256` at `0fb575921`, `897fe1aa7`, and current HEAD. Values are listed below. | Supports Agent 2's attribution to the earlier rename, rather than the later layout edit, for this document. It does not establish the first failure seen in every session or blame an individual agent. |
| A test still demanded the old bytes after that change. | `git show 897fe1aa7:tests/test_eom_continuous_reception_roots.py`, specifically `test_frozen_mathematical_dependencies_remain_identical`. | The assertion compares actual document SHA-256 to the old value. The mismatch can be demonstrated from bytes without running Python. Other behavioral assertions were not executed by this inspection. |
| The content gate at that commit did not directly select this Python test. | Full `git show 897fe1aa7:scripts/check-content-integrity.mjs` inspection of its check list. | A concrete coverage gap in this entry point. Historical hooks, other invoked scripts, actual run logs, and branch settings still require inspection before concluding that no publication path could have caught it. |
| The bootstrap repair changed the accepted cleanup result and removed one direct disappearance assertion. | `git show 582efe4bf -- tests/f5-prehistory-handoff-build-startup.test.js scripts/eom/launch-subfield-circular-root-pilot.mjs`. | In the bootstrap-interruption case, the test now accepts an unauthenticated-birth cleanup failure, expects no runner identity, and no longer calls `process.kill(pid, 0)` expecting `ESRCH`. It still checks `processesClosed`. This is a contract/evidence change requiring review, not proof of a regression. |
| At the initial review, the optional reporting sweep and broad success wording obscured the distinction between required and omitted coverage. | Initial reading of `scripts/check-content-integrity.mjs`, its skip/reporting branches and final success message, plus the workflow files then reviewed. | Reporting was subsequently corrected; see the [current testing boundary](review-and-repair-plan.md#testing-arrangement-to-decide). The recorded passing gate still excludes the opt-in sweep and does not establish full test health. |
| Timeout containment is not a demonstrated process-lifecycle repair. | Reading `scripts/run-test-sweep.mjs` and `.github/workflows/{content-integrity,pages}.yml`: per-test timeout arguments and job limits, while content checks are synchronously spawned. | A test bound, a whole job bound, and verified child cleanup are different guarantees. No process-heavy test was executed in this analysis. |
| The sweep's explanatory comment still gives the missing-venv diagnosis. | Reading the opening comment in `scripts/run-test-sweep.mjs` against Agent 1 and the later OPS-022 Mac entry. | Documentation carries an earlier explanation that the later report contests. Correcting wording alone would not fix the underlying wait. |
| A receipt is a state comparison, not evidence that writers have finished their tasks. | Reading `captureValidationState` and the before/after comparisons in `scripts/pr-validation-receipt.mjs`. | It hashes staged entries, unstaged diff, untracked content, base and toolchain information. The subsequent partial-staging guard rejects differing staged and working bytes on a staged path. Writer completion remains separate; no incident race is established here. |

The enclosure digest at `0fb575921` is `f20e4bdaaff8b6f0012fdc6135b15d568a817832fb55d5c42f80d8421a117f68`; at `897fe1aa7` it is `838f1a33523bdcdb25abd1e2760ccd0f49c6f5ee2a3e9c4672ad5c34a62e15ac`; at the reviewed current HEAD it is `db38185a68210cc8567b0b9f054c6deb5d32509f858cefb5701511a4e23ef2bc`. `git diff 0fb575921 897fe1aa7 -- <document>` shows the F6c-name replacements in that transition. This finding is overturned if the claimed path/history or expected literal is different from those inspected; its scope is this exact document and test.

## Interpretation of the last touch rule

Agent 2 F01–F02 describes attribution using the most recent commit touching a pinned file. The live OPS-018 record, located with `rg` for first-mismatch language in the operations queue, explicitly records the operator replacing that attribution rule **for that row** with the first mismatching state. This is evidence of a hash-attribution rule, not a last-writer-wins conflict policy. The remembered original conflict context has not been recovered.

The distinction is concrete: if a rename changes bytes on Tuesday and a link edit changes them again on Friday, Friday is the last touch, but Tuesday may be when the original pin stopped matching. Attribution should inspect the transition relevant to the failure. This does not mean every earliest byte change is a behavioral defect: the expected bytes, their purpose, and the intended update contract still matter.

## High-consequence open findings

The launcher source offers a hypothesis for the hang. Reading `SUBFIELD_CIRCULAR_BOOTSTRAP_SOURCE` shows a watchdog child with an IPC channel and exit listeners; after the workload import, the bootstrap disconnects its own parent channel. Reading the supervisor's completion path shows it awaits the runner's close before later cleanup. Whether a remaining watchdog relationship prevents normal exit must be measured. The outer code also uses bounded waits, so describing the entire implementation as having no internal bounds would overstate the source. A failed or ineffective bound is a different question from its absence.

Agent 2 P5 reports a dispatcher pin refresh over substantive launcher changes, and C1 reports the changed bootstrap test. The inspected commit confirms the test change, but this review has not validated the earlier launch-readiness contract or the entire multi-file pin cascade. These are high-priority audit subjects because matching a newly accepted hash cannot validate the change that made that hash necessary.

Agent 2's schema, methodology, EOM-source, and Master Equation rows include tests guarding deliberate review boundaries. Their failure can be a correct refusal to accept changed inputs. The defect may be an incomplete migration or missing review, not a faulty assertion. Preserve that distinction when routing repairs. Neither restoring old inputs indiscriminately nor updating every expected value is supported.

## Corrections and unresolved contradictions

| Reported claim | Assessment |
| --- | --- |
| Agent 2's sweep has 181 failures; Agent 3's has 180. | Different reported runs, not a combined defect count. Match test identities, source state, prerequisites, and raw outcomes before attributing the difference. |
| Agent 2 reports 70 or 71 environmental failures; OPS-024 presents 71 as measured. | The reporter acknowledges unreconciled grep methods. Treat the split as provisional, particularly after the Mac process failure contradicted the broad environmental interpretation. |
| Agent 3 counts 72 assertion tokens and later calls them at least 72 assertion failures. | Its own inventory says token counts overlap and were not reconciled to subtests. The later stronger count is unsupported by that instrument. |
| Agent 2 says every instrument was validated against a known case. | Its detailed instrument account says the blob scanner was validated only by finding its intended targets. That is a target result, not a prior independent known-case check. The cascade tool's reported separate known-case checks are a different claim. |
| Agent 3 says no receipt exists after removal failed. | Its preserved stack trace establishes an attempted unlink of an existing receipt failed before checks. It establishes no new successful receipt, not absence of the old file. |
| OPS-024 says every non-environmental failure is classified. | Agent 2 acknowledges incomplete multiline-diff interpretation, and Agent 3 did not reconcile its failures to the row. The queue's completeness claim needs verification. Do not mark this review complete by merely inheriting it. |
| Agents 4/5 prescribed a restart based on session-start attachment. | Both describe later tools appearing within the session; Agent 5 additionally identifies confusion between two integrations. The exact mechanism is not independently established, but restart necessity was not proven. |
| Write-named MCP tools and `get_me` success imply GitHub write access. | Agent 5 exercised only a profile read; Agent 3 reports three PR-create denials. These are compatible observations of different capabilities. Exact permissions remain unknown. |
| Squash merging caused the inaccessible baseline bytes. | Agent 2 reports recovered blobs and infers intermediate working bytes. This does not establish the causal role of squash or prove those bytes were ever committed. |
| The repairs were all unnecessary, or all correct. | Neither conclusion follows. The reports contain supported mechanical repairs, unresolved real changes, inadequate verification, and self-corrections. Review individual changes. |

These corrections stay in analysis; the reports and original queues are not silently rewritten. A future approved reconciliation should update current queue claims while retaining their earlier evidence boundaries.

## Plain-language integrity map

The general definitions, binding-class update rules, Python-header example and storage discussion now belong in [Processes: Git, Codex and Claude](../processes-git-codex-claude.md). The incident-specific conclusion remains: an identity check can correctly reject changed bytes without establishing a mathematical error, and changing the expected hash does not validate the edit. Preserve historical inputs and review current dependency changes under their declared contracts.

## Evidence still needed

Preserve Agent 2's original sweep output and cascade/blob/audit instruments, Agent 3's full gate logs, and Agent 1's original CI and process output if their sessions still retain them. Obtain the f5test and FSC source conversations or their decisive outputs where their assertions affect a repair; summaries are not substitutes. The operator's original filtered Python pastes establish less than complete logs. Missing originals should remain explicit rather than be reconstructed as if observed.

Access, workspace and merge-method discussion is maintained in the [operations guide](../processes-git-codex-claude.md). The recovery evidence still does not establish every root cause or validate every repair.
