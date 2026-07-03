# Shapiro Time Delay

## Standard-Theory Concept

Shapiro delay is the extra round-trip travel time of signals passing near a gravitating mass. In the weak-field solar-system limit, the delay has the logarithmic form

$$
\Delta t_{\mathrm{Shapiro}}
\approx
\frac{2GM}{c^3}
\ln\!\left(\frac{4r_Er_R}{b^2}\right)
$$

up to convention-dependent endpoint factors, where $b$ is impact parameter. In PPN language it constrains $\gamma_{\text{PPN}}$ through null-path propagation.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

The relevant $\mathbb{A}\mathbb{A}\mathbb{A}$ signal is a Noether sea delay map: null-like observer paths are effective propagation records through $\mathcal{M}_{\mathrm{sea}}^{ab}$ and $\chi_{\text{sea}}(\mathbf{x},t)$. The gate is strong because the same response object must also support redshift, lensing, and orbital precession.

## Task Queue

1. `null_delay_integral` — Define $\Delta t=\int_{\mathrm{path}}\chi_{\text{sea}}\,d\ell/c_f$ relative to the far-field baseline. Status: `draft`.
2. `ppn_gamma_match` — Extract $\gamma_{\text{PPN}}$ from the effective metric map and compare against Shapiro bounds. Status: `draft`.
3. `shared_response_check` — Verify that the delay coefficient is the same one used by lensing and redshift. Status: `draft`.

## Closure Objects

- Path delay integral over $\chi_{\text{sea}}(\mathbf{x},t)$.
- Effective metric coefficient $g_{\mu\nu}^{\text{eff}}$ and PPN $\gamma_{\text{PPN}}$.
- Impact-parameter benchmark variable $b$.
- Benchmark residual $d_{\mathrm{Shapiro}}$ against validated solar-system timing.

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | [validation-gates](../validation-gates/priorities.md) | Add Shapiro delay as a gravity benchmark consuming the same $\mathcal{M}_{\mathrm{sea}}^{ab}$ as lensing and redshift. |
| This file | [mass-map/a0-medium-response-tensor-probe](../braid-mass-response-map/a0-medium-response-tensor-probe.md) | Use delay as a direct probe of the response tensor. |
| This file | [master-equation-closure](../master-equation-closure/priorities.md) | Tie the effective delay to causal-wake propagation and assembly response. |

## Failure Modes

- `shapiro.gamma_split`: Shapiro delay needs a $\gamma_{\text{PPN}}$ inconsistent with lensing.
- `shapiro.clock_signal_split`: clock-rate redshift and signal-path delay use different medium maps.
- `shapiro.fit_metric_only`: a GR metric is copied in without a Noether sea constitutive derivation.
- `shapiro.drag_artifact`: stable orbital propagation is described as dissipative drag rather than effective path delay.
