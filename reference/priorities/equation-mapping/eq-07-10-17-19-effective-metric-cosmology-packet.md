# EQ-07 Through EQ-10 And EQ-17 Through EQ-19 Effective Metric / Cosmology Packet

## Workstream Metadata

- Kind: `priority-packet`
- Status: `draft`
- Worker mode: `team-agent worker`
- Owned IDs: `EQ-07`, `EQ-08`, `EQ-09`, `EQ-10`, `EQ-17`, `EQ-18`, `EQ-19`
- Owned output file: `reference/priorities/equation-mapping/eq-07-10-17-19-effective-metric-cosmology-packet.md`
- Source priority files: [Equation Mapping Internal Priority](equation-mapping.md), [Equation Mapping Detail](equation.md)
- Scope: priority-only; no reader-facing corpus edits in this packet

## Closure Thesis

These seven line items should be closed as one shared-record packet, not as independent equation matches. The live bridge is:

$$
\text{Noether braid closure}
\rightarrow
(\xi,\Gamma_N,\chi_{\text{sea}},\rho_{\text{NS}})
\rightarrow
g_{\mu\nu}^{\mathrm{eff}}
\rightarrow
(H_{\mathrm{eff}},z,D(z),P(k,z)).
$$

The near-term closure target is a compact carrier followed by a single retained record:

$$
\mathcal C_{07\text{-}10,17\text{-}19}^{(W,X)}
=
\left(
\mathcal N_{\mathrm{sea}}(W),
\mathcal L_{\mathrm{root}}(W),
\mathcal L_{\mathrm{wake}}(W),
\mathcal L_{E\mathbf p\mathbf J}(W),
\mathcal H_{\partial W},
X
\right),
\qquad
\theta
=
\left(
\mathcal C_{07\text{-}10,17\text{-}19}^{(W,X)},
\Pi_{\mathrm{metric}},
\Pi_{\mathrm{red}},
\Pi_{\mathrm{FRW}}
\right).
$$

Its projections supply:

$$
\Pi_{\mathrm{metric}}\theta
\mapsto
\left(
N,\,
u^i_{\text{sea}},\,
e^a{}_i,\,
\gamma_{ij},\,
\Phi_{\mathrm{eff}},\,
\chi_{\text{sea}},\,
\Gamma_N
\right),
$$

$$
\Pi_{\mathrm{red}}\theta
\mapsto
\left(
\Gamma_{N,E},\,
\Gamma_{N,R},\,
B_X(E),\,
D_v,\,
Y_{X,E\to R}
\right),
$$

$$
\Pi_{\mathrm{FRW}}\theta
\mapsto
\left(
a_{\mathrm{eff}},\,
H_{\mathrm{eff}},\,
\rho_{\mathrm{eff}},\,
P_{\mathrm{eff}},\,
G_{\mathrm{eff}},\,
\Lambda_{\mathrm{eff}},\,
k,\,
\mathcal{S}_{\mathrm{eff}}
\right).
$$

The same $\theta$ must supply the weak-field metric rows, the endpoint/source/launch/path redshift rows, and the effective cosmology rows. If the packet needs different Noether sea records for redshift, Shapiro delay, lensing, geodesic acceleration, and effective FRW bookkeeping, the map fails by `equation_map.hidden_retune`.

## Standard Equations And Regimes

