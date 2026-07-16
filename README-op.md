# Operator Feedback

This file is the agent's living feedback backlog for improving operator/developer workflow. The method is a short bidirectional checklist: the agent adds or reopens concrete one-line tasks, the operator checks items when the behavior improves, and the agent can uncheck an item if the same friction returns.

## Method

- [ ] Keep each feedback item to one concrete operator behavior that would reduce friction or accelerate closure.
- [ ] Treat a checked item as "improved in practice" rather than permanently closed.
- [ ] Let the agent uncheck a checked item only when the same workflow friction recurs, adding a short dated note if useful.
- [ ] Keep the active list small enough to review before major theory, code, or multi-agent pushes.
- [ ] Move stable solved items to `Resolved` only after the improved behavior survives repeated sessions.

## Efficiency

- [ ] Bias substantial sessions toward one core geometrical theory closure target before app, prose, presentation, or infrastructure work.
- [ ] Start each substantial session by naming the single closure objective, likely files in scope, and definition of done.
- [ ] Start new prompts with a one-sentence `Closure goal:` line so Codex goal mode begins from the intended objective.
- [ ] Give the expected verification command, app path, or rendered target when that target is not obvious.
- [ ] Default local web testing to the shared `5173` dev server; if another port is used, state why and include the active URL in the status or closeout.
- [ ] Before any local browser or web-app turn, probe shared `5173`; if it is down, restart the server and verify `HTTP 200` before browser work or handoff.
- [ ] Keep priority lists ordered by closure value rather than historical arrival order.
- [ ] When pasting source material, mark what is canon, what is speculation, and what is only context.
- [ ] Say whether you want implementation, review, planning, or brainstorming before long prompts with mixed signals.
- [ ] Prefer one hard target per turn; batch only independent items with clear file boundaries.
- [ ] Promote recurring operating decisions into repo docs instead of re-explaining them in chat.
- [ ] Keep generated-artifact writes out of ordinary turns; reserve generator `--write` commands for explicit regeneration/fix-drift requests or the `codex-pr-branch.md` final branch/PR process.
- [ ] Keep the local push gate and GitHub Content Integrity gate in parity before treating a push as clean.
- [ ] Keep GitHub PR validation deduplicated and timed so slow Content Integrity subchecks expose their hot spot.
- [ ] For broad advancement prompts, let the agent continue into safe direct follow-on work instead of stopping at a Priority Action Menu.
- [ ] Treat "continue..." as approval to execute the last safe scoped recommendation or closure goal unless it requires a theory/canon decision, destructive action, or broad scope expansion.
- [ ] For multi-hour self-running theory passes, state the desired checkpoint cadence or final artifact threshold when it differs from the default.
- [ ] Add optional heartbeat diagnostics to long-running theory tests so healthy multi-minute artifact builds are distinguishable from hung runs; detailed recurrence notes live in [reference/op/long-running-test-heartbeats.md](reference/op/long-running-test-heartbeats.md).

## Clarity

- [ ] Treat an unresolved `discussion-scoped` priority as requiring an explicit accept, reject, or defer response when the agent resurfaces it; do not assume silence authorizes implementation.
- [ ] Name the canonical project term when a concept has multiple nearby aliases.
- [ ] For frequency triplet work, state raw `B_1:B_2:B_3` search order up front and attach `I:M:O` only as a retained role map.
- [ ] For solver geometry reports, state the retained physical model separately from the reduced executable chart.
- [ ] State the intended claim level: ontology, derivation, effective summary, comparison, or speculation.
- [ ] Attach the expected output shape to requests: patch, report, PR, checklist, proof route, or prose draft.
- [ ] When asking for recommendations only, expect an answer in chat unless a durable repo file is explicitly requested.
- [ ] Use exact dates, branch names, PR numbers, filenames, and command names when referencing prior work.
- [ ] Flag non-negotiable constraints before asking for implementation.
- [ ] Separate hard guardrails from preferences the agent may trade off.
- [ ] Define success in terms of observable behavior, passing check, equation recovered, or text promoted.
- [ ] Preserve the returned `Closure goal:` line when restarting, splitting, or refocusing a thread.
- [ ] Before broad terminology migrations, ask for a scan of git history and current usage, then name accepted terms and frozen labels before editing.
- [ ] Avoid temporal phrasing for theory claims; use canonical definition/status language such as `canonical Master EOM`.

