# Reconstructing a Coordinate Frame from Wake Geometry

This chapter explains how a usable coordinate scaffold can be reconstructed from complete-state wake geometry rather than assumed from pre-labeled space. Its purpose is to show that the ontology contains enough invariant structure to define an absolute-frame coordinate scaffold from the $\mathbb{U}_{\text{now}}$ complete-state bookkeeping perspective, while keeping clear that the coordinate system itself is a mathematical and computational scaffold, not an extra ontological ingredient.

## Overview

Having established in the previous chapter that a stationary architrino can be identified through the concentric geometry of its spherically expanding causal wakes, the next task is to reconstruct a complete coordinate system. The Euclidean void provides no intrinsic markers: no origin point labeled "here," no arrows painted "this way," and no universal clock displaying "now = 0."

The conceptual sequence is: [Detecting the Absolute Frame](detecting-the-absolute-frame.md) identifies absolute rest, [Absolute Time Defense](absolute-time-defense.md) defends the global temporal ledger, and [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md) explains how observer-level clocks arise once the coordinate scaffold is in place.

The coordinate system reconstructed here is a **mathematical and computational tool**: a scaffold used to state equations in components, run simulations, and compare descriptions. **The universe itself requires none of this.** Architrinos interact through their potential wakes according to invariant laws that can exhibit **meta-stable branching** at self-hit thresholds. The physics continues whether or not any Physical Observer labels the axes.

**This complete-state reconstruction is a mathematical existence proof demonstrating that a unique oriented basis can be defined after a nondegenerate ordered architrino tuple and parity convention are fixed from the $\mathbb{U}_{\text{now}}$ complete-state bookkeeping perspective. It is not an operational laboratory protocol for Physical Observers made of assemblies.**

What follows is the systematic procedure by which the $\mathbb{U}_{\text{now}}$ complete-state bookkeeping perspective can reconstruct a complete, unambiguous coordinate frame from the raw geometric data of architrino positions and their causal wake patterns.

## Reconstruction Existence Lemma

Fix one absolute-time slice $\Sigma_{t_\ast}$. Suppose complete-state wake geometry identifies a stationary origin architrino $O$ and two additional architrinos $A$ and $B$ whose positions on $\Sigma_{t_\ast}$ satisfy
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

## Step 1: Establishing the Origin (The Anchor Point)

**Architrino Required:** 1 (stationary)

**Method:**
Using the concentric causal-wake measurement described in the previous chapter, we identify an architrino whose outgoing potential wakes remain perfectly concentric over time. This architrino has **absolute velocity** $\mathbf{v}_{\text{abs}} = 0$ relative to the Euclidean void.

**What This Accomplishes:**
This stationary architrino becomes our **origin** on the selected slice:
$$
\mathbf{x}_{\text{origin}}(t_\ast) = (0, 0, 0)
$$

**Degrees of Freedom Fixed:**
- **Translation (3 DOFs)**: The coordinate origin is now locked to this architrino's absolute position in the void.

**What Remains Undefined:**
- The **orientation** of the coordinate axes
- The **handedness** of the coordinate system
- The **absolute time zero**

**Why This Step Is Necessary:**
Without an origin, position vectors cannot be represented in components. Every subsequent statement of "where" must be relative to some reference point. The concentric-wake criterion gives the complete-state reconstruction an **objective, observer-independent** method to select this point.

## Step 2: Defining the Primary Axis (First Direction)

**Architrino Required:** 1 additional (total: 2)

**Method:**
Identify a second architrino (stationary or moving). Measure the displacement vector from the origin to this second architrino:
$$
\mathbf{d}_1 = \mathbf{x}_2(t_\ast) - \mathbf{x}_{\text{origin}}(t_\ast)
$$

Define the **first unit vector** (conventionally, the $\hat{\mathbf{x}}$-axis):
$$
\hat{\mathbf{x}} = \frac{\mathbf{d}_1}{\|\mathbf{d}_1\|}
$$

