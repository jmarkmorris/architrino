# Service Terms And Account Policy Contract

## Workstream Metadata

- Kind: `priority-contract`
- Status: `draft`
- Claim level: `priority-only`
- Parent priority: [Archie](priorities.md)
- Public legal terms: [Legal Terms](../../../../content/markdown/aaa/archie/legal-terms.md)
- Answer artifact manifest: [answer-artifact-manifest.md](answer-artifact-manifest.md)
- Manifest-driven service architecture: [manifest-driven-service-architecture.md](manifest-driven-service-architecture.md)
- Manifest service contracts: [manifest-service-contracts.md](manifest-service-contracts.md)
- Model/provider capability registry contract: [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md)
- Token ledger and privacy contract: [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md)
- Observability, public status, and incident contract: [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md)
- Action broker confirmation contract: [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md)
- Saved notebook and account history contract: [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md)
- Issue mining signal contract: [issue-mining-signal-contract.md](issue-mining-signal-contract.md)
- Generated media corporate standard: [corporate-media-standards.md](corporate-media-standards.md)
- V1 product requirements: [v1-product-requirements.md](v1-product-requirements.md)
- Service platform owner: [Archie Service Platform](service-platform.md)

## Purpose

This packet defines the service terms and account policy contract for the future token-based Archie question service.

The public [Legal Terms](../../../../content/markdown/aaa/archie/legal-terms.md) page already states the general project posture: MIT license, good-faith publication, no warranty, use at your own risk, generated media as explanatory artifacts, and professional public conduct. The hosted Archie service needs a narrower account-service layer on top of that baseline because it may add tokens, subscriptions, auto-fund, account history, saved notebooks, generated media, public GitHub handoff, support routes, and abuse controls.

This packet is not final legal language and is not legal advice. It is the product and platform contract that future legal copy, UI notices, validators, receipts, account surfaces, and launch gates must satisfy before a paid or authenticated Archie service ships.

## Core Invariant

Service terms govern use of the service, not truth of the theory.

Accepting terms, paying for tokens, using auto-fund, saving a notebook item, generating media, or filing a GitHub issue must not strengthen source authority, claim labels, proof status, validation status, or unsupported-answer behavior. The service terms make user rights, obligations, costs, retention, public destinations, support routes, and remedies clear; they do not make any answer more correct.

## Required Terms Surfaces

The hosted service should expose these user-facing surfaces before public beta:

| Surface | Requirement |
| --- | --- |
| `public_legal_terms` | Link to the existing public Legal Terms page for MIT license, good-faith posture, no warranty, and use-at-your-own-risk language. |
| `service_terms` | Hosted-service terms covering accounts, acceptable use, generated outputs, tokens, subscriptions, public handoff, support, and changes. |
| `privacy_retention_notice` | Plain-language notice for prompts, answers, speech, generated media, uploads, logs, diagnostics, saved notebooks, account history, deletion, and export. |
| `provider_data_use_notice` | Provider-backed feature notice covering what data can be sent to a model provider, provider retention/abuse-review limits when known, no browser-side secrets, and provider terms dependencies. |
| `token_subscription_terms` | Token grants, paid top-ups, auto-fund, caps, refunds, expiration or rollover, cancellation, failed payment, and billing support policy. |
| `generated_media_terms` | User-facing statement that generated media is explanatory, source-labeled, policy-bound, and not proof, advice, endorsement, or a guarantee. |
| `github_handoff_notice` | GitHub login, public visibility, included material, destination, deletion limits, project-use terms, and issue-mining metadata disclosure. |
| `saved_notebook_terms` | Durable save, account history, submitted issue-link retention, deletion, export, sharing, storage cost, and not-project-evidence rules. |
| `support_refund_route` | Contact or support path for billing, token, refund, privacy, deletion, export, issue handoff, and account problems. |
| `abuse_and_rate_limit_policy` | Service limits, misuse rules, credential boundaries, automated abuse controls, and account restriction behavior. |
| `status_incident_notice` | Public status, incident, support-summary, diagnostics-redaction, and change-history disclosure boundaries. |
| `terms_change_notice` | Versioned terms change policy and when re-acceptance is required. |

Public beta should not launch if any required surface is missing, unreachable, stale, or inconsistent with the token ledger, action broker, privacy, notebook, generated-media, or issue-mining contracts.

## Terms Acceptance State

The service should track terms acceptance as an account/session state that validators can read without storing private prompt text.

Required fields:

| Field | Requirement |
| --- | --- |
| `terms_version` | Version of service terms accepted or required. |
| `privacy_notice_version` | Version of privacy/retention notice accepted or required. |
| `provider_terms_version` | Version of provider data-use or provider-backed feature terms accepted or required. |
| `token_terms_version` | Version of token/subscription terms accepted or required. |
| `media_terms_version` | Version of generated-media terms accepted or required. |
| `github_handoff_notice_version` | Version accepted before issue handoff. |
| `notebook_terms_version` | Version accepted before durable notebook or account-history features. |
| `accepted_at` | Timestamp or null for the current version. |
| `acceptance_scope` | `anonymous_session`, `account`, `billing`, `notebook`, `github_handoff`, or `operator_developer`. |
| `reacceptance_required` | Whether a changed term blocks a feature until user action. |
| `feature_blockers` | Terms-dependent features currently unavailable. |
| `legal_review_state` | `draft`, `counsel_required`, `approved_for_beta`, or `approved_for_public`. |

