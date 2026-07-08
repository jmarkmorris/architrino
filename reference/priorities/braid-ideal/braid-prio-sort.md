# Braid Priority Sort And Cleanup Plan

Claim level. Priority-only control packet, 2026-07-08. This plan schedules a cleanup and reorganization pass across the Noether braid priority lanes. It does not retain any branch, move any claim level, promote any corpus material by itself, or change any Proof ID disposition. Every move it authorizes is a reorganization move whose text travels with its existing labels.

## Closure Goal

Bring the eight Noether braid priority lanes, the six open agent threads (`o4`, `o5`, `o6`, `o7`, `o8`, `p10`), and the six saved braid prompts into one coherent, taxonomy-aligned priority surface — with each open task routed to its correct lane, each `brainstorming.md` organized and de-duplicated, and every corpus-ready result promoted at its declared claim level — without disturbing any live proof program or weakening any claim.

## How To Read This Plan

This is the control surface for the sort. Work the phases in order. Each phase names its inputs, the concrete action, the guardrail it must respect, and its definition of done. Operator-decision checkpoints are marked **[OP]** and carry a recommended default so an agent can proceed if the operator does not override. Dated status for each phase goes in this lane's `work-log.md`; provisional taxonomy ideas surfaced during the sort go in this lane's `brainstorming.md`.

---

## 1. Situation Snapshot

The braid effort currently spans three kinds of location under `reference/priorities/`:

- **Eight braid lanes**: `braid-ideal`, `braid-angular-momentum-spin`, `braid-doubling-frequency-lock`, `braid-geometry-export-bridge`, `braid-mass-response-map`, `braid-nested-shell-causal-closure`, `braid-retained-branch-closure`, and `braid-taxonomy`.
- **The cross-cutting master queue** in `aaa-work-threads/` (`priorities.md` ~160 KB, `inventory.md`, `closure-join-matrix.md`), which tracks the top-six workstreams and the minimum-evidence-object table.
- **The shared proof lane** in `proof-programs/` (`breather-proof/`, `planar-bridge-closure/`).

Four structural problems motivate the sort:

1. **Lane overlap and taxonomy drift.** The lanes predate the 2026-07-07 braid-scene reorganization, which fixed the reader-facing reading order: concept → neutral braid → braid recovery requirements → braid mathematics → **symmetric shell braid (featured realization, `SH-0` class)** → alternatives (nested shell braid, doubling-frequency resonance lock, configuration space) → bookkeeping (taxonomy, proof map). Several lanes now map cleanly onto that order; some are dormant or duplicate.
2. **File-role hygiene.** The maintenance pattern is: `priorities.md` = concise ranked queue, `brainstorming.md` = provisional insight and draft promotable prose, `work-log.md` = dated status and failed-path notes. In practice some brainstorm-grade ideas were entered into `work-log.md` files, and the `braid-ideal` `brainstorming.md` (~214 KB) and `work-log.md` (~253 KB) have grown past the point of easy triage.
3. **Proof-cert sprawl.** `braid-geometry-export-bridge` holds ~100 `octahedral-fold-aware-cross-binary-*` jet-coefficient and tail-bound certificate files driving a `priorities.md` to ~402 KB. This is a real live proof program, not cruft, but most of its files are closed certificates behind an advancing tail-bound frontier.
4. **Uncaptured intake.** Six open agent threads each carry a proposed next step, and six saved prompts target braid work. None of this is yet reconciled against the lane queues, so the same object risks being worked twice or lost.

---

## 2. Operator-Decision Checkpoints

Resolve these before or during Phase 4; each has a recommended default so the sort can proceed unattended if needed.

- **[OP-1] Lane structure.** *Recommended default: hub-and-mapped-lanes.* Make `braid-ideal` the top-level braid index/hub, keep the active proof-program lanes intact, and fold only dormant/duplicate lanes and misfiled content into their taxonomy home. Rationale: this preserves disjoint write-ownership so the `o4`–`o8`/`p10` threads keep non-colliding lanes, and it avoids rewriting the relative links inside the proof-cert chains. Alternatives: (b) collapse all eight lanes under `braid-ideal/` with subfolders (simplest top view, highest link-breakage risk); (c) organize strictly in place (hygiene only, no lane moves).
- **[OP-2] Proof-cert archiving.** *Recommended default: archive-completed, keep-active.* Move closed/superseded `octahedral-fold-aware-*` certificate files into a labeled archive subfolder, keep the live tail-bound frontier files in place, and slim `braid-geometry-export-bridge/priorities.md` to the active frontier plus an archive index. Fully reversible in git. Alternatives: (b) keep every file in place, re-index only; (c) defer the archive call to a later per-lane checkpoint.
- **[OP-3] Brainstorm consolidation scope.** *Recommended default: organize-in-place with a shared index.* Keep each lane's `brainstorming.md` in its lane, but add a top-of-file table of contents and split the oversized `braid-ideal/brainstorming.md` into dated sections, with a single index in `braid-ideal` pointing at every lane's brainstorm. Alternative: physically merge all brainstorm files into one `braid-ideal/brainstorming.md` (one place to read, loses lane locality).

