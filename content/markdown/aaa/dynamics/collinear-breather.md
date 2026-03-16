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

When $x(t)>0$ and $u(t)<0$, the labeled right-hand architrino is inbound on the right exterior branch. After label-preserving passage through the center, the same particle continues on the left exterior branch with $x(t)<0$. For theorem work on full oscillations, the safest interpretation is therefore in signed coordinates $x\in\mathbb{R}$ together with the radial distance $d(t)=2|x(t)|$.

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

For theorem work across the origin crossing, shell regularization alone is not enough to control the inverse-square amplitude. A more robust local model therefore introduces a **dual mollification**: the shell mollifier $\delta_\eta$ for delayed root selection together with a short-distance core mollifier $\epsilon_c>0$ in the amplitude denominator,
$$
\frac{1}{r^2}
\quad\leadsto\quad
\frac{1}{r^2+\epsilon_c^2}.
$$
This leaves the delayed shell selection controlled by $\eta$ while the core mollifier caps the near-origin amplitude spike strongly enough for a clean $C^1$ theorem program.

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

### Signed-branch caution

The formulas above are exact on a fixed exterior slice $x(t)>0$, but they should not be overread as proving that a physical 1D trajectory can rebound at some $x_{\min}>0$ and then move back out on the same right-hand branch. In the current 1D delayed kernel, the pre-origin inbound leg is driven inward by partner attraction and by the self branches available on that slice. So the physically relevant oscillatory program should be formulated as an **origin-crossing** one in signed coordinates, or equivalently in the radial variable
$$
\rho(t)\equiv |x(t)|.
$$

In that formulation, a full oscillation alternates between the right and left exterior branches with label-preserving passage through $x=0$. The theorem targets later in this note should therefore be read as targets for post-crossing recapture of the radial distance rather than as literal pre-origin bounce statements on a single $x>0$ branch.

In particular, the present 1D geometry should not be treated as a radial simplification of the 2D circular case. Along a true collinear history, the self-hit term is naturally read as an anti-damping or positive-work contribution on the physically relevant post-crossing outbound branch: the self interaction tends to reinforce the current radial motion rather than furnish a centrifugal-style barrier. The corrected theorem program therefore asks whether partner attraction can recapture the motion **despite** that self-drive, not because self-hit itself creates the turnaround.

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
- uniform acceleration bounds
  $$
  |\ddot\phi(\theta)|\le a_{\max},
  $$
- and a transversality bound on every active partner and self root,
  $$
  |J_p|\ge \nu,
  \qquad
  |J_s|\ge \nu,
  \qquad
  \nu>0.
  $$

Also require the active causal memory depth to fit inside the chosen history window:
$$
\tau_{\max}(\phi)\le h
\qquad
\text{for every }\phi\in\mathcal{K}_{x_\ast,\eta}.
$$

The role of $\mathcal{K}_{x_\ast,\eta}$ is simple: it isolates a tame region of history space on which the regularized vector field, root selection, and section crossings can plausibly be controlled. The acceleration bound is the first compactness-oriented ingredient for a later Arzela-Ascoli step in $C^1$, and the memory-depth bound ensures the delayed law really closes on the chosen history interval. Whether the eventual theorem program allows histories that approach $x=0$ arbitrarily closely is a separate question and should not be conflated with the first well-posedness regime.

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
- uniform acceleration bound on the stored history,
  $$
  |\ddot\phi(\theta)|\le a_{\max},
  \qquad
  \theta\in[-h,0],
  $$
- Jacobian transversality on all active roots in the stored history,
  $$
  |J_p|\ge \nu,
  \qquad
  |J_s|\ge \nu,
  $$
- finite-memory closure on the stored history,
  $$
  \tau_{\max}(\phi)\le h,
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

The additional acceleration bound is not cosmetic. In a $C^1$ theorem program it is the natural ingredient used to promote a bounded history family toward precompactness, while the memory-depth bound prevents the return map from depending on path-history lying outside the chosen Banach window.

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

### Origin-crossing recapture target

The strongest narrow theorem target suggested by the corrected 1D geometry is not a pre-origin bounce, but a **post-crossing recapture** statement. After label-preserving passage through the center, the relevant question is whether partner attraction can erase the outward radial speed before the self-hit drive sends the particle to large radius.

Write
$$
\rho(t)\equiv |x(t)|
$$
for the radial distance on the signed 1D trajectory, and let
$$
V_\phi(t)\equiv \dot\rho_\phi(t)
$$
denote the outward radial speed on a post-crossing branch where $V_\phi(t)>0$.

> **Candidate Proposition (Origin-Crossing Recapture Class).**
> Fix $(x_\ast,\eta)$ and let
> $$
> \mathcal{O}^{\mathrm{cross}}_{x_\ast,\eta}
> $$
> be a class of outbound post-crossing histories satisfying the tame bounds inherited from $\mathcal{K}_{x_\ast,\eta}$.
> Assume there exists a time window $[0,\tau_{\mathrm{cross}}]$ such that every forward trajectory from $\phi\in\mathcal{O}^{\mathrm{cross}}_{x_\ast,\eta}$ satisfies
> $$
> A_p^{\rho}(t)-A_s^{\rho}(t)\ge \beta_{\mathrm{cross}}>0
> \qquad
> \text{for }0\le t\le \tau_{\mathrm{cross}},
> $$
> where $A_p^{\rho}$ is the inward radial partner contribution and $A_s^{\rho}$ is the outward radial self-hit contribution on the post-crossing branch.
> If
> $$
> \beta_{\mathrm{cross}}\tau_{\mathrm{cross}}
> \ge
> \sup_{\phi\in\mathcal{O}^{\mathrm{cross}}_{x_\ast,\eta}}V_\phi(0),
> $$
> then every such trajectory turns around by time $\tau_{\mathrm{cross}}$, and the recapture leg of the return map is well defined provided the post-turn branch remains inside the tame regime.

This is the corrected geometric heart of the 1D problem. The theorem burden is no longer to remove the destabilizing self term, but to show that partner attraction can dominate it on a nonempty post-crossing outbound class.

### Replacement local lemma target

The key local lemma is therefore not outer-memory dominance, but **bounded post-crossing self drive**.

> **Lemma Target (Initial Post-Crossing Self-Drive Bound).**
> Let $\phi\in\mathcal{O}^{\mathrm{cross}}_{x_\ast,\eta}$ be a post-crossing outbound history with
> $$
> 0<V_\phi(0)\le u_{\max}.
> $$
> Assume the active self roots on the initial outbound window arise from noncaustic head-on delayed encounters so that the self Jacobian stays uniformly away from zero. Then there exist constants
> $$
> \overline A_s^{\rho}<\infty,
> \qquad
> \tau_{\mathrm{loc}}>0,
> $$
> such that
> $$
> A_s^{\rho}(t)\le \overline A_s^{\rho}
> \qquad
> \text{for }0\le t\le \tau_{\mathrm{loc}}.
> $$

This is the local delay-geometry heart of the corrected program. If the self drive can be shown to remain uniformly bounded on the initial post-crossing window, then the recapture question becomes a direct competition between a bounded outward delayed drive and the inward $1/\rho^2$ partner attraction.

### Post-crossing sorting map

The cleanest geometric device for the local lemma is the signed sorting function
$$
w(t)\equiv x(t)+c_f t.
$$

On a post-crossing branch with $\dot x(t)<0$, self-hit roots satisfying the left-moving causal branch obey
$$
x(t)-x(t_s)=-c_f(t-t_s),
$$
which is equivalent to
$$
w(t_s)=w(t).
$$

Thus the active self roots are organized by level sets of $w$. Its derivative is
$$
\dot w(t)=\dot x(t)+c_f.
$$

For the corrected theorem program, the intended phase picture is:

- **early inbound sub-field-speed:** if $-c_f<\dot x(t)<0$, then $\dot w(t)>0$,
- **caustic hinge:** if $\dot x(t)=-c_f$, then $\dot w(t)=0$,
- **late inbound super-field-speed:** if $\dot x(t)<-c_f$, then $\dot w(t)<0$,
- **origin crossing:** in signed coordinates one has $x(0)=0$ and hence
  $$
  w(0)=0,
  $$
- **initial post-crossing outbound:** if the crossing remains super-field-speed on a short window, then $\dot w(t)<0$ persists and therefore
  $$
  w(t)<0
  \qquad
  \text{for }0<t\le \tau_{\mathrm{loc}}.
  $$

Let $t_{\mathrm{zero}}<0$ denote the earlier inbound time on the ascending branch for which
$$
w(t_{\mathrm{zero}})=0.
$$

If the initial post-crossing window satisfies $w(t)<0$, then every active self root selected by
$$
w(t_s)=w(t)
$$
must satisfy
$$
t_s<t_{\mathrm{zero}}.
$$

That is the key sorting consequence: the active self roots on the initial post-crossing window are forced into the earlier sub-field-speed inbound regime. In that regime one has
$$
-c_f<\dot x(t_s)<0,
$$
and therefore on the relevant left-moving branch
$$
0<J_s(t;t_s)=1+\frac{\dot x(t_s)}{c_f}\le 1.
$$

If the roots stay a definite distance before the hinge, this gives a strict lower bound on $J_s$ and isolates the caustic from the initial post-crossing branch. That is the intended mechanism behind the bound
$$
A_s^{\rho}(t)\le \overline A_s^{\rho}
$$
on the initial post-crossing window.

### Origin-crossing braking dominance target

The corrected 1D theorem target is a **local origin-crossing recapture theorem**. The point is not merely to bound the self drive, but to prove that on an explicit initial window the inward partner term wins strongly enough to erase the post-crossing outward radial speed.

> **Candidate Theorem (Local Origin-Crossing Recapture).**
> Let the 1D kernel be dual-mollified by a shell width $\eta>0$ and a core mollifier $\epsilon_c>0$. Let $\phi$ be an admissible signed history with an origin crossing at $t=0$ and outward radial speed
> $$
> V_0\equiv V_\phi(0)>c_f.
> $$
> For the working theorem program, $\phi$ is taken from a fixed admissible crossing subclass
> $$
> \mathcal{K}^{\mathrm{cross}}_{\eta,\epsilon_c},
> $$
> defined below so that the local constants used in Lemmas 1-4 are uniform on that class.
> Assume hypotheses (H1)-(H4) below, and assume either:
> 1. the abstract Goldilocks hypothesis (H5), or
> 2. the explicit short-window assumptions of Proposition `Explicit short-window recapture regime`.
>
> Then there exists a time window $[0,\tau_{\mathrm{env}}]$ on which:
> $$
> w(t)<0,
> \qquad
> A_s^{\rho}(t)\le \overline A_s^{\rho},
> $$
> and the radial acceleration satisfies
> $$
> \ddot\rho(t)\le -A_p^{\rho}(t)+A_s^{\rho}(t).
> $$
> If, in addition,
> $$
> \tau_{\mathrm{env}}\ge \tau_{\mathrm{sep}},
> \qquad
> \sigma\equiv \frac{V_0-c_f}{2},
> \qquad
> \tau_{\mathrm{sep}}\equiv \frac{2\eta}{\sigma},
> $$
> then on the delayed subwindow
> $$
> [\tau_{\mathrm{sep}},\tau_{\mathrm{env}}],
> $$
> every active self root satisfies
> $$
> t_s\le t_{\mathrm{zero}}-\frac{\eta}{\nu},
> $$
> so the caustic is separated from the active self branches there.
> If the resulting impulse margin obeys
> $$
> V_0<
> \int_0^{\tau_{\mathrm{env}}}
> \Big(
> \underline A_p^{\rho}(s)-\overline A_s^{\rho}
> \Big)\,ds,
> $$
> then there exists
> $$
> \tau_{\mathrm{turn}}\in(0,\tau_{\mathrm{env}}]
> $$
> such that
> $$
> \dot\rho(\tau_{\mathrm{turn}})=0.
> $$
> In particular, the post-crossing branch is radially recaptured on the initial window.

