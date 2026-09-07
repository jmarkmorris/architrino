# Radioisotope Worked Example: Pu-238 Alpha Heat Ledger

## Status

- Queue assessment: `nuclear_radiation_worked_examples` complete at source-bound benchmark-design grade on 2026-09-02.
- Claim level: priority-only source-bound observer event and worked provenance packet.
- Native carrier status: `blocked_missing_native_pu238_alpha_escape_event`.
- Promotion assessment: `defer with blocker`.
- Nuclear data source: [NNDC ENSDF Pu-238 alpha-decay dataset](https://www.nndc.bnl.gov/nudat3/getdecaydataset.jsp?dsid=238pu+a+decay&nucleus=234U), accessed 2026-09-02.
- Heat comparison source: [IAEA, *Safe Handling and Storage of Plutonium*, Safety Reports Series No. 9](https://nucleus.iaea.org/sites/committees/Set%20of%20valid%20safety%20standards%20202409/Safety%20Reports%20Series/P061_scr.pdf), Table IV, accessed 2026-09-02.

This packet records one parent/daughter/product ledger for radioactive-waste and radioisotope-heat discussion. It does not claim that the native $\mathbb{A}\mathbb{A}\mathbb{A}$ alpha-rate derivation is closed. The observed half-life, alpha energies, daughter level, de-excitation split, and heat output are effective benchmark targets for the branch record, not architrino-level premises.

## Observer Comparison Row

| Row | Pu-238 assignment |
| --- | --- |
| Isotope inventory | Parent ${}^{238}\mathrm{Pu}$ with $Z=94$, $N=144$; daughter ${}^{234}\mathrm{U}$ with $Z=92$, $N=142$; emitted alpha assembly ${}^{4}\mathrm{He}$ with $Z=2$, $N=2$. |
| Retained metastable nuclear branch | The parent isotope is a retained nuclear assembly basin with an allowed alpha escape route. The instability is the nonzero route rate out of that basin, not ordinary heat, lattice vibration, or a scalar stockpile of $h$ units. |
| Route family | Alpha-channel nuclear branch routing: ${}^{238}\mathrm{Pu}\to{}^{234}\mathrm{U}+\alpha$, with daughter excitation and de-excitation rows when the alpha line does not land directly on the daughter ground state. |
| Observer-level rate target | $t_{1/2}=87.7\,\mathrm y$ and $\lambda_{\alpha}^{\mathrm{obs}}=\ln2/t_{1/2}$. Native closure must recover the same scale from the alpha-like cluster separatrix and attempt-rate record. |
| Q-value target | The current ENSDF parent row gives $Q_{\alpha}=5593.27(19)\,\mathrm{keV}$ from the 2021 mass adjustment; the evaluator also reports $5593.03(20)\,\mathrm{keV}$ derived from the ground-state alpha line. These are observer-level comparison rows, not native inputs. |
| Emitted products | Dominant alpha rows near $K_\alpha=5499.03\,\mathrm{keV}$ with intensity $70.91\%$ and $K_\alpha=5456.3\,\mathrm{keV}$ with intensity $28.98\%$, plus minor alpha rows. The emitted product is a helium nuclear assembly, not photon-channel radiation. |
| Recoil | The ${}^{234}\mathrm{U}$ daughter takes the opposite momentum. The source-bound effective energy rows below infer $K_{\mathrm{U234}}=94.24(28)\,\mathrm{keV}$ for the ground-state branch and $93.47(36)\,\mathrm{keV}$ for the $43.498\,\mathrm{keV}$ daughter-level branch before material deposition. |
| Heat / lattice or material deposition | The IAEA comparison row gives $560\,\mathrm{W\,kg^{-1}}$ for Pu-238. The source-bound ensemble calculation below recovers $0.567\,\mathrm{W\,g^{-1}}$ using the ENSDF half-life and mean emitted energy. This closes the effective heat-output benchmark, not the microscopic alpha/recoil stopping, lattice, electron-envelope, or local Noether sea partition. |
| Gamma/photon rows | A small $43.498\,\mathrm{keV}$ gamma row with intensity $0.0392\%$ is present, together with X-ray and conversion-electron rows from daughter de-excitation and atomic relaxation. These rows must remain separate from the alpha and heat rows. |
| Neutrino rows | None for the selected alpha branch. A beta or weak-channel isotope would route neutrino provenance to the weak-sector closure material instead. |
| Noether sea update | The event must record the local $\Delta\theta_{\mathrm{sea}}$, $\rho_{\text{NS}}(\mathbf{x},t)$, and $\chi_{\text{sea}}(\mathbf{x},t)$ response used by the parent basin, alpha route, recoil, daughter de-excitation, material capture, and thermalization rows. |
| Path-history provenance | The replayable record must name the source isotope identity, event window, alpha-like cluster basin history, active causal-root branch, branch Jacobian, daughter branch, local material cell, and causal-wake ledger. |
| Shielded-energy boundary | The energy release belongs to the exposed nuclear assembly ledger: parent binding, daughter binding, alpha separation, Coulomb stress, recoil, daughter excitation, photon/converted-electron rows, heat, and Noether sea update. The surviving nucleons and alpha constituents do not spend their deep shielded internal branch energy in this ordinary alpha decay. |

## Source-Bound Same-Event Ledger

The selected source-bound event is the branch that feeds the first excited state of ${}^{234}\mathrm{U}$:

$$
e_{43.498}:
{}^{238}\mathrm{Pu}(0^+)
\longrightarrow
\alpha\!\left(5456.3(3)\,\mathrm{keV}\right)
+{}^{234}\mathrm{U}^{*}\!\left(43.4980(10)\,\mathrm{keV},2^+\right)
\longrightarrow
{}^{234}\mathrm{U}(0^+)+\mathcal D_{43.498}.
$$

Here $\mathcal D_{43.498}$ is the daughter de-excitation outcome. ENSDF assigns the alpha feeding intensity $28.98(10)\%$, daughter-level lifetime $0.252(7)\,\mathrm{ns}$, $E2$ transition energy $43.498(1)\,\mathrm{keV}$, total internal-conversion coefficient $\alpha_T=713(10)$, and gamma intensity $0.0392(8)\%$ per parent alpha decay. The nuclear source record therefore binds the alpha, daughter, gamma, and conversion-electron families to one evaluated branch rather than combining unrelated lines.

Plainly: the 5.456-MeV alpha and the 43.498-keV daughter transition are two stages of the same recorded decay branch. Most daughter transitions eject a conversion electron; only a small fraction leave as the 43.498-keV gamma.

### Effective balance and de-excitation split

Using the mass-adjustment comparison value only as an observer-level balance target gives

$$
K_{\mathrm{U234}}^{(43.498)}
=
5593.27-5456.3-43.498
=
93.472\,\mathrm{keV},
$$

while the ground-state control gives

$$
K_{\mathrm{U234}}^{(0)}
=
5593.27-5499.03
=
94.24\,\mathrm{keV}.
$$

The evaluated conversion coefficient supplies a separate de-excitation-branch check:

$$
b_{\gamma}
=
\frac{1}{1+\alpha_T}
=
1.4006\times10^{-3},
\qquad
b_{\mathrm{ic}}
=
\frac{\alpha_T}{1+\alpha_T}
=
0.998599,
$$

so the alpha feeding row predicts an effective gamma intensity

$$
I_{\gamma}^{\mathrm{pred}}
=
28.98\%\,b_{\gamma}
=
0.04059\%,
$$

consistent at the declared source precision with the evaluated $0.0392(8)\%$ row. This agreement checks the observer-level branch account only; it does not derive the $E2$ carrier, internal conversion, or alpha escape dynamics from $\mathbb{A}\mathbb{A}\mathbb{A}$ primitives.

Plainly: the daughter-level population, gamma rarity, and conversion-electron dominance fit one numerical account. The account tells a native calculation what it must reproduce, but it is not that calculation.

### Effective heat-output closure

ENSDF reports a mean emitted radiation energy of $5588.7\,\mathrm{keV}$ per decay. With $t_{1/2}=87.7\,\mathrm y$, Avogadro's constant, and the effective molar comparison $238\,\mathrm{g\,mol^{-1}}$, the source-bound ensemble target is

$$
P_{\mathrm{th}}^{\mathrm{eff}}
\approx
\frac{\ln 2}{87.7\,\mathrm y}
\frac{N_A}{238\,\mathrm{g\,mol^{-1}}}
\left(5.5887\,\mathrm{MeV}\right)
\left(1.602176634\times10^{-13}\,\mathrm{J\,MeV^{-1}}\right)
=
0.567\,\mathrm{W\,g^{-1}}.
$$

The result is within $1.3\%$ of the IAEA's rounded $0.560\,\mathrm{W\,g^{-1}}$ Pu-238 heat-generation row. This is an inferred effective same-family consistency check. It does not identify the microscopic material cell, stopping history, damage cascade, electron-envelope excitation, lattice partition, or local Noether sea update.

Plainly: the measured lifetime and energy per decay predict the familiar heat density without treating heat as the cause of decay. The missing physics is the detailed route by which each alpha and recoil deposits that energy in the material.

### Row-level assessment

| Row | Status and grade | Falsifier |
| --- | --- | --- |
| Parent, daughter, alpha, and rate identity | Source-bound measured/evaluated observer rows | A current evaluated dataset changes the parent/daughter identity, half-life, alpha energy, feeding intensity, or daughter level beyond the quoted uncertainty. |
| Same-event energy and recoil account | Inferred effective row from one ENSDF branch | The residual $Q_{\alpha}-K_{\alpha}-E_{\mathrm{level}}-K_{\mathrm{recoil}}$ cannot be closed within propagated source uncertainty. |
| Daughter gamma/internal-conversion split | Source-bound evaluated row with an inferred consistency check | $I_{\gamma}^{\mathrm{pred}}=I_{\alpha}/(1+\alpha_T)$ disagrees with the evaluated gamma intensity outside the combined source uncertainty. |
| Beta and neutrino channels | Source-bound absent for this selected alpha event | A weak branch is required inside $e_{43.498}$ rather than in a separately identified isotope event. |
| Ensemble heat output | Source-bound IAEA comparison plus inferred effective calculation | The half-life/mean-energy calculation fails to reproduce the independently tabulated heat generation at the declared $2\%$ rounded-source tolerance. |
| Photon carrier details | Routed to [EQ-29](../../mapping-equations/analysis/eq-29-radiation-source-carrier-source-field-map.md); not advanced here | This packet attempts to accept photon carrier geometry or source-field dynamics from the ENSDF line assignment alone. |
| Native event, material partition, and Noether sea update | `blocked_missing_native_pu238_alpha_escape_event` | One accepted retained event record supplies the rows below and passes their same-record tests. |

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

## First Missing Native Row And Promotion Blocker

The first missing native row is `pu238_alpha_escape_event_0001`. It must bind one retained parent history and local Noether sea state to the alpha-like cluster basin, separatrix tube, active causal-root branch, branch-history measure, $\nu_{\mathrm{hit}}^{\mathrm{Pu238}}$, $P_{\mathrm{esc}}^{\mathrm{Pu238}}$, daughter branch, recoil, de-excitation outcome, material cell, heat-deposition partition, and $\mathcal L_{E\mathbf p\mathbf J}$ account. Its rate output must satisfy

$$
\left|
\frac{
\nu_{\mathrm{hit}}^{\mathrm{Pu238}}
P_{\mathrm{esc}}^{\mathrm{Pu238}}
-\lambda_{\alpha}^{\mathrm{obs}}
}{
\lambda_{\alpha}^{\mathrm{obs}}
}
\right|
\le \epsilon_{\lambda},
$$

with $\epsilon_{\lambda}$ declared before execution, while its ground-state and $43.498\,\mathrm{keV}$ branches close the source-bound energy, recoil, de-excitation, and ensemble-heat rows above without using those observer values as substrate inputs.

Falsifier: reject the native row if no single retained record produces the observed rate scale and both branch accounts under one parent-basin rule, if daughter de-excitation or material heat appears as an untracked residual, if beta or neutrino products are inserted into the selected alpha event, if photon-carrier acceptance is inherited from the gamma line, or if the Noether sea and path-history records are missing. Until that row exists, this packet is complete only as a source-bound benchmark design and is not eligible for corpus promotion.
