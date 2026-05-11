# Weak Mixing Angle

This note records the current geometric interpretation of the weak mixing angle inside the assembly framework. Its purpose is to distinguish what is being used as a constrained geometric hypothesis from what is already measured electroweak phenomenology, and to keep the scaffold-frame versus axial-frame distinction explicit. It bridges the fermion-side geometry to [Electroweak Bosons: Photons, W/Z, and Higgs](../bosons/electroweak-bosons.md) and [Emergence of U(1)/SU(2)](../../interactions/gauge-structure-emergence.md).

## Purpose

The Weinberg angle $\theta_W$ is the electroweak mixing angle of the Standard Model. It parameterizes how the weak-isospin neutral boson $W^3$ and the hypercharge boson $B$ combine to form the physical photon $\gamma$ and the neutral weak boson $Z$. Equivalently, it sets the relative alignment between the SU(2) and U(1) electroweak sectors, so it appears wherever neutral-current and charged-current electroweak couplings are compared. In the present note, we do not assume that the measured Weinberg angle itself is literally an internal quark tilt. Instead, we use the existing bare six-pole relation in $\mathbb{A}\mathbb{A}\mathbb{A}$ as a possible geometric increment for axial-frame misalignment.

This note records a constrained geometric hypothesis for fermion assemblies in $\mathbb{A}\mathbb{A}\mathbb{A}$:

- the **Noether core axes remain fixed** as the reference scaffold,
- the **axial distribution** is allowed to rotate relative to that scaffold,
- stable quark-like states may occupy a **discrete set of misalignment angles**,
- the natural bare increment for those angles is identified with the existing six-pole electroweak value
$$
\sin^2\theta_W^{\text{bare}}=\frac14,
$$
so that
$$
\theta_W^{\text{bare}}=30^\circ.
$$

This is intentionally narrower than a claim that the H/M/L axes themselves tilt or precess into new orientations. The tri-binary scaffold remains the kinematic frame. What changes is the orientation of the **principal axial frame** and therefore the orientation of the **weak-coupling triad** relative to the fixed core frame.

---

## Core Distinction

We separate two structures that are often spoken about together but should not be conflated.

### 1. Core frame

The [Noether core](../noether-core.md) is the neutral tri-binary scaffold. It defines:

- generation via shielding level,
- matter/antimatter braid orientation,
- the three reference axes $(H,M,L)$,
- the geometric seat of spinor behavior.

In this idea, the core frame is **not** allowed to undergo a new quark-specific axial distortion. Its role is to provide the reference triad
$$
\mathcal{F}_{\text{core}} = \{\hat{\mathbf{e}}_H,\hat{\mathbf{e}}_M,\hat{\mathbf{e}}_L\}.
$$

### 2. Axial Frame

The six axial architrinos define a second frame through their coarse-grained charge moments. At lowest order this can be represented by a principal-axis frame extracted from the axial distribution:
$$
\mathcal{F}_{\text{ax}} = \{\hat{\mathbf{p}}_1,\hat{\mathbf{p}}_2,\hat{\mathbf{p}}_3\}.
$$

For a perfectly symmetric lepton-like axial layer, these two frames coincide. For a quark-like axial layer with axis exceptionality, they need not coincide; compare the charge-and-axis bookkeeping in [Quantum Number Mapping](./quantum-number-mapping.md).

The geometric object of interest is therefore the relative rotation
$$
R_{\text{rel}} \in SO(3),
\qquad
\mathcal{F}_{\text{ax}} = R_{\text{rel}}\,\mathcal{F}_{\text{core}}.
$$

This note proposes that physically stable fermion assemblies use only a restricted subset of such rotations.

---

## Electron Limit: Zero Misalignment

The [electron](./electron.md) provides the clean reference case.

In the Generation-I electron, the axial layer is $6E$. At coarse-grained level:

- no axis is exceptional,
- the load on the three axes is equivalent,
- there is no color asymmetry,
- the weak-active and shielded sectors can be defined without introducing a shear between core and axial frames.

The natural equilibrium statement is
$$
R_{\text{rel}} = I,
$$
or equivalently a vanishing misalignment angle
$$
\alpha = 0.
$$

This should be read as the **isotropic limit** of the axial geometry, not as a separate dynamical law. In plain terms: when all six axial architrinos share the same polarity, there is no internal reason for the axial frame to rotate away from the core triad.

---

## Quark Limit: Rotated Axial Geometry

Quarks are different for two independent reasons already present in the existing geometry:

1. the axial layer is **charge-imbalanced**,
2. one axis is **exceptional** relative to the other two, giving color structure.

For up-type and down-type quarks the imbalance differs:

- up-type: $5P,1E$,
- down-type: $2P,4E$.

This means the axial layer does not merely carry a net observer-level charge. It also carries a nontrivial anisotropic load. That anisotropic load can be encoded in an axial-moment tensor
$$
M_{ij} = \sum_{a=1}^{6} q_a\,n_i^{(a)} n_j^{(a)},
$$
where $q_a\in\{+\epsilon,-\epsilon\}$ and $\mathbf{n}^{(a)}$ are the six polar-site directions measured in the core frame.

