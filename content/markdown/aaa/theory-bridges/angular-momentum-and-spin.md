# Angular Momentum and Spin

This bridge explains how angular momentum, spin, helicity, and the constants $h$ and $\hbar$ should be read across standard quantum theory and $\mathbb{A}\mathbb{A}\mathbb{A}$. Its job is not to replace the dynamics chapters. It supplies the dictionary needed to keep the notation coherent while the derivations remain open.

Its closest companions are [Energy](../dynamics/energy.md), [Master Equation](../dynamics/master-equation.md), [Causal Action Functional](../dynamics/causal-action-functional.md), [Quantum Number Mapping](../assemblies/fermions/quantum-number-mapping.md), [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md), [Horizon Chirality](../spacetime/horizon-chirality.md), and [Mapping the Planck Scale to the Tri-Binary Geometry](./planck-scale-tri-binary-alignment.md).

## Core Convention

The safest convention is to keep the standard distinction between $h$ and $\hbar$ and then give it a native $\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation.

- Use $h$ for **closed-cycle action**.
- Use $\hbar=h/(2\pi)$ for **radian-normalized rotational action**, angular momentum, spin, helicity, and rotation generators.
- When a document discusses an accepted causal-root ledger update over one full phase cycle, it should say $h$.
- When a document discusses the angular-momentum variable conjugate to a phase angle, it should say $\hbar$ or an integer / half-integer multiple of $\hbar$.

For a circular or phase-like degree of freedom, the action over one full cycle is

$$
A_{\text{cycle}}=\oint p\,dq.
$$

If the conjugate angular-momentum/action variable is $I$, then

$$
A_{\text{cycle}}=2\pi I.
$$

The Bohr-Sommerfeld form

$$
\oint p\,dq=n h
$$

is therefore equivalent to

$$
I=n\hbar.
$$

This is the central bookkeeping rule. A full cycle carries $h$; a radian-normalized angular-momentum variable carries $\hbar$.

## Energy Relation

The same distinction fixes the common energy notation. If $f$ is ordinary frequency in cycles per unit time and $\omega=2\pi f$ is angular frequency, then

$$
E=h f=\hbar\omega.
$$

So an $\mathbb{A}\mathbb{A}\mathbb{A}$ transaction may be described in either of two equivalent ways:

$$
\Delta E=f\,\Delta A_{\text{cycle}}
$$

or

$$
\Delta E=\omega\,\Delta I.
$$

The first form uses closed-cycle action. The second form uses radian-normalized rotational action. Mixing $h$ with $\omega$ or $\hbar$ with $f$ usually signals a missing $2\pi$ factor.

## Standard Quantum Dictionary

Standard quantum theory separates several angular-momentum concepts that should not be collapsed into one term.

| Standard quantity | Usual symbol | Meaning |
| --- | --- | --- |
| Orbital angular momentum | $\mathbf{L}$ | Angular momentum associated with spatial orbital degrees of freedom. Eigenvalues are labeled by $\ell$ and $m_\ell$. |
| Spin angular momentum | $\mathbf{S}$ | Intrinsic representation under rotations. For spin-$\tfrac{1}{2}$, $s=\tfrac{1}{2}$ and spin projections are $m_s\hbar=\pm\tfrac{1}{2}\hbar$. |
| Total angular momentum | $\mathbf{J}$ | Conserved combination after the relevant coupling is chosen, commonly $\mathbf{J}=\mathbf{L}+\mathbf{S}$ in simple cases. Eigenvalues are labeled by $j$ and $m_j$. |
| Helicity | $\lambda_{\text{hel}}$ | Projection of spin, or the relevant angular-momentum generator of a field mode, along the momentum or propagation direction. |
| Closed-cycle action | $A_{\text{cycle}}$ | Full action around one phase cycle, naturally quantized in units of $h$. |
| Radian-normalized action | $I$ | Action-angle angular-momentum variable, naturally quantized in units of $\hbar$. |

The hydrogen $1s$ state is a useful warning case. At the observer-level quantum-number layer it has orbital quantum number $\ell=0$. If $\mathbb{A}\mathbb{A}\mathbb{A}$ assigns internal outer-binary rotational action to the electron assembly in the same state, that internal action is not the same object as the observer-level electron orbital angular momentum $\mathbf{L}$ of the atomic wavefunction.

## $\mathbb{A}\mathbb{A}\mathbb{A}$ Implementation Layer

In $\mathbb{A}\mathbb{A}\mathbb{A}$, angular momentum is not a primitive extra substance. It emerges from organized motion, phase closure, and conserved history functionals.

At the substrate dynamics level, spatial rotation symmetry supplies the Noether route to total angular-momentum conservation. Because the dynamics are delayed, the conserved quantity is not only the instantaneous mechanical expression

$$
\sum_i \mathbf{x}_i(t)\times \mu_{\text{arch}}\mathbf{v}_i(t).
$$

It must include the angular momentum carried by active causal-wake history. The master-equation program therefore treats total angular momentum as a history-aware conserved functional rather than as a particle-only snapshot.

At the assembly level, binary circulation supplies orbital-like rotational action variables. A tri-binary has inner, middle, and outer binary layers, each with its own characteristic phase, frequency, and admissible causal-root ledger. Those layers can exchange action during a transition while preserving the total ledger.

At the spin level, the target is different. Fermion spin-$\tfrac{1}{2}$ is not supposed to be a tiny literal orbit carrying ordinary $\mathbf{L}$. It is a representation-theoretic closure target: the ordered non-coplanar tri-binary core should transport through the double cover

