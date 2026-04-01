# Repo Process

This document defines the standard repo process for ending a work session, publishing a pull request, cleaning up the previous branch in the branch series, and preparing the next branch.

## Branch Naming Convention

The active branch series for this repo is currently the periodic table sequence.

- Working branches should therefore use `codex/<element-name>`.
- Advance the sequence one element at a time.
- Do not invent an unrelated branch name unless there is an explicit reason to step outside the element sequence.
- After `codex/hydrogen`, the next standard branch is `codex/helium`, then `codex/lithium`, and so on.

This keeps the branch series ordered, memorable, and easy to reason about during rollover.

## Principles

- Keep one clear canonical working branch at a time.
- Do not leave a session with unclear local state.
- Do not push mixed-scope work.
- A merged pull request does not retire the local branch automatically. If you keep committing on that branch after merge, those later commits are new unmerged work.
- Do not delete a branch until its pull request is merged and local `main` matches remote `main`.
- Treat `git fetch origin` as remote-tracking refresh only. It does not update local `main`.
- Prefer ready PRs once a branch is genuinely reviewable.
- Use draft PRs only when the branch is intentionally not ready for real review.
- If a git command in the cleanup or rollover sequence fails, stop and resolve that exact failure before continuing to the next git step.
- In sandboxed environments, some local ref-updating commands may require escalation because Git needs to create lockfiles under `.git/refs`.

## Standard End-of-Session Process

Use this process whenever a work session is being wrapped up and the work is intended to leave the local machine.

### 1. Confirm scope

- Check that the worktree contains only the intended changes.
- If unrelated edits are present, separate them before staging or committing.

Commands:

```bash
git status -sb
git diff --stat
```

### 2. Run the required repo checks

These are mandatory before commit and before PR publication.

```bash
node scripts/validate-content.mjs --check --strict
node scripts/build-scene-graph.mjs --check --strict
```

If scene-graph drift is reported, regenerate and re-check:

```bash
node scripts/build-scene-graph.mjs --write --strict
node scripts/validate-content.mjs --check --strict
node scripts/build-scene-graph.mjs --check --strict
```

### 3. Stage only the intended files

- Prefer explicit file paths when there is any doubt.
- Use `git add -A` only when the whole worktree is in scope.

Commands:

```bash
git add path/to/file1 path/to/file2
```

or, when the whole worktree is intentionally in scope:

```bash
git add -A
```

### 4. Commit with a terse intentional message

- The commit should describe the actual completed unit of work, not a vague session summary.

Commands:

```bash
git add <paths...>
git commit -m "Short intentional summary"
```

### 5. Push the working branch

- If the branch is new, push with upstream tracking.
- If the branch already exists remotely, push normally.

Commands:

```bash
git push -u origin <branch>
```

or

```bash
git push origin <branch>
```

### 6. Open or update a pull request

- Default to a ready PR when the branch is coherent enough for real review.
- Use draft only when the branch is intentionally incomplete and not yet ready for review.
- The PR body should explain:
  - what changed,
  - why it changed,
  - the user or developer impact,
  - the root cause when the branch fixes a bug,
  - and the checks used to validate it.

Commands:

```bash
gh pr view --json state,url
```

If no PR exists yet, create one:

```bash
gh pr create --fill
```

If the branch is intentionally incomplete, create a draft instead:

```bash
gh pr create --draft --fill
```

### 7. End the session in a clean state

- Leave the worktree clean on the working branch.
- Do not leave unstaged experimental edits behind unless they are intentionally being carried into the next session.

Command:

```bash
git status -sb
```

## Standard PR Process

This is the normal branch-to-PR path for active implementation work.

### 1. Start from an explicit working branch

- If beginning from `main`, create the next `codex/<element-name>` branch in the periodic-table sequence.
- If beginning from `main`, first fast-forward local `main` to `origin/main` while checked out on `main`.
- If continuing a live branch with an open PR, remain on that branch.
- Do not create a new working branch merely because `origin/main` moved. A fetch alone is not enough.

Commands:

```bash
git checkout main
git fetch origin
git pull origin main --ff-only
git checkout -b codex/<element-name>
```

### 2. Develop, validate, commit, and push

- Follow the end-of-session process above.

### 3. Confirm publish integrity before any PR action

- Do not open, update, or rely on a PR until the exact branch tip you want reviewed is both committed locally and present on the remote branch.
- The worktree should be clean at this point.
- The local branch `HEAD` and `origin/<current-branch>` should resolve to the same commit.
- Do not skip this check just because `git push` printed success earlier in the session.
- Do not open or update a PR from `main`.

