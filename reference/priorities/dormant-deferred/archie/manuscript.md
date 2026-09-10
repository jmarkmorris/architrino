# Archie: a source-grounded question service

## 1. The service and its authority

### 1.1 A guide to an evolving body of knowledge

Archie is the proposed question and explanation service for readers of $\mathbb{A}\mathbb{A}\mathbb{A}$. Its central responsibility is to make the project's knowledge understandable without concealing the difference between an authored account, an unfinished derivation, an application diagnostic and an unsupported suggestion. A reader can ask a direct question, request a deeper explanation, compare an account with inherited physics, prepare a visual, develop an idea or locate the best source. The service presents one coherent assistant whose explanation changes with the question and the reader's needs.

This is a product and architecture proposal with documented local contract scaffolding. The supporting records describe schemas, representative source indexes, fixture responses and a bounded local software-client adapter. They do not establish a deployed public answer service. The distinction matters because an implementation can exercise the shape of an answer, its source labels and its refusal behavior without contacting a model provider, charging a customer or retaining a notebook. Conversely, a polished conversational interface would not establish that these responsibilities are implemented correctly.

The account developed here follows the [product requirements](v1-product-requirements.md), [assistant behavior contract](assistant-mode-contract.md) and their focused service contracts. Requirements stated as obligations remain requirements until supported by the appropriate implementation and release evidence. Historical observations in those records retain their original scope. The manuscript supplies neither a new scientific acceptance decision nor a service launch decision.

### 1.2 Source authority is preserved through presentation

Source authority means the role a source is permitted to play in supporting an answer. Authored corpus material can support an explanation of what the corpus states. A generated reading copy can help a reader reach that material. An application guide can explain a control or diagnostic. A development packet can identify a candidate argument and its remaining burden. These roles are different even when their text or visual presentation looks similar.

An answer may teach from the theory's working perspective without claiming that every recovery target has been derived. The educational stance and the proof status answer different questions: the former fixes the frame in which an explanation is given; the latter records what the supporting evidence establishes. A clear answer retains both. Questions about proof status, caveats, validation, launch status and open burdens route to the System Card and the relevant dated source, so a local statement does not become a timeless declaration of completion.

The same boundary applies after the text is produced. Speech quality, an attractive image, provider availability, a subscription payment and repeated user reports cannot strengthen the underlying claim. Each can affect whether an artifact is useful or available. None supplies a missing derivation. An image of a proposed mechanism remains an explanation or candidate sketch; it does not become an observed trajectory or a proof of that mechanism.

### 1.3 Three questions that the interface must keep separate

The service must distinguish what it can retrieve, what a retrieved source can support and what action the user has authorized. A public route does not necessarily carry scientific authority. A private note may be available to its owner without becoming project evidence. An authorized request for a visual does not convert an unsupported claim into a supported one.

This separation also explains why source retrieval and reference selection have different owners. Retrieval identifies usable material and its provenance. The corpus's [reference and attribution policy](../../../../content/markdown/aaa/archie/about-architrino.md) governs which references belong in reader-facing exposition. Permission to retrieve a class of material is not a requirement to cite every item retrieved, and omitting a citation from prose does not erase acquisition provenance or an item-specific attribution obligation.

## 2. From source records to supported answers

### 2.1 Identifying a source

The [ingestion and retrieval contract](source-ingestion-retrieval-context-contract.md) gives a source a stable identity, class, title, route, authority, visibility and snapshot context. A section reference can narrow that route. Generated copies carry a canonical parent so the answer can return to the authored source that owns the claim. A safe teaser helps navigation without exposing private content. A claim-label boundary constrains what the answer engine may later assert; the source's field named a label floor is defined as the strongest permissible pre-engine claim, not permission to strengthen an answer.

The source classes distinguish authored corpus, generated reading copies, scene routes, application guides, Archie reference material, development material and curated external comparisons. The assistant's broader conceptual classification additionally names model memory so it can explicitly exclude memory as public answer authority. The ingestion schema need not ingest memory merely because the behavior contract discusses it.

Consider a reader arriving from a sphere in a visual reading interface. The route can identify a particular Markdown portion, or it can identify a full-document reading surface. Those cases determine what text is opened or spoken. They do not create a second authored source. Likewise, an application route can identify an app guide while retaining the guide's diagnostic scope. A missing route should produce a useful explanation and a nearest supported destination when available; it must not be replaced with an invented path.

