# Shared Geometry Display Examples

The operator authorized nineteen additional Borg examples on 2026-08-30, using temporary SC, SS, and PV aliases and the existing rendering style. These names are display aliases, not permanent model identities or new braid families. The canonical coordinates are the individual `prescribed-assembly-spec.v2` files, including [SC-03](configurations/shared-circle-03-alternating.v2.json), [SS-C5](configurations/shared-sphere-c5-two-rings.v2.json), and [PV-08](configurations/platonic-vertices-08-cube.v2.json); the existing [record emitter](../../../scripts/eom/generate-prescribed-braid-record.mjs) produces their sealed display records. Borg performs no geometry construction or balance calculation.

## Source choices

| Aliases | Geometry owner | Concrete choice | Composition |
| --- | --- | --- | --- |
| SC-01 through SC-12 | [Shared-Circle Assemblies](../../../content/markdown/aaa/dynamics/shared-circle-assemblies.md#verified-bounded-landscape) | Alternating regular polygons with 2 through 24 members in the xy plane, using the documented speed and radius at each inventory; SC-03 uses the arbitrary-precision T04 checkpoint rounded to binary64 | Only SC-03 declares one B1.3 component; opposite-polarity antipodes are paired only for odd counts per polarity |
| SS-C5, SS-C6 | [Shared-Sphere Assemblies](shared-sphere-assemblies.md#exact-taxonomy-intersections) | Two alternating six-member circles of radius 0.4, at heights -0.3 and +0.3; common sphere radius 0.5; angular-rate magnitude $\pi/2$; upper-ring phase offset $\pi/3$; co-rotation for SS-C5 and counter-rotation for SS-C6 | Two explicitly declared six-member planar components |
| PV-04, PV-06, PV-08, PV-12, PV-20 | [Platonic Vertex Sets](shared-sphere-assemblies.md#platonic-vertex-sets) | Tetrahedron, octahedron, cube, icosahedron, dodecahedron; circumradius 0.5; rigid rotation about $(1,2,4)/\sqrt{21}$ at angular rate $\pi/2$; polarity is the sign of the first nonzero Cartesian vertex coordinate | No braid decomposition is inferred from the vertex count or symmetry |

Plainly: each alias selects one complete display example. The Platonic solids each show one balanced plus-minus pattern and one chosen rotation, not all 917 coloring classes. The two-ring spheres are new display prescriptions, not reported acceleration balances.

For the rings, the coupling length is instantiated as $R_*=1$ and wake speed as $c_f=1$, so the prescribed angular rate is $\Omega=\beta_f/R$. Neither the radius nor time is rescaled to make a ring look or move like another. The source files retain the numbers and their chapter provenance; drawing rounded coordinates does not independently verify the originating balance result.

For a Platonic vertex $\mathbf v$ and unit rotation axis $\mathbf n$, the circular operator uses center $\mathbf c=(\mathbf v\cdot\mathbf n)\mathbf n$, radius vector $\mathbf u=\mathbf v-\mathbf c$, and second radius vector $\mathbf n\times\mathbf u$. This is rigid rotation of the entire vertex set, so all pair distances are constant. For the two-ring spheres, the common-radius identity is $0.3^2+0.4^2=0.5^2$.

Plainly: the sphere examples remain on one sphere because of their declared geometry. That does not mean the Master Equation supplies the acceleration needed to keep them there.

Each source declares two periods of display history, 64 cubic interpolation intervals per period, and a zero delay horizon. Zero here means no causal-history coverage is claimed by the display record. The schema's `braid` constituent role marks primary assembly members; only explicit `componentBraids` supply a braid-count assignment. Unassigned counts remain unavailable in the library.

The source-speed policy `report-only` verifies the actual geometric speed bound with $c_f=1$ without imposing a speed ceiling or invoking legacy migration authority. It is distinct from `reject`, which requires every speed to remain below 1, and the preserved legacy `preserve-and-report` policy. No speed policy in this record emitter establishes a scientific result.

## Rendering and verification

The [shared trail policy](../../../src/apps/borg/BorgOrbitTrails.mjs) retains red positrino and blue electrino markers and paths. A sole antipodal neutral pair shares a circle through two fading half-turn tails. For three or more occupants with equal signed angular rates, each member receives the preceding phase-gap arc; this also supports unequal gaps. Dedicated circles retain solid full-turn trails. Counter-rotation on the same track, unequal angular rates, missing carriers, or coincident phases do not establish fixed arc ownership. The starting-geometry picker uses the existing two-column radio layout.

Plainly: the many-member rings divide their common orbit into colored trailing arcs without drawing several overlapping full circles or assigning a half-circle to every member.

[Independent geometry checks](../../../tests/borg-shared-geometry-records.test.js) use regular-polygon chord lengths, planar rotation, the common-radius identity, Platonic edge counts and vertex degrees, and preservation of every pair distance. They also check unequal phase-gap ownership and its invalid controls. Existing renderer tests check actual line spans, clipping, and exact polarity colors for every catalog entry. Emitter byte checks establish reproducibility only; none of these checks independently evaluates delayed acceleration or proves retention or stability.

The new source filenames begin with `shared-circle-`, `shared-sphere-`, or `platonic-vertices-`. Each corresponding runtime asset has the same basename with `.assembly-view-record.v0.json`. Generate an individual record with `node scripts/eom/generate-prescribed-braid-record.mjs --spec <source> --out <record> --write`, then repeat with `--check`. The generator's full `--all --check` includes all nineteen new targets without rewriting existing records.

Falsifier: an incorrect member or polarity count, mismatched source identity, failed common-radius or pair-distance check, wrong circulation, overlapping ownership arcs, missing catalog entry, or generator drift invalidates the corresponding display claim. This handoff covers nineteen requested representatives; complete taxonomy coverage and BP-015 remain open.
