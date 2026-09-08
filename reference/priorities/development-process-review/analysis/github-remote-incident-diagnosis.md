# Architrino Git remote incident: September 7, 2026

The operator describes this incident as preceded by myriad operator mistakes and Claude mistakes during a long recovery slog, while crediting Claude with finding a legitimate hash/pin problem. That is the operator's characterization of the broader experience, not a finding that assigns every recorded action to Claude. The aim is to turn those lessons into better working practices; particular attribution below remains tied to observed commands, logs, and stated uncertainty.

The companion [Git, Codex, and Claude process discussion](../processes-git-codex-claude.md) develops those lessons. The [technical recovery campaign](review-and-repair-plan.md) retains the original hash/pin work. This report was moved into that collection after the approved repair and push. Its dated investigation sections preserve what was known at each stage; the final completed-push section supersedes earlier no-push and not-on-GitHub snapshots. The original commit and its follow-up were verified on Architrino at the recorded completion, not merely inferred from a local commit message.

## Initial diagnosis: outcome and scope

Joint diagnosis with the Codex task Monday-am, the authoring task for the work in the latest commit. Monday-am confirmed a pause on edits, Git writes, fetches, tests, and publication. This investigation performed read-only inspection of the two working repositories and GitHub APIs. At this initial stage, the recovery artifacts and report were outside the working repositories. No remote repair, fetch, push, reset, rebase, branch deletion, or checkout had yet been performed by this investigation.

The measured failure is a wrong origin URL in the Architrino checkout followed by VS Code fetches from MyLists. This replaced local remote-tracking references, not the local working branch. The latest 77-file commit remains locally preserved and has an independently restored recovery copy. GitHub API observations at this initial stage did not show that commit in either repository.

## Protected work

- Commit: `54ac94f64b4401ae662bd9a7672c0927e3034c37`.
- Parent: `e09d3ceb6922b6a5392c0caf3c5907ad0feaa95f`.
- Tree: `a08617a095e928c379f37404f9a4295bb8bbeb55`.
- Branch: `codex/peridot`.
- Commit time: September 7, 2026, 19:29:29 EDT, by `git log -1` and HEAD reflog.
- Subject: Complete owned-supervisor recurrence repair and prescribed-response v2.
- Exactly 77 changed paths, by `git diff-tree --no-commit-id --name-only -r` and the saved manifest's line count. Monday-am independently checked the same count and recognized the source, tests, and retained evidence.
- Working tree and index matched HEAD in the scoped checks: `git --no-optional-locks status --short --untracked-files=all` returned empty and `git diff --quiet HEAD` exited successfully. These are snapshots, not protection against later concurrent writes.

Recovery artifacts remain outside the repository in `/Users/markmorris/.codex/visualizations/2026/09/07/01a07e3a-1691-7d71-9fb6-8b1cd7d6b1e8/github-incident-recovery/`. Only this report was relocated:

- `architrino-peridot-54ac94f64b44-recovery.bundle`: complete Peridot history, approximately 2.4 GiB. `git bundle verify` reported okay, complete history, and the exact protected branch tip. SHA-256: `0c58a747d20c316f3be7204d8cfe15b88363faff1d3d736ae9014735dbceedd0`.
- `architrino-54ac94f64b44.patch`: binary-capable one-commit format-patch. SHA-256: `a69881b37cbaa48ecd897a554519a4fc078da9b2ffeb8f29498f151a92bb7847`.
- `architrino-54ac94f64b44-files.txt`: exact changed-path manifest.
- `config-redacted.txt`: effective configuration provenance with credentials removed.

The bundle was cloned into a separate bare repository at `/private/tmp/architrino-recovery-verification-54ac94f64b44.git`. Its HEAD and tree matched the values above, and `cmp` confirmed an identical changed-path manifest. These artifacts are local recovery copies on the same Mac, not an off-device backup.

## Measured timeline

All times below are EDT; Claude audit timestamps are stored in UTC and converted by subtracting four hours.

