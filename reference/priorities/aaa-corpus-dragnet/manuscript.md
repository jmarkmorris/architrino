# Corpus Dragnet: Evidence, Relationships and Editorial Decisions

## 1. The purpose of corpus correlation

### 1.1 Finding relationships that can be checked

A growing knowledge corpus can contain related arguments whose connection is not explicit, several accounts of one concept, incompatible terminology, or references that no longer identify the responsible document. Corpus Dragnet is the repository's method for finding such relationships and making them reviewable. Its subject includes published explanations and internal research, design and operational material. The method asks what relationship can actually be observed, what each source is authorized to establish, and who can decide whether a change is warranted.

An observable relationship is more specific than thematic resemblance. Two passages may use the same term under incompatible definitions; a claim may point to a document that does not own its evidence; an apparently obsolete path may be an intentional historical binding. Each case needs the exact source locations and enough local context to distinguish an editorial problem from a legitimate difference of role. A model's impression that two documents are similar is a candidate for inspection, not a finding by itself.

The method does not grant a search worker general authority over the corpus. An accepted execution item defines the inspected scope, permitted changes, responsible owners and completion conditions. A pass may be read-only, or that item may explicitly permit bounded implementation and disposition. Neither form permits an independent change to a scientific claim grade, publication status or document ownership beyond its accepted scope. A useful relationship can therefore be recorded while the decision about its consequences remains open.

### 1.2 Correlation is not scientific corroboration

Two documents can agree because one copied the other, because both use a common argument, or because each independently establishes a result. These are different evidentiary relationships. Repetition alone cannot identify which one applies. Removing a repeated passage can also remove a definition needed for standalone reading or erase the distinction between an original result and a later consumer.

The same limit applies to several scouts returning the same concern. Agreement among models is not independent evidence for the underlying claim. A scout can help locate material, but the cited sources and the independence of their arguments determine what the relationship supports. The workstream is model-neutral: the source suggests economical workers for repeatable bounded actions, without measuring their superiority or making model output an authority surface.

## 2. The roles of sources

### 2.1 What a document can own

A source role identifies the kind of authority a document has in a particular finding. A canonical published source owns its reader-facing explanation. A strategy or execution ledger owns the relevant workstream's direction or task state. A current architectural decision or operating procedure governs only the decision or procedure it explicitly addresses. An internal supporting document can carry a derivation, proposal or retained observation, with the grade and limitations it declares.

A generated derivative has a different role from its authored source. A historical record can establish what was recorded at an earlier time without becoming the current scientific or procedural owner. An implementation file can provide concrete secondary evidence about a candidate without automatically owning the published explanation. These distinctions prevent a search from treating every matching file as an interchangeable vote.

Source roles must be confirmed for the actual relationship under review. Placement inside an active priority directory does not by itself make every supporting statement established theory. Conversely, a historical literal may be essential to reproducing an earlier record even when it differs from current terminology. The method therefore routes a finding to an existing owner and preserves the qualification that makes each source useful.

### 2.2 Evidence grades and confidence answer different questions

Scientific claim grade describes the basis of a claim: derived, measured, inferred or guessed. A terminology or organization finding can be scientifically not applicable while still carrying a measured string inventory and an inferred editorial consequence. Confidence describes how securely the finding's path-specific relationship and source roles have been established. It does not upgrade the physics contained in either source.

The local finding contract admits high confidence when the relationship is directly observable and the source roles are confirmed. Medium confidence still requires path-specific evidence, but records uncertainty about ownership, consequence or destination. Low-confidence resemblance, unsupported model inference and themes without a concrete relationship do not enter the durable recommendations ledger.

Confidence can also differ within one finding. The presence of a phrase may be directly measured while the suitability of a replacement requires interpretation. An acceleration-level passage and an observer-level force output can contain the same word without having the same editorial obligation. The finding must retain that distinction, including an observation that would overturn the proposed replacement.

## 3. Designing a bounded pass

### 3.1 Fixing the inspected population

A pass begins with a declared population of sources. The retained baseline uses tracked regular files in the current checkout, records the commit and any modified tracked paths within the resolved set, and excludes untracked and ignored material. Its published root is the authored textbook corpus. Its internal roots cover architectural decisions, design, learning, operations, priorities and research records. The exact root and exclusion lists remain in the [pass chronology](work-log.md).

The active priority-owner rule in that baseline selects immediate priority directories containing a strategy tracker and excludes the dormant parent. The pass must resolve and record the actual owner set rather than assume it remains unchanged. That is a rule for the recorded scan, not a license to reinterpret the lifecycle of every document encountered.

