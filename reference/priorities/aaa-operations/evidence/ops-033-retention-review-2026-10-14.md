# OPS-033 retention review — October 14, 2026

## Scope and disposition

✓ Done — first monthly report-only pass: budget/allocation inventory and three bounded family reviews. Next due November 14, 2026; one of three passes completed before cadence reassessment. This is a working-tree snapshot with concurrent edits, at observed HEAD `4495d2501eb3f08f3dab28c377a79d8b064ef67c` (`git rev-parse HEAD`); HEAD does not identify every inspected byte. No artifact was deleted, moved, compacted, regenerated or published. Dispositions below are recommendations only.

The live [retention policy](../../../op/machine-artifact-retention.md) now explicitly accepts intact local evidence in established ignored owners without requiring a separate backup for closeout. That supersedes any inference from the [September 8 baseline](../../development-process-review/analysis/retention-health-review.md) that absent backup alone blocks research handoff. Local evidence remains exposed to machine loss. Reproduction must be demonstrated with measured acceptable cost before output is classified as easily regenerated; a command or hash alone is insufficient.

## Measured allocation and budget checks

`node scripts/validate-machine-artifact-retention.mjs` exited 0: blocking checks passed across 2,165 machine files, with 20 advisory findings counting index and working-tree reports separately. The validator does not measure ignored storage, scientific validity, reproduction or backup recovery. Research thresholds are advisory under the current policy; preserve the evidence while reviewing its storage.

The reported large-file findings in both index and working tree are:

- `reference/priorities/app-solver/evidence/matched-pair-stage-3-increment-2/scratch-grouping.jsonl`: 88 lines, 1,517,472 bytes.
- `reference/priorities/master-equation-closure/braid-program/evidence/weber-binding-sphere-reference-F2.json`: 54,919 lines, 1,174,503 bytes.
- `reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave2-results.json`: 1 line, 1,803,013 bytes.
- Same Noether Sea evidence directory: `spherical-six-pole-speed-maximum-feedback-claude-review-audit8-v2-chain.json`: 38,561 lines, 857,151 bytes; `spherical-six-pole-speed-maximum-feedback-claude-support-slice5v2-t1b-t2-t3.json`: 28,253 lines, 739,942 bytes; `spherical-six-pole-speed-maximum-feedback-claude-support-slice5v5-t1b-t2-t3.json`: 28,658 lines, 754,799 bytes; `spherical-six-pole-subrange-feedback-claude-review-audit7-w-chain.json`: 26,029 lines, 557,215 bytes.

Collection advisories in both views: nested Braid Program evidence has 268 machine files, 296,437 lines and 8,980,173 bytes; Noether Sea evidence has 410 machine files, 1,039,962 lines and 29,602,215 bytes. Branch-growth advisories report index 505,119 added lines/16,193,536 positive bytes and working tree 506,832 added lines/16,257,306 positive bytes. These are aggregate accounting, not additional independent defects or deletion scopes. Detailed lifecycle review of the other flagged files remains uncovered; their research owners retain them.

`du -sh reference/priorities reference .git .local-data` and `du -h -d 1 .local-data` produced the rounded allocated-disk snapshot below. Parent/child values overlap; do not add them. There is no same-path September baseline for each new child family, so growth cannot be assigned to those families from these figures alone.

| Area | October 14 allocation | September 8 allocation |
| --- | ---: | ---: |
| Priorities | 148 MiB | 34 MiB |
| Reference | 529 MiB | 413 MiB |
| Git metadata/history | 5.0 GiB | 4.6 GiB |
| Ignored local data | 126 GiB | 105 GiB |
| Braid analysis | 106 GiB | 102 GiB |
| Master Equation Closure local data | 14 GiB | Not separately measured |
| Matched-pair October 12 local outputs | 170 MiB | Not separately measured |
| Children's-book local family | 620 MiB | Not separately measured |

`git count-objects -vH` reports 88,915 loose objects/1.64 GiB, 125,143 packed objects in 11 packs/3.33 GiB, 3,749 prune-packable objects, and 29 temporary garbage files/3.85 MiB. This is local inventory, not safe-deletion evidence; no Git maintenance was run. `df -h .` reports 832 GiB available on the mounted data filesystem. Neither instrument measures remote storage, APFS-exclusive reclaimable blocks or backups.

## Three bounded family reviews

### Changed family: whole-step matched-pair qualification

✓ Reviewed — `reference/priorities/app-solver/evidence/matched-pair-stage-3-increment-2/` and its scratch receipt/review; selected associated local owner `.local-data/eom-matched-pair/2026-10-12/`. `du -sh` measures 1.9 MiB and 170 MiB respectively; the latter includes broader increments and is not the size of this one fixture. `wc -lc` confirms the flagged fixture's 88 lines/1,517,472 bytes. `shasum -a 256` returns `3a974350ff4a4fd12a18544a8592f8eec857b15539998155efc62a4069c82683`.

