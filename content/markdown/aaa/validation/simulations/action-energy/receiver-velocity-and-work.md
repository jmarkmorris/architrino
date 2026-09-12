# Receiver velocity and work

An [architrino](../../../foundations/architrino.md) is a primitive polarity-bearing point with no physical mass. Its causal wake is the expanding geometric record emitted along its path. A hit is a past emission whose wake reaches a receiver now; on a regular branch, it contributes continuously to acceleration as the selected emission time changes. The [Master Equation](../../../dynamics/master-equation.md#the-master-equation-canonical-form) directs each contribution along the delayed line from the emission point to the receiver. Receiver velocity determines the signed acceleration power, but does not supply an extra multiplier in the instantaneous acceleration law.

Let $o$ denote the transmitter at emission time $T_t$ and $o'$ the receiver at reception time $T_r$, both measured in absolute time. Their positions are $\mathbf X_o(T_t)$ and $\mathbf X_{o'}(T_r)$, and their velocities are the corresponding absolute-time derivatives. Define the delayed chord $\mathbf r=\mathbf X_{o'}(T_r)-\mathbf X_o(T_t)$, its length $r=\|\mathbf r\|$, and its unit direction $\hat{\mathbf r}=\mathbf r/r$. An admitted causal root satisfies $r=c_f(T_r-T_t)>0$ with $T_t$ inside the declared retained transmitter history; $c_f>0$ is the wake speed. The formulas below apply on smooth interior root branches with positive separation and a nonzero transmitter-side factor $D_t=c_f-\mathbf V_o(T_t)\cdot\hat{\mathbf r}$. This is the simple-root condition: the causal equation crosses zero with nonzero emission-time derivative. Over a finite integration interval, retain positive separation and Jacobian floors, finite root count, and margins from history endpoints.

The dimensionless transmitter-side acceleration weight is $W_{o'\leftarrow o}^{\mathrm{acc}}=c_f/|D_t|$. The positive coupling is $\kappa$, the fixed polarities are $q_o,q_{o'}$, and $\sigma_{q_oq_{o'}}=\operatorname{sign}(q_oq_{o'})$ is $+1$ for repulsion and $-1$ for attraction. A self-hit has $o=o'$ at distinct times and sign $+1$; include it when its noncoincident causal root is admitted. The convention $H(0)=0$, where $H$ is the causal step function, excludes zero delay. It supplies no continuation through coincidence, a singular root with $D_t=0$, or a history-boundary crossing.

## Decomposition and Energetics

Write the receiver velocity as $\mathbf V=V_r\hat{\mathbf r}+\mathbf V_\perp$, where $V_r=\mathbf V\cdot\hat{\mathbf r}$ and $\mathbf V_\perp\cdot\hat{\mathbf r}=0$. At one event, project a single acceleration contribution onto this fixed direction. The notation $|_{\text{this hit}}$ below means that projected contribution to the velocity derivative, with $\hat{\mathbf r}$ held fixed; it is not the total derivative of components measured along a turning line:

$$
\left.\frac{d}{dT_r}\mathbf V_\perp\right|_{\text{this hit}}=\mathbf{0},
\qquad
\left.\frac{d}{dT_r}V_r\right|_{\text{this hit}}
=
\mathbf A_{o'\leftarrow o}(T_r;T_t)\cdot\hat{\mathbf{r}}
=
\frac{\kappa\,\sigma_{q_o q_{o'}}\,\lvert q_o q_{o'}\rvert}{r^2}
W_{o'\leftarrow o}^{\mathrm{acc}}(T_r;T_t)
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-79f5d2581fbf221a)

The direction itself can change along the causal branch. With a dot denoting the total derivative with respect to $T_r$ and $\mathbf A_{\mathrm{tot}}=d\mathbf V/dT_r$ the receiver's actual acceleration, the product rule gives

$$
\dot V_r=\mathbf A_{\mathrm{tot}}\cdot\hat{\mathbf r}+\mathbf V\cdot\dot{\hat{\mathbf r}},
\qquad
\dot{\mathbf V}_\perp
=\mathbf A_{\mathrm{tot}}-(\mathbf A_{\mathrm{tot}}\cdot\hat{\mathbf r})\hat{\mathbf r}
-(\mathbf V\cdot\dot{\hat{\mathbf r}})\hat{\mathbf r}-V_r\dot{\hat{\mathbf r}}
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-7a25c80f14107f73)

The last terms describe changing projections, not new acceleration contributions. Consequently the perpendicular component need not remain constant over a finite interval, even when one radial contribution supplies the entire acceleration.

### Signed power and work

For one hit, write $\mathbf A=\mathbf A_{o'\leftarrow o}(T_r;T_t)$. Its signed instantaneous specific-power contribution is $\mathbf A\cdot\mathbf V=(\mathbf A\cdot\hat{\mathbf r})V_r=\sigma_{q_oq_{o'}}\|\mathbf A\|V_r$. Repulsion and attraction have opposite signs at the same $V_r$. Orthogonal motion gives zero power from that hit at that instant; subsequent turning of the line can produce nonzero work. Repulsive self-hits also have signed power: repulsion along the delayed chord does not imply kinetic gain when $V_r<0$.

Define the specific kinetic proxy $K_{\mathrm{spec}}=\tfrac12\|\mathbf V\|^2$, which has speed-squared units. Its derivative is $dK_{\mathrm{spec}}/dT_r=\mathbf A_{\mathrm{tot}}\cdot\mathbf V$. Each hit supplies one summand only. On a trajectory satisfying the Master Equation, $\mathbf A_{\mathrm{tot}}$ is the complete sum over all admitted transmitter/root contributions, including self-hits. On a prescribed test path, the modeled sum need not equal $d\mathbf V/dT_r$; the difference must be retained as an acceleration residual before identifying modeled power with the actual proxy change.

An optional positive constant $\mu_{\text{arch}}$ converts this quadratic proxy to bookkeeping energy: $K_\mu=\tfrac12\mu_{\text{arch}}\|\mathbf V\|^2$ and $dK_\mu/dT_r=\mu_{\text{arch}}\mathbf A_{\mathrm{tot}}\cdot\mathbf V$. This is a choice of kinetic chart, not physical architrino mass or a derivation of physical energy. For another differentiable kinetic scalar $K(s)$ at speed $s=\|\mathbf V\|>0$, the chain-rule coefficient is instead $\mu_K(s)=K'(s)/s$; behavior at rest needs a defined regular extension. [Energy](../../../dynamics/energy.md#kinetic-energy-and-momentum-of-a-single-architrino) states the separate compatibility and physical-interpretation obligations.

For a transmitter stationary throughout the sampled emission history, $D_t=c_f$, $W^{\mathrm{acc}}=1$, and $\dot r=V_r$. On an interval $[T_a,T_b]$ with one admitted partner root and positive separation, the delivered work in the quadratic chart is

$$
\int_{T_a}^{T_b}\mu_{\text{arch}}\mathbf A\cdot\mathbf V\,dT_r
=\mu_{\text{arch}}\kappa\sigma_{q_oq_{o'}}|q_oq_{o'}|
\left(\frac1{r_a}-\frac1{r_b}\right)
=-\Delta U,
\qquad
U(r)=\frac{\mu_{\text{arch}}\kappa\sigma_{q_oq_{o'}}|q_oq_{o'}|}{r}+C
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-e50758fe29868a74)

Here $r_a=r(T_a)$, $r_b=r(T_b)$, $\Delta U=U(r_b)-U(r_a)$, and $C$ is a fixed additive reference. The sign follows from $\dot r/r^2=-d(1/r)/dT_r$: inward motion under attraction gives positive work. This integral gives the receiver's total kinetic-proxy change if the benchmark contribution supplies the entire actual acceleration. In the general case, include the work of the remaining contributions and any acceleration residual; equality with this single contribution requires their combined integrated power to vanish. Prescribing a fixed transmitter does not establish an isolated two-body solution or eliminate self-hits from an arbitrary receiver history.

Moving-transmitter, self-hit, and open-boundary histories require the independently constructed history and boundary terms described in [Delay Dynamics Energy](delay-dynamics-energy.md). Defining an interaction entry as minus the integrated total work makes its sum with the chosen kinetic proxy constant along a solved trajectory by construction. That identity is not independent evidence of energy conservation. The scalar comparison in [Causal Action Functional](../../../dynamics/causal-action-functional.md) likewise supplies no proved variational energy for the Master Equation.

### How later hit strength changes

The delayed chord follows the selected emission root as reception time advances. Define $v_t=\mathbf V_o(T_t)\cdot\hat{\mathbf r}$ and the receiver-side factor $D_r=c_f-V_r$. Differentiating $r=c_f(T_r-T_t)$ on a simple root gives the signed root-playback derivative $m=dT_t/dT_r=D_r/D_t$ and

$$
\dot r=V_r-mv_t=\frac{c_f(V_r-v_t)}{D_t},
\qquad
\frac{d}{dT_r}\log\|\mathbf A\|
=-2\frac{\dot r}{r}-\frac{\dot D_t}{D_t}
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-ae727b229e000f82)

The second identity differentiates $\|\mathbf A\|=\kappa|q_oq_{o'}|c_f/(r^2|D_t|)$ on a smooth branch with fixed polarities and $D_t\ne0$. It applies between singular or history-boundary events. Playback $m$ moves the selected root; it does not replace $W^{\mathrm{acc}}$ or multiply the instantaneous acceleration or power again. Both delayed-distance change and transmitter-weight change determine the later strength.

For a stationary transmitter, the weight is constant and $\dot r=V_r$, so inward motion strengthens this contribution and outward motion weakens it. The conclusion fails for general moving histories. In normalized wake-speed units with $c_f=1$, take the prescribed line paths $\mathbf X_o(s)=(-1-s/2,0,0)$ and $\mathbf X_{o'}(T)=(2-T/4,0,0)$ near $T=0$, where $s$ and $T$ denote emission and reception times. Their simple root is $T_t=5T/6-2$, with $r=2+T/6$, $D_t=3/2$, and constant weight $2/3$. The receiver has $V_r=-1/4$, yet the distance increases at rate $1/6$ and the hit weakens. This is a check of prescribed causal geometry, not a realized EOM solution.

The projection, power, and branch-derivative identities are derived on the stated regular domains. A counterexample satisfying those domains but violating the product rule or differentiated causal constraint would refute the respective identity. Complete evolved trajectories, singular continuation, stable assemblies, and physical energy recovery require their separate derivations; none follows from these work identities.
