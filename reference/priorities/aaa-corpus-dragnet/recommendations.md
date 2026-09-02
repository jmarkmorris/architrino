# Corpus Dragnet Recommendations Ledger

This is a durable recommendations ledger, not a change log or an authority surface. Findings remain discoverable after triage. Do not delete a finding; update its disposition and link its accepted destination or rejection reason.

## Finding Format

### CD-YYYY-NNN — Short factual title

- **Pass:** `CD-###`
- **Pass receipt:** dated `work-log.md` anchor
- **Status:** `untriaged` | `accepted` | `rejected` | `superseded`
- **Scope:** published | internal | cross-corpus
- **Relationship class:** duplicate | terminology mismatch | dependency gap | stale routing | organization opportunity | generated/canonical ambiguity
- **Source paths and anchors:** exact relative paths plus headings, keys, or line-stable identifiers when available
- **Source roles:** map each path to `canonical published source`, `active owner document`, `internal supporting document`, `generated derivative`, `historical record`, or `implementation evidence`
- **Claim grades:** map each scientific claim in the finding to `derived`, `measured`, `inferred`, or `guessed`; use `not applicable` for non-scientific routing or organization findings
- **Observed relationship:** concrete duplicate, terminology mismatch, dependency gap, stale routing, or organization opportunity.
- **Evidence:** short path-specific summary, commands, or stable anchors.
- **Confidence:** `high` | `medium`, with a one-sentence reason
- **Counterevidence / uncertainty:** what could weaken the relationship or prevent the proposed route
- **Why it may matter:** bounded consequence; no unproved theory inference.
- **Suggested triage route:** exact owner document or priority lane, or `none`; this field does not create a task or authorize an edit
- **Disposition:** blank until a human or authorized owner records one.

## Admission And No-Findings Rules

A `high`-confidence finding requires a directly observable, path-specific relationship and a confirmed source-role classification. A `medium`-confidence finding requires path-specific evidence but retains a named uncertainty about ownership, consequence, or destination. Do not retain low-confidence similarity, thematic resemblance without a concrete relationship, or model inference without path evidence.

If a pass retains no findings, leave this ledger unchanged and record a dated no-findings receipt in [work-log.md](work-log.md). The receipt must name the scanned roots, exclusions, snapshot, methods, and confidence threshold, and must say only that no qualifying finding was found within that declared boundary.

## Findings

### CD-2026-001 — Disallowed delayed-interaction term remains in two active technical packets

- **Pass:** `CD-002`
- **Pass receipt:** [2026-09-01 — CD-002 first cross-corpus correlation pass](work-log.md#2026-09-01--cd-002-first-cross-corpus-correlation-pass)
- **Status:** `accepted`
- **Scope:** internal
- **Relationship class:** terminology mismatch
- **Source paths and anchors:** `reference/priorities/app-solver/analysis/analysis-transmitter-factor-causal-history-functional.md`, Section 2 `Local regularity at positive widths`, sentence beginning `is a retarded functional differential equation`; `reference/priorities/master-equation-closure/characteristic-tail.md`, Section 16.5 `Scope of the worldline-only no-go`, sentence beginning `With a one-sided ordered interaction domain`; `content/markdown/aaa/archie/academic-style-guide.md`, `Disallowed Terms`.
- **Source roles:** the App Solver and Master-Equation Closure packets are `internal supporting document` files under active owners; the Academic Style Guide is the `canonical published source` for the terminology rule.
- **Claim grades:** the App Solver local-continuation statement and Master-Equation Closure structural no-go are each locally graded `derived`; this terminology finding is `not applicable` to their scientific validity and proposes no claim-grade change.
- **Observed relationship:** two internal technical passages use `retarded`, while the canonical style rule disallows that term and requires causal-delay, delayed, path-history, or causal-wake wording in authored documentation.
- **Evidence:** a bounded exact-term search across the declared pass roots found only these two substantive uses outside the enforcement exception and a historical Photon review sentence stating that its inspected app had no such use. The App Solver sentence can say `finite-memory functional differential equation`; the Master-Equation Closure sentence can say `delayed for the receiver` without changing either mathematical claim.
- **Confidence:** `high`; the two occurrences and the controlling prohibition are exact and path-specific.
- **Counterevidence / uncertainty:** `retarded functional differential equation` and the paired `retarded`/`advanced` terminology are conventional mathematical language outside this repository. That convention does not weaken the finding because the repository rule explicitly rejects the term in authored documentation.
- **Why it may matter:** leaving the terms in active technical packets creates a direct exception to a corpus-wide language rule and makes future terminology audits ambiguous.
- **Suggested triage route:** App Solver and Master-Equation Closure owners; use one wording-only edit in each named passage, with no new queue item or scientific re-adjudication required.
- **Disposition:** Accepted and resolved by the authorized integrator on 2026-09-01. The App Solver passage now says `finite-memory functional differential equation`; the Master-Equation Closure passage now says `delayed for the receiver` and `future-directed for the transmitter`. No mathematical statement or claim grade changed.
