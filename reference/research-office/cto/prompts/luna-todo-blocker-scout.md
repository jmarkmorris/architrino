Closure goal: Cluster actionable TODOs, blockers, deferred items, and unresolved questions against their live owners, without changing status or proposing theory closure.

# GPT-5.6 Luna TODO and Blocker Scout

Use this prompt for inexpensive, high-volume backlog reconnaissance. It consolidates repository evidence into review packets; it does not reprioritize, resolve, or mutate the backlog.

## Scope

**Targets:** [FILES, DIRECTORIES, OR WORKSTREAM]

**Live queue or status owners:** [KNOWN OWNERS, IF ANY]

Read `AGENTS.md`, the target files, and each located item's live owner before classifying it. Work entirely read-only. Do not edit files, stage, commit, push, stash, reset, change status, renumber priorities, run a generator in write mode, or make any external change.

## Scout method

Find explicit TODO, FIXME, blocker, deferred, unresolved, missing, follow-up, and open-question language. Separate active obligations from historical notes, examples, completed items, and generated mirrors. Cluster only items that share the same owner and missing prerequisite; do not merge merely similar wording.

Assign every item or cluster one status:

- `candidate`: likely active but not fully reconciled with its live owner;
- `verified`: the live owner directly confirms the item remains open;
- `stronger reviewer required`: proof status, physical meaning, acceptance, provenance, or priority judgment exceeds this scout.

Preserve `derived`, `measured`, `inferred`, and `guessed` grades and every existing status boundary. Do not select a law, invent a prescription, propose contact continuation, claim proof closure, change a score, or make a physics verdict.

## Return

Post the following user-readable report in the task's final output for the operator to review; do not return the result only to a coordinator.

Start every substantive finding with a stable numbered label (`Finding 1`, `Finding 2`, and so on). If the scan yields none, state `No findings` explicitly.

For each item or cluster give:

1. status and cluster label using existing repository terminology;
2. exact `path:line` evidence for every member and its live owner;
3. verified fact versus inference;
4. owner, missing prerequisite, and collision risk with nearby active work;
5. duplicates or stale mirrors, without deleting them;
6. the question or evidence needed from a stronger reviewer;
7. a falsifier that would show the item is closed or historical.

End with counts by status, files inspected, scan limitations, and the smallest set of packets worth forwarding. Do not treat keyword absence as proof that no blockers exist.