The [qualification receipt](../../app-solver/evidence/matched-pair-stage-3-increment-2-scratch-receipt-2026-10-12.md) retains source/build identities, output binders, the run script and controls. The [independent review](../../app-solver/analysis/matched-pair-review-stage-3-increment-2-2026-10-12.md) consumes detailed emitted rows and retains a failed known control as provenance. The solver work log records subsequent live qualification. Targeted `rg` of solver receipts/identity files and local review records finds this same digest in increment-3 scratch/live worker output identity lists. These are current historical qualification and cross-worker comparison consumers; their presence does not establish that every raw copy is necessary or that all copies still match today.

**Proposed disposition: keep.** Preserve the flagged fixture and independent records under the solver owner. Existing commands and source inventories support a recovery investigation, but no reproduction or acceptable regeneration-cost measurement was performed in this review. No archive retrieval is established by the inspected records. A smaller replacement has not been shown to preserve the detailed-row obligations. Expected reclaimable space under this recommendation: zero; no deletion candidate is qualified. Falsifier: the solver owner demonstrates that a compact representation preserves all original row/independence obligations and verifies the retained original or an approved disposition.

### Completed family: six-pole antipodal continuation closeout

✓ Reviewed — `.local-data/master-equation-closure/six-pole-antipodal/`, allocated 328 KiB by `du -sh`, with the linked [coordination account](../../master-equation-closure/noether-sea-research/analysis/spherical-six-pole-antipodal-coordination.md), lane priorities/queue and final preservation manifest. The research owner marks the selected continuation complete; later manuscript comparisons consume its retained history. Completion does not make the original observations or independent references disposable.

Current read-only retrieval check: from `.local-data/master-equation-closure/six-pole-antipodal/codex/closeout-1846utc/`, `shasum -a 256 -c manifest.sha256` exited 0 and returned OK for all twelve listed payloads, including source/peer snapshots, verifier and verification receipt. The first invocation from the repository root failed to resolve relative filenames; that was a working-directory error, corrected before drawing a preservation conclusion. This checks local snapshot fidelity only. The saved October 11 instrument receipt reports 154 stable original rows checked then; that full original-row check was not rerun today.

The coordination record explicitly discloses that the first 18:39 manifest listing was overwritten and its exact bytes were not retained. The 18:43 generation and final corrected manifest survive. This is an existing historical capture gap, not a newly demonstrated loss of scientific originals. The records also retain interrupted invocations and failed controls. Exact recovery of the missing first listing is unestablished; no independent remote backup/retrieval was tested. Historical invocation timings in the account do not establish whole-family reproduction cost.

**Proposed disposition: keep.** Retain the current local snapshot and original tracked evidence, including the capture-gap disclosure. Expected reclaimable space under this recommendation: zero. Falsifier: one of the saved snapshot checks fails, a required original is inaccessible, or a separately verified retained equivalent and exact approved retirement scope is supplied. No new scientific acceptance follows from checksum agreement.

### Rotating older family: children's-book pilot outputs

✓ Reviewed — `.local-data/childrens-books/exports/` and `.local-data/childrens-books/preserved-pilot/`, each allocated 309 MiB by `du -sh`, with the [production owner](../../../office-of-learning/childrens-books/production/README.md), manifest and appearance baseline. Source-art directory allocation is 196 MiB. Parent/local family is 620 MiB; allocations overlap and may include filesystem sharing, so summing copies does not establish reclaimable physical space.

The production owner consumes the originals, baseline, source QA and exemplars, and documents on-demand regeneration using `"${AAA_VENV:-../.venv}/bin/python" reference/office-of-learning/childrens-books/tools/render_book_pages.py --all --write` followed by `--check-exports`. No exporter was run. Its August 28 migration receipt reports 333 matching page-image pixel hashes, eight matching PDF content signatures and 357 preserved files matching Git blobs. Those are historical reproduction observations, not today's verification of every export or a measured acceptable current replay cost. Georgia/Arial font and pinned environment dependencies remain material recovery prerequisites.

Current `shasum -a 256` identifies `pilot-appearance.json` as `333319a6c7f72924f448673d7b35dc7948417455c8258a82f3a76fb9a9d1521c` and `generation-manifest.json` as `079ec04875c02695cf2bd65854e649a2d290a244441a4ba1cc3f197c19c15790`. These hashes identify the inspected recipe/baseline; they do not prove payload recovery. No separate archive retrieval was verified.

