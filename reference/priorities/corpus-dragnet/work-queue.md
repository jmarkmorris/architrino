# Corpus Dragnet Work Queue

This is the canonical execution ledger for accepted read-only correlation
passes. A pass may write only to this lane's durable recommendation and work
log files; it must not edit the inspected corpus.

## Ranked Next Objects

1. `establish_corpus_dragnet_baseline` — [CD-001](#cd-001--establish-corpus-dragnet-baseline). Status: `Queued`.
2. `run_first_cross-corpus_correlation_pass` — [CD-002](#cd-002--run-first-cross-corpus-correlation-pass). Status: `Queued`.

## Queued

### CD-001 — Establish Corpus Dragnet baseline

- **Status:** Queued
- **Priority object:** `establish_corpus_dragnet_baseline`
- **Request / acceptance:** Inventory the declared published and internal
  roots, define the durable finding fields, and record the exact scan boundary
  and exclusions before analysing relationships.
- **Evidence / blocker:** The baseline must distinguish canonical sources,
  generated outputs, historical records, and active owner documents so later
  scans do not mistake a derivative or archival copy for the source of truth.
- **Completion:** `recommendations.md` has an execution-ready template and the
  work log records the exact roots and exclusions for the first pass.

### CD-002 — Run first cross-corpus correlation pass

- **Status:** Queued
- **Priority object:** `run_first_cross-corpus_correlation_pass`
- **Request / acceptance:** Run one bounded, read-only pass across the
  baseline roots. Record only findings with exact paths, relationship evidence,
  a bounded proposed destination, and an untriaged disposition.
- **Evidence / blocker:** No finding may be treated as a correction or added
  to another queue without human or authorized-owner triage.
- **Completion:** The ledger contains a dated pass receipt, including a clear
  no-findings result when appropriate, and every retained finding meets the
  required fields.

## Awaiting verification

No rows.

## Verified

No rows.
