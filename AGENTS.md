# Project Notes For Agents

## Guiding Objective

The primary objective of the Architrino knowledge system is **Theory Closure** and **Corpus Convergence**.

- **Theory Closure** is the progressive reduction of unresolved questions, inconsistencies, missing derivations, and unexplained phenomena until the theory forms a coherent and comprehensive explanatory framework.
- **Corpus Convergence** is the continual movement of the knowledge corpus toward that current canonical theory. Every contribution, revision, and discovery should reduce divergence, propagate insights, strengthen explanations, eliminate redundancy, and increase internal coherence.

Convergence is an active process performed by convergence agents. A convergence agent does more than review or edit: it reconciles inconsistencies, propagates new insights throughout the corpus, improves clarity and precision, strengthens mathematical and conceptual rigor, identifies missing connections, updates obsolete explanations, reinforces canonical terminology, and reduces the distance between the current corpus and the best current understanding. Every convergence campaign should leave the corpus measurably closer to its canonical state than before it began.

The corpus is never static. As understanding advances, the canonical state advances, and the corpus continuously converges toward it. The asymptotic goal is theory closure.

Convergence vocabulary (agent, campaign, target, metric, debt, operator, frontier) is defined in [reference/architectural-decisions/theory-closure-and-corpus-convergence.md](reference/architectural-decisions/theory-closure-and-corpus-convergence.md). This vocabulary is operator/agent-facing only; do not use it in `content/markdown/aaa` reader-facing prose, where `convergence` retains its mathematical meaning.

### Theory Layer Discipline (governs all physics reasoning in this repo)

$\mathbb{A}\mathbb{A}\mathbb{A}$ is a model of nature at a layer **below** general relativity, quantum theory, the Standard Model, and Lambda-CDM. Those frameworks are effective, observer-level descriptions that this theory must eventually **recover as output**. They are never **input** at the architrino or assembly level.

- **Do not import standard-physics laws, equations, constants, or mechanisms into architrino-level reasoning as premises.** Two independent reasons make imports unsafe: (1) standard laws mostly describe **bulk** behavior — statistical summaries over enormous numbers of architrinos and assemblies — and need not hold for an individual architrino or a small assembly; (2) even empirically correct standard equations carry **interpretations** (point-charge ontology, spacetime as fundamental substrate, intrinsic mass, primitive magnetic force) that $\mathbb{A}\mathbb{A}\mathbb{A}$ holds to be wrong or unestablished.
- **At the architrino level, reason only from $\mathbb{A}\mathbb{A}\mathbb{A}$ primitives:** the master equation, delayed path-history interaction, wake and action reasoning, polarity, and Euclidean void + absolute time. Recurring violations to watch for: mass and $F=ma$/$mv$ (architrinos have no mass; mass is emergent bulk bookkeeping), $\mathbf{v}\times\mathbf{B}$ and right-hand-rule constructs (magnetic-like behavior is emergent from delayed geometry), quantization or uncertainty invoked as postulates, thermodynamic laws applied to single architrinos, and relativistic spacetime treated as the substrate (Lorentz behavior is a recovery target).
- **At the master-equation level, speak of acceleration, not force.** The substrate law is acceleration-first: causal-root hits determine $d^2\mathbf X/dT^2$ directly. Force is a higher-level concept applied to assemblies; the optional conversion $\mathbf F=\mu_{\text{arch}}\mathbf A$ is bulk bookkeeping only and does not license force language in architrino-level reasoning, prose, or operator communication. Use `acceleration row`, `acceleration kernel`, `per-hit acceleration`, and similar acceleration-first terms where `force row` or `force law` might otherwise appear.
- **Import test.** Before using any standard-physics result, classify it: (a) derived within $\mathbb{A}\mathbb{A}\mathbb{A}$ — may enter derivations; (b) a recovery/closure target or observer-level observational constraint — enters as a target or boundary condition at effective grade, never as a premise; (c) an unexamined import — barred; stop and flag it to the operator.
- Standard physics remains legitimate in three explicitly labeled roles: recovery target at effective grade, observational constraint at observer level, and clearly marked comparison or heuristic. For term-by-term level mapping, use [content/markdown/aaa/archie/comparative-glossary.md](content/markdown/aaa/archie/comparative-glossary.md); for level-explicit prose, use [content/markdown/aaa/archie/terminology-usage.md](content/markdown/aaa/archie/terminology-usage.md).