### 2.2 Freshness and visibility

Source context includes the freshness of the authored repository, generated copies, scene indexes, app guides and any permitted external material. These can become stale independently. A generated copy can lag behind its canonical parent even when its URL still resolves. The correct response is to route to the parent, identify the stale material or return a missing-source disposition, depending on the declared contract. Model memory is not a freshness repair.

Development material requires explicit development-status visibility and an appropriate label. Curated external comparison material requires a source policy before the corresponding retrieval capability is enabled. Private prompts, unsaved drafts, screenshots, arbitrary uploads and generated artifacts do not silently enter a public source index. Access restrictions remain effective through search, graph navigation, exact-content retrieval and subsequent answer rendering.

A source chip is the compact user-visible representation of this context: it identifies the source and route, explains its class and claim boundary, and carries the relevant freshness or development status. It should help the reader inspect the answer without exposing provider internals, private prompt text or a long internal audit record.

### 2.3 Selecting the strongest supported claim

The [answer-engine contract](answer-engine-source-contract.md) consumes validated retrieval context. It records used and excluded source classes, primary and supporting routes, missing routes, policy and freshness information, and System Card context. It then selects one primary claim label, with secondary interface tags when appropriate. When two labels are plausible, the weaker label is selected unless the stronger support is explicit.

The seven product labels have distinct meanings. Published corpus identifies an authored statement; derivation target identifies an incomplete recovery or proof burden; priority-only identifies development material; app diagnostic identifies application behavior or output; external comparison identifies an inherited-physics or outside-literature comparison; the native educational stance explains within the theory's frame; unsupported identifies a request that the available sources cannot support. Published status does not itself mean a theorem has been independently proved, and an educational stance does not erase the System Card's qualifications.

The product records are not yet a single normalized implementation specification. Some product prose permits public app guides in Ask while the detailed engine's mode/source rows are narrower. Earlier brainstorming also uses label names that differ from the later controlled set. These differences require explicit reconciliation before implementation; this synthesis does not silently broaden a source allowlist or invent aliases. The fixture tables also use visual-purpose labels, source-class names and idea-triage categories in a column called Expected label. Those values describe different fields and must not all become members of the primary claim-label enum.

### 2.4 Unsupported answers as useful answers

Unsupported behavior is a normal service outcome. A requested conclusion can exceed its source, a route can be absent, a provider capability can be unavailable, or an action can lack its required terms or consent. The service should identify the limiting condition and offer the nearest supported answer, open burden, reduced scope, text-only artifact or preparation step that the actual contract permits.

For example, asking whether an application visual proves photon closure calls for an explanation of the visual's diagnostic role and a route to the unresolved proof burden. Generating another visual cannot remedy the missing proof. Similarly, asking for a fresh external comparison when external retrieval is unavailable can produce a comparison from already-curated local material, with its limitation stated. It cannot justify an uncited account from memory.

The answer body preserves displayed text, stable verbatim segments, a safe summary and an optional reading path. TeX remains exact in the displayed text and its associated segments. Speech may pronounce mathematical notation, but the display does not silently change the expression it accompanies. Suggested follow-up artifacts remain proposals until their action conditions are satisfied.

## 3. A single answer record across service boundaries

### 3.1 The Answer Artifact Manifest

The [Answer Artifact Manifest](answer-artifact-manifest.md) is the structured record that connects an answer to its sources, claim context, text, artifacts, accounting, privacy and available actions. A manifest is not a proof certificate. Its role is to make each service component use the same answer context, so a renderer, speech player or issue draft cannot manufacture its own stronger interpretation.

The record identifies the request and mode, carries source and claim context, and preserves the answer body. Artifact records identify such outputs as text, diagrams, images, image prompts, audio, scripts, storyboards, captions, transcripts, alt text, issue drafts and saved-note drafts. Conditional speech and provider fields explain how an enabled capability was used. Token receipts, privacy state, terms state and action records make the consequences of that work inspectable. Issue-mining and observability context supply safe operational references where applicable.

Required, conditional and optional fields have different purposes. A text-only answer need not invent an audio object. A speech answer cannot omit the synchronization and retention information that makes its audio acceptable. Safe provider execution context belongs to a provider-backed request without disclosing credentials or raw provider payloads. Public diagnostics should not expose private request details merely because the internal record has an identifier for them.

