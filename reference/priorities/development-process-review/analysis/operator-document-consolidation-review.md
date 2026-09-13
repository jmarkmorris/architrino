# Operator document inventory and consolidation review

Review date: September 12, 2026. Scope: the Option A/B integrity investigation, validation recovery, agent dispatch and their operational documentation. This is a consolidation recommendation, not an authorization or record of moving, merging, deleting or rewriting the inventoried documents.

The recommendation is to consolidate current status and reusable instructions into their existing owners, while retaining dated investigations, original reports, independent reviews and versioned contracts with their evidence. The four Git guides already have distinct declared responsibilities; merging them would combine different questions and execution authorities.

## Basis and review limits

The inventory below was measured with `rg --files reference/priorities/development-process-review -g '*.md'` and selected operational-owner paths, with existence checks for those selected paths. It includes 98 existing collection Markdown files and 22 operational or governing references; this new review is excluded from those counts. Every collection Markdown file is listed, including adjacent incidents, so exclusion from the main reading path does not hide a record. JSON/JSON-LD manifests, source snapshots, logs and receipts are supporting machine records, outside this Markdown count.

The current owner and overlap assessment uses direct reads of the collection README, priorities, queue, process checklist, Redux handoff, remaining migration plan, reconciliation record, closeout and archive records, Git index and relevant operating-policy sections. The preceding RCA supplies deeper investigative reading, with its exact limits recorded in [document coverage](../evidence/option-a-validation-rca/document-coverage.md). Listing a detailed execution or evidence file here establishes its presence and role in the collection, not a fresh full-content review, revalidation or permission to remove it. Recommendations to retain such records are deliberately conservative. No validation suite or scientific computation was rerun for this document inventory.

Two concrete overlap defects were observed by direct text reads in this snapshot. The collection README says its current recovery account does not archive the task, while the archive-readiness review explicitly records the September 9 operator-authorized archive; the README should link to that disposition. The Git index describes bounded report-only B integration and deferred wider adoption, while the current priorities and Redux handoff route active full-B continuation to the accepted architecture; that index summary should follow the live owner. Re-reading those exact passages after another task updates them can overturn either freshness finding.

## Recommended consolidation

The rows below are proposals. They are not added executable tasks.

| Proposed change | Existing destination | Reason and preservation boundary |
| --- | --- | --- |
| Consolidate current next actions spread across the checklist, migration plan, handoff and reconciliation narrative | [Work queue](../work-queue.md), with concise strategy in [priorities](../priorities.md) | The priority-directory policy already separates executable work from strategy and history. The finite migration plan is explicitly historical in the Redux handoff. Preserve distinct process decisions and original package scope. |
| Reduce the collection README and Git index to reliable entry points | Their existing files | Long current-state summaries duplicate changing owners and already differ from later recorded decisions. |
| Give current recovery residuals one reading route | [Archive-readiness review](archive-readiness-review.md) for custody and receiving-owner navigation; queue for executable work | Completion assessment, original closeout proposal and semantic review answer different dated questions. Preserve them, but stop asking readers to reconcile their old status tables unaided. |
| Consolidate accepted B explanation and reusable contracts | [Architecture](../../../op/git/git-backed-knowledge-architecture.md) and the existing admission/transition contracts | Design, pilot and readiness records should support the accepted arrangement without becoming competing current instructions. Preserve independent review records and exact acceptance scopes. |
| Consolidate current omitted-test accounting | [Final test coverage](final-test-coverage.md), linking the source/input dispositions | Supervision-and-omitted-coverage mixes incident causality with test omissions. Keep supervisor evidence and authenticated historical-input records intact; merge only duplicate current accounting after checking their consumers. |
| Consolidate repeated causal explanations and live dispatch/supervision rules | [Option A RCA](option-a-validation-root-cause-analysis.md) for causal synthesis; [dispatch procedure](../../../op/codex-multiprompt.md) and [supervision procedure](../../../op/long-running-test-heartbeats.md) for accepted instructions | Earlier reports remain evidence. Scientific acceptance, historical reconstruction, dispatch byte integrity and publication authority retain distinct meanings. |

## Standing operational and governing references

