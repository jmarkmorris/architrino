# General Relativity

General relativity (GR) describes gravity through a spacetime metric: a rule relating clock intervals, ruler distances, signal paths, and freely falling motion. This chapter collects the observer-level measurements that the Architrino Assembly Architecture, $\mathbb{A}\mathbb{A}\mathbb{A}$, must recover from its assembly and medium dynamics. A constitutive map is the response law connecting those dynamics to the measured quantities.

The [Emergent Metric](emergent-metric.md) and [PPN Parameters](ppn-parameters.md) chapters develop that map. The parameterized post-Newtonian (PPN) framework compares weak-gravity corrections to Newtonian motion through dimensionless coefficients. The formulas below are effective comparison targets; none is an added premise of the architrino acceleration law.

The open recovery question is whether one constitutive law can reproduce the network of tested GR observables. Redshift compares clock or received signal frequencies; Shapiro delay measures excess signal travel time; lensing measures path deflection; orbital precession measures the turning of an orbit; equivalence-principle tests compare gravitational responses; and gravitational-wave tests measure propagating gravitational disturbances. These observations must be consistent with the same law and its declared domain.

## Purpose

This chapter specifies recovery conditions, not a completed recovery. A standard comparison identity can be derived within GR while its realization by architrino dynamics remains open. The quantum-gravity effective-field-theory comparison and strong-field alignment hypothesis below have separate conditional scopes; they are not established observations merely because they appear beside tested classical effects.

## Core Interpretation

The underlying route begins with [architrinos](../foundations/architrino.md), point transceivers carrying polarity and persistent path history. Their emitted causal wakes are expanding records of earlier positions. A receiver is accelerated when a wake reaches its current event: the [Master Equation](../dynamics/master-equation.md#the-master-equation-canonical-form) sums the admitted delayed contributions, including positive-delay self-hits when present. On a simple-root chart its acceleration weight is $W^{\mathrm{acc}}=c_f/|D_t|$, where $D_t$ is the transmitter-side derivative of the causal-root condition. Root completeness, nonzero separation, transversality, and a declared continuation at singular events are prerequisites for using that route.

The layer assignments are:

- the [Euclidean void](../foundations/euclidean-void.md) is the fixed spatial container with metric $h_{ij}$,
- [absolute time](../foundations/absolute-time.md) $T$ orders the constituent histories,
- and the [Noether sea](noether-sea.md) is the assembly-level medium of coupled neutral braids occupying that container.

At the observer level, the same Noether sea must generate the effective metric behavior usually attributed to curved spacetime. Therefore the phenomenology requirement is:

$$
\text{medium response}
\;\Longrightarrow\;
\text{effective metric observables}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f070483765b65d62)

The closure demand is not merely qualitative resemblance. The same constitutive map must jointly recover redshift, Shapiro delay, light bending, perihelion precession, and gravitational-wave propagation in the regimes where GR is already tested.

For one experiment, its clock, ruler, signal, source, and boundary channels must be projections of one compatible record. Different experiments can have different source and medium states, all evolved under the same constitutive law; the common-law requirement does not make their histories identical. Write $\theta$ for that law's coefficients together with the declared records and calibrations for the comparison family.

