# Borg Selector Assignment Audit

Snapshot: 2026-08-30. Scope: all forty-three prescribed representatives currently in [the Borg catalog](../../../src/apps/borg/BorgBraidRecordCatalog.js): twenty A/B/C records plus SD3, F5, F6c, F6b, twelve SC rings, two SS two-ring examples, and five PV solids. These are concrete records, not family headings or every parameter value admitted by the taxonomy. A1.0, A2.0, and A3.0 identify concrete examples, not their parameterized geometry classes; B1 has no additional standalone record beyond B1.1–B1.3. Catalog coverage does not imply that every assembly discussed elsewhere has a display record.

The table covers seven geometry and composition dimensions. Speed policy is excluded because it is a constraint that can be applied to any geometry, not an intrinsic geometry classification. This audit change does not alter the live speed-policy selector or source records.

The table reports actual assignments from [the descriptor](../../../src/apps/borg/library/BorgLibraryDescriptors.mjs), [source-orbit comparison](../../../src/apps/borg/BorgOrbitGeometry.mjs), [source-radius comparison](../../../src/apps/borg/library/BorgLibraryRadii.mjs), and [operator spindle classifications](library-classifications.v3.json). `—` means no assignment, not false; shape uses `Unclassified` for the same missing state. Radius equality is derived about the declared center of the whole assembly, not assigned by alias or inherited from retired nesting labels.

## Current Assignments

| Geometry | Architrinos | Braids | Breathing | Assembly radii | Orbit sharing | Dimensions | Shape |
| --- | ---: | ---: | --- | --- | --- | --- | --- |
| A1.0 — coincident endpoint orbits | 6 | 1 | Non-breather | Hetero-radii | Shared | 3D | Circular paths |
| A1.1 — equal frequency | 6 | 1 | Non-breather | Hetero-radii | Shared | 3D | Circular paths |
| A1.2 — equal frequency, equal radius | 6 | 1 | Non-breather | Iso-radii | Shared | 3D | Circular paths |
| A1.3 — 4:2:1 frequency | 6 | 1 | Non-breather | Hetero-radii | Shared | 3D | Circular paths |
| A1.4 — 3:2:1 frequency | 6 | 1 | Non-breather | Hetero-radii | Shared | 3D | Circular paths |
| A2.0 — fully symmetric | 6 | 1 | Non-breather | Iso-radii | Dedicated | 3D | Circular paths |
| A3.0 — general | 6 | 1 | Non-breather | Hetero-radii | Dedicated | 3D | Circular paths |
| A3.1 — equal frequency | 6 | 1 | Non-breather | Hetero-radii | Dedicated | 3D | Circular paths |
| A3.2 — equal frequency, equal radius | 6 | 1 | Non-breather | Iso-radii | Dedicated | 3D | Circular paths |
| A3.3 — 4:2:1 frequency | 6 | 1 | Non-breather | Hetero-radii | Dedicated | 3D | Circular paths |
| A3.4 — 3:2:1 frequency | 6 | 1 | Non-breather | Hetero-radii | Dedicated | 3D | Circular paths |
| B1.1 — interior reference | 6 | 1 | Non-breather | Hetero-radii | Dedicated | 3D | Circular paths; spindle |
| B1.2 — high-axial interior | 6 | 1 | Non-breather | Hetero-radii | Dedicated | 3D | Circular paths; spindle |
| B1.3 — all-equatorial boundary | 6 | 1 | Non-breather | Hetero-radii | Shared | 2D | Circular paths |
| C1 — co-rotating | 12 | 2 | Non-breather | Hetero-radii | Dedicated | 3D | Circular paths; spindle |
| C2 — counter-rotating | 12 | 2 | Non-breather | Hetero-radii | Dedicated | 3D | Circular paths; spindle |
| C3 — co-rotating B1 pair | 12 | 2 | Non-breather | Hetero-radii | Dedicated | 3D | Circular paths; spindle |
| C4 — counter-rotating B1 pair | 12 | 2 | Non-breather | Hetero-radii | Dedicated | 3D | Circular paths; spindle |
| C5 — co-rotating B1.3 pair | 12 | 2 | Non-breather | Hetero-radii | Shared | 3D | Circular paths |
| C6 — counter-rotating B1.3 pair | 12 | 2 | Non-breather | Hetero-radii | Shared | 3D | Circular paths |
| SD3 — centered five-coordinate representative | 6 | 1 | — | Hetero-radii | — | 3D | Unclassified |
| F5 — phase-varying prescribed display representative | 12 | 1 | — | Hetero-radii | Dedicated | 3D | Unclassified |
| F6c — small asymmetric counter-breathing representative | 8 | 1 | Breather | Hetero-radii | Dedicated | 3D | Unclassified |
| F6b — scoped-negative circular realization | 8 | 1 | Non-breather | Iso-radii | Dedicated | 3D | Circular paths |