**What This Accomplishes:**
We have now fixed a **direction** in the void. This establishes the first spatial axis.

**Degrees of Freedom Fixed:**
- **Rotation (2 DOFs)**: The pitch and yaw of the coordinate system are locked. The $\hat{\mathbf{x}}$-axis points from the origin toward architrino #2.

**What Remains Undefined:**
- The **second and third axes** ($\hat{\mathbf{y}}$ and $\hat{\mathbf{z}}$)
- The **rotation around the $\hat{\mathbf{x}}$-axis** (roll)
- The **handedness** of the coordinate system

**Why This Step Is Necessary:**
To compute derivatives, projections, and vector components, we need at least one defined direction. The displacement vector between two architrinos provides this in a coordinate-free, objective manner.

**Physical Note:**
The choice of *which* architrino becomes #2 is arbitrary. Any non-coincident architrino will work. The physics is rotationally symmetric; the reconstruction is simply choosing a convenient north pole for the coordinate grid.

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
We have now defined a **plane** (the $xy$-plane) within the 3D void. Two orthogonal directions are locked.

**Degrees of Freedom Fixed:**
- **Rotation (1 DOF)**: The roll around the $\hat{\mathbf{x}}$-axis is locked. The coordinate system can no longer spin freely.

**What Remains Undefined:**
- The **third axis** ($\hat{\mathbf{z}}$), which must be perpendicular to the $xy$-plane
- The **handedness** of the coordinate system

**Why This Step Is Necessary:**
To perform full 3D vector calculus, we need a second independent direction. The plane spanned by $\hat{\mathbf{x}}$ and $\hat{\mathbf{y}}$ is now unambiguously defined by the positions of three architrinos.

## Step 4: Resolving Handedness (Parity Convention)

**Architrino Required:** 0 additional (if conventional) **or** 1 additional (if empirical)

Here **handedness** or **parity convention** is the geometric issue: choosing which side of the already-defined plane is positive $\hat{\mathbf{z}}$. This is only a coordinate-basis choice. It should not be identified with fermionic chirality, which is reserved for the dynamical handed precession order of emergent Noether cores.

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

### Option B: Empirical Side Marker (Fourth Architrino)

**Method:**
If we want a physical configuration to mark one side of the oriented plane, we examine a fourth architrino that is **not coplanar** with the first three.

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
The fourth architrino now supplies a physical side marker for the chosen plane. The sign assignment still depends on the declared orientation convention; the configuration does not convert coordinate parity into a new dynamical handedness law.

**Special Condition on the Fourth Architrino:**
It must be **non-coplanar** with the first three, so that it has a component perpendicular to the $xy$-plane.

**Why This Might Be Preferred:**
If a later assembly-level model supplies a persistent parity bias or handed precession order, a simulation may choose the coordinate parity convention that reports that marker with a declared positive sign. That alignment is a reporting convention, not a derivation of the marker. It keeps later labels consistently assigned while preserving the distinction between coordinate-basis parity and dynamical chirality in the Noether core.

## Why None of This Is Required by the Universe

The Euclidean void has no preferred origin, no painted axes, and no intrinsic notion of clockwise versus counterclockwise. The physics proceeds **without any coordinate labels whatsoever**.

The reconstruction procedure outlined here serves theory-building and simulation:
- To write down the master equation in component form
- To run numerical simulations
- To communicate results
- To compare frames

The laws of physics are **coordinate-invariant**. A left-handed coordinate system and a right-handed one produce identical predictions for measurable quantities, differing only in the coordinate signs assigned to pseudovectors and pseudoscalars.

The universe does not require the scaffold; the theory does, because the relevant relationships need a language in which they can be expressed.

## Summary Table: Reconstruction Steps

