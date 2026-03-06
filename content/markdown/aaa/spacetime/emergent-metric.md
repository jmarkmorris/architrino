### Emergent Metric: Absolute Frame vs. Effective Geometry

#### Ontological Picture

- **Substrate**: A fixed Euclidean 3D void with absolute time $t$. Coordinates $(x,y,z)$ never move or curve.
- **Medium**: A pervasive sea of coupled pro/anti Noether cores (tri-binary assemblies) that we call the *spacetime medium* or *Noether-core sea*.
- **$\mathbb{U}_{\text{now}}$ universe-state perspective**: A conceptual observer in the absolute frame who knows:
  - The full architrino microstate $S(t)$,
  - The instantaneous state of the Noether-core sea (density $\rho_{\text{core}}(x,t)$, alignment, stress),
  - The potential field $\Phi(x,t)$ and its gradients.

From this vantage point, there is only:
- Flat Euclidean geometry $\delta_{ij}$,
- A dynamic medium (Noether cores) moving and rearranging in that geometry.

#### What “Metric” Means Here

- **Effective metric $g^{\text{eff}}_{\mu\nu}(x)$** is *not* a fundamental property of the void. It is a derived description of:
  - How assembly-based clocks tick,
  - How assembly-based rulers measure distances,
  - How signals (tri-binary photons, GWs) propagate through the Noether-core sea.

We define $g^{\text{eff}}_{\mu\nu}$ operationally:

> At each point $x$, choose an idealized physical observer (tri-binary clock + ruler), and infer a local metric from their measured time intervals and spatial separations.

The $\mathbb{U}_{\text{now}}$ universe-state perspective then maps:

$(\delta_{ij}, \rho_{\text{core}}(x,t), \Phi(x,t), \nabla\Phi(x,t), \text{medium alignment}) \;\Rightarrow\; g^{\text{eff}}_{\mu\nu}(x)$

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
   - $\rho_{\text{core}}(x)$ (Noether-core sea density),
   - Stress/strain of the medium,
   - Potential $\Phi(x)$ from matter assemblies.
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
(\delta_{ij},\rho_{\text{core}},\text{stress},\Phi_N)\mapsto g^{\text{eff}}_{\mu\nu},
$$
with $\gamma_{\text{eff}}$ the observable refraction/space-curvature coefficient to be fitted from Shapiro-delay data.  
Implementation of the corresponding one-way delay integral is given in [PPN-parameters](./PPN-parameters.md#explicit-weak-field-refractive-shapiro-map-ppn-gamma).

### Closure Program Interface (metric constitutive map)

This chapter is the constitutive anchor for the gravity-side closure:
$$
(\delta_{ij},\rho_{\text{core}},\Phi,\text{stress})\mapsto g^{\text{eff}}_{\mu\nu}.
$$

Distribute proof obligations as:
- constitutive metric form and observer map: **this chapter**,
- explicit 1PN observables/estimators: `spacetime/ppn-parameters.md`,
- clock-law extraction and coefficient fitting: `spacetime/proper-time-and-time-dilation.md`,
- final acceptance thresholds: `validation/constraint-ledger.md`.

Minimal closure condition:
1. Eikonal path-time extremals in the refractive picture match null geodesics of $g^{\text{eff}}_{\mu\nu}$ in weak field.
2. The same constitutive coefficients predict Shapiro delay, lensing, and redshift without re-fitting per observable.

### Weak-Field Geodesic and PPN Extraction (Constitutive Subclass)

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

#### PPN Coefficients from the Same Subclass

Let $U\equiv -\Phi_{\text{eff}}>0$.

Time-time channel:
$$
g_{00}^{\text{eff}}
=
-(\Omega\xi)^{-2}
=
-e^{2\Phi_{\text{eff}}/c_f^2}
=
-1+2\frac{U}{c_f^2}-2\frac{U^2}{c_f^4}+O(c_f^{-6}).
$$
Comparing to
$$
g_{00}^{\text{PPN}}
=
-1+2\frac{U}{c_f^2}-2\beta_{\text{PPN}}\frac{U^2}{c_f^4}+\cdots
$$
yields
$$
\beta_{\text{PPN}}=1
$$
for this exponential clock-law subclass.

Spatial channel:
$$
g_{ij}^{\text{eff}}=\Omega^{-2}\delta_{ij}
\stackrel{!}{=}
\left(1+2\gamma_{\text{PPN}}\frac{U}{c_f^2}\right)\delta_{ij}
=
\left(1-2\gamma_{\text{PPN}}\frac{\Phi_{\text{eff}}}{c_f^2}\right)\delta_{ij}.
$$
Write
$$
\Omega=1+\omega_1\frac{\Phi_{\text{eff}}}{c_f^2}+O(c_f^{-4}),
\qquad
\xi=1+\xi_1\frac{\Phi_{\text{eff}}}{c_f^2}+O(c_f^{-4}).
$$
Then
$$
\omega_1+\xi_1=-1
$$
from $\Omega\xi=e^{-\Phi_{\text{eff}}/c_f^2}$, and
$$
\gamma_{\text{PPN}}=\omega_1=-1-\xi_1.
$$
So $\gamma_{\text{PPN}}$ is fixed by first-order partitioning of the clock channel between volumetric scaling ($\Omega$) and shape scaling ($\xi$).
