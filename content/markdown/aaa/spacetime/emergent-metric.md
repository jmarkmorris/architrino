# Emergent Metric

This chapter is the constitutive bridge from fixed-void substrate ontology to effective metric language. Its purpose is to say what the metric means in this framework, which medium variables are supposed to carry that structure, and what weak-field map has to be recovered before the spacetime branch can claim GR-level closure.

The opening fixes the ontological picture and the canonical symbols first. The later sections then move through equation-of-state support, refraction-versus-curvature language, weak-field constitutive maps, and closure interfaces.

## Absolute Frame vs. Effective Geometry

The spacetime branch keeps two descriptions separate. The absolute frame is the fixed bookkeeping structure of absolute time and Euclidean position; it supplies the substrate coordinates in which architrino path histories and Noether-Sea state are recorded. Effective geometry is the observer-level metric reconstructed from clocks, rulers, signal propagation, and medium response.

The bridge is therefore constitutive rather than ontological. A successful metric map must explain how the same Noether-Sea record produces lapse, spatial-compliance, drift, and signal-delay channels without treating the Euclidean void itself as curved.

## Ontological Picture

- **Substrate**: A fixed Euclidean 3D void with absolute time $t$. A chosen chart $(x,y,z)$ represents fixed void locations; the labels never move or curve.
- **Medium**: The [Noether Sea](noether-sea.md), a pervasive medium of coupled pro/anti Noether cores (tri-binary assemblies). The bridge term *spacetime medium* is used when translating toward effective spacetime language.
- **$\mathbb{U}_{\text{now}}$ universe-state perspective**: Complete-state bookkeeping on the absolute-time slice, carrying:
  - The full architrino microstate $S(t)$,
  - The instantaneous state of the Noether Sea (density $\rho_{\text{core}}(\mathbf{x},t)$, alignment, stress),
  - The effective potential field $\Phi_{\text{eff}}(\mathbf{x},t)$ and its gradients.

From this bookkeeping perspective, there is only:
- Flat Euclidean geometry $h_{ij}=\delta_{ij}$,
- A dynamic medium (Noether cores) moving and rearranging in that geometry.

## Canonical Symbols (Spacetime)

Use the following symbols consistently across spacetime chapters:

- $n(\mathbf{x},t)$: normalized Noether-core density.
- $\rho_{\text{core}}(\mathbf{x},t)=\rho_{\text{core},0}\,n(\mathbf{x},t)$: physical core density.
- $\chi_{\text{sea}}(\mathbf{x},t)=c_f/c_{\text{eff}}(\mathbf{x},t)$: Noether-Sea delay factor.
- $c_0\equiv c_{\text{eff}}(\infty)$: asymptotic homogeneous observer-channel speed used in weak-field metric comparisons.
- $\Phi_{\text{eff}}(\mathbf{x},t)$: constitutive potential inferred from the clock channel.
- $\Phi_N(\mathbf{x},t)$: Newtonian benchmark potential used for weak-field matching.
- $U\equiv -\Phi_N>0$: positive weak-field PPN potential variable.
- $N(\mathbf{x},t)$: observer-level lapse or clock-rate field reconstructed from Noether-Sea state.
- $u^i_{\text{sea}}(\mathbf{x},t)$: Noether-Sea drift field in the observer-level bookkeeping map.
- $e^a{}_i(\mathbf{x},t)$: spatial frame field carrying Noether-Sea compliance and orientation response.
- $\gamma_{ij}(\mathbf{x},t)=\delta_{ab}e^a{}_i e^b{}_j$: observer-level spatial compliance metric.

## What “Metric” Means Here

- **Effective metric $g^{\text{eff}}_{\mu\nu}(x)$** is *not* a fundamental property of the void. It is a derived description of:
  - How assembly-based clocks tick,
  - How assembly-based rulers measure distances,
  - How photon-channel packets and gravitational-wave channels propagate through the Noether Sea.

We define $g^{\text{eff}}_{\mu\nu}$ operationally:

> At each point $x$, choose an idealized physical observer (tri-binary clock + ruler), and infer a local metric from their measured time intervals and spatial separations.

The $\mathbb{U}_{\text{now}}$ universe-state perspective then maps substrate and medium data into observer-level ADM/Cartan fields:

$$
\big(h_{ij}, n, \chi_{\text{sea}}, \Phi_{\text{eff}}, \nabla\Phi_{\text{eff}}, \text{stress}, \text{alignment}\big)
\;\Rightarrow\;
\big(N,u^i_{\text{sea}},e^a{}_i,\gamma_{ij}\big)
\;\Rightarrow\;
g^{\text{eff}}_{\mu\nu}.
$$

The first arrow is the open constitutive problem. The second arrow is the observer-level metric assembly; it does not curve the Euclidean void.

### Weak-Gravity Visibility Scale

