# Reconstructing a Coordinate Frame from Wake Geometry

This chapter explains how a usable coordinate frame can be reconstructed from complete-state wake geometry rather than assumed from pre-labeled space. The ontological data are architrino worldlines, source-tagged causal wakes, Euclidean distances on an absolute-time slice, and the path-history records needed to compare them. The coordinate frame reconstructed from those data is a mathematical and computational representation, not an additional constituent of the ontology.

## Overview

Having established in the previous chapter that source-tagged wake centers identify the preferred rest structure, and that a stationary architrino supplies one convenient material origin when available, the next task is to reconstruct a complete coordinate system. The Euclidean void provides no intrinsic markers: no origin point labeled "here," no arrows painted "this way," and no universal clock displaying "now = 0." Those absences are not defects in the ontology. They are why coordinate reconstruction must be treated as an inference from complete-state geometry rather than as a primitive label attached to the void.

The conceptual sequence is: [Detecting the Absolute Frame](detecting-the-absolute-frame.md) identifies absolute rest, [Absolute Time Defense](absolute-time-defense.md) defends the global temporal ledger, and [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md) explains how observer-level clocks arise once the coordinate frame is in place.

The coordinate system reconstructed here is a mathematical and computational tool: a representation used to state equations in components, run simulations, and compare descriptions. The universe itself requires none of this. Architrinos interact through source-tagged causal wakes according to invariant laws that can exhibit deterministic multistability at self-hit thresholds. The physics continues whether or not any Physical Observer labels the axes.

The claim is therefore limited. This complete-state reconstruction is a mathematical existence proof demonstrating that a unique oriented basis can be defined after a nondegenerate ordered architrino tuple and parity convention are fixed from the $\mathbb{U}_{\text{now}}$ complete-state bookkeeping perspective. It is not an operational laboratory protocol for Physical Observers made of assemblies.

What follows is the systematic procedure by which the $\mathbb{U}_{\text{now}}$ complete-state bookkeeping perspective can reconstruct a complete, unambiguous coordinate frame from the raw geometric data of architrino positions and their causal wake patterns.

## Reconstruction Existence Lemma

Fix one absolute-time slice $\Sigma_{t_\ast}$. Suppose complete-state wake geometry identifies an origin point $O$ on that slice, supplied either by a stationary architrino or by the fixed Euclidean-void point reconstructed from a source-tagged emission center, and two additional architrinos $A$ and $B$ whose positions on $\Sigma_{t_\ast}$ satisfy
$$
\mathbf{d}_1=\mathbf{x}_A(t_\ast)-\mathbf{x}_O(t_\ast)\ne\mathbf{0},
$$
and
$$
\mathbf{d}_2=\mathbf{x}_B(t_\ast)-\mathbf{x}_O(t_\ast),
\qquad
\|\mathbf{d}_1\times\mathbf{d}_2\|\ne0.
$$
Then the first two unit axes are fixed by
$$
\hat{\mathbf{x}}=\frac{\mathbf{d}_1}{\|\mathbf{d}_1\|},
$$
$$
\mathbf{d}_2^{\perp}=\mathbf{d}_2-(\mathbf{d}_2\cdot\hat{\mathbf{x}})\hat{\mathbf{x}},
\qquad
\hat{\mathbf{y}}=\frac{\mathbf{d}_2^{\perp}}{\|\mathbf{d}_2^{\perp}\|}.
$$
The remaining completion has exactly two signs. Once an orientation convention is declared, the right-handed completion is
$$
\hat{\mathbf{z}}=\hat{\mathbf{x}}\times\hat{\mathbf{y}}.
$$

The construction fails precisely when the first displacement is coincident with the origin or the first two displacements are collinear:
$$
\|\mathbf{d}_1\|=0
\qquad\text{or}\qquad
\|\mathbf{d}_1\times\mathbf{d}_2\|=0.
$$
If a fourth architrino $C$ is introduced, it is non-coplanar with the first three exactly when
$$
\mathbf{d}_3=\mathbf{x}_C(t_\ast)-\mathbf{x}_O(t_\ast),
\qquad
V=\mathbf{d}_3\cdot(\mathbf{d}_1\times\mathbf{d}_2)\ne0.
$$
The sign of $V$ selects a side of the already oriented plane. It does not by itself turn coordinate parity into a dynamical chirality claim.

