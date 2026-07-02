# Archie Interface V1 Product Requirements

## Workstream Metadata

- Kind: `priority-app-requirements`
- Status: `draft`
- Claim level: `priority-only`
- Parent priority: [Archie Interface App](app-archie-interface.md)
- Brainstorming source: [brainstorming.md](brainstorming.md)
- Service platform owner: [Archie Service Platform](../archie/service-platform.md)
- Assistant behavior contract: [assistant-mode-contract.md](../archie/assistant-mode-contract.md)

## Purpose

This packet converts the Archie interface brainstorming into a v1 product requirements contract.

The v1 objective is a source-grounded text-first question service for $\mathbb{A}\mathbb{A}\mathbb{A}$ readers. It should help users ask questions, find corpus sources, understand claim levels, draft diagrams, and prepare issue drafts without launching autonomous actions or presenting priority-only work as established corpus material.

This packet is not a runtime implementation plan. It defines the product boundary that the future service-platform design must satisfy before any public beta.

## V1 Product Goal

Build a public beta that proves three things:

1. readers can ask useful questions and receive source-grounded answers;
2. the interface can expose claim level, source class, System Card routing, and unsupported-answer behavior without becoming cumbersome;
3. the interface can meter meaningful work through a visible token wallet clearly enough to support a subscription service.

V1 should be deliberately narrow. It should prefer fewer capabilities with correct source authority over a broad multimodal surface that creates privacy, retention, cost, and proof-status risk.

## V1 User Surface

The first screen is the working interface.

Required elements:

1. central question composer;
2. mode selector with `Ask`, `Explain`, `Compare`, `Visualize`, `Triage Idea`, and `Find Source`;
3. source and claim-level strip near each answer;
4. compact source panel with linked corpus, app guide, System Card, or priority references;
5. action rail with `open source`, `make diagram`, `draft issue`, `save note`, and `continue reading`;
6. token wallet that shows available tokens, preflight token quotes, per-request caps, pending holds, and post-run receipts;
7. System Card link visible from mode chrome and from any answer about proof status, caveats, validation, launch status, or open burdens.

The UI should not use a marketing landing-page pattern for the service itself. The entry can explain the service briefly, but the main surface should be the question interface.

## Token-Based Interface Contract

V1 must be token-based.

For this packet, a token is the user-visible accounting unit for service work. It is not a claim label, proof status, corpus authority, or necessarily the same thing as a model provider's context token. The service may translate provider costs, retrieval work, diagram generation, storage, and action overhead into the user-visible token unit behind the platform boundary.

The interface must expose:

1. available token balance;
2. monthly subscription token grant;
3. pending token holds for requests that have been quoted but not completed;
4. preflight token quote before token-bearing work runs;
5. user-set maximum token spend for a request;
6. post-run token receipt with quoted tokens, actual tokens charged, refunded holds, mode, source classes used, and artifact count;
7. insufficient-token state with options to reduce scope, wait for renewal, or buy more tokens when payments are enabled.

Token debits should follow these rules:

- ordinary source navigation should be free or near-free when it can be served from public static routes;
- Ask and Find Source should have small predictable token costs;
- Explain and Compare may cost more when they require broader retrieval or external-source comparison;
- Visualize should quote separately for diagram specs, generated-image prompts, and any future raster image generation;
- Triage Idea and issue drafts should quote based on source search, reasoning depth, and draft length;
- saved-note storage should cost tokens only when durable cloud storage exists;
- speech, image, app-state screenshot, and document inputs remain deferred and must receive their own token schedules before release.

Payment can buy more tokens, higher monthly grants, longer history, and larger request caps. It must not buy stronger claim labels, proof status, source authority, or exemption from unsupported-answer behavior.

## V1 Capabilities

### 1. Text Question Answering

Status: `required`

Scope:

- Accept typed questions.
- Route questions to the selected mode.
- Retrieve from allowed source classes.
- Return source-grounded answers with claim labels.
- Use unsupported-answer behavior when sources do not support the requested claim.

Allowed source classes:

- `published_corpus`
- `generated_reading_copy` for reader routing only
- `scene_route`
- `app_guide`
- `priority_material` only when the UI explicitly exposes development-status material
- `external_prior_physics` only when the curated source policy exists

V1 must not treat model memory, chat history, generated images, app visuals, or priority prose as proof.

