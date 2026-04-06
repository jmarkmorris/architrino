# Repo Process

TODO: automate this with Codex skills once I find them. If you want the strongest protection, the next step is automation.

This document defines the standard repo process for ending a work session, publishing a pull request, cleaning up the previous branch in the branch series, and preparing the next branch.

## Branch Naming Convention

The active branch series for this repo is currently the periodic table sequence.

- Working branches should therefore use `codex/<element-name>` by default.
- If a short topic suffix materially improves clarity, use `codex/<element-name>-<topic>`.
- Advance the sequence one element at a time.
- Keep the element prefix canonical even when using a topic suffix.
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
- A green PR check run is not enough by itself. A ready PR must also be mergeable into the current base branch without conflicts.
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
- Treat the local pre-push checklist as a mirror of the current required repo workflow, not as a smaller convenience subset.
- If GitHub Actions runs an additional repo-owned validation step, add and run that same step locally before opening a ready PR.

```bash
node scripts/validate-content.mjs --check --strict
node scripts/build-scene-graph.mjs --check --strict
node scripts/smoke-option3.mjs
```

If scene-graph drift is reported, regenerate and re-check:

```bash
node scripts/build-scene-graph.mjs --write --strict
node scripts/validate-content.mjs --check --strict
node scripts/build-scene-graph.mjs --check --strict
node scripts/smoke-option3.mjs
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
- If a PR for the branch already exists, pushing the branch updates that PR automatically.
- Do not rely on `gh pr create --fill` alone to produce an acceptable title or body.
- Before creating a ready PR, decide the exact PR title and ensure the body explicitly covers the items below.
- The PR body should explain:
  - what changed,
  - why it changed,
  - the user or developer impact,
  - the root cause when the branch fixes a bug,
  - and the checks used to validate it.

Commands:

```bash
gh pr list --head "$(git branch --show-current)" --state all --json state,isDraft,url
```

Interpretation:

- if this returns an empty array, no PR exists yet for the current branch;
- if this returns an open PR, pushing the branch updates that PR automatically;
- if this returns a draft PR that is now reviewable, use `gh pr ready`.

If no PR exists yet, create one:

```bash
gh pr create --title "<clear reviewable title>" --body-file <path-to-pr-body>
```

If the branch is intentionally incomplete, create a draft instead:

```bash
gh pr create --draft --title "<clear reviewable title>" --body-file <path-to-pr-body>
```

If an existing PR is draft and is now ready for review:

```bash
gh pr ready
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

- If beginning from `main`, create the next `codex/<element-name>` or `codex/<element-name>-<topic>` branch in the periodic-table sequence.
- If beginning from `main`, first fast-forward local `main` to `origin/main` while checked out on `main`.
- If continuing a live branch with an open PR, remain on that branch.
- Do not create a new working branch merely because `origin/main` moved. A fetch alone is not enough.

Commands:

```bash
git checkout main
git fetch origin
git merge --ff-only origin/main
git checkout -b codex/<element-name>
```

### 2. Develop, validate, commit, and push

- Follow the end-of-session process above.

### 3. Confirm publish integrity before any PR action

- Do not open, update, or rely on a PR until the exact branch tip you want reviewed is both committed locally and present on the remote branch.
- Refresh remote-tracking refs first so all later decisions are based on the current `origin/main`, not stale local knowledge.
- The worktree should be clean at this point.
- The local branch `HEAD` and `origin/<current-branch>` should resolve to the same commit.
- Do not skip this check just because `git push` printed success earlier in the session.
- Do not open or update a PR from `main`.

Suggested checks:

```bash
git fetch origin
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

### 4. Confirm the branch is still mergeable into the current base branch

- A branch can have clean local validation and passing PR checks and still be unmergeable because `main` moved underneath it.
- Do not open or keep a ready PR on a branch that GitHub reports as conflicted with the current base branch.
- Use the current remote base, not stale local `main`, for this gate.
- If the branch is not mergeable, stop PR publication, merge or rebase the current base branch into the working branch, resolve conflicts deliberately, rerun validation, push again, and only then return to PR work.

Suggested local preflight:

```bash
git fetch origin
git merge-tree $(git merge-base HEAD origin/main) HEAD origin/main
```

Interpretation:

- if the merge-tree output shows conflict markers or `changed in both` conflict sections for files that need manual resolution, stop and reconcile the branch with current `origin/main` before PR publication;
- if the branch was already known to be recently rebased or merged with current `origin/main`, you may treat that as satisfying the local mergeability preflight;
- do not assume passing CI implies mergeability.

### 5. Check whether a PR already exists for the branch before opening or updating one

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
gh pr list --head "$(git branch --show-current)" --state all --json state,mergedAt,headRefOid,headRefName,url
```