This lemma is an existence claim at the complete-state level. It does not say that the Euclidean void contains an origin or preferred axes. It says that once a nondegenerate ordered tuple is selected, the Euclidean metric supplies enough invariant structure to construct a coordinate basis for calculation.

## Step 1: Establishing the Origin

**Origin datum required:** one stationary architrino, or one fixed Euclidean-void point reconstructed from a source-tagged emission center and carried to $\Sigma_{t_\ast}$ by spatial identity

**Method:**
Using the wake-center diagnostic described in the previous chapter, complete-state bookkeeping first recovers the preferred rest structure: the frame in which primitive causal wakes expand isotropically at $c_f$. If an architrino's outgoing source-tagged causal wakes remain perfectly concentric over the diagnostic interval, that stationary architrino supplies a material origin. If no architrino is stationary over the interval, choose a reconstructed emission center and use its fixed Euclidean-void point as the conventional origin point on the selected slice $\Sigma_{t_\ast}$.

If the origin is supplied by an emission center reconstructed from an emission time $s\ne t_\ast$, the emission event itself lies on $\Sigma_s$. The selected origin on $\Sigma_{t_\ast}$ is the same fixed Euclidean-void point carried by spatial identity across slices, not the original emission event.

**What This Accomplishes:**
The selected point is assigned as the **origin** of the coordinate frame on the selected slice:
$$
\mathbf{x}_{\text{origin}}(t_\ast) = (0, 0, 0)
$$

**Degrees of Freedom Fixed:**
- **Translation (3 DOFs)**: The coordinate origin is assigned to the selected origin point in the Euclidean void.

**What Remains Undefined:**
- The **orientation** of the coordinate axes
- The **handedness** of the coordinate system
- The **absolute time zero**

**Why This Step Is Necessary:**
Without an origin, position vectors cannot be represented in components. Every subsequent statement of "where" must be relative to some reference point. The wake-center criterion gives complete-state reconstruction a coordinate-independent method for selecting this point without making the preferred frame depend on the existence of a stationary material marker.

## Step 2: Defining the Primary Axis (First Direction)

**Architrino Required:** 1 additional (total: 2)

**Method:**
Choose a second, non-coincident architrino (stationary or moving). From the complete-state record, compute the displacement vector from the origin to this second architrino:
$$
\mathbf{d}_1 = \mathbf{x}_2(t_\ast) - \mathbf{x}_{\text{origin}}(t_\ast)
$$

Define the **first unit vector** (conventionally, the $\hat{\mathbf{x}}$-axis):
$$
\hat{\mathbf{x}} = \frac{\mathbf{d}_1}{\|\mathbf{d}_1\|}
$$

**What This Accomplishes:**
This fixes one **direction** in the Euclidean void and establishes the first spatial axis of the scaffold.

**Degrees of Freedom Fixed:**
- **Rotation (2 DOFs)**: Two continuous rotational freedoms are fixed. The $\hat{\mathbf{x}}$-axis points from the origin toward the second architrino.

**What Remains Undefined:**
- The **second and third axes** ($\hat{\mathbf{y}}$ and $\hat{\mathbf{z}}$)
- The **rotation around the $\hat{\mathbf{x}}$-axis** (roll)
- The **handedness** of the coordinate system

**Why This Step Is Necessary:**
To compute derivatives, projections, and vector components, the coordinate frame needs at least one defined direction. The displacement vector between two architrinos provides this in a coordinate-independent manner.

**Physical Note:**
The choice of *which* architrino becomes the second reference object is arbitrary. Any non-coincident architrino will work, because the Euclidean void is rotationally symmetric. The reconstruction chooses a reference direction for the coordinate grid; it does not identify a physically preferred direction.

## Step 3: Defining the Plane (Second Independent Direction)

**Architrino Required:** 1 additional (total: 3)

**Method:**
Identify a third architrino that is **not collinear** with the first two. Compute the displacement vector:
$$
\mathbf{d}_2 = \mathbf{x}_3(t_\ast) - \mathbf{x}_{\text{origin}}(t_\ast)
$$

