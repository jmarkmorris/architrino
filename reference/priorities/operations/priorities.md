# Operations Priorities

## Workstream Metadata

- Kind: `priority-operations`
- Rank: `30`
- Value: `0.84`
- Cost: `3.3`
- ROI: `0.25`
- Status: `active`
- Claim level: `operations-priority`
- Scope: deployment discipline, service limits, release readiness, cost visibility, reliability, and webapp growth operations.

## Purpose

This workstream tracks operational discipline for the project as the public webapp surface, static assets, generated artifacts, simulations, and user base grow. It is not a theory lane and not a solver-design lane. It records the infrastructure, deployment, quality, and support work needed to keep published apps reliable, inspectable, and affordable.

## Current Decisions

1. GitHub Pages is treated as static hosting unless a future service backend is explicitly introduced.
2. Browser runtime compute, browser heap, GPU memory, and browser storage must be measured separately from GitHub Pages transfer and GitHub Actions usage.
3. Public/review output quality for visual apps targets 4K UHD, 3840 by 2160, while solver authority remains separate from display resolution.
4. Deployment decisions should be evidence-bound: site size, bundle size, static transfer, monthly bandwidth estimate, build/deploy behavior, artifact retention, browser performance, and cost model must be measured before changing hosting strategy.
5. Operational work should protect product quality without creating a second solver path or bypassing EOM solver ownership.

## Ranked Next Objects

Ordered by marginal ROI on 2026-07-17. The first object is the bucket winner represented in the unified table.

1. `deployment_budget_contract` — Define `deployment-budget.v1` and apply it first to Borg while keeping hosting, browser-runtime, and EOM-throughput budgets separate. Status: `pending`.
2. `github_pages_limits_research` — Verify current GitHub Pages and Actions limits from official sources. Status: `pending`.
3. `webapp_release_gate` — Define the public-app release checklist and rollback evidence. Status: `pending`.
4. `browser_performance_budget` — Establish launch, interaction, frame-rate, heap, GPU-memory, and storage budgets. Status: `pending`.
5. `hosting_alternatives_survey` — Compare static and service-backed hosting only after the current limits are measured. Status: `pending`.
6. `static_asset_inventory` — Measure shipped and candidate public assets. Status: `pending`.
7. `github_actions_artifact_policy` — Define CI artifact retention and size policy. Status: `pending`.
8. `observability_and_analytics_policy` — Decide acceptable telemetry, consent, and retention. Status: `pending`.
9. `incident_and_rollback_runbook` — Define response to broken, stale, slow, or over-budget deployments. Status: `pending`.
10. `domain_dns_and_certificate_inventory` — Record route, DNS, certificate, redirect, and canonical-URL ownership. Status: `pending`.
11. `dependency_and_security_review` — Define dependency, supply-chain, CSP, and third-party-script policy. Status: `pending`.
12. `support_feedback_loop` — Define privacy-safe reproducible user feedback intake. Status: `pending`.

## Detailed Task Inventory

1. `github_pages_limits_research` — Research current GitHub Pages limits and enforcement behavior, including published-site size, repository size guidance, deployment timeout, bandwidth guidance, build-frequency guidance, rate limiting, custom-domain constraints, static-file caching behavior, and Actions interactions. Status: `pending`; sources to verify: official GitHub Pages documentation and GitHub Actions billing/usage documentation.
2. `hosting_alternatives_survey` — Compare GitHub Pages with Cloudflare Pages, Netlify, Vercel, object storage plus CDN, and a future service-backed deployment. Capture static bandwidth, build minutes, artifact storage, CDN behavior, custom domains, cache control, logs/analytics, cost growth, and operational complexity. Status: `pending`; depends on: `github_pages_limits_research`.
3. `deployment_budget_contract` — Define a repo-wide deployment budget schema for webapps: bundle size, static asset transfer, GitHub Pages bandwidth estimate, browser heap budget, GPU memory budget, browser storage budget, Actions artifact budget, generated-output size, and EOM solver throughput. Status: `pending`; first consumer: [Borg app](../app-borg/priorities.md).
4. `webapp_release_gate` — Define a release checklist for public app changes: content validation, scene graph check, bundle/asset size report, 4K UHD visual QA, browser compatibility pass, accessibility smoke check, deployment preview link, and rollback note. Status: `pending`.
5. `browser_performance_budget` — Establish first browser performance budgets for app launch time, interaction latency, frame rate under 4K UHD output, browser heap, GPU memory, and storage growth. Status: `pending`; coordinate with solver throughput benchmarks but do not merge the budgets.
6. `static_asset_inventory` — Inventory generated JSON, scene assets, captures, fonts, WASM, images, and review artifacts that ship or may ship through the webapp. Track compressed and uncompressed size. Status: `pending`.
7. `github_actions_artifact_policy` — Define retention and size policy for CI artifacts, generated captures, benchmark logs, review bundles, and failed-run diagnostics. Status: `pending`.
8. `observability_and_analytics_policy` — Decide what telemetry, analytics, error reporting, and performance beacons are acceptable. Include privacy, consent, data retention, and no-sensitive-theory-work leakage requirements. Status: `pending`.
9. `incident_and_rollback_runbook` — Define how to respond when a deployed app is broken, too slow, over bandwidth budget, or serving stale artifacts. Include rollback, disablement, communication, and validation steps. Status: `pending`.
10. `domain_dns_and_certificate_inventory` — Record custom domains, DNS ownership, certificate behavior, redirects, canonical URLs, and app route ownership. Status: `pending`.
11. `dependency_and_security_review` — Track dependency audit, supply-chain hygiene, public asset exposure, CSP/security headers where available, and third-party script policy. Status: `pending`.
12. `support_feedback_loop` — Define the first path for collecting user feedback, bug reports, browser/device specs, screenshots, and reproducible run manifests without exposing private operator workflow. Status: `pending`.

## GitHub Pages Research Notes

Research should start from the official GitHub Pages limits documentation. The first pass should answer:

1. What are the current published-site size, source repository size, deployment timeout, bandwidth guidance, build-frequency guidance, and rate-limit behaviors?
2. Which limits are hard failures, which are soft guidance, and which can result in support contact or throttling?
3. How do Pages deployments interact with GitHub Actions minutes, storage, artifact retention, and workflow concurrency?
4. How much monthly transfer does each major app surface imply at 100, 1,000, 10,000, and 100,000 visits?
5. Which repo artifacts are included in the published Pages site, and which generated/review artifacts stay only in git or Actions?
6. Which app features increase static transfer, browser heap, GPU memory, or browser storage without increasing GitHub server compute?
7. When would a CDN/object-storage or app-hosting alternative become operationally justified?

## Immediate Next Burden

Define `deployment-budget.v1` for one app surface and apply it first to the Borg app manifest work, separating static hosting budgets from browser runtime budgets and EOM solver throughput.
