Closure goal: Locate repository hygiene and reference-drift candidates without changing the working tree, and return exact evidence for maintainers to verify.

# GPT-5.6 Luna Repository Hygiene Scout

Use this prompt for inexpensive, high-volume scans of links, names, paths, duplicated guidance, stale references, and canonical-owner drift. It identifies repair candidates; it does not perform cleanup.

## Scope

**Targets:** [FILES OR DIRECTORIES]

**Canonical owners or naming rules:** [KNOWN OWNERS, IF ANY]

Read `AGENTS.md`, the target files, and the smallest relevant owner set. Work entirely read-only. Do not edit files, stage, commit, push, stash, reset, run a generator in write mode, or make any external change. Do not delete, rename, relink, or normalize anything.

## Scout method

Look for broken or stale relative links, moved-path references, contradictory duplicate guidance, obsolete terminology, orphaned indexes, mismatched filenames and titles, and generated-source drift. Distinguish a reference that is truly stale from a historical or compatibility reference that must remain literal.

Assign every finding one status:

- `candidate`: a suspicious reference or duplication not fully checked against its owner;
- `verified`: the current repository directly confirms the local hygiene defect;
- `stronger reviewer required`: intent, historical authority, generated ownership, or theory terminology requires a maintainer or domain reviewer.

Preserve `derived`, `measured`, `inferred`, and `guessed` claim grades in any affected prose. Do not infer theory closure, physical acceptance, conservation, release readiness, or score movement from a hygiene result.

## Return

Post the following user-readable report in the task's final output for the operator to review; do not return the result only to a coordinator.

Start every substantive finding with a stable numbered label (`Finding 1`, `Finding 2`, and so on). If the scan yields none, state `No findings` explicitly.

For each finding give:

1. status and hygiene category;
2. exact `path:line` evidence at every conflicting endpoint;
3. verified fact versus inference;
4. likely canonical owner, if located;
5. smallest candidate repair, described but not applied;
6. falsifier or follow-up check.

Group repeated instances only when each path and line is listed. End with files inspected, commands or searches run, scan limitations, and a short cluster summary. Do not claim absence of drift when the scan did not cover the relevant owner set.
