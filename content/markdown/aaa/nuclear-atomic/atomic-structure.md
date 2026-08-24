# Atomic Structure

This chapter sketches the assembly-level picture of atomic structure inside a dense Noether sea. The standard atom is familiar as a nucleus plus electron orbitals. The $\mathbb{A}\mathbb{A}\mathbb{A}$ question is what physical assemblies, causal wakes, exclusion envelopes, and local Noether sea response make that familiar picture appear.

The chapter is therefore a bridge. It connects nucleons, residual nuclear binding, electron resonance envelopes, and medium response into one substrate-level frame before the quantitative closure work is finished.

Its natural companion notes are [Nucleon Structure](nucleon-structure.md), [Nuclear Binding](nuclear-binding.md), [Electron](../assemblies/fermions/electron.md), [Atomic Spectra](atomic-spectra.md), and [Condensed Matter](condensed-matter.md).

The note remains provisional. It should be read as a compact orientation to the intended architecture of atomic structure rather than as a theorem-backed final chapter. Its value is to keep the levels separated: quarks close into nucleons, nucleons close into nuclei, electrons occupy atomic resonance envelopes, and the Noether sea supplies the local medium record through which effective clocks, spectra, and binding descriptions are reconstructed.

Angular momentum and spin enter this chapter only through downstream closure targets. Atomic orbital labels, spin-orbit coupling, hyperfine structure, Pauli filling, and exclusion-volume packing should inherit the single-assembly angular-momentum ledger and ordered-frame spinor proof from [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md), together with the exchange-statistics program in [Fermi-Dirac and Bose-Einstein Statistics](../quantum/fermi-dirac-and-bose-einstein-statistics.md). They should not be used here as independent explanations of angular momentum, spin, or Pauli behavior.

## Multi-Body Assembly Structure

Atomic structure sits on three coupled layers. Each layer is real at its own resolution, but none of them should be mistaken for the whole atom by itself:

1. **Nucleon layer:** Protons and neutrons are modeled as stable color-singlet nucleon assemblies embedded in the Noether sea.
2. **Residual nuclear layer:** The strong-sector interaction that matters for atoms is the short-range residual coupling between nucleons, including meson-like corridors and over-compression costs near the self-hit threshold.
3. **Electronic resonance layer:** Atomic orbitals are standing resonance patterns of electron assemblies in the combined nuclear, Noether sea, and exclusion-volume environment.

The Noether sea enters this picture as ambient substrate contents, not as the fixed spatial container. Binding and spectral calculations should therefore use the canonical local density $\rho_{\text{NS}}(\mathbf X,T)$ and normalized density $n(\mathbf X,T)=\rho_{\text{NS}}(\mathbf X,T)/\rho_{\text{NS},0}$ on $\Sigma_T$, evaluated against the $\mathbb{U}_{\text{now}}$ state record.

In plainer terms, an atom is not a tiny solar system placed in empty space. It is a multi-assembly system embedded in a local medium record. The electron resonance, the proton source envelope, the nuclear binding corridors, and the surrounding Noether sea response all have to be read together.

The Noether sea transport picture is useful for separating reversible medium response from dissipative resistance. Inertial response must come from medium-dressed causal-ledger skew and shielding; ordinary resistance remains a separate breakdown channel involving excitation, action shedding, or branch transition.

For the underlying assembly carrier of the Noether sea, see [Noether Braid](../noether-braid/noether-braid.md).

## Hydrogen as a Four-Fermion Boundary Test

A resolved hydrogen atom is the cleanest local test of where matter assemblies end and the Noether sea begins. It is simple enough to count and hard enough to expose the boundary problem. In the Generation-I inventory, the electron is one charged fermion assembly, while the proton contains three quark fermion assemblies, conventionally $uud$. Thus a hydrogen atom contains four charged fermion assemblies at the matter-inventory level:

$$
\mathrm{H}
\sim
e^-
+
\left(uud\right)_{\mathrm{color\ singlet}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-ebd9052d5bb0af73)

Each of those four fermions carries a Noether braid plus an axial layer. The proton is one color-singlet assembly of three quark fermions, not three independent atomic sources: its three Noether braids and their strong-sector corridor close into one proton source envelope. The electron assembly is external to that proton closure and occupies an atomic resonance envelope determined by the nuclear causal-wake envelope, local Noether sea state, and its own assembly ledger.

This is why hydrogen is a boundary test rather than only a spectrum test. The model must decide what belongs to the proton, what belongs to the electron, what belongs to the local Noether sea, and which coarse-grained variables an observer is allowed to use after that separation is declared.

The local spacetime description is therefore not the four Noether braids themselves. It is the coarse-grained Noether sea response around, between, and outside the four matter assemblies. At a chosen resolution $\ell$, write schematically

$$
\theta_{\mathrm{sea}}^{(\ell)}(\mathbf X,T)
=
K_\ell *
\left(
\rho_{\text{NS}},\,
n,\,
\chi_{\text{sea}},\,
\mathbf{u}_{\text{sea}},\,
\Sigma_{\text{sea},ij}
\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-734dafc5bc57fd66)

where the convolution averages ambient Noether sea variables over the coarse-graining kernel $K_\ell$ inherited from [Braid Envelope Geometry](../noether-braid/braid-envelope-geometry.md#assembly-noether-sea-interface-diagnostic), and $\Sigma_{\text{sea},ij}$ denotes the component form of the canonical Noether sea stress $\Sigma_{\text{sea}}$, not a separate entropy or action variable. Throughout this chapter, lowercase $\theta$ denotes a generic coarse-grained windowed response tuple or decomposition slot, while uppercase $\Theta$ denotes an assembled response record consumed by channel readout functionals and constitutive maps. For atomic orbital recovery, $\ell$ should be large enough to average many ambient Noether sea braids and small enough not to erase the electron resonance envelope. For proton-internal work, $\ell$ must be reduced and the three quark assemblies must be treated as resolved color-sector constituents rather than as a point proton.

For clock and spectral comparisons, first choose a declared weak-background reference cell. The solar-system outskirts provide one useful example because they anchor a weak-gradient comparison against a localized hydrogen disturbance. In that example the decomposition is

$$
\theta_{\mathrm{sea}}^{(\ell)}(\mathbf X,T)
=
\theta_0
+
\delta\theta_{\odot}^{(\ell)}(\mathbf X,T)
+
\delta\theta_{\mathrm{H}}^{(\ell)}(\mathbf X,T)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-e4cc3b177c94d1bf)

