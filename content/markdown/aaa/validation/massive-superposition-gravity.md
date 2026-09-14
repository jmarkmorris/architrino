# Massive-Superposition Gravity Validation Packet

This packet turns massive-superposition gravity experiments into concrete validation targets. It belongs to the observable and inference layer: the task is to preserve the branch mass histories, coherence data, detector response, entanglement data, and record criteria without importing any external collapse ontology or quantum-metric ontology.

Related homes are [Measurement Ontology](../quantum/measurement-ontology.md#external-gravitational-which-path-benchmark), [Observer Framework](../spacetime/observer-framework.md#boundary-wake-covariance-scaffold), and [Constraint Ledger](constraint-ledger.md#massive-superposition-gravitational-distinguishability).

## Comparison Boundary

The packet may use external classical-quantum gravity proposals as comparison pressure, but only at the level of observables and inference. Three objects recur in the rows and are defined in Observable Target below: the gravitational which-path distinguishability $\mathcal{D}_{\mathrm{grav}}$, a squared signal-to-noise ratio measuring how well a gravity-side readout separates the two branches; the readout covariance $N_{AB}$, which summarizes the detector, environment, and boundary-wake residuals (causal wakes entering the observer's access region from histories it does not resolve) that the readout cannot separate from signal; and the shared effective-metric constitutive record $\theta$, the one weak-field gravity description that every gravity benchmark in the corpus must reuse. A Physical Observer is an assembly inside the Noether sea whose clocks, rulers, and detector records are themselves dynamical outputs, as developed in [Observer Framework](../spacetime/observer-framework.md#physical-observers). The comparison rows are:

| External comparison | Retained pressure | $\mathbb{A}\mathbb{A}\mathbb{A}$ use | Not imported |
| --- | --- | --- | --- |
| Oppenheim-style classical-quantum gravity | A classical or effective gravity readout must not reveal branch information while the quantum branch description still shows interference. | Bound $\mathcal{D}_{\mathrm{grav}}$, constrain $N_{AB}$, and require a Physical Observer record before treating gravity-side branch information as a measurement. | Stochastic-metric ontology, fundamental collapse, external terminology, or the claim that gravity must remain classical at the substrate level. |
| Gravitationally induced entanglement | Two isolated massive probes can acquire branch-dependent correlations through gravity alone. | Require the same effective-metric record $\theta$ to generate the branch interaction phase and to keep which-path leakage below the retained weak-probe threshold. | Constructor-theory doctrine, `Q-number` terminology, fundamental graviton ontology, or the claim that spacetime geometry itself has been prepared in superposition. |

Every averaged quantity in this packet is a run-record summary. A covariance matrix, branch expectation value, or correlation function may be used only after the Physical Observer access region, detector channel, boundary-data model, and persistence criterion have been declared. It may not be promoted into a primitive gravity state or collapse mechanism merely because it appears in a successful inference pipeline.

## Experiment-Family Classification

Different laboratory proposals enter this packet at different levels. The classification below keeps the observable pressure while preventing passive phase tests, active branch-mass tests, and mediated-entanglement tests from being treated as one result.

| Experiment family | Retained observable | Packet status | Interpretation guardrail |
| --- | --- | --- | --- |
| guided/free-fall atom-interferometer phase tests | fitted cubic-time phase coefficient $\widehat{\beta}_{T^3}$ of the guided/free-fall protocol in [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md#finite-height-clock-benchmark), fringe visibility, and control-phase record | passive external-field phase benchmark | Confirms or constrains the weak-field phase map; does not by itself test active self-gravity or fundamental collapse. |
| BEC, solid, nanoparticle, nanodiamond, membrane, or cantilever massive-superposition tests | branch mass histories $\rho_1,\rho_2$, visibility $\mathcal{V}(T_W)$, the finite measurement time $\tau_{\text{meas}}$, the gravitational self-energy scale $\Delta E_G$ of the branch mass difference defined in [Measurement Ontology](../quantum/measurement-ontology.md#external-penrose-diosi-benchmark), and $\mathcal{D}_{\mathrm{grav}}$ | active branch-mass-history benchmark | Tests whether finite-time threshold resolution, ordinary decoherence, and Penrose-Diosi-like collapse scales remain quantitatively distinguishable. |
| two-probe gravitationally induced entanglement tests | cross-branch phase $\Delta\Phi_{\mathrm{ent}}$, entanglement witness $C_{\mathrm{obs}}$, and non-gravitational residual $\mathcal{R}_{\mathrm{nongrav}}$ | mediated-entanglement benchmark | Tests the shared gravity-side constitutive record without importing fundamental graviton ontology or a quantum-metric substrate. |

The packet should classify a run by the strongest observable it actually carries. A passive phase benchmark may constrain $\theta$ for later active-mass tests, but it cannot be used as evidence that gravity has or has not selected a branch. Conversely, an active branch-mass run that loses visibility must still satisfy the record and persistence criteria. A claimed separatrix crossing refers to a driven or reduced threshold between record outcomes; an invariant basin boundary of a complete autonomous flow is not crossed by that flow. The relevant threshold and retained state must be specified consistently with [Measurement Ontology](../quantum/measurement-ontology.md#minimal-dynamical-model), before the loss is interpreted as measurement rather than uncontrolled environmental decoherence.

## Observable Target

The target experiment compares two branch-level mass-density histories over an effective-observer coherence window $T_W$:
$$
\rho_1(x_{\mathrm{eff}}^i,t_{\mathrm{eff}}),
\qquad
\rho_2(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-c69723565da73081)

The branch pair is interference-preserving only if the apparatus and environment have not produced an autonomous which-path record. The gravitational or effective-metric channel therefore becomes a constraint through the response difference
$$
\Delta h_A(t_{\mathrm{eff}})
=
h_A(t_{\mathrm{eff}};\rho_1,\theta)-h_A(t_{\mathrm{eff}};\rho_2,\theta)
$$

[View →](../../../../equation-mapping.html#corpus-equation-375d225ad5501528)

where $A$ labels the resolved detector response channel and $\theta$ is the shared effective-metric constitutive record. The response $h_A$ is the object written $s_A$ in the [external benchmark of Measurement Ontology](../quantum/measurement-ontology.md#external-gravitational-which-path-benchmark).

The which-path diagnostic is
$$
\mathcal{D}_{\mathrm{grav}}(T_W;\theta)
=
\int_0^{T_W}\!\!\int_0^{T_W}
\Delta h_A(t_{\mathrm{eff}})\,
N^{-1}_{AB}(t_{\mathrm{eff}},t'_{\mathrm{eff}};\theta)\,
\Delta h_B(t'_{\mathrm{eff}})\,dt_{\mathrm{eff}}\,dt'_{\mathrm{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-50e88c5154061093)

Here $N_{AB}$ is the observer-level covariance decomposed in [Observer Framework](../spacetime/observer-framework.md#boundary-wake-covariance-scaffold). It summarizes unresolved deterministic boundary histories and calibrated detector/environment residuals; it is not an ontological randomness postulate. The inverse $N^{-1}_{AB}$ is the operator inverse on a declared finite-bandwidth readout space on which the covariance is positive definite, not an entrywise reciprocal; a singular covariance requires an explicit supported-subspace or regularized model before the diagnostic is evaluated. The diagnostic is a squared signal-to-noise ratio: it measures how far apart the two branch responses are, in units of the unresolved readout fluctuations, summed over the channel pairs $A,B$ and over the window.

## Minimal Response Model

A concrete first packet can use a displaced normalized mass packet. Let $\varphi_\sigma$ be normalized by
$$
\int_{\Sigma_{t_{\mathrm{eff}}}^{\mathrm{eff}}}
\varphi_\sigma(x_{\mathrm{eff}}^i)\,d^3x_{\mathrm{eff}}
=
1
$$

[View →](../../../../equation-mapping.html#corpus-equation-e4d48d120889744e)

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

[View →](../../../../equation-mapping.html#corpus-equation-4fd6fbfe6f73ce2f)

Let $G_A(t_{\mathrm{eff}},t'_{\mathrm{eff}};x_{\mathrm{eff}}^i;\theta)$ be the detector response kernel implied by the same effective-metric constitutive record used for the classical weak-field benchmarks developed in [General Relativity](../spacetime/general-relativity.md) and [PPN Parameters](../spacetime/ppn-parameters.md): gravitational redshift (the clock-rate shift between different depths in a potential), Shapiro delay (the extra travel time of a signal passing near a mass), lensing (the bending of light paths near a mass), gravitational-wave speed, and, when the record is extrapolated to compact sources, horizon-scale ring/shadow imaging. The kernel gives the channel-$A$ readout at time $t_{\mathrm{eff}}$ produced by a unit of mass density at $x_{\mathrm{eff}}^i$ at the earlier time $t'_{\mathrm{eff}}$. The following branch response is the contribution after the run origin. It assumes zero initial response, or subtraction of a common prehistory response. Any branch-dependent prehistory or initial detector response must instead be included in $h_A$ and its difference before evaluating distinguishability. Under that convention the branch response is
$$
h_A(t_{\mathrm{eff}};\rho_k,\theta)
=
\int_0^{t_{\mathrm{eff}}}\!\int_{\Sigma_{t'_{\mathrm{eff}}}^{\mathrm{eff}}}
G_A(t_{\mathrm{eff}},t'_{\mathrm{eff}};x_{\mathrm{eff}}^i;\theta)\,
\rho_k(x_{\mathrm{eff}}^i,t'_{\mathrm{eff}})\,d^3x_{\mathrm{eff}}\,dt'_{\mathrm{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-2dbca964292c79b2)

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

[View →](../../../../equation-mapping.html#corpus-equation-302094ee722b2d79)

When $\|d_{\mathrm{eff}}^i(t_{\mathrm{eff}})\|$ is small relative to the packet scale,
$$
\rho_1(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})-\rho_2(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})
=
-m\,d_{\mathrm{eff}}^i(t_{\mathrm{eff}})\,
\partial_i\varphi_\sigma(x_{\mathrm{eff}}^i-x_{0,\mathrm{eff}}^i(t_{\mathrm{eff}}))
+
O(\|d_{\mathrm{eff}}^i(t_{\mathrm{eff}})\|^3)
$$

[View →](../../../../equation-mapping.html#corpus-equation-fd544e0647db09fe)

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

[View →](../../../../equation-mapping.html#corpus-equation-0e4a6803bb07bbdd)

This gives the first closure equation: a mass displacement history should map to a predicted detector-channel separation before any interpretive claim about classical or quantum spacetime is introduced.

## Mediated Entanglement Comparison

A complementary massive-superposition test asks whether two independently prepared massive probes can become entangled through the gravity-side channel while non-gravitational couplings are suppressed or bounded. This is a positive branch-phase benchmark, not a new ontology. The observable is the final two-probe correlation record, together with the calibration record showing that electromagnetic, spin-spin, thermal, and apparatus cross-talk channels are too small to account for the effect.

Let the two probes be $A$ and $B$, with branch labels $a,b\in\{+,-\}$ and branch mass histories $\rho_A^a(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$ and $\rho_B^b(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$. The same weak-field constitutive record $\theta$ used for redshift, Shapiro delay, lensing, the parameterized post-Newtonian (PPN) parameters, gravitational-wave speed, compact-source ring/shadow extrapolations, and $\mathcal{D}_{\mathrm{grav}}$ must determine the branch interaction energy
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

[View →](../../../../equation-mapping.html#corpus-equation-c958539326c1fe1e)

Here $G_{\mathrm{eff}}(\theta)$ is the effective gravitational coupling fixed by the record $\theta$, which must reduce to Newton's constant $G$ wherever the classical benchmarks are met, and $c_0$ is the asymptotic observer-sector speed calibration, so the $O(c_0^{-2})$ term collects the post-Newtonian corrections carried by the same record. The double integral is the Newtonian interaction energy of the two branch mass distributions, negative because the interaction is attractive. The branch phase is then
$$
\Phi_{ab}(T_W;\theta)
=
\frac{1}{\hbar}
\int_0^{T_W}
U_{ab}^{\mathrm{eff}}(t_{\mathrm{eff}};\theta)\,dt_{\mathrm{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-be3fcd29783bff71)

where $\hbar$ is the reduced Planck constant, entering as the observer-level action-to-phase conversion of the standard low-energy description; the overall sign convention of the phase does not affect the witness below. Local branch phases can be absorbed into the one-probe descriptions. The entangling invariant is the cross-branch phase combination
$$
\Delta\Phi_{\mathrm{ent}}(T_W;\theta)
=
\Phi_{++}(T_W;\theta)+\Phi_{--}(T_W;\theta)
-\Phi_{+-}(T_W;\theta)-\Phi_{-+}(T_W;\theta)
$$

[View →](../../../../equation-mapping.html#corpus-equation-445d12e9377697cc)

Any phase of the form $\alpha_a+\beta_b$, attributable to one probe alone, cancels in this combination, which is why it is the entangling invariant. For the ideal equal-amplitude two-branch packet, a first witness target is
$$
C_{\mathrm{GIE}}(T_W;\theta)
=
\left|
\sin\frac{\Delta\Phi_{\mathrm{ent}}(T_W;\theta)}{2}
\right|
$$

[View →](../../../../equation-mapping.html#corpus-equation-a2fd3ef591382d1e)

This is the concurrence of the ideal four-branch state. For equal amplitudes the state is separable exactly when $\Delta\Phi_{\mathrm{ent}}$ is a multiple of $2\pi$, and the concurrence of a pure two-qubit state with amplitudes $c_{ab}$ is $2|c_{++}c_{--}-c_{+-}c_{-+}|$, which evaluates to the displayed sine. Here $C_{\mathrm{obs}}$ denotes a calibrated numerical lower bound on concurrence inferred from the measured witness, not an arbitrary witness value. The one-sided test below is a necessary consistency screen; agreement with the measured joint probabilities and their uncertainties is additionally required to validate the predicted correlations. This formula is an observer-level benchmark. It does not say that the [Euclidean void](../foundations/euclidean-void.md) is quantized, that the [effective metric](../spacetime/emergent-metric.md) is fundamental, or that a graviton field is the native substrate. It says that the same gravity-side constitutive record must produce the branch phase that standard low-energy descriptions would attribute to gravitational mediation.

The comparison is meaningful only when the non-gravitational residual is bounded. Let $\mathcal{R}_{\mathrm{nongrav}}$ collect calibrated electromagnetic, spin-spin, Casimir, thermal, vibration, and apparatus cross-talk contributions to the same entanglement witness. A run can be used as a gravity-side validation target only if
$$
\mathcal{R}_{\mathrm{nongrav}}
\le
\varepsilon_{\mathrm{iso}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-513877d2a0e424f8)

with $\varepsilon_{\mathrm{iso}}$ declared by the apparatus class and retained alongside the covariance record $N_{AB}$.

## Input Record Schema

The packet is evaluated on an explicit run record:

| Field | Symbol | Required content |
| --- | --- | --- |
| branch mass histories | $\rho_1,\rho_2$ | mass-density histories on $\Sigma_{t_{\mathrm{eff}}}^{\mathrm{eff}}$ over $0\le t_{\mathrm{eff}}\le T_W$, each integrating to the branch mass $m$ |
| branch separation | $d_{\mathrm{eff}}^i(t_{\mathrm{eff}})$ | center or multipole separation history with declared packet width $\sigma$ |
| apparatus/environment record | $\mathcal{A}_{\mathrm{rec}}$ | record variable, persistence window, environmental coupling channels, and ordinary decoherence estimate |
| gravity response kernel | $G_A(t_{\mathrm{eff}},t'_{\mathrm{eff}};x_{\mathrm{eff}}^i;\theta)$ | detector response derived from the same effective-metric constitutive record used in weak-field gravity |
| mediated-entanglement phase | $\Delta\Phi_{\mathrm{ent}}$ | cross-branch phase predicted from $\rho_A^a,\rho_B^b$ and the shared constitutive record $\theta$ |
| non-gravitational residual | $\mathcal{R}_{\mathrm{nongrav}}$ | calibrated bound on non-gravity channels that could create the observed correlation |
| covariance decomposition | $N_{AB}$ | detector noise, unresolved boundary-wake terms, environmental residuals, and calibration residuals |
| visibility data | $\mathcal{V}(T_W)$ | observed or predicted interference visibility over the run |
| entanglement data | $C_{\mathrm{obs}}$ | calibrated concurrence lower bound from the two-probe witness in the retained readout basis |
| record criteria | $R,\Sigma,T_{\text{rec}}$ | Physical Observer record variable (the coarse apparatus readout that stores the outcome), separatrix (a specified driven or reduced record threshold, not a crossed invariant autonomous basin boundary), and persistence threshold, as defined in [Measurement Ontology](../quantum/measurement-ontology.md#what-makes-an-interaction-a-record) |

No row may be filled by changing the weak-field metric record after the positive gravity benchmarks have already been fit. The same $\theta$ must be replayable through redshift, Shapiro delay, lensing, PPN, gravitational-wave speed, compact-source ring/shadow extrapolations, and this massive-superposition packet.

## Evaluation Protocol

1. **Normalize the branch histories.** Verify $\int_{\Sigma_{t_{\mathrm{eff}}}^{\mathrm{eff}}}\rho_k(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})\,d^3x_{\mathrm{eff}}=m$ for each branch and each resolved time slice, or record the known mass exchange with the apparatus ledger.
2. **Compute the response difference.** Use one kernel $G_A(t_{\mathrm{eff}},t'_{\mathrm{eff}};x_{\mathrm{eff}}^i;\theta)$ to compute $h_A(t_{\mathrm{eff}};\rho_1,\theta)$, $h_A(t_{\mathrm{eff}};\rho_2,\theta)$, and $\Delta h_A(t_{\mathrm{eff}})$.
3. **Assemble the covariance.** Build $N_{AB}=N^{\mathrm{det}}_{AB}+N^{\mathrm{env}}_{AB}+N^{\mathrm{bw}}_{AB}+N^{\mathrm{cal}}_{AB}$, where $N^{\mathrm{bw}}_{AB}$ is the boundary-wake covariance defined in [Observer Framework](../spacetime/observer-framework.md#boundary-wake-covariance-scaffold), with each term either derived from the apparatus model or bounded by calibration data. The additive form holds only when the cross-kernels between all four boundary-wake, detector, environment, and calibration residuals vanish under the same joint conditional law; otherwise those cross-kernels are retained, as that owner requires.
4. **Evaluate distinguishability.** Compute $\mathcal{D}_{\mathrm{grav}}(T_W;\theta)$ and compare it with $\varepsilon_{\mathrm{wp}}$.
5. **Evaluate record formation.** Compute $\tau_{\text{meas}}$, $\Delta_{\mathrm{rec}}$, and the persistence window from the measurement chapter's record criteria.
6. **Evaluate mediated entanglement when present.** If the run is a two-probe mediated-entanglement experiment, compute $\Delta\Phi_{\mathrm{ent}}$, $C_{\mathrm{GIE}}$, and $\mathcal{R}_{\mathrm{nongrav}}$ from the same run record.
7. **Classify the run.** Use the same output record to evaluate the following nonexclusive flags:

| Status | Conditions | Interpretation |
| --- | --- | --- |
| weak-probe | $\mathcal{D}_{\mathrm{grav}}\le\varepsilon_{\mathrm{wp}}$ and no durable record forms | gravitational response is too weak to act as a which-path record |
| mediated-entangling | a positive calibrated entanglement detection, $C_{\mathrm{obs}}>\varepsilon_C$, $C_{\mathrm{GIE}}\ge C_{\mathrm{obs}}-\varepsilon_C$, agreement with the measured correlation data within uncertainty, $\mathcal{R}_{\mathrm{nongrav}}\le\varepsilon_{\mathrm{iso}}$, $\mathcal{D}_{\mathrm{grav}}\le\varepsilon_{\mathrm{wp}}$, and no durable which-path record forms | the branch phase is strong enough to account for the entanglement witness while the gravity-side readout remains below record threshold |
| record-forming | $\mathcal{D}_{\mathrm{grav}} > \varepsilon_{\mathrm{wp}}$, $\tau_{\text{meas}} < T_W$, and $\Delta_{\mathrm{rec}}$ stays below threshold through $T_{\text{rec}}$ | the apparatus/environment has formed an autonomous record |
| falsifying | $\mathcal{D}_{\mathrm{grav}}\gg1$ while visibility remains high, no record-autonomy criterion is met, and the independently calibrated information-to-visibility relation of [Measurement Ontology](../quantum/measurement-ontology.md#external-gravitational-which-path-benchmark) predicts visibility suppression at that $\mathcal{D}_{\mathrm{grav}}$ | the effective-metric response overproduces observable which-path information |

The weak-probe and mediated-entangling flags can both hold; no unique classification is implied. The four rows are not exhaustive. A run with $\mathcal{D}_{\mathrm{grav}}>\varepsilon_{\mathrm{wp}}$ that forms no durable record and does not meet the falsifying conditions is indeterminate: the quadratic diagnostic by itself proves neither record formation nor loss of interference, so such a run counts as evidence on neither side until the calibrated relation is supplied.

For a white-noise readout approximation, $N_{AB}(t_{\mathrm{eff}},t'_{\mathrm{eff}})=S_{AB}\delta(t_{\mathrm{eff}}-t'_{\mathrm{eff}})$, the distinguishability reduces to
$$
\mathcal{D}_{\mathrm{grav}}(T_W;\theta)
=
\int_0^{T_W}
\Delta h_A(t_{\mathrm{eff}})\,
S_{AB}^{-1}\,
\Delta h_B(t_{\mathrm{eff}})\,dt_{\mathrm{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-176db1732240ec6c)

This special case is the first numerical target because it turns the validation packet into a finite time-series calculation once $m$, $\sigma$, $d_{\mathrm{eff}}^i(t_{\mathrm{eff}})$, $G_A$, and $S_{AB}$ are supplied.

## Worked Acceleration Bound

A first sanity bound can use a single acceleration readout channel before introducing a full detector geometry. Suppose the branch displacement is bounded by $\|d_{\mathrm{eff}}^i(t_{\mathrm{eff}})\|\le d_0$, the detector is at effective-chart distance $R_{\mathrm{eff}}$ from the branch center with $d_0\ll R_{\mathrm{eff}}$, and the weak-field map satisfies $G_{\mathrm{eff}}(\theta)\to G$, Newton's gravitational constant, in the tested regime. Write $M$ for the branch mass, the $m$ of the response model. For this bound, the two branch distributions must be translations of the same nonnegative mass profile by at most $d_0$, with no changing multipoles or mass exchange. Let $R_{\min}>0$ be a lower bound on every detector-to-source distance along every straight displacement segment connecting corresponding mass elements over the run. A compact packet within radius $b$ of each symmetrically displaced center admits $R_{\min}=R_{\mathrm{eff}}-d_0/2-b>0$. An untruncated Gaussian has no such support bound; it needs a separately bounded tail contribution. In the static Newtonian comparison with spatially constant positive $G_{\mathrm{eff}}(\theta)$ and a unit-gain acceleration readout, the branch acceleration difference is bounded by
$$
|\Delta h(t_{\mathrm{eff}})|
\le
\frac{2G_{\mathrm{eff}}(\theta)M d_0}{R_{\min}^3}
$$

[View →](../../../../equation-mapping.html#corpus-equation-5f1d153305299ef6)

The spatial derivative of the Newtonian acceleration vector has radial eigenvalue magnitude $2G_{\mathrm{eff}}M/r^3$ and two transverse eigenvalue magnitudes $G_{\mathrm{eff}}M/r^3$, so its operator norm is $2G_{\mathrm{eff}}M/r^3$. Integrating that derivative along each displacement segment and then over the common nonnegative profile gives the bound with $R_{\min}$. Replacing $R_{\min}$ by the center distance $R_{\mathrm{eff}}$ is only the leading-order small-packet, small-displacement estimate. For a white acceleration readout covariance $N(t_{\mathrm{eff}},t'_{\mathrm{eff}})=S_a\delta(t_{\mathrm{eff}}-t'_{\mathrm{eff}})$, the distinguishability obeys
$$
\mathcal{D}_{\mathrm{grav}}(T_W;\theta)
\le
\frac{4G_{\mathrm{eff}}^2(\theta)M^2d_0^2T_W}{R_{\min}^6S_a}
$$

[View →](../../../../equation-mapping.html#corpus-equation-574ade487f4f363b)

With benchmark values
$$
M=10^{-14}\,\mathrm{kg},\qquad
d_0=10^{-6}\,\mathrm{m},\qquad
R_{\mathrm{eff}}=10^{-3}\,\mathrm{m},\qquad
T_W=1\,\mathrm{s}
$$

[View →](../../../../equation-mapping.html#corpus-equation-054b99eaa3208ed3)

and an aggressive acceleration-noise amplitude
$$
S_a^{1/2}=10^{-15}\,\mathrm{m\,s^{-2}}/\sqrt{\mathrm{Hz}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7830ae65acb464c1)

the leading-order estimate, evaluated with $G=6.674\times10^{-11}\,\mathrm{m^{3}\,kg^{-1}\,s^{-2}}$, is
$$
\mathcal{D}_{\mathrm{grav}}
\lesssim
1.8\times10^{-12}
\left(\frac{M}{10^{-14}\,\mathrm{kg}}\right)^2
\left(\frac{d_0}{10^{-6}\,\mathrm{m}}\right)^2
\left(\frac{10^{-3}\,\mathrm{m}}{R_{\mathrm{eff}}}\right)^6
\left(\frac{T_W}{1\,\mathrm{s}}\right)
\left(
\frac{10^{-15}\,\mathrm{m\,s^{-2}}/\sqrt{\mathrm{Hz}}}{S_a^{1/2}}
\right)^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-966cd853ccca3102)

For compact point-like packets the rigorous ceiling differs from this estimate by $(R_{\mathrm{eff}}/R_{\min})^6$; the stated radial point-packet geometry has $R_{\min}=R_{\mathrm{eff}}-d_0/2$ and a factor below $1.004$. Thus its ceiling remains far below an order-unity which-path threshold. Inverting that ceiling gives a necessary mass scale for threshold reachability, not a sufficient detection threshold: $M<M_{\mathrm{crit}}$ excludes reaching the threshold within this comparison, whereas $M\ge M_{\mathrm{crit}}$ does not guarantee it. The scale is
$$
M_{\mathrm{crit}}
=
\frac{R_{\min}^3}{2G_{\mathrm{eff}}(\theta)d_0}
\sqrt{\frac{\varepsilon_{\mathrm{wp}}S_a}{T_W}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-67400247e859d41c)

or, to leading order in the same compact benchmark geometry,
$$
M_{\mathrm{crit}}
\approx
7.5\times10^{-9}\,\mathrm{kg}\,
\varepsilon_{\mathrm{wp}}^{1/2}
\left(\frac{R_{\mathrm{eff}}}{10^{-3}\,\mathrm{m}}\right)^3
\left(\frac{10^{-6}\,\mathrm{m}}{d_0}\right)
\left(
\frac{S_a^{1/2}}{10^{-15}\,\mathrm{m\,s^{-2}}/\sqrt{\mathrm{Hz}}}
\right)
\left(\frac{1\,\mathrm{s}}{T_W}\right)^{1/2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-cba1f5370733d869)

This is not a new ontology or an experimental forecast. It is a scale check: for ordinary mesoscopic masses, gravity-side which-path leakage is negligible unless the branch mass, separation, proximity, coherence time, or readout sensitivity moves by many orders of magnitude. A full detector calculation should replace the scalar factor $2/R_{\mathrm{eff}}^3$ with the tensor response in the Minimal Response Model above.

## Acceptance Criteria

For an interference-preserving run whose independently calibrated information-to-visibility map on the same ensemble requires the weak-probe threshold, the metric or gravity-side readout must satisfy
$$
\mathcal{D}_{\mathrm{grav}}(T_W;\theta)
\le
\varepsilon_{\mathrm{wp}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-baf70e8bcbab6b6a)

For a mediated-entanglement run with a positive calibrated concurrence lower bound, the same record must also satisfy the necessary screen
$$
C_{\mathrm{GIE}}(T_W;\theta)
\ge
C_{\mathrm{obs}}-\varepsilon_C,
\qquad
\mathcal{R}_{\mathrm{nongrav}}
\le
\varepsilon_{\mathrm{iso}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f6c04406d9dbf53e)

This one-sided screen is supplemented by agreement with the measured correlation data and its uncertainty; a larger predicted concurrence alone does not establish that agreement. With the same-ensemble visibility calibration, the run tests whether the retained gravity-side constitutive record can generate the observed branch correlation while avoiding premature which-path record formation.

If a which-path record is claimed instead, the measurement chapter's record criteria must also hold:
$$
\tau_{\text{meas}} < T_W,
\qquad
\sup_{t_{\mathrm{eff}}\in[\tau_{\text{meas}},\,\tau_{\text{meas}}+T_{\text{rec}}]}
\Delta_{\mathrm{rec}}(t_{\mathrm{eff}};k)
\le
\varepsilon_{\mathrm{rec}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-bd4cb4ebf205ebde)

The failure condition is strict. If $\mathcal{D}_{\mathrm{grav}}\gg1$ while interference visibility remains high, no record-autonomy condition is satisfied, and the independently calibrated information-to-visibility relation of [Measurement Ontology](../quantum/measurement-ontology.md#external-gravitational-which-path-benchmark) predicts visibility suppression at that value, the effective-metric response has overproduced observable which-path information. Without that calibrated relation the diagnostic alone does not establish the failure.

The same $\theta$ must also remain compatible with the gravity-side ledger: redshift, Shapiro delay, lensing, PPN parameters, gravitational-wave speed, dispersion, detector-mode bounds, and compact-source ring/shadow extrapolations. A parameter set that fits the massive-superposition channel only by changing the weak-field metric record is not a valid closure.

## Simulation Target

The minimal simulation target is the map
$$
\mathcal{S}_{\mathrm{grav}}:
\left(
m,\sigma,d_{\mathrm{eff}}^i(t_{\mathrm{eff}}),T_W,G_A,N_{AB},R,\Sigma,\rho_A^a,\rho_B^b
\right)
\longmapsto
\left(
\mathcal{D}_{\mathrm{grav}},
\mathcal{V}(T_W),
\Delta\Phi_{\mathrm{ent}},
C_{\mathrm{GIE}},
\tau_{\text{meas}},
\Delta_{\mathrm{rec}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-3454fb0e13ca120b)

The inputs are the branch mass scale, packet width, separation history, coherence window, detector response kernel, covariance decomposition, record variable, separatrix, and two-probe branch histories when present. The outputs are the gravitational distinguishability, interference visibility, entangling phase, mediated-entanglement witness, finite measurement time, and record-autonomy residual.

The worked acceleration bound supplies the first analytic $\mathcal{D}_{\mathrm{grav}}$ estimate. The mediated-entanglement comparison supplies the first branch-phase target. Full packet closure still requires one numerical or analytic instance that computes the retained outputs from a shared constitutive record and reports its applicable weak-probe, mediated-entangling, record-forming or falsifying flags, or an indeterminate result.

## Sources

- J. Oppenheim, *A Postquantum Theory of Classical Gravity?*, Physical Review X 13, 041040 (2023), [arXiv:1811.03116](https://arxiv.org/abs/1811.03116), DOI: 10.1103/PhysRevX.13.041040. The classical-quantum gravity proposal named in Comparison Boundary; read as an external comparison at observer level, with its stochastic-metric ontology not imported.
- J. Oppenheim, C. Sparaciari, B. Šoda, and Z. Weller-Davies, *Gravitationally induced decoherence vs space-time diffusion: testing the quantum nature of gravity*, Nature Communications 14, 7910 (2023), [arXiv:2203.01982](https://arxiv.org/abs/2203.01982), DOI: 10.1038/s41467-023-43348-2. Source of the decoherence-versus-diffusion trade-off behind the retained pressure that a classical gravity readout must not reveal branch information while interference persists.
- S. Bose et al., *Spin Entanglement Witness for Quantum Gravity*, Physical Review Letters 119, 240401 (2017), [arXiv:1707.06050](https://arxiv.org/abs/1707.06050), DOI: 10.1103/PhysRevLett.119.240401; and C. Marletto and V. Vedral, *Gravitationally Induced Entanglement between Two Massive Particles is Sufficient Evidence of Quantum Effects in Gravity*, Physical Review Letters 119, 240402 (2017), DOI: 10.1103/PhysRevLett.119.240402. The two-probe gravitationally induced entanglement proposals behind Mediated Entanglement Comparison; the ideal-state witness $C_{\mathrm{GIE}}$ reproduces their branch-phase construction, while their inference that entanglement certifies a quantum mediator remains comparison pressure rather than a premise of this packet.
