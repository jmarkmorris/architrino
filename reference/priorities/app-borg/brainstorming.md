# Borg App Concept Synthesis

This document retains provisional Borg concepts that are not accepted tasks. Borg is an app-facing consumer of EOM-solver histories and sealed assembly-view records; it does not own forward physics or upgrade replay output into evidence.

## Routing Boundary

Accepted implementation work belongs in [work-queue.md](work-queue.md), strategic and promotion routing belongs in [priorities.md](priorities.md), and detailed design belongs in the existing focused requirements and replay packets.

## Unresolved Ideas

No unresolved family-navigation proposal remains here. Flat catalog organization and peer example names are accepted rules in [the catalog contract](requirements-and-design.md#flat-catalog-and-selection). Open identity relations and general facet definitions remain in BORG-014 rather than reinstating a family hierarchy.

### 2026-08-30 — Orbit Sharing as an Independent Column

The operator proposes an iso-orbit/hetero-orbit column following the shared-versus-dedicated trail rule. Recommendation, not an accepted interface change: add `Orbit sharing = {Shared, Dedicated, Mixed}`. The plain labels avoid interpreting iso-orbit as equal orbit sizes or congruent shapes, which need not mean one shared geometric track. Classification applies across the whole assembly: Shared means every classified orbit has multiple occupants; Dedicated means each has one; Mixed means both kinds occur. It does not mean that all architrinos in a Shared assembly occupy one single orbit. A non-orbital source has no applicable assignment; incomplete information stays unassigned and does not become Dedicated. Neither case adds a withdrawn Unavailable selector option.

Plainly: radius equality asks how far architrinos are from the assembly center. Orbit sharing asks whether more than one architrino uses the same track. Those are independent questions.

| Current representative | Assembly radii | Proposed orbit-sharing value |
| --- | --- | --- |
| A1.2 | Iso-radii | Shared |
| A2.0 | Iso-radii | Dedicated |
| A1.0 | Hetero-radii | Shared |
| B1.1 | Hetero-radii | Dedicated |

Plainly: the current catalog already supplies all four combinations. The added column would not duplicate the existing radius selector.

Claim level: inferred design recommendation, supported by the declared geometry of these four source records and current radius/trail descriptors; not a physical classification or stability result. Assumptions and proof burden: orbit coincidence must use source-declared tracks in the same whole-assembly reference frame, not equal shape after independently translating each track, equal radius alone, instantaneous intersections, or matching preview pixels. Group complete supported tracks by coincidence before counting occupants. Geometry sharing is distinct from equal phase or circulation: the current half-turn renderer requires an antipodal co-rotating opposite-polarity pair, but a future sharing descriptor must not equate that narrower rendering eligibility with every possible shared orbit. Nonperiodic or unsupported precessing paths need an explicit source track definition before assignment.

Falsifier: the proposed column merely repeats radius equality; equal but displaced circles are called shared; a transient crossing merges tracks; an assembly containing both shared and dedicated tracks is forced into either pure category; or missing source data creates a positive assignment. Promotion target: [the catalog composition contract](requirements-and-design.md#catalog-composition-classifications) and [selector assignment audit](selector-assignment-audit.md), after operator acceptance. Next artifact: a source-derived orbit-sharing column for every catalog row, followed by the corresponding selector; do not derive it solely from trail length. No app, audit assignment, or source record is changed by this discussion.
