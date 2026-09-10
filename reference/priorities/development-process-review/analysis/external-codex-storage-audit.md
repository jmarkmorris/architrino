# External Codex storage audit

**Reviewer:** Moose. **Date:** September 8, 2026. **Status: ◐ Partial — all 99 substantive files have byte-verified repository counterparts; external deletion not performed.** Moose owns preservation and this report; Betty coordinates external deletion and task-directory consumers. The authorized scope includes historical repository evidence and ignored local preservation storage. It does not authorize a new theory campaign, alter acceptance grades, or change task workspaces.

## Preservation execution

### Archive and restoration checkpoint

✓ Done: the local archive at `.local-data/option-b-trial/external-option-b-preservation/preservation-v1.tar.gz` is bound by the [archive receipt](../evidence/external-codex-archive-receipt.json). The archive contains the complete preservation manifest and 91 distinct content blobs, representing all 99 substantive source paths without storing identical bytes repeatedly. `git check-ignore` confirms that the archive is ignored. No Finder metadata or symlink is included.

Claim grade: measured. The archive helper first passed a two-file known case containing `abc` and an empty file, including nested-path restoration, the published `abc` SHA-256, corrupt-byte rejection, and symlink rejection. It then packaged and restored the target into `.tmp/external-codex-storage-audit/archive-restore-eKJZ3I/verification/`: all 99 restored source paths passed exact byte-count and SHA-256 comparison against the original preservation manifest. A separate `cmp -s` pass confirmed all 99 restored files equal their repository counterparts. The archive is 192,627 bytes, SHA-256 `99b8ddf9260d4ef73040650042caccf6b1c9589da3caf68dc7b59cb30930f200`; its manifest is bound by SHA-256 `1047e2c0b72e8bf0d594246ef627e5988965055cacf03d155d9a62cd097a2f30`. The receipt records 92 archive members: one manifest and 91 blobs. A changed archive digest, missing member, or restored byte mismatch overturns this integrity result.

The retained helper is `.local-data/option-b-trial/external-option-b-preservation/archive.cjs`. From this checkout, verify another isolated restoration with the command below, choosing a destination that does not already exist. It verifies the archive digest and exact member list before extracting, then recreates each original source-relative path below `restored/`; it executes no preserved script.

```bash
node .local-data/option-b-trial/external-option-b-preservation/archive.cjs restore .tmp/external-codex-storage-audit/restoration-review
```

○ Blocked on durable backup: this archive, the unpacked preservation copies, and the restored test files are on the same machine. They do not establish independent backup. Before releasing unique external originals, the operator/coordinator must identify an authorized durable destination outside this machine's failure domain, retain the archive plus its receipt, helper, and preservation manifest there, state the retention period and responsible owner, and verify retrieval against these recorded digests. No cloud destination or retention guarantee is inferred. The local restore procedure is ready; transfer and verification of an independently retained copy remain unsatisfied.

### Minimal file-only deletion candidate

✓ Done for preservation readiness; ○ Not done for deletion. The smallest substantive batch is exactly one duplicate: `2026-09-08/option-b/outputs/baseline-review.md` under the manifest's external root. It has 6,558 bytes and SHA-256 `f761ca206c68884f886839bae2faae30f0239df598a1609e72d2c0a694a205d0`. Its repository counterpart is [the fictional baseline review](../evidence/option-b-fictional-baseline-review.md). `cmp -s` reverified the external and repository copies; `git show HEAD:reference/priorities/development-process-review/evidence/option-b-fictional-baseline-review.md` also reproduced that digest at inspected HEAD `6efafe15b4f120638fe6938aa65c817eb293e4a8`. This is a duplicate-removal candidate, not deletion of the sole unique record. Local Git verification does not prove remote backup.

The coordinator can release this exact file after confirming no active writer or task consumer requires its external pathname and rechecking its digest immediately before deletion. The bounded `rg -n -F 'baseline-review.md'` search within Option B's external `outputs/` and `work/` returned references to the different `option-b-first-chain-baseline-review.md` filename, not an exact dependency on this output; that search does not cover saved task messages or dynamically assembled paths. No unconditional no-consumer claim is made. Leave `outputs/`, `work/`, the Option B task directory, every other task directory, and both symlinks intact. Directory-shell removal is a separate unresolved task-binding decision, and this preparation does not authorize deletion.

This checkpoint follows Betty's bounded request to prepare local recovery and identify the remaining decision. No external file or directory was deleted, no task cwd was altered, no symlink was traversed, and no Git publication was performed.

The documented restore command was also executed successfully at `restoration-review`, verifying all 99 files again. The reply to replacement Betty was rejected by automatic approval review because it still did not accept authorization for that destination. This completed record remains available for direct coordinator inspection; no alternative delivery path was used.

The visible Moose task reused the original inventory and comparison instruments. Their known cases passed before the target rerun, which again measured 107 non-directory entries, 867,731 logical bytes, and 35 matches among 99 substantive files. The proposed destinations below are the execution batches. The four named narratives were read completely before copying; their contents concern Architrino reviews, theory and application decisions, and project collaboration. Their historical instructions and status statements remain inert.

The preservation helper at `.tmp/external-codex-storage-audit/preserve.cjs` passed the published SHA-256 value for `abc`, an exact copy, rejection of an existing unequal destination, and rejection of a symlink source before target use. It checks every source path component for symlinks, refuses unequal destination collisions, and verifies source and destination bytes. It never deletes. Existing tracked matches remain in their current owners; the two empty logs use their named experiment counterparts under `.local-data/option-b-trial/`, not arbitrary empty files.

Before this additive preservation batch, the binding inventory comprises the original appendix digests, the comparison inventory, existing Option B manifests and receipts, historical script paths, and task cwd bindings described below. Historical source bytes and current implementations are not rewritten. Ignored copies retain complete source-relative paths under `.local-data/option-b-trial/external-option-b-preservation/`; their explicit disposition is retained historical evidence pending reconciliation and backup coordination.

