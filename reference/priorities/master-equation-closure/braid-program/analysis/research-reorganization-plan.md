# Collinear and braid research: reorganization plan

**Historical ownership record.** The subsequent [binary and photon separation](../../../aaa-work-threads/campaigns/binary-photon-research-separation.md) moves current single-pair research and Campaign 1 into Binary research. The dispositions below record the earlier collinear separation.

Date: 2026-09-26. Status: **implemented on 2026-09-26**, with the operator’s additional instruction to place the remaining historical directory under `dormant-deferred`. See the [execution record](research-reorganization-completion.md) and [executed path map](research-reorganization-executed-map.json). The original proposal below is retained as the planning record. The operator requested the file-by-file plan before further discussion of speed conditions. This plan changes document ownership only. Existing equations, assumptions, results, task identifiers and research decisions remain unchanged.

## Recommended arrangement

| Directory | Current account it will own |
| --- | --- |
| `collinear-research/` | Encounters along one line: initial histories, approach, coincidence, passage, braking, turning and recurrence. The comparison of all examined alternatives becomes part of its manuscript. |
| `braid-program/` | Circular and other noncollinear binaries, braids and assemblies. Combined experiments that include both head-on and transverse cases stay intact here. |
| `master-equation-closure/` | Shared equation definitions, proposals and mathematical results that apply across geometries. |
| `field-speed-ceiling/` | Historical source records after migration. Its entry page directs readers to the current owners; it has no competing current queue or manuscript. Dated evidence, decisions and mixed reviews retain their recorded paths. |

Keeping the last directory as history is deliberate. Moving current research does not require relocating old receipts or rewriting reviews of a document that originally covered several subjects. Its existing manuscripts will be visibly historical, with current reading links at their entry points. There will be one current explanation per subject.

## What the inventory covers

The [complete file list](research-reorganization-file-list.md) gives an individual disposition for every existing file in the three research directories. The [JSON map](research-reorganization-file-map.json) records exact source and proposed destination paths for implementation.

Measured by `rg --files` over the three directories before creating this plan: 68 files in field-speed-ceiling, 368 in braid-program and 145 in master-equation-closure, totaling 581. The map assigns 38 moves, five edits in place, four splits, two extractions, 32 historical retentions and 500 other retentions. These counts concern existing files; new account pages are listed separately below. Hidden and ignored runtime data are excluded. The retained-file list is a conservative ownership decision, not a claim that all scientific contents were rereviewed.

The map builder passed known controls before running on the inventory: a collinear analysis moves to collinear research, a historical receipt remains in place, and the mixed Campaign 1 remains in the Braid Program. The target check verified source existence, one entry per inventoried source, unique move destinations and no existing file at a move destination. This verifies the map's structure, not the correctness of the underlying physics.

## Current documents that need division

Section numbers below refer to the current source headings. Recheck them immediately before editing because other work may advance the documents.

