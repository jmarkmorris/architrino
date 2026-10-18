# Ordinary Integration, Gate O3: Wire and Consumer Scratch Candidate

O3 implements the [accepted O3 design version 2](../analysis/matched-pair-ordinary-stage-3-design-v2.md), as released in the [O2 live review](../analysis/matched-pair-review-ordinary-stage-2-live-2026-10-14.md). It is a scratch candidate. Live `src/eom` remains accepted O2, and the three consumer files are unmodified in live (`git status` at 13:55Z). The Surface session's `surface.css` and its new fixtures are untouched. Every instance uses $c_f=1$.

Evidence: [matched-pair-ordinary-stage-3/](matched-pair-ordinary-stage-3/). Raw outputs are under `.local-data/eom-matched-pair/2026-10-14/ordinary-integration/o3-scratch/`.

## The slice, stated

**Done in this candidate:**

- the strict v3 request, inspection and response in the transport;
- evolve and resume through `eom-v2` and `eom-v2-server` with a durable v9 checkpoint file, readiness, progress and `SIGUSR1` cancellation;
- the worker override;
- the strict response projection;
- execution-identity binding in the process and browser clients.

**Not done, and refused or left open honestly:**

- **Capabilities.** No `executionMethods` entry is written, so v3 and v9 are not advertised. The capabilities document differs from O0 only by build identity, and that is compared explicitly.
- **The service.** `EomV2Service.mjs` is unchanged. It passes bodies through, including `runtime`, with no route change, so there was nothing to change in it.
- **A v3 sibling of `scripts/eom/fixtures/eom-v2-qualification.mjs`.** Not written; its coverage here is the CLI wire run.
- **O4** (live end-to-end qualification and closeout) remains outstanding.

## Changes

**[Transport](matched-pair-ordinary-stage-3/live-to-o3-transport.diff)**, 181 diff lines, `ProviderTransport.cpp` only:

- **`decode_request_v3`.** The v2 members go through the unchanged v2 decoder. The required `execution` object has strict keys: `method` (the policy token only), the two increment budgets, an optional `totalBudget`, attempts, retries, cooldown (each 1..1024), `pairPolicy`, `groups`, and a required positive `maximumAcceptedSteps` (1..1,000,000), which maps to the per-invocation limit.
- **Overlapping controls are resolved explicitly.**
  - `numerics.initialStep`, `numerics.minimumStep` and `model.coupling` must be supplied, because v2 would otherwise default them silently.
  - v2's ordinary-controller wire defaults (`maximumStep`, `maxStepAttempts`, `maxRejectedSteps`) are not inherited. An absent one takes the typed default the method requires; a supplied one is refused by name by the bridge unless it is at that default.
  - The bridge's named control refusal runs before return.
- **The envelope admits `runtime: {threadCount}`** only on a v3 resume. A v2 envelope, or a v3 evolve, with `runtime` is refused `unknown_request_field`.
- **`eom_inspection/v3`.** It reports the execution and its digest, `admission: {controls: admitted, originPreflight: not_run, certifiedDomain: false}` with its meaning stated, and the reachable steps and growth bound, labelled an admission estimate.
- **Evolve and resume v3.**
  - A request whose bound exceeds `resources.memoryBytes` is refused `request_budget_exhausted`, reporting the bound and the declared limit.
  - Resume uses the accepted O2 typed function, with the override.
  - The checkpoint is the O2 v9, written by the shared durable writer. Any creation refusal becomes `storageFailure`, with accepted coverage kept and `durable: false`.
- **`eom_evolution_response/v3`, contract v3.** Every v2 field keeps its meaning, including `evidence.method`. Added:
  - `execution`, `executionDigest`, `evidence.integrationMethod`;
  - `validated`: record status and worker count; for a resume, the identity basis, record identity, compared fields, replayed legs, steps and rejections, and the replay bound; the complete attempt log with its count; per-path ledger totals;
  - `resources`, labelled an estimate;
  - checkpoint schema v9.
- **v2 handling.** Unchanged except that the envelope's key set now includes `runtime`, which is refused for v2 as above.

**[Consumers](matched-pair-ordinary-stage-3/live-to-o3-consumers.diff)**, 92 diff lines:

- **`EomResponseRecord.mjs`.**
  - v2 evolution responses keep their exact projection.
  - v3 is projected with the attempt log sampled by stride (at most 128, plus the last row, never interpolated), its original count recorded, and the 12 MiB view limit applied.
  - `eom_error/v2`, the v2 and v3 inspections, capabilities and cancel validation pass through, as an explicit supported list.
  - Any other schema is refused `record_projection_unsupported`, with raw evidence retained.
  - The new `assertEomExecutionBinding` checks that a v3 response answers a v3 request, recomputes `executionDigest` from the reported execution, compares each declared execution field and the declared limit, and refuses a v2 response to a v3 request.
- **`EomV2ProcessClient.mjs`.** Calls the binding check on every response.
- **`EomV2HttpClient.js`.** A v3 request requires a v3 inspection and a v3 response whose `executionDigest` and `execution` equal the inspection's. A v2 request keeps its exact v2 check.

## Results

**Build.** `build-o3`: two workers, supervisor, exit 0, no warning. Library `5d9da8a9836a4bf8…`.

| Check | Result |
| --- | --- |
| **[Wire checker](matched-pair-ordinary-stage-3/o3-wire-check-output.txt)**, through the real `eom-v2` CLI with a checkpoint file | **16 of 16**, known cases first. See the breakdown below |
| **[Consumer checker](matched-pair-ordinary-stage-3/o3-consumer-check-output.txt)** | **24 of 24**, known cases first. See the breakdown below |
| O2 regression on the O3 build | O2 v4 checker 52 of 52. All three reviewer probes, unchanged, pass their known cases first and refuse every target. Frozen increment 4 v2 checker 157 of 157. The O1 fixture output is identical to live O2. The persistence output differs only in checkpoint hashes, through the changed source identity |

**Wire checker, row by row:**

- **Known.** The frozen O0 defaults give 72 identical outputs and 11 that differ only at the reviewed identity paths. The one other difference is declared: the old v3-rejection envelope is now refused `invalid_request: v3 requires an execution object`. Capabilities differ only by build identity.
- **Inspection** is control-only.
- **Execution digest** is equal in inspection and evolution.
- **Evolve** completes with 8 progress events and a durable v9 equal to the reported checkpoint.
- **The declared limit** halts at two steps.
- **Resume from two to the end** equals the uninterrupted run, with `expected_controls` and 2 replayed steps.
- **`runtime.threadCount` 4** equals the one-worker resume and reports 4.
- **`SIGUSR1`** after the first progress event halts at an accepted boundary with a durable v9. The resume then equals the uninterrupted 214 accepted and 42 rejected, with the 7 earlier rejections replayed.
- **An unwritable checkpoint** keeps coverage and reports not durable.
- **18 refusals** with their expected codes: missing or zero limit, unknown key or method, missing steps or coupling, ordinary controls named, the bound over memory, a domain-refused origin, v2 carrying `execution`, misplaced or malformed `runtime`, changed execution on resume, and a duplicate key.

**Consumer checker, row by row:**

- **Known.** All 8 retained v2 evolution views, including Surface's stage E records, are byte-identical under the new projection. The Surface stage E view assertions hold, and errors pass through.
- **Projection.** Supported documents pass through. An unknown evolution schema is refused. The v3 view (256 rows to 129, last row kept, 4.2 MB) and a 200,000-row log stay bounded.
- **Binding.** Seven binding cases, including the server digest recomputed in Node.
- **Browser client.** Six cases, with v2 still accepted.

## Defects of my own instruments, preserved

1. **The first wire run used wrong history field names** (`positionError` for `positionErrors`). The strict decoder refused every case. Kept in `o3-scratch/first-run-envelope-field-names/`.
2. **The second run's cancel-resume used the decoder's default 1 GiB budget.** Resume was honestly refused because its replay bound was 1.6 GB. The memory budget is bound in the preparation, so the cancel scenario now declares the 2 GiB maximum throughout. Kept in `o3-scratch/second-run-cancel-budget/`.

Neither changed the subject.

**Falsifiers.** Any of these:

- a v2 byte changed outside the reviewed paths and the declared v3-rejection change;
- a v3 operation advertised;
- inspection claiming a certified domain;
- a silent default or precedence among overlapping controls;
- a consumer accepting v3 without bound execution;
- an unbounded or interpolated view;
- a Surface view changed.
