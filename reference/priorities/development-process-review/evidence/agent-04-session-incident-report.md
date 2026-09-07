# Agent 4 Session Incident Report: GitHub Connectivity Diagnosis in a Cowork Session

Agent: **Agent 4** (Claude, Cowork mode, model `claude-fable-5-1`).
Conversation title: no title was assigned or displayed to this agent. Identifying topic: **"Connecting Claude to GitHub from Cowork"** (operator's opening message: "in another thread you said you don't have gh access or credentials. What is the best way to connect you to github. Is there a skill I need to enable? a plug-in?").
Report written: 2026-09-07 03:49 UTC (sandbox clock; operator-side date reported by the session environment as Sunday 2026-09-06).
Evidence file: this document only. No other repository file was edited, staged, committed, or pushed by this agent.

## Coverage statement

**The entire conversation is available to this agent, uncompacted.** It is short: four operator messages and four agent replies before this report request. No earlier history in this thread was truncated. The "another thread" the operator refers to in the opening message is **not** accessible to this agent; every statement about it is a remembered claim relayed by the operator, not evidence.

All command outputs quoted below are original tool output reproduced verbatim from this conversation, except where marked "summary" or "remembered claim".

## 1. Scope and coverage

Original objective: determine how to give this Cowork session access to GitHub (read and write), after a different session reported it had no `gh` access or credentials.

How the work expanded: the operator asked for a re-check; then supplied a screenshot of the Connectors settings screen showing "GitHub Integration" connected; then asked a product-design question about why the connector path was hard to discover; then requested this incident report. No repository code, content, tests, hashes, or pins were touched at any point. This conversation contains **no test runs, no repairs, no commits, and no pushes**.

Environment during the conversation (measured by commands quoted in Section 2 and Section 5):

- Agent sandbox: Linux, kernel `6.8.0-136-generic` (Ubuntu 22.04 base), `aarch64`, `git version 2.34.1`, no `gh` binary.
- Operator host: macOS (`Darwin 25.6.0`, per session environment header; not independently measured).
- Local checkout `/Users/markmorris/vibe/architrino`, mounted in the sandbox at `/sessions/cool-vibrant-goodall/mnt/vibe/architrino`.
- Branch and commit at report time: `codex/peridot` at `b97703d989319aca877bb418cdc8b18b2fe104ec` (by `git --no-optional-locks rev-parse`, run once at report time; earlier in the conversation branch/commit were not measured).
- Remote: `origin https://github.com/jmarkmorris/architrino.git` (by `git remote -v`).
- Python venv: not invoked and not relevant to this conversation.

Portion inspectable: 100% of this thread. 0% of the referenced prior thread.

## 2. Failure inventory

### F01: GitHub connector tools absent from the session at start

- **What failed / practical effect.** No GitHub MCP tools were present in the session's tool list at the first three turns, so the agent could not read or write GitHub through a connector and told the operator no connector was available.
- **Operation.** Two connector-registry searches and one deferred-tool search:
  - `mcp__mcp-registry__search_mcp_registry` with keywords `["github", "git", "repository", "pull requests"]` (turn 1) and `["github"]` (turn 2).
  - `ToolSearch` with query `+github` (turn 2), result: `No matching deferred tools found`.
- **Shortest establishing excerpt (original tool output, turn 2 registry search).** The result list contained Firecrawl, alphaXiv, Ketryx, Exa, Microsoft Learn, Railway; no entry named GitHub. The only MCP server whose tools were deferred-listed at that point was the Gmail server (`mcp__4be79c26-...`).
- **Exit status.** Tools returned normally; the result set simply lacked GitHub.
- **Evidence location.** Turns 1 and 2 of this conversation, tool results.
- **Proposed cause (inference, not observed).** Connector tool sets are attached at session start; the operator's GitHub Integration connector was either connected after this session began or its chat/Cowork tool exposure was not enabled. The agent stated this as the likely cause in turn 3.
- **Response.** Agent advised (turn 1) adding GitHub's official MCP server as a custom connector at `https://api.githubcopilot.com/mcp/`, or using Claude Code with a local `gh` login; advised (turn 3) starting a new session.
- **Last observed outcome.** **Resolved within the session without a restart.** At turn 4 the system exposed 43 deferred GitHub tools under server id `mcp__936df4a9-9418-461c-9a6e-0aa763a62480__*` (including `push_files`, `create_pull_request`, `create_branch`, `merge_pull_request`, `list_issues`, `get_file_contents`). The agent's turn-3 claim that a new session would be required was therefore **contradicted by later evidence**. Unresolved: whether these tools came from the pre-existing "GitHub Integration" connector or from a custom connector the operator added after turn 1; the operator did not say and the agent cannot distinguish the two from tool names alone. **None of the GitHub tools were invoked**; their authorization scope is unmeasured (see Section 5).

### F02: `gh` CLI absent in sandbox

- **What failed / practical effect.** `gh` not installed; no GitHub CLI path available to the agent.
- **Operation.** `which gh git; gh auth status 2>&1 | head -3` (turn 1) and `which gh; gh auth status 2>&1 | head -3` (turn 2).
- **Excerpt (original).** `bash: line 1: gh: command not found` (both turns). `which gh` printed nothing; `which git` printed `/usr/bin/git`.
- **Exit status.** Non-zero from the shell for the missing command; captured and continued.
- **Environment.** Linux sandbox described above.
- **Evidence location.** Turns 1 and 2, bash tool results.
- **Proposed cause (inference).** The Cowork sandbox image does not ship `gh`. This is an unavailable prerequisite, not an executed-and-failed check.
- **Response.** None taken; the operator instruction for this report and general sandbox rules preclude installing tools. Reported to operator as a limitation.
- **Last observed outcome.** Unchanged; `gh` remained absent at the final check (turn 2). Not rechecked at report time.

### F03: GitHub REST API unreachable from sandbox (HTTP 403)

- **What failed / practical effect.** Direct HTTPS to `api.github.com` from the sandbox returned 403, so no API-based fallback existed from the shell.
- **Operation.** `curl -sI https://api.github.com -m 5 | head -1` (turns 1 and 2).
- **Excerpt (original).** `HTTP/1.1 403 Forbidden` (both turns).
- **Exit status.** curl completed; 403 is the response status.
- **Environment.** Linux sandbox with allowlisted egress.
- **Evidence location.** Turns 1 and 2, bash tool results.
- **Proposed cause (inference).** The sandbox egress proxy blocks `api.github.com` while permitting `github.com` (see F04 recovery). The 403 was not inspected further (no response body captured), so whether it was a proxy denial or a GitHub-side response is **not established**.
- **Response.** None; reported.
- **Last observed outcome.** Unchanged at turn 2.

### F04: Remote read via git initially unverified, then succeeded (sequence retained)

- **Turn 1 operation.** `git -C .../architrino remote -v 2>&1 | head -2`: printed the origin fetch/push URLs. This established the remote URL only; no network operation was attempted in turn 1.
- **Turn 2 operation.** `git -C .../architrino ls-remote origin HEAD 2>&1 | head -2`.
- **Excerpt (original, turn 2).** `316a9258dd5f91268a9a404f741b039b1844b696	HEAD`.
- **Practical effect.** Unauthenticated read of the public remote **works** from the sandbox. This was a **successful recovery**, not a failure; it is listed because the turn-1 reply implied the remote was unreachable ("no network route to github.com (403)") based only on the `api.github.com` probe, an over-generalization corrected in turn 2.
- **Note on values.** Remote `HEAD` observed at turn 2 was `316a9258...`; local `codex/peridot` HEAD at report time is `b97703d9...`. These are different refs (remote default branch vs. a local feature branch) and the difference is **not** evidence of drift or of any defect.
- **Push capability.** Never attempted. Not inferred.

### F05: Wrong browser tool loaded by keyword search (minor, no decision impact)

- **Operation.** `ToolSearch` query `repository pull request issue commit branch` (turn 4) returned unrelated tools (computer-use, Gmail draft update, Chrome network reader) rather than GitHub tools.
- **Effect.** None on the operator; a wasted round-trip. Listed for completeness because it preceded, and was immediately superseded by, the system-level appearance of the GitHub tool list in the same turn.

No hangs, timeouts, cancellations, or interruptions occurred in this conversation. Counts reconcile: five distinct items, F01–F05.

## 3. Changes and verification

- **Proposed changes.** None to the repository. The agent proposed operator-side configuration changes (add a custom connector; use Claude Code; start a new session). These are not repository changes.
- **Applied changes.** This evidence file only (this write).
- **Committed changes.** None.
- **Pushed changes.** None.
- **Verified repairs.** None claimed. No test, fixture, expected result, reference implementation, gate, hash, or pin was changed or examined.

## 4. Decisions to accept or defer failures

- **D01: Continue without `gh` (F02) and without API access (F03).** Rationale: unavailable prerequisites in the sandbox; installing tools is outside the agent's remit and outside this report's instructions. No operator authorization was requested or recorded because no workaround was attempted. Remaining risk: none to the repository; the limitation is environmental and persists for every Cowork session with this sandbox image. Owner: operator (environment/tooling choice). Classification: **unavailable prerequisite**, not an executed-and-failed test.
- **D02: Advise new session (turn 3) rather than continue probing.** Rationale stated: connectors attach at session start. Evidence: none beyond general product knowledge; **this was a remembered claim, not a measured one**, and turn 4 showed it to be at least incomplete (tools appeared mid-session). Risk: the operator may have restarted sessions unnecessarily in other threads on the same advice. Owner: none assigned. Follow-up: see Section 7.
- No check was disabled, skipped, or timed out.

## 5. Git and GitHub access

Reported separately by method. Nothing below establishes write authorization to GitHub; no write was attempted.

| Method | Intended capability | Observed result | Auth vs. authz | Exact unsuccessful operation |
|---|---|---|---|---|
| Local Git (sandbox) | Inspect checkout | Working. `git remote -v`, `rev-parse` succeeded. | No credentials involved. | None. |
| Remote fetch via git | Read public remote | **Working** (turn 2): `ls-remote origin HEAD` returned a SHA. | Unauthenticated read of a public repo; proves nothing about authentication or write authorization. | None. |
| Remote push via git | Write to remote | **Not attempted.** | Unknown; no credentials are visible to the sandbox by design. | N/A. |
| GitHub CLI (`gh`) | Read/write via CLI | **Unavailable**: `gh: command not found` (turns 1, 2). | N/A, binary absent. | `gh auth status`. |
| GitHub REST API (curl) | Fallback read | **Blocked**: `HTTP/1.1 403 Forbidden` to `https://api.github.com` (turns 1, 2). | Not an auth failure; unauthenticated probe. Likely egress policy (inference). | `curl -sI https://api.github.com -m 5`. |
| Connector registry search | Discover a GitHub connector | **No GitHub entry** in two searches (turns 1, 2). | N/A. | `search_mcp_registry(["github", ...])`. |
| GitHub MCP connector tools | Read/write via MCP | **Absent** turns 1–3; **present** from turn 4 (43 tools, server `936df4a9-...`). **Not invoked.** | Authentication implied by the operator's screenshot showing "GitHub Integration ... ✓" (summary of an image, not tool output). Authorization scope (which repos, read vs. write) **unmeasured**. | None attempted. |

Screenshot evidence (turn 3, operator-supplied image, agent's summary): Connectors page, "Your connectors" tab, "Connected" filter, listing GitHub Integration (Web, ✓), Gmail (Web, ✓), Browser (Desktop, Local dev, ✓), Claude in Chrome (Desktop, Included, ✓). No credentials, tokens, or URLs were visible in the image. No secrets appear in any diagnostic excerpt in this report.

## 6. Process problems and corrections

- **P01: Over-generalized negative (corrected).** Turn 1 stated "no network route to github.com (403)" from a probe of `api.github.com` only. Turn 2's `ls-remote` succeeded against `github.com`. Consequence: the turn-1 advice overstated the sandbox limitation. Corrected in turn 2. This is the AGENTS.md "claim narrower than its instrument" pattern.
- **P02: Unsupported attribution (contradicted).** Turn 3 attributed the missing tools to session-start binding and prescribed a restart. Turn 4 showed tools arriving mid-session. The attribution was not measured and was wrong or incomplete. Consequence: possibly unnecessary restart advice. Not corrected explicitly until this report, though turn 4's reply did note the tools had "just landed in this session".
- **P03: Product-design explanation offered as inference without labeling.** Turn 4's answer about why the connector UX is layered (legacy read-only integration, registry lag, custom-connector escape hatch) was reasoned from general product knowledge; it was hedged but not graded. It should be read as **guessed**, not derived or measured.
- **P04: Bootstrap reads partially performed.** For this report the agent read `CLAUDE.md` and `AGENTS.md` in full but did **not** read the generated router `reference/op/agent-startup-orientation.generated.md` or a workflow owner, judging the operator's explicit, narrowly scoped instruction to govern. Recorded here so a reviewer can decide whether that was acceptable.
- **P05: Redundant tool search (F05).** One keyword search returned irrelevant tools; no decision depended on it.
- **Successful recoveries.** F04 (remote read confirmed) and F01 (tools appeared, correctly acknowledged before answering the design question).
- **Missing evidence.** The prior thread that reported "no gh access or credentials" is unavailable; its diagnostics cannot be compared with this thread's.

## 7. Unresolved handoff

Ordered by consequence and dependency.

**Confirmed unresolved defects.** None in the repository. This conversation touched no repository code, tests, or content.

**Suspected defects needing verification.**
- S1. The GitHub MCP tool set (`936df4a9-...`) has never been exercised from a Cowork session in this thread. Its authorization scope (repository list, write permission, org access) is unknown. Verify with a read-only call such as `get_me` or `list_branches` on `jmarkmorris/architrino` before relying on `push_files` or `create_pull_request` in any publication procedure.
- S2. Whether Cowork attaches newly connected connectors mid-session or only at session start is unresolved; observed behavior contradicted the agent's stated model.

**Checks blocked by missing prerequisites.**
- B1. Any `gh`-based procedure in the sandbox (`gh: command not found`).
- B2. Any direct `api.github.com` call from the sandbox (`403`).
- B3. `git push` from the sandbox: untested and, with no credentials mounted, expected to fail; **expected**, not observed.

**Decisions still requiring review.**
- R1. Whether the repository's publication procedure (`reference/op/git/codex-pr-branch.md`, not read in this session) should recognize the GitHub MCP connector as an eligible push path for Claude sessions, given the 2026-09-06 equal-Git-write decision recorded in `CLAUDE.md` and `AGENTS.md`.
- R2. Whether the agent's departure from the full bootstrap sequence for a retrospective report (P04) is acceptable policy.

**Claims of repair lacking verification.** None; no repairs were claimed.

**Missing transcript sections or logs needed for independent review.**
- M1. The prior conversation in which the agent stated it lacked `gh` access, with its exact commands and outputs, to determine whether that finding was the same environmental limitation (F02/F03) or something else.
- M2. The operator's connector configuration history (when "GitHub Integration" was connected; whether a custom connector was added between turns 1 and 4), which only the operator's account settings can show.

This report's coverage of the present conversation is complete. Coverage of the referenced prior thread is nil, and the report should not be read as certifying any repository state.

## Appendix A: Diagnostic commands and original output

All output verbatim from the bash tool. Paths under `/sessions/cool-vibrant-goodall/mnt/vibe/` are the sandbox mount of `/Users/markmorris/vibe/`. No secrets were present.

Turn 1:

```
$ which gh git; gh auth status 2>&1 | head -3; git -C /sessions/cool-vibrant-goodall/mnt/vibe/architrino remote -v 2>&1 | head -2; curl -sI https://api.github.com -m 5 | head -1
/usr/bin/git
bash: line 1: gh: command not found
origin	https://github.com/jmarkmorris/architrino.git (fetch)
origin	https://github.com/jmarkmorris/architrino.git (push)
HTTP/1.1 403 Forbidden
```

Turn 2:

```
$ which gh; gh auth status 2>&1 | head -3; curl -sI https://api.github.com -m 5 | head -1; git -C /sessions/cool-vibrant-goodall/mnt/vibe/architrino ls-remote origin HEAD 2>&1 | head -2
bash: line 1: gh: command not found
HTTP/1.1 403 Forbidden
316a9258dd5f91268a9a404f741b039b1844b696	HEAD
```

Report time (environment measurement only; no test run):

```
$ cd /sessions/cool-vibrant-goodall/mnt/vibe/architrino && git --no-optional-locks rev-parse --abbrev-ref HEAD && git --no-optional-locks rev-parse HEAD && ls reference/priorities/development-process-review/evidence/ 2>&1; date -u; uname -a; git --version
codex/peridot
b97703d989319aca877bb418cdc8b18b2fe104ec
agent-01-pr-260-publication-incident-report.md
agent-02-hash-pin-repair-incident-report.md
Mon Sep  7 03:49:41 UTC 2026
Linux claude 6.8.0-136-generic #136~22.04.1-Ubuntu SMP PREEMPT_DYNAMIC Fri Jul  3 15:42:07 UTC  aarch64 aarch64 aarch64 GNU/Linux
git version 2.34.1
```

## Appendix B: Connector registry and tool-search results (original, abridged to names)

Turn 1, `search_mcp_registry(["github","git","repository","pull requests"])`: Digits, Firecrawl, alphaXiv, Freshservice, Alpha Vantage MCP Server, MuleSoft, Signeasy, august, Helix GenoSphere, Contentsquare. All `connected: false`. No GitHub entry.

Turn 2, `search_mcp_registry(["github"])`: Firecrawl, alphaXiv, Ketryx, Exa, Microsoft Learn, Railway. All `connected: false`. No GitHub entry.

Turn 2, `ToolSearch("+github")`: `No matching deferred tools found`.

Turn 4, system-provided deferred tool list (names only, server id `936df4a9-9418-461c-9a6e-0aa763a62480`): add_comment_to_pending_review, add_issue_comment, add_reply_to_pull_request_comment, create_branch, create_or_update_file, create_pull_request, create_repository, delete_file, fork_repository, get_commit, get_file_contents, get_label, get_latest_release, get_me, get_release_by_tag, get_tag, get_team_members, get_teams, issue_read, issue_write, list_branches, list_commits, list_issue_fields, list_issue_types, list_issues, list_pull_requests, list_releases, list_repository_collaborators, list_tags, merge_pull_request, pull_request_read, pull_request_review_write, push_files, request_copilot_review, run_secret_scanning, search_code, search_commits, search_issues, search_pull_requests, search_repositories, search_users, sub_issue_write, update_pull_request, update_pull_request_branch. None invoked.

## Appendix C: Diagnostic scripts

No scripts were written in this conversation. All diagnostics were one-line shell commands reproduced in Appendix A.
