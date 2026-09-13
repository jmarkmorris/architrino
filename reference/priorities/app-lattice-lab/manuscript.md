# Architrino Lattice Lab: Geometry, Stationary Cancellation, and Finite Ledgers

## 1. What the laboratory explains

Architrino Lattice Lab is a geometry-first educational explorer of declared electrino and positrino arrangements. Its central question is precise: when a specified stationary arrangement is evaluated with a stated acceleration kernel and calculation boundary, which contributions cancel? The answer depends on the geometry, polarity assignment, retained history and summation convention. A symmetric picture or an equal red/blue population supplies only part of that information.

The retained materials distinguish three kinds of result. A geometric view identifies sites, neighbors, repeated cells and polarity patterns. A finite calculation sums an explicitly bounded set of source contributions for one receiver. A periodic certificate proves a statement about every receiver of a declared infinite repeating pattern under a specified exhaustion. None of these establishes later motion, perturbative stability, binding, energy conservation or a physical Noether sea. The app remains a static educational display, with its implementation and verification descriptions attributed to the retained contracts and audits rather than a fresh runtime examination.

### 1.1. The held-history experiment

The mathematical reference case holds every site fixed, with zero velocity, throughout the entire past through a common release time. It then asks for acceleration at release. Stationary histories simplify the causal-root problem: a distinct stationary partner contributes at the unique emission time separated from reception by its wake-travel delay. A coincident same-site endpoint is excluded rather than added as a self contribution.

Zero velocity is part of the initial condition. Zero acceleration, when proved, is a further statement about that instant and the declared history. It does not decide what happens after a displacement, defect, changed history or later evolution. A future dynamics calculation would need its own accepted history representation, complete causal-root accounting and evolution authority.

### 1.2. Three boundaries that must remain distinct

The main spherical crop determines which markers a learner sees. A polarity-preserving repeat cell identifies unique representatives of the infinite decorated pattern. The calculation boundary identifies which source rows are summed and in what limiting convention. These can be different objects in the same view. For a periodic case, the crop supplies no acceleration rows merely because a site is visible; the certificate applies to the complete declared repeat. For the finite Random case, the declared finite site inventory is the calculation domain, and every other member enters the selected receiver's ledger exactly once.

Camera rotation, visibility filters, marker aggregation and relationship highlighting change presentation. They do not change the underlying source inventory, polarity, retained history or evidence grade. This separation lets the interface explain a result without making its pixels an additional scientific instrument.

## 2. Lattices, polarity patterns, and local geometry

### 2.1. The point set and its decoration

A lattice description specifies occupied positions. A polarity rule assigns electrino or positrino labels to those positions. The same point geometry can carry several polarity patterns: simple-cubic checkerboard and alternating planes share their point set but differ in which neighbors have matching polarity. Conversely, a cell selected to repeat both positions and colors can be larger or differently oriented than a geometry-only cell.

In the retained gallery, simple cubic has six nearest neighbors; body-centered cubic (BCC) has eight along body-diagonal directions; face-centered cubic (FCC) and ideal hexagonal close-packed (HCP) have twelve; and diamond cubic has four in tetrahedral coordination. BCC uses corner and body-center populations, diamond combines two displaced FCC populations, and HCP distinguishes its ABAB layer sequence from FCC's ABCABC stacking. These crystallographic descriptions are geometric comparisons. Chemistry analogies formerly used to introduce BCC and diamond were removed from the learner interface; they do not identify these architrino cases with ordinary materials.

The gallery's two polarities are displayed as red positrinos and blue electrinos. Equal counts are a declared population property of the represented cases, not a cancellation theorem. For example, assigning equal populations randomly need not place equally weighted opposite acceleration contributions around a receiver. FCC's triangular nearest-neighbor loops also prevent a two-color pattern from making every nearest pair opposite in polarity; repeating a coloring does not erase that local constraint.

### 2.2. Spacing, shells, and density

Let $d>0$ denote the undeformed nearest-neighbor spacing. The retained geometry table gives the following local reference data. Its density is a site count per geometric volume, not mass density or a constitutive property of a medium.

| Geometry | Nearest shell | Next local shell | Two-shell total | Site density |
| --- | --- | --- | ---: | --- |
| Simple cubic, either listed periodic coloring | 6 at $d$ | 12 at $\sqrt2d$ | 18 | $1/d^3$ |
| BCC | 8 at $d$ | 6 at $2d/\sqrt3$ | 14 | $3\sqrt3/(4d^3)$ |
| FCC | 12 at $d$ | 6 at $\sqrt2d$ | 18 | $\sqrt2/d^3$ |
| Ideal HCP | 12 at $d$ | 6 at $\sqrt2d$ | 18 | $\sqrt2/d^3$ |
| Diamond cubic | 4 at $d$ | 12 at $4d/\sqrt6$ | 16 | $3\sqrt3/(8d^3)$ |

The HCP entry uses the source's ideal close-packed height ratio. For a periodic equal-population decoration, each polarity has half the total geometric density. All these densities scale as the inverse cube of uniform spacing. The listed two-shell totals remain local counts; neither two shells nor the number of sites inside the display sphere covers an infinite pattern.

A geometric neighbor relationship is not a bond, wake path or acceleration vector. In the accepted deformation design, relationship identities come from the undeformed canonical nearest-neighbor set. Deformation changes their lengths while preserving their identities. Consequently those transformed relationships need not all remain at the current shortest distance. The older shortest-distance filtering approach is historical support, not the accepted identity-preservation rule.

### 2.3. Owning a site once

A fundamental translation tile owns each actual site once under a half-open boundary convention. Translated image markers provide context; they are not additional architrinos. The retained repeat-capable gallery uses two owned sites per polarity-preserving tile. The three translation vectors must reproduce both occupied geometry and polarity, including the skew HCP cell. Camera orbit is visual inspection and is never a tiling operation.

Several counts can coexist without measuring the same thing: directed neighbor incidences at owned sites, unique undirected edges, the induced graph of displayed context sites, and endpoint-group relationships after aggregation. The BCC audit illustrates the distinction. Two owned sites each have eight nearest incidences, giving sixteen directed incidences but fifteen unique owned-incident segments because their in-tile relationship is shared. A larger displayed context has additional induced edges. Its longer same-polarity square-perimeter relationships belong to the next shell and must not be inserted into the nearest graph to make the image look complete.

