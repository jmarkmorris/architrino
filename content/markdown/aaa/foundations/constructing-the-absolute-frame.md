# Constructing the Absolute Frame

This chapter answers a simple question: if the Euclidean void has no grid painted into it, how can the theory ever use coordinates? The answer is reconstruction. A usable frame is built from complete-state wake geometry, not assumed as a label already attached to space. The ontological data are architrino worldlines, source-tagged causal wakes, Euclidean distances on an absolute-time slice, and the path-history records needed to compare them. The coordinate frame reconstructed from those data is a mathematical and computational representation, not an additional constituent of the ontology.

## Overview

The previous chapter showed how source-tagged wake centers identify the preferred rest structure, and how a stationary architrino can supply one convenient material origin when available. The next task is more ordinary but just as important: construct a complete coordinate system. The Euclidean void provides no intrinsic markers: no origin point labeled "here," no arrows painted "this way," and no universal clock displaying "now = 0." Those absences are not defects in the ontology. They are the reason coordinates must be inferred from complete-state geometry rather than treated as primitive labels attached to the void.

The conceptual sequence is: [Detecting the Absolute Frame](detecting-the-absolute-frame.md) identifies absolute rest, [Absolute Time Defense](absolute-time-defense.md) defends the global temporal ledger, and [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md) explains how observer-level clocks arise once the coordinate frame is in place.

The coordinate system reconstructed here is a workbench tool. It lets the theory state equations in components, run simulations, and compare descriptions. The universe itself requires none of it. Architrinos interact through source-tagged causal wakes according to invariant laws that can exhibit deterministic multistability at self-hit thresholds. The physics continues whether or not any Physical Observer labels the axes.

The reader should therefore treat the construction like assigning graph paper after the geometry is already there. The graph paper helps calculate and compare; it does not create the distances, the rest condition, the causal wakes, or the architrino worldlines. This is why the reconstruction can be mathematically exact at the complete-state level while still being unavailable as a direct laboratory procedure for an embedded observer.

The claim is therefore narrow. From the $\mathbb{U}_{\text{now}}$ complete-state bookkeeping perspective, a unique oriented basis can be defined after a nondegenerate ordered architrino tuple and parity convention are fixed. That is a mathematical existence proof. It is not an operational laboratory protocol for Physical Observers made of assemblies.

The mathematical content is small but useful. The Euclidean metric plus a nondegenerate ordered tuple supplies an origin, two axes, and a parity convention. The important points are the lemma, the exact failure conditions, and the fact that coordinate parity is not dynamical chirality.

## Reconstruction Existence Lemma

Fix one absolute-time slice $\Sigma_{T_\ast}$. Suppose complete-state wake geometry identifies an origin point $O$ on that slice. Let $\mathbf X_O(T_\ast)$ denote that fixed Euclidean-void point, whether it is occupied by a stationary architrino or reconstructed from a source-tagged emission center and carried to $\Sigma_{T_\ast}$ by spatial identity. Now choose two architrinos $A$ and $B$ whose positions on $\Sigma_{T_\ast}$ satisfy
$$
\mathbf{d}_1=\mathbf X_A(T_\ast)-\mathbf X_O(T_\ast)\ne\mathbf{0}
$$
and
$$
\mathbf{d}_2=\mathbf X_B(T_\ast)-\mathbf X_O(T_\ast),
\qquad
\|\mathbf{d}_1\times\mathbf{d}_2\|\ne0
$$
Then the first two unit axes are fixed by
$$
\hat{\mathbf e}_1=\frac{\mathbf{d}_1}{\|\mathbf{d}_1\|}
$$
$$
\mathbf{d}_2^{\perp}=\mathbf{d}_2-(\mathbf{d}_2\cdot\hat{\mathbf e}_1)\hat{\mathbf e}_1,
\qquad
\hat{\mathbf e}_2=\frac{\mathbf{d}_2^{\perp}}{\|\mathbf{d}_2^{\perp}\|}
$$
Read the first displacement as the first arrow from the origin, and the second displacement as the arrow that fixes the plane. Once those are nondegenerate, only one binary choice remains. The remaining completion has exactly two signs. Once an orientation convention is declared, the right-handed completion is
$$
\hat{\mathbf e}_3=\hat{\mathbf e}_1\times\hat{\mathbf e}_2
$$

