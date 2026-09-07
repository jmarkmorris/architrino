# Git Lifecycle

This directory holds the repository's version-control procedures: branch naming, validation, commit, push, pull request, issue closure, and branch rollover. It is a routing index, not an authority. Every rule lives in the file named below, and that file wins over any summary here.

Reading this index does not invoke any procedure it names. [codex-pr-branch.md](codex-pr-branch.md#awareness-is-not-invocation) owns the distinction between awareness and invocation, and it governs the other procedures in this directory as well.

Plainly: this page tells you which file to open. Opening a file here does not put you on the hook to run it.

## Procedures

| File | Use when | Status |
| --- | --- | --- |
| [codex-pr-branch.md](codex-pr-branch.md) | Ending a work session, publishing a pull request, verifying a merge, retiring the previous branch, and rolling over to the successor. This is the standard lifecycle and the procedural source of truth. | Live standard |
| [issue-resolution.md](issue-resolution.md) | Investigating, fixing, and closing a GitHub issue or issue set. Hands off to `codex-pr-branch.md` when the work needs a branch, commit, push, or PR. | Live standard |
| [continuous-development-during-pr-review.md](continuous-development-during-pr-review.md) | The operator explicitly asks to continue implementation on a successor branch while a ready parent PR is under review. | Experimental; does not replace the standard lifecycle |
| [codex-pr-unattended-verification.md](codex-pr-unattended-verification.md) | Reading how the unattended-execution correction was raised and closed. It imposes no current obligation. | Closed 2026-09-05 |

## Branch Series

Branch tokens come from the committed registries. [branch-series/registry.md](branch-series/registry.md) is the index that names the active series, the configured counts, and the rollover order; the individual registries hold the tokens.

- [branch-series/registry.md](branch-series/registry.md) — series index and rollover order
- [branch-series/minerals-gemstones.md](branch-series/minerals-gemstones.md)
- [branch-series/elements.md](branch-series/elements.md)
- [branch-series/moons.md](branch-series/moons.md)
- [branch-series/planets.md](branch-series/planets.md)

## Related Material Outside This Directory

These files are reached from the lifecycle but are owned elsewhere, because their subject is not version control.

- [.githooks/pre-commit](../../../.githooks/pre-commit) and [.githooks/pre-push](../../../.githooks/pre-push) are the executable gate set that `codex-pr-branch.md` mirrors. The hook scripts are the source of truth for what actually runs.
- [machine-artifact-retention.md](../machine-artifact-retention.md) owns what the repository tracks, the runtime build contract, and the Actions publishing and recovery path.
- [GitHub Actions Artifact Policy](../../priorities/aaa-operations/contracts/github-actions-artifact-policy.md) and [GitHub Pages And Actions Limits](../../priorities/aaa-operations/evidence/github-pages-and-actions-limits-2026-09-01.md) cover hosting and continuous-integration quotas for the deployed site. They are operations material, not lifecycle procedure.
- [operator-explanation-standard.md](../operator-explanation-standard.md) owns the shape of every operator-facing response, including the handoff reports these procedures produce.
