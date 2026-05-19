# Weak-Sector Gauge Closure

This detailed priority file supports [Standard Model Closure](standard-model-closure.md). It covers [Weak Mixing Angle](../../../content/markdown/aaa/assemblies/fermions/weak-mixing-angle.md), [Gauge Symmetries](../../../content/markdown/aaa/interactions/gauge-symmetries.md), and [Emergence of U(1)/SU(2)](../../../content/markdown/aaa/interactions/gauge-structure-emergence.md).

## Core Opportunity

The weak-sector opportunity is to combine three currently separated ideas:

- axial-frame misalignment relative to the fixed Noether-core frame;
- weak-coupling-triad exposure and `V-A` selection;
- emergent effective gauge covariance.

The native geometric input is the axial distribution tensor

$$
M_{ij}
=
\sum_{a=1}^{6}
q_a n_i^{(a)}n_j^{(a)}.
$$

Its principal frame $\mathcal{F}_{\text{ax}}$ may rotate relative to the Noether-core frame $\mathcal{F}_{\text{core}}$ by

$$
\mathcal{F}_{\text{ax}}
=
R_{\text{rel}}\,\mathcal{F}_{\text{core}}.
$$

The proposed closure target is not just to list candidate angles. It is to quotient the admissible axial-layer configuration space by color relabeling, pole symmetries, matter/antimatter conjugation, and frame flips, then compute which branches expose the weak-coupling triad.

For sector visibility, this packet consumes the shared [exposure-quotient theorem](../mass-map/exposure-quotient-theorem.md). It owns the weak projection and quotient; the shared packet owns the general rule that weak chirality, CKM/PMNS overlap, and vector-corridor visibility must be sector-visible outputs of one exposure grammar rather than separately tuned rules.

## Preserved Subgates

This packet absorbs two former top-level queue items without discarding them:

| Subgate | Preserved burden | Failure condition |
| --- | --- | --- |
| Weak `V-A` chirality | Test whether the spiral-handedness / axial-exposure story produces charged-current left-channel selection while suppressing right-channel coupling in the validated regime. | `V-A` selection requires a separate rule from the weak-exposure domain. |
| Weak-corridor provenance | Determine whether $W^\pm$ corridors carry pro/anti Noether-core provenance or only charged transaction delta, and close how outgoing lepton / antilepton cores are sourced in weak reactions. | Outgoing weak-reaction cores appear without a source ledger or require a different coupling domain from `V-A`. |
| Flavor overlap compatibility | Keep CKM/PMNS overlap integrals in the same weak-exposure domain as chirality and weak-corridor provenance. | Mixing angles, chirality, and provenance each require independent tuning. |

For weak-reaction event accounting, this packet consumes the shared [residual-routing event-ledger theorem](../tri-binary-causal-closure/residual-routing-event-ledger.md). It owns the weak exposure domain and provenance burden; the shared packet owns the general rule that a charged-current route must close $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ without unbalanced source inventory.

## Weak Exposure Operator

Define a provisional weak-exposure functional

$$
\mathcal{E}_W
=
\mathcal{E}_W(R_{\text{rel}},c,\sigma_{\text{ax}},\Lambda_{\text{core}},\rho_{\text{core}},\chi_{\text{sea}}),
$$

where $c\in\{H,M,L\}$ labels the exceptional-axis sector, $\sigma_{\text{ax}}$ records the axial inventory, and $\Lambda_{\text{core}}$ records the Noether-core branch label. The weak `V-A` gate passes only if $\mathcal{E}_W$ exposes the charged-current coupling domain for left-handed channels while suppressing right-handed charged-current coupling in the validated regime.

## Gauge Compatibility Gate

The effective gauge chapter supplies a formal connection spine. This packet should make that spine compatible with assembly geometry:

| Effective structure | $\mathbb{A}\mathbb{A}\mathbb{A}$ closure burden |
| --- | --- |
| $U(1)$ local phase covariance | Derive the effective phase/connection from causal-wake and Noether-Sea bookkeeping rather than primitive electromagnetic field ontology. |
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

## Promotion Targets

| Target $\mathbb{A}\mathbb{A}\mathbb{A}$ file | Promotion condition |
| --- | --- |
| [weak-mixing-angle](../../../content/markdown/aaa/assemblies/fermions/weak-mixing-angle.md) | The discrete axial-frame branch claim is stated as a quotient/minimization problem, not a loose angle list. |
| [weak-mixing-ckm](../../../content/markdown/aaa/theory-bridges/weak-mixing-ckm.md) | CKM/PMNS overlap uses the same weak-exposure domain as `V-A` and weak-reaction provenance. |
| [gauge-symmetries](../../../content/markdown/aaa/interactions/gauge-symmetries.md) | Gauge covariance records the assembly-level assumptions and failure conditions behind the effective theorem spine. |
| [gauge-structure-emergence](../../../content/markdown/aaa/interactions/gauge-structure-emergence.md) | Emergence prose is normalized so Noether-Sea structure is mechanism, while gauge fields remain effective bookkeeping. |

## Failure Modes

- `V-A`, CKM/PMNS, and weak-reaction provenance each require a different exposure domain.
- Axial-frame misalignment rotates the Noether-core scaffold instead of the axial layer.
- Gauge covariance survives only by ignoring medium-response or preferred-frame corrections.
- The measured weak angle is asserted to equal an internal geometric angle without exposure, dressing, and renormalization gates.
