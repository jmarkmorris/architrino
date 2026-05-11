# Corpus Advancement Pass

First line to paste into a new thread:

```text
Use the AAA corpus advancement skill in self-running mode.
```

Optionally follow it with a specific lane, shard, source document, or edit-batch instruction.

Use this prompt when one AAA document or one recent batch contains a newer theoretical advancement and the rest of the markdown corpus needs to be checked for related updates, stronger formulations, proof routes, mathematical closure targets, newly visible insights, notation fixes, cross-link opportunities, or occasional terminology corrections.

The highest-value use of this prompt is not mere phrase cleanup. Use the review to convert scattered improvements into a theorem-target map: each recurring claim should be sorted as ontology, derivation/closure target, effective summary, or speculation. Favor innovative, mathematically serious advancement: identify the definitions, lemmas, closure equations, proof sketches, simulations, and conceptual syntheses that would move the theory forward. The report should identify what can be edited now, what requires a proof or simulation path, what intuition should be discussed with Op, and what should become corpus-maintenance infrastructure.

## Thread State Handoff

At every pause, approval request, discussion request, or final response, make the thread state explicit before the report body:

```text
Thread state: DONE | WAITING_FOR_OP | DISCUSSION | BLOCKED
Mode: audit/report | edit-batch | self-running exploration | team-agent
Authority used: report-only | claim-card-only | edited files
Files changed: none | path list
Validation: not run | passed | failed: short reason
Op next action: one concrete next step, or "none required"
Resume prompt: one sentence Op can paste to continue
```

Use the status words strictly:

- `DONE`: the requested pass or edit batch is complete; no operator action is required.
- `WAITING_FOR_OP`: Cody needs a decision before proceeding; ask exactly one clear question next.
- `DISCUSSION`: a theory leap, canon-policy change, or terminology decision should be discussed before editing.
- `BLOCKED`: work could not continue because of a missing file, command failure, permission issue, or conflicting workspace state.

For self-running exploration, distinguish claim-card writes from AAA prose edits. If only a claim card was created, use `Authority used: claim-card-only`; if no AAA content changed, say so directly in `Files changed`.