1. 19:26:21: Claude's audit records an assistant message instructing the operator to change directory to MyLists and set its origin to a PAT-bearing MyLists URL. This was advice, not an executed tool command.
2. 19:26:48: The operator replied done. Claude then ran commands explicitly in MyLists, created a test commit, and pushed `2642351..18c2a1b` to MyLists main. The recorded tool result names MyLists as the destination.
3. 19:27:05: Claude's recorded cleanup push advanced MyLists main to `56afb5f`.
4. 19:27:10: Claude supplied an Architrino setup example with the correct Architrino directory and repository URL, asking the operator to insert the token.
5. 19:27:48: Architrino `.git/config` modification time, measured by `stat`. Modification time alone does not establish the writer or exact change.
6. 19:28:55: The operator told Claude, “i set up architrino. go ahead and do a commit and push on mylists.”
7. 19:29:02: The supplied VS Code log shows `git fetch --prune` from MyLists. It pruned local `origin/codex/peridot` and five other remote-tracking branch names and changed `origin/main` from Architrino `b97703d98` to MyLists `56afb5f95`.
8. 19:29:05: Claude's MyLists push result advanced MyLists main to `d7dc0d9`.
9. 19:29:29: The 77-file Architrino commit was created locally, by its Git metadata and reflog. The metadata does not establish which application initiated it.
10. 19:34:55: VS Code's subsequent fetch advanced the polluted local `origin/main` to MyLists `d7dc0d9`.

The supplied VS Code excerpt contains no git push command. That absence does not exclude commands in other terminals or logs.

## Repository boundaries observed during initial diagnosis

By separate `git rev-parse --show-toplevel` calls, the two checkout roots resolve to Architrino and MyLists respectively; their `.git` directories are separate directories. A shared project view does not, by itself, demonstrate that repository identity was shared.

The effective Architrino config identifies `.git/config` as the source of the erroneous PAT-bearing MyLists origin URL. The selected effective configuration inspection found the usual origin fetch refspec and Peridot upstream settings; no separate remote push URL or URL rewrite override was returned in that selected scope. The system credential helper is osxkeychain. The CLI account test used gh and returned jmarkmorris, with administrator permission on Architrino; this does not establish that ordinary git push currently uses the gh OAuth credential, because the origin URL contains a PAT.

Fresh GitHub branch API observations during diagnosis:

- Architrino main: `b97703d989319aca877bb418cdc8b18b2fe104ec`, matching local main.
- Architrino codex/peridot: `e09d3ceb6922b6a5392c0caf3c5907ad0feaa95f`, the protected commit's parent.
- All six branch names pruned locally are present on Architrino's server: codex/azurite-recovery, codex/borg-webapp-controls, codex/extend-a11-radius-program, codex/launch-braid-diagnostic-campaign, codex/peridot, codex/spinel-bc-landscape.
- MyLists main: `d7dc0d9dac5ccbe178f9a10d455620860edf79a6`, matching its local HEAD; its branch listing contains only main.
- The exact latest Architrino commit lookup returned HTTP 422, no commit found, in both repositories, using an authenticated account with repository access.
- `git merge-base` between the observed Architrino and MyLists main commits returned no common ancestor (exit 1) in the Architrino object database, which now contains the fetched MyLists objects. Their histories have not thereby been merged into the local Architrino branch.

These snapshots support local remote-reference pollution and preservation of the observed server branch tips. They cannot prove that a transient upload or a subsequently deleted remote ref never existed.

## Attribution and remaining uncertainty

A mistaken MyLists URL during manual Architrino credential setup is the leading inference: the setup dialogue, config modification time, and ensuing fetch fit that sequence. The selected Claude audit's recorded tool commands contain no remote-set-url mutation, and its actual publication commands target MyLists. The audit therefore does not support attributing the wrong remote directly to a Claude tool call. The exact terminal command remains unavailable: the visible shell-history files are older, and the usual per-session history directories do not exist here. Finding the actual setup command or another configuration-writing process would confirm or overturn this inference.