### 3.2 Ownership and validation

The [manifest-driven architecture](manifest-driven-service-architecture.md) separates routing, provider capabilities, retrieval, answer generation, orchestration, speech, visuals, issue drafting, notebooks, terms, accounting, privacy, observability, actions, final validation and rendering. Each owns a narrow responsibility. Retrieval establishes the source context; the answer engine selects supported wording and claim context; artifact producers inherit that context; accounting records permitted work; the action broker controls side effects; the renderer presents validated results.

The [service contracts](manifest-service-contracts.md) develop this division into component inputs, outputs and error dispositions. A component result distinguishes a valid value from warnings and errors, and an error identifies the field or condition that failed together with an allowed outcome such as omission, text-only fallback, refusal or confirmation. This permits a useful partial answer without pretending that the failed artifact succeeded.

The documents contain both a conceptual flow and a detailed validator order. Those lists are not an executed event trace. In particular, listing a token or privacy validator later in a responsibility map does not authorize charging, retaining or publishing material before preflight. The specific contracts require relevant privacy and terms conditions before effects and validated artifact outcomes before final accounting. A future implementation must demonstrate that ordering rather than infer it from diagram position.

### 3.3 Response classes and incomplete schema joins

Answer-producing endpoints return validated manifests, partial updates or manifest-shaped refusal outcomes. The detailed endpoint contracts also define typed service-terms and service-status objects. The architecture's general statement that every response uses a manifest cannot be used to erase these explicit response classes. The implementation must settle their exact envelope relationship before claiming conformance.

Likewise, the printed manifest JSON sketch is illustrative. Its empty source-route and artifact arrays appear beside a published-corpus label and a nonzero artifact count. Null and placeholder fields in that sketch are not validated launch data. The detailed terms contract also names provider-terms version and acceptance-time fields beyond the shorter manifest table. These differences are preserved as specification joins requiring review; reproducing the sketch verbatim would not prove a valid answer.

The same care applies to failure language. Literal wire fields remain compatibility identifiers. The human explanation should distinguish a check that failed, a check that could not be completed and a request that did not advance. None requires disguising the reason, and none permits a fallback to bypass source authority or the conditions of the requested capability.

## 4. The reader's working interface

### 4.1 Conversation and navigation

The proposed first screen is the working question interface. A central composer, six-mode selector, source and claim strip, source panel, action rail, token wallet and System Card route support the reader's immediate task. A short introduction can explain the service, but the design is conversation-first. Source chips and claim labels need to remain legible on mobile as well as on larger screens.

Ask supplies a direct supported answer. Explain develops a selected concept, page or app guide at beginner, technical or proof-program depth. Find Source identifies the best route and its status rather than returning an undifferentiated list. These modes share the source contract, so a change in explanation depth cannot change what the source establishes.

Compare separates the inherited-physics statement, the local theory statement, the recovery or comparison target and the remaining burden. At the theory's primitive level, inherited laws are comparison or recovery targets rather than premises. Curated external sources can inform that comparison when the corresponding policy exists. An interesting outside framework does not automatically create a new project obligation.

### 4.2 Developing an idea

Triage Idea restates the proposal in controlled terminology, identifies its closest existing home, classifies its relationship to existing work and names the smallest useful next artifact. That artifact might be a definition, equation, source packet, diagnostic target, mockup, fixture or issue draft. The product vocabulary distinguishes already-covered, needs-source, candidate, blocked, out-of-scope and worth-issue outcomes; the detailed engine has its own more specific classification record that must be mapped explicitly.

The practical value of triage is the connection between a question and a tractable next step. A candidate does not become a public theory claim because an assistant can write a persuasive issue body. Duplicate keys, owner routing, source links and the unresolved burden make the proposed work assessable. A user's sketch or private note can explain the idea without serving as independent project evidence.

### 4.3 Available and deferred affordances

Visualize and Listen are limited capabilities with their own source, quality, cost, privacy and presentation conditions. A visible action can be unavailable or draft-only when those conditions are not met. Save note can create a session-local draft while durable cloud storage remains disabled. The interface must explain that difference rather than imply that displaying a button enables the service behind it.

