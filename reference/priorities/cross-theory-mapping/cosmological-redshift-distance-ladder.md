# Cosmological Redshift And Distance-Ladder Benchmarks

## Standard-Theory Concept

In Lambda-CDM-era cosmology, redshift is encoded by

$$
1+z=\frac{a(t_{\text{obs}})}{a(t_{\text{emit}})},
$$

with distances inferred through luminosity distance $D_L(z)$, angular-diameter distance $D_A(z)$, standard candles, standard rulers, BAO, CMB temperature scaling, and structure-growth observables. Supernova time dilation, image sharpness, CMB blackbody quality, and BAO consistency are hard constraints against naive tired-light explanations.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

$\mathbb{A}\mathbb{A}\mathbb{A}$ treats $a(t)$, $H(t)$, redshift, and CMB summaries as effective observer variables for Noether-Sea evolution, transport, and clock-rate comparison. The Euclidean void does not expand. The useful mapping is therefore a transfer-function problem: source state, path transport, thermalization, clock comparison, and observer calibration must all be recorded without creating unbalanced substrate content.

## Canonical $\mathbb{A}\mathbb{A}\mathbb{A}$ Mapping

The canon source for this topic is [Expansion Mechanism](../../../content/markdown/aaa/cosmology/expansion-mechanism.md), with terminology guarded by [Comparative Glossary](../../../content/markdown/aaa/archie/comparative-glossary.md). Cosmological redshift is `Clock-Rate Redshift`: medium evolution plus path-integrated clock-rate comparison between emission and observation environments in a fixed Euclidean void.

The operational comparison is

$$
1+z
=
\frac{\nu_e}{\nu_o}
=
\frac{(d\tau/dt)_o}{(d\tau/dt)_e},
$$

