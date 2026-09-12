# Units and Constants

The action-energy simulations use normalized wake-speed units with $c_f=1$. An [architrino](../../../foundations/architrino.md) is a point transceiver with fixed polarity that continuously emits an expanding wake from each past position. A causal root selects an emission whose wake reaches the receiver at the chosen reception time. The [Master Equation](../../../dynamics/master-equation.md) assigns an acceleration contribution to each admitted root. The coupling $\kappa>0$ sets its scale, $\epsilon>0$ is the polarity-unit magnitude, and $\eta>0$ is a computational surface-width regulator when a mollified model is used. These conventions do not assign primitive mass or a physical pulse thickness to an architrino or its wake.

## Core Symbols

- $c_f=1$: wake speed in normalized units.
- $\kappa>0$: universal acceleration coupling.
- $\eta>0$: distance width used to smooth a causal wake surface.
- $\epsilon>0$: polarity-unit magnitude; Electrino $q=-\epsilon$, Positrino $q=+\epsilon$.
- $\sigma_{q q'}=\mathrm{sign}(q\,q')\in\{+1,-1\}$.
- $r=\|\mathbf X_{o'}(T_r)-\mathbf X_o(T_t)\|$, with $\hat{\mathbf{r}}=(\mathbf X_{o'}(T_r)-\mathbf X_o(T_t))/r$.

Here $o$ labels the transmitter, $o'$ the receiver, $T_t$ the emission time, and $T_r$ the reception time. Position is $\mathbf X_o(T)$ and velocity is $\mathbf V_o=d\mathbf X_o/dT$ in the Euclidean void and absolute time. An admitted sharp root satisfies $T_t<T_r$ and $r=c_f(T_r-T_t)>0$; the coincident-time endpoint is excluded. The sign $\sigma_{q q'}$ is positive for like polarities and negative for unlike polarities.

Writing $\mathrm L$, $\mathrm T$, and $\mathrm Q$ for length, time, and polarity dimensions, respectively, the acceleration law gives $[c_f]=\mathrm L\mathrm T^{-1}$, $[\eta]=\mathrm L$, $[\epsilon]=\mathrm Q$, and $[\kappa]=\mathrm L^3\mathrm T^{-2}\mathrm Q^{-2}$. Indeed, $W^{\mathrm{acc}}$ is dimensionless and $[\kappa\epsilon^2/r^2]=\mathrm L\mathrm T^{-2}$. These are dimensional deductions from the acceleration law, not a force or mass convention.

## Dynamical Geometry

- Wake-speed units ($c_f=1$):
  - Choose a length unit $L_0>0$ and time unit $T_0=L_0/c_f$. Then $\widetilde{\mathbf X}=\mathbf X/L_0$, $\widetilde T=T/T_0$, and $\widetilde{\mathbf V}=\mathbf V T_0/L_0$ are dimensionless, and the numerical wake speed is $\widetilde c_f=c_fT_0/L_0=1$. All numerical examples use this convention. Kinematics still uses absolute time, the universal time parameter, and the Euclidean void, the fixed three-dimensional spatial background.
  - A change of units preserves predictions only when every dimensional input and output is converted consistently. With the polarity unit held fixed, replacing $(L_0,T_0)$ by $(aL_0,aT_0)$ with $a>0$ divides the numerical values of $r$, $T_r-T_t$, $\eta$, and $\kappa$ by $a$, while leaving numerical velocities unchanged. Ratios such as $\eta/r$ and $g_\kappa$ below are invariant when their reference scales describe the same geometry; holding the other numerical inputs fixed would change the problem.

