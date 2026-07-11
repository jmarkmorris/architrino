# Dark Matter in $\mathbb{A}\mathbb{A}\mathbb{A}$

This chapter maps the standard dark-matter phenomenology onto substrate candidates available inside $\mathbb{A}\mathbb{A}\mathbb{A}$. The central task is to explain gravitational clustering without visible electromagnetic coupling, using assemblies or medium responses that belong to the same [Euclidean void](../foundations/euclidean-void.md) and [Noether sea](../spacetime/noether-sea.md) framework as the rest of the theory.

The opening establishes the ontology and the criteria for what counts as dark in this setting. The later sections compare candidate substrates, summarize the current hybrid working baseline, and connect the picture to cosmological growth and observational interfaces.

## Scope and Purpose

Standard $\Lambda\mathrm{CDM}$ cosmology attributes roughly 27% of the present energy budget to cold dark matter (CDM)—a pressureless, non-baryonic component that clusters gravitationally but couples negligibly to electromagnetic radiation. This chapter maps dark-matter phenomenology onto $\mathbb{A}\mathbb{A}\mathbb{A}$ assembly ontology and identifies candidate substrates.

Throughout, "dark matter" refers to the set of phenomena conventionally attributed to CDM: flat galaxy rotation curves, cluster lensing offsets, the third acoustic peak of the CMB, large-scale structure growth, and BBN-consistent $\Omega_b$. The task is to explain this phenomenology within one ontology—Euclidean void, absolute time, architrinos, and Noether braid assemblies—without importing new fundamental fields or ad hoc modifications to gravity.

The dark-matter density entry is an observationally constrained bookkeeping requirement before it is a substrate identification. Lensing, growth, CMB matter loading, cluster offsets, and baryon-fraction constraints require an effective gravitating component beyond ordinary baryons, but the component ledger does not by itself decide whether the native carrier is neutral assemblies, Noether sea response, or a hybrid branch.

The historical route through spiral-galaxy rotation curves should not make those curves look like the whole evidence base. A branch that explains flat rotation curves has only solved one nonlinear galaxy-scale residual. It must still recover CMB acoustic matter loading, CMB lensing, BAO and large-scale-structure transfer shape, cluster offsets, and BBN baryon accounting from the same Noether sea and neutral-assembly record. This is why a MOND-like or medium-response success at galaxy scale cannot by itself remove the dark-sector burden.

## $\mathbb{A}\mathbb{A}\mathbb{A}$ Ontology Foundations

### The Noether Sea as Gravitational Medium

In $\mathbb{A}\mathbb{A}\mathbb{A}$, the Noether sea is a dense coupled population of neutral Noether braid assemblies occupying the fixed Euclidean void. In the nested shell case, each Noether braid consists of three nested electrino-positrino binaries (inner, middle, outer), with net charge zero and internal dynamics spanning the three field-speed regimes ($v > c_f$, $v = c_f$, $v < c_f$). Gravity is not a fundamental force but an emergent medium-response effect: local variations in Noether braid density $\rho_{\text{NS}}(\mathbf X,T)$ and normalized density $n(\mathbf X,T)$ alter the Noether sea delay factor $\chi_{\text{sea}}(\mathbf X,T)$ and the transmission of delayed causal flux, producing observer-level geodesic deviation and an effective metric $g_{\mu\nu}^{\text{eff}}$ experienced by assemblies.

Massive composite assemblies (protons, atoms, stars) are Noether braid configurations with axial layers (the current leading candidate realization is the [spindle braid](../noether-braid/spindle-braid.md)); they locally compress the Noether sea, increasing $\rho_{\text{NS}}$ and changing $\chi_{\text{sea}}$ for effective signal propagation. This compression is the substrate-level origin of the Newtonian potential $\Phi_N$ in the weak-field limit. The effective gravitational constant $G$ is related to Noether sea compliance—how readily the Sea density responds to stress from embedded matter (see [spacetime/emergent-metric.md](../spacetime/emergent-metric.md)).

### What Counts as "Dark" in this Ontology

A dark-matter candidate in $\mathbb{A}\mathbb{A}\mathbb{A}$ is characterized by two conditions:

- **Gravitational coupling:** The candidate must compress the Noether sea (contribute to effective $\rho_{\text{NS}}$ and $n$ gradients) and therefore deflect light and accelerate baryonic matter.
- **Electromagnetic transparency:** The candidate must couple negligibly to photon assemblies modeled as coaxial contra-rotating pro/anti planar pairs so that it neither emits, absorbs, nor scatters electromagnetic radiation at detectable levels.

Two substrate-level mechanisms can satisfy these conditions, either separately or together.

### Strong-Lensing Inference Guardrail

Strong gravitational lensing is a high-value dark-sector constraint, but it is an inverse problem rather than a direct image of dark matter. In the standard thin-lens comparison language, source-plane and image-plane positions satisfy

$$
x_{\mathrm{src,eff}}^i
=
x_{\mathrm{img,eff}}^i
-
\nabla_{\mathrm{eff}}^i\psi_{\mathrm{lens,eff}}(x_{\mathrm{img,eff}}^i),
\qquad
\Delta_{\mathrm{eff}}\psi_{\mathrm{lens,eff}}(x_{\mathrm{img,eff}}^i)=2\kappa_{\mathrm{eff}}(x_{\mathrm{img,eff}}^i)
$$

where $\psi$ is the observer-level lensing potential and $\kappa$ is the convergence, i.e. the surface mass density in critical-density units.
The layer-explicit observer-chart version is
$$
y_{\mathrm{eff}}^i
=
x_{\mathrm{eff}}^i
-
\gamma_{\mathrm{eff}}^{ij}\partial_{x_{\mathrm{eff}}^j}\psi_{\mathrm{eff}}(x_{\mathrm{eff}}^i),
\qquad
\gamma_{\mathrm{eff}}^{ij}\partial_{x_{\mathrm{eff}}^i}\partial_{x_{\mathrm{eff}}^j}\psi_{\mathrm{eff}}(x_{\mathrm{eff}}^i)
=
2\kappa_{\mathrm{eff}}(x_{\mathrm{eff}}^i)
$$

The layer-explicit local image distortion is encoded by the Jacobian

$$
(A_{\mathrm{eff}})^i{}_j(x_{\mathrm{eff}}^k)
\equiv
\frac{\partial y_{\mathrm{eff}}^i}{\partial x_{\mathrm{eff}}^j}
=
(1-\kappa_{\mathrm{eff}})
\begin{pmatrix}
1-g_1 & -g_2\\
-g_2 & 1+g_1
\end{pmatrix}
$$

where $g_1$ and $g_2$ are reduced-shear components. For two resolved images $i$ and $j$ of the same background source, the image-to-image transformation has the local form

$$
T_{ij}
=
A_{\mathrm{eff}}(x_{\mathrm{eff},j}^k)^{-1}A_{\mathrm{eff}}(x_{\mathrm{eff},i}^k)
$$

This transformation constrains local reduced shear and relative convergence near the observed images. It does not by itself determine a unique global mass map in regions not sampled by the light bundles. For a candidate medium-and-assembly record $\theta$, let $\psi_\theta$ define the projected observer-level lensing potential, let $A_\theta(x_{\mathrm{eff}}^i)$ be its local Jacobian, and let

