Closure goal: Find repository passages whose status or claim boundary may conflict with their live evidence, and return a precise read-only packet for a stronger reviewer.

# GPT-5.6 Luna Claim-Boundary Scout

Use this prompt for inexpensive, high-volume scouting. It locates candidate inconsistencies; it does not adjudicate theory, close proofs, or grant acceptance.

## Scope

**Targets:** [FILES, DIRECTORIES, OR CLAIM FAMILY]

**Live owners:** [KNOWN STATUS, CONTRACT, SCORECARD, OR PRIORITY OWNERS]

Read `AGENTS.md`, the target files, and only the nearby live owners needed to check each claim. Work entirely read-only. Do not edit files, stage, commit, push, stash, reset, run a generator in write mode, or make any external change.

## Scout method

Search for mismatches among prose, metadata, status tables, claim grades, and the evidence they cite. Preserve the distinction among `derived`, `measured`, `inferred`, and `guessed`. Do not upgrade diagnostic, provider, prescribed, display-only, seed-grade, local, or replay evidence into physical realization, retained-branch, acceptance, conservation, release, score movement, or global closure.

For every finding, inspect the cited owner before assigning one status:

- `candidate`: plausible mismatch that has not been fully checked against all relevant owners;
- `verified`: directly confirmed against the current target and named live owner, limited to that local fact;
- `stronger reviewer required`: mathematical, physical, acceptance, provenance, or authority judgment exceeds this scout.

Do not select a mathematical law, propose contact continuation, declare a proof closed, or make a physics verdict. State no unsupported closure or physics claim.

## Return

Post the following user-readable report in the task's final output for the operator to review; do not return the result only to a coordinator.

Start every substantive finding with a stable numbered label (`Finding 1`, `Finding 2`, and so on). If the scan yields none, state `No findings` explicitly.

Order findings by likely impact. For each finding give:

1. status: `candidate`, `verified`, or `stronger reviewer required`;
2. exact `path:line` evidence for the claim and its relevant owner;
3. the existing claim grade and the narrowest warranted reading;
4. the suspected inconsistency, explicitly labeled as fact or inference;
5. the exact question a stronger reviewer should decide;
6. a falsifier: what repository evidence would overturn the finding.

End with files inspected, search limits, zero-result queries that materially bound the scan, and whether any finding needs immediate stronger review. If nothing actionable is found, say so without treating search silence as proof of consistency.
