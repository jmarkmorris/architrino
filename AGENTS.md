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
- **At the master-equation level, speak of acceleration, not force.** The substrate law is acceleration-first: causal-root hits determine $d^2\mathbf X/dT^2$ directly. Force is a higher-level concept applied to assemblies; the optional conversion $\mathbf F=\mu_{\text{arch}}\mathbf A$ is bulk bookkeeping only and does not license force language in architrino-level reasoning, prose, or operator communication. Use `acceleration contribution`, `acceleration kernel`, `per-hit acceleration`, and similar acceleration-first terms where `force row` or `force law` might otherwise appear.
- **Use normalized wake-speed units in every numerical instantiation:** set $c_f=1$ in every new calculation, analytical protocol, simulation, fixture, test, tolerance definition, and operator-facing numerical example. Retain symbolic $c_f$ in derivations when its dependence matters, but never instantiate it with another numerical value. Provenance-bound legacy artifacts retain their recorded value and must not be silently relabeled; rerun them with $c_f=1$ before using them for a current conclusion or combining them with current evidence.
- **Import test.** Before using any standard-physics result, classify it: (a) derived within $\mathbb{A}\mathbb{A}\mathbb{A}$ — may enter derivations; (b) a recovery/closure target or observer-level observational constraint — enters as a target or boundary condition at effective grade, never as a premise; (c) an unexamined import — barred; stop and flag it to the operator.
- Standard physics remains legitimate in three explicitly labeled roles: recovery target at effective grade, observational constraint at observer level, and clearly marked comparison or heuristic. For term-by-term level mapping, use [content/markdown/aaa/archie/comparative-glossary.md](content/markdown/aaa/archie/comparative-glossary.md); for level-explicit prose, use [content/markdown/aaa/archie/terminology-usage.md](content/markdown/aaa/archie/terminology-usage.md).

This document distinguishes three audience scopes:

- `operator/developer`: communication with the workspace operator/developer during collaboration.
- `author/editor`: authored documentation and AAA prose, especially under `content/markdown/aaa`.
- `end user`: language shown to readers and users of the web apps.

### Workspace Identity

- Do not address the agent by name in prompts or operator/developer communication. Start directly with the task or `Closure goal:`.
- When a role label is useful, use `Principal Proof Architect & Integrator`; the fuller CTO role description lives in [reference/research-office/cto/cto.md](reference/research-office/cto/cto.md).
- For all Python work, including live PDG commands, use the shared venv exposed as `$AAA_VENV`, falling back to the repo-adjacent `../.venv`; prefer `VIRTUAL_ENV="${AAA_VENV:-../.venv}"` and `"${AAA_VENV:-../.venv}/bin/python"` over system `python` or `python3`.

### Math and TeX Rendering

- The detailed authority is [content/markdown/aaa/archie/mathematics-style-guide.md](content/markdown/aaa/archie/mathematics-style-guide.md); the web-app rendering target is `KaTeX`.
- For substantial mathematical explanations or notation tables whose normal view is inadequate, use the [math-preview skill](.agents/skills/math-preview/SKILL.md); preserve the source, apply the project theme, and verify the rendered document and image.
- Preserve TeX delimiters and content exactly (`$...$`, `$$...$$`, `\(...\)`, `\[...\]`).
- Prefer `$...$` for inline math and reserve `$$...$$` for standalone equations; do not place display math inside sentences, headings, list labels, callouts, or preview text.
- When using the TLA AAA in prose/math, always use the stylized form `$\mathbb{A}\mathbb{A}\mathbb{A}$` (code: `$\mathbb{A}\mathbb{A}\mathbb{A}$`), except in literal file paths or code identifiers.
- Do not use `A^3`, `A³`, or `$A^3$` as theory abbreviations, visual marks, badges, search keys, handles, or citation labels. Use `Architrino`, `Architrino Assembly Architecture`, `AAA` only in the limited interoperability cases, or `$\mathbb{A}\mathbb{A}\mathbb{A}$` in formal prose and math.

### Operator/Developer Communication

