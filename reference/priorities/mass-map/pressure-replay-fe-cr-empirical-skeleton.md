# Fe/Cr Empirical Pressure Replay Skeleton

This priority packet is the first empirical replay skeleton for the pressure-dependent Noether-Sea constitutive response. It is not reader-facing canon and does not report a data pass. It freezes the Fe/Cr replay contract so real material rows can later be inserted without changing the fit rule after seeing residuals.

## Claim Level

- **Status:** empirical packet skeleton; current reading is `bound_only`.
- **Selected pair:** $H=\mathrm{Fe}$ and $L=\mathrm{Cr}$.
- **Selection basis:** the local priority stack already declares Fe/Cr as the default bcc transition-metal comparison, and the first toy replay uses Fe/Cr. The local corpus does not yet contain enough Ni/Co phase, magnetic-state, correction, covariance, or null-bound material to outrank Fe/Cr.
- **Open burden:** pressure steps, phase and magnetic-state continuity, strain tensors, raw observable rows, ordinary correction rows, covariance estimates, and null-sector bounds are still missing.
- **Promotion target:** none. A future data-filled replay must pass the shared-row, separated-row, heavy-scaling, and null-sector tests before any canon prose is touched.

## Replay Segment Gate

The empirical replay must be segmented before fitting. For a branch-state segment $s$, define

$$
\mathcal{B}_{\mathrm{FeCr},s}
=
\left\{
(M,r):
M\in\{\mathrm{Fe},\mathrm{Cr}\},
r\in R_s,
G_{M,r}^{\mathrm{state}}=1
\right\},
$$

where $G_{M,r}^{\mathrm{state}}=1$ only when the material state remains inside one declared phase, magnetic state, pressure window, temperature window, and transport branch. If any row crosses a phase boundary, magnetic transition, separator threshold, or transport threshold, it must move to another segment $s'$ before fitting.

For the current skeleton,

$$
R_s=\varnothing,
\qquad
\mathcal{B}_{\mathrm{FeCr},s}=\varnothing,
$$

because no empirical pressure rows have been inserted. This deliberately blocks a false pass.

## Material-State Rows To Populate

Only the atomic labels and nuclear charges are fixed at skeleton time:

| Field | Fe row | Cr row | Status |
| --- | --- | --- | --- |
| `material_id` | `Fe` | `Cr` | fixed label |
| $Z_M$ | $26$ | $24$ | fixed atomic label |
| `phase_label` | missing | missing | required before fit |
| `magnetic_state` | missing | missing | required before fit |
| $T_{M,r}$ | missing | missing | required before fit |
| $P_{\mathrm{ext},M,r}$ | missing | missing | required before fit |
| $\mathcal{R}_{\mathrm{tr},M,r}$ and $\mathcal{R}_{\mathrm{tr},*,M,r}$ | missing | missing | required for branch-preserving pressure row |
| $\epsilon_{ij,M,r}$ | missing | missing | required for strain channel |
| $\sigma_{ij,M,r}$ | missing | missing | required or inferred from elastic map |
| $C_{M,r}$ | missing | missing | required before heavy-scaling claim |
| $\lambda_{M,r}$ | missing | missing | required for packing record |
| $\xi_{M,r}$ | missing | missing | required for packing record |
| $\mathcal{O}_{M,r}$ | missing | missing | required for packing record |
| $n_{\max,M,r}^{\mathrm{obl}}$ | missing | missing | required for saturation factor |

The state record for each future row is

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

## Pressure-Record Contract

For every inserted row, compute

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

The anisotropic entry is not a fitted material-specific knob. It must be computed from the declared stress tensor:

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
\right].
$$

If the replay has strain but not stress, it must declare the elastic map $\sigma_{ij,M,r}=\mathcal{C}_{ij}{}^{kl}\epsilon_{kl,M,r}$ before calculating $\Delta\Pi_{M,r}^{\parallel-\perp}$.

## Observable And Correction Contract

Each inserted row must provide a raw observable vector

$$
\mathbf{o}_{M,r}^{\mathrm{raw}}
=
\left(
o_{\Gamma},\,
o_{\chi},\,
o_c,\,
o_{\mathcal{M}_0},\,
o_{\mathcal{M}_2},\,
o_S
\right)^T_{M,r},
$$

and a standard correction vector

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

The residual-channel row is fixed by the extractor matrix:

$$
\mathbf{y}_{M,r}
=
E_{M,r}
\left(
\mathbf{o}_{M,r}^{\mathrm{raw}}
-
\mathbf{o}_{M,r}^{\mathrm{std}}
\right).
$$

The extractor must enforce the sign conventions

$$
\delta\ln\Gamma_N\approx-\delta\ln\Omega_N,
\qquad
\delta\ln(c_{\text{eff}}/c_f)=-\delta\ln\chi_{\text{sea}},
$$