with the clock map depending on $\rho_{\text{core}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, $\Phi_{\text{eff}}$, velocity, and clock geometry. For modeling and diagnostics, the redshift map must keep at least three effective channels distinct:

- endpoint clock-rate comparison,
- source/observer relative-motion contribution,
- propagation through the traversed Noether-Sea state and gradients.

### Candidate Noether-Sea Core Factorization

The more substrate-facing version should use the local Noether-Sea core cadence itself as the clock. Let $\Omega_N(\mathbf{x},t)$ be the representative local Noether-Sea core cadence and $T_N(\mathbf{x},t)=2\pi/\Omega_N(\mathbf{x},t)$ its cycle period. Relative to a weak homogeneous reference core, define the candidate endpoint deformation factor

$$
\Gamma_N(\mathbf{x},t)
\equiv
\frac{T_N(\mathbf{x},t)}{T_{N0}}
=
\frac{\Omega_{N0}}{\Omega_N(\mathbf{x},t)}.
$$

Here $\Gamma_N=1$ marks the reference weak-sea cadence, while $\Gamma_N>1$ marks a locally slowed or stretched Noether-Sea core cadence. In a homogeneous Lorentz-closure branch, this factor should reduce to the appropriate moving-core deformation factor only after the Noether-core geometry and clock extraction have been derived; schematically one expects $\Gamma_N\to(1-\beta_N^2)^{-1/2}$ in the validated limit.

For a spectral transition family $X$, introduce three dimensionless factors:

- $B_X(E)$: source-branch factor, equal to $1$ when the internal transition gap is the clean reference branch and different from $1$ when local source conditions genuinely alter the transition before propagation;
- $\mathcal{L}_{E\to R}(\hat{\mathbf{k}})$: directional launch factor from source motion and emission direction, normalized so values above $1$ compress the phase train toward the receiver and values below $1$ stretch it;
- $\mathcal{P}_{E\to R}$: path-history propagation factor through the intervening Noether Sea, normalized so $\mathcal{P}_{E\to R}>1$ is net redward phase stretching.

The candidate redshift factorization is then

$$
1+z_X
\approx
\frac{\Gamma_{N,E}}{\Gamma_{N,R}}\,
\frac{\mathcal{P}_{E\to R}}
{B_X(E)\,\mathcal{L}_{E\to R}(\hat{\mathbf{k}})}.
$$

This equation is a closure target, not a completed derivation. Its value is that gravitational redshift, relative-motion redshift, intrinsic source-branch shifts, and deep-space propagation redshift become separate multiplicative terms in one replayable medium record. In logarithmic form,

$$
\ln(1+z_X)
\approx
\ln\Gamma_{N,E}
-\ln\Gamma_{N,R}
+\ln\mathcal{P}_{E\to R}
-\ln B_X(E)
-\ln\mathcal{L}_{E\to R}(\hat{\mathbf{k}}),
$$

so factors can be dropped only when their logarithmic contribution is small compared with the dominant term and the observational tolerance. In the strong local-gradient limit, the endpoint ratio $\Gamma_{N,E}/\Gamma_{N,R}$ dominates. In the gentle deep-space limit, the endpoint ratio may sit near unity while $\mathcal{P}_{E\to R}$ accumulates over a long path-history record. In clean laboratory spectroscopy, $B_X(E)$ should remain $1$ within tolerance; in high acceleration, strong gravity, plasma, magnetic, or tidal environments, $B_X(E)\neq1$ records a real change in the source branch rather than a propagation redshift.

The corresponding received-frequency and receiver-energy form is

$$
\nu_{\mathrm{obs},X}
\approx
\nu_{X,0}\,
B_X(E)\,
\frac{\Gamma_{N,R}}{\Gamma_{N,E}}\,
D_v\,
\frac{1}{\mathcal{P}_{E\to R}},
\qquad
E_{\mathrm{obs},X}=h\nu_{\mathrm{obs},X},
$$

where $D_v$ is the low-speed launch or relative-motion endpoint of $\mathcal{L}_{E\to R}(\hat{\mathbf{k}})$. This is not an untracked photon energy-loss term. The local emission ledger is carried by $\nu_{X,0}B_X(E)$, while the receiver reads that packet through endpoint cadence, launch geometry, and path-history propagation.

An effective scale factor $a(t)$ may summarize medium evolution, but it is not geometric stretching of the Euclidean void. A generic scattering-loss tired-light mechanism is excluded when it fails image sharpness or $(1+z)$ time-dilation consistency.

### Absolute-Record Closure Question

The next proof target is not to decide which observer frame carries the "true" photon energy. The substrate target is to compute the redshift factors from one absolute universe record

$$
\mathbb{U}_{\text{now}}=S(t),
$$

where $S(t)$ contains the source branch, receiver state, Noether-Sea cadence, medium flow, causal wakes, and photon path-history ledger. The central question is whether one Noether-Sea transport law can compute $\Gamma_N$, $D_v$, and $\mathcal{P}_{E\to R}$ from $S(t)$ without switching explanations case by case.

In this form the recovered observer energy is

$$
E_{\mathrm{obs},X}
=
h\nu_{X,0}B_X(E)
\left(
\frac{\Gamma_{N,R}}{\Gamma_{N,E}}
D_v
\frac{1}{\mathcal{P}_{E\to R}}
\right),
$$

so the local emission ledger, endpoint cadence, launch geometry, path-history propagation, and receiver coupling remain separated until a derivation proves that some factors combine in a declared limit.

### Noether-Core Equilibrium Transport Hypothesis

A sharper candidate for the deep-space term is an equilibrium transport law over Noether-core cadence states. The hypothesis is that most Noether-Sea cores interact primarily with neighboring Noether cores, while photons, neutrinos, and stronger disturbances provide sparse probe or perturbation channels. If a representative core cadence is written as $\nu_N$, the local core energy scale is

$$
E_N=h\nu_N.
$$

Individual transitions may occur as $h$-scale ledger steps, while a large asynchronous population can still produce a smooth coarse-grained cadence drift. The single-core mechanism is cadence-scale retuning: an accepted $\Delta A_{\mathrm{cyc}}=\pm h$ transaction changes the closure ledger and is resolved by shifts in cadence, layer radii, envelope scale, envelope ratio, orientation, strain, or neighbor coupling. In the simplest fixed-speed estimate, $R_N\nu_N\approx\text{constant}$, so higher cadence implies a smaller representative scale and lower cadence implies a larger one.

Let $f_N(\nu,\mathbf{x},t)$ denote the local distribution of Noether-core cadence states. The cadence-space current should be interpreted as the ensemble flux

$$
J_\nu
\sim
f_N
\left\langle
\dot{\nu}_N
\right\rangle_{\Delta A_{\mathrm{cyc}}=\pm h},
$$

with the average taken over accepted branch changes inside the coarse-graining cell. A minimal provisional transport equation is

$$
\partial_t f_N
+\nabla\cdot(\mathbf{u}_{\mathrm{sea}}f_N)
+\partial_\nu J_\nu
=
S_{\mathrm{BH}}
+S_{\mathrm{GW}}
-R_{\mathrm{eq}}[f_N].
$$

Here $J_\nu$ is the frequency-space current between neighboring cadence states, $S_{\mathrm{BH}}$ records medium loading from strong-field recycling sites, $S_{\mathrm{GW}}$ records gravitational-wave disturbances of the medium state, and $R_{\mathrm{eq}}[f_N]$ records local neighbor equilibration. This equation is not yet canon closure. It is a concrete place to ask whether SMBH recycling can feed a bulk movement from high-energy recycling zones toward lower-energy Noether-Sea states while preserving conservation, image sharpness, line coherence, and supernova time-dilation consistency.

The expansionary implication is conditional. If $J_\nu=0$ after coarse-graining, or if the source and equilibration terms cancel without a signed large-scale current, then local equilibrium alone does not create an expansion-like redshift slope. The hypothesis becomes cosmologically relevant only when the same $f_N$ record produces a nonzero path-rate term in $\alpha_{\mathrm{prop},X}$, and hence a nonzero contribution to $\mathcal{P}_{E\to R}$, without being reinterpreted as generic photon energy loss.

Directional residuals are part of the canon, not optional postprocessing. A redshift-distance fit must expose

$$
\Delta O_X(z,\hat{\mathbf{n}})
=
O_X^{\mathrm{obs}}(z,\hat{\mathbf{n}})
-
O_X^{\mathrm{iso}}(z),
$$

with monopole, dipole, and higher directional terms tested against the same Noether-Sea variables that determine the clock and transport maps. A residual dipole must not be hidden inside $H(z)$, $w(z)$, or calibration constants.

## Task Queue

1. `redshift_factorization_record` — Derive or falsify the candidate map $1+z_X\approx(\Gamma_{N,E}/\Gamma_{N,R})\mathcal{P}_{E\to R}/(B_X\mathcal{L}_{E\to R})$ from the shared Noether-Sea core cadence, source-branch, launch-geometry, and path-history records. Status: `draft`.
2. `time_dilation_gate` — Require supernova light-curve dilation and spectral redshift to use the same $\mathcal{Z}$ record. Status: `draft`.
3. `distance_duality_gate` — Test whether $D_L=(1+z)^2D_A$ survives the effective transport map. Status: `draft`.
4. `cmb_bao_handoff` — Route CMB blackbody, BAO scale, and growth variables through one cosmology closure record. Status: `draft`.
5. `directional_residual_gate` — Decompose supernova, BAO, CMB-frame, and local $H_0$ residuals by direction and environment before accepting an isotropic Friedmann-like bridge. Status: `draft`.
6. `propagation_slope_record` — Define the endpoint-subtracted propagation residual $Z_{\mathrm{prop},X}$, derive or bound the path-rate functional $\alpha_{\mathrm{prop},X}$, and recover $H_{0,\mathbb{A}\mathbb{A}\mathbb{A}}=c_0\,\partial Z_{\mathrm{prop},X}/\partial D$ in the clean low-redshift limit. Status: `draft`.
7. `absolute_transport_law` — Derive or falsify a single absolute-record law that maps $S(t)$ to $\Gamma_N$, $D_v$, and $\mathcal{P}_{E\to R}$ for gravitational, relative-motion, and deep-space redshift without changing coefficients or explanatory class per case. Status: `seeded`; proof scaffold: `content/markdown/aaa/cosmology/expansion-mechanism.md#absolute-record-transport-map`; runtime extractor: `scripts/cosmology/redshift-budget-toy-model.mjs`.
8. `gamma_n_geometry_extraction` — Derive the coefficient row $\mathbf{b}_N$ that maps $(n,\chi_{\text{sea}},\lambda,\xi,R_{\text{core}})$ into $\Gamma_N$ while recovering the weak homogeneous reference, homogeneous moving-core Lorentz branch, and weak gravitational endpoint limit. Status: `row-constrained`; fixed result: $b_\xi=1$ for the coefficient multiplying $-\ln\xi$; remaining weak-field constraint: $b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1$ for the isotropic static response vector. Proof scaffold: `content/markdown/aaa/spacetime/proper-time-and-time-dilation.md#gamma-n-geometry-extraction-target`.
9. `cadence_scale_retuning_map` — Derive or falsify the single-core map from an accepted $\Delta A_{\mathrm{cyc}}=\pm h$ transaction to $(\Delta\nu_N,\Delta R_I,\Delta R_M,\Delta R_O,\Delta\lambda,\Delta\xi)$ and show how its coarse-grained average becomes $J_\nu$. Status: `fixture-seeded`; proof scaffold: `content/markdown/aaa/dynamics/tri-binary-dynamics.md#cadence-scale-retuning-closure`; runtime fixture: `scripts/tri-binary/retuning-map-toy-model.mjs`.
10. `noether_core_equilibrium_transport` — Derive or falsify the candidate $f_N$ transport law, including $J_\nu$, $S_{\mathrm{BH}}$, $S_{\mathrm{GW}}$, and $R_{\mathrm{eq}}[f_N]$, and test whether it supplies a signed contribution to $\alpha_{\mathrm{prop},X}$ without violating photon coherence gates. Status: `draft`.

## Closure Objects

- Transfer map: $\mathcal{Z}$ from source, path-history, and observer clock records to measured $z$.
- Channel decomposition: $\mathcal{Z}=\mathcal{Z}_{\mathrm{clock}}\oplus\mathcal{Z}_{\mathrm{motion}}\oplus\mathcal{Z}_{\mathrm{prop}}$ until a derivation proves a lower-dimensional representation.
- Candidate factor record: endpoint Noether-Sea core deformation factors $\Gamma_{N,E},\Gamma_{N,R}$; source-branch factor $B_X(E)$; directional launch factor $\mathcal{L}_{E\to R}$; and path-history propagation factor $\mathcal{P}_{E\to R}$.
- Observable frequency and energy record: $\nu_{\mathrm{obs},X}$ and $E_{\mathrm{obs},X}=h\nu_{\mathrm{obs},X}$ after endpoint cadence, source branch, launch, and path-history factors are separated.
- Endpoint-subtracted propagation residual: $Z_{\mathrm{prop},X}=\ln(1+z_X)-\ln\Gamma_{N,E}+\ln\Gamma_{N,R}+\ln B_X(E)+\ln D_v$.
- Gamma-N geometry extraction row: $\ln\Gamma_N=\mathbf{b}_N\cdot\mathbf{g}_N+\mathcal{R}_{\Gamma}$, with $\mathbf{g}_N=(\ln n,\ln\chi_{\text{sea}},\ln\lambda,-\ln\xi,\ln(R_{\text{core}}/R_{\text{core},0}))^T$; the homogeneous moving-core branch fixes $b_\xi=1$, while the weak static endpoint branch fixes $b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1$ for $\ln n=a_nU/c_0^2$, $\ln\chi_{\text{sea}}=a_\chi U/c_0^2$, $\ln\lambda=a_\lambda U/c_0^2$, and $\ln(R_{\text{core}}/R_{\text{core},0})=a_RU/c_0^2$.
- Path-rate functional: $\alpha_{\mathrm{prop},X}$ with image-sharpness, line-coherence, chromaticity, and time-dilation residual bounds.
- Minimal redshift-budget fixture: $Y_{X,j+1}=Y_{X,j}+\alpha_{\mathrm{prop},X,j}\Delta s_j$, with $\mathcal{P}_{E\to R,X}=\exp(Y_{X,N})$; documented in `content/markdown/aaa/validation/simulations/redshift-budget-toy-model.md` with runtime fixture `scripts/cosmology/redshift-budget-toy-model.mjs`.
- Endpoint/launch runtime extractor: `endpoint_records` computes $\Gamma_N$ from `Gamma_N`, `T_N_over_T_N0`, `Omega_N_over_Omega_N0`, or weak-field `Phi_N_over_c0_squared`; `launch_record` computes $D_v$ from `beta_r`, `radial_velocity_km_s`, or endpoint velocity projection along $\hat{\mathbf{k}}$; `extraction_logs` records whether each factor came from record extraction or scalar fallback.
- Dark-energy handoff target: $\partial_t\boldsymbol{\theta}_\gamma=\mathbf{J}_{\mathrm{DE}}\mathbf{q}_{\mathrm{DE}}+\partial_t\boldsymbol{\theta}_{\gamma,\mathrm{local}}$, where $\mathbf{q}_{\mathrm{DE}}$ carries $\partial_t\ln\rho_{\mathrm{DE,eff}}$, $\partial_t w_{\mathrm{eff}}$, $\mathcal{S}_{\mathrm{sea}}/\rho_{\mathrm{DE,eff}}$, and $\mathcal{S}_{\mathrm{BH}}/\rho_{\mathrm{DE,eff}}$.
- First-order dark-energy coefficient row: $\boldsymbol{\lambda}_X^T=(a_\chi^X\ a_n^X\ a_R^X)\mathbf{J}_{\mathrm{DE}}$, giving $\alpha_{\mathrm{prop},X}^{\mathrm{DE}}=c_\gamma^{-1}\boldsymbol{\lambda}_X^T\mathbf{q}_{\mathrm{DE}}$ and, in the homogeneous continuity branch, a solved $H_{\mathrm{eff},X}^{\mathrm{DE}}$ transfer slope.
- Runtime coefficient packet: `dark_energy_transport_by_line` in `scripts/cosmology/redshift-budget-toy-model.mjs`, which converts a declared $\boldsymbol{\lambda}_X$ row and `q_DE_per_s` or `q_DE_per_mpc` record into additive `dark_energy.*` path-rate terms.
- Effective Hubble slope: $H_{0,\mathbb{A}\mathbb{A}\mathbb{A}}(\hat{\mathbf{k}},X)=c_0\,\partial Z_{\mathrm{prop},X}/\partial D$ in the corrected nearby limit.
- Absolute-record transport map: $\mathfrak{T}_X[\mathcal{S}_{X,E\to R}]=(\Gamma_{N,E},\Gamma_{N,R},B_X(E),D_v,Y_{X,E\to R})$ from one restricted $S(t)$ record containing the source branch, receiver branch, Noether-Sea cadence, medium flow, causal wakes, and photon path-history ledger relevant to the measured line.
- Cadence-scale retuning map: an accepted $\Delta A_{\mathrm{cyc}}=\pm h$ transaction maps one core closure label into another through $\mathcal{R}_{\mathrm{cyc}}^{(q,\sigma)}=(\Delta\nu_N,\Delta R_I,\Delta R_M,\Delta R_O,\Delta\lambda,\Delta\xi)$, with the ensemble average supplying the candidate current $J_\nu\sim f_N\langle\dot{\nu}_N\rangle_{\Delta A_{\mathrm{cyc}}=\pm h}$ and first estimate $J_\nu=\sum_\sigma f_N r_\sigma\Delta\nu_N^{(q,\sigma)}+O((\Delta\nu_N)^2\partial_\nu f_N)$.
- Retuning-map toy fixture: `scripts/tri-binary/retuning-map-toy-model.mjs` with documentation in `content/markdown/aaa/validation/simulations/retuning-map-toy-model.md`; this fixture solves the linearized constrained compliance problem and reports branch speed gates plus net $J_\nu$.
- Noether-core equilibrium transport packet: $f_N(\nu,\mathbf{x},t)$, $J_\nu$, $S_{\mathrm{BH}}$, $S_{\mathrm{GW}}$, $R_{\mathrm{eq}}[f_N]$, and the projection from that packet into $\alpha_{\mathrm{prop},X}$.
- Cosmology acceptance vector: $(z,D_L,D_A,H(z),T_{\mathrm{CMB}},P(k),f\sigma_8)$.
- Shared medium variables: $\rho_{\text{core}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, and $\mathcal{M}_{\mathrm{sea}}^{ab}$.
- Frame-consistency record for CMB, matter dipoles, supernova directionality, BAO anisotropy, and local $H_0$ scatter.
- Shared-state residual gate: one $\theta_{\mathrm{sea}}$ must project into SN, BAO, CMB, weak-lensing, redshift-space-distortion, and BBN comparison packets without per-family replacement.

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | [cosmology-closure](../cosmology-closure/cosmology-closure.md) | Convert narrative cosmology into a component transfer-function queue. |
| This file | [validation-gates](../validation-gates/validation-gates.md) | Add cosmology failure witnesses for frame split, image blur, and incompatible transport limits. |
| This file | [tri-binary-causal-closure/radiation-gate-c-benchmarks](../tri-binary-causal-closure/radiation-gate-c-benchmarks.md) | Keep CMB photon loading tied to local radiation event ledgers. |

## Failure Modes

- `cosmology.tired_light_failure`: redshift loses supernova time dilation, surface-brightness, or image-sharpness constraints.
- `cosmology.channel_blend`: endpoint clock-rate comparison, relative motion, and propagation are collapsed into one fitted scalar before the shared transport law is derived.
- `cosmology.energy_loss_leak`: $\mathcal{P}_{E\to R}$ is treated as generic photon energy loss rather than phase-cadence path-history with image-sharpness, coherence, and time-dilation constraints.
- `cosmology.absolute_record_split`: $\Gamma_N$, $B_X(E)$, $D_v$, and $Y_X$ are fit from incompatible restrictions of $S(t)$ rather than one absolute redshift record.
- `cosmology.scalar_factor_leak`: endpoint or launch factors are inserted as free scalars when the underlying endpoint cadence or velocity records are available, hiding whether $\Gamma_N$ and $D_v$ were extracted from the same absolute record.
- `cosmology.dark_energy_coefficient_split`: the dark-energy coefficient row fits a redshift slope but fails chromaticity, cadence, image-sharpness, or shared-state projection checks.
- `cosmology.equilibrium_current_null`: the proposed Noether-core equilibrium law relaxes to zero signed $J_\nu$ or cancels source terms, so it cannot supply an expansion-like path-rate contribution.
- `cosmology.retuning_continuum_leak`: a model treats discrete one-core $h$-scale retunings as smooth single-core frequency drift and loses the branch ledger needed to define $J_\nu$.
- `cosmology.no_admissible_retuning`: the constrained retuning problem has no branch-admissible solution for $\Delta A_{\mathrm{cyc}}=\pm h$, so the proposed current must be treated as a branch transition, rejection event, or failed closure rather than a smooth equilibrium contribution.
- `cosmology.gw_transport_overload`: gravitational-wave perturbation terms produce path-rate noise, dispersion, or beam variance above image-sharpness, timing, or gravitational-wave-speed tolerances.
- `cosmology.frame_split`: CMB, BAO, supernova, and local-Hubble corrections use incompatible rest-frame records.
- `cosmology.directional_absorption`: dipole or environment residuals are absorbed into $H(z)$, $w(z)$, or calibration constants instead of being derived from the shared Noether-Sea state.
- `cosmology.thermalization_gap`: CMB blackbody quality is asserted without a thermalization depth and photon-loading ledger.
- `cosmology.void_expansion_leak`: effective $a(t)$ is described as fundamental expansion of the Euclidean void.
