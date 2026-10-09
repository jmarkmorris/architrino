# Operations Work Queue

This is the current execution ledger for deployment, hosting, cost, reliability, release and public-app operations. Completed one-time work moves to [work-log.md](work-log.md); recurring work remains here as a live item with its next due date, while each completed pass is recorded in the work log. Current policies and baselines live in [manuscript.md](manuscript.md). Historical queue snapshots are retained only in the work log.

## Ranked Next Objects

1. `priority_directory_review_and_drive` — [OPS-028](#ops-028--priority-directory-review-and-drive). Priority: High; status: In progress; first directory completed.
2. `reference_equation_mapping_surface` — [OPS-016](#ops-016--reference-equation-mapping-surface). Status: Queued.
3. `operator_explanation_standard_review` — [OPS-029](#ops-029--operator-explanation-standard-review). Status: Queued.
4. ◐ `periodic_priority_assets_scan` — [OPS-032](#ops-032--periodic-priority-assets-scan). Status: Recurring; October 4 weekly control pass complete; next weekly pass 2026-10-11; first substantive sample 2026-10-13.
5. ◐ `periodic_reader_facing_corpus_scan` — [OPS-031](#ops-031--periodic-reader-facing-corpus-scan). Status: Recurring; thirty-five chapters reviewed through 2026-10-09; next early review Causal Action Functional 2026-10-11; next validation reservation 2026-10-22; Foundations/Dynamics cycle due 2026-10-13.
6. `periodic_project_skill_maintenance` — [OPS-027](#ops-027--periodic-project-skill-maintenance). Status: Recurring; next pass due 2026-11-10.

7. ○ `periodic_retention_review` — [OPS-033](#ops-033--periodic-retention-review). Status: Recurring; first pass due 2026-10-14.

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
  - ● `app-borg` — reviewed; complete.
  - ● `app-equation-mapping` — reviewed; complete.
  - ● `app-lattice-lab` — reviewed; complete.
  - ● `app-photon` — reviewed; complete.
  - ● `app-simulation` — reviewed; complete.
  - ● `app-solver` — reviewed; complete.
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
- **Status:** ○ Recurring; scheduled, first pass not started.
- **Scheduler:** Active task heartbeat `architrino-retention-review`, titled “Architrino retention review”; monthly on the 14th at 09:00 app-local time.
- **Cadence and next due:** First pass 2026-10-14; monthly thereafter. Assess cadence after three completed passes.
- **Request:** Follow the [retention review procedure](../../op/machine-artifact-retention.md#recurring-retention-review): measure budget compliance and allocation, inspect three bounded families for current consumers, reproduction and recovery obligations, and propose keep/archive/rebuild/delete dispositions. Preserve the circular-root pilot detailed-review deferral until an operator-selected milestone.
- **Acceptance per pass:** Record exact coverage, instruments/results and limits, current consumers, proposed dispositions, recovery gaps, deferred/uncovered families, coverage cursor and next due date in the work log and existing subject owners. No automatic deletion, movement, compaction, history maintenance, budget change, authored regeneration or publication.
- **Owner:** operations coordinates with artifact and research owners; scientific acceptance remains with those owners.

### OPS-031 — Periodic reader-facing corpus scan

- **Priority object:** `periodic_reader_facing_corpus_scan`.
- **Status:** ◐ Recurring; first cycle in progress; thirteen early, eight core, ten supporting and four validation chapters reviewed through 2026-10-09; Binary Dynamics whole-chapter review complete.
- **Scheduler:** Active shared task heartbeat `ops-031-corpus-review-cycles`, titled “Architrino corpus and priority review cycles”; daily 09:00 app-local check-in executes only due batches/checks. Scheduled coverage starts 2026-09-20. OPS-031 and OPS-032 retain separate coverage records.
- **Request:** Scan reader-facing corpus claims and explanations for demonstrated errors, missed propagation and useful evidence-backed improvements under the [periodic review procedure](../../op/periodic-document-review.md). Retain valid no-change dispositions and route substantive repairs to their existing owner.
- **Cadence and next due:** Establish the ordered due list by the [four review priorities](../../op/periodic-document-review.md#corpus-review-priorities). Review all 15 Foundations/Dynamics chapters monthly, the 46 core-theory chapters quarterly, 95 supporting chapters every six months, and 43 validation/simulation chapters annually. These are current inventory counts, not immutable quotas. First early-chapter cycle due 2026-10-13; the carried 3D Braid Assemblies review completed September 30; the October 5 core reservation completed Zero-Axial-Offset Three-Binary Dynamics and Interpretation (the launch reservation called Nested Shell Braid Dynamics); next core reservation October 12 begins Coordinate-Axis Six-Point Symmetry and Return Response. Emergence of Structure completed October 2; Master Equation cumulative whole-chapter review completed October 5; Energy completed October 6, Entropy October 8 and Binary Dynamics October 9; next early review Causal Action Functional October 11. See the October 2 work-log capacity plan for remaining early chapters and deadline risk. The carried Condensed Matter review completed October 1; Mode Taxonomy completed October 4 with no new referral; Radiation and Atomic Transition Radiation completed October 6; next supporting reservation October 13 begins Bremsstrahlung and Synchrotron. The September 24 validation reservation completed September 27; next regular validation reservation October 22. Material changes trigger affected-dependency review earlier. Cadence/coverage evaluation due 2026-12-12; no automatic rewrite; the shared scheduled check-in advances due review work.
- **Coverage cursor:** The [September 20 launch inventory](evidence/ops-031-coverage-inventory-2026-09-20.json) preserves all 199 ordered paths and launch versions; the October 6 sorted live inventory matches its path set by empty `comm -3`. Priority 1: 13 of 15 whole chapters reviewed; the prior ten listed in the October 5 log plus Energy, Entropy and Binary Dynamics complete at bounded review scope, leaving 2. Contiguous Master Equation receipts and accepted-repair rechecks account for the complete current chapter; this is not certification of every proof or computational claim. Energy completed October 6, Entropy October 8 and Binary Dynamics October 9; reserve Causal Action Functional October 11 and Effective Lagrangian October 12, with October 13 as completion buffer. These are capacity reservations, not completed coverage; replan visibly if reviews carry past them. Priority 2: 8 of 46 reviewed; the prior seven listed in the October 4 log plus Zero-Axial-Offset Three-Binary Dynamics and Interpretation complete, leaving 38. Next regular core reservation October 12 begins Coordinate-Axis Six-Point Symmetry and Return Response. Priority 3: 10 of 95 reviewed, leaving 85; Atomic Structure, Nucleon Structure, Nuclear Binding, Atomic Spectra, Hyde Periodic Table, Molecular Geometry, Condensed Matter, Mode Taxonomy, Radiation and Atomic Transition Radiation complete. Next supporting reservation October 13 begins Bremsstrahlung and Synchrotron in launch order, subject to unfinished early-chapter priority with explicit carryover if capacity is unavailable. Priority 4: 4 of 43 reviewed, leaving 39; Action Model Comparison, Analytic Baselines, Attraction and Background and Simple Action complete. Next October 22 begins Causal Set and Delay Geometry and Delay-Dynamics Energy, followed by remaining launch-order paths within the four-chapter reservation. All uncovered paths remain in the launch inventory; earlier review applies to material dependency changes. No sample completes a cycle; retain the October 13 deadline and substantial-derivation carryover risk.

- **Findings:** The eight corrections from the September 20–22 reviews were explicitly approved and integrated on September 23; see the [implementation record](../aaa-corpus-rewrite/analysis/ops-031-repair-proposal-2026-09-23.md#implementation-record). CRW-005 remains closed.
- **Supporting findings:** Atomic Spectra and Nuclear Binding retain no-change dispositions. The neutron dipole completeness question and direction-scale normalization observation remain [separate scientific follow-ups](../aaa-corpus-rewrite/work-queue.md#ops-031--separate-scientific-follow-ups). The shared tolerance repair includes Braid Envelope Geometry; implementation review does not advance scheduled coverage.
- **October 9 review:** The [Binary Dynamics receipt](evidence/ops-031-binary-dynamics-review-2026-10-09.md) completes the full chapter with a bounded no-change disposition. Two accepted Binary repairs and the previous Entropy capacity/no-change claim survive independent rechecks. October 10 is ahead of the ordinary early plan; next reservation is Causal Action Functional October 11. The two Entropy proposals remain unaccepted; CRW-005 and cycle dates are unchanged.
- **October 8 review:** The [Entropy receipt](evidence/ops-031-entropy-review-2026-10-08.md) completes one substantial early chapter and records two proposed [bounded corrections](../aaa-corpus-rewrite/work-queue.md#ops-031--october-8-entropy-referral): explicitly positive bath temperature for the useful-work upper bound, and a temperature subscript in the same-record tuple. Neither is implemented. Two accepted repairs and one prior no-change claim survive retrospective rechecks. CRW-005 remains closed; all cycle dates remain unchanged.
- **October 6 review:** [Energy](evidence/ops-031-energy-review-2026-10-06.md), [Radiation](evidence/ops-031-radiation-review-2026-10-06.md) and [Atomic Transition Radiation](evidence/ops-031-atomic-transition-radiation-review-2026-10-06.md) complete their whole-chapter reservations. The operator approved the separately routed [symbolic-speed clarification](../aaa-corpus-rewrite/work-queue.md#ops-031--october-6-energy-notation-referral); it is implemented and checked at its bounded notation scope; both supporting chapters retain no-change dispositions. The separate [Energy adjudication](evidence/ops-031-energy-target-adjudication-2026-10-06.md) rejects a dimensional-error suspicion. Two accepted Energy repairs and one prior no-change claim survive independent rechecks. Same-lineage model evaluation and all cycle deadlines remain unchanged.
- **October 5 review:** The [spiral continuation](evidence/ops-031-master-spiral-review-2026-10-05.md) and [tail continuation](evidence/ops-031-master-tail-review-2026-10-05.md) complete Master Equation cumulative chapter coverage; [three-binary review](evidence/ops-031-nested-shell-dynamics-review-2026-10-05.md) completes the core reservation. Six [proposed corrections](../aaa-corpus-rewrite/work-queue.md#ops-031--october-5-master-equation-and-three-binary-referrals) and the two October 4 corrections were subsequently approved and implemented October 6; [separate verification](../aaa-corpus-rewrite/evidence/ops-031-eight-correction-closure-2026-10-06.md) records their bounded closure. The [retrospective rechecks](evidence/ops-031-retrospective-rechecks-2026-10-05.md) preserve two accepted repairs and one prior no-change claim without adding chapter coverage. Same-lineage October 4 model evaluation remains applicable; no superiority claim or measured burden estimate is made.
- **October 4 review:** The [Master Equation continuation](evidence/ops-031-master-equation-continuation-review-2026-10-04.md) adds partial coverage through line 3955 and two [then-unaccepted circular-root corrections](../aaa-corpus-rewrite/work-queue.md#ops-031--october-4-circular-root-referrals). [Mode Taxonomy](evidence/ops-031-mode-taxonomy-review-2026-10-04.md) completes its carried full-chapter review with no new referral. The [model comparison](evidence/ops-031-model-evaluation-2026-10-04.md) supports bounded pilot eligibility with blinding limits, not superiority; [retrospective checks](evidence/ops-031-retrospective-rechecks-2026-10-04.md) retain two accepted repairs and one prior no-change claim. The October 5 continuation subsequently completed; the remaining five early chapters retain the October 13 deadline and substantial-derivation carryover risk.
- **Latest repair disposition:** The operator accepted the eight October 4–5 corrections on October 6; [implementation and separate verification](../aaa-corpus-rewrite/evidence/ops-031-eight-correction-closure-2026-10-06.md) resolve all eight at their bounded mathematical/editorial scope. Open scientific questions and cycle dates remain unchanged; CRW-005 remains closed.
- **October 3 repair disposition:** The operator accepted all six consolidated review groups on October 3; [implementation and separate verification](../aaa-corpus-rewrite/evidence/ops-031-six-group-closure-2026-10-03.md) are complete across seven chapters. Moving-root geometry, chart/auxiliary scope, braid coordinates, accepted theorem propagation, Action Model definitions and observer-clock notation are corrected. Original receipts and scientific obligations remain intact. The scheduled Master Equation continuation and all cycle dates are unchanged; CRW-005 remains closed.
- **Baseline:** The [CRW-005 supplementary closeout](../aaa-corpus-rewrite/evidence/crw-005-claude-sixteen-closure-verification-2026-09-13.md#final-sixteen-chapter-integration) supplies dated review evidence; recheck actual bytes and owners at launch.
- **Acceptance per pass:** Record priority assignments, ordered due paths/versions, completed whole-chapter coverage, remaining cycle cursor and next batch, independent support and dispositions for findings, verification of accepted repairs, previous-repair/no-change follow-up, confirmed regressions and measured review burden. Update the next due date and record the pass under OPS-031 in the work log. Samples do not establish corpus-wide correctness.
- **Owner:** operations coordinates; corpus review and applicable scientific owners adjudicate and integrate. Preserve CRW-005 history and separate scientific obligations.

### OPS-032 — Periodic priority-assets scan

- **Priority object:** `periodic_priority_assets_scan`.
- **Status:** ◐ Recurring; weekly control pass complete 2026-10-04; monthly substantive review not started.
- **Scheduler:** Active shared task heartbeat `ops-031-corpus-review-cycles`, titled “Architrino corpus and priority review cycles”; daily 09:00 app-local check-in executes only due batches/checks. Scheduled coverage starts 2026-09-20. OPS-031 and OPS-032 retain separate coverage records.
- **Request:** Check live priority control surfaces for status, ownership and evidence consistency, and sample substantive manuscripts, analyses, contracts and their supporting assets under the [periodic review procedure](../../op/periodic-document-review.md). Review non-Markdown evidence through its declared consumer; preserve historical bytes and dormant status.
- **Cadence and next due:** Weekly changed-control-surface scan plus one rotating unchanged directory, next 2026-10-11; monthly substantive sample of three workstreams, first 2026-10-13. Material owner/claim transitions trigger focused review earlier. Cadence/coverage evaluation due 2026-12-12.
- **Coverage cursor:** The [October 4 receipt](evidence/ops-032-weekly-review-2026-10-04.md) completes the bounded transition checks over 54 extant changed control paths and the unchanged app-equation-mapping rotation; app-borg was covered as changed. The six initially clipped controls were completed in the same session. Quark intake, dormant ceiling routing, amplitude-gradient summary and completed Lattice adjudication are reconciled at control scope. No unfinished weekly cursor remains. Next unchanged rotation: app-lattice-lab, skipping it if covered as changed. Prior dispositions and OPS-028 coverage are reused without strengthening whole-directory or scientific status. Monthly full-asset review remains distinct and due October 13.
- **October 1 intake:** The [bounded ownership check](evidence/ops-032-trigger-review-2026-10-01.md) adds Binary, Photon and Neutrino as unfinished inventory and records active Quark setup provisionally. The October 4 weekly check resolves this intake to the current unfinished owner; deferred work remains deferred. This adds no whole-directory or weekly coverage.
- **October 6 trigger:** The [bounded owner-transition check](evidence/ops-032-trigger-review-2026-10-06.md) records completed quantitative amplitude-gradient admission and the completed E-only method follow-up with the physical first event still open. Current owner controls already name these distinctions; no further reconciliation is warranted. No weekly rotation or monthly substantive credit is added; all next dates remain unchanged.
- **October 5 trigger:** The [bounded Maxwell owner-transition check](evidence/ops-032-trigger-review-2026-10-05.md) reconciles the parent MEC queue to the explicitly selected bounded investigation and assigned original E-only first-event successor. Broader law selections remain unselected. This adds no weekly rotation, monthly substantive coverage or scientific acceptance; next weekly October 11, monthly October 13 and quarterly December 12 remain unchanged.
- **October 3 trigger:** The [owner-transition triage](evidence/ops-032-trigger-review-2026-10-03.md) establishes Quark filing and records concurrent logarithmic/ceiling migration plus limited Binary/Lattice evidence integrations. The October 4 weekly pass reconciles the completed migration while preserving unfinished/dormant states and existing scientific gaps. This advances neither weekly rotation nor monthly substantive coverage.
- **Coordination:** Reuse current OPS-028 coverage and active-owner findings rather than restart that traversal. Guidance/skills and binding incidents retain OPS-014/OPS-027 and their existing incident owners.
- **Focused follow-up, September 30:** The [material-trigger check](evidence/ops-032-trigger-review-2026-09-30.md) verifies that the earlier MEC Section 10 reachability referral is resolved in the current manuscript, with scientific limits retained. AWT-016's ownership transfer also prompted reconciliation of the OPS-028 inventory to the five declared MEC child owners; unfinished and dormant states remain unchanged. This advances no weekly or monthly coverage and changes no next due date.
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
