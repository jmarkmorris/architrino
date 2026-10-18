# Ordinary Integration of Validated Evolution, Stage O0: Interface Map and Design

The [ordinary integration scope](../contracts/matched-pair-ordinary-integration-scope.md) asks for the accepted validated evolution engine to be reachable through the maintained ordinary EOM interfaces, by explicit opt-in, with the default route unchanged. This record is the O0 packet's design half: what the ordinary interfaces are, measured on the current source, and how the validated method should enter each of them. The baseline half is the [O0 baseline receipt](../evidence/matched-pair-ordinary-stage-0-baseline-receipt-2026-10-14.md). Nothing here is implemented. Every instance uses $c_f=1$.

## 1. The engine being exposed

One driver, `evolve_validated_far_step_histories`, with its own request type `ValidatedEvolutionRequest` and certificate `ValidatedEvolutionCertificate`, accepted on the live solver through four increments. It encloses the acceleration over the whole step, publishes producer-issued evidence, binds its controls in a sealed continuation, optionally encloses declared matched pairs by a whole-step interval, runs receivers on worker threads deterministically, and can be written as a run record and restored by replay through `ValidatedRunRecord`. Its certificate already carries the run in the ordinary `NativeCoupledEvolutionCertificate` shape, under schema `eom_validated_far_step_evolution_certificate/v1`.

Integration adds no mathematics. It does not make ordinary step-doubling cubics validated, and it does not let the ordinary predictor or corrector consume the grouped snapshot route.

## 2. The ordinary interfaces, measured

Read on 2026-10-14 from the committed tree at `2a24acaca073`, whose `src/eom` equals the accepted increment 4 inventory of 93 files by `shasum -a 256 -c`, and which `git --no-optional-locks status --short -- src/eom` shows clean. The wire, CLI, checkpoint and consumer facts were gathered by a read-only search of `ProviderTransport.cpp`, `Checkpoint.cpp`, `EquationRegistry.cpp`, `src/eom/native/`, `scripts/` and `src/apps/`, and checked against the files where this record quotes them.

| Layer | Owner | What it is today | Method selection today |
| --- | --- | --- | --- |
| Typed request | `NativeCoupledEvolutionRequest`, `CoupledEvolution.hpp` | One struct for every ordinary route | None. `matched_pair_enclosure_policy` selects the snapshot grouping only; `equation_selection.method` is the model's evaluation method and admits only `numerical` |
| Typed evolution | `evolve_native_coupled_histories` | The ordinary corrector controller | Refuses any non-disabled matched-pair policy, `CoupledEvolution.cpp:7795` |
| Typed atomic step | `certify_native_atomic_coupled_step` | One ordinary corrected step | Same refusal, `:7593` |
| Typed snapshot | `certify_native_acceleration_snapshot` | Single reception time | Admits the snapshot grouping policies |
| Canonical checkpoint | `eom_native_evolution_checkpoint/v7`, binary, `Checkpoint.cpp` | Ordinary canonical state; canonical unrestricted only | n/a |
| Provider checkpoint | `eom_provider_checkpoint/v8`, JSON, `ProviderTransport.cpp` | Embeds v7 bytes for canonical, or revalidated Surface publications | n/a |
| Durable writer | `write_evolution_checkpoint_bytes_atomic` | Exclusive temporary file, fsync, rename, directory fsync | Format-blind; reusable |
| Wire | `execute_eom_v2_request`, `eom_evolution_request/v2` and `eom_evolution_response/v2` | Strict keys, duplicate-key rejection, 32 MiB and depth limits; operations `capabilities`, `inspect`, `evolve`, `resume`, `validate-cancel` | No method or execution field; `evidence.method` is hard-coded `numerical` |
| CLI | `eom_borg_shadow_cli eom-v2` and `eom-v2-server` | One document in, one out; readiness and progress on stderr; `SIGUSR1` cancellation | Same as wire |
| Inspection CLI | `eom_equation_inspect_cli capabilities` and inspect | Registry output | Same as registry |
| Capabilities and resolved model | `EquationRegistry.cpp` | `eom_equation_capabilities/v1`, `eom_resolved_model/v1` | No execution method listed |
| Node process client | `scripts/eom/EomV2ProcessClient.mjs` | Spawns `eom-v2`, watches readiness and progress, checks durable checkpoint receipts | Passes JSON through |
| Local service | `scripts/dev/EomV2Service.mjs` | `/api/eom/v2/...` routes | Passes raw bodies through |
| Browser client | `src/apps/shared/EomV2HttpClient.js` | Inspect then evolve; requires response schema `eom_evolution_response/v2` and matching digest | Would reject any other response schema |
| Surface app | `src/apps/surface/*` | Surface composition only | Not affected unless it opts in |
| Borg | `borg-shadow-v0` modes of the same CLI | Canonical v1 framing | Not to be extended |

