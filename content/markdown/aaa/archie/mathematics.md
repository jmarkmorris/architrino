# Mathematics

# Mathematical Terminology (Canonical Dialect)

This table lists the symbols and mathematical terms used across the Geometrical Model of Nature and explains their meaning in this project’s context.

| Symbol / Term | Meaning in this project | Extended explanation |
| --- | --- | --- |
| $\mathcal{M} = \mathbb{R} \times \mathbb{R}^3$ | Absolute timespace: global, oriented time × Euclidean 3-space; no non-degenerate 4D metric. | Treat as a product manifold with a global time coordinate and a flat 3D Riemannian metric; differential operators split into time derivatives d/dt and spatial operators on slices $\Sigma_t$. Worldlines are ODEs in $t$, and fields are distributions on $\Sigma_t$ parametrized by $t$. |
| $t$ | Absolute time (dimensionless after choosing $T_0$); increases globally. | Single global independent variable for dynamics. After selecting $T_0$, $t$ is dimensionless; derivatives w.r.t. $t$ define $\mathbf{v}$ and $\mathbf{a}$. Monotonicity enforces causal order and precludes closed time loops. |
| $\mathbb{U}_{\text{now}} \equiv S(t)$ | Complete ontic universe state on simultaneity slice $\Sigma_t$ at global time $t$. | Canonical symbol for the "state of the universe now": $S(t)=\{(\mathbf{x}_i(t),\mathbf{v}_i(t),q_i,\ldots)\}$, including required path-history/provenance bookkeeping and self-hit history for deterministic evolution. This is simulation ground truth and is not an observer. |
| $\Sigma_t$ | Simultaneity slice at time $t$: $\{t\} \times \mathbb{R}^3$. | A 3D hypersurface carrying $h_{ij}$ and volume element $dV$; gradients, divergences, and Laplacians act within $\Sigma_t$. Spacetime integrals use $dt\,dV$. |
| $h_{ij} = \delta_{ij}$ | Euclidean spatial metric on $\Sigma_t$; implements dot products and norms. | Flat metric used for inner products and norms; in spherical coordinates it becomes $\mathrm{diag}(1,r^2,r^2\sin^2\theta)$. Raising/lowering is trivial with $h^{ij}=\delta^{ij}$. |
| $\mathbf{x},\, \mathbf{s}$ | Spatial position vectors in $\mathbb{R}^3$; vectors are bold, e.g., $\mathbf{s}(t)$. | Spatial vectors valued in $\mathbb{R}^3$. The worldline $\mathbf{s}(t)$ is assumed absolutely continuous so $\mathbf{v}=d\mathbf{s}/dt$ exists a.e.; we do not assemble 4-vectors. |
| $\mathbf{v} = d\mathbf{s}/dt,\ \mathbf{a} = d\mathbf{v}/dt$ | Velocity and acceleration vectors (boldface by convention). | Kinematic derivatives with respect to $t$. Under impulsive forces $\mathbf{v}$ has bounded variation; with mollification ($\eta>0$) both $\mathbf{v}$ and $\mathbf{a}$ are continuous and classical ODE theory applies. |
| $\lVert\cdot\rVert$ | Euclidean norm (length) induced by $h_{ij}$. | The norm induced by $h$; used for separations $r$, speeds, and lengths; coordinate-independent. |
| hat (ˆ) | Unit vector; e.g., $\hat{\mathbf{r}} = \mathbf{r}/\lVert\mathbf{r}\rVert$. | Normalization to unit length. $\hat{\mathbf{r}}$ fixes the line of action. At $r=0$ the direction is undefined; such center hits contribute no net push by symmetry. |
| $v$ (field speed) | Propagation speed of causal isochrons; set to $1$ by units ($v=1$). | Fixed propagation speed for the causal surfaces. Nondimensionalization sets $v=1$ so speeds are pure numbers; it bounds signal propagation ($c_{\max}$) and appears in the constraint $r=v(t-t_0)$ and in delta change-of-variables. |
| $\kappa > 0$ | Universal coupling constant (absorbs geometric normalizations). | A scale factor absorbing geometric constants (e.g., $4\pi$, $1/v$ Jacobians). Varying $\kappa$ rescales all per-hit accelerations and shifts emergent scales such as $d_0$ and $t_0$. |
| $\epsilon > 0$ | Unit charge magnitude; identified with $\lvert e\rvert/6$. | Fundamental charge magnitude for architrinos. Identifying $\epsilon$ with the magnitude of $e$ divided by 6 makes observed quark charges become integers in units of $\epsilon$, simplifying conservation. |
| $q,\, q'$ | Intrinsic architrino charges for source and receiver (each equals $\pm\epsilon$). | Intrinsic, fixed signs $\pm\epsilon$ for source and receiver. They enter accelerations through the magnitude of $q q'$ and the sign $\sigma_{q q'}$. |
| $\sigma_{q q'} = \mathrm{sign}(q\,q')$ | Interaction sign: $+1$ like-on-like (repulsion), $-1$ unlike (attraction). | The signum of $q q'$. It selects repulsion vs. attraction by multiplying the radial unit vector in the EOM. |
| $r,\, \hat{\mathbf{r}}$ | Separation and radial direction from the source’s emission position to the receiver at time $t$ (“now”). | $r$ is the Euclidean distance between receiver-now and source-at-$t_0$; $\hat{\mathbf{r}}$ is the associated unit vector. The $1/r^2$ factor reflects causal wake surface density. |
| $t_0,\ \tau = t - t_0$ | Causal emission time and delay to reception. | $t_0$ labels a causally connected emission; $\tau=t-t_0$ is the travel time. Both appear in the root condition and in distributional expressions. |
| $\mathcal{C}_j(t)$ | Causal set of emission times of source $j$ that reach the receiver at time $t$. | The set of solutions of $F(t_0;t)=\lVert\mathbf{s}_{o'}(t)-\mathbf{s}_j(t_0)\rVert - v(t-t_0)=0$ with $t_0 < t$. For $\lVert\mathbf{v}_j\rVert<v$ and transverse crossings, a unique smooth branch follows from the implicit function theorem; multiple roots can occur otherwise. |
| $\delta(r - v\tau),\ \delta_{S_r}$ | Surface delta on expanding causal isochron; surface measure on surface $S_r$. | $\delta(r-v\tau)$ represents a razor-thin causal isochron in radial coordinates, while $\delta_{S_r}$ is the surface delta on $S_r$. Normalizations ensure total emission integrates to $q$. |
| $\delta_\eta(\cdot)$ | Mollified (Gaussian) causal surface with width $\eta > 0$ for smooth dynamics. | A Gaussian mollifier of width $\eta$ that preserves total mass and regularizes forces to be continuous in time; limits are taken in the weak sense as $\eta\to 0$. |
| $H(\tau)$ | Heaviside step; convention $H(0)=0$ (no instantaneous self-kick). | Enforces causality (no advanced effects). With $H(0)=0$ it removes coincident-time self-kicks; in distributions it gates support to $\tau>0$. |
| $\Phi,\ \Phi_\eta$ | Potential and mollified potential from superposed causal wake surfaces. | Potential from superposing all wake surface contributions; $\Phi_\eta$ smooths the distribution so $\nabla\Phi_\eta$ exists pointwise and can be used to verify energy identities over resolved windows. |
| $c_f$ | Field propagation speed in dimensional spacetime chapters; equivalent to $v$ after nondimensionalization. | Spacetime chapters often write $c_f$ to compare with modern-relativity notation; in canonical nondimensional units used here, $c_f=v=1$. |
| $\rho_{\text{core}}(\mathbf{x},t)$ | Physical Noether-core density field. | Mass/number density of the spacetime medium in physical units. In spacetime chapters this is commonly normalized to $n$. |
| $n(\mathbf{x},t)\equiv \rho_{\text{core}}(\mathbf{x},t)/\rho_{\text{core},0}$ | Canonical normalized Noether-core density. | Dimensionless density used in constitutive maps and effective metric handoff. Recover physical density by multiplying by the reference value $\rho_{\text{core},0}$. |
| $\Phi_N$ | Newtonian benchmark potential used for weak-field matching. | External/source potential used for 1PN/PPN comparison formulas (e.g., Shapiro delay, redshift, precession benchmarks). |
| $\Phi_{\text{eff}}$ | Constitutive effective potential inferred from clock and metric channels. | Defined in spacetime closure as $\Phi_{\text{eff}}=-c_f^2\ln(\Omega\xi)$; governs weak-field geodesic acceleration in the observer sector. |
| $U\equiv-\Phi_N,\quad U_{\Phi}\equiv-\Phi_{\text{eff}}$ | Positive potential conventions for expansions. | Use $U$ for PPN benchmark expansions and $U_{\Phi}$ when expanding directly in constitutive potential. In weak-field closure, $U_{\Phi}=U+O(U^2/c_f^2)$. |
| $\beta\equiv v/c_f,\ \gamma\equiv(1-\beta^2)^{-1/2}$ | Drift-speed parameter and Lorentz factor in emergent-kinematics closure. | In spacetime closure chapters, $v$ denotes assembly drift speed and $c_f$ denotes field speed; in core nondimensional dynamics one often sets $c_f=1$. |
| $\xi\equiv 1/\gamma,\ \lambda$ | Shape and scale deformation channels for moving assemblies. | $\xi$ controls directional contraction of effective exclusion geometry; $\lambda$ controls isotropic scale response. Together with $n$ they feed the constitutive metric map. |
| $\Omega(n,\lambda)$ | Conformal constitutive factor in the effective metric map. | Encodes density/scale response of the Noether-core medium and multiplies clock/ruler channels in $g_{\mu\nu}^{\text{eff}}$. |
| $\hat{u}^\mu$ | Local medium 4-velocity label used in effective-metric constitutive formulas. | Bookkeeping vector for observer-sector metric construction; it is not a fundamental substrate 4-vector ontology. |
| $g_{\mu\nu}^{\text{eff}},\ g_{\text{eff}}^{\mu\nu}$ | Effective observer metric and its inverse. | Derived constitutive object mapping medium state to operational clocks/rulers and null propagation; not a fundamental metric of the Euclidean void. |
| $\Gamma^\lambda_{\mu\nu}(g^{\text{eff}})$ | Effective affine connection built from $g_{\mu\nu}^{\text{eff}}$. | Governs observer-sector geodesic equations and weak-field acceleration extraction in emergent-gravity chapters. |
| $U_{\text{eff}}$ | Effective cycle-averaged potential on an attractor branch. | In kinematics closure it is the potential whose Hessian yields $K_{\parallel},K_{\perp}$; distinct from weak-field PPN variables $U,U_{\Phi}$ and from local dynamics energy $U_{\text{pot}}$. |
| $K_{\parallel},K_{\perp}$ | Longitudinal/transverse stiffness channels of translating attractors. | Cycle-averaged Hessian projections of the causal-wake potential; their ratio determines anisotropic shape response. |
| $(k_2,\ell_2,k_4,\ell_4)$ | Quadratic/quartic closure coefficients in the $\beta$ expansion of stiffness channels. | Matched set used for $O(\beta^4)$ Lorentz-kinematics closure; deviations map directly to preferred-frame leakage diagnostics. |
| $\epsilon_{\text{LV}},\ \Delta_{\text{tw}}(\beta)$ | Preferred-frame leakage scale and two-way anisotropy mismatch diagnostic. | $\epsilon_{\text{LV}}$ bounds non-Lorentz residual terms; $\Delta_{\text{tw}}$ is the measurable round-trip anisotropy proxy. |
| $\gamma_{\text{PPN}},\ \beta_{\text{PPN}},\ (\alpha_1,\alpha_2,\alpha_3)$ | Standard weak-field PPN parameters used for observational closure. | $\gamma_{\text{PPN}}$ controls refraction/space-curvature response, $\beta_{\text{PPN}}$ nonlinear clock channel, and $\alpha_i$ preferred-frame leakage. |
| $(\Xi_1,\Xi_2,\Xi_3,\Xi_4)$ | Constitutive preferred-frame leakage coefficients in weak-field metric expansion. | Map to $(\alpha_1,\alpha_2,\alpha_3)$ in `spacetime/ppn-parameters.md`; all must vanish for zero-leakage closure. |
| $(H,M,L),\ (r_H,r_M,r_L),\ (\omega_H,\omega_M,\omega_L)$ | Tri-binary layer labels with characteristic radii and frequencies. | Used in adiabatic-decoupling arguments; closure assumes strong hierarchy $r_H\ll r_M\ll r_L$ and $\omega_H\gg\omega_M\gg\omega_L$. |
| $\mathcal{D}_{23}\equiv\|\mathbf{c}^{(3)}-\mathbf{c}^{(2)}\|_W$ | Binary-vs-tri-binary closure mismatch norm. | Quantifies universality of Lorentz closure coefficients under hierarchy averaging; bounded by quadrupole scaling in the closure program. |
| $\mathcal{L}_{\text{eff}}$ | Effective coarse-grained Lagrangian density after averaging fast modes. | Used in dynamics/gauge chapters to encode observer-scale field behavior induced by causal-wake microdynamics. |
| $a(t),\ H(t)=\dot a/a,\ \Omega_m,\ \Omega_\Lambda$ | Effective cosmology summary variables (observer side). | In this framework these are coarse-grained descriptors of medium evolution, not fundamental geometry variables of the Euclidean container. |
| $D_\mu,\ g,\ g',\ \theta_W,\ Y$ | Effective electroweak gauge-sector symbols in assembly-level closure mappings. | $D_\mu$ is the covariant derivative; $(g,g',\theta_W,Y)$ follow Standard-Model notation when mapping architrino assemblies to observer-level gauge phenomenology. |
| $U_{\text{pot}} = q'\,\Phi_\eta$ | Local potential-energy variable in the dynamics sector (mollified; weak limit as $\eta\to 0$). | Scalar potential energy for a receiver in a mollified field. With $\mathbf{F}=-\nabla U_{\text{pot}}$, work satisfies $\Delta E_k=-\Delta U_{\text{pot}}$ on intervals that resolve the mollifier. |
| $\mathbf{F} = -\nabla U_{\text{pot}}$ | Force from the potential (pointwise for $\Phi_\eta$). | Equivalent to the per-hit law after integrating across a thin causal wake surface. Exact pointwise equality holds for $\Phi_\eta$; for $\eta\to 0$ it is interpreted in the distributional/integrated sense. |
| $a_{o'\leftarrow j}(t; t_0)$ | Per-hit acceleration from source $j$ emitted at $t_0$ (purely radial, $\propto 1/r^2$). | The contribution from a single causal root: purely radial, falling as $1/r^2$. The total acceleration sums these over all $j$ and all $t_0\in\mathcal{C}_j(t)$. |
| $v_r,\, v_\perp$ | Radial and transverse components of receiver velocity relative to $\hat{\mathbf{r}}$. | Decompose $\mathbf{v}$ by orthogonal projection onto $\hat{\mathbf{r}}$. Only $v_r$ changes instantaneously at a hit; instantaneous power is $\mathbf{a}\cdot\mathbf{v}$ equal to the magnitude of $\mathbf{a}$ times $v_r$. |
| $d_0,\, t_0$ (emergent) | Minimal binary radius and characteristic fastest period from dynamics. | Emergent scales set by balance of delayed attraction and self-repulsion. They depend on $\kappa\,\epsilon^2$ and motion details but act as robust attractors in symmetric binaries. |
| $\mathrm{SS}_a(t)$ | “Wake locus” of worldline $a$ at observation time $t$ (union of all causal surfaces). | The family of all causal surfaces emitted along a worldline, evaluated at time $t$; a geometric picture of which causal structures can currently act at each point. |
| $\Delta$ | Euclidean Laplacian on $\Sigma_t$ ($\Delta = \partial_x^2 + \partial_y^2 + \partial_z^2$). | The standard Euclidean Laplacian acting on functions on $\Sigma_t$; it appears in continuum limits and energetics checks for mollified fields. |
| $\nabla$ | Nabla operator (gradient/divergence/curl). | Vector differential operator used to define $\nabla f$, $\nabla\cdot \mathbf{F}$, and $\nabla\times \mathbf{F}$. We avoid $\mathbf{v}\times\mathbf{B}$ constructs in the canonical law. |
| $\nabla f$ | Gradient of scalar $f$. | Vector field of partial derivatives; points in direction of steepest increase; used for spatial derivatives on $\Sigma_t$. |
| $\nabla\cdot \mathbf{F}$ | Divergence of vector field $\mathbf{F}$. | Scalar measuring net outflow; Gauss-like flux form; identity: $\nabla\cdot(\nabla\times \mathbf{F}) = 0$. |
| $\nabla\times \mathbf{F}$ | Curl of vector field $\mathbf{F}$. | Vector measuring local rotation; identity: $\nabla\times(\nabla f) = \mathbf{0}$. Canonical law uses no right-hand-rule cross-product forces. |
| $\nabla^2 f$ | Laplacian of $f$ (alt. notation for $\Delta f$). | Equal to $\partial_x^2 f + \partial_y^2 f + \partial_z^2 f$ in Cartesian frames; we generally write $\Delta f$. |
| $E(3)$ | Euclidean group of spatial symmetries (translations ⋊ rotations). | The spatial isometry group of $h_{ij}$. Statements are frame-invariant under translations and rotations, even though finite field speed singles out a preferred rest frame for dynamics. |
| $c_{\max} \equiv v$ | Maximal signal speed (field speed of causal surfaces). | Upper bound on signal propagation; defines the causal surface radius $r=c_{\max}(t-t_0)$ and replaces lightcones by expanding causal surfaces in this model. |
| EOM | master equation of Motion: delayed, purely radial, inverse-square per-hit law. | Shorthand for the canonical, delayed, radial-only equation of motion. It is event-driven at $\eta=0$ and becomes a smooth ODE system under mollification. |
| Mollify / Mollification | Replace distributions by smooth approximations, e.g., $\delta\!\to\!\delta_\eta$ (Gaussian of width $\eta$), to obtain $C^1$ trajectories and well-defined $\nabla\Phi_\eta$. | Replace distributions by smooth kernels (typically Gaussian) to obtain $C^1$ trajectories and well-defined spatial gradients; $\eta$ sets the smoothing scale relative to local geometry. |
| Regularize / Regularization | The process of introducing $\eta>0$ (or similar) to control singularities; interpret $\eta\to 0$ in the weak/integrated sense. | Introduce a small parameter (e.g., $\eta$) to control divergences so forces and energies remain finite; results are interpreted via limits of integrals as the regulator vanishes. |
| Normalize / Normalization | Choose constants (e.g., $1/(4\pi r^2)$) and Jacobians so total emission integrates to the source strength $q$; ensures conserved totals. | Pick prefactors so integrating the causal wake surface over space at fixed time returns the source strength $q$; includes the $1/(4\pi r^2)$ surface density and Jacobians from variable changes. |
| Change of variables (delta) | Identity $\delta(r - v\tau) = \dfrac{1}{v}\,\delta\!\big(\tau - r/v\big)$; the $1/v$ factor is a Jacobian from variable substitution. | Use the identity $\delta(g)=\sum \delta(x-x_i)/\lvert g'(x_i)\rvert$ with $g(\tau)=r-v\tau$ to convert between $\tau$ and $r$; the derivative $g'=-v$ yields the $1/v$ factor in time integrals. |
| Non-dimensionalize | Choose $L_0, T_0$ so $v=L_0/T_0=1$; all speeds become dimensionless ratios to $v$. | Pick $L_0, T_0$ with $v=L_0/T_0=1$ so speeds are pure numbers; reduces parameter count and clarifies asymptotic regimes. |
| Degenerate / Non-degenerate | Degenerate: determinant zero (e.g., metric not invertible); non-degenerate: invertible. We use no non-degenerate 4D metric; spatial metric $h_{ij}$ is non-degenerate. | “Degenerate” refers to non-invertible bilinear forms. The model avoids a non-degenerate 4D metric and instead uses a positive-definite spatial metric $h$ that is invertible. |
| Dot product | Euclidean scalar product: $\mathbf{u}\cdot\mathbf{v} = h_{ij}\,u^i v^j$. | The Euclidean inner product; used to compute projections, angles, and kinetic quantities on $\Sigma_t$. |
| Norm | Length from $h_{ij}$: $\lVert \mathbf{v}\rVert = \sqrt{h_{ij} v^i v^j}$. | Induced by the dot product; used for lengths, speeds, and distances, e.g., $r=\lVert\mathbf{x}-\mathbf{y}\rVert$. |
| Coupling | Overall interaction strength set by $\kappa>0$ (absorbs geometric normalizations). | Synonym for the interaction scale $\kappa$; changing it rescales accelerations and modifies emergent scales. |
| Intrinsic | Property of an object independent of motion or environment (e.g., intrinsic charge $q=\pm\epsilon$). | Attributes fixed to an object independent of kinematics or environment (e.g., charge sign and magnitude), contrasted with emergent or apparent properties of assemblies. |
| Causal | Respecting propagation delay; emission time $t_0$ must satisfy $r=v(t-t_0)$ to influence “now.” | Qualifies constructions that respect finite-speed propagation; only emission times satisfying $r=v(t-t_0)$ contribute to present acceleration. |
| Gaussian | The mollifier kernel $\delta_\eta$ used to replace $\delta$, producing smooth wake surfaces of width $\eta>0$. | A normalized bell-shaped kernel used as an approximate identity; parameter $\eta$ controls width and convergence as $\eta\to 0$. |
| Heaviside | Step function $H(\tau)$; convention $H(0)=0$ (no instantaneous self-kick). | Step function used to restrict distributions to $\tau\ge 0$; with $H(0)=0$ it removes coincident-time contributions in self-interactions. |
| Hit | A causal intersection event: some $t_0\in\mathcal{C}_j(t)$ where a causal wake surface reaches the receiver. | A solution $t_0\in\mathcal{C}_j(t)$. In the impulsive picture it produces a velocity jump; under mollification it appears as a brief, finite push. |
| Surrogate location | Stationary, hypothetical emitter position chosen along the receiver’s current unoriented line of action that, together with an adjusted emission time, reproduces the same instantaneous hit. | An inference/visualization device: at an instant, any hit can be recast to a stationary surrogate on line L; per-wavefront amplitude is unchanged (no emitter-speed weighting), only causal timing shifts. |
| Superposition | Linear addition of fields/accelerations from all sources/wake surfaces at a point and time. | Linearity at the level of distributions: contributions from all sources add. Near-field terms dominate due to $1/r^2$ and phase cancellations at large $r$. |
| Transverse | Component orthogonal to $\hat{\mathbf{r}}$; e.g., $\mathbf{v}_\perp$ with $\mathbf{v}_\perp\cdot \hat{\mathbf{r}}=0$. | Component orthogonal to $\hat{\mathbf{r}}$; unchanged instantaneously by a single hit but can change over time as $\hat{\mathbf{r}}$ rotates with the geometry. |
| Radial | Along the line of action $\hat{\mathbf{r}}$ (e.g., $v_r = \mathbf{v}\cdot\hat{\mathbf{r}}$). | Along the line $\hat{\mathbf{r}}$; every per-hit force is collinear with $\hat{\mathbf{r}}$ and thus updates the radial component of motion. |
| Worldline | Time-parameterized path $\mathbf{s}(t)$ of a particle in space; history up to $t_{\text{now}}$ is its provenance. | A map $t\mapsto \mathbf{s}(t)$ with absolute continuity; under impulses $\mathbf{v}$ has bounded variation. Spatial arclength equals the time integral of the speed over an interval. |
| Laplacian | Spatial second-derivative operator on $\Sigma_t$; in Cartesian frames $\Delta = \partial_x^2 + \partial_y^2 + \partial_z^2$. | Same operator as $\Delta$; included for terminological clarity when not using the symbol; used in spatial PDE analogies and energy checks. |
| Singularity | Idealized divergence (e.g., $1/r^2$ at $r=0$); handled by mollification/weak limits. | Non-integrable behavior in pointwise expressions (e.g., $1/r^2$ at $r=0$); handled by excluding measure-zero cases and by regularization with $\delta_\eta$. |
| Jacobian | Factor from change of variables; e.g., $\delta(r - v\tau) = \dfrac{1}{v}\,\delta\!\big(\tau - r/v\big)$ has Jacobian $1/v$. | Multiplicative factor from variable changes ensuring measure preservation in integrals (e.g., the $1/v$ from $\tau\leftrightarrow r$ substitutions). |

Notes:
- Bold symbols denote vectors; hats denote unit vectors; $\lVert\cdot\rVert$ denotes norms.
- All speeds are nondimensional after choosing $L_0, T_0$ so that $v = L_0/T_0 = 1$.
- Assemblies are dynamical geometries of architrino transceivers (not point particles). Their effective field/wave behavior is the net superposition of their constituent architrinos evolving under the equation of motion; any “emission/absorption” attributed to an assembly is shorthand for this superposed dynamics.
- Vocabulary: Use “expanding causal isochrons” as the canonical term for emitted structures; “wavefront” may be included once as a parenthetical synonym at first use. Avoid generic “spheres” or “ridges” in technical statements (reserve “ridges” for analogies).
- This glossary canonicalizes cross-chapter symbols. Specialized chapter-local symbols (e.g., CKM matrix entries, isotope labels, detector-specific nuisance parameters) should be defined at first use in their own documents.

---

# Mathematical Style Guide (Canonical Dialect)

Purpose: Define a single, canonical mathematical and geometrical dialect for the Geometrical Model of Nature. All technical documents should adhere to this guide. Equations are presented in display math for clarity where appropriate.

---

## Background spaces and sets

- Timespace:
  $$
  \mathcal{M} = \mathbb{R}\times \mathbb{R}^3
  $$
  with coordinates $(t, x, y, z)$.
  $$
  \Sigma_t = \{t\}\times \mathbb{R}^3
  $$
  are simultaneity slices (Euclidean 3-space snapshots).
- Vectors and norms:
  - Spatial vectors are bold: $\mathbf{s}, \mathbf{v}, \mathbf{a}$.
  - Unit vectors carry hats: $\hat{\mathbf{r}}$.
  - Norms use double bars: $\|\cdot\|$.
- Indices:
  - Components indexed by $i, j \in \{1,2,3\}$ with $\delta_{ij}$.

Plain language: One global clock t and ordinary 3D space; we write vectors in bold, unit directions with hats, and lengths with double bars.

---

## Kinematics (Newton–Cartan/Galilean background)

- Absolute time $t$ is universal and oriented; durations are

  $$
  \Delta t = |\,t_2 - t_1\,|.
  $$

- Space is Euclidean with metric

  $$
  h_{ij} = \delta_{ij}\quad\text{on each slice }\Sigma_t.
  $$

  Notation: We use $h_{ij}$ exclusively for the spatial metric; do not use $g_{ij}$.

  Here $\delta_{ij}$ is the Kronecker delta (identity). It defines the Euclidean dot product and norm:
  $u\!\cdot\!v = h_{ij}u^i v^j$ and $\|v\|^2 = h_{ij}v^i v^j$. Raising/lowering is trivial with $h^{ij}=\delta^{ij}$.
  In Cartesian frames, $\Gamma^{i}{}_{jk}=0$, so covariant derivatives equal partial derivatives and geodesics are straight; curvature vanishes identically. In curvilinear coordinates (e.g., spherical), $h_{ij}$ takes the flat-space form $\mathrm{diag}(1, r^2, r^2\sin^2\theta)$, still representing the same flat geometry.
- There is no 4D non-degenerate metric; we do not mix time and space into a single line element.
- Worldlines:
  - $\mathbf{x}: I \subset \mathbb{R} \to \mathbb{R}^3,\ t \mapsto \mathbf{x}(t)$, absolutely continuous; $\mathbf{v} = d\mathbf{x}/dt$, $\mathbf{a} = d\mathbf{v}/dt$.

Plain language: Objects move as dots in 3D through successive instants; speeds and distances are measured separately from time.

---

## Propagation and causal set (delayed-only)

- Field speed is $v$; by default we non-dimensionalize to $v=1$.
- Causal-time condition (CT):
  $$
  \tau = t - t_0,\quad r = \|\mathbf{s}_{o'}(t) - \mathbf{s}_j(t_0)\|,\quad r = v\,\tau
  $$
- Causal set:
  $$
  \mathcal{C}_j(t) = \{\, t_0 < t \mid \|\mathbf{s}_{o'}(t) - \mathbf{s}_j(t_0)\| = v\,(t - t_0) \,\}
  $$
- Conventions:
  - $H(0)=0$ (no instantaneous self-kick).
  - No $r=0$ causal roots beyond $\tau=0$: because $r = v(t - t_0)$, $r=0$ implies $\tau=0$; the $\tau=0$ case is excluded by $H(0)=0$. Under mollification, the symmetric limit as $r\to 0$ yields zero net push.

Plain language: A push now only happens if a past causal wake surface has had exactly enough time to reach you.

---

## Distributions and regularization (causal wake surfaces)

- Point emission at (t₀, s₀):
  $$
  \text{source} = q\,\delta(t - t_0)\,\delta^{(3)}(\mathbf{s} - \mathbf{s}_0)
  $$
-- Expanding causal wake surface at speed v:
  $$
  \rho(t,\mathbf{s}) = \frac{q}{4\pi r^2}\,\delta(r - v\,\tau)\,H(\tau),\quad r=\|\mathbf{s}-\mathbf{s}_0\|,\ \tau=t-t_0
  $$
  $$
  \rho = \frac{q}{4\pi r^2}\,\delta_{S_{v\tau}}(\mathbf{s}-\mathbf{s}_0)\,H(\tau)
  $$
- Regularization:
  $$
  \delta(r - v\,\tau)\ \to\ \delta_\eta(r - v\,\tau) \;=\; \frac{1}{\sqrt{2\pi}\,\eta}\,\exp\!\Big(\!-\frac{(r - v\,\tau)^2}{2\,\eta^2}\Big)
  $$
  - Use $\eta$ > 0 when differentiability is required; take $\eta$ → 0 limits in the weak/integrated sense.

Plain language: Each emission is a razor-thin causal wake surface; when needed, we thicken it slightly so calculus works smoothly.

---

## master equation of Motion (EOM; purely radial)

Given a receiver o′ at time t and a source j at causal emission time t₀ ∈ 𝒞_j(t), let
$$
r = \|\mathbf{s}_{o'}(t) - \mathbf{s}_j(t_0)\|,\quad
\hat{\mathbf{r}} = \frac{\mathbf{s}_{o'}(t) - \mathbf{s}_j(t_0)}{r},\quad
\sigma_{q_j q_{o'}} = \mathrm{sign}(q_j q_{o'}) \in \{+1,-1\}
$$

Canonical per-hit acceleration:
$$
a_{o′\leftarrow j}(t; t_0)
= \kappa\,\sigma_{q_j q_{o′}}\,
\frac{|q_j q_{o′}|}{r^2}\,\hat{\mathbf{r}}.
$$

Total acceleration:
$$
\mathbf{a}_{o′}(t) = \sum_{j}\ \sum_{t_0 \in \mathcal{C}_j(t)} a_{o′\leftarrow j}(t; t_0).
$$

DDE view: let state $x = (\mathbf{s}, \mathbf{v})$. With $\eta>0$ regularization, the dynamics admit a causal functional form
$$
\frac{d x}{d t} = F\big(x(t), \{x_j(t - \tau_j)\}_j, t\big),
$$
with $\tau_j$ determined implicitly by $\lVert \mathbf{s}(t) - \mathbf{s}_j(t - \tau_j)\rVert = v\,\tau_j$, and per-hit contributions summed over all roots. In the $\eta\to 0$ limit interpret in the weak sense.

Notes:
- Emission cadence and per-wavefront amplitude are constant The receiver’s velocity influences only instantaneous power via $\mathbf{F}\cdot\mathbf{v} = |\mathbf{F}|\,v_r$.
- No cross products, no right-hand-rule magnetism; every per-hit action is along $\hat{\mathbf{r}}$.

Plain language: For each past emission that can reach you now, push along the line back to where it came from, with 1/r² falloff only, then add all pushes.

Receiver velocity decomposition (instantaneous):
- Decompose the receiver velocity relative to $\hat{\mathbf{r}}$:
  $$
  \mathbf{v} = v_r\,\hat{\mathbf{r}} + \mathbf{v}_\perp,\qquad v_r = \mathbf{v}\cdot \hat{\mathbf{r}}
  $$
- Because $a_{o′\leftarrow j} \parallel \hat{\mathbf{r}}$, a single hit updates only the radial component:
  $$
  \frac{d}{dt}\mathbf{v}_\perp = 0,\qquad \frac{d}{dt}v_r = a_{o′\leftarrow j}\cdot \hat{\mathbf{r}}
  $$
- Local trend: inward motion ($v_r<0$) tends to strengthen subsequent per-hit contributions via the $1/r^2$ factor; outward ($v_r>0$) tends to weaken them, all else equal.

Plain language: a hit changes only the along-the-line piece of your velocity right then; sideways motion is unchanged at that instant.

---

## Energetics

-- Potential (mollified):
  - $\Phi_\eta$ is defined using $\delta_\eta$ causal surfaces; at a point:
    $$
    U_{\text{pot}} = q'\,\Phi_\eta
    $$
- Force relation:
  - Holds pointwise for $\Phi_\eta$; as $\eta \to 0$, interpret in the weak sense over resolved intervals:
    $$
    \mathbf{F} = -\nabla U_{\text{pot}}
    $$
- Work–energy:
  $$
  \Delta E_k \;=\; \int \mathbf{F}\cdot d\mathbf{s} \;=\; -\,\Delta U_{\text{pot}}
  $$

Plain language: With slightly thick causal wake surfaces, the usual “force is minus gradient of potential” works; in the razor-thin limit it works after integrating over small time windows.

---

## Units and symbols

- Core dynamics chapters often set field speed to $v=1$ (equivalently $c_f=1$).
- In spacetime closure chapters, keep $c_f$ explicit and use $v$ for drift speed only through $\beta=v/c_f$.
- $\epsilon = |e|/6$ is the unit charge magnitude; Electrino $q=-\epsilon$, Positrino $q=+\epsilon$.
- $\kappa>0$ universal coupling.
- $\eta>0$ mollifier width (regularization parameter).
- Emission cadence and per-wavefront amplitude are constant. Receiver velocity affects only instantaneous power $\,\mathbf{F}\cdot\mathbf{v} = |\mathbf{F}|\,v_r$.
- $r$, $\hat{\mathbf{r}}$ as above; $H$ is the Heaviside step function with $H(0)=0$.

Plain language: Fix units so the field speed is one; use $\epsilon$ as the basic charge; emission cadence and per-wavefront amplitude are constant; receiver motion affects only instantaneous power.

---

## Exclusions and scope

- No Lorentzian 4-vectors or Minkowski metric in the core specification.
- No $\mathbf{v}\times\mathbf{B}$, no magnetic right-hand rule constructs; “magnetic-like” phenomena are emergent from causal path history geometry.
- Keep alternate presentations (forms/differential geometry) in clearly marked appendices if needed.

---

## Editorial micro-style

- After formal definitions, add a brief “Plain language” sentence.
- Use consistent symbol set: $\mathcal{C}_j(t)$, $r$, $\hat{\mathbf{r}}$, $v$, $\epsilon$, $\kappa$.
- Equation tags (optional): (CT) causal-time, (EOM) equation of motion, (REG) regularization, (ENER) energetics.
- Emission cadence and per-wavefront amplitude are constant.
- Notation for “now”: use $t_{\text{now}}$ for a fixed current evaluation time; use $t_{\text{obs}}$ for observation time. Avoid Tnow/`T_now`; keep $t$ as the running variable elsewhere.
- Canonical universe-now notation: use $\mathbb{U}_{\text{now}} \equiv S(t)$ for the complete ontic universe state; do not substitute alternate labels or glyph variants. Definition source of truth: `_meta/entourage/mathematical-terminology.md`.
- Emitters/receivers are individual architrinos; composite assemblies never emit or receive as wholes; their behavior emerges from constituent architrinos.
- Use “surrogate location” to denote a stationary, hypothetical emitter placed on the receiver’s current unoriented line of action that reproduces the same instantaneous hit; use “surrogate-location recast” when referring to this rewriting.
- On first occurrence in a doc: “We work in units with field speed v=1 unless stated otherwise.”

- Notation lint (common mistakes):
  - Use bold for vectors: $\mathbf{v}$, not plain v.
  - In core dynamics derivations, reserve $v$ for field speed; in spacetime closure derivations, reserve $c_f$ for field speed and use $v$ only as drift magnitude in $\beta=v/c_f$.
  - Use $\|\mathbf{v}\|$ for speed magnitude of a vector velocity.
  - Emission cadence and per-wavefront amplitude are constant.
  - Do not write mixed forms like $|v|$ to mean speed; bold the vector and take its norm.
