# Neutrinos

This chapter gives the $\mathbb{A}\mathbb{A}\mathbb{A}$ assembly-level account of neutrinos as near-photon neutral assemblies. The simple picture is that a neutrino is almost a photon-channel pair, but not quite locked enough to become a photon. That near-lock explains why it is neutral, fast, weakly coupled, hard to detect, and still able to expose an oscillation ledger.

A neutrino is modeled as a near-planar pro/anti [Noether braid](../../noether-braid/noether-braid.md) pairing pushed close to the photon channel without completing the photon lock. The goal is to keep neutrality, weak coupling, oscillation, and detection difficulty tied to internal geometry rather than to elementary point-particle axioms.

The opening section states the working geometry and the plain-language interpretation. The later closure program records how PMNS-style mixing is meant to arise from residual internal-binary exposure in a pro/anti braid pair. The exact locked geometry remains open; "near-photon" is the current controlled descriptor, not a finished derivation.

## Near-Photon Neutral-Core Pairing

Definition (geometric, working): A neutrino is a near-planar pro/anti Noether braid pairing adjacent to the photon geometry. The photon is the fully locked **coaxial contra-rotating pro/anti planar pair**. A neutrino is nearly snapped into that state, but keeps a residual internal-binary mismatch that prevents it from becoming the photon transport channel.

- Core structure and shielding:
  - The pro-braid and anti-braid contributions cancel charge-like exposure, with $q_{\text{net}} = 0$.
  - The assembly does not carry a stable charged-fermion-style six-site axial layer. Balanced $3\epsilon_+,3\epsilon_-$ language is weak-coupling bookkeeping for how the neutral channel is read during interaction, not a bound constituent inventory.
  - Near-planarity hides most of the internal ledger from exterior coupling. The remaining signal is a tiny phase and energy residue from the internal binaries.

- Near-photon boundary:
  - The photon state is the fully coherent coaxial contra-rotating pro/anti planar pair transport channel.
  - The neutrino sits just off that lock: close enough to be neutral, fast, and weakly coupled, but not coherent enough to propagate as a photon train.
  - The incomplete photon lock is the important difference. A photon hides the pro/anti planar pair inside one massless transverse transport ledger. A neutrino remains close to that boundary, so its exterior coupling is small and its propagation speed is high, but the residual internal-binary rows do not collapse into one photon-channel phase.
  - This "not quite photon" status gives the neutrino a small observer-facing mass channel and a nontrivial oscillation ledger.

- Propagation:
  - Trajectories are almost straight at speeds close to the effective field speed; small deflections occur only through coherent corridor couplings to nearby assemblies.
  - Apparent inertia is dictated by the minuscule residual exposure left by the almost planar pro/anti lock.

- Flavor and oscillation (revealed internal ledger):
  - "Flavor" labels which residual internal-binary energy and phase mode is exposed to the weak channel.
  - Oscillation is the distance-dependent revealing of those internal binaries as the near-planar pro/anti pair precesses through its almost-photon geometry.
  - The constituent-binary intuition should be read as residual internal-binary behavior, not as a new inventory of ordinary constituent particles. The same near-photon assembly is sampled through different weak-channel alignments as its internal binary phases beat against one another.
  - The beat pattern arises from residual internal phase dynamics and path-history geometry; it is not a stable six-site axial layer flipping among ordinary charged-fermion configurations.

- Chirality (handedness bias):
  - Emission/capture selection rules are chiral: axial phase winding favored in typical sources matches observed handedness of weak processes (alignment with W/Z-like corridor re-couplings).

- Weak interactions as corridor re-coupling:
  - Charged-current processes correspond to brief, localized corridor connections that reassign the weak-coupling ledger and axial architrinos between the participating assemblies (W-like), while neutral-current scattering corresponds to energy/momentum exchange with zero net charge transfer (Z-like). Cross sections are tiny because the neutrino's exterior coupling residue is small; compare [Electroweak Bosons: Photons, W/Z, and Higgs](../bosons/electroweak-bosons.md).

At the phase-generator level, the intended split is
$$
\Omega^{(\nu)}
=
\omega_{\nu 0}\mathbf{1}
+
\delta\Omega_{\mathrm{bin}}
$$
where $\omega_{\nu 0}\mathbf{1}$ is the large near-photon common propagation term and $\delta\Omega_{\mathrm{bin}}$ is the residual internal-binary phase operator. The common term is why the neutrino is a high-speed neutral channel. The residual term is why it can oscillate instead of becoming a photon-channel packet.

