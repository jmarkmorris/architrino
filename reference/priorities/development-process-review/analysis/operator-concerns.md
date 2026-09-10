# Operator Concerns

This document captures the operator's concerns expressed in the development-process review conversation. It is a paraphrased account, not a verbatim transcript. Concerns and questions are not findings of fault or authorization to implement a particular remedy. Agent reports and independent verification must be assessed against these concerns rather than allowed to define the review's scope by themselves.

Coverage was checked against the operator messages available in this receiving task on 2026-09-07, including the final dictated batches and the instruction that input was complete for planning. It does not include concerns expressed only in other conversations or unsupplied notes. The nearby-speaker fragment explicitly withdrawn by the operator is excluded.

## Trust in test results

The operator encountered repeated test failures accompanied by explanations that they did not matter. That outcome is unacceptable to the operator: a failure needs a clear meaning, a supported explanation, and a resolution. Passing selected publication checks must not be confused with the health of the full test collection. The review should establish which tests ran and failed, which could not run because prerequisites were unavailable, which were intentionally skipped, and which no longer test a valid requirement. Repairing defects is part of the intended eventual outcome; classifying or documenting failures alone is insufficient.

## Whether attempted repairs caused damage

The operator is concerned that the prolonged repair campaign may have pursued mistaken diagnoses or introduced new defects. The review must allow for existing defects, false alarms, and regressions caused by repair attempts, including mixtures of these within one session. An agent's retrospective is not independent verification of its own actions. Assess actual changes, original diagnostics, and the evidence used to justify each consequential repair. Apply the same scrutiny to Codex's publication recommendation and subsequent claims.

The operator explicitly questioned whether much of the campaign was an unnecessary chase driven by agent confusion, rather than necessary repair work. The operator described limited prior trust in Claude and a perceived improvement with the model used that day as the reason for giving it another opportunity. These are reported experiences, not comparative model-performance findings. The review must test the agent's explanations and decisions without presuming either competence or fault from its identity or apparent confidence.

## Hashes, pins, and testing design

The operator does not yet have a clear explanation of hashes and pins or why this repository uses them. Explain what each kind protects, how it differs from a behavioral test, and when a mismatch warrants review, regeneration, or a code correction. Evaluate whether the current design is appropriate and consistent with established engineering practice. Do not assume that keeping every current binding, refreshing every mismatch, or eliminating hashes altogether is the answer. Preserve historical evidence while assessing whether current-source checks create unnecessary coupling or repeated repair work.

The operator explicitly requests definitions of internal jargon, especially hash and pin, in the explanation of how the system works. Do not assume familiarity because the terms appeared repeatedly during troubleshooting.

The operator requests a readable, durable explanation of the overall integrity architecture, potentially in operations documentation. Explain how hashes, pins, validation receipts, generated artifacts, and Git/publication checks fit together, what guarantees they provide, and their limits. The operator perceives the arrangement as unusually complicated and asks whether that complexity is necessary or reflects an agent-created approach that human engineers would avoid. Treat that as a question to investigate, not an established description of engineering practice.

Assess ongoing maintenance: what needs refreshing, what becomes obsolete, whether any records should be purged, and which records must be preserved. Measure storage use and growth before claiming that the system is large, small, or costly; distinguish current files, ignored runtime data, Git history, and hosted artifacts where relevant. Explain whether simpler or better-supported alternatives provide the required guarantees. These questions do not authorize deletion or redesign.

The operator specifically recalls complex Python file headers containing long hash values. Identify the actual examples from the evidence before explaining their purpose; the precise files have not yet been identified by the operator. The architecture explanation should use those concrete examples and distinguish executable integrity checks from comments, metadata, or preserved provenance rather than assuming all header hashes serve the same function.

## Origin and delayed detection of the first frozen-hash failure

One of the operator's central questions is how the first frozen-hash failure detected by Claude arose. The operator believes an explanation may already exist but wants it verified. Identify the exact initial failure from session evidence, establish the last matching and first mismatching states, and examine the change that crossed that boundary without assuming that the most recent edit caused it.

Separately explain why the problem was not caught when introduced. Determine which relevant checks existed at that time, whether they ran, what they exercised, whether failures were visible or blocking, and what the publication process accepted. Distinguish a missing test, an existing test omitted from the gate, a test blocked by its environment, an ignored failure, and a defect in the checking instrument. These are candidate explanations, not established findings. Understanding origin alone does not resolve the operator's concern about delayed detection.

