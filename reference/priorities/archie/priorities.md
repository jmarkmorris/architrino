# Archie

## Workstream Metadata

- Kind: `priority-design`
- Rank: `22`
- Value: `1.00`
- Cost: `3.5`
- ROI: `0.29`
- Status: `active`
- Claim level: `priority-only`
- Primary scene: [Archie scene](../../../content/scenes/archie/archie.json)
- Main-ring route: [main architecture scene](../../../content/scenes/architrino_assembly_architecture.json)
- Comics scene: [Comics scene](../../../content/scenes/archie/comics.json)
- Comics markdown: [Comics markdown](../../../content/markdown/aaa/archie/comics.md)
- System Card sphere: [System Card scene](../../../content/scenes/archie/system_card.json)
- System Card markdown: [System Card markdown](../../../content/markdown/aaa/archie/system-card.md)
- Assistant contract: [assistant-mode-contract.md](assistant-mode-contract.md)
- Interface product plan: [interface-product-plan.md](interface-product-plan.md)
- Interface brainstorming: [interface-brainstorming.md](interface-brainstorming.md)
- Interface work log: [interface-work-log.md](interface-work-log.md)
- V1 product requirements: [v1-product-requirements.md](v1-product-requirements.md)
- Answer artifact manifest: [answer-artifact-manifest.md](answer-artifact-manifest.md)
- Long-term service platform: [service-platform.md](service-platform.md)
- Service deployment option decision: [service-deployment-option-decision.md](service-deployment-option-decision.md)
- Service deployment architecture: [service-deployment-architecture.md](service-deployment-architecture.md)
- Service scaffolding and fixtures: [service-scaffolding-and-fixtures.md](service-scaffolding-and-fixtures.md)
- Runtime files to inspect: [AppSceneChromeRuntime](../../../src/runtime/AppSceneChromeRuntime.js), [ArchitrinoSceneAppRuntime](../../../src/apps/architrino/ArchitrinoSceneAppRuntime.js), and [index.html](../../../index.html)

## Current State

This workstream owns Archie as the public web persona, reader-facing guide, future question interface, product contract, and service platform for $\mathbb{A}\mathbb{A}\mathbb{A}$. Product requirements, answer and media contracts, service boundaries, and their supporting interface notes now share this single priority owner.

The main architecture ring now routes the top-level `Archie` sphere to `content/scenes/archie/archie.json`. The Archie root scene combines:

1. the existing Archie groups: `User Interface`, `Documentation`, and `Project`;
2. the application entry point: `Applications`;
3. public project entries: `Download Textbook PDF`, `Support Architrino Research`, and `GitHub Presence & Community`;
4. public reader entries: `Comics` and `Reductionist Universe`.

Active public reference material and public image assets now use Archie-owned paths under `reference/archie/` and `content/assets/images/archie/`. The retired `Outreach` scene, scene paths, markdown paths, and public-program asset/reference path names have been removed from the active route set.

The first assistant behavior contract is captured in [assistant-mode-contract.md](assistant-mode-contract.md). It defines initial modes, source classes, claim labels, citation behavior, unsupported-answer behavior, the $\mathbb{A}\mathbb{A}\mathbb{A}$-native explanatory stance, multimodal outreach objectives, the System Card sphere disclosure model, and public UI blockers. No runtime AI answer generation is implemented yet.

The deployed site currently runs through GitHub Pages via `architrino.com`. The Archie question interface should not be reduced to a static/local-source UI prototype. Treat a real Archie question service as long-term platform work: a separately designed deployment with backend or serverless runtime support, secret management, source routing, privacy policy, logging policy, rate limits, cost controls, observability, and rollback behavior. The long-term platform packet is [service-platform.md](service-platform.md); the deployment option decision is [service-deployment-option-decision.md](service-deployment-option-decision.md); the concrete deployment boundary map is [service-deployment-architecture.md](service-deployment-architecture.md); and the first schema-only implementation target is [service-scaffolding-and-fixtures.md](service-scaffolding-and-fixtures.md). This platform work should wait behind the current theory-closure push unless it directly unblocks public readiness.

## Working Impression

The consolidation gives readers one coherent guide through the top-level `Archie` sphere. The current direct scene routing keeps the existing content intact while making Archie the normal public entry.

The main risk is scope drift. If Archie becomes an AI persona, it must not sound more certain than the corpus. It needs source-grounded answers, visible claim levels, and clear separation between established $\mathbb{A}\mathbb{A}\mathbb{A}$ prose, priority-only material, inherited physics summaries, and speculative comparison. The assistant interface should act like a disciplined guide over the corpus, not as an oracle that invents closure.

## Candidate Modes

