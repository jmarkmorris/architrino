# Gravitational Redshift And Clock Tests

## Standard-Theory Concept

In GR, gravitational redshift is the comparison of clock rates at different gravitational potentials or along different worldlines. In the weak-field static limit,

$$
\frac{\Delta \nu}{\nu}
\approx
\frac{\Delta \Phi_N}{c^2},
$$

and in a general stationary metric the ratio is read from the time-time metric component, for example $\nu_B/\nu_A\approx\sqrt{-g_{00}(A)/-g_{00}(B)}$. Pound-Rebka, gravitational clock comparisons, and GPS timing make this a precision benchmark rather than a philosophical claim about time.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

$\mathbb{A}\mathbb{A}\mathbb{A}$ treats the Euclidean void and absolute time as substrate ontology while clock-rate differences are effective observer records. The relevant corpus signals are the Noether sea delay factor $\chi_{\text{sea}}(\mathbf{x},t)$, the effective metric $g_{\mu\nu}^{\text{eff}}$, the constitutive potential $\Phi_{\text{eff}}$, and the Lorentz closure ladder that separates clock retuning from fundamental time.

The mapping target is not "gravity slows time" as ontology. The target is a clock-channel theorem: stable assemblies in different Noether sea states produce different operational tick rates while sharing one absolute time parameter $t$.

## Canonical $\mathbb{A}\mathbb{A}\mathbb{A}$ Mapping

The canon source for this branch is [Proper Time and Time Dilation](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md), with the weak-field observable checklist in [General Relativity](../../../content/markdown/aaa/spacetime/general-relativity.md). The clock law is an observer-level extraction from assembly dynamics:

$$
\frac{d\tau}{dt}
=
F\!\left(\mathbf{v},\rho_{\text{NS}}(\mathbf{x},t),n(\mathbf{x},t),\chi_{\text{sea}}(\mathbf{x},t),\Phi_{\text{eff}},\text{clock geometry}\right).
$$

In the weak-field, low-velocity observer limit, the benchmark is

$$
\frac{d\tau}{dt}
\approx
\sqrt{1+\frac{2\Phi_N}{c_0^2}-\frac{v^2}{c_0^2}},
\qquad
c_0=c_{\text{eff}}(\infty).
$$

Thus gravitational redshift is a clock-rate comparison produced by Noether sea response, not a change in substrate time. Primitive causal-root calculations may still use $c_f$, but precision clock tests use the dressed asymptotic clock/signal speed $c_0$ unless a closure result proves a special identification. The same coefficient record must also predict Shapiro delay, lensing, PPN parameters, and preferred-frame residuals.

## Candidate Closure Steps

These rows decompose the case at draft grade. They are not executable queue
authority; promote an accepted task into [work-queue.md](work-queue.md) before
execution.

1. `clock_channel` — Define the assembly clock observable $\omega_{\text{clk}}(\Gamma,\mathcal{M}_{\mathrm{sea}})$ and its weak-field expansion. Status: `draft`.
2. `potential_match` — Prove or bound $\Delta\omega_{\text{clk}}/\omega_0=\Delta\Phi_{\text{eff}}/c_0^2+O(\Phi_{\text{eff}}^2/c_0^4)$ in the observer weak-field branch, while keeping $c_f$ reserved for primitive delayed-root equations. Status: `draft`.
3. `gps_multi_channel` — Close clock-rate, signal-path, and orbital-dynamics corrections from one Noether sea response record. Status: `draft`.
4. `finite_height_clock_gate` — Recover $\Delta\nu/\nu\approx gL/c_0^2$ for height-resolved optical-clock comparisons from the same clock observable, including the collective-sample correction when phase spread across the apparatus is not negligible. Status: `draft`.

## Closure Objects

- Clock observable: $\omega_{\text{clk}}/\omega_0=d\tau_{\text{eff}}/dt$.
- Medium response: $\mathcal{M}_{\mathrm{sea}}^{ab}$ with density and delay variables $\rho_{\text{NS}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, and $\chi_{\text{sea}}(\mathbf{x},t)$.
- Effective potential: $\Phi_{\text{eff}}=c_f^2\ln(\Omega\xi)$ where the relevant constitutive subclass supports that map.
- Observer-speed convention: $c_0=c_{\text{eff}}(\infty)$ for precision weak-field clock comparisons; $c_f$ remains the primitive wake speed inside causal-root dynamics.
- Benchmark distance: $d_{\text{clk}}=|\Delta\nu/\nu-\Delta\Phi_N/c_0^2|$ in the weak-field limit.
- Shared-coefficient gate: the lapse/clock channel, signal-speed channel, spatial-compliance channel, and preferred-frame leakage coefficients must remain one replayable constitutive record.

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | [validation-gates](../dormant-deferred/validation-gates/priorities.md) | Add redshift as a gravity-sector benchmark with no separate clock-only coefficient. |
| This file | [master-equation-closure](../master-equation-closure/priorities.md) | Route clock retuning through assembly dynamics and Noether sea response. |
| This file | [cosmology-closure](../cosmology-closure/priorities.md) | Reuse the clock-channel map for cosmological redshift without importing fundamental expansion of the Euclidean void. |

## Failure Modes

- `clock.hidden_tuning`: redshift requires a clock coefficient not used by Shapiro, lensing, or PPN recovery.
- `clock.absolute_time_collapse`: effective proper time is treated as substrate time rather than a clock record.
- `clock.signal_split`: clock rate and signal propagation consume incompatible $\chi_{\text{sea}}$ maps.
- `clock.speed_conflation`: a primitive $c_f$ branch speed is silently substituted for the dressed observer speed $c_0$ in precision redshift tests.
- `clock.no_precision_limit`: the weak-field expansion cannot reach observed gravitational clock-test tolerances even after effective-metric handoff.
