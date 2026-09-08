# Option B: design for gradual adoption

**Status: design proposal for review, September 8, 2026.** This document does not authorize production implementation, migration, installation, or Git publication. No production action occurred in this task between the mistakenly dispatched production instruction and its withdrawal: no tools were called in that interval. Subsequent work consists of read-only inspection and this task-output design. Other tasks' edits are not attributed to this task.

The [approval and pilot review](option-b-approval-and-pilot-review.md) updates the approval recommendation below: use the existing operator-attributed GitHub route where its evidence is adequate; separate signing infrastructure is optional. Both documents remain proposals.

## 1. Recommended approach and evidence boundary

Adopt one complete dependency chain at a time, with a single authoritative relationship representation and an explicit transfer of each current responsibility. Preserve the exact-byte review boundary, independent scientific checks, retained evidence, and the existing publication process. Add readable relationship changes and impact queries to make review more informative. An accepted baseline must identify both the examined bytes and the authority that accepted them.

The objective is better protection of reasoning and evidence, visible dependencies and changes, recoverable historical context, and trustworthy review. Time savings are not an adoption criterion. Runtime, storage, and maintenance observations describe tradeoffs only.

The fictitious trials measured useful graph traversal, historical source retrieval, stale-binding rejection, exact-file receipt binding, recorded-result checks, and baseline-relative review reports. They also demonstrated why these mechanisms must remain distinct. A changed assumption or a deleted dependency can be self-consistent and still require review. A hash refresh cannot establish that the change is correct. The final fictitious report preserved the byte-change boundary while explaining graph changes, but did not authenticate baseline authority or integrate with a production consumer. See the [fixed-baseline report](../evidence/option-b-fictional-baseline-review.md) for its cases and limitations.

The design below is a proposed contract, not a claim that production already meets it. Its adoption claim would be falsified by a source or relationship change becoming accepted without the required review, an executed-check claim lacking matching evidence, or failure to retrieve a declared retained source. Stage-specific tests below make these observations reproducible.

## 2. Existing authority and what B would own

A knowledge object is a selected equation occurrence, assumption, derivation, calculation specification, result, or check obligation. A relationship states a particular connection between identified versions of objects. A snapshot is a coherent set of their files at one Git revision or one frozen candidate manifest. A candidate manifest is a sorted inventory of paths, file modes, byte sizes, and SHA-256 digests, captured for examination. Neither a relationship nor a snapshot implies mathematical acceptance.

Live reads for this design established the following limited integration facts:

| Existing owner or implementation | Fact supported by the read | Design consequence |
| --- | --- | --- |
| `reference/priorities/app-equation-mapping/contracts/registry-and-authoring-contract.md` | The contract makes canonical Markdown and its ordinary equation links authoritative for stable semantic occurrence IDs; its generated registry is read-only. | Reuse each existing occurrence ID through a deterministic namespace mapping. Do not assign another independently editable equation ID or duplicate formula text. Distinct occurrences are not silently equated mathematically. |
| `scripts/pr-validation-receipt.mjs`, `captureValidationState`, `verifyValidationReceipt`, and `runValidationAndWriteReceipt` | The inspected functions bind staged-index/working-overlay state and a validation contract, check staged/worktree agreement, and compare state before and after execution. | Extend the existing receipt consumer after verification. A B subreceipt supplements selected coverage; it does not replace repository-wide state checks or publication authority. |
| `reference/op/git/git-backed-knowledge-architecture.md`, sections A and B | A supplies current pin/check responsibilities; B is the accepted future direction with production deferred. | Inventory each responsibility before transfer. Preserve historical pins rather than treating all hashes as replaceable current metadata. |
| `reference/op/machine-artifact-retention.md` | Compact evidence and necessary fixtures have separate roles from ignored bulk artifacts and reproducible views. | Store authoritative records and compact evidence under existing retention rules. Graph indexes are disposable. A fingerprint is not a retained copy. |
| `AGENTS.md` and `requirements.txt` | Python must use the shared environment; the inspected requirements file does not list RDFLib. | Runtime preparation remains a later authorized stage. Scratch-local RDFLib success does not establish deployment-host support or authorize a shared install. |

