# Operations Work Log

This file is the chronological work log for the `aaa-operations` priority area. Use it for dated agent status, proof-attempt notes, checker narratives, handoffs, failed paths, and operator/developer communication that must remain discoverable but should not crowd the live priority tracker.

Use `brainstorming.md` for provisional ideas, insights, conceptual maps, and draft corpus-promotable text when this priority area has one. Use `priorities.md` for strategy, status, blockers, and promotion routing, and use `work-queue.md` for accepted executable tasks and their local order. Keep focused proof packets, certificates, app specs, and requirement notes in their own sibling files when they need a stable structure.

## Log Entries

### 2026-09-03 — OPS-014 generated Claude bootstrap floor

- Replaced the hand-maintained pre-read floor in `CLAUDE.md` with a generated projection owned by `scripts/build-claude-bootstrap-floor.mjs`. The generator fingerprints `AGENTS.md`, the operator explanation standard, and the academic style guide; `--check` fails when the projection or any fingerprinted source changes, and regeneration changes only the floor section.
- Added the floor check to the full content-integrity runner. The fingerprint is deliberately a drift alarm rather than a semantic proof: after an authority changes, the compact projection still requires review before `--write` is accepted.
- Aligned the authored `CLAUDE.md` startup route with the readable-checkout and unavailable-checkout branches in `AGENTS.md`, while retaining the Claude-only per-action write-permission rule as the sole policy unique to that file.
- Removed the stale `AGENTS.md` line count from OPS-014 rather than replacing it with another volatile count, added per-row verification dates to all three guidance-surface inventories, and corrected the progress description from treating repetition as a feature to treating it as a cost justified only when it buys clarity.
- Targeted validation passed: generator and integrity-runner syntax checks, the generated-floor `--check`, strict content validation with zero errors and zero warnings, priority-ranking validation, and `git diff --check`. The existing generated startup-orientation target remains stale from changes to its own source set and was not regenerated during this ordinary edit batch.

### 2026-09-03 — OPS-017 local repository document surface accepted

- Closed OPS-017 by explicit operator acceptance of the delivered local-only repository document browser.
- The accepted surface indexes `reference/` and `content/markdown/aaa/` to depth 3 under a synthetic repository node, uses a fixed six-column desktop grid, renders Markdown with KaTeX and Mermaid, rewrites indexed Markdown links, and uses the shared standalone-application navigation chrome.
- `scripts/build-reference-surface.mjs` owns the ignored manifest; `reference.html` and `src/apps/reference/ReferenceSurfaceRuntime.js` own the page and runtime; generated-runtime configuration prepares the manifest for local development; and the `index.html` entry remains probe-gated so it appears only when the local manifest exists.
- `scripts/build-static-site.mjs` excludes the page, runtime, and generated manifest from Pages. Direct exclusion checks and stub-DOM checks were recorded during delivery; a fresh `tests/reference-surface-math-rendering.test.js` run passed 1 of 1 on 2026-09-03.
- The current ignored-manifest check reports staleness because repository documents have changed. Regeneration remains on demand and does not gate closure; no generator write was run during this closeout.
- Removed OPS-017 from the live queue. Acceptance changes no public deployment, authored source, corpus prose, or scientific claim.

Plainly: the local document browser is accepted as complete, its public-deployment exclusion remains intact, and any future manifest refresh is routine local maintenance rather than unfinished OPS-017 work.

### 2026-09-02 — GitHub Actions major-version maintenance