This is the theorem-scale target closest to the corrected geometric analysis. The abstract form passes through (H5), while the working route in the current note is the explicit short-window proposition proved from Lemmas 1-4.

### Hypotheses unpacked

The current theorem target is intended as a **local-in-time recapture theorem** on an initial post-crossing window. Its hypotheses can be organized as follows.

**(H1) Origin-crossing data.**
$$
\phi(0)=0,
\qquad
\dot\phi(0)=-V_0,
\qquad
V_0>c_f.
$$

**(H2) Sorting-map phase picture on the stored past.**
For the history sorting map
$$
w(\theta)=\phi(\theta)+c_f\theta,
\qquad
\theta\in[-h,0],
$$
there exist times
$$
t_{\mathrm{zero}}<t_{\mathrm{hinge}}<0
$$
such that
$$
w(t_{\mathrm{zero}})=0,
\qquad
\dot\phi(t_{\mathrm{hinge}})=-c_f,
$$
and
$$
w(\theta)>0
\qquad
\text{for }\theta\in(t_{\mathrm{zero}},0).
$$
For any fixed interior margin
$$
0<\gamma_w<\min\{t_{\mathrm{hinge}}-t_{\mathrm{zero}},-t_{\mathrm{hinge}}\},
$$
continuity then gives the compact-subinterval gap
$$
\delta_w
\equiv
\min_{\theta\in[t_{\mathrm{zero}}+\gamma_w,-\gamma_w]} w(\theta)
>0.
$$

**(H3) Past transversality on the sub-field-speed source region.**
There exists $\nu>0$ such that
$$
\dot\phi(\theta)\ge -c_f+\nu
\qquad
\text{for }\theta\in[-h,t_{\mathrm{zero}}].
$$

**(H4) Shell-mollifier separation from the interior sorting gap.**
For the compact-subinterval gap chosen in (H2), the shell mollifier width is small enough that its support cannot bridge from the negative post-crossing values of $w(t)$ into the positive interior sorting hump:
$$
\eta<\frac{\delta_w}{2}.
$$

**(H5) Goldilocks crossing-speed / core-mollifier regime.**
There exists a time window
$$
[0,\tau_{\mathrm{env}}]\subseteq [0,\tau_{\mathrm{tube}}],
$$
such that
$$
V_0<
\int_0^{\tau_{\mathrm{env}}}
\Big(
\underline A_p^{\rho}(s;\phi,V_0,\epsilon_c)
-
\overline A_s^{\rho}(\phi,\nu)
\Big)\,ds.
$$
In the current note this remains the abstract bottleneck hypothesis. A concrete sufficient realization is provided later by the proposition `Explicit short-window recapture regime`, which chooses
$$
\tau_{\mathrm{env}}=\tau_\epsilon\equiv \frac{\epsilon_c}{2\beta_{p,\max}}
$$
on a fixed admissible crossing subclass and replaces the integral inequality by explicit algebraic bounds on
$$
(\eta,\epsilon_c,V_{\max},\kappa\epsilon^2).
$$

### Uniform admissible crossing subclass

To make those local constants concrete, fix positive class parameters
$$
c_f<V_{\min}\le V_{\max},
\qquad
\gamma_w,
\qquad
\delta_{w,\min},
\qquad
\nu,
\qquad
\rho_{0,\min},
\qquad
a_{\max},
\qquad
a_{\mathrm{tube}},
\qquad
\tau_{\mathrm{tube}},
$$
and an integer root-count bound
$$
N_s^{\max}\ge 1.
$$

Let
$$
\mathcal{K}^{\mathrm{cross}}_{\eta,\epsilon_c}
\subset
C^1([-h,0];\mathbb{R})
$$
denote the class of signed crossing histories $\phi$ satisfying:

- the theorem hypotheses (H1)-(H4) with class-wide constants bounded by
  $$
  V_{\min}\le V_0(\phi)\le V_{\max},
  \qquad
  \delta_w(\phi;\gamma_w)\ge \delta_{w,\min},
  \qquad
  \nu(\phi)\ge \nu,
  $$
- a uniform pre-crossing acceleration bound,
  $$
  |\ddot\phi(\theta)|\le a_{\max}
  \qquad
  \text{for }\theta\in[-h,0],
  $$
- a uniform pre-caustic radius bound,
  $$
  \rho_{\mathrm{zero}}(\phi)
  \equiv
  -c_f t_{\mathrm{zero}}(\phi)
  =
  \phi(t_{\mathrm{zero}}(\phi))
  \ge
  \rho_{0,\min},
  $$
- and a forward local tube condition: the dual-mollified forward continuation exists on
  $$
  [0,\tau_{\mathrm{tube}}],
  $$
  satisfies
  $$
  |\ddot x_\phi(t)|\le a_{\mathrm{tube}}
  \qquad
  \text{for }0\le t\le \tau_{\mathrm{tube}},
  $$
  every active self root on that window obeys
  $$
  |J_s(t;t_s)|\ge \frac{\nu}{c_f},
  $$
  and has at most
  $$
  N_s^{\max}
  $$
  active self roots on the initial post-crossing window.

The shell width is chosen inside the class-uniform interior sorting gap:
$$
\eta<\frac{\delta_{w,\min}}{2}.
$$

From these class parameters one may fix the derived constants
$$
\sigma_{\min}\equiv \frac{V_{\min}-c_f}{2},
\qquad
a_{\mathrm{loc}}\equiv a_{\mathrm{tube}},
\qquad
a_\ast\equiv \max\{a_{\max},a_{\mathrm{tube}}\},
\qquad
\beta_{p,\min}\equiv \frac{2c_fV_{\min}}{V_{\min}+c_f},
\qquad
\beta_{p,\max}\equiv \frac{2c_fV_{\max}}{V_{\max}+c_f},
\qquad
\tau_1\equiv \min\!\left\{\tau_{\mathrm{tube}},\frac{\sigma_{\min}}{a_{\mathrm{tube}}}\right\},
$$
with $\tau_\rho$ chosen so that
$$
V_{\max}\tau_\rho+\frac{a_{\mathrm{tube}}}{2}\tau_\rho^2
\le
\frac{\rho_{0,\min}}{2}.
$$
On this subclass:

- Lemma 1 uses the common continuation constants $(\sigma_{\min},a_{\mathrm{tube}},\tau_1)$,
- Lemma 2 uses the common geometric separation data $(\rho_{0,\min},\nu,N_s^{\max})$,
- Lemma 3 admits a common partner-root remainder constant
  $$
  C_p=C_p(V_{\max},c_f,a_\ast),
  $$
- and the explicit short-window proposition can be written uniformly by replacing $(V_0,\beta_p)$ with the class-wide worst-case pair $(V_{\max},\beta_{p,\max})$, while the delayed-entry time uses the lower-speed bound $\sigma_{\min}$.

This is the sense in which the later local constants are inherited by construction rather than introduced ad hoc.

### Lemma ladder

The theorem target naturally breaks into four lemmas.

**Lemma 1: Short-time continuation and sorting-map monotonicity.**
Prove that there exists $\tau_1>0$ such that
$$
\dot x(t)\le -c_f
\qquad
\text{for }0\le t\le \tau_1,
$$
so that
$$
\dot w(t)\le 0
\qquad
\text{and hence}
\qquad
w(t)<0
$$
on the initial post-crossing window.

Working form:
let
$$
\sigma\equiv \frac{V_0-c_f}{2}>0.
$$
Because the dual-mollified vector field is finite on the post-crossing window, there exists a local acceleration bound
$$
|\ddot x(t)|\le a_{\mathrm{loc}}
\qquad
\text{for }0\le t\le \tau_{\mathrm{loc}}.
$$
Choose
$$
\tau_1\le \min\!\left\{\tau_{\mathrm{loc}},\frac{\sigma}{a_{\mathrm{loc}}}\right\}.
$$
Then
$$
\dot x(t)
\le
\dot x(0)+a_{\mathrm{loc}}t
=
-V_0+a_{\mathrm{loc}}t
\le
-V_0+\sigma
=
-c_f-\sigma
<
-c_f
$$
for all $t\in[0,\tau_1]$. Consequently
$$
\dot w(t)=\dot x(t)+c_f\le -\sigma,
$$
and integrating from $w(0)=0$ gives
$$
w(t)\le -\sigma t<0
\qquad
\text{for }0<t\le \tau_1.
$$

Proof.
The forward local tube condition in the admissible crossing subclass gives existence of the dual-mollified continuation on $[0,\tau_{\mathrm{loc}}]$ together with the bound
$$
|\ddot x(t)|\le a_{\mathrm{loc}}.
$$
Because
$$
\dot x(0)=-V_0<-c_f,
$$
the fundamental theorem of calculus yields
$$
\dot x(t)=\dot x(0)+\int_0^t \ddot x(s)\,ds
\le
-V_0+a_{\mathrm{loc}}t.
$$
Choosing
$$
\tau_1\le \min\!\left\{\tau_{\mathrm{loc}},\frac{\sigma}{a_{\mathrm{loc}}}\right\}
$$
forces
$$
\dot x(t)\le -V_0+\sigma=-c_f-\sigma<-c_f
$$
for every $t\in[0,\tau_1]$. Therefore
$$
\dot w(t)=\dot x(t)+c_f\le -\sigma,
$$
and integration from the crossing value
$$
w(0)=x(0)+c_f\cdot 0=0
$$
gives
$$
w(t)\le -\sigma t<0
$$
on $(0,\tau_1]$. This proves the lemma. On a fixed admissible crossing subclass the same argument is uniform after replacing $\sigma$ by $\sigma_{\min}$ and $a_{\mathrm{loc}}$ by $a_{\mathrm{tube}}$.

**Lemma 2: Caustic isolation and uniform self-drive bound.**
Use the local tube bounds to obtain a crude self-drive estimate on the full post-crossing window, and then use (H2)-(H4) together with Lemma 1 to show that on a delayed subwindow every active self root lies strictly before $t_{\mathrm{zero}}$ and hence stays away from the caustic hinge.

Working form:
fix $t\in(0,\tau_1]$ and suppose a self-emission time $t_s<t$ lies in the support of the shell mollifier on the left-moving post-crossing branch. If the shell mollifier has support radius $\eta$, then
$$
\left|x(t)-x(t_s)+c_f(t-t_s)\right|\le \eta,
$$
which is equivalent to
$$
\left|w(t_s)-w(t)\right|\le \eta.
$$

On the full initial tube one only assumes the class-wide transversality and branch-count bounds. Therefore
$$
A_s^{\rho}(t)
\le
N_s^{\max}\,
\kappa\epsilon^2\,
\frac{c_f}{\nu}\,
\frac{1}{\epsilon_c^2}
\equiv
\overline A_s^{\rho}
\qquad
\text{for }0\le t\le \tau_1.
$$
This is the basic bounded self-drive estimate used in the local theorem.

One obtains a stronger separated statement on a slightly delayed subwindow. Define
$$
\tau_{\mathrm{sep}}\equiv \frac{2\eta}{\sigma}.
$$
Then for $t\in[\tau_{\mathrm{sep}},\tau_1]$,
$$
w(t)\le -2\eta,
$$
so any active self root satisfies
$$
w(t_s)\le -\eta.
$$
Hence every active self root on that delayed subwindow satisfies
$$
t_s<t_{\mathrm{zero}}.
$$
Since on the sub-field-speed source region one has
$$
\dot w(\theta)=\dot x(\theta)+c_f\ge \nu,
\qquad
\theta\in[-h,t_{\mathrm{zero}}],
$$
monotonicity gives
$$
t_s\le t_{\mathrm{zero}}-\gamma(\eta),
\qquad
\gamma(\eta)\equiv \frac{\eta}{\nu}.
$$