## Placement of tests and the GitHub hang

The operator questions the decision to add the broad test sweep to GitHub publication checks and wants an explicit decision about where those tests should run. The operator recalls checks taking roughly two and five minutes before the change, then an apparent hang approaching two hours. These are recollections to reconcile with retained run timestamps, not newly measured durations. The operator's wording that all tests were moved is a description of the experience; establish the actual selected test set and whether execution was added, moved, or duplicated before drawing a technical conclusion.

Assess local development tests, local publication gates, and GitHub checks as parts of one testing design. Explain the appropriate placement and prerequisites of each test class, termination and child-cleanup behavior, and how failures reach the operator. Investigate whether the change was justified and verified before being included in publication. Adding timeouts or making the sweep opt-in contains the hang but does not by itself settle test placement, coverage, or the underlying defect. Do not infer from this concern that all CI testing should be removed.

## Time, retries, and expanding scope

The operator described roughly eight hours of hash, pin, and test troubleshooting, followed by prolonged GitHub-access attempts involving many retries. These are operator-reported estimates, not independently measured timings. The review should explain why the work expanded, where retries ceased producing useful information, and which decisions could have prevented another prolonged cycle. The desired result includes process improvement and correction of real errors, not another unbounded investigation.

The operator estimated twenty or thirty attempts across two or three hours to establish GitHub access, with repeated impressions that the setup should work but no dependable write capability. Reconcile those estimates with session evidence where available; do not substitute the number of retries visible in one report for the entire experience.

## Continuity when an agent is unavailable

The operator moved work to Claude because Codex credits were exhausted. This made cross-agent continuity a practical requirement rather than an optional experiment. Examine whether handoffs carried verified state, environment limitations, outstanding defects, and the exact next action clearly enough to avoid repeating failed approaches or treating stale instructions as current. The desired workflow should remain understandable when the preferred agent is temporarily unavailable.

## Agent guidance and publication procedure

The operator is concerned about guidance spread across `AGENTS.md`, `CLAUDE.md`, linked procedures, and the branch/PR process. Review the effective instruction path, conflicting or duplicated requirements, environment assumptions, and what each publication result actually certifies. Determine whether agents followed the guidance and whether following it would itself produce a reliable, understandable workflow. Propose changes only after examining the live owners and incident evidence.

The operator specifically questioned how publication could be allowed while so many problems remained, and asked whether lessons from these incidents must be built back into the procedures. Assess both enforcement and communication: which unresolved failures were admitted, on what authority, and whether the operator could understand what the merge recommendation did and did not establish. Root-cause analysis should cover the process failures as well as the individual test defects.

## Concurrent work and operator-initiated publication

The operator reports sometimes initiating a commit or push through Codex while agents are still running and writing files, because many changes have accumulated. The operator asks whether this practice could contribute to incomplete or inconsistent published states. Treat this as a workflow hypothesis to investigate, not an admission of fault or a demonstrated cause of the incidents. Examine the actual staging, validation, commit, and push sequence where evidence is available, including whether related edits were still in progress and whether the validated state matched what was committed.

The operator clarified that during the period under review, Codex was used only to initiate commits or pushes because its credits were exhausted; it was not simultaneously doing development work. The operator watched changed files in VS Code and returned to Codex to commit or push when many changes accumulated. Claude work may still have been running at those times. Do not conflate this reported publication overlap with the separate prospective concern about using both agents for development concurrently. Verify the relevant sequence from evidence before attributing a failure to overlapping activity.

The operator expects to use Claude and Codex concurrently in the same repository and wants a practical coordination process. Candidate approaches include separate task ownership, avoiding overlapping file edits, explicit coordination for shared files, and a stable publication handoff. Evaluate these against the existing shared-checkout workflow rather than assuming that concurrent work itself is invalid. Distinguish agents modifying files from agents only reading or running checks, and establish what coordination is needed before publication.

Direct communication between Claude and Codex is a desirable possible improvement, not an established capability or an authorized integration project. Assess whether it is feasible and useful compared with simpler shared ownership and handoff records. The objective is reliable parallel work with understandable publication boundaries, not coordination machinery for its own sake.

## Whether Git worktrees fit the workflow

