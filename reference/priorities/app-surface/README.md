# Surface — Closed-Surface Path Research

**Surface** is the operator-selected application name; `app-surface` is its priority-folder identity. The app studies distributions of architrinos whose future paths are calculated from their supplied histories and delayed interactions while an explicit artificial constraint keeps them on a fixed closed surface. The first case is three electrinos and three positrinos on a sphere; selected comparisons are an oblate spheroid and a ring torus. The selected Master Equation variant and speed regime determine tangent interaction acceleration; discarded normal interaction vectors are recorded only after superposition at each member.

This folder owns the Surface app workstream. The full application brief and research explanation are recorded in [manuscript.md](manuscript.md). EOM supplies [Stage B constrained geometry/evolution](../app-solver/analysis/equation-provider-stage-b-2026-10-10.md) and [Stage C transport, domains and restart](../app-solver/analysis/equation-provider-stage-c-2026-10-11.md); [Stage D](../app-solver/analysis/equation-provider-stage-d-2026-10-11.md) independently qualifies one bounded spherical 3:3 calculation through time 0.25. [Stage E](../app-solver/analysis/equation-provider-stage-e-2026-10-11.md) delivers the dedicated [Surface page](../../../surface.html), with bounded record consumption, accepted-only playback and separately reviewed engineering verification. Run the local EOM service with `npm run dev`; static use supports preparation/imported replay.

- [Qualified oblate experiment](analysis/oblate-qualification-2026-10-12.md) — independently checked off-equator 3:3 case, refinements and sphere recovery; preset and checked-run playback are implemented, with final app verification pending.
- [Priorities](priorities.md) — purpose, current disposition, dependencies and ownership.
- [Manuscript](manuscript.md) — full application brief, requirements, research questions, constrained equation and interpretation.
- [Implementation design and agent handoff](../app-solver/contracts/equation-provider-design-v1.md) — shared provider contracts, Surface delivery sequence and implementing-agent prompt.
- [Work queue](work-queue.md) — dependent constrained evolution and app implementation stages.
- [Brainstorming](brainstorming.md) — unresolved extensions and interpretations.
- [Work log](work-log.md) — authorization, inspection and validation records.

The scientific source is the existing [spherical 3:3 research account](../master-equation-closure/noether-sea-research/analysis/spherical-three-three-synthesis.md). The [EOM solver](../app-solver/priorities.md) owns evolution capabilities; [Borg](../app-borg/priorities.md) is the adjacent assembly simulation and replay app.
