# Shared-Sphere Assemblies

A shared-sphere assembly is a prescribed collection of architrinos whose worldlines remain on one common sphere: one fixed center, one radius, and every member at that radius for all time. The chart is the two-dimensional companion to [Shared-Circle Assemblies](../../../content/markdown/aaa/dynamics/shared-circle-assemblies.md), and it stands in the same relation to the braid taxonomy — a shared-sphere record becomes a named Noether-braid locus only when its member inventory, polarity pairing, centers, axes, frequencies, and circulation satisfy that braid's exact coordinate contract. Co-sphericity is an appearance. Taxonomy follows the coordinate record.

Co-sphericity organizes exact intersections with the braid taxonomy and permits comparisons among restricted acceleration-balance results. It does not itself imply balance. The shared-circle subset contains prescribed balanced histories, while several nonplanar co-spherical families have bounded exclusions or measured residuals. Those results must be stated at their individual scopes; they do not establish a general obstruction to co-spherical motion.

Plainly: every moving member must remain the same distance from one center. This geometric condition describes a family of possible histories; the acceleration law decides which histories, if any, satisfy it.

The results below distinguish derived chart algebra and taxonomy intersections, a sign-based exclusion for latitude-segregated two-ring words, a finite enumeration of balanced vertex colourings, and measured results cited from their originating analyses. None establishes retained motion, binding, stability, particle identity, effective mass, or formation.

## The Shared-Sphere Chart

Choose a fixed center $\mathbf C$, a radius $R>0$, and $2N$ distinct members. The chart requires

$$\|\mathbf X_k(T)-\mathbf C\|=R\qquad\text{for all }k\text{ and all }T.$$

A balanced $N{:}N$ polarity word assigns $N$ sites each polarity, so $q_k\in\{+\epsilon,-\epsilon\}$ and $\sum_k q_k=0$, in the sense already canon for the shared circle. Compatible scale is reported as $R/R_*$ with $R_*=\kappa\epsilon^2/c_f^2$, and every numerical result uses normalized units with $c_f=1$. Global rotation about $\mathbf C$ and global polarity conjugation are gauge; reflection is a valid reduction only together with the applicable circulation reversal and only after that covariance is checked.

**The condition is on members, and only on members.** This has to be said at the definition rather than in a footnote, because an assembly can carry several distinguishable spheres at once and only one of them qualifies. `F6c` already documents the hazard in its own terms: its four track centers lie on a track-center circumsphere of radius $|h_\sigma|$, while the complete circular tracks lie on the generally larger orbit spherical envelope of radius $\sqrt{h_\sigma^2+\rho_\sigma^2}$, and the two coincide only when $\rho_\sigma=0$. A configuration whose *track centers* are co-spherical, or whose centers form a regular polyhedron, is not thereby a shared-sphere assembly. Only $\|\mathbf X_k(T)-\mathbf C\|=R$ on the architrino worldlines admits a record to this chart.

Plainly: the moving architrinos have to be on the sphere. It is not enough that the centers of their orbits are, and mistaking one for the other is the easiest way to think a candidate belongs here when it does not.

The shared circle is the degenerate case. Any circle lies on a sphere, so every shared-circle record is a shared-sphere record whose members happen to be coplanar with the center. The converse fails, and the way it fails is the whole content of this chapter.

**[derived; latitude-dependent speed]** This is the structural difference between the two charts, and it is not cosmetic. Under rigid co-rotation about an axis $\hat{\mathbf n}$ through $\mathbf C$ at rate $\Omega$, a member at colatitude $\theta_k$ from that axis sits at distance $\rho_k=R\sin\theta_k$ from the rotation axis, so its speed coordinate is

$$\beta_{f,k}=\frac{|\Omega|R\sin\theta_k}{c_f}=\beta_f^{\mathrm{eq}}\sin\theta_k,\qquad \beta_f^{\mathrm{eq}}\equiv\frac{|\Omega|R}{c_f}.$$

The rigid co-rotating shared circle has one member speed. On a shared sphere, the speed generally varies with latitude, from zero at the poles to $\beta_f^{\mathrm{eq}}$ at the equator. Equal member speeds remain possible when all occupied latitudes have the same $\sin\theta_k$, including two mirror latitudes. Even then, equal speed does not remove the axial acceleration conditions or reduce the full vector balance to the shared-circle scalar equation.

Plainly: distance from the rotation axis determines speed. Two rings at equal northern and southern latitudes can have the same speed, but their members must still satisfy acceleration conditions that a planar circle does not have.

Two immediate corollaries fall out. Setting $\theta_k=\pi/2$ for every member recovers the single-speed case and reduces the chart to the shared circle, which is exactly why the equal-radius `B1.3` locus is a shared *circle* rather than a nondegenerate shared sphere. Setting $\theta_k\in\{0,\pi\}$ for every member sends every speed to zero and collapses the arrangement onto two points, which is exactly why the deprecated all-axial `B1.4` boundary cannot be a nondegenerate shared sphere at equal radii.

### Sub-charts

**Rigid co-rotating shared sphere.** One axis, one rate, fixed colatitudes, and fixed relative longitudes. Every pair distance is constant. The axial sign exclusion below applies to this motion class.

**Sector-partitioned shared sphere.** Members are partitioned into groups with independent cadences, subject to the fixed common-radius condition throughout the history. Allowing one common time-dependent radius gives a breathing extension of the fixed-radius chart. Independently varying sector radii generally leave the shared-sphere condition.

