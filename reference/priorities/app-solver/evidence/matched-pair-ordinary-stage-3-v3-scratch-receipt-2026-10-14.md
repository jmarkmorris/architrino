# Ordinary Integration, Gate O3 Version 3: Request-Version and Evolve-Runtime Correction

This corrects the [O3 version 2 scratch candidate](matched-pair-ordinary-stage-3-v2-scratch-receipt-2026-10-14.md) for findings O3-R2b and O3-R1b of the [preliminary O3 review](../analysis/matched-pair-review-ordinary-stage-3-preliminary-2026-10-14.md). The transport is unchanged from O3 version 1 (build `5d9da8a9836a4bf8…`), and backend and producer mathematics are unchanged. Version 2's consumer files, outputs and receipt are preserved unchanged, and so is every live file: live `src/eom` matches the accepted O2 inventory (97 files, none differing, checked at 14:15Z), and the live consumer files are unmodified. Every instance uses $c_f=1$.

Evidence: [matched-pair-ordinary-stage-3-v3/](matched-pair-ordinary-stage-3-v3/). Raw outputs are under `.local-data/eom-matched-pair/2026-10-14/ordinary-integration/o3v3-scratch/`, all in fresh directories.

## Corrections

The whole change from version 2 is [o3-version-2-to-version-3-consumers.diff](matched-pair-ordinary-stage-3-v3/o3-version-2-to-version-3-consumers.diff), 107 lines. The change against live is [live-to-o3-v3-consumers.diff](matched-pair-ordinary-stage-3-v3/live-to-o3-v3-consumers.diff), 225 lines.

**O3-R2b, unknown request version.** Version 2 classified any request schema other than v3 as v2.

- `EomExecutionIdentity.js` adds `eomRequestVersion(request)`. It returns `v2` only for `eom_evolution_request/v2` and `v3` only for `eom_evolution_request/v3`. Any other schema is refused, with code `unsupported_request_schema`.
- **Browser client.** `run()` classifies the request with this function before anything else, so an unknown schema is refused before any call.
- **Node helpers.** For evolve, resume and inspect, `assertEomResponseSchema` and `assertEomExecutionBinding` both require an admitted request version. They now refuse an unknown schema rather than mapping it to v2.
- Capabilities and cancel validation remain separate operations that do not depend on a request, as before.

**O3-R1b, runtime silently dropped on evolve.** `evolve` and `evolveRecord` refuse any `options.runtime`, with code `unsupported_runtime_override`, before any request or launch. The supported `resume` and `resumeRecord` override is kept.

A refusal before launch is returned as a rejected promise, as every other client failure is.

**Unchanged and checked as byte-identical to live:** `EomV2Service.mjs`, `EomQualifiedSurfaceRecord.mjs` and `EomJsonHttp.js`.

## Results

| Check | Result |
| --- | --- |
| [Reviewer's version probe](matched-pair-ordinary-stage-3-v3/reviewer-version-probe-output.txt), unchanged, fresh directory | **Known first:** v2 and v3 browser runs and the v2 Node schema and binding checks pass. **Then every target is refused:** v99 in the browser (`unsupported_request_schema`, 0 launches); v99 in Node (`unsupported_response_schema`); runtime on evolve (`unsupported_runtime_override`, 0 launches) |
| [Reviewer's original O3 consumer probe](matched-pair-ordinary-stage-3-v3/reviewer-consumer-probe-output.txt), unchanged, fresh directory | Same disposition as version 2. Known cases pass first. Every defect target is refused before launch, and the runtime override on resume is still a supported path |
| [End-to-end run](matched-pair-ordinary-stage-3-v3/end-to-end-output.txt): the actual service on a local port, the candidate clients over real `fetch`, and the O3 CLI | **17 of 17**, known cases first: version 2's 12 checks plus 5 new ones. See below |
| [Version 1 consumer checker](matched-pair-ordinary-stage-3-v3/consumer-check-output.txt), unchanged | 24 of 24. All 8 retained v2 and Surface views are byte-identical |
| Wire and O2 regression | Unchanged, because the transport and build did not change: 16 of 16, 52 of 52, all three O2 probes, 157 of 157 |

**The five new end-to-end checks.** The [runner change](matched-pair-ordinary-stage-3-v3/end-to-end-runner-v2-to-v3.diff) counts every fetch call and adds these:

1. A v99 request is refused by the browser client with 0 calls.
2. The service refuses the same v99 request.
3. Both Node helpers refuse a v99 request paired with a genuine v2 response.
4. Runtime on `evolve` is refused with 0 calls.
5. Runtime on `evolveRecord` is refused with 0 calls.

**One observation, stated.** When v99 is posted directly to the service, the native decoder refuses it first: run alone, it returns `eom_error/v2` with `unsupported_request_schema` and evolves nothing ([v99-native-output.json](matched-pair-ordinary-stage-3-v3/v99-native-output.json)). The process client's binding check, which runs on every response, then refuses the request schema before passing the document on. The service therefore reports `execution_binding_mismatch`, naming the unsupported schema, instead of the native code. The refusal is correct, but its code is the client's, not the decoder's. I left this ordering as it is, because the instruction was that scientific operations refuse unknown request schemas.

The cancellation row halted at accepted coverage 0.9375, where version 2 halted at 0.984375. The abort fires on the first progress event, so its boundary depends on timing. The resume still equals the uninterrupted 214/42.

## Dispositions and remaining open paths

- **O3-R2b:** resolved. Only v2 and v3 request schemas are admitted, in the browser client and in both Node helpers. Anything else is refused before launch in the browser and refused in Node.
- **O3-R1b:** resolved. Runtime on `evolve` and `evolveRecord` is refused before any call; the resume override is kept.
- **O3-R1 and O3-R2:** they remain closed, on the unchanged original probe.
- **Still open:**
  - capabilities advertisement, held until live O3;
  - the v3 sibling of `eom-v2-qualification.mjs`;
  - O4.
- **Not claimed:** physical correctness from consumer stubs, or a measured resource cost.

**Falsifiers.** Any of these:

- either unchanged probe launching or accepting a target;
- any request schema other than v2 or v3 reaching a launch;
- a runtime override dropped on any route;
- any change to a v2 or Surface view.
