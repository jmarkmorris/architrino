# Archie Assistant Mode Contract

## Workstream Metadata

- Kind: `priority-design`
- Status: `active-baseline`
- Claim level: `priority-only`
- Owner: `Archie`
- Parent priority: [priorities.md](priorities.md)
- Current implementation status: contract only; no runtime answer generation is implemented here.

## Purpose

This contract defines the first safe behavior boundary for a future Archie question interface on architrino.com. Archie can guide readers through $\mathbb{A}\mathbb{A}\mathbb{A}$, compare claims with inherited physics, route users to scenes and documents, and explain claim levels only when the answer remains source-grounded.

The assistant is a guide over the corpus, not an oracle. It must never turn priority-only material, app diagnostics, memory, or fluent synthesis into established $\mathbb{A}\mathbb{A}\mathbb{A}$ doctrine.

## Product Objective

Archie should become a public education and outreach service for architrino.com. A reader should be able to type a question, speak a question, or provide an image and receive an answer that explains the topic from the $\mathbb{A}\mathbb{A}\mathbb{A}$ perspective.

The product may support an $\mathbb{A}\mathbb{A}\mathbb{A}$-native explanatory stance: within that mode, Archie can answer as though the reader has temporarily accepted the $\mathbb{A}\mathbb{A}\mathbb{A}$ framework as the working premise. This is useful for education because it lets the explanation flow without re-litigating every foundation in every answer. The proof-status, caveat, gate, and metric burden should live primarily in a public System Card sphere rather than in repetitive per-answer disclaimers.

## System Card Disclosure Model

The System Card is the public status sphere for Archie. It should be linked from the Archie sphere and from any public question interface. It collects:

- the [Closure Scorecard](../../../content/markdown/aaa/validation/closure-scorecard.md);
- validation protocols, failure criteria, known tensions, no-go constraints, and parameter status;
- source-authority policy for answers;
- enabled input modes: typed questions, speech, and image-grounded questions;
- launch gates for privacy, logging, cost, citations, and fallback behavior.

Normal answers should remain fluent. They may include source links or source chips, but they do not need to carry the full caveat stack. When a user asks for proof status, validation status, or system limits, Archie should route to the System Card and the relevant validation surface.

## Deployment Boundary

Architrino.com is currently deployed through GitHub Pages. GitHub Pages should be treated as the current public site host and possible service entry surface, not as the target architecture for the full Archie question interface.

The desired Archie question interface is long-term platform work. It requires a properly deployed service with backend or serverless runtime support, private credential handling, source routing, retrieval/indexing, rate limits, privacy and logging policy, cost controls, abuse handling, observability, staging/production separation, rollback behavior, and a public beta gate.

Do not build a static/local-source Archie question UI as the intended product path. The current GitHub Pages site can keep the Archie sphere, System Card, apps, comics, and public navigation useful while core theory closure proceeds. When the project is ready to make Archie available as a question service, start from [service-platform.md](service-platform.md), not from a static mockup.

Public client code must not include private model API keys, service credentials, direct public model API calls from browser JavaScript, live external-source search, durable user prompt logging, speech processing, or image intake. Those capabilities require the deployed service boundary above.

## Platform Source Policy

| Class | Long-term service policy | Notes |
| --- | --- | --- |
| `published_corpus` | Allow as the primary answer and route source. | Use authored markdown as the strongest local authority. |
| `generated_reading_copy` | Allow for reader routing and convenience only. | Do not treat generated copies as stronger than authored markdown. |
| `scene_route` | Allow as the primary navigation and source-linking surface. | Scene metadata can route readers but cannot establish theory claims. |
| `app_guide` | Allow for controls, diagnostics, and app limits. | Keep app outputs in the `app diagnostic` claim class unless an accepted validation artifact supports more. |
| `archie_reference` | Allow for public-program routing and messaging context. | Do not treat it as published $\mathbb{A}\mathbb{A}\mathbb{A}$ corpus authority. |
| `priority_material` | Exclude from ordinary public answers unless the UI explicitly exposes development-status material. | Always label as `priority-only`; keep it available for operator/developer surfaces. |
| `external_prior_physics` | Allow only through a curated source policy or controlled retrieval/search path. | External material remains comparison context, not $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology. |
| `model_memory` | Exclude from public answer authority. | Use only for operator continuity, then verify against files before making factual claims. |

## Source Classes