```text
Cody, perform a corpus advancement pass for the AAA markdown corpus.

Source documents:
[PASTE PATH HERE]

Goal:
Read the source documents as the newest theory signal. Extract the major advancements, including new definitions, stronger claims, refined distinctions, notation changes, derivations, terminology, and implications. Then compare those advancements against the rest of the relevant markdown corpus, especially content/markdown/aaa, to find places where the corpus should be elevated or corrected.

Maximum-advancement lens:
Do not treat this as a simple search-and-replace pass. Classify each recurring claim into one of four buckets:
- Ontology: what the theory says exists or is fundamental.
- Derivation/closure target: what must be proven from dynamics, symmetry, simulation, or constitutive closure.
- Effective summary: observer-level, coarse-grained, or inherited-framework language that remains useful but is not fundamental ontology.
- Speculation: a plausible extension, model choice, or interpretive hypothesis that should not be stated as established.

High-leverage review targets:
- Terminology drift: old names, bridge terms used as ontology, improvised synonyms for canonical project terms, and phrases that hide level distinctions.
- Notation drift: inconsistent symbols for the same object, especially density, delay, metric, mass, and closure quantities.
- Overclaiming: theorem targets or speculative programs stated as established results.
- Underclaiming: genuine source-document advances left too timid, disconnected, or buried.
- Missing implications: nearby documents that should inherit a source advancement but currently do not.
- Leaps of intuition: new synthesis, analogy, proof route, mechanism, or unifying idea that emerges from comparing documents but is not yet established in canon. Surface these for discussion with Op (the operator/developer) before treating them as settled content.
- Cross-link opportunities: reader-useful links among AAA documents only, with relative paths from the current document.
- Infrastructure opportunities: recurring drift patterns that should become an automated corpus-audit script, validation rule, or standing checklist.

Standing advancement programs to watch for when relevant:
- Noether Sea / Noether-Sea usage: use `Noether Sea` as the standalone noun and `Noether-Sea` only as a compound modifier.
- Density and delay notation: use `\rho_{\text{core}}(\mathbf{x},t)` for physical Noether-core density, reserve `n(\mathbf{x},t)` for normalized Noether-core density, and use `\chi_{\text{sea}}(\mathbf{x},t)\equiv c_f/c_{\text{eff}}(\mathbf{x},t)` only for the Noether-Sea delay factor.
- Photon ontology: use the canonical description `coaxial contra-rotating pro/anti planar pair`; avoid weaker variants such as `photon planar-pair`, `photon planar pair`, or `photon-like planar pair` unless quoted as a stale phrase to fix.
- Mass and inertia: mass is the externally exposed response of trapped internal causal history, shielding, and Noether-Sea coupling. Ordinary dissipative drag is a failure channel or transport effect, not the mass mechanism.
- Lorentz behavior: Lorentz symmetry, time dilation, length contraction, and invariant signal speed are theorem/closure targets. The closure ladder should name moving-assembly deformation, clock/ruler retuning, two-way signal synchronization, and bounded preferred-frame leakage.
- Tri-binary minimality: treat as a theorem target unless a local derivation is present.
- Reaction provenance: weak reactions, pair production, bremsstrahlung, synchrotron, and CKM mappings should expose where participating architrinos, Noether cores, energy, charge, and polarity enter and exit.
- Cosmology ontology: the Euclidean void does not expand. `a(t)`, `H(t)`, redshift, temperature, and CMB summaries are effective observer variables for Noether-Sea evolution, transport, and clock-rate comparison.

Required method:
1. Run `git status --short` before any edit-oriented work. Do not revert existing changes.
2. Read the source documents carefully.
3. Read the relevant Archie canon guides and glossaries before judging terminology:
   - content/markdown/aaa/archie/academic-style-guide.md
   - content/markdown/aaa/archie/mathematics-style-guide.md
   - content/markdown/aaa/archie/mathematics-terminology.md
   - content/markdown/aaa/archie/comparative-glossary.md
4. Build a concise list of the source document's theory advancements.
5. Convert that list into a claim map using the four buckets: ontology, derivation/closure target, effective summary, speculation.
6. Search the corpus for related claims, older terminology, weaker formulations, missing implications, inconsistent notation, and documents that would benefit from the advancement.
7. Search for exact stale phrases first, then broaden to conceptual neighbors. Prefer `rg` searches and include the most useful search patterns in the report when they would help continue the pass.
8. Do not edit files yet unless I explicitly ask for edits.
9. Produce a report organized by document.

For each affected document, report:
- Path
- Current issue or opportunity
- Source advancement that affects it
- Recommended update
- Priority: required / high-value / optional
- Risk: low / medium / high
- Whether this is a terminology correction, theory elevation, notation fix, cross-link opportunity, or possible new insight
- Claim bucket affected: ontology / derivation-closure target / effective summary / speculation
- Exact stale phrase or passage if useful
- Suggested replacement direction, preserving TeX and local style

Infrastructure findings:
- List recurring drift patterns that should be added to an automated corpus-audit script.
- List recurring theorem targets that should be added to a closure-target ledger.
- List repeated cross-document concepts that deserve a canonical explainer or bridge document.
- List leaps of intuition separately from edit recommendations. Each leap should say what prompted it, what it might advance, what evidence is missing, and the exact question to discuss with Op before editing it into AAA prose or canon.

Important constraints:
- Preserve TeX exactly.
- Use canonical AAA terminology.
- Do not introduce new project terminology without asking.
- Do not link from content/markdown/aaa into reference/priorities.
- Do not reference entourage material inside content/markdown/aaa.
- Distinguish ontological claims, dynamical or symmetry-based derivations, effective summaries, and speculative extensions.
- Keep foundational insights strong, but name their scope and what still requires separate argument.
- Do not silently integrate a new intuitive leap as doctrine. Mark it as an Op-discussion item unless the source document already establishes it.
- In authored AAA markdown, use relative links only and keep content/markdown/aaa self-contained with respect to priority material.
- If a canonical project term exists, reuse it exactly. Do not invent alternate wording for convenience.

End with:
0. The thread state handoff block.
1. A ranked edit plan.
2. Any genuinely new insights discovered by comparing documents.
3. Leaps of intuition to discuss with Op before canonizing or editing into AAA prose.
4. Infrastructure recommendations that would convert this pass into repeatable corpus maintenance.
5. Any questions that must be answered before editing.
```

## Edit-Batch Variant

Use this version when the advancement has already been accepted and the operator wants direct implementation. Keep batches small enough to verify carefully, usually 8 affected AAA markdown documents at a time.

