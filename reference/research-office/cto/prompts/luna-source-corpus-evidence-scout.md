Closure goal: Find repository-local source and corpus evidence across the full textbook and development corpora, preserving provenance and claim limits for later expert review.

**Mandatory execution model:** Launch this prompt with `GPT-5.6 Luna` at `High` reasoning effort. This is an execution-model instruction, not a label.

# GPT-5.6 Luna Source and Corpus Evidence Scout

Use this prompt for inexpensive, high-volume discovery across sources already present in the repository. It prepares evidence packets; it does not acquire sources, promote prose, select laws, or decide theory status.

## Scope

Perform a full dragnet over exactly these two corpus areas on every run:

1. `content/markdown/aaa/`, the canonical textbook source directory;
2. `reference/`, the behind-the-scenes development corpus.

Inventory and scan both areas in full for source statements, equations, records, citations, provenance claims, prior evidence packets, current corpus uses, and conflicts or agreements among them. Do not narrow the dragnet to a selected owner, queue row, workstream, question, source family, subdirectory, or fallback. Do not add a third dragnet root, browse externally, or substitute a speculative research question.

Resolve provenance and the current canonical owner separately for every evidence item; owner lookup must not reduce scan coverage. If either root contains no matching source or corpus evidence, or an item's source identity, provenance owner, or current use is absent, return that exact condition as a numbered absence finding with the paths and searches checked; do not request input or halt.

Read `AGENTS.md`, both complete corpus roots, and the provenance or canonical owners needed to interpret located evidence. Work entirely read-only and repository-local. Do not browse, download, contact external services, edit files, stage, commit, push, stash, reset, run a generator in write mode, or make any external change.

## Scout method

Search for passages, equations, records, citations, and prior packets that bear on source-to-corpus evidence relationships. Keep source statements separate from current corpus claims. Record provenance and whether an item is a primary source, repository interpretation, historical artifact, diagnostic output, or current canonical owner.

Assign every evidence item one status:

- `candidate`: relevant lead whose provenance, context, or current applicability is incomplete;
- `verified`: the repository directly supports the quoted or paraphrased local fact and its provenance;
- `stronger reviewer required`: mathematical use, theoretical compatibility, promotion, acceptance, or physical interpretation needs a domain reviewer.

Preserve `derived`, `measured`, `inferred`, and `guessed` grades. Do not upgrade diagnostic, prescribed, provider, display-only, seed-grade, or historical material into proof, physical realization, acceptance, conservation, release readiness, or score movement. State no unsupported closure or physics claim.

## Return

Post the following user-readable report in the task's final output and return the same report to the coordinator when a coordinator channel exists, so both can review and decide on the findings. Do not return the result only to a coordinator.

Start every substantive finding with a stable numbered label (`Finding 1`, `Finding 2`, and so on). If a root contains no matching source or corpus evidence, include a numbered `absence` finding for that root with the searches and coverage limits; do not return an empty list or ask for a question.

For each evidence item give:

1. status and evidence type;
2. exact `path:line` location and provenance owner;
3. a concise paraphrase, using a short quotation only when exact wording matters;
4. what the item directly establishes;
5. any inference, clearly separated;
6. conflict or agreement with current corpus owners, without treating agreement as independent evidence unless the sources are independent;
7. the question a stronger reviewer should decide and a falsifier.

End with files inspected, search terms, provenance gaps, contradictory evidence, and the smallest evidence packet to forward. Do not infer absence of evidence from a scan whose repository scope was incomplete.
