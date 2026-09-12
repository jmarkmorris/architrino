# Emergent Metric

This chapter explains how metric language enters a theory whose substrate is not metric spacetime. The [Euclidean void](../foundations/euclidean-void.md), the fixed three-dimensional spatial container, remains flat; [absolute time](../foundations/absolute-time.md) supplies the universal ordering parameter. The Noether sea changes state inside it. The effective metric is the observer-level description extracted from clock, ruler, signal, and medium-response channels. This chapter says what that metric means, which medium variables are supposed to carry it, and what weak-field map has to be recovered before the spacetime branch can claim recovery of general relativity (GR), the observer-level theory relating clock intervals, trajectories, and signal paths to spacetime geometry.

The parameterized post-Newtonian (PPN) framework compares weak-gravity predictions through coefficients for clock rates, spatial distances, and motion relative to a preferred frame. Its role here is to test a proposed metric reconstruction; those coefficients are not premises of the architrino acceleration law.

The one-line map is: Noether sea record to clock, ruler, signal, and drift response; those responses to an effective metric; that effective metric to GR benchmark observables. Each arrow has to be earned. A metric that fits only one channel is not yet a spacetime recovery, because Physical Observers need one coherent effective geometry across clocks, photons, matter motion, and gravitational-wave channels.

## Absolute Frame vs. Effective Geometry

The spacetime branch keeps two descriptions separate. The absolute frame is the fixed bookkeeping structure of absolute time and Euclidean position; it supplies the substrate coordinates in which architrino path histories and Noether sea state are recorded. Effective geometry is the observer-level metric reconstructed from clocks, rulers, signal propagation, and medium response.

The bridge is therefore constitutive rather than ontological. A successful metric map must explain how the same Noether sea record produces lapse, spatial-compliance, drift, and signal-delay channels without treating the Euclidean void itself as curved.

## Ontological Picture

- **Substrate**: A fixed Euclidean 3D void with absolute time $T$. A chosen chart $(X,Y,Z)$ represents fixed void locations; the labels never move or curve.
- **Noether sea**: The [Noether sea](noether-sea.md), an ambient population of neutral assemblies called Noether braids. Their constituents are [architrinos](../foundations/architrino.md), point transceivers with polarity and path history; pro/anti labels describe braid-frame orientation. The bridge term *spacetime medium* is used when translating toward effective spacetime language.
- **$\mathbb{U}_{\text{now}}$ universe-state perspective**: Complete-state bookkeeping on the absolute-time slice, carrying:
  - The full architrino microstate $S(T)$,
  - The instantaneous state of the Noether sea (density $\rho_{\text{NS}}(\mathbf X,T)$, alignment, stress),
  - The derivable effective potential field $\Phi_{\text{eff}}(\mathbf X,T)$ and its gradients.

From this bookkeeping perspective, there is only:
- Flat Euclidean geometry $h_{ij}=\delta_{ij}$,
- A dynamic medium (Noether braids) moving and rearranging in that geometry.

The metric appears only after a Physical Observer record is assembled from those ingredients.

## Canonical Symbols (Spacetime)

Use the following symbols consistently across spacetime chapters:

- $n(\mathbf X,T)$: dimensionless Noether braid number density normalized to a declared positive reference density $\rho_{\text{NS},0}$.
- $\rho_{\text{NS}}(\mathbf X,T)=\rho_{\text{NS},0}\,n(\mathbf X,T)$: Noether braid number density, with units of inverse volume.
- $\chi_{\text{sea}}(\mathbf X,T)=c_f/c_{\text{eff}}(\mathbf X,T)$: Noether sea delay factor.
- $c_0>0$: the asymptotic homogeneous observer-channel speed, written $c_0\equiv c_{\text{eff}}(\infty)$ after the common spatial and temporal calibration has been declared. Here $\infty$ denotes the homogeneous reference region of an isolated-source comparison.
- $\Phi_{\text{eff}}(\mathbf X,T)$: constitutive potential inferred from the clock channel.
- $\Phi_N(\mathbf X,T)$: Newtonian benchmark potential used for weak-field matching.
- $U\equiv -\Phi_N>0$: positive weak-field PPN potential variable.
- $N(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$: observer-level lapse or clock-rate field reconstructed from Noether sea state.
- $u^i_{\mathrm{sea,eff}}(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$: Noether sea drift field in the observer-level bookkeeping map.
- $e^a{}_i(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$: spatial coframe coefficients, mapping coordinate displacements to locally calibrated ruler components; $a,i\in\{1,2,3\}$. The coframe carries the proposed Noether sea compliance response.
- $\gamma_{ij}^{\mathrm{eff}}(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)=\delta_{ab}e^a{}_i e^b{}_j$: observer-level spatial compliance metric.
- $(\gamma_{\mathrm{eff}}^{-1})^{ij}$: inverse of the spatial compliance metric, defined by $(\gamma_{\mathrm{eff}}^{-1})^{ik}\gamma_{kj}^{\mathrm{eff}}=\delta^i{}_j$.

## What “Metric” Means Here

- **Effective metric $g^{\text{eff}}_{\mu\nu}(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$** is *not* a fundamental property of the void. It is a derived description of:
  - How assembly-based clocks tick,
  - How assembly-based rulers measure distances,
  - How photon-channel packets and gravitational-wave channels propagate through the Noether sea.

We define $g^{\text{eff}}_{\mu\nu}$ operationally:

> At each effective-chart point $(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$, choose an idealized Physical Observer (Noether braid clock + ruler), and infer a local metric from their measured time intervals and spatial separations.

An observer chart must first be specified by a candidate map $(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)=\chi_{\mathrm{eff}}(T,\mathbf X,\mathcal N_{\mathrm{sea}},\text{observer record})$, where $\mathcal N_{\mathrm{sea}}$ retains the medium state and relevant history. This map is open. Equal units do not identify $T$ with $t_{\mathrm{eff}}$ or $X^i$ with $x_{\mathrm{eff}}^i$. In an effective spatial chart, $h_{ij}$ denotes the Euclidean reference metric carried into that chart; it equals $\delta_{ij}$ only for Cartesian reference coordinates.

The Arnowitt–Deser–Misner (ADM) form separates the effective metric into clock rate, relative spatial motion, and ruler distance. Cartan's coframe description expresses those ruler distances through local one-forms. These are mathematical descriptions at the observer level. The complete-state perspective maps substrate and medium data into their coefficients:

$$
\big(h_{ij}, n, \chi_{\text{sea}}, \Phi_{\text{eff}}, \nabla\Phi_{\text{eff}}, \text{stress}, \text{alignment}\big)
\;\Rightarrow\;
\big(N,u^i_{\mathrm{sea,eff}},e^a{}_i,\gamma_{ij}^{\mathrm{eff}}\big)
\;\Rightarrow\;
g^{\text{eff}}_{\mu\nu}
$$

[View →](../../../../equation-mapping.html#corpus-equation-076993b73a4321c2)

The first arrow is the open constitutive problem. It carries the main closure burden: the Noether sea state must produce the clock, ruler, drift, and signal channels together. In observer-record language, this map is the $\Pi_{\mathrm{ADM}}$ projection consumed after it has been built from the shared record; listing $\Phi_{\text{eff}}$ and $\chi_{\text{sea}}$ on the first arrow marks intermediate constitutive fields, not independently fitted inputs. The second arrow is the observer-level metric assembly; it does not curve the Euclidean void.

### Weak-Gravity Visibility Scale

For weak effective-metric recovery, the useful small parameter is not the material temperature measured against the Planck temperature. It is the dimensionless effective potential, together with the density-length scale that sources that potential. For a roughly uniform ordinary-matter body of characteristic size $L$ and standard-matter density $\rho_{\mathrm{mat}}$, the Newtonian comparison estimate is

$$
\epsilon_{\Phi}
\equiv
\frac{|\Phi_{\text{eff}}|}{c_0^2}
\sim
\frac{4\pi G_{\mathrm{eff}}\rho_{\mathrm{mat}}L^2}{3c_0^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-5396b604ccb5c746)

Thus ordinary density can be weakly visible to clocks and signal paths when it is integrated over planetary or stellar length scales, while meter-scale laboratory samples require much higher density or precision. The Earth core is thermally cold on a Planck-temperature comparison, but that fact is not the limiting variable for weak gravity. Recovering that contribution requires an assembly and medium response to the distributed rest-energy, pressure, stress, and exposure record; the density-length estimate does not derive that response.

A spherical-source sanity check keeps this point from collapsing into a temperature-gradient story. A hot or strongly excited medium region can have maximum scalar excitation near its center while the effective gravitational acceleration vanishes there by symmetry:
$$
\mathbf{a}_{\mathrm{eff}}(\mathbf{0})
=-\nabla\Phi_{\text{eff}}(\mathbf{0})
=\mathbf{0}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-61834399155d385e)

The constitutive variable that sources $\Phi_{\text{eff}}$ may therefore be an energy, stress, or RMS excitation record, but the force-like observer readout still comes from the spatial gradient of the shared effective potential. A model that equates gravity directly with "more temperature" fails this center-gradient check even before PPN coefficients are tested.

### Alternating-Flux Constitutive Candidate

One candidate route from assembly wakes to weak gravity is a root-mean-square (RMS) excitation law, which measures the size of a fluctuating acceleration even when its time average vanishes. If local causal-wake hits alternate in sign, direction, or branch provenance, the mean signed acceleration can cancel while the quadratic excitation of the Noether sea remains:
$$
\Phi_{\mathrm{eff}}^\theta(\mathbf X,T)
\propto
\mathcal{K}_{\mathrm{sea}}
\left\langle
\left\|\sum_s q_s\mathbf A_s(\mathbf X,T)\right\|_h^2
\right\rangle_{\Delta T}^{1/2}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-28ee266019bf0cc0)

Here $s$ labels each admitted transmitter-root pair for a declared receiver channel, $q_s$ is its transmitter polarity, and $q_s\mathbf A_s$ is its full signed acceleration contribution from the [Master Equation](../dynamics/master-equation.md#per-hit-acceleration). Thus $\mathbf A_s=\kappa q_r W_s^{\mathrm{acc}}\hat{\mathbf r}_s/r_s^2$ for receiver polarity $q_r$, with $W_s^{\mathrm{acc}}=c_f/|D_{t,s}|$; the direction $\hat{\mathbf r}_s$ runs from emission to reception. The norm uses $h_{ij}$, and $\langle F\rangle_{\Delta T}=\Delta T^{-1}\int_{T-\Delta T}^{T}F(T')\,dT'$ uses a declared positive absolute-time window. Root completeness, finite squared amplitude on that window, and a common receiver/population averaging prescription are required. The candidate record $\theta$ must specify them. Since the RMS has acceleration units, the net coefficient represented by $\mathcal K_{\mathrm{sea}}$ must have length units to produce a potential with units of speed squared. This coefficient and the constitutive law remain hypotheses, not consequences of taking an RMS. The homogeneous reference must also satisfy $\Phi_{\mathrm{eff}}^\theta(\infty)=0$. If its RMS is nonzero, the candidate needs a derived reference subtraction or normalization shared by all channels; the raw RMS formula alone does not meet this condition. The same excitation must supply the clock, ruler, and signal responses without separate fitting.

Because the RMS factor is non-negative, the attractive weak-field branch requires a declared negative sign: $\mathcal K_{\mathrm{sea}}<0$ in the convention $\Phi_{\mathrm{eff}}=c_0^2\ln N<0$ near an ordinary mass source. Increasing the shared RMS excitation must then make $\Phi_{\mathrm{eff}}$ more negative monotonically on that branch. Without this sign and monotonicity condition, the candidate does not determine even the direction of the recovered weak-field acceleration.

## ADM/Cartan Reconstruction Surface

The ADM/Cartan reconstruction connects the observer-record map in [Observer Framework](observer-framework.md#boundary-wake-covariance-scaffold) to the metric used in neighboring dynamics chapters. With $x_{\mathrm{eff}}^0=c_0t_{\mathrm{eff}}$, the observer-level line element target is

$$
ds_{\mathrm{eff}}^2
=
-N^2c_0^2dt_{\mathrm{eff}}^2
+
\gamma_{ij}^{\mathrm{eff}}
\left(dx_{\mathrm{eff}}^i-u^i_{\mathrm{sea,eff}}dt_{\mathrm{eff}}\right)
\left(dx_{\mathrm{eff}}^j-u^j_{\mathrm{sea,eff}}dt_{\mathrm{eff}}\right)
$$

[View →](../../../../equation-mapping.html#effective-metric-adm-cartan)

Work on a patch with $N>0$ and an invertible real coframe $e^a{}_i$. In Cartesian length coordinates, $N$, $e^a{}_i$, and $\gamma_{ij}^{\mathrm{eff}}$ are dimensionless, while $u^i_{\mathrm{sea,eff}}$ has speed units. The spatial metric is positive definite because $v^i\gamma_{ij}^{\mathrm{eff}}v^j=\sum_a(e^a{}_iv^i)^2>0$ for $v\ne0$. The invertible coframe $(Nc_0dt_{\mathrm{eff}},e^a{}_i(dx_{\mathrm{eff}}^i-u^i_{\mathrm{sea,eff}}dt_{\mathrm{eff}}))$ puts the line element in signature $(-,+,+,+)$; its determinant in $x_{\mathrm{eff}}^\mu$ coordinates is $-N^2\det\gamma^{\mathrm{eff}}<0$. A rank loss or $N=0$ ends this chart's domain. Smooth connection and curvature calculations require respectively $C^1$ and $C^2$ metric data. Local rotations of the ruler coframe leave $\gamma_{ij}^{\mathrm{eff}}$ unchanged, so a metric alone does not recover physical braid orientation.

Here $N$ gives $d\tau/dt_{\mathrm{eff}}$ only for a clock following $dx_{\mathrm{eff}}^i=u^i_{\mathrm{sea,eff}}dt_{\mathrm{eff}}$; other clock trajectories also sample the spatial term. In the GR-matching regime the effective connection is the Levi-Civita connection of $g^{\text{eff}}_{\mu\nu}$; torsion, nonmetricity, birefringence, dispersion, and preferred-frame leakage are deviation observables rather than substrate ontology.

This form is the common handoff surface for clock redshift, Shapiro delay, lensing, geodesic motion, photon synchronization, and preferred-frame tests. A scalar speed map alone is therefore not enough for closure: it can support a first Shapiro-delay intuition, but the full PPN burden requires the lapse, drift, and spatial-compliance channels together.

The same handoff can be written as a local clock-and-signal quadratic form,
$$
d\tau^2
=
A^2(\mathcal{N}_{\mathrm{sea}})\,dt_{\mathrm{eff}}^2
-
\frac{1}{c_0^2}
B_{ij}(\mathcal{N}_{\mathrm{sea}})
\left(dx_{\mathrm{eff}}^i-u^i_{\mathrm{sea,eff}}dt_{\mathrm{eff}}\right)
\left(dx_{\mathrm{eff}}^j-u^j_{\mathrm{sea,eff}}dt_{\mathrm{eff}}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-4fc11cc78bbfa139)

with $A=N$, $B_{ij}=\gamma_{ij}^{\mathrm{eff}}$, and $d\tau^2=-ds_{\mathrm{eff}}^2/c_0^2$ on timelike clock records. A positive clock rate requires $\gamma_{ij}^{\mathrm{eff}}(v^i-u^i_{\mathrm{sea,eff}})(v^j-u^j_{\mathrm{sea,eff}})<N^2c_0^2$, where $v^i=dx_{\mathrm{eff}}^i/dt_{\mathrm{eff}}$. In the local Noether sea rest chart, choose a ray direction with $h_{ij}\hat k^i\hat k^j=1$. Conditional on the photon channel sharing this metric's null cone, its coordinate speed measured per Euclidean reference length is
$$
c_\gamma(\hat{\mathbf{k}},\mathcal{N}_{\mathrm{sea}})
=
\frac{
c_0A(\mathcal{N}_{\mathrm{sea}})
}{
\sqrt{
B_{ij}(\mathcal{N}_{\mathrm{sea}})\hat k^i\hat k^j
}
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-6e00dbc328030441)

This is a metric-null speed prediction. Agreement with an independently extracted photon speed remains a recovery target. In the same rest chart, the ruler increment satisfies $d\ell^2=\gamma_{ij}^{\mathrm{eff}}dx_{\mathrm{eff}}^idx_{\mathrm{eff}}^j$ and the stationary reference-clock interval is $d\tau_{\mathrm{ref}}=Ndt_{\mathrm{eff}}$; null propagation gives the locally measured ratio $d\ell/d\tau_{\mathrm{ref}}=c_0$. The weak homogeneous observer branch requires
$$
A\to1,
\qquad
B_{ij}\to\delta_{ij},
\qquad
u^i_{\mathrm{sea,eff}}\to0
$$

[View →](../../../../equation-mapping.html#corpus-equation-a560a0adc81e6f64)

This is a constitutive equation, not a new fundamental four-dimensional metric on absolute timespace. Every weak-field expansion about this branch is additionally conditional on the homogeneous quiescent Noether sea being an equilibrium of the constitutive dynamics; that equilibrium predicate is an open closure item of the [Noether sea program](noether-sea.md), and the expansions below inherit it rather than establish it.

As a form-level recovery, the same handoff already has the correct weak-field clock shape once the clock-channel potential has been matched to the Newtonian benchmark. In a weak, slow comparison window,
$$
\frac{d\tau_{\mathcal A}}{dt_{\mathrm{eff}}}
\approx
1-\frac{U}{c_0^2}
-\frac{\|\mathbf v_{\mathrm{clk}}\|_h^2}{2c_0^2},
$$

[View →](../../../../equation-mapping.html#corpus-equation-686bee199bdbc652)

where $U\ge0$ is the positive Newtonian potential declared above and $\mathbf v_{\mathrm{clk}}$ is the clock group velocity relative to the local Noether sea, expressed in the same effective chart. This clock velocity is distinct from the medium's motion relative to a comparison frame, denoted $w^i$ below. This reproduces the Newtonian-limit clock relation and the standard $g_{00}$ first-order structure as a comparison form. It is not yet coefficient-level GR closure: $\Phi_{\mathrm{eff}}=\Phi_N$, $G_{\mathrm{eff}}$, and any Einstein-equation analogue must still be derived from the same Noether sea response record that supplies $A$, $B_{ij}$, $c_{\text{eff}}$, and the photon channel.

The retained weak-field coefficient map should therefore be expressed at the ADM/Cartan level before observable projections are evaluated. With
$$
\delta n\equiv n-1,\qquad
\delta\chi\equiv\frac{\chi_{\text{sea}}}{\chi_{\text{sea}}(\infty)}-1,
\qquad
\varphi\equiv\frac{\Phi_{\text{eff}}}{c_0^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-3998b52bba7dc3d0)

and with $\Sigma^{\mathrm{tf}}_{\text{sea},ij}$ the retained stress projection with its $h$-trace removed, the minimal coefficient scaffold is
$$
N
=
1
+A_N^n\delta n
+A_N^\chi\delta\chi
+A_N^\Phi\varphi
+Q_N(\delta n,\delta\chi,\varphi,\Sigma_{\text{sea}}^{\mathrm{tf}})
+O(\epsilon_{\mathrm{PN}}^3,\epsilon_{\mathrm{LV}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-2167007e26378c1d)

$$
\gamma_{ij}^{\mathrm{eff}}
=
h_{ij}
\left(
1
+A_\gamma^n\delta n
+A_\gamma^\chi\delta\chi
+A_\gamma^\Phi\varphi
\right)
+A_{\gamma,\mathrm{tf}}\Sigma^{\mathrm{tf}}_{\text{sea},ij}
+O(\epsilon_{\mathrm{PN}}^2,\epsilon_{\mathrm{LV}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-36fc405532a4696e)

$$
u^i_{\mathrm{sea,eff}}
=
D_U w^i\frac{U}{c_0^2}
+D_{\mathrm{aniso}} w^j\frac{U^i{}_j}{c_0^2}
+O(c_0\epsilon_{\mathrm{PN}}^{5/2},c_0\epsilon_{\mathrm{LV}}),
\qquad
\gamma_{ij}^{\mathrm{eff}}=\delta_{ab}e^a{}_i e^b{}_j
$$

[View →](../../../../equation-mapping.html#corpus-equation-b8321393ecb536b5)

Here $\epsilon_{\mathrm{PN}}$ is a dimensionless weak-field ordering parameter: $U/c_0^2$, $\delta n$, $\delta\chi$, $\varphi$, and $A_{\gamma,\mathrm{tf}}\Sigma^{\mathrm{tf}}_{\mathrm{sea},ij}$ are $O(\epsilon_{\mathrm{PN}})$, while $\|\mathbf w\|_h/c_0=O(\epsilon_{\mathrm{PN}}^{1/2})$ on the declared window. The scalar response coefficients are dimensionless; $A_{\gamma,\mathrm{tf}}$ carries inverse-stress units if the stress is dimensional. $Q_N$ collects second-order dimensionless contributions. The fields are constrained projections of one record, so $\varphi=\ln N$ where the clock-potential definition is used; it is not an independently adjustable input. Here $w^i$ is the Noether sea drift relative to the comparison frame, $D_U$ and $D_{\mathrm{aniso}}$ are the isotropic and anisotropic drift-response coefficients, $U$ is the positive PPN potential, and $U^i{}_j$ is its standard anisotropic potential tensor. These are coefficient rows for the observer-level reconstruction. This minimal preferred-motion scaffold omits independent source-current terms needed for rotating sources; those belong to the full PPN comparison. Redshift, Shapiro delay, lensing, weak-field acceleration, and preferred-frame residuals must read from these rows as one shared constitutive record. The coefficient dictionary to $(\gamma_{\mathrm{PPN}},C_2^{(U)},\Xi_1,\ldots,\Xi_4)$ is given in [PPN Parameters](./ppn-parameters.md#admcartan-extraction-equations).

A practical consistency check is that those channels must be projections of one shared record of the Noether sea and the Physical Observer, not independently tuned descriptions. For an observation window $W$, let $\theta$ collect the retained Noether sea state, source assemblies, observer clock/ruler state, signal-channel record, apparatus calibration, and boundary wake data. Let
$$
\Pi_{\mathrm{clk}}\theta,\qquad
\Pi_{\mathrm{rul}}\theta,\qquad
\Pi_{\mathrm{sig}}\theta
$$

[View →](../../../../equation-mapping.html#corpus-equation-aae5b2ebd004d717)

denote the clock, ruler, and signal projections of that same record. Let $\mathcal{B}_{\mathrm{eff}}$ be the benchmark bundle returned by the candidate effective-metric map from those projections, and let $\mathcal{B}_{\mathrm{GR}}^{W}$ denote the GR/PPN benchmark bundle on $W$ for redshift, Shapiro delay, lensing, precession, two-way signal speed, and preferred-frame bounds. A compact metric-recovery residual is
$$
\mathcal{R}_{\mathrm{metric}}(\theta;W)
=
\left\|
\mathcal{B}_{\mathrm{eff}}
\big(
\Pi_{\mathrm{clk}}\theta,
\Pi_{\mathrm{rul}}\theta,
\Pi_{\mathrm{sig}}\theta
\big)
-
\mathcal{B}_{\mathrm{GR}}^{W}
\right\|_{\Sigma_W^{-1}}
+
\lambda_{\mathrm{PF}}\sum_{i=1}^{3}\alpha_i(\theta)^2
+
\lambda_{\mathrm{retune}}\mathcal{S}_{\mathrm{retune}}(\theta)
$$

[View →](../../../../equation-mapping.html#corpus-equation-e4e8cdc584bd10dc)

Here $\Sigma_W$ is a positive-definite benchmark covariance on the retained independent observable components, with $\|r\|_{\Sigma_W^{-1}}^2=r^{\mathsf T}\Sigma_W^{-1}r$. This weighting makes the residual dimensionless even when observables have different units. The dimensionless $\alpha_i$ measure preferred-frame departures. All penalty weights are declared nonnegative dimensionless numbers, and $\mathcal S_{\mathrm{retune}}\ge0$ is zero only when the same parameter and calibration choices serve all channels. The displayed test is a diagnostic on the declared window, not a proof of metric recovery. Its proposed acceptance condition is
$$
\mathcal{R}_{\mathrm{metric}}(\theta;W)\le\epsilon_{\mathrm{metric}},
\qquad
\mathcal{S}_{\mathrm{retune}}(\theta)=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-dc56bc079251de78)

The point is not to add a new spacetime ontology. It is to require the effective metric to behave as one constitutive summary of the same Noether sea state and observer record across clocks, rulers, signal propagation, and weak-field gravitational tests.

### Geodesic and Lensing Recovery Benchmarks

The effective metric map must also recover the two standard variational benchmarks consumed by orbital, clock, and light-propagation tests. For timelike free-test-assembly records in the effective description, $m$ is a constant assembly mass parameter, not architrino mass. The comparison action is
$$
S_{\mathrm{clk}}
=
-m c_0^2
\int d\tau,
\qquad
d\tau
=
\frac{1}{c_0}
\sqrt{-g^{\text{eff}}_{\mu\nu}dx_{\mathrm{eff}}^\mu dx_{\mathrm{eff}}^\nu}
$$

[View →](../../../../equation-mapping.html#geodesic-proper-time-action)

Its geodesics are paths stationary under fixed-endpoint variations of the effective proper-time integral. In a stationary zero-shift weak field, their slow-motion limit must give the acceleration comparison used in the PPN bundle,
$$
\frac{d^2x_{\mathrm{eff}}^i}{dt_{\mathrm{eff}}^2}
=
-(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}
+O\!\left(\epsilon_{\mathrm{PN}}\|\nabla\Phi_{\mathrm{eff}}\|_h
+\frac{\|\mathbf v\|_h^2}{L_{\mathrm{met}}}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-a35d6c93159ee4b3)

Here $L_{\mathrm{met}}>0$ bounds spatial variation of the metric and lapse through their logarithmic derivatives, and $\mathbf v= d\mathbf x_{\mathrm{eff}}/dt_{\mathrm{eff}}$. The exact lapse factor and velocity terms are explained in the final section. This observer-level variational target does not derive a variational principle for delayed architrino paths.

For null signal records,
$$
g^{\text{eff}}_{\mu\nu}dx_{\mathrm{eff}}^\mu dx_{\mathrm{eff}}^\nu=0
$$

[View →](../../../../equation-mapping.html#photon-null-eikonal)

must match the eikonal path-time extremal of the Noether sea signal channel. For a stationary isolated point-mass comparison, with effective Newton coupling $G$, source mass $M$, and impact parameter $b$, the weak-field deflection target is
$$
\Delta\theta
=
2(1+\gamma_{\mathrm{PPN}})
\frac{GM}{b\,c_0^2}
+O(c_0^{-4})
$$

[View →](../../../../equation-mapping.html#shapiro-lensing-ppn)

so the GR limit $\gamma_{\mathrm{PPN}}=1$ gives $\Delta\theta=4GM/(b\,c_0^2)$. A lapse-only or scalar-delay-only map that supplies only $2GM/(b\,c_0^2)$ has recovered the Newtonian half-test, not the full effective metric. This is why the ADM/Cartan map must carry both the clock/lapse channel and the spatial-compliance channel.

### Lensing-Dynamics Equality Constraint

Hybrid dark-sector comparisons sharpen the metric burden: a modified force law that changes baryonic dynamics must also give the correct lensing potential, or the inferred dynamical mass and lensing mass will disagree. In weak-field comparison language, write the effective metric potentials as

$$
ds_{\mathrm{eff}}^2
=
-\left(1+\frac{2\Phi_{\mathrm{dyn}}}{c_0^2}\right)c_0^2dt_{\mathrm{eff}}^2
+
\left(1-\frac{2\Psi_{\mathrm{sp}}}{c_0^2}\right)h_{ij}dx_{\mathrm{eff}}^i dx_{\mathrm{eff}}^j
$$

[View →](../../../../equation-mapping.html#corpus-equation-93c0079533adc34e)

Massive slow probes read the dynamical potential $\Phi_{\mathrm{dyn}}$, while weak lensing reads the Weyl combination

$$
\Phi_{\mathrm{lens}}
=
\frac{\Phi_{\mathrm{dyn}}+\Psi_{\mathrm{sp}}}{2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-1065484b1bf719c3)

For an isolated weak-field comparison with negligible anisotropic stress and matched potential zero points, the GR equality target is

$$
\Phi_{\mathrm{lens}}
=
\Phi_{\mathrm{dyn}}
+O(\epsilon_{\mathrm{lens}}),
\qquad
\Psi_{\mathrm{sp}}-\Phi_{\mathrm{dyn}}
=
O(\epsilon_{\mathrm{lens}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-26f4bcea5c297eff)

Here $\epsilon_{\mathrm{lens}}$ has potential units. Where $\Phi_{\mathrm{dyn}}\ne0$, a source family with constant leading ratio $\Psi_{\mathrm{sp}}/\Phi_{\mathrm{dyn}}$ identifies that ratio with $\gamma_{\mathrm{PPN}}$. A general scale-dependent gravitational slip or a source with significant anisotropic stress cannot be assigned this single PPN coefficient without a further reduction. A scalar force or medium-response correction that appears only in the clock/lapse channel accelerates matter but under-deflects light. A valid $\mathbb{A}\mathbb{A}\mathbb{A}$ response must project the same Noether sea state into the lapse and spatial-compliance channels so that rotation curves, hydrostatic mass, time delay, and lensing consume one effective metric.

For a window $W$, add the lensing-dynamics residual

$$
\mathcal{R}_{\mathrm{lens=dyn}}(\theta;W)
=
\left\|
\nabla\Phi_{\mathrm{dyn}}^\theta
-
\nabla\Phi_{\mathrm{dyn}}^{\mathrm{obs}}
\right\|_{C_{\mathrm{dyn}}^{-1}}^2
+
\left\|
\nabla\Phi_{\mathrm{lens}}^\theta
-
\nabla\Phi_{\mathrm{lens}}^{\mathrm{obs}}
\right\|_{C_{\mathrm{lens}}^{-1}}^2
+
\lambda_\gamma
\left\|
\gamma_{\mathrm{PPN}}^\theta-1
\right\|_W^2
+
\lambda_{\mathrm{shared}}\mathcal{S}_{\mathrm{retune}}(\theta)
$$

[View →](../../../../equation-mapping.html#corpus-equation-ab2a6181d314c2da)

The superscript $\mathrm{obs}$ denotes a declared observational reconstruction with its source-model uncertainty. The covariances $C_{\mathrm{dyn}}$ and $C_{\mathrm{lens}}$ weight the sampled gradient data, and $\|\cdot\|_W$ is a declared normalized sampling norm. Their separate quadratic terms assume negligible cross-covariance; otherwise the joint covariance is required. The equality penalty applies only in the stated negligible-slip comparison regime. This residual tests an effective-metric candidate and supplies no dark-sector ontology. It is the condition that lets a medium-response explanation of galaxy or cluster dynamics remain compatible with the same lensing map.

### Matter-Channel Compatibility Target

The same shared-record rule applies to the effective matter channels whose observations test the metric. Predictive matter dynamics and observer-level geometry must describe the same clock, ruler, and signal observations. In this framework, the matter channel, clock channel, ruler channel, and signal channel must remain projections of the same Noether sea record $\theta$.

For the signal-carrying channels used in metric reconstruction, let $\operatorname{Char}_r(\theta)$ denote the observer-level characteristic surface family extracted from channel $r$, and let $\operatorname{Null}(g^{\text{eff}}_{\mu\nu}(\theta))$ denote the null surface family of the reconstructed effective metric. A compact compatibility residual is
$$
\mathcal{R}_{\mathrm{char}}(\theta)
=
\sup_{r\in\mathfrak{R}_{\mathrm{sig}}}
\left[
d_{\mathrm{cone}}
\left(
\operatorname{Char}_r(\theta),
\operatorname{Null}(g^{\text{eff}}_{\mu\nu}(\theta))
\right)
+
\lambda_{\mathrm{C}}
\mathcal{R}_{\mathrm{Cauchy}}^{(r)}(\theta)
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-34c260c43d4c592a)

Here $\mathfrak R_{\mathrm{sig}}$ contains the admitted nondispersive signal channels, and $d_{\mathrm{cone}}$ is a declared dimensionless directional mismatch between characteristic and metric-null covectors in the same chart. A Cauchy problem predicts later channel data from data on an admitted initial surface; $\mathcal{R}_{\mathrm{Cauchy}}^{(r)}$ records failure of the declared channel to share the predictive Cauchy evolution used by the same observer-level metric record. In the weak homogeneous photon recovery regime, this residual includes the requirement that the two physical polarization branches share the same free-space characteristic cone up to the birefringence tolerance routed through [Failure Criteria](../validation/failure-criteria.md#operational-null-result-ledger).

The channel equations, cone-distance normalization, and Cauchy diagnostic still have to be specified before this expression can be evaluated. It remains a recovery target rather than substrate ontology. If $\mathcal{R}_{\mathrm{char}}$ is small only because the photon, clock, ruler, or stress channels use different fitted records, the metric has not been recovered as a constitutive output of the Noether sea.

For fermion matter channels, the compatibility burden inherits the spinor ledger. The effective metric may summarize the matter channel only after the ordered-frame spinor target, the effective spin-operator record, and weak-coupling-triad exposure are supplied by the same branch record. In compact form,
$$
\mathcal{R}_{\mathrm{metric}}^{\mathrm{fermion}}(\theta;W)
=
\mathcal{R}_{\mathrm{metric}}(\theta;W)
+\lambda_{\mathrm{s2m}}
\mathcal{R}_{\mathrm{spin\to metric}}(\theta;W)
$$

[View →](../../../../equation-mapping.html#corpus-equation-aaab9d9dfdbdc067)

with $\mathcal{R}_{\mathrm{spin\to metric}}$ defined in [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md#spinor-to-metric-compatibility-residual). This does not add spinor ontology to the metric. It states when fermion matter records are mature enough to be consumed by the metric constitutive map without importing weak handedness or spin as unexplained effective labels.

The same-record condition is part of the metric claim. A fermion stress channel cannot pass metric compatibility by combining one branch for inertial response, another branch for spinor closure, and a third branch for weak exposure; the retained row that supplies the ordered-frame spinor label must also satisfy the row-local gauge-control and angular-momentum residuals consumed by $\mathcal{R}_{\mathrm{spin\to metric}}$.

In the shared pullback notation, the stress-side consumer is $\Pi_{\mathrm{matter}}\mathcal L_\star(\theta;W,r_\star)$. The fermion metric row therefore fails if spinor closure, weak exposure, and matter response are sourced from different retained rows, even when each reduced row is individually well fitted.

## Noether Braid Deformation and Metric Language

For an admitted axisymmetric oblate branch, a Noether braid has a deformable exclusion envelope, the spatial region defined by its retained paths and wake response; see [Braid Envelope Geometry](../noether-braid/braid-envelope-geometry.md). This chapter does not identify that individual Noether braid envelope with the metric. The metric bridge uses many deforming Noether braids in the Noether sea, whose coarse variables determine clock, ruler, and signal behavior.

For a local comparison in which the cosmological-constant contribution is negligible, the translated Einstein-equation target is
$$
G_{\mu\nu}^{\mathrm{eff}}
=
\frac{8\pi G_{\mathrm{eff}}}{c_0^4}T_{\mu\nu}^{\mathrm{eff}}
$$

[View →](../../../../equation-mapping.html#poisson-einstein-weak-gravity)

Here $G_{\mu\nu}^{\mathrm{eff}}$ is the Einstein tensor constructed from $g_{\mu\nu}^{\mathrm{eff}}$, $G_{\mathrm{eff}}$ is the recovered Newton coupling, and $T_{\mu\nu}^{\mathrm{eff}}$ is the assembly and medium stress-energy tensor. The equation relates observer-level curvature to effective energy and stress. It supplies no curvature or stress variable for the Euclidean void, and its constitutive derivation remains open.

For a static axisymmetric comparison, oblate spheroidal coordinates can be a useful effective chart. A diagonal illustrative line element has the form
$$
ds^2
=
-f(\zeta,\vartheta)c_0^2dt_{\mathrm{eff}}^2
+g_1(\zeta,\vartheta)d\zeta^2
+g_2(\zeta,\vartheta)d\vartheta^2
+g_3(\zeta,\vartheta)d\phi^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-789ca5523b0e74cb)

Here $\zeta$ is a length coordinate and $\vartheta,\phi$ are dimensionless angles; $f,g_1$ are dimensionless and $g_2,g_3$ have length-squared units. Positive coefficients give the Lorentzian signature on a regular chart patch. These functions encode clock and ruler response. Rotating sources generally require a time-azimuth cross term, equivalently a nonzero ADM shift; this diagonal example does not describe frame dragging. The symbols $\zeta$ and $\vartheta$ do not rename the Noether braid envelope ratio $\xi$ or the mollifier width $\eta$. These coefficients are not primitive geometry. They are closure targets to be derived from Noether sea density, strain, alignment, and deformation.

The useful GR analogy is therefore limited but important:

- oblate coordinates help describe rotating or deformed effective sources,
- interior and exterior effective solutions around oblate bodies remain useful comparison targets,
- perturbative methods can capture small departures from spherical symmetry,
- and standard predictions such as redshift, Shapiro delay, lensing, orbital precession, frame-dragging, and gravitational-wave emission from deformed sources must be recovered from one reusable constitutive map.

The family-dependent envelope geometry and the conditions for an oblate reduction belong in [Braid Envelope Geometry](../noether-braid/braid-envelope-geometry.md). The spacetime claim that a population of deformed Noether braids yields an effective metric belongs here and in [PPN Parameters](ppn-parameters.md).

## Jacobson-Type Support: Metric as Equation of State

Jacobson's [*Thermodynamics of Spacetime: The Einstein Equation of State* (1995, arXiv:gr-qc/9504004)](https://arxiv.org/abs/gr-qc/9504004) derives an effective Einstein equation from local horizon equilibrium, entropy proportional to area, and a heat/temperature relation imposed in every null direction. An equation of state relates collective thermodynamic variables. This supplies a conditional comparison route; its assumptions still require derivation from the Noether sea.

That comparative point fits $\mathbb{A}\mathbb{A}\mathbb{A}$ cleanly:

- the Euclidean void and absolute time are fundamental background structure,
- the Noether sea is the relevant microstructure,
- and relativistic metric behavior is a long-wavelength thermodynamic recovery target for that microstructure.

On this reading, quantizing the effective metric directly is not the primary move. The primary move is to understand and simulate the microphysical medium well enough that GR-like geometry emerges as its coarse constitutive summary.

The spacetime-condensate comparison makes the same point in hydrodynamic language. If $g_{\mu\nu}^{\mathrm{eff}}$ is a collective variable, then a long-wavelength quantized-metric calculation is analogous to quantizing a collective mode. The missing microscopic question is the coarse-graining map
$$
\Pi_{\mathrm{hydro}}:
\left(
S(T),\mathcal{H}_{\Omega}^{W},\mathcal{N}_{\mathrm{sea}}
\right)
\longrightarrow
g_{\mu\nu}^{\mathrm{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-8e194ba5b53c70fa)

and the residual
$$
\mathcal{R}_{\mathrm{hydro}\to g}(\theta)
=
\frac{
\left\|
g_{\mu\nu}^{\mathrm{eff}}(\theta)
-
\Pi_{\mathrm{hydro}}[S(T),\mathcal{H}_{\Omega}^{W},\mathcal{N}_{\mathrm{sea}}]
\right\|
}{\epsilon_g}
$$

[View →](../../../../equation-mapping.html#corpus-equation-9f059dcb6bf2a033)

Here the first metric must be reconstructed from independent observer-channel data, while $\Pi_{\mathrm{hydro}}$ predicts a metric from retained microscopic data. Their norm requires the same fixed chart and a declared positive dimensionless component tolerance $\epsilon_g$. Using the same computed metric on both sides makes the residual identically zero and supplies no evidence for the constitutive map.

This does not license dismissing low-energy quantized-metric calculations. Donoghue's [*General Relativity as an Effective Field Theory: The Leading Quantum Corrections* (1994, arXiv:gr-qc/9405057)](https://arxiv.org/abs/gr-qc/9405057) separates unknown high-energy local terms from long-distance corrections determined by massless fields and their low-energy couplings. $\mathbb{A}\mathbb{A}\mathbb{A}$ should preserve that result as an observer-level recovery benchmark: the microscopic account may differ, but the weak-field constitutive record must reproduce the long-distance correction for the same recovered massless field content and low-energy couplings when its variables are coarse-grained into the effective metric description.

An entropy-based candidate may compare matter and geometry through a common functional. That is a possible comparison tool, not an additional mechanism or required external theory. Any entropy-based comparison must still project through the same Noether sea record that supplies $T_{\mu\nu}^{\mathrm{eff}}$, $g_{\mu\nu}^{\mathrm{eff}}$, horizon labels, and the effective dark-energy row; otherwise the entropy functional is only another fitted description.

This support is useful but limited. A Jacobson-style argument would explain why GR-like behavior is a natural equilibrium limit of many possible media, not why $\mathbb{A}\mathbb{A}\mathbb{A}$ is uniquely correct. The distinguishing burden therefore shifts to the departures from equilibrium, where the detailed Noether braid architecture should matter.

It also does not derive inertia by itself. A successful equation-of-state route can recover an effective Einstein equation while leaving open how a particular assembly acquires its inertial response, why accelerated and gradient-driven local records agree to equivalence-principle accuracy, and how the same Noether sea record fixes the mass-side response tensor. Those burdens remain with the mass, energy, Lorentz-closure, and Noether braid dynamics programs.

### Local-Horizon Recovery Target

The Jacobson comparison gives this chapter a sharper recovery target than the general phrase "metric as equation of state." In the standard argument, a local horizon patch is assigned a boost-energy flux $dQ$, an Unruh temperature $T_U$, and an entropy change $dS$ proportional to horizon area. The $\mathbb{A}\mathbb{A}\mathbb{A}$ translation cannot assume those quantities as substrate facts. It must derive their observer-level analogues from one Noether sea record, using the same clock, signal, stress, and finite-boundary data that later recover weak-field GR.

For a Physical Observer $O$, let $\partial\Omega$ denote a two-dimensional effective-horizon cut and $\mathscr H_{\partial\Omega}(W)$ its null history over a finite comparison window $W$. The record $\theta$ contains the Noether sea state and observer channels. The set $\mathcal B_{\partial\Omega}^{(O)}(\theta;W)$ consists of distinguishable classes of alternative retained boundary histories under the fixed finite-precision readout map in [Observer Framework](observer-framework.md#ontic-and-epistemic-levels); it is not the number of wake hits in one history. Restrict the counting candidate to a nonempty finite label set. The formula $S=k_B\log|\mathcal B|$ is a counting entropy; identifying it with the conditional statistical entropy requires a uniform label distribution. For nonuniform probabilities induced by the retained measure, that entropy is $-k_B\sum_b p_b\log p_b$ and equals the counting value only at uniform weights. Finiteness, weights, and their relation to horizon thermodynamics remain obligations.

The entropy and flux targets are
$$
dS_{\partial\Omega}^{(O)}(\theta)
=
d\left(
k_B\log\left|\mathcal{B}_{\partial\Omega}^{(O)}(\theta)\right|
\right),
\qquad
dQ_{\partial\Omega}^{(O)}(\theta)
=
\int_{\mathscr H_{\partial\Omega}(W)}
T_{\mu\nu}^{\mathrm{eff}}(\theta)\xi^\mu d\Sigma^\nu
$$

[View →](../../../../equation-mapping.html#corpus-equation-64e42d358483a2dd)

Here $\xi^\mu$ is the locally normalized approximate boost generator and $d\Sigma^\nu$ is the directed three-surface element on the null history. Choose its sign so $dQ$ is outward boost-energy flow from the observed side; use the same orientation and generator normalization for the entropy variation and temperature. Factors of $c_0$ in the flux convention are included so $dQ$ has energy units. The quantity $k_B$ is Boltzmann's entropy-to-energy-per-temperature conversion constant, used only at the observer level. A compact comparison residual is
$$
\mathcal{R}_{\mathrm{thermo}}(\theta)
=
\sup_{O,\partial\Omega}
\frac{
\left|
dQ_{\partial\Omega}^{(O)}(\theta)
-
T_U^{(O)}dS_{\partial\Omega}^{(O)}(\theta)
\right|
}{
\left|dQ_{\partial\Omega}^{(O)}(\theta)\right|
+
T_U^{(O)}
\left|dS_{\partial\Omega}^{(O)}(\theta)\right|
+
\varepsilon
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d67a57d835cabef0)

The positive denominator floor $\varepsilon$ has energy units; $T_U^{(O)}>0$ is required, and the supremum is over the declared family of local equilibrium patches, not arbitrary observers or singular horizons. The local-horizon target is $\mathcal{R}_{\mathrm{thermo}}(\theta)\le\epsilon_{\mathrm{thermo}}$ in the equilibrium weak-field comparison regime, with the same $\theta$ also passing the ADM/Cartan and PPN gates below. If the residual can be made small only by assigning independent entropy, temperature, and stress records to each patch, then the equation-of-state analogy has not become a native closure. A Jacobson-type derivation additionally needs a universal area-entropy coefficient, local horizon equilibrium with vanishing expansion and shear at the reference event, the effective null-focusing identity, and the observer-level conservation relation in every admitted null direction. A small finite-window residual alone proves none of these conditions.

The first proof scaffold is to make the boundary count, temperature, and flux three projections of the same record rather than three fitted fields. For a finite analysis window $W$, the boundary label count should satisfy
$$
\mathcal{N}_{\partial\Omega}^{(O)}(\theta;W)
=
\left|\mathcal{B}_{\partial\Omega}^{(O)}(\theta;W)\right|,
\qquad
S_{\partial\Omega}^{(O)}(\theta;W)
=
k_B\log\mathcal{N}_{\partial\Omega}^{(O)}(\theta;W)
$$

[View →](../../../../equation-mapping.html#corpus-equation-a239ed0104ddcef4)

The area-scaling target is not imposed as ontology. It is the recoverable limit
$$
\frac{\partial S_{\partial\Omega}^{(O)}}{\partial A_{\partial\Omega}^{\mathrm{eff}}}
\longrightarrow
\frac{k_B}{4A_{\text{align}}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-2e393a3764cb2c2b)

where $A_{\partial\Omega}^{\mathrm{eff}}$ is the observer-level patch area and $A_{\text{align}}$ is the alignment-area scale used in the black-hole entropy target. The local temperature comparison is
$$
T_U^{(O)}
=
\frac{\hbar a_O}{2\pi k_B c_0},
\qquad
a_O^2
=
g_{\mu\nu}^{\mathrm{eff}}a_O^\mu a_O^\nu
$$

[View →](../../../../equation-mapping.html#corpus-equation-cbe51d89696051e8)

Here $a_O^\mu=D^2x_O^\mu/d\tau_O^2$ is the observer's covariant four-acceleration, with $\tau_O$ its derived proper time, and $\hbar$ is the reduced Planck constant in this comparison. The magnitude is proper acceleration, not coordinate acceleration. Its time component vanishes in the observer's instantaneous orthonormal rest frame, where the norm reduces to a spatial sum of squares; using $\gamma_{ij}^{\mathrm{eff}}a_O^ia_O^j$ in an arbitrary chart omits the time component. The flux projection must then agree with the effective stress-energy flux computed from that record, and the local conservation residual
$$
\mathcal{R}_{E,\partial\Omega}^{(O)}(\theta;W)
=
\frac{
\left|\Delta E_{\Omega}^{(O)}(\theta;W)
+dQ_{\partial\Omega}^{(O)}(\theta;W)\right|
}{
\left|\Delta E_{\Omega}^{(O)}(\theta;W)\right|
+\left|dQ_{\partial\Omega}^{(O)}(\theta;W)\right|
+\varepsilon
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-6c3ae013b787a139)

must be small on the same windows. Here $\Delta E_\Omega^{(O)}$ is the change of the energy associated with the same boost current, and $dQ$ is its outward boundary flux; it is not an arbitrary laboratory-energy change. This two-term balance applies only when other boundary transfers, work, and the approximate generator's non-Killing contribution are negligible within the declared energy tolerance. For a symmetric conserved stress tensor, the remaining source term is $\nabla_\nu(T^{\mu\nu}\xi_\mu)=T^{\mu\nu}\nabla_{(\nu}\xi_{\mu)}$; outside the stated regime that term and every other boundary flux must enter the balance. Thus the local-horizon pass condition is not only $\mathcal{R}_{\mathrm{thermo}}\le\epsilon_{\mathrm{thermo}}$, but also $\mathcal{R}_{E,\partial\Omega}^{(O)}\le\epsilon_E$ and the weak-field ADM/Cartan gates for the same $\theta$. A concrete simulation protocol for this target is [Thermodynamic Residual](../validation/simulations/thermodynamic-residual.md).

#### Native Shared-Record Variation Target

Making the comparison record explicit is necessary for a derivation; it does not establish one. For a region $\Omega$, Physical Observer $O$, and finite analysis window $W$, use
$$
\theta_{\Omega,O,W}
=
\left(
\mathcal{H}_{\Omega}^{W},
\mathcal{B}_{\partial\Omega}^{(O)}(W),
\left.\mathcal{N}_{\mathrm{sea}}\right|_{\Omega,W},
O_W,
\Pi_{\mathrm{eff}},
\mu_{\Omega,\theta}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-06dc68db9ed9ded8)

Here $\mathcal{H}_{\Omega}^{W}$ is the retained path-history data on the window, $\mathcal{B}_{\partial\Omega}^{(O)}(W)$ is the set of distinguishable alternative boundary-history labels, $\left.\mathcal{N}_{\mathrm{sea}}\right|_{\Omega,W}$ is the locally resolved Noether sea state, $O_W$ is the observer's clock, ruler, and readout state on the window, $\Pi_{\mathrm{eff}}$ is the projection to the observer-level fields $(N,u^i_{\mathrm{sea,eff}},\gamma_{ij}^{\mathrm{eff}},T_{\mu\nu}^{\mathrm{eff}})$, and $\mu_{\Omega,\theta}$ is the conditional measure over unresolved deterministic histories. This tuple is not a new substrate object. It only names the record that must supply entropy, temperature, flux, and effective metric data together.

Let $\delta_\ell$ denote an admissible local-horizon perturbation that keeps the observer, window, projection map, and comparison regime fixed while varying the resolved Noether sea state and boundary flux through the patch. At finite precision the label count is discrete, so the differentials below require a controlled continuum or thermodynamic limit, with the same binning convention and averaging prescription across variations. They are not derivatives of an arbitrary finite cardinality. The recovery target is
$$
\delta_\ell
\log\left|
\mathcal{B}_{\partial\Omega}^{(O)}
\left(\theta_{\Omega,O,W}\right)
\right|
=
\frac{\delta_\ell A_{\partial\Omega}^{\mathrm{eff}}}{4A_{\text{align}}}
=
\frac{\delta_\ell Q_{\partial\Omega}^{(O)}}{k_B T_U^{(O)}}
+
\mathcal{O}(\epsilon_{\mathrm{local}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-bf180429d2f97e17)

Equivalently, $\delta_\ell Q_{\partial\Omega}^{(O)}=T_U^{(O)}\delta_\ell S_{\partial\Omega}^{(O)}+\mathcal{O}(k_B T_U^{(O)}\epsilon_{\mathrm{local}})$, with $S_{\partial\Omega}^{(O)}=k_B\log|\mathcal{B}_{\partial\Omega}^{(O)}|$. The error term collects declared local-gradient, finite-window, and record-coarse-graining residuals; it may not hide a second entropy record, a second stress record, or a separately tuned temperature.

The first proof step is to show that the logarithmic boundary-label count admits an area density on the observer-level horizon patch:
$$
\log\left|
\mathcal{B}_{\partial\Omega}^{(O)}
\left(\theta_{\Omega,O,W}\right)
\right|
=
\int_{\partial\Omega}
\sigma_{\mathrm{bw}}
\left(\theta_{\Omega,O,W};x_{\mathrm{eff}}\right)
dA_{\mathrm{eff}}(x_{\mathrm{eff}})
+
\mathcal{O}(\epsilon_{\mathrm{edge}}),
\qquad
\sigma_{\mathrm{bw}}
\longrightarrow
\frac{1}{4A_{\text{align}}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-12663a44df473f84)

in the equilibrium weak-field limit. The proof fails if the distinguishable boundary-wake count scales with unresolved interior volume or arbitrary history length after the effective area is fixed, if $T_U^{(O)}$ is not extracted from the same observer-channel acceleration that defines $A_{\partial\Omega}^{\mathrm{eff}}$, if $dQ_{\partial\Omega}^{(O)}$ uses a stress tensor not projected from $\theta_{\Omega,O,W}$, or if the same record cannot also satisfy weak-field ADM/Cartan recovery.

A more explicit reduction is the boundary-factorization theorem target. Let $\mathcal{P}_{\partial\Omega}$ be a patch decomposition of the observer-level horizon surface with
$$
A_{\mathrm{eff}}(P_a)
=
a_{\theta}A_{\text{align}}
+
\mathcal{O}(\epsilon_A A_{\text{align}}),
\qquad
P_a\in\mathcal{P}_{\partial\Omega}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d256e08e80a780a7)

where $a_{\theta}$ is the derived dimensionless patch-area normalization for the retained record. The coefficient cannot be interpreted as a literal independent one-patch count: $\log|\mathcal{L}_a|=1/4$ would require $|\mathcal{L}_a|=e^{1/4}$, not the cardinality of a finite set. The coherent target is an area-normalized block entropy density. For a connected patch block $\mathcal U\subseteq\mathcal{P}_{\partial\Omega}$, let $\mathcal{L}_{\mathcal U}(\theta_{\Omega,O,W})$ be the joint retained boundary-wake label set on $\mathcal U$ after fixing the observer record and the edge data to the accuracy declared by $\epsilon_{\mathrm{local}}$. The local aligned-label density is
$$
s_{\mathrm{align}}(\theta_{\Omega,O,W})
=
\lim_{|\mathcal U|\to\infty}
\frac{1}{|\mathcal U|}
\log\left|
\mathcal{L}_{\mathcal U}(\theta_{\Omega,O,W})
\right|
$$

[View →](../../../../equation-mapping.html#corpus-equation-cc5176b20f81a9de)

The displayed limit is shorthand for a compatible family of enlarged retained records and patch decompositions at fixed local intensive state; it cannot be taken inside one fixed finite $\theta_{\Omega,O,W}$. A local horizon application also needs scale separation: correlation length much smaller than the block size, and block size much smaller than the curvature and medium-variation scales. At fixed finite window it is a finite-block estimate with an explicit boundary error. The locality part of the theorem target is
$$
\log\left|
\mathcal{L}_{\mathcal U}(\theta_{\Omega,O,W})
\right|
=
|\mathcal U|\,s_{\mathrm{align}}(\theta_{\Omega,O,W})
+
\mathcal{O}\!\left(
|\partial\mathcal U|\epsilon_{\mathrm{corr}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-eda386d9c5d781c2)

Here $|\partial\mathcal U|$ counts edge patches, $\epsilon_{\mathrm{corr}}$ bounds their dimensionless entropy correction, and $|\partial\mathcal U|/|\mathcal U|\to0$ is required along the limit family. Uniform correlation control and a vanishing relative patch-area error are required to infer an area density; finite correlation language alone is not a factorization proof. The normalization part is then the aligned-label statement
$$
\frac{s_{\mathrm{align}}(\theta_{\Omega,O,W})}
{a_{\theta}}
\longrightarrow
\frac{1}{4}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f4026a3bc1a04553)

Together with $\sum_{P_a\in\mathcal{P}_{\partial\Omega}}A_{\mathrm{eff}}(P_a)\to A_{\partial\Omega}^{\mathrm{eff}}$, these claims imply the area density above. This does not prove the coefficient by definition. It reduces the problem to a local aligned-interface calculation: terminal orthogonal-axis three-binary alignment must supply a universal block entropy density, its patch-area normalization, and surrounding Noether sea correlations short-range enough that the boundary count is additive up to edge residuals.

## Refraction vs. Curvature

- From the **$\mathbb{U}_{\text{now}}$ universe-state perspective**:
  - Primitive causal-wake support is measured by Euclidean distances in $(X,Y,Z)$ on the absolute slice,
  - While effective ray paths and clock comparisons depend on an *effective speed* $c_{\text{eff}}(\mathbf X,T)$ set by the local Noether braid configuration: $c_{\text{eff}}(\mathbf X,T) < c_f \quad \text{in dense regions (near mass)}$ — the declared response-sign assumption of the weak-field branch, required for recovery rather than derived.
- From the **Physical Observer** (built from assemblies):
  - Light and free-falling matter appear to move along curved paths (geodesics) of an effective metric $g^{\text{eff}}_{\mu\nu}$.
  - Shapiro delay, light bending, and perihelion precession become **refractive-medium effects** rather than curvature of the void itself.

A flat-space refraction analogy is therefore useful only when it is kept at the correct level. A scalar $c_{\text{eff}}(\mathbf X,T)$ or scalar delay map can encode a first signal-path delay, but it is not by itself an effective metric. GR/PPN recovery requires the same Noether sea record to determine the observer-level lapse $N(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$, drift $u^i_{\mathrm{sea,eff}}(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$, coframe coefficients $e^a{}_i(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$, and spatial compliance $\gamma_{ij}^{\mathrm{eff}}(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$, so clock, ruler, and signal projections cannot be tuned as separate channels.

The constitutive task is to:

1. Specify the projection from native Noether sea fields into $g^{\text{eff}}_{\mu\nu}(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$:
   - $n(\mathbf X,T)$ (equivalently $\rho_{\text{NS}}(\mathbf X,T)$),
   - Stress/strain of the Noether sea,
   - Potential $\Phi_{\text{eff}}(\mathbf X,T)$ from matter assemblies.
2. Show that in the weak-field regime this reproduces the standard GR metric (e.g. Schwarzschild) to PPN accuracy: $g^{\text{eff}}_{00} \approx -\left(1 + \frac{2\Phi_N}{c_0^2}\right), \quad g^{\text{eff}}_{ij} \approx h_{ij}\left(1 - \frac{2\Phi_N}{c_0^2}\right).$

## Minimal Weak-Field Constitutive Map (for PPN Matching)

To make the mapping functional explicit at first post-Newtonian order, start in the local Noether sea rest gauge
$$
u^i_{\mathrm{sea,eff}}=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-ec70e479f1d935bd)

with observer-channel speed $c_0=c_{\text{eff}}(\infty)$ in the common calibration. The displayed stationary, spatially isotropic terms determine the leading weak-field clock and lensing coefficients; they do not include all 1PN source-current or nonlinear-potential terms. The weak-field target is
$$
N(x_{\mathrm{eff}}^k)
=
1+\frac{\Phi_N(x_{\mathrm{eff}}^k)}{c_0^2}
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-99240e6ba24f92ab)

$$
\gamma_{ij}^{\mathrm{eff}}(x_{\mathrm{eff}}^k)
=
\left(
1-2\gamma_{\mathrm{PPN}}\frac{\Phi_N(x_{\mathrm{eff}}^k)}{c_0^2}
\right)h_{ij}
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-c03f96afd2912f55)

Equivalently, using $x_{\mathrm{eff}}^0=c_0t_{\mathrm{eff}}$ in the observer-sector metric,
$$
g^{\text{eff}}_{00}(x_{\mathrm{eff}}^k)
=
-\left(1+\frac{2\Phi_N(x_{\mathrm{eff}}^k)}{c_0^2}\right)
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-b4f19dea6bc22a16)

$$
g^{\text{eff}}_{ij}(x_{\mathrm{eff}}^k)
=
\left(
1-2\gamma_{\mathrm{PPN}}\frac{\Phi_N(x_{\mathrm{eff}}^k)}{c_0^2}
\right)h_{ij}
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-423827ef9e7e6d38)

The native Noether sea delay factor remains
$$
\chi_{\text{sea}}(\mathbf X,T)\equiv \frac{c_f}{c_{\text{eff}}(\mathbf X,T)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-24f2d1e988b9a328)

In the stationary isotropic zero-shift chart, define $d\ell_h^2=h_{ij}dx_{\mathrm{eff}}^idx_{\mathrm{eff}}^j$. The null line element gives $dt_{\mathrm{eff}}=\sqrt{1-2\gamma_{\mathrm{PPN}}\Phi_N/c_0^2}\,d\ell_h/(Nc_0)$ to the stated order. Identifying this coordinate signal speed with the projected dressed channel is a shared-channel recovery condition. With that condition and a common reference calibration, PPN time-of-flight comparisons require
$$
\frac{c_0}{c_{\text{eff}}(x_{\mathrm{eff}}^k)}
=
\frac{\chi_{\text{sea}}(x_{\mathrm{eff}}^k)}{\chi_{\text{sea}}(\infty)}
=
1-(1+\gamma_{\mathrm{PPN}})\frac{\Phi_N(x_{\mathrm{eff}}^k)}{c_0^2}
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-27e8cb6647a21929)

so the coordinate travel time on a path $\Gamma$ expressed in the Euclidean reference chart is
$$
t_{\mathrm{eff}}[\Gamma]=\frac{1}{c_0}\int_\Gamma \frac{c_0}{c_{\text{eff}}(x_{\mathrm{eff}}^i)}\,d\ell_h
$$

[View →](../../../../equation-mapping.html#corpus-equation-365cb6acc6ef920c)

The integration measure is Euclidean reference length, not the null spacetime interval $ds_{\mathrm{eff}}$ or the compliance-weighted ruler length. For a first-order fixed-endpoint delay one may evaluate the perturbation along the unperturbed Euclidean path; recovering the bent ray requires extremizing the full path-time functional. These relations specify the first-order matching target
$$
(h_{ij},n,\chi_{\text{sea}},\Phi_{\text{eff}},\text{stress})
\mapsto
(N,u^i_{\mathrm{sea,eff}},e^a{}_i,\gamma_{ij}^{\mathrm{eff}})
\mapsto
g^{\text{eff}}_{\mu\nu}
$$

[View →](../../../../equation-mapping.html#corpus-equation-bddb3dd9e98a72b3)

with $\gamma_{\mathrm{PPN}}$ the observer-level refraction/spatial-compliance coefficient extracted from the same constitutive record whose Shapiro-delay and lensing projections are tested in [ppn-parameters](./ppn-parameters.md#explicit-weak-field-noether-sea-delay-map-ppn-gamma).

## Closure Program Interface (metric constitutive map)

This chapter is the constitutive anchor for the gravity-side closure:
$$
(h_{ij},n,\chi_{\text{sea}},\Phi_{\text{eff}},\text{stress})
\mapsto
(N,u^i_{\mathrm{sea,eff}},e^a{}_i,\gamma_{ij}^{\mathrm{eff}})
\mapsto
g^{\text{eff}}_{\mu\nu}
$$

[View →](../../../../equation-mapping.html#corpus-equation-bddb3dd9e98a72b3-2)

The complementary descriptions are:
- constitutive metric form and observer map: **this chapter**,
- explicit 1PN observables/estimators: [spacetime/ppn-parameters.md](./ppn-parameters.md),
- clock-law extraction and coefficient comparison: [spacetime/proper-time-and-time-dilation.md](./proper-time-and-time-dilation.md),
- final acceptance thresholds: [validation/constraint-ledger.md](../validation/constraint-ledger.md).

Minimal closure condition:
1. Eikonal path-time extremals in the refractive picture match null geodesics of $g^{\text{eff}}_{\mu\nu}$ in weak field.
2. The same $N$, $u^i_{\mathrm{sea,eff}}$, $e^a{}_i$, and $\gamma_{ij}^{\mathrm{eff}}$ coefficients predict Shapiro delay, lensing, redshift, weak-field acceleration, and preferred-frame residuals without re-fitting per observable.
3. The long-distance GR-EFT correction to weak gravity is recovered from the same constitutive record, without treating the effective metric as microscopic ontology.

A proposed recovery that supplies only $c_{\text{eff}}(x_{\mathrm{eff}}^i)$ or $\chi_{\text{sea}}(x_{\mathrm{eff}}^i)$ therefore closes only a refractive signal model. It becomes a metric recovery candidate only after that scalar row is embedded in one shared clock/ruler/signal map for $N$, $u^i_{\mathrm{sea,eff}}$, $e^a{}_i$, and $\gamma_{ij}^{\mathrm{eff}}$.

## Weak-Field Geodesic Handoff (ADM Constitutive Subclass)

A spatially conformal subclass, in which all ruler lengths receive the same local scale factor, additionally restricts the zero-shift metric to
$$
u^i_{\mathrm{sea,eff}}=0,
\qquad
\gamma_{ij}^{\mathrm{eff}}=\Omega^2(n,\lambda)h_{ij},
\qquad
N=\Omega(n,\lambda)\xi
$$

[View →](../../../../equation-mapping.html#corpus-equation-a513771b431dbf92)

Here $\Omega(n,\lambda)>0$ is the dimensionless spatial-compliance scale, and $\lambda=R_{\perp}/R_{\perp,0}>0$ is the transverse envelope scale relative to a declared reference. The shape ratio $\xi=R_{\parallel}/R_{\perp}>0$ belongs to the same admitted axisymmetric envelope reduction. Neither $\Omega=\lambda$ nor $N=\Omega\xi$ follows from choosing zero shift: the latter is an additional constitutive ansatz linking envelope geometry to the stationary clock rate. In the asymptotically calibrated subclass $N\to1$ and $\Omega\to1$, it requires $\xi\to1$, so it selects a spherical reference envelope; a general oblate rest branch requires its own reference-normalized map.

Define the clock-channel potential by the observer-side lapse:
$$
\Phi_{\text{eff}}(x_{\mathrm{eff}}^i)\equiv c_0^2\ln N(x_{\mathrm{eff}}^i)
=
c_0^2\ln\!\big(\Omega(x_{\mathrm{eff}}^i)\xi(x_{\mathrm{eff}}^i)\big),
\qquad
N(x_{\mathrm{eff}}^i)=e^{\Phi_{\text{eff}}(x_{\mathrm{eff}}^i)/c_0^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-773a465df978f1bd)

The $c_0^2$ prefactor calibrates the observer-sector potential. The weak homogeneous branch also requires agreement between $c_f$ and $c_0$ within its declared $O(\epsilon_{\mathrm{LV}}c_0)$ budget after both speeds are expressed in common units. Naming that residual does not show that it satisfies an observational bound; the clock/ruler calibration and preferred-frame tests remain part of the recovery.

With $x_{\mathrm{eff}}^0=c_0t_{\mathrm{eff}}$, the Noether sea rest-frame metric components are
$$
g^{\text{eff}}_{00}=-N^2,
\qquad
g^{\text{eff}}_{ij}=\Omega^2h_{ij}
$$

[View →](../../../../equation-mapping.html#corpus-equation-e49b881fd1df75f9)

This subclass turns the first-order shape response into a sharp geometry-side closure target. Matching the standard positive-potential PPN rows gives
$$
N
=
1-\frac{U}{c_0^2}
+O(c_0^{-4}),
\qquad
\Omega
=
1+\gamma_{\mathrm{PPN}}\frac{U}{c_0^2}
+O(c_0^{-4}).
$$

[View →](../../../../equation-mapping.html#corpus-equation-ac5b81fe5cacbd0e)

Because $N=\Omega\xi$, the same record must therefore satisfy
$$
\xi
=
1-(1+\gamma_{\mathrm{PPN}})\frac{U}{c_0^2}
+O(c_0^{-4}).
$$

[View →](../../../../equation-mapping.html#corpus-equation-c44d1eb4221c566e)

Thus $\gamma_{\mathrm{PPN}}=1$ is equivalent at first order to $\xi=1-2U/c_0^2+O(c_0^{-4})$ in this ADM subclass. The asymptotic condition is $\xi\to1$ as $U\to0$; it does not erase the first-order response that carries $\gamma_{\mathrm{PPN}}$. A native braid-envelope derivation of this response would determine $\gamma_{\mathrm{PPN}}$ rather than fit it.

For a stationary zero-shift metric, write $\partial^i=h^{ij}\partial_{x_{\mathrm{eff}}^j}$ for the Euclidean-reference gradient. The time-time connection component is
$$
\Gamma^i_{00}
=
-\frac{1}{2}g_{\text{eff}}^{ij}\partial_j g_{00}^{\text{eff}}
=
\xi^{2}\,\partial^i\ln(\Omega\xi)
=
\xi^{2}\frac{\partial^i\Phi_{\text{eff}}}{c_0^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-4ac6e5b928f6972f)

Since $x_{\mathrm{eff}}^0=c_0t_{\mathrm{eff}}$, its coordinate-time derivative is exactly $c_0$. At an instant with $\mathbf v=0$, the coordinate-time geodesic acceleration is exactly $-c_0^2\Gamma^i_{00}$. Retaining only this term for a slowly moving test assembly gives
$$
\frac{d^2x_{\mathrm{eff}}^i}{dt_{\mathrm{eff}}^2}
\approx
-\Gamma^i_{00}\left(\frac{dx_{\mathrm{eff}}^0}{dt_{\mathrm{eff}}}\right)^2
=
-\xi^{2}\partial^i\Phi_{\text{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-60769808bf61c478)

The exact zero-velocity term equals $-N^2(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_j\Phi_{\mathrm{eff}}$, since $N^2/\Omega^2=\xi^2$. At nonzero velocity the stationary zero-shift coordinate-time equation also contains $-\Gamma^i_{jk}v^jv^k+2v^iv^j\partial_j\ln N$. Consequently, on a smooth weak-field patch,
$$
\frac{d^2x_{\mathrm{eff}}^i}{dt_{\mathrm{eff}}^2}
=-(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}
+O\!\left(
|N^2-1|\,\left\|(\gamma_{\mathrm{eff}}^{-1})\nabla\Phi_{\text{eff}}\right\|_h
+\frac{\|\mathbf v\|_h^2}{L_{\mathrm{met}}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-f80bc28ba0203090)

where the metric-variation bound $L_{\mathrm{met}}$ controls the displayed connection and lapse-gradient terms. In the additional weak, slow limit $N,\Omega\to1$ and $\|\mathbf v\|_h^2/L_{\mathrm{met}}$ is negligible, giving the Newtonian acceleration $-h^{ij}\partial_j\Phi_N$ after potential matching.

PPN extraction for this constitutive subclass is defined canonically in [ppn-parameters](./ppn-parameters.md#ppn-parameters-and-the-euclidean-anchor), including the full $g_{00}$/$g_{ij}$ expansions, preferred-frame leakage map, and weak-field closure vector.

In that canonical map the exponential identity $N=e^{\Phi_{\mathrm{eff}}/c_0^2}$ fixes the quadratic coefficient only when the series is expressed in the constitutive potential $U_\Phi=-\Phi_{\mathrm{eff}}$. In the static isolated-source comparison where the remaining PPN potentials have their GR values or vanish, write $U_\Phi=U+D_2U^2/c_0^2+O(U^3/c_0^4)$. Then $\beta_{\mathrm{PPN}}=1-D_2$, so $\beta_{\mathrm{PPN}}=1$ requires $D_2=0$, equivalently $U_\Phi/c_0^2=U/c_0^2+O(U^3/c_0^6)$. That conversion is a constitutive obligation, not a consequence of the definition $\Phi_{\mathrm{eff}}=c_0^2\ln N$.
