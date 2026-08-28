# Cosmological Redshift And Distance-Ladder Benchmarks

## Standard-Theory Concept

In Lambda-CDM-era cosmology, redshift is encoded by

$$
1+z=\frac{a(t_{\text{obs}})}{a(t_{\text{emit}})},
$$

with distances inferred through luminosity distance $D_L(z)$, angular-diameter distance $D_A(z)$, standard candles, standard rulers, BAO, CMB temperature scaling, and structure-growth observables. Supernova time dilation, image sharpness, CMB blackbody quality, and BAO consistency are hard constraints against naive tired-light explanations.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

$\mathbb{A}\mathbb{A}\mathbb{A}$ treats $a(t)$, $H(t)$, redshift, and CMB summaries as effective observer variables for Noether sea evolution, transport, and clock-rate comparison. The Euclidean void does not expand. The useful mapping is therefore a transfer-function problem: source state, path transport, thermalization, clock comparison, and observer calibration must all be recorded without creating unbalanced substrate content.

## Canonical $\mathbb{A}\mathbb{A}\mathbb{A}$ Mapping

The canon source for this topic is [Expansion Mechanism](../../../content/markdown/aaa/cosmology/expansion-mechanism.md), with terminology guarded by [Comparative Glossary](../../../content/markdown/aaa/archie/comparative-glossary.md). Cosmological redshift is `Clock-Rate Redshift`: medium evolution plus path-integrated clock-rate comparison between emission and observation environments in a fixed Euclidean void.

The operational comparison is

$$
1+z
=
\frac{\nu_e}{\nu_o}
=
\frac{(d\tau/dt_{\mathrm{eff}})_o}{(d\tau/dt_{\mathrm{eff}})_e},
$$

