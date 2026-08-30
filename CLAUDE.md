# Session Bootstrap

This file exists only to route a new session into repository policy. [AGENTS.md](AGENTS.md) is the governing authority; nothing here overrides it, and no policy is defined here that is not already stated there, except the write-permission rule below, which the operator has deliberately placed here rather than in AGENTS.md. Absolute path for disambiguation when a session's working folder is ambiguous: `/Users/markmorris/vibe/architrino/AGENTS.md`.

## Write Permission Policy (Claude only)

Claude may read any file in this repository at any time without asking.

Claude must ask the operator for write permission before every file-modifying action (create, edit, delete, move/rename) and wait for an explicit yes before proceeding. This applies per action, not per session: an earlier grant does not carry forward. Write permission does not persist — ask again for the next write, even within the same conversation.

This rule binds Claude's own conduct in chat/Cowork sessions. It is a standing operator instruction, not a technical lock — it does not change what the Cowork app's own permission settings allow; it only obligates Claude to ask first.

## First action, every session, before answering the operator

Read [AGENTS.md](AGENTS.md) in full, then the generated router it names at [reference/op/agent-startup-orientation.generated.md](reference/op/agent-startup-orientation.generated.md), choose one workflow, and read only that workflow's live owner. Do not request permission and do not summarize the read back; proceed to the task.

## Floor that applies before and regardless of that read

These are a minimal mirror of [AGENTS.md](AGENTS.md), restated here so that a session behaves correctly even if the read above has not yet happened. Where any tension appears, [AGENTS.md](AGENTS.md) governs.

- **Theory layer discipline.** General relativity, quantum theory, the Standard Model, and Lambda-CDM are recovery targets and observer-level constraints, never premises. At the architrino level, reason only from $\mathbb{A}\mathbb{A}\mathbb{A}$ primitives: the master equation, delayed path-history interaction, wake and action reasoning, polarity, and Euclidean void plus absolute time.
- **No mass and no force at the architrino level.** Architrinos have no physical mass; mass is emergent bulk bookkeeping. At the master-equation level speak of acceleration, acceleration contribution, and acceleration kernel. Force is an assembly-level concept.
- **Causal-delay terminology only.** Do not use `retard`, `retarded`, or variants anywhere, including in quotations. Use `causal`, `delayed`, or `path-history`.
- **Grade every claim where it is made** as derived, measured, inferred, or guessed, name the instrument for a measured claim, and carry its falsifier in operator-checkable terms. Agreement between two sides that share code, fixtures, or a replayed record is determinism, not evidence.
- **Set $c_f = 1$ in every new numerical instantiation:** calculations, protocols, simulations, fixtures, tests, tolerances, and operator-facing examples. Retain symbolic $c_f$ in derivations where its dependence matters.
- **No git.** Do not execute any git command, including read-only `git status`, `git diff`, and `git log`, and do not read `.git` directly. Git operations belong exclusively to Codex. Observe the working set with `ls`, file reads, or search instead. A dirty working tree is normal ambient state because the operator runs many agents in this same checkout; report unrelated dirty files only when they block the task or create overwrite risk.
- **Inline plain-language standard.** Follow [reference/op/operator-explanation-standard.md](reference/op/operator-explanation-standard.md): every technical unit is immediately followed by an inline `Plainly:` passage, with never more than three consecutive technical paragraphs between interludes. A closing recap is not a substitute.
- **Close substantive responses with a concise `Closure goal:` line,** and open every generated or recommended prompt with one.
- **Ask necessary questions one at a time,** with fixed choices in ranked order, preferred choice first, ending in an explicit option prompt such as `(y/n)` or `(a/b)`. Do not address the agent by name; when a role label is useful, use `Principal Proof Architect & Integrator`.
- **Python work uses the shared venv** exposed as `$AAA_VENV`, falling back to the repo-adjacent `../.venv`, rather than system `python` or `python3`.

## Scope note

Keep this file thin. New policy belongs in [AGENTS.md](AGENTS.md) or its named authorities, not here; this file should change only when the bootstrap route itself changes or when a floor item above drifts from its source in [AGENTS.md](AGENTS.md).
