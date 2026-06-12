# Reconstructing a Coordinate Frame from Wake Geometry

This chapter explains how a usable coordinate frame can be reconstructed from complete-state wake geometry rather than assumed from pre-labeled space. The ontological data are architrino worldlines, source-tagged causal wakes, Euclidean distances on an absolute-time slice, and the path-history records needed to compare them. The coordinate frame reconstructed from those data is a mathematical and computational representation, not an additional constituent of the ontology.

## Overview

Having established in the previous chapter that source-tagged wake centers identify the preferred rest structure, and that a stationary architrino supplies one convenient material origin when available, the next task is to reconstruct a complete coordinate system. The Euclidean void provides no intrinsic markers: no origin point labeled "here," no arrows painted "this way," and no universal clock displaying "now = 0." Those absences are not defects in the ontology. They are why coordinate reconstruction must be treated as an inference from complete-state geometry rather than as a primitive label attached to the void.

The conceptual sequence is: [Detecting the Absolute Frame](detecting-the-absolute-frame.md) identifies absolute rest, [Absolute Time Defense](absolute-time-defense.md) defends the global temporal ledger, and [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md) explains how observer-level clocks arise once the coordinate frame is in place.

The coordinate system reconstructed here is a mathematical and computational tool: a representation used to state equations in components, run simulations, and compare descriptions. The universe itself requires none of this. Architrinos interact through source-tagged causal wakes according to invariant laws that can exhibit deterministic multistability at self-hit thresholds. The physics continues whether or not any Physical Observer labels the axes.

The claim is therefore limited. This complete-state reconstruction is a mathematical existence proof demonstrating that a unique oriented basis can be defined after a nondegenerate ordered architrino tuple and parity convention are fixed from the $\mathbb{U}_{\text{now}}$ complete-state bookkeeping perspective. It is not an operational laboratory protocol for Physical Observers made of assemblies.

The mathematical content is small but useful: the Euclidean metric plus a nondegenerate ordered tuple supplies an origin, two axes, and a parity convention. The important points are the lemma, the exact failure conditions, and the fact that coordinate parity is not dynamical chirality.

## Reconstruction Existence Lemma

Fix one absolute-time slice $\Sigma_{t_\ast}$. Suppose complete-state wake geometry identifies an origin point $O$ on that slice, supplied either by a stationary architrino or by the fixed Euclidean-void point reconstructed from a source-tagged emission center, and two additional architrinos $A$ and $B$ whose positions on $\Sigma_{t_\ast}$ satisfy
$$
\mathbf{d}_1=\mathbf{x}_A(t_\ast)-\mathbf{x}_O(t_\ast)\ne\mathbf{0}
$$
and
$$
\mathbf{d}_2=\mathbf{x}_B(t_\ast)-\mathbf{x}_O(t_\ast),
\qquad
\|\mathbf{d}_1\times\mathbf{d}_2\|\ne0
$$
Then the first two unit axes are fixed by
$$
\hat{\mathbf{x}}=\frac{\mathbf{d}_1}{\|\mathbf{d}_1\|}
$$
$$
\mathbf{d}_2^{\perp}=\mathbf{d}_2-(\mathbf{d}_2\cdot\hat{\mathbf{x}})\hat{\mathbf{x}},
\qquad
\hat{\mathbf{y}}=\frac{\mathbf{d}_2^{\perp}}{\|\mathbf{d}_2^{\perp}\|}
$$
The remaining completion has exactly two signs. Once an orientation convention is declared, the right-handed completion is
$$
\hat{\mathbf{z}}=\hat{\mathbf{x}}\times\hat{\mathbf{y}}
$$

The construction fails precisely when the first displacement is coincident with the origin or the first two displacements are collinear:
$$
\|\mathbf{d}_1\|=0
\qquad\text{or}\qquad
\|\mathbf{d}_1\times\mathbf{d}_2\|=0
$$
If a fourth architrino $C$ is introduced, it is non-coplanar with the first three exactly when
$$
\mathbf{d}_3=\mathbf{x}_C(t_\ast)-\mathbf{x}_O(t_\ast),
\qquad
V=\mathbf{d}_3\cdot(\mathbf{d}_1\times\mathbf{d}_2)\ne0
$$
The sign of $V$ selects a side of the already oriented plane. It does not by itself turn coordinate parity into a dynamical chirality claim.

This lemma is an existence claim at the complete-state level. It does not say that the Euclidean void contains an origin or preferred axes. It says that once a nondegenerate ordered tuple is selected, the Euclidean metric supplies enough invariant structure to construct a coordinate basis for calculation.

## Minimal Reconstruction Procedure

The lemma above is the full construction. Complete-state bookkeeping performs four choices:

1. Choose an origin point $O$ on $\Sigma_{t_\ast}$. A stationary architrino can supply a material origin, but a reconstructed source-tagged emission center also suffices. If the emission time is $s\ne t_\ast$, the origin on $\Sigma_{t_\ast}$ is the same fixed Euclidean-void point carried by spatial identity across slices, not the original event on $\Sigma_s$.
2. Choose a non-coincident architrino $A$ and set $\hat{\mathbf{x}}=\mathbf{d}_1/\|\mathbf{d}_1\|$. This fixes a reference direction but not a physically preferred direction; the tuple choice is conventional once the complete-state geometry is available.
3. Choose a non-collinear architrino $B$ and use the orthogonal projection of $\mathbf{d}_2$ to define $\hat{\mathbf{y}}$. This fixes the remaining continuous roll around $\hat{\mathbf{x}}$.
4. Declare a parity convention and set $\hat{\mathbf{z}}=\hat{\mathbf{x}}\times\hat{\mathbf{y}}$, or use a non-coplanar fourth architrino only as a side marker for reporting the chosen convention.

The continuous freedoms removed are translation and rotation. Absolute time zero remains a separate temporal convention. The reconstruction fails only for degenerate reference data: $\|\mathbf{d}_1\|=0$ or $\|\mathbf{d}_1\times\mathbf{d}_2\|=0$. In that case complete-state bookkeeping must choose a different ordered tuple; the failure is not a failure of the Euclidean void.

## Parity Convention and Dynamical Chirality

Coordinate handedness is a basis convention: it chooses which side of the already-defined plane is called positive $\hat{\mathbf{z}}$. A complete-state side marker $C$ can report that choice through
$$
V=\mathbf{d}_3\cdot(\mathbf{d}_1\times\mathbf{d}_2)
$$
with $V>0$ and $V<0$ selecting opposite sides of the plane after the orientation convention has been declared. The sign of $V$ does not turn coordinate parity into a dynamical handedness law.

Dynamical chirality is reserved for ordered precession, axial-frame exposure, reaction provenance, and Noether swarm handedness. If a later assembly-level model supplies a persistent handed marker, a simulation may choose the coordinate parity convention that reports that marker with a positive sign. That is a reporting alignment, not a derivation of the marker.

## Coordinate Frames Are Not Ontology

The Euclidean void has no preferred origin, no intrinsic axis labels, and no substrate-level marker for clockwise versus counterclockwise. At the ontological level, architrinos move and interact through Euclidean separations, source-tagged causal wakes, and line-of-action hits. The physics proceeds without coordinate labels.

The reconstruction procedure outlined here serves theory-building and simulation:
- writing the master equation in component form,
- running numerical simulations,
- communicating results,
- and comparing frames.

The coordinate-invariant content of the laws does not depend on the selected frame. A left-handed coordinate system and a right-handed one produce identical predictions for measurable quantities, differing only in the coordinate signs assigned to pseudovectors and pseudoscalars.

The universe does not require a coordinate frame; theory and simulation use one because the relevant relationships need a stable component language. Origin, first axis, and plane are enough for distances, derivatives, scalar products, and component equations. Handedness matters only when reporting cross products, pseudovectors, pseudoscalars, or parity-sensitive coordinate quantities.

## Complete-State and Physical-Observer Access

This final distinction separates substrate ontology, complete-state reconstruction, and effective observer inference. The substrate contains architrinos, causal wakes, absolute time, the Euclidean void, and contents of the Noether sea. The coordinate frame is inferred from that complete record. Physical Observers access only effective records through assembly clocks, rulers, signals, and retained apparatus states.

**Complete-state reconstruction:**
The $\mathbb{U}_{\text{now}}$ complete-state bookkeeping perspective has access to all architrino positions and can compute wake geometries exactly. The coordinate system is a data structure: an origin offset plus three orthonormal vectors.

**Physical Observer access:**
Physical Observers cannot directly measure the complete source-tagged wake-center geometry or identify absolute rest by this procedure. Their rulers and clocks are themselves assemblies, distorted by motion and coupling to the Noether sea. They measure:
- **Proper time** $\tau$, not absolute time $t$
- **Effective coordinates** via local rulers
- **Relative velocities** via Doppler shifts and aberration

The reconstruction described here is a **foundational consistency proof**: it shows the theory has the mathematical structure necessary to define absolute rest and an absolute-frame coordinate system **in principle** from complete ontic data. It does not claim that an embedded observer can perform the reconstruction directly. At accessible energies, the Lorentz-closure target is that moving-assembly deformation, clock/ruler retuning, and two-way signal synchronization bound preferred-frame leakage enough that Physical Observers cannot detect the absolute frame operationally, while the frame remains the ontological background beneath the effective geometry.

For the effective kinematic layer built on top of this scaffold, see [Lorentz Kinematics](../spacetime/lorentz-kinematics.md) and [Emergent Metric](../spacetime/emergent-metric.md).
