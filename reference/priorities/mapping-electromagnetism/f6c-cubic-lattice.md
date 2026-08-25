# F6c Cubic Lattice

## Document Status

- **Owner:** [Mapping Electromagnetism](priorities.md)
- **Status:** active seed document; rigid two-history and first parity-tetrahedral site-local circular backgrounds rejected under the tested finite boundaries; adaptive-background closure open
- **Created:** 2026-08-24
- **Claim level:** mixed derived geometry, derived stationary cancellation, inferred response coordinates, and guessed medium interpretation
- **Advancement:** no retained branch, physical Noether sea, equation-score movement, or reader-facing promotion

This document is the durable priority-side home for the alternating cubic population proposed in [Session 23](brainstorming.md#session-23--deformable-alternating-cubic-sea-with-orbiting-sites-2026-08-24). It consumes the exact F6c center scaffold from [F6c Geometry](f6c-geometry.md), the stationary theorem from the [Simple-Cubic Checkerboard Stationary-Release Cancellation Certificate](../dormant-deferred/app-lattice-lab/simple-cubic-checkerboard-cancellation-certificate.md), and the campaign discipline in [Simulation Run Protocols](../../../content/markdown/aaa/validation/simulations/run-protocols.md). It does not promote the candidate into `content/markdown/aaa`.

Plainly: this is a rigorous research seed, not a declaration that the universe is a cubic lattice. The exact results concern corner geometry and one stationary cancellation family. The moving medium remains a testable guess.

## Short Description

The candidate population occupies nominal simple-cubic sites indexed by integer triples and alternates polarity on every one-step move. The nominal sites are not primitive points of space. They are candidate mean positions or symmetry centers of one retained collective architrino history inside the Euclidean void.

The equal-scale F6c track centers supply one exact local cube motif. They do not supply a tiling rule for member tracks. Every lattice vertex belongs to eight visible cubes, so a physical architrino at that vertex must have one site-indexed history rather than eight independently copied cell histories.

The strongest static foothold is exact: a complete stationary checkerboard history has zero release acceleration under receiver-centered inversion-symmetric exhaustion. The same proof holds after every fixed nonsingular uniform linear deformation, not only one-axis compression. This family supplies no acceleration-restoring slope for a homogeneous affine strain. Any nonzero stiffness must therefore come from nonstationary causal history, nonuniform structure, or additional retained assemblies.

Plainly: the static array is exactly quiet under a broad family of uniform shape changes. That makes it a clean control, but it also means the static construction has not shown why a disturbed medium would spring back.

## Reader Roadmap

1. [Vocabulary And Symbols](#vocabulary-and-symbols) defines the lattice, polarity, orbit, and response records.
2. [Exact Static Checkerboard Foothold](#exact-static-checkerboard-foothold) proves the stationary cancellation and states its stiffness boundary.
3. [Relationship To F6c](#relationship-to-f6c) identifies the exact cube map and the isolated-cube dynamical contrast.
4. [Candidate Orbiting-Site Map](#candidate-orbiting-site-map) gives a site-indexed history without treating the grid as primitive.
5. [Shared-Vertex Compatibility](#shared-vertex-compatibility) proves the cell-copy obstruction and compares candidate orientation classes.
6. [Common And Polarity-Differential Response Coordinates](#common-and-polarity-differential-response-coordinates) defines the first translation-symmetry diagnostics and the cubic-anisotropy boundary.
7. [Matter-Induced Deformation](#matter-induced-deformation) defines a lawful source-on/source-off comparison.
8. [Periodic And Infinite-Medium Boundary Contract](#periodic-and-infinite-medium-boundary-contract) separates what each finite or infinite treatment can establish.
9. [First EOM-Solver Experiment](#first-eom-solver-experiment) gives the smallest fail-closed executable campaign.
10. [Adaptive Cubic-Medium Kinematics And Ledger Contract](adaptive-cubic-medium-kinematics-and-ledger-contract.md) replaces the rigid two-history response ansatz with site-local histories and fail-closed reclassification rules.
11. [Claim Grades And Falsifiers](#claim-grades-and-falsifiers) and [Current Evidence Boundary](#current-evidence-boundary) state exactly what would overturn or advance each claim.

## Vocabulary And Symbols

| Symbol or term | Meaning here | Claim boundary |
| --- | --- | --- |
| $\mathbf g=(g_x,g_y,g_z)\in\mathbb Z^3$ | Integer label of one nominal lattice site. | An index, not a primitive point of space. |
| $s_{\mathbf g}=(-1)^{g_x+g_y+g_z}$ | Checkerboard polarity sign. | Derived from the declared coloring. |
| $d>0$ | Nominal nearest-site spacing. | A candidate history scale, not a recovered ruler. |
| $\mathbf C(T)$ | Common translation of the represented population. | A native position coordinate, not an observer frame. |
| $L(T)$ | Collective linear deformation map. | Descriptive until supported by an EOM solution. |
| $\rho_{\mathbf g}(T)$ | Site-orbit radius. | A history coordinate, not an elastic parameter. |
| $(\mathbf p_{\mathbf g},\mathbf q_{\mathbf g})$ | Orthonormal basis of the site's orbit plane. | One physical site may have only one such basis at a given time. |
| $\theta_{\mathbf g}(T)$ | Site-orbit phase or cadence coordinate. | Descriptive until the delayed dynamics retains it. |
| common response | In-phase part of the two polarity-sublattice displacement. | A mathematical coordinate, not yet gravity or mechanics. |
| polarity-differential response | Relative displacement of the two polarity sublattices. | A mathematical coordinate, not yet an electric field. |
| retained background | One EOM solution whose complete path history, member identities, roots, and return record persist. | Not supplied by prescribed geometry or a release snapshot. |

The descriptive site history is

$$
\mathbf X_{\mathbf g}(T)
=
\mathbf C(T)
+dL(T)\mathbf g
+\rho_{\mathbf g}(T)
\left[
\mathbf p_{\mathbf g}(T)\cos\theta_{\mathbf g}(T)
+\mathbf q_{\mathbf g}(T)\sin\theta_{\mathbf g}(T)
\right].
$$

Plainly: $\mathbf X_{\mathbf g}$ is the actual position of the architrino labeled by $\mathbf g$. The first term moves the population together, the second places its candidate mean location, and the last term describes motion around that mean. Every part after the label must be supported by one complete delayed history rather than by an external pin.

## Exact Static Checkerboard Foothold

### Declared Stationary Family

Let $L$ be any fixed invertible linear map on the Euclidean void and let the complete retained history through release time $T_r$ be

$$
\mathbf X_{\mathbf g}(T)=dL\mathbf g,
\qquad
\mathbf V_{\mathbf g}(T)=\mathbf0.
$$

Work in normalized wake-speed units with $c_f=1$. For a receiver at $\mathbf g$ and a transmitter at $\mathbf g+\mathbf n$, where $\mathbf n\ne\mathbf0$, the stationary causal root is

$$
T_t=T_r-d\|L\mathbf n\|,
\qquad
D_t=1,
\qquad
W^{\mathrm{acc}}=1.
$$

Plainly: every transmitter has been stationary for the complete history. Its one delayed contribution is evaluated at the same position it has at release, so the transmitter-side wake-spacing factor is exactly one.

Define $a_0=\kappa\epsilon^2/d^2$ and the relative polarity sign

$$
\sigma(\mathbf n)=(-1)^{n_x+n_y+n_z}.
$$

The normalized acceleration contribution from offset $\mathbf n$ is

$$
\frac{\mathbf A_{\mathbf n}}{a_0}
=
-\sigma(\mathbf n)
\frac{L\mathbf n}{\|L\mathbf n\|^3}.
$$

Plainly: $a_0$ is the common acceleration scale, $\sigma(\mathbf n)$ says whether the transmitter has the same or opposite polarity as the receiver, and $L\mathbf n$ is their transformed separation. The minus sign converts the transmitter offset into the receiver-from-transmitter line of action.

### Uniform-Linear Cancellation Theorem

**Theorem.** For every nonzero offset $\mathbf n$ and every fixed invertible linear map $L$,

$$
\mathbf A_{-\mathbf n}=-\mathbf A_{\mathbf n}.
$$

**Proof.** Integer parity is unchanged by $\mathbf n\mapsto-\mathbf n$, so $\sigma(-\mathbf n)=\sigma(\mathbf n)$. Linearity gives $L(-\mathbf n)=-L\mathbf n$, while the transformed distances, root delays, transmitter-side factors, and acceleration magnitudes agree. Substitution therefore reverses only the acceleration direction. For every finite receiver-centered exhaustion $E=-E$ with $\mathbf0\notin E$,

$$
\sum_{\mathbf n\in E}\mathbf A_{\mathbf n}=\mathbf0.
$$

The declared receiver-centered inversion-symmetric exhaustion limit is zero at every receiver.

Plainly: every admitted transmitter has an opposite partner with the same polarity relation and distance. Uniform compression, expansion, shear, or rotation changes both partners in exactly opposite ways, so each pair still cancels.

Claim grade: **derived**. This theorem extends the cited certificate's one-axis family to any fixed nonsingular uniform linear deformation. Its falsifier is an explicit $L$, $\mathbf n$, and complete stationary root record satisfying the stated hypotheses for which the two contributions do not sum to zero. The exact generative ledger and the independent high-precision oracle named in the certificate are the existing operator-checkable instruments for the one-axis subfamily.

Plainly: the extension uses only the identity $L(-\mathbf n)=-L\mathbf n$. A nonlinear or site-dependent deformation does not receive this result for free.

### What The Static Family Does Not Supply

The stationary acceleration is identically zero along the entire affine family. Consequently, its derivative with respect to any homogeneous strain parameter is also zero while the complete history remains stationary. The bare stationary construction therefore supplies no nonzero acceleration-restoring slope for homogeneous compression or shear.

This statement is not an elastic-modulus calculation. A modulus is a constitutive response that also needs a lawful stress, action, energy, or work ledger. The theorem establishes neither that ledger nor the response to a local nonuniform perturbation. It establishes only that homogeneous stationary geometry cannot be used as evidence of nonzero stiffness.

Plainly: squeezing the whole stationary array uniformly moves it to another exactly balanced stationary array. A spring-like response, if one exists, must come from history-dependent motion, local gradients, defects, or additional retained structure.

## Relationship To F6c

### Exact Track-Center Cube

Use the F6c tetrahedral axes

$$
\begin{aligned}
\hat{\mathbf n}_0&=(1,1,1)/\sqrt3,
&\hat{\mathbf n}_1&=(1,-1,-1)/\sqrt3,\\
\hat{\mathbf n}_2&=(-1,1,-1)/\sqrt3,
&\hat{\mathbf n}_3&=(-1,-1,1)/\sqrt3.
\end{aligned}
$$

At equal axial scale $h_+=h_-=h$, the positive-sector track centers are $+h\hat{\mathbf n}_i$ and the negative-sector track centers are $-h\hat{\mathbf n}_i$. They are the eight vertices of a cube of side

$$
d=\frac{2h}{\sqrt3}.
$$

The positive-sector vertices have coordinate-sign product $+1$:

$$
(+,+,+),\quad(+,-,-),\quad(-,+,-),\quad(-,-,+).
$$

The negative-sector vertices have coordinate-sign product $-1$:

$$
(-,-,-),\quad(-,+,+),\quad(+,-,+),\quad(+,+,-).
$$

Plainly: one F6c sector occupies one tetrahedron inside the cube and the other sector occupies the alternating tetrahedron. Their union has the cube as its convex hull; the two solid tetrahedra do not fill the cube.

For a checkerboard cube with $\mathbf g\in\{0,1\}^3$ and centered coordinates $d(\mathbf g-\tfrac12\mathbf1)$, the convention $s_{\mathbf g}=+1$ on even index sum places the positive checkerboard sites on the F6c negative-sector vertex set. The two colorings therefore agree exactly up to one global polarity conjugation, equivalently up to shifting the checkerboard index origin by one lattice step.

Plainly: the alternating corner geometry is exact, but which tetrahedron is called positive depends on the chosen checkerboard origin. That global label choice carries no extra geometry.

### What Does Not Transfer

The exact equality concerns track centers only. For nonzero F6c transverse radii, the instantaneous moving-member positions are displaced from those centers and generally are not cube vertices or regular-tetrahedron vertices. The F6c module labels, local track planes, circulation signs, phase offsets, six-coordinate reduction, causal roots, and retained-history obligations do not follow from the checkerboard coloring.

The cube hull is neither a boundary nor a binding mechanism. An infinite checkerboard also adds all shells of transmitters, whereas an isolated F6c cube contains only seven partner transmitters per receiver. The two acceleration ledgers are therefore different even when their eight visible positions coincide.

Plainly: matching the eight dots does not match the moving paths or the delayed interactions. The local picture is a scaffold, not a complete assembly.

### Isolated Frozen-Cube Contrast

The difference can be shown exactly. Freeze the eight equal-scale F6c centers on a sphere of radius $h$ for the complete relevant history. For a positive-sector receiver $\mathbf X$ with $\|\mathbf X\|=h$, the three same-polarity vertices contribute the outward radial coefficient $3\sqrt6/8$, while the four opposite-polarity vertices contribute the inward coefficient $(1+3\sqrt3)/4$. Hence

$$
\mathbf A_{\mathrm{cube}}
=
\frac{\kappa\epsilon^2}{h^3}
\left(
\frac{3\sqrt6}{8}
-
\frac{1+3\sqrt3}{4}
\right)
\mathbf X.
$$

Numerically,

$$
\frac{3\sqrt6}{8}
-
\frac{1+3\sqrt3}{4}
\simeq
-0.630479452132966.
$$

Plainly: the isolated frozen eight-member cube accelerates inward. The same local corner pattern embedded in the complete inversion-balanced checkerboard has zero stationary release acceleration because the exterior lattice supplies the missing opposite partners.

Claim grade: **derived** for the declared frozen eight-member history. The result is falsified by an exact evaluation of the seven partner contributions that changes the displayed coefficient. It is not a no-equilibrium theorem for nonzero-radius F6c histories and not evidence that the infinite checkerboard is retained.

## Candidate Orbiting-Site Map

### Site-Indexed Requirement

A valid moving population assigns one history to each $\mathbf g$. The orbit plane, radius, phase, circulation orientation, and polarity relation are functions of the physical site or of a globally declared periodic class. They are never assigned independently by each visible cube.

For a two-sublattice candidate, let $s\in\{+1,-1\}$ label checkerboard polarity and define

$$
\boldsymbol\delta_s(T)
=
\rho_s(T)
\left[
\mathbf p_s(T)\cos\theta_s(T)
+\chi_s\mathbf q_s(T)\sin\theta_s(T)
\right],
\qquad
\chi_s\in\{+1,-1\}.
$$

The corresponding population history is

$$
\mathbf X_{\mathbf g}(T)
=
\mathbf C(T)+dL(T)\mathbf g+\boldsymbol\delta_{s_{\mathbf g}}(T).
$$

Plainly: all positive sites share one declared sublattice history and all negative sites share another. The sign $\chi_s$ records circulation orientation; it is not inferred merely from polarity.

Polarity conjugation reverses architrino polarities at fixed worldlines. It does not by definition reverse circulation, phase, or the orbit-plane normal. Any candidate that combines polarity reversal with one of those geometric transformations must declare the additional relation separately.

### Selected First Seed

The smallest site-compatible seed uses one global plane with $\mathbf p=\hat{\mathbf x}$ and $\mathbf q=\hat{\mathbf y}$, equal radius $\rho$, and antiphase sublattice displacements

$$
\boldsymbol\delta_s(T)
=
s\rho
\left[
\hat{\mathbf x}\cos\theta(T)
+\hat{\mathbf y}\sin\theta(T)
\right].
$$

Its polarity-preserving translation lattice is

$$
\Lambda_{\mathrm{even}}
=
\left\{
\mathbf a\in\mathbb Z^3:
a_x+a_y+a_z\equiv0\pmod2
\right\}.
$$

A primitive basis is $(1,1,0)$, $(1,0,1)$, and $(0,1,1)$. Its determinant has magnitude two, so the fundamental cell contains exactly two physical sites: one of each polarity.

Plainly: this is the smallest periodic bookkeeping cell that preserves both polarity labels. It resolves the shared-corner conflict, but its global $xy$ orbit plane singles out the $z$ axis.

The prescribed circular prehistory for this seed is only an initial-history proposal. It becomes an EOM background only if release continues on the same periodic history, with complete roots, positive clearance, identity preservation, and a return record. No stability spectrum may be computed about it before that solution obligation closes.

## Shared-Vertex Compatibility

### Cell-Copy No-Go

**Lemma.** Independently copying the nonzero-radius F6c member track from every checkerboard cube cannot assign one circular orbit plane to a shared lattice vertex.

**Proof.** A lattice vertex belongs to eight adjacent cubes. Their center-to-vertex directions are the eight body diagonals $(\pm1,\pm1,\pm1)$. Opposite directions define the same unoriented plane normal, leaving four distinct unoriented normals. A copied F6c member track would require the shared architrino's circular path to lie in a plane perpendicular to each of those four normals. No nonzero-radius circle lies in four distinct planes. The only common cell-copy limit is $\rho=0$, where the orbit collapses to the shared point.

Plainly: opposite neighboring cubes agree on an unoriented axis, but the remaining cube pairs demand three other axes. One architrino cannot run four different circles at once.

Claim grade: **derived**. The lemma is falsified by an explicit nonzero-radius circular path and cell-to-member mapping that gives the same physical worldline for all eight incident cubes. A site-indexed assignment does not falsify the lemma because it abandons independent cell copying, which is the rejected construction.

### Candidate Compatibility Classes

| Candidate class | Shared-site verdict | Symmetry cost | Next proof burden |
| --- | --- | --- | --- |
| one global orbit plane | compatible: one plane and history per site | selects one preferred plane normal | determine whether the fixed law retains it and measure directional leakage |
| periodic multi-plane supercell | compatible in principle only when each site receives one plane from a global coloring | may balance plane counts, but a static single-plane site still lacks full site-centered cubic symmetry | exhibit the coloring, translation group, rotation action, and one-history covariance |
| three symmetry-related directional modes | compatible if the three modes sum to one composite site history | the path is generally not one planar circle | derive mode closure, phase locking, and the cubic rotation/time-shift action |
| polarity-conjugate two-sublattice assignment | compatible when conjugation acts on polarity at fixed declared worldlines | conjugation alone supplies no circulation or phase rule | declare every extra geometric transformation and verify the combined history symmetry |
| time-dependent orientation field | compatible when $(\mathbf p_{\mathbf g}(T),\mathbf q_{\mathbf g}(T))$ is one smooth site history | instantaneous cubic symmetry may still be broken while a time average is cubic | derive orientation dynamics, cadence, root completeness, and return |

Plainly: compatibility is easy to obtain by indexing motion by site. Cubic symmetry is the harder demand. A balanced-looking list of planes is not enough; rotations and translations must map the complete histories into one another.

### Static Single-Plane Cubic Obstruction

At a site fixed by the full cubic point group, one static orbit plane would require its unoriented normal line to be invariant under every cubic rotation. No nonzero line has that property: quarter-turns about two different coordinate axes move every candidate line. A static one-plane assignment therefore breaks full site-centered cubic symmetry.

This obstruction does not reject periodic multi-plane patterns whose cubic operations permute sites, three-mode histories, or time-dependent orientation fields. Those classes require explicit global covariance maps rather than local visual balance.

Plainly: a single circular clock face at one lattice site must point somewhere, and that direction is visible to the cube rotations. Hiding the direction requires more structure than one fixed plane.

## Common And Polarity-Differential Response Coordinates

### Translation-Symmetry Decomposition

Once an orbiting background is an actual EOM solution, a periodic perturbation may be decomposed by translation characters. For sublattice amplitudes $\boldsymbol\xi_+(\mathbf k)$ and $\boldsymbol\xi_-(\mathbf k)$, define

$$
\delta\mathbf X_{\mathbf g}(T)
=
\Re\!\left[
\boldsymbol\xi_{s_{\mathbf g}}(\mathbf k)
e^{i(\mathbf k\cdot d\mathbf g-\omega T)}
\right].
$$

The common and polarity-differential coordinates are

$$
\boldsymbol\xi_{\mathrm c}(\mathbf k)
=
\frac{\boldsymbol\xi_+(\mathbf k)+\boldsymbol\xi_-(\mathbf k)}{2},
\qquad
\boldsymbol\xi_{\mathrm d}(\mathbf k)
=
\frac{\boldsymbol\xi_+(\mathbf k)-\boldsymbol\xi_-(\mathbf k)}{2}.
$$

Equivalently, $\boldsymbol\xi_+=\boldsymbol\xi_{\mathrm c}+\boldsymbol\xi_{\mathrm d}$ and $\boldsymbol\xi_-=\boldsymbol\xi_{\mathrm c}-\boldsymbol\xi_{\mathrm d}$.

Plainly: $\boldsymbol\xi_{\mathrm c}$ moves both polarity populations together, while $\boldsymbol\xi_{\mathrm d}$ moves them against each other. The exponential is a bookkeeping device for periodic translations, not an imported material law.

The first response chart keeps the following coordinates separate:

| Coordinate | Native definition | Interpretation boundary |
| --- | --- | --- |
| common displacement | $\boldsymbol\xi_{\mathrm c}$ | no mechanical or gravity identity without a receiver map |
| polarity-differential displacement | $\boldsymbol\xi_{\mathrm d}$ | no electric identity without source and receiver conjugation tests |
| scalar compression | $\tfrac13\operatorname{tr}\delta L$ | no pressure or bulk modulus without a constitutive ledger |
| transverse shear | trace-free symmetric part of $\delta L$ | no elastic shear modulus without restoring response and action accounting |
| collective drift | $\dot{\mathbf C}$ | native translation relative to the Euclidean void, not observer velocity by definition |
| orbit-radius variation | $(\delta\rho_+,\delta\rho_-)$ | internal history coordinate |
| orbit-phase or cadence variation | $(\delta\theta_+,\delta\theta_-)$ | no clock, photon, or frequency identity without return and export |
| orbit-plane reorientation | variations of $\mathbf p_s,\mathbf q_s$ | no magnetic or tensor identity without a derived receiver coupling |

Plainly: the chart says how to separate motions before naming what observers would call them. The common/differential split is structural; the field labels remain hypotheses.

Common deformation may later contribute to density-, stress-, clock-, or effective-gravity-facing readouts. Polarity-differential displacement, phase, or circulation may later contribute to electric- or magnetic-facing readouts. These are **guessed** associations until one fixed source-to-background-to-receiver law recovers the corresponding effective behavior without per-observable retuning.

### Cubic Symmetry And Anisotropy

If a second-rank coefficient $M_{ij}$ is invariant under the full cubic rotation group, cubic quarter-turns force

$$
M_{ij}=m\delta_{ij}.
$$

Plainly: a true cubic scalar response cannot distinguish $x$, $y$, and $z$ at second tensor order. The single number $m$ multiplies the Euclidean identity $\delta_{ij}$.

Higher-order invariants can retain the lattice axes. For a unit direction $\hat{\mathbf k}$, the quartic cubic invariant

$$
I_4(\hat{\mathbf k})
=
\hat k_x^4+\hat k_y^4+\hat k_z^4
$$

equals $1$ along $[100]$, $1/2$ along $[110]$, and $1/3$ along $[111]$. Full cubic symmetry therefore does not imply directional equality at fourth order. A vector-response coefficient is itself rank four and can retain more than one cubic invariant even when its dependence on $\mathbf k$ begins quadratically.

Plainly: equal coordinate axes remove the simplest directional bias, but more detailed propagation or polarization measurements can still reveal the cube. A cube is not a sphere.

The required diagnostics compare equal-distance probes along $[100]$, $[110]$, and $[111]$ for arrival delay, growth or decay, dispersion, longitudinal/transverse separation, polarization leakage, and source-removal residual. Clock- or ruler-facing anisotropy is not reported until physical clock or ruler assemblies are included.

## Matter-Induced Deformation

Matter is represented by an additional retained assembly and its constituent causal-wake history. It is not represented by an external force, a prescribed potential, a pinned displacement, or a hand-authored strain map.

The smallest lawful source-on/source-off design is a source transit rather than sudden insertion and deletion. A complete source history begins outside the analysis region, enters or remains near it long enough to produce a declared loading window, and then departs under the same coupled EOM evolution. The source, lattice population, and boundary ledger evolve together. The source-off window begins only after the last declared direct source wake from the near-source interval has cleared the local probes.

Plainly: the source is never made to appear or disappear. It is an assembly with a history. The local region experiences a source-on interval while that assembly is nearby and a source-off interval after the assembly and its delayed direct wakes have left.

The comparison records:

1. the source-free background prefix;
2. the source assembly's member identities, branch grade, incoming history, and causal roots;
3. local common displacement and polarity-differential displacement;
4. orbit radius, phase, cadence, and plane orientation;
5. stress-facing and anisotropy diagnostics without promoting them to physical stress;
6. source recoil, background backreaction, wake, action, energy-facing, momentum, and angular-momentum entries;
7. the late source-off difference from the matched source-free run; and
8. any persistent excitation, changed branch, radiation-facing output, or unresolved boundary residual.

Persistent source-supported loading is the difference that remains while the source's near-history continues to reach the probes. A propagating transient is a delayed feature that travels away after the source has departed. Reversible relaxation requires the internal background coordinates and their rates to return to the declared source-free family after direct source wakes clear; it does not require erasing displacement or velocity already transferred to the population as a whole.

Plainly: continuing deformation while the source is nearby is not the same thing as a free wave. After the source leaves, the experiment asks whether the local internal structure settles, keeps ringing, changes branch, or fails.

The physical matter interpretation remains blocked until the source is itself a retained matter assembly. A prescribed candidate assembly may test record shape and fail-closed execution only; it must remain labeled `candidate_only` and cannot establish matter identity or Noether sea response.

## Periodic And Infinite-Medium Boundary Contract

| Boundary treatment | What it can establish | What remains uncontrolled or excluded |
| --- | --- | --- |
| finite open crop | literal evolution of the declared finite members and boundary | omitted exterior histories; boundary loading; no infinite-medium conclusion |
| periodic supercell | exact evolution of the declared periodically identified model when every periodic causal image consumed by the law is represented and certified | it may describe an artificial repeated source or perturbation; an implementation that truncates images is not an exact periodic medium |
| finite replicated neighborhoods | convergence trend across a declared replication ladder | omitted exterior histories remain an approximation until a derived tail bound and stable root identity close |
| receiver-centered exhaustion | exact stationary inversion-pair theorem and other receiver-local sums under the declared order | different receiver-centered crops are not automatically one globally evolving finite population; arbitrary rearrangement is excluded |
| screened or neutral-cell truncation | controlled approximation only after a neutral-cell multipole and far-tail bound are derived | screening cannot be assumed or fitted merely to make the sum converge |

Plainly: every boundary choice answers a different question. The exact stationary theorem uses a receiver-centered pairing rule. A moving medium needs one global population history, so it cannot inherit that theorem by silently giving each receiver its own changing crop.

The first periodic dynamics packet must declare one of two statuses:

- `periodic_exact`: the implementation represents the declared periodic image family, complete path histories, and all roots needed by the model; or
- `finite_replicated_diagnostic`: the implementation evolves a finite population and reports size dependence without an infinite-medium claim.

No omitted exterior contribution is written as zero. A finite-to-medium inference requires stable central observables, stable root identities, and a derived or measured tail envelope across the declared size ladder. Agreement of two finite sizes alone is a bounded convergence diagnostic, not an independent constitutive proof.

## First EOM-Solver Experiment

### Decision Sequence

The campaign is fail-closed and sequential:

1. certify the two-site history map and the selected boundary contract;
2. replay the exact stationary checkerboard control;
3. release the smallest site-compatible orbiting two-sublattice seed;
4. halt if that seed is not an actual EOM background;
5. only after background acceptance, run common, polarity-differential, and transverse perturbations; and
6. only after those rows remain admissible, run one localized source transit and late source-off comparison.

Plainly: later response measurements are meaningless if the unperturbed orbiting population is already leaving its proposed path. The experiment tests existence before response.

### Smallest Supercells

The algebraically minimal cell is the two-site primitive cell of $\Lambda_{\mathrm{even}}$. The smallest orthogonal cubic cell that preserves the checkerboard across every periodic face is the $2d\times2d\times2d$ conventional cell with eight sites. Use the two-site cell for zero-wave-vector common/differential existence screens and the eight-site cell for the first transverse and cubic-direction checks.

A localized source is not localized in an eight-site periodic cell because its images are adjacent. The source row therefore begins in a $4\times4\times4$ site cell and performs one predeclared image-separation check in a $6\times6\times6$ site cell if the smaller row remains admissible. Failure to reproduce the central response within the frozen tolerance leaves the source result finite-cell-only.

Plainly: two sites are enough to represent the two polarity histories. Eight sites are the smallest ordinary cube that closes the coloring through its faces. A source needs more empty separation from its periodic copies.

### Frozen Numerical Seed

The first prescribed-history seed uses $d=1$, $\rho=0.05$, $\theta(T)=T$, and the antiphase global-plane map above. It uses $c_f=1$, so the prescribed orbit speed is $0.05$. The initial nearest-pair clearance is at least $0.9$. The model binding supplies $\kappa$ and $\epsilon$; they are not fitted to this campaign.

Use a one-period release window $T_W=2\pi$, with primary step and history-segment scale $10^{-3}$ and one matched refinement at $5\times10^{-4}$. Freeze root-time tolerance $10^{-5}$, transmitter-side-factor floor $\nu_D=0.1$, pair-clearance floor $\delta_{\mathrm{pair}}=0.05$, and normalized symmetry-leakage tolerance $10^{-8}$ before execution. These are experiment admission values, not universal constants. If the current EOM solver contract requires stricter values, the stricter contract wins and the campaign fingerprint records the change before output is inspected.

Plainly: the orbit is deliberately small and slow compared with the unit lattice spacing and unit wake speed. The generous clearance and transmitter-side floor are guards against confusing a geometric failure with an immediate collision or nearly singular causal root.

### Run Matrix

| Run | Background or perturbation | Required boundary | Decisive output |
| --- | --- | --- | --- |
| `C0-stationary` | exact stationary checkerboard | receiver-centered exhaustion plus eight-site implementation control | exact zero release acceleration and independent-oracle agreement |
| `O0-orbit` | antiphase two-sublattice prescribed history, then free release | two-site `periodic_exact` or explicitly finite replicated diagnostic | one-period history return, root return, clearance, symmetry leakage, and growth record |
| `P-c` | $10^{-3}\hat{\mathbf x}$ common sublattice displacement | same accepted `O0` background and boundary | common-channel finite-window response relative to matched `O0` |
| `P-d` | $10^{-3}\hat{\mathbf x}$ polarity-differential displacement | same accepted `O0` background and boundary | differential-channel finite-window response and common-channel leakage |
| `P-t` | wave vector along $[100]$ with $10^{-3}\hat{\mathbf y}$ transverse displacement | eight-site cubic cell | transverse propagation delay, longitudinal leakage, and growth or decay |
| `S-on/off` | one additional source assembly, with its retention grade declared, entering, loading, and departing the probe region | $4^3$ site cell plus conditional $6^3$ image check | local loading, backreaction, departure time, last direct-wake time, and late residual |

Plainly: `C0` checks the exact theorem, `O0` asks whether the moving background exists, the three `P` runs separate response directions, and `S-on/off` tests a lawful source history without inserting an external potential.

### Mandatory Record For Every Run

Every row in the matrix emits the following fields, even when the value is `not_applicable` with a scope reason:

| Record family | Mandatory content |
| --- | --- |
| normalization and provenance | $c_f=1$, $d$, $\kappa$, $\epsilon$, run id, source commit, model-binding id, seed id, member ids, polarity ids, history hashes, and artifact hashes |
| initial history | complete authoritative position and velocity segments over the searched emission interval; prescribed versus evolved portion stated explicitly |
| causal roots | every ordered receiver/transmitter pair including self pairs, searched interval, root ids, brackets, residuals, $D_t$, $D_r$, $W^{\mathrm{acc}}$, inactive gaps, transition status, and no unresolved cell |
| numerical guards | $10^{-5}$ root-time tolerance, $|D_t|\ge0.1$, primary/refined step and history resolution, precision path, deterministic reduction, and halt code |
| boundary | finite, periodic, image stencil, receiver-centered exhaustion, or replication identity; omitted exterior status and tail bound if any |
| geometry | minimum pair clearance with floor $0.05$, orbit radii, phases, plane frames, common translation, linear deformation, and cell identities |
| speed allocation | common translation speed, common-mode speed, differential-mode speed, orbit-radius speed, phase speed, plane-reorientation speed, source speed, and maximum member speed; no aggregate may hide a channel crossing $c_f$ |
| symmetry and response | translation/sublattice leakage, common/differential cross-leakage, growth or decay rate, propagation delay, $[100]/[110]/[111]$ directional comparison when available, longitudinal/transverse split, polarization leakage, and dispersion |
| accounts | constituent acceleration contributions, wake record, action-facing entries, energy-facing entries, momentum, angular momentum, source recoil, boundary exchange, and unresolved residuals |
| source removal | source member location and branch status, last direct source-wake arrival, late common/differential/radius/phase/plane residuals, residual excitation, and backreaction |
| decision | `candidate_only`, `background_rejected`, `background_admissible_for_response`, `finite_cell_only`, or `response_candidate`; retained-branch and score decisions stated separately |

Plainly: the record is designed so a clean-looking displacement cannot hide a lost root, close approach, preferred direction, source recoil, or missing exterior history.

For any perturbation residual $R(T)>0$, report the finite-window separation rate

$$
g_{[T_1,T_2]}
=
\frac{1}{T_2-T_1}
\ln\!\left(
\frac{R(T_2)}{R(T_1)}
\right).
$$

Plainly: $g_{[T_1,T_2]}$ says whether the difference from the matched unperturbed run grew or shrank over one declared window. It is not a stability exponent unless `O0` is already an actual solution and refinement preserves the result.

### Admission And Halt Rules

`C0-stationary` passes only when the implementation reproduces the exact inversion-pair ledger and the independent oracle named by the certificate. `O0-orbit` advances only when all accepted steps have complete roots, all guards pass, the population returns after one period up to a predeclared translation, cubic-cell symmetry, member permutation, and time-section relation, and the complete history needed for the next period matches within refinement tolerance.

If `O0-orbit` fails, the result falsifies this global-plane antiphase seed under the declared boundary and numerical contract. It does not falsify every multi-plane, three-mode, or time-dependent orientation field. No perturbative stability, modulus, propagation, electromagnetic, gravity, or Noether sea claim is computed from a rejected background.

The source row halts if the source is not a retained assembly, fails to enter and depart under free coupled evolution, loses member identity, or leaves direct wakes in the probe window. A candidate source can still validate packet structure, but its decision remains `candidate_only`.

Plainly: the first campaign can decisively kill its selected orbit seed. It cannot prove that every possible moving cubic history fails, and it cannot call a prescribed source “matter.”

### Frozen Boundary-Replication Adjudication

The follow-on boundary test uses the EOM solver's literal finite-population path because the accepted solver contract exposes no exact periodic-image operator. It freezes an even-sided open-cube ladder with $N=2,4,6$ sites per coordinate direction. Every rung uses the same $d=1$, $\rho=0.05$, $\dot\theta=1$, $c_f=1$, root tolerance $10^{-5}$, $|D_t|\ge0.1$, and circular-history segment scale $5\times10^{-3}$. The history depths are respectively $2$, $6$, and $9$, each greater than the rung's maximum possible release-time pair delay. The resolution change from the first execution is confined to this matched release-only ladder; any evolved acceptance row returns to the frozen $10^{-3}$ evolution and history-segment scale.

For each even $N$, the probe is the central $2\times2\times2$ core whose coordinate indices are $N/2-1$ and $N/2$. Let $[A_{i\alpha}^-,A_{i\alpha}^+]$ be the EOM solver's certified release-acceleration enclosure for core member $i$ and axis $\alpha$. Interval subtraction from the same-polarity core mean gives a certified enclosure for every within-sublattice acceleration difference. Define $\lambda_A^-$ and $\lambda_A^+$ as the maximum lower and upper Euclidean-norm bounds, divided by $d$, over those eight members. The predeclared exact-symmetry ceiling is $10^{-8}$.

Plainly: only the middle eight sites are compared as the exterior grows. The interval lower bound proves a split when it is above the ceiling; the upper bound proves release-level equality to the frozen tolerance when it is below. A midpoint alone cannot decide either claim.

The ladder decision is fail-closed. All three rungs must certify complete ordered roots and preserve the frozen transmitter-side factor floor. If $\lambda_A^->10^{-8}$ at $N=6$, the controlled ladder has not removed release-level sublattice splitting and the campaign halts before evolved response rows. If $\lambda_A^+\le10^{-8}$ at any rung, that rung advances to a $T=0.01$ evolution at the original $10^{-3}$ scale; only a sampled displacement leakage no greater than $10^{-8}$ may advance toward the one-period history-return obligation. Intermediate overlap with the ceiling is unresolved. Monotone decrease across finite rungs is reported only as a bounded boundary-suppression trend; it is not an infinite-medium result because no exterior tail envelope has been derived.

Plainly: larger crops can show that the edge is becoming less important, but three finite cubes cannot stand in for an infinite medium. Response interpretation remains barred unless an evolved background first passes its own symmetry and full-period return tests.

## First Execution Record — 2026-08-24

### `C0-stationary`

`C0-stationary` passed. The structural verifier reconstructed 192 centered ledgers containing 105,600 rows, obtained exact zero under every declared receiver-centered inversion-symmetric exhaustion, and passed its tampered-row negative control. The independent 90-decimal-digit Python oracle passed both tests, including the first two shells and the centered cube and sphere exhaustions for both receiver polarities.

Plainly: the exact stationary theorem and the separately implemented numerical calculation agree. This remains an initial-acceleration result under the declared exhaustion, not a later-time or stability result.

### `O0-orbit`

The first `O0-orbit` execution used the eight-site $2\times2\times2$ conventional open crop with boundary status `finite_replicated_diagnostic`; it did not represent periodic images and supplied no omitted-exterior tail bound. The frozen seed used $d=1$, $\rho=0.05$, $\dot\theta=1$, $c_f=1$, primary step and history-segment scale $10^{-3}$, root tolerance $10^{-5}$, $|D_t|\ge0.1$, clearance floor $0.05$, and normalized symmetry-leakage tolerance $10^{-8}$. The source commit was `f7832f27cd8ccdeba36019b5c7445b6483b57b1f`; the EOM model fingerprint was `fnv1a64:fc524516eb6ffd2b`.

The release snapshot certified all 64 ordered receiver-transmitter root rows, including self rows. The first complete evolved checkpoint reached $T=0.1$ with 100 accepted steps, zero rejected steps, root multiplicity one, minimum $|D_t|=0.9587704977251473$, minimum pair clearance $0.8983607772552838$, and maximum member speed $0.06814940185824131$.

Define the sampled translation/sublattice leakage by

$$
\lambda_{\mathrm{sym}}(T)
=
\max_{s\in\{+,-\}}
\max_{\mathbf g:s_{\mathbf g}=s}
\frac{\left\|\boldsymbol\delta_{\mathbf g}(T)-\overline{\boldsymbol\delta}_s(T)\right\|}{d},
$$

where $\boldsymbol\delta_{\mathbf g}$ is displacement from the nominal site center and $\overline{\boldsymbol\delta}_s$ is the mean displacement of one polarity sublattice. The first sampled evolved frame at $T=0.01$ gave $\lambda_{\mathrm{sym}}=1.2777052448701059\times10^{-5}$, already above the frozen $10^{-8}$ ceiling. By $T=0.1$ it reached $1.2747867933924505\times10^{-3}$.

Plainly: roots, clearance, speed, and the transmitter-side factor remained admissible, but members assigned to one shared sublattice motion had already split. The first observed split exceeded the allowed leakage by more than three orders of magnitude and grew by about two further orders of magnitude by the first checkpoint.

The decision is `background_rejected` for this eight-site finite open crop. The run was halted after the first complete checkpoint and before the $2\pi$ endpoint, matched refinement, or any response row. Consequently, one-period history return is `not_evaluated_background_rejected_before_period`; this is not a full-period nonreturn result and not a `periodic_exact` result. `P-c`, `P-d`, `P-t`, and `S-on/off` were not run.

| Artifact | SHA-256 |
| --- | --- |
| `scripts/eom/attractor-ensemble-harness.cpp` | `fc0cf78a02b58336146843f51482c7fc67038c7951d493dfd62307da455325c9` |
| `scripts/mapping-electromagnetism/f6c-cubic-lattice-o0-analysis.mjs` | `40a4ed89648fd97f8525ad6f5e0dabb3c4d452e336a25397156bce47ee5e7849` |
| `.tmp/eom-native-dev/attractor-ensemble-harness` | `b09563264ef5f7ae8d9fa29f66d6d04894465dbe5762d4ff53f52162d2b238ee` |
| `.tmp/f6c-cubic-lattice-o0-primary/release-acceleration.json` | `74b722f6d75e9dfe39256015ffe40098dc250d11c8a99e97323137a937c377be` |
| `.tmp/f6c-cubic-lattice-o0-primary/checkpoint.bin` | `497dcc341fbd8811eae8ba063fb71d9e0387067fd142618f1095e98ffd150a34` |
| `.tmp/f6c-cubic-lattice-o0-primary/run-manifest.json` | `6adc5967c0d52bf020432e4d0830018511c1817373fec1135d4f190e022bbd49` |
| `.tmp/f6c-cubic-lattice-o0-primary/census.jsonl` | `add8a511c7c07b42ab1cb4dde8815b99699c69384da59343f4e76935da2dab53` |
| `.tmp/f6c-cubic-lattice-o0-primary/frames.jsonl` | `eb2a53d74bd07c27d1579089cb5f7de070f4efc634cf4a151c302ec49ee5b1ab` |
| `.tmp/f6c-cubic-lattice-o0-primary/assembly-view-record.json` | `13e6aa324d6b60ea3f50c31d75d3358f15f59a00b0a8eaa4720fc2de0bb71b0e` |

Plainly: the hashes bind the source, executable, release-root record, atomic checkpoint, manifest, guard census, sampled frames, and complete retained-history export used for this verdict. The `.tmp` paths are local campaign artifacts rather than corpus files, so the hashes are the durable identity record.

Claim grade: **measured** by the EOM solver finite-replicated diagnostic and [F6c cubic-lattice O0 analyzer](../../../scripts/mapping-electromagnetism/f6c-cubic-lattice-o0-analysis.mjs). The analyzer is independently unit-tested for fail-closed symmetry rejection, but it consumes the EOM output and is not an independent numerical oracle for the evolution law. The result is falsified by rerunning the immutable seed and obtaining $\lambda_{\mathrm{sym}}\le10^{-8}$ through the accepted window under the same finite boundary and model fingerprint. It does not reject a `periodic_exact` implementation, a larger replication ladder, or a different multi-plane or time-dependent orientation field.

Plainly: the finite crop is not an admissible orbiting background, so the campaign stops before response interpretation. The missing exterior is a real boundary limitation; this result cannot decide whether exact periodic images would preserve the two-sublattice motion.

## Boundary-Replication Execution Record — 2026-08-24

The exact-periodic branch was unavailable because the EOM solver exposes no declared periodic-image operator. The frozen finite-population ladder therefore ran all three release-only rungs under the matched boundary-replication contract above. Every ordered receiver-transmitter root certified complete, including self rows, and every rung remained above the frozen transmitter-side factor floor.

| Side $N$ | Population | Certified ordered roots | Minimum $|D_t|$ | Central $[\lambda_A^-,\lambda_A^+]$ | Release decision |
| ---: | ---: | ---: | ---: | ---: | --- |
| 2 | 8 | 64 | 0.9589306106079758 | $[0.25560231632607944,0.2556023469894772]$ | split certified |
| 4 | 64 | 4,096 | 0.95024521886386 | $[0.00870106901997119,0.0087012282040274]$ | split certified |
| 6 | 216 | 46,656 | 0.9500436706013619 | $[0.004435524911261452,0.004435826109163563]$ | split certified |

Plainly: the central split became smaller as exterior layers were added, so the original eight-site failure was strongly boundary-driven. It nevertheless remained decisively nonzero at every declared rung. At $N=6$, even the certified lower bound exceeded the $10^{-8}$ ceiling by more than $4.4\times10^5$.

The upper enclosure fell by a factor of approximately $29.38$ from $N=2$ to $N=4$, by $1.96$ from $N=4$ to $N=6$, and by $57.62$ across the full ladder. This is a measured bounded boundary-suppression trend. It is not an infinite-medium extrapolation: the three points do not supply a derived tail law, and the slowing suppression between the last two rungs is not fitted to one.

The predeclared decision is `declared_ladder_did_not_remove_release_split`. The campaign halted before any $N=6$ evolved step because release-level same-sublattice accelerations already violate the background symmetry obligation. One-period EOM history return remains `not_evaluated_background_rejected_before_period`; `P-c`, `P-d`, `P-t`, and `S-on/off` remain `not_run`. Exact periodic images remain untested rather than rejected.

Plainly: this closes the finite-ladder question by falsification under its declared sizes. It does not prove that the split survives an infinite lattice or an exact periodic-image construction. Those require a new solver capability or a controlled exterior tail, not a response interpretation of these rejected finite backgrounds.

| Artifact | SHA-256 |
| --- | --- |
| `scripts/eom/attractor-ensemble-harness.cpp` | `eeeca0e89561b4754e026bcc355b8e251b329e8f860bdd8208a06b76c872ab05` |
| `scripts/mapping-electromagnetism/f6c-cubic-lattice-o0-analysis.mjs` | `b24ba23064de9d969337e11653bda77947a7c14af097fe7dcf419a3344a1c05c` |
| `tests/f6c-cubic-lattice-o0-analysis.test.js` | `81a45b9100a1c9c2ff5e7fd9ce5bdc59bbc71bd44b854038d9e6796f3f59681c` |
| `.tmp/eom-native-dev/attractor-ensemble-harness` | `80f10273725c16754a9ba59ee9ac31c69fd77667dff5a52b259c6093d110c5ed` |
| `.tmp/f6c-cubic-lattice-o0-ladder-n2/release-acceleration.json` | `9acec5c332a9ace3e1caa385c0e0d4ccf23476e0eaa8dbd264b7aa1e8bfcfb04` |
| `.tmp/f6c-cubic-lattice-o0-ladder-n2/run-manifest.json` | `309b1ef25476d5448da958afc49ede24f89a446fc953a9dfee1ce9e534e743f9` |
| `.tmp/f6c-cubic-lattice-o0-ladder-n4/release-acceleration.json` | `aff66db6d110c956a29624b46508fa69d24b0e77ef1296b231394a5b42dbebc3` |
| `.tmp/f6c-cubic-lattice-o0-ladder-n4/run-manifest.json` | `36aac90b19180822f347a2d7f31275585d8be1b2843dee3c3f1f3bccc1e6151e` |
| `.tmp/f6c-cubic-lattice-o0-ladder-n6/release-acceleration.json` | `b211319b85c35b9e9bc0fc0874726459da02764145cb767f8f13e71179e1dc40` |
| `.tmp/f6c-cubic-lattice-o0-ladder-n6/run-manifest.json` | `8439a67783c99b0aee98c7a58fe98bfcd9b8b027f8be75d9b870da0ae8ec2456` |

Claim grade: **measured** by the EOM solver finite-replicated release diagnostic. The interval analyzer is independently unit-tested for lower/upper enclosure propagation and fail-closed ladder adjudication, but it consumes EOM solver output and is not an independent oracle for the acceleration law. The finite-ladder verdict is falsified by rerunning the frozen $N=2,4,6$ packet and obtaining $\lambda_A^+\le10^{-8}$ at one rung with the same guards and complete roots. The broader exact-periodic or infinite-medium possibility is falsified only by an instrument that actually represents that boundary and returns a split.

Plainly: the measurements decisively answer the experiment that was run. Their claim stops at the finite open cubes that produced them.

## Claim Grades And Falsifiers

| Claim | Grade | Assumptions | Operator-checkable falsifier |
| --- | --- | --- | --- |
| checkerboard polarity alternates on every one-step move | derived | integer parity coloring | one unit coordinate step that preserves $s_{\mathbf g}$ |
| equal-scale F6c track centers are one alternating cube | derived | common center, dual tetrahedral axes, $h_+=h_-$ | direct coordinate substitution fails to give the eight cube vertices |
| F6c moving members are the same cube vertices | rejected except at $\rho_+=\rho_-=0$ | exact F6c member map | a nonzero-radius map whose moving members remain those eight centers at every phase |
| stationary checkerboard release acceleration vanishes | derived | complete stationary history and receiver-centered inversion-symmetric exhaustion | a certified admitted inversion pair or centered exhaustion with nonzero sum |
| uniform nonsingular linear deformation preserves that cancellation | derived | fixed invertible linear $L$ | an $L$ satisfying the assumptions but violating pair opposition |
| the stationary family supplies nonzero homogeneous restoring acceleration | not established; contradicted within the stationary family | same stationary hypotheses | a nonzero derivative of the exact stationary acceleration along that affine family |
| independent cell-by-cell F6c orbit copying is compatible | rejected for nonzero-radius circular tracks | eight incident cube centers and copied radial track normals | one nonzero circle satisfying all incident cell-plane demands |
| the selected global-plane two-sublattice history is site-compatible | derived geometry | one history assigned by sublattice | one site receives two different histories under the declared translation cell |
| the selected history is retained and stable | rejected for the rigid eight-site evolution, rigid $N=2,4,6$ release-symmetry ladder, and parity-tetrahedral site-local circular $N=2,4,6$ release-consistency ladder; `periodic_exact` case open | complete periodic EOM solution and response record | the finite-crop release failures reject those runs; a periodic case still requires its own complete return record |
| common/differential coordinates map to gravity/electromagnetism | guessed | fixed source, background, receiver, and constitutive maps | wrong conjugation, parity, source, propagation, receiver, or null-control behavior |
| cubic symmetry gives effective isotropy | not established | requires the exact tensor and order | directional or polarization residual surviving refinement; quartic cubic invariants already permit axis visibility |
| localized source deformation is reversible | guessed | retained source, accepted background, lawful departure, closed boundary ledger | nonreturn, branch change, residual excitation, missing recoil, or unresolved exterior history |
| the candidate is the physical Noether sea | guessed | retained population, constitutive closure, transparency, response, abundance, and observer recovery | failure of any required selection, response, propagation, backreaction, or isotropy row |

Plainly: the exact claims can be checked with coordinates and paired acceleration rows. Every physical interpretation still has a direct way to fail in the EOM or receiver records.

## Current Evidence Boundary

The current evidence establishes six hard facts:

1. the checkerboard coloring is bipartite and locally matches the equal-scale F6c center cube up to global polarity convention;
2. the complete stationary checkerboard cancels exactly under its declared exhaustion, including fixed nonsingular uniform linear deformation;
3. the isolated frozen eight-member F6c cube has nonzero inward release acceleration, so local visual equality does not equate the finite and infinite ledgers; and
4. independent cell copying cannot assign a nonzero-radius F6c circular track to shared vertices;
5. the first eight-site finite open-crop `O0` run violates the frozen translation/sublattice-symmetry guard before a one-period history comparison can be made; and
6. the matched $N=2,4,6$ finite replication ladder shows monotone central boundary suppression but certifies nonzero release splitting at every rung.
7. the parity-tetrahedral site-local orientation field has exact second moment $I/3$ on every even cell, but its prescribed circular acceleration is excluded by the certified EOM release acceleration at $N=2,4,6$; the maximum normalized residual lower bounds are respectively $0.2680958096054972$, $0.24509272401555549$, and $0.2450927240155446$ against the frozen $10^{-8}$ tolerance.

No EOM-solver record currently establishes an orbiting cubic background, stiffness, perturbative stability, propagation, reversible matter loading, energy closure, effective isotropy, physical Noether sea identity, electric or magnetic field recovery, gravity recovery, photon or gravitational-wave transport, Lorentz recovery, matter identity, or cosmological selection. The first rigid finite open-crop evolution, the rigid release ladder, and the first site-local release ladder instead reject their backgrounds before the one-period return stage.

Plainly: the document closes the geometry and defines the experiment. It does not close the proposed medium.

The rigid global-plane, two-sublattice history is no longer the next moving-medium candidate. The [Adaptive Cubic-Medium Kinematics And Ledger Contract](adaptive-cubic-medium-kinematics-and-ledger-contract.md) supplies the successor representation, EOM seed interface, release falsifier, and directional decision rule. Its first parity-tetrahedral circular instantiation balances the orientation census exactly but fails EOM release consistency across the declared finite ladder. Neither failure excludes every site-local or reorganizing history, but no accepted adaptive background, exact periodic or controlled exterior-tail boundary, or retained Physical Observer record exists. No new response campaign is admissible until those prerequisites close.

Plainly: the rejected rigid seed remains a useful control. The flexible description is ready to evaluate an EOM history, but it is not evidence that such a repeating medium exists or hides its cubic axes.

## Local Provenance

- [F6c Geometry](f6c-geometry.md) supplies the exact tetrahedral axes, member map, track-center versus moving-member distinction, equal-scale *stella octangula*, cube hull, and F6c claim boundaries.
- [Session 23 — Deformable Alternating Cubic Sea With Orbiting Sites](brainstorming.md#session-23--deformable-alternating-cubic-sea-with-orbiting-sites-2026-08-24) supplies the candidate synthesis, descriptive site history, common/differential idea, and original proof burden.
- [Adaptive Cubic-Medium Kinematics And Ledger Contract](adaptive-cubic-medium-kinematics-and-ledger-contract.md) supplies site-local history reconstruction, cutoff-robust neighbor selection, lawful reclassification decisions, and the matched Physical Observer directional adjudicator.
- [Adaptive Cubic-Background O0 Audit](adaptive-cubic-background-o0-audit-2026-08-25.json) applies the continuous EOM-history return and instantaneous site-chart consumer to the provenance-bound eight-site run and records its four blocking prerequisites.
- [Adaptive Site-Local Release Ladder Audit](adaptive-cubic-site-local-release-ladder-audit-2026-08-25.json) records the exact orientation census and the release-consistency falsification across the $N=2,4,6$ finite ladder.
- [Simple-Cubic Checkerboard Stationary-Release Cancellation Certificate](../dormant-deferred/app-lattice-lab/simple-cubic-checkerboard-cancellation-certificate.md) supplies the exact stationary one-axis theorem, generative acceleration ledger, independent structural verifier, and independent high-precision oracle.
- [Architrino Lattice Lab Requirements](../dormant-deferred/app-lattice-lab/requirements-design.md) supplies the display-versus-evidence boundary and the rule that a positive lattice claim needs exact geometry, history, root class, boundary treatment, reproducible residual or proof, and an independent check.
- [Noether Sea](../../../content/markdown/aaa/spacetime/noether-sea.md) supplies the container/medium/effective-geometry distinction, the retained-population obligation, and the constitutive selection boundary.
- [Simulation Run Protocols](../../../content/markdown/aaa/validation/simulations/run-protocols.md) supplies the absolute-frame campaign, provenance, root, refinement, negative-control, and independent-reference requirements.

Closure goal: derive or construct one self-consistent adaptive-background existence record with an exact periodic-image or controlled exterior-tail boundary, one-period EOM history return, and a retained Physical Observer candidate before running matched directional response rows.