The exposed-energy row should be kept separate from the internal energy row. For a near-photon neutrino branch,
$$
E_{\nu,\mathrm{int}}
=
E_{\nu,\mathrm{exp}}(T)
+E_{\nu,\mathrm{sh}}(T),
$$
where $E_{\nu,\mathrm{exp}}(T)$ is the weak-channel exposed part and $E_{\nu,\mathrm{sh}}(T)$ is the internally shielded part of the same retained branch. The state $|\psi_\nu(T)\rangle$ lives in the three-mode residual-binary space on which $H_{\mathrm{geo}}$ acts. Because $H_{\mathrm{geo}}$ carries mass-squared-response units rather than energy units, the weak-projected response must first be mapped into an energy-facing phase row for a declared ultrarelativistic comparison energy $E_\nu$:
$$
\mu_{\nu,W}^2(T)
\equiv
\langle\psi_\nu(T)|\Pi_W H_{\mathrm{geo}}\Pi_W|\psi_\nu(T)\rangle,
\qquad
\mathcal{E}_{\nu,W}(T;E_\nu)
\equiv
\frac{\mu_{\nu,W}^2(T)}{2E_\nu}.
$$
A compact closure target is
$$
\mathcal{R}_{\nu,\mathrm{shield}}
=
\left\|
E_{\nu,\mathrm{exp}}(T)
-
\mathcal{E}_{\nu,W}(T;E_\nu)
\right\|
+
\left\|
\frac{d}{dT}
\left(
E_{\nu,\mathrm{exp}}+E_{\nu,\mathrm{sh}}
\right)
\right\|,
$$
with $\Pi_W$ the weak-exposure projector on the near-photon branch. This does not make the neutrino's mass a hidden-energy label. It states that the tiny observer-facing mass and oscillation signal must come from the same exposed fraction that the weak channel samples, while the total retained internal ledger remains conserved during free propagation.

The three residual internal binaries should remain visible in the closure record before PMNS fitting begins. A resolved near-photon branch may be written schematically as
$$
\Theta_{\nu}^{(3B)}(T)
=
\left\{
\left(
E_{\ell}(T),
R_{\ell}(T),
\hat{\mathbf{J}}_{\ell}(T),
\phi_{\ell}(T),
\zeta_{\ell W}(T)
\right)
\right\}_{\ell=1}^{3},
\qquad
E_{\nu,\mathrm{exp}}(T)
=
\sum_{\ell=1}^{3}
\zeta_{\ell W}(T)E_{\ell}(T).
$$
Here $E_{\ell}$, $R_{\ell}$, $\hat{\mathbf{J}}_{\ell}$, and $\phi_{\ell}$ record the layer energy, scale, angular-momentum direction, and phase of each residual internal binary, while $\zeta_{\ell W}$ is the weak-channel exposure weight derived from the near-photon geometry. The PMNS map should recover its effective three-mode behavior from this exposure record, not from three independent flavor labels added after propagation.

Plain language: A neutrino is almost a photon-shaped neutral pair, but not quite. Most of its energy is hidden in the near-planar pro/anti lock. As it travels, tiny differences among its internal binaries become visible to weak interactions in different ways; that changing visible part is what the theory uses for oscillation. If the lock completed, the object would be read as a photon-channel packet; because it does not complete, the remaining internal-binary rhythm is still available to the weak channel.

## Conversion and Reaction-Provenance Questions

The near-photon picture raises natural photon/neutrino conversion questions. The corpus treats these as closure questions, not as settled claims.

- A free photon is not assumed to dissociate directly into neutrinos. Photon-channel energy can participate in neutrino production only if the full reaction provenance closes: energy, momentum, charge/polarity, spin/angular momentum, and medium participation must all balance.
- A neutrino is not assumed to relock spontaneously into a photon. A photon-channel outcome would require an interaction that relocks the near-planar pro/anti pair into the fully coherent coaxial contra-rotating pro/anti planar-pair mode.
- The useful search target is therefore not simple dissociation, but assisted relocking: which environments, partner assemblies, or weak corridors can move a near-photon neutrino assembly into or out of the photon channel while preserving the ledgers?

