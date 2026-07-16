# PDG 2025 Mass Benchmark Surface

Extracted from `braid-mass-response-map/priorities.md` during the braid priority sort (Phase 3, OP-3, 2026-07-08). Priority-only reference surface for the mass map; not a branch-search input. Claim levels unchanged from the source.

The current PDG API / pdgLive 2025 rows define a downstream mass benchmark surface for the first mass map. They are not branch-search inputs. The active release metadata is `edition=2025`, `data_release_timestamp=2025-11-26 19:33:17 PST`, and citation `S. Navas et al. (Particle Data Group), Phys. Rev. D 110, 030001 (2024) and 2025 update`.

The mass-map residual should separate elementary-lepton, hadron, quark-scheme, vector-corridor, and scalar-response rows:

| Benchmark family | Current rows to preserve | Mass-map role |
| --- | --- | --- |
| Charged leptons | $m_e=0.51099895000\pm0.00000000015\,\mathrm{MeV}$, $m_\mu=105.6583755\pm0.0000023\,\mathrm{MeV}$, $m_\tau=1776.93\pm0.09\,\mathrm{MeV}$ | First hierarchy checks after $A_0$, $E_{\text{internal}}$, raw $\zeta(A)$, $\zeta_{\text{probe}}(A)$, the exposed-energy partition, and $\mathcal{M}_{\text{sea}}^{ab}$ are fixed, including the priority-only charged-lepton Koide residual from branch-derived exposed-source numerators. |
| Proton and neutron | $m_p=938.27208816\pm0.00000029\,\mathrm{MeV}$, $m_n=939.5654205\pm0.0000005\,\mathrm{MeV}$, $\tau_n=878.4\pm0.5\,\mathrm{s}$ | Hadronic binding and isospin-splitting checks; neutron lifetime belongs to weak-reaction closure, not rest-mass calibration. |
| Pions and kaons | $m_{\pi^\pm}=139.57039\pm0.00018\,\mathrm{MeV}$, $\tau_{\pi^\pm}=(2.6033\pm0.0005)\times10^{-8}\,\mathrm{s}$; $m_{\pi^0}=134.9768\pm0.0005\,\mathrm{MeV}$, $\tau_{\pi^0}=(8.43\pm0.13)\times10^{-17}\,\mathrm{s}$; $m_{K^\pm}=493.677\pm0.015\,\mathrm{MeV}$, $\tau_{K^\pm}=(1.2380\pm0.0020)\times10^{-8}\,\mathrm{s}$ | Light-meson confinement, chiral/isospin splitting, and weak/electromagnetic decay-channel checks. |
| Quarks | $\overline m_u(2\,\mathrm{GeV})=2.16\pm0.07\,\mathrm{MeV}$, $\overline m_d(2\,\mathrm{GeV})=4.70\pm0.07\,\mathrm{MeV}$, $\overline m_s(2\,\mathrm{GeV})=93.5\pm0.8\,\mathrm{MeV}$, $\overline m_c(\overline m_c)=1.2730\pm0.0046\,\mathrm{GeV}$, $\overline m_b(\overline m_b)=4.183\pm0.007\,\mathrm{GeV}$, $m_t^{\mathrm{direct}}=172.56\pm0.31\,\mathrm{GeV}$ | Scheme-declared quark mass targets for geometry-first flavor checks; these are not direct stable-assembly rest masses. |
| Vector and scalar modes | $M_W=80.3692\pm0.0133\,\mathrm{GeV}$, $\Gamma_W=2.14\pm0.05\,\mathrm{GeV}$; $M_Z=91.1880\pm0.0020\,\mathrm{GeV}$, $\Gamma_Z=2.4955\pm0.0023\,\mathrm{GeV}$; $M_H=125.20\pm0.11\,\mathrm{GeV}$, $\Gamma_H=3.7^{+1.9}_{-1.4}\,\mathrm{MeV}$ | Corridor recoupling and scalar-response tests downstream of exposure/quotient and medium-response extraction. |
| Neutrino absolute-mass limits | $m_{\nu_e}^{\mathrm{eff}}<0.8\,\mathrm{eV}$ at $90\%$ CL, $m_{\nu_\mu}^{\mathrm{eff}}<0.19\,\mathrm{MeV}$ at $90\%$ CL, $m_{\nu_\tau}^{\mathrm{eff}}<18.2\,\mathrm{MeV}$ at $95\%$ CL | Upper-limit constraints on neutral-sector branch families; PMNS mass differences belong to weak-sector overlap closure. |

The benchmark should be evaluated by a declared residual map

$$
\mathcal{R}_{m}^{\mathrm{PDG}}(A,S)
=
\left[
C_{\mathrm{PDG}}^{-1/2}
\left(
\mathbf{y}_{m}^{\mathrm{PDG}}
-
\mathbf{y}_{m}^{\mathrm{map}}(A,S)
\right)
\right]_{\mathrm{declared}},
$$

where $A$ is the accepted assembly branch data and $S$ is the declared Noether sea state. The covariance object $C_{\mathrm{PDG}}$ must retain PDG scale factors, asymmetric uncertainty rows, confidence limits, and review-level correlation statements when they are available. If only a summary-table uncertainty is carried forward, the row must explicitly mark `correlation-unresolved` rather than pretending that every benchmark is independent.

Quark and QCD rows carry an extra convention burden. The 2024 QCD review states that light quark masses are commonly quoted in the $\overline{\mathrm{MS}}$ scheme near $2\,\mathrm{GeV}$, while heavy quark masses are often quoted as $\overline m_q(\overline m_q)$ or as pole/direct masses, and that modern $\alpha_s$ results should be quoted at a reference scale such as $M_Z$ rather than as a standalone $\Lambda_{\mathrm{QCD}}$ value. The mass map must therefore recover a scheme-translation path, not merely a list of scalar masses.
