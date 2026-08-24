# Well-posedness and regularization

The regularized simulation replaces each sharp causal-surface delta by a narrow mollifier while preserving total emission $q$:
$$
\delta(r-\Delta)\longrightarrow
\frac{1}{\sqrt{2\pi}\,\eta}
\exp\!\left(-\frac{(r-\Delta)^2}{2\eta^2}\right)
$$

## Impulses Versus Smooth Pushes

- Measure-driven dynamics:
  - With exact surface deltas, dynamics are impulsive: velocities are functions of bounded variation with jump discontinuities at hit times.

- Mollified isochron surfaces:
  - Replacing $\delta(\cdot)$ by a narrow Gaussian of width $\eta > 0$ spreads each causal surface’s intersection into a short, smooth push. This can yield classical $C^1$ trajectories on an admitted history chart, but the solver must still retain and reconstruct the delayed path segment.

- Choosing $\eta$:
  - Select $\eta$ small relative to local geometric scales (path curvature radius, inter-source spacing) to approximate the event-driven picture while maintaining numerical stability.

- Distributional wake-surface normalization:
  - Treat $\delta(r-c_f\Delta)$ and $\delta_\eta(r-c_f\Delta)$ as distributions, so the invariant statement is an integrated statement against a test function, not the sampled height of the spike. For $\Delta=T-T_t$ and $r=\|\mathbf X-\mathbf X_0\|$,
    $$
    \rho_\eta(T,\mathbf X)=
    \frac{q}{4\pi r^2}\,\delta_\eta(r-c_f\Delta)\,H(\Delta)
    $$
    must satisfy
    $$
    \lim_{\eta\to0}\int_{\Sigma_T} f(\mathbf X)\,\rho_\eta(T,\mathbf X)\,dV
    =
    \frac{qH(\Delta)}{4\pi}\int_{S^2} f(\mathbf X_0+c_f\Delta\,\hat{\boldsymbol{\omega}})\,d\Omega
    $$
  - In particular, $f\equiv1$ gives the total-emission check
    $$
    \int_{\Sigma_T}\rho_\eta(T,\mathbf X)\,dV \longrightarrow qH(\Delta)
    $$
    On a finite annulus $R_-\le r\le R_+$, the expected retained amount is
    $$
    Q_{\eta}^{\mathrm{ann}}(R_-,R_+;T)=
    qH(\Delta)\int_{R_-}^{R_+}\delta_\eta(r-c_f\Delta)\,dr
    $$
    The annular residual is therefore
    $$
    R_N(R_-,R_+;T)\equiv
    \frac{\left|\int_{R_-\le r\le R_+}\rho_\eta(T,\mathbf X)\,dV-Q_{\eta}^{\mathrm{ann}}(R_-,R_+;T)\right|}
    {|q|+\varepsilon_q}
    $$
    This catches missing $4\pi r^2$ factors, lost radial Jacobians, and mollifiers that do not preserve total emission.

- Curvilinear-coordinate hygiene:
  - Operator checks in spherical or cylindrical charts must use the Euclidean metric scale factors, not Cartesian component formulas applied to curvilinear components. For spherical coordinates $(r,\theta,\varphi)$ centered on the emission point,
    $$
    dV=r^2\sin\theta\,dr\,d\theta\,d\varphi,\qquad
    dS_R=R^2\sin\theta\,d\theta\,d\varphi
    $$
    and a radial diagnostic channel $F_r(r)\hat{\mathbf{r}}$ obeys
    $$
    \nabla\!\cdot\!\big(F_r(r)\hat{\mathbf{r}}\big)=
    \frac{1}{r^2}\frac{\partial}{\partial r}\!\left(r^2F_r(r)\right)
    $$
    For a radial scalar $f(r)$,
    $$
    \Delta f=
    \frac{1}{r^2}\frac{\partial}{\partial r}\!\left(r^2\frac{\partial f}{\partial r}\right)
    $$
    The invalid shortcut $\nabla\!\cdot(F_r\hat{\mathbf{r}})=\partial_rF_r$ breaks the conservation normalization of causal wake surfaces.

