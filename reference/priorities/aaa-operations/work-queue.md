# Operations Work Queue

This is the current execution ledger for deployment, hosting, cost, reliability, release and public-app operations. Completed one-time work moves to [work-log.md](work-log.md); recurring work remains here as a live item with its next due date, while each completed pass is recorded in the work log. Current policies and baselines live in [manuscript.md](manuscript.md). Historical queue snapshots are retained only in the work log.

## Ranked Next Objects

1. `priority_directory_review_and_drive` — [OPS-028](#ops-028--priority-directory-review-and-drive). Priority: High; status: In progress; first directory completed.
2. `reference_equation_mapping_surface` — [OPS-016](#ops-016--reference-equation-mapping-surface). Status: Queued.
3. `operator_explanation_standard_review` — [OPS-029](#ops-029--operator-explanation-standard-review). Status: Queued.
4. `option_b_report_only_stale_binding_review` — [OPS-030](#ops-030--option-b-report-only-stale-binding-review). Priority: Medium; status: Queued.
5. `periodic_project_skill_maintenance` — [OPS-027](#ops-027--periodic-project-skill-maintenance). Status: Recurring; next pass due 2026-11-10.

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

### OPS-030 — Option B report-only stale-binding review

- **Priority object:** `option_b_report_only_stale_binding_review`.
- **Priority:** Medium.
- **Status:** ○ Queued.
- **Opened:** 2026-09-11, after the report-only Option B check on `Converge AAA corpus and record CRW-005 reviews` reported a stale binding.
- **Request:** Review the Option B report-only dependency-map failure, currently recorded as `Stale binding: https://example.invalid/option-b-corrected/assumptions`, against the exact published candidate head and the retained map/source artifacts. Determine whether the map should be refreshed as a reviewed candidate, whether its declared assumptions binding is obsolete, or whether the diagnostic should remain unchanged pending scope acceptance.
- **Acceptance:** Record the exact stale binding, affected map and source bytes, comparison head, and independent reproduction. Preserve `approval: not-granted`, A-check authority, report-only status, and the distinction between a consistency result and scientific or baseline acceptance. Do not refresh hashes, alter the namespace, accept the map, or transfer authority without an explicit operator decision and exact-head review.
- **Owner:** operations with the development-process-review and equation-mapping owners; scientific acceptance remains with the applicable theory owner.

## Awaiting verification

No rows.

## Recurring

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
- **Acceptance:** Each maintained skill has a disposition recorded in the work log, with corrections applied only to its live owner and no competing policy source introduced.
- **Owner:** operations with the repository skills-policy owner.

## Closed work

Completed task detail is not retained in this queue. Search [work-log.md](work-log.md) by task identifier for the closure record.

<a id="ops-024--post-campaign-binding-corruption-sweep"></a>

OPS-024: [completed local evidence-only reconciliation and I5 custody disposition](work-log.md#2026-09-11--ops-024-closed-after-i5-custody-disposition). The [recovery queue](../development-process-review/work-queue.md) retains blocked inputs and deferred verification.
