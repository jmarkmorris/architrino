# Well-posedness and regularization

The regularized simulation replaces each sharp causal-surface delta by a narrow mollifier while preserving total emission $q$:
$$
\delta(r-\tau)\longrightarrow
\frac{1}{\sqrt{2\pi}\,\eta}
\exp\!\left(-\frac{(r-\tau)^2}{2\eta^2}\right).
$$

## Impulses Versus Smooth Pushes

- Measure-driven dynamics:
  - With exact surface deltas, dynamics are impulsive: velocities are functions of bounded variation with jump discontinuities at hit times.

- Mollified isochron surfaces:
  - Replacing $\delta(\cdot)$ by a narrow Gaussian of width $\eta > 0$ spreads each causal surface’s intersection into a short, smooth push, yielding classical $C^1$ trajectories for standard ODE solvers.

- Choosing $\eta$:
  - Select $\eta$ small relative to local geometric scales (path curvature radius, inter-source spacing) to approximate the event-driven picture while maintaining numerical stability.

- Distributional wake-surface normalization:
  - Treat $\delta(r-v\tau)$ and $\delta_\eta(r-v\tau)$ as distributions, so the invariant statement is an integrated statement against a test function, not the sampled height of the spike. For $\tau=t-t_0$ and $r=\|\mathbf{s}-\mathbf{s}_0\|$,
    $$
    \rho_\eta(t,\mathbf{s})=
    \frac{q}{4\pi r^2}\,\delta_\eta(r-v\tau)\,H(\tau)
    $$
    must satisfy
    $$
    \lim_{\eta\to0}\int_{\Sigma_t} f(\mathbf{s})\,\rho_\eta(t,\mathbf{s})\,dV
    =
    \frac{qH(\tau)}{4\pi}\int_{S^2} f(\mathbf{s}_0+v\tau\,\hat{\boldsymbol{\omega}})\,d\Omega.
    $$
  - In particular, $f\equiv1$ gives the total-emission check
    $$
    \int_{\Sigma_t}\rho_\eta(t,\mathbf{s})\,dV \longrightarrow qH(\tau).
    $$
    On a finite annulus $R_-\le r\le R_+$, the expected retained amount is
    $$
    Q_{\eta}^{\mathrm{ann}}(R_-,R_+;t)=
    qH(\tau)\int_{R_-}^{R_+}\delta_\eta(r-v\tau)\,dr.
    $$
    The annular residual is therefore
    $$
    R_N(R_-,R_+;t)\equiv
    \frac{\left|\int_{R_-\le r\le R_+}\rho_\eta(t,\mathbf{s})\,dV-Q_{\eta}^{\mathrm{ann}}(R_-,R_+;t)\right|}
    {|q|+\varepsilon_q}.
    $$
    This catches missing $4\pi r^2$ factors, lost radial Jacobians, and mollifiers that do not preserve total emission.

- Curvilinear-coordinate hygiene:
  - Operator checks in spherical or cylindrical charts must use the Euclidean metric scale factors, not Cartesian component formulas applied to curvilinear components. For spherical coordinates $(r,\theta,\varphi)$ centered on the emission point,
    $$
    dV=r^2\sin\theta\,dr\,d\theta\,d\varphi,\qquad
    dS_R=R^2\sin\theta\,d\theta\,d\varphi,
    $$
    and a radial diagnostic channel $F_r(r)\hat{\mathbf{r}}$ obeys
    $$
    \nabla\!\cdot\!\big(F_r(r)\hat{\mathbf{r}}\big)=
    \frac{1}{r^2}\frac{\partial}{\partial r}\!\left(r^2F_r(r)\right).
    $$
    For a radial scalar $f(r)$,
    $$
    \Delta f=
    \frac{1}{r^2}\frac{\partial}{\partial r}\!\left(r^2\frac{\partial f}{\partial r}\right).
    $$
    The invalid shortcut $\nabla\!\cdot(F_r\hat{\mathbf{r}})=\partial_rF_r$ breaks the conservation normalization of causal wake surfaces.