unless the packet declares a branch-state split. A channel that cannot respect these signs is not fit-eligible.

## Transport Reversibility Contract

Each future Fe/Cr row must declare the transport record

$$
\mathcal{T}_{M,r}^{P}
=
\left(
\mathcal{R}_{\mathrm{tr},M,r},
\mathcal{R}_{\mathrm{tr},*,M,r},
\Delta E_{\mathrm{exc},M,r},
\Delta E_{\mathrm{heat},M,r},
\Delta E_{\mathrm{rad},M,r},
\Delta E_{\mathrm{branch},M,r},
\Delta E_{\mathrm{rem},M,r}
\right).
$$

The row is eligible for the reversible pressure fit only if

$$
\mathcal{R}_{\mathrm{tr},M,r}
<
\mathcal{R}_{\mathrm{tr},*,M,r}
\quad\text{and}\quad
\Delta E_{\mathrm{exc},M,r}
+
\Delta E_{\mathrm{heat},M,r}
+
\Delta E_{\mathrm{rad},M,r}
+
\Delta E_{\mathrm{branch},M,r}
=0.
$$

A row that crosses the threshold must be split, masked, or reported as a threshold-event row before fitting $B_P$. The skeleton currently has no $\mathcal{T}_{M,r}^{P}$ rows, so it cannot claim a reversible pressure response.

## Missing-Data Ledger

| Missing item | Current status | Consequence |
| --- | --- | --- |
| Pressure rows $R_s$ | missing | $\mathcal{B}_{\mathrm{FeCr},s}=\varnothing$ |
| State gate $G_{M,r}^{\mathrm{state}}$ | missing | no branch-state segment can be accepted |
| Strain and stress tensors | missing | $\Delta\Pi_{M,r}^{\parallel-\perp}$ unavailable |
| Ordinary correction rows | missing | $\mathbf{y}_{M,r}$ cannot be formed |
| Extractor matrices $E_{M,r}$ | missing | residual signs and units are not locked |
| Channel masks $D_{M,r}$ | missing | retained channel set is empty |
| Covariances $\Sigma_{M,r}$ | missing | weighted residuals are undefined |
| Transport records $\mathcal{T}_{M,r}^{P}$ | missing | reversible pressure rows cannot be certified |
| Null-sector bounds | missing | no pass or demotion can be promoted |

The current packet therefore has no fit-eligible channel:

$$
N_i=0,
\qquad
p_i\ge 1,
\qquad
N_i\le p_i.
$$

Every channel is currently `bound_only` with no numerical bound.

## Exact Fit-Input Contract

When real rows exist, the fit runner consumes:

| Input | Shape | Required content |
| --- | --- | --- |
| $Q$ | $N\times4$ | rows $\mathbf{q}_{M,r}^T$ |
| $Y$ | $N\times6$ | rows $\mathbf{y}_{M,r}^T$ |
| $D$ | $N\times6\times6$ | channel masks $D_{M,r}$ |
| $\Sigma$ | $N$ covariance blocks | covariance matrices for retained residual rows |
| $\mathcal{T}^P$ | $N$ transport blocks | $\mathcal{T}_{M,r}^{P}$ records and branch-preserving masks |
| $m$ | $N$ labels | material labels $\mathrm{Fe}$ or $\mathrm{Cr}$ |
| $\eta_Z$ or $\mathcal{E}$ | scalar or grid | fixed value or shared scan grid |
| $\epsilon_{\mathrm{row}},\epsilon_{\mathrm{split}},\epsilon_P$ | scalars | declared pass tolerances |

Stack the retained residuals as

$$
\widetilde{\mathbf{y}}
=
\operatorname{stack}_{(M,r)}
\left[
D_{M,r}\mathbf{y}_{M,r}
\right],
$$

and the shared-row design as

$$
\widetilde{X}
=
\operatorname{stack}_{(M,r)}
\left[
D_{M,r}
\left(
I_6\otimes\mathbf{q}_{M,r}^T
\right)
\right].
$$

With block covariance $\widetilde{\Sigma}$, the shared coefficient vector is

$$
\widehat{\boldsymbol{\beta}}_P
=
\left(
\widetilde{X}^T\widetilde{\Sigma}^{-1}\widetilde{X}
\right)^+
\widetilde{X}^T
\widetilde{\Sigma}^{-1}
\widetilde{\mathbf{y}},
$$

where $(\cdot)^+$ denotes the pseudoinverse. Reshape $\widehat{\boldsymbol{\beta}}_P$ into $B_P$. Then compute

$$
\mathcal{R}_{\mathrm{row}}
=
\left\|
\widetilde{\mathbf{y}}
-
\widetilde{X}\widehat{\boldsymbol{\beta}}_P
\right\|_{\widetilde{\Sigma}^{-1}}^2.
$$