| Document | Responsibility | Consolidation assessment |
| --- | --- | --- |
| [README.md](../../../op/git/README.md) | Git reading index | Keep short; update its older Option B scope summary to follow the architecture owner. |
| [git-backed-knowledge-architecture.md](../../../op/git/git-backed-knowledge-architecture.md) | History, evidence, A/B/C design and accepted B end state | Keep as the explanatory owner. Consolidate accepted architectural explanation here; route historical prototype detail to its existing design records. |
| [git-github-operating-guide.md](../../../op/git/git-github-operating-guide.md) | Repository setup, credentials and collaboration | Keep separate from architecture and publication execution. |
| [pr-lifecycle.md](../../../op/git/pr-lifecycle.md) | Publication, validation, merge and branch procedure | Keep the single publication procedure; replace duplicate procedural prose elsewhere with links. |
| [github-issue-resolution.md](../../../op/git/github-issue-resolution.md) | Issue investigation and closure | Keep; its issue-specific scope and publication handoff are distinct. |
| [codex-multiprompt.md](../../../op/codex-multiprompt.md) | Agent coordination and dispatch | Keep as the current dispatch procedure; retain incident diagnosis separately. |
| [long-running-test-heartbeats.md](../../../op/long-running-test-heartbeats.md) | Long-running job supervision | Keep as the operational procedure; integrate only accepted reusable lessons from recovery records. |
| [machine-artifact-retention.md](../../../op/machine-artifact-retention.md) | Artifact retention and runtime build policy | Keep as the retention authority; avoid competing retention rules in campaign reports. |
| [operator-explanation-standard.md](../../../op/operator-explanation-standard.md) | Operator communication and working-document maintenance | Keep; style is already imported from its separate authoritative guide. |
| [codex-goal-seeking-prompt-template.md](../../../op/codex-goal-seeking-prompt-template.md) | General execution procedure | Keep; reference specialized owners instead of repeating their procedures. |
| [brainstorming.md](../../../op/brainstorming.md) | Workflow index and retained workflow proposals | Keep routing; consider separating its substantial historical proposals from the short procedure index in a later, broader workflow review. |
| [README-op.md](../../../op/README-op.md) | Workflow feedback tasks | Keep a short task surface; do not merge with explanatory policies. |
| [agent-startup-orientation.generated.md](../../../op/agent-startup-orientation.generated.md) | Generated startup router | Keep generated; any consolidation must update canonical routing sources through their generator. |
| [session-root-self-test.md](../../../op/session-root-self-test.md) | Environment-access diagnostic and run records | Supporting reference; no merger recommended in this review. |
| [codex-authentication.md](../../../op/codex-authentication.md) | Codex account authentication | Supporting reference; distinguish account sign-in from repository credentials. |
| [simulation-protocol-routing-index.md](../../../op/simulation-protocol-routing-index.md) | Routing to scientific and execution contracts | Keep domain routing separate from process-repair completion. |
| [README.md](../../../op/skills/README.md) | Repository skills ownership and routing | Keep; skill entries route to procedures rather than replacing them. |
| [AGENTS.md](../../../../AGENTS.md) | Repository startup and governing rules | Keep the required entry point; link to specialized owners. |
| [CLAUDE.md](../../../../CLAUDE.md) | Claude startup entry point | Keep its tool-specific entry role; this review does not authorize a bootstrap redesign. |
| [README.md](../../README.md) | Strategic tracker, queue, log and support-file roles | Keep; apply its existing division of responsibilities to this collection. |
| [software-architecture-and-maintenance.md](../../../../content/markdown/aaa/archie/software-architecture-and-maintenance.md) | Canonical software ownership and cleanup discipline | Keep; any relocation or removal needs consumer and binding review. |
| [academic-style-guide.md](../../../../content/markdown/aaa/archie/academic-style-guide.md) | Shared explanatory writing standard | Keep; do not reproduce its rules in each operator document. |

## Collection navigation and current work

