# Borg Selector Assignment Audit

Status: CURRENT SOURCE-DERIVATION AUDIT.

This audit defines how Borg assigns factual Library facets to every exact catalog record. The executable owners are [Borg Library Descriptors](../../../src/apps/borg/library/BorgLibraryDescriptors.mjs), [Borg Circle Geometry](../../../src/apps/borg/BorgOrbitGeometry.mjs), and the exact [Assembly Record Catalog](../../../src/apps/borg/BorgAssemblyRecordCatalog.js). Focused tests evaluate every catalog leaf; this document does not duplicate a 143-row generated table.

## Assignment Contract

| Facet | Evidence source | Values | Fail-closed rule |
| --- | --- | --- | --- |
| Architrino count | Complete persistent inventory | Positive integer | Missing or duplicate inventory is invalid |
| Braid count | Complete, disjoint source-declared component membership | Positive integer | Missing, overlapping, or incomplete membership is `Not assigned` |
| Braid dimensionality | Complete paths of every declared component braid | `2D`, `3D`, `Mixed`, `Not assigned` | Never infer from whole-assembly span or appearance |
| Assembly span | Complete recorded paths | `1D`, `2D`, `3D`, `Not assigned` | Report independently from braid dimensionality |
| Breathing | Complete source radius histories | `Yes`, `No`, `Not assigned` | Samples cannot prove a constant history |
| Assembly radii | Complete distances from one source-declared assembly center | `Iso-radii`, `Hetero-radii`, `Not assigned` | Orbit or component centers cannot substitute for the assembly center |
| Circle occupancy | Complete geometric circle carriers in one assembly frame | `One per circle`, `Multiple per circle`, `Mixed`, `Not assigned` | Equal radii, crossings, congruence after recentering, or binary membership do not prove circle equality |
| Speed policy | Explicit source or run policy | `Uncapped`, `Capped at c_f`, `Not assigned` | Never infer from sampled speed |
| Shape | Versioned source-derived or explicitly pinned descriptors | Nonexclusive supported values or `Unclassified` | A preview image is not source evidence |

Every result also carries `assemblyId`, `modelRevisionSha256`, descriptor version, and an inspectable reason for each assigned or unassigned value. The Library classification file contains only explicitly pinned spindle-shape booleans and binds them to the exact identity pair.

Plainly: a filter value comes from the source record or a named deterministic descriptor. Borg does not classify by looking at the picture.

## Circle Occupancy

For a source-supported circular member, the carrier consists of center history, unoriented plane-normal history, radius history, and any explicitly declared common translation. Members occupy the same circle only when those carriers agree over the complete comparison interval. Phase, cadence, circulation, polarity, and component membership do not alter geometric equality.

An assembly reports `One per circle` when every supported circle class has one member, `Multiple per circle` when every class has at least two, and `Mixed` when both class sizes occur. Missing, noncircular, unsupported, degenerate, or tolerance-ambiguous carriers report `Not assigned`.

Plainly: one assembly may contain several multiply occupied circles, and those circles may have different radii.

## Component-Braid Dimensionality

A component braid is `2D` only when one fixed plane contains all of its complete paths. It is `3D` when no fixed plane does. The assembly facet is `2D` or `3D` only when every declared component has that dimension; differing component dimensions produce `Mixed`. Two planar components at different heights therefore produce braid dimensionality `2D` and ordinarily assembly span `3D`.

## Exact-Identity and Query Boundary

Library leaves are selected by `assemblyId + modelRevisionSha256`; exact display bytes additionally require `recordSha256`. Retired query keys and values are rejected, not translated. Labels, filenames, and URLs are presentation surfaces rather than identities. Unsupported values remain `Not assigned` and are not exposed as false menu choices.

## Verification

- [Borg Library tests](../../../tests/borg-library.test.js) check the query contract, exact identity, classification pins, all-record descriptor coverage, and exact preview links.
- [Circle occupancy tests](../../../tests/borg-circle-occupancy.test.js) independently cover coincident, displaced, crossing, translated, basis-changed, ambiguous, noncircular, and mixed carriers.
- [Configuration geometry tests](../../../tests/borg-configuration-geometry-records.test.js) check exact ring, co-spherical, and Platonic geometry from independent invariants.
- [Trail tests](../../../tests/borg-orbit-trails.test.js) check the separation between geometric circle occupancy and presentation-specific arc ownership.

Claim grade: derived source classification plus measured software conformance. These assignments establish no acceleration balance, EOM-solver release, retention, stability, binding, or physical identity.

Falsifier: any exact record receives a facet value inconsistent with its source facts, any missing value becomes false, any Borg and corpus characteristic disagrees for the same identity, or any retired query or label is required to recover a current record.