---

## 3. Target Architecture (Under OP-1 Default)

`braid-ideal` becomes the braid **hub**: it carries the top-level braid index, this sort plan, the active `SH-0`/`SH-0-sea`/held-release working queue, and the cross-lane pointer table. The other lanes keep their proof-program identity and map to the taxonomy reading order as follows.

| Lane | Taxonomy role | Disposition under the sort |
| --- | --- | --- |
| `braid-ideal` | Featured-realization working lane + braid hub | Becomes the index/hub; keeps `SH-0`, `SH-0-sea`, held-release sweep, six-point lemma, fold-crossing charts. |
| `braid-retained-branch-closure` | Base + featured + alternative proof home (`neutral-braid/`, `shell-braid/`, `nested-shell-braid/` subdirs) | Keep intact; it owns the neutral-braid and shell-braid certificate chains, the promotion policy, and the source triage. Confirm it stays the certificate home rather than `braid-ideal`. |
| `braid-mass-response-map` | Braid recovery requirements → mass map / Noether sea response | Keep intact; owns `a0-reduced-branch-certificate`, mass-trace chain, pressure-response closure. |
| `braid-angular-momentum-spin` | Braid mathematics → spin / angular momentum export | Keep intact; owns spinor-holonomy and six-point spin material. Reconcile its six-point content with `braid-ideal`'s six-point lemma to avoid a split owner. |
| `braid-geometry-export-bridge` | Braid mathematics → geometry export / octahedral fold analysis | Keep intact as a proof lane; apply OP-2 archiving. |
| `braid-nested-shell-causal-closure` | Alternatives → nested shell braid | Keep as the nested-shell alternative lane; reconcile against the `nested-shell-braid/` subdir in retained-branch-closure so nested material has one owner. |
| `braid-doubling-frequency-lock` | Alternatives → doubling-frequency resonance lock | Small lane; keep or fold into the nested/alternatives grouping per OP-1. |
| `braid-taxonomy` | Bookkeeping → taxonomy, proof-ID crosswalk | Keep as the migration-control and proof-ID routing lane; it already governs braid-document cleanup via `proof-id-crosswalk.md`. |
| `aaa-work-threads` | Cross-cutting master queue | Not a braid lane; keep, but ensure braid rows there point to the owning braid lane rather than duplicating tasks. |

The single most important reconciliation is **nested shell braid** and **six-point** material, each of which currently has two candidate owners. The sort must pick one owner per object and leave a pointer, not a copy, at the other site.

---

## 4. Guardrails (Non-Negotiable)

- **Do not break live proof programs.** Treat these chains as read-mostly; reorganize only their indexing and never their internal cross-links without immediate repair: the `braid-geometry-export-bridge` octahedral jet/tail-bound chain (including the `h39-shared-domain-*` series engine and the `root-tangent-cauchy-majorant-tail-lemma`); the `braid-retained-branch-closure/shell-braid` `bounded-speed-factor-*` and `support-complete-m3-*` certificate chains; the `neutral-braid` master-retention / all-pairs-root-ledger chain; `braid-mass-response-map/a0-reduced-branch-certificate` and the mass-trace chain; the `braid-ideal` `delayed-escape-certificate-lemma-proof-packet`, `six-point-symmetry-invariant-lemma`, and `sh-run-matrix`; and `proof-programs/breather-proof` and `planar-bridge-closure`.
- **Never weaken a claim level in a move.** Text moves with its `theorem-result` / `theorem-target` / `effective-summary` / `speculation-comparison` label and its first-failure status intact. No move implies retention. No Proof ID disposition changes.
- **Corpus self-containment.** Any promotion into `content/markdown/aaa` must restate needed substance and must not link back to `reference/priorities`. Follow `braid-retained-branch-closure/promotion-policy-into-corpus.md`.
- **Preserve relative links.** When a file moves, repair every inbound and outbound relative link in the same commit, then run `node scripts/validate-content.mjs --check --strict` and `node scripts/build-scene-graph.mjs --check --strict`. Do not run generator `--write` except in the final branch/PR flow (`reference/op/codex-pr-branch.md`).
- **Git and sandbox mechanics.** A dirty working tree is normal ambient multi-agent state; scope the write set to files this sort owns. In a Cowork sandbox, `device_bash` can `mv` and edit but cannot `rm` inside the tree and cannot unlink `.git/index.lock`; do deletions by moving files into a `_to_delete/` folder for the operator, and hand the operator ready-to-run `git add`/`commit` commands instead of committing from the sandbox.
- **No new gates.** Per the theory-focus policy, prefer consolidating validators, ledgers, and caveats over adding them. This sort removes and merges structure; it does not mint new gate files.

