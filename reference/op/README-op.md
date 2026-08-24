# Operator Feedback

This is the living feedback backlog for improving the shared operator/developer workflow. Keep it short and concrete: the operator checks a behavior once it improves in practice; an agent may reopen it if the same friction returns. Detailed procedures belong in their live owner files, not here.

## Legend

- `[x]` — demonstrated in the 2026-07-29 working session; keep observing before moving it to `Resolved`.
- `[*]` — open item that is a current high priority.
- `[ ]` — open item not specially prioritized in this pass.

## Method

- [ ] Keep each item to one observable workflow behavior that would reduce friction or accelerate closure.
- [ ] Treat a checked item as "improved in practice" rather than permanently closed.
- [ ] Let the agent uncheck a checked item only when the same workflow friction recurs, adding a short dated note if useful.
- [*] Keep complex theory, solver, and broad multi-file changes at low work-in-progress and inspect them in VS Code or a diff before the next push; routine reversible organization may run in a broader independent lane.
- [ ] Move a stable solved item to `Resolved` only after the improved behavior survives repeated sessions.

## Efficiency

- [*] Keep substantial sessions centered on one core geometrical closure target before app, prose, presentation, or infrastructure work.
- [*] Start each substantial session with one closure objective, likely files in scope, and a definition of done.
- [ ] Start a substantial research or implementation brief with a one-sentence `Closure goal:` line.
- [ ] Give the expected verification command, app path, or rendered target when that target is not obvious.
- [ ] Default local web testing to the shared `5173` dev server; if another port is used, state why and include the active URL in the status or closeout.
- [ ] Before any local browser or web-app turn, probe shared `5173`; if it is down, restart the server and verify `HTTP 200` before browser work or handoff.
- [ ] Keep priority lists ordered by closure value rather than arrival order.
- [ ] When pasting source material, label canon, proposal, and context separately.
- [x] State whether a mixed prompt requests implementation, review, planning, or brainstorming.
- [ ] Prefer one hard target per turn; batch only independent items with clear file boundaries.
- [x] Promote recurring operating decisions into repo docs instead of re-explaining them in chat.
- [x] Keep generated-artifact writes out of ordinary turns; reserve generator `--write` commands for explicit regeneration/fix-drift requests or the `codex-pr-branch.md` final branch/PR process.
- [ ] Keep the local push gate and GitHub Content Integrity gate aligned before treating a push as clean.
- [ ] Keep GitHub PR validation deduplicated and timed so slow Content Integrity subchecks identify their bottleneck.
- [ ] For broad advancement prompts, let the agent continue into the next safe scoped action rather than stopping at a menu.
- [x] Treat "continue..." as approval to execute the last safe scoped recommendation or closure goal unless it requires a theory/canon decision, destructive action, or broad scope expansion.
- [ ] Treat `run codex-pr-branch.md` and either `merged, continue` or `merged, complete` as standing authorization for the guarded Git lifecycle, so the agent pauses only at PR review or a documented stop condition.
- [ ] Verify three consecutive `codex-pr-branch.md` lifecycles with zero operator decision prompts and zero interactive host permission prompts per handoff; record all permission counters in [the unattended-execution ledger](git/codex-pr-unattended-verification.md).
- [ ] For a multi-hour theory pass, state the desired checkpoint cadence or final artifact threshold when it differs from the default.
- [ ] Add optional heartbeat diagnostics to long-running theory tests so healthy multi-minute artifact builds are distinguishable from hung runs; detailed recurrence notes live in [long-running-test-heartbeats.md](long-running-test-heartbeats.md).

## Clarity

