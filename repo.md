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
- Do not delete a branch until its pull request is merged and local `main` matches remote `main`.
- Prefer draft PRs first, then mark ready when the branch is genuinely reviewable.

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

- Default to a draft PR unless the branch is already ready for review.
- The PR body should explain:
  - what changed,
  - why it changed,
  - the user or developer impact,
  - the root cause when the branch fixes a bug,
  - and the checks used to validate it.

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
- If continuing a live branch with an open PR, remain on that branch.

Commands:

```bash
git checkout main
git pull origin main --ff-only
git checkout -b codex/<element-name>
```

### 2. Develop, validate, commit, and push

- Follow the end-of-session process above.

### 3. Open the PR as draft

- Use draft while the branch is still being actively shaped.
- Mark ready only when the branch is coherent enough for real review.

### 4. Respond to review on the same branch

- Keep follow-up fixes on the PR branch until the PR is merged.
- Do not branch from an unmerged feature branch to start the next line of work unless that dependency is intentional and explicitly accepted.

## Standard Post-Merge Synchronization Process

Use this process after the PR has been merged successfully.

### 1. Verify the PR is merged

- Confirm the PR merged on GitHub before cleaning up branches.

### 2. Synchronize local `main` to remote `main`

Commands:

```bash
git checkout main
git fetch origin
git merge --ff-only origin/main
```

If local `main` has drifted unexpectedly, stop and resolve that deliberately. Do not force-reset as part of the normal process.

### 3. Delete the previous working branch locally

- Delete the just-merged branch only after `main` is synchronized.
- Try `git branch -d` first.
- If Git refuses because the branch is not seen as fully merged into local `main`, but the PR is confirmed merged and local `main` is synchronized with `origin/main`, use `git branch -D` to finish cleanup.

Command:

```bash
git branch -d codex/<previous-topic>
```

Fallback when the branch was merged through a GitHub merge commit and local deletion still blocks:

```bash
git branch -D codex/<previous-topic>
```

### 4. Delete the previous working branch remotely

Command:

```bash
git push origin --delete codex/<previous-topic>
```

### 5. Confirm the repo is clean and centered on `main`

Command:

```bash
git status -sb
```

At this point, local and remote `main` should match, and the previous branch should be gone both locally and remotely.

## Standard Next-Branch Rollover Process

After the previous PR is merged and the previous branch is retired, start the next branch from synchronized `main`.

### 1. Create the next branch from current `main`

- Use the next element in the periodic-table sequence.
- Create the branch first, then publish it. Do not try to create and push it in parallel.

Command:

```bash
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
- the PR has not actually merged yet,
- local `main` cannot fast-forward to `origin/main`,
- the next branch name breaks the periodic-table sequence without an explicit reason,
- or the next branch would depend on unmerged work that is not meant to stay coupled.

## Expected Outcome

After a healthy wrap-up cycle:

- the completed work is committed and pushed,
- the PR is open or merged intentionally,
- local `main` and remote `main` are synchronized after merge,
- the previous branch has been deleted locally and remotely,
- and the next branch exists and is published from clean `main`.
