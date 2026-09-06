# Repo Process

Automation is desirable only when it mirrors the checked procedure below and the current `.githooks` gate set.

This document defines the standard repo process for ending a work session, publishing a pull request, cleaning up the previous branch in the branch series, and preparing the next branch.

## Awareness Is Not Invocation

This procedure is available to every repository agent as awareness of how deferred generation, validation, commits, pull requests, cleanup, and branch rollover are eventually handled. Reading this file, reaching it through the startup router, following a link to it, citing it, or noticing work that the procedure will later consume does not invoke the procedure and creates no obligation to execute any of its steps.

Only an explicit instruction from Op to a specific agent to `run codex-pr-branch.md`, including the equivalent linked-file instruction defined below, designates that agent as the procedure runner for the applicable handoff. Unless separately designated by Op, every other reading or editing agent stays within its own task and does not regenerate for this procedure, stage, commit, push, create or update a pull request, verify a merge, clean up a branch, or roll over to a successor branch. Encountering generated drift outside an active invocation means reporting the drift and its owning command, then leaving execution to the designated runner.

## Branch Naming Convention

The active branch series for this repo is currently the minerals/gemstones sequence, using the committed [mineral/gemstone branch registry](branch-series/minerals-gemstones.md). The moon sequence ended at `codex/sao` and is consumed. When a branch series is exhausted, continue with the next series in [Branch Series Rollover Order](#branch-series-rollover-order) rather than reusing retired branch names. The branch-series index and configured counts are tracked in [branch-series registry](branch-series/registry.md).

- Working branches should use `codex/<series-item-name>` by default.
- If a short topic suffix materially improves clarity, use `codex/<series-item-name>-<topic>`.
- Advance the active sequence one item at a time.
- Keep the series item prefix canonical even when using a topic suffix.
- Do not invent an unrelated branch name unless there is an explicit reason to step outside the active sequence.
- Series item names used in branch names must be lowercase branch tokens with no blanks.
- When a source item contains blanks, concatenate the words with hyphens for the branch token: use `codex/north-dakota` for the state name North Dakota, and `codex/salt-lake-city` for the city name Salt Lake City.
- When rolling over to the next branch, explicitly tell the operator/developer which series item was chosen and include a short factual blurb about that item.
- Present the branch-item facts under the operator explanation standard; they are required subject coverage rather than a separate response template.
- For an element branch, the blurb should identify the element name, symbol, and atomic number, then give one or two concise factual notes.
- For a non-element branch, the blurb should identify the canonical item name, the active series, the item's place in that sequence, and one or two concise factual notes.

This keeps the branch series ordered, memorable, and easy to reason about during rollover.

## Branch Series Rollover Order

The canonical series index, counts, registry status, and concrete registry files live in [branch-series/registry.md](branch-series/registry.md). Use that file and the active series registry to select the next token. Do not duplicate the full series list here; update the registry when policy changes.

## Principles

- Keep one clear canonical working branch at a time.
- Do not leave a session with unclear local state.
- A shared working branch may contain several coordinated workstreams. Publish that combined branch when its full branch-tip diff is coherent and reviewable; name every included workstream in the PR title or body rather than treating interleaved commits as a reason to split, rewrite, or stop.
- A merged pull request does not retire the local branch automatically. If you keep committing on that branch after merge, those later commits are new unmerged work.
- Do not delete a branch until its pull request is merged and local `main` matches remote `main`.
- Treat `git fetch origin` as remote-tracking refresh only. It does not update local `main`.
- Prefer ready PRs once a branch is genuinely reviewable.
- Use draft PRs only when the branch is intentionally not ready for real review.
- A green PR check run is not enough by itself. A ready PR must also be mergeable into the current base branch without conflicts.
- If a git command in the cleanup or rollover sequence fails, stop and resolve that exact failure before continuing to the next git step.
- In sandboxed environments, some local ref-updating commands may require escalation because Git needs to create lockfiles under `.git/refs`.

## Shared-Checkout Coordination

This repository normally uses one direct shared checkout. Multiple agents may edit, validate, commit, and push coordinated work on the same active branch. Git worktrees are not the default isolation mechanism here and must not be proposed merely because several agents are active.

- Define PR scope from the committed branch-tip diff and the operator's active directions, not from which agent made a commit or whether commits from several workstreams interleave.
- A combined PR is acceptable when its included workstreams can be stated plainly, its complete diff is reviewable together, and validation covers the resulting exact state. A coordinator should write that combined scope into the PR body.
- Do not ask for approval, require branch surgery, or propose a split merely because the branch contains coordinated lattice, theory, documentation, application, or mechanical-maintenance work.
- Preserve unrelated ambient edits by keeping them out of the candidate branch-tip scope. Stop only when ownership or overlap cannot be determined, when an edit would be overwritten or endangered, or when resolving it would require a substantive decision.

### Routine authority after Op invocation

Once Op explicitly instructs a specific agent to run this procedure, that invocation authorizes the healthy path all the way to the operator's PR-review handoff. Do not re-ask for approval for routine inspection, deterministic whitespace or generated-file repair, validation and retry, deliberate staging of the declared branch-tip scope, commit, ordinary non-force push, PR title/body preparation, PR creation or update, draft-to-ready transition, remote-check watching, or mergeability verification.

Ask only for a new decision: a semantic or product-design change not already directed, uncertain file ownership or destructive overlap, a non-deterministic validation failure, force push/history rewrite/rebase/reset/stash/discard, branch deletion outside the verified post-merge path, or merging the PR. Host permission dialogs remain host-controlled; request the narrow reusable approval needed by the documented command rather than asking the operator to re-authorize the repository step.

## Two-Handoff Invocation Contract

This procedure is designed to run with two operator/developer handoffs and no routine confirmation prompts between them.

### First handoff: publish a ready PR

The explicit instruction `run codex-pr-branch.md`, including the equivalent linked-file instruction, is standing authorization to execute the complete guarded publication path in this document:

- inspect the current working branch, identify the complete intended branch-tip scope (which may include several coordinated workstreams), and separate it from unrelated ambient worktree state;
- run the required regeneration and validation steps;
- repair branch-scoped mechanical drift when the repair is determined by an existing generator, validator, schema, index, path, or established terminology contract;
- stage only the intended files;
- create an intentional commit;
- push the current working branch without force;
- create or update its PR with an intentional title and body;
- move an intentionally complete draft PR to ready status;
- wait for required remote checks and verify mergeability; and
- capture the PR number, URL, branch name, `headRefOid`, base SHA, and final validation state as the publish handoff receipt; and
- return to the operator/developer only when the PR is ready for review or a stop condition has been reached.

This authorization covers routine retry after a transient, non-semantic failure, such as refreshing stale remote refs and repeating a check against the new refs. It does not authorize changing theory, EOM solver semantics, evidence authority, canon policy, or product design merely to make a check pass.

The operator/developer remains the merge gate. This invocation does not authorize the agent to merge, close, or abandon the PR.

### Second handoff: verify, clean up, and roll over

After the operator/developer merges the PR, either explicit instruction `merged, continue` or `merged, complete` is standing authorization to execute the complete guarded post-merge and rollover path in this document:

- verify the PR state, merge time, merged head, and absence of post-merge branch commits;
- fast-forward local `main` to current `origin/main` and verify equality;
- delete the exact verified merged working branch locally;
- delete that same branch remotely, or accept its confirmed prior absence;
- select the next unused token from the live branch-series registry;
- create the successor branch from the verified synchronized `main`;
- publish the successor branch without force and establish its upstream; and
- return the final cleanup, synchronization, and rollover state.

The registry token for this rollover may already be consumed. When a successor was created and published ahead of the merge under [continuous-development-during-pr-review.md](continuous-development-during-pr-review.md), that branch is this rollover's successor: verify its identity, alignment, and upstream, and record it as the rollover result. Do not select a further token, and do not create a second successor. Selecting a new token in that case skips a registry item and leaves two live branches claiming one rollover.

The conditional `git branch -D` fallback is included in this standing authorization only when GitHub confirms that the exact branch PR is merged, the post-merge commit scan is clean, local `main` equals `origin/main`, and ordinary `git branch -d` refused solely because the merge strategy did not preserve ancestry. No other local or remote branch deletion is authorized.

### No intermediate permission prompts on the healthy path

Do not ask the operator/developer to confirm each authorized step above. Provide concise progress updates while continuing, and pause only at a stop condition. A repository procedure can grant semantic authorization, but it cannot bypass a host application's filesystem or command sandbox. When the host requires approval, request the narrow reusable command prefix needed for this procedure rather than a one-off exact command whenever the host supports that choice. Shape routine commands consistently so previously approved narrow prefixes can be reused.

Do not introduce a repository-local wrapper whose approval would indirectly authorize arbitrary future script contents. The permitted authority is the documented guarded lifecycle, not a general shell or script execution capability.

#### Permission measurement

Measure unattended execution separately from ordinary progress reporting:

- an `operator decision prompt` asks the operator/developer to authorize, choose, or confirm a lifecycle step already covered by this contract;
- a `host permission prompt` is an interactive approval dialog emitted by the host application for filesystem, command, network, or external-service access;
- an `escalation invocation` is a tool call that requests elevated execution, whether a persisted narrow prefix resolves it silently or the host displays an approval dialog; and
- a `progress update` reports state while execution continues and is not a prompt.

Initialize and retain these counters for each handoff:

- `operatorDecisionPromptCount`;
- `hostPermissionPromptCount`;
- `escalationInvocationCount`; and
- `reusedApprovalCount`, for escalation invocations resolved non-interactively by a previously approved narrow prefix.

If the host does not expose whether an escalation produced an interactive dialog, report `hostPermissionPromptCount` as `unknown`, not zero. A handoff with an unknown count is complete as a Git lifecycle but does not qualify as a verified unattended run.

The healthy-path budget for each handoff is:

- `operatorDecisionPromptCount = 0`; and
- `hostPermissionPromptCount = 0`.

Persisted, non-interactive narrow-prefix reuse is permitted and is measured by `escalationInvocationCount` and `reusedApprovalCount`; it does not consume the interactive prompt budget.

#### Host-permission execution discipline

Apply these rules before issuing routine commands:

1. Run read-only Git inspection, `gh pr` inspection, and remote-check watching without preemptive escalation.
2. Do not escalate a command merely because it uses network access.
3. For a known protected Git write, use a direct command with the narrow, stable command shape already approved for that operation.
4. Do not wrap protected mutations in an orchestration layer when a direct command is sufficient; direct invocation makes narrow-prefix matching observable and reusable.
5. Keep read-only verification separate from a mutating command so the verification does not inherit the mutation's permission requirement.
6. Request escalation only after a real sandbox denial or for a command known to require protected Git metadata writes.
7. When a new host approval is unavoidable, request one narrow reusable prefix, record the interaction, and continue the authorized lifecycle. Do not replace it with repeated one-off approvals.
8. Never request a broad `git`, shell, interpreter, or repository-local-wrapper approval as a shortcut around this discipline.

A host permission prompt does not revoke the standing lifecycle authorization, but it makes that handoff nonqualifying for unattended-verification purposes. Report the event instead of silently claiming the no-prompt objective passed.

#### Three-run closed-loop acceptance

The unattended-execution correction is verified only after three consecutive healthy, fully completed two-handoff lifecycles satisfy all of the following:

- both handoffs meet the zero/zero healthy-path prompt budget;
- both handoff receipts include all four permission counters;
- PR identity, validation, merge, cleanup, and successor rollover satisfy this procedure; and
- the observation is recorded in [codex-pr-unattended-verification.md](codex-pr-unattended-verification.md).

A lifecycle stopped by a mandatory safety boundary does not count as a qualifying run. An operator decision prompt, host permission prompt, unknown host prompt count, missing permission counter, or false unattended claim breaks the consecutive sequence and resets the qualifying count to zero. Do not mark the corrective action closed before the ledger contains three consecutive qualifying runs.

### Mandatory pause boundary

Standing authorization ends and the agent must stop with an exact blocker map if any of the following occurs:

- intended scope cannot be identified from the branch-tip diff and active operator directions, or ambient edits overlap the files, staging area, validation result, or branch checkout needed by this procedure. Several coordinated workstreams or interleaved commits alone are not ambiguity;
- a merge conflict appears or local `main` cannot fast-forward;
- a branch has post-merge commits or its local, remote, and PR identities do not agree;
- a required repair needs theory, EOM solver, evidence-authority, canon-policy, architecture, or product-design judgment;
- a required check remains failing after deterministic branch-scoped mechanical repair;
- the next registry token is ambiguous or the active branch series is exhausted without a configured successor;
- authentication, connectivity, or GitHub state prevents verification;
- completing the path would require force push, rebase, reset, stash, restoration or discarding of work, broad deletion, or deletion of any branch other than the exact verified merged PR branch; or
- any action would exceed the explicit publication or post-merge scope above.

## Standard End-of-Session Process

Use this process whenever a work session is being wrapped up and the work is intended to leave the local machine.

### 1. Confirm scope

- Confirm that the branch-tip diff contains the intended combined scope. It may contain several coordinated workstreams; record those workstreams plainly for review.
- This repo often has concurrent agents in the same checkout, so unrelated dirty files can be normal ambient state. Keep them out of staging and committing unless the operator explicitly brings them into scope.
- If unrelated edits overlap the files needed for the PR, separate or resolve that overlap before staging or committing.

Commands:

```bash
git status -sb
git diff --stat
```

### 2. Resolve required generated drift

Textbook regeneration has two generated layers:

- `node scripts/build-scene-graph.mjs --write --strict` regenerates the scene graph, Textbook TOC data, and Textbook TOC markdown.
- `node scripts/build-textbook-md-pdf.mjs --write` regenerates the textbook reading-copy markdown under `content/generated/markdown/textbook/reading-copies/`.

Agent startup orientation has one generated operational layer:

- `node scripts/build-agent-startup-orientation.mjs --write` regenerates `reference/op/agent-startup-orientation.generated.md` from the current agent startup, prompt, style, and branch-process sources.

Use a full regeneration checkpoint when the operator/developer requests `regenerate`, `full regeneration`, `full regen`, `regeneration checkpoint`, or the exact prompt:

```text
Regenerate.
```

A full regeneration checkpoint means running the write commands above, staging the intended outputs, then running the exact-state PR gate in step 4. Do not run the write commands after every small code or documentation edit. For priority-only mathematics packets, stay in the targeted edit/check loop unless the packet is promoted into textbook-facing corpus material, changes scene/TOC inputs, or the operator/developer asks for a full regeneration checkpoint.

The iOS textbook package is on-demand and excluded from routine PR freshness requirements and full web-content regeneration checkpoints. A saved package may lag the current corpus without blocking a PR. Preserve the app and export software, and follow the [iOS packaging procedure](../../../apps/ios/ArchitrinoReader/README.md#on-demand-textbook-packaging) only when the operator requests an iOS build or iOS package work is in scope. Do not refresh it merely to accompany a corpus change. App Store release remains deferred until theory closure and an explicit operator release decision.

The children's-book pilot exports are also on-demand and excluded from routine PR output and full web-content regeneration. Preserve the tracked sources, manifest, QA and frozen appearance baseline; do not stage or publish the ignored `.local-data/childrens-books/` exports. When pilot manuscripts, source inventory, or export software change, use the focused checks in [the pilot export procedure](../../learning-office/childrens-books/production/README.md); render only when explicitly requested or needed to verify exporter work. The manifest's `on_demand` statuses do not depend on local export existence.

Outside this final branch/PR process, a generator `--check` drift report should be handed back with the exact `--write` command needed unless the operator/developer has explicitly requested regeneration or a fix-drift pass.

Regenerate both layers before the final check pass whenever a PR touches any source that can affect textbook PDF reading copies:

- textbook-facing markdown under `content/markdown/aaa/`,
- authored scene files that affect textbook ordering, inclusion, or section structure,
- textbook TOC generation inputs or outputs, including `content/graph/textbook_toc.json` and `content/generated/markdown/textbook/toc.md`,
- existing textbook reading-copy outputs under `content/generated/markdown/textbook/reading-copies/`.

The local browser PDF made from a reading-copy view is not a committed repo artifact.

During this final branch/PR process, if scene-graph, agent startup orientation, or textbook reading-copy drift is reported, regenerate before staging:

```bash
node scripts/build-scene-graph.mjs --write --strict
node scripts/build-agent-startup-orientation.mjs --write
node scripts/build-textbook-md-pdf.mjs --write
```

### 3. Stage only the intended files

- Prefer explicit file paths when there is any doubt.
- Use `git add -A` only when the whole worktree is in scope.
- After any generator write, inspect and stage the intended generated outputs before running the exact-state gate.
- The staging area is part of the validation identity. Any later staging change invalidates the receipt and requires the gate again.

Commands:

```bash
git add path/to/file1 path/to/file2
```

or, when the whole worktree is intentionally in scope:

```bash
git add -A
```

### 4. Run the exact-state PR gate

This gate is mandatory after final staging and before commit. It runs:

- foundational-impact routing against the exact current `origin/main`;
- the canonical content-integrity aggregate, including required web generated-artifact, terminology, taxonomy, runtime-smoke, and process-conformance checks, but not iOS package freshness; and
- animator runtime-wiring validation.

Command:

```bash
node scripts/pr-validation-receipt.mjs run --base origin/main
```

The runner captures the repository state before and after validation and refuses to write a receipt if the state changes during the checks. The local receipt records:

- a hash of every staged index entry;
- a hash of the complete unstaged binary diff and every non-ignored untracked file;
- the literal current branch name, base-ref label, and resolved `origin/main` object ID;
- the validation command-contract hash;
- Node and Git versions; and
- operating-system platform and architecture.

The receipt is local runtime state under `.local-data/pr-validation/receipt.v1.json` and is ignored by Git. It is evidence only that this exact local state already passed the named checks; it does not add evidence authority to any theory or computation.

The pre-commit and pre-push hooks verify all receipt fields. An exact match reuses the result. A missing, unreadable, mismatched, or stale receipt runs the complete gate and replaces the receipt only after success.

The pre-push hook may bypass both receipt verification and the full gate only when its separate policy requiring verification for advancement classifier proves that every ref update is one of these no-content cases:

- deletion of a remote ref; or
- creation of a `codex/*` branch whose local object ID exactly equals the current `origin/main` object ID.

Mixed updates, malformed input, an unavailable `origin/main`, an existing remote branch update, a non-`codex/*` ref, or any different object ID must verify a receipt or run the full gate.

### 5. Commit with a terse intentional message

- The commit should describe the actual completed unit of work, not a vague session summary.
- Do not alter the staging area after the exact-state gate. The pre-commit hook will reuse a matching receipt or run the full gate again.

Command:

```bash
git commit -m "Short intentional summary"
```

### 6. Push the working branch

- If the branch is new, push with upstream tracking.
- If the branch already exists remotely, push normally.

Commands:

```bash
git push origin <branch>
git branch --set-upstream-to=origin/<branch> <branch>
```

or

```bash
git push origin <branch>
```

### 7. Open or update a pull request

[Standard PR Process](#standard-pr-process) steps 3 through 6 own the publish-integrity gate, the mergeability gate, the existing-PR check, and the create, draft, and ready commands. Follow those steps rather than a second copy of them here.

Decide the PR title and body before running those steps. The title should be a clear reviewable statement rather than `gh pr create --fill` autofill, and the body should explain:

- what changed,
- why it changed,
- the user or developer impact,
- the root cause when the branch fixes a bug,
- and the checks used to validate it.

### 8. End the session in a scoped clean state

- Leave the files owned by this working branch clean: committed, intentionally staged, or intentionally carried into the next session.
- Do not promise a globally clean checkout when concurrent agents may have unrelated dirty files in the same repo.
- Do not leave unstaged experimental edits in the scoped files unless they are intentionally being carried into the next session.

Command:

```bash
git status -sb
```

## Standard PR Process

This is the normal branch-to-PR path for active implementation work.

### 1. Start from an explicit working branch

- If beginning from `main`, create the next `codex/<series-item-name>` or `codex/<series-item-name>-<topic>` branch in the active branch series.
- If beginning from `main`, first fast-forward local `main` to `origin/main` while checked out on `main`.
- If continuing a live branch with an open PR, remain on that branch.
- Do not create a new working branch merely because `origin/main` moved. A fetch alone is not enough.

Commands:

```bash
git checkout main
git fetch origin
git merge --ff-only origin/main
git checkout -b codex/<series-item-name>
```

### 2. Develop, validate, commit, and push

- Follow the end-of-session process above.

### 3. Confirm publish integrity before any PR action

- Do not open, update, or rely on a PR until the exact branch tip you want reviewed is both committed locally and present on the remote branch.
- Refresh remote-tracking refs first so all later decisions are based on the current `origin/main`, not stale local knowledge.
- The files owned by the PR should be clean at this point; unrelated ambient checkout changes must remain out of the PR.
- The local branch `HEAD` and `origin/<current-branch>` should resolve to the same commit.
- Also determine whether the branch actually contains work relative to the current base branch.
- Do not treat `HEAD == origin/<current-branch>` as evidence that there is nothing to publish. That only proves the branch tip is pushed.
- Before concluding that the workflow is a no-op, compare the current branch against `origin/main`.
- Do not skip this check just because `git push` printed success earlier in the session.
- Do not open or update a PR from `main`.

Suggested checks:

```bash
git fetch origin
git branch --show-current
git status -sb
git rev-parse HEAD
git rev-parse origin/<current-branch>
git rev-list --count origin/main..HEAD
git log --oneline origin/main..HEAD
git diff --stat origin/main..HEAD
```

Interpretation:

- if the current branch is `main`, stop and create or switch to a working branch first;
- if any PR-owned file has uncommitted work, or the staging area contains unrelated work, stop and resolve that scope before PR work;
- unrelated ambient files do not fail this gate by themselves when the branch-owned diff and staging scope can be verified independently and no later checkout would endanger them;
- if the two SHAs do not match, stop and push the branch tip you actually want reviewed before touching the PR.
- if `git rev-list --count origin/main..HEAD` is `0`, the branch currently has no commits beyond the base branch, so there is nothing to publish yet;
- if `git rev-list --count origin/main..HEAD` is greater than `0`, the branch contains reviewable work relative to base even if it is already pushed cleanly.

Only continue to PR checks after this gate passes.

### 4. Confirm the branch is still mergeable into the current base branch

- A branch can have clean local validation and passing PR checks and still be unmergeable because `main` moved underneath it.
- Do not open or keep a ready PR on a branch that GitHub reports as conflicted with the current base branch.
- Use the current remote base, not stale local `main`, for this gate.
- If the branch is not mergeable, stop PR publication under the mandatory pause boundary. Obtain any required reconciliation authority before a merge, rebase, or conflict repair; then rerun validation and repeat the publish checks.

Suggested local preflight:

```bash
git fetch origin
git merge-tree --write-tree HEAD origin/main
```

Interpretation:

- if `git merge-tree --write-tree` exits successfully, the local mergeability preflight passed;
- if it exits nonzero or reports conflicts, stop and reconcile the branch with current `origin/main` before PR publication;
- if the branch was already known to be recently rebased or merged with current `origin/main`, you may treat that as satisfying the local mergeability preflight;
- do not assume passing CI implies mergeability.

### 5. Check whether a PR already exists for the branch before opening or updating one

- This is the primary guard against continuing on a branch whose PR already merged.
- Do this after pushing the branch tip and before opening, updating, or relying on a PR.
- First determine whether the branch already has a PR.
- Also determine whether the branch has any commits beyond `origin/main` before treating an empty PR list as a no-op.
- If no PR exists yet, open a new one normally.
- If a PR exists and is still open, update that PR normally.
- If a PR exists and is already merged, stop immediately.
- In that merged-PR case, do not keep using that branch as the active branch for new work, even if the branch now has newer local commits.
- Instead, preserve the branch tip if needed, finish post-merge synchronization, create the next branch from synchronized `main`, and move the newer commits there deliberately.

Suggested checks:

```bash
git branch --show-current
git rev-parse HEAD
git rev-list --count origin/main..HEAD
gh pr list --head "<current-branch>" --state all --json number,state,mergedAt,headRefOid,headRefName,url
```

Resolve and verify the exact branch token with `git branch --show-current`, then use that literal token in later commands. Do not embed command substitution in a mutating or remote command.

Interpretation:

- if `gh pr list` returns an empty array and `git rev-list --count origin/main..HEAD` is greater than `0`, create a new PR;
- if `gh pr list` returns an empty array and `git rev-list --count origin/main..HEAD` is `0`, there is no PR yet because there is no branch work to publish yet;
- if `state` is `OPEN`, continue using that PR;
- if `state` is `MERGED` and `headRefOid` matches `HEAD`, the current branch tip is already what the merged PR contained, so roll over before doing more work;
- if `state` is `MERGED` and `headRefOid` does not match `HEAD`, the branch contains newer local commits that were not part of the merged PR, so stop and recover them onto a fresh branch before continuing.

This check should happen even if you believe you are "just updating the PR," because a merged PR is no longer updateable in the way an open PR is.

### 6. Open the PR in ready mode

- Open the PR in ready mode once the branch is coherent enough for real review.
- The minimum bar for a ready PR is:
  - the full local validation set that mirrors current hooks and repo CI passed, including `node scripts/smoke-option3.mjs`;
  - the branch tip intended for review is committed and pushed;
  - the PR-owned files are committed and the staging area contains no unrelated work;
  - any remaining ambient edits are outside PR scope and will not be endangered by the remaining branch operations;
  - the branch is mergeable into the current base branch;
  - the diff represents one coherent reviewable unit; it may contain multiple coordinated workstreams when the PR body states them plainly;
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
gh pr checks <pr-number> --watch
```

Then confirm GitHub mergeability:

```bash
git rev-parse HEAD
git rev-parse origin/main
gh pr view <pr-number> --json number,url,state,isDraft,mergeStateStatus,headRefName,headRefOid,baseRefName
```

Interpretation:

- if `gh pr checks --watch` finishes with all required checks passing, the ready PR gate has passed;
- if any required check fails, do not leave the branch represented as review-ready; fix the issue or convert the PR back to draft until it is genuinely ready;
- if `gh pr view --json mergeStateStatus` reports `DIRTY` or another conflicted state, the ready PR gate has not passed even if checks are green;
- in that conflicted case, convert the PR to draft and apply the mandatory pause boundary before reconciliation; closing the PR requires a separate operator decision;
- if GitHub connectivity or authentication is broken, treat the ready-PR publish step as incomplete and resolve that before declaring success.

### 7. Record the publish handoff receipt

Before returning the ready PR for operator/developer review, record:

- PR number and URL;
- `headRefName` and `headRefOid`;
- base branch name and the current `origin/main` SHA;
- ready/draft state and `mergeStateStatus`;
- local validation commands and their final pass state;
- remote check state;
- all four counters defined under [Permission measurement](#permission-measurement); and
- whether the first handoff qualifies under the zero/zero prompt budget.

The second handoff should use the exact PR number from this receipt. A later thread may fall back to branch-name discovery only when the receipt is unavailable, and it must stop if that discovery is not unique.

### 8. Respond to review on the same branch

- Keep follow-up fixes on the PR branch until the PR is merged.
- Do not branch from an unmerged feature branch to start the next line of work unless that dependency is intentional and explicitly accepted.

Commands:

```bash
git branch --show-current
gh pr view <pr-number> --json state,headRefName,headRefOid,url
git push origin <current-branch>
```

## Standard Post-Merge Synchronization Process

Use this process after the PR has been merged successfully.

Precondition:

- Before leaving the just-merged branch, run `git status -sb`.
- Continue only if the files owned by the merged branch are clean and the staging area contains no unrelated work.
- Unrelated ambient edits may remain when branch switching preserves them and they do not overlap this procedure's files or affect its validation. Do not stash, discard, restore, or commit those edits as part of rollover.
- If branch switching would overwrite or otherwise endanger any ambient edit, stop before leaving the merged branch.

### 1. Verify the PR is merged

- Confirm the PR merged on GitHub before cleaning up branches.

Command:

```bash
gh pr view <pr-number> --json number,state,mergedAt,headRefOid,headRefName,baseRefName,url
```

Interpretation:

- if `state` is not `MERGED` or `mergedAt` is absent, stop cleanup;
- require `headRefName` to equal the literal current branch name and `baseRefName` to equal `main`;
- retain `headRefOid` as the exact branch tip that entered operator review.

If the publish handoff receipt is unavailable, use the literal branch token as a fallback:

```bash
gh pr list --head "codex/<previous-topic>" --state all --json number,state,mergedAt,headRefOid,headRefName,baseRefName,url
```

Continue only when this fallback returns exactly one matching merged PR.

### 2. Check for post-merge commits on the branch before cleanup

- This is the disaster-prevention gate for the case where you accidentally kept working on the branch after its PR merged.
- Do this check before deleting the branch locally or remotely.
- If the local branch tip differs from the PR's `headRefOid`, treat the difference as branch work that was not part of the reviewed PR until an explicit commit-graph check accounts for it.
- If needed, preserve the branch tip under a recovery branch name before any deletion.
- Use commit identity rather than timestamps. `headRefOid` is the exact reviewed branch tip and is not sensitive to clock skew, backdated commits, or merge strategy.

Suggested checks:

```bash
git branch --show-current
git rev-parse HEAD
gh pr view <pr-number> --json state,headRefOid,headRefName,url
```

Interpretation:

- if the PR state is not `MERGED`, stop; this is not post-merge cleanup;
- if `headRefName` does not equal the current branch name, stop; the branch identity is not verified;
- if local `HEAD` equals `headRefOid`, the branch has no post-review local commits and cleanup may continue;
- if the SHAs differ, stop normal cleanup and run the commit-graph checks below.

```bash
git merge-base --is-ancestor <headRefOid> HEAD
git log --oneline --decorate <headRefOid>..HEAD
```

- if `headRefOid` is an ancestor of local `HEAD`, every commit printed by the range is post-review branch work and must be recovered;
- if `headRefOid` is not an ancestor, the branch diverged from the reviewed tip; preserve the current tip and resolve the divergence before cleanup;
- never infer safety from an empty timestamp window.

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

- Use the next item in the active branch series.
- The active series is currently the minerals/gemstones sequence; advance to the first unused item from the committed mineral/gemstone registry.
- An optional `-<topic>` suffix is allowed when it materially improves clarity, but the series item prefix should still advance in order.
- Create the branch only after local `main` has been fast-forwarded and verified against `origin/main`. The one accepted exception is the experimental pre-merge path in [continuous-development-during-pr-review.md](continuous-development-during-pr-review.md), which creates the successor from the reviewed parent head and then aligns it onto `main` after the squash merge. That path applies only when the operator explicitly asks for it; if a successor already exists under it, this rollover verifies that branch rather than creating one.
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
git checkout -b codex/<next-series-item>
```

### 2. Publish the next branch immediately

- Push the empty or early branch at the start of the new line of work when you want the branch identity to exist remotely from the beginning.

Command:

```bash
git push origin codex/<next-series-item>
git branch --set-upstream-to=origin/codex/<next-series-item> codex/<next-series-item>
```

This makes the next branch the new canonical branch in the series.

### 3. Continue work on that branch

- All new commits for the next unit of work should land there.
- Open the next PR only when the branch has a coherent reviewable unit.
- In the operator/developer-facing rollover response, include the series-item information required by [Final Response Requirements](#final-response-requirements).
- Report the item only after the new branch has been created and published, so the explanation identifies the actual branch in use.

Commands:

```bash
git branch --show-current
git status -sb
```

### 4. Record the post-merge handoff receipt

Before returning the completed rollover state, record:

- the exact merged PR number, URL, `headRefName`, and reviewed `headRefOid`;
- whether local `HEAD` matched that `headRefOid` before branch deletion;
- the synchronized local and remote `main` SHA;
- confirmation that the completed branch is absent locally and remotely;
- the successor branch name, remote publication state, upstream, and tip SHA;
- all four counters defined under [Permission measurement](#permission-measurement); and
- whether the second handoff and the full lifecycle qualify under the zero/zero prompt budget.

Update the unattended-verification ledger only from exact retained receipts and operator- or host-observed prompt counts. Never infer an unobserved interactive prompt count as zero merely to make a run qualify.

## Full Lifecycle State Sequence

The detailed sections above own the commands. This table defines the allowed state transitions without duplicating an executable script that can drift from those commands.

| Current state | Required evidence | Authorized transition |
| --- | --- | --- |
| Scoped working branch | Intended files identified; ambient edits isolated; required local gate passes | Stage intended paths, commit, and push the literal branch |
| Published branch tip | Local `HEAD` equals `origin/<current-branch>`; branch has commits beyond `origin/main`; `git merge-tree --write-tree` passes | Create or update the intentionally titled and described PR |
| Ready review handoff | Remote checks pass; GitHub reports mergeable; publish handoff receipt is recorded | Return the exact PR to the operator/developer for the sole merge decision |
| Verified merged PR | Exact PR reports `MERGED`; branch name and base match; local branch tip equals `headRefOid` | Fast-forward and verify local `main` |
| Synchronized `main` | Local `main` equals `origin/main`; exact merged branch identity remains verified | Delete only that local and remote branch |
| Retired merged branch | Previous branch is absent locally and remotely; next registry token is unambiguous | Create the successor from synchronized `main`, publish it, and set its upstream |

Any missing evidence leaves the process in its current state and activates the applicable stop condition. Do not skip forward to a later transition.

## Stop Conditions

Stop and resolve deliberately rather than pushing ahead if any of these are true:

- unrelated worktree edits overlap the intended scope, occupy the staging area, affect required validation, or would be endangered by branch switching,
- the required validation commands fail,
- you are about to open or update a PR but have not yet verified that the branch is clean and that local `HEAD` matches `origin/<current-branch>`,
- you are about to open or update a PR from `main`,
- you are about to open or update a PR for a branch but have not yet checked whether that branch already has a PR and whether that PR already merged,
- the branch already has a merged PR and you have not yet compared the merged PR head commit with the current local branch tip,
- the PR has not actually merged yet,
- the branch PR is already merged but you have not yet checked for post-merge local commits on that branch,
- local branch `HEAD` differs from the reviewed `headRefOid` and the divergent or post-review commits have not yet been recovered onto a safe branch,
- `git fetch origin` succeeded but local `main` was not actually fast-forwarded and verified,
- local `main` cannot fast-forward to `origin/main`,
- the next branch name breaks the active branch sequence without an explicit reason,
- a branch series is exhausted and the next configured series has not been selected or frozen as required,
- or the next branch would depend on unmerged work that is not meant to stay coupled.

## Final Response Requirements

When this procedure is executed, preserve the following handoff evidence and branch-item information. The [operator explanation standard](../operator-explanation-standard.md) owns response structure and live capture; the [academic style guide](../../../content/markdown/aaa/archie/academic-style-guide.md) owns exposition.

- Summarize the branch/PR outcome, cleanup state, and next-branch rollover state clearly enough that the operator/developer can verify the procedure actually completed.
- At the ready-PR handoff, report the publish handoff receipt: PR number and URL, `headRefName`, `headRefOid`, base SHA, local validation state, remote check state, mergeability state, and all four permission counters.
- At the post-merge handoff, identify the exact PR number used for verification and state whether local `HEAD` matched its reviewed `headRefOid` before deletion, then report all four permission counters for the second handoff.
- If a new branch was created, include the exact new branch name and whether it was published to `origin`.
- If a new branch was created from a named branch series, explain the item named by that branch.
- For a periodic-table branch, the element explanation includes, when applicable and known:
  - the atomic number,
  - the chemical symbol,
  - the broad classification such as noble gas, alkali metal, alkaline earth metal, transition metal, halogen, lanthanide, actinide, metalloid, or nonmetal,
  - whether it is a metal, nonmetal, or metalloid,
  - the usual electron-orbital configuration or shell/orbital description,
  - common ion or oxidation states,
  - and a few physically or chemically distinctive traits that help identify the element.
- For a non-element branch, identify the item name, the active series, its place or ordering rule, and verified distinctive facts.
- Explain enough to identify the item and its significance; the operator standard determines the appropriate length and presentation.

## Expected Outcome

After a healthy first handoff:

- the completed work is committed and pushed;
- the PR is open in ready mode with passing remote checks and verified mergeability; and
- the publish handoff receipt gives the operator/developer an exact review target and measurable permission counters.

After a healthy second handoff:

- the exact PR merge and reviewed branch tip have been verified;
- local `main` and remote `main` are synchronized;
- the previous branch has been deleted locally and remotely; and
- the next branch exists and is published from synchronized `main`; and
- the post-merge receipt records the second handoff's measurable permission counters.
