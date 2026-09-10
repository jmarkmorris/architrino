# Architrino Lattice Lab: Geometry, Stationary Cancellation, and Finite Ledgers

## 1. What the laboratory explains

Architrino Lattice Lab is a geometry-first educational explorer of declared electrino and positrino arrangements. Its central question is precise: when a specified stationary arrangement is evaluated with a stated acceleration kernel and calculation boundary, which contributions cancel? The answer depends on the geometry, polarity assignment, retained history and summation convention. A symmetric picture or an equal red/blue population supplies only part of that information.

The retained materials distinguish three kinds of result. A geometric view identifies sites, neighbors, repeated cells and polarity patterns. A finite calculation sums an explicitly bounded set of source contributions for one receiver. A periodic certificate proves a statement about every receiver of a declared infinite repeating pattern under a specified exhaustion. None of these establishes later motion, perturbative stability, binding, energy conservation or a physical Noether sea. The app remains a static educational display, with its implementation and verification descriptions attributed to the retained contracts and audits rather than a fresh runtime examination.

### 1.1 The held-history experiment

The mathematical reference case holds every site fixed, with zero velocity, throughout the entire past through a common release time. It then asks for acceleration at release. Stationary histories simplify the causal-root problem: a distinct stationary partner contributes at the unique emission time separated from reception by its wake-travel delay. A coincident same-site endpoint is excluded rather than added as a self contribution.

Zero velocity is part of the initial condition. Zero acceleration, when proved, is a further statement about that instant and the declared history. It does not decide what happens after a displacement, defect, changed history or later evolution. A future dynamics calculation would need its own accepted history representation, complete causal-root accounting and evolution authority.

### 1.2 Three boundaries that must remain distinct

The main spherical crop determines which markers a learner sees. A polarity-preserving repeat cell identifies unique representatives of the infinite decorated pattern. The calculation boundary identifies which source rows are summed and in what limiting convention. These can be different objects in the same view. For a periodic case, the crop supplies no acceleration rows merely because a site is visible; the certificate applies to the complete declared repeat. For the finite Random case, the declared finite site inventory is the calculation domain, and every other member enters the selected receiver's ledger exactly once.

Camera rotation, visibility filters, marker aggregation and relationship highlighting change presentation. They do not change the underlying source inventory, polarity, retained history or evidence grade. This separation lets the interface explain a result without making its pixels an additional scientific instrument.

## 2. Lattices, polarity patterns, and local geometry

### 2.1 The point set and its decoration

A lattice description specifies occupied positions. A polarity rule assigns electrino or positrino labels to those positions. The same point geometry can carry several polarity patterns: simple-cubic checkerboard and alternating planes share their point set but differ in which neighbors have matching polarity. Conversely, a cell selected to repeat both positions and colors can be larger or differently oriented than a geometry-only cell.

In the retained gallery, simple cubic has six nearest neighbors; body-centered cubic (BCC) has eight along body-diagonal directions; face-centered cubic (FCC) and ideal hexagonal close-packed (HCP) have twelve; and diamond cubic has four in tetrahedral coordination. BCC uses corner and body-center populations, diamond combines two displaced FCC populations, and HCP distinguishes its ABAB layer sequence from FCC's ABCABC stacking. These crystallographic descriptions are geometric comparisons. Chemistry analogies formerly used to introduce BCC and diamond were removed from the learner interface; they do not identify these architrino cases with ordinary materials.

The gallery's two polarities are displayed as red positrinos and blue electrinos. Equal counts are a declared population property of the represented cases, not a cancellation theorem. For example, assigning equal populations randomly need not place equally weighted opposite acceleration contributions around a receiver. FCC's triangular nearest-neighbor loops also prevent a two-color pattern from making every nearest pair opposite in polarity; repeating a coloring does not erase that local constraint.

### 2.2 Spacing, shells, and density

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

### 2.3 Owning a site once

A fundamental translation tile owns each actual site once under a half-open boundary convention. Translated image markers provide context; they are not additional architrinos. The retained repeat-capable gallery uses two owned sites per polarity-preserving tile. The three translation vectors must reproduce both occupied geometry and polarity, including the skew HCP cell. Camera orbit is visual inspection and is never a tiling operation.