Geometrically, the lemma constructs a section of the orthonormal frame bundle over the selected Euclidean point from a nondegenerate ordered tuple. In plainer language, the tuple removes the freedom to slide the origin around and spin the axes freely. The continuous freedoms removed are the translations and rotations of the special Euclidean group:
$$
SE(3)=\mathbb{R}^3\rtimes SO(3)
$$
This is the identity component of the full Euclidean group $E(3)=\mathbb{R}^3\rtimes O(3)$, while the remaining parity choice is the connected-component label of the full orthogonal group, $\pi_0(O(3))\cong\mathbb{Z}_2$. Thus the two signs are not an extra dynamical datum. They are the residual component choice left after the ordered tuple fixes the connected Euclidean-frame freedom.

The construction fails only when the chosen reference data do not actually define a plane. That happens when the first displacement is coincident with the origin or the first two displacements are collinear:
$$
\|\mathbf{d}_1\|=0
\qquad\text{or}\qquad
\|\mathbf{d}_1\times\mathbf{d}_2\|=0
$$
For simulation and finite-precision reconstruction, exact nondegeneracy is not enough. The ordered tuple should also carry a conditioning floor
$$
\frac{\|\mathbf{d}_1\times\mathbf{d}_2\|}
{\|\mathbf{d}_1\|\,\|\mathbf{d}_2\|}
\ge
\sin\theta_{\min} > 0
$$
on the retained reconstruction window. If this floor is small, the projection defining $\hat{\mathbf e}_2$ is ill-conditioned and the completed $\hat{\mathbf e}_3$ amplifies roundoff or perturbation error. The simulator should then choose a better-conditioned tuple rather than treating the near-collinear basis as an ordinary pass.

This floor is one instance of the non-degeneracy floors used throughout the foundation stack. The common idea is simple: do not trust a reconstruction that would change wildly under a tiny perturbation. In each case the retained chart is accepted only when the relevant reconstruction map has a scale-appropriate nonzero floor. For causal-root charts this is the transversality floor, such as $\lvert\partial_{T_t}F_{ij}\rvert\ge\kappa_{\mathrm{hit}}$; for basin partitions it is the separatrix floor; for this frame construction the scale-free floor is the conditioning of the normalized direction pair $(\mathbf{d}_1/\|\mathbf{d}_1\|,\mathbf{d}_2/\|\mathbf{d}_2\|)$, recorded above by the sine of their angle. The common mathematical content is controlled local invertibility: the map has a bounded inverse-Lipschitz constant on the retained chart, so small perturbations of the complete-state data do not create a different branch or frame.

If a fourth architrino $C$ is introduced, it is non-coplanar with the first three exactly when
$$
\mathbf{d}_3=\mathbf X_C(T_\ast)-\mathbf X_O(T_\ast),
\qquad
V_{\mathrm{vol}}=\mathbf{d}_3\cdot(\mathbf{d}_1\times\mathbf{d}_2)\ne0
$$
Here $V_{\mathrm{vol}}\ne0$ is the structural non-coplanarity test for basis completion. The sign $\operatorname{sgn}(V_{\mathrm{vol}})$ reports which side of the already oriented plane the marker occupies relative to a declared orientation. It does not by itself turn coordinate parity into a dynamical chirality claim.

This lemma is an existence claim at the complete-state level. It does not say that the Euclidean void contains an origin or preferred axes. It says that once a nondegenerate ordered tuple is selected, the Euclidean metric supplies enough invariant structure to construct a coordinate basis for calculation.

## Minimal Reconstruction Procedure

The lemma above is the full construction. Complete-state bookkeeping performs four choices. Each choice adds a piece of coordinate language without adding a new physical ingredient:

1. Choose an origin point $O$ on $\Sigma_{T_\ast}$. A stationary architrino can supply a material origin, but a reconstructed source-tagged emission center also suffices. If the emission time is $T_t\ne T_\ast$, the origin on $\Sigma_{T_\ast}$ is the same fixed Euclidean-void point carried by spatial identity across slices, not the original event on $\Sigma_{T_t}$.
2. Choose a non-coincident architrino $A$ and set $\hat{\mathbf e}_1=\mathbf{d}_1/\|\mathbf{d}_1\|$. This fixes a reference direction but not a physically preferred direction; the tuple choice is conventional once the complete-state geometry is available.
3. Choose a non-collinear architrino $B$ and use the orthogonal projection of $\mathbf{d}_2$ to define $\hat{\mathbf e}_2$. This fixes the remaining continuous roll around $\hat{\mathbf e}_1$.
4. Declare a parity convention and set $\hat{\mathbf e}_3=\hat{\mathbf e}_1\times\hat{\mathbf e}_2$, or use a non-coplanar fourth architrino only as a side marker for reporting the chosen convention.

The continuous freedoms removed are translation and rotation. Absolute time zero remains a separate temporal convention. The spatial basis does not need to be re-derived on every slice: once the chart is fixed on $\Sigma_{T_\ast}$, it transports rigidly across absolute-time slices because Euclidean-void points have fixed identity. In the selected $c_f$-isotropic rest frame, the dynamically completed Newton-Cartan connection is the flat representative described in [Absolute Timespace](absolute-timespace.md#newton-cartan-data), so this transport has trivial holonomy and is path-independent. The delayed root condition $\|\mathbf X_{o'}(T_r)-\mathbf X_j(T_t)\|=c_f(T_r-T_t)$ therefore compares positions at different times inside the same spatial chart, not inside separately reconstructed per-slice frames.

The reconstruction fails only for degenerate or ill-conditioned reference data: $\|\mathbf{d}_1\|=0$, $\|\mathbf{d}_1\times\mathbf{d}_2\|=0$, or a violated conditioning floor. In that case complete-state bookkeeping must choose a different ordered tuple. The failure belongs to the selected chart data, not to the Euclidean void.

## Parity Convention and Dynamical Chirality

Coordinate handedness is a basis convention. It chooses which side of the already-defined plane is called positive $\hat{\mathbf e}_3$. A complete-state side marker $C$ can report that choice through
$$
V_{\mathrm{vol}}=\mathbf{d}_3\cdot(\mathbf{d}_1\times\mathbf{d}_2)
$$
with $V_{\mathrm{vol}}>0$ and $V_{\mathrm{vol}}<0$ selecting opposite sides of the plane after the orientation convention has been declared. The sign of $V_{\mathrm{vol}}$ does not turn coordinate parity into a dynamical handedness law.

Equivalently, $\operatorname{sgn}(V_{\mathrm{vol}})$ is gauge data for the selected coordinate chart, while dynamical chirality must be an invariant of the retained branch record. Coordinate parity lives in $\pi_0(O(3))$ for the chart; dynamical chirality lives in the connected-component data of framed worldline or assembly-branch configuration space. A simulation may align these signs as a reporting convention, but a nonzero $V_{\mathrm{vol}}$ does not imply that the assembly itself is chiral.

Dynamical chirality is reserved for an assembly-level handed marker carried by the retained branch record. Ordered precession, axial-frame exposure, reaction provenance, and Noether braid handedness may feed that marker, but the deformation-stable object should be a framed topology invariant, such as a framed self-linking sign
$$
Lk(\gamma,\gamma^{\mathrm{fr}})
=
\operatorname{Wr}(\gamma)+\operatorname{Tw}(\gamma,\gamma^{\mathrm{fr}})
$$
for a closed framed constituent trace, or the linking number of distinct constituent worldlines. If that branch record supplies a nonzero handed marker, a simulation may choose the coordinate parity convention so that $\operatorname{sgn}(V_{\mathrm{vol}})$ reports the same sign as $\operatorname{sgn}(Lk)$. If the framed self-linking or linking row is zero, uncomputed, or not protected under branch-preserving deformation, the coordinate parity remains a reporting convention with no dynamical chirality content.

The self-linking row is defined only on a regular closed return cycle or on an explicitly closed and nonsingular framed trace. A raw open worldline does not by itself carry a deformation-invariant writhe, and a near self-hit or fold crossing is exactly where the framing can degenerate. Chirality is therefore a regular-branch certificate: it is admissible where the retained roots and nonsingular frame have positive floors, including $\kappa_{\mathrm{hit}}>0$ for the relevant causal-root rows. At a fold, reconnection, or framing slip, $Lk$ can jump; that jump is a branch-transition event, not a change in coordinate convention.

## Coordinate Frames Are Not Ontology

The Euclidean void has no preferred origin, no intrinsic axis labels, and no substrate-level marker for clockwise versus counterclockwise. At the ontological level, architrinos move and interact through Euclidean separations, source-tagged causal wakes, and line-of-action hits. Coordinates describe those relations; they do not cause them.

The reconstruction procedure serves theory-building and simulation:
- writing the master equation in component form,
- running numerical simulations,
- communicating results,
- and comparing frames.

The coordinate-invariant content of the laws does not depend on the selected frame. A left-handed coordinate system and a right-handed one produce identical predictions for measurable quantities, differing only in the coordinate signs assigned to pseudovectors and pseudoscalars.

The universe does not require a coordinate frame. Theory and simulation use one because the relevant relationships need a stable component language. Origin, first axis, and plane are enough for distances, derivatives, scalar products, and component equations. Handedness matters only when reporting cross products, pseudovectors, pseudoscalars, or parity-sensitive coordinate quantities.

## Complete-State and Physical-Observer Access

This final distinction separates three layers that are easy to confuse. The substrate contains architrinos, causal wakes, absolute time, the Euclidean void, and contents of the Noether sea. Complete-state bookkeeping can infer a coordinate frame from that full record. Physical Observers access only effective records through assembly clocks, rulers, signals, and retained apparatus states.

**Complete-state reconstruction:**
The $\mathbb{U}_{\text{now}}$ complete-state bookkeeping perspective has access to all architrino positions and can compute wake geometries exactly. The coordinate system is a data structure: an origin offset plus three orthonormal vectors.

**Physical Observer access:**
Physical Observers cannot directly measure the complete source-tagged wake-center geometry or identify absolute rest by this procedure. Their rulers and clocks are themselves assemblies, distorted by motion and coupling to the Noether sea. They measure:
- **Proper time** $\tau$, not absolute time $T$
- **Effective coordinates** via local rulers
- **Relative velocities** via Doppler shifts and aberration

The obstruction is structural. No operator acting on the superposed received potential alone recovers the source-tagged center set $\{\mathbf Z_a(T_t)\}$ without provenance data already in hand. Transmitter identity, emission time, and wake-center provenance are complete-state ledger entries; once a Physical Observer has only a summed effective record, those tags are not restored by a more clever coordinate reconstruction.

This can be stated as a quotient obstruction. Let $\mathcal{T}$ denote the provenance-tagged configuration record containing transmitter identity, emission time, and wake-center data, and let
$$
Q_{\mathrm{erase}}:\mathcal{T}\to\mathcal{T}/\!\sim_{\mathrm{erase}}
$$
be the map that forgets the labels retained only by complete-state bookkeeping. The summed observer record lies in the quotient fiber, not in $\mathcal{T}$ itself. Absolute-frame reconstruction requires a section of $Q_{\mathrm{erase}}$ selecting the correct tagged representative. No such section is determined by the superposed potential alone, because many tagged configurations can lie over the same unlabeled record. This is the same kind of label-erasure map that appears in the provenance-leakage bound of [Architrino](architrino.md#provenance-and-persistence).

The reconstruction described here is a **foundational consistency proof**. It shows that the theory has the mathematical structure necessary to define absolute rest and an absolute-frame coordinate system **in principle** from complete ontic data. It does not claim that an embedded observer can perform the reconstruction directly. At accessible energies, the Lorentz-closure target is that moving-assembly deformation, clock/ruler retuning, and two-way signal synchronization bound preferred-frame leakage enough that Physical Observers cannot detect the absolute frame operationally, while the frame remains the ontological background beneath the effective geometry.

For the effective kinematic layer built on top of this scaffold, see [Lorentz Kinematics](../spacetime/lorentz-kinematics.md) and [Emergent Metric](../spacetime/emergent-metric.md).