The initial raw remote inspection in this investigation printed the embedded PAT into tool output. It must be treated as exposed; subsequent inspection used a redactor tested first against synthetic URL and standalone-token cases. The original Claude transcript also contains the token. No token is included in this report or the redacted config artifact. Token revocation is an operator action separate from preserving the commit.

## Validation boundary

Monday-am reports that the last full Content Integrity run had 32 required passes, two failures, and one skipped group. The failures were a strict directory-link warning in the migration analysis and generated startup-orientation drift. The older successful receipt records the correct Architrino base but predates later content/contract changes; it does not certify this commit. Scoped passes reported by Monday-am are historical test evidence, not a complete publication gate. No tests or regeneration were performed during this diagnosis. Publication must remain separate from the unfinished campaign work.

## Repair proposed at initial diagnosis; later execution recorded below

1. Obtain operator approval for the bounded remote-configuration repair. Keep both agents paused and retain these recovery artifacts.
2. Set only the Architrino checkout's origin to the credential-free HTTPS URL for jmarkmorris/architrino. Verify effective fetch and push destinations and any rewrite overrides without printing credentials. Use the existing gh credential mechanism with minimal scope; avoid unrelated global changes.
3. After destination verification, fetch from the correct repository explicitly and without prune. Compare fetched branch tips with fresh GitHub API observations, not indefinitely with the historical SHAs above.
4. Confirm local Peridot HEAD and tree remain exactly the protected values, its parent is preserved, remote Peridot is an ancestor, and local main is unchanged. No reset, rebase, force push, branch deletion, or movement of local main is indicated by this diagnosis.
5. Separately resume publication when authorized: address the known validation blockers under the publication procedure and produce a new exact-state receipt against the restored correct base before any push. Do not infer publication readiness from the backup's integrity or from successful authentication.

A future prevention rule should require an explicit repository path and verification of repository root, branch, and sanitized destination immediately before any remote configuration change or push. Whether the project contains one or two repositories is secondary to verifying those identities. No policy or settings change was made here.

## Recovery verification completion

`git --git-dir=/private/tmp/architrino-recovery-verification-54ac94f64b44.git fsck --full --no-reflogs` completed with exit 0 and no reported object-integrity errors. The recovery copy therefore passed both bundle verification and a full Git object check after restoration. This establishes the integrity of the recovered Git history, not scientific correctness of the work or readiness to publish it.

## Approved first repair completed

The operator authorized step 1, the remote-configuration-only repair. Executed `git -C /Users/markmorris/vibe/architrino remote set-url origin https://github.com/jmarkmorris/architrino.git`; exit 0. Both `git remote get-url --all origin` and `git remote get-url --push --all origin` now return that exact credential-free Architrino URL. The effective configuration inspection returned no additional remote push URL or URL rewrite entries. No credential-helper configuration was changed.

Post-repair `git rev-parse HEAD HEAD^{tree}` still returned the protected commit and tree; `git --no-optional-locks status --short --untracked-files=all` returned empty. `gh auth status` still identifies jmarkmorris with its keyring OAuth credential; `gh repo view` confirms administrator permission on Architrino. No fetch or push was performed. The polluted remote-tracking refs remain for a separate, deliberate refresh, unless another application automatically fetches. The operator may revoke the exposed PAT; doing so will disable any other client still relying on that PAT, including the Claude setup described in the audit. This does not revoke the distinct GitHub CLI OAuth token.

## Approved tracking-reference refresh completed

After the operator reported revoking the PAT and authorized the refresh, fetched with `git -C /Users/markmorris/vibe/architrino -c credential.helper= -c 'credential.helper=!gh auth git-credential' fetch --no-prune origin`; exit 0. These credential options apply only to that command, with no persistent helper configuration change. The fetch restored all six Architrino remote-tracking branches and replaced the polluted local origin/main with b97703d989319aca877bb418cdc8b18b2fe104ec. The fetch's forced-update label describes the local tracking-reference correction, not a push.

