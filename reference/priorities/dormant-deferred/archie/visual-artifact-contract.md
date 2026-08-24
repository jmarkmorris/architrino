# Visual Artifact Contract

## Workstream Metadata

- Kind: `priority-contract`
- Status: `draft`
- Claim level: `priority-only`
- Parent priority: [Archie](priorities.md)
- Answer artifact manifest: [answer-artifact-manifest.md](answer-artifact-manifest.md)
- Manifest-driven service architecture: [manifest-driven-service-architecture.md](manifest-driven-service-architecture.md)
- Manifest service contracts: [manifest-service-contracts.md](manifest-service-contracts.md)
- Source ingestion and retrieval context contract: [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md)
- Answer engine source contract: [answer-engine-source-contract.md](answer-engine-source-contract.md)
- Model/provider capability registry contract: [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md)
- Token ledger and privacy contract: [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md)
- Service-native speech and presentation contract: [service-native-speech-presentation-contract.md](service-native-speech-presentation-contract.md)
- Saved notebook and account history contract: [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md)
- Service terms and account policy contract: [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md)
- Generated media corporate standard: [corporate-media-standards.md](corporate-media-standards.md)
- Generated media acceptance fixtures: [corporate-media-acceptance-fixtures.md](corporate-media-acceptance-fixtures.md)
- V1 product requirements: [v1-product-requirements.md](v1-product-requirements.md)
- Service platform owner: [Archie Service Platform](service-platform.md)

## Purpose

This packet defines the visual artifact contract for the future Archie question service.

The service may create diagrams, generated images, generated-image prompts, app mockups, candidate mechanism sketches, and publication asset drafts as answer artifacts. This contract defines the purpose labels, source-basis captions, alt text, retention state, token behavior, and proof-status guardrails for those visuals.

It is not runtime image generation code. It is the policy and schema target for future visual artifact generation, diagram rendering, media validation, token receipts, privacy handling, and regression fixtures.

## Core Invariant

Visual artifacts are explanations, not evidence.

A diagram or generated image can clarify a source-grounded answer, show a visual analogy, sketch an app idea, or prepare a human-reviewed publication asset draft. It cannot strengthen a claim label, imply proof, fake evidence, fake diagnostics, fake measurements, fake citations, or bypass unsupported-answer behavior.

## Supported V1 Visual Surfaces

V1 may support these visual surfaces:

| Surface | Contract |
| --- | --- |
| Mermaid diagram | Text-native structure diagram with caption and source basis. |
| diagram spec | Implementation-neutral diagram plan with caption and alt text. |
| generated image | Controlled generated image artifact with purpose label, source-basis caption, alt text, and retention state. |
| generated-image prompt | Draft prompt for later review, labeled as a draft artifact. |
| app mockup | Visual sketch of a UI or workflow, not runtime proof. |
| candidate mechanism sketch | Speculative visual marked as candidate or priority-only when appropriate. |
| publication asset draft | Draft only; requires human review before public publication. |

Finished publication media, persistent galleries, unrestricted image generation, and user-uploaded image transformations are deferred until separate policy exists.

## Purpose Labels

Every visual artifact must carry one purpose label.

Allowed labels:

| Label | Use when |
| --- | --- |
| `concept diagram` | Structural or process explanation grounded in source text. |
| `visual analogy` | Intuition aid that should not be read literally. |
| `app mockup` | Product or UI visualization. |
| `candidate mechanism sketch` | Priority-only or speculative mechanism illustration. |
| `publication asset draft` | Human-review draft for future public media. |
| `source route map` | Navigation or reading-path visualization. |
| `comparison chart` | Prior-physics or source-status comparison with explicit labels. |

If a user requests a visual that proves a claim, the service should refuse proof framing and offer a `concept diagram`, `visual analogy`, or source route instead.

## Visual Artifact Shape

Visual artifacts should include:

| Field | Requirement |
| --- | --- |
| `artifact_id` | Stable id for rendering, receipts, and support. |
| `artifact_type` | `diagram`, `image`, `generated_image_prompt`, `app_mockup`, or `publication_asset_draft`. |
| `purpose_label` | One allowed purpose label. |
| `source_context` | Source classes and source routes inherited from the answer or weaker. |
| `claim_context` | Claim label inherited from the answer or weaker. |
| `caption` | Source-basis caption visible with the artifact. |
| `alt_text` | Accessibility text when practical; required for generated images intended for user display. |
| `retention_state` | Ephemeral unless saved under explicit policy. |
| `token_work_unit` | `diagram`, `image`, or related visual work unit. |
| `human_review_required` | Required for publication asset drafts and public marketing use. |
| `proof_status_warning` | Required when the user asks for proof, evidence, validation, or endorsement framing. |

The visual artifact may include an image URI, diagram source, prompt text, or storyboard references depending on artifact type.

## Source And Claim Rules

Visual artifacts inherit source and claim context from the answer.

The inherited `source_context` must come from [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md). The visual artifact service may weaken or annotate source status in captions, but it must not create a separate source authority model.

If a visual artifact is saved, retention, export, deletion, sharing, storage cost, and `not_project_evidence` behavior must follow [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md).

Generated visual artifacts must also respect generated-media terms, privacy notices, token terms, saved-notebook terms, and legal-review state under [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md).

Generated-image provider capabilities must follow [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md). Image generation, prompt drafting, moderation, provider health, fallback behavior, token cost class, credential boundary, privacy/terms state, and browser-key refusal must be declared before generated visual output can run.

