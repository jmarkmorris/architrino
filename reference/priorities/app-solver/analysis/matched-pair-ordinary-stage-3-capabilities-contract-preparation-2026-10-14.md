# Ordinary Integration, O3 Capabilities and v3 Contract: Prepared, Not Advertised

This prepares the capabilities advertisement and the public v3 contract that the [O3 version 3 review](matched-pair-review-ordinary-stage-3-v3-2026-10-14.md) asked for, alongside live qualification. Nothing here is live:

- live `src/eom` is the qualified [O3 live tree](../evidence/matched-pair-ordinary-stage-3-live-receipt-2026-10-14.md), whose capabilities still advertise no execution method;
- `evolution-contract-v2.md` is unchanged.

Both pieces below are offered for review, to be applied only after live O3 is accepted. Every instance uses $c_f=1$. Neither piece changes the law, the v2 or v8 contracts, or any default.

## 1. Capabilities: an additive `executionMethods` member

**Scratch subject.** `.tmp/eom-ordinary-integration-2026-10-14/o3cap-tree/eom/src/EquationRegistry.cpp`, built in its own directory `build-o3cap`. The change is one inserted member in `equation_capabilities_json()`, a 24-line diff (`.tmp/eom-ordinary-integration-2026-10-14/live-to-o3cap-registry.diff`). The schema stays `eom_equation_capabilities/v1`, and every existing member keeps its bytes and meaning. The addition is declared, not hidden.

The member lists two methods:

- **`ordinary`.** Marked default, with the v2 request and response and the v8 checkpoint. This is the existing behaviour.
- **`canonical_validated_far_step_evolution/v1`.** Not default; opted into through `execution.method`. It names:
  - the v3 request, inspection and response schemas, contract `eom_evolution_contract/v3`, and checkpoint v9;
  - composition `canonical/v1`, unrestricted speed and no constraint;
  - the domain: far-step, with Surface, joint, near, self-hit and above-wake-speed requests refused before any accepted return;
  - the pair policies, with `disabled` as the default;
  - the limits as the transport enforces them: accepted steps 1..1,000,000, attempts 1..1024, retries and cooldown 0..1024;
  - the controls it requires, and the three ordinary controls it refuses by name;
  - the runtime override, `threadCount` on resume only;
  - restart by replay from the original request bound to the record identity;
  - the resource bound, labelled an admission estimate;
  - `independentlyAccepted: false` and `scientificAcceptance: false`.

**Measured in scratch** (raw outputs in `.local-data/eom-matched-pair/2026-10-14/ordinary-integration/o3cap-scratch/`):

- **Build.** `build-o3cap` built only `eom_borg_shadow_cli` and `eom_equation_inspect_cli`, under supervisor run `9a208aa5-b843-491b-999f-bb8b7300c806`: exit 0, no warning.
- **Capabilities compared with live O3.** The capabilities operation through `eom-v2` returns `eom_equation_capabilities/v1`. Apart from `build` and the new `executionMethods`, every member is equal to the live O3 capabilities document. The methods listed are `ordinary` (default) and `canonical_validated_far_step_evolution/v1`.
- **Consumer pass-through.** The live projection passes the document through unchanged.

**A defect of my own, stated.** The first scratch configure failed: I had placed the tree one level too shallow for the source-identity step, which reads documents under `reference/`. That was supervisor run `aa776244-181b-448e-86ca-3ace31b53921`, exit 1. I deleted its configure log and supervisor log when I rebuilt, so only this statement records it. The subject was not changed between the two runs.

**Wording to confirm.** Please check the `domain` sentence: "sub-wake-speed paths with every partner reception strictly in the retained past". I wrote it from the assignment's refusal list and the origin preflight, not from a separate derivation. If it overstates what the preflight establishes, it should become a reference to the method's own admission codes.

**Consequences, stated before application.**

- The end-to-end and wire known rows that check "capabilities advertise no execution method" will change by design. Each would be replaced by a row that checks this exact member.
- The default comparison would gain one more declared difference: the capabilities document, beyond build identity.
- Consumers pass `eom_equation_capabilities/v1` through unchanged, so no client change is needed.

