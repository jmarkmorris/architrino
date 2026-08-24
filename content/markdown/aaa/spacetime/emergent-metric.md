# Emergent Metric

This chapter explains how metric language enters a theory whose substrate is not metric spacetime. The Euclidean void remains fixed. The Noether sea changes state inside it. The effective metric is the observer-level description extracted from clock, ruler, signal, and medium-response channels. This chapter says what that metric means, which medium variables are supposed to carry it, and what weak-field map has to be recovered before the spacetime branch can claim GR-level closure.

The opening fixes the ontological picture and the canonical symbols first. The later sections then move through equation-of-state support, refraction-versus-curvature language, weak-field constitutive maps, and closure interfaces.

The one-line map is: Noether sea record to clock, ruler, signal, and drift response; those responses to an effective metric; that effective metric to GR benchmark observables. Each arrow has to be earned. A metric that fits only one channel is not yet a spacetime recovery, because Physical Observers need one coherent effective geometry across clocks, photons, matter motion, and gravitational-wave channels.

## Absolute Frame vs. Effective Geometry

The spacetime branch keeps two descriptions separate. The absolute frame is the fixed bookkeeping structure of absolute time and Euclidean position; it supplies the substrate coordinates in which architrino path histories and Noether sea state are recorded. Effective geometry is the observer-level metric reconstructed from clocks, rulers, signal propagation, and medium response.

The bridge is therefore constitutive rather than ontological. A successful metric map must explain how the same Noether sea record produces lapse, spatial-compliance, drift, and signal-delay channels without treating the Euclidean void itself as curved.

## Ontological Picture

- **Substrate**: A fixed Euclidean 3D void with absolute time $T$. A chosen chart $(X,Y,Z)$ represents fixed void locations; the labels never move or curve.
- **Noether sea**: The [Noether sea](noether-sea.md), a pervasive population of coupled pro/anti Noether braids. The bridge term *spacetime medium* is used when translating toward effective spacetime language.
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

