# Retention health review

## Current assessment

The policy separates authored sources and compact evidence from reproducible runtime data and bulky scientific output. That is a sound retention structure. The current inspection supports compliance with the tracked machine-artifact budgets, but does not establish that ignored outputs are backed up, disposable, or automatically bounded. Disk capacity is not presently the limiting concern; preserving recoverable evidence and retiring unnecessary copies are separate responsibilities.

## Measured storage snapshot — September 8, 2026

These are rounded allocated-disk figures from macOS `du -sh` and `du -h -d 1`, not exact logical byte counts or a measurement of remote GitHub storage. Concurrent research can change them. Parent and child rows overlap and must not be added together.

| Area | Observed allocation | Meaning |
| --- | ---: | --- |
| All priorities | 34 MiB | Current plans, analyses and retained evidence, including the campaign below |
| Development-process campaign | 10 MiB | Current campaign documents and evidence |
| All reference material | 413 MiB | Broader reference tree, not exclusively prose |
| Git metadata/history | 4.6 GiB | Local objects and metadata; remote size not measured |
| Ignored local data | 105 GiB | Bulk research and reproducible outputs |
| Braid-analysis local data | 102 GiB | Principal local-output consumer |
| Circular-root pilot family | 98 GiB | Largest observed family; active recovery inputs may depend on it |
| Available filesystem space | 870 GiB | `df -h .` snapshot; no immediate capacity shortage shown |

`node scripts/validate-machine-artifact-retention.mjs` passed its index and working-tree file, collection, branch-growth and generated-output checks across 1,490 machine files. This does not inspect every prose file or bound ignored local storage. `git count-objects -vH` reported 1.22 GiB loose objects, 3.33 GiB packed objects, and 28 temporary garbage files totalling 3.85 MiB. Those figures are inventory, not authorization or a safe-deletion determination. No cleanup, garbage collection, history rewriting, archive or backup verification occurred.

## Policy strengths and remaining questions

The [retention owner](../../../op/machine-artifact-retention.md) keeps source, independent fixtures and compact receipts in Git, rebuilds declared runtime payloads, checks collection and branch growth rather than only individual files, and requires preservation of scientific authority when storage changes. A hash identifies bytes; it neither retains them nor demonstrates backup recovery. Ignored storage is expressly not a durable backup.

The main gap to investigate is lifecycle management of the large local circular family: identify current consumers and reproduction cost, classify active inputs, unique evidence, recoverable outputs and superseded copies, then verify archive retrieval for anything that cannot be cheaply reconstructed. The operator deferred this review while braid research remains active; revisit only when the operator selects a suitable later research milestone. Do not delete by age or directory size alone, or assume an old failed run is valueless; failure evidence can explain repairs. No deletion is authorized by this review.

A second concern is navigation rather than bytes: keep current conclusions and tasks in their live owners and retain detailed execution records only where they support a current consumer or recovery purpose. Avoid copying the same changing narrative into multiple plans. More documentation is not automatically better evidence.

Git's [housekeeping documentation](https://git-scm.com/docs/git-gc) describes packing and expiration and warns about concurrent-writing risks with immediate pruning. Routine optimization and permanent history removal are different operations. GitHub's [large-file guidance](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github) recommends keeping repositories small and separating large data. The existing source/runtime split aligns with that direction; the local history still deserves its own measured review rather than an assumption that deleting current files reclaims historical bytes.

## Proposed follow-up

○ Deferred — while braid research remains active. At an operator-selected later milestone, inventory current consumers and retention obligations of the circular-root pilot family and propose explicit keep/archive/rebuild/delete dispositions. This is a recommendation, not an accepted deletion or history-maintenance task. Verify actual backup/retrieval before discarding the last valuable copy. The scope should stay on the largest local-output family first; rewriting Git history or trimming explanatory prose is not the starting point.
