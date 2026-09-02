# Pages Incident And Rollback Runbook

## Purpose And Claim Boundary

This runbook advances OPS-009 by defining the response to broken, stale, slow, or over-budget GitHub Pages deployments. The dated [rollback rehearsal](pages-rollback-rehearsal-2026-09-01.json) proves last-known-good source selection, isolated reconstruction, full integrity checks, static payload construction, same-environment byte repeatability, and required communication fields. It does not prove a production rollback because no workflow was re-run and no public deployment changed.

Official GitHub documentation accessed on 2026-09-01 states that a workflow can be re-run for 30 days, that the re-run preserves the original `GITHUB_SHA` and `GITHUB_REF`, and that it uses the original triggering actor's privileges. Use [Re-running workflows and jobs](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/re-run-workflows-and-jobs) and the [`gh run rerun` manual](https://cli.github.com/manual/gh_run_rerun) as the current command authority.

Plainly: the safe rollback is a full re-run of a previously successful main workflow, not branch-mode Pages, a force push, an expired artifact download, or a deploy-job-only retry. The full re-run rebuilds the old source commit and then deploys its new artifact.

## Incident Classes And First Response

| Symptom | Confirm with | Immediate containment | Recovery route |
| --- | --- | --- | --- |
| Broken | Root or required route returns an unexpected status, empty shell, wrong content, certificate failure, or failed deployment | Preserve the response and run evidence; pause new deployments if another main run could worsen the incident | Roll back to the most recent independently verified successful main run, then repair forward through the ordinary PR path. |
| Stale | Public content does not match the accepted main commit or the last successful deployment receipt | Compare Actions run SHA, Pages state, public response hashes, and expected manifest before changing anything | Re-run the correct current main workflow if the artifact is wrong; use last-known-good rollback if current main itself is bad. |
| Slow | Representative route latency or deployment time crosses an accepted budget | Preserve route, timing method, cache state, region, run, and response headers; do not infer cause from one sample | Roll back only when the regression is release-bound and the prior receipt is measurably better; otherwise rerun the accepted browser-performance budget or route to provider incident handling. |
| Over budget | Static payload, measured transfer, Actions artifact, or deployment timing reaches its accepted threshold | Stop publication if the builder or release gate fails; identify the exact budget class | Reduce the owning payload or revert the release-bound change. Do not trade solver, browser, transfer, and artifact budgets against one another. |

An observed `429`, certificate failure, unexpected public data exposure, root outage, or wrong deployment commit is high urgency. A single slow sample without controlled cache and route conditions is evidence to measure, not proof of a performance incident.

Plainly: first identify which contract failed. A large repository is not automatically a large visit, and a slow browser route is not automatically a slow deployment.

## Evidence To Capture Before Mutation

Record these fields in the incident log before pausing, cancelling, re-running, or repairing when time permits:

1. UTC detection time and detector.
2. Affected origin, route, and user-visible symptom.
3. HTTP status, redirect chain, certificate state, relevant response headers, and a bounded response hash or screenshot.
4. Current Pages API state, latest main workflow run ID, run attempt, event, branch, commit, conclusion, and job timings.
5. Expected release receipt and the first mismatched path or budget.
6. Whether a Pages run is queued or in progress.
7. Initial severity, containment owner, and next update time.

Useful read-only commands:

```bash
gh api repos/jmarkmorris/architrino/pages
gh run list --workflow pages.yml --branch main --limit 20 --json databaseId,attempt,event,headBranch,headSha,status,conclusion,createdAt,updatedAt,url
gh run view RUN_ID --json databaseId,attempt,event,headBranch,headSha,status,conclusion,createdAt,updatedAt,url,jobs
curl -sSIL https://www.architrino.com/
```

Do not include credentials, private request data, local private paths, query strings, or user content in a public incident record.

## Pause And Contain

The workflow's `ARCHITRINO_PAGES_DEPLOY_ENABLED` repository variable gates the entire deploy job while leaving builds and pull-request checks available. Setting it to `false` does not cancel an already-running deployment.

```bash
gh variable set ARCHITRINO_PAGES_DEPLOY_ENABLED --body false
gh run cancel RUN_ID
```

Use the cancel command only for an identified queued or in-progress Pages run that could publish the bad state. Record the run ID and reason. Do not disable the workflow or switch Pages to branch publishing; the branch path omits generated runtime assets and bypasses the accepted build contract.

## Select A Last-Known-Good Run

A rollback target must satisfy all of these conditions:

- the workflow event was `push` or an explicitly accepted `workflow_dispatch`;
- the ref was `main` and the commit is still reachable;
- both build and deploy jobs succeeded;
- a release or final-verification receipt identifies the public routes and payload expected from that run;
- the run is within GitHub's 30-day re-run window;
- no known incident or later invalidation applies to that source state.

