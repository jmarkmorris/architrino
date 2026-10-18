# Ordinary Integration, Gate O3 Live: Wire and Client Application and Qualification

This applies the [accepted O3 version 3 scratch candidate](matched-pair-ordinary-stage-3-v3-scratch-receipt-2026-10-14.md) live, as released in the [O3 version 3 review](../analysis/matched-pair-review-ordinary-stage-3-v3-2026-10-14.md). It then qualifies the live tree. Every instance uses $c_f=1$. Nothing is staged or committed, and no capability is advertised.

Evidence: [matched-pair-ordinary-stage-3-live/](matched-pair-ordinary-stage-3-live/). Raw outputs are under `.local-data/eom-matched-pair/2026-10-14/ordinary-integration/o3-live/`.

## Application

**Fresh preimages, at 14:59–15:00Z.**

- Live `src/eom` matched the accepted O2 inventory: 97 files, none differing.
- The three live consumer files were unmodified (`git status`), and `EomExecutionIdentity.js` did not exist.
- Surface state: `src/apps/surface/surface.css` modified and two untracked `scripts/eom/fixtures/surface-torus-*` files, none of them touched. Their hashes at 15:08Z:
  - `surface.css`: `20e6a477…`
  - `surface-torus-reference.py`: `c609611f…`
  - `surface-torus-run.mjs`: `3b8f959f…`
- Unrelated concurrent changes, also untouched: the Photon files.

**Edits, all with the host's file-edit tools.**

- **Transport:** seven exact-string edits to `src/eom/src/ProviderTransport.cpp`, following the reviewed [181-line transport diff](matched-pair-ordinary-stage-3/live-to-o3-transport.diff).
- **Consumers:**
  - `EomExecutionIdentity.js` was written whole;
  - two edits in `EomV2ProcessClient.mjs`;
  - one in `EomResponseRecord.mjs`;
  - five in `EomV2HttpClient.js`.

**Byte equality after application.**

- `ProviderTransport.cpp` is byte-equal to the reviewed O3 tree. `diff -rq src/eom` against that tree is empty, and the [97-file live inventory](matched-pair-ordinary-stage-3-live/live-o3-source-inventory.sha256) equals the tree's.
- All four consumer files are byte-equal to the accepted O3 version 3 files ([identities](matched-pair-ordinary-stage-3-live/live-o3-consumer-identities.sha256)).
- `EomV2Service.mjs`, `EomQualifiedSurfaceRecord.mjs` and `EomJsonHttp.js` remain byte-identical to the reviewed copies.

**Build.**

- Separate directory `build-live-o3`, two workers, under the owned-compute supervisor: run `5e209179-6251-4139-b4fe-a362a5d8625b`, completed, exit 0, no warning.
- Library SHA-256 `90027ef7dd8988ac35f7f9e834ef6ce1dab5f4af9b1867fc9b5b0cab46dd0f17`.
- The wire, regression and default commands ran under supervisor run `c4e40157-7a61-42df-a611-0808fb533a2d`, completed, exit 0.

## Live qualification