| Document | Consolidation assessment |
| --- | --- |
| [README.md](../README.md) | Keep as the collection entry point. Reduce to purpose, reading order and links; remove competing current-status narratives. |
| [priorities.md](../priorities.md) | Keep strategy, accepted scope and concise current state. Move execution details and repeated validation chronology to their owners. |
| [processes-git-codex-claude.md](../processes-git-codex-claude.md) | Consolidate duplicated current B actions into the queue. Retain its distinct process decisions; route architecture and operating explanation to the existing Git guides. |
| [work-log.md](../work-log.md) | Keep chronology; preserve dated entries rather than combining them into a mutable status account. |
| [work-queue.md](../work-queue.md) | Keep as the single executable queue for the obligations routed here; preserve blocked/deferred conditions. |

## Detailed execution and migration records

| Document | Consolidation assessment |
| --- | --- |
| [acceleration-current-migration.md](acceleration-current-migration.md) | Keep the family-specific contract, execution or migration evidence. Consolidate only repeated operator status into its existing summary owner. |
| [circular-current-execution.md](circular-current-execution.md) | Keep the family-specific contract, execution or migration evidence. Consolidate only repeated operator status into its existing summary owner. |
| [circular-next-candidate-review.md](circular-next-candidate-review.md) | Keep the family-specific contract, execution or migration evidence. Consolidate only repeated operator status into its existing summary owner. |
| [emission-current-migration.md](emission-current-migration.md) | Keep the family-specific contract, execution or migration evidence. Consolidate only repeated operator status into its existing summary owner. |
| [f5-circular-build-review.md](f5-circular-build-review.md) | Keep the family-specific contract, execution or migration evidence. Consolidate only repeated operator status into its existing summary owner. |
| [f5-current-handoff.md](f5-current-handoff.md) | Keep the family-specific contract, execution or migration evidence. Consolidate only repeated operator status into its existing summary owner. |
| [f5-remaining-callers.md](f5-remaining-callers.md) | Keep the family-specific contract, execution or migration evidence. Consolidate only repeated operator status into its existing summary owner. |
| [full-root-cover-current-migration.md](full-root-cover-current-migration.md) | Keep the family-specific contract, execution or migration evidence. Consolidate only repeated operator status into its existing summary owner. |
| [next-caller-input-review.md](next-caller-input-review.md) | Keep the family-specific contract, execution or migration evidence. Consolidate only repeated operator status into its existing summary owner. |
| [root-cover-current-migration.md](root-cover-current-migration.md) | Keep the family-specific contract, execution or migration evidence. Consolidate only repeated operator status into its existing summary owner. |

## Investigation, recovery and coverage

