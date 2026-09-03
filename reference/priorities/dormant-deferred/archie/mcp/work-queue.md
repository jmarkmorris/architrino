# Archie Service MCP Adapter Work Queue

This is the preserved execution ledger for accepted MCP adapter work. The Archie-service boundary remains read-only and source-grounded. No row is executable while its parent Archie service remains under `dormant-deferred` unless an operator direction explicitly reactivates that exact row without reopening unrelated Archie work. MCP-004 has that bounded authorization.

## Ranked Next Objects

1. MCP-004 — Private secure-tunnel deployment and real-client verification. Status: In progress by explicit operator reactivation.

## Queued

### MCP-004 — Private secure-tunnel deployment and real-client verification

- **Status:** In progress by explicit operator reactivation; unrelated dormant Archie work remains parked.
- **Closure goal:** Make the already-working five-tool MCP retrieval engine safely available to authorized remote OpenAI clients without creating a public inbound endpoint, then verify it through real ChatGPT and Codex clients.
- **Accepted implementation:** Pin and verify the official OpenAI tunnel client; require a clean release checkout whose `HEAD` exactly equals live remote `main`; run complete content integrity, regenerate and check the full-corpus public snapshot, and pass the five-tool protocol smoke before connection; use an outbound-only managed runtime with loopback-only administration and environment-referenced credentials; retain only a redacted local runtime receipt.
- **Capability boundary:** Exactly `search`, `read`, `topics`, `neighbors`, and `walk`; `public` sources only; read-only; repository provenance retained; no hidden material, write tool, model call, external action, credential access, live request-path repository scan, public endpoint, or claim-authority increase.
- **Verification:** The managed runtime must report `process_running`, `healthy`, and `ready`. ChatGPT and Codex must each enumerate the exact tool catalog and complete representative natural-language search, exact read with repository route, topics visibility, declared-edge traversal, and typed missing-source calls. Local harnesses and tunnel health cannot substitute for these two real-client transcripts.
- **Completion:** Merge the deployment contract through the accepted workflow; run it from exact post-merge `main`; record the release commit and snapshot identities plus redacted client outcomes; remove MCP-004 from this queue only after both client transcripts pass. Preserve the separate public OAuth/HTTPS remote contract as unadvanced.

## Deferred / blocked

No rows.

## Awaiting verification

No rows.

## Verified

No rows.

## Superseded / withdrawn

No rows.
