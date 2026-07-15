# Weak Mixing Angle

This note records the geometric interpretation of the weak mixing angle inside the assembly framework. Its purpose is to distinguish what is being used as a constrained geometric hypothesis from what is already measured electroweak phenomenology, and to keep the scaffold-frame versus axial-frame distinction explicit. It bridges the fermion-side geometry to [Electroweak Bosons: Photons, W/Z, and Higgs](../bosons/electroweak-bosons.md) and [Gauge Structure Emergence](../gauge-structure-emergence.md).

The measured Weinberg angle is an observer-level electroweak fact. This note does not reduce that fact to a bare visual tilt. It asks a narrower implementation question: whether the same six-pole assembly geometry that organizes weak exposure also supplies a discrete axial-frame increment that participates in the dressed electroweak mixing calculation.

## Purpose

The Weinberg angle $\theta_W$ is the electroweak mixing angle of the Standard Model. It parameterizes how the weak-isospin neutral boson $W^3$ and the hypercharge boson $B$ combine to form the physical photon $\gamma$ and the neutral weak boson $Z$. Equivalently, it sets the relative alignment between the SU(2) and U(1) electroweak sectors, so it appears wherever neutral-current and charged-current electroweak couplings are compared. This note does not assume that the measured Weinberg angle itself is literally an internal quark tilt. Instead, it uses the existing bare six-pole relation in $\mathbb{A}\mathbb{A}\mathbb{A}$ as a possible geometric increment for axial-frame misalignment.

The distinction matters because one number can appear in two layers. The Standard Model angle is the effective coupling angle after electroweak dressing. The candidate branch increment below is a geometry-side input that would still need dressing, normalization, and comparison before it could be identified with measured electroweak data.

This note records a constrained geometric hypothesis for fermion assemblies in $\mathbb{A}\mathbb{A}\mathbb{A}$:

- the **Noether braid axes remain fixed** as the reference scaffold,
- the **axial distribution** is allowed to rotate relative to that scaffold,
- stable quark-like states may occupy a **discrete set of misalignment angles**,
- the candidate branch increment for those angles is hypothesized, not derived here, to satisfy the existing six-pole electroweak value
$$
\sin^2\theta_{\mathrm{inc}}=\frac14
$$
so that
$$
\theta_{\mathrm{inc}}=\frac{\pi}{6}=30^\circ
$$

This is intentionally narrower than a claim that the H/M/L axes themselves tilt or precess into new orientations. The nested shell braid scaffold remains the kinematic frame. What changes is the orientation of the **principal axial frame** and therefore the orientation of the **weak-coupling triad** relative to the fixed core frame.

---

## Core Distinction

We separate two structures that are often spoken about together but should not be conflated. The core frame is the neutral scaffold; the axial frame is the exposed six-pole load. Weak mixing can only be discussed cleanly after those two frames are kept separate.

### 1. Core frame

The [Noether braid](../../noether-braid/noether-braid.md) is the neutral nested shell braid scaffold. It defines:

- generation via shielding level,
- the retained matter-versus-polarity-conjugate branch relation,
- the three reference axes $(H,M,L)$,
- the geometric seat of spinor behavior.

In this idea, the core frame is **not** allowed to undergo a new quark-specific axial distortion. Its role is to provide the reference triad
$$
\mathcal{F}_{\text{core}} = \{\hat{\mathbf{e}}_H,\hat{\mathbf{e}}_M,\hat{\mathbf{e}}_L\}
$$

### 2. Axial Frame

The six axial architrinos define a second frame through their coarse-grained polarity moments. At lowest order this can be represented by a principal-axis frame extracted from the axial distribution:
$$
\mathcal{F}_{\text{ax}} = \{\hat{\mathbf{p}}_1,\hat{\mathbf{p}}_2,\hat{\mathbf{p}}_3\}
$$

For a perfectly symmetric lepton-like axial layer, the axial moment record is isotropic, so no independent axial frame is distinguished; the core frame supplies the natural zero-misalignment convention. For a quark-like axial layer with axis exceptionality, the axial moment record can select a nontrivial axial frame; compare the charge-and-axis bookkeeping in [Quantum Number Mapping](./quantum-number-mapping.md).

The geometric object of interest is therefore the relative rotation
$$
R_{\text{rel}} \in SO(3),
\qquad
\mathcal{F}_{\text{ax}} = R_{\text{rel}}\,\mathcal{F}_{\text{core}}
$$

This note proposes that physically stable fermion assemblies use only a restricted subset of such rotations.

---

## Electron Limit: Zero Misalignment