For weak effective-metric recovery, the useful small parameter is not the material temperature measured against the Planck temperature. It is the dimensionless effective potential, together with the density-length scale that sources that potential. For a roughly uniform ordinary-matter body of characteristic size $L$ and standard-matter density $\rho_{\mathrm{mat}}$, the Newtonian comparison estimate is

$$
\epsilon_{\Phi}
\equiv
\frac{|\Phi_{\text{eff}}|}{c_0^2}
\sim
\frac{4\pi G_{\mathrm{eff}}\rho_{\mathrm{mat}}L^2}{3c_0^2}.
$$

Thus ordinary density can be weakly visible to clocks and signal paths when it is integrated over planetary or stellar length scales, while meter-scale laboratory samples require much higher density or precision. The Earth core is thermally cold on a Planck-temperature comparison, but that fact is not the limiting variable for weak gravity. Its contribution to observer-level metric response comes from the rest-energy, pressure, stress, and exposed assembly ledger distributed over a large body, projected through the same Noether-Sea response map that supplies $\Phi_{\text{eff}}$, $\Gamma_N$, and $\chi_{\text{sea}}$.

## ADM/Cartan Reconstruction Surface

The metric bridge should now be expressed through the same ADM/Cartan variables used by [Tri-Binary Dynamics](../dynamics/tri-binary-dynamics.md#admcartan-reconstruction-target). The observer-level line element target is

$$
ds_{\rm eff}^2
=
-N^2c_0^2dt^2
+
\gamma_{ij}
\left(dx^i-u^i_{\text{sea}}dt\right)
\left(dx^j-u^j_{\text{sea}}dt\right).
$$

Here $N$ is the clock-rate or lapse channel, $u^i_{\text{sea}}$ is medium drift, and $\gamma_{ij}$ is the spatial compliance channel built from the frame field $e^a{}_i$. In the GR-matching regime the effective connection is the Levi-Civita connection of $g^{\text{eff}}_{\mu\nu}$; torsion, nonmetricity, birefringence, dispersion, and preferred-frame leakage are deviation observables rather than substrate ontology.

This form is the common handoff surface for clock redshift, Shapiro delay, lensing, geodesic motion, photon synchronization, and preferred-frame tests. A scalar speed map alone is therefore not enough for closure: it can support a first Shapiro-delay intuition, but the full PPN burden requires the lapse, drift, and spatial-compliance channels together.

The same handoff can be written as a local clock-and-signal quadratic form,
$$
d\tau^2
=
A^2(\mathcal{N}_{\mathrm{sea}})\,dt^2
-
\frac{1}{c_0^2}
B_{ij}(\mathcal{N}_{\mathrm{sea}})
\left(dx^i-u^i_{\text{sea}}dt\right)
\left(dx^j-u^j_{\text{sea}}dt\right),
$$
with $A$, $B_{ij}$, and $u^i_{\text{sea}}$ read from the same retained Noether-Sea and Physical Observer record. In the local medium-rest frame, the photon-channel null condition $d\tau^2=0$ gives
$$
c_\gamma(\hat{\mathbf{k}},\mathcal{N}_{\mathrm{sea}})
=
\frac{
c_0A(\mathcal{N}_{\mathrm{sea}})
}{
\sqrt{
B_{ij}(\mathcal{N}_{\mathrm{sea}})\hat k^i\hat k^j
}
}.
$$
The weak homogeneous observer branch requires
$$
A\to1,
\qquad
B_{ij}\to\delta_{ij},
\qquad
u^i_{\text{sea}}\to0.
$$
This is a constitutive equation, not a new fundamental four-dimensional metric on absolute timespace.

The retained weak-field coefficient map should therefore be expressed at the ADM/Cartan level before observable projections are evaluated. With
$$
\delta n\equiv n-1,\qquad
\delta\chi\equiv\frac{\chi_{\text{sea}}}{\chi_{\text{sea}}(\infty)}-1,
\qquad
\varphi\equiv\frac{\Phi_{\text{eff}}}{c_0^2},
$$
and with $\sigma_{ij}$ the retained Noether-Sea stress projection, the minimal coefficient scaffold is
$$
N
=
1
+A_N^n\delta n
+A_N^\chi\delta\chi
+A_N^\Phi\varphi
+Q_N(\delta n,\delta\chi,\varphi,\sigma)
+O(c_0^{-6},\epsilon_{\mathrm{LV}}),
$$
$$
\gamma_{ij}
=
h_{ij}
\left(
1
+A_\gamma^n\delta n
+A_\gamma^\chi\delta\chi
+A_\gamma^\Phi\varphi
\right)
+A_{\gamma,\mathrm{tf}}\sigma^{\mathrm{tf}}_{ij}
+O(c_0^{-4},\epsilon_{\mathrm{LV}}),
$$
$$
u^i_{\text{sea}}
=
B^i{}_j w^j\frac{U}{c_0^2}
+O(c_0^{-5},\epsilon_{\mathrm{LV}}),
\qquad
\gamma_{ij}=\delta_{ab}e^a{}_i e^b{}_j.
$$
Here $w^i$ is the medium drift relative to the comparison frame and $U$ is the positive PPN potential. These are not new substrate fields. They are coefficient rows for the observer-level reconstruction. Redshift, Shapiro delay, lensing, weak-field acceleration, and preferred-frame residuals must read from these rows as one shared constitutive record.

A practical consistency check is that those channels must be projections of one shared record of the Noether Sea and the Physical Observer, not independently tuned descriptions. For an observation window $W$, let $\theta$ collect the retained Noether-Sea state, source assemblies, observer clock/ruler state, signal-channel record, apparatus calibration, and boundary wake data. Let
$$
\Pi_{\mathrm{clk}}\theta,\qquad
\Pi_{\mathrm{rul}}\theta,\qquad
\Pi_{\mathrm{sig}}\theta
$$
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
\lambda_{\mathrm{retune}}\mathcal{S}_{\mathrm{retune}}(\theta).
$$
Here $\Sigma_W$ is the declared benchmark covariance, $\alpha_i$ are the preferred-frame parameters, and $\mathcal{S}_{\mathrm{retune}}(\theta)$ records whether separate parameter choices were used to pass different channels. The closure condition is
$$
\mathcal{R}_{\mathrm{metric}}(\theta;W)\le\epsilon_{\mathrm{metric}},
\qquad
\mathcal{S}_{\mathrm{retune}}(\theta)=0.
$$
The point is not to add a new spacetime ontology. It is to require the effective metric to behave as one constitutive summary of the same medium and observer record across clocks, rulers, signal propagation, and weak-field gravitational tests.

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
\sqrt{-g^{\text{eff}}_{\mu\nu}dx^\mu dx^\nu},
$$
and extremizing this observer-level action must give the same weak-field acceleration row used in the PPN bundle,
$$
\frac{d^2\mathbf{x}}{dt^2}
=
-\nabla\Phi_{\text{eff}}
+O(c_0^{-2}).
$$
For null signal records,
$$
g^{\text{eff}}_{\mu\nu}dx^\mu dx^\nu=0
$$
must match the eikonal path-time extremal of the Noether-Sea signal channel. In the point-mass weak-field limit, the recovered deflection target is
$$
\Delta\theta
=
2(1+\gamma_{\text{eff}})
\frac{GM}{b\,c_0^2}
+O(c_0^{-4}),
$$
so the GR limit $\gamma_{\text{eff}}=1$ gives $\Delta\theta=4GM/(b\,c_0^2)$. A lapse-only or scalar-delay-only map that supplies only $2GM/(b\,c_0^2)$ has recovered the Newtonian half-test, not the full effective metric. This is why the ADM/Cartan map must carry both the clock/lapse channel and the spatial-compliance channel.

### Lensing-Dynamics Equality Constraint

Hybrid dark-sector comparisons sharpen the metric burden: a modified force law that changes baryonic dynamics must also give the correct lensing potential, or the inferred dynamical mass and lensing mass will disagree. In weak-field comparison language, write the effective metric potentials as

$$
ds_{\mathrm{eff}}^2
=
-\left(1+\frac{2\Phi_{\mathrm{dyn}}}{c_0^2}\right)c_0^2dt^2
+
\left(1-\frac{2\Psi_{\mathrm{sp}}}{c_0^2}\right)d\mathbf{x}^2.
$$

Massive slow probes read the dynamical potential $\Phi_{\mathrm{dyn}}$, while weak lensing reads the Weyl combination

$$
\Phi_{\mathrm{lens}}
=
\frac{\Phi_{\mathrm{dyn}}+\Psi_{\mathrm{sp}}}{2}.
$$

The equality target is therefore

$$
\Phi_{\mathrm{lens}}
=
\Phi_{\mathrm{dyn}}
+O(\epsilon_{\mathrm{lens}}),
\qquad
\Psi_{\mathrm{sp}}-\Phi_{\mathrm{dyn}}
=
O(\epsilon_{\mathrm{lens}}),
$$

equivalently $\gamma_{\text{eff}}\equiv\Psi_{\mathrm{sp}}/\Phi_{\mathrm{dyn}}\to1$ in the weak-field lensing regime. A scalar force or medium-response correction that appears only in the clock/lapse channel accelerates matter but under-deflects light. A valid $\mathbb{A}\mathbb{A}\mathbb{A}$ response must project the same Noether-Sea state into the lapse and spatial-compliance channels so that rotation curves, hydrostatic mass, time delay, and lensing consume one effective metric.

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
\gamma_{\text{eff}}^\theta-1
\right\|_W^2
+
\lambda_{\mathrm{shared}}\mathcal{S}_{\mathrm{retune}}(\theta).
$$

This residual belongs to the effective-metric closure program, not to dark-sector ontology by itself. It is the condition that lets a medium-response explanation of galaxy or cluster dynamics remain compatible with the same lensing map.

### Matter-Channel Compatibility Target

The same shared-record rule applies to the effective matter channels whose observations test the metric. The retained comparison lesson from matter-first gravity programs is not that their ontology should be imported, but that predictive matter dynamics and observer-level geometry cannot be chosen independently. In this framework, the matter channel, clock channel, ruler channel, and signal channel must remain projections of the same Noether-Sea record $\theta$.

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
\right],
$$
where $\mathcal{R}_{\mathrm{Cauchy}}^{(r)}$ records failure of the declared channel to share the predictive Cauchy evolution used by the same observer-level metric record. In the validated weak homogeneous photon regime, this residual includes the requirement that the two physical polarization branches share the same free-space characteristic cone up to the birefringence tolerance routed through [Failure Criteria](../validation/failure-criteria.md#operational-null-result-ledger).

This remains a closure target rather than substrate ontology. If $\mathcal{R}_{\mathrm{char}}$ is small only because the photon, clock, ruler, or stress channels use different fitted records, the metric has not been recovered as a constitutive output of the Noether Sea.

For fermion matter channels, the compatibility burden inherits the spinor ledger. The effective metric may summarize the matter channel only after the ordered-core spinor target, the effective spin-operator record, and weak-coupling-triad exposure are supplied by the same branch record. In compact form,
$$
\mathcal{R}_{\mathrm{metric}}^{\mathrm{fermion}}(\theta;W)
=
\mathcal{R}_{\mathrm{metric}}(\theta;W)
+\lambda_{\mathrm{s2m}}
\mathcal{R}_{\mathrm{spin\to metric}}(\theta;W),
$$
with $\mathcal{R}_{\mathrm{spin\to metric}}$ defined in [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md#spinor-to-metric-compatibility-residual). This does not add spinor ontology to the metric. It states when fermion matter records are mature enough to be consumed by the metric constitutive map without importing weak handedness or spin as unexplained effective labels.

The same-record condition is part of the metric claim. A fermion stress channel cannot pass metric compatibility by combining one branch for inertial response, another branch for spinor closure, and a third branch for weak exposure; the retained row that supplies the ordered-core spinor label must also satisfy the row-local gauge-control and angular-momentum residuals consumed by $\mathcal{R}_{\mathrm{spin\to metric}}$.

In the shared pullback notation, the stress-side consumer is $\Pi_{\mathrm{matter}}\mathcal L_\star(\theta;W,r_\star)$. The fermion metric row therefore fails if spinor closure, weak exposure, and matter response are sourced from different retained rows, even when each reduced row is individually well fitted.

## Noether-Core Deformation and Metric Language

At the assembly level, an individual Noether core has an oblate, deformable exclusion envelope; see [Noether Core Geometry](noether-core-geometry.md). This chapter does not identify that single-core envelope with the metric. The metric bridge uses many deforming Noether cores in the Noether Sea as the medium whose coarse variables determine clock, ruler, and signal behavior.

When translating toward General Relativity, Einstein's field equations are treated as the effective continuum relation
$$
G_{\mu\nu} = \frac{8\pi G}{c^4}T_{\mu\nu},
$$
not as substrate curvature of the Euclidean void. In this framework, the right-hand side is interpreted through matter assemblies and Noether-Sea stress, while the left-hand side is the observer-level metric summary reconstructed from clock, ruler, and signal channels.

For axially symmetric or rotating sources, oblate spheroidal coordinates can be a useful effective chart. A representative line element has the form
$$
ds^2
=
-f(\xi,\eta)c_0^2dt^2
+g_1(\xi,\eta)d\xi^2
+g_2(\xi,\eta)d\eta^2
+g_3(\xi,\eta)d\phi^2,
$$
where $f,g_1,g_2,g_3$ encode the observer-level response of clocks, rulers, and signal paths. These coefficients are not primitive geometry. They are closure targets to be derived from Noether-Sea density, strain, alignment, and deformation.

The useful GR analogy is therefore limited but important:

- oblate coordinates help describe rotating or deformed effective sources,
- interior and exterior effective solutions around oblate bodies remain useful comparison targets,
- perturbative methods can capture small departures from spherical symmetry,
- and standard predictions such as redshift, Shapiro delay, lensing, orbital precession, frame-dragging, and gravitational-wave emission from deformed sources must be recovered from one reusable constitutive map.

The assembly fact that a Noether core is oblate belongs in [Noether Core Geometry](noether-core-geometry.md). The spacetime claim that a population of deformed cores yields an effective metric belongs here and in [PPN Parameters](ppn-parameters.md).

## Jacobson-Type Support: Metric as Equation of State

This medium-first picture is strengthened by the general Jacobson-style lesson: Einstein equations are plausibly an **equation of state** for an underlying microscopic system rather than substrate-level laws of the void itself.

That comparative point fits $\mathbb{A}\mathbb{A}\mathbb{A}$ cleanly:

- the Euclidean void and absolute time are fundamental background structure,
- the Noether Sea is the relevant microstructure,
- and relativistic metric behavior is the long-wavelength thermodynamic closure of that microstructure.

On this reading, quantizing the effective metric directly is not the primary move. The primary move is to understand and simulate the microphysical medium well enough that GR-like geometry emerges as its coarse constitutive summary.

The spacetime-condensate comparison makes the same point in hydrodynamic language. If $g_{\mu\nu}^{\mathrm{eff}}$ is a collective variable, then a long-wavelength quantized-metric calculation is analogous to quantizing a collective mode. The missing microscopic question is the coarse-graining map
$$
\Pi_{\mathrm{hydro}}:
\left(
S(t),\mathcal{H}_{\Omega}^{W},\mathcal{N}_{\mathrm{sea}}
\right)
\longrightarrow
g_{\mu\nu}^{\mathrm{eff}},
$$
and the residual
$$
\mathcal{R}_{\mathrm{hydro}\to g}(\theta)
=
\frac{
\left\|
g_{\mu\nu}^{\mathrm{eff}}(\theta)
-
\Pi_{\mathrm{hydro}}[S(t),\mathcal{H}_{\Omega}^{W},\mathcal{N}_{\mathrm{sea}}]
\right\|
}{\epsilon_g}.
$$
This residual is not a new gate; it states the existing constitutive burden in a form that separates collective-mode recovery from microscopic derivation.

This does not license dismissing low-energy quantized-metric calculations. In the long-distance regime, the effective-field-theory treatment of GR separates unknown high-energy local terms from calculable infrared corrections. $\mathbb{A}\mathbb{A}\mathbb{A}$ should preserve that result as an observer-level recovery benchmark: the microscopic account may differ, but the weak-field constitutive record must reproduce the same long-distance quantum correction when its variables are coarse-grained into the effective metric description.

This support is useful but limited. A Jacobson-style argument would explain why GR-like behavior is a natural equilibrium limit of many possible media, not why $\mathbb{A}\mathbb{A}\mathbb{A}$ is uniquely correct. The distinguishing burden therefore shifts to the departures from equilibrium, where the detailed tri-binary architecture should matter.

It also does not derive inertia by itself. A successful equation-of-state route can recover an effective Einstein equation while leaving open how a particular assembly acquires its inertial response, why accelerated and gradient-driven local records agree to equivalence-principle accuracy, and how the same Noether-Sea record fixes the mass-side response tensor. Those burdens remain with the mass, energy, Lorentz-closure, and tri-binary dynamics programs.

### Local-Horizon Recovery Target

The Jacobson comparison gives this chapter a sharper recovery target than the general phrase "metric as equation of state." In the standard argument, a local horizon patch is assigned a boost-energy flux $dQ$, an Unruh temperature $T_U$, and an entropy change $dS$ proportional to horizon area. The $\mathbb{A}\mathbb{A}\mathbb{A}$ translation cannot assume those quantities as substrate facts. It must derive their observer-level analogues from one Noether-Sea record, using the same clock, signal, stress, and finite-boundary data that later recover weak-field GR.

For a Physical Observer $O$ and a small effective-horizon patch $\partial\Omega$, let $\theta$ denote the shared Noether-Sea and observer-channel record. Let $\mathcal{B}_{\partial\Omega}^{(O)}(\theta)$ be the observer-accessible boundary-wake label set induced by the finite-boundary data in [Observer Framework](observer-framework.md#ontic-and-epistemic-levels). A compact thermodynamic comparison residual is
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
T_{\mu\nu}^{\mathrm{eff}}(\theta)\xi^\mu d\Sigma^\nu,
$$
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
}.
$$

The local-horizon gate is $\mathcal{R}_{\mathrm{thermo}}(\theta)\le\epsilon_{\mathrm{thermo}}$ in the equilibrium weak-field comparison regime, with the same $\theta$ also passing the ADM/Cartan and PPN gates below. If the residual can be made small only by assigning independent entropy, temperature, and stress records to each patch, then the equation-of-state analogy has not become a native closure. If it can be made small for all local horizon patches while local observer-level conservation holds, the Jacobson route supplies a proof scaffold for recovering an effective Einstein equation without treating the Euclidean void as curved.

The first proof scaffold is to make the boundary count, temperature, and flux three projections of the same record rather than three fitted fields. For a finite analysis window $W$, the boundary label count should satisfy
$$
\mathcal{N}_{\partial\Omega}^{(O)}(\theta;W)
=
\left|\mathcal{B}_{\partial\Omega}^{(O)}(\theta;W)\right|,
\qquad
S_{\partial\Omega}^{(O)}(\theta;W)
=
k_B\log\mathcal{N}_{\partial\Omega}^{(O)}(\theta;W).
$$
The area-scaling target is not imposed as ontology. It is the recoverable limit
$$
\frac{\partial S_{\partial\Omega}^{(O)}}{\partial A_{\partial\Omega}^{\mathrm{eff}}}
\longrightarrow
\frac{k_B}{4A_{\text{align}}},
$$
where $A_{\partial\Omega}^{\mathrm{eff}}$ is the observer-level patch area and $A_{\text{align}}$ is the alignment-area scale used in the black-hole entropy target. The local temperature comparison is
$$
T_U^{(O)}
=
\frac{\hbar a_O}{2\pi k_B c_0},
\qquad
a_O^2
=
\gamma_{ij}a_O^i a_O^j,
$$
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
must be small on the same windows. Thus the local-horizon pass condition is not only $\mathcal{R}_{\mathrm{thermo}}\le\epsilon_{\mathrm{thermo}}$, but also $\mathcal{R}_{E,\partial\Omega}^{(O)}\le\epsilon_E$ and the weak-field ADM/Cartan gates for the same $\theta$. A concrete simulation protocol for this target is [Thermodynamic Residual Protocol](../validation/simulations/thermodynamic-residual.md).

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
\right).
$$
Here $\mathcal{H}_{\Omega}^{W}$ is the retained path-history data on the window, $\mathcal{B}_{\partial\Omega}^{(O)}(W)$ is the observer-accessible boundary-wake record, $\left.\mathcal{N}_{\mathrm{sea}}\right|_{\Omega,W}$ is the locally resolved Noether-Sea state, $O_W$ is the observer's clock, ruler, and readout state on the window, $\Pi_{\mathrm{eff}}$ is the projection to the observer-level fields $(N,u^i_{\text{sea}},\gamma_{ij},T_{\mu\nu}^{\mathrm{eff}})$, and $\mu_{\Omega,\theta}$ is the conditional measure over unresolved deterministic histories. This tuple is not a new substrate object. It only names the record that must supply entropy, temperature, flux, and effective metric data together.

Let $\delta_\ell$ denote an admissible local-horizon perturbation that keeps the observer, window, projection map, and comparison regime fixed while varying the resolved Noether-Sea state and boundary flux through the patch. The native closure target is
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
\mathcal{O}(\epsilon_{\mathrm{local}}).
$$
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
\left(\theta_{\Omega,O,W};x\right)
dA_{\mathrm{eff}}(x)
+
\mathcal{O}(\epsilon_{\mathrm{edge}}),
\qquad
\sigma_{\mathrm{bw}}
\longrightarrow
\frac{1}{4A_{\text{align}}}
$$
in the equilibrium weak-field limit. The proof fails if the distinguishable boundary-wake count scales with unresolved interior volume or arbitrary history length after the effective area is fixed, if $T_U^{(O)}$ is not extracted from the same observer-channel acceleration that defines $A_{\partial\Omega}^{\mathrm{eff}}$, if $dQ_{\partial\Omega}^{(O)}$ uses a stress tensor not projected from $\theta_{\Omega,O,W}$, or if the same record cannot also satisfy weak-field ADM/Cartan recovery.

A more explicit reduction is the boundary-factorization theorem target. Let $\mathcal{P}_{\partial\Omega}$ be a patch decomposition of the observer-level horizon surface with
$$
A_{\mathrm{eff}}(P_a)
=
a_{\theta}A_{\text{align}}
+
\mathcal{O}(\epsilon_A A_{\text{align}}),
\qquad
P_a\in\mathcal{P}_{\partial\Omega}.
$$
where $a_{\theta}$ is the derived dimensionless patch-area normalization for the retained record. The coefficient cannot be interpreted as a literal independent one-patch count: $\log|\mathcal{L}_a|=1/4$ would require $|\mathcal{L}_a|=e^{1/4}$, not the cardinality of a finite set. The coherent target is an area-normalized block entropy density. For a connected patch block $U\subseteq\mathcal{P}_{\partial\Omega}$, let $\mathcal{L}_U(\theta_{\Omega,O,W})$ be the joint retained boundary-wake label set on $U$ after fixing the observer record and the edge data to the accuracy declared by $\epsilon_{\mathrm{local}}$. The local aligned-label density is
$$
s_{\mathrm{align}}(\theta_{\Omega,O,W})
=
\lim_{|U|\to\infty}
\frac{1}{|U|}
\log\left|
\mathcal{L}_U(\theta_{\Omega,O,W})
\right|,
$$
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
\right),
$$
where the correction records edge and finite-correlation effects between adjacent patches. The normalization part is then the aligned-label statement
$$
\frac{s_{\mathrm{align}}(\theta_{\Omega,O,W})}
{a_{\theta}}
\longrightarrow
\frac{1}{4}.
$$
Together with $\sum_{P_a\in\mathcal{P}_{\partial\Omega}}A_{\mathrm{eff}}(P_a)\to A_{\partial\Omega}^{\mathrm{eff}}$, these claims imply the area density above. This does not prove the coefficient by definition. It reduces the problem to a local aligned-interface calculation: terminal tri-binary alignment must supply a universal block entropy density, its patch-area normalization, and surrounding Noether-Sea correlations short-range enough that the boundary count is additive up to edge residuals.

