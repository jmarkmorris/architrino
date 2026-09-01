# Borg App Concept Synthesis

This document retains provisional Borg concepts that are not accepted tasks. Borg is an app-facing consumer of EOM-solver histories and sealed assembly-view records; it does not own forward physics or upgrade replay output into evidence.

## Routing Boundary

Accepted implementation work belongs in [work-queue.md](work-queue.md), strategic and promotion routing belongs in [priorities.md](priorities.md), and detailed design belongs in the existing focused requirements and replay packets.

## Unresolved Ideas

No unresolved proposal to reinstate family hierarchy remains here. Flat catalog organization and peer example names are accepted rules in [the catalog contract](requirements-and-design.md#flat-catalog-and-selection). Open identity relations and general facet definitions remain in BORG-014 rather than reinstating a family hierarchy.

### Circle Occupancy And Component-Braid Dimensionality

- **Claim level:** Effective UI classification and operator-approved organization direction; the replacement selector wording and migration are not yet implemented.
- **Insight:** The intended characteristic behind `Orbit sharing` is specifically whether two or more architrinos travel the same geometric circle. A clearer candidate label is `Circle occupancy`, with reader-facing values `One per circle`, `Multiple per circle`, and `Mixed`; noncircular or unsupported records remain `Not assigned`. This property permits several different circles, including circles of different radii, and remains independent of `Iso-radii` versus `Hetero-radii` and of whether the assembly has one or several circular path groups. General B1.3 is therefore planar, may be hetero-radii, and has two architrinos on each of three circles; its equal-radius sublocus collapses those three coincident circles into one six-occupant circle.
- **Insight:** Replace whole-record `Dimensions` as the braid-organizing characteristic with `Braid dimensionality`. Classify each source-declared component braid from its complete paths in its own declared braid frame. A one-braid assembly is `2D` when that braid is planar and `3D` when it is spatial. A multi-braid assembly is `2D` only when every declared component braid is 2D and `3D` only when every declared component braid is 3D. A mixed-dimensional or incomplete component inventory must remain explicit and must not be forced into either value. Whole-assembly affine span may remain a separate diagnostic characteristic if it is useful, but it must not stand in for braid dimensionality.
- **Assumptions and proof burden:** Preserve the accepted flat catalog: characteristics identify peer records and do not become parent templates. Freeze geometric circle equality in one common frame, define how time-varying circles are compared, and derive braid dimensionality only from complete declared component memberships. Re-audit every record because the implemented `Orbit sharing` facet currently compares complete tracks and the implemented `Dimensions` facet currently reports whole-record affine rank.
- **Promotion target:** A versioned revision of the Borg Library facet contract and source classification, coordinated through the [Braid-Assembly Taxonomy Migration](../braid-program/braid-assembly-taxonomy-migration.md) with the proposed `2d-braid-assemblies.md` and `3d-braid-assemblies.md` corpus organization.
- **Next artifact:** Produce a record-by-record migration matrix with separate columns for component-braid dimensionality, whole-assembly span, number of distinct circles, occupants per circle, and radius relation before changing selector labels or values.
- **Falsifier:** Any record whose complete declared component paths contradict its proposed per-braid dimension, or any source geometry for which same-circle occupancy cannot be decided without app-local physical inference, blocks that assignment and leaves it `Not assigned`.

The existing `Orbit sharing` and `Dimensions` contracts remain the implemented behavior until the accepted migration is implemented and versioned; they must not be silently reinterpreted in place.
