# Skills Architecture Redesign

## Decision and Scope

Status: approved and implemented. After reviewing the design and ninth-skill evaluation, the operator explicitly approved replacing the four active skills with these nine. The [current catalog and instructions](../../../op/skills/README.md) are authoritative for use; this document preserves the design and its evaluation history.

Adopt nine project-scoped entry points, each named `architrino-<task>`. The initial independent architecture review recommended eight. The operator then selected evaluation of a ninth, research coordination, to make serial and parallel compositions reusable. Nine is a design recommendation based on distinct requested outcomes and existing procedure owners, not a measured optimum or a permanent target. The former four covered useful research/review/preview work but combine source work with convergence and omit discoverable priority resumption, publication, and computational job operation.

## Source Architecture

Preserve the operator's chosen loading chain:

```text
.agents/skills/<name>/SKILL.md
  name + trigger description + mandatory owner-read pointer
        ↓
reference/op/skills/skill-<name>.md
  maintained skill instructions and outcome-based routing
        ↓
existing live procedures, corpus, queues, contracts, and tools
```

The discovered file does not hold a copied procedure or a frozen theory summary. The visible instruction file selects the relevant live owner and adds only the orchestration needed to connect the request to it. Neither layer grants authority beyond the task. The [skills policy](../../../op/skills/README.md) remains the single policy owner; the current catalog records the approved package names.

This architecture is deliberately selective. Shared rules for scientific claims, Python, generated files, communication, and concurrent work stay in their present owners. They do not become skills that must be guessed or invoked before ordinary work becomes correct.

## Approved Catalog

| Skill | Outcome and principal owner | Why it deserves an entry point |
| --- | --- | --- |
| `architrino-explore` | Provisional research reasoning and capture; [brainstorming](../../../office-of-research/cto/prompts/brainstorming.md) | A distinct intent that must remain distinguishable from accepted implementation |
| `architrino-converge` | Reconcile and develop corpus material; [convergence campaign](../../../office-of-research/cto/prompts/convergence-campaign.md) | A reusable path from accepted ideas to supported mathematical and corpus advances |
| `architrino-review` | Assess, integrate, or verify corpus/theorem feedback; [review prompt library](../../../office-of-research/cto/prompts/README.md) | One recognizable request family with outcome-based modes and different action boundaries |
| `architrino-sources` | Acquire, verify, or mine external material; [source practice](../../../op/source-mining-best-practice.md) | Source acquisition and bounded verification should not automatically become full convergence campaigns |
| `architrino-resume` | Continue a named priority lane from current state; [priority resumption](../../../office-of-research/cto/prompts/priority-lane-resume.md) | Reuses current queue and ownership discipline without repeatedly reconstructing a starting prompt |
| `architrino-publish` | Perform an explicitly selected publication handoff; [PR lifecycle](../../../op/git/pr-lifecycle.md) | Makes the existing guarded workflow easy to invoke while preserving its chosen stopping point |
| `architrino-compute` | Operate an owned long-running computational job; [job policy](../../../op/long-running-test-heartbeats.md) | Makes supervisor, monitoring, and closeout procedures discoverable without making them scientific authorities |
| `architrino-math-preview` | Render and visually inspect mathematical Markdown; proposed moved helper and maintained preview instructions | A concrete reusable capability beyond routing, with existing tests and a clearly bounded output |
| `architrino-coordinate` | Compose a bounded research investigation; [PI](../../../office-of-research/cto/prompts/start-pi.md) and [assignment](../../../office-of-research/cto/prompts/start-research.md) procedures | Makes dependency planning, permitted parallel assignments, and accountable synthesis available as one explicit research outcome |

The `architrino-` prefix distinguishes these project procedures from general-purpose plugin capabilities. The description must still name the project and its outcome: namespacing alone does not prevent inappropriate activation. Use plural `sources` to include bounded acquisition and verification, and retain `math` in preview to distinguish it from app previews and ordinary document opening.

## Selection and Composition

Choose the primary skill from the user's requested outcome. A link is not automatically a mining assignment. Comments are not automatically an integration request. A casual “next” is not automatically a request to execute a priority queue. A discussion of publishing does not authorize publication.

Supporting procedures can compose when a task needs them. For example, resumption can identify a mathematical item whose work follows convergence, and a convergence campaign can require a managed computation. Read the supporting owner when the need appears; do not preload every skill or create a compulsory multi-skill ceremony. Scientific acceptance remains with the relevant theorem, contract, and independent evidence, regardless of whether the computation is alive or completed.

