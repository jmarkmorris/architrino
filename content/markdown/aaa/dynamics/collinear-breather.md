# 1D Collinear Binary (Reduced Model)

This note isolates the simplest reduced dynamical problem that can test the self-hit stabilization mechanism without tangential geometry. Its purpose is to provide a mathematically tractable bridge between the full delayed master equation and the first rigorous existence question for bounded two-body motion.

The guiding idea is narrow: if self-hit can stabilize anything at all, it should first be visible in a reflection-symmetric one-dimensional opposite-charge binary. If it cannot be made to work there, then later claims about maximum-curvature binaries, tri-binary locking, and assembly-level closure lose their cleanest analytic foothold.

## Purpose

The full dynamics stack currently mixes several hard problems at once:

- state-dependent delays,
- Jacobian amplification,
- self-hit branch birth,
- tangential drift in 2D and 3D,
- and multi-scale coupling in tri-binaries.

This note strips away everything except the minimum ingredients needed to test a bounded delayed orbit:

- two architrinos,
- one spatial dimension,
- opposite charges,
- exact partner hits,
- exact self-hit roots,
- and an $\eta>0$ regularization suitable for return-map analysis.

The point is not to claim the reduced model is already the physical atom of the theory. The point is to identify the first model in which a breather-like bounded state could be proved or ruled out.

## Exact 1D State Variables

Work on the reflection-symmetric center-of-mass subspace
$$
x_1(t)=-x(t),
\qquad
x_2(t)=x(t),
\qquad
q_1=-\epsilon,
\qquad
q_2=+\epsilon.
$$

Here:

- $x(t)\in\mathbb{R}$ is the signed position of the right-hand architrino,
- $\dot x(t)$ is its signed velocity,
- the center of mass is fixed at the origin,
- and the full two-body state is recovered by reflection.

The exact delayed state lives on a history space
$$
\mathcal{H}_h = C^1([-h,0];\mathbb{R}),
$$
with history segment
$$
x_t(\theta)\equiv x(t+\theta),
\qquad
\theta\in[-h,0],
$$
for a memory horizon $h>0$ large enough to contain all active causal roots under study.

Useful derived quantities:
$$
d(t)\equiv 2|x(t)|,
\qquad
u(t)\equiv \dot x(t).
$$

When $x(t)>0$ and $u(t)<0$, the pair is inbound. When $x(t)>0$ and $u(t)>0$, it is outbound. Crossing $x=0$ corresponds to label-preserving passage through the center on this reduced symmetry subspace.

## Partner-Only Hinge Radius

Before self-hit is active, the natural zeroth-order picture is partner-dominated infall from large separation. In that reduced picture it is useful to define the first dynamically meaningful radius as the location where the inbound speed reaches the field speed.

### Definition

Let $x_{c_f}>0$ denote the **hinge radius** for the partner-only inbound benchmark:
$$
|u| = c_f
\qquad
\text{at}
\qquad
x = x_{c_f}.
$$

This is not yet a theorem of the full delayed system. It is a reduced-model normalization tied to the inbound partner-attraction phase before the self-hit-capable regime is entered.

### Dimensionless normalization

Define
$$
\chi \equiv \frac{x}{x_{c_f}},
\qquad
\upsilon \equiv \frac{u}{c_f}.
$$

Then the hinge is located at
$$
\chi = 1,
\qquad
|\upsilon|=1.
$$

This makes the reduced narrative explicit:

- $\chi \gg 1$: far-field partner-dominated infall,
- $\chi \searrow 1$: approach to the field-speed hinge,
- $\chi < 1$: self-hit-capable regime becomes dynamically relevant.

### Coulomb-like zeroth-order estimate

If one uses the quadratic kinetic bookkeeping proxy with universal constant $\mu_{\text{arch}}$ and ignores delay at leading order, the partner-only effective potential is
$$
U_{\text{pair}}(x)
\approx
-\frac{\kappa\epsilon^2}{2x},
$$
since the pair separation is $d=2x$.

Starting from rest at infinity, a zeroth-order energy balance gives
$$
\frac{1}{2}\mu_{\text{arch}} u^2
\approx
\frac{\kappa\epsilon^2}{2x}.
$$