1. `aaa_native_explainer` - Answer from inside the $\mathbb{A}\mathbb{A}\mathbb{A}$ frame as an educational working premise, including future text, speech, and image-grounded questions, while preserving visible claim/source status. Status: `investigate`.
2. `ask_aaa` - Answer reader questions from published $\mathbb{A}\mathbb{A}\mathbb{A}$ corpus material with citations or scene/document links. Status: `investigate`.
3. `prior_physics_compare` - Explain how a $\mathbb{A}\mathbb{A}\mathbb{A}$ claim relates to inherited physics, separating recovery target, comparison framework, and speculation. Status: `investigate`.
4. `site_navigator` - Route users to scenes, apps, textbook sections, PDFs, GitHub, support, and comics. Status: `investigate`.
5. `claim_level_explainer` - Explain whether a topic is established corpus prose, derivation target, simulation target, priority-only work, or open blocker. Status: `investigate`.
6. `app_helper` - Help users understand app controls and diagnostics for deployed apps without making proof-level claims from diagnostic visuals. Status: `investigate`.

## Ranked Next Objects

Ordered by marginal ROI on 2026-07-17. The external `theory_closure_first` dependency is not scored as Archie-owned implementation value.

1. `platform_architecture_packet` — Fix the future service deployment route and responsibility boundary. Status: `draft`.
2. `answer_artifact_manifest_regression_fixture` — Turn the answer manifest and communication standard into one executable source, claim, media, token, privacy, action, and issue-mining fixture. Status: `candidate`.
3. `source_authority_boundary` — Convert source classes into the deployed-service allowlist. Status: `deferred`.
4. `service_scaffolding_and_fixtures` — Define schema-first service contracts, fixture families, environment classes, CI gates, and rollback evidence. Status: `draft`.
5. `privacy_security_cost_boundary` — Define data movement, providers, rate limits, retention, abuse controls, cost limits, and failure behavior. Status: `deferred`.
6. `validation_and_qa` — Define source, answer, privacy, multimodal, deployment, and rollback acceptance. Status: `deferred`.

## Detailed Task Inventory

1. `theory_closure_first` - Return near-term effort to the strongest core theory-closure targets so future Archie answers have stable substance to explain. Status: `active`.
2. `service_platform_priority` - Maintain the long-term Archie service plan in [service-platform.md](service-platform.md), including deployment, backend/serverless boundary, source authority, privacy, logging, cost, and operations. Status: `long-term`. Depends on: `assistant-mode-contract.md`.
3. `interface_product_plan` - Maintain the consolidated user experience, product tracks, and subordinate interface queue in [interface-product-plan.md](interface-product-plan.md). Status: `priority-only`. Depends on: `assistant-mode-contract.md`.
4. `source_authority_boundary` - Convert the contract's source classes into a deployed-service allowlist for public, operator/developer, priority-only, curated external, and excluded sources. Status: `deferred`. Depends on: `service_platform_priority`.
5. `platform_architecture_packet` - Use [service-deployment-option-decision.md](service-deployment-option-decision.md) and [service-deployment-architecture.md](service-deployment-architecture.md) as the deployment route and boundary map for the future service. Status: `draft`. Depends on: `theory_closure_first`.
6. `answer_artifact_manifest_regression_fixture` - Turn [answer-artifact-manifest.md](answer-artifact-manifest.md) and [ai-communication-standards.md](ai-communication-standards.md) into one executable contract fixture. Status: `candidate`. Depends on: `platform_architecture_packet`.
7. `service_scaffolding_and_fixtures` - Use [service-scaffolding-and-fixtures.md](service-scaffolding-and-fixtures.md) to drive schema-only service contracts, fixture locations, environment classes, CI gates, staging smoke tests, and rollback fixtures before runtime providers or public launch. Status: `draft`. Depends on: `platform_architecture_packet`.
8. `privacy_security_cost_boundary` - For the deployed Archie platform, define what user text, speech, images, and answer history leave the browser, what model/service is used, rate limits, logs, retention, cost controls, abuse controls, and failure behavior. Status: `deferred`. Depends on: `service_scaffolding_and_fixtures`.
9. `validation_and_qa` - Define the service validation checklist for source authority, answer citations, claim-level correctness, multimodal handling, System Card links, privacy behavior, deployment smoke tests, and rollback readiness. Status: `deferred`. Depends on: `privacy_security_cost_boundary`.

## Promotion Map

| Task | Primary target | Promotion gate |
| --- | --- | --- |
| `theory_closure_first` | Core proof/corpus readiness. | Archie has stable enough source substance to explain publicly. |
| `service_platform_priority` | Long-term platform plan. | Archie is treated as a deployed service, not a static UI mockup. |
| `interface_product_plan` | User-facing product and contract packet. | Product requirements and interface contracts remain subordinate to the single Archie owner. |
| `source_authority_boundary` | Public-answer source policy. | Priority-only and speculative material cannot appear as established corpus claims. |
| `platform_architecture_packet` | Deployment architecture task. | Secrets, model calls, user data, and operations live outside GitHub Pages static hosting, with ownership split by [service-deployment-architecture.md](service-deployment-architecture.md). |
| `answer_artifact_manifest_regression_fixture` | Executable response-contract fixture. | Source, claim, media, token, privacy, action, and issue-mining fields validate together. |
| `service_scaffolding_and_fixtures` | Schema-only implementation target. | Service code starts from contracts, fixtures, environment classes, and verification gates required for advancement before providers or public launch. |
| `privacy_security_cost_boundary` | Platform launch gate. | User data, service use, logging, retention, abuse controls, and budget limits are explicit before public beta. |
| `validation_and_qa` | Launch checklist. | Source, answer, privacy, multimodal, deployment, and rollback checks pass. |