Keep review modes together: directory review, comment assessment, integration, closure verification, and theorem review use different live procedures, but all are variations of the user's request to review something. Separate source work because the source itself and its provenance are a different primary input. Keep exploration separate from convergence because their intended outcomes differ.

### Serial and Parallel Composition

A skill can instruct its executing agent to use other available skills in a specified order, or to assign independent work to agents that each read a specified skill and its current instruction owner. Skills themselves are instruction packages, not running workers or a built-in scheduling language. Serial work can stay with one agent. Parallel execution requires actual host orchestration tools, available capacity, and task authority; merely listing several skills does not dispatch them or isolate their contexts.

For example, a research workflow can first acquire source material, then ask separate agents to examine independent sources or review distinct arguments, wait for their evidence, and have the coordinator integrate supported findings and prepare a mathematical preview. Serial dependencies should wait for the required artifact, while parallel assignments need distinct scopes, named input/output artifacts, permitted writes, and a coordinator responsible for conflicts, failed branches, and final integration. Giving several agents the same source or implementation does not make their agreement independent evidence.

The operator selected research coordination for ninth-skill evaluation. The proposed `architrino-coordinate` entry point composes the other capabilities while keeping the existing PI and assignment procedures as its authority. It selects only needed stages and remains capable of a serial investigation when parallelism is unnecessary or unavailable. The operator subsequently approved all nine skills for migration; their current definitions are linked from the skills index.

## Research Coordination: What We Could Do

The ninth entry point is useful when the requested product is one integrated investigation assembled from several activities. It owns the choice and dependency of those activities; the component skills and existing procedures own how each activity is performed. A coordinator is not required for every ordinary skill invocation.

### Investigate a Proof Gap

Start by reading the current claim and premises. Assign one bounded derivation attempt and one independently developed counterexample or limiting-case analysis in parallel when authorized. Source work may resolve a needed mathematical technique, but external physical interpretations do not become substrate premises. Join the results before choosing whether a calculation is useful or a corpus change is supported. Return one argument with its proof status and remaining obligation.

A possible sequence is: live claim → independent derivation and challenge → evidence comparison → targeted computation if needed → scoped synthesis. The value is a deliberate challenge to a claim before integration, not a vote among agents. The brief determines write scope; a read-only investigation ends with its supported findings.

### Propagate an Accepted Result

First establish exactly what was accepted. Parallel read-only assignments can map affected chapters and check a distinct mathematical consequence. The coordinator joins those results and assigns one writer for overlapping files. Use convergence to make authorized changes, review their resolution, and produce a mathematical preview only if needed for inspection.

A possible sequence is: accepted result → parallel impact mapping and consequence check → coordinated integration → review → optional preview. This uses parallel analysis without multiple agents independently rewriting the same shared passage. It does not turn an accepted local result into a broader claim.

### Resolve a Computational Discrepancy

Read the scientific/engineering contract and the observed failure first. A theoretical reference check and an implementation diagnosis may proceed independently when neither changes the other's reference. Use managed computation only after the intended build and run inputs are ready. Join the analytical reference and measured output before assigning a cause or declaring correction. The scientific owner determines acceptance; the computation skill supplies lifecycle control.

A possible sequence is: discrepancy and contract → parallel reference check and implementation diagnosis → owned calculation → comparison → scoped correction and validation. Failure of one branch remains visible and limits the conclusion; the coordinator does not replace missing evidence with the other branch's success.

### Requirements That Make Composition Useful

Record inputs, outputs, predecessor dependencies, and write ownership in the existing task record. Wait for necessary evidence before dependent actions. Use the host's available tools and capacity; use serial work where compatible and disclose when independent-agent review could not be obtained. Read live skill owners at assignment time rather than paste their current bodies into permanent recipes. Publication is reached only through its separate operator invocation, even when the research task succeeds.

These examples are prospective applications. They have not run as scientific campaigns and establish no measured speedup, proof, or correctness result. Their role in the design is to make the coordinator's distinct outcome and acceptance conditions reviewable.

## What Does Not Become a Skill Now

**Exports** remain with their separate owners. [Textbook review exports](../../../op/textbook-review-exports.md), iOS packaging, and children's-book production have different inputs, regeneration boundaries, and acceptance requirements. A generic export skill would obscure those differences. A dedicated export entry point can be added when repeated use demonstrates a discoverability problem.

**Generic engineering, theory facts, style rules, and individual research lanes** are not additional skills. Engineering relies on actual implementation contracts; theory and style stay in canon; lane-specific packets are selected from live queues. Creating a skill for each role, equation, chapter, or priority would duplicate routing metadata and increase overlap without an established benefit.