Imposing the hinge condition $|u|=c_f$ yields
$$
\mu_{\text{arch}} c_f^2
\approx
\frac{\kappa\epsilon^2}{x_{c_f}},
\qquad
x_{c_f}
\approx
\frac{\kappa\epsilon^2}{\mu_{\text{arch}} c_f^2}.
$$

Thus one may, if desired, choose reduced units so that
$$
x_{c_f}=1.
$$

This is the cleanest way to formalize the intuition that the partner-only inbound fall from infinity reaches field speed at a distinguished radius.

## Partner-Hit and Self-Hit Root Equations

For the right-hand architrino $x_2(t)=x(t)$, the exact causal root conditions split naturally into partner and self branches.

### Partner-hit roots

A partner-hit emission time $t_0<t$ satisfies
$$
|x(t)+x(t_0)| = c_f(t-t_0).
$$

Define the partner-root set
$$
\mathcal{C}_p(t)
\equiv
\left\{
t_0<t \;\middle|\; |x(t)+x(t_0)| = c_f(t-t_0)
\right\}.
$$

On this symmetry subspace the 1D line-of-action sign is
$$
\hat r_p(t;t_0)=\mathrm{sgn}\!\big(x(t)+x(t_0)\big),
$$
and the partner Jacobian becomes
$$
J_p(t;t_0)
=
1-\frac{\dot x_1(t_0)\hat r_p(t;t_0)}{c_f}
=
1+\frac{\dot x(t_0)\hat r_p(t;t_0)}{c_f}.
$$

Because $q_1q_2<0$, this branch is attractive.

### Self-hit roots

A nontrivial self-hit emission time $t_0<t$ satisfies
$$
|x(t)-x(t_0)| = c_f(t-t_0),
\qquad
t_0\neq t.
$$

Define the self-root set
$$
\mathcal{C}_s(t)
\equiv
\left\{
t_0<t \;\middle|\; |x(t)-x(t_0)| = c_f(t-t_0)
\right\}.
$$

The self line-of-action sign is
$$
\hat r_s(t;t_0)=\mathrm{sgn}\!\big(x(t)-x(t_0)\big),
$$
and the self Jacobian is
$$
J_s(t;t_0)
=
1-\frac{\dot x(t_0)\hat r_s(t;t_0)}{c_f}.
$$

Because $q_2q_2>0$, each self branch is repulsive.

### Reduced branch-resolved equation

On the exact root-selected model, the right-particle acceleration is
$$
\ddot x(t)
=
-\,\kappa \epsilon^2
\sum_{t_0\in\mathcal{C}_p(t)}
\frac{\hat r_p(t;t_0)}
{|x(t)+x(t_0)|^2\,|J_p(t;t_0)|}
+
\kappa \epsilon^2
\sum_{t_0\in\mathcal{C}_s(t)}
\frac{\hat r_s(t;t_0)}
{|x(t)-x(t_0)|^2\,|J_s(t;t_0)|}.
$$

The first sum is partner attraction. The second is self-hit repulsion. Reflection symmetry gives the left-particle equation automatically.

Plain language: in 1D there is no tangential direction to hide in. The entire competition is between delayed inward attraction and delayed outward self-repulsion, with the Jacobian deciding how sharply each branch is weighted.

## Regularized 1D Equation

For analysis and numerics, replace the shell delta by a smooth mollifier $\delta_\eta$ with width $\eta>0$. Then the reduced equation can be written in integral form:
$$
\ddot x(t)
=
-\,\kappa \epsilon^2
\int_{-\infty}^{t} dt_0\;
\frac{\hat r_p(t;t_0)}
{|x(t)+x(t_0)|^2}
\delta_\eta\!\big(|x(t)+x(t_0)|-c_f(t-t_0)\big)
$$
$$
\qquad
+
\kappa \epsilon^2
\int_{-\infty}^{t} dt_0\;
\frac{\hat r_s(t;t_0)}
{|x(t)-x(t_0)|^2}
\delta_\eta\!\big(|x(t)-x(t_0)|-c_f(t-t_0)\big),
$$
with the understanding that the exact Jacobian factors reappear in the branch-sum representation when the mollified shell collapses onto isolated roots.

The regularized formulation is the one best suited to:

- local well-posedness,
- continuation criteria,
- numerical return-map construction,
- and eventually the controlled limit $\eta\to 0^+$.

## Inbound/Outbound Sign Structure

