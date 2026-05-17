# Metallic-Lattice Pressure Replay Data Schema

This priority packet is an implementation-ready data schema for a real two-material replay of the pressure-dependent Noether-Sea constitutive response. It is not reader-facing canon and does not report empirical evidence. Its role is to make the first Fe/Cr or Ni/Co replay falsifiable before any material data are inserted.

## Claim Level

- **Status:** real-data replay schema; no empirical pass claimed.
- **Main claim:** a valid pressure replay must lock the material state, pressure record, ordinary condensed-matter corrections, residual-channel extractor, covariance model, shared-row fit, and null-sector bounds before interpreting a residual as Noether-Sea response.
- **Open burden:** actual data must still provide pressure steps, phase and magnetic-state continuity, strain tensors, correction ledgers, channel covariance, and null-sector bounds.
- **Promotion target:** none until a real replay survives the shared-row, split-row, and null-sector tests.

## Replay Objective

For a heavy material $H$ and a lighter neighboring-metal control $L$, the replay tests whether one matrix $B_P$ maps the corrected pressure record to the retained Noether-Sea residual channels:

$$
\widehat{\mathbf{y}}_{M,r}
=
B_P\mathbf{q}_{M,r},
\qquad
M\in\{H,L\}.
$$

The replay is not a search for any pressure-dependent anomaly. Standard condensed-matter pressure shifts are expected. The test is narrower: after ordinary electronic, magnetic, thermal, elastic, and phase-state corrections are subtracted, the remaining cadence, delay, effective-speed, strain, and medium-response residuals must share one pressure-loading record.

## Material Pair Selection

The default pair remains

$$
H=\mathrm{Fe},
\qquad
L=\mathrm{Cr},
$$

for a bcc transition-metal comparison. The alternate pair is

$$
H=\mathrm{Ni},
\qquad
L=\mathrm{Co},
$$

for a close-packed comparison. A pair is eligible only over pressure intervals where the replay can declare:

1. crystal phase and magnetic state for both materials;
2. pressure steps or pressure windows with overlapping uncertainty budgets;
3. principal strain entries or an explicit reason the strain channel is masked;
4. ordinary correction rows for the measured channels;
5. covariance estimates after standard corrections;
6. null-sector bounds for the same pressure interval.

If a material crosses a phase boundary, magnetic transition, separator threshold, or transport threshold inside the pressure interval, split the replay into separate branch-state segments. Do not absorb the transition into a free pressure coefficient.

## Data Record

For each material $M$ and pressure step $r$, the replay packet must declare a material-state record

$$
\mathcal{S}_{M,r}
=
\left(
Z_M,\,
\mathrm{phase}_{M,r},\,
\mathrm{mag}_{M,r},\,
T_{M,r},\,
P_{\mathrm{ext},M,r},\,
\epsilon_{ij,M,r},\,
C_{M,r},\,
\lambda_{M,r},\,
\xi_{M,r},\,
\mathcal{O}_{M,r},\,
n_{\max,M,r}^{\mathrm{obl}}
\right).
$$

The pressure record is then

$$
\mathbf{q}_{M,r}
=
\left(
\Delta\Pi_{M,r},\,
\Delta\Pi_{M,r}^{\parallel-\perp},\,
\Delta\ln n_{\max,M,r}^{\mathrm{obl}},\,
C_{M,r}
\left(\frac{Z_M}{Z_*}\right)^{\eta_Z}
\frac{\Delta P_{\mathrm{ext},M,r}}{K_{\text{sea}}}
\right)^T.
$$

The anisotropic pressure entry must be computed from the deviatoric strain record, not chosen independently:

$$
\Delta\Pi_{M,r}^{\parallel-\perp}
=
\frac{1}{K_{\text{sea}}}
\left[
\hat e_{\max}^i\sigma_{ij,M,r}\hat e_{\max}^j
-
\frac{1}{2}
\left(
\hat e_{\mathrm{mid}}^i\sigma_{ij,M,r}\hat e_{\mathrm{mid}}^j
+
\hat e_{\min}^i\sigma_{ij,M,r}\hat e_{\min}^j
\right)
\right],
$$

where $\hat e_{\max}$, $\hat e_{\mathrm{mid}}$, and $\hat e_{\min}$ are the principal-strain axes and $\sigma_{ij,M,r}$ is the declared stress or equivalent pressure tensor. If only strain is observed, the replay must declare the elastic map used to infer $\sigma_{ij,M,r}$.

## Observable Extraction

The raw measured observable vector is

$$
\mathbf{o}_{M,r}^{\mathrm{raw}}
=
\left(
o_{\Gamma},\,
o_{\chi},\,
o_{c},\,
o_{\mathcal{M}_0},\,
o_{\mathcal{M}_2},\,
o_{S}
\right)^T_{M,r},
$$

