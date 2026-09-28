# OPS-032 weekly control review — 2026-09-27

**Complete at the bounded weekly control scope.** Eighteen changed current or historical-entry control paths were inventoried and given dispositions, including the priorities root README; the unchanged rotation covered AAA Core. One unambiguous live directory-inventory reconciliation was referred to the coordinator. No scientific result, whole directory, monthly substantive pass or coverage cycle is certified here. Next weekly review: **2026-10-04**. Monthly substantive review remains due **2026-10-13**; cadence evaluation remains due **2026-12-12**.

## Baseline, selection and actual reach

The [September 20 receipt](ops-032-weekly-review-2026-09-20.md#same-session-continuation--weekly-control-scope-completed) records its final completed scope and overrides its earlier partial checkpoint. This pass uses its observed HEAD `e54cd56b43381b8faa7959a2540b1b1177813ee0` as a conservative Git baseline; current HEAD was `b50bf1fa15a08f8b63f839fd4a01eece9fbe68e7` by `git rev-parse HEAD`. That earlier commit predates some September 20 working-tree reconciliations, so a repeated diff is not automatically a new change or defect. The September 20 final receipt supplies prior reviewed dispositions for those repeated rows.

`git diff --name-only BASE -- 'reference/priorities/**/priorities.md' 'reference/priorities/**/work-queue.md' 'reference/priorities/**/README.md' 'reference/priorities/**/corpus-review-status.md'` identified 17 paths. A second all-priority changed-path inventory, filtered by control basenames, additionally identified `reference/priorities/README.md`, giving 18. The baseline-to-working-tree diff includes committed and tracked dirty content. `git --no-optional-locks status --short -- reference/priorities` and `git ls-files --others --exclude-standard reference/priorities` separately included untracked files; none had a queue, tracker, status or README control basename at the initial snapshot. The new untracked scientific evidence was inspected through its current owner and the decisive disposition passages named below, not treated as absent merely because Git had not committed it.

Changed-control diffs and bounded live source passages were read using standard Git, `sed`, `cat` and `rg`. Large combined reads were sometimes clipped; those outputs are not credited as complete manuscript or historical-body reads. The coverage table states the actual control/status scope. Later bounded reads recovered the relevant transition passages. No custom checker, root solver, numerical test or manuscript-wide scientific review was introduced. Live AGENTS, startup router, periodic review procedure and operations queue govern this pass. It preserves the existing OPS-028 traversal, source history and dormant dispositions.

## Directory inventory and unchanged rotation

`ls -d reference/priorities/*/` returned 29 immediate directories:

`aaa-corpus-dragnet`, `aaa-corpus-rewrite`, `aaa-operations`, `aaa-work-threads`, `app-aaa-core`, `app-borg`, `app-equation-mapping`, `app-lattice-lab`, `app-photon`, `app-simulation`, `app-solver`, `app-topo`, `app-ui-guidelines`, `braid-program`, `category-theory`, `collinear-research`, `development-process-review`, `dormant-deferred`, `mapping-benchmarks`, `mapping-electromagnetism`, `mapping-equations`, `mapping-one-nature-many-theories`, `mapping-open-problems`, `mapping-quantum`, `mapping-standard-model`, `mapping-strong-field`, `mapping`, `master-equation-closure`, `source-mining`.

Compared with the prior inventory, collinear-research is now present and the former top-level field-speed-ceiling directory is under dormant-deferred. `ls -ld reference/priorities/mapping` independently confirms that the plain mapping directory still exists; it must not be removed merely because mapping-* directories also exist.

The September 20 rotation ended at Dragnet and named Corpus Rewrite next. Continue lexically through that original sequence, skipping directories covered as changed: Corpus Rewrite, Operations and Work Threads are changed, so **app-aaa-core** is this pass's unchanged rotation. Baseline-to-working-tree `git diff --name-only` and untracked-file enumeration for that whole directory both returned no paths. Its tracker and complete 66-line queue were read, and the opening scope/disposition and coverage table of `analysis/manuscript-review.md` were inspected. Existing OPS-028 completion is reused: logical contracts/client acceptance stays distinct from production acceptance; CORE-006, CORE-007 and CORE-009 remain deferred/blocked on measured workloads, dataset or accelerator evidence. No executable task was manufactured. Next unchanged candidate is **app-borg**, skipping it if changed at the next pass.

## Changed controls and evidence transitions

All paths in this table are relative to `reference/priorities/`.

| Exact control paths | Reviewed transition and disposition |
| --- | --- |
| `README.md`; `aaa-work-threads/priorities.md` | Complete short diffs route collinear, braid and shared equation work to their current owners and the former ceiling lane to history. Ranking metadata is unchanged in the inspected diff; no new score or adoption is inferred. |
| `aaa-corpus-dragnet/priorities.md` | The only changed sentence is the September 20 correction distinguishing historical queue state from seven current objects. Current digest matches that receipt's post-reconciliation digest; reuse its disposition rather than count a new repair. |
| `aaa-corpus-rewrite/priorities.md`; `aaa-corpus-rewrite/work-queue.md` | Complete control diffs retain CRW-005 closure, September 23 eight-repair completion, separate neutron/direction scientific follow-ups, and September 25 referrals. September 26 methods batch and naming implementation are complete at documentation scope; proposal items 1–3 are implemented while items 4–9 remain proposed. The methods audit's opening, naming verification and implementation/validation sections explicitly distinguish permitted mathematics from experimental law hypotheses and no runtime/scientific promotion. The receiving trackers link the physical wake-duration, softened origin-crossing and action-click research notes. No duplicate repair or reopened campaign is warranted. |
| `aaa-operations/work-queue.md` | Changed OPS-031/032 dates and coverage remain separate; first monthly/quarterly deadlines unchanged. OPS-028's stale top-level inventory is the reconciliation below. Parent owns today's OPS-031 and completion updates; this receipt does not preempt them. |
| `braid-program/README.md`; `braid-program/priorities.md`; `braid-program/work-queue.md` | Ownership and changed-status passages, ranked-list delta, transferred BP-003, transferred FSC rows and BP-010 archive retirement checked. BP-001 stays mixed geometry; BP-003 moves deferred to collinear. September 20 retirement corrections are reused. Local capped-circle source review, conditional escape and first-window bound are separated. The first-window theorem opening explicitly says it lacks independent review; tracker likewise withholds certified escape. The escape review verdict distinguishes corroborated floating-point motion from exact trajectory enclosure. Instrument-retention receipt records copied originals without backup or spectral-count certification. No current control promotes these to a canonical speed law or accepts the entire scientific campaign. |
| `collinear-research/README.md`; `collinear-research/priorities.md`; `collinear-research/work-queue.md` | Complete current controls read. They preserve BP-003 and FSC-008 deferral and the queued historical reproducibility gap without reranking; BP-001 stays with Braid. The untracked finite-contact experiment's setup names a proposed equation, finite stationary history and numerical refinements; tracker states independent trajectory validation, chosen-length justification and long-time behavior open. A positive-length passage is not presented as unchanged-law passage or a zero-length limit. |
| `dormant-deferred/field-speed-ceiling/README.md`; `dormant-deferred/field-speed-ceiling/priorities.md`; `dormant-deferred/field-speed-ceiling/work-queue.md` | Entry notices, routing and transferred-task status compared with the current owners and `braid-program/analysis/research-reorganization-completion.md`. The latter records the approved 75-file move and unchanged scientific authority. Old bodies remain explicitly historical; their earlier future-work statements are not active tasks. No whole historical scientific rereview, rerun of the migration checker or proof of every relocated link is claimed. |
| `mapping-quantum/priorities.md` | Complete two-line addition and opening/claim boundary of `analysis/preparation-wakes-and-bell-causal-reach.md` read. Conditional preparation/timing exploration does not reactivate the deferred physical recovery program or claim Bell recovery; remaining detector/no-signalling/multipartite obligations remain visible. |
| `master-equation-closure/priorities.md`; `master-equation-closure/work-queue.md` | Complete current diffs checked against opening dispositions of the newly untracked beyond-class-boundary and next-event independent adjudications. Through-5, environmental-boundary and 81/16 continuation records lead to the accepted first speed-one event before the next maximum. Current controls say the maximum-or-obstruction search is complete, the first label remains unresolved, weaker continuation is unstarted, and coupling classification remains open. This agrees with the inspected adjudication's stated scope; this weekly scan does not independently re-prove the event, root birth or all-population coverage. Shared FSC-009/012/014 retain transferred statuses, without new adoption. |

The source/evidence roles above are measured by inspection of the named passages. Agreement between controls and an adjudication checks propagation of a disposition, not independent truth of its mathematics. Untracked analyses are current input and may change; their accepted or unreviewed status is taken from the owner, not from their Git status.

The methods receipt reports two prior broken Braid work-log links. Current bounded reads of `braid-program/work-log.md` lines 260 and 337 show their routes now point to the extant collinear protocol and dormant compatibility decision. This is a current file-target check only, not a reclassification of the earlier receipt or a comprehensive fragment check. No repeated defect is raised from that historical validation output.

## Reconciliation proposed to the coordinator

**OPS032-20260927-01 — stale OPS-028 directory inventory.** The queue still listed a top-level field-speed-ceiling row and omitted collinear-research when inspected. The live directory inventory, the migration completion record and the archived README independently establish the organizational move. Insert `collinear-research — todo; current collinear owner transferred September 26; no OPS-028 whole-directory disposition yet` after category-theory. Remove the obsolete top-level field-speed-ceiling row and qualify dormant-deferred as including historical field-speed-ceiling, inventory only and not reactivated. Preserve all unfinished traversal statuses. Keep mapping because the directory exists.

This is a current-control reconciliation, not scientific acceptance or a new review campaign. The parent received the exact proposal and owns the shared queue edit. The finding would be overturned by a live retained top-level owner or an already completed OPS-028 collinear directory disposition; neither is supplied by the inspected transfer owner. This subagent edits only this receipt.

## Remaining cursor and limits

No unfinished path remains within the 18-path **control/status scope** listed above. Scientific derivations, instrument implementation, complete moved historical bodies, noncontrol manuscripts, runtime outputs and whole-directory certification remain outside this weekly pass. The newly untracked Braid first-window defect/tube analyses and receipts, retained-instrument receipt, Collinear finite-contact analysis, and MEC beyond-boundary/next-event analysis family were included as evidence-transition inputs through their owning controls and selected disposition passages; their full substantive contents are not certified.

Use the exact controls and hashes below as the next baseline, including working-tree content, instead of treating today's HEAD alone as all reviewed bytes. Changes arriving after this snapshot are new input. Resume only a material trigger or newly unfinished due work before October 4. Monthly selection remains one advanced workstream, one high-impact dependency and one older workstream on October 13; this control pass satisfies none of those full-asset reviews. Previous scientific repair/no-change checks belong to substantive passes and are not claimed here.

Reviewer: Codex agent ops_032_weekly, continuing the same review lineage; exact model revision/settings were not exposed. No materially different model was adopted or evaluated. Review time and operator burden were not instrumented. The only proposed change is organizational; no substantive finding was adjudicated, no numerical result rerun, no introduced scientific regression established, and no generator/publication action occurred.

## Reviewed control hashes

Native `shasum -a 256` measured these working-tree snapshots. They identify the exact inspected control versions; subsequent coordinator updates do not retroactively change them.

```text
3d3d95cb42801d0cc10070f5b7db25e2fa7345548e72a59e06fbfa13c5904659  reference/priorities/README.md
b045b69f1e728de33290a72f796421fd0fe924d363321bc0dda4f8003e5900e9  reference/priorities/aaa-corpus-dragnet/priorities.md
6bb9b6b1b9f4b0aca3a2c405a1c4f68f40b8d891e4be04d9e6ebac36094ab654  reference/priorities/aaa-corpus-rewrite/priorities.md
501e0ae688bb766dfe7d65a8c25d46bbb32d86d03c915ebee1247e8bd5760647  reference/priorities/aaa-corpus-rewrite/work-queue.md
1735b8a4b009a8946844a44e17746d5f7adb413aef8aef0ce6376981f1bc8024  reference/priorities/aaa-operations/work-queue.md
4ddf618a2c462ecccba004931a6b5a88bf18b7824911be201d50937b21607021  reference/priorities/aaa-work-threads/priorities.md
6691203db9e922d5db8acc841e50b294c364c71fc8bb4773b90ac969825c6ac9  reference/priorities/braid-program/README.md
e45d88aaeab89ffa1a43fb129f29a3771bebcdc09154c911b108274c1e6e9238  reference/priorities/braid-program/priorities.md
be58c59bf5345c5e453621a412f46c2fafb3252cca753de64825ea49efae5f7a  reference/priorities/braid-program/work-queue.md
1ab2df9e9558e93149784bc4f1c04a49e26d68c815dc0bd505b6747d18ac0d5d  reference/priorities/collinear-research/README.md
8383f2d9750c02860e87eed54e0f371df60bc267d2747c14fc1f28c6ed305ab2  reference/priorities/collinear-research/priorities.md
db08d7c9f1f3c71c078fb5a91544ba21720b5ebd5b686c877a4c7c97eb07c2f5  reference/priorities/collinear-research/work-queue.md
647549694cb7cc1dab3d91756450e94f5fb2a98e069ed5c2d989b138f5991423  reference/priorities/dormant-deferred/field-speed-ceiling/README.md
d42a3861d81cf0134acf9de9245d27d282db96386c995327ae21b8bb15800292  reference/priorities/dormant-deferred/field-speed-ceiling/priorities.md
f3b4f8844507acf18a22c1d61ea4df15ced99537c7058672faf248543e3f407a  reference/priorities/dormant-deferred/field-speed-ceiling/work-queue.md
ae73e9fcf9931daf739a33ba12d54a52038616df6f765cf6694f8012f9934cfa  reference/priorities/mapping-quantum/priorities.md
d90445b5e31f3a4c2742a8c4bcc4d5c486dc67d22cafeaba185a6b4d6059926a  reference/priorities/master-equation-closure/priorities.md
d3e6a26bf931b576ee5aade3cbc56e8db6fdc1a9ed8e815c6b2a9e5e97ef0e15  reference/priorities/master-equation-closure/work-queue.md
7921217c7564ad11e0f1ac101ff85a8883bca4e5be5c964711db6d2cb6b06409  reference/priorities/app-aaa-core/priorities.md
cf26db7d77c8786f16eb58c22cc7027b793fc3f5ea11198b9b66151deb7108b5  reference/priorities/app-aaa-core/work-queue.md
```

Validation: the new-receipt `git diff --no-index --check -- /dev/null reference/priorities/aaa-operations/evidence/ops-032-weekly-review-2026-09-27.md` emitted no whitespace diagnostics. This is source-format evidence only.