Exclusions are part of the observation. The baseline separates generated and derived surfaces, archives and parked material, Dragnet's own control records, implementation and validation surfaces, local state, dependencies and binary/media assets. An exact implementation file may be opened as secondary evidence for a candidate already found in the primary roots, with its role labeled. That limited allowance does not turn an entire codebase into an implicitly inspected source population.

The first completed correlation pass added explicit exclusions for Braid Program and Borg. Its reported total therefore describes that selected population. The earlier scout survey used another boundary. Comparing their file totals cannot establish that one covered the other or performed a more complete review.

### 3.2 Choosing methods and inspecting their limits

The retained pass combined exact terminology searches, normalized paragraph comparison, relative-link checks, former-owner path searches and a check against an already routed URL inconsistency. Each instrument produced a different kind of candidate. Exact matches located wording; paragraph groups suggested duplication; link parsing suggested unreachable destinations. None of these outputs settled the final interpretation without source context.

The paragraph comparison considered sufficiently long normalized passages and inspected the returned groups. Repeated role instructions were templates. Repeated equations could support local self-containment or an explicit owner-to-consumer relationship. Declared promotion provenance explained another overlap. These rejected candidates illustrate why a matching string is not a sufficient reason to merge documents.

The link pass produced apparent missing targets from mathematical bracket-and-parenthesis syntax. The source reports that these were parser false positives and that a separate strict content instrument checked canonical Markdown links. Repairing the apparent targets would have changed valid text in response to a parser error. Likewise, old owner paths inside immutable evidence bindings were retained as provenance rather than treated as current routing defects.

An existing recommendation can also explain a match. The recorded apex-versus-subdomain URL inconsistency had already been measured and routed by an operations inventory. Re-entering it as a new finding would have duplicated a disposition rather than discovered an unowned problem. The general requirement is to inspect the role and prior route of a candidate before deciding what its apparent novelty means.

### 3.3 What a negative result establishes

A pass that retains no findings records the inspected roots, exclusions, snapshot, methods and confidence threshold in its chronology, leaving the recommendations ledger unchanged. Its conclusion is bounded: no qualifying finding was found within that declared population and method. It does not establish that the entire corpus lacks duplication, terminology drift or missing connections.

The same discipline applies to an excluded endpoint. A Markdown-only survey cannot establish the contents of an unread test, data file or external page. A missing documented closure record is a statement about the documentation searched, not proof that no such record exists anywhere. These limits are part of the result, including when the result is otherwise useful for deciding what to inspect next.

## 4. From a finding to a decision

### 4.1 A durable recommendation

A recommendation preserves enough information for a later reader to reassess it: the pass and receipt, exact locations, source roles and claim grades, observable relationship, supporting evidence, confidence and uncertainty, bounded consequence and suggested owner route. Its status distinguishes untriaged, accepted, rejected and superseded findings. The [recommendations ledger](analysis/recommendations.md) retains these records after triage rather than deleting them.

The suggested route does not create a task or authorize an edit. The disposition records the owner or authorized integrator's decision, including an accepted destination or rejection reason. This separation allows the corpus to retain a useful observation without prematurely deciding whether text should move, merge, change or remain as it is.

When an accepted item authorizes implementation, the resulting edit must still remain within its declared relationship and scope. A wording repair does not independently validate an equation. A link repair does not promote the target's claim grade. The evidence record should make both the positive change and its limit inspectable.

### 4.2 Terminology as a contextual classification

The first retained example concerned two technical passages whose delayed-interaction terminology conflicted with the repository's language rule. The recorded disposition used finite-memory terminology in one passage and receiver-delayed/transmitter-future-directed wording in the other. The source reports preservation of the equations, local derived grades and proof scope. This is an example of a bounded editorial correction, not a new derivation or a fresh verification of those passages here.

The acceleration-first example required a more discriminating classification. Its pass counted nine active occurrences across six files and three further occurrences across two revoked historical files. The active master-equation uses described acceleration contributions; one benchmark phrase could instead refer to effective plate-force bookkeeping, and a dated log phrase raised a chronology question. Exact occurrence counts, file counts and replacement eligibility were therefore recorded separately.

The later authorized resolution reports acceleration terminology for the master-equation consumers and plate-response terminology for the effective benchmark, while deliberately preserving the three revoked-history occurrences. This does not imply that all force language is erroneous. Force remains a possible higher-level bookkeeping concept; the finding concerned the context of the retained phrases and the acceleration-first substrate rule. A local demonstration that a particular row is an effective assembly output would overturn the recommendation to replace that occurrence as a primitive contribution.