These reads are not a completed consumer inventory. They do not establish which production chain is suitable, that every pin is current, or that the generated equation registry is fresh. Stage 1 must establish those facts against live files. Current architecture and campaign documents remain owned by the originating documentation task; this design is supplied for integration there.

| Responsibility | Authoritative representation after a scoped cutover |
| --- | --- |
| Equation text, local explanation, existing occurrence identity | Existing canonical Markdown and equation-link contract |
| Newly captured assumptions/derivations and their selected source bindings | One versioned object record per identity, pointing to canonical source |
| Declared relationships among migrated objects | One JSON-LD relationship record set; no second editable adjacency list |
| Check implementation and independent expected results | Existing executable/check owners, referenced by stable check IDs |
| Review authority and accepted baseline | Authenticated approval evidence plus an independently trusted scope policy |
| Exact examined state and actual execution | Existing publication receipt, with a verified B coverage attachment |
| Historical evidence and bulk artifacts | Existing retention owners, with verified retrieval references |
| Search index and direct graph edges | Rebuilt views from authoritative source and records |

## 3. Proposed relationship schema

Use a local versioned JSON-LD context and a strict JSON validation schema before RDFLib parsing. JSON-LD supplies graph representation; the validation schema constrains required fields, types, uniqueness, and supported values. Reject unknown context/schema versions, remote or nested context overrides, duplicate JSON keys, duplicate record identities, undeclared fields, unresolved endpoints, invalid selectors, and invalid revisions. Loading must perform no network fetch or record-supplied command execution.

The following field design is normative within this proposal. Final namespace and file locations must be chosen once from the Stage 1 inventory; that placement choice must not create a second authority.

| Record | Required fields and meaning |
| --- | --- |
| Package header | `schemaVersion`, one bundled `@context`, `scopeId`, and records. The scope ID names the bounded adoption scope, not a declaration that every relevant dependency has been discovered. |
| Object | Stable `@id`, allowlisted `@type`, opaque `revisionId`, `sourceBinding`, and an existing claim/status reference when applicable. No free-standing approval boolean. |
| Source binding | Repository-relative path; selector kind and stable selector ID; selector-contract version; `selectedBytesSha256`. The snapshot manifest supplies the exact whole-file identity. |
| Relationship | Stable relationship `@id`, immutable `revisionId`, `kind`, `fromObject`, `fromRevision`, `toObject`, `toRevision`, and a `justification` source binding. The endpoints are typed URI references in the local context. |
| Check obligation | Object identity plus an allowlisted `checkId`, explicitly declared coverage relationships, and an independent-reference binding. Commands come from the trusted check catalog, not graph text. |
| Calculation run | Distinct activity identity, exact input-version bindings, implementation reference, and receipt reference. A calculation specification is an object; an actual run is an activity. |
| Result | Object identity, source/artifact binding, and a generation relationship to the producing run. A recorded result is not verified merely because its generating activity is named. |
| External retained artifact | Content digest, byte size, retention-owner reference, supported locator, and retrieval-verification evidence. Locator availability is checked separately from record validity. |

For the first chain, the allowed object kinds are `Assumption`, `EquationOccurrence`, `Derivation`, `CalculationSpecification`, `Result`, and `CheckObligation`; `CalculationRun` is an activity record. `dependsOn` joins knowledge-object versions; `usesInput` starts at a run and ends at an input object version; `generatedBy` starts at a result and ends at a run; `checks` starts at a check obligation and ends at an examined object version. Reject endpoint-kind mismatches. Each snapshot contains exactly one selected revision per included object/relationship identity, and every versioned endpoint must resolve in the snapshot or in an explicitly identified, retained boundary-input snapshot. The latter is reported as a boundary, never silently loaded from current working files. Required execution/check selection still follows the trusted scope obligations, not the mere presence of a relationship.

Start with a small relationship vocabulary: `dependsOn` for an asserted prerequisite, `usesInput` from a run to an input version, `generatedBy` from a result to a run, and `checks` from a check obligation to the object version it examines. `justification` points to the reasoning or contract for each relationship. A prose citation is not automatically a prerequisite. PROV-compatible views may map run input/generation relations to PROV predicates after mapping tests; the design does not claim formal PROV conformance.