| Source | Proposed treatment |
| --- | --- |
| [Braid manuscript](../manuscript.md), §5.6 | Move the complete comparison, both tables and all numbered notes to `collinear-research/manuscript.md`. Replace the original section with a short explanation of why collinear results matter to braid formation and a link. |
| Braid manuscript, §§5.1–5.2 | Transfer the stationary collinear account and its history-error explanation to the collinear manuscript. Keep a short account of shared numerical lessons in the braid manuscript, referring to the shared solver sources. |
| Braid manuscript, remaining sections | Retain. Integrate circular and multi-binary findings arriving from the ceiling manuscript under their actual equation assumptions. Never combine results from different equations into a single claim. |
| [Ceiling manuscript](../../field-speed-ceiling/manuscript.md), §§1, 2.1 and 2.3 | Integrate shared equation definitions and reception geometry into `master-equation-closure/analysis/field-speed-ceiling-definition-and-shared-results.md`; link this focused account from the closure manuscript. Preserve current definitions without reconsidering them. |
| Ceiling manuscript, §§2.2, 3 and 4 | Integrate the collinear argument in the new collinear manuscript, preserving the distinction between results with and without added event rules. The transverse variation around a collinear approach remains with that experiment. |
| Ceiling manuscript, §5 | Integrate circular-binary results into the braid manuscript; move their focused current analyses according to the file map. General local-existence machinery stays in Master-Equation Closure and is linked here. |
| Ceiling manuscript, §6 | Integrate six-path geometry and its results into the braid account; put general account/conservation requirements with Master-Equation Closure. Preserve conditional status. |
| Ceiling manuscript, §7 | Route each outstanding question to its owning queue; replace the old manuscript's current status with historical status and links. |
| [Ceiling mathematics packet](../../field-speed-ceiling/analysis/mathematics-geometry-dynamical-system.md) | Keep the reviewed packet intact. Its §§4–9 support the shared definition account, §10 supports the collinear account, §§11–12 support the braid account, and §§13–14 inform the appropriate shared and campaign limitations. Extract only material not already adequately covered by a current source. Do not copy the whole packet into several directories. |
| [Quarantined proposals](../../field-speed-ceiling/analysis/quarantined-hypotheses-and-prescribed-reference-cases.md) | Preserve the source. Link Appendix A's general response proposal from the shared definitions and Appendix B's prescribed six-path example from the braid account. Their status remains unadopted/prescribed. |
| [Braid discussion](../brainstorming.md) | Transfer the collinear comparison discussion, collinear continuation discussion and classical point-charge comparison to the new collinear discussion. Keep the reorganization decision here until completed. General Coulomb recovery remains with its existing electromagnetic owner; link rather than duplicate its derivations. |
| [Ceiling discussion](../../field-speed-ceiling/brainstorming.md) | Integrate current collinear, circular and shared questions into their respective discussion pages. Preserve the original dated discussion as history. |
| [Master-Equation Closure manuscript](../../manuscript.md) and [Coincide Or Not](../../analysis/coincide-or-not.md) | Keep the general coincidence/population work here. Replace detailed ownership pointers to relocated mirror analyses. A collinear example remains legitimate in a general argument; duplication of the full campaign account does not. |

The general candidate definition `diagonal-birth-lineage-causal-wake-candidate.md` stays with Master-Equation Closure. Its specific mirror assessment and regulator assessment move to collinear research. The independent adjudication stays at its historical path and is linked by both.

The noncollinear construction `speed-crossing-opposing-interaction-geometry.md` moves from the Braid Program to Master-Equation Closure. It studies cancellation in specified source histories; it is neither the original collinear pair nor an established braid.

## Queue ownership

Preserve existing identifiers. A move does not complete a task, change its priority or reactivate deferred work.

| Existing work | Proposed owner and treatment |
| --- | --- |
| BP-003, collinear breather | Move the current task entry to the collinear queue with its existing blockers and identifier. |
| BP-001 and Campaign 1 | Keep the combined experiment and identifier in the Braid Program. Its grid includes head-on, oblique and transverse approaches. The collinear queue links to its head-on cases and separately owns the existing stationary continuation question; do not create a second copy of BP-001. |
| FSC-005, FSC-006b and collinear continuation work | Collinear current account/queue where unresolved; completed proofs and decisions remain linked as such. |
| FSC-008, drifting mirror comparison | Collinear queue, still deferred; shared observer-mapping dependency stays with its existing owner. |
| FSC-007, FSC-009, FSC-012, FSC-014 and general reception questions | Master-Equation Closure. Keep campaign-specific dependencies visible. Completed prerequisites are references, not new executable tasks. |
| FSC-010, FSC-011, FSC-013, FSC-017 and FSC-002 | Braid Program for circular and multi-binary work, retaining completed/deferred/conditional distinctions. |
| Mixed historical queue text and work logs | Preserve at original paths. Add current-owner routing to the former live queue so it cannot be mistaken for a competing work list. |

## New files to create during migration

| Planned file | Purpose |
| --- | --- |
| `collinear-research/README.md` | Scope and reading order. |
| `collinear-research/manuscript.md` | One integrated encounter account, led by the existing comparison. |
| `collinear-research/priorities.md` | Current results and actual remaining blockers. |
| `collinear-research/work-queue.md` | Transferred unresolved tasks with original identifiers and status. |
| `collinear-research/brainstorming.md` | Relevant provisional discussion moved from existing owners. |
| `collinear-research/work-log.md` | New chronology beginning with the migration; links to earlier logs. |
| `master-equation-closure/analysis/field-speed-ceiling-definition-and-shared-results.md` | Shared account extracted from existing sources, with no new speed-condition decisions. |
| `field-speed-ceiling/README.md` | Historical-directory notice and direct current-owner links. |