The first genuine dynamical question is not whether self-hit exists, but whether its sign structure permits recapture. In 1D this can be stated exactly.

### Exterior-branch convention

Fix an interval on which
$$
x(t)>0.
$$

Then:

- **inbound** means $\dot x(t)<0$,
- **outbound** means $\dot x(t)>0$.

This is the natural branch on which to analyze collapse, rebound, and return to a section at $x=x_\ast>0$.

### Partner term

On the exterior branch, the partner source sits on the opposite side of the origin, so the line of action points inward. Thus the partner contribution always accelerates the right-hand particle toward the origin.

Write
$$
A_p(t)
\equiv
\kappa \epsilon^2
\sum_{t_0\in\mathcal{C}_p(t)}
\frac{1}{|x(t)+x(t_0)|^2\,|J_p(t;t_0)|}
>0.
$$

Then the partner contribution is
$$
a_p(t)=-A_p(t).
$$

Therefore:

- on the inbound leg, $a_p$ has the **same sign as the velocity** and speeds the collapse up,
- on the outbound leg, $a_p$ has the **opposite sign to the velocity** and brakes the escape.

### Self-hit split into outer-memory and inner-memory roots

The self term does not have a fixed sign. Split the active self roots into
$$
\mathcal{C}_s^{\text{out}}(t)
\equiv
\left\{
t_0\in\mathcal{C}_s(t)\;\middle|\; x(t_0)>x(t)
\right\},
$$
$$
\mathcal{C}_s^{\text{in}}(t)
\equiv
\left\{
t_0\in\mathcal{C}_s(t)\;\middle|\; x(t_0)<x(t)
\right\}.
$$

For $t_0\in\mathcal{C}_s^{\text{out}}(t)$ one has
$$
\hat r_s(t;t_0)=\mathrm{sgn}(x(t)-x(t_0))=-1,
$$
so that branch contributes **negative** acceleration.

For $t_0\in\mathcal{C}_s^{\text{in}}(t)$ one has
$$
\hat r_s(t;t_0)=\mathrm{sgn}(x(t)-x(t_0))=+1,
$$
so that branch contributes **positive** acceleration.

Define the corresponding positive amplitudes
$$
A_s^{\text{out}}(t)
\equiv
\kappa \epsilon^2
\sum_{t_0\in\mathcal{C}_s^{\text{out}}(t)}
\frac{1}{|x(t)-x(t_0)|^2\,|J_s(t;t_0)|},
$$
$$
A_s^{\text{in}}(t)
\equiv
\kappa \epsilon^2
\sum_{t_0\in\mathcal{C}_s^{\text{in}}(t)}
\frac{1}{|x(t)-x(t_0)|^2\,|J_s(t;t_0)|}.
$$

Then the total acceleration on the exterior branch is
$$
\ddot x(t)= -A_p(t)-A_s^{\text{out}}(t)+A_s^{\text{in}}(t).
$$

This is the key reduced formula.

### Physical interpretation

- **Inbound** ($\dot x<0$):
  - the partner term always strengthens infall,
  - outer-memory self roots also strengthen infall,
  - inner-memory self roots oppose infall.

- **Outbound** ($\dot x>0$):
  - the partner term always brakes the outward motion,
  - outer-memory self roots also brake the outward motion,
  - inner-memory self roots drive further escape.

So self-hit is not a permanent outward engine. Its effect depends on where the active remembered emission points sit relative to the current position.

## Necessary Recapture Condition

The breather question can now be reduced to one concrete inequality.

Fix an outbound time $t_\sharp$ on the exterior branch with
$$
x(t_\sharp)>0,
\qquad
\dot x(t_\sharp)=u_\sharp>0.
$$

If the trajectory is ever to turn around and re-enter as an inbound branch, there must exist a later time $t_{\mathrm{turn}}>t_\sharp$ such that
$$
\dot x(t_{\mathrm{turn}})=0.
$$

Integrating the reduced acceleration identity gives
$$
0
=
u_\sharp + \int_{t_\sharp}^{t_{\mathrm{turn}}}
\Big(
-A_p(s)-A_s^{\text{out}}(s)+A_s^{\text{in}}(s)
\Big)\,ds.
$$

Equivalently,
$$
u_\sharp
=
\int_{t_\sharp}^{t_{\mathrm{turn}}}
\Big(
A_p(s)+A_s^{\text{out}}(s)-A_s^{\text{in}}(s)
\Big)\,ds.
$$

