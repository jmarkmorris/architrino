# Borg Selector Assignment Audit

Snapshot: 2026-08-30. Scope: the twenty individual A/B/C prescribed representatives currently in [the Borg catalog](../../../src/apps/borg/BorgBraidRecordCatalog.js), not the family headings or every parameter value admitted by the taxonomy. A1 and A3 appear because each has its own concrete general representative; B1 has no additional standalone record beyond B1.1–B1.3. SD3 and the F-series are outside this requested table.

The table reports actual assignments from [the descriptor](../../../src/apps/borg/library/BorgLibraryDescriptors.mjs) and [operator classifications](library-classifications.v1.json). `—` means no current assignment, not false. The gap analysis below distinguishes missing source declarations from derivable geometry whose browse classification is not yet implemented or agreed.

## Current Assignments

| Geometry | Architrinos | Braids | Breathing | Nesting | Dimensions | Shape | Speed policy |
| --- | ---: | ---: | --- | --- | --- | --- | --- |
| A1 — coincident endpoint orbits | 6 | 1 | Non-breather | — | 3D | Circular paths | — |
| A1.1 — equal frequency | 6 | 1 | Non-breather | Nested | 3D | Circular paths | — |
| A1.2 — equal frequency, equal radius | 6 | 1 | Non-breather | — | 3D | Circular paths | — |
| A1.3 — 4:2:1 frequency | 6 | 1 | Non-breather | Nested | 3D | Circular paths | — |
| A1.4 — 3:2:1 frequency | 6 | 1 | Non-breather | Nested | 3D | Circular paths | — |
| A2 — fully symmetric | 6 | 1 | Non-breather | — | 3D | Circular paths | — |
| A3 — general | 6 | 1 | Non-breather | — | 3D | Circular paths | — |
| A3.1 — equal frequency | 6 | 1 | Non-breather | Nested | 3D | Circular paths | — |
| A3.2 — equal frequency, equal radius | 6 | 1 | Non-breather | — | 3D | Circular paths | — |
| A3.3 — 4:2:1 frequency | 6 | 1 | Non-breather | Nested | 3D | Circular paths | — |
| A3.4 — 3:2:1 frequency | 6 | 1 | Non-breather | Nested | 3D | Circular paths | — |
| B1.1 — interior reference | 6 | 1 | Non-breather | — | 3D | Circular paths; spindle | — |
| B1.2 — high-axial interior | 6 | 1 | Non-breather | — | 3D | Circular paths; spindle | — |
| B1.3 — all-equatorial boundary | 6 | 1 | Non-breather | Nested | 2D | Circular paths | — |
| C1 — co-rotating | 12 | 2 | Non-breather | — | 3D | Circular paths; spindle | — |
| C2 — counter-rotating | 12 | 2 | Non-breather | — | 3D | Circular paths; spindle | — |
| C3 — co-rotating B1 pair | 12 | 2 | Non-breather | — | 3D | Circular paths; spindle | — |
| C4 — counter-rotating B1 pair | 12 | 2 | Non-breather | — | 3D | Circular paths; spindle | — |
| C5 — co-rotating B1.3 pair | 12 | 2 | Non-breather | Nested | 3D | Circular paths | — |
| C6 — counter-rotating B1.3 pair | 12 | 2 | Non-breather | Nested | 3D | Circular paths | — |

Plainly: every listed representative has assigned inventory, braid count, breathing, dimensions, and at least one shape tag. Eleven nesting cells and all twenty speed-policy cells are unassigned. A circular-path tag does not rule out an additional spherical or spindle tag.

Counts are read from source inventory and component memberships. The accepted browse count is two for all C records, including C1/C2's source index subsets; it does not assert two independently bound top-level braids. Dimensionality is the affine span of complete recorded paths, not the dimension of a single instantaneous snapshot. C5/C6 are spatial assemblies of separated planar components, so they are 3D even though each B1.3 component is planar. Breathing and circular-path assignments consume the declared fixed-center circular prescriptions. Nested and spindle positives are operator assignments, not independent scientific results.

## Which Gaps Are Derivable?

