# Answer Engine Source Contract

## Workstream Metadata

- Kind: `priority-contract`
- Status: `draft`
- Claim level: `priority-only`
- Parent priority: [Archie Interface App](app-archie-interface.md)
- Assistant mode contract: [assistant-mode-contract.md](../archie/assistant-mode-contract.md)
- Answer artifact manifest: [answer-artifact-manifest.md](answer-artifact-manifest.md)
- Manifest-driven service architecture: [manifest-driven-service-architecture.md](manifest-driven-service-architecture.md)
- Manifest service contracts: [manifest-service-contracts.md](manifest-service-contracts.md)
- Source ingestion and retrieval context contract: [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md)
- Model/provider capability registry contract: [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md)
- Service terms and account policy contract: [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md)
- V1 product requirements: [v1-product-requirements.md](v1-product-requirements.md)
- Service platform owner: [Archie Service Platform](../archie/service-platform.md)

## Purpose

This packet defines the answer-engine and source-authority contract for the future Archie question service.

The Answer Artifact Manifest defines where source context, claim context, and answer text live. The manifest service contracts define how service boundaries return validated manifests. The source ingestion and retrieval context contract defines how source records, routes, freshness, source chips, and exclusions become `source_context`. This packet defines the answer-engine decision rule for choosing from that validated context, assigning claim labels, building answer text, and failing closed when the request exceeds source support.

It is not runtime code. It is the contract a future implementation should encode in retrieval prompts, source-ranking logic, answer-engine tests, unsupported-answer fixtures, and source-chip rendering tests.

## Core Invariant

The answer engine may explain, route, compare, triage, and draft. It may not promote source status.

The strongest supported claim label must be determined before generated media, speech, token spending, saved notes, or issue submission add presentation layers. Later service components can inherit or weaken source and claim context; they cannot strengthen it.

Provider-backed answer generation is generation machinery, not source authority. The provider registry may enable, block, downgrade, or meter an answer capability, but provider model output, model memory, provider health, provider quality score, or provider cost class cannot raise the claim label selected from validated sources.

## Answer Engine Inputs

The answer engine receives a manifest shell plus the validated retrieval context defined in [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md).

Required inputs:

| Input | Purpose |
| --- | --- |
| `mode` | User-selected or routed mode. |
| `request_summary` | Non-sensitive summary from the request gateway. |
| `context_route` | Optional page, scene, sphere, document, app, or source route. |
| `source_policy` | Enabled source classes and public/operator visibility rules. |
| `retrieval_candidates` | Candidate source records with source class, authority status, freshness, rank, section hints, and source-chip payloads. |
| `system_card_route` | Required route for proof status, caveats, launch status, validation, and unsupported answers. |
| `priority_visibility` | Whether priority-only material may be shown and how it must be labeled. |
| `external_prior_physics_policy` | Whether curated external prior-physics sources are available for this mode. |

The engine should not receive private credentials, token-wallet internals, raw provider cost data, or media-generation instructions. Those belong to other service boundaries.

If provider-backed answer generation is requested, the manifest should carry only the safe provider execution context defined by [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md). Missing provider capability, failed provider quality gate, missing fallback, missing provider terms, or missing cost map should produce an unsupported or downgraded response, not a source-authority substitute.

## Source Selection Rules

Source selection should follow the authority order in [assistant-mode-contract.md](../archie/assistant-mode-contract.md).

1. Prefer authored `published_corpus` routes for theory explanations.
2. Use `scene_route` and `generated_reading_copy` routes for navigation and reading convenience, not stronger authority.
3. Use `app_guide` for controls, visual diagnostics, runtime behavior, and app limits.
4. Use `priority_material` only when the UI explicitly allows development-status material.
5. Use `external_prior_physics` only for comparison and recovery-target context, never as $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology.
6. Exclude `model_memory` from public answer authority.

If the best available source class is disabled for the current surface, the answer should route to a nearest supported source or return an unsupported response instead of silently using the disabled source.