## Migration Design

| Current package | Proposed replacement |
| --- | --- |
| `aaa-corpus-advancement` | `architrino-converge` and `architrino-sources` |
| `corpus-review-workflow` | `architrino-review` |
| `research-exploration` | `architrino-explore` |
| `math-preview` | `architrino-math-preview` |
| No dedicated package | `architrino-resume`, `architrino-publish`, `architrino-compute`, `architrino-coordinate` |

The operator confirmed the intention to migrate, explicitly after review. On approval following that review, create the nine visible instruction owners and discovery packages together, update the policy index, and retire the old active identifiers without compatibility wrappers. Migrate current call sites, descriptions, and default prompts. Preserve historical literal identifiers in evidence and logs; where a historical record contains a navigation link, distinguish its recorded old name from a link to the current replacement. Do not silently rewrite historical evidence to suggest it ran with the new architecture.

Move the preview helper and CSS with the preview package at the same relative depth. Update its command-line help, the instruction example, and the import in `tests/math-preview.test.js`. Preserve helper behavior and asset bytes, then run the preview tests. The earlier compatibility declaration for `aaa-corpus-advancement` in the convergence architectural decision must be explicitly superseded by the authorized rename.

Parent inspection with scoped `rg` identified live consumers in `AGENTS.md`, the CTO prompt library, convergence and selective-reference prompts, source-mining practice, operator guidance, and current skill/queue indexes. Many other mentions are historical evidence. `scripts/build-agent-startup-orientation.mjs` fingerprints `AGENTS.md` and operator brainstorming; `scripts/build-claude-bootstrap-floor.mjs` fingerprints `AGENTS.md`. Expected generated drift remains with their normal authorized regeneration process. No generator write or Git publication is part of this design.

The prepared replacement patch remains disposable task material. Before applying an approved migration, reread the active files and rebuild the patch against current bytes to preserve concurrent work; do not apply a stale prepared patch wholesale.

## Ongoing Benefit and Maintenance

The expected benefits are less repeated workflow discovery, fewer incorrect task starts, reusable operational tools, and more consistent handoffs between fresh tasks. These are inferences from the design. We have not measured time savings, token savings, or a general automatic-selection success rate.

Use ordinary working records to capture concrete failures: the request, which skill or mode was selected, the expected owner, the observed consequence, and the correction. Review those cases during the existing monthly maintenance pass. Correct the narrowest faulty description or owner route. Promote a successful repeated workflow into a skill only when it has a distinct recurring outcome, a maintained owner, reusable resources or procedures, and a demonstrated gap in discovery. Merge overlapping skills and remove obsolete ones.

Assess benefit using actual future tasks: did the agent read the right current owner, preserve the requested action boundary, use the correct tool or launcher, produce the expected artifact, and require operator correction? Record elapsed time or context use only when measured. This needs no new telemetry service. Monthly and change-triggered maintenance cover both discovery metadata and the visible instructions; the procedure owners continue to evolve independently.

## Acceptance and Evidence Boundary

Before activation, validate each proposed discovery file with Skill Creator, check metadata and relative targets, and exercise positive, negative, and boundary requests against the proposed catalog. Distinguish a source walkthrough or simulated selection exercise from native Codex automatic discovery and real task execution. Publication checks remain read-only unless a separate publication request authorizes writes. After migration, run the existing preview tests and scoped content checks.

Test changed-owner behavior using disposable material: let the current owner prescribe a different rule than the obsolete summary, require the reader to consult the owner, and inspect which rule it applies. This tests a bounded behavior; it cannot prove every future agent will reread a changed file or overcome stale conversational context.

The initial independent Astra-high architectural review recommended the eight-entry catalog and identified research coordination as a future candidate; the operator subsequently requested its evaluation for inclusion. Its agreement is a second design judgment, not independent proof of productivity or scientific correctness. Validation results are recorded in the following section as completed, with limitations.

## Completed Design Checks

A separate `gpt-6-astra` agent at `high`, without the architecture document or expected-results table, read the proposed catalog and instruction drafts and simulated selection for 18 supplied requests. The following records its decisions; no workflow actions, computation, publication, or native skill-discovery test occurred.

