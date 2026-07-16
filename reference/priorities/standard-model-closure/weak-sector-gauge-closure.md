# Weak-Sector Gauge Closure

This detailed priority file supports [Standard Model Closure](priorities.md). It covers [Weak Mixing Angle](../../../content/markdown/aaa/assemblies/fermions/weak-mixing-angle.md), [Gauge Symmetries](../../../content/markdown/aaa/assemblies/gauge-symmetries.md), and [Emergence of U(1)/SU(2)](../../../content/markdown/aaa/assemblies/gauge-structure-emergence.md).

## Core Opportunity

The weak-sector opportunity is to combine three currently separated ideas:

- axial-frame misalignment relative to the fixed Noether braid frame;
- weak-coupling-triad exposure and `V-A` selection;
- emergent effective gauge covariance.

The native geometric input is the axial distribution tensor

$$
M_{ij}
=
\sum_{a=1}^{6}
q_a n_i^{(a)}n_j^{(a)}.
$$

Its principal frame $\mathcal{F}_{\text{ax}}$ may rotate relative to the Noether braid frame $\mathcal{F}_{\text{core}}$ by

$$
\mathcal{F}_{\text{ax}}
=
R_{\text{rel}}\,\mathcal{F}_{\text{core}}.
$$

The proposed closure target is not just to list candidate angles. It is to quotient the admissible axial-layer configuration space by color relabeling, pole symmetries, matter/antimatter conjugation, and frame flips, then compute which branches expose the weak-coupling triad.

For sector visibility, this packet consumes the shared exposure-quotient theorem (legacy-braid ref: `braid-archive/braid-mass-response-map/exposure-quotient-theorem.md`). It owns the weak projection and quotient; the shared packet owns the general rule that weak chirality, CKM/PMNS overlap, and vector-corridor visibility must be sector-visible outputs of one exposure grammar rather than separately tuned rules.

## Preserved Subgates

This packet absorbs two former top-level queue items without discarding them:

| Subgate | Preserved burden | Failure condition |
| --- | --- | --- |
| Weak `V-A` chirality | Test whether the spiral-handedness / axial-exposure story produces charged-current left-channel selection while suppressing right-channel coupling in the validated regime. | `V-A` selection requires a separate rule from the weak-exposure domain. |
| Weak-corridor provenance | Determine whether $W^\pm$ corridors carry pro/anti Noether braid provenance or only charged transaction delta, and close how outgoing lepton / antilepton cores are sourced in weak reactions. | Outgoing weak-reaction cores appear without a source ledger or require a different coupling domain from `V-A`. |
| Flavor overlap compatibility | Keep CKM/PMNS overlap integrals in the same weak-exposure domain as chirality and weak-corridor provenance. | Mixing angles, chirality, and provenance each require independent tuning. |

For weak-reaction event accounting, this packet consumes the shared residual-routing event-ledger theorem (legacy-braid ref: `braid-archive/braid-nested-shell-causal-closure/residual-routing-event-ledger.md`). It owns the weak exposure domain and provenance burden; the shared packet owns the general rule that a charged-current route must close $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ without unbalanced source inventory.

## External Weak-Isospin Error Checkpoint

Source-mining intake 2026-06-28. An external physicist critique in the legacy archive usefully flags weak isospin as an error checkpoint. The electromagnetic and polarity geometry can look promising while still failing if it cannot recover weak-sector covariance, charged-current handedness, and flavor overlap in one exposure domain.

The checkpoint is:

$$
\mathcal E_W
\longrightarrow
\left(
\mathrm{SU(2)}_L,
V\!-\!A,
\mathbf V_{\mathrm{CKM}},
\mathbf U_{\mathrm{PMNS}},
W/Z\ \mathrm{corridor\ provenance}
\right).
$$

Failure is explicit: if $\mathcal E_W$ cannot supply the effective $\mathrm{SU(2)}_L$ channel, left-handed charged-current selection, CKM/PMNS overlap structure, and $W^\pm/Z$ provenance without separately tuned rules, then the Standard Model mapping has not closed even if charge, mass, or color rows appear geometrically plausible.