## Multi-Agent Use

- [ ] Split parallel agents by disjoint write ownership rather than broad topic.
- [ ] Give each worker a file ownership boundary and nearby files to avoid.
- [ ] Use explorer agents for read-only codebase questions whose answers can unblock later work.
- [ ] For multi-agent waves, give each worker a minimum artifact threshold and read-only fallback path so it continues after the first blocker instead of idling after one short pass.
- [ ] When Bill Thurston input can accelerate closure, create one temporary review packet that asks first for overall insights, corrections, and advancements, then lists specific questions, desired comment count, and appended review material.
- [ ] Use a verification agent only after the main implementation surface is stable enough to test.
- [ ] Avoid launching multiple agents on the same priority item unless their outputs are explicitly different.
- [ ] Ask workers to return changed file paths, tests run, residual risks, and any priority item removed.
- [ ] Reserve the main thread for integration, conflict resolution, and final technical judgment.
- [ ] Treat Cowork-sandbox agents as read/edit-only for git: the sandbox can create `.git/index.lock` but cannot unlink inside `.git`, so every sandbox-side `git add`/`git commit` strands a lock for the operator to remove; have those agents hand the operator a ready-to-run commit command instead (2026-07-07).

## Technical Closure

- [ ] End each substantive theory discussion with a capture decision: promote solid advancements into `content/markdown/aaa` or stage provisional ones in `reference/priorities`.
- [ ] Require scorecard increases to separate hard mathematical closure from auditability, terminology, and priority-queue improvements.
- [x] Require each major theory push to leave behind at least one mathematical artifact: equation, lemma, invariant, proof route, branch certificate, or simulation target.
- [ ] Prioritize native derivations, invariants, equations, and testable variables over new gates or ledgers.
- [ ] For each closure target, name the tested physical constraint or accepted mathematical consistency condition it protects.
- [ ] Require every promoted result to state what it proves, what it assumes, and what remains open.
- [ ] Convert repeated discussion loops into a theorem target, simulation target, or explicit rejection note.
- [ ] Treat canon edits as policy changes and discuss them before broad corpus updates.
- [ ] When a physics-law change is marked mandatory clean-slate, default to proof-process restart and purge compatibility shims, historical traces, and generated artifacts unless the operator explicitly grants a diagnostic exception.
- [ ] Keep the active priority surface small enough that completed tasks can be removed and renumbered immediately.
- [ ] After updating priority buckets, mark each new packet as promoted, deferred, or priority-only with its corpus target and blocker.
- [ ] After large theory pushes, run one consolidation pass to eliminate duplicated labels and stale TODOs.
- [ ] 2026-07-14: `causal-delay-feedback` and `ideal-braid` still load solver WASM from the gitignored `.tmp/solver-build/wasm/` build directory, so they resolve in a local checkout and 404 on the published site. `borg` and `photon` now use the deployed `src/solver/wasm/runtime/` artifacts. Point the remaining two at the deployed path, or state why they are local-only.
- [ ] 2026-07-14: `scripts/borg/write-fixture-data.mjs --check` fails for a pre-existing reason unrelated to any current task: the generator emits `canonicalEomEvidence: true` for zombie-solver output while the committed artifact correctly carries `false`. Fix the generator's claim labels so `--check` can go green without re-upgrading a quarantined claim. Do not run `--write` until then.
- [ ] 2026-07-14: `tests/animator-draft-scaffold-runtime.test.js` and `tests/animator-simulation-frame-buffer-runtime.test.js` fail on numeric expectations, independent of Borg work. Unowned; confirm whether these are known-red.

## Resolved

- [ ] Move items here only after the improved behavior survives repeated sessions.