$$
\widetilde{R}:SU(2)\simeq\mathrm{Spin}(3)\to SO(3),
$$

so that a $2\pi$ rotation changes the internal phase and a $4\pi$ rotation restores it. That is the geometric spinor program, not yet a completed derivation.

## Tri-Binary Redistribution

The clean way to state an accepted action transaction is

$$
\Delta A_{\text{cycle}}=h.
$$

The corresponding radian-normalized increment is

$$
\Delta I_{\text{tot}}=\hbar.
$$

For a tri-binary transition, the useful bookkeeping target is therefore

$$
\Delta I_{\text{inner}}
+\Delta I_{\text{middle}}
+\Delta I_{\text{outer}}
+\Delta I_{\text{wake}}
=\hbar,
$$

with an energy ledger of the form

$$
\Delta E
=\omega_{\text{inner}}\Delta I_{\text{inner}}
+\omega_{\text{middle}}\Delta I_{\text{middle}}
+\omega_{\text{outer}}\Delta I_{\text{outer}}
+\Delta E_{\text{wake}}.
$$

This does not mean that each binary receives the same share. The partition is a dynamics problem. It should be determined by:

1. conservation of total energy,
2. conservation of total angular momentum,
3. admissible causal-root ledger changes,
4. phase-lock constraints among the inner, middle, and outer binary frequencies,
5. the stability of the resulting branch,
6. and the coupling geometry of the incoming or outgoing transaction.

The outer binary is the natural external coupling layer, so a photon or environmental transaction may couple there first. The middle binary sits at the field-speed border and acts as the separator or fulcrum layer where small branch changes can have large ledger consequences. The inner binary operates in the self-hit or super-field-speed regime, so it can respond through path-history feedback and multi-step reconfiguration. A correct derivation must solve all three roles together rather than assigning the entire $\hbar$ increment to one layer by fiat.

## Spin, Helicity, and Vector Modes

Spin labels in the corpus should be read as effective transformation classes of stable assembly behavior.

- Spin-$0$ means scalar or radial response with no attached orientation axis.
- Spin-$\tfrac{1}{2}$ means ordered-core spinor behavior, with the $4\pi$ closure target described above.
- Spin-$1$ means a vector mode with one distinguished axis and transverse phase structure.
- Spin-$2$ means tensor-like transverse-traceless deformation data.

For photons, the standard quantum target is especially strict. A photon has no rest frame and no longitudinal physical polarization in the validated free-space regime. Its spin information appears as helicity $\pm1$, the projection along the propagation axis. The $\mathbb{A}\mathbb{A}\mathbb{A}$ photon model must therefore show how the coaxial contra-rotating pro/anti planar pair carries exactly the two transverse modes and helicity states of the standard photon channel.

For massive vector bosons, the standard target differs. A massive spin-$1$ particle has three spin projections in its rest-frame representation. The $W^\pm$ and $Z$ chapters can still describe a vector corridor with a distinguished axis and transverse structure, but they should not silently import the photon-only "exactly two transverse modes" statement into the massive-vector case.

Helicity-like language should also be scoped carefully. A sign of planar angular momentum relative to a chosen normal is a useful boundary quantity. It becomes standard helicity only when that normal is dynamically identified with the momentum or propagation direction.

## Planck Alignment Use

The Planck-alignment program should use two linked quantities:

$$
\mathcal{A}_{\text{align}}^{\text{cycle}}\stackrel{\text{hyp.}}{\approx} h,
\qquad
I_{\text{align}}
=\frac{\mathcal{A}_{\text{align}}^{\text{cycle}}}{2\pi}
\stackrel{\text{hyp.}}{\approx}\hbar.
$$

This keeps the conjecture strong without confusing the unit convention. The alignment state may be a universal full-cycle action lock. If so, $h$ is the natural constant for the closed cycle, while $\hbar$ is the natural constant for the angular-momentum generator and for spin/helicity comparisons.

## Terminology Rules

The following usage should be preferred across the corpus:

- Write "one $h$ of closed-cycle action," not "one $h$ of angular momentum."
- Write "one $\hbar$-scale angular-momentum increment" when the quantity is a rotational-action variable or generator.
- Write "closed-cycle action transaction" when the causal-root ledger update is the subject.
- Write "radian-normalized rotational action" when using $\omega$ in an energy equation.
- Write "spinor closure target" when discussing the $4\pi$ fermion mechanism before a formal bundle proof exists.
- Write "helicity" only for projection onto a propagation or momentum axis; otherwise use "helicity-like sign" or the local term already defined in the document.

## Closure Targets

The bridge leaves several derivations open.

1. Derive the conserved total angular-momentum functional of the delayed dynamics, including causal-wake terms, from the regularized nonlocal action.
2. Derive the tri-binary partition rule for an accepted $\Delta A_{\text{cycle}}=h$ transaction.
3. Determine whether the partition is unique or branch-dependent for inner, middle, and outer binary layers.
4. Prove or falsify the $SU(2)\to SO(3)$ spinor lift for ordered non-coplanar Noether cores.
5. Recover photon helicity $\pm1$ and exactly two physical transverse photon modes from the coaxial contra-rotating pro/anti planar pair.
6. Separate photon helicity closure from massive vector-boson spin closure.
7. Map observer-level orbital angular momentum, such as atomic $\ell$, to assembly-level internal rotational action without conflating the two.

Until those targets are closed, the corpus should treat the angular-momentum dictionary as a disciplined mapping layer. It is strong enough to guide notation and prevent $2\pi$ drift, but it is not yet a proof that $h$, $\hbar$, spin, and orbital angular momentum have all been derived from the master equation.
