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

All three checkpoints are resolved by the operator (2026-07-08); the decisions are recorded here and are binding for the sort.

- **[OP-1 — approved] Lane structure: hub-and-mapped-lanes.** Make `braid-ideal` the top-level braid index/hub, keep the active proof-program lanes intact, and fold only dormant/duplicate lanes and misfiled content into their taxonomy home. This preserves disjoint write-ownership so the `o4`–`o8`/`p10` threads keep non-colliding lanes, and it avoids rewriting the relative links inside the proof-cert chains.
- **[OP-2 — decided] Proof-cert archiving: defer to a later per-lane checkpoint.** This sort does **not** archive the `braid-geometry-export-bridge` octahedral certificate set. In Phase 4 it re-indexes that lane only — no certificate files move and no archive subfolder is created. The archive-vs-keep call is booked as a separate, later per-lane checkpoint that the operator will open when the octahedral tail-bound frontier reaches a natural stopping point; §3 and Phase 4 record the criteria to raise at that time.
- **[OP-3 — decided] Brainstorm consolidation: physical merge into one file.** Merge every lane's `brainstorming.md` into a single `braid-ideal/brainstorming.md`, so there is one place to read all provisional braid insight. A merged item may reference its originating lane when that context matters (for example, a `SH-0`-specific idea can note the `braid-ideal` featured-realization lane, or a nested-shell idea its alternatives lane). Each source lane's `brainstorming.md` is then reduced to a one-line stub pointing at the merged file so the maintenance pattern's "every lane carries the three role files" expectation still resolves.

---

## 3. Target Architecture (Under OP-1)

`braid-ideal` becomes the braid **hub**: it carries the top-level braid index, this sort plan, the active `SH-0`/`SH-0-sea`/held-release working queue, and the cross-lane pointer table. The other lanes keep their proof-program identity and map to the taxonomy reading order as follows.

| Lane | Taxonomy role | Disposition under the sort |
| --- | --- | --- |
| `braid-ideal` | Featured-realization working lane + braid hub | Becomes the index/hub; keeps `SH-0`, `SH-0-sea`, held-release sweep, six-point lemma, fold-crossing charts. |
| `braid-retained-branch-closure` | Base + featured + alternative proof home (`neutral-braid/`, `shell-braid/`, `nested-shell-braid/` subdirs) | Keep intact; it owns the neutral-braid and shell-braid certificate chains, the promotion policy, and the source triage. Confirm it stays the certificate home rather than `braid-ideal`. |
| `braid-mass-response-map` | Braid recovery requirements → mass map / Noether sea response | Keep intact; owns `a0-reduced-branch-certificate`, mass-trace chain, pressure-response closure. |
| `braid-angular-momentum-spin` | Braid mathematics → spin / angular momentum export | Keep intact; owns spinor-holonomy and six-point spin material. Reconcile its six-point content with `braid-ideal`'s six-point lemma to avoid a split owner. |
| `braid-geometry-export-bridge` | Braid mathematics → geometry export / octahedral fold analysis | Keep intact as a proof lane; **re-index only** this sort (OP-2 archiving deferred). Raise a later per-lane archive checkpoint when the tail-bound frontier stalls: criteria are which `octahedral-fold-aware-*` certificates are closed and superseded, whether the `priorities.md` frontier can be stated in under one screen, and whether any downstream consumer still reads the closed certs. |
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
- **Preserve relative links.** When a file moves, repair every inbound and outbound relative link within the same edit set. The agent verifies links by inspection; the operator runs `node scripts/validate-content.mjs --check --strict` and `node scripts/build-scene-graph.mjs --check --strict` from codex to confirm. Never run generator `--write`; regeneration happens on the operator's side in the final branch/PR flow (`reference/op/codex-pr-branch.md`).
- **Working-tree edits only; operator owns git.** This session has no git access. The agent only reads and writes files in the local working tree; all staging, committing, branching, PRs, and validation/regeneration runs are done by the operator from codex. Scope the write set to the files this sort owns and list them for the operator at close-out. `device_bash` can `mv` and edit but cannot `rm`; do not delete files — reduce an emptied file to a stub (see Phase 3) or move it into a `_to_delete/` folder for the operator to remove from codex.
- **No new gates.** Per the theory-focus policy, prefer consolidating validators, ledgers, and caveats over adding them. This sort removes and merges structure; it does not mint new gate files.

