# Ordinary Integration, Gate O3: Live Capabilities and Public v3 Contract

This applies the corrected capabilities member and the public v3 contract, as released in the [capabilities and contract review](../analysis/matched-pair-review-ordinary-capabilities-contract-2026-10-14.md). It does so on top of the [accepted live O3 wire and clients](matched-pair-ordinary-stage-3-live-receipt-2026-10-14.md). The solver and its mathematics are unchanged. Every instance uses $c_f=1$. Nothing is staged or committed.

Evidence: [matched-pair-ordinary-stage-3-capabilities-live/](matched-pair-ordinary-stage-3-capabilities-live/). Raw outputs are under `.local-data/eom-matched-pair/2026-10-14/ordinary-integration/o3cap-live/`.

## Application

**The registry.** One exact-string edit to `src/eom/src/EquationRegistry.cpp`, made with the file-edit tool ([27-line diff against `HEAD`](matched-pair-ordinary-stage-3-capabilities-live/live-registry.diff)). It adds `executionMethods` with Codex's corrections:

- **The replacement domain sentence, verbatim.** It covers origin preflight and accepted-step producer admission for retained-past speed, separation, whole-step reception-time and receiver-box coverage, and past emission-root coverage. An origin decline publishes nothing validated. A later refusal keeps only the prior accepted prefix. Inspection does not run the preflight.
- **`ordinaryControlRestrictions` in place of a blanket refusal.** `maximumStep` must be absent or equal to `initialStep`; `maxStepAttempts` absent or 10000; `maxRejectedSteps` absent or 1000; any other value is refused by name.
- **Explicit defaults:** `defaultPairPolicy: disabled` and `defaultThreadCount: 1`.
- **Runtime:** the override applies on resume only, and evolve refuses it.
- **Two scopes stated outside the execution digest:** the per-invocation step limit and the resume worker override.
- **Restart:** full replay from the original request and origin, with no partial restore; uploaded hashes are never evidence.
- **`capabilityMeaning`:** an interface capability only, not per-request or physical certification. `independentlyAccepted` and `scientificAcceptance` are false.

**The contract.** The new file [`contracts/evolution-contract-v3.md`](../contracts/evolution-contract-v3.md) states the same points, distinguishing an origin-preflight decline from a later halt that keeps its prior accepted prefix. `evolution-contract-v2.md`, the v8 schema, the law and Surface are unchanged.

**Live solver tree.** The [97-file live inventory](matched-pair-ordinary-stage-3-capabilities-live/live-source-inventory.sha256) differs from accepted O3 live only in `EquationRegistry.cpp`. The four consumer files are unchanged from accepted O3 live. Surface hashes are unchanged from 15:08Z: `20e6a477…`, `c609611f…` and `3b8f959f…`.

**Build.** `build-live-o3cap`, two workers, supervisor run `e6b83310-2d3d-474a-8863-bc32355abf0d`: exit 0, no warning. Final identities are in [final-identities.sha256](matched-pair-ordinary-stage-3-capabilities-live/final-identities.sha256):

- library `7fae950bcc961db4…`;
- CLI `bbd308e92fc06931…`;
- contract `5b29291814c86e05…`;
- registry `1f9228c984a24fe9…`.

The wire and default commands ran under supervisor run `a96d851c-f507-4eb8-ba0f-dd4c975249dc`, exit 0.

## Live qualification

| Check | Result |
| --- | --- |
| [Default comparison](matched-pair-ordinary-stage-3-capabilities-live/default-comparison.txt) against the frozen O0 baseline | **72 identical, 9 equal after the reviewed identity projection, 3 different.** All three differences are declared: the earlier v3-rejection transition, and the capabilities document from both the wire operation and the inspect CLI. The 11 projected files of O3 become 9 because those two capabilities documents moved from projected to different. No other model, default or identity transition appears. The comparator reports overall FAIL with these differences, and I do not claim zero differences |
| [Wire checker, capabilities version](matched-pair-ordinary-stage-3-capabilities-live/o3-wire-check-output.txt) | **17 of 17.** Known first: both capabilities documents differ from O3 live in exactly `build` and the added `executionMethods`, and the two members are equal. Then every v3 wire outcome as before |
| [End-to-end](matched-pair-ordinary-stage-3-capabilities-live/end-to-end-output.txt): the live service, process and browser clients over real `fetch`, and the live CLI | **17 of 17.** The capabilities row now checks the exact member: ordinary is default; the validated method is opt-in with v3 and v9, disabled grouping, one worker, the restrictions and a resume-only runtime; every other member is unchanged |
| Reviewer's CLI-server probe, unchanged, on the final build | Known first; then 4 requests, a durable 2-step prefix, a 4-step resume with 2 replayed steps and 4 workers, and terminal exit code 0 |
| Reviewer's version and O3 consumer probes, unchanged | Known first; every target refused (3 and 7 refusals); the resume override is forwarded |

**Author rows changed, with the originals preserved.** The "advertise no execution method" rows in the [wire checker](matched-pair-ordinary-stage-3-capabilities-live/wire-checker-o3-to-capabilities.diff) and the [end-to-end runner](matched-pair-ordinary-stage-3-capabilities-live/end-to-end-runner-o3-to-capabilities.diff) are replaced by rows that check the exact member. The O3 versions are unchanged.

**One defect of my own instrument.** The first run of the new wire checker expected two declared differences. It missed that the inspect CLI emits the same capabilities document, so it failed its known case and stopped ([preserved output](matched-pair-ordinary-stage-3-capabilities-live/o3-wire-check-output-first-two-differences-expected.txt)). The corrected checker expects three differences, and it requires the inspect document to differ exactly as the wire document does, with the same member. The subject did not change.

**Not rerun on this build:** the O2 v4 checker, the C++ O2 and O1 probes, frozen increment 4, and the consumer checker. They passed on the O3 live build an hour earlier, and since then only the capabilities text in `EquationRegistry.cpp` has changed. The default comparison shows no output change outside the capabilities documents, apart from the identity paths already projected.

## Earlier failure record, preserved

Codex located the records of the failed scratch configure, supervisor run `aa776244-181b-448e-86ca-3ace31b53921`: the lease, stdout reading `configure-failed`, and an empty stderr. They are now copied to `o3cap-scratch/first-configure-failure-aa776244/`. The invocation was `build-o3cap.sh` with `S=.tmp/eom-ordinary-integration-2026-10-14/o3cap-tree/eom`.

I deleted the detailed CMake configure log. What I saw in it before deleting: the source-identity step could not read files under `../../reference/`. That account, and my attribution of the failure to tree depth, are unverified history; the detailed log is gone. My earlier statement that the supervisor log was deleted was imprecise. I overwrote my own redirected copy, but the canonical supervisor records survive. Nothing further was deleted.

## Still open

- **O4 closeout,** including the supervisor closeout and the preservation receipt.
- The `eom-v2-qualification.mjs` sibling is not needed, per the review.

**Falsifiers.** Any of these:

- any capabilities member other than `build` and `executionMethods` changing;
- a default difference outside the three declared;
- the advertised member disagreeing with transport behaviour;
- a v2, v8 or Surface output changing.