| SC-01 — 1:1 alternating ring | 2 | — | Non-breather | Iso-radii | Shared | 2D | Circular paths |
| SC-02 — 2:2 alternating ring | 4 | — | Non-breather | Iso-radii | Shared | 2D | Circular paths |
| SC-03 — 3:3 alternating ring | 6 | 1 | Non-breather | Iso-radii | Shared | 2D | Circular paths |
| SC-04 — 4:4 alternating ring | 8 | — | Non-breather | Iso-radii | Shared | 2D | Circular paths |
| SC-05 — 5:5 alternating ring | 10 | — | Non-breather | Iso-radii | Shared | 2D | Circular paths |
| SC-06 — 6:6 alternating ring | 12 | — | Non-breather | Iso-radii | Shared | 2D | Circular paths |
| SC-07 — 7:7 alternating ring | 14 | — | Non-breather | Iso-radii | Shared | 2D | Circular paths |
| SC-08 — 8:8 alternating ring | 16 | — | Non-breather | Iso-radii | Shared | 2D | Circular paths |
| SC-09 — 9:9 alternating ring | 18 | — | Non-breather | Iso-radii | Shared | 2D | Circular paths |
| SC-10 — 10:10 alternating ring | 20 | — | Non-breather | Iso-radii | Shared | 2D | Circular paths |
| SC-11 — 11:11 alternating ring | 22 | — | Non-breather | Iso-radii | Shared | 2D | Circular paths |
| SC-12 — 12:12 alternating ring | 24 | — | Non-breather | Iso-radii | Shared | 2D | Circular paths |
| SS-C5 — two rings, co-rotating | 12 | 2 | Non-breather | Iso-radii | Shared | 3D | Circular paths |
| SS-C6 — two rings, counter-rotating | 12 | 2 | Non-breather | Iso-radii | Shared | 3D | Circular paths |
| PV-04 — tetrahedron | 4 | — | Non-breather | Iso-radii | Dedicated | 3D | Circular paths |
| PV-06 — octahedron | 6 | — | Non-breather | Iso-radii | Dedicated | 3D | Circular paths |
| PV-08 — cube | 8 | — | Non-breather | Iso-radii | Dedicated | 3D | Circular paths |
| PV-12 — icosahedron | 12 | — | Non-breather | Iso-radii | Dedicated | 3D | Circular paths |
| PV-20 — dodecahedron | 20 | — | Non-breather | Iso-radii | Dedicated | 3D | Circular paths |

Plainly: all forty-three representatives have assigned inventory and dimensions. Nineteen have one declared braid group, eight have two, and sixteen have no assigned braid count. All forty-three also have an assembly-radius assignment. Orbit sharing assigns twenty-two Shared and twenty Dedicated records; SD3 is non-orbital and has no applicable assignment. Mixed is offered but has no current match. Two breathing cells and three shape cells remain unassigned. A circular-path tag does not rule out an additional spherical or spindle tag.

Counts are read from source inventory and component memberships. The accepted browse count is two for all C records, including C1/C2's source index subsets; it does not assert two independently bound top-level braids. Dimensionality is the affine span of complete recorded paths, not the dimension of a single instantaneous snapshot. C5/C6 are spatial assemblies of separated planar components, so they are 3D even though each B1.3 component is planar. Breathing and circular-path assignments consume the declared fixed-center circular prescriptions. Radius assignments are derived source-formula browse properties; spindle positives are operator assignments. Neither is a physical acceptance result.

The added records use the same descriptor, with no name-based exceptions. F6c's declared radial/axial harmonics supply its breathing assignment; F6b's fixed-center circular paths supply its non-breathing and circular assignments. SD3's individual straight paths collectively span 3D, so the assembly is not assigned to the 1D bucket. F5 has twelve architrinos but one source-declared component group, hence one braid in this browse table. F6b remains a scoped-negative prescribed display record, not an accepted physical realization.

Plainly: the table describes each exact recorded example. Particle count alone does not determine braid count, and inclusion in the catalog does not establish that an assembly works physically.

The [SC/SS/PV source inventory](../braid-program/shared-geometry-display-catalog.md) declares each new example. SC-03 has the B1.3 geometry; the other rings and Platonic shapes do not acquire braid membership from their member counts. SS-C5 and SS-C6 have two explicit six-member components. Each PV record is one chosen coloring and rigid rotation, not an exhaustive class inventory.

