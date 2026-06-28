# Standard Model Closure

## Workstream Metadata

- Kind: `priority`
- Rank: `12`
- Value: `16.38`
- Cost: `6.2`
- ROI: `2.64`
- Status: `tolerance-rule-scaffolded`

## Task Queue

1. `quark_mass_predictions` — Extend quark geometry from catalog closure to first-pass mass predictions. Status: `next`. Depends on: none.
2. `overlap_integrals` — Derive CKM and PMNS overlap integrals from geometry. Status: `pending`. Depends on: `quark_mass_predictions`.
3. `confinement_energetics` — Derive confinement-scale behavior from topological or strain energetics. Status: `pending`. Depends on: `overlap_integrals`.
4. `weak_sector_gauge_closure` — Unify weak axial-frame exposure, `V-A`, CKM/PMNS overlap, weak-corridor provenance, and effective gauge covariance into one closure packet. Status: `review`. Depends on: `overlap_integrals`.
5. `scalar_boson_acceptance` — Add the ATLAS Higgs discovery benchmark as a Standard Model closure target: scalar mass $126.0\pm0.4\text{ (stat)}\pm0.4\text{ (sys)}\,\mathrm{GeV}$, signal strength $\hat{\mu}=1.4\pm0.3$, channel-rate compatibility for $ZZ^{(*)}4\ell$, $\gamma\gamma$, and $WW^{(*)}\ell\nu\ell\nu$, and excluded-scalar-window pressure. Status: `pending`. Depends on: `weak_sector_gauge_closure`, mass-map scalar-response handoff.
6. `nuclear_potential_derivation` — Consume the promoted nuclear benchmark ladder and derive or constrain the signs, ranges, and saturation behavior of $V_{\text{excl}}$, $V_{\text{Coul}}$, $V_{\pi/\text{corr}}$, and $V_{\text{sea-pol}}$ from hadronic geometry, meson-like corridors, and Noether sea polarization. Status: `derivation-pending`; benchmark gates already promoted. Depends on: `confinement_energetics`.
7. `hydrogen_fermion_sea_boundary` — Derive the four-fermion hydrogen boundary map that separates exact assembly-ledger membership from dynamic exclusion-envelope and Noether sea coarse-graining boundaries. Status: `tolerance-rule-scaffolded`. Depends on: `confinement_energetics`, `nuclear_potential_derivation`.
8. `supersymmetry_internal_partner_comparison` — Treat supersymmetry-like organization as a comparison framework for internal branch degrees of freedom and null-result pressure, not as a prediction of external low-energy superpartner particles. Status: `pending`. Depends on: gauge-running residuals, LHC null-result bounds, and branch-record algebra.
9. `lattice_qcd_direct_assembly_comparison` — Compare lattice-QCD benchmark observables against a future finite-assembly nucleon simulation without claiming lattice QCD is obsolete before masses, form factors, and scattering rows are recovered. Status: `pending`. Depends on: `confinement_energetics`, `nuclear_potential_derivation`, and simulations `direct_nucleon_assembly_monte_carlo`.
10. `e8_redundancy_heuristic_audit` — Treat $248=256-8$ only as a speculative quotient/redundancy clue for algebra mapping, not as evidence that E8 is native ontology. Status: `pending`. Depends on: accepted branch-state records and gauge-record rows.
11. `quark_vortex_coupling_simulation` — Build a finite-assembly quark-era simulation target that tests whether vortex-like wake coupling can recover confinement behavior, quark stability, and gluon-comparison observables without bypassing the color-singlet ledger. Status: `pending`. Depends on: `confinement_energetics`, `lattice_qcd_direct_assembly_comparison`.

## Scope

This workstream owns the remaining Standard Model-facing closure tasks that are not already carried by [mass-map](../braid-mass-response-map/braid-mass-response-map.md), [angular-momentum-spin](../braid-angular-momentum-spin/braid-angular-momentum-spin.md), or [quantum-closure](../quantum-closure/quantum-closure.md).

The quark catalog and basic $SU(3)\times SU(2)\times U(1)$ bookkeeping are in place. The remaining leverage is mass prediction, explicit overlap-integral flavor mixing, confinement energetics, weak-sector exposure/gauge closure, and nuclear coarse-graining. Weak `V-A` chirality and weak-reaction provenance are preserved as subgates of `weak_sector_gauge_closure`, not as separate top-level queue items.

The hydrogen boundary question is now a staged standard-model-to-atomic bridge. Its value is not another validation gate; it is the first clean local map between four charged fermion assemblies, the proton's color-singlet closure, the electron resonance envelope, and the ambient Noether sea coarse-graining used as local spacetime.

## E8 Redundancy Heuristic Boundary

E8 remains a comparison framework, not a native ontology. The only retained legacy-source signal is the speculative arithmetic clue that a $256$-state branch-pair or sign/velocity inventory might lose eight rows under a reversal, gauge, or branch-record equivalence, leaving a $248$-dimensional comparison surface. That clue is priority-only until a declared $\mathbb{A}\mathbb{A}\mathbb{A}$ branch-state space supplies the $256$ rows, the eight-row quotient, and at least one accepted Standard Model gauge-record recovery.

The first audit object is
$$
\mathcal{Q}_{248/256}
=
\left(
\mathcal{S}_{256},
\mathcal{E}_8,
\pi_{\mathrm{quot}},
\mathcal{G}_{\mathrm{SM}},
\mathcal{R}_{\mathrm{fit}}
\right),
$$
where $\mathcal{S}_{256}$ is the candidate branch-state inventory, $\mathcal{E}_8$ is the eight-row equivalence or redundancy, $\pi_{\mathrm{quot}}$ is the quotient map, $\mathcal{G}_{\mathrm{SM}}$ is the Standard Model gauge-record comparison, and $\mathcal{R}_{\mathrm{fit}}$ reports whether any accepted row is recovered. Failure is the default if the number match does not produce a physical branch record.

