# Operations Work Log

This file is the chronological work log for the `aaa-operations` priority area. Use it for dated agent status, proof-attempt notes, checker narratives, handoffs, failed paths, and operator/developer communication that must remain discoverable but should not crowd the live priority tracker.

Use `brainstorming.md` for provisional ideas, insights, conceptual maps, and draft corpus-promotable text when this priority area has one. Use `priorities.md` for strategy, status, blockers, and promotion routing, and use `work-queue.md` for accepted executable tasks and their local order. Keep focused proof packets, certificates, app specs, and requirement notes in their own sibling files when they need a stable structure.

## Log Entries

### 2026-09-02 — OPS-004 browser performance budget

- Closed OPS-004 with the accepted [browser-performance budget](browser-performance-budget.v1.json), the source-bound [dated evidence receipt](browser-performance-baseline-2026-09-01.json), the repo-native development probe, and `scripts/check-browser-performance-budget.mjs`. The checker is wired into the full content-integrity runner.
- Used two representative non-Borg, non-Braid profiles. Public Feedback owns an explicit refresh-to-next-paint interaction; Photon owns the animated 4K profile. Each cold launch used the first app load on a fresh loopback origin, and each warm launch used an identical same-origin reload with HTTP validation behavior retained.
- Public Feedback measured 831,413 cold-transfer bytes, 813,202 warm-transfer bytes, 12.9- and 16.5-millisecond load events, a 31.7-millisecond interaction-to-next-paint result, 39,974,550 post-frame heap bytes, and zero origin-storage use.
- Photon measured 4,504,805 cold-transfer bytes and 10,800 warm-transfer bytes. At 3840 by 2160 CSS pixels, 360 consecutive animation intervals produced 59.88 median frames per second, an 18.2-millisecond 95th-percentile interval, and zero intervals above 33.34 milliseconds. The measured post-frame heap was 150,088,154 bytes with 17,129,304 bytes of positive growth over that repeated frame window; the accepted thresholds allow 268,435,456 used bytes and 67,108,864 bytes of positive growth.
- Kept GPU claims split. The page-level canvas backing-store lower bound was 28,888,248 bytes across three surfaces. The separately sampled shared Codex GPU-process envelope peaked at 190,218,240 resident bytes, 34,635,776 bytes over the 155,582,464-byte baseline. Neither value is exact per-page physical GPU allocation.
- Added fail-closed tests for launch and transfer, interaction, frame cadence, heap, storage, GPU surface, shared GPU process, stale app identity, and stale instrument identity. A changed measured source must be re-profiled; the prior receipt cannot silently pass.
- Claim boundary: these local Chrome 152 measurements establish current regression budgets on one host. They do not establish production-user latency, geographic network transfer, exact per-page GPU memory, monthly bandwidth, hosting cost, or scientific correctness.
- Removed OPS-004 from the live operations queue. OPS-001 remains queued but its required first consumer is Borg, which is excluded from this workstream pass.

### 2026-09-01 — OPS-003 webapp release gate

- Closed OPS-003 with the accepted [webapp release-gate contract](webapp-release-gate.v1.json), executable `scripts/check-webapp-release-gate.mjs` checker, and source-bound [public-feedback evidence receipt](feedback-webapp-release-gate-2026-09-01.json). The gate is wired into the full content-integrity runner rather than remaining a standalone advisory.
- Defined eight mandatory categories with explicit failure behavior: content, graph, size, visual, browser, accessibility, preview, and rollback. The checker recursively discovers the load-time HTML, CSS, and JavaScript closure, rejects undeclared local or remote resources, enforces the source-byte ceiling, and rejects stale byte counts or SHA-256 identities.
- Passed the first consumer with four public-feedback source files totaling 18,211 uncompressed bytes against a 32,768-byte ceiling. Focused positive and negative tests cover the accepted baseline, undeclared resources, over-budget growth, stale hashes, and failed browser, accessibility, preview, or rollback evidence.
- Used the in-app browser workflow at 1440 by 900 and 390 by 844 pixels. Both viewports had zero horizontal overflow; the mobile check found zero unnamed controls, zero duplicate identifiers, six focusable controls, and a 42-CSS-pixel minimum control height. The copy interaction and all three same-origin public-manifest reads passed with a clean console.
- Repaired the readonly manifest textarea so its visible manifest heading supplies the accessible name. The change is included in the exact source hash recorded by the evidence receipt.
- Passed an isolated static preview containing 4,288 files and 482,213,021 bytes; all four profile resources were present and the loopback route returned `200`. The active shared checkout was not used as build evidence because another task had removed an assembly-explorer runtime while working on its own scope.
- Bound rollback to last-known-good commit `8df1d08fe913e5b3b2fba09c50bda7588d437637`, the existing runbook, and the local rehearsal. Because that accepted site predates `feedback.html`, rollback deliberately removes this first-release route. No production deployment or rollback was performed, and OPS-009 retains live deployment and cross-environment parity verification.
- Removed OPS-003 from the live operations queue. The result is `passed_pre_release`; it does not claim a production release.

