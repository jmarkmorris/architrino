# Atomic Structure

This chapter sketches the assembly-level picture of atomic structure inside a dense Noether-Sea medium. Its purpose is to connect nucleons, residual nuclear binding, and orbital resonance ideas into one substrate-level frame before the quantitative closure work is finished.

Its natural companion notes are [Nucleon Structure](nucleon-structure.md), [Nuclear Binding](nuclear-binding.md), [Electron](../assemblies/fermions/electron.md), [Atomic Spectra](atomic-spectra.md), and [Condensed Matter](condensed-matter.md).

The note remains provisional. It should be read as a compact orientation to the intended architecture of atomic structure rather than as a theorem-backed final chapter.

Angular momentum and spin enter this chapter only through downstream closure targets. Atomic orbital labels, spin-orbit coupling, hyperfine structure, Pauli filling, and exclusion-volume packing should inherit the single-core angular-momentum ledger and ordered-frame spinor proof from [Angular Momentum and Spin](../theory-bridges/angular-momentum-and-spin.md), together with the exchange-statistics program in [Fermi-Dirac and Bose-Einstein Statistics](../quantum/quantum-statistics.md). They should not be used here as independent explanations of angular momentum, spin, or Pauli behavior.

## Multi-Body Assembly Structure

Atomic structure sits on three coupled layers:

1. **Nucleon layer:** Protons and neutrons are modeled as stable color-singlet nucleon assemblies embedded in the Noether Sea.
2. **Residual nuclear layer:** The strong-sector interaction that matters for atoms is the short-range residual coupling between nucleons, including meson-like corridors and over-compression costs near the self-hit threshold.
3. **Electronic resonance layer:** Atomic orbitals are standing resonance patterns of electron assemblies in the combined nuclear, Noether Sea, and exclusion-volume environment.

The Noether Sea enters this picture as ambient substrate contents, not as the fixed spatial container. Binding and spectral calculations should therefore use the canonical local density $\rho_{\text{core}}(\mathbf{x},t)$ and normalized density $n(\mathbf{x},t)=\rho_{\text{core}}(\mathbf{x},t)/\rho_{\text{core},0}$ on $\Sigma_t$, evaluated against the $\mathbb{U}_{\text{now}}$ state record.

The Noether-Sea transport picture is useful for separating reversible medium response from dissipative resistance. Inertial response must come from medium-dressed causal-ledger skew and shielding; ordinary resistance remains a separate breakdown channel involving excitation, action shedding, or branch transition.

For the underlying assembly carrier of this medium, see [Noether Core](../spacetime/noether-core.md).

## Hydrogen as a Four-Fermion Boundary Test

A resolved hydrogen atom is the cleanest local test of where matter assemblies end and the Noether Sea begins. In the Generation-I inventory, the electron is one charged fermion assembly, while the proton contains three quark fermion assemblies, conventionally $uud$. Thus a hydrogen atom contains four charged fermion assemblies at the matter-inventory level:

$$
\mathrm{H}
\sim
e^-
+
\left(uud\right)_{\mathrm{color\ singlet}}.
$$

Each of those four fermions carries a Noether core plus an axial layer. The proton's three quark cores should not be read as three free objects floating independently in the Noether Sea; they are joined by the color-singlet strong-sector closure of the proton. The electron assembly is external to that proton closure and occupies an atomic resonance envelope determined by the nuclear causal-wake envelope, local Noether-Sea state, and its own assembly ledger.

The local spacetime description is therefore not the four Noether cores themselves. It is the coarse-grained Noether-Sea response around, between, and outside the four matter assemblies. At a chosen resolution $\ell$, write schematically

$$
\theta_{\mathrm{sea}}^{(\ell)}(\mathbf{x},t)
=
W_\ell *
\left(
\rho_{\text{core}},\,
n,\,
\chi_{\text{sea}},\,
\mathbf{u}_{\text{sea}},\,
S_{ij}
\right),
$$

where the convolution averages ambient Noether-Sea variables over a window $W_\ell$. For atomic orbital recovery, $\ell$ should be large enough to average many ambient Noether-Sea cores and small enough not to erase the electron resonance envelope. For proton-internal work, $\ell$ must be reduced and the three quark assemblies must be treated as resolved color-sector constituents rather than as a point proton.

