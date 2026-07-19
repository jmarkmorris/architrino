# Units and Constants

This note fixes the unit and symbol conventions used by the action-energy simulation notes. We work in units with field speed $v=1$ unless stated otherwise, use $\kappa>0$ for the universal coupling, and use $\eta>0$ as the default regularization thickness for causal isochrons.

Core symbols:

- $v=1$: field speed in normalized units.
- $\kappa>0$: universal coupling constant.
- $\eta>0$: causal-isochron thickness.
- $\epsilon>0$: polarity-unit magnitude; Electrino $q=-\epsilon$, Positrino $q=+\epsilon$.
- $\sigma_{q q'}=\mathrm{sign}(q\,q')\in\{+1,-1\}$.
- $r=\|\mathbf X_{o'}(T_r)-\mathbf X_o(T_t)\|$, with $\hat{\mathbf{r}}=(\mathbf X_{o'}(T_r)-\mathbf X_o(T_t))/r$.

## Dynamical Geometry

- Field-speed units ($v=1$):
  - Choosing $L_0,T_0$ with $v=L_0/T_0=1$ fixes a conversion between spatial and temporal scales so that all speeds are dimensionless ratios to the field speed. This is akin to “setting c=1,” but the reference is the model’s field speed. Kinematics still lives on absolute time × Euclidean space; we have not mixed time and space into a 4D line element.
  - Consequence: every velocity appears as a pure number $\|\mathbf V\|$; the symmetry point $\|\mathbf V\|=v$ becomes $\|\mathbf V\|=1$. Rescaling $L_0$ and $T_0$ together leaves all dimensionless predictions invariant.