```text
Cody, continue the AAA markdown corpus advancement integration pass.

Context:
[PASTE ACCEPTED ADVANCEMENT SUMMARY HERE]

Task:
Do the next batch of up to 8 affected AAA markdown documents. Search first, then edit. Preserve TeX carefully and keep edits scoped.

Before editing:
1. Run `git status --short`.
2. Do not revert existing changes.
3. Read the relevant Archie canon if needed:
   - content/markdown/aaa/archie/academic-style-guide.md
   - content/markdown/aaa/archie/mathematics-style-guide.md
   - content/markdown/aaa/archie/mathematics-terminology.md
   - content/markdown/aaa/archie/comparative-glossary.md

Search strategy:
1. Start with exact stale phrases from the previous audit.
2. Broaden to neighboring phrases that express the same stale idea.
3. For each candidate file, inspect surrounding context before editing.
4. Search within the selected batch for nearby density, delay, mass, photon, Lorentz, and bridge-ontology wording so related local drift is handled together.

Advancement priorities:
- Normalize terminology and notation only where the local context supports it.
- Convert theorem-target claims into theorem-target language rather than overclaiming completed derivations.
- Preserve strong source insights, but name their scope.
- Mark speculative mechanisms as provisional, conditional, or mapping targets.
- If a comparison suggests a leap of intuition, do not bury it in an edit. Record it as an Op-discussion item with the trigger passage, proposed synthesis, missing evidence, and decision question.
- Prefer local, reader-useful cross-links within content/markdown/aaa when a link materially helps.
- Keep bridge terms such as `spacetime medium` subordinate to the canonical ontology term `Noether Sea`.

Constraints:
- Use `apply_patch` for edits.
- Preserve TeX delimiters and TeX content exactly unless the task is specifically a notation correction.
- Do not introduce new project terminology without asking.
- Do not link from content/markdown/aaa into reference/priorities.
- Do not reference entourage material inside content/markdown/aaa.
- Do not update Archie canon files unless the operator explicitly requested a canon-policy change.

After editing, run:
- `git diff --check`
- `node scripts/validate-content.mjs --check --strict`
- `node scripts/build-scene-graph.mjs --check --strict`

If scene graph drift appears, run:
- `node scripts/build-scene-graph.mjs --write --strict`
then rerun the checks.

Final response:
Start with the thread state handoff block. Then briefly list the files touched, summarize the main cleanup, mention generated artifacts if refreshed, and report validation status.
```

## Self-Running Exploration Variant

Use this version when there is no single source document and Cody should actively look for the next high-value corpus advancement opportunity. This is an autonomous scouting mode, not a license to silently canonize new theory. It should explore, synthesize, follow promising intuition, and rank opportunities; it may edit only when the operator explicitly asks for an integration pass.