- Finite-limit discipline:
  - Treat finite architrino count, finite memory depth, finite step size, finite domain/window, and finite $\eta > 0$ as the first proof or simulation regime.
  - Promote large-system, continuum, or $\eta\to0$ statements only after the retained observables converge under the declared refinement path.
  - Do not replace arbitrarily large finite systems with an actual infinite medium unless the limit preserves the causal-root count, transmitter-side Jacobian floors, transmitter-side acceleration weights, work-energy residuals, and thermodynamic summaries being claimed.

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
    \big)
    $$
    where $\mathsf{status}_{\eta,*}$ is the candidate branch status, chosen from the existing simple-root, fold-layer, inactive-gap, or rejected statuses, $\mathsf{regularization}_{\eta,*}$ names the finite-$\eta$ route used through the window, $\mathsf{window\_scale}_{\eta,*}$ records the declared transition scaling, and $\mathcal{Y}_{\eta,*}$ is the set of observables promoted through that window.
  - For each promoted observable $Y\in\mathcal{Y}_{\eta,*}$, define
    $$
    E_{\mathrm{trans}}(Y;\eta,\eta/2;I_*)
    =
    \frac{\|R(Y_{\eta/2}|_{I_*})-Y_{\eta}|_{I_*}\|_{L^2(I_*,\{x_k\})}}
    {\|R(Y_{\eta/2}|_{I_*})\|_{L^2(I_*,\{x_k\})}+\varepsilon_0}
    $$
  - The transition passes only if
    $$
    \mathsf{status}_{\eta,*}=\mathsf{status}_{\eta/2,*},
    \qquad
    E_{\mathrm{trans}}(Y;\eta,\eta/2;I_*)\le\tau_{\mathrm{trans},Y}
    \quad\text{for every }Y\in\mathcal{Y}_{\eta,*}
    $$
    and every root-ledger row in $I_*$ keeps transmitter identity, branch class, and status metadata under the same matching rule used by $\Delta_{\eta,\mathrm{root}}$.
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
    {\max(\Delta T,\Delta h,\eta/c_f,\varepsilon_0)}
    $$
    Unstable jump identity routes to $\mathsf{branch\_root\_instability}$; unresolved jump or interpolation convergence routes to $\mathsf{mesh\_nonconvergence}$.

- Fold-layer status is only a transition classification. A stable fold-layer row may preserve branch identity through $\eta$ refinement, but it does not prove branch-equation balance. When the run claims a corrected one-period carrier, the acceleration-balance residual for that period must also pass before the result can proceed to monodromy, $\Delta_{\mathbf{k}}$, or $\eta$-ladder persistence.

- Energetic consistency:
  - A fixed-transmitter benchmark may verify $\Delta E_k=-\Delta U$ with $U=q'\Phi_\eta$ on resolved intervals. A moving-transmitter, self-hit, or open-boundary branch must instead close the history-aware energy, wake, and boundary terms defined in [Delay Dynamics and Energy](delay-dynamics-energy.md). Convergence of interval integrals as $\eta\to0$ is a separate claim governed by the continuation package below; it is not implied by choosing a Gaussian mollifier.

## Formal $\eta > 0$ Continuation Package

The regularization package for a promoted run family is
$$
\mathsf{Reg}_\eta
=
(\delta_\eta,\mathcal{A}_\eta,\mathsf{WP}_\eta,\mathsf{NR}_\eta,\mathsf{Cont}_\eta,\partial\mathcal{A}_\eta)
$$
where $\delta_\eta$ is the mollified causal-wake kernel, $\mathcal{A}_\eta$ is the admissible history set, $\mathsf{WP}_\eta$ is the existence-uniqueness statement, $\mathsf{NR}_\eta$ is the no-runaway bound, $\mathsf{Cont}_\eta$ is the continuation criterion, and $\partial\mathcal{A}_\eta$ is the failure boundary.