- Consolidated the five open GitHub Actions Dependabot proposals into one reviewable workflow change: `actions/checkout` 7.0.1, `actions/setup-node` 7.0.0, `actions/upload-pages-artifact` 5.0.0, `actions/configure-pages` 6.0.0, and `actions/deploy-pages` 5.0.0.
- Verified each selected full 40-character commit against the official `actions/*` repository and its published release, then updated the accepted security-policy pins with the workflow references. The workflows continue to request Node 22 for repository commands; the new actions themselves use their declared Node 24 action runtime on GitHub-hosted runners.
- Preserved the existing workflow permissions, triggers, checkout depth, Node selection, validation commands, Pages preflight, artifact path, one-day retention, deployment conditions, concurrency policy, and exact-SHA supply-chain rule.
- The combined branch must pass local repository validation and both real pull-request workflows before the individual Dependabot PRs are closed as superseded. A pull-request Pages run proves the updated checkout, setup, build, and upload path; deployment remains intentionally skipped until a later merge to `main`.

Plainly: the maintenance update changes the reviewed GitHub machinery versions without changing what the site builds or when it publishes. The real pull-request run is the compatibility test for the combined set, and no production deployment occurs before operator review and merge.

### 2026-09-02 — Photon performance evidence refreshed for Mermaid 11.17.2

- Remeasured the complete 38-file Photon source closure after the vendored Mermaid update on a fresh loopback origin in a dedicated Codex in-app Chromium 152 tab at exactly 3840 by 2160 CSS pixels and device-pixel ratio 1. No managed compute lease was active.
- The updated closure is 4,557,260 encoded bytes at SHA-256 `a855748978dfe25c460de2597bcb6bb8d0060282f78a583c116da4902a0f155d`. The accepted profile measured 549.2-millisecond cold load, 294-millisecond warm load, 4,568,660 cold-transfer bytes, 11,400 warm-transfer bytes, 360 frame samples, 17.2-millisecond p95, 59.88 median frames per second, zero intervals above 33.34 milliseconds, 21,872,226 post-frame used-heap bytes, -58,068,185 frame-window heap growth, 28,888,248 canvas-surface bytes, and zero origin-storage bytes.
- Retained the separately contracted shared-GPU-process envelope; this remeasurement updates the Photon route and source-bound evidence only. It is one local pre-release measurement and does not establish production performance or a general improvement.

Plainly: changing Mermaid changed bytes that Photon loads, so the old performance receipt was no longer valid. The current bytes were measured directly and remain within every unchanged Photon budget.

### 2026-09-02 — OPS-013 public Borg byte identity closed

