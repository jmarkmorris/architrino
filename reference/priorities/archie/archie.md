# Archie

## Workstream Metadata

- Kind: `priority-design`
- Status: `active`
- Claim level: `priority-only`
- Primary scene: [Archie scene](../../../content/scenes/archie/archie.json)
- Main-ring route: [main architecture scene](../../../content/scenes/architrino_assembly_architecture.json)
- Retired-route candidate: [Outreach scene](../../../content/scenes/outreach/outreach.json)
- Runtime files to inspect: [AppSceneChromeRuntime](../../../src/runtime/AppSceneChromeRuntime.js), [ArchitrinoSceneAppRuntime](../../../src/apps/architrino/ArchitrinoSceneAppRuntime.js), and [index.html](../../../index.html)

## Current State

This workstream owns Archie as the public web persona, reader-facing guide, and future question interface for $\mathbb{A}\mathbb{A}\mathbb{A}$.

The main architecture ring now routes the top-level `Archie` sphere to `content/scenes/archie/archie.json`. The Archie root scene combines:

1. the existing Archie groups: `User Interface`, `Documentation`, and `Project`;
2. the application entry point: `Applications`;
3. public project entries: `Download Textbook PDF`, `Support Architrino Research`, and `GitHub Presence & Community`;
4. the former Outreach public entries: `Comics` and `Reductionist Universe`.

## Working Impression

The consolidation gives readers one coherent guide through the top-level `Archie` sphere. The current direct scene routing keeps the existing content intact while making Archie the normal public entry.

The main risk is scope drift. If Archie becomes an AI persona, it must not sound more certain than the corpus. It needs source-grounded answers, visible claim levels, and clear separation between established $\mathbb{A}\mathbb{A}\mathbb{A}$ prose, priority-only material, inherited physics summaries, and speculative comparison. The assistant interface should act like a disciplined guide over the corpus, not as an oracle that invents closure.

## Candidate Modes

1. `ask_aaa` - Answer reader questions from published $\mathbb{A}\mathbb{A}\mathbb{A}$ corpus material with citations or scene/document links. Status: `investigate`.
2. `prior_physics_compare` - Explain how a $\mathbb{A}\mathbb{A}\mathbb{A}$ claim relates to inherited physics, separating recovery target, comparison framework, and speculation. Status: `investigate`.
3. `site_navigator` - Route users to scenes, apps, textbook sections, PDFs, GitHub, support, and outreach comics. Status: `investigate`.
4. `claim_level_explainer` - Explain whether a topic is established corpus prose, derivation target, simulation target, priority-only work, or open blocker. Status: `investigate`.
5. `app_helper` - Help users understand app controls and diagnostics for deployed apps without making proof-level claims from diagnostic visuals. Status: `investigate`.

## Task Queue

1. `outreach_scene_retirement_decision` - Decide whether `content/scenes/outreach/outreach.json` remains as an unlinked legacy scene during transition, becomes a compatibility alias, or is removed after generated indexes are refreshed. Status: `active`. Depends on: generated-drift review.
2. `content_migration_map` - Decide whether the Outreach comics markdown stays under `content/markdown/aaa/outreach/comics/` as a public-content category or moves under an Archie-owned public-content path. Status: `next`. Depends on: `outreach_scene_retirement_decision`.
3. `assistant_mode_contract` - Define the first multi-mode Archie contract: allowed sources, citation behavior, answer confidence, claim-level labels, prior-physics comparison rules, and refusal behavior when the corpus does not support an answer. Status: `next`. Depends on: current Archie scene topology.
4. `source_authority_boundary` - Decide which sources Archie may use for public answers: published `content/markdown/aaa`, generated textbook copies, scene metadata, app guides, `reference/priorities`, external prior-physics sources, or only a curated subset. Status: `next`. Depends on: `assistant_mode_contract`.
5. `ui_prototype` - Design the smallest non-disruptive Archie UI, including mode selection, prompt input, source links, answer history, and fallback navigation when answer generation is unavailable. Status: `pending`. Depends on: `assistant_mode_contract` and `source_authority_boundary`.
6. `implementation_path` - Choose the implementation route: static site-only navigation first, local search-backed answers, server-backed AI answers, or staged hybrid. Status: `pending`. Depends on: `ui_prototype`.
7. `privacy_and_cost_boundary` - If AI answer generation is considered, define what user text leaves the browser, what model/service is used, rate limits, logs, cost controls, and failure behavior. Status: `pending`. Depends on: `implementation_path`.
8. `validation_and_qa` - Define the validation checklist for scene graph drift, content validation, scene search, mobile layout, keyboard navigation, answer citations, and claim-level correctness before launch. Status: `pending`. Depends on: `implementation_path`.

## Promotion Map

| Task | Primary target | Promotion gate |
| --- | --- | --- |
| `outreach_scene_retirement_decision` | Scene cleanup plan. | The legacy Outreach scene has a clear keep, alias, or remove decision. |
| `content_migration_map` | Public-content routing plan. | Comics and other public entries have reader-facing homes under the Archie information architecture. |
| `assistant_mode_contract` | Assistant requirements packet or implementation issue. | Every answer mode has source, claim-level, and unsupported-answer rules. |
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

## First Investigation Prompt

```text
Closure goal:
Complete the next Archie consolidation step by deciding what to do with the legacy Outreach scene.

Use the `aaa-corpus-advancement` skill in audit/report mode.

Context:
- The main-ring sphere now routes to `content/scenes/archie/archie.json`.
- The Archie root scene includes the existing Archie groups plus former Outreach public entries.
- The top-right Archie icon has been removed; Archie is entered through the top-level sphere.

Task:
- Decide whether `content/scenes/outreach/outreach.json` should remain temporarily, become a compatibility alias, or be removed after generated indexes are refreshed.
- Keep static scene/navigation work separate from AI assistant work.

Scope:
- Inspect `content/scenes/architrino_assembly_architecture.json`, `content/scenes/outreach/outreach.json`, `content/scenes/archie/archie.json`, `index.html`, `src/runtime/AppSceneChromeRuntime.js`, and `src/apps/architrino/ArchitrinoSceneAppRuntime.js`.
- Do not edit runtime code unless the operator/developer explicitly authorizes implementation.

Constraints:
- Preserve TeX exactly.
- Use canonical $\mathbb{A}\mathbb{A}\mathbb{A}$ terminology.
- Keep priority-only material visibly priority-only.
- Edit authority: report-only unless implementation is explicitly authorized.

Expected output:
- Outreach scene decision.
- Any direct source edits made.
- Validation checklist.
```