- [ ] When a decision, action, or headline exists, state it first; use the following nonlinear exploration as context rather than burying the lead. Keep free-association brainstorming welcome when no immediate decision is needed.
- [ ] Treat an unresolved discussion-scoped priority as requiring an explicit accept, reject, or defer response; do not infer implementation authority from silence.
- [ ] Name the canonical project term when a concept has multiple nearby aliases.
- [ ] For frequency-triplet work, state raw `B_1:B_2:B_3` search order first and use `I:M:O` only as a retained role map.
- [ ] For solver geometry reports, state the retained physical model separately from the reduced executable chart.
- [x] State the intended claim level: ontology, derivation, effective summary, comparison, or speculation.
- [x] Attach the expected output shape to requests: patch, report, PR, checklist, proof route, or prose draft.
- [ ] When asking for recommendations only, expect an answer in chat unless a durable repo file is explicitly requested.
- [x] Use exact dates, branch names, PR numbers, filenames, and command names when referencing prior work.
- [x] Flag non-negotiable constraints before asking for implementation.
- [x] Separate hard guardrails from preferences the agent may trade off.
- [ ] Define success in terms of observable behavior, passing check, equation recovered, or text promoted.
- [ ] Preserve the returned `Closure goal:` when restarting, splitting, or refocusing a task.
- [ ] Before broad terminology migrations, ask for a scan of git history and current usage, then name accepted terms and frozen labels before editing.
- [ ] Avoid temporal phrasing for theory claims; use canonical definition/status language such as `canonical Master EOM`.
- [x] Keep authored Markdown prose unwrapped in source so Codex Review controls visual wrapping; preserve only structural, mathematical, code, table, quotation, and explicit hard breaks.

## Multi-Agent Use

- [x] Split parallel agents by disjoint write ownership, not just broad topic.
- [x] Give each worker a file ownership boundary and nearby files to avoid.
- [x] Use explorer agents for read-only codebase questions whose answers can unblock later work.
- [ ] For a multi-agent wave, give each worker a minimum artifact threshold and a read-only fallback so it can return useful evidence after a blocker.
- [ ] When a Specialist review can accelerate closure, give the Principal Investigator a bounded review brief: overall assessment first, then specific questions, evidence to inspect, and a defined return shape.
- [ ] Use a verification agent only after the main implementation surface is stable enough to test.
- [x] Avoid launching multiple agents on the same priority item unless their outputs are explicitly different.
- [x] Ask workers to return changed file paths, tests run, residual risks, and any priority item removed.
- [x] Reserve the main thread for integration, conflict resolution, and final technical judgment.
- [ ] Treat constrained sandbox agents as read/edit-only for Git when their environment cannot safely complete repository mutations; have them return the exact scoped commit command rather than leaving a lock or partial Git state.

## Technical Closure

- [ ] End each substantive theory discussion with a capture decision: promote supported advances into `content/markdown/aaa` or stage provisional work in `reference/priorities`.
- [ ] Require scorecard increases to separate hard mathematical closure from auditability, terminology, and priority-queue improvements.
- [x] Require each major theory push to leave behind at least one mathematical artifact: equation, lemma, invariant, proof route, branch certificate, or simulation target.
- [x] Prioritize native derivations, invariants, equations, and testable variables over new gates or ledgers.
- [ ] For each closure target, name the tested physical constraint or accepted mathematical consistency condition it protects.
- [ ] Require every promoted result to state what it proves, what it assumes, and what remains open.
- [x] Convert repeated discussion loops into a theorem target, simulation target, or explicit rejection note.
- [ ] Treat canon edits as policy changes and discuss them before broad corpus updates.
- [ ] When an explicitly authorized physics-law reset is required, restart the proof process and retire only the compatibility material named in that reset; preserve Git and research-history provenance and regenerate derived artifacts only with separate regeneration authority.
- [ ] Keep the active priority surface small enough that completed tasks can be removed and renumbered immediately.
- [ ] After updating priority buckets, mark each new packet as promoted, deferred, or priority-only with its corpus target and blocker.
- [ ] After large theory pushes, run one consolidation pass to eliminate duplicated labels and stale TODOs.
- [ ] Confirm whether the 2026-07-14 numeric failures in `tests/animator-draft-scaffold-runtime.test.js` and `tests/animator-simulation-frame-buffer-runtime.test.js` remain known-red and assign an owner if they do.

## Resolved

- [ ] Move items here only after the improved behavior survives repeated sessions.