| Document | Consolidation assessment |
| --- | --- |
| [agent-dispatch-integrity.md](agent-dispatch-integrity.md) | Keep incident evidence; codex-multiprompt owns current dispatch instructions and the RCA links the causal finding. |
| [archive-readiness-review.md](archive-readiness-review.md) | Keep as the receiving-owner and residual handoff index; executable follow-ups should have one queue representation. |
| [consequential-repair-audit.md](consequential-repair-audit.md) | Keep detailed historical transition evidence; the RCA can summarize and link it. |
| [cross-report-findings.md](cross-report-findings.md) | Retain cross-session assessment. Consolidate any ongoing repeated causal summary into the RCA, preserving distinct non-Option-A findings. |
| [final-test-coverage.md](final-test-coverage.md) | Keep as the central coverage account. Consolidate duplicated omission accounting here while retaining each original run result. |
| [first-process-investigation.md](first-process-investigation.md) | Keep the diagnostic findings and controls as a dated investigation. |
| [independent-recovery-necessity-review.md](independent-recovery-necessity-review.md) | Keep independent review and its original scope; do not fold the review into its subject. |
| [initial-assessment.md](initial-assessment.md) | Retain as an earlier assessment; use a clear route to the later causal synthesis for current conclusions. |
| [operator-concerns.md](operator-concerns.md) | Retain the original problem statement and scope; link from the current synthesis. |
| [option-a-validation-rca-prompt.md](option-a-validation-rca-prompt.md) | Retain the investigation brief separately from findings. |
| [option-a-validation-root-cause-analysis.md](option-a-validation-root-cause-analysis.md) | Use as the current Option A causal synthesis; retain its explicit uncertainties and links to original evidence. |
| [owner-failure-recovery.md](owner-failure-recovery.md) | Keep per-owner failure and repair evidence; queue only the currently actionable residuals. |
| [process-repair-validation.md](process-repair-validation.md) | Keep repair validation as evidence; accepted reusable supervision rules belong in the live procedure. |
| [recovery-closeout-review.md](recovery-closeout-review.md) | Retain the original obligation and preservation map. Its historical proposal statuses must not become another live backlog. |
| [recovery-completion-assessment.md](recovery-completion-assessment.md) | Retain the earlier scope assessment. Current closeout/handoff status should route to the archive-readiness review and queue. |
| [remaining-caller-contracts.md](remaining-caller-contracts.md) | Keep as the detailed caller-contract owner; avoid reproducing the entire status table in summaries. |
| [review-and-repair-plan.md](review-and-repair-plan.md) | Retain the original recovery scope and decisions. Current executable work belongs in the queue. |
| [scientific-consumption-disposition.md](scientific-consumption-disposition.md) | Keep scientific-input requirements and acceptance boundaries separate from operational completion. |
| [semantic-closeout-review.md](semantic-closeout-review.md) | Keep semantic acceptance evidence and exact reviewed scope; link from current status. |
| [shared-helper-caller-audit.md](shared-helper-caller-audit.md) | Keep the audit baseline; consolidate live caller status in remaining-caller-contracts and the executable queue. |
| [source-recovery-and-binding-repair.md](source-recovery-and-binding-repair.md) | Keep reconstruction and repair evidence; do not merge historical and current source identities. |
| [supervision-and-omitted-coverage.md](supervision-and-omitted-coverage.md) | Candidate for a section-level split: retain supervisor incident evidence; centralize current omitted-test accounting in final-test-coverage with links to protected input records. |

## Adjacent process investigations

| Document | Consolidation assessment |
| --- | --- |
| [external-codex-storage-audit.md](external-codex-storage-audit.md) | Keep with its distinct incident or decision. Cross-link relevant lessons; no merger with the Option A causal investigation is recommended. |
| [github-remote-incident-diagnosis.md](github-remote-incident-diagnosis.md) | Keep with its distinct incident or decision. Cross-link relevant lessons; no merger with the Option A causal investigation is recommended. |
| [public-community-guidance-review.md](public-community-guidance-review.md) | Keep with its distinct incident or decision. Cross-link relevant lessons; no merger with the Option A causal investigation is recommended. |
| [retention-health-review.md](retention-health-review.md) | Keep with its distinct incident or decision. Cross-link relevant lessons; no merger with the Option A causal investigation is recommended. |
| [worktree-learning-and-experiment.md](worktree-learning-and-experiment.md) | Keep with its distinct incident or decision. Cross-link relevant lessons; no merger with the Option A causal investigation is recommended. |
| [historical-voice-handoff-2026-08-01.md](../evidence/historical-voice-handoff-2026-08-01.md) | Keep with its distinct incident or decision. Cross-link relevant lessons; no merger with the Option A causal investigation is recommended. |

## Option B design, implementation and succession

