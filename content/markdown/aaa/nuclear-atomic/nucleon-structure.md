# Nucleon Structure

This chapter fixes the current proton and neutron picture used by the nuclear branch. Its purpose is to make the coarse-grained baryon architecture explicit enough that later nuclear notes can treat nucleons as stable units without re-deriving the same assembly assumptions each time. It is the baryon-side bridge between [Quarks](../assemblies/fermions/quarks.md), [Color Charge and SU(3)](../assemblies/fermions/color-charge-su3.md), and [Transient Hadrons: Mesons and Δ Resonances](../assemblies/mesons/mesons.md).

## Purpose

This chapter fixes the canonical proton and neutron picture used by the nuclear branch of $\mathbb{A}\mathbb{A}\mathbb{A}$. It is the coarse-grained baryon chapter: not a full QCD replacement, but a precise statement of what a nucleon is in the current assembly language and which geometric features matter most for nuclear physics.

## Core Claim

A nucleon is a confined three-quark color-singlet assembly built from three Generation-I quark cores linked by shared strong-sector flux structure. In the present architecture:

- a **proton** is the ground-state `uud` tri-core,
- a **neutron** is the ground-state `udd` tri-core.

Each constituent quark is itself a Noether-core assembly with an axial layer of the kind cataloged in [quarks.md](../assemblies/fermions/quarks.md).

## Constituents and Counting

For Generation-I quarks:

- each quark core contributes 6 scaffold architrinos,
- each quark axial layer contributes 6 axial architrinos,
- so each Generation-I quark contributes 12 architrinos total.

Therefore a nucleon contains
$$
3\times 12 = 36
$$
architrinos at the quark-core bookkeeping level, before adding any effective mesonic or medium-level dressing.

The constituent content is:
$$
p = uud,
\qquad
n = udd.
$$

With the quark charge assignments
$$
Q_u=+\frac{2}{3},
\qquad
Q_d=-\frac{1}{3},
$$
one immediately gets
$$
Q_p = 2Q_u+Q_d = +1,
\qquad
Q_n = Q_u+2Q_d = 0.
$$

## Color-Singlet Closure

The nucleon is not three independent quarks sitting side by side. It is a color-closed tri-core braid, with the strong-sector closure picture matching the corridor and flux descriptions in [Gluons and the Strong Force: Geometric Origins](../assemblies/bosons/gluons.md).

At the bookkeeping level, each constituent quark occupies one of the three color sectors
$$
|q_H\rangle,\quad |q_M\rangle,\quad |q_L\rangle,
$$
or equivalently Red, Green, Blue. A baryon singlet uses each exceptional-axis sector once, so the net color flux closes.

This is the nucleon-level meaning of
$$
3\otimes 3\otimes 3 \supset 1.
$$

In the present geometric language:

- each quark contributes one exceptional axis,
- the three exceptional axes occur once each across the tri-core,
- the shared flux structure closes the color braid into a singlet.

That color closure is what makes the proton and neutron long-lived hadronic attractors rather than open-color transients.

## Proton and Neutron as Ground-State Tri-Cores

### Proton

The proton is the lowest stable tri-core with quark content `uud`.

Using the current quark templates:

- two constituents are up-type quarks with axial pattern $5P,1E$,
- one constituent is a down-type quark with pattern $2P,4E$.

So the total axial count is
$$
(5P,1E)+(5P,1E)+(2P,4E)=(12P,6E),
$$
which gives net charge
$$
\frac{12-6}{6}e=+e.
$$

### Neutron

The neutron is the lowest stable tri-core with quark content `udd`.

Its total axial count is
$$
(5P,1E)+(2P,4E)+(2P,4E)=(9P,9E),
$$
so the net charge is
$$
\frac{9-9}{6}e=0.
$$

The neutron is therefore not neutral because it lacks internal charge structure, but because its quark-level axial asymmetries cancel in total.

## Effective Internal Geometry

The current nucleon picture has three structural layers.

### 1. Quark cores

Each constituent quark carries:

- one Generation-I pro-core,
- one six-site axial layer,
- one color-sector assignment.

### 2. Shared strong-sector corridor

