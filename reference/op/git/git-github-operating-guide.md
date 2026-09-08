<a id="2-operating-git-and-github-together"></a>

# Operating Git and GitHub together

This guide describes the current Git, Codex, and Claude arrangement and labels future workflows explicitly. The [publication procedure](pr-lifecycle.md) owns execution and authorization; this guide does not invoke publication. The [campaign checklist](../../priorities/development-process-review/processes-git-codex-claude.md#3-rollout-and-integration-plan) tracks unfinished work, and [Git-backed knowledge architecture](git-backed-knowledge-architecture.md) explains the knowledge-system design. Section labels are retained for continuity.

<a id="21-motivation-a-dependable-shared-development-environment"></a>

## Motivation: a dependable shared development environment

Several capable agents can each complete a local task while collectively disrupting the workspace if they have different assumptions about repository scope, shared state, or authority. These risks exist even when nobody changes an equation. A project selection can expose several repositories; a Git operation can target the wrong destination; a branch change can alter another task's working context; and a credential or environment difference can make an operation succeed in one application and fail in another. The operational objective is to make those boundaries explicit and keep work continuous across tools and vendors.

We need an arrangement in which each task knows which checkout it is using, which files it owns, which resources it shares, and how to coordinate changes that affect others. A successor must be able to recover the task's decisions, unfinished work, actual checks, and next action. The publication runner must assemble the intended candidate, validate it in the appropriate environments, and hand it to the operator for the merge decision. This is a problem of shared development operations as well as information management.

Projects, worktrees, separate clones, authentication methods, and automated checks are implementation choices with different boundaries. Similar feature names do not establish compatible behavior. Choose among them by whether they preserve repository identity, concurrent work, execution reliability, and understandable handoffs at a manageable cost. Worktrees are permitted for evaluation alongside coordinated shared checkouts; neither arrangement removes the need to verify shared resources and integration. Changing vendors or adopting isolation machinery does not by itself resolve the coordination problem.

The recovery and Git incident records provide concrete evidence and distinguish observed failures from possible causes. They motivate checking the actual operation and its effects before proceeding, agreeing on changes to shared state, and leaving useful handoffs. The sections below explain the current arrangement and options; accepted changes belong in the live procedure owners rather than in a second competing rulebook.

<a id="22-the-arrangement-we-are-trying-to-achieve"></a>

## The arrangement we are trying to achieve

Protecting the evolving knowledge network requires cooperation among agents from different vendors in the same repository. The development and continuous integration/delivery workflow must remain understandable across applications. Each participant must preserve other participants' work and shared Git state. The requirement is independent of whether a vendor implements it through projects, folders, sessions, a coordination service, or another mechanism. Each task needs an explicit checkout, bounded ownership, an identified execution environment, and a truthful handoff. Publication needs one designated runner and a stable candidate that the checks actually examined.

| Cooperation requirement | Observable acceptance condition |
| --- | --- |
| Preserve shared repository and branch identity | An agent does not change a shared checkout's branch, remote destination, or repository configuration underneath active collaborators; an authorized change is coordinated before execution. |
| Respect concurrent ownership | Agents identify overlapping edits and agree on integration before replacing another task's unfinished work. |
| Support work across distinct repositories | Every operation identifies its repository explicitly; switching application context does not silently retarget another repository's Git operations. |
| Preserve continuity across vendors | A successor can recover the current state, ownership, decisions, checks, limitations, and next action without access to the previous vendor's private conversation. |
| Publish the agreed, validated state | The designated runner confirms affected writers' handoffs and verifies that publication uses the intended repository and tested candidate. |
| Make capabilities and limits understandable | Each application exposes or permits verification of its actual filesystem, Git, credential, and coordination scope before shared-state changes. |

These cooperation requirements apply to the file-based arrangement and to any database-backed alternative. Recording ownership makes it visible; preventing collisions additionally requires participants or an enforcing service to honor it. Application features should be evaluated against these outcomes, whatever their names. This table does not certify a vendor or select a new implementation.

Three identities are separate: the local repository being edited, the remote repository receiving Git operations, and the account or integration authenticating those operations. A correct account can still push to the wrong repository if its permissions allow both. A branch name or application project title does not verify the destination. The incident diagnosis records a wrong Architrino origin followed by MyLists fetches; it does not establish a merge of the two histories or a lost local commit.

<a id="221-where-git-guidance-lives-in-this-repository"></a>

### Where Git guidance lives in this repository

The repository is public, but its documents serve different readers. Contributor-facing explanations describe participation; operator and agent procedures govern the working checkout; executable files implement checks. Public visibility does not make these three roles interchangeable. The central entry point for version-control procedures is [Git Lifecycle](README.md). Its own introduction identifies it as a routing index: the linked procedure, rather than the index's summary, owns each rule.

| Location | Responsibility | How to use it |
| --- | --- | --- |
| [Git Lifecycle index](README.md) | Central map of branch, commit, push, pull-request, issue, and rollover procedures | Start here to locate the live Git procedure. Reading it does not invoke publication. |
| [Standard repository process](pr-lifecycle.md) | Operator-invoked publication, shared-checkout coordination, validation, review handoff, merge verification, and branch rollover | Procedural authority for the designated publication runner. Its filename contains Codex, but repository policy permits either Claude or Codex to be designated. |
| [Issue resolution](github-issue-resolution.md) | Investigation and resolution of GitHub issues | Use for issue work; it hands publication to the standard repository process. |
| [Branch-series registry](branch-series/registry.md) | Naming series and links to the individual token registries | Naming data used by the lifecycle, not another publication procedure. |
| [AGENTS.md](../../../AGENTS.md), [CLAUDE.md](../../../CLAUDE.md), and [startup router](../agent-startup-orientation.generated.md) | Entry-point permissions, shared-checkout constraints, and routing to live owners | Establish task authority and find the procedure; generated summaries do not supersede their sources. |
| [Pre-commit hook](../../../.githooks/pre-commit), [pre-push hook](../../../.githooks/pre-push), [validation receipt implementation](../../../scripts/pr-validation-receipt.mjs), and [content-integrity runner](../../../scripts/check-content-integrity.mjs) | What local publication checks actually execute and which state their results cover | Inspect executable behavior when a procedural summary and actual result disagree. A hook is a script Git runs at a defined point in an operation. |
| [Content Integrity workflow](../../../.github/workflows/content-integrity.yml) and [Pages workflow](../../../.github/workflows/pages.yml) | GitHub-hosted checks and site build/deployment | These implement the remote automation. Their success has the scope of the selected checks; it is not a substitute for every research acceptance test. |
| [Machine-artifact retention](../machine-artifact-retention.md) and [Actions artifact policy](../../priorities/aaa-operations/contracts/github-actions-artifact-policy.md) | What belongs in Git, reproducible outputs, retained evidence, and hosted artifact handling | Separate storage and deployment authority; consult when deciding what is tracked or published. |
| [Session-root self-test](../session-root-self-test.md) and [multi-task coordination](../codex-multiprompt.md) | Repository boundaries after a root change and coordination across tasks | Supporting workflows, not alternate commit/push instructions. |
| [Codex authentication](../codex-authentication.md) | Signing into Codex through ChatGPT or an API key | This is application authentication, not the GitHub credential used by Git. GitHub access channels are explained later in this guide. |
| [Operations priorities](../../priorities/aaa-operations/priorities.md), [Operations Work Queue](../../priorities/aaa-operations/work-queue.md), and [operator feedback](../README-op.md) | Current operational decisions, executable improvement tasks, and brief recurring feedback | Track work here; keep full accepted procedures in their existing owners. The internal-numbering task is in the Operations Work Queue. |
| [Development Process Review](../../priorities/development-process-review/README.md), its [recovery campaign](../../priorities/development-process-review/analysis/review-and-repair-plan.md), and this guide | Incident evidence, technical recovery, explanations, alternatives, and decisions still under discussion | Learn and evaluate here; promote accepted process changes into their existing owners. Historical reports do not silently become live instructions. |
| [GitHub Presence and Community](../../../content/markdown/aaa/archie/github-presence-and-community.md) and [repository README](../../../README.md) | Public orientation and contribution guidance | Explain how repository participation works. The community page discusses Discussions, issues, PRs, and optional checkpoints; those examples do not override agent publication authority. |

Other operational documents and research prompts mention Git when handing work to the publication owner—for example, export, curation, source-acquisition, and priority-resume workflows. Those references are consumers of the Git process rather than additional central homes for it.

This map was assembled by reading the Git index, startup permissions, selected live procedures, hook bodies, authentication and community documents; inspecting workflow entry points; and running `rg` over Markdown in `reference/op`, the repository entry files, `.agents`, the Archie guides, architectural decisions, and CTO prompts, plus a repository-wide filename search for Git/branch/authentication topics outside evidence directories. It is a map of the principal guidance and enforcement locations, not an exhaustive audit of every Git mention in every historical report or source file. A missed live procedure or conflicting instruction would require updating this map and reviewing that conflict; a keyword match alone does not establish a competing authority.

The recommended organization is to retain the dedicated Git-procedure home, keep executable checks and hosting policy with their own owners, and use this guide as the explanatory map while we work through decisions. We have not yet established that the distributed guidance is fully consistent. For example, public contributor examples and experimental procedures need to be read with their actual scope; their existence is not evidence that an agent may perform those actions during ordinary development. This inventory does not move files or change any publication procedure.

<a id="23-set-up-the-applications-around-explicit-repositories"></a>

## Set up the applications around explicit repositories

**Current operating default: one project per repository, with explicit authorization for each tool and repository.** Keep Architrino and MyLists in separate repository-rooted projects in each application where that project concept applies. For other tool surfaces, establish the equivalent explicit checkout scope. Verify which repository the tool may read or write and through which authorization channel. A separate project is an organizational boundary, not proof that its credential is limited to that repository. Our agreed local-access design adds a distinct fine-grained PAT for each tool/repository pair, as described in section 2.4.1. Cross-repository work needs explicitly named repositories and coordinated operations, rather than an assumption that a parent project safely manages their Git state.

Experience so far has shown that advanced project and integration features, especially when multiple tools and repositories are involved, can introduce unexpected interactions, unsupported combinations, and software bugs. Keeping repository projects independent makes their scope easier to understand and reduces opportunities for one setup change to disrupt another.

Adopt a more elaborate arrangement only after checking its actual repository boundaries, Git controls, authorization scope, execution environment, and behavior with concurrent collaborators. Similar vendor feature names are insufficient evidence of compatibility. Preserve the working arrangement until a proposed change has an agreed purpose and a verified setup plan.

Application setup must preserve the repository identity and shared work described in section 2.2. The practical test is whether each task can identify its files, destination, execution environment, and collaborators. A database-backed knowledge model would not remove this requirement for the source checkout.

Keep Architrino and MyLists as separate Codex projects when separate Git controls are needed. The earlier local project-registry inspection found the parent `vibe` project was not a Git repository; it did not aggregate its children's Git controls. That is a dated app observation, to be rechecked if the product changes. OpenAI documents Git controls against the current local project or worktree. A parent-folder view can provide cross-repository context, but every operation still needs a named child checkout. See [Codex local environments](https://learn.chatgpt.com/docs/environments/local-environment).

For Claude, distinguish the product and surface before configuring it. A Claude chat Project with GitHub knowledge, a Cowork project with folder access, and a Claude Code checkout are different arrangements. Anthropic describes the chat GitHub integration as importing selected branch files into knowledge, with explicit synchronization; its FAQ excludes commit history and pull requests. Cowork projects can organize tasks around a local folder. Neither description establishes what a particular session can write. See [Claude GitHub knowledge](https://support.claude.com/en/articles/10167454-use-the-github-integration) and [Cowork projects](https://support.claude.com/en/articles/14116274-organize-your-tasks-with-projects-in-claude-cowork).

The operator considers Claude's behavior a bug in its handling of a shared development environment: in the operator's account, Claude knew that Codex project setup was also underway, yet failed to respect the consequences of changing shared repository state. The operator also identifies an assumption made without prior research—that vendors would provide compatible organizational architectures for development and CI/CD. These are the operator's interpretation and reported context. The incident diagnosis separately records the wrong origin and subsequent fetches; it does not establish a Claude-executed remote change or a branch switch.

The durable lesson is to verify the cooperation requirements above before adopting an arrangement. Similar feature names do not establish compatible repository scope, permissions, or coordination behavior. The concern about Claude Projects arose from this experience; the goal is safe cooperation across vendors, with implementation left open. Project instructions, where used, should point to live repository guidance rather than carry a competing copy of changing operational rules.

Before accepting work from either application, establish what environment is actually running it. A local Mac shell and a sandbox or virtual machine can expose different files, interpreters, credentials, and network access. Read the live `AGENTS.md` and router in the checkout when accessible. For this repository, Python work uses the shared venv; an unavailable interpreter is an unavailable check, not permission to substitute system Python and classify the resulting failures as code defects.

<a id="24-github-access-connector-oauth-pat-and-git"></a>

## GitHub access: connector, OAuth, PAT, and Git

Authentication answers which identity may perform an operation. It does not establish the correct destination, ownership of unfinished changes, or scientific validity. Keep those questions separate when configuring or testing access.

**Selected operating route: no GitHub connectors.** Use local Git for repository transport and GitHub CLI for GitHub API operations, authenticated through the assigned fine-grained PAT route for each tool/repository pair. The former shared OAuth route is retired. Connector terminology is retained here to explain earlier access and retirement steps, not to offer a current fallback. This documentation decision does not itself uninstall a connector or revoke an authorization.

A **connector** is an integration surface with a particular set of operations and repository permissions. **OAuth** is a delegated authorization flow through which an application receives access. A **personal access token (PAT)** is a credential created and scoped by the account holder. **GitHub CLI (`gh`)** is a command-line client that can authenticate through a browser flow or a supplied token. **Git** obtains credentials through its configured helpers, environment, or transport. These are related mechanisms, not interchangeable proof of access.

The diagnosis records successful GitHub API reads through this Mac's `gh` account and an authorized push using its credential helper. That proves those recorded operations through that channel. It does not certify a Claude connector, a different shell, or every future Git command. Revoking Claude's exposed PAT did not revoke the distinct CLI OAuth authorization observed in this incident.

The former browser-authorized shared CLI credential is retired for these contexts. Use the assigned PAT route for both Git and GitHub CLI; do not restore a shared login as a fallback. See [CLI login](https://cli.github.com/manual/gh_auth_login) and [Git credential setup](https://cli.github.com/manual/gh_auth_setup-git).

The local-access design uses fine-grained PATs for the identified tool/repository contexts. Use a token limited to the necessary repositories and permissions, with an expiration and a named consumer; verify that the required endpoints support it. Store it through that client's supported credential mechanism. Never embed it in an origin URL, paste it into an agent conversation, or put it in repository files. GitHub also recommends CLI or credential-manager access as alternatives to manually creating a PAT. See [GitHub token management](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

A useful access check proceeds from account identity, to repository identity and permissions, to the actual intended operation. Profile-read success does not prove push access. A dry run is preliminary evidence; an authorized real push and a matching server branch tip establish that specific write. Avoid creating a throwaway commit in a valuable repository merely to test connectivity. Use the next legitimate, validated publication when authorized.

Disconnect or revoke the particular authorization being retired, then verify the affected client. Removing a GitHub App installation, revoking an OAuth grant, deleting a PAT, and logging a CLI out are separate actions. Record which was done. Do not rotate unrelated credentials in response to uncertainty about a different integration.

<a id="241-agreed-design-one-fine-grained-pat-per-tool-and-repository"></a>

### Agreed design: one fine-grained PAT per tool and repository

For local Git and GitHub API operations, the agreed target is a distinct fine-grained PAT for each tool-and-repository pair, rather than a broadly authorized shared OAuth login. Each authorization is unique, repository-scoped, and independently revocable. This choice serves the operator's separation requirement; it is not a general claim that PATs are superior to OAuth. It remains subject to verifying the required operations and each client's credential-routing support. A tool that cannot support the boundary must be reported as a design gap, not silently granted broader access.

The four contexts each use their own repository-scoped, independently revocable token. See [credential verification evidence](../../priorities/development-process-review/processes-git-codex-claude.md#37-credential-verification-evidence) for measured and reported results.

Use only the permissions required by the agreed operations, an expiration, and a named consumer. Fine-grained PATs are tied to the account holder; separate tokens do not create separate GitHub users or inherently change commit authorship. GitHub documents a limit of fifty fine-grained PATs. Repository selection limits authorized private access and writes; it does not prohibit reading public repositories. See [GitHub token management](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

The route matters as much as the token. Two sessions accessing the same GitHub host can otherwise use a shared cached credential. The implementation must select the assigned credential for both Git transport and API commands, including worktree sessions, without fallback to a broader login. Store secrets using the supported secure credential mechanism; keep remote URLs free of credentials. Do not place tokens in this document, source files, task messages, or diagnostic output. Changing the origin is not the way to select a token.

Distinct PATs do not by themselves isolate local processes. If both agents can retrieve every credential or read every checkout, their effective access remains broader than the intended pair. Inventory that access and verify supported isolation or credential mediation before claiming a hard security boundary. Project names and token labels alone are not enforcement.

The [shared PAT helper](../../../scripts/github-auth/README.md#claude-code-local-setup) supports Claude Code Local on the Mac through explicit per-command selection. Its Codex default and existing Keychain service names are preserved. The inspected Cowork session reported a Linux shell, missing GitHub CLI, and proxy and filesystem restrictions; those session findings do not establish a universal Cowork limitation. Claude Code Local subsequently reported native Mac tools. The helper extension does not configure ordinary CLI commands or the desktop application's PR-status authentication.

See the [campaign plan](../../priorities/development-process-review/processes-git-codex-claude.md#34-credential-migration-and-completion-checks) for implementation status and completion checks.

<a id="243-operating-routes-credential-ownership-and-remaining-verification"></a>

### Operating routes, credential ownership, and remaining verification

**Mandatory caller rule:** an agent may request only the token assigned to its own tool and current repository. Codex uses only Codex contexts; Claude uses only Claude contexts. Neither may retrieve, test, borrow, or fall back to the other tool’s token, including for diagnostics. Verify the repository and select the matching context before authentication. If that route is unavailable or denied, stop the authenticated operation and report the failure; do not try another context or a shared login. Cross-context credential testing requires a separate explicit operator instruction. This is an operating restriction, not an OS-enforced barrier.

**Operating choice:** use the existing explicit per-tool routes for authenticated operations. Plain local inspection needs no PAT. Do not replace the shared GitHub CLI login or set a shared checkout credential default to whichever agent ran last. A shared checkout cannot infer the calling tool from its directory. The operator requests the Git operation normally; the designated agent selects the route below.

| Context | Authenticated Git | GitHub CLI |
| --- | --- | --- |
| Codex–Architrino | `node scripts/github-auth/run.mjs git …` | `node scripts/github-auth/run.mjs gh …` |
| Claude–Architrino | `node scripts/github-auth/run.mjs --context claude-architrino git …` | `node scripts/github-auth/run.mjs --context claude-architrino gh …` |
| Codex–MyLists | Existing plain Git default in MyLists | `git gh-codex …` |
| Claude–MyLists | `git claude …` | `git gh-claude …` |

Run each route in its owning checkout. These commands select credentials, not publication authority. MyLists wrappers live in its local Git metadata and must be re-established in a new checkout; they are not automatically distributed by a clone. Architrino's wrapper is versioned, so a checkout predating it cannot run that route. Use the current supported checkout and verify the route after branch transitions or helper rebuilds.

**Desktop routing:** local editing and review remain available. Use the designated agent's explicit route for authenticated GitHub actions and status queries; use the GitHub website for the operator's merge. Built-in push/PR controls are not an approved substitute until their actual credential selection is verified. A desktop authentication warning does not justify restoring a shared OAuth login. The reviewed [Codex feature documentation](https://developers.openai.com/codex/app/features) and [Claude Desktop documentation](https://code.claude.com/docs/en/desktop) did not establish a per-project binding to these custom Keychain contexts. This is an unverified integration, not a claim that such support is impossible. No desktop settings were changed during this review.

**Ownership and renewal:** Mark Morris owns issuance, the password-manager record, expiration choice, replacement, and GitHub-side revocation for all four tokens. The designated setup agent owns route installation and non-secret verification; the publication runner checks its route before a publication. Record each token's GitHub management entry, exact expiry, selected repository, and granted permissions in the password manager. The operator confirmed ninety-day lifetimes for all four tokens. This confirms the lifetime setting, not a specific calendar expiry; consult the GitHub entry when renewing. Setup closure does not require copying the calendar dates into this guide. Review that record before expiry and renew at least seven days beforehand; this is a manual operating procedure, not a scheduled reminder.

For routine replacement, create a new fine-grained token for the same pair, save it in the password manager, and pause operations using that context. Update only that context's existing password in macOS Keychain Access; do not delete other entries or invoke a global CLI login. The current installer intentionally refuses duplicate entries, so rerunning installation does not rotate a token. Verify the replacement through the explicit route before revoking the superseded token in GitHub settings. Recheck the other routes afterward. For a suspected exposed token, revoke it immediately and let the affected route fail closed until a replacement is installed. Deleting a local Keychain entry or logging out is not GitHub-side revocation. No credentials were changed by this documentation update.

The [campaign evidence](../../priorities/development-process-review/processes-git-codex-claude.md#37-credential-verification-evidence) records tested capabilities and remaining obligations. Public reads and endpoint permission headers do not establish token write permissions. The shared-Mac limitation is accepted; the mandatory caller rule remains in force.

<a id="25-repository-checks-before-git-operations"></a>

## Repository checks before Git operations

Repository identity checks protect the work before it crosses a Git boundary. The following inspect this checkout without initiating publication:

```bash
git -C /Users/markmorris/vibe/architrino rev-parse --show-toplevel
git -C /Users/markmorris/vibe/architrino branch --show-current
git -C /Users/markmorris/vibe/architrino rev-parse HEAD
git -C /Users/markmorris/vibe/architrino --no-optional-locks status --short --untracked-files=all
git -C /Users/markmorris/vibe/architrino diff --check
```

Check effective fetch and push URLs, any separate push URL, and URL rewrites before a network mutation. Capture configuration through a credential redactor that has passed synthetic examples before exposing output; raw `git remote -v` can print an embedded token, as this investigation itself demonstrated. The destination should identify the expected owner and repository, here `jmarkmorris/architrino`, without credentials. Use equivalent explicit paths for MyLists; never depend on a previous `cd` in another task or shell.

A commit records local history. A push updates a server reference. `origin/main` is a local record of a remote branch, refreshed by fetch; it is not the server itself. In this incident, `fetch --prune` against the wrong repository deleted local tracking names that the wrong server did not advertise. The verified Architrino server branches remained present. “Publish Branch” is an application prompt, not evidence that a commit vanished or proof of where it went.

When an incident arises, preserve the branch and uncommitted work before repair, inspect the actual changed paths, and compare local and server tips. A Git bundle preserves committed reachable history but does not include uncommitted or untracked files; those require separate preservation. Verify a recovery copy by restoring it outside the working checkout. The diagnosis records the original commit, manifest, restored bundle, and later approved publication. Its large local backup remains outside this repository.

<a id="26-two-agents-in-one-checkout"></a>

## Two agents in one checkout

Current policy permits both Claude and Codex to develop and inspect Git. Publication belongs to the operator-designated runner under the live procedure, with the operator retaining the merge decision. The brand of agent does not confer exclusive Git authority. Shared checkout means shared files, branch, and staging area; a branch switch or blanket staging command affects everyone's work.

To protect the evolving network and its unfinished revisions, the proposed daily coordination pattern is a short ownership agreement: name the files or subsystem each task owns, the shared interfaces, and who integrates changes that overlap. Before editing a shared file, reread its current contents and resolve ownership with its active task. A last writer does not gain correctness by overwriting an earlier writer. When attribution matters, inspect the actual diff and the first state that violates the relevant contract; the latest commit touching the file may only contain an unrelated subsequent edit.

Before publication, obtain explicit completion or pause information from affected writers. Each handoff should state the owned paths, remaining work, exact checks and their scope, and whether further edits are expected. Then assemble and validate the intended candidate through the existing publication procedure. A receipt can detect a recorded state change; it cannot tell whether another agent has finished thinking or intends to edit a minute later. Avoid global staging, silent resets, or discarding another task's files to obtain a clean display.

When tokens or context run out, leave the current decision, source state, next bounded action, and raw validation location in the existing work log and queue. A successor should verify the relevant current prerequisite and consult the retained failure evidence before undertaking another repair; reproduce a failure only when the repair needs fresh discrimination and the supported execution boundary permits it. Filtered pasted output and a success summary are insufficient for reconstructing a large failure inventory.

Direct communication between Codex tasks was used for this document split. That does not establish an available direct Claude-to-Codex messaging channel. Until such a channel is verified, shared ownership records and explicit operator handoffs provide the coordination path. Any proposed communication or task-transfer mechanism should be evaluated against the cooperation requirements above. Adapting an old project description or moving conversations is relevant only if the chosen implementation requires it; neither is a prerequisite for defining the shared workflow.

**Last touch is not causal attribution.** Do not attribute a failure, hash mismatch, or regression to the most recent commit touching a file. Establish the relevant expectation and inspect the last matching and first mismatching states along the relevant history, including changes to the expectation or checker itself. Inspect the actual transition before assigning cause. A byte mismatch does not by itself establish a behavioral or mathematical defect. If retained history cannot establish the transition, report attribution as unresolved. Last-editor identity grants neither ownership nor permission to overwrite concurrent work. See the [agent evidence rules](../../../AGENTS.md#evidence-independence). The earlier last-touch classification in the recovery queue is historical and superseded.

<a id="261-agreed-future-workflow-coordinated-publication-while-agents-are-active"></a>

### Agreed future workflow: coordinated publication while agents are active

**Current interim workflow: publish after editing stops.** The operator waits until editing tasks across Codex, Claude, and other tools have stopped, then asks one runner to commit and push all accumulated changes. The runner reviews all intended repository work regardless of author, checks completion reports and background writers, excludes accidental files, credentials, and runtime artifacts, derives the staging paths, and validates the combined result. The operator does not maintain a file list. Stopped tasks can leave incomplete work, so the runner raises a concrete readiness problem if one is found. The [live publication owner](pr-lifecycle.md#interim-workflow-publish-accumulated-work-after-editing-stops) defines this implemented guidance. Automatic coordination while editors are active remains future work.

The operator should be able to initiate publication once, without personally coordinating every editor. The operator designates one publication runner through the live [repository publication procedure](pr-lifecycle.md). That runner coordinates a stable candidate with the active editors, validates it, commits and pushes it, and reports the result. This direction is agreed for future implementation; the cross-vendor coordination described below is not yet an established automated capability. Merge authority remains with the operator until separately delegated.

**Why a pause is needed.** Files accumulating in the checkout do not necessarily form a coherent checkpoint. An editor may have changed an equation but not yet updated its dependent code, or may still be assembling a multi-file change. Git records staged bytes without deciding whether the work is complete. State comparisons can detect changes during validation, but cannot establish that an editor has finished. Readiness therefore needs an explicit handoff, followed by protection against further writes to the candidate while publication is underway.

<a id="2611-publication-sequence"></a>

#### Publication sequence

1. **Identify the candidate and its writers.** The runner inventories the intended publication scope and active tasks, including background processes that can write relevant files. Identify one runner for this publication; another agent must not independently stage or publish the same shared checkout.
2. **Request a coherent checkpoint.** Each affected editor finishes a bounded, internally consistent step or identifies work that must remain outside the candidate. The request names the affected scope and asks the editor to pause further writes to it. An editor must not claim readiness merely because it received the request.
3. **Collect explicit acknowledgments.** Each editor reports its owned paths, ready work, unfinished work, relevant checks, and whether background writers have stopped. Its acknowledgment applies to this publication request and remains a promise not to resume those writes until released. Missing, stale, or ambiguous acknowledgments block publication of the affected scope; silence or elapsed time is not consent.
4. **Protect the candidate.** The runner verifies that the acknowledgments cover the candidate and that overlapping writers have paused. Unrelated reading or work may continue only where it cannot change the staging area, branch identity, candidate, or state captured by validation. If the existing gate fingerprints broader checkout state, use a brief checkout-wide writing pause rather than assume file-level separation is sufficient.
5. **Validate and publish.** The runner performs the authorized preparation, stages only the agreed scope, runs the required gate, and verifies that the candidate remains the examined state before committing and pushing. A state change invalidates the relevant evidence and requires reconciliation and renewed validation; it is not repaired by silently accepting new bytes. Confirm the remote result through the live procedure.
6. **Release the pause and report.** After the local candidate is committed and its push is confirmed, tell each paused editor what was published and which remaining work can resume. Remote checks can continue under observation; subsequent edits must not be represented as part of the earlier validated candidate. Later merge and branch rollover require their own coordination under the live procedure.

<a id="2612-communication-failure-and-recovery"></a>

#### Communication, failure, and recovery

The coordination mechanism must work across participating vendors. It could combine verified task messaging with a shared, structured handoff record. A record would identify the publication request, runner, participants, scope, acknowledgments, current phase, and release or cancellation. Before adding one, inspect existing ownership and task records and reuse a suitable owner. A shared file is not a lock by itself: all participating editors must honor the protocol, and any enforcement mechanism must handle simultaneous access correctly.

If an editor cannot be reached, the runner reports that specific gap rather than treating it as readiness. The operator may relay a request during the initial rollout, but should not be responsible for routine coordination once the supported channel exists. If the runner stops or fails, preserve the candidate and report the phase reached, including whether a commit or push occurred. A successor verifies the actual repository and remote state before resuming. A timeout can trigger investigation; it must not silently release writers or authorize a second publisher.

If publication fails, the runner either coordinates the required repair while the pause remains explicit or cancels the attempt and explicitly releases the editors. No participant should be left indefinitely waiting for an unknown outcome. A paused editor must not resume automatically while another runner may still be publishing.

See the [campaign plan](../../priorities/development-process-review/processes-git-codex-claude.md#35-coordinated-publication-migration) for implementation status and completion checks.

<a id="27-place-tests-by-their-requirements-and-make-retries-informative"></a>

## Place tests by their requirements and make retries informative

The testing arrangement must connect each accepted risk to an actual execution path. Distinguish quick development checks, the selected local publication gate, portable GitHub checks, supported-host process checks, and explicitly requested scientific campaigns. Section 2.7.1 establishes the existing publication checkpoint and the limit of what it proves about individual scientific-test coverage. Before adding automation, inspect which changed dependencies select which checks, including indirect execution, and record any gap. Put a test where its dependencies and operating-system behavior are available, and document which entry point selects it. A broad sweep should become a blocking publication requirement only after its coverage, prerequisites, duration, and process cleanup have been validated. A reporting-only sweep must report its failures visibly and cannot certify overall health. The concrete recovery acceptance and measured reporting repairs remain in the [recovery plan](../../priorities/development-process-review/analysis/review-and-repair-plan.md#testing-arrangement-to-decide).

For long-running work, use the existing [supervision and heartbeat procedure](../long-running-test-heartbeats.md). A deadline limits waiting; verified child-process cleanup establishes a separate operational property. Preserve raw output, exit status, source identity, and the run location so the next task can distinguish a real assertion failure from an unavailable prerequisite or an interrupted run. No new CI configuration is proposed as an automatic consequence of this document.

Before retrying a failed access or test operation, state what changed and which competing explanation the next attempt can resolve. Repeating an identical request after an unchanged denial adds little evidence. Check the specific client, environment, credentials and operation; record the observed block and continue independent work when possible. Reported hours and retry counts in the original intake remain estimates unless reconciled to logs.

<a id="271-what-happens-when-the-operator-requests-the-pr-process"></a>

### What happens when the operator requests the PR process?

The operator invokes the standard repository process through `pr-lifecycle.md`. Its step 4 requires the local publication gate after final staging and before committing. Therefore this process does have a required validation checkpoint before the PR is published; it does not wait until the GitHub PR page exists. The commit and push hooks can reuse the resulting matching receipt. GitHub then runs its configured remote checks on PR events. These are separate checkpoints, not a record of every intermediate equation revision.

In order: an idea can change before it is written; saved files can change repeatedly before staging; the intended snapshot is staged; the required local gate checks the candidate and writes its receipt on success; commit records the staged snapshot; push transfers committed work; and GitHub checks the PR state. A further edit can require another validation run, but the process does not preserve every thought or every saved version between these checkpoints.

Crucially, “the PR gate runs” and “this particular scientific pin test runs” are different statements. Reading the publication procedure, the receipt runner's command list, the foundational-impact command manifest, and the content-integrity runner establishes the standard selection mechanism: fixed checks plus declared impact-based checks. The Python pin test used in this guide is not a named command in those lists. Reading `scripts/run-test-sweep.mjs` establishes that its broader sweep selects JavaScript test files, not Python test files directly. These inspections do not establish a guarantee that the example Python assertion executes at least once per PR. Checking a test file's identity elsewhere also does not mean executing its assertions. A targeted Python run or a suite that includes it is a separate execution whose result must be reported explicitly.

**Question for later review: does this coverage make sense for our needs?** First establish which valuable dependencies are checked by the existing mandatory paths and which rely on separately selected scientific tests, including any indirect execution. Then assess whether those checkpoints address the accepted risks. This is an investigation of current coverage before a design decision; the operator is not expected to infer the implementation or choose a new testing schedule to obtain an explanation of the existing one.

<a id="28-should-we-use-git-worktrees-or-change-merge-methods"></a>

## Should we use Git worktrees or change merge methods?

<a id="281-what-git-worktrees-are"></a>

### What Git worktrees are

A **Git worktree** is a separate working directory linked to the same local repository. It is a Git feature, not a GitHub feature. Each worktree has its own checked-out files, staging area, and current checkout identity. Repository objects and ordinary branch references are shared, as is repository configuration by default. Worktrees therefore isolate working edits without creating fully independent repositories or credential boundaries. Git normally prevents checking out the same branch in two worktrees simultaneously. See the [Git worktree manual](https://git-scm.com/docs/git-worktree).

For example, one task could develop a derivation in one directory and branch, while another task updates a visualization in another. Saving a file in one directory does not update the corresponding file in the other. Committed work must be deliberately integrated before the combined result is validated. Their shared object database makes committed work locally accessible; it does not automatically combine their branches.

<a id="282-how-codex-and-claude-could-use-them"></a>

### How Codex and Claude could use them

A possible arrangement assigns one worktree to a Codex task and another to a Claude task. Either vendor could also have several tasks, each assigned a distinct worktree and branch. The useful boundary is the independently integrable task, not the vendor: two unrelated Codex tasks can need separation, while a Codex task and a Claude task may need close collaboration on the same change. This describes a proposed workflow, not verified support for every application’s project controls.

Our design would give every participating task an explicit directory, branch, owned scope, and integration destination. The operator should be able to tell which version is being displayed and where new edits are going. We would check each application's actual directory selection and Git controls before using the arrangement. Multiple worktrees for Architrino would still belong to Architrino; they would not justify grouping Architrino and MyLists into an ambiguous shared project.

**The benefit is isolation of unfinished edits.** A publication runner operating on an integration candidate need not capture another task's half-finished changes in a different worktree. **The cost is delayed visibility and explicit integration.** If one task changes an equation and another changes its implementation, separate directories do not keep those changes consistent. Even a conflict-free textual merge can combine incompatible reasoning or behavior. The merged candidate needs appropriate review and validation.

A trial would also check runtime arrangements: dependencies, ignored generated assets, output directories, local servers, and any shared writable caches. Separate source directories do not by themselves establish that processes use separate runtime state. Shared configuration still requires coordination, including remote destinations. A Git worktree lock protects worktree administrative retention; it is not a general lock preventing an agent from editing files.

<a id="283-how-we-would-evaluate-a-worktree-workflow"></a>

### How we would evaluate a worktree workflow

**Decision: evaluation permitted; adoption deferred.** The operator has removed the repository-specific guidance against worktrees so participating tools can use their normal workspace behavior. A future evaluation may compare isolated task worktrees with a shared checkout; no hybrid or other arrangement has been selected. The jury is still out on which arrangement best fits this repository. This guidance change does not move current tasks or create worktrees. A bounded trial would compare two independently integrable tasks with the coordinated-publication workflow in section 2.6.1. Measure prevented editing collisions, integration effort, setup effort, visibility of relevant changes, and clarity of the operator's review surface. Include a change with a shared dependency so the trial tests semantic coordination, not merely two unrelated file edits.

Before adoption, adapt the publication owner, validation receipts, task-directory guidance, and cleanup procedure to the proposed arrangement. Confirm that a runner validates the integrated state rather than treating separate task passes as proof of the combined result. Preserve unfinished work during handoffs and verify accepted integration before retiring a worktree. Worktrees would reduce the scope of editing pauses; they would not eliminate publication ownership or coordination around shared repository state.

<a id="2831-codex-permanent-worktrees"></a>

#### Codex permanent worktrees

Codex distinguishes task-oriented managed worktrees from permanent worktrees. Its [official worktree documentation](https://learn.chatgpt.com/docs/environments/git-worktrees) describes creating a permanent worktree from the project menu in the sidebar: it appears as its own project, can host multiple tasks, and is excluded from automatic worktree deletion. This describes a durable working environment, not a new Git storage format or an automatic backup guarantee.

A permanent worktree may suit a long-lived development environment whose setup should survive individual tasks. Its tasks still share that worktree's files and staging area when they work directly there, so permanence does not provide per-task editing isolation. It also retains the usual shared Git metadata and need for explicit integration with other worktrees. Evaluate directory visibility, branch ownership, setup and credential routing, task isolation, storage growth, and deliberate cleanup before choosing it as our standard arrangement. This is an evaluation item; no permanent worktree has been created by this documentation change.

<a id="284-merge-method-ordinary-merge-commits"></a>

### Merge method: ordinary merge commits

Squash merging places the branch's combined change in one new commit on the base branch, so intermediate commit identities are not preserved in that merged ancestry. It does not establish that all original objects immediately disappear. Whether required evidence remains recoverable depends on retained references and archives. See [GitHub merge methods](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github).

**Selected method: ordinary merge commits.** On September 8, 2026, the repository API verified merge commits enabled, squash and rebase merging disabled, and automatic head-branch deletion disabled. The operator reported that Protect main does not require linear history. Merge commits preserve the branch’s committed steps and original commit identities in main’s ancestry, supporting recovery of earlier reasoning and inspection of provenance through Git. Keeping that history does not require maintaining every earlier version as current or runnable. The tradeoff is a more detailed history containing intermediate development commits.

The reports do not prove that squash caused the unavailable source bytes. A state that was never committed still needs another retained copy regardless of merge method. The prospective switch does not restore missing past states or call for rewriting existing history.

<a id="29-accepted-directions-and-remaining-implementation-questions"></a>

## Accepted directions and remaining implementation questions

**Accepted operating decision: pause through PR review.** Stop ordinary repository editing before publication and resume after review, merge, verified cleanup, and successor preparation. Review and necessary scoped PR corrections can proceed; renewed corrections require renewed validation and review evidence. The live publication owner and Git index implement this guidance, and the continuous-development experiment is inactive. The ordinary-merge settings and guidance are adopted, with the first full lifecycle verified; worktree organization remains undecided.

B is the accepted future knowledge architecture. Separate tool/repository authorizations, coordinated publication, and ordinary merge commits are also agreed directions. Worktrees are permitted for evaluation, with their operational fit still open. These decisions have different implementation states; acceptance does not mean a migration has occurred.

The remaining work is to specify and verify the selected scope: which dependencies and earlier contents need records, which checks execute, how credentials are routed, how editors acknowledge publication readiness, and how integrated work is validated. Use one representative equation and its current consumers to resolve the knowledge-model questions. Use bounded operational trials to resolve coordination and routing questions. The capability scores remain inferred judgments and can change with evidence; they do not reopen the architectural choice merely because implementation details remain unfinished.

The [campaign rollout](../../priorities/development-process-review/processes-git-codex-claude.md#3-rollout-and-integration-plan) is the entry point for that work. Keep the existing live publication owner and operator merge authority until their respective changes are explicitly implemented. A material blocker to an accepted direction requires a new decision, rather than an unrecorded substitution.

