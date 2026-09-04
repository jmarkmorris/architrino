# Braid Taxonomy

This chapter defines the characteristics used to identify braid assemblies. The catalog is flat: every exact configuration is a peer, and no label, chapter, filename, visual resemblance, or filter result is a parent template. Worked planar configurations appear in [Planar (2D) Braid Assemblies](2d-braid-assemblies.md); worked spatial configurations appear in [Spatial (3D) Braid Assemblies](3d-braid-assemblies.md).

A classification states supported facts about a complete prescribed or evolved record. It does not establish acceleration balance, EOM-solver release, retention, stability, binding, particle identity, or formation. Those claims require their own evidence. A taxonomy tells us what a configuration is made of and how its paths are arranged. It does not tell us whether the configuration survives when released.

## Exact Configuration Identity

Every concrete configuration has an opaque `assemblyId` and an exact `modelRevisionSha256`. These are persistent record identities, not a sorting by radius, frequency, speed, or any derived dynamical role. The identifier carries no geometry or taxonomy meaning. The model revision is computed from a versioned canonical serialization of the identity-bearing scientific content: inventory, persistent member order, component relations, coordinates, paths, units, motion policy, and source-law version.

Changing a label, explanation, filename, chapter, URL, camera, or display styling preserves both values. Changing any identity-bearing scientific content creates a new `assemblyId` and a new `modelRevisionSha256`. `recordSha256` separately identifies the exact emitted display bytes. Names can improve without changing the configuration. Changing a path, coordinate, member, or scientific rule creates a different configuration.

## Assembly, Component Braid, and Binary

An **assembly** is one complete declared inventory of persistent architrinos together with their polarity assignment, member order, path histories, and relations.

A **component braid** is a source-declared nonempty member subset whose complete paths are asserted to form one braid. Component braids identify an assembly only when they are disjoint and cover the complete inventory. A member count divisible by six, a visual cluster, or a convenient grouping does not establish braid membership.

A **neutral binary** is a declared pair of one electrino and one positrino with persistent endpoint identities. Antipodal positions, equal radii, or opposite pixels do not establish a binary unless the source declares the pairing.

A symmetry transformation may establish equivalence between complete records, but it does not relabel the binaries inside one record. Persistent indices remain attached to their declared members even when radii, frequencies, speeds, or axial positions cross. Borg never discovers a braid or binary by counting dots. Membership comes from the exact source record.

## Component-Braid Dimensionality

Let $D(\mathcal B_k)$ be the affine dimension of the complete paths of declared component braid $\mathcal B_k$ in its declared braid frame. A component braid is **2D** when one fixed plane contains all its paths and **3D** when no fixed plane does.

For a complete, disjoint component partition of assembly $\mathcal A$,

$$
D_{\mathcal B}(\mathcal A)
=
\begin{cases}
\mathrm{2D}, & D(\mathcal B_k)=\mathrm{2D}\text{ for every component }k,\\
\mathrm{3D}, & D(\mathcal B_k)=\mathrm{3D}\text{ for every component }k,\\
\mathrm{Mixed}, & \text{both component dimensions occur},\\
\mathrm{Not\ assigned}, & \text{membership or complete path evidence is unavailable}.
\end{cases}
$$