Thus the caustic is uniformly separated from the active self roots on the delayed subwindow.

A sharper geometric version is available only on the delayed window where the roots have already entered the sub-field-speed source region. Since
$$
w(t_{\mathrm{zero}})=0
\qquad
\Longrightarrow
\qquad
x(t_{\mathrm{zero}})=-c_f t_{\mathrm{zero}}
\equiv
\rho_{\mathrm{zero}}>0,
$$
and the pre-crossing branch is inbound, one has
$$
x(t_s)\ge \rho_{\mathrm{zero}}
\qquad
\text{for every }t_s\le t_{\mathrm{zero}}.
$$
Choose a short window $[0,\tau_\rho]$ on which
$$
\rho(t)=|x(t)|\le \frac{\rho_{\mathrm{zero}}}{2}.
$$
Then every active self root on the delayed geometric window
$$
t\in[\tau_{\mathrm{sep}},\min\{\tau_1,\tau_\rho\}]
$$
satisfies
$$
|x(t)-x(t_s)|
=
\rho(t)+x(t_s)
\ge
\frac{\rho_{\mathrm{zero}}}{2}.
$$
Hence the same branch-count bound yields the sharper estimate
$$
A_s^{\rho}(t)
\le
N_s^{\max}\,
\kappa\epsilon^2\,
\frac{c_f}{\nu}\,
\frac{4}{\rho_{\mathrm{zero}}^2}
\equiv
\overline A_{s,\mathrm{geom}}^{\rho},
$$
which is independent of the core mollifier $\epsilon_c$. This is the delayed-window version that can sharpen the Goldilocks condition once the short-time window extends beyond $\tau_{\mathrm{sep}}$.

Proof.
On the full initial tube, each active self branch contributes a radial acceleration of the form
$$
\kappa\epsilon^2\,
\frac{1}{|J_s|}\,
\frac{1}{r_s^2+\epsilon_c^2},
$$
with
$$
|J_s|\ge \frac{\nu}{c_f}
$$
by the class definition and
$$
r_s^2+\epsilon_c^2\ge \epsilon_c^2
$$
by core mollification. Summing over at most
$$
N_s^{\max}
$$
active self roots gives the crude bound
$$
A_s^{\rho}(t)\le \overline A_s^\rho
$$
for
$$
0\le t\le \tau_1.
$$

For the delayed separation, Lemma 1 gives
$$
w(t)\le -\sigma t.
$$
Hence for
$$
t\in[\tau_{\mathrm{sep}},\tau_1],
\qquad
\tau_{\mathrm{sep}}=\frac{2\eta}{\sigma},
$$
one has
$$
w(t)\le -2\eta.
$$
If a self root $t_s<t$ lies in the shell support, then
$$
|w(t_s)-w(t)|\le \eta,
$$
so
$$
w(t_s)\le -\eta<0.
$$
But hypothesis (H2) states that
$$
w(\theta)>0
\qquad
\text{for }\theta\in(t_{\mathrm{zero}},0),
$$
therefore no such $t_s$ can lie in $(t_{\mathrm{zero}},0)$ and hence
$$
t_s<t_{\mathrm{zero}}.
$$
On the source region
$$
[-h,t_{\mathrm{zero}}],
$$
hypothesis (H3) gives
$$
\dot w(\theta)=\dot x(\theta)+c_f\ge \nu.
$$
Applying the mean-value theorem between $t_s$ and $t_{\mathrm{zero}}$ yields
$$
w(t_{\mathrm{zero}})-w(t_s)\ge \nu\,(t_{\mathrm{zero}}-t_s).
$$
Since
$$
w(t_{\mathrm{zero}})=0
\qquad
\text{and}
\qquad
w(t_s)\le -\eta,
$$
it follows that
$$
t_s\le t_{\mathrm{zero}}-\frac{\eta}{\nu}
=
t_{\mathrm{zero}}-\gamma(\eta).
$$
This proves the delayed caustic-separation claim.

For the geometric refinement, use that the selected source branch is inbound before the crossing, so $x(\theta)$ decreases toward the origin on the stored pre-crossing leg. Thus
$$
t_s\le t_{\mathrm{zero}}
\qquad
\Longrightarrow
\qquad
x(t_s)\ge x(t_{\mathrm{zero}})=\rho_{\mathrm{zero}}.
$$
If in addition
$$
0\le t\le \tau_\rho
\qquad
\text{and}
\qquad
\rho(t)\le \frac{\rho_{\mathrm{zero}}}{2},
$$
then on the delayed geometric window
$$
t\in[\tau_{\mathrm{sep}},\min\{\tau_1,\tau_\rho\}]
$$
one has
$$
|x(t)-x(t_s)|=\rho(t)+x(t_s)\ge \frac{\rho_{\mathrm{zero}}}{2}.
$$
Replacing the crude denominator bound
$$
r_s^2+\epsilon_c^2\ge \epsilon_c^2
$$
by
$$
r_s^2+\epsilon_c^2\ge \frac{\rho_{\mathrm{zero}}^2}{4}
$$
and summing again over at most
$$
N_s^{\max}
$$
branches gives
$$
A_s^\rho(t)\le \overline A_{s,\mathrm{geom}}^\rho.
$$
This proves Lemma 2.

**Lemma 3: Partner-root linearization and lower bound.**
Use the linearized partner root
$$
t_p
=
-\left(\frac{V_0-c_f}{V_0+c_f}\right)t
$$
to derive the partner-distance bound
$$
r_p(t)\le
\left(\frac{2c_fV_0}{V_0+c_f}\right)t+\mathcal{O}(t^2),
$$
and hence a lower bound on the core-mollified partner attraction
$$
A_p^{\rho}(t)\ge \underline A_p^{\rho}(t).
$$

Working form:
write
$$
s\equiv -t_p>0
$$
for the past partner-emission time measured backward from the crossing. On the active partner branch, shell support gives
$$
\left||x(t)+x(t_p)|-c_f(t+s)\right|\le \eta.
$$

Assume the signed trajectory is $C^1$ through the crossing and obeys uniform acceleration bounds on both sides of $t=0$. Then there exists
$$
a_\ast\equiv \max\{a_{\mathrm{loc}},a_{\max}\}
$$
such that the Taylor remainders satisfy
$$
x(t)= -V_0 t + R_+(t),
\qquad
|R_+(t)|\le \frac{a_\ast}{2}t^2,
$$
for $t\in[0,\tau_1]$, and
$$
x(t_p)= V_0 s + R_-(s),
\qquad
|R_-(s)|\le \frac{a_\ast}{2}s^2,
$$
for $s\in[0,\tau_1]$.

Substituting these expansions into the partner-shell condition yields
$$
\left|
V_0(t-s)-c_f(t+s)
+E_p(t,s)
\right|
\le \eta,
$$
where
$$
|E_p(t,s)|\le \frac{a_\ast}{2}(t^2+s^2).
$$

Let
$$
\alpha\equiv \frac{V_0-c_f}{V_0+c_f}\in(0,1),
\qquad
\beta_p\equiv \frac{2c_fV_0}{V_0+c_f}.
$$
Then the linearized root is $s=\alpha t$. For sufficiently small $t$ and $\eta$, the exact active partner root obeys the one-sided estimate
$$
s\le \alpha t + C_p(t^2+\eta)
$$
for some constant $C_p$ depending only on $(V_0,c_f,a_\ast)$.

Consequently the delayed partner distance satisfies the upper bound
$$
r_p(t)=c_f(t+s)
\le
\beta_p t + c_f C_p(t^2+\eta).
$$

This is the form needed for the theorem program: as the trajectory brakes after the crossing, the true partner distance can only become smaller than this leading linear estimate, which strengthens the partner attraction. Therefore the core-mollified partner term admits the explicit lower bound
$$
A_p^{\rho}(t)
\ge
\frac{\kappa\epsilon^2}{
\left(
\beta_p t + c_f C_p(t^2+\eta)
\right)^2+\epsilon_c^2}
\equiv
\underline A_p^{\rho}(t).
$$

Proof.
Let
$$
F(t,s)\equiv V_0(t-s)-c_f(t+s)+E_p(t,s).
$$
The shell condition on the active partner branch is precisely
$$
|F(t,s)|\le \eta.
$$
At the linear level,
$$
F_0(t,s)=V_0(t-s)-c_f(t+s)
$$
has root
$$
s=\alpha t,
\qquad
\alpha=\frac{V_0-c_f}{V_0+c_f},
$$
and
$$
\partial_s F_0(0,0)=-(V_0+c_f)\neq 0.
$$
Write
$$
E_p(t,s)=-(R_+(t)+R_-(s)),
$$
so the absolute remainder bounds imply
$$
|E_p(t,\alpha t)|
\le
\frac{a_\ast}{2}(1+\alpha^2)t^2
\equiv
C_0 t^2.
$$
Moreover the integral remainder formula gives
$$
|\partial_s E_p(t,s)|\le a_\ast s.
$$
After shrinking the local window if necessary, assume
$$
0\le s\le \tau_1
\qquad
\text{and}
\qquad
a_\ast\tau_1\le \frac{V_0+c_f}{2}.
$$
Then on that window
$$
\partial_s F(t,s)
=
-(V_0+c_f)+\partial_s E_p(t,s)
\le
-\frac{V_0+c_f}{2}<0.
$$
Hence the active partner branch is quantitatively nondegenerate. Applying the mean-value theorem in the $s$ variable between $s$ and $\alpha t$ yields a point $\xi$ between them such that
$$
F(t,s)-F(t,\alpha t)=\partial_s F(t,\xi)\,(s-\alpha t).
$$
Therefore
$$
\frac{V_0+c_f}{2}\,|s-\alpha t|
\le
|F(t,s)|+|F(t,\alpha t)|
\le
\eta+C_0 t^2,
$$
so
$$
|s-\alpha t|
\le
\frac{2}{V_0+c_f}\big(\eta+C_0 t^2\big).
$$
Thus there is an explicit constant
$$
C_p=C_p(V_0,c_f,a_\ast)
$$
such that
$$
s\le \alpha t + C_p(t^2+\eta).
$$
Substituting into
$$
r_p(t)=c_f(t+s)
$$
gives
$$
r_p(t)\le c_f(1+\alpha)t+c_f C_p(t^2+\eta)
=
\beta_p t + c_f C_p(t^2+\eta).
$$
Because the core-mollified partner contribution is monotone decreasing in the delayed distance,
$$
r_p(t)\le r_{\mathrm{ub}}(t)
\qquad
\Longrightarrow
\qquad
\frac{1}{r_p(t)^2+\epsilon_c^2}
\ge
\frac{1}{r_{\mathrm{ub}}(t)^2+\epsilon_c^2},
$$
where
$$
r_{\mathrm{ub}}(t)\equiv \beta_p t + c_f C_p(t^2+\eta).
$$
Multiplying by the positive prefactor
$$
\kappa\epsilon^2
$$
gives
$$
A_p^\rho(t)\ge \underline A_p^\rho(t),
$$
which proves the lemma. On the admissible crossing subclass the same argument is uniform after replacing
$$
V_0\mapsto V_{\max}
\qquad
\text{in }C_p
$$
and, when desired for a conservative bound, replacing
$$
\beta_p\mapsto \beta_{p,\max}.
$$

**Lemma 4: Recapture integration.**
Show that the function
$$
f(t)
\equiv
V_0-
\int_0^t
\Big(
\underline A_p^{\rho}(s)-\overline A_s^{\rho}
\Big)\,ds
$$
has a zero on the initial window under (H5), and conclude that the true radial speed must vanish there.