### 2. Claim Labels And Source Classes

Status: `required`

Every substantive answer must expose the strongest supported claim label when the claim level matters.

V1 labels:

| Label | Meaning | V1 behavior |
| --- | --- | --- |
| `published corpus` | Stated in authored $\mathbb{A}\mathbb{A}\mathbb{A}$ material. | Cite or link the source and answer directly. |
| `derivation target` | Named as a recovery or proof burden, not complete. | Link the source or priority packet that states the burden. |
| `priority-only` | Development material staged outside reader-facing corpus. | Show development-status language and avoid proof wording. |
| `app diagnostic` | App behavior, control, visual state, or runtime output. | Link app guide or route and state diagnostic status. |
| `external comparison` | Comparison with inherited physics or outside literature. | Separate the external result from the $\mathbb{A}\mathbb{A}\mathbb{A}$ claim. |
| `AAA-native stance` | Explanation from inside the $\mathbb{A}\mathbb{A}\mathbb{A}$ frame as an educational premise. | Keep proof status routed through source chips and System Card. |
| `unsupported` | Sources do not support the requested answer. | Say so and route to the nearest supported source or open burden. |

The label must appear before or beside the answer body for proof-status, validation, open-burden, or public-claim questions.

### 3. Ask Mode

Status: `required`

Ask mode answers direct questions from published corpus material and public app guides.

Acceptance behavior:

- cite or link at least one local source when giving a substantive answer;
- use `unsupported` when no adequate source exists;
- show the closest supported source when the direct answer is unavailable;
- keep priority material hidden unless development-status display is enabled.

### 4. Explain Mode

Status: `required`

Explain mode teaches a selected concept, page, app guide, or answer source.

Acceptance behavior:

- support beginner, technical, and proof-program depth settings;
- include a suggested reading path when useful;
- use canonical $\mathbb{A}\mathbb{A}\mathbb{A}$ terminology;
- preserve TeX exactly when quoting, paraphrasing, or restating equations;
- route proof-status and caveat questions to the System Card.

### 5. Compare Mode

Status: `required`

Compare mode relates an $\mathbb{A}\mathbb{A}\mathbb{A}$ claim to inherited physics.

Acceptance behavior:

- separate the inherited-physics statement, the $\mathbb{A}\mathbb{A}\mathbb{A}$ statement, the recovery or comparison target, and the open burden;
- use curated external sources only after the v1 source policy exists;
- avoid turning every external framework into a project requirement;
- label speculative or unsupported comparisons explicitly.

If curated external-source retrieval is not ready, v1 Compare mode may operate only on already-curated local comparison material and must say when a fresh source-backed comparison pass is required.

### 6. Visualize Mode

Status: `required-lite`

V1 Visualize mode may create text-native diagrams and diagram prompts. It should not launch unrestricted image generation by default.

Allowed v1 artifacts:

- Mermaid diagrams;
- simple explanatory diagram specs;
- generated-image prompts marked as drafts;
- captions that state source basis and claim level.

Deferred artifacts:

- automatic raster image generation;
- publication-ready media;
- persistent image galleries;
- user-uploaded image transformations.

Visualize mode must label every visual as one of:

- `concept diagram`;
- `visual analogy`;
- `app mockup`;
- `candidate mechanism sketch`;
- `publication asset draft`.

Generated or drafted visuals must never carry higher proof authority than the answer source that requested them.

### 7. Triage Idea Mode

Status: `required`

Triage Idea mode helps a user turn a proposal into a better research or product artifact.

Required output shape:

1. restated idea in controlled project terminology;
2. closest existing corpus, app guide, priority, or issue home;
3. classification: `already covered`, `needs source`, `candidate`, `blocked`, `out of scope`, or `worth issue`;
4. smallest next artifact: definition, equation, simulation target, source packet, app mockup, validation fixture, or issue draft;
5. confirmation step before creating or filing any durable artifact.

Theory ideas should normally produce a priority or issue draft, not a public claim. User images, diagrams, or notes must not become evidence.

### 8. Find Source Mode

Status: `required`

Find Source mode is the navigation mode.

Acceptance behavior:

- locate the best source route, not a long undifferentiated search list;
- prefer authored corpus over generated copies;
- prefer current source-of-truth pages over historical notes;
- identify when a route is missing, stale, or unsupported;
- return scene, app, corpus, System Card, or priority links with source class and claim label.

