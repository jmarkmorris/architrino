# Operator Feedback

This file is Cody's living feedback backlog for improving operator/developer workflow. The method is a short bidirectional checklist: Cody adds or reopens concrete one-line tasks, the operator checks items when the behavior improves, and Cody can uncheck an item if the same friction returns.

## Method

- [ ] Keep each feedback item to one concrete operator behavior that would reduce friction or accelerate closure.
- [ ] Treat a checked item as "improved in practice" rather than permanently closed.
- [ ] Let Cody uncheck a checked item only when the same workflow friction recurs, adding a short dated note if useful.
- [ ] Keep the active list small enough to review before major theory, code, or multi-agent pushes.
- [ ] Move stable solved items to `Resolved` only after the improved behavior survives repeated sessions.

## Efficiency

- [ ] Bias substantial sessions toward one core geometrical theory closure target before app, prose, presentation, or infrastructure work.
- [ ] Start each substantial session by naming the single closure objective, likely files in scope, and definition of done.
- [ ] Give Cody the expected verification command, app path, or rendered target when that target is not obvious.
- [ ] Keep priority lists ordered by closure value rather than historical arrival order.
- [ ] When pasting source material, mark what is canon, what is speculation, and what is only context.
- [ ] Say whether you want implementation, review, planning, or brainstorming before long prompts with mixed signals.
- [ ] Prefer one hard target per turn; batch only independent items with clear file boundaries.
- [ ] Promote recurring operating decisions into repo docs instead of re-explaining them in chat.
- [ ] For broad advancement prompts, let Cody continue into safe direct follow-on work instead of stopping at a Priority Action Menu.

## Clarity

- [ ] Name the canonical project term when a concept has multiple nearby aliases.
- [ ] State the intended claim level: ontology, derivation, effective summary, comparison, or speculation.
- [ ] Attach the expected output shape to requests: patch, report, PR, checklist, proof route, or prose draft.
- [ ] When asking for recommendations only, expect Cody to answer in chat unless a durable repo file is explicitly requested.
- [ ] Use exact dates, branch names, PR numbers, filenames, and command names when referencing prior work.
- [ ] Flag non-negotiable constraints before asking for implementation.
- [ ] Separate hard guardrails from preferences that Cody may trade off.
- [ ] Define success in terms of observable behavior, passing check, equation recovered, or text promoted.
- [ ] Before broad terminology migrations, ask Cody to scan git history and current usage, then name accepted terms and frozen labels before editing.

## Multi-Agent Use

- [ ] Split parallel agents by disjoint write ownership rather than broad topic.
- [ ] Give each worker a file ownership boundary and nearby files to avoid.
- [ ] Use explorer agents for read-only codebase questions whose answers can unblock later work.
- [ ] Use a verification agent only after the main implementation surface is stable enough to test.
- [ ] Avoid launching multiple agents on the same priority item unless their outputs are explicitly different.
- [ ] Ask workers to return changed file paths, tests run, residual risks, and any priority item removed.
- [ ] Reserve the main thread for integration, conflict resolution, and final technical judgment.

## Technical Closure

- [ ] End each substantive theory discussion with a capture decision: promote solid advancements into `content/markdown/aaa` or stage provisional ones in `reference/priorities`.
- [x] Require each major theory push to leave behind at least one mathematical artifact: equation, lemma, invariant, proof route, branch certificate, or simulation target.
- [ ] Prioritize native derivations, invariants, equations, and testable variables over new gates or ledgers.
- [ ] For each closure target, name the tested physical constraint or accepted mathematical consistency condition it protects.
- [ ] Require every promoted result to state what it proves, what it assumes, and what remains open.
- [ ] Convert repeated discussion loops into a theorem target, simulation target, or explicit rejection note.
- [ ] Treat canon edits as policy changes and discuss them before broad corpus updates.
- [ ] Keep the active priority surface small enough that completed tasks can be removed and renumbered immediately.
- [ ] After updating priority buckets, mark each new packet as promoted, deferred, or priority-only with its corpus target and blocker.
- [ ] After large theory pushes, run one consolidation pass to eliminate duplicated labels and stale TODOs.

## Resolved

- [ ] Move items here only after the improved behavior survives repeated sessions.