The presentation contract permits a translated colored sphere only when its displayed context has an honest induced nearest-neighbor network. A boundary continuation marker can indicate an unrepresented endpoint without pretending to be another fully shown site. Ownership, translated context and continuation remain distinct even when ordinary markers share the same appearance.

## 3. Exact cancellation for the stationary checkerboard

### 3.1. Sites, roots, and the acceleration row

The [checkerboard certificate](analysis/simple-cubic-checkerboard-cancellation-certificate.md) fixes integer-indexed sites, parity-alternating polarity, equal polarity magnitude $\epsilon$, and normalized wake speed $c_f=1$. Let $L_{j,\lambda}$ multiply one coordinate axis $j$ by a positive factor $0<\lambda\leq1$ while leaving the other coordinates unchanged. The complete held history is

$$
\mathbf X_{\mathbf g}(T)=dL_{j,\lambda}\mathbf g,
\qquad \mathbf g\in\mathbb Z^3,
\qquad \mathbf V_{\mathbf g}(T)=\mathbf0.
$$

An even sum of site indices denotes one polarity and an odd sum the other. For receiver $\mathbf g$ and distinct transmitter $\mathbf g+\mathbf n$, the delay is its transformed separation. At release time $T_r$,

$$
T_t=T_r-d\|L_{j,\lambda}\mathbf n\|,
\qquad \mathbf n\ne\mathbf0.
$$

The stationary transmitter factor is $D_t=1$, and the acceleration weight is $W^{\mathrm{acc}}=1$. No positive-delay stationary same-site root is present. With the transmitter-to-receiver line-of-action convention, define

$$
a_0=\frac{\kappa\epsilon^2}{d^2},
\qquad \sigma(\mathbf n)=(-1)^{n_x+n_y+n_z},
\qquad
\frac{\mathbf A_{\mathbf n}}{a_0}
=-\sigma(\mathbf n)\frac{L_{j,\lambda}\mathbf n}{\|L_{j,\lambda}\mathbf n\|^3}.
$$

The sign records relative polarity, while the transformed vector and its norm supply direction and inverse-square magnitude. The positive scale factor excludes degeneracy: this statement does not admit a collapse to zero separation along an axis.

### 3.2. Pair cancellation and the infinite boundary

Negating an integer offset preserves its parity. Linearity reverses the transformed displacement and preserves its norm under negation. Thus the two partners have equal polarity relationship, delay, weight and magnitude, with opposite acceleration vectors:

$$
\sigma(-\mathbf n)=\sigma(\mathbf n),
\qquad L_{j,\lambda}(-\mathbf n)=-L_{j,\lambda}\mathbf n,
\qquad \mathbf A_{-\mathbf n}=-\mathbf A_{\mathbf n}.
$$

For every finite receiver-centered offset set $E$ containing complete opposite pairs and excluding the origin,

$$
E=-E,\quad \mathbf0\notin E
\quad\Longrightarrow\quad
\sum_{\mathbf n\in E}\mathbf A_{\mathbf n}=\mathbf0.
$$

An increasing exhaustion of the infinite repeat by such sets has zero sum at every stage and therefore zero in that declared limit. Since the argument uses offsets relative to an arbitrary receiver, it covers every receiver. The exhaustion is part of the theorem. It is not a claim of absolute convergence, arbitrary summation order or independence from the boundary prescription.

### 3.3. What the displayed shells establish

For an electrino receiver, the six members of the undeformed nearest shell are positrinos and form three cancelling pairs. Under one-axis scaling, two are at $\lambda d$ and four at $d$. The twelve members of the undeformed next shell are electrinos: eight have distance $d\sqrt{1+\lambda^2}$ and four remain at $\sqrt2d$. Their six pairs cancel separately. These eighteen rows are explanatory examples of the generative argument; they do not prove the remaining infinite ledger by numerical extrapolation.

The source names two distinct verification routes. A structural verifier reconstructs parity, transformed geometry, root delays and rows, including a deliberately corrupted numerator. A pre-existing high-precision EOM reference kernel independently reconstructs stationary histories and contributions without importing the app's JavaScript ledger. Their retained results support the source's implementation checks at their recorded receiver, cutoff, axis and factor coverage. They were not rerun for this manuscript, and agreement does not enlarge the theorem into a stability or evolution result.

## 4. Cancellation through complete symmetry groups

### 4.1. Why a whole orbit can replace an opposite pair

The [periodic gallery certificates](analysis/periodic-gallery-cancellation-certificates.md) generalize the pairing idea. Write a receiver-centered offset in units of $d$ as $\mathbf r\ne\mathbf0$, and let the app's static deformation be

$$
D_\beta=\operatorname{diag}(1-0.99\beta,1,1),
\qquad 0\leq\beta\leq1.
$$

With stationary histories and relative polarity $\sigma=1$ for matching polarity and $\sigma=-1$ for opposite polarity, the normalized row is

$$
\frac{\mathbf A(\mathbf r)}{a_0}
=-\sigma\frac{D_\beta\mathbf r}{\|D_\beta\mathbf r\|^3}.
$$

Consider a finite orthogonal group $G$ of the receiver-centered decorated lattice. Its members must preserve the translation lattice and relative polarity, commute with $D_\beta$, and have no common fixed vector other than zero. These are mathematical requirements on each case and receiver class, not consequences of its familiar shape name.

A complete source orbit $O$ contains every image of a source offset under the group. Orthogonality and commutation preserve the denominator, and polarity preservation gives equivariance of the acceleration row. Applying any group member merely permutes the rows, so

$$
g\!\sum_{\mathbf r\in O}\mathbf A(\mathbf r)
=\sum_{\mathbf r\in O}\mathbf A(\mathbf r)
\qquad(g\in G).
$$

The orbit sum lies in the common fixed-vector space and must therefore vanish. Every finite union of complete orbits has zero sum. An increasing exhaustion covering all source sites gives zero under that prescribed limit. Missing orbits, broken polarity preservation, noncommuting deformation or a surviving fixed direction invalidate the corresponding conclusion.