```text
Cody, run a self-directed AAA corpus advancement exploration pass.

Goal:
Find the next highest-leverage theory advancement opportunity without being given a specific source document. Explore the idea space through recent changes, random deep dives, proof-target scans, missing-material scans, and occasional drift scans. Produce a ranked advancement report with serious theory opportunities, mathematical proof or derivation targets, leaps of intuition to discuss with Op, safe edit candidates, and infrastructure opportunities.

Operating principle:
This pass should behave like an active research scout. It should not merely clean phrases. Ideas are welcome: surface promising syntheses, analogies, proof routes, and unifying mechanisms even when they are not ready for canon. Label them by evidential status instead of suppressing them. The center of gravity is mathematical advancement in theory and proofs: look for places where definitions can sharpen, lemmas can be named, derivations can be started, closure targets can become explicit, or a speculative mechanism can be turned into a testable theorem program.

Hygiene posture:
Terminology, notation, cross-linking, and cleanup still matter, but they are secondary in this variant. Let them appear when the randomized pass naturally encounters them, when they block theory clarity, or when they provide a cheap safe edit candidate. Do not let a self-running exploration collapse into a terminology sweep unless Op explicitly asks for that.

Before exploring:
1. Run `git status --short`.
2. Do not revert existing changes.
3. Read the relevant Archie canon if the pass touches terminology, notation, or authored AAA prose:
   - content/markdown/aaa/archie/academic-style-guide.md
   - content/markdown/aaa/archie/mathematics-style-guide.md
   - content/markdown/aaa/archie/mathematics-terminology.md
   - content/markdown/aaa/archie/comparative-glossary.md

Parallel-thread coordination:
Use this protocol when Op starts multiple threads with this same prompt and wants broad coverage without overlap.

1. Check for existing claim cards:
   - `rg --files reference/entourage/cody/reports/corpus-exploration-claims 2>/dev/null`
   - If claim cards exist, read the recent active ones before choosing lanes or path shards.
2. Create a short claim card before deep work. This metadata write is allowed for coordination in this exploration variant; do not edit AAA content unless Op later requests an integration pass.
   - Claim directory: `reference/entourage/cody/reports/corpus-exploration-claims/`
   - Filename pattern: `YYYYMMDD-HHMMSS-short-focus.md`
   - Include: thread label, timestamp, selected lanes, selected path shard, excluded claims read, search patterns planned, and expected output.
   - If the environment cannot write a claim card, print the same claim information at the top of the response and proceed with the least-overlapping visible territory.
3. Prefer unclaimed territory. If another active claim already owns the same lane and path shard, choose a different shard or a different lane before continuing.
4. Treat claim cards older than 48 hours as historical unless they explicitly say work is still active.
5. At the end, report the claim card path and the explored territory. If practical, update the claim card with final status and a one-paragraph summary.

Default path shards:
- Shard 1: `content/markdown/aaa/archie`, terminology, guides, glossary, canon policy.
- Shard 2: `content/markdown/aaa/foundations`, `content/markdown/aaa/spacetime`, `content/markdown/aaa/theory-bridges`.
- Shard 3: `content/markdown/aaa/dynamics`, `content/markdown/aaa/interactions`, `content/markdown/aaa/assemblies`.
- Shard 4: `content/markdown/aaa/reactions`, `content/markdown/aaa/cosmology`, `content/markdown/aaa/validation`.
- Shard 5: `content/markdown/aaa/philosophy-history`, overviews, READMEs, reader-orientation documents.
- Shard 6: reference material, app/scene/user-facing language, and non-AAA surfaces that echo AAA terms.

Default lane distribution:
- If few or no active claims exist, choose one primary lane from A-G and one secondary lane from a different category.
- If several claims exist, choose the least-covered lane and least-covered path shard.
- Avoid doing a broad all-corpus scan unless the active claims show no one else is currently covering the corpus.

Internal exploration palette:
If Op does not specify a lane, shard, or posture, choose one or two of these postures before choosing lanes. Prefer weighted random selection when practical: bias toward innovative and mathematical postures, bias away from active claim cards and recently covered territory, and keep hygiene postures as occasional secondary passes. State the selected posture in the claim card and final report.

- **Idea factory:** maximize new syntheses, proof routes, unifying mechanisms, mathematical conjectures, and leaps of intuition. Do not edit; return Op-discussion questions.
- **Closure lab:** focus on theorem/closure targets such as Lorentz behavior, mass/inertia, photon stability, reaction provenance, emergent metric closure, and cosmology observer variables.
- **Proof-route forge:** choose one important claim and outline the objects, assumptions, lemmas, equations, invariants, simulations, or counterexamples needed to turn it into a defensible derivation.
- **Recent-change propagator:** mine recent git changes for theory advancements and sweep related documents for integration opportunities.
- **Random document advancement:** choose one AAA markdown file and ask what serious improvement it can support now; include sibling/context checks.
- **Particular document deepener:** if Op names one file, advance that file first, then identify its nearest integration targets.
- **Missing-material architect:** look for implied but unwritten pages, sections, derivations, ledgers, worked examples, or bridge documents.
- **Issue troll:** secondary hygiene posture; hunt for stale terminology, weak formulations, overclaims, TODOs, broken self-containment, missing definitions, thin sections, and corpus drift when those issues obstruct advancement or the random choice lands here.
- **Canon/drift sweeper:** secondary hygiene posture; compare local prose against Archie canon and identify patterns suitable for automated validation when drift materially affects theory clarity.
- **Reader-completeness pass:** identify places where a reader needs a local explanation, bridge paragraph, link, example, or distinction to make the document self-contained.
- **Cross-link gardener:** find high-value relative links among AAA documents where accepted ideas already exist but are disconnected.
- **Reaction-provenance tracer:** follow energy, charge, polarity, architrino, and Noether-core provenance through reactions and identify missing ledgers.
- **Validation/infrastructure scout:** propose scripts, checks, claim-card improvements, closure-target ledgers, or repeatable search patterns that make future advancement passes cheaper.

Choose 2-4 exploration lanes per run:

Lane selection bias:
- Include at least one math/theory lane in every ordinary self-running pass, preferably Lane B, Lane C, Lane E, Lane G, or a recent-change pass with explicit proof-route extraction.
- Use Lane D as a secondary hygiene lane unless Op requests cleanup, active claims leave no better unclaimed territory, or drift is directly blocking a theory advance.
- Rank mathematical advancement opportunities above wording-only cleanup in the final report.

Lane A: Recent-change theory harvest
- Inspect recent changes for possible theory advancements using git history and current diffs.
- Useful commands include:
  - `git diff --name-only`
  - `git diff -- content/markdown/aaa`
  - `git log --oneline --name-only -n 10 -- content/markdown/aaa`
  - `git show --stat --oneline HEAD`
- Extract any new definitions, stronger claims, notation changes, theorem targets, or canonical phrases introduced recently.
- Sweep nearby corpus locations for integration opportunities.

Lane B: Random serious-document deep dive
- Choose one AAA markdown document at random and attempt a serious advancement audit.
- Useful command: `rg --files content/markdown/aaa | sort | shuf -n 1`
- If `shuf` is unavailable, choose a document by another reproducible method and state how it was chosen.
- Read the chosen document, then inspect sibling documents, incoming/outgoing links where practical, and relevant canon.
- Ask: What is the strongest defensible improvement this document could support today?
- Output safe edits, theory-elevation opportunities, missing derivation targets, and Op-discussion leaps separately.

Lane C: Missing-material and stub scan
- Search for unwritten, thin, placeholder, or future-work material.
- Useful searches:
  - `rg -n -i "TODO|TBD|placeholder|stub|not yet|needs derivation|future work|to compute|mapping goal|pending derivation|unresolved|open question" content/markdown/aaa`
  - `rg -n -i "should be developed|requires|must derive|must show|not yet fixed|not yet established" content/markdown/aaa`
- Distinguish a simple missing paragraph from a missing canonical bridge, missing theorem proof, missing reaction ledger, or missing derivation program.
- Recommend the smallest useful fill-in that would move the corpus forward.

Lane D: Drift and canonicalization scan
- Secondary hygiene lane. Search for recurring stale phrases and notation drift when those issues obstruct theory clarity or the randomized pass selects this lane.
- Start with known drift classes: Noether Sea usage, density/delay notation, photon ontology, mass/inertia language, Lorentz closure language, tri-binary minimality, reaction provenance, and cosmology ontology.
- Propose new automated audit patterns when a drift class appears in multiple files.

Lane E: Closure-target ledger scan
- Search for repeated claims that need to be converted into theorem targets or linked to a proof path.
- Prioritize Lorentz closure, mass/inertia closure, tri-binary minimality, photon stability, reaction provenance, emergent metric closure, and cosmology observer-variable closure.
- For each target, identify:
  - claim statement,
  - mathematical objects and variables that must be defined,
  - current evidence,
  - missing lemma, derivation, closure equation, simulation, or invariance argument,
  - files that should cross-link once the target is clarified,
  - whether the claim is currently overclaimed, underclaimed, or properly scoped.

Lane F: Reader-completeness scan
- Look for sections where a reader would naturally expect a definition, bridge, comparison, or worked example but the material is absent or too compressed.
- Check READMEs, overview pages, bridge documents, and documents with many outgoing links but little local explanation.
- Recommend fill-ins that preserve self-contained AAA prose without linking to reference/priorities.

Lane G: Intuition-to-proof synthesis
- Choose a promising intuition, analogy, or cross-document pattern and translate it into a disciplined research target.
- Identify:
  - trigger passages or documents,
  - proposed synthesis,
  - why Op may want to consider it,
  - the mathematical form the idea would need before canonization,
  - the first proof step, calculation, model, or simulation that would make it testable,
  - failure modes or counterexamples that would discipline the idea.
- Treat the output as an Op-discussion theory card, not as settled doctrine.

Report format:
0. Thread state handoff block. In this variant, `Authority used` should usually be `claim-card-only`, and `Files changed` should say whether any AAA prose changed.
1. Claim card path, selected exploration posture(s), selected lane(s), selected path shard, and any active claims avoided.
2. Exploration lanes used and why.
3. Source signals found, including recent commits/diffs or randomly selected documents.
4. Ranked opportunities:
   - path,
   - opportunity,
   - why it matters,
   - claim bucket: ontology / derivation-closure target / effective summary / speculation,
   - recommended next action,
   - priority: required / high-value / optional,
   - risk: low / medium / high.
5. Mathematical advancement targets:
   - claim or conjecture,
   - objects and definitions needed,
   - candidate lemmas, equations, invariants, simulations, or proof route,
   - current corpus evidence,
   - first useful next step.
6. Leaps of intuition to discuss with Op:
   - trigger passage or cross-document pattern,
   - proposed synthesis,
   - why it could advance the theory,
   - what evidence or derivation is missing,
   - exact question for Op.
7. Safe edit candidates for a future integration pass.
8. Missing-material candidates:
   - missing page, section, derivation, worked example, reaction ledger, or bridge,
   - documents that imply it,
   - minimal first version that would be useful.
9. Infrastructure recommendations:
   - automated drift checks,
   - closure-target ledger entries,
   - repeatable search patterns,
   - candidate validation rule additions.
10. Suggested next batch:
   - up to 8 files for an edit-batch pass,
   - exact search commands to begin that batch.

Guardrails:
- Do not introduce new project terminology without asking.
- Do not silently convert a leap of intuition into doctrine.
- Do not edit Archie canon unless Op explicitly asks for a canon-policy update.
- Do not link from content/markdown/aaa into reference/priorities.
- Do not reference entourage material inside content/markdown/aaa.
- Preserve TeX exactly in any quoted or proposed edit.
- Keep foundational insights strong, but name their scope and what still requires separate argument.
- If the pass discovers a likely major theory advancement, stop at a discussion-ready proposal unless Op has explicitly requested direct drafting.
```