A stationary co-spherical arrangement is the zero-motion limit. Uniform translation of such an arrangement is a moving-center extension. Neither evaluates an orbiting history: replacing an orbit by its instantaneous positions discards the source motion that determines delayed interactions. The distinction is developed under [Moving-History Balance](#moving-history-balance).

## Degrees of Freedom and Search Directions

A degree of freedom here is a geometric coordinate, discrete assembly choice, or retained path-history function that may be varied while the Master Equation and its normalization remain fixed. The shared-circle inventory does not transfer by adding a dimension, and the differences run in both directions: the sphere opens coordinates the circle does not have, and it opens obligations the circle discharges for free.

**[derived; coordinate count]** Fix the center and the rotation axis by global translation and rotation, leaving one rotation about the axis to remove a common longitude. A rigid co-rotating shared sphere with $2N$ members then carries $2N$ fixed colatitudes $\theta_k$, $2N-1$ relative longitudes, the common radius $R$, and the common rate $\Omega$: **$4N+1$ continuous coordinates**. The same reduction on the shared circle leaves $2N-1$ relative phases, $R$, and $\Omega$: $2N+1$. The sphere therefore adds exactly $2N$ coordinates, and every one of them is a colatitude. For six members that is seven coordinates against thirteen.

Plainly: on a circle you can only slide members around the ring. On a sphere you can also slide each one north or south, and that second freedom is the entire difference in the count.

**[derived; axial balance]** Under rigid co-rotation the required acceleration for member $k$ is centripetal toward the rotation axis. Writing $\mathbf r_k=\mathbf X_k-\mathbf C$, the residual is $\boldsymbol{\mathcal R}_k=\mathbf A_k^{\mathrm{ME}}+\Omega^2\bigl[\mathbf r_k-(\mathbf r_k\cdot\hat{\mathbf n})\hat{\mathbf n}\bigr]$. The centripetal term has no component along $\hat{\mathbf n}$, so the axial delayed acceleration must vanish for every member. The planar circle discharges this condition because every delayed line of action remains in its plane. Distinct latitudes require additional axial equations; their algebraic independence depends on the configuration's symmetries.

**[derived; two-ring segregation exclusion]** Consider a rigid co-rotating shared sphere whose members occupy exactly two latitude rings, with admitted cross-ring simple roots. Same-ring and same-transmitter hits have separation vectors perpendicular to $\hat{\mathbf n}$ and contribute nothing axially. Every cross-ring hit contributes axially, with sign fixed by the polarity product $\sigma_{tr}$, because the canonical acceleration weight $W^{\mathrm{acc}}=c_f/|D_t|$ is nonnegative on every admitted simple root. If the polarity word is segregated by latitude—each ring carrying one polarity—then every cross-ring product has the same sign, the axial sum is one-signed, and it cannot vanish. Therefore:

> In a two-latitude rigid co-rotating shared sphere, at least one ring must carry both polarities. Latitude-segregated polarity words are excluded.

This is exactly the octahedron exclusion in general form, and it generalizes usefully: with three or more rings, contributions from rings above and below a receiver can cancel against each other, so segregation is no longer automatically fatal. Scope and falsifier follow the corpus statement it generalizes — the argument covers admitted simple roots only, caustic and collision events lie outside it, and an admitted root with a negative canonical acceleration weight, or a nonzero axial same-ring line of action, would overturn it.

Plainly: if the northern members are all one polarity and the southern members all the other, every north-south pull leans the same way and nothing can cancel it. Mixing the polarities within a ring, or using three rings instead of two, restores the possibility of cancellation. This is a real filter and it can be applied today.

It bears directly on `C5`/`C6`, which are two-ring objects: their co-spherical sub-locus is live only if the component rings are not polarity-segregated.

**[derived; mixed wake-speed regime]** A second structural feature has no circle analogue. Because $\beta_{f,k}=\beta_f^{\mathrm{eq}}\sin\theta_k$, when $\beta_f^{\mathrm{eq}}>1$ there is a critical colatitude

$$\theta_c=\arcsin\!\left(\frac{1}{\beta_f^{\mathrm{eq}}}\right),$$

with members nearer the poles below wake speed and members nearer the equator above it, and two critical latitude circles exactly at $c_f$. A single rigid arrangement can therefore host sub-wake-speed and super-wake-speed members simultaneously, and the causal-root fold structure differs from member to member within one configuration. A shared circle is always entirely on one side of $c_f$.

A common notation for nearby prescribed paths is

$$
\mathbf X_k(T)
=
\mathbf C(T)
+
\bigl[R+\delta r_k(T)\bigr]
\Bigl[
\sin\Theta_k(T)\bigl(\cos\Phi_k(T)\hat{\mathbf e}_1(T)+\sin\Phi_k(T)\hat{\mathbf e}_2(T)\bigr)
+
\cos\Theta_k(T)\hat{\mathbf n}(T)
\Bigr],
$$

with $\Theta_k(T)=\theta_k+\delta\theta_k(T)$ and $\Phi_k(T)=\Omega T+\phi_k+\delta\phi_k(T)$. The rigid chart has constant $\mathbf C$ and frame with $\delta r_k=\delta\theta_k=\delta\phi_k=0$. This notation is a search scaffold, not an assertion that any listed variation contains a balanced or retained solution.

Plainly: $\delta\theta_k$ slides a member in latitude and $\delta\phi_k$ slides it in longitude — both keep it on the sphere. Only $\delta r_k$ takes it off. That asymmetry is the important one.

**[derived; chart-preserving deformation]** A fixed circle permits displacement along its one-dimensional track; a displacement normal to that track leaves the circle chart. A fixed sphere additionally permits latitude drift $\delta\theta_k(T)$ while preserving co-sphericity. Both charts admit phase rearrangement along their tracks, but only the sphere admits meridional displacement without leaving its defining surface.

| Degree, choice, or control | Mathematical representation | Geometric or evidential scope | Mathematical role |
| --- | --- | --- | --- |
| Member inventory | Integer $N$, giving $2N$ members | Six-, eight-, and twelve-member examples occur in the cited families; no inventory-wide balance conclusion | Test which inventories admit a non-segregated latitude partition and a balanced polarity word together |
| Latitude partition | Composition of $2N$ into ring occupancies $(n_1,\dots,n_L)$, $L\geq1$ | **The primary new discrete axis.** $L=1$ degenerates to the shared circle; only $L=1$ and the two-ring staggered case have been tested | Determine how many independent axial obligations exist and whether $L\geq3$ opens the cross-ring cancellation channel |
| Fixed colatitudes | $\theta_k$, $2N$ of them | Open; these are the $2N$ coordinates the sphere adds | Search the latitude structure that the circle chart cannot represent at all |
| Polarity word | Balanced $q_k\in\{+\epsilon,-\epsilon\}$, $\sum_kq_k=0$ | Enumerated exhaustively on Platonic vertex sets (917 classes, 28 antipodal-alternating); otherwise open | Identify which delayed acceleration channels cancel; must be varied jointly with the latitude partition, never independently of it |
| Latitude-segregation status | Whether both rings carry a single polarity | Derived exclusion for $L=2$ under the stated simple-root assumptions | Identify words excluded by the one-signed axial sum |
| Relative longitudes | $2N-1$ independent relative longitudes | Open | Inherit the circle's phase searches; asymmetric longitude gaps are unexplored here |
| Common angular rate | $\Omega$, with the speed *family* $\beta_{f,k}=\beta_f^{\mathrm{eq}}\sin\theta_k$ | Open. There is no single speed coordinate, so the certified shared-circle velocity ladder does not lift | Locate balance modes without assuming one scalar balance condition selects the rate |
| Critical colatitude | $\theta_c=\arcsin(1/\beta_f^{\mathrm{eq}})$ for $\beta_f^{\mathrm{eq}}>1$ | Derived structural feature, not a coordinate | Organize the mixed sub- and super-wake-speed regime and the latitude-dependent fold structure |
| Per-ring angular rates | Independent $\Omega_\ell$ per latitude ring | Distinct fixed latitudes separate the corresponding circles | Represent independent counterflow without the same-circle coincidence of persistent opposed circulation |
| Per-ring circulation senses | $s_\ell=\operatorname{sgn}\Omega_\ell$ | New; open | Test counter-rotation between latitudes, handedness, and reflection covariance with the applicable circulation reversal |
| Common radius | $R$, or $R/R_*$ | Open | Determine the compatible assembly scale |
| Per-sector or per-ring radii | $R_\sigma$, $R_\ell$ | **Activating this exits the chart.** The `F6b`-to-`F6c` evidence indicates the dynamics moves this way when released | Document the exit route honestly rather than treating co-sphericity as preserved under release |
| Common radial breathing | $\delta r_k(T)=\delta R(T)$ for every member | Extension beyond fixed $R$; preserves a common time-varying radius | Test coherent expansion and contraction without separating the sector radii |
| Latitude drift | $\delta\theta_k(T)$ | **New; chart-preserving, with no circle analogue** | Test latitude exchange, meridional shear, and internal deformation that does not leave the sphere |
| Longitude modulation | $\delta\phi_k(T)$ | Open | Test phase locking, angular shear, and collision-free speed exchange within a ring |
| Axis orientation and precession | Time-dependent $\hat{\mathbf n}(T)$ and frame | A constant orientation is removable by global rotation; time dependence is open | Test precession-like histories and coupling between latitude structure and axis motion |
| Center translation | $\mathbf C(T)$ | Open; no co-spherical translating control has been run | Test whether internal balance survives assembly transport |
| Antipodal pairing map | Whether binaries are diameters, pairing ring $\ell$ with its mirror ring | 28 of the 917 Platonic classes; the general case is open | Connect to the braid taxonomy's neutral-binary primitive without inferring it from member count |
| Complete retained prehistory | History functions on $-H\leq T\leq0$ with a certified causal-root ledger | Open; the maximum chord is $2R$, so $H\geq2R/c_f$ as on the circle | Supply the initial data a delayed equation actually requires |
| Global rotation and constant center | $SO(3)$ and constant $\mathbf C$ | Gauge coordinates on the fixed model | Remove duplicate descriptions and provide covariance checks |
| Coupling scale and Master-Equation variant | $R_*=\kappa\epsilon^2/c_f^2$ and the declared uncapped or capped equation | Experimental controls, not assembly degrees of freedom | Test scale covariance without confusing a changed model with a new state of one assembly |

> Scope note: this table identifies coordinates and possible extensions, not balanced or retained solutions. The latitude-segregated two-ring exclusion has the simple-root scope stated above. Other balance claims require the complete moving-history residual described under [Open Mathematical Questions](#open-mathematical-questions).

Plainly: the most direct next searches are three-ring latitude partitions, non-segregated two-ring words, and independent per-ring rates. The first two ask whether the axial obligation can be discharged at all. The third asks whether the sphere delivers the counterflow the circle cannot.

A nonplanar shared sphere can support a three-dimensional body frame, while separated latitude circles permit independent counterflow without sharing the same circular track. These are geometric possibilities beyond the rigid co-rotating circle chart. Their compatibility with delayed acceleration balance remains a separate question.

## The Sphere Is Not Supplied By The Substrate

The sphere is a prescribed geometric condition, not an external mechanical constraint.

**[derived; constraint-acceleration requirement]** Maintaining $\|\mathbf X_k(T)-\mathbf C\|=R$ requires a particular normal acceleration. That component must be produced by the Master Equation itself; no supplementary constraint acceleration is supplied by the prescribed sphere. A co-spherical history is a solution only when its complete acceleration residual vanishes. [Neutral Six-Point Balance and A2 Rotation](neutral-six-point-balance-and-a2-rotation.md) makes the same distinction for externally constrained spherical motion.

Plainly: writing down a sphere and putting architrinos on it does not make them stay there. The sphere is a description of a candidate motion, and the candidate has to earn it from the acceleration law like anything else.

An exclusion can reject a declared history. A vanishing prescribed residual establishes balance at the scope actually verified, but does not by itself establish persistence under perturbation, stability, or formation.

## Exact Taxonomy Intersections

For a Family-A or Family-B member with all three binary midpoints at the braid center, both endpoints of binary $a$ sit at distance exactly $R_a$ from that center and are antipodal on that sphere. The co-sphericity test therefore collapses to the single scalar condition $R_1=R_2=R_3$. Note carefully what is *not* required: the axial half-separations $h_a$ and transverse orbit radii $\rho_a$ may still differ per binary, since only $h_a^2+\rho_a^2$ is constrained. Different binaries may sit at different latitudes on the same sphere.

**[derived; classification table]**

| Member | Co-spherical | Exact condition |
|---|---|---|
| `A1.2`, `A3.2` | unconditional | common $R$ declared in the member contract |
| `A2` | unconditional | common $R$, $h$, $\rho$; three small circles at $\pm h$ |
| `A1`, `A1.1`, `A1.3`, `A1.4`, `A3`, `A3.1`, `A3.3`, `A3.4` | sub-locus | $R_1=R_2=R_3$ |
| `B1`, `B1.1`, `B1.2` | sub-locus | $R_1=R_2=R_3$, with $h_a^2+\rho_a^2$ equal across binaries |
| `B1.3` | degenerate sub-locus | $R_1=R_2=R_3$ with $h_a=0$ collapses to the shared **circle** |
| `B1.4` (deprecated) | barred | equal radii with $\rho_a=0$ produce coordinate coincidence at $\pm R\hat{\mathbf n}_B$ |
| `C1`, `C2` | sub-locus | $\exists\,\zeta,R$ with $(\xi_m-\zeta)^2+\rho_m^2=R^2$ for all twelve worldlines, center on $\hat{\mathbf n}_C$ |
| `C3`, `C4` | constrained sub-locus | component centers are separated by $d_C>0$, so at most one component center can be the sphere center and the other component must be all-equatorial |
| `C5`, `C6` | sub-locus | equal radii *within* each component; the two components need not share a radius |

**[derived geometry; open balance question]** `C5` and `C6` declare $h_{ba}=0$ within each component, so their co-spherical sub-locus resolves into two parallel latitude circles on one sphere, offset along the common axis by $d_C$, with the sphere center at $\zeta=(d_C^2+R_2^2-R_1^2)/2d_C$ and $R^2=\zeta^2+R_1^2$. This is a concrete nonplanar extension of the shared-circle geometry. For rigid co-rotation, the [two-ring segregation exclusion](#degrees-of-freedom-and-search-directions) requires a polarity assignment not segregated by latitude. Existence of a balanced mixed-polarity history remains open; the geometry alone does not establish it.

Plainly: most braid families can be made co-spherical by setting their radii equal. Two families are co-spherical by definition. One family, C5/C6, becomes something the circle chapter could never describe — two rings at different heights on one sphere — and that is the shape most worth testing.

## Inventory Of Evaluated Shared-Sphere Objects

Each row is owned by the document named; this chapter collects dispositions and does not restate the evidence.

**[measured and derived, per row; grades and instruments belong to the owning documents]**

| Object | Co-sphericity | Disposition |
|---|---|---|
| Orthogonal-plane weave $3{:}3$ | unconditional; three great circles in orthogonal planes, an `A1.2` locus | interval-certified bounded no-balance for every $\beta_f\in[0.25,12]$ on the fixed relative-phase locus ([brainstorming](brainstorming.md)) |
| Rigid co-rotating octahedron | unconditional; $h=R/\sqrt3$, $\rho=R\sqrt{2/3}$, the cyclic-symmetric A2/B1 overlap | excluded by a one-signed axial-sum argument for $h>0$ on the segregated word ([brainstorming](brainstorming.md)) |
| `F6b` | unconditional; the $h_+=h_-$, $\rho_+=\rho_-$ specialization of `F6c` | measured member-acceleration failure on the declared realization ([candidate registry](candidate-registry.md)) |
| Stationary six sites on $S^2$ | unconditional | no stationary balance in the aligned-ring, staggered-ring, regular-octahedral, or single-ring transitive strata ([neutral six-point balance](neutral-six-point-balance-and-a2-rotation.md)); the global sphere question remains open |
| Platonic vertex sets, all five | unconditional; unit circumradius | 917 balanced-colouring classes enumerated; no exhaustive moving-history balance evaluation ([Platonic Vertex Sets](#platonic-vertex-sets)) |
| `F6c` | sub-locus $R_{\mathrm{orbit},+}=R_{\mathrm{orbit},-}$, maintained along the history | the cited acceleration comparison does not establish a retained co-spherical history ([F6c geometry](f6c-geometry.md)) |
| `SD3` | sub-locus $\|P\mathbf y_+\|=\|P\mathbf y_-\|$ | one bounded five-coordinate slice, no return |
| `F5` regular chart | barred; the chart requires $\rho_1\ne\rho_2$ | the collapse to equal radii is a degenerate chart boundary that reinstates same-circle collision ([inferring braid requirements](../mapping-equations/inferring-braid-requirements.md)) |

Two entries deserve to be read together rather than as separate rows.

**[measured; owned by F6c geometry]** `F6b` is the single-sphere specialization of `F6c`, and the Master Equation rejected it in an unusually informative way. Projection of the evaluated acceleration onto the common three-coordinate tangent of the fixed shared-radius history leaves $68.408\%$ of the acceleration norm outside that tangent. Granting the two polarity sectors separate axial, radial, and phase histories — that is, releasing the single shared sphere into two independently breathing sector envelopes — reduces the measured normal fraction to $2.31\times10^{-15}$.

Plainly: the larger, polarity-resolved set of allowed motions fits the measured acceleration much better at the evaluated state. This is a tangent-projection comparison, not an evolved departure from the sphere and not evidence that the larger history is retained.

**[inference; limited to the listed nonplanar examples]** The axial sign argument, interval-certified bounded exclusion, tangent-projection residual, and stationary-strata exclusions provide distinct reasons that particular co-spherical prescriptions fail. Their union is not a theorem about all shared-sphere histories, and the balanced shared-circle subset already prevents such a blanket conclusion. A nonplanar acceleration-balanced history would disprove any stronger conjecture that co-sphericity itself is obstructed outside the planar subset.

The remaining mathematical requirements concern collision clearance, complete causal-root balance, and the distinction between finite polarity enumeration and continuous history selection.

## Platonic Vertex Sets

The five convex regular polyhedra provide a finite set of co-spherical vertex geometries. Their use here is geometric: they define prescribed arrangements on which balanced polarity assignments can be classified. Regularity does not supply an acceleration law, select a physical assembly, or establish retained motion.

The finite vertex and polarity classification must be distinguished from the continuous motion problem. A rotation axis, angular rate, radius, and complete source history still have to be specified. Enumerating every polarity word therefore completes one discrete coordinate, not the dynamical classification.

Plainly: the regular solids give a finite list of shapes and plus-minus patterns. They do not give a finite list of all possible motions of those shapes.

### Balanced Polarity Assignments

Every Platonic vertex set is co-spherical by construction. Its even vertex count guarantees that a balanced polarity assignment exists.

**[derived; elementary]** The five convex regular polyhedra have vertex counts $4$, $6$, $8$, $12$, and $20$. Every one of them is even. Consequently every Platonic vertex set admits a balanced polarity word. There is no Platonic solid on which polarity neutrality is obstructed, and no vertex left over.

Neutrality still restricts the allowed colourings to those with exactly half the vertices of each polarity. Evenness guarantees that this restricted set is nonempty; it does not make an arbitrary colouring neutral. The balanced colouring is a discrete coordinate independent of the circumradius.

**[derived]** Four of the five solids are centrally symmetric: the octahedron, cube, icosahedron, and dodecahedron each have $V/2$ antipodal vertex pairs. On those four, the *antipodal-alternating* colouring — opposite polarity at each antipodal pair — resolves the whole vertex set into $V/2$ neutral binaries sharing one centre, which is exactly the compositional primitive the [braid taxonomy](../../../content/markdown/aaa/noether-braid/braid-taxonomy.md) uses and exactly the condition under which the taxonomy intersections above collapse to $R_1=R_2=R_3$. The tetrahedron is the exception; it has no antipodal pairs, so its balanced words are edge-versus-opposite-edge splits rather than binary decompositions.

The vertex counts can be compared with familiar member inventories without identifying their geometries.

| Solid | $V$ | Balanced word | Neutral binaries | Related member inventory |
|---|---|---|---|---|
| Tetrahedron | 4 | 2:2 | — (no antipodes) | no braid identification asserted |
| Octahedron | 6 | 3:3 | 3 | base / Family-A / Family-B braid, six worldlines |
| Cube | 8 | 4:4 | 4 | `F6b` and `F6c`, eight architrinos on four tetrahedral axes |
| Icosahedron | 12 | 6:6 | 6 | Family C, twelve worldlines |
| Dodecahedron | 20 | 10:10 | 10 | no braid identification asserted |

**[inference; geometric significance unestablished]** The six-, eight-, and twelve-member inventories coincide with the octahedral, cubic, and icosahedral vertex counts. Count equality does not imply equality of coordinates, histories, or symmetry groups. A symmetry-selection claim would require a retained history with the corresponding polyhedral stabilizer; a retained history at another count would refute any claim that these counts are necessary.

Plainly: having eight members does not make an assembly a cube. The positions and motion must establish that geometry independently.

### Embedding Platonic Vertex Sets in Periodic Lattices

An exact lattice embedding asks whether every vertex of a regular polyhedron belongs to a declared point set. This is a finite geometric question, not a claim that the whole point set has the polyhedron's rotational symmetry. The distinction matters because the absence of a fourfold symmetry axis from a hexagonal lattice does not, by itself, exclude a finite cube: a sufficiently sparse cubic sublattice can still lie inside the hexagonal point set.

The crystallographic restriction nevertheless gives an exact obstruction for the icosahedron and dodecahedron in the lattice families considered here. Let $P$ be the vertex set of a full-dimensional regular polyhedron contained in a translate of a rank-three lattice $\Lambda$, and define the difference lattice

$$\Gamma_P=\operatorname{span}_{\mathbb Z}\{\mathbf p-\mathbf q:\mathbf p,\mathbf q\in P\}\subseteq\Lambda.$$

Because $P$ spans three dimensions, $\Gamma_P$ has rank three. Every rotational symmetry $Q$ of $P$ permutes the vertex differences, so $Q\Gamma_P=\Gamma_P$. In a basis of $\Gamma_P$, $Q$ is therefore an integer matrix. If $Q$ is a rotation of order $r$, its eigenvalues are $1,e^{2\pi i/r},e^{-2\pi i/r}$ and hence

$$\operatorname{tr}Q=1+2\cos\!\left(\frac{2\pi}{r}\right)\in\mathbb Z.$$

Since a three-dimensional rotation has trace in $[-1,3]$, integrality restricts $\cos(2\pi/r)$ to $-1,-1/2,0,1/2$, or $1$. The only possible finite rotation orders are therefore $r\in\{1,2,3,4,6\}$. The fivefold rotations of the icosahedron and dodecahedron are incompatible with an exact vertex embedding in any rank-three lattice. The conclusion also covers the body-centered cubic, face-centered cubic, diamond-cubic, ideal hexagonal-close-packed, alternating-plane simple-cubic, and finite simple-cubic point sets below: each is contained in a rank-three lattice after, where necessary, a finite refinement of its translation basis.

Plainly: the regular solid need not be a symmetry of the whole crystal. However, its vertices generate their own difference lattice, and every symmetry of the solid must preserve that generated lattice. A fivefold rotation cannot preserve a three-dimensional translation lattice, so exact regular icosahedral and dodecahedral vertex sets cannot occur in these point sets.

Crystallographic compatibility is only a necessary condition. Positive embedding claims require explicit coordinates. For the simple-cubic lattice $a\mathbb Z^3$, with standard basis vectors $\mathbf e_1,\mathbf e_2,\mathbf e_3$ and any positive integer $n$, the following sets give a cube of edge $na$, an octahedron of edge $\sqrt2na$, and a tetrahedron of edge $\sqrt2na$:

$$
\begin{aligned}
C_n&=\left\{na(i\mathbf e_1+j\mathbf e_2+k\mathbf e_3):i,j,k\in\{0,1\}\right\},\\
O_n&=\left\{\pm na\mathbf e_1,\pm na\mathbf e_2,\pm na\mathbf e_3\right\},\\
T_n&=\left\{\mathbf0,na(\mathbf e_1+\mathbf e_2),na(\mathbf e_1+\mathbf e_3),na(\mathbf e_2+\mathbf e_3)\right\}.
\end{aligned}
$$

#### Point Sets, Selected Vertices, and Relationship Graphs

Three mathematical objects must be distinguished. The occupied point set $\Lambda$ records which positions are available. A Platonic embedding selects a finite subset $P\subset\Lambda$ as the vertices of one regular solid. An optional relationship graph $G=(\Lambda,E)$ then declares which pairs of occupied sites are connected for a specified geometric, computational, or display purpose. The point set alone does not determine that graph. For example, the nearest-neighbor graph is obtained by defining

$$
d_{\min}=\min_{\mathbf p\ne\mathbf q\in\Lambda}\|\mathbf p-\mathbf q\|,
\qquad
E_{\mathrm{nn}}=\left\{\{\mathbf p,\mathbf q\}\subset\Lambda:\|\mathbf p-\mathbf q\|=d_{\min}\right\},
$$

but another graph may connect a longer shell, only the edges of a selected polyhedron, or no pairs at all. Changing $E$ changes the displayed or analyzed relationships without moving any point of $\Lambda$. In particular, a line called a “bond” in a crystallographic diagram is an adjacency convention, not an additional part of the lattice definition and not, by itself, an $\mathbb{A}\mathbb{A}\mathbb{A}$ interaction law. A Master Equation evaluation still requires the declared path histories and complete causal-root acceleration contributions; a nearest-neighbor drawing does not restrict those contributions unless a separately justified approximation explicitly does so.

Plainly: the dots, the selected Platonic corners, and the lines drawn between dots are three separate choices. The same dots can support several different Platonic selections and several different line drawings without changing the underlying lattice.

#### Integer Ladders, Common Centers, and Lattice Shells

The coordinate families $C_n$, $O_n$, and $T_n$ establish one exact embedding for every integer $n\geq1$, but three different statements must be kept separate. An *integer ladder* means only that the edge length grows linearly with $n$. A *common-center nesting* additionally requires every member of the ladder to have the same center. A *lattice shelling* must assign every lattice site to one discrete layer. None of these statements means that translated copies of the solid tile Euclidean space.

For the displayed families, $O_n$ is centered at the origin for every $n$, whereas both $C_n$ and $T_n$ have center $na(\mathbf e_1+\mathbf e_2+\mathbf e_3)/2$. The cube and tetrahedron therefore exist at every integer edge index only because their centers move with $n$. With one fixed center, lattice parity selects one half of the ladder: a lattice-point center admits even edge indices, while a half-cell center admits odd edge indices. A common-center ladder about the origin can be written with cube vertices $a(\pm m,\pm m,\pm m)$, octahedron vertices $\{\pm ma\mathbf e_i\}_{i=1}^3$, and tetrahedron vertices

$$ma\{(1,1,1),(1,-1,-1),(-1,1,-1),(-1,-1,1)\}.$$

Their edge lengths are respectively $2ma$, $\sqrt2ma$, and $2\sqrt2ma$. Thus the octahedral family retains every integer $m$ about a lattice-point center, while the common-center cube and tetrahedron correspond to the even-index members of the original $n$ ladder.

Plainly: every positive integer gives a valid cube, octahedron, and tetrahedron somewhere in the simple-cubic lattice. If the center must remain fixed, the octahedron can grow one lattice step at a time, but the cube and tetrahedron grow by two edge-index steps because their vertices must remain on lattice points.

Vertex nesting still does not shell the lattice. Across all $m$, the cube vertices occupy eight body-diagonal rays, the octahedron vertices occupy the three coordinate axes, and the tetrahedron vertices occupy four body-diagonal rays. All other lattice sites are absent from those vertex sets. To shell the complete simple-cubic point set, define

$$
\begin{aligned}
\mathcal S_m^{\mathrm C}&=\{a\mathbf k:\mathbf k\in\mathbb Z^3,\ \|\mathbf k\|_\infty=m\},\\
\mathcal S_m^{\mathrm O}&=\{a\mathbf k:\mathbf k\in\mathbb Z^3,\ \|\mathbf k\|_1=m\},\\
\tau(\mathbf k)&=\max\{-k_1-k_2-k_3,-k_1+k_2+k_3,k_1-k_2+k_3,k_1+k_2-k_3\},\\
\mathcal S_m^{\mathrm T}&=\{a\mathbf k:\mathbf k\in\mathbb Z^3,\ \tau(\mathbf k)=m\}.
\end{aligned}
$$

Each family is disjoint in $m$ and its union over $m\geq0$ is the complete simple-cubic lattice. The corresponding closed level sets have the common-center cube, octahedron, and tetrahedron above as their extreme vertices. For $m\geq1$, elementary lattice-point counting gives

| Shell | All sites on the shell | Platonic vertices | Other boundary sites |
|---|---:|---:|---:|
| Cubical, $\mathcal S_m^{\mathrm C}$ | $24m^2+2$ | $8$ | $24m^2-6$ |
| Octahedral, $\mathcal S_m^{\mathrm O}$ | $4m^2+2$ | $6$ | $4m^2-4$ |
| Tetrahedral, $\mathcal S_m^{\mathrm T}$ | $8m^2+2$ | $4$ | $8m^2-2$ |

The sites in the last column are not additional vertices of the regular solid. They are lattice sites on its edges or face interiors. Sites on shells with index smaller than $m$ lie inside the solid. A vertex-only prescribed assembly excludes all of them from its member inventory; a lattice assembly does not. In the latter case, every nonvertex boundary site and every interior site requires its own polarity, path history, and delayed-acceleration rows.

Plainly: the nested solids can divide the grid points into complete cubical, octahedral, or tetrahedral layers, but only when every point on each layer is counted. Keeping only the four, six, or eight corner sites leaves nearly the entire lattice unused and does not make a shell.

#### Space-Filling Honeycombs and the Three-Shape Boundary

The shell constructions above partition lattice sites by a level-set index. A polyhedral honeycomb asks a different question: whether closed three-dimensional cells cover Euclidean space with disjoint interiors. In a *face-to-face* honeycomb, the intersection of two cells is empty or is one complete face, edge, or vertex of each cell. This stronger condition makes the tetrahedron–octahedron construction exact and also gives a sharp boundary on mixing cubes into the same honeycomb.

Split the simple-cubic point set into its two checkerboard parity classes

$$
\Lambda_0=\{a\mathbf k:\mathbf k\in\mathbb Z^3,\ k_1+k_2+k_3\equiv0\pmod2\},
\qquad
\Lambda_1=\{a\mathbf k:\mathbf k\in\mathbb Z^3,\ k_1+k_2+k_3\equiv1\pmod2\}.
$$

Each class is an FCC lattice with conventional cubic side $2a$ and nearest-neighbor distance $\sqrt2a$. For every $\mathbf u\in\Lambda_1$, define the octahedron

$$
\mathcal O_{\mathbf u}
=
\operatorname{conv}\{\mathbf u\pm a\mathbf e_1,\mathbf u\pm a\mathbf e_2,\mathbf u\pm a\mathbf e_3\}.
$$

For each unit simple-cubic cell indexed by $\mathbf k\in\mathbb Z^3$, define the tetrahedron from its four even-parity corners

$$
\mathcal T_{\mathbf k}
=
\operatorname{conv}
\left\{
a(\mathbf k+\boldsymbol\delta):
\boldsymbol\delta\in\{0,1\}^3,
\ \sum_{i=1}^3(k_i+\delta_i)\equiv0\pmod2
\right\}.
$$

Every cell in $\{\mathcal T_{\mathbf k}\}\cup\{\mathcal O_{\mathbf u}\}$ is regular with edge $\sqrt2a$. Direct comparison of the triangular supporting planes shows that their interiors are disjoint and that each triangular face is shared by one tetrahedron and one octahedron. The periodic cell densities and volumes are

$$
\nu_{\mathrm T}=\frac1{a^3},
\qquad
\nu_{\mathrm O}=\frac1{2a^3},
\qquad
V_{\mathrm T}=\frac{a^3}{3},
\qquad
V_{\mathrm O}=\frac{4a^3}{3},
$$

so $\nu_{\mathrm T}V_{\mathrm T}+\nu_{\mathrm O}V_{\mathrm O}=1$ and the cell-count ratio is $\nu_{\mathrm T}:\nu_{\mathrm O}=2:1$. Around every honeycomb edge, two tetrahedra and two octahedra alternate. Their internal dihedral angles satisfy

$$
\theta_{\mathrm T}=\arccos\!\left(\frac13\right),
\qquad
\theta_{\mathrm O}=\arccos\!\left(-\frac13\right)=\pi-\theta_{\mathrm T},
\qquad
2\theta_{\mathrm T}+2\theta_{\mathrm O}=2\pi.
$$

This is the tetrahedral–octahedral honeycomb, also called the alternated cubic honeycomb. Nicholas Matteo's classification of face-to-face two-orbit tilings identifies the same honeycomb as the three-dimensional quasiregular case; see *Two-Orbit Convex Polytopes and Tilings*, *Discrete & Computational Geometry* **55** (2016), 296–313, [doi:10.1007/s00454-015-9754-2](https://doi.org/10.1007/s00454-015-9754-2), [arXiv:1403.2125](https://arxiv.org/abs/1403.2125). The coordinate construction above independently establishes the particular realization used here.

Plainly: the even checkerboard sites are the complete vertex set of a gapless three-dimensional jigsaw made from regular tetrahedra and octahedra of one edge length. There are exactly two tetrahedral cells for every octahedral cell.

The unused checkerboard class has an exact geometric role. Every $\mathbf u\in\Lambda_1$ is the center of the octahedral cell $\mathcal O_{\mathbf u}$, while its six nearest neighbors in $\Lambda_0$ are that octahedron's vertices. Conversely, every site in $\Lambda_0$ has six nearest neighbors in $\Lambda_1$. Thus the complete checkerboard simple-cubic point set has the same two-interpenetrating-FCC and sixfold opposite-class coordination geometry as the conventional rock-salt structure. This is a point-set comparison only: it imports neither a chemical bond rule nor a physical selection mechanism into $\mathbb{A}\mathbb{A}\mathbb{A}$.

The distinction between a honeycomb and a lattice assembly remains essential. The tetrahedral–octahedral honeycomb uses $\Lambda_0$ as its vertex set; the sites in $\Lambda_1$ are cell centers, not additional honeycomb vertices. If both parity classes are occupied by architrinos, the center sites become additional assembly members and require their own polarities, histories, and complete delayed-acceleration rows.

Plainly: the second polarity class is not geometrically unexplained, but including it physically changes the member inventory. In the honeycomb it labels octahedron centers; in a full checkerboard assembly those centers are occupied sites as well.

The full simple-cubic point set separately supports the ordinary cubic honeycomb

$$
\mathcal C_{\mathbf k}=a\bigl(\mathbf k+[0,1]^3\bigr),
\qquad
\mathbf k\in\mathbb Z^3.
$$

The cubic and tetrahedral–octahedral honeycombs are two complete decompositions of the same Euclidean space, not cell sets that can be superposed without overlap. More strongly, an intact regular cube cannot occur together with intact regular tetrahedral or octahedral cells in one connected face-to-face honeycomb. Every cube facet is a square, whereas every tetrahedron and octahedron facet is a triangle. A cube facet must therefore meet another cube facet. The facet-adjacency graph of a face-to-face honeycomb of connected Euclidean space is connected, so the presence of one cube forces every facet-adjacent cell, and hence every cell, to be a cube. This obstruction does not depend on a common edge length.

The conclusion is scoped to intact regular cells in a face-to-face honeycomb. It does not classify non-face-to-face contacts, subdivided cube faces, compound supercells, truncated or deformed cells, or other nonregular space fillings. Those are different tiling problems and cannot be inferred from the two honeycombs above.

Plainly: cubes tile space, and regular tetrahedra plus regular octahedra tile space, but the three regular cell types cannot all participate in one ordinary face-matched honeycomb. A construction that cuts faces into smaller pieces or changes the cells leaves that theorem's domain.

> Claim grade: derived. The coordinate construction, face incidences, cell densities, volumes, and exact dihedral-angle identity establish the tetrahedral–octahedral honeycomb and its $2:1$ cell ratio. The square-versus-triangle facet argument excludes any connected face-to-face honeycomb containing all three intact regular cell types. A coordinate point lying in two cell interiors, an uncovered positive-volume region, an incorrect face incidence or density, or a face-to-face counterexample containing a regular cube together with a regular tetrahedron or octahedron would overturn the corresponding claim. The rock-salt identification is a geometric comparison and is falsified by failure of either parity class to form an FCC lattice or failure of sixfold opposite-class nearest-neighbor coordination.

#### Periodic Polarity Decorations of the Simple-Cubic Ladders

The same simple-cubic point set supports distinct periodic polarity maps. For the app's axis convention, let $\mathbf x=a(i,j,k)$ and assign the origin positive polarity. The alternating-plane and checkerboard maps are

$$
s_{\mathrm{plane}}(i,j,k)=(-1)^k,
\qquad
s_{\mathrm{check}}(i,j,k)=(-1)^{i+j+k}.
$$

The first map makes each plane of constant $k$ monochromatic and alternates polarity between adjacent planes along $Z$. The second changes polarity across every axial nearest-neighbor step. Its two polarity classes are the even- and odd-coordinate-sum subsets of $\mathbb Z^3$; after multiplication by $a$, each class is an FCC lattice with conventional cubic side $2a$, and the two classes are translates of one another. A lattice translation changes at most the names of the two polarities: translating by $(r,s,t)$ multiplies the plane map by $(-1)^t$ and the checkerboard map by $(-1)^{r+s+t}$. The polarity counts below are therefore translation-invariant even when the polarity names exchange.

Plainly: alternating planes cut the grid into monochromatic slabs. The checkerboard instead splits the same grid into two interpenetrating three-dimensional point sets. Neither decoration changes which lattice positions exist.

The following table evaluates the axis-aligned sets $C_n$, $O_n$, and $T_n$ exactly as displayed above. The origin is an anchoring vertex of $C_n$ and $T_n$, but it is the center of $O_n$; for odd $n$, the cube and tetrahedron centers are half-cell points rather than polarity-labelled lattice sites.

| Shape | Alternating planes, $s_{\mathrm{plane}}$ | Checkerboard, $s_{\mathrm{check}}$ |
|---|---|---|
| Cube, $C_n$ | even $n$: monochromatic $8{:}0$; odd $n$: balanced $4{:}4$, with two monochromatic opposite faces | even $n$: monochromatic $8{:}0$; odd $n$: balanced $4{:}4$, with each polarity class forming a regular tetrahedron |
| Octahedron, $O_n$ | even $n$: monochromatic $6{:}0$; odd $n$: unbalanced $4{:}2$, with the axial pair opposite to the four transverse vertices | monochromatic for every $n$; relative to the positive origin, the six vertices are positive for even $n$ and negative for odd $n$ |
| Tetrahedron, $T_n$ | even $n$: monochromatic $4{:}0$; odd $n$: balanced $2{:}2$, with each polarity occupying one of a pair of opposite edges | monochromatic positive for every $n$ |

These entries follow directly by evaluating the two exponents at every displayed vertex. They also delimit neutrality. For equal-magnitude opposite polarities, the alternating-plane cube at odd $n$, the alternating-plane tetrahedron at odd $n$, and the checkerboard cube at odd $n$ are neutral. The alternating-plane octahedron at odd $n$ is not neutral, and none of the monochromatic cases is neutral.

For odd $n$, both cube decorations are also antipodal-alternating: opposite cube vertices have opposite polarities. The alternating-plane map groups those polarities by opposite faces, whereas the checkerboard map groups them into the two tetrahedra below. By contrast, opposite octahedral vertices always have the same parity because $-n\equiv n\pmod2$, so neither decoration produces an antipodal-alternating octahedron. The tetrahedron has no antipodal vertex pairs.

Plainly: the checkerboard tetrahedron and octahedron stay within one polarity class at each scale. The odd checkerboard cube is the exceptional case in which the eight corners divide into two complete, oppositely labelled tetrahedra.

For odd $n$, define the two checkerboard subsets of the cube by

$$
P_+=\left\{na(i,j,k):i,j,k\in\{0,1\},\ i+j+k\equiv0\pmod2\right\},
\qquad
P_-=C_n\setminus P_+.
$$

Both $P_+$ and $P_-$ are regular tetrahedral vertex sets with edge $\sqrt2na$, and $P_+\sqcup P_-=C_n$. Their compound is the classical *stella octangula*. The vertex sets themselves do not intersect. If $\mathbf c=na(1,1,1)/2$ is the cube center, the filled tetrahedra instead satisfy

$$
\operatorname{conv}(P_+)\cap\operatorname{conv}(P_-)
=\left\{\mathbf c+\mathbf y:\|\mathbf y\|_1\leq\frac{na}{2}\right\},
$$

which is the regular octahedron whose six vertices are the cube's face centers. Thus “stella octangula” names the union of the dual tetrahedra, while their common filled region is the central octahedron.

Plainly: the opposite-polarity tetrahedra use all eight cube corners and pass through one another. The star compound is their union, not their set intersection; the volume shared by the two solid tetrahedra has the shape of an octahedron.

This is a prescribed polarity geometry, not by itself a physical realization. In particular, an acceleration result for the complete infinite checkerboard or alternating-plane lattice cannot be transferred to the eight-site cube by deleting every other lattice site: that deletion changes the complete causal-root acceleration sum. The compound therefore remains a geometric and polarity construction until a declared path history is evaluated for precisely its member inventory.

The app's other periodic polarity decorations give additional exact consequences for the Platonic constructions displayed in this section.

| Decorated point set | Exact consequence for the displayed Platonic families |
|---|---|
| BCC, opposite corner/body cosets | Every ladder confined to one conventional simple-cubic coset is monochromatic. The eight nearest neighbors of any site form a monochromatic cube whose polarity is opposite that of the central site. |
| FCC, alternating $(001)$ site planes | Every ladder confined to one conventional simple-cubic coset is monochromatic. For the smaller FCC tetrahedral ladder, even $m$ is monochromatic and odd $m$ is $2{:}2$ on opposite edges. For the smaller octahedral ladder, even $m$ is monochromatic and odd $m$ is $4{:}2$. |
| Diamond cubic, opposite FCC subnetworks | Every family confined to one FCC subnetwork is monochromatic. The four nearest neighbors of any site form a monochromatic regular tetrahedron with polarity opposite the central site. |
| Ideal HCP, opposite A/B stacking positions | The scalable constructions confined to one A or B sublattice are monochromatic. The local packing tetrahedron described below is $3{:}1$, while the local octahedron is balanced $3{:}3$ with one monochromatic triangular face from each stacking position. |
| Finite simple-cubic random $50/50$ configuration | No deterministic parity classification follows. Each candidate solid must be tested against the realized finite assignment and crop. |

The checkerboard rule has no nearest-neighbor-opposite analogue on an FCC or HCP nearest-neighbor graph because each graph contains triangles. For the app's FCC alternating-plane decoration, an FCC site has four same-polarity and eight opposite-polarity nearest neighbors. For the app's ideal-HCP A/B decoration, a site has six same-polarity in-plane and six opposite-polarity out-of-plane nearest neighbors. BCC and diamond are different: their nearest-neighbor graphs are bipartite under the app's two-sublattice polarity assignments.

Plainly: “two sublattices” does not imply the same polarity geometry in every lattice. BCC and diamond can reverse polarity across every nearest-neighbor edge. FCC and HCP cannot, because their nearest-neighbor triangles force at least one same-polarity edge.

> Claim grade: derived. The simple-cubic table follows by substituting the displayed vertex coordinates into $s_{\mathrm{plane}}$ and $s_{\mathrm{check}}$. The stella-octangula statement follows from the two parity classes and their pairwise distances; the intersection formula follows from the eight facet inequalities of the two tetrahedra. The BCC, FCC, diamond, and HCP rows follow from the displayed coset or stacking-position assignments. Falsifier: a vertex whose evaluated parity gives a different table count, unequal pairwise edge lengths within either $P_+$ or $P_-$, a point belonging to exactly one side of the displayed convex-hull intersection equality, or a nearest-neighbor triangle admitting an opposite-polarity label on all three edges would invalidate the corresponding claim.

#### Conventional-Cubic Cosets and Site Coverage

Body-centered cubic and face-centered cubic are Bravais lattices in their own primitive bases, while diamond cubic is a periodic point set with a two-site basis. Relative to a conventional cubic cell of side $a$, however, all three admit exact decompositions into translated simple-cubic point sets. Define

$$
\mathcal F=\left\{(0,0,0),\left(0,\frac12,\frac12\right),\left(\frac12,0,\frac12\right),\left(\frac12,\frac12,0\right)\right\},
\qquad
\mathcal D=\mathcal F\cup\left(\mathcal F+\left(\frac14,\frac14,\frac14\right)\right).
$$

Their point sets can then be written as the following disjoint unions of cosets of $a\mathbb Z^3$:

$$
\begin{aligned}
\Lambda_{\mathrm{BCC}}&=a\mathbb Z^3\ \sqcup\ a\left[\left(\frac12,\frac12,\frac12\right)+\mathbb Z^3\right],\\
\Lambda_{\mathrm{FCC}}&=\bigsqcup_{\boldsymbol\delta\in\mathcal F}a(\boldsymbol\delta+\mathbb Z^3),\\
\Lambda_{\mathrm{diamond}}&=\bigsqcup_{\boldsymbol\delta\in\mathcal D}a(\boldsymbol\delta+\mathbb Z^3).
\end{aligned}
$$

Thus BCC, FCC, and diamond cubic contain respectively two, four, and eight translated copies of the same simple-cubic point set. These are conventional-cell coset decompositions, not claims that BCC or FCC ceases to be a distinct Bravais lattice. They also explain why the nearest-neighbor graph can look unlike a simple-cubic graph. In BCC, for example, nearest-neighbor edges join the two cosets along conventional-cell body diagonals even though either coset taken alone is simple cubic.

Every site of one coset can be made a vertex of infinitely many cubes, octahedra, and tetrahedra. If $\mathbf p\in a(\boldsymbol\delta+\mathbb Z^3)$, translating $C_n$ or $T_n$ by $\mathbf p$ makes $\mathbf p$ their displayed zero vertex. Translating $O_n$ so that its center is $\mathbf p-na\mathbf e_1$ makes $\mathbf p$ its $+\mathbf e_1$ vertex. Repeating this construction on every coset proves that no BCC, FCC, or diamond-cubic site is omitted from all such vertex families.

Plainly: choosing only the corner-type simple-cubic subset leaves the other site types unused in that one construction. It does not leave them unusable. Each omitted site belongs to another translated cubic grid, and the same cube, octahedron, and tetrahedron recipe can be started from that grid.

The face-centered cubic lattice also supplies smaller tetrahedral and octahedral scales. One corner together with the three adjacent face centers forms a regular tetrahedron, and the six face centers surrounding a cell center form a regular octahedron, both with edge $a/\sqrt2$. Diamond cubic contains two face-centered cubic sublattices, so it inherits those scalable constructions; the four nearest neighbors of any diamond site additionally form the familiar local regular tetrahedron.

The face-centered cubic tetrahedral and octahedral families at the smaller scale also form exact integer ladders. Writing FCC as $(a/2)\{\mathbf k\in\mathbb Z^3:k_1+k_2+k_3\text{ is even}\}$, the four sites

$$\frac{ma}{2}\{\mathbf0,\mathbf e_1+\mathbf e_2,\mathbf e_1+\mathbf e_3,\mathbf e_2+\mathbf e_3\}$$

form a regular tetrahedron of edge $ma/\sqrt2$ for every $m\geq1$. With $\mathbf c_m=m(\mathbf e_1+\mathbf e_2+\mathbf e_3)$, the six sites $(a/2)\{\mathbf c_m\pm m\mathbf e_i\}_{i=1}^3$ form a regular octahedron of the same edge. Diamond cubic inherits both ladders from either of its FCC sublattices. No corresponding all-integer claim is made here for other BCC orientations or for the separate nearest-neighbor adjacency orientation in diamond cubic.

Plainly: a cubic skeleton supplies three reusable constructions. Eight corners give a cube, the six positive and negative coordinate-axis sites give an octahedron, and four alternating cube corners give a tetrahedron. BCC, FCC, and diamond cubic contain such a skeleton even though their complete point sets contain additional sites.

Coset-wise vertex coverage is not one fixed-center shelling of the complete host lattice. It is a collection of translated ladder families with different centers. Within any one selected polyhedron, almost every host-lattice site remains a nonvertex site; across the complete collection, every site occurs as a vertex somewhere. A complete common-center host-lattice shelling would still need one explicit layer index for every site rather than a union of overlapping translated constructions.

Ideal hexagonal close packing supplies a useful counterexample to the claim that a finite cube requires a fourfold axis of the complete point set. Let

$$
\mathbf a_1=(a,0,0),\qquad
\mathbf a_2=\left(\frac a2,\frac{\sqrt3a}{2},0\right),\qquad
\mathbf a_3=\left(0,0,2a\sqrt{\frac23}\right)
$$

generate the A sublattice of ideal HCP. The B sublattice is offset from it by $(\mathbf a_1+\mathbf a_2)/3+\mathbf a_3/2$. For $n=6m$, the points

$$
\mathbf0,\quad n\mathbf a_1,\quad n\mathbf a_2,\quad \frac n3(\mathbf a_1+\mathbf a_2)+\frac n2\mathbf a_3
$$

form a regular tetrahedron of edge $na$. A regular octahedron of the same edge has one triangular face $\{\mathbf0,n\mathbf a_1,n\mathbf a_2\}$ and the opposite face

$$
\left\{
\frac{2n}{3}(\mathbf a_1+\mathbf a_2)+\frac n2\mathbf a_3,
\frac{2n}{3}(\mathbf a_1+\mathbf a_2)+\frac n2\mathbf a_3-n\mathbf a_1,
\frac{2n}{3}(\mathbf a_1+\mathbf a_2)+\frac n2\mathbf a_3-n\mathbf a_2
\right\}.
$$

The coefficient restriction $n=6m$ places every displayed point on the same HCP A sublattice and gives arbitrarily large examples. At nearest-neighbor scale, the same tetrahedral formula with $n=1$ places its fourth vertex on the B sublattice. A local regular octahedron has lower face $\{\mathbf a_1,\mathbf a_2,\mathbf a_1+\mathbf a_2\}$ and upper face $\{\mathbf s,\mathbf s+\mathbf a_1,\mathbf s+\mathbf a_2\}+\mathbf a_3/2$, where $\mathbf s=(\mathbf a_1+\mathbf a_2)/3$. A cubic sublattice is generated by

$$
\begin{aligned}
\mathbf u&=-8\mathbf a_1+4\mathbf a_2-3\mathbf a_3,\\
\mathbf v&=-4\mathbf a_1-4\mathbf a_2+3\mathbf a_3,\\
\mathbf w&=-4\mathbf a_1+8\mathbf a_2+3\mathbf a_3,
\end{aligned}
\qquad
\mathbf u\cdot\mathbf u=\mathbf v\cdot\mathbf v=\mathbf w\cdot\mathbf w=72a^2,
\qquad
\mathbf u\cdot\mathbf v=\mathbf u\cdot\mathbf w=\mathbf v\cdot\mathbf w=0.
$$

Thus the eight sums $i\mathbf u+j\mathbf v+k\mathbf w$, with $i,j,k\in\{0,1\}$, form a cube of edge $6\sqrt2a$; multiplying all three generators by any positive integer gives arbitrarily large cubes. These HCP constructions use the ideal ratio $c/a=\sqrt{8/3}$. They do not establish the same embeddings for an independently deformed hexagonal lattice.

The coefficient matrix of $(\mathbf u,\mathbf v,\mathbf w)$ relative to $(\mathbf a_1,\mathbf a_2,\mathbf a_3)$ has determinant $432$ in absolute value. Hence $K=\mathbb Z\mathbf u+\mathbb Z\mathbf v+\mathbb Z\mathbf w$ has index $432$ in the HCP A sublattice. The A sublattice is therefore the disjoint union of $432$ cosets of the simple-cubic lattice $K$, and the shifted B sublattice supplies another $432$. Applying the simple-cubic constructions within each of these $864$ cosets proves that every ideal-HCP site, not merely the sites of one sparse cube, belongs to infinitely many cube, octahedron, and tetrahedron vertex families. The number $864$ records this explicit decomposition; no minimality claim is made.

Plainly: ideal HCP contains large exact examples of all three crystallographically allowed Platonic solids. Its lack of a global fourfold axis does not exclude a sparse cube. The tetrahedral and octahedral constructions likewise repeat at unbounded scales rather than occurring only in the nearest-neighbor packing motif.

The resulting site-coverage statement is separate from the existence table below.

| Point set | Translated simple-cubic cosets used | Is every site a vertex in some cube, octahedron, and tetrahedron family? |
|---|---:|---|
| Simple cubic | 1 | yes |
| Body-centered cubic | 2 | yes |
| Face-centered cubic | 4 | yes |
| Diamond cubic | 8 | yes |
| Ideal hexagonal close packing | 864 in the explicit $K$ decomposition | yes; no minimal coset count is asserted |
| Simple cubic with alternating planes | 1 geometrically | yes; polarity labels are a separate restriction |
| Simple cubic checkerboard | 1 geometrically | yes; polarity labels are a separate restriction |
| Finite simple-cubic 50/50 configuration | not an infinite coset decomposition | not guaranteed after cropping |

Plainly: for every infinite deterministic point set in the table, no site is permanently excluded from all three allowed Platonic vertex families. That is a coverage result obtained by moving the selected solid among translated sublattices. It is not a claim that one nested sequence uses every site, that the solids tile space, or that every site belongs to one common-center shell as a Platonic vertex.

| Point set | Cube | Octahedron | Tetrahedron | Dodecahedron or icosahedron |
|---|---|---|---|---|
| Simple cubic | yes; edge $na$ for every $n\geq1$ | yes; scalable with $n$ | yes; scalable with $n$ | no |
| Body-centered cubic | yes; inherited from the corner simple-cubic sublattice | yes; inherited from the corner sublattice | yes; inherited from the corner sublattice | no |
| Face-centered cubic | yes; inherited from the conventional-cell corner sublattice | yes; edge $ma/\sqrt2$ for every $m\geq1$, plus the corner-sublattice family | yes; edge $ma/\sqrt2$ for every $m\geq1$, plus the corner-sublattice family | no |
| Diamond cubic | yes; inherited from either face-centered cubic sublattice | yes; inherits the FCC $ma/\sqrt2$ ladder | yes; inherits the FCC $ma/\sqrt2$ ladder, plus the local nearest-neighbor tetrahedron | no |
| Ideal hexagonal close packing | yes; edge $6\sqrt2ma$ in the displayed family | yes; edge $6ma$ in the displayed family, in addition to the local packing motif | yes; edge $6ma$ in the displayed family, in addition to the local packing motif | no |
| Simple cubic with alternating planes | geometrically the simple-cubic result; polarity is a separate condition | geometrically the simple-cubic result; polarity is a separate condition | geometrically the simple-cubic result; polarity is a separate condition | no |
| Simple cubic checkerboard | geometrically the simple-cubic result; polarity is a separate condition | geometrically the simple-cubic result; polarity is a separate condition | geometrically the simple-cubic result; polarity is a separate condition | no |
| Finite simple-cubic 50/50 configuration | conditional on the finite crop and any required polarity word; the underlying coordinates are simple cubic | same condition | same condition | no |

The first seven rows are periodic configurations, not seven distinct lattice types; the final row is a finite nonperiodic configuration. The alternating-plane and checkerboard constructions change polarity labels, not occupied positions. Their exact parity effects on the axis-aligned simple-cubic families are stated above; those effects are properties of the polarity-decorated examples, not geometric restrictions on the lattice. Likewise, randomness in a finite 50/50 configuration concerns the polarity assignment. It does not make the underlying simple-cubic vertex geometry probabilistic. A Borel–Cantelli-style “probability one” conclusion is not available for the present finite exact-50/50 sampler: it would first require a declared sequence of growing domains, a compatible probability law across that sequence, and a specified polarity event for each candidate solid.

> Claim grade: derived. The negative icosahedral and dodecahedral result follows from the difference-lattice trace argument above. The positive cube, octahedron, and tetrahedron results follow from the displayed coordinates and the stated sublattice inclusions. The common-center parity rule follows from requiring the coordinates $\mathbf c\pm(na/2)\mathbf e_i$ to remain lattice points, and the shell counts follow from the three displayed level-set definitions. The BCC, FCC, and diamond site-coverage result follows from their displayed two-, four-, and eight-coset decompositions; the ideal-HCP coverage result follows from the orthogonal equal-length generators and their index-$432$ coefficient determinant in each of the two HCP sublattices. Falsifier: an exact icosahedral or dodecahedral vertex set in any listed point set would contradict the obstruction; an unequal asserted edge length, a displayed coordinate outside its claimed lattice, a host-lattice site outside every stated coset, a lattice site belonging to zero or two shells of one shell family, or a shell count differing from the stated polynomial would invalidate the corresponding positive claim.

The uncoloured embedding rows are geometric results only. The polarity-decoration subsection additionally selects and classifies particular polarity words, but neither level specifies a rotation axis or complete path history, establishes delayed acceleration balance for the isolated polyhedron, or shows that any lattice-selected polyhedron is retained under the Master Equation.

Plainly: a large lattice can supply exact vertices for cubes, octahedra, and tetrahedra in every deterministic lattice family listed here, including ideal HCP. It cannot supply exact regular dodecahedral or icosahedral vertex sets. The point set does not choose polarity; the displayed decorations make particular choices, and dynamics remains a separate problem.

### The Discrete Inventory

The search space here is finite, and it is small. Because the point groups are finite and the polarity assignment is discrete, the balanced words on a Platonic vertex set can be enumerated completely, up to the solid's full point group together with global polarity conjugation.

**[measured; exact balanced-word enumeration, no dynamical content]**

| Solid | $V$ | Word | Point group order | Balanced colourings | Inequivalent classes | Antipodal-alternating classes |
|---|---|---|---|---|---|---|
| Tetrahedron | 4 | 2:2 | 24 | 6 | 1 | — (no antipodes) |
| Octahedron | 6 | 3:3 | 48 | 20 | 2 | 1 |
| Cube | 8 | 4:4 | 48 | 70 | 6 | 3 |
| Icosahedron | 12 | 6:6 | 120 | 924 | 14 | 4 |
| Dodecahedron | 20 | 10:10 | 120 | 184756 | 894 | 20 |
| **Total** | | | | | **917** | **28** |

The enumeration gives 917 balanced-colouring classes, of which 28 have opposite polarities at every antipodal pair. These are classes of coloured vertex sets, not 917 complete moving configurations. Their rotation axes and histories remain continuous choices.

On the octahedron, the antipodal-alternating coloured vertex set can be represented as two opposite face triangles of opposite polarity. Rotation about the axis through those face centers then gives the segregated two-ring assignment. This identification includes the chosen axis; the same word with another rotation axis is a different motion prescription.

One of the cube's three antipodal-alternating classes is the tetrahedral pair associated with the stella octangula. Equal-scale `F6c` reproduces that compound at the level of track centers, with $h_+=h_-$, not generally at the level of the moving members. The member identification holds only in the degenerate limit $\rho_+=\rho_-=0$: nonzero transverse radii displace the instantaneous members from those centers. The evaluated `F6b` representative has $h=\rho=0.30$. Its negative is therefore not a result for architrinos occupying cube vertices.

### What Is And Is Not Excluded

**[derived and measured, per row; owned by the cited documents]**

| Solid | Negative on record | Motion class covered | Open |
|---|---|---|---|
| Octahedron | Both balanced word classes fail the stationary condition: the antipodal-alternating class has a receiver magnitude $\sqrt{17}/4$, while the other class has a receiver magnitude $1/4$; the rigid co-rotating segregated assignment is excluded for $h>0$ by a one-signed axial sum | every balanced stationary regular octahedron; rigid co-rotation about the declared face-center axis | moving mixed-polarity rings, other axis-word combinations, and non-rigid histories |
| Cube | **no** | — | everything |
| Tetrahedron | **no** | — | everything; the 2:2 transient remains unreproduced |
| Icosahedron | **no** | — | everything, including whether any Family-C history is icosahedral |
| Dodecahedron | **no** | — | everything |

**[derived; exclusion scope]** For the declared face-center rotation axis, the octahedral vertices form two triangular rings at $\pm h$. Assigning one polarity to each ring gives the excluded segregated word. Mixed-polarity assignments on those rings are not covered by that sign argument. The two colouring classes in the enumeration quotient vertex sets by the full point group; classifying moving histories additionally requires the axis and history, so a result for one axis-word pair must not be extended to an entire motion family.

The stationary analysis now exhausts the two balanced polarity classes on the regular octahedron. It does not classify deformed six-point geometries or transfer to a moving history.

The cited analyses provide no moving-history balance result for the other four solids. The enumeration does not fill that gap.

### Moving-History Balance

A balance calculation must evaluate the prescribed worldlines, including their internal motion and complete causal roots.

The fixed-point-cloud common-mode residual has the different ansatz $\mathbf X_i(T)=\mathbf R_i+\mathbf UT$ for every member: one common constant velocity, zero internal velocity relative to the group center, and constant pair distances. Sampling an orbit at frozen phases while discarding its internal velocities does not evaluate that orbit's history and supplies no necessary condition for its balance.

An orbiting shared-sphere history has nonzero internal velocities. Rigid co-rotation preserves pair distances, but it still changes the source emission positions relative to a frozen point cloud. More general spherical histories can also change pair distances. Applying the frozen-translation criterion to a snapshot therefore answers a different question and supplies no necessary balance condition for the orbiting history.

Plainly: a delayed interaction depends on where a source was when it emitted the wake. A still picture of an orbit cannot replace that history.

**[derived; conditional symmetry reduction]** If a second-rank residual tensor is constructed equivariantly from the complete motion record, its symmetry is constrained by the stabilizer of that record. An irreducible three-dimensional symmetry action can force an invariant tensor to be scalar. This reduces the balance question but does not answer it: a scalar residual can vanish without a geometrically degenerate configuration. An exclusion requires a separate proof that the relevant scalar cannot vanish. The polarity word, rotation axis, and history must all be included when identifying the stabilizer.

Plainly: symmetry can make several residual components equal. It does not, by itself, prove that their common value is nonzero.

The [Platonic Moving-History Reduction](platonic-moving-history-reduction.md) makes this principle exact for the octahedron. It defines the coloured complete-history stabilizer using the axial-vector action on angular velocity, proves the residual equivariance theorem, enumerates every special rotation-axis stratum for both balanced words, and derives the exact number of independent scalar residual channels. For rigid histories with every member below $c_f=1$, it also proves one and only one partner root per ordered pair, no nontrivial self-hit root, a positive transmitter-side Jacobian floor, collision clearance $\sqrt2R$, and sufficient prehistory depth $2R$.

Plainly: the octahedral moving problem is no longer an unspecified search over six vector equations. Each word and axis now has an exact reduced channel count and a complete root ledger; the remaining task is to determine whether the reduced scalar equations have a zero.

### Enumeration Method

The exact balanced-word enumeration instrument constructs each solid at unit circumradius in algebraic coordinates, derives the orthogonal maps preserving its vertex set, and groups balanced colourings under those maps together with global polarity conjugation. It reports one representative per class and identifies the antipodal-alternating classes. This establishes a discrete classification only; it evaluates no delayed acceleration or motion.

## Terminology

A balanced polarity word assigns equal numbers of the two polarities to the member sites. Its use on a sphere does not convert shared-circle $N{:}N$ labels into braid-taxonomy names. A shared-sphere assembly is also distinct from a spherical envelope in the envelope-aspect-ratio sense, $\xi=1$, and from the reserved absolute-frame use of “concentric.” The relevant geometric antecedents are the common sphere in [A2 symmetry and return response](../../../content/markdown/aaa/noether-braid/braid-a2-symmetry-and-return-response.md) and the orbit spherical envelope in [F6c geometry](f6c-geometry.md).

## Open Mathematical Questions

### Complete balance on moving histories

The full residual must include every cross-transmitter causal root and every nontrivial same-transmitter root in the declared history domain. The rigid sub-field-speed octahedral chart now has a complete thirty-partner-root ledger and no nontrivial self roots, as derived in the moving-history reduction packet. Latitude-dependent speeds can give different root and fold structures for non-rigid members. The shared-circle scalar reduction and the frozen-point-cloud criterion cannot be assumed to apply. The two-ring sign exclusion remains valid within its stated simple-root assumptions without a complete numerical balance calculation.

### Collision clearance and latitude structure

Distinct fixed latitudes prevent coordinate coincidence between their circles, but a usable history requires a positive clearance bound over its declared interval. Members sharing one latitude inherit the same-circle phase and circulation restrictions. Latitude drift, radial breathing, and sector-dependent motion require new clearance bounds rather than an inference from equal distances to the center.

The two-latitude `C5`/`C6` geometry requires explicit coordinates, admissible mixed-polarity words, and complete axial and transverse residual equations. Three or more latitude rings permit contributions from above and below a receiver to oppose each other; this possibility is not a proof of cancellation. Independent ring cadences similarly open additional histories without establishing balance.

### Polyhedral motion and symmetry

The stationary octahedral exclusion now covers both balanced word classes. The rigid-axis census also closes every special symmetry stratum and the continuous generic stratum at the level of equation reduction, but only the monochromatic-face rigid history has a dynamical sign exclusion. The remaining mixed-polarity and generic-axis scalar systems, together with non-rigid histories, remain separate questions. The tetrahedral, cubic, icosahedral, and dodecahedral word classes have no moving-history result in the cited inventory. Any complete moving claim must cover both the finite colouring classes and the declared continuous motion parameters.

### Nonplanar co-sphericity

A general nonplanar obstruction would have to follow from the Master Equation and explicitly distinguish its domain from the known planar shared-circle subset. Conversely, one independently verified nonplanar co-spherical balance would refute a universal obstruction in that domain. Neither the current exclusions nor the coincidence between polyhedral vertex counts and braid inventories settles this question.
