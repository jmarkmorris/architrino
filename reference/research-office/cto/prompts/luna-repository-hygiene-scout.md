Closure goal: Locate repository hygiene and reference-drift candidates without changing the working tree, and return exact evidence for maintainers to verify.

**Mandatory execution model:** Launch this prompt with `GPT-5.6 Luna` at `High` reasoning effort. This is an execution-model instruction, not a label.

# GPT-5.6 Luna Repository Hygiene Scout

Use this prompt for inexpensive, high-volume scans of links, names, paths, duplicated guidance, stale references, and canonical-owner drift. It identifies repair candidates; it does not perform cleanup.

## Scope

Perform a full dragnet over exactly these two corpus areas on every run:

1. `content/markdown/aaa/`, the canonical textbook source directory;
2. `reference/`, the behind-the-scenes development corpus.

Inventory and scan both areas in full for links, names, paths, duplicated guidance, stale references, canonical-owner drift, orphaned indexes, mismatched filenames and titles, and generated-source declarations. Do not narrow the dragnet to a selected owner, queue row, workstream, cluster, subdirectory, or fallback. Do not add a third dragnet root. Follow a referenced endpoint outside these roots only when needed to verify a finding, and label that file as a verification endpoint rather than part of dragnet coverage.

Treat an explicit source declaration, local README, architecture decision, generator header, or canonical terminology guide as an owner only after reading it. If either root contains no matching hygiene material, or a candidate's owner or endpoint is absent, return that exact condition as a numbered absence finding with the paths, checks, and zero-result searches; do not request input, halt, expand into theory review, or infer global hygiene from silence.

Read `AGENTS.md`, both complete corpus roots, and the owner set needed to verify each candidate. Work entirely read-only. Do not edit files, stage, commit, push, stash, reset, run a generator in write mode, or make any external change. Do not delete, rename, relink, or normalize anything.

## Scout method

Look for broken or stale relative links, moved-path references, contradictory duplicate guidance, obsolete terminology, orphaned indexes, mismatched filenames and titles, and generated-source drift. Distinguish a reference that is truly stale from a historical or compatibility reference that must remain literal.

Assign every finding one status:

- `candidate`: a suspicious reference or duplication not fully checked against its owner;
- `verified`: the current repository directly confirms the local hygiene defect;
- `stronger reviewer required`: intent, historical authority, generated ownership, or theory terminology requires a maintainer or domain reviewer.

Preserve `derived`, `measured`, `inferred`, and `guessed` claim grades in any affected prose. Do not infer theory closure, physical acceptance, conservation, release readiness, or score movement from a hygiene result.

## Return

Post the following user-readable report in the task's final output and return the same report to the coordinator when a coordinator channel exists, so both can review and decide on the findings. Do not return the result only to a coordinator.

Start every substantive finding with a stable numbered label (`Finding 1`, `Finding 2`, and so on). If a root contains no matching hygiene material, include a numbered `absence` finding for that root with the searches and coverage limits; do not return an empty list or ask for a target.

For each finding give:

1. status and hygiene category;
2. exact `path:line` evidence at every conflicting endpoint;
3. verified fact versus inference;
4. likely canonical owner, if located;
5. smallest candidate repair, described but not applied;
6. falsifier or follow-up check.

Group repeated instances only when each path and line is listed. End with files inspected, commands or searches run, scan limitations, and a short cluster summary. Do not claim absence of drift when the scan did not cover the relevant owner set.
