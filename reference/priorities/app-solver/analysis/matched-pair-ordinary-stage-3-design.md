# Ordinary Integration of Validated Evolution, Stage O3: Wire, Inspection, Capabilities and Consumers Design

O3 exposes the method that is live at O1 and is the O2 candidate through the maintained wire, CLI, inspection, capabilities and shared consumers. This record is design preparation only, started once the O2 persistence map was implemented, as the [O1 live review](matched-pair-review-ordinary-stage-1-live-2026-10-14.md) allowed. O3 runtime waits for the reviewed O2 predecessor. It builds on [O0](matched-pair-ordinary-stage-0-design.md), with its accepted dispositions, and on [O2 design version 2](matched-pair-ordinary-stage-2-design-v2.md). Every instance uses $c_f=1$.

## 1. Owners, read on 2026-10-14

| Owner | Fact that matters | Source |
| --- | --- | --- |
| `execute_eom_v2_request` | One operation envelope: `operation`, `request`, `checkpoint`, `endTime`. Decoding has strict keys, duplicate-key refusal, a 32 MiB size limit and a depth of 64. Resources are capped at a 2 GiB memory budget, 32 threads and 1024 paths. The v2 response hard-codes `evidence.method` to `numerical` and embeds a v8 checkpoint with `durable` and `storageFailure` | `ProviderTransport.cpp` |
| `validate-cancel` | Decodes a request to validate a cancellation | same |
| CLI `eom-v2` and `eom-v2-server` | One document in and out; `eom_ready/v2` and `eom_progress/v2` on stderr; `SIGUSR1` cancellation | same, `eom_borg_shadow_cli` |
| `scripts/eom/EomResponseRecord.mjs` | **Returns any non-v2 payload unchanged**, so v3 would bypass the view projection, the record metadata and the 12 MiB view limit | read |
| `scripts/eom/EomV2ProcessClient.mjs` | Spawns `eom-v2 --checkpoint-file`, retains the raw record, and checks the durable receipt against `checkpoint.digest` and `checkpoint.acceptedTime`, both of which v9 also carries. It writes the complete marker and builds the view through `createEomResponseView` | read |
| `scripts/dev/EomV2Service.mjs` | Routes `/api/eom/v2/...` and passes bodies through | read |
| `src/apps/shared/EomV2HttpClient.js` | Inspects, then evolves. It **requires response schema `eom_evolution_response/v2`** and the inspected model digest and resolved model; disposal requires a durable checkpoint | read |
| `scripts/eom/fixtures/eom-v2-qualification.mjs` | The v2 qualification fixture, whose sibling O3 adds | listed |
| Surface app, Borg | Untouched; Borg is not extended | scope |

## 2. Versions

v2 parsing, responses, v8 and v1 bytes stay exactly as they are.

- **Request `eom_evolution_request/v3`.** The v2 members, plus a required `execution` object with strict keys:
  - `method`: the policy token; the only admitted value;
  - `positionIncrementBudget`, `velocityIncrementBudget`;
  - `totalBudget`: null, or two tokens;
  - `maxAttemptsPerStep`, `maxLowerSignRetries`, `growthCooldownSteps`;
  - `pairPolicy`, `groups`;
  - `maximumAcceptedSteps`: the declared per-invocation limit, required (§3).
  
  Every v2 numerical control the method refuses stays refused by the O1 bridge with its name, so v3 cannot silently carry an ordinary control. A v2 request carrying `execution` stays refused as `unknown_request_field`.
- **Resume envelope.** v3 adds `runtime: {threadCount}`, the O2 worker override, outside `request`. It is admitted only with a v3 request.
- **Response `eom_evolution_response/v3`, contract `eom_evolution_contract/v3`.** Every v2 field keeps its meaning; in particular `evidence.method` stays the model's evaluation method. It adds:
  - `execution` and `executionDigest`;
  - `evidence.integrationMethod`, and the driver's `evidenceStatus`;
  - `validated`: the record status, plus for a resume the identity basis, record identity, compared fields, replayed legs, steps and rejected steps, and the worker count used. It also holds per-path ledger totals and the attempt log (step, attempt, length, code, disposition), with a count;
  - `resources`: the admission bound reported as an estimate, the budget, and the declared step limit;
  - `checkpoint`: schema v9, `digest`, `acceptedTime`, `durable`, `storageFailure` and `data`, with the same keys the process client already checks.
- **Inspection `eom_inspection/v3`.** The model digest and resolved model as in v2, plus `execution`, `executionDigest`, the bridge's named control admission and the resource bound. It runs **no dynamics**: the origin preflight is a producer step, so inspection states that it was not run.
- **Capabilities.** The accepted addition `executionMethods`. `ordinary` is the default, wire v2 and checkpoint v8. The validated method lists:
  - wire v3 and checkpoint v9;
  - the bounded domain statement;
  - grouping as optional and off by default;
  - workers 1 to 32;
  - the required declared step limit and the 2 GiB ceiling.
  
  It is written only when O3 is qualified, so nothing advertises v3 or v9 before that.

## 3. A useful bounded domain under the 2 GiB ceiling

No ceiling increase, silent default or evidence deletion. The O1 bound's dominant terms grow with the reachable accepted steps of one invocation, so v3 **requires a declared per-invocation `maximumAcceptedSteps`**. The bridge's diagnostic limit is per invocation and maps exactly onto the driver's limit. The bound is computed with that limit. A request whose bound exceeds `resources.memoryBytes` is refused as `request_budget_exhausted`, and the refusal reports the bound, the budget and the declared limit.