- Finite-limit discipline:
  - Treat finite source count, finite memory depth, finite step size, finite domain/window, and finite $\eta > 0$ as the first proof or simulation regime.
  - Promote large-system, continuum, or $\eta\to0$ statements only after the retained observables converge under the declared refinement path.
  - Do not replace arbitrarily large finite systems with an actual infinite medium unless the limit preserves the causal-root count, Jacobian floors, work-energy residuals, and thermodynamic summaries being claimed.

- State-dependent branch-transition discipline:
  - State-dependent delay systems can lose classical branch continuation at transition points where a delayed argument crosses a branch boundary, a causal-root count changes, or a derivative-sensitive row enters a fold-layer. A finite-$\eta$ run must therefore record how the regularized trajectory crosses each such window rather than treating the crossing as ordinary time-step noise.
  - For every declared transition window $I_*=[t_*-\Delta_*,t_*+\Delta_*]$, emit
    $$
    \mathcal{T}_{\eta,*}
    =
    \big(
    I_*,
    \mathcal{L}_{\mathrm{root}}|_{I_*},
    \mathsf{status}_{\eta,*},
    \mathsf{regularization}_{\eta,*},
    \mathsf{window\_scale}_{\eta,*},
    \mathcal{Y}_{\eta,*},
    \mathcal{E}_{\mathrm{trans},*}
    \big),
    $$
    where $\mathsf{status}_{\eta,*}$ is the candidate branch status, chosen from the existing simple-root, fold-layer, inactive-gap, or rejected statuses, $\mathsf{regularization}_{\eta,*}$ names the finite-$\eta$ route used through the window, $\mathsf{window\_scale}_{\eta,*}$ records the declared transition scaling, and $\mathcal{Y}_{\eta,*}$ is the set of observables promoted through that window.
  - For each promoted observable $Y\in\mathcal{Y}_{\eta,*}$, define
    $$
    E_{\mathrm{trans}}(Y;\eta,\eta/2;I_*)
    =
    \frac{\|R(Y_{\eta/2}|_{I_*})-Y_{\eta}|_{I_*}\|_{L^2(I_*,\{x_k\})}}
    {\|R(Y_{\eta/2}|_{I_*})\|_{L^2(I_*,\{x_k\})}+\varepsilon_0}.
    $$
  - The transition passes only if
    $$
    \mathsf{status}_{\eta,*}=\mathsf{status}_{\eta/2,*},
    \qquad
    E_{\mathrm{trans}}(Y;\eta,\eta/2;I_*)\le\tau_{\mathrm{trans},Y}
    \quad\text{for every }Y\in\mathcal{Y}_{\eta,*},
    $$
    and every root-ledger row in $I_*$ keeps source identity, branch class, and status metadata under the same matching rule used by $\Delta_{\eta,\mathrm{root}}$.
  - If the branch status flips under $\eta$ refinement, route the run to $\mathsf{branch\_root\_instability}$. If the status is stable but the promoted transition observables fail the tolerance, route it to $\mathsf{regulator\_dependence}$. If the transition record is missing, route it to $\mathsf{artifact\_incomplete}$.
  - For nonsmooth windows, the transition record must include jump-location rows
    $$
    \mathcal{D}_{\mathrm{jump}}
    =
    \{(\xi_a,k_a,\ell_a,\xi_{\pi(a)},R_{\mathrm{jump},a})\},
    \qquad
    R_{\mathrm{jump},a}
    =
    \frac{|t_{0,\ell_a}(\xi_a)-\xi_{\pi(a)}|}
    {\max(\Delta t,\Delta h,\eta/c_f,\varepsilon_0)}.
    $$
    Unstable jump identity routes to $\mathsf{branch\_root\_instability}$; unresolved jump or interpolation convergence routes to $\mathsf{mesh\_nonconvergence}$.

