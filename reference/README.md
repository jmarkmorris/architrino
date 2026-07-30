# Reference

Developer-facing reference material lives here.

This directory is intended for human-consulted repository guidance and is not app-facing content.

## Documentation Posture

Reference documents should usually describe the current source of truth and the decided next path. Do not keep drafting history, superseded counts, abandoned names, or "what changed" notes in ordinary reference prose.

Use the repo's tracking surfaces for history:

- `reference/priorities/` for active workstream state, priority ledgers, and current next actions;
- `reference/architectural-decisions/` for architectural decision rationale;
- GitHub issues and pull requests for collaboration history and review context;
- git history for exact old text.

Keep historical context inside a reference document only when it is part of the document's purpose, such as an architectural decision record, audit trail, generated-output inventory, or priority ledger.

## Developer-Meta Storage Guidance

The repo-local best-fit split for developer meta:

- [README.md](../README.md) for project overview and setup;
- [AGENTS.md](../AGENTS.md) for stable repo-wide operating rules and constraints;
- [reference/op/codex-authentication.md](./op/codex-authentication.md) for Codex authentication and operator-specific process notes;
- `reference/priorities/` for live backlog and current-state tracking;
- `reference/design/` for visual design assets and production guidance;
- `reference/learning-office/` for learning-model standards, learning materials, public descriptions, channel planning, and message-testing material;
- `reference/priorities` for issue tracker / project board for the live backlog.
- `reference/architectural-decisions/` for Architecture Decision Records;
- `content/` for app-facing content, not developer process;
