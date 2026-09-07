# Agent 5 Session Incident Report: GitHub Connector Availability in Cowork

Agent number: **Agent 5**. Conversation title: **not exposed to the agent by the interface.** Identifying topic: whether a Claude Cowork session on macOS has GitHub access through a connector, what that connector can do, and (as a tail) Claude Desktop appearance settings. This is retrospective reporting only. No tests were run, no repository files other than this one were written, and no Git or GitHub mutations were performed by Agent 5 at any point in the conversation or in preparing this report.

## Transcript availability statement

The full conversation history is available to Agent 5 in this session. No compaction or truncation notice was received. Every exchange from the first operator message ("do you have access to github via the connector") through the report request is inspectable, including every tool call and its raw result. There is no earlier history: this session began with that message.

Evidence classes used below:

- **Original tool output**: text returned by a tool call in this session, quoted verbatim or excerpted with an explicit "excerpt" label.
- **Operator-supplied image**: two screenshots the operator pasted; Agent 5 can see them but cannot inspect the underlying app state.
- **Agent statement**: something Agent 5 said in chat, which is a claim, not evidence.
- **Web source**: content fetched from support.claude.com during the session, cited by URL.

## 1. Scope and coverage

- **Date**: 2026-09-06 (session environment date, US); the sandbox clock read `Mon Sep 7 03:50:04 UTC 2026` at report time (original tool output). All events fall in one contiguous session of roughly a few hours at most; exact timestamps are not exposed by the interface.
- **Original objective**: operator asked whether Agent 5 had GitHub access via a connector.
- **How the work expanded**: (a) operator added a "GitHub Integration" connector and asked whether a restart was needed; (b) operator asked whether that integration was read-only and requested the official guidance; (c) operator added a second, custom GitHub MCP connector and asked Agent 5 to check it; (d) operator asked for the GitHub login email; (e) operator asked about changing Claude Desktop screen/background colors; (f) operator requested this report.
- **Not in scope of this conversation**: no Architrino source, test, fixture, hash, pin, or content file was read, executed, or modified before the report request. The only repository reads were the bootstrap reads required by `CLAUDE.md` (`CLAUDE.md`, `AGENTS.md`, `reference/op/agent-startup-orientation.generated.md`) and one directory listing of the evidence folder, all performed after the report request.
- **Environment (measured where stated)**: Cowork mode in the Claude desktop app on macOS (host `Darwin 25.6.0` per session environment block); shell commands run in an isolated Linux sandbox with the `vibe` folder mounted at `/sessions/<session>/mnt/vibe/`. Runtime versions were not queried. Branch and commit of the checkout were not queried (no `git` command was run) and are therefore unknown to this report.

## 2. Failure inventory

Every non-success, warning that affected a decision, and unsuccessful access attempt visible in the conversation is listed. None involved a test, build, or repository check.

### F01: GitHub connector not present in session tool set (first check)

- **What failed / effect**: Agent 5 could not act on GitHub because no GitHub tools existed in the session. Operator's question could only be answered "no."
- **Operation**: `mcp__mcp-registry__list_connectors` with `keywords: ["github"]`.
- **Diagnostic excerpt (original tool output)**:
  `{"connectors":[],"keywords":["github"],"note":"No installed connectors found — the card did not render. Offer to search the registry (search_mcp_registry)."}`
