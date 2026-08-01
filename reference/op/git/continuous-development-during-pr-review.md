# Continuous Development During PR Review

## Status

Experimental procedure. This documents a controlled test of continuing new
work while a parent pull request is under operator review. It does not replace
[codex-pr-branch.md](codex-pr-branch.md). Promote it into that standard
procedure only after repeated successful use demonstrates that it preserves
review clarity, commit identity, and the shared-checkout workflow.

## Purpose

After a parent PR is ready for review, create its named successor from the
parent's exact reviewed head and continue work immediately on that successor.
The parent PR remains frozen for review. The operator may continue using squash
merge.

Plainly: the next branch begins as a copy of the exact work sent for review,
then receives only the new work. The PR being reviewed does not keep changing.

## When To Use This Procedure

Use only when the operator explicitly asks to continue implementation while a
ready parent PR is under review. Otherwise use the ordinary publish, merge,
and rollover lifecycle in [codex-pr-branch.md](codex-pr-branch.md).

This procedure needs one shared-checkout coordination pause before the branch
switch. All local agents must finish, commit, or intentionally carry their
changes so the checkout can switch without overwriting work.

## Terms

- **Parent PR:** the ready PR currently under operator review.
- **Parent head:** the exact committed and pushed branch tip represented by
  that PR.
- **Successor:** the next named branch, created from the parent head.
- **Successor-only commits:** commits made after the successor is created.
- **Alignment:** after the parent is squash-merged, replaying successor-only
  commits onto the newly merged `main` tip.

## Experimental Workflow

### 1. Freeze and receipt the parent PR

Before creating the successor, verify and record:

- parent PR number, URL, branch name, base, ready state, and exact
  `headRefOid`;
- local `HEAD` equals that parent head;
- remote parent branch equals that same head;
- validation receipt, remote checks, and mergeability are current; and
- the shared checkout is safe to switch.

After this receipt, do not add ordinary new work directly to the parent branch.
If review requires a parent fix, handle that fix deliberately under the parent
PR process and re-establish the parent receipt before continuing this
experiment.

### 2. Create and publish the successor

1. Reserve the next branch-series token and record the parent PR/head from
   which it is created.
2. Create the successor at the literal parent head and publish it with an
   upstream before switching the shared checkout to it.
3. Verify that the parent branch, remote parent head, and successor's initial
   commit all identify the same commit.
4. Switch the shared checkout to the successor only after the coordination
   pause is clear.

At this point the operator resumes ordinary work on the successor. The parent
PR remains unchanged in the background.

### 3. Keep the two review surfaces distinct

- New commits belong only on the successor.
- The parent PR's remote branch stays frozen except for deliberate review
  repairs.
- Do not open the successor as a ready PR against `main` while its parent is
  still unmerged. If an early review is useful, use a draft PR whose base is
  the parent branch and label it a dependent review.
- Record the first successor-only commit. It is the boundary needed for later
  alignment.

### 4. Align after squash merge

Once the operator squash-merges the parent PR:

1. Verify the parent PR is merged and record its reviewed head and GitHub
   squash-merge commit.
2. Preserve the exact successor tip under a temporary recovery ref before any
   history rewrite.
3. Synchronize local `main` with `origin/main` and verify the merged commit.
4. Replay only successor-only commits onto synchronized `main`; the parent
   commits are already represented by the squash merge.
5. Verify every intended successor-only commit is present, no parent-only
   commit is duplicated, and the successor diff against `main` contains only
   the new work.
6. Run the exact-state validation gate again, then update the successor remote
   with the guarded non-destructive equivalent for this alignment.
7. Keep the recovery ref until the successor head, remote head, validation,
   and expected commit set all agree.

Plainly: squash merge gives `main` a new commit identity. Alignment puts the
new work on top of that new identity, without re-submitting the already merged
parent work.

## Mandatory Stops

Stop and return an exact blocker map if:

- parent PR/head/base identity is not exact;
- the shared checkout cannot switch without endangering an agent's edits;
- a parent review repair changes the recorded parent boundary;
- the successor contains commits whose parent/successor classification is not
  clear;
- alignment would drop, duplicate, or reorder intended work ambiguously;
- validation fails after alignment; or
- the required remote update would be broader than the verified successor
  branch.

Never delete the parent branch, successor, or recovery ref while any required
identity or containment check is unresolved.

## First-Test Acceptance

This experimental procedure passes one trial only when all of the following
are recorded:

- the parent PR remained reviewable at its frozen head;
- work continued on the published successor before the parent merged;
- the operator squash-merged the parent PR;
- the successor was aligned to the resulting `main` without losing or
  re-submitting parent work;
- successor validation, remote identity, and mergeability passed; and
- the shared checkout transition did not endanger concurrent agent work.

Record the trial in the relevant PR receipt or a dated work-log entry. Do not
declare this the standard lifecycle until the operator accepts the test result.