## Weak Exposure Operator

Define a provisional weak-exposure functional

$$
\mathcal{E}_W
=
\mathcal{E}_W(R_{\text{rel}},c,\sigma_{\text{ax}},\Lambda_{\text{NS}},\rho_{\text{NS}},\chi_{\text{sea}}),
$$

where $c\in\{H,M,L\}$ labels the exceptional-axis sector, $\sigma_{\text{ax}}$ records the axial inventory, and $\Lambda_{\text{NS}}$ records the reduced nested shell braid closure label. The weak `V-A` gate passes only if $\mathcal{E}_W$ exposes the charged-current coupling domain for left-handed channels while suppressing right-handed charged-current coupling in the validated regime.

### Braid-Orientation Handedness Selector

The 2022 weak-force source sharpens the handedness burden by pointing to the ordered orientation of the nested shell braid angular-momentum triad. Treat this as a priority-only selector until the angular-momentum ledger supplies the retained branch. If the branch supplies unit angular-momentum directions for the H, M, and L binaries, define the orientation sign
$$
\chi_{\mathrm{br}}
=
\operatorname{sgn}
\left[
\left(
\hat{\mathbf J}_H
\times
\hat{\mathbf J}_M
\right)
\cdot
\hat{\mathbf J}_L
\right].
$$

The weak-exposure functional should then be tested with both the leading-side site geometry and this braid-orientation sign:
$$
\eta_a^{(h)}
=
E_{\mathrm{lead}}
\left(
\hat{\mathbf n}_a(R_{\text{rel}})\cdot\hat{\mathbf v}
\right)
E_{\mathrm{phase}}^{(h)}
\left(
a;\chi_{\mathrm{br}},\sigma_{\text{ax}},\Lambda_{\text{NS}}
\right).
$$

The selector is useful only if the same $\chi_{\mathrm{br}}$ row also feeds matter/antimatter conjugation, weak `V-A` exposure, CKM/PMNS overlap, and weak-corridor provenance. It fails if handedness is chosen by a separate label after the exposure, overlap, and reaction-provenance rows have already been fit.

## Gauge Compatibility Gate

The effective gauge chapter supplies a formal connection spine. This packet should make that spine compatible with assembly geometry:

| Effective structure | $\mathbb{A}\mathbb{A}\mathbb{A}$ closure burden |
| --- | --- |
| $U(1)$ local phase covariance | Derive the effective phase/connection from causal-wake and Noether sea bookkeeping rather than primitive electromagnetic field ontology. |
| $SU(2)$ weak connection | Show that the exposed weak-coupling triad behaves as a two-state channel with the required local-basis covariance. |
| $SU(3)$ color connection | Preserve the axis-exceptionality algebra already closed in the color chapter. |
| Gauge-breaking bounds | Ensure preferred-frame or medium-response corrections do not introduce leading-order gauge-breaking operators. |

## PDG Weak-Sector Benchmark Vector

The PDG weak-sector rows sharpen the closure burden because they force one weak-exposure domain to carry low-energy current-current behavior, vector-boson masses and widths, neutral-current mixing, CKM overlap, PMNS overlap, and statistical fit conventions at once. The native exposure object must therefore report an observer benchmark vector

$$
\mathcal{B}_{W}^{\mathrm{PDG}}
=
\left(
G_F,
M_W,\Gamma_W,M_Z,\Gamma_Z,
s_W^2,\bar{s}_{\ell}^{\,2},
\mathbf{V}_{\mathrm{CKM}},
\mathbf{U}_{\mathrm{PMNS}},
\Delta_{\mathrm{EWfit}}
\right),
$$