Working form:
fix a window $[0,\tau]$ on which Lemma 2 and Lemma 3 both hold, and define
$$
B_\tau\equiv c_f C_p(\tau^2+\eta).
$$
Then for $0\le t\le \tau$,
$$
\underline A_p^{\rho}(t)
\ge
\frac{\kappa\epsilon^2}{
\left(\beta_p t+B_\tau\right)^2+\epsilon_c^2
}.
$$

Integrating this explicit lower bound gives the partner impulse estimate
$$
\Delta V_p(\tau)
\equiv
\int_0^\tau \underline A_p^{\rho}(s)\,ds
\ge
\frac{\kappa\epsilon^2}{\beta_p\epsilon_c}
\left[
\arctan\!\left(\frac{\beta_p\tau+B_\tau}{\epsilon_c}\right)
-
\arctan\!\left(\frac{B_\tau}{\epsilon_c}\right)
\right].
$$

If the self-drive is bounded above by a constant $\overline A_s^\rho$ on the same window, then the total outward impulse from self-hit is at most
$$
\Delta V_s(\tau)\le \overline A_s^\rho\,\tau.
$$

Therefore a sufficient recapture condition is
$$
V_0<
\Delta V_p(\tau)-\overline A_s^\rho\,\tau.
$$

If, in addition, the chosen window reaches the delayed geometric regime,
$$
\tau\ge \tau_{\mathrm{sep}}
\qquad
\text{and}
\qquad
\tau\le \tau_\rho,
$$
then one may split the self-drive loss as
$$
\Delta V_s(\tau)
\le
\overline A_s^\rho\,\tau_{\mathrm{sep}}
+
\overline A_{s,\mathrm{geom}}^\rho\,(\tau-\tau_{\mathrm{sep}}),
$$
and therefore the sharper sufficient recapture condition becomes
$$
V_0<
\Delta V_p(\tau)
-
\overline A_s^\rho\,\tau_{\mathrm{sep}}
-
\overline A_{s,\mathrm{geom}}^\rho\,(\tau-\tau_{\mathrm{sep}}).
$$

This is the working form of the Goldilocks condition. It makes the bottleneck explicit: one must show that there exist parameters
$$
(\eta,\epsilon_c,V_0,\tau)
$$
for which the dual-mollified partner impulse beats the bounded self-drive loss on a nonempty initial window.

On a fixed admissible crossing subclass, the corresponding class-uniform version replaces
$$
V_0\mapsto V_{\max},
\qquad
\beta_p\mapsto \beta_{p,\max},
\qquad
\sigma\mapsto \sigma_{\min},
$$
and uses the common remainder constant
$$
C_p=C_p(V_{\max},c_f,a_\ast).
$$
That conservative substitution is the bridge from the single-history Lemma 4 estimate to the class-uniform proposition below.

Proof.
Let
$$
V(t)\equiv \dot\rho(t)
$$
denote the outward radial speed on the post-crossing branch. Then
$$
V(0)=V_0>0.
$$
By Lemma 2 and Lemma 3, on every window $[0,\tau]$ where both lemmas hold one has
$$
\ddot\rho(t)\le -\underline A_p^\rho(t)+\overline A_s^\rho.
$$
Integrating from $0$ to $t\le \tau$ yields
$$
V(t)
=
V_0+\int_0^t \ddot\rho(s)\,ds
\le
V_0-\int_0^t\big(\underline A_p^\rho(s)-\overline A_s^\rho\big)\,ds
=
f(t).
$$
If the delayed geometric regime is available, the same integration gives the sharper estimate
$$
V(t)
\le
V_0-\Delta V_p(t)
+
\overline A_s^\rho\,\tau_{\mathrm{sep}}
+
\overline A_{s,\mathrm{geom}}^\rho\,(t-\tau_{\mathrm{sep}})
$$
for
$$
t\in[\tau_{\mathrm{sep}},\tau].
$$

Now assume the Goldilocks condition holds on $[0,\tau]$, so that
$$
f(\tau)<0.
$$
If $V$ remained strictly positive on the whole interval $[0,\tau]$, then evaluating the previous bound at $t=\tau$ would give
$$
0<V(\tau)\le f(\tau)<0,
$$
which is impossible. Therefore the set
$$
\{t\in[0,\tau]:V(t)=0\}
$$
is nonempty. Define
$$
\tau_{\mathrm{turn}}
\equiv
\inf\{t\in[0,\tau]:V(t)=0\}.
$$
Continuity of $V$ implies
$$
V(\tau_{\mathrm{turn}})=0,
$$
so the outward radial speed vanishes by time $\tau$. This is the desired recapture statement.

The class-uniform version is the same argument with the conservative substitutions
$$
V_0\mapsto V_{\max},
\qquad
\beta_p\mapsto \beta_{p,\max},
\qquad
\sigma\mapsto \sigma_{\min},
$$
and the common remainder constant
$$
C_p=C_p(V_{\max},c_f,a_\ast),
$$
which is precisely the form used in the explicit short-window proposition below.

Using monotonicity of the arctangent integrand gives a simpler algebraic lower bound:
$$
\Delta V_p(\tau)
\ge
\frac{\kappa\epsilon^2\,\tau}{
\epsilon_c^2+\left(\beta_p\tau+B_\tau\right)^2
}.
$$
Hence a cleaner sufficient recapture condition is
$$
V_0<
\tau
\left[
\frac{\kappa\epsilon^2}{
\epsilon_c^2+\left(\beta_p\tau+B_\tau\right)^2
}
-
\overline A_s^\rho
\right].
$$

Equivalently,
$$
\kappa\epsilon^2
>
\left(
\frac{V_0}{\tau}
+
\overline A_s^\rho
\right)
\left[
\epsilon_c^2+\left(\beta_p\tau+B_\tau\right)^2
\right].
$$

This is the most useful practical form of (H5) in the current note: once the constants in Lemma 2 and Lemma 3 are fixed, recapture reduces to a checkable algebraic inequality.

For a fixed admissible crossing subclass, the same inequality is made class-uniform by replacing
$$
V_0\mapsto V_{\max},
\qquad
\beta_p\mapsto \beta_{p,\max},
$$
and taking the common remainder constant
$$
C_p=C_p(V_{\max},c_f,a_\ast).
$$
That replacement is exactly what the proposition below implements.

One can simplify further on a short window where the shell-error term is dominated by the linear partner term. If
$$
B_\tau\le \beta_p\tau,
$$
then
$$
\Delta V_p(\tau)
\ge
\frac{\kappa\epsilon^2\,\tau}{
\epsilon_c^2+4\beta_p^2\tau^2
},
$$
and therefore a sufficient short-window recapture condition is
$$
V_0<
\tau
\left[
\frac{\kappa\epsilon^2}{
\epsilon_c^2+4\beta_p^2\tau^2
}
-
\overline A_s^\rho
\right].
$$

Since
$$
B_\tau=c_f C_p(\tau^2+\eta),
$$
the dominance condition $B_\tau\le \beta_p\tau$ is itself a quadratic inequality in $\tau$. A nonempty admissible interval exists whenever
$$
\eta\le \frac{\beta_p^2}{4c_f^2 C_p^2},
$$
provided the corresponding roots lie inside the local validity window of Lemmas 1-3.

For class-uniform use on $\mathcal{K}^{\mathrm{cross}}_{\eta,\epsilon_c}$, the corresponding sufficient condition is obtained conservatively by replacing
$$
\beta_p\mapsto \beta_{p,\min},
$$
since the linear partner term must dominate uniformly for every admissible history. The explicit proposition below avoids mixing $\beta_{p,\min}$ and $\beta_{p,\max}$ in a single window estimate by choosing $\tau_\epsilon$ directly from $\beta_{p,\max}$ and then bounding
$$
\beta_p\tau_\epsilon+B_{\tau_\epsilon}
$$
in one step.

> **Proposition (Explicit short-window recapture regime).**
> On a fixed admissible crossing subclass $\mathcal{K}^{\mathrm{cross}}_{\eta,\epsilon_c}$, choose the class-uniform window
> $$
> \tau_\epsilon\equiv \frac{\epsilon_c}{2\beta_{p,\max}}.
> $$
> Assume
> $$
> \tau_\epsilon\le \tau_1,
> \qquad
> \eta\le \frac{\epsilon_c}{4c_f C_p},
> \qquad
> \epsilon_c\le \frac{\beta_{p,\max}^2}{c_f C_p}.
> $$
> Then
> $$
> B_{\tau_\epsilon}
> =
> c_f C_p\left(\tau_\epsilon^2+\eta\right)
> \le
> \frac{\epsilon_c}{2}
> $$
> and since
> $$
> \beta_p\tau_\epsilon+B_{\tau_\epsilon}
> \le
> \beta_{p,\max}\tau_\epsilon+\frac{\epsilon_c}{2}
> =
> \epsilon_c,
> $$
> one obtains
> $$
> \Delta V_p(\tau_\epsilon)
> \ge
> \frac{\kappa\epsilon^2}{4\beta_{p,\max}\epsilon_c}.
> $$
> Therefore a class-uniform sufficient recapture condition is
> $$
> V_{\max}<
> \frac{\kappa\epsilon^2}{4\beta_{p,\max}\epsilon_c}
> -
> \frac{\overline A_s^\rho\,\epsilon_c}{2\beta_{p,\max}},
> $$
> or equivalently
> $$
> \kappa\epsilon^2
> >
> 4\beta_{p,\max}V_{\max}\,\epsilon_c
> +
> 2\overline A_s^\rho\,\epsilon_c^2.
> $$
> If, in addition,
> $$
> \tau_{\mathrm{sep},\max}\le \tau_\epsilon\le \tau_\rho,
> \qquad
> \tau_{\mathrm{sep},\max}\equiv \frac{2\eta}{\sigma_{\min}},
> $$
> then Lemma 2 yields the delayed-window refinement
> $$
> V_{\max}<
> \frac{\kappa\epsilon^2}{4\beta_{p,\max}\epsilon_c}
> -
> \overline A_s^\rho\,\tau_{\mathrm{sep},\max}
> -
> \overline A_{s,\mathrm{geom}}^\rho\,(\tau_\epsilon-\tau_{\mathrm{sep},\max}).
> $$

This proposition is the first genuinely explicit realization of (H5) in the note. It converts the abstract impulse inequality into a concrete dual-mollified parameter regime.

Proof sketch:

1. Lemma 1 gives the class-uniform post-crossing monotonicity
   $$
   w(t)<0
   \qquad
   \text{for }0<t\le \tau_1.
   $$
2. Lemma 2 supplies the full-window self-drive bound
   $$
   A_s^\rho(t)\le \overline A_s^\rho
   \qquad
   \text{for }0\le t\le \tau_1,
   $$
   with the delayed-window refinement available once
   $$
   \tau_{\mathrm{sep},\max}\le t\le \tau_\rho.
   $$
3. Lemma 3 gives the class-uniform partner lower bound with
   $$
   \beta_p\le \beta_{p,\max},
   \qquad
   B_\tau\le c_f C_p(\tau^2+\eta).
   $$
   At
   $$
   \tau_\epsilon=\frac{\epsilon_c}{2\beta_{p,\max}},
   $$
   the stated assumptions force
   $$
   \beta_p\tau_\epsilon+B_{\tau_\epsilon}\le \epsilon_c,
   $$
   so the denominator of the partner integrand is bounded above by
   $$
   \epsilon_c^2+\epsilon_c^2=2\epsilon_c^2.
   $$
   The rectangle-area lower bound therefore gives
   $$
   \Delta V_p(\tau_\epsilon)\ge \frac{\kappa\epsilon^2}{4\beta_{p,\max}\epsilon_c}.
   $$