Receipts, diagnostics, and support summaries may reference safe ids and terms versions. They should not expand private prompt text.

## Token And Subscription Terms

The token wallet must have user-visible economic terms before paid use.

Required policy decisions:

1. what a token represents in user-facing terms;
2. whether free, subscription, top-up, promotional, or collaborator tokens differ;
3. whether tokens expire, roll over, or reset;
4. whether unused paid tokens are refundable, non-refundable, or refundable only under defined support conditions;
5. how failed payments, chargebacks, subscription cancellation, downgrades, and plan changes affect balances;
6. how monthly spending limits, per-request caps, and auto-fund caps are changed;
7. when an estimate must be shown before work;
8. when attempted-provider work may be charged after a downstream refusal;
9. whether taxes, payment processor terms, or regional payment limits are delegated to a payment provider;
10. how billing support and refund requests are filed.

Default product stance:

- normal work should run inside user-configured limits without constant prompts;
- auto-fund requires explicit opt-in and a cap;
- refunds return unused holds automatically;
- refused unsafe media, unavailable high-quality speech, unconfirmed issue handoff, and privacy actions with a Not advanced disposition should not charge by default;
- payment may buy tokens, caps, storage quota, or longer history, but never source authority or proof status.

## Privacy And Retention Terms

The privacy/retention notice must match [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md) and [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md).

The notice must disclose:

1. whether prompt text is stored, redacted, minimized, or ephemeral;
2. whether answer text is stored by default;
3. whether source misses, errors, usage events, diagnostics, and token transactions are retained;
4. whether provider-backed features send request text, source snippets, transcripts, generated-media prompts, or metadata to a provider;
5. whether generated speech audio, transcripts, images, diagrams, scripts, storyboards, and future media are ephemeral or durable;
6. whether uploaded screenshots, images, documents, or app-state snapshots are disabled, ephemeral, or retained;
7. whether account history stores safe summaries, full text, action history, token receipts, or submitted issue links;
8. how users delete durable saved content;
9. how users export durable saved content;
10. what cannot be deleted locally because it is public, external, billing-required, abuse-control-required, or provider-retained;
11. what operator/developer diagnostics, support summaries, public status, incident records, and change history can contain.

If the service cannot state retention behavior for a feature, that feature should be unavailable.

## Generated Media Terms

Generated text, audio, images, diagrams, narration scripts, storyboards, captions, transcripts, alt text, and future media must follow [corporate-media-standards.md](corporate-media-standards.md).

The service terms must state that generated media:

1. is an explanatory artifact, not evidence by itself;
2. inherits the same source context and claim label as the answer;
3. may be wrong, incomplete, stale, or unsuitable for the user's intended use;
4. must not be used to mislead, impersonate, harass, violate privacy, violate rights, fake endorsement, fake proof, or fake diagnostics;
5. may depend on provider terms for generation and storage;
6. may require user consent before private user material is included;
7. may require human review before publication-asset use.

The terms must not promise exclusive rights, publication readiness, diagnostic correctness, likeness permission, or proof status for generated media unless a separate reviewed policy supports that promise.

Provider-backed generated media should remain unavailable when the provider capability lacks a current provider data-use notice, provider terms state, credential boundary, token cost class, moderation gate, or fallback behavior.

## GitHub Issue Handoff Terms

GitHub issue handoff must follow [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md) and [issue-mining-signal-contract.md](issue-mining-signal-contract.md).

Before opening or submitting a public issue path, the service must disclose:

1. GitHub login may be required;
2. the issue destination is external to the Archie service;
3. public issue text may be visible, indexed, quoted, copied, and retained outside the user's Archie account;
4. deleting local account history does not delete a public GitHub issue;
5. exact user-provided material included in the issue body;
6. source context, claim label, and issue-mining metadata included in the issue body;
7. whether submitted public issue metadata may be mined for duplicate clusters, signal reports, and fix queues;
8. contribution or project-use terms for public feedback, subject to legal review.

Private prompts, uploaded media, saved notes, and unsubmitted issue drafts must not be included in public GitHub text without explicit confirmation.

## Account, Notebook, And History Terms

Durable account features must follow [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md).

Required policy decisions before launch:

1. minimum account fields required for billing and abuse controls;
2. whether anonymous session use is allowed;
3. what history is created automatically;
4. what history requires opt-in;
5. storage quota or storage-token model;
6. deletion route for durable notebook items;
7. export format and scope;
8. share-link availability and revocation behavior;
9. submitted issue-link retention;
10. support route for account data problems.

Private saved notes, account history, generated media, and unsubmitted issue drafts are not project evidence unless separately promoted through a public/project review path.

## Acceptable Use And Abuse Controls