**Check for linear independence:**
Verify that $\mathbf{d}_2$ is not parallel to $\mathbf{d}_1$:
$$
\mathbf{d}_1 \times \mathbf{d}_2 \neq \mathbf{0}
$$
If this condition fails, select a different third architrino.

**Construct the second unit vector** using Gram-Schmidt orthogonalization:
$$
\mathbf{d}_2^{\perp} = \mathbf{d}_2 - (\mathbf{d}_2 \cdot \hat{\mathbf{x}})\hat{\mathbf{x}}
$$
$$
\hat{\mathbf{y}} = \frac{\mathbf{d}_2^{\perp}}{\|\mathbf{d}_2^{\perp}\|}
$$

This ensures $\hat{\mathbf{y}}$ is orthogonal to $\hat{\mathbf{x}}$ and lies in the plane defined by $\mathbf{d}_1$ and $\mathbf{d}_2$.

**What This Accomplishes:**
This defines a **plane** (the $xy$-plane) within the Euclidean void. Two orthogonal directions are now fixed.

**Degrees of Freedom Fixed:**
- **Rotation (1 DOF)**: The remaining continuous rotation around the $\hat{\mathbf{x}}$-axis is fixed.

**What Remains Undefined:**
- The **third axis** ($\hat{\mathbf{z}}$), which must be perpendicular to the $xy$-plane
- The **handedness** of the coordinate system

**Why This Step Is Necessary:**
To perform spatial vector calculus, the coordinate frame needs a second independent direction. The plane spanned by $\hat{\mathbf{x}}$ and $\hat{\mathbf{y}}$ is now unambiguously defined by the positions of three architrinos.

## Step 4: Resolving Handedness (Parity Convention)

**Architrino Required:** 0 additional (if conventional) **or** 1 additional (if a side marker is used)

Here **handedness** or **parity convention** is the geometric issue: choosing which side of the already-defined plane is positive $\hat{\mathbf{z}}$. This is only a coordinate-basis choice. It should not be identified with fermionic chirality, which is reserved for the dynamical handed precession order of emergent Noether swarms.

### Option A: Conventional Handedness (Mathematical Convention)

**Method:**
Impose the **right-hand rule** by definition:
$$
\hat{\mathbf{z}} = \hat{\mathbf{x}} \times \hat{\mathbf{y}}
$$

This completes the orthonormal basis $\{\hat{\mathbf{x}}, \hat{\mathbf{y}}, \hat{\mathbf{z}}\}$ using the standard cross-product convention.

**What This Accomplishes:**
The coordinate system is now **fully specified**. All vector operations have unambiguous signs.

**What Remains Undefined:**
No spatial orientation or parity choice remains undefined. Absolute time zero remains a separate temporal convention.

**Degrees of Freedom Fixed:**
- **Parity (1 discrete choice)**: We have chosen right-handed over left-handed coordinates.

### Option B: Complete-State Side Marker (Fourth Architrino)

**Method:**
If the reconstruction uses a physical configuration to mark one side of the oriented plane, complete-state bookkeeping examines a fourth architrino that is **not coplanar** with the first three.

Compute:
$$
\mathbf{d}_3 = \mathbf{x}_4(t_\ast) - \mathbf{x}_{\text{origin}}(t_\ast)
$$

Define the preliminary third axis:
$$
\hat{\mathbf{z}}_{\text{prelim}} = \hat{\mathbf{x}} \times \hat{\mathbf{y}}
$$

Check the sign of the scalar triple product:
$$
V = \mathbf{d}_3 \cdot (\mathbf{d}_1 \times \mathbf{d}_2)
$$

- If $V > 0$: The fourth architrino lies on the positive side of the plane relative to the declared orientation convention. Set $\hat{\mathbf{z}} = \hat{\mathbf{z}}_{\text{prelim}}$.
- If $V < 0$: The fourth architrino lies on the negative side. Set $\hat{\mathbf{z}} = -\hat{\mathbf{z}}_{\text{prelim}}$.

**What This Accomplishes:**
The fourth architrino supplies a complete-state side marker for the chosen plane. The sign assignment still depends on the declared orientation convention; the configuration does not convert coordinate parity into a new dynamical handedness law.

**Special Condition on the Fourth Architrino:**
It must be **non-coplanar** with the first three, so that it has a component perpendicular to the $xy$-plane.

