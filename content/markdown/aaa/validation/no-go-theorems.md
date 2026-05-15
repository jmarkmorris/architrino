# No-Go Theorems

This chapter classifies the formal obstruction results that act as validation filters for $\mathbb{A}\mathbb{A}\mathbb{A}$. A no-go theorem is not useful here as a decorative citation. It is useful only when its assumptions, conclusion, and replacement burden can be recorded against a candidate closure.

The operational companion is [Failure Criteria](./failure-criteria.md). That page defines the shared closure intersection. This page defines how a theorem enters one sector gate: directly as a rejection condition, as an assumption mismatch, as a replacement constraint, or as an irrelevant comparison.

## Applicability Record

For a no-go family $G$, let $\mathcal{A}_G$ be its assumption set and let

$$
\sigma_{\theta,G}:\mathcal{A}_G\to
\{
\mathrm{accepted},
\mathrm{rejected},
\mathrm{replaced},
\mathrm{effective},
\mathrm{absent}
\}
$$

record the $\mathbb{A}\mathbb{A}\mathbb{A}$ stance toward each assumption in the candidate record $\theta$. The applicability class is

$$
\operatorname{app}(G,\theta)
\in
\{
\mathrm{direct},
\mathrm{assumption\ mismatch},
\mathrm{replacement\ constraint},
\mathrm{irrelevant\ comparison}
\}.
$$

The class is `direct` when the theorem's assumptions are accepted or effective in the tested regime and its conclusion applies as a rejection condition. The class is `assumption mismatch` when a required assumption is rejected or absent and the theorem does not by itself supply a validated replacement burden. The class is `replacement constraint` when an assumption is rejected or replaced but the theorem protects a validated behavior that the candidate record must recover by $\mathbb{A}\mathbb{A}\mathbb{A}$ objects. The class is `irrelevant comparison` when $G$ shares no benchmark variable, conservation condition, or effective limit with the local claim under test.

## Applicability Map

| No-go family | Applicability class | Assumption status | Replacement constraint or falsifier |
| --- | --- | --- | --- |
| Bell/CHSH/Tsirelson | `replacement constraint` | Bell local-causality or Markov screening assumptions are not substrate assumptions when $\mathcal{H}$ and detector response are retained; no-signaling and validated correlation bounds remain benchmark constraints. | Derive pair provenance, detector kernels, Born weights, no-signaling, and Tsirelson-compatible correlations from $\mathcal{T}_{\Delta t}$, $\{B_i\}$, and $\mu_*$. Record reconstruction is not sufficient unless the induced joint record measure also passes the Bell, no-signaling, and measurement-independence residual gates. Failure occurs if the model reduces to the classical-axis linear-correlation mode, uses controllable superluminal transfer, or treats final records as an explanation without deriving their tested joint distribution. |
| Lorentz invariance and preferred-frame tests | `direct` | Observer-level clock, ruler, two-way signal, PPN, and spectral bounds apply directly to any candidate effective metric or transport map. | Bound $\epsilon_{\mathrm{LV}}$, $\Delta_{\mathrm{tw}}(\beta)$, PPN parameters, spectra, and gravitational-wave-speed differences within recorded limits. Failure occurs when absolute motion is detectable above the accepted thresholds. |
| Spin-statistics / exchange | `replacement constraint` | Local Lorentz-QFT axioms are not fundamental substrate assumptions, but matter stability and exchange classes are validated effective constraints. | Derive the ordered-frame lift, $4\pi$ spinor behavior, and bosonic/fermionic exchange classes from Noether-core topology and angular-momentum ledger. Failure occurs if the lift cannot separate fermionic and bosonic closure classes. |
| Coleman-Mandula / gauge unification constraints | `assumption mismatch` with replacement constraint when effective scattering is claimed | Exact Lorentz-invariant analytic S-matrix assumptions are not substrate assumptions for delayed absolute-time dynamics. Effective gauge-sector factorization remains a benchmark when Standard-Model-facing scattering or mixing is claimed. | State which assumptions are effective and derive gauge-like symmetries without contradicting observed factorization. Failure occurs if a claimed unification predicts forbidden effective-sector mixing or uses gauge covariance as an unexplained fit. |
| Weinberg-Witten-like obstructions | `assumption mismatch` with replacement constraint when emergent photon or gravity language is claimed | Lorentz-covariant conserved stress-tensor assumptions of the theorem are not fundamental substrate assumptions for Noether-Sea and assembly closures. Photon and gravity claims must still recover the validated effective channels. | Keep photon and metric objects as medium/assembly closures with explicit domain limits. Failure occurs if the record claims a fundamental Lorentz-covariant composite photon/graviton while also denying the theorem's assumptions, or if effective limits cannot be recovered. |
| Massive-gravity and finite-range-gravity obstructions | `replacement constraint` when large-scale gravity modification is claimed | Fundamental massive-graviton and Lorentzian spin-2 assumptions are not $\mathbb{A}\mathbb{A}\mathbb{A}$ substrate assumptions. The protected constraints remain local GR recovery, bounded physical energy, stable mode counting, de Sitter or cosmological background bounds, and gravitational-wave polarization, speed, and dispersion limits. | A medium-response closure must recover the GR limit in validated regimes, keep perturbation energy bounded below after gauge and effective redundancies are removed, and prevent extra scalar or longitudinal gravitational-wave modes or finite-range drift from exceeding observational bounds. Failure occurs if large-scale weakening is obtained only by allowing ghost-like negative-energy modes, order-one solar-system deviations, or unconstrained gravitational-wave dispersion or polarization. |
| AdS/CFT, island, replica-wormhole, string, or loop-quantum-gravity comparison constraints | `irrelevant comparison` unless a specific tested benchmark is imported | These frameworks are comparison tools unless the local packet imports a precise entropy, unitarity, horizon, or observational condition as a gate. | No acceptance burden is created by analogy alone. A burden is created only by a named benchmark such as area-scaling entropy, Page-curve-compatible accounting, horizon regularity, or direct compact-object data. |

## Use in Validation

A candidate closure record must name the no-go family it touches and fill the applicability record before the result can be promoted. If $\operatorname{app}(G,\theta)=\mathrm{direct}$, the theorem's conclusion is a hard rejection condition. If $\operatorname{app}(G,\theta)=\mathrm{replacement\ constraint}$, the rejected assumption does not remove the burden; it only changes the object that must carry the validated behavior.

The no-go record therefore becomes one component of the sector predicate $\mathcal{G}_S(\theta)$ used in [Failure Criteria](./failure-criteria.md). A result that passes a local benchmark but evades the relevant theorem by changing assumptions without supplying the replacement constraint is not a closure result.