The [preservation manifest](../evidence/external-codex-preservation-manifest.json) records all 99 exact source/destination mappings, byte and physical-line counts, source and destination SHA-256 digests, verification time, and batch identities. The source root plus a row's source identifies the external file; its destination is relative to this checkout. A second copy and the preservation helper are retained under `.local-data/option-b-trial/external-option-b-preservation/`. The helper is a storage instrument; it executes none of the archived experiment scripts.

| Status | Verified preservation batch | Files | Bytes | Remaining condition |
| --- | --- | ---: | ---: | --- |
| ✓ Done | Four historical narratives copied to the subject evidence owners below | 4 | 37,652 | External deletion awaits coordinated source-specific release. |
| ✓ Done | Other unmatched Option B records copied to ignored local evidence | 60 | 478,995 | Verify archive and retrieval before deleting irreplaceable originals; semantic reconciliation remains bounded. |
| ✓ Done | Nonempty live tracked counterparts rechecked | 33 | 305,913 | Recheck source and destination immediately before coordinated deletion. |
| ✓ Done | Empty logs matched to named experiment counterparts | 2 | 0 | Retain their experiment provenance when removing external copies. |

Claim grade: measured. The preservation helper verified all 99 byte pairs, then a separate `cmp -s` pass verified all 99 again after passing positive and negative known cases. The two empty-log names, byte counts, and digests also occur in the retained [original Node-trial verification record](../evidence/option-b-node-trial/verification.json); their preservation does not rely on arbitrary empty-file equivalence. These checks establish copied bytes, not scientific correctness, backup durability, or absence of external consumers. A changed source or destination invalidates its row and requires a fresh comparison.

The exact verified batch and unresolved consumers were delivered to the originally designated Betty task before any deletion. A subsequent coordination handoff named a replacement Betty task. Automatic approval review rejected messages to that replacement twice, including after a read-only task check, because it did not accept the handoff as user authorization for the new destination. No indirect messaging workaround was attempted. Delivery to the replacement remains blocked pending direct authorization; the original coordinator already received the manifest and preservation results.

