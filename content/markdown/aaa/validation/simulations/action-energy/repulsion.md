# Equal-Charge Symmetric Repulsion

Setup:
- Two identical charges (e.g., $q_1=q_2=+\epsilon$) placed at separation $r_0$ with $V_1=V_2=0$ and symmetry about the midpoint.

Objectives:
- Delay-only formulation of the equations of motion (DDEs).
- Exact analytic solutions if available; otherwise, status of solvability.

Delay differential equations (two-body, v=1):
- Causal times:
  - $T_{\mathrm{em}}^{(2\to 1)}\in\mathcal{C}_2(T)$ solves $\lvert X_1(T)-X_2(T_{\mathrm{em}})\rvert = T-T_{\mathrm{em}}$.
  - $T_{\mathrm{em}}^{(1\to 2)}\in\mathcal{C}_1(T)$ solves $\lvert X_2(T)-X_1(T_{\mathrm{em}})\rvert = T-T_{\mathrm{em}}$.
- Accelerations (sum over all causal roots if multiple exist):
  $$
  A_1(T)
  \;=\;
  \sum_{T_{\mathrm{em}}\in\mathcal{C}_2(T)}
  +\,\kappa\,\epsilon^2\,W_{12}^{\mathrm{rec}}(T;T_{\mathrm{em}})\frac{\mathrm{sgn}\!\big(X_1(T)-X_2(T_{\mathrm{em}})\big)}{r_{12}^2},
  \quad
  r_{12}=\big|X_1(T)-X_2(T_{\mathrm{em}})\big|
  $$
  $$
  A_2(T)
  \;=\;
  \sum_{T_{\mathrm{em}}\in\mathcal{C}_1(T)}
  -\,\kappa\,\epsilon^2\,W_{21}^{\mathrm{rec}}(T;T_{\mathrm{em}})\frac{\mathrm{sgn}\!\big(X_2(T)-X_1(T_{\mathrm{em}})\big)}{r_{21}^2},
  \quad
  r_{21}=\big|X_2(T)-X_1(T_{\mathrm{em}})\big|
  $$
- $W_{12}^{\mathrm{rec}}$ and $W_{21}^{\mathrm{rec}}$ are the corresponding receiver-normal branch strengths. A root with a failed source-normal floor is a branch-transition or caustic case, not an ordinary stable row of this two-body DDE.
- Symmetry implies $X_1(T)=-X_2(T)$ and $A_1(T)=-A_2(T)$ for all $T$ given symmetric initial data.

Solvability status:
- No exact closed-form solution is presently known for the coupled DDE system under mutual repulsion with delay.

Deliverables:
- Exact DDE statements and causal-root definitions suitable for analysis and computation.
- Notes on symmetry and qualitative properties without invoking approximations.

Plain language: Two like polarities at rest push apart along the line under the delayed law; the governing equations are implicit in the causal times, and no closed-form solution is currently known.
