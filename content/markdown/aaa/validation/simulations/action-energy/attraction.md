# Attraction

Setup:
- Two architrinos with polarities $q_1=-\epsilon$ and $q_2=+\epsilon$.
- Initial velocities $V_1\approx0$, $V_2\approx0$; initial separation $r_0\gg 1$ (in $v=1$ units).
- For all examples, we restrict motion to a single geometrical line.

Objectives:
- Delay-only formulation of the equations of motion (DDEs).
- Exact analytic solutions if available; otherwise, status of solvability.

Canonical delayed-law considerations:
- Delay enters through the implicit emission times $T_t$ satisfying $\lvert X_1(T) - X_2(T_t)\rvert = T - T_t$ (and its counterpart).
- All per-hit actions are radial along the line of action and carry the receiver-weighted acceleration factor $W^{\mathrm{acc}}=\lvert D_r/D_t\rvert$; $H(0)=0$ excludes $T_t=T$.

Equations of motion (canonical delayed law; two-body, v=1):
- Definitions:
  - Polarities: $q_1=-\epsilon$ (particle 1), $q_2=+\epsilon$ (particle 2); $\epsilon>0$ is the polarity-unit magnitude.
  - Coupling: $\kappa>0$ is the universal coupling constant; we work in units with field speed $v=1$.
  - Separation: $r(T)=|X_1(T)-X_2(T)|>0$.
- Causal (path-history) times:
  - $T_t^{(2\to 1)}\in\mathcal{C}_2(T)$ solves $\lvert X_1(T)-X_2(T_t)\rvert = T-T_t$.
  - $T_t^{(1\to 2)}\in\mathcal{C}_1(T)$ solves $\lvert X_2(T)-X_1(T_t)\rvert = T-T_t$.
- Per-particle accelerations (sum over all causal roots if multiple exist):
  $$
  A_1(T)
  \;=\;
  \sum_{T_t\in\mathcal{C}_2(T)}
  -\,\kappa\,\epsilon^2\,W_{12}^{\mathrm{acc}}(T;T_t)\frac{\mathrm{sgn}\!\big(X_1(T)-X_2(T_t)\big)}{r_{12}^2},
  \quad
  r_{12}=\big|X_1(T)-X_2(T_t)\big|
  $$
  $$
  A_2(T)
  \;=\;
  \sum_{T_t\in\mathcal{C}_1(T)}
  +\,\kappa\,\epsilon^2\,W_{21}^{\mathrm{acc}}(T;T_t)\frac{\mathrm{sgn}\!\big(X_2(T)-X_1(T_t)\big)}{r_{21}^2},
  \quad
  r_{21}=\big|X_2(T)-X_1(T_t)\big|
  $$
  Here $\sigma_{q_2 q_1}=\sigma_{q_1 q_2}=-1$ (unlike polarities attract),
  $W_{ab}^{\mathrm{acc}}=\lvert D_{r,ab}/D_{t,ab}\rvert$ is the receiver-side
  branch strength on the corresponding root, $H(0)=0$ excludes $T_t=T$, and
  $\mathrm{sgn}(\cdot)$ denotes the sign function.

Relative-coordinate DDE:
- Define $r(T)=X_1(T)-X_2(T)>0$. Then
  $$
  \frac{d^2r}{dT^2}\;=\;A_1(T)-A_2(T)
  \;=\;
  -\,\kappa\,\epsilon^2\sum_{T_t\in\mathcal{C}_2(T)}W_{12}^{\mathrm{acc}}(T;T_t)\frac{\mathrm{sgn}\!\big(r_{12}\big)}{r_{12}^2}
  -\,\kappa\,\epsilon^2\sum_{T_t\in\mathcal{C}_1(T)}W_{21}^{\mathrm{acc}}(T;T_t)\frac{\mathrm{sgn}\!\big(r_{21}\big)}{r_{21}^2}
  $$
  with $r_{12}=|X_1(T)-X_2(T_t)|$ and $r_{21}=|X_2(T)-X_1(T_t)|$ defined by their respective causal-root conditions. No exact closed-form solution is presently known for the coupled DDE system.

Nonlinear history-anchored form (vector notation for clarity):
  $$
  \mathbf A_1(T)\;=\;-\,\kappa\,\epsilon^2\,W_{12}^{\mathrm{acc}}\,
  \frac{\mathbf X_1(T)-\mathbf X_2\!\big(T_t^{(2\to 1)}\big)}{\big\|\mathbf X_1(T)-\mathbf X_2\!\big(T_t^{(2\to 1)}\big)\big\|^3},
  \qquad
  \mathbf A_2(T)\;=\;+\,\kappa\,\epsilon^2\,W_{21}^{\mathrm{acc}}\,
  \frac{\mathbf X_2(T)-\mathbf X_1\!\big(T_t^{(1\to 2)}\big)}{\big\|\mathbf X_2(T)-\mathbf X_1\!\big(T_t^{(1\to 2)}\big)\big\|^3}
  $$
  The attachment points are the partners’ path-history locations at their respective causal emission times; linearizations and small-parameter expansions are intentionally omitted.

Central-origin kinematics (1D positions and velocities; symmetric two-body frame)
- Choose a fixed origin at the geometric midpoint. With equal-magnitude charges and symmetric initial data, this midpoint remains at rest by symmetry.
- Define the separation
  $$
  r(T) \equiv X_1(T) - X_2(T) > 0
  $$
  Positions relative to the central origin are then
  $$
  X_1(T) = \tfrac{1}{2}\,r(T),\qquad
  X_2(T) = -\,\tfrac{1}{2}\,r(T)
  $$
- Velocities follow by differentiation:
  $$
  V_1(T) = \frac{dX_1}{dT}
  = \tfrac{1}{2}\,\frac{dr}{dT},
  \qquad
  V_2(T) = \frac{dX_2}{dT}
  = -\,\tfrac{1}{2}\,\frac{dr}{dT}
  $$
- Symmetric initial conditions (example):
  $$
  X_1(0)=\tfrac{r_0}{2},\quad
  X_2(0)=-\tfrac{r_0}{2},\quad
  V_1(0)=V_2(0)=0
  $$

Deliverables:
- Exact DDE statements and causal-root definitions suitable for analysis and computation.
- Solvability status: no known closed-form solution; numerical integration requires robust root-finding and event-aware stepping.

Plain language: Start very far apart and nearly at rest—motion remains on the initial line. Delay enters through the partner’s past position via the causal-time condition; there is no sideways component in this example.