| ID | Standard equation / regime | Comparison status |
| --- | --- | --- |
| `EQ-07` | ADM/Cartan effective metric: $ds_{\rm eff}^2=-N^2c_0^2dt^2+\gamma_{ij}(dx^i-u^i_{\text{sea}}dt)(dx^j-u^j_{\text{sea}}dt)$ | Observer-level metric reconstruction from Noether sea state; not substrate curvature. |
| `EQ-08` | Weak-field clock / redshift: $d\tau/dt\approx1+\Phi_N/c_0^2-\|\mathbf w\|^2/(2c_0^2)$ | Endpoint clock and cadence-stretch benchmark; $\Gamma_N$ extraction must be derived. |
| `EQ-09` | Shapiro, lensing, PPN rows: $\Delta\theta=2(1+\gamma_{\mathrm{PPN}})GM/(bc_0^2)+O(c_0^{-4})$ | Weak-field precision benchmark requiring lapse plus spatial compliance, not scalar delay alone. |
| `EQ-10` | Timelike clock action and null/geodesic benchmarks: $S_{\mathrm{clk}}=-mc_0^2\int d\tau$ | Observer-level variational projection of clock, ruler, matter, and signal records. |
| `EQ-17` | Redshift factorization: $1+z_X\approx\Gamma_{N,E}\mathcal{P}_{E\to R}/(\Gamma_{N,R}B_X(E)D_v)$ | Signed frequency-transfer budget across endpoint cadence, source branch, launch geometry, and path history. |
| `EQ-18` | Effective FRW line element: $ds_{\mathrm{FRW,eff}}^2=-c_0^2d\tau_c^2+a_{\mathrm{eff}}^2d\Sigma_k^2$ | Homogeneous/isotropic observer projection of evolving Noether sea state. |
| `EQ-19` | Friedmann and continuity comparison: $H_{\mathrm{eff}}^2=8\pi G_{\mathrm{eff}}\rho_{\mathrm{eff}}/(3c_0^2)-kc_0^2/a_{\mathrm{eff}}^2+\Lambda_{\mathrm{eff}}/3$ | Fixed-void cosmology projection with provenance-bearing source or residual rows. |

## Current Mapped Form

The effective metric map is already form-level mature:

$$
\left(
h_{ij},\,
n,\,
\chi_{\text{sea}},\,
\Phi_{\mathrm{eff}},\,
\nabla\Phi_{\mathrm{eff}},\,
\text{stress},\,
\text{alignment}
\right)
\Rightarrow
\left(
N,\,
u^i_{\text{sea}},\,
e^a{}_i,\,
\gamma_{ij}
\right)
\Rightarrow
g_{\mu\nu}^{\mathrm{eff}}.
$$

The weak-field coefficient scaffold is:

$$
N
=
1
+A_N^n\delta n
+A_N^\chi\delta\chi
+A_N^\Phi\varphi
+Q_N(\delta n,\delta\chi,\varphi,\sigma)
+O(c_0^{-6},\epsilon_{\mathrm{LV}}),
$$

$$
\gamma_{ij}
=
h_{ij}
\left(
1
+A_\gamma^n\delta n
+A_\gamma^\chi\delta\chi
+A_\gamma^\Phi\varphi
\right)
+A_{\gamma,\mathrm{tf}}\sigma^{\mathrm{tf}}_{ij}
+O(c_0^{-4},\epsilon_{\mathrm{LV}}),
$$

$$
u^i_{\text{sea}}
=
B^i{}_j w^j\frac{U}{c_0^2}
+O(c_0^{-5},\epsilon_{\mathrm{LV}}).
$$

The redshift map is already an explicit signed budget:

$$
Z_X[\theta]
\equiv
\ln(1+z_X)
=
\ln\Gamma_{N,E}
-\ln\Gamma_{N,R}
+Y_{X,E\to R}
-\ln B_X(E)
-\ln D_v.
$$

The effective cosmology map is currently a recovery target:

$$
\Pi_{\mathrm{FRW}}\theta
\mapsto
\left(
a_{\mathrm{eff}},H_{\mathrm{eff}},\rho_{\mathrm{eff}},P_{\mathrm{eff}},G_{\mathrm{eff}},\Lambda_{\mathrm{eff}},k
\right),
$$

with residual rows

$$
R_H(\theta)
=
H_{\mathrm{eff}}^2
-
\left(
\frac{8\pi G_{\mathrm{eff}}}{3c_0^2}\rho_{\mathrm{eff}}
-\frac{k c_0^2}{a_{\mathrm{eff}}^2}
+\frac{\Lambda_{\mathrm{eff}}}{3}
\right),
$$