Store each relationship once. Replace the prototype's duplicated `dependsOn` list plus `dependencyRevisions` map with explicit endpoint/version fields in relationship records. Generate convenient direct RDF edges for traversal from those records in memory. The generated adjacency view is never edited or treated as separate authority. A uniqueness rule rejects duplicate `(kind, fromObject, fromRevision, toObject, toRevision)` relationships; one relationship may cite multiple justification locations rather than duplicating the edge.

`revisionId` is an opaque immutable identifier, not a global sequence number. When an object's selected source, type, or binding changes, assign a new revision; unchanged object versions keep theirs. Relationship additions, removals, endpoint changes, or justification changes are independently visible. Remove an edge from the current snapshot through a reviewed change; its prior record remains recoverable in Git. Never reuse a prior object or relationship version ID for different content. Across divergent branches, conflicting reuse or divergent baseline ancestry blocks acceptance until explicitly reconciled.

Existing equation occurrence IDs map deterministically into the selected URI namespace; the mapping rule is schema-owned and tested, not a manually maintained second table. Reuse adequate non-equation IDs where found. Assign new IDs only for objects lacking suitable existing ones. Claim grades and unresolved scientific status remain with their current owners; graph records reference them or supply only a missing field with one declared owner. No graph migration upgrades a claim.

### Source selectors and exact bytes

Use the existing equation occurrence link as a selector where its contract is adequate. Bind assumptions and derivations to an existing stable anchor where unambiguous; otherwise the eventual chain implementation may introduce one reviewed selector in canonical source. Do not require corpus-wide marker insertion. Record selectors as stable identities, not line numbers; lines are display hints.

A selector implementation returns one contiguous byte interval from the exact file bytes. `selectedBytesSha256` hashes that interval with no Unicode, whitespace, newline, or TeX normalization. The selector contract states whether delimiters are included. Missing, ambiguous, overlapping where prohibited, or unsupported selectors fail. Whole-file SHA-256 remains in the review manifest, so important prose outside selected intervals still triggers review even when no object-level impact can be inferred.

The prototype's LF-marker text-extraction contract is evidence for a narrow invented format only. Production selectors must be tested independently on known Unicode, CRLF, repeated-equation, fenced-example, rename, and malformed cases before real use. A cosmetic or mathematically equivalent rewrite still changes bytes; review may classify it, but an automatic hash update must not.

## 4. Trusted baseline and approval boundary

An explicit commit ID prevents a baseline ref from moving silently; it does not establish that the commit was reviewed. The proposed production acceptance consumer therefore takes its baseline and approval policy from trusted state outside the candidate it is judging. Ordinary exploratory queries may select any revision, but must label it as caller-selected and cannot report it as accepted.

For each adopted scope, maintain one authenticated baseline descriptor: repository identity, scope ID, full accepted commit ID, candidate-manifest digest, approval-evidence digest, predecessor baseline, and governing policy version. The operator initially establishes the repository identity, authorized reviewer identity, scope, and initial accepted baseline through the existing explicit review/publication process. No baseline may be bootstrapped merely because a candidate calls itself reviewed.

The proposed approval evidence is a signed envelope binding the repository, scope, predecessor baseline, candidate-manifest digest, review-report digest, required receipt digests, reviewer identity, decision, and policy version. Verification uses an operator-established verification identity obtained independently of the candidate. The acceptance verifier and its helper/policy identities are likewise taken from the trusted preceding state or a separately reviewed installation, not executed from candidate-controlled replacement code. This design does not choose, create, read, or install private keys. Selecting the existing supported signing/identity mechanism and demonstrating its verification is a Stage 1 prerequisite; lack of such a mechanism blocks trusted acceptance, not local draft queries. A candidate cannot alter the trusted verifier, authorized identities, scope, or review requirements to approve itself. Changes to that policy are evaluated under the preceding trusted policy and require the operator's separate policy decision.

The operator remains the merge gate. Agent reports can supply evidence and recommendations; they do not become approval by writing `reviewState: approved`. Signing authenticates an authorized statement about exact bytes, not mathematical truth. A compromised authorized reviewer or host remains outside what digest checks can prove.

### Proposed state transition

