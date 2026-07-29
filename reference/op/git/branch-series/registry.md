# Branch Series Registry

This file is the index for branch-name series used by
[codex-pr-branch.md](../codex-pr-branch.md). It records the branch-series order,
the expected count for each series, and the registry file that freezes or will
freeze the concrete branch tokens.

Branch tokens must be lowercase, contain no blanks, and use hyphens when the
source item name contains multiple words. For example, the source item North
Dakota becomes `codex/north-dakota`.

## Registry Index

| Order | Series | Count | Registry file | Status |
| ---: | --- | ---: | --- | --- |
| 1 | Periodic table elements | 118 | Canonical element order in [codex-pr-branch.md](../codex-pr-branch.md) | consumed |
| 2 | IAU planets | 8 | Canonical planet order in [codex-pr-branch.md](../codex-pr-branch.md) | consumed |
| 3 | Moons in our solar system | 43 | [moons.md](moons.md) | consumed |
| 4 | Minerals and gemstones | 48 | [minerals-gemstones.md](minerals-gemstones.md) | active |
| 5 | NASA space missions and probes | 64 | `nasa-space-mission-branch-registry.md` | pending |
| 6 | Dog and cat breeds | 44 | `breed-branch-registry.md` | pending |
| 7 | U.S. state names | 50 | `us-state-branch-registry.md` | pending |
| 8 | U.S. state capital city names | 50 | `us-state-capital-branch-registry.md` | pending |
| 9 | U.S. president surnames | 40 | `us-president-surname-branch-registry.md` | pending |
| 10 | Worldwide islands | 64 | `worldwide-island-branch-registry.md` | pending |

Configured branch names across all listed series: 529.

## Registry Rules

- Add a committed registry file before the first branch in any pending series is cut.
- Keep every registry in the same order as the series definition in
  [codex-pr-branch.md](../codex-pr-branch.md).
- Do not reuse retired branch names.
- Do not place blanks in branch tokens; use hyphens for multi-word source names.
- Before publishing a branch from a registry, verify the concrete branch token
  with `git check-ref-format --branch`.