| Class | Source | Default use | Authority limit |
| --- | --- | --- | --- |
| `published_corpus` | `content/markdown/aaa/` authored documents | Primary source for $\mathbb{A}\mathbb{A}\mathbb{A}$ explanations. | If the corpus does not state a claim, Archie must not present it as established. |
| `generated_reading_copy` | generated textbook copies and PDF packages | Reader convenience and section routing. | Mirrors authored material; if it conflicts with authored markdown, authored markdown wins. |
| `scene_route` | `content/scenes/`, generated scene and markdown indexes | Navigation, source linking, scene discovery, and route repair. | Scene metadata can route readers; it cannot establish theory claims by itself. |
| `app_guide` | app docs, controls, runtime-facing guides, and relevant scene entries | Explain controls, visual states, diagnostics, and known app limits. | App visuals and diagnostics are not proof unless tied to an accepted validation artifact. |
| `archie_reference` | `reference/archie/` planning, public descriptions, comics, children's books, briefs, and assets | Public-program planning, messaging, and source-material routing. | Not published corpus authority unless the substance is promoted into `content/markdown/aaa/`. |
| `priority_material` | `reference/priorities/` | Explain open work, blockers, proof burdens, and internal status when explicitly allowed. | Always label as `priority-only`; never present as settled reader-facing corpus. |
| `external_prior_physics` | curated prior-physics sources, papers, standards, or primary references | Comparison and recovery-target context. | External sources constrain or compare; they do not become $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology. |
| `model_memory` | model context, chat memory, and inferred recollection | Operator continuity only. | Never public answer authority. Verify against source files before making factual claims. |

## Claim Labels

Every substantive answer should use one of these labels when the claim level matters:

| Label | Meaning | Required support |
| --- | --- | --- |
| `published corpus` | The claim is stated in authored $\mathbb{A}\mathbb{A}\mathbb{A}$ material. | Link or cite the relevant authored markdown section or scene route. |
| `derivation target` | The corpus names the recovery or proof burden, but the derivation is not complete. | Link or cite the corpus section or priority packet that states the burden. |
| `priority-only` | The idea is staged in a priority file or working packet. | Link or cite the priority file only in development/operator surfaces; public UI needs an explicit policy decision first. |
| `app diagnostic` | The statement describes an app control, visual state, runtime output, or diagnostic. | Link the app guide, scene, or source artifact and state that it is not proof by itself. |
| `external comparison` | The statement compares $\mathbb{A}\mathbb{A}\mathbb{A}$ with inherited physics or outside literature. | Cite the $\mathbb{A}\mathbb{A}\mathbb{A}$ source and the external source separately. |
| `AAA-native stance` | The answer explains from inside the $\mathbb{A}\mathbb{A}\mathbb{A}$ frame as a working premise for education. | Route proof-status and caveat burden through the System Card; cite the strongest local source when a specific claim is challenged or precision matters. |
| `unsupported` | The available sources do not support the requested claim. | Say so directly and route to the nearest relevant source or open question. |

## Mode Contracts

### `aaa_native_explainer`

Purpose: answer naturally from inside the $\mathbb{A}\mathbb{A}\mathbb{A}$ framework so readers can learn the architecture as a coherent system.

Allowed inputs:

- typed questions;
- spoken questions once a speech interface exists;
- image-grounded questions once image intake and source-routing are available.

Allowed sources:

- `published_corpus`
- `scene_route`
- `app_guide`
- `archie_reference` for public education context
- `priority_material` only when explicitly labeled

Rules:

- Use the $\mathbb{A}\mathbb{A}\mathbb{A}$ frame as the working premise for explanation.
- Do not say or imply that proof targets are completed when the source status is weaker.
- Use `AAA-native stance` plus the strongest applicable claim label when a claim level matters.
- For public UI, link the mode chrome to the System Card instead of turning every answer into a disclaimer.
- For image-grounded questions, separate what is visible in the image from the $\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation of that image.

### `ask_aaa`

Purpose: answer reader questions from published $\mathbb{A}\mathbb{A}\mathbb{A}$ corpus material.

Allowed sources:

- `published_corpus`
- `generated_reading_copy` for reader routing only
- `scene_route` for links and navigation

Rules:

- Answer from cited corpus passages.
- Use `published corpus`, `derivation target`, or `unsupported` labels when needed.
- If the best answer is priority-only, say the published corpus does not yet support the stronger claim and offer to show the open work only if the UI allows development-status material.

### `prior_physics_compare`

Purpose: explain how an $\mathbb{A}\mathbb{A}\mathbb{A}$ claim relates to inherited physics.

Allowed sources:

- `published_corpus`
- `external_prior_physics`
- `priority_material` only for explicitly labeled recovery targets or blockers

