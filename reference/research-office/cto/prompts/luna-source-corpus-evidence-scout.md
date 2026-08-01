Closure goal: Find every concrete source-to-corpus evidence task in the main AAA textbook corpus involving citations, provenance, mappings, or historical-versus-current language.

# GPT-5.6 Luna Source and Corpus Evidence Scout

Read and follow [`luna-scout-common.md`](luna-scout-common.md) in full before scanning. Its shared scope, exhaustive action-backlog contract, Markdown-only evidence rules, claim/status safeguards, card format, and artifact protocol are binding.

## Distinct purpose

Own only source and provenance traceability already represented in corpus Markdown: citations, source identity, provenance qualifiers, source-to-corpus mappings, and the separation of historical source language from current corpus language. Do not acquire external sources, select laws, promote prose, adjudicate theory, or repair generic links unless the concrete issue is source traceability.

## Source-and-corpus-evidence scan rubric

Search every eligible corpus Markdown file for:

- citations, bibliographic labels, URLs, source names, equations, quotations, or source summaries that lack a traceable corpus context;
- provenance language that fails to distinguish primary source, repository interpretation, historical artifact, diagnostic output, or current canonical corpus material;
- source statements used in current corpus prose without an explicit source-to-corpus mapping or local applicability boundary;
- historical wording presented as current canonical wording, or current corpus interpretation presented as if it were the source's own statement;
- inconsistent citations or provenance labels for the same source statement across corpus sections; and
- a missing Markdown cross-reference or provenance sentence that prevents another agent from tracing the source statement to its corpus use.

Compare the source description, citation/provenance sentence, current corpus claim, and destination section wherever all are present in Markdown. Record which part is source statement, repository interpretation, historical material, diagnostic evidence, or current canonical text. For `needs-wording`, give the exact provenance or historical/current sentence requiring bounded revision. For `needs-review`, name the exact corpus passages whose source identity or mapping must be compared and state the Markdown check that resolves it. When a citation names a non-Markdown record or external source, preserve the literal endpoint as uninspected and report only the remaining corpus Markdown traceability task.

## In-scope examples

Retain a task to add the exact citation or provenance sentence to a corpus passage; map a cited source statement to the current corpus section that uses it; separate historical wording from current canonical wording; correct a provenance label when corpus passages establish the correction; or add a Markdown cross-reference that makes a source-to-corpus mapping traceable.

## Out-of-scope examples

Do not retain an interesting citation with no concrete corpus defect, an external source-acquisition request, a request to verify a paper outside Markdown, a claim-boundary issue with no provenance component, or a physics interpretation that requires new evidence or non-Markdown inspection.

Stable report filename: `luna-source-corpus-evidence.md`.