For the separated comparison, build $\widetilde{X}_{\mathrm{sep}}$ by multiplying the same pressure design by material indicator blocks for Fe and Cr, fit $\widehat{\boldsymbol{\beta}}_{\mathrm{Fe}}$ and $\widehat{\boldsymbol{\beta}}_{\mathrm{Cr}}$, and compute $\mathcal{R}_{\mathrm{sep}}$. The split penalty is

$$
\mathcal{R}_{\mathrm{split}}
=
\left[
\frac{\mathcal{R}_{\mathrm{row}}-\mathcal{R}_{\mathrm{sep}}}
{\nu_{\mathrm{dof}}+\varepsilon}
-\epsilon_{\mathrm{split}}
\right]_+.
$$

## Heavy-Scaling Contract

If $\eta_Z$ is not fixed upstream, the Fe/Cr packet may scan a single shared exponent:

$$
\eta_Z^*
=
\arg\min_{\eta_Z\in\mathcal{E}}
\mathcal{R}_{\mathrm{row}}(\eta_Z).
$$

The scan is valid only if the same $\eta_Z^*$ is used for every retained channel. The weak-branch cadence check remains

$$
\mathcal{A}_{\Gamma}^{\mathrm{Fe/Cr}}
\approx
\frac{
C_{\mathrm{Fe}} Z_{\mathrm{Fe}}^{\eta_Z}
\left(1-n_{\mathrm{Fe}}/n_{\max,\mathrm{Fe}}^{\mathrm{obl}}\right)
}{
C_{\mathrm{Cr}} Z_{\mathrm{Cr}}^{\eta_Z}
\left(1-n_{\mathrm{Cr}}/n_{\max,\mathrm{Cr}}^{\mathrm{obl}}\right)
}
\cdot
\frac{K_{\text{sea},\mathrm{Cr}}}{K_{\text{sea},\mathrm{Fe}}}.
$$

The skeleton cannot evaluate this ratio because $C_M$, $n_M/n_{\max,M}^{\mathrm{obl}}$, and $K_{\text{sea},M}$ are missing.

## Null-Sector Contract

The replay cannot pass unless it reports

$$
\mathcal{R}_{\mathrm{null}}^{P}
=
\max\left(
\mathcal{R}_{\mathrm{biref}},
\mathcal{R}_{\gamma\mathrm{disp}},
\mathcal{R}_{\mathrm{LV}},
\mathcal{R}_{\mathrm{clksig}},
\mathcal{R}_{\mathrm{tr}}
\right)
\le
\epsilon_P.
$$

All five null-sector entries are currently missing. This prevents a pass even if future pressure residuals are small.

## Current Reading

The current packet reads:

$$
\mathrm{reading}
=
\mathrm{bound\_only},
\qquad
\mathrm{fit\_eligible}
=
0,
\qquad
\mathrm{empirical\_pass}
=
0.
$$

This is the intended state of the skeleton. A future replay may change the reading only after the material-state rows, residual rows, covariance blocks, transport reversibility records, and null-sector bounds are inserted without changing the fit contract.

## Fit-Runner Handoff

The executable scaffold is

```text
node scripts/mass-map/pressure-replay-fit-runner.mjs --input scripts/mass-map/pressure-replay-fe-cr-empty-fixture.json --pretty
```

The empty fixture is intentionally fail-closed:

| Runner field | Empty-fixture value |
| --- | --- |
| `rows_total` | `0` |
| `active_observations` | `0` |
| `fits.shared.status` | `bound_only` |
| `fits.separated.status` | `bound_only` |
| `fits.split.status` | `bound_only` |
| `transport_reversibility.status` | `missing` |
| `null_bounds.status` | `missing` |
| `reading` | `bound_only` |
| `empirical_pass` | `false` |

This runner is allowed to compute $\mathcal{R}_{\mathrm{row}}$, $\mathcal{R}_{\mathrm{sep}}$, $\mathcal{R}_{\mathrm{split}}$, rank eligibility, transport reversibility status, and null-sector status from declared rows, but it may not infer missing pressure rows, covariances, channel masks, transport records, or null-sector bounds.

## Next Data Insertion Checklist

1. Insert at least three pressure rows per retained material-state segment, or declare the channel bound-only by rank.
2. Freeze Fe and Cr phase and magnetic-state labels over the segment.
3. Supply stress or strain-plus-elastic-map data for $\Delta\Pi^{\parallel-\perp}$.
4. Supply raw observables and ordinary correction rows for at least one retained channel.
5. Supply $E_{M,r}$, $D_{M,r}$, and $\Sigma_{M,r}$ before fitting.
6. Supply $\mathcal{T}_{M,r}^{P}$ and mask or split any threshold-event rows.
7. Declare $\eta_Z$ as fixed or declare a shared scan grid $\mathcal{E}$.
8. Supply all five null-sector entries or keep the reading at `bound_only`.
