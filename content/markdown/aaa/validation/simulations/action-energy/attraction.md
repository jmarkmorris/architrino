# Attraction

Two [unlike architrino polarities](../../../foundations/architrino.md), whose interaction sign is attractive, begin far apart and nearly at rest and remain on their initial line in this one-dimensional comparison. Causal delay enters through each partner's past position, and the example contains no transverse acceleration component.

## Setup
- Two architrinos with polarities $q_1=-\epsilon$ and $q_2=+\epsilon$.
- Initial velocities $V_1\approx0$, $V_2\approx0$; initial separation $r_0$ is large relative to the declared reference length.
- For all examples, we restrict motion to a single geometrical line.

### Prescribed Past and Release Convention
- Because the delayed law samples path history, the endpoint values at $T=0$ are not sufficient initial data. For the stationary-release example below, prescribe the past on the required history domain $T\le0$ by $X_1(T)=r_0/2$, $X_2(T)=-r_0/2$, and $V_1(T)=V_2(T)=0$, then release the pair at $T=0$.
- The prescribed past is preparation data rather than a freely evolving equilibrium of the attracting pair. Any finite stored history must cover every emission time used by the causal-root sets; persistence of the reflection symmetry and midpoint rest is conditional on a unique continuation under the stated root rules.

### Prescribed Past and Release Convention
- Because the delayed law samples path history, the endpoint values at $T=0$ are not sufficient initial data. For the stationary-release example below, prescribe the past on the required history domain $T\le0$ by $X_1(T)=r_0/2$, $X_2(T)=-r_0/2$, and $V_1(T)=V_2(T)=0$, then release the pair at $T=0$.
- The prescribed past is preparation data rather than a freely evolving equilibrium of the attracting pair. Any finite stored history must cover every emission time used by the causal-root sets; persistence of the reflection symmetry and midpoint rest is conditional on a unique continuation under the stated root rules.

## Scope and Solvability
- This is a native one-dimensional partner-attraction comparison, not a standard-physics surrogate. It gives a delay differential equation (DDE) formulation and records the solvability status of the resulting delayed evolution.
- Exact analytic solutions are given only where a prescribed history makes a reduction available; no exact closed-form solution is asserted for the fully coupled delayed system.

## Canonical Delayed-Law Conditions
- Delay enters through the implicit emission times $T_t$ satisfying $\lvert X_1(T) - X_2(T_t)\rvert = T - T_t$ (and its counterpart), with $T$ the native absolute time.
- The rows below retain only mutual partner contributions. They equal the total acceleration only on a declared history chart whose same-transmitter root sets are empty; otherwise the canonical law requires additional same-transmitter sums.
- All per-hit acceleration contributions are radial along the line of action and carry the transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$; $H$ is the Heaviside step with $H(0)=0$, excluding $T_t=T$.

## Equations of Motion

For the canonical two-body delayed law, set $c_f=1$.
- Definitions:
  - Polarities: $q_1=-\epsilon$ (particle 1), $q_2=+\epsilon$ (particle 2); $\epsilon>0$ is the polarity-unit magnitude.
  - Coupling: $\kappa>0$ is the universal coupling constant; numerical instantiations use normalized wake-speed units with $c_f=1$.
  - Separation: $r(T)=|X_1(T)-X_2(T)|>0$.
- Causal (path-history) times:
  - For receiver $a$, transmitter $b$, and signed delayed separation $s_{ab}(T;T_t)=X_a(T)-X_b(T_t)$, define $g_{ab}(T;T_t)=|s_{ab}(T;T_t)|-(T-T_t)$ and $D_{t,ab}=\partial_{T_t}g_{ab}=1-V_b(T_t)\operatorname{sgn}(s_{ab}(T;T_t))$.
  - On a supplied history domain $I_b$, the strict-past causal roots are $\mathcal{C}_{a\leftarrow b}(T)=\{T_t\in I_b:T_t<T,\ g_{ab}(T;T_t)=0\}$. Thus $\mathcal{C}_2(T)$ and $\mathcal{C}_1(T)$ below are shorthand for the partner sets $\mathcal{C}_{1\leftarrow2}(T)$ and $\mathcal{C}_{2\leftarrow1}(T)$.
- Per-particle accelerations (sum over all causal roots if multiple exist):
  $$
  A_1(T)
  \;=\;
  \sum_{T_t\in\mathcal{C}_2(T)}
  -\,\kappa\,\epsilon^2\,W_{12}^{\mathrm{acc}}(T;T_t)\frac{\mathrm{sgn}\!\big(X_1(T)-X_2(T_t)\big)}{r_{12}^2},
  \quad
  r_{12}=\big|X_1(T)-X_2(T_t)\big|
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-21b743159cf3e3b1)

  $$
  A_2(T)
  \;=\;
  \sum_{T_t\in\mathcal{C}_1(T)}
  -\,\kappa\,\epsilon^2\,W_{21}^{\mathrm{acc}}(T;T_t)\frac{\mathrm{sgn}\!\big(X_2(T)-X_1(T_t)\big)}{r_{21}^2},
  \quad
  r_{21}=\big|X_2(T)-X_1(T_t)\big|
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-2c5b3d8a9fb366b7)

  Here $\sigma_{q_2 q_1}=\sigma_{q_1 q_2}=-1$ (unlike polarities attract), $W_{ab}^{\mathrm{acc}}=c_f/\lvert D_{t,ab}\rvert$ is the transmitter-side acceleration weight on the corresponding root, and $\mathrm{sgn}(\cdot)$ denotes the sign function. The displayed sharp-root rows apply on a finite complete simple-root chart with $r_{ab}>0$ and $|D_{t,ab}|\ge\delta_D>0$ for every admitted root. If a distance or derivative floor fails, this formula stops; a finite-width or other continuation is a separate explicitly defined law, not an implicit mollification of these rows.

