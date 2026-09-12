# Like-Polarity Symmetric Repulsion

An [architrino](../../../foundations/architrino.md) is a primitive pointlike entity carrying a fixed polarity and emitting expanding causal wakes from its past positions. Two equal-polarity architrinos released from a prescribed stationary past have outward acceleration along their common line. This result follows from the [Master Equation](../../../dynamics/master-equation.md): each arriving wake contributes acceleration directed from its emission point toward the receiver for like polarities. Continued symmetric repulsion is conditional on the histories and causal roots specified below.

## Setup

Use absolute time $T$ and signed positions $X_i(T)$ along one fixed line in the Euclidean void, with a fixed origin at the preparation midpoint. The index $i\in\{1,2\}$ identifies the architrino; $V_i=dX_i/dT$ and $A_i=d^2X_i/dT^2$ are its velocity and acceleration. Set the wake propagation speed to $c_f=1$. Let $q_1=q_2=+\epsilon$, where $\epsilon>0$ is the polarity-unit magnitude, and let $\kappa>0$ be the acceleration coupling. Taking both polarities negative gives the same product and response. The pair is isolated: no other transmitters contribute arriving wakes.

A delay differential equation (DDE) samples earlier positions and velocities, so endpoint data alone do not specify its initial state. For stationary release at $T=0$, prescribe $X_1(T)=r_0/2$, $X_2(T)=-r_0/2$, and $V_1(T)=V_2(T)=0$ for all $T\le0$, with initial separation $r_0>0$. This past is preparation data, not a freely evolving equilibrium; the acceleration immediately after release need not match the prescribed pre-release acceleration. A finite stored history must cover every contributing emission time, or declare and control the omitted contribution before representing the full law.

## Delay Differential Equations

For receiver $i$ and transmitter $j$, define the signed delayed separation $s_{ij}(T;T_t)=X_i(T)-X_j(T_t)$, its distance $r_{ij}=|s_{ij}|$, and the causal gap $g_{ij}(T;T_t)=r_{ij}-(T-T_t)$. A causal root is an emission time whose expanding wake reaches the receiver: on the supplied history domain $I_j$, the root set is $\mathcal C_{i\leftarrow j}(T)=\{T_t\in I_j:T_t<T,\ g_{ij}(T;T_t)=0\}$. The strict-past inequality excludes the zero-delay endpoint and ensures $r_{ij}=T-T_t>0$ at every root. Write $\mathcal C_2(T)=\mathcal C_{1\leftarrow2}(T)$ and $\mathcal C_1(T)=\mathcal C_{2\leftarrow1}(T)$ for the two partner sets below.

The transmitter-side derivative is $D_{t,ij}=\partial_{T_t}g_{ij}=1-\operatorname{sgn}(s_{ij})V_j(T_t)$, where $\operatorname{sgn}$ denotes the sign function. Each simple root, meaning $D_{t,ij}\ne0$, carries the positive acceleration weight $W_{ij}^{\mathrm{acc}}=1/|D_{t,ij}|$. Receiver velocity does not multiply this weight. Use a finite complete root inventory on the declared interval, with distance floor $r_{ij}\ge d>0$ and derivative floor $|D_{t,ij}|\ge\nu_t>0$, where $d$ and $\nu_t$ are positive bounds defining the regular domain.

The following equations give total accelerations on a domain with no same-transmitter roots, $\mathcal C_{i\leftarrow i}(T)=\varnothing$. Their positive coupling sign is $\operatorname{sgn}(q_1q_2)=+1$; all partner roots contribute:
  $$
  A_1(T)
  \;=\;
  \sum_{T_t\in\mathcal{C}_2(T)}
  +\,\kappa\,\epsilon^2\,W_{12}^{\mathrm{acc}}(T;T_t)\frac{\mathrm{sgn}\!\big(X_1(T)-X_2(T_t)\big)}{r_{12}^2},
  \quad
  r_{12}=\big|X_1(T)-X_2(T_t)\big|
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-6f74f489f538e74a)

  $$
  A_2(T)
  \;=\;
  \sum_{T_t\in\mathcal{C}_1(T)}
  +\,\kappa\,\epsilon^2\,W_{21}^{\mathrm{acc}}(T;T_t)\frac{\mathrm{sgn}\!\big(X_2(T)-X_1(T_t)\big)}{r_{21}^2},
  \quad
  r_{21}=\big|X_2(T)-X_1(T_t)\big|
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-667f2aac178100cf)