Therefore a **necessary condition for recapture** is
$$
\sup_{t>t_\sharp}
\int_{t_\sharp}^{t}
\Big(
A_p(s)+A_s^{\text{out}}(s)-A_s^{\text{in}}(s)
\Big)\,ds
\ge
u_\sharp.
$$

If this inequality fails, then the total accumulated braking from partner attraction plus outer-memory self-hit is never strong enough to overcome the outbound speed and the trajectory cannot turn around.

### Stronger sufficient criterion

If there exists an interval $[t_1,t_2]$ with $t_1\ge t_\sharp$ on which
$$
A_p(t)+A_s^{\text{out}}(t)-A_s^{\text{in}}(t)\ge \delta >0
$$
for all $t\in[t_1,t_2]$, and
$$
\int_{t_1}^{t_2}\delta\,dt \ge \dot x(t_1),
$$
then a turning point must occur no later than $t_2$.

This criterion is not expected to be the final theorem, but it gives the correct sign target for both numerics and analysis.

## Regularized Return Map

To state a breather problem precisely, define a Poincare-type section on the symmetric history space rather than on instantaneous phase space alone.

Fix:

- a section location $x_\ast>0$,
- a memory horizon $h$ large enough to contain all active branches on one cycle,
- and a regularization width $\eta>0$.

### Admissible history class

The first theorem target should not be the full section $\Sigma^\pm_{x_\ast,\eta}$, but a controlled subset on which the regularized delayed dynamics and return times are well behaved.

Let
$$
\mathcal{K}_{x_\ast,\eta}
\subset
\mathcal{H}_h
$$
denote an admissible reflection-symmetric history class with the following properties on $\theta\in[-h,0]$:

- section anchoring at $\theta=0$,
- uniform position bounds
  $$
  x_{\min}\le \phi(\theta)\le x_{\max},
  $$
- uniform speed bounds
  $$
  |\dot\phi(\theta)|\le u_{\max},
  $$
- and a transversality bound on every active partner and self root,
  $$
  |J_p|\ge \nu,
  \qquad
  |J_s|\ge \nu,
  \qquad
  \nu>0.
  $$

The role of $\mathcal{K}_{x_\ast,\eta}$ is simple: it isolates a tame region of history space on which the regularized vector field, root selection, and section crossings can plausibly be controlled. Whether the eventual theorem program allows histories that approach $x=0$ arbitrarily closely is a separate question and should not be conflated with the first well-posedness regime.

Define the outbound and inbound sections within this admissible class:
$$
\Sigma^+_{x_\ast,\eta}
\equiv
\left\{
 \phi\in\mathcal{K}_{x_\ast,\eta}
\;\middle|\;
\phi(0)=x_\ast,
\qquad
\dot\phi(0)>0
\right\},
$$
$$
\Sigma^-_{x_\ast,\eta}
\equiv
\left\{
 \phi\in\mathcal{K}_{x_\ast,\eta}
\;\middle|\;
\phi(0)=x_\ast,
\qquad
\dot\phi(0)<0
\right\}.
$$

For $\phi\in\Sigma^+_{x_\ast,\eta}$, evolve the $\eta$-regularized dynamics forward until the first later time $T^-_\eta(\phi)>0$ such that:

- the trajectory has completed one outbound excursion and recapture,
- $x(T^-_\eta(\phi))=x_\ast$,
- and $\dot x(T^-_\eta(\phi))<0$.

Then define the exact outbound-to-inbound history map
$$
Q_\eta:\Sigma^+_{x_\ast,\eta}\to\Sigma^-_{x_\ast,\eta},
\qquad
Q_\eta(\phi)=x_{T^-_\eta(\phi)}.
$$

For $\phi\in\Sigma^-_{x_\ast,\eta}$, evolve the $\eta$-regularized dynamics forward until the first return time $T(\phi)>0$ such that:

- the trajectory has completed one collapse-and-rebound cycle,
- $x(T(\phi))=x_\ast$,
- and $\dot x(T(\phi))<0$ again.

Then define the exact history-space return map
$$
P_\eta:\Sigma^-_{x_\ast,\eta}\to\Sigma^-_{x_\ast,\eta},
\qquad
P_\eta(\phi)=x_{T(\phi)}.
$$