$$
T_{ij}^{\theta}
=
A_\theta(x_{\mathrm{eff},j}^i)^{-1}A_\theta(x_{\mathrm{eff},i}^i)
$$

The data-supported local part of the lensing comparison can then be recorded as

$$
\mathcal{R}_{\mathrm{local\ lens}}(\theta)
=
\sum_{(i,j)}
\left(T_{ij}^{\mathrm{obs}}-T_{ij}^{\theta}\right)^T
C_{ij}^{-1}
\left(T_{ij}^{\mathrm{obs}}-T_{ij}^{\theta}\right)
$$

where $C_{ij}$ is the covariance model for the measured image-to-image transformation. This residual tests what the multiple-image data constrain before a global mass profile is imposed.

The remaining global map should be labeled by how much of its convergence field is supported near the observed images. If the image centers are $x_{\mathrm{eff},i}^i$ with declared support widths $\sigma_i$, define

$$
w_{\mathrm{img}}(x_{\mathrm{eff}}^i)
=
\max_i
\exp\!\left(
-\frac{\|x_{\mathrm{eff}}^i-x_{\mathrm{eff},i}^i\|^2}{2\sigma_i^2}
\right)
$$

Then the inferred convergence can be reported in two pieces,

$$
M_{\mathrm{supported}}
=
\int_\Omega
w_{\mathrm{img}}(x_{\mathrm{eff}}^i)\,\kappa_\theta(x_{\mathrm{eff}}^i)\,d^2x_{\mathrm{eff}},
\qquad
M_{\mathrm{extrapolated}}
=
\int_\Omega
\left(1-w_{\mathrm{img}}(x_{\mathrm{eff}}^i)\right)\kappa_\theta(x_{\mathrm{eff}}^i)\,d^2x_{\mathrm{eff}}
$$

These are not new dark-sector variables. They are inference-discipline diagnostics: $M_{\mathrm{supported}}$ records the part of the projected map close to the local lensing constraints, while $M_{\mathrm{extrapolated}}$ records the model-projected part that must be justified by priors, weak-lensing data, gas dynamics, galaxy kinematics, CMB lensing, or the shared Noether sea state record.

Cluster-scale dark-matter maps therefore require an explicit inference ledger: which features are forced by local image transformations, which depend on feature matching, and which enter through lens-model priors such as light-traces-mass assumptions, thin-lens geometry, profile smoothness, line-of-sight compression, or interpolation across data-poor regions.

For $\mathbb{A}\mathbb{A}\mathbb{A}$, this does not weaken lensing as a recovery target. It sharpens the target. A neutral-assembly or medium-response explanation must recover the local lensing data first, then survive the global model comparison without hiding mass in unconstrained regions or changing assumptions per cluster. If a dark-sector claim survives only through model freedom away from the multiple-image constraints, it remains an inference artifact candidate rather than a closed substrate claim.

### CMB-Lensing Inference Guardrail

CMB lensing supplies a different but equally important dark-sector constraint. It does not image a local cluster mass distribution. It reconstructs the integrated lensing potential between the last-scattering surface and the observer from distortions of the microwave background. In standard comparison language the data product is the lensing-potential spectrum $C_L^{\phi\phi}$, and the dark-sector interpretation enters only after a model maps that spectrum to a matter distribution and growth history.

For $\mathbb{A}\mathbb{A}\mathbb{A}$, the conservative requirement is therefore two-stage:

1. recover the CMB-lensing observable $C_L^{\phi\phi}$ from the same CMB history used for TT/TE/EE, damping, and blackbody preservation;
2. project that lensing record into the same neutral-assembly density $\rho_A$, Noether braid density $\rho_{\text{NS}}(\mathbf X,T)$, and medium-response variables used by the structure-formation module.

A dark-matter interpretation fails if it treats CMB lensing as direct proof of one substrate while using a different Noether sea state to fit galaxy clustering, weak lensing, or cluster offsets.

### Cluster-Offset Inference Gate

Cluster mergers such as the Bullet Cluster are high-pressure dark-sector tests because gravitational lensing, X-ray gas, and galaxy-light distributions separate during the event. They are not, however, direct photographs of a substrate. The retained data product is the ensemble of local lensing constraints, centroid offsets, gas-dynamical records, galaxy-tracer distributions, line-of-sight priors, and covariance assumptions used to infer the mass map.

For a candidate medium record $\theta_{\mathrm{sea}}$ and neutral-assembly density $\rho_A$, let $\mathcal{P}_{\mathrm{cl}}(\theta_{\mathrm{sea}},\rho_A)$ project the model into that cluster-observable packet. A compact cluster-offset residual is

$$
\mathcal{R}_{\mathrm{cl\ offset}}(\theta_{\mathrm{sea}},\rho_A)
=
\left\|
D_{\mathrm{cl}}^{\mathrm{obs}}
-
\mathcal{P}_{\mathrm{cl}}(\theta_{\mathrm{sea}},\rho_A)
\right\|_{C_{\mathrm{cl}}^{-1}}^2
+
\mathcal{R}_{\mathrm{lens\ prior}}
+
\mathcal{R}_{\mathrm{gas}}
+
\mathcal{R}_{\mathrm{shared}}(\theta_{\mathrm{sea}})
$$

Here $D_{\mathrm{cl}}^{\mathrm{obs}}$ is the retained cluster-offset data packet and $C_{\mathrm{cl}}$ records the covariance of the lensing, gas, and tracer reconstruction. The residual should be evaluated across an ensemble of merging clusters, not treated as a one-image proof. A pure medium-response branch fails this gate only when

$$
\inf_{\theta_{\mathrm{sea}}:\rho_A=0}
\mathcal{R}_{\mathrm{cl\ offset}}(\theta_{\mathrm{sea}},0)
>
\varepsilon_{\mathrm{cl}}
$$

with the same lensing priors, gas model, and shared Noether sea state record used to test the neutral-assembly or hybrid branch. Passing the gate does not by itself prove a collisionless neutral-assembly interpretation; it shows that the candidate branch has recovered the cluster-offset observable without changing the inference stack per system.

### Local Missing-Baryon Benchmark

The local missing-baryon relation is a useful dark-sector benchmark because it compares two retained data products without deciding the substrate in advance: the observed condensed baryonic mass

$$
M_b = M_\star + M_g
$$

and the enclosed dynamical mass $M_{200}$ inferred from kinematics or weak gravitational lensing. Let

$$
m_b^{\mathrm{obs}}(M_b)
=
\frac{M_b}{M_{200}^{\mathrm{obs}}}
$$

record the observed baryonic mass fraction. A 2026 baryonic mass-halo mass compilation reports that systems from dwarfs through rich clusters are summarized by

$$
m_b^{\mathrm{obs}}(M_b)
\simeq
f_b
\tanh\!\left(\frac{M_b}{M_0}\right)^{1/4},
\qquad
f_b \simeq 0.157,
\quad
M_0 \simeq 5\times 10^{13}M_\odot.
$$

