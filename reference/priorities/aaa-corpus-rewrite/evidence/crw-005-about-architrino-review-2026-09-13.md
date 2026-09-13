# CRW-005 — About Architrino review

## Scope and disposition

Full review of [About Architrino](../../../../content/markdown/aaa/archie/about-architrino.md), all 79 lines, as a controlled reference and policy owner. The coordinator independently read the current source. No source edits are proposed or made: the review found no concrete conflict with accepted content requiring a policy change.

Unchanged baseline and reviewed SHA-256: `bab0a2cbe3a73eab5241ef15cf6b9da45689c7b5b86b18e04a06599658666100`.

Only this receipt is a durable worker edit. Shared records belong to the coordinator. Scoped `git --no-optional-locks status` showed no chapter edits before review.

## Findings

No high- or medium-severity defect was established. The chapter distinguishes the human-led project, theory, public publishing surfaces, selective references, source inspection, independent evidence, and human publication accountability. It expressly avoids treating broad acknowledgment, AI wording, model-training provenance, a working link, or the presence of a citation as proof. It does not claim that every source has been read personally by the publisher or that every check has been independently repeated.

The selective-reference policy permits original reasoning without compulsory citation, requires appropriate evidence for consequential external claims, and separates required third-party attribution from discretionary reference selection. That is compatible with the current corpus review's preservation of independent derivations and bounded source verification. No additional disclaimer or legal review is introduced.

## Public-surface and local-owner verification

On 2026-09-13, direct unauthenticated `curl -L --max-time 20 -sS -I` requests measured:

- [Public homepage](https://www.architrino.com): HTTP 200, HTML content type.
- [Foundations reading-copy PDF](https://www.architrino.com/content/generated/pdf/textbook/review-copies/foundations.pdf): HTTP 200, application/pdf content type, nonzero reported content length.
- [Feedback page](https://www.architrino.com/feedback.html): HTTP 200, HTML content type.

The PDF URL was taken from the live authored `content/scenes/archie/textbook_pdf_snapshots.json`, not guessed. The initial web-search-tool fetch of the bare homepage reported a cache miss; direct HTTPS inspection succeeded, so the failed tool fetch is not evidence of a website outage.

A direct unauthenticated GET of the [GitHub repository API](https://api.github.com/repos/jmarkmorris/architrino) returned `private: false`, `visibility: public`, MIT license metadata, `has_pages: true`, and `has_discussions: true`. This supports the public repository and inspection-route statements. It does not establish the license status of every third-party item, which the chapter correctly routes to its separate attribution owner.

Full local reads of [About the Webapp](../../../../content/markdown/aaa/archie/about-the-webapp.md), [GitHub Presence and Community](../../../../content/markdown/aaa/archie/github-presence-and-community.md), [Download Textbook PDF](../../../../content/markdown/aaa/archie/download-textbook-pdf.md), and [Support Architrino Research](../../../../content/markdown/aaa/archie/support-architrino-research.md) support the broad descriptions of interactive explanations, reading-copy exports, contribution routes, support links, and email contact. Scoped scene-path inspection shows the download and support documents have authored scene routes. These local declarations are not an independent demonstration that every feature works.

## Focused checks

By `node .tmp/crw-005-about-review/check.mjs`, after known-case math extraction, fenced-code exclusion, link extraction, and valid/invalid strict-KaTeX cases, the sole inline TeX span renders. There are no displays or equation-viewer links. All seven local link target paths exist among eight total links; all original headings and the complete source hash are unchanged. Path existence does not certify fragment semantics.

No independent mathematical calculation is warranted for this policy/about page. The public-state checks above are their own scoped instruments; agreement with local descriptive prose is not used as a scientific correctness test.

## Verification limits and remaining obligations

This is a no-change chapter disposition, not proof that every public surface is fully functional or every published claim is correct. No interactive application flow, PDF body/rendering, payment transaction, email delivery, company-registry fact, exhaustive third-party license audit, or source-by-source publication audit was performed. Those broader activities are not prerequisites for this bounded policy review absent a concrete conflict.

A missing public route, contradictory controlled owner, or material attribution/accountability error would overturn the relevant no-change finding. None was established by the scoped reads and availability checks. There is no new chapter-specific repair obligation; ongoing application, source, and publication verification remains with its existing owners.

No source, canon policy, neighboring chapter, shared record, generated file, runtime artifact, or Git state was changed. No generator write or publication occurred. Coordinator adjudication and shared integration remain separate.
