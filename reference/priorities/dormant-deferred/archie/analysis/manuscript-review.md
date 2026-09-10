# Independent Archie parent manuscript fidelity review

## Review scope and initial candidate

This is an independent editorial source-fidelity review of [the manuscript](../manuscript.md) and [source coverage](manuscript-source-coverage.md). The review freshly read all 31 parent originals before opening either candidate. Nested MCP was excluded because it has a separate accepted owner. The review does not assess hosted service operation, scientific validity, implementation correctness, current legal compliance, license effectiveness or release readiness.

The initial manuscript is SHA-256 `b54e24ec3c96bc031215d182571e0736b3f2232d54d5279623fde041b75f46ae`, 293 lines / 46,772 bytes. Initial coverage is `e2a05d5cef97e11ed98ba2961a8a3293f76c471b2ccd578aaeabe12275774702`, 93 lines / 37,017 bytes. Both initial files are retained in `.tmp/priority-manuscript/archie-parent-review/`. Preparation was deliberately not read, so author extraction did not substitute for independent original reading.

Before source-body reading, native `shasum -a 256 -c` passed all 31 live original hashes and all 31 author snapshot hashes. Native `rg --files`, immediate-parent filtering, C-locale sorting and `cmp` established the exact original path set, excluding nested files and the new manuscript. Native `wc` measured 7,620 lines / 644,317 bytes. After complete source reading, all live baseline hashes passed again. These instruments establish identity and scope, not semantic fidelity by themselves.

## Complete reading receipt

All following ranges were read freshly in untruncated native outputs, including every prose paragraph, table row, code example, fixture prompt, queue entry and historical handoff. The saved reading checkpoint records source-specific obligations and successive counts. There are **31 full, 0 partial and 0 unread parent originals**. Counts do not credit any outside linked body.

| Original | Fresh complete ranges |
| --- | --- |
| action-broker-confirmation-contract.md | 1–224 |
| ai-communication-standards.md | 1–174 |
| answer-artifact-manifest.md | 1–280; 281–552 |
| answer-engine-source-contract.md | 1–204 |
| assistant-mode-contract.md | 1–259 |
| brainstorming.md | 1–15 |
| corporate-media-acceptance-fixtures.md | 1–102 |
| corporate-media-standards.md | 1–87 |
| inline-plain-explanation-plan.md | 1–98 |
| interface-brainstorming.md | 1–230; 231–459 |
| interface-product-plan.md | 1–123 |
| interface-work-log.md | 1–38 |
| issue-mining-signal-contract.md | 1–258 |
| manifest-driven-service-architecture.md | 1–170; 171–307 |
| manifest-service-contracts.md | 1–190; 191–360; 361–526 |
| model-provider-capability-registry-contract.md | 1–221 |
| observability-public-status-incident-contract.md | 1–288 |
| priorities.md | 1–82 |
| saved-notebook-account-history-contract.md | 1–232 |
| service-deployment-architecture.md | 1–241 |
| service-deployment-option-decision.md | 1–166 |
| service-native-speech-presentation-contract.md | 1–268 |
| service-platform.md | 1–100; 101–201 |
| service-scaffolding-and-fixtures.md | 1–145; 146–291 |
| service-terms-account-policy-contract.md | 1–251 |
| source-ingestion-retrieval-context-contract.md | 1–236 |
| token-ledger-privacy-contract.md | 1–190; 191–335 |
| v1-product-requirements.md | 1–190; 191–380; 381–570; 571–760; 761–950; 951–1056 |
| visual-artifact-contract.md | 1–209 |
| work-log.md | 1–25 |
| work-queue.md | 1–92 |

The frozen manuscript was then fully read at 1–100, 101–200 and 201–293; coverage at 1–32, 33–64 and 65–93. Targeted original rereads subsequently confirmed the exact findings below. Linked implementation code, JSON fixtures, audio files, historical primary standards, legal pages, scientific derivations and nested MCP bodies remain unread in this independent parent review. No service, test, provider, payment, media-generation, scientific or external action was executed. Previously read shared campaign/style owners are procedural context, not newly verified application evidence.

## Findings submitted before author repair

### AP-F1 — Preserve the stricter displayed-image alt-text rule

Initial coverage's visual-contract row says that generated user-display images require practical alt text. The [visual contract](../visual-artifact-contract.md), line 84, explicitly makes alt text required for generated images intended for user display; line 123 separately qualifies generated-image and mockup alt text with “when practical.” The distinction is material because the current coverage can be read as allowing practicality to excuse the stronger required field.

Requested repair: explicitly retain both formulations and mark their join unresolved, preserving the stronger displayed-generated-image requirement. The manuscript's general accessible-text discussion can remain concise if coverage states this exact supporting obligation. This is source preservation, not a new accessibility mandate or an assessment of existing UI behavior.

### AP-F2 — Name the narrower image and publication-draft consent rules