The [electron](./electron.md) provides the clean reference case.

In the Generation-I electron, the axial layer is $6\epsilon_-$. At coarse-grained level:

- no axis is exceptional,
- the load on the three axes is equivalent,
- there is no color asymmetry,
- the weak-active and shielded sectors can be defined without introducing a shear between core and axial frames.

The natural equilibrium statement is
$$
R_{\text{rel}} = I
$$
or equivalently a vanishing misalignment angle
$$
\alpha = 0
$$

This should be read as the **isotropic limit** of the axial geometry, not as a separate dynamical law. In plain terms: when all six axial architrinos share the same polarity, there is no internal reason for the axial frame to rotate away from the core triad.

---

## Quark Limit: Rotated Axial Geometry

Quarks are different for two independent reasons already present in the existing geometry:

1. the axial layer is **charge-imbalanced**,
2. one axis is **exceptional** relative to the other two, giving color structure.

For up-type and down-type quarks the imbalance differs:

- up-type: $5\epsilon_+,1\epsilon_-$,
- down-type: $2\epsilon_+,4\epsilon_-$.

This means the axial layer does not merely carry a net observer-level charge. It also carries nontrivial even and odd polarity moments. The signed even moment is
$$
M_{ij} = \sum_{a=1}^{6} q_a\,n_i^{(a)} n_j^{(a)}
$$
where $q_a\in\{+\epsilon,-\epsilon\}$ and $\mathbf{n}^{(a)}$ are the six polar-site directions measured in the core frame.

Because $M_{ij}$ is even under $\mathbf{n}\mapsto-\mathbf{n}$, it detects signed same-polarity dyad loading but is blind to a perfectly antipodal mixed polar dyad. A mixed dyad with one $\epsilon_+$ and one $\epsilon_-$ cancels in $M_{ij}$ even though it is exactly the local axis-exceptional structure that matters for up-type quarks and one down-type family. The complementary odd moment is therefore required:
$$
d_i = \sum_{a=1}^{6}q_a\,n_i^{(a)}
$$
A same-polarity polar dyad gives no contribution to $d_i$, while a mixed polar dyad contributes a vector $\pm2\epsilon\,\hat{\mathbf n}$ according to which pole carries which polarity. The axial frame should therefore be read from the joint moment record $(M_{ij},d_i)$, not from $M_{ij}$ alone.

This also limits what the idealized on-axis polarity count can prove. In the symmetric charged-lepton limit $M_{ij}$ is proportional to the identity and $d_i=0$, so the axial frame is not separately distinguished. In an idealized quark pattern, $(M_{ij},d_i)$ can identify the exceptional axis while still remaining diagonal or axis-aligned in the core frame. The actual misalignment diagnostic belongs to the displaced equilibrium selected by the effective energy, with the off-diagonal axial-tensor load measured after the polar-site directions have relaxed:
$$
\mathcal{R}_{\mathrm{off}}(M;\mathcal{F}_{\text{core}})
=
\sum_{i\ne j}|M_{ij}|^2
$$
The axial-frame rotation target is $\mathcal{R}_{\mathrm{off}}>0$ on that relaxed record, or equivalently a joint principal frame for $(M_{ij},d_i)$ that is rotated away from $\mathcal{F}_{\text{core}}$. If $\mathcal{R}_{\mathrm{off}}=0$ while $d_i$ selects a core axis or the eigenvalues of $M_{ij}$ differ, the axial layer is exceptional or anisotropic while still aligned with the core frame; that case should not be counted as a misalignment branch.

The proposal is not that quarks can take arbitrary rotations. The proposal is that the admissible minima are **discrete**. In that sense this note is also an interface to [Weak Mixing and CKM](../../philosophy-history/theory-bridges/weak-mixing-ckm.md), where the quark-sector overlap structure is pushed further.

---

## Branch-Increment Hypothesis as the Discrete Step

A useful existing hook in the current $\mathbb{A}\mathbb{A}\mathbb{A}$ notes is the six-pole weak-mixing statement
$$
\sin^2\theta_{\mathrm{inc}} = \frac14
$$
This implies the candidate geometric branch increment
$$
\theta_{\mathrm{inc}} = \frac{\pi}{6}=30^\circ
$$

The present idea is to reuse this as an **axial-frame increment**, not as a claim that the observed electroweak angle and internal quark orientation are numerically identical in all environments. The symbol $\theta_W^{\text{bare}}$ should be treated only as a comparison label for this branch-increment hypothesis until the six-pole quotient and electroweak dressing calculation are derived.