- Use [reference/op/codex-goal-seeking-prompt-template.md](reference/op/codex-goal-seeking-prompt-template.md) for the detailed communication and reporting procedure.
- Follow [reference/op/operator-explanation-standard.md](reference/op/operator-explanation-standard.md) for plain-language explanation: every technical unit (equation stack, derivation step, dense table, jargon-dense paragraph, code or measurement block) is immediately followed by an inline `Plainly:` passage at AP-STEM-senior/sophomore-EE level, with never more than three consecutive technical paragraphs between interludes. A closing recap never substitutes for inline explanation. Define other technical terms in one clause at first use.
- Ask necessary questions one at a time. Put fixed choices in ranked order with the preferred choice first and end with the explicit option prompt, such as `(y/n)` or `(a/b)`.
- Include a concise `Closure goal:` line near the end of every substantive response and at the start of every generated or recommended prompt.
- Use established project terminology. Resolve overlapping terms against canon, and ask before introducing a new project term.
- Refer to the endorsed solver under `src/eom` as the `EOM solver` in operator/developer communication, end-user UI, and prose. Do not call it the `native solver` or `native EOM solver`. Preserve `native` only in established code identifiers, executable names, schema fields, provenance tokens, and literal compatibility interfaces where renaming would change a machine contract.
- Maintain recurring operator/developer workflow feedback as one-line tasks in [README-op.md](reference/op/README-op.md); detailed procedures belong under `reference/op/`.

### Workspace Workflow

#### Startup Access Gate

Before attempting the repository bootstrap reads, determine whether the current session can actually read files in this local checkout. Do not infer filesystem access from the interface name or from a path appearing in the conversation.

- **If the checkout is readable:** read this file (`AGENTS.md`) in full, then read the generated router at [reference/op/agent-startup-orientation.generated.md](reference/op/agent-startup-orientation.generated.md), choose one workflow, and read only its live owner. Do not ask permission for these reads or report them back as a task result. Use [reference/op/README.md](reference/op/README.md) as the procedure index.
- **If the checkout is not readable:** do not attempt the local reads and do not block on them. Apply any repository policy supplied in the conversation, subject to higher-priority instructions; state once, near the start of the first substantive reply, that the local `AGENTS.md` and router reads were skipped because this environment cannot reach the checkout; then proceed on the substance using the available context.
- A session without checkout access must not imply that it inspected live files or current repository state. Distinguish conclusions supported by the supplied conversation from conclusions that require a repo-aware session.
- Use [reference/op/theory-orientation.md](reference/op/theory-orientation.md) for theory-facing startup and [content/markdown/aaa/archie/software-architecture-and-maintenance.md](content/markdown/aaa/archie/software-architecture-and-maintenance.md) for software architecture, cleanup, canonical paths, and anti-cruft policy.
- The operator often runs many agents in this same checkout at the same time. Treat a dirty working tree as normal ambient state, not as an exceptional condition by itself.
- The operator does not use git worktrees for this repo because they do not meet the workflow requirements. Do not propose or request a git worktree as the default isolation strategy unless the operator explicitly asks for one.
- Claude must not execute any git command, including read-only ones such as `git status`, `git diff`, and `git log`, and must not read `.git` directly. Git operations belong exclusively to Codex. To observe the working set, use non-git tools (for example `ls`, file reads, or search) and keep the write set scoped to the files the current task owns. Report unrelated dirty files only when they block the task, create overwrite risk, affect validation, or matter for staging, committing, pushing, or PR publication.
- In closeouts, distinguish scoped edits from ambient multi-agent worktree state. Avoid generic warnings such as "the broader working tree has additional user changes" unless those changes alter the next action.
- Treat operator/developer implementation input as a request for an across-the-board, reproducible feature or rule across the relevant app, renderer, corpus path, or workflow class. Do not satisfy such input with one-off local customization unless the operator/developer explicitly scopes it that way; any exception, per-item override, or special case must be negotiated with the operator/developer before implementation.
- Follow [reference/op/long-running-test-heartbeats.md](reference/op/long-running-test-heartbeats.md) for long-running jobs: rebuild first, keep the job watched or observably detached, and emit a fixed-cadence heartbeat.
- If you are working on a task in a priority list and you complete that task, remove it from the priority list and renumber any items that follow.

