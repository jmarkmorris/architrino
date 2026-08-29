# Analytic Baselines

Purpose:
- State the delay differential equations (DDEs) that govern canonical interactions under the delayed line-of-action law with transmitter-side acceleration weight.
- Record exact analytical solutions only where they exist; otherwise, state solvability status without approximations.

Models:
- Fixed center (one receiver, one stationary transmitter):
  - For unlike polarities, $\sigma_{qq'}=-1$. The causal root is explicit and $D_t=c_f$, so $W^{\mathrm{acc}}=1$ independently of receiver velocity. The canonical radial equation is $\ddot r=-K/r^2$ with $K=\kappa |q q'|>0$. This is an exact fixed-transmitter attraction baseline for the corrected delayed law.
- Two-body mutual interaction (opposite or equal charges):
  - Coupled DDEs with causal roots $T_t$ defined by $|X_i(T)-X_j(T_t)|=T-T_t$ ($c_f=1$); accelerations superpose as $\pm \kappa \epsilon^2 W^{\mathrm{acc}}/r^2$ along the line of action.
  - No exact closed-form solutions are presently known for the coupled DDEs in general.

Methodological priority:
- Treat the two-point-potential problem as the canonical first laboratory for the delayed theory.
- Any proposed energy, momentum, virial-like, or kinetic/potential closure claim should be checked here before being generalized to assemblies or Noether sea response arguments.
- In practice this means: solve the fixed-center and symmetric two-body cases first, then ask which familiar ODE identities survive, which acquire delay corrections, and which fail outright.
- For the nontrivial electrino:positrino binary, use the finite-$\eta$ closure packet and canonical residual tuple owned by [Binary Dynamics](../../../dynamics/binary-dynamics.md#two-body-closure-packet-theorem-target), together with the constructive residual definitions in [Delay-Dynamics Energy](delay-dynamics-energy.md). This document does not restate the tuple. Until every owned entry is computed on the same window, regulator, and branch chart, the binary remains an existence candidate rather than a validated closure result.
- The first constructive energy baseline for such a branch is the branch-local work reconstruction
  $$
  U_{b,\mathrm{work}}^{(\eta)}(T)
  =
  U_b(T_\ast)
  -
  \int_{T_\ast}^{T}
  \sum_i
  \mu_{\text{arch}}\,
  \mathbf A_{i,b}^{(\eta)}(T')
  \cdot
  \mathbf V_i(T')\,dT'
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-bf602e9a8aeaade5)
  with the same replacement by $\mu_K(\|\mathbf V_i\|)$ when the primitive kinetic scalar is used. For a circular branch, the period-averaged integrand reduces to $\mu_{\text{arch}}s_b\langle A_{\eta,b}^{\mathrm{tan}}\rangle_{P_b}$ in the quadratic proxy.
- The adiabatic consistency check is branch preservation under slow drift. Along a quasi-static path $\gamma:\lambda\mapsto(R(\lambda),s(\lambda),b)$ that does not cross a root-ledger threshold, the work-integral energy change should match the energy difference inferred from the neighboring solved branch family:
  $$
  \Delta_{\mathrm{ad},E}^{2\mathrm{B}}(\gamma)
  =
  \frac{
  \left|
  \Delta_\gamma U_{b,\mathrm{work}}^{(\eta)}
  -
  \left(E_b^{(\eta)}(\lambda_1)-E_b^{(\eta)}(\lambda_0)\right)
  \right|
  }{
  \left|\Delta_\gamma U_{b,\mathrm{work}}^{(\eta)}\right|
  +
  \left|E_b^{(\eta)}(\lambda_1)-E_b^{(\eta)}(\lambda_0)\right|
  +
  \varepsilon
  }
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-e723374df0c8beb5)
  Here $E_b^{(\eta)}(\lambda)$ denotes the candidate branch energy extracted at fixed $\lambda$ by the same declared construction route. The test is valid only while the same signed causal-root ledger persists with positive Jacobian and inactive-root gap floors. A jump in the ledger is a bifurcation, not a failure of adiabatic energy consistency.
  - Branch-virial theorem target: separate the kinematic virial identity from the stronger classical potential virial theorem. On a fixed finite-$\eta$ branch chart $b$ over an averaging window $W=[T_a,T_b]$, define the branch virial diagnostic
  $$
  \mathcal{G}_b^{(\eta)}(T)
  =
  \sum_i
  \mu_{\text{arch}}\,
  \mathbf X_i(T)\cdot\mathbf V_i(T)
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-1676e7d52ade38b1)
  and the quadratic kinetic bookkeeping scalar
  $$
  T_{\mu,b}^{(\eta)}(T)
  =
  \frac{1}{2}
  \sum_i
  \mu_{\text{arch}}\,
  \|\mathbf V_i(T)\|^2
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-8bc11bdeb4e4414f)
  Before the branch average is formed, retain the root-resolved virial rows
  $$
  V_{i\leftarrow j,T_t}^{(\eta)}(T)
  =
  \mu_{\text{arch}}\,
  \mathbf X_i(T)
  \cdot
  \mathbf A_{i\leftarrow j}^{(\eta)}(T;T_t)
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-e5ad6762bf0280ae)
  and the corresponding delivered-power rows
  $$
  P_{i\leftarrow j,T_t}^{(\eta)}(T)
  =
  \mu_{\text{arch}}\,
  \mathbf A_{i\leftarrow j}^{(\eta)}(T;T_t)
  \cdot
  \mathbf V_i(T)
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-b5085d10a50323f5)
  for every retained source/root hit $T_t\in\mathcal C_{ij,b}^{(\eta)}(T)$. The net virial term is then the ledger-preserving sum
  $$
  \sum_i
  \mu_{\text{arch}}\,
  \mathbf X_i(T)\cdot\mathbf A_{i,b}^{(\eta)}(T)
  =
  \sum_i
  \sum_j
  \sum_{T_t\in\mathcal C_{ij,b}^{(\eta)}(T)}
  V_{i\leftarrow j,T_t}^{(\eta)}(T)
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-7e4ad858f88cfece)
  on the same active causal-root ledger used by the acceleration residual and energy crosswalk. Thus a small branch-virial residual is meaningful only after transmitter identity, polarity, emission time, Jacobian, transmitter-side acceleration weight, and receiver radial power have survived aggregation over the retained records. When the branch is differentiable after mollification and the same signed causal-root ledger is retained, direct differentiation gives the finite-window identity
  $$
  \left\langle
  2T_{\mu,b}^{(\eta)}
  +
  \sum_i
  \mu_{\text{arch}}\,
  \mathbf X_i(T)\cdot\mathbf A_{i,b}^{(\eta)}(T)
  \right\rangle_W
  =
  \frac{
  \mathcal{G}_b^{(\eta)}(T_b)
  -
  \mathcal{G}_b^{(\eta)}(T_a)
  }{
  T_b-T_a
  }
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-8c35f444d2dc9497)
  The branch-virial closure target is the special bounded or periodic case in which the right-hand side is zero or below the declared tolerance:
  $$
  \mathcal{R}_{\mathrm{vir},b}^{(\eta)}(W)
  =
  \left|
  \left\langle
  2T_{\mu,b}^{(\eta)}
  +
  \sum_i
  \mu_{\text{arch}}\,
  \mathbf X_i(T)\cdot\mathbf A_{i,b}^{(\eta)}(T)
  \right\rangle_W
  \right|
  \le
  \epsilon_{\mathrm{vir}}
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-71d5f0000e02ad98)
  This is not yet the classical potential statement. The reduction to $\langle 2T-pU\rangle=0$ additionally requires a branch-local potential $U_b^{(\eta)}$ whose scale variation is controlled by a homogeneity degree $p$,
  $$
  U_b^{(\eta)}(\lambda\mathbf X)
  =
  \lambda^p U_b^{(\eta)}(\mathbf X)
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-81cfa99d0635cea7)
  together with a proof that the same branch acceleration is generated by that potential over $W$. A scale/virial residual that contains zero is therefore diagnostic only until it supplies the same-domain scale generator, homogeneity degree, and branch coordinate needed for this stronger reduction.