### 2026-09-01 — OPS-012 privacy-safe public feedback intake

- Closed OPS-012 with the [privacy-safe feedback intake](privacy-safe-feedback-intake.md), [versioned policy](feedback-intake-policy.v1.json), public `feedback.html` generator, and dedicated GitHub public-webapp issue form.
- Added `architrino.public-feedback-manifest.v1`, which records only a same-origin public pathname, browser family and major version, operating-system family, coarse device/viewport/pixel-ratio categories, browser language, and availability, last-modified headers, and entry counts for the public scene index, markdown index, and scene graph.
- Excluded the raw user-agent string, query and fragment, cookies, local and session storage, clipboard contents, local file names and contents, WebGL renderer, and account identifiers. The page only writes the visible manifest after the Copy action and never reads clipboard contents.
- Kept submission explicit: opening the local generator sends nothing to GitHub; the external issue form opens only after user selection and still requires review and submission. The form warns that issues are public and requires confirmation that private workflow and identifying material were removed.
- Focused tests passed for path sanitization, coarse classification, same-origin fetches, omission boundaries, public submission, policy alignment, and the existing observability/security controls. An isolated clean-checkout Pages build published the feedback HTML, runtime, and CSS in a 4,284-file payload.
- Used the in-app browser workflow to verify desktop and 390-pixel-wide layouts, zero horizontal overflow, sanitized `/molecule.html` capture from a query-bearing input, all three public manifest reads, visible issue-link routing, and explicit copy status. The temporary browser viewport was reset and the tab closed.
- The active-checkout static build remains blocked by another thread's in-progress removal of `src/apps/assembly-explorer/AssemblyConfigurationExplorerRuntime.js`; the isolated build proves the feedback route independently but does not certify the combined ambient checkout.
- Removed OPS-012 from the live operations queue.

### 2026-09-01 — OPS-011 dependency and public-security review

- Closed OPS-011 with the [dependency and public-security review](dependency-and-public-security-review-2026-09-01.md) and machine-checkable [public-security policy](public-security-policy.v1.json).
- Audited the one exact npm dependency and 111-entry locked production graph. The first lockfile audit reported one moderate Mermaid vulnerability group covering five advisories in 11.16.0; after moving the manifest, lockfile, vendored runtime, provenance, and attribution to 11.16.1, the audit returned zero known vulnerabilities.
- Added a moderate-or-higher npm audit to every content-integrity workflow run and weekly Dependabot review for npm and GitHub Actions. Replaced every movable external Action tag with its verified full 40-character commit identifier.
- Found the Support Architrino Research renderer dynamically loading a Liberapay widget script, which the earlier HTML-only remote-resource scan did not cover. Removed the automatic executable load, retained the ordinary user-selected donation link, widened the source scan to shared runtimes, and prohibited dynamic script construction and remote executable JavaScript URLs.
- Bound Mermaid, markdown-it, Three.js/CSS2DRenderer, KaTeX, and Periodic-Table-JSON snapshots to reviewed hashes and explicit update dispositions. Five upstream Mermaid trailing-space runs were normalized for the repository diff gate; both the upstream and repository hashes are recorded.
- Recorded current public-domain dispositions: CSP routes to OPS-003 after inline-script and resource-directive proof; HSTS waits for response-header control; Pages account verification and DNSSEC require operator/provider action; CAA waits for a complete supported-issuer allowlist; SPF stays soft-fail pending sender inventory; DMARC stays at monitoring-only; and DKIM requires account plus delivered-message verification before stronger DMARC enforcement.
- Claim boundary: no GitHub account setting, DNS record, certificate, mail setting, hosting provider, deployment, or production response changed. The zero-advisory result and public DNS/header observations are dated measurements, not permanent security guarantees.
- Removed OPS-011 and renumbered the remaining operations queue.