---

## 5. Step-By-Step Phases

### Phase 0 — Freeze and snapshot
Inputs: current working tree. Action: record `git status --short --untracked-files=all`; note the working branch; capture a one-line inventory of every braid lane's `priorities.md` / `brainstorming.md` / `work-log.md` sizes and last-modified dates into this lane's `work-log.md` as the pre-sort baseline. Guardrail: no file moves yet. Done when the baseline snapshot is logged and the branch is confirmed.

### Phase 1 — Intake capture and dedupe
Inputs: the six open threads (`o4`, `o5`, `o6`, `o7`, `o8`, `p10`) and their proposed next steps; the six saved braid prompts (operator to paste). Action: create one temporary intake ledger, `braid-ideal/braid-intake-ledger.md`, with one row per proposed step or prompt: source, one-line objective, target lane, claim level, whether it duplicates an existing queued task, and a keep/merge/drop decision. Ask each thread for its `Closure goal:` line and next concrete object; do not start any thread's work here. Guardrail: intake is classification only. Done when every thread and every prompt has exactly one row and a routing decision.

### Phase 2 — Lane hygiene (file-role separation)
Inputs: each lane's three role files. Action: for every lane, move brainstorm-grade ideas that were entered into `work-log.md` into that lane's `brainstorming.md`; keep dated status, checker narratives, and failed-path notes in `work-log.md`; keep only the concise ranked queue in `priorities.md`. Ensure every immediate lane has a `work-log.md` even if it only holds the standard purpose note. Guardrail: this is content relocation within a lane, not a claim change; certificate/packet files are untouched. Done when each lane's three files hold only their designated content type.

### Phase 3 — Brainstorm organization (OP-3)
Inputs: all lane `brainstorming.md` files, especially `braid-ideal/brainstorming.md` (~214 KB). Action: add a dated table-of-contents header to each; split the `braid-ideal` brainstorm into clearly headed dated sections; create a single braid brainstorm index (a short section in `braid-ideal/brainstorming.md` or a sibling `braid-ideal/braid-brainstorm-index.md`) linking every lane's brainstorm. Mark any idea that has matured into an executable object for promotion to a packet or the queue. Guardrail: do not delete ideas; downgrade exuberant wording to its strongest defensible level only when promoting, not in place. Done when every brainstorm file is navigable and the index resolves.

### Phase 4 — Lane sort and routing (OP-1, OP-2)
Inputs: the Phase 1 intake ledger; the per-lane disposition table in §3. Action: route each open `priorities.md` task to its taxonomy-home lane; resolve the two dual-owner objects (nested shell braid; six-point) to a single owner each with a pointer left behind; fold dormant/duplicate lanes per OP-1; apply the OP-2 archive to the octahedral certificate set (move closed certs to `braid-geometry-export-bridge/_archive/` or the existing `braid-migration-archive.md` pattern, slim `priorities.md` to the live frontier plus an archive index). Renumber each queue after removals. Guardrail: repair all relative links in the same commit; run the two `--check` commands; keep proof chains intact. Done when every lane's `priorities.md` is a ranked, current queue with no orphaned or duplicated task and all checks pass.

