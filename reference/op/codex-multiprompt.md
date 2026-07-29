# Parallel Codex Thread Procedure

Use this file when a task should be split across multiple Codex threads. The default meta-optimization wrapper lives in [codex-goal-seeking-prompt-template.md](codex-goal-seeking-prompt-template.md); this file inherits that procedure and adds the Architrino-specific rules for safe parallel work.

## When To Split

Prefer multiple Codex threads only when parallel work is likely to improve quality, speed, or independent verification. Good splits have:

- disjoint write ownership;
- low expected file overlap;
- separate mathematical, code, source-mining, or validation questions;
- a clear main-thread integration owner;
- enough context to brief workers without making each worker reread the whole repo.

Keep the work single-threaded when the target is tightly coupled, the same file owns most of the answer, or one unified technical judgment matters more than parallel exploration.

## Current Default Bias

During the current core geometrical theory push, prefer splits that attack disjoint mathematical closure targets before app, presentation, or broad cleanup work. High-value split targets include:

- master-equation closure or delayed-action law work;
- potential/action proof programs and branch certificates;
- simulation continuation, convergence diagnostics, or falsifiable variable targets;
- mass-map, exposure, or medium-response derivation;
- nested shell braid causal closure, Lorentz recovery, or effective-metric recovery;
- photon, angular-momentum, spin, or Noether sea constitutive response work.

Use app/UI, PDG, animator, architecture, or presentation splits only when they directly unblock the selected theory target or the operator/developer explicitly selects that work.

## Pre-Split Checklist

Before launching worker threads:

- refresh the relevant priority markdown files, source files, and current git status from disk;
- name the shared closure objective and definition of done;
- choose tasks with the lowest expected file overlap;
- assign each worker preferred write files and nearby files to avoid;
- decide which thread owns integration, conflict resolution, and final technical judgment;
- decide whether each worker should implement, review, explore, verify, or report only;
- set the reasoning effort for each worker: low, medium, high, or extra high.

## Worker Prompt Skeleton

Start each worker prompt with a concrete closure goal:

```text
Closure goal:
[One concrete objective this worker can complete or advance independently.]

Context:
- Repository: `$REPO_ROOT`
- Workflow: [implementation / review / exploration / verification / source mining]
- Priority item, issue, or target file: [exact path and item number when applicable]
- Preferred write ownership: [files or directories this worker may touch]
- Avoid touching: [files, reports, generated outputs, or priority items owned by another thread]
- Reasoning effort: [low / medium / high / extra high]

Method:
1. Inspect the current files before proposing changes.
2. Complete one valuable end-to-end slice inside the stated ownership boundary.
3. Reuse existing project terminology and local patterns.
4. If working from a priority list and the item is completed, remove it from that list and renumber following items.
5. If the work makes a substantive theory advancement, capture it directly in `content/markdown/aaa` when corpus-solid, or stage it in `reference/priorities` with claim level, assumptions, proof burden, and intended corpus destination.
6. Run practical validation checks for the files touched, or explain why validation was not run.

Return:
- Files changed.
- What was completed.
- Validation run and results.
- Remaining risks or blockers.
- Any priority item removed or deferred.
- Closure goal for the next concrete step.
```

## Reasoning Effort Guidance

Suggested defaults:

- `high` or `extra high` for core geometrical theory closure, proof-route design, master-equation reasoning, branch certificates, and Lorentz/effective-metric derivations;
- `medium` for UI legibility, app-shell work, contract-shape edits, and most scoped refactor tasks;
- `high` for solver-core reasoning, provenance rules, search behavior, or other semantics-heavy implementation;
- `high` for large UI refactors only when the task likely requires deeper restructuring of a major coordinator or composition root.

## Integration Rules

The main thread owns integration. It should:

- compare worker findings against the live tree before applying or accepting them;
- resolve conflicts by preserving the stronger mathematical or implementation claim, not by averaging reports;
- keep shared files under one writer whenever possible;
- rerun the relevant validation after combining worker outputs;
- make the final capture decision for theory advancements.

## Feedback Loop

When parallel Codex threads create overlap, ambiguity, duplicated work, or idle integration time, add a one-line unchecked task to [README-op.md](README-op.md) under `Multi-Agent Use`.