where the entries are channel estimators for cadence, signal-delay, effective-speed, isotropic medium response, directional medium response, and deviatoric strain. The standard condensed-matter model supplies

$$
\mathbf{o}_{M,r}^{\mathrm{std}}
=
\mathbf{o}_{M,r}^{\mathrm{elec}}
+
\mathbf{o}_{M,r}^{\mathrm{mag}}
+
\mathbf{o}_{M,r}^{\mathrm{therm}}
+
\mathbf{o}_{M,r}^{\mathrm{elas}}
+
\mathbf{o}_{M,r}^{\mathrm{phase}}.
$$

The Noether-Sea residual-channel estimate is

$$
\mathbf{y}_{M,r}
=
E_{M,r}
\left(
\mathbf{o}_{M,r}^{\mathrm{raw}}
-
\mathbf{o}_{M,r}^{\mathrm{std}}
\right),
$$

where $E_{M,r}$ is the declared channel-extractor matrix. The extractor fixes signs and units before fitting. For example, a clock-like cadence residual must respect

$$
\delta\ln\Gamma_N
\approx
-\delta\ln\Omega_N,
$$

and the effective-speed channel must respect

$$
\delta\ln(c_{\text{eff}}/c_f)
=
-\delta\ln\chi_{\text{sea}}
$$

within its uncertainty unless a branch-state split is declared. If a measured observable does not isolate one residual channel, $E_{M,r}$ may mix entries, but the mixing matrix must be fixed before the pressure fit.

## Channel Mask and Covariance

Not every replay will measure all six channels. Let $D_{M,r}$ be the diagonal mask that keeps only available residual entries. The retained covariance is

$$
\Sigma_{M,r}^{(D)}
=
D_{M,r}\Sigma_{M,r}D_{M,r}^T.
$$

The weighted shared-row residual is

$$
\mathcal{R}_{\mathrm{row}}
=
\min_{B_P}
\sum_{M\in\{H,L\}}
\sum_r
\left\|
D_{M,r}
\left(
\mathbf{y}_{M,r}-B_P\mathbf{q}_{M,r}
\right)
\right\|_{\left(\Sigma_{M,r}^{(D)}\right)^{-1}}^2.
$$

The separated-row residual is

$$
\mathcal{R}_{\mathrm{sep}}
=
\min_{B_H,B_L}
\sum_{M\in\{H,L\}}
\sum_r
\left\|
D_{M,r}
\left(
\mathbf{y}_{M,r}-B_M\mathbf{q}_{M,r}
\right)
\right\|_{\left(\Sigma_{M,r}^{(D)}\right)^{-1}}^2.
$$

For each retained channel $i$, let $N_i$ be the number of observed material-pressure rows in the shared fit and let $p_i$ be the rank of the pressure-record design matrix visible to that channel. The channel is fit-eligible only when

$$
N_i>p_i.
$$

Otherwise that channel is bound-only and must not be used to claim a shared-row pass. The split penalty remains

$$
\mathcal{R}_{\mathrm{split}}
=
\left[
\frac{\mathcal{R}_{\mathrm{row}}-\mathcal{R}_{\mathrm{sep}}}
{\nu_{\mathrm{dof}}+\varepsilon}
-\epsilon_{\mathrm{split}}
\right]_+,
$$

with $\nu_{\mathrm{dof}}$ computed from the retained channel ranks.

## Shared Heavy-Scaling Scan

If $\eta_Z$ is not fixed from an upstream branch calculation, the replay may scan one shared value:

$$
\eta_Z^*
=
\arg\min_{\eta_Z\in\mathcal{E}}
\mathcal{R}_{\mathrm{row}}(\eta_Z).
$$

This scan is allowed only if the same $\eta_Z^*$ is used for every retained channel. A channelwise result

$$
\eta_{Z,\Gamma}
\ne
\eta_{Z,\chi}
\ne
\eta_{Z,\mathcal{M}}
$$

is a demotion or failure result, not a refined fit.

The first reported heavy/control check is

$$
\mathcal{A}_{Y}^{H/L}
=
\frac{
\partial Y_H/\partial P_{\mathrm{ext},H}
}{
\partial Y_L/\partial P_{\mathrm{ext},L}
},
$$

with the weak-branch cadence prediction

$$
\mathcal{A}_{\Gamma}^{H/L}
\approx
\frac{
C_H Z_H^{\eta_Z}
\left(1-n_H/n_{\max,H}^{\mathrm{obl}}\right)
}{
C_L Z_L^{\eta_Z}
\left(1-n_L/n_{\max,L}^{\mathrm{obl}}\right)
}
\cdot
\frac{K_{\text{sea},L}}{K_{\text{sea},H}}.
$$

The same heavy/control factor must be compatible with the delay, effective-speed, strain, and medium-response channels after their shared coefficient rows are applied.

## Null-Sector Bounds

The replay must report

