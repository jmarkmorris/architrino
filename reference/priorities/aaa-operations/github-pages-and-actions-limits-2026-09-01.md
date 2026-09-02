# GitHub Pages And Actions Limits — 2026-09-01

## Purpose And Claim Boundary

This record closes OPS-002 with a dated, source-bound operating envelope for the current GitHub Pages and GitHub Actions publication path. Official limits are verified from GitHub documentation accessed on 2026-09-01. Repository and deployment measurements are operational snapshots from the named instruments; they do not establish future bandwidth, browser resource use, or hosting cost.

Plainly: this packet says which limits apply and how much measured room the current site has. It does not predict how much a real visitor downloads or replace the asset and browser-performance measurements owned by later operations tasks.

## Official GitHub Pages Limits

Source: [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits), accessed 2026-09-01.

| Limit | Published value | Classification | Current consequence |
| --- | ---: | --- | --- |
| Pages source repository | Recommended limit of 1 GB | Guidance, not a stated hard failure | The repository is above this Pages-specific recommendation; repository health remains a separate concern from the published site size. |
| Published Pages site | No larger than 1 GB | Service limit; locally enforced at `1,000,000,000` bytes by [build-static-site.mjs](../../../scripts/build-static-site.mjs) | The accepted live artifact uses 41.52% of the local decimal-byte ceiling; today's active-checkout build uses 48.15%. |
| Pages deployment | Times out after 10 minutes | Hard timeout | The last accepted deployment step took 11 seconds and its deployment job took 16 seconds. The separate custom build job is governed by Actions job limits. |
| Monthly bandwidth | Soft limit of 100 GB | Soft guidance; support contact, service interruption, or a CDN/hosting recommendation may follow sustained excess | Real per-visit transfer is not yet measured. Use the transfer envelope below, then measure representative cold and warm loads in OPS-006/OPS-004. |
| Build frequency | Soft limit of 10 builds per hour | Soft guidance; explicitly does not apply to custom GitHub Actions publishing | The repository uses a custom Actions workflow, so this particular Pages build-frequency limit does not apply. Actions trigger and concurrency limits still apply. |
| Request rate | Unspecified rate limits may apply and return HTTP `429` | Throttling behavior | Treat observed `429` responses as an operational incident and measure the requesting surface before changing hosting. |

GitHub states that exceeding Pages quotas can prevent service or prompt GitHub Support to recommend impact reduction, releases, a third-party CDN, or another host. The 100 GB bandwidth and 10-build values are therefore not guaranteed capacity reservations.

## Official GitHub Actions Limits

