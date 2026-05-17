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

## Proton Source-Envelope Closure Target

Hydrogen calculations need the proton to enter the atomic window as one color-singlet source envelope, not as three free quark assemblies. For a proton branch, let the three quark color sectors be

$$
s_{u_1},s_{u_2},s_d\in\{H,M,L\},
\qquad
\{s_{u_1},s_{u_2},s_d\}
=
\{H,M,L\}.
$$

The second condition is the color-singlet occupancy rule: the exceptional-axis sectors occur once each. Let $\mathcal L_{\mathrm{strong}}^{uud}(t)$ denote the strong-sector corridor ledger that locks these three quark branches into one accepted proton branch. At proton-sensitive resolution, the candidate source envelope in response channel $X$ is

$$
\mathcal W_{p,X}^{\mathrm{locked}}
=
C_{\ell,X}^{p}
\left[
\mathcal W_{u_1,X}^{\mathrm{locked}}
+
\mathcal W_{u_2,X}^{\mathrm{locked}}
+
\mathcal W_{d,X}^{\mathrm{locked}}
+
\mathcal W_{\mathrm{strong},X}^{uud}
\right],
\qquad
d_N\ll\ell\ll R_p.
$$

Here $C_{\ell,X}^{p}$ is the declared proton-window projection and $\mathcal W_{\mathrm{strong},X}^{uud}$ is the channel exposure of $\mathcal L_{\mathrm{strong}}^{uud}(t)$. The strong-sector term includes the closed color-corridor contribution needed to make the three quark branches one proton source; it is not ambient Noether Sea and is not a fourth quark-like constituent.

The first closure condition is absence of open color leakage at the proton boundary:

$$
\mathcal E_{p,X}^{\mathrm{color}}
=
\frac{
\left\lVert
\Pi_{\mathrm{open},X}
\mathcal W_{p,X}^{\mathrm{locked}}
\right\rVert_X
}{
\left\lVert
\Pi_{\mathrm{singlet},X}
\mathcal W_{p,X}^{\mathrm{locked}}
\right\rVert_X
+
\varepsilon_{p,X}
}
\le
\Delta_{p,X}^{\mathrm{color}}.
$$

