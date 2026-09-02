# Priorities

This directory holds the repo's developer-facing priority material.

Use it for live workstream priority lists and for supporting guidance on priority-list structure, triage practice, ranking conventions, and related developer workflow.

Current priority staging should favor core geometrical theory closure: master-equation work, potential/action proof programs, certified branch geometry, simulations that discipline the equations, $A_0$ continuation, mass-map derivation, nested shell braid causal closure, Lorentz/effective-metric recovery, photon closure, and Noether sea constitutive response. Stage broad prose, app, presentation, or coordination items here only when they directly serve that theory stack or the operator/developer explicitly selects them.

For top-six workstream sessions, begin from the current minimum evidence-object table in [aaa-work-threads/closure-join-matrix.md](aaa-work-threads/closure-join-matrix.md#top-six-minimum-evidence-objects-2026-07-16), then use the owning packet for the actual pass/fail fields.


Use `aaa-operations/` for repo-wide deployment, hosting, release, cost, reliability, browser performance, and user-growth operations that are not specific to one app or solver proof lane.

Use the operations [Simulation Protocol Routing Index](../op/simulation-protocol-routing-index.md) to assign preserved simulation definitions to EOM, scientific-campaign, and proof-acceptance owners. The legacy `app-simulation/` directory is a compatibility location outside the priority-owner and product-application inventories.

Use `dormant-deferred/aaa-journey/priorities.md` for priority-stage reconstruction of the legacy Architrino archive's ideation sequence, origin-history notes, historical perspective-commentary staging, seminal realization clusters, promotion routing, and legacy-to-current terminology migrations.

## Mapping Workstreams

Start with the [Mapping overview](mapping/README.md) for the program's purpose, directory map, benchmark explanation, and methodology. `mapping/` is the shared documentation entry point, not a ranked workstream or parent queue.

Use the `mapping-` directory prefix for equation mapping, benchmark mapping, domain recovery, and cross-domain theory-bridge assessment. Keep these directories as siblings directly under `reference/priorities/`; the prefix groups related work without creating a parent queue or merging ownership. Directory names have no `.md` extension; the standard tracker, queue, brainstorming, and log filenames remain unchanged.

The [directory map](mapping/README.md#how-the-directories-are-organized) identifies the equation, benchmark, domain, and cross-domain assessment owners. Their responsibilities remain distinct under the [Shared Equation And Mapping Architecture](mapping/mapping-method.md#mapping-program-routing).

The [shared bidirectional mapping method](mapping/mapping-method.md#bidirectional-mapping-and-mathematical-reframing) develops native derivations toward established physics and uses established results as reverse constraints on the native construction. Its goal is to make the two ends meet and develop a mathematical language grounded in the derived structures that can reframe mapped domains while recovering their tested behavior.

The prefix changes neither rank, evidence grade, nor active or deferred status. Foundational law and braid programs, cross-workstream mathematical support, speculative assembly candidates, source acquisition, editorial programs, and `app-*` implementation owners remain separate. Parked work remains under `dormant-deferred/` until an explicit reactivation decision.

## Priority-Doc Maintenance Pattern

The current preferred style for live priority docs is:

- name the main live tracker `priorities.md` in each active priority workstream directory;
- give every active priority workstream directory a sibling `work-queue.md`;
- keep `priorities.md` concise and code-verified as the strategic objective, current state, ownership, scoring metadata, routing, blocker, and promotion surface;
- keep executable task rows only in `work-queue.md`, including the locally ranked next-object order, lifecycle state, request and acceptance boundary, evidence or blocker, and completion condition;
- use `Queued`, `In progress`, `Awaiting verification`, `Verified`, `Superseded`, or `Withdrawn` as queue lifecycle states; keep blocked or intentionally postponed rows in a clearly labeled deferred/blocked section without presenting them as executable now;
- use `Current` plus `Objective` rather than long migration diaries;
- keep readable architecture notes, equation explanations, comparison matrices, conceptual maps, provisional insights, and draft corpus-promotable text in the sibling `brainstorming.md` file by default;
- keep chronological agent status, proof-attempt notes, checker narratives, handoffs, failed paths, and communication updates in the sibling `work-log.md` file;
- every immediate priority workstream directory should carry a `work-log.md`, even when it only contains the standard purpose note;
- let `priorities.md` reference `work-queue.md`, `brainstorming.md`, `work-log.md`, and focused support files instead of embedding task execution, explanation-first material, long status logs, or detailed proof packets;
- promote a brainstorming item into `work-queue.md` only when it has become an accepted, testable task, and remove the promoted task from `brainstorming.md` in the same edit;
- keep detailed proof packets, certificates, app specs, and requirement notes in focused sibling files when their structure deserves more than a dated log entry;
- score each live queue item as its own next unresolved object against remaining value and remaining cost, then sort the bucket so local item `1` has the highest current marginal ROI;
- use the bucket's local item `1` as its scored row in `aaa-work-threads/priorities.md`, then sort those bucket winners globally so global rank `1` has the highest current marginal ROI;
- after any score change, rerank and renumber both the affected bucket and the unified table; validate the unified arithmetic, sort order, and mirrored tracker metadata with `node scripts/validate-priority-ranking.mjs`;
- rerank based on real code state, not stale historical intent;
- if a task is done, record any durable result in the work log or focused evidence packet, remove it from the live queue, and renumber the list.
- keep history only when it supports active triage, auditability, or a current proof/certificate decision; otherwise rely on GitHub and git history.

## Discuss-First Handling

`Discuss-first` is a live priority status, not a report-only disposition. When an agent identifies a theory leap, terminology decision, broad ontology claim, or other item that requires operator judgment before implementation:

- add or update a compact task in the owning workstream's `work-queue.md` with status `discussion-scoped`;
- add it to the canonical [Operator Discussion Queue](aaa-work-threads/priorities.md#operator-discussion-queue) when the decision crosses workstreams or is easy to miss;
- surface one unresolved discussion item directly to the operator in later substantive theory closeouts until it is accepted, rejected, or explicitly deferred with a revisit condition;
- do not launch implementation agents or promote the claim while its status remains `discussion-scoped`;
- after the operator decides, record the decision in the owning strategy tracker or work log, remove the row from the cross-workstream discussion queue, and renumber any following queue items when applicable.