### Phase 5 — Corpus promotion pass
Inputs: material flagged corpus-ready in Phases 2–4; `promotion-policy-into-corpus.md`; `braid-taxonomy/proof-id-crosswalk.md`. Action: for each candidate, evaluate the promotion predicate (declared claim level ∧ prerequisites satisfied ∧ self-contained language ∧ no overclaim); promote only reader-safe `theorem-target`, `effective-summary`, or closed `theorem-result` material into the correct `content/markdown/aaa/noether-braid/` chapter, honoring the open-factory framing (readers may see the proof program, its targets, first-failure statuses, and scoped negatives). After each promotion, update the source packet's promotion status line, corpus destination, promoted claim level, remaining first-failure status, and remove the completed queue item. Guardrail: no retained-branch language until a certificate closes on one live ledger; no corpus→priority links. Done when each promoted item carries its status trail and no overclaim survives review.

### Phase 6 — Validation and regeneration
Inputs: the full edited set. Action: run `git diff --check`; `node scripts/validate-content.mjs --check --strict`; `node scripts/build-scene-graph.mjs --check --strict`; the receiver-normal, frequency-triplet, and polarity drift checks named in the commit-audit hooks. If scene-graph or textbook drift is reported, report the exact `--write` command needed rather than running it, unless the operator has authorized the final branch/PR flow. Done when the check set is clean or the required `--write` commands are reported.

### Phase 7 — Close-out and handoff
Inputs: the completed sort. Action: update the `braid-ideal` hub index and the `braid-taxonomy` routing ledger to reflect the new lane map; retire the temporary intake ledger into `work-log.md` once its rows are all routed; write a project-memory note recording the new braid lane map and any dual-owner resolutions so future sessions do not re-litigate them; hand the operator a ready-to-run commit command listing the scoped write set. Done when the hub index is current and the handoff command is delivered.

---

## 6. Execution Model (Multi-Agent, Disjoint Ownership)

Assign one agent per non-overlapping lane group so writes never collide, matching the existing thread set:

- **Hub + intake + brainstorm index** (`braid-ideal` role files, intake ledger): one thread; run Phases 1–3 first because later phases depend on the routing decisions.
- **Retained-branch + nested reconciliation** (`braid-retained-branch-closure`, `braid-nested-shell-causal-closure`, `braid-doubling-frequency-lock`): one thread; owns the base/featured/alternative certificate homes and the nested dual-owner resolution.
- **Geometry-export archive** (`braid-geometry-export-bridge`): one thread; owns OP-2.
- **Mass-response + angular-momentum** (`braid-mass-response-map`, `braid-angular-momentum-spin`): one thread; owns the six-point dual-owner resolution.
- **Taxonomy + promotion** (`braid-taxonomy`, corpus promotion): one thread; runs Phase 5 after the lane sorts land.

Give each thread a file-ownership boundary, a minimum artifact threshold, and a read-only fallback so it continues past the first blocker. Reserve this hub thread for integration, conflict resolution, and the final commit command. Map the six open threads (`o4`–`o8`, `p10`) onto these groups during Phase 1 based on what each is already touching.

---

## 7. Risks And Rollback

- **Link breakage from moves.** Mitigated by same-commit link repair plus the two `--check` gates; every move is reversible in git.
- **Dual-owner drift.** If nested-shell or six-point material is copied rather than pointer-linked, the two owners diverge; the sort must leave a pointer, never a duplicate.
- **Accidental claim inflation on promotion.** Mitigated by running each promotion through the promotion predicate and keeping the first-failure status attached.
- **Sandbox deletion limits.** `device_bash` cannot `rm`; emptied files go to `_to_delete/` for the operator, so a fully "clean" tree may need one operator deletion pass at the end.

---

## 8. Follow-Up Prompt

```text
Closure goal:
Execute Phase 1 of the braid priority sort: capture the six open thread next-steps and the six saved braid prompts into braid-ideal/braid-intake-ledger.md, one row each, with target lane, claim level, duplicate check, and keep/merge/drop decision.

Task:
- Ask threads o4, o5, o6, o7, o8, p10 for their current Closure goal line and next concrete object.
- Read the six saved braid prompts (operator will paste).
- Build the intake ledger with one row per item and a routing decision against the §3 lane map.
- Do not start any thread's proof or corpus work; classification only.

Scope:
- Primary file: reference/priorities/braid-ideal/braid-intake-ledger.md.
- Do not move certificate/packet files or change any claim level in this phase.

Expected output:
- The intake ledger with every thread and prompt routed, plus a short list of detected duplicates against existing lane queues.
```

Closure goal: approve or amend the three operator checkpoints (§2), then run Phase 0–1 to freeze the tree and capture intake before any lane moves.