| Request | Evaluated route |
| --- | --- |
| Think through a delayed-geometry hypothesis | Explore → brainstorming |
| Propagate an accepted derivation | Converge → convergence campaign |
| Assess reviewer comments without edits | Review → comment assessor |
| Apply reviewer comments | Review → integrator |
| Verify review resolution | Review → closure verifier |
| Find a qualifying reference for one claim, report only | Sources → bounded claim-specific search and verification |
| Mine a lecture for Architrino | Sources → mining and convergence owners |
| Summarize a cooking video | No project skill |
| Resume a named priority lane | Resume → live queue procedure |
| Explain publication | No publication execution; read operating guide/procedure |
| Commit and push | Publish → requested narrower stopping point |
| Monitor an existing simulation without launching | Compute → existing owner and monitoring only |
| Open Markdown | Normal document viewing |
| Produce a checked mathematical preview | Mathematical preview → rendering procedure |
| Regenerate textbook PDFs | Existing textbook export procedure |
| Design a publication skill without publishing | Skill Creator and policy; no publication invocation |
| Review a JavaScript PR | Engineering/code review; no corpus-review or publish selection |
| Coordinate a research team | Existing PI/research procedures, reached through startup |

The evaluator identified a real ambiguity between single-claim reference discovery and the broader Selective Reference Pass. The proposed sources instruction now names claim-specific finding in its bounded route and reserves the corpus-wide pass for an explicit campaign request. The evaluator reread that revision and reported the ambiguity resolved. It identified no remaining substantive routing weakness within these cases. This is bounded model judgment, not evidence of a universal selection success rate.

For a hypothetical stale-summary scenario, the evaluator selected the live owner's updated rule after reading its pointer and policy. This was a simulated choice, not execution against a changed live corpus or a controlled native discovery environment.

Skill Creator `quick_validate.py`, run under the shared venv against staged metadata files, accepted all eight proposed names and descriptions. A temporary Markdown-It link checker first passed a known case excluding a fenced example, then checked 39 file links across the eight proposed instruction owners: targets were existing live files or explicitly planned owner/helper paths. Prose links in this design also resolved. Heading anchors and future installed paths were not runtime-verified. `rg --files .agents/skills -g SKILL.md` continued to enumerate the original four active definitions after the rejected migration. Installation validation and the preview test are recorded in the operations work log after approved migration.

### Ninth-Skill Evaluation

The operator selected research coordination for evaluation after discussing serial and parallel skill composition. A separate Astra-high reviewer read the proposed coordinator and its live owners, then simulated seven cases: plan without launch; two independent read-only proof approaches; source comparison followed by scoped propagation; one failed worker; unavailable delegation or occupied slots; simple brainstorming; and investigation followed by explicitly requested publication. It judged coordination a distinct useful capability and identified three local wording improvements.

The proposed instructions now qualify written planning by write authority, distinguish temporarily occupied capacity from unavailable delegation, and preserve publication authority already supplied by the user while retaining the publication owner's candidate-specific requirements. The reviewer recommended inclusion with those refinements. This supports adding `architrino-coordinate` to the proposed catalog; it does not activate the skill or demonstrate native discovery, actual parallel execution, scientific correctness, or productivity gains.

The full revised coordinator instructions appear below. The parent applied the three identified refinements and checked their presence in both the working draft and this proposal. Installation and end-to-end execution tests remain part of the reviewed migration plan.

After those refinements, Skill Creator accepted all nine staged definitions, including their proposed bodies. The known-case-first Markdown-It check resolved 50 relative file links across the nine proposed owners to live files or explicitly planned owner/helper destinations; design prose file links also resolved. Heading anchors and native discovery remain outside that check. Scoped `git diff --check` passed.

## Proposed Instruction Files

The following are reviewable proposed contents at their eventual repository paths. They are not installed or active. Relative links and command examples inside these source blocks are written for those future locations. Existing live procedures remain their authority.

### architrino-explore

Proposed instruction owner: `reference/op/skills/skill-architrino-explore.md`.

Discovery metadata:

```yaml
name: architrino-explore
description: Explore provisional Architrino research ideas and capture the reasoning. Use for brainstorming and thinking aloud; not an instruction to run a convergence campaign, integrate feedback, or coordinate a research team.
```

Maintained instructions:

````markdown
# Research Exploration

Use this skill for provisional Architrino research discussion and idea capture.

1. Follow the repository [startup instructions](../../../AGENTS.md).
2. Read the live [brainstorming procedure](../../office-of-research/cto/prompts/brainstorming.md) before responding. It owns exploration, claim discipline, capture, and links to the current exposition standards.
3. Use its relevant theory and priority owners to ground the particular question. Keep the discussion and its authorized durable treatment aligned.

