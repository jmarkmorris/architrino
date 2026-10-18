# Ordinary Integration (eom-009): Closeout and Preservation Receipt

This closes Claude's implementation side of the 2026-10-14 ordinary-integration window. The window opened with Op's direction relayed by Codex; its scope is in [the integration scope](../contracts/matched-pair-ordinary-integration-scope.md) and its record in [the collaboration chat](../../../op/agent-chats/2026-10-14-eom-ordinary-integration/chat.md). Times were read from the clock: closeout at 15:32Z, before the 15:38:07Z new-work cutoff and the 15:58:07Z hard close.

## Gate state

| Gate | State | Receipt |
| --- | --- | --- |
| O0 design and frozen baseline | Accepted | Stage 0 design and baseline |
| O1 typed bridge | Accepted live | `matched-pair-ordinary-stage-1-live-receipt-2026-10-14.md` |
| O2 typed persistence (v9) | Accepted live | [O2 live receipt](matched-pair-ordinary-stage-2-live-receipt-2026-10-14.md) |
| O3 wire and clients | Accepted live by Codex, contribution 14 | [O3 live receipt](matched-pair-ordinary-stage-3-live-receipt-2026-10-14.md) |
| O3 capabilities and public v3 contract | Accepted live by Codex, contribution 16 | [capabilities live receipt](matched-pair-ordinary-stage-3-capabilities-live-receipt-2026-10-14.md); [final review](../analysis/matched-pair-review-ordinary-final-live-2026-10-14.md) |
| O4 bounded end-to-end qualification | Complete, independently accepted by Codex, contribution 16 | The same final review |

**The grade is bounded:** interface, persistence and replay qualification of the existing validated engine through the ordinary service and clients. It is not independent mathematical acceptance, a physical certification or a measured cost. Earlier accepted producer, ledger, state, record and resource evidence carries forward only because those source units are byte-unchanged.

## Preservation

- **Owned compute.** The supervisor closeout for owner `local_5718c3d8-dceb-4f4b-a4a5-d8e1e0fb5924` reports `clear` over 2345 leases (`.local-data/.../ordinary-integration/final-supervisor-closeout.json`). No EOM solver or runner process remained at 15:32Z. No other process was signalled at any point.
- **Git.** Nothing is staged or committed. Committing waits for Op.
- **Files this task owns in live source.** Each was modified with the file-edit tools:
  - `src/eom/`:
    - `CMakeLists.txt`;
    - `include/architrino/eom/`: `CoupledEvolution.hpp`, `ProviderTransport.hpp`, `ValidatedRunRecord.hpp`, and the new `ValidatedOrdinaryBridge.hpp`;
    - `src/`: `Checkpoint.cpp`, `CoupledEvolution.cpp`, `EquationRegistry.cpp`, `ProviderTransport.cpp`, `ValidatedRunRecord.cpp`, and the new `ValidatedOrdinaryBridge.cpp`;
    - `native/`: the new `eom_validated_ordinary_fixture_cli.cpp` and `eom_validated_persistence_fixture_cli.cpp`;
  - `scripts/eom/EomResponseRecord.mjs` and `scripts/eom/EomV2ProcessClient.mjs`;
  - `src/apps/shared/EomV2HttpClient.js` and the new `src/apps/shared/EomExecutionIdentity.js`;
  - the new public contract `reference/priorities/app-solver/contracts/evolution-contract-v3.md`.
- **Not this task's; untouched throughout:**
  - `src/apps/surface/surface.css` and `scripts/eom/fixtures/surface-torus-*`, belonging to the Surface session. Their hashes at 15:08Z and 15:31Z are `20e6a477…`, `c609611f…` and `3b8f959f…`;
  - `src/apps/photon/PhotonFormulaRuntime.js` and `tests/photon-runtime.test.js`;
  - the content and reference files modified by other sessions.
- **Evidence.** Raw outputs, including every failed instrument run, are under `.local-data/eom-matched-pair/2026-10-14/ordinary-integration/`. Scratch trees and builds are under `.tmp/eom-ordinary-integration-2026-10-14/`. Nothing further was deleted after Codex's retention instruction. The one earlier deletion (the detailed configure log of run `aa776244…`) is recorded as a gap in the capabilities receipt.

## Observations carried forward

- The frozen O1 v2 checker's worker byte-parity row stays at 56 of 57, because of the helper-stack term in the memory estimate.
- The frozen default comparator reports 3 declared differences against the O0 baseline: the v3-rejection transition, and the capabilities document from both the wire and the inspect CLI. There is no zero-difference claim.
- An unsupported v99 request posted to the service reports the client's `execution_binding_mismatch`, naming the schema. The native decoder refuses it first.
- All of this is interface and replay evidence. None of it is independent mathematical acceptance or a measured resource cost.

## Final binders, verified at 15:35Z

- **Source.** Live `src/eom` equals the [final 97-file inventory](matched-pair-ordinary-stage-3-capabilities-live/live-source-inventory.sha256). It differs from accepted O3 live only in `EquationRegistry.cpp` (`1f9228c9…`).
- **Consumers.** All four files match the [O3 live consumer identities](matched-pair-ordinary-stage-3-live/live-o3-consumer-identities.sha256), 4 of 4.
- **Contract.** `evolution-contract-v3.md` is `5b292918…`.
- **Build.** `build-live-o3cap`, run `e6b83310…`. The library, CLI and the rest are listed in [final-identities.sha256](matched-pair-ordinary-stage-3-capabilities-live/final-identities.sha256).
- **Final packet.** `.local-data/.../stage-3-capabilities-live-records.sha256` (`fdf0663a…`): every one of its 18 entries verifies.
- **Defaults.** Ordinary execution, grouping disabled, one worker. The frozen comparator remains overall FAIL, with 72 identical, 9 at reviewed identity paths, and 3 accepted interface differences.
- **Surface.** Unchanged at `20e6a477…`, `c609611f…` and `3b8f959f…`.

## Stop

- **Owned compute.** A second supervisor closeout at 15:35Z for the same owner reports `clear` over 2345 leases (`final-supervisor-closeout-stop.json`). No EOM solver, runner or supervisor process of this task was running, and nothing is staged.
- **Codex's stop instruction (contribution 16) was received, read and processed in this session.** It was applied by:
  - making no further implementation, compute, cleanup, publication, source change or evidence deletion;
  - writing only this receipt and the final chat entry.

  This is an applied stop, not merely a file entry.
- **No backup claim.** The evidence under `.local-data/` and `.tmp/` is ignored local storage. No external backup of it is claimed.

## Open for Op

1. Whether to commit the owned files listed above. Nothing was staged or committed, and committing is Op's call.
2. Pointing the app-solver priorities and work queue at these receipts. This is not done here, to avoid editing shared trackers during the stop.
