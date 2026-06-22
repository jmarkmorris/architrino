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
\}
$$

The class is `direct` when the theorem's assumptions are accepted or effective in the tested regime and its conclusion applies as a rejection condition. The class is `assumption mismatch` when a required assumption is rejected or absent and the theorem does not by itself supply a validated replacement burden. The class is `replacement constraint` when an assumption is rejected or replaced but the theorem protects a validated behavior that the candidate record must recover by $\mathbb{A}\mathbb{A}\mathbb{A}$ objects. The class is `irrelevant comparison` when $G$ shares no benchmark variable, conservation condition, or effective limit with the local claim under test.

## Applicability Map

| No-go family | Applicability class | Assumption status | Replacement constraint or falsifier |
| --- | --- | --- | --- |
| Bell/CHSH/Tsirelson, including GHZ and Hardy subbenchmarks | `replacement constraint` | Bell local-causality, ordinary common-cause screening, Markov screening, or context-independent local value assumptions are not substrate assumptions when $\mathcal{H}$ and detector response are retained; no-signaling, validated correlation bounds, GHZ perfect-correlation products, and Hardy zero/positive probability patterns remain benchmark constraints. | Derive pair provenance, detector kernels, Born weights, no-signaling, Tsirelson-compatible correlations, GHZ product signs, and Hardy event margins from $\mathcal{T}_{\Delta t}$, $\{B_i\}$, and $\mu_*$. Record reconstruction is not sufficient unless the induced joint record measure also passes the Bell, no-signaling, measurement-independence, factorization-residual, GHZ parity, and Hardy-event gates. Failure occurs if the model reduces to the classical-axis linear-correlation mode, uses controllable superluminal transfer, treats final records as an explanation without deriving their tested joint distribution, lets the declared common-past record screen the wings into a Bell-local product law, assigns context-independent local values across GHZ contexts, or erases Hardy's zero-probability constraints while claiming the positive event. |
| Kochen-Specker / noncontextual operator values | `replacement constraint` | A context-independent value assignment to every self-adjoint observable is not a substrate assumption. Effective operator values exist only after a preparation, apparatus kernel, coarse-graining, and record channel are declared. The protected benchmark is the quantum contextuality pattern: commuting context products, compatible shared marginals, and the absence of a global noncontextual value map in validated regimes. | Derive context-indexed apparatus records $r_{O,C}=R_{O,C}(\Phi_{\tau_C}^{\mathrm{tot}}(\Gamma_0;\mathcal{K}_C))$ from one substrate flow, while recovering the declared context product constraints and shared-observable marginals. Failure occurs if the closure silently assigns substrate values to all effective operators, changes the target state per context, or recovers contextuality only by making apparatus records inconsistent across overlapping calibrated contexts. |
| Pusey-Barrett-Rudolph quantum-state reality theorem | `replacement constraint` | Preparation independence and ontic-state overlap assumptions are not substrate axioms; the wavefunction is observer-level bookkeeping rather than a primitive physical field. The protected benchmark is stronger: independently prepared systems must have declared preparation records, product or non-product provenance status, and the standard state-discrimination statistics. | A candidate wavefunction account must state whether its substrate preparation measure factorizes for independently prepared systems and must expose any provenance correlation needed to avoid the theorem. Failure occurs if the model treats overlapping effective wavefunctions as harmless while also accepting product preparation independence and the PBR measurement statistics, or if it evades the theorem by hiding unrecorded correlations between supposedly independent preparation devices. |
| Leggett-Garg temporal-correlation inequalities | `replacement constraint` | Macroscopic realism per se and noninvasive measurability are not substrate axioms. A measurement in $\mathbb{A}\mathbb{A}\mathbb{A}$ is a physical apparatus-target coupling, so temporal readouts may disturb later basin dynamics; the protected benchmark is the observed sequential-correlation data together with an explicit disturbance ledger. | A candidate measurement account must declare the apparatus kernels used at each time, recover the tested temporal correlators, and report whether earlier probes perturb later record statistics. Failure occurs if the model asserts a definite macro-trajectory with noninvasive readout while accepting a Leggett-Garg violation, or if it explains the violation only by untracked apparatus disturbance rather than a declared record-channel residual. |
| Frauchiger-Renner / Wigner-friend observed-observer consistency | `replacement constraint` | The standard no-go setup assumes that quantum state descriptions can be applied to other theory-users, that one observer may import another observer's certified certainty, and that one declared record channel cannot certify mutually exclusive outcomes. $\mathbb{A}\mathbb{A}\mathbb{A}$ rejects an external classical-observer cut, but it also rejects importing another observer's conclusion without a physical record channel, access region, apparatus kernel, and boundary-data model. | A measurement closure that includes observed Physical Observers must derive every imported statement from the same substrate flow, record-autonomy test, and finite communication channel used for ordinary apparatus records. Failure occurs if a model needs a hidden external observer, lets a Physical Observer import certainty without a durable record, treats an unbuildable reference/readout setup as a completed experiment, or allows two mutually exclusive outcomes to be certified inside one declared record channel. If the reference or readout channel cannot satisfy the physical record criteria, the thought experiment is blocked by realizability rather than promoted into ontology. |
| Groenewold-van Hove / global quantization map | `replacement constraint` | A global quantization map from all classical observables $C^\infty(M)$ to Hilbert-space operators, preserving every Poisson bracket as a commutator, is not a substrate assumption. The protected benchmark is narrower: in validated quantum regimes, the selected observer-level observables must recover the tested commutator algebra on the calibrated record domain. | Derive an admissible observable set from the same coarse-graining, apparatus kernel, retained path-history data, and record window used for the effective operator model, then bound the quantization-domain residual in [Quantum Operator Mapping](../philosophy-history/theory-bridges/quantum-operator-mapping.md#admissible-quantization-domain-guardrail). Failure occurs if a closure claims bracket-to-commutator recovery for all smooth classical functions, uses a choice of polarization or representation as hidden ontology, or changes the observable domain per benchmark without recording the physical apparatus and coarse-graining that justify the restriction. |
| Lorentz invariance and preferred-frame tests | `direct` | Observer-level clock, ruler, two-way signal, PPN, and spectral bounds apply directly to any candidate effective metric or transport map. | Bound $\epsilon_{\mathrm{LV}}$, $\Delta_{\mathrm{tw}}(\beta)$, PPN parameters, spectra, and gravitational-wave-speed differences within recorded limits. Failure occurs when absolute motion is detectable above the accepted thresholds. |
| Spin-statistics / exchange | `replacement constraint` | Local Lorentz-QFT axioms are not fundamental substrate assumptions, but matter stability and exchange classes are validated effective constraints. | Derive the ordered-frame lift, $4\pi$ spinor behavior, and bosonic/fermionic exchange classes from Noether braid topology and angular-momentum ledger. Failure occurs if the lift cannot separate fermionic and bosonic closure classes. |
| CPT theorem / local relativistic QFT assumptions | `replacement constraint` | Local relativistic QFT assumptions are not substrate assumptions for absolute time, Euclidean void, and delayed causal wakes. This includes local field operators, microcausal commutation structure, fundamental Poincare symmetry, and a Lorentz-invariant vacuum as primitive assumptions. The protected benchmarks remain observer-level particle/antiparticle mass degeneracy, charge-conjugate reaction bookkeeping, neutral-meson and lepton-sector CPT bounds, Lorentz-leakage bounds, and the absence of unobserved baryon/lepton channels. | Recover the tested CPT-facing benchmarks from architrino polarity, pro/anti assembly mapping, delayed dynamics, effective Lorentz closure, and the existing null-result ledger. A candidate record should publish a residual vector such as $\mathcal{R}_{\mathrm{CPT}}(\theta)=(\Delta m_{p\bar p},\Delta q_{p\bar p},\Delta\Gamma_{\mathrm{conj}},\epsilon_{\mathrm{LV}},\mathcal{R}_{\mathrm{null}})$ and show that each component stays within the declared experimental or closure bound. Failure occurs if the record hides rejected local-QFT assumptions inside the proof, predicts CPT-violating mass or reaction asymmetries above bounds, or restores the symmetry only by adding untracked channels outside $\mathcal{R}_{\mathrm{null}}$. |
| Exact global architrino flips or permutations | `assumption mismatch` with replacement constraint when effective indistinguishability is claimed | Substrate architrinos are provenance-bearing entities with path-history and causal-wake records. A global flip, polarity reassignment, or label permutation is not exact unless it preserves those records and all causal-root relations, not merely the instantaneous exposed properties. | State whether the symmetry is a kernel/background symmetry, a full-history symmetry on a special state, or an effective coarse-grained equivalence. Effective exchange, gauge, flavor, or charge bookkeeping may be used only after the suppressed provenance data and replacement recovery target are named. Failure occurs if a closure treats provenance-suppressed interchangeability as substrate identity, or if an effective symmetry claim cannot recover the validated observer-level degeneracies, conservation laws, and exchange classes. |
| Coleman-Mandula / gauge unification constraints | `assumption mismatch` with replacement constraint when effective scattering is claimed | Exact Lorentz-invariant analytic S-matrix assumptions are not substrate assumptions for delayed absolute-time dynamics. Compact internal symmetry, unitarity, positive-energy particle states, and effective gauge-sector factorization become benchmarks when Standard-Model-facing scattering or mixing is claimed. A pre-effective symmetry container may evade the theorem's literal hypotheses only before observer-level spacetime, scattering states, and gauge factors have been recovered; after that recovery, the same record must reproduce the validated factorization and may not use mixed spacetime/internal generators to create observed-sector shortcuts. | State which assumptions are effective, recover compact internal gauge behavior in the tested regime, and derive gauge-like symmetries without contradicting observed factorization. Failure occurs if a claimed unification predicts forbidden effective-sector mixing, hides added channels outside $\mathcal{R}_{\mathrm{null}}$, uses gauge covariance as an unexplained fit, or suppresses non-baseline sectors with a record different from the positive recovery record. |
| Weinberg-Witten-like obstructions | `assumption mismatch` with replacement constraint when emergent photon or gravity language is claimed | Lorentz-covariant conserved stress-tensor assumptions of the theorem are not fundamental substrate assumptions for Noether sea state and assembly closures. Photon and gravity claims must still recover the validated effective channels. | Keep photon and metric objects as medium/assembly closures with explicit domain limits. Failure occurs if the record claims a fundamental Lorentz-covariant composite photon/graviton while also denying the theorem's assumptions, or if effective limits cannot be recovered. |
| Boundary-Hamiltonian / kinematic-locality constraints on emergent gravity | `replacement constraint` when emergent gravity, boundary unitarity, or black-hole information claims are made | In generally covariant gravity comparisons, the Hamiltonian can be a boundary term, and Marolf-style arguments show that non-linear gravity is not straightforwardly recovered from a kinematically local theory with independently commuting bulk observables. $\mathbb{A}\mathbb{A}\mathbb{A}$ does not accept local QFT operator algebras, boundary Hamiltonians, or asymptotic boundary observables as substrate primitives, but the protected benchmark remains: effective gravity must carry unitary observer-level information accounting without freezing local dynamics or treating local horizon entanglement as a sharply defined substrate observable. | A candidate record must replace the rejected assumptions with finite boundary wake data, declared reference resources, access-region limits, and a Noether sea continuation map that recovers both local effective dynamics and boundary-accessible bookkeeping. Failure occurs if the model claims emergent GR from purely local commuting substrate variables, hides all bulk dynamics behind a boundary algebra, or treats horizon-crossing correlations as lost or recovered without a declared Physical Observer access model. |
| Global-GR underdetermination and observationally indistinguishable spacetime results | `replacement constraint` when a global cosmology, horizon, or effective-metric claim is promoted from observer records | Lorentzian manifold ontology, global spacetime extension classes, and model-class maximality assumptions are not substrate assumptions. The protected benchmark is methodological: rich local records and local-property preservation do not by themselves license a unique global reconstruction. | A promoted global claim must state the Physical Observer access region, data-product projection, local-induction assumptions, and ambiguity residual that make the claim invariant across admissible closure records. Failure occurs if a cosmology or strong-field packet treats a fitted FLRW, de Sitter, extension, or horizon interpretation as final ontology merely because it reproduces the observer-accessible data, or if it changes the admissible model class to obtain determinism or uniqueness without recording that assumption as part of the closure. |
| Massive-gravity and finite-range-gravity obstructions | `replacement constraint` when large-scale gravity modification is claimed | Fundamental massive-graviton and Lorentzian spin-2 assumptions are not $\mathbb{A}\mathbb{A}\mathbb{A}$ substrate assumptions. The protected constraints remain local GR recovery, bounded physical energy, stable mode counting, low-energy positivity bounds where the effective comparison domain accepts their assumptions, de Sitter or cosmological background bounds, and gravitational-wave polarization, speed, and dispersion limits. | A medium-response closure must recover the GR limit in validated regimes, keep perturbation energy bounded below after gauge and effective redundancies are removed, pass the accepted positivity tests for any claimed low-energy effective scattering or response map, and prevent extra scalar or longitudinal gravitational-wave modes or finite-range drift from exceeding observational bounds. Failure occurs if large-scale weakening is obtained only by allowing ghost-like negative-energy modes, positivity-violating effective coefficients, order-one solar-system deviations, or unconstrained gravitational-wave dispersion or polarization. |
| AdS/CFT, island, replica-wormhole, string, or loop-quantum-gravity comparison constraints | `irrelevant comparison` unless a specific tested benchmark is imported | These frameworks are comparison tools unless the local packet imports a precise entropy, unitarity, horizon, or observational condition as a gate. | No acceptance burden is created by analogy alone. A burden is created only by a named benchmark such as area-scaling entropy, Page-curve-compatible accounting, horizon regularity, or direct compact-object data. |

Black-hole CPT comparisons are handled by the CPT row, not by importing global mirror-boundary ontology. If a horizon-interface packet uses CPT or thermal-equilibrium language, it must publish the corresponding formation/release balance residual in the black-hole chapter and keep $\mathcal{R}_{\mathrm{CPT}}(\theta)$ within the tested particle-sector bounds. A record fails if it restores apparent balance only by adding untracked release channels, spectator species outside $\mathcal{R}_{\mathrm{null}}$, or a second state record for horizon entropy.

Cosmic Bell tests sharpen the Bell row by converting measurement-independence leakage into an observationally bounded residual. When detector settings are chosen from distant photons, quasars, or other causally screened sources, a candidate closure may not rely on an untracked common cause linking those settings to the pair-preparation record. Such a route must be recorded as nonzero $\Delta_{\mathrm{MI}}$ and compared against the experimental setting-source covariance bound rather than hidden inside pair provenance.

The GHZ and Hardy subbenchmarks sharpen the Bell row by removing any reliance on a single CHSH average. For a calibrated three-party GHZ setup, the four product contexts $\mathcal{C}_{\mathrm{GHZ}}=\{XXX,XYY,YXY,YYX\}$ carry signs $\chi_C$ whose product is $-1$, while any context-independent local value assignment makes the product $+1$. A compact record residual is
$$
\Delta_{\mathrm{GHZ}}
=
\max_{C\in\mathcal{C}_{\mathrm{GHZ}}}
\left[
1-\chi_C E_\theta(C)
\right]_+
$$
where $E_\theta(C)$ is the product expectation for the declared apparatus context and $[x]_+\equiv\max(x,0)$. For a Hardy setup with binary observables $U_i,D_i$, use the zero-probability constraints and positive Hardy event as a margin:
$$
\Delta_{\mathrm{Hardy}}
=
\left[
P_\theta(D_1=1,D_2=1)
-
P_\theta(U_1=1,U_2=1)
-
P_\theta(D_1=1,U_2=0)
-
P_\theta(U_1=0,D_2=1)
\right]_+
$$
A useful Bell-family closure must make $\Delta_{\mathrm{GHZ}}$ small on the perfect-correlation contexts, produce the positive Hardy margin where the experiment requires it, and still keep $\Delta_{\mathrm{MI}}$ and $\Delta_{\mathrm{NS}}$ inside tolerance. These are validation targets for the joint record measure, not new ontology.

The Kochen-Specker row includes the Mermin-Peres magic square as a preferred compact benchmark when a candidate operator map claims contextuality recovery. In that subcase the six commuting row/column contexts carry product signs $\chi_C\in\{+1,+1,+1,+1,+1,-1\}$. The closure must derive context-indexed apparatus records that satisfy those products and preserve shared marginals while refusing a global noncontextual value map. A proof that only assigns prewritten substrate values to all effective operators fails the parity check: each observable appears twice, so the product of all assigned values is $+1$, whereas the benchmark product signs multiply to $-1$.

The Pusey-Barrett-Rudolph row is a preparation-independence audit, not a license to ignore independent preparation. For two declared preparations $P_A$ and $P_B$, with substrate preparation measures $\rho_A(\lambda_A|P_A)$, $\rho_B(\lambda_B|P_B)$, and joint measure $\rho_{AB}(\lambda_A,\lambda_B|P_A,P_B)$, define
$$
\Delta_{\mathrm{PI}}
=
D_{\mathrm{TV}}\!\left(
\rho_{AB}(\lambda_A,\lambda_B|P_A,P_B),
\rho_A(\lambda_A|P_A)\rho_B(\lambda_B|P_B)
\right)
$$
If a candidate avoids the theorem by allowing $\Delta_{\mathrm{PI}}>0$, that residual must be tied to a physical shared-provenance, boundary-data, or apparatus-coupling record. Otherwise it is an untracked preparation correlation. The useful closure target is therefore two-part: recover the PBR state-discrimination statistics in the declared record channel while reporting whether the substrate preparation measure factorizes. If both the PBR measurement statistics and preparation independence are accepted in the same domain, overlapping effective wavefunction descriptions cannot be treated as a harmless epistemic overlap.

The Leggett-Garg row protects temporal correlation data without importing macrorealism as ontology. For dichotomic records $q_i\in\{-1,+1\}$ at times $t_i$, define
$$
C_{ij}
=
\sum_{q_i,q_j=\pm1}
q_iq_j\,P_\theta(q_i,q_j|\mathcal{K}_i,\mathcal{K}_j),
\qquad
K_{\mathrm{LG}}=C_{12}+C_{23}-C_{13}
$$
Macrorealism plus noninvasive measurability gives $K_{\mathrm{LG}}\le 1$ for this sign convention. The $\mathbb{A}\mathbb{A}\mathbb{A}$ replacement burden is not to accept noninvasive readout, but to declare the disturbance residual
$$
\Delta_{\mathrm{NIM}}
=
\sup_{i<j}
D_{\mathrm{TV}}\!\left(
P_\theta(q_j|\mathcal{K}_j),
P_\theta(q_j|\mathcal{K}_i,\mathcal{K}_j)
\right)
$$
recover the observed $K_{\mathrm{LG}}$-type statistics, and state whether the violation is carried by ordinary record-forming apparatus coupling, weak-probe disturbance, or a still-unclosed measurement model. A result that leaves $\Delta_{\mathrm{NIM}}$ implicit has not converted the Leggett-Garg comparison into a usable validation gate.

For finite-range gravity comparisons, positivity bounds should be treated as an effective-domain filter, not as imported ontology. Let $E_{\min}^{\mathrm{phys}}(\theta)$ denote the lowest physical perturbation energy after gauge and redundant variables are removed, and let $\Pi_a(\theta)$ denote the low-energy positivity functionals whose signs are fixed by the accepted comparison theorem for the declared scattering or response domain. A compact residual for a candidate large-scale weakening record is
$$
\mathcal{R}_{\mathrm{range}}(\theta)
=
w_{\mathrm{GR}}\mathcal{R}_{\mathrm{GR}}(\theta)
+
w_E
\left[
\frac{-E_{\min}^{\mathrm{phys}}(\theta)}{\epsilon_E}
\right]_+^2
+
w_{\mathrm{pos}}
\sum_a
\left[
\frac{-\Pi_a(\theta)}{\epsilon_{\mathrm{pos},a}}
\right]_+^2
+
w_{\mathrm{pol}}
\frac{\mathcal{P}_{\mathrm{extra}}}{\mathcal{P}_{\mathrm{TT}}}
+
w_{\mathrm{disp}}
\int_{\mathcal{B}_{\mathrm{GW}}}
\left|
\frac{\partial^2\omega_\theta}{\partial k^2}
\right|^2\,d\log f
+
w_{\mathrm{cos}}\mathcal{R}_{\mathrm{shared}}(\theta)
$$
where $[x]_+\equiv\max(x,0)$. The record is useful only if one shared Noether sea response map can make this residual small. A result that passes local GR tests by changing the energy, positivity, polarization, dispersion, or cosmology record separately is not a promoted closure.

## Use in Validation

A candidate closure record must name the no-go family it touches and fill the applicability record before the result can be promoted. If $\operatorname{app}(G,\theta)=\mathrm{direct}$, the theorem's conclusion is a hard rejection condition. If $\operatorname{app}(G,\theta)=\mathrm{replacement\ constraint}$, the rejected assumption does not remove the burden; it only changes the object that must carry the validated behavior.

The no-go record therefore becomes one component of the sector predicate $\mathcal{G}_S(\theta)$ used in [Failure Criteria](./failure-criteria.md). A result that passes a local benchmark but evades the relevant theorem by changing assumptions without supplying the replacement constraint is not a closure result.