## Supersymmetry Comparison Boundary

Supersymmetry is a comparison framework unless a retained $\mathbb{A}\mathbb{A}\mathbb{A}$ branch record supplies the algebra, spectra, and null-result discipline from native variables. The safe legacy-source signal is that some "partner" structure might be internal to a shielded assembly branch rather than a second external particle spectrum. That idea is useful only as a restricted comparison:

$$
\mathcal{R}_{\mathrm{SUSY}\text{-}\mathrm{cmp}}
=
\left(
R_{\mathrm{alg}},
R_{\mathrm{spin/stat}},
R_{\mathrm{mass}},
R_{\mathrm{coupling}},
R_{\mathrm{null}}
\right),
$$

where $R_{\mathrm{alg}}$ asks whether the branch record has a supersymmetry-like organizing algebra, $R_{\mathrm{spin/stat}}$ compares spin/statistics pairing behavior, $R_{\mathrm{mass}}$ and $R_{\mathrm{coupling}}$ compare the missing external spectrum, and $R_{\mathrm{null}}$ carries LHC and other superpartner null bounds. The comparison succeeds only if it explains why supersymmetry-like mathematics can organize sectors while observed low-energy superpartners remain absent. It does not promote superpartners into native ontology.

## Lattice-QCD And Direct Assembly Comparison

Lattice QCD remains a required comparison benchmark for hadronic observables. The native aspiration is a finite-assembly calculation in which a declared nucleon inventory, causal-root ledger, Noether sea embedding, and color-corridor record produce the same observer-level quantities without importing QCD fields as primitives. The comparison target is

$$
\mathcal{R}_{\mathrm{QCD}\text{-}\mathrm{asm}}
=
\left(
R_m,\,
R_{\mathrm{form}},\,
R_{\mathrm{spin}},\,
R_{\mathrm{scatter}},\,
R_{\mathrm{scheme}}
\right),
$$

where the rows compare hadron masses, form factors, spin decomposition, scattering or matrix-element benchmarks, and the lattice scheme/continuum conventions being matched. The claim level is priority-only until a direct finite-assembly simulation recovers accepted hadronic observables with declared negative controls.

### Quark Vortex-Coupling Simulation Target

The quark-era source-mining signal is useful only as a simulation target. A candidate finite-assembly run should retain quark-like nested shell braid records with axial layers, a color-singlet constraint, and vortex-like wake-coupling rows:
$$
\Theta_q
=
\left(
B_q,
A_q,
C_q,
V_{\mathrm{wake}},
\mathcal{L}_{E\mathbf{p}\mathbf{J}},
\mathcal{P}_{\mathrm{singlet}}
\right).
$$
The first comparison should ask whether the retained records produce stable hadron-like bound states, confinement-scale growth with separation, and gluon-comparison transition behavior before importing QCD language as ontology. Failure modes include a stable free-quark branch, color leakage outside a singlet ledger, and a fitted force law that does not arise from the retained wake-coupling rows.

The octet check should be explicit. A candidate color-corridor run should start from the naive $3\times3$ axis-coupling space and show that the symmetric singlet is not an open long-range corridor while the eight traceless directions remain as active reconfiguration modes:
$$
\mathcal{O}_{8/9}
=
\left(
\mathcal{C}_{3\times3},
\Pi_{\mathrm{singlet}},
\Pi_{\mathrm{octet}},
\mathcal{R}_{\mathrm{open}},
\mathcal{R}_{\mathrm{conf}}
\right).
$$
Here $\mathcal{C}_{3\times3}$ is the candidate color-coupling inventory, $\Pi_{\mathrm{singlet}}$ and $\Pi_{\mathrm{octet}}$ are the singlet and octet projections, $\mathcal{R}_{\mathrm{open}}$ rejects an independent ninth open mode, and $\mathcal{R}_{\mathrm{conf}}$ checks that the same corridor record still supports confinement-scale behavior. This is a refinement of the existing quark vortex-coupling target, not a new top-level gate.

## Scalar-Boson Acceptance Target

The Higgs discovery benchmark is a required Standard Model-facing recovery target, not evidence for primitive Higgs ontology in $\mathbb{A}\mathbb{A}\mathbb{A}$. The acceptance target is a shared scalar residual combining ATLAS mass, inclusive signal strength, channel-rate compatibility, and excluded-scalar-window pressure. The benchmark fails if the native scalar mode is fit only by mass, if production and branching channels require independent tuning, or if extra scalar strength survives in search windows where ATLAS reports no accepted resonance.

## CERN Collider-Provenance Benchmark

The Tier 2 CERN Academic Training / CERN Yellow Report source family adds a detector-provenance pressure that mass and width rows do not capture by themselves. The recurring collider pattern is not "a particle appears in the detector." It is an inference chain from incoming beam state, pileup, hard reaction, detector response, reconstruction, calibration, and statistical fit into observer-level quantities. This pressure belongs in the Standard Model closure residual as observer provenance, not as substrate ontology.

Source-mined records for this benchmark include the CERN Academic Training lecture collection, the Academic Training `Particle detectors` lectures, the Academic Training `Standard Model physics at the LHC` record, the CERN Yellow Reports: School Proceedings archive, the 2019 ESHEP `LHC Run-2 and future prospects` lecture, the 2019 ESHEP `Cosmology and dark matter` lecture, the 2023 ESHEP `Flavour physics and CP violation` lecture, the ATLAS jet and missing transverse momentum reconstruction note, the ATLAS Higgs discovery record, and the ATLAS VBF photon plus missing-transverse-momentum invisible-Higgs search.

The first detector-provenance record to attach to a Standard Model benchmark is

