# Static Response Vector Toy Model

This protocol documents the first replay fixture for the weak static response vector used in the $\Gamma_N$ geometry extraction target. It is a small arithmetic gate for the endpoint row in [Proper Time and Time Dilation](../../spacetime/proper-time-and-time-dilation.md#gamma-n-geometry-extraction-target) and the Shapiro-delay coefficient in [PPN Parameters](../../spacetime/ppn-parameters.md#explicit-weak-field-noether-sea-delay-map-ppn-gamma).

The fixture is not an empirical PPN fit. Its purpose is to keep the clock cadence row, the clock-rate row, and the signal-delay coefficient from being silently blended while the $\mathbb{A}\mathbb{A}\mathbb{A}$ constitutive response is still being derived.

## Runtime Artifact

Run the default mock packet with:

```text
node scripts/spacetime/static-response-vector-toy-model.mjs --pretty
```

The script consumes:

```text
scripts/spacetime/static-response-vector-mock.json
```

and emits one result row per scenario.

## Replay Equations

For a weak static endpoint cell, write

$$
\ln n=a_n\frac{U}{c_0^2},\qquad
\ln\chi_{\text{sea}}=a_\chi\frac{U}{c_0^2},\qquad
\ln\lambda=a_\lambda\frac{U}{c_0^2},\qquad
\ln\frac{R_{\text{braid}}}{R_{\text{braid},0}}=a_R\frac{U}{c_0^2}
$$

The cadence-stretch row must satisfy

$$
b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1
$$

while the inverse clock-rate row must satisfy

$$
\omega_n a_n+\omega_\chi a_\chi+\omega_\lambda a_\lambda+\omega_R a_R=-1
$$

The row-inverse condition checks

$$
b_i+\omega_i=0
$$

for $i\in\{n,\chi,\lambda,R\}$.

The Shapiro-delay neighbor supplies

$$
a_\chi^{\mathrm{sig}}=1+\gamma_{\mathrm{PPN}}
$$

so the shared clock/signal delay residual is

$$
\Delta_\chi^{\mathrm{clk\text{-}sig}}
=
a_\chi-a_\chi^{\mathrm{sig}}
$$

The branch is shared-delay closed only when $\Delta_\chi^{\mathrm{clk\text{-}sig}}=0$ within the declared tolerance.

The same arithmetic also exposes the lensing/dynamics equality burden used by dark-sector comparisons. In the weak static row, the signal-deflection channel is closed only when the spatial-compliance response gives

$$
\gamma_{\mathrm{PPN}}=1,
\qquad
a_\chi^{\mathrm{sig}}=2
$$

while the clock/dynamical endpoint row still satisfies the cadence and inverse-clock equations below. A response vector that changes the dynamical acceleration but leaves $a_\chi^{\mathrm{sig}}\neq2$ is a split clock/signal branch: it may fit rotation curves or hydrostatic motion, but it cannot yet claim the lensing mass equality required by cluster and galaxy-galaxy weak-lensing tests.

## Minimal Shared-Delay Packet

The first admissible static endpoint packet is the shared scalar delay response specialization of the equations above. Define

$$
A_\chi\equiv1+\gamma_{\mathrm{PPN}}
$$

The minimal response vector is

$$
\left(
a_n,\,
a_\chi,\,
a_\lambda,\,
a_R
\right)
=
\left(
0,\,
A_\chi,\,
0,\,
0
\right)
$$

with cadence row

$$
\left(
b_n,\,
b_\chi,\,
b_\lambda,\,
b_R
\right)
=
\left(
0,\,
A_\chi^{-1},\,
0,\,
0
\right)
$$

and inverse clock-rate row

$$
\left(
\omega_n,\,
\omega_\chi,\,
\omega_\lambda,\,
\omega_R
\right)
=
\left(
0,\,
-A_\chi^{-1},\,
0,\,
0
\right)
$$

For the GR-matching branch, this gives $A_\chi=2$, $a_\chi=2$, $b_\chi=1/2$, and $\omega_\chi=-1/2$. The `shared_delay_clean_gr_branch` row in the mock packet is exactly this replay. The `density_scale_compensated_branch` row samples the remaining compensated family, where nonzero $a_n$, $a_\lambda$, or $a_R$ are allowed only if the same cadence row still satisfies $b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1$ and the inverse row remains $\omega_i=-b_i$.

## Pressure Bridge

Pressure-response packets can feed the same fixture after their anisotropic terms are separated from the isotropic static projection. For a pressure row $r$, the bridge uses

$$
\delta\mathbf{g}_r^{P}
=
\left(
\delta\ln n,\,
\delta\ln\chi_{\text{sea}},\,
\delta\ln\lambda,\,
\delta\ln R
\right)_r
$$

and checks the pressure version of the cadence row:

$$
\widehat{\delta\ln\Gamma}_{N,r}^{P}
=
b_n\delta\ln n_r
+b_\chi\delta\ln\chi_{\text{sea},r}
+b_\lambda\delta\ln\lambda_r
+b_R\delta\ln R_r
$$

The pressure cadence residual is

$$
\mathcal{R}_{\Gamma,r}^{P}
=
\widehat{\delta\ln\Gamma}_{N,r}^{P}
-\delta\ln\Gamma_{N,r}
$$

The inverse clock-rate row must also close:

$$
\mathcal{R}_{C,r}^{P}
=
\left(
\omega_n\delta\ln n_r
+\omega_\chi\delta\ln\chi_{\text{sea},r}
+\omega_\lambda\delta\ln\lambda_r
+\omega_R\delta\ln R_r
\right)
+\delta\ln\Gamma_{N,r}
$$

When `derive_response` is `gamma_normalized`, the fixture also forms a normalized static-equivalent response vector

$$
a_i^{P\to\Gamma}
=
\frac{\delta g_i^P}{\delta\ln\Gamma_N}
$$

This normalization makes pressure rows replayable by the same endpoint arithmetic, but it does not convert pressure loading into a gravitational PPN branch. The `gamma_eff_sweep` diagnostic is only an algebraic comparison against $a_\chi^{\mathrm{sig}}=1+\gamma_{\mathrm{PPN}}$; a pressure-normalized value that closes for some formal $\gamma_{\mathrm{PPN}}$ is not a solar-system Shapiro result.

Anisotropic pressure entries, such as $\Delta\Pi^{\parallel-\perp}$ or deviatoric strain, must be either projected out before the isotropic static row is evaluated or carried in `anisotropic_residuals`. The isotropic $\Gamma_N$ row must not absorb directional pressure response as a hidden scalar coefficient.

## Input Packet

Each scenario supplies:

| Field | Meaning |
| --- | --- |
| `gamma_eff` | PPN Shapiro-delay coefficient through $a_\chi^{\mathrm{sig}}=1+\gamma_{\mathrm{PPN}}$ |
| `gamma_eff_sweep` | optional list of trial $\gamma_{\mathrm{PPN}}$ values for the shared-delay diagnostic |
| `response` | static weak-potential response vector $(a_n,a_\chi,a_\lambda,a_R)$ |
| `pressure_bridge` | optional pressure row used to derive a normalized static-equivalent response vector |
| `cadence_row` | cadence-stretch coefficients $(b_n,b_\chi,b_\lambda,b_R)$ for $\ln\Gamma_N$ |
| `clock_rate_row` | inverse clock-rate coefficients $(\omega_n,\omega_\chi,\omega_\lambda,\omega_R)$ |
| `expect_shared_delay` | whether the scenario is expected to satisfy $\Delta_\chi^{\mathrm{clk\text{-}sig}}=0$ |
| `tolerance` | optional scenario-level residual tolerance |

## Output Diagnostics

The fixture reports:

| Output field | Meaning |
| --- | --- |
| `diagnostics.a_chi_sig` | signal-delay coefficient fixed by the PPN Shapiro map |
| `diagnostics.delta_chi_clk_sig` | shared clock/signal delay residual |
| `diagnostics.gamma_eff_sweep` | optional sweep of shared-delay residuals over trial $\gamma_{\mathrm{PPN}}$ values |
| `diagnostics.endpoint_sum` | cadence-stretch row sum |
| `diagnostics.endpoint_residual` | endpoint residual relative to $1$ |
| `diagnostics.clock_rate_sum` | inverse clock-rate row sum |
| `diagnostics.clock_rate_residual` | clock-rate residual relative to $-1$ |
| `diagnostics.row_inverse_residuals` | coefficient-by-coefficient residuals $b_i+\omega_i$ |
| `diagnostics.pressure_bridge` | optional pressure-row replay of $\mathcal{R}_{\Gamma}^{P}$, $\mathcal{R}_{C}^{P}$, and effective-speed identity |

These diagnostics turn the first-order response vector into an executable closure object. A later constitutive simulation can replace the mock response values with measured $(a_n,a_\chi,a_\lambda,a_R)$ rows while keeping the same gate.

## Expected Mock Behavior

The default mock packet has five rows.

| Scenario | Expected behavior |
| --- | --- |
| `shared_delay_clean_gr_branch` | Passes with $\gamma_{\mathrm{PPN}}=1$, $a_\chi=2$, and $b_\chi=0.5$. |
| `density_scale_compensated_branch` | Passes with nonzero density, scale, and core-radius responses while preserving the endpoint and row-inverse constraints. |
| `split_clock_signal_delay_branch` | Fails shared-delay closure even though its endpoint and clock-rate rows close arithmetically. |
| `underclosed_clock_row` | Fails the endpoint and clock-rate sums while satisfying the shared-delay residual. |
| `pressure_bridge_fe_cr_toy_isotropic_projection` | Passes the pressure-projected cadence and clock-rate rows using the Fe/Cr toy isotropic projection, while correctly reporting that its pressure-normalized $a_\chi^{P\to\Gamma}=0.6$ is not the GR-matching Shapiro branch. |

The two failing rows are intentional failure witnesses. They show that a model can fit the static clock row while violating shared delay, or satisfy shared delay while underclosing the endpoint row. The pressure bridge row is a third kind of witness: it demonstrates that a pressure packet can close the isotropic $\Gamma_N$ arithmetic while still remaining outside the gravitational PPN interpretation.

## Compensated-Family Validation Result

The executable separates three claims that should not be collapsed.

First, the minimal shared-delay row passes the weak GR endpoint:

$$
\left(
a_n,\,
a_\chi,\,
a_\lambda,\,
a_R
\right)
=
\left(
0,\,
2,\,
0,\,
0
\right),
\qquad
\left(
b_n,\,
b_\chi,\,
b_\lambda,\,
b_R
\right)
=
\left(
0,\,
\frac{1}{2},\,
0,\,
0
\right)
$$

Second, the density/scale-compensated row also passes the endpoint and inverse-row checks:

$$
\left(
a_n,\,
a_\chi,\,
a_\lambda,\,
a_R
\right)
=
\left(
0.25,\,
2,\,
-0.1,\,
0.05
\right),
\qquad
\left(
b_n,\,
b_\chi,\,
b_\lambda,\,
b_R
\right)
=
\left(
0.4,\,
0.4,\,
-0.5,\,
1
\right)
$$

because

$$
0.4(0.25)+0.4(2)+(-0.5)(-0.1)+1(0.05)=1
$$

This is an admissibility witness for the compensated static family, not a derivation of those numbers.

Third, the Fe/Cr pressure bridge falsifies the $\chi_{\text{sea}}$-only shared row for the toy isotropic pressure projection. The pressure-normalized response is

$$
\mathbf{a}^{P\to\Gamma}
=
\left(
0,\,
0.6,\,
0,\,
0
\right)^T
$$

so no single $\chi_{\text{sea}}$ coefficient can satisfy both

$$
b_\chi(2)=1,
\qquad
b_\chi(0.6)=1
$$

The current validation status is therefore conditional. Nonzero static endpoint coefficients $a_n$, $a_\lambda$, and $a_R$ are not required by the endpoint row itself. They become necessary only if an independent branch record, such as hydrogen spectral refinement or pressure-response replay, supplies non-$\chi_{\text{sea}}$ response that must share the same $\Gamma_N$ row. The next proof obligation is to replace the toy nonzero entries with branch-derived density, envelope-scale, or $R_{\text{braid}}$ response rather than treating them as fit parameters.

The hydrogen spectral toy scan may replay this compensated row as a scaffold, but that replay is not evidence that the gravitational endpoint has acquired nonzero $a_n$, $a_\lambda$, or $a_R$. Those entries become promotable only when the hydrogen branch or another declared branch derives the same component split for the same Noether sea cell.