1. Resolve the accepted baseline from trusted state and verify its approval chain and retained commit. The scope lists exact inputs and permitted inventory rules, required checks, boundary dependencies, and retention obligations. A missing or ambiguous baseline fails accepted-mode processing.
2. Capture a candidate manifest from immutable input copies. Compare the union of baseline and candidate inventories, so deleted records, scope entries, source files, and relationships cannot disappear from review. Proposals to reduce scope are reviewable changes governed by the prior scope. Files outside the adopted scope remain under current A/publication checks.
3. Validate both snapshots, report source and relationship changes, and select required checks from both graphs and the trusted catalog. Execute checks against the captured candidate; create evidence receipts only after completion and state-stability verification.
4. Present the exact source/record diff, removed and added relationships, affected objects before and after, uncovered obligations, results, and retrieval evidence to the authorized reviewer. Every changed input byte requires a disposition, including formatting changes. A disposition can be concise; it must identify the exact candidate and the reason for accepting its implications.
5. Verify an approval envelope for that candidate. At the existing publication boundary, recheck candidate bytes, approval, check receipts, policy, and baseline. A later edit invalidates the approval rather than refreshing it. Operator review and publication authorization remain separate from a successful check.
6. Advance the baseline only after the authorized publication process verifies the resulting commit's selected manifest. Approval records bind the input manifest rather than the hash of the commit containing themselves, avoiding a self-reference. The resulting full commit ID is recorded in the subsequent trusted baseline descriptor. If the final commit or merge result differs in scope, it needs new checks and review.

Approval envelopes, derived reports, and receipt outputs are excluded from the scientific-input manifest only by fixed prior policy, preventing recursive hashing. They are independently digest-bound, signature-verified where applicable, and included in the existing publication-state capture as appropriate. The candidate cannot expand exclusions to hide inputs. A B manifest is a scoped coverage identity; it never replaces the existing repository-wide candidate identity.

For competing candidates, baseline advancement uses a predecessor comparison: if another candidate has advanced the baseline, the later candidate must compare against the new accepted state and repeat affected review. Divergent histories require an explicit merge/reconciliation decision; “newest timestamp” is not an acceptance rule. Pending work is not committed or overwritten by the query tool.

## 5. Queries, freshness, and historical retrieval

Expose a small readable interface for: current declared dependents of an object; dependents at an explicit historical commit; changes against the accepted baseline; selected check coverage; and retrieval of a selected prior source. Every report includes repository/scope, actual commit or candidate manifest, schema/context identity, consistency status, approval status, and coverage limits. “No declared dependents in this scope” is the correct negative answer; “nothing depends on it” is not.

Validate source associations and endpoint revisions before returning ordinary graph answers. A stale draft may produce a diagnostic with the source mismatch, but not an unqualified dependency answer. Historical queries read source, records, context, and schema from the same resolved commit. Old snapshots retain their original interpretation contract. If the reader does not support that version, report unsupported history; retrieve raw bytes for inspection without silently interpreting them through the newest schema.

A change report lists object additions/removals, selected source text before/after, relationship additions/removals, changed endpoint versions and justifications, and file changes outside known selectors. Determine affected declared dependents from the union of old and new graphs. This preserves the effects of an edge that has just been deleted. List paths explaining why an object was included. Cycles are displayed as cycles; traversal must terminate, and no cycle is treated as a valid proof.

For a changed assumption, show the actual before/after assumption, all declared affected objects, and uncovered check obligations. For an omitted edge, show the removed edge and the old dependent path even if the new graph is internally valid. Completeness still needs human review: a dependency missing from both snapshots produces no edge diff.

Historical retrieval uses retained Git blobs or verified retained external artifacts. Verify the retrieved bytes and selector before showing the earlier source. Missing objects, shallow history, missing artifacts, or unavailable schema return explicit failure. A SHA-256 value alone cannot reconstruct content. Recover through the retention owner's retained repository/archive copy, then verify digests. Do not rewrite historical evidence to make current readers succeed. Re-execution of historical code is a separate controlled operation; retrieval does not run it.

## 6. Check selection and receipt semantics

