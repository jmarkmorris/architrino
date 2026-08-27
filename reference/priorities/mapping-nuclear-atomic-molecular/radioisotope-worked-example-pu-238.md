# Radioisotope Worked Example: Pu-238 Alpha Heat Ledger

## Status

- Queue item: `nuclear_radiation_worked_examples`.
- Claim level: priority-only worked provenance packet.
- Promotion assessment: `defer with blocker`.
- Observed data source: [NNDC NuDat decay radiation result for Pu-238 alpha decay](https://www.nndc.bnl.gov/nudat3/decaysearchdirect.jsp?nuc=238PU&unc=nds), accessed 2026-07-02; dataset citation shown there as E. Browne and J. K. Tuli, Nuclear Data Sheets 108, 681 (2007).

This packet records one parent/daughter/product ledger for radioactive-waste and radioisotope-heat discussion. It does not claim that the native $\mathbb{A}\mathbb{A}\mathbb{A}$ alpha-rate derivation is closed. The observed half-life, alpha energies, and photon rows are benchmark targets for the branch record.

## Observer Comparison Row

| Row | Pu-238 assignment |
| --- | --- |
| Isotope inventory | Parent ${}^{238}\mathrm{Pu}$ with $Z=94$, $N=144$; daughter ${}^{234}\mathrm{U}$ with $Z=92$, $N=142$; emitted alpha assembly ${}^{4}\mathrm{He}$ with $Z=2$, $N=2$. |
| Retained metastable nuclear branch | The parent isotope is a retained nuclear assembly basin with an allowed alpha escape route. The instability is the nonzero route rate out of that basin, not ordinary heat, lattice vibration, or a scalar stockpile of $h$ units. |
| Route family | Alpha-channel nuclear branch routing: ${}^{238}\mathrm{Pu}\to{}^{234}\mathrm{U}+\alpha$, with daughter excitation and de-excitation rows when the alpha line does not land directly on the daughter ground state. |
| Observer-level rate target | $t_{1/2}=87.7\,\mathrm y$ and $\lambda_{\alpha}^{\mathrm{obs}}=\ln2/t_{1/2}$. Native closure must recover the same scale from the alpha-like cluster separatrix and attempt-rate record. |
| Q-value target | Ground-state to ground-state comparison row $Q_{\alpha}\simeq5593.20\,\mathrm{keV}$. |
| Emitted products | Dominant alpha rows near $K_\alpha=5499.03\,\mathrm{keV}$ with intensity $70.91\%$ and $K_\alpha=5456.3\,\mathrm{keV}$ with intensity $28.98\%$, plus minor alpha rows. The emitted product is a helium nuclear assembly, not photon-channel radiation. |
| Recoil | The ${}^{234}\mathrm{U}$ daughter takes the opposite momentum. For the dominant alpha row, the recoil kinetic-energy target is approximately $(m_\alpha/M_{\mathrm{U234}})K_\alpha\approx94\,\mathrm{keV}$ before material deposition. |
| Heat / lattice or material deposition | In an RTG-facing PuO$_2$ source, the alpha assembly and daughter recoil stop locally, producing lattice damage, electron-envelope excitation, phonon/heat rows, and material Noether sea response. Heat is downstream thermalization of named event products, not the cause of the nuclear instability. |
| Gamma/photon rows | A small $43.498\,\mathrm{keV}$ gamma row with intensity $0.0392\%$ is present, together with X-ray and conversion-electron rows from daughter de-excitation and atomic relaxation. These rows must remain separate from the alpha and heat rows. |
| Neutrino rows | None for the selected alpha branch. A beta or weak-channel isotope would route neutrino provenance to the weak-sector closure material instead. |
| Noether sea update | The event must record the local $\Delta\theta_{\mathrm{sea}}$, $\rho_{\text{NS}}(\mathbf{x},t)$, and $\chi_{\text{sea}}(\mathbf{x},t)$ response used by the parent basin, alpha route, recoil, daughter de-excitation, material capture, and thermalization rows. |
| Path-history provenance | The replayable record must name the source isotope identity, event window, alpha-like cluster basin history, active causal-root branch, branch Jacobian, daughter branch, local material cell, and causal-wake ledger. |
| Shielded-energy boundary | The energy release belongs to the exposed nuclear assembly ledger: parent binding, daughter binding, alpha separation, Coulomb stress, recoil, daughter excitation, photon/converted-electron rows, heat, and Noether sea update. The surviving nucleons and alpha constituents do not spend their deep shielded internal branch energy in this ordinary alpha decay. |

## Route Object

The focused route object extends the radioactive-waste capsule by making each output row explicit:

$$
\Theta_{\mathrm{Pu238}}
=
\left(
\mathcal{I}_{\mathrm{iso}},
\mathcal{B}_{\mathrm{meta}},
\mathcal{C}_{\alpha},
\lambda_{\alpha},
\mathcal{Y}_{\mathrm{emit}},
\mathcal{R}_{\mathrm{recoil}},
\mathcal{H}_{\mathrm{heat}},
\mathcal{S}_{\gamma},
\mathcal{N}_{\nu},
\Delta\theta_{\mathrm{sea}},
\mathcal{H}_{\mathrm{path}},
\mathcal{L}_{E\mathbf p\mathbf J}
\right).
$$

Here $\mathcal{I}_{\mathrm{iso}}$ is the Pu-238 inventory row, $\mathcal{B}_{\mathrm{meta}}$ is the retained parent branch, $\mathcal{C}_{\alpha}$ is the alpha route family, and $\lambda_{\alpha}$ is the observer-level half-life target. $\mathcal{Y}_{\mathrm{emit}}$ separates the alpha assembly, daughter assembly, gamma/photon rows, conversion-electron or X-ray rows, and absent neutrino row. The remaining entries record recoil, heat/material deposition, Noether sea update, path-history provenance, and the conservation ledger.

## Ledger Scaffold

For each resolved event window, the exposed nuclear assembly energy must be routed as

$$
Q_{\alpha}
=
K_{\alpha}
+K_{\mathrm{U234}}
+E_{\gamma}
+\Delta E_{e,\mathrm{ic}}
+\Delta E_{\mathrm{lat}}
+\Delta E_{\mathrm{sea}}
+\Delta E_{\mathrm{rem}}.
$$

$E_{\gamma}=0$ and $\Delta E_{e,\mathrm{ic}}=0$ for a purely ground-state alpha row. When the daughter route includes a $43.498\,\mathrm{keV}$ de-excitation, the event must choose and record the gamma, internal-conversion, X-ray, Auger, heat, recoil, and remnant terms instead of treating the missing energy as untracked heat.

In the parent rest frame, the corresponding momentum balance is

$$
\mathbf 0
=
\mathbf p_{\alpha}
+\mathbf p_{\mathrm{U234}}
+\mathbf p_{\gamma}
+\Delta\mathbf p_{e,\mathrm{ic}}
+\Delta\mathbf p_{\mathrm{lat}}
+\Delta\mathbf p_{\mathrm{sea}}
+\Delta\mathbf p_{\mathrm{wake}}.
$$

Terms that are absent in a given branch are set to zero rather than silently dropped. Angular momentum and transverse photon rows follow the same rule: a gamma row inherits the radiation event-record burden, while the alpha row remains a reaction-product row.

## Rate Derivation Target

The existing alpha-emission benchmark gives the rate target:

$$
\lambda_{\alpha}^{\mathbb{A}\mathbb{A}\mathbb{A}}
\simeq
\nu_{\mathrm{hit}}^{\mathrm{Pu238}}
P_{\mathrm{esc}}^{\mathrm{Pu238}},
\qquad
t_{1/2}^{\mathrm{obs}}
=
\frac{\ln2}{\lambda_{\alpha}^{\mathrm{obs}}}
\approx
87.7\,\mathrm y.
$$

The native calculation must identify the alpha-like cluster basin inside ${}^{238}\mathrm{Pu}$, the retained separatrix tube, the local Noether sea state, and the branch-history measure that produces $P_{\mathrm{esc}}^{\mathrm{Pu238}}$. A heat row cannot replace this calculation; heat appears after the event products stop in material.

## Shielded-Energy Boundary

This worked example keeps three layers separate:

1. The parent nuclear branch is metastable because a lower-energy daughter-plus-alpha route has nonzero escape rate.
2. The event releases exposed nuclear assembly ledger energy into alpha kinetic energy, daughter recoil, daughter excitation or photon/converted-electron rows, material deposition, and Noether sea update.
3. The surviving protons, neutrons, and alpha constituents retain their deeper shielded internal branch histories. Changing those internal branches would be a different particle-level reaction ledger, not ordinary Pu-238 alpha decay.

Thus radioactive waste is not radioactive because it is hot, vibrating, or storing extra scalar $h$. It is radioactive when its isotope inventory contains retained nuclear branches with allowed product routes and nonzero observer-level rates.

## Current Blocker And Next Action

Current blocker: this packet supplies the worked provenance map and observed benchmark rows, but it does not yet derive or source-bind the native Pu-238 alpha separatrix, $\nu_{\mathrm{hit}}^{\mathrm{Pu238}}$, $P_{\mathrm{esc}}^{\mathrm{Pu238}}$, daughter de-excitation branch selection, or material heat-deposition row from accepted $\mathbb{A}\mathbb{A}\mathbb{A}$ source records.

Next action: build the source-binding row for the Pu-238 branch record: parent basin, alpha-like cluster separatrix, daughter excitation/de-excitation route, local Noether sea state, recoil, material capture, and heat-deposition rows in one retained event record.