- $n(\mathbf X,T)$: normalized Noether braid density.
- $\rho_{\text{NS}}(\mathbf X,T)=\rho_{\text{NS},0}\,n(\mathbf X,T)$: physical Noether braid density.
- $\chi_{\text{sea}}(\mathbf X,T)=c_f/c_{\text{eff}}(\mathbf X,T)$: Noether sea delay factor.
- $c_0\equiv c_{\text{eff}}(\infty)$: asymptotic homogeneous observer-channel speed used in weak-field metric comparisons.
- $\Phi_{\text{eff}}(\mathbf X,T)$: constitutive potential inferred from the clock channel.
- $\Phi_N(\mathbf X,T)$: Newtonian benchmark potential used for weak-field matching.
- $U\equiv -\Phi_N>0$: positive weak-field PPN potential variable.
- $N(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$: observer-level lapse or clock-rate field reconstructed from Noether sea state.
- $u^i_{\mathrm{sea,eff}}(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$: Noether sea drift field in the observer-level bookkeeping map.
- $e^a{}_i(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$: spatial frame field carrying Noether sea compliance and orientation response.
- $\gamma_{ij}^{\mathrm{eff}}(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)=\delta_{ab}e^a{}_i e^b{}_j$: observer-level spatial compliance metric.
- $(\gamma_{\mathrm{eff}}^{-1})^{ij}$: inverse of the spatial compliance metric, defined by $(\gamma_{\mathrm{eff}}^{-1})^{ik}\gamma_{kj}^{\mathrm{eff}}=\delta^i{}_j$.

## What “Metric” Means Here

- **Effective metric $g^{\text{eff}}_{\mu\nu}(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$** is *not* a fundamental property of the void. It is a derived description of:
  - How assembly-based clocks tick,
  - How assembly-based rulers measure distances,
  - How photon-channel packets and gravitational-wave channels propagate through the Noether sea.

We define $g^{\text{eff}}_{\mu\nu}$ operationally:

> At each effective-chart point $(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$, choose an idealized Physical Observer (Noether braid clock + ruler), and infer a local metric from their measured time intervals and spatial separations.

The $\mathbb{U}_{\text{now}}$ universe-state perspective then maps substrate and medium data into observer-level ADM/Cartan fields:

$$
\big(h_{ij}, n, \chi_{\text{sea}}, \Phi_{\text{eff}}, \nabla\Phi_{\text{eff}}, \text{stress}, \text{alignment}\big)
\;\Rightarrow\;
\big(N,u^i_{\mathrm{sea,eff}},e^a{}_i,\gamma_{ij}^{\mathrm{eff}}\big)
\;\Rightarrow\;
g^{\text{eff}}_{\mu\nu}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-076993b73a4321c2)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-5396b604ccb5c746)

Thus ordinary density can be weakly visible to clocks and signal paths when it is integrated over planetary or stellar length scales, while meter-scale laboratory samples require much higher density or precision. The Earth core is thermally cold on a Planck-temperature comparison, but that fact is not the limiting variable for weak gravity. Its contribution to observer-level metric response comes from the rest-energy, pressure, stress, and exposed assembly ledger distributed over a large body, projected through the same Noether sea response map that supplies $\Phi_{\text{eff}}$, $\Gamma_N$, and $\chi_{\text{sea}}$.

A spherical-source sanity check keeps this point from collapsing into a temperature-gradient story. A hot or strongly excited medium region can have maximum scalar excitation near its center while the effective gravitational acceleration vanishes there by symmetry:
$$
\mathbf{a}_{\mathrm{eff}}(\mathbf{0})
=-\nabla\Phi_{\text{eff}}(\mathbf{0})
=\mathbf{0}.
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-61834399155d385e)
The constitutive variable that sources $\Phi_{\text{eff}}$ may therefore be an energy, stress, or RMS excitation record, but the force-like observer readout still comes from the spatial gradient of the shared effective potential. A model that equates gravity directly with "more temperature" fails this center-gradient check even before PPN coefficients are tested.

### Alternating-Flux Constitutive Candidate

One candidate route from assembly wakes to weak gravity is an RMS excitation law. If local causal-wake hits alternate in sign, direction, or branch provenance, the mean signed acceleration can cancel while the quadratic excitation of the Noether sea remains:
$$
\Phi_{\mathrm{eff}}^\theta(\mathbf X,T)
\propto
\mathcal{K}_{\mathrm{sea}}
\left\langle
\left(\sum_s q_s A_s(\mathbf X,T)\right)^2
\right\rangle_{\Delta T}^{1/2}.
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-28ee266019bf0cc0)
Here $\theta$ labels the shared candidate record being tested, $A_s$ denotes the branch-resolved wake amplitude from source segment $s$ — defined on the same retained causal root as the branch law and carrying the same-record transmitter-side acceleration weight and inverse-square factor $W^{\mathrm{acc}}_s/r_s^2$, not a bare $1/r$ or root-independent amplitude — and $\mathcal{K}_{\mathrm{sea}}$ is a constitutive response coefficient to be derived, not fitted independently. The route is useful only if the same averaged excitation also supplies the lapse, spatial-compliance, lensing, Shapiro, and PPN rows.

Because the RMS factor is non-negative, the attractive weak-field branch requires a declared negative sign: $\mathcal K_{\mathrm{sea}}<0$ in the convention $\Phi_{\mathrm{eff}}=c_0^2\ln N<0$ near an ordinary mass source. Increasing the shared RMS excitation must then make $\Phi_{\mathrm{eff}}$ more negative monotonically on that branch. Without this sign and monotonicity condition, the candidate does not determine even the direction of the recovered weak-field acceleration.

## ADM/Cartan Reconstruction Surface

This chapter owns the ADM/Cartan reconstruction surface consumed by the observer-record map in [Observer Framework](observer-framework.md#boundary-wake-covariance-scaffold) and by neighboring dynamics chapters. The observer-level line element target is

$$
ds_{\mathrm{eff}}^2
=
-N^2c_0^2dt_{\mathrm{eff}}^2
+
\gamma_{ij}^{\mathrm{eff}}
\left(dx_{\mathrm{eff}}^i-u^i_{\mathrm{sea,eff}}dt_{\mathrm{eff}}\right)
\left(dx_{\mathrm{eff}}^j-u^j_{\mathrm{sea,eff}}dt_{\mathrm{eff}}\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#effective-metric-adm-cartan)

Here $N$ is the clock-rate or lapse channel, $u^i_{\mathrm{sea,eff}}$ is medium drift, and $\gamma_{ij}^{\mathrm{eff}}$ is the spatial compliance channel built from the frame field $e^a{}_i$. In the GR-matching regime the effective connection is the Levi-Civita connection of $g^{\text{eff}}_{\mu\nu}$; torsion, nonmetricity, birefringence, dispersion, and preferred-frame leakage are deviation observables rather than substrate ontology.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-4fc11cc78bbfa139)
with $A$, $B_{ij}$, and $u^i_{\mathrm{sea,eff}}$ read from the same retained Noether sea state and Physical Observer record. In the local Noether sea rest frame, the photon-channel null condition $d\tau^2=0$ gives
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-6e00dbc328030441)
The weak homogeneous observer branch requires
$$
A\to1,
\qquad
B_{ij}\to\delta_{ij},
\qquad
u^i_{\mathrm{sea,eff}}\to0
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-a560a0adc81e6f64)
This is a constitutive equation, not a new fundamental four-dimensional metric on absolute timespace. Every weak-field expansion about this branch is additionally conditional on the homogeneous quiescent Noether sea being an equilibrium of the constitutive dynamics; that equilibrium predicate is an open closure item of the [Noether sea program](noether-sea.md), and the expansions below inherit it rather than establish it.

As a form-level recovery, the same handoff already has the correct weak-field clock shape once the clock-channel potential has been matched to the Newtonian benchmark. In a weak, slow comparison window,
$$
\frac{d\tau_{\mathcal A}}{dt_{\mathrm{eff}}}
\approx
1-\frac{U}{c_0^2}
-\frac{\|\mathbf w\|^2}{2c_0^2},
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-686bee199bdbc652)
where $U\ge0$ is the positive Newtonian potential declared above and $\mathbf w$ is the clock drift through the local Noether sea. This reproduces the Newtonian-limit clock relation and the standard $g_{00}$ first-order structure as a comparison form. It is not yet coefficient-level GR closure: $\Phi_{\mathrm{eff}}=\Phi_N$, $G_{\mathrm{eff}}$, and any Einstein-equation analogue must still be derived from the same Noether sea response record that supplies $A$, $B_{ij}$, $c_{\text{eff}}$, and the photon channel.