Keep scientific checks with their existing owners and independent references. B identifies obligations and records coverage; it does not invent a weaker replacement oracle. The chain's check catalog reuses an adequate existing catalog where available and has one allowlisted executable entry per check ID, with exact implementation/helper dependencies, parameter contract, independent reference, supported environment, and declared covered objects. Graph records cannot supply arbitrary shell commands.

Select checks using changed objects and the union of old/new impact paths plus explicit `checks` relationships. This replaces the prototype's hard-coded result-to-calculation selection. Deleting a check edge or check record does not remove the prior obligation: the baseline obligation persists until reviewed retirement. A changed source outside selectors invokes the scope's conservative default checks and review; unknown coverage cannot become a pass. Checks may be required even without a source edit when implementation, inputs, reference, environment, or policy changes.

Distinguish `required`, `selected`, `executed`, `passed`, `failed`, `skipped`, and `unavailable`. The acceptance consumer rejects unfulfilled required checks. Any waiver or obligation retirement is an explicit scoped review decision under the trusted policy, never an empty successful test list. Preserve the prohibition on changing an independent oracle together with its subject and calling agreement independent evidence.

| Receipt field group | Proposed binding |
| --- | --- |
| Identity | Version, repository/scope, accepted baseline ID, candidate-manifest digest, check-policy version, and exact schema/context file identities |
| Inputs | Exact file bytes, paths, modes, sizes; separately named selector-byte digests; external artifact digests and verified locators |
| Instruments | Exact checker, extractor, runner, helper, and independent-reference identities, including the implementation actually invoked |
| Environment | Supported Python/runtime identity, platform, resolved dependency versions and distribution/artifact identities, lock/requirements identity, and declared relevant environment settings without secrets |
| Execution | Check ID, structured invocation, exact input parameters, actual start/end and exit outcome, selected cases, coverage, result/reference comparison, and retained output digests |
| Integrity | Candidate state before/after execution, explicit completion status, and local or authenticated producer identity with its honest trust boundary |

Hash exact stored file bytes. Do not hash normalized JSON and label it a file digest. If a deterministic manifest serialization is used for the aggregate digest, specify that serialization separately and verify the raw per-file hashes it contains. A receipt never hashes itself. Timestamps and host-specific metadata are execution facts, not a promise of byte-identical reruns.

The existing publication runner should consume the B coverage record through one adapter and include its contract/evidence identity in receipt validation. Do not add a parallel publish command or a second acceptance receipt that can override the existing gate. Bind the Python and B instrument contract explicitly; the inspected Node/Git state fields alone do not demonstrate that coverage. Rerun on any mismatch. Frozen candidate inputs plus final state comparison prevent concurrent edits from being mistaken for examined bytes; the runner must execute those frozen inputs rather than dereference the mutable checkout during checks.

On an unsupported host, report unavailable required checks and route execution to the supported shared environment. Do not use system Python as a fallback, install dependencies implicitly, or call a partial run green. Installation and host provisioning would need the later authorized implementation scope. Dependency resolution must follow the live environment owner; this design does not install a package or prescribe an unverified version.

## 7. Staged adoption plan

All stages below describe future work requiring explicit production implementation authority. The current task completes the design only. Each stage has an exit condition; no stage is an invitation to leave two editable metadata systems active indefinitely.

### Stage 1 — Map one current dependency chain and its review authority

**Change:** inspect one candidate chain from assumption through equation, derivation, calculation, result, and an independently justified check. Prefer a chain with existing stable equation identity, retrievable source, a current consumer, and a bounded executable reference. Do not choose a historical-only oracle merely because its fixtures are convenient. Produce exact source/consumer/pin/receipt/retention paths, identity mapping, scope boundary, current owner, and approved trust-policy mechanism. This design deliberately names no production chain as selected because that inventory has not been performed.

**Responsibility replaced:** none. The inventory explains which later B component could assume each responsibility. For every pin, classify current review boundary, historical scientific identity, generated-output freshness, environment selection, or receipt state binding. A relationship table alone is not this classification.

**Protections retained:** every existing pin, check, source, publication rule, and retention obligation. Preserve concurrent owners and their uncommitted work.

**Verification:** retrieve the designated prior source; run the existing check's known reference on its supported host; manually enumerate expected dependency paths and failure cases; identify all consumers and binders for the selected files. Record search commands and scope with inventory claims. Establish an independently verifiable reviewer identity and initial baseline; do not infer either from candidate metadata.

