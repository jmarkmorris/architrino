Closure goal: Find documented test and validator coverage gaps by comparing declared obligations with the checks the Markdown corpus says can establish them, without inspecting code or running workflows.

**Mandatory execution model:** Launch this prompt with `GPT-5.6 Luna` at `High` reasoning effort. This is an execution-model instruction, not a label.

# GPT-5.6 Luna Validation-Coverage Scout

Use this prompt for inexpensive, high-volume mapping of tests, validators, fixtures, contracts, and claims. It prepares coverage-gap packets; it does not implement tests or certify acceptance.

## Scope

Perform a full dragnet over exactly these two corpus areas on every run:

1. `content/markdown/aaa/`, the canonical textbook source directory;
2. `reference/`, the behind-the-scenes development corpus.

Inventory and scan every Markdown file (`*.md`) under both areas in full for explicit requirements, contract clauses, acceptance conditions, current claim statements, and Markdown references to implementations, tests, validators, fixtures, or independent oracles. Do not narrow the dragnet to a selected owner, queue row, workstream, claim family, subdirectory, or fallback. Do not add a third dragnet root. Do not read, parse, inspect, execute, or use source code or any other non-Markdown file, even when a Markdown file cites it as a verification endpoint. Record the literal Markdown citation and mark the endpoint uninspected.

Treat only explicit Markdown corpus statements as declared obligations; do not manufacture an obligation from nearby prose. If either root, a Markdown owner, obligation, documented implementation path, or documented check surface is absent or internally inconsistent, return that exact condition as a numbered absence or gap finding and continue the full Markdown scan rather than requesting input or halting.

After reading `AGENTS.md` for startup policy, inspect only Markdown files within the two declared corpus roots. Work entirely read-only. Do not inspect source code, tests, validator implementations, data, fixtures, images, generated non-Markdown artifacts, or any other file type. Do not execute tests, validators, generators, or other programs. Do not edit files, stage, commit, push, stash, reset, update snapshots, regenerate fixtures, or make any external change.

## Scout method

Trace each declared obligation only to Markdown passages that describe the implementation path and the check said to exercise it. Treat a non-Markdown path as a literal citation, not inspected evidence. Distinguish documented execution coverage from a documented independent correctness oracle. A documented fixture, replay, golden file, or comparison produced by the subject path establishes determinism or parity only, unless the Markdown names an independent reference.

Assign every finding one status:

- `candidate`: apparent gap whose runtime reach or owner is not yet fully verified;
- `verified`: direct Markdown evidence shows an obligation has no matching documented check, or the documented check description cannot establish the claimed property;
- `stronger reviewer required`: mathematical validity, physical acceptance, independence, or contract interpretation needs a domain reviewer.

Preserve `derived`, `measured`, `inferred`, and `guessed` grades. Do not turn a passing validator into proof closure, physical acceptance, conservation, retained-branch evidence, release readiness, or score movement.

## Return

Post the following user-readable report in the task's final output and return the same report to the coordinator when a coordinator channel exists, so both can review and decide on the findings. Do not return the result only to a coordinator.

Start every substantive finding with a stable numbered label (`Finding 1`, `Finding 2`, and so on). If a root contains no matching obligation or coverage material, include a numbered `absence` finding for that root with the searches and coverage limits; do not return an empty list or ask for a target.

For each finding give:

1. status and severity;
2. obligation evidence at exact `path:line`;
3. Markdown evidence describing the implementation and check at exact `path:line`;
4. what the Markdown corpus says the current check establishes;
5. the uncovered behavior or independence gap, labeled fact or inference;
6. the smallest proposed follow-up for a stronger reviewer, without implementation;
7. a Markdown-only search or documentation change that would resolve the uncertainty, or the exact non-Markdown endpoint a stronger reviewer would need to inspect separately.

End with a compact obligation-to-check map, files inspected, commands run, and scan limitations. Treat unreachable or silent instrumentation as unknown, not a negative result.
