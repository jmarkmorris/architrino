# Archie Interface Brainstorming

This file preserves product and interface ideas for the future user-facing Archie question service.

The goal is not to build a static chat widget. The goal is to design a source-grounded, multimodal research guide that can explain the corpus, help users form better questions, create helpful visual artifacts, and route valuable ideas into durable project work.

## Core Experience

The first screen should be an actual conversation surface, not a landing page.

Recommended v1 layout:

- a central question composer with mode chips for `Ask`, `Explain`, `Compare`, `Visualize`, `Triage Idea`, and `Find Source`;
- input buttons for text, microphone, image upload, screenshot upload, and pasted diagram or equation;
- a source panel that shows which corpus, app guide, System Card, or priority class the answer used;
- a claim-level chip on each answer: `published corpus`, `priority-only`, `comparison`, `speculation`, or `unsupported`;
- an action rail for `open source`, `make diagram`, `read aloud`, `submit issue`, `save note`, and `continue reading`;
- a token wallet that shows available tokens, preflight quotes, per-request caps, pending holds, and post-run receipts.

The interface should feel like a working lab guide: quiet, direct, and source-aware. It can use a pleasant narration voice when read aloud, but it should stay disciplined about proof status.

## Multimodal Input

Useful input modes:

1. Text questions.
2. Spoken questions.
3. Uploaded images: sketches, screenshots, whiteboard photos, diagrams, app screenshots, paper figures, and hand-drawn mechanism ideas.
4. Pasted equations or markdown.
5. Uploaded documents when policy and retention rules are ready.
6. App-state snapshots from Architrino apps so a user can ask what a visible diagnostic means.

The intake pipeline should classify each input before answer generation:

| Input | Immediate use | Required boundary |
| --- | --- | --- |
| Text | Route to retrieval and answer mode. | Cost and source-authority display. |
| Voice | Transcribe, then route as text. | Consent, retention, deletion, and transcript visibility. |
| Image | Describe, extract visible text/equations, and ask clarifying questions when ambiguous. | Consent, retention, redaction, and image-use disclosure. |
| Screenshot | Identify app/page context and visible controls. | Do not infer hidden state from pixels alone. |
| Equation | Preserve TeX or math text and map symbols carefully. | Do not silently rewrite notation. |
| Document | Summarize and compare against corpus sources. | Upload policy, copyright handling, retention, and source separation. |

## Multimodal Output

Useful output modes:

1. Cited text answer.
2. Read-aloud friendly answer for accessibility and paper listening.
3. Narration or explanation script.
4. Animated concept storyboard.
5. Diagram or generated image.
6. Step-by-step reading path through corpus pages.
7. App deep link or preset recommendation.
8. GitHub issue submission.
9. Saved research note.
10. Follow-up prompt that the user can run in a deeper thread.

Generated images should have explicit purpose labels:

- `concept diagram` for schematic explanation;
- `visual analogy` for intuition only;
- `app mockup` for interface planning;
- `candidate mechanism sketch` for unproved ideas;
- `publication asset draft` only after human review.

No generated image should be allowed to carry more proof authority than the source answer that requested it.

## Read-Aloud And Presentation Voice

The user should not need to choose a character persona. Presentation voice is the assistant's responsibility: the service should decide when a slower explanation, a technical review stance, a visual narration, or a compact direct answer best serves the user and the source material.

The practical need is pleasant, accessible reading of papers and explanations. Browser/system narration surfaces such as Microsoft Edge Read Aloud should work well on generated reading views, paper excerpts, and answer pages before the project attempts service-native voice or animated avatars.

Good uses:

1. a read-aloud paper view with clean headings, math-safe text, and short spoken summaries;
2. a beginner-friendly explanation stance that speaks slowly and uses analogies;
3. a technical reviewer stance that asks what source or proof burden supports a claim;
4. an app-helper stance that walks through controls and diagnostics;
5. a visual narrator stance for concept diagrams or animation storyboards;
6. a skeptical-comparison stance that separates inherited physics, $\mathbb{A}\mathbb{A}\mathbb{A}$ claims, and open burdens.