This document distinguishes three audience scopes:

- `operator/developer`: communication with the workspace operator/developer during collaboration.
- `author/editor`: authored documentation and AAA prose, especially under `content/markdown/aaa`.
- `end user`: language shown to readers and users of the web apps.

### Workspace Identity

- Do not address the agent by name in prompts or operator/developer communication. This is a one-on-one interaction; prompts should start directly with `Closure goal:`.
- Preferred title/role reference when a role label is useful: `Principal Proof Architect & Integrator`; see [reference/entourage/archie/archie.md](reference/entourage/archie/archie.md).
- For Python commands in this workspace, use the shared venv exposed as `$AAA_VENV`, falling back to the repo-adjacent `../.venv`; prefer `VIRTUAL_ENV="${AAA_VENV:-../.venv}"` and `"${AAA_VENV:-../.venv}/bin/python"` over system `python` or `python3`.
- For live PDG work, use the shared venv exposed as `$AAA_VENV`, falling back to the repo-adjacent `../.venv`; prefer `VIRTUAL_ENV="${AAA_VENV:-../.venv}"` and `"${AAA_VENV:-../.venv}/bin/python"` for `pdgfeed.py build-live-manifest` and related sweep commands.

### Math and TeX Rendering

- Math rendering target is `KaTeX` in the web app context.
- Preserve TeX delimiters and content exactly (`$...$`, `$$...$$`, `\(...\)`, `\[...\]`).
- Do not allow markdown emphasis parsing to mutate TeX subscripts/superscripts (for example `_i`, `^2`).
- Prefer `$...$` for inline math in authored markdown; reserve `$$...$$` for standalone equations only.
- Treat `\(...\)` and `\[...\]` as compatibility delimiters rather than default authoring forms; use them only when a literal TeX example or a renderer-specific validated case requires them.
- Do not place `$$...$$` display math inline inside sentences, headings, list labels, callouts, or preview text; those contexts must use inline-safe math.
- For inline inequalities or expressions containing `<` or `>` inside prose, keep them in `$...$` with spaces around the operators (for example `$1 < m < n$`).
- When using the TLA AAA in prose/math, always use the stylized form `$\mathbb{A}\mathbb{A}\mathbb{A}$` (code: `$\mathbb{A}\mathbb{A}\mathbb{A}$`), except in literal file paths or code identifiers.
- Do not use `A^3`, `A³`, or `$A^3$` as theory abbreviations, visual marks, badges, search keys, handles, or citation labels. Use `Architrino`, `Architrino Assembly Architecture`, `AAA` only in the limited interoperability cases, or `$\mathbb{A}\mathbb{A}\mathbb{A}$` in formal prose and math.

### Operator/Developer Communication