| Check | Result |
| --- | --- |
| [Wire checker](matched-pair-ordinary-stage-3-live/o3-wire-check-output.txt), through the real `eom-v2` CLI | **16 of 16**, known cases first |
| [Default comparison](matched-pair-ordinary-stage-3-live/default-comparison.txt) against the frozen O0 baseline | **72 identical, 11 equal after the reviewed identity projection, 1 different.** The one difference is the deliberate version transition: `reject-request-v3` is now `invalid_request`, for lacking `execution`. The summary is the same as the reviewed scratch comparison. The comparator reports overall FAIL with this one difference, so I do not claim zero differences. Its note that 6 files needed a path the receipt did not name is also as in scratch |
| [Reviewer's version probe](matched-pair-ordinary-stage-3-live/reviewer-o3-version-probe-output.txt), unchanged, on live | Known first; then v99 in the browser is refused with 0 launches, v99 in Node is refused, and runtime on evolve is refused with 0 launches |
| [Reviewer's O3 consumer probe](matched-pair-ordinary-stage-3-live/reviewer-o3-consumer-probe-output.txt), unchanged, on live | Known first; every defect target is refused before launch; the resume runtime override is forwarded |
| [Reviewer's CLI-server probe](matched-pair-ordinary-stage-3-live/reviewer-o3-server-probe-output.txt), unchanged, on the live build | Known parser-only cancellation first. Then 4 server requests, with v3 inspection, a durable 2-step prefix and a 4-step resume. Two steps were replayed and the 4-worker override was reported. Terminal: exit code 0, no signal |
| [End-to-end](matched-pair-ordinary-stage-3-live/end-to-end-output.txt): the live service on a local port, the live process and browser clients over real `fetch`, the live CLI | **17 of 17**, known first. This includes the record bytes and SHA-256, the marker, the checkpoint readback, the browser-abort cancellation at an accepted boundary, and `resumeRecord` with `threadCount` 2 equal to the uninterrupted 214/42. v99 and evolve runtime are refused with 0 calls |
| [Consumer checker](matched-pair-ordinary-stage-3-live/consumer-check-output.txt) | 24 of 24. All 8 retained v2 and Surface views are byte-identical between the committed `HEAD` projection and the live one |
| [O2 v4 checker](matched-pair-ordinary-stage-3-live/o2-v4-check-output.txt) | 52 of 52 |
| All three O2 probes and the O1 admission probe, unchanged | Known first; every target refused ([creation](matched-pair-ordinary-stage-3-live/reviewer-o2-checkpoint-creation-probe-output.txt), [replay-seal](matched-pair-ordinary-stage-3-live/reviewer-o2-replay-seal-probe-output.txt), [O1 admission](matched-pair-ordinary-stage-3-live/reviewer-o1-admission-probe-output.txt)) |
| [Frozen increment 4 v2 checker](matched-pair-ordinary-stage-3-live/increment-4-v2-check-output.txt) | 157 of 157. Every increment 4 output and record is byte-identical to live O2's |
| O1 fixture output, workers 1 and 4 | Byte-identical to live O2 |

## Instrument repairs and defects, named and preserved

1. **End-to-end Node-helper row (Codex's finding).** In the scratch runner, the row passed the v99 request object where both helpers take the raw JSON string. That row therefore tested unreadable JSON rather than the version branch. The live runner passes `JSON.stringify({operation: 'evolve', request: v99})`. Both helpers now refuse on the version branch: `unsupported_response_schema` and `execution_binding_mismatch`, each naming the schema. The scratch report is preserved unchanged ([runner diff](matched-pair-ordinary-stage-3-live/end-to-end-runner-scratch-to-live.diff), which also repoints the imports at live).
2. **The consumer checker's reference.** The checker compares the new projection with the previous one, which it imported from the live path. After application that path holds the new file, so the first live run compared the file with itself. It is preserved as `o3-live/consumer-check-output-self-reference.txt` and not counted. The reference was repointed to `git show HEAD:scripts/eom/EomResponseRecord.mjs`, and that run is the 24 of 24 above ([checker diff](matched-pair-ordinary-stage-3-live/consumer-checker-scratch-to-live.diff)).
3. **The persistence fixture's file directories.** The first live run of the persistence fixture lacked its `w1-files` and `w4-files` output directories, so both workers wrote a FATAL row (`checkpoint temporary open failed`). It is preserved in `o2-regression/first-run-missing-file-directories/`. With the directories created, the rerun gives the 52 of 52 above.

None of these changed the subject.

## Stated observations, carried forward

- The frozen O1 v2 checker's worker byte-parity row stays at 56 of 57: the helper-stack term is kept in both bounds, which makes the memory estimate depend on the worker count.
- When v99 is posted directly to the service, the native decoder refuses it first. The process client's binding check then reports `execution_binding_mismatch`, naming the schema. That disposition is accepted. Supported v2 and v3 errors pass through unchanged.
- This is interface and replay evidence. It is not independent mathematical truth or a measured cost.

## Still open

- **Capabilities and the public v3 contract.** Preparation is released concurrently, and advertising waits for live acceptance.
- **O4:** live reconciliation and closeout.

**Falsifiers.** Any of these:

- a live file differing from the reviewed bytes;
- an unchanged probe accepting a target;
- a v2 or Surface view changing;
- a default difference beyond the declared v3-rejection transition;
- a capability advertised before live acceptance.