The retained weak-field coefficient map should therefore be expressed at the ADM/Cartan level before observable projections are evaluated. With
$$
\delta n\equiv n-1,\qquad
\delta\chi\equiv\frac{\chi_{\text{sea}}}{\chi_{\text{sea}}(\infty)}-1,
\qquad
\varphi\equiv\frac{\Phi_{\text{eff}}}{c_0^2}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-3998b52bba7dc3d0)
and with $\Sigma^{\mathrm{tf}}_{\text{sea},ij}$ the retained trace-free Noether sea stress projection, the minimal coefficient scaffold is
$$
N
=
1
+A_N^n\delta n
+A_N^\chi\delta\chi
+A_N^\Phi\varphi
+Q_N(\delta n,\delta\chi,\varphi,\Sigma_{\text{sea}}^{\mathrm{tf}})
+O(c_0^{-6},\epsilon_{\mathrm{LV}})
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-2167007e26378c1d)
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
+O(c_0^{-4},\epsilon_{\mathrm{LV}})
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-36fc405532a4696e)
$$
u^i_{\mathrm{sea,eff}}
=
D_U w^i\frac{U}{c_0^2}
+D_{\mathrm{aniso}} w^j\frac{U^i{}_j}{c_0^2}
+O(c_0^{-5},\epsilon_{\mathrm{LV}}),
\qquad
\gamma_{ij}^{\mathrm{eff}}=\delta_{ab}e^a{}_i e^b{}_j
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-b8321393ecb536b5)
Here $w^i$ is the Noether sea drift relative to the comparison frame, $D_U$ and $D_{\mathrm{aniso}}$ are the isotropic and anisotropic drift-response coefficients, $U$ is the positive PPN potential, and $U^i{}_j$ is its standard anisotropic potential tensor. These are not new substrate fields. They are coefficient rows for the observer-level reconstruction. Redshift, Shapiro delay, lensing, weak-field acceleration, and preferred-frame residuals must read from these rows as one shared constitutive record. The coefficient dictionary to $(\gamma_{\mathrm{PPN}},C_2^{(U)},\Xi_1,\ldots,\Xi_4)$ is given in [PPN Parameters](./ppn-parameters.md#admcartan-extraction-equations).

A practical consistency check is that those channels must be projections of one shared record of the Noether sea and the Physical Observer, not independently tuned descriptions. For an observation window $W$, let $\theta$ collect the retained Noether sea state, source assemblies, observer clock/ruler state, signal-channel record, apparatus calibration, and boundary wake data. Let
$$
\Pi_{\mathrm{clk}}\theta,\qquad
\Pi_{\mathrm{rul}}\theta,\qquad
\Pi_{\mathrm{sig}}\theta
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-aae5b2ebd004d717)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-e4e8cdc584bd10dc)
Here $\Sigma_W$ is the declared benchmark covariance, $\alpha_i$ are the preferred-frame parameters, and $\mathcal{S}_{\mathrm{retune}}(\theta)$ records whether separate parameter choices were used to pass different channels. The closure condition is
$$
\mathcal{R}_{\mathrm{metric}}(\theta;W)\le\epsilon_{\mathrm{metric}},
\qquad
\mathcal{S}_{\mathrm{retune}}(\theta)=0
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-dc56bc079251de78)
The point is not to add a new spacetime ontology. It is to require the effective metric to behave as one constitutive summary of the same Noether sea state and observer record across clocks, rulers, signal propagation, and weak-field gravitational tests.

### Geodesic and Lensing Recovery Benchmarks

The effective metric map must also recover the two standard variational benchmarks consumed by orbital, clock, and light-propagation tests. For timelike records,
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#geodesic-proper-time-action)

and extremizing this observer-level action must give the same weak-field acceleration contribution used in the PPN bundle,
$$
\frac{d^2x_{\mathrm{eff}}^i}{dt_{\mathrm{eff}}^2}
=
-(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}
+O(c_0^{-2})
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-a35d6c93159ee4b3)
For null signal records,
$$
g^{\text{eff}}_{\mu\nu}dx_{\mathrm{eff}}^\mu dx_{\mathrm{eff}}^\nu=0
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#photon-null-eikonal)

must match the eikonal path-time extremal of the Noether sea signal channel. In the point-mass weak-field limit, the recovered deflection target is
$$
\Delta\theta
=
2(1+\gamma_{\mathrm{PPN}})
\frac{GM}{b\,c_0^2}
+O(c_0^{-4})
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#shapiro-lensing-ppn)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-93c0079533adc34e)

Massive slow probes read the dynamical potential $\Phi_{\mathrm{dyn}}$, while weak lensing reads the Weyl combination

$$
\Phi_{\mathrm{lens}}
=
\frac{\Phi_{\mathrm{dyn}}+\Psi_{\mathrm{sp}}}{2}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-1065484b1bf719c3)

The equality target is therefore

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-26f4bcea5c297eff)