### 4.2. Case-specific reach

The retained packet names two inequivalent receiver classes for each of its five additional periodic cases. Its case constructions and verification assertions support the following conditional reach:

| Case | Cancellation group | Static X-deformation reach |
| --- | --- | --- |
| BCC | Identity and receiver-centered inversion | Entire supported range |
| FCC alternating planes | Identity and receiver-centered inversion | Entire supported range |
| Simple-cubic alternating planes | Identity and receiver-centered inversion | Entire supported range |
| Diamond cubic | Identity and the three orthogonal twofold rotations about X, Y and Z | Entire supported range |
| HCP ABAB | Threefold rotation about Z together with reflection across the basal plane | Undeformed baseline only |

For the inversion cases, opposite offsets carry the same relative polarity and cancel. Diamond's four-member rotation group has no nonzero common fixed vector and commutes with the diagonal X scaling. The source's independent gallery verifier reconstructs the group conditions, both receiver classes and local rows, and includes corrupted-symmetry and corrupted-row negative controls. Its recorded checks concern those constructions and samples, not a proof for every conceivable coloring on the same point set.

### 4.3. The deformed-HCP boundary

At the undeformed HCP baseline, the threefold rotation and basal reflection remove every possible invariant vector component. A nontrivial X scaling does not commute with that rotation. The source reports that the remaining commuting symmetries leave one in-plane component unconstrained. The existing certificate therefore fails to prove zero when $\beta>0$.

Failure of this proof is not a proof of nonzero acceleration. The deformed HCP result remains not established. Its display may retain geometric shell descriptions, but it must suppress the zero outcome, residual and calculation disclosure. Neither a visually planar endpoint nor equal polarity counts repairs the missing all-space argument. A stronger result would need its own complete periodic accounting, exhaustion rule, receiver coverage and independent verification.

The retained certificates and final reconciliation audit already describe bounded periodic results, while the live queue still contains a broader unclosed periodic-proof object. These are separate facts: a manuscript can explain the existing theorem without declaring that every implementation and acceptance obligation in that object is complete.

## 5. The finite Random 50/50 calculation

### 5.1. Population and source domain

The [finite Random contract](contracts/random-finite-configuration-contract.md) declares 88 simple-cubic sites within the case's spherical radius of $2.75d$, with exactly 44 positrinos and 44 electrinos. This is its retained case inventory, not a new count reconstructed from an assumed crop center. A selected receiver sums contributions from the other 87 sites exactly once. The residual is a dimensionless stationary acceleration vector and magnitude for that finite configuration.

Unlike the deterministic periodic cases, Random has no polarity-preserving repeat-panel claim or all-space certificate. Its unpolarized companion can still illustrate conventional simple-cubic geometry. That geometry does not make its finite polarity assignment periodic. Presentation filters must not silently remove calculation rows, and an old aggregate value must not override the sum of the included rows.

### 5.2. Reproducible assignments

The contract uses a recorded unsigned 32-bit seed and stable site identifiers. It first orders identifiers by direct UTF-16 code-unit comparison, assigns each ordinal a deterministic SplitMix32 score, and ranks sites by unsigned score with ordinal tie-breaking. The first 44 receive one polarity and the remaining 44 the other. A deterministic score is a device for reproducible assignment; it is not evidence of a physical random process or a demonstrated statistical sampling law.

The exact integer operations, versioned algorithm identifier, default seed and fingerprint fields remain in the focused contract. Recalculation selects the smallest succeeding unsigned seed whose assignment fingerprint differs from the current one. The button therefore has to produce a changed recorded assignment rather than only repainting the same sites. The retained audit records a changed seed, fingerprint, target polarity and residual while finite scope remained unchanged. These are source-time verification observations, not newly executed trials.

### 5.3. Reading a nonzero residual

A nonzero finite residual means nonzero initial acceleration under the declared stationary finite ledger. It does not diagnose instability, predict a trajectory or measure energy. Equal populations alone do not imply a zero residual because the vector contributions also depend on positions and receiver-relative polarity.

The source's separately authored verifier reconstructs both assignment and finite summation; focused tests pin known fingerprints and require recalculation to change assignment. Their falsifiers include duplicate or omitted sites, wrong 44/44 counts, inconsistent provenance, unchanged recalculation and disagreement with the independent finite residual. The app's finite zero/nonzero presentation also has to derive its result from included rows rather than stale stored totals. The retained nonzero example supplies no probability estimate for cancellation across other seeds.

## 6. Showing geometry without changing its meaning

### 6.1. Static deformation and endpoint aggregation

The visible control is Uniaxial Deformation. Its parameter $\beta$ is neither velocity nor a Lorentz quantity: zero is the undeformed case, and one is the maximum supported nondegenerate endpoint. The coordinate map changes semantic X from scale one to 0.01 while preserving semantic Y and Z. The miniature keeps its undeformed display-fit scale so reframing cannot imitate an additional deformation. Markers remain fixed in screen size while positions and relationship lengths change.

Exactly at the endpoint, the display groups markers whose true transformed positions are visually coincident under the declared marker-diameter threshold. The grouped marker is purple, but its metadata retains every original site and polarity. Internal group edges disappear from presentation and duplicate external group-pair links collapse to one visible relationship. The source identities and calculation rows remain intact. Below the endpoint, including immediately below it, ordinary markers and relationships return. Purple is a presentation color, not a third species or an acceleration result.

The HCP endpoint audit makes these distinctions concrete. At its recorded viewport, 116 main-view identities formed 30 groups. The 509 canonical main edges were partitioned into 86 internal edges, 71 distinct external representatives and 352 redundant external identities. The repeat view partitioned 63 canonical links into 10 internal, 19 distinct external and 34 redundant links. These are counts at different stages of a presentation mapping, not competing inventories of physical particles. All HCP endpoint acceleration claims remained not established.

### 6.2. Projection, size, and orientation

The retained design uses fixed-size solid spheres, orthographic projection, drag rotation and wheel zoom. Equal world-space edges can have different projected lengths because the screen sees only two components of the rotated displacement. Depth does not itself rescale an orthographic image. Marker clipping shortens visible segments at sphere surfaces without altering center-to-center geometry. The Diamond audit separates its four nearest neighbors from its longer next shell and attributes apparent edge-length differences to projection under the declared camera.