**Failure/recovery:** missing independent evidence, an unavailable consumer, unresolved pin purpose, conflicting ownership, or unverifiable review authority leaves the chain under A. Resolve the specific obligation or select another suitable chain; do not repin historical material.

**Expansion condition:** one complete, bounded chain is mapped and its baseline/trust contract is reviewable. This stage permits preparation of that chain only, not repository-wide scanning into automatic conversion.

### Stage 2 — Establish the bounded schema and supported reader

**Change:** implement the minimal reader, local context, validation schema, selectors, graph queries, and baseline-report interface for the selected contract, initially against known and fictitious cases. Prepare the supported dependency environment through its owner. The source-binding and relationship serialization become one tested implementation contract.

**Responsibility replaced:** no production enforcement yet. Generic graph parsing/traversal is delegated to RDFLib; the repository retains responsibility for its scientific vocabulary and checks.

**Protections retained:** A remains the production authority. No generated corpus file is hand-edited, and the prototype's permissive field behavior is not adopted.

**Verification:** known-case controls precede target tests; exercise strict schema validation, offline parsing, exact byte identities, safe path handling, immutable revisions, old/new traversal, and unsupported-history diagnostics. Demonstrate the authenticated baseline/approval verifier on invented approvals, including rejection of a forged identity and an altered payload.

**Failure/recovery:** reader or environment failure yields unavailable, never accepted. Use the existing supported workflow while the defect is repaired. Preserve failed evidence; do not silently select another interpreter or schema.

**Expansion condition:** the bounded contract and trustworthy review interface pass the adversarial matrix below. No performance threshold is required.

### Stage 3 — Represent and review one real chain alongside A for a finite trial

**Change:** author the selected JSON-LD records and source selectors under existing ownership, reusing adequate identities. Read and review one unchanged state and controlled proposed changes against the explicit baseline; run the unchanged independent checks and retrieve a historical source. The new representation is a candidate for adoption, not an alternative approval path.

**Responsibility replaced:** manual assembly of the chain's dependency/change report. A still decides the existing enforcement obligations. New B relationship fields are authored once; any temporary A-compatible projections are derived from those fields, never separately editable.

**Protections retained:** all prior checks, exact-byte review expectations, historical evidence identities, and operator review. A rejects remain rejects until their cause and intended replacement are resolved.

**Verification:** the human-specified chain matches the graph; removed relationships remain visible; changed assumptions show old/new text and affected obligations; the recorded result is independently checked; complete required coverage and actual review evidence bind the same candidate. The trial ends after the agreed case set and review, not after an unspecified period of parallel use.

**Failure/recovery:** a disagreement stops the affected candidate. Keep A authoritative, preserve the proposed B records as a clearly non-accepted draft or remove that current draft through a scoped reviewed edit if the trial is abandoned. Never rewrite the evidence of the failed trial or restore files over another agent's work.

**Expansion condition:** every existing responsibility has a verified B successor or an explicit retained owner, and the single-chain review has passed. Unresolved overlap prevents cutover.

### Stage 4 — Transfer one chain's enforcement and retire its redundant current metadata

**Change:** connect B baseline review and coverage to the existing receipt consumer. In one reviewed change, switch the declared current consumers to B and retire the exact superseded current relationship representation and its redundant query/binding code. Keep independently necessary content or instrument pins with their owners.

**Responsibility replaced:** only the inventoried current-source relationship/review bindings and selected report/query paths whose obligations B now demonstrably enforces. Historical pins, scientific references, generated registry ownership, and repository-wide publication state capture are not replaced by this cutover.

**Protections retained:** authenticated review, raw file identity, independent checks, prior obligation selection for deletions, exact final candidate verification, and retrieval. The existing publication process remains the only publication path.

**Verification:** exercise the real receipt adapter with changed candidate bytes, stale baseline, forged review, missing required checks, interrupted execution, changed checker, and concurrent edits. Verify selected consumers no longer read a competing editable record source. Check deletion/rename inventory against both snapshots. Verify the actual resulting commit at any later separately authorized publication rather than relying on its message.