## References and reproduction dependencies

The [reference candidate list](research-reorganization-reference-candidates.json) records 514 matching repository files from a bounded `rg -l` search. The search patterns, exclusions and scope are recorded in that file. It is a text-match inventory, not a resolved link graph: matching text can be history, a current link, code or a generated value. Relative basename links require an additional per-move search during implementation. Ignored runtime files and references outside the checkout are not covered.

| Dependency | Required treatment during migration |
| --- | --- |
| Links inside a moved analysis | Recalculate relative paths from its destination. Preserve equation text, result status and section anchors. |
| Links into moved analyses | Search each original full path, relative path and basename across current authored files. Resolve targets and update current consumers. Historical quotations of paths remain historical; provide the source-to-destination map as their lookup. |
| Manuscript section links | Build an old-section-to-new-section map before extracting prose. Keep explicit anchors where needed in current documents. Do not leave a current link silently pointing to a historical claim when its current account has changed. |
| `scripts/field-speed-ceiling/` | Keep these instruments in place for this research-document reorganization. Inspect their specification inputs and comments for moved analysis references. Do not rename algorithms or change formulas. |
| `tests/test_field_speed_ceiling_circular_binary_all_root_certificate.py` and `tests/test_field_speed_ceiling_t0_mpmath_oracle.py` | They name existing script, input and receipt paths. Those paths remain; inspect any specification dependencies before claiming they are unaffected. |
| FSC-004/FSC-010 receipts and oracle inputs | Receipts carry input/specification hashes and inputs contain reproduction commands. Preserve historical receipt bytes. If the active specification path or bytes change, use a current reproduction record with its own provenance; never relabel an old receipt as validation of a changed specification. |
| Braid evidence and solver checks | Historical stationary receipts stay in place. Update links from moved collinear analyses to those receipts. Shared solver validation remains with the EOM solver. |
| Research indexes, priority routing, source-coverage audits | Update authored current indexes and declare the old ceiling directory historical. Mixed historical audits remain evidence of their original source. Update any current source-coverage account for the new manuscripts. |
| Generated indexes or equation mappings | Identify the source and owning generator before changing a generated target. Follow the repository's check/write policy; this plan authorizes no regeneration. |
| Runtime data under `.local-data/` | Do not move or delete it as part of this plan. Existing commands and receipt provenance retain their recorded locations. |

## Execution order and completion checks

Legend: ✓ done; ○ not done.

1. ✓ Inventory and map: complete for the stated 581-file snapshot; the plan and reference candidates are recorded.
2. ✓ Recheck the live tree and compare it with this snapshot immediately before migration. Incorporate new or changed files; preserve concurrent work.
3. ✓ Create the new account pages, transfer the comparison and current task ownership, and integrate the shared definition account. Keep the physics unchanged.
4. ✓ Move the 38 focused files using the JSON map, fixing their current incoming and outgoing references. Preserve historical contents; relocate the remaining ceiling records to dormant-deferred under the operator’s amendment.
5. ✓ Mark the old ceiling account historical, route its entry points to current owners, and finish the split manuscripts. Avoid a second live queue for any transferred task.
6. ✓ Verify source/destination completeness, all current local links and anchors affected by the move, unchanged mathematical content in moved analyses, preserved evidence hashes, and the absence of destination collisions. Run scoped Markdown/KaTeX checks and `git diff --check`; run only affected existing script/tests where references changed, using the required Python environment if needed. Any checker written for this task must first pass a known case.
7. ✓ Request opening the new collinear account and the revised braid account for review (tool acknowledgement only; rendered UI not independently verified). The reader should find one current comparison, one current owner per task and direct access to the supporting evidence.

Completion means the current research is organized and its references work. It does not mean that a speed condition has been chosen or any scientific blocker has been resolved. Speed-condition work remains deferred until after the reorganization, as requested.