Define a discrete family of candidate equilibrium misalignment angles
$$
\alpha_n = n\,\theta_{\mathrm{inc}} = n\frac{\pi}{6},
\qquad n\in\mathbb{Z}
$$
Equivalently, $\alpha_n=n\times30^\circ$ for reader-facing degree notation. In energy or action functionals below, $\alpha$ and $\theta_{\mathrm{inc}}$ are radians.

Because an axial frame is an oriented triad and because many rotations are physically equivalent up to sign flips, pole relabelings, or color-phase shifts, the physically distinct set is expected to be much smaller than all integers. A practical first working set is
$$
\alpha \in \{0,30^\circ,60^\circ,90^\circ\}
$$
with additional identifications made by symmetry.

This set is explicitly pre-quotient. In particular, the $90^\circ$ entry survives only if pole reversal and axis-flip equivalences do not reduce it to a lower representative.

The electron occupies the $\alpha=0$ branch. Quarks would then occupy one of the nonzero branches.

---

## What Actually Rotates

To avoid ambiguity, this idea should be stated in operational terms.

The following are allowed to rotate relative to the fixed core frame:

- the principal axes of the six-site axial moment record $(M_{ij},d_i)$,
- the coarse orientation of the weak-coupling triad,
- the effective exposed-vs-shielded partition in the forward coupling geometry,
- the dominant dipole/quadrupole direction associated with quark asymmetry.

The following are **not** rotating in this note:

- the H/M/L Noether braid scaffold itself,
- the binary nesting order that defines generation,
- the retained matter-versus-polarity-conjugate branch relation,
- the topological structure used to motivate spin-$\tfrac{1}{2}$ behavior.

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
R_{\text{rel}}(\alpha,c) = R_{\text{axis}}(c)\,R_{\text{tilt}}(\alpha)
$$
where:

- $R_{\text{axis}}$ chooses the exceptional-axis sector,
- $R_{\text{tilt}}$ sets the discrete axial misalignment.

In this language:

- color remains the three-state exceptional-axis assignment,
- flavor-dependent quark structure enters through the allowed values of $\alpha$ and through the axial-tensor amplitudes,
- electron-like states remain at $\alpha=0$ and color singlet.

So the proposal does **not** replace the color picture. It adds a second geometric datum: a discrete polar misalignment carried by the axial frame.

---

## Why Up and Down Need Not Share a Branch

The up and down quarks should not be distinguished only by total charge. Their axial tensors have different structure and therefore can support different equilibrium branches.

### Up-type expectation

For $5\epsilon_+,1\epsilon_-$:

- two axes are effectively positrino-rich,
- one axis contains the exceptional mixed or depleted structure,
- the net axial moment is strongly one-sided.

This suggests a relatively stiff anisotropy with a sharply defined exceptional direction. Such a configuration may favor one discrete nonzero angle, for example a single-step branch $\alpha = 30^\circ$ or a two-step branch $\alpha = 60^\circ$ depending on how the mixed axis loads the surrounding Noether sea.

### Down-type expectation

For $2\epsilon_+,4\epsilon_-$:

- the imbalance is weaker in net positive charge but stronger in electrino loading,
- the exceptional axis can arise through more than one admissible family of axis assignments,
- the outer field may be more sheared than sharply pointed.

This suggests that down-type quarks need not minimize the same effective angle as up-type quarks. They may occupy a different branch even when the color azimuth is held fixed.

This gives a possible path for distinguishing quark flavors geometrically without rotating the Noether braid itself.

---

## Effective Energy Functional

To make the idea testable, the discrete-angle claim should be attached to an effective energy or action.

A minimal phenomenological form is
$$
E_{\text{eff}}(\alpha,\phi_c)
=
E_{\text{polarity}}(\alpha)
+
E_{\text{color}}(\phi_c)
+
E_{\text{cross}}(\alpha,\phi_c)
+
E_{\text{wake}}(\alpha)
$$

Here:

- $E_{\text{polarity}}$ measures internal strain from placing an imbalanced six-architrino axial layer on the fixed scaffold,
- $E_{\text{color}}$ enforces the threefold azimuthal structure,
- $E_{\text{cross}}$ captures coupling between exceptional-axis choice and axial tilt,
- $E_{\text{wake}}$ is the Noether sea response to the exposed axial geometry.

The discrete-angle hypothesis is the statement that
$$
\frac{\partial E_{\text{eff}}}{\partial \alpha}=0
$$
at
$$
\alpha = n\theta_{\mathrm{inc}}
$$
and that these stationary points are true minima for the stable branches.