Interpretation:

- if `gh pr list` returns an empty array, create a new PR;
- if `state` is `OPEN`, continue using that PR;
- if `state` is `MERGED` and `headRefOid` matches `HEAD`, the current branch tip is already what the merged PR contained, so roll over before doing more work;
- if `state` is `MERGED` and `headRefOid` does not match `HEAD`, the branch contains newer local commits that were not part of the merged PR, so stop and recover them onto a fresh branch before continuing.

This check should happen even if you believe you are "just updating the PR," because a merged PR is no longer updateable in the way an open PR is.

### 6. Open the PR in ready mode

- Open the PR in ready mode once the branch is coherent enough for real review.
- The minimum bar for a ready PR is:
  - the full local validation set that mirrors current repo CI passed, including `node scripts/smoke-option3.mjs`;
  - the branch tip intended for review is committed and pushed;
  - the worktree is clean;
  - the branch is mergeable into the current base branch;
  - the diff represents one logically complete reviewable unit;
  - the PR title and body are intentionally written rather than left to default autofill;
  - the remote PR checks have completed successfully;
  - and GitHub reports the PR as mergeable rather than conflicted.
- Use draft only when the branch is intentionally incomplete and should not yet enter normal review.
- A ready PR is not considered successfully published until the remote checks finish green.

Commands:

```bash
gh pr create --title "<clear reviewable title>" --body-file <path-to-pr-body>
```

or, if intentionally incomplete:

```bash
gh pr create --draft --title "<clear reviewable title>" --body-file <path-to-pr-body>
```

If the PR already exists as a draft and should now enter normal review:

```bash
gh pr ready
```

After creating or updating the PR, wait for the remote checks:

```bash
gh pr checks --watch
```

Then confirm GitHub mergeability:

```bash
gh pr view --json mergeStateStatus
```

Interpretation:

- if `gh pr checks --watch` finishes with all required checks passing, the ready PR gate has passed;
- if any required check fails, do not leave the branch represented as review-ready; fix the issue or convert the PR back to draft until it is genuinely ready;
- if `gh pr view --json mergeStateStatus` reports `DIRTY` or another conflicted state, the ready PR gate has not passed even if checks are green;
- in that conflicted case, close or convert the PR to draft as appropriate, reconcile the branch with current `origin/main`, rerun validation, push, and repeat the publish gate;
- if GitHub connectivity or authentication is broken, treat the ready-PR publish step as incomplete and resolve that before declaring success.

### 7. Respond to review on the same branch

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
gh pr list --head "$(git branch --show-current)" --state merged --json state,mergedAt,url
```

Interpretation:

- if this returns an empty array, the branch does not yet have a merged PR, so stop cleanup;
- if this returns one merged PR, use its `mergedAt` time for the post-merge commit check in the next step.

### 2. Check for post-merge commits on the branch before cleanup

- This is the disaster-prevention gate for the case where you accidentally kept working on the branch after its PR merged.
- Do this check before deleting the branch locally or remotely.
- If the branch contains commits authored after the PR merge time, those commits were not part of the merged PR and must be recovered onto a fresh branch before cleanup continues.
- If needed, preserve the branch tip under a recovery branch name before any deletion.
- This check intentionally uses the PR's `mergedAt` time rather than `origin/main..HEAD`, because squash merges or rebased merge strategies can make already-merged branch commits appear unmerged by ancestry.

Suggested checks:

```bash
git branch --show-current
gh pr list --head "$(git branch --show-current)" --state all --json state,mergedAt,headRefName,url
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
- An optional `-<topic>` suffix is allowed when it materially improves clarity, but the element prefix should still advance in order.
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
git status -sb
git rev-parse HEAD
git rev-parse origin/codex/hydrogen
gh pr list --head "codex/hydrogen" --state all --json state,mergedAt,headRefOid,url
gh pr create --fill

# after the PR merges
gh pr list --head "codex/hydrogen" --state merged --json state,mergedAt,url
git checkout codex/hydrogen
git log --oneline --decorate --since="<mergedAt>" HEAD
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