The broader brainstorm includes voice input, image intake, screenshots, documents, app state, avatars and video. The V1 requirements defer those input and production capabilities until their own policies and implementation exist. A screenshot, if later admitted, would disclose visible pixels or state only; it would not establish hidden dynamics. Model-provider switching, authenticated GitHub writing, collaborator queues and automatic issue fixing are likewise outside the narrow initial service boundary.

## 5. Provider capabilities and controlled fallback

### 5.1 Capability before provider invocation

The [provider registry](model-provider-capability-registry-contract.md) describes product capabilities rather than a public menu of model vendors. An entry records the capability, enabled state, allowed modes and artifacts, quality gate, credential boundary, input and output classes, retention and terms state, cost class, fallback, health and safe telemetry. Provider and model identities can be internal implementation details without becoming source authority.

A publicly available provider is not thereby an enabled Archie feature. The requested capability must have a declared quality requirement, permitted data use, cost mapping and valid fallback before it runs. Credentials remain behind the hosted service boundary. Browser JavaScript must not acquire private model keys or make direct public model calls through a hidden service account.

The registry distinguishes required answer and moderation capabilities, speech and caption capabilities conditional on listening, optional internal embedding and reranking capabilities, controlled image generation, and deferred input or video capabilities. This makes dependencies explicit: an audio option needs synchronization and accessible text, while a retrieval optimization cannot become a prerequisite for source authority itself.

### 5.2 A fallback preserves the contract

Fallback is a declared alternative with its own valid output. When high-quality speech is unavailable, the service returns text only and omits the speech charge. It does not substitute a cheaper low-quality speech tier. A missing visual capability can leave a supported diagram specification or text explanation when permitted. Unavailable uploaded-input processing can return a typed-description or excerpt route only when that route is itself allowed.

Internal retrieval can use a permitted simpler method when an optimization is unavailable, while retaining the consequence for retrieval quality. That does not license invented sources or a stronger claim. Moderation, captions and other mandatory conditions cannot simply disappear because a provider failed. The fallback must satisfy the declared source, privacy, quality and terms boundaries; it may explicitly reduce the artifact or claim scope.

### 5.3 Safe execution context

The manifest can report a product capability, health or fallback class, permitted work unit and other safe execution references. It should not expose raw prompts, provider response payloads, credentials or detailed provider billing internals. Required data-use disclosures address what information reaches a provider, whether it is retained or used for training or abuse monitoring, and the applicable notice and deletion limitations.

These are proposed disclosure and enforcement obligations, not assertions that a named provider currently satisfies them. Missing or stale capability, terms, quality or cost information prevents the requested work from advancing. The source-time sandbox and gateway records describe no-call fixture behavior; they are not evidence of live model generation.

## 6. Work accounting, privacy and user control

### 6.1 What the service token represents

The [token and privacy contract](token-ledger-privacy-contract.md) defines a service token as a user-visible accounting unit for heterogeneous work. It is not necessarily a provider's context token. Source lookup, retrieval, answer generation, speech, image generation and future storage can consume different resources, while the service presents a common balance and spending limit.

The proposed wallet shows available balance, subscription grant and renewal, monthly limit, optional per-request cap, auto-fund state and cap, pending holds and completed receipts. An estimate describes the work expected before execution. A hold reserves permitted capacity while that work is underway. Final accounting records the actual permitted charge and releases or refunds unused holds. The receipt identifies safe work units, source classes and artifact counts without reproducing private prompt text.

The sources propose small or near-free navigation costs and larger budgets for broader retrieval or media. They do not establish prices or measured provider costs. The public, supporter, research and collaborator tiers are candidate service scopes. Payment can provide more resources, larger caps or policy-permitted history; it cannot purchase stronger labels or exemptions from unsupported-answer behavior.

### 6.2 Normal work inside configured limits

The intended interface does not interrupt every ordinary action. Ask, Find Source and other permitted work can proceed inside the user's configured limits. Confirmation is required when a request exceeds a cap, introduces an applicable funding event, changes privacy or retention, makes material public or performs a separately controlled action. A broad sentence requiring confirmation for paid effects must be read together with the detailed within-limit rules, not turned into a new prompt for each debit.

