# Background and Simple Action

The dynamics of an architrino are governed by a simple action: acceleration occurs when the receiver intersects a delayed causal wake surface emitted by a transmitter architrino.

The background is fixed absolute time times Euclidean space. Free paths are straight. Accelerations come only from delayed causal hits, with line-of-action direction and receiver-weighted acceleration factor, never from background curvature.

## Dynamical Geometry

- Background kinematics (Newton-Cartan/Galilean):
  - The arena is absolute time × Euclidean space, $\mathcal{M}=\mathbb{R}\times\mathbb{R}^3$, with simultaneity slices $\Sigma_T=\{T\}\times\mathbb{R}^3$ carrying the flat spatial metric $h_{ij}=\delta_{ij}$.
  - "Geodesics are straight" means: in the absence of any interaction, a worldline $\mathbf X(T)$ satisfies $\mathbf A(T)=d^2\mathbf X/dT^2=\mathbf{0}$; motion is uniform and rectilinear in each slice $\Sigma_T$. The background is fixed; there is no curvature to encode forces.

- Wake geometry as a continuous causal flux:
  - Each architrino streams potential continuously. At any reception time $T_r$, the contribution emitted at past time $T_t$ sits on the **causal wake surface** (spherical isochron) $r=v(T_r-T_t)$ centered on $\mathbf X(T_t)$, with surface density $\propto 1/r^2$ so the integrated flux remains $q$.
  - The potential wake is the superposition of all such causal isochrons from past emissions. The flux never shuts off; the surfaces are bookkeeping devices isolating portions of the path history whose intersection with a receiver delivers acceleration.

- Intersection as the driver of acceleration:
  - The receiver's worldline is $\mathbf X_{o'}(T_r)$. An intersection at reception time $T_r$ means some earlier emission time $T_t<T_r$ satisfies the causal-distance condition
    $$
    \|\mathbf X_{o'}(T_r)-\mathbf X_o(T_t)\|=v(T_r-T_t)
    $$
    That event is a causal hit from transmitter $o$'s emission event to the receiver's reception event.
  - At a hit, the acceleration impulse is directed along
    $$
    \hat{\mathbf{r}}
    =
    \frac{\mathbf X_{o'}(T_r)-\mathbf X_o(T_t)}
    {\|\mathbf X_{o'}(T_r)-\mathbf X_o(T_t)\|}
    $$
    No cross products or right-hand-rule terms appear; the action is collinear with $\hat{\mathbf{r}}$. Its magnitude is weighted by the receiver-weighted acceleration factor $W^{\mathrm{acc}}=\lvert D_r/D_t\rvert$: $D_t$ captures transmitter-side wake spacing and root transversality, while $D_r$ captures how the receiver cuts through that wake sequence.

- “Simple action” in precise terms:
  - The law is event-driven: acceleration is a sum of per-hit line-of-action contributions, each scaled by $W^{\mathrm{acc}}/r^2$. Between hits (as $\eta\to 0$) motion is inertial; with mollification ($\eta>0$) the impulses become short, smooth pushes.
  - The background adds no force; departures from straight motion arise only from these intersections with emitted causal wakes, including self-hits when kinematics allow.

- Physical picture:
  - Picture many continuously expanding wake surfaces (causal isochrons). A push occurs whenever one of those surfaces intersects the receiver, directed straight along the radius back to its emission point, with inverse-square geometric decay multiplied by the receiver-weighted acceleration factor set by both transmitter-side wake spacing and receiver crossing rate on that branch.