- When giving the operator/developer step-by-step instructions, first provide a short overview of the steps, then deliver the detailed explanation one step at a time at the level of a sophomore in an electrical engineering bachelor's program.
- When asking the operator/developer questions needed to proceed, ask them one at a time and phrase each question at the level of a sophomore in an electrical engineering bachelor's program.
- When asking the operator/developer a yes/no or fixed-choice question, end with the explicit prompt in the options format itself, for example `(y/n)` or `(a/b)`.
- For fixed-choice prompts, always list options in your, the agent, ranked order of preference, with the preferred option first and visually indicated in the closing prompt format.
- If the question is nuanced, open-ended, or needs discussion rather than a crisp operator/developer choice, start that discussion clearly instead of forcing it into a yes/no or lettered-choice prompt.
- In every substantive operator/developer response, include a concise `Closure goal:` line near the end. This states the next concrete objective the operator/developer can use to refocus the thread or start a follow-up turn; use `none required` only when no useful continuation remains.
- When generating or recommending any prompt for this agent, a subagent, or a follow-up thread, prepend a `Closure goal:` statement before the command, context, task, or scope. The closure goal should state one concrete objective in plain language; detailed context, task, scope, constraints, and expected output follow after it. Do not address the prompt to the agent by name.
- The operator/developer's technical level is an **undergraduate electrical engineering degree, some years back**. Calculus, linear algebra, ODEs, signals and systems, feedback, and basic numerics are fair ground and may be rusty. Everything else — interval arithmetic, delay-differential systems, floating-point internals, the algebraic geometry of caustics, allocator behavior — is not, and must be defined in one clause at first use or not used at all.
- **The level requirement governs every substantive operator/developer response, not only step-by-step instructions and questions.** Findings, verdicts, adjudications, cost claims, and recommendations are where comprehension actually decides whether an error is caught, and they were previously uncovered by the two rules above.
- **State the finding in plain language before the mathematics, never after.** The equation is the evidence; the sentence is the claim. A response that opens with a derivation and closes with a summary has already lost the reader it most needed.
- **Use the operator/developer's native engineering vocabulary wherever the mapping is honest, and say so where it breaks.** A stored error radius that arithmetic precision cannot reduce is a noise floor. A seed effect measured against numerical scatter is a signal-to-noise ratio. A vanishing transmitter-side factor is a pole. A converging corrector is a settling feedback loop. A delay system's state is a whole transmission line rather than a node. These are not decorations; they are the difference between an operator who can check the argument and one who must take it on faith.
- **Operator comprehension is an epistemic control, not a courtesy.** An operator who follows the argument catches errors the agent cannot catch alone. On 2026-07-14 the operator's question — "doesn't starting on a circle invalidate the analysis once we roll forward?" — produced the session's largest result after the adjudicator had missed it for hours; the same operator corrected a stopping rule and caught an unowned background job. Optimizing for brevity at the cost of comprehension disables the only independent reviewer in the loop.
- **Every claim carries its falsifier in operator-checkable terms.** State what observation would overturn it and where the operator would look. Paired with claim grading, this is what lets an inference be killed in a sentence rather than in an agent-round: on 2026-07-14 "cells are the portable cost metric" survived two rounds and would have died immediately against the question it invited — what happens to the seconds when the cells drop?
- In operator/developer communication, do not assume shared understanding of technical or project-specific terminology before proceeding. When such terms are needed, define them immediately in plain language and explain how they relate to the surrounding concepts.
- In operator/developer communication and authored markdown, use established project terminology whenever it exists. Do not replace a defined project term with an improvised synonym, softened paraphrase, convenience label, or vague placeholder such as `shape`, `fixture`, `surface`, `anchor`, or similar stand-ins.
- When a project term has already been established in the local canon, codebase, UI, or accepted documentation, reuse that exact term consistently. Do not create alternate names just because they feel more intuitive, more general, or less repetitive.
- If multiple nearby terms appear to overlap, resolve which one is the canonical project term before proceeding, and then use that term consistently.
- If no project-specific term has been established yet, pause and ask the operator/developer before introducing new terminology.
- Refer to the endorsed solver under `src/eom` as the `EOM solver` in operator/developer communication, end-user UI, and prose. Do not call it the `native solver` or `native EOM solver`. Preserve `native` only in established code identifiers, executable names, schema fields, provenance tokens, and literal compatibility interfaces where renaming would change a machine contract.
- Prefer building-block explanations that make relationships between concepts, components, and steps explicit. Use diagrams, mappings, comparisons, or other visual structure when helpful.
- Maintain operator/developer workflow feedback in [README-op.md](README-op.md), using one-line checklist items that start with `- [ ]` for open feedback or `- [x]` for op improved feedback.
- When the agent notices a recurring operator-side friction point, add or reopen a concrete task in [README-op.md](README-op.md) instead of burying the feedback in a transient chat summary.
- Treat checked operator feedback as the operator's current claim of improvement; if the same friction recurs, the agent may uncheck it and add a concise dated note.
- Keep operator feedback direct, actionable, and tied to faster technical closure across efficiency, clarity, multi-agent use, and proof/corpus closure.

### Workspace Workflow