This keeps the strong intuition - neutrinos live close to photons in assembly space - without overclaiming an unvalidated free-particle dissociation path.

## PMNS closure program (primary lepton integration)

Use a three-mode internal phase operator with mass-squared-response units:
$$
H_{\mathrm{geo}}=
\begin{pmatrix}
\varpi_1 & \Omega_{12}e^{-i\phi_{12}} & \Omega_{13}e^{-i\phi_{13}}\\
\Omega_{12}e^{i\phi_{12}} & \varpi_2 & \Omega_{23}e^{-i\phi_{23}}\\
\Omega_{13}e^{i\phi_{13}} & \Omega_{23}e^{i\phi_{23}} & \varpi_3
\end{pmatrix}
$$
with $(\varpi_i,\Omega_{ij},\phi_{ij})$ derived from near-planar pro/anti braid-pair geometry, residual internal-binary exposure, and Noether sea coupling.

Here $H_{\mathrm{geo}}$ is the operator that supplies the relativistic propagation phase, not an ordinary energy Hamiltonian. In natural units, $\varpi_i$ and $\Omega_{ij}$ carry mass-squared-response units. Diagonalization defines the mixing matrix and the effective mass-squared-response eigenvalues:
$$
H_{\mathrm{geo}}=U_{\mathrm{PMNS}}\Lambda U_{\mathrm{PMNS}}^\dagger,\qquad
\Lambda=\operatorname{diag}(\lambda_1,\lambda_2,\lambda_3),\qquad
|\nu_\alpha\rangle=\sum_i U_{\alpha i}|\nu_i\rangle
$$
Thus $\lambda_i$ is not an energy eigenvalue; it is the geometric counterpart of a mass-squared propagation response, and $\Delta\lambda_{ij}=\lambda_i-\lambda_j$.

Vacuum oscillation probabilities follow:
$$
P_{\alpha\to\beta}(L,E)=
\delta_{\alpha\beta}
-4\sum_{i<j}\Re\!\left[U_{\alpha i}U_{\beta i}^*U_{\alpha j}^*U_{\beta j}\right]\sin^2\Delta_{ij}
+2\sum_{i<j}\Im\!\left[U_{\alpha i}U_{\beta i}^*U_{\alpha j}^*U_{\beta j}\right]\sin(2\Delta_{ij})
$$
$$
\Delta_{ij}=\frac{\Delta\lambda_{ij}L}{4E}
$$
The displayed CP-odd sign fixes the neutrino convention for the basis above. Antineutrino comparisons use the complex-conjugated mixing matrix, so the CP-odd term changes sign; in matter, the charged-current part of the matter potential also reverses sign.

The two-basis distinction is part of the recovery target, not optional notation. Weak reactions create and detect flavor-basis states $|\nu_\alpha\rangle$, while propagation follows the eigenbasis $|\nu_i\rangle$ of $H_{\mathrm{geo}}$. In the two-state limit this reduces to the benchmark form
$$
P_{\nu_e\to\nu_\mu}(L,E)
=
\sin^2(2\theta)\,
\sin^2\!\left(\frac{\Delta\lambda\,L}{4E}\right)
$$
using the same mass-squared-response eigenvalue gap convention as the three-flavor equation above. Any later conversion to ordinary mass language is a comparison-layer unit map; it must not replace the geometric eigenvalue derivation.

The experimental implementation makes this split operational. A long-baseline beam creates a flavor-tagged neutrino through a weak reaction, lets the neutral branch propagate over a declared baseline, and reads the detector flavor from the charged products of the rare interaction that finally occurs. The beamline may be described as a muon-neutrino source, but in the propagation interval the retained state is not a flavor eigenstate; it is a superposition of mass-response eigencomponents whose relative phases change with $L/E$ and with the intervening matter record. The $\mathbb{A}\mathbb{A}\mathbb{A}$ recovery target is therefore one event ledger with source, propagation, and detector rows: source flavor tag, energy spectrum, baseline, in-medium phase correction, detector flavor tag, recoil, and missing neutral-lepton row must all refer to the same near-photon branch history. Oscillation measurements then constrain eigenvalue gaps and ordering pressure, not the absolute mass scale by themselves.

