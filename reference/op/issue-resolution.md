# GitHub Issue Resolution Process

This document defines the standard process for using GitHub issues as an operator/developer work queue in this repo. It covers three entry modes:

- a specific issue requested by number or URL;
- a requested set of issues;
- an open-ended scan for fixable issues.

The objective is to keep every issue lifecycle explicit: identify the right issue, understand its evidence, make a scoped fix, validate it, publish it through a pull request, and resolve the GitHub issue only when the repository state supports closure.

## Operating Principles

- Resolve the repository and issue scope before acting.
- Use the GitHub connector first for structured issue and pull request metadata when it is available.
- Use local `git` for checkout state, diffs, branches, commits, and local validation.
- Use `gh` where the connector is not sufficient, especially for current-branch PR discovery, GitHub Actions logs, issue comments, and issue closure.
- Inspect the live worktree before changing files.
- Do not overwrite unrelated local changes.
- Keep one issue fix narrow unless the operator/developer explicitly asks for a batch.
- Prefer a pull request body containing `Fixes #<issue>` when the PR should close the issue automatically on merge.
- Do not close an issue just because code was edited locally. Close it only after the fix is merged, or when the operator/developer explicitly chooses a different issue outcome.
- When an issue cannot be fully closed, leave a GitHub comment with the exact remaining blocker and keep the issue open.

## Scope Modes

### Specific Issue

Use this mode when the operator/developer gives an issue number, issue URL, title, or copied issue text.

Steps:

1. Resolve the repository and issue identifier.
2. Read the issue title, body, labels, assignees, linked pull requests, comments, and any screenshot or reproduction notes.
3. Restate the suspected user-facing failure in concrete terms.
4. Inspect the live code and generated/package artifacts that could explain the failure.
5. Fix only the issue's active failure unless a required adjacent fix is discovered.
6. Validate the fix with the narrowest reliable command set plus any repo-required checks for touched surfaces.
7. Publish a PR that links the issue with `Fixes #<issue>`.
8. After merge, confirm GitHub closed the issue. If it did not, close it manually with a short resolution comment.

### Issue Set

Use this mode when the operator/developer gives multiple issue numbers, labels, milestone, project view, or a theme.

Steps:

1. List every issue in the requested set.
2. Classify each issue as one of:
   - ready to fix now;
   - needs more reproduction or design context;
   - duplicate or already resolved;
   - too broad for the current pass;
   - blocked by another issue or PR.
3. Choose an execution strategy:
   - one PR per issue when the fixes are independent;
   - one PR for a tightly coupled set when the same code path and validation cover all issues;
   - triage-only when the set is not implementation-ready.
4. For each fixed issue, include a closure keyword in the PR body.
5. For each deferred issue, add a GitHub comment that states the reason it remains open and the next concrete action.

Do not silently merge multiple unrelated issue fixes into one branch. If the set contains mixed domains, split the work.

### Open-Ended Scan For Fixable Issues

Use this mode when the operator/developer asks to find fixable issues without naming a specific issue.

Suggested GitHub queries:

```bash
gh issue list --state open --limit 50 --json number,title,labels,assignees,updatedAt,url
gh issue list --state open --label bug --limit 50 --json number,title,labels,assignees,updatedAt,url
gh issue list --state open --search "label:bug no:assignee" --limit 50 --json number,title,labels,assignees,updatedAt,url
```

Selection criteria for a good candidate:

- has a clear user-facing failure or missing behavior;
- includes reproduction steps, screenshots, logs, or affected files;
- maps to a bounded code or content surface;
- can be validated locally;
- is not blocked by unresolved product, theory, policy, or design decisions;
- does not require broad generated-output churn unless that churn is the actual fix.

Report the short candidate list before starting implementation unless the operator/developer explicitly gave permission to pick and fix autonomously.

## Intake Checklist

For every issue selected for work, capture:

- issue number and URL;
- title and labels;
- current state and assignee;
- reader/app/repo context supplied by the reporter;
- package version, app version, commit, branch, or date if provided;
- reproduction path;
- expected behavior;
- actual behavior;
- suspected affected files;
- validation commands that will prove the fix.

If the issue contains screenshots or attachments, inspect them when available. If the issue references package data, generated artifacts, or build outputs, verify those artifacts in the live checkout before relying on stale assumptions.

## Investigation Process

1. Check local state:

```bash
git status --short
git branch --show-current
git diff --stat
```

2. Read the relevant code, content, generated package data, tests, and documentation.
3. Search for the same pattern elsewhere in the repo.
4. Identify the exact cause before editing.
5. State the fix boundary:
   - files expected to change;
   - files expected not to change;
   - generated outputs expected or not expected;
   - checks required for closure.

When a generated artifact appears stale, run the generator in `--check` mode first. Regenerate only when the generator proves drift or the issue requires regenerated output.

## Implementation Process

1. Make the smallest coherent fix that addresses the issue.
2. Preserve established project terminology and local code patterns.
3. Keep large entrypoint files limited to setup when practical; put discrete behavior in focused helpers or services when the surrounding architecture supports it.
4. Add or adjust tests when the bug is covered by an existing test layer or the touched behavior has meaningful regression risk.
5. Avoid unrelated cleanup.
6. Re-check the exact issue reproduction path after editing.