Auto-fund is a separate authorization with an explicit cap and terms state. Enabling it differs from using an already-enabled rule within that rule's scope. A request beyond its limit does not silently increase the limit. An insufficient-token response can offer reduced scope, renewal or a permitted funding path while preserving the original request's source and privacy requirements.

Accounting also distinguishes attempted work, completed safe work and omitted or failed artifacts. A declared policy can account for permitted work already completed, but an unavailable speech artifact cannot acquire a speech charge merely because the user requested listening. The implementation must retain the estimate, hold, final charge and refund relationship across refusal, cancellation, partial success and retry.

### 6.3 Minimal retention

The default proposed retention model is deliberately limited. Generated speech is ephemeral. Uploaded image, screenshot and document intake is deferred. Durable notes and account history remain disabled until retention, deletion, export, sharing and storage-cost behavior exist. Transaction records can persist for declared billing, abuse, refund and support purposes without becoming a store of complete conversations.

The service must state whether prompts, failures, source misses, errors and account identifiers are retained, for how long and for what purpose. Logs, receipts, public status and issue-mining reports should use safe identifiers and classes. A safe request identifier is useful precisely because a diagnosis can refer to a request without copying its private text.

Opting into a notebook does not silently opt into public issue publication or project evidence. Public inclusion of user text, media or conversation excerpts requires consent for the actual material and destination. Deletion of a local service record also cannot promise deletion of independently retained public GitHub records or other records governed by their own policies.

## 7. Actions and saved knowledge

### 7.1 From a proposed action to an effect

The [action broker](action-broker-confirmation-contract.md) separates proposing an action, checking its prerequisites, showing its consequences, recording confirmation, performing an authorized effect and returning the result. The preflight identifies the action, destination, visibility, included material, cost bound, retention, terms and credential boundary. Confirmation cannot supply missing source, privacy or terms conditions; those conditions must already be known.

Ordinary source navigation differs from a public or durable action. Opening a supported reading route need not introduce a new permission dialog. Publishing private material, saving beyond the session, increasing a cap or making a credentialed write does. Cancellation and lack of confirmation produce no effect. The action result then records whether an operation completed, was blocked, remained pending or did not run.

### 7.2 GitHub handoff

The initial GitHub path prepares an issue and opens a prefilled URL after explicit review and confirmation. The preview contains the title, body, proposed labels, source context, claim level, closest home, next artifact, acceptance criteria and origin context. It also explains that GitHub login is required, that the issue is public under the stated repository policy, and which user-provided material would be included.

Opening that URL is a handoff, not proof that an issue was submitted. The user completes submission through GitHub. A local draft, an unconfirmed handoff and a submitted public issue therefore have different retention and mining dispositions. Optional receipt linkage uses a safe identifier rather than a transcript of the paid request.

A later authenticated backend writer would require its own permission, credential, audit and revocation model. It is not implied by the prefilled-URL design. The initial service excludes hidden GitHub tokens, autonomous issue comments, commits, pull requests, emails and public posts. These product requirements describe the proposed service's action boundary; they do not themselves execute any external action.

### 7.3 Session drafts and durable notebooks

The [notebook contract](saved-notebook-account-history-contract.md) permits a session-local draft containing a question, answer summary, source links, diagram specification, narration or storyboard text, issue draft or permitted link, reading path and unresolved burden. Such a draft supports continuity during the session without claiming durable storage.

Durable storage is a different feature. It requires an account policy, explicit stored fields, retention and deletion behavior, export and sharing rules, storage costs and an explanation that the note is not project evidence. Exports preserve source routes, claim labels and TeX while stating which ephemeral media are omitted. Sharing and retaining submitted issue links remain subject to the corresponding consent and account policy.

The distinction is epistemic as well as private. A saved explanation can preserve what the service said and where it came from. It does not independently validate that explanation. Promoting private notes or generated artifacts into project evidence requires a separate public or project review path with its own support.

## 8. Speech, visuals and public presentation

### 8.1 Speech as an accessible rendering

The [speech contract](service-native-speech-presentation-contract.md) treats listening as a rendering of displayed text. Answer listening, listening to a selected sphere's associated Markdown portion, and full-document listening initiated from a full-document sphere are distinct scopes. The selected scope determines the text that must remain visible with source labels while audio plays.