## 3. Design decisions proposed for review

### 3.1 Where the selection lives

**Proposed: a new typed field `integration_method`, not a new value of `equation_selection.method`.** The model's `method` names how the equation is evaluated, and it enters the resolved model and its digest for every request. The validated method evaluates the same canonical numerical model and differs in how a step is advanced and certified. Putting it in `method` would change the meaning of an existing model axis. A separate execution field leaves every model identity untouched and is bound where execution is bound: the continuation, the checkpoint and the response.

- Typed field `integration_method`, default `"ordinary"`. The one other admitted value is the accepted policy token `canonical_validated_far_step_evolution/v1`. Any other value is refused with `unsupported_execution_policy`.
- Validated controls the ordinary request does not have go into one new member, `NativeValidatedExecution validated`, with the driver's defaults: pair policy and declared pairs, optional total budget, attempts per step, lower-sign retries, cooldown length, and the continuation.
- Existing ordinary fields are reused only where their meaning is the same: run identity, paths, start, end, initial and minimum step, field speed, coupling, the two increment budget tokens, `thread_count` as the worker count, cancellation and the accepted-step callback, and `validated_population_evidence` as the inherited evidence.

### 3.2 Typed dispatch

- `evolve_native_coupled_histories`: when the validated method is selected, it calls one bridge function in a new source file and returns its result. The ordinary body is untouched.
- The bridge first refuses every ordinary control that has no meaning under the validated method unless it is at its default, naming the control: joint states and joint histories, Surface geometry or continuation carriers, any non-canonical equation selection, a non-sharp chart, a nonzero far-field fraction, a non-disabled snapshot grouping policy, multirate, quarter-step, adaptive, cost-feedback and diagnostic-candidate options, and a maximum step different from the initial step. It then translates to `ValidatedEvolutionRequest` and calls the driver, which applies its own admission before any early return.
- The ordinary certificate gains one member, a shared pointer to the full `ValidatedEvolutionCertificate`, so the evidence, ledger and continuation reach the caller. Its plain fields are the driver's `run`, unchanged.
- `certify_native_atomic_coupled_step` and `certify_native_acceleration_snapshot` refuse the validated selection explicitly. The validated method has no ordinary atomic-step equivalent, and a snapshot has no integration method.
- `create_native_evolution_checkpoint` and `resume_native_coupled_histories`, the v7 path, refuse the validated selection. v7 cannot carry the evidence or its replay.

With the default selection every one of these functions behaves exactly as now. The only change on the default path is one string comparison. The new fields stay out of `native_evolution_model_fingerprint`, which the default resolved model reports as `legacyModelFingerprint` and v7 binds, so default fingerprints keep their bytes; the validated method is bound instead by its own continuation, execution digest and checkpoint.

### 3.3 Versioning

Existing bytes keep their meaning, and new content gets new versions.

| Owner | Today | Proposed for the validated method | Default route |
| --- | --- | --- | --- |
| Wire request | `eom_evolution_request/v2` | `eom_evolution_request/v3`: v2 plus a required `execution` object; in this slice v3 admits only the validated method | v2 parsing unchanged; v2 never carries an execution field |
| Wire response | `eom_evolution_response/v2`, contract `eom_evolution_contract/v2` | `eom_evolution_response/v3`, contract `eom_evolution_contract/v3`, with `execution`, the validated evidence summary, the per-step ledger and attempt dispositions | unchanged |
| Resolved model | `eom_resolved_model/v1` | v1 unchanged for v2 requests; a v3 response adds a separate `executionDigest` over the method and bound controls, so the model digest of the same model stays the same | unchanged |
| Provider checkpoint | `eom_provider_checkpoint/v8` | `eom_provider_checkpoint/v9`: the v8 envelope shape with a `providerState` of kind `validated-run-record/v1` holding the canonical `architrino_validated_run_record/v1` bytes | v8 unchanged |
| Canonical checkpoint | v7 | refuses the validated method | unchanged |
| Capabilities | `eom_equation_capabilities/v1` | adds an `executionMethods` list. **This changes the default capabilities bytes**, an explicitly expected difference | changes by that addition only |
| Borg v0 | canonical v1 framing | not extended | unchanged |

