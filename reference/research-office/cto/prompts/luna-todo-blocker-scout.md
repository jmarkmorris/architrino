Closure goal: Cluster actionable TODOs, blockers, deferred items, and unresolved questions against their live owners, without changing status or proposing theory closure.

**Mandatory execution model:** Launch this prompt with `GPT-5.6 Luna` at `High` reasoning effort. This is an execution-model instruction, not a label.

# GPT-5.6 Luna TODO and Blocker Scout

Use this prompt for inexpensive, high-volume backlog reconnaissance. It consolidates repository evidence into review packets; it does not reprioritize, resolve, or mutate the backlog.

## Scope

Perform a full dragnet over exactly these two corpus areas on every run:

1. `content/markdown/aaa/`, the canonical textbook source directory;
2. `reference/`, the behind-the-scenes development corpus.

Inventory and scan every Markdown file (`*.md`) under both areas in full for explicit TODO, FIXME, blocker, deferred, unresolved, missing, follow-up, and open-question language. Do not narrow the dragnet to a selected owner, queue row, workstream, phrase family, subdirectory, or fallback. Do not add a third dragnet root. Do not read, parse, inspect, execute, or use source code or any other non-Markdown file, even when a Markdown file cites it as a verification endpoint. Record the literal Markdown citation and mark the endpoint uninspected.

Resolve the live Markdown queue, status, or canonical owner separately for every located item or cluster; owner lookup must not reduce scan coverage. If either root contains no matching material, an item's owner or prerequisite is absent, or the cited owner is outside the eligible Markdown set, return that exact condition as a numbered absence finding with the paths and searches checked; do not request input, choose an unrelated backlog, halt, or infer that an item is closed.

After reading `AGENTS.md` for startup policy, inspect only Markdown files within the two declared corpus roots and each eligible Markdown live owner before classifying an item. Work entirely read-only. Do not inspect source code or any other non-Markdown file. Do not edit files, stage, commit, push, stash, reset, change status, renumber priorities, run a generator in write mode, or make any external change.

## Scout method

Find explicit TODO, FIXME, blocker, deferred, unresolved, missing, follow-up, and open-question language. Separate active obligations from historical notes, examples, completed items, and generated mirrors. Cluster only items that share the same owner and missing prerequisite; do not merge merely similar wording.

Assign every item or cluster one status:

- `candidate`: likely active but not fully reconciled with its live owner;
- `verified`: an eligible live Markdown owner directly confirms the item remains open;
- `stronger reviewer required`: proof status, physical meaning, acceptance, provenance, or priority judgment exceeds this scout.

Preserve `derived`, `measured`, `inferred`, and `guessed` grades and every existing status boundary. Do not select a law, invent a prescription, propose contact continuation, claim proof closure, change a score, or make a physics verdict.

## Return

Post the following user-readable report in the task's final output and return the same report to the coordinator when a coordinator channel exists, so both can review and decide on the findings. Do not return the result only to a coordinator.

Start every substantive finding with a stable numbered label (`Finding 1`, `Finding 2`, and so on). If a root contains no matching TODO or blocker material, include a numbered `absence` finding for that root with the searches and coverage limits; do not return an empty list or ask for a target.

For each item or cluster give:

1. status and cluster label using existing repository terminology;
2. exact `path:line` evidence for every member and its live owner;
3. verified fact versus inference;
4. owner, missing prerequisite, and collision risk with nearby active work;
5. duplicates or stale mirrors, without deleting them;
6. the question or evidence needed from a stronger reviewer;
7. a falsifier that would show the item is closed or historical.

End with counts by status, files inspected, scan limitations, and the smallest set of packets worth forwarding. Do not treat keyword absence as proof that no blockers exist.