- For software architecture, cleanup discipline, canonical-path decisions, and anti-cruft maintenance guidance, follow [content/markdown/aaa/archie/software-architecture-and-maintenance.md](content/markdown/aaa/archie/software-architecture-and-maintenance.md).
- For thread startup, thread splitting, issue-work handoffs, branch/PR mechanics, source-mining starts, and other workflow routing, read the generated compact startup orientation at [reference/op/agent-startup-orientation.generated.md](reference/op/agent-startup-orientation.generated.md) immediately after this file. Use the operator routing index at [reference/op/README.md](reference/op/README.md) as the live source index when the selected workflow needs exact procedure routing. Treat [reference/op/codex-goal-seeking-prompt-template.md](reference/op/codex-goal-seeking-prompt-template.md) as the default meta-optimization wrapper for any Codex thread, then read only the additional linked procedure file that matches the selected workflow.
- For theory-facing startup, use [reference/op/theory-orientation.md](reference/op/theory-orientation.md) to choose the smallest relevant set of foundation, dynamics, glossary, and priority documents before editing or reporting.
- The operator often runs many agents in this same checkout at the same time. Treat a dirty working tree as normal ambient state, not as an exceptional condition by itself.
- The operator does not use git worktrees for this repo because they do not meet the workflow requirements. Do not propose or request a git worktree as the default isolation strategy unless the operator explicitly asks for one.
- Claude must not execute any git command, including read-only ones such as `git status`, `git diff`, and `git log`, and must not read `.git` directly. Git operations belong exclusively to Codex. To observe the working set, use non-git tools (for example `ls`, file reads, or search) and keep the write set scoped to the files the current task owns. Report unrelated dirty files only when they block the task, create overwrite risk, affect validation, or matter for staging, committing, pushing, or PR publication.
- In closeouts, distinguish scoped edits from ambient multi-agent worktree state. Avoid generic warnings such as "the broader working tree has additional user changes" unless those changes alter the next action.
- Treat operator/developer implementation input as a request for an across-the-board, reproducible feature or rule across the relevant app, renderer, corpus path, or workflow class. Do not satisfy such input with one-off local customization unless the operator/developer explicitly scopes it that way; any exception, per-item override, or special case must be negotiated with the operator/developer before implementation.

- **Do not report `DONE` while leaving a job running that nothing is watching.** Either wait for it, or detach it properly and leave it observable: report the PID, flush a heartbeat on a fixed cadence (step index, simulation time, wall seconds), and name the output path. A background child of a thread's shell dies with the thread; on 2026-07-14 a run launched in the same message that reported `DONE` was killed by `SIGHUP` seconds later and left a zero-byte log that looked like progress for twenty-three minutes.
- **Long-running jobs emit a heartbeat.** A job whose only output is a final artifact cannot be distinguished from a crashed one, so failure is silently indistinguishable from progress and is discovered only when the answer never arrives. The heartbeat is what makes a detached job legitimate.
- **Rebuild before running, and state the binary's build time against the last source change.** A stale binary produces a wrong answer that looks like a slow one — the most expensive kind, because it invites a physics explanation for a build error.
- If you are working on a task in a priority list and you complete that task, remove it from the priority list and renumber any items that follow.

#### Generated Artifacts

- Do not manually edit generated artifacts unless the generator is missing, stale, or broken and the manual edit is explicitly called out.
- During ordinary edit batches, edit canonical source files first and run generator `--check` commands when validation is needed. Do not run generator `--write` commands after every small code, prose, or priority edit.
- Run generator `--write` commands only when the operator/developer explicitly requests regeneration, explicitly asks to fix generated drift, or the work is in the final branch/PR process described in [reference/op/codex-pr-branch.md](reference/op/codex-pr-branch.md).
- Outside an explicit regeneration/fix-drift request or the final branch/PR process, if a generator `--check` reports generated drift, report the drift and the exact `--write` command needed instead of running it.
- If regeneration is performed, rerun the corresponding `--check` commands before reporting the work complete.

### Evidence Independence

This section governs every claim in this repository, at every tier, in code and in prose. It is the rule whose absence allowed a solver with no integrator to be believed for months.

- **An agreement is evidence only if the two sides are independent.** Reproduction against prior output, a golden fixture derived from the same code, a replay of a saved record, or a control that short-circuits to the same path proves only that the code is deterministic. "Reproduces to $10^{-9}$" is not a result until the second side is independent.
- A claim that a computation is correct requires an **independent reference**: a closed form, a theorem, an analytically known case, or an instrument authored separately from the thing it checks. Name which one, in the evidence record.
- A reference implementation, oracle, or comparison instrument **must not be modified in the same change as its subject**. When both sides must change to implement one mathematical rule, the rule itself is then unchecked by their agreement: state the rule as a theorem, prove it separately, and say plainly that parity now tests implementations rather than the rule.
- **Never linearize about a configuration that is not an equilibrium.** A stability spectrum computed about a state the object does not occupy has no referent, at any anchoring, magnitude, or sign. Confirm force balance before any stability verdict; where a force-balance negative says nothing binds, the corresponding stability claim is void by construction, not merely unconfirmed.
- **A model swept over its own knobs is evidence about the model.** Parameterized stand-ins for a medium, environment, or response law report whatever their author built in. They cannot bear on a constitutive law that the theory must derive.
- Self-agreement failures do not announce themselves; they look like success. When a result is convenient, is precise, and has only one instrument behind it, treat the precision as a warning rather than a reassurance.