$$
R_\rho(\theta)
=
\dot\rho_{\mathrm{eff}}
+3H_{\mathrm{eff}}
\left(
\rho_{\mathrm{eff}}+\frac{P_{\mathrm{eff}}}{c_0^2}
\right)
-\mathcal{S}_{\mathrm{eff}}.
$$

Here $\mathcal{S}_{\mathrm{eff}}$ is allowed only when it is a projection of assembly association, dissociation, recycling, transport, or Noether sea exchange in the same absolute record $S(t)$.

## Required Noether Braid Variables

| Variable / row | Use in packet |
| --- | --- |
| $\xi=R_{\parallel}/R_{\perp}$ | Moving Noether braid envelope ratio; supplies the homogeneous clock/deformation target $\Gamma_N\to1/\xi\to\gamma$ when that branch closes. |
| $\lambda=R_{\perp}/R_{\perp,0}$ | Separate scale channel; must not be folded into $\xi$ or $\Gamma_N$ without a branch derivation. |
| $R_{\text{core}}/R_{\text{core},0}$ | Representative Noether braid scale entering the $\Gamma_N$ extraction record. |
| $\Omega_N(\mathbf{x},t)$ and $T_N=2\pi/\Omega_N$ | Local Noether sea braid cadence from which $\Gamma_N=\Omega_{N0}/\Omega_N$ is extracted. |
| Branch label $q$ and retained root ledger | Carries the causal-root, clock/ruler, and branch-history data behind the effective metric row. |
| Noether braid orientation, stress, and envelope deformation rows | Feed $e^a{}_i$, $\gamma_{ij}$, $S_{ij}$, anisotropic residuals, and preferred-frame leakage checks. |
| Internal clock phase and event ledger | Required for $d\tau/dt$, $S_{\mathrm{clk}}$, source-branch factor $B_X(E)$, and receiver frequency readout. |

## Required Noether Sea Variables

| Variable / row | Use in packet |
| --- | --- |
| $\rho_{\text{NS}}(\mathbf{x},t)$ and $n=\rho_{\text{NS}}/\rho_{\text{NS},0}$ | Physical and normalized Noether braid density rows for clock, delay, metric, and cosmology projections. |
| $\mathbf{u}_{\text{sea}}$ | Medium drift / flow row for ADM shift, preferred-frame leakage, launch/path separation, and cosmology transport. |
| $\chi_{\text{sea}}=c_f/c_{\text{eff}}$ | Noether sea delay factor; signal and clock use must carry the shared-delay residual if coefficients split. |
| $\chi_\gamma=c_0/c_\gamma$ | Photon-channel delay factor only when photon transport is the explicit subject of $Y_{X,E\to R}$. |
| $\Gamma_N$ and $C_N=\Gamma_N^{-1}$ | Cadence-stretch and clock-rate diagnostics for endpoint redshift and weak-field clocks. |
| $\Phi_{\mathrm{eff}}$ and $\Phi_N$ | Constitutive potential and Newtonian benchmark potential for weak-field matching. |
| $e_{\mathrm{sea}}$, $\boldsymbol\theta_{\mathrm{sea}}$, $S_{ij}$, $\sigma_{ij}^{\mathrm{tf}}$ | Energy, orientation, strain, and stress rows feeding spatial compliance, propagation anisotropy, and cosmology residuals. |
| $\mathcal{M}_{\mathrm{sea}}^{ab}$ | Shared response tensor tying matter response, metric response, and pressure/loading rows. |
| $G_{\mathrm{eff}}$, $\rho_{\mathrm{eff}}$, $P_{\mathrm{eff}}$, $\Lambda_{\mathrm{eff}}$, $a_{\mathrm{eff}}$, $H_{\mathrm{eff}}$ | Effective observer variables only; they summarize the fixed-void Noether sea and assembly record. |