**Proposed disposition: keep now; consider rebuild-based retirement of selected exports only after a measured current reproduction and exact operator approval.** Preserve all original illustrations, QA, exemplars, baseline and historical pilot independently of export classification. The 309 MiB export allocation is an upper scope indicator, not a promised saving: exclusivity, retained-copy obligations and exact output selection remain unmeasured. No deletion candidate is qualified today; expected approved reclaim is zero. A relocation would not reduce total retained storage. Falsifier: a new reproduction fails, prerequisite fonts/inputs are unavailable, or a required visual/historical obligation depends on an export proposed for retirement.

## Coverage cursor and next pass

○ Deferred — the circular-root pilot detailed lifecycle review remains awaiting the operator's selected milestone. Only broad Braid Analysis allocation was measured; no circular-family consumer or deletion investigation was opened.

○ Next due November 14, 2026 — inspect the changed nested Noether Sea evidence collection first, then a completed non-antipodal research family and an older on-demand output family (iOS package if present). Preserve these three completed family dispositions rather than starting the sample over. Remaining local families from the top-level inventory include Braid Analysis (mostly deferred), collinear research, F5 original input trees, ring exploration/follow-up, EOM outputs, owned-compute records and other smaller owners. The 14 GiB Master Equation Closure parent and 170 MiB solver date directory were not fully reviewed by the small selections above. The other threshold advisories remain uncovered lifecycle scope.

No automatic cleanup or policy/budget change is recommended. Research owners should retain the flagged evidence and preserve current-account/receipt links. The completed snapshot's verified local recovery and the known missing early listing are distinct; do not label either independent backup verification. Cadence reassessment is due after the third completed pass, provisionally December 14 if the monthly passes complete on schedule.

## Operator-selected Noether Sea follow-up — October 14

✓ Done — the operator selected the recommended Noether Sea collection assessment during the same monthly pass. This advances the coverage cursor, not the monthly completion count or November 14 due date. The earlier paragraph identifying this collection as next describes the initial pass; the current disposition is below.

### Complete directory inventory, bounded purpose review

The controlled Node inventory enumerated every regular file under `reference/priorities/master-equation-closure/noether-sea-research/evidence/`, recording name, bytes, physical lines, extension and SHA-256. Before target execution, empty/final-newline/unterminated-line cases, SHA-256 of `abc`, and known family/extension examples passed; the pass was recorded before the target command. It measured 1,190 files and 35,631,352 logical bytes, including the same 410 machine files, 29,602,215 bytes and 1,039,962 lines reported by the morning validator. `du -sh` measures 37 MiB allocated. This inventories every directory entry but does not scientifically review every file or establish physical reclaimable blocks.

| Filename family | All files | Logical bytes | Machine files | Machine bytes |
| --- | ---: | ---: | ---: | ---: |
| Spherical curvature | 345 | 8,941,617 | 154 | 7,390,750 |
| Antipodal continuation | 133 | 1,794,323 | 33 | 985,328 |
| Later feedback | 327 | 6,274,377 | 89 | 4,879,869 |
| Like reception | 150 | 4,536,155 | 45 | 3,780,701 |
| Speed maximum feedback | 74 | 6,263,251 | 26 | 5,674,992 |
| Subrange feedback | 112 | 7,691,681 | 34 | 6,829,517 |
| Three-three | 49 | 129,948 | 29 | 61,058 |

Family assignment is by the explicit filename prefixes in the retained inventory instrument, not by scientific acceptance. The full inventory is retained at `.local-data/aaa-operations/ops-033/2026-10-14/noether-sea-inventory.json`, SHA-256 `640057e3a77c50c790ba69e66497a8d71bcedd90ca3c0b78211099fdaba37e0b`. Instruments and known-case record are alongside it: `noether-sea-inventory.mjs`, `noether-sea-check-manifests.mjs`, `noether-sea-known-cases.txt`. Scratch authoring originals remain under `.tmp/ops-033-noether-sea/`; the useful receipt and executable copies are retained outside scratch.

### Consumer and preservation checks

Targeted exact-basename `rg` over this lane's `analysis/` and `evidence/` traces all five flagged large files to reports, commands or preservation manifests. The curvature wave-2 result feeds its [wave-2 report](../../master-equation-closure/noether-sea-research/analysis/spherical-curvature-claude-coverage-wave2.md) and [wave-3 transfer verification](../../master-equation-closure/noether-sea-research/analysis/spherical-curvature-claude-coverage-wave3.md). The speed-maximum audit is bound into independent adjudications and command records. The [support account](../../master-equation-closure/noether-sea-research/analysis/spherical-six-pole-speed-maximum-feedback-claude-support-wave1.md) explains that v5 supersedes the v2 certificates after start-of-step and join-intersection repairs; both versions retain the historical correction path. The subrange audit supports [independent chain adjudication](../../master-equation-closure/noether-sea-research/analysis/spherical-six-pole-subrange-feedback-claude-review-adjudication-3.md). These are scientific/historical consumers; supersession of a conclusion does not retire original observations or reference bytes.