The eigenvectors of $M_{ij}$ define the principal axial axes. For leptons, symmetry tends to force these axes to align with the core frame. For quarks, the asymmetry generically produces
$$
[M,\delta] \neq 0
$$
in the core basis, so the axial frame rotates to a nearby but distinct orientation.

The proposal is not that quarks can take arbitrary rotations. The proposal is that the admissible minima are **discrete**. In that sense this note is also an interface to [Weak Mixing and CKM](./weak-mixing-ckm.md), where the quark-sector overlap structure is pushed further.

---

## Bare Weinberg Increment as the Discrete Step

A useful existing hook in the current AAA notes is the six-pole weak-mixing statement
$$
\sin^2\theta_W^{\text{bare}} = \frac14.
$$
This implies the bare geometric angle
$$
\theta_W^{\text{bare}} = 30^\circ.
$$

The present idea is to reuse this as a **axial-frame increment**, not as a claim that the observed electroweak angle and internal quark orientation are numerically identical in all environments.

Define a discrete family of candidate equilibrium misalignment angles
$$
\alpha_n = n\,\theta_W^{\text{bare}} = n\times 30^\circ,
\qquad n\in\mathbb{Z}.
$$

Because an axial frame is an oriented triad and because many rotations are physically equivalent up to sign flips, pole relabelings, or color-phase shifts, the physically distinct set is expected to be much smaller than all integers. A practical first working set is
$$
\alpha \in \{0,30^\circ,60^\circ,90^\circ\},
$$
with additional identifications made by symmetry.

The electron occupies the $\alpha=0$ branch. Quarks would then occupy one of the nonzero branches.

---

## What Actually Rotates

To avoid ambiguity, this idea should be stated in operational terms.

The following are allowed to rotate relative to the fixed core frame:

- the principal axes of the six-site axial-distribution tensor,
- the coarse orientation of the weak-coupling triad,
- the effective exposed-vs-shielded partition in the forward coupling geometry,
- the dominant dipole/quadrupole direction associated with quark asymmetry.

The following are **not** rotating in this note:

- the H/M/L Noether-core scaffold itself,
- the binary nesting order that defines generation,
- the matter/antimatter braid orientation,
- the topological structure used to motivate spin-1/2 behavior.

This separation is important because otherwise one mixes together three different jobs:

- core topology,
- axial anisotropy,
- electroweak exposure geometry.

Those should be kept distinct unless a later derivation proves they collapse to one object.

---

## Minimal Geometric Parameterization

A minimal way to encode the hypothesis is by one angle $\alpha$ and one discrete color label $c$.

- $\alpha$: polar misalignment of the axial frame relative to the core frame,
- $c \in \{H,M,L\}$: the exceptional-axis label selecting the quark color sector.

Then a first-pass rotation may be written as
$$
R_{\text{rel}}(\alpha,c) = R_{\text{axis}}(c)\,R_{\text{tilt}}(\alpha),
$$
where:

- $R_{\text{axis}}$ chooses the exceptional-axis sector,
- $R_{\text{tilt}}$ sets the discrete axial misalignment.

In this language:

- color remains the three-state exceptional-axis assignment,
- flavor-dependent quark structure enters through the allowed values of $\alpha$ and through the axial-tensor amplitudes,
- electron-like states remain at $\alpha=0$ and color singlet.

So the proposal does **not** replace the current color picture. It adds a second geometric datum: a discrete polar misalignment carried by the axial frame.

---

## Why Up and Down Need Not Share a Branch

The up and down quarks should not be distinguished only by total charge. Their axial tensors have different structure and therefore can support different equilibrium branches.

### Up-type expectation

For $5P,1E$:

- two axes are effectively positrino-rich,
- one axis contains the exceptional mixed or depleted structure,
- the net axial moment is strongly one-sided.

This suggests a relatively stiff anisotropy with a sharply defined exceptional direction. Such a configuration may favor one discrete nonzero angle, for example a single-step branch $\alpha = 30^\circ$ or a two-step branch $\alpha = 60^\circ$ depending on how the mixed axis loads the surrounding Noether Sea.

### Down-type expectation

For $2P,4E$:

- the imbalance is weaker in net positive charge but stronger in electrino loading,
- the exceptional axis can arise through more than one admissible family of axis assignments,
- the outer field may be more sheared than sharply pointed.

This suggests that down-type quarks need not minimize the same effective angle as up-type quarks. They may occupy a different branch even when the color azimuth is held fixed.

This gives a possible path for distinguishing quark flavors geometrically without rotating the Noether core itself.

---

## Effective Energy Functional

To make the idea testable, the discrete-angle claim should be attached to an effective energy or action.

A minimal phenomenological form is
$$
E_{\text{eff}}(\alpha,\phi_c)
=
E_{\text{charge}}(\alpha)
+
E_{\text{color}}(\phi_c)
+
E_{\text{cross}}(\alpha,\phi_c)
+
E_{\text{wake}}(\alpha).
$$

Here:

- $E_{\text{charge}}$ measures internal strain from placing an imbalanced six-architrino axial layer on the fixed scaffold,
- $E_{\text{color}}$ enforces the threefold azimuthal structure,
- $E_{\text{cross}}$ captures coupling between exceptional-axis choice and axial tilt,
- $E_{\text{wake}}$ is the Noether-Sea response to the exposed axial geometry.

The discrete-angle hypothesis is the statement that
$$
\frac{\partial E_{\text{eff}}}{\partial \alpha}=0
$$
at
$$
\alpha = n\theta_W^{\text{bare}},
$$
and that these stationary points are true minima for the stable branches.

A simple toy realization is
$$
E_{\text{charge}}(\alpha)=A\sin^2\!\left(\frac{\alpha}{\theta_W^{\text{bare}}}\pi\right)+B\,f_{\text{type}}(\alpha),
$$
where $f_{\text{type}}$ differs for up-type and down-type loading. This is not a derivation; it is just the minimal shape needed to encode discrete minima at multiples of the bare angle.

---

## Weak-Coupling Interpretation

In the current AAA dictionary, the weak sector acts on the **weak-coupling triad**, the three more exposed polar sites. If the axial frame rotates relative to the core frame, then the weak-coupling triad need not sit in the same orientation as it does in the electron.

This gives a possible geometric interpretation of quark weak structure:

- the quark still has a fixed core frame,
- the active three-site weak sector is carried on a rotated axial frame,
- weak transitions couple to that rotated frame,
- observed electroweak mixing then depends on both charge assignment and frame misalignment.

This is a cleaner statement than saying that weak mixing directly rotates the core axes. The weak interaction sees the **axial geometry that is exposed to the Sea**, not necessarily a reorientation of the neutral scaffold.

---

## Relation to Color

This idea must coexist with the current color construction rather than replace it.

Current color picture:

- one axis is exceptional,
- color labels which exceptional-axis sector the quark occupies,
- baryon color neutrality arises from H/M/L singlet closure.

Extended picture proposed here:

- color still labels the exceptional-axis sector $c$,
- a second datum $\alpha$ labels the polar misalignment of the axial frame,
- the full quark state is therefore specified by both
$$
(c,\alpha).
$$

In this sense, color answers the question

- which axis is exceptional?

while the Weinberg-locked axial rotation answers

- how far is the axial frame tilted away from the core reference frame?

That division of labor is geometrically cleaner than overloading color to do both jobs.

---

## Symmetry and Redundancy

Not every formal value of $n$ gives a new physical state.

Potential redundancies include:

- reversing a principal axis together with a pole relabeling,
- rotating by $180^\circ$ and exchanging equivalent background axes,
- relabelings of the color basis that can be absorbed into the existing SU(3)-like axis labeling,
- matter/antimatter conjugation that flips polarity signs without requiring a new core scaffold.

So the real task is not to enumerate all multiples of $30^\circ$, but to identify the **small quotient set of inequivalent minima** after these symmetries are imposed.

---

## What Would Count as Success

This idea becomes useful only if it improves closure rather than adding extra structure.

### Minimum closure targets

1. The electron must remain the zero-misalignment limit.
2. Up- and down-type quarks must emerge as different stable axial-frame branches.
3. The color construction must remain intact: one exceptional axis, three color sectors, baryon singlet closure.
4. Charge quantization must remain exact in units of $e/6$.
5. The rotated weak-coupling frame must not break the existing $Q=T_3+Y/2$ bookkeeping.

### Stronger targets

1. The same discrete-angle rule should help explain why quarks are color-charged while leptons are colorless.
2. It should feed naturally into CKM-style weak-basis vs mass-basis misalignment without requiring core-axis deformation.
3. It should offer a principled reason that the bare six-pole geometry produces a preferred angular increment of $30^\circ$.

If the idea does not improve one of those closure targets, it should be treated as suggestive geometry rather than theory content.

---

## Failure Modes

This hypothesis should be discarded or revised if any of the following occurs:

1. The discrete-angle rule forces violations of the existing color-singlet closure for baryons.
2. The rotated axial frame spoils the weak-triad arithmetic that currently reproduces the quark/lepton doublets.
3. The angle assignment becomes arbitrary, with no energy functional or symmetry argument selecting the allowed branches.
4. The same observed structure can be explained more simply by axial-moment anisotropy alone, without any quantized $30^\circ$ locking.

The fourth point matters. The discrete-angle idea is only worthwhile if it explains a pattern that continuous misalignment would explain less well.

---

## Working Summary

The sharpened hypothesis is:

- the **Noether core stays fixed**,
- the **axial frame** may rotate relative to that fixed core,
- the electron sits at the symmetric limit $\alpha=0$,
- quarks occupy nonzero misalignment branches because their axial layers are both charge-imbalanced and axis-exceptional,
- the stable branches may be quantized in increments of the existing bare electroweak angle
$$
\theta_W^{\text{bare}}=30^\circ,
$$
with color providing an independent exceptional-axis label.

In short: do not rotate the scaffold; rotate the axial frame. Then ask whether the six-pole electroweak geometry selects discrete quark misalignment angles as part of the same underlying assembly logic.
