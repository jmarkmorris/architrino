# Service-Native Speech And Presentation Contract

## Workstream Metadata

- Kind: `priority-contract`
- Status: `draft`
- Claim level: `priority-only`
- Parent priority: [Archie Interface App](app-archie-interface.md)
- Answer artifact manifest: [answer-artifact-manifest.md](answer-artifact-manifest.md)
- Manifest-driven service architecture: [manifest-driven-service-architecture.md](manifest-driven-service-architecture.md)
- Manifest service contracts: [manifest-service-contracts.md](manifest-service-contracts.md)
- Source ingestion and retrieval context contract: [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md)
- Answer engine source contract: [answer-engine-source-contract.md](answer-engine-source-contract.md)
- Token ledger and privacy contract: [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md)
- Issue mining signal contract: [issue-mining-signal-contract.md](issue-mining-signal-contract.md)
- Saved notebook and account history contract: [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md)
- Service terms and account policy contract: [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md)
- Generated media corporate standard: [corporate-media-standards.md](corporate-media-standards.md)
- Generated media acceptance fixtures: [corporate-media-acceptance-fixtures.md](corporate-media-acceptance-fixtures.md)
- V1 product requirements: [v1-product-requirements.md](v1-product-requirements.md)
- Service platform owner: [Archie Service Platform](../archie/service-platform.md)

## Purpose

This packet defines the service-native speech and presentation contract for the future Archie question service.

The service should be able to generate high-quality spoken answers, synchronized displayed verbatim text, captions/transcripts, narration scripts, comparison scripts, and animation storyboards without changing source authority. This contract defines the source text, synchronization, voice-identity, accessibility, retention, token, and presentation-artifact rules for that layer.

It is not a speech-provider choice and not runtime audio generation code. It is the policy and schema target for future speech service implementation, presentation rendering, media validation, token receipts, privacy handling, and regression fixtures.

## Core Invariant

Speech and presentation are rendering layers, not source authorities.

The service may make an answer easier to hear, scan, narrate, or storyboard, but it cannot change source routes, claim labels, proof status, unsupported-answer behavior, or System Card routing. If presentation needs a summary, analogy, simplification, or alternate explanation, that must be a separate manifest artifact with its own source and claim context.

Speech and presentation artifacts inherit `source_context` produced under [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md). The speech layer must not reconstruct source authority from audio-provider output, narration style, voice quality, or animation framing.

If narration scripts, comparison scripts, storyboards, transcripts, or future audio artifacts are saved, retention, export, deletion, and not-project-evidence behavior must follow [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md).

Generated speech, transcripts, captions, scripts, and storyboards must also respect generated-media terms, privacy notices, token terms, saved-notebook terms, and legal-review state under [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md).

## Supported V1 Presentation Surfaces

V1 may support these surfaces:

| Surface | Contract |
| --- | --- |
| answer audio | High-quality service-native speech from `answer_body.verbatim_segments`. |
| sphere-initiated audio | High-quality speech for the markdown portion associated with the selected sphere. |
| full-document sphere audio | High-quality speech for the full document only when initiated from a full-document sphere. |
| displayed verbatim text | The exact text being spoken, visible during playback. |
| captions/transcripts | Text parity for spoken content and accessibility review. |
| narration script | Source/claim-preserving script for a spoken explainer. |
| comparison script | Structured spoken comparison that preserves local/external source separation. |
| animation storyboard | Scene beats, captions, and source basis for future animation. |

Browser or operating-system read-aloud may remain a compatibility fallback, but it is not the product target and should not define the service contract.

## Deferred Surfaces

The following are deferred until separate policy and implementation contracts exist:

1. speech input;
2. real-time animated avatars;
3. lip-synced characters;
4. user-selected character personas;
5. persistent presentation-style memory;
6. finished generated video;
7. presentation-led public actions;
8. real-person voice imitation;
9. authority-implying voice identity.

Deferred surfaces should fail closed or return a compliant script/storyboard alternative.

## Speech Source Text

V1 speech has one source of truth: displayed text.

Required rules:

1. `answer_body.verbatim_segments` is the only source for answer audio.
2. Sphere-initiated audio uses only the markdown portion associated with the selected sphere.
3. Full-document audio is allowed only from a full-document sphere.
4. `speech_sync.source_text_segments` must reference displayed segment ids.
5. Timed segments must cover the spoken content.
6. Captions/transcripts must match the spoken content.
7. The audio artifact may not silently speak a summary, simplification, or alternate explanation.

If the service wants a shorter or simpler spoken artifact, it should first create a separate narration script artifact and then speak that script with its own source and claim context.

## Speech Sync Shape

The `speech_sync` object should include:

| Field | Requirement |
| --- | --- |
| `speech_sync_id` | Stable id referenced by audio artifacts. |
| `source_text_segments` | Segment ids from displayed text. |
| `timed_segments` | Segment id, displayed text, start time, end time, and optional word timing. |
| `caption_track` | Caption or transcript payload. |
| `quality_policy` | Must be `high_quality_only`. |
| `fallback_policy` | Must be `text_only_if_high_quality_unavailable`. |
| `voice_identity_policy` | No real-person imitation, no endorsement framing, no proof-authority framing. |
| `playback_controls` | V1 requires play/pause; voice and speed controls are deferred. |
| `retention_state` | Audio ephemeral by default. |
| `token_work_unit` | `high_quality_speech` only when valid speech exists. |

Audio without a valid `speech_sync` object should be refused or removed before rendering.

## Quality And Fallback Policy

V1 speech is high-quality only.

Allowed:

1. high-quality generated speech synchronized with displayed verbatim text;
2. text-only fallback when high-quality speech is unavailable;
3. narration script without generated audio;
4. storyboard or caption plan when finished animation/video is unavailable.

Disallowed:

1. medium-quality or low-quality speech tiers;
2. unsynchronized audio;
3. audio without captions/transcripts;
4. audio that speaks hidden text;
5. audio that changes claim labels or proof status;
6. audio that charges for omitted low-quality fallback.

If high-quality speech, synchronization, captions, privacy, or token constraints fail, the compliant fallback is text-only display with no speech charge.

## Voice Identity Policy

The voice should be pleasant and clear without implying a character identity or external endorsement.

Rules:

1. no real-person voice imitation;
2. no celebrity, famous physicist, critic, author, or operator imitation;
3. no endorsement framing;
4. no proof-authority framing;
5. no persona picker in V1;
6. no persistent voice/personality memory in V1;
7. no voice claims that imply Archie is a theorem witness, institution, lab, or external authority.

The listener may infer character from a voice, so the product should choose restrained neutral narration and keep source/claim chips visible.

## Presentation Artifacts

Presentation artifacts are allowed when they make content easier to understand and remain source-bound.

| Artifact | Required fields |
| --- | --- |
| `narration_script` | `script_text`, source routes, claim label, intended audience, caption text, no proof upgrade. |
| `comparison_script` | Local claim, external comparison, recovery target, open burden, citations, source separation. |
| `animation_storyboard` | Scene beats, captions, source basis, claim label, visual purpose, accessibility text. |
| `caption_track` | Text parity with spoken or animated material. |
| `transcript` | Text parity with generated audio. |

Animation storyboards and narration scripts may be returned before video support exists. Finished generated video remains deferred until video policy, token behavior, retention behavior, accessibility, and source-authority guardrails are defined.

## Token And Privacy Dependencies

Speech and presentation must follow [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md).

Rules:

1. high-quality speech is metered by output length, provider cost, synchronization work, caption/transcript work, and ephemeral audio handling;
2. the UI interrupts only when the request exceeds configured limits, triggers auto-fund, or changes privacy/retention behavior;
3. no charge for low-quality or omitted speech fallback;
4. generated audio is ephemeral in the MVP;
5. narration scripts and storyboards are ephemeral unless saved under an explicit policy;
6. durable saves require consent, retention policy, deletion route, and storage-cost policy.

## Accessibility Contract

Speech and presentation artifacts should be accessible by default.

Required:

1. captions or transcript parity for audio;
2. displayed verbatim text during playback;
3. basic play/pause controls;
4. source and claim labels visible while listening;
5. captions for animation storyboards;
6. alt text or caption support for visual storyboard frames when practical;
7. text-only fallback when audio cannot satisfy accessibility requirements.

Voice-selection and speed controls may be useful later, but they are not V1 launch requirements.

## Fail-Closed Behavior

Speech and presentation should fail closed when:

1. high-quality speech is unavailable;
2. synchronized displayed text is unavailable;
3. captions/transcripts cannot be produced;
4. voice identity policy fails;
5. source or claim context is missing;
6. token cap or auto-fund confirmation is missing;
7. privacy or retention state is unresolved;
8. requested artifact implies proof, endorsement, or authority;
9. requested artifact requires deferred avatar, persona, or video support.

Fail-closed behavior should return text-only display, narration script, storyboard plan, or refusal as appropriate, with no low-quality speech fallback.

## Regression Fixtures

The future implementation should include speech/presentation fixtures for:

| Fixture | Required proof |
| --- | --- |
| `speech-answer-high-quality-001` | Answer audio is high-quality, synchronized, captioned, ephemeral, and source/claim preserving. |
| `speech-answer-fallback-001` | High-quality speech unavailable returns text-only fallback and no speech charge. |
| `speech-unsynchronized-negative-001` | Audio without displayed verbatim text is refused or changed to text-only. |
| `speech-hidden-summary-negative-001` | Audio cannot secretly speak a summary instead of displayed text. |
| `speech-sphere-portion-001` | Sphere-initiated audio covers only the associated markdown portion. |
| `speech-full-document-001` | Full-document audio runs only from a full-document sphere. |
| `speech-real-person-negative-001` | Real-person voice imitation is refused. |
| `speech-authority-negative-001` | Voice identity cannot imply proof authority or endorsement. |
| `presentation-narration-script-001` | Narration script preserves source routes, claim label, captions, and audience level. |
| `presentation-comparison-script-001` | Comparison script separates local claim, external source, recovery target, and open burden. |
| `presentation-storyboard-001` | Storyboard includes scene beats, captions, source basis, claim label, and no proof overclaim. |
| `presentation-video-deferred-001` | Finished video request returns storyboard/caption plan until video policy exists. |
| `presentation-accessibility-001` | Audio/storyboard artifacts include captions/transcripts or text-only fallback. |
| `presentation-token-privacy-001` | Speech/presentation respects token caps, ephemeral audio, and no durable retention without consent. |

## Implementation Handoff

Closure goal:
Turn the Service-Native Speech And Presentation Contract into speech-sync schemas, provider-agnostic speech service boundaries, presentation artifact schemas, accessibility checks, voice-identity guardrails, token/privacy checks, and regression fixtures.

Use this packet, [answer-artifact-manifest.md](answer-artifact-manifest.md), [manifest-service-contracts.md](manifest-service-contracts.md), [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md), [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md), [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md), [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md), [corporate-media-standards.md](corporate-media-standards.md), and [v1-product-requirements.md](v1-product-requirements.md) as the source of truth.

Task:
- Encode `speech_sync` and audio artifact schemas.
- Define answer audio, sphere-portion audio, and full-document audio boundaries.
- Define narration script, comparison script, caption/transcript, and storyboard artifact schemas.
- Add high-quality-only, synchronized-text, accessibility, voice-identity, token, and privacy validators.
- Add fixtures for high-quality answer speech, text-only fallback, unsynchronized audio refusal, hidden-summary refusal, sphere-portion audio, full-document audio, real-person voice refusal, authority-framing refusal, narration scripts, comparison scripts, storyboards, video deferral, accessibility, and token/privacy behavior.

Constraints:
- Do not offer medium-quality or low-quality speech tiers.
- Do not generate audio without synchronized displayed verbatim text.
- Do not imitate real people or imply endorsement/proof authority.
- Do not retain generated audio durably in the MVP.
- Do not let speech, narration, or storyboards alter source authority, claim labels, citations, or unsupported-answer behavior.
- Do not add runtime speech generation, provider credentials, deployment config, or public launch behavior unless explicitly requested.
