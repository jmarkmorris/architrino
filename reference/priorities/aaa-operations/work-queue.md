# Operations Work Queue

This is the current execution ledger for deployment, hosting, cost, reliability, release and public-app operations. Completed one-time work moves to [work-log.md](work-log.md); recurring work remains here as a live item with its next due date, while each completed pass is recorded in the work log. Current policies and baselines live in [manuscript.md](manuscript.md). Historical queue snapshots are retained only in the work log.

## Ranked Next Objects

1. `priority_directory_review_and_drive` — [OPS-028](#ops-028--priority-directory-review-and-drive). Priority: High; status: In progress; first directory completed.
2. `reference_equation_mapping_surface` — [OPS-016](#ops-016--reference-equation-mapping-surface). Status: Queued.
3. `operator_explanation_standard_review` — [OPS-029](#ops-029--operator-explanation-standard-review). Status: Queued.
4. ○ `periodic_priority_assets_scan` — [OPS-032](#ops-032--periodic-priority-assets-scan). Status: Recurring; first status scan due 2026-09-20; first substantive sample due 2026-10-13.
5. ○ `periodic_reader_facing_corpus_scan` — [OPS-031](#ops-031--periodic-reader-facing-corpus-scan). Status: Recurring; first priority-ordered batch due 2026-09-20; first Foundations/Dynamics cycle due 2026-10-13.
6. `periodic_project_skill_maintenance` — [OPS-027](#ops-027--periodic-project-skill-maintenance). Status: Recurring; next pass due 2026-11-10.

7. ○ `periodic_retention_review` — [OPS-033](#ops-033--periodic-retention-review). Status: Recurring; first pass due 2026-10-14.
8. ○ `pages_testing_replacement` — [OPS-034](#ops-034--replace-pages-and-pr-testing-with-agreed-webapp-coverage). Status: Queued; implementation after the current PR.
9. ○ `local_testing_replacement` — [OPS-035](#ops-035--replace-local-test-rotation-in-bounded-slices). Status: Queued; implementation after the current PR.
10. ○ `superseded_test_structure_removal` — [OPS-036](#ops-036--remove-superseded-testing-machinery). Status: Queued; closes each replaced slice without requiring a project-wide migration.

## In progress

### OPS-028 — Priority-directory review and drive

- **Priority object:** `priority_directory_review_and_drive`.
- **Priority:** High.
- **Request:** Review and drive every top-level priority directory in `reference/priorities/`, with particular attention to each directory's newly written `manuscript.md` and its live tracker, queue, brainstorming and work log. For each directory, establish the current owner, active queue object, manuscript disposition, blockers and next bounded action; advance work only within that directory's authority.
- **Directory inventory:**
  - ● `aaa-corpus-dragnet` — complete.
  - ◐ `aaa-corpus-rewrite` — in progress; active owner; `CRW-005`.
  - ● `aaa-operations` — complete; `OPS-028`.
  - ● `aaa-work-threads` — complete.
  - ● `app-aaa-core` — complete.
  - ● `app-borg` — reviewed; complete.
  - ● `app-equation-mapping` — reviewed; complete.
  - ● `app-lattice-lab` — reviewed; complete.
  - ● `app-photon` — reviewed; complete.
  - ● `app-simulation` — reviewed; complete.
  - ● `app-solver` — reviewed; complete.
  - ● `app-topo` — reviewed; complete.
  - ● `app-ui-guidelines` — reviewed; complete.
  - ○ `braid-program` — todo.
  - ● `category-theory` — reviewed; complete.
  - ○ `development-process-review` — todo.
  - ○ `dormant-deferred` — todo; inventory only, not reactivated.
  - ○ `field-speed-ceiling` — todo.
  - ○ `mapping` — todo.
  - ○ `mapping-benchmarks` — todo.
  - ○ `mapping-electromagnetism` — todo.
  - ○ `mapping-equations` — todo.
  - ○ `mapping-one-nature-many-theories` — todo.
  - ○ `mapping-open-problems` — todo.
  - ○ `mapping-quantum` — todo.
  - ○ `mapping-standard-model` — todo.
  - ○ `mapping-strong-field` — todo.
  - ○ `master-equation-closure` — todo.
  - ○ `source-mining` — todo.
- **Current disposition:** `aaa-corpus-dragnet`, `aaa-operations`, `aaa-work-threads`, and `app-aaa-core` are complete in the linked review record. `aaa-corpus-rewrite` remains active under its current owner; this action coordinates with it and does not overwrite its live work. `dormant-deferred` is inventoried but is not reactivated by this row.
- **Acceptance:** Every inventoried directory has a dated review record naming its live owner and next disposition; every present `manuscript.md` receives a bounded review disposition; directories without a manuscript are explicitly recorded as such; newly written manuscript work is routed to the owning queue or a named follow-up action; no scientific, editorial or dormant-work status is strengthened merely by inventory.
- **Owner:** `aaa-operations`, coordinating with each directory's owner; `aaa-corpus-rewrite` retains authority for reader-facing rewrite work.

## Queued

### OPS-034 — Replace Pages and PR testing with agreed webapp coverage

- **Priority object:** `pages_testing_replacement`.
- **Status:** ○ Queued; not started. Do not change the current PR or its running checks under this queue entry.
- **Request:** Apply [testing objectives §2](../../op/testing-regime.md#2-philosophy), prioritizing a working deployed GitHub Pages webapp. For the selected PR/deployment slice, agree the essential reader journeys and candidate checks, implement the smallest necessary coverage, and remove the old invocations and obligations that it supersedes. Reuse suitable existing tests rather than assuming a new framework is needed.
- **Scope:** Relevant Content Integrity and Pages workflow steps, their called checks, and their local publication counterparts. Verification distinguishes the built candidate from the actual deployed URL; live-site verification belongs to deployment follow-through.
- **Acceptance:** The selected essential behavior has agreed coverage and a bounded result; superseded or redundant checks no longer run in the affected local/CI paths; obsolete blocking obligations and their procedure text are removed together. Record the objective, retained/new/removed commands, trigger, blocking status and timing using existing evidence where applicable. State any unmeasured cost. A brief controlled comparison may establish replacement coverage, but no permanent parallel old/new rotation remains. Actual required-status changes belong to the authorized publication workflow.
- **Owner:** operations with the webapp and publication owners.

### OPS-035 — Replace local test rotation in bounded slices

- **Priority object:** `local_testing_replacement`.
- **Status:** ○ Queued; not started. Execute a selected slice after the current PR; independent local slices need not wait for all of OPS-034.
- **Request:** Replace a selected local test family or entrypoint with objective-based, agreed selection. Keep meaningful existing tests where they already provide the needed evidence. Remove superseded discovery entries, runner branches, setup dependencies and routine research invocations as that slice is replaced. Address ordinary/slow Node discovery and affected Python/C++ commands only where included in the selected slice.
- **Acceptance:** One clear supported execution path serves the agreed use; the superseded path no longer runs through package scripts, sweeps or indirect dependencies in that scope. Retained checks name their objective and trigger; explicit-use checks stay outside rotation. The four removed research suites remain explicit-use only unless separately approved for reinstatement. Record the bounded timing and coverage change without requiring a clean full-repository baseline. Do not repair obsolete tests merely to retire them or reinstate requirements removed with Option A/B.
- **Owner:** operations with the affected software or scientific owner; scientific claim limits remain explicit.

### OPS-036 — Remove superseded testing machinery

- **Priority object:** `superseded_test_structure_removal`.
- **Status:** ○ Queued; perform alongside each OPS-034/OPS-035 replacement, then close remaining cleanup within that same scope.
- **Request:** Delete the old test-only wrappers, fixtures, configuration, generated outputs, metadata and obsolete instructions made unnecessary by an agreed replacement or explicit retirement. Remove stale links and calls in the affected owners. Do not leave a second maintained test architecture, compatibility layer or migration apparatus behind.
- **Acceptance:** Before deletion, inspect actual callers and distinguish test scaffolding from application inputs and original scientific evidence. Remove objects whose only purpose was the superseded test structure; preserve inputs/evidence still needed for current work and the four explicitly retained manual suites. Verify the relevant entrypoints and references no longer call the retired path, and record the removed paths and any specific remaining consumer in the existing work log. No new cleanup checker, repository-wide hash audit or replacement framework is required. Retiring an unjustified requirement needs no replacement test. Each completed slice is usable and closed independently; this work is not a prerequisite to unrelated theory or publication.
- **Owner:** operations with the owner of each removed dependency; coordinate with existing teardown work to avoid duplicate edits.

### OPS-016 — Reference equation-mapping surface

- **Priority object:** `reference_equation_mapping_surface`
- **Request:** Provide operator-facing `reference/` documents with the symbol-definition equation viewer through a separately built and validated registry.
- **Acceptance:** Source-write policy, explicit target set, registry build and validation, and no links from `content/markdown/aaa` into `reference/`.
- **Owner:** operations and the equation-mapping owner.

### OPS-029 — Operator explanation standard review

- **Priority object:** `operator_explanation_standard_review`.
- **Status:** ○ Queued.
- **Opened:** 2026-09-11, at the operator's request.
- **Request:** Review [operator-explanation-standard.md](../../op/operator-explanation-standard.md) in full for clarity, internal consistency, duplication, instruction precedence, and practical effect on operator communication. Check its relationship to AGENTS.md, the academic style guide, and the dispatch procedures, including the work-item prefix rule for agent and task names.
- **Acceptance:** Record exact section or line references, distinguish demonstrated conflicts from optional improvements, explain the effect of each finding, and recommend the smallest justified correction. Preserve explicit operator decisions and identify any policy choice requiring their judgment. This action requests a review and recommendations; implementation is a separate disposition.
- **Owner:** operations with the operator-guidance owner; coordinate with recurring OPS-014 to avoid duplicate review work.

## Awaiting verification

No rows.

## Recurring

### OPS-033 — Periodic retention review

- **Priority object:** `periodic_retention_review`.
- **Status:** ○ Recurring; scheduled, first pass not started.
- **Scheduler:** Active task heartbeat `architrino-retention-review`, titled “Architrino retention review”; monthly on the 14th at 09:00 app-local time.
- **Cadence and next due:** First pass 2026-10-14; monthly thereafter. Assess cadence after three completed passes.
- **Request:** Follow the [retention review procedure](../../op/machine-artifact-retention.md#recurring-retention-review): measure budget compliance and allocation, inspect three bounded families for current consumers, reproduction and recovery obligations, and propose keep/archive/rebuild/delete dispositions. Preserve the circular-root pilot detailed-review deferral until an operator-selected milestone.
- **Acceptance per pass:** Record exact coverage, instruments/results and limits, current consumers, proposed dispositions, recovery gaps, deferred/uncovered families, coverage cursor and next due date in the work log and existing subject owners. No automatic deletion, movement, compaction, history maintenance, budget change, authored regeneration or publication.
- **Owner:** operations coordinates with artifact and research owners; scientific acceptance remains with those owners.

### OPS-031 — Periodic reader-facing corpus scan

- **Priority object:** `periodic_reader_facing_corpus_scan`.
- **Status:** ○ Recurring; scheduled, first pass not started.
- **Scheduler:** Active shared task heartbeat `ops-031-corpus-review-cycles`, titled “Architrino corpus and priority review cycles”; daily 09:00 app-local check-in executes only due batches/checks. Scheduled coverage starts 2026-09-20. OPS-031 and OPS-032 retain separate coverage records.
- **Request:** Scan reader-facing corpus claims and explanations for demonstrated errors, missed propagation and useful evidence-backed improvements under the [periodic review procedure](../../op/periodic-document-review.md). Retain valid no-change dispositions and route substantive repairs to their existing owner.
- **Cadence and next due:** Establish the ordered due list by the [four review priorities](../../op/periodic-document-review.md#corpus-review-priorities). Review all 15 Foundations/Dynamics chapters monthly, the 46 core-theory chapters quarterly, 95 supporting chapters every six months, and 43 validation/simulation chapters annually. These are current inventory counts, not immutable quotas. First ordered batch: 2026-09-20, starting Ontology and Architrino; first early-chapter cycle due 2026-10-13. Material changes trigger affected-dependency review earlier. Cadence/coverage evaluation due 2026-12-12; no automatic rewrite; the shared scheduled check-in advances due review work.
- **Baseline:** The [CRW-005 supplementary closeout](../aaa-corpus-rewrite/evidence/crw-005-claude-sixteen-closure-verification-2026-09-13.md#final-sixteen-chapter-integration) supplies dated review evidence; recheck actual bytes and owners at launch.
- **Acceptance per pass:** Record priority assignments, ordered due paths/versions, completed whole-chapter coverage, remaining cycle cursor and next batch, independent support and dispositions for findings, verification of accepted repairs, previous-repair/no-change follow-up, confirmed regressions and measured review burden. Update the next due date and record the pass under OPS-031 in the work log. Samples do not establish corpus-wide correctness.
- **Owner:** operations coordinates; corpus review and applicable scientific owners adjudicate and integrate. Preserve CRW-005 history and separate scientific obligations.

### OPS-032 — Periodic priority-assets scan

- **Priority object:** `periodic_priority_assets_scan`.
- **Status:** ○ Recurring; scheduled, first pass not started.
- **Scheduler:** Active shared task heartbeat `ops-031-corpus-review-cycles`, titled “Architrino corpus and priority review cycles”; daily 09:00 app-local check-in executes only due batches/checks. Scheduled coverage starts 2026-09-20. OPS-031 and OPS-032 retain separate coverage records.
- **Request:** Check live priority control surfaces for status, ownership and evidence consistency, and sample substantive manuscripts, analyses, contracts and their supporting assets under the [periodic review procedure](../../op/periodic-document-review.md). Review non-Markdown evidence through its declared consumer; preserve historical bytes and dormant status.
- **Cadence and next due:** Weekly changed-control-surface scan plus one rotating unchanged directory, first 2026-09-20; monthly substantive sample of three workstreams, first 2026-10-13. Material owner/claim transitions trigger focused review earlier. Cadence/coverage evaluation due 2026-12-12.
- **Coordination:** Reuse current OPS-028 coverage and active-owner findings rather than restart that traversal. Guidance/skills and binding incidents retain OPS-014/OPS-027 and their existing incident owners.
- **Acceptance per pass:** Record exact directories/files inspected, live owner and evidence-backed dispositions, stale or contradictory claims, accepted follow-up owners, repair verification and next due dates in the OPS-032 work-log entry. No blanket asset certification, dormant reactivation or automatic scientific promotion.
- **Owner:** operations coordinates with each priority workstream's live owner.

### OPS-014 — Periodic review of agent guidance

- **Priority object:** `periodic_agent_guidance_review`
- **Request:** Review the maintained Claude and Codex guidance surfaces for drift, conflict and stale references; apply only scoped corrections to their live owners.
- **Cadence:** Keep this item live with the next due date; complete an earlier pass when a guidance owner changes materially.
- **Next pass due:** 2026-12-09.
- **Acceptance:** Current guidance surfaces and precedence remain verified, any material correction is applied at its live owner, and the pass is recorded in the work log.
- **Owner:** operations with the live guidance owners.

### OPS-027 — Periodic project skill maintenance

- **Priority object:** `periodic_project_skill_maintenance`
- **Request:** Review the maintained project skills and their discovery pointers for policy drift, stale references and unsupported duplication.
- **Cadence:** Keep this item live with the next due date; complete an earlier pass when a referenced owner changes materially.
- **Next pass due:** 2026-11-10.
- **Interim finding (2026-09-12):** Review of `architrino-converge` routing applied a mode table, a shared canon/constraints section, and Git-command alignment in `reference/office-of-research/cto/prompts/convergence-campaign.md`, and added the skill owner to the Corpus convergence and Source mining router cards. Remaining check for the next pass: confirm the paste blocks still reach the shared section when invoked through each skill.
- **Acceptance:** Each maintained skill has a disposition recorded in the work log, with corrections applied only to its live owner and no competing policy source introduced.
- **Owner:** operations with the repository skills-policy owner.

## Closed work

Completed task detail is not retained in this queue. Search [work-log.md](work-log.md) by task identifier for the closure record.

OPS-024: [completed local evidence-only reconciliation and I5 custody disposition](work-log.md#2026-09-11--ops-024-closed-after-i5-custody-disposition). The [recovery queue](../development-process-review/work-queue.md) retains blocked inputs and deferred verification.
