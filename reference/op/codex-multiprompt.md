# Org Notes

## Purpose

This file summarizes the developer-process guidance refined in the recent Codex workflow discussion, so the repo has one lightweight place that records the current operating pattern.

## Parallel Codex Thread Process

When using multiple Codex threads in parallel against repo priorities:

- refresh the relevant priority markdown files from disk before splitting work;
- choose tasks with the lowest expected file overlap, preferably separated by subsystem ownership;
- during the current core theory push, prefer splits that attack disjoint mathematical closure surfaces before app or presentation surfaces;
- prefer splits such as:
  - master-equation closure / delayed-action law work,
  - proof-program certificate work,
  - simulation continuation / convergence diagnostics,
  - mass-map / exposure / medium-response derivation,
  - nested shell swarm causal closure / Lorentz / effective-metric recovery,
  - photon / angular-momentum / spin closure;
- use app/UI, PDG, animator, or architecture splits only when they directly unblock the selected theory target or Op explicitly chooses that work;
- avoid pairing tasks that are the same cut-over seen from two sides, for example Reaction solver-cut-over work with Solver external-cut-over work;
- avoid pairing tasks that both want to own the same report or sweep surface.

For each spawned Codex thread, give a scoped prompt that:

- names the exact numbered priority item and the owning markdown file;
- tells the thread which files and subsystem it should prefer touching;
- tells it what nearby work to avoid if that would create overlap with another thread;
- asks it to inspect the current implementation first, then complete one valuable end-to-end slice;
- requires tests and doc updates as needed;
- specifies the codex reasoning effort:  low, medium, high, extra high
- and includes this rule:
  If you are working on a task in a priority list and you complete that task, remove it from the priority list and renumber any items that follow.
- and includes this rule:
  If the thread makes a substantive theory advancement, capture it directly into `content/markdown/aaa` when solid, or stage it in `reference/priorities` with claim level, assumptions, proof burden, and intended corpus destination.

## Reasoning Effort Guidance

Suggested defaults:

- `high` or `extra high` for core geometrical theory closure, proof-route design, master-equation reasoning, branch certificates, and Lorentz/effective-metric derivations;
- `medium` for UI legibility, app-shell, contract-shape, and most scoped refactor tasks;
- `high` for solver-core reasoning, provenance rules, search behavior, or other semantics-heavy work;
- use `high` for large UI refactors only when the task likely requires deeper restructuring of a major coordinator or composition root.

## Feedback Loop

When parallel Codex threads create overlap, ambiguity, duplicated work, or idle integration time, add a one-line unchecked task to [README-op.md](../../README-op.md) under `Multi-Agent Use`.

## Theory Advancement Capture

When a Codex thread makes a substantive $\mathbb{A}\mathbb{A}\mathbb{A}$ theory advancement, do not leave the result only in chat. Prefer direct promotion into `content/markdown/aaa` when the result is solid enough for reader-facing corpus prose. Otherwise, stage the advancement in `reference/priorities` with its claim level, assumptions, proof burden, and intended corpus destination.