### 3.4 Persistence and restart

- **Writing.** A validated invocation keeps a `ValidatedRunRecord`: opened at the origin, extended by one leg per call through the builder's boundary and ancestry checks. The v9 envelope holds the record, the original request as preparation, the resolved model, the execution digest and the run identity, under the existing durable writer and its size rule. `durable: true` only after its fsync, rename and directory fsync; storage failure returns accepted coverage with `durable: false`.
- **Resuming.** The caller supplies the original request and the checkpoint. The bridge restores the record with an `expected_controls` expectation built from the caller's request, with the origin members computed from the caller's preparation, never from the checkpoint. Only after complete replay agreement does it continue with the replayed continuation and evidence, and append the new leg. Any failure returns no usable state.
- **Honesty.** The response reports the identity basis and the record identity actually read. Replay reruns every earlier step; its cost is not claimed.

### 3.5 Inspection, capabilities and transport

- `capabilities` lists `executionMethods`: `ordinary`, the default; and the validated method with its wire version, checkpoint version, the domain statement, grouping as optional and off by default, and the worker limit.
- `inspect` on a v3 request returns the resolved model and the execution digest, and runs the bridge's control admission without dynamics.
- `evolve` and `resume` on v3 run the bridge; `eom_ready/v2`, `eom_progress/v2` and `SIGUSR1` cancellation are unchanged, and the driver observes cancellation only at accepted boundaries.
- Strict keys, duplicate-key rejection and resource limits apply to the `execution` object as to the rest.
- The Node process client and the local service pass JSON through and need no change for v3 bytes. The browser client's response-schema check needs to admit v3 when it sent v3. The Surface app is not touched.

## 4. Proposed order of work

| Gate | Files touched | Shared with the Surface session |
| --- | --- | --- |
| O1 | `CoupledEvolution.hpp`, `CoupledEvolution.cpp` at the entry points only, one new bridge source and header, `CMakeLists.txt`, the v7 refusal in `Checkpoint.cpp`, a new focused fixture | `CoupledEvolution.*` is a shared seam, read by the Surface build but not edited by it as of this observation |
| O2 | `ProviderTransport.cpp` checkpoint create and resume, the bridge | `ProviderTransport.cpp` is shared |
| O3 | `ProviderTransport.cpp` decode, dispatch and response; `EquationRegistry.cpp`; `EomV2HttpClient.js`; the v2 qualification fixture's sibling | `EquationRegistry.cpp`, `EomV2HttpClient.js` and the service are shared |
| O4 | none | — |

**Overlap observed at 10:06Z:** all of these files are clean against `HEAD` by `git --no-optional-locks status --short`, and their modification times are those of the last commit. That establishes only that no concurrent edit was present at that moment. Each edit will reobserve the file first.

## 5. Questions for the reviewer

1. Is a separate `integration_method` field, rather than a new value of the model's `method`, the right axis?
2. Is a v3 request and response schema, admitting only the validated method, preferred to adding an optional `execution` object to v2?
3. Is the capabilities byte change acceptable as the one expected default difference, or should `executionMethods` appear only behind a new capabilities schema?
4. Should `diagnostic_maximum_accepted_steps` map to the driver's accepted-step limit, or should the bridge refuse it and leave the limit at the driver default?

**Falsifiers for this design.** A default request whose output changes beyond the capabilities addition; an ordinary entry point that runs the validated method without the selection, or runs anything else with it; a v2 request that parses differently; a restore that returns usable state without complete replay agreement; or any edit to a Surface-owned file.