- Velocity-regime scope for the branch-virial target:
  - Strict sub-field-speed branch windows are the closest to the classical comparison because nontrivial self-hit roots are excluded on the strictly sub-field-speed interval; delayed partner hits, transmitter-side factors, and transmitter-side acceleration weights still remain in the acceleration term.
  - Field-speed or near-field-speed windows are threshold-sensitive. They require an explicit Jacobian floor, inactive-root gap floor, and unchanged causal-root ledger before the virial residual is meaningful.
  - Super-field-speed history requires the retained self-hit and multi-root rows to be included in $\mathbf A_{i,b}^{(\eta)}(T)$. A speed label alone never certifies the branch; root existence, transversality, transmitter-side acceleration weight, and bounded endpoint virial drift do the work.
- Failure modes:
  - $\mathcal{G}_b^{(\eta)}$ has unbounded secular drift on $W$.
  - The causal-root ledger changes, an inactive-root gap closes, or the Jacobian floor fails.
  - Collision support or the $\eta\to0$ limit is not controlled.
  - No branch-local potential, scale generator, or homogeneity degree is supplied, so the classical potential virial theorem has not been recovered.

Symmetric two-body on a line (exact DDE; challenges):
- Let $X_1(T)=+\tfrac{1}{2}r(T)$ and $X_2(T)=-\tfrac{1}{2}r(T)$ with $r(T)>0$ and $c_f=1$. The causal-time condition implies
  $$
  \frac{r(T)+r(T_t)}{2} \;=\; T - T_t,\qquad T_t<T
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-e3608150113cf43c)
  or, writing $\Delta(T)=T-T_t>0$ implicitly,
  $$
  r(T) + r\!\big(T-\Delta(T)\big) \;=\; 2\,\Delta(T)
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-beb22c39a4d20983)
- For opposite polarities, the exact relative-coordinate equation is the state-dependent DDE
  $$
  \frac{d^2 r}{dT^2} \;=\; -\,\frac{8\,\kappa\,\epsilon^2}{\big(r(T) + r(T-\Delta(T))\big)^2}
  W^{\mathrm{acc}}(T)
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-450e0dfa223303b2)
  with $\Delta(T)$ determined by the implicit constraint above. For equal charges, the sign is reversed.