## Claim Label Assignment

The engine assigns exactly one primary claim label and may add secondary explanatory tags only for UI rendering.

| Label | Assign when |
| --- | --- |
| `published corpus` | Authored corpus material directly supports the answer. |
| `derivation target` | The corpus names the recovery or proof burden but the derivation remains open. |
| `priority-only` | The answer depends on priority material or a working packet. |
| `app diagnostic` | The answer describes app behavior, controls, visual state, or runtime diagnostics. |
| `external comparison` | The answer compares an $\mathbb{A}\mathbb{A}\mathbb{A}$ claim with external physics or outside literature. |
| `AAA-native stance` | The answer explains from inside the $\mathbb{A}\mathbb{A}\mathbb{A}$ frame as an educational premise while preserving source routes and caveat routing. |
| `unsupported` | Available sources do not support the requested claim or the requested action violates policy. |

When two labels both seem plausible, choose the weaker label unless the stronger source support is explicit. For example, a polished scene route does not turn an open derivation target into a published-corpus claim, and a generated image does not turn a visual analogy into proof.

## Mode Routing Contract

Each mode has a different allowed source mix and failure shape.

| Mode | Primary source classes | Required answer behavior |
| --- | --- | --- |
| `Ask` | `published_corpus`, `scene_route`, `generated_reading_copy` | Answer from source-backed material or route to unsupported behavior. |
| `Explain` | `published_corpus`, `scene_route`, `app_guide`, approved `priority_material` | Explain at the requested level while preserving claim label and source route. |
| `Compare` | `published_corpus`, `external_prior_physics`, approved `priority_material` | Separate inherited physics, $\mathbb{A}\mathbb{A}\mathbb{A}$ claim, recovery target, and open burden. |
| `Visualize` | source classes inherited from the underlying answer | Produce text or visual specification only after claim label is assigned. |
| `Triage Idea` | `published_corpus`, `priority_material`, `app_guide`, `scene_route` | Classify the idea, identify overlap, name smallest next artifact, and draft issue metadata when useful. |
| `Find Source` | `scene_route`, `published_corpus`, `generated_reading_copy`, `app_guide` | Return direct route/source with source class and short reason. |

Mode routing should be deterministic enough to fixture-test. If the requested mode lacks the required source class or policy support, the engine should return the nearest supported mode and record the reason in `claim_context`.

## Answer Body Contract

The answer engine writes `answer_body`, not media artifacts.

Required output fields:

| Field | Requirement |
| --- | --- |
| `display_text` | Source-grounded answer or unsupported response. |
| `verbatim_segments` | Stable segments for speech sync, copy/export, citations, and rendering tests. |
| `summary_text` | Short non-sensitive summary when useful for receipts, issue drafts, or saved notes. |
| `reading_path` | Ordered source routes for continuation when available. |
| `followup_prompt` | Optional next-work prompt; must start with `Closure goal:` when intended for another agent thread. |

The engine should preserve TeX exactly in source-derived or user-provided math. It should not simplify TeX syntax for narration; the speech layer may decide how to speak approved verbatim segments without changing displayed text.

## Unsupported-Answer Contract

Unsupported answers are normal product behavior, not error noise.

Required unsupported output:

1. state that the available sources do not support the requested claim or artifact;
2. name the nearest supported source, route, or open burden when available;
3. assign `claim_context.claim_label: unsupported` unless a weaker supported label is more accurate;
4. keep `answer_body.display_text` plain and useful;
5. offer a safe next route, search target, issue draft, or smaller question when useful;
6. avoid invented citations, proof-status upgrades, apology loops, and confident synthesis from memory.

Unsupported behavior should be used for proof overclaims, missing source routes, disabled priority material, unavailable external comparison sources, unavailable high-quality speech, unsafe generated media, hidden public actions, missing service terms, and token/privacy refusals.

## Source Context Output

The retrieval context boundary populates `source_context`; the answer engine may add claim-facing reasons but must not reconstruct source authority from scratch.

