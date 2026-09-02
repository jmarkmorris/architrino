# Hosting Alternatives Survey — 2026-09-01

## Purpose And Claim Boundary

This record closes OPS-005 with a measured decision table for the current static publication path. Official service limits and prices were checked on 2026-09-01. The local measurements are an active-checkout planning snapshot, not a commit-bound release receipt or a measured monthly traffic profile. No hosting account, DNS record, deployment workflow, public route, generated source, or application behavior changed.

Plainly: this survey asks whether another host solves a problem that exists today. It does not treat a feature list as a reason to migrate, and it does not predict bandwidth that OPS-004 has not yet measured.

## Current Measured Baseline

At `2026-09-02T02:36:42Z`, [`build-static-site.mjs`](../../../scripts/build-static-site.mjs) reconstructed the Pages payload in an empty external temporary directory from local HEAD `897fe1aa79be7ae1e77144d52ef396d209645323` plus the concurrently active working tree.

| Measurement | Current result | Operational meaning |
| --- | ---: | --- |
| Payload files | 4,284 plus the zero-byte `.nojekyll` marker | Below Cloudflare Pages Free's 20,000-file limit; the largest directory has 386 files, far below Netlify's 54,000-file-per-directory limit. |
| Uncompressed payload | 482,203,515 bytes | 48.22% of the local 1,000,000,000-byte Pages ceiling. |
| Files above 10 MB | 3 | Netlify says files over 10 MB are not well supported and may fail upload. |
| Files above 25 MiB | 2 | Cloudflare Pages cannot accept these assets directly. |
| Largest file | 31,345,195 bytes | The generated equation corpus exceeds Cloudflare Pages' per-file limit. |
| Second-largest file | 29,383,175 bytes | The generated full-corpus index also exceeds Cloudflare Pages' per-file limit. |
| Largest PDF | 20,665,288 bytes | Below Cloudflare Pages' limit but within Netlify's documented large-file risk class. |
| Accepted live build job | 4 minutes 42 seconds | No current build-duration pressure. |
| Accepted live deploy job | 16 seconds | Far below GitHub Pages' 10-minute deployment timeout. |
| Measured visit transfer | Not yet measured | Aggregate site bytes cannot establish monthly bandwidth or per-visit cost. |

Plainly: the site is comfortably inside its current host's size and deployment envelope. Alternative-host friction comes from a few large files and metered transfer, not from the number of files.

## Source-Bound Service Facts

The current GitHub facts and measurements are preserved in the [GitHub Pages and Actions limits baseline](github-pages-and-actions-limits-2026-09-01.md). The alternatives below use official provider documentation accessed on 2026-09-01.