Suggested checks:

```bash
git branch --show-current
git status -sb
git rev-parse HEAD
git rev-parse origin/$(git branch --show-current)
```

Interpretation:

- if the current branch is `main`, stop and create or switch to a working branch first;
- if `git status -sb` is not clean, stop and either commit or intentionally discard/stash the remaining edits before PR work;
- if the two SHAs do not match, stop and push the branch tip you actually want reviewed before touching the PR.

Only continue to PR checks after this gate passes.

### 4. Check whether a PR already exists for the branch before opening or updating one

- This is the primary guard against continuing on a branch whose PR already merged.
- Do this after pushing the branch tip and before opening, updating, or relying on a PR.
- First determine whether the branch already has a PR.
- If no PR exists yet, open a new one normally.
- If a PR exists and is still open, update that PR normally.
- If a PR exists and is already merged, stop immediately.
- In that merged-PR case, do not keep using that branch as the active branch for new work, even if the branch now has newer local commits.
- Instead, preserve the branch tip if needed, finish post-merge synchronization, create the next branch from synchronized `main`, and move the newer commits there deliberately.

Suggested checks:

```bash
git branch --show-current
git rev-parse HEAD
gh pr view --json state,mergedAt,headRefOid,headRefName,url
```

Interpretation:

- if `gh pr view` reports no PR, create a new PR;
- if `state` is `OPEN`, continue using that PR;
- if `state` is `MERGED` and `headRefOid` matches `HEAD`, the current branch tip is already what the merged PR contained, so roll over before doing more work;
- if `state` is `MERGED` and `headRefOid` does not match `HEAD`, the branch contains newer local commits that were not part of the merged PR, so stop and recover them onto a fresh branch before continuing.

This check should happen even if you believe you are "just updating the PR," because a merged PR is no longer updateable in the way an open PR is.

### 5. Open the PR in ready mode

- Open the PR in ready mode once the branch is coherent enough for real review.
- Use draft only when the branch is intentionally incomplete and should not yet enter normal review.

Commands:

```bash
gh pr create --fill
```

or, if intentionally incomplete:

```bash
gh pr create --draft --fill
```

### 6. Respond to review on the same branch

- Keep follow-up fixes on the PR branch until the PR is merged.
- Do not branch from an unmerged feature branch to start the next line of work unless that dependency is intentional and explicitly accepted.

Commands:

```bash
git branch --show-current
gh pr view --json state,headRefName,url
git push origin $(git branch --show-current)
```

## Standard Post-Merge Synchronization Process

Use this process after the PR has been merged successfully.

Precondition:

- Before leaving the just-merged branch, run `git status -sb`.
- Continue only if the worktree is clean, or if any remaining edits have been intentionally committed or stashed.
- Do not carry stray edits onto `main` during rollover.

### 1. Verify the PR is merged

- Confirm the PR merged on GitHub before cleaning up branches.

Command:

```bash
gh pr view --json state,mergedAt,url
```

### 2. Check for post-merge commits on the branch before cleanup

- This is the disaster-prevention gate for the case where you accidentally kept working on the branch after its PR merged.
- Do this check before deleting the branch locally or remotely.
- If the branch contains commits authored after the PR merge time, those commits were not part of the merged PR and must be recovered onto a fresh branch before cleanup continues.
- If needed, preserve the branch tip under a recovery branch name before any deletion.

Suggested checks:

```bash
git branch --show-current
gh pr view --json state,mergedAt,headRefName,url
git log --oneline --decorate --since="<mergedAt>" HEAD
```

Interpretation:

- if the PR state is not `MERGED`, stop; this is not post-merge cleanup;
- if the final `git log` command prints no commits after the merge time, continue with normal cleanup;
- if the final `git log` command prints branch commits after the merge time, stop cleanup and recover them first.

Suggested immediate recovery move when post-merge commits are present:

```bash
git branch codex/<previous-topic>-recovery HEAD
```

Then fast-forward `main`, create the next branch from `main`, and merge or cherry-pick the recovered work there deliberately.

### 3. Fast-forward local `main` to remote `main`

- `git fetch origin` updates `origin/main`, not local `main`.
- The synchronization step is complete only after `git merge --ff-only origin/main` succeeds while `main` is checked out.
- Before deleting the old branch or creating the next one, verify that local `main` and `origin/main` resolve to the same commit.

Commands:

```bash
git checkout main
git fetch origin
git merge --ff-only origin/main
git rev-parse --short main
git rev-parse --short origin/main
```

