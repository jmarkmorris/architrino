# Radial Attraction

At the same position and against the same fixed transmitter history, two [architrino](../../../foundations/architrino.md) receivers—primitive entities carrying polarity and having no intrinsic mass—with different velocities receive the same acceleration contribution from that transmitter. The [Master Equation](../../../dynamics/master-equation.md#path-history-sum-and-integral-representation) selects past emissions whose expanding causal wakes reach the receiver at the current absolute time. Receiver motion changes which emissions arrive next, but does not multiply the strength of the contribution already arriving.

## Setup

A test receiver with polarity $q'$ moves along a fixed line through a transmitter with polarity $q$. Polarity is the primitive interaction sign: unlike polarities give $\sigma_{qq'}=\operatorname{sign}(qq')=-1$. The coupling $\kappa$ is positive. Use normalized wake speed $c_f=1$, absolute time $T$, a signed coordinate $X(T)$ along the line in the Euclidean void, and a fixed transmitter coordinate $X_c$. The distance is $r(T)=|X(T)-X_c|>0$, and $V_r(T)=dr/dT$ is positive outward and negative inward. Initial data are $r(T_0)=r_0>0$ and $V_r(T_0)=V_{r0}\le0$ for the inward comparison.

The transmitter's stationary path is prescribed over every emission time needed by the comparison. Holding it fixed is a boundary condition, not a freely evolving equilibrium of an isolated attracting pair; the mutually evolving problem is treated in [Attraction](attraction.md). The trajectory equations below retain only the fixed transmitter's contribution. They equal the receiver's total Master-Equation acceleration only while there are no additional admitted contributions, including [self-hits](../../../dynamics/master-equation.md#self-hit-regime), where the receiver encounters its own past emissions. Absence of self-hits must be checked over the relevant history; current speed alone does not establish it.

## Objectives

Derive the fixed-transmitter radial equation, its trajectory integral, and a conserved scalar of this reduced equation for analytic comparison. The scalar is mathematical bookkeeping; identifying a physical energy account requires a separate derivation.

## Delay Equation and Exact Reduction
Denote the absolute time of the selected reception event by $T_r$. Its causal root is an emission time $T_t<T_r$ satisfying $g(T_r;T_t)=r(T_r)-(T_r-T_t)=0$. Thus $T_t=T_r-r(T_r)$ is the unique full-history root for $r>0$. For a retained transmitter history $I_c$, it contributes only when $T_r-r(T_r)\in I_c$. A missing older emission is a history-coverage failure, not evidence that the full-history acceleration vanishes. Differentiation with reception fixed gives $D_t=\partial_{T_t}g=1$ and the transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/|D_t|=1$. The trajectory parameter $T$ below ranges over such reception events.

Under the stated contribution restriction, the per-hit law gives
  $$
  \frac{d^2X}{dT^2} \;=\; \kappa\,\sigma_{q q'}\,\frac{|q q'|}{r(T)^2}W^{\mathrm{acc}}(T)\,\mathrm{sgn}\!\big(X(T)-X_c\big)
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-bb516dea67c24324)

  Here $\mathrm{sgn}(X-X_c)$ points from the fixed center toward the receiver. With $\sigma_{qq'}=-1$, the acceleration points inward on either side. Writing $K=\kappa\,|q q'|>0$, the radial ordinary differential equation (ODE) is
  $$
  \frac{d^2r}{dT^2} \;=\; -\,\frac{K}{r(T)^2}W^{\mathrm{acc}}(T),
  \qquad
  W^{\mathrm{acc}}(T)=1
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-3ca850ee2b457e94)

  This reduction holds on either fixed-sign interval $X-X_c\ne0$: differentiating $r=|X-X_c|$ twice gives $\ddot r=\mathrm{sgn}(X-X_c)\ddot X$. A dot denotes differentiation with respect to $T$. There is no transverse initial velocity in this radial problem. Central acceleration alone would not justify the same scalar equation for a receiver with transverse motion, because its radial direction would change.

## Solvability Status

Multiplying the reduced equation by $V_r$ gives $d(V_r^2/2)/dT=-K V_r/r^2$. Since $d(-K/r)/dT=K V_r/r^2$, the scalar

$$
\mathcal E_{\mathrm{rad}}=\frac{V_r^2}{2}-\frac{K}{r}
=\frac{V_{r0}^2}{2}-\frac{K}{r_0}
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-7b0cc8102b11d9b4)