Rich clusters approach the cosmic baryon fraction, while lower-mass systems fall below it with a smooth mass dependence. For $\mathbb{A}\mathbb{A}\mathbb{A}$ this is not a reason to import either a MOND ontology or a $\Lambda\mathrm{CDM}$ halo ontology. It is a cross-scale recovery target for the same neutral-assembly and Noether sea record: the branch must recover the galaxy baryonic Tully-Fisher relation, the mass-dependent baryon fraction, and the cluster lensing/gas behavior without changing calibration per regime.

For a candidate shared record, define the local missing-baryon residual as

$$
\mathcal{R}_{\mathrm{local\ baryon}}(\theta_{\mathrm{sea}},\rho_A)
=
d_{\mathrm{BTFR}}\!\left(
D_{\mathrm{BTFR}}^{\mathrm{obs}},
D_{\mathrm{BTFR}}^\theta
\right)
+
d_m\!\left(
\frac{M_b}{M_{200}^{\theta}},
f_b
\tanh\!\left(\frac{M_b}{M_0}\right)^{1/4}
\right)
+
\lambda_{\mathrm{cl}}\mathcal{R}_{\mathrm{cl\ offset}}(\theta_{\mathrm{sea}},\rho_A)
+
\lambda_{\mathrm{shared}}
d_{\mathrm{shared}}\!\left(
\Pi_{\mathrm{gal/cl}}\theta_{\mathrm{sea}},
\Pi_{\mathrm{cos}}\theta_{\mathrm{sea}}
\right).
$$

Here $D_{\mathrm{BTFR}}^{\mathrm{obs}}$ is the retained baryonic Tully-Fisher data packet, $D_{\mathrm{BTFR}}^\theta$ is the branch prediction from the same medium-and-assembly record, and $M_{200}^{\theta}$ is the model's dynamical or lensing projection. The velocity factor $f_v=V_f/V_{200}$ belongs inside the same comparison. A fit cannot remove the missing-baryon trend by retuning $f_v$ unless that retuning remains compatible with rotation curves, weak-lensing velocities, rich-cluster baryon closure, CMB loading, and the cluster-offset residual above.

### Shared Dark-Sector Scale Gate

Some quantum-gravity comparison programs try to relate the dark-matter and dark-energy problems through one scale. In this chapter that signal is useful only as a closure discipline. The $\mathbb{A}\mathbb{A}\mathbb{A}$ claim is not that dark matter and dark energy are one imported object; it is that any proposed relation between them must be carried by the same Noether sea state record used by the dark-energy, growth, lensing, and CMB modules.

Let $\theta_{\mathrm{sea}}$ be the shared Noether sea state record, let $\Pi_{\mathrm{DE}}\theta_{\mathrm{sea}}$ be its dark-energy projection, and let $\Pi_{\mathrm{DM}}\theta_{\mathrm{sea}}$ be its dark-matter projection. If a candidate relation $F_{\mathrm{DM}}$ maps the dark-energy-side projection into the dark-matter-side variables, a minimal shared-scale residual is

$$
\mathcal{R}_{\mathrm{dark\ scale}}(\theta_{\mathrm{sea}})
=
\left\|
\Pi_{\mathrm{DM}}\theta_{\mathrm{sea}}
-
F_{\mathrm{DM}}\!\left(\Pi_{\mathrm{DE}}\theta_{\mathrm{sea}}\right)
\right\|_{C_{\mathrm{DM/DE}}^{-1}}^2
+
\mathcal{R}_{\mathrm{shared}}(\theta_{\mathrm{sea}})
$$