### Relative-Coordinate Delay Equation
- Define $r(T)=X_1(T)-X_2(T)>0$. Then $s_{12}(T;T_t)=X_1(T)-X_2(T_t)$ and $s_{21}(T;T_t)=X_2(T)-X_1(T_t)$ are the signed delayed separations, with $r_{12}=|s_{12}|$ and $r_{21}=|s_{21}|$. Subtracting the two per-particle rows gives
  $$
  \frac{d^2r}{dT^2}\;=\;A_1(T)-A_2(T)
  \;=\;
  -\,\kappa\,\epsilon^2\sum_{T_t\in\mathcal{C}_2(T)}W_{12}^{\mathrm{acc}}(T;T_t)\frac{\mathrm{sgn}\!\big(s_{12}(T;T_t)\big)}{r_{12}^2}
  +\,\kappa\,\epsilon^2\sum_{T_t\in\mathcal{C}_1(T)}W_{21}^{\mathrm{acc}}(T;T_t)\frac{\mathrm{sgn}\!\big(s_{21}(T;T_t)\big)}{r_{21}^2}
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-770f081643146eb7)

  with the two absolute distances fixed by their respective causal-root conditions. For an ordered symmetric history with $X_1>0>X_2$, the first signed separation is positive and the second is negative, so both displayed terms are negative and the instantaneous separation accelerates inward. No exact closed-form solution is presently known for the coupled DDE system.

### Nonlinear History-Anchored Form
  $$
  \mathbf A_1^{(2\to1)}(T)\;=\;-\,\kappa\,\epsilon^2\,W_{12}^{\mathrm{acc}}\,
  \frac{\mathbf X_1(T)-\mathbf X_2\!\big(T_t^{(2\to 1)}\big)}{\big\|\mathbf X_1(T)-\mathbf X_2\!\big(T_t^{(2\to 1)}\big)\big\|^3},
  \qquad
  \mathbf A_2^{(1\to2)}(T)\;=\;-\,\kappa\,\epsilon^2\,W_{21}^{\mathrm{acc}}\,
  \frac{\mathbf X_2(T)-\mathbf X_1\!\big(T_t^{(1\to 2)}\big)}{\big\|\mathbf X_2(T)-\mathbf X_1\!\big(T_t^{(1\to 2)}\big)\big\|^3}
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-4c0bb2e2964b4da3)

  These are per-root partner contributions, with attachment points at the partners’ path-history locations. The total partner acceleration is obtained by summing these expressions over the corresponding causal-root sets; linearizations and small-parameter expansions are intentionally omitted.

### Central-origin kinematics
For the ordered one-dimensional chart $X_1(T)>X_2(T)$, define the signed separation below and stop using this chart if the ordering is lost. Choose a fixed origin at the geometric midpoint. With equal-magnitude polarities and a fully reflection-symmetric prescribed history, this midpoint remains at rest by symmetry provided the delayed problem has a unique continuation.
- Define the separation
  $$
  r(T) \equiv X_1(T) - X_2(T) > 0
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-7e10678a75233e78)

  Positions relative to the central origin are then
  $$
  X_1(T) = \tfrac{1}{2}\,r(T),\qquad
  X_2(T) = -\,\tfrac{1}{2}\,r(T)
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-4c4fa207618fc9e4)

- Velocities follow by differentiation:
  $$
  V_1(T) = \frac{dX_1}{dT}
  = \tfrac{1}{2}\,\frac{dr}{dT},
  \qquad
  V_2(T) = \frac{dX_2}{dT}
  = -\,\tfrac{1}{2}\,\frac{dr}{dT}
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-67a4cf4a320971d3)

- Endpoint values at release (for the prescribed stationary past above):
  $$
  X_1(0)=\tfrac{r_0}{2},\quad
  X_2(0)=-\tfrac{r_0}{2},\quad
  V_1(0)=V_2(0)=0
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-e0defb4c22d7efd2)

## Deliverables
- The equations and causal-root definitions above specify the native partner-attraction comparison on its declared history chart; a complete computational treatment must also account for any admitted same-transmitter roots.
- Solvability status: no closed-form solution is supplied for the fully coupled delayed system. Numerical integration requires complete-history coverage, robust root-finding, and event-aware stepping; no evolved stability, collision, caustic, or conservation result is claimed here.
