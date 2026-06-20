# Solver Model Contract

Status: `closeout-complete`

Kind: `contract-closeout`

Source task: `model_contract` in [solver.md](solver.md)

## Purpose

The solver model contract is the run-level declaration that identifies which $\mathbb{A}\mathbb{A}\mathbb{A}$ model a solver result used, which precision paths that model allows, which claim level the run asks the result to satisfy, and how the solver must fail when the declaration is incomplete or incompatible with the requested run.

The live app bridge names the model block `model`, while the task name is `model_contract`. This closeout treats `model_contract` as the conceptual contract composed of:

- the `model` object carried by run requests and manifests;
- the top-level `claimLevel`;
- the selected precision path and precision metadata;
- the status records and validation artifacts that define failure semantics.

No new runtime field name is required for the closeout.

## Final Fields

| Contract field | App-bridge field | Requirement |
| --- | --- | --- |
| Model id | `model.modelId` | Required non-empty stable id for the physical model family and app-facing solver contract. |
| Equation version | `model.equationVersion` | Required non-empty version for the equation set used by the run. |
| Force-law version | `model.forceLawVersion` | Optional version for force-law revisions when the equation version is not specific enough. |
| Constants hash | `model.constantsHash` | Required non-empty hash or versioned digest of constants that affect the result. |
| Causal speed policy | `model.causalSpeedPolicy` | Required non-empty policy id for the signal-speed rule used by causal-root and delayed-hit solves. |
| Branch policy | `model.branchPolicy` | Required non-empty policy id for retained roots, inactive gaps, branch transitions, and root rejection. |
| Unit convention | `model.unitConvention` | Required non-empty unit convention; run precision metadata and stream metadata must preserve it. |
| Compatible precision paths | `model.compatiblePrecisionPaths` | Required non-empty list of allowed precision paths from the bridge precision-path vocabulary. A requested `auto` path is only a selector; the final selected concrete path must still be compatible with the model. |
| Claim level | top-level `claimLevel` and precision metadata `claimLevel` | Required run-level claim. The current vocabulary is `interactive-preview`, `migration-parity`, `exported-dataset`, and `validation-evidence`. Claim level sets the minimum precision path and must not be silently downgraded. |
| Failure semantics | status records, admission result, precision summary, validation artifacts | Missing or invalid contract fields are `app_contract_error` or `precision_failed` errors. Incompatible selected precision paths, unsupported strict tolerances, memory or storage shortfalls, dense interaction overflow, and rejected admission are halt/error records. A response that cannot satisfy the requested claim level must fail closed, not return an ambiguous authoritative result. |

The precision-path vocabulary is inherited from [precision.md](precision.md): `auto`, `scaled_f64_fast`, `scaled_f64_strict`, `adaptive_multirate`, `event_root_focused`, `extended_precision`, and `validation_replay`.

## Contract Shape

The conceptual `model_contract` shape is:

```json
{
  "model": {
    "modelId": "aaa.central-solver",
    "equationVersion": "motion-root-v1",
    "forceLawVersion": "causal-delay-v1",
    "constantsHash": "constants:<digest-or-version>",
    "causalSpeedPolicy": "fixed-field-speed",
    "branchPolicy": "all-positive-roots",
    "unitConvention": "solver-si",
    "compatiblePrecisionPaths": [
      "scaled_f64_strict",
      "event_root_focused",
      "extended_precision",
      "validation_replay"
    ]
  },
  "claimLevel": "migration-parity",
  "failureSemantics": {
    "missingContractField": "app_contract_error/error",
    "unknownPrecisionPath": "precision_failed/error",
    "incompatibleSelectedPrecisionPath": "precision_failed/halt",
    "unsupportedEnvelopeOrBudget": "simulation_envelope_exceeded/halt",
    "claimUnsatisfied": "halt-or-error; do not publish as authoritative"
  }
}
```

This object is descriptive rather than a new schema demand. In the current bridge, `model` and `claimLevel` are separate run-request and manifest fields, and failure semantics are represented by normalized status records.

## Implemented Support

