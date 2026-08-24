# Operations Priorities

## Workstream Metadata

- Kind: `priority-operations`
- Rank: `24`
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

## GitHub Pages Research Notes

Research should start from the official GitHub Pages limits documentation. The first pass should answer:

1. What are the current published-site size, source repository size, deployment timeout, bandwidth guidance, build-frequency guidance, and rate-limit behaviors?
2. Which limits are hard failures, which are soft guidance, and which can result in support contact or throttling?
3. How do Pages deployments interact with GitHub Actions minutes, storage, artifact retention, and workflow concurrency?
4. How much monthly transfer does each major app surface imply at 100, 1,000, 10,000, and 100,000 visits?
5. Which repo artifacts are included in the published Pages site, and which generated/review artifacts stay only in git or Actions?
6. Which app features increase static transfer, browser heap, GPU memory, or browser storage without increasing GitHub server compute?
7. When would a CDN/object-storage or app-hosting alternative become operationally justified?
