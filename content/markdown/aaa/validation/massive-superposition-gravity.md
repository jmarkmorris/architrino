# Massive-Superposition Gravity Validation Packet

This packet turns massive-superposition gravity experiments into concrete validation targets. It belongs to the observable and inference layer: the task is to preserve the branch mass histories, coherence data, detector response, entanglement data, and record criteria without importing any external collapse ontology or quantum-metric ontology.

Related homes are [Measurement Ontology](../quantum/measurement-ontology.md#external-gravitational-which-path-benchmark), [Observer Framework](../spacetime/observer-framework.md#boundary-wake-covariance-scaffold), and [Constraint Ledger](constraint-ledger.md#massive-superposition-gravitational-distinguishability).

## Comparison Boundary

The packet may use external classical-quantum gravity proposals as comparison pressure, but only at the level of observables and inference. The comparison rows are:

| External comparison | Retained pressure | $\mathbb{A}\mathbb{A}\mathbb{A}$ use | Not imported |
| --- | --- | --- | --- |
| Oppenheim-style classical-quantum gravity | A classical or effective gravity readout must not reveal branch information while the quantum branch description still shows interference. | Bound $\mathcal{D}_{\mathrm{grav}}$, constrain $N_{AB}$, and require a Physical Observer record before treating gravity-side branch information as a measurement. | Stochastic-metric ontology, fundamental collapse, external terminology, or the claim that gravity must remain classical at the substrate level. |
| Gravitationally induced entanglement | Two isolated massive probes can acquire branch-dependent correlations through gravity alone. | Require the same effective-metric record $\theta$ to generate the branch interaction phase and to keep which-path leakage below the retained weak-probe threshold. | Constructor-theory doctrine, `Q-number` terminology, fundamental graviton ontology, or the claim that spacetime geometry itself has been prepared in superposition. |

Every averaged quantity in this packet is a run-record summary. A covariance matrix, branch expectation value, or correlation function may be used only after the Physical Observer access region, detector channel, boundary-data model, and persistence criterion have been declared. It may not be promoted into a primitive gravity state or collapse mechanism merely because it appears in a successful inference pipeline.

## Experiment-Family Classification

Different laboratory proposals enter this packet at different levels. The classification below keeps the observable pressure while preventing passive phase tests, active branch-mass tests, and mediated-entanglement tests from being treated as one result.

| Experiment family | Retained observable | Packet status | Interpretation guardrail |
| --- | --- | --- | --- |
| guided/free-fall atom-interferometer phase tests | fitted cubic-time phase coefficient $\widehat{\beta}_{T^3}$, fringe visibility, and control-phase record | passive external-field phase benchmark | Confirms or constrains the weak-field phase map; does not by itself test active self-gravity or fundamental collapse. |
| BEC, solid, nanoparticle, nanodiamond, membrane, or cantilever massive-superposition tests | branch mass histories $\rho_1,\rho_2$, visibility $\mathcal{V}(T)$, $\tau_{\text{meas}}$, $\Delta E_G$, and $\mathcal{D}_{\mathrm{grav}}$ | active branch-mass-history benchmark | Tests whether finite-time threshold resolution, ordinary decoherence, and Penrose-Diosi-like collapse scales remain quantitatively distinguishable. |
| two-probe gravitationally induced entanglement tests | cross-branch phase $\Delta\Phi_{\mathrm{ent}}$, entanglement witness $C_{\mathrm{obs}}$, and non-gravitational residual $\mathcal{R}_{\mathrm{nongrav}}$ | mediated-entanglement benchmark | Tests the shared gravity-side constitutive record without importing fundamental graviton ontology or a quantum-metric substrate. |

The packet should classify a run by the strongest observable it actually carries. A passive phase benchmark may constrain $\theta$ for later active-mass tests, but it cannot be used as evidence that gravity has or has not selected a branch. Conversely, an active branch-mass run that loses visibility must still show a record-forming separatrix crossing before the loss is interpreted as measurement rather than uncontrolled environmental decoherence.

## Observable Target

The target experiment compares two branch-level mass-density histories over an effective-observer coherence window $T_{\mathrm{run}}$:
$$
\rho_1(x_{\mathrm{eff}}^i,t_{\mathrm{eff}}),
\qquad
\rho_2(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})
$$
The branch pair is interference-preserving only if the apparatus and environment have not produced an autonomous which-path record. The gravitational or effective-metric channel therefore becomes a constraint through the response difference
$$
\Delta h_A(t_{\mathrm{eff}})
=
h_A(t_{\mathrm{eff}};\rho_1,\theta)-h_A(t_{\mathrm{eff}};\rho_2,\theta)
$$
where $A$ labels the resolved detector response channel and $\theta$ is the shared effective-metric constitutive record.