| **Step** | **Architrinos Required** | **Purpose** | **DOFs Fixed** | **What Remains Undefined** | **Notes** |
|----------|-------------------------|-------------|----------------|---------------------------|-----------|
| **1. Origin** | 1 (stationary) | Fix translational reference point | Translation (3) | Orientation, handedness, time zero | Concentric wake identifies absolute rest |
| **2. Primary Axis** | +1 (non-coincident) | Define first spatial direction ($\hat{\mathbf{x}}$) | Rotation (2) | Second/third axes, roll, handedness | Displacement vector gives objective direction |
| **3. Plane** | +1 (non-collinear) | Define second independent direction ($\hat{\mathbf{y}}$) and lock the $xy$-plane | Rotation (1) | Third axis, handedness | Gram-Schmidt ensures orthogonality |
| **4A. Handedness (Conventional)** | 0 | Complete spatial basis via right-hand rule | Parity (1) | Absolute time zero | Mathematical convention ($\hat{\mathbf{z}} = \hat{\mathbf{x}} \times \hat{\mathbf{y}}$) |
| **4B. Side Marker (Empirical)** | +1 (non-coplanar) | Choose a physical side marker for the oriented plane | Parity (1) | Absolute time zero | Scalar triple product resolves the reported $\pm\hat{\mathbf{z}}$ side |

**Total Architrinos:**
- **Conventional approach**: 3
- **Empirical approach**: 4

## Categories of Calculation Served by Each Step

| **Category** | **Step 1 (Origin)** | **Step 2 (Axis 1)** | **Step 3 (Plane)** | **Step 4 (Handedness)** |
|--------------|---------------------|---------------------|-------------------|------------------------|
| **Master Equation (Position-Dependent Forces)** | ✓ | ✓ | ✓ | — |
| **Velocity & Acceleration (Derivatives)** | ✓ | ✓ | ✓ | — |
| **Scalar Products (Energies, Distances)** | ✓ | ✓ | ✓ | — |
| **Vector Products (Angular Momentum, Torque)** | — | — | ✓ | ✓ |
| **Pseudovectors (magnetic-like fields, helicity proxies)** | — | — | — | ✓ |
| **Weak-sector exposure records** | — | — | — | coordinate signs only |
| **Simulation (Explicit Coordinates)** | ✓ | ✓ | ✓ | ✓ |
| **Frame Transformations (Relativity)** | ✓ | ✓ | ✓ | ✓ |

**Key Insight:**
- Most calculations only require **orientation** (Steps 1-3).
- **Handedness** matters when reporting cross-product, pseudovector, pseudoscalar, or parity-sensitive coordinate quantities. Weak-interaction handedness remains a separate dynamical closure target tied to Noether-core chirality, axial-frame exposure, and reaction provenance.

## Operational vs. Fundamental Distinction

**For the $\mathbb{U}_{\text{now}}$ complete-state bookkeeping perspective:**
The complete-state reconstruction is straightforward. The simulation state has access to all architrino positions and can compute wake geometries exactly. The coordinate system is simply a data structure: an origin offset plus three orthonormal vectors.

**For Physical Observers (assemblies):**
Physical Observers cannot directly measure the complete concentric wake geometry or identify an absolutely stationary architrino by this procedure. Their rulers and clocks are themselves assemblies, distorted by motion and coupling to the Noether Sea. They measure:
- **Proper time** $\tau$, not absolute time $t$
- **Effective coordinates** via local rulers
- **Relative velocities** via Doppler shifts and aberration

The reconstruction described here is a **foundational consistency proof**: it shows the theory has the mathematical structure necessary to define absolute rest and an absolute-frame coordinate scaffold **in principle** from complete ontic data. At accessible energies, the Lorentz-closure target is that moving-assembly deformation, clock/ruler retuning, and two-way signal synchronization bound preferred-frame leakage enough that Physical Observers cannot detect the absolute frame operationally, while the frame remains the ontological bedrock beneath the effective geometry.

For the effective kinematic layer built on top of this scaffold, see [Lorentz Kinematics](../spacetime/lorentz-kinematics.md) and [Emergent Metric](../spacetime/emergent-metric.md).