- [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/): Free permits 500 builds per month, one concurrent build, a 20-minute build timeout, 20,000 files per site, and a maximum single asset size of 25 MiB. Paid plans can raise the file count to 100,000, but the documented 25 MiB asset ceiling remains; Cloudflare directs larger files to R2.
- [Cloudflare R2 pricing](https://developers.cloudflare.com/r2/pricing/): Standard storage is $0.015 per GB-month, Class A operations are $4.50 per million, Class B operations are $0.36 per million, and Internet egress is free. The monthly Standard free tier includes 10 GB-month of storage, one million Class A operations, and ten million Class B operations.
- [Netlify pricing](https://www.netlify.com/pricing/) and [credit accounting](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/): Free has a 300-credit monthly cap; production deploys use 15 credits each, bandwidth uses 20 credits per GB, and web requests use 2 credits per 10,000 requests. Personal is $9 per month with 1,000 included credits, and Pro starts at $20 per month with 3,000 included credits. [Netlify deploy limits](https://docs.netlify.com/deploy/deploy-overview/) state no total file-count limit but a 54,000-file limit per directory. [Netlify's large-file guidance](https://docs.netlify.com/build/configure-builds/troubleshooting-tips/#large-files-or-sites) says files above 10 MB are not well supported by its CDN and may fail upload.
- [Vercel pricing](https://vercel.com/pricing): Hobby is $0 and limited to personal, non-commercial use; Pro is $20 per month with $20 of included usage credit. [Vercel limits](https://vercel.com/docs/limits#static-file-uploads) cap CLI static-file uploads at 100 MB for Hobby and 1 GB for Pro, with a 45-minute build limit.

## Measured Decision Table

| Candidate | Fit for current payload | Direct cost boundary | Added operational complexity | Condition that would justify a pilot |
| --- | --- | --- | --- | --- |
| GitHub Pages with the current Actions workflow | Fits now: 482.2 MB is 48.22% of the local ceiling; accepted deployment timing is well inside limits. | No incremental hosting or standard-runner charge is established for the current public-repository path. | Existing and already validated. | Keep unless one of the migration triggers below is reached. |
| Cloudflare Pages alone | Does not fit unchanged: two required generated JSON files exceed the 25 MiB single-asset limit. File count and build count fit Free. | A Free-plan deployment could avoid direct service cost, but the current payload cannot be uploaded unchanged. | Requires splitting or relocating the two large runtime objects and changing their consumers or publication contract. | Pilot only after an accepted large-object design removes every asset above 25 MiB and a migration trigger is independently reached. |
| Cloudflare Pages plus R2 | Technically plausible: the two over-limit files total 60,728,370 bytes, well below R2's 10 GB-month free storage quantity. Request volume remains unmeasured. | Storage quantity alone fits the current R2 free tier; operations determine whether usage remains free. | Adds a second deployment target, object synchronization, cache and integrity rules, failure handling, and potentially cross-origin access. | Pilot if measured transfer approaches the GitHub Pages bandwidth envelope, or if large runtime objects need an independent release lifecycle for an accepted product reason. |
| Netlify | File count fits, but all three files above 10 MB enter Netlify's documented unsupported-risk class. | Monthly credits are `15 × production deploys + 20 × outbound GB + 2 × request groups of 10,000`, before any compute. Traffic is unmeasured. | Requires large-file redesign or a second object host, plus credit monitoring and pause/overage handling. | Pilot only after the large-file risk is removed and measured traffic shows a concrete cost or reliability advantage. |
| Vercel Hobby | Does not fit the 482.2 MB static upload under the 100 MB limit and is not the documented plan for a professional site. | $0 plan, but inapplicable to the current payload and use boundary. | Would require substantial payload restructuring before a meaningful deployment test. | No pilot under the current payload and use case. |
| Vercel Pro | Fits under the 1 GB upload limit with 517,796,485 bytes of nominal headroom. | $20 per month with $20 included usage credit; usage beyond that remains workload-dependent. | Introduces a paid platform and a new deployment contract without relieving a measured current constraint. | Pilot if an accepted server-backed feature specifically needs the platform and its static-plus-service architecture is compared against keeping static content on Pages. |

Plainly: only Vercel Pro accepts the whole current payload without first moving or splitting large files, but it adds cost while current Pages has no measured capacity or reliability problem. Cloudflare Pages plus R2 is the most concrete contingency for bandwidth or independently released large data, but it is not a drop-in replacement.

## Trigger Conditions

The planning thresholds below are inferred operational guardrails. They are deliberately below provider failure limits so a response can be tested before a release is at risk.

| Signal | Early review trigger | Migration or architecture trigger | Required evidence |
| --- | --- | --- | --- |
| Published payload size | At or above 750,000,000 bytes on two consecutive release candidates | At or above 850,000,000 bytes, or any build that reaches the 1,000,000,000-byte hard stop | Canonical static-builder receipt and payload-family attribution. |
| Monthly Pages transfer | At or above 75 GB in a rolling 30-day measurement | At or above 90 GB, a GitHub support quota notice, or observed Pages `429` responses attributable to real traffic | Provider/account measurement plus representative cold and warm route traces; aggregate site bytes are insufficient. |
| Deployment reliability | Deploy action at or above 8 minutes, or two unexplained deployment failures in 30 days | Any 10-minute timeout or repeated provider-caused failures after retry and artifact verification | Actions job timing, logs, artifact identity, and incident record. |
| Large-object lifecycle | A required public object exceeds the selected host's per-file limit | Accepted need to publish large runtime objects independently of the site release | Named consumer, cache/integrity contract, failure-and-recovery behavior, and pilot on the proposed object path. |
| Service-backed product need | Accepted feature requires authenticated state, private data access, server-side mutation, or an API that cannot remain static | Architecture review concludes a service is required | Product requirement, privacy/security review, cost envelope, failure behavior, and proof that the static site cannot satisfy the requirement. |
| Alternative cost | Provider calculator suggests a lower direct cost using measured traffic | Thirty-day pilot establishes lower total operating cost without weaker reliability | Measured outbound GB, requests, deploys, storage operations, paid plan, and maintenance burden. |

The published-size and transfer thresholds are warnings, not scientific or service-provider facts. A trigger opens a measured review; it does not preselect a host. A service-backed requirement can justify a backend without forcing all static content off GitHub Pages.

## Current Disposition

1. Keep GitHub Pages as the publication host. This is an inferred operational decision from the measured 48.22% payload use, accepted deployment timing, absence of measured bandwidth pressure, and lower current complexity.
2. Do not start a migration pilot yet. OPS-004 must measure representative cold and warm route transfer before any bandwidth or request-cost comparison can be decision-bearing.
3. Preserve Cloudflare Pages plus R2 as the first concrete contingency to evaluate if a trigger is reached, because it directly addresses files above 25 MiB and offers source-bound storage/operation pricing. This is a contingency order, not authorization to add a second origin.
4. Treat Netlify and Vercel as feature-driven alternatives, not current static-host upgrades. Their documented large-file, plan, and metering boundaries do not solve a measured present problem.
5. Recheck every linked official page before a future pilot. Provider limits and prices can change independently of this repository.

## Reproduction And Falsifiers

- Rebuild with `node scripts/build-static-site.mjs --out <empty-external-directory>` and enumerate regular-file sizes. A payload above a trigger, a changed large-file set, or a provider-limit-compatible redesign overturns the corresponding fit statement.
- Measure representative cold and warm route transfer under OPS-004. A rolling 30-day transfer result at a trigger boundary overturns the present no-bandwidth-pressure disposition.
- Inspect the accepted Pages workflow and deployment timings. A timeout, repeated provider-caused failure, or changed billing path overturns the current reliability or incremental-cost statement.
- Verify the linked provider documentation on the day of any pilot. A changed asset, upload, usage, or commercial-use boundary overturns the dated comparison.

Closure goal: keep the static publication path inside a measured operating envelope and begin alternative-host work only when a named capacity, reliability, product, or cost trigger is independently observed.