**Failure/recovery:** before cutover, A remains authoritative. After cutover, a broken B acceptance path blocks new acceptance while source and history remain readable. Recovery is a scoped reviewed correction or explicit transfer back to a retained/reconstructable A implementation for the affected obligation, with one authority at a time. A fallback must not approve a candidate that failed B's required review. Never silently regenerate old pins to match new bytes.

**Expansion condition:** the one-chain production consumer, trusted review, independent checks, receipt binding, and historical retrieval are verified end to end, and no unresolved duplicate authority remains. Publication is still a separate invocation.

### Stage 5 — Expand by bounded current-consumer groups

**Change:** select the next connected group from the live obligation inventory and repeat Stages 1, 3, and 4 using the proven contract. Extend the schema only for a concrete uncovered responsibility. Review cross-boundary edges and required external inputs explicitly; an unmigrated dependency is not absent.

**Responsibility replaced:** the named current metadata/query responsibilities for that group, recorded in the same adoption plan. Each cutover removes the replaced editable source and its obsolete callers. Historical bytes remain historical, not a competing current authority.

**Protections retained:** all previous groups' acceptance/retrieval contracts and current A obligations outside the migrated scope. A schema upgrade must preserve old interpretation or provide an explicit tested historical reader; it cannot rewrite the old evidence.

**Verification:** repeat meaningful adversarial cases for the new boundary, detect cross-scope missing inputs, prove selected consumer routing through code reads/tests, and retrieve retained prior source. Check that scope reduction, omitted relationships, and changed check selection remain visible under the preceding policy.

**Failure/recovery:** isolate failure to its scope, retain the prior accepted baseline, and leave the new group under its existing authority. An interdependent change that cannot be isolated must be reviewed as a combined candidate rather than accepting a half-updated graph.

**Expansion condition:** the group's obligation inventory is fully dispositioned and every transferred obligation has a verified consumer. No blanket “migrated repository” claim follows from the first passing group.

### Stage 6 — Close the agreed adoption scope

**Change:** reconcile the initial scope against all migrated groups, documented exclusions, and retained historical responsibilities. Update the canonical architecture/campaign owners and current operational instructions. Remove unused transition adapters when their declared last consumer has moved.

**Responsibility replaced:** the temporary migration plan becomes a completion record; ongoing operation uses the existing architecture and validation owners. Do not keep this task output as a second evolving policy after its accepted content is integrated.

**Protections retained:** retained scientific evidence, schema/history readers required by current recovery needs, independent checks, and trusted baseline/receipt contracts.

**Verification:** enumerate actual current consumers, confirm a single editable authority per responsibility, test current/historical retrieval and acceptance failures, and record any remaining exclusions as exclusions rather than completion. A historical artifact need not be made into current metadata to close the scope.

**Failure/recovery:** unresolved obligations remain explicit and keep the relevant scope open. Retention changes follow their owner; there is no automatic cleanup of valuable reasoning, Git history, or evidence.

**Completion condition:** all agreed current responsibilities are transferred or explicitly retained with an owner, obsolete current duplicates are retired, and evidence supports the stated scope. This is not a condition on reduced time or storage.

## 8. Required verification cases

Independent expected answers must be written before executing each new instrument on the chosen chain. A copy of a graph's own output is not a reference. Manual expected edge sets, literal arithmetic cases, an established theorem, and the existing independent check each have different evidentiary roles.