$$
\mathcal{D}_{\mathrm{LHC}}
=
\left(
B_{\mathrm{beam}},
\mathcal{P}_{\mathrm{pileup}},
\mathcal{O}_{\mathrm{reco}},
\mathbf{p}_T^{\mathrm{miss}},
\mathcal{V}_{\mathrm{prim/sec}},
\mathcal{C}_{\mathrm{cal}},
\mathcal{U}_{\mathrm{syst}}
\right).
$$

Here $B_{\mathrm{beam}}$ records beam species and $\sqrt{s}$, $\mathcal{P}_{\mathrm{pileup}}$ records additional interactions and primary-vertex assignment, $\mathcal{O}_{\mathrm{reco}}$ is the reconstructed object set, $\mathbf{p}_T^{\mathrm{miss}}$ is the transverse imbalance, $\mathcal{V}_{\mathrm{prim/sec}}$ records primary and displaced secondary vertices, $\mathcal{C}_{\mathrm{cal}}$ records calibrations, and $\mathcal{U}_{\mathrm{syst}}$ records nuisance parameters and systematic uncertainties. This is a provenance object for observer evidence. It is not a replacement for the event ledger $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$.

The reconstructed object set should be treated as

$$
\mathcal{O}_{\mathrm{reco}}
=
\left\{
e,\mu,\gamma,\tau_h,
h^\pm,h^0,
j,
T_{b/c}(j)
\right\},
$$

where $h^\pm$ and $h^0$ are charged and neutral hadron candidates, $j$ denotes a reconstructed jet, and $T_{b/c}(j)$ is a heavy-flavor tag on a jet rather than a directly observed quark. The shared missing-transverse-momentum convention is the closure equation

$$
\mathbf{p}_T^{\mathrm{miss}}
=
-
\left(
\sum_{o\in\mathcal{O}_{\mathrm{hard}}}
\mathbf{p}_{T,o}
+
\mathbf{p}_T^{\mathrm{soft}}
\right),
\qquad
E_T^{\mathrm{miss}}
=
\left\|\mathbf{p}_T^{\mathrm{miss}}\right\|.
$$

The soft term must be tied to the primary event vertex and pileup rejection convention before it is compared to neutrino, invisible-Higgs, dark-sector, or detector-mismeasurement hypotheses. The immediate Standard Model closure use is a detector-aware residual

$$
\mathcal{R}_{\mathrm{SM,det}}(\Theta)
=
\left(
\mathcal{R}_{\mathrm{masses}},
\mathcal{R}_{\mathrm{widths}},
\mathcal{R}_{\mathrm{rates}},
\mathcal{R}_{\mathrm{objects}},
\mathcal{R}_{\mathrm{miss}},
\mathcal{R}_{\mathrm{tags}},
\mathcal{R}_{\mathrm{limits}}
\right),
$$

where $\mathcal{R}_{\mathrm{objects}}$ compares reconstructed lepton, photon, hadron, jet, and vertex channels; $\mathcal{R}_{\mathrm{miss}}$ compares missing-transverse-momentum distributions and their soft-term conventions; $\mathcal{R}_{\mathrm{tags}}$ compares heavy-flavor inference from impact parameters, secondary vertices, decay lengths, and semileptonic signatures; and $\mathcal{R}_{\mathrm{limits}}$ records excluded windows or upper limits such as invisible-Higgs branching bounds.

| CERN source signal | Closure use | Failure condition |
| --- | --- | --- |
| Particle-flow reconstruction combines tracks and calorimeter clusters into charged hadrons, neutral hadrons, electrons, photons, and muons. | The event ledger must distinguish visible reconstructed objects from invisible or unclustered balance terms. | A reaction map treats a reconstructed particle-flow candidate list as the ontic product list. |
| Jets and $E_T^{\mathrm{miss}}$ summarize hadronic final states and transverse imbalance, with pileup and soft-term corrections. | Missing momentum becomes a provenance equation and nuisance-sensitive residual, not a free invisible-sector input. | Neutrino, dark-matter, or invisible-Higgs claims absorb detector imbalance without the object and soft-term ledger. |
| Heavy-flavor tags infer $b$ or $c$ jets from displaced secondary vertices, large impact parameters, hadron mass, and semileptonic decays. | Flavor closure must predict a branch that survives reconstruction and tagging efficiencies. | A quark-flavor claim is treated as directly observed rather than tag-calibrated. |
| Higgs searches combine $\gamma\gamma$, $ZZ^{(*)}4\ell$, $WW^{(*)}\ell\nu\ell\nu$, heavy-fermion channels, and excluded windows. | The scalar-boson acceptance target remains one coupled production, branching, mass, and limit residual. | The scalar mode is fit only by mass or only by one clean channel. |
| VBF photon plus missing-transverse-momentum events use a photon, forward jets, and transverse imbalance to test $Z\gamma$ production and invisible or partially invisible Higgs channels. | Invisible or dark-sector branches must close through visible recoil objects plus $\mathbf{p}_T^{\mathrm{miss}}$. | An invisible channel is asserted without recoil, trigger, forward-jet, and statistical-limit provenance. |

New failure modes:

- `sm.detector_ontology_blend`: reconstructed detector objects are treated as substrate products.
- `sm.missing_momentum_free_sink`: $\mathbf{p}_T^{\mathrm{miss}}$ is used as an unbalanced energy sink rather than a calibrated transverse-balance residual.
- `sm.flavor_tag_direct_observation`: a $b$ or $c$ tag is treated as direct quark observation rather than vertex/track/lifetime inference.
- `sm.scalar_mass_only_fit`: Higgs recovery uses $M_H$ without coupled production, branching, excluded-window, and detector-provenance rows.

## Current PDG Benchmark Contract

