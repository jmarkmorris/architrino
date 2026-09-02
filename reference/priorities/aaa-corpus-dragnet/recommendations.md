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

No findings yet.
