# Branch Series Registry

This file is the index for branch-name series used by [pr-lifecycle.md](../pr-lifecycle.md). It records the branch-series order, the expected count for each series, and the registry file that freezes or will freeze the concrete branch tokens.

Branch tokens must be lowercase, contain no blanks, and use hyphens when the source item name contains multiple words. For example, the source item North Dakota becomes `codex/north-dakota`.

## Registry Index

| Order | Series | Count | Registry file | Status |
| ---: | --- | ---: | --- | --- |
| 1 | Periodic table elements | 118 | [elements.md](elements.md) | consumed |
| 2 | IAU planets | 8 | [planets.md](planets.md) | consumed |
| 3 | Moons in our solar system | 43 | [moons.md](moons.md) | consumed |
| 4 | Minerals and gemstones | 48 | [minerals-gemstones.md](minerals-gemstones.md) | consumed |
| 5 | NASA space missions and probes | 64 | [nasa-space-mission-branch-registry.md](nasa-space-mission-branch-registry.md) | active |
| 6 | Dog and cat breeds | 44 | `breed-branch-registry.md` | pending |
| 7 | U.S. state names | 50 | `us-state-branch-registry.md` | pending |
| 8 | U.S. state capital city names | 50 | `us-state-capital-branch-registry.md` | pending |
| 9 | U.S. president surnames | 40 | `us-president-surname-branch-registry.md` | pending |
| 10 | Worldwide islands | 64 | `worldwide-island-branch-registry.md` | pending |
| 11 | Mathematicians and physicists | 60 | [mathematician-physicist-branch-registry.md](mathematician-physicist-branch-registry.md) | pending |
| 12 | World rivers | 64 | [world-river-branch-registry.md](world-river-branch-registry.md) | pending |
| 13 | Mountain peaks | 50 | [mountain-peak-branch-registry.md](mountain-peak-branch-registry.md) | pending |
| 14 | Tree species | 50 | [tree-species-branch-registry.md](tree-species-branch-registry.md) | pending |
| 15 | Exploration ships | 40 | [exploration-ship-branch-registry.md](exploration-ship-branch-registry.md) | pending |
| 16 | Ancient cities | 50 | [ancient-city-branch-registry.md](ancient-city-branch-registry.md) | pending |
| 17 | Musical instruments | 40 | [musical-instrument-branch-registry.md](musical-instrument-branch-registry.md) | pending |

Configured branch names across all listed series: 883.

## Registry Rules

- Prefer committing the next series registry on an existing working branch before the current series is exhausted. If no such branch remains, use the [new-series registry bootstrap](../pr-lifecycle.md#new-series-registry-bootstrap): the first branch of the new series may carry its registry's initial commit. The registry must be committed and verified on the server before rollover is reported complete.
- Keep every registry in the same order as the series definition in [pr-lifecycle.md](../pr-lifecycle.md).
- Do not reuse retired branch names.
- Do not place blanks in branch tokens; use hyphens for multi-word source names.
- Before publishing a branch from a registry, verify the concrete branch token with `git check-ref-format --branch`.