## Which Gaps Are Derivable?

- **Assembly radii resolved:** Iso-radii applies to A1.2, A2.0, A3.2, F6b, and all nineteen SC/SS/PV examples; the twenty remaining records are Hetero-radii. Compare every architrino about the whole-assembly center at equal times, including all components of a two-braid assembly. B1.1/B1.2 are Hetero-radii under the clarified definition. Prior not-nested assignments do not imply equal assembly-centered radii.
- **Missing spherical tag despite common-radius geometry:** A1.2, A2.0, A3.2, F6b, and the new SS/PV records have nonplanar common-surface source geometry. The SC records are planar shared circles. The spherical shape assignment remains absent because its meaning has not yet been frozen; this radius migration does not add shape tags.
- **Additional unassigned properties:** SD3 and F5 have no breathing assignment because the current descriptor does not classify their linear and phase-varying prescriptions. SD3, F5, and F6c have no shape assignment. These are classification gaps, not negative results.

Plainly: missing assignment does not always mean missing knowledge. Some gaps need a definition, and some need an implementation.

## Spherical Geometry Finding

The current [A1.2 source](../braid-program/configurations/family-a-a1-2-equal-frequency-equal-radius.v2.json), [A2.0 source](../braid-program/configurations/family-a-a2-fully-symmetric.v2.json), and [A3.2 source](../braid-program/configurations/family-a-a3-2-equal-frequency-equal-radius.v2.json) each declare a common braid center and common binary layer radius $R=0.32$. Their axial half-separations are respectively $(0,0,0)$, $(0.12,0.12,0.12)$, and $(0.08,0.16,0.24)$; each transverse radius obeys $\rho_a^2=R^2-h_a^2$. All three current representatives use the mutually orthogonal near-rest axes from [the taxonomy's individual-binary and navigation tables](../../../content/markdown/aaa/noether-braid/braid-taxonomy.md#individual-binary-master-table).

For a declared source path write $\mathbf x(T)-\mathbf c=\mathbf d+\mathbf u\cos\theta(T)+\mathbf v\sin\theta(T)$, where $\mathbf c$ is the braid center, $\mathbf d$ the orbit-center offset, and $\mathbf u,\mathbf v$ the two radius vectors. These sources have mutually perpendicular $\mathbf d,\mathbf u,\mathbf v$ and equal lengths $\lVert\mathbf u\rVert=\lVert\mathbf v\rVert=\rho_a$. Therefore

$$
\lVert\mathbf x(T)-\mathbf c\rVert^2
=h_a^2+\rho_a^2\bigl(\cos^2\theta(T)+\sin^2\theta(T)\bigr)
=h_a^2+\rho_a^2=R^2.
$$

Plainly: each architrino remains the same distance from the common center. The circular paths lie on one spherical surface even when their individual circle centers are offset. This is a derived property of the declared analytical paths; sampled cubic replay remains at its recorded interpolation accuracy.

A read-only arithmetic audit of the twenty A/B/C v2 source specifications, without importing the production descriptor or worldline evaluator, checked the dot products above and the range of $\sqrt{\lVert\mathbf d\rVert^2+\lVert\mathbf u\rVert^2}$ across constituents. With a $10^{-12}$ source-unit screening tolerance and $c_f=1$, exactly A1.2, A2.0, and A3.2 had a common radius, each 0.32; their computed radius spread and orthogonality residual were zero in that evaluation. This is a bounded source-coordinate check, not an independent recalculation of recorded histories or a physical acceptance result. Falsifier: a source vector violates the displayed orthogonality/equal-length conditions, a constituent has a different radius, or the table's record is no longer generated from the cited source specification.

Recommended definition for discussion: a spherical browse tag means spatial paths lying on a common spherical surface about a source-declared center. It would include these three representatives while retaining their circular-path tags. It would not assert uniform surface coverage, a filled ball, a spherical instantaneous convex hull, or stability. If instead the desired tag means a roughly round multi-radius envelope, the other orthogonal Family-A representatives need a separate envelope criterion; the single-surface finding alone neither assigns nor excludes that broader category. A preview's enclosing sphere is never evidence for either definition.

A2.0 illustrates the distinction: its circular paths lie on the same radius-0.32 spherical surface, and it is Iso-radii about the assembly center. Recommended display vocabulary is `Circular paths` plus `Spherical surface`, as overlapping shape tags. This wording is a proposal, not a changed selector or assignment; the surface statement does not assert precession or full-sphere coverage. The same accepted definition would need to be applied consistently to all records, including A1.2 and A3.2, rather than added as an A2.0-only exception.

## Selector Presentation

### Assembly-Centered Radius Definition

The operator clarified the reference center on 2026-08-30: use the center of the entire assembly, not an individual orbit center or a component-braid center. At each time compare $r_i(T)=\lVert\mathbf x_i(T)-\mathbf C_{\mathrm{assembly}}(T)\rVert$ across all architrinos. Iso-radii requires equality throughout the record window; Hetero-radii requires an unequal-time-slice witness. Common breathing is compatible with Iso-radii. This is a declared-source geometry property, not a claim of binding or stability.

Plainly: equal distances mean equal distances from the same center at the same time. Two identical braids can form a Hetero-radii assembly when their centers are displaced from the whole-assembly center.

The [F6b source](../braid-program/configurations/f6b-scoped-negative-circular.v2.json) has fixed track radius 0.30 and axial offset magnitude 0.30 for all eight worldlines, giving common assembly radius $\sqrt{0.30^2+0.30^2}\approx0.424264$. It is Iso-radii. The [F5 source](../braid-program/configurations/f5-phase-varying-campaign.v2.json) has axial offset 0.31 and two transverse radii 0.30 and 0.22; its assembly radii are $\sqrt{0.31^2+0.30^2}\approx0.431393$ and $\sqrt{0.31^2+0.22^2}\approx0.380132$. It is Hetero-radii even though corresponding rings repeat across axes.

The [F6c source](../braid-program/configurations/f6c-polarity-resolved-harmonic.v2.json) has $h_+=0.30+0.04\sin T$, $\rho_+=0.30+0.025\sin T$, $h_-=0.30-0.03\sin T$, and $\rho_-=0.30-0.020\sin T$. Its assembly radii are $\sqrt{h_+^2+\rho_+^2}$ and $\sqrt{h_-^2+\rho_-^2}$, approximately 0.470346 and 0.388973 at $T=\pi/2$. Equality at $T=0$ does not persist, so F6c is Hetero-radii and a Breather.

Plainly: F5 repeats a pair of different radii, and F6c's polarity sectors breathe differently. Neither has one common radius for all its architrinos throughout the record.

The [radius contract](requirements-and-design.md#catalog-composition-classifications) derives circular, linear, F5, and F6c squared-radius formulas. The descriptor compares complete coefficient bounds for Iso-radii and supplies a time/radius witness for Hetero-radii. Its $10^{-12}$ scaled squared-radius tolerance is a numerical browse threshold, not a rigorous floating-point enclosure or physical precision claim. Unsupported paths or inconclusive comparisons remain unassigned; finite sampled agreement alone never establishes Iso-radii. Falsifier: a listed Iso-radii source violates its common-radius identity, a Hetero-radii witness has equal centered radii, or an assignment uses the wrong declared center.

### Orbit Sharing

The accepted column is `Orbit sharing = {Shared, Dedicated, Mixed}`. Shared means every orbit has multiple architrino occupants; Dedicated means every orbit has one; Mixed means both occur in the assembly. A Shared assembly may contain several distinct shared orbits. Equal radius, identical shape after separately moving tracks, phase agreement, or an instantaneous crossing cannot establish sharing.

Plainly: radii asks how far everyone is from the assembly center; sharing asks who uses the same track. A1.2 is Iso-radii/Shared, A2.0 is Iso-radii/Dedicated, A1.0 is Hetero-radii/Shared, and B1.1 is Hetero-radii/Dedicated.

[The source-track contract](requirements-and-design.md#orbit-sharing) compares complete circular carriers in one common translation frame and counts each coincidence group's occupants. F5's regular phase-varying reconstruction has dedicated circles. F6c's breathing paths have source-point witnesses outside the other paths' full axial ranges, establishing distinct tracks without assuming they are fixed circles. The classifier does not use trail duration, polarity pairing, or pixel appearance. Non-orbital SD3 remains `—`; incomplete or unsupported source geometry also stays unassigned, with a different explanatory reason in the inspector. No Unavailable menu option is added.

Plainly: a geometrically shared track need not qualify for two half-turn tails. That rendering rule additionally requires confirmed antipodal, co-rotating, opposite-polarity partners.

### Current Menus

The menus offer known values only, with `Any` for no restriction. There is no `Unavailable` menu option. Shape temporarily retains `Unclassified`. The 1D label is an explicitly requested UI bucket for both line and point cases; it does not assert that a mathematical point has dimension one. Internal missing values remain missing, and selected-record details say `Not assigned`. Saved browse links discard withdrawn menu values while retaining exact selected-record identity and hash. Unassigned group summaries remain counted and visible but do not recreate a withdrawn selector through group descent.
