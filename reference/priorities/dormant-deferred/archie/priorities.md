# Archie

## Workstream Metadata

- Kind: `priority-design`
- Rank: `21`
- Value: `1.00`
- Cost: `3.5`
- ROI: `0.29`
- Status: `active`
- Claim level: `priority-only`
- Primary scene: [Archie scene](../../../../content/scenes/archie/archie.json)
- Main-ring route: [main architecture scene](../../../../content/scenes/architrino_assembly_architecture.json)
- Comics scene: [Comics scene](../../../../content/scenes/archie/comics.json)
- Comics markdown: [Comics markdown](../../../../content/markdown/aaa/archie/comics.md)
- System Card sphere: [System Card scene](../../../../content/scenes/archie/system_card.json)
- System Card markdown: [System Card markdown](../../../../content/markdown/aaa/archie/system-card.md)
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
- Runtime files to inspect: [AppSceneChromeRuntime](../../../../src/runtime/AppSceneChromeRuntime.js), [ArchitrinoSceneAppRuntime](../../../../src/apps/architrino/ArchitrinoSceneAppRuntime.js), and [index.html](../../../../index.html)

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

## Work Queue

The locally ranked service, interface, and candidate-mode execution objects live in [work-queue.md](work-queue.md). Core theory closure remains an external dependency rather than an Archie-owned task.

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