4. The stated algebraic inequality is exactly the condition that this class-uniform inward partner impulse beats the class-uniform outward self-drive loss by time $\tau_\epsilon$.
5. Lemma 4 then gives a zero of the radial speed on $[0,\tau_\epsilon]$, proving local post-crossing recapture for every history in the subclass.

In the joint short-window regime
$$
\eta=\mathcal{O}(\epsilon_c),
\qquad
\epsilon_c\downarrow 0,
$$
the right-hand side is
$$
\mathcal{O}(\epsilon_c),
$$
so any fixed positive coupling scale $\kappa\epsilon^2$ eventually dominates it. Subject to the local validity constraints from Lemmas 1-3, this exhibits a nonempty dual-mollified parameter regime in which local post-crossing recapture follows directly from the explicit inequality.

### Bottleneck and proof order

The genuine bottleneck is **Lemma 4 together with (H5)**. The sorting-map and caustic-isolation pieces are structural consequences of the delayed geometry; the difficult question is whether the constants can be arranged so that the integrated partner impulse actually beats the crossing speed on a nonempty class of histories.

The recommended proof order is:

1. prove Lemma 1 and Lemma 2 first, to lock down the delayed geometry and self-drive bound,
2. prove Lemma 3 next, to extract the explicit partner lower bound,
3. then prove Lemma 4 as the recapture step,
4. and only after that use the local recapture theorem as input toward a proof that $Q_\eta$ is well defined on a nontrivial class.

### Envelope-level sufficient condition

One can make the corrected proposition more operational by expressing it directly in terms of post-crossing envelope constants.

Suppose there is a nonempty outbound post-crossing class
$$
\mathcal{O}^{\mathrm{cross}}_{x_\ast,\eta}
$$
and a time window $[0,\tau_{\mathrm{env}}]$ such that every forward trajectory from $\phi\in\mathcal{O}^{\mathrm{cross}}_{x_\ast,\eta}$ satisfies
$$
A_p^{\rho}(t)\ge \underline A_p^{\rho},
\qquad
A_s^{\rho}(t)\le \overline A_s^{\rho}
\qquad
\text{for }0\le t\le \tau_{\mathrm{env}}.
$$

Define the corrected radial braking margin
$$
\beta_{\mathrm{env}}^{\rho}
\equiv
\underline A_p^{\rho}-\overline A_s^{\rho}.
$$

If
$$
\beta_{\mathrm{env}}^{\rho}>0
\qquad
\text{and}
\qquad
\beta_{\mathrm{env}}^{\rho}\tau_{\mathrm{env}}
\ge
\sup_{\phi\in\mathcal{O}^{\mathrm{cross}}_{x_\ast,\eta}}V_\phi(0),
$$
then every trajectory in $\mathcal{O}^{\mathrm{cross}}_{x_\ast,\eta}$ turns around by time $\tau_{\mathrm{env}}$.

This is the corrected sufficient-condition template. It reduces origin-crossing recapture to two concrete estimates:

- a uniform lower bound for inward partner braking on the post-crossing branch,
- and a uniform upper bound for the outward self-hit drive.

The partner term still admits a simple envelope estimate. If along the relevant outbound interval there is at least one active partner root and
$$
\rho(t)\le \rho_{\max},
\qquad
|J_p|\ge \nu,
$$
then
$$
A_p^{\rho}(t)
\ge
\frac{\kappa\epsilon^2}{(2\rho_{\max})^2\,\nu}
=
\frac{\kappa\epsilon^2}{4\rho_{\max}^2\nu}.
$$

Near the origin crossing one expects a stronger version of this estimate. The partner source sits at separation $2\rho(t)$, whereas the self roots selected by the sorting map come from much earlier radii in the sub-field-speed past. So on the initial outbound window the partner term carries a strong near-field $1/\rho(t)^2$ advantage, while the self term is controlled by a larger historical separation and a Jacobian bounded away from the caustic.

The linearized partner-root geometry makes this explicit. If the signed crossing speed is approximated by
$$
\dot x(0)\approx -V_0,
\qquad
V_0>c_f,
$$
then the delayed partner root satisfies
$$
t_p
=
-\left(\frac{V_0-c_f}{V_0+c_f}\right)t,
$$
and hence
$$
r_p(t)
=
c_f(t-t_p)
=
\left(\frac{2c_fV_0}{V_0+c_f}\right)t.
$$

Without the core mollifier this gives the singular scaling
$$
A_p^{\rho}(t)\sim \frac{1}{t^2},
$$
which produces an infinite braking impulse at the crossing. The dual-mollified theorem therefore relies essentially on $\epsilon_c>0$: with the replacement
$$
\frac{1}{r_p(t)^2}
\leadsto
\frac{1}{r_p(t)^2+\epsilon_c^2},
$$
the partner term remains large but finite and can be compared meaningfully against the bounded self drive.

So the genuinely difficult part of the corrected recapture problem is not partner braking. It is proving that the post-crossing self drive remains bounded strongly enough that
$$
\overline A_s^{\rho}
<
\underline A_p^{\rho}
$$
on a nonempty outbound window.

There is also a Goldilocks condition hidden in this picture. The crossing speed must be:

- large enough that the post-crossing branch stays on the descending side of the sorting map and the caustic remains behind it,
- but small enough that the integrated partner-dominance margin can erase the outward radial speed before the particle exits the initial dominance window.

Showing that this overlap is nonempty is part of the remaining theorem burden.

### Envelope-level escape criterion

The same envelope logic also yields a one-sided no-go template for the corrected post-crossing problem. If the available inward partner braking is uniformly too small compared with the outward self drive, then recapture cannot occur within the controlled outbound window.

Suppose there is a nonempty outbound post-crossing class
$$
\mathcal{O}^{\mathrm{cross}}_{x_\ast,\eta}
$$
and a time window $[0,\tau_{\mathrm{esc}}]$ such that every forward trajectory from $\phi\in\mathcal{O}^{\mathrm{cross}}_{x_\ast,\eta}$ satisfies
$$
A_p^{\rho}(t)\le \overline A_p^{\rho},
\qquad
A_s^{\rho}(t)\ge \underline A_s^{\rho}
\qquad
\text{for }0\le t\le \tau_{\mathrm{esc}}.
$$

Define the corrected radial braking ceiling
$$
\beta_{\mathrm{esc}}^{\rho}
\equiv
\overline A_p^{\rho}-\underline A_s^{\rho}.
$$

If
$$
\beta_{\mathrm{esc}}^{\rho}\le 0,
$$
then the outward radial speed cannot decrease on that window.

More generally, if
$$
\beta_{\mathrm{esc}}^{\rho}>0
\qquad
\text{but}
\qquad
\beta_{\mathrm{esc}}^{\rho}\tau_{\mathrm{esc}}
<
\inf_{\phi\in\mathcal{O}^{\mathrm{cross}}_{x_\ast,\eta}}V_\phi(0),
$$
then no trajectory in $\mathcal{O}^{\mathrm{cross}}_{x_\ast,\eta}$ can turn around during $[0,\tau_{\mathrm{esc}}]$.

This does not by itself prove escape to infinity. What it does prove is the complementary fact needed by the theorem program: within the controlled post-crossing window, the available total inward braking impulse is too small to erase the outgoing radial speed.

The ideal long-form no-go theorem would strengthen this finite-window criterion into a global one by showing that
$$
\int_0^\infty
\Big(
A_p^{\rho}(s)-A_s^{\rho}(s)
\Big)\,ds
<
V_\phi(0)
$$
for an explicit outbound class. That would rule out any turning point at any later time and would show that the outward branch never re-enters the section.

If even this strong recapture proposition cannot be supported on any nonempty outbound class, then the invariant-set program should stop there: the return maps $Q_\eta$ and $P_\eta$ are not defined on a robust domain, and no fixed-point theorem will rescue the model.

## Global Existence via Arzela-Ascoli

The local origin-crossing theorem establishes only the first nontrivial step of the bounded-motion program: a post-crossing branch can be forced to turn around on a controlled initial window. The next layer is global and topological. One wants to use that local recapture mechanism to define a nonempty return class, prove precompactness of the returned histories, and then search for a fixed point of the full history-space map
$$
P_\eta:\Sigma^-_{x_\ast,\eta}\to\Sigma^-_{x_\ast,\eta}.
$$

The correct object to target is therefore not a continuous one-parameter family of equal-amplitude cycles, but an isolated fixed point of the causal-delay return map on a precompact history envelope. In the present delayed setting, the natural global candidate is an isolated limit cycle of $P_\eta$, not a Hamiltonian family parameterized by an instantaneous mechanical energy.

### Conditional invariant structures

The local recapture proof does not yet provide a global invariant. The next theorem layer can draw on several different kinds of structure, which should be kept logically separate.

- **Conditional exact history functional.**
  If the dual mollification $(\eta,\epsilon_c)$ is introduced at the action level in a way that preserves time-translation symmetry of the delayed kernel, then one may reasonably look for an exact nonlocal history functional
  $$
  E_{\mathrm{tot}}^{(\eta,\epsilon_c)}
  $$
  that is constant along dual-mollified trajectories. In the current note this should be treated as conditional, not as established fact.
- **Cycle-balance law.**
  Even without an exact invariant, the mechanical part of the motion can still satisfy a cycle-to-cycle balance identity of the form
  $$
  \Delta H_{\mathrm{mech}}
  =
  \int_0^T
  \Big(
  P_{\mathrm{partner}}(t)
  +
  P_{\mathrm{self}}(t)
  \Big)\,dt,
  $$
  where the right-hand side measures net delayed pumping versus delayed braking over one excursion. This is the correct structure if the eventual periodic state is an isolated limit cycle rather than a conservative orbit family.
- **Boundedness functionals.**
  The local theorem already supplies the ingredients for coarse boundedness estimates: uniform position, speed, acceleration, Jacobian, and memory-depth bounds on an admissible history class. These are weaker than conserved quantities, but they are the natural input for a compactness theorem on returned histories.

The safest current stance is therefore:

- do not assert an exact conserved history functional unless the dual mollification is explicitly tied to an action-level regularization;
- do use the local recapture estimates to build boundedness and compactness results for the return map;
- and treat any exact energy statement as a later theorem target rather than as a premise of the present fixed-point program.

### Next theorem ladder

With that distinction in place, the global existence program can be organized as follows.

1. **Nonempty recapture domain for $Q_\eta$.**
   Use the local origin-crossing recapture theorem to show that a nonempty outbound crossing class returns to the inbound section, so that
   $$
   Q_\eta:\Sigma^+_{x_\ast,\eta}\to\Sigma^-_{x_\ast,\eta}
   $$
   is defined on a robust subclass.
2. **Precompactness of returned histories.**
   Use the class-uniform bounds
   $$
   |\dot\phi|\le u_{\max},
   \qquad
   |\ddot\phi|\le a_{\max},
   \qquad
   \tau_{\max}(\phi)\le h
   $$
   to show that returned histories form an equibounded, equicontinuous family in $C^1([-h,0])$. This is the Arzela-Ascoli step.
3. **Invariant subset construction.**
   Find a closed subset
   $$
   \mathcal{E}^\ast_{x_\ast,\eta}\subseteq \Sigma^-_{x_\ast,\eta}
   $$
   such that
   $$
   P_\eta(\mathcal{E}^\ast_{x_\ast,\eta})
   \subseteq
   \mathcal{E}^\ast_{x_\ast,\eta}.
   $$
   At first pass, this set should be built from upper bounds only; lower bounds such as minimum speed or minimum return time can be imposed later if they are recovered a posteriori.
