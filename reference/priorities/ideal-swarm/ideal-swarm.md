# Ideal Swarm

## LLM Instructions

- Keep `Task Queue` empty unless the operator/developer selects new Ideal Swarm app work.
- Keep this priority file app-facing: runtime access, current maintenance status, source-packet routing, and corpus disposition.
- Keep this workstream app-local and unranked unless the operator/developer explicitly selects Ideal Swarm work or a proof/simulation inspection dependency requires it.
- Use [effective-metric-deformation.md](effective-metric-deformation.md) and [raw-notes.md](raw-notes.md) only as source packets. Do not treat them as separate active priority lanes.
- Do not treat the app as proof by itself; use it to make candidate geometry, equations, and closure defects visible.

## Workstream Metadata

- Kind: `app-priority`
- Rank: `unranked`
- Value: `app-local`
- Cost: `app-local`
- ROI: `app-local`
- Status: `implemented-maintenance`

## Access

- Local dev command: `PORT=5174 node scripts/dev/start-local-dev.mjs`
- Local browser URL: `http://127.0.0.1:5174/ideal-swarm.html`
- HTML entrypoint: [ideal-swarm.html](../../../ideal-swarm.html)
- JavaScript entrypoint: [main.js](../../../src/apps/ideal-swarm/main.js)
- Runtime module: [IdealSwarmPrototypeRuntime.js](../../../src/apps/ideal-swarm/IdealSwarmPrototypeRuntime.js)

## Purpose

Ideal Swarm is the interactive Noether swarm Lorentz lesson and inspection app. The user-facing purpose, controls, geometry dictionary, energy ledger, and claim level are now documented in [Ideal Swarm Guide](../../../content/markdown/aaa/archie/ideal-swarm-notes.md).

## Current State

- The app has a standalone HTML surface at `ideal-swarm.html`.
- The application scene links to the standalone app.
- The app title, controls, chart labels, energy ledger, equation stack, binary-measures table, markdown document overlay, and home navigation are implemented.
- Direct document buttons open Ideal Swarm Guide, Return-Cycle Lorentz Quantization, and Lorentz Kinematics in the standard markdown overlay.
- The current app-facing lesson content has been dispositioned into the AAA corpus documents listed below.

## Task Queue

No active Ideal Swarm priority items remain. Add a new row only when the app is selected for new product work, validation inspection, or proof/simulation visualization.

## Corpus Disposition

| Former priority content | Disposition |
| --- | --- |
| User-facing app purpose, controls, geometry dictionary, energy ledger, binary measures, and claim level | Represented in [Ideal Swarm Guide](../../../content/markdown/aaa/archie/ideal-swarm-notes.md). |
| Lorentz factor, length-contraction, return-cycle timing, spheroid semiaxis law, and clock divergence near $\beta\to1$ | Represented in [Lorentz Kinematics](../../../content/markdown/aaa/spacetime/lorentz-kinematics.md) and [Return-Cycle Lorentz Quantization](../../../content/markdown/aaa/philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md). |
| Per-layer phase and action rows for inner, middle, and outer binary closure | Promoted into [Return-Cycle Lorentz Quantization](../../../content/markdown/aaa/philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md). |
| Outer-envelope volume scaling, including the separate $\lambda$ scale channel | Promoted into [Ideal Swarm Guide](../../../content/markdown/aaa/archie/ideal-swarm-notes.md). |
| Panel layout, app entrypoints, runtime state, and source-packet routing | Priority-only coordination material; retained here. |

## Source Packets

| File | Role | Status |
| --- | --- | --- |
| [effective-metric-deformation.md](effective-metric-deformation.md) | Source packet for the broader shape-plus-scale deformation intuition, effective-metric extraction, Planck alignment, cosmology, and strong-field comparisons. | Preserved source material; not a separate active workstream. |
| [raw-notes.md](raw-notes.md) | Scratch notes on energy accounting, $h$ transfer, frequency mismatch, radiation, temperature, and strong-field questions. | Parked source material; promote only concrete equations, simulation targets, or theorem obligations. |

## Related Files

- [../../../ideal-swarm.html](../../../ideal-swarm.html)
- [../../../src/apps/ideal-swarm/IdealSwarmPrototypeRuntime.js](../../../src/apps/ideal-swarm/IdealSwarmPrototypeRuntime.js)
- [../../../content/markdown/aaa/archie/ideal-swarm-notes.md](../../../content/markdown/aaa/archie/ideal-swarm-notes.md)
- [../../../content/markdown/aaa/spacetime/lorentz-kinematics.md](../../../content/markdown/aaa/spacetime/lorentz-kinematics.md)
- [../../../content/markdown/aaa/noether-swarm/nested-shell-swarm-geometry.md](../../../content/markdown/aaa/noether-swarm/nested-shell-swarm-geometry.md)
- [../../../content/markdown/aaa/philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md](../../../content/markdown/aaa/philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md)
- [../../../content/markdown/aaa/philosophy-history/theory-bridges/special-relativity-noether-swarm.md](../../../content/markdown/aaa/philosophy-history/theory-bridges/special-relativity-noether-swarm.md)
