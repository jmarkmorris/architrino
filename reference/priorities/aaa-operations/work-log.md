# Operations Work Log

This file is the chronological work log for the `aaa-operations` priority area. Use it for dated agent status, proof-attempt notes, checker narratives, handoffs, failed paths, and operator/developer communication that must remain discoverable but should not crowd the live priority tracker.

Use `brainstorming.md` for provisional ideas, insights, conceptual maps, and draft corpus-promotable text when this priority area has one. Use `priorities.md` for strategy, status, blockers, and promotion routing, and use `work-queue.md` for accepted executable tasks and their local order. Keep focused proof packets, certificates, app specs, and requirement notes in their own sibling files when they need a stable structure.

## Log Entries

### 2026-09-01 — OPS-010 domain, DNS, and certificate inventory

- Closed OPS-010 with the dated [domain, DNS, and certificate inventory](domain-dns-and-certificate-inventory-2026-09-01.md), measured from the public network and cross-checked against the repository `CNAME`, Pages workflow, GitHub Pages API, authoritative DNS servers, Verisign RDAP, HTTP responses, and the served TLS chain.
- Confirmed one operational canonical origin, `https://www.architrino.com`. The apex, both HTTP variants, and `jmarkmorris.github.io/architrino` redirected to it with tested path preservation; the root and Equation Mapping route returned `200`, and a deliberate missing route returned `404`.
- Confirmed the four documented GitHub Pages IPv4 addresses, four IPv6 addresses, `www` CNAME, IONOS registrar, four authoritative `ui-dns` servers, transfer lock, and current `2027-02-16` domain expiration.
- Verified one Let's Encrypt certificate covering both hostnames, valid through `2026-11-15`, with a trusted TLS 1.3 negotiation and successful 30-day and 60-day expiry thresholds. GitHub reported the certificate approved and HTTPS enforcement enabled.
- Recorded non-outage follow-ups without changing them: no public GitHub Pages verification TXT record, no DNSSEC parent delegation, no CAA record, no observed HSTS header, and canonical-source links that still use the redirecting apex host. Domain-security dispositions route to OPS-011; canonical-source cleanup requires a separately accepted task.
- Removed OPS-010 and renumbered the following queue items. No domain, DNS, certificate, redirect, workflow, source link, generated package, application route, or scientific claim changed.

### 2026-09-01 — OPS-007 GitHub Actions artifact policy

- Closed OPS-007 with the [GitHub Actions artifact policy](github-actions-artifact-policy.md), defining required upload fields and explicit retention/size classes for Pages handoffs, failure diagnostics, visual captures, benchmarks, review bundles, raw scientific output, and sensitive material.
- Audited both current workflows. Content Integrity uploads no artifacts; Pages is the sole producer and retains its deployment handoff for one day after the static builder enforces the existing 1,000,000,000-byte uncompressed ceiling.
- Queried 30 historical Pages artifacts. Stored size fell from a listed maximum of 1,261,964,485 bytes to 197,078,868 bytes after the recent reduction, an 84.38% decrease.
- Recorded the aggregate-storage boundary: seven artifacts overlapped at `2026-08-31T16:46:29Z` for 2,887,292,067 stored bytes, proving that one-day retention does not imply one-artifact storage. The account allowance and shared Packages use remain unresolved, so the policy uses 500 MB as a conservative planning boundary until verified.
- Named the Pages upload step and documented its existing size/retention contract inline without changing its event, payload, retention, or deployment behavior.
- Claim boundary: no artifact was deleted, uploaded, extended, or reclassified as scientific evidence; no workflow event or result changed. Upload transport proves neither release acceptance nor scientific correctness.
- Validation passed: both workflow YAML files parsed, priority-rank alignment passed, `git diff --check` passed, and strict content and scene-graph checks completed without errors or warnings.

### 2026-09-01 — OPS-006 static asset inventory

- Closed OPS-006 with the dated [static asset inventory](static-asset-inventory-2026-09-01.md), reconstructed through the canonical Pages builder from local HEAD `16e78cc1fc8939e788f0d539735a0b98e7d68377` plus the active working tree.
- Measured 4,248 public payload files totaling 481,498,766 bytes uncompressed and 207,763,495 bytes under a reproducible per-file gzip-level-9 proxy; the proxy is not a measured browser transfer or Actions artifact.
- Classified 146 declared runtime files totaling 179,521,026 bytes as ignored build-generated data that is intentionally published, and 503 tracked files totaling 958,248,972 bytes as Git-only under the existing deployment exclusions.
- Kept ignored local output separate: 65,681 files totaling 126,858,498,087 bytes are local analytical, build, capture, review, and generated output, not Pages or Git storage.
- Identified a disjoint 78,593,285-byte public candidate set for a later deployment-scope decision: comic prototypes, PDG Edit review exports, Greek audio review packets, test source, and tracked attractor output. No candidate was deleted or excluded.
- Claim boundary: no hosting, workflow, retention, asset, generated authored artifact, or publication behavior changed. OPS-004 still owns measured cold/warm route transfer, and OPS-007 owns Actions artifact policy.
- Validation passed: priority-rank alignment, `git diff --check`, strict content validation, and strict scene-graph checking all completed without errors or warnings.

### 2026-09-01 — OPS-002 GitHub Pages and Actions limits baseline

- Closed OPS-002 with the dated [GitHub Pages and Actions limits record](github-pages-and-actions-limits-2026-09-01.md), using official GitHub documentation for Pages, Actions, billing, artifact retention, concurrency, and general repository limits.
- Measured the accepted live deployment at 415,238,878 bytes across 4,011 files, or 41.52% of the builder's 1,000,000,000-byte ceiling, with a 4-minute-42-second build job and 16-second deploy job.
- Rebuilt the site from the active checkout after the recent storage reductions: 481,493,486 published bytes, with 333 unused images totaling 515,647,205 bytes excluded from the candidate payload. This working-tree measurement is a planning snapshot, not a commit-bound release receipt.
- Confirmed the repository is public, Pages uses Actions with the custom domain and enforced HTTPS, the workflow retains its Pages artifact for one day, and the artifact API reported zero currently active artifacts.
- Recorded the remaining boundary: the source repository is above the Pages-specific 1 GB recommendation, while representative per-visit transfer remains unmeasured and belongs with the later asset/performance tasks.
- Claim boundary: no hosting, workflow, retention, deployment, or repository-history behavior changed. OPS-005 is dependency-unblocked, but no hosting alternative was selected.
- Validation passed: priority-rank alignment, `git diff --check`, strict content validation, and strict scene-graph checking all completed without errors or warnings.

### 2026-07-29 — Historical Codex Product Feedback

The following feedback records were migrated from the retired `reference/op/codex-feedback.md` note. They are product-feedback history, not active operating procedure:

- `73594169-76cb-4bb1-9c84-956a0c8d3d8b`: add a visible Feedback button or menu entry; slash commands are not a substitute.
- `c155751a-f2ba-47a6-97c9-7ad1b48a5a21`: make Commit and Push the default commit action.
- No feedback ID received after three attempts: after a commit, the Action button changed to Create PR but did not return to Commit when files changed; switching away from and back to a thread refreshed it.