4. **Continuity and compactness of $P_\eta$.**
   Verify that on the chosen history topology, the dual-mollified return map is continuous and maps the invariant set into a precompact subset of itself.
5. **Fixed point for $P_\eta$.**
   Once the preceding items hold on a suitable closed convex set, a Schauder-type argument becomes available and yields
   $$
   \phi^\ast_\eta=P_\eta(\phi^\ast_\eta).
   $$

This is the clean global theorem ladder suggested by the local proof: first define the return map on a nonempty domain, then prove precompactness, then construct an invariant set, and only then invoke a fixed-point theorem.

### Precompactness target

The candidate envelope $\mathcal{E}_{x_\ast,\eta}$ introduced earlier already contains the correct precompactness ingredients:

- uniform position bounds on $[-h,0]$,
- uniform speed bounds on $[-h,0]$,
- uniform acceleration bounds on $[-h,0]$,
- and a fixed memory horizon $h$.

For a sequence of returned histories
$$
\phi_n=P_\eta(\psi_n),
\qquad
\psi_n\in \mathcal{E}_{x_\ast,\eta},
$$
these conditions imply:

- equiboundedness of $\phi_n$ in $C^0([-h,0])$,
- equicontinuity of $\phi_n$ from the speed bound,
- equicontinuity of $\dot\phi_n$ from the acceleration bound.

Thus the natural next compactness target is:

> **Target Proposition (Precompact Return Histories).**
> On a dual-mollified admissible crossing class for which the one-cycle return map is well defined and the class-uniform position, speed, acceleration, and memory-depth bounds hold, the image
> $$
> P_\eta(\mathcal{E}_{x_\ast,\eta})
> $$
> is precompact in $C^1([-h,0])$.

This proposition is weaker than invariance, but it is the right bridge from the local recapture theorem to a later fixed-point argument.

> **Proposition (Precompactness of the Return Image).**
> Fix a dual-mollified admissible envelope
> $$
> \mathcal{E}_{x_\ast,\eta}
> \subset
> \Sigma^-_{x_\ast,\eta}
> $$
> such that:
> 1. for every
>    $$
>    \psi\in\mathcal{E}_{x_\ast,\eta},
>    $$
>    the one-cycle return time $T(\psi)$ is well defined and satisfies
>    $$
>    T(\psi)\in[T_{\min},T_{\max}],
>    $$
> 2. the returned history
>    $$
>    \phi=P_\eta(\psi)
>    $$
>    satisfies the uniform bounds
>    $$
>    x_{\min}\le \phi(\theta)\le x_{\max},
>    \qquad
>    |\dot\phi(\theta)|\le u_{\max},
>    \qquad
>    |\ddot\phi(\theta)|\le a_{\max},
>    \qquad
>    \theta\in[-h,0],
>    $$
>    and
>    $$
>    \tau_{\max}(\phi)\le h.
>    $$
>
> Then the image
> $$
> P_\eta(\mathcal{E}_{x_\ast,\eta})
> $$
> is precompact in $C^1([-h,0])$.

Proof.
Take any sequence
$$
\phi_n=P_\eta(\psi_n),
\qquad
\psi_n\in\mathcal{E}_{x_\ast,\eta}.
$$
By the returned-history bounds,
$$
|\phi_n(\theta)|\le \max\{|x_{\min}|,|x_{\max}|\}
\qquad
\text{for every }\theta\in[-h,0],
$$
so the family $\{\phi_n\}$ is uniformly bounded in $C^0([-h,0])$. Likewise,
$$
|\dot\phi_n(\theta)|\le u_{\max}
\qquad
\text{for every }\theta\in[-h,0],
$$
and therefore
$$
|\phi_n(\theta_1)-\phi_n(\theta_2)|
\le
u_{\max}|\theta_1-\theta_2|.
$$
Hence $\{\phi_n\}$ is equicontinuous.

The acceleration bound gives
$$
|\ddot\phi_n(\theta)|\le a_{\max}
\qquad
\text{for every }\theta\in[-h,0],
$$
so
$$
|\dot\phi_n(\theta_1)-\dot\phi_n(\theta_2)|
\le
a_{\max}|\theta_1-\theta_2|.
$$
Thus $\{\dot\phi_n\}$ is both uniformly bounded and equicontinuous on $[-h,0]$.

Arzela-Ascoli therefore yields a subsequence, still denoted $\phi_n$ for brevity, such that
$$
\phi_n\to \phi_\ast
\qquad
\text{and}
\qquad
\dot\phi_n\to v_\ast
$$
uniformly on $[-h,0]$. Since
$$
\phi_n(\theta)-\phi_n(0)=\int_0^\theta \dot\phi_n(s)\,ds,
$$
passing to the limit gives
$$
\phi_\ast(\theta)-\phi_\ast(0)=\int_0^\theta v_\ast(s)\,ds,
$$
so $\phi_\ast\in C^1([-h,0])$ and
$$
\dot\phi_\ast=v_\ast.
$$
Therefore the subsequence converges in the $C^1$ norm, proving that
$$
P_\eta(\mathcal{E}_{x_\ast,\eta})
$$
is precompact in $C^1([-h,0])$.

This proposition deliberately stops short of invariance. It says only that once the return map is defined on a uniformly controlled envelope, its image cannot spread out arbitrarily in history space. The remaining global burden is then to combine this precompactness with a closed invariant set and continuity of $P_\eta$.

### Continuity target for the return map

Precompactness alone is not enough for a fixed-point theorem. The next ingredient is continuity of the full history return map on a tame class where the delayed root geometry does not bifurcate and the section crossing remains transverse.

> **Target Proposition (Continuity of the Tame Return Map).**
> Let
> $$
> \mathcal{E}^{\mathrm{tame}}_{x_\ast,\eta}
> \subseteq
> \mathcal{E}_{x_\ast,\eta}
> $$
> be a dual-mollified inbound history class such that:
> 1. each
>    $$
>    \psi\in \mathcal{E}^{\mathrm{tame}}_{x_\ast,\eta}
>    $$
>    admits a unique forward continuation on
>    $$
>    [0,T_{\max}],
>    $$
>    with the same class-uniform position, speed, acceleration, Jacobian, and memory-depth bounds used above;
> 2. on this forward tube, the dual-mollified vector field is locally Lipschitz as a map of the stored history segment in the $C^1$ topology;
> 3. the active delayed roots on the tube remain finite in number and persist continuously with the history, with no root creation, root collision, or Jacobian loss of transversality;
> 4. the first return to the inbound section is uniformly transverse:
>    $$
>    x(T(\psi);\psi)=x_\ast,
>    \qquad
>    \dot x(T(\psi);\psi)\le -u_{\mathrm{sec}}<0
>    $$
>    for a common constant
>    $$
>    u_{\mathrm{sec}}>0.
>    $$
>
> Then
> $$
> P_\eta:\mathcal{E}^{\mathrm{tame}}_{x_\ast,\eta}\to C^1([-h,0])
> $$
> is continuous.

Proof sketch.
Take a convergent sequence
$$
\psi_n\to \psi
\qquad
\text{in }C^1([-h,0]).
$$
By the local Lipschitz hypothesis on the dual-mollified vector field and the class-uniform forward tube bounds, standard continuous-dependence estimates for functional differential equations give convergence of the corresponding solutions on every compact interval inside
$$
[0,T_{\max}]:
$$
$$
x_n\to x,
\qquad
\dot x_n\to \dot x
$$
uniformly on $[0,T_{\max}]$.

The root-persistence hypothesis ensures that, along the tube, the delayed branch structure and Jacobian denominators vary continuously with the history and do not develop singular branch changes. Hence the forward solution map is continuous on the entire tame class rather than only on a branch-restricted fragment.

Now consider the section function
$$
G(t,\psi)\equiv x(t;\psi)-x_\ast.
$$
At the return time
$$
t=T(\psi)
$$
one has
$$
G(T(\psi),\psi)=0,
\qquad
\partial_t G(T(\psi),\psi)=\dot x(T(\psi);\psi)\le -u_{\mathrm{sec}}<0.
$$
Therefore the return crossing is isolated and uniformly transverse. By the implicit-function theorem for a transverse zero of a continuous family, the first return time depends continuously on the history:
$$
T(\psi_n)\to T(\psi).
$$

Finally, for each
$$
\theta\in[-h,0],
$$
the returned histories satisfy
$$
P_\eta(\psi_n)(\theta)
=
x_n(T(\psi_n)+\theta).
$$
Uniform convergence of
$$
x_n,\dot x_n
$$
on $[0,T_{\max}]$ together with convergence of the return times implies
$$
P_\eta(\psi_n)\to P_\eta(\psi)
$$
in $C^1([-h,0])$. This proves continuity of $P_\eta$ on the tame class.

This proposition should still be read as conditional. Its role is to isolate the exact hypotheses under which the global fixed-point program becomes viable: continuous dependence of the forward delayed dynamics, persistence of the active root structure, and a uniformly transverse return section.

### Convexity caution

The eventual fixed-point set should not be chosen too aggressively at first pass. Some natural-looking lower bounds can destroy convexity:

- a minimum inbound speed,
- a minimum return time,
- or a lower bound on excursion amplitude.

For a first Schauder-style theorem, the safer route is:

- impose closed upper bounds that are visibly convex in history space,
- prove that the return map lands inside that convex envelope,
- and recover sharper lower bounds later for the resulting fixed point or invariant subset.

### First convex invariant-envelope candidate

Motivated by that caution, define the first global candidate set using only affine and supremum-type upper bounds. Fix constants
$$
x_\ast\in(0,X_{\max}),
\qquad
U_{\max}>0,
\qquad
A_{\max}>0,
\qquad
h>0,
$$
and consider the subset
$$
\mathcal{C}_{x_\ast,\eta}
\subset
\Sigma^-_{x_\ast,\eta}
$$
consisting of histories $\phi\in C^1([-h,0])$ such that:

- section anchoring:
  $$
  \phi(0)=x_\ast,
  $$
- inbound sign at the section:
  $$
  \dot\phi(0)\le 0,
  $$
- upper position envelope:
  $$
  0\le \phi(\theta)\le X_{\max}
  \qquad
  \text{for }\theta\in[-h,0],
  $$
- uniform speed bound:
  $$
  |\dot\phi(\theta)|\le U_{\max}
  \qquad
  \text{for }\theta\in[-h,0],
  $$
- uniform acceleration bound:
  $$
  |\ddot\phi(\theta)|\le A_{\max}
  \qquad
  \text{for }\theta\in[-h,0],
  $$

Choose the history horizon a priori so that
$$
h\ge \frac{2X_{\max}}{c_f}.
$$

This set is closed in the $C^1$ topology, and the bounds above are convex under affine interpolation of histories. In particular, one does not impose:

- a minimum inbound speed,
- a minimum return time,
- or a minimum excursion amplitude.

Those are precisely the types of lower bounds that can puncture convexity and should therefore be postponed until after a first invariant-set theorem is available.

The horizon condition is handled externally rather than as a defining nonlinear constraint. Indeed, if
$$
0\le \phi(\theta)\le X_{\max}
$$
on the stored history, then the largest possible partner or self chord on that interval is at most
$$
2X_{\max},
$$
so the causal relation implies
$$
\tau_{\max}(\phi)\le \frac{2X_{\max}}{c_f}\le h.
$$
Thus memory closure is automatic on this envelope once the horizon is chosen large enough, and convexity is not burdened by an additional nonlinear delay constraint.

The corresponding global target is then:

> **Target Proposition (Convex Invariant Envelope).**
> There exist class parameters
> $$
> X_{\max},
> \qquad
> U_{\max},
> \qquad
> A_{\max},
> \qquad
> h
> $$
> and a tame inbound subclass
> $$
> \mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}
> \subseteq
> \mathcal{C}_{x_\ast,\eta}
> $$
> such that:
> 1. the return map $P_\eta$ is well defined on $\mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}$,
> 2. the continuity proposition above applies on that class,
> 3. and
>    $$
>    P_\eta\!\big(\mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}\big)
>    \subseteq
>    \mathcal{C}_{x_\ast,\eta}.
>    $$

If this target can be proved and the image is precompact in $C^1([-h,0])$, then the fixed-point program reduces to standard topological machinery on a closed convex envelope rather than on a heavily punctured section set.

So the immediate global target is not yet "stable breather with fixed amplitude," but rather:

- a well-defined return map on a nonempty class,
- precompactness of its image,
- and existence of at least one fixed point of the resulting dual-mollified history map.

### Schauder route

The three global propositions above are designed to feed a single topological conclusion. The intended fixed-point route is:

1. prove that the local recapture theorem and the tame continuation hypotheses make
   $$
   P_\eta
   $$
   well defined on a nonempty inbound class;
2. prove the continuity proposition on a tame subclass
   $$
   \mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta};
   $$
3. prove the precompactness proposition for the return image
   $$
   P_\eta\!\big(\mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}\big);
   $$
4. prove the convex-envelope target
   $$
   P_\eta\!\big(\mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}\big)
   \subseteq
   \mathcal{C}_{x_\ast,\eta}.
   $$

Once these items hold, the remaining step is standard:

> **Target Theorem (Schauder Fixed Point Route).**
> Suppose there exists a nonempty tame inbound subclass
> $$
> \mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}
> \subseteq
> \mathcal{C}_{x_\ast,\eta}
> $$
> such that:
> 1. the return map
>    $$
>    P_\eta
>    $$
>    is well defined and continuous on
>    $$
>    \mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta},
>    $$
> 2. its image is precompact in $C^1([-h,0])$,
> 3. and
>    $$
>    P_\eta\!\big(\mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}\big)
>    \subseteq
>    \mathcal{C}_{x_\ast,\eta},
>    $$
>    where
>    $$
>    \mathcal{C}_{x_\ast,\eta}
>    $$
>    is closed and convex in the $C^1$ topology.
>
> Then the closure
> $$
> \overline{
> P_\eta\!\big(\mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}\big)
> }
> $$
> is compact in $C^1([-h,0])$, lies inside
> $$
> \mathcal{C}_{x_\ast,\eta},
> $$
> and supports a Schauder fixed-point argument for a fixed point of the dual-mollified return map.

At this stage, the remaining nontrivial issue is not the fixed-point theorem itself. It is the construction of a tame class on which all three inputs hold simultaneously: well-definedness, continuity, and invariant-envelope control. That is the precise global bottleneck after the local recapture theorem.

### Full-cycle invariant-envelope target

The next theorem burden can now be stated without ambiguity. One does not yet need a fixed point; one first needs a full-cycle map that lands back inside the tame convex envelope.

> **Target Theorem (Full-Cycle Well-Definedness and Envelope Return).**
> Fix a dual-mollified tame inbound subclass
> $$
> \mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}
> \subseteq
> \mathcal{C}_{x_\ast,\eta}.
> $$
> Assume the local origin-crossing recapture theorem applies uniformly to every collapse phase launched from this class. Suppose moreover that there exist class constants
> $$
> X_{\max},
> \qquad
> U_{\max},
> \qquad
> A_{\max},
> \qquad
> T_{\max}
> $$
> such that every trajectory issued from
> $$
> \psi\in\mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}
> $$
> satisfies:
> 1. **bounded excursion:**
>    $$
>    0\le x(t)\le X_{\max}
>    \qquad
>    \text{for }0\le t\le T(\psi),
>    $$
> 2. **bounded speed and acceleration:**
>    $$
>    |\dot x(t)|\le U_{\max},
>    \qquad
>    |\ddot x(t)|\le A_{\max}
>    \qquad
>    \text{for }0\le t\le T(\psi),
>    $$
> 3. **section return in bounded time:**
>    the first inbound return time exists and obeys
>    $$
>    0<T(\psi)\le T_{\max},
>    $$
> 4. **bounded return speed:**
>    $$
>    -\dot x(T(\psi))\le U_{\max},
>    $$
> 5. **root control on the returned history:**
>    the translated history segment
>    $$
>    x_{T(\psi)}
>    $$
>    retains the same Jacobian and branch-count bounds used to define tameness.
>
> Then
> $$
> P_\eta(\psi)\in \mathcal{C}_{x_\ast,\eta}
> \qquad
> \text{for every }\psi\in \mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta},
> $$
> and hence
> $$
> P_\eta\!\big(\mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}\big)
> \subseteq
> \mathcal{C}_{x_\ast,\eta}.
> $$

This is the exact bridge from the local recapture theorem to the convex-envelope proposition. The point is that the global invariant-set problem is now reduced to four explicit cycle estimates:

- turn around after the crossing,
- stay inside the position envelope during the outward and return excursion,
- re-enter the section in bounded time,
- and do so with bounded returning speed while preserving root control on the stored history.

The first of these is already supplied locally by the recapture theorem. The next serious analytic target is therefore to propagate that local control through the rest of the cycle strongly enough to recover the same envelope at the section return.

### Cycle-estimate ladder

The full-cycle theorem above naturally decomposes into the following proof steps.

1. **Collapse-to-crossing control.**
   Starting from an inbound section history, show that the trajectory reaches the origin-crossing regime without leaving the tame tube.
2. **Post-crossing recapture.**
   Apply the local origin-crossing theorem to obtain a turning point on a class-uniform window.
3. **Turn-to-section return.**
   Show that after the turning point, partner attraction and the bounded delayed geometry force a return to
   $$
   x=x_\ast
   $$
   before any escape beyond
   $$
   X_{\max}.
   $$
4. **Return-speed bound.**
   Estimate the inbound speed at the section crossing and show it remains inside the global envelope
   $$
   -\dot x(T(\psi))\le U_{\max}.
   $$
5. **Returned-history tameness.**
   Prove that the history segment
   $$
   x_{T(\psi)}
   $$
   inherits the same acceleration, Jacobian, and branch-count bounds required by the tame class.

Only after these five items are in hand does the convex-envelope target become a theorem rather than a program.

### Collapse-to-crossing target

The next concrete theorem should attack Step 1 of the cycle ladder directly. Its role is to connect tame inbound section data to the already-audited local post-crossing recapture theorem.

> **Target Theorem (Collapse-to-Crossing Control).**
> Fix a dual-mollified tame inbound subclass
> $$
> \mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}
> \subseteq
> \mathcal{C}_{x_\ast,\eta}.
> $$
> Assume there exist class constants
> $$
> 0<V_{\min}\le V_{\max},
> \qquad
> A_{\max}>0,
> \qquad
> \nu>0,
> \qquad
> \tau_{\mathrm{cross},\max}>0
> $$
> such that every trajectory launched from
> $$
> \psi\in\mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}
> $$
> satisfies, on its inbound pre-crossing leg:
> 1. **finite-time crossing:**
>    there exists a first time
>    $$
>    t_{\mathrm{cross}}(\psi)\in(0,\tau_{\mathrm{cross},\max}]
>    $$
>    with
>    $$
>    x(t_{\mathrm{cross}}(\psi);\psi)=0;
>    $$
> 2. **crossing-speed window:**
>    the signed crossing speed obeys
>    $$
>    -V_{\max}\le \dot x(t_{\mathrm{cross}}(\psi);\psi)\le -V_{\min}<-c_f;
>    $$
> 3. **tube preservation before crossing:**
>    $$
>    0\le x(t;\psi)\le X_{\max},
>    \qquad
>    |\dot x(t;\psi)|\le U_{\max},
>    \qquad
>    |\ddot x(t;\psi)|\le A_{\max}
>    $$
>    for
>    $$
>    0\le t\le t_{\mathrm{cross}}(\psi);
>    $$
> 4. **pre-crossing transversality:**
>    all active roots on the pre-crossing leg satisfy the same Jacobian lower bound
>    $$
>    |J_p|\ge \nu,
>    \qquad
>    |J_s|\ge \nu.
>    $$
>
> Then the translated crossing history belongs to a uniform admissible crossing subclass of the type used by the local origin-crossing recapture theorem. In particular, the post-crossing local recapture theorem applies immediately after the crossing.

This theorem is the missing hinge between the inbound section map and the local post-crossing analysis. It says: if tame inbound histories reach the origin in finite time with a controlled super-field-speed crossing and without losing the tube bounds, then the entire local recapture machine developed earlier becomes available automatically.

### Collapse-to-crossing lemma ladder

The intended proof order for the collapse phase is:

1. **Inbound partner-dominance lemma.**
   Produce a class-uniform lower bound on inward partner acceleration on the pre-crossing leg.
2. **Finite-time crossing lemma.**
   Use the inward acceleration and inbound section sign to show that
   $$
   x(t)
   $$
   reaches zero in bounded time.
3. **Crossing-speed bounds.**
   Estimate the speed gain accumulated before the crossing and show the resulting crossing speed lies inside
   $$
   [V_{\min},V_{\max}].
   $$
4. **Pre-crossing tube preservation.**
   Verify that position, speed, and acceleration remain inside the tame envelope up to
   $$
   t_{\mathrm{cross}}.
   $$
5. **Crossing-history admissibility.**
   Show that the translated history at
   $$
   t_{\mathrm{cross}}
   $$
   satisfies the sorting-map, Jacobian, and branch-count hypotheses needed by the local origin-crossing theorem.

Among these, the most delicate step is not finite-time arrival itself, but the quantitative crossing-speed window. The local post-crossing theorem needs the crossing to land in the Goldilocks regime:

- fast enough that the sorting map stays on the descending side and the caustic remains behind the trajectory,
- but not so fast that the integrated post-crossing partner impulse can no longer erase the outward radial speed.

So the collapse-to-crossing theorem is not merely a reachability statement. It is a controlled entry theorem into the local recapture regime.

**Lemma 5: Inbound partner-dominance lower bound.**
Assume the pre-crossing leg of a tame inbound trajectory satisfies:

- right exterior inbound geometry,
  $$
  0\le x(t)\le X_{\max},
  \qquad
  \dot x(t)\le 0,
  $$
- at least one active partner branch for each
  $$
  t\in[0,t_{\mathrm{cross}}],
  $$
- the speed bound
  $$
  |\dot x(t)|\le U_{\max},
  $$
- and the partner Jacobian transversality bound
  $$
  |J_p(t;t_p)|\ge \nu
  $$
  on every active partner root.

Then the partner contribution to the inward acceleration obeys the class-uniform lower bound
$$
A_p(t)\ge \underline A_p^{\mathrm{in}}
\equiv
\frac{\kappa\epsilon^2}{
\left(4X_{\max}^2+\epsilon_c^2\right)
\left(1+\frac{U_{\max}}{c_f}\right)
}.
$$
Equivalently, the partner acceleration satisfies
$$
a_p(t)=-A_p(t)\le -\underline A_p^{\mathrm{in}}<0.
$$

Proof.
Along the right exterior inbound branch, the partner source lies on the opposite side of the origin, so every active partner contribution points inward and has the form
$$
a_p(t)=-A_p(t).
$$
For any active partner root
$$
t_p<t,
$$
the delayed separation is
$$
r_p(t;t_p)=x(t)+x(t_p).
$$
Because both the current and delayed positions lie in the tame position envelope,
$$
0\le x(t)\le X_{\max},
\qquad
0\le x(t_p)\le X_{\max},
$$
one has
$$
r_p(t;t_p)\le 2X_{\max}.
$$
Hence the dual-mollified amplitude denominator satisfies
$$
r_p(t;t_p)^2+\epsilon_c^2\le 4X_{\max}^2+\epsilon_c^2.
$$