is constant along this ODE. The symbol $\mathcal E_{\mathrm{rad}}$ denotes a reduced first integral, meaning a function of the current radial state that stays constant along its solutions. It has squared-speed units and assigns no intrinsic mass to an architrino. The term $-K/r$ follows by integration of this acceleration equation; no standard-physics potential is assumed. This calculation does not establish a conserved Master-Equation energy account, a wake-energy balance, or conservation for the transmitter and receiver together.

On the inward branch, the velocity and elapsed time follow directly:

$$
V_r(r)=-\sqrt{V_{r0}^2+2K\left(\frac1r-\frac1{r_0}\right)},
\qquad
T-T_0=\int_{r}^{r_0}
\frac{d\rho}{\sqrt{V_{r0}^2+2K\left(\frac1\rho-\frac1{r_0}\right)}}.
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-6241fca47885588c)

Here $\rho$ is the distance variable inside the integral and $0<r\le r_0$. For release from rest, $V_{r0}=0$, the upper-end singularity is integrable. Substitution $\rho=r_0\cos^2\theta$, with dimensionless angle $\theta$, gives

$$
T-T_0=\sqrt{\frac{r_0^3}{2K}}\left[
\arccos\sqrt{\frac r{r_0}}+
\sqrt{\frac r{r_0}\left(1-\frac r{r_0}\right)}
\right].
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-1471e36e1026f626)

These are derived comparison solutions on the stated domain. For $K=1$, $r_0=2$, $V_{r0}=0$, and $c_f=1$, reaching $r=1$ takes $T-T_0=\pi/2+1$ and gives $V_r=-1$. This is an analytic ODE value, not an evolved full-history result.

The reduced equation has no finite-radius static equilibrium: $-K/r^2$ never vanishes for $K>0$ and finite $r>0$. Its rest-release solution reaches the singular limit $r\downarrow0$ in finite elapsed time $\pi\sqrt{r_0^3/(8K)}$, with unbounded inward speed. The equation supplies neither collision avoidance nor continuation through the center. At $r=0$, the fixed-source root would have $T_t=T$ and is excluded by the strict-past convention $H(0)=0$, where $H$ is the causal step function; removing that endpoint does not regularize the divergent approach. Additional or self-hit contributions can invalidate the reduced trajectory before this limit. Stability and physical realization of a complete assembly require a separately balanced trajectory with its full causal history; no stability verdict follows from this radial attraction comparison.

## Receiver-Velocity Dependence

Differentiating the explicit root gives $dT_t/dT=1-V_r=D_r/D_t$, where $D_r=1-V_r$ is the receiver-side factor. This signed playback rate describes how quickly the selected emission time changes. Inward motion has $D_r>1$; at outward speed $V_r=1$ the playback rate is zero, and for $V_r>1$ it is negative. None of these receiver-side changes makes $D_t=1$ singular or alters the fixed transmitter's arriving acceleration. Radial velocity enters the kinetic-scalar rate $d(V_r^2/2)/dT=-K V_r/r^2$; interpreting that rate as physical power requires an independently justified energy normalization.

## Validation Use

An acceleration evaluator can compare the single fixed-transmitter contribution at $T=0$, $X_c=0$, $X=2$, $K=1$, and $c_f=1$. With the stationary source history covering $T_t=-2$, the expected coordinate acceleration is $-1/4$ for any tested receiver velocity; for $V_r=-1,0,1,2$, the respective playback rates are $2,1,0,-1$. This event-level test holds the reception position and source history fixed. It does not claim that those receiver histories are self-hit-free. Reflecting the receiver to $X=-2$ reverses the coordinate acceleration to $+1/4$ and leaves the radial acceleration $-1/4$ unchanged.

> Claim grade: derived for the root, polarity sign, radial reduction, playback relation, and first integral under the declared fixed-source and contribution restrictions. Falsifiers: a second stationary-source root, a receiver-speed multiplier in the fixed-source acceleration, or a nonzero derivative of $\mathcal E_{\mathrm{rad}}$ along the stated ODE would contradict the corresponding derivation. A missing retained emission, an additional admitted hit, transverse motion, or arrival at $r=0$ leaves the declared domain and requires a different comparison. These baselines alone establish neither solver certification nor empirical acceptance.
