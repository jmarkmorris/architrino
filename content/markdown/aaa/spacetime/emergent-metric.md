### Emergent Metric: Absolute Frame vs. Effective Geometry

#### Ontological Picture

- **Substrate**: A fixed Euclidean 3D void with absolute time $t$. Coordinates $(x,y,z)$ never move or curve.
- **Medium**: A pervasive sea of coupled pro/anti Noether cores (tri-binary assemblies) that we call the *spacetime medium* or *Noether-core sea*.
- **$\mathbb{U}_{\text{now}}$ universe-state perspective**: A conceptual observer in the absolute frame who knows:
  - The full architrino microstate $S(t)$,
  - The instantaneous state of the Noether-core sea (density $\rho_{\text{core}}(x,t)$, alignment, stress),
  - The effective potential field $\Phi_{\text{eff}}(x,t)$ and its gradients.

From this vantage point, there is only:
- Flat Euclidean geometry $\delta_{ij}$,
- A dynamic medium (Noether cores) moving and rearranging in that geometry.

#### Canonical Symbols (Spacetime)

Use the following symbols consistently across spacetime chapters:

- $n(x,t)$: normalized Noether-core density.
- $\rho_{\text{core}}(x,t)=\rho_{\text{core},0}\,n(x,t)$: physical core density.
- $\Phi_{\text{eff}}(x,t)$: constitutive potential inferred from the clock channel.
- $\Phi_N(x,t)$: Newtonian benchmark potential used for weak-field matching.
- $U\equiv -\Phi_N>0$: positive weak-field PPN potential variable.

#### What “Metric” Means Here

- **Effective metric $g^{\text{eff}}_{\mu\nu}(x)$** is *not* a fundamental property of the void. It is a derived description of:
  - How assembly-based clocks tick,
  - How assembly-based rulers measure distances,
  - How signals (tri-binary photons, GWs) propagate through the Noether-core sea.

We define $g^{\text{eff}}_{\mu\nu}$ operationally:

> At each point $x$, choose an idealized physical observer (tri-binary clock + ruler), and infer a local metric from their measured time intervals and spatial separations.

The $\mathbb{U}_{\text{now}}$ universe-state perspective then maps:

$(\delta_{ij}, n(x,t), \Phi_{\text{eff}}(x,t), \nabla\Phi_{\text{eff}}(x,t), \text{medium alignment}) \;\Rightarrow\; g^{\text{eff}}_{\mu\nu}(x)$

#### Refraction vs. Curvature

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
   $g^{\text{eff}}_{00} \approx -\left(1 + \frac{2\Phi_N}{c^2}\right), \quad g^{\text{eff}}_{ij} \approx \delta_{ij}\left(1 - \frac{2\Phi_N}{c^2}\right).$

#### Minimal Weak-Field Constitutive Map (for PPN Matching)

To make the mapping functional explicit at first post-Newtonian order, use:
$$
g^{\text{eff}}_{00}(\mathbf{x})=
-\left(1+\frac{2\Phi_N(\mathbf{x})}{c_f^2}\right)
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_f^4}\right),
$$
$$
g^{\text{eff}}_{ij}(\mathbf{x})=
\delta_{ij}\left(1-2\gamma_{\text{eff}}\frac{\Phi_N(\mathbf{x})}{c_f^2}\right)
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_f^4}\right).
$$

Equivalent refractive form:
$$
n(\mathbf{x})\equiv \frac{c_f}{c_{\text{eff}}(\mathbf{x})}
=1-(1+\gamma_{\text{eff}})\frac{\Phi_N(\mathbf{x})}{c_f^2}
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_f^4}\right),
$$
so travel time on a Euclidean anchor path $\Gamma$ is
$$
t[\Gamma]=\frac{1}{c_f}\int_\Gamma n(\mathbf{x})\,ds.
$$

This is the concrete first-order realization of
$$
(\delta_{ij},n,\text{stress},\Phi_N)\mapsto g^{\text{eff}}_{\mu\nu},
$$
with $\gamma_{\text{eff}}$ the observable refraction/space-curvature coefficient to be fitted from Shapiro-delay data.  
Implementation of the corresponding one-way delay integral is given in [PPN-parameters](./PPN-parameters.md#explicit-weak-field-refractive-shapiro-map-ppn-gamma).

### Closure Program Interface (metric constitutive map)

This chapter is the constitutive anchor for the gravity-side closure:
$$
(\delta_{ij},n,\Phi_{\text{eff}},\text{stress})\mapsto g^{\text{eff}}_{\mu\nu}.
$$

Distribute proof obligations as:
- constitutive metric form and observer map: **this chapter**,
- explicit 1PN observables/estimators: `spacetime/ppn-parameters.md`,
- clock-law extraction and coefficient fitting: `spacetime/proper-time-and-time-dilation.md`,
- final acceptance thresholds: `validation/constraint-ledger.md`.

Minimal closure condition:
1. Eikonal path-time extremals in the refractive picture match null geodesics of $g^{\text{eff}}_{\mu\nu}$ in weak field.
2. The same constitutive coefficients predict Shapiro delay, lensing, and redshift without re-fitting per observable.

### Weak-Field Geodesic Handoff (Constitutive Subclass)

For the local medium-rest frame $\hat{u}^\mu=(1,0,0,0)$, use
$$
g_{\mu\nu}^{\text{eff}}(x)
=
\Omega^{-2}(n,\lambda)\left[
\eta_{\mu\nu}
+
\left(1-\xi^{-2}(x)\right)\hat{u}_\mu\hat{u}_\nu
\right].
$$
Then
$$
g_{00}^{\text{eff}}=-\Omega^{-2}\xi^{-2},
\qquad
g_{ij}^{\text{eff}}=\Omega^{-2}\delta_{ij}.
$$

Define the clock-channel potential
$$
\Phi_{\text{eff}}(x)\equiv -c_f^2\ln\!\big(\Omega(x)\xi(x)\big),
\qquad
\Omega(x)\xi(x)=e^{-\Phi_{\text{eff}}(x)/c_f^2}.
$$

For a slowly moving test assembly in a stationary medium, the dominant connection piece is
$$
\Gamma^i_{00}
=
-\frac{1}{2}g_{\text{eff}}^{ij}\partial_j g_{00}^{\text{eff}}
=
-\xi^{-2}\,\partial^i\ln(\Omega\xi)
=
\xi^{-2}\frac{\partial^i\Phi_{\text{eff}}}{c_f^2}.
$$
Using $dx^0/dt\approx c_f$, the spatial geodesic equation gives
$$
\frac{d^2x^i}{dt^2}
\approx
-\Gamma^i_{00}\left(\frac{dx^0}{dt}\right)^2
=
-\xi^{-2}\nabla^i\Phi_{\text{eff}}.
$$
Hence, in weak field ($\xi\to 1$),
$$
\frac{d^2\mathbf{x}}{dt^2}=-\nabla\Phi_{\text{eff}},
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
