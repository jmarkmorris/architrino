# Operations Priorities

## Workstream Metadata

- Kind: `priority-operations`
- Rank: `23`
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

## Work Queue

The locally ranked operational tasks, measurement requirements, and completion boundaries live in [work-queue.md](work-queue.md).

## GitHub Pages Limits Baseline

OPS-002 is closed by the dated [GitHub Pages and Actions limits record](github-pages-and-actions-limits-2026-09-01.md). The accepted live deployment is 415,238,878 bytes and the 2026-09-01 active-checkout reconstruction is 481,493,486 bytes, both below the builder's 1,000,000,000-byte ceiling. The source repository remains above the Pages-specific 1 GB recommendation, and representative per-visit transfer remains unmeasured.

## Static Asset Inventory Baseline

OPS-006 is closed by the dated [static asset inventory](static-asset-inventory-2026-09-01.md). Its concurrent active-checkout reconstruction measured 481,498,766 public bytes, including 179,521,026 bytes of declared build-generated runtime data, while existing rules kept 958,248,972 tracked bytes Git-only. A disjoint 78,593,285-byte public candidate set now awaits explicit deployment-scope decisions; no asset was removed. OPS-004 owns cold/warm browser and transfer measurements, and OPS-007 owns Actions artifact retention rather than local or Pages storage.

## GitHub Actions Artifact Baseline

OPS-007 is closed by the [GitHub Actions artifact policy](github-actions-artifact-policy.md). Every current upload has an explicit class, retention, and pre-upload size ceiling: the sole producer is the one-day Pages deployment handoff guarded by the existing 1,000,000,000-byte static-builder limit. Future diagnostics, captures, benchmarks, and review bundles have bounded class rules; raw scientific output and sensitive material are prohibited by default. Aggregate overlap must be checked separately from per-artifact retention.

## Domain, DNS, And Certificate Baseline

OPS-010 is closed by the dated [domain, DNS, and certificate inventory](domain-dns-and-certificate-inventory-2026-09-01.md). The canonical public origin is `https://www.architrino.com`; the apex, HTTP variants, and GitHub project domain converge on it with path preservation. The served GitHub Pages certificate covers both hostnames and passed trust and 60-day validity checks. Account-level domain verification remains operator-checkable because the recommended public TXT proof is absent; DNSSEC, CAA, HSTS, and mail-security decisions route to OPS-011, while source-level apex-link cleanup requires a separately accepted task.