Several counts can coexist without measuring the same thing: directed neighbor incidences at owned sites, unique undirected edges, the induced graph of displayed context sites, and endpoint-group relationships after aggregation. The BCC audit illustrates the distinction. Two owned sites each have eight nearest incidences, giving sixteen directed incidences but fifteen unique owned-incident segments because their in-tile relationship is shared. A larger displayed context has additional induced edges. Its longer same-polarity square-perimeter relationships belong to the next shell and must not be inserted into the nearest graph to make the image look complete.

The presentation contract permits a translated colored sphere only when its displayed context has an honest induced nearest-neighbor network. A boundary continuation marker can indicate an unrepresented endpoint without pretending to be another fully shown site. Ownership, translated context and continuation remain distinct even when ordinary markers share the same appearance.

## 3. Exact cancellation for the stationary checkerboard

### 3.1 Sites, roots, and the acceleration row

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

### 3.2 Pair cancellation and the infinite boundary

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

### 3.3 What the displayed shells establish

For an electrino receiver, the six members of the undeformed nearest shell are positrinos and form three cancelling pairs. Under one-axis scaling, two are at $\lambda d$ and four at $d$. The twelve members of the undeformed next shell are electrinos: eight have distance $d\sqrt{1+\lambda^2}$ and four remain at $\sqrt2d$. Their six pairs cancel separately. These eighteen rows are explanatory examples of the generative argument; they do not prove the remaining infinite ledger by numerical extrapolation.

The source names two distinct verification routes. A structural verifier reconstructs parity, transformed geometry, root delays and rows, including a deliberately corrupted numerator. A pre-existing high-precision EOM reference kernel independently reconstructs stationary histories and contributions without importing the app's JavaScript ledger. Their retained results support the source's implementation checks at their recorded receiver, cutoff, axis and factor coverage. They were not rerun for this manuscript, and agreement does not enlarge the theorem into a stability or evolution result.

## 4. Cancellation through complete symmetry groups

### 4.1 Why a whole orbit can replace an opposite pair

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

### 4.2 Case-specific reach

The retained packet names two inequivalent receiver classes for each of its five additional periodic cases. Its case constructions and verification assertions support the following conditional reach:

| Case | Cancellation group | Static X-deformation reach |
| --- | --- | --- |
| BCC | Identity and receiver-centered inversion | Entire supported range |
| FCC alternating planes | Identity and receiver-centered inversion | Entire supported range |
| Simple-cubic alternating planes | Identity and receiver-centered inversion | Entire supported range |
| Diamond cubic | Identity and the three orthogonal twofold rotations about X, Y and Z | Entire supported range |
| HCP ABAB | Threefold rotation about Z together with reflection across the basal plane | Undeformed baseline only |

For the inversion cases, opposite offsets carry the same relative polarity and cancel. Diamond's four-member rotation group has no nonzero common fixed vector and commutes with the diagonal X scaling. The source's independent gallery verifier reconstructs the group conditions, both receiver classes and local rows, and includes corrupted-symmetry and corrupted-row negative controls. Its recorded checks concern those constructions and samples, not a proof for every conceivable coloring on the same point set.

### 4.3 The deformed-HCP boundary

At the undeformed HCP baseline, the threefold rotation and basal reflection remove every possible invariant vector component. A nontrivial X scaling does not commute with that rotation. The source reports that the remaining commuting symmetries leave one in-plane component unconstrained. The existing certificate therefore fails to prove zero when $\beta>0$.

Failure of this proof is not a proof of nonzero acceleration. The deformed HCP result remains not established. Its display may retain geometric shell descriptions, but it must suppress the zero outcome, residual and calculation disclosure. Neither a visually planar endpoint nor equal polarity counts repairs the missing all-space argument. A stronger result would need its own complete periodic accounting, exhaustion rule, receiver coverage and independent verification.

The retained certificates and final reconciliation audit already describe bounded periodic results, while the live queue still contains a broader unclosed periodic-proof object. These are separate facts: a manuscript can explain the existing theorem without declaring that every implementation and acceptance obligation in that object is complete.

## 5. The finite Random 50/50 calculation

### 5.1 Population and source domain

The [finite Random contract](contracts/random-finite-configuration-contract.md) declares 88 simple-cubic sites within the case's spherical radius of $2.75d$, with exactly 44 positrinos and 44 electrinos. This is its retained case inventory, not a new count reconstructed from an assumed crop center. A selected receiver sums contributions from the other 87 sites exactly once. The residual is a dimensionless stationary acceleration vector and magnitude for that finite configuration.

