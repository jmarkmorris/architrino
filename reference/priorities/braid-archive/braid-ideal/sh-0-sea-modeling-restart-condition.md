# SH-0-Sea Modeling Restart Condition

Status: priority handoff, 2026-07-04.

Scope: this packet clarifies when the `SH-0-sea` modeling effort may restart after the isolated `SH-0` receiver-normal audit. It separates model construction from accepted retained-evidence claims.

## Verdict

`SH-0-sea` modeling can restart now as diagnostic/candidate model construction.

The required modeling input is the `SH-0` target identity: the central one-band/common-shell held-release braid with six architrinos on the shell, diametrically opposed binaries, and the axis-neutral angular-momentum frame. The current provider-backed candidate source object is:

- artifact: `held_release_seed_path_rows:5833f18e53586201`;
- retained record: `retained-record:held-release-six-point:adapter-acceptance-certificate`;
- source row: `two-speed-preferred-row:u0.8:v0.2`;
- provider object: `candidate:central_solver_retained_history_provider_object:7d4a8fe0a9792327`;
- provider hash: `7d4a8fe0a97923270179f2ca0b49b4bc0d6b6ba3251b26e82569bdb4bd1f91df`.

This target identity is enough to define the surrounding like-braid Noether sea rows, local target-sea frame row, boundary-condition row, sea-response equation, support/envelope variables, and action/exchange variables. It is not enough to claim accepted retained evidence.

The corrected dependency is:

1. candidate or accepted `SH-0` target identity for modeling;
2. accepted `SH-0` target/source record for accepted evidence claims;
3. `SH-0-sea` stabilization test on that target/source record;
4. possible accepted `SH-0-sea` retained branch only after same-record receiver-normal, action, wake, event, support, and sea-response rows close.

Isolated `SH-0` retained closure is not a prerequisite for starting the `SH-0-sea` model. The isolated `SH-0` audit only blocks retained-branch, force/action, stability, branch-chart, moving-certificate, observer-export, score movement, and corpus-promotion claims.

## Modeling Allowed Now

The restarted `SH-0-sea` modeling run may:

- use `held_release_seed_path_rows:5833f18e53586201` as the candidate central target identity;
- declare the like-assembly Noether sea population around that target;
- define the local target-sea frame and boundary-condition rows;
- derive or test a Noether sea pressure, tension, relaxation, or constitutive-response term;
- write a candidate sea-response row schema;
- propose reduced-radius or support/envelope equations for post-turn return, stable radius, breather behavior, or bounded limit cycle;
- report all outputs as diagnostic/candidate unless the accepted-source boundary below closes.

Current first model packet: [SH-0-Sea Diagnostic Candidate Model](sh-0-sea-diagnostic-candidate-model.md). It defines the candidate central target row, surrounding like-braid Noether sea population variables, local target-sea frame, boundary-condition row, candidate sea-response equation, support/envelope tests, action/exchange variables, and receiver-normal evidence requirements while preserving the accepted-evidence blocker.

## Evidence Claims Still Blocked

The modeling run must not claim accepted retained evidence until the accepted target/source boundary closes.

The first missing accepted object remains:

- object: `held_release_seed_path_rows_acceptance_certificate.v0`;
- field: `held_release_seed_path_rows.acceptance_certificate_ref`;
- artifact: `held_release_seed_path_rows:5833f18e53586201`;
- required accepted-ref prefix: `accepted:held-release-seed-path-rows:retained-record:held-release-six-point:adapter-acceptance-certificate:two-speed-preferred-row:u0.8:v0.2:`.

That certificate is a target/source certificate. It would certify that the six central `SH-0` seed/path rows are accepted as the target source object. It would not prove isolated `SH-0` retention.

After the seed-path certificate, the verifier still requires:

- `held_release_seed_path_rows_external_accepted_authority_package.v0`;
- repo authorization at `held_release_seed_path_rows.acceptance_certificate_ref`;
- the retained-source adapter same-record accepted-evidence package;
- accepted native root-ledger detail rows carrying `branchWeight`, `sourceNormalDenominator`, and `receiverNormalFactor`;
- same-record action closure, retained wake history, provider provenance, event/support rows, and the `SH-0-sea` sea-response row.

Only after those close can the result be classified as accepted `SH-0-sea` retained evidence.

## Commands To Recheck The Boundary

```bash
node scripts/braid-ideal/held-release-seed-path-rows.mjs --retained-record-id=retained-record:held-release-six-point:adapter-acceptance-certificate --source-row-id=two-speed-preferred-row:u0.8:v0.2 --provider-object-ref=candidate:central_solver_retained_history_provider_object:7d4a8fe0a9792327 --provider-artifact-hash=7d4a8fe0a97923270179f2ca0b49b4bc0d6b6ba3251b26e82569bdb4bd1f91df --print-acceptance-certificate-requirement --pretty
node scripts/braid-ideal/central-solver-retained-source-adapter-acceptance-certificate.mjs --retained-record-id=retained-record:held-release-six-point:adapter-acceptance-certificate --source-row-id=two-speed-preferred-row:u0.8:v0.2 --print-same-record-accepted-evidence-contract --pretty
node scripts/check-receiver-normal-clean-slate.mjs
```

## Handoff Prompt

```text
Closure goal: Restart SH-0-sea as a diagnostic/candidate modeling run while preserving the accepted-evidence blocker.

Work in /Users/markmorris/vibe/architrino. Start with git status --short --untracked-files=all. Stay in the shared checkout and do not revert unrelated changes.

Context:
- SH-0-sea modeling does not require isolated SH-0 retained closure.
- Use the central SH-0 target identity from held_release_seed_path_rows:5833f18e53586201 as the candidate target source object.
- The missing accepted target/source object remains held_release_seed_path_rows_acceptance_certificate.v0 at held_release_seed_path_rows.acceptance_certificate_ref.

Task:
Define the first SH-0-sea model packet: surrounding like-braid Noether sea rows, local target-sea frame row, boundary-condition row, candidate sea-response equation, support/envelope variables, action/exchange variables, and receiver-normal evidence requirements. Classify all outputs as diagnostic/candidate unless the accepted target/source certificate and same-record receiver-normal rows are present.

Expected output:
- Model rows or equations created.
- Exact accepted-evidence blocker still remaining.
- Clear yes/no on whether any retained-branch, Noether sea response, force/action, stability, branch-chart, moving-certificate, observer-export, score movement, or corpus-promotion claim is authorized.
```

## Classification

- Modeling start: unblocked as diagnostic/candidate work.
- Accepted `SH-0` target/source record: blocked at `held_release_seed_path_rows_acceptance_certificate.v0`.
- Accepted `SH-0-sea` retained evidence: blocked until target/source record, same-record receiver-normal rows, action/wake/event/support/provenance rows, and sea-response rows close.
- Corpus promotion: defer with blocker.