where $\theta_0$ is the declared weak homogeneous reference state, $\delta\theta_{\odot}^{(\ell)}$ is the gentle solar-system background bias relative to that reference, and $\delta\theta_{\mathrm{H}}^{(\ell)}$ is the localized hydrogen disturbance. Another environment may replace the solar term with its own declared weak-background contribution. This is the sense in which local effective-spacetime behavior is reconstructed from Noether sea response, not the four matter Noether braids themselves.

The exact boundary between a fermion and the Noether sea is a closure-ledger boundary before it is a surface in space. Let $\Lambda_f(T)$ denote the reduced closure label of a fermion assembly and let $\mathcal{A}_f(T)$ denote the architrinos and bound wake-exchange records phase-locked to that label. All unions and complements below are taken in the typed state-record space: architrino entries and bound corridor or wake-exchange records are distinct entry types inside one inventory, not interchangeable physical objects. The exact inventory boundary is

$$
\mathcal{A}_f(T)
\subset
S(T),
\qquad
S(T)\setminus\mathcal{A}_f(T)
\text{ contains the ambient Noether sea record and other assemblies.}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-25f4612be4a3fda5)

For hydrogen, the exact matter inventory in a chosen atomic window $\Omega_{\mathrm{H}}$ is therefore

$$
\mathcal{A}_{\mathrm{H}}(T)
=
\mathcal{A}_{e}(T)
\cup
\mathcal{A}_{u_1}(T)
\cup
\mathcal{A}_{u_2}(T)
\cup
\mathcal{A}_{d}(T)
\cup
\mathcal{L}_{\mathrm{strong}}^{uud}(T)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-ad381a215540d286)

where $\mathcal{L}_{\mathrm{strong}}^{uud}$ is the color-singlet strong-sector corridor ledger binding the three quark assemblies into the proton. The locally resolved Noether sea record is the complementary medium record inside the same window:

$$
S_{\mathrm{sea}}^{\Omega_{\mathrm{H}}}(T)
=
S(T)\big|_{\Omega_{\mathrm{H}}}
\setminus
\mathcal{A}_{\mathrm{H}}(T)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-fdfcd99bf3b6a29a)

The spatial boundary used in effective modeling is the dynamic exclusion envelope generated by an assembly. For a fermion $f$, define a local dominance diagnostic by inheriting the channel kernel from [Braid Envelope Geometry](../noether-braid/braid-envelope-geometry.md#assembly-noether-sea-interface-diagnostic):

$$
D_{f,X}(\mathbf X,T)
=
\frac{
\left\|\mathcal{W}_{f,X}^{\mathrm{locked}}(\mathbf X,T)\right\|
}{
\left\|\mathcal{W}_{f,X}^{\mathrm{locked}}(\mathbf X,T)\right\|
+
\left\|\mathcal{W}_{\mathrm{sea},X}^{\mathrm{ambient}}(\mathbf X,T)\right\|
}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-b0fd5d12bb1f2661)

where $\mathcal{W}_{f,X}^{\mathrm{locked}}$ denotes the phase-locked causal-wake and exclusion contribution tied to $\Lambda_f$ in channel $X$, while $\mathcal{W}_{\mathrm{sea},X}^{\mathrm{ambient}}$ denotes the neighboring Noether sea wake environment in the same channel after excluding the fermion's own assembly ledger. The effective interface is the threshold surface

$$
\partial\Omega_f(D_X,T)
=
\left\{
\mathbf X\in\Sigma_T:
D_{f,X}(\mathbf X,T)=D_X
\right\}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-520275be00006e85)

with $0 < D_X < 1$ fixed by the stability criterion being tested. This is not a hard material wall. It is a stability interface between a bound assembly ledger and the surrounding Noether sea response, and it counts as a stable interface only where $D_{f,X}$ varies regularly across the level set; where that regularity fails, the scan reports a residual or branch event under the reconstruction-regularity discipline of [Ontology](../foundations/ontology.md) rather than a smooth surface.

Hydrogen therefore has no single all-purpose fermion radius. Clock-coupling, spectral readout, reaction corridors, packing, transport, and penetration sample the same locked-versus-ambient wake ledger through channel-specific norms and tolerances. Their thresholds are declared separately:

$$
D_X\in(0,1),
\qquad
X\in
\{
\mathrm{clock},
\mathrm{spec},
\mathrm{corridor},
\mathrm{packing},
\mathrm{transport},
\mathrm{penetration}
\}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-690a876fc738a4a5)

The clock threshold marks where weak locked-wake tails can bias local rates. The spectral threshold marks where the same locked-wake record resolves the electron-envelope gaps read by line comparisons. The corridor threshold marks where an oriented exchange path can remain coherent. The packing threshold marks where a neighboring Noether braid or assembly can remain stably adjacent without persistent phase disruption. The transport threshold marks where ambient flow and stress response past the envelope is materially reorganized rather than weakly perturbed. The penetration threshold marks where a trajectory enters wake dominance strong enough to destabilize transit through the fermion envelope. These are different cuts through one ledger, not six different definitions of a fermion. No cross-channel ordering is implied unless a later derivation supplies one common normalization and proves that the corresponding level sets are comparable.

In the hydrogen case, the branch weights are therefore ledger projectors rather than electron-envelope probabilities or fitted radial profiles. Each $\zeta_f$ and $\zeta_{\mathrm{strong}}^{uud}$ is a dimensionless membership strength in $[0,1]$, so every complement factor $1-\zeta$ is well formed:

$$
w_{j,f}^{\mathrm{lock}}(T_t;T)
=
\mathbf{1}_{j\in\mathcal{I}_f(T)}
\,
\zeta_f
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right),
\qquad
f\in\{e,u_1,u_2,d\}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-81983cd58cb82520)

while the ambient term is

$$
w_j^{\mathrm{sea}}(T_t;T)
=
\mathbf{1}_{j\in\mathcal{I}_{\mathrm{sea}}(\Omega_{\mathrm{H}},T)}
\,
\zeta_{\mathrm{sea}}^{(\ell)}
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-3c1608492aeb7e32)

For a hydrogen window this ambient projector has an explicit ledger-complement part:

$$
\chi_{\mathrm{comp,H}}^{(\ell)}
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
=
\mathbf{1}_{j\in\mathcal{I}_{\mathrm{sea}}(\Omega_{\mathrm H},T)}
\left[
1-\zeta_e
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
\right]
\left[
1-\zeta_{u_1}
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
\right]
\left[
1-\zeta_{u_2}
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
\right]
\left[
1-\zeta_d
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
\right]
\left[
1-\zeta_{\mathrm{strong}}^{uud}
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
\right]
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-ecf16fd3a16fff89)

The branch then remains ambient only if it also passes the local neutral-core equilibrium test,

$$
\zeta_{\mathrm{sea,H}}^{(\ell)}
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
=
\chi_{\mathrm{comp,H}}^{(\ell)}
\!\left(
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right)
\exp
\!\left[
-
\frac{1}{2}
\left(
\left(\Delta_{\mathrm{cad,H}}^{(\ell)}\right)^2
+
\left(\Delta_{\mathrm{bal,H}}^{(\ell)}\right)^2
\right)
\right]
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f57f711ade44e4dc)

where $\Delta_{\mathrm{cad,H}}^{(\ell)}$ and $\Delta_{\mathrm{bal,H}}^{(\ell)}$ are the window-normalized residuals of the parent projector in [Braid Envelope Geometry](../noether-braid/braid-envelope-geometry.md#assembly-noether-sea-interface-diagnostic), evaluated in $\Omega_{\mathrm H}$: the cadence residual compares the branch cadence $\nu_j(T_t)$ with the smoothed ambient Noether sea cadence $\bar\nu_{\mathrm{sea,H}}^{(\ell)}=\left\langle\nu\right\rangle_{\mathrm{sea},\ell}$ in $\Omega_{\mathrm H}$ and divides by the window cadence spread, while the balance residual measures the tolerance-normalized neutral-pairing and orientation-balance mismatch after the electron, quark, and strong-sector ledgers are removed. Both residuals are dimensionless, so the exponential argument is well formed. A branch locked to the electron, to any of the three quark assemblies, or to the proton's color-singlet corridor is therefore rejected from the ambient denominator even when it lies inside the same spatial coarse window. A neighboring neutral Noether braid in the same window is retained when it is not phase-locked to those matter ledgers and matches the local equilibrium record.

The strong-sector ledger $\mathcal{L}_{\mathrm{strong}}^{uud}$ is part of the proton/hydrogen matter record for corridor calculations. It is not counted as ambient Noether sea merely because it lies between the three quark assemblies. Channel intensity then follows the same sector-exposure rule,

$$
\alpha_{j,X}(\mathbf X,T;T_t)
=
\left\|
Q_X
\!\left[
\Pi_X
\mathcal{B}_{\mathbf Xj}^{(T_t)}
\right]
\right\|_X
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-b0b4a1c30d4d3324)

so the clock, corridor, packing, and penetration cuts differ by the retained branch-ledger channel $\Pi_X$, not by replacing the causal-root flux law or by redefining the matter/Noether sea complement. As in the parent kernel, $\alpha_{j,X}$ is dimensionless because the channel norms are tolerance ratios; the dimensional coupling $\kappa$ enters only through retained channel entries that already require it, such as the signed acceleration used by penetration.

At hydrogen resolution the four parent-kernel projectors have distinct jobs:

| Channel | Retained branch-ledger content | Hydrogen use |
| --- | --- | --- |
| $\Pi_{\mathrm{clock}}$ | Phase, cadence, delay, and phase-retained wake entries | Tests whether proton or electron locked-wake tails bias local clock and spectral rates |
| $\Pi_{\mathrm{corridor}}$ | Oriented exchange, strong-sector corridor, provenance, and strain entries | Keeps $\mathcal{L}_{\mathrm{strong}}^{uud}$ inside the proton/hydrogen matter ledger for corridor calculations |
| $\Pi_{\mathrm{packing}}$ | Exclusion magnitude, exclusion-stress tensor, and envelope scale/shape entries | Determines stable adjacency and coarse excluded volume without treating signs of force as a packing criterion |
| $\Pi_{\mathrm{penetration}}$ | Signed branch acceleration, path-tangent acceleration, and phase-disruption entries | Determines whether a trial path through the fermion envelope remains dynamically stable |

The spectral and transport channels carry their own cuts $D_{\mathrm{spec}}$ and $D_{\mathrm{transport}}$ in the channel set above. Their retained branch-ledger entries are the ones named by the $F_{\mathrm{spec}}$ and $F_{\mathrm{transport}}$ readout functionals in the channel-scan section below, extending the parent kernel's four-channel projector family at hydrogen scope.

The corresponding first norm packet for hydrogen is inherited from the channel norms in [Braid Envelope Geometry](../noether-braid/braid-envelope-geometry.md#assembly-noether-sea-interface-diagnostic). In an atomic window, define the channel exposure scan

$$
\mathfrak N_{\mathrm H,X}^{(\ell)}(f)
=
K_\ell *
\sum_{j\in\mathcal I_f(T)}
\sum_{T_t\in\mathcal C_{\mathbf Xj}(T)}
\zeta_f
\!\left(
\mathcal B_{\mathbf Xj}^{(T_t)}
\right)
\frac{
\alpha_{j,X}(\mathbf X,T;T_t)
\,
W_{\mathbf Xj}^{\mathrm{acc},X}(T;T_t)
}{
r_{\mathbf Xj}^2
},
\qquad
f\in\{e,u_1,u_2,d\}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-998d1cdbf1344cbc)