Unlike the deterministic periodic cases, Random has no polarity-preserving repeat-panel claim or all-space certificate. Its unpolarized companion can still illustrate conventional simple-cubic geometry. That geometry does not make its finite polarity assignment periodic. Presentation filters must not silently remove calculation rows, and an old aggregate value must not override the sum of the included rows.

### 5.2 Reproducible assignments

The contract uses a recorded unsigned 32-bit seed and stable site identifiers. It first orders identifiers by direct UTF-16 code-unit comparison, assigns each ordinal a deterministic SplitMix32 score, and ranks sites by unsigned score with ordinal tie-breaking. The first 44 receive one polarity and the remaining 44 the other. A deterministic score is a device for reproducible assignment; it is not evidence of a physical random process or a demonstrated statistical sampling law.

The exact integer operations, versioned algorithm identifier, default seed and fingerprint fields remain in the focused contract. Recalculation selects the smallest succeeding unsigned seed whose assignment fingerprint differs from the current one. The button therefore has to produce a changed recorded assignment rather than only repainting the same sites. The retained audit records a changed seed, fingerprint, target polarity and residual while finite scope remained unchanged. These are source-time verification observations, not newly executed trials.

### 5.3 Reading a nonzero residual

A nonzero finite residual means nonzero initial acceleration under the declared stationary finite ledger. It does not diagnose instability, predict a trajectory or measure energy. Equal populations alone do not imply a zero residual because the vector contributions also depend on positions and receiver-relative polarity.

The source's separately authored verifier reconstructs both assignment and finite summation; focused tests pin known fingerprints and require recalculation to change assignment. Their falsifiers include duplicate or omitted sites, wrong 44/44 counts, inconsistent provenance, unchanged recalculation and disagreement with the independent finite residual. The app's finite zero/nonzero presentation also has to derive its result from included rows rather than stale stored totals. The retained nonzero example supplies no probability estimate for cancellation across other seeds.

## 6. Showing geometry without changing its meaning

### 6.1 Static deformation and endpoint aggregation

The visible control is Uniaxial Deformation. Its parameter $\beta$ is neither velocity nor a Lorentz quantity: zero is the undeformed case, and one is the maximum supported nondegenerate endpoint. The coordinate map changes semantic X from scale one to 0.01 while preserving semantic Y and Z. The miniature keeps its undeformed display-fit scale so reframing cannot imitate an additional deformation. Markers remain fixed in screen size while positions and relationship lengths change.

Exactly at the endpoint, the display groups markers whose true transformed positions are visually coincident under the declared marker-diameter threshold. The grouped marker is purple, but its metadata retains every original site and polarity. Internal group edges disappear from presentation and duplicate external group-pair links collapse to one visible relationship. The source identities and calculation rows remain intact. Below the endpoint, including immediately below it, ordinary markers and relationships return. Purple is a presentation color, not a third species or an acceleration result.

The HCP endpoint audit makes these distinctions concrete. At its recorded viewport, 116 main-view identities formed 30 groups. The 509 canonical main edges were partitioned into 86 internal edges, 71 distinct external representatives and 352 redundant external identities. The repeat view partitioned 63 canonical links into 10 internal, 19 distinct external and 34 redundant links. These are counts at different stages of a presentation mapping, not competing inventories of physical particles. All HCP endpoint acceleration claims remained not established.

### 6.2 Projection, size, and orientation

The retained design uses fixed-size solid spheres, orthographic projection, drag rotation and wheel zoom. Equal world-space edges can have different projected lengths because the screen sees only two components of the rotated displacement. Depth does not itself rescale an orthographic image. Marker clipping shortens visible segments at sphere surfaces without altering center-to-center geometry. The Diamond audit separates its four nearest neighbors from its longer next shell and attributes apparent edge-length differences to projection under the declared camera.

The main view, polarity repeat, unpolarized companion and orientation key share a trackball quaternion. The default presents semantic +Z upward, with spherical-envelope caps authored on semantic ±Z. Arbitrary subsequent rotation can tilt Y and introduce roll; no model axis is relabeled. The lower-left key represents centered, equal-scale positive and negative unit axes rather than an extra circle or enclosing cube. A lower-right accessible legend retains red Positrino above blue Electrino with the same marker-size and lighting treatment as the corresponding canvas sites.

### 6.3 Relationship highlighting and context

The default-off repeat-cell highlight affects the main view. Enabling it retains unselected ordinary relationships while replacing the ordinary segments for selected identities with violet emphasis. The selected set must equal the suppressed ordinary set, so a thin ordinary stroke cannot remain through a highlighted edge. At an aggregated endpoint, highlights follow actual external group-pair representatives rather than invented radial lines, halos or duplicate circles.