This is the natural reduced object for theorem work. The core fixed-point question belongs to $P_\eta$ on a controlled subset of history space, not to any scalar speed map by itself.

### Projected scalar speed map

The scalar map is useful only after choosing a specific way to inject scalar speed data into the outbound history section.

Assume there is a continuous injection
$$
\iota_\eta(\,\cdot\,;x_\ast):I\to\Sigma^+_{x_\ast,\eta},
\qquad
u\mapsto \phi^+_{\eta}(u;x_\ast),
$$
from an interval $I\subset(0,\infty)$ of outbound speeds into admissible outbound histories, such that
$$
\dot\phi^+_{\eta}(u;x_\ast)(0)=u.
$$

This injection is extra structure. It is not part of the master equation itself; it is a chosen slice through history space.

Write the corresponding trajectory as $x(t;u,x_\ast,\eta)$ with initial section data
$$
x(0;u,x_\ast,\eta)=x_\ast,
\qquad
\dot x(0;u,x_\ast,\eta)=u.
$$

If the trajectory is recaptured and returns to the inbound section, define the projected scalar map
$$
R_\eta(u;x_\ast)
\equiv
-\dot x\!\big(T^-_\eta(u;x_\ast);u,x_\ast,\eta\big)
>0.
$$

Thus $R_\eta(u;x_\ast)$ is the magnitude of the next inbound speed when the trajectory re-crosses the same section $x=x_\ast$.

Equivalently, if
$$
\Pi:\Sigma^-_{x_\ast,\eta}\to(0,\infty),
\qquad
\Pi(\phi)\equiv -\dot\phi(0),
$$
denotes the inbound speed projection on the section, then
$$
R_\eta(\,\cdot\,;x_\ast)
=
\Pi\circ Q_\eta\circ \iota_\eta(\,\cdot\,;x_\ast).
$$

This is the correct status of the scalar map: it is a projection of the history-space excursion map through a chosen one-parameter injection, not an autonomous closure law of the delayed system.

Now introduce the net inward braking density
$$
B_\eta(t;u,x_\ast)
\equiv
A_p(t)+A_s^{\text{out}}(t)-A_s^{\text{in}}(t),
$$
so that along the trajectory
$$
\ddot x(t;u,x_\ast,\eta) = -B_\eta(t;u,x_\ast).
$$

Integrating from the outbound crossing at $t=0$ to the next inbound crossing at $t=T^-_\eta(u;x_\ast)$ gives
$$
-R_\eta(u;x_\ast)
=
u + \int_{0}^{T^-_\eta(u;x_\ast)}
\ddot x(s;u,x_\ast,\eta)\,ds
=
u - \int_{0}^{T^-_\eta(u;x_\ast)}
B_\eta(s;u,x_\ast)\,ds.
$$

Equivalently,
$$
R_\eta(u;x_\ast)
=
-u + \int_{0}^{T^-_\eta(u;x_\ast)}
B_\eta(s;u,x_\ast)\,ds.
$$

This is the clean projected scalar map: the next inbound speed equals the total accumulated inward braking budget over the outbound-and-return excursion minus the outbound launch speed at the section.

If $T^\mathrm{turn}_\eta(u;x_\ast)$ denotes the first turning time with
$$
\dot x\!\big(T^\mathrm{turn}_\eta(u;x_\ast)\big)=0,
$$
then the same map splits into two exact pieces:
$$
u
=
\int_{0}^{T^\mathrm{turn}_\eta(u;x_\ast)}
B_\eta(s;u,x_\ast)\,ds,
$$
$$
R_\eta(u;x_\ast)
=
\int_{T^\mathrm{turn}_\eta(u;x_\ast)}^{T^-_\eta(u;x_\ast)}
B_\eta(s;u,x_\ast)\,ds.
$$

The first identity is the outbound recapture condition on the section. The second states that the next inbound speed is exactly the inward gain accumulated after the turning point.

### Scalar closure condition

The map $R_\eta$ is only a projection of the exact history-space map $Q_\eta$, but it is the sharpest scalar diagnostic for recapture on the fixed section $x=x_\ast$.

If the admissible family is symmetric enough that outbound and inbound section data are parameterized by the same scalar speed, then a scalar breather candidate satisfies
$$
u_\ast = R_\eta(u_\ast;x_\ast).
$$

