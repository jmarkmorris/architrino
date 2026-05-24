# Neutrinos

This chapter gives the $\mathbb{A}\mathbb{A}\mathbb{A}$ assembly-level account of neutrinos as near-photon neutral assemblies. A neutrino is modeled as a near-planar pro/anti [Noether swarm](../../noether-swarm/noether-swarm.md) pairing pushed close to the photon channel without completing the photon lock. The goal is to explain why neutrinos are neutral, weakly coupled, oscillatory, and hard to detect while keeping the discussion tied to internal geometry rather than to elementary point-particle axioms.

The opening section states the working geometry and the plain-language interpretation. The later closure program records how PMNS-style mixing is meant to arise from residual internal-binary exposure in a pro/anti swarm pair. The exact locked geometry remains open; "near-photon" is the current controlled descriptor, not a finished derivation.

## Near-Photon Neutral-Core Pairing

Definition (geometric, working): A neutrino is a near-planar pro/anti Noether swarm pairing adjacent to the photon geometry. The photon is the fully locked **coaxial contra-rotating pro/anti planar pair**. A neutrino is nearly snapped into that state, but keeps a residual internal-binary mismatch that prevents it from becoming the photon transport channel.

- Core structure and shielding:
  - The pro-swarm and anti-swarm contributions cancel charge-like exposure, with $q_{\text{net}} = 0$.
  - The assembly does not carry a stable charged-fermion-style six-site axial layer. Balanced $3P,3E$ language is weak-coupling bookkeeping for how the neutral channel is read during interaction, not a bound constituent inventory.
  - Near-planarity hides most of the internal ledger from exterior coupling. The remaining signal is a tiny phase and energy residue from the internal binaries.

- Near-photon boundary:
  - The photon state is the fully coherent planar-pair transport channel.
  - The neutrino sits just off that lock: close enough to be neutral, fast, and weakly coupled, but not coherent enough to propagate as a photon train.
  - This "not quite photon" status gives the neutrino a small observer-facing mass channel and a nontrivial oscillation ledger.

- Propagation:
  - Trajectories are almost straight at speeds close to the effective field speed; small deflections occur only through coherent corridor couplings to nearby assemblies.
  - Apparent inertia is dictated by the minuscule residual exposure left by the almost planar pro/anti lock.

- Flavor and oscillation (revealed internal ledger):
  - "Flavor" labels which residual internal-binary energy and phase mode is exposed to the weak channel.
  - Oscillation is the distance-dependent revealing of those internal binaries as the near-planar pro/anti pair precesses through its almost-photon geometry.
  - The beat pattern arises from residual internal phase dynamics and path-history geometry; it is not a stable six-site axial layer flipping among ordinary charged-fermion configurations.

- Chirality (handedness bias):
  - Emission/capture selection rules are chiral: axial phase winding favored in typical sources matches observed handedness of weak processes (alignment with W/Z-like corridor re-couplings).

- Weak interactions as corridor re-coupling:
  - Charged-current processes correspond to brief, localized corridor connections that reassign the weak-coupling ledger and axial architrinos between the participating assemblies (W-like), while neutral-current scattering corresponds to energy/momentum exchange with zero net charge transfer (Z-like). Cross sections are tiny because the neutrino’s exterior field is only a faint residue; compare [Electroweak Bosons: Photons, W/Z, and Higgs](../bosons/electroweak-bosons.md).

Plain language: A neutrino is almost a photon-shaped neutral pair, but not quite. Most of its energy is hidden in the near-planar pro/anti lock. As it travels, tiny differences among its internal binaries become visible to weak interactions in different ways; that changing visible part is what the theory uses for oscillation.

## Conversion and Reaction-Provenance Questions

The near-photon picture raises natural photon/neutrino conversion questions. The current corpus should treat these as closure questions, not as settled claims.

- A free photon is not assumed to dissociate directly into neutrinos. Photon-channel energy can participate in neutrino production only if the full reaction provenance closes: energy, momentum, charge/polarity, spin/angular momentum, and medium participation must all balance.
- A neutrino is not assumed to relock spontaneously into a photon. A photon-channel outcome would require an interaction that relocks the near-planar pro/anti pair into the fully coherent coaxial contra-rotating pro/anti planar-pair mode.
- The useful search target is therefore not simple dissociation, but assisted relocking: which environments, partner assemblies, or weak corridors can move a near-photon neutrino assembly into or out of the photon channel while preserving the ledgers?

This keeps the strong intuition - neutrinos live close to photons in assembly space - without overclaiming an unvalidated free-particle dissociation path.

## PMNS closure program (primary lepton integration)

Use a three-mode internal phase operator with mass-squared-response units:
$$
H_{\mathrm{geo}}=
\begin{pmatrix}
\epsilon_1 & \Omega_{12}e^{-i\phi_{12}} & \Omega_{13}e^{-i\phi_{13}}\\
\Omega_{12}e^{i\phi_{12}} & \epsilon_2 & \Omega_{23}e^{-i\phi_{23}}\\
\Omega_{13}e^{i\phi_{13}} & \Omega_{23}e^{i\phi_{23}} & \epsilon_3
\end{pmatrix},
$$
with $(\epsilon_i,\Omega_{ij},\phi_{ij})$ derived from near-planar pro/anti swarm-pair geometry, residual internal-binary exposure, and Noether-Sea coupling.

