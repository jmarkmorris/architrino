# Corpus Explanation Rewrite

## Workstream Metadata

- Kind: `priority`
- Rank: `active editorial owner`
- Status: `active`
- Claim level: `editorial-priority`
- Standard edition: [academic style guide](../../../content/markdown/aaa/archie/academic-style-guide.md) edition 1.0, settled 2026-09-03
- Scope: reader-facing prose under `content/markdown/aaa`

## Objective

Bring all 199 documents under `content/markdown/aaa` into line with edition 1.0 of the academic style guide, so that a reader who knows neither $\mathbb{A}\mathbb{A}\mathbb{A}$ nor established physics can arrive at any page and follow it.

This is an editorial program, not a theory program. It changes how the corpus explains, never what it claims. A rewrite that alters a claim, a claim grade, a falsifier, or an equation has failed, and the physics content of a converted document must survive the conversion exactly.

## Why This Exists

Edition 1.0 settled three rules that most of the corpus does not currently follow.

The audience is a reader who holds neither the theory nor the established physics it must recover, so both are explained rather than named. Where a document uses a concept developed elsewhere, it gives a brief clue in place and links to the full treatment, rather than assuming the reader arrived through the earlier chapter. And length is not a constraint, because the corpus is published for online access with no printed edition, which leaves the prose free to be accessible and technical at once.

Measured on 2026-09-03, **70 documents use foundational vocabulary and link to `foundations/` zero times.** Most of the corpus currently assumes a reader who started at page one. Almost nobody does: readers arrive from a search result, an external link, or the application, on an arbitrary page.

Claim grade: `measured` by scanning every corpus document outside `archie/` and `foundations/` for foundational vocabulary against the presence of any `foundations/` link. Falsifier: a repeat scan returning materially fewer such files, which would mean the gap is being closed by other work.

## Current State

Phase 1 and Phase 2 are complete. All nine `foundations/` documents, beginning with [Ontology](../../../content/markdown/aaa/foundations/ontology.md), were rewritten against edition 1.0 and then independently reviewed against their 2026-09-01 baselines. Every later reader-order batch—`dynamics/`, `noether-braid/`, `spacetime/`, `assemblies/`, `nuclear-atomic/`, `reactions/`, `quantum/`, `cosmology/`, `validation/`, `philosophy-history/`, and `archie/`—has been converted and checked against its immediate pre-conversion source.

At the final 2026-09-04 conversion recheck, all 199 documents were recorded at edition 1.0. The ledger contains exactly 199 unique live corpus paths, with no missing, extra, or duplicate row. A second-agent assurance review is now active over the 190 documents outside the already independently reviewed `foundations/` batch. The operator requested that Claude review `dynamics/` again despite its earlier Codex baseline review. Packet 1 covered all 14 `noether-braid/` documents; Codex adjudicated and incorporated the accepted mathematical, claim-boundary, source, notation, link, and structure corrections. The remaining assurance scope is 176 documents, with the six `dynamics/` documents next. Document length is not tracked and is not a concern for this campaign: the corpus is published online with no printed edition, so a conversion is judged on whether the content survived and whether the prose meets the guide, never on what it cost in words.

The authored sources pass whitespace, strict content, and equation-mapping-link checks. The current corpus contains 4,657 equation-viewer links; all are standalone rendered paragraphs, and no retired plain-language tag remains. The equation-mapping corpus registry, scene graph, generated textbook navigation, and generated reading copies are stale and remain for the authorized regeneration or final branch process. Per-file rows are recorded in [conversion-ledger.md](conversion-ledger.md).

## Ownership Boundaries

| Owner | Relationship |
| --- | --- |
| [Academic style guide](../../../content/markdown/aaa/archie/academic-style-guide.md) | Owns every rule this campaign applies. This lane executes; it does not set style policy. A rule that proves unworkable is reported back, not locally overridden. |
| [Operator explanation standard](../../op/operator-explanation-standard.md) | Owns operator-facing mechanics. Not applied to corpus prose. |
| [Corpus dragnet](../aaa-corpus-dragnet/priorities.md) | May supply read-only inventories and correlation findings. Read-only outside its own lane by charter, so it never performs a conversion. |
| [OPS-015](../aaa-operations/work-queue.md#ops-015--moved-to-the-corpus-rewrite-lane) | Its Tier 1, the retired inline tag in corpus files, executes inside this campaign rather than separately. OPS-015 retains the operator-facing tiers. |
| Theory lanes | Own every claim in the documents being rewritten. A conversion that would change a claim stops and routes to the owning lane. |

## Phasing

Foundations first, and not as a matter of taste. Every one of the 70 under-linked documents will link *into* `foundations/`, so converting a later chapter before its foundations are ready sends readers to prose that is itself about to change. Foundations is upstream of everything.

1. **Phase 1 — Foundations.** Complete: 9 files, independently reviewed.
2. **Term lookup and orientation.** Complete: the glossary covers the audited foundation terms, a persistent Glossary control provides lookup from any scene or document, the ambiguous render-time decorator was declined after a 33.3% false-positive sample, and two load-bearing passages received selective inline clues. The [CRW-002 result](crw-002-term-lookup-result.md) records the evidence and remaining glossary-canon follow-up.
3. **Phase 2 onward.** Complete: all remaining reader-order batches, including the 39 `archie/` reference documents that followed the two earlier reader-support conversions, are recorded at edition 1.0.
4. **Independent assurance review.** Active: `foundations/` remains excluded because it was already independently reviewed. At the operator's request, `dynamics/` is included for a fresh Claude review. Packet 1 covered the 14 `noether-braid/` documents, leaving 176 documents; Packet 2 is the six-document `dynamics/` batch.

## Work Queue

Executable rows live in [work-queue.md](work-queue.md). Per-file conversion records live in [conversion-ledger.md](conversion-ledger.md).

## Promotion Map

Nothing in this lane promotes. The corpus documents are already published; this campaign edits them in place. The lane's own artifacts — queue, ledger, notes — stay here permanently and are never promoted.
