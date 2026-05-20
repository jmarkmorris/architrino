# Held-Release Handoff Map

## Scope

This packet sharpens the held-release segment in `sub_field_speed_action_test_case.md`. It is a theory-success marker for a lawful preparation after the exact field-speed head-on seed was rejected as a self-continuum obstruction. It does not authorize a candidate cycle, branch chart, pre-ledger pass, or new gate.

## Setup

Let
$$
y(t)\equiv x(t)+x_0.
$$
During the held-source segment,
$$
\ddot y(t)=-\frac{g}{y(t)^2},
\qquad
y(0)=2x_0,
\qquad
\dot y(0)=0.
$$
The energy identity is
$$
\frac{1}{2}\dot y^2-\frac{g}{y}
=
-\frac{g}{2x_0}.
$$
For the inbound branch,
$$
\dot y
=
-\sqrt{\frac{g}{x_0}\frac{2x_0-y}{y}}.
$$

## Parametric Solution

Set
$$
y(\theta)=2x_0\cos^2\theta,
\qquad
0\le\theta\le\frac{\pi}{4}.
$$
Then
$$
x(\theta)=x_0\cos(2\theta),
\qquad
\dot x(\theta)=\dot y(\theta)
=
-\sqrt{\frac{g}{x_0}}\tan\theta,
$$
and the elapsed time is
$$
t(\theta)
=
2x_0\sqrt{\frac{x_0}{g}}
\left(\theta+\sin\theta\cos\theta\right).
$$

The first moving-partner handoff occurs when the partner wake emitted at release reaches the right receiver:
$$
y(t_\ast)=c_ft_\ast.
$$
In the $\theta$ parametrization this is the scalar equation
$$
\cos^2\theta_\ast
=
\rho\left(\theta_\ast+\sin\theta_\ast\cos\theta_\ast\right),
\qquad
\rho\equiv c_f\sqrt{\frac{x_0}{g}}.
$$
The left-minus-right side has derivative
$$
-\sin(2\theta)-2\rho\cos^2\theta<0
$$
on $0\le\theta\le\pi/4$, so the handoff angle is unique whenever it exists before the origin.

At the origin one has $\theta=\pi/4$. Therefore the handoff occurs before or at the origin iff
$$
\rho\ge\frac{1}{1+\pi/2}.
$$
A stronger and useful sufficient condition is
$$
\rho>1.
$$
Then the held-source segment remains strictly sub-field-speed through the whole pre-origin interval because
$$
|\dot x|_{\max}=\sqrt{\frac{g}{x_0}}<c_f,
$$
and it has already handed off to the moving-partner delayed chart before the origin.

The exact test for reaching field speed before the moving-source handoff is sharper. Field speed occurs at
$$
\theta_c=\arctan\rho.
$$
Since the handoff equation is strictly monotone, field speed occurs before handoff iff
$$
\frac{1-\rho^2}{1+\rho^2}>\rho\arctan\rho.
$$
The threshold is
$$
\rho\approx0.6634922243,
$$
or
$$
x_0\approx0.4402219317\,\frac{g}{c_f^2}.
$$
This distinguishes the before-origin extrapolation from the actual held-segment cutoff.

## Normalized Fixture

For the normalized comparison
$$
x_0=1.25,
\qquad
g=1,
\qquad
c_f=1,
$$
one has
$$
\rho=\sqrt{1.25}\approx1.118033988749895.
$$
Solving the handoff equation gives
$$
\theta_\ast\approx0.400048009813582.
$$
Thus
$$
t_\ast\approx2.1207972823389274,
\qquad
y_\ast\approx2.1207972823389274,
$$
and
$$
x_\ast=y_\ast-x_0\approx0.8707972823389274,
\qquad
\dot x_\ast\approx-0.37820836925058077.
$$
The handoff therefore occurs well before the origin and with a strict sub-field-speed margin.

## Handoff Regularity

Define the moving-partner delayed-root residual
$$
F(t,t_e)=x(t)+x(t_e)-c_f(t-t_e).
$$
At handoff the new delayed root has
$$
t_e=0,
\qquad
F(t_\ast,0)=0.
$$
Moreover
$$
\partial_{t_e}F(t_\ast,0)=\dot x(0)+c_f=c_f>0.
$$
Therefore the implicit-function theorem gives a unique delayed emission branch near $t_\ast$ with
$$
\frac{dt_e}{dt}
=
\frac{c_f-\dot x(t)}{c_f+\dot x(t_e)}.
$$
The partner Jacobian on this branch is
$$
J_p(t;t_e)=1+\frac{\dot x(t_e)}{c_f},
$$
so
$$
J_p(t_\ast;0)=1.
$$
The force is continuous across handoff because
$$
-\frac{g}{(x(t_\ast)+x_0)^2}
=
-\frac{g}{(x(t_\ast)+x(0))^2\,J_p(t_\ast;0)}.
$$
Thus the handoff is a regular simple-root opening, not a hidden caustic or impulse event.

## Consequence

The held-release preparation does more than avoid an ill-specified countable-infinity prehistory. In the normalized $x_0=1.25$ action-generated test, it supplies a finite, noncaustic transfer from stationary partner history into the moving-partner delayed chart while the same-side exact self-root remains excluded by the strict sub-field-speed margin. The next mathematical burden is not another gate; it is the delayed moving-partner continuation from this handoff state, with finite-width self-collar estimates kept as corrections rather than simple-root branches.