## Initial Constraints

- Use `Archie` as the project term for this interface unless the operator/developer explicitly changes the terminology.
- Do not present priority-only material as published $\mathbb{A}\mathbb{A}\mathbb{A}$ corpus knowledge.
- Do not let AI answer generation bypass scene, markdown, and app-guide source authority.
- Let Archie support an $\mathbb{A}\mathbb{A}\mathbb{A}$-native educational stance, with proof status, caveats, gates, and metrics routed through the System Card.
- Treat GitHub Pages as the current site host and public entry surface, not as the target architecture for the full Archie question service.
- Do not put private model API keys, service credentials, user-history storage, or direct public model calls in browser JavaScript.
- Treat server-backed AI, speech, image intake, and durable user history as long-term platform features after theory closure and after source-authority, privacy, logging, cost, deployment, operations, and failure boundaries are explicit.
- Do not route public-support, GitHub, PDF, comics, or app entry points behind a hidden or non-obvious branch.
- Keep scene consolidation separate from public answer generation.

## Next Implementation Prompt

```text
Closure goal:
Design the long-term Archie service platform so the eventual question interface is deployed correctly instead of becoming a static/local-source UI prototype.

Use the compatibility-identifier `aaa-corpus-advancement` skill in edit-batch mode.

Context:
- The main-ring sphere now routes to `content/scenes/archie/archie.json`.
- The Archie root scene includes the existing Archie groups plus public entries.
- The top-right Archie icon has been removed; Archie is entered through the top-level sphere.
- The old Outreach root scene has been removed.
- Comics scene and markdown paths have moved under `content/scenes/archie/` and `content/markdown/aaa/archie/`.
- Public reference material and public image assets use `reference/archie/` and `content/assets/images/archie/`.
- The first assistant behavior contract is captured in `reference/priorities/archie/assistant-mode-contract.md`.
- The CTO objective now includes public education and outreach through text, speech, and image-grounded Archie interactions.
- The Archie sphere now includes a System Card sphere with routes for overview, closure scorecard, validation, caveats, and launch-status surfaces.
- The deployed site currently runs through GitHub Pages via `architrino.com`.
- The operator does not want a static/local-source Archie UI prototype.
- The desired Archie question interface is long-term platform work with deployment, backend/serverless runtime, model/provider boundary, privacy, logging, rate limits, cost controls, source authority, System Card disclosure, operations, monitoring, and rollback.
- The deployment option decision is captured in `reference/priorities/archie/service-deployment-option-decision.md`.
- The deployment boundary map is captured in `reference/priorities/archie/service-deployment-architecture.md`.
- The schema-only scaffolding target is captured in `reference/priorities/archie/service-scaffolding-and-fixtures.md`.
- This work should wait behind core theory closure unless platform design directly unblocks public readiness.

Task:
- Use `reference/priorities/archie/service-platform.md` as the long-term platform priority.
- Use the deployment option decision and deployment architecture packet as the current deployment source of truth.
- Use the service scaffolding and fixtures packet as the current schema-only implementation target.
- Define the source-ingestion pipeline, answer-engine boundary, model/provider abstraction, privacy/security/cost policy, observability, staging/production split, and rollback plan.
- Identify the minimum theory-closure and corpus-readiness gates before public beta.

Scope:
- Inspect `reference/priorities/archie/service-platform.md`, `reference/priorities/archie/service-deployment-option-decision.md`, `reference/priorities/archie/service-deployment-architecture.md`, `reference/priorities/archie/service-scaffolding-and-fixtures.md`, `reference/priorities/archie/assistant-mode-contract.md`, `reference/priorities/archie/priorities.md`, `content/scenes/archie/archie.json`, `content/scenes/archie/system_card.json`, `content/markdown/aaa/archie/system-card.md`, `README.md`, deployment files, runtime entry points, and generated scene/markdown index behavior.
- Do not promote priority-only material into reader-facing corpus prose.
- Do not build runtime code unless explicitly requested.

Constraints:
- Preserve TeX exactly.
- Use canonical $\mathbb{A}\mathbb{A}\mathbb{A}$ terminology.
- Keep priority-only material visibly priority-only.
- Edit authority: priority/design capture is authorized; stop before adding runtime AI generation, external-source live search, logging, deployment config, or changing theory/canon claims.
- Do not add browser-side model API calls or private credentials.

Expected output:
- Long-term platform architecture options.
- Required platform decisions.
- Public beta gates.
- Concrete implementation phases.
```
