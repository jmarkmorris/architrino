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

- Finite-limit discipline:
  - Treat finite source count, finite memory depth, finite step size, finite domain/window, and finite $\eta>0$ as the first proof or simulation regime.
  - Promote large-system, continuum, or $\eta\to0$ statements only after the retained observables converge under the declared refinement path.
  - Do not replace arbitrarily large finite systems with an actual infinite medium unless the limit preserves the causal-root count, Jacobian floors, work-energy residuals, and thermodynamic summaries being claimed.

- Energetic consistency:
  - On resolved intervals, the work–energy relation holds with $\Phi_\eta$; as $\eta\to 0$, interval integrals converge to the impulsive model.

Plain language: The ideal model gives instantaneous kicks; a tiny thickening turns them into brief, smooth nudges so you can integrate with ordinary ODE solvers. Large-system or zero-width claims have to be earned by convergence, not assumed from the finite calculation.