On the outskirts of the solar system, the useful weak-gradient decomposition is

$$
\theta_{\mathrm{sea}}^{(\ell)}(\mathbf{x},t)
=
\theta_0
+
\delta\theta_{\odot}^{(\ell)}(\mathbf{x},t)
+
\delta\theta_{\mathrm{H}}^{(\ell)}(\mathbf{x},t),
$$

where $\theta_0$ is the weak homogeneous reference state, $\delta\theta_{\odot}^{(\ell)}$ is the gentle solar-system background bias, and $\delta\theta_{\mathrm{H}}^{(\ell)}$ is the localized hydrogen disturbance. This is the sense in which local spacetime is a medium response, not the four matter Noether cores themselves.

The exact boundary between a fermion and the Noether Sea is a closure-ledger boundary before it is a surface in space. Let $\Lambda_f(t)$ denote the reduced closure label of a fermion assembly and let $\mathcal{A}_f(t)$ denote the architrinos and bound wake-exchange records phase-locked to that label. The exact inventory boundary is

$$
\mathcal{A}_f(t)
\subset
S(t),
\qquad
S(t)\setminus\mathcal{A}_f(t)
\text{ contains the ambient Noether-Sea record and other assemblies.}
$$

For hydrogen, the exact matter inventory in a chosen atomic window $\Omega_{\mathrm{H}}$ is therefore

$$
\mathcal{A}_{\mathrm{H}}(t)
=
\mathcal{A}_{e}(t)
\cup
\mathcal{A}_{u_1}(t)
\cup
\mathcal{A}_{u_2}(t)
\cup
\mathcal{A}_{d}(t)
\cup
\mathcal{L}_{\mathrm{strong}}^{uud}(t),
$$

where $\mathcal{L}_{\mathrm{strong}}^{uud}$ is the color-singlet strong-sector corridor ledger binding the three quark assemblies into the proton. The locally resolved Noether-Sea record is the complementary medium record inside the same window:

$$
S_{\mathrm{sea}}^{\Omega_{\mathrm{H}}}(t)
=
S(t)\big|_{\Omega_{\mathrm{H}}}
\setminus
\mathcal{A}_{\mathrm{H}}(t).
$$