**Why This Might Be Preferred:**
If a later assembly-level model supplies a persistent parity bias or handed precession order, a simulation may choose the coordinate parity convention that reports that marker with a declared positive sign. That alignment is a reporting convention, not a derivation of the marker. It keeps later labels consistently assigned while preserving the distinction between coordinate-basis parity and dynamical chirality in the Noether swarm.

## Coordinate Frames Are Not Ontology

The Euclidean void has no preferred origin, no intrinsic axis labels, and no substrate-level marker for clockwise versus counterclockwise. At the ontological level, architrinos move and interact through Euclidean separations, source-tagged causal wakes, and line-of-action hits. The physics proceeds without coordinate labels.

The reconstruction procedure outlined here serves theory-building and simulation:
- To write down the master equation in component form
- To run numerical simulations
- To communicate results
- To compare frames

The coordinate-invariant content of the laws does not depend on the selected frame. A left-handed coordinate system and a right-handed one produce identical predictions for measurable quantities, differing only in the coordinate signs assigned to pseudovectors and pseudoscalars.

The universe does not require a coordinate frame; theory and simulation use one because the relevant relationships need a stable component language.

## Summary Table: Reconstruction Steps

| **Step** | **Architrinos Required** | **Purpose** | **DOFs Fixed** | **What Remains Undefined** | **Notes** |
|----------|-------------------------|-------------|----------------|---------------------------|-----------|
| **1. Origin** | 1 stationary architrino or one reconstructed emission center | Fix translational reference point | Translation (3) | Orientation, handedness, time zero | Stationary architrino is sufficient, not necessary |
| **2. Primary Axis** | +1 (non-coincident) | Define first spatial direction ($\hat{\mathbf{x}}$) | Rotation (2) | Second/third axes, roll, handedness | Displacement vector gives objective direction |
| **3. Plane** | +1 (non-collinear) | Define second independent direction ($\hat{\mathbf{y}}$) and lock the $xy$-plane | Rotation (1) | Third axis, handedness | Gram-Schmidt ensures orthogonality |
| **4A. Handedness (Conventional)** | 0 | Complete spatial basis via right-hand rule | Parity (1) | Absolute time zero | Mathematical convention ($\hat{\mathbf{z}} = \hat{\mathbf{x}} \times \hat{\mathbf{y}}$) |
| **4B. Side Marker (Complete-State)** | +1 (non-coplanar) | Choose a physical side marker for the oriented plane | Parity (1) | Absolute time zero | Scalar triple product resolves the reported $\pm\hat{\mathbf{z}}$ side |

**Total Architrinos:**
- **Conventional approach with stationary material origin**: 3
- **Side-marker approach with stationary material origin**: 4
- **Wake-center origin approach**: one reconstructed emission center plus the nondegenerate architrino tuple used for axes

## Categories of Calculation Served by Each Step

| **Category** | **Step 1 (Origin)** | **Step 2 (Axis 1)** | **Step 3 (Plane)** | **Step 4 (Handedness)** |
|--------------|---------------------|---------------------|-------------------|------------------------|
| **Master Equation (Position-Dependent Forces)** | ✓ | ✓ | ✓ | — |
| **Velocity & Acceleration (Derivatives)** | ✓ | ✓ | ✓ | — |
| **Scalar Products (Energies, Distances)** | ✓ | ✓ | ✓ | — |
| **Vector Products (Angular Momentum, Torque)** | — | — | ✓ | ✓ |
| **Pseudovectors (magnetic-like effective fields, helicity proxies)** | — | — | — | ✓ |
| **Weak-sector exposure records** | — | — | — | coordinate signs only |
| **Simulation (Explicit Coordinates)** | ✓ | ✓ | ✓ | ✓ |
| **Frame Transformations (Relativity)** | ✓ | ✓ | ✓ | ✓ |

**Key Point:**
- Scalar and component calculations require the origin, primary axis, and plane construction (Steps 1-3); they do not require assigning coordinate parity.
- Coordinate **handedness** matters when reporting cross-product, pseudovector, pseudoscalar, or parity-sensitive coordinate quantities. Weak-interaction handedness remains a separate dynamical closure target tied to Noether swarm chirality, axial-frame exposure, and reaction provenance.

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
