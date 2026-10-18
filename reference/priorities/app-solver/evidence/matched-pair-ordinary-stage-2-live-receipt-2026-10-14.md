# Ordinary Integration, Gate O2: Live Application and Qualification Receipt

O2 version 4 is applied to live `src/eom`, as released in the [O2 version 4 review](../analysis/matched-pair-review-ordinary-stage-2-v4-2026-10-14.md). Live acceptance awaits independent review of this receipt. No v3 or v9 wire operation or capability is advertised; that waits for O3. Every instance uses $c_f=1$.

Evidence: [matched-pair-ordinary-stage-2-live/](matched-pair-ordinary-stage-2-live/). Raw outputs are under `.local-data/eom-matched-pair/2026-10-14/ordinary-integration/o2-live/`.

## Application

1. **Re-observed at 13:24:26Z, before any write.** All 96 live files matched the accepted live O1 inventory. Since O1 acceptance, `git --no-optional-locks status` showed only the concurrent Surface session's `src/apps/surface/surface.css` modification and two new untracked Surface fixtures under `scripts/eom/fixtures/`. None of them was touched.
2. **Applied with the file-edit tools only.**
   - Exact-string edits went to `ValidatedRunRecord.hpp` (three hunks), `ValidatedRunRecord.cpp` (five), `ProviderTransport.hpp` (two), `ProviderTransport.cpp` (three, all additive), `ValidatedOrdinaryBridge.hpp` (five), `ValidatedOrdinaryBridge.cpp` (six) and `CMakeLists.txt` (one).
   - The new `eom_validated_persistence_fixture_cli.cpp` was written whole.
   - Each file was confirmed equal to the v4 tree by `cmp` after editing.
3. **Bound.** `diff -rq src/eom` against the accepted O2 v4 tree is empty. The 97-file live inventory, [live-o2-source-inventory.sha256](matched-pair-ordinary-stage-2-live/live-o2-source-inventory.sha256) (SHA-256 `241089222b1873f2…`), is byte-identical to the v4 scratch inventory. The tracked change against `HEAD` is [head-to-live-o2-tracked.diff](matched-pair-ordinary-stage-2-live/head-to-live-o2-tracked.diff), 700 lines, covering O1 and O2 together.
4. **No other change.** No producer, driver, worker, snapshot or reference mathematics, and no frozen instrument, changed. Nothing is staged or committed.

## Live qualification

**Build.** Separate directory `.tmp/eom-ordinary-integration-2026-10-14/build-live-o2/`: Release, two build workers, owned-compute supervisor, exit 0, no compiler warning or error. Library `049bfa47a6bbbffc4d856ad8b78129b92d43169ad888018ea48f24550763cdde`, persistence fixture `db16f5728b63d409…`; all five build identities are in [live-o2-build-identities.sha256](matched-pair-ordinary-stage-2-live/live-o2-build-identities.sha256).

The library archive's hash differs from the v4 scratch archive's (`3ba143fb…`) although the sources are byte-identical. I attribute that to build-location metadata in the archive, which I did not investigate further. The outputs below are byte-identical, including every checkpoint hash, which depends on the embedded source identity.

| Check on the live build | Result |
| --- | --- |
| **Reviewer's O2 checkpoint-creation probe, unchanged** | Known genuine creation and restart pass first. Then the different-origin certificate is refused (`checkpoint_origin_mismatch`), and the changed public histories are refused (`checkpoint_claim_mismatch`) |
| **Reviewer's O2 replay-seal probe, unchanged** | The known genuine boundary passes first. Then the changed public counter and the unrelated zero-leg record are refused |
| **Reviewer's O1 admission probe, unchanged** | Two supported known passes, then six explicit `unsupported_validated_domain` refusals |
| [O2 version 4 checker](matched-pair-ordinary-stage-2-live/o2-v4-check-output.txt), unchanged | **52 of 52**, known cases first. It covers the frozen three-path brackets in uninterrupted, restored and finer restored tubes; the accepted bookkeeping (slack, ledger and debit, chains) over every resumed leg; the ten round trips; R1, R2 and R3 refusals; the independent per-leg step recomputation (13 against 10 replayed and a whole-span count of 2); the worker stack term (exactly 2 × 3 × 8 MiB); and creation after a worker-changed resume |
| Against accepted O2 v4 scratch | `persistence-w1.jsonl` (820 rows) and `ordinary-w1.jsonl` (714 rows): **no field differs** |
| [Frozen increment 4 v2 checker](matched-pair-ordinary-stage-2-live/increment-4-v2-check-output.txt) on rebuilt outputs | 157 of 157. Outputs and record files byte-identical to the accepted live increment 4 outputs |
| [Default comparison](matched-pair-ordinary-stage-2-live/default-comparison.txt) against O0, covering Surface | Five known cases first. 73 identical, including the Surface fixture and every validated, record, ordinary, provider and equation-provider output. 11 equal after only the reviewed build-identity and binding paths. 0 different, 0 missing |
| [Field dispositions](matched-pair-ordinary-stage-2-live/field-dispositions.txt) | 103 of 103 |
| Unchanged frozen O1 v2 checker | [56 of 57](matched-pair-ordinary-stage-2-live/o1-v2-check-output.txt). The one failing row is the one-worker versus four-worker byte identity of the O1 fixture. All 26 differing rows differ only in `memory_estimate` and the two budgets derived from it, because of the accepted 8 MiB-per-helper stack term. Full byte identity across worker counts is not claimed; mathematical and evidence results agree under the declared worker, resource and hash exclusions |

Output identities are in [live-o2-output-identities.sha256](matched-pair-ordinary-stage-2-live/live-o2-output-identities.sha256). Default, wire and increment 4 regression output identities are in [live-o2-regression-output-identities.sha256](matched-pair-ordinary-stage-2-live/live-o2-regression-output-identities.sha256).

## Scope of the claim

**Measured:** the live tree equals the accepted O2 v4 subject, and on its build every check above passes or is stated.

**Not claimed:**

- wire, inspection or consumer support for v3 or v9;
- that the admission bound is a measured resident-set or cost figure;
- any long-run physical acceptance.

**Falsifiers.** Any of these:

- a live file differing from the bound inventory;
- a probe target succeeding on a rebuild;
- a checker row failing beyond the stated O1 worker-parity observation;
- a default output differing outside the reviewed paths;
- any edit to a Surface-owned file.
