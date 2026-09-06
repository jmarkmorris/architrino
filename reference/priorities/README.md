# Priorities

This directory holds the repo's developer-facing priority material.

Use it for live workstream priority lists and for supporting guidance on priority-list structure, triage practice, ranking conventions, and related developer workflow.

Current priority staging should favor core geometrical theory closure: master-equation work, potential/action proof programs, certified branch geometry, simulations that discipline the equations, $A_0$ continuation, mass-map derivation, nested shell braid causal closure, Lorentz/effective-metric recovery, photon closure, and Noether sea constitutive response. Stage broad prose, app, presentation, or coordination items here only when they directly serve that theory stack or the operator/developer explicitly selects them.

For top-six workstream sessions, begin from the current minimum evidence-object table in [aaa-work-threads/closure-join-matrix.md](aaa-work-threads/analysis/closure-join-matrix.md#top-six-minimum-evidence-objects-2026-07-26), then use the owning packet for the actual pass/fail fields.


Use `aaa-operations/` for repo-wide deployment, hosting, release, cost, reliability, browser performance, and user-growth operations that are not specific to one app or solver proof lane.

Use `aaa-corpus-rewrite/` for the editorial campaign bringing `content/markdown/aaa` into line with the [academic style guide](../../content/markdown/aaa/archie/academic-style-guide.md). It changes how the corpus explains and never what it claims; a conversion that would alter a claim stops and routes to the owning theory lane.

The [operator-document style conversion ledger](operator-document-style-conversion-ledger.md) records the separate edition 1.0 disposition of every Markdown file in the measured `reference/priorities/` baseline. It is an editorial accounting surface, not a priority owner, queue, or scientific authority.

Use the operations [Simulation Protocol Routing Index](../op/simulation-protocol-routing-index.md) to assign preserved simulation definitions to EOM, scientific-campaign, and proof-acceptance owners. The legacy `app-simulation/` directory is a compatibility location outside the priority-owner and product-application inventories.

Use `dormant-deferred/aaa-journey/priorities.md` for priority-stage reconstruction of the legacy Architrino archive's ideation sequence, origin-history notes, historical perspective-commentary staging, seminal realization clusters, promotion routing, and legacy-to-current terminology migrations.

## Mapping Workstreams

Start with the [Mapping overview](mapping/README.md) for the program's purpose, directory map, benchmark explanation, and methodology. `mapping/` is the shared documentation entry point, not a ranked workstream or parent queue.

Use the `mapping-` directory prefix for equation mapping, benchmark mapping, domain recovery, and cross-domain theory-bridge assessment. Keep these directories as siblings directly under `reference/priorities/`; the prefix groups related work without creating a parent queue or merging ownership. Directory names have no `.md` extension; the standard tracker, queue, brainstorming, and log filenames remain unchanged.

The [directory map](mapping/README.md#how-the-directories-are-organized) identifies the equation, benchmark, domain, and cross-domain assessment owners. Their responsibilities remain distinct under the [Shared Equation And Mapping Architecture](mapping/contracts/mapping-method.md#mapping-program-routing).

The [shared bidirectional mapping method](mapping/contracts/mapping-method.md#bidirectional-mapping-and-mathematical-reframing) develops native derivations toward established physics and uses established results as reverse constraints on the native construction. Its goal is to make the two ends meet and develop a mathematical language grounded in the derived structures that can reframe mapped domains while recovering their tested behavior.

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
- keep detailed proof packets, certificates, app specs, and requirement notes in focused supporting files when their structure deserves more than a dated log entry, filed under the [workstream directory layout](#workstream-directory-layout) rather than accumulating at the top level;
- score each live queue item as its own next unresolved object against remaining value and remaining cost, then sort the bucket so local item `1` has the highest current marginal ROI;
- use the bucket's local item `1` as its scored row in `aaa-work-threads/priorities.md`, then sort those bucket winners globally so global rank `1` has the highest current marginal ROI;
- after any score change, rerank and renumber both the affected bucket and the unified table; validate the unified arithmetic, sort order, and mirrored tracker metadata with `node scripts/validate-priority-ranking.mjs`;
- rerank based on real code state, not stale historical intent;
- if a task is done, record any durable result in the work log or focused evidence packet, remove it from the live queue, and renumber the list.
- keep history only when it supports active triage, auditability, or a current proof/certificate decision; otherwise rely on GitHub and git history.

## Workstream Directory Layout

The maintenance pattern above governs which document owns which material. This section governs where those documents sit, because a workstream that files every supporting document as a top-level sibling eventually presents the operator with a directory listing in which the live control surface is indistinguishable from years of superseded process records.

A workstream directory holds three tiers of material, and they are not interchangeable.

The **control surface** is `priorities.md`, `work-queue.md`, `brainstorming.md`, and `work-log.md`, plus a `README.md` where the lane needs orientation beyond its tracker. These always sit at the top level. They are what the operator and an arriving agent read first, and nothing else competes with them for that position.

**Durable subject owners** are the small number of documents that a reader returns to because they own a standing subject rather than a moment: a master registry, a settled decision, a live mathematics packet. These may sit at the top level, and `priorities.md` links them. Keep them few. A document earns this position by being the current answer to a question, not by being important when it was written.

Everything else is **supporting material**, and it is filed into a subdirectory:

| Subdirectory | Holds |
| --- | --- |
| `reviews/` | Dated specialist reviews, review responses, adjudications, and collations |
| `analysis/` | Theorem targets, proof packets, certificates, and lemma files |
| `evidence/` | Receipts, oracle outputs, measured records, and dated audits |
| `contracts/` | Versioned contract and policy artifacts, typically `.v1.json` |
| `campaigns/` | Campaign definitions, protocols, and predeclarations |
| `configurations/` | Enumerated configuration and candidate records |
| `benchmarks/` | Observation-facing benchmark documents, where recovering a named external result is itself the lane's subject |
| `decisions/` | Recorded operator dispositions, once a lane accumulates more than one |
| `archive/` | Superseded material retained for auditability |

Use only the subdirectories a workstream actually needs; an empty category is not created in advance. [`app-solver/`](app-solver/README.md) is the reference implementation of this layout, and [`braid-program/`](braid-program/README.md) applies it to a larger evidence body.

Filing a document into a subdirectory changes its location only. It does not change its claim grade, evidence status, lifecycle state, or authority, and it does not retire it. In particular, `archive/` means superseded, and moving a live document there is a disposition that belongs to the workstream owner, not to a filing pass.

When a workstream directory exceeds roughly twelve top-level files, treat that as the signal to file its supporting material rather than as a threshold to argue with. `node scripts/validate-priority-ranking.mjs` reports directories over that count.

Moving files has two consequences that a filing pass must handle in the same change. Relative links break, both the links inside the moved documents and the links pointing at them from elsewhere, so audit both directions and repair them before reporting the move complete. And the generated reference surface enumerates these paths, so a move leaves `content/generated/reference/reference-surface.v1.json` stale; report that drift with the regeneration command under the [generated-artifact rules](../../AGENTS.md#generated-artifacts) rather than running a generator write outside an authorized regeneration.

## Live Discussion Capture

Follow the [operator explanation standard](../op/operator-explanation-standard.md#live-discussion-and-priority-capture) for live capture of ideas discussed with the operator. Keep every substantive idea visible in the owning `priorities.md` through a readable current synthesis, disposition, and links to any fuller material. Organize it when captured, using the maintenance pattern above: fuller explanations in their existing subject owners, accepted executable tasks in `work-queue.md`, and chronology in `work-log.md`. The subject owner may be a procedure, design, analysis, or other working document outside the priority directory; link it from the tracker rather than duplicating its full content. Capture does not itself accept a task, strengthen a claim, change a score, or reactivate deferred work.

## Discuss-First Handling

`Discuss-first` is a live priority status, not a report-only disposition. When an agent identifies a theory leap, terminology decision, broad ontology claim, or other item that requires operator judgment before implementation:

- add or update a compact task in the owning workstream's `work-queue.md` with status `discussion-scoped`;
- add it to the canonical [Operator Discussion Queue](aaa-work-threads/priorities.md#operator-discussion-queue) when the decision crosses workstreams or is easy to miss;
- surface one unresolved discussion item directly to the operator in later substantive theory closeouts until it is accepted, rejected, or explicitly deferred with a revisit condition;
- do not launch implementation agents or promote the claim while its status remains `discussion-scoped`;
- after the operator decides, record the decision in the owning strategy tracker or work log, remove the row from the cross-workstream discussion queue, and renumber any following queue items when applicable.