## Rows Needed

| Row family | Required rows | Immediate closure use |
| --- | --- | --- |
| Metric assembly | $N$, $u^i_{\text{sea}}$, $e^a{}_i$, $\gamma_{ij}$, $g_{\mu\nu}^{\mathrm{eff}}$, $\Gamma^\lambda_{\mu\nu}(g^{\mathrm{eff}})$ | Build one effective metric for clock, signal, ruler, acceleration, and PPN projections. |
| Weak-field residual | $R_{\mathrm{red}}$, $R_{\mathrm{Shap}}$, $R_{\mathrm{lens}}$, $R_{\mathrm{acc}}$, $\gamma_{\mathrm{PPN}}-1$, $\beta_{\mathrm{PPN}}-1$, $\alpha_1$, $\alpha_2$, $\alpha_3$ | Prevent scalar-delay-only, redshift-only, or lensing-only closure claims. |
| Clock/cadence extraction | $\mathbf{g}_N=(\ln n,\ln\chi_{\text{sea}},\ln\lambda,-\ln\xi,\ln(R_{\text{core}}/R_{\text{core},0}))^T$, $\mathbf{b}_N$, $\mathcal{R}_{\Gamma}$ | Derive $\Gamma_N=1$, $\Gamma_N\to1/\xi$, and $\Gamma_N\approx1-\Phi_N/c_0^2$ from one extraction row. |
| Redshift factorization | $\Gamma_{N,E}$, $\Gamma_{N,R}$, $B_X(E)$, $D_v$, $Y_{X,E\to R}=\ln\mathcal{P}_{E\to R,X}$ | Separate endpoint, source, launch, and path-history terms without moving terms between factors. |
| Segment energy exchange | $\mathcal{R}_{\nu\text{-}\mathrm{ex},j}$ with $\Delta E_{\mathrm{med},j}$, $\Delta E_{\mathrm{recoil},j}$, $\Delta E_{\mathrm{rem},j}$ | Keep nonzero path-history redshift out of the excluded tired-light class. |
| Path-quality constraints | image-sharpness variance, chromaticity, spectral coherence, and $(1+z)$ time-dilation residuals | Falsify stochastic loss or object-specific propagation coefficients. |
| Effective FRW projection | $a_{\mathrm{eff}}$, $H_{\mathrm{eff}}$, $\tau_c$, $k$, $D(z)$, $\Omega_i^\theta$ | Preserve standard data-product language while keeping the Euclidean void fixed. |
| Friedmann / continuity residual | $R_H$, $R_\rho$, $\mathcal{S}_{\mathrm{eff}}$, $\Delta M_{\mathrm{eff}}$ | Require provenance for effective density sources, recycling, transport, or Noether sea exchange. |
| Shared-record guardrail | $\mathcal{S}_{\mathrm{retune}}(\theta)$ | Fails the packet when different rows require independently tuned Noether sea records. |

## First Mathematical Object To Add Next

The `EQ-17` source-path-receiver slice is now executable in [signed-frequency-transfer-ledger.mjs](../../../scripts/equation-mapping/signed-frequency-transfer-ledger.mjs). Its attempt fixture [signed-frequency-transfer-attempt.v1.json](../../../scripts/equation-mapping/signed-frequency-transfer-attempt.v1.json) blocks at `missing_accepted_theta_transfer` while the signed transfer, receiver-frequency, segment-energy, path-quality, and no-hidden-retune numeric diagnostics pass. The broader next object is still a joint shared-record residual under this priority packet:

$$
\mathcal{R}_{07\text{-}10,17\text{-}19}(\theta;W,X)
=
\left\|
\mathbf{r}_{\mathrm{weak}}(\theta;W)
\right\|_{C_W^{-1}}^2
+\lambda_Z
\left(
Z_X[\theta]-Z_X^{\mathrm{obs}}
\right)^2
+\lambda_{\mathrm{null}}\mathcal R_{\mathrm{null}}(\theta;W)
+\lambda_{\mathrm{geo}}\mathcal R_{\mathrm{geo}}(\theta;W)
+\lambda_H R_H(\theta)^2
+\lambda_\rho R_\rho(\theta)^2
+\lambda_{\mathrm{retune}}\mathcal{S}_{\mathrm{retune}}(\theta),
$$

where

$$
\mathbf{r}_{\mathrm{weak}}(\theta;W)
=
\begin{pmatrix}
R_{\mathrm{red}}\\
R_{\mathrm{Shap}}\\
R_{\mathrm{lens}}\\
R_{\mathrm{acc}}\\
\gamma_{\mathrm{PPN}}-1\\
\beta_{\mathrm{PPN}}-1\\
\alpha_1\\
\alpha_2\\
\alpha_3
\end{pmatrix}.
$$

This is not a new validation gate. It is the first reusable equation-mapping residual for the assigned IDs. It should be populated first in a weak solar-system window $W_{\odot}$ plus one clean spectral line family $X$, then extended to an effective cosmology window only after the source/provenance rows are declared.

$\mathcal R_{\mathrm{null}}$ and $\mathcal R_{\mathrm{geo}}$ are terms inside the same metric-observable residual. They do not promote geodesic behavior into substrate ontology; they check whether null/eikonal and proper-time action readouts follow from the same observer-level metric projection that already supplies redshift, Shapiro delay, lensing, acceleration, and PPN rows.

## Failure Modes And Falsifiers

| Failure mode | Falsifier |
| --- | --- |
| `equation_map.hidden_retune` | Redshift, Shapiro delay, lensing, acceleration, or FRW variables pass only after changing $\theta$, $\mathbf{b}_N$, $\chi_{\text{sea}}$, or spatial-compliance coefficients per observable. |
| `metric.scalar_delay_half_test` | The map matches Shapiro delay or Newtonian acceleration but supplies only $\Delta\theta=2GM/(bc_0^2)$ for light bending because $\gamma_{ij}$ or spatial compliance is absent. |
| `clock_signal_split` | $a_\chi^{\mathrm{clk}}\ne a_\chi^{\mathrm{sig}}$ and the residual is hidden instead of reported across redshift, Shapiro, pressure-response, and cosmology comparisons. |
| `redshift.factor_collapse` | $B_X(E)$, $D_v$, $\Gamma_N$, and $Y_{X,E\to R}$ are folded into one redshift factor without separate extraction rules. |
| `path_history.tired_light_failure` | A nonzero $Y_{X,E\to R}$ violates image sharpness, spectral coherence, chromaticity, or $(1+z)$ time-dilation consistency. |
| `cosmology.void_expansion_level_collapse` | $a_{\mathrm{eff}}$ or $H_{\mathrm{eff}}$ is written as expansion of the Euclidean void rather than an observer-level Noether sea projection. |
| `cosmology.source_without_provenance` | $\mathcal{S}_{\mathrm{eff}}$ is inserted to satisfy continuity but lacks assembly association, dissociation, recycling, transport, or Noether sea exchange in $S(t)$. |
| `ppn.preferred_frame_leakage` | $(\alpha_1,\alpha_2,\alpha_3)$ or SME-style residuals exceed the recorded bounds after the same metric record is used for clock/ruler/signal rows. |

## `6/23 b` Score Recommendation

Do not update [equation.md](equation.md) from this worker packet. Recommended next score column entries:

| ID | `6/23 a` | Recommended `6/23 b` | Reason |
| --- | --- | --- | --- |
| `EQ-07` | `4` | `4` | ADM/Cartan variables and coefficient scaffold are strong, but the constitutive coefficients still need branch/population derivation. |
| `EQ-08` | `4` | `4` | $\Gamma_N$ endpoint, Lorentz, and weak-gravity extraction targets are explicit; the Noether braid derivation of $\mathbf{b}_N$ remains open. |
| `EQ-09` | `3` | `4` | The current PPN material has a shared ADM/Cartan extraction equation, PPN decision vector, forward observable projection, and residual rows. Coefficient closure remains open, so `4` is the ceiling. |
| `EQ-10` | `3` | `3` | Proper-time/geodesic benchmarks are present, but the action-to-acceleration and null/eikonal rows still need a single branch-derived record. |
| `EQ-17` | `4` | `4` | Redshift factorization is explicit and signed; path-history propagation and energy-exchange closure still need validation. |
| `EQ-18` | `3` | `3` | Effective FRW variables are correctly scoped as observer projections, but the extraction of $a_{\mathrm{eff}}$ from Noether sea history is not yet predictive. |
| `EQ-19` | `3` | `3` | Friedmann and continuity equations have correct fixed-void interpretation and source-row pressure, but $\mathcal{S}_{\mathrm{eff}}$ and component provenance remain undeveloped. |

## Promotion Targets

Promote only after the shared residual above is populated for at least one declared weak-field window and one declared redshift/cosmology window.

| Packet part | Candidate reader-facing promotion target | Promotion condition |
| --- | --- | --- |
| Effective metric map | [Emergent Metric](../../../content/markdown/aaa/spacetime/emergent-metric.md), [PPN Parameters](../../../content/markdown/aaa/spacetime/ppn-parameters.md) | One $\theta$ supplies $N$, $u^i_{\text{sea}}$, $e^a{}_i$, $\gamma_{ij}$, Shapiro, lensing, acceleration, and PPN rows without retuning. |
| Clock and cadence extraction | [Proper Time and Time Dilation](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md), [Noether Sea](../../../content/markdown/aaa/spacetime/noether-sea.md) | $\mathbf{b}_N$ derives $\Gamma_N=1$, $\Gamma_N\to1/\xi$, and $\Gamma_N\approx1-\Phi_N/c_0^2$ in declared limits. |
| Redshift factorization | [Expansion Mechanism](../../../content/markdown/aaa/cosmology/expansion-mechanism.md), [Cosmology Ontology](../../../content/markdown/aaa/cosmology/cosmology-ontology.md) | Endpoint cadence, source branch, launch geometry, and path-history terms close as separate projections of one absolute record. |
| Effective FRW / Friedmann | [Cosmology Ontology](../../../content/markdown/aaa/cosmology/cosmology-ontology.md), [Hubble and S8 Tensions](../../../content/markdown/aaa/cosmology/hubble-s8-tensions.md) | $a_{\mathrm{eff}}$, $H_{\mathrm{eff}}$, $\rho_{\mathrm{eff}}$, $P_{\mathrm{eff}}$, $\Lambda_{\mathrm{eff}}$, and $\mathcal{S}_{\mathrm{eff}}$ are generated from one fixed-void Noether sea and assembly record. |
| Downstream transfer functions | [CMB](../../../content/markdown/aaa/cosmology/CMB.md), [Structure Formation](../../../content/markdown/aaa/cosmology/structure-formation.md), [BBN Constraints](../../../content/markdown/aaa/cosmology/BBN-constraints.md) | Use only after this packet supplies the shared redshift/distance/cosmology interface consumed by `EQ-21` through `EQ-23`. |

## Priority Classification

- Claim bucket: derivation/closure target with observer-level effective summaries.
- Corpus promotion status: priority-only.
- Promote now: no.
- Defer with blocker: branch/population derivation of $\mathbf{b}_N$, shared ADM/Cartan coefficients, path-history energy exchange, and effective source provenance.
- Next safe action: define and populate $\mathcal{R}_{07\text{-}10,17\text{-}19}(\theta;W,X)$ for a weak solar-system benchmark window before attempting a cosmology-wide score increase.