Guardrails:

- presentation voice does not add authority;
- presentation changes must preserve source chips, claim labels, and System Card routing;
- presentation voice must not impersonate real people or imply endorsement;
- styled output should always be recoverable as a plain source-grounded answer;
- read-aloud paper views should keep canonical text separate from optional speech-friendly summaries;
- animated concept explainers should include captions, source basis, and claim-level labels;
- spoken and animated outputs need token quotes, privacy/retention rules, accessibility controls, and user controls before release.

V1 can support read-aloud friendly answer formatting, narration scripts, and animation storyboards. Service-native speech, animated avatars, generated video, persistent presentation-style memory, and user-custom character personas should remain deferred until the service-platform packet defines speech/media handling.

## Conversation Modes

### Ask

Default question-answering mode.

Behavior:

- retrieve from published corpus and public app guides first;
- include compact citations or source links;
- state when the corpus has no supported answer;
- route closure-status questions through the System Card;
- keep priority material visibly priority-only.

### Explain

Teaching mode for a selected concept, page, app, or user-uploaded excerpt.

Behavior:

- adapt to beginner, technical, or proof-program level;
- produce an optional reading path;
- use diagrams when the concept is spatial, dynamical, or branch-structured;
- distinguish native $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology from inherited physics comparisons.

### Compare

Compare a corpus claim with inherited physics.

Behavior:

- label whether the inherited framework is a recovery target, accepted constraint, comparison framework, or speculative analogy;
- avoid turning every external idea into a project requirement;
- keep the comparison grounded in source text and accepted physics.

### Visualize

Create a visual aid from the user's question.

Behavior:

- ask whether the user wants a schematic, app mockup, explanatory image, or publication draft when the distinction matters;
- generate or draft the visual artifact, narration script, or animation storyboard;
- attach caption text that states claim level and source basis;
- optionally turn the visual into a future app or corpus illustration issue after user confirmation.

### Triage Idea

Help a user submit a new idea without flooding the project with vague issues.

Behavior:

1. restate the idea in controlled project terminology;
2. identify the closest existing corpus or priority homes;
3. classify the idea as `already covered`, `needs source`, `candidate`, `blocked`, `out of scope`, or `worth issue`;
4. list the smallest concrete artifact needed next: definition, equation, simulation target, source packet, app mockup, or issue;
5. ask for confirmation before creating or filing a GitHub issue.

### Find Source

Navigation mode.

Behavior:

- locate the best corpus page, app guide, System Card section, priority packet, issue, or source reference;
- prefer current source-of-truth pages over historical notes;
- show the user a short route rather than dumping a long search result list.

## GitHub Issue Workflow

Issue filing should be useful but gated. The first v1 implementation can follow the iOS/iPadOS reader feedback pattern: generate a prefilled GitHub issue URL, state that GitHub login is required, and let the user submit through GitHub. Do not put a GitHub token, access code, or backend credential in the public client.

Recommended flow:

1. User presents an idea or bug.
2. Archie classifies it against corpus, app, and priority sources.
3. If it looks worth tracking, Archie prepares an issue with:
   - title;
   - claim level;
   - user-visible problem or opportunity;
   - source context;
   - proposed next artifact;
   - acceptance criteria;
   - labels;
   - links to relevant files or public pages;
   - structured origin metadata for later issue mining.
4. User reviews the issue preview and public visibility warning.
5. Only after explicit confirmation does the interface open the prefilled GitHub issue URL or use a later approved action broker.

Filing policy:

- bugs and user-facing app issues can be filed directly after confirmation;
- theory ideas should normally become priority packets, GitHub issues, or issue drafts, not public claims;
- speculative images should not become evidence;
- private user uploads should not be attached unless the user explicitly permits it.

## GitHub Issue Mining

Issue filing needs a matching signal-mining loop. The project should not merely collect comments; it should mine the issue stream for common signal, classify noise, and feed fixes back into app, corpus, source-authority, and service-platform work.

Mining outputs:

1. duplicate clusters;
2. recurring app bugs;
3. recurring user confusion around corpus claims;
4. recurring source-navigation failures;
5. recurring unsupported-answer gaps;
6. recurring issue-submission friction;
7. noise classes such as spam, vague comments, unsupported theory assertions, or non-actionable reactions;
8. fix queues with owner, severity, frequency, representative issue links, and recommended action.

Issue bodies should therefore include enough structured metadata for mining: Archie mode, source route, app/page context, user-selected category, suggested labels, issue origin, token receipt id when available, and public/private inclusion decisions.

## Subscription Service Shape

A subscription service is reasonable because multimodal AI, retrieval, speech, image generation, and GitHub actions all create real operating costs.

The interface should be token-based. Archie questions can require very different resources: static source lookup, corpus retrieval, curated external comparison, longer reasoning, diagram drafting, read-aloud formatting, narration scripting, animation storyboarding, issue preparation, GitHub issue handoff, speech, image analysis, document intake, or saved-note storage. A user should see one token wallet rather than separate hidden limits for model calls, retrieval, diagrams, narration, images, speech, issues, and saved notes. Backend accounting can translate real provider costs into the product token unit, but the user-facing experience should stay unified.

Possible tiers:

| Tier | Purpose | Cost controls |
| --- | --- | --- |
| Public | Lightweight corpus Q&A and navigation. | Small free token grant, strict request caps, text-first, no saved media. |
| Supporter | More questions, saved reading paths, limited voice, limited images when enabled. | Monthly token grant with optional top-ups. |
| Research | Deeper idea triage, issue preparation, app-state help, larger context windows. | Higher monthly token grant, larger per-request caps, clear overage controls. |
| Collaborator | Project-approved users who can route drafts into GitHub or priority packets. | Project-approved token grant plus explicit action permissions and audit logs. |

The service should show usage in ordinary terms:

- available token balance;
- quoted tokens before work runs;
- maximum token cap for the request;
- pending token hold while a request is running;
- actual tokens charged after completion;
- refunded tokens when a held request spends less than quoted;
- token history for billing and abuse review.

Payment should not buy higher claim authority. A paid answer can spend more tokens, but it still must obey the same source and proof-status rules.

## Saved Research Notebook

Optional saved notebooks could make the service much more useful.

Notebook items:

- user questions;
- cited answers;
- source paths;
- generated diagrams;
- narration scripts or animation storyboards;
- issue drafts and submitted issue links;
- app presets or screenshots;
- follow-up prompts;
- unresolved proof or source burdens.

Rules:

- saving is opt-in;
- deletion is available;
- uploaded media retention is explicit;
- public sharing is a separate action;
- private user notes do not become corpus evidence.

## Visual Artifact Ideas

Good first visual-output families:

1. Concept diagrams for causal-delay paths, path-history, branch sums, and claim levels.
2. App-state explanation overlays for Photon, Causal Delay Feedback, Animator, and future solver-backed apps.
3. Reading-map diagrams that show how a question routes through corpus chapters.
4. Mechanism sketches for user proposals, marked as candidate sketches.
5. Issue thumbnails or small diagrams that make a bug or idea easier to understand.

Visual generation should prefer diagrams when accuracy matters, and generated illustrative images when intuition or outreach is the goal.

## Source Authority And Claim Labels

Every answer should carry a source-status shape:

| Label | Meaning | UI behavior |
| --- | --- | --- |
| `published corpus` | Supported by current public authored material. | Cite source and answer directly. |
| `app guide` | Supported by a public app guide or app behavior. | Link app guide and route to app if useful. |
| `priority-only` | Development material, not public closure. | Show warning and avoid proof-language. |
| `comparison` | Inherited physics or external framework comparison. | Separate from native ontology. |
| `speculation` | Plausible but unsupported idea. | Ask for the next artifact before issue filing. |
| `unsupported` | No adequate source or route found. | Say so and suggest the nearest supported source. |

The claim label should be visible before the answer body when the question touches proof status, source authority, or public claims.

## Architecture Sketch

Product modules:

1. `conversation_surface` - Composer, message stream, mode chips, action rail, source panel, token wallet.
2. `media_intake` - Speech transcription, image analysis, screenshot/app-state parsing, document intake.
3. `mode_router` - Ask, Explain, Compare, Visualize, Triage Idea, Find Source.
4. `retrieval_context` - Corpus, app guide, System Card, priority, and curated external source retrieval with authority flags.
5. `answer_engine` - Prompt assembly, source labels, unsupported-answer behavior, citation payloads.
6. `presentation_layer` - Read-aloud formatting, tone/pacing selection, narration scripts, animation storyboards, captions, and source-authority guardrails.
7. `artifact_generator` - Diagrams, generated images, narration scripts, issue bodies, reading paths, saved notes.
8. `action_broker` - Confirmation-gated GitHub issue handoff, sharing, notebook saving, and account actions.
9. `billing_and_limits` - Subscription tier, token grants, quote/hold/receipt accounting, rate limits, speech/image/presentation token schedules, abuse controls.
10. `issue_signal_mining` - Duplicate clustering, signal/noise classification, recurring theme reports, and owner-routed fix queues.
11. `privacy_and_audit` - Consent, retention, deletion, logs, incident review, and user-data boundaries.

The existing service-platform packet should own deployment choices for these modules.

## V1 Candidate

A constrained first public beta could support:

- text questions;
- source-grounded corpus answers;
- Find Source mode;
- claim-level chips;
- System Card routing;
- limited Visualize mode for diagrams only;
- read-aloud friendly answer text, narration scripts, and animation storyboards only;
- user-confirmed GitHub issue handoff through a prefilled issue URL;
- structured issue metadata for later signal mining;
- public/supporter token grants and per-request caps;
- no uploaded documents;
- no durable image retention unless explicitly saved;
- no service-generated speech, animated avatar, or video output in v1 unless platform policy explicitly promotes it;
- no autonomous GitHub actions or hidden credentials.

This v1 would test whether users actually ask useful questions and whether the source-grounding behavior is strong enough before adding expensive media and deeper account features.

## Open Product Questions

1. Should the first version live as a public Archie page, a separate authenticated app, or a hybrid entry from the public site into a hosted service?
2. What is the minimum corpus maturity needed before public Q&A creates more clarity than confusion?
3. Which answer modes should be free, and which should require subscription?
4. Should issue submission be available to all signed-in users, or only to approved collaborators?
5. Which read-aloud target should be optimized first: browser read-aloud for papers, service-native speech, or generated narration scripts?
6. Should generated images be stored by default, transient by default, or always user-selected?
7. What exact System Card fields must appear next to any answer about closure status?
8. Which apps should expose app-state snapshots to Archie first?

## Future Prompt

```text
Closure goal:
Turn the Archie Interface V1 product requirements into an implementation-ready service-platform architecture packet without adding runtime AI code.

Context:
- The interface bucket is `reference/priorities/app-archie-interface/`.
- The product requirements are `reference/priorities/app-archie-interface/v1-product-requirements.md`.
- The backend/platform owner remains `reference/priorities/archie/service-platform.md`.
- The assistant behavior contract is `reference/priorities/archie/assistant-mode-contract.md`.
- The interface should support source-grounded corpus guidance, text-first v1 modes, diagram drafts, read-aloud friendly answers, narration scripts, animation storyboards, idea triage, token-based cost controls, confirmation-gated GitHub issue submission, and issue signal mining.

Task:
- Read the v1 product requirements and the Archie service-platform/assistant-contract files.
- Define the v1 deployment shape, source-ingestion pipeline, answer-engine boundary, read-aloud and presentation layer, animation-storyboard boundary, token ledger, quote/hold/receipt model, GitHub issue handoff, issue-mining loop, privacy/retention policy, confirmation/action broker, and fixture-validation plan.
- Identify every product requirement that needs implementation support.

Constraints:
- Preserve TeX exactly.
- Keep priority-only material visibly priority-only.
- Do not add runtime AI generation, browser-side model calls, credentials, deployment config, or public claims.
- Treat generated media as explanatory artifacts, not evidence.
```