- Coupling constant ($\kappa>0$):
  - $\kappa$ sets the overall scale of per-hit acceleration. In the canonical law,
    $
    \mathbf A_{o'\leftarrow o} = \kappa\,\sigma_{q_o q_{o'}}\,\dfrac{|q_o q_{o'}|}{r^2}W_{o'\leftarrow o}^{\mathrm{acc}}\,\hat{\mathbf{r}},
    $
    larger $\kappa$ uniformly strengthens every interaction.
  - Scaling insight: if you scale $\kappa\mapsto \alpha\kappa$ while keeping $(\epsilon,\eta)$ fixed, accelerations scale by $\alpha$. Characteristic assembly scales such as the minimal binary radius $d_0$ and period $t_0$ shift accordingly through the dynamical balance that defines them.

- Regularization width ($\eta>0$):
  - $\eta$ is the width applied to each causal isochron (wake surface) to mollify the surface delta $\delta(r-\Delta)$. It converts impulsive hits into brief, smooth pushes so that standard ODE integration applies and pointwise quantities (like gradients) are well-defined.
  - Geometric guidance: choose $\eta$ small relative to local geometric scales (e.g., the receiver's instantaneous curvature radius along its path and the local receiver-transmitter separation) so the regularized dynamics approximate the ideal path-history picture while remaining numerically stable.

- Polarity-unit magnitude ($\epsilon>0$):
  - $\epsilon$ is the fundamental polarity scale of an architrino (Electrino $q=-\epsilon$, Positrino $q=+\epsilon$). In this framework $\epsilon$ is often identified with $|e|/6$, making observer-level quark electric charges integer multiples of $\epsilon$.
  - Per-wavefront amplitude and emission cadence are constant at the transmitter. The received acceleration magnitude is modulated by the transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$, where $D_t$ records transmitter-side root transversality and $D_r$ records receiver-side playback geometry.

- Sign of interaction ($\sigma_{q q'}$):
  - $\sigma_{q q'}=\mathrm{sign}(q\,q')$ selects attraction vs repulsion while keeping the acceleration strictly collinear with $\hat{\mathbf{r}}$. Like-on-like ($\sigma$=+1) points along +$\hat{\mathbf{r}}$ (repulsion); unlike ($\sigma$=-1) points along -$\hat{\mathbf{r}}$ (attraction).

- Line of action ($r$, $\hat{\mathbf{r}}$, $D_t$, $D_r$, $W^{\mathrm{acc}}$):
  - $r=\|\mathbf X_{o'}(T_r)-\mathbf X_o(T_t)\|$ is the separation between the receiver at reception time $T_r$ and the transmitter at emission time $T_t$. $\hat{\mathbf{r}}$ is the corresponding unit vector. The transmitter-side factor is $D_t=c_f-\mathbf V_o(T_t)\cdot\hat{\mathbf{r}}$, the receiver-side factor is $D_r=c_f-\mathbf V_{o'}(T_r)\cdot\hat{\mathbf{r}}$, and the active branch strength is $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$. All per-hit acceleration contributions are directed along this line; no transverse or right-hand-rule terms appear.

- Combined role in assembly scales:
  - The trio $(\kappa,\epsilon,\eta)$, together with the $1/r^2$ law, determines emergent scales such as the smallest sustainable orbit $d_0$ and fastest natural frequency $2\pi/t_0$. Intuitively, stronger coupling (larger $\kappa\epsilon^2$) and sharper wake surfaces (smaller $\eta$) favor tighter, faster structures until self-interaction and delay balance inward trends.

- Dimensionless branch-scan controls:
  - Simulation sweeps should report dimensionless controls rather than only raw choices of $(\kappa,\epsilon,\eta,L_0,T_0)$. Choose a reference length $L_\star$ and the corresponding reference time $T_\star=L_\star/c_f$; in field-speed units, $c_f=1$ and $T_\star=L_\star$.
  - **Speed ratio:** use
    $$
    \beta_i(T)=\frac{\|\mathbf V_i(T)\|}{c_f}
    $$
    and, for circular binary scans, the existing speed factor
    $$
    s=\frac{R\omega}{c_f}
    $$
    A branch scan must state whether the sampled histories remain below, cross, or remain above the self-hit onset $\beta=1$.
  - **Delay/window ratio:** use
    $$
    \Theta_{\Delta T}=\frac{\Delta T_{\max}}{T_{\mathrm{win}}}
    $$
    where $\Delta T_{\max}$ is the longest active causal lookback time and $T_{\mathrm{win}}$ is the averaging, diagnostic, or return-map window. The stored history horizon $h$ must satisfy $h\ge\Delta T_{\max}$ on the scanned branch chart.
  - **Regularization thickness:** use
    $$
    \hat{\eta}=\frac{\eta}{L_\star}
    $$
    with local checks such as $\eta/r_{\min}$ against the smallest resolved separation. A scan is numerically meaningful only when branch counts and averaged observables stabilize as $\hat{\eta}$ is reduced while the causal wakes remain resolved.
  - **Coupling scale:** compare the per-hit acceleration scale with the reference acceleration $L_\star/T_\star^2$:
    $$
    g_\kappa
    =
    \frac{\kappa\epsilon^2 T_\star^2}{L_\star^3}
    =
    \frac{\kappa\epsilon^2}{c_f^2 L_\star}
    $$
    In field-speed units this reduces to $g_\kappa=\kappa\epsilon^2/L_\star$.
  - **Branch/root tolerances:** for the causal-root residual
    $$
    g_{ij}(\Delta T,\phi)
    =
    \|\phi_i(0)-\phi_j(-\Delta T)\|-c_f\Delta T
    $$
    accept a root only when $|g_{ij}|/L_\star\le\varepsilon_{\mathrm{root}}$, keep distinct roots separated by $|\Delta T_a-\Delta T_b|/T_\star>\varepsilon_{\mathrm{sep}}$, and treat $|J|\le\varepsilon_J$ as a branch-birth or caustic zone rather than an ordinary stable branch.
  - A branch-scan report should therefore include at least
    $$
    (\beta_{\max}\ \text{or}\ s,\ \Theta_{\Delta T},\ \hat{\eta},\ g_\kappa,\ \varepsilon_{\mathrm{root}},\ \varepsilon_{\mathrm{sep}},\ \varepsilon_J)
    $$
    together with the active causal-root ledger. This prevents a change in units, regularization, or root finder tolerance from masquerading as a new physical branch.

Plain language: We measure speeds in units where the field speed is one, use $\kappa$ to set how hard every hit pushes, use $\eta$ to slightly thicken the razor-thin isochrons so calculus works, and use $\epsilon$ as the basic unit of polarity. The push is always straight along the line back to where the isochron was emitted, but its received strength is shaped by the transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$; like polarities push out, unlike polarities pull in.