Long runs proceed as legs through v9. Each leg is a resume with its own declared limit and a durable checkpoint, so accepted coverage is never deleted and nothing is silently capped.

**From the O1 version 2 bound, estimated:** the receding-source case at span 3, minimum step $10^{-4}$ and worst-case tokens costs roughly 3 MB per reachable step. A declared limit of 256 steps per leg is admitted under 2 GiB. The exact table of admitted limits will be measured and reported in O3, not assumed.

**Replay bound for v9 resume.** The O2 candidate bounds replay as one run from the origin to the end, which charges every leg's attempts as if they were held at once. Restore holds one leg's certificate at a time, plus the growing histories and record. O3 tightens the bound to:

- the largest leg's attempt bound, using each leg's `max_accepted_steps`, read from the record before replay;
- plus the history versions of the whole span;
- plus the record and envelope copies.

Using the leg limits is safe even though they are claims: replay passes each leg's limit to the driver, which enforces it, so a false limit cannot let replay retain more than the bound assumes. A false claim is then refused by replay. Without this, a long run checkpointed in legs could become impossible to resume under the same budget. The change belongs to the O2 transport function, so it would come back as a reviewed O2 amendment if O2 is accepted first.

## 4. Consumers

- **`EomResponseRecord.mjs`.** Project v3 explicitly. Keep:
  - the v2 projection;
  - the record metadata and artifact;
  - the 12 MiB view limit;
  - `validated` with ledger totals;
  - the attempt log sampled like the Surface diagnostics: stride sampling, the last kept, never interpolated, with the original count recorded.
  
  The complete attempt log stays in the raw artifact. An unknown schema is still returned unchanged but marked `record: {projection: "none"}` rather than silently treated as projected; whether to refuse instead is a question for review.
- **`EomV2ProcessClient.mjs`.** Keep the durable receipt check, which v9 satisfies through the same keys. Pass `runtime` through. Add a check that the response's `executionDigest` equals the request's, alongside the existing model checks. The complete marker, raw retention and failure reporting are unchanged.
- **`EomV2Service.mjs`.** No route change; the bodies already pass through. Add `runtime` to the resume body passthrough.
- **`EomV2HttpClient.js`.** Accept `eom_evolution_response/v3` only when the request schema is v3. Require the response `executionDigest` to equal the inspection's, together with the existing model digest, resolved model and run identity checks. Disposal still requires `checkpoint.durable`.
- **No change** to the Surface app, Borg, `eom_ready/v2` or `eom_progress/v2`. The progress counts are already cumulative, through the O1 callback wrap.

## 5. Qualification plan, known cases first

- **Known.** The O0 v2 envelope set reproduces its baseline through the comparison instrument: identical, or only the named identity paths. Capabilities differ only by `executionMethods`, and only after qualification.
- **v3 envelopes through `eom-v2` with a checkpoint file:**
  - inspect, evolve and resume;
  - resume with a changed `runtime.threadCount`;
  - cancellation by `SIGUSR1` at an accepted boundary, which writes a durable v9;
  - a durable failure through an unwritable path;
  - a size refusal;
  - a domain-refused origin;
  - a request over its declared-limit bound;
  - strict-key, duplicate-key and depth refusals for `execution` and `runtime`;
  - v2 carrying `execution` refused.
- **Consumers.**
  - The process client end to end: raw retention, complete marker, view under 12 MiB, the execution-digest check, and durable versus storage failure.
  - The browser client against a stubbed fetch: v3 accepted with matching digests; a mismatched `executionDigest`, a v3 response to a v2 request, and a v2 response to a v3 request are all refused.
  - `EomResponseRecord` with a large attempt log, sampled and under the limit.
- **Containment.** The frozen three-path brackets and the accepted bookkeeping, run on the v3 response's resumed tubes through the same instruments as O1 and O2.

## 6. Files, all shared seams except the new fixture

| File | Change |
| --- | --- |
| `ProviderTransport.cpp` | v3 decode beside v2; the `runtime` member; dispatch to the O1 entry and the O2 v9 functions; v3 response and inspection |
| `EquationRegistry.cpp` | `executionMethods` |
| `scripts/eom/EomResponseRecord.mjs`, `EomV2ProcessClient.mjs`, `scripts/dev/EomV2Service.mjs`, `src/apps/shared/EomV2HttpClient.js` | As in §4 |
| `scripts/eom/fixtures/eom-v3-qualification.mjs` | New |

Each shared file is re-observed against the Surface session's state before any guarded edit.

## 7. Questions for review

1. Is a required `maximumAcceptedSteps` in v3 the bounded domain you want, or a wire default with a stated value?
2. Should the per-leg replay bound be an O2 amendment now, or the first O3 change?
3. Should `EomResponseRecord` refuse an unknown schema rather than mark it unprojected?
4. In the v3 response, is the attempt log complete in raw and sampled in the view acceptable?

**Falsifiers for this design.** Any of these:

- a v2 byte or admission changed;
- a v3 operation advertised before it is qualified;
- a consumer that accepts v3 without matching execution digests;
- a view over 12 MiB;
- an attempt log interpolated;
- a ceiling raised or a request silently capped.