equivalently $\gamma_{\mathrm{PPN}}\equiv\Psi_{\mathrm{sp}}/\Phi_{\mathrm{dyn}}\to1$ in the weak-field lensing regime. A scalar force or medium-response correction that appears only in the clock/lapse channel accelerates matter but under-deflects light. A valid $\mathbb{A}\mathbb{A}\mathbb{A}$ response must project the same Noether sea state into the lapse and spatial-compliance channels so that rotation curves, hydrostatic mass, time delay, and lensing consume one effective metric.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-ab2a6181d314c2da)

This residual belongs to the effective-metric closure program, not to dark-sector ontology by itself. It is the condition that lets a medium-response explanation of galaxy or cluster dynamics remain compatible with the same lensing map.

### Matter-Channel Compatibility Target

The same shared-record rule applies to the effective matter channels whose observations test the metric. The retained comparison lesson from matter-first gravity programs is not that their ontology should be imported, but that predictive matter dynamics and observer-level geometry cannot be chosen independently. In this framework, the matter channel, clock channel, ruler channel, and signal channel must remain projections of the same Noether sea record $\theta$.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-34c260c43d4c592a)
where $\mathcal{R}_{\mathrm{Cauchy}}^{(r)}$ records failure of the declared channel to share the predictive Cauchy evolution used by the same observer-level metric record. In the validated weak homogeneous photon regime, this residual includes the requirement that the two physical polarization branches share the same free-space characteristic cone up to the birefringence tolerance routed through [Failure Criteria](../validation/failure-criteria.md#operational-null-result-ledger).

This remains a closure target rather than substrate ontology. If $\mathcal{R}_{\mathrm{char}}$ is small only because the photon, clock, ruler, or stress channels use different fitted records, the metric has not been recovered as a constitutive output of the Noether sea.

For fermion matter channels, the compatibility burden inherits the spinor ledger. The effective metric may summarize the matter channel only after the ordered-frame spinor target, the effective spin-operator record, and weak-coupling-triad exposure are supplied by the same branch record. In compact form,
$$
\mathcal{R}_{\mathrm{metric}}^{\mathrm{fermion}}(\theta;W)
=
\mathcal{R}_{\mathrm{metric}}(\theta;W)
+\lambda_{\mathrm{s2m}}
\mathcal{R}_{\mathrm{spin\to metric}}(\theta;W)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-aaab9d9dfdbdc067)
with $\mathcal{R}_{\mathrm{spin\to metric}}$ defined in [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md#spinor-to-metric-compatibility-residual). This does not add spinor ontology to the metric. It states when fermion matter records are mature enough to be consumed by the metric constitutive map without importing weak handedness or spin as unexplained effective labels.

The same-record condition is part of the metric claim. A fermion stress channel cannot pass metric compatibility by combining one branch for inertial response, another branch for spinor closure, and a third branch for weak exposure; the retained row that supplies the ordered-frame spinor label must also satisfy the row-local gauge-control and angular-momentum residuals consumed by $\mathcal{R}_{\mathrm{spin\to metric}}$.

In the shared pullback notation, the stress-side consumer is $\Pi_{\mathrm{matter}}\mathcal L_\star(\theta;W,r_\star)$. The fermion metric row therefore fails if spinor closure, weak exposure, and matter response are sourced from different retained rows, even when each reduced row is individually well fitted.

## Noether Braid Deformation and Metric Language

At the assembly level, an individual Noether braid has an oblate, deformable exclusion envelope; see [Braid Envelope Geometry](../noether-braid/braid-envelope-geometry.md). This chapter does not identify that individual Noether braid envelope with the metric. The metric bridge uses many deforming Noether braids in the Noether sea, whose coarse variables determine clock, ruler, and signal behavior.

When translating toward General Relativity, Einstein's field equations first appear as the standard comparison form
$$
G_{\mu\nu} = \frac{8\pi G}{c^4}T_{\mu\nu}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#poisson-einstein-weak-gravity)

not as substrate curvature of the Euclidean void. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ weak-field translation, the speed slot is supplied by the recovered homogeneous observer-channel speed $c_0$, the right-hand side is interpreted through matter assemblies and Noether sea stress, and the left-hand side is the observer-level metric summary reconstructed from clock, ruler, and signal channels.

For axially symmetric or rotating sources, oblate spheroidal coordinates can be a useful effective chart. A representative line element has the form
$$
ds^2
=
-f(\zeta,\vartheta)c_0^2dt_{\mathrm{eff}}^2
+g_1(\zeta,\vartheta)d\zeta^2
+g_2(\zeta,\vartheta)d\vartheta^2
+g_3(\zeta,\vartheta)d\phi^2
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-789ca5523b0e74cb)
where $(\zeta,\vartheta,\phi)$ are local effective-chart coordinates, and $f,g_1,g_2,g_3$ encode the observer-level response of clocks, rulers, and signal paths. The symbols $\zeta$ and $\vartheta$ do not rename the Noether braid envelope ratio $\xi$ or the mollifier width $\eta$. These coefficients are not primitive geometry. They are closure targets to be derived from Noether sea density, strain, alignment, and deformation.

The useful GR analogy is therefore limited but important:

- oblate coordinates help describe rotating or deformed effective sources,
- interior and exterior effective solutions around oblate bodies remain useful comparison targets,
- perturbative methods can capture small departures from spherical symmetry,
- and standard predictions such as redshift, Shapiro delay, lensing, orbital precession, frame-dragging, and gravitational-wave emission from deformed sources must be recovered from one reusable constitutive map.

The assembly fact that a Noether braid is oblate belongs in [Braid Envelope Geometry](../noether-braid/braid-envelope-geometry.md). The spacetime claim that a population of deformed Noether braids yields an effective metric belongs here and in [PPN Parameters](ppn-parameters.md).

## Jacobson-Type Support: Metric as Equation of State

This Noether sea-first picture is paralleled by the general Jacobson-style lesson: Einstein equations are plausibly an **equation of state** for an underlying microscopic system rather than substrate-level laws of the void itself.

That comparative point fits $\mathbb{A}\mathbb{A}\mathbb{A}$ cleanly:

- the Euclidean void and absolute time are fundamental background structure,
- the Noether sea is the relevant microstructure,
- and relativistic metric behavior is the long-wavelength thermodynamic closure of that microstructure.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-8e194ba5b53c70fa)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-9f059dcb6bf2a033)
This residual is not a new gate; it states the existing constitutive burden in a form that separates collective-mode recovery from microscopic derivation.

This does not license dismissing low-energy quantized-metric calculations. In the long-distance regime, the effective-field-theory treatment of GR separates unknown high-energy local terms from calculable infrared corrections. $\mathbb{A}\mathbb{A}\mathbb{A}$ should preserve that result as an observer-level recovery benchmark: the microscopic account may differ, but the weak-field constitutive record must reproduce the same long-distance quantum correction when its variables are coarse-grained into the effective metric description.

Relative-entropy gravity proposals add a useful comparison pressure here. They place a matter/geometry mismatch functional at the action level and then ask for Einstein behavior, dark-energy-like terms, and horizon-area behavior as consequences of one variational record. In this chapter that is a benchmark discipline, not a mechanism to import. Any entropy-based comparison must still project through the same Noether sea record that supplies $T_{\mu\nu}^{\mathrm{eff}}$, $g_{\mu\nu}^{\mathrm{eff}}$, horizon labels, and the effective dark-energy row; otherwise the entropy functional is only another fitted description.

This support is useful but limited. A Jacobson-style argument would explain why GR-like behavior is a natural equilibrium limit of many possible media, not why $\mathbb{A}\mathbb{A}\mathbb{A}$ is uniquely correct. The distinguishing burden therefore shifts to the departures from equilibrium, where the detailed Noether braid architecture should matter.

It also does not derive inertia by itself. A successful equation-of-state route can recover an effective Einstein equation while leaving open how a particular assembly acquires its inertial response, why accelerated and gradient-driven local records agree to equivalence-principle accuracy, and how the same Noether sea record fixes the mass-side response tensor. Those burdens remain with the mass, energy, Lorentz-closure, and Noether braid dynamics programs.

### Local-Horizon Recovery Target

The Jacobson comparison gives this chapter a sharper recovery target than the general phrase "metric as equation of state." In the standard argument, a local horizon patch is assigned a boost-energy flux $dQ$, an Unruh temperature $T_U$, and an entropy change $dS$ proportional to horizon area. The $\mathbb{A}\mathbb{A}\mathbb{A}$ translation cannot assume those quantities as substrate facts. It must derive their observer-level analogues from one Noether sea record, using the same clock, signal, stress, and finite-boundary data that later recover weak-field GR.

For a Physical Observer $O$ and a small effective-horizon patch $\partial\Omega$, let $\theta$ denote the shared Noether sea state and observer-channel record. Let $\mathcal{B}_{\partial\Omega}^{(O)}(\theta)$ be the observer-accessible boundary-wake label set induced by the finite-boundary data in [Observer Framework](observer-framework.md#ontic-and-epistemic-levels). A compact thermodynamic comparison residual is
$$
dS_{\partial\Omega}^{(O)}(\theta)
=
d\left(
k_B\log\left|\mathcal{B}_{\partial\Omega}^{(O)}(\theta)\right|
\right),
\qquad
dQ_{\partial\Omega}^{(O)}(\theta)
=
\int_{\partial\Omega}
T_{\mu\nu}^{\mathrm{eff}}(\theta)\xi^\mu d\Sigma^\nu
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-64e42d358483a2dd)
and
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-d67a57d835cabef0)