If a same-transmitter root exists, the corresponding displayed equation contains only the partner contribution. The canonical total must also include $\kappa\epsilon^2\sum_{T_t\in\mathcal C_{i\leftarrow i}(T)}W_{ii}^{\mathrm{acc}}\operatorname{sgn}(s_{ii})/r_{ii}^2$ on admitted regular roots. A sufficient condition for no self-hits is a speed bound $|V_i(u)|\le v_*<1$ over every relevant interval from emission to reception: integration gives $|X_i(T)-X_i(T_t)|\le v_*(T-T_t)<T-T_t$, which excludes the self-root equality. Present rest or straight-line motion alone does not exclude delayed self-hits.

A failed distance or derivative floor ends the stated regular-domain guarantee. An exact $D_{t,ij}=0$ is a degenerate root where the displayed sharp-root weight is unavailable; failure of a chosen positive floor need not mean that this exact degeneracy has occurred. Neither a simple root nor a positive floor proves dynamical stability. A singular event, unresolved root inventory, or history boundary requires a separately justified continuation or an end to the claim; clipping a denominator, discarding a root, or introducing an unspecified smoothing rule changes the problem.

## Symmetry and Outward Acceleration

**Conditional derivation.** Suppose the complete relevant histories satisfy $X_1(T)=a(T)$ and $X_2(T)=-a(T)$, with $a(T)>0$ on those histories. The function $a$ is the half-separation and a dot denotes differentiation with respect to absolute time. Reflection and exchange of the equal-polarity labels pair every partner root with one having the same emission time, distance, and weight. Both distances are $a(T)+a(T_t)$, and both transmitter derivatives are $1+\dot a(T_t)$. Their line-of-action signs are opposite, so the partner accelerations obey $A_2=-A_1$. This pairing also requires identical history coverage and root-selection rules. Symmetric preparation remains symmetric only for as long as the delayed problem has a unique continuation under those rules.

On the regular domain without self-hits, the common partner-root set $\mathcal C(T)$ and the half-separation equation are

$$
\begin{aligned}
\mathcal C(T)&=\{T_t<T:a(T)+a(T_t)=T-T_t\},\\
\ddot a(T)&=\kappa\epsilon^2\sum_{T_t\in\mathcal C(T)}
\frac{1}{|1+\dot a(T_t)|[a(T)+a(T_t)]^2}.
\end{aligned}
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-e4b7c56ef1b8a7f7)

The set is restricted to the complete supplied history domain. Every retained term is positive, so a nonempty partner set gives $\ddot a(T)>0$; an empty set gives zero. Starting with $\dot a(0)=0$, the separation $2a(T)$ therefore increases over a continued interval with nonempty partner sets and these same assumptions. Equal-time symmetry alone does not establish the required signs at past emission points. The acceleration contributions add linearly at a fixed history, but the coupled DDE is nonlinear because the histories determine the roots, distances, and weights.

For the stationary preparation, both partner roots at release are $T_t=-r_0$ and both weights equal one. The derived one-sided release accelerations are $A_1(0^+)=\kappa\epsilon^2/r_0^2$ and $A_2(0^+)=-\kappa\epsilon^2/r_0^2$. Their nonzero values rule out a free stationary equilibrium at this separation. They verify the initial outward response, not an all-time continuation or a perturbation-stability result.

## Solvability Status

This chapter supplies no closed-form solution of the fully coupled delayed evolution. The implicit equations and conditional symmetry reduction do not establish existence, uniqueness, global collision avoidance, or physical realization of the prescribed preparation. [Numerical Recipe and Stability](numerical-recipe-and-stability.md) distinguishes evaluating supplied paths from evolving the same paths under the EOM solver, and requires an actual solution before assessing perturbations of its retained history.

No conserved energy or work balance is derived here. Such a claim requires a compatible history-dependent construction and boundary terms as described in [Delay Dynamics Energy](delay-dynamics-energy.md). A fixed-transmitter inverse-distance potential cannot be imported as the energy of this moving pair. These limitations leave the initial repulsive response derived and the continued physical candidate conditional.