A simple toy realization, with $\alpha$ and $\theta_{\mathrm{inc}}$ measured in radians, is
$$
E_{\text{polarity}}(\alpha)=A\sin^2\!\left(\frac{\alpha}{\theta_{\mathrm{inc}}}\pi\right)+B\,f_{\text{type}}(\alpha)
$$
where $f_{\text{type}}$ differs for up-type and down-type loading. This is not a derivation; it is just the minimal shape needed to encode discrete minima at multiples of the branch increment.

### Closure handoff

For the weak-sector closure route, this note owns the first gate: selecting the inequivalent axial-frame branches. The output should not be only a list of candidate angles. It should be a quotient of physically distinct $(c,\alpha)$ states after color relabeling, pole reversal, matter/antimatter conjugation, and equivalent frame flips are removed.

The useful theorem target is:

1. define the admissible axial-layer configuration space for a fixed Noether braid,
2. quotient by color-basis relabeling and pole symmetries,
3. minimize $E_{\text{eff}}(\alpha,\phi_c)$ on the quotient space,
4. pass the surviving branches to the weak-coupling-triad exposure calculation.

That handoff keeps the claim strong but scoped. The weak-mixing increment $\theta_{\mathrm{inc}}=30^\circ$ is a candidate branch increment; the measured electroweak angle and CKM/PMNS matrices still require the exposure, overlap, and provenance gates to close.

---

## Weak-Coupling Interpretation

In the $\mathbb{A}\mathbb{A}\mathbb{A}$ dictionary, the weak sector acts on the **weak-coupling triad**, the three more exposed polar sites. If the axial frame rotates relative to the core frame, then the weak-coupling triad need not sit in the same orientation as it does in the electron.

This gives a possible geometric interpretation of quark weak structure:

- the quark still has a fixed core frame,
- the active three-site weak sector is carried on a rotated axial frame,
- weak transitions couple to that rotated frame,
- observed electroweak mixing then depends on both charge assignment and frame misalignment.

This is a cleaner statement than saying that weak mixing directly rotates the braid axes. The weak interaction sees the **axial geometry that is exposed to the Noether sea**, not necessarily a reorientation of the neutral scaffold.

---

## Relation to Color

This idea must coexist with the color construction rather than replace it.

Color picture:

- one axis is exceptional,
- color labels which exceptional-axis sector the quark occupies,
- baryon color neutrality arises from H/M/L singlet closure.

Extended picture proposed here:

- color still labels the exceptional-axis sector $c$,
- a second datum $\alpha$ labels the polar misalignment of the axial frame,
- the full quark state is therefore specified by both
$$
(c,\alpha)
$$

In this sense, color answers the question

- which axis is exceptional?

while the branch-increment axial rotation answers

- how far is the axial frame tilted away from the core reference frame?

That division of labor is geometrically cleaner than overloading color to do both jobs.

---

## Symmetry and Redundancy

Not every formal value of $n$ gives a new physical state.

Potential redundancies include:

- reversing a principal axis together with a pole relabeling,
- rotating by $180^\circ$ and exchanging equivalent background axes,
- relabelings of the color basis that can be absorbed into the existing SU(3)-like axis labeling,
- matter/antimatter branch-record conjugation, where every architrino polarity reverses at fixed worldlines and the retained path-history, wake-history, causal-root, and stability rows transform with the same scaffold. The pro/anti ordered orientation is unchanged, while a charged-sector ledger maps to its opposite effective-charge row.

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
2. The rotated axial frame spoils the weak-triad arithmetic that reproduces the quark/lepton doublets.
3. The angle assignment becomes arbitrary, with no energy functional or symmetry argument selecting the allowed branches.
4. The same observed structure can be explained more simply by axial-moment anisotropy alone, without any quantized $30^\circ$ locking.

The fourth point matters. The discrete-angle idea is only worthwhile if it explains a pattern that continuous misalignment would explain less well.

---

## Working Summary

The sharpened hypothesis is:

- the **Noether braid stays fixed**,
- the **axial frame** may rotate relative to that fixed core,
- the electron sits at the symmetric limit $\alpha=0$,
- quarks occupy nonzero misalignment branches because their axial layers are both charge-imbalanced and axis-exceptional,
- the stable branches may be quantized in increments of the branch-increment hypothesis
$$
\theta_{\mathrm{inc}}=30^\circ
$$
with color providing an independent exceptional-axis label.

In short: do not rotate the scaffold; rotate the axial frame. Then ask whether the six-pole electroweak geometry selects discrete quark misalignment angles as part of the same underlying assembly logic.
