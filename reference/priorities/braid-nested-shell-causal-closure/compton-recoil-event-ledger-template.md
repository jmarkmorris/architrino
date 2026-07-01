# Compton-Recoil Event-Ledger Template

Status: channel-specific worked event-ledger packet; priority-only; no corpus promotion; no score movement.

Date staged: June 30, 2026.

Source basis: [PDG 2025 Kinematics](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-kinematics.pdf), [PDG 2025 Passage of Particles Through Matter](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-passage-particles-matter.pdf), [PDG 2025 Cross-Section Formulae](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-cross-section-formulae.pdf), [PDG 2025 Particle Detectors and Accelerators](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-particle-detectors-accel.pdf), [NIST XCOM](https://physics.nist.gov/PhysRefData/Xcom/Text/intro.html), [CMS particle-flow reconstruction](https://arxiv.org/abs/1706.04965), [Spencer R. Klein, $e^+e^-$ Pair Production from 10 GeV to 10 ZeV](https://arxiv.org/abs/hep-ex/0402028), and [Matteo Cerruti, Leptonic and Hadronic Radiative Processes in Supermassive-Black-Hole Jets](https://arxiv.org/abs/2012.13302).

## Purpose

This packet is the smallest useful Gate C worked-channel scaffold from the low-complexity particle-reaction mining pass. It specializes the shared [Residual-Routing and Event-Ledger Theorem Packet](residual-routing-event-ledger.md) to one photon-plus-charged-assembly exchange:

$$
\gamma+e^-
\to
\gamma'+e'^-
Y_{\mathrm{med/rem/wake}}.
$$

The observer-level label is Compton-like scattering. The $\mathbb{A}\mathbb{A}\mathbb{A}$ use is narrower: bind one incoming photon ledger, one incoming charged-assembly ledger, one outgoing shifted photon ledger, one recoil row, and any hidden medium, wake, heat, or remnant row to the same $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ event record. The external particle labels remain reconstruction labels and benchmark shorthand. They do not become substrate ontology.

This packet is intentionally lower-level than collider missing-momentum templates. It can be consumed by detector-facing packets after the detector row is declared, but the native event burden here is the local recoil-plus-shifted-photon ledger.

## Source Map

| Source | Mined signal | Template use |
| --- | --- | --- |
| PDG 2025 Kinematics, Sec. 49 | Lorentz-invariant phase space, two-body decay Kallen function, three-body Dalitz variables, invisible-chain endpoints. | Use as the incoming/outgoing phase-space and observer-reconstruction grammar; do not import matrix-element ontology. |
| PDG 2025 Passage of Particles Through Matter, Sec. 34.4 | Photon/electron interaction families, radiation length, bremsstrahlung and pair-production cross sections, Compton contribution to photon attenuation. | Separate Compton-like scattering from bremsstrahlung, pair production, photoelectric capture, Rayleigh scattering, and photonuclear channels. |
| PDG 2025 Cross-Section Formulae, Sec. 51 | Standard scattering variables, annihilation and lepton-scattering comparison formulae, DIS variables $Q^2$, $x$, and $y$. | Treat cross sections as observer-level benchmark residuals after the event ledger closes. |
| PDG 2025 Particle Detectors and Accelerators, Sec. 35.10.1.3 | Particle-flow reconstruction, calorimeter/tracker matching, missing-momentum and confusion uncertainties. | Observer reconstruction rows are detector provenance, not native final products. |
| NIST XCOM | Photon interaction families and attenuation coefficients across photoelectric, Rayleigh, Compton, pair-production, and photonuclear regimes. | Use as a source for material-dependent channel-boundary and cross-section benchmarks. |
| CMS particle-flow reconstruction | Global event description from tracker, calorimeter, muon, and missing-momentum inputs. | Downstream detector packet source; keeps visible outgoing rows and missing rows tied to one reconstruction convention. |
| Klein 2006 pair-production review | High-energy pair-production regimes, target response, and suppression/enhancement mechanisms. | Boundary contrast: pair production has identity-routing burden beyond the Compton-recoil row. |
| Cerruti 2020 radiative-process review | Synchrotron, inverse-Compton, and pair-cascade source modeling. | Boundary contrast: inverse-Compton and synchrotron cascade cases are many-event transport/reconstruction extensions of the local Compton-recoil row. |

## Channel Boundary

The candidate event is local and finite:

$$
\mathsf e_{\gamma e}
=
\left(
X_{\gamma e},
I_{\mathsf e},
Y_{\mathsf e}
\right).
$$

The input state is

$$
X_{\gamma e}
=
\left(
\Gamma_e^-,
\mathcal{H}_{\gamma e},
k^\mu,
p_e^\mu,
\rho_{\text{NS}}(\mathbf{x},t),
\chi_{\text{sea}}(\mathbf{x},t),
Z_{\gamma e}
\right),
$$

where $\Gamma_e^-$ is the incoming charged-assembly state, $\mathcal{H}_{\gamma e}$ is the path-history and causal-wake ledger for the incoming photon and charged assembly, $k^\mu$ and $p_e^\mu$ are observer-level four-momentum comparison variables, and $Z_{\gamma e}$ records channel-local material, detector, or free-electron assumptions.

The selected channel set has the form

$$
I_{\mathsf e}
=
\{B_{\mathrm{scat}},B_{\mathrm{recoil}}\}
\cup
I_{\mathrm{optional}},
$$

where $I_{\mathrm{optional}}\subseteq\{B_{\mathrm{med}},B_{\mathrm{wake}},B_{\mathrm{rem}},B_{\mathrm{heat}}\}$ is present only when the benchmark or environment requires it. The route is Compton-like only while the outgoing photon ledger survives as a shifted photon-channel row. If the outgoing photon row fails, the same incoming state must be rerouted as absorption plus re-emission, pair production, photoelectric release, medium excitation, or another channel.

## Event Rows

The output assignment is

$$
Y_{\mathsf e}
=
\left(
\gamma_{\mathrm{out}},
e_{\mathrm{recoil}},
Y_{\mathrm{med}},
Y_{\mathrm{wake}},
Y_{\mathrm{rem}},
Y_{\mathrm{obs}}
\right).
$$

| Row | Required content | Closure role |
| --- | --- | --- |
| Incoming photon row | Incoming photon ledger, direction, frequency/energy, momentum, Gate A handoff, Gate B transverse handoff, source/path provenance. | Prevents treating the incoming photon as a free scalar energy deposit. |
| Incoming charged-assembly row | Incoming charged assembly state, shielding/exposure state, branch identity, $E$, $\mathbf p$, $\mathbf J$, and path-history state. | Provides the recoil source and identity-preserving target. |
| Interaction window | Finite window $W_{\gamma e}=[t_i,t_f]$, capture/release geometry, active causal-root branch, branch-Jacobian data, and local Noether sea state. | Prevents replacing the local exchange by an instantaneous label swap. |
| Visible outgoing photon row | Shifted photon ledger $\gamma_{\mathrm{out}}$, direction, energy/frequency, momentum, polarization handoff, and photon-channel speed row where applicable. | Carries the Compton shift benchmark and photon provenance. |
| Recoil row | Recoil charged assembly $e_{\mathrm{recoil}}$, $\Delta E_{\mathrm{recoil}}$, $\Delta\mathbf p_{\mathrm{recoil}}$, $\Delta\mathbf J_{\mathrm{recoil}}$, and restabilization state. | Closes local energy, momentum, and angular momentum with the shifted photon. |
| Hidden row | Any unobserved recoil component, unresolved electron binding row, detector threshold loss, or unmeasured soft term. | Must be declared explicitly; hidden rows are not allowed to repair an otherwise failed ledger silently. |
| Medium row | Material response, heat, ionization, plasma/electron-gas update, returned or retained Noether sea content, and uncertainty convention. | Prevents material uptake from becoming an implicit loss. |
| Remnant row | Post-event residual charged assembly, bound excitation, local target remnant, or non-radiative state. | Requires a named post-event state rather than ending at outgoing labels. |
| Observer reconstruction row | Detector or analysis variables: photon energy/direction, electron recoil, material attenuation, cross section, calibration, and resolution. | Keeps benchmark comparison separate from native ontology. |

## Ledger Equation

For $\mathcal Q\in\{E,\mathbf p,\mathbf J\}$, the channel closes only when

$$
\mathcal Q_{\gamma}^{-}
+
\mathcal Q_{e}^{-}
=
\mathcal Q_{\gamma}^{+}
+
\mathcal Q_{e}^{+}
+
\mathcal Q_{\mathrm{med}}^{0}
+
\mathcal Q_{\mathrm{wake}}^{0}
+
\mathcal Q_{\mathrm{rem}}^{0}
$$

on the same event window and branch convention. Equivalently,

$$
\Delta\mathcal Q_{\gamma e}^{0}
=
\mathcal Q_{\gamma}^{-}
+
\mathcal Q_e^{-}
-
\mathcal Q_{\gamma}^{+}
-
\mathcal Q_e^{+}
-
\mathcal Q_{\mathrm{med}}^{0}
-
\mathcal Q_{\mathrm{wake}}^{0}
-
\mathcal Q_{\mathrm{rem}}^{0}
=
0.
$$

The row-indexed event ledger is

$$
\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{\gamma e}(\mathsf e_{\gamma e})
=
\left(
\Delta_E,
\Delta_{\mathbf p},
\Delta_{\mathbf J},
\Delta_{\mathrm{pol}},
\Delta_{\mathrm{arch}},
\Delta_{\mathrm{path}},
\Delta_{\mathrm{med}},
\Delta_{\mathrm{rem}},
\Delta_{\gamma A},
\Delta_{\gamma B}
\right)(\mathsf e_{\gamma e}).
$$

Here $\Delta_{\gamma A}$ and $\Delta_{\gamma B}$ are inherited photon Gate A and Gate B handoff rows. They are not locally proven in this packet. They are included so a shifted photon cannot pass the Compton benchmark while losing the photon-channel branch, transversality, helicity, or path-history provenance.

## Standard-Limit Benchmark

In the free-electron, clean-recoil comparison limit, the observer-level four-momentum balance is

$$
k^\mu+p^\mu
=
{k'}^\mu+{p'}^\mu,
$$

and the Compton-shift benchmark is

$$
\lambda'-\lambda
=
\frac{h}{m_ec}(1-\cos\theta).
$$

Equivalently, in energy form,

$$
E_{\gamma}^{+}
=
\frac{E_{\gamma}^{-}}
{1+\frac{E_{\gamma}^{-}}{m_ec^2}(1-\cos\theta)}.
$$

The low-energy route must recover the Thomson limit. The high-energy route must recover the Klein-Nishina correction in the declared benchmark regime. Material-bound or detector-bound cases must add binding, medium, calibration, and resolution rows rather than shifting the free-electron equation by an unlogged term.

The benchmark residual vector is

$$
\mathbf R_{\gamma e}(\mathsf e)
=
\left(
\frac{\Delta_E}{E_b+\varepsilon},
\frac{\|\Delta_{\mathbf p}\|}{p_b+\varepsilon},
\frac{\|\Delta_{\mathbf J}\|}{J_b+\varepsilon},
\frac{\|\Delta_{\mathrm{med}}\|}{M_b+\varepsilon},
\frac{\|\Delta_{\mathrm{rem}}\|}{R_b+\varepsilon},
R_{\mathrm{shift}},
R_{\mathrm{KN/Th}},
R_{\mathrm{replay}}
\right).
$$

The acceptance target is

$$
\|\mathbf R_{\gamma e}(\mathsf e)\|_{\infty}\le1
$$

after the photon Gate A and Gate B handoffs are supplied by their owning proof packets. $R_{\mathrm{shift}}$ measures the Compton wavelength or energy-shift residual, $R_{\mathrm{KN/Th}}$ measures the selected cross-section limit, and $R_{\mathrm{replay}}$ fails if the same residual definition, channel boundary, and Noether sea variables do not replay across the event panel.

## Worked Channel Instances

The packet stages two comparison instances. They are worked ledger rows, not accepted proof evidence: both remain blocked by the absence of a retained photon Gate A/B carrier and a $\mathbb{A}\mathbb{A}\mathbb{A}$-native transition amplitude. Their role is to make the first low-complexity channel concrete enough that later branch-populated data can fill the same row names without changing the channel boundary.

### Instance F0: Free-Electron Recoil

Use a free target with no material uptake:

$$
Z_{\gamma e}^{F0}
=
\{\mathrm{target}=\mathrm{free},\;Y_{\mathrm{med}}=0,\;Y_{\mathrm{wake}}=0,\;Y_{\mathrm{rem}}=e^-_{\mathrm{same}}\}.
$$

The observer comparison variables are

$$
k^\mu
=
\left(
\frac{E_\gamma^-}{c},
\frac{E_\gamma^-}{c}\hat{\mathbf k}
\right),
\qquad
p^\mu
=
\left(
m_ec,
\mathbf 0
\right),
$$

$$
{k'}^\mu
=
\left(
\frac{E_\gamma^+}{c},
\frac{E_\gamma^+}{c}\hat{\mathbf k}'
\right),
\qquad
{p'}^\mu
=
p^\mu+k^\mu-{k'}^\mu .
$$

The worked output assignment is

$$
Y_{\mathsf e}^{F0}
=
\left(
\gamma_{\mathrm{out}}(E_\gamma^+,\hat{\mathbf k}'),
e_{\mathrm{recoil}}({p'}^\mu),
0,
0,
e^-_{\mathrm{same}},
Y_{\mathrm{obs}}^{F0}
\right),
$$

with

$$
E_{\gamma}^{+}
=
\frac{E_{\gamma}^{-}}
{1+\frac{E_{\gamma}^{-}}{m_ec^2}(1-\cos\theta)}.
$$

The first three ledger rows are therefore staged as

$$
\Delta_E^{F0}
=
E_\gamma^-+m_ec^2-E_\gamma^+-E_e^{+}
=0,
$$

$$
\Delta_{\mathbf p}^{F0}
=
\frac{E_\gamma^-}{c}\hat{\mathbf k}
-
\frac{E_\gamma^+}{c}\hat{\mathbf k}'
-
\mathbf p_e^{+}
=
\mathbf 0,
$$

$$
\Delta_{\mathbf J}^{F0}
=
\mathbf J_\gamma^-
+\mathbf J_e^-
-\mathbf J_\gamma^+
-\mathbf J_e^+
-\mathbf J_{\mathrm{wake}}^{0}
=
\mathbf 0.
$$

In this clean comparison row, $\Delta_{\mathrm{med}}^{F0}=0$, $\Delta_{\mathrm{rem}}^{F0}=0$, and $R_{\mathrm{shift}}^{F0}=0$ by construction. $R_{\mathrm{KN/Th}}^{F0}$ remains a benchmark target rather than a completed derivation: the same event must recover the Thomson limit at low energy and the Klein-Nishina correction in the declared high-energy regime without changing the row names.

### Instance M0: Material-Bound Recoil

Use a target assembly or material cell $A$ with a bound electron, possible ionization, and detector/material uptake:

$$
Z_{\gamma e}^{M0}
=
\{\mathrm{target}=A,\;B_e,\;\mathcal{C}_{\mathrm{cal}},\;\mathcal{U}_{\mathrm{syst}}\}.
$$

The event record is not allowed to apply the free-electron shift and hide the difference. It must write

$$
k^\mu+P_A^\mu
=
{k'}^\mu+{p'}_e^\mu+P_{A^*}^\mu+q_{\mathrm{med}}^\mu+q_{\mathrm{wake}}^\mu,
$$

where $B_e$ and $P_{A^*}^\mu$ name the binding/remnant row, $q_{\mathrm{med}}^\mu$ names material uptake or heat/ionization transport, and $q_{\mathrm{wake}}^\mu$ names any causal-wake update needed by the retained channel record.

The material-bound ledger rows are

$$
\Delta_E^{M0}
=
E_\gamma^-+E_A^-
-E_\gamma^+
-E_{e,\mathrm{recoil}}^+
-E_{A^*}^+
-E_{\mathrm{med}}^{0}
-E_{\mathrm{wake}}^{0}
=0,
$$

$$
\Delta_{\mathbf p}^{M0}
=
\mathbf p_\gamma^-+\mathbf P_A^-
-\mathbf p_\gamma^+
-\mathbf p_{e,\mathrm{recoil}}^+
-\mathbf P_{A^*}^+
-\mathbf p_{\mathrm{med}}^{0}
-\mathbf p_{\mathrm{wake}}^{0}
=\mathbf 0,
$$

$$
\Delta_{\mathbf J}^{M0}
=
\mathbf J_\gamma^-+\mathbf J_A^-
-\mathbf J_\gamma^+
-\mathbf J_{e,\mathrm{recoil}}^+
-\mathbf J_{A^*}^+
-\mathbf J_{\mathrm{med}}^{0}
-\mathbf J_{\mathrm{wake}}^{0}
=\mathbf 0.
$$

The observer row records

$$
Y_{\mathrm{obs}}^{M0}
=
\left(
E_\gamma^+,
\hat{\mathbf k}^{+},
E_{e,\mathrm{recoil}}^+,
\mathbf p_{e,\mathrm{recoil}}^+,
\theta,
\mathcal{C}_{\mathrm{cal}},
\mathcal{U}_{\mathrm{syst}},
\mu_{\mathrm{XCOM}}(E_\gamma,Z_A)
\right),
$$

where $\mu_{\mathrm{XCOM}}(E_\gamma,Z_A)$ is an observer-level material benchmark handle, not a substrate variable. The row passes the staged packet only when the residual difference from the free-electron Compton formula is accounted for by the declared binding, remnant, medium, wake, calibration, and uncertainty rows:

$$
R_{\mathrm{shift}}^{M0}
=
\frac{
\left|
E_{\gamma,\mathrm{obs}}^+
-E_{\gamma,\mathrm{free}}^+(\theta)
-\delta E_{\mathrm{bind/med/rem/wake}}
\right|
}{
\sigma_E+\varepsilon
}
\le1.
$$

If this inequality is made true by changing the channel boundary, changing $\rho_{\text{NS}}(\mathbf{x},t)$ or $\chi_{\text{sea}}(\mathbf{x},t)$ between rows, or leaving $Y_{\mathrm{med}}$ or $Y_{\mathrm{rem}}$ implicit, the instance fails as `compton.medium_unlogged` or `compton.replay_retune`.

## Observer-Level Reconstruction

The observer reconstruction should be recorded as

$$
Y_{\mathrm{obs}}
=
\left(
E_{\gamma}^{+},
\hat{\mathbf k}^{+},
E_{e}^{+},
\mathbf p_{e}^{+},
\theta,
\mathcal{C}_{\mathrm{cal}},
\mathcal{U}_{\mathrm{syst}}
\right),
$$

with $\mathcal{C}_{\mathrm{cal}}$ and $\mathcal{U}_{\mathrm{syst}}$ present when detector data, material attenuation, or inferred recoil is used. A missing or unmeasured recoil component can support a hidden row only after the visible photon row, detector calibration, material/remnant row, and uncertainty row have been declared.

The reconstruction rule is:

$$
Y_{\mathrm{hidden}}
\;\text{is admissible only if}\;
\left(
\gamma_{\mathrm{out}},
e_{\mathrm{recoil}},
Y_{\mathrm{med}},
Y_{\mathrm{rem}},
Y_{\mathrm{obs}}
\right)
\;\text{are declared on the same event or analysis bin.}
$$

## Channel Comparisons

| Neighbor channel | Boundary from Compton-recoil row |
| --- | --- |
| Pair production | Requires outgoing $e^+e^-$ identity routing, threshold recovery, and target or Noether sea reservoir rows; photon energy alone is not an identity source. |
| Pair annihilation | Requires two incoming charged-assembly rows and outgoing photon rows whose Gate A/B handoffs close together with recoil or medium rows. |
| Bremsstrahlung | Requires target-induced deceleration and photon emission; the recoil target and screening/form-factor rows become primary rather than incidental. |
| Synchrotron / inverse-Compton cascade | Requires repeated transport exchange, effective magnetic/radiation-field rows, cooling/cascade timescales, and ensemble reconstruction. |
| Elastic / inelastic lepton scattering | Uses $q^\mu$, $Q^2$, $x$, $y$, $W^2$, recoil, and hadronic remnant rows; photon survival is not the defining output. |
| Beta-family weak reactions | Requires weak-corridor payload, charged lepton, neutral lepton or missing row, CKM/PMNS source lane, and nuclear remnant rows. |
| Two-body / three-body decays | Uses phase-space and endpoint reconstruction; no incoming photon ledger is present unless the decay is radiative. |

## Claim Classification

| Finding | Classification | Handling |
| --- | --- | --- |
| Local radiative/scattering event must close $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ with visible, recoil, medium, wake, and remnant rows named. | ontology | This follows the current event-ledger ontology; it is not new doctrine. |
| Recover Compton shift, Thomson limit, and Klein-Nishina correction from one same-record event. | derivation/closure target | This is the smallest channel-specific Gate C benchmark to stage. |
| Use $k^\mu$, $p^\mu$, $\lambda$, $E_\gamma$, $\theta$, and cross sections as comparison variables. | effective summary | These are observer-level variables and reconstruction handles. |
| Let Noether sea-dependent density, delay, anisotropy, binding, or material effects produce controlled deviations after standard recovery. | speculation | Such deviations are candidate predictions only after benchmark recovery and replay pass. |
| Treat `photon`, `electron`, `Compton`, and detector object labels as substrate ontology. | rejected | External labels remain observer and benchmark labels until native branch and inventory rows are supplied. |

## Failure Modes

| Failure id | Failure condition |
| --- | --- |
| `compton.recoil_missing` | The shifted photon row is matched while the recoil charged-assembly row is absent, unmeasured without uncertainty, or hidden inside a medium term. |
| `compton.medium_unlogged` | Binding, detector loss, material attenuation, heat, or electron-gas response is used to repair the benchmark without a medium row. |
| `compton.photon_handoff_split` | Incoming or outgoing photon rows use different Gate A/B branch conventions from the event ledger. |
| `compton.replay_retune` | The Compton shift, cross-section limit, and detector reconstruction require different Noether sea variables or channel boundaries. |
| `compton.identity_leak` | A pair, absorption, or photoelectric channel is described as Compton scattering after the outgoing photon branch fails. |
| `compton.detector_ontology_import` | Reconstructed photon/electron objects are treated as primitive substrate products rather than observer-level data products. |

## Promotion Boundary

This packet is priority-only. It may support later edits to [Radiation](../../../content/markdown/aaa/reactions/radiation.md), [Reaction Ledger](../../../content/markdown/aaa/validation/reaction-ledger.md), [Reaction-Cosmology Provenance Ledger](../../../content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md), and detector-facing Standard Model closure material after a retained event or simulation supplies populated rows.

The smallest next proof artifact is not a new gate. It is a retained event row with numerical or branch-populated values:

$$
\left(
k^\mu,
p^\mu,
{k'}^\mu,
{p'}^\mu,
Y_{\mathrm{med}},
Y_{\mathrm{rem}},
\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{\gamma e},
\mathbf R_{\gamma e}
\right)
$$

for the staged free-electron comparison event or the staged material-bound comparison event, with the same row names and explicit failure routing.