However, this scalar fixed-point condition does not by itself imply periodic closure. The delayed dynamics only closes when the full history is returned:
$$
\phi^\ast = P_\eta(\phi^\ast).
$$

The scalar map is therefore best read as a reduced diagnostic for recapture and speed balance. The actual theorem program should proceed by finding a closed, bounded, invariant subset of $\Sigma^-_{x_\ast,\eta}$ inside $\mathcal{K}_{x_\ast,\eta}$ and studying $P_\eta$ there.

### First candidate invariant set

The next mathematical step is to replace the generic admissible class by a more explicit envelope on which an invariance argument could plausibly be attempted.

Fix constants
$$
0<x_{\min}<x_\ast<x_{\max},
\qquad
0<u_{\min}\le u_{\max},
\qquad
\nu>0,
\qquad
0<T_{\min}\le T_{\max},
$$
and define
$$
\mathcal{E}_{x_\ast,\eta}
\subset
\Sigma^-_{x_\ast,\eta}
$$
to be the set of inbound histories $\phi$ satisfying:

- position envelope on the stored history,
  $$
  x_{\min}\le \phi(\theta)\le x_{\max},
  \qquad
  \theta\in[-h,0],
  $$
- inbound speed envelope at the section,
  $$
  u_{\min}\le -\dot\phi(0)\le u_{\max},
  $$
- uniform speed bound on the stored history,
  $$
  |\dot\phi(\theta)|\le u_{\max},
  \qquad
  \theta\in[-h,0],
  $$
- Jacobian transversality on all active roots in the stored history,
  $$
  |J_p|\ge \nu,
  \qquad
  |J_s|\ge \nu,
  $$
- and a one-cycle return-time window for the forward evolution,
  $$
  T_{\min}\le T(\phi)\le T_{\max}.
  $$

This is only a candidate theorem set, not a proved invariant set. Its purpose is to spell out what must eventually be shown:
$$
P_\eta(\mathcal{E}_{x_\ast,\eta})
\subseteq
\mathcal{E}_{x_\ast,\eta}.
$$

That single inclusion naturally breaks into four subproblems:

- recapture: every $\phi\in\mathcal{E}_{x_\ast,\eta}$ actually returns to the inbound section,
- envelope preservation: the returned history stays inside the same position and speed bounds,
- transversality preservation: active roots on the returned history still satisfy the same Jacobian lower bound,
- and return-time control: the cycle length remains inside $[T_{\min},T_{\max}]$.

If these items can be proved and $\mathcal{E}_{x_\ast,\eta}$ is chosen closed, bounded, and compact enough for the relevant history topology, then the fixed-point program for $P_\eta$ becomes concrete rather than rhetorical.

### First recapture target

The first nontrivial obligation is to show that $Q_\eta$ is actually defined on a useful outbound family. In the present reduced note, that means proving that an outward crossing of $x=x_\ast$ cannot persist forever inside the candidate envelope.

Take an outbound history
$$
\phi\in\Sigma^+_{x_\ast,\eta},
$$
and let $x_\phi(t)$ denote the corresponding forward trajectory while it remains in the tame regime defined by $\mathcal{K}_{x_\ast,\eta}$. Define the net inward braking density along that trajectory by
$$
B_\phi(t)\equiv A_p(t)+A_s^{\text{out}}(t)-A_s^{\text{in}}(t).
$$

The exact recapture condition from the scalar reduction says that a turning point occurs whenever there exists a time $t_{\mathrm{turn}}>0$ such that
$$
\int_0^{t_{\mathrm{turn}}} B_\phi(s)\,ds
=
\dot x_\phi(0).
$$

This suggests the first theorem-scale target.

> **Candidate Proposition (Recapture on a Tame Outbound Class).**
> Fix $(x_\ast,\eta)$ and an outbound subset
> $$
> \mathcal{O}_{x_\ast,\eta}\subset\Sigma^+_{x_\ast,\eta}
> $$
> with uniform bounds inherited from $\mathcal{K}_{x_\ast,\eta}$.
> Assume there is a constant $\beta_{\min}>0$ and a time window $\tau_{\mathrm{rec}}>0$ such that every trajectory starting from $\phi\in\mathcal{O}_{x_\ast,\eta}$ satisfies
> $$
> B_\phi(t)\ge \beta_{\min}
> \qquad
> \text{for }0\le t\le \tau_{\mathrm{rec}},
> $$
> and
> $$
> \beta_{\min}\tau_{\mathrm{rec}}
> \ge
> \sup_{\phi\in\mathcal{O}_{x_\ast,\eta}}\dot x_\phi(0).
> $$
> Then every such trajectory has a turning point by time $\tau_{\mathrm{rec}}$, and hence admits a well-defined outbound-to-inbound return time $T^-_\eta(\phi)$ provided the post-turn branch remains inside the same tame regime.