The observer chart $(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$ is reconstructed from those records; it is not a relabeling of $(T,\mathbf X)$. A physical observer is an assembly whose clocks and rulers supply that reconstruction, and $\tau$ denotes its derived clock readout. An effective metric encodes those responses. Its connection compares directions at neighboring events and its curvature describes their variation; neither is curvature of the void. Recovering selected observables does not derive Einstein's field equations, which relate effective curvature to effective stress and energy. That stronger recovery still requires the common constitutive dynamics and their conservation and domain assumptions.

> Claim grade: guessed for the proposed Noether-sea realization of GR; the formulas below specify its recovery targets. Falsifier: independently evolved admissible histories whose observer records miss an applicable measured bound, or require incompatible constitutive laws for the same calibrated channels, reject the candidate in that domain. An absent derivation leaves recovery unresolved rather than demonstrating a failed prediction.

Notation convention: $G_N$ denotes the standard Newtonian and low-energy GR comparison constant in the observable benchmark formulas below. $G_{\mathrm{eff}}(\theta)$ denotes the recovered constitutive coefficient of a candidate Noether sea record, and a validated weak-field branch must make $G_{\mathrm{eff}}(\theta)\to G_N$ in the same record that recovers the clock, lensing, PPN, and gravitational-wave channels. Nearby standard-comparison formulas may retain $G$ as ordinary GR shorthand; this chapter writes $G_N$ when the constant belongs to the benchmark rather than to the constitutive map.

### Network evidence and nuisance separation

One precise test is insufficient to establish an effective metric branch: agreement can share calibration or source-model errors with the prediction. A joint comparison therefore retains nuisance parameters, quantities such as calibration offsets that affect the measurement without being the gravitational effect under test. One possible network statistic is
$$
\mathcal{E}_{\mathrm{GR}}(\theta)
=
\mathbf{r}_{\mathrm{net}}(\theta)^{\mathsf T}
C_{\mathrm{net}}^{-1}
\mathbf{r}_{\mathrm{net}}(\theta)
$$

[View →](../../../../equation-mapping.html#corpus-equation-9aea7b28c80cb8ea)

where $\mathbf{r}_{\mathrm{net}}$ contains prediction-minus-observation residuals for the claimed channels, including cosmic microwave background (CMB) inferences only when their cosmological and foreground assumptions are declared. The covariance $C_{\mathrm{net}}$ records their uncertainties and correlations, including calibration and source-model uncertainty. It must be invertible on the retained residual space; redundant components require restriction to an independent subspace. This quadratic statistic is dimensionless when residuals and covariance use consistent units. An acceptance claim additionally needs a specified likelihood or sampling distribution, uncertainty treatment, and threshold. Naming the statistic supplies none of them.

### Causal-order and scale recovery

Before the individual observables are checked, the effective metric map has to pass a structural check: Physical Observers must infer the same causal ordering, local clock scale, and negligible preferred-frame leakage that the GR comparison metric would provide in the validated regime. The following diagnostic is imported unchanged from [observer-framework.md](./observer-framework.md#effective-causal-order-recovery):
$$
\mathcal{R}_{\mathrm{causal}}(\theta)
=
d_{\mathrm{ord}}\!\left(\prec_{\mathrm{eff}}(\theta),\prec_{\mathrm{GR}}\right)
+
\lambda_{\tau}
\left\|
\frac{d\tau_{\mathrm{eff}}}{dt_{\mathrm{eff}}}(\theta)
-
\frac{d\tau_{\mathrm{GR}}}{dt_{\mathrm{eff}}}
\right\|_{W}
+
\lambda_{\mathrm{PF}}
\sum_{i=1}^{3}\alpha_i(\theta)^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-af59c20f2dc02694)

Here $\prec_{\mathrm{eff}}$ and $\prec_{\mathrm{GR}}$ are the inferred and comparison causal orders on the same sampled events; $d_{\mathrm{ord}}$ is a declared dimensionless mismatch of those orders. The norm $\|\cdot\|_W$ measures clock-rate mismatch over the declared observation window, and $\lambda_\tau,\lambda_{\mathrm{PF}}>0$ are fixed dimensionless diagnostic weights. These choices and the event sample must be specified before evaluation. The clock term tests local scale only on that sample. A small weighted sum does not replace individual preferred-frame bounds, since a small weight can conceal an excessive coefficient. This structural diagnostic supplements the separate observable tests below.

The labels $\tau_{\mathrm{eff}}$ and $\tau_{\mathrm{GR}}$ mark the candidate observer-record clock readout and the GR comparison clock readout. They are scale readouts in the effective observer layer, not additional substrate time variables. The observer cannot be allowed to recover one causal story from photons, a different clock story from matter, and a third timing story from gravitational waves. The tested regime must look like one effective spacetime to the Physical Observer.

### Global continuation and cosmic-censorship comparison

Global hyperbolicity supplies a GR setting with Cauchy surfaces, each intersecting every inextendible causal curve once, on which initial data can determine a development under the field equations. A Cauchy horizon bounds the region determined by such data. Cosmic censorship comprises conjectures about the visibility or extendibility of singular behavior, not a general proved continuation rule. These are observer-level comparison tools, not substrate assumptions in $\mathbb{A}\mathbb{A}\mathbb{A}$, whose dynamics use absolute timespace and path history. Where a metric comparison loses unique continuation, the native account must identify the histories and boundary data on which its continuation claim depends.

The [Master Equation's finite-continuation criterion](../dynamics/master-equation.md#finite-continuation-criterion-for-global-comparisons) supplies a conditional comparison target. For a compact region $\Omega$ and absolute-time window $W=[T_i,T_f]$, specify a continuation map from compatible initial history and boundary data,
$$
\mathcal{T}_{\Omega,W}^{\theta}:
\left(
X_\Omega(T_i),
\mathcal{H}_{\Omega}^{<T_i},
\mathcal{B}_{\partial\Omega}|_{W},
N_{\text{sea}}|_{\Omega\times W}
\right)
\longrightarrow
\mathcal{S}_{\Omega}(T_f)
$$

[View →](../../../../equation-mapping.html#corpus-equation-cf60cb273ecd8b69)

where $X_\Omega(T_i)$ denotes the subsystem's instantaneous state, $\mathcal H_\Omega^{<T_i}$ its required retained history, $\mathcal B_{\partial\Omega}|_W$ the incoming boundary wake record, and $N_{\text{sea}}|_{\Omega\times W}$ the compatible medium history. This last symbol is a sea-state record, not the metric lapse $N$. It must be evolved consistently or declared as prescribed environmental data; supplying the desired future sea history is not a prediction of it. The set $\mathcal S_\Omega(T_f)$ contains endpoint states or explicitly resolved branch labels.

The finite-family criterion inherits the dynamics owner's regularization, compatible-history, distance, transversality, and bounded-branch assumptions. It is a conditional target, not a theorem that finite observer data determine a unique future or that every sharp-root singularity has a continuation. An empty, nonfinite, or unaccountably selected family fails that specified criterion. GR global-extension tools remain available for comparison before recovery; claiming that their conclusions describe the same physical records additionally requires the clock, causal-order, motion, and signal comparisons to pass. Finite continuation alone proves neither global hyperbolicity nor cosmic censorship.

## Weak-Field Observables That Must Match GR

### Gravitational redshift and clock rates

The clock channel must reproduce
$$
\frac{d\tau}{dt_{\mathrm{eff}}}
\approx
\sqrt{1+\frac{2\Phi_N}{c_0^2}-\frac{\|\mathbf w_{\mathrm{eff}}\|_h^2}{c_0^2}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-a10eac89a256ff66)

in a stationary weak-field zero-shift comparison chart, where $\mathbf w_{\mathrm{eff}}=d\mathbf x_{\mathrm{eff}}/dt_{\mathrm{eff}}-\mathbf u_{\mathrm{sea,eff}}$ is the clock velocity relative to projected sea flow and the norm uses the Euclidean reference metric $h$. The Newtonian comparison potential is $\Phi_N=-G_NM/r$ for an isolated spherical source, with zero at infinity; $M$ and $r$ are observer-level source mass and radial coordinate. Both $|\Phi_N|/c_0^2$ and $\|\mathbf w_{\mathrm{eff}}\|_h^2/c_0^2$ are small. The square root fixes leading terms only, not second-order PPN coefficients. The speed $c_0\equiv c_{\text{eff}}(\infty)>0$ is calibrated in the homogeneous reference region. Primitive wake speed $c_f$ remains distinct until a clock, ruler, and signal derivation relates them. For two identically calibrated static clocks this gives the rate comparison
$$
\frac{\Delta \nu}{\nu}
\approx
\frac{\Delta \Phi_N}{c_0^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-ec3c33cf92fa48dd)

Here $\Delta\Phi_N=\Phi_N(B)-\Phi_N(A)$ and $\Delta\nu/\nu=[\nu_B-\nu_A]/\nu_A$, with both clock rates referred to the same coordinate time. A higher clock has a positive rate shift. For a photon sent from $A$ to $B$, the received-to-emitted local frequency ratio instead obeys $\nu_{B\leftarrow A}/\nu_A^{\mathrm{emit}}\approx1-[\Phi_N(B)-\Phi_N(A)]/c_0^2$ in this stationary comparison: upward propagation is redshifted. The endpoint clock factors explain the opposite signs; the photon and clock-rate comparisons must not be interchanged.

Clock-comparison experiments provide observer-level constraints. Near Earth's surface the leading rate shift is $gL/c_0^2$, with local gravitational acceleration $g$ and upward height difference $L$. Bothwell and collaborators measured a frequency gradient consistent with this relation across a millimetre-scale strontium sample, using spatially resolved optical-clock spectroscopy; see the source note below. This measurement tests the clock comparison, not the proposed Noether-sea mechanism. The same constitutive law must describe separated clocks and extended samples while retaining the signal and ruler calibration used for delay and lensing.

### Shapiro delay

For a stationary, isotropic, zero-shift comparison chart, define Euclidean reference path length by $d\ell_h^2=h_{ij}dx_{\mathrm{eff}}^idx_{\mathrm{eff}}^j$. Conditional on the dressed signal sharing the effective metric's null paths, its coordinate speed is $c_{\text{eff}}=d\ell_h/dt_{\mathrm{eff}}$, and one-way path time is
$$
t_{\mathrm{eff}}[\Gamma]=\frac{1}{c_0}\int_\Gamma \bar{\chi}_{\text{sea}}(x_{\mathrm{eff}}^i)\,d\ell_h
$$

[View →](../../../../equation-mapping.html#corpus-equation-a8e4c7a114562af9)

with
$$
\bar{\chi}_{\text{sea}}(x_{\mathrm{eff}}^i)
\equiv
\frac{c_0}{c_{\text{eff}}(x_{\mathrm{eff}}^i)}
=
\frac{c_0}{c_f}\chi_{\text{sea}}(x_{\mathrm{eff}}^i)
=
1-(1+\gamma_{\mathrm{PPN}})\frac{\Phi_N(x_{\mathrm{eff}}^i)}{c_0^2}
+O(c_0^{-4})
$$

[View →](../../../../equation-mapping.html#corpus-equation-3d4b17ebd2600bbe)

Here $\bar\chi_{\text{sea}}$ is the reference-normalized delay factor and $\chi_{\text{sea}}=c_f/c_{\text{eff}}$ uses common speed units. The integration measure is not the null spacetime interval, which vanishes on a light ray, or the local ruler length, which would count spatial compliance twice. The [metric derivation](emergent-metric.md#minimal-weak-field-constitutive-map-for-ppn-matching) supplies this distinction. The displayed expansion is a PPN matching condition, not a derived sea response.

For a spherical static source, let $r_1,r_2$ be the endpoint distances from its center and $R$ their separation in the same reference chart. Integrating the first-order perturbation along the unperturbed path gives the excess over $R/c_0$,
$$
\Delta t_{\mathrm{eff}}
=
\frac{(1+\gamma_{\mathrm{PPN}})G_N M}{c_0^3}
\ln\!\left(\frac{r_1+r_2+R}{r_1+r_2-R}\right)
+O(c_0^{-5})
$$

[View →](../../../../equation-mapping.html#corpus-equation-427734dc658fe45c)

where the ray stays outside the source and $G_NM/(b c_0^2)\ll1$ at closest approach $b>0$. The logarithm requires $r_1+r_2>R$. The GR coefficient is the target at the precision and nuisance assumptions of the selected solar-system dataset; a ray through the point-source singularity is outside this approximation.

### Light bending

The same refractive map must recover the 1PN deflection law
$$
\Delta\theta
\approx
2(1+\gamma_{\mathrm{PPN}})
\frac{G_N M}{b\,c_0^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-9ce389605d4f4747)

for the asymptotic deflection of a ray with impact parameter $b$ around the same isolated source. Finite-distance endpoints, source multipoles, motion, and higher-order corrections require their corresponding terms. In the GR-matching limit $\gamma_{\mathrm{PPN}}=1$, this reduces to the standard
$$
\Delta\theta \approx \frac{4G_N M}{b\,c_0^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-987d3bf3dcb7335a)

So Shapiro delay and lensing are not separate fit channels. They are two readouts of the same constitutive coefficient.

### Perihelion and 1PN orbital structure

The effective metric subclass must also reproduce the standard 1PN orbital correction structure, summarized through the PPN parameters $\gamma_{\mathrm{PPN}}$ and $\beta_{\mathrm{PPN}}$. At the phenomenology level the requirement is simple:

- Mercury-type precession,
- geodetic precession,
- and other weak-field orbital tests

must all be reproduced by the same constitutive law already used for light and clock observables. Here $\gamma_{\mathrm{PPN}}$ measures the spatial-distance response per unit potential and $\beta_{\mathrm{PPN}}$ the nonlinear clock-metric response. This reduced set does not exhaust PPN: preferred-location and momentum-conservation coefficients also require the tests described in [Remaining PPN Parameters](ppn-parameters.md#remaining-ppn-parameters).

For the classical weak-field suite, the comparison record can be made explicit. On an observation window $W$, let $\theta_W$ denote the retained Noether sea state, source assembly record, observer clock/ruler state, signal-channel data, boundary wake data, and the ADM/Cartan projection
$$
\theta_W
\longmapsto
\left(
N,u^i_{\mathrm{sea,eff}},e^a{}_i,\gamma_{ij}^{\mathrm{eff}},
\Phi_{\text{eff}},
\chi_{\text{sea}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-b0e43cf5e15c9c7c)

In this projection, $N$ is the clock-rate lapse, $u^i_{\mathrm{sea,eff}}$ is the projected drift, $e^a{}_i$ maps coordinate increments to local ruler components, and $\gamma_{ij}^{\mathrm{eff}}=\delta_{ab}e^a{}_ie^b{}_j$ is the spatial compliance metric. The potential $\Phi_{\text{eff}}$ is extracted from the clock response; $\chi_{\text{sea}}$ comes from the same calibrated signal channel. These are outputs to derive, not independent fit inputs.

A reduced observable residual bundle is
$$
\mathbf{r}_{\mathrm{GR}}(\theta_W)
=
\begin{pmatrix}
R_{\mathrm{red}}\\
R_{\mathrm{Shap}}\\
R_{\mathrm{lens}}\\
R_{\mathrm{acc}}\\
R_{\mathrm{1PN}}\\
\alpha_1\\
\alpha_2\\
\alpha_3
\end{pmatrix},
\qquad
R_{\mathrm{acc}}
=
\frac{\left\|\frac{d^2x_{\mathrm{eff}}^i}{dt_{\mathrm{eff}}^2}+(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}\right\|_W}
{\left\|(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}\right\|_W+\varepsilon_{\mathrm{acc}}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-99b0736a014e40c6)

The symbols $R_{\mathrm{red}},R_{\mathrm{Shap}},R_{\mathrm{lens}},R_{\mathrm{1PN}}$ denote dimensionless prediction-minus-comparison residuals, each divided by a declared positive uncertainty scale. For the displayed acceleration diagnostic, $\|\cdot\|_W$ is the supremum of the Euclidean-reference vector norm along the selected observer trajectory over its mapped window, and $\varepsilon_{\mathrm{acc}}>0$ is an acceleration-valued floor fixed before comparison. Near zero comparison acceleration an absolute error bound must accompany this ratio; increasing the floor cannot count as improved agreement.

The acceleration formula tests only the leading Newtonian limit in a stationary zero-shift Cartesian reference chart, with slow test motion and $\Phi_{\mathrm{eff}}\to\Phi_N$. For $\Phi_{\mathrm{eff}}=c_0^2\ln N$, the exact zero-velocity metric term is $-N^2(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_j\Phi_{\mathrm{eff}}$; finite velocity also introduces connection terms. The omitted terms must lie below the comparison tolerance, as detailed in the [weak-field geodesic handoff](emergent-metric.md#weak-field-geodesic-handoff-adm-constitutive-subclass). A passing $R_{\mathrm{acc}}$ therefore does not establish 1PN motion. The trajectory must be independently projected from constituent dynamics; generating it with the comparison acceleration would test only that imposed model.

All channels must use the compatible outputs of the same $\theta_W$. Replacing a clock, drift, ruler, potential, delay, or boundary record independently to improve one channel produces separate fits. This reduced vector supplements, and does not replace, equivalence-principle and remaining PPN constraints.

Solar oblateness supplies the nuisance-control version of the same rule. Mercury-type precession may be written as
$$
\Delta\varpi_{\mathrm{obs}}
=
\Delta\varpi_{\mathrm{PPN}}(\theta_W)
+\Delta\varpi_{J_{2,\odot}}
+\Delta\varpi_{\mathrm{asteroid}}
+\Delta\varpi_{\mathrm{noise}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-5faf9cf10e07397c)

where $\Delta\varpi_{J_{2,\odot}}$ is the contribution from the Sun's quadrupole moment and the remaining terms collect other modeled ephemeris corrections. A constitutive map cannot improve its PPN fit by silently moving a mismatch into $\Delta\varpi_{J_{2,\odot}}$ or by using a solar-interior assumption inconsistent with helioseismology and light-deflection records. The precession test closes only after the nuisance record is fixed independently enough that $\Delta\varpi_{\mathrm{PPN}}$ is the recovered effect rather than a residual after subtraction.

For a weak-field test-body orbit about a spherical nonrotating source, with semi-major axis $a>0$ and eccentricity $0<e<1$, the GR perihelion advance is
$$
\Delta\varpi_{\mathrm{GR}}
=
\frac{6\pi G_N M}{a(1-e^2)c_0^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-96ce30e1a9d51242)

per orbit, with $G_NM/[a(1-e^2)c_0^2]\ll1$. In the conservative PPN comparison with other parameters at their GR values and source multipoles treated separately, this is the special case of
$$
\Delta\varpi_{\mathrm{PPN}}
=
\frac{2\pi G_N M}{a(1-e^2)c_0^2}
\left(2+2\gamma_{\text{PPN}}-\beta_{\text{PPN}}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-46317199ba600344)

so Mercury-type precession is a joint test of the same spatial-compliance coefficient that controls lensing and the same nonlinear clock coefficient that controls $\beta_{\text{PPN}}$.

### Low-Energy Quantum-Gravity EFT Benchmark

A low-energy effective field theory (EFT) separates long-distance predictions from unresolved short-distance physics. Quantum GR supplies a useful conditional comparison of this kind. Its quantum correction below is a theoretical prediction, not an established measurement or an additional substrate premise. Agreement is required when claiming recovery of that specified EFT limit; it is not an unconditional acceptance condition for the tested classical GR effects.

For two slowly moving effective masses $m_1,m_2>0$ at observer-coordinate separation $r>0$, retain the schematic potential comparison

$$
V_{\mathrm{GR\text{-}EFT}}(r)
=
-\frac{G_N m_1 m_2}{r}
\left[
1
+\alpha_{\mathrm{1PN}}\frac{G_N(m_1+m_2)}{c_0^2 r}
+\alpha_{\hbar}\frac{G_N\hbar}{c_0^3 r^2}
+\cdots
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-7ff05941ab8aef49)

where $\hbar$ is the observer-level reduced Planck constant. The coefficients $\alpha_{\mathrm{1PN}}$ and $\alpha_\hbar$ are fixed only after specifying the effective particle content, coordinate and momentum conventions, and potential prescription, including whether lower-order iterations have been subtracted. Both $G_N(m_1+m_2)/(c_0^2r)$ and $G_N\hbar/(c_0^3r^2)$ must be small. The potential is not itself an invariant observable. Bjerrum-Bohr, Donoghue, and Holstein derive the correction and discuss these prescriptions in the source below. With identical prescriptions on both sides, a dimensionless diagnostic is

$$
\mathcal{R}_{\mathrm{qG}}(r;\theta)
=
\left|
\frac{
V_{\mathbb{A}\mathbb{A}\mathbb{A}}(r;\theta)
-V_{\mathrm{GR\text{-}EFT}}(r)
}{
G_N m_1 m_2/r
}
\right|
$$

[View →](../../../../equation-mapping.html#corpus-equation-221850cce9a25c2d)

This is a conditional matched-convention diagnostic. A physical recovery test compares the resulting scattering or interference observable, including the kinetic and iteration terms needed in that convention. A coordinate change can alter a displayed potential coefficient without changing that observable. The candidate $V_{\mathbb{A}\mathbb{A}\mathbb{A}}$ must be derived from the same admitted assembly and medium law as the classical tests; it cannot be filled in by copying the benchmark. No such quantum derivation is supplied here. Its falsifier would be a nonzero observable mismatch beyond controlled truncation and extraction errors in the specified EFT domain, not a raw potential mismatch between different conventions.

Massive-superposition entanglement experiments add a second low-energy quantum-gravity benchmark. If two isolated massive probes acquire an entanglement witness through gravity alone, the retained data product is the branch-dependent interaction phase, not a decision between graviton-field ontology and quantized-geometry ontology. The corresponding validation packet in [Massive-Superposition Gravity Validation Packet](../validation/massive-superposition-gravity.md) requires the same effective-metric record $\theta$ to generate the mediated-entanglement phase while keeping non-gravitational coupling residuals bounded and preventing the gravity-side response from becoming an unmodeled which-path record.

## Equivalence-Principle Channels

The weak equivalence principle requires test bodies of different composition to share the same gravitational acceleration under matched conditions. The strong principle additionally tests the influence of gravitational binding energy and other self-gravity effects. For compact test assemblies $A$ and $B$ falling toward an external source $S$, let $a_A^S,a_B^S$ be positive accelerations projected along the same source-directed measurement axis, with nonzero sum. Define the composition residual
$$
\eta_{AB}^{S}
=
\frac{2(a_A^S-a_B^S)}{a_A^S+a_B^S}
$$

[View →](../../../../equation-mapping.html#corpus-equation-de660d9fa2c2b12b)

The weak equivalence test requires $\eta_{AB}^{S}$ to vanish within the material-composition bounds while the same clock, signal, and PPN record is held fixed. The point is not to assume equivalence as a substrate axiom, but to recover it as an observer-level constraint on the same record $\theta_W$. If local clock/ruler states for different apparatuses are allowed to absorb the gravitational response through material-dependent scale factors $\lambda_A(x_{\mathrm{eff}}^i;\theta_W)$, the residual must also satisfy
$$
\mathcal{R}_{\mathrm{scale\text{-}EP}}^{S}(\theta_W)
=
\max_{A,B}
\frac{
\left\|
\nabla\ln\!\left(\lambda_A/\lambda_B\right)
\right\|_W
}{
\left\|\nabla\Phi_{\text{eff}}\right\|_W/c_0^2+\varepsilon_{\mathrm{scale}}
}
\ll 1
$$

[View →](../../../../equation-mapping.html#corpus-equation-54307dedc8cf70bd)

with the source assembly, boundary wake data, cosmological record, and PPN coefficients held fixed. Here $\lambda_A,\lambda_B>0$ are dimensionless material calibration factors, the gradient has components $(\nabla f)^i=h^{ij}\partial_{x_{\mathrm{eff}}^j}f$ in the declared effective reference chart, and $\varepsilon_{\mathrm{scale}}>0$ has inverse-length units, unlike $\varepsilon_{\mathrm{acc}}$. The norm is taken over the same sampled domain. The symbol $\ll1$ states a diagnostic target; an experiment needs an explicit tolerance and an apparatus-response derivation relating scale gradients to measured differential acceleration. A constant calibration ratio is invisible to this gradient diagnostic, so it does not replace $\eta_{AB}^S$ or clock-universality tests.

One candidate mechanism assigns imposed assembly acceleration and a Noether sea gradient a common internal response. This is a hypothesis to derive, not a necessary microscopic mechanism established by the equivalence principle. The tested requirement is universal observer-level response within measured bounds. Any proposed dependence of inertia on the surrounding matter distribution must use the same environmental record and predict its composition residual rather than remove that residual by an apparatus-specific adjustment.

Equivalence recovery therefore couples the torsion-balance test, clock-comparison test, and cosmological/boundary record: a Mach-like dependence of inertial standards on the surrounding matter distribution is admissible only if it is common to the accepted observer record and leaves no composition-dependent acceleration residue.

A separate strong-equivalence diagnostic tests whether gravitational self-energy or medium binding changes the acceleration of extended bodies:

$$
\eta_{\mathrm{SEP}}
=
\frac{\Delta a_{\mathrm{self}}}{a}
\bigg/
\left(
\frac{E_{\mathrm{grav},1}}{m_1c_0^2}
-
\frac{E_{\mathrm{grav},2}}{m_2c_0^2}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-2f24cc6685527a81)

where $\Delta a_{\mathrm{self}}$ is the differential acceleration attributed to self-gravity after other effects are controlled, $a>0$ is the common external acceleration scale, and $E_{\mathrm{grav},K}<0$ is the signed gravitational binding energy of body $K$. The denominator must be nonzero and uses effective inertial masses $m_K$. This weak-self-gravity sensitivity is a lunar-ranging comparison target; exporting it to compact bodies requires a body-dependent strong-field response calculation. It does not exhaust the strong equivalence principle. Active source mass, passive gravitational response, inertial response, and energy-defined mass must share a consistent calibration in the nonrelativistic limit. A material-composition or self-gravity residual above its applicable bound falsifies that recovery claim even if the light and clock tests pass.

## Preferred-Frame Leakage

Because the ontology contains an absolute frame, the observer-level phenomenology must still suppress preferred-frame signatures.

That means the preferred-frame PPN coefficients
$$
\alpha_1,\alpha_2,\alpha_3
$$

[View →](../../../../equation-mapping.html#corpus-equation-46405bc13afbbc08)

must satisfy their applicable observational bounds; $\alpha_3$ also tests effective momentum nonconservation. They are dimensionless response coefficients, not group speeds. A predicted residue exceeding a bound rejects the candidate in the tested regime. Pulsar constraints require the declared extension from weak-field PPN coefficients to self-gravitating bodies; an arbitrary strong-field coefficient cannot be substituted for its weak-field counterpart.

## Gravitational-Wave Channel

The Noether sea picture must recover the observed near-luminal propagation of gravitational disturbances:
$$
\left|\frac{v_{\mathrm{GW}}-c_0}{c_0}\right|
\le
\varepsilon_{\mathrm{GW}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-be17db24e72ca918)

Here $v_{\mathrm{GW}}$ is the gravitational signal's group speed in the same calibration as $c_0$, and $\varepsilon_{\mathrm{GW}}$ represents the declared tolerance of the [GW Speed](../validation/constraint-ledger.md#gw-speed) comparison. Actual timing bounds can be asymmetric and depend on source emission delays and propagation history; this symmetric summary does not replace them. The Noether-sea interpretation assigns gravitational waves to collective disturbances of the medium, a constitutive hypothesis whose propagation and detector response remain to be derived.

The falsifier is a predicted timing, dispersion, or polarization residual outside the applicable measurement's uncertainty model and frequency range. Polarizations describe independent patterns of detector deformation. GR predicts two tensor patterns; a test favoring pure tensor signals over pure scalar or vector alternatives does not by itself exclude every mixed signal. The source note identifies this limitation in the GW170817 analysis. A proposed large-distance modification must retain compatibility with these tests under the same law and declared environmental states.

## Strong-Field Regime

Strong-field departures must also respect tested compact-object observations. Passing weak-field tests does not by itself constrain every strong-field continuation or authorize disagreement with measured strong-field behavior.

The [canonical strong-field alignment condition](./singularity-resolution.md#canonical-strong-field-alignment-condition) specifies a candidate assembly boundary. Its relation to an effective horizon is a constitutive hypothesis. Local speed or alignment conditions alone do not establish an event horizon, which in the GR comparison is the boundary of events able to send outgoing signals to the asymptotic exterior. That claim needs the global signal continuation; finite substrate time or flat void geometry does not supply it or prove singularity resolution.

The strong-field interpretation is therefore:

- outside the alignment regime, GR-like effective geometry should emerge to the accuracy already tested,
- near the alignment regime, departures may appear through medium saturation, coplanarity, altered signal propagation, and assembly reconfiguration,
- but those departures must be stated as predictions, not used as excuses to miss weak-field closure.

The exterior benchmark still includes the standard compact-object scales before any native horizon-interface departure is promoted:
$$
r_s=\frac{2G_N M}{c_0^2},
\qquad
r_{\mathrm{ph}}=\frac{3G_N M}{c_0^2},
\qquad
r_{\mathrm{ISCO}}=\frac{6G_N M}{c_0^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d7ef96253ade83c7)

for the Schwarzschild comparison branch, a spherical, nonrotating, uncharged, asymptotically flat exterior. These are areal radii, defined by sphere area $4\pi r^2$, not the isotropic radial coordinates used in a weak-field optical chart. The first is the comparison horizon radius, the second the unstable circular null-orbit radius, and the third the innermost stable circular orbit for massive test bodies. Their realization in the substrate is open. A proposed alternative must derive its exterior signal and orbit predictions and compare them with measured quantities; simply listing these scales or naming an alignment state does not pass that comparison.

## Closure Targets

Classical recovery on a declared domain requires all of the following from one constitutive law with compatible records:

1. clock slowing / redshift,
2. Shapiro delay,
3. light bending,
4. 1PN orbital corrections,
5. composition and self-gravity equivalence tests, with consistent mass calibration,
6. negligible preferred-frame leakage in tested regimes,
7. gravitational-wave speed, dispersion, and two-mode polarization compatibility,
8. non-arbitrary finite-boundary continuation wherever a strong-field or cosmological comparison invokes global extension assumptions.

The same law must survive every applicable test. Finite-boundary continuation remains conditional on the stated dynamics domain. Recovering the quantum-gravity EFT limit adds the matched-observable comparison described above when that stronger claim is made; it is separate from this classical acceptance set.

## Falsification Gate

The GR-observables interface fails if any of the following occur:

- redshift, lensing, and Shapiro delay require different constitutive parameter choices,
- Newtonian acceleration, orbital motion, or composition and self-gravity responses exceed their applicable bounds,
- preferred-frame leakage exceeds the bounds recorded in [constraint-ledger.md](../validation/constraint-ledger.md),
- gravitational-wave propagation departs from observational timing, dispersion, or polarization bounds in validated regimes,
- a strong-field or cosmology packet needs an unrecorded global assumption to select its continuation,
- or the weak-field map cannot recover the GR coefficients to the required precision while remaining consistent with the rest of the substrate story.

In compact form, the required acceptance set is
$$
\mathcal{C}_{\text{redshift}}
\cap
\mathcal{C}_{\text{Shapiro}}
\cap
\mathcal{C}_{\text{lensing}}
\cap
\mathcal{C}_{\text{1PN}}
\cap
\mathcal{C}_{\text{EP}}
\cap
\mathcal{C}_{\text{PF}}
\cap
\mathcal{C}_{\text{GW}}
\cap
\mathcal{C}_{\text{cont}}
\neq \varnothing
$$

[View →](../../../../equation-mapping.html#corpus-equation-05d464d7eef89585)

Each $\mathcal C$ is the subset of the declared candidate-law and record space satisfying the named test at fixed tolerances; $\mathcal C_{\text{1PN}}$ includes the Newtonian limit and applicable remaining PPN constraints, and $\mathcal C_{\text{EP}}$ includes composition, self-gravity, and mass-calibration tests. The intersection is a necessary compatibility condition, not a proof that a candidate exists. An empty intersection rejects that candidate family and domain. Failure to construct or search the family leaves existence unresolved and does not establish emptiness or exclude every possible constitutive law.

## Source Notes

- Clifford M. Will, [*The Confrontation between General Relativity and Experiment*](https://arxiv.org/abs/1403.7377) (2014), sections 3.2 and 4.1–4.2, defines the PPN coefficients and the domains of the light-propagation and perihelion comparisons. These are effective-theory benchmarks.

- Tobias Bothwell and collaborators, [*Resolving the gravitational redshift within a millimeter atomic sample*](https://arxiv.org/abs/2109.12238), arXiv:2109.12238, published in *Nature* 602, 420–424 (2022), report spatially resolved strontium-clock spectroscopy consistent with the gravitational frequency gradient. This supports the clock measurement, not an Architrino constitutive derivation.
- N. E. J. Bjerrum-Bohr, J. F. Donoghue, and B. R. Holstein, [*Quantum Gravitational Corrections to the Nonrelativistic Scattering Potential of Two Masses*](https://arxiv.org/abs/hep-th/0211072) (2003), especially sections 2.1 and 4.1, derive a long-distance quantum comparison and specify potential and coordinate conventions. This is theoretical EFT support, not an observation of the correction.
- B. P. Abbott and collaborators, [*Tests of General Relativity with GW170817*](https://dcc-lho.ligo.org/LIGO-P1800059-v9/public) (2019), constrain selected propagation and polarization alternatives. The polarization analysis compares pure tensor, vector, and scalar hypotheses; it explicitly leaves mixed-mode content outside that test.

## Related Chapters

- [emergent-metric.md](./emergent-metric.md)
- [ppn-parameters.md](./ppn-parameters.md)
- [proper-time-and-time-dilation.md](./proper-time-and-time-dilation.md)
- [gravitational-waves.md](./gravitational-waves.md)
- [singularity-resolution.md](./singularity-resolution.md)
- [black-holes.md](./black-holes.md)
- [../validation/constraint-ledger.md](../validation/constraint-ledger.md)