Integral (delta) form selecting the causal root:
- For particle 1 one may write
  $$
  A_1(T) \;=\; -\,\kappa\,\epsilon^2 \int_{0}^{\infty}
  \frac{c_f\,\delta\!\big(\lvert X_1(T)-X_2(T-\Delta)\rvert - c_f\Delta\big)\,
  \mathrm{sgn}\!\big(X_1(T)-X_2(T-\Delta)\big)}
  {\lvert X_1(T)-X_2(T-\Delta)\rvert^{2}}\; d\Delta
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-aed5720ddeb2bf44)
  whose evaluation selects the causal delay $\Delta(T)$. The delta change of variables contributes $c_f/\lvert c_f-\hat{\mathbf r}\cdot\mathbf V_2(T-\Delta)\rvert=W^{\mathrm{acc}}$ automatically. Multiplying by another $W^{\mathrm{acc}}$ after evaluating the integral would double-count the transmitter-side Jacobian.

Why closed-form solutions are unlikely (even with symmetry):
- The delay is state-dependent: the unknown $r(T)$ appears both in the right-hand side and in the implicit constraint defining $\Delta(T)$, making the problem a nonlinear functional equation rather than an ODE.
- Even linear constant-delay DDEs rarely admit elementary closed forms; state-dependent delays are generically non-integrable. The fixed-center problem is a special case that collapses to an ODE (see [Radial Attraction](radial-attraction.md)).

Solution techniques (toolbox for delayed, radial DDEs):
- Method of steps (constant delays): for problems with fixed delay $\Delta$ and a given history $X(T)=\phi(T)$ on $T\in[-\Delta,0]$, integrate an ODE on successive intervals, using the known past segment on each step.
- State-dependent delay root-tracking: treat $\Delta(T)$ as an algebraic unknown constrained by the causal-time equation (e.g., $r(T)+r(T-\Delta)=2\Delta$). On each step, solve the coupled system with a Newton corrector for $\Delta(T)$; ensures consistency of the delay with the evolving state.
- Collocation / implicit Runge–Kutta with history interpolation: represent the recent history by Hermite/spline polynomials; at each step solve stage equations together with the causal constraint(s), updating a continuous extension of the history.
- Shooting and continuation for periodic motions: pose a boundary-value problem over one period with delay constraints; solve by Newton shooting or collocation and continue solutions via pseudo-arclength. Useful for detecting limit cycles and their stability.
- Spectral-in-time methods: on (quasi-)periodic windows, expand in Fourier/Chebyshev bases; constant delays enter as phase factors, while state-dependent delays are handled by iterating a frozen-delay linearization.
- Stability analysis (qualitative): Lyapunov–Krasovskii and Razumikhin functionals yield sufficient conditions for stability without solving trajectories; applicable to history classes with bounded delays.
- PDE embeddings (transport representation): introduce an auxiliary history field $Y(T,\theta)$ on $\theta\in[-\Delta_{\max},0]$ with $\partial_T Y + \partial_\theta Y = 0$ and boundary $Y(T,0)=X(T)$; discretize in $\theta$ (method of lines). For state-dependent delays, use a moving boundary; aligns with the project’s radial-transport perspective.
- Green’s-function / hit-integral formulations: write per-hit actions as delta-weighted time integrals selecting causal roots; evaluate by robust root-finding and quadrature. This matches the event-driven law used here.
- Measure-driven/event-driven solvers with mollification: replace surface deltas by narrow Gaussians ($\eta>0$) to obtain $C^1$ trajectories; take $\eta\to 0$ in the weak sense after validating work–energy over resolved windows.
- Linear constant-delay benchmarks: for linear DDEs (e.g., $dX/dT = aX + bX(T-\Delta)$) use Laplace transforms/characteristic equations and Lambert W; helpful for validation and step-size/error control, even though the canonical two-body problems here are nonlinear and state-dependent.
- A posteriori error control: use defect/residual of collocation, step halving with history re-interpolation, and event-time error estimates for adaptive step and tolerance selection.
- Fixed-point frameworks: establish local existence/uniqueness by contraction on history spaces $C([-\Delta T_{\max},0])$ (or their mollified variants); use Picard iterations as a solver preconditioner.

Deliverables:
- Precise DDE forms and causal-root conditions for use in analysis and computation.
- Cross-references to sections with receiver-side baseline equations and status notes.
- A minimal benchmark ladder for closure tests:
  - fixed-center ODE recovery,
  - symmetric two-body delayed dynamics,
  - finite-$\eta$ two-body binary closure packet with branch floors and characteristic frequency extraction,
  - work-energy balance on resolved windows,
  - branch-virial residuals where periodic, quasi-periodic, or bounded-drift regimes exist.

Plain language: We give only the exact delayed equations; where an exact solution exists (fixed source), we present it, and where it does not (mutual interaction), we say so without approximations.