The hydrogen channel decision is then not a free radius choice. It is the stability statement that the relevant exposure scan crosses the declared threshold while the same ambient branch-strength kernel uses $\zeta_{\mathrm{sea,H}}^{(\ell)}$ and the same-root transmitter-side acceleration weight $W_{\mathbf Xj}^{\mathrm{acc},X}=c_f/\lvert D_{t,\mathbf Xj}\rvert$. The channel probe state behind $D_{r,\mathbf Xj}^{(X)}$ is inherited from the interface diagnostic in [Braid Envelope Geometry](../noether-braid/braid-envelope-geometry.md#assembly-noether-sea-interface-diagnostic) only for root playback and path-rate diagnostics: void-stationary for clock and packing scans, the declared path velocity for penetration scans, and an explicitly declared probe velocity for moving corridor scans. Clock scans use the dimensionless phase/cadence/delay norm; corridor scans use orientation, provenance, and strong-sector ledger coherence; packing scans use exclusion magnitude and envelope-shape response; and penetration scans use signed path acceleration plus phase disruption before taking the scalar dominance norm. The same branch can therefore be weakly visible to clocks while still far below the packing or penetration thresholds.

Hydrogen-specific tolerance scales are fixed by the channel readout being protected. For a declared hydrogen channel readout $\mathcal O_{\mathrm H,X}^{(\ell)}$, the admissible tolerance pullback is

$$
\epsilon_{\mu,\mathrm H,X}^{2}
=
\sup_{\delta y_\mu}
\left\{
\left(\delta y_\mu\right)^2:
\Delta_{\mathrm H,X}^{(\mu)}(\ell)
\le
\Delta_{\mathrm H,X}^{\mathrm{tol}}
\right\}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-e000f86bae992d23)

where $\Delta_{\mathrm H,X}^{(\mu)}$ is the channel stability residual after perturbing only the retained ledger entry $y_\mu$ and projecting back to the same $\mathcal O_{\mathrm H,X}^{(\ell)}$. The supremum may be infinite when the readout is insensitive to the entry $y_\mu$; an unconstrained entry simply imposes no tolerance. In the first hydrogen pass this gives the following routing:

| Channel | Tolerance source | Hydrogen interpretation |
| --- | --- | --- |
| Clock | $\Delta_{\Gamma}^{\mathrm{tol}}$, $\Delta_{\theta}^{\mathrm{tol}}$, and $\Delta_{\chi}^{\mathrm{clk\text{-}sig,tol}}$ | Allowed clock-rate, phase, and delay perturbation before the local cadence comparison changes |
| Spectral | $\Delta_{\mathrm{spec}}^{\mathrm{tol}}$ and $\Delta_R^{\mathrm{tol}}$ | Allowed envelope-gap and common-Rydberg readout change across the chosen line set |
| Transport | Accepted flow, stress, and tensor-response stability range in $\mathbf{u}_{\text{sea}}$, $\Sigma_{\text{sea},ij}$, and $\mathcal M_{\text{sea}}^{ab}$ | Allowed medium-flow and stress-response perturbation before the transport readout changes |
| Corridor | $\Delta_{p,X}^{\mathrm{color}}$ and $\Delta_{\mathrm{prov},X}^{\mathrm{tol}}$ | Allowed open-color and provenance residual after the proton is projected as one color-singlet source |
| Packing | Accepted neighboring-core stability range in $(R_{\parallel},R_{\perp},\lambda,\xi,\mathcal S_{\mathrm{excl}}^{ab})$ | Allowed adjacency deformation before the branch ceases to count as stable packing |
| Penetration | Trial-path acceleration, deflection, and phase-disruption limits | Allowed path disturbance before transit through the fermion envelope becomes dynamically unstable |

The corridor row is the strictest hydrogen constraint: the proton's $\mathcal L_{\mathrm{strong}}^{uud}$ contribution remains inside the matter ledger, so any corridor tolerance must also satisfy the nucleon source-envelope color test before the atomic window treats the proton as one source envelope. In acceptance-set form,

$$
\mathfrak A_{\mathrm{corr,H},X}^{(\ell)}
=
\left\{
\mathcal B:
\mathcal E_{p,X}^{\mathrm{color}}
\le
\Delta_{p,X}^{\mathrm{color}},
\quad
d_{\mathrm{prov}}
\le
\Delta_{\mathrm{prov},X}^{\mathrm{tol}},
\quad
\frac{1-\hat{\mathbf r}\cdot\hat{\mathbf c}_X}{\epsilon_{\mathrm{dir}}^2}
\le
1,
\quad
\mathcal L_{\mathrm{strong}}^{uud}
\subset
\mathcal A_{\mathrm H}(T)
\right\}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-1e675e03e8d55bca)

This prevents unlike quantities from being collapsed into one scalar tolerance. The hydrogen corridor is accepted only when the color, provenance, direction, and matter-ledger inclusion tests all pass.

This resolves the scale question in layered form:

| Layer | What is being resolved | Boundary meaning |
| --- | --- | --- |
| Fermion braid scaffold | One Noether braid plus axial layer | Closure-ledger membership and dynamic exclusion envelope |
| Proton | Three quark fermion assemblies in color-singlet closure | Shared strong-sector envelope, not three isolated quark surfaces |
| Hydrogen atom | Proton closure plus electron assembly resonance | Electron orbital envelope around the nuclear causal-wake source |
| Local spacetime | Coarse-grained Noether sea response | Medium variables averaged over ambient Noether braids, with matter assemblies acting as defects and sources |

The corresponding resolution hierarchy is

