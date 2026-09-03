# Constructing the Absolute Frame

This chapter answers a question that sounds like an objection: if the [Euclidean void](euclidean-void.md) — the fixed, featureless space that everything in $\mathbb{A}\mathbb{A}\mathbb{A}$ happens inside — has no grid painted onto it, how can the theory ever use coordinates?

The answer is reconstruction. A usable frame is *built* from the geometry that is already there, rather than assumed as a label space came with. The raw material is the paths [architrinos](architrino.md) trace, the transmitter-tagged wakes they emit, ordinary Euclidean distances measured on one slice of absolute time, and the path-history records needed to compare them. The coordinate frame that comes out is a mathematical and computational representation — a convenience — and not an additional ingredient of reality.

## Overview

The previous chapter showed how transmitter-tagged wake centers identify the preferred rest structure, and how a stationary architrino can supply a convenient material origin when one happens to be available. The next task is more ordinary and just as necessary: build a complete coordinate system.

The void provides no intrinsic markers. There is no point labeled "here," no arrow painted "this way," and no universal clock reading "now = 0." Those absences are not defects. They are exactly why coordinates have to be inferred from geometry rather than treated as something space came equipped with.

The conceptual sequence runs across three chapters. [Detecting the Absolute Frame](detecting-the-absolute-frame.md) identifies absolute rest, [Absolute Time Defense](absolute-time-defense.md) defends the global temporal record, and [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md) explains how the clocks an observer actually reads arise once a frame is in place.

The coordinate system built here is a workbench tool. It lets the theory write equations in components, run simulations, and compare descriptions. The universe requires none of it. Architrinos interact through their wakes according to laws that make no reference to axes, and the physics proceeds whether or not anyone labels anything.

The useful image is graph paper laid over a drawing that already exists. The paper helps you measure and compare; it did not create the distances, the rest condition, the wakes, or the paths. That is why the reconstruction can be mathematically exact while remaining unavailable as a laboratory procedure to an observer made of assemblies.

So the claim is narrow, and stating its narrowness is the point. From the complete-state perspective — knowing every architrino position exactly — a unique oriented basis can be defined once an ordered set of reference architrinos and a handedness convention are fixed. That is an existence proof. It is not a protocol anyone inside the system can carry out.

The mathematics is small. The Euclidean metric plus a well-chosen ordered triple supplies an origin, two axes, and a handedness convention. What matters is the lemma, the precise conditions under which it fails, and one distinction that is easy to lose: coordinate handedness is not physical handedness.

## Reconstruction Existence Lemma

Fix one slice of absolute time, $\Sigma_{T_\ast}$ — a complete snapshot of space at one instant. Suppose the wake geometry identifies an origin point $O$ on that slice, and write $\mathbf X_O(T_\ast)$ for that fixed point of the void. It may be occupied by a stationary architrino, or reconstructed from a tagged emission center and carried to this slice by the fact that void points keep their identity forever.

Now choose two architrinos $A$ and $B$ whose positions satisfy

$$
\mathbf{d}_1=\mathbf X_A(T_\ast)-\mathbf X_O(T_\ast)\ne\mathbf{0}
$$