- **No declared speed policy:** all twenty. Their source specifications carry `constraints.speedGuard.policy: preserve-and-report`, a migration check that reports the prescribed speed bound. [Its implementation](../../../src/prescribed-geometry/PrescribedAssemblySpec.mjs) does not reject over-field-speed records in that mode or impose a dynamical speed cap. It is not sufficient to assign either a capped or an uncapped model/run policy. These cells need an explicit policy declaration, not inference from observed speed.
- **Equal-radius, therefore not nested under the stated radius criterion:** A1.2, A2, A3.2. Their three binary layer radii are equal. Their `Not nested` browse assignments are still absent; this is an implementation/assignment gap, not missing radius data.
- **Unequal radii, but broader nesting membership unresolved:** A1, A3, B1.1, B1.2, C1, C2, C3, C4. Their source radii satisfy the literal different-radius criterion, but they were not in the operator's confirmed nested list. C1/C2 also have distinct binary midpoints, so a future definition requiring concentricity would distinguish them. Their geometry is available; the browse rule needs a decision.
- **Missing spherical tag despite common-radius geometry:** A1.2, A2, A3.2 are the three source-supported common-spherical-surface candidates, as derived below. The `Spherical distribution` assignment remains absent because its meaning has not yet been frozen.

Plainly: missing assignment does not always mean missing knowledge. Some gaps need a definition, some need an implementation, and the speed-policy gap needs additional source information.

## Spherical Geometry Finding

The current [A1.2 source](../braid-program/configurations/family-a-a1-2-equal-frequency-equal-radius.v2.json), [A2 source](../braid-program/configurations/family-a-a2-fully-symmetric.v2.json), and [A3.2 source](../braid-program/configurations/family-a-a3-2-equal-frequency-equal-radius.v2.json) each declare a common braid center and common binary layer radius $R=0.32$. Their axial half-separations are respectively $(0,0,0)$, $(0.12,0.12,0.12)$, and $(0.08,0.16,0.24)$; each transverse radius obeys $\rho_a^2=R^2-h_a^2$. All three current representatives use the mutually orthogonal near-rest axes from [the taxonomy's individual-binary and navigation tables](../../../content/markdown/aaa/noether-braid/braid-taxonomy.md#individual-binary-master-table).

For a declared source path write $\mathbf x(T)-\mathbf c=\mathbf d+\mathbf u\cos\theta(T)+\mathbf v\sin\theta(T)$, where $\mathbf c$ is the braid center, $\mathbf d$ the orbit-center offset, and $\mathbf u,\mathbf v$ the two radius vectors. These sources have mutually perpendicular $\mathbf d,\mathbf u,\mathbf v$ and equal lengths $\lVert\mathbf u\rVert=\lVert\mathbf v\rVert=\rho_a$. Therefore

$$
\lVert\mathbf x(T)-\mathbf c\rVert^2
=h_a^2+\rho_a^2\bigl(\cos^2\theta(T)+\sin^2\theta(T)\bigr)
=h_a^2+\rho_a^2=R^2.
$$

Plainly: each architrino remains the same distance from the common center. The circular paths lie on one spherical surface even when their individual circle centers are offset. This is a derived property of the declared analytical paths; sampled cubic replay remains at its recorded interpolation accuracy.

A read-only arithmetic audit of all twenty v2 source specifications, without importing the production descriptor or worldline evaluator, checked the dot products above and the range of $\sqrt{\lVert\mathbf d\rVert^2+\lVert\mathbf u\rVert^2}$ across constituents. With a $10^{-12}$ source-unit screening tolerance and $c_f=1$, exactly A1.2, A2, and A3.2 had a common radius, each 0.32; their computed radius spread and orthogonality residual were zero in that evaluation. This is a bounded source-coordinate check, not an independent recalculation of recorded histories or a physical acceptance result. Falsifier: a source vector violates the displayed orthogonality/equal-length conditions, a constituent has a different radius, or the table's record is no longer generated from the cited source specification.

Recommended definition for discussion: a spherical browse tag means spatial paths lying on a common spherical surface about a source-declared center. It would include these three representatives while retaining their circular-path tags. It would not assert uniform surface coverage, a filled ball, a spherical instantaneous convex hull, or stability. If instead the desired tag means a roughly round multi-radius envelope, the other orthogonal Family-A representatives need a separate envelope criterion; the single-surface finding alone neither assigns nor excludes that broader category. A preview's enclosing sphere is never evidence for either definition.

## Selector Presentation

The menus offer known values only, with `Any` for no restriction. There is no `Unavailable` menu option. Shape temporarily retains `Unclassified`. The 1D label is an explicitly requested UI bucket for both line and point cases; it does not assert that a mathematical point has dimension one. Internal missing values remain missing, and selected-record details say `Not assigned`. Saved browse links discard withdrawn menu values while retaining exact selected-record identity and hash. Unassigned group summaries remain counted and visible but do not recreate a withdrawn selector through group descent.
