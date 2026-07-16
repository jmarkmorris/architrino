# Baseline Comparison Sandbox

Status: `closed-parity-harness`

Kind: `solver-validation-harness`

Source task: `baseline_comparison_sandbox` in [priorities.md](priorities.md)

Primary dependencies:

- [solver-contract.md](solver-contract.md)
- [analytic-and-invariant-validation.md](analytic-and-invariant-validation.md)
- [app-bridge-contract.md](app-bridge-contract.md)
- [cpp-clang-runtime-validation.md](cpp-clang-runtime-validation.md)

Implementation surfaces:

- `scripts/check-solver-baseline-sandbox.mjs`
- `scripts/check-solver-migration-parity.mjs`
- `src/solver/app/SolverBaselineComparison.mjs`

Generated evidence:

- `.tmp/solver-baseline-sandbox/manifest.json`
- `.tmp/solver-migration-parity/solver-migration-parity-report.json`

## Scope

The baseline comparison sandbox defines fixed app-facing solver cases for Photon,
Ideal Braid, and Animator. It runs those cases through the shared solver bridge,
writes artifact-only outputs under `.tmp/solver-baseline-sandbox`, hashes those
artifacts, classifies differences under the solver baseline vocabulary, and feeds
the ordered migration parity report.

The sandbox is validation infrastructure. It does not remove app-local fallback
logic, promote a bridge path to production default, or replace analytic and
invariant validation.

## Sandbox Rules

The harness enforces:

- no network access by design: cases run against local bridge/runtime fixtures;
- fixed no-randomness seed policy;
- controlled working directory under `.tmp/solver-baseline-sandbox`;
- artifact-only output;
- `writesToAppSource: false` in each artifact;
- resource caps and tolerance policies per case;
- artifact hashes in the manifest;
- normalized comparison classifications from the baseline vocabulary.

The classification vocabulary is:

- `baseline_within_tolerance`;
- `baseline_refined_result`;
- `baseline_model_boundary_difference`;
- `baseline_investigation_required_mismatch`.

Any missing required case, hash mismatch, duplicate case, unsupported
classification, or `baseline_investigation_required_mismatch` blocks migration
parity.

## Current Case Coverage

The live manifest contains 17 cases:

| App | Case count | Coverage |
| --- | ---: | --- |
| Animator | 4 | causal-root smoke, path-history smoke, motion dynamic replay smoke, worker solver bridge smoke |
| Photon | 8 | causal-root smoke, facade path, WebAssembly client path, circular-source roots/hits ledger facade and WebAssembly paths, normalized circular-source ledger, normalized circular-source run, phase diagnostics |
| Ideal Braid | 5 | causal-root smoke, shared geometry smoke, flight-time facade, flight-time WebAssembly client, self-hit WebAssembly client |

All 17 current cases classify as `baseline_within_tolerance`.

## Migration Parity Report

`scripts/check-solver-migration-parity.mjs`
consumes the sandbox manifest and checks the ordered migration plan:

1. Animator;
2. Photon;
3. Ideal Braid.

The current report status is `parity_ready_for_ordered_adapter_migration`, with
17 required cases, 17 evaluated cases, 17 ready cases, 0 blocked cases, and 0
missing cases.

## Completion Judgment

`baseline_comparison_sandbox` is complete as a harness-definition and parity
reporting task. The fixed cases, resource caps, no-source-write policy, artifact
manifest, hash validation, tolerance vocabulary, divergence classification, and
ordered migration parity report are implemented and passing.

Remaining app migration work belongs to the adapter tasks and to any future case
that changes classification away from `baseline_within_tolerance`.
