---
name: codex-claude-collaborate
description: Collaborate between bound Codex and Claude chats on an operator-directed repository task, review with the peer, handle Codex- or Claude-prefixed messages, or resume an interrupted exchange. Excludes general product questions and unrelated subagent coordination.
---

# Codex–Claude Collaboration

Locate the Architrino checkout containing `AGENTS.md` and `reference/op/codex-claude-protocol.md`. If it is unreadable, report this and stop this collaboration rather than use remembered rules. Follow its startup instructions, read the full protocol and the selected conversation's header and recent entries, then read the substantive task's live owners. The protocol owns communication rules and authorization. Paths below are relative to the checkout root unless stated otherwise.

## Codex

Use the available computer-use tool and its current documentation to carry out protocol section 3's desktop delivery procedure.

## Claude

Before appending or notifying, compare the conversation's Claude destination with `CLAUDE_CODE_HOST_SESSION_ID`. If they differ, report the mismatch and do not append or notify. If the variable is absent, use another host-verified session identity; if none is available, report the limitation and continue only identity-independent work.

Prepare the body with a file-writing tool in `.tmp/<task>/` or host-managed scratch; composing it inside shell code risks altering the text. Then run:

```bash
node reference/op/skills/codex-claude-collaborate/scripts/append-entry.mjs --chat <conversation.md> --body <body-file> --expect-last "<last entry heading>"
```

For an unpacked skill, run `scripts/append-entry.mjs` from its directory. The helper stamps only Claude; Codex must not use it. It preserves body bytes and verifies one append. It refuses an empty body, forged participant headings outside fences, open body/transcript fences or a changed last entry heading. Its stale-heading check relies on sequential handoff; it is not a lock. The helper sends nothing; notification routing is in protocol section 4.

## Discovery and optional upload

The canonical source is this folder, `reference/op/skills/codex-claude-collaborate/`. Both `.agents/skills/codex-claude-collaborate` and `.claude/skills/codex-claude-collaborate` link to it. On 2026-10-10, Codex's live host catalog exposed the consolidated description at its discovery path; explicit invocation on Codex remains untested. On 2026-10-12, a Claude Code desktop session listed the skill, and one explicit invocation through `.claude/skills/codex-claude-collaborate` loaded this text. Path-resolution and metadata checks alone do not establish discovery or invocation.

If the top-level `.claude/skills/` directory was created after a Claude Code session started, [Claude Code requires `/reload-skills`](https://code.claude.com/docs/en/skills#edit-a-skill-during-a-session) to discover its skills, and again after later changes there. Do not interpret that session's missing skill as a symlink failure. Reload only when Op requests it.

Only for a requested Claude Chat/Cowork upload, build a fresh ZIP from the checkout root:

```bash
mkdir -p .local-data/skill-packages
rm -f .local-data/skill-packages/codex-claude-collaborate.zip
(cd reference/op/skills && zip -X ../../../.local-data/skill-packages/codex-claude-collaborate.zip codex-claude-collaborate/SKILL.md codex-claude-collaborate/scripts/append-entry.mjs)
```

The ZIP is disposable output; Code discovery needs none. Upload/enabling is untested and requires Op's direction. An uploaded skill still needs checkout access and a verifiable Claude session identity.