Matter correction enters through a flavor-structured operator sourced by the local matter record carried with the Noether sea state. The normalized Noether braid density remains
$$
n(\mathbf X,T)\equiv\frac{\rho_{\text{NS}}(\mathbf X,T)}{\rho_{\text{NS},0}}
$$
but the MSW-facing correction must also sample the embedded electron, proton, and neutron assembly content through the weak-exposure projector. Let $\theta_{\mathrm{sea}}(\mathbf X,T)$ denote that local Noether sea record, including $n(\mathbf X,T)$ and the matter-assembly content relevant to coherent weak scattering. The effective operator is
$$
H_{\mathrm{eff}}^{\alpha\beta}
=
H_{\mathrm{geo}}^{\alpha\beta}
+
V_{\mathrm{mat}}^{\alpha\beta}
\left(
\theta_{\mathrm{sea}}(\mathbf X,T),
\Pi_W;
E_\nu
\right)
$$
where $V_{\mathrm{mat}}^{\alpha\beta}$ is a flavor-structured mass-squared-response operator. In the Standard Model comparison limit it must reduce, up to the oscillation-irrelevant identity part, to the charged-current MSW row,
$$
V_{\mathrm{mat}}^{\alpha\beta}
\longrightarrow
2E_\nu
\begin{pmatrix}
V_{\mathrm{CC}}(n_e(\mathbf X,T)) & 0 & 0\\
0 & 0 & 0\\
0 & 0 & 0
\end{pmatrix}^{\alpha\beta}
+2E_\nu V_{\mathrm{NC}}(\mathbf X,T)\delta^{\alpha\beta}.
$$
Here $n_e$ is the local electron density in the matter record. The charged-current term tracks that electron density, while the neutral-current identity term contributes only a common phase unless sterile or right-handed branches are being compared. The full matter term must be normalized to the same mass-squared-response units as $H_{\mathrm{geo}}$ before the $\Delta\lambda L/(4E)$ phase formula is used.

Closure criterion for this chapter: one near-photon geometric phase-operator family must reproduce PMNS angles/phases and the observed $L/E$ pattern without introducing unconstrained flavor-specific ad hoc terms. For the electroweak-angle side of the same lepton sector, see [Weak Mixing Angle](./weak-mixing-angle.md); for validation targets, see [Constraint Ledger](../../validation/constraint-ledger.md).

## Empirical Decision Gates

The neutral-lepton branch should be revised only by observable gates, not by importing a sterile-neutrino or Majorana interpretation as doctrine.

- **Absolute mass gate:** the eigenvalues of $H_{\mathrm{geo}}$ must remain compatible, through the same comparison-layer map from mass-squared response to ordinary mass language, with oscillation splittings, direct kinematic bounds, and cosmological bounds on $\sum_i m_i$. If future data force the lightest neutrino mass close to zero, the near-photon phase operator should explain that as a boundary or shielding limit of the neutral core-pair spectrum rather than as an added parameter.
- **Dirac/Majorana gate:** a confirmed neutrinoless double-beta signal would require a lepton-number-violating reaction provenance channel. A null result instead tightens the allowed Majorana-like coupling or sterile-branch mixing, but does not by itself prove the current Dirac-like geometry.
- **Right-handed or sterile branch gate:** a $\nu_R$-like branch may be added only if the weak-coupling-triad exposure, anomaly bookkeeping, PMNS map, and reaction provenance all remain compatible. Such a branch must be an $SU(2)$ singlet with $Y=0$ in observer-level bookkeeping and must not become a hidden patch for unrelated dark-sector mass.
- **Dark-sector gate:** a neutral-lepton dark-matter interpretation is admissible only if the candidate branch supplies cosmological stability, abundance, and free-streaming behavior while preserving BBN, CMB, and structure-formation constraints.

External benchmark packages can sharpen these gates without becoming $\mathbb{A}\mathbb{A}\mathbb{A}$ predictions. A particularly strict neutral-sector benchmark is
$$
m_{\mathrm{lightest}}\to 0,
\qquad
\sum_i m_i \approx 0.06\,\mathrm{eV}
$$
paired with a suppressed neutrinoless double-beta rate and a sterile or right-handed branch only if the same branch also closes the dark-sector abundance and free-streaming gates. In this chapter those values are discriminator targets: convergence toward them would pressure the near-photon phase operator toward a boundary or shielding limit, while a measured larger mass sum, incompatible neutrinoless double-beta signal, or detected sterile branch with the wrong coupling pattern would force revision of the neutral-lepton geometry.