The which-path diagnostic is
$$
\mathcal{D}_{\mathrm{grav}}(T_{\mathrm{run}};\theta)
=
\int_0^{T_{\mathrm{run}}}\!\!\int_0^{T_{\mathrm{run}}}
\Delta h_A(t_{\mathrm{eff}})\,
N^{-1}_{AB}(t_{\mathrm{eff}},t'_{\mathrm{eff}};\theta)\,
\Delta h_B(t'_{\mathrm{eff}})\,dt_{\mathrm{eff}}\,dt'_{\mathrm{eff}}
$$
Here $N_{AB}$ is the observer-level covariance decomposed in [Observer Framework](../spacetime/observer-framework.md#boundary-wake-covariance-scaffold). It summarizes unresolved deterministic boundary histories and calibrated detector/environment residuals; it is not an ontological randomness postulate.

## Minimal Response Model

A concrete first packet can use a displaced normalized mass packet. Let $\varphi_\sigma$ be normalized by
$$
\int_{\Sigma_{t_{\mathrm{eff}}}^{\mathrm{eff}}}
\varphi_\sigma(x_{\mathrm{eff}}^i)\,d^3x_{\mathrm{eff}}
=
1
$$
For branch separation $d_{\mathrm{eff}}^i(t_{\mathrm{eff}})$ around center $x_{0,\mathrm{eff}}^i(t_{\mathrm{eff}})$, set
$$
\begin{aligned}
\rho_1(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})
&=
m\,\varphi_\sigma\!\left(
x_{\mathrm{eff}}^i-x_{0,\mathrm{eff}}^i(t_{\mathrm{eff}})-\frac{d_{\mathrm{eff}}^i(t_{\mathrm{eff}})}{2}
\right),\\
\rho_2(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})
&=
m\,\varphi_\sigma\!\left(
x_{\mathrm{eff}}^i-x_{0,\mathrm{eff}}^i(t_{\mathrm{eff}})+\frac{d_{\mathrm{eff}}^i(t_{\mathrm{eff}})}{2}
\right).
\end{aligned}
$$
Let $G_A(t_{\mathrm{eff}},t'_{\mathrm{eff}};x_{\mathrm{eff}}^i;\theta)$ be the detector response kernel implied by the same effective-metric constitutive record used for redshift, Shapiro delay, lensing, gravitational-wave speed, and, when the record is extrapolated to compact sources, horizon-scale ring/shadow imaging. The branch response is
$$
h_A(t_{\mathrm{eff}};\rho_k,\theta)
=
\int_0^{t_{\mathrm{eff}}}\!\int_{\Sigma_{t'_{\mathrm{eff}}}^{\mathrm{eff}}}
G_A(t_{\mathrm{eff}},t'_{\mathrm{eff}};x_{\mathrm{eff}}^i;\theta)\,
\rho_k(x_{\mathrm{eff}}^i,t'_{\mathrm{eff}})\,d^3x_{\mathrm{eff}}\,dt'_{\mathrm{eff}}
$$
Therefore
$$
\Delta h_A(t_{\mathrm{eff}})
=
\int_0^{t_{\mathrm{eff}}}\!\int_{\Sigma_{t'_{\mathrm{eff}}}^{\mathrm{eff}}}
G_A(t_{\mathrm{eff}},t'_{\mathrm{eff}};x_{\mathrm{eff}}^i;\theta)\,
\left[
\rho_1(x_{\mathrm{eff}}^i,t'_{\mathrm{eff}})-\rho_2(x_{\mathrm{eff}}^i,t'_{\mathrm{eff}})
\right]d^3x_{\mathrm{eff}}\,dt'_{\mathrm{eff}}
$$
When $\|d_{\mathrm{eff}}^i(t_{\mathrm{eff}})\|$ is small relative to the packet scale,
$$
\rho_1(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})-\rho_2(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})
=
-m\,d_{\mathrm{eff}}^i(t_{\mathrm{eff}})\,
\partial_i\varphi_\sigma(x_{\mathrm{eff}}^i-x_{0,\mathrm{eff}}^i(t_{\mathrm{eff}}))
+
O(\|d_{\mathrm{eff}}^i(t_{\mathrm{eff}})\|^3)
$$
so the leading branch response is
$$
\Delta h_A(t_{\mathrm{eff}})
\approx
-m\int_0^{t_{\mathrm{eff}}}
d_{\mathrm{eff}}^i(t'_{\mathrm{eff}})
\int_{\Sigma_{t'_{\mathrm{eff}}}^{\mathrm{eff}}}
G_A(t_{\mathrm{eff}},t'_{\mathrm{eff}};x_{\mathrm{eff}}^i;\theta)\,
\partial_i\varphi_\sigma(x_{\mathrm{eff}}^i-x_{0,\mathrm{eff}}^i(t'_{\mathrm{eff}}))\,d^3x_{\mathrm{eff}}\,dt'_{\mathrm{eff}}
$$
This gives the first closure equation: a mass displacement history should map to a predicted detector-channel separation before any interpretive claim about classical or quantum spacetime is introduced.

## Mediated Entanglement Comparison

A complementary massive-superposition test asks whether two independently prepared massive probes can become entangled through the gravity-side channel while non-gravitational couplings are suppressed or bounded. This is a positive branch-phase benchmark, not a new ontology. The observable is the final two-probe correlation record, together with the calibration record showing that electromagnetic, spin-spin, thermal, and apparatus cross-talk channels are too small to account for the effect.

Let the two probes be $A$ and $B$, with branch labels $a,b\in\{+,-\}$ and branch mass histories $\rho_A^a(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$ and $\rho_B^b(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$. The same weak-field constitutive record $\theta$ used for redshift, Shapiro delay, lensing, PPN, gravitational-wave speed, compact-source ring/shadow extrapolations, and $\mathcal{D}_{\mathrm{grav}}$ must determine the branch interaction energy
$$
U_{ab}^{\mathrm{eff}}(t_{\mathrm{eff}};\theta)
=
-G_{\mathrm{eff}}(\theta)
\int_{\Sigma_{t_{\mathrm{eff}}}^{\mathrm{eff}}}\!\!\int_{\Sigma_{t_{\mathrm{eff}}}^{\mathrm{eff}}}
\frac{\rho_A^a(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})\rho_B^b(y_{\mathrm{eff}}^i,t_{\mathrm{eff}})}
{\|x_{\mathrm{eff}}^i-y_{\mathrm{eff}}^i\|}
\,d^3x_{\mathrm{eff}}\,d^3y_{\mathrm{eff}}
+O(c_0^{-2})
$$
The branch phase is then
$$
\Phi_{ab}(T_{\mathrm{run}};\theta)
=
\frac{1}{\hbar}
\int_0^{T_{\mathrm{run}}}
U_{ab}^{\mathrm{eff}}(t_{\mathrm{eff}};\theta)\,dt_{\mathrm{eff}}
$$
Local branch phases can be absorbed into the one-probe descriptions. The entangling invariant is the cross-branch phase combination
$$
\Delta\Phi_{\mathrm{ent}}(T_{\mathrm{run}};\theta)
=
\Phi_{++}(T;\theta)+\Phi_{--}(T;\theta)
-\Phi_{+-}(T;\theta)-\Phi_{-+}(T;\theta)
$$
For the ideal equal-amplitude two-branch packet, a first witness target is
$$
C_{\mathrm{GIE}}(T_{\mathrm{run}};\theta)
=
\left|
\sin\frac{\Delta\Phi_{\mathrm{ent}}(T;\theta)}{2}
\right|
$$
This formula is an observer-level benchmark. It does not say that the Euclidean void is quantized, that the effective metric is fundamental, or that a graviton field is the native substrate. It says that the same gravity-side constitutive record must produce the branch phase that standard low-energy descriptions would attribute to gravitational mediation.

The comparison is meaningful only when the non-gravitational residual is bounded. Let $\mathcal{R}_{\mathrm{nongrav}}$ collect calibrated electromagnetic, spin-spin, Casimir, thermal, vibration, and apparatus cross-talk contributions to the same entanglement witness. A run can be used as a gravity-side validation target only if
$$
\mathcal{R}_{\mathrm{nongrav}}
\le
\varepsilon_{\mathrm{iso}}
$$
with $\varepsilon_{\mathrm{iso}}$ declared by the apparatus class and retained alongside the covariance record $N_{AB}$.

## Input Record Schema

The packet is evaluated on an explicit run record:

| Field | Symbol | Required content |
| --- | --- | --- |
| branch mass histories | $\rho_1,\rho_2$ | normalized mass-density histories on $\Sigma_{t_{\mathrm{eff}}}^{\mathrm{eff}}$ over $0\le t_{\mathrm{eff}}\le T_{\mathrm{run}}$ |
| branch separation | $d_{\mathrm{eff}}^i(t_{\mathrm{eff}})$ | center or multipole separation history with declared packet width $\sigma$ |
| apparatus/environment record | $\mathcal{A}_{\mathrm{rec}}$ | record variable, persistence window, environmental coupling channels, and ordinary decoherence estimate |
| gravity response kernel | $G_A(t_{\mathrm{eff}},t'_{\mathrm{eff}};x_{\mathrm{eff}}^i;\theta)$ | detector response derived from the same effective-metric constitutive record used in weak-field gravity |
| mediated-entanglement phase | $\Delta\Phi_{\mathrm{ent}}$ | cross-branch phase predicted from $\rho_A^a,\rho_B^b$ and the shared constitutive record $\theta$ |
| non-gravitational residual | $\mathcal{R}_{\mathrm{nongrav}}$ | calibrated bound on non-gravity channels that could create the observed correlation |
| covariance decomposition | $N_{AB}$ | detector noise, unresolved boundary-wake terms, environmental residuals, and calibration residuals |
| visibility data | $\mathcal{V}(T_{\mathrm{run}})$ | observed or predicted interference visibility over the run |
| entanglement data | $C_{\mathrm{obs}}$ | measured or predicted two-probe entanglement witness in the retained readout basis |
| record criteria | $R,\Sigma,T_{\text{rec}}$ | Physical Observer record variable, separatrix, and persistence threshold |

No row may be filled by changing the weak-field metric record after the positive gravity benchmarks have already been fit. The same $\theta$ must be replayable through redshift, Shapiro delay, lensing, PPN, gravitational-wave speed, compact-source ring/shadow extrapolations, and this massive-superposition packet.

## Evaluation Protocol

1. **Normalize the branch histories.** Verify $\int_{\Sigma_{t_{\mathrm{eff}}}^{\mathrm{eff}}}\rho_k(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})\,d^3x_{\mathrm{eff}}=m$ for each branch and each resolved time slice, or record the known mass exchange with the apparatus ledger.
2. **Compute the response difference.** Use one kernel $G_A(t_{\mathrm{eff}},t'_{\mathrm{eff}};x_{\mathrm{eff}}^i;\theta)$ to compute $h_A(t_{\mathrm{eff}};\rho_1,\theta)$, $h_A(t_{\mathrm{eff}};\rho_2,\theta)$, and $\Delta h_A(t_{\mathrm{eff}})$.
3. **Assemble the covariance.** Build $N_{AB}=N^{\mathrm{det}}_{AB}+N^{\mathrm{env}}_{AB}+N^{\mathrm{wake}}_{AB}+N^{\mathrm{cal}}_{AB}$, with each term either derived from the apparatus model or bounded by calibration data.
4. **Evaluate distinguishability.** Compute $\mathcal{D}_{\mathrm{grav}}(T_{\mathrm{run}};\theta)$ and compare it with $\varepsilon_{\mathrm{wp}}$.
5. **Evaluate record formation.** Compute $\tau_{\text{meas}}$, $\Delta_{\mathrm{rec}}$, and the persistence window from the measurement chapter's record criteria.
6. **Evaluate mediated entanglement when present.** If the run is a two-probe mediated-entanglement experiment, compute $\Delta\Phi_{\mathrm{ent}}$, $C_{\mathrm{GIE}}$, and $\mathcal{R}_{\mathrm{nongrav}}$ from the same run record.
7. **Classify the run.** Use the same output record to assign one of four statuses:

| Status | Conditions | Interpretation |
| --- | --- | --- |
| weak-probe | $\mathcal{D}_{\mathrm{grav}}\le\varepsilon_{\mathrm{wp}}$ and no durable record forms | gravitational response is too weak to act as a which-path record |
| mediated-entangling | $C_{\mathrm{GIE}}\ge C_{\mathrm{obs}}-\varepsilon_C$, $\mathcal{R}_{\mathrm{nongrav}}\le\varepsilon_{\mathrm{iso}}$, $\mathcal{D}_{\mathrm{grav}}\le\varepsilon_{\mathrm{wp}}$, and no durable which-path record forms | the branch phase is strong enough to account for the entanglement witness while the gravity-side readout remains below record threshold |
| record-forming | $\mathcal{D}_{\mathrm{grav}} > \varepsilon_{\mathrm{wp}}$, $\tau_{\text{meas}} < T_{\mathrm{run}}$, and $\Delta_{\mathrm{rec}}$ stays below threshold through $T_{\text{rec}}$ | the apparatus/environment has formed an autonomous record |
| falsifying | $\mathcal{D}_{\mathrm{grav}}\gg1$ while visibility remains high and no record-autonomy criterion is met | the effective-metric response overproduces observable which-path information |

For a white-noise readout approximation, $N_{AB}(t_{\mathrm{eff}},t'_{\mathrm{eff}})=S_{AB}\delta(t_{\mathrm{eff}}-t'_{\mathrm{eff}})$, the distinguishability reduces to
$$
\mathcal{D}_{\mathrm{grav}}(T_{\mathrm{run}};\theta)
=
\int_0^{T_{\mathrm{run}}}
\Delta h_A(t_{\mathrm{eff}})\,
S_{AB}^{-1}\,
\Delta h_B(t_{\mathrm{eff}})\,dt_{\mathrm{eff}}
$$
This special case is the first numerical target because it turns the validation packet into a finite time-series calculation once $m$, $\sigma$, $d_{\mathrm{eff}}^i(t_{\mathrm{eff}})$, $G_A$, and $S_{AB}$ are supplied.

## Worked Acceleration Bound

A first sanity bound can use a single acceleration readout channel before introducing a full detector geometry. Suppose the branch displacement is bounded by $\|d_{\mathrm{eff}}^i(t_{\mathrm{eff}})\|\le d_0$, the detector is at distance $R$ from the branch center with $d_0\ll R$, and the weak-field map satisfies $G_{\mathrm{eff}}(\theta)\to G$ in the tested regime. The branch acceleration difference is bounded by
$$
|\Delta h(t_{\mathrm{eff}})|
\le
\frac{2G_{\mathrm{eff}}(\theta)M d_0}{R^3}
$$
For a white acceleration readout covariance $N(t_{\mathrm{eff}},t'_{\mathrm{eff}})=S_a\delta(t_{\mathrm{eff}}-t'_{\mathrm{eff}})$, the distinguishability obeys
$$
\mathcal{D}_{\mathrm{grav}}(T_{\mathrm{run}};\theta)
\le
\frac{4G_{\mathrm{eff}}^2(\theta)M^2d_0^2T_{\mathrm{run}}}{R^6S_a}
$$
With benchmark values
$$
M=10^{-14}\,\mathrm{kg},\qquad
d_0=10^{-6}\,\mathrm{m},\qquad
R=10^{-3}\,\mathrm{m},\qquad
T_{\mathrm{run}}=1\,\mathrm{s}
$$
and an aggressive acceleration-noise amplitude
$$
S_a^{1/2}=10^{-15}\,\mathrm{m\,s^{-2}}/\sqrt{\mathrm{Hz}}
$$
the bound is
$$
\mathcal{D}_{\mathrm{grav}}
\lesssim
1.8\times10^{-12}
\left(\frac{M}{10^{-14}\,\mathrm{kg}}\right)^2
\left(\frac{d_0}{10^{-6}\,\mathrm{m}}\right)^2
\left(\frac{10^{-3}\,\mathrm{m}}{R}\right)^6
\left(\frac{T_{\mathrm{run}}}{1\,\mathrm{s}}\right)
\left(
\frac{10^{-15}\,\mathrm{m\,s^{-2}}/\sqrt{\mathrm{Hz}}}{S_a^{1/2}}
\right)^2
$$
For a which-path threshold of order unity, this run is deep in the weak-probe class. Solving the same bound for the mass needed to reach $\mathcal{D}_{\mathrm{grav}}\sim\varepsilon_{\mathrm{wp}}$ gives
$$
M_{\mathrm{crit}}
\approx
\frac{R^3}{2G_{\mathrm{eff}}(\theta)d_0}
\sqrt{\frac{\varepsilon_{\mathrm{wp}}S_a}{T_{\mathrm{run}}}}
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
\left(\frac{1\,\mathrm{s}}{T_{\mathrm{run}}}\right)^{1/2}
$$
This is not a new ontology or an experimental forecast. It is a scale check: for ordinary mesoscopic masses, gravity-side which-path leakage is negligible unless the branch mass, separation, proximity, coherence time, or readout sensitivity moves by many orders of magnitude. A full detector calculation should replace the scalar factor $2/R^3$ with the tensor response in the Minimal Response Model above.

## Acceptance Criteria

For an interference-preserving run, the metric or gravity-side readout must satisfy
$$
\mathcal{D}_{\mathrm{grav}}(T_{\mathrm{run}};\theta)
\le
\varepsilon_{\mathrm{wp}}
$$
For a mediated-entanglement run, the same record must also satisfy
$$
C_{\mathrm{GIE}}(T_{\mathrm{run}};\theta)
\ge
C_{\mathrm{obs}}-\varepsilon_C,
\qquad
\mathcal{R}_{\mathrm{nongrav}}
\le
\varepsilon_{\mathrm{iso}}
$$
This combined gate preserves the observable without overclaiming the interpretation: the run tests whether the retained gravity-side constitutive record can generate the observed branch correlation while avoiding premature which-path record formation.

If a which-path record is claimed instead, the measurement chapter's record criteria must also hold:
$$
\tau_{\text{meas}} < T_{\mathrm{run}},
\qquad
\sup_{t_{\mathrm{eff}}\in[\tau_{\text{meas}},\,\tau_{\text{meas}}+T_{\text{rec}}]}
\Delta_{\mathrm{rec}}(t_{\mathrm{eff}};k)
\le
\varepsilon_{\mathrm{rec}}
$$
The failure condition is strict. If $\mathcal{D}_{\mathrm{grav}}\gg1$ while interference visibility remains high and no record-autonomy condition is satisfied, the effective-metric response has overproduced observable which-path information.

The same $\theta$ must also remain compatible with the gravity-side ledger: redshift, Shapiro delay, lensing, PPN parameters, gravitational-wave speed, dispersion, detector-mode bounds, and compact-source ring/shadow extrapolations. A parameter set that fits the massive-superposition channel only by changing the weak-field metric record is not a valid closure.

## Simulation Target

The minimal simulation target is the map
$$
\mathcal{S}_{\mathrm{grav}}:
\left(
m,\sigma,d_{\mathrm{eff}}^i(t_{\mathrm{eff}}),T_{\mathrm{run}},G_A,N_{AB},R,\Sigma,\rho_A^a,\rho_B^b
\right)
\longmapsto
\left(
\mathcal{D}_{\mathrm{grav}},
\mathcal{V}(T_{\mathrm{run}}),
\Delta\Phi_{\mathrm{ent}},
C_{\mathrm{GIE}},
\tau_{\text{meas}},
\Delta_{\mathrm{rec}}
\right)
$$
The inputs are the branch mass scale, packet width, separation history, coherence window, detector response kernel, covariance decomposition, record variable, separatrix, and two-probe branch histories when present. The outputs are the gravitational distinguishability, interference visibility, entangling phase, mediated-entanglement witness, finite measurement time, and record-autonomy residual.

The worked acceleration bound supplies the first analytic $\mathcal{D}_{\mathrm{grav}}$ estimate. The mediated-entanglement comparison supplies the first branch-phase target. Full packet closure still requires one numerical or analytic instance that computes the retained outputs from a shared constitutive record and reports whether the branch pair is weak-probe, mediated-entangling, record-forming, or falsifying.