If the issue reveals a larger architectural problem, fix the immediate bug first, then leave a follow-up issue or comment for the broader work.

## Validation Process

Always run:

```bash
git diff --check
```

Then run the checks required by the changed surface.

For content and scene graph work, typical checks are:

```bash
node scripts/validate-content.mjs --check --strict
node scripts/build-scene-graph.mjs --check --strict
node scripts/build-textbook-md-pdf.mjs --check
```

Use [codex-pr-branch.md](git/codex-pr-branch.md) for the full branch, commit, push, and PR validation set.

The iOS textbook package is on-demand; ordinary corpus and PR work does not require its regeneration or freshness validation. For explicitly requested iOS Reader package work, follow the [on-demand packaging procedure](../../apps/ios/ArchitrinoReader/README.md#on-demand-textbook-packaging). Typical checks for that scope are:

```bash
node scripts/export-ios-textbook-package.mjs --check --strict
xcodebuild -project apps/ios/ArchitrinoReader/ArchitrinoReader.xcodeproj -scheme ArchitrinoReader -destination 'generic/platform=iOS Simulator' CODE_SIGNING_ALLOWED=NO build
xcodebuild -project apps/ios/ArchitrinoReader/ArchitrinoReader.xcodeproj -scheme ArchitrinoReader -configuration Release -destination 'generic/platform=iOS' CODE_SIGNING_ALLOWED=NO build
```

For app/runtime JavaScript work, run the relevant `node --check`, `node --test`, app-specific smoke script, or browser verification path used by that app.

If a command cannot run, record:

- the exact command;
- the exact failure or missing dependency;
- whether the failure blocks issue closure;
- the replacement evidence used, if any.

## Pull Request Process

Follow [codex-pr-branch.md](git/codex-pr-branch.md) for branch, commit, push, and PR mechanics.

The PR body for an issue fix should include:

- issue link and closure keyword, usually `Fixes #<issue>`;
- root cause;
- summary of the fix;
- user-facing behavior after the fix;
- files changed;
- reproduction path tested;
- validation commands and results;
- any remaining QA that must happen outside the local environment.

Before opening or updating a PR, confirm:

```bash
git status -sb
git diff --stat origin/main..HEAD
gh pr list --head "$(git branch --show-current)" --state all --json state,isDraft,url,number,title
```

If a PR already exists, update it instead of opening a duplicate.

## GitHub Issue Resolution

### Preferred Closure Path

Use the PR body to close the issue automatically on merge:

```markdown
Fixes #<issue>
```

After the PR merges:

1. Confirm the PR is merged.
2. Confirm the issue is closed.
3. If the issue remains open, close it manually only after verifying the merged PR contains the intended fix.

Manual confirmation commands:

```bash
gh pr view <pr-number> --json state,mergedAt,url
gh issue view <issue-number> --json state,title,url
```

If manual closure is needed:

```bash
gh issue comment <issue-number> --body "Resolved by <PR URL>. Verified with: <checks>."
gh issue close <issue-number> --comment "Resolved by <PR URL>."
```

### Partial Resolution

If the PR fixes only part of an issue:

- do not use `Fixes #<issue>`;
- use `Refs #<issue>` or `Part of #<issue>`;
- comment on the issue with what was fixed and what remains;
- leave the issue open.

### Duplicate Or Invalid Issues

If an issue is a duplicate:

1. Link the canonical issue.
2. Comment with the reason.
3. Close the duplicate only when the duplicate relationship is clear.

Suggested command:

```bash
gh issue close <issue-number> --comment "Duplicate of #<canonical-issue>."
```

If an issue cannot be reproduced:

1. State the attempted reproduction path.
2. Ask for the missing detail.
3. Leave the issue open unless the operator/developer explicitly chooses closure.

## Batch Closure Rules

For multiple issues fixed by one PR:

- list every issue explicitly in the PR body;
- use `Fixes #<issue>` only for issues fully resolved by the PR;
- use `Refs #<issue>` for issues only touched or partially improved;
- after merge, verify each issue state individually.

For multiple PRs fixing one issue:

- use `Refs #<issue>` on intermediate PRs;
- use `Fixes #<issue>` only on the final PR that completes the issue;
- keep an issue comment updated with the remaining checklist.

## Handoff Template

Use these evidence fields as needed under the [operator explanation standard](operator-explanation-standard.md); record durable issue state in the owning priority material:

```markdown
Issue: #<issue> <title>
Cause: <exact cause found in the live code/content/data>
Changed: <files changed>
Tested: <specific reproduction paths or issue examples>
Validation: <commands and pass/fail results>
GitHub: <PR URL, issue state, or closure action>
Remaining QA: <device/manual/external checks still needed>

```

## Do Not Close Conditions

Leave the issue open when:

- the fix is local but not merged;
- validation did not run and the missing validation matters;
- the PR only partially resolves the report;
- a physical device, external account, or production environment still needs to confirm the behavior;
- the issue asks for a product or theory decision that has not been made;
- the reporter's reproduction path has not been checked and no equivalent proof exists.

In those cases, comment with the current evidence and the next concrete closure condition.
