# Background and Simple Action

The dynamics of an architrino are governed by a simple action: acceleration occurs when the receiver intersects a delayed causal wake surface emitted by a source architrino.

The background is fixed absolute time times Euclidean space. Free paths are straight. Accelerations come only from delayed causal hits, with line-of-action direction and receiver-normal branch strength, never from background curvature.

## Dynamical Geometry

- Background kinematics (Newton-Cartan/Galilean):
  - The arena is absolute time × Euclidean space, $\mathcal{M}=\mathbb{R}\times\mathbb{R}^3$, with simultaneity slices $\Sigma_t=\{t\}\times\mathbb{R}^3$ carrying the flat spatial metric $h_{ij}=\delta_{ij}$.
  - "Geodesics are straight" means: in the absence of any interaction, a worldline $\mathbf{s}(t)$ satisfies $\mathbf{a}(t)=d^2\mathbf{s}/dt^2=\mathbf{0}$; motion is uniform and rectilinear in each slice $\Sigma_t$. The background is fixed; there is no curvature to encode forces.

- Wake geometry as a continuous causal flux:
  - Each architrino streams potential continuously. At any observation time $t$, the contribution emitted at past time $t_0$ sits on the **causal wake surface** (spherical isochron) $r=v(t-t_0)$ centered on $\mathbf{s}(t_0)$, with surface density $\propto 1/r^2$ so the integrated flux remains $q$.
  - The potential wake is the superposition of all such causal isochrons from past emissions. The flux never shuts off; the surfaces are bookkeeping devices isolating portions of the path history whose intersection with a receiver delivers acceleration.

- Intersection as the driver of acceleration:
  - The receiver’s worldline is $\mathbf{s}_{o'}(t)$. An intersection at time $t$ means some earlier emission time $t_0 < t$ satisfies the causal-distance condition
    $$
    \|\mathbf{s}_{o'}(t)-\mathbf{s}_o(t_0)\|=v(t-t_0)
    $$
    That event is a causal hit from source $o$’s past to the receiver’s present.
  - At a hit, the acceleration impulse is directed along
    $$
    \hat{\mathbf{r}}
    =
    \frac{\mathbf{s}_{o'}(t)-\mathbf{s}_o(t_0)}
    {\|\mathbf{s}_{o'}(t)-\mathbf{s}_o(t_0)\|}
    $$
    No cross products or right-hand-rule terms appear; the action is collinear with $\hat{\mathbf{r}}$. Its magnitude is weighted by the branch Jacobian $|J|^{-1}$, which captures causal-flux bunching or dilation due to source motion.

- “Simple action” in precise terms:
  - The law is event-driven: acceleration is a sum of per-hit line-of-action contributions, each scaled by $1/(r^2 |J|)$. Between hits (as $\eta\to 0$) motion is inertial; with mollification ($\eta>0$) the impulses become short, smooth pushes.
  - The background adds no force; departures from straight motion arise only from these intersections with emitted causal wakes, including self-hits when kinematics allow.

- Physical picture:
  - Picture many continuously expanding wake surfaces (causal isochrons). A push occurs whenever one of those surfaces intersects the receiver, directed straight along the radius back to its emission point, with inverse-square geometric decay and an additional Jacobian weight set by the source motion on that branch.
