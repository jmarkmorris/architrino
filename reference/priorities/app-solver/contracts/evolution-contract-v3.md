# Opt-in validated execution over the v2 transport

This contract adds one opt-in execution method to the [v2 transport](evolution-contract-v2.md). It changes nothing in v2 requests, v2 responses, v8 checkpoints, defaults or the law. Ordinary v2 execution stays the default, with grouping disabled and one worker. The [ordinary integration scope](matched-pair-ordinary-integration-scope.md) and its gate receipts own the measured qualification. This contract is interface and replay scope only. It supplies no independent mathematical acceptance, no measured cost, and no per-request or physical certification. Every instance uses $c_f=1$.

## Method and domain

The method is `canonical_validated_far_step_evolution/v1`. It is advertised under `executionMethods` in `eom_equation_capabilities/v1`, for composition `canonical/v1`, unrestricted speed and no constraint.

It is bounded canonical far-step execution. Evolve and resume run two admissions:

- an origin preflight;
- accepted-step producer admission, covering retained-past speed, separation, whole-step reception-time and receiver-box coverage, and past emission-root coverage.

Reception is the current whole-step time, and emission roots lie in the retained past. Neither is a blanket cap on future physical speed.

When admission fails:

- **at the origin,** the request is declined without validated publication (`unsupported_validated_domain`);
- **after accepted steps,** the response keeps only the previously accepted prefix, with its halt record.

Surface, joint, near, self-hit and above-wake-speed requests are declined before any accepted early return or publication. There is no silent substitute, speed clamp or partial fallback.

## Request

`eom_evolution_request/v3` is the v2 request plus a required `execution` object with strict keys:

| Key | Content |
| --- | --- |
| `method` | Only `canonical_validated_far_step_evolution/v1` |
| `positionIncrementBudget`, `velocityIncrementBudget` | Required decimal strings |
| `totalBudget` | Optional; null or two decimal strings |
| `maxAttemptsPerStep` | Optional, 1..1024, default 64 |
| `maxLowerSignRetries` | Optional, 0..1024, default 4 |
| `growthCooldownSteps` | Optional, 0..1024, default 4 |
| `pairPolicy` | Optional, `disabled` (default) or `canonical_whole_step_piecewise_tube/v1` |
| `groups` | Optional pairs of path identities, default empty |
| `maximumAcceptedSteps` | Required, 1..1,000,000; the per-invocation step limit |

**Overlapping controls are resolved explicitly.**

- `numerics.initialStep`, `numerics.minimumStep` and `model.coupling` must be supplied; v3 does not take v2's defaults for them.
- v2's ordinary wire defaults are not inherited. Instead:
  - `numerics.maximumStep` must be absent or equal to `numerics.initialStep`;
  - `numerics.maxStepAttempts` must be absent or 10000;
  - `numerics.maxRejectedSteps` must be absent or 1000.

  Any other supplied value is refused by name.

**Scopes.** The normalized execution and its SHA-256 `executionDigest` cover the method, the budgets, the limits on attempts, retries and cooldown, and the pair policy and groups, with every default filled in. Two scopes stay outside that digest and the original preparation: the per-invocation `maximumAcceptedSteps`, and a resume's worker override.

**Envelope.** A resume envelope may carry `runtime: {threadCount}` from 1 to 32. Any other envelope carrying `runtime` is refused, and clients refuse it on evolve.

## Inspection

`eom_inspection/v3` is control-only. It reports:

- the normalized execution and its `executionDigest`;
- `admission: {controls: admitted, originPreflight: not_run, certifiedDomain: false}`;
- the reachable steps and growth bound, labelled an admission estimate.

It certifies no domain.

## Evolution response

`eom_evolution_response/v3`, contract `eom_evolution_contract/v3`, keeps every v2 field's meaning and adds:

- `execution`, `executionDigest` and `evidence.integrationMethod`;
- `validated`:
  - the record status and worker count;
  - for a resume: the identity basis, record identity, compared fields, replayed legs, steps and rejections, and the replay bound;
  - the complete attempt log with its count;
  - per-path ledger totals;
- `resources`, labelled an admission estimate.

A request whose bound exceeds `resources.memoryBytes` is refused before evolution. Coverage and durability are reported as in v2: a halt or cancellation keeps the accepted prefix, and `durable: true` follows only the shared atomic writer.

## Persistence and restart

`eom_provider_checkpoint/v9` binds:

- the execution and its digest;
- the method's controls, exact scalars, population and preparation;
- the resource controls, with the bound worker count;
- the ledger and history claims;
- the validated record.

Resume restores by full replay from the original request and origin; there is no partial restore. The caller's controls and origin are always bound, and a named record identity is a stricter addition. Uploaded hashes or booleans are never evidence. A creation refusal becomes `storageFailure`, with the accepted coverage kept and `durable: false`.

## Consumers

- Clients admit only the v2 and v3 request schemas for evolve, resume and inspect, and refuse any other schema.
- They bind the complete normalized execution, its digest and the declared limit before launch, and again on the result.
- Complete raw responses are retained.
- The record view samples the validated attempt log by stride: at most 128 rows plus the last, never interpolated, within 12 MiB. The complete log stays in the raw artifact.
- Capabilities, cancel validation and error documents pass through unchanged.
