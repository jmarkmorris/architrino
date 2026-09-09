# Git worktrees: one small experiment

This is the evolving lesson and decision record for the worktree teaching task within the development-process review campaign. The operator authorized this document and its incremental maintenance; actual worktree creation awaits separate step approval. The central campaign checklist remains with the campaign owner.

## What worktrees mean

A worktree is another folder where you can edit the same project independently. Think of two desks using the same archive: each desk has its own working papers, while both can consult the saved history. The separation applies to the files in those folders; it is not a security barrier preventing an agent from accessing another folder.

| Term | Meaning |
| --- | --- |
| Repository | Git’s saved history and branch records for a project. |
| Branch | A named line of saved work. Creating a branch does not itself create another folder. |
| Checkout | The actual files in a folder, showing a selected version plus local edits. |
| Worktree | An additional checkout linked to the same repository. |

Worktrees share saved history and branch names. Each has separate files, unfinished edits, and staging—the selection prepared for a commit. Editing a file in one worktree does not automatically edit its counterpart in another. Git normally prevents the same branch from being checked out in two worktrees at once.

Codex can create worktrees for tasks. Its ordinary managed worktrees and permanent worktrees have different lifecycles; we have not selected a permanent arrangement. See the [official worktree documentation](https://learn.chatgpt.com/docs/environments/git-worktrees).

## Observed setup

- **Measured during initial orientation:** `git worktree list --porcelain`, run against `/Users/markmorris/vibe/architrino`, listed the original folder on `codex/skylab`, at saved revision `6efafe15b4f120638fe6938aa65c817eb293e4a8`. This is a snapshot; concurrent work can change it.
- **Measured:** The Codex project-listing tool recognized `/Users/markmorris/vibe/architrino` as a Git repository.
- **Measured:** The proposed branch was absent from `git branch --list codex/worktree-lesson-01`, and shell existence checks found no entry at the proposed destination. Both checks must be repeated before creation.

## Proposed small steps

○ Not done — first step awaits operator approval.

Create one disposable branch, `codex/worktree-lesson-01`, and one linked worktree based on the saved revision recorded above. This teaching task alone would own them.

Proposed folder:

`/Users/markmorris/Documents/Codex/2026-09-08/teach-the-operator-about-git-worktrees/work/architrino-lesson-01`

**What changes:** Git gains a branch record and worktree registration, and the new folder receives the saved files. Existing uncommitted edits are not copied from the original checkout. The original checkout stays on its branch. Creation is not yet authorized.

**Success:** Git lists both folders, with the lesson branch attached only to the new folder. We stop there for review.

**Safe undo:** In a separately approved cleanup step, inspect the exact lesson folder and branch for work worth keeping. If they contain only the disposable experiment, remove that worktree through Git and then delete its branch. Do not force removal or deletion if the checks reveal unexpected work.

Later, individually approved steps can create and edit one fictitious file in the lesson folder to demonstrate separation. Betty’s process work and Veronica’s recovery work remain outside this experiment’s ownership. No commits, pushes, pull requests, merges, branch switches in the original checkout, or cleanup are authorized by this lesson.

## Results

✓ Done — read-only orientation supplied the observations above. No experiment worktree or branch has been created by this task, and no file-separation experiment has run. The observations describe the original inspection, not a fresh measurement of current concurrent work.

The initial projectless document was queued for the right-hand panel by the app file-opening tool; that response did not establish visible display or rendered Markdown mode. The operator subsequently selected this campaign analysis document as the canonical owner. The projectless note will retain only a pointer after the canonical write is verified.

## Open decisions

1. ○ Not done — approve or revise the proposed first creation step, including the disposable branch, destination, and saved starting revision. Recommendation: review these together before creation so the two folders have clear identities.
2. ○ Not done — verify how the experimental folder appears in Codex and which task operates there. Recommendation: defer this test until creation is approved; documentation alone does not establish the observed interface behavior.
3. ○ Not done — approve each later fictitious-file demonstration and the final cleanup separately. Recommendation: retain the small-step cadence; no permanent worktree architecture has been selected.

The operator may relay decisions through the parent task by voice. Relayed explicit approvals belong in this record with their exact scope before the corresponding action.