with benchmark values drawn from the current PDG 2025 API rows and the 2024 Review fit tables. The 2024 electroweak review gives $G_F=1.1663788(6)\times10^{-5}\,\mathrm{GeV}^{-2}$, $s_W^2=0.22348\pm0.00010$, $\hat{s}_Z^2=0.23129\pm0.00004$, and $\bar{s}_{\ell}^{\,2}=0.23161\pm0.00004$ for the main fit convention. The current PDG 2025 rows give $M_W=80.3692\pm0.0133\,\mathrm{GeV}$, $\Gamma_W=2.14\pm0.05\,\mathrm{GeV}$, $M_Z=91.1880\pm0.0020\,\mathrm{GeV}$, and $\Gamma_Z=2.4955\pm0.0023\,\mathrm{GeV}$. The 2024 global electroweak fit reports $\chi^2/\mathrm{d.o.f.}=49.5/47$ with probability $37\%$ after excluding the CDF II $W$-mass row from the main fit; including that row is a separate stress test with sharply worse fit quality.

For CKM recovery, the first reduced target is the magnitude matrix from the 2024 CKM review:

$$
\left|V_{\mathrm{CKM}}\right|
=
\begin{pmatrix}
0.97435\pm0.00016 & 0.22501\pm0.00068 & 0.003732^{+0.000090}_{-0.000085}\\
0.22487\pm0.00068 & 0.97349\pm0.00016 & 0.04183^{+0.00079}_{-0.00069}\\
0.00858^{+0.00019}_{-0.00017} & 0.04111^{+0.00077}_{-0.00068} & 0.999118^{+0.000029}_{-0.000034}
\end{pmatrix},
$$

with Wolfenstein parameters

$$
\lambda=0.22501\pm0.00068,\quad
A=0.826^{+0.016}_{-0.015},\quad
\bar{\rho}=0.1591\pm0.0094,\quad
\bar{\eta}=0.3523^{+0.0073}_{-0.0071},
$$

and $J=3.12^{+0.13}_{-0.12}\times10^{-5}$. Direct first-row closure must track

$$
\Delta_{\mathrm{CKM1}}
=
\left(
|V_{ud}|^2+|V_{us}|^2+|V_{ub}|^2
\right)-1
=
-0.0016\pm0.0007,
$$

where the review describes the corresponding tension as $2.3\sigma$. This is a validation residual, not a license to retune the weak-exposure measure.

For PMNS recovery, the current 2025 PDG rows provide the first benchmark vector

$$
\mathbf{p}_{\mathrm{PMNS}}
=
\left(
\sin^2\theta_{12},
\sin^2\theta_{13},
\sin^2\theta_{23}^{\mathrm{NO}},
\sin^2\theta_{23}^{\mathrm{IO}},
\Delta m_{21}^2,
\Delta m_{32,\mathrm{NO}}^2,
\Delta m_{32,\mathrm{IO}}^2,
\delta_{\mathrm{CP}}
\right),
$$

with

$$
\mathbf{p}_{\mathrm{PMNS}}
=
\left(
0.307\pm0.012,\,
0.0216\pm0.0006,\,
0.534^{+0.015}_{-0.019},\,
0.537\pm0.020,\,
(7.50\pm0.19)\times10^{-5}\,\mathrm{eV}^2,\,
(2.451\pm0.026)\times10^{-3}\,\mathrm{eV}^2,\,
(-2.527\pm0.034)\times10^{-3}\,\mathrm{eV}^2,\,
1.21^{+0.19}_{-0.22}\pi
\right).
$$

The neutrino benchmark is a mixing and mass-difference target. Absolute-mass rows remain separate limits: $m_{\nu_e}^{\mathrm{eff}}<0.8\,\mathrm{eV}$ at $90\%$ CL, $m_{\nu_\mu}^{\mathrm{eff}}<0.19\,\mathrm{MeV}$ at $90\%$ CL, and $m_{\nu_\tau}^{\mathrm{eff}}<18.2\,\mathrm{MeV}$ at $95\%$ CL in the current PDG rows.

