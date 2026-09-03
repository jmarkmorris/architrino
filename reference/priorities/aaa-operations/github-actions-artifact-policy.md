# GitHub Actions Artifact Policy

## Purpose

This policy defines the retention, size, provenance, and privacy requirements for files uploaded through GitHub Actions. It governs workflow artifacts, including Pages deployment handoffs, diagnostic bundles, visual captures, benchmark profiles, review bundles, and any proposed research output. It does not govern ordinary Actions logs, Git-tracked files, ignored local research data, GitHub Releases, or an independently approved durable archive.

Plainly: an Actions artifact is temporary workflow storage. It is useful for transferring a deployment or inspecting a recent run, but it must not become an accidental archive or the only copy of important evidence.

## Required Upload Contract

Every `actions/upload-artifact` or `actions/upload-pages-artifact` step must declare or inherit all of the following before it is accepted:

1. A class from the retention table below.
2. A stable artifact name and an upload condition that identifies which events create it.
3. An explicit `retention-days` value; repository defaults are not sufficient.
4. A deterministic pre-upload size guard measured as the sum of regular-file bytes before compression. The guard must fail the workflow when the class cap is exceeded.
5. A bounded manifest or job summary naming the commit SHA, workflow and run identity, producing command, file count, uncompressed bytes, and claim boundary. Use the upload action's returned digest as transport-integrity evidence when the artifact is later consumed.
6. A privacy check that excludes credentials, tokens, host secrets, private media, user data, local absolute paths, and any other material unsuitable for readers of this public repository.
7. A durable-capture decision before expiry for any result used in a release, scientific claim, performance threshold, or operational decision. Preserve a compact receipt, hash, summary, or approved archive pointer; do not extend retention merely because nobody triaged the artifact.

Symlinks, sockets, device files, and unconstrained directory uploads are not accepted artifact inputs. A new artifact producer must enumerate its owned output root and must not recursively upload the checkout or `.local-data/`.

## Retention And Size Classes

All non-Pages caps below use binary mebibytes. The Pages cap retains the existing exact decimal-byte ceiling aligned with the GitHub Pages site limit.

| Artifact class | Maximum pre-upload bytes | Retention | Upload condition | Durable disposition |
| --- | ---: | ---: | --- | --- |
| Pages deployment handoff | `1,000,000,000` uncompressed bytes | 1 day | Each run that must prove deployable packaging | Deployment receipt records the run, commit, artifact digest, deployed byte count, and acceptance result. The artifact itself is reproducible and temporary. |
| Failure diagnostic bundle | `104,857,600` bytes / 100 MiB | 7 days | `failure()` only, and only when ordinary logs lack the required state | Preserve only a compact issue/priority receipt when the failure changes a decision. Do not duplicate ordinary logs as an artifact. |
| Browser or visual-regression capture | `262,144,000` bytes / 250 MiB | 14 days | Failed visual check or explicit review run | Promote an accepted appearance baseline through its owning workflow; otherwise retain the run link and bounded review result only. |
| Benchmark or performance profile | `104,857,600` bytes / 100 MiB | 14 days | Explicit benchmark, scheduled profile, or release-gate run | Record decision-bearing measures, instrument identity, environment, and falsifier in the owning operations packet before expiry. |
| Review bundle | `262,144,000` bytes / 250 MiB | 14 days | Explicit reviewer/export request | Keep the authored sources and bounded review receipt; the bundle remains reproducible unless separately designated as an approved release. |
| Raw scientific, EOM solver, or analytical campaign output | Prohibited by default | None by default | No generic workflow upload | Use ignored local storage or an explicitly approved durable archive under the machine-artifact retention contract. A temporary exception requires an owner, exact cap no greater than 500 MiB, retention no greater than 7 days, reproduction/archive route, compact hash-bound receipt, and explicit operator approval. |
| Sensitive or private material | Prohibited | None | Never | Route through an approved private system; public-repository Actions artifacts are not an authorized privacy boundary. |

The class cap applies to each artifact and to the sum of artifacts uploaded by one job. Splitting one payload across names does not multiply its budget. A workflow may define a smaller cap or retention period but may not exceed this table without an explicit policy update and owner approval.

## Aggregate Storage Rule