The three quarks are joined by a shared strong-sector flux network. At coarse level this can be treated as a Y-junction or closed tri-core braid. The important point is not the exact visual motif. The important point is that the strong-sector energy is stored in the shared closure of the three cores, not in any one quark alone.

### 3. External nucleon envelope

At nuclear scales, the nucleon is seen as one composite hadronic assembly with:

- total charge $+1$ or $0$,
- baryon number $+1$,
- spin $1/2$,
- and residual strong interaction channels that can couple to neighboring nucleons through meson-like exchange.

## Spin and Magnetic-Moment Expectations

The current repo does not yet contain a full proton spin decomposition, but the nucleon chapter can still state the minimal closure picture.

### Spin

The nucleon ground state is taken to be a total
$$
J=\frac{1}{2}
$$
tri-core configuration. This should be read as the low-energy closure class of the coupled three-core assembly, not as the trivial sum of three isolated constituent spins.

In other words, the nucleon spin is expected to include:

- quark-core spinor structure,
- strong-sector orbital circulation,
- and flux-network angular momentum.

That is the natural $\mathbb{A}\mathbb{A}\mathbb{A}$ analogue of the standard statement that proton spin is not carried by naive valence-spin addition alone.

### Magnetic moments

Even before a quantitative derivation, the sign structure is already constrained:

- the proton should have a positive magnetic moment,
- the neutron should have a nonzero negative magnetic moment.

Those sign expectations follow naturally from the dominance of up-type positive charge circulation in the proton and the residual uncompensated internal charge circulation in the neutron. A future derivation should turn this into a computed tri-core moment rather than a qualitative sign check.

## Proton-Neutron Mass Difference

The proton-neutron mass splitting should be read as a competition between at least three effects:
$$
\Delta m_{np}
\equiv
m_n-m_p
\approx
\Delta E_{\text{down-up}}
+\Delta E_{\text{Coul}}
+\Delta E_{\text{flux}},
$$
where:

- $\Delta E_{\text{down-up}}$ is the core/axial-layer energy shift from replacing one up-type branch with one down-type branch,
- $\Delta E_{\text{Coul}}$ is the electromagnetic self-energy difference,
- $\Delta E_{\text{flux}}$ is the strong-sector closure difference between the two tri-core assemblies.

This chapter does not yet fix those terms numerically. It fixes the decomposition that the later mass and nuclear chapters should use.

## Residual Strong Interaction Interface

The nucleon is the object that enters nuclear physics. The residual nuclear force is therefore not a direct quark-to-quark long-range force. It is a nucleon-to-nucleon effective interaction generated by:

- polarization of the surrounding Noether Sea,
- meson-like exchange channels,
- and geometric locking between the outer hadronic envelopes of neighboring tri-core assemblies.

That is why this chapter feeds directly into [nuclear-binding.md](./nuclear-binding.md) and [mesons.md](../assemblies/mesons/mesons.md).

## Canonical Nucleon Table

| Nucleon | Quark content | Charge | Baryon number | Generation tier of constituents | Total architrinos | Ground-state role |
| --- | --- | ---: | ---: | --- | ---: | --- |
| Proton | `uud` | `+1` | `+1` | three Generation-I quarks | `36` | stable charged nucleon |
| Neutron | `udd` | `0` | `+1` | three Generation-I quarks | `36` | neutral nucleon, stable in nuclei, weakly unstable free |

## Closure Targets

This chapter is in good enough shape to serve as the canonical nucleon reference, but several derivations remain open:

1. quantitative proton and neutron magnetic moments,
2. proton spin decomposition,
3. explicit Y-junction or equivalent flux-energy functional,
4. quantitative proton-neutron mass splitting.

Those are now downstream derivations, not missing definitions.

## Related Chapters

- [../assemblies/fermions/quarks.md](../assemblies/fermions/quarks.md)
- [../assemblies/fermions/color-charge-su3.md](../assemblies/fermions/color-charge-su3.md)
- [../assemblies/mesons/mesons.md](../assemblies/mesons/mesons.md)
- [nuclear-binding.md](./nuclear-binding.md)