The current Particle Data Group source family is a downstream recovery surface, not an input ledger for branch selection. The active benchmark source is the 2025 PDG API / pdgLive release, cited by PDG as S. Navas et al. (Particle Data Group), Phys. Rev. D 110, 030001 (2024) and 2025 update, with data release timestamp `2025-11-26 19:33:17 PST`. The 2024 Review chapters remain the review-level source for uncertainty conventions, QCD running, electroweak-fit interpretation, CKM/PMNS context, and statistics practice.

The Standard Model closure residual should carry at least these observer-facing rows:

| Sector | PDG benchmark row | Closure use | Input prohibition |
| --- | --- | --- | --- |
| Charged leptons | $m_e=0.51099895000\pm0.00000000015\,\mathrm{MeV}$, $m_\mu=105.6583755\pm0.0000023\,\mathrm{MeV}$, $m_\tau=1776.93\pm0.09\,\mathrm{MeV}$; $\tau_\mu=(2.1969811\pm0.0000022)\times10^{-6}\,\mathrm{s}$, $\tau_\tau=(2.903\pm0.005)\times10^{-13}\,\mathrm{s}$ | Mass hierarchy, weak-decay clock, and charged-lepton lifetime checks. | Do not tune $A_0$, shielding, or weak-corridor constants to charged-lepton masses or lifetimes. |
| Light hadrons | $m_p=938.27208816\pm0.00000029\,\mathrm{MeV}$, $m_n=939.5654205\pm0.0000005\,\mathrm{MeV}$, $m_{\pi^\pm}=139.57039\pm0.00018\,\mathrm{MeV}$, $m_{\pi^0}=134.9768\pm0.0005\,\mathrm{MeV}$, $m_{K^\pm}=493.677\pm0.015\,\mathrm{MeV}$ | Hadronic confinement, residual nuclear-force, isospin-splitting, and decay-threshold checks. | Do not use hadron masses to choose quark geometry or confinement energetics before the native branch ledger is fixed. |
| Quarks | $\overline m_u(2\,\mathrm{GeV})=2.16\pm0.07\,\mathrm{MeV}$, $\overline m_d(2\,\mathrm{GeV})=4.70\pm0.07\,\mathrm{MeV}$, $\overline m_s(2\,\mathrm{GeV})=93.5\pm0.8\,\mathrm{MeV}$, $\overline m_c(\overline m_c)=1.2730\pm0.0046\,\mathrm{GeV}$, $\overline m_b(\overline m_b)=4.183\pm0.007\,\mathrm{GeV}$, $m_t^{\mathrm{direct}}=172.56\pm0.31\,\mathrm{GeV}$ | Quark mass-basis geometry, flavor hierarchy, confinement-scale, and top-loop electroweak checks. | Do not treat scheme-dependent quark masses as primitive rest-assembly masses; the scheme and scale are part of the benchmark row. |
| Electroweak bosons and scalar | $M_W=80.3692\pm0.0133\,\mathrm{GeV}$, $\Gamma_W=2.14\pm0.05\,\mathrm{GeV}$, $M_Z=91.1880\pm0.0020\,\mathrm{GeV}$, $\Gamma_Z=2.4955\pm0.0023\,\mathrm{GeV}$, $M_H=125.20\pm0.11\,\mathrm{GeV}$, $\Gamma_H=3.7^{+1.9}_{-1.4}\,\mathrm{MeV}$ | Weak-corridor mass, neutral-current line shape, scalar-response, and branching-width checks. | Do not fit $W/Z/H$ masses independently from the same weak-exposure, recoupling, and scalar-response map. |
| QCD running | $\alpha_s(M_Z^2)=0.1180\pm0.0009$ in the 2024 QCD review world-average discussion; the 2024 electroweak fit gives $\alpha_s(M_Z)=0.1187\pm0.0017$ for the global electroweak fit. | Strong-sector running, confinement energetics, and electroweak fit covariance checks. | Do not use one scalar $\alpha_s$ target without declaring whether it is the QCD world average or the electroweak-fit extraction. |
| Flavor and neutrino | CKM first-row unitarity check $|V_{ud}|^2+|V_{us}|^2+|V_{ub}|^2=0.9984\pm0.0007$ with a reported $2.3\sigma$ tension in the 2024 CKM review; 2025 neutrino rows include $\sin^2\theta_{12}=0.307\pm0.012$, $\sin^2\theta_{13}=0.0216\pm0.0006$, $\delta_{\mathrm{CP}}=1.21^{+0.19}_{-0.22}\pi$, and $\Delta m_{21}^2=(7.50\pm0.19)\times10^{-5}\,\mathrm{eV}^2$ | Unified weak-exposure, CKM/PMNS overlap, CP-phase, and neutrino mass-difference checks. | Do not let overlap-integral kernels see CKM/PMNS entries until the exposure measure, basis states, and normalization have been fixed. |

The compact residual object is

$$
\mathcal{R}_{\mathrm{PDG}}(\Theta)
=
\left(
\frac{\mathbf{m}_{\mathrm{obs}}-\mathbf{m}_{\mathrm{map}}(\Theta)}
{\boldsymbol{\sigma}_{m}},
\frac{\boldsymbol{\Gamma}_{\mathrm{obs}}-\boldsymbol{\Gamma}_{\mathrm{map}}(\Theta)}
{\boldsymbol{\sigma}_{\Gamma}},
\frac{\mathbf{V}_{\mathrm{CKM,obs}}-\mathbf{V}_{\mathrm{CKM,map}}(\Theta)}
{\boldsymbol{\sigma}_{\mathrm{CKM}}},
\frac{\mathbf{U}_{\mathrm{PMNS,obs}}-\mathbf{U}_{\mathrm{PMNS,map}}(\Theta)}
{\boldsymbol{\sigma}_{\mathrm{PMNS}}},
\frac{\alpha_s^{\mathrm{obs}}-\alpha_s^{\mathrm{map}}(\Theta)}
{\sigma_{\alpha_s}}
\right).
$$