$$
R_{\mathrm{NC},f}\lesssim R_f,
\qquad
R_{u,d}\lesssim R_p,
\qquad
R_p\ll R_{\mathrm{orb}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-44d819179dd3fe83)

where $R_{\mathrm{NC},f}$ is the Noether braid envelope scale of fermion $f$, $R_f$ is the fermion's effective exclusion scale including axial-layer exposure, $R_p$ is the proton color-singlet envelope scale, and $R_{\mathrm{orb}}$ is the electron resonance-envelope scale. Atomic medium calculations should use a window satisfying

$$
d_N\ll \ell_{\mathrm{atom}}\ll R_{\mathrm{orb}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-acd38ef7f05d32fb)

where $d_N$ is the ambient Noether sea braid spacing. Proton-internal calculations require a finer window that still averages ambient Noether sea braids but does not erase the quark-sector structure:

$$
d_N\ll \ell_{\mathrm{proton}}\ll R_p
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-1770847380c4ff7f)

The proton-sensitive window is admissible only if this interval is nonempty. It therefore carries a strong scale-separation assumption: ambient Noether sea braid spacing, together with the exclusion-envelope scale needed for local averaging, must be well below $R_p$. If the Noether sea branch does not establish that hierarchy, the proton-window scan is unavailable rather than approximately valid.

## Hydrogen Boundary Theorem Target

The hydrogen boundary claim is a theorem target about the relation between exact assembly ledgers, effective spatial envelopes, and local Noether sea response. The target is not that hydrogen has a literal material surface. The target is that the exact matter ledger $\mathcal A_{\mathrm H}(T)$ and the complementary medium record $S_{\mathrm{sea}}^{\Omega_{\mathrm H}}(T)$ determine the channel-specific interface diagnostics $D_{f,X}$ and the atom-local response variables used by clocks, spectra, transport, and reaction corridors.

Fix a response channel $X$ and a coarse-graining scale $\ell$ satisfying the appropriate resolution window above. Let $C_{\ell,X}$ denote the declared coarse-graining projection for that channel. The first nuclear handoff is the proton source-envelope target

$$
\mathcal W_{p,X}^{\mathrm{locked}}
=
C_{\ell,X}
\left[
\mathcal W_{u_1,X}^{\mathrm{locked}}
+
\mathcal W_{u_2,X}^{\mathrm{locked}}
+
\mathcal W_{d,X}^{\mathrm{locked}}
+
\mathcal W_{\mathrm{strong},X}^{uud}
\right]
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-8e3155a32ac56302)

where the last term is the color-singlet strong-sector corridor contribution that binds the three quark assemblies into one proton. This equation is schematic until [Nucleon Structure](nucleon-structure.md#proton-source-envelope-closure-target) supplies the quantitative color-closed corridor ledger. Its role is to prevent a free-three-quark source model from being used as the hydrogen boundary.

For isolated hydrogen, with no realized bonding or lattice branch, the first atom-local response target is

$$
\Theta_{\mathrm H,X}^{(\ell)}(\mathbf X,T)
=
\Theta_{\mathrm{bg},X}^{(\ell)}(\mathbf X,T)
+
\delta\Theta_{p(uud),X}^{(\ell)}
\!\left[
\mathcal W_{p,X}^{\mathrm{locked}},D_{p,X}
\right]
+
\delta\Theta_{e\text{-env},X}^{(\ell)}
\!\left[
\mathcal B_e,D_{e,X}
\right]
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-e75ac8c6f4fd7db1)

Here $\Theta_{\mathrm{bg},X}^{(\ell)}$ is the ambient Noether sea response in the same window, $\delta\Theta_{p(uud),X}^{(\ell)}$ is the proton boundary contribution after color-singlet coarse-graining, and $\delta\Theta_{e\text{-env},X}^{(\ell)}$ is the electron-envelope contribution for the realized atomic branch $\mathcal B_e$. In central-potential spectral limits, $\mathcal B_e$ must later recover the observer-level orbital labels through [Atomic Spectra](atomic-spectra.md), but those labels are outputs of the envelope calculation, not inputs to the proton boundary.

The proof route has four candidate lemmas:

1. **Ledger-complement lemma:** if $\mathcal A_{\mathrm H}(T)$ is the exact hydrogen matter ledger, then $S_{\mathrm{sea}}^{\Omega_{\mathrm H}}(T)$ contains no architrino, bound wake-exchange record, or strong-sector corridor record phase-locked to $\mathcal A_{\mathrm H}(T)$.
2. **Proton-envelope lemma:** the $uud$ color-singlet ledger projects to a stable $\mathcal W_{p,X}^{\mathrm{locked}}$ at atomic resolution, while changes below $\ell_{\mathrm{proton}}$ affect only retained multipole, shielding, or corridor coefficients.
3. **Electron-envelope lemma:** the electron assembly remains external to the proton closure and contributes through $\mathcal B_e$ and $D_{e,X}$, not by redefining the electron's Noether braid boundary as the orbital envelope.
4. **Response-consistency lemma:** the same $S_{\mathrm{sea}}^{\Omega_{\mathrm H}}(T)$ and locked-wake records determine the density, delay, cadence, envelope, and response-tensor entries of $\Theta_{\mathrm H,X}^{(\ell)}$ without separate fitted rules for spectra, clocks, or transport.

The first computable test is therefore a channel-by-channel scan in which $X$ is chosen, $\ell$ is varied inside the admissible window, and the extracted pair

$$
\left(
D_{p,X},D_{e,X}
\right)
\longmapsto
\Theta_{\mathrm H,X}^{(\ell)}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-c2e4fe2c40aed249)

remains stable under refinement up to the declared sensitivity of the channel. The theorem target fails if a matter Noether braid is counted as ambient Noether sea, if the three proton quark assemblies are treated as free Noether braids, if the electron resonance envelope is treated as the electron's braid boundary, if $n$ and $\chi_{\text{sea}}$ are merged, or if different response maps must be fitted independently for the same hydrogen branch.