The two printed SHAs must match. If local `main` has drifted unexpectedly, stop and resolve that deliberately. Do not force-reset as part of the normal process.

### 4. Delete the previous working branch locally

- Delete the just-merged branch only after `main` is synchronized.
- Try `git branch -d` first.
- If Git refuses because the branch is not seen as fully merged into local `main`, but the PR is confirmed merged and local `main` is synchronized with `origin/main`, use `git branch -D` to finish cleanup.
- If the local deletion command fails for any other reason, stop here. Do not continue to remote branch deletion until the local failure is understood.
- In sandboxed environments, local branch deletion may need escalation because Git must write a lockfile under `.git/refs/heads/`.

Command:

```bash
git branch -d codex/<previous-topic>
```

Fallback when the branch was merged through a GitHub merge commit and local deletion still blocks:

```bash
git branch -D codex/<previous-topic>
```

### 5. Delete the previous working branch remotely

- If the remote branch has already been deleted by GitHub or by another operator, treat that as already complete and skip this step.
- A failure caused only by the remote branch already being absent is benign.
- Run this step only after the local branch-deletion step has either succeeded or been intentionally skipped as already complete.

Command:

```bash
git push origin --delete codex/<previous-topic>
```

### 6. Confirm the repo is clean and centered on `main`

Command:

```bash
git status -sb
```

At this point, local and remote `main` should match, and the previous branch should be gone both locally and remotely.

## Standard Next-Branch Rollover Process

After the previous PR is merged and the previous branch is retired, start the next branch from synchronized `main`.

### 1. Create the next branch from current `main`

- Use the next element in the periodic-table sequence.
- Create the branch only after local `main` has been fast-forwarded and verified against `origin/main`.
- Create the branch first, then publish it. Do not try to create and push it in parallel.
- Stay on `main` for the synchronization commands, then cut the branch immediately from that checked-out `main`.
- If branch creation fails, stop before attempting any push.
- In sandboxed environments, branch creation may also require escalation if Git cannot write the new local ref.

Command:

```bash
git checkout main
git fetch origin
git merge --ff-only origin/main
git rev-parse --short main
git rev-parse --short origin/main
git checkout -b codex/<next-element>
```

### 2. Publish the next branch immediately

- Push the empty or early branch at the start of the new line of work when you want the branch identity to exist remotely from the beginning.

Command:

```bash
git push -u origin codex/<next-element>
```

This makes the next branch the new canonical branch in the series.

### 3. Continue work on that branch

- All new commits for the next unit of work should land there.
- Open the next PR only when the branch has a coherent reviewable unit.

Commands:

```bash
git branch --show-current
git status -sb
```

## Full Series Example

This is the standard sequence for one completed branch rolling into the next:

```bash
# finish the current branch
git status -sb
node scripts/validate-content.mjs --check --strict
node scripts/build-scene-graph.mjs --check --strict
git add <paths...>
git commit -m "Finish current unit of work"
git push origin codex/hydrogen

# after the PR merges
git checkout main
git fetch origin
git merge --ff-only origin/main
git rev-parse --short main
git rev-parse --short origin/main
git branch -d codex/hydrogen || git branch -D codex/hydrogen
git push origin --delete codex/hydrogen

# start the next branch
git checkout -b codex/helium
git push -u origin codex/helium
```

## Stop Conditions

Stop and resolve deliberately rather than pushing ahead if any of these are true:

- the worktree contains unrelated edits,
- the required validation commands fail,
- you are about to open or update a PR but have not yet verified that the branch is clean and that local `HEAD` matches `origin/<current-branch>`,
- you are about to open or update a PR from `main`,
- you are about to open or update a PR for a branch but have not yet checked whether that branch already has a PR and whether that PR already merged,
- the branch already has a merged PR and you have not yet compared the merged PR head commit with the current local branch tip,
- the PR has not actually merged yet,
- the branch PR is already merged but you have not yet checked for post-merge local commits on that branch,
- the branch contains commits authored after the PR merge time and you have not yet recovered them onto a safe branch,
- `git fetch origin` succeeded but local `main` was not actually fast-forwarded and verified,
- local `main` cannot fast-forward to `origin/main`,
- the next branch name breaks the periodic-table sequence without an explicit reason,
- or the next branch would depend on unmerged work that is not meant to stay coupled.

## Expected Outcome

After a healthy wrap-up cycle:

- the completed work is committed and pushed,
- the PR is open in ready mode or merged intentionally,
- local `main` and remote `main` are synchronized after merge,
- the previous branch has been deleted locally and remotely,
- and the next branch exists and is published from clean `main`.