The local-horizon gate is $\mathcal{R}_{\mathrm{thermo}}(\theta)\le\epsilon_{\mathrm{thermo}}$ in the equilibrium weak-field comparison regime, with the same $\theta$ also passing the ADM/Cartan and PPN gates below. If the residual can be made small only by assigning independent entropy, temperature, and stress records to each patch, then the equation-of-state analogy has not become a native closure. If it can be made small for all local horizon patches while local observer-level conservation holds, the Jacobson route supplies a proof scaffold for recovering an effective Einstein equation without treating the Euclidean void as curved.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-a239ed0104ddcef4)
The area-scaling target is not imposed as ontology. It is the recoverable limit
$$
\frac{\partial S_{\partial\Omega}^{(O)}}{\partial A_{\partial\Omega}^{\mathrm{eff}}}
\longrightarrow
\frac{k_B}{4A_{\text{align}}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-2e393a3764cb2c2b)
where $A_{\partial\Omega}^{\mathrm{eff}}$ is the observer-level patch area and $A_{\text{align}}$ is the alignment-area scale used in the black-hole entropy target. The local temperature comparison is
$$
T_U^{(O)}
=
\frac{\hbar a_O}{2\pi k_B c_0},
\qquad
a_O^2
=
\gamma_{ij}^{\mathrm{eff}}a_O^i a_O^j
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-cbe51d89696051e8)
with $a_O^i$ extracted from the same observer-channel metric record. The flux projection must then agree with the effective stress-energy flux computed from that record, and the local conservation residual
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-6c3ae013b787a139)
must be small on the same windows. Thus the local-horizon pass condition is not only $\mathcal{R}_{\mathrm{thermo}}\le\epsilon_{\mathrm{thermo}}$, but also $\mathcal{R}_{E,\partial\Omega}^{(O)}\le\epsilon_E$ and the weak-field ADM/Cartan gates for the same $\theta$. A concrete simulation protocol for this target is [Thermodynamic Residual](../validation/simulations/thermodynamic-residual.md).

#### Native Shared-Record Variation Target

The residual above becomes a derivation only after the comparison record is made explicit. For a region $\Omega$, Physical Observer $O$, and finite analysis window $W$, use
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-06dc68db9ed9ded8)
Here $\mathcal{H}_{\Omega}^{W}$ is the retained path-history data on the window, $\mathcal{B}_{\partial\Omega}^{(O)}(W)$ is the observer-accessible boundary-wake record, $\left.\mathcal{N}_{\mathrm{sea}}\right|_{\Omega,W}$ is the locally resolved Noether sea state, $O_W$ is the observer's clock, ruler, and readout state on the window, $\Pi_{\mathrm{eff}}$ is the projection to the observer-level fields $(N,u^i_{\mathrm{sea,eff}},\gamma_{ij}^{\mathrm{eff}},T_{\mu\nu}^{\mathrm{eff}})$, and $\mu_{\Omega,\theta}$ is the conditional measure over unresolved deterministic histories. This tuple is not a new substrate object. It only names the record that must supply entropy, temperature, flux, and effective metric data together.

Let $\delta_\ell$ denote an admissible local-horizon perturbation that keeps the observer, window, projection map, and comparison regime fixed while varying the resolved Noether sea state and boundary flux through the patch. The native closure target is
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-bf180429d2f97e17)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-12663a44df473f84)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-d256e08e80a780a7)
where $a_{\theta}$ is the derived dimensionless patch-area normalization for the retained record. The coefficient cannot be interpreted as a literal independent one-patch count: $\log|\mathcal{L}_a|=1/4$ would require $|\mathcal{L}_a|=e^{1/4}$, not the cardinality of a finite set. The coherent target is an area-normalized block entropy density. For a connected patch block $U\subseteq\mathcal{P}_{\partial\Omega}$, let $\mathcal{L}_U(\theta_{\Omega,O,W})$ be the joint retained boundary-wake label set on $U$ after fixing the observer record and the edge data to the accuracy declared by $\epsilon_{\mathrm{local}}$. The local aligned-label density is
$$
s_{\mathrm{align}}(\theta_{\Omega,O,W})
=
\lim_{|U|\to\infty}
\frac{1}{|U|}
\log\left|
\mathcal{L}_U(\theta_{\Omega,O,W})
\right|
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-cc5176b20f81a9de)
when the limit exists after boundary corrections. The locality part of the theorem target is
$$
\log\left|
\mathcal{L}_U(\theta_{\Omega,O,W})
\right|
=
|U|\,s_{\mathrm{align}}(\theta_{\Omega,O,W})
+
\mathcal{O}\!\left(
|\partial U|\epsilon_{\mathrm{corr}}
\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-eda386d9c5d781c2)
where the correction records edge and finite-correlation effects between adjacent patches. The normalization part is then the aligned-label statement
$$
\frac{s_{\mathrm{align}}(\theta_{\Omega,O,W})}
{a_{\theta}}
\longrightarrow
\frac{1}{4}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f4026a3bc1a04553)
Together with $\sum_{P_a\in\mathcal{P}_{\partial\Omega}}A_{\mathrm{eff}}(P_a)\to A_{\partial\Omega}^{\mathrm{eff}}$, these claims imply the area density above. This does not prove the coefficient by definition. It reduces the problem to a local aligned-interface calculation: terminal Family-A alignment must supply a universal block entropy density, its patch-area normalization, and surrounding Noether sea correlations short-range enough that the boundary count is additive up to edge residuals.

## Refraction vs. Curvature

- From the **$\mathbb{U}_{\text{now}}$ universe-state perspective**:
  - Primitive causal-wake support is measured by Euclidean distances in $(X,Y,Z)$ on the absolute slice,
  - While effective ray paths and clock comparisons depend on an *effective speed* $c_{\text{eff}}(\mathbf X,T)$ set by the local Noether braid configuration: $c_{\text{eff}}(\mathbf X,T) < c_f \quad \text{in dense regions (near mass)}$ — the declared response-sign assumption of the weak-field branch, required for recovery rather than derived.
