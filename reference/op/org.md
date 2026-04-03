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
  - Composer timeline / observer / import work;
- avoid pairing tasks that are the same cut-over seen from two sides, for example Reaction solver-cut-over work with Solver external-cut-over work;
- avoid pairing tasks that both want to own the same report or sweep surface.

For each spawned Codex thread, give a scoped prompt that:

- names the exact numbered priority item and the owning markdown file;
- tells the thread which files and subsystem it should prefer touching;
- tells it what nearby work to avoid if that would create overlap with another thread;
- asks it to inspect the current implementation first, then complete one valuable end-to-end slice;
- requires tests and doc updates as needed;
- and includes this rule:
  If you are working on a task in a priority list and you complete that task, remove it from the priority list and renumber any items that follow.

## Reasoning Effort Guidance

Suggested defaults:

- `medium` for UI legibility, app-shell, contract-shape, and most scoped refactor tasks;
- `high` for solver-core reasoning, provenance rules, search behavior, or other semantics-heavy work;
- use `high` for Reaction UI work only when the task likely requires deeper restructuring of a large coordinator such as `ReactionCanvasUiRuntime.js`.

Specific guidance from the discussion:

- the first Reaction thread launched at `high` was not wrong, but `medium` would usually have been sufficient;
- the solver provenance thread should use `high`;
- the PDG contract-story thread should use `medium`.

## Priority-Doc Maintenance Pattern

The current preferred style for live priority docs is:

- keep priorities concise and code-verified;
- use `Current` plus `Objective` rather than long migration diaries;
- rerank based on real code state, not stale historical intent;
- if a task is done, remove it and renumber the list.

This pattern was applied across:

- [reference/priorities/observer/app-architecture.md](../priorities/observer/app-architecture.md)
- [reference/priorities/observer/composer.md](../priorities/observer/composer.md)
- [reference/priorities/observer/reaction.md](../priorities/observer/reaction.md)
- [reference/priorities/observer/solver.md](../priorities/observer/solver.md)
- [reference/priorities/observer/pdgfeed.md](../priorities/observer/pdgfeed.md)

## Developer-Meta Storage Guidance

We clarified the repo-local best-fit split for developer meta:

- [AGENTS.md](../../AGENTS.md):
  stable repo-wide operating rules and constraints;
- [reference/priorities](../priorities/README.md):
  live backlog and current-state tracking;
- [reference/priorities/codex/codex.md](../priorities/codex/codex.md):
  Codex/operator-specific process notes;
- `content/`:
  app-facing content, not developer process;
- potential future `docs/`:
  conventional developer/reference docs if a broader contributor-facing structure is added.

## Standard Multi-Contributor Repo Practice

We also clarified the broader conventional structure for repos with many contributors:

- [README.md](../../README.md) for project overview and setup;
- `CONTRIBUTING.md` for contributor workflow;
- `docs/` for durable human-facing technical documentation;
- `docs/adr/` for Architecture Decision Records;
- issue tracker / project board for the live backlog.

For this repo specifically:

- `docs/` would normally read as developer/reference material, not app-loaded content;
- but if added, that should still be stated explicitly once in contributor guidance so there is no ambiguity;
- app-consumed material should remain under `content/`.

## Recommended Home For This Process

The best current repo-local home for the Codex thread-orchestration process is:

- [reference/priorities/codex/codex.md](../priorities/codex/codex.md), likely as a focused file such as `reference/priorities/codex/thread-orchestration.md`.

That keeps:

- durable agent constraints in [AGENTS.md](../../AGENTS.md),
- live work in the [observer priority docs](../priorities/observer/observer.md),
- and Codex operating procedure in one developer-oriented place without mixing it into app-facing content.