Required output:

| Field | Requirement |
| --- | --- |
| `source_classes_used` | Only enabled source classes actually used. |
| `primary_source_routes` | Ordered routes shown as source chips or reading links. |
| `supporting_source_routes` | Secondary routes used for context or comparison. |
| `excluded_source_classes` | Disabled, unavailable, unsafe, or out-of-scope classes. |
| `source_policy` | Visibility and source-class policy used for this request. |
| `source_freshness` | Repository commit, index snapshot, generated-copy version, or retrieval timestamp. |
| `system_card_route` | Required for proof status, caveat, launch status, validation, and unsupported answers. |
| `missing_source_routes` | Requested routes or source classes that could not be resolved. |
| `source_chip_payloads` | UI-ready source chips with source class, route, authority status, and claim-label floor. |

If no source route is available, the response should say that directly. A missing route is not permission to use model memory as authority.

## Issue Triage Output

When the mode is `Triage Idea` or the user asks to file feedback, the answer engine should prepare classification fields before the issue draft service writes the issue artifact.

Minimum classification:

1. idea category: `bug`, `source gap`, `reader confusion`, `proof burden`, `app usability`, `new proposal`, or `non-actionable`;
2. overlap with existing source route or open burden;
3. strongest claim label;
4. smallest next artifact;
5. recommended owner lane;
6. duplicate keys for issue mining;
7. private-material inclusion state.

The issue draft service may later turn this into public issue text, but it should not reconstruct claim status from scratch.

## Regression Fixtures

The future implementation should include answer-engine fixtures for:

| Fixture | Required proof |
| --- | --- |
| `engine-published-corpus-001` | Published-corpus question receives `published corpus` label and authored source route. |
| `engine-derivation-target-001` | Open proof burden receives `derivation target` label and System Card/open burden route. |
| `engine-priority-disabled-001` | Priority-only answer is withheld or visibly downgraded when priority material is disabled. |
| `engine-priority-visible-001` | Priority-only answer is labeled `priority-only` when development-status material is enabled. |
| `engine-app-diagnostic-001` | App visual/control answer receives `app diagnostic` label and no proof implication. |
| `engine-external-compare-001` | Prior-physics comparison separates external source, local claim, recovery target, and open burden. |
| `engine-unsupported-001` | Unsupported proof claim returns fail-closed answer body and nearest supported route. |
| `engine-missing-route-001` | Missing source route is reported rather than replaced by model memory. |
| `engine-tex-preserve-001` | User/source TeX is preserved in `display_text` and `verbatim_segments`. |
| `engine-issue-triage-001` | Idea triage outputs category, duplicate keys, owner lane, claim label, and smallest next artifact. |
| `engine-provider-source-authority-negative-001` | Provider output and model memory cannot become source authority or raise a claim label. |

## Implementation Handoff

Closure goal:
Turn the Answer Engine Source Contract into retrieval rules, claim-label assignment tests, unsupported-answer fixtures, and manifest population checks.

Use this packet, [assistant-mode-contract.md](../archie/assistant-mode-contract.md), [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md), [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md), [answer-artifact-manifest.md](answer-artifact-manifest.md), and [manifest-service-contracts.md](manifest-service-contracts.md) as the source of truth.

Task:
- Consume validated source records, source chips, missing routes, and source freshness from the retrieval context.
- Encode source-class allow/deny policy per mode.
- Define deterministic claim-label assignment.
- Confirm provider-backed answer generation cannot change source class, claim label, or unsupported-answer behavior.
- Populate `source_context`, `claim_context`, and `answer_body`.
- Add unsupported-answer and missing-route fixtures.
- Add issue-triage classification fields before issue draft generation.

Constraints:
- Preserve TeX exactly.
- Do not use model memory as public source authority.
- Do not let provider output, provider health, generated media, token spend, voice quality, or presentation style strengthen claim labels.
- Do not add runtime AI calls, credentials, deployment config, or public launch behavior unless explicitly requested.