The main view, polarity repeat, unpolarized companion and orientation key share a trackball quaternion. The default presents semantic +Z upward, with spherical-envelope caps authored on semantic ±Z. Arbitrary subsequent rotation can tilt Y and introduce roll; no model axis is relabeled. The lower-left key represents centered, equal-scale positive and negative unit axes rather than an extra circle or enclosing cube. A lower-right accessible legend retains red Positrino above blue Electrino with the same marker-size and lighting treatment as the corresponding canvas sites.

### 6.3. Relationship highlighting and context

The default-off repeat-cell highlight affects the main view. Enabling it retains unselected ordinary relationships while replacing the ordinary segments for selected identities with violet emphasis. The selected set must equal the suppressed ordinary set, so a thin ordinary stroke cannot remain through a highlighted edge. At an aggregated endpoint, highlights follow actual external group-pair representatives rather than invented radial lines, halos or duplicate circles.

The main spherical envelope remains a viewing crop. Its retained radius is $2.75d$, while the camera framing scales proportionally to keep the envelope's apparent diameter consistent. Source audits record specific inventories and screen measurements for their named snapshots. Those counts should not be pooled across different crops, identity classes or display states. Reframing, context markers and highlighting have no power to change periodic calculation scope.

## 7. The interface as an explanation of evidence

### 7.1. A result-first Ledger

When a calculation exists, the Ledger presents one outcome, a normalized magnitude and vector, a concise scope sentence and two local shell examples before its Show calculation disclosure. The local examples explain arithmetic; the declared certificate carries a periodic all-site conclusion. A finite result names its finite scope. A not-established state presents a calm explanation and optional geometric shells without an outcome icon, residual, unavailable-value rows or calculation disclosure.

Selection identifies the receiver and polarity without exposing raw coordinates in the first view. Changing selection does not change a certificate's scope unless the underlying calculation scope changes. Random recalculation is case-specific, has an accessible name describing the action, and leaves deterministic cases without that control. Provenance fields remain in the underlying record rather than the explanatory panels.

The current retained presentation places case-specific geometry under the selected case's accessible title, common population/crop/line conventions in Shared Display Conventions, repeat ownership in How This Pattern Repeats, and outcomes in the Ledger. The finite versus periodic method remains available in the expanded calculation. HCP's deformed-proof limitation is a necessary exception to otherwise shared deformation copy. Exact typography, accessible labels, selection cues and surviving copy are preserved in the supporting contracts and audit map.

### 7.2. What the removal audits preserve

Earlier designs included a Lattice Primer, an overview card, named camera presets and several additional explanatory labels. The later accepted presentation removed those surfaces. The eighteen-paragraph Primer audit assigns their geometry and authority content to surviving owners, while repeated density statements, chemistry analogies and duplicated disclaimers were dropped rather than moved into another overview. Random was introduced after the Primer removal and never had those paragraphs.

A source requirements packet can preserve an earlier design alongside later amendments. Its presence is not proof that every proposed control exists. The retained history separates initial implementation, later presentation changes, verification-only reconciliation and superseded requests. This manuscript follows that distinction: it explains the accepted roles while retaining exact earlier requirements and outcomes as historical supporting material.

## 8. Regular polyhedra with two vertex polarities

### 8.1. Embedding, repetition, and permitted contacts

A polyhedron in this chapter is the convex hull of a finite set of vertices in the Euclidean void. An electrino or positrino labels each occupied vertex; the edges and enclosed volume are geometric constructions, not material struts or solid architrino interiors. The results below are derived geometry under the stated coordinate and coloring rules. They establish neither an assembly history nor stationary acceleration cancellation.

Three questions have different answers. An **embedding** places every vertex on a specified point set. A **periodic packing** repeats polyhedra in three independent translation directions with disjoint interiors, allowing gaps. A **honeycomb** additionally fills all space without gaps. A periodic packing of polyhedra need not have all its vertices on a single Bravais lattice: its translation lattice can carry a finite basis of vertex positions.

The stacking scope excludes a vertex of one selected polyhedron lying strictly inside another. Write $V(P)$ for the vertices of polyhedron $P$, and $\operatorname{int}Q$ for the interior of $Q$. The literal exclusion is

$$
V(P)\cap\operatorname{int}Q=\varnothing
\qquad\text{for every ordered pair }P\ne Q.
$$

This test alone does not exclude crossing polyhedra whose vertices all remain outside one another. Therefore each construction described here as a packing also proves $\operatorname{int}P\cap\operatorname{int}Q=\varnothing$. The two requested cases are then $V(P)\cap V(Q)\ne\varnothing$ for common vertices and $V(P)\cap V(Q)=\varnothing$ for no common vertices. Face and edge sharing can include common vertices; contact alone does not necessarily do so. The separated examples below have a positive gap, avoiding that ambiguity.

An unused ambient lattice site is a separate accounting issue. A tiling can have extra ambient sites inside its cells even though no vertex of another selected cell enters them. Such sites must remain disclosed. If every occupied site must be a selected polyhedron vertex, the stronger requirement is that the ambient inventory equal the union of cell vertices. The primary examples below either satisfy this stronger requirement or explicitly identify their unused sites.

#### 8.1.1. Why there are five Platonic solids

The names tetrahedron, octahedron, dodecahedron, and icosahedron count faces, whereas a vertex-population model counts occupied corners. An octahedron therefore has eight faces but six possible occupied vertices. The relation between these counts follows from one geometric argument for the entire Platonic class.

Assume a closed convex polyhedron whose faces are congruent regular polygons and whose vertices all meet the same number of faces. A regular polygon has equal sides and equal interior angles. Faces are the actual planar facets of the convex body, with no artificial subdivisions or flat extra vertices. Let $v$ be the number of vertices, $E$ the number of edges, $F$ the number of faces, $p\geq3$ the sides per face, and $q\geq3$ the faces meeting at each vertex. Exactly $q$ edges also meet at that vertex. Identical faces alone do not impose this common vertex arrangement: a hexagonal bipyramid has six triangular faces meeting at each tip and four at each equatorial vertex.