| Case | Required observation | Protection or limit |
| --- | --- | --- |
| Unchanged accepted snapshot | Consistent, exact baseline match; authority verified separately | No invented new approval |
| Harmless prose outside selectors | Whole-file change and review needed; no unsupported claim of graph impact | Preserves A's byte boundary |
| Unrecorded equation/assumption edit | Stale binding rejects ordinary graph answer | Freshness before use |
| Refreshed hash after assumption edit | Consistent but still review-needed; assumption and old/new dependents visible | Metadata cannot approve meaning |
| Self-consistent deleted dependency | Removed edge, old path, prior check obligations, and review requirement persist | Deletion cannot erase review scope |
| Added relation or changed endpoint version | Explicit edge/version diff and affected objects | Informative review |
| Wrong recorded result with refreshed metadata | Independent result check fails | Source correspondence is not correctness |
| Duplicate IDs/edges, dangling endpoints, malformed selector | Structural rejection | Unambiguous interpretation |
| Cycle | Terminating query and explicit cycle display | No inference of valid circular proof |
| Missing obligation or deleted check mapping | Prior required check remains unresolved until reviewed retirement | No empty-success selection |
| Checker/reference/helper/environment change | Old execution evidence invalidated; review/check requirements applied | Exact instrument and environment coverage |
| Forged signature, edited approval label, replaced trust policy | Trusted consumer rejects | Candidate cannot choose its authority |
| Stale or substituted baseline, unrelated branch | Explicit rejection or exploratory-only label | No silent review-baseline change |
| Candidate changes during/after run or approval | Receipt/approval invalidated; no baseline advance | Examined state equals accepted state |
| Scope/path deletion, rename, symlink escape | Union inventory detects deletion/rename; unsafe path rejected | No hidden input loss |
| Prior source retrieval | Exact earlier bytes and context recovered at explicit revision | Recoverability, not just a fingerprint |
| Missing history/artifact/unsupported schema | Clear failure, no current-state substitution | Honest historical answer |
| All metadata and arithmetic outputs updated consistently but reasoning invalid | Remains a human review obligation; do not claim automatic detection | Semantic completeness is unproved |

Review results must name both detections and gaps. A green structural subset is not overall health, and an unavailable check is not a pass. Test results retained from the fictitious prototype support only that prototype; this design's production matrix has not been executed.

## 9. Proposed implementation boundaries and decisions before execution

The eventual implementation should have a thin command interface and focused modules for schema/context loading, source binding, Git snapshot retrieval, graph/review reporting, trusted approval verification, and coverage/receipt integration. Reuse the existing check implementations. Do not develop a general external graph product or introduce a database service.

Candidate placement for later review is `scripts/knowledge/` for the focused Python implementation, `tests/knowledge/` for known/adversarial fixtures, and one source-owned JSON-LD collection for the selected chain. These paths are proposals only: Stage 1 must check live directory conventions and ownership before selecting exact files. Existing integration targets include `scripts/pr-validation-receipt.mjs` and the owning check-catalog/runner paths found by inventory. Changes to them must be announced and coordinated before any later edit. No files at these paths were created or modified by this design task.

Three decisions need concrete Stage 1 evidence, not another redesign of B: select the first chain and its current owners; choose the supported authenticated approval/verification mechanism and operator trust root; and select canonical placement/reuse for the discovered IDs and current records. The contract above defines the required behavior for each choice. None is resolved by assuming that the fictional `example.invalid` namespace or a caller-selected `HEAD` is production authority.

The parent should integrate accepted schema and plan content into `reference/op/git/git-backed-knowledge-architecture.md` and its campaign checklist. This task does not edit those concurrently. Production remains deferred until separately authorized; accepting this design does not silently execute its stages.

## 10. Parent integration summary

Proposed canonical relationship records have stable identities, immutable versions, explicit typed endpoints and endpoint versions, and source-backed justification. They replace the prototype's duplicate adjacency/revision map. Existing equation occurrence IDs and canonical Markdown remain authoritative; direct graph edges are disposable derived views. Exact selector-byte digests and whole-file receipt digests have separately specified meanings.

An accepted baseline is supplied by independently trusted scope/policy state, not by the candidate. Authenticated approval binds the exact candidate manifest, predecessor baseline, report, required checks, and policy. Candidate-byte changes, obligation deletions, or a changed checker cannot be approved through hash refresh. Baseline advancement occurs only after the authorized publication process verifies the resulting commit against the approved manifest; the operator remains the merge gate.

Adoption proceeds from one inventoried chain through schema/reader verification, a finite alongside-A trial, atomic transfer of named responsibilities into the existing receipt consumer, and bounded expansion. Every stage retains independent checks and historical evidence. Replaced current metadata has an explicit retirement condition; historical bytes are not renamed into current authority. The gain sought is better protection and more informative review, not faster review. The remaining unproved properties are semantic completeness, production trust integration, and execution across supported hosts; the stated tests and stage exits address what can be verified without overstating those limits.
