# Priorities

This directory holds the repo's developer-facing priority material.

Use it for live workstream priority lists and for supporting guidance on priority-list structure, triage practice, ranking conventions, and related developer workflow.

Current priority staging should favor core geometrical theory closure: master-equation work, potential/action proof programs, certified branch geometry, simulations that discipline the equations, $A_0$ continuation, mass-map derivation, nested shell braid causal closure, Lorentz/effective-metric recovery, photon closure, and Noether sea constitutive response. Stage broad prose, app, presentation, or coordination items here only when they directly serve that theory stack or the operator/developer explicitly selects them.

For top-six workstream sessions, begin from the current minimum evidence-object table in [aaa-work-threads/closure-join-matrix.md](aaa-work-threads/closure-join-matrix.md#top-six-minimum-evidence-objects-2026-06-28), then use the owning packet for the actual pass/fail fields.


Use `operations/` for repo-wide deployment, hosting, release, cost, reliability, browser performance, and user-growth operations that are not specific to one app or solver proof lane.

Use `dormant-deferred/aaa-journey/priorities.md` for priority-stage reconstruction of the legacy Architrino archive's ideation sequence, origin-history notes, historical perspective-commentary staging, seminal realization clusters, promotion routing, and legacy-to-current terminology migrations.

## Priority-Doc Maintenance Pattern

The current preferred style for live priority docs is:

- name the main live tracker `priorities.md` in each active priority workstream directory;
- keep priorities concise and code-verified;
- use `Current` plus `Objective` rather than long migration diaries;
- keep readable architecture notes, equation explanations, comparison matrices, conceptual maps, provisional insights, and draft corpus-promotable text in the sibling `brainstorming.md` file by default;
- keep chronological agent status, proof-attempt notes, checker narratives, handoffs, failed paths, and communication updates in the sibling `work-log.md` file;
- every immediate priority workstream directory should carry a `work-log.md`, even when it only contains the standard purpose note;
- let the priority/tracking document reference `brainstorming.md`, `work-log.md`, and focused support files instead of embedding explanation-first material, long status logs, or detailed proof packets in the active queue, routing, ranking, blocker, or promotion sections;
- keep detailed proof packets, certificates, app specs, and requirement notes in focused sibling files when their structure deserves more than a dated log entry;
- rerank based on real code state, not stale historical intent;
- if a task is done, remove it and renumber the list.
- keep history only when it supports active triage, auditability, or a current proof/certificate decision; otherwise rely on GitHub and git history.

## Discuss-First Handling

`Discuss-first` is a live priority status, not a report-only disposition. When an agent identifies a theory leap, terminology decision, broad ontology claim, or other item that requires operator judgment before implementation:

- add or update a compact task in the owning workstream's `priorities.md` with status `discussion-scoped`;
- add it to the canonical [Operator Discussion Queue](aaa-work-threads/priorities.md#operator-discussion-queue) when the decision crosses workstreams or is easy to miss;
- surface one unresolved discussion item directly to the operator in later substantive theory closeouts until it is accepted, rejected, or explicitly deferred with a revisit condition;
- do not launch implementation agents or promote the claim while its status remains `discussion-scoped`;
- after the operator decides, record the decision in the owning tracker, remove the row from the cross-workstream discussion queue, and renumber any following queue items when applicable.