Select by the requested outcome. A request to reconcile or advance corpus material belongs to [Corpus Convergence](skill-architrino-converge.md); judging, integrating, or verifying feedback belongs to [Corpus Review](skill-architrino-review.md). Operational process discussion uses [operator brainstorming](../brainstorming.md).

An explicitly requested coordinated research assignment uses the existing [Principal Investigator procedure](../../office-of-research/cto/prompts/start-pi.md) and [research assignment procedure](../../office-of-research/cto/prompts/start-research.md). Exploration does not itself select team execution; follow current task and host authority.
````

### architrino-converge

Proposed instruction owner: `reference/op/skills/skill-architrino-converge.md`.

Discovery metadata:

```yaml
name: architrino-converge
description: Reconcile and advance the Architrino corpus toward current canon through mathematical development and scoped integration. Use for convergence campaigns; not general brainstorming, supplied-review assessment, or source acquisition alone.
```

Maintained instructions:

````markdown
# Corpus Convergence

Use this skill when the requested outcome is active reconciliation or advancement of Architrino corpus material.

1. Follow the repository [startup instructions](../../../AGENTS.md).
2. Read the live [convergence campaign](../../office-of-research/cto/prompts/convergence-campaign.md). Select the mode from the request; that owner supplies scope, mathematical work, action authority, promotion triage, validation, and handoff requirements.
3. Read the relevant live theory, priority, and target owners named by that procedure. Establish the current problem and perform the requested advancement under those owners.

An external source as the primary input belongs to [Source Work](skill-architrino-sources.md), whose full-mining route still uses the convergence campaign. Supplied review feedback belongs to [Corpus Review](skill-architrino-review.md); provisional discussion belongs to [Research Exploration](skill-architrino-explore.md). A specifically requested convergence exploration remains a mode of the convergence campaign.

Use its existing coordination modes only when the request and host authorize the corresponding agent work. Do not convert skill selection into permission to broaden a campaign.
````

### architrino-review

Proposed instruction owner: `reference/op/skills/skill-architrino-review.md`.

Discovery metadata:

```yaml
name: architrino-review
description: Review Architrino corpus or theorem material, assess supplied comments, integrate requested feedback, or verify review closure. Select the live procedure by outcome; excludes generic code/PR review and active convergence campaigns.
```

Maintained instructions:

````markdown
# Corpus Review

Select the procedure by the requested outcome. Follow the repository [startup instructions](../../../AGENTS.md), then read the selected live owner before acting.

| Requested outcome | Live owner |
| --- | --- |
| Review a corpus directory in reading order | [Corpus reviewer](../../office-of-research/cto/prompts/corpus-reviewer.md) |
| Assess whether supplied comments are correct or worth applying | [Review comment assessor](../../office-of-research/cto/prompts/review-comment-assessor.md) |
| Apply supplied feedback and review the full target document | [Integrator reviewer](../../office-of-research/cto/prompts/integrator-reviewer.md) |
| Verify whether edits resolved a prior review | [Review closure verifier](../../office-of-research/cto/prompts/review-closure-verifier.md) |
| Examine a named theorem, equation stack, or proof gap | [Core geometry theorem reviewer](../../office-of-research/cto/prompts/core-geometry-theorem-reviewer.md) |

Read the selected owner for current coverage, cadence, action boundaries, evidence, validation, and missing-input handling. Ground the review in the target and the live sources that owner requires. The presence of comments does not determine whether the requested outcome is assessment, integration, or verification.

For active reconciliation use [Corpus Convergence](skill-architrino-converge.md); for open-ended provisional discussion use [Research Exploration](skill-architrino-explore.md). General software and pull-request review follows the relevant code contracts and repository engineering instructions, not this corpus procedure.
````

### architrino-sources

Proposed instruction owner: `reference/op/skills/skill-architrino-sources.md`.

Discovery metadata:

```yaml
name: architrino-sources
description: Acquire, verify, or mine external papers, videos, archives, references, and datasets for Architrino work. Distinguish bounded source verification from full mining; excludes generic web questions and supplied corpus-review feedback.
```

Maintained instructions:

````markdown
# Source Work

Use this skill when external source material or reference selection is the primary object of an Architrino task. Select the requested outcome before reading a broader procedure.