| Document | Consolidation assessment |
| --- | --- |
| [option-b-approval-and-pilot-review.md](option-b-approval-and-pilot-review.md) | Keep the bounded design, pilot, transfer or review record; summarize its accepted outcome through the current architecture, contracts and reconciliation owner. No physical merger recommended without a separate content/binding review. |
| [option-b-cached-root-cover-cutover.md](option-b-cached-root-cover-cutover.md) | Keep the bounded design, pilot, transfer or review record; summarize its accepted outcome through the current architecture, contracts and reconciliation owner. No physical merger recommended without a separate content/binding review. |
| [option-b-cached-root-cover-full-cutover.md](option-b-cached-root-cover-full-cutover.md) | Keep the bounded design, pilot, transfer or review record; summarize its accepted outcome through the current architecture, contracts and reconciliation owner. No physical merger recommended without a separate content/binding review. |
| [option-b-circular-cutover.md](option-b-circular-cutover.md) | Keep the bounded design, pilot, transfer or review record; summarize its accepted outcome through the current architecture, contracts and reconciliation owner. No physical merger recommended without a separate content/binding review. |
| [option-b-corrected-candidate-review.md](option-b-corrected-candidate-review.md) | Keep the bounded design, pilot, transfer or review record; summarize its accepted outcome through the current architecture, contracts and reconciliation owner. No physical merger recommended without a separate content/binding review. |
| [option-b-current-source-cutover-inventory.md](option-b-current-source-cutover-inventory.md) | Keep the enumerated transfer scope and evidence. Avoid treating the completed original profiles as a full-B census. |
| [option-b-dependency-map-review.md](option-b-dependency-map-review.md) | Keep the bounded design, pilot, transfer or review record; summarize its accepted outcome through the current architecture, contracts and reconciliation owner. No physical merger recommended without a separate content/binding review. |
| [option-b-f5-cutover.md](option-b-f5-cutover.md) | Keep the bounded design, pilot, transfer or review record; summarize its accepted outcome through the current architecture, contracts and reconciliation owner. No physical merger recommended without a separate content/binding review. |
| [option-b-f6c-coordinator-cutover.md](option-b-f6c-coordinator-cutover.md) | Keep the bounded design, pilot, transfer or review record; summarize its accepted outcome through the current architecture, contracts and reconciliation owner. No physical merger recommended without a separate content/binding review. |
| [option-b-f6c-family-cutover.md](option-b-f6c-family-cutover.md) | Keep the bounded design, pilot, transfer or review record; summarize its accepted outcome through the current architecture, contracts and reconciliation owner. No physical merger recommended without a separate content/binding review. |
| [option-b-first-chain-baseline-review.md](option-b-first-chain-baseline-review.md) | Keep the bounded design, pilot, transfer or review record; summarize its accepted outcome through the current architecture, contracts and reconciliation owner. No physical merger recommended without a separate content/binding review. |
| [option-b-gradual-adoption-design.md](option-b-gradual-adoption-design.md) | Retain design rationale and stages as history; consolidate accepted current explanation into architecture and live contracts. |
| [option-b-integration-readiness.md](option-b-integration-readiness.md) | Keep the bounded design, pilot, transfer or review record; summarize its accepted outcome through the current architecture, contracts and reconciliation owner. No physical merger recommended without a separate content/binding review. |
| [option-b-prescribed-response-and-acceleration-cutover.md](option-b-prescribed-response-and-acceleration-cutover.md) | Keep the bounded design, pilot, transfer or review record; summarize its accepted outcome through the current architecture, contracts and reconciliation owner. No physical merger recommended without a separate content/binding review. |
| [option-b-real-chain-pilot.md](option-b-real-chain-pilot.md) | Keep the bounded design, pilot, transfer or review record; summarize its accepted outcome through the current architecture, contracts and reconciliation owner. No physical merger recommended without a separate content/binding review. |
| [option-b-redux-handoff.md](option-b-redux-handoff.md) | Keep as the succession snapshot and assignment; follow its live-owner links instead of maintaining another status copy. |
| [option-b-remaining-migration-plan.md](option-b-remaining-migration-plan.md) | Retain the finite-package plan and original census. The Redux handoff explicitly says this is historical scope, not a competing live queue. |
| [option-b-repository-reconciliation.md](option-b-repository-reconciliation.md) | Keep detailed integration, transfer and review evidence; consolidate current next actions into the queue and concise state into priorities. |

## Operational contracts

| Document | Consolidation assessment |
| --- | --- |
| [option-b-current-source-admission.md](../contracts/option-b-current-source-admission.md) | Keep the admission contract; a coordinated future reorganization may share definitions with transition without merging their distinct obligations. |
| [option-b-current-source-transition.md](../contracts/option-b-current-source-transition.md) | Keep the B-to-B transition contract distinct from initial admission. |
| [option-b-f6c-current-closure.md](../contracts/option-b-f6c-current-closure.md) | Keep the F6c-specific operational closure contract and independent review boundary. |
| [root-cover-current-execution-v2.md](../contracts/root-cover-current-execution-v2.md) | Keep the versioned execution and evidence-identity contract. |
| [streamed-leaf-historical-invocation-v5.md](../contracts/streamed-leaf-historical-invocation-v5.md) | Keep the versioned historical invocation contract. |

