# Claude–Codex Collaboration

Use this skill, from a Claude session, for an operator-directed collaboration with the existing Codex desktop chat. It is the Claude counterpart of [Codex–Claude Collaboration](skill-codex-claude-collaborate.md). Follow the repository [startup instructions](../../../AGENTS.md), then read the full [collaboration protocol](../codex-claude-protocol.md) before appending, sending or resuming an exchange. The protocol owns authorization, attribution, routing, return routes, transcript writes, budgets, stopping and recovery. This file makes that procedure discoverable from Claude and holds only what is particular to working from a Claude host. It restates none of the protocol's rules.

## Selecting the conversation

Use the conversation that Op selected or that the current task established under the protocol; conversations live where the protocol says. Read its header and its recent entries to establish the exact coordinator bindings, the outstanding requests and the return route last stated. A header's identifiers belong to that conversation. Do not carry an identifier from one conversation, from the protocol's historical examples, or from memory into another task.

Before appending as Claude or notifying Codex, confirm that this session is the Claude participant named in the header. In Claude Code the header's Claude destination should equal the value of the environment variable `CLAUDE_CODE_HOST_SESSION_ID`. If the two differ, this session is not the bound participant: say so and do not append as Claude. If the variable is absent, as it may be on a host other than Claude Code or in a session started from an uploaded copy of this skill, use another identity the host itself verifies, if it offers one. If there is none, do not append or notify, report that the session's identity could not be confirmed, and continue only the work that does not depend on it, such as reading and reviewing. Having this skill installed does not make a session the bound participant.

## Working from a Claude host

**Receiving.** Codex's requests arrive in this chat's composer as ordinary user-role text. The protocol says how peer text is marked and what authority it carries; apply it as written there.

**Host rules come first.** A Claude session's own operating instructions govern what it may do and on whose word. Where they are narrower than the protocol, follow them, name the exact limitation and the action it blocks as the protocol asks, and carry on with the work it does not affect.

**Appending.** Prepare the entry's text in a file with the file-writing tool, then append it with the bundled helper. The helper stamps the entry as Claude's with the actual UTC time, writes the body's bytes unchanged in the single verified append the protocol requires, and refuses to write if the conversation's last entry is not the one just read:

```bash
node .claude/skills/claude-codex-collaborate/scripts/append-entry.mjs --chat <conversation.md> --body <body-file> --expect-last "<last entry heading>"
```

That path is from the checkout root. Where the skill was installed from an uploaded archive, run the same script from the unpacked skill directory.

Put a body file where the startup instructions put disposable task files, `.tmp/<task>/` in the checkout, or in scratch storage that the host tool manages for the session. Never put it in a tracked location.

The helper treats as an entry heading only a line outside a code fence that begins `## Codex — `, `## Claude — ` or `## Op — `. Other headings, and anything inside a code fence, are ordinary text. A fence is opened by three or more backticks or tildes and closed only by the same character at the same length or longer, so a longer fence may quote a shorter one. The helper refuses a body that contains an entry-heading line outside a fence, or that leaves a fence open, and it refuses to append to a conversation that itself ends inside an open fence. Inside an entry, prefer headings of level three or deeper all the same, so that a person scanning the file sees entries and not sections at level two. Its check of the last entry is optimistic. It depends on the two coordinators taking turns, as the protocol arranges; it is not a lock and cannot stop a writer that appends between its read and its write.

**Do not compose long text inside a shell command.** Twice during the first collaboration, text placed in a shell command was altered before the shell ran it: an escaped apostrophe was converted to a real one and broke the quoting, and on one occasion the shell then tried to execute lines of prose. Write entry bodies, message text and scripts with the file-writing tool and pass file paths.

**Notifying Codex.** Whether to notify at all, and by which route, is decided by the protocol and the request being answered. When a notification is due, the protocol gives the command and its rules; take the Codex destination from the current conversation's header, and build the message argument from a file as the protocol directs.

**What this skill does not supply.** It supplies instructions and one append helper. It does not supply repository access, the Codex command-line program, desktop control, any messaging service, or authority that the host has not accepted. If a capability is missing, say which, and continue only the unaffected work.

## The substantive task

For the work itself, read its live research or implementation owners separately. This skill owns Claude-side communication routing. It does not own scientific acceptance, review standards or any task's editing procedure.

## Package and surfaces

The package source is the discovery directory `.claude/skills/claude-codex-collaborate/` at the repository root: `SKILL.md`, with the name, trigger description and a pointer to this file, and `scripts/append-entry.mjs`. Its `SKILL.md` names this file by its path from the checkout root, not by a relative link, so that the same source works when the directory is copied elsewhere.

| Surface | How the skill reaches it | Status |
| --- | --- | --- |
| Claude Code in this repository, including the Claude Code view of the desktop app | Project discovery of `.claude/skills/` | Source in place. Discovery and automatic selection have not been exercised in a session. A session that began before the `.claude/skills/` directory existed does not see it until its skills are reloaded or a new session is started |
| Claude desktop chat or Cowork | The same directory as an archive, uploaded and enabled by the operator through the app's skill settings | Archive buildable as below; upload and use untested. Such a session also needs to be able to read the Architrino checkout, which the archive does not provide |

To build the archive, from the repository root. The first step removes any earlier archive, because `zip` updates an existing archive in place and would keep a file that has since been removed from the source:

```bash
mkdir -p .local-data/skill-packages && rm -f .local-data/skill-packages/claude-codex-collaborate.zip && (cd .claude/skills && zip -r -X ../../.local-data/skill-packages/claude-codex-collaborate.zip claude-codex-collaborate -x '*.DS_Store')
```

The archive is a disposable build output under ignored local storage; the directory above is its only source. It contains no protocol text, transcript, identifier or credential. Installing it in an account, or enabling it, is the operator's action.