The first restriction comes from forming a convex corner. Dividing a regular $p$-gon into $p-2$ triangles gives its total interior angle $(p-2)\pi$, so each face contributes angle $\alpha=(p-2)\pi/p$ at a vertex. The $q$ incident face angles must leave a positive angular deficit, meaning the amount missing from a full turn. If they filled the turn exactly, they would not form a positively curved convex corner. Thus

$$
\delta=2\pi-q\alpha
=2\pi-q\frac{(p-2)\pi}{p}>0,
\qquad
\frac1p+\frac1q>\frac12.
$$

Here $\delta$ is the angular deficit at each vertex. Since $p$ and $q$ are integers at least three, the inequality permits only five pairs. If both were at least four, the reciprocal sum would be at most $1/2$. One must therefore be three, and substituting three forces the other to be less than six. The complete candidate list is $(3,3)$, $(3,4)$, $(4,3)$, $(3,5)$, and $(5,3)$. Each is realized by one of the five Platonic solids in the table below; the angular argument excludes all additional pairs under the stated assumptions.

The second restriction counts edges consistently across the closed surface. Counting through vertices counts each edge twice, once at each endpoint. Counting through faces also counts it twice, once from each adjacent face. Consequently

$$
qv=2E=pF.
$$

Convexity makes the surface topologically a sphere, so Euler's relation is $v-E+F=2$. One way to see the count is to project the edge graph onto a plane, with one face becoming the exterior region. Remove edges on cycles until a spanning tree remains. Each removal reduces both the edge count and the face-region count by one, preserving $v-E+F$. The final tree has $v-1$ edges and one exterior region, giving two. Substituting the two edge counts therefore yields

$$
v\left(1-\frac q2+\frac qp\right)=2,
\qquad
v=\frac{4p}{2p+2q-pq},
\qquad
F=\frac{4q}{2p+2q-pq}=\frac qp\,v.
$$

These are one set of formulas for all five solids. The denominator is positive by the convex-corner inequality. The same argument has a geometric interpretation: substituting $\delta$ above gives $v\delta=4\pi$. The complete surface has a fixed total angular deficit, distributed equally across its vertices. Changing the face shape or the number of faces at each corner changes that deficit and therefore changes the allowed vertex count.

| Solid | Sides per face $p$ | Faces per vertex $q$ | Vertices $v$ | Edges $E$ | Faces $F$ | Equal vertex populations |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Tetrahedron | 3 | 3 | 4 | 6 | 4 | 2 / 2 |
| Octahedron | 3 | 4 | 6 | 12 | 8 | 3 / 3 |
| Cube | 4 | 3 | 8 | 12 | 6 | 4 / 4 |
| Icosahedron | 3 | 5 | 12 | 30 | 20 | 6 / 6 |
| Dodecahedron | 5 | 3 | 20 | 30 | 12 | 10 / 10 |

Within this class, the vertex count identifies the face count because the five permitted pairs give five distinct values of $v$. For six vertices, the unique permitted pair is $(p,q)=(3,4)$, so $F=(4/3)6=8$. Without the prerequisites, the classification does not apply; specifying only a vertex count or identical faces does not restore it.

Exchanging $p$ and $q$ exchanges $v$ and $F$ while preserving $E$. This is the counting signature of duality: joining face centers across adjacent faces constructs the dual Platonic solid. Cube and octahedron are duals, dodecahedron and icosahedron are duals, and the tetrahedron is its own dual. Every resulting vertex count is even, permitting the equal electrino/positrino assignments examined in §8.4. The derivation is geometric; it supplies no conclusion about how the polarities arrange themselves or whether a given assignment has zero acceleration.

### 8.2. What crystallographic symmetry does and does not forbid

The crystallographic restriction concerns rotations preserving an entire periodic lattice, not every finite motif repeated within it. A motif can possess fivefold symmetry even when its translation pattern does not. This distinction is stated in Wondratschek's [IUCr treatment of crystallographic symmetry](https://www.iucr.org/what-we-do/education/pamphlets/matrices-mappings-and-crystallographic-symmetry). Consequently regular dodecahedra and icosahedra are not excluded from periodic packings; periodic packing constructions are also studied directly by [Torquato and Jiao](https://arxiv.org/abs/0909.0940).

There is nevertheless an exact obstruction to placing their vertices on the cubic point sets considered here. Simple cubic, BCC, FCC, and diamond cubic all have rational Cartesian coordinates in units of a conventional cubic edge $a$. Ratios of nonzero squared distances between their sites are therefore rational. In a regular pentagon, the diagonal-to-edge squared ratio is $\varphi^2=(3+\sqrt5)/2$, where $\varphi=(1+\sqrt5)/2$ is the golden ratio. Every regular dodecahedron contains such a face. The five neighbors of an icosahedron vertex likewise form a regular pentagon. Both solids therefore require an irrational squared-distance ratio and cannot have all their vertices on any of these four point sets, at any scale or orientation. This is a derived metric obstruction, independent of the shape's orientation.

The same argument applies to ideal HCP. With basal vectors $\mathbf u=a(1,0,0)$, $\mathbf v=a(1/2,\sqrt3/2,0)$ and vertical vector $\mathbf w=a(0,0,\sqrt{8/3})$, the matrix of their dot products divided by $a^2$ has rational entries. HCP sites have rational coefficients in this basis, so all squared-distance ratios remain rational. This proof covers ideal HCP and other declared rational squared height ratios; it is not an exclusion theorem for every adjustable hexagonal metric.

### 8.3. Exact scale families on cubic and hexagonal point sets

Let $a>0$ be the conventional cubic edge and $n$ a positive integer. The following site sets in $a\mathbb Z^3$ give direct regularity witnesses:

| Solid | Vertices, in units of $a$ | Edge length | Reason |
| --- | --- | --- | --- |
| Cube | $(i,j,k)$ with each coordinate in $\{0,n\}$ | $na$ | Three equal orthogonal edge directions |
| Octahedron | $(\pm n,0,0),(0,\pm n,0),(0,0,\pm n)$ | $\sqrt2na$ | Six axial vertices; all nonopposite pairs have that distance |
| Tetrahedron | $(0,0,0),(n,n,0),(n,0,n),(0,n,n)$ | $\sqrt2na$ | All six pair distances agree |

