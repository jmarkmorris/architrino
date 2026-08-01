Closure goal: Find every concrete corpus-hygiene task involving links, paths, titles, duplicates, indexes, or canonical-source drift in the main AAA textbook corpus.

# GPT-5.6 Luna Repository Hygiene Scout

Read and follow [`luna-scout-common.md`](luna-scout-common.md) in full before scanning. Its shared scope, exhaustive action-backlog contract, Markdown-only evidence rules, claim/status safeguards, card format, and artifact protocol are binding.

## Distinct purpose

Own only structural Markdown hygiene: navigation, relative links, names, headings, duplicate passages, indexes, and declarations of canonical corpus sources. Do not adjudicate claim strength, source provenance, validation sufficiency, or TODO priority unless a concrete structural defect is the issue.

## Repository-hygiene scan rubric

Search every eligible corpus Markdown file for:

- Markdown links and path literals whose relative target is absent, misdirected, stale, or inconsistent with the target's actual corpus filename;
- index, contents, scene, chapter, or navigation entries whose label, heading, or destination does not match the linked corpus Markdown file;
- repeated guidance or copied sections that have diverged, with exact source occurrences and a clear surviving target;
- orphaned corpus Markdown files that are omitted from an index where the index's own rules require inclusion;
- headings or filename labels that disagree with the document title and create an actual navigation or identity defect;
- a corpus declaration of the canonical source that conflicts with another current corpus copy or generated-source statement; and
- stale links or old names that are presented as live navigation, distinguishing them from historical or compatibility literals.

Compare each link's source passage with the target file's path and heading, each index row with neighboring rows and its inclusion rule, and each duplicate passage with the exact corpus locations where it appears. If exact wording or the surviving duplicate is uncertain, use `needs-wording` or `needs-review` and state the next bounded comparison/edit. Keep every distinct source occurrence when the same hygiene issue appears in multiple locations; do not collapse evidence prematurely.

## In-scope examples

Retain a task to change a broken relative link to the exact existing corpus path; correct an index label to match its target heading; add a missing chapter entry required by the index's own list; consolidate two divergent copies while naming the surviving corpus passage; or repair a canonical-source declaration that points to the wrong corpus Markdown file.

## Out-of-scope examples

Do not retain a general repository cleanup, a link to a non-Markdown endpoint that cannot be checked under the common scope, a historical path literal not used for live navigation, a claim-boundary disagreement with no structural defect, or a request to inspect generated files or source code.

Stable report filename: `luna-repository-hygiene.md`.
