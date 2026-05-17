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
\ln\frac{R_{\text{core}}}{R_{\text{core},0}}=a_R\frac{U}{c_0^2}.
$$

The cadence-stretch row must satisfy

$$
b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1,
$$

while the inverse clock-rate row must satisfy

$$
\omega_n a_n+\omega_\chi a_\chi+\omega_\lambda a_\lambda+\omega_R a_R=-1.
$$

The row-inverse condition checks

$$
b_i+\omega_i=0
$$

for $i\in\{n,\chi,\lambda,R\}$.

The Shapiro-delay neighbor supplies

$$
a_\chi^{\mathrm{sig}}=1+\gamma_{\text{eff}},
$$

so the shared clock/signal delay residual is

$$
\Delta_\chi^{\mathrm{clk\text{-}sig}}
=
a_\chi-a_\chi^{\mathrm{sig}}.
$$

The branch is shared-delay closed only when $\Delta_\chi^{\mathrm{clk\text{-}sig}}=0$ within the declared tolerance.

## Input Packet

Each scenario supplies:

| Field | Meaning |
| --- | --- |
| `gamma_eff` | PPN Shapiro-delay coefficient through $a_\chi^{\mathrm{sig}}=1+\gamma_{\text{eff}}$ |
| `response` | static weak-potential response vector $(a_n,a_\chi,a_\lambda,a_R)$ |
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
| `diagnostics.endpoint_sum` | cadence-stretch row sum |
| `diagnostics.endpoint_residual` | endpoint residual relative to $1$ |
| `diagnostics.clock_rate_sum` | inverse clock-rate row sum |
| `diagnostics.clock_rate_residual` | clock-rate residual relative to $-1$ |
| `diagnostics.row_inverse_residuals` | coefficient-by-coefficient residuals $b_i+\omega_i$ |

These diagnostics turn the first-order response vector into an executable closure object. A later constitutive simulation can replace the mock response values with measured $(a_n,a_\chi,a_\lambda,a_R)$ rows while keeping the same gate.

## Expected Mock Behavior

The default mock packet has four rows.

| Scenario | Expected behavior |
| --- | --- |
| `shared_delay_clean_gr_branch` | Passes with $\gamma_{\text{eff}}=1$, $a_\chi=2$, and $b_\chi=0.5$. |
| `density_scale_compensated_branch` | Passes with nonzero density, scale, and core-radius responses while preserving the endpoint and row-inverse constraints. |
| `split_clock_signal_delay_branch` | Fails shared-delay closure even though its endpoint and clock-rate rows close arithmetically. |
| `underclosed_clock_row` | Fails the endpoint and clock-rate sums while satisfying the shared-delay residual. |

The two failing rows are intentional failure witnesses. They show that a model can fit the static clock row while violating shared delay, or satisfy shared delay while underclosing the endpoint row.