The service terms should cover misuse without weakening source-grounding duties.

Disallowed use should include:

1. attempts to bypass spending limits, rate limits, or credential boundaries;
2. harassment, impersonation, privacy violation, rights violation, or public deception;
3. requests to create illegal, exploitative, deceptive, or public-unsuitable media;
4. attempts to present generated output as proof, professional advice, endorsement, or official validation;
5. automated issue spam, vague mass filing, or public feedback abuse;
6. credential theft, prompt-log extraction, private-data extraction, or model/provider abuse.

The service may rate-limit, refuse, suspend, or require additional confirmation for abuse-risk behavior. Abuse controls must still preserve the unsupported-answer, privacy, receipt, and action-confirmation contracts.

## Verification Required for Advancement

The service should not advance when:

1. service terms are missing or stale for a paid/account feature;
2. token/subscription terms are missing for a token-bearing paid action;
3. privacy/retention notice is missing for retained or uploaded material;
4. generated-media terms are missing for media output;
5. provider data-use notice or provider terms state is missing for a provider-backed feature;
6. GitHub handoff notice is missing for public issue actions;
7. notebook/account-history terms are missing for durable save, export, sharing, or account history;
8. legal review state is not sufficient for the requested public beta surface;
9. terms acceptance state is unknown for a feature that requires acceptance;
10. public status, support summary, or incident disclosure would exceed the approved privacy/status notice;
11. a terms change requires re-acceptance.

Behavior for a Not advanced disposition should return a clear unavailable action, reduced-scope response, text-only answer, draft-only note, or confirmation-required state. It should not silently charge, retain, publish, open GitHub, share content, or generate media under missing terms.

## Regression Fixtures

The future implementation should include service-terms fixtures for:

| Fixture | Required proof |
| --- | --- |
| `terms-public-link-001` | Service surfaces link to public Legal Terms and service-specific terms. |
| `terms-token-missing-negative-001` | Paid token work is blocked when token/subscription terms are missing. |
| `terms-autofund-confirm-001` | Auto-fund requires accepted token terms and explicit capped consent. |
| `terms-refund-receipt-001` | Receipt states hold, charge, refund, and terms version without private prompt text. |
| `terms-privacy-retention-negative-001` | Retained prompt/media/account-history feature is blocked when privacy notice is missing. |
| `terms-provider-data-use-negative-001` | Provider-backed feature is blocked when provider data-use notice, provider terms state, or credential boundary is missing. |
| `terms-media-negative-001` | Generated media is blocked or reduced when generated-media terms are missing. |
| `terms-github-handoff-001` | Public issue handoff shows GitHub login, public visibility, included material, and deletion limits. |
| `terms-notebook-negative-001` | Durable notebook/account-history action is blocked when notebook terms are missing. |
| `terms-reacceptance-001` | Changed terms block affected paid/durable/public features until re-accepted. |
| `terms-proof-authority-negative-001` | Payment, terms acceptance, saved history, or public issue filing cannot upgrade claim labels or proof status. |
| `terms-support-route-001` | Billing, refund, deletion, export, issue handoff, and account problems expose a support route. |
| `terms-status-incident-negative-001` | Public status, support summary, or incident disclosure is blocked when status/incident notice or privacy notice is missing. |
| `terms-counsel-review-negative-001` | Public beta is blocked while legal review state remains `draft` or `counsel_required`. |

## Implementation Handoff

Closure goal:
Turn the Service Terms And Account Policy Contract into terms-version schemas, account acceptance validators, service-term launch gates, token/subscription disclosures, privacy/retention disclosures, public issue notices, and regression fixtures for the Archie service.

Use this packet, [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md), [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md), [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md), [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md), [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md), [issue-mining-signal-contract.md](issue-mining-signal-contract.md), [corporate-media-standards.md](corporate-media-standards.md), [v1-product-requirements.md](v1-product-requirements.md), and the public [Legal Terms](../../../../content/markdown/aaa/archie/legal-terms.md) page as the source of truth.

Task:
- Define service terms, privacy notice, provider data-use notice, token/subscription terms, generated-media terms, GitHub handoff notice, saved-notebook/account-history terms, support route, status/incident notice, abuse policy, and terms-change notice.
- Encode terms acceptance state, version fields, re-acceptance requirements, feature blockers, and legal review state.
- Add validators that block paid, durable, retained, public, provider-backed, generated-media, and credentialed actions when required terms are missing or stale.
- Add token/subscription fixtures for auto-fund, refund, cancellation, failed payment, cap changes, and no-proof-authority behavior.
- Add privacy, GitHub handoff, generated-media, notebook/account-history, support-route, status/incident, and counsel-review fixtures.

Constraints:
- Do not present this packet as final legal advice or final legal copy.
- Do not change the MIT license, public Legal Terms page, payment implementation, account implementation, runtime code, or public launch state unless explicitly requested.
- Do not let payment, acceptance, saved history, or public issue submission change claim labels or proof status.
- Preserve private prompt and user-material boundaries from the token, action, notebook, and issue-mining contracts.
