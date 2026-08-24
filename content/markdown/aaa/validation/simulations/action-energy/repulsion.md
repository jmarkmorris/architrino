# Like-Polarity Symmetric Repulsion

Setup:
- Two identical-polarity architrinos (for example, $q_1=q_2=+\epsilon$) placed at separation $r_0$ with $V_1=V_2=0$ and symmetry about the midpoint.

Objectives:
- Delay-only formulation of the equations of motion (DDEs).
- Exact analytic solutions if available; otherwise, status of solvability.

Delay differential equations (two-body, $c_f=1$):
- Causal times:
  - $T_t^{(2\to 1)}\in\mathcal{C}_2(T)$ solves $\lvert X_1(T)-X_2(T_t)\rvert = T-T_t$.
  - $T_t^{(1\to 2)}\in\mathcal{C}_1(T)$ solves $\lvert X_2(T)-X_1(T_t)\rvert = T-T_t$.
- Accelerations (sum over all causal roots if multiple exist):
  $$
  A_1(T)
  \;=\;
  \sum_{T_t\in\mathcal{C}_2(T)}
  +\,\kappa\,\epsilon^2\,W_{12}^{\mathrm{acc}}(T;T_t)\frac{\mathrm{sgn}\!\big(X_1(T)-X_2(T_t)\big)}{r_{12}^2},
  \quad
  r_{12}=\big|X_1(T)-X_2(T_t)\big|
  $$

  [Explore this equation in Equation Mapping](../../../../../../equation-mapping.html#corpus-equation-6f74f489f538e74a)
  $$
  A_2(T)
  \;=\;
  \sum_{T_t\in\mathcal{C}_1(T)}
  +\,\kappa\,\epsilon^2\,W_{21}^{\mathrm{acc}}(T;T_t)\frac{\mathrm{sgn}\!\big(X_2(T)-X_1(T_t)\big)}{r_{21}^2},
  \quad
  r_{21}=\big|X_2(T)-X_1(T_t)\big|
  $$

  [Explore this equation in Equation Mapping](../../../../../../equation-mapping.html#corpus-equation-667f2aac178100cf)
- $W_{12}^{\mathrm{acc}}$ and $W_{21}^{\mathrm{acc}}$ are the corresponding transmitter-side acceleration weights. A root with a failed transmitter-side floor is a branch-transition or caustic case, not an ordinary stable row of this two-body DDE.
- Because the two line-of-action signs are opposite, symmetry implies $X_1(T)=-X_2(T)$ and $A_1(T)=-A_2(T)$ for all $T$ given symmetric initial data.

Solvability status:
- No exact closed-form solution is presently known for the coupled DDE system under mutual repulsion with delay.

Deliverables:
- Exact DDE statements and causal-root definitions suitable for analysis and computation.
- Notes on symmetry and qualitative properties without invoking approximations.

Plain language: Two like polarities at rest push apart along the line under the delayed law; the governing equations are implicit in the causal times, and no closed-form solution is currently known.