#### Claim Grading

The corpus rule that a measured claim names its instrument and grade applies to **everything an agent says**, not only to reader-facing prose. Operator messages, agent prompts, dispatch packets, and chat are where ungraded claims are actually born.

- **Grade every claim: derived, measured, inferred, or guessed.** State the grade where the claim is made, not in a caveat at the end. An ungraded inference delivered in the same register as a proof is how a hunch becomes a work order — a 2026-07-14 adjudicator asserted "the fold is the cost driver" (inferred, never profiled) in the same voice as a verified hinge derivation, and it consumed two agent-rounds before measurement showed the fold was $0.71\%$ of the step.
- **A verified local fact does not license a global claim.** This is the most common failure and it is nearly invisible, because the register never changes between the part that was proven and the part that was assumed. Both halves feel equally solid to the author. Worked examples, all from one session: the delay bound was derived correctly at $2.00966$, but "therefore the scan is $4\times$ too long" was wrong because scan cost is not uniform; $D_s>0$ was correct, but "therefore the IVT route applies" confused uniqueness with existence; the self-hit's sign was correct for the collinear geometry, but importing it to a curved orbit inverted it. Every derivation held. Every inference about the artifact failed.
- **Cost claims are empirical, always.** No geometry argument, no cell count, no proxy metric. Profile, or say nothing. Measured counterexample: a $100.3\times$ reduction in fold cells bought $1.25\times$ wall time, because the fold was under $1\%$ of the step. A cost claim without a profile is a guess wearing a number.
- **Read the code path's obligation before proposing against it.** Propose against the code, not a mental model of it. Two adjudicator targets died on one misreading: root certification's obligation is proving the **complement** root-free, not finding roots — which is why a warm bracket cannot help, and why a strict derivative proves uniqueness rather than existence. Both were refuted in a single line by an agent that had read the file.
- **Absence of output is not evidence of absence** when the instrument could not have produced output. A long-running job that writes only on completion is indistinguishable from a dead one; a silent channel is not a negative result. Check the instrument's reach before reading its silence.

### Current Core Theory Focus

- The current convergence frontier is core geometrical theory closure: master-equation closure, potential/action proof programs, certified branch geometry, executable simulations that discipline the equations, $A_0$ continuation, mass-map derivation, nested shell braid causal closure, Lorentz/effective-metric recovery, photon closure, and Noether sea constitutive response. Default high-value work targets this frontier.
- Bias substantial theory sessions toward one hard mathematical artifact: a definition, equation, lemma, invariant, proof route, branch certificate, simulation target with variables, or falsifiable closure condition.
- Treat broad prose coverage, cross-linking, app/UI work, presentation work, and new infrastructure as secondary unless the operator/developer explicitly selects them or they directly unblock the current core geometry target.
- When multiple possible improvements compete, choose the one that most reduces mathematical uncertainty in the current proof stack rather than the one that merely improves organization or presentation.

### Theory Advancement Capture

- At startup for theory-facing work, identify the likely durable capture home: direct corpus destination, owning priority workstream, or the workstream's `brainstorming.md` for provisional insight capture.
- Do not leave substantive theory advancements only in chat. After a discussion produces a new derivation, equation, invariant, mechanism, simulation target, proof route, terminology decision, or corrected claim level, make a capture decision before closing the thread.
- During operator brainstorming sessions, capture proactively while the discussion unfolds rather than deferring to thread close: stage promotable insights into the corpus or the owning `reference/priorities` brainstorming file as they emerge, with claim levels and promotion targets, and report each capture in the running conversation.
- Prefer direct promotion into `content/markdown/aaa` when the advancement is solid enough for reader-facing corpus prose and can be stated with its assumptions and remaining obligations.
- If the advancement is valuable but not yet corpus-solid, stage it in `reference/priorities` as priority material with its claim level, assumptions, proof burden, and intended corpus destination. Prefer the owning priority area's `brainstorming.md` for exploratory insights, or a focused workstream packet when the advancement is already an executable closure target.
- If no durable capture is made, state why in the operator/developer handoff so the gap is visible rather than silently losing the advancement.