The required service-native output is high-quality audio synchronized with displayed verbatim text, captions or transcripts, and basic playback controls. Text segments and timing must cover the spoken content. A hidden summary spoken over a different displayed answer violates that relationship even if both texts are individually plausible. A requested simplification first becomes a separate, identified script or explanation that can then be displayed and spoken consistently.

Generated audio is ephemeral in the initial service. Low-quality generated tiers are excluded; unavailable high-quality output produces text-only fallback. An older allowance for browser or operating-system read-aloud is a compatibility path and does not authorize a degraded service-native tier. Voice selection and speed controls are not initial release requirements beyond the basic accessible playback experience.

### 8.2 Presentation without invented authority

Explanation depth, narration framing and scene framing can change to help a reader understand. They cannot change source chips, claim labels or unsupported-answer behavior. The design does not offer user-selected character personas as a source of expertise. Real-person imitation, implied endorsement and a presentation voice acting as a proof witness are outside the proposed product standard.

Narration scripts, comparison scripts, storyboards and scene beats are preparatory artifacts. They retain captions, source basis and an explicit purpose such as concept explanation, analogy, candidate mechanism or app mockup. Avatars, lip synchronization, persistent presentation identities and finished generated video remain deferred. A storyboard does not imply that video generation or public distribution is enabled.

### 8.3 Visual purpose and provenance

The [visual contract](visual-artifact-contract.md) distinguishes concept diagrams, visual analogies, app mockups, candidate mechanism sketches, publication drafts, route maps and comparison charts. The shorter V1 list includes a subset of these purposes; it does not remove the detailed contract's navigation and comparison uses. A visual record explains its source basis, claim context, caption, practical text alternative, retention and review requirements.

Literal geometry, diagrammatic simplification and analogy must be identifiable. A generated image cannot impersonate a measured diagnostic or a certified solver trajectory. Color should not be the only carrier of essential distinctions when an accessible alternative is practical. The reader should retain the explanation and its sources when an image is unavailable.

Controlled generated images, text-native diagrams and prompt drafts are different outputs with different provider and cost requirements. A publication asset draft remains a draft requiring human review before public use. Unrestricted generation, persistent galleries, finished publication assets and uploaded-image transformations remain deferred until their policies exist. A draft's professional appearance is not approval for publication.

### 8.4 The proposed media standard

The [corporate media standard](corporate-media-standards.md) applies across text, speech, images, diagrams, scripts, captions and other supported media. It requires public-suitable, professional, source-grounded, privacy-safe and rights-aware output and bars fake evidence, deceptive authority and exploitation. Its public-association test is a project product standard, not a claim that every disallowed example is universally unlawful.

The [acceptance examples](corporate-media-acceptance-fixtures.md) include positive, negative and mixed-media cases. Their value is in distinguishing a narrowly refused component from a compliant alternative: neutral narration, a labeled explanation, a redacted draft or a text-only response can preserve useful work. Missing synchronization or accessibility can require changes before an artifact advances. Private publication remains withheld without exact consent and an approved destination.

The accompanying communication-standards research describes source-time disclosure, accessibility, governance and provenance proposals. Provenance mechanisms such as content-origin records can help identify how media was made; they do not prove the scientific content. Conditional support for a provenance mechanism must not be turned into a universal prerequisite for every text answer. Current external legal or standards compliance remains a separate review obligation.

## 9. Feedback and operational evidence

### 9.1 Mining submitted public feedback

The [issue-mining contract](issue-mining-signal-contract.md) connects public feedback to an accountable improvement path. Safe inputs include submitted issue content and links, source and app routes, labels, categories, duplicate references, maintainer dispositions, resolution status and permitted receipt identifiers. Private prompts and unsubmitted drafts do not silently become mining material.

Reports group duplicate or recurring issues, distinguish confusion from defects and unsupported claims from actionable source gaps, and route a smallest next artifact to an owner. They include the report window, frequency, severity, confidence, affected surfaces, representative public links, noise summary and privacy statement. An unclear owner goes to an explicit ownership decision rather than disappearing into an unassigned cluster.

Frequency is an operational count within the report's population and time window. It is not truth. One severe privacy, billing, source-authority or public-action defect can outrank many vague comments. Grouping corrections retain their reasons, and noise classification need not erase the public evidence behind a report. A private-dependent issue requires a permitted public reproduction before it can support a public fix claim.

### 9.2 Observability without private transcripts