Here $C_{\mathrm{DM/DE}}$ is the covariance or weighting model for the joint dark-sector comparison, and $\mathcal{R}_{\mathrm{shared}}$ is the shared calibration residual from [Dark Energy](./dark-energy.md#inference-dependency-and-calibration-gates). A dark-sector scale relation is promotable only if this residual stays small without assigning one Noether sea state to dark-energy data and another to dark-matter data. If the relation fits one observable family by changing $\theta_{\mathrm{sea}}$ for another, it remains an interpretation artifact rather than a substrate claim.

## Candidate Substrates

### Candidate A — Neutral Assembly Populations

**Definition.** Neutral Noether braid assemblies that lack exposed charged polar sites in their axial layers. The minimal examples are:

- **Neutrino-class assemblies:** pro-orientation Noether braids with balanced axial layers ($3\epsilon_+ + 3\epsilon_-$). These are the SM neutrinos themselves; their masses ($\sum m_\nu < 0.12$ eV from cosmological bounds) are too small to account for the full $\Omega_{\mathrm{DM}}$, but they contribute to the hot dark-matter fraction and to $N_{\mathrm{eff}}$.

- **Heavier neutral assemblies (hypothetical):** Noether braids carrying axial patterns that are globally neutral and whose internal dynamics suppress electromagnetic coupling below detection thresholds. In $\mathbb{A}\mathbb{A}\mathbb{A}$ these would be assemblies whose axial layers cancel in both net charge and oscillating dipole moment, analogous to the neutrino's balanced axial layer but realized on a heavier Noether braid. The mass scale is set by internal binding energy, shielding, and medium-dressed response to the Noether sea.

- **Primordial Noether braid defects:** dense, self-gravitating clusters of maximally contracted Noether braids produced in the high-energy epoch, analogous to primordial black holes in standard cosmology but with internal maximum-curvature structure replacing singular interiors. Their mass spectrum depends on formation-epoch dynamics. The analogy is a benchmark, not an identification: a native defect branch would have to inherit the compact-object mass-function, BBN/CMB/growth, local-ephemeris, high-energy-flux, and null-result checks without importing primordial-black-hole ontology.

**Behavior.** These assemblies are pressureless at late times (kinetic energy $\ll$ rest energy), cluster gravitationally, and are collisionless on galactic scales because their interaction cross-section with baryonic and electromagnetic assemblies is negligible (no exposed charge → no long-range dipole coupling). They therefore reproduce the canonical CDM clustering phenomenology: hierarchical structure formation, flat rotation curves from halo profiles, and the correct matter-loading signature in the CMB.

In a cluster-merger interpretation, neutral assemblies remain collisionless while baryonic gas assemblies decelerate electromagnetically, yielding natural separation between gravitating and X-ray-bright components.

Compact neutral candidates also have a local-detection gate. For a candidate branch with representative mass $M_A$, local fraction $f_A$, and relative speed distribution centered at $\langle v_{\mathrm{rel}}\rangle$, the expected flyby rate inside impact parameter $b_{\max}$ is estimated by
$$
\Gamma_{\mathrm{flyby}}(b_{\max},M_A)
=
\frac{f_A\rho_{\mathrm{DM}}}{M_A}\,
\pi b_{\max}^2\,
\langle v_{\mathrm{rel}}\rangle
$$
A nearby passage gives the order-of-magnitude impulse
$$
\Delta v_{\mathrm{test}}
\simeq
\frac{2GM_A}{b\,v_{\mathrm{rel}}}
$$
before detailed $N$-body and relativistic corrections. The retained observable is the ephemeris residual, not the compact-object interpretation: a candidate detection must produce a trajectory-consistent perturbation above the ranging error floor, fail ordinary visible-object and catalogued-asteroid explanations under the same covariance model, and carry any high-energy co-signature through the same branch record.

A compact dark-candidate branch also admits a track-search comparison in old material. For a candidate compact fraction $f_X$, mass $M_X$, local dark-sector density $\rho_{\mathrm{DM}}$, and relative-speed distribution with mean $\langle v_{\mathrm{rel}}\rangle$, the flux estimate is
$$
\Phi_X
=
\frac{f_X\rho_{\mathrm{DM}}}{M_X}
\langle v_{\mathrm{rel}}\rangle,
\qquad
N_{\mathrm{track}}
=
\Phi_X A_{\mathrm{scan}}T_{\mathrm{age}}P_{\mathrm{surv}}P_{\mathrm{det}}
$$
Here $A_{\mathrm{scan}}$ is the scanned cross-section, $T_{\mathrm{age}}$ is the exposure time of the material, $P_{\mathrm{surv}}$ is the survival probability of the track under thermal, geological, and mechanical erasure, and $P_{\mathrm{det}}$ is the detection efficiency after morphology cuts. The residual is not simply a count mismatch:
$$
\mathcal{R}_{\mathrm{track}}
=
\frac{|N_{\mathrm{track}}-N_{\mathrm{track}}^{\mathrm{obs}}|}{\epsilon_N}
+
\mathcal{R}_{\mathrm{morph}}
+
\mathcal{R}_{\mathrm{ordinary}}
$$
The morphology term requires the candidate track to match the predicted energy-deposition and damage profile for the branch, while $\mathcal{R}_{\mathrm{ordinary}}$ penalizes fits explained by ordinary radiation, defects, inclusions, machining damage, or impact history. A null search becomes a constraint on $f_X(M_X)$ only after the survival and detection functions are declared; a positive search becomes a compact-object claim only after the same branch also passes the BBN, CMB, ephemeris, and high-energy co-signature tests.

### Candidate B — Noether Sea Medium Response

**Definition.** Non-linear elastic or dispersive response of the Noether sea itself under low-acceleration or low-density-gradient conditions. In regions where the effective gravitational acceleration falls below a characteristic scale $a_0^{\mathrm{MOND}}$, the Noether sea's compliance (inverse stiffness) may change, altering the effective force law. This local notation keeps the galactic acceleration threshold distinct from the rest-attractor length scale $a_0$ used in Lorentz-kinematics chapters.

**Mechanism sketch.** In the nested shell case, each Noether braid in the Noether sea has a minimum restoring-force threshold set by the outer-binary binding. Below the corresponding acceleration scale, the Noether sea deforms more easily per unit stress—the effective $G$ increases with decreasing acceleration. This is structurally analogous to MOND ($\mu(a/a_0^{\mathrm{MOND}})\,a = a_N$) but derived from assembly elasticity rather than postulated. In the canonical Master EOM, part of this response can be understood as a constitutive shift in how the Noether sea organizes receiver-normal delayed flux under low-strain conditions: the same source population can produce a different received effective pull when branch geometry and local receiver crossing state change. The transition function $\mu$ would then emerge from the outer-binary response curve as a function of the local strain rate $\nabla\Phi / a_0^{\mathrm{MOND}}$.

**Characteristic scale.** The MOND acceleration $a_0^{\mathrm{MOND}} \approx 1.2 \times 10^{-10}\;\mathrm{m\,s}^{-2}$ is suggestively close to horizon-scale accelerations such as $c_0 H_0/(2\pi)$ and, in some entropic-gravity comparisons, $c_0 H_0/6$. In $\mathbb{A}\mathbb{A}\mathbb{A}$, those coefficients are comparison pressure rather than imported doctrine. The native question is whether the same Noether sea response law that supplies the effective Hubble history also yields the galaxy-scale transition acceleration.

Conformal-gravity comparisons sharpen the same pressure without being imported as ontology. Their galaxy-rotation route makes the missing low-acceleration term depend on a large-scale contribution tied to the cosmological background, rather than only on additional local halo substance. The safe $\mathbb{A}\mathbb{A}\mathbb{A}$ translation is that a galaxy-scale acceleration residual may depend on the same Noether sea state record that supplies the effective Hubble history. A branch still fails if it fits rotation curves with that shared scale while changing records for CMB loading, cluster offsets, lensing, BAO, supernova, or growth.

A compact cross-scale target is

$$
a_0^{\mathrm{MOND}}
\stackrel{?}{=}
\alpha_H\,c_0\,H_{\mathrm{eff}}^\theta(t_{\mathrm{obs}}),
\qquad
\alpha_H \in \left\{\frac{1}{6},\frac{1}{2\pi}\right\}
\quad\text{as comparison coefficients.}
$$

For a shared Noether sea record $\theta$, define the low-acceleration comparison residual

$$
\mathcal{R}_{\mathrm{low}\text{-}a}(\theta,\alpha_H)
=
\left|
\log
\frac{
a_0^{\mathrm{MOND}}
}{
\alpha_H c_0 H_{\mathrm{eff}}^\theta(t_{\mathrm{obs}})
}
\right|
+
d_{\mathrm{RAR}}\!\left(\mathrm{RAR}^{\theta},\mathrm{RAR}^{\mathrm{obs}}\right)
+
\lambda\,\mathcal{R}_{\mathrm{shared}}(\theta)
$$

Here $\mathrm{RAR}^{\theta}$ is the radial-acceleration relation predicted by the coupled neutral-assembly plus medium-response model, $\mathrm{RAR}^{\mathrm{obs}}$ is the observed relation, and $\mathcal{R}_{\mathrm{shared}}$ is the cosmology shared residual in [Dark Energy](./dark-energy.md#inference-dependency-and-calibration-gates). If no value of $\alpha_H$ follows from the Noether sea response law while preserving CMB loading, cluster offsets, BAO, supernova, growth, and lensing constraints, the horizon-scale coincidence remains a heuristic rather than a derived result.

**Limitations.** A pure medium-response account faces well-documented difficulties:
- Reproducing cluster-scale lensing/gas centroid separation without a collisionless component.
- Matching acoustic-peak matter loading in pre-decoupling dynamics.
- Producing the correct large-scale transfer-function shape in $P(k)$.
- Preserving the large-scale inverse-square force profile inferred from kSZ halo-pair velocities. The retained halo-pair benchmark fits $g(r)\propto r^{-n}$ with $n=2.1\pm0.3$ on $30$--$230\,\mathrm{Mpc}$ scales, so a pure MOND-like branch with an unscreened $n\simeq1$ profile on that window is not viable without a native screening or regime-separation mechanism.

These difficulties motivate retaining Candidate A as the primary dark-matter substrate, with Candidate B contributing corrections.

### Candidate C — Hybrid (Working Baseline)

**Definition.** Neutral assemblies carry the dominant non-baryonic gravitating mass ($\Omega_{\mathrm{DM}} \sim 0.25$), while Noether sea response provides scale-dependent corrections that modify effective profiles in low-acceleration environments.

**Rationale.** This hybrid is the working baseline because:

- Neutral assemblies handle the heavy lifting: CMB matter loading, large-scale power spectrum, cluster-merger offset behavior, and BBN consistency ($\Omega_b$ remains small).
- Medium response can address observed tensions at galaxy scale—the diversity of rotation-curve shapes, the radial-acceleration relation (RAR) tightness, and possible deviations from pure NFW profiles—without introducing additional free parameters per galaxy.
- The two contributions arise from the same ontological substrate (Noether braid assemblies in Euclidean void with absolute time) and are coupled: neutral assemblies compress the Sea, which in turn responds non-linearly, feeding back on the effective potential.
- If residual discrepancies concentrate in regions of strong Noether sea contraction or steepening contraction gradient, especially toward galactic centers and SMBH environments, that pattern would be naturally suggestive of medium-response contributions rather than of an entirely separate particulate sector.

### Why Hybrid Is Required (Closure Summary)

| Construction | Main strength | Main failure risk |
|:---|:---|:---|
| Pure neutral-assembly | Handles CMB loading, BAO/$P(k)$ shape, and cluster collisionless behavior | Can underperform on low-acceleration galaxy phenomenology without added response channels |
| Pure medium-response | Captures MOND-like galaxy-scale behavior naturally | Struggles with Bullet-Cluster offsets and full CMB matter-loading closure |
| Hybrid baseline | Combines cosmology-scale closure with galaxy-scale flexibility | Requires constitutive calibration discipline to avoid over-parameterized tuning |

**Coupled equations (schematic).** Let $\rho_A(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$ denote the observer-level neutral-assembly density and $\rho_{\text{NS}}(\mathbf X,T)$ the native Noether braid density. In the Newtonian limit, the effective Poisson equation becomes:

$$
\gamma_{\mathrm{eff}}^{ij}\partial_{x_{\mathrm{eff}}^i}\partial_{x_{\mathrm{eff}}^j}\Phi_{\mathrm{eff}} = 4\pi G_{\mathrm{eff}}(\gamma_{\mathrm{eff}}^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\mathrm{eff}},\rho_{\text{NS}},n)\,\bigl(\rho_b + \rho_A + \delta\rho_{\text{NS}}^{(\mathrm{pert})}\bigr)
$$

where $\rho_b$ is baryonic density, $\delta\rho_{\text{NS}}^{(\mathrm{pert})}$ is the perturbative Sea response above its cosmological mean, and $G_{\mathrm{eff}}$ carries the Noether sea response modification. In the high-acceleration limit ($|\nabla\Phi| \gg a_0^{\mathrm{MOND}}$), $G_{\mathrm{eff}} \to G_N$ and $\delta\rho_{\text{NS}}^{(\mathrm{pert})} \to 0$; in the low-acceleration limit, $G_{\mathrm{eff}}$ stiffens and $\delta\rho_{\text{NS}}^{(\mathrm{pert})}$ may contribute an effective "phantom" density that mimics additional dark matter.

This coupled system must be solved self-consistently. The neutral-assembly component $\rho_A$ satisfies collisionless Boltzmann transport in the potential $\Phi_{\mathrm{eff}}$; the Noether sea response enters through constitutive relations derived from Noether braid elasticity in the Noether sea.

### Scalar-Fluid and MOND-Extension Comparison Gate

Khoury-style hybrid models supply a useful comparison framework because they separate two burdens that are often blended in dark-sector prose: a nearly pressureless component can recover the expansion history and linear growth, while a distinct nonlinear force law accounts for galaxy rotation curves and cluster gas profiles. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this is not evidence for imported scalar fields. It is a discipline for the hybrid baseline: the neutral-assembly sector must carry the linear CDM-like loading, and the Noether sea response sector must carry the low-acceleration nonlinear residual without allowing either side to be retuned independently.

The comparison acceleration law can be recorded as

$$
a_{\mathrm{cmp}}(a_N; a_\star,f)
=
\begin{cases}
a_N, & a_N\gg a_\star,\\
\sqrt{a_Na_\star}, & a_\star/f^2\ll a_N\ll a_\star,\\
f\,a_N, & a_N\ll a_\star/f^2,
\end{cases}
$$

where $a_N$ is the baryonic Newtonian benchmark acceleration, $a_\star$ is the environment-dependent low-acceleration transition scale, and $f$ is the ultra-low-acceleration inverse-square enhancement. For the $\mathbb{A}\mathbb{A}\mathbb{A}$ hybrid branch these are not new constants. They are observer-level summaries of a shared Noether sea state:

$$
a_\star^\theta(E)=
A_\star
\left(
\Pi_E\theta_{\mathrm{sea}},
\rho_{\mathrm{bar}},
\rho_A,
\mathcal{M}_{\mathrm{sea}}^{ab},
\mathcal{H}_{\mathrm{src/rel}},
\mathcal{T}_{\mathrm{path}}
\right),
\qquad
f^\theta(E)=
F_\star
\left(
\Pi_E\theta_{\mathrm{sea}},
\mathcal{I}_{\mathrm{loc}}^\theta
\right)
$$

with $E$ denoting an environment class such as spiral galaxies, pressure-supported dwarfs, clusters, or diffuse absorbers. $\mathcal{H}_{\mathrm{src/rel}}$ records compact-source, feedback, release, and capture history, while $\mathcal{T}_{\mathrm{path}}$ records transport loading that changes the local Noether sea state. The environment label is therefore not a private fit bucket: a viable branch must reproduce the galaxy radial-acceleration relation in the middle regime while allowing clusters to fall in the ultra-low-acceleration regime without assigning a separate medium record to each class.

A compact residual is

$$
\mathcal{R}_{a_\star f}(\theta_{\mathrm{sea}})
=
\sum_E
\left[
d_E\!\left(
a_{\mathrm{obs}}(E),
a_{\mathrm{cmp}}\big(a_N(E);a_\star^\theta(E),f^\theta(E)\big)
\right)
+
\lambda_E
d_{\mathrm{shared}}\!\left(
\Pi_E\theta_{\mathrm{sea}},
\Pi_{\mathrm{cos}}\theta_{\mathrm{sea}}
\right)
\right]
$$

This residual is useful because it turns the cluster-versus-galaxy pressure into a falsifiable question. If the observed cluster temperature and lensing profiles require an $a_\star$ scale significantly above the galaxy radial-acceleration scale, that scale shift must be derived from environment-dependent Noether sea density, delay, stress, or neutral-assembly loading. If the same shift is inserted by hand, the branch has reproduced a comparison curve but not closed a native dark-sector mechanism.

Berezhiani-Khoury superfluid dark matter sharpens the same comparison discipline. Its source-level claim is that one dark sector can be CDM-like in cosmology and clusters while producing a MOND-like galactic force through collective low-temperature behavior. In this chapter that signal is not an ontology import: the Noether sea is not identified with a literal superfluid, and the comparison phonon is not added as a new $\mathbb{A}\mathbb{A}\mathbb{A}$ constituent. What survives is the environment split that any hybrid branch must explain from one shared medium-and-assembly record.

For that comparison, introduce source-side observer coordinates for the effective condensate and normal fractions,

$$
\Theta_{\mathrm{cmp}}(E)
\equiv
\frac{T_{\mathrm{cmp}}(E)}{T_{c,\mathrm{cmp}}(E)},
\qquad
\zeta_{\mathrm{cond}}^{\mathrm{cmp}}(E)
\leftrightarrow
\max\!\left(0,1-\Theta_{\mathrm{cmp}}(E)^{3/2}\right),
\qquad
\zeta_{\mathrm{norm}}^{\mathrm{cmp}}(E)
=
1-\zeta_{\mathrm{cond}}^{\mathrm{cmp}}(E)
$$

Here $E$ is an observer-level environment class, such as spiral galaxies, pressure-supported dwarfs, clusters, or the cosmological background. The temperature ratio and fractions are comparison coordinates only. A native branch must instead derive their effective values from $\Pi_E\theta_{\mathrm{sea}}$, $\rho_A$, $\rho_{\text{NS}}(\mathbf X,T)$, $n(\mathbf X,T)$, and $\chi_{\text{sea}}(\mathbf X,T)$:

$$
\zeta_{\mathrm{cond}}^{\mathrm{cmp}}(E)
=
Z_{\mathrm{cond}}\!\left(
\Pi_E\theta_{\mathrm{sea}},
\rho_A,
\rho_{\text{NS}}(\mathbf X,T),
n(\mathbf X,T),
\chi_{\text{sea}}(\mathbf X,T)
\right),
\qquad
\zeta_{\mathrm{norm}}^{\mathrm{cmp}}(E)
=
Z_{\mathrm{norm}}\!\left(
\Pi_E\theta_{\mathrm{sea}},
\rho_A,
\rho_{\text{NS}}(\mathbf X,T),
n(\mathbf X,T),
\chi_{\text{sea}}(\mathbf X,T)
\right)
$$

The comparison target is therefore not "make a superfluid." It is the stronger phase-environment closure: galaxy environments should project toward a large low-acceleration response coordinate, cluster environments should retain a substantial CDM-like or normal component, and the cosmological background should remain pressureless enough to preserve CMB loading and growth. The MOND-like part is fixed by the radial-acceleration relation and by the BTFR limit

$$
a_{\mathrm{obs}}(r)\simeq\sqrt{a_N(r)a_0^{\mathrm{MOND}}},
\qquad
v_c^4\simeq G_NM_ba_0^{\mathrm{MOND}}
$$

A compact version of the closure residual is

$$
\begin{aligned}
\mathcal{R}_{\mathrm{phase\ split}}(\theta_{\mathrm{sea}},\rho_A)
=&
\ d_{\mathrm{gal}}\!\left(
D_{\mathrm{RAR/BTFR}}^{\mathrm{obs}},
\mathcal{P}_{\mathrm{gal}}\!\left(\theta_{\mathrm{sea}},\rho_A,\zeta_{\mathrm{cond}}^{\mathrm{cmp}}\right)
\right)
\\
&+
d_{\mathrm{cos+cl}}\!\left(
D_{\mathrm{cos+cl}}^{\mathrm{obs}},
\mathcal{P}_{\mathrm{cos+cl}}\!\left(\theta_{\mathrm{sea}},\rho_A,\zeta_{\mathrm{norm}}^{\mathrm{cmp}}\right)
\right)
\\
&+
\mathcal{R}_{\mathrm{stable\ branch}}(\theta_{\mathrm{sea}})
+
\lambda\,\mathcal{R}_{\mathrm{shared}}(\theta_{\mathrm{sea}}).
\end{aligned}
$$

This residual records the Berezhiani-Khoury pressure in $\mathbb{A}\mathbb{A}\mathbb{A}$ terms. The same $\theta_{\mathrm{sea}}$ must pass the galaxy RAR/BTFR comparison, the cluster temperature/lensing comparison, and the cosmological CDM-like comparison. $\mathcal{R}_{\mathrm{stable\ branch}}$ is included because the source's MOND branch requires finite-temperature stabilization; the native analogue is that a low-acceleration Noether sea response branch must be dynamically stable, not only curve-fit successful.

The legacy Khoury-source lead reinforces the same point: the useful signal is the phase-environment split, not literal superfluid ontology. A galaxy, cluster, diffuse absorber, and cosmological-background environment may project different response coordinates from one Noether sea and neutral-assembly record, but the transition between those coordinates has to be derived from $\Pi_E\theta_{\mathrm{sea}}$ rather than assigned as a separate dark-sector phase per environment.

Ferreira-Franzmann-Khoury-Brandenberger unified-superfluid dark-sector models add a sharper comparison target: late-time acceleration can be driven by the same dark substance if that substance has two distinguishable states whose relative phase is coupled by a Josephson/Rabi interaction. In this chapter that is comparison language, not substrate ontology. The Noether sea is not identified with a literal superfluid, and the phase variables are not introduced as new $\mathbb{A}\mathbb{A}\mathbb{A}$ constituents. What survives is a one-record discipline: the same dark-sector state must carry CDM-like loading, state conversion, late-time acceleration, and the growth history.

Introduce comparison coordinates for two dark-sector populations,

$$
\eta_1^{\mathrm{cmp}}+\eta_2^{\mathrm{cmp}}=1,
\qquad
\varphi_{\mathrm{rel}}^{\mathrm{cmp}}(t)
=
\varphi_2^{\mathrm{cmp}}-\varphi_1^{\mathrm{cmp}}+\Delta E\,t
$$

and the source-side phase-coupling potential

$$
V_J^{\mathrm{cmp}}(t)
=
M_J^4
\cos^2\!\left(
\frac{\varphi_{\mathrm{rel}}^{\mathrm{cmp}}(t)}{2f_J}
\right)
$$

The native branch must derive these comparison coordinates from a medium-and-assembly projection, not fit them independently:

$$
\left(
\eta_1^{\mathrm{cmp}},
\eta_2^{\mathrm{cmp}},
\varphi_{\mathrm{rel}}^{\mathrm{cmp}},
M_J,
\Delta E,
f_J
\right)
=
\mathcal{J}_{\mathrm{dark}}\!\left(
\Pi_{\mathrm{cos}}\theta_{\mathrm{sea}},
\rho_A,
\rho_{\text{NS}}(\mathbf X,T),
n(\mathbf X,T),
\chi_{\text{sea}}(\mathbf X,T)
\right)
$$

The conversion discipline can be recorded in source-term form,

$$
\dot N_1+3H_{\mathrm{eff}}^\theta N_1
=
-Q_J^\theta,
\qquad
\dot N_2+3H_{\mathrm{eff}}^\theta N_2
=
Q_J^\theta,
\qquad
Q_J^\theta
\sim
\Delta E\,\partial_{\varphi_{\mathrm{rel}}}V_J^{\mathrm{cmp}}
$$

so that the total dark-sector count $N_1+N_2$ is conserved while the relative population can evolve. The comparison background equation then becomes

$$
2\dot H_{\mathrm{eff}}^\theta
+3\left(H_{\mathrm{eff}}^\theta\right)^2
\simeq
\frac{V_J^{\mathrm{cmp}}(t)}{M_{\mathrm{Pl}}^2}
$$

as a source-side benchmark for late-time acceleration without adding an independent dark-energy fluid. A native $\mathbb{A}\mathbb{A}\mathbb{A}$ branch may pass this benchmark only if the right-hand side is reconstructed from $\theta_{\mathrm{sea}}$ and $\rho_A$ through $\mathcal{J}_{\mathrm{dark}}$.

The same source also supplies a perturbation-discipline lesson. Unified dark-sector models often fail when the component that imitates dark energy develops too large an adiabatic sound speed and corrupts the matter power spectrum. The comparison therefore imposes the linear pressurelessness condition

$$
c_{s,\mathrm{lin}}^{2,\theta}(a,k)
\ll
1
$$

over the CMB and large-scale-structure regime, while allowing nonlinear galaxy-scale medium response to depart from pressureless CDM. Growth must be tested with both the growth factor $D(z)$ and the growth rate

$$
f_{\mathrm{grow}}(z)
\equiv
\frac{d\ln D}{d\ln a}
=
-\frac{d\ln D}{d\ln(1+z)}
$$

The paper's numerical examples show why this matters: the background history and growth factor can remain close to $\Lambda\mathrm{CDM}$ while the late-time growth rate deviates more strongly. The $\mathbb{A}\mathbb{A}\mathbb{A}$ residual should therefore not stop at an $H(z)$ fit:

$$
\begin{aligned}
\mathcal{R}_{\mathrm{2state}}(\theta_{\mathrm{sea}},\rho_A)
=&
\ d_H\!\left(
2\dot H_{\mathrm{eff}}^\theta
+3\left(H_{\mathrm{eff}}^\theta\right)^2,
\frac{V_J^{\mathrm{cmp}}}{M_{\mathrm{Pl}}^2}
\right)
\\
&+
d_Q\!\left(
\dot N_1+3H_{\mathrm{eff}}^\theta N_1+Q_J^\theta,
\dot N_2+3H_{\mathrm{eff}}^\theta N_2-Q_J^\theta
\right)
\\
&+
d_c\!\left(c_{s,\mathrm{lin}}^{2,\theta},c_{s,\max}^2\right)
+
d_D\!\left(D^\theta,D^{\mathrm{obs}}\right)
+
d_f\!\left(f_{\mathrm{grow}}^\theta,f_{\mathrm{grow}}^{\mathrm{obs}}\right)
+
\lambda\,\mathcal{R}_{\mathrm{shared}}(\theta_{\mathrm{sea}}).
\end{aligned}
$$

This residual is the safe promoted signal from the two-state dark-sector comparison. It tests whether one shared Noether sea state and neutral-assembly record can supply effective acceleration, conserve the total dark-sector count while allowing internal conversion, keep the linear sound speed low, and reproduce growth observations without assigning separate medium histories to dark matter and dark energy.

The source's observational signatures are retained as comparison hooks rather than canonized predictions. Substructure-lensing features associated with vortices, merger behavior controlled by an infall-speed versus sound-speed threshold, mixed cluster lensing peaks, and MOND-free globular clusters are useful only if the native branch supplies corresponding Noether sea or neutral-assembly variables. Without that native map, those signatures remain model-specific to the superfluid-DM comparison.

## Regime Map

The hybrid baseline yields a unified regime architecture:

| Environment | Dominant mechanism | Effective description |
|:---|:---|:---|
| CMB / $z > 100$ | Neutral assemblies | CDM-like: pressureless, collisionless |
| BAO / $10 < z < 100$ | Neutral assemblies + linear medium | CDM + small corrections |
| Cluster scales / $z \sim 0$ | Neutral assemblies (collisionless) | NFW-like profiles; Bullet Cluster offset |
| Galaxy outer regions / low $a$ | Hybrid: assemblies + medium response | RAR tightness; rotation-curve diversity |
| Dwarf galaxies / ultra-low $a$ | Medium response dominant | Possible core-vs-cusp modification |

The boundaries between regimes are set by the ratio $|\nabla\Phi|/a_0^{\mathrm{MOND}}$ and the local Noether sea density gradient. These are continuous transitions within one ontology, not patched models.

## SMBH Recycling and Dark-Sector Flow

In $\mathbb{A}\mathbb{A}\mathbb{A}$ cosmology, supermassive black holes (SMBHs) are recycling furnaces: baryonic and dark-sector assemblies fall in, are processed through the high-energy interior (inner nested shell braid regime, $v > c_f$), and may later re-emerge through several release channels in altered assembly configurations. Jets and radiative outflows remain plausible observer-level manifestations, but they are not the only allowed release morphology. This cycle has implications for the dark sector:

- **Neutral-assembly processing:** If neutral assemblies accrete onto SMBHs, they contribute to the energy budget available for outward release. Re-emitted content may include photons (coaxial contra-rotating pro/anti planar-pair modes), neutrinos, recycled neutral assemblies, or initially dark-sector modes that later convert into visible channels.
- **Dark-sector mass evolution:** Unlike pure $\Lambda\mathrm{CDM}$ where dark matter is strictly conserved and collisionless, $\mathbb{A}\mathbb{A}\mathbb{A}$ permits slow conversion between dark and visible sectors through SMBH processing. This conversion rate must be small enough to preserve $\Omega_{\mathrm{DM}}$ to within Planck-era constraints over cosmological timescales, which places an upper bound on the SMBH dark-matter accretion efficiency.
- **Observable signature (speculative):** If SMBH recycling converts neutral assemblies into electromagnetic-channel products at non-negligible rates, this could produce a correlation between SMBH mass and local dark-matter deficit. This is a mapping target for simulation, not an asserted observational deviation.

## Candidate Assembly Properties

### Mass Scale

The neutral-assembly mass is not a free parameter to be fitted post hoc; it must emerge from the assembly's internal energy ledger, shielding factor, and medium-dressed response to the Noether sea. This is an inertial and gravitational response map, not ordinary dissipative drag. Candidate mass ranges, mapped to observational constraints:

- $m \sim$ eV: warm dark matter; suppresses small-scale structure.
- $m \sim$ keV–GeV: canonical cold dark matter window.
- $m \sim$ GeV–TeV: WIMP-like comparison window, not a neutralino identification.
- $m \gg$ TeV: superheavy; must be produced non-thermally (e.g., gravitational production or SMBH-related formation in early epochs).

The $\mathbb{A}\mathbb{A}\mathbb{A}$ framework does not predict a unique mass; deriving the mass spectrum from first-principles Noether braid binding energies and formation rates is a high-priority simulation target.

A superheavy neutral-lepton comparison branch is useful only as a benchmark, not as imported ontology. In that comparison, a sterile or right-handed singlet near $m_{\nu_R}\sim4.8\times10^8\;\mathrm{GeV}$ behaves as cold, collisionless dark matter if it is stable, decoupled from visible channels, and produced with the observed abundance. The corresponding $\mathbb{A}\mathbb{A}\mathbb{A}$ acceptance record would have to close
$$
\mathcal{B}_{\nu_R\mathrm{DM}}
=
\left(
m_{\nu_R},
\tau_{\nu_R},
\Omega_{\nu_R}h^2,
\lambda_{\mathrm{fs}},
\sigma_{\mathrm{vis}},
\Delta N_{\mathrm{eff}}
\right)
$$
with
$$
\tau_{\nu_R}\gg t_0,
\qquad
\Omega_{\nu_R}h^2\to\Omega_{\mathrm{DM}}h^2,
\qquad
\lambda_{\mathrm{fs}}\ll \lambda_{\mathrm{LSS}},
\qquad
\sigma_{\mathrm{vis}}\le\sigma_{\max},
\qquad
\Delta N_{\mathrm{eff}}\in\mathcal{B}_{\mathrm{BBN/CMB}}
$$
Failure of any row keeps the branch external to the working dark-matter ontology. Passing these rows would still not identify the branch with the current neutral-assembly baseline unless the same internal-energy, shielding, and Noether sea response map derives its mass and coupling suppression.

### Source-Limited WIMP/Neutralino Comparison Benchmark

A WIMP or neutralino comparison is useful here only as detector-facing benchmark language. The Jungman--Kamionkowski--Griest arXiv record used for this comparison exposes the abstract, metadata, table of contents, and source note, but not the full review text; it therefore supplies constraint categories rather than detailed supersymmetric model claims. In this chapter, a neutralino-like benchmark does not identify a native assembly with a superpartner and does not make supersymmetry part of Noether braid ontology.

For any neutral-assembly branch $A$, record the comparison vector

$$
\mathcal{B}_{A}^{\mathrm{WIMP}}
=
\left(
m_A,
\Omega_A h^2,
\langle\sigma v\rangle_A,
\sigma_A^{\mathrm{scalar}},
\sigma_A^{\mathrm{axial}},
\Gamma_{\nu}^{\odot/\oplus},
\Phi_{\bar p},
\Phi_{e^+},
\Phi_\gamma
\right)
$$

The entries track assembly mass, relic abundance, annihilation rate, scalar and axial scattering channels for direct detection, neutrino rates from solar or terrestrial capture, and indirect antiproton, positron, and gamma-ray fluxes. The native branch may pass this benchmark only if one medium-and-assembly record predicts or bounds all entries while satisfying direct-detection, indirect-detection, collider, CMB/BBN, structure-growth, and other relevant null-result constraints. Matching $\Omega_A h^2$ alone is not dark-matter closure; the same branch must also keep scattering and annihilation channels below excluded levels or declare a detectable channel.

### Interaction Cross-Sections

Neutral assemblies interact with each other and with baryonic matter only through:

- **Gravitational coupling** (Noether sea compression): always present; sets halo profiles.
- **Residual short-range coupling:** If the neutral assembly has any non-zero higher-multipole moment (e.g., a quadrupole from internal binary precession), there is a short-range van-der-Waals-like interaction scaling as $r^{-7}$ or steeper. The self-interaction sector can then carry nontrivial velocity dependence.

### Stability

The neutral-assembly candidate must be cosmologically stable: lifetime $\tau \gg t_0 \approx 13.8$ Gyr. In $\mathbb{A}\mathbb{A}\mathbb{A}$, stability follows from the same topological arguments that stabilize the proton: the assembly occupies a deep attractor basin in Noether braid configuration space, and all dissociation channels either violate charge/polarity conservation or require energy input exceeding the cosmological temperature.

## Cosmology Integration

### Pre-Decoupling ($z \gtrsim 1100$)

Neutral assemblies contribute to the total matter density:

$$
\Omega_m = \Omega_b + \Omega_A, \quad \Omega_A \approx 0.25
$$

Their gravitational effect on photon-baryon oscillations produces the characteristic signature in the [CMB](./CMB.md) power spectrum: suppression of odd peaks (baryon loading) with the overall amplitude and peak-height ratios set by $\Omega_A/\Omega_b$.

### Post-Decoupling Growth

Matter perturbations grow as $\delta \propto a$ in the matter-dominated era. The $\mathbb{A}\mathbb{A}\mathbb{A}$ growth equation in the Newtonian limit reads:

$$
\ddot{\delta}_A + 2H\dot{\delta}_A = 4\pi G_{\mathrm{eff}}\,\rho_m\,\delta_m
$$

where $\rho_m = \rho_b + \rho_A$ and $G_{\mathrm{eff}}$ may carry scale-dependent corrections from Noether sea response. In the high-acceleration (linear) regime, $G_{\mathrm{eff}} \to G_N$ and standard CDM growth is recovered. Deviations from $\Lambda\mathrm{CDM}$ growth appear only when $|\nabla\Phi|/a_0^{\mathrm{MOND}} \lesssim 1$, which on cosmological scales ($k < 0.01\;h\,\mathrm{Mpc}^{-1}$) may be relevant at low redshift and could contribute to resolving the $S_8$ tension.

### BAO and Matter Power Spectrum

The matter power spectrum $P(k)$ encodes the transfer function through matter-radiation equality and the BAO wiggles imprinted at decoupling. The neutral-assembly contribution sets the shape of $P(k)$ on scales $k > k_{\mathrm{eq}}$, where $k_{\mathrm{eq}} \propto \Omega_m h^2$.

### $H_0$ and $S_8$ Tensions

The $\mathbb{A}\mathbb{A}\mathbb{A}$ hybrid baseline offers two potential handles on current cosmological tensions:

- **$H_0$ tension:** If neutral-assembly properties (e.g., a non-zero but small self-interaction or a late-time dissociation channel) modify distance-ladder or sound-horizon inference differently from pure CDM, the inferred $H_0$ can shift through one mechanism family.
- **$S_8$ tension:** Scale-dependent medium response can suppress late-time growth at $k \sim 0.1$–$1\;h\,\mathrm{Mpc}^{-1}$, lowering $\sigma_8$ relative to early-time inference while leaving pre-decoupling structure largely unchanged.

## Growth-Module Interface

In the modular cosmology architecture, this chapter connects to other modules through:

- **Input to [CMB.md](./CMB.md):** $\Omega_A h^2$, neutral-assembly equation of state $w_A(z)$ (expected: $w_A = 0$ for CDM-like behavior), and any $\Delta N_{\mathrm{eff}}$ contribution.
- **Input to [structure-formation.md](./structure-formation.md):** $G_{\mathrm{eff}}(a,k)$ from medium-response constitutive relation; neutral-assembly self-interaction cross-section $\sigma(v)/m$.
- **Input from [expansion-mechanism.md](./expansion-mechanism.md):** $H(z)$ and $\Omega_m(z)$ for growth-equation integration.
- **Input from [BBN-constraints.md](./BBN-constraints.md):** $N_{\mathrm{eff}}$ bound constraining allowed neutral-assembly species at MeV temperatures.

All interfaces use the same absolute-time / Euclidean-space substrate and the same Noether sea state variables, ensuring ontological consistency across modules. The cosmology-level framing for those shared interfaces lives in [Cosmology Ontology](./cosmology-ontology.md).

## Summary

Dark-matter phenomenology in $\mathbb{A}\mathbb{A}\mathbb{A}$ is attributed to a hybrid of two mechanisms arising from the same Noether braid substrate:

- **Neutral assemblies** (Candidate A): electromagnetically transparent Noether braid configurations that cluster gravitationally, reproducing CDM-like behavior at cluster and cosmological scales.
- **Noether sea response** (Candidate B): non-linear elastic corrections to effective gravity at low accelerations, providing scale-dependent modifications relevant to galaxy-scale phenomenology.

The working baseline is the hybrid (Candidate C), with neutral assemblies carrying the dominant mass fraction and medium response supplying corrections. Deriving the neutral-assembly mass spectrum, interaction cross-sections, and medium constitutive relations from the master equation is the critical open program.