#### Generated Artifacts

- Do not manually edit generated artifacts unless the generator is missing, stale, or broken and the manual edit is explicitly called out.
- During ordinary edit batches, edit canonical source files first and run generator `--check` commands when validation is needed. Do not run generator `--write` commands after every small code, prose, or priority edit.
- Run generator `--write` commands only when the operator/developer explicitly requests regeneration, explicitly asks to fix generated drift, or the work is in the final branch/PR process described in [reference/op/git/codex-pr-branch.md](reference/op/git/codex-pr-branch.md).
- Outside an explicit regeneration/fix-drift request or the final branch/PR process, if a generator `--check` reports generated drift, report the drift and the exact `--write` command needed instead of running it.
- If regeneration is performed, rerun the corresponding `--check` commands before reporting the work complete.
- Runtime payloads declared in [scripts/config/generated-runtime-assets.json](scripts/config/generated-runtime-assets.json) are reproducible, ignored build outputs and must never be tracked or force-added. Local setup, tests, and Pages builds may prepare them with `node scripts/prepare-runtime-assets.mjs --write`; this command must not edit authored sources. Preserve their canonical sources and generators. The [machine-artifact retention policy](reference/op/machine-artifact-retention.md) owns file, collection, and branch growth limits and the Actions publishing contract.
- The iOS textbook package is an on-demand development snapshot, not a routine PR output. Do not regenerate it or require its freshness during ordinary edits, full web-content regeneration, or the final branch/PR process unless the operator explicitly requests iOS packaging or iOS package work is in scope. Preserve the app and exporter; use the strict package checks in [apps/ios/ArchitrinoReader/README.md](apps/ios/ArchitrinoReader/README.md) for requested builds. App Store release is deferred until theory closure and an explicit operator release decision.
- The children's-book pilot is an on-demand export workflow, not a shipped app surface or routine PR output. Preserve its manuscripts, original illustrations, exemplars, prompts, QA records, and appearance baseline; keep generated pages, PDFs, derivatives, and review bundles in ignored local storage. Follow [the pilot export procedure](reference/learning-office/childrens-books/production/README.md) only for requested exports or exporter verification. Do not regenerate source artwork or replace the appearance baseline as part of a normal export.

### Evidence Independence

This section governs every claim in this repository, at every tier, in code, prose, prompts, and operator communication.

- **An agreement is evidence only if the two sides are independent.** Reproduction against prior output, a golden fixture derived from the same code, a replay of a saved record, or a control that short-circuits to the same path proves only that the code is deterministic. "Reproduces to $10^{-9}$" is not a result until the second side is independent.
- A claim that a computation is correct requires an **independent reference**: a closed form, a theorem, an analytically known case, or an instrument authored separately from the thing it checks. Name which one, in the evidence record.
- A reference implementation, oracle, or comparison instrument **must not be modified in the same change as its subject**. When both sides must change to implement one mathematical rule, the rule itself is then unchecked by their agreement: state the rule as a theorem, prove it separately, and say plainly that parity now tests implementations rather than the rule.
- **Never linearize about a configuration that is not an equilibrium.** A stability spectrum computed about a state the object does not occupy has no referent, at any anchoring, magnitude, or sign. Confirm force balance before any stability verdict; where a force-balance negative says nothing binds, the corresponding stability claim is void by construction, not merely unconfirmed.
- **A model swept over its own knobs is evidence about the model.** Parameterized stand-ins for a medium, environment, or response law report whatever their author built in. They cannot bear on a constitutive law that the theory must derive.

#### Claim Grading

- **Grade every claim as derived, measured, inferred, or guessed where it is made.** A measured claim names its instrument and the boundary of what that instrument can establish.
- **A verified local fact does not license a global claim.** State the additional inference and its falsifier separately.
- **Every claim carries its falsifier in operator-checkable terms:** say what observation would overturn it and where to look.
- **Cost claims are empirical.** Profile wall time and resource use; geometry, cell counts, or other proxy metrics alone do not establish cost.
- **Read the code path's actual obligation before proposing against it.** Propose against the implementation and its declared contract, not a remembered model of either.
- **Absence of output is not evidence of absence** when the instrument could not have produced output. A long-running job that writes only on completion is indistinguishable from a dead one; a silent channel is not a negative result. Check the instrument's reach before reading its silence.