| Requirement | Current support |
| --- | --- |
| Required model fields | Implemented in the JSON schema as `$defs.solverModelContract` with required `modelId`, `equationVersion`, `constantsHash`, `causalSpeedPolicy`, `branchPolicy`, `unitConvention`, and `compatiblePrecisionPaths`; `forceLawVersion` is present and optional. See [schema.json](../../../src/contracts/solver-app-bridge/v1/schema.json). |
| TypeScript app contract | Implemented as `SolverModelContract` with the same fields. See [SolverAppBridgeContract.d.ts](../../../src/solver/app/SolverAppBridgeContract.d.ts). |
| Native model-contract type | Implemented as `ModelContract` with the same fields, including `forceLawVersion` and `compatiblePrecisionPaths`. See [SolverTypes.hpp](../../../src/solver/include/architrino/solver/SolverTypes.hpp). |
| App-side validation | Implemented in `validateModelContract`, including required-field errors, non-empty compatible precision paths, and rejection of unknown precision paths. See [SolverAppBridge.mjs](../../../src/solver/app/SolverAppBridge.mjs). |
| Native validation and admission | Implemented in `validate_model_contract` and `admit_simulation_envelope`, including missing-field validation, strict-tolerance rejection when the model lacks stricter precision paths, selected precision-path choice, and admission decisions. See [SolverContract.cpp](../../../src/solver/src/SolverContract.cpp). |
| ABI admission bridge | Implemented as a compact `ArchitrinoSolverModelContract` presence/mask struct, with `MODEL_CONTRACT_BYTES = 32` checked by app-bridge validation. See [SolverCAbi.hpp](../../../src/solver/include/architrino/solver/SolverCAbi.hpp), [SolverAppBridge.mjs](../../../src/solver/app/SolverAppBridge.mjs), and [check-solver-app-bridge.mjs](../../../scripts/check-solver-app-bridge.mjs). |
| Claim level vocabulary | Implemented in schema, TypeScript, JavaScript bridge logic, and native `ClaimLevel`: `interactive-preview`, `migration-parity`, `exported-dataset`, and `validation-evidence`. See [schema.json](../../../src/contracts/solver-app-bridge/v1/schema.json), [SolverAppBridge.mjs](../../../src/solver/app/SolverAppBridge.mjs), and [SolverTypes.hpp](../../../src/solver/include/architrino/solver/SolverTypes.hpp). |
| Claim-level precision floor | Implemented in the bridge and native precision solver: `interactive-preview` requires at least `scaled_f64_fast`, `migration-parity` and `exported-dataset` require at least `scaled_f64_strict`, and `validation-evidence` requires `validation_replay`. See [SolverAppBridge.mjs](../../../src/solver/app/SolverAppBridge.mjs) and [PrecisionPathSolver.cpp](../../../src/solver/src/PrecisionPathSolver.cpp). |
| Precision compatibility failure | Implemented by rejecting explicit requested paths or selected paths that are outside `model.compatiblePrecisionPaths`, with `precision_failed` halt status. See [SolverAppBridge.mjs](../../../src/solver/app/SolverAppBridge.mjs). |
| Run manifest preservation | Implemented: completed run manifests carry `model`, `claimLevel`, precision metadata, requested and selected precision paths, validation artifacts, and `modelContractHash`. See [schema.json](../../../src/contracts/solver-app-bridge/v1/schema.json) and [SolverAppBridge.mjs](../../../src/solver/app/SolverAppBridge.mjs). |
| Fixture and schema checks | Implemented: the contract fixture checker asserts that `solverModelContract` exists, and the app-bridge checker asserts the 32-byte model-contract ABI size. See [check-solver-contract-fixtures.mjs](../../../scripts/check-solver-contract-fixtures.mjs) and [check-solver-app-bridge.mjs](../../../scripts/check-solver-app-bridge.mjs). |
| Smoke coverage | Implemented: native self-test builds a valid `ModelContract`, validates it, admits envelopes, and verifies an invalid missing `modelId` fails. See [SolverSelfTest.cpp](../../../src/solver/src/SolverSelfTest.cpp). |

## Missing Or Intentionally Split

| Item | Status | Closeout decision |
| --- | --- | --- |
| Literal `model_contract` property in run schema | Missing by name. The schema uses `model`, and validation artifacts use `modelContractHash`. | No runtime change required. The conceptual task can close because the live schema already carries the model contract under the established app-bridge name. |
| Claim level inside `solverModelContract` | Split. `claimLevel` is a top-level run and manifest field, and precision metadata repeats it. | Keep split. Claim level is a run assertion, not an intrinsic property of the equation model. |
| Failure semantics inside `solverModelContract` | Split. Status taxonomy, admission responses, precision summaries, and validation artifacts carry failure behavior. | Keep split. Failure semantics belong to the run/admission result so they can include envelope, storage, worker, precision, and replay failures. |
| Full native string transport through admission ABI | Not present. The ABI passes presence bits plus compatible precision-path mask. | Accept for admission. The JavaScript/schema boundary preserves full strings, and native admission currently only needs presence and path compatibility. Add full-string ABI transport only if a native consumer must hash, persist, or compare the literal strings. |
| `auto` in compatible paths | Supported by schema and bridge vocabulary, but unsafe as the only compatible path because claim-level selection resolves to a concrete path. | Contract rule: list concrete compatible paths for any claim level the run may request; treat `auto` as a selector, not as sufficient compatibility evidence. |

## Completion Judgment

`model_contract` is complete and recorded in [solver.md](solver.md).

The closeout is complete because the required fields are defined, the live app schema and TypeScript surface contain the model object, app and native admission validate it, claim level and precision compatibility fail closed, and run manifests preserve the model contract with a `modelContractHash`.
