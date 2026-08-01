Closure goal: Find test and validator coverage gaps by comparing declared obligations with the checks that can actually establish them, without editing or running mutating workflows.

**Mandatory execution model:** Launch this prompt with `GPT-5.6 Luna` at `High` reasoning effort. This is an execution-model instruction, not a label.

# GPT-5.6 Luna Validation-Coverage Scout

Use this prompt for inexpensive, high-volume mapping of tests, validators, fixtures, contracts, and claims. It prepares coverage-gap packets; it does not implement tests or certify acceptance.

## Scope

Perform a full dragnet over exactly these two corpus areas on every run:

1. `content/markdown/aaa/`, the canonical textbook source directory;
2. `reference/`, the behind-the-scenes development corpus.

Inventory and scan both areas in full for explicit requirements, contract clauses, acceptance conditions, current claim statements, and references to implementations, tests, validators, fixtures, or independent oracles. Do not narrow the dragnet to a selected owner, queue row, workstream, claim family, subdirectory, or fallback. Do not add a third dragnet root. Follow an explicit corpus reference to code or a check outside these roots only when needed to verify a finding, and label that file as a verification endpoint rather than part of dragnet coverage.

Treat only explicit corpus statements as declared obligations; do not manufacture an obligation from nearby prose. If either root, a referenced owner, obligation, implementation path, or check surface is absent or internally inconsistent, return that exact condition as a numbered absence or gap finding and continue the full scan rather than requesting input or halting.

Read `AGENTS.md`, both complete corpus roots, and every target implementation, declared contract, test, or validator entrypoint needed to verify a located obligation. Work entirely read-only. Do not edit files, stage, commit, push, stash, reset, update snapshots, regenerate fixtures, run a generator in write mode, or make any external change. Do not run tests that mutate repository or external state.

## Scout method

Trace each declared obligation to the code path and to the check that exercises it. Distinguish execution coverage from an independent correctness oracle. A fixture, replay, golden file, or comparison produced by the subject path establishes determinism or parity only, unless an independent reference is named.

Assign every finding one status:

- `candidate`: apparent gap whose runtime reach or owner is not yet fully verified;
- `verified`: direct static evidence shows an obligation has no matching check, or a check cannot establish the claimed property;
- `stronger reviewer required`: mathematical validity, physical acceptance, independence, or contract interpretation needs a domain reviewer.

Preserve `derived`, `measured`, `inferred`, and `guessed` grades. Do not turn a passing validator into proof closure, physical acceptance, conservation, retained-branch evidence, release readiness, or score movement.

## Return

Post the following user-readable report in the task's final output and return the same report to the coordinator when a coordinator channel exists, so both can review and decide on the findings. Do not return the result only to a coordinator.

Start every substantive finding with a stable numbered label (`Finding 1`, `Finding 2`, and so on). If a root contains no matching obligation or coverage material, include a numbered `absence` finding for that root with the searches and coverage limits; do not return an empty list or ask for a target.

For each finding give:

1. status and severity;
2. obligation evidence at exact `path:line`;
3. implementation and check evidence at exact `path:line`;
4. what the current check actually establishes;
5. the uncovered behavior or independence gap, labeled fact or inference;
6. the smallest proposed follow-up for a stronger reviewer, without implementation;
7. a falsifier or command that would resolve the uncertainty read-only.

End with a compact obligation-to-check map, files inspected, commands run, and scan limitations. Treat unreachable or silent instrumentation as unknown, not a negative result.