### Theory-Facing Routing

- Use [reference/op/theory-orientation.md](reference/op/theory-orientation.md) for the current convergence frontier, document-selection path, mathematical-artifact bias, and durable-capture procedure.
- Use [reference/research-office/cto/prompts/convergence-campaign.md](reference/research-office/cto/prompts/convergence-campaign.md) for corpus convergence modes, edit authority, promotion triage, and handoff format.

### Authoring and Editorial Policy

- [About Architrino — Sources, References, and Attribution](content/markdown/aaa/archie/about-architrino.md#sources-references-and-attribution) owns the corpus policy for selecting, omitting, identifying, and presenting references; its [AI-Assisted Research and Review](content/markdown/aaa/archie/about-architrino.md#ai-assisted-research-and-review) section owns source-checking and disclosure expectations. All source-mining, review, promotion, and authoring guidance must defer to that policy rather than define competing selection rules. Acquisition procedures, research provenance, and item-specific license obligations remain distinct from deciding which references belong in reader-facing prose.
- The detailed authorities are [content/markdown/aaa/archie/academic-style-guide.md](content/markdown/aaa/archie/academic-style-guide.md), [content/markdown/aaa/archie/mathematics-style-guide.md](content/markdown/aaa/archie/mathematics-style-guide.md), [content/markdown/aaa/archie/mathematics-terminology.md](content/markdown/aaa/archie/mathematics-terminology.md), [content/markdown/aaa/archie/terminology-usage.md](content/markdown/aaa/archie/terminology-usage.md), and [content/markdown/aaa/archie/comparative-glossary.md](content/markdown/aaa/archie/comparative-glossary.md).
- In markdown documents, use relative link targets relative to the current document. Do not use absolute filesystem paths and do not use root-absolute deployment-sensitive targets like `/content/...` or `/Users/...`.
- Do not manually hard-wrap ordinary Markdown prose. Keep each paragraph and each prose-bearing list item on one physical source line so rendered review surfaces can wrap it to the available width. Preserve line breaks required by Markdown structure, display math, code, tables, quotations, or an intentional explicit hard break.
- Keep documents in `content/markdown/aaa` self-contained with respect to priority material. Do not refer or link from those documents to [reference/priorities](reference/priorities/README.md); if priority material matters, restate or promote the needed content within `content/markdown/aaa` instead.
- Write ordinary guidance and reader-facing prose forward-only: state the current source of truth directly and keep history in architectural decisions, priorities, issues, pull requests, or git history.
- Any measured result names the actual instrument, its grade, and what it can establish. Never attribute a result to an instrument or capability that did not produce it.
- Documents and passages must be reader-ready before promotion from `reference/priorities` into `content/markdown/aaa`. Complete the mathematics, evidence, assumptions, claim grading, academic exposition, and review during preparation. Promotion moves or integrates that prepared material into its canonical corpus location; it does not require a rewrite. Preserve ready prose and make only necessary placement, link, and navigation adjustments. Keep document-status blocks, ownership, workstreams, tasks, packets, gates, queues, operator decisions, agent dialogue, closure prompts, internal paths, raw content hashes, process receipts, and resource telemetry separate from the publication-ready document. Preserve such development provenance in priority, evidence, audit, or repository-history records. Internal labels may survive only when they are also the best reader-facing mathematical concept, and then only at their honest claim level. If substantive revision is still needed, finish that preparation before promotion.
- The raw-hash publication rule applies to explanatory text and visible link labels. Hash-bearing URLs and functional link anchors are permitted; do not rename or remove routing identifiers as prose cleanup.
- Treat the Archie canon of guides and glossaries as controlled references, not casual edit targets.
- Change canon only when the task explicitly changes terminology or style policy, or when leaving it unchanged would conflict with accepted content; otherwise discuss the proposed canon change and its downstream effects first.
- Theory/math-first authoring: prioritize derivations, definitions, geometry, and dynamics; minimize forward-looking TODO/checklist language tied to future observations or experiments unless explicitly requested.
- Distinguish ontology, dynamical or symmetry-based derivation, effective/coarse-grained summary, and speculation. Preserve strong insights at the strongest defensible level while naming their scope and remaining proof burden.
- Treat closure targets as controlled obligations, not as an invitation to collect every plausible external theory. A closure target is required only when it protects contact with tested physics or an already-accepted mathematical or empirical constraint; otherwise treat the external framework as a comparison tool, heuristic, or speculation.
- Prefer native derivations and concrete success markers over new gates, checkers, fixtures, or ledgers. Add an obligation artifact only when it protects a tested observable or accepted mathematical condition, has a current consumer, and cannot be replaced by improving the derivation or an existing gate.
- Write textbook-facing AAA prose from the perspective of the era in which AAA is accepted as the working theory. The proposed-theory caveat belongs in global framing, claim-level metadata, priority status, or an explicit local uncertainty note, not repeated as sentence-level hedging. Do not dilute ordinary explanatory prose with default phrases such as "if accepted," "might," "could," or "should." Use "the question is whether" only when introducing a genuinely open, explicitly named closure target.
- In authored documentation and AAA prose, do not use `retard`, `retarded`, or related variants, including in full quotations. These terms are disallowed here because semantic displacement has made them unsuitable for the intended documentation use. Use causal-delay terminology instead (`causal`, `delayed`, `path-history`), and when source material contains those terms, paraphrase or omit the quotation rather than reproducing them.
- Do not reference Research Office workflow material or Specialist role names in `content/markdown/aaa` documents.

### End-User App Language

- In end-user-facing web app communication, use plain language and explain unavoidable technical terms immediately.
- For reader-facing UI standards and current UI preference decisions, follow [content/markdown/aaa/archie/ui-guidelines.md](content/markdown/aaa/archie/ui-guidelines.md) and [content/markdown/aaa/archie/navigation-and-controls.md](content/markdown/aaa/archie/navigation-and-controls.md).

## SWE Architecture and Modularity

- Follow [content/markdown/aaa/archie/software-architecture-and-maintenance.md](content/markdown/aaa/archie/software-architecture-and-maintenance.md) for detailed architecture, cleanup, canonical-path, and anti-cruft policy. Keep one canonical implementation path per responsibility, use focused modules behind thin composition roots, and do not retain dual paths or compatibility shims unless the operator/developer explicitly requests a temporary transition.
- The accepted [EOM production-host decision](reference/architectural-decisions/eom-cpp-production-host.md) owns solver policy, and the live [EOM evolution contract](./reference/priorities/app-solver/contracts/evolution-contract-v1.md) owns the current versioned requirements. EOM under `src/eom` is the sole forward production solver target; its output gains authority only through declared acceptance gates and independent oracles.
- Do not introduce or resurrect another production solver. JavaScript solver code is reference, fallback, test, fixture, or comparison code only and must not bypass a missing EOM capability.
- Architrino primitives do not have physical mass. If a reference, fixture, or comparison row contains a `mass` or mass-like field, treat it as a numerical integration weight or comparison-kernel parameter only; do not describe it as architrino ontology, and do not use it as evidence for mass-map or assembly mass claims.

### Debugging Discipline

- Always inspect the relevant code paths and rendered structure before proposing or applying a fix. Find the actual code causing the issue rather than inferring the solution from symptoms or screenshots alone when the implementation can be examined directly.
- After identifying the real cause, search for other instances of the same or similar code elsewhere in the codebase that could produce the same class of problem.
- In operator/developer-facing communication, avoid the phrase `instead of guessing`.

## Commit Audits

- Git hooks are configured via `core.hooksPath=.githooks`.
- Treat the hook scripts under `.githooks` as the executable source of truth and [reference/op/git/codex-pr-branch.md](reference/op/git/codex-pr-branch.md) as the procedural source of truth. Do not copy exact hook command inventories into this file.