This proposition is intentionally stronger than necessary. Its value is that it exposes the actual analytic burden: one must control the negative term $A_s^{\text{in}}$ strongly enough that partner braking plus outer-memory braking dominates for long enough to erase the outbound speed.

For the current theorem program, the recapture problem can therefore be read as three nested tasks:

- produce a lower bound for $A_p$ on the relevant outbound interval,
- show that outer-memory self branches do not disappear too quickly if they are needed for braking,
- and prevent inner-memory self branches from driving a near-null runaway by making $A_s^{\text{in}}$ too large.

If even this strong recapture proposition cannot be supported on any nonempty outbound class, then the invariant-set program should stop there: the return maps $Q_\eta$ and $P_\eta$ are not defined on a robust domain, and no fixed-point theorem will rescue the model.

## Conjectured Breather Statement

The reduced 1D target can now be stated cleanly.

> **Conjecture (Regularized Collinear Breather).**
> For some nonempty parameter regime
> $$
> (\kappa,\epsilon,c_f,\eta,h,x_\ast)
> $$
> and some admissible reflection-symmetric history class, the return map $P_\eta$ has a fixed point
> $$
> \phi^\ast_\eta \in \Sigma^-_{x_\ast,\eta},
> \qquad
> P_\eta(\phi^\ast_\eta)=\phi^\ast_\eta.
> $$
> The corresponding trajectory is a bounded periodic two-body motion in which:
> 1. partner attraction drives the inward phase,
> 2. self-hit repulsion turns the trajectory around after the relevant super-field-speed history is created,
> 3. the motion returns to the same inbound section data after one full cycle.

The stability version is stronger:

> **Conjecture (Stable Breather).**
> The Fréchet derivative $DP_\eta(\phi^\ast_\eta)$ has spectral radius $<1$ on the section modulo time-shift symmetry, so the fixed point attracts nearby admissible histories.

This is the first clean theorem target for self-hit stabilization. It avoids the 2D circular tangential obstruction and does not require the full tri-binary architecture.

## Why This Reduced Model Comes First

This model should be attacked before the full circular MCB or full tri-binary for three reasons.

### 1. No tangential obstruction

The circular binary has a tangential no-go problem. The 1D model has no tangential channel at all. That removes the main obstruction already visible in the planar circular analysis.

### 2. Exact scalar Jacobians

In 1D,
$$
\hat r \in \{-1,+1\},
$$
so the delay-map Jacobians reduce to explicit scalar factors
$$
J_p = 1+\frac{\dot x(t_0)\hat r_p}{c_f},
\qquad
J_s = 1-\frac{\dot x(t_0)\hat r_s}{c_f}.
$$
This makes the branch geometry much easier to track analytically.

### 3. Direct test of the self-hit mechanism

If the collinear breather does not exist even after regularization, then the claim that self-hit alone can stabilize a bound binary is badly weakened. If it does exist, then the theory gains its first rigorous bounded delayed attractor.

## What Counts as Success or Failure

### Success

The reduced note succeeds if it supports a proof program for:

- local well-posedness of the regularized 1D dynamics,
- well-defined first-return times on a nontrivial section,
- existence of a fixed point of $P_\eta$,
- and, ideally, local stability of that fixed point.

### Failure

The reduced note fails as a stabilization test if:

- the return map is not well defined on any robust section,
- all trajectories escape or collapse instead of returning,
- the self-hit branches do not produce reversal strongly enough to create recurrence,
- or the $\eta\to 0^+$ limit destroys every regularized bounded orbit.

## Related Chapters

- [master-equation.md](./master-equation.md)
- [binary-dynamics.md](./binary-dynamics.md)
- [causal-action-functional.md](./causal-action-functional.md)
- [energy.md](./energy.md)
- [dyadic-resonance-lock.md](./dyadic-resonance-lock.md)