On a finite interval $[0,T]$, the admissible history set is
$$
\mathcal{A}_\eta(T;V,d,\nu,B)
=
\left\{
S_{\eta,U}:
\sup_{U\le T}\|\mathbf V(U)\|\le V,\quad
\inf r_{ij,\ell}(U)\ge d,\quad
\inf|\partial_\Delta g_{ij,\ell}(U)|\ge \nu,\quad
\sup B_{ij}^{\mathrm{active}}(U)\le B
\right\}
$$
Existence and uniqueness mean that every declared initial history $S_{\eta,0}\in\mathcal{A}_\eta(T;V,d,\nu,B)$ generates a unique $S_\eta(U)$ on $[0,T]$ in the declared history class, and that the emitted root ledger is generated by that solution rather than by a post-hoc branch choice.

The no-runaway condition requires a validated energy construction, not time-translation symmetry alone. On the same branch chart and isolated window, the packet must identify one accepted construction route from [Delay Dynamics Energy](delay-dynamics-energy.md), retain the corresponding boundary convention, establish the lower bound
$$
E_{\text{tot}}^{(\eta)}(T)
=
K_{\mu}(T)+E_{\text{wake}}^{(\eta)}(T),
\qquad
E_{\text{wake}}^{(\eta)}(T)\ge U_{\min}^{(\eta)}>-\infty
$$
and report
$$
\epsilon_E^{(\eta)}([0,T];\mathfrak B)\le\tau_E
$$
for a predeclared tolerance $\tau_E$ that remains satisfied under temporal, history-window, and regulator refinement. Only those jointly validated rows license the finite-window kinetic bound
$$
K_{\mu}(T)
\le
E_{\text{tot}}^{(\eta)}(0)-U_{\min}^{(\eta)}
+\left|\mathcal R_E^{(\eta)}([0,T];\mathfrak B)\right|
$$
on the isolated run window. Preserved time-translation symmetry is a required input to an action-boundary construction, but it is not by itself a conservation or no-runaway certificate.

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
\{\|\mathbf V\|=V\}
\cup
\{r_{ij,\ell}=d\}
\cup
\{|\partial_\Delta g_{ij,\ell}|=\nu\}
\cup
\{B_{ij}^{\mathrm{active}}=B\}
\cup
\{E_{\text{wake}}^{(\eta)}\downarrow -\infty\}
$$
Crossing any component of $\partial\mathcal{A}_\eta$ changes the promotion status to $\mathsf{eta\_continuation\_failure}$ unless a stricter replacement bound is proved in the same artifact packet.

For the finite-$\eta$ pathology theorem target in [Master Equation](../../../dynamics/master-equation.md#finite-regulator-pathology-quarantine-theorem-target), a promoted run family must report the same boundary components as observables, not only as solver diagnostics. Divergent self-energy is routed through the $d$ or $\epsilon_c$ row, runaway behavior through the $E_{\text{wake}}^{(\eta)}$ lower-bound row, pre-acceleration through the retained-history and endpoint-convention row, and caustic blow-up through the $\nu$ and transition-status rows. The minimum residual packet is:

- root residual and root-transport residual for every retained row,
- active transmitter-side Jacobian floor, transmitter-side acceleration-weight floor or certified interval, and inactive-root gap,
- finite-memory coverage and endpoint or period-cut leakage,
- energy, momentum, and angular-momentum residuals computed with the same $\eta$, window, and endpoint convention,
- transition-observable refinement residuals $E_{\mathrm{trans}}(Y;\eta,\eta/2;I_*)$ for every fold-layer or caustic transit promoted through the window,
- $\Delta_{\eta,\mathrm{root}}$ for every active branch ledger in the $\eta$ ladder.

If any row is missing, the artifact status is $\mathsf{artifact\_incomplete}$. If a row is present but fails under refinement, the status is the corresponding continuation, regulator-dependence, or branch-root instability failure already defined above.

The $\eta\to0^+$ claim boundary is
$$
\limsup_{\eta\to0^+}E_\eta(Y;\eta,\eta/2)=0,
\qquad
\limsup_{\eta\to0^+}\Delta_{\eta,\mathrm{root}}=0
$$
for every promoted observable and active branch ledger. Otherwise the result remains finite-$\eta$ evidence only.

Plain language: The ideal model gives instantaneous kicks; a tiny thickening turns them into brief, smooth nudges that a delayed-history solver can integrate. Large-system or zero-width claims have to be earned by convergence, not assumed from the finite calculation.