Sources: [Actions limits](https://docs.github.com/en/actions/reference/limits), [Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions), [artifact retention](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/removing-workflow-artifacts), and [workflow concurrency](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency), accessed 2026-09-01.

| Limit or behavior | Official value | Current consequence |
| --- | ---: | --- |
| GitHub-hosted job execution | 6 hours per job | The accepted Pages build job took 4 minutes 42 seconds; there is ample execution-time headroom. |
| Workflow run time | 35 days including waits and approvals | Not a practical constraint for the two-job Pages workflow. |
| Standard-runner concurrency | 20 concurrent jobs on GitHub Free, 40 on Pro, 60 on Team, and 500 on Enterprise | The current workflow needs at most one build and one dependent deploy job per run. Account plan was not inferred. |
| Artifact storage allowance | 500 MB on GitHub Free/Free organizations, 1 GB on Pro, 2 GB on Team, and 50 GB on Enterprise; shared with GitHub Packages | The account plan and Packages usage were not inferred. The Pages artifact is retained for one day, and the live artifact API reported zero active artifacts at the measurement time. |
| Included Actions minutes | Standard GitHub-hosted runners are free for public repositories and GitHub Pages | This public repository's current standard Ubuntu Pages jobs do not consume billable runner minutes; larger runners would still be charged. |
| Default artifact/log retention | 90 days; public repositories may configure 1–90 days | [pages.yml](../../../.github/workflows/pages.yml) explicitly sets the Pages artifact to one day, limiting steady-state storage exposure. |
| Workflow trigger events | 1,500 events per 10 seconds per repository | Far above the current publication cadence. |
| Queued workflow runs | 500 runs per 10 seconds | Far above the current publication cadence. |
| Concurrency group | One running and, by default, one pending run per group; a newer pending run replaces the existing pending run | The workflow groups by pull request or ref and sets `cancel-in-progress: false`, so a running publication completes while only the newest pending run for that group remains. |

The latest accepted artifact has expired under the one-day rule, so its historical compressed storage charge cannot be reconstructed from the current artifact API. Its uncompressed deployed payload is preserved below. Zero active artifacts means current retained artifact storage was zero at the measurement time; it does not mean the workflow never accrued storage.

## Current Repository And Deployment Measurements

### Accepted live deployment

The accepted production receipt at `.local-data/pr-validation/pages-final-verification.json` measured [Actions run 33415523618](https://github.com/jmarkmorris/architrino/actions/runs/33415523618) on commit `8df1d08fe913e5b3b2fba09c50bda7588d437637` at `2026-08-31T16:47:31.690Z`.

| Measurement | Result |
| --- | ---: |
| Published files | 4,011 |
| Uncompressed published bytes | 415,238,878 |
| Share of 1,000,000,000-byte local ceiling | 41.52% |
| Remaining headroom | 584,761,122 bytes, or 58.48% |
| Build job wall time | 4 minutes 42 seconds |
| Deploy job wall time | 16 seconds |
| Deployment action wall time | 11 seconds |
| Verified HTTPS artifact matches | 123 of 123 |

This is the authoritative live payload snapshot. Its file/hash checks establish delivery fidelity for the tested paths, not scientific correctness or exhaustive application behavior.

### Active-checkout reconstruction after storage reductions

At `2026-09-02T00:55:02Z`, `node scripts/build-static-site.mjs --out <empty-temp-directory>` reconstructed the site from local HEAD `16e78cc1fc8939e788f0d539735a0b98e7d68377` plus the active working-tree changes. Because the working tree was concurrently active, this measurement is a current planning snapshot, not a commit-bound release receipt.

| Measurement | Result |
| --- | ---: |
| Published files | 4,248 payload files plus `.nojekyll` |
| Uncompressed published bytes | 481,493,486 |
| Share of 1,000,000,000-byte local ceiling | 48.15% |
| Remaining headroom | 518,506,514 bytes, or 51.85% |
| Retained images | 53 |
| Excluded unused images | 333 files / 515,647,205 bytes |
| Candidate payload before unused-image exclusion | 997,140,691 bytes |
| Image-selection reduction from that candidate | 51.71% |

Plainly: the recent reduction removed more image bytes than the entire reconstructed site now publishes. The working site is not near the 1 GB ceiling, although active development has made today's reconstruction 66,254,608 bytes larger than the accepted live artifact.

### Source repository boundary

The GitHub repository API reported repository `size=2,563,244` KiB, approximately 2.62 GB, while the local clone reported a 4.4 GB `.git` directory with 3.30 GiB packed and 1.10 GiB loose objects. Those instruments measure different storage representations and must not be added together. Both show that the source repository is above the Pages-specific 1 GB recommendation, while the local `.git` directory remains below GitHub's separate [general 10 GB on-disk repository recommendation](https://docs.github.com/en/repositories/creating-and-managing-repositories/repository-limits).

The tracked working-tree files totaled 1,261,181,584 bytes at measurement time, but working-tree bytes are not the Git history size and are not the published payload. Existing historical objects were not purged by the recent generated-runtime and deployment-scope reductions; the reductions control current publication size and future Git churn.

## Monthly Transfer Envelope

The 100 GB Pages value is a soft monthly transfer limit, not a site-size multiplier. Without measured browser requests, the honest envelope is the average transfer budget per visit:

| Monthly visits | Maximum average transfer per visit at 100 GB/month |
| ---: | ---: |
| 100 | 1 GB |
| 1,000 | 100 MB |
| 10,000 | 10 MB |
| 100,000 | 1 MB |

Downloading today's entire 481,493,486-byte payload would consume the 100 GB envelope after about 208 complete downloads, but ordinary visits request only a subset and may reuse cached resources. Site size therefore cannot substitute for measured visit transfer. OPS-006 should identify shipping assets, and OPS-004 should measure representative cold/warm page loads before a bandwidth or CDN decision.

## Current Disposition

1. No hosting change is justified by the measured published-site size or deployment duration. Both the accepted live deployment and today's active-checkout reconstruction retain more than 50% headroom under the builder's 1,000,000,000-byte ceiling.
2. The recent storage reductions are effective: generated runtime outputs are rebuilt instead of tracked, unused images are filtered from Pages, development-only iOS/design/PowerPoint material is excluded from deployment, and the Pages artifact expires after one day.
3. The source repository remains above the Pages-specific 1 GB recommendation. That is a repository-health and clone-cost concern, not evidence that the published site violates its 1 GB service limit. Any historical object purge would require a separate explicit history-rewrite decision.
4. Bandwidth remains unknown because no representative per-visit network trace was measured here. Do not infer a CDN requirement from aggregate site bytes alone.
5. OPS-005 is unblocked at the dependency level, but an alternatives survey should still wait for the OPS-006 asset inventory and measured transfer evidence if it is meant to recommend a migration rather than merely list services.

## Reproduction And Falsifiers

- Rebuild measurement: `node scripts/build-static-site.mjs --out <empty-directory>`; a result at or above `1,000,000,000` bytes overturns the current site-size disposition and fails locally.
- Live Pages state: `gh api repos/jmarkmorris/architrino/pages`; a build type other than `workflow`, disabled HTTPS, or a changed domain overturns the current publication-path statement.
- Active artifact storage: `gh api repos/jmarkmorris/architrino/actions/artifacts --paginate`; retained artifacts or Packages usage can overturn the zero-current-artifact observation and must be assessed against the account's actual plan.
- Workflow timing: `gh run view <run-id> --json jobs`; a deployment action approaching 10 minutes or a GitHub-hosted job approaching 6 hours overturns the present timing comfort.
- Official limits can change. Recheck the linked GitHub documentation before using this packet for a later release or hosting decision.