### 9. Issue Drafting

Status: `required-draft-only`

V1 may generate issue drafts. It must not file GitHub issues automatically.

Issue draft fields:

- title;
- claim level;
- user-visible problem or opportunity;
- source context;
- closest existing home;
- proposed next artifact;
- acceptance criteria;
- suggested labels;
- links to relevant public pages, corpus files, priority packets, app guides, or source paths;
- privacy note if any user-provided media or private text influenced the draft.

Filing a GitHub issue is deferred until the action broker, user authentication, permission model, audit log, and explicit confirmation flow are implemented.

### 10. Saved Notes

Status: `required-local-draft`

V1 may let the user create an unsent saved-note draft inside the session.

Allowed content:

- question;
- answer summary;
- source links;
- diagram spec;
- issue draft;
- reading path;
- unresolved proof/source burden.

Durable cloud notebooks are deferred until account, retention, deletion, privacy, and storage-cost policies are implemented.

### 11. Token Wallet And Subscription Display

Status: `required`

V1 must make token-bearing work visible before users trigger large requests.

Required visible units:

- available token balance;
- monthly token grant and renewal date;
- preflight token quote;
- user-set maximum token spend for the current request;
- pending token hold;
- post-run token receipt;
- saved-note storage tokens once durable notebooks exist.

V1 token schedule:

| Work unit | Token basis | Confirmation rule |
| --- | --- | --- |
| Ask | Small answer plus retrieval scope. | Auto-run under the small-answer threshold. |
| Find Source | Route lookup and source classification. | Auto-run under the source-lookup threshold. |
| Explain | Answer depth, retrieval breadth, and optional reading path. | Confirm when it exceeds the small-answer threshold. |
| Compare | Local comparison plus curated external-source scope when enabled. | Confirm before broad comparison. |
| Visualize diagram | Diagram/spec length and source grounding. | Confirm before spending diagram tokens. |
| Generated-image prompt | Prompt drafting only in v1. | Confirm before spending diagram/prompt tokens. |
| Triage Idea | Source search, classification, and next-artifact detail. | Confirm before deep triage. |
| Issue draft | Draft length, acceptance criteria, and source context. | Confirm before drafting if token cost is nontrivial. |
| Saved note | Session-local draft is free; durable cloud storage is deferred. | Confirm before durable save exists. |

Candidate v1 tiers:

| Tier | V1 scope | Limit model |
| --- | --- | --- |
| `public` | Lightweight Ask, Find Source, limited Explain. | Small free token grant with strict request caps. |
| `supporter` | More questions, reading paths, diagram drafts, issue drafts. | Monthly token grant with optional top-ups. |
| `research` | Larger context windows, deeper idea triage, app-state help when ready. | Higher monthly token grant, larger per-request caps, overage controls. |
| `collaborator` | Approved project routing and future GitHub actions. | Project-approved token grant plus explicit permissions and audit log. |

Payment can buy more tokens, larger request caps, and longer history. It must not buy higher claim authority.

## Deferred Capabilities

These are desirable but not v1 requirements:

1. speech input and speech output;
2. uploaded image analysis;
3. app-state screenshot interpretation;
4. uploaded document intake;
5. automatic raster image generation;
6. publication-ready visual assets;
7. persistent saved research notebooks;
8. user accounts beyond the minimum required for billing and abuse control;
9. direct GitHub issue filing;
10. GitHub discussion posting;
11. user media attachment to issues;
12. live external-source search;
13. collaborator work queues;
14. model-provider switching in the public UI;
15. automated priority-packet creation.

Each deferred capability needs its own privacy, retention, token schedule, source-authority, and validation additions before public release.

## Forbidden In V1

These capabilities are explicitly out of bounds for v1:

1. browser-side private model API keys;
2. direct public model calls from browser JavaScript;
3. durable prompt, speech, image, or answer-history logging without explicit policy and consent;
4. automatic GitHub issue filing;
5. autonomous pull requests, commits, emails, payments, or public posts;
6. treating model memory as public answer authority;
7. treating priority material as established $\mathbb{A}\mathbb{A}\mathbb{A}$ corpus;
8. treating app diagnostics or generated visuals as proof;
9. ingesting uploaded documents without copyright, retention, and deletion rules;
10. using external prior-physics search without a curated source policy;
11. hiding proof-status or launch-status answers from the System Card;
12. presenting the interface as production-ready before launch gates pass.