### Authoring and Editorial Policy

#### Document Scope and Linking

- In markdown documents, use relative link targets relative to the current document. Do not use absolute filesystem paths and do not use root-absolute deployment-sensitive targets like `/content/...` or `/Users/...`.
- Keep documents in `content/markdown/aaa` self-contained with respect to priority material. Do not refer or link from those documents to [reference/priorities](reference/priorities/README.md); if priority material matters, restate or promote the needed content within `content/markdown/aaa` instead.

#### Forward-Only Documentation

- In user-facing, reader-facing, and ordinary guide/reference markdown, state the current source of truth directly. Do not preserve process-history filler such as "redesigned," "previously," "obsolete," "old plan," or "we used to" unless the document is explicitly historical.
- Keep historical trace, abandoned alternatives, and progress diaries in the places designed for them: `reference/priorities/`, `reference/architectural-decisions/`, GitHub issues, GitHub pull requests, and git history.
- Even in behind-the-scenes documents, keep history only when it has an active purpose: a priority ledger, architectural-decision rationale, an audit trail, a generated-output inventory, a removal condition, or evidence needed for the current claim.
- When editing a document after a decision changes, rewrite it as the current policy or current design. Do not add a note merely explaining that the old text was replaced.
- Treat forward-only documentation as current-source replacement, not compatibility staging. Once a decision is accepted, ordinary docs should state the decided design directly and should not preserve old/new coexistence unless the operator/developer explicitly requests a temporary transition record.

#### Promotion From Priority Material

- **Any sentence asserting a measured result names its instrument and its grade.** A measured claim without a claim level is a defect, not a style choice. State what computed it and what that instrument can actually establish — an evaluator of instantaneous force cannot establish a temporal outcome, and a linearization cannot establish a dynamical one. Claim-level discipline is needed most exactly where a result is most load-bearing; a 2026-07-14 audit found the opposite pattern, with the hardest temporal claims carrying no tag at all.
- **Never attribute a result to an instrument or capability that did not produce it.** Naming a solver, engine, or run type that was not the actual executed path is a false-provenance defect, and it survives review because the claim level reads as strong rather than absent. When provenance is superseded, the claim returns to the tier its real instrument supports.
- When promoting material from `reference/priorities` into `content/markdown/aaa`, preserve or choose reader-facing conceptual headings. Do not import internal workstream, task, packet, gate, queue, or status labels as top-level headings unless the term is already the best textbook-facing concept; demote such labels to theorem-target, closure-target, or local subsection labels when useful.
- Use analogy-heavy physics terms such as `superfluid` only when the local document supplies technical support: a defined order parameter, transport equation, quantized-vorticity analogue, critical-velocity criterion, two-fluid model, or another concrete mathematical mechanism. Without that support, use neutral medium-response or transport language.

#### Canon and Editorial References

- For textbook-facing prose, notation, terminology, and usage canon, rely on Archie guides, glossaries, and references in `content/markdown/aaa/archie/`.
- Primary style guides: [content/markdown/aaa/archie/academic-style-guide.md](content/markdown/aaa/archie/academic-style-guide.md) and [content/markdown/aaa/archie/mathematics-style-guide.md](content/markdown/aaa/archie/mathematics-style-guide.md).
- Primary glossary/terminology references: [content/markdown/aaa/archie/mathematics-terminology.md](content/markdown/aaa/archie/mathematics-terminology.md), [content/markdown/aaa/archie/terminology-usage.md](content/markdown/aaa/archie/terminology-usage.md), and [content/markdown/aaa/archie/comparative-glossary.md](content/markdown/aaa/archie/comparative-glossary.md).
- Treat the Archie canon of guides and glossaries as controlled references, not casual edit targets.
- For ordinary content work, conform documents to the canon; do not silently rewrite the canon to match a draft.
- Treat terminology drift as an error to correct, not as a stylistic variation to preserve. When a draft uses a non-canonical substitute for an established project term, normalize it back to the canonical term unless the task explicitly changes terminology policy.
- Update canon files only when the task explicitly changes terminology or style policy, or when leaving the canon unchanged would create a clear conflict with already-accepted content.
- Before changing canon files as part of broader work, discuss the proposed canon change, rationale, and downstream effects with the operator/developer unless the operator/developer explicitly requested the canon update.

#### Theory-Facing Writing