Inspect, do not infer, the candidate:

```bash
gh run view RUN_ID --json databaseId,attempt,event,headBranch,headSha,status,conclusion,createdAt,updatedAt,url,jobs
git cat-file -e COMMIT^{commit}
```

The current dated rehearsal used successful main push run `33415523618` at commit `8df1d08fe913e5b3b2fba09c50bda7588d437637`. This is rehearsal evidence, not a permanent rollback target; choose the newest independently verified good run during an actual incident.

## Dry Reconstruction Before A Live Rollback

When the outage allows time, reconstruct the selected commit in a disposable clone rather than altering the active checkout. Run the selected commit's own integrity and static-builder commands. Verify file count, byte count, CNAME, `.nojekyll`, key routes, generated-runtime count, and same-environment repeatability.

The 2026-09-01 rehearsal passed every integrity check, produced 4,011 deployment files twice, and the two local payloads were byte-identical at 415,238,969 bytes. The historical Actions receipt was 415,238,878 bytes: the net 91-byte difference came from 40 generated Borg record JSON files, while all checked non-Borg files matched. This establishes reproducible source selection and same-environment construction but falsifies a cross-environment byte-parity claim.

Plainly: the old source can still build, but the generated numeric records are not identical between the historical Linux build and this local reconstruction. A live GitHub re-run is therefore still required to prove the actual production rollback path.

## Execute The Live Rollback

This section changes production. Verify that no newer main run is queued or in progress, record approval and the exact target, then enable deployment and re-run the entire selected workflow:

```bash
gh variable set ARCHITRINO_PAGES_DEPLOY_ENABLED --body true
gh run rerun RUN_ID
gh run watch RUN_ID --exit-status
```

Do not use `--failed` or a deploy-job-only re-run for rollback. The Pages artifact expires after one day, and the rollback contract requires the selected commit's build and validations to run again. GitHub documents that a re-run keeps the original SHA and ref; confirm those fields on the new run attempt rather than relying on the command alone.

If the build or deploy fails, set the deploy variable to `false`, preserve the failed attempt and logs, and select another independently verified target or repair forward. Do not force-add ignored runtime output, rewrite main, or substitute branch publishing.

## Verify Recovery

A green deploy job is necessary but not sufficient. Record all of these before declaring recovery:

1. The re-run attempt reports the intended run ID, original commit SHA, main ref, successful build, and successful deploy.
2. The Pages API reports `built`, `workflow`, the expected CNAME, and enforced HTTPS.
3. Root, `404`, one document route, and each affected app route return the expected status and redirect behavior.
4. The expected public receipt or independently enumerated manifest matches representative critical files by byte count and hash.
5. The original broken, stale, slow, or over-budget symptom is absent under the same measurement conditions that detected it.
6. No newer queued run can immediately replace the recovered deployment.

If rollback restores service, keep deployment enabled only when ordinary main publication is safe. Otherwise pause again after the successful rollback and explicitly coordinate the repair release.

## Communication Sequence

### Initial notice

- Status: investigating.
- Detection time in UTC.
- Affected public origin and routes.
- User-visible impact stated without an unproved cause.
- Containment action taken or pending.
- Incident owner and next update time.

### Rollback notice

- Status: rollback started.
- Selected run ID, commit, and why it qualifies as last-known-good.
- Current step: paused, rebuilding, deploying, or verifying.
- Explicit statement that recovery is not yet confirmed.
- Next update time.

### Recovery notice

- Status: recovered or partially recovered.
- Successful rollback run attempt and commit.
- Public checks performed and any remaining affected surface.
- Whether ordinary deployment remains enabled or paused.
- Follow-up owner and next checkpoint.

### Closeout

- Detection, containment, rollback, verification, and close times.
- Root cause with evidence grade; use `unknown` until proved.
- Exact affected and unaffected surfaces.
- Corrective change, prevention test, and rollback lesson.
- Links to the run, receipt, incident record, and follow-up task.
- User action, normally `none`, unless a cache or saved-state step is independently required.

The [rehearsal receipt](pages-rollback-rehearsal-2026-09-01.json) records `template_fields_verified_by_test`; no external incident message was sent.

## Current Verification Boundary

OPS-009 remains awaiting verification. The runbook, source reconstruction, same-environment repeatability, and communication drill pass. Completion still requires one controlled live Actions re-run through production verification and an explicit disposition of the cross-environment generated Borg record drift. No production incident was created merely to exercise the rollback.

Closure goal: prove one full source-bound Pages rollback through a controlled live re-run, public identity checks, and the recorded communication sequence without bypassing the Actions publication contract.
