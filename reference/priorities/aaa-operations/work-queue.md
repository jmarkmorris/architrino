# Operations Work Queue

This is the current execution ledger for deployment, hosting, cost, reliability, release and public-app operations. Completed one-time work moves to [work-log.md](work-log.md); recurring work remains here as a live item with its next due date, while each completed pass is recorded in the work log. Current policies and baselines live in [manuscript.md](manuscript.md). Historical queue snapshots are retained only in the work log.

## Ranked Next Objects

1. `priority_directory_review_and_drive` — [OPS-028](#ops-028--priority-directory-review-and-drive). Priority: High; status: In progress; first directory completed.
2. `reference_equation_mapping_surface` — [OPS-016](#ops-016--reference-equation-mapping-surface). Status: Queued.
3. `operator_explanation_standard_review` — [OPS-029](#ops-029--operator-explanation-standard-review). Status: Queued.
4. ◐ `periodic_priority_assets_scan` — [OPS-032](#ops-032--periodic-priority-assets-scan). Status: Recurring; October 13 substantive three-workstream sample complete; next monthly 2026-11-13; weekly controls complete 2026-10-25; next 2026-11-01.
5. ◐ `periodic_reader_facing_corpus_scan` — [OPS-031](#ops-031--periodic-reader-facing-corpus-scan). Status: Recurring; first early cycle complete; second early 10/15, core 18/46, supporting 15/95, validation 8/43; next early/core/supporting/validation batches 2026-11-02 / 2026-11-01 / 2026-11-03 / 2026-11-19; early due 2026-11-13.
6. `periodic_project_skill_maintenance` — [OPS-027](#ops-027--periodic-project-skill-maintenance). Status: Recurring; next pass due 2026-11-10.

7. ○ `periodic_retention_review` — [OPS-033](#ops-033--periodic-retention-review). Status: Recurring, paused by operator; October 14 pass complete; 2026-11-14 is a retained planning checkpoint pending resumption.

## In progress

### OPS-028 — Priority-directory review and drive

- **Priority object:** `priority_directory_review_and_drive`.
- **Priority:** High.
- **Request:** Review and drive every top-level priority directory in `reference/priorities/`, with particular attention to each directory's newly written `manuscript.md` and its live tracker, queue, brainstorming and work log. For each directory, establish the current owner, active queue object, manuscript disposition, blockers and next bounded action; advance work only within that directory's authority.
- **Directory inventory:**
  - ● `aaa-corpus-dragnet` — complete.
  - ◐ `aaa-corpus-rewrite` — OPS-028 directory disposition remains incomplete; `CRW-005` closed 2026-09-13, with no accepted repair remaining; `CRW-006` is discussion-scoped only.
  - ● `aaa-operations` — complete; `OPS-028`.
  - ● `aaa-work-threads` — complete.
  - ● `app-aaa-core` — complete.
  - ○ `app-barnes-hut` — todo; new research-owner intake only; no runnable algorithm or OPS-028 whole-directory disposition.
  - ● `app-borg` — reviewed; complete.
  - ● `app-equation-mapping` — reviewed; complete.
  - ● `app-lattice-lab` — reviewed; complete.
  - ● `app-photon` — reviewed; complete.
  - ● `app-simulation` — reviewed; complete.
  - ● `app-solver` — reviewed; complete.
  - ○ `app-surface` — todo; new owner intake only; bounded Stage A/B completion does not certify an OPS-028 whole-directory review or interacting 3:3/app delivery.
  - ● `app-topo` — reviewed; complete.
  - ● `app-ui-guidelines` — reviewed; complete.
  - ○ `master-equation-closure/braid-program` — todo; existing unfinished review follows the relocated owner.
  - ● `category-theory` — reviewed; complete.
  - ○ `master-equation-closure/collinear-research` — todo; existing unfinished review follows the relocated owner; no OPS-028 whole-directory disposition yet.
  - ○ `development-process-review` — todo.
  - ○ `dormant-deferred` — todo; inventory only, not reactivated.
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
  - ○ `master-equation-closure/lattice-research` — todo; current child manuscript and controls require their own recorded scope.
  - ○ `master-equation-closure/binary-research` — todo; ownership intake only; BP-001 remains deferred/blocked.
  - ○ `master-equation-closure/photon-research` — todo; ownership intake only; PHO-009 remains deferred/blocked.
  - ○ `master-equation-closure/neutrino-research` — todo; ownership intake only; no executable task inferred.
  - ○ `master-equation-closure/quark-research` — todo; completed filing verified October 4; candidate/history specification remains queued and unstarted; no OPS-028 whole-directory disposition yet.
  - ○ `master-equation-closure/noether-sea-research` — todo; current child manuscript and controls require their own recorded scope.
  - ○ `master-equation-closure/equation-variants/field-speed-ceiling/history` — todo; relocated dormant history, inventory only, not reactivated.
  - ○ `source-mining` — todo.
- **Current disposition:** `aaa-corpus-dragnet`, `aaa-operations`, `aaa-work-threads`, and `app-aaa-core` are complete in the linked review record. The `aaa-corpus-rewrite` queue records CRW-005 closed and no accepted supplementary repair remaining; its separate OPS-028 directory review is not certified complete by that campaign closeout. `dormant-deferred` is inventoried but is not reactivated by this row.
- **Acceptance:** Every inventoried directory has a dated review record naming its live owner and next disposition; every present `manuscript.md` receives a bounded review disposition; directories without a manuscript are explicitly recorded as such; newly written manuscript work is routed to the owning queue or a named follow-up action; no scientific, editorial or dormant-work status is strengthened merely by inventory.
- **Owner:** `aaa-operations`, coordinating with each directory's owner; `aaa-corpus-rewrite` retains authority for reader-facing rewrite work.

## Queued

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
- **Status:** ○ Recurring, paused by operator October 31; ✓ October 14 bounded pass complete, one of three passes before cadence reassessment. [Receipt](evidence/ops-033-retention-review-2026-10-14.md).
- **Scheduler:** Paused task heartbeat `architrino-retention-review`, titled “Architrino retention review”; saved configuration retains monthly on the 14th at 09:00 app-local time. Resumption requires operator direction.
- **Cadence and next due:** Retained planning checkpoint 2026-11-14; no scheduled execution while paused. Assess cadence after three completed passes.
- **Completed operational housekeeping:** ✓ [October 31 implementation](evidence/ops-033-operational-cruft-assessment-2026-10-31.md#completed-implementation--october-31) completes all three selected actions: qualified copy removal with unique-content recovery, compressed/deduplicated benchmark bulk with working context retained, and scoped job-log pruning/test isolation/lifetimes. The [selected retained-job follow-up](evidence/ops-033-operational-cruft-assessment-2026-10-31.md#selected-retained-job-cleanup-and-compression--october-31) also completes 76-job retirement with verified recovery for 68 evidence-linked jobs and [verified archive adoption](evidence/ops-033-operational-cruft-assessment-2026-10-31.md#verified-job-archive-adopted--october-31) for 337 additional jobs, with all 1,011 retired files recovered and verified afterward. No unfinished selected cleanup task remains; other candidate scopes and research deferrals retain their prior status.
- **Latest bounded follow-up:** ✓ October 31 [seven-pair consolidation adopted](evidence/ops-033-audit-pair-consolidation-2026-10-31.md#adopted-representation--october-31-2026): fourteen expanded originals removed after byte-verified destination readback; exact retrieval, historical links and report/source identities preserved. All 231 historical evidence entries and 37 Surface source pins verify. No unfinished selected adoption step or additional monthly-pass credit; future producer changes remain unselected.
- **Coverage cursor:** October 14 reviewed changed matched-pair increment-2 qualification, completed antipodal closeout snapshots and older children's-book exports. Operator-selected same-day follow-up inventories all Noether Sea evidence and verifies three evidence-manifest sections; keep recommendation and uncovered scope are in the [supplement](evidence/ops-033-retention-review-2026-10-14.md#operator-selected-noether-sea-follow-up--october-14). Next: a completed non-antipodal family outside that collection and an older on-demand family; iOS if present, plus fresh changed-family selection at launch. Circular-root detailed review remains deferred. Other threshold advisories and full parent collections remain uncovered; no cleanup selected. Still one monthly pass, next November 14.
- **Request:** Follow the [retention review procedure](../../op/machine-artifact-retention.md#recurring-retention-review): measure budget compliance and allocation, inspect three bounded families for current consumers, reproduction and recovery obligations, and propose keep/archive/rebuild/delete dispositions. Preserve the circular-root pilot detailed-review deferral until an operator-selected milestone.
- **Acceptance per pass:** Record exact coverage, instruments/results and limits, current consumers, proposed dispositions, recovery gaps, deferred/uncovered families, coverage cursor and next due date in the work log and existing subject owners. No automatic deletion, movement, compaction, history maintenance, budget change, authored regeneration or publication.
- **Owner:** operations coordinates with artifact and research owners; scientific acceptance remains with those owners.

### OPS-031 — Periodic reader-facing corpus scan

- **Priority object:** `periodic_reader_facing_corpus_scan`.
- **Status:** ◐ Recurring; paused. First early cycle completed October 11; second early cycle is 10/15 after the October 29 whole Master Equation review. CRW-005 remains closed; review coverage is distinct from scientific closure.
- **Scheduler:** Shared heartbeat `ops-031-corpus-review-cycles` is paused by operator direction. Its saved daily 09:00 app-local schedule is retained; resumption requires operator direction and does not occur merely because a planning date arrives.
- **Request:** Review reader-facing claims and explanations under the [periodic procedure](../../op/periodic-document-review.md), preserving valid no-change dispositions and routing substantive repairs to their existing owners.
- **Coverage and resumption:** The [199-path current state](evidence/ops-031-coverage-state-2026-10-29-master-integrated.json) preserves ordered paths, source hashes, completed scopes, uncovered lists and reservations. The [launch inventory](evidence/ops-031-coverage-inventory-2026-09-20.json) and historical first-cycle records remain intact. On resumption, check material triggers and combine overdue work into one current pass rather than replaying missed daily wakeups.

| Class | Current cycle coverage | Uncovered | Next planned batch | Cycle deadline |
| --- | --- | --- | --- | --- |
| Foundations/Dynamics, monthly | ◐ 10/15 second cycle | 5 | November 2: Energy, sequence 11 | November 13, 2026 |
| Core theory, quarterly | ◐ 18/46 | 28 | November 1: Proper Time and Time Dilation, sequence 34 | December 13, 2026 |
| Supporting, six-monthly | ◐ 15/95 | 80 | November 3: Inflation Model, sequence 77 onward | March 13, 2027 |
| Validation/simulation, annual | ◐ 8/43 | 35 | November 19: Radial Attraction and Receiver Velocity and Work, sequences 165–166 onward | September 13, 2027 |

- **Priority and batch size:** Preserve the early-chapter emphasis and textbook order, with confirmed defects and materially changed dependencies first. Review two to four ordinary chapters or one substantial derivation; carry unfinished scope forward explicitly. Do not rereview the completed Master Equation reservation without a material trigger.
- **Capacity risks:** The current state reserves sixteen remaining core dates, including separate substantial readings and supplemental dates. Eight named long core chapters remain; December 13 is threatened by deeper scope or interruption. Supporting has nineteen regular four-ordinary-path maxima plus November 5 four, exactly 80 slots for 80 uncovered paths with no margin; substantial scope threatens March 13. These are planning limits, not measured throughput. Retain the exact reservations and complete uncovered lists in the state; no sample completes a population.
- **Repair follow-ups:** The latest [three Master Equation groups](../aaa-corpus-rewrite/evidence/ops-031-master-corrections-verification-2026-10-29.md) and [four envelope/core groups](../aaa-corpus-rewrite/evidence/ops-031-four-corrections-verification-2026-10-29.md) are separately verified. Broader [scientific follow-ups](../aaa-corpus-rewrite/work-queue.md#ops-031--separate-scientific-follow-ups), including the neutron dipole and direction-scale questions, remain with their existing owners; no new execution authority follows.
- **History and baseline:** [work-log.md](work-log.md) owns dated review, interruption and repair accounts and links the unchanged original receipts. The [CRW-005 closeout](../aaa-corpus-rewrite/evidence/crw-005-claude-sixteen-closure-verification-2026-09-13.md#final-sixteen-chapter-integration) remains historical, not a current correctness guarantee.
- **Acceptance per pass:** Preserve actual scope/versions, independent support and dispositions, previous-repair/no-change rechecks, remaining cursor, owner follow-ups and next dates. Report threatened deadlines and uncovered paths. Use the [record-size rule](../../op/periodic-document-review.md#record-size-and-active-tracker-hygiene); keep chronology out of this active queue.
- **Owner:** operations coordinates; corpus and scientific owners adjudicate and integrate. No automatic substantive rewrite, dormant activation or publication.

### OPS-032 — Periodic priority-assets scan

- **Priority object:** `periodic_priority_assets_scan`.
- **Status:** ◐ Recurring; paused. The selected October 25 weekly pass and October 13 monthly substantive sample are complete at their recorded scopes; no unfinished selected weekly continuation remains. Uninspected assets remain uncovered.
- **Scheduler:** Shared heartbeat `ops-031-corpus-review-cycles` is paused by operator direction, retaining its daily 09:00 app-local schedule for an explicitly requested resumption. Keep OPS-031 and OPS-032 coverage separate; merge overdue checks into one current pass on resumption.
- **Request:** Check changed priority trackers/queues, owner/evidence transitions and one rotating unchanged directory; review three substantive workstreams monthly at their actual manuscript, analysis, contract and supporting-asset scopes under the [periodic procedure](../../op/periodic-document-review.md).
- **Planning checkpoints:** Weekly November 1, 2026; monthly November 13, 2026; joint coverage/cadence evaluation December 12, 2026. These dates do not restart the paused automation. Earlier focused checks require a material trigger, with no automatic scientific promotion or dormant reactivation.
- **Coverage cursor:** The [October 25 weekly receipt](evidence/ops-032-weekly-review-2026-10-25.md) and [version inventory](evidence/ops-032-control-state-2026-10-25.json) retain 89 selected paths and their actual check/reuse scopes. App-topo supplied the last unchanged rotation; next candidate is app-ui-guidelines, skipping it if changed. Reuse valid OPS-028 dispositions without resetting its incomplete traversal. The [monthly receipt](evidence/ops-032-monthly-substantive-review-2026-10-13.md) retains three reviewed claim families; it is not whole-directory certification.
- **Latest disposition and follow-ups:** The [October 30 focused check](evidence/ops-032-trigger-review-2026-10-30.md) found no required control repair at its four-owner scope. The rotating-ladder connection's peer review remains pending in its scientific owner; replay, finite/infinite-history and dormant boundaries remain intact. This adds no weekly/monthly/OPS-028 coverage. Current selected administrative repairs are closed; future scientific work remains with its existing owners.
- **Logging and history:** Routine consistency checks use one short dated entry in [work-log.md](work-log.md). Keep a detailed receipt only for a consequential finding, disputed state, substantive review or necessary coverage/version evidence, following the [record-size rule](../../op/periodic-document-review.md#record-size-and-active-tracker-hygiene). The work log and original evidence retain earlier corrections, unchanged dispositions and exact versions; do not append their timeline here.
- **Coordination:** Guidance/skills route to OPS-014/OPS-027; binding incidents retain their existing incident owners. Do not duplicate OPS-028 work, change scores, infer scientific acceptance from status, or activate dormant objects.
- **Acceptance per pass:** Preserve the actual inspected paths/versions, owner/evidence-backed dispositions, unresolved follow-ups and separate next dates at the smallest sufficient record size. Existing evidence is retained; no blanket asset certification follows.
- **Owner:** operations coordinates with each workstream's live owner.

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