[View →](../../../../equation-mapping.html#corpus-equation-703cdd1a293f81c3)

so the first one is not sitting on the origin, and

$$
\mathbf{d}_2=\mathbf X_B(T_\ast)-\mathbf X_O(T_\ast),
\qquad
\|\mathbf{d}_1\times\mathbf{d}_2\|\ne0
$$

[View →](../../../../equation-mapping.html#corpus-equation-9d9f0c637c1adaba)

so the two displacements are not parallel. The cross product $\mathbf{d}_1\times\mathbf{d}_2$ has length equal to the area of the parallelogram they span, so requiring it nonzero is requiring that they actually span a plane rather than lying along one line.

The first axis is then just the first displacement, scaled to unit length:

$$
\hat{\mathbf e}_1=\frac{\mathbf{d}_1}{\|\mathbf{d}_1\|}
$$

[View →](../../../../equation-mapping.html#corpus-equation-9ab08029dbdf3267)

and the second axis is what remains of the second displacement after removing everything pointing along the first:

$$
\mathbf{d}_2^{\perp}=\mathbf{d}_2-(\mathbf{d}_2\cdot\hat{\mathbf e}_1)\hat{\mathbf e}_1,
\qquad
\hat{\mathbf e}_2=\frac{\mathbf{d}_2^{\perp}}{\|\mathbf{d}_2^{\perp}\|}
$$

[View →](../../../../equation-mapping.html#corpus-equation-a0ffdb7086cc4c79)

Read it as two arrows. The first displacement is the first arrow out of the origin. The second fixes which plane you are working in. Subtracting the component along $\hat{\mathbf e}_1$ leaves something perpendicular to it, and normalizing gives the second axis.

With two perpendicular axes fixed, only one choice remains, and it is binary: the third axis is perpendicular to both, and there are exactly two directions available. Declaring an orientation convention picks one, and the right-handed completion is

$$
\hat{\mathbf e}_3=\hat{\mathbf e}_1\times\hat{\mathbf e}_2
$$

[View →](../../../../equation-mapping.html#corpus-equation-ca4ef3def46df100)

### What the tuple actually removes

Geometrically, the lemma picks one specific frame out of all possible frames at that point. In plainer terms, the ordered triple removes the freedom to slide the origin anywhere and spin the axes freely.

Those continuous freedoms are the translations and rotations of the special Euclidean group:

$$
SE(3)=\mathbb{R}^3\rtimes SO(3)
$$

[View →](../../../../equation-mapping.html#corpus-equation-b399e459906d0fd5)

three directions to slide combined with three-dimensional rotation, and the $\rtimes$ recording that the order of the two operations matters. This is the part of the full symmetry group $E(3)=\mathbb{R}^3\rtimes O(3)$ that can be reached by continuous motion from doing nothing.

The remaining handedness choice is the part that cannot. Reflections are disconnected from rotations — no amount of turning converts a left hand into a right one — and that disconnection is exactly the two-element set $\pi_0(O(3))\cong\mathbb{Z}_2$.

So the two signs are not a hidden physical fact awaiting discovery. They are the leftover discrete choice after the ordered tuple has used up all the continuous freedom.

### Where it fails

The construction fails in exactly one circumstance: the reference data do not define a plane. That happens if the first architrino sits on the origin, or if the two displacements are parallel:

$$
\|\mathbf{d}_1\|=0
\qquad\text{or}\qquad
\|\mathbf{d}_1\times\mathbf{d}_2\|=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-5e179351141d1a8a)

For simulation on finite-precision arithmetic, exact nondegeneracy is not enough, because *nearly* parallel is nearly as bad as parallel. The tuple should carry a conditioning floor:

$$
\frac{\|\mathbf{d}_1\times\mathbf{d}_2\|}
{\|\mathbf{d}_1\|\,\|\mathbf{d}_2\|}
\ge
\sin\theta_{\min} > 0
$$

[View →](../../../../equation-mapping.html#corpus-equation-4d911da3b862103f)

The left side is the sine of the angle between the two displacements, and dividing by both lengths makes it dimensionless so the test does not depend on how far away the reference architrinos happen to be.

When that floor is small the subtraction defining $\hat{\mathbf e}_2$ removes almost everything, leaving a small remainder dominated by rounding error, and the completed $\hat{\mathbf e}_3$ amplifies it. A simulator should pick a better-conditioned tuple rather than treating a nearly-collinear basis as an ordinary success.

This floor is one instance of a pattern used throughout the foundations, and the shared idea is worth naming once: **do not trust a reconstruction that would change wildly under a tiny perturbation.** For causal-root charts the guard is a transversality floor such as $\lvert\partial_{T_t}F_{ij}\rvert\ge\kappa_{\mathrm{hit}}$; for basin partitions it is a separatrix floor; here it is the angle between two normalized directions. In every case the mathematical content is controlled local invertibility — the map has a bounded inverse on the retained chart, so small changes in the data cannot produce a different frame or a different branch.

### The fourth marker

If a fourth architrino $C$ is introduced, it lies off the plane of the first three exactly when

$$
\mathbf{d}_3=\mathbf X_C(T_\ast)-\mathbf X_O(T_\ast),
\qquad
V_{\mathrm{vol}}=\mathbf{d}_3\cdot(\mathbf{d}_1\times\mathbf{d}_2)\ne0
$$

[View →](../../../../equation-mapping.html#corpus-equation-60b3c28cbc6bba07)

The quantity $V_{\mathrm{vol}}$ is the volume of the parallelepiped the three displacements span, and it vanishes precisely when they are flat. Its sign says which side of the oriented plane the fourth marker sits on.

That sign reports a convention. It does not, on its own, make anything physically handed — a distinction the chapter returns to below, because it is the easiest error to make here.

This lemma is an existence claim at the complete-state level. It does not say the void contains an origin or preferred axes. It says that once a nondegenerate ordered tuple is selected, the Euclidean metric supplies enough structure to build a basis for calculation.

## Minimal Reconstruction Procedure

The lemma is the whole construction. Complete-state bookkeeping makes four choices, and each adds coordinate language without adding physics:

1. **Choose an origin** $O$ on $\Sigma_{T_\ast}$. A stationary architrino supplies a material origin, but a reconstructed emission center works too. If that emission happened at $T_t\ne T_\ast$, the origin is the same fixed void point carried across slices by spatial identity — not the original event on its own slice.
2. **Choose a non-coincident architrino** $A$ and set $\hat{\mathbf e}_1=\mathbf{d}_1/\|\mathbf{d}_1\|$. This fixes a reference direction, not a physically preferred one.
3. **Choose a non-collinear architrino** $B$ and project out the part of $\mathbf{d}_2$ along the first axis to define $\hat{\mathbf e}_2$. This removes the remaining freedom to roll around $\hat{\mathbf e}_1$.
4. **Declare a handedness convention** and set $\hat{\mathbf e}_3=\hat{\mathbf e}_1\times\hat{\mathbf e}_2$, optionally using a fourth architrino as a marker for reporting which convention was chosen.

The freedoms removed are translation and rotation. Choosing where time zero falls remains a separate convention.

The basis does not need rebuilding on each slice. Once fixed on $\Sigma_{T_\ast}$ it transports unchanged across all absolute-time slices, because void points keep their identity. In the rest frame where the wake speed is the same in every direction, the completed connection is flat, so that transport is path-independent — carrying the frame by one route or another gives the same answer, as described in [Absolute Timespace](absolute-timespace.md#newton-cartan-data).

That matters for delayed interactions specifically. The root condition $\|\mathbf X_{o'}(T_r)-\mathbf X_j(T_t)\|=c_f(T_r-T_t)$ compares positions at two different times, so it only means anything if both are expressed in the same spatial chart. A single transported frame provides that; separately reconstructed per-slice frames would not.

The procedure fails only on degenerate or ill-conditioned reference data. In that case bookkeeping picks a different tuple. The failure belongs to the chosen data, never to the void.

## Parity Convention and Dynamical Chirality

This is the section the chapter exists to get right, because conflating these two things is a genuine error rather than a matter of wording.

Coordinate handedness is a convention. It chooses which side of an already-defined plane gets called positive $\hat{\mathbf e}_3$. A marker architrino $C$ reports the choice through

$$
V_{\mathrm{vol}}=\mathbf{d}_3\cdot(\mathbf{d}_1\times\mathbf{d}_2)
$$

[View →](../../../../equation-mapping.html#corpus-equation-ac975a3834957f4d)

with positive and negative values selecting opposite sides once an orientation has been declared. The sign of $V_{\mathrm{vol}}$ does not make anything physically handed.

The two live in different places. Coordinate handedness is a property of the chart — a label you assigned. **Dynamical chirality** is a property of the physical configuration, and would have to be an invariant of the retained branch record, surviving any smooth deformation that preserves the branch. A simulation may line the two signs up as a reporting convention, but a nonzero $V_{\mathrm{vol}}$ never implies that the assembly is chiral.

Dynamical chirality is reserved for a handed marker carried by the assembly itself. Ordered precession, axial-frame exposure, reaction provenance, and braid handedness may all feed such a marker, but the deformation-stable object should be a topological invariant — for example a framed self-linking sign,

$$
Lk(\gamma,\gamma^{\mathrm{fr}})
=
\operatorname{Wr}(\gamma)+\operatorname{Tw}(\gamma,\gamma^{\mathrm{fr}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-b3e9e39386cbd52e)

for a closed framed trace. This splits total linking into two parts: the **writhe** $\operatorname{Wr}$, counting how the curve coils around itself in space, and the **twist** $\operatorname{Tw}$, counting how the frame rotates as you travel along it. Each can change under deformation; their sum cannot. The linking number between distinct worldlines serves the same purpose.

If the branch record supplies a nonzero handed marker, a simulation may choose its coordinate convention so that $\operatorname{sgn}(V_{\mathrm{vol}})$ matches $\operatorname{sgn}(Lk)$. If the linking row is zero, uncomputed, or not protected under branch-preserving deformation, then coordinate parity is a reporting convention carrying no physical content.

There is a real restriction on when this is available. The self-linking row is defined only on a closed return cycle or an explicitly closed, nonsingular framed trace. An open worldline carries no deformation-invariant writhe on its own, and a near self-hit or a fold crossing is exactly where the framing degenerates.

So chirality is a regular-branch certificate: admissible where the retained roots and the frame have positive floors, including $\kappa_{\mathrm{hit}}>0$ on the relevant rows. At a fold, a reconnection, or a framing slip, $Lk$ can jump — and that jump is a physical branch transition, not a change of convention.

## Coordinate Frames Are Not Ontology

The void has no preferred origin, no intrinsic axis labels, and no substrate marker for clockwise against counterclockwise. At the ontological level architrinos move and interact through Euclidean separations, tagged wakes, and the directions along which those wakes act. Coordinates describe those relations; they do not cause them.

The procedure serves theory-building and simulation: writing the master equation in components, running numerical work, communicating results, and comparing frames.

None of the invariant content depends on the frame. A left-handed coordinate system and a right-handed one give identical predictions for every measurable quantity, differing only in the signs attached to pseudovectors and pseudoscalars — quantities that flip under reflection precisely because handedness was baked into their definition.

Origin, first axis, and plane suffice for distances, derivatives, scalar products, and component equations. Handedness matters only when reporting cross products and other parity-sensitive coordinate quantities.

## Complete-State and Physical-Observer Access

A final distinction separates three layers that are easy to run together. The substrate holds architrinos, wakes, absolute time, the void, and the contents of the Noether sea. Complete-state bookkeeping can infer a frame from that full record. Observers reach only effective records, through clocks, rulers, and signals that are themselves assemblies.

**Complete-state reconstruction** has every position and can compute wake geometry exactly. The coordinate system is a data structure: an origin offset plus three orthonormal vectors.

**Observer access** cannot do this. An observer's rulers and clocks are assemblies, deformed by motion and by coupling to the medium. What they measure is proper time $\tau$ rather than absolute time $T$, effective coordinates from local rulers, and relative velocities from Doppler shifts and aberration.

The obstruction is structural rather than practical, which is why no improved technique defeats it. No operation on the summed received potential recovers the transmitter-tagged center set $\{\mathbf Z_a(T_t)\}$ without provenance already in hand. Transmitter identity, emission time, and wake-center tags are complete-state entries; once an observer holds only the sum, no cleverer reconstruction restores them.

Stated as a map, let $\mathcal{T}$ be the tagged record and

$$
Q_{\mathrm{erase}}:\mathcal{T}\to\mathcal{T}/\!\sim_{\mathrm{erase}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-b154232fac8d3d1c)

the operation that forgets the labels only complete-state bookkeeping retains. The observer's record lives on the far side of that map.

Reconstructing the absolute frame would require inverting it — choosing, for each unlabeled record, which tagged configuration produced it. No such choice is determined by the summed potential, because many different tagged configurations produce the same unlabeled record, and nothing in the record distinguishes them. This is the same label-erasure structure that appears in the provenance-leakage bound of [Architrino](architrino.md#provenance-and-persistence).

So the reconstruction here is a **foundational consistency proof**. It shows the theory has the structure needed to define absolute rest and an absolute frame **in principle**, from complete data. It claims nothing about an embedded observer's ability to do it.

The matching closure target sits at the other end: moving-assembly deformation, clock and ruler retuning, and two-way signal synchronization must bound preferred-frame leakage tightly enough that observers cannot detect the absolute frame operationally — while the frame remains the background beneath their effective geometry. Both halves are needed. A frame that observers could detect would contradict a century of null results; a frame that could not exist would leave the theory without a substrate.

For the effective layer built on this scaffold, see [Lorentz Kinematics](../spacetime/lorentz-kinematics.md) and [Emergent Metric](../spacetime/emergent-metric.md).
