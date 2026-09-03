# Archie Service MCP Adapter Work Queue

This is the preserved execution ledger for accepted MCP adapter work. The Archie-service boundary remains read-only and source-grounded. No row is executable while its parent Archie service remains under `dormant-deferred` unless an operator direction explicitly reactivates that exact row without reopening unrelated Archie work. MCP-004 has that bounded authorization.

## Ranked Next Objects

1. MCP-004 — Private secure-tunnel deployment and real-client verification. Status: In progress by explicit operator reactivation; repository implementation complete, live account activation and client verification pending.

## Queued

### MCP-004 — Private secure-tunnel deployment and real-client verification

- **Status:** In progress by explicit operator reactivation; unrelated dormant Archie work remains parked.
- **Closure goal:** Make the already-working five-tool MCP retrieval engine safely available to authorized remote OpenAI clients without creating a public inbound endpoint, then verify it through real ChatGPT and Codex clients.
- **Implemented boundary:** The current OpenAI `init`, `doctor`, and `run` workflow; a release-current, hash- and attestation-verified tunnel client; exact accepted-`main` and clean-tree checks; complete content integrity; regenerated and checked full-corpus snapshot; five-tool protocol and deterministic-recall checks; loopback-only administration; environment-referenced credentials; separate liveness, readiness, and recent-successful-poll connectivity gates; redacted local receipts; safe status, stop, and restart operations.
- **Capability boundary:** Exactly `search`, `read`, `topics`, `neighbors`, and `walk`; `public` sources only; read-only; repository provenance retained; no hidden material, write tool, model call, external action, credential access, live request-path repository scan, public endpoint, or claim-authority increase.
- **Remaining verification:** Merge the implementation through the accepted workflow; activate it from exact post-merge `main`; have ChatGPT and Codex independently enumerate the exact tool catalog and complete representative search, exact read with repository route, topics visibility, declared-edge traversal, and typed missing-source calls. Local harnesses and tunnel health cannot substitute for these two real-client transcripts.
- **Completion:** Record the release commit and snapshot identities plus redacted client outcomes; remove MCP-004 from this queue only after both client transcripts pass. Preserve the separate public OAuth/HTTPS remote contract as unadvanced.

## Deferred / blocked

No rows.

## Awaiting verification

No rows.

## Verified

No rows.

## Superseded / withdrawn

No rows.