Use [Weak Flavor Event-Ledger Benchmark Packet](weak-flavor-event-ledger-benchmark-packet.md) as the current scoped source-mining packet for 2026 beta, muon, pion, kaon, CKM, PMNS, LHCb flavor, and missing-transverse-momentum event-ledger rows. It keeps measured charged or hadronic products separate from inferred neutrino, flavor, and invisible rows, and it preserves the same status boundary as this packet: the rows are benchmark pressure only until the retained weak-visible and neutral-lepton carriers exist.

Source-mining intake 2026-06-28 from the December 2020 neutrino notes adds a weak-exposure consistency row. The PMNS map should consume the same exposed fraction that the near-photon neutrino chapter assigns to the weak channel:
$$
\mathcal{R}_{\nu W}
=
\left(
\Pi_W,
H_{\mathrm{geo}},
E_{\nu,\mathrm{exp}},
\mathbf U_{\mathrm{PMNS}},
\mathcal{L}_{E\mathbf p\mathbf J}^{\mathrm{src/det}}
\right).
$$
The row fails if the propagation phase, detector flavor projection, and exposed-energy bookkeeping require different weak-exposure projectors. It also fails if hidden internal energy is used as an unconstrained mass reservoir rather than as part of the retained near-photon branch ledger.

The resolved three-binary form of the same burden is
$$
\mathcal{R}_{\nu W}^{(3B)}
=
\left(
\Theta_{\nu}^{(3B)},
\{\zeta_{\ell W}\}_{\ell=1}^{3},
\Pi_W,
\mathbf U_{\mathrm{PMNS}},
\mathcal{L}_{E\mathbf p\mathbf J}^{\mathrm{src/det}}
\right).
$$
This priority row consumes the near-photon state record in the neutrino chapter. It asks whether the exposed fractions of the three residual internal binaries can supply weak detection flavor, oscillation phase, and source/detector event provenance through one geometry, rather than using PMNS parameters as a detached fit layer.

## CERN Weak, Higgs, and Flavor Event Burdens

The CERN Academic Training / Yellow Report source family sharpens this packet by showing how weak, Higgs, and flavor claims enter as reconstructed event signatures. The weak-sector closure object must therefore expose not only a mass or mixing number, but also the observer channel by which that number is inferred.

The minimal observer weak-signature record is

$$
\mathcal{S}_W^{\mathrm{obs}}
=
\left(
\ell,
\mathbf{p}_T^{\mathrm{miss}},
j_{\mathrm{VBF}},
j_{\mathrm{ISR}},
T_{b/c}(j),
\mathcal{V}_{\mathrm{sec}},
m_{\mathrm{inv}},
m_T,
\mathcal{C}_{\mathrm{fit}}
\right),
$$

where $\ell$ is a reconstructed charged lepton, $\mathbf{p}_T^{\mathrm{miss}}$ is the missing-transverse-momentum vector, $j_{\mathrm{VBF}}$ and $j_{\mathrm{ISR}}$ are vector-boson-fusion and initial-state-radiation jet roles when used, $T_{b/c}(j)$ is heavy-flavor tagging, $\mathcal{V}_{\mathrm{sec}}$ is displaced-vertex information, $m_{\mathrm{inv}}$ and $m_T$ are invariant or transverse masses, and $\mathcal{C}_{\mathrm{fit}}$ is the profile-likelihood, nuisance, or limit convention. These are detector and inference variables; the native burden is to map them back to weak exposure, corridor provenance, overlap measures, and event-ledger closure.

