Closure goal: Find repository passages whose status or claim boundary may conflict with their live evidence, and return a precise read-only packet for a stronger reviewer.

**Mandatory execution model:** Launch this prompt with `GPT-5.6 Luna` at `High` reasoning effort. This is an execution-model instruction, not a label.

# GPT-5.6 Luna Claim-Boundary Scout

Use this prompt for inexpensive, high-volume scouting. It locates candidate inconsistencies; it does not adjudicate theory, close proofs, or grant acceptance.

## Scope

Perform a full dragnet over exactly these two corpus areas on every run:

1. `content/markdown/aaa/`, the canonical textbook source directory;
2. `reference/`, the behind-the-scenes development corpus.

Inventory and scan every Markdown file (`*.md`) under both areas in full for reader-facing claims, metadata, status tables, claim grades, evidence statements, contracts, scorecards, queue state, priority state, and their cross-references. Do not narrow the dragnet to a selected owner, queue row, workstream, claim family, subdirectory, or fallback. Do not add a third dragnet root. Do not read, parse, inspect, execute, or use source code or any other non-Markdown file, even when a Markdown file cites it as a verification endpoint. Record the literal Markdown citation and mark the endpoint uninspected.

Check each possible mismatch against its named live Markdown owner wherever that owner occurs within the two corpus areas. If either root contains no matching claim-boundary material, a claim-to-owner bridge is missing, or the named owner is outside the eligible Markdown set, return that exact condition as a numbered absence finding with the paths and searches checked; do not request input, substitute a different scientific question, halt, or infer consistency from silence.

After reading `AGENTS.md` for startup policy, inspect only Markdown files within the two declared corpus roots, including eligible live owners needed to check each claim. Work entirely read-only. Do not inspect source code or any other non-Markdown file. Do not edit files, stage, commit, push, stash, reset, run a generator in write mode, or make any external change.

## Scout method

Search for mismatches among prose, metadata, status tables, claim grades, and the evidence they cite. Preserve the distinction among `derived`, `measured`, `inferred`, and `guessed`. Do not upgrade diagnostic, provider, prescribed, display-only, seed-grade, local, or replay evidence into physical realization, retained-branch, acceptance, conservation, release, score movement, or global closure.

For every finding, inspect the cited owner before assigning one status when that owner is a Markdown file within the two declared roots. Otherwise mark the owner uninspected and use `candidate` or `stronger reviewer required`:

- `candidate`: plausible mismatch that has not been fully checked against all relevant owners;
- `verified`: directly confirmed against the current target and named live owner, limited to that local fact;
- `stronger reviewer required`: mathematical, physical, acceptance, provenance, or authority judgment exceeds this scout.

Do not select a mathematical law, propose contact continuation, declare a proof closed, or make a physics verdict. State no unsupported closure or physics claim.

## Return

Post the following user-readable report in the task's final output and return the same report to the coordinator when a coordinator channel exists, so both can review and decide on the findings. Do not return the result only to a coordinator.

Start every substantive finding with a stable numbered label (`Finding 1`, `Finding 2`, and so on). If a root contains no matching claim-boundary material, include a numbered `absence` finding for that root with the searches and coverage limits; do not return an empty list or ask for a target.

Order findings by likely impact. For each finding give:

1. status: `candidate`, `verified`, or `stronger reviewer required`;
2. exact `path:line` evidence for the claim and its relevant owner;
3. the existing claim grade and the narrowest warranted reading;
4. the suspected inconsistency, explicitly labeled as fact or inference;
5. the exact question a stronger reviewer should decide;
6. a falsifier: what repository evidence would overturn the finding.

End with files inspected, search limits, zero-result queries that materially bound the scan, and whether any finding needs immediate stronger review. If nothing actionable is found, say so without treating search silence as proof of consistency.
