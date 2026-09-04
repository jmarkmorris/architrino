# Corpus Explanation Rewrite

## Workstream Metadata

- Kind: `priority`
- Rank: `active editorial owner`
- Status: `phase-2-in-progress`
- Claim level: `editorial-priority`
- Standard edition: [academic style guide](../../../content/markdown/aaa/archie/academic-style-guide.md) edition 1.0, settled 2026-09-03
- Scope: reader-facing prose under `content/markdown/aaa`

## Objective

Bring all 199 documents under `content/markdown/aaa` into line with edition 1.0 of the academic style guide, so that a reader who knows neither $\mathbb{A}\mathbb{A}\mathbb{A}$ nor established physics can arrive at any page and follow it.

This is an editorial program, not a theory program. It changes how the corpus explains, never what it claims. A rewrite that alters a claim, a claim grade, a falsifier, or an equation has failed, and the physics content of a converted document must survive the conversion exactly.

## Why This Exists

Edition 1.0 settled three rules that most of the corpus does not currently follow.

The audience is a reader who holds neither the theory nor the established physics it must recover, so both are explained rather than named. Where a document uses a concept developed elsewhere, it gives a brief clue in place and links to the full treatment, rather than assuming the reader arrived through the earlier chapter. And length is not a constraint, because the corpus is published for online access with no printed edition, which leaves the prose free to be accessible and technical at once.

Measured on 2026-09-03, **70 documents totalling 428,706 words use foundational vocabulary and link to `foundations/` zero times.** More than half the corpus, by words, currently assumes a reader who started at page one. Almost nobody does: readers arrive from a search result, an external link, or the application, on an arbitrary page.

Claim grade: `measured` by scanning every corpus document outside `archie/` and `foundations/` for foundational vocabulary against the presence of any `foundations/` link. Falsifier: a repeat scan returning materially fewer such files, which would mean the gap is being closed by other work.

## Current State

Phase 1 is complete. All nine `foundations/` documents, beginning with [Ontology](../../../content/markdown/aaa/foundations/ontology.md), were rewritten against edition 1.0 and then independently reviewed against their 2026-09-01 baselines. The first Phase 2 batch is also complete at authored-source level: all six `dynamics/` documents, beginning with the [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md), have undergone the same rewrite and correction sequence.

The fifteen converted documents grew from 115,735 to 122,716 words after review, an increase of **6%**. Foundations account for most of that expansion; the dynamics batch grew only 3%, while its review still required substantive corrections to signs, coefficients, normalization, claim boundaries, and source support. Word growth therefore remains useful for publication-size planning but is not a measure of review difficulty.

The authored dynamics sources pass whitespace, strict content, equation-mapping-link, and equation-mapping-corpus checks. Generated textbook navigation and reading copies are stale and remain for the authorized regeneration or final branch process. Per-file measurements and the current projection are recorded in [conversion-ledger.md](conversion-ledger.md).

## Ownership Boundaries

| Owner | Relationship |
| --- | --- |
| [Academic style guide](../../../content/markdown/aaa/archie/academic-style-guide.md) | Owns every rule this campaign applies. This lane executes; it does not set style policy. A rule that proves unworkable is reported back, not locally overridden. |
| [Operator explanation standard](../../op/operator-explanation-standard.md) | Owns operator-facing mechanics. Not applied to corpus prose. |
| [Corpus dragnet](../aaa-corpus-dragnet/priorities.md) | May supply read-only inventories and correlation findings. Read-only outside its own lane by charter, so it never performs a conversion. |
| [OPS-015](../aaa-operations/work-queue.md#ops-015--plainly-convention-document-migration) | Its Tier 1, the retired inline tag in 23 corpus files, executes inside this campaign rather than separately. OPS-015 retains the operator-facing tiers. |
| Theory lanes | Own every claim in the documents being rewritten. A conversion that would change a claim stops and routes to the owning lane. |

## Phasing

Foundations first, and not as a matter of taste. Every one of the 70 under-linked documents will link *into* `foundations/`, so converting a later chapter before its foundations are ready sends readers to prose that is itself about to change. Foundations is upstream of everything.

1. **Phase 1 — Foundations.** Complete: 9 files, independently reviewed.
2. **Orientation pass.** Queued: the 70 under-linked documents get a clue and a link at first use of each foundational term.
3. **Phase 2 onward.** In progress: the 6-file dynamics batch is complete at authored-source level; remaining chapters continue in reader order so each conversion can rely on vocabulary already introduced upstream.

## Work Queue

Executable rows live in [work-queue.md](work-queue.md). Per-file conversion records live in [conversion-ledger.md](conversion-ledger.md).

## Promotion Map

Nothing in this lane promotes. The corpus documents are already published; this campaign edits them in place. The lane's own artifacts — queue, ledger, notes — stay here permanently and are never promoted.