## Refraction vs. Curvature

- From the **$\mathbb{U}_{\text{now}}$ universe-state perspective**:
  - Primitive causal-wake support is measured by Euclidean distances in $(x,y,z)$,
  - While effective ray paths and clock comparisons depend on an *effective speed* $c_{\text{eff}}(x)$ set by the local Noether-core configuration:
    $c_{\text{eff}}(x) < c_f \quad \text{in dense regions (near mass)}$
- From the **physical observer** (built from assemblies):
  - Light and free-falling matter appear to move along curved paths (geodesics) of an effective metric $g^{\text{eff}}_{\mu\nu}$.
  - Shapiro delay, light bending, and perihelion precession become **refractive-medium effects** rather than curvature of the void itself.

A flat-space refraction analogy is therefore useful only when it is kept at the correct level. A scalar $c_{\text{eff}}(x)$ or scalar refractive-index map can encode a first signal-path delay, but it is not by itself an effective metric. GR/PPN recovery requires the same Noether-Sea record to determine the lapse $N$, drift $u^i_{\text{sea}}$, frame field $e^a{}_i$, and spatial compliance $\gamma_{ij}$, so clock, ruler, and signal projections cannot be tuned as separate channels.

The core task of this document will be to:

1. Specify the functional dependence of $g^{\text{eff}}_{\mu\nu}(x)$ on:
   - $n(x)$ (equivalently $\rho_{\text{core}}(x)$),
   - Stress/strain of the medium,
   - Potential $\Phi_{\text{eff}}(x)$ from matter assemblies.