Artifact retention overlaps across completed runs. A one-day setting therefore does not mean that only one artifact exists at a time. Before adding any routine non-Pages artifact producer, verify the account's current artifact allowance, GitHub Packages use, active artifacts, expected runs per day, and the maximum overlap implied by retention.

Until the account allowance and shared Packages consumption are available to the instrument, use GitHub Free's 500 MB artifact allowance as the conservative planning boundary. At 80% of the verified allowance—or 400 MB while the allowance is unknown—do not start optional capture, benchmark, or review uploads. Deployment may proceed only through its existing guarded path; investigate repeated-run overlap rather than deleting evidence automatically.

Artifact deletion is a deliberate cleanup action because GitHub says deleted artifacts cannot be restored. Automation must not delete an untriaged artifact, an artifact named by an open release/incident review, or the only durable copy of a result. Expiry is acceptable only after the class's durable-disposition rule is satisfied.

## Current Workflow Audit — 2026-09-01

Official limits and billing behavior are recorded in [GitHub Pages And Actions Limits — 2026-09-01](github-pages-and-actions-limits-2026-09-01.md). The live workflow audit found two workflows and one artifact-producing step.

| Workflow | Artifact behavior | Disposition |
| --- | --- | --- |
| [Content Integrity](../../../.github/workflows/content-integrity.yml) | Produces ordinary Actions logs only; no upload action. | Compliant; no artifact retention setting is required. |
| [Build and deploy Pages](../../../.github/workflows/pages.yml) | `actions/upload-pages-artifact@v5` uploads `.tmp/site`; `retention-days: 1`. [build-static-site.mjs](../../../scripts/build-static-site.mjs) fails before upload above `1,000,000,000` uncompressed bytes. | Compliant as a Pages deployment handoff. The workflow names the step and states its inherited size/retention contract inline. |

The GitHub artifact API returned 30 historical `github-pages` artifacts and no active artifacts at `2026-09-02T01:05:10Z`. The largest listed artifact was 1,261,964,485 stored bytes on 2026-08-28. The accepted post-reduction artifact was 197,078,868 stored bytes on 2026-08-31, an 84.38% reduction. These are GitHub's stored artifact sizes, not uncompressed published-site bytes.

At `2026-08-31T16:46:29Z`, seven unexpired artifacts overlapped for a combined 2,887,292,067 stored bytes because several workflow runs completed within one retention window. This observed peak includes pre-reduction and post-reduction artifacts. It proves that one-day retention alone does not bound aggregate storage to one artifact and motivates the aggregate rule above; it does not establish the account's billed amount or allowance.

Plainly: the newest Pages artifact is much smaller, but repeated builds can still stack up for a day. The next storage improvement, if needed, is to control which events need a packaged artifact or to verify the account allowance—not to weaken release evidence or delete artifacts blindly.

## Workflow Author Checklist

Before merging an artifact-producing workflow:

- name the artifact class, output root, event condition, cap, and retention;
- run the pre-upload byte guard and reject non-regular or out-of-root files;
- exclude private and sensitive material explicitly;
- state whether the artifact is reproducible, diagnostic, review-only, or decision-bearing;
- capture a compact durable receipt when a later consumer depends on the result;
- calculate maximum active overlap from runs per day and retention;
- check current active storage and Packages sharing against the verified account allowance;
- preserve deployment and scientific claim boundaries; successful upload proves transport, not result correctness;
- rerun the workflow-specific validation and `git diff --check`.

## Verification And Falsifiers

- Inventory upload actions with `rg -n "upload-(pages-)?artifact|retention-days" .github/workflows` and inspect every result. An upload without an explicit class, retention, and size guard overturns current compliance.
- Query `gh api repos/jmarkmorris/architrino/actions/artifacts --paginate` for active size and overlap. New artifact names or retained-byte growth overturn the dated inventory.
- Recheck [GitHub Actions limits](https://docs.github.com/en/actions/reference/limits), [Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions), and [artifact retention](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/removing-workflow-artifacts) before changing caps or retention.
- The actual account allowance and GitHub Packages usage remain unresolved. A verified allowance replaces the conservative 500 MB planning boundary; it does not automatically authorize larger artifact classes.
