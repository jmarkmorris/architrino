---
name: claude-codex-collaborate
description: Collaborate with the bound Codex desktop chat on an operator-directed task in the Architrino repository, or resume its shared conversation. Use when a message begins with "Codex:", when the operator asks to ask, discuss with, review with or coordinate with Codex, or when continuing a conversation under reference/op/agent-chats. Not for general questions about Codex or OpenAI products, and not for coordinating Claude subagents.
---

This skill carries no copy of the collaboration rules. They live in the Architrino repository and must be read there.

1. Locate the Architrino checkout: the directory that contains `AGENTS.md` and `reference/op/codex-claude-protocol.md`. In a Claude Code session started in the repository it is the working directory. If this session cannot read such a checkout, say so and stop; do not act from memory of the rules.
2. From the checkout root, read `reference/op/skills/skill-claude-codex-collaborate.md` and follow it. That file is the sole instruction owner for this skill and names the live protocol and conversation bindings to read next.

The bundled helper `scripts/append-entry.mjs`, in this skill's own directory, appends one entry to a shared conversation file in the way the maintained instructions describe. It sends nothing.
