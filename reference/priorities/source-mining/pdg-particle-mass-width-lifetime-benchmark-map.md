# PDG Particle Mass, Width, Lifetime, And Scheme Benchmark Map

Status: mined-source packet; priority-only; no corpus promotion.

Date mined: June 30, 2026.

Scope: charged leptons, selected light hadrons, $W/Z/H$, top mass rows, quark mass scheme definitions, widths, lifetimes, and branching-ratio rows. This packet sharpens downstream benchmark rows for mass-map (legacy-braid ref: `braid-mass-response-map/priorities.md`), exposure, shielding, decay-clock, and detector-provenance recovery without using catalog values to choose native geometry.

## Mining Result

The source signal is not a new particle catalog. The useful result is a row-separation rule:

$$
\mathrm{benchmark}
\to
\left(
\mathrm{mass\ convention},
\mathrm{decay\ clock},
\mathrm{channel\ fraction},
\mathrm{detector\ provenance},
\mathrm{uncertainty\ state}
\right).
$$

Observed particle values may enter only after the native branch, exposure, shielding, decay-clock, or detector record has been declared from retained carriers. Any use of observed masses, widths, lifetimes, branching fractions, or Koide agreement to choose the branch geometry, shielding coefficient, exposure quotient, response normalization, or generation labels is `benchmark-contaminated`.

## Primary Source Map

