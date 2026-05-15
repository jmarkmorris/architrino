# Massive-Superposition Gravity Validation Packet

This packet turns the massive-superposition gravitational which-path benchmark into a concrete validation target. It belongs to the observable and inference layer: the task is to preserve the branch mass histories, coherence data, detector response, and record criteria without importing any external collapse ontology.

Related homes are [Measurement Ontology](../quantum/measurement-ontology.md#external-gravitational-which-path-benchmark), [Observer Framework](../spacetime/observer-framework.md#boundary-wake-covariance-scaffold), and [Constraint Ledger](constraint-ledger.md#massive-superposition-gravitational-distinguishability).

## Comparison Boundary

The packet may use external classical-quantum gravity proposals as comparison pressure, but only at the level of observables and inference. The comparison row is:

| External comparison | Retained pressure | $\mathbb{A}\mathbb{A}\mathbb{A}$ use | Not imported |
| --- | --- | --- | --- |
| Oppenheim-style classical-quantum gravity | A classical or effective gravity readout must not reveal branch information while the quantum branch description still shows interference. | Bound $\mathcal{D}_{\mathrm{grav}}$, constrain $N_{AB}$, and require a Physical Observer record before treating gravity-side branch information as a measurement. | Stochastic-metric ontology, fundamental collapse, external terminology, or the claim that gravity must remain classical at the substrate level. |

## Observable Target

The target experiment compares two branch-level mass-density histories over a coherence window $T$:
$$
\rho_1(\mathbf{x},t),
\qquad
\rho_2(\mathbf{x},t).
$$
The branch pair is interference-preserving only if the apparatus and environment have not produced an autonomous which-path record. The gravitational or effective-metric channel therefore becomes a constraint through the response difference
$$
\Delta h_A(t)
=
h_A(t;\rho_1,\theta)-h_A(t;\rho_2,\theta),
$$
where $A$ labels the resolved detector response channel and $\theta$ is the shared effective-metric constitutive record.

The which-path diagnostic is
$$
\mathcal{D}_{\mathrm{grav}}(T;\theta)
=
\int_0^T\!\!\int_0^T
\Delta h_A(t)\,
N^{-1}_{AB}(t,t';\theta)\,
\Delta h_B(t')\,dt\,dt'.
$$
Here $N_{AB}$ is the observer-level covariance decomposed in [Observer Framework](../spacetime/observer-framework.md#boundary-wake-covariance-scaffold). It summarizes unresolved deterministic boundary histories and calibrated detector/environment residuals; it is not an ontological randomness postulate.

## Minimal Response Model

A concrete first packet can use a displaced normalized mass packet. Let $\varphi_\sigma$ be normalized by
$$
\int_{\Sigma_t}
\varphi_\sigma(\mathbf{x})\,d^3x
=
1.
$$
For branch separation $\mathbf{d}(t)$ around center $\mathbf{x}_0(t)$, set
$$
\begin{aligned}
\rho_1(\mathbf{x},t)
&=
m\,\varphi_\sigma\!\left(
\mathbf{x}-\mathbf{x}_0(t)-\frac{\mathbf{d}(t)}{2}
\right),\\
\rho_2(\mathbf{x},t)
&=
m\,\varphi_\sigma\!\left(
\mathbf{x}-\mathbf{x}_0(t)+\frac{\mathbf{d}(t)}{2}
\right).
\end{aligned}
$$
Let $G_A(t,s;\mathbf{x};\theta)$ be the detector response kernel implied by the same effective-metric constitutive record used for redshift, Shapiro delay, lensing, and gravitational-wave speed. The branch response is
$$
h_A(t;\rho_k,\theta)
=
\int_0^t\!\int_{\Sigma_s}
G_A(t,s;\mathbf{x};\theta)\,
\rho_k(\mathbf{x},s)\,d^3x\,ds.
$$
Therefore
$$
\Delta h_A(t)
=
\int_0^t\!\int_{\Sigma_s}
G_A(t,s;\mathbf{x};\theta)\,
\left[
\rho_1(\mathbf{x},s)-\rho_2(\mathbf{x},s)
\right]d^3x\,ds.
$$
When $\|\mathbf{d}(t)\|$ is small relative to the packet scale,
$$
\rho_1(\mathbf{x},t)-\rho_2(\mathbf{x},t)
=
-m\,d^i(t)\,
\partial_i\varphi_\sigma(\mathbf{x}-\mathbf{x}_0(t))
+
O(\|\mathbf{d}(t)\|^3),
$$
so the leading branch response is
$$
\Delta h_A(t)
\approx
-m\int_0^t
d^i(s)
\int_{\Sigma_s}
G_A(t,s;\mathbf{x};\theta)\,
\partial_i\varphi_\sigma(\mathbf{x}-\mathbf{x}_0(s))\,d^3x\,ds.
$$
This gives the first closure equation: a mass displacement history should map to a predicted detector-channel separation before any interpretive claim about classical or quantum spacetime is introduced.

## Input Record Schema

The packet is evaluated on an explicit run record:

| Field | Symbol | Required content |
| --- | --- | --- |
| branch mass histories | $\rho_1,\rho_2$ | normalized mass-density histories on $\Sigma_t$ over $0\le t\le T$ |
| branch separation | $\mathbf{d}(t)$ | center or multipole separation history with declared packet width $\sigma$ |
| apparatus/environment record | $\mathcal{A}_{\mathrm{rec}}$ | record variable, persistence window, environmental coupling channels, and ordinary decoherence estimate |
| gravity response kernel | $G_A(t,s;\mathbf{x};\theta)$ | detector response derived from the same effective-metric constitutive record used in weak-field gravity |
| covariance decomposition | $N_{AB}$ | detector noise, unresolved boundary-wake terms, environmental residuals, and calibration residuals |
| visibility data | $\mathcal{V}(T)$ | observed or predicted interference visibility over the run |
| record criteria | $R,\Sigma,T_{\text{rec}}$ | Physical Observer record variable, separatrix, and persistence threshold |

No row may be filled by changing the weak-field metric record after the positive gravity benchmarks have already been fit. The same $\theta$ must be replayable through redshift, Shapiro delay, lensing, PPN, gravitational-wave speed, and this massive-superposition packet.

## Evaluation Protocol

1. **Normalize the branch histories.** Verify $\int_{\Sigma_t}\rho_k(\mathbf{x},t)\,d^3x=m$ for each branch and each resolved time slice, or record the known mass exchange with the apparatus ledger.
2. **Compute the response difference.** Use one kernel $G_A(t,s;\mathbf{x};\theta)$ to compute $h_A(t;\rho_1,\theta)$, $h_A(t;\rho_2,\theta)$, and $\Delta h_A(t)$.
3. **Assemble the covariance.** Build $N_{AB}=N^{\mathrm{det}}_{AB}+N^{\mathrm{env}}_{AB}+N^{\mathrm{wake}}_{AB}+N^{\mathrm{cal}}_{AB}$, with each term either derived from the apparatus model or bounded by calibration data.
4. **Evaluate distinguishability.** Compute $\mathcal{D}_{\mathrm{grav}}(T;\theta)$ and compare it with $\varepsilon_{\mathrm{wp}}$.
5. **Evaluate record formation.** Compute $\tau_{\text{meas}}$, $\Delta_{\mathrm{rec}}$, and the persistence window from the measurement chapter's record criteria.
6. **Classify the run.** Use the same output record to assign one of three statuses:

| Status | Conditions | Interpretation |
| --- | --- | --- |
| weak-probe | $\mathcal{D}_{\mathrm{grav}}\le\varepsilon_{\mathrm{wp}}$ and no durable record forms | gravitational response is too weak to act as a which-path record |
| record-forming | $\mathcal{D}_{\mathrm{grav}} > \varepsilon_{\mathrm{wp}}$, $\tau_{\text{meas}} < T$, and $\Delta_{\mathrm{rec}}$ stays below threshold through $T_{\text{rec}}$ | the apparatus/environment has formed an autonomous record |
| falsifying | $\mathcal{D}_{\mathrm{grav}}\gg1$ while visibility remains high and no record-autonomy criterion is met | the effective-metric response overproduces observable which-path information |

For a white-noise readout approximation, $N_{AB}(t,t')=S_{AB}\delta(t-t')$, the distinguishability reduces to
$$
\mathcal{D}_{\mathrm{grav}}(T;\theta)
=
\int_0^T
\Delta h_A(t)\,
S_{AB}^{-1}\,
\Delta h_B(t)\,dt.
$$
This special case is the first numerical target because it turns the validation packet into a finite time-series calculation once $m$, $\sigma$, $\mathbf{d}(t)$, $G_A$, and $S_{AB}$ are supplied.

## Worked Acceleration Bound

A first sanity bound can use a single acceleration readout channel before introducing a full detector geometry. Suppose the branch displacement is bounded by $\|\mathbf{d}(t)\|\le d_0$, the detector is at distance $R$ from the branch center with $d_0\ll R$, and the weak-field map satisfies $G_{\mathrm{eff}}(\theta)\to G$ in the tested regime. The branch acceleration difference is bounded by
$$
|\Delta h(t)|
\le
\frac{2G_{\mathrm{eff}}(\theta)M d_0}{R^3}.
$$
For a white acceleration readout covariance $N(t,t')=S_a\delta(t-t')$, the distinguishability obeys
$$
\mathcal{D}_{\mathrm{grav}}(T;\theta)
\le
\frac{4G_{\mathrm{eff}}^2(\theta)M^2d_0^2T}{R^6S_a}.
$$
With benchmark values
$$
M=10^{-14}\,\mathrm{kg},\qquad
d_0=10^{-6}\,\mathrm{m},\qquad
R=10^{-3}\,\mathrm{m},\qquad
T=1\,\mathrm{s},
$$
and an aggressive acceleration-noise amplitude
$$
S_a^{1/2}=10^{-15}\,\mathrm{m\,s^{-2}}/\sqrt{\mathrm{Hz}},
$$
the bound is
$$
\mathcal{D}_{\mathrm{grav}}
\lesssim
1.8\times10^{-12}
\left(\frac{M}{10^{-14}\,\mathrm{kg}}\right)^2
\left(\frac{d_0}{10^{-6}\,\mathrm{m}}\right)^2
\left(\frac{10^{-3}\,\mathrm{m}}{R}\right)^6
\left(\frac{T}{1\,\mathrm{s}}\right)
\left(
\frac{10^{-15}\,\mathrm{m\,s^{-2}}/\sqrt{\mathrm{Hz}}}{S_a^{1/2}}
\right)^2.
$$
For a which-path threshold of order unity, this run is deep in the weak-probe class. Solving the same bound for the mass needed to reach $\mathcal{D}_{\mathrm{grav}}\sim\varepsilon_{\mathrm{wp}}$ gives
$$
M_{\mathrm{crit}}
\approx
\frac{R^3}{2G_{\mathrm{eff}}(\theta)d_0}
\sqrt{\frac{\varepsilon_{\mathrm{wp}}S_a}{T}},
$$
or, in the same benchmark geometry,
$$
M_{\mathrm{crit}}
\approx
7.5\times10^{-9}\,\mathrm{kg}\,
\varepsilon_{\mathrm{wp}}^{1/2}
\left(\frac{R}{10^{-3}\,\mathrm{m}}\right)^3
\left(\frac{10^{-6}\,\mathrm{m}}{d_0}\right)
\left(
\frac{S_a^{1/2}}{10^{-15}\,\mathrm{m\,s^{-2}}/\sqrt{\mathrm{Hz}}}
\right)
\left(\frac{1\,\mathrm{s}}{T}\right)^{1/2}.
$$
This is not a new ontology or an experimental forecast. It is a scale check: for ordinary mesoscopic masses, gravity-side which-path leakage is negligible unless the branch mass, separation, proximity, coherence time, or readout sensitivity moves by many orders of magnitude. A full detector calculation should replace the scalar factor $2/R^3$ with the tensor response in the Minimal Response Model above.

## Acceptance Criteria

For an interference-preserving run, the metric or gravity-side readout must satisfy
$$
\mathcal{D}_{\mathrm{grav}}(T;\theta)
\le
\varepsilon_{\mathrm{wp}}.
$$
If a which-path record is claimed instead, the measurement chapter's record criteria must also hold:
$$
\tau_{\text{meas}} < T,
\qquad
\sup_{t\in[\tau_{\text{meas}},\,\tau_{\text{meas}}+T_{\text{rec}}]}
\Delta_{\mathrm{rec}}(t;k)
\le
\varepsilon_{\mathrm{rec}}.
$$
The failure condition is strict. If $\mathcal{D}_{\mathrm{grav}}\gg1$ while interference visibility remains high and no record-autonomy condition is satisfied, the effective-metric response has overproduced observable which-path information.

The same $\theta$ must also remain compatible with the gravity-side ledger: redshift, Shapiro delay, lensing, PPN parameters, gravitational-wave speed, dispersion, and detector-mode bounds. A parameter set that fits the massive-superposition channel only by changing the weak-field metric record is not a valid closure.

## Simulation Target

The minimal simulation target is the map
$$
\mathcal{S}_{\mathrm{grav}}:
\left(
m,\sigma,\mathbf{d}(t),T,G_A,N_{AB},R,\Sigma
\right)
\longmapsto
\left(
\mathcal{D}_{\mathrm{grav}},
\mathcal{V}(T),
\tau_{\text{meas}},
\Delta_{\mathrm{rec}}
\right).
$$
The inputs are the branch mass scale, packet width, separation history, coherence window, detector response kernel, covariance decomposition, record variable, and separatrix. The outputs are the gravitational distinguishability, interference visibility, finite measurement time, and record-autonomy residual.

The worked acceleration bound supplies the first analytic $\mathcal{D}_{\mathrm{grav}}$ estimate. Full packet closure still requires one numerical or analytic instance that computes all four outputs from a shared constitutive record and reports whether the branch pair is weak-probe, record-forming, or falsifying.
