# Org Notes

## Purpose

This file summarizes the developer-process guidance refined in the recent Codex workflow discussion, so the repo has one lightweight place that records the current operating pattern.

## Parallel Codex Thread Process

When using multiple Codex threads in parallel against repo priorities:

- refresh the relevant priority markdown files from disk before splitting work;
- choose tasks with the lowest expected file overlap, preferably separated by subsystem ownership;
- prefer splits such as:
  - Reaction UI / interaction work,
  - Solver-core / regression work,
  - PDG ingest / mapping / contract work,
  - Architecture enforcement / scripts / tests,
  - animator timeline / observer / import work;
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

## Reasoning Effort Guidance

Suggested defaults:

- `medium` for UI legibility, app-shell, contract-shape, and most scoped refactor tasks;
- `high` for solver-core reasoning, provenance rules, search behavior, or other semantics-heavy work;
- use `high` for large UI refactors only when the task likely requires deeper restructuring of a major coordinator or composition root.