The projection $\Pi_{\mathrm{singlet},X}$ retains the channel entries that are compatible with the color-singlet branch, while $\Pi_{\mathrm{open},X}$ retains any residual open-color exposure. This is a closure target, not a completed confinement proof. It should later be derived from the same color-corridor dynamics that recover the static strong potential and no-free-color benchmark in [Gluons and the Strong Force: Geometric Origins](../assemblies/bosons/gluons.md#confinement-and-energetics).

The second condition is atomic-window stability. After the proton-sensitive calculation is projected into the atomic window, the proton contribution must be stable under admissible refinement:

$$
\Delta_{p,X}^{\mathrm{env}}(\ell,\ell')
=
\frac{
\left\lVert
C_{\ell_{\mathrm{atom}},X}
\mathcal W_{p,X}^{\mathrm{locked}}(\ell)
-
C_{\ell_{\mathrm{atom}},X}
\mathcal W_{p,X}^{\mathrm{locked}}(\ell')
\right\rVert_X
}{
\left\lVert
C_{\ell_{\mathrm{atom}},X}
\mathcal W_{p,X}^{\mathrm{locked}}(\ell)
\right\rVert_X
+
\varepsilon_{p,X}^{\mathrm{env}}
}
\le
\Delta_{p,X}^{\mathrm{env,tol}}.
$$

This is the nucleon-side handoff used by the hydrogen response map in [Atomic Structure](atomic-structure.md#hydrogen-boundary-theorem-target). It lets the atomic calculation see a proton source envelope with retained charge, multipole, shielding, and corridor coefficients, while preventing the three quark Noether cores from being counted as free atomic sources.

The proton boundary tolerance inherited by hydrogen is therefore an admissible-source condition, not a fitted proton radius. For channel $X$,

$$
\mathfrak A_{p,X}^{\mathrm{tol}}
=
\left\{
\mathcal B:
\mathcal E_{p,X}^{\mathrm{color}}
\le
\Delta_{p,X}^{\mathrm{color}},
\quad
\Delta_{p,X}^{\mathrm{env}}(\ell,\ell')
\le
\Delta_{p,X}^{\mathrm{env,tol}},
\quad
\mathcal L_{\mathrm{strong}}^{uud}
\subset
\mathcal A_{\mathrm H}(t)
\right\}.
$$

The first inequality blocks open-color leakage, the second blocks unstable quark-resolution dependence after atomic projection, and the third keeps the strong-sector corridor inside the matter assembly ledger. Hydrogen corridor and packing tolerances may then ask different stability questions, but they cannot be looser than this proton source-envelope acceptance.

The source-envelope closure fails if any of the following occurs:

1. **Free-quark failure:** the atomic scan must keep three independent quark source envelopes to fit a hydrogen line or clock response.
2. **Open-color failure:** $\mathcal E_{p,X}^{\mathrm{color}}$ exceeds the declared tolerance in the isolated proton branch.
3. **Corridor-complement failure:** $\mathcal L_{\mathrm{strong}}^{uud}(t)$ or $\mathcal W_{\mathrm{strong},X}^{uud}$ is counted as ambient Noether Sea rather than as part of the proton branch.
4. **Projection failure:** proton-sensitive refinements do not converge to one atomic-window envelope after $C_{\ell_{\mathrm{atom}},X}$ is applied.
5. **Channel-retuning failure:** spectral, clock, packing, or corridor calculations require different proton ledgers instead of different projections of the same color-singlet branch.

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

## CP-Odd Neutron Dipole Scaffold

The strong-CP comparison problem enters this chapter through the neutron electric dipole moment. The retained observable is a spin-aligned electric first moment of the neutron assembly, not the ontology of any particular Standard-Model repair. This section supplies the nucleon-side scaffold used by [The Strong CP Problem](../philosophy-history/unknowns-paradoxes.md#the-strong-cp-problem).

Let the neutron's axial sites carry polarity signs $\sigma_a\in\{+1,-1\}$ and positions $\mathbf{r}_a$ relative to the tri-core center, with each site carrying polarity magnitude $\epsilon=|e|/6$. The axial contribution to the neutron dipole is
$$
\mathbf{d}_{n,\mathrm{ax}}
=
\epsilon\sum_{a\in A_n}\sigma_a\,\mathbf{r}_a,
\qquad
\sum_{a\in A_n}\sigma_a=0.
$$
The second condition is the neutron's neutral axial inventory $(9P,9E)$; it cancels net charge but does not by itself prove that the first moment vanishes. For a declared neutron envelope scale $R_n$ and spin direction $\hat{\mathbf{J}}_n$, define the dimensionless CP-odd axial imbalance
$$
\vartheta_n
=
\frac{\hat{\mathbf{J}}_n\cdot\mathbf{d}_{n,\mathrm{ax}}}{\epsilon R_n}.
$$

The strong-sector flux corridor and local Noether-Sea response may contribute additional spin-aligned effective moments. A compact neutron-assembly residual is therefore
$$
d_n^{\mathrm{asm}}
=
\epsilon R_n
\left(
\vartheta_n
+
\vartheta_{\mathrm{flux}}
+
\vartheta_{\mathrm{sea}}
\right),
\qquad
\mathcal{R}_{\mathrm{nEDM}}
=
\frac{|d_n^{\mathrm{asm}}|}{d_n^{\max}}.
$$

The first target lemma is a cancellation statement, not a numerical fit:
$$
\text{color-singlet }udd\text{ ground state}
\quad\Longrightarrow\quad
\left\langle
\vartheta_n+\vartheta_{\mathrm{flux}}+\vartheta_{\mathrm{sea}}
\right\rangle_T
=0
$$
up to bounded CP-odd perturbations in the same branch record that recovers the neutron magnetic moment and proton-neutron mass splitting. A proof should use the explicit `udd` color-singlet ledger: one $u$ core, two $d$ cores, one $H$, one $M$, and one $L$ exceptional axis across the tri-core, with the two down-type branches paired by the same strong-sector closure map. If that quotient leaves a nonzero time-averaged spin-aligned first moment above $d_n^{\max}$, the strong-CP assembly repair fails.

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

The current repo does not yet contain a full proton spin decomposition, but the nucleon chapter can still state the minimal closure picture. This section is downstream of the core ledger in [Angular Momentum and Spin](../theory-bridges/angular-momentum-and-spin.md): it uses observer-level spin labels and hadron-level bookkeeping targets, not an independent derivation of spin.

### Spin

The nucleon ground state is taken to have observer-level total spin quantum number
$$
J=\frac{1}{2}
$$
for the coupled tri-core configuration. Here $J$ names the total hadronic angular-momentum channel, not the spin of one isolated constituent. A useful standard-physics comparison is the proton-spin decomposition: the measured spin-$\tfrac{1}{2}$ nucleon is not explained by simply adding three valence-quark spin arrows.

In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, the same bookkeeping pressure appears as three coupled contributions:

- **quark-core spinor structure**, the analogue of observer-level constituent spin;
- **strong-sector orbital circulation**, the analogue of quark and core orbital angular momentum inside the bound state;
- **flux-network angular momentum**, the analogue of gluon or strong-field angular momentum in the standard QCD spin budget.

The closure target is therefore not to assign $1/2$ to one piece of the nucleon. The target is to show how the coupled tri-core assembly, its orbital circulation, and its strong-sector flux network combine into one stable spin-$\tfrac{1}{2}$ hadronic channel.

Until the single-core angular-momentum ledger, ordered-frame spinor closure, and color-corridor vector ledger are derived, the three contributions above should be read as required accounting channels. They should not be treated as a closed proton-spin decomposition.

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
2. proton spin decomposition from the completed single-core angular-momentum ledger and hadron-level color-corridor ledger,
3. explicit Y-junction or equivalent flux-energy functional,
4. quantitative proton-neutron mass splitting,
5. CP-odd neutron electric-dipole cancellation through the same `udd` color-singlet ledger.

Those are now downstream derivations, not missing definitions.

## Related Chapters

- [../assemblies/fermions/quarks.md](../assemblies/fermions/quarks.md)
- [../assemblies/fermions/color-charge-su3.md](../assemblies/fermions/color-charge-su3.md)
- [../assemblies/mesons/mesons.md](../assemblies/mesons/mesons.md)
- [nuclear-binding.md](./nuclear-binding.md)
