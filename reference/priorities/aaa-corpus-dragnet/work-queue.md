# Corpus Dragnet Work Queue

This is the canonical execution ledger for accepted Corpus Dragnet actions. Each queue item states its own edit authority, inspected scope, owner routes, and completion conditions.

## Ranked Next Objects

### CD-Q-001 — Duplicate-concept map

- **Status:** queued
- **Scope:** published and internal, with cross-corpus links only where both sides are in the declared population
- **Population:** authored Markdown under `content/markdown/aaa/` and active supporting or owner documents under `reference/`, excluding generated, historical, archived, local, dependency, binary, and Dragnet control/output surfaces
- **Method:** identify path-specific near-duplicate or conceptually overlapping passages, then inspect each candidate for independent support, standalone-reading need, owner-to-consumer relation, and claim-grade difference; model similarity is candidate evidence only
- **Confidence rule:** retain only high- or medium-confidence relationships under the Recommendations Ledger; omit thematic resemblance without a concrete path relationship
- **Owner route:** route each retained relationship to the existing canonical or active owner; do not merge, demote, or change claim grade within this item
- **No-finding behavior:** record the scanned roots, exclusions, snapshot, method, and threshold in `work-log.md`, stating only that no qualifying finding was found within the boundary
- **Completion:** receipt, retained recommendation identifiers or explicit no-finding receipt, exact source roles, uncertainty, falsifier, and no unapproved edits

### CD-Q-002 — Terminology-drift map

- **Status:** queued
- **Scope:** published and internal authored Markdown, with canonical terminology authorities opened as needed
- **Population:** authored documents in the declared roots, excluding historical and generated surfaces unless a retained occurrence must be classified as provenance
- **Method:** exact and normalized searches for superseded, ambiguous, or locally inconsistent terms; inspect every candidate in context and distinguish scientific terminology from ordinary or effective-level language
- **Confidence rule:** retain path-specific high- or medium-confidence findings only; a string match alone is not a correction
- **Owner route:** route each finding to the terminology authority and the document owner; wording changes require a later authorized item unless already granted by the accepted queue scope
- **No-finding behavior:** record a bounded no-finding receipt with the exact search families and exclusions
- **Completion:** occurrence inventory, local classifications, source roles, claim grades, falsifiers, owner routes, and recommendation dispositions or no-finding receipt

### CD-Q-003 — Published-to-internal support routes

- **Status:** queued
- **Scope:** published claims and their identified internal support owners
- **Population:** selected published Markdown roots plus active internal owner and supporting documents named by the route search; exclude external pages and unread endpoints
- **Method:** identify published assertions whose stated derivation, evidence, or support route is missing, stale, or points to a non-owner; inspect the internal candidate for actual support and independence
- **Confidence rule:** distinguish measured route absence from inferred support weakness; retain only path-specific medium- or high-confidence findings
- **Owner route:** route to the published document owner, internal support owner, or existing priority lane; do not promote internal material or alter scientific claim grade
- **No-finding behavior:** record the route population, exclusions, and bounded no-finding conclusion
- **Completion:** route map, exact anchors, source-role classification, independence assessment, falsifiers, recommendations, and receipt

### CD-Q-004 — Internal results without identified future destinations

- **Status:** queued
- **Scope:** active internal results, derivations, measurements, and validated implementation evidence that may have a future corpus or owner destination
- **Population:** active `reference/` owner documents and explicitly named supporting evidence, excluding historical, revoked, generated, and local-only records
- **Method:** identify results whose current owner, intended corpus destination, or downstream consumer is absent or ambiguous; distinguish an intentionally internal result from an unowned routing gap
- **Confidence rule:** do not infer publication readiness from discoverability; retain only relationships with exact source paths and a named uncertainty or consequence
- **Owner route:** route to the existing owner or record a policy-routing recommendation when no suitable owner exists; no new workstream is created by the scan
- **No-finding behavior:** record that no qualifying destination gap was found within the declared active population
- **Completion:** result inventory, current owner and possible destination, claim grade, evidence boundary, falsifier, route, and receipt

### CD-Q-005 — Overlapping task ownership

- **Status:** queued
- **Scope:** active priorities, queues, trackers, and related workstream records
- **Population:** active priority-owner directories and their linked task, queue, and chronology files; exclude dormant, historical, generated, and unrelated implementation surfaces
- **Method:** compare task wording, acceptance authority, inspected population, completion conditions, and owner assignments; distinguish genuine overlap from deliberate dependency, handoff, or shared evidence
- **Confidence rule:** retain only path-specific medium- or high-confidence ownership relationships; similar topic labels are insufficient
- **Owner route:** route to the named existing owners or to the policy-routing item when a new workstream may be warranted; do not reassign tasks within this scan
- **No-finding behavior:** record the active owner population, comparison fields, exclusions, and bounded no-finding result
- **Completion:** overlap matrix or equivalent exact mapping, disposition candidates, falsifiers, owner routes, and receipt

### CD-Q-006 — Link and generated-source distinctions

- **Status:** queued
- **Scope:** authored links, generated derivatives, and their declared canonical sources
- **Population:** selected authored Markdown and the generated/source metadata required to classify each relationship; exclude external endpoints unless separately authorized
- **Method:** distinguish stale or incorrect authored links from parser false positives, generated drift, historical bindings, and valid source-to-derivative relationships; inspect the actual generator or checker contract before recommending repair
- **Confidence rule:** a parser report alone is insufficient; retain only path-specific findings with source-role and canonical-owner evidence
- **Owner route:** route stale links to the authored owner and generated ambiguity to the generator/source owner; do not run generator `--write` or edit generated artifacts in this scan
- **No-finding behavior:** record the checked link classes, generated declarations, exclusions, and bounded no-finding result
- **Completion:** exact link/source map, classification, checker or generator evidence, falsifier, route, and receipt

### CD-Q-007 — New-workstream recommendation routing

- **Status:** queued
- **Scope:** findings produced by the six scan families above
- **Population:** retained high- or medium-confidence recommendations with no clearly suitable existing owner or queue destination
- **Method:** create a queue item describing the finding, future work, evidence boundary, proposed owner, and decision required; compare the case with existing owner routes before recommending a new workstream
- **Confidence rule:** a recommendation may identify an organizational gap but may not create authority, change ownership, or create a new workstream by itself
- **Owner route:** operator or designated owner decides whether to accept a new workstream, route to an existing owner, or reject the recommendation
- **No-finding behavior:** record that every retained finding had a suitable existing owner or that no qualifying new-workstream case was found
- **Completion:** exact finding links, future-work description, alternatives considered, decision owner, falsifier, and disposition

### Cadence and capacity rule

- Run one bounded scan family per active review cycle unless the populations and outputs are explicitly independent.
- Revisit a family when its evidence or owner landscape materially changes; if the lane remains active, perform a broad coverage review approximately quarterly.
- Soon-to-expire excess tokens may support low-risk read-only inventory or preparation, but token availability does not determine scientific priority, claim disposition, ownership changes, or substantive edits.
- An **executable object** is an accepted queue row with bounded scope, method, authority, and completion evidence. It may use existing repository queries or a purpose-built helper program; a program is an implementation aid, not the queue object or its authority.

## Queued

All seven rows above are queued and await an explicit selection of the next bounded scan family.

## Awaiting verification

No rows.

## Verified

No rows.