The spatial boundary used in effective modeling is the dynamic exclusion envelope generated by an assembly. For a fermion $f$, define a local dominance diagnostic by inheriting the channel kernel from [Noether Core Geometry](../spacetime/noether-core-geometry.md#assembly-noether-sea-interface-diagnostic):

$$
D_{f,X}(\mathbf{x},t)
=
\frac{
\left\lVert\mathcal{W}_{f,X}^{\mathrm{locked}}(\mathbf{x},t)\right\rVert
}{
\left\lVert\mathcal{W}_{f,X}^{\mathrm{locked}}(\mathbf{x},t)\right\rVert
+
\left\lVert\mathcal{W}_{\mathrm{sea},X}^{\mathrm{ambient}}(\mathbf{x},t)\right\rVert
},
$$

where $\mathcal{W}_{f,X}^{\mathrm{locked}}$ denotes the phase-locked causal-wake and exclusion contribution tied to $\Lambda_f$ in channel $X$, while $\mathcal{W}_{\mathrm{sea},X}^{\mathrm{ambient}}$ denotes the neighboring Noether-Sea wake environment in the same channel after excluding the fermion's own assembly ledger. The effective interface is the threshold surface

$$
\partial\Omega_f(D_X,t)
=
\left\{
\mathbf{x}\in\Sigma_t:
D_{f,X}(\mathbf{x},t)=D_X
\right\},
$$

with $0<D_X<1$ fixed by the stability criterion being tested. This is not a hard material wall. It is a stability interface between a bound assembly ledger and the surrounding medium response.

Hydrogen therefore has no single all-purpose fermion radius. Clock-coupling, reaction corridors, packing, and penetration sample the same locked-versus-ambient wake ledger at different strength levels:

$$
0
<
D_{\mathrm{clock}}
\le
D_{\mathrm{corridor}}
\le
D_{\mathrm{packing}}
\le
D_{\mathrm{penetration}}
<
1.
$$

The clock threshold marks where weak locked-wake tails can bias local rates. The corridor threshold marks where an oriented exchange path can remain coherent. The packing threshold marks where a neighboring Noether core or assembly can remain stably adjacent without persistent phase disruption. The penetration threshold marks where a trajectory enters wake dominance strong enough to destabilize transit through the fermion envelope. These are different cuts through one diagnostic, not four different definitions of a fermion.

This resolves the scale question in layered form:

| Layer | What is being resolved | Boundary meaning |
| --- | --- | --- |
| Fermion core | One Noether core plus axial layer | Closure-ledger membership and dynamic exclusion envelope |
| Proton | Three quark fermion assemblies in color-singlet closure | Shared strong-sector envelope, not three isolated quark surfaces |
| Hydrogen atom | Proton closure plus electron assembly resonance | Electron orbital envelope around the nuclear causal-wake source |
| Local spacetime | Coarse-grained Noether-Sea response | Medium variables averaged over ambient Noether cores, with matter assemblies acting as defects and sources |

The corresponding resolution hierarchy is

$$
R_{\mathrm{NC},f}\lesssim R_f,
\qquad
R_{u,d}\lesssim R_p,
\qquad
R_p\ll R_{\mathrm{orb}},
$$

where $R_{\mathrm{NC},f}$ is the Noether-core envelope scale of fermion $f$, $R_f$ is the fermion's effective exclusion scale including axial-layer exposure, $R_p$ is the proton color-singlet envelope scale, and $R_{\mathrm{orb}}$ is the electron resonance-envelope scale. Atomic medium calculations should use a window satisfying

$$
d_N\ll \ell_{\mathrm{atom}}\ll R_{\mathrm{orb}},
$$

where $d_N$ is the ambient Noether-Sea core spacing. Proton-internal calculations require a finer window that still averages ambient Noether-Sea cores but does not erase the quark-sector structure:

$$
d_N\ll \ell_{\mathrm{proton}}\ll R_p.
$$

## Element-Dependent Sea Response

Hydrogen fixes the clean boundary case, but heavier atoms should use the same ledger-complement discipline. An element name is not itself a Noether-Sea boundary condition. It becomes physically meaningful only after the isotope, ionization state, electron-envelope branch, and any material bonding branch are fixed inside the $\mathbb{U}_{\text{now}}$ state record.

For an atomic window $\Omega_E$ with proton number $Z$, neutron number $N$, electron-envelope branch $\mathcal B_e$, and optional bonding or lattice branch $\mathcal B_{\mathrm{lat}}$, write the nuclear assembly ledger schematically as

$$
\mathcal A_{\mathrm{nuc}}^{Z,N}(t)
=
\bigcup_{\alpha=1}^{Z}\mathcal A_{p_\alpha}(t)
\cup
\bigcup_{\nu=1}^{N}\mathcal A_{n_\nu}(t)
\cup
\mathcal L_{\mathrm{nuc}}^{Z,N}(t),
$$

where $\mathcal L_{\mathrm{nuc}}^{Z,N}$ records the residual nuclear binding, corridor, pairing, and shell-structure ledgers that make the protons and neutrons one nuclear assembly rather than a list of free nucleons. The locally resolved Noether-Sea complement is then

$$
S_{\mathrm{sea}}^{\Omega_E}(t)
=
S(t)\big|_{\Omega_E}
\setminus
\left(
\mathcal A_{\mathrm{nuc}}^{Z,N}(t)
\cup
\mathcal A_{\mathrm{e-env}}^{\mathcal B_e}(t)
\cup
\mathcal L_{\mathrm{bond}}^{\mathcal B_{\mathrm{lat}}}(t)
\right).
$$

At atomic resolution the corresponding coarse-grained response should be decomposed as

$$
\theta_E^{(\ell)}(\mathbf{x},t)
=
\theta_{\mathrm{bg}}^{(\ell)}(\mathbf{x},t)
+
\delta\theta_{\mathrm{nuc}}^{(\ell)}
\!\left[
Z,N,\Sigma_{\mathrm{ax}}^{Z,N},\mathcal L_{\mathrm{nuc}}^{Z,N}
\right]
+
\delta\theta_{\mathrm{e-env}}^{(\ell)}
\!\left[
\mathcal B_e
\right]
+
\delta\theta_{\mathrm{bond}}^{(\ell)}
\!\left[
\mathcal B_{\mathrm{lat}}
\right],
$$

where $\Sigma_{\mathrm{ax}}^{Z,N}$ abbreviates the proton and neutron axial inventories after nuclear closure. The three perturbation terms are calculation slots, not separate substances: the nucleus supplies the coarse nuclear causal-wake envelope, the electron branch supplies the realized resonance and exclusion envelope, and the bonding branch supplies any shared wake corridors or lattice constraints.

This gives a strict level distinction for periodic-table language:

| Property or label | Continuum role |
| --- | --- |
| $Z$, $N$, isotope, proton/neutron axial inventories, nuclear binding ledger | Direct inputs to $\delta\theta_{\mathrm{nuc}}^{(\ell)}$ after coarse-graining. |
| Electron-envelope branch, shell stability gap, ionization state | Inputs to $\delta\theta_{\mathrm{e-env}}^{(\ell)}$ only after a realized branch is specified. |
| Bonding corridor, lattice phase, pressure state, magnetic or transport branch | Inputs to $\delta\theta_{\mathrm{bond}}^{(\ell)}$ only for material states, not for the isolated element name. |
| Element symbol, group, block, oxidation-state family, electronegativity, atomic radius, and chemical family name | Observer-level summaries and validation targets; they do not by themselves source the Noether-Sea response. |

At the constitutive level, the useful output is therefore not a scalar density assigned to the atom. It is a local Noether-Sea response record,

$$
\Theta_E^{(\ell)}(\mathbf{x},t)
=
\left(
\rho_{\text{core}},\,
n,\,
\chi_{\text{sea}},\,
\Gamma_N,\,
\lambda,\,
\xi,\,
\mathbf{u}_{\text{sea}},\,
S_{ij},\,
\mathcal M_{\text{sea}}^{ab}
\right)^{(\ell)}_E,
$$

where $\Gamma_N$ is the local Noether-Sea cadence-stretch diagnostic, $(\lambda,\xi)$ are the envelope scale and shape records inherited from Noether-core geometry, and $\mathcal M_{\text{sea}}^{ab}$ is the medium-response tensor that later connects inertial and gradient response. Nuclear terms first determine the coarse source envelope $\mathcal W_{\text{nuc}}$; electron-envelope terms then determine resonance, exclusion, and spectral response as in [Atomic Spectra](atomic-spectra.md); lattice and pressure terms enter only when a material environment supplies bonding corridors or transport constraints, as in [Condensed Matter](condensed-matter.md). Ambient density and delay remain separate baseline variables rather than element properties.

For directional or pressure-sensitive comparisons, use the tensor version of the same split:

$$
\mathcal M_{\text{sea},E}^{ab}
=
\mathcal M_0^{ab}
+
\Delta\mathcal M_{\mathrm{nuc}}^{ab}
\!\left[
Z,N,\Sigma_{\mathrm{ax}}^{Z,N}
\right]
+
\Delta\mathcal M_{\mathrm{e-env}}^{ab}
\!\left[
\mathcal B_e,C_{\mathrm{shell}}
\right]
+
\Delta\mathcal M_{\mathrm{lat}}^{ab}
\!\left[
\mathcal B_{\mathrm{lat}}
\right].
$$

Here $C_{\mathrm{shell}}$ is the electron-envelope shell-stability gap defined in [Atomic Spectra](atomic-spectra.md). The lattice term is absent for an isolated atom; in a material state it carries bonding, pressure, magnetic, and transport constraints through the realized material branch.

Dense material phases should be read through this record rather than through a bare element label. For a material branch $B$ of element or compound $E$, define the relative dense-medium preference against a comparison phase $Y$ by

$$
\Delta\mu_{E/Y}^{B}
\left(
n,P,T,\mathcal B_{\mathrm{lat}}
\right)
=
\mu_E^{B}
\left(
n,P,T,\mathcal B_{\mathrm{lat}}
\right)
-
\mu_Y
\left(
n,P,T,\mathcal B_Y
\right).
$$

The hypothesis behind dense iron-bearing phases is then not that the element symbol `Fe` directly sources a denser Noether Sea. It is that the realized nuclear inventory, electron branch, metallic bonding branch, and pressure state may make the iron-rich branch more compatible with high normalized Noether-core density than a silicate branch:

$$
\frac{\partial}{\partial n}
\Delta\mu_{\mathrm{Fe/silicate}}^{\mathrm{metal}}
<
0
$$

along the relevant planetary-interior branch. This inequality is a constitutive target. It must be derived from assembly packing, exclusion-volume response, metallic bonding, pressure response, and Noether-Sea coupling; it cannot be assumed from ordinary density alone.

This map imposes four local failure tests:

1. **Boundary blend:** if $\mathcal A_{\mathrm{nuc}}^{Z,N}$, $\mathcal A_{\mathrm{e-env}}^{\mathcal B_e}$, and $S_{\mathrm{sea}}^{\Omega_E}$ collapse into one literal surface, the assembly/medium distinction has failed.
2. **Density-delay blend:** if $n(\mathbf{x},t)$ is used as a delay factor or $\chi_{\text{sea}}(\mathbf{x},t)$ is used as density, the constitutive variables have been mixed.
3. **Element-label overreach:** if an element symbol, group, or block label is treated as a direct source of $\Theta_E^{(\ell)}$ before isotope, ionization, branch, and material state are specified, the observer-level summary has been promoted beyond its derivation.
4. **Hidden transport loss:** if pressure, lattice motion, or transport changes the response while no recoil, medium excitation, heating, radiation, or branch-transition channel is logged, the local energy and medium-update ledger is incomplete.

## Angular-Momentum Handoff

The immediate atomic target is to recover observer-level orbital quantum numbers from electron assemblies moving in an external nuclear and Noether-Sea environment. That target is separate from the internal rotational action of the electron's Noether-core assembly. A later atomic-spin pass must show how spin-orbit and hyperfine structure arise when the external resonance envelope couples to the completed internal spin ledger and to the measurement-response model. Until then, this chapter should treat shell filling and exclusion language as effective atomic bookkeeping inherited from the spin-statistics proof program.

The foundation-up version begins with the nucleus and its constituent Noether-core ledgers. A proton-electron hydrogen comparison is the cleanest first case, but the same level distinction applies to all atoms: the electron assembly responds to the combined causal-wake envelope of the nucleus, the local Noether Sea, and other electron assemblies. The proof direction is therefore downstream. First derive the integer-closed Noether-core ledgers of the nuclear constituents, then coarse-grain their emitted causal wakes into an effective envelope, and only then recover the observer-level orbital labels $(n,\ell,m)$ as resonance labels of the external electron envelope. Those labels should not be used backward as proof of the electron's internal Noether-core spinor state or of the nuclear core ledger.

A schematic handoff is

$$
\bigl(k_I,k_M,k_O,\mathcal R\bigr)_{\text{nuc}}
\longrightarrow
\mathcal W_{\text{nuc}}(r,\hat{\mathbf r},t)
\longrightarrow
\Psi_{\text{e-env}}(r,\theta,\phi)
\sim
R_{n\ell}(r)Y_\ell^m(\theta,\phi).
$$

Here $\bigl(k_I,k_M,k_O,\mathcal R\bigr)_{\text{nuc}}$ abbreviates the integer winding and causal-root bookkeeping of the relevant nuclear Noether-core ledgers, while $\mathcal W_{\text{nuc}}$ denotes the effective nuclear causal-wake envelope after coarse-graining those ledgers. The right-hand side is the standard observer-level recovery form that the electron assembly must reproduce in central-potential limits.

For central-potential comparisons, the specific orbital recovery gate is ordinary $2\pi$ azimuthal closure and angular regularity:

$$
\psi_{\text{orb}}(\phi+2\pi)=\psi_{\text{orb}}(\phi),
\qquad
\ell\in\mathbb N_0,
\qquad
m\in\{-\ell,\ldots,\ell\}.
$$

Those labels describe the effective electron-assembly envelope around the nucleus. They should not be read as the internal Noether-core spinor ledger of the electron itself.