Muonic and electronic hydrogen sharpen this boundary target because they probe the same proton source ledger through different lepton-envelope branches. For $q\in\{e,\mu\}$, the comparison must have the form

$$
\mathcal A_{p,q}(T)
=
\mathcal A_q(T)
\cup
\mathcal A_{u_1}(T)
\cup
\mathcal A_{u_2}(T)
\cup
\mathcal A_d(T)
\cup
\mathcal L_{\mathrm{strong}}^{uud}(T).
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-2dd55dd4f201adb8)

For $q=e$, this is the working Generation-I electronic-hydrogen comparison inventory $\mathcal A_{\mathrm H}$; stability remains a theorem target. For $q=\mu$, the Generation-II muon branch replaces the electron, and the comparison is defined only over a declared muon-branch retention window $W_\mu$ on which $\mathcal A_\mu(T)$ remains an admitted assembly. The transient branch does not silently enlarge the Generation-I hydrogen ledger.

$$
\mathcal O_{p,q,X}
=
F_{q,X}
\!\left[
\mathcal W_{p,X}^{\mathrm{locked}},
\Theta_{p,q,X}^{(\ell)},
\mathcal B_q
\right]
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-b90fa54a8e330bae)

with one $\mathcal W_{p,X}^{\mathrm{locked}}$ and one declared proton matter/medium split. Here $\Theta_{p,q,X}^{(\ell)}$ is built from the same background and proton records with only the admitted lepton branch changed. The two probe maps may weight the proton-adjacent region differently, but they may not fit different proton ledgers. The observer-level recovery target is to reproduce the electronic- and muonic-hydrogen determinations within their declared uncertainties; a persistent probe-dependent proton property is not allowed unless the measurement record itself requires it.

## Hydrogen Channel-Scan Proof Target

The first proof packet should turn the hydrogen boundary target into a finite scan over response channels and coarse-graining windows. The admissible channel list begins with

$$
X
\in
\mathcal X_{\mathrm H}
=
\{
\mathrm{clock},
\mathrm{spec},
\mathrm{transport},
\mathrm{corridor},
\mathrm{packing},
\mathrm{penetration}
\}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-e8464b5f995bb774)

For each $X$, the scan must declare whether it is using an atomic-resolution window or a proton-sensitive window:

$$
I_X^{\mathrm{atom}}
=
\{\ell:d_N\ll\ell\ll R_{\mathrm{orb}}\},
\qquad
I_X^{p}
=
\{\ell:d_N\ll\ell\ll R_p\}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-7ef347c3168ac3c3)

The spectral, clock, and transport channels normally start in $I_X^{\mathrm{atom}}$, because they read the electron envelope and the surrounding Noether sea response. Proton-sensitive corridor, packing, or penetration tests may require $I_X^{p}$, but then the color-singlet proton source envelope $\mathcal W_{p,X}^{\mathrm{locked}}$ must still be recovered before returning to the atomic window. The scan fails if the chosen $\ell$ averages away the electron envelope in a spectral calculation or resolves the proton into free quark assemblies in an atomic calculation.

For every accepted $\ell\in I_X$, the extracted response is the channel map

$$
\mathcal O_{\mathrm H,X}^{(\ell)}
=
F_X
\!\left[
\Theta_{\mathrm H,X}^{(\ell)},
D_{p,X}^{(\ell)},
D_{e,X}^{(\ell)}
\right]
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-e922ac80d5bcff23)

where $F_X$ is the declared readout functional for the channel. For $X=\mathrm{clock}$, $F_X$ keeps the cadence and delay entries that perturb clock comparison. For $X=\mathrm{spec}$, it keeps the electron-envelope energy gaps and the clock/rate conversion needed by [Atomic Spectra](atomic-spectra.md). For $X=\mathrm{transport}$, it keeps the flow, stress, tensor-response, and medium-update entries. For $X=\mathrm{corridor}$, it keeps oriented exchange and provenance entries. For $X=\mathrm{packing}$, it keeps scalar or tensor exclusion-stress magnitude. For $X=\mathrm{penetration}$, it keeps the local acceleration and phase-disruption entries along the tested path.

The stability criterion compares two admissible resolutions only after projecting them to the same channel readout:

$$
\Delta_X(\ell,\ell')
=
\frac{
\left\|
\mathcal O_{\mathrm H,X}^{(\ell)}
-
\mathcal R_{\ell\leftarrow\ell'}
\mathcal O_{\mathrm H,X}^{(\ell')}
\right\|_X
}{
\left\|
\mathcal O_{\mathrm H,X}^{(\ell)}
\right\|_X
+
\varepsilon_X
},
\qquad
\ell,\ell'\in I_X
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-4bdc9dd437163210)

with $\mathcal R_{\ell\leftarrow\ell'}$ the declared comparison projection and $\varepsilon_X > 0$ the channel tolerance floor. The first pass condition is

$$
\sup_{\ell,\ell'\in I_X}
\Delta_X(\ell,\ell')
\le
\Delta_X^{\mathrm{tol}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-b426f6f94ebb350b)

where $I_X$ is the selected admissible window and $\Delta_X^{\mathrm{tol}}$ is the sensitivity threshold of the benchmark being tested. This condition is not a claim that all channels share one radius. It says that, within a fixed channel and declared window, the same hydrogen ledger and Noether sea complement produce a stable readout without changing the matter/medium split.

The scan should report failures in a form that identifies which proof obligation broke:

1. **Ledger failure:** a source branch contributes both to the locked hydrogen ledger and to $S_{\mathrm{sea}}^{\Omega_{\mathrm H}}(T)$.
2. **Window failure:** the scan uses an $\ell$ that erases the electron envelope, resolves the proton as free quarks at atomic resolution, or fails to average many ambient Noether sea braids.
3. **Density-delay failure:** $n(\mathbf X,T)$ and $\chi_{\text{sea}}(\mathbf X,T)$ are not independently recoverable from $\Theta_{\mathrm H,X}^{(\ell)}$.
4. **Source-envelope failure:** $\mathcal W_{p,X}^{\mathrm{locked}}$ cannot be recovered as a color-singlet proton envelope after proton-sensitive resolution.
5. **Readout-fit failure:** two channels require independently fitted response maps for the same hydrogen branch instead of different projections of the same ledger and Noether sea record.

## Element-Dependent Sea Response

Hydrogen fixes the clean boundary case, but heavier atoms should use the same ledger-complement discipline. An element name is not itself a Noether sea boundary condition. It becomes physically meaningful only after the isotope, ionization state, electron-envelope branch, and any material bonding branch are fixed inside the $\mathbb{U}_{\text{now}}$ state record.

For an atomic window $\Omega_E$ with proton number $Z$, neutron number $N$, electron-envelope branch $\mathcal B_e$, and optional bonding or lattice branch $\mathcal B_{\mathrm{lat}}$, write the nuclear assembly ledger schematically as

$$
\mathcal A_{\mathrm{nuc}}^{Z,N}(T)
=
\bigcup_{\alpha=1}^{Z}\mathcal A_{p_\alpha}(T)
\cup
\bigcup_{\nu=1}^{N}\mathcal A_{n_\nu}(T)
\cup
\mathcal L_{\mathrm{nuc}}^{Z,N}(T)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-0ed9e899407cdc06)

where $\mathcal L_{\mathrm{nuc}}^{Z,N}$ records the residual nuclear binding, corridor, pairing, and shell-structure ledgers that make the protons and neutrons one nuclear assembly rather than a list of free nucleons. The locally resolved Noether sea complement is then

$$
S_{\mathrm{sea}}^{\Omega_E}(T)
=
S(T)\big|_{\Omega_E}
\setminus
\left(
\mathcal A_{\mathrm{nuc}}^{Z,N}(T)
\cup
\mathcal A_{\mathrm{e-env}}^{\mathcal B_e}(T)
\cup
\mathcal L_{\mathrm{bond}}^{\mathcal B_{\mathrm{lat}}}(T)
\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-fd903f617968619a)

At atomic resolution the corresponding coarse-grained response should be decomposed as

$$
\theta_E^{(\ell)}(\mathbf X,T)
=
\theta_{\mathrm{bg}}^{(\ell)}(\mathbf X,T)
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
\right]
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-67edd8d52a79019d)

where $\Sigma_{\mathrm{ax}}^{Z,N}$ abbreviates the proton and neutron axial inventories after nuclear closure. The three perturbation terms are calculation slots, not separate substances: the nucleus supplies the coarse nuclear causal-wake envelope, the electron branch supplies the realized resonance and exclusion envelope, and the bonding branch supplies any shared wake corridors or lattice constraints.

This gives a strict level distinction for periodic-table language:

| Property or label | Continuum role |
| --- | --- |
| $Z$, $N$, isotope, proton/neutron axial inventories, nuclear binding ledger | Direct inputs to $\delta\theta_{\mathrm{nuc}}^{(\ell)}$ after coarse-graining. |
| Electron-envelope branch, shell stability gap, ionization state | Inputs to $\delta\theta_{\mathrm{e-env}}^{(\ell)}$ only after a realized branch is specified. |
| Bonding corridor, lattice phase, pressure state, magnetic or transport branch | Inputs to $\delta\theta_{\mathrm{bond}}^{(\ell)}$ only for material states, not for the isolated element name. |
| Element symbol, group, block, oxidation-state family, electronegativity, atomic radius, and chemical family name | Observer-level summaries and validation targets; they do not by themselves source the Noether sea response. |

At the constitutive level, the useful output is therefore not a scalar density assigned to the atom. It is a local Noether sea response record,

$$
\Theta_E^{(\ell)}(\mathbf X,T)
=
\left(
\rho_{\text{NS}},\,
n,\,
\chi_{\text{sea}},\,
\Gamma_N,\,
\lambda,\,
\xi,\,
\mathbf{u}_{\text{sea}},\,
\Sigma_{\text{sea},ij},\,
\mathcal M_{\text{sea}}^{ab}
\right)^{(\ell)}_E
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-acbceeeb18a9168d)

where $\Gamma_N$ is the local Noether sea cadence-stretch diagnostic, $(\lambda,\xi)$ are the envelope scale and shape records inherited from Noether braid geometry, $\Sigma_{\text{sea},ij}$ is the component stress projection, and $\mathcal M_{\text{sea}}^{ab}$ is the medium-response tensor that later connects inertial and gradient response. Nuclear terms first determine the coarse source envelope $\mathcal W_{\text{nuc}}$; electron-envelope terms then determine resonance, exclusion, and spectral response as in [Atomic Spectra](atomic-spectra.md); lattice and pressure terms enter only when a material environment supplies bonding corridors or transport constraints, as in [Condensed Matter](condensed-matter.md). Ambient density and delay remain separate baseline variables rather than element properties.

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
\right]
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-77f10e6cdb1d6682)

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
\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-1e38d24a12c0655c)

Here $\mu_E^B$ and $\mu_Y$ are effective branch free-energy or chemical-potential functionals for the declared material branches. They are constitutive comparison functionals, not the architrino bookkeeping constant $\mu_{\text{arch}}$.

The hypothesis behind dense iron-bearing phases is then not that the element symbol `Fe` directly sources a denser Noether sea. It is that the realized nuclear inventory, electron branch, metallic bonding branch, and pressure state may make the iron-rich branch more compatible with high normalized Noether braid density than a silicate branch:

$$
\frac{\partial}{\partial n}
\Delta\mu_{\mathrm{Fe/silicate}}^{\mathrm{metal}}
<
0
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f51858c849c67fb1)

