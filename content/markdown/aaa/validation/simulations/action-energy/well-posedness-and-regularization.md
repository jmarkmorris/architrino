# Well-posedness and regularization

Existing text excerpt:
> ### **Well-posedness and Regularization**
> $$
> \delta(r - \tau)\ \longrightarrow\ \frac{1}{\sqrt{2\pi}\,\eta}\,\exp\!\Big(-\frac{(r - \tau)^2}{2\eta^2}\Big),
> $$
> while preserving total emission $q$.

Detailed explanation (impulses vs smooth pushes):

- Measure-driven dynamics:
  - With exact surface deltas, dynamics are impulsive: velocities are functions of bounded variation with jump discontinuities at hit times.

- Mollified isochron surfaces:
  - Replacing $\delta(\cdot)$ by a narrow Gaussian of width $\eta>0$ spreads each causal surface’s intersection into a short, smooth push, yielding classical $C^1$ trajectories for standard ODE solvers.

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
  - Treat finite source count, finite memory depth, finite step size, finite domain/window, and finite $\eta>0$ as the first proof or simulation regime.
  - Promote large-system, continuum, or $\eta\to0$ statements only after the retained observables converge under the declared refinement path.
  - Do not replace arbitrarily large finite systems with an actual infinite medium unless the limit preserves the causal-root count, Jacobian floors, work-energy residuals, and thermodynamic summaries being claimed.

- Energetic consistency:
  - On resolved intervals, the work–energy relation holds with $\Phi_\eta$; as $\eta\to 0$, interval integrals converge to the impulsive model.

Plain language: The ideal model gives instantaneous kicks; a tiny thickening turns them into brief, smooth nudges so you can integrate with ordinary ODE solvers. Large-system or zero-width claims have to be earned by convergence, not assumed from the finite calculation.
