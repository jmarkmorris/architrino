# Spacetime Models and the Noether Sea

This bridge compares inherited models of spacetime with the Noether-Sea implementation layer in $\mathbb{A}\mathbb{A}\mathbb{A}$. It is not the canonical home of the spacetime mechanism. The mechanism remains in [Noether Sea](../spacetime/noether-sea.md), [Emergent Metric](../spacetime/emergent-metric.md), [Lorentz Kinematics](../spacetime/lorentz-kinematics.md), and [PPN Parameters](../spacetime/ppn-parameters.md).

The purpose is narrower: keep useful outside models available as disciplined comparisons without letting their vocabulary become native ontology. Terms such as vacuum, aether, elastic medium, analog metric, condensate, and superfluid can help locate a mathematical burden, but none of them replaces `Noether Sea`.

## Bridge Rule

Use inherited spacetime models as comparison projections, not as identity claims.

The native stack is:

| Level | Native term | Role |
| --- | --- | --- |
| fixed spatial container | Euclidean void | The 3D spatial arena does not curve or expand. |
| global temporal parameter | absolute time | The primitive ordering parameter for substrate dynamics. |
| formal background | absolute timespace | The product $\mathbb{R}\times\mathbb{R}^3$. |
| substrate contents | Noether Sea | The ambient population of coupled Noether cores. |
| bridge language | spacetime medium | Reader-facing translation toward effective spacetime language. |
| observer-level geometry | effective spacetime or effective metric | The metric reconstructed by Physical Observers from clocks, rulers, and signal behavior. |

Any outside model must therefore answer five questions before it can influence authored $\mathbb{A}\mathbb{A}\mathbb{A}$ prose:

1. Which observer-level successes does the model preserve?
2. Which part maps to Noether-Sea state rather than to the Euclidean void?
3. Which inference is forbidden because it would import the outside model's ontology?
4. Which equation, invariant, or constitutive law would have to be derived?
5. Which failure mode would falsify the comparison?

## Comparison Matrix

| Inherited model | What it preserves | $\mathbb{A}\mathbb{A}\mathbb{A}$ implementation layer | Forbidden inference | Closure target |
| --- | --- | --- | --- | --- |
| General-relativistic metric spacetime | Proper time, geodesic motion, redshift, Shapiro delay, lensing, frame dragging, gravitational waves, and PPN observables. | Effective metric $g^{\text{eff}}_{\mu\nu}$ reconstructed from Noether-Sea clock, ruler, signal, drift, and compliance channels. | The Euclidean void itself curves. | Derive one constitutive map from Noether-Sea state to ADM/Cartan fields that recovers GR in tested regimes. |
| Special-relativistic Minkowski spacetime | Lorentz kinematics, invariant signal speed, mass-shell bookkeeping, and relativity of simultaneity for Physical Observers. | Homogeneous weak-field limit of deformable assemblies, synchronized signal channels, and Noether-Sea-dressed clocks and rulers. | Lorentz symmetry is primitive substrate geometry. | Show that stable assembly closure drives the same $\gamma_{\text{eff}}$ factor in clock, ruler, signal, energy, and momentum channels while preferred-frame leakage remains below bounds. |
| Newtonian absolute space and time | A useful first approximation for absolute ordering, low-speed dynamics, and Euclidean spatial geometry. | Absolute time plus Euclidean void are retained, while forces arise from delayed causal wakes and Noether-Sea response rather than instantaneous action. | Newtonian instantaneous gravity is fundamental. | Recover the Newtonian potential as a weak-field, low-speed effective limit of the delayed wake and medium-response ledger. |
| Aether or preferred-frame theories | The idea that a medium or preferred frame may underlie observer-level relativity. | The Noether Sea occupies the Euclidean void, and absolute time orders substrate events. | The Noether Sea is the historical luminiferous aether or a mechanical fluid with free drift observables. | Derive Lorentz-like operational symmetry despite the preferred substrate frame, with bounded anisotropy diagnostics. |
| Elastic or continuum-medium spacetime | Stress, strain, compliance, wave propagation, and equation-of-state language. | Coarse Noether-Sea variables such as density, delay factor, stress, drift, alignment, and spatial compliance. | The medium is a featureless continuum with no assembly microstructure. | Derive continuum stress and compliance tensors from Noether-core population dynamics and identify their valid averaging scale. |
| Analog-gravity or acoustic-metric models | Effective metrics can emerge from signal propagation through a medium. | Signal cones and clock/ruler maps emerge from Noether-Sea delay and assembly response. | The analogy proves gravity or fixes the metric by signal speed alone. | Extend scalar speed maps to the full ADM/Cartan handoff $(N,u^i_{\text{sea}},e^a{}_i,\gamma_{ij})$. |
| Condensate or superfluid vacuum models | Coherence, order parameters, critical thresholds, quantized circulation, collective excitations, and low-dissipation transport can be mathematically sharp. | Possible comparison class for coherent Noether-Sea phases only when the local document supplies a defined order parameter, excitation spectrum, critical threshold, or circulation analogue. | The Noether Sea is superfluid merely because it is coherent or low-dissipation. | Derive a concrete constitutive model: order parameter, transport equation, critical-velocity criterion, two-fluid analogue, quantized-vorticity analogue, or explicit reason the analogy fails. |
| Sakharov or Jacobson-style emergent gravity | Metric dynamics may be thermodynamic or induced rather than fundamental. | Einstein-like behavior is an equation-of-state limit of Noether-Sea microstructure. | The thermodynamic analogy derives $\mathbb{A}\mathbb{A}\mathbb{A}$ by itself. | Show how Noether-Sea entropy, stress, and energy exchange recover the Einstein equation or its validated weak-field approximation. |
| Quantum-vacuum or QFT-field ontology | Vacuum polarization, zero-point behavior, field excitations, and Standard Model effective predictions. | Observer-level fields are effective summaries of assembly and wake behavior in the Noether Sea. | The QFT vacuum is the substrate ontology. | Recover validated QFT limits while assigning substrate-level causation to assemblies, wakes, and Noether-Sea response. |