along the relevant planetary-interior branch. This inequality is a constitutive target. It must be derived from assembly packing, exclusion-volume response, metallic bonding, pressure response, and Noether sea coupling; it cannot be assumed from ordinary density alone. [Condensed Matter](condensed-matter.md#earth-core-iron-as-a-boundary-case) carries the Earth-core iron specialization and the packing sufficient condition.

This map imposes four local failure tests:

1. **Boundary blend:** if $\mathcal A_{\mathrm{nuc}}^{Z,N}$, $\mathcal A_{\mathrm{e-env}}^{\mathcal B_e}$, and $S_{\mathrm{sea}}^{\Omega_E}$ collapse into one literal surface, the assembly/medium distinction has failed.
2. **Density-delay blend:** if $n(\mathbf X,T)$ is used as a delay factor or $\chi_{\text{sea}}(\mathbf X,T)$ is used as density, the constitutive variables have been mixed.
3. **Element-label overreach:** if an element symbol, group, or block label is treated as a direct source of $\Theta_E^{(\ell)}$ before isotope, ionization, branch, and material state are specified, the observer-level summary has been promoted beyond its derivation.
4. **Hidden transport loss:** if pressure, lattice motion, or transport changes the response while no recoil, medium excitation, heating, radiation, or branch-transition channel is logged, the local energy and Noether sea update ledger is incomplete.

## Angular-Momentum Handoff

The immediate atomic target is to recover observer-level orbital quantum numbers from electron assemblies moving in an external nuclear and Noether sea environment. That target is separate from the internal rotational action of the electron's Noether braid assembly. A later atomic-spin pass must show how spin-orbit and hyperfine structure arise when the external resonance envelope couples to the completed internal spin ledger and to the measurement-response model. Until then, this chapter should treat shell filling and exclusion language as effective atomic bookkeeping inherited from the spin-statistics proof program.

The foundation-up version begins with the nucleus and its constituent Noether braid ledgers. A proton-electron hydrogen comparison is the cleanest first case, but the same level distinction applies to all atoms: the electron assembly responds to the combined causal-wake envelope of the nucleus, the local Noether sea, and other electron assemblies. The proof direction is therefore downstream. First derive the integer-closed Noether braid ledgers of the nuclear constituents, then coarse-grain their emitted causal wakes into an effective envelope, and only then recover the observer-level orbital labels $(n,\ell,m)$ as resonance labels of the external electron envelope. Those labels should not be used backward as proof of the electron's internal Noether braid spinor state or of the nuclear braid ledger.

A schematic handoff is

$$
\bigl(k_I,k_M,k_O,\mathcal R\bigr)_{\text{nuc}}
\longrightarrow
\mathcal W_{\text{nuc}}(r,\hat{\mathbf r},T)
\longrightarrow
\Psi_{\text{e-env}}(r,\theta,\phi)
\sim
R_{n\ell}(r)Y_\ell^m(\theta,\phi)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-ece81e3f5f2b9d15)

Here $\bigl(k_I,k_M,k_O,\mathcal R\bigr)_{\text{nuc}}$ abbreviates the integer winding and causal-root bookkeeping of the relevant nuclear Noether braid ledgers, while $\mathcal W_{\text{nuc}}$ denotes the effective nuclear causal-wake envelope after coarse-graining those ledgers. The right-hand side is the standard observer-level recovery form that the electron assembly must reproduce in central-potential limits.

The coordinates $(r,\theta,\phi)$ in this recovery form are ordinary spherical coordinates for the electron-envelope chart, not Noether sea record labels.

For central-potential comparisons, the specific orbital recovery gate is ordinary $2\pi$ azimuthal closure and angular regularity:

$$
\psi_{\text{orb}}(\phi+2\pi)=\psi_{\text{orb}}(\phi),
\qquad
\ell\in\mathbb N_0,
\qquad
m\in\{-\ell,\ldots,\ell\}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-9c4809139c9c9efb)

Here $\psi_{\text{orb}}$ is the azimuthal factor of the extracted envelope $\Psi_{\mathrm{env}}$ defined below, so the $\Delta_{2\pi}$ residual tests the same single-valuedness condition on the full envelope. Those labels describe the effective electron-assembly envelope around the nucleus. They should not be read as the internal Noether braid spinor ledger of the electron itself.

The sharper recovery target is a residual on the declared envelope extractor. For an electron assembly branch $\mathcal B_e$, local Noether sea record $\theta_{\mathrm{sea}}^{(\ell)}$, central-potential approximation $V_{\mathrm{eff}}$, and record window $W$, write

$$
\Psi_{\mathrm{env}}
=
\mathcal E_{\mathrm{orb}}
\left(
\mathcal B_e,
\theta_{\mathrm{sea}}^{(\ell)},
V_{\mathrm{eff}},
W
\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-d9f992326d0df148)

The extractor must first pass restartability, central-chart, record-channel, and normalization checks, collected as $\mathcal R_{\mathrm{env}}$. Only then should the angular labels be tested by

$$
\mathcal R_{\mathrm{orb}}
=
\left(
\mathcal R_{\mathrm{env}},
\Delta_{2\pi},
\Delta_{\Omega},
\Delta_{\ell m},
\Delta_{\mathrm{int}}
\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f5fcb9df573dfcbb)

where

$$
\Delta_{2\pi}
=
\sup_{r,\theta,\phi}
\frac{
\left|
\Psi_{\mathrm{env}}(r,\theta,\phi+2\pi)
-
\Psi_{\mathrm{env}}(r,\theta,\phi)
\right|
}{
\left\|\Psi_{\mathrm{env}}\right\|+\varepsilon_{\Psi}
}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-e9fb2dc00f6f1d8f)

tests azimuthal single-valuedness, $\Delta_{\Omega}$ tests the angular operator against $\ell(\ell+1)$ and $m$, $\Delta_{\ell m}$ enforces $\ell\in\mathbb N_0$, $m\in\mathbb Z$, and $|m|\le\ell$, and $\Delta_{\mathrm{int}}$ checks that the observer-level orbital envelope has not been mistaken for the internal Noether braid spin ledger. The orbital packet is promotable only when all five entries pass for the same envelope branch, with $\mathcal R_{\mathrm{env}}$ understood as the bundled first entry rather than one scalar residual.