These are separate embeddings. Increasing $n$ does not produce an admissible stack of nested copies, and the listed cube, octahedron, and tetrahedron do not have a common center as written. They can be translated for comparison without changing regularity.

BCC is the union of $a\mathbb Z^3$ and its shift by $a(1/2,1/2,1/2)$. FCC is the union of four cubic cosets with offsets $a(0,0,0)$, $a(0,1/2,1/2)$, $a(1/2,0,1/2)$, and $a(1/2,1/2,0)$. Diamond adds a copy of those four cosets shifted by $a(1/4,1/4,1/4)$. Translating the table onto each coset supplies all three shape families at every integer $n$. This proves geometric availability; it does not prove mixed polarity, use of every site in one packing, or empty interiors relative to the ambient inventory.

The smaller families in a Bravais lattice also have an integer ladder. If vertices $\mathbf X_j$ belong to a Bravais lattice and $\mathbf X_0$ is one of them, then

$$
\mathbf X_j^{(n)}=\mathbf X_0+n(\mathbf X_j-\mathbf X_0)
$$

belongs to that lattice for every integer $n\geq1$, since vertex differences are lattice vectors. The map multiplies every length by $n$ and preserves regularity. Thus any exact BCC or FCC seed, including an FCC octahedron of edge $a/\sqrt2$, has an unbroken integer ladder about a lattice vertex. Scaling about an empty geometric center instead can impose additional congruence conditions.

For a point set with a basis, a sufficient replacement is equally explicit. If all basis coordinates relative to translation vectors have denominator dividing $m$, scaling about a translation-lattice origin by $n\equiv1\pmod m$ preserves every basis coset. Diamond therefore admits this construction for $n\equiv1\pmod4$. For HCP written as $\Lambda\cup(\Lambda+\mathbf b)$ with $\mathbf b=(\mathbf u+\mathbf v)/3+\mathbf w/2$, $n\equiv1\pmod6$ suffices. These are sufficient scale subsequences, not classifications of every possible scale.

At the ideal HCP height ratio, the triangle $\{\mathbf0,\mathbf u,\mathbf v\}$ and the vertex $\mathbf b$ form a regular tetrahedron of edge $a$: the upper vertex has horizontal squared distance $a^2/3$ from each triangle corner and height squared $2a^2/3$. A regular octahedron has lower vertices $\{\mathbf u,\mathbf v,\mathbf u+\mathbf v\}$ and upper vertices $\{\mathbf b,\mathbf b+\mathbf u,\mathbf b+\mathbf v\}$. Their equilateral triangular faces have aligned centers and opposite orientation; separation $a\sqrt{2/3}$ is the regular-octahedron face separation. The scale lemma gives larger exact copies of these seeds. Hence ideal-HCP tetrahedra and octahedra are not restricted to isolated nearest-scale examples. No complete classification of HCP cubes or nonideal-HCP embeddings is asserted here.

Oblique lines in a lattice drawing do not by themselves identify a tilted polyhedron. BCC nearest-neighbor directions follow body diagonals, while FCC nearest-neighbor directions follow face diagonals. A conventional cubic cell still has orthogonal edges. One standard BCC primitive-vector choice is $a(-1,1,1)/2$, $a(1,-1,1)/2$, $a(1,1,-1)/2$: pairwise dot products give angle $\arccos(-1/3)$. The FCC choice $a(0,1,1)/2$, $a(1,0,1)/2$, $a(1,1,0)/2$ gives angle $\pi/3$. These are particular oblique translation cells, not intrinsic tilts of the full point sets; the selected polarity-preserving cell can differ again. The simple-cubic alternating-plane case means fully occupied square planes with alternating signs. An AB shift changes occupied positions, as in HCP, and is a distinct construction.

### 8.4. Equal populations are weaker than alternating every edge

Let $s(v)=+1$ denote a positrino and $s(v)=-1$ an electrino at vertex $v$. A polyhedron is individually 50/50 when $\sum_{v\in V(P)}s(v)=0$. A periodic arrangement is globally 50/50 when that sum vanishes over uniquely owned sites in a polarity-preserving translation cell. These are different constraints when vertices are shared.

All five Platonic solids have even vertex counts, so each permits an isolated equal-population assignment. Requiring $s(u)=-s(v)$ on every edge is stronger: it requires a bipartite edge graph, meaning every closed edge cycle has even length. Alternation around an odd cycle returns the wrong sign to the starting vertex.

| Solid | Positrinos / electrinos per balanced solid | Opposite polarity on every edge? | Obstruction or construction |
| --- | ---: | --- | --- |
| Tetrahedron | 2 / 2 | No | Triangular faces; a 2/2 assignment has four unlike and two like edges |
| Cube | 4 / 4 | Yes | Coordinate-sum parity changes on every cube edge |
| Octahedron | 3 / 3 | No | Triangular faces; opposite signs on each antipodal pair give six unlike and six like edges |
| Dodecahedron | 10 / 10 | No | Pentagonal faces |
| Icosahedron | 6 / 6 | No | Triangular faces |

Here an antipodal pair consists of two vertices opposite through the center. Assigning opposite signs to every antipodal pair balances the cube, octahedron, dodecahedron, and icosahedron. It need not alternate their edges. The tetrahedron has no antipodal vertex pairs and is balanced by selecting any two vertices for each sign. These are combinatorial constructions, not polarity assignments automatically inherited from an ambient lattice.

For the simple-cubic embeddings of §8.3, compare checkerboard polarity $s(i,j,k)=(-1)^{i+j+k}$ with alternating-plane polarity $s(i,j,k)=(-1)^k$. Counts below are unordered between species because translating a motif can exchange the signs.

| Shape and size | Checkerboard population | Alternating-plane population |
| --- | --- | --- |
| Cube, odd $n$ | 4 / 4 | 4 / 4 |
| Tetrahedron, odd $n$ | 4 / 0 | 2 / 2 |
| Octahedron, odd $n$ | 6 / 0 | 4 / 2 |
| Any of these, even $n$ | Monochromatic | Monochromatic |

