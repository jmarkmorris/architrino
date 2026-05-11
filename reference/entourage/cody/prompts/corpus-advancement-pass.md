# Corpus Advancement Pass

Use this prompt when one AAA document contains a newer theoretical advancement and the rest of the markdown corpus needs to be checked for related updates, stronger formulations, terminology corrections, notation fixes, cross-link opportunities, or newly visible insights.

```text
Cody, perform a corpus advancement pass for the AAA markdown corpus.

Source document:
[PASTE PATH HERE]

Goal:
Read the source document as the newest theory signal. Extract its major advancements, including new definitions, stronger claims, refined distinctions, notation changes, derivations, terminology, and implications. Then compare those advancements against the rest of the relevant markdown corpus, especially content/markdown/aaa, to find places where the corpus should be elevated or corrected.

Required method:
1. Read the source document carefully.
2. Read the relevant Archie canon guides and glossaries before judging terminology:
   - content/markdown/aaa/archie/academic-style-guide.md
   - content/markdown/aaa/archie/mathematics-style-guide.md
   - content/markdown/aaa/archie/mathematics-terminology.md
   - content/markdown/aaa/archie/comparative-glossary.md
3. Build a concise list of the source document's theory advancements.
4. Search the corpus for related claims, older terminology, weaker formulations, missing implications, inconsistent notation, and documents that would benefit from the advancement.
5. Do not edit files yet unless I explicitly ask for edits.
6. Produce a report organized by document.

For each affected document, report:
- Path
- Current issue or opportunity
- Source advancement that affects it
- Recommended update
- Priority: required / high-value / optional
- Risk: low / medium / high
- Whether this is a terminology correction, theory elevation, notation fix, cross-link opportunity, or possible new insight

Important constraints:
- Preserve TeX exactly.
- Use canonical AAA terminology.
- Do not introduce new project terminology without asking.
- Do not link from content/markdown/aaa into reference/priorities.
- Do not reference entourage material inside content/markdown/aaa.
- Distinguish ontological claims, dynamical or symmetry-based derivations, effective summaries, and speculative extensions.
- Keep foundational insights strong, but name their scope and what still requires separate argument.

End with:
1. A ranked edit plan.
2. Any genuinely new insights discovered by comparing documents.
3. Any questions that must be answered before editing.
```

## Team-Agent Variant

Use this version when the corpus is large enough that the comparison should be split into non-overlapping shards. Shard agents should report findings only; Coordinator Cody should merge, deduplicate, rank, and resolve terminology against canon.

```text
Cody, perform a team-agent corpus advancement pass for the AAA markdown corpus.

Source document:
[PASTE PATH HERE]

Coordinator Cody:
1. Read the source document carefully.
2. Read the relevant Archie canon guides and glossaries:
   - content/markdown/aaa/archie/academic-style-guide.md
   - content/markdown/aaa/archie/mathematics-style-guide.md
   - content/markdown/aaa/archie/mathematics-terminology.md
   - content/markdown/aaa/archie/comparative-glossary.md
3. Extract the source document's major advancements:
   - new or refined definitions
   - stronger claims
   - corrected distinctions
   - notation changes
   - derivations
   - terminology implications
   - cross-document consequences
4. Assign disjoint corpus shards to agents. Do not let shard agents edit files.

Shard A:
Inspect content/markdown/aaa/archie.

Shard B:
Inspect content/markdown/aaa excluding content/markdown/aaa/archie.

Shard C:
Inspect reference material, summaries, and priority documents.

Shard D:
Inspect app, scene, and content files that surface AAA language to end users.

Each shard agent must return only:
- affected paths
- specific stale or improvable passages
- source advancement that affects each passage
- recommended update
- priority: required / high-value / optional
- risk: low / medium / high
- evidence from the source document
- whether the finding is a terminology correction, theory elevation, notation fix, cross-link opportunity, or possible new insight

Coordinator Cody must then:
1. Merge duplicate findings.
2. Resolve terminology against the Archie canon.
3. Separate required fixes from optional improvements.
4. Flag any canon-policy conflict before recommending edits.
5. Produce one ranked corpus advancement report.

Important constraints:
- Preserve TeX exactly.
- Use canonical AAA terminology.
- Do not introduce new project terminology without asking.
- Do not link from content/markdown/aaa into reference/priorities.
- Do not reference entourage material inside content/markdown/aaa.
- Distinguish ontological claims, dynamical or symmetry-based derivations, effective summaries, and speculative extensions.
- Keep foundational insights strong, but name their scope and what still requires separate argument.
- Do not edit files unless I explicitly request an integration pass after the report.

End with:
1. A ranked edit plan.
2. Any genuinely new insights discovered by comparing documents.
3. Any questions that must be answered before editing.
```