- From the **Physical Observer** (built from assemblies):
  - Light and free-falling matter appear to move along curved paths (geodesics) of an effective metric $g^{\text{eff}}_{\mu\nu}$.
  - Shapiro delay, light bending, and perihelion precession become **refractive-medium effects** rather than curvature of the void itself.

A flat-space refraction analogy is therefore useful only when it is kept at the correct level. A scalar $c_{\text{eff}}(\mathbf X,T)$ or scalar delay map can encode a first signal-path delay, but it is not by itself an effective metric. GR/PPN recovery requires the same Noether sea record to determine the observer-level lapse $N(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$, drift $u^i_{\mathrm{sea,eff}}(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$, frame field $e^a{}_i(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$, and spatial compliance $\gamma_{ij}^{\mathrm{eff}}(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)$, so clock, ruler, and signal projections cannot be tuned as separate channels.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-ec70e479f1d935bd)
with observer-channel speed $c_0=c_{\text{eff}}(\infty)$. The weak-field target is
$$
N(x_{\mathrm{eff}}^k)
=
1+\frac{\Phi_N(x_{\mathrm{eff}}^k)}{c_0^2}
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-99240e6ba24f92ab)
$$
\gamma_{ij}^{\mathrm{eff}}(x_{\mathrm{eff}}^k)
=
\left(
1-2\gamma_{\mathrm{PPN}}\frac{\Phi_N(x_{\mathrm{eff}}^k)}{c_0^2}
\right)h_{ij}
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-c03f96afd2912f55)

Equivalently, using $x_{\mathrm{eff}}^0=c_0t_{\mathrm{eff}}$ in the observer-sector metric,
$$
g^{\text{eff}}_{00}(x_{\mathrm{eff}}^k)
=
-\left(1+\frac{2\Phi_N(x_{\mathrm{eff}}^k)}{c_0^2}\right)
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-b4f19dea6bc22a16)
$$
g^{\text{eff}}_{ij}(x_{\mathrm{eff}}^k)
=
\left(
1-2\gamma_{\mathrm{PPN}}\frac{\Phi_N(x_{\mathrm{eff}}^k)}{c_0^2}
\right)h_{ij}
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-423827ef9e7e6d38)

The native Noether sea delay factor remains
$$
\chi_{\text{sea}}(\mathbf X,T)\equiv \frac{c_f}{c_{\text{eff}}(\mathbf X,T)}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-24f2d1e988b9a328)
After projection into the effective chart, PPN time-of-flight comparisons normalize by the homogeneous observer speed:
$$
\frac{c_0}{c_{\text{eff}}(x_{\mathrm{eff}}^k)}
=
\frac{\chi_{\text{sea}}(x_{\mathrm{eff}}^k)}{\chi_{\text{sea}}(\infty)}
=
1-(1+\gamma_{\mathrm{PPN}})\frac{\Phi_N(x_{\mathrm{eff}}^k)}{c_0^2}
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-27e8cb6647a21929)
so travel time on a Euclidean anchor path $\Gamma$ is
$$
t_{\mathrm{eff}}[\Gamma]=\frac{1}{c_0}\int_\Gamma \frac{c_0}{c_{\text{eff}}(x_{\mathrm{eff}}^i)}\,ds_{\mathrm{eff}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-365cb6acc6ef920c)

This is the concrete first-order realization of
$$
(h_{ij},n,\chi_{\text{sea}},\Phi_{\text{eff}},\text{stress})
\mapsto
(N,u^i_{\mathrm{sea,eff}},e^a{}_i,\gamma_{ij}^{\mathrm{eff}})
\mapsto
g^{\text{eff}}_{\mu\nu}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-bddb3dd9e98a72b3)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-bddb3dd9e98a72b3-2)

Distribute proof obligations as:
- constitutive metric form and observer map: **this chapter**,
- explicit 1PN observables/estimators: [spacetime/ppn-parameters.md](./ppn-parameters.md),
- clock-law extraction and coefficient fitting: [spacetime/proper-time-and-time-dilation.md](./proper-time-and-time-dilation.md),
- final acceptance thresholds: [validation/constraint-ledger.md](../validation/constraint-ledger.md).

Minimal closure condition:
1. Eikonal path-time extremals in the refractive picture match null geodesics of $g^{\text{eff}}_{\mu\nu}$ in weak field.
2. The same $N$, $u^i_{\mathrm{sea,eff}}$, $e^a{}_i$, and $\gamma_{ij}^{\mathrm{eff}}$ coefficients predict Shapiro delay, lensing, redshift, weak-field acceleration, and preferred-frame residuals without re-fitting per observable.
3. The long-distance GR-EFT correction to weak gravity is recovered from the same constitutive record, without treating the effective metric as microscopic ontology.

A proposed recovery that supplies only $c_{\text{eff}}(x_{\mathrm{eff}}^i)$ or $\chi_{\text{sea}}(x_{\mathrm{eff}}^i)$ therefore closes only a refractive signal model. It becomes a metric recovery candidate only after that scalar row is embedded in one shared clock/ruler/signal map for $N$, $u^i_{\mathrm{sea,eff}}$, $e^a{}_i$, and $\gamma_{ij}^{\mathrm{eff}}$.

