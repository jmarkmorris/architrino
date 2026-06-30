# Archie

## Workstream Metadata

- Kind: `priority-design`
- Status: `active`
- Claim level: `priority-only`
- Primary scene: [Archie scene](../../../content/scenes/archie/archie.json)
- Main-ring route: [main architecture scene](../../../content/scenes/architrino_assembly_architecture.json)
- Comics scene: [Comics scene](../../../content/scenes/archie/comics.json)
- Comics markdown: [Comics markdown](../../../content/markdown/aaa/archie/comics.md)
- System Card sphere: [System Card scene](../../../content/scenes/archie/system_card.json)
- System Card markdown: [System Card markdown](../../../content/markdown/aaa/archie/system-card.md)
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

The first assistant behavior contract is captured in [assistant-mode-contract.md](assistant-mode-contract.md). It defines initial modes, source classes, claim labels, citation behavior, unsupported-answer behavior, the $\mathbb{A}\mathbb{A}\mathbb{A}$-native explanatory stance, multimodal outreach objectives, the System Card sphere disclosure model, and public UI blockers. No runtime AI answer generation is implemented yet.

The deployed site runs through GitHub Pages via `architrino.com`, so the first public Archie interface must be GitHub Pages-compatible by default. The first launch should use static scene routing, local indexes, and source navigation that can run entirely in the browser from committed site assets. Direct model API calls, private keys, live external search, speech processing, image intake, user-history logging, and server-side answer generation belong to a later platform phase with an explicit backend or serverless proxy, rate limits, privacy policy, logging policy, cost controls, and failure behavior. That later platform phase should wait behind the current theory-closure push unless it directly unblocks the public site.

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

## Task Queue

1. `source_authority_boundary` - Convert the contract's source classes into a GitHub Pages-compatible first-launch allowlist: public corpus, scene routing, local generated indexes, app guides, selected development-status material, curated static prior-physics references, or a staged split. Status: `active`. Depends on: `assistant-mode-contract.md`.
2. `ui_prototype` - Design the smallest non-disruptive Archie UI, including mode selection, prompt input, source links, answer history, and fallback navigation when answer generation is unavailable. Status: `next`. Depends on: `source_authority_boundary`.
3. `implementation_path` - Choose the implementation route under the GitHub Pages constraint: static site-only navigation first, local search-backed answers from committed indexes, or a later server-backed platform after theory closure. Status: `pending`. Depends on: `ui_prototype`.
4. `privacy_and_cost_boundary` - For any later server-backed Archie platform, define what user text, speech, images, and answer history leave the browser, what model/service is used, rate limits, logs, cost controls, and failure behavior. Status: `pending`. Depends on: `implementation_path`.
5. `validation_and_qa` - Define the validation checklist for scene graph drift, content validation, scene search, mobile layout, keyboard navigation, answer citations, and claim-level correctness before launch. Status: `pending`. Depends on: `implementation_path`.

## Promotion Map

| Task | Primary target | Promotion gate |
| --- | --- | --- |
| `source_authority_boundary` | Public-answer source policy. | Priority-only and speculative material cannot appear as established corpus claims. |
| `ui_prototype` | Prototype UI task. | The interface can be tested without committing to public AI answer generation. |
| `implementation_path` | Runtime implementation task. | The first public path fits GitHub Pages without browser-side secrets or direct public model calls. |
| `privacy_and_cost_boundary` | Later platform launch gate. | User data, service use, logging, and budget limits are explicit before any server-backed answer generation. |
| `validation_and_qa` | Launch checklist. | Scene, UI, answer, and claim-level checks pass. |

## Initial Constraints

- Use `Archie` as the project term for this interface unless the operator/developer explicitly changes the terminology.
- Do not present priority-only material as published $\mathbb{A}\mathbb{A}\mathbb{A}$ corpus knowledge.
- Do not let AI answer generation bypass scene, markdown, and app-guide source authority.
- Let Archie support an $\mathbb{A}\mathbb{A}\mathbb{A}$-native educational stance, with proof status, caveats, gates, and metrics routed through the System Card.
- Treat GitHub Pages as the first-launch deployment boundary: public Archie behavior must work as static site code, committed source indexes, and in-browser navigation unless a later backend platform is explicitly approved.
- Do not put private model API keys, service credentials, user-history storage, or direct public model calls in browser JavaScript.
- Treat server-backed AI, speech, image intake, and durable user history as a later platform phase after the source-authority, privacy, logging, cost, and failure boundaries are explicit.
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
- The CTO objective now includes public education and outreach through text, speech, and image-grounded Archie interactions.
- The Archie sphere now includes a System Card sphere with routes for overview, closure scorecard, validation, caveats, and launch-status surfaces.
- The deployed site runs through GitHub Pages via `architrino.com`, so the first public prototype must work as static browser code with committed local indexes and no private model credentials in the client.
- More capable server-backed AI service work is a later platform phase, expected after the current theory-closure push unless it directly unblocks the public site.

Task:
- Decide the first-launch allowlist for each source class in `assistant-mode-contract.md`.
- Treat GitHub Pages compatibility as a hard first-launch constraint.
- Specify whether priority material, generated reading copies, app guides, public reference material, and external prior-physics sources are visible to public users, operator/developer mode only, or excluded from first launch.
- Decide whether the first prototype includes only typed questions and static/local-source routing, or only reserves UI/API seams for later speech, image-grounded questions, and server-backed AI.
- Decide which System Card metrics are first-launch required and which can remain later-stage.
- Produce the smallest source policy needed for a static or local-search UI prototype.

Scope:
- Inspect `reference/priorities/archie/assistant-mode-contract.md`, `reference/priorities/archie/archie.md`, `content/scenes/archie/archie.json`, `content/scenes/archie/system_card.json`, `content/markdown/aaa/archie/system-card.md`, `content/markdown/aaa/archie/`, `reference/archie/`, and generated scene/markdown index behavior.
- Do not promote priority-only material into reader-facing corpus prose.

Constraints:
- Preserve TeX exactly.
- Use canonical $\mathbb{A}\mathbb{A}\mathbb{A}$ terminology.
- Keep priority-only material visibly priority-only.
- Edit authority: priority/design capture is authorized; stop before adding runtime AI generation, external-source live search, logging, or changing theory/canon claims.
- Do not add browser-side model API calls or private credentials.

Expected output:
- First-launch source policy and System Card metric policy captured or advanced.
- Remaining blockers for UI prototyping listed.
- Validation checklist.
```