---

## 5. Step-By-Step Phases

### Phases 0–7 — Completed (2026-07-08, branch `codex/calcite`)

- **Phase 0 — Freeze and snapshot.** Done. Pre-sort baseline (per-lane role-file sizes + Eastern mtimes) logged in `braid-ideal/work-log.md`.
- **Phase 1 — Intake capture and dedupe.** Done. All six open threads plus the saved prompts captured and routed in `braid-ideal/braid-intake-ledger.md`, with the verbatim prompt bodies preserved in `braid-ideal/braid-intake-prompts.md`. Two consolidation findings recorded: the five-thread Group A absorber cluster (one owner over five disjoint sub-questions) and the P09 + `t1` native-promotion convergence (one workstream, gated on an eigen-braid hunt). Thread names were retired by the operator; every intake item routes to `braid-ideal`.
- **Phase 2 — Lane hygiene (verification).** Done. Verified file-role separation: every lane already carries a `work-log.md`, and all work-logs are disciplined dated-status logs, so the work-log → brainstorming migration had no targets. The priorities.md trim folded into Phase 3.
- **Phase 3 — Brainstorm merge + priorities trim (OP-3).** Done. All ten lanes' `brainstorming.md` merged into `braid-ideal/brainstorming.md` (dated Contents TOC + "Merged Lane Brainstorms" with `(from: lane)` tags); every source brainstorm is a resolving stub. Priorities trimmed route-by-content-type: `braid-mass-response-map` 81 → 30.6 KB, `braid-angular-momentum-spin` 124 → 34.7 KB, `braid-retained-branch-closure` 26 → 13.8 KB (doctrine → brainstorming; reference / proof-spec → sibling files; per-item status → lane work-logs, all verbatim). The `braid-ideal` hub queue and `braid-nested-shell-causal-closure` reference sections were left intact by decision; `braid-geometry-export-bridge` excluded (OP-2). See the dated Phase 3 notes in `braid-ideal/work-log.md`.
- **Phase 4 — Lane sort and routing (OP-1).** Done. Reconciliation-by-documentation: the two "dual-owner" objects were not real conflicts — the six-*point* symmetry lemma (`braid-ideal`) vs the six-*site* neutral base certificate (`braid-retained-branch-closure`) are distinct objects, and the nested-shell model source packets (`braid-retained-branch-closure/nested-shell-braid/`, a support-packet index) vs the rest-mass/relativistic-closure workstream (`braid-nested-shell-causal-closure`) are differentiated scopes. Resolved with clarifying cross-pointers in both nested-shell `priorities.md` files. No lanes folded (all eight active and differentiated); no cross-lane task moves needed (active intake concentrates in `braid-ideal`); `braid-geometry-export-bridge` re-index verified with certs untouched (OP-2); no removals, so no renumbering. See the dated Phase 4 note in `braid-ideal/work-log.md`.

- **Phase 5 — Corpus promotion pass.** Done — audit only, zero corpus edits, operator-ratified 2026-07-08. Grounded in the proof-ID crosswalk and promotion policy: no braid branch is retained at any Proof ID, so no retained-branch results are promotable; the reader-safe theorem-target / scoped-negative / mechanism surface is already extensively promoted (13 noether-braid chapters; anti-damping, axis-neutral, speed budget, pump, `Corollary S` already in corpus). The only not-yet-promoted material is in-flight absorber-cluster negatives, whose systematic reviewed promotion is the pending Group D survey (P11–P16). Policy says stay narrow while rows are open, so no new unilateral promotions were made. See the dated Phase 5 audit in `braid-ideal/work-log.md`.