Here $\Theta$ denotes already-declared $\mathbb{A}\mathbb{A}\mathbb{A}$ branch, shielding, exposure, and medium-response data. A benchmark row with a PDG scale factor, asymmetric uncertainty, confidence limit, or mixed statistical/systematic uncertainty must carry that convention into the likelihood or residual definition rather than being symmetrized silently. The 2024 statistics review gives the matching convention for fit reporting: likelihood or $\chi^2$ combinations should state nuisance parameters, covariance/correlation structure, limits and confidence levels, and whether a quoted one-standard-deviation interval comes from $\Delta\chi^2=1$ rather than a literal $68.3\%$ probability statement.

The PDG benchmark also needs event-provenance rows before reaction claims are treated as closed. For a benchmark reaction or inferred particle property, attach a provenance packet
$$
\Theta_{\mathrm{PDG,event}}
=
\left(
\mathfrak{L}_{\mathrm{in}},
\mathfrak{L}_{\mathrm{vis,out}},
\mathfrak{L}_{\mathrm{hidden/out}},
\Delta E_{\mathrm{shield/exp}},
\mathcal{R}_{\mathrm{recoil/rem}},
\mathcal{D}_{\mathrm{det}},
\mathcal{U}_{\mathrm{stat/syst}}
\right).
$$
Here the visible outgoing row carries tracks, showers, photons, leptons, hadrons, or reconstructed objects; the hidden/outgoing row carries neutrino, Noether sea, low-apparent-energy, dark-sector, or unresolved medium participation; $\Delta E_{\mathrm{shield/exp}}$ carries shielding and exposure change; $\mathcal{R}_{\mathrm{recoil/rem}}$ carries recoil and remnant balance; and $\mathcal{D}_{\mathrm{det}}$ plus $\mathcal{U}_{\mathrm{stat/syst}}$ preserve detector provenance and uncertainty conventions. A PDG match is therefore not closed by naming products alone.

## Hydrogen Boundary Closure Object

The current scaffold separates three objects that must not be collapsed:

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

$$
S_{\mathrm{sea}}^{\Omega_{\mathrm{H}}}(t)
=
S(t)\big|_{\Omega_{\mathrm{H}}}
\setminus
\mathcal{A}_{\mathrm{H}}(t),
$$

and

$$
\partial\Omega_f(D_X,t)
=
\left\{
\mathbf{x}\in\Sigma_t:
D_{f,X}(\mathbf{x},t)=D_X
\right\}.
$$

Here $\mathcal{A}_{\mathrm{H}}$ is the exact hydrogen matter-assembly ledger, $S_{\mathrm{sea}}^{\Omega_{\mathrm{H}}}$ is the local Noether sea complement, and $\partial\Omega_f(D_X,t)$ is the effective spatial interface extracted from locked-assembly wake dominance in channel $X$. The closure target is to derive $D_{f,X}$ from the same Noether braid geometry and causal-wake ledgers used for mass, confinement, and atomic orbital recovery.

The current kernel scaffold now derives the two wake terms from the Master-Equation causal-root flux. In a declared channel $X$, the locked numerator keeps the simple-root branch weight

$$
w_{j,f}^{\mathrm{lock}}(t_0;t)
\frac{\alpha_{j,X}(\mathbf{x},t;t_0)}
{r_{\mathbf{x}j}^2(t;t_0)\left|J_{\mathbf{x}j}(t;t_0)\right|}
$$

for contributors $j\in\mathcal{I}_f(t)$ that are phase-locked to the fermion ledger, while the ambient denominator uses the same branch weight for $j\in\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,t)$ after excluding the fermion ledger. The first threshold discipline is

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

The weight scaffold now turns those symbols into branch-ledger projectors. For a root-selected branch record

$$
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
=
\left(
j,t_0,\hat{\mathbf{r}}_{\mathbf{x}j},r_{\mathbf{x}j},J_{\mathbf{x}j},q_j,
\mathcal{L}_{j}^{\mathrm{wake}},\Lambda_j
\right)_{(\mathbf{x},t;t_0)},
$$

the locked and ambient weights are constrained by

$$
w_{j,f}^{\mathrm{lock}}
=
\mathbf{1}_{j\in\mathcal{I}_f(t)}
\zeta_f
\!\left(
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
\right),
\qquad
w_j^{\mathrm{sea}}
=
\mathbf{1}_{j\in\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,t)}
\zeta_{\mathrm{sea}}^{(\ell)}
\!\left(
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
\right).
$$

The ambient projector is now constrained by neutral-core equilibrium rather than left as a free denominator weight. For resolved assembly ledgers $\mathfrak A_{\mathrm{res}}(\Omega_\ell,t)$ in the same window,