| CERN source signal | Weak-sector burden | Failure condition |
| --- | --- | --- |
| Missing transverse momentum is reconstructed as a negative transverse vector sum over identified objects plus a soft term. | Neutrino and invisible-channel rows must include the object list, soft term, pileup convention, and recoil terms before assigning a weak or dark-sector branch. | $\mathbf{p}_T^{\mathrm{miss}}$ is treated as direct evidence for an unobserved assembly without detector-balance provenance. |
| VBF photon plus missing-transverse-momentum analyses use a photon and forward jets to measure $Z\gamma jj$ and bound invisible or partially invisible Higgs channels. | Higgs and weak neutral-current closure must handle visible recoil, forward-jet topology, missing momentum, and upper limits in one residual. | The weak/scalar map fits a visible channel while leaving invisible limits or recoil topology outside the same exposure grammar. |
| Flavor and CP-violation lectures emphasize CKM structure, hadronic weak decays, neutral-meson mixing, and effective Hamiltonians. | CKM overlap integrals must predict hadronic weak-decay classes and CP phases, not only a static matrix magnitude. | The overlap kernel fits CKM entries without a decay-channel, mixing, or CP-violation provenance row. |
| Heavy-flavor jets are inferred through displaced secondary vertices, impact parameters, hadron mass, and semileptonic signatures. | The flavor branch must survive detector tagging as a calibrated inference from lifetime and vertex geometry. | A heavy quark branch is declared observed without the tag-efficiency and mistag ledger. |
| Neutrino lectures frame oscillation data as mass, mixing, flavor projection, and matter-effect phenomenology. | PMNS recovery must couple source reaction, propagation phase, detector flavor projection, and weak exposure in the same domain. | PMNS rows are imported as fit parameters without source and detector weak-reaction ledgers. |

The first concrete channel template for this table is [VBF Photon Missing-Transverse-Momentum Event Ledger](vbf-photon-missing-transverse-momentum-event-ledger.md). It specializes the weak/scalar observer record to one $\gamma+jj+\mathbf{p}_T^{\mathrm{miss}}$ event shape before interpreting the hidden row as $Z(\nu\nu)$, invisible Higgs decay, or a dark-photon benchmark.

The heavy-flavor tag should be modeled as an observer inference functional

$$
T_{b/c}(j)
=
F_{\mathrm{tag}}
\left(
d_0,
\mathcal{V}_{\mathrm{sec}},
m_{\mathrm{SV}},
L_{\mathrm{decay}},
N_{\mathrm{trk}},
\ell_{\mathrm{semi}},
p_T,
\eta
\right),
$$

with calibration and mistag rates attached. Here $d_0$ is impact-parameter information, $\mathcal{V}_{\mathrm{sec}}$ is the secondary-vertex record, $m_{\mathrm{SV}}$ is secondary-vertex mass, $L_{\mathrm{decay}}$ is decay-length information, $N_{\mathrm{trk}}$ is track multiplicity, and $\ell_{\mathrm{semi}}$ records semileptonic signatures. The native flavor closure target is not $T_{b/c}$ itself. It is a branch-provenance derivation whose observer projection reproduces $T_{b/c}$ and its calibration dependencies.

## Promotion Targets

| Target $\mathbb{A}\mathbb{A}\mathbb{A}$ file | Promotion condition |
| --- | --- |
| [weak-mixing-angle](../../../content/markdown/aaa/assemblies/fermions/weak-mixing-angle.md) | The discrete axial-frame branch claim is stated as a quotient/minimization problem, not a loose angle list. |
| [weak-mixing-ckm](../../../content/markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md) | CKM/PMNS overlap uses the same weak-exposure domain as `V-A` and weak-reaction provenance. |
| [gauge-symmetries](../../../content/markdown/aaa/assemblies/gauge-symmetries.md) | Gauge covariance records the assembly-level assumptions and failure conditions behind the effective theorem spine. |
| [gauge-structure-emergence](../../../content/markdown/aaa/assemblies/gauge-structure-emergence.md) | Emergence prose is normalized so Noether sea structure is mechanism, while gauge fields remain effective bookkeeping. |

## Failure Modes

- `V-A`, CKM/PMNS, and weak-reaction provenance each require a different exposure domain.
- Axial-frame misalignment rotates the Noether braid scaffold instead of the axial layer.
- Gauge covariance survives only by ignoring medium-response or preferred-frame corrections.
- The measured weak angle is asserted to equal an internal geometric angle without exposure, dressing, and renormalization gates.