## Mathematical Handoff

The common handoff is not a metaphor. It is a map from substrate and medium variables to the observer-level geometry:

$$
\mathcal{X}_{\text{sea}}
=
\left(
h_{ij},
\rho_{\text{core}},
n,
\chi_{\text{sea}},
\sigma^{ab}_{\text{sea}},
u^i_{\text{sea}},
e^a{}_i,
\mathcal{M}_{\text{sea}}^{ab}
\right),
$$

followed by the ADM/Cartan reconstruction target

$$
\mathcal{X}_{\text{sea}}
\longrightarrow
\left(N,u^i_{\text{sea}},e^a{}_i,\gamma_{ij}\right)
\longrightarrow
g^{\text{eff}}_{\mu\nu}.
$$

The resulting observer-level line element has the shared target form

$$
ds_{\rm eff}^2
=
-N^2c_0^2dt^2
+
\gamma_{ij}
\left(dx^i-u^i_{\text{sea}}dt\right)
\left(dx^j-u^j_{\text{sea}}dt\right).
$$

This equation is the filter for comparison language. A spacetime model is useful only insofar as it clarifies one of the channels in $\mathcal{X}_{\text{sea}}$, sharpens the map to $(N,u^i_{\text{sea}},e^a{}_i,\gamma_{ij})$, or names an observational recovery target for $g^{\text{eff}}_{\mu\nu}$.

## Analogy Discipline

The bridge also fixes a prose rule for active theory chapters:

| If the prose wants to say... | Use this instead unless the model is derived |
| --- | --- |
| "The Noether Sea is a superfluid." | "The Noether Sea has a low-dissipation or coherent-response comparison target." |
| "Spacetime is an elastic medium." | "Effective spacetime behavior is reconstructed from Noether-Sea stress and compliance." |
| "The metric is the medium." | "The metric is the observer-level summary of clock, ruler, and signal behavior in the medium." |
| "Transport through the Sea explains the effect." | Name the actual variable: delay factor, response tensor, drift field, compliance metric, residual, or event ledger. |
| "Vacuum energy causes the behavior." | State the Noether-Sea inventory, excitation, or reaction channel that carries the energy. |

This discipline keeps strong comparisons available without promoting them prematurely. In a bridge document, analogy can be explicit. In canonical mechanism chapters, analogy should give way to the native object and the relevant closure target.

## Closure Tests

A spacetime comparison becomes more than a guide only when it passes the following tests:

1. **Variable test:** it identifies which Noether-Sea variables enter the calculation.
2. **Map test:** it contributes to the same ADM/Cartan handoff used by [Emergent Metric](../spacetime/emergent-metric.md).
3. **Recovery test:** it recovers the relevant observer-level limits: Lorentz kinematics, weak-field GR, PPN bounds, photon propagation, clock redshift, lensing, or thermodynamic consistency.
4. **No-import test:** it does not import the outside model's ontology as a substitute for Noether-Sea ontology.
5. **Failure test:** it states what result would demote the comparison to a failed analogy.

The most important failure mode is hidden synonym drift. If a comparison term starts replacing `Noether Sea`, `effective metric`, `medium response`, `causal wake`, or `closure target`, the bridge has stopped clarifying and has started importing ontology.

## Summary Commitment

The Noether Sea is not renamed by its comparisons. General relativity, aether theory, elastic media, analog gravity, condensate models, superfluid models, and quantum-vacuum language each preserve useful mathematics or intuition. Their role in $\mathbb{A}\mathbb{A}\mathbb{A}$ is to expose closure burdens for the native substrate stack:

$$
\text{absolute time}
+
\text{Euclidean void}
+
\text{Noether Sea}
\longrightarrow
\text{effective spacetime}.
$$

That is why analogy belongs here. Mechanism chapters should inherit the disciplined result: use the native Noether-Sea variables first, and use outside spacetime models only when they name a concrete equation, test, or failure mode.