The [observability contract](observability-public-status-incident-contract.md) describes events for requests, sources, claims, providers, artifacts, speech, accounting, privacy, terms, actions, issues, manifests, support and incidents. Safe identifiers, capability classes, validator outcomes, fallback classes and receipt references make these events useful without exposing full prompts, account history or raw provider responses.

Public status reports product availability and degradation. Internal diagnostics can be more detailed while remaining redacted. Incident records identify affected surfaces and capabilities, user impact, privacy and billing impact, source-authority consequences, mitigation and the next corrective artifact. Rollback and a provider outage without a valid fallback can require visible incident handling when users are affected.

An unsafe diagnostic should be omitted, aggregated or reported unavailable without suppressing the underlying incident or refusal. Support summaries and mining handoffs follow the same boundary. A provider-health metric or a count of unsupported answers is evidence about service operation, not a scientific acceptance result. The appended development instructions for System Card tracking remain proposed operational content, not evidence of an implemented public dashboard.

## 10. Deployment and contract scaffolding

### 10.1 The selected architectural direction

The [deployment option decision](service-deployment-option-decision.md) recommends a GitHub Pages public entry with a hosted service backend. The entry and browser render public content; the backend owns source retrieval, provider credentials, token authority, action effects, durable state policy and final manifest validation. Background jobs own such tasks as source-index builds, publication of compatible snapshots, signal reports, accounting reconciliation and incident follow-up.

A separately hosted web application remains a possible later form when account or application complexity warrants it. Serverless or edge execution is an implementation pattern within a responsibility model, not the whole model. A managed AI gateway can support provider access without taking over source authority, accounting or action policy. A static local question prototype is rejected as the public service endpoint, while local contract fixtures remain valid preparation.

The architectural direction does not select a host, framework, domain, database, object store, job queue, payment processor, authentication provider, model vendor or media vendor. Those choices remain open in the [deployment architecture](service-deployment-architecture.md). The responsibility boundary must survive whichever implementation is later chosen.

### 10.2 Configuration, environments and rollback

Public static configuration and public service capability metadata are separate from server secrets, operator secrets, regulated user state and ephemeral private content. Secret references point to a host secret manager; a reference suffix does not make a secret value safe to place in a browser bundle, receipt or issue draft. Public status uses a redacted read model rather than monitoring write credentials.

Staging and production require separate source snapshots, provider capability state, terms, accounting modes, issue destinations and status, together with compatible rollback. Source snapshots identify their repository revision, generated artifact references, class counts, visibility policy, freshness and rollback parent. These metadata support traceability; they do not increase the authority of generated material.

Rollback coordinates service code, source indexes, provider capabilities, terms and accounting schemas without pretending they are one interchangeable file. Transaction history is preserved; corrections use refunds or hold releases rather than deleting transactions. Accepted terms history also remains available. A rollback that affects users can require a public-safe incident and mitigation account.

### 10.3 What the scaffold records establish

The [scaffolding record](service-scaffolding-and-fixtures.md) describes schemas and fixtures for manifests, endpoint contracts, source indexes, providers, token receipts, action preflight, terms, status and negative cases. It also describes a local fixture response selector and render model, secret scans, fixture staging and rollback checks, no-call provider gateways, accounting sandboxes, issue-mining sandboxes and confirmation-controlled action fixtures.

Its source-index work includes deterministic exact-content, search, graph and metadata views with source and artifact hashes, canonical parents, authority, visibility and route checks. A bounded local stdio MCP adapter exposes a fixture snapshot through software-client retrieval operations. The separately owned [MCP account](mcp/manuscript.md) develops that retrieval boundary. The parent service must inherit its visibility and source context without confusing a retrieval adapter with an answer-generation service.

These are source-recorded implementation observations, not fresh code execution results in this manuscript. Named staging or rollback scripts can exercise fixtures locally without creating a hosted staging deployment. No-call gateway fixtures do not contact a provider. Accounting fixtures do not process payments. Render fixtures do not prove a complete mobile interface. The original records retain their exact paths, commands and expected negatives so each boundary can later be checked by its own instrument.

### 10.4 From fixtures to public service

The proposed stages proceed from documents and schemas to representative source-index dry runs, fixture-backed response selection, local smoke and rollback checks, provider sandboxes and finally a limited beta candidate. They are maturity stages, not automatic authorization to advance. The next source-time scaffold handoff concerns redacted observability sandbox fixtures; it does not enable real providers, public routes, payments or durable storage.