- **Phase 6 — Validation handoff.** Done. All 460 relative `.md` links in the sort-touched files verified to resolve. Changes are confined to `reference/priorities/` (priority-side docs) — no corpus, scene, or generated-artifact edits — so scene-graph / textbook drift from this sort is not expected. The ordered check set for the operator to run from codex is delivered in the close-out: `git diff --check`; `node scripts/validate-content.mjs --check --strict`; `node scripts/build-scene-graph.mjs --check --strict`; and the receiver-normal, frequency-triplet, and polarity drift checks. The agent ran no git or `--write` commands.
- **Phase 7 — Close-out.** Done. Project-memory note `braid-priority-sort.md` written (lane map, OP decisions, dual-owner reconciliations, consolidation findings, proof-state). This plan's §3 serves as the hub lane map; the intake ledger and prompt archive are kept as the **active reference for relaunching the consolidated workstreams** (not retired into the work-log, since the threads have not yet relaunched). The full scoped write set was delivered to the operator in the written close-out for review and commit from codex.

---

## 6. Execution Model (Multi-Agent, Disjoint Ownership)

Assign one agent per non-overlapping lane group so writes never collide, matching the existing thread set:

- **Hub + brainstorm merge** (`braid-ideal` role files, intake ledger): one thread; Phases 0–2 are complete, so it runs Phase 3 (brainstorm merge + priorities trim) next, since later phases depend on the merged brainstorm and the routing decisions already recorded in the intake ledger.
- **Retained-branch + nested reconciliation** (`braid-retained-branch-closure`, `braid-nested-shell-causal-closure`, `braid-doubling-frequency-lock`): one thread; owns the base/featured/alternative certificate homes and the nested dual-owner resolution.
- **Geometry-export re-index** (`braid-geometry-export-bridge`): one thread; re-indexes the live tail-bound frontier only and prepares the criteria for the deferred OP-2 archive checkpoint. No cert moves.
- **Mass-response + angular-momentum** (`braid-mass-response-map`, `braid-angular-momentum-spin`): one thread; owns the six-point dual-owner resolution.
- **Taxonomy + promotion** (`braid-taxonomy`, corpus promotion): one thread; runs Phase 5 after the lane sorts land.

Give each thread a file-ownership boundary, a minimum artifact threshold, and a read-only fallback so it continues past the first blocker. Reserve this hub thread for integration, conflict resolution, and the final written close-out; the operator commits and validates from codex. The retired threads' work relaunches as the three consolidated workstreams recorded in `braid-intake-ledger.md` (§C/§D there): the absorber cluster under one owner, the P09 + `t1` native-promotion workstream, and the Group D corpus survey — mapped onto the groups above rather than as independent sessions.

---

## 7. Risks And Rollback

- **Link breakage from moves.** Mitigated by same-edit-set link repair plus the operator's two `--check` gates in codex; every move remains reversible from the operator's git history.
- **Dual-owner drift.** If nested-shell or six-point material is copied rather than pointer-linked, the two owners diverge; the sort must leave a pointer, never a duplicate.
- **Accidental claim inflation on promotion.** Mitigated by running each promotion through the promotion predicate and keeping the first-failure status attached.
- **Sandbox deletion limits.** `device_bash` cannot `rm`; emptied files go to `_to_delete/` for the operator, so a fully "clean" tree may need one operator deletion pass at the end. The brainstorm merge (Phase 3) sidesteps this by overwriting each source `brainstorming.md` with a resolving stub rather than deleting it.

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
- Primary file: reference/priorities/braid-archive/braid-ideal/braid-intake-ledger.md.
- Do not move certificate/packet files or change any claim level in this phase.

Expected output:
- The intake ledger with every thread and prompt routed, plus a short list of detected duplicates against existing lane queues.
```

Closure goal: approve or amend the three operator checkpoints (§2), then run Phase 0–1 to freeze the tree and capture intake before any lane moves.