These counts follow by substituting the displayed coordinates into the two parity rules. In particular, alternating planes do not give a 3/3 octahedron in this axial family. In the checkerboard cube, the two monochromatic alternate-corner tetrahedra together use all eight vertices, but their convex interiors intersect. This stella-octangula compound is a shape-recognition example outside the packing catalogue, even though neither tetrahedron has a vertex strictly inside the other.

The distinction also explains several gallery cases. Under BCC corner/body-center polarity, each cubic coset is monochromatic, so the within-coset families above do not supply balanced polyhedra. Under diamond's two-FCC-set polarity, tetrahedra formed by the four nearest neighbors of a site are monochromatic. Under ideal-HCP alternating A/B layer polarity, a nearest tetrahedron has a 3/1 layer split while a nearest octahedron has a 3/3 split. These conclusions concern the named motifs and decorations, not every embedding in those point sets.

### 8.5. Cubes and the tetrahedral-octahedral honeycomb

The unit cubes $a([i,i+1]\times[j,j+1]\times[k,k+1])$ tile space with common faces, edges, and vertices. Under either simple-cubic coloring above, every cube is 4/4 and the global site population is 50/50. Under checkerboard coloring, all cube edges additionally join opposite polarities. Interiors of distinct cubes are disjoint, and every site of $a\mathbb Z^3$ belongs to the vertex inventory. This is the most direct example satisfying local balance, global balance, shared vertices, and the interior exclusion simultaneously.

For the tetrahedral-octahedral honeycomb, use the FCC set

$$
\mathcal F=\{a(i,j,k):i+j+k\text{ is even}\}.
$$

Take the four even-parity corners of every elementary cube as a tetrahedron. Around every odd-parity integer site take the six adjacent even-parity sites as an octahedron. All edges have length $\sqrt2a$. Inside each elementary cube, its central tetrahedron has volume $a^3/3$ and the four corner portions of neighboring octahedra each have volume $a^3/6$. The corresponding planar cuts partition the cube, giving total $a^3$ with disjoint interiors. This supplies a local coverage proof, not just a sum of volumes. A complete octahedron has volume $4a^3/3$; there is one tetrahedron per elementary cube and one octahedron per two cubes, so the cell-number ratio is two tetrahedra to one octahedron. Its vertex inventory is exactly $\mathcal F$.

If $\mathcal F$ inherits the simple-cubic checkerboard sign, all these vertices have the same polarity. Adding the omitted odd sites creates a 50/50 ambient population but places those sites at octahedron centers. This does not produce balanced polyhedra and is not a preferred construction for the present vertex-only stacking question. The other parity FCC honeycomb cannot be superposed as a second admitted stack: its vertices lie inside octahedra of the first.

A genuinely bipolar decoration of $\mathcal F$ is $s(i,j,k)=(-1)^k$. Translation by $a(1,0,1)$ preserves $\mathcal F$ and exchanges the signs, proving equal global populations. Every honeycomb tetrahedron is 2/2, since its two occupied corners on each of two consecutive planes have opposite signs. Every octahedron is 4/2, since four vertices lie on its center plane and two on the adjacent planes. Thus this exact shared-vertex honeycomb has balanced tetrahedra but unbalanced octahedra.

A different periodic coloring illustrates the converse emphasis:

$$
s(i,j,k)=(-1)^{\lfloor i/2\rfloor+\lfloor j/2\rfloor+\lfloor k/2\rfloor}
\qquad((i,j,k)\in\mathcal F).
$$

Translation by $2a$ along any coordinate axis exchanges signs, and translation by $4a$ preserves them. Opposite octahedron vertices differ by two in one coordinate, so every octahedron is 3/3. Tetrahedra are 2/2 when the three lower-corner coordinate parities of their elementary cube are mixed, and monochromatic when those parities are all equal. To see this, increasing a coordinate by one changes its floor parity exactly when the lower coordinate is odd; on the four selected corners, any nonconstant parity restriction splits two and two. Neither example establishes a coloring that balances every tetrahedron and every octahedron simultaneously. That stronger classification remains unresolved here.

Shared ownership can be checked without double counting. If $m(v)$ is the number of incident selected cells at a site, a periodic incidence sum satisfies

$$
\sum_{P\ \mathrm{mod}\ \Lambda}\ \sum_{v\in V(P)}\frac{s(v)}{m(v)}
=\sum_{v\ \mathrm{mod}\ \Lambda}s(v).
$$

Here $\Lambda$ is a polarity-preserving translation lattice; incidences crossing its cell boundary are included with their multiplicities. Each site's incident copies contribute $m(v)$ weights of $1/m(v)$. Cubic-honeycomb sites meet eight cubes; tetrahedral-octahedral sites meet eight tetrahedra and six octahedra. Local balance implies global balance under uniform incidence multiplicity, but this implication is not automatic for an arbitrary mixed complex with varying multiplicities.

### 8.6. Periodic examples with no common vertices

Every Platonic solid admits a separated periodic 50/50 construction. Place its center at the origin, let $R$ be its circumradius, and repeat one balanced vertex motif with centers on $L\mathbb Z^3$, where $L>2R$. Distinct circumscribed balls are separated, so the polyhedra have disjoint interiors, no common vertices, and no vertices inside another copy. Each translation cell owns exactly one balanced motif. This is a derived existence construction for all five solids; it claims neither close packing nor space filling. For dodecahedra and icosahedra its vertices form a periodic point set with a basis, rather than any of the fixed rational cubic point sets excluded in §8.2.

A fixed simple-cubic example avoids even that distinction. Take the eight vertices of the unit cube and repeat by $2a\mathbb Z^3$. Distinct cubes have gaps and no common vertices; every integer site belongs to exactly one such cube because each coordinate has a unique representation $2q+r$ with $r\in\{0,1\}$. Both checkerboard and alternating-plane assignments give every cube 4/4 and the global population 50/50. Compare this with the unit-step cubic honeycomb: the same site inventory supports either shared-vertex cells filling space or separate cubes with gaps, depending on the chosen incidence overlay.

The construction for an arbitrary finite motif already embedded in a periodic decorated point set is similar: choose three sufficiently large polarity-preserving translations so that translated bounding regions are disjoint. This preserves the seed's coloring and local population. It does not turn a monochromatic seed into a balanced one, and it can leave unused ambient sites that must be reported.