## Team-Agent Variant

Use this version when the corpus is large enough that the comparison should be split into non-overlapping shards. Shard agents should report findings only; Coordinator Cody should merge, deduplicate, rank, and resolve terminology against canon.

```text
Cody, perform a team-agent corpus advancement pass for the AAA markdown corpus.

Source document:
[PASTE PATH HERE]

Coordinator Cody:
1. Run `git status --short` before any edit-oriented work. Do not revert existing changes.
2. Read the source document carefully.
3. Read the relevant Archie canon guides and glossaries:
   - content/markdown/aaa/archie/academic-style-guide.md
   - content/markdown/aaa/archie/mathematics-style-guide.md
   - content/markdown/aaa/archie/mathematics-terminology.md
   - content/markdown/aaa/archie/comparative-glossary.md
4. Extract the source document's major advancements:
   - new or refined definitions
   - stronger claims
   - corrected distinctions
   - notation changes
   - derivations
   - terminology implications
   - cross-document consequences
5. Convert the advancements into a claim map:
   - ontology
   - derivation/closure target
   - effective summary
   - speculation
6. Assign disjoint corpus shards to agents. Do not let shard agents edit files.

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
- claim bucket affected: ontology / derivation-closure target / effective summary / speculation
- recurring drift pattern, if any, suitable for automated audit

Coordinator Cody must then:
1. Merge duplicate findings.
2. Resolve terminology against the Archie canon.
3. Separate required fixes from optional improvements.
4. Flag any canon-policy conflict before recommending edits.
5. Identify recurring drift patterns for automation.
6. Identify theorem targets that should enter a closure-target ledger.
7. Produce one ranked corpus advancement report.

Important constraints:
- Preserve TeX exactly.
- Use canonical AAA terminology.
- Do not introduce new project terminology without asking.
- Do not link from content/markdown/aaa into reference/priorities.
- Do not reference entourage material inside content/markdown/aaa.
- Distinguish ontological claims, dynamical or symmetry-based derivations, effective summaries, and speculative extensions.
- Keep foundational insights strong, but name their scope and what still requires separate argument.
- Surface leaps of intuition as discussion items for Op before canonizing them or asking shard agents to treat them as established.
- Treat Lorentz behavior, tri-binary minimality, and similar closure claims as theorem targets unless the local derivation is present.
- Treat mass/inertia as externally exposed response of trapped internal causal history, shielding, and Noether-Sea coupling; do not recast it as ordinary dissipative drag.
- Keep Noether Sea as the ontology term and spacetime medium as a bridge term.
- Do not edit files unless I explicitly request an integration pass after the report.

End with:
0. The thread state handoff block.
1. A ranked edit plan.
2. Any genuinely new insights discovered by comparing documents.
3. Leaps of intuition to discuss with Op before canonizing or editing into AAA prose.
4. Infrastructure recommendations for automated drift audit and closure-target tracking.
5. Any questions that must be answered before editing.
```
