## Neutrinos: Strongly Shielded, Net-Neutral Noether-Core Excitations

Definition (geometric): A neutrino is a Noether Core in a net-neutral configuration (no personality charge), with an exterior field that is a tiny, time-averaged residue. Weak interaction strength follows from superposition inside the core that cancels nearly all external projection; only subtle axial mismatches and phase drifts couple to outside structures.

- Core structure and shielding:
  - Triply nested binaries with $q_{\text{net}} = 0$ (no bound personality architrinos). Rapid, orthogonal internal motion cancels far fields (energy shielding), leaving only a faint axial residue—consistent with early-universe neutrino decoupling and vanishing charge.

- Propagation:
  - Trajectories are almost straight at speeds close to v; small deflections occur only through coherent axial corridor couplings to nearby assemblies. Apparent inertia is dictated by the minuscule residual field (“apparent mass” from shielding).

- Flavor and oscillation (internal phase swapping):
  - “Flavor” labels which internal binary predominantly hosts the residual phase imbalance. Slow exchange of this imbalance among the three binaries yields flavor oscillations over distance without invoking a fundamental rest mass; the beat pattern arises from internal phase dynamics and path-history geometry.

- Chirality (handedness bias):
  - Emission/capture selection rules are chiral: axial phase winding favored in typical sources matches observed handedness of weak processes (alignment with W/Z-like corridor re-couplings).

- Weak interactions as corridor re-coupling:
  - Charged-current processes correspond to brief, localized corridor connections that reassign personality architrinos between assemblies (W-like), while neutral-current scattering corresponds to energy/momentum exchange with zero net charge transfer (Z-like). Cross sections are tiny because the neutrino’s exterior field is only a faint residue.

Plain language: A neutrino is a very quiet, neutral core with almost all of its energy hidden; a tiny axial “whisper” shifts among three inner loops as it flies, making its type oscillate, and it interacts only when that whisper lines up just right with another assembly’s axis.

### PMNS closure program (primary lepton integration)

Use a three-mode internal phase Hamiltonian:
$$
H_{\mathrm{geo}}=
\begin{pmatrix}
\epsilon_1 & \Omega_{12}e^{-i\phi_{12}} & \Omega_{13}e^{-i\phi_{13}}\\
\Omega_{12}e^{i\phi_{12}} & \epsilon_2 & \Omega_{23}e^{-i\phi_{23}}\\
\Omega_{13}e^{i\phi_{13}} & \Omega_{23}e^{i\phi_{23}} & \epsilon_3
\end{pmatrix},
$$
with $(\epsilon_i,\Omega_{ij},\phi_{ij})$ derived from neutral-core geometry and Noether-Sea coupling.

Diagonalization defines the mixing matrix:
$$
H_{\mathrm{geo}}=U_{\mathrm{PMNS}}\Lambda U_{\mathrm{PMNS}}^\dagger,\qquad
|\nu_\alpha\rangle=\sum_i U_{\alpha i}|\nu_i\rangle.
$$

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

Matter correction enters through the medium state:
$$
H_{\mathrm{eff}}=H_{\mathrm{geo}}+V_{\mathrm{sea}}(\rho_{\mathrm{sea}}).
$$

Closure criterion for this chapter: one geometric Hamiltonian family must reproduce PMNS angles/phases and the observed $L/E$ pattern without introducing unconstrained flavor-specific ad hoc terms.
