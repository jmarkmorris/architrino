# Issue Mining Signal Contract

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
- Token ledger and privacy contract: [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md)
- Observability, public status, and incident contract: [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md)
- Action broker confirmation contract: [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md)
- Saved notebook and account history contract: [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md)
- Service terms and account policy contract: [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md)
- AI communication standards: [ai-communication-standards.md](ai-communication-standards.md)
- V1 product requirements: [v1-product-requirements.md](v1-product-requirements.md)
- Service platform owner: [Archie Service Platform](service-platform.md)

## Purpose

This packet defines the issue-mining signal contract for the future Archie question service.

The interface can draft and hand off GitHub issues, but that is only useful if the project can mine the resulting stream for recurring signal, separate signal from noise, and route fixes to owners. This contract defines the input metadata, clustering rules, signal report shape, noise dispositions, owner lanes, and privacy boundaries for that loop.

It is not GitHub automation code. It is the policy and data-contract target for future issue report generation, triage dashboards, owner-routed fix queues, and regression fixtures.

## Core Invariant

Issue mining should use public issue metadata and safe manifest metadata, not private prompt text.

The mining loop can cite representative public issues, aggregate safe fields, and route fix queues. It cannot reconstruct private prompts, treat issue volume as proof, promote priority-only claims, or turn unsupported user proposals into established $\mathbb{A}\mathbb{A}\mathbb{A}$ claims.

## User-Facing Issue Language

Issue previews, handoff notices, and mining disclosures must follow [ai-communication-standards.md](ai-communication-standards.md).

The user-facing copy should say:

1. review the issue preview before anything is posted publicly;
2. GitHub issue text is public after submission;
3. included material, source routes, claim label, and proposed labels are visible before handoff;
4. private prompt text, private media, private notes, and account history are excluded unless a separate explicit consent path applies;
5. public issue metadata may be used later to find repeated issues, route fixes, and distinguish signal from noise;
6. issue volume does not prove a scientific claim or change source authority.

Terms such as `issue_mining_context`, duplicate keys, owner lane, fixture candidate, observability ref, fixture, or validator should remain in schemas, reports, diagnostics, and operator/developer-facing triage. They should not be required for a user to understand what will be public or how feedback may be used.

## Mining Inputs

The mining pipeline should consume these safe inputs. Source routes, source-index candidates, and missing-route signals should come from the validated `source_context` defined in [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md).

| Input | Purpose |
| --- | --- |
| `issue_url` | Public issue link or submitted issue id. |
| `issue_title` | Public title for clustering and representative examples. |
| `issue_body_public` | Public issue body after user confirmation. |
| `labels` | GitHub labels or body metadata. |
| `origin_mode` | Archie mode that produced the draft or feedback. |
| `origin_surface` | Page, app, scene, document, sphere, or route where the issue started. |
| `source_routes` | Source routes attached to the answer or issue draft. |
| `claim_label` | Claim label visible when the issue was drafted. |
| `user_category` | User-selected bug, idea, source confusion, app issue, proof burden, accessibility issue, or other category. |
| `duplicate_keys` | Route, app id, source id, error class, topic id, concept id, or fixture id. |
| `privacy_inclusion` | Included, excluded, redacted, or consented material state. |
| `token_receipt_id` | Optional safe receipt id for cost/support review. |
| `observability_refs` | Optional safe event, error-class, validator-disposition, or incident refs from the observability contract. |
| `smallest_next_artifact` | Definition, equation, simulation target, source packet, app mockup, validation fixture, or issue. |

Private prompt text, uploaded user media, account history, private conversation excerpts, and unsubmitted drafts are excluded unless a separate consent and retention policy explicitly allows their use.

Issue submission and public handoff confirmation should follow [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md). Issue mining should treat unconfirmed drafts as excluded unless account policy and consent explicitly allow retention.

Operational signal handoff should follow [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md). Safe error classes, validator dispositions, provider capability ids, fallback classes, public incident ids, and source-miss classes may support clustering; private prompt text and raw logs remain excluded.

Saved notebook and account history behavior should follow [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md). Private saved notes, account history, and session-local drafts are not issue-mining evidence by default.

GitHub handoff notices, public-feedback-use terms, issue-mining disclosure, and support routes should follow [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md). If the GitHub handoff notice or issue-mining disclosure is missing or stale, public issue handoff and issue-mining metadata retention should not advance.

## Cluster Model

An issue cluster is a group of issues that appear to describe the same underlying problem, confusion point, request, or proof burden.

Required cluster fields:

| Field | Requirement |
| --- | --- |
| `cluster_id` | Stable id for the recurring issue group. |
| `cluster_title` | Short human-readable title. |
| `cluster_type` | `bug`, `source_gap`, `reader_confusion`, `unsupported_answer_gap`, `app_usability`, `proof_burden`, `accessibility`, `new_proposal`, `operations`, or `noise`. |
| `frequency` | Count of matching issues in the report window. |
| `first_seen` | First public issue date in the cluster. |
| `last_seen` | Most recent public issue date in the cluster. |
| `affected_surfaces` | Routes, apps, scenes, documents, or modes affected. |
| `source_routes` | Source routes implicated by the cluster. |
| `claim_labels` | Claim labels observed across matching issues. |
| `representative_issues` | Small public issue-link sample. |
| `duplicate_keys` | Keys that caused or supported grouping. |
| `privacy_state` | Confirmation that private prompt text was not used. |

Clusters may be manually corrected. Corrections should record the reason so future mining does not keep repeating the same mistaken grouping.

## Signal Scoring

Signal score should combine frequency, severity, reproducibility, source impact, and owner clarity.

Required fields:

| Field | Values |
| --- | --- |
| `severity` | `critical`, `high`, `medium`, `low`, `info` |
| `frequency_band` | `single`, `repeated`, `common`, `surging` |
| `confidence` | `high`, `medium`, `low` |
| `user_impact` | `blocks_task`, `causes_confusion`, `slows_task`, `minor_polish`, `not_actionable` |
| `source_impact` | `source_authority`, `published_corpus`, `priority_material`, `app_guide`, `service_platform`, `none` |
| `fix_readiness` | `ready`, `needs_reproduction`, `needs_public_reproduction`, `needs_source_decision`, `needs_design`, `needs_proof_work`, `defer`, `close_as_noise` |

High frequency alone is not proof of importance. A single severe privacy, billing, source-authority, or public-action issue can outrank many vague comments.

## Noise Classes

Noise should be tracked explicitly so it does not dominate fix queues.

Allowed noise classes:

1. `spam`;
2. `duplicate_without_new_signal`;
3. `vague_feedback`;
4. `unsupported_theory_assertion`;
5. `non_actionable_reaction`;
6. `out_of_scope_request`;
7. `private_material_without_consent`;
8. `abuse_or_harassment`;
9. `already_fixed`;
10. `wrong_surface`.

Noise classification should not delete evidence silently. Representative public links can be kept, but private prompt text and unconsented user material remain excluded.

## Owner Lanes

Every actionable cluster should route to one primary owner lane.

| Owner lane | Use when |
| --- | --- |
| `app_runtime` | UI, controls, rendering, app state, browser behavior, or runtime bug. |
| `corpus_documentation` | Published corpus wording, missing explanation, glossary drift, reading path, or source-route clarity. |
| `source_authority_policy` | Claim label, priority visibility, System Card routing, unsupported-answer behavior, or source-class confusion. |
| `service_platform` | Backend, credentials, privacy, token ledger, observability, deployment, or rate limits. |
| `media_policy` | Generated audio, image, diagram, storyboard, caption, alt text, or corporate media standard behavior. |
| `issue_ops` | GitHub handoff, labels, duplicate clustering, report generation, or triage process. |
| `proof_corpus_priority` | Definition, equation, simulation target, proof burden, or source-mining packet. |
| `accessibility` | Captions, transcripts, keyboard behavior, screen-reader flow, contrast, motion, or audio accessibility. |
| `operations` | Abuse controls, incidents, monitoring, account support, billing support, or release procedure. |

If ownership is ambiguous, the cluster should route to `issue_ops` with a required owner-decision action rather than being left unowned.

## Signal Report Shape

The mining loop should produce a periodic signal report.

Required report fields:

| Field | Requirement |
| --- | --- |
| `report_id` | Stable report id. |
| `report_window` | Date range covered. |
| `generated_at` | Report generation timestamp. |
| `source_issue_query` | Public GitHub query or issue set used. |
| `clusters` | Ordered cluster summaries. |
| `noise_summary` | Count by noise class and representative public examples. |
| `top_fix_queues` | Owner-routed actionable queues. |
| `regression_fixture_candidates` | Issues that should become fixtures. |
| `source_index_candidates` | Missing or stale source routes to repair. |
| `documentation_candidates` | Corpus or app-guide updates suggested by issue signal. |
| `proof_priority_candidates` | Proof or corpus priority work suggested by recurring signal. |
| `privacy_statement` | Confirmation of excluded private prompt/user media handling. |

The report should lead with actionable clusters, not raw issue counts. Each actionable cluster should include a recommended next action and owner lane.

## Fix Queue Record

Each owner-routed fix queue entry should be small enough to act on.

Required fields:

| Field | Requirement |
| --- | --- |
| `queue_id` | Stable id for the fix queue item. |
| `owner_lane` | One primary owner lane. |
| `cluster_ids` | Linked issue clusters. |
| `recommended_action` | Fix, document, add fixture, source-index repair, proof-priority packet, defer, or close. |
| `smallest_next_artifact` | Concrete next artifact to create or edit. |
| `acceptance_evidence` | How completion should be proven. |
| `representative_issues` | Public issue links. |
| `severity` | Severity inherited or adjusted from cluster scoring. |
| `privacy_safe` | Whether the record excludes private prompt/user media. |

Fix queues should avoid vague actions such as "look into this." They should name the smallest next artifact that can resolve or advance the cluster.

## Privacy And Consent

Issue mining must follow [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md).

Rules:

1. public issue text may be mined because the user confirmed GitHub handoff;
2. private prompt text is excluded by default;
3. unsubmitted issue drafts are excluded unless account policy and user consent allow retention;
4. uploaded media, screenshots, private notes, and personal details require explicit inclusion consent;
5. receipts may be linked by safe receipt id but must not expand prompt text;
6. diagnostics should remain redacted and operator/developer-safe.
7. GitHub handoff notices and issue-mining disclosures must be current before public issue metadata is retained for mining.
8. observability refs should remain safe ids/classes and should not include private prompts, raw provider payloads, account history, or private saved notes.

If a cluster cannot be understood without private prompt text, the report should mark it `needs_public_reproduction` rather than exposing private data.

## Regression Fixtures

The current schema-only service scaffold includes [issue-mining-sandbox.v1.json](../../../../tests/archie-service/fixtures/issue-mining/issue-mining-sandbox.v1.json) and [validate-issue-mining-sandbox.mjs](../../../../scripts/archie-service/validate-issue-mining-sandbox.mjs). These fixtures cover manifest-derived issue signals, unsubmitted draft exclusion, unsupported source gaps, private-material exclusion, stale-terms blocks, ambiguous owner routing, source-authority fixture candidates, safe receipt id linkage, action-preflight inheritance, report clusters, noise summaries, owner fix queues, no hidden GitHub writes, and no private prompt expansion.

The future implementation should include issue-mining fixtures for:

| Fixture | Required proof |
| --- | --- |
| `mining-duplicate-route-001` | Issues with the same route/topic duplicate keys cluster together. |
| `mining-recurring-confusion-001` | Repeated reader confusion produces a corpus documentation queue item. |
| `mining-unsupported-gap-001` | Unsupported-answer gaps route to source-authority policy or proof/corpus priority work. |
| `mining-app-usability-001` | App usability reports route to app runtime with representative issues. |
| `mining-noise-spam-001` | Spam or vague feedback is classified as noise and excluded from fix queues. |
| `mining-private-exclusion-001` | Private prompt text is not included in clusters, reports, or fix queues. |
| `mining-terms-negative-001` | Public issue handoff and mining metadata retention are blocked when required GitHub handoff notice or issue-mining disclosure is missing. |
| `mining-owner-ambiguous-001` | Ambiguous ownership routes to issue ops with owner-decision action. |
| `mining-fixture-candidate-001` | Reproducible issue generates a regression fixture candidate. |
| `mining-source-index-001` | Missing source route reports generate a source-index repair candidate. |
| `mining-observability-handoff-001` | Safe operational refs support clustering without private prompt text or raw logs. |
| `mining-report-shape-001` | Periodic report includes clusters, noise summary, owner queues, recommended actions, and privacy statement. |

## Implementation Handoff

Closure goal: Connect issue-mining clusters, noise summaries, fix queues, and action-broker result classes into observability/public-status metadata while preserving private-prompt exclusion and no hidden writes.

Use this packet, [answer-artifact-manifest.md](answer-artifact-manifest.md), [ai-communication-standards.md](ai-communication-standards.md), [manifest-service-contracts.md](manifest-service-contracts.md), [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md), [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md), [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md), [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md), [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md), [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md), and [v1-product-requirements.md](v1-product-requirements.md) as the source of truth.

Task:
- Define observability metadata that consumes issue-mining cluster ids, queue ids, noise summaries, safe issue links, and action-broker result classes.
- Verify public-status and incident metadata exclude private prompt text, raw logs, raw provider payloads, account history, private saved notes, hidden GitHub writes, and source-authority effects.
- Keep GitHub writes, GitHub credentials, durable storage, private prompt text, raw logs, raw provider payloads, account history, private saved notes, deployment config, and public launch behavior disabled.

Constraints:
- Use public issue links and safe manifest metadata as evidence.
- Do not mine private prompt text by default.
- Do not mine raw logs, raw provider payloads, account history, or private saved notes by default.
- Do not treat issue volume as proof or launch readiness.
- Do not promote user proposals into corpus claims.
- Do not add GitHub automation, credentials, deployment config, or public launch behavior unless explicitly requested.