- Fold-layer status is only a transition classification. A stable fold-layer row may preserve branch identity through $\eta$ refinement, but it does not prove branch-equation balance. When the run claims a corrected one-period carrier, the acceleration-balance residual for that period must also pass before the result can proceed to monodromy, $\Delta_{\mathbf{k}}$, or $\eta$-ladder persistence.

- Energetic consistency:
  - On resolved intervals, the work–energy relation holds with $\Phi_\eta$; as $\eta\to 0$, interval integrals converge to the impulsive model.

## Formal $\eta > 0$ Continuation Package

The regularization package for a promoted run family is
$$
\mathsf{Reg}_\eta
=
(\delta_\eta,\mathcal{A}_\eta,\mathsf{WP}_\eta,\mathsf{NR}_\eta,\mathsf{Cont}_\eta,\partial\mathcal{A}_\eta),
$$
where $\delta_\eta$ is the mollified causal-wake kernel, $\mathcal{A}_\eta$ is the admissible history set, $\mathsf{WP}_\eta$ is the existence-uniqueness statement, $\mathsf{NR}_\eta$ is the no-runaway bound, $\mathsf{Cont}_\eta$ is the continuation criterion, and $\partial\mathcal{A}_\eta$ is the failure boundary.

On a finite interval $[0,T]$, the admissible history set is
$$
\mathcal{A}_\eta(T;V,d,\nu,B)
=
\left\{
S_{\eta,t}:
\sup_{t\le T}\|\mathbf{v}(t)\|\le V,\quad
\inf r_{ij,\ell}(t)\ge d,\quad
\inf|\partial_\tau g_{ij,\ell}(t)|\ge \nu,\quad
\sup B_{ij}^{\mathrm{active}}(t)\le B
\right\}.
$$
Existence and uniqueness mean that every declared initial history $S_{\eta,0}\in\mathcal{A}_\eta(T;V,d,\nu,B)$ generates a unique $S_\eta(t)$ on $[0,T]$ in the declared history class, and that the emitted root ledger is generated by that solution rather than by a post-hoc branch choice.

The no-runaway condition is a lower bound on the regularized wake energy:
$$
E_{\text{tot}}^{(\eta)}(t)
=
K_{\mu}(t)+E_{\text{wake}}^{(\eta)}(t),
\qquad
E_{\text{wake}}^{(\eta)}(t)\ge U_{\min}^{(\eta)}>-\infty.
$$
When the regularization preserves the relevant time-translation symmetry, this gives
$$
K_{\mu}(t)
\le
E_{\text{tot}}^{(\eta)}(0)-U_{\min}^{(\eta)}
$$
on the isolated run window.

The continuation criterion is
$$
S_\eta([0,T])\subset\mathcal{A}_\eta(T;V,d,\nu,B)
\quad\Longrightarrow\quad
\text{the run may be extended past }T
$$
using the same local well-posedness constants after refreshing the history segment at $T$. The failure boundary is
$$
\partial\mathcal{A}_\eta
=
\{\|\mathbf{v}\|=V\}
\cup
\{r_{ij,\ell}=d\}
\cup
\{|\partial_\tau g_{ij,\ell}|=\nu\}
\cup
\{B_{ij}^{\mathrm{active}}=B\}
\cup
\{E_{\text{wake}}^{(\eta)}\downarrow -\infty\}.
$$
Crossing any component of $\partial\mathcal{A}_\eta$ changes the promotion status to $\mathsf{eta\_continuation\_failure}$ unless a stricter replacement bound is proved in the same artifact packet.

The $\eta\to0^+$ claim boundary is
$$
\limsup_{\eta\to0^+}E_\eta(Y;\eta,\eta/2)=0,
\qquad
\limsup_{\eta\to0^+}\Delta_{\eta,\mathrm{root}}=0
$$
for every promoted observable and active branch ledger. Otherwise the result remains finite-$\eta$ evidence only.

Plain language: The ideal model gives instantaneous kicks; a tiny thickening turns them into brief, smooth nudges that ordinary ODE solvers can integrate. Large-system or zero-width claims have to be earned by convergence, not assumed from the finite calculation.
