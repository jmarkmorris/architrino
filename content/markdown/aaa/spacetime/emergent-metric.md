# Emergent Metric

This chapter is the constitutive bridge from fixed-void substrate ontology to effective metric language. Its purpose is to say what the metric means in this framework, which medium variables are supposed to carry that structure, and what weak-field map has to be recovered before the spacetime branch can claim GR-level closure.

The opening fixes the ontological picture and the canonical symbols first. The later sections then move through equation-of-state support, refraction-versus-curvature language, weak-field constitutive maps, and closure interfaces.

## Absolute Frame vs. Effective Geometry

## Ontological Picture

- **Substrate**: A fixed Euclidean 3D void with absolute time $t$. Coordinates $(x,y,z)$ never move or curve.
- **Medium**: The [Noether Sea](noether-sea.md), a pervasive medium of coupled pro/anti Noether cores (tri-binary assemblies). The bridge term *spacetime medium* is used when translating toward effective spacetime language.
- **$\mathbb{U}_{\text{now}}$ universe-state perspective**: A conceptual observer in the absolute frame who knows:
  - The full architrino microstate $S(t)$,
  - The instantaneous state of the Noether Sea (density $\rho_{\text{core}}(x,t)$, alignment, stress),
  - The effective potential field $\Phi_{\text{eff}}(x,t)$ and its gradients.

From this vantage point, there is only:
- Flat Euclidean geometry $h_{ij}=\delta_{ij}$,
- A dynamic medium (Noether cores) moving and rearranging in that geometry.

## Canonical Symbols (Spacetime)

Use the following symbols consistently across spacetime chapters:

- $n(x,t)$: normalized Noether-core density.
- $\rho_{\text{core}}(x,t)=\rho_{\text{core},0}\,n(x,t)$: physical core density.
- $\chi_{\text{sea}}(x,t)=c_f/c_{\text{eff}}(x,t)$: Noether-Sea delay factor.
- $c_0\equiv c_{\text{eff}}(\infty)$: asymptotic homogeneous observer-channel speed used in weak-field metric comparisons.
- $\Phi_{\text{eff}}(x,t)$: constitutive potential inferred from the clock channel.
- $\Phi_N(x,t)$: Newtonian benchmark potential used for weak-field matching.
- $U\equiv -\Phi_N>0$: positive weak-field PPN potential variable.
- $N(x,t)$: observer-level lapse or clock-rate field reconstructed from Noether-Sea state.
- $u^i_{\text{sea}}(x,t)$: Noether-Sea drift field in the observer-level bookkeeping map.
- $e^a{}_i(x,t)$: spatial frame field carrying Noether-Sea compliance and orientation response.
- $\gamma_{ij}(x,t)=\delta_{ab}e^a{}_i e^b{}_j$: observer-level spatial compliance metric.

## What “Metric” Means Here

- **Effective metric $g^{\text{eff}}_{\mu\nu}(x)$** is *not* a fundamental property of the void. It is a derived description of:
  - How assembly-based clocks tick,
  - How assembly-based rulers measure distances,
  - How signals (tri-binary photons, GWs) propagate through the Noether Sea.

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

This does not license dismissing low-energy quantized-metric calculations. In the long-distance regime, the effective-field-theory treatment of GR separates unknown high-energy local terms from calculable infrared corrections. $\mathbb{A}\mathbb{A}\mathbb{A}$ should preserve that result as an observer-level recovery benchmark: the microscopic account may differ, but the weak-field constitutive record must reproduce the same long-distance quantum correction when its variables are coarse-grained into the effective metric description.

This support is useful but limited. A Jacobson-style argument would explain why GR-like behavior is a natural equilibrium limit of many possible media, not why $\mathbb{A}\mathbb{A}\mathbb{A}$ is uniquely correct. The distinguishing burden therefore shifts to the departures from equilibrium, where the detailed tri-binary architecture should matter.

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

## Refraction vs. Curvature

- From the **$\mathbb{U}_{\text{now}}$ universe-state perspective**:
  - Light and gravity-like perturbations travel on straight lines in $(x,y,z)$,
  - But with an *effective speed* $c_{\text{eff}}(x)$ that depends on the local Noether-core configuration:
    $c_{\text{eff}}(x) < c_f \quad \text{in dense regions (near mass)}$
- From the **physical observer** (built from assemblies):
  - Light and free-falling matter appear to move along curved paths (geodesics) of an effective metric $g^{\text{eff}}_{\mu\nu}$.
  - Shapiro delay, light bending, and perihelion precession become **refractive-medium effects** rather than curvature of the void itself.

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
(h_{ij},n,\chi_{\text{sea}},\text{stress},\Phi_N)
\mapsto
(N,u^i_{\text{sea}},\gamma_{ij})
\mapsto
g^{\text{eff}}_{\mu\nu},
$$
with $\gamma_{\text{eff}}$ the observable refraction/space-curvature coefficient to be fitted from Shapiro-delay data. Implementation of the corresponding one-way delay integral is given in [ppn-parameters](./ppn-parameters.md#explicit-weak-field-noether-sea-delay-map-ppn-gamma).

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
2. The same $N$, $u^i_{\text{sea}}$, and $\gamma_{ij}$ coefficients predict Shapiro delay, lensing, redshift, and preferred-frame residuals without re-fitting per observable.
3. The long-distance GR-EFT correction to weak gravity is recovered from the same constitutive record, without treating the effective metric as microscopic ontology.

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
