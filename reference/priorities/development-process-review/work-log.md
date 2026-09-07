# Development Process Review Work Log

Chronological intake and verification records accompany the preserved evidence and separate analysis.

## 2026-09-07 — Agent 1 report intake

Created this collection at the operator's request. Copied the operator-supplied attachment verbatim into `evidence/agent-01-pr-260-publication-incident-report.md`; `cmp` against the attachment returned exit 0. The attachment has 153 newline characters and 26,590 bytes by `wc -l -c`, and its final sentence ends with `healthy.`. The original report remains unchanged, including its historical status and uncertain diagnoses. Reserved Agent 2's destination in the README without creating a placeholder evidence file.

## 2026-09-07 — Agent 2 intake and remaining destinations

`ls -l` confirmed Agent 2's assigned evidence file exists with 44,926 bytes. Its opening coverage statement was inspected; the report was not rewritten or substantively adjudicated during intake. The operator relayed limitations concerning filtered outputs, ephemeral `/tmp/ops/` logs and instruments, indirect knowledge of other sessions, inferred commit attribution, and unreconciled environmental counts. Those limitations constrain later analysis and are not evidence that the underlying diagnoses are correct. Removed the completed Agent 2 collection item and assigned separate evidence filenames for the three remaining conversations, numbered 3 through 5. No placeholder reports were created.

## 2026-09-07 — Agents 3 through 5 received

`ls -l` confirmed the three assigned files with 47,723, 20,016, and 20,370 bytes respectively. Their coverage statements and section inventories were inspected, along with Agent 3's receipt-failure appendix. Agent 3 covers the earlier publication attempt; Agents 4 and 5 cover Cowork GitHub connectivity and connector availability. Each supplies an identifying topic because its original UI conversation title is unavailable. Preserved all evidence files unchanged and removed the completed collection item. Cross-report diagnosis and change attribution remain pending; these intake checks establish receipt and reported scope only.

## 2026-09-07 — Post-report responses captured

Preserved the operator-supplied post-report responses in `evidence/agent-post-report-responses.md`, retaining their wording under agent-number headings. Added source framing to distinguish reported verification from independent checks and recorded the operator's note that Agent 1 had no separate response. Linked the file from the evidence inventory; the five original reports remain unchanged.

## 2026-09-07 — Operator concerns captured

At the operator's explicit request, created `analysis/operator-concerns.md` from concerns already expressed in the receiving conversation. Marked it as paraphrase and separated concerns from verified findings and implementation authority. Linked it from the README and priorities; no agent evidence report was changed.

## 2026-09-07 — Operator concerns coverage review

Compared the concerns document with the operator messages available in this task after the operator questioned completeness. Added credit-exhaustion and cross-agent continuity, the expressed concern that agent confusion drove unnecessary repair work, the reported scale of GitHub retries, publication acceptance despite unresolved failures, and the request to hear the full context before acting. Recorded coverage limits for unsupplied written questions and other conversations, and excluded the nearby-speaker fragment the operator withdrew. Existing evidence reports remain unchanged.

## 2026-09-07 — Additional dictated concerns, first batch

Integrated the operator's questions about a parent-folder project, consistent Claude/Codex project descriptions, migration or continuation of existing tasks, and undecided priority for that work. Added the requested durable explanation of the integrity architecture and questions about engineering practice, necessity, alternatives, maintenance, retention, storage use, and growth. Captured questions only; no project settings, tests, integrity mechanisms, or retained records were changed.

## 2026-09-07 — Additional dictated concerns, second batch

Captured the operator's examples of complex Python headers with hash values, the origin of the first frozen-hash failure, and the separate question of why checks did not catch it at introduction. Added concern about the placement and justification of the broad sweep in GitHub publication checks and the resulting hang. Preserved timing and test-scope descriptions as operator recollections pending evidence reconciliation, not established measurements. No implementation changes were made.

## 2026-09-07 — Additional dictated concerns, third batch

Captured operator-initiated commits and pushes while agents are writing as a possible contributing workflow condition, without attributing fault. Added the need for practical Claude/Codex coordination in the shared checkout, possible task and file ownership boundaries, and interest in direct cross-agent communication. These remain review questions and candidate approaches; no publication or integration changes were made.