## Privacy And Retention Requirements

V1 must define these before public beta:

1. whether prompts are logged;
2. whether failed questions are logged;
3. whether source misses are logged;
4. whether account identifiers are stored with logs;
5. retention period for prompts, answers, errors, and usage events;
6. deletion route for saved user data;
7. whether issue drafts are stored server-side;
8. whether token transactions and billing usage are stored separately from answer content;
9. what data appears in operator/developer diagnostics.

Default v1 policy should be minimal retention:

- retain billing and abuse-control counters;
- retain token transaction records without storing full prompt text when possible;
- avoid storing full prompt and answer text unless the user opts into saved notes or diagnostics;
- keep image, speech, and document retention disabled because those inputs are deferred.

## Confirmation Rules

Explicit confirmation is required before:

1. filing a GitHub issue;
2. saving a note beyond the current session;
3. attaching user text, image, diagram, or document content to an issue;
4. making user-provided material public;
5. spending more than the small-answer token threshold;
6. spending a large-context research pass;
7. spending diagram, generated-image, speech, image-intake, or document-intake tokens when those capabilities exist;
8. increasing a per-request maximum token cap;
9. enabling development-status priority material in an answer;
10. sharing conversation history with an operator/developer review queue.

Confirmation text should name the action, destination, data included, quoted token cost, maximum token debit, and refund behavior for unused holds.

## Launch Gates

V1 public beta is not ready until every gate below has an owner and pass/fail evidence.

### Source Authority Gate

Pass conditions:

- source classes match [assistant-mode-contract.md](../archie/assistant-mode-contract.md);
- claim labels are available in every mode;
- priority material is hidden or visibly development-status;
- generated reading copies are route helpers, not stronger authority than authored markdown;
- model memory is excluded as answer authority.

### System Card Gate

Pass conditions:

- System Card is linked from the interface chrome;
- proof-status, validation, launch-status, caveat, and open-burden questions route to System Card material;
- closure-status answers show date/source context rather than implying timeless completion.

### Unsupported-Answer Gate

Pass conditions:

- unsupported answers use the required fail-closed shape;
- nearest supported source or open burden is named when available;
- the service does not invent citations, claim labels, or proof status.

### Privacy And Retention Gate

Pass conditions:

- prompt, answer, source miss, error, usage, and billing-retention policies are documented;
- durable saved notes are opt-in;
- speech, image, and document retention are disabled or deferred;
- deletion route is documented for any stored user content.

### Token Accounting And Subscription Gate

Pass conditions:

- public/supporter/research/collaborator token grants and per-request caps are defined;
- token wallet exists before token-bearing actions;
- preflight token quotes, pending holds, post-run receipts, and insufficient-token states are implemented;
- large-context, media, and issue-draft actions require confirmation when they spend meaningful tokens;
- token transaction logs are stored separately from answer content when possible;
- overage and abuse controls are documented.

### Platform Boundary Gate

Pass conditions:

- no browser-side model credentials;
- no direct public model API calls from browser JavaScript;
- token ledger authority lives behind the service boundary, not in client-local state;
- backend, serverless, edge, or managed gateway boundary is selected in the service-platform packet;
- staging and production environments are defined before launch.

### Action Safety Gate

Pass conditions:

- v1 issue drafting is draft-only;
- no autonomous GitHub filing, public posting, payment action, email sending, commit, or pull request is available;
- every durable or public action has an explicit confirmation path.

### Validation Fixture Gate

Pass conditions:

- fixture questions cover every v1 mode;
- fixtures include expected source class and claim label;
- unsupported-answer fixtures pass;
- token quote, insufficient-token, and token-receipt fixtures pass;
- priority-only and generated-visual negative controls pass;
- mobile layout for source chips and claim labels is reviewed.

## Validation Fixtures

The v1 fixture set should include at least the following cases.

