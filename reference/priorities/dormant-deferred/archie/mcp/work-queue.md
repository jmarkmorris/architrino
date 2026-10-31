# Archie Service MCP Adapter Work Queue

This is the preserved execution ledger for accepted MCP adapter work. The Archie-service boundary remains source-grounded, and each accepted row declares its own capabilities and mutation authority. No row is executable while its parent Archie service remains under `dormant-deferred` unless an operator direction explicitly reactivates that exact row without reopening unrelated Archie work. MCP-004 has that bounded authorization.

## Ranked Next Objects

1. MCP-004 — Private secure-tunnel deployment and real-client verification. Status: In progress by explicit operator reactivation; fixture freshness, tunnel-release refresh, accepted-main publication, live account activation, and client verification remain.

## Queued

### MCP-004 — Private secure-tunnel deployment and real-client verification

- **Status:** In progress by explicit operator reactivation; unrelated dormant Archie work remains parked.
- **Closure goal:** Make the already-working five-tool MCP retrieval engine safely available to authorized remote OpenAI clients without creating a public inbound endpoint, then verify it through real ChatGPT and Codex clients.
- **Merged implementation:** [PR #257](https://github.com/jmarkmorris/architrino/pull/257) merged the repository deployment path into `main` at `38ffb12969d6b64d959610b3be1c59925ab8dec9`; the exact post-merge Content Integrity and Pages workflows passed. Treat that SHA as merge evidence, not as a permanent activation target: every future activation must still pass the manager's live exact-`origin/main` preflight.
- **Resume procedure:** Follow [Private Secure-Tunnel Deployment V1](private-secure-tunnel-deployment-v1.md). Do not create a public endpoint or substitute locally fabricated credentials.
- **Operator prerequisites:** In OpenAI Platform tunnel settings, create the real tunnel, associate it with the intended Platform organization and ChatGPT workspace, create a dedicated runtime API key with Tunnels Read + Use, and enable ChatGPT developer mode if the workspace requires it. Export `OPENAI_MCP_TUNNEL_ID` and `CONTROL_PLANE_API_KEY` only in the local runtime environment; never paste their values into the queue, work log, chat transcript, tracked files, manager receipt, or commit.
- **Implemented boundary:** The current OpenAI `init`, `doctor`, and `run` workflow; a release-current, hash- and attestation-verified tunnel client; exact accepted-`main` and clean-tree checks; complete content integrity; regenerated and checked full-corpus snapshot; five-tool protocol and deterministic-recall checks; loopback-only administration; environment-referenced credentials; separate liveness, readiness, and recent-successful-poll connectivity gates; redacted local receipts; safe status, stop, and restart operations.
- **Capability boundary:** MCP-004 exposes exactly `search`, `read`, `topics`, `neighbors`, and `walk` over `public` sources with repository provenance retained. Any write tool, model call, external action, credential-bearing capability, live request-path repository scan, public endpoint, or claim-authority change requires its own accepted queue row with an explicit contract and validation boundary.
- **Completion:** Record the release commit and snapshot identities plus redacted client outcomes; remove MCP-004 from this queue only after both client transcripts pass. Preserve the separate public OAuth/HTTPS remote contract as unadvanced.

#### MCP-004.1 — Stabilize generated inputs and repair the tracked fixture chain

- **Status:** Queued; wait until the active shared-tree work that changes generated reading-copy or scene-graph inputs has settled.
- **Owner:** MCP repository implementation owner, with the active generated-input owners left undisturbed.
- **Request:** On the settled candidate branch, refresh the source-index snapshot, MCP tool-contract responses, and stdio smoke transcript in canonical dependency order through their generators. Do not edit generated fixtures by hand and do not weaken `mcp-tool-contract/v1`.
- **Evidence / blocker:** Measured on 2026-10-31, `origin/main` carries source snapshot `b51991e05b7e5be014be6c5e77d5f2d89e5f2325bad4e4ddc034fd6642d977df` while both downstream MCP fixtures still pin `14a8608620bc0e61a232355d24df1fc55b222475def2fc97238848d87ebc6ccb`. `git show --name-status 308002c7b --` over the three fixtures shows that transition changed only the source-index snapshot. The current shared checkout also has later generated-input bytes, so its rebuilt candidate identity is not a stable repair target yet.
- **Acceptance:** `build-source-index.mjs --check`, `validate-mcp-tool-contracts.mjs --check`, `check-fixture-mcp-server.mjs --check`, the focused source-index/tool-contract/fixture-server tests, and `tests/archie-service-contracts.test.js` all pass from the same settled bytes. A semantic result change, rather than identity propagation alone, requires separate review before acceptance.

#### MCP-004.2 — Refresh the verified tunnel-client release contract

- **Status:** Queued after the deployment candidate is stable; may be investigated in parallel but must be validated against the same publication candidate used for activation.
- **Owner:** MCP deployment owner.
- **Request:** Recheck the official OpenAI Secure MCP Tunnel guide and latest `openai/tunnel-client` release, verify the current CLI workflow, download the correct `darwin-arm64` archive, independently verify the published archive and executable hashes, version, provenance bundle, and GitHub attestation, then update the executable deployment contract and its maintained procedure only where the reviewed release requires it.
- **Evidence / blocker:** Measured from the official OpenAI release page on 2026-10-31, the latest release is `v0.0.18`; the executable repository contract still pins `v0.0.14`. The manager's release-currency gate therefore must refuse activation until the pin and its evidence are refreshed. A later official release supersedes `v0.0.18` as the execution target.
- **Acceptance:** The manager static check and all secure-tunnel focused tests pass; the live latest-release API, downloaded archive, executable version, checksum manifest, provenance, and GitHub attestation agree; unsafe release, command, environment, credential, administration, and connectivity mutations remain rejected.

#### MCP-004.3 — Publish one deployable exact-`main` state

- **Status:** Queued after MCP-004.1 and MCP-004.2; recording this item does not invoke Git publication.
- **Owner:** The operator-designated publication runner under `reference/op/git/pr-lifecycle.md`.
- **Request:** Publish the fixture-chain and release-refresh changes through the accepted branch/PR workflow, merge only after required checks pass, and establish the new exact live `origin/main` commit as the activation candidate.
- **Acceptance:** The merged `origin/main` contains the reviewed repairs; its required GitHub checks pass; a clean local checkout has `HEAD` exactly equal to live `origin/main`; complete content integrity passes without generated drift; and the manager's accepted-main preflight binds the commit to the regenerated full-corpus snapshot.

#### MCP-004.4 — Provision the real OpenAI tunnel boundary

- **Status:** External operator action; blocked until MCP-004.3 has a deployable candidate, although account-permission review may occur earlier.
- **Owner:** Operator or authorized Platform-organization and ChatGPT-workspace administrator.
- **Request:** Create or select the real OpenAI-hosted tunnel, associate the intended Platform organization and ChatGPT workspace, grant Tunnels Read + Manage for tunnel creation or editing and Tunnels Read + Use for running or selecting it, create a dedicated runtime key, and enable ChatGPT developer-mode access when required by the workspace.
- **Acceptance:** `OPENAI_MCP_TUNNEL_ID` and `CONTROL_PLANE_API_KEY` are available only through the local runtime environment; the verified archive and executable paths are exported locally; no credential or tunnel identifier appears in chat, Git, durable work records, manager output, or release receipts.

#### MCP-004.5 — Activate and prove private tunnel connectivity

- **Status:** Blocked on MCP-004.3 and MCP-004.4.
- **Owner:** MCP deployment owner, with the operator supplying the local environment references.
- **Request:** From the exact clean accepted-`main` checkout, run the manager's `--preflight`, `--start`, and `--status` modes through the owned-compute supervisor.
- **Acceptance:** Release identity, attestation, exact-main identity, generated snapshot, deterministic recall, five-tool smoke, and complete content integrity pass; the supervised process identity is current; `/healthz` is live; `/readyz` is ready; the control-plane poll metric is recent and successful; and the retained receipt contains only the approved redacted fields.

#### MCP-004.6 — Complete independent ChatGPT and Codex remote-client acceptance

- **Status:** Blocked on MCP-004.5.
- **Owner:** Operator and MCP client-conformance owner.
- **Request:** Through the running private tunnel, have ChatGPT and Codex independently discover exactly the five frozen tools and complete representative natural-language search, exact read with repository route, topics visibility, declared-edge traversal including `walk`, and typed missing-source calls.
- **Acceptance:** Each redacted transcript names the client, time, accepted-main commit, snapshot identity, returned routes, and tool outcomes without credentials, tunnel identifiers, private prompts, or returned source bodies. Both clients preserve public-source visibility, provenance, typed errors, and claim authority. Local harnesses, health checks, or one client's transcript cannot substitute for the other.
- **Disposition after acceptance:** Record the activation and both client outcomes in `work-log.md`, stop or deliberately renew the bounded runtime, remove MCP-004 from this queue, and leave the separate public OAuth/HTTPS deployment contract unadvanced.

## Deferred / blocked

No separate rows. MCP-004.4 through MCP-004.6 are dependency-blocked subitems of the explicitly reactivated MCP-004 sequence.

## Awaiting verification

No rows.

## Verified

No rows.

## Superseded / withdrawn

No rows.