## Weak-Field Geodesic Handoff (ADM Constitutive Subclass)

The scalar/disformal bridge is the ADM/Cartan subclass obtained by choosing the local Noether sea rest gauge:
$$
u^i_{\mathrm{sea,eff}}=0,
\qquad
\gamma_{ij}^{\mathrm{eff}}=\Omega^2(n,\lambda)h_{ij},
\qquad
N=\Omega(n,\lambda)\xi
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-a513771b431dbf92)

Here $\xi$ is the Noether braid envelope shape ratio $\xi=R_{\parallel}/R_{\perp}$, not a synonym for the clock-rate factor. The stationary ideal clock-rate factor in this metric subclass is $N=\Omega\xi$ only after the geometry-to-clock map is fixed.

Define the clock-channel potential by the observer-side lapse:
$$
\Phi_{\text{eff}}(x_{\mathrm{eff}}^i)\equiv c_0^2\ln N(x_{\mathrm{eff}}^i)
=
c_0^2\ln\!\big(\Omega(x_{\mathrm{eff}}^i)\xi(x_{\mathrm{eff}}^i)\big),
\qquad
N(x_{\mathrm{eff}}^i)=e^{\Phi_{\text{eff}}(x_{\mathrm{eff}}^i)/c_0^2}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-773a465df978f1bd)

The $c_0^2$ prefactor calibrates the observer-sector potential; in the weak homogeneous branch, the residual between the primitive wake speed $c_f$ and the measured limiting speed $c_0$ is what operationally defines $\epsilon_{\mathrm{LV}}$ — the two agree up to $O(\epsilon_{\mathrm{LV}}c_0)$ by that definition, as a residual bounded by the Lorentz-violation budget rather than an asserted derivation.

With $x_{\mathrm{eff}}^0=c_0t_{\mathrm{eff}}$, the Noether sea rest-frame metric components are
$$
g^{\text{eff}}_{00}=-N^2,
\qquad
g^{\text{eff}}_{ij}=\Omega^2h_{ij}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-e49b881fd1df75f9)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-ac5b81fe5cacbd0e)
Because $N=\Omega\xi$, the same record must therefore satisfy
$$
\xi
=
1-(1+\gamma_{\mathrm{PPN}})\frac{U}{c_0^2}
+O(c_0^{-4}).
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-c44d1eb4221c566e)
Thus $\gamma_{\mathrm{PPN}}=1$ is equivalent at first order to $\xi=1-2U/c_0^2+O(c_0^{-4})$ in this ADM subclass. The asymptotic condition is $\xi\to1$ as $U\to0$; it does not erase the first-order response that carries $\gamma_{\mathrm{PPN}}$. A native braid-envelope derivation of this response would determine $\gamma_{\mathrm{PPN}}$ rather than fit it.

For a slowly moving test assembly in a stationary medium, the dominant connection piece is
$$
\Gamma^i_{00}
=
-\frac{1}{2}g_{\text{eff}}^{ij}\partial_j g_{00}^{\text{eff}}
=
\xi^{2}\,\partial^i\ln(\Omega\xi)
=
\xi^{2}\frac{\partial^i\Phi_{\text{eff}}}{c_0^2}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-4ac6e5b928f6972f)
Using $dx_{\mathrm{eff}}^0/dt_{\mathrm{eff}}\approx c_0$, the spatial geodesic equation gives
$$
\frac{d^2x_{\mathrm{eff}}^i}{dt_{\mathrm{eff}}^2}
\approx
-\Gamma^i_{00}\left(\frac{dx_{\mathrm{eff}}^0}{dt_{\mathrm{eff}}}\right)^2
=
-\xi^{2}\nabla^i\Phi_{\text{eff}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-60769808bf61c478)
Hence, retaining $\xi=1+O(U/c_0^2)$ on the declared weak-field branch,
$$
\frac{d^2x_{\mathrm{eff}}^i}{dt_{\mathrm{eff}}^2}
=-(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}
+O\!\left(
\left|1-\xi^{2}\right|\,\left|\nabla\Phi_{\text{eff}}\right|
\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f80bc28ba0203090)
which is the Newtonian limit.

PPN extraction for this constitutive subclass is defined canonically in [ppn-parameters](./ppn-parameters.md#ppn-parameters-and-the-euclidean-anchor), including the full $g_{00}$/$g_{ij}$ expansions, preferred-frame leakage map, and weak-field closure vector.

In that canonical map the exponential identity $N=e^{\Phi_{\mathrm{eff}}/c_0^2}$ fixes the quadratic coefficient only when the series is expressed in the constitutive potential $U_\Phi=-\Phi_{\mathrm{eff}}$. It gives $\beta_{\mathrm{PPN}}=1$ only if $U_\Phi=U+O(U^3/c_0^6)$, so the second-order potential-conversion coefficient vanishes. That conversion is a constitutive obligation, not a consequence of the definition $\Phi_{\mathrm{eff}}=c_0^2\ln N$.