$$
\mathcal{R}_{\mathrm{null}}^{P}
=
\max\left(
\mathcal{R}_{\mathrm{biref}},
\mathcal{R}_{\gamma\mathrm{disp}},
\mathcal{R}_{\mathrm{LV}},
\mathcal{R}_{\mathrm{clksig}},
\mathcal{R}_{\mathrm{tr}}
\right).
$$

The null-sector entries mean:

| Residual | Required bound |
| --- | --- |
| $\mathcal{R}_{\mathrm{biref}}$ | pressure-correlated birefringence or polarization splitting not already assigned to ordinary elastic optics |
| $\mathcal{R}_{\gamma\mathrm{disp}}$ | pressure-correlated photon dispersion outside the effective-speed channel model |
| $\mathcal{R}_{\mathrm{LV}}$ | pressure-correlated orientation, boost, or preferred-frame leakage |
| $\mathcal{R}_{\mathrm{clksig}}$ | mismatch between cadence and signal-speed residuals after $c_{\text{eff}}=c_f/\chi_{\text{sea}}$ is enforced |
| $\mathcal{R}_{\mathrm{tr}}$ | ordinary dissipative drag, heating, radiation, or transport-threshold behavior in a branch-preserving sample |

The replay can pass only if

$$
\mathcal{R}_{\mathrm{null}}^{P}\le\epsilon_P.
$$

## Machine-Readable Packet Fields

The first empirical packet should use these top-level fields:

| Field | Required content |
| --- | --- |
| `replay_id` | stable identifier, source version, operator note, and date |
| `pair_id` | `FeCr`, `NiCo`, or a declared replacement pair |
| `material_states` | $\mathcal{S}_{M,r}$ records, including phase, magnetic state, pressure, temperature, strain, and packing entries |
| `pressure_records` | $\mathbf{q}_{M,r}$ rows and the declared $Z_*$, $\eta_Z$, $K_{\text{sea}}$, and $C_{M,r}$ assumptions |
| `raw_observables` | $\mathbf{o}^{\mathrm{raw}}_{M,r}$ with units, instruments, pressure steps, and direction labels |
| `standard_corrections` | electronic, magnetic, thermal, elastic, and phase-state correction rows |
| `extractor` | $E_{M,r}$ matrices and sign conventions |
| `channel_mask` | $D_{M,r}$ availability masks and reasons for missing channels |
| `covariance` | $\Sigma_{M,r}$ and retained $\Sigma_{M,r}^{(D)}$ |
| `fit_results` | $\mathcal{R}_{\mathrm{row}}$, $\mathcal{R}_{\mathrm{sep}}$, $\mathcal{R}_{\mathrm{split}}$, $\nu_{\mathrm{dof}}$, fitted $B_P$, and any separated-row comparison |
| `heavy_scaling` | $\mathcal{A}_{Y}^{H/L}$ by retained channel and the shared $\eta_Z$ status |
| `null_bounds` | $\mathcal{R}_{\mathrm{null}}^{P}$ entries and $\epsilon_P$ |
| `reading` | `pass`, `demote`, `fail`, or `bound_only` with the rule that produced it |

## Reading Rules

- **Pass:** every fit-eligible retained channel satisfies $\mathcal{R}_{\mathrm{row}}\le\epsilon_{\mathrm{row}}$, $\mathcal{R}_{\mathrm{split}}=0$, and $\mathcal{R}_{\mathrm{null}}^{P}\le\epsilon_P$, with one shared $\eta_Z$ if $\eta_Z$ is scanned.
- **Demote:** separated rows materially improve the fit, channelwise $\eta_Z$ values are required, or ordinary condensed-matter correction uncertainty can absorb the residuals.
- **Fail:** the fit requires null-sector violation, branch-state mixing without segmentation, a sign reversal without a logged state change, or observable-local coefficients.
- **Bound-only:** residuals are consistent with zero, the channel count is rank-deficient, or missing covariance prevents a fit claim. The packet may still report upper bounds on $a_S$, $m_S$, $\eta_Z$, and pressure sensitivity of $\Gamma_N$.

## First Replay Build Order

1. Build a Fe/Cr packet over the cleanest shared bcc pressure interval, or declare why Ni/Co has the better state match.
2. Freeze $\mathcal{S}_{M,r}$, $\mathbf{q}_{M,r}$, $E_{M,r}$, $D_{M,r}$, and $\Sigma_{M,r}$ before fitting $B_P$.
3. Fit $B_P$ only on retained residual channels after standard corrections are subtracted.
4. Compare against $B_H$ and $B_L$ separated rows.
5. Run the heavy/control slope check for every retained channel.
6. Apply null-sector bounds before any promotion or theory elevation.

The first blank empirical packet is [Fe/Cr Empirical Pressure Replay Skeleton](pressure-replay-fe-cr-empirical-skeleton.md). It selects Fe/Cr from the local priority stack, keeps all missing material inputs explicit, and fixes the fit-input contract before data insertion.
