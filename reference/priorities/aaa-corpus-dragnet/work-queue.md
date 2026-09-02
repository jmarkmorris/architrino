# Corpus Dragnet Work Queue

This is the canonical execution ledger for accepted read-only correlation passes. A pass may write only to this lane's durable recommendation and work log files; it must not edit the inspected corpus.

## Ranked Next Objects

1. `run_first_cross-corpus_correlation_pass` — [CD-002](#cd-002--run-first-cross-corpus-correlation-pass). Status: `Queued`.

## Queued

### CD-002 — Run first cross-corpus correlation pass

- **Status:** Queued
- **Priority object:** `run_first_cross-corpus_correlation_pass`
- **Request / acceptance:** Run one bounded, read-only pass across the baseline roots. Record only findings with exact paths, relationship evidence, a bounded proposed destination, and an untriaged disposition.
- **Evidence / blocker:** No finding may be treated as a correction or added to another queue without human or authorized-owner triage.
- **Completion:** The ledger contains a dated pass receipt, including a clear no-findings result when appropriate, and every retained finding meets the required fields.

## Awaiting verification

No rows.

## Verified

No rows.