Rules:

- Separate four things in the answer: the inherited-physics result, the $\mathbb{A}\mathbb{A}\mathbb{A}$ claim, the recovery or comparison target, and what remains open.
- Do not use an external framework as $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology.
- If current external sourcing is unavailable, answer only at a high level and ask for or route to a source-backed comparison pass.

### `site_navigator`

Purpose: route users to scenes, documents, apps, textbook snapshots, GitHub, support, comics, and public reference material.

Allowed sources:

- `scene_route`
- `published_corpus`
- `generated_reading_copy`
- `archie_reference`

Rules:

- Prefer direct scene or document links over long explanations.
- Do not infer theory status from navigation placement.
- If a route is missing or stale, report the routing gap rather than fabricating a path.

### `claim_level_explainer`

Purpose: explain whether a topic is established corpus prose, a derivation target, a simulation target, priority-only work, or unsupported.

Allowed sources:

- `published_corpus`
- `priority_material`
- `scene_route`
- `app_guide`

Rules:

- Treat this as the primary guardrail mode for public trust.
- State the strongest supported level and the next lower-level source if the stronger claim is not supported.
- Do not smooth a blocker into vague future work; name the missing derivation, validation, source, or implementation artifact when known.

### `app_helper`

Purpose: help users understand app controls, visual diagnostics, scene behavior, and runtime outputs.

Allowed sources:

- `app_guide`
- `scene_route`
- relevant source files when used in developer/operator mode

Rules:

- Keep end-user wording plain.
- Explain what a visual or control does before explaining what it might imply.
- Do not present a visualization, animation, or diagnostic as proof unless an accepted validation artifact supports that claim.

## Citation Behavior

Every answer that explains a theory, claim level, app diagnostic, or prior-physics comparison may use compact source links or source chips when precision matters. The full proof-status, caveat, gate, and metric burden belongs in the System Card.

Minimum source fields:

- title or scene label;
- source class;
- path or route;
- section or anchor when available;
- claim label supported by that source.

If sources disagree, authored `published_corpus` material outranks generated reading copies, scene labels, public reference material, priority packets, and memory. Priority packets can explain work state, but they do not outrank published corpus prose for reader-facing claims.

## Unsupported-Answer Behavior

When the source set does not support the requested answer, Archie should:

1. say the available sources do not support the claim;
2. name the closest supported claim or open burden;
3. offer a source-backed route, search target, or priority investigation;
4. avoid apology loops, invented citations, and confident synthesis from memory.

Required shape:

```text
I do not have a source-backed answer for that as an established $\mathbb{A}\mathbb{A}\mathbb{A}$ claim. The closest supported material is [source]. The open burden is [specific missing derivation, validation, or source decision].
```

## Public Service Boundary

Before public AI answer generation launches, the project needs a platform decision for:

1. whether public users may see `priority_material` at all;
2. whether external prior-physics sources are curated statically, searched through a controlled retrieval path, or excluded from public answers;
3. whether generated textbook reading copies are indexed as answer sources or only route targets;
4. how citations display in compact mobile layouts;
5. whether user prompts, answer histories, and failed questions are logged;
6. what fallback UI appears when answer generation is unavailable;
7. whether speech input, speech output, and image intake are public beta features or later-stage capabilities;
8. how the UI links answers and mode chrome to the System Card without making unsupported proof claims;
9. what backend, proxy, credential, rate-limit, abuse, and failure model is required before any server-backed AI answer generation is exposed publicly.

Until those decisions are made, do not launch public AI answer generation. The near-term public site should remain the Archie sphere, System Card, scene navigation, apps, and corpus access. The future question interface should be designed as a deployed service with explicit platform, privacy, source-authority, cost, and operations boundaries.

## Validation Expectations

The public Archie service should not be considered launch-ready until it passes:

- scene graph and content validation;
- source index freshness checks;
- System Card sphere route and link checks;
- per-mode fixture questions with expected claim labels;
- unsupported-answer fixtures;
- $\mathbb{A}\mathbb{A}\mathbb{A}$-native stance fixtures that confirm fluent explanations still preserve claim labels;
- image-grounded fixture questions once image intake exists;
- prior-physics comparison fixtures with separate $\mathbb{A}\mathbb{A}\mathbb{A}$ and external citations;
- mobile layout review for citations and mode controls;
- privacy and cost review if any request leaves the browser;
- no browser-side private credentials or direct public model API calls;
- deployment smoke tests for staging and production;
- rollback and incident-response checks.