1. Follow the repository [startup instructions](../../../AGENTS.md).
2. Read [About Architrino's source and reference policy](../../../content/markdown/aaa/archie/about-architrino.md#sources-references-and-attribution), including its source-checking disclosures.
3. Select the applicable route below and read its live owner. Acquire current evidence using available tools and retain the source identity and location required by that route.

| Requested outcome | Live route |
| --- | --- |
| Find, obtain, or verify sources for a specified claim, quotation, reference, or dataset | The relevant acquisition and traceability sections of [Source Mining Best Practice](../source-mining-best-practice.md), within the stated task |
| Explicitly run the corpus-wide Selective Reference Pass | [Selective Reference Pass](../../office-of-research/cto/prompts/selective-reference-pass.md) |
| Mine a source for theory developments and corpus integration | [Convergence Campaign](../../office-of-research/cto/prompts/convergence-campaign.md), then the relevant source-family sections of [Source Mining Best Practice](../source-mining-best-practice.md) |

The corpus-wide Selective Reference Pass is not the default for finding a reference for one claim. Its inventory, continuation, and reporting obligations apply only when that campaign is requested. For a local reference question, use the first route and the task's stated scope.

Read only the source-family addendum that fits the material. Acquisition, bounded verification, source mining, and reader-facing citation selection have distinct outcomes; the selected owners govern scope and action authority. Do not turn a bounded verification request into a full campaign.

Supplied review feedback is routed by [Corpus Review](skill-architrino-review.md), even when it arrives as a link. A bare external link does not settle whether the user wants assessment, acquisition, or mining; use the request and current context.
````

### architrino-resume

Proposed instruction owner: `reference/op/skills/skill-architrino-resume.md`.

Discovery metadata:

```yaml
name: architrino-resume
description: Resume a named Architrino priority workstream from its live queue and execute the next scoped step. Use for continuing a lane or its next item; not every conversational next, status-only query, or request to brainstorm.
```

Maintained instructions:

````markdown
# Priority Resumption

Use this skill when the operator asks to continue a named Architrino priority lane or execute its next queued step.

1. Follow the repository [startup instructions](../../../AGENTS.md).
2. Read the live [Priority Lane Resume procedure](../../office-of-research/cto/prompts/priority-lane-resume.md) and its named priority guidance.
3. Resolve the current workstream tracker, queue, and owning packet. The live procedure governs selection, progress, validation, and disposition; historical summaries do not substitute for these reads.
4. Apply the procedure appropriate to the selected item's actual work. Research, review, source work, and managed computation retain their own live owners.

A conversational “next” follows the active task's established boundary; it is not automatically a priority-lane request. A request only for status does not authorize executing the queue. Publication requires the operator's applicable invocation of the [publication procedure](../git/pr-lifecycle.md), independently of queue selection.
````

### architrino-publish

Proposed instruction owner: `reference/op/skills/skill-architrino-publish.md`.

Discovery metadata:

```yaml
name: architrino-publish
description: Run the Architrino Git publication procedure when the operator requests PR preparation, commit/push, PR publication, merge, or branch rollover. Excludes ordinary edits, Git explanations, code review, and mentions of future publication.
```

Maintained instructions:

````markdown
# Git Publication

Use this skill for an operator request to prepare or execute an Architrino publication action.

1. Follow the repository [startup instructions](../../../AGENTS.md).
2. Read the live [PR Lifecycle](../git/pr-lifecycle.md) in full and the hook/credential owners it requires.
3. Identify the operator's actual invocation and stopping point. Follow that live procedure for candidate scope, writer coordination, validation, presentation, publication, and any authorized later steps.

The procedure owns invocation and merge authority. Discovering or reading this skill, asking how Git works, reviewing code, or mentioning a later PR does not invoke publication. Do not infer a broader lifecycle from a narrower commit-and-push request. For explaining the operating model, use the [Git operating guide](../git/git-github-operating-guide.md) as reference material without executing a publication mode.
````

### architrino-compute

Proposed instruction owner: `reference/op/skills/skill-architrino-compute.md`.

Discovery metadata:

```yaml
name: architrino-compute
description: Run, monitor, resume, or hand off long-running Architrino tests, builds, simulations, or analytical jobs using their live launch owners. Excludes scientific acceptance claims, routine short checks, and unrelated desktop reminders.
```

Maintained instructions:

````markdown
# Managed Computation

Use this skill for the lifecycle of a long-running Architrino computational job. It can support another research or engineering task without replacing that task's scientific or software contract.

1. Follow the repository [startup instructions](../../../AGENTS.md).
2. Read the live [Long-Running Job Policy](../long-running-test-heartbeats.md), then the requested job's actual build/run entrypoint and owning contract.
3. For scientific simulation routing, consult the [Simulation Protocol Routing Index](../simulation-protocol-routing-index.md) to identify the correct scientific and operational owners.
4. Use those owners for launch, supervision, progress evidence, resumption, handoff, and closeout. Establish current process identity and ownership before acting on an existing job.

The operational policy owns supervision mechanics; the scientific or engineering owner determines what the output establishes. An alive process or advancing heartbeat is not scientific acceptance. A monitor-only request retains its monitoring scope. Routine short checks do not require a new lifecycle workflow merely because this skill exists.
````

### architrino-math-preview

Proposed instruction owner: `reference/op/skills/skill-architrino-math-preview.md`.

Discovery metadata:

```yaml
name: architrino-math-preview
description: Render and visually inspect Architrino mathematical Markdown when the normal view is inadequate or a math preview is requested. Excludes routine document viewing, app/UI previews, textbook exports, and mathematical correctness review.
```

Maintained instructions:

````markdown
# Math Preview

Show readable, accurately rendered mathematics while preserving the source.

Follow the repository [startup instructions](../../../AGENTS.md) before rendering.

Use the repository's bundled Markdown-It, KaTeX, fonts, and app colors through [the helper](../../../.agents/skills/architrino-math-preview/scripts/render-preview.mjs). This is an on-demand local presentation workflow, not a corpus generator or mathematical verifier. Do not change formulas, source documents, app code, or generated publication artifacts to make a preview render.

Prose written around a preview, and the response that delivers it, follow [the operator explanation standard](../../../reference/op/operator-explanation-standard.md), which owns audience, explanation density, and response shape.

## Render

1. Identify the requested document or section. For newly drafted explanations, save the exact intended Markdown in the task's writable artifact directory first. Preserve code examples and all four TeX delimiter forms. Do not substitute Unicode approximations or generated artwork for equations.
2. Choose an absolute HTML output path under the repository's project-file-placement policy or an explicitly requested deliverable location. Do not hardcode a previous task's directory or port. Use the helper's current project theme by default; consult its `--help` for supported overrides when the request or deliverable needs one.
3. Run from the repository root, substituting actual quoted paths:

   ```bash
   node .agents/skills/architrino-math-preview/scripts/render-preview.mjs --input INPUT.md --output OUTPUT.html --serve
   ```

   The helper creates one self-contained HTML snapshot and prints its local preview URL. It serves only that single output file, not a repository directory.

4. Read the JSON receipt: source hash, selected section, math count, image omissions, output path, and server URL. Rendering failures stop before replacing an existing preview; report the offending expression without silently changing it. Check `--help` for options. `--section "Exact heading text"` includes that heading and its subsections, stopping before the next peer or parent heading. An absent or ambiguous heading is an error.
5. For a long document, keep the full HTML and render a second output with `--section` for the requested image. Avoid one extremely tall screenshot with unreadable text. The preview intentionally disables source links and lists images without fetching them; tell the user if those omissions matter. Navigation within the preview remains usable.

## Display and capture

- Use the browser tools available in the current environment and their documented APIs, following any applicable browser skill. Follow the user's browser selection and the tools' permission rules; report a blocked action or unavailable capability. This skill does not authorize an alternate browser or permission bypass. Do not navigate to local file URLs; use the helper's loopback URL for the deliberately limited preview. The dedicated port is intentional because the artifact is outside the web-app tree. Do not restart the shared app server for this workflow.
- Keep the helper's command session and printed PID associated with this task. Reuse an owned preview server by rendering to the same registered output and reloading the tab. It reads that exact HTML file on each request. Never stop another task's server. A saved HTML file remains usable after its preview server stops; the URL is temporary.
- Open or claim the appropriate preview tab. Check the visible page, KaTeX error elements, and font readiness before taking the screenshot. Use the normal browser viewport or a full-page capture of a bounded excerpt; do not resize solely to make a screenshot prettier.
- Save the screenshot as PNG in the artifact directory, then inspect it. Verify legible subscripts, superscripts, bold vectors, fractions, text contrast in the selected theme, and unclipped table content. Fix presentation issues in the preview template, not in the source mathematics. A parse pass alone does not establish visual quality.
- Leave the full document open as a browser deliverable when the user wants it. Include the PNG inline in the final reply and link the standalone HTML, so the reader gets the full document for browsing and a legible image inside the conversation. Distinguish source preservation and rendering checks from mathematical correctness. State that these are snapshots; rerender after source edits. The Markdown source stays authoritative, and the screenshot is a checked view of one particular version of it.

## Maintain

Keep this helper as the owner of disposable math previews. Reuse the existing library loader and app palette; do not copy vendor bundles or route normal textbook/app builds through this skill. Change the shared preview template for presentation fixes rather than accumulating per-document CSS patches.

Run `node --test tests/math-preview.test.js` after helper changes, then exercise a real document through the browser. Use the Skill Creator validator for skill metadata changes. Do not run corpus regeneration merely because this skill or its routing guidance changed; report generated guidance drift under the repository's normal policy.
````
### architrino-coordinate

Proposed instruction owner: `reference/op/skills/skill-architrino-coordinate.md`.

Discovery metadata:

```yaml
name: architrino-coordinate
description: Coordinate an explicitly requested Architrino research investigation with dependent stages, permitted parallel agents, and evidence-based synthesis. Excludes ordinary brainstorming, single-source lookups, generic team management, and automatic publication; plan-only requests remain plans.
```

Maintained instructions:

````markdown
# Research Coordination

Use this skill for an explicitly requested coordinated Architrino research investigation: decomposing an objective into dependent and independent work, assigning permitted agent work, and integrating the evidence into one accountable result. A request only to design a research plan ends with that plan.

## Live Owners

Follow the repository [startup instructions](../../../AGENTS.md), then read the [Principal Investigator procedure](../../office-of-research/cto/prompts/start-pi.md) and [research assignment procedure](../../office-of-research/cto/prompts/start-research.md). These own briefing, live role discovery, independence, task authority, and synthesis. Use the [parallel-work procedure](../codex-multiprompt.md) for applicable execution and integration guidance under the current host's tools and permissions.

## Compose the Investigation

Identify the requested result, current source owners, completion boundary, and permitted work from the brief. Describe the smallest useful sequence of activities in the existing working record when writes are authorized; otherwise provide the plan in the response. Name each activity's input, output, dependency, and responsible agent or coordinator. Do not create a separate orchestration ledger when the existing record suffices.

Select supporting capabilities by the actual activity:

| Activity | Skill or owner |
| --- | --- |
| Establish the current item in a named priority lane | [Priority Resumption](skill-architrino-resume.md) |
| Explore a provisional mechanism or proof route | [Research Exploration](skill-architrino-explore.md) |
| Acquire, verify, or mine a source | [Source Work](skill-architrino-sources.md) |
| Assess an argument, integrate requested feedback, or verify a review | [Corpus Review](skill-architrino-review.md), selecting the requested mode |
| Develop or propagate supported corpus material | [Corpus Convergence](skill-architrino-converge.md) |
| Operate a required long-running calculation | [Managed Computation](skill-architrino-compute.md), with the actual scientific/engineering contract |
| Present mathematics when the normal view is inadequate | [Mathematical Preview](skill-architrino-math-preview.md) |

Use only the activities required by the brief. Workers read the selected skill's current discovery file and maintained owner; when the skill is unavailable but its procedure is accessible, use that procedure directly and disclose the capability boundary. Do not preload the entire catalog or make a worker recursively coordinate another team unless the assignment requires and authorizes it.

Run activities serially when one requires another's artifact or when they share write ownership. Use permitted parallel agents for independent questions with explicit return artifacts, following the assignment owner. Two readers of the same calculation do not supply two independent references. Request independence through a distinct derivation, counterexample, or separately authored instrument appropriate to the claim, not through agent count.

Use the host's available concurrency and preserve authorized model settings. When agent slots are temporarily occupied, wait for capacity or do independent preparation where useful; do not prematurely replace a requested independent-agent review with serial self-review. If delegation is unavailable or the task calls for one agent, perform compatible activities serially; do not claim that this supplies independent-agent review. If the requested evidence requires independence that cannot be obtained, report the remaining evidence obligation while completing unaffected work.

## Join and Finish

Wait for required predecessor results before integrating dependent work. The coordinator compares returned findings against live owners, resolves conflicts with evidence, and retains explicit unresolved branches where the evidence does not decide. Use the synthesis and validation requirements in the live PI/assignment procedures. A missing or failed worker result does not silently count as success; continue independent work, and either complete that branch within authority or identify its effect on the requested conclusion.

This skill coordinates research, not an automatic end-to-end release pipeline. Ordinary brainstorming, a single-source lookup, a status question, or an instruction to draft a team plan does not by itself request agent execution. Corpus editing follows the brief's scope. Publication is a separate operator invocation of its live procedure and is not a default final activity. When the operator explicitly requests publication as a later stage, that request supplies the applicable invocation; proceed through its live owner after prerequisites are met without inferring broader authority or requesting redundant permission. Preserve any candidate-specific approval required by that owner. Do not invent a new scientific acceptance gate, hidden scheduler, or recurring job through composition.
````