## Evidence and independent reviews

| Document | Consolidation assessment |
| --- | --- |
| [agent-01-pr-260-publication-incident-report.md](../evidence/agent-01-pr-260-publication-incident-report.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [agent-02-hash-pin-repair-incident-report.md](../evidence/agent-02-hash-pin-repair-incident-report.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [agent-03-session-incident-report.md](../evidence/agent-03-session-incident-report.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [agent-04-session-incident-report.md](../evidence/agent-04-session-incident-report.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [agent-05-session-incident-report.md](../evidence/agent-05-session-incident-report.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [agent-post-report-responses.md](../evidence/agent-post-report-responses.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [current-context-independent-review.md](../evidence/circular-current-execution/current-context-independent-review.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [current-ladder-preparation-review.md](../evidence/circular-current-execution/current-ladder-preparation-review.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [current-memory-source-review.md](../evidence/circular-current-execution/current-memory-source-review.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [current-observation-source-review.md](../evidence/circular-current-execution/current-observation-source-review.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [current-pilot-independent-review.md](../evidence/circular-current-execution/current-pilot-independent-review.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [current-prior128-review.md](../evidence/circular-current-execution/current-prior128-review.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [current-prior32-review.md](../evidence/circular-current-execution/current-prior32-review.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [current-rung-entry-source-review.md](../evidence/circular-current-execution/current-rung-entry-source-review.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [current-rung-independent-review.md](../evidence/circular-current-execution/current-rung-independent-review.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [current-rung128-independent-review.md](../evidence/circular-current-execution/current-rung128-independent-review.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [current-rung32-independent-review.md](../evidence/circular-current-execution/current-rung32-independent-review.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [observation-owner-controls.md](../evidence/circular-current-execution/observation-owner-controls.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [bridge-review.md](../evidence/emission-current-migration/bridge-review.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [independent-review.md](../evidence/f5-current-handoff/independent-review.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [final-run-review.md](../evidence/f5-remaining-callers/final-run-review.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [independent-review.md](../evidence/f5-remaining-callers/independent-review.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [known-control.md](../evidence/f5-remaining-callers/known-control.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [README.md](../evidence/option-a-validation-rca/README.md) | Keep as the collection entry point. Reduce to purpose, reading order and links; remove competing current-status narratives. |
| [document-coverage.md](../evidence/option-a-validation-rca/document-coverage.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [option-b-f6c-closure-review.md](../evidence/option-b-f6c-closure-review.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [option-b-f6c-family-review.md](../evidence/option-b-f6c-family-review.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [option-b-f6c-paired-transfer.md](../evidence/option-b-f6c-paired-transfer.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [option-b-fictional-baseline-review.md](../evidence/option-b-fictional-baseline-review.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [option-b-fictional-prototype-review.md](../evidence/option-b-fictional-prototype-review.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [option-b-remaining-binding-dispositions.md](../evidence/option-b-remaining-binding-dispositions.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |
| [repair-proposal.md](../evidence/owner-failure-recovery/resumed-owner-review/repair-proposal.md) | Keep as evidence or an independent review; summarize through the owning analysis. Do not rewrite received reports, controlled disposition rows or review findings into their subject. |

## Scope outside this inventory

The receiving Braid Program, AAA Operations, App Solver and equation-mapping workstreams retain their own queues and scientific contracts. Their relevant destinations are enumerated in the archive-readiness review and the scientific-consumption disposition; their entire documentation trees are not candidates for this process-document consolidation. Branch-name registries, other research procedures and app-specific documents likewise remain outside this topic.

## Implementation boundary

Before any multi-file consolidation, inventory incoming Markdown links and anchors, generated-router inputs, conformance expectations, content-digest bindings, machine readers and active writers for the exact proposed files. A filename or prose-only appearance does not establish that a document is unbound; some disposition tables and contracts have machine consumers. Prefer section-level integration and explicit current-owner links first. Move or remove a file only after its distinct content, provenance and consumers have an accounted-for destination. These binding and ownership checks remain to be done because this turn produces the requested inventory and recommendations only.