## 2. Draft public contract: `contracts/evolution-contract-v3.md`

Proposed as a new file beside `evolution-contract-v2.md`, which stays frozen. Draft text:

> **Opt-in validated execution over the v2 transport.** This contract adds an opt-in execution method to the [v2 transport](../contracts/evolution-contract-v2.md) without changing v2 requests, responses, v8 checkpoints or defaults. Ordinary v2 execution stays the default, with grouping disabled and one worker.
>
> **Request.** `eom_evolution_request/v3` is the v2 request plus a required `execution` object with strict keys:
> - `method`: only `canonical_validated_far_step_evolution/v1`;
> - `positionIncrementBudget` and `velocityIncrementBudget`, required decimals;
> - optional `totalBudget`, null or two decimals;
> - optional `maxAttemptsPerStep` (1..1024, default 64), `maxLowerSignRetries` (0..1024, default 4) and `growthCooldownSteps` (0..1024, default 4);
> - optional `pairPolicy` (default `disabled`) and `groups`;
> - required `maximumAcceptedSteps` (1..1,000,000), the per-invocation limit.
>
> **Overlapping controls are resolved explicitly.**
> - `numerics.initialStep`, `numerics.minimumStep` and `model.coupling` must be supplied.
> - v2's ordinary wire defaults for `maximumStep`, `maxStepAttempts` and `maxRejectedSteps` are not inherited. An absent one takes the method's typed default, and a supplied one is refused by name.
>
> **Envelope.** A resume envelope may carry `runtime: {threadCount}` (1..32). Every other envelope that carries `runtime` is refused.
>
> **Inspection.** `eom_inspection/v3` reports:
> - the normalized execution and its SHA-256 `executionDigest`;
> - `admission: {controls: admitted, originPreflight: not_run, certifiedDomain: false}`;
> - the reachable steps and the growth bound, labelled an admission estimate.
>
> It certifies no domain.
>
> **Evolution.** `eom_evolution_response/v3`, contract `eom_evolution_contract/v3`, keeps every v2 field's meaning and adds:
> - `execution`, `executionDigest` and `evidence.integrationMethod`;
> - `validated`, containing:
>   - the record status and worker count;
>   - for a resume: the identity basis, record identity, compared fields, and the replayed legs, steps and rejections with the replay bound;
>   - the complete attempt log with its count;
>   - per-path ledger totals;
> - `resources`, labelled an estimate.
>
> A request whose bound exceeds `resources.memoryBytes` is refused before evolution. Unsupported domains are refused (`unsupported_validated_domain`) before any accepted return. There is no silent substitute, speed clamp or partial fallback.
>
> **Persistence.** `eom_provider_checkpoint/v9` binds the execution and its digest, the preparation (including the bound worker count), the claims, and the validated record. Resume restores by replay from the original request: the caller's controls and origin are always bound, and a named record identity is a stricter addition. A creation refusal becomes `storageFailure`, with accepted coverage kept and `durable: false`. Durability uses the shared atomic writer, as in v2.
>
> **Consumers.**
> - Clients admit only v2 and v3 request schemas.
> - They bind the complete normalized execution, its digest and the declared limit before launch and again on the result.
> - They refuse a runtime override on evolve.
> - The record view samples the attempt log by stride (at most 128 rows plus the last, never interpolated) within 12 MiB; the complete log stays in the raw artifact.
>
> **Scope.** This is numerical interface and replay evidence. It is not independent mathematical acceptance or a measured cost.

## What remains after this

- **Applying both pieces live, after review.** One registry edit and the new contract file, followed by:
  - a separate build;
  - rerunning the wire, default and end-to-end checks, with the capabilities rows changed as stated above;
  - a live receipt.
- **The v3 sibling of `scripts/eom/fixtures/eom-v2-qualification.mjs`.** Per the review it is not needed only for its filename, since the retained wire, end-to-end and CLI-server checks cover its obligations.
- **O4:** live reconciliation and closeout.