Post-fetch verification: local HEAD and tree remain 54ac94f64b4401ae662bd9a7672c0927e3034c37 and a08617a095e928c379f37404f9a4295bb8bbeb55. Local main equals origin/main at b97703d989319aca877bb418cdc8b18b2fe104ec. origin/codex/peridot is e09d3ceb6922b6a5392c0caf3c5907ad0feaa95f. Fresh GitHub branch API calls agree with both fetched main and Peridot refs. git status -sb reports codex/peridot ahead 1 with no changed paths; git rev-list reports zero commits behind and one ahead; git merge-base --is-ancestor origin/codex/peridot HEAD, git diff --quiet HEAD, and git diff --check all exited 0. No push was performed. Validation and publication remain paused for operator direction.

## Approved validation blockers resolved

Operator authorized resolving the known validation blockers, with staging, committing and pushing deferred. Replaced the migration analysis's directory link with direct links to the three preserved source files. Regenerated startup orientation with its canonical generator; the sole generated change is the current check-content-integrity source fingerprint and line count. Monday-am independently reviewed both one-line changes, checked destination hashes and unchanged evidence bytes, and reported no findings.

The full `node scripts/pr-validation-receipt.mjs run --base origin/main` gate completed under owned supervisor run `5435bb86-2a10-4232-9b50-2ba0320fc96d` with exit 0, 60.225 seconds elapsed and processGroupClosed true. Its raw logs are `.local-data/owned-compute/logs/5435bb86-2a10-4232-9b50-2ba0320fc96d.stdout.log` and the corresponding stderr log (zero bytes). Results: foundational impact 27 groups passed, zero failed; Content Integrity 34 required passed, zero required failed, one opt-in reporting sweep skipped; animator runtime wiring passed. This is the required gate result, not a claim that the optional broad sweep ran or the unfinished research campaign is complete.

Receipt created at 2026-09-08T00:17:26.619Z in `.local-data/pr-validation/receipt.v1.json`; `verify --base origin/main` reported an exact state match. Post-gate Git checks confirm HEAD/tree are still the protected values, origin/main is the corrected Architrino base, fetch/push destinations both name Architrino, the index has no staged changes, and exactly the two expected files are modified. git diff --check passed. Later staging changes will invalidate this receipt and require publication revalidation. No commit or push was performed.

## Approved commit and push completed

Operator authorized staging, revalidation, commit and push of the two reviewed fixes alongside the protected original commit. Staged only the two named files. Full staged-state validation completed under run fc95821e-e9c9-45c8-a662-91ecd5643a64 in 59.28 seconds, exit 0, processGroupClosed true: 27 foundational groups passed; 34 required integrity checks passed; one opt-in reporting sweep skipped; animator wiring passed. Pre-commit and pre-push both verified and reused the exact matching receipt.

Created commit ad5685bdad1bc544c64904e846e2cd80270713df, Fix migration evidence links and refresh startup index, with protected commit 54ac94f64b4401ae662bd9a7672c0927e3034c37 as its immediate parent. Pushed explicitly from local refs/heads/codex/peridot to the same branch on origin using a per-command gh credential helper, without force. Git reported e09d3ceb6..ad5685bda to https://github.com/jmarkmorris/architrino.git, exit 0. The GitHub branch API returned the exact new local HEAD; the commit API now resolves the original 77-file commit in Architrino. Local HEAD and origin/codex/peridot match, git status -sb has no changed paths or ahead/behind marker, and the protected commit is an ancestor of the pushed branch by git merge-base --is-ancestor. No merge, branch rollover, or PR mutation was performed. Monday-am notified of successful preservation and publication.

This bounded commit/push step used four escalation invocations (stage, supervised gate, commit, push), zero additional operator decision questions. Host interactive permission count and persisted approval reuse count are not exposed, so both are unknown.