On the same branch the 1D partner line-of-action sign is
$$
\hat r_p=+1,
$$
so
$$
J_p(t;t_p)=1+\frac{\dot x(t_p)}{c_f}.
$$
Using the speed bound gives the crude upper estimate
$$
|J_p(t;t_p)|\le 1+\frac{U_{\max}}{c_f}.
$$

Therefore each active partner branch contributes at least
$$
\kappa\epsilon^2
\frac{1}{
\left(r_p(t;t_p)^2+\epsilon_c^2\right)|J_p(t;t_p)|
}
\ge
\frac{\kappa\epsilon^2}{
\left(4X_{\max}^2+\epsilon_c^2\right)
\left(1+\frac{U_{\max}}{c_f}\right)
}.
$$
Since at least one partner branch is active, summing over all active partner roots yields
$$
A_p(t)\ge \underline A_p^{\mathrm{in}},
$$
which proves the lemma.

**Lemma 6: Finite-time crossing under a net inward acceleration floor.**
Assume the pre-crossing leg starts from the inbound section
$$
x(0)=x_\ast>0,
\qquad
\dot x(0)\le 0,
$$
and suppose there exists a constant
$$
a_{\mathrm{in}}>0
$$
such that the full pre-crossing acceleration obeys
$$
\ddot x(t)\le -a_{\mathrm{in}}
\qquad
\text{for }0\le t\le t_{\mathrm{cross}}.
$$
Then the trajectory reaches the origin in finite time, with
$$
t_{\mathrm{cross}}
\le
\sqrt{\frac{2x_\ast}{a_{\mathrm{in}}}}.
$$

In particular, a sufficient realization is
$$
A_s^{\mathrm{in}}(t)-A_s^{\mathrm{out}}(t)
\le
\theta\,\underline A_p^{\mathrm{in}}
\qquad
\text{for }0\le t\le t_{\mathrm{cross}},
$$
for some
$$
0\le \theta<1,
$$
since then
$$
\ddot x(t)
=
-A_p(t)-A_s^{\mathrm{out}}(t)+A_s^{\mathrm{in}}(t)
\le
-(1-\theta)\underline A_p^{\mathrm{in}}
\equiv
-a_{\mathrm{in}}.
$$

Proof.
Integrating the acceleration bound once gives
$$
\dot x(t)
\le
\dot x(0)-a_{\mathrm{in}}t
\le
-a_{\mathrm{in}}t,
$$
because
$$
\dot x(0)\le 0.
$$
Integrating again from
$$
x(0)=x_\ast
$$
yields
$$
x(t)
\le
x_\ast+\dot x(0)t-\frac{a_{\mathrm{in}}}{2}t^2
\le
x_\ast-\frac{a_{\mathrm{in}}}{2}t^2.
$$
Therefore
$$
x(t)\le 0
$$
whenever
$$
t\ge \sqrt{\frac{2x_\ast}{a_{\mathrm{in}}}}.
$$
By continuity of the trajectory, there is a first crossing time
$$
t_{\mathrm{cross}}\in
\left(0,\sqrt{\frac{2x_\ast}{a_{\mathrm{in}}}}\right]
$$
such that
$$
x(t_{\mathrm{cross}})=0.
$$
This proves the lemma.

**Lemma 7: Crossing-speed bounds under two-sided acceleration control.**
Assume the pre-crossing leg starts from
$$
x(0)=x_\ast>0,
\qquad
\dot x(0)=-u_0,
\qquad
u_0\ge 0,
$$
and suppose there exist positive constants
$$
0<a_-\le a_+
$$
such that
$$
-a_+\le \ddot x(t)\le -a_-
\qquad
\text{for }0\le t\le t_{\mathrm{cross}}.
$$
Define the quadratic comparison roots
$$
\tau_\pm
\equiv
\frac{\sqrt{u_0^2+2a_\pm x_\ast}-u_0}{a_\pm}.
$$
Then the crossing time satisfies
$$
\tau_+\le t_{\mathrm{cross}}\le \tau_-,
$$
and the crossing speed obeys
$$
u_0+a_-\tau_+
\le
-\dot x(t_{\mathrm{cross}})
\le
u_0+a_+\tau_-.
$$

In particular, if the class constants satisfy
$$
V_{\min}\le u_0+a_-\tau_+,
\qquad
u_0+a_+\tau_-\le V_{\max},
$$
then the crossing lands in the Goldilocks speed window
$$
V_{\min}\le -\dot x(t_{\mathrm{cross}})\le V_{\max}.
$$

Proof.
Integrating the two-sided acceleration bound gives
$$
-u_0-a_+t
\le
\dot x(t)
\le
-u_0-a_-t.
$$
Integrating again yields the quadratic comparison bounds
$$
x_\ast-u_0 t-\frac{a_+}{2}t^2
\le
x(t)
\le
x_\ast-u_0 t-\frac{a_-}{2}t^2.
$$

Let
$$
q_\pm(t)\equiv x_\ast-u_0 t-\frac{a_\pm}{2}t^2.
$$
Each $q_\pm$ has a unique positive root, namely
$$
\tau_\pm
=
\frac{\sqrt{u_0^2+2a_\pm x_\ast}-u_0}{a_\pm}.
$$
Because
$$
x(t)\le q_-(t),
$$
the crossing must occur no later than the first time the upper comparison reaches zero:
$$
t_{\mathrm{cross}}\le \tau_-.
$$
Likewise,
$$
x(t)\ge q_+(t),
$$
so the trajectory cannot cross before the lower comparison reaches zero:
$$
t_{\mathrm{cross}}\ge \tau_+.
$$
Hence
$$
\tau_+\le t_{\mathrm{cross}}\le \tau_-.
$$

Evaluating the velocity bounds at the crossing time gives
$$
-\dot x(t_{\mathrm{cross}})
\ge
u_0+a_- t_{\mathrm{cross}}
\ge
u_0+a_-\tau_+,
$$
and
$$
-\dot x(t_{\mathrm{cross}})
\le
u_0+a_+ t_{\mathrm{cross}}
\le
u_0+a_+\tau_-.
$$
This proves the claimed crossing-speed bracket.

**Lemma 8: Pre-crossing tube preservation from monotonicity and bounded acceleration.**
Assume the pre-crossing leg starts from the inbound section
$$
x(0)=x_\ast,
\qquad
\dot x(0)=-u_0,
\qquad
0\le u_0\le U_{\mathrm{in}},
$$
with
$$
0<x_\ast\le X_{\max}.
$$
Assume moreover that on
$$
[0,t_{\mathrm{cross}}],
$$
the trajectory satisfies:

- inward monotonicity,
  $$
  \dot x(t)\le 0,
  $$
- bounded crossing time,
  $$
  t_{\mathrm{cross}}\le \tau_{\mathrm{cross},\max},
  $$
- and a uniform acceleration bound,
  $$
  |\ddot x(t)|\le A_{\max}.
  $$

If
$$
U_{\mathrm{in}}+A_{\max}\tau_{\mathrm{cross},\max}\le U_{\max},
$$
then the full pre-crossing tube bounds hold:
$$
0\le x(t)\le X_{\max},
\qquad
|\dot x(t)|\le U_{\max},
\qquad
|\ddot x(t)|\le A_{\max}
\qquad
\text{for }0\le t\le t_{\mathrm{cross}}.
$$

Proof.
Because
$$
\dot x(t)\le 0
\qquad
\text{for }0\le t\le t_{\mathrm{cross}},
$$
the position is nonincreasing on the pre-crossing leg. Since the first crossing occurs at
$$
x(t_{\mathrm{cross}})=0,
$$
one has
$$
0\le x(t)\le x(0)=x_\ast\le X_{\max}
\qquad
\text{for }0\le t\le t_{\mathrm{cross}}.
$$

For the velocity, the acceleration bound gives
$$
|\dot x(t)-\dot x(0)|
\le
\int_0^t |\ddot x(s)|\,ds
\le
A_{\max} t
\le
A_{\max}\tau_{\mathrm{cross},\max}.
$$
Therefore
$$
|\dot x(t)|
\le
|\dot x(0)|+A_{\max}\tau_{\mathrm{cross},\max}
\le
U_{\mathrm{in}}+A_{\max}\tau_{\mathrm{cross},\max}
\le
U_{\max}.
$$
The acceleration bound is already part of the hypotheses, so the full tube estimate follows.

This lemma does not by itself control Jacobian transversality or branch-count growth. It isolates the easier kinematic part of tube preservation: once monotone inbound motion, bounded crossing time, and bounded acceleration are known, the position-speed tube closes automatically up to the crossing.

### Equal-amplitude cycling

The current delayed geometry does not naturally point to a continuous family of equal-amplitude cycles. In a purely causal delayed system, the more plausible generic picture is:

- net delayed braking at large excursion,
- net delayed pumping at small excursion,
- and an isolated balance point where the two effects cancel over one cycle.

If that picture is correct, the relevant mathematical object is an isolated fixed point of $P_\eta$, possibly attracting, rather than a one-parameter conservative orbit family. Equal-amplitude cycling is therefore plausible only if some stronger cycle-balance or exact history-functional structure is present; otherwise one should expect amplitude drift to be the generic behavior away from the fixed point.

### Red flags for the theorem program

Several issues still need to stay explicit while pushing the 1D proof program forward.

- **Origin singularity.** The shell regularization $\delta_\eta$ does not by itself remove the divergence of the amplitude factor $1/r^2$ at the origin crossing. For the current braking-dominance theorem target, an explicit core mollifier of the denominator should be treated as required rather than optional, for example by replacing $r^{-2}$ with $(r^2+\epsilon_c^2)^{-1}$ or an equivalent short-distance regularization.
- **State-space labeling.** The theorem program is safest in true signed coordinates $x\in\mathbb{R}$, with recapture phrased in the radial variable $\rho=|x|$. Any language suggesting a rebound on the same $x>0$ branch before the origin should be treated as provisional shorthand rather than as a derived dynamical fact.
- **Past-velocity transversality.** The Jacobians $J_p$ and $J_s$ depend on emission-time velocities, not current velocity. Turning through $\dot x=0$ at the present time does not by itself preserve transversality, so the lower bounds on $|J|$ must be checked against the delayed high-speed part of the history.
- **Partner-root inequality, not equality.** As the trajectory brakes after the crossing, the true partner distance can only become smaller than the leading linear prediction, which strengthens the partner force. So the partner-root estimate should be used as an upper bound on $r_p(t)$ and therefore a lower bound on $A_p^{\rho}(t)$, not as an exact identity on the nonlinear window.
- **Inner rebound region.** The theorem program still packages the actual near-center reversal into the admissible history class. That is acceptable for the current reduced note, but it means the hardest local dynamics near the inner rebound is not yet derived from first principles here.
- **Root multiplicity control.** The branch sums defining $A_p$, $A_s^{\text{out}}$, and $A_s^{\text{in}}$ are only tame if the number of active roots stays controlled. The regularized model softens each branch contribution, but it does not by itself prevent root proliferation from defeating the envelope bounds.
- **Compactness is conditional.** The added acceleration bound is the right first step toward precompactness in $C^1$, but a later fixed-point theorem will still need the exact topology and continuity properties of the return map to be verified rather than assumed.
- **Continuity through the crossing.** The theorem uses a history class in which velocity is continuous through $t=0$, but the dual-mollified acceleration can still develop a very sharp gradient near the origin. Any Banach-space formulation must therefore keep enough control on $\ddot\phi$ near the boundary of the history interval that the delayed integrals remain well behaved at the crossing.

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
> 2. a post-crossing outward self-hit drive is eventually overcome strongly enough for radial recapture,
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