Here $H_{\mathrm{geo}}$ is the operator that supplies the relativistic propagation phase, not an ordinary energy Hamiltonian. In natural units, $\epsilon_i$ and $\Omega_{ij}$ carry mass-squared-response units. Diagonalization defines the mixing matrix and the effective mass-squared-response eigenvalues:
$$
H_{\mathrm{geo}}=U_{\mathrm{PMNS}}\Lambda U_{\mathrm{PMNS}}^\dagger,\qquad
\Lambda=\operatorname{diag}(\lambda_1,\lambda_2,\lambda_3),\qquad
|\nu_\alpha\rangle=\sum_i U_{\alpha i}|\nu_i\rangle.
$$
Thus $\lambda_i$ is not an energy eigenvalue; it is the geometric counterpart of a mass-squared propagation response, and $\Delta\lambda_{ij}=\lambda_i-\lambda_j$.

Vacuum oscillation probabilities follow:
$$
P_{\alpha\to\beta}(L,E)=
\delta_{\alpha\beta}
-4\sum_{i<j}\Re\!\left[U_{\alpha i}U_{\beta i}^*U_{\alpha j}^*U_{\beta j}\right]\sin^2\Delta_{ij}
+2\sum_{i<j}\Im\!\left[U_{\alpha i}U_{\beta i}^*U_{\alpha j}^*U_{\beta j}\right]\sin(2\Delta_{ij}),
$$
$$
\Delta_{ij}=\frac{\Delta\lambda_{ij}L}{4E}.
$$

The two-basis distinction is part of the recovery target, not optional notation. Weak reactions create and detect flavor-basis states $|\nu_\alpha\rangle$, while propagation follows the eigenbasis $|\nu_i\rangle$ of $H_{\mathrm{geo}}$. In the two-state limit this reduces to the benchmark form
$$
P_{\nu_e\to\nu_\mu}(L,E)
=
\sin^2(2\theta)\,
\sin^2\!\left(\frac{\Delta\lambda\,L}{4E}\right),
$$
using the same mass-squared-response eigenvalue gap convention as the three-flavor equation above. Any later conversion to ordinary mass language is a comparison-layer unit map; it must not replace the geometric eigenvalue derivation.

Matter correction enters through the Noether-Sea state:
$$
H_{\mathrm{eff}}=H_{\mathrm{geo}}+V_{\mathrm{sea}}(n(\mathbf{x},t)),
\qquad
n(\mathbf{x},t)\equiv\frac{\rho_{\text{NS}}(\mathbf{x},t)}{\rho_{\text{NS},0}}.
$$
The matter term must be normalized to the same mass-squared-response units as $H_{\mathrm{geo}}$ before the $\Delta\lambda L/(4E)$ phase formula is used.

Closure criterion for this chapter: one near-photon geometric phase-operator family must reproduce PMNS angles/phases and the observed $L/E$ pattern without introducing unconstrained flavor-specific ad hoc terms. For the electroweak-angle side of the same lepton sector, see [Weak Mixing Angle](./weak-mixing-angle.md); for validation targets, see [Constraint Ledger](../../validation/constraint-ledger.md).

## Empirical Decision Gates

The neutral-lepton branch should be revised only by observable gates, not by importing a sterile-neutrino or Majorana interpretation as doctrine.

- **Absolute mass gate:** the eigenvalues of $H_{\mathrm{geo}}$ must remain compatible with oscillation splittings, direct kinematic bounds, and cosmological bounds on $\sum_i m_i$. If future data force the lightest neutrino mass close to zero, the near-photon phase operator should explain that as a boundary or shielding limit of the neutral core-pair spectrum rather than as an added parameter.
- **Dirac/Majorana gate:** a confirmed neutrinoless double-beta signal would require a lepton-number-violating reaction provenance channel. A null result instead tightens the allowed Majorana-like coupling or sterile-branch mixing, but does not by itself prove the current Dirac-like geometry.
- **Right-handed or sterile branch gate:** a $\nu_R$-like branch may be added only if the weak-coupling-triad exposure, anomaly bookkeeping, PMNS map, and reaction provenance all remain compatible. Such a branch must be an $SU(2)$ singlet with $Y=0$ in observer-level bookkeeping and must not become a hidden patch for unrelated dark-sector mass.
- **Dark-sector gate:** a neutral-lepton dark-matter interpretation is admissible only if the candidate branch supplies cosmological stability, abundance, and free-streaming behavior while preserving BBN, CMB, and structure-formation constraints.

External benchmark packages can sharpen these gates without becoming $\mathbb{A}\mathbb{A}\mathbb{A}$ predictions. A particularly strict neutral-sector benchmark is
$$
m_{\mathrm{lightest}}\to 0,
\qquad
\sum_i m_i \approx 0.06\,\mathrm{eV},
$$
paired with a suppressed neutrinoless double-beta rate and a sterile or right-handed branch only if the same branch also closes the dark-sector abundance and free-streaming gates. In this chapter those values are discriminator targets: convergence toward them would pressure the near-photon phase operator toward a boundary or shielding limit, while a measured larger mass sum, incompatible neutrinoless double-beta signal, or detected sterile branch with the wrong coupling pattern would force revision of the neutral-lepton geometry.