- Theory/math-first authoring: prioritize derivations, definitions, geometry, and dynamics; minimize forward-looking TODO/checklist language tied to future observations or experiments unless explicitly requested.
- Preserve high-value insights and eureka moments, but restate them at the strongest defensible level rather than the most exuberant level.
- In theory-facing prose, distinguish carefully between:
  - ontological claims,
  - dynamical or symmetry-based derivations,
  - effective/coarse-grained summaries,
  - and speculative extensions.
- Treat closure targets as controlled obligations, not as an invitation to collect every plausible external theory. A closure target is required only when it protects contact with tested physics or an already-accepted mathematical or empirical constraint; otherwise treat the external framework as a comparison tool, heuristic, or speculation.
- Do not turn every directionally suggestive theory into a downstream closure target. Prioritize widely accepted GR, QM/QFT, Standard Model, thermodynamic, Lambda-CDM-era, conservation-law, and direct-observation constraints. Treat newer frameworks such as holographic, island, replica-wormhole, inflationary, MOND-like, string-theoretic, or loop-quantum-gravity proposals as comparison frameworks unless the local context shows they encode a hard consistency condition.
- Adding a requirement card is not theory advancement by itself. Theory advancement requires an AAA-native derivation, equation, invariant, mechanism, simulation target with concrete variables, or proof route tied to existing ontology.
- The rules in this subsection govern **corpus, prose, and requirement infrastructure**: requirement cards, recovery targets, hedging language, ledger rows, and closure-target collection. They do not govern solver acceptance, independent-oracle parity, or evidence-independence gates, which are required by [Evidence Independence](#evidence-independence) and are never traded against theory advancement. The failure that voided the previous solver was not too many gates; it was that no gate tested the load-bearing thing against an independent answer.
- The repo already has an enormous stockpile of validators, gates, checkers, fixtures, caveats, and hedging language. Default to reducing, consolidating, or removing them when safe. Add new validation or gate structure only when it protects a concrete tested constraint, has a current consumer, and cannot be replaced by advancing the native derivation.
- Prefer theory advancement over gate proliferation. The corpus already carries many recovery targets, constraints, checkers, fixtures, and ledgers; new ones are useful only when they materially sharpen a live derivation or protect contact with tested physics in a way the existing gates do not.
- Before adding a new requirement, gate, checker, fixture, or ledger row, state the incremental value explicitly: which tested observable, mathematical consistency condition, or current proof route it protects; which existing gate it strengthens, replaces, or connects; and why the same value cannot be captured by improving the native derivation. If that value is weak, defer the infrastructure and advance the theory instead.
- In corpus-advancement reports, do not recommend new validation infrastructure merely because another hurdle can be named. Recommend it only when the expected value is reasonable relative to the already large gate set, and when it has a concrete consumer in the present theory stack.
- Write textbook-facing AAA prose from the perspective of the era in which AAA is accepted as the working theory. The proposed-theory caveat belongs in global framing, claim-level metadata, priority status, or an explicit local uncertainty note, not repeated as sentence-level hedging. Do not dilute ordinary explanatory prose with default phrases such as "if accepted," "might," "could," "should," "the question is whether," or similar hedges unless the specific local statement is genuinely speculative or blocked.
- When an insight feels foundational, prefer wording such as "deeper basis," "ontological basis," "fundamental ledger," or "stronger claim than" before escalating to universal statements like "root of all" or "explains everything."
- Do not flatten a real insight into timid prose; keep the force of the insight, but name its scope, what it directly establishes, and what still requires separate argument.

#### Terminology and Reference Exclusions

- In authored documentation and AAA prose, do not use `retard`, `retarded`, or related variants, including in full quotations. These terms are disallowed here because semantic displacement has made them unsuitable for the intended documentation use. Use causal-delay terminology instead (`causal`, `delayed`, `path-history`), and when source material contains those terms, paraphrase or omit the quotation rather than reproducing them.
- Do not reference the entourage or any entourage member names in `content/markdown/aaa` documents.

### End-User App Language

- In end-user-facing web app communication, use plain language and avoid internal software jargon.
- If a technical term cannot be avoided, explain it immediately in ordinary language.
- For reader-facing UI standards and current UI preference decisions, follow [content/markdown/aaa/archie/ui-guidelines.md](content/markdown/aaa/archie/ui-guidelines.md) and [content/markdown/aaa/archie/navigation-and-controls.md](content/markdown/aaa/archie/navigation-and-controls.md).

## SWE Architecture and Modularity

### Code Structure

- Follow [content/markdown/aaa/archie/software-architecture-and-maintenance.md](content/markdown/aaa/archie/software-architecture-and-maintenance.md) for detailed architecture, cleanup, canonical-path, and anti-cruft policy. The non-negotiable summary is:
  - keep large entrypoints as composition roots;
  - put discrete behavior in focused modules, services, or helpers;
  - reuse existing helpers, factories, normalization paths, and UI primitives before adding parallel implementations;
  - avoid backward-compatibility shims, dual paths, and partial migrations unless the operator/developer explicitly requests a temporary transition;
  - separate responsibilities such as rendering, state, parsing/normalization, menu construction, domain logic, and persistence when practical;
  - record rationale in [reference/architectural-decisions](reference/architectural-decisions/README.md), priority ledgers, issues, PRs, or git history rather than preserving stale paths in live code.

### Solver Ownership

- EOM under `src/eom` is the sole solver engine and the sole production target for architrino motion, causal roots, path histories, coupled evolution, and solver-owned geometry. EOM output acquires canonical authority only through its declared acceptance and migration gates.
- EOM is the only engine permitted in this repo. Do not introduce, port in, restore from history, or resurrect any other engine or its outputs; treat anything claiming a different engine's provenance as non-evidence, quarantine it, and flag it to the operator.
- Producer-asserted evidence flags (for example a self-reported `canonicalEomEvidence`) are never consumed; canonical authority comes only from EOM acceptance gates and independent oracles.
- Route all solver-dependent app, simulation, and research-instrument work toward EOM contracts and native interfaces. When EOM does not yet provide a required capability, keep the work blocked, quarantined, or explicitly non-authoritative.
- JavaScript-only solver code may exist only as explicitly named `reference`, `fallback`, `test`, fixture, or comparison code. It must not be presented as the production path, promoted to default runtime behavior, or used to bypass a missing EOM solver capability.
- Architrino primitives do not have physical mass. If a reference, fixture, or comparison row contains a `mass` or mass-like field, treat it as a numerical integration weight or comparison-kernel parameter only; do not describe it as architrino ontology, and do not use it as evidence for mass-map or assembly mass claims.
- Keep solver boundaries modular: topology, EOM solver/ABI, record schema (`eom_evolution_contract/v0`), interaction law, path-history storage, wake-history/event rows, output datasets, and visualization remain separate responsibilities under the EOM architecture.

### Debugging Discipline

- Always inspect the relevant code paths and rendered structure before proposing or applying a fix. Find the actual code causing the issue rather than inferring the solution from symptoms or screenshots alone when the implementation can be examined directly.
- After identifying the real cause, search for other instances of the same or similar code elsewhere in the codebase that could produce the same class of problem.
- In operator/developer-facing communication, avoid the phrase `instead of guessing`.



## Commit Audits

### Required Checks

- Git hooks are configured via `core.hooksPath=.githooks`.
- Treat the hook scripts under `.githooks` as the source of truth for required commit and push checks.
- `pre-commit` runs:
  - `node scripts/validate-content.mjs --check --strict`
  - `node scripts/build-scene-graph.mjs --check --strict`
  - `node scripts/check-receiver-normal-clean-slate.mjs`
  - `node scripts/angular-momentum/check-frequency-triplet-notation-drift.mjs`
  - `node scripts/check-polarity-notation-drift.mjs`
  - `node scripts/check-animator-runtime-wiring.mjs`
- `pre-push` runs the shared Content Integrity gate before push:
  - `node scripts/check-content-integrity.mjs`
  - `node scripts/check-animator-runtime-wiring.mjs`

### If Scene Graph Drift Appears

- If a hook reports scene-graph drift, regenerate and re-check:
  - `node scripts/build-scene-graph.mjs --write --strict`
  - `node scripts/build-textbook-md-pdf.mjs --write`
  - `node scripts/validate-content.mjs --check --strict`
  - `node scripts/build-scene-graph.mjs --check --strict`
  - `node scripts/build-textbook-md-pdf.mjs --check`
  - the additional affected hook mirrors when committing or pushing.
- If `--write` updates generated files (for example `content/graph/scene_graph.json` or reading-copy markdown), stage those updates and retry the commit or push.
