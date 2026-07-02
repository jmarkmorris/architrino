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
- an action rail for `open source`, `make diagram`, `draft issue`, `save note`, and `continue reading`;
- a token wallet that shows available tokens, preflight quotes, per-request caps, pending holds, and post-run receipts.

The interface should feel like a working lab guide: quiet, direct, and source-aware. It can be warm and playful in voice mode, but it should stay disciplined about proof status.

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
2. Spoken answer for accessibility and conversational learning.
3. Diagram or generated image.
4. Step-by-step reading path through corpus pages.
5. App deep link or preset recommendation.
6. GitHub issue draft.
7. Saved research note.
8. Follow-up prompt that the user can run in a deeper thread.

Generated images should have explicit purpose labels:

- `concept diagram` for schematic explanation;
- `visual analogy` for intuition only;
- `app mockup` for interface planning;
- `candidate mechanism sketch` for unproved ideas;
- `publication asset draft` only after human review.

No generated image should be allowed to carry more proof authority than the source answer that requested it.

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
- generate or draft the visual artifact;
- attach caption text that states claim level and source basis;
- optionally turn the visual into a future app or corpus illustration issue.

### Triage Idea

Help a user submit a new idea without flooding the project with vague issues.

Behavior:

1. restate the idea in controlled project terminology;
2. identify the closest existing corpus or priority homes;
3. classify the idea as `already covered`, `needs source`, `candidate`, `blocked`, `out of scope`, or `worth issue`;
4. list the smallest concrete artifact needed next: definition, equation, simulation target, source packet, app mockup, or issue;
5. ask for confirmation before creating a GitHub issue draft or filing anything.

### Find Source

Navigation mode.

Behavior:

- locate the best corpus page, app guide, System Card section, priority packet, issue, or source reference;
- prefer current source-of-truth pages over historical notes;
- show the user a short route rather than dumping a long search result list.

## GitHub Issue Workflow

Issue filing should be useful but gated.

Recommended flow:

1. User presents an idea or bug.
2. Archie classifies it against corpus, app, and priority sources.
3. If it looks worth tracking, Archie drafts an issue with:
   - title;
   - claim level;
   - user-visible problem or opportunity;
   - source context;
   - proposed next artifact;
   - acceptance criteria;
   - labels;
   - links to relevant files or public pages.
4. User reviews the draft.
5. Only after explicit confirmation does the service file the issue.

Filing policy:

- bugs and user-facing app issues can be filed directly after confirmation;
- theory ideas should normally become priority packets or issue drafts, not public claims;
- speculative images should not become evidence;
- private user uploads should not be attached unless the user explicitly permits it.

## Subscription Service Shape

A subscription service is reasonable because multimodal AI, retrieval, speech, image generation, and GitHub actions all create real operating costs.

The interface should be token-based. A user should see one token wallet rather than separate hidden limits for model calls, retrieval, diagrams, images, speech, issue drafts, and saved notes. Backend accounting can translate real provider costs into the product token unit, but the user-facing experience should stay unified.

Possible tiers:

| Tier | Purpose | Cost controls |
| --- | --- | --- |
| Public | Lightweight corpus Q&A and navigation. | Small free token grant, strict request caps, text-first, no saved media. |
| Supporter | More questions, saved reading paths, limited voice, limited images when enabled. | Monthly token grant with optional top-ups. |
| Research | Deeper idea triage, issue drafts, app-state help, larger context windows. | Higher monthly token grant, larger per-request caps, clear overage controls. |
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
- issue drafts;
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
6. `artifact_generator` - Diagrams, generated images, issue drafts, reading paths, saved notes.
7. `action_broker` - Confirmation-gated GitHub issue filing, sharing, notebook saving, and account actions.
8. `billing_and_limits` - Subscription tier, token grants, quote/hold/receipt accounting, rate limits, speech/image token schedules, abuse controls.
9. `privacy_and_audit` - Consent, retention, deletion, logs, incident review, and user-data boundaries.

The existing service-platform packet should own deployment choices for these modules.

## V1 Candidate

A constrained first public beta could support:

- text questions;
- source-grounded corpus answers;
- Find Source mode;
- claim-level chips;
- System Card routing;
- limited Visualize mode for diagrams only;
- issue-draft generation without automatic filing;
- public/supporter token grants and per-request caps;
- no uploaded documents;
- no durable image retention unless explicitly saved;
- no autonomous GitHub actions.

This v1 would test whether users actually ask useful questions and whether the source-grounding behavior is strong enough before adding expensive media and deeper account features.

## Open Product Questions

1. Should the first version live as a public Archie page, a separate authenticated app, or a hybrid entry from the public site into a hosted service?
2. What is the minimum corpus maturity needed before public Q&A creates more clarity than confusion?
3. Which answer modes should be free, and which should require subscription?
4. Should issue drafting be available to all signed-in users, or only to approved collaborators?
5. Should generated images be stored by default, transient by default, or always user-selected?
6. What exact System Card fields must appear next to any answer about closure status?
7. Which apps should expose app-state snapshots to Archie first?

## Future Prompt

```text
Closure goal:
Turn the Archie Interface V1 product requirements into an implementation-ready service-platform architecture packet without adding runtime AI code.

Context:
- The interface bucket is `reference/priorities/app-archie-interface/`.
- The product requirements are `reference/priorities/app-archie-interface/v1-product-requirements.md`.
- The backend/platform owner remains `reference/priorities/archie/service-platform.md`.
- The assistant behavior contract is `reference/priorities/archie/assistant-mode-contract.md`.
- The interface should support source-grounded corpus guidance, text-first v1 modes, diagram drafts, idea triage, token-based cost controls, and confirmation-gated issue drafts.

Task:
- Read the v1 product requirements and the Archie service-platform/assistant-contract files.
- Define the v1 deployment shape, source-ingestion pipeline, answer-engine boundary, token ledger, quote/hold/receipt model, privacy/retention policy, confirmation/action broker, and fixture-validation plan.
- Identify every product requirement that needs implementation support.

Constraints:
- Preserve TeX exactly.
- Keep priority-only material visibly priority-only.
- Do not add runtime AI generation, browser-side model calls, credentials, deployment config, or public claims.
- Treat generated media as explanatory artifacts, not evidence.
```