**Current disposition — Rejected, September 8, 2026.** The operator rejects additional linked worktrees for this project: temporary/task-managed, permanent and teaching/evaluation experiments. Use the existing local checkout. The [operating decision](../../../op/git/git-github-operating-guide.md#283-how-we-would-evaluate-a-worktree-workflow) supersedes the earlier reopened suitability question and evaluation permission. This is a workflow decision, not proof that Git is defective or a retrospective attribution of the earlier difficulty. Preserve pre-existing state and its safeguards; no deletion or migration is authorized.

The earlier question concerned a prior unsatisfactory attempt, visibility of changes, branch/shared-history relationships, runtime data, test environments and integration effort. Those concerns remain historical context in this record and the [lesson](worktree-learning-and-experiment.md); they are not a pending experiment or adoption task.

## Meaning and suitability of the last touch rule

The operator recalls something called the "last touch rule" and vaguely remembers adopting it during a conflict. The operator requests an explanation of what it means and an assessment of whether it is appropriate. Locate the actual rule, its original decision context, scope, and current consumers before interpreting it. In particular, do not assume from the phrase alone that it means last-writer-wins conflict resolution, file ownership, or attribution of a hash mismatch to the most recent edit. Determine whether it remains active or has been superseded, explain its consequences with a concrete example, and assess whether it should be retained, clarified, or replaced. The operator's recollection is a lead, not proof of the rule's wording or authority; no rule changes are authorized by this capture.

## Squash-and-merge policy

The operator uses squash and merge and recalls a possible objection from Claude suggesting that it may be an unsuitable choice. The exact objection has not yet been identified; do not treat the recollection as an established technical finding. Locate the statement if available and assess the merge strategy against the repository's actual needs: traceability of individual changes, first-mismatch attribution, evidence pins tied to commits or blobs, retention of reviewed branch history, and safe branch rollover. Explain the tradeoffs and determine whether the problem lies in the merge strategy, in assumptions made by tools or procedures, or elsewhere. Capturing this question does not authorize changing merge settings or rewriting history.

## Claude GitHub access

The operator wants Claude's GitHub access resolved later. Distinguish local Git, remote Git operations, command-line access, connector availability, authentication, and authorization for specific writes. Repeated successful login or read operations do not settle the missing write capability. No credential or access configuration changes have been authorized by this concerns capture.

## Working across both repositories

The operator wants to assess a Codex project arrangement at the `vibe` level that can work with both Architrino and MyLists, analogous to the arrangement attempted in Claude. Feasibility and effects on repository routing, permissions, and instructions remain to be checked. Project configuration is a later topic, not an established capability or an implementation decision.

The priority of this setup work relative to defect and process repair is undecided. The operator reports having entered a project description in Claude and wants it reviewed and revised, then reused or adapted for Codex so both environments describe the intended workspace consistently. Obtain the actual description before assessing it; it has not been supplied in this task.

The operator reports moving conversations from the old Claude project to the new one and wants to determine whether existing Codex tasks can similarly move to the proposed parent-folder project. If direct migration is unavailable, assess a continuation handoff that preserves each task's context and resumes it in the new project. Do not assume that changing a project folder automatically moves tasks or changes their filesystem access. The spoken reference to both repositories is interpreted from the established context as Architrino and MyLists; Codex is the application hosting the proposed project.

## Evidence collection and review experience

Preserve the original conversations and received reports. Conversations may be renamed with stable numbers to aid identification. Subsequent reports should be written to assigned files instead of producing enormous chat responses. During voice discussion, present lengthy prompts and reports on screen without reading them aloud. Keep the operator's additional written questions available for later intake; the current document captures only concerns already expressed in this conversation.

The operator asked to give the full context before settling the plan and objected to premature claims of inspecting Claude's separate access problem. Distinguish available conversation context from actual access to another session or application. Let the operator finish supplying context; do not fill gaps with assumed observations. Preserve post-report responses and their coverage limitations alongside the reports, as explicitly requested.

## Desired outcome

A comprehensible, evidence-backed account of what happened; a prioritized plan to fix genuine defects and any damage introduced by attempted repairs; and testing and publication processes whose outcomes the operator can trust. Begin with diagnosis and discussion before broad repairs. Keep unresolved evidence gaps visible and avoid treating an agent's confidence, a long report, or a green subset of checks as a substitute for verification.

At the end of intake the operator requested a complete synthesis and plan that distinguishes importance from dependency order, so important feasible work happens early. The [proposed plan](review-and-repair-plan.md) records that ordering without treating the request for a plan as approval of every proposed repair.