◐ Partial: the archive and local retrieval recipe are verified above under the [retention policy](../../../op/machine-artifact-retention.md#version-and-evidence-handling). Deletion of irreplaceable external originals remains blocked on independently retained backup. Neither a Git commit nor a durable backup was created by this task. Historic outputs containing volatile metadata are recovered from preserved bytes, not recreated by rerunning obsolete patch scripts.

○ Blocked: directory removal still needs task cwd decisions and a writer check. The two `node_modules` symlink identities were rechecked using `readlinkSync`; neither target was traversed. The rerun of `git grep -n -F 'Documents/Codex' -- reference scripts tests src .github AGENTS.md` found the central cleanup checklist, while ordinary `rg` over those roots also found the worktree lesson. These bounded literal searches do not rule out dynamically constructed consumers or task-state bindings.

The normal right-panel file-open tool queued this report for the Moose task. The computer-use tool refused access to the Codex app, so rendered Markdown mode could not be selected or verified. No PDF or alternative export was substituted.

### Historical narrative routing

The four originals are preserved without editorial changes: [the July 31 dragnet review](../../aaa-corpus-dragnet/evidence/luna-corpus-dragnet-review-2026-07-31.md), [the August 1 voice handoff](../evidence/historical-voice-handoff-2026-08-01.md), [the Topo coordinate decision](../../app-topo/evidence/two-layer-coordinate-decision-2026-08-05.md), and [the fictional prototype review](../evidence/option-b-fictional-prototype-review.md). They are historical evidence, not current instructions or newly accepted theory. In particular, the voice handoff's open trailing-front status is superseded in the [field-speed work log](../../field-speed-ceiling/work-log.md), and the [Topo work log](../../app-topo/work-log.md) records the approved two-view checkpoint. Source paths, old instructions, informal style, and historical limitations inside these preserved records remain unchanged.

The 60 ignored files include 12 Markdown snapshots. `diff -u` against the named live owners and direct reading of the two append fragments support the routing below. This comparison identifies drafting relationships; it does not certify every historical assertion or reopen a scientific review. All 12 snapshots remain byte-preserved even where a later owner contains their substance.

| Historical files below `2026-09-08/option-b/work/` | Current owner and preservation judgment |
| --- | --- |
| `pilot-report-before-review.md` | [Real-chain pilot](option-b-real-chain-pilot.md): the live file adds the subsequent dependency-review section. Retain the earlier snapshot as chronology. |
| `dependency-review-before-candidate.md`, `option-b-dependency-map-review.md` | [Dependency-map review](option-b-dependency-map-review.md): the two originals share a digest; the live owner adds the corrected-candidate follow-up. |
| `candidate-review-before-readiness.md`, `option-b-corrected-candidate-review.md` | [Corrected-candidate review](option-b-corrected-candidate-review.md): the two originals share a digest; the live owner clarifies a source-label phrase and includes subsequent integration/replay sections. |
| `readiness-before-stack.md`, `option-b-integration-readiness.md`, `option-b-integration-readiness-revised.md` | [Integration readiness](option-b-integration-readiness.md): the first pair shares a digest and retains the earlier custom-reader proposal; the revised draft contains the library selection but predates later integration sections. Do not restore the superseded custom-reader proposal as current guidance. |
| `node-trial/postmerge-append.md`, `node-trial/readiness-append.md` | The corrected-candidate and readiness owners above contain the corresponding historical subject sections. Preserve exact fragments locally rather than inserting them again. |
| `node-trial/moving-single-root-dependency-map.md` | [Moving-single-root contract](../../master-equation-closure/contracts/moving-single-root-dependency-map.md): the live owner describes corrected fresh-output coverage and the two-chain workflow. The earlier one-chain snapshot remains historical. |
| `stage-two/option-b-first-chain-baseline-review.md` | [First-chain baseline review](option-b-first-chain-baseline-review.md): the live owner contains relocated links and the later integration disposition and verification. The scratch snapshot preserves the pre-integration review boundary. |

✓ Done: all historical bytes above are preserved. ◐ Partial: narrative comparison identifies owners and substantive version differences; exhaustive semantic equivalence and historical Git-object matching are deferred. No claim that an unmatched file lacks useful content is used to justify deletion.

## Finding

The visible dated folders substantially overstate the amount of stored material. A recursive, non-symlink-following Node filesystem inventory measured **107 non-directory entries, 867,731 logical bytes** across the Documents/Codex root. That comprises 105 regular files and two symlinks; symlink sizes describe link text, not their target trees. The largest group is the Option B task: 99 entries and 796,582 logical bytes. This is less than one megabyte of local payload, not months of large experiment outputs. Directory names range from July 28 through September 8; their dates are organizational labels, not proof of creation dates or age of the ideas.

There are **99 substantive regular files and six Finder metadata files**. The three older Markdown documents contain project findings and decisions worth preserving. All examined substantive content belongs to Architrino; no other-project or private personal content was identified in the inspected documents. That is a bounded content assessment, not a secret scan or certification of every byte. No credentials were searched or retrieved.

Exact SHA-256 comparison against **all tracked paths in the current Architrino checkout** found 35 external files with a byte-identical live tracked match. Two of those are empty stderr files: matching arbitrary empty files does not establish their provenance. The remaining **64 files have no byte-identical match in the live tracked checkout**. This does not prove their ideas are unique or absent from Git history. It establishes why blanket deletion is not yet justified.

## Instrument and coverage

The inventory instrument first passed a constructed nested-directory case containing exactly two files totaling eight bytes, before examining the real directory. The comparison instrument first passed the published SHA-256 value for the bytes abc and an unequal-byte negative. It then enumerated tracked paths with git ls-files -z, filtered by file size, and compared full-file digests. Instrument sources and machine inventories are in ignored .tmp/external-codex-storage-audit/. Full digests in the appendix make preservation independently checkable without treating that scratch as the only record.

The traversal visited the entire requested root, including hidden entries, without following symlinks, and returned no access errors. No large binary payload was present in that traversal. It did not inspect symlink target trees, system caches, the wider Documents directory, Git history, or the broad Codex application state store. Finder metadata was counted without reading its contents. The three older Markdown files and Option B reviews, selected scripts, manifests, and result receipts were inspected; every implementation line and every historical draft was not semantically audited. No archived experiment was rebuilt.

A first progress message mistakenly called the older documents HTML; they are Markdown. This report and the correction sent to Betty use the actual extension and inspected content.

## Contents by dated folder

The inventory below lists nonempty date groups; other dated directories contain only empty task/output/work directories at inspection.

| Group | Non-directory entries | Logical bytes |
| --- | ---: | ---: |
| .DS_Store | 1 | 10244 |
| 2026-07-31 | 1 | 8987 |
| 2026-08-01 | 2 | 22239 |
| 2026-08-02 | 1 | 8196 |
| 2026-08-05 | 1 | 9187 |
| 2026-09-02 | 1 | 6148 |
| 2026-09-08 | 100 | 802730 |

File types by inventory are 18 Markdown, 33 Python, 22 JSON, four JSON-LD, five logs, nine JavaScript modules, three text fixtures, two stderr, two stdout, one workflow YAML, six Finder metadata files, and two symlinks. The Python files include historical patch/build/verification scripts; their presence does not mean they remain production entrypoints.

## Valuable older material

| Source relative to Documents/Codex | Content assessment | Proposed durable destination and boundary |
| --- | --- | --- |
| 2026-07-31/realtime-voice-chat-4/outputs/luna-corpus-dragnet-review.md | 59 numbered findings and explicit report-only limits, including terminology, closure obligations, coverage gaps and deliberately uninspected endpoints. No exact live tracked match. | reference/priorities/aaa-corpus-dragnet/evidence/luna-corpus-dragnet-review-2026-07-31.md. Preserve original bytes as a historical received review. Reconcile against current owners separately; do not reactivate all 59 findings. |
| 2026-08-01/realtime-voice-chat-3/new-voice-chat-handoff.md | Historical field-speed and Topo theory/proposal/status handoff, application organization decisions and collaboration preferences. No exact live tracked match. | reference/priorities/development-process-review/evidence/historical-voice-handoff-2026-08-01.md, with subject links to field-speed-ceiling and app-topo. Treat embedded instructions as historical text, never startup authority. |
| 2026-08-05/realtime-voice-chat/topo-two-layer-coordinate-decision.md | Source-local versus absolute-space view distinction, approved visual checkpoint, raw-magnitude boundary, cross-application propagation requirements and open questions. No exact live tracked match. | reference/priorities/app-topo/evidence/two-layer-coordinate-decision-2026-08-05.md. Preserve historical decision bytes and its recorded August 6 acceptance; reconcile with current owner without overwriting it. |

Source text inspection and targeted searches establish that parts of these ideas already appear in current owners: app-topo/work-log.md records the approved two-view checkpoint, and field-speed-ceiling/work-log.md records subsequent closure of the positive trailing-front activation branch. Thus copying the old handoff into current instructions would regress status. Preservation must label it historical rather than claim all its open items are still open. Corpus-dragnet lives under aaa-corpus-dragnet; an initial search under corpus-dragnet failed and was corrected.

The preservation batch created the two subject-specific evidence directories under their existing owners and verified all four copies as recorded above.

## Option B disposition

The exact duplicate corrected-candidate package is already retained under this campaign’s evidence/option-b-corrected-candidate owner. Several stage-two maps, controls and receipts also match current tracked owners exactly. Those are concrete duplicate-removal candidates after consumer checks.

Other Option B files are earlier drafts, installation scripts, known-case instruments, review snapshots and CI metadata. The original prototype review describes freshness-query bypass, normalized rather than exact-byte hashes, and a result-record counterexample. Later repository material discusses repairs to those gaps, but that does not establish byte preservation of the original review. Preserve that original review under evidence/option-b-fictional-prototype-review.md before removing its external copy.

For the remaining unmatched Option B material, the conservative and small preservation batch is a manifest-bound copy of the unmatched files to the established ignored .local-data/option-b-trial/ hierarchy, under an external-option-b-preservation subdirectory retaining source-relative paths. Keep useful narrative documents in their tracked analysis/evidence owners; keep obsolete installation scripts inert, do not execute them. A compact source/destination/digest receipt must accompany the preservation. Ignored local storage is not a durable backup: do not delete the last durable copy of irreplaceable evidence until the parent verifies a backup/archive and retrieval recipe. The current audit establishes candidate routing, not that a backup exists.

The unmatched drafts must not replace the current implementation. For example, old node-trial receipts describe 28 focused tests and one chain; current stage-two work describes two chains. Older negative results remain evidence of earlier states, not current defects.

## Consumers and task-directory dependencies

The initial audit's git grep across tracked repository files found no literal Documents/Codex path; the preservation rerun found the cleanup checklist as recorded above. A broader ordinary rg search over reference, scripts, tests, .github and AGENTS.md found mentions in the current campaign checklist and worktree lesson. These are narrative/storage discussion references, not proof that no dynamically constructed or external consumer exists.

The app task reader still reports **Option B** with its external task cwd and **Jughead** with its external teaching cwd. Option B’s latest inspected turn is completed; Jughead is idle. Archival or completion does not rewrite those cwd fields. Deleting their directories can therefore break reopening/resumption even when their deliverable files have been migrated. Betty must resolve task-directory handling or explicitly retain empty directories before deleting the directory trees. The current active-task listing is not an exhaustive inventory of all old task cwd bindings; older empty date directories remain unclassified at that level.

Two symlinks require link-only handling:

- option-b/work/node-trial/node_modules points to /private/tmp/option-b-node-stack/node_modules.
- option-b/work/stage-two/node_modules points to the Architrino node_modules directory.

Never follow those links during cleanup or delete their targets as part of this request. Some historical scripts and receipts reference additional /private/tmp Option B prototypes and dependencies. Those targets are outside this requested directory and were not inspected. Tracked historical receipts also retain such references; preserve their bytes and record relocation separately rather than mechanically rewriting evidence.

## Proposed safe cleanup batches

Legend: ✓ Done, ◐ Partial, ○ Not done. No deletion is performed by this audit.

| Status | Batch | Preservation evidence required before external deletion | Proposed deletion scope and dependency risk |
| --- | --- | --- | --- |
| ✓ Done for preservation; ○ Not done for deletion | Preserve the three older documents and original fictional prototype review | Four historical destinations copied with overwrite protection and verified by SHA-256 and cmp; current-owner context appears above. | Delete only those four exact external files after coordinated release. Keep surrounding task dirs until cwd decisions are settled. |
| ○ Not done | Remove verified duplicate files | Recheck live counterpart and source digests immediately before deletion, plus source-specific log provenance for empty files. | The appendix rows with nonempty tracked matches are candidates; no recursive folder deletion. Two empty stderr files require their corresponding experiment owner, not arbitrary empty matches. |
| ◐ Partial — copied and verified; archive unresolved | Preserve unmatched Option B records and instruments | All unmatched files are copied and byte-verified; the exact manifest and narrative comparison appear above. Backup/retrieval acceptance remains unresolved. | Delete only preserved source paths from the exact manifest after archive coordination. Do not remove outputs merely because names say work, draft, before or temporary. |
| ○ Not done | Remove Finder metadata and symlinks | No project finding identified in Finder metadata; inspect link identities again. | Six .DS_Store files and the two links themselves; never their targets. This is a housekeeping candidate, not a completed deletion. |
| ○ Blocked on task routing | Remove empty external directories | Reconcile old and active task cwd bindings and confirm no writer is using them. | Use exact empty-directory removal only after files are handled. Do not recursively erase Documents/Codex or assume task archival updates cwd. |

This sequence allows preservation and file cleanup without turning storage cleanup into a scientific re-review. Remaining uncertainty is chiefly historical equivalence and task-directory routing, not disk pressure. Anything retained for later semantic comparison receives an explicit owner and deferred status.

## Exact-file appendix

Sources below are relative to Documents/Codex. Destinations are repository-relative live tracked matches. A match establishes bytes, not scientific validity. A dash means no exact match in the bounded live tracked comparison; preserve or reconcile before deletion. For zero-byte stderr use the corresponding Option B evidence owner, not unrelated empty-file matches.

| Source | Bytes | SHA-256 | Live tracked match |
| --- | ---: | --- | --- |
| 2026-07-31/realtime-voice-chat-4/outputs/luna-corpus-dragnet-review.md | 8987 | a935a5c49e38d15194331c1f9fde132d3a46f3d900c407093fe8770552ed2a78 | — |
| 2026-08-01/realtime-voice-chat-3/new-voice-chat-handoff.md | 14043 | fa942464913f644a270f56dd5615fbeb789d887b2538fbbc7bd0af81f45af06e | — |
| 2026-08-05/realtime-voice-chat/topo-two-layer-coordinate-decision.md | 9187 | 61dc2aa4376c7430fe8f08463315e6a2545e0688cc8ea67b367a36c6cdc62961 | — |
| 2026-09-08/option-b/outputs/baseline-review.md | 6558 | f761ca206c68884f886839bae2faae30f0239df598a1609e72d2c0a694a205d0 | reference/priorities/development-process-review/evidence/option-b-fictional-baseline-review.md |
| 2026-09-08/option-b/outputs/prototype-review.md | 5435 | e8daac7546f15c7246b69fc26937c2764d6bcfec1cfa3f48ab684cec522bfed4 | — |
| 2026-09-08/option-b/work/build-candidate-review.py | 18426 | 132d6d732d5e7e0474747cbfaff050eb77db31ba84dd76f3827085de785476a7 | — |
| 2026-09-08/option-b/work/candidate-review-before-readiness.md | 24265 | 1926994bc2d83c669e555c620f0a7c881e1de3815bcb8c5a490912be0cf553a7 | — |
| 2026-09-08/option-b/work/check-readiness.py | 752 | f0c0e85fc41660a05c048a415538289e2ba803e4536f36531f61b0ec4582629c | — |
| 2026-09-08/option-b/work/check-review.py | 995 | 1c11af6349231d0272d5c9db393f398585bdd1e18cc3cec31c86809fc263f262 | — |
| 2026-09-08/option-b/work/content-jobs.json | 3164 | 82d49d3ce22490116a24c83a3abfcabb9c4a5a4ecb27bc920b863d0b99852120 | — |
| 2026-09-08/option-b/work/corrected-candidate/candidate_reader.py | 7125 | bed9baf5c6f0c66345fc480b5c495d4a009fde3c74fd3f60dcb423713551997b | reference/priorities/development-process-review/evidence/option-b-corrected-candidate/candidate_reader.py |
| 2026-09-08/option-b/work/corrected-candidate/result_record_check.py | 1298 | f0f0b540de25e170ffa43d09a1a645a8d9837d3eaf237feaa81262119039362d | reference/priorities/development-process-review/evidence/option-b-corrected-candidate/result_record_check.py |
| 2026-09-08/option-b/work/corrected-candidate/run_candidate.py | 19551 | 5d1aa165662425bdea1cd54f4df8cd73ac19a7a90982b16f7795335b3668801a | reference/priorities/development-process-review/evidence/option-b-corrected-candidate/run_candidate.py |
| 2026-09-08/option-b/work/corrected-candidate-package/artifacts.json | 6560 | fb3014d26c13fd6eca443c9d8ed5db7b6f573d28f842ccbea713e0ad0bb10ccb | reference/priorities/development-process-review/evidence/option-b-corrected-candidate/artifacts.json |
| 2026-09-08/option-b/work/corrected-candidate-package/candidate.jsonld | 57914 | 01bc1c1c68c280c825361f6af93ae42711b4d460870c1c6e80111cd13aa2655d | reference/priorities/development-process-review/evidence/option-b-corrected-candidate/candidate.jsonld |
| 2026-09-08/option-b/work/corrected-candidate-package/candidate_reader.py | 7125 | bed9baf5c6f0c66345fc480b5c495d4a009fde3c74fd3f60dcb423713551997b | reference/priorities/development-process-review/evidence/option-b-corrected-candidate/candidate_reader.py |
| 2026-09-08/option-b/work/corrected-candidate-package/environment.json | 275 | 4d2ce64b4a46e3f8a24e2140300562bcc45764153c206e401890b5d181b96c99 | reference/priorities/development-process-review/evidence/option-b-corrected-candidate/environment.json |
| 2026-09-08/option-b/work/corrected-candidate-package/execution.json | 1867 | 8e820fd17ff52b8141fa34857a53c1f03a1d8b97147d1880f40935982897a057 | reference/priorities/development-process-review/evidence/option-b-corrected-candidate/execution.json |
| 2026-09-08/option-b/work/corrected-candidate-package/expected.json | 1396 | 33659df3026a1ec8b66a55818f19ae2601f807eca21b832cfa88fad6353a0832 | reference/priorities/development-process-review/evidence/option-b-corrected-candidate/expected.json |
| 2026-09-08/option-b/work/corrected-candidate-package/outcomes.json | 25560 | 342d1639b251df2cdbd248d1f70f9cb0159d0ed7563f9b3699731c9052696948 | reference/priorities/development-process-review/evidence/option-b-corrected-candidate/outcomes.json |
| 2026-09-08/option-b/work/corrected-candidate-package/preflight.log | 198 | 0954fa8244e63e8168f2061d105d912acf7f166004f6f1c51e0e1870c3b88656 | reference/priorities/development-process-review/evidence/option-b-corrected-candidate/preflight.log |
| 2026-09-08/option-b/work/corrected-candidate-package/result_record_check.py | 1298 | f0f0b540de25e170ffa43d09a1a645a8d9837d3eaf237feaa81262119039362d | reference/priorities/development-process-review/evidence/option-b-corrected-candidate/result_record_check.py |
| 2026-09-08/option-b/work/corrected-candidate-package/run_candidate.py | 19551 | 5d1aa165662425bdea1cd54f4df8cd73ac19a7a90982b16f7795335b3668801a | reference/priorities/development-process-review/evidence/option-b-corrected-candidate/run_candidate.py |
| 2026-09-08/option-b/work/corrected-candidate-package/scientific-output.json | 7689 | f8df50fc1ea27ea76202aa76905ba03ac4dc5e676f52e5c87e3baeb52eb93aad | reference/priorities/development-process-review/evidence/option-b-corrected-candidate/scientific-output.json<br>reference/priorities/development-process-review/evidence/option-b-node-trial/scientific-check.stdout<br>reference/priorities/development-process-review/evidence/option-b-stage-two/integration-scientific-check.stdout |
| 2026-09-08/option-b/work/corrected-candidate-package/source-manifest.json | 4488 | 5083ba5eed98be1f2760485c13d9e501b2f6d60255052b18ee1a964e0bc88793 | reference/priorities/development-process-review/evidence/option-b-corrected-candidate/source-manifest.json |
| 2026-09-08/option-b/work/dependency-review-before-candidate.md | 20055 | 14da19f7a3bce077b60bb00df7fa645cc7b3e41897e0cbba1ef9749f525c3c91 | — |
| 2026-09-08/option-b/work/fix-output-binding.py | 363 | 9a5dd5ed392ef25b1d99811327a211aaec85bc4404675bc9be04dc4899352276 | — |
| 2026-09-08/option-b/work/install-candidate.py | 1572 | ec1336f84fa73f21190fea5c57e5c28db1b6d06b757ffec1aa5cd69285dc3f7e | — |
| 2026-09-08/option-b/work/install-readiness.py | 1025 | e0e0e99d3157bf6768e6e5a245f99077730d833e0ce6d0f557691ed73643d534 | — |
| 2026-09-08/option-b/work/install-review.py | 1197 | f664911096d9315c6cdc8ff48570efb636c605afaeebbee709875ceed7eb40b3 | — |
| 2026-09-08/option-b/work/install-stack-revision.py | 412 | f8eadff74cc47c9199c858e1a36ee295f542b91f634e235a1584db2a55318993 | — |
| 2026-09-08/option-b/work/merged-pr.json | 21823 | e4780e10e3f7358135c672f18cfd3566a10de0dbb7ee9f4a25af6bbfd85d7c9c | — |
| 2026-09-08/option-b/work/node-trial/capture-evidence.py | 5243 | e1598bc1d2244dabddcaf8a6431c86ddb59fdc685c9b0cb6498eed57e8db0bf0 | — |
| 2026-09-08/option-b/work/node-trial/check-moving-single-root-map.mjs | 7012 | fec8ca0ef7e481f2eab3b2a901106e93534a2f6b3751eadc20ed7cb53cfd263a | — |
| 2026-09-08/option-b/work/node-trial/compact-replay.py | 2065 | e791cceb91b9988e04ed44bd6c4c64f98ccef9876f26d57e080f199f17377923 | — |
| 2026-09-08/option-b/work/node-trial/current-instrument.py | 1358 | dd83897047f96ee4ec45995383512e278491da30c84fc04d4c917044bfb99e63 | — |
| 2026-09-08/option-b/work/node-trial/dependency-map-reader.mjs | 13589 | f7677dd6f4379d71c43c1efd8a39ae4714db56f04c3b52d809632c6691bc9ca1 | — |
| 2026-09-08/option-b/work/node-trial/dispatcher-test.txt | 1047 | 0b71a96c91be50a16f68da40f9fddfd283f24e624690bab45ede7a2df2a41af3 | — |
| 2026-09-08/option-b/work/node-trial/equation-dependency-map.test.mjs | 7139 | 630acd128e3009c11bd1510c6e2c5d2d2b7115ae8fb239a3dda7331d2a635b83 | — |
| 2026-09-08/option-b/work/node-trial/evidence/existing-scientific-test.stderr | 0 | e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 | Empty log; verify experiment-specific provenance |
| 2026-09-08/option-b/work/node-trial/evidence/existing-scientific-test.stdout | 206 | a493abc43d88c397dd38d6a08ad43f81a8ff05c47c25684d52ff74bf95a140ed | reference/priorities/development-process-review/evidence/option-b-node-trial/existing-scientific-test.stdout |
| 2026-09-08/option-b/work/node-trial/evidence/node22-tests.log | 7665 | e03dae790add7ab336d1fe57d5797ba40d8db6836a29a16a0539759be8c16e76 | reference/priorities/development-process-review/evidence/option-b-node-trial/node22-tests.log |
| 2026-09-08/option-b/work/node-trial/evidence/node26-tests.log | 4243 | ff2c3f919d8dd32304bb3ee5b926d1cddbfac1a37c54ce5fbdc3e297a6bf789b | reference/priorities/development-process-review/evidence/option-b-node-trial/node26-tests.log |
| 2026-09-08/option-b/work/node-trial/evidence/post-merge-outcomes.json | 2667 | 0aa8cb51c427969f5c03c727f8a8d7d46a00390900ed9a60a2fae367e079f4ff | reference/priorities/development-process-review/evidence/option-b-node-trial/post-merge-outcomes.json |
| 2026-09-08/option-b/work/node-trial/evidence/post-merge-verification.json | 2532 | ebd79db687d679953f5bd532c03447b8ca1b9c21b02d2282731085aaf5881689 | reference/priorities/development-process-review/evidence/option-b-node-trial/post-merge-verification.json |
| 2026-09-08/option-b/work/node-trial/evidence/pr-conformance.log | 708 | 0eac90f79f83ace863bc9aeffcd55774f163845ef602e52d5973e9eb2862c0ac | reference/priorities/development-process-review/evidence/option-b-node-trial/pr-conformance.log |
| 2026-09-08/option-b/work/node-trial/evidence/report.json | 5635 | bad078d36d7c6b1594c919e7c5f80f1ab12c5cd064a49a47ae01e54eb9c71ff0 | reference/priorities/development-process-review/evidence/option-b-node-trial/report.json |
| 2026-09-08/option-b/work/node-trial/evidence/scientific-check.stderr | 0 | e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 | Empty log; verify experiment-specific provenance |
| 2026-09-08/option-b/work/node-trial/evidence/scientific-check.stdout | 7689 | f8df50fc1ea27ea76202aa76905ba03ac4dc5e676f52e5c87e3baeb52eb93aad | reference/priorities/development-process-review/evidence/option-b-corrected-candidate/scientific-output.json<br>reference/priorities/development-process-review/evidence/option-b-node-trial/scientific-check.stdout<br>reference/priorities/development-process-review/evidence/option-b-stage-two/integration-scientific-check.stdout |
| 2026-09-08/option-b/work/node-trial/evidence/verification.json | 4024 | a40f13bb3e784c46ff4b8206a9e105758fc9ed38e3d39fb66427f7cc8f9541dc | — |
| 2026-09-08/option-b/work/node-trial/final-record.py | 1891 | a83647c273b9c8eb8bdff4b40a617304b7d37ca6cecf0b6298510ecee4003e37 | — |
| 2026-09-08/option-b/work/node-trial/fix-controls.py | 1601 | 9734f43a07b2dc03297f8aca1f631a20d2635b7186d98c5a6c5a407e7015a2da | — |
| 2026-09-08/option-b/work/node-trial/fix-launch.py | 1573 | 6ccf559b09e7324995431ea1760a3799b5a746b1be1bdc91851fcaab6a5022e4 | — |
| 2026-09-08/option-b/work/node-trial/integrate.py | 3187 | 11e8c3608c1eef5a34738ae291654cb05d19542dcd455170421fd77a07c5fd23 | — |
| 2026-09-08/option-b/work/node-trial/moving-single-root-dependencies.jsonld | 58856 | a86d77f94f6da06ffa96caa58a404882f00ccc2284dbc02ce52d013a2faf8848 | — |
| 2026-09-08/option-b/work/node-trial/moving-single-root-dependency-map.md | 10465 | c2ccb2ddedffab0cdf49ab33f4f8ef1fc3a58bbf17824f660bd7035f747b3bdc | — |
| 2026-09-08/option-b/work/node-trial/negative-cli-test.txt | 2546 | 0a8e1269dde56023ac6ab5f1dfdae9f026da05a343e268a398d11ae0546d0b76 | — |
| 2026-09-08/option-b/work/node-trial/option-b-trial.yml | 2481 | f9fbbb0eb5cabd53629c81af722242c711c74835ee3216ef6c1e3dcbccc0e196 | — |
| 2026-09-08/option-b/work/node-trial/postmerge-append.md | 1989 | a7eecd8c90bc92c4bd1a7c0a6b9b650b828c842b524f12f6b3e5bf82e0b99c6f | — |
| 2026-09-08/option-b/work/node-trial/readiness-append.md | 6325 | 898291aaf6cc87b3e152277273b5f279d86d992f8f018c85ea4e16f479afb114 | — |
| 2026-09-08/option-b/work/node-trial/receipt-tests.txt | 1653 | 3011f4fbd616d8a98c3995a3ea999946ea438a3c7138e3bed45ce5ad271aa339 | — |
| 2026-09-08/option-b/work/node-trial/update-guide.py | 7424 | 3b1fdb1017c7ad7bfcb1d29767fac0bd5e46c9bb6867aef4c9bd17f7a2405d48 | — |
| 2026-09-08/option-b/work/node-trial/verify-docs-workflow.py | 2610 | e24d860b66621c7dbfe8d65a8d9e00c1c3322eff89268ef91a3224e8e7597fc5 | — |
| 2026-09-08/option-b/work/option-b-corrected-candidate-review.md | 24265 | 1926994bc2d83c669e555c620f0a7c881e1de3815bcb8c5a490912be0cf553a7 | — |
| 2026-09-08/option-b/work/option-b-dependency-map-review.md | 20055 | 14da19f7a3bce077b60bb00df7fa645cc7b3e41897e0cbba1ef9749f525c3c91 | — |
| 2026-09-08/option-b/work/option-b-integration-readiness-revised.md | 20112 | 4dcb7e677f9a559db1c8414c9c48a30ea2a361c681c24fa5d80882d9a7c32e88 | — |
| 2026-09-08/option-b/work/option-b-integration-readiness.md | 13905 | 5a2b4ddd2d9473a1a20c1c4cab0e1c496e4b08619901c40366644a348301c921 | — |
| 2026-09-08/option-b/work/pages-jobs.json | 5561 | 436182da15049f974dfb6bdbda80f99de5474afebad16456118b960ad8f83503 | — |
| 2026-09-08/option-b/work/pilot-report-before-review.md | 14111 | 5a48abbbe584c201fe622749831e4c77a1b41010c2983e9b7ff75c17e2a60c95 | — |
| 2026-09-08/option-b/work/pr-checks.json | 12900 | 77124b4faaaefbbe6dbbffa0e5c120bf90e6ddbfa2e525068b01fd9840daf51b | — |
| 2026-09-08/option-b/work/pr-runs.json | 31291 | c9a7c14de8e722ee11fea76c5f1e876334e63a1a708a26b452a708b04f9c4356 | — |
| 2026-09-08/option-b/work/readiness-before-stack.md | 13905 | 5a2b4ddd2d9473a1a20c1c4cab0e1c496e4b08619901c40366644a348301c921 | — |
| 2026-09-08/option-b/work/refine-candidate.py | 1603 | 27f83e9746211763ab384d41a8b80bc4e6b7e08bb8d338548588a075ed1d57d0 | — |
| 2026-09-08/option-b/work/retain-candidate.py | 2435 | f2693e3d43630f06d14be50e47a15551e31de4bef9d035fb753950ff1108630a | — |
| 2026-09-08/option-b/work/review-preservation-before.json | 2873 | 4e60e418584a6979fa50d1a5dbccce792d14bbf00c51bc3abfc86438e07953ff | — |
| 2026-09-08/option-b/work/review-preservation.py | 1104 | b7def477295b38c8278e236f8d5fab925522146a84d6140f1ccee4a904574069 | — |
| 2026-09-08/option-b/work/revise-stack.py | 8915 | 3a202fe11bdbe8b1f28ae6cf73edf944589c114453166af9c527c6b3a7a36caa | — |
| 2026-09-08/option-b/work/stage-two/corrected-candidate-run.json | 6192 | d01856eab1e9557a73665f6faa24c80de687cc6d7fd0a700d8aad149f392f45d | reference/priorities/development-process-review/evidence/option-b-stage-two/corrected-candidate-run.json |
| 2026-09-08/option-b/work/stage-two/finite-ledger-controls.mjs | 987 | a2f41ada418a04ba7e20aa1d669bf56f627c0c2c24d9a3046fdf383d3b21d21a | scripts/equation-mapping/verify-finite-ledger-superposition.mjs |
| 2026-09-08/option-b/work/stage-two/finite-ledger-dependencies.draft.jsonld | 13044 | fb0d1c65cb377829284ac096beb1784f828e3ac0105afa9a84e8c9c5c6af66c8 | reference/priorities/master-equation-closure/contracts/finite-ledger-dependencies.jsonld |
| 2026-09-08/option-b/work/stage-two/first-chain-review-controls.json | 4907 | 5dc10b69fc0f7360493ec33c81d2d9ff341cbe61d75fa4d5565747998ccdc790 | reference/priorities/development-process-review/evidence/option-b-stage-two/first-chain-review-controls.json |
| 2026-09-08/option-b/work/stage-two/integration/finalize-tests.py | 2333 | d9142531154ce61851181139ac90749a122c797b7a89c5a7de09de8c6e5099bf | — |
| 2026-09-08/option-b/work/stage-two/integration/finite-ledger-dependency-map.md | 5308 | 26c88c947d8b236d8cff5f62613ff5aea6f4bf3cf3e64885886c8ffc83b7f71b | reference/priorities/master-equation-closure/contracts/finite-ledger-dependency-map.md |
| 2026-09-08/option-b/work/stage-two/integration/integrate.py | 6018 | 7ab4996849da5a7f1f433a19dce01609d51b659780969f89cdbcd829aeef2be7 | — |
| 2026-09-08/option-b/work/stage-two/integration/update-owner-docs.py | 9188 | b0457153fe56ac5361f884d9ed1cca7b50a5948006b010c617cbcdf0e7dadf23 | — |
| 2026-09-08/option-b/work/stage-two/integration/update-tests.py | 4151 | 607576a6abf19762abacf824b42e7c8446713e8a88d7b71c711cd7579ae73303 | — |
| 2026-09-08/option-b/work/stage-two/live-run.log | 271 | a8848802eaf27667d9acd5591718361557c3df4a6354167d159590c87672382a | — |
| 2026-09-08/option-b/work/stage-two/moving-single-root-corrected-candidate.jsonld | 65325 | d040d275054d1e422c81837119aaf6f50ca72ac2c3a207b24993c4246ed822ce | reference/priorities/master-equation-closure/contracts/moving-single-root-dependencies.jsonld |
| 2026-09-08/option-b/work/stage-two/option-b-first-chain-baseline-review.md | 15157 | 40fb65ef0c0bdfba3b701df4715179f48efd0acf4b895bd11c5cc48bb1d398e5 | — |
| 2026-09-08/option-b/work/stage-two/pr264-report.json | 5644 | 71dc20a7a2b6f31e382e59d60f432ffc8f30c890f93a71ba29f3e2f9dee12818 | reference/priorities/development-process-review/evidence/option-b-stage-two/pr264-report.json |
| 2026-09-08/option-b/work/stage-two/prepare-second-chain.mjs | 5844 | c9adfd27067ac5675b7b776261c41d55cf70c901f05c8c74acde3fb521587b71 | — |
| 2026-09-08/option-b/work/stage-two/preview-reader.mjs | 13633 | fe729407197a24b3ade3232e0971658f234a0cf5fb90890bf64cadd093d0e96e | — |
| 2026-09-08/option-b/work/stage-two/review-first-chain.mjs | 5341 | 666064d7921c94db1c881c54a45b3a851bb6a7a63de1739ff05ecd05b0042b03 | — |
| 2026-09-08/option-b/work/stage-two/review-manifest.json | 2312 | a09096267f0c2ffad339c356a910b4876cd5d2f5659a569102c77a4a0e8097cc | reference/priorities/development-process-review/evidence/option-b-stage-two/review-manifest.json |
| 2026-09-08/option-b/work/stage-two/run-corrected-candidate.mjs | 1932 | aaa21e8129c0104a90fa0ba6789b0f48d7b16da8f545432a51204dd35569c9c2 | — |
| 2026-09-08/option-b/work/stage-two/second-chain-controls.json | 2396 | e5b81364e0970f0796326e9758c687f8ea8a99235781e1c3fef33085d14fdc2d | reference/priorities/development-process-review/evidence/option-b-stage-two/second-chain-controls.json |
| 2026-09-08/option-b/work/stage-two/verify-pr-evidence.mjs | 2002 | 794a9957b60baeb8f3426e3fcfc76e19c5550c009782df14cf3faaaebbc13d93 | — |
| 2026-09-08/option-b/work/summarize-candidate.py | 291 | 64e65ce0ded6eb310f93542140cf4eeb9e6e6b94227b03b9261f265ae22483e1 | — |
| 2026-09-08/option-b/work/verify-installed-candidate.py | 1672 | bb189396dd775ae41af8813d4df5cc6bbdb418d81cf1b3de0797578e3362804c | — |

## Completion and falsifiers

✓ Done: complete non-following inventory, known-case instrument controls, live tracked byte comparison, selected content and consumer triage, preservation of all 64 unmatched files, 99 source/destination byte comparisons, narrative-owner routing, and exact manifest delivery to the original coordinator. ○ Not done: external deletion, historical Git-object comparison, exhaustive semantic equivalence, all archived task cwd reconciliation, backup acceptance, replacement-coordinator delivery, and rendered-preview verification. Symlink targets remain outside this audit. Any added/changed file invalidates its inventory row; a changed digest invalidates a duplicate verdict; a discovered consumer changes the corresponding deletion risk. Rerun the inventory and compare exact intended sources immediately before executing a cleanup batch.