Chapters 6–7 correctly preserve ordinary authorized work within configured limits and action-specific consent. The broad paid-action/within-cap join is already explained. The initial coverage does not explicitly retain two narrower source rules: [token ledger](../token-ledger-privacy-contract.md), line 107, prompts for generated images unless account policy permits silent low-cost work, whereas [V1 requirements](../v1-product-requirements.md), line 557, permits generated-image auto-run inside configured limits; token-ledger line 110 additionally requires a prompt before meaningful publication-asset-draft work.

Requested repair: add these exact source-specific rules and the unresolved image-account-policy join to coverage. Do not silently adopt one rule as the consolidated specification, infer that every debit needs consent, or apply prospective product rules to this authorized editorial task.

### AP-F3 — Preserve two additional exact schema joins

The manuscript properly treats the printed JSON as illustrative and rejects automatic schema conformance. Two verified differences still require explicit supporting disposition. [Answer Artifact Manifest](../answer-artifact-manifest.md), line 241, describes quality-gate results as passed, failed, unavailable or downgraded, while its JSON sketch at line 445 uses `not_required`. [Manifest service contracts](../manifest-service-contracts.md), line 89, lists nine `ConfirmationReason` values and omits `terms_acceptance`, which the [action broker](../action-broker-confirmation-contract.md), line 100, explicitly includes.

Requested repair: record both differences as unresolved specification joins. Neither observation establishes a defect in the unread executable schema, requires an automatic enum extension or authorizes changes to the historical original.

## Bidirectional substantive audit

The source-to-destination comparison checked every original against the coverage row and the manuscript chapter it names. The reverse comparison checked the entire manuscript's declarative claims against those freshly read originals. Detailed fields, enums, fixtures, dated commands and repetitive gates can remain at explicit supporting owners; this avoids creating a competing executable specification. The three findings above concern specific lost or softened distinctions within that otherwise appropriate disposition.

| Subject | Independent assessment of the initial manuscript and supporting coverage |
| --- | --- |
| Source authority and mode vocabulary | Chapters 1–4 preserve retrieval eligibility, source assertion, proof support and action permission as distinct. Generated copies route to authored parents; app diagnostics, priority material, external comparisons and excluded model memory retain their bounds. Six older behavior identifiers are not silently equated with the six product modes. Ask's app-guide allowance, seven primary labels versus mixed fixture-label columns, native stance versus proof status and label-floor naming receive explicit dispositions. |
| Manifest and service boundaries | Chapter 3 preserves a shared answer context without calling it proof. Required and conditional fields remain separate; partial/refusal and typed terms/status responses survive the general envelope claim. The 17-stage conceptual flow, 12 summary validators and 15 detailed validators are not treated as an executed order. Terms/privacy/action preflight and validation before final charges remain binding. AP-F3 requests two additional explicit schema differences. |
| Product completeness and brainstorm branches | Chapters 4–8 and 11 retain all six modes, fourteen V1 capability sections, proposed four tiers, controlled visuals, narration/storyboards, notebook drafts, feedback and operational functions. The 25 product tracks and 16 brainstorm modules have manuscript destinations or detailed supporting ownership. Seventeen deferred capabilities and sixteen V1 prohibitions remain proposed product limits, not new restrictions on the present task. |
| Provider and cost behavior | Chapters 5–6 preserve product capabilities versus provider availability, no-call fixtures versus generation, server-side credentials, data-use notices, quality/fallback gates, service tokens versus model-context units, estimates/holds/final charges/refunds, explicit attempted-provider policy, no speech charge for omitted audio and no payment-based authority. Costs and tiers remain unpriced proposals. AP-F2 retains narrower image/draft consent rules. |
| Public actions and private continuity | Chapters 6–7 preserve authorized ordinary within-cap work, action-specific consent, capped prior auto-fund authorization versus new authorization, external-pending GitHub prefill versus submission, and exact private material/destination disclosure. Session drafts are not durable storage. Retention/delete/export/share policy, external deletion limits, billing metadata and not-project-evidence status remain intact. |
| Speech and visuals | Chapter 8 preserves answer, selected-sphere portion and full-document-sphere listening as three distinct scopes; displayed verbatim text, synchronization, captions, high-quality-only speech, text-only fallback, ephemeral audio and basic playback. Separate simplification scripts do not become hidden speech text. Browser/OS compatibility does not authorize low-quality service speech. Seven visual purposes versus the shorter five-item V1 list, publication drafts, neutral presentation, deferred personas/video/uploads and rights/proof boundaries are retained. AP-F1 addresses the precise alt-text join. |
| Feedback and status | Chapter 9 preserves public submitted signals versus excluded private/unsubmitted data, frequency versus truth/severity, duplicate/noise dispositions, nine owner lanes, smallest next artifacts and public reproduction. Safe telemetry, product status, incidents and redaction do not become scientific evidence. Unsafe disclosure does not suppress the incident. Appended System Card instructions remain proposed dashboard content. |
| Deployment and local scaffold | Chapter 10 preserves five deployment alternatives and the recommended static entry plus hosted backend as a draft architecture decision. Staging/production, configuration classes, source snapshots and compatible rollback retain separate owners and transaction/terms history. Source-time local stdio MCP runtime is acknowledged; fixture HTTP selection has no hosted handlers, provider gateways make no calls and ledger fixtures process no payments. Representative snapshots are not complete corpus enumeration; named-client conformance and runtime source-context population remain unresolved at supporting owners. No fresh code evidence is claimed. |
| Standards, audio and history | Chapters 8, 11 and 12 keep source-time communication-standards research conditional rather than current universal law. All historical audio phases and item-specific final 24-file CC0 dedication are retained in coverage with original commands/diagnostics/hash owners. Human acceptance differs from transcription/silence measurements and from installation authorization. Raw/rejected/third-party/code/future material is excluded from the narrow dedication; no new audio playback or legal finding is claimed. Retired bright5/Plainly history does not revive a rule. |
| Dormancy and execution | Source active metadata and rank/ROI remain historical tracker data inside a dormant directory. All twelve queue objects retain source statuses: ARCH001/004 in progress, ARCH002 queued, the remaining nine deferred; no verified row is invented. Completed audio ARCH013 is not restored. Theory readiness remains separate from platform readiness. No queue, original, nested MCP or global file was edited by this reviewer. |