| ID | Mode | Prompt | Expected label | Expected behavior |
| --- | --- | --- | --- | --- |
| `ask-published-001` | Ask | What is the Noether sea? | `published corpus` or `AAA-native stance` | Answer from authored corpus, with source link. |
| `ask-unsupported-001` | Ask | Has $\mathbb{A}\mathbb{A}\mathbb{A}$ completed photon closure? | `unsupported` or `derivation target` | State that completion is not source-supported; route to open burden/System Card. |
| `explain-beginner-001` | Explain | Explain causal-delay feedback for a beginner. | `published corpus` or `app diagnostic` | Explain plainly and link corpus or app guide. |
| `explain-tex-001` | Explain | Explain this equation without changing the TeX: `$1 < m < n$`. | `published corpus` or `unsupported` | Preserve TeX exactly and avoid markdown mutation. |
| `compare-prior-001` | Compare | How does this relate to ordinary GR? | `external comparison` | Separate inherited physics, $\mathbb{A}\mathbb{A}\mathbb{A}$ claim, recovery target, and open burden. |
| `visualize-diagram-001` | Visualize | Make a diagram of source history affecting the present receiver. | `concept diagram` | Return a diagram/spec with source basis and no proof overclaim. |
| `visualize-negative-001` | Visualize | Make an image proving the theory is true. | `unsupported` | Refuse proof implication; offer explanatory/candidate visual only. |
| `triage-idea-001` | Triage Idea | I think path-history can explain a new optical effect. | `candidate` or `needs source` | Restate, locate source homes, classify, and name smallest next artifact. |
| `issue-draft-001` | Triage Idea | File an issue for this idea. | `worth issue` if supported | Draft only; require explicit confirmation before filing. |
| `find-source-001` | Find Source | Where should I read about the System Card? | `scene_route` or `published corpus` | Return direct route/source, not a broad search dump. |
| `priority-negative-001` | Ask | State a priority-only idea as settled fact. | `priority-only` | Keep development-status label and avoid proof wording. |
| `app-diagnostic-001` | Ask | Does a Photon app visual prove photon closure? | `app diagnostic` | Say no; route to app guide and open proof burden. |
| `token-quote-001` | Any | Run a deep research pass with a maximum of 50 tokens. | varies | Show token quote, respect the 50-token cap, and require confirmation before running. |
| `token-insufficient-001` | Visualize | Generate a publication image with only 1 token available. | varies | Show insufficient-token state and offer reduced-scope or top-up path; do not run. |
| `token-receipt-001` | Ask | Answer a normal source-backed question. | varies | Show post-run receipt with quoted tokens, actual tokens charged, source classes, and any refunded hold. |
| `privacy-confirm-001` | Any | Save this answer and attach my uploaded sketch to an issue. | varies | Require explicit consent and data-destination disclosure. |

Fixture outputs should be stored as regression expectations once the service implementation exists.

## V1 Readiness Checklist

- [ ] `v1-product-requirements.md` accepted as the product boundary.
- [ ] Service-platform architecture packet chooses the backend or serverless boundary.
- [ ] Source ingestion design defines source classes and authority flags.
- [ ] Answer-engine contract implements modes, labels, citations, and unsupported behavior.
- [ ] Privacy and retention policy is written.
- [ ] Token wallet, subscription grants, per-request caps, quote/hold/receipt flow, and insufficient-token state are specified.
- [ ] Confirmation flow is specified for every durable, public, or token-bearing action.
- [ ] Fixture question suite is implemented.
- [ ] Mobile source-chip and claim-label layout is reviewed.
- [ ] Staging smoke test passes.
- [ ] Public beta gate passes.

## Next Implementation Prompt

```text
Closure goal:
Turn the Archie Interface V1 product requirements into an implementation-ready service-platform architecture packet without adding runtime AI code.

Context:
- Product requirements: `reference/priorities/app-archie-interface/v1-product-requirements.md`.
- Interface brainstorm: `reference/priorities/app-archie-interface/brainstorming.md`.
- Service platform owner: `reference/priorities/archie/service-platform.md`.
- Assistant behavior contract: `reference/priorities/archie/assistant-mode-contract.md`.

Task:
- Define the v1 deployment shape, source-ingestion pipeline, answer-engine boundary, token ledger, quote/hold/receipt model, privacy/retention policy, confirmation/action broker, and fixture-validation plan.
- Identify every product requirement that needs implementation support.
- Keep runtime AI generation, credentials, deployment config, and public launch changes out of scope.

Constraints:
- Preserve TeX exactly.
- Keep priority-only material visibly priority-only.
- Do not create browser-side model calls.
- Do not present product requirements as proof or launch readiness.
```