2. Show that in the weak-field regime this reproduces the standard GR metric (e.g. Schwarzschild) to PPN accuracy:
   $g^{\text{eff}}_{00} \approx -\left(1 + \frac{2\Phi_N}{c_0^2}\right), \quad g^{\text{eff}}_{ij} \approx h_{ij}\left(1 - \frac{2\Phi_N}{c_0^2}\right).$

## Minimal Weak-Field Constitutive Map (for PPN Matching)

To make the mapping functional explicit at first post-Newtonian order, start in the local medium-rest gauge
$$
u^i_{\text{sea}}=0,
$$
with observer-channel speed $c_0=c_{\text{eff}}(\infty)$. The weak-field target is
$$
N(\mathbf{x})
=
1+\frac{\Phi_N(\mathbf{x})}{c_0^2}
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right),
$$
$$
\gamma_{ij}(\mathbf{x})
=
\left(
1-2\gamma_{\text{eff}}\frac{\Phi_N(\mathbf{x})}{c_0^2}
\right)h_{ij}
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right).
$$

Equivalently, using $x^0=c_0t$ in the observer-sector metric,
$$
g^{\text{eff}}_{00}(\mathbf{x})
=
-\left(1+\frac{2\Phi_N(\mathbf{x})}{c_0^2}\right)
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right),
$$
$$
g^{\text{eff}}_{ij}(\mathbf{x})
=
\left(
1-2\gamma_{\text{eff}}\frac{\Phi_N(\mathbf{x})}{c_0^2}
\right)h_{ij}
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right).
$$