The source-ingestion introductory four-tool list and scaffold's later five-tool list also remain supporting versioned descriptions, not a new consolidated protocol claim; the parent manuscript deliberately makes no exhaustive tool-list assertion. The same discipline applies to abbreviated tables and future prompts. Their presence in a source is not permission to execute them.

## Validation and presentation limits

The reviewer-authored `check-review-scope.mjs` passed known cases before target use: a five-byte UTF-8 string with two line feeds, a no-final-line-feed example and the independently known SHA-256 of `abc`. Its receipt then verified all 31 live and snapshot digests, exact retained parent path lists and the native 7,620-line / 644,317-byte totals. This is metadata verification, not independent scientific computation. Native hashes also confirmed the initial candidate identities above.

The author/coordinator report known-case-first local-link and mathematical checks, maintained full rendering of one manuscript math expression and zero coverage expressions, no omitted images, and no whitespace diagnostics. Those execution receipts are attributed to the author/coordinator; this reviewer did not rerun their full rendering instrument or inspect its code. The reviewer independently viewed the saved 1280×720 `intro-excerpt.png`: complete section 1.1, all three paragraphs, the stylized theory expression and both footer lines were legible and unclipped, with the initial manuscript hash visible. This is bounded manuscript presentation review, not full-document/mobile QA or a running application check.

## Verdict state

Initial review requires the three narrow supporting repairs AP-F1–AP-F3 above. No remaining substantive manuscript claim upgrade or other omitted source family was identified in the declared full reading. This observation can be overturned by a precise unmatched original passage or unsupported manuscript assertion. Final closure awaits the repaired frozen coverage, exact delta inspection and preserved-original/candidate checks. Editorial closure will not constitute scientific, service, legal or launch acceptance.

## Final repair verification and frozen editorial verdict

The coordinator repaired coverage only. Native `git diff --no-index` against the reviewer's retained initial coverage showed exactly one visual-row replacement and two added join paragraphs; every changed line was independently read and compared with the original passages identified in AP-F1–AP-F3. AP-F1 now preserves the required displayed-generated-image alt text and explicitly rejects a practicality exemption while retaining the source wording tension. AP-F2 now names default image prompting, the limited account-policy exception, V1 within-limit automatic work and meaningful publication-draft prompting without adopting a new uniform product rule. AP-F3 now names both exact printed schema mismatches and explicitly declines to call them runtime-schema defects. **All three findings are closed.**

The final reviewed manuscript remains `b54e24ec3c96bc031215d182571e0736b3f2232d54d5279623fde041b75f46ae`. Final reviewed coverage is `e2dbfa12dc475d207b11f5cc7b38f0032dd2c58132897ffc82fe2e7d71ee32ff`. Native SHA-256 and the final known-case-first scope checker confirm these identities, all 31 live and snapshot original digests, and unchanged original totals. The initial nine-entry author freeze describes the earlier candidate; it is not silently extended to the repaired coverage. Both initial and final coverage bytes are retained in reviewer scratch.

The coordinator attributes a new full repaired-coverage render with zero math expressions/omitted images, 33 existing local links and no whitespace diagnostics. The unchanged manuscript retains the independently viewed section 1.1 image. The reviewer fully self-read this report before adding the closure receipt and read this final receipt after writing; native no-index whitespace inspection supplies no diagnostics for the review report. No source, author candidate, preparation, nested MCP, queue, scientific artifact or application was changed by the reviewer.

**Final result: no remaining actionable editorial source-fidelity finding within the declared complete 31-original parent scope.** This closes the bidirectional manuscript/support review at the exact final identities above. It does not validate unread implementations or primary legal/standards sources, confer scientific acceptance, authorize hosted operation or resolve the explicitly preserved design/schema conflicts. Coordinator acceptance and any navigation bookkeeping remain separate actions.