### 8.7. Periodic examples meeting only at common vertices

All five Platonic solids also admit a periodic construction in which adjacent copies meet at exactly one vertex, while every polyhedron and the global inventory are 50/50. Choose a longest vertex-to-vertex displacement $\mathbf t=\mathbf v_+-\mathbf v_-$. These two vertices are the unique support points in the direction of $\mathbf t$ and its negative. Indeed, another vertex with an equally large projection would have greater distance from the opposite endpoint unless it were the same vertex, contradicting maximality. The solid lies in the slab between the two perpendicular support planes.

The chain $P+k\mathbf t$, for integer $k$, consequently has disjoint interiors and consecutive copies meet only at $\mathbf v_++k\mathbf t=\mathbf v_-+(k+1)\mathbf t$. Nonconsecutive slabs are separated. Repeat the chain in two perpendicular transverse directions at spacing greater than $2R$. Distinct chains are separated by their transverse bounding disks. The complete arrangement is periodic in three dimensions but has gaps between chains.

Choose a balanced sign assignment $s_0$ on $P$ with $s_0(\mathbf v_+)=-s_0(\mathbf v_-)$. Give copy $k$ the signs $(-1)^k s_0$. At a shared endpoint the signs then agree, so one physical site receives one label. Every copy remains individually balanced, and the colored repeat length is $2\mathbf t$. In that doubled repeat there are $2N-2$ uniquely owned vertices for an $N$-vertex solid: two endpoint incidences have been identified. The two identified sites have opposite signs, leaving $N-1$ positrinos and $N-1$ electrinos. This proves global balance as well as local balance.

The doubled coloring matters. If both contact endpoints had the same sign and an unchanged coloring were repeated, each geometric repeat would lose one count of that sign after shared-site identification; balanced isolated copies would then give an unbalanced global inventory. Shared vertices constrain the coloring and its repeat period, not just the drawing.

### 8.8. Comparison and geometric verification boundary

| Construction | Common vertices? | Every solid 50/50? | Global sites 50/50? | Fills space? |
| --- | --- | --- | --- | --- |
| Unit cubic honeycomb, checkerboard or planes | Yes | Yes, 4/4 | Yes | Yes |
| FCC tetrahedral-octahedral honeycomb, alternating planes | Yes | Tetrahedra 2/2; octahedra 4/2 | Yes | Yes |
| Same honeycomb, floor-parity coloring | Yes | Octahedra 3/3; tetrahedra partly monochromatic | Yes | Yes |
| Separated unit cubes repeated by $2a$ | No | Yes, 4/4 | Yes | No |
| Separated balanced motifs, any Platonic solid | No | Yes | Yes | No |
| Alternately colored vertex-contact chains, any Platonic solid | Yes, one per adjoining pair | Yes | Yes | No |

Every admitted row has disjoint polyhedron interiors and excludes vertices inside another selected polyhedron. The constructions prove existence and the displayed population statements, not exhaustiveness or optimal density. For a proposed extension, exact vertex coordinates establish regularity; supporting planes establish separation; shared-coordinate identities establish contact; and uniquely owned signed counts establish balance. A single unequal required edge, strictly interior foreign vertex, contradictory sign at a shared coordinate, or nonzero signed count in the declared repeat overturns the corresponding claim. A vertex-only containment test cannot establish the stronger disjoint-interior condition; for general convex polyhedra, a separating-axis test must include face normals and cross products of edge directions.

The existence of the cubic and tetrahedral-octahedral honeycombs does not establish a single gap-free honeycomb using cubes, regular tetrahedra, and regular octahedra together. Such a mixed construction is not classified here; matching edge lengths or adding cell volumes alone would not prove it.

These overlays are defined at the undeformed geometry. Uniform scaling preserves regularity, whereas the laboratory's nonuniform uniaxial deformation generally does not. An invertible linear deformation preserves incidence and disjoint interiors but does not preserve the Platonic classification. The construction inventory therefore belongs to geometry teaching; new acceleration results still require the separate history and summation arguments of §§3–5.

## 9. Remaining work and the boundary of extension

### 9.1. New periodic patterns and teaching structures

The active queue proposes an optional primitive-cell tiling demonstration, additional periodic equal-population families and shared-vertex Platonic cell complexes. These are different extensions. A tiling demonstration must specify primitive vectors and owned basis sites and distinguish its translation tile from a conventional cell or a Voronoi construction. Adjacent copies use integer translations of the same vectors, with unique ownership and the accepted relationship graph preserved.

New polarity families require an exact point set, polarity assignment, minimal preserving translation cell, balanced cell count, boundary convention and independently reconstructed identities. Coordination, shell polarity correlation and motif incidence remain geometry observations separate from acceleration. A familiar lattice name or equal population does not inherit a certificate for a different decoration.

Chapter 8 supplies exact candidate geometry for shared and separate vertex inventories, including balanced cubic tilings, tetrahedral-octahedral colorings, and balanced vertex-contact chains. Implementing these constructions still requires cells to refer to one global site inventory. The ledger must report both shared participation and sites unused by the selected overlay, distinguish cell boundaries from neighbor or acceleration graphs, enforce the stated interior exclusion, and establish volume coverage for any claimed tiling. A geometric packing does not assign independent braids or prove retention. The intersecting alternate cube-corner tetrahedra remain a compound outside the admitted packing cases.

### 9.2. What has not been authorized by a picture

Polarity editing remains deferred, and nonzero-deformation HCP requires renewed authorization before its unresolved all-space work proceeds. The broader periodic-proof acceptance object remains open despite the bounded certificates already retained. The scientific lane is active, but this synthesis does not execute or reprioritize its queue.

Possible later transfer to Borg depends on an EOM-solver path capable of representing the many-site stationary retained history, producing complete per-site causal-root ledgers and evolving the population without borrowing authority from the display. Reusing camera behavior, picking, navigation or marker conventions does not establish that capability. Until those conditions are met, Lattice Lab explains geometry, finite stationary sums and explicitly scoped periodic cancellation; its unresolved dynamics remain separate.
