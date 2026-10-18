# Ordinary Integration, Gate O3 Version 2: Client Identity Correction and End-to-End Qualification

This corrects the [O3 scratch candidate](matched-pair-ordinary-stage-3-scratch-receipt-2026-10-14.md) for findings O3-R1 and O3-R2 and the runtime-override finding of the [preliminary O3 review](../analysis/matched-pair-review-ordinary-stage-3-preliminary-2026-10-14.md). It adds genuine end-to-end qualification through the actual service and clients. The transport is unchanged from O3 version 1 (build `5d9da8a9836a4bf8…`). Version 1's consumer files, outputs and receipt are preserved unchanged, and so is every live file. Every instance uses $c_f=1$.

Evidence: [matched-pair-ordinary-stage-3-v2/](matched-pair-ordinary-stage-3-v2/). Raw outputs are under `.local-data/eom-matched-pair/2026-10-14/ordinary-integration/o3v2-scratch/`.

## Corrections

The whole change from version 1 is [o3-version-1-to-version-2-consumers.diff](matched-pair-ordinary-stage-3-v2/o3-version-1-to-version-2-consumers.diff), 189 lines. The change against live is [live-to-o3-v2-consumers.diff](matched-pair-ordinary-stage-3-v2/live-to-o3-v2-consumers.diff), 199 lines.

**A new browser-safe module, `src/apps/shared/EomExecutionIdentity.js`.**

- `expectedEomExecution(request)` normalizes a v3 request's execution exactly as the service resolves it. It fills every default (`totalBudget` null, attempts 64, retries 4, cooldown 4, `pairPolicy` disabled, `groups` empty) and returns the declared `maximumAcceptedSteps`. It refuses an unknown or missing field, or a missing or nonpositive limit.
- `eomExecutionDigest` computes SHA-256 of the canonical normalized execution with Web Crypto.
- `checkedEomRuntime` admits `{threadCount}` from 1 to 32 on a v3 request only.

**O3-R1, browser client (`EomV2HttpClient.js`).**

- **Before anything is sent:** for a v3 request, the normalized execution and its digest are fixed.
- **After inspection, before launch:** the inspection must be `eom_inspection/v3` and bound to that same execution, digest and limit. Otherwise nothing is launched (`execution_binding_mismatch`).
- **After the run:** the result must be `eom_evolution_response/v3` and bound to the same expectation, not merely agree with the inspection.
- **Overrides:** `resume` and `resumeRecord` accept `options.runtime = {threadCount}` and send it as the envelope's `runtime` member. It is refused (`unsupported_runtime_override`) for a v2 request rather than dropped.
- **v2 requests** keep their exact previous check.

**O3-R2, Node side (`EomResponseRecord.mjs`, `EomV2ProcessClient.mjs`).**

- `assertEomResponseSchema` enforces the supported response schema of each operation by request version, on every route, retained or not. v2 evolve and resume must answer `eom_evolution_response/v2` and inspect `eom_inspection/v2`; v3 the corresponding v3 schemas. Capabilities must answer `eom_equation_capabilities/v1`, and cancel validation `eom_cancel_request/v2`. `eom_error/v2` is always supported.
- `assertEomExecutionBinding` now compares the complete normalized execution, every default included, recomputes the digest, and checks the declared limit, for both v3 inspection and v3 evolution. A v3 document answering a non-v3 request, or anything but v3 or an error answering a v3 request, is refused.
- The process client calls both on every response before projection.
- The projection itself is as in version 1.

**Unchanged and qualified as unchanged:**

- `EomV2Service.mjs` (byte-identical to live): it passes `runtime` and cancellation through correctly, as shown by actual runs below.
- `EomQualifiedSurfaceRecord.mjs` and `EomJsonHttp.js`.

## Results

| Check | Result |
| --- | --- |
| **Reviewer's O3 consumer probe, unchanged**, run on the corrected files into a fresh directory | Known SHA-256, genuine digest and binding, and a genuine v3 browser run pass first. Then **every defect target is refused before launch**: the v2 inspection for a v3 request (only `/inspect` called); request grouping disabled while inspection and response group; request limit 2 against 8; a matching zero digest; undeclared nondefault grouping; an unknown successful schema, in the helper and through the actual non-retaining process client (`unsupported_response_schema`). The runtime target is now a supported path: the resume body carries `runtime: {"threadCount":4}` |
| **[End-to-end run](matched-pair-ordinary-stage-3-v2/end-to-end-output.txt)**: the actual service on a local HTTP port with the candidate process client, the candidate browser client over real `fetch`, and the O3 CLI | **12 of 12**, known cases first. See the breakdown below |
| [Version 1 consumer checker](matched-pair-ordinary-stage-3-v2/consumer-check-output.txt), unchanged, on the corrected files | 24 of 24. All 8 retained v2 evolution views, Surface stage E included, are still byte-identical under the projection |
| Wire and O2 regression | Unchanged from version 1: the transport and build did not change. Wire 16 of 16; O2 v4 52 of 52; all three O2 probes; frozen increment 4 157 of 157 |

**End-to-end run, row by row:**

- **Known.** A v2 run is unchanged in kind. Capabilities advertise no execution method.
- **v3 inspect** is control-only, with the preflight not run.
- **v3 evolve-record** completes with a durable v9 and a record view. The complete raw record is served with bytes and SHA-256 equal to the artifact; the complete marker is written; the full attempt log is in raw. The checkpoint is read back through the service.
- **Cancellation by the browser client's abort** after the first progress event halts at an accepted boundary (accepted coverage to 0.984375) with a durable v9.
- **`resumeRecord` from that checkpoint with `runtime: {threadCount: 2}`** equals the uninterrupted 214/42, with the rejections replayed and two workers reported.
- **Refusals.** The client refuses a missing limit before sending, and the service returns the strict decoder refusal for the same request. A v2 runtime override is refused. A domain-refused origin is reported as the service error.

## Dispositions and remaining open paths

- **O3-R1** is resolved in the browser client: version and complete execution bound before launch, and the result bound to the same expectation.
- **O3-R2** is resolved in the Node path: operation-specific schemas on every route, and complete normalized binding.
- **The runtime override** is supported through `options.runtime` on v3 resumes and refused otherwise.
- **Still open:**
  - capabilities advertisement, held until live O3 qualification;
  - the v3 sibling of `eom-v2-qualification.mjs`, not written; the CLI wire run and the end-to-end run cover its ground here;
  - O4, live end-to-end and closeout.
- **Not claimed:** physical correctness from consumer stubs, or a measured resource cost.

**Falsifiers.** Any of these:

- the unchanged probe launching or accepting any target;
- a runtime override dropped;
- an unsupported schema accepted on any route;
- any change to a v2 or Surface view.