## 2026-09-07 — Publication-overlap clarification and squash merging

Recorded the operator's clarification that Codex was used only for commits and pushes during the credit-limited period, with changed files observed in VS Code and Claude possibly still running. Distinguished this from prospective simultaneous development by both agents. Added the operator's question about squash and merge and a recalled Claude objection whose exact content remains to be located. No merge-policy or history changes were made.

## 2026-09-07 — Last touch rule question

Captured the operator's recollection of a "last touch rule," possibly adopted during a conflict, and the request to establish its meaning and suitability. Left its exact wording, authority, current status, and relationship to attribution or conflict handling unresolved pending evidence. No policy changes were made.

## 2026-09-07 — Worktree suitability reopened for discussion

Captured the operator's question about using Git worktrees despite an earlier unsatisfactory experience. Distinguished renewed evaluation from authorization to create worktrees or replace the current shared-checkout workflow. Recorded the need for a plain explanation and comparison against actual operator requirements without presuming user error.

## 2026-09-07 — Evidence synthesis and proposed repair order

Completed the requested planning pass across the five reports and the operator concerns. Added `analysis/cross-report-findings.md` and `analysis/review-and-repair-plan.md`, separating urgency, prerequisites, owners, completion criteria, and later independent access/project work. Captured the final request for explicit jargon definitions and dependency ordering. Preserved all source reports and post-report responses.

Targeted verification used `git log --follow`, `git show`, `git diff`, and `shasum -a 256` on the enclosure-contract history, showing the old expected digest at `0fb575921`, changed bytes at `897fe1aa7`, and the unchanged test expectation at that latter commit. Reading the historical content gate establishes only that it did not directly select that test; historical execution elsewhere remains unverified. `git show 582efe4bf` confirms the bootstrap cleanup expectation change and removal of its direct PID-disappearance assertion in one case. Source reads of the current launcher, receipt runner, sweep, workflows, hooks, operations queue, and retention owner support the scoped analysis. No process tests or broad sweeps ran, and no repairs, Git publication, project settings, or credentials were changed. External Git/GitHub documentation was consulted for worktree, squash-merge, and Actions-pin distinctions and linked in the analysis.

## 2026-09-07 — First bounded process controls

After the operator's go-ahead, ran four small synthetic controls under the owned-compute wrapper on Mac Node v26.3.0. Explicit exit passed in 0.269 s; natural return reached its completion marker but was rejected at the five-second work deadline; releasing watchdog references in an in-memory copy produced a rejected SIGKILL exit; a deliberate bootstrap interruption closed both independently observed processes in 10.161 s. Preserved the final probe, stdout/stderr, and supervisor receipts under `evidence/process-controls/` and explained their scope in `analysis/first-process-investigation.md`. Production source, test expectations, and pins were not changed. No Python or compiled workload ran.

The first restricted wrapper attempt failed before target registration and left its sidecar alive; host process inspection required reviewed permissions. Stopped only the sidecar after rechecking its full identity, then verified absence with host `ps`. Later controls used the required host permissions and verified their recorded children absent. The owner closeout reported clear after all controls. Recorded the additional generic-wrapper startup-deadline issue separately, without deleting its operational record or treating that lease result alone as proof of cleanup.

## 2026-09-07 — Authorized process repair and consequential audit

The operator accepted both proposed follow-ups. Repaired normal module completion by releasing watchdog event-loop references, preserving live cancellation, bounding the IPC-close/parent-exit race, and waiting only for the authenticated watchdog within the original work allowance. Added natural-return, referenced-timer, 2 MiB output-drain, import-error, and live-runner IPC-loss controls. Restored independent process-absence observations for unauthenticated bootstrap interruption. Made pilot monitor-fault injection wait for an actual stubborn target, and corrected cleanup-route assertions while retaining independent PID checks and rejection requirements.

The final nine-file process command passed 85/85 on Mac Node v26.3.0 with the shared Python venv; its outer lease closed in 89.883 s. Two source-composition suites passed 65/65 after their process-fixture bindings were updated. The earlier four-file source/layout run passed 111/114: two source-fixture digest failures were resolved, and one pre-existing refined-acceleration preparation pin remains an explicit failure. Its expected source generation was not recovered from seven committed versions in the scoped history, so no replacement was guessed. The [validation record](analysis/process-repair-validation.md) retains all commands, successful and failed runs, and limitations.