The beta requirements span source authority, System Card routing, unsupported answers, manifests, provider capabilities, media, privacy, accounting, GitHub handoff, terms, speech, deployment, actions, issue mining, observability and validation fixtures. They require owners and pass/fail evidence for the capabilities offered. Deferred video or uploads must remain deferred rather than being treated as already supported. Conversely, a deferred capability's specialized policy must not be invented as a prerequisite for an unrelated valid text-only response.

## 11. Terms, acceptance and remaining design questions

### 11.1 Feature-specific terms

The [terms and account-policy contract](service-terms-account-policy-contract.md) distinguishes the public site's general legal material from the narrower requirements of an account-based service. Service terms, privacy notices, token and subscription terms, media terms, GitHub handoff notices, notebook terms, support routes, abuse controls and change notices have different roles. Their existence in a requirements list is not evidence that final legal text has been accepted.

Version and acceptance state must be available to the relevant validator without exposing private content. Missing or stale terms block the affected paid, retained, public, media or credentialed feature until its requirements are met. A changed feature or terms version can require re-acceptance. This does not create blanket permission for unrelated actions or make acceptance a scientific endorsement.

The source defines legal-review states as part of its beta gate. No current legal approval, provider-term compliance, refund schedule, jurisdictional rule or public release is established here. The final review must examine the actual offered feature, its data flow and its adopted terms. The manuscript preserves that obligation without inventing a universal legal conclusion from a product fixture.

### 11.2 Specification differences requiring resolution

Several differences are explicit in the source set: older and newer mode labels; the Ask source allowance; source classes versus primary claim labels; the general manifest-first statement versus typed status and terms objects; abbreviated versus detailed terms fields; conceptual responsibility order versus actual preflight order; and an illustrative JSON sketch versus valid fixture data. A future implementation must decide these joins in their owning contracts and test them. An editorial synthesis cannot settle them by silently selecting whichever statement makes the interface simpler.

Other open choices concern source maturity for a public answer, host and framework, path or subdomain routing, provider disclosure, free and paid scope, GitHub identity, speech and image providers, image retention, System Card presentation, source-index ownership, incremental artifact updates, notebook export and deletion, and safe retention of issue metadata. These are product or engineering decisions. None is resolved merely by naming a module or writing an attractive example answer.

## 12. Preserved development lessons

### 12.1 Explanation and evaluation

The development records show repeated attention to making technical material understandable. Historical bright-first-reader and inline Plainly conventions were later changed or retired. Their chronology illustrates that a communication rule can be useful in one stage without becoming permanent policy. Current operator communication follows its current owner; this manuscript does not revive an old rule or edit agent memory.

The Greek pronunciation work supplies a related evaluation lesson. Early voice and letter auditions, a complete baseline set, correction of a pronunciation, human acceptance, accent auditions and final production were separate stages. Transcription and silence measurements supported review but did not replace human pronunciation judgment. Reusing accepted audio bytes and retaining rejected attempts preserved the difference between an accepted asset and an unsuccessful experiment.

The final recorded licensing decision was narrow: it applied to the identified final set of browser and production audio files, not automatically to raw attempts, rejected outputs, code, third-party material or future media. That history is preserved in the [work log](work-log.md). It does not establish a deployed service speech pipeline, invite new audio generation or supply a general rights warranty.

### 12.2 A coherent service without stronger science

The product's central design inference is that a shared source and answer record can preserve meaning across multiple useful surfaces. The source chip, spoken text, visual caption, token receipt and issue draft concern the same answer while serving different purposes. Keeping their responsibilities explicit makes failures local and understandable: a missing audio capability can leave a valid text answer; a private draft can remain useful without public submission; an unsupported theory claim can lead to a precise source or proof burden.

This inference remains an architecture argument until implementation demonstrates the required behavior. It would be overturned in practice by an artifact that changes source authority, a fallback that bypasses consent or terms, a charge disconnected from permitted work, a private record entering public evidence, or a release claim based only on fixture success. The documented contracts identify where those failures must be detected. Their local scaffolding provides a preparation route, while scientific obligations and public service acceptance remain with their own evidence and decisions.