The main spherical envelope remains a viewing crop. Its retained radius is $2.75d$, while the camera framing scales proportionally to keep the envelope's apparent diameter consistent. Source audits record specific inventories and screen measurements for their named snapshots. Those counts should not be pooled across different crops, identity classes or display states. Reframing, context markers and highlighting have no power to change periodic calculation scope.

## 7. The interface as an explanation of evidence

### 7.1 A result-first Ledger

When a calculation exists, the Ledger presents one outcome, a normalized magnitude and vector, a concise scope sentence and two local shell examples before its Show calculation disclosure. The local examples explain arithmetic; the declared certificate carries a periodic all-site conclusion. A finite result names its finite scope. A not-established state presents a calm explanation and optional geometric shells without an outcome icon, residual, unavailable-value rows or calculation disclosure.

Selection identifies the receiver and polarity without exposing raw coordinates in the first view. Changing selection does not change a certificate's scope unless the underlying calculation scope changes. Random recalculation is case-specific, has an accessible name describing the action, and leaves deterministic cases without that control. Provenance fields remain in the underlying record rather than the explanatory panels.

The current retained presentation places case-specific geometry under the selected case's accessible title, common population/crop/line conventions in Shared Display Conventions, repeat ownership in How This Pattern Repeats, and outcomes in the Ledger. The finite versus periodic method remains available in the expanded calculation. HCP's deformed-proof limitation is a necessary exception to otherwise shared deformation copy. Exact typography, accessible labels, selection cues and surviving copy are preserved in the supporting contracts and audit map.

### 7.2 What the removal audits preserve

Earlier designs included a Lattice Primer, an overview card, named camera presets and several additional explanatory labels. The later accepted presentation removed those surfaces. The eighteen-paragraph Primer audit assigns their geometry and authority content to surviving owners, while repeated density statements, chemistry analogies and duplicated disclaimers were dropped rather than moved into another overview. Random was introduced after the Primer removal and never had those paragraphs.

A source requirements packet can preserve an earlier design alongside later amendments. Its presence is not proof that every proposed control exists. The retained history separates initial implementation, later presentation changes, verification-only reconciliation and superseded requests. This manuscript follows that distinction: it explains the accepted roles while retaining exact earlier requirements and outcomes as historical supporting material.

## 8. Remaining work and the boundary of extension

### 8.1 New periodic patterns and teaching structures

The active queue proposes an optional primitive-cell tiling demonstration, additional periodic equal-population families and shared-vertex Platonic cell complexes. These are different extensions. A tiling demonstration must specify primitive vectors and owned basis sites and distinguish its translation tile from a conventional cell or a Voronoi construction. Adjacent copies use integer translations of the same vectors, with unique ownership and the accepted relationship graph preserved.

New polarity families require an exact point set, polarity assignment, minimal preserving translation cell, balanced cell count, boundary convention and independently reconstructed identities. Coordination, shell polarity correlation and motif incidence remain geometry observations separate from acceleration. A familiar lattice name or equal population does not inherit a certificate for a different decoration.

Shared-vertex complexes require cells to refer to the same global site inventory. Cubic and tetrahedral-octahedral honeycombs are initial objects; the two alternate cube-corner tetrahedra form a compound rather than a space tiling. Any further periodic complex needs exact coordinate and incidence construction. The ledger must report both shared participation and sites unused by the selected overlay, distinguish cell boundaries from neighbor or acceleration graphs, and establish volume coverage for any claimed tiling. This is not a packing of independent braids, and a cell overlay does not assign a braid or prove retention.

### 8.2 What has not been authorized by a picture

Polarity editing remains deferred, and nonzero-deformation HCP requires renewed authorization before its unresolved all-space work proceeds. The broader periodic-proof acceptance object remains open despite the bounded certificates already retained. The scientific lane is active, but this synthesis does not execute or reprioritize its queue.

Possible later transfer to Borg depends on an EOM-solver path capable of representing the many-site stationary retained history, producing complete per-site causal-root ledgers and evolving the population without borrowing authority from the display. Reusing camera behavior, picking, navigation or marker conventions does not establish that capability. Until those conditions are met, Lattice Lab explains geometry, finite stationary sums and explicitly scoped periodic cancellation; its unresolved dynamics remain separate.