### 2026-09-01 — OPS-009 incident and rollback rehearsal

- Added the [Pages incident and rollback runbook](pages-incident-and-rollback-runbook.md) for broken, stale, slow, and over-budget deployments, including evidence capture, deployment pause, last-known-good selection, full source-bound re-run, public verification, repair-forward, and four-stage communication procedures.
- Verified successful main push run `33415523618` at commit `8df1d08fe913e5b3b2fba09c50bda7588d437637` as the dated rehearsal target. GitHub's current documentation confirms a full re-run preserves the original SHA and ref and remains available for 30 days.
- Reconstructed that exact commit in a disposable shared clone. The historical full integrity suite passed in 35.8 seconds; two static builds each produced 4,011 files and 415,238,969 bytes, and `diff -qr` found them byte-identical.
- Compared 123 receipt-bound public paths with the accepted historical artifact. Forty generated Borg record JSON files differed across environments and their size deltas summed to 91 bytes; every checked non-Borg path matched. No Borg generator was modified in this operations task.
- Recorded the bounded result in [pages-rollback-rehearsal-2026-09-01.json](pages-rollback-rehearsal-2026-09-01.json). Source selection, buildability, same-environment repeatability, and communication fields pass; a live production rollback and cross-environment byte parity do not.
- Moved OPS-009 to awaiting verification. No workflow re-run, deployment, variable change, cancellation, DNS change, or external incident communication occurred.

### 2026-09-01 — OPS-008 observability and analytics policy

- Closed OPS-008 with the accepted [observability and analytics policy](observability-and-analytics-policy.md) and machine-checkable [versioned contract](observability-policy.v1.json).
- Set the current client-analytics mode to disabled with no collector and zero raw or aggregate retention. Explicit future opt-in, bounded retention, provider/privacy/security review, revocation, deletion, and browser-network negatives are required before any event can be sent.
- Audited 219 authored HTML, JavaScript, JavaScript-module, and Swift app sources. The negative controls found no known collector domain, beacon, cookie access, XHR, WebSocket, EventSource, or remote executable/media tag.
- Confirmed Website Statistics is an unconnected zero-data display. Changed its dormant send decision from permissive-by-default to policy-bound and fail-closed; the existing browser opt-out remains an additional veto and unavailable storage cannot authorize sending.
- Classified PubChem as an explicit external data lookup rather than analytics. The Molecule page now discloses that pressing Add sends only an unlisted formula; shared links construct locally and do not contact PubChem automatically.
- Claim boundary: no analytics provider, endpoint, event, account, hosting configuration, DNS record, or public aggregate was created. The finite source scan does not prove absence of an unknown collection technique; browser-network inspection remains part of any future collector gate.
- Removed OPS-008 and renumbered the following operations queue rows.

### 2026-09-01 — OPS-005 hosting alternatives survey

- Closed OPS-005 with the dated [hosting alternatives survey](hosting-alternatives-survey-2026-09-01.md), using official Cloudflare, Netlify, and Vercel limits and prices accessed on 2026-09-01.
- Rebuilt the active-checkout Pages payload in an empty external temporary directory: 4,284 payload files totaling 482,203,515 bytes, with two files above Cloudflare Pages' 25 MiB asset limit and three files above Netlify's 10 MB large-file guidance.
- Established that Cloudflare Pages alone and Vercel Hobby do not accept the unchanged payload; Cloudflare Pages plus R2 and Vercel Pro are technically plausible but add object-routing or paid-platform complexity without relieving a measured current constraint. Netlify introduces both large-file risk and credit metering.
- Kept GitHub Pages as the current host and defined evidence-bearing review and migration triggers for payload size, measured monthly transfer, deployment reliability, large-object lifecycle, service-backed product requirements, and measured total operating cost.
- Claim boundary: no hosting account, DNS record, deployment workflow, public route, generated source, application behavior, or provider configuration changed. OPS-004 still owns representative cold and warm transfer measurement.
- Removed OPS-005 and renumbered the following operations queue rows.

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
