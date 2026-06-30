# Archie

## Workstream Metadata

- Kind: `priority-design`
- Status: `active`
- Claim level: `priority-only`
- Primary scene: [Archie scene](../../../content/scenes/archie/archie.json)
- Main-ring route: [main architecture scene](../../../content/scenes/architrino_assembly_architecture.json)
- Comics scene: [Comics scene](../../../content/scenes/archie/comics.json)
- Comics markdown: [Comics markdown](../../../content/markdown/aaa/archie/comics.md)
- Assistant contract: [assistant-mode-contract.md](assistant-mode-contract.md)
- Runtime files to inspect: [AppSceneChromeRuntime](../../../src/runtime/AppSceneChromeRuntime.js), [ArchitrinoSceneAppRuntime](../../../src/apps/architrino/ArchitrinoSceneAppRuntime.js), and [index.html](../../../index.html)

## Current State

This workstream owns Archie as the public web persona, reader-facing guide, and future question interface for $\mathbb{A}\mathbb{A}\mathbb{A}$.

The main architecture ring now routes the top-level `Archie` sphere to `content/scenes/archie/archie.json`. The Archie root scene combines:

1. the existing Archie groups: `User Interface`, `Documentation`, and `Project`;
2. the application entry point: `Applications`;
3. public project entries: `Download Textbook PDF`, `Support Architrino Research`, and `GitHub Presence & Community`;
4. public reader entries: `Comics` and `Reductionist Universe`.

Active public reference material and public image assets now use Archie-owned paths under `reference/archie/` and `content/assets/images/archie/`. The retired `Outreach` scene, scene paths, markdown paths, and public-program asset/reference path names have been removed from the active route set.

The first assistant behavior contract is captured in [assistant-mode-contract.md](assistant-mode-contract.md). It defines initial modes, source classes, claim labels, citation behavior, unsupported-answer behavior, and public UI blockers. No runtime AI answer generation is implemented yet.

## Working Impression

The consolidation gives readers one coherent guide through the top-level `Archie` sphere. The current direct scene routing keeps the existing content intact while making Archie the normal public entry.

The main risk is scope drift. If Archie becomes an AI persona, it must not sound more certain than the corpus. It needs source-grounded answers, visible claim levels, and clear separation between established $\mathbb{A}\mathbb{A}\mathbb{A}$ prose, priority-only material, inherited physics summaries, and speculative comparison. The assistant interface should act like a disciplined guide over the corpus, not as an oracle that invents closure.

## Candidate Modes

1. `ask_aaa` - Answer reader questions from published $\mathbb{A}\mathbb{A}\mathbb{A}$ corpus material with citations or scene/document links. Status: `investigate`.
2. `prior_physics_compare` - Explain how a $\mathbb{A}\mathbb{A}\mathbb{A}$ claim relates to inherited physics, separating recovery target, comparison framework, and speculation. Status: `investigate`.
3. `site_navigator` - Route users to scenes, apps, textbook sections, PDFs, GitHub, support, and comics. Status: `investigate`.
4. `claim_level_explainer` - Explain whether a topic is established corpus prose, derivation target, simulation target, priority-only work, or open blocker. Status: `investigate`.
5. `app_helper` - Help users understand app controls and diagnostics for deployed apps without making proof-level claims from diagnostic visuals. Status: `investigate`.

## Task Queue

1. `source_authority_boundary` - Convert the contract's source classes into a first-launch allowlist: public corpus only, corpus plus scene routing, selected priority-status material, curated external prior-physics references, or a staged split. Status: `active`. Depends on: `assistant-mode-contract.md`.
2. `ui_prototype` - Design the smallest non-disruptive Archie UI, including mode selection, prompt input, source links, answer history, and fallback navigation when answer generation is unavailable. Status: `next`. Depends on: `source_authority_boundary`.
3. `implementation_path` - Choose the implementation route: static site-only navigation first, local search-backed answers, server-backed AI answers, or staged hybrid. Status: `pending`. Depends on: `ui_prototype`.
4. `privacy_and_cost_boundary` - If AI answer generation is considered, define what user text leaves the browser, what model/service is used, rate limits, logs, cost controls, and failure behavior. Status: `pending`. Depends on: `implementation_path`.
5. `validation_and_qa` - Define the validation checklist for scene graph drift, content validation, scene search, mobile layout, keyboard navigation, answer citations, and claim-level correctness before launch. Status: `pending`. Depends on: `implementation_path`.

## Promotion Map

| Task | Primary target | Promotion gate |
| --- | --- | --- |
| `source_authority_boundary` | Public-answer source policy. | Priority-only and speculative material cannot appear as established corpus claims. |
| `ui_prototype` | Prototype UI task. | The interface can be tested without committing to public AI answer generation. |
| `implementation_path` | Runtime implementation task. | The chosen path fits the static site/deployment model and cost/privacy boundary. |
| `privacy_and_cost_boundary` | Launch gate. | User data, service use, logging, and budget limits are explicit. |
| `validation_and_qa` | Launch checklist. | Scene, UI, answer, and claim-level checks pass. |

## Initial Constraints

- Use `Archie` as the project term for this interface unless the operator/developer explicitly changes the terminology.
- Do not present priority-only material as published $\mathbb{A}\mathbb{A}\mathbb{A}$ corpus knowledge.
- Do not let AI answer generation bypass scene, markdown, and app-guide source authority.
- Do not route public-support, GitHub, PDF, comics, or app entry points behind a hidden or non-obvious branch.
- Keep scene consolidation separate from public answer generation.

## Next Implementation Prompt

```text
Closure goal:
Set the first-launch Archie source-authority boundary so UI prototyping can proceed without exposing unsupported claims.

Use the `aaa-corpus-advancement` skill in edit-batch mode.

Context:
- The main-ring sphere now routes to `content/scenes/archie/archie.json`.
- The Archie root scene includes the existing Archie groups plus public entries.
- The top-right Archie icon has been removed; Archie is entered through the top-level sphere.
- The old Outreach root scene has been removed.
- Comics scene and markdown paths have moved under `content/scenes/archie/` and `content/markdown/aaa/archie/`.
- Public reference material and public image assets use `reference/archie/` and `content/assets/images/archie/`.
- The first assistant behavior contract is captured in `reference/priorities/archie/assistant-mode-contract.md`.

Task:
- Decide the first-launch allowlist for each source class in `assistant-mode-contract.md`.
- Specify whether priority material, generated reading copies, app guides, public reference material, and external prior-physics sources are visible to public users, operator/developer mode only, or excluded from first launch.
- Produce the smallest source policy needed for a static or local-search UI prototype.

Scope:
- Inspect `reference/priorities/archie/assistant-mode-contract.md`, `reference/priorities/archie/archie.md`, `content/scenes/archie/archie.json`, `content/markdown/aaa/archie/`, `reference/archie/`, and generated scene/markdown index behavior.
- Do not promote priority-only material into reader-facing corpus prose.

Constraints:
- Preserve TeX exactly.
- Use canonical $\mathbb{A}\mathbb{A}\mathbb{A}$ terminology.
- Keep priority-only material visibly priority-only.
- Edit authority: priority/design capture is authorized; stop before adding runtime AI generation, external-source live search, logging, or changing theory/canon claims.

Expected output:
- First-launch source policy captured or advanced.
- Remaining blockers for UI prototyping listed.
- Validation checklist.
```