The reader-facing example concerned an undefined organizational metaphor. The source reported twenty-three singular uses across eleven published files, including five reaction-provenance uses. Their replacements depended on whether the passage meant a section, a domain's chapters or an observer-level prediction source. A separate plural phrase describing application search values was deliberately excluded. The example shows why a global text substitution would have erased distinctions that the correction was supposed to clarify.

## 5. Reading historical survey evidence

### 5.1 A decision index is not a current scientific inventory

The [retained scout report](evidence/luna-corpus-dragnet-review-2026-07-31.md) collects fifty-nine historical findings across claim boundaries, repository hygiene, validation coverage, task/blocker reporting and source evidence. It reports five scouts and a Markdown-only survey of 968 files. Its verified label means that a cited Markdown fact was confirmed within that survey; candidate and stronger-review labels retain additional uncertainty. This manuscript does not rerun that survey or authenticate its underlying scout returns.

The scientific entries repeatedly distinguish displayed geometry, prescribed histories, structural checks, mock residuals and benchmark harnesses from realized dynamics, independent acceptance or observer-level recovery. Those distinctions are useful examples of evidence classification. Their particular historical verdicts are retained in the source index, not adopted as a fresh judgment on the current EOM solver, proof programs or applications.

The report also records exclusions: fourteen Markdown citations outside its allowed roots and 965 non-Markdown endpoints were not inspected. Its legacy wake-speed pilot remains historical diagnostic evidence and cannot support a current normalized conclusion without the required rerun. Repeating the report's warning neither performs that rerun nor creates a current physical result.

### 5.2 Chronology, disposition and verification

The local records preserve several stages of work. The strategy's current-summary paragraph still describes the first recommendation as untriaged, and the brainstorm refers to completed baseline and pass objects as present in the execution ledger. The actual retained queue has no rows, while later recommendation dispositions and dated chronology entries record three accepted resolutions. These texts must be read with their roles and dates intact; the older summaries do not create executable tasks or reverse later recorded decisions.

The initial pass paragraphs also preserve their then-untriaged status. Keeping them alongside later triage entries makes the sequence recoverable. It does not require rewriting historical prose to sound current. This account leaves the source bytes unchanged and explains the difference between a pass result, a later decision and the present local execution boundary.

Validation history needs the same care. The terminology-residue log reports a series of passing content checks followed by a fixture-start timeout in an owned-compute test. Its focused rerun still had a failure. The successful subset therefore did not establish that the full content-integrity suite passed. The log calls the failure pre-existing; no causal-history investigation was performed for this manuscript, so that attribution remains the log's report rather than a newly established diagnosis.

Later triage entries report their own scoped searches and successful checks. Those are historical receipts for their recorded edits, not fresh measurements of the current repository. Editorial synthesis preserves which instrument produced each result and does not borrow a later green check to change an earlier failed run.

## 6. Further questions within the method

The method now represents six further scan families as separate bounded work-queue objects: duplicate-concept maps, terminology drift, published-to-internal support routes, internal results without identified future destinations, overlapping task ownership, and link/generated-source distinctions. Each queue object declares its population, exclusions, method, confidence rule, owner route and no-findings behavior. Keeping the families separate preserves attribution when one relationship could otherwise be mistaken for another, such as terminology drift for duplication or a generated-source relationship for a stale link.

The policy rule is now explicit: when a finding may require a new workstream, the finding produces a queue item describing the observed relationship, proposed future work, evidence boundary, possible owner, and decision required. The finding does not create the new owner or task by itself. The value of the method is to make the relationship and its alternatives inspectable while leaving that organizational decision with the appropriate authority.

An executable object is an accepted queue row with bounded scope, method, authority and completion evidence. It may use repository searches, document inspection, existing checkers, or a purpose-built helper program; the program is an implementation aid, not the queue object or its authority. The six scan families are scheduled one bounded family per active review cycle unless their populations and outputs are explicitly independent. A family should be revisited when its evidence or owner landscape materially changes, with an approximately quarterly coverage review while the lane remains active. Soon-to-expire excess tokens may support low-risk read-only inventory or preparation, but they do not determine scientific priority, claim disposition, ownership changes or substantive edits. The manuscript explains the method and retained examples; the queued objects define any future pass without reopening earlier scans, preserving the independence of scientific arguments and the distinction between an editorial relationship and the truth of the theory it connects.