The [consequential audit](analysis/consequential-repair-audit.md) reads all seven named commits using whole-file parent/child comparisons, finding 194 commit/file changes, 177 limited syntactically to digest tokens. It verifies the watchdog change predates that repair sequence and confirms the bootstrap test lost an independent assertion. An intact historical admission receipt exposes the more consequential original-source/current-source confusion: its full entry differs from the tuple labelled original in the parent consumers, including before the seven audited commits. Four historical full-entry edges were withheld from the new pin update. Thirty-two current code/test files received reviewed operational/transitive digest updates; two of those later received process-test digest updates. Original report hashes and historical evidence bytes were preserved. OPS-022/OPS-024 retain the remaining blockers; no broad sweep, scientific acceptance, CI policy change, or Git publication was performed.

The two accepted scoped items are removed from this collection's live queue. Proposed next work is actual historical source recovery and the unresolved preparation-generation attribution, with the generic-wrapper startup deadline kept separate. Priority ranking, startup-router freshness, and tracked whitespace checks passed before handoff.

## 2026-09-07 — Original source recovery and current composition repair

The operator reported that no jobs were running, committed and pushed the preceding changes, and authorized the recommended recovery. `git --no-optional-locks status -sb` and `git show HEAD` verified a clean starting checkout at `713c53a0acf5c8c78002873d9ebc8887bd8d4bcc`. Recovered the exact historical full entry from Git and reconstructed the missing preparation generation from the parent of `baa3e7323` with just one of that commit's two preparation pin changes applied. The reconstructed bytes match the independently recorded expected fingerprint. This attributes an intermediate-state pin, without attributing the publication mistake to an actor or assuming concurrency caused it.

The complete old admission inventory has 198 source bindings: 176 match their current absolute paths, 21 differ, and one path is absent. The known-case-tested Git blob search recovered all 19 nonmatching repository sources. Preserved those exact bytes as nonexecuting `.source` files, with logical paths and Git identities in the archive manifest; preserved the intermediate preparation source separately. A known-case-tested literal-text inspection confirms all 35 pins in the recovered full entry match the intact admission receipt. The three historical host-tool versions remain unrecovered in the bounded local search. The document-only archive route and previously advanced historical predicates also remain obstacles; no historical output or original tuple was refreshed to current bytes.

The source-generation test then exposed two more stale current pins. Exact older blobs and `git diff 0fb575921 HEAD` show a synthetic heartbeat-schema rename in the checker controls and terminology-only changes in the current projection declaration. Updated their current composition consumers and reviewed dependent pins. The final [source diff record](evidence/source-recovery/final-source-diff.json) verifies 11 changed code/test files differ from the starting commit only in digest tokens and verifies all 19 archived source files against their original hashes. This syntax check does not certify historical or mathematical correctness. Current declarations and control consumers were updated together; historical `fullEntry` and `refinedClosure` were explicitly withheld.

Final focused validation: the refined-acceleration Node suite passes 31/31; the parent Node suite passes 11/12, with a separately inventoried pre-existing coordinator-generation mismatch. The combined six Python suites pass 225/226 in 109.017 seconds, retaining the known historical full-entry mismatch. The initial 90-second allowance was insufficient for those six suites; that timed-out run is retained, and the same suites finished within a 300-second bound with named-test output. All five focused runs and full logs are preserved in [validation-runs.json](evidence/source-recovery/validation-runs.json), including failures. No broad sweep or actual scientific evaluation ran. The [analysis](analysis/source-recovery-and-binding-repair.md) names the exact two remaining failed checks, original source identities, archive prerequisites, and interpretation boundaries.

Final startup-router freshness, priority ranking, machine-artifact retention, and `git diff --check` passed. The owned-compute closeout returned `clear` after checking 265 leases; all five runs recorded process-group closure. The active queue now names the remaining historical archive work instead of asking to recover already recovered source versions. The broader OPS-024/braid owners remain open, with this follow-through linked. No files were staged or committed and no publication was attempted by this task.