| Source | Mined signal | Mapping use |
| --- | --- | --- |
| PDG 2026, [Leptons summary table](https://pdg.lbl.gov/2026/tables/rpp2026-sum-leptons.pdf) | Charged-lepton rest-mass rows, muon and tau lifetime rows, and representative charged-lepton branching-ratio rows. | Downstream charged-lepton mass-map and decay-clock benchmark rows; Koide remains post-prediction only. |
| PDG 2026, [Gauge and Higgs bosons summary table](https://pdg.lbl.gov/2026/tables/rpp2026-sum-gauge-higgs-bosons.pdf) | $W/Z/H$ mass, width, partial-width, signal-strength, and branching-fraction rows. | Exposure, decay-clock, and detector-provenance recovery rows for electroweak bosons and Higgs channels. |
| PDG 2026, [Quarks summary table](https://pdg.lbl.gov/2026/tables/rpp2026-sum-quarks.pdf) | $u,d,s,c,b$ running-mass conventions and top direct, cross-section, pole-from-cross-section, width, and branching-ratio rows. | Scheme-dependence guardrail; prevents mixing running quark masses, top Monte Carlo mass, and pole extractions in one mass-map row. |
| PDG 2026, [Mesons summary table](https://pdg.lbl.gov/2026/tables/rpp2026-sum-mesons.pdf) | Scoped light-hadron rows for $\pi^\pm$ and $K^\pm$ masses, lifetimes, and principal branching fractions. | Light-hadron stability, decay-clock, and channel-exposure benchmarks after retained hadron carriers exist. |
| PDG 2026, [Baryons summary table](https://pdg.lbl.gov/2026/tables/rpp2026-sum-baryons.pdf) | Scoped proton and neutron mass and lifetime rows. | Light-baryon mass-map and decay-clock pressure without opening the full baryon catalog. |
| PDG 2026, [Quark masses review](https://pdg.lbl.gov/2026/reviews/rpp2026-rev-quark-masses.pdf) | Quark masses are scheme and scale dependent; $u,d,s$ are conventionally quoted in $\overline{\mathrm{MS}}$ at $\mu=2\,\mathrm{GeV}$, while $c,b$ use $\overline{\mathrm{MS}}$ at $\mu=m$. | Running-mass rows require explicit scheme and scale; constituent masses are not Standard Model Lagrangian masses. |
| PDG 2026, [Top quark review](https://pdg.lbl.gov/2026/reviews/rpp2026-rev-top-quark.pdf) | Direct top measurements use kinematic distributions and Monte Carlo generators; the fitted mass is a proxy, not a clean field-theory mass. | Top direct mass is detector-provenance and fit-model material, not a pole-mass row. |
| PDG 2026, [W-boson mass review](https://pdg.lbl.gov/2026/reviews/rpp2026-rev-w-mass.pdf) and LHC-TeV W Working Group [May 2026 update](https://twiki.cern.ch/twiki/pub/LHCPhysics/LHC-TEV-MWWG/update_May2026.pdf) | $W$ mass/width averages, Breit-Wigner convention, and ATLAS/CMS/CDF compatibility context. | $W$ benchmark rows require line-shape convention, detector provenance, and correlation handling. |
| PDG 2026, [Higgs boson review](https://pdg.lbl.gov/2026/reviews/rpp2026-rev-higgs-boson.pdf) | Higgs width constraints depend on on-shell/off-shell assumptions and theory inputs; Standard Model width near $125\,\mathrm{GeV}$ is too narrow for direct line-shape extraction at the LHC. | Higgs width and branching rows are exposure and fit-assumption rows before they are decay-clock benchmarks. |
| ATLAS, [$W$ mass measurement at $13\,\mathrm{TeV}$](https://arxiv.org/abs/2403.15085), and CMS, [first $W$ mass measurement](https://arxiv.org/abs/2412.13872) | Official measurement-paper leads for covariance, recoil model, lepton calibration, and detector-provenance follow-up. | Use for future uncertainty/correlation notes when a $W$ benchmark consumer is ready. |

## Scoped Benchmark Table

| Family | Row type | Source value or convention | Recovery target | Usable now? |
| --- | --- | --- | --- | --- |
| $e$ | pole/rest mass | $m_e=0.51099895069\pm0.00000000016\,\mathrm{MeV}$ | mass-map, shielding | Usable only as downstream charged-lepton mass benchmark after retained branch outputs are fixed. |
| $e$ | lifetime bound | $\tau_e\gt6.6\times10^{28}\,\mathrm{yr}$ at 90% CL | decay-clock, stability limit | Usable as stability/null-decay pressure; not a mass-map input. |
| $\mu$ | pole/rest mass | $m_\mu=105.6583755\pm0.0000023\,\mathrm{MeV}$ | mass-map, shielding | Usable only after charged-lepton branch carrier and shared response record exist. |
| $\mu$ | lifetime | $\tau_\mu=(2.1969811\pm0.0000022)\times10^{-6}\,\mathrm{s}$ | decay-clock | Usable as a decay-clock row after parent, daughter, and channel rows are attached to one carrier. |
| $\mu$ | branching ratio | $\mu^-\to e^-\bar{\nu}_e\nu_\mu$ is the dominant mode, with radiative and rare modes tabulated separately. | exposure, decay-clock | Requires retained decay carrier and channel provenance before scoring. |
| $\tau$ | pole/rest mass | $m_\tau=1776.93\pm0.09\,\mathrm{MeV}$ | mass-map, shielding | Usable only as downstream charged-lepton benchmark; Koide remains post-prediction. |
| $\tau$ | lifetime | $\tau_\tau=(290.3\pm0.5)\times10^{-15}\,\mathrm{s}$ | decay-clock | Requires retained parent and decay-channel carrier. |
| $\pi^\pm$ | rest mass | $m_{\pi^\pm}=139.57039\pm0.00018\,\mathrm{MeV}$ | mass-map, shielding | Usable as light-hadron benchmark after hadron carrier is retained. |
| $\pi^\pm$ | lifetime | $\tau_{\pi^\pm}=(2.6033\pm0.0005)\times10^{-8}\,\mathrm{s}$ | decay-clock | Requires same-record parent, channel, and daughter rows. |
| $\pi^\pm$ | branching ratio | Principal rows include $\pi^+\to\mu^+\nu_\mu$ and $\pi^+\to e^+\nu_e$ plus radiative variants. | exposure, decay-clock | Channel fractions are exposure rows, not geometry selectors. |
| $K^\pm$ | rest mass | $m_{K^\pm}=493.677\pm0.015\,\mathrm{MeV}$ | mass-map, shielding | Usable as selected light-hadron benchmark after retained carrier exists. |
| $K^\pm$ | lifetime | $\tau_{K^\pm}=(1.2380\pm0.0020)\times10^{-8}\,\mathrm{s}$ | decay-clock | Requires same-record decay carrier and channel provenance. |
| $p$ | rest mass | $m_p=938.27208943\pm0.00000029\,\mathrm{MeV}$ | mass-map, shielding | Usable as light-baryon benchmark after retained baryon carrier exists. |
| $p$ | lifetime bound | $\tau_p\gt9\times10^{29}\,\mathrm{yr}$ for invisible mode at 90% CL | decay-clock, null-decay pressure | Usable as stability bound only; decay-mode limits are not mass-map rows. |
| $n$ | rest mass | $m_n=939.5654219\pm0.0000005\,\mathrm{MeV}$ | mass-map, shielding | Usable as light-baryon benchmark after retained carrier exists. |
| $n$ | lifetime | $\tau_n=878.3\pm0.4\,\mathrm{s}$ | decay-clock | Requires beta-decay carrier and neutron-environment convention. |
| $u,d,s$ | running mass | $\overline{\mathrm{MS}}$ masses at $\mu=2\,\mathrm{GeV}$; PDG summary gives $m_u=2.16\pm0.07\,\mathrm{MeV}$, $m_d=4.70\pm0.07\,\mathrm{MeV}$, $m_s=92.9\pm0.7\,\mathrm{MeV}$. | scheme-dependence, mass-map guardrail | Usable now as scheme warning; not comparable to pole/rest rows without a declared running-mass consumer. |
| $c,b$ | running mass | $\overline{\mathrm{MS}}$ at $\mu=m$: $m_c=1.2729\pm0.0045\,\mathrm{GeV}$, $m_b=4.186\pm0.006\,\mathrm{GeV}$. | scheme-dependence, mass-map guardrail | Usable now as scheme warning; not a direct rest-mass benchmark. |
| $t$ | direct reconstruction mass | $m_t=172.60\pm0.27\,\mathrm{GeV}$ from direct measurements. | detector-provenance, fit mass | Requires Monte Carlo, event-selection, reconstruction, and calibration rows before comparison. |
| $t$ | cross-section fit mass | $m_t=162.5^{+2.1}_{-1.5}\,\mathrm{GeV}$ from cross-section measurements. | fit mass, scheme-dependence | Requires declared perturbative scheme and fit inputs. |
| $t$ | pole from cross section | $m_t^{\mathrm{pole}}=172.1\pm0.6\,\mathrm{GeV}$ from cross-section measurements. | pole mass, scheme-dependence | Usable only as field-theory pole extraction, separate from direct reconstruction mass. |
| $t$ | width | $\Gamma_t=1.42^{+0.19}_{-0.15}\,\mathrm{GeV}$ | decay-clock, exposure | Requires retained top-production and decay carrier plus fit assumptions. |
| $t$ | branching ratio | $\Gamma_{Wb}/\Gamma_{Wq}=0.957\pm0.034$ for $q=b,s,d$. | exposure, detector-provenance | Requires same-event $Wq$ reconstruction and flavor-tag provenance. |
| $W$ | Breit-Wigner mass | $m_W=80.3625\pm0.0077\,\mathrm{GeV}$ in the PDG 2026 average. | exposure, detector-provenance | Requires line-shape convention, calibration, recoil, and correlation rows. |
| $W$ | width | $\Gamma_W=2.14\pm0.05\,\mathrm{GeV}$ | decay-clock | Requires width convention and same-carrier decay rows. |
| $W$ | branching ratio | PDG summary separates $\ell^+\nu$, $e^+\nu$, $\mu^+\nu$, $\tau^+\nu$, hadrons, and rare radiative rows. | exposure, detector-provenance | Branching rows usable only with channel definitions and detector provenance. |
| $Z$ | Breit-Wigner mass | $m_Z=91.1879\pm0.0020\,\mathrm{GeV}$; PDG notes the listed value is a Breit-Wigner parameter, not the real part of the complex pole. | scheme-dependence, detector-provenance | Must not be mixed silently with pole-plane conventions. |
| $Z$ | width and partial widths | $\Gamma_Z=2.4955\pm0.0023\,\mathrm{GeV}$, with leptonic, invisible, and hadronic partial-width rows. | decay-clock, exposure | Requires partial-width carrier and invisible-row provenance. |
| $H$ | resonance/fit mass | $m_H=125.13\pm0.11\,\mathrm{GeV}$ | mass-map, detector-provenance | Usable only after Higgs-sector branch, shielding, response, and detector channel ledgers are fixed. |
| $H$ | width | $\Gamma_H=3.0^{+1.5}_{-0.7}\,\mathrm{MeV}$ under equal on-shell/off-shell effective-coupling assumptions. | decay-clock, fit-assumption | Requires explicit on-shell/off-shell assumption row before use. |
| $H$ | branching ratio | PDG summary lists $WW^*$, $ZZ^*$, $\gamma\gamma$, $b\bar b$, $\mu^+\mu^-$, $\tau^+\tau^-$, $Z\gamma$, invisible, and rare rows. | exposure, detector-provenance | Channel fractions are exposure and detector rows, not native geometry inputs. |

## Scheme-Dependence Map

| Scheme or row class | Applies to | Comparison rule |
| --- | --- | --- |
| Pole/rest mass | Charged leptons, selected stable or long-lived hadrons, and pole-extracted top rows. | Compare only against a mass-map output that already declares the relevant rest or pole convention. |
| Running mass | $u,d,s,c,b$ quark rows. | Declare $\overline{\mathrm{MS}}$, scale $\mu$, and any running/evolution convention before comparison. Do not compare directly to charged-lepton or hadron rest-mass rows. |
| Direct reconstruction mass | Top direct measurements. | Treat as a fit-model and detector-provenance row tied to event kinematics and Monte Carlo calibration, not as a clean pole mass. |
| Cross-section fit mass | Top cross-section rows. | Keep separate from direct reconstruction rows; record perturbative order, PDF, $\alpha_s$, and scheme assumptions before using. |
| Breit-Wigner resonance parameter | $W$ and $Z$ listed masses and widths. | Record line-shape convention. For $Z$, preserve the distinction between the PDG listed Breit-Wigner mass and complex-pole conventions. |
| Fit-dependent Higgs width | Higgs width constraints. | Record on-shell/off-shell coupling assumptions and theory input dependence before treating $\Gamma_H$ as a decay-clock target. |
| Width/lifetime | $\Gamma$ and $\tau$ rows. | Use $\tau=\hbar/\Gamma$ only after the state definition, line shape, and channel window are declared; measured lifetimes and fitted widths are not interchangeable by default. |
| Branching ratio | Leptons, light hadrons, $W/Z/H$, and top rows. | Treat as exposure and channel-fraction material. It cannot select native branch geometry. |

## Direct Geometry Layer Use

This packet does not advance a retained geometry by itself. It supplies benchmark rows that fail closed until the upstream carrier exists:

| Recovery target | Required retained carrier before acceptance |
| --- | --- |
| Charged-lepton mass map | Accepted charged-lepton branch family, shared scalar exposure quotient, shielding/exposure coefficients, reversible Noether sea response, and branch-derived mass-facing numerators. |
| Charged-lepton Koide residual | All charged-lepton mass-map rows fixed first; observed charged-lepton masses enter only after the branch-derived residual is frozen. See Charged-Lepton Koide Residual (legacy-braid ref: `braid-mass-response-map/charged-lepton-koide-residual.md`) and [EQ-04A](../equation-mapping/eq-04a-koide-charged-lepton-mass-relation.md). |
| Light-hadron masses | Retained hadron carrier, admitted constituent rows, binding/shielding record, and response convention. |
| Width and lifetime rows | Same parent carrier, decay-channel rows, daughter rows, and finite-window clock convention. The current finite-window blocker remains [EQ-31](../equation-mapping/eq-14-30-31-finite-window-w-source-field-map.md). |
| Branching-ratio rows | Same parent carrier, all declared channel windows, exposure convention, and detector/reconstruction provenance for collider products. |
| $W/Z/H$ collider rows | Production mode, line shape, calibration, recoil/object reconstruction, uncertainty/correlation, and detector-provenance rows. Use [Collider Detector Provenance And Event Reconstruction](collider-detector-provenance-event-reconstruction.md) as the companion boundary. |
| Top mass rows | Explicit separation of direct reconstruction mass, cross-section fit mass, and pole extraction, plus generator, perturbative, detector, flavor-tag, and uncertainty provenance. |
| Quark running masses | Declared renormalization scheme, scale, running convention, and consumer equation. |

## Immediate Reuse

- Use the charged-lepton rows as a downstream benchmark set for mass-map and Koide residual work only after `EQ-04` and `EQ-04A` retained mass-shell carriers exist.
- Use quark rows first as scheme guards: they prevent accidental comparison between running quark masses, constituent-language guesses, and pole/rest rows.
- Use $W/Z/H$ and top rows as detector-provenance and exposure-pressure packets before using them as mass or width benchmarks.
- Use width, lifetime, and branching-ratio rows to discipline the finite-window decay-clock recovery target, but keep them blocked until a parent carrier, channel record, and detector boundary are retained together.

No score movement, canon promotion, or native geometry acceptance follows from this mining pass alone.