$$
\chi_{\mathrm{comp}}^{(\ell)}
\!\left(
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
\right)
=
\mathbf{1}_{j\in\mathcal{I}_{\mathrm{sea}}(\Omega_\ell,t)}
\prod_{a'\in\mathfrak A_{\mathrm{res}}(\Omega_\ell,t)}
\left[
1-
\zeta_{a'}
\!\left(
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
\right)
\right],
$$

and the first equilibrium acceptance is

$$
\zeta_{\mathrm{sea}}^{(\ell)}
\!\left(
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
\right)
=
\chi_{\mathrm{comp}}^{(\ell)}
\!\left(
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
\right)
\exp
\!\left[
-
\frac{1}{2}
\left(
\Delta_{\mathrm{cad}}^2
+
\Delta_{\mathrm{bal}}^2
\right)
\right].
$$

Here $\Delta_{\mathrm{cad}}$ compares the branch cadence with the local smoothed neutral-core cadence $\left\langle\nu\right\rangle_{\mathrm{sea},\ell}$, and $\Delta_{\mathrm{bal}}$ measures the residual neutral-pairing and orientation imbalance after resolved assembly ledgers have been removed. Exact assembly-locked branches are rejected by $\chi_{\mathrm{comp}}^{(\ell)}$; neutral Noether sea branches in the same coarse window are retained when they remain outside all resolved matter/corridor ledgers and agree with the ambient equilibrium record.

The channel intensity is the exposure norm

$$
\alpha_{j,X}(\mathbf{x},t;t_0)
=
\kappa
\left\|
Q_X
\!\left[
\Pi_X
\mathcal{B}_{\mathbf{x}j}^{(t_0)}
\right]
\right\|_X.
$$

The projection scaffold now fixes the first retained-entry maps:

$$
\Pi_{\mathrm{clock}}
\mathcal{B}
=
\left(
\delta\theta_{\mathrm{clk}},\delta\omega_{\mathrm{clk}},
\delta\chi_{\mathrm{sea}}^{(\ell)},J,\Lambda,
\mathcal{L}^{\mathrm{wake}}\big|_{\mathrm{phase}}
\right),
$$

$$
\Pi_{\mathrm{corridor}}
\mathcal{B}
=
\left(
\hat{\mathbf{r}},q,
\mathcal{L}^{\mathrm{wake}}\big|_{\mathrm{oriented}},
\mathcal{L}^{\mathrm{corr}},
\mathcal{P}^{\mathrm{prov}},
\Theta^{\mathrm{strain}}
\right),
$$

$$
\Pi_{\mathrm{packing}}
\mathcal{B}
=
\left(
\left\|\mathcal{L}^{\mathrm{wake}}\right\|_{\mathrm{excl}},
\mathcal{S}_{\mathrm{excl}}^{ab},
R_{\parallel},R_{\perp},\lambda,\xi
\right),
$$

and, for a declared test path tangent $\hat{\mathbf{u}}$,

$$
\Pi_{\mathrm{penetration}}
\mathcal{B}
=
\left(
\mathbf{a}_{\mathbf{x}\leftarrow j},
\mathbf{a}_{\mathbf{x}\leftarrow j}\cdot\hat{\mathbf{u}},
\Delta\phi_{\mathrm{disrupt}},
r,J,\Lambda
\right).
$$

The first norm packet makes those projectors computable as dimensionless stability diagnostics:

$$
\left\|\mathcal E_{\mathrm{clock}}\right\|_{\mathrm{clock}}^2
=
\frac{\left(\delta\omega_{\mathrm{clk}}/\omega_0\right)^2}{\epsilon_\omega^2}
+
\frac{\operatorname{dist}_{S^1}^2(\delta\theta_{\mathrm{clk}},0)}{\epsilon_\theta^2}
+
\frac{\left(\delta\chi_{\mathrm{sea}}^{(\ell)}/\chi_{\mathrm{sea}}^{(\ell)}\right)^2}{\epsilon_\chi^2}
+
\frac{\left\|\mathcal L^{\mathrm{wake}}\big|_{\mathrm{phase}}\right\|_{\mathrm{phase}}^2}{\epsilon_{\mathrm{phase}}^2},
$$

$$
\left\|\mathcal E_{\mathrm{corridor}}\right\|_{\mathrm{corridor}}^2
=
\frac{1-\hat{\mathbf r}\cdot\hat{\mathbf c}_X}{\epsilon_{\mathrm{dir}}^2}
+
\frac{\left\|\mathcal L^{\mathrm{wake}}\big|_{\mathrm{oriented}}\right\|_{\mathrm{or}}^2}{\epsilon_{\mathrm{or}}^2}
+
\frac{\left\|\mathcal L^{\mathrm{corr}}\right\|_{\mathrm{corr}}^2}{\epsilon_{\mathrm{corr}}^2}
+
\frac{d_{\mathrm{prov}}^2}{\epsilon_{\mathrm{prov}}^2}
+
\frac{\left\|\Theta^{\mathrm{strain}}\right\|^2}{\epsilon_\Theta^2},
$$

$$
\left\|\mathcal E_{\mathrm{packing}}\right\|_{\mathrm{packing}}^2
=
\frac{\left\|\mathcal L^{\mathrm{wake}}\right\|_{\mathrm{excl}}^2}{\epsilon_{\mathrm{excl}}^2}
+
\frac{\left\|\mathcal S_{\mathrm{excl}}^{ab}\right\|_S^2}{\epsilon_S^2}
+
\frac{\left(\Delta\ln R_{\parallel}\right)^2}{\epsilon_{\parallel}^2}
+
\frac{\left(\Delta\ln R_{\perp}\right)^2}{\epsilon_{\perp}^2}
+
\frac{\left(\Delta\ln\lambda\right)^2}{\epsilon_\lambda^2}
+
\frac{\left(\Delta\ln\xi\right)^2}{\epsilon_\xi^2},
$$

and

$$
\left\|\mathcal E_{\mathrm{penetration}}\right\|_{\mathrm{penetration}}^2
=
\frac{a_{\parallel}^2}{a_{\parallel,\mathrm{tol}}^2}
+
\frac{\left\|\mathbf a_{\perp}\right\|^2}{a_{\perp,\mathrm{tol}}^2}
+
\frac{\operatorname{dist}_{S^1}^2(\Delta\phi_{\mathrm{disrupt}},0)}{\epsilon_{\mathrm{disrupt}}^2}
+
\frac{\left(\Delta\ln r\right)^2}{\epsilon_r^2}
+
\frac{\left(\Delta\ln|J|\right)^2}{\epsilon_J^2}.
$$

The tolerance symbols are chart and benchmark declarations. They may differ by channel because clock bias, corridor coherence, stable packing, and penetration stability are different tests, but they must be fixed before the hydrogen line, boundary, or transport observable is evaluated. The current rule is to pull each retained-entry scale back from a declared readout tolerance:

$$
\epsilon_{\mu,X}^{2}
=
\sup_{\delta y_\mu}
\left\{
\left(\delta y_\mu\right)^2:
\frac{
\left\|
\mathcal O_X[\mathcal B+\delta_\mu\mathcal B]
-
\mathcal O_X[\mathcal B]
\right\|_X
}{
\left\|
\mathcal O_X[\mathcal B]
\right\|_X+\varepsilon_X
}
\le
\Delta_X^{\mathrm{tol}}
\right\}.
$$

For hydrogen, the strict corridor acceptance is the intersection of proton open-color closure, provenance closure, direction coherence, and inclusion of $\mathcal L_{\mathrm{strong}}^{uud}$ inside $\mathcal A_{\mathrm H}(t)$; it is not a minimum over unlike tolerances.

The mismatch metric behind the regularized locked projector is now constrained to compare discrete label compatibility, phase distance, active causal-root ledger distance, provenance distance, and conserved-increment residual:

$$
d_{\Lambda_f}^2
=
d_{\mathrm{disc}}^2
+
\frac{\operatorname{dist}_{S^1}^2}{\epsilon_\phi^2}
+
\frac{d_{\mathrm{root}}^2}{\epsilon_{\mathrm{root}}^2}
+
\frac{d_{\mathrm{prov}}^2}{\epsilon_{\mathrm{prov}}^2}
+
\frac{\left\|\Delta\mathcal{N}\right\|_{\mathrm{cons}}^2}{\epsilon_{\mathrm{cons}}^2}.
$$

The next proof burden is to compute the tolerance scales and retained branch entries from completed confinement, electron resonance, clock-coupling, and Noether sea cadence ledgers rather than assigning channel thresholds by fit. The neutral-equilibrium projector also has to be tested against refinement of $\ell$: changing resolution may change the retained window population, but it must not let an assembly-locked branch re-enter the ambient denominator by relabeling.

Failure modes:

- `hydrogen.ledger_surface_blend`: exact assembly membership is mistaken for a literal hard spatial surface.
- `hydrogen.orbital_body_blend`: the electron resonance envelope is treated as the electron's Noether braid boundary.
- `hydrogen.sea_core_count_blend`: the four matter Noether braids are counted as the local spacetime medium rather than as assemblies embedded in the ambient Noether sea.
- `hydrogen.proton_quark_split`: the three quark assemblies are treated as free Noether braids rather than as a color-singlet proton closure.
- `hydrogen.kernel_split`: the locked numerator and ambient denominator are computed with different wake kernels, windows, or causal-width rules.
- `hydrogen.threshold_fit`: $D_X$ is tuned separately per observable instead of being tied to the declared stability criterion.

## Element-Dependent Response Extension

The hydrogen boundary scaffold generalizes to heavier atoms only if the element name is expanded into state data. The priority object is not `Fe`, `Ne`, or `transition metal` as a label. It is the local assembly record: isotope, nuclear closure ledger, electron-envelope branch, shell stability gap, and any realized bonding, lattice, or magnetic branch.

For an element or isotope window $\Omega_E$, the promoted target is

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
\right),
$$

with response decomposition

$$
\theta_E^{(\ell)}
=
\theta_{\mathrm{bg}}^{(\ell)}
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
\right].
$$