The canonical Noether-Sea delay factor remains
$$
\chi_{\text{sea}}(\mathbf{x})\equiv \frac{c_f}{c_{\text{eff}}(\mathbf{x})}.
$$
For PPN time-of-flight comparisons, normalize by the homogeneous observer speed:
$$
\frac{c_0}{c_{\text{eff}}(\mathbf{x})}
=
\frac{\chi_{\text{sea}}(\mathbf{x})}{\chi_{\text{sea}}(\infty)}
=
1-(1+\gamma_{\text{eff}})\frac{\Phi_N(\mathbf{x})}{c_0^2}
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right),
$$
so travel time on a Euclidean anchor path $\Gamma$ is
$$
t[\Gamma]=\frac{1}{c_0}\int_\Gamma \frac{c_0}{c_{\text{eff}}(\mathbf{x})}\,ds.
$$

This is the concrete first-order realization of
$$
(h_{ij},n,\chi_{\text{sea}},\Phi_{\text{eff}},\text{stress})
\mapsto
(N,u^i_{\text{sea}},e^a{}_i,\gamma_{ij})
\mapsto
g^{\text{eff}}_{\mu\nu},
$$
with $\gamma_{\text{eff}}$ the observer-level refraction/spatial-compliance coefficient extracted from the same constitutive record whose Shapiro-delay and lensing projections are tested in [ppn-parameters](./ppn-parameters.md#explicit-weak-field-noether-sea-delay-map-ppn-gamma).

## Closure Program Interface (metric constitutive map)

This chapter is the constitutive anchor for the gravity-side closure:
$$
(h_{ij},n,\chi_{\text{sea}},\Phi_{\text{eff}},\text{stress})
\mapsto
(N,u^i_{\text{sea}},e^a{}_i,\gamma_{ij})
\mapsto
g^{\text{eff}}_{\mu\nu}.
$$

Distribute proof obligations as:
- constitutive metric form and observer map: **this chapter**,
- explicit 1PN observables/estimators: [spacetime/ppn-parameters.md](./ppn-parameters.md),
- clock-law extraction and coefficient fitting: [spacetime/proper-time-and-time-dilation.md](./proper-time-and-time-dilation.md),
- final acceptance thresholds: [validation/constraint-ledger.md](../validation/constraint-ledger.md).

Minimal closure condition:
1. Eikonal path-time extremals in the refractive picture match null geodesics of $g^{\text{eff}}_{\mu\nu}$ in weak field.
2. The same $N$, $u^i_{\text{sea}}$, $e^a{}_i$, and $\gamma_{ij}$ coefficients predict Shapiro delay, lensing, redshift, weak-field acceleration, and preferred-frame residuals without re-fitting per observable.
3. The long-distance GR-EFT correction to weak gravity is recovered from the same constitutive record, without treating the effective metric as microscopic ontology.

A proposed recovery that supplies only $c_{\text{eff}}(\mathbf{x})$ or $\chi_{\text{sea}}(\mathbf{x})$ therefore closes only a refractive signal model. It becomes a metric recovery candidate only after that scalar row is embedded in one shared clock/ruler/signal map for $N$, $u^i_{\text{sea}}$, $e^a{}_i$, and $\gamma_{ij}$.

## Weak-Field Geodesic Handoff (ADM Constitutive Subclass)

The older scalar/disformal bridge is now a subclass of the ADM/Cartan surface. In the local medium-rest gauge, set
$$
u^i_{\text{sea}}=0,
\qquad
\gamma_{ij}=\Omega^2(n,\lambda)h_{ij},
\qquad
N=\Omega(n,\lambda)\xi.
$$

Here $\xi$ is the Noether-core envelope shape ratio $\xi=R_{\parallel}/R_{\perp}$, not a synonym for the clock-rate factor. The stationary ideal clock-rate factor in this metric subclass is $N=\Omega\xi$ only after the geometry-to-clock map is fixed.

Define the clock-channel potential by the observer-side lapse:
$$
\Phi_{\text{eff}}(x)\equiv c_0^2\ln N(x)
=
c_0^2\ln\!\big(\Omega(x)\xi(x)\big),
\qquad
N(x)=e^{\Phi_{\text{eff}}(x)/c_0^2}.
$$

With $x^0=c_0t$, the medium-rest metric components are
$$
g^{\text{eff}}_{00}=-N^2,
\qquad
g^{\text{eff}}_{ij}=\Omega^2h_{ij}.
$$
For a slowly moving test assembly in a stationary medium, the dominant connection piece is
$$
\Gamma^i_{00}
=
-\frac{1}{2}g_{\text{eff}}^{ij}\partial_j g_{00}^{\text{eff}}
=
\xi^{2}\,\partial^i\ln(\Omega\xi)
=
\xi^{2}\frac{\partial^i\Phi_{\text{eff}}}{c_0^2}.
$$
Using $dx^0/dt\approx c_0$, the spatial geodesic equation gives
$$
\frac{d^2x^i}{dt^2}
\approx
-\Gamma^i_{00}\left(\frac{dx^0}{dt}\right)^2
=
-\xi^{2}\nabla^i\Phi_{\text{eff}}.
$$
Hence, in weak field ($\xi\to 1$),
$$
\frac{d^2\mathbf{x}}{dt^2}
=-\nabla\Phi_{\text{eff}}
+O\!\left(\left|1-\xi^{2}\right|\,\left|\nabla\Phi_{\text{eff}}\right|\right),
$$
which is the Newtonian limit.

PPN extraction for this constitutive subclass is defined canonically in
[ppn-parameters](./ppn-parameters.md#ppn-parameters-and-the-euclidean-anchor),
including the full $g_{00}$/$g_{ij}$ expansions, preferred-frame leakage map,
and weak-field closure vector.

In that canonical map:
$$
\beta_{\text{PPN}}=1
$$
for the exponential clock-law channel, while $\gamma_{\text{PPN}}$ is fixed by
first-order clock-channel partitioning between $\Omega$ and $\xi$.