with the clock map depending on $\rho_{\text{NS}}(\mathbf X,T)$, $n(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, $\Phi_{\text{eff}}$, velocity, and clock geometry. For modeling and diagnostics, the redshift map must keep at least three effective channels distinct:

- endpoint clock-rate comparison,
- source/observer relative-motion contribution,
- propagation through the traversed Noether sea state and gradients.

### Energy-Dependent Transport And Source-Population Checks

Legacy redshift notes contain a useful warning: a fixed-void redshift map must not hide frequency- or source-class dependence inside a single scalar distance. If path transport depends on the photon-channel family $X$, then a same-source or same-population comparison across bands must expose that residual after ordinary astrophysical and detector effects are removed. For source class $C$ and bands $X,Y$, use the priority-only diagnostic

$$
\Delta Y_{XY}^{C}
=
Y_{X,E\to R}
-Y_{Y,E\to R}
-\Delta Y_{XY}^{\mathrm{src}}
-\Delta Y_{XY}^{\mathrm{sel}}
-\Delta Y_{XY}^{\mathrm{dust/plasma}}
-\Delta Y_{XY}^{\mathrm{cal}}.
$$

Here $Y_{X,E\to R}$ is the logarithmic path-history propagation factor already used below, while the subtraction terms record source evolution, survey selection, dust/plasma propagation, and calibration. A transparent photon-channel branch should predict whether $\Delta Y_{XY}^{C}$ vanishes within tolerance for the declared class and band pair. A nonzero residual is allowed only if the same Noether sea state and photon-channel ledger explain the band dependence without stochastic image blurring, undeclared absorption/re-emission, or a band-specific redshift law.

Quasar count data add a separate source-population pressure. The observed distribution cannot be read directly as a distance law until the luminosity function, survey selection, obscuration, lensing, source evolution, and redshift-transfer map are separated. A compact comparison form is

$$
N_Q(z,L,\hat{\mathbf n})
=
\int
\Phi_Q(L',t,\Theta_{\mathrm{env}})
S_{\mathrm{survey}}(L',z,\hat{\mathbf n})
P_{\mathrm{class}}(Q\mid\mathcal D)
T_z(\mathcal S_{E\to R})
\,d\Theta_{\mathrm{env}}\,dL',
$$

where $\Phi_Q$ is the source-population model, $S_{\mathrm{survey}}$ is the survey selection function, $P_{\mathrm{class}}$ is the classification probability, and $T_z$ is the redshift-transfer extraction from the restricted source-to-receiver record. The closure burden is to use quasar counts as a decomposition benchmark, not as standalone evidence for or against a cosmology ontology.

### Candidate Noether Sea Core Factorization

The more substrate-facing version should use the local Noether sea core cadence itself as the clock. Let $\Omega_N(\mathbf X,T)$ be the representative local Noether sea core cadence and $T_N(\mathbf X,T)=2\pi/\Omega_N(\mathbf X,T)$ its cycle period. Relative to a weak homogeneous reference core, define the candidate endpoint deformation factor

$$
\Gamma_N(\mathbf X,T)
\equiv
\frac{T_N(\mathbf X,T)}{T_{N0}}
=
\frac{\Omega_{N0}}{\Omega_N(\mathbf X,T)}.
$$

Here $\Gamma_N=1$ marks the reference weak-sea cadence, while $\Gamma_N>1$ marks a locally slowed or stretched Noether sea core cadence. In a homogeneous Lorentz-closure branch, this factor should reduce to the appropriate moving-core deformation factor only after the Noether braid geometry and clock extraction have been derived; schematically one expects $\Gamma_N\to(1-\beta_N^2)^{-1/2}$ in the validated limit.

For a spectral transition family $X$, introduce three dimensionless factors:

- $B_X(E)$: source-branch factor, equal to $1$ when the internal transition gap is the clean reference branch and different from $1$ when local source conditions genuinely alter the transition before propagation;
- $\mathcal{L}_{E\to R}(\hat{\mathbf{k}})$: directional launch factor from source motion and emission direction, normalized so values above $1$ compress the phase train toward the receiver and values below $1$ stretch it;
- $\mathcal{P}_{E\to R}$: path-history propagation factor through the intervening Noether sea, normalized so $\mathcal{P}_{E\to R}>1$ is net redward phase stretching.

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
\mathbb{U}_{\text{now}}=S(T),
$$

where $S(T)$ contains the source branch, receiver state, Noether sea cadence, medium flow, causal wakes, and photon path-history ledger. The central question is whether one Noether sea transport law can compute $\Gamma_N$, $D_v$, and $\mathcal{P}_{E\to R}$ from $S(T)$ without switching explanations case by case.

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

The first symbolic absolute-record law should be written as one extraction map on the restricted state record:

$$
\mathfrak T_X
\!\left[
\mathcal S_{X,E\to R}
\right]
=
\left(
\Gamma_{N,E},\,
\Gamma_{N,R},\,
B_X(E),\,
D_v,\,
Y_{X,E\to R}
\right),
\qquad
\mathcal P_{E\to R,X}
=
\exp(Y_{X,E\to R}).
$$

The path factor should be segmented before it is collapsed to one scalar. For a source-to-receiver route decomposed into ordered segments $s\in\mathcal{P}_{E\to R}$, such as source halo, void, cluster or lens region, plasma-rich region, and receiver environment, require
$$
Y_{X,E\to R}
=
\sum_{s\in\mathcal{P}_{E\to R}}
Y_{X,s},
\qquad
Y_{X,s}
=
\int_{\gamma_s}
\alpha_{\mathrm{prop},X}
\!\left[
S(t_s),
\Theta_s
\right]\,ds.
$$
The segment record
$$
\Theta_s
=
\left(
\theta_{\mathrm{sea},s},
\Theta_{\mathrm{plasma},s},
\Theta_{\mathrm{lens},s},
\Theta_{\mathrm{src/sel},s},
\mathcal{R}_{\mathrm{coh},s}
\right)
$$
keeps environmental effects explicit. A valid fixed-void redshift branch may later show that many $Y_{X,s}$ combine into an effective smooth path term, but it must first demonstrate that source-environment, void, lensing, plasma, and receiver contributions can be removed or bounded without hiding scattering, image blurring, or band-dependent frequency loss.

### Matter Assembly Redshift Consistency

The source question "does matter redshift too?" should not be read as a new cosmological redshift mechanism. The useful target is stricter: the same restricted absolute record that produces photon-frequency transfer must also state what happens to nearby matter assemblies and local Noether sea cells. If a source region, receiver region, or intervening medium changes its internal cadence, branch state, or growth variables, those changes must be projections of the same $S(T)$ used by $\mathfrak T_X$, not a second cosmology state chosen after the photon record is fit.

For a matter assembly or effective component family $M$, define a companion extraction map

$$
\mathfrak M_M
\!\left[
\mathcal S_{M;E\to R}
\right]
=
\left(
\Gamma_{N,M},\,
B_M(E),\,
\Theta_{\mathrm{asm},M},\,
\mathbf g_{\mathrm{growth},M},\,
\mathcal R_{M\leftrightarrow X}
\right),
$$

where $\Gamma_{N,M}$ is the Noether sea cadence factor sampled by the matter assembly or component, $B_M(E)$ records any real source-branch or internal-gap retuning, $\Theta_{\mathrm{asm},M}$ records the local assembly state that supplies matter density, pressure, or line-emission context, and $\mathbf g_{\mathrm{growth},M}$ is the growth or clustering projection consumed by the distance-ladder comparison. The cross-consistency residual $\mathcal R_{M\leftrightarrow X}$ must compare these matter-side entries against the photon-side factors $\Gamma_N$, $B_X(E)$, $D_v$, and $\mathcal P_{E\to R}$ after both maps are restricted to the same Noether sea state, source history, and receiver history.

The first admissible closure target is therefore

$$
\mathcal R_{M\leftrightarrow X}
=
\left\|
\Pi_{MX}\mathfrak M_M[\mathcal S_{M;E\to R}]
-
\Pi_{XM}\mathfrak T_X[\mathcal S_{X,E\to R}]
\right\|
\le
\epsilon_{MX},
$$

with $\Pi_{MX}$ and $\Pi_{XM}$ projecting to the shared Noether sea cadence, source-branch, endpoint, and growth coordinates. A failure means the model has fit photon redshift and matter evolution with incompatible restrictions of the universe record. A pass would not say that ordinary matter photons and matter assemblies "redshift" in the same way; it would say that photon frequency, source-branch retuning, matter clock/cadence response, and growth variables are all extracted from one ledger-disciplined medium history.

The endpoint factors come from the same cadence-stretch row used in the clock chapter,

$$
\Gamma_{N,Q}
=
\exp
\!\left[
\mathbf b_N\cdot\mathbf g_N(Q)
+
\mathcal R_{\Gamma,Q}
\right],
\qquad
\mathbf g_N
=
\left(
\ln n,\ln\chi_{\text{sea}},\ln\lambda,-\ln\xi,
\ln\frac{R_{\text{core}}}{R_{\text{core},0}}
\right)^T.
$$

The launch factor is the endpoint phase-compression record. In the weak-velocity limit,

$$
D_v
=
\frac{
1-\boldsymbol\beta_R\cdot\hat{\mathbf k}
}{
1-\boldsymbol\beta_E\cdot\hat{\mathbf k}
}
\exp(\mathcal R_v),
\qquad
\boldsymbol\beta_Q=\frac{\mathbf v_Q}{c_{\gamma,Q}},
$$

where $\mathcal R_v$ carries higher-order and multi-root Jacobian corrections from the causal ledger. The propagation term is the path integral

$$
Y_{X,E\to R}
=
\int_{\gamma_{E\to R}}
\alpha_{\mathrm{prop},X}[S(t_s)]\,ds,
$$

with first path-rate ansatz

$$
\alpha_{\mathrm{prop},X}
=
\mathbf p_X\cdot
\frac{d\boldsymbol\theta_{\mathrm{sea}}}{ds}
+
p_{\nu,X}
\frac{\partial_\nu J_\nu}{f_N+\epsilon_f}
+
p_{u,X}\nabla\cdot\mathbf u_{\mathrm{sea}}
+
\mathcal R_{\mathrm{coh},X},
\qquad
\boldsymbol\theta_{\mathrm{sea}}
=
\left(
\ln n,\ln\chi_{\text{sea}},\ln\lambda,-\ln\xi
\right)^T.
$$

This law is falsified if $\mathbf b_N$, $\mathbf p_X$, $D_v$, or $\mathcal R_{\mathrm{coh},X}$ must be redefined between gravitational redshift, ordinary relative-motion redshift, and gentle deep-space redshift. The allowed difference between cases is the restricted $S(T)$ record supplied to the same map, not a change of explanatory class.

### Noether-Core Equilibrium Transport Hypothesis

A sharper candidate for the deep-space term is an equilibrium transport law over Noether braid cadence states. The hypothesis is that most Noether sea cores interact primarily with neighboring Noether braids, while photons, neutrinos, and stronger disturbances provide sparse probe or perturbation channels. If a representative core cadence is written as $\nu_N$, the local core energy scale is

$$
E_N=h\nu_N.
$$

Individual transitions may occur as $h$-scale ledger steps, while a large asynchronous population can still produce a smooth coarse-grained cadence drift. The single-core mechanism is cadence-scale retuning: an accepted $\Delta A_{\mathrm{cyc}}=\pm h$ transaction changes the closure ledger and is resolved by shifts in cadence, layer radii, envelope scale, envelope ratio, orientation, strain, or neighbor coupling. In the simplest fixed-speed estimate, $R_N\nu_N\approx\text{constant}$, so higher cadence implies a smaller representative scale and lower cadence implies a larger one.

Let $f_N(\nu,\mathbf X,T)$ denote the local distribution of Noether braid cadence states. The cadence-space current should be interpreted as the ensemble flux

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
\partial_T f_N
+\nabla\cdot(\mathbf{u}_{\mathrm{sea}}f_N)
+\partial_\nu J_\nu
=
S_{\mathrm{BH}}
+S_{\mathrm{GW}}
-R_{\mathrm{eq}}[f_N].
$$

Here $J_\nu$ is the frequency-space current between neighboring cadence states, $S_{\mathrm{BH}}$ records medium loading from strong-field recycling sites, $S_{\mathrm{GW}}$ records gravitational-wave disturbances of the medium state, and $R_{\mathrm{eq}}[f_N]$ records local neighbor equilibration. This equation is not yet canon closure. It is a concrete place to ask whether SMBH recycling can feed a bulk movement from high-energy recycling zones toward lower-energy Noether sea states while preserving conservation, image sharpness, line coherence, and supernova time-dilation consistency.

The expansionary implication is conditional. If $J_\nu=0$ after coarse-graining, or if the source and equilibration terms cancel without a signed large-scale current, then local equilibrium alone does not create an expansion-like redshift slope. The hypothesis becomes cosmologically relevant only when the same $f_N$ record produces a nonzero path-rate term in $\alpha_{\mathrm{prop},X}$, and hence a nonzero contribution to $\mathcal{P}_{E\to R}$, without being reinterpreted as generic photon energy loss.

Directional residuals are part of the canon, not optional postprocessing. A redshift-distance fit must expose

$$
\Delta O_X(z,\hat{\mathbf{n}})
=
O_X^{\mathrm{obs}}(z,\hat{\mathbf{n}})
-
O_X^{\mathrm{iso}}(z),
$$

with monopole, dipole, and higher directional terms tested against the same Noether sea variables that determine the clock and transport maps. A residual dipole must not be hidden inside $H(z)$, $w(z)$, or calibration constants.

## Survey Benchmark Translation

The CMB / BAO / supernova source family sharpens the redshift-distance mapping into a multi-rung translation problem. Standard cosmology packages report distances and parameters as if $a(t)$ and $H(t)$ were the native background variables. In this mapping file they are observer-level summary variables extracted from the same source, endpoint, path-history, and calibration record. The comparison target is therefore not a scalar best-fit $H_0$, but a ladder of mutually compatible extractions:

$$
\mathfrak D_X[\theta_{\mathrm{sea}},\nu_X]
\longrightarrow
\left(
z_X,\,
D_L^X,\,
D_A^X,\,
D_M^X,\,
D_H^X,\,
D_V^X,\,
r_d^X,\,
\mu_X,\,
H_{\mathrm{eff},X}
\right),
$$

where $\nu_X$ carries survey provenance, calibration choices, masks, redshift corrections, and covariance construction. The superscript $X$ labels the observable family, not a different medium state. Closure requires the projections of $\theta_{\mathrm{sea}}$ consumed by CMB, BAO, SN, local-ladder, lensing, and growth rows to agree on their shared coordinates.

### BAO Standard-Ruler Row

For BAO comparisons retain the standard observer-level distances

$$
D_H(z)=\frac{c_0}{H(z)},
\qquad
D_M(z)=(1+z)D_A(z),
\qquad
D_V(z)=
\left[
zD_M^2(z)D_H(z)
\right]^{1/3}.
$$

The BAO data-product vector is then

$$
\mathbf b_{\mathrm{BAO}}^\theta(z_i)
=
\left(
\frac{D_M^\theta(z_i)}{r_d^\theta},
\frac{D_H^\theta(z_i)}{r_d^\theta},
\frac{D_V^\theta(z_i)}{r_d^\theta}
\right),
$$

with missing components removed for an isotropic-only bin. In $\mathbb{A}\mathbb{A}\mathbb{A}$, $r_d^\theta$ is not a primitive ruler painted onto an expanding void. It is the effective acoustic-calibration length recovered from the pre-recombination thermalization and propagation branch. The closure test is whether the same branch that fixes CMB acoustic structure also fixes the BAO ruler used by DESI-style distance rows.

### Supernova and Local-Ladder Row

For supernovae and SH0ES-style ladder comparisons, the observer-level distance modulus remains

$$
\mu^\theta(z,\hat{\mathbf n})
=
5\log_{10}
\left(
\frac{D_L^\theta(z,\hat{\mathbf n})}{\mathrm{Mpc}}
\right)
+25
+\Delta_{\mathrm{cal}}^\theta(\nu_{\mathrm{SN}}),
$$

where $\Delta_{\mathrm{cal}}^\theta$ records calibration and standardization context rather than a physical redshift term. The local inferred coefficient should be extracted from the corrected propagation residual,

$$
H_{\mathrm{eff,ladder}}^\theta(\hat{\mathbf n})
=
c_0
\left.
\frac{\partial Z_{\mathrm{prop},X}(R,\hat{\mathbf n})}{\partial R}
\right|_{R\in\mathcal L},
$$

where $\mathcal L$ is the declared low-redshift ladder range after peculiar-velocity and environment cuts. This prevents Cepheid/SN calibration, local flow correction, endpoint cadence, and path-history propagation from being collapsed into one undiagnosed $H_0$ offset.

### CMB Anchor Row

The CMB comparison supplies both thermal and geometric summaries:

$$
\mathbf c_{\mathrm{CMB}}^\theta
=
\left(
\theta_*^\theta,\,
\omega_b^\theta,\,
\omega_c^\theta,\,
\tau^\theta,\,
A_s^\theta,\,
n_s^\theta,\,
\mathbf C_{\ell,\mathrm{TTTEEE}}^\theta,\,
\mathbf C_L^{\phi\phi,\theta}
\right).
$$

These entries remain effective variables. They constrain the thermalization depth, acoustic scale, damping, lensing, and growth handoff that any redshift-distance branch must inherit. A branch that fits local supernova distances but cannot reproduce CMB blackbody quality, CMB acoustic structure, or CMB lensing from the same medium record has not closed the distance ladder.

### Growth and Frame Consistency

Late-time growth rows such as DES weak lensing, DESI RSD, and future Euclid cosmology products should be attached to the same ladder by

$$
\mathbf g_{\mathrm{growth}}^\theta(z,k)
=
\left(
S_8^\theta,\,
f\sigma_8^\theta(z,k),\,
P^\theta(k,z),\,
\mathbf C_L^{\phi\phi,\theta}
\right).
$$

The repeated $C_L^{\phi\phi}$ entry is intentional: it is the overlap between CMB lensing and late-time growth. If the distance ladder prefers one Noether sea projection while growth prefers another, the failure belongs to shared-state closure, not to a hidden change of ontology.

Frame consistency is the directional version of the same rule. CMB dipole correction, matter dipoles, SN residual directionality, BAO anisotropy, and local $H_0$ scatter must be compared as projections of one frame-state record:

$$
\mathbf y_i-\mathbf m_i(\theta_{\mathrm{frame}},\nu_i),
\qquad
i\in
\{\mathrm{CMB},\mathrm{MD},\mathrm{SN},\mathrm{BAO},H_0\}.
$$

The allowed difference between rows is the data-product context $\nu_i$, not a new rest frame for each observable family.

## Candidate Closure Steps

These rows decompose the case at draft grade. They are not executable queue authority; promote an accepted task into [work-queue.md](work-queue.md) before execution.

1. `redshift_factorization_record` — Derive or falsify the candidate map $1+z_X\approx(\Gamma_{N,E}/\Gamma_{N,R})\mathcal{P}_{E\to R}/(B_X\mathcal{L}_{E\to R})$ from the shared Noether sea core cadence, source-branch, launch-geometry, and path-history records. Status: `draft`.
2. `time_dilation_gate` — Require supernova light-curve dilation and spectral redshift to use the same $\mathcal{Z}$ record. Status: `draft`.
3. `distance_duality_gate` — Test whether $D_L=(1+z)^2D_A$ survives the effective transport map. Status: `draft`.
4. `cmb_bao_handoff` — Route CMB blackbody, BAO scale, and growth variables through one cosmology closure record. Status: `draft`.
5. `directional_residual_gate` — Decompose supernova, BAO, CMB-frame, and local $H_0$ residuals by direction and environment before accepting an isotropic Friedmann-like bridge. Status: `draft`.
6. `propagation_slope_record` — Define the endpoint-subtracted propagation residual $Z_{\mathrm{prop},X}$, derive or bound the path-rate functional $\alpha_{\mathrm{prop},X}$, and recover $H_{0,\mathbb{A}\mathbb{A}\mathbb{A}}=c_0\,\partial Z_{\mathrm{prop},X}/\partial D$ in the clean low-redshift limit. Status: `draft`.
7. `absolute_transport_law_continuation` — Consume the promoted absolute-record constraints and derive or falsify the single map from $S(T)$ to $\Gamma_N$, $D_v$, and $\mathcal{P}_{E\to R}$ across gravitational, relative-motion, and deep-space redshift without changing coefficients or explanatory class per case. Status: `proof-continuation`; corpus scaffold: [noether-sea](../../../content/markdown/aaa/spacetime/noether-sea.md#equilibrium-transport-hypothesis); runtime extractor: `scripts/cosmology/redshift-budget-toy-model.mjs`.
8. `gamma_n_compensated_family` — Consume the promoted minimal static packet for $\Gamma_N$ and decide whether any nonzero density, scale, or core-radius response survives the inverse clock-rate, row-inverse, shared-delay, pressure-response, and hydrogen spectral-row checks. Status: `compensated-family-open`; fixed corpus result: $C_N=\Gamma_N^{-1}$, $\Gamma_N=(\Omega_{\mathrm{clk}}\xi)^{-1}$ in the metric subclass, $b_\xi=1$, and the minimal shared-delay static packet has $(a_n,a_\chi,a_\lambda,a_R)=(0,1+\gamma_{\text{eff}},0,0)$ with $(b_n,b_\chi,b_\lambda,b_R)=(0,(1+\gamma_{\text{eff}})^{-1},0,0)$. Remaining weak-field family: $a_\chi=1+\gamma_{\text{eff}}$ and $b_\chi=(1-b_n a_n-b_\lambda a_\lambda-b_R a_R)/(1+\gamma_{\text{eff}})$ when nonzero density, scale, or core-radius response is admitted. Corpus scaffold: [proper-time-and-time-dilation](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md#gamma-n-geometry-extraction-target); runtime fixture: `scripts/spacetime/static-response-vector-toy-model.mjs`.
9. `cadence_scale_retuning_map` — Derive or falsify the single-core map from an accepted $\Delta A_{\mathrm{cyc}}=\pm h$ transaction to $(\Delta\nu_N,\Delta R_I,\Delta R_M,\Delta R_O,\Delta\lambda,\Delta\xi)$ and show how its coarse-grained average becomes $J_\nu$. Status: `fixture-seeded`; proof scaffold: `content/markdown/aaa/noether-braid/braid-a1-dynamics.md#cadence-scale-retuning-hypothesis`; runtime fixture: `scripts/nested-shell-braid/retuning-map-toy-model.mjs`.
10. `noether_braid_equilibrium_transport` — Derive or falsify the candidate $f_N$ transport law, including $J_\nu$, $S_{\mathrm{BH}}$, $S_{\mathrm{GW}}$, and $R_{\mathrm{eq}}[f_N]$, and test whether it supplies a signed contribution to $\alpha_{\mathrm{prop},X}$ without violating photon coherence gates. Status: `continuity-packet-seeded`.
11. `matter_assembly_redshift_consistency` — Derive or falsify the companion map $\mathfrak M_M[\mathcal S_{M;E\to R}]$ and residual $\mathcal R_{M\leftrightarrow X}$ so matter assembly cadence, source-branch retuning, and growth variables use the same restricted $S(T)$ record as photon redshift factors. Status: `priority-only scaffold`.
12. `discrete_medium_transparency_residual` — Bound transverse diffusion, chromatic delay, polarization drift, and image blur for photon-channel propagation through a discrete Noether sea. Status: `priority-only scaffold`.

## Closure Objects

- Transfer map: $\mathcal{Z}$ from source, path-history, and observer clock records to measured $z$.
- Channel decomposition: $\mathcal{Z}=\mathcal{Z}_{\mathrm{clock}}\oplus\mathcal{Z}_{\mathrm{motion}}\oplus\mathcal{Z}_{\mathrm{prop}}$ until a derivation proves a lower-dimensional representation.
- Candidate factor record: endpoint Noether sea core deformation factors $\Gamma_{N,E},\Gamma_{N,R}$; source-branch factor $B_X(E)$; directional launch factor $\mathcal{L}_{E\to R}$; and path-history propagation factor $\mathcal{P}_{E\to R}$.
- Observable frequency and energy record: $\nu_{\mathrm{obs},X}$ and $E_{\mathrm{obs},X}=h\nu_{\mathrm{obs},X}$ after endpoint cadence, source branch, launch, and path-history factors are separated.
- Endpoint-subtracted propagation residual: $Z_{\mathrm{prop},X}=\ln(1+z_X)-\ln\Gamma_{N,E}+\ln\Gamma_{N,R}+\ln B_X(E)+\ln D_v$.
- Gamma-N geometry extraction row: $\ln\Gamma_N=\mathbf{b}_N\cdot\mathbf{g}_N+\mathcal{R}_{\Gamma}$, with $\mathbf{g}_N=(\ln n,\ln\chi_{\text{sea}},\ln\lambda,-\ln\xi,\ln(R_{\text{core}}/R_{\text{core},0}))^T$; the clock-rate factor is $C_N=\Gamma_N^{-1}$, and in the metric subclass $C_N=\Omega_{\mathrm{clk}}\xi$, so $b_\xi=1$ and $b_i=-\omega_i$ for the isotropic clock-rate row. The weak static endpoint branch fixes $b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1$ for $\ln n=a_nU/c_0^2$, $\ln\chi_{\text{sea}}=a_\chi U/c_0^2$, $\ln\lambda=a_\lambda U/c_0^2$, and $\ln(R_{\text{core}}/R_{\text{core},0})=a_RU/c_0^2$. The signal-delay neighbor is $a_\chi^{\mathrm{sig}}=1+\gamma_{\text{eff}}$ from $\bar{\chi}_{\text{sea}}=1+(1+\gamma_{\text{eff}})U/c_0^2+\cdots$, but equality $a_\chi=a_\chi^{\mathrm{sig}}$ is a shared-channel closure condition, not a definition.
- Shared clock/signal delay residual: $\Delta_\chi^{\mathrm{clk\text{-}sig}}\equiv a_\chi-(1+\gamma_{\text{eff}})$; the shared-delay branch requires $\Delta_\chi^{\mathrm{clk\text{-}sig}}=0$, while nonzero residuals must be carried across PPN delay, clock-redshift, pressure-response, and cosmological redshift packets.
- Static response vector fixture: `scripts/spacetime/static-response-vector-toy-model.mjs`, documented in `content/markdown/aaa/validation/simulations/static-response-vector-toy-model.md`, replays candidate $(a_n,a_\chi,a_\lambda,a_R)$ response vectors against the cadence-stretch row, inverse clock-rate row, row-inverse condition, and shared-delay residual; its pressure bridge also checks $b\cdot\delta\mathbf{g}^{P}=\delta\ln\Gamma_N$, the inverse clock-rate pressure row, effective-speed identity, anisotropic pressure residuals, and optional $\gamma_{\text{eff}}$ sweeps.
- Path-rate functional: $\alpha_{\mathrm{prop},X}=\mathbf p_X\cdot D_{\gamma}\boldsymbol\theta_{\mathrm{sea}}+p_{\nu,X}\mathcal C_N[f_N]+p_{u,X}\nabla\cdot\mathbf u_{\mathrm{sea}}+p_{\sigma,X}\hat k_a\hat k_b\Sigma_{\mathrm{sea},X}^{ab}+\mathcal R_{\mathrm{coh},X}$, where $D_{\gamma}=c_{\gamma}^{-1}\partial_T+\hat{\mathbf k}\cdot\nabla$ and $\mathcal C_N[f_N]=(S_{\mathrm{BH}}+S_{\mathrm{GW}}-R_{\mathrm{eq}}[f_N]-\partial_\nu J_\nu)/(f_N+\epsilon_f)$; acceptance requires image-sharpness, line-coherence, chromaticity, and time-dilation residual bounds.
- Minimal redshift-budget fixture: $Y_{X,j+1}=Y_{X,j}+\alpha_{\mathrm{prop},X,j}\Delta s_j$, with $\mathcal{P}_{E\to R,X}=\exp(Y_{X,N})$; documented in `content/markdown/aaa/validation/simulations/redshift-budget-toy-model.md` with runtime fixture `scripts/cosmology/redshift-budget-toy-model.mjs`. The fixture now accepts `continuity_transport_by_line` packets that compute $\alpha_{\mathrm{prop},X,j}$ from $\mathbf p_X\cdot\mathbf d_{\theta,j}$, $(S_{\mathrm{BH}}+S_{\mathrm{GW}}-R_{\mathrm{eq}}-\partial_\nu J_\nu)/(f_N+\epsilon_f)$, $\nabla\cdot\mathbf u_{\mathrm{sea}}$, anisotropic projection, and coherence residue.
- Endpoint/launch runtime extractor: `endpoint_records` computes $\Gamma_N$ from `Gamma_N`, `T_N_over_T_N0`, `Omega_N_over_Omega_N0`, or weak-field `Phi_N_over_c0_squared`; `launch_record` computes $D_v$ from `beta_r`, `radial_velocity_km_s`, or endpoint velocity projection along $\hat{\mathbf{k}}$; `extraction_logs` records whether each factor came from record extraction or scalar fallback.
- Dark-energy handoff target: $\partial_T\boldsymbol{\theta}_\gamma=\mathbf{J}_{\mathrm{DE}}\mathbf{q}_{\mathrm{DE}}+\partial_T\boldsymbol{\theta}_{\gamma,\mathrm{local}}$, where $\mathbf{q}_{\mathrm{DE}}$ carries $\partial_{t_{\mathrm{eff}}}\ln\rho_{\mathrm{DE,eff}}$, $\partial_{t_{\mathrm{eff}}} w_{\mathrm{eff}}$, $\mathcal{S}_{\mathrm{sea}}/\rho_{\mathrm{DE,eff}}$, and $\mathcal{S}_{\mathrm{BH}}/\rho_{\mathrm{DE,eff}}$.
- First-order dark-energy coefficient row: $\boldsymbol{\lambda}_X^T=(a_\chi^X\ a_n^X\ a_R^X)\mathbf{J}_{\mathrm{DE}}$, giving $\alpha_{\mathrm{prop},X}^{\mathrm{DE}}=c_\gamma^{-1}\boldsymbol{\lambda}_X^T\mathbf{q}_{\mathrm{DE}}$ and, in the homogeneous continuity branch, a solved $H_{\mathrm{eff},X}^{\mathrm{DE}}$ transfer slope.
- Runtime coefficient packet: `dark_energy_transport_by_line` in `scripts/cosmology/redshift-budget-toy-model.mjs`, which converts a declared $\boldsymbol{\lambda}_X$ row and `q_DE_per_s` or `q_DE_per_mpc` record into additive `dark_energy.*` path-rate terms.
- Effective Hubble slope: $H_{0,\mathbb{A}\mathbb{A}\mathbb{A}}(\hat{\mathbf{k}},X)=c_0\,\partial Z_{\mathrm{prop},X}/\partial D$ in the corrected nearby limit.
- Absolute-record transport map: $\mathfrak{T}_X[\mathcal{S}_{X,E\to R}]=(\Gamma_{N,E},\Gamma_{N,R},B_X(E),D_v,Y_{X,E\to R})$ from one restricted $S(T)$ record containing the source branch, receiver branch, Noether sea cadence, medium flow, causal wakes, and photon path-history ledger relevant to the measured line; the path-rate row must use the same continuity-disciplined $\mathcal C_N[f_N]$ term in gravitational, relative-motion, and deep-space cases.
- Matter assembly consistency map: $\mathfrak M_M[\mathcal S_{M;E\to R}]=(\Gamma_{N,M},B_M(E),\Theta_{\mathrm{asm},M},\mathbf g_{\mathrm{growth},M},\mathcal R_{M\leftrightarrow X})$ with $\mathcal R_{M\leftrightarrow X}\le\epsilon_{MX}$ only when the matter-assembly and photon-channel projections use the same Noether sea state, source history, and receiver history.
- Cadence-scale retuning map: an accepted $\Delta A_{\mathrm{cyc}}=\pm h$ transaction maps one core closure label into another through $\mathcal{R}_{\mathrm{cyc}}^{(q,\sigma)}=(\Delta\nu_N,\Delta R_I,\Delta R_M,\Delta R_O,\Delta\lambda,\Delta\xi)$, with the ensemble average supplying the candidate current $J_\nu\sim f_N\langle\dot{\nu}_N\rangle_{\Delta A_{\mathrm{cyc}}=\pm h}$ and first estimate $J_\nu=\sum_\sigma f_N r_\sigma\Delta\nu_N^{(q,\sigma)}+O((\Delta\nu_N)^2\partial_\nu f_N)$.
- Retuning-map toy fixture: `scripts/nested-shell-braid/retuning-map-toy-model.mjs` with documentation in `content/markdown/aaa/validation/simulations/retuning-map-toy-model.md`; this fixture solves the linearized constrained compliance problem and reports branch speed gates plus net $J_\nu$.
- Noether braid equilibrium transport packet: $f_N(\nu,\mathbf X,T)$, $J_\nu$, $S_{\mathrm{BH}}$, $S_{\mathrm{GW}}$, $R_{\mathrm{eq}}[f_N]$, and the projection from that packet into $\alpha_{\mathrm{prop},X}$ through the fixed row $\Theta_X=(\mathbf b_N,\mathbf p_X,p_{\nu,X},p_{u,X},p_{\sigma,X})$.
- Discrete-medium transparency residual:
  $$
  \mathcal{R}_{\mathrm{gran\text{-}tr}}
  =
  w_{\perp}\langle\Delta\mathbf{k}_{\perp}^{2}\rangle_L
  +w_{\omega}\operatorname{Var}_X(\Delta Y_X)
  +w_t\Delta t_{\gamma}
  +w_{\Pi}\Delta\Pi_{\gamma}.
  $$
  This row is the granular Noether sea version of the tired-light negative control. It permits coherent cadence or path-history transfer only if transverse momentum diffusion, line-family chromaticity, photon timing, and polarization drift stay below the image-sharpness and time-dilation tolerances already carried by the transport packet.
- Cosmology acceptance vector: $(z,D_L,D_A,H(z),T_{\mathrm{CMB}},P(k),f\sigma_8)$.
- Shared medium variables: $\rho_{\text{NS}}(\mathbf X,T)$, $n(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, and $\mathcal{M}_{\mathrm{sea}}^{ab}$.
- Frame-consistency record for CMB, matter dipoles, supernova directionality, BAO anisotropy, and local $H_0$ scatter.
- Shared-state residual gate: one $\theta_{\mathrm{sea}}$ must project into SN, BAO, CMB, weak-lensing, redshift-space-distortion, and BBN comparison packets without per-family replacement.

### Current Coefficient-Row Status

The first candidate row is

$$
\Theta_X
=
\left(
\mathbf b_N,\,
\mathbf p_X,\,
p_{\nu,X},\,
p_{u,X},\,
p_{\sigma,X}
\right),
\qquad
\mathbf b_N
=
\left(
b_n,b_\chi,b_\lambda,1,b_R
\right).
$$

Solid constraints promoted to the corpus: the homogeneous moving-core branch fixes $b_\xi=1$; weak static endpoint recovery fixes $b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1$; shared clock/signal delay replaces $a_\chi$ by $1+\gamma_{\text{eff}}$ only when $\Delta_\chi^{\mathrm{clk\text{-}sig}}=0$; the minimal shared-delay static packet is $(a_n,a_\chi,a_\lambda,a_R)=(0,1+\gamma_{\text{eff}},0,0)$ and $(b_n,b_\chi,b_\lambda,b_R)=(0,(1+\gamma_{\text{eff}})^{-1},0,0)$; pure relative-motion recovery has $Z_X=-\ln D_v$ and $Y_X=0$ in a homogeneous record; endpoint-subtracted deep-space replay uses the continuity-disciplined path row without changing coefficients between cases.

Uncertain claims staged for the next proof packet:

| Component | Current status | Observable that would falsify the freedom |
| --- | --- | --- |
| $(a_n,a_\lambda,a_R)$ | Zero in the minimal shared-delay static packet; free only in the compensated family. | Finite-height clock redshift, hydrogen spectral conversion, pressure-response replay, or endpoint-subtracted redshift records require nonzero density, scale, or core-radius response in the same weak static branch. |
| $(b_n,b_\lambda,b_R)$ | Zero in the minimal packet; free only with $b_\chi=(1-b_n a_n-b_\lambda a_\lambda-b_R a_R)/(1+\gamma_{\text{eff}})$. | The compensated row closes the endpoint sum but fails inverse clock-rate, row-inverse, Shapiro-delay, pressure-response, or spectral-row checks. |
| $a_\chi=1+\gamma_{\text{eff}}$ | Fixed only inside the shared clock/signal delay branch; otherwise $\Delta_\chi^{\mathrm{clk\text{-}sig}}$ must be carried as a residual. | Clock redshift and Shapiro-delay comparisons require different first-order $\chi_{\text{sea}}$ responses after channel and normalization differences are accounted for. |
| $\mathbf p_X$ | Free path-gradient row until independent segment records vary $D_\gamma\boldsymbol\theta_{\mathrm{sea}}$. | Clean-line chromaticity or endpoint-subtracted redshift residuals correlate with gradients in a way no single $\mathbf p_X$ can replay across line and cadence records. |
| $p_{\nu,X}$ | Free cadence-residual coefficient until $\mathcal C_N[f_N]$ is independently derived from the $f_N$ transport packet. | Supernova time-dilation and spectral redshift require different cadence residual rows, or an independently measured $\mathcal C_N[f_N]$ gives the wrong propagation slope. |
| $p_{u,X}$ | Free flow-divergence coefficient until large-scale Noether sea flow is constrained by the same redshift record. | Directional residuals or local-ladder offsets track $\nabla\cdot\mathbf u_{\mathrm{sea}}$ with a sign or amplitude incompatible with the fixed row. |
| $p_{\sigma,X}$ | Free anisotropic-response coefficient until beam and direction records vary $\Sigma_{\mathrm{sea},X}^{ab}$. | Image-bundle variance, anisotropic redshift residuals, or line-family splits exceed tolerance when the same $p_{\sigma,X}$ is used. |

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | [mapping-cosmology](../mapping-cosmology/priorities.md) | Convert narrative cosmology into a component transfer-function queue. |
| This file | [validation-gates](../dormant-deferred/validation-gates/priorities.md) | Add cosmology failure witnesses for frame split, image blur, and incompatible transport limits. |
| This file | [Radiation](../../../content/markdown/aaa/reactions/radiation.md) | Keep CMB photon loading tied to local radiation event ledgers. |

## Failure Modes

- `cosmology.tired_light_failure`: redshift loses supernova time dilation, surface-brightness, or image-sharpness constraints.
- `cosmology.channel_blend`: endpoint clock-rate comparison, relative motion, and propagation are collapsed into one fitted scalar before the shared transport law is derived.
- `cosmology.energy_loss_leak`: $\mathcal{P}_{E\to R}$ is treated as generic photon energy loss rather than phase-cadence path-history with image-sharpness, coherence, and time-dilation constraints.
- `cosmology.path_rate_continuity_split`: the path-rate law uses $\partial_\nu J_\nu$, source loading, equilibration, flow divergence, or anisotropic response as independent fit knobs instead of the continuity-balanced $\mathcal C_N[f_N]$ record and declared medium-response tensor.
- `cosmology.absolute_record_split`: $\Gamma_N$, $B_X(E)$, $D_v$, and $Y_X$ are fit from incompatible restrictions of $S(T)$ rather than one absolute redshift record.
- `cosmology.matter_photon_record_split`: matter assembly cadence, source-branch retuning, or growth variables are fit from a different Noether sea state, source history, or receiver history than the photon redshift record.
- `cosmology.scalar_factor_leak`: endpoint or launch factors are inserted as free scalars when the underlying endpoint cadence or velocity records are available, hiding whether $\Gamma_N$ and $D_v$ were extracted from the same absolute record.
- `cosmology.transport_case_switch`: gravitational, relative-motion, and deep-space redshift are fit by changing the coefficient rows or explanatory class instead of changing only the restricted $S(T)$ record supplied to $\mathfrak T_X$.
- `cosmology.clock_signal_delay_split`: the same branch uses different first-order $\chi_{\text{sea}}$ responses for Shapiro delay and clock redshift without carrying $\Delta_\chi^{\mathrm{clk\text{-}sig}}$ as an explicit residual.
- `cosmology.static_response_vector_underclosure`: candidate $(a_n,a_\chi,a_\lambda,a_R)$ vectors close one weak-field row while failing the endpoint, inverse clock-rate, row-inverse, or shared-delay constraints.
- `cosmology.dark_energy_coefficient_split`: the dark-energy coefficient row fits a redshift slope but fails chromaticity, cadence, image-sharpness, or shared-state projection checks.
- `cosmology.equilibrium_current_null`: the proposed Noether braid equilibrium law relaxes to zero signed $J_\nu$ or cancels source terms, so it cannot supply an expansion-like path-rate contribution.
- `cosmology.retuning_continuum_leak`: a model treats discrete one-core $h$-scale retunings as smooth single-core frequency drift and loses the branch ledger needed to define $J_\nu$.
- `cosmology.no_admissible_retuning`: the constrained retuning problem has no branch-admissible solution for $\Delta A_{\mathrm{cyc}}=\pm h$, so the proposed current must be treated as a branch transition, rejection event, or failed closure rather than a smooth equilibrium contribution.
- `cosmology.gw_transport_overload`: gravitational-wave perturbation terms produce path-rate noise, dispersion, or beam variance above image-sharpness, timing, or gravitational-wave-speed tolerances.
- `cosmology.frame_split`: CMB, BAO, supernova, and local-Hubble corrections use incompatible rest-frame records.
- `cosmology.directional_absorption`: dipole or environment residuals are absorbed into $H(z)$, $w(z)$, or calibration constants instead of being derived from the shared Noether sea state.
- `cosmology.thermalization_gap`: CMB blackbody quality is asserted without a thermalization depth and photon-loading ledger.
- `cosmology.void_expansion_leak`: effective $a(t)$ is described as fundamental expansion of the Euclidean void.