The associated medium-response tensor target is

$$
\mathcal M_{\mathrm{sea},E}^{ab}
=
\mathcal M_0^{ab}
+
\Delta\mathcal M_{\mathrm{nuc}}^{ab}
\!\left(
Z,N,\Sigma_{\mathrm{ax}}^{Z,N}
\right)
+
\Delta\mathcal M_{\mathrm{e}}^{ab}
\!\left(
\mathcal B_e,C_{\mathrm{shell}}
\right)
+
\Delta\mathcal M_{\mathrm{bond}}^{ab}
\!\left(
\mathcal B_{\mathrm{lat}}
\right).
$$

This extension creates benchmark classes without adding a new top-level validation gate:

| Benchmark class | Continuum input to compute | Observer summaries to keep downstream |
| --- | --- | --- |
| Light atoms | $Z,N$, minimal nuclear ledger, low-order electron envelope, weak local $\delta\theta_E^{(\ell)}$ | `light atom`, element symbol, simple $s/p$ label |
| Closed-shell atoms | Large $C_{\mathrm{shell}}$, low external multipole stress, stable electron envelope | `noble gas`, inertness, ionization-energy maximum |
| Transition metals | Nearby anisotropic $d$-envelope branches, multiple corridor-compatible electron states | `transition metal`, oxidation-state family, coordination-rich chemistry |
| Iron-group elements | Isotope-specific nuclear ledger, $3d$ branch structure, and material magnetic/lattice branch when present | `iron group`, metallurgy, abundance, conventional stability narrative |

Failure modes:

- `element.label_boundary_blend`: a periodic-table family name is treated as a Noether sea boundary condition without an explicit assembly record.
- `element.chemistry_source_blend`: oxidation state, electronegativity, or atomic radius is used as an input rather than a recovered observer-level summary.
- `element.lattice_isolated_blend`: lattice, bonding, or magnetic response is assigned to an isolated atom without a realized material branch.

## Detailed Priority Files