The controlled manifest reader checks evidence sections only, after known table/raw-row parsing, section-exclusion, known SHA and changed-byte negative cases passed and were recorded before target. All 344 listed curvature evidence entries, all 74 listed speed-maximum evidence entries, and all 112 listed subrange evidence entries match their saved SHA-256; table rows also match declared byte sizes. No listed payload is missing in those sections. The 344-entry curvature manifest section is narrower than today's 345-file curvature inventory. This is local accessibility/byte-fidelity evidence, not complete archive recovery or mathematical revalidation. Native `shasum -a 256` separately agrees for the five flagged files, including v5's manifest row `0f5710537fd75309085513e09ad394bcb42ee1bb6bc4b68634565e6d1ab94d4f`.

The exact manifest-check output is `.local-data/aaa-operations/ops-033/2026-10-14/noether-sea-manifest-check.json`, SHA-256 `7de2b5e747792160cfeafbc611ab97021e089d09fb3e670c3d28256a812ec9c2`. Its three input manifests are named there with hashes. The command is `node .tmp/ops-033-noether-sea/check-manifests.mjs` from the checkout root; the retained copy runs the same bounded check. Analysis/local sections of those manifests were deliberately excluded from this check.

The [curvature coordination record](../../master-equation-closure/noether-sea-research/analysis/spherical-curvature-coordination.md) already discloses overwritten spectrum/table/classifier outputs, unpreserved source versions and deleted member-0 validation outputs. Current matching manifests cannot restore material omitted before their creation. The speed-maximum coordination record explicitly does not claim every transient partial JSON generation was captured. These remain historical preservation limits, not newly demonstrated corruption of the files checked today. No backup or practical reconstruction of those missing original generations was established.

### Reproduction, duplicates and disposition

The original command receipts retain instruments, input chains, known/negative controls and historical wall/RSS observations. For example, the final speed-maximum v5 support invocation records 3.37 seconds and 48,136,192 maximum resident bytes; the subrange adjudication reports its chain audit at 0.99 seconds/39.1 MB. These bound specific historical checks, not complete campaign reproduction. Repaired source generations, predecessor interval chains, arithmetic environment and original observations remain dependencies. No numerical campaign was replayed; no operator-accepted whole-family regeneration cost or exact-byte recovery was demonstrated. Preserve by default under the live policy.

The inventory's SHA grouping finds six groups with identical file contents. An arithmetic reduction of `(copy count - 1) × payload bytes` yields only 38,211 repeated logical bytes across those groups. They include curvature controls recorded under multiple wave names, the antipodal support/RSS pair, the three-three independent control pair, and four speed-maximum support failure/control records. The speed-maximum command receipt specifically explains why v3/v4 failed post-processing outputs match. Therefore byte equality is not evidence that their provenance names or saved manifest bindings are dispensable. This calculation is neither a filesystem savings estimate nor a deletion recommendation; deleting tracked tip files would also leave historical Git objects.

**Recommendation: keep the complete inspected evidence collection in its existing owner.** Retain final results, failed/provisional generations, independent checks, commands and correction lineage. No smaller representation is shown to preserve those obligations; no exact deletion/relocation scope is qualified. Proposed approved reclaim is zero. The collection's 35.6 MB logical size and 38 KB of repeated content provide no measured material saving from deduplication. The related `du -sh` allocations are 8.7 MiB curvature, 1.4 MiB speed-maximum and 1.6 MiB subrange under `.local-data/master-equation-closure/`; neither those small selections nor the tracked evidence directory explain or certify the full 14 GiB parent. No separate archive service or backup requirement is introduced.

Falsifiers and remaining scope: a listed checksum/size mismatch, inaccessible required payload, or newly identified missing original would change the preservation assessment. A proposed smaller representation needs owner evidence that it preserves every affected scientific, historical and independent-reference obligation, measured reproduction cost where relevant and explicit disposition authority. The remaining 660 files outside these three evidence-manifest sections have directory-level inventory and preserve-by-default treatment, not individual hash-to-historical-manifest verification or purpose adjudication. The circular-root detailed-review deferral remains intact. November's cursor advances to a completed non-antipodal family outside this reviewed collection and an older on-demand family; iOS if present, with changed-family selection based on fresh owner/inventory evidence then.
