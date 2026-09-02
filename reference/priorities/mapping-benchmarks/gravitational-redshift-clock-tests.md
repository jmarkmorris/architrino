# Gravitational Redshift And Clock Tests

## Standard-Theory Concept

In GR, gravitational redshift is the comparison of clock rates at different gravitational potentials or along different worldlines. In the weak-field static limit,

$$
\frac{\Delta \nu}{\nu}
\approx
\frac{\Delta \Phi_N}{c^2},
$$

and in a general stationary metric the ratio is read from the time-time metric component, for example $\nu_B/\nu_A\approx\sqrt{-g_{00}(A)/-g_{00}(B)}$. Pound-Rebka, gravitational clock comparisons, and GPS timing make this a precision benchmark rather than a philosophical claim about time.

## XTM-001 Source-Bound Benchmark

### Source and measured record

C. W. Chou, D. B. Hume, T. Rosenband, and D. J. Wineland, [*Optical Clocks and Relativity*](https://doi.org/10.1126/science.1192720), *Science* 329 (2010), 1630–1633, DOI `10.1126/science.1192720`, is the primary source. NIST preserves the [official publication record and public paper download](https://www.nist.gov/publications/relativity-and-optical-clocks).

The experiment compared two independent $^{27}\mathrm{Al}^{+}$ optical clocks through 75 m of phase-stabilized optical fiber. The Al-Mg clock began 17 cm below the Al-Be reference and was then raised 33 cm. Approximately 100,000 s of lower-position data and 40,000 s of raised-position data gave the measured difference-in-differences

$$
y_{\mathrm{obs}}
=
\left(4.1\pm1.6\right)\times10^{-17}.
$$

The paper's weak-field comparison is $\Delta\nu/\nu=g\Delta h/c^2$, stated as approximately $1.1\times10^{-16}$ per meter near the laboratory. The independently surveyed $\Delta h=0.33\,\mathrm m$ therefore gives

$$
y_{\mathrm{ref}}
=
\left(1.1\times10^{-16}\,\mathrm m^{-1}\right)
\left(0.33\,\mathrm m\right)
=
3.63\times10^{-17},
$$

which differs from $y_{\mathrm{obs}}$ by about $0.29$ reported standard uncertainties. The paper also reports the clock-inferred height change as $37\pm15$ cm, consistent with the surveyed 33 cm.

Claim grades: $y_{\mathrm{obs}}$, its uncertainty, the run durations, fiber length, surveyed displacement, and clock-inferred displacement are **measured** by the Chou et al. apparatus and survey. $y_{\mathrm{ref}}$ and the $0.29$ comparison are **derived observer-level checks** from the source's stated weak-field slope; they are not $\mathbb{A}\mathbb{A}\mathbb{A}$ results.

Plainly: the clock record detects the sign and size expected from raising one clock by roughly one foot. That agreement is the external target. It does not explain which assembly and Noether sea dynamics produced the changed clock rate.

### Required native carrier

Let $k\in\{L,H\}$ denote the lower and raised apparatus configurations. A future native comparison must bind one versioned record

$$
\Theta_{\mathrm{NIST}}
=
\left(
\mathcal H_{\mathrm{AlMg}}^{L,H},
\mathcal H_{\mathrm{AlBe}},
\Gamma_N^{L,H,\mathrm{ref}},
\mathcal M_{\mathrm{sea}}^{L,H,\mathrm{ref}},
\mathcal H_{\mathrm{fiber}}^{L,H},
\mathcal D_{\mathrm{ratio}}^{L,H},
\Delta h,
W_{L,H}
\right).
$$

The clock histories must identify the retained clock assemblies and their tick observables. $Gamma_N$ is the locally extracted Noether sea cadence-stretch row, $mathcal M_{\mathrm{sea}}$ is the source-to-endpoint sea state and its evolution over both measurement windows, $mathcal H_{\mathrm{fiber}}$ is the phase-stabilized transfer history, and $mathcal D_{\mathrm{ratio}}$ is the frequency-comparison readout. The low and high records must preserve apparatus identity, source, path, receiver, height survey, calibration, and uncertainty provenance.

Plainly: the native model must describe the two clocks, the environment at both heights, the optical link between laboratories, and the ratio measurement on one record. A fitted clock factor with no path or apparatus history is not the carrier this benchmark requires.

### Prediction and acceptance residual

Use the clock-rate factor $C_N=\Gamma_N^{-1}$ only after its assembly-to-sea mismatch residual is explicit. Define the modeled difference-in-differences by

$$
y_{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\left[
\ln\frac{\nu_{\mathrm{AlMg}}}{\nu_{\mathrm{AlBe}}}
\right]_{H}
-
\left[
\ln\frac{\nu_{\mathrm{AlMg}}}{\nu_{\mathrm{AlBe}}}
\right]_{L},
$$

with the endpoint-clock, fiber-transfer, receiver, and unresolved terms reported separately:

$$
y_{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\Delta\ln C_N
+
\Delta\ln Y_{\mathrm{fiber}}
+
\Delta\ln D_{\mathrm{recv}}
+
\mathcal R_{\mathrm{unresolved}}.
$$

The benchmark residual is

$$
r_{\mathrm{NIST}}
=
\frac{y_{\mathbb{A}\mathbb{A}\mathbb{A}}-4.1\times10^{-17}}
{1.6\times10^{-17}}.
$$

The source-bound case is accepted at benchmark-comparison grade only if all $Theta_{\mathrm{NIST}}$ rows resolve, $|r_{\mathrm{NIST}}|\le2$, the predicted shift has the sign of the raised-clock observation, a zero-height matched control is null within its frozen tolerance, exchanging the high and low configurations reverses the sign, and transfer/receiver terms remain within their independently recorded control bounds. The factor of two is the predeclared comparison envelope for this packet, not a claim that a two-standard-uncertainty rule is universally sufficient.

Plainly: the test asks the native record to land inside the measured uncertainty band and to pass zero and sign-reversal controls. It may not hide a wrong clock shift inside an unmeasured fiber or receiver correction.

### Current result and failure predicate

Current status: `blocked_missing_native_clock_transport_record`. No retained clock-assembly histories, same-record $Gamma_N$ extraction, Noether sea evolution record, or native fiber/readout decomposition is cited by this packet, so $y_{\mathbb{A}\mathbb{A}\mathbb{A}}$ and $r_{\mathrm{NIST}}$ are not evaluated.

The benchmark fails with any of the following conditions:

- `clock.missing_native_carrier`: any required $Theta_{\mathrm{NIST}}$ row is absent, attempt-only, or drawn from a different record;
- `clock.wrong_height_parity`: the prediction is nonzero at zero height or does not reverse when the height configurations are exchanged;
- `clock.transport_absorption`: fiber, receiver, launch, or calibration terms absorb the endpoint clock residual without an independent control record;
- `clock.hidden_tuning`: the clock/sea coefficient is fitted to this datum or differs from the coefficient used by sibling clock, signal-delay, lensing, or PPN comparisons without a declared state variable;
- `clock.data_residual`: the complete predeclared record gives $|r_{\mathrm{NIST}}|>2$; or
- `clock.absolute_time_collapse`: the observed clock-rate difference is reclassified as a change in substrate absolute time.

Plainly: the packet is complete as a benchmark specification and presently fails closed as a physical recovery. Passing will require actual native clock, sea, transfer, and readout evidence, not another restatement of the standard formula.

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

These rows decompose the case at draft grade. They are not executable queue authority; promote an accepted task into [work-queue.md](work-queue.md) before execution.

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
| This file | [mapping-cosmology](../mapping-cosmology/priorities.md) | Reuse the clock-channel map for cosmological redshift without importing fundamental expansion of the Euclidean void. |

## Failure Modes

- `clock.hidden_tuning`: redshift requires a clock coefficient not used by Shapiro, lensing, or PPN recovery.
- `clock.absolute_time_collapse`: effective proper time is treated as substrate time rather than a clock record.
- `clock.signal_split`: clock rate and signal propagation consume incompatible $\chi_{\text{sea}}$ maps.
- `clock.speed_conflation`: a primitive $c_f$ branch speed is silently substituted for the dressed observer speed $c_0$ in precision redshift tests.
- `clock.no_precision_limit`: the weak-field expansion cannot reach observed gravitational clock-test tolerances even after effective-metric handoff.
