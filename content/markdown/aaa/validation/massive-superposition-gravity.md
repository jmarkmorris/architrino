# Massive-Superposition Gravity Validation Packet

This packet turns the massive-superposition gravitational which-path benchmark into a concrete validation target. It belongs to the observable and inference layer: the task is to preserve the branch mass histories, coherence data, detector response, and record criteria without importing any external collapse ontology.

Related homes are [Measurement Ontology](../quantum/measurement-ontology.md#external-gravitational-which-path-benchmark), [Observer Framework](../spacetime/observer-framework.md#boundary-wake-covariance-scaffold), and [Constraint Ledger](constraint-ledger.md#massive-superposition-gravitational-distinguishability).

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

This packet is closed only when one numerical or analytic instance computes all four outputs from a shared constitutive record and reports whether the branch pair is weak-probe, record-forming, or falsifying.
