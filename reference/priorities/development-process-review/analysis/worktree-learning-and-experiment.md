# Git worktrees: definitions and rejected experiment

**Operator decision, September 8, 2026: rejected.** Additional linked-worktree adoption is rejected for this project, including temporary/task-managed, permanent and teaching/evaluation experiments. The toy-repository experiment below is rejected, not awaiting approval or deferred. Use the existing local Architrino checkout. This record retains accurate Git definitions, earlier observations and the rejected design; it is not an execution plan. The decision concerns workflow choice, not a universal empirical defect in Git. Preserve any pre-existing directories, branches, worktrees and evidence; no cleanup is authorized.

## What worktrees mean

Git itself defines these terms. GitHub hosts Git repositories; Codex provides an interface for working with them. The definitions here follow the [Git worktree manual](https://git-scm.com/docs/git-worktree#_description) and [Git glossary](https://git-scm.com/docs/gitglossary). The table is a teaching paraphrase, not a quotation or a new taxonomy.

The key distinction is between **working tree**, meaning the editable files, and **worktree**, meaning those files together with Git's administrative metadata. For a normal, non-bare repository, Git distinguishes the **main worktree** created during initialization or cloning from additional **linked worktrees**. They share the repository's saved history and branch references. Each has its own working files, index and HEAD. [Git worktree manual](https://git-scm.com/docs/git-worktree#_description)

| Term | Relationship in Git's model, paraphrased |
| --- | --- |
| Repository | Shared saved objects and references: the stored file contents, history, and names pointing into that history. |
| Commit | A saved historical state: a snapshot of tracked files, with metadata and parent links. |
| Branch | A line of development. Its named branch reference points to the tip commit and advances with new commits. |
| Working tree | Editable project files showing a saved version plus local changes. The original folder has one too. |
| Worktree: main or linked | Working files plus administrative metadata. The main worktree is the original; a linked worktree adds another working directory to the same repository. |
| Index and HEAD | Separate for each worktree. The index holds staged contents for the next commit; HEAD identifies the selected branch or directly identifies a commit (detached HEAD). |
| Checkout | An operation updating all or some working files from a selected stored version; switching branches also updates the index and HEAD. |

The repository, commit, branch and checkout descriptions follow the [Git glossary](https://git-scm.com/docs/gitglossary); the shared and separate worktree components follow the [worktree manual](https://git-scm.com/docs/git-worktree#_details). Informally, “a checkout” can mean the resulting working files. Here we use “working tree” for those files so the operation and the files stay distinct.

As a teaching example, editing `lesson.txt` in a linked worktree changes that folder's file; staging it changes that worktree's index. Both worktrees still share saved commits and branch references. This example has not been performed. Git normally prevents selecting the same branch in two worktrees simultaneously. [Git worktree manual](https://git-scm.com/docs/git-worktree)

Codex can create worktrees for tasks. Its ordinary managed worktrees and permanent worktrees have different lifecycles; both arrangements are rejected for this project. See the [official worktree documentation](https://learn.chatgpt.com/docs/environments/git-worktrees).

## Observed setup

- **Measured during initial orientation:** `git worktree list --porcelain`, run against `/Users/markmorris/vibe/architrino`, listed the original folder on `codex/skylab`, at saved revision `6efafe15b4f120638fe6938aa65c817eb293e4a8`. This is a snapshot; concurrent work can change it.
- **Measured:** The Codex project-listing tool recognized `/Users/markmorris/vibe/architrino` as a Git repository.
- **Measured:** The proposed branch was absent from `git branch --list codex/worktree-lesson-01`, and shell existence checks found no entry at the proposed destination. These were pre-decision observations; creation is now rejected.

## Rejected experiment: retained design

**Historical learning goal:** After each edit, stage or commit, the operator and agent can predict which files, index, HEAD and branch references change in each worktree, then check the prediction against Git. Success means explaining why the two folders can show different contents while sharing saved history, and correctly predicting one fresh example before running it.

**Rejected isolation proposal:** Use a tiny disposable Git repository inside Architrino's temporary area, with two sibling folders under `.tmp/worktree-learning/`: `original/` for the toy repository's main worktree and `second/` for its linked worktree. The entire lab belongs to this teaching task. Before creation, verify that this parent path is unused and ignored by Architrino; if not, stop and resolve the location without changing ignore configuration. The toy repository would have its own Git history and no configured remote. This teaches real Git worktree mechanics while keeping experimental branch and commit records out of Architrino's Git database. It does not yet test a worktree linked to Architrino itself or Codex's automatic provisioning.

This proposal supersedes the earlier Documents destination and the proposed Architrino branch `codex/worktree-lesson-01`. Neither is selected for execution. The location and toy-repository approach are now rejected with all linked-worktree teaching experiments.

Use one fictitious tracked file, `lesson.txt`, initially containing `colour=blue`. Proposed toy branch names are `lesson-base` and `lesson-second`. The rows below retain the former proposed steps and expected observations, not measured outcomes or current instructions. Every execution step is rejected.

| Step | Question and proposed action | Expected observation and evidence |
| --- | --- | --- |
| ○ Not done — Rejected: 1. Establish the baseline | Create the toy repository and its one-file initial commit on `lesson-base`. | One worktree; `lesson.txt` contains `colour=blue`. Inspect file contents, `git status`, and the saved commit. |
| ○ Not done — Rejected: 2. Add a worktree | Create `second/` on a new toy branch `lesson-second`, starting at the baseline commit. | Two folders with identical initial files and commit IDs, but different branch names. `git worktree list` shows both; `git rev-parse --git-common-dir` resolves to shared storage, while the HEAD and index paths are separate. |
| ○ Not done — Rejected: 3. Edit only | Change the second folder's file to `colour=green`. | The original file remains blue. `git diff` shows the edit only in the second worktree; neither branch tip moves. |
| ○ Not done — Rejected: 4. Stage only | Stage that exact file in the second worktree. | Its staged diff contains green; the original index still records blue. Compare `git diff --cached` in both folders. Staging has not created a commit. |
| ○ Not done — Rejected: 5. Commit locally | Commit the staged toy change on `lesson-second`. | Only that branch advances. From the original folder, `git show lesson-second:lesson.txt` reads green from shared history while its actual file remains blue. This directly contrasts saved history with working files. |
| ○ Not done — Rejected: 6. Predict a fresh case | Before another edit, predict the effect of changing the original file to `colour=red`, then inspect both folders. | Original files show red, second files show green, and saved branch tips remain unchanged until a commit. Record whether both predictions were correct. |

**Historical cleanup safeguards, retained without execution authority:** The rejected design allowed intermediate lab state to remain while discussing it. There is no need to switch or reset Architrino. At the end, first capture results in this durable lesson and inspect the exact lab paths for unexpected files, commits or running processes. With separate cleanup approval, remove the linked worktree through the toy repository's Git, then remove only the verified disposable lab. Dirty-state or unexpected-content checks must not be bypassed with force. No cleanup is authorized by this design.

The toy setup, staging and local commits above are rejected proposals. They do not authorize Architrino staging, commits, publication, configuration changes or branch switches. Betty's process campaign and Veronica's recovery remain outside this task's experimental ownership.

## Results

✓ Done — read-only orientation supplied the observations above. No experiment worktree or branch has been created by this task, and no file-separation experiment has run. The observations describe the original inspection, not a fresh measurement of current concurrent work.

The initial projectless document was queued for the right-hand panel by the app file-opening tool; that response did not establish visible display or rendered Markdown mode. The operator subsequently selected this campaign analysis document as the canonical owner. External preservation and cleanup remain separately coordinated; this decision authorizes no change to the projectless record.

## Decision closeout

✓ Done — operator disposition recorded: reject the toy experiment, linked-worktree adoption and later Codex-managed/permanent-worktree exercises. No experiment remains pending. Earlier definitions and observations remain available for understanding existing Git state. Reopening requires a new explicit operator decision; ordinary task authorization does not reopen it.