Rules:

1. visual source context cannot outrank the answer source context;
2. visual claim context cannot be stronger than the answer claim label;
3. priority-only visuals must remain visibly development-status;
4. app mockups and diagnostics remain `app diagnostic` unless an accepted validation artifact supports more;
5. external comparison visuals must separate local claim, external source, recovery target, and open burden;
6. generated images and diagrams are not proof witnesses;
7. source-basis captions must say whether the visual is literal structure, diagrammatic summary, analogy, mockup, or candidate sketch.

If source or claim context is missing, the visual artifact should be refused or replaced with a source route.

## Accessibility Rules

Visual artifacts should be accessible by default.

Required:

1. captions for every visual artifact;
2. alt text for generated images and app mockups when practical;
3. source-basis text that survives without the image;
4. no color-only meaning in diagrams when avoidable;
5. text labels that fit the visual container in the future UI;
6. text-only fallback when a visual cannot meet accessibility requirements.

## Token And Privacy Dependencies

Visual artifacts must follow [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md).

Rules:

1. diagrams may run inside normal caps when low-cost;
2. generated images should prompt or estimate when they exceed configured limits or trigger auto-fund;
3. publication asset drafts require human-review state and may require higher caps;
4. generated visuals are ephemeral unless saved under explicit policy;
5. user-provided images, screenshots, sketches, or documents are disabled in V1 unless a later intake policy exists;
6. private user material cannot appear in generated visuals without explicit consent and approved destination.

## Corporate Media Dependencies

Visual artifacts must follow [corporate-media-standards.md](corporate-media-standards.md).

They must refuse or reshape requests involving:

1. proof inflation;
2. fake citations, fake measurements, fake app diagnostics, or fake validation;
3. real-person likeness or endorsement framing;
4. copyrighted character or brand-style dependence;
5. private user material without consent;
6. public-unsuitable, humiliating, harassing, or exploitative content;
7. regulated-risk instruction framed as Architrino advice.

## Verification Required for Advancement

Visual artifacts should not advance when:

1. source context is missing;
2. claim context is missing;
3. the request asks for proof, evidence, endorsement, or validation that sources do not support;
4. caption or alt text cannot be provided when required;
5. media-standard validation fails;
6. token cap or auto-fund confirmation is missing;
7. privacy or retention state is unresolved;
8. the request needs user-uploaded media intake that V1 does not support;
9. publication use is requested without human-review state.

Behavior for a Not advanced disposition should return a text answer, source route, diagram spec, or compliant lower-risk visual alternative.

## Regression Fixtures

The future implementation should include visual fixtures for:

| Fixture | Required proof |
| --- | --- |
| `visual-diagram-001` | Diagram artifact includes source basis, caption, alt text or accessible text, and inherited claim label. |
| `visual-image-001` | Generated image includes purpose label, source-basis caption, alt text, retention state, and no proof overclaim. |
| `visual-prompt-draft-001` | Generated-image prompt is marked as a draft and does not imply generated media already exists. |
| `visual-proof-negative-001` | Request to make an image prove a claim is refused or reshaped to concept diagram/analogy. |
| `visual-fake-diagnostic-negative-001` | Fake app diagnostic or validation visual is refused. |
| `visual-priority-label-001` | Priority-only visual preserves development-status label. |
| `visual-external-comparison-001` | Comparison chart separates local claim, external source, recovery target, and open burden. |
| `visual-accessibility-001` | Visual artifact includes caption and practical alt text, or text-only fallback. |
| `visual-private-material-001` | Private user material is excluded unless explicit consent and destination exist. |
| `visual-retention-001` | Generated image is ephemeral unless saved under explicit policy. |
| `visual-provider-registry-negative-001` | Generated image action is unavailable when no provider capability, moderation gate, fallback, cost map, or credential boundary is registered. |
| `visual-publication-draft-001` | Publication asset draft is marked human-review-required. |
| `visual-rights-negative-001` | Rights-violating character, brand, or likeness request is refused. |

## Implementation Handoff

Closure goal: Turn the Visual Artifact Contract into visual artifact schemas, media validators, purpose-label rendering, caption/alt-text checks, token/privacy checks, and regression fixtures for the Archie service.

Use this packet, [answer-artifact-manifest.md](answer-artifact-manifest.md), [manifest-service-contracts.md](manifest-service-contracts.md), [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md), [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md), [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md), [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md), [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md), [corporate-media-standards.md](corporate-media-standards.md), and [v1-product-requirements.md](v1-product-requirements.md) as the source of truth.

Task:
- Encode diagram, generated image, generated-image prompt, app mockup, candidate sketch, and publication draft artifact schemas.
- Encode generated-image provider capability, moderation, health-state, fallback, token-cost, credential-boundary, and browser-key refusal requirements.
- Define purpose labels and source-basis caption requirements.
- Add source/claim inheritance, proof-status, accessibility, rights, token, and privacy validators.
- Add fixtures for diagrams, generated images, prompt drafts, proof refusal, fake diagnostics, priority labels, external comparison charts, accessibility, private-material exclusion, retention, publication drafts, and rights refusal.

Constraints:
- Do not let visuals imply proof, validation, endorsement, or stronger claim labels.
- Do not generate or retain visuals from private user material without explicit consent.
- Do not create publication-ready assets without human-review state.
- Do not add runtime image generation, provider credentials, deployment config, or public launch behavior unless explicitly requested.
