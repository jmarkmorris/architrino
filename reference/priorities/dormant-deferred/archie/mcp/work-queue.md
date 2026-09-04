# Archie Service MCP Adapter Work Queue

This is the preserved execution ledger for accepted MCP adapter work. The Archie-service boundary remains source-grounded, and each accepted row declares its own capabilities and mutation authority. No row is executable while its parent Archie service remains under `dormant-deferred` unless an operator direction explicitly reactivates that exact row without reopening unrelated Archie work. MCP-004 has that bounded authorization.

## Ranked Next Objects

1. MCP-004 — Private secure-tunnel deployment and real-client verification. Status: In progress by explicit operator reactivation; repository implementation merged, live account activation and client verification pending.

## Queued

### MCP-004 — Private secure-tunnel deployment and real-client verification

- **Status:** In progress by explicit operator reactivation; unrelated dormant Archie work remains parked.
- **Closure goal:** Make the already-working five-tool MCP retrieval engine safely available to authorized remote OpenAI clients without creating a public inbound endpoint, then verify it through real ChatGPT and Codex clients.
- **Merged implementation:** [PR #257](https://github.com/jmarkmorris/architrino/pull/257) merged the repository deployment path into `main` at `38ffb12969d6b64d959610b3be1c59925ab8dec9`; the exact post-merge Content Integrity and Pages workflows passed. Treat that SHA as merge evidence, not as a permanent activation target: every future activation must still pass the manager's live exact-`origin/main` preflight.
- **Resume procedure:** Follow [Private Secure-Tunnel Deployment V1](private-secure-tunnel-deployment-v1.md). Do not create a public endpoint or substitute locally fabricated credentials.
- **Operator prerequisites:** In OpenAI Platform tunnel settings, create the real tunnel, associate it with the intended Platform organization and ChatGPT workspace, create a dedicated runtime API key with Tunnels Read + Use, and enable ChatGPT developer mode if the workspace requires it. Export `OPENAI_MCP_TUNNEL_ID` and `CONTROL_PLANE_API_KEY` only in the local runtime environment; never paste their values into the queue, work log, chat transcript, tracked files, manager receipt, or commit.
- **Implemented boundary:** The current OpenAI `init`, `doctor`, and `run` workflow; a release-current, hash- and attestation-verified tunnel client; exact accepted-`main` and clean-tree checks; complete content integrity; regenerated and checked full-corpus snapshot; five-tool protocol and deterministic-recall checks; loopback-only administration; environment-referenced credentials; separate liveness, readiness, and recent-successful-poll connectivity gates; redacted local receipts; safe status, stop, and restart operations.
- **Capability boundary:** MCP-004 exposes exactly `search`, `read`, `topics`, `neighbors`, and `walk` over `public` sources with repository provenance retained. Any write tool, model call, external action, credential-bearing capability, live request-path repository scan, public endpoint, or claim-authority change requires its own accepted queue row with an explicit contract and validation boundary.
- **Resume sequence:** After the operator prerequisites exist, verify the clean working tree and exact live `origin/main` identity; download the official current `tunnel-client` and verify its release, archive/executable hashes, version, and GitHub attestation; export the verified archive and executable paths; run the manager's `--preflight`, `--start`, and `--status` modes; require supervised process identity, liveness, readiness, and a recent successful control-plane poll; then have ChatGPT and Codex independently enumerate the exact tool catalog and complete representative search, exact read with repository route, topics visibility, declared-edge traversal, and typed missing-source calls. Local harnesses and tunnel health cannot substitute for these two real-client transcripts.
- **Completion:** Record the release commit and snapshot identities plus redacted client outcomes; remove MCP-004 from this queue only after both client transcripts pass. Preserve the separate public OAuth/HTTPS remote contract as unadvanced.

## Deferred / blocked

No rows.

## Awaiting verification

No rows.

## Verified

No rows.

## Superseded / withdrawn

No rows.