| File | Role | Target $\mathbb{A}\mathbb{A}\mathbb{A}$ notes |
| --- | --- | --- |
| [geometry-first-program.md](geometry-first-program.md) | Preserves the geometry-first closure program, promotion gates, and hard failure tests for quark masses, flavor mixing, and confinement; weak chirality/provenance content now routes through the weak-sector packet. | [quarks](../../../content/markdown/aaa/assemblies/fermions/quarks.md), [weak-mixing-ckm](../../../content/markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md), [color-charge-su3](../../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md), [electroweak-bosons](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md) |
| [weak-sector-gauge-closure.md](weak-sector-gauge-closure.md) | Detailed packet for axial-frame misalignment, weak-coupling-triad exposure, `V-A`, CKM/PMNS overlap, weak-corridor provenance, and gauge-covariance compatibility. | [weak-mixing-angle](../../../content/markdown/aaa/assemblies/fermions/weak-mixing-angle.md), [weak-mixing-ckm](../../../content/markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md), [electroweak-bosons](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md), [gauge-symmetries](../../../content/markdown/aaa/assemblies/gauge-symmetries.md), [gauge-structure-emergence](../../../content/markdown/aaa/assemblies/gauge-structure-emergence.md) |
| [atlas-higgs-scalar-benchmark.md](atlas-higgs-scalar-benchmark.md) | Source-mined ATLAS Higgs scalar benchmark for mass, signal strength, channel-rate compatibility, detector-facing event counts, and excluded scalar windows. | [particle-masses](../../../content/markdown/aaa/assemblies/particle-masses.md), [electroweak-bosons](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md) |
| [nuclear-binding-closure.md](nuclear-binding-closure.md) | Detailed packet for the first hadronic-to-nuclear benchmark ladder and effective $V_{NN}$ target. | [nuclear-binding](../../../content/markdown/aaa/nuclear-atomic/nuclear-binding.md), [nucleon-structure](../../../content/markdown/aaa/nuclear-atomic/nucleon-structure.md), [mesons](../../../content/markdown/aaa/assemblies/mesons/mesons.md) |

## Promotion Map

| Task | Detailed file | Primary promotion target | Promotion gate |
| --- | --- | --- | --- |
| `quark_mass_predictions` | [geometry-first-program.md](geometry-first-program.md) | [quarks](../../../content/markdown/aaa/assemblies/fermions/quarks.md) | First-pass mass-basis geometry for `u,d,c,s,t,b`, with mass-map dependencies named explicitly. |
| `overlap_integrals` | [geometry-first-program.md](geometry-first-program.md) | [weak-mixing-ckm](../../../content/markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md) | CKM and PMNS entries stated as geometry-derived overlap integrals rather than fit knobs. |
| `confinement_energetics` | [geometry-first-program.md](geometry-first-program.md) | [color-charge-su3](../../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md) | Confinement-scale behavior derived from topological or strain energetics with a color-singlet bound-state check. |
| `weak_sector_gauge_closure` | [weak-sector-gauge-closure.md](weak-sector-gauge-closure.md) | [weak-mixing-angle](../../../content/markdown/aaa/assemblies/fermions/weak-mixing-angle.md), [weak-mixing-ckm](../../../content/markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md), [electroweak-bosons](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md), [gauge-symmetries](../../../content/markdown/aaa/assemblies/gauge-symmetries.md), and [gauge-structure-emergence](../../../content/markdown/aaa/assemblies/gauge-structure-emergence.md) | One weak-exposure domain supports `V-A`, CKM/PMNS overlap, weak-reaction provenance, and effective gauge covariance without leading-order preferred-frame leakage. |
| `scalar_boson_acceptance` | [atlas-higgs-scalar-benchmark.md](atlas-higgs-scalar-benchmark.md) and [mass-map](../braid-mass-response-map/braid-mass-response-map.md) | [particle-masses](../../../content/markdown/aaa/assemblies/particle-masses.md) and [electroweak-bosons](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md) | The ATLAS Higgs scalar benchmark is recovered as one mass, coupling, production, branching, and excluded-window residual rather than as a mass-only fit. |
| `nuclear_potential_derivation` | [nuclear-binding-closure.md](nuclear-binding-closure.md) | [nuclear-binding](../../../content/markdown/aaa/nuclear-atomic/nuclear-binding.md), [nucleon-structure](../../../content/markdown/aaa/nuclear-atomic/nucleon-structure.md), and [mesons](../../../content/markdown/aaa/assemblies/mesons/mesons.md) | The promoted benchmark gates gain a derived or constrained $V_{NN}$ whose signs, ranges, saturation behavior, and residual-channel provenance bind $p+n$, avoid an unphysical $p+p$ bound state, explain alpha-like enhancement, and keep beta stability in one ledger. |
| `hydrogen_fermion_sea_boundary` | This file | [atomic-structure](../../../content/markdown/aaa/nuclear-atomic/atomic-structure.md) and [nested-shell-braid-geometry](../../../content/markdown/aaa/noether-braid/nested-shell-braid-geometry.md) | The hydrogen atom is used to derive the distinction between exact fermion assembly membership, dynamic exclusion envelope, electron resonance envelope, and ambient Noether sea coarse-graining. |

## Related Priorities

- [mass-map](../braid-mass-response-map/braid-mass-response-map.md)
- [3x3](../deferred/3x3/3x3.md)
- [master-equation-closure](../master-equation-closure/master-equation-closure.md)
- [validation-gates](../validation-gates/validation-gates.md)

## Related $\mathbb{A}\mathbb{A}\mathbb{A}$ Notes

- [quarks](../../../content/markdown/aaa/assemblies/fermions/quarks.md)
- [quantum-number-mapping](../../../content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md)
- [color-charge-su3](../../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md)
- [weak-mixing-angle](../../../content/markdown/aaa/assemblies/fermions/weak-mixing-angle.md)
- [weak-mixing-ckm](../../../content/markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md)
- [electroweak-bosons](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md)
- [gauge-symmetries](../../../content/markdown/aaa/assemblies/gauge-symmetries.md)
- [gauge-structure-emergence](../../../content/markdown/aaa/assemblies/gauge-structure-emergence.md)
- [nuclear-binding](../../../content/markdown/aaa/nuclear-atomic/nuclear-binding.md)
- [nucleon-structure](../../../content/markdown/aaa/nuclear-atomic/nucleon-structure.md)
- [atomic-structure](../../../content/markdown/aaa/nuclear-atomic/atomic-structure.md)
- [mesons](../../../content/markdown/aaa/assemblies/mesons/mesons.md)