- Coupling constant ($\kappa>0$):
  - On an admitted simple root, meaning $D_t\ne0$, the canonical contribution is $\mathbf A_{o'\leftarrow o}=\kappa\,\sigma_{q_o q_{o'}}\,\dfrac{|q_o q_{o'}|}{r^2}W_{o'\leftarrow o}^{\mathrm{acc}}\,\hat{\mathbf r}$. Here $D_t=c_f-\mathbf V_o(T_t)\cdot\hat{\mathbf r}$ measures how rapidly the causal distance gap changes with emission time, and $W^{\mathrm{acc}}=c_f/|D_t|$. At $D_t=0$ this sharp-root formula is unavailable; a singular-event or regularized treatment is required.
  - Replacing $\kappa$ by $\alpha\kappa$, with $\alpha>0$, multiplies the evaluated acceleration by $\alpha$ on the same prescribed histories, polarities, and regulator prescription. Evolved histories can change their separations, root counts, and weights, so this pointwise identity does not determine an assembly's radius, period, or stability.

- Regularization width ($\eta>0$):
  - For $\Delta T=T_r-T_t$, replace the distance-gap delta $\delta(r-c_f\Delta T)$ inside the transmitter-time history integral by a smooth kernel $\delta_\eta(r-c_f\Delta T)$ normalized by $\int_{\mathbb R}\delta_\eta(u)\,du=1$. Its width $\eta$ has dimensions of length. In normalized units the gap is $r-\Delta T$. Continuous emission already gives continuous acceleration on regular sharp-root branches; surface mollification does not define a physical pulse train. It also does not remove the $1/r^2$ singularity near coincidence. Smoothness requires a controlled history domain and either positive separation throughout the contributing support or a separately declared core regulator, as explained in [Numerical Recipe and Stability](numerical-recipe-and-stability.md).
  - Choose $\eta$ small relative to the resolved geometric scales, then resolve its support in both reception time and emission-time history. Locally the traversal scales are $\eta/|D_r|$ and $\eta/|D_t|$, respectively, where the derivatives are nonzero; $D_r=c_f-\mathbf V_{o'}(T_r)\cdot\hat{\mathbf r}$ measures reception-time crossing. Zero derivatives require higher-order local analysis. Small width alone proves neither numerical stability nor convergence. The evolution remains a delayed-history problem requiring retained histories, controlled interpolation, and the declared causal and memory boundaries.

- Polarity-unit magnitude ($\epsilon>0$):
  - $\epsilon$ is the fundamental polarity scale of an architrino (Electrino $q=-\epsilon$, Positrino $q=+\epsilon$). The observer-level calibration target $|e|=6\epsilon$, where $|e|$ is the elementary electric-charge magnitude, is the normalization convention $Z_e=1$ in [Parameter Ledger](../../parameter-ledger.md#2-charge-reconstruction). It supplies charge labels for comparisons with particle measurements; it neither identifies an assembly as a particle nor inserts the measured charge into substrate dynamics.
  - Emission is continuous with constant transmitter-time density. The sharp-root acceleration weight is $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$; receiver-side geometry controls signed root playback through $D_r/D_t$ and does not supply an additional arriving-strength factor.

- Sign of interaction ($\sigma_{q q'}$):
  - $\sigma_{q q'}=\mathrm{sign}(q\,q')$ selects the direction along the delayed emission-to-receiver line. Like polarities ($\sigma=+1$) accelerate along $+\hat{\mathbf r}$, and unlike polarities ($\sigma=-1$) along $-\hat{\mathbf r}$. These directions concern the past emission point; they do not by themselves determine whether the present receiver-transmitter separation increases or decreases.

- Line of action ($r$, $\hat{\mathbf{r}}$, $D_t$, $D_r$, $W^{\mathrm{acc}}$):
  - $r=\|\mathbf X_{o'}(T_r)-\mathbf X_o(T_t)\|$ is the delayed separation and $\hat{\mathbf r}$ its unit direction. Both $D_t$ and $D_r$ have speed dimensions, whereas $W^{\mathrm{acc}}$ and the playback derivative $dT_t/dT_r=D_r/D_t$ are dimensionless. Each sharp per-hit acceleration lies along this line; the total is the vector sum over all admitted transmitter roots, including positive-delay self roots.

- Combined role in assembly scales:
  - The bare coupling defines the length $R_*=\kappa\epsilon^2/c_f^2$ and time $T_*=R_*/c_f$, as derived in [Parameter Ledger](../../parameter-ledger.md#layer-i-two-body-scale-closure). These are units, not proofs of a smallest sustainable orbit or fastest frequency. Such extrema require an admitted solution family, acceleration balance, and stability evidence; [Binary Dynamics](../../../dynamics/binary-dynamics.md) owns those conditional assembly claims.
  - A derived similarity of the bare sharp law makes the limitation concrete. At fixed $c_f$ and $\epsilon$, if $\mathbf X_i(T)$ is a solution for $\kappa$, then $\mathbf X_i^{(\alpha)}(T)=\alpha\mathbf X_i(T/\alpha)$ is a solution for $\alpha\kappa$ on the correspondingly scaled history domain. Velocities and $W^{\mathrm{acc}}$ are unchanged, while separations and delays multiply by $\alpha$; both sides of the acceleration law therefore divide by $\alpha$. If the solution is periodic, its radius and period scale by $\alpha$. A finite-width similarity also requires $\eta\mapsto\alpha\eta$, the same normalized kernel shape, and scaling every other length, time, core, and boundary parameter. This does not establish existence or stability of any candidate, and varying $\kappa$ at fixed $\eta$ changes the regulator ratio.

- Dimensionless branch-scan controls:
  - Simulation sweeps should report dimensionless controls rather than only raw choices of $(\kappa,\epsilon,\eta,L_0,T_0)$. Choose a reference length $L_\star$ and the corresponding reference time $T_\star=L_\star/c_f$; in field-speed units, $c_f=1$ and $T_\star=L_\star$.
  - **Speed ratio:** use
    $$
    \beta_i(T)=\frac{\|\mathbf V_i(T)\|}{c_f}
    $$

    [View →](../../../../../../equation-mapping.html#corpus-equation-0a0bc5d65e8e1afd)

    and, for a circular path of radius $R>0$ and angular speed $\omega>0$, the speed factor
    $$
    s=\frac{R\omega}{c_f}
    $$

    [View →](../../../../../../equation-mapping.html#corpus-equation-dac301d02838fb90)

    State whether the retained histories remain below, cross, or remain above wake speed. Speed alone is not a self-hit switch: at $c_f=1$, the straight history $\mathbf X(T)=2T\mathbf e_x$, with $\mathbf e_x$ a fixed unit direction, has self-gap $2\Delta T-\Delta T=\Delta T>0$ for every $\Delta T>0$ and hence no self root. Simple positive-delay self roots require super-wake-speed motion somewhere in the intervening history, but that condition is not sufficient. For a complete uniform circular history, $s=1$ is the limiting zero-delay onset and nontrivial self roots occur for $s>1$; a finite retained window must still contain them.
  - **Delay/window ratio:** use
    $$
    \Theta_{\Delta T}=\frac{\Delta T_{\max}}{T_{\mathrm{win}}}
    $$

    [View →](../../../../../../equation-mapping.html#corpus-equation-22dec982b4dd6f58)

    where $\Delta T_{\max}$ bounds the admitted causal lookback times throughout the reported scan and $T_{\mathrm{win}}>0$ is the averaging, diagnostic, or return-map window. Use $\Delta T_{\max}=0$ for a certified empty root set. The stored history horizon $H_{\mathrm{hist}}$ must satisfy $H_{\mathrm{hist}}\ge\Delta T_{\max}$, with support and interpolation margins for a finite-width calculation. A maximum computed only from found roots cannot exclude older or missed roots: certify the search domain and its boundaries, or explicitly declare a finite-memory model or bounded omitted contribution.
  - **Regularization thickness:** use
    $$
    \hat{\eta}=\frac{\eta}{L_\star}
    $$

    [View →](../../../../../../equation-mapping.html#corpus-equation-1f5196ad240d203b)

    with local checks such as $\eta/r_{\min}$, where $r_{\min}>0$ is a separation floor on the contributing support. First refine numerical resolution at fixed regulators and history prescription. Then compare matched root identities and observables on the same window as $\hat\eta$ is reduced, with kernel shape, truncation, and any core prescription stated. A resolved finite-$\eta$ result remains evidence about that model even without a sharp-limit claim. Count agreement or two nearby widths alone does not establish convergence, and a genuine root transition requires its own event treatment.
  - **Coupling scale:** compare the per-hit acceleration scale with the reference acceleration $L_\star/T_\star^2$:
    $$
    g_\kappa
    =
    \frac{\kappa\epsilon^2 T_\star^2}{L_\star^3}
    =
    \frac{\kappa\epsilon^2}{c_f^2 L_\star}
    $$

    [View →](../../../../../../equation-mapping.html#corpus-equation-bdfce55a112e1b3c)

    In normalized wake-speed units this reduces to $g_\kappa=\kappa\epsilon^2/L_\star$. Equivalently $g_\kappa=R_*/L_\star$; choosing $L_\star=R_*$ makes it one. It measures coupling relative to the chosen length, not an additional bare two-body dimensionless constant. Initial-history geometry, boundaries, and regulator ratios remain separately specified.
  - **Branch/root tolerances:** for the causal-root residual
    $$
    g_{ij}(\Delta T,\phi)
    =
    \|\phi_i(0)-\phi_j(-\Delta T)\|-c_f\Delta T
    $$

    [View →](../../../../../../equation-mapping.html#corpus-equation-328277424a05be28)

    Here $i$ labels the receiver, $j$ the transmitter, and $\phi_k(u)=\mathbf X_k(T_r+u)$ is the position history of either object $k=i,j$ relative to reception time, for $-H_{\mathrm{hist}}\le u\le0$ and $0<\Delta T\le H_{\mathrm{hist}}$. Define the dimensionless derivative $J=\partial(g_{ij}/L_\star)/\partial(\Delta T/T_\star)=-D_t/c_f$. The tolerances $\varepsilon_{\mathrm{root}},\varepsilon_{\mathrm{sep}},\varepsilon_J>0$ are dimensionless. A candidate must satisfy $|g_{ij}|/L_\star\le\varepsilon_{\mathrm{root}}$; acceptance also requires an isolated root and controlled interpolation and evaluation error. If $|J|\ge j_{\min}>0$ throughout an isolating interval, with derivative uncertainty included in the bound, and the normalized gap error is at most $\varepsilon_g$, the mean-value theorem bounds normalized root-time error by $(\varepsilon_{\mathrm{root}}+\varepsilon_g)/j_{\min}$.
    Distinct roots closer than $\varepsilon_{\mathrm{sep}}$ in normalized delay are unresolved at that resolution; refine their isolation or report the ambiguity without merging or discarding them. A threshold failure $|J|\le\varepsilon_J$ is a conditioning warning, not proof that $J=0$ or that a root pair is born. An interior fold requires a root with $J=0$ and the appropriate nonzero second derivative and unfolding derivative. Roots can also enter or leave the retained history through a boundary with $J\ne0$. Root regularity supplies no dynamical stability verdict.
  - A branch-scan report should therefore include at least
    $$
    (\beta_{\max}\ \text{or}\ s,\ \Theta_{\Delta T},\ \hat{\eta},\ g_\kappa,\ \varepsilon_{\mathrm{root}},\ \varepsilon_{\mathrm{sep}},\ \varepsilon_J)
    $$

    [View →](../../../../../../equation-mapping.html#corpus-equation-aaa8556681b2a511)

    Here $\beta_{\max}$ is a bound over the declared retained histories and scan window; a sampled maximum must be labeled as such. Include the active causal-root ledger, initial-history functions, memory and support boundaries, regulator shape and any core scale, resolution settings, and error bounds. These records make unit changes and numerical changes distinguishable from candidate branch changes. Physical assembly, conservation, stability, solver-certification, and particle-calibration claims require their own evidence beyond this unit convention.