[View →](../../../../equation-mapping.html#corpus-equation-04a6583db7ff791d)

Whole-assembly affine span is a separate characteristic named **Assembly span**. Two planar braids in different parallel planes remain a 2D-braid assembly even when their union spans three dimensions. `2D` or `3D` describes each braid, not the bounding box around the entire assembly.

## Circle Occupancy

For a source-supported circular member $i$, represent its complete circle carrier in one declared assembly frame by its center history, unoriented plane-normal history, radius history, and any explicitly declared common translation. Write $i\sim_{\circ}j$ only when those carriers describe the same geometric circle over the complete comparison interval. Phase, cadence, direction, circulation, polarity, and binary membership do not change circle equality.

For a circle class $[i]_{\circ}$, define

$$
o_{\circ}([i]_{\circ})=\lvert[i]_{\circ}\rvert.
$$

[View →](../../../../equation-mapping.html#corpus-equation-39d5fdf809292bc4)

The assembly-level characteristic is

$$
O_{\circ}(\mathcal A)
=
\begin{cases}
\text{One per circle}, & o_{\circ}(C)=1\text{ for every circle class }C,\\
\text{Multiple per circle}, & o_{\circ}(C)\geq2\text{ for every circle class }C,\\
\text{Mixed}, & \text{both class sizes occur},\\
\text{Not assigned}, & \text{complete circular carriers are unavailable}.
\end{cases}
$$

[View →](../../../../equation-mapping.html#corpus-equation-340c34317f650055)

Several distinct circles may occur in one assembly, and their centers, planes, and radii may differ. `Multiple per circle` therefore does not mean that the whole assembly occupies one circle. Equal radii, instantaneous crossings, independent recentering, or rendered overlap do not prove circle equality. Circle occupancy counts travelers on each actual circle. It allows many circles and many radii.

## Co-Sphericity

An assembly is **co-spherical** over an interval when there is one declared center history $\mathbf C(T)$ and one radius history $R(T)>0$ such that every member obeys

$$
\lVert\mathbf X_i(T)-\mathbf C(T)\rVert=R(T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-694356e882becc4d)

throughout the complete interval. A sphere through orbit centers, a spherical display envelope, or one instantaneous vertex set is insufficient. Co-sphericity is independent of component-braid dimensionality and circle occupancy. The architrinos themselves must remain on the spherical surface. The centers of their circles do not count as substitutes.

## Independent Identification Characteristics

Each exact record reports supported values for the following independent characteristics. A missing carrier produces `Not assigned`; it does not produce a false value.

| Characteristic | Required source facts | Typical values |
| --- | --- | --- |
| Architrino count | Complete persistent inventory | Positive integer |
| Component-braid count | Complete, disjoint component membership | Positive integer or `Not assigned` |
| Braid dimensionality | Complete paths for every declared component braid | `2D`, `3D`, `Mixed`, `Not assigned` |
| Assembly span | Complete recorded paths | `1D`, `2D`, `3D`, `Not assigned` |
| Path kind | Operator on every member | Circular, inertial, harmonic, mixed, `Not assigned` |
| Distinct-circle count | Complete circular carriers | Positive integer or `Not assigned` |
| Circle occupancy | Circle equivalence classes | `One per circle`, `Multiple per circle`, `Mixed`, `Not assigned` |
| Radius relation | Declared common frame and complete radial histories | Equal, unequal, time-dependent, `Not assigned` |
| Center relation | Complete center histories | Coincident, coaxial-separated, general, `Not assigned` |
| Plane or axis relation | Declared frames over the complete interval | Coplanar, parallel, orthogonal, coincident-axis, general, `Not assigned` |
| Frequency relation | Complete cadence carriers | Equal, rational ratio, independent, time-dependent, `Not assigned` |
| Phase relation | Complete phase carriers | Equal spacing, declared offsets, time-dependent, `Not assigned` |
| Circulation relation | Oriented path histories | Co-rotating, counter-rotating, mixed, `Not assigned` |
| Breathing | Complete radius histories | Yes, no, `Not assigned` |
| Polarity assignment | Complete persistent polarity word | Exact source word |
| Motion prescription | Complete operator and history interval | Stationary, rigid circular, translating, harmonic, evolved, other |
| Evidence relation | Evidence owner and exact identity | Derived, measured, inferred, guessed |

No row is inherited from another row. Two configurations with common values remain two peer configurations.

## Coordinate Constraints Used by Worked Configurations

The catalog contains several exact coordinate loci. Their descriptive names state their constraints directly:

- **Orthogonal-axis three-binary records** use three declared binary frames. At one endpoint the axes are mutually orthogonal; a declared flattening operator may move them toward a common direction.
- **Coincident-midpoint orthogonal-axis three-binary configurations** set every binary midpoint at the braid center and every axial half-separation to zero.
- **Axially separated orthogonal-axis three-binary configurations** allow positive axial half-separations subject to $R_a^2=h_a^2+\rho_a^2$.
- **Phase-compensated equal-geometry orthogonal-axis three-binary configurations** add equal radii, equal frequencies, cyclic phase spacing, and phase-compensated frames.
- **Coincident-axis three-binary records** place three declared neutral binaries on one oriented axis with a common frequency. The planar locus sets $h_a=0$ for all three binaries; the all-axial boundary sets $\rho_a=0$.
- **Two-component circular records** declare two complete component subsets and their center, axis, frequency, phase, and circulation relations. Co-rotation and counter-rotation are independent values, not subclasses with inherited physics.

These loci are coordinate facts. They do not establish that an EOM-solver trajectory occupies the locus. The old letter containers were unnecessary. The equations themselves say what each chart is.

## Borg Correspondence

Borg uses the same source-declared facts as this taxonomy. Its Assembly Library filters are views over peer records; filtering never creates a parent object. An exact scientific link carries `assemblyId` and `modelRevisionSha256`; a link that must reproduce the exact displayed bytes also carries `recordSha256`.

The reader-facing label may change while the exact scientific link remains valid. An unsupported or incomplete classification remains visible as `Not assigned` and is not offered as a false negative.

## Claim Boundary and Falsifiers

The taxonomy is falsified for a record if Borg and the corpus assign different characteristics from the same source, if a component dimension is assigned without complete membership and paths, if circle occupancy is inferred from samples or appearance, or if scientifically different payloads share an exact identity. A presentation-only change that changes `assemblyId` or `modelRevisionSha256` also falsifies the identity contract. Every classification can be checked against the exact source. Ambiguity closes the classification; it never licenses a guess.