- **Status**: tool completed normally; empty result.
- **Environment**: Cowork session as above. At that moment the deferred tool list contained a Gmail connector (`mcp__4be79c26-…`) and no GitHub tools (measured by the session's deferred-tool listing, which Agent 5 can read).
- **Evidence location**: first tool call of the conversation.
- **Proposed cause (inference, not observed)**: connectors are bound at session start; the operator had not yet added a GitHub connector, or had added one that does not expose tools to Cowork.
- **Response**: Agent 5 reported no GitHub connector and offered registry search, sandbox `git`, or browser as alternatives.
- **Last outcome**: superseded by F02 and the later successful check (Section 5).

### F02: "GitHub Integration" connected in settings but no tools in session

- **What failed / effect**: after the operator added "GitHub Integration" (visible in operator-supplied screenshot 1 with a checkmark under Status, Type "Web"), Agent 5 still had no GitHub tools. Operator asked whether a restart was needed.
- **Operation**: `ToolSearch` with query `github`, `max_results: 5`.
- **Diagnostic excerpt (original tool output)**: `No matching deferred tools found`
- **Status**: completed; no match.
- **Environment**: same session as F01 (the operator stated "you are a new session since I added this"; Agent 5 cannot verify session boundaries beyond the fact that its own history starts at the first message).
- **Evidence location**: second tool call.
- **Proposed cause (inference)**: Agent 5 advised that connectors attach at session start and suggested starting a new session. **This diagnosis was later contradicted**: the built-in "GitHub Integration" does not expose MCP tools to a Cowork session at all (see F03 and the support article in Section 5), so a restart alone would not have resolved F02.
- **Response**: advised new session; advised checking per-surface enablement.
- **Last outcome**: superseded when the operator added a different connector (Section 5). Whether the built-in integration ever contributes tools to Cowork remains **unverified by Agent 5**; it was not observed to.

### F03: Agent 5's read-only characterization required correction, then re-correction

- **What happened / effect**: Agent 5 stated, from the support article, that the GitHub Integration is read-only. When GitHub tools later appeared, Agent 5 said "I was wrong earlier about it being read-only." The operator then clarified that the tools came from the custom MCP connector Agent 5 had recommended, not the built-in integration, so the original read-only characterization stood. Practical effect: a brief incorrect self-correction in chat; no action taken on it.
- **Operation**: `WebSearch` (domain-limited to support.claude.com, docs.claude.com, code.claude.com) followed by `mcp__workspace__web_fetch` of `https://support.claude.com/en/articles/10167454-use-the-github-integration`.
- **Diagnostic excerpt (web source, excerpt)**: FAQ "What information is retrieved from GitHub? Only files (names and contents) in a repo on a specific branch are synced. We do not retrieve commit history, PRs, or other metadata."
- **Status**: fetch completed normally.
- **Evidence location**: the web-fetch result and the three subsequent chat turns.
- **Proposed cause (inference)**: the new tool prefix (`mcp__936df4a9-…`) did not identify which connector supplied it, and Agent 5 assumed it was the built-in integration.
- **Response**: operator corrected; Agent 5 acknowledged.
- **Last outcome**: resolved by operator statement. The report treats "built-in GitHub Integration is read-only for Cowork purposes" as **inferred from documentation**, not measured; Agent 5 never observed the built-in integration expose any tool.

### F04: GitHub connector does not return an email address

- **What failed / effect**: operator asked "what is my login email?"; the connector's identity call returned no email field, so the question could not be answered from tool output.
- **Operation**: `mcp__936df4a9-9418-461c-9a6e-0aa763a62480__get_me` (no arguments).
- **Diagnostic excerpt (original tool output)**:
  `{"login":"jmarkmorris","id":14032547,"profile_url":"https://github.com/jmarkmorris",…,"details":{"name":"J Mark Morris","company":"Architrino",…,"public_repos":1,…}}` — no `email` key present in the full result.
- **Status**: completed normally.
- **Evidence location**: the single `get_me` call.
- **Proposed cause (inference)**: the MCP server omits email, or the token scope excludes `user:email`. Not tested.
- **Response**: Agent 5 reported the login and noted the Claude account email from the session context without asserting it is the GitHub email.
- **Last outcome**: unresolved and low consequence.

### F05: No supported way to set a custom Claude Desktop background color

- **What failed / effect**: operator wanted a custom background color compatible with the Anthropic orange; the only documented options are Light / Dark / Match System. Agent 5 cannot change app settings from its tools in any case.
- **Operation**: `WebSearch` limited to support.claude.com.
- **Diagnostic excerpt (web source, summarized by the search tool, not fetched verbatim)**: Settings → Appearance → Color mode offers Light, Match System, Dark. Source: `https://support.claude.com/en/articles/8887527-customizing-your-appearance-settings`.
- **Status**: search completed. The article itself was **not fetched**; the characterization rests on the search tool's summary.
- **Evidence location**: last web search before the report request.
- **Proposed cause**: product limitation (inferred from documentation).
- **Response**: Agent 5 listed OS-level and browser-CSS workarounds. None were applied.
- **Last outcome**: no action; not a repository matter.

### Counting note

Five items. No hangs, timeouts, cancellations, or interrupted tool calls occurred. No tool returned an error status. F01 and F02 are the same underlying condition observed twice under different operator actions and are kept separate because the operator's intervening change (adding a connector) altered the environment.

## 3. Changes and verification

- **Proposed changes**: (i) start a new Cowork session (F02 advice; contradicted later); (ii) add the GitHub MCP server as a custom connector at `https://api.githubcopilot.com/mcp/`; (iii) OS-level or browser-CSS color workarounds. All were chat proposals.
- **Applied changes**: none by Agent 5 to any repository file before this report. The operator applied (ii) outside the conversation; evidence is the appearance of 44 `mcp__936df4a9-…` GitHub tools in the deferred tool list and the operator's statement "I just finally followed your instructions."
- **Committed changes**: none.
- **Pushed changes**: none.
- **Verified repairs**: the connector availability was verified by one read call (`get_me`) succeeding. That verifies authentication and read of the caller's own profile only.
- **Hash and pin changes**: none. No test, fixture, expected result, reference implementation, or gate was changed or touched.

The only file written by Agent 5 is this report.

## 4. Decisions to accept or defer failures

- **F02 (restart advice)**: work continued on Agent 5's advice to restart. No operator authorization was needed; the advice was later shown insufficient. Risk: an operator following it alone would not have gained GitHub tooling. Corrected in-conversation by the operator adding the MCP connector. Owner: operator (done).
- **F04 (no email)**: accepted as non-blocking with no follow-up. Rationale: no task depended on it.
- **F05 (colors)**: accepted as a product limitation; no follow-up.
- **Bootstrap workflow read**: after the report request, Agent 5 read `CLAUDE.md`, `AGENTS.md`, and the generated router, then did **not** read a workflow owner file (e.g., `reference/op/brainstorming.md` or `operator-explanation-standard.md`) before writing. Rationale: the report request fixed the output format and reply shape explicitly, and every listed workflow card presumes an editing, research, or publication task rather than a single evidence-file write. Risk: this report may not conform to the operator explanation standard in tone or structure. Owner: reviewer of this evidence set. This is recorded as a deliberate deviation, not an oversight.
- **No `git` inspection run**: Agent 5 did not run `git --no-optional-locks status` or query branch/commit, to honor "do not perform Git/GitHub mutations" conservatively and because nothing in the conversation depended on repository state. Consequence: Section 1's branch/commit fields are unknown. This is an unavailable-prerequisite-by-choice, not a failed check.

## 5. Git and GitHub access

Reported separately per method. No credentials, tokens, headers, or cookies appeared in any tool output in this session; nothing to redact beyond what is stated.

- **Local Git (sandbox shell)**: not attempted. Capability intended: none requested. Result: unknown. Agent 5 stated in chat that local commits would work and pushes would need operator-configured credentials; that is an **agent statement**, not measured.
- **Remote fetch/push**: not attempted. Result: unknown.
- **GitHub CLI (`gh`)**: not attempted; presence in the sandbox was not checked. Result: unknown.
- **Built-in "GitHub Integration" connector (Type: Web, per operator screenshot 1)**: intended capability per support article: attach/sync repo files into Chat and Projects; select repos for Claude Code remote sessions. Observed result in this Cowork session: **no tools exposed** (F01, F02 — original tool output). Authentication: shown as connected in the operator's settings screenshot; Agent 5 could not test it. Authorization: not applicable, since no tool was reachable. Exact unsuccessful operations: `list_connectors(keywords=["github"])` → empty; `ToolSearch("github")` → no match.
- **Custom GitHub MCP connector (tool prefix `mcp__936df4a9-9418-461c-9a6e-0aa763a62480__`)**: appeared after the operator added it. Intended capability per tool names present in the deferred list: read (`get_file_contents`, `list_commits`, `list_branches`, `search_code`, `issue_read`, `pull_request_read`, `list_pull_requests`, `get_me`, and others) and write (`create_branch`, `push_files`, `create_or_update_file`, `delete_file`, `create_pull_request`, `merge_pull_request`, `update_pull_request`, `issue_write`, `pull_request_review_write`, `create_repository`, `fork_repository`, and others). **Authentication observed**: `get_me` returned `"login":"jmarkmorris"` (original tool output). **Authorization observed**: read of own profile only. **Write access was not tested and must not be inferred** from the presence of write-named tools or from the successful `get_me`; token scope and repository-level permissions are unknown to this report. Exact operations attempted: `get_me` (success). No unsuccessful operation on this connector occurred.

Agent 5's chat statement that the session "has the full GitHub MCP toolset — read … and write" was a description of tool names present, not a verified permission claim; it should be read as such.

## 6. Process problems and corrections

- **Contradicted diagnosis**: the restart advice (F02) attributed the missing tools to session binding timing; documentation and the later outcome indicate the built-in integration does not provide Cowork tools. Consequence: one wasted operator step (potential restart) had the operator followed it; the operator instead followed the alternative recommendation. The recommendation that worked (custom MCP connector) was given in the same reply, which limited the cost.
- **Unsupported attribution, then corrected**: Agent 5 attributed the newly present tools to the built-in integration and retracted its read-only statement; the operator corrected the attribution. Recovery was immediate and complete.
- **Repeated ineffective retries**: none. Each check was run once.
- **Scope expansion**: from a yes/no connector question to documentation lookup, identity check, and an unrelated UI-color question. No repository work resulted, so expansion carried no repository risk.
- **Missing evidence**: (a) the conversation title is not exposed to Agent 5; (b) the appearance-settings article was summarized by the search tool, not fetched; (c) branch/commit of the checkout were not measured; (d) GitHub token scope is unknown.
- **Environmental assumptions**: Agent 5 assumed, without testing, that `git` in the Linux sandbox could commit against the mounted checkout. Untested; flagged here.
- **Successful recoveries**: the operator's addition of the MCP connector resolved F01/F02 within the same session; the identity call confirmed authentication.

## 7. Unresolved handoff

Ordered by consequence and dependency.

1. **Claims of capability lacking verification**: write access through the custom GitHub MCP connector. Only `get_me` (read) succeeded. Before any agent relies on `push_files` or `create_pull_request`, a reviewer should confirm token scope and repository permissions by a deliberate, operator-authorized, minimal write on a scratch branch or by inspecting the token's configured scopes in GitHub settings. Dependency: every future connector-based publication step.
2. **Decision requiring review**: whether connector-based GitHub writes fall inside the `codex-pr-branch.md` publication routing in `AGENTS.md`, which speaks of local Git and `gh pr`. Not decided in this conversation.
3. **Suspected limitation needing verification**: the built-in "GitHub Integration" exposes no tools to Cowork sessions. Observed once (F02) in one session; the support article is consistent with this but does not state it. A second session with only that integration enabled would settle it.
4. **Checks blocked by missing prerequisites**: none in this conversation (no checks were requested). Local `git`/`gh` capability in the sandbox is untested rather than blocked.
5. **Confirmed unresolved defects**: none in repository code; this conversation touched none.
6. **Low-consequence open item**: `get_me` omits email (F04).
7. **Missing transcript sections or logs for independent review**: none within this session; the history is complete and uncompacted. What an independent reviewer cannot obtain from this report: the conversation's interface title, the exact wall-clock time of each turn, the full text of the appearance-settings support article, and any state of the operator's Connectors settings beyond the two pasted screenshots.

Coverage of this report is **complete for this conversation** and **does not extend** to any other agent's session, to repository health, or to any test or validation state.

## Appendix A: Original tool outputs preserved

Reproduced verbatim except where marked. No secrets were present.

A.1 `mcp__mcp-registry__list_connectors` `{"keywords":["github"]}`:

```
{"connectors":[],"keywords":["github"],"note":"No installed connectors found — the card did not render. Offer to search the registry (search_mcp_registry)."}
```

A.2 `ToolSearch` `{"query":"github","max_results":5}`:

```
No matching deferred tools found
```

A.3 `mcp__936df4a9-9418-461c-9a6e-0aa763a62480__get_me` `{}`:

```
{"login":"jmarkmorris","id":14032547,"profile_url":"https://github.com/jmarkmorris","avatar_url":"https://avatars.githubusercontent.com/u/14032547?v=4","details":{"name":"J Mark Morris","company":"Architrino","blog":"https://www.architrino.com","location":"Boston, MA","bio":"CEO Architrino","public_repos":1,"public_gists":0,"followers":4,"following":1,"created_at":"2015-08-29T17:57:26Z","updated_at":"2026-09-06T23:51:46Z"}}
```

A.4 `mcp__workspace__bash` directory listing at report time (excerpt; run after the report request, for destination verification only):

```
agent-01-pr-260-publication-incident-report.md
agent-02-hash-pin-repair-incident-report.md
Mon Sep  7 03:50:04 UTC 2026
```

## Appendix B: Web sources consulted

- https://support.claude.com/en/articles/10167454-use-the-github-integration (fetched in full)
- https://support.claude.com/en/articles/11725091-when-to-use-desktop-and-web-connectors (search result only; not fetched)
- https://code.claude.com/docs/en/desktop (search result only; not fetched)
- https://support.claude.com/en/articles/8887527-customizing-your-appearance-settings (search result only; not fetched)

## Appendix C: Diagnostic scripts

None. No scripts were written or run in this conversation.
