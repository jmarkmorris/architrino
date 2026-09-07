# CRW-002 Dispatch — Term Lookup and Orientation

Closure goal: a reader who lands on an arbitrary corpus document can resolve an unfamiliar $\mathbb{A}\mathbb{A}\mathbb{A}$ term to its definition without knowing in advance that a glossary exists.

This is the implementation prompt for [CRW-002](../work-queue.md#crw-002--term-lookup-and-orientation). Read that item first; this document does not restate its reasoning, only what to build and how the work will be judged.

## Current Execution Boundary

CRW-002 is complete. Deliverables 1 and 2 added the audited glossary rows and persistent Glossary route; deliverable 3 was declined after its ambiguity sample produced a 33.3% false-positive rate; and deliverable 4 closed with two selective inline clues. The [CRW-002 result](../evidence/crw-002-term-lookup-result.md) owns the current evidence, validation, remaining glossary-canon follow-up, and final claim boundary.

The remainder of this file preserves the original implementation specification and its dated pre-implementation findings. It is provenance, not an executable dispatch; do not repeat its completed work or treat its earlier interface description as current state.

Claim grade: `measured` by the current lane owner and CRW-002 result. Falsifier: either owner returning CRW-002 to an open lifecycle state or showing that one of the four deliverables lacks its recorded disposition.

## Before anything else

Follow the repository's own startup route: read `AGENTS.md` in full, then the generated router it names at `reference/op/agent-startup-orientation.generated.md`, then the live owner for the workflow you select. Do not skip this because the task looks like a small UI change — deliverables 1 and 4 touch reader-facing corpus content, which is governed canon.

Two standing constraints that will bite this task specifically:

- **Never run any git command and never read `.git`.** Git belongs to Codex. The working tree is shared and a dirty tree is normal; report unrelated dirty state only if it blocks you or creates overwrite risk.
- **Do not run generators with `--write`** unless the operator authorizes it or you are inside the branch/PR process. Report drift instead. `content/graph/scene_graph.json` and the generated textbook navigation are already stale from an unrelated batch; that is not yours to repair.

## The Pre-Implementation Problem, Measured 2026-09-03

The reader is not stranded. Every document view carries a persistent toolbar — TOC, Back, Forward, Home, Search — plus textbook page arrows, so the full table of contents is one click away from any page.

What the reader cannot do is look up a word. Four findings, each verified in source on 2026-09-03:

- **Scene search indexes metadata only.** `src/runtime/SceneSearchRuntime.js` matches `name`, `id`, `path`, and `nodeType` across the 586 search entries in `content/graph/scene_graph.json`. There is no body text in the index. Typing "causal root" returns nothing.
- **The glossary is hidden.** `content/markdown/aaa/archie/comparative-glossary.md` is absent from the persistent toolbar, from `content/graph/textbook_toc.json`, and from `content/generated/markdown/textbook/toc.md`. It is reachable only through the Archie scene path — root, Archie sphere, Documentation, Glossary — or by searching the literal word "glossary", which presupposes knowing it exists.
- **Nothing decorates terms.** The complete decoration list applied after markdown render in `src/runtime/MarkdownRuntime.js` is images, local asset links, the `View →` equation rows, and the textbook TOC page. No hover definitions, no term links.
- **The glossary fails at the two most-needed words.** It holds 145 term rows. `Architrino`, `Absolute Time`, `Path History`, and `Assembly` are first-class entries. **`wake` is not** — it appears only as `Causal Wake` and `Wake Equation`, so a reader scanning the term column may miss it. **`causal root` has no entry at all**; the phrase occurs only inside other rows' definitions.

Treat all four as `measured` findings you may rely on, and re-verify any one you are about to change. If your own reading contradicts this document, trust the code and say so in your report.

## Deliverable 1 — Fill the glossary gaps

Implementation status: complete in the current source. Verify and preserve the first-class entries rather than adding duplicates.

Add `Wake` and `Causal Root` as first-class entries in the term column of `content/markdown/aaa/archie/comparative-glossary.md`, then audit the rest of the foundational vocabulary the same way: **by scanning the first column as a reader would**, not by searching the whole file. A term whose definition exists only inside another row's prose is not covered.

The vocabulary to audit against is whatever `content/markdown/aaa/foundations/` actually introduces. Those nine documents were converted to edition 1.0 and independently reviewed, so they are the current authority on what each term means. Draw the definitions from them rather than composing new ones, and keep the glossary's own three-column contract: the middle column names the standard-framework comparison, the right column states the $\mathbb{A}\mathbb{A}\mathbb{A}$ meaning and says explicitly whether the mapping is substrate ontology, a derived or effective recovery, a closure target, or a heuristic comparison. An unlabelled resemblance is not an identification.

This is reader-facing corpus content, so it is governed by `content/markdown/aaa/archie/academic-style-guide.md` at edition 1.0 and by the same done criteria as any conversion in this lane. In particular: no claim added, removed, weakened, or strengthened relative to what foundations says; every claim grade and falsifier preserved; and no dense-then-restate construction.

Watch for the defect class the Codex review pass identified across the foundations and dynamics conversions: **explanatory writing tends to firm up hedged claims.** A glossary row is a compressed statement, and compression is exactly where a "candidate" quietly becomes an "is." If foundations hedges a term, the glossary row hedges it too.

Do not silently widen or narrow an existing entry while you are in the file. If an existing row looks wrong, report it; do not fix it as a side effect of this task.

## Deliverable 2 — Make the glossary reachable

Implementation status: complete through the persistent Glossary control. Verify and preserve that route rather than adding a second affordance.

Give a reader on an arbitrary document a route to the glossary that does not require knowing it exists. Two candidate surfaces, and the choice is yours to propose rather than mine to dictate:

- **The persistent toolbar**, built in `src/apps/architrino/ArchitrinoSceneAppRuntime.js` via `createTopDynamicControlBar` in `src/runtime/TopDynamicControlBarRuntime.js`, hosted in `#scene-hud-tools`. It currently carries exactly five actions: TOC, Back, Forward, Home, Search. Adding a sixth is a real cost — that bar is the app's most-used surface and every addition dilutes it.
- **The textbook table of contents**, `content/graph/textbook_toc.json` and its generated markdown. Cheaper and less intrusive, but a reader must already be heading for the TOC.

`content/markdown/aaa/archie/ui-guidelines.md` governs this decision. Read it before proposing, and state which of its rules your proposal satisfies and which it strains. If the guidelines settle the question, follow them and say so; if they do not reach it, say that too rather than inventing a rule.

Whatever you choose must survive the reader arriving from outside — search result, external link, the app itself — with no prior session state.

## Deliverable 3 — Prototype the term decorator before building it

The idea: decorate glossary terms at render time on first occurrence per document, driven by the glossary table itself, so no corpus prose changes and the behaviour stays correct as the corpus grows.

The precedent is real and worth studying first. `src/runtime/MarkdownEquationMapRuntime.js` finds rendered `View →` links and decorates the equation block above each one. It attaches at the same hook point in `src/runtime/MarkdownRuntime.js` where a term decorator would attach.

**Prototype the matching before you build the feature.** The question that decides whether this is worth doing at all is disambiguation, and it is not obviously answerable:

- `assembly` is a glossary term and also an ordinary English word. So is `binary`. So is `wake`, in a different sense.
- Terms appear inside equations, code blocks, headings, table cells, and existing links. A decorator that fires inside a `$...$` span or an existing `<a>` is a defect, not a feature.
- Some terms are substrings of others — `wake` inside `causal wake`, `braid` inside `noether braid`. Longest-match-first is the obvious answer; verify it is the right one.
- Case and inflection: `wakes`, `Wake`, `wake's`. Decide what you match and state it.

Report the false-positive rate on a sample of real documents before proposing to ship. **Declining this deliverable with a recorded prototype result is a success, not a failure** — it converts an open question into a settled one. Shipping a decorator that mislinks ordinary English into a physics glossary would be worse than shipping nothing.

If you do ship it, the decoration must be visually distinguishable from an authored link, so a reader can tell what the author wrote from what the app added.

## Deliverable 4 — Selective inline clues, and only those

The original form of this item added a clue and a link at the first use of every foundational term across 70 documents. That is no longer the work, and an agent should not drift back into it.

What survives is narrow: where a term **carries the argument of a passage**, an inline clue is better pedagogy than a lookup, because it explains the word in the context the reader met it without navigating away. That is a case-by-case judgment on a handful of passages.

The test is not "is this term undefined here." It is "does this passage's argument turn on the reader holding this term right now." If the reader could carry on and look it up later without misunderstanding the paragraph, leave it.

Criterion 8 of this lane's done criteria already requires a clue plus a link at first use for every document CRW-003 rewrites, so most of this is handled by the rewrite campaign rather than here. Do not duplicate it.

## Ordering

Deliverables 1 and 2 are independent of 3 and 4 and should not wait on them. Between them, 1 before 2: a reachable glossary that still lacks `wake` and `causal root` sends readers to a dead end at exactly the words they came for.

Deliverable 3's prototype can run in parallel with either. Deliverable 4 comes last, because a working lookup route changes which passages still warrant an inline clue.

## Evidence discipline

Every claim in your report gets a grade — `derived`, `measured`, `inferred`, or `guessed` — and a stated falsifier. For a measurement, name the instrument and the domain.

Two traps specific to this task:

- **Agreement between two things that share code is not evidence.** If your decorator and your test both read the same glossary parse, their agreeing proves the parse is deterministic, not that it is right.
- **A rendering check is not a correctness check.** That a term decorated cleanly says nothing about whether the definition it points to is accurate.

Do not report a count you have not measured. If you need a number, measure it and say when.

## Report

Return one integrated report containing:

1. What you built or changed, by exact file path.
2. The affordance decision for deliverable 2, with the UI guidelines rule that supports it and any rule it strains.
3. The prototype result for deliverable 3, with the false-positive sample, and a clear ship or decline recommendation.
4. Any glossary rows you found wrong but did not change.
5. Scoped validation run and its outcome, plus any generated-artifact drift reported rather than repaired.
6. Open questions, blockers, and what you would do next.
7. A `Closure goal:` line.

Add a row to `reference/priorities/aaa-corpus-rewrite/evidence/conversion-ledger.md` for any corpus document you modify: file, edition, date, and a note on what changed. **Do not record word counts or growth percentages** — size was removed from this campaign's concerns by operator decision on 2026-09-03, and the ledger explains why.

## Write permission

Ask the operator before each file-modifying action and wait for an explicit yes. An earlier grant does not carry forward to the next write, even within one session.