- Preserved GitHub Actions run `33685894947` at its demonstrated authority: its Ubuntu job reported 145-of-145 Borg identity verification before an unrelated generated-orientation failure stopped the broader branch job.
- Verified that PR [#246](https://github.com/jmarkmorris/architrino/pull/246) merged the same portable emitter state. Post-merge `main` Content Integrity run [`33690784705`](https://github.com/jmarkmorris/architrino/actions/runs/33690784705) and Pages deployment run [`33690784657`](https://github.com/jmarkmorris/architrino/actions/runs/33690784657) both passed at `00710092e165486f072c9dfe6cd8af4e8e99d343`.
- Added the read-only public HTTPS audit instrument and measured 145-of-145 registry/record SHA-256 agreement, 145-of-145 embedded identity agreement, and 116,875,800 fetched record bytes. Representative first, middle, and last records each loaded through Borg's `EXACT RECORD` path with the sealed source path open and no browser-console warning or error.
- Removed OPS-013 from the live queue and removed the zero-row Operations lane from the global numeric ranking. No Actions artifact was deleted, no loader check was bypassed, and no portable-serialization rule was weakened.

Plainly: the public site now delivers the exact bytes its Borg registry promises, and the evidence covers both all-file hashing and real strict-loader use.

### 2026-09-02 — Browser-performance source closure after UI-005

- Replaced the deleted `src/apps/navigator/standalone-app-navigation.css` identity in the accepted Photon source closure with `src/runtime/top-dynamic-control-bar.css` and added the newly loaded `src/runtime/TopDynamicControlBarRuntime.js` source.
- Corrected the closure after an actual current-route trace showed that `src/apps/navigator/StandaloneAppNavigationRuntime.js` was also loaded. The complete identity is 38 files and 4,550,657 bytes at SHA-256 `8887fe22a77ff33f8027326ecb49ce0f6598d90738474ad5b8addaff484958b3`; the added runtime is 5,611 bytes at SHA-256 `1249ed36ee11e1c509674784cc8af9d98bcf14b237f4fec84c7633150da8734b`.
- Ran exact 3840-by-2160, DPR-1 foreground checks against fresh loopback origins. Both confirmed 37 loaded resources plus the HTML entrypoint, a 4,550,657-byte encoded closure, 4,562,057-byte cold transfer, 28,888,248-byte canvas-surface lower bound, zero origin storage, and 59.88 median frames per second. They were rejected from the accepted profile: at independently observed load average 19.37 on an eight-core host, the first produced 49.3-millisecond p95 frame intervals and 24 intervals above 33.34 milliseconds; the foreground retry produced a 796.9-millisecond warm load, 33.3-millisecond p95 frame intervals, and 17 intervals above 33.34 milliseconds. The unchanged limits are 750 milliseconds, 20 milliseconds, and 3 intervals. Earlier in-app checks with a wrong device-pixel ratio or throttled cadence remain rejected as well.
- After checking the recent Architrino tasks and confirming no active subagent work, gracefully stopped six unclaimed compute process groups and remeasured Photon on a fresh origin in an isolated foreground Microsoft Edge 152 profile. At exactly 3840 by 2160 CSS pixels and DPR 1, the current source closure passed every unchanged threshold: 363.7-millisecond cold load, 273.4-millisecond warm load, 4,562,057 cold-transfer bytes, 11,400 warm-transfer bytes, 37 loaded resources, 360 frame samples, 17.2-millisecond p95, 59.88 median frames per second, one interval above 33.34 milliseconds, 42,603,162 post-frame used-heap bytes, -29,146,247 frame-window heap growth, 28,888,248 canvas-surface bytes, and zero origin-storage bytes. A supporting Edge GPU-process RSS sample peaked at 158,187,520 bytes, 27,574,272 bytes above baseline, but the accepted receipt retains the separately contracted Codex shared-process envelope. These are one local wall-time and resource measurement, not evidence of a performance improvement.

Plainly: the gate now watches every file the current Photon route actually loads, including the shared navigation runtime. The current-source Photon profile passes the original performance limits when measured on the required foreground DPR-1 surface without the unclaimed host workload; the earlier contention-bound and wrong-device-scale runs remain rejected evidence.

### 2026-09-02 — OPS-001 deployment budget contract

- Accepted [deployment-budget.v1](deployment-budget.v1.json) with Borg as the first consumer, added a source-bound browser probe, wired the checker into Content Integrity, and exposed the measured classes in Borg's deployment drawer.
- Rebuilt the public site in an empty temporary directory: 4,347 files and 453,526,774 bytes, 27,971,992 bytes (5.81%) below the 2026-09-01 OPS-006 reconstruction. Generated equation, corpus-index, and Borg-record outputs totaled 177,611,810 bytes; the 145 Borg records accounted for 116,873,582 bytes.
- Measured Borg's fresh 3840-by-2160 first screen at 2,513,867 encoded shell bytes, 42,712 encoded static-asset bytes, 12,138,288 used browser-heap bytes, a 26,429,760-byte canvas color-surface lower bound, and zero origin-storage use. The canvas value excludes depth, textures, geometry, driver allocation, compositor copies, and shared-process memory.
- Estimated 2,556,579,000 monthly Pages bytes for an inferred scenario of 1,000 uncached first-screen visits. This is not observed traffic and excludes selected records and repeat-visit cache behavior.
- Queried non-expired Actions artifacts at 2026-09-02T21:17:06Z. Two one-day Pages handoffs totaled 414,359,287 stored bytes, 14,359,287 bytes above the conservative 400,000,000-byte aggregate threshold used while the account allowance is unknown. The contract preserves that warning; it neither deletes artifacts nor blocks the existing guarded Pages path.
- Kept EOM solver throughput as `reported-separately-not-measured`, owned by `app-solver`, with no dependency on the deployment verdict. No throughput number was inferred from browser, artifact, or site-size measurements.
- Removed OPS-001 from the active queue. OPS-013 remains the local rank-1 object.

Plainly: the deployment budget now has live numbers and an app consumer. It reports one actionable artifact-overlap warning and keeps solver speed in its own evidence lane.

### 2026-09-02 — Pages recovery policy and Borg record byte identity

- Removed OPS-009, its standing Pages reversal procedure, rehearsal receipt, and release-gate dependency at operator direction. If an earlier source state is needed, recovery now starts by inspecting repository branches and commits, selecting the source explicitly, validating it through the ordinary branch and PR process, and publishing only through the verified `main` workflow.
- Reduced the general webapp release gate from eight categories to seven: content, graph, size, visual, browser, accessibility, and preview. No automatic target or special replay path remains in the contract or checker.
- Reclassified the earlier 91-byte observation through a live [published Borg record byte-identity audit](pages-borg-record-byte-identity-audit-2026-09-02.md). Of 145 deployed records, 143 disagree with their deployed registry SHA-256 identities; the two static records match.
- Isolated one representative mismatch to 66 tiny numeric differences and no non-numeric differences. The deployed file and same-source macOS reconstruction had equal byte counts, showing that the earlier 91-byte total was incidental decimal-length drift rather than truncation or missing data.
- Queued OPS-013 because the Borg loader rejects a record whose bytes do not match the registry. No deployment, Pages setting, DNS record, or public byte was changed.
- Implemented a duration-scaled $2\times10^{-11}$ position quantum with conservatively enlarged position/velocity residual bounds. The first grid version collapsed all 145 historical macOS/Ubuntu record pairs despite 51,051 numeric differences and zero non-numeric differences, but a fresh GitHub run correctly falsified it when runtime-dependent exponentiation produced 59 mismatches.
- Replaced coefficient-grid exponentiation with repeated IEEE-754 multiplication in `assembly-view-record-position-grid.v2`. Fresh Node 22 and Node 26 generation then produced the same 145 records and registry hashes, totaling 116,875,800 bytes; focused positive, negative-tamper, and observed-runtime-difference tests passed.
- GitHub Actions run `33685894947` independently passed the verifier 145-of-145 on Ubuntu 24.04 with Node 22.23.2. A later stale generated startup-orientation check from concurrent branch work stopped the overall job after the Borg pass, so no artifact was uploaded or deployed.
- Added the verifier to Content Integrity and the Pages workflow before artifact upload. OPS-013 remains awaiting live verification; the next verified `main` deployment, live 145-of-145 hashes, and representative Borg loading remain.

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
- Defined seven mandatory categories with explicit failure behavior: content, graph, size, visual, browser, accessibility, and preview. The checker recursively discovers the load-time HTML, CSS, and JavaScript closure, rejects undeclared local or remote resources, enforces the source-byte ceiling, and rejects stale byte counts or SHA-256 identities.
- Passed the first consumer with four public-feedback source files totaling 18,211 uncompressed bytes against a 32,768-byte ceiling. Focused positive and negative tests cover the accepted baseline, undeclared resources, over-budget growth, stale hashes, and failed browser, accessibility, or preview evidence.
- Used the in-app browser workflow at 1440 by 900 and 390 by 844 pixels. Both viewports had zero horizontal overflow; the mobile check found zero unnamed controls, zero duplicate identifiers, six focusable controls, and a 42-CSS-pixel minimum control height. The copy interaction and all three same-origin public-manifest reads passed with a clean console.
- Repaired the readonly manifest textarea so its visible manifest heading supplies the accessible name. The change is included in the exact source hash recorded by the evidence receipt.
- Passed an isolated static preview containing 4,288 files and 482,213,021 bytes; all four profile resources were present and the loopback route returned `200`. The active shared checkout was not used as build evidence because another task had removed an assembly-explorer runtime while working on its own scope.
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
