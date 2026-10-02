# Exact first event of the instantaneous logarithmic collinear pair

## Model and scope

**Claim grade: derived within the explicitly postulated instantaneous comparison.** This calculation completes the mathematical target of LPR-001. It does not evaluate the delayed logarithmic equation or the current Master Equation. The reference speed is $c_f=1$ throughout; speed one is a diagnostic level in this instantaneous model, with no speed cap or causal-root singularity attached to it.

There are two moving constituents on one line, with dimensionless polarity signs $\sigma_+=+1$ and $\sigma_-=-1$. Take $K>0$, $r_0>0$, and the receiver acceleration-potential

$$
\Psi_i(X_i;X_j)=-K\sigma_i\sigma_j
\ln\!\left(\frac{|X_i-X_j|}{r_0}\right),
\qquad
\ddot X_i=-\partial_{X_i}\Psi_i.
$$

The partial derivative treats the other position as independent. It is taken before imposing mirror symmetry. Here $[K]=L^2T^{-2}$ and $[r_0]=L$. For comparison with equal fixed polarity magnitudes in the preceding candidate equation, $K=\kappa_{\log}|q_+q_-|$ identifies the radial coefficient. Using equal-time separation and unit source weight is a separate comparison prescription, not an exact reduction of the moving delayed law.

The domain is $X_+>X_-$, with only these instantaneous mutual contributions. There is no instantaneous self term, background population, delay history, softening, contact update, or imposed speed response. Initial data at $T=0$ are

$$
X_+(0)=x_0,\quad X_-(0)=-x_0,\quad
\dot X_+(0)=-u_0,\quad\dot X_-(0)=u_0,
\qquad x_0>0,\quad u_0\ge0.
$$

The main first-crossing theorem concerns $0\le u_0<1$. Initial equality and already-super-field-speed approaches are classified separately below.

## Two-moving reduction and polarity

Direct differentiation gives

$$
\ddot X_i
=K\sigma_i\sigma_j
\frac{X_i-X_j}{|X_i-X_j|^2}.
$$

This points away from a like-polarity source and toward an opposite-polarity source. For the specified opposite pair, set $d=X_+-X_->0$. Then

$$
\ddot X_+=-\frac Kd,\qquad
\ddot X_-=\frac Kd,\qquad
\ddot d=-\frac{2K}{d}.
$$

The midpoint has zero acceleration and its initial position and velocity vanish, so it remains at zero. Therefore $X_\pm=\pm x$, $d=2x$, and

$$
\boxed{\dot x=-u,\qquad \dot u=\frac K{2x}}.
$$

The factor $1/2$ is necessary: each constituent is separated from the other by $2x$. Differentiating a scalar already restricted to the mirror path would differentiate both coordinates at once and would not be the prescribed receiver partial derivative.

The right-hand side is smooth for $x>0$, so this ordinary differential equation has a unique local solution for every stated initial datum. For $T>0$ in that domain, $u$ strictly increases. Thus an initially approaching pair never turns outward. A rest release has $\dot u(0)=K/(2x_0)>0$ and starts approaching immediately; its initial zero velocity is not a later rebound.

## First integral and exact clock

Along every positive-separation solution,

$$
\frac{d}{dT}\left[u^2+K\ln(x/x_0)\right]
=2u\frac K{2x}+K\frac{-u}{x}=0.
$$

Consequently

$$
\boxed{u^2=u_0^2+K\ln(x_0/x)},\qquad
x=x_0\exp\!\left(\frac{u_0^2-u^2}{K}\right).
$$

This derivation remains valid at $u_0=0$ and does not divide by the initial speed. It is a first integral of the declared acceleration equation, not an imported mass, kinetic-energy, or global wake-energy law.

Since $\dot u>0$, use $u$ as the trajectory parameter:

$$
\frac{dT}{du}=\frac{2x}{K},
\qquad
T(u)=\frac{2x_0}{K}e^{u_0^2/K}
\int_{u_0}^{u}e^{-v^2/K}\,dv.
$$

For every finite $u\ge u_0$, this clock is strictly increasing and $x>0$. Its inverse supplies the solution through every finite speed. Equivalently, with the mathematical error function $\operatorname{erf}z=(2/\sqrt{\pi})\int_0^z e^{-w^2}\,dw$,

$$
T(u)=\frac{x_0\sqrt{\pi}}{\sqrt K}e^{u_0^2/K}
\left[
\operatorname{erf}\!\left(\frac u{\sqrt K}\right)
-\operatorname{erf}\!\left(\frac{u_0}{\sqrt K}\right)
\right].
$$

Direct substitution of the parametric solution gives $dx/dT=-u$ and $du/dT=K/(2x)$, furnishing a check of both the first integral and the clock. No numerical integration is needed for the result.

## First-event classification

For $0\le u_0<1$, the first individual-speed-one event occurs at

$$
\boxed{
x_v=x_0e^{-(1-u_0^2)/K}>0,\qquad
d_v=2x_v,
}
$$

$$
T_v=\frac{2x_0}{K}e^{u_0^2/K}
\int_{u_0}^{1}e^{-v^2/K}\,dv.
$$

Both speed and acceleration are finite there: $u=1$ and $\dot u=K/(2x_v)$. No positive-separation singularity or later turn can precede it. The relative closing speed is $-\dot d=2u$, so the event $-\dot d=1$ would instead mean $u=1/2$ and is not the individual wake-speed threshold.

Continuing the same instantaneous equation beyond this diagnostic event leads to

$$
T_c=\lim_{u\to\infty}T(u)
=\frac{2x_0}{K}e^{u_0^2/K}
\int_{u_0}^{\infty}e^{-v^2/K}\,dv
=\frac{x_0\sqrt{\pi}}{\sqrt K}e^{u_0^2/K}
\operatorname{erfc}\!\left(\frac{u_0}{\sqrt K}\right),
$$

where $\operatorname{erfc}z=1-\operatorname{erf}z$. The Gaussian tail is positive and finite, proving

$$
0<T_v<T_c<\infty,\qquad
x(T)\downarrow0,\qquad u(T)\uparrow\infty
\quad\text{as }T\uparrow T_c.
$$

Every bounded range of $u$ stays inside a smooth positive-separation region, so there is no earlier classical-domain endpoint. The limiting contact is the first actual boundary of that domain. Its one-sided accumulated inward acceleration is $\int_0^{T_c}\dot u\,dT=\infty$. Positions have a continuous limit, but no finite-velocity $C^1$ extension can agree with the incoming trajectory. This establishes no generalized passage, reflection, or event update.

| Initial inward speed | Individual-speed-one event | First subsequent classical-domain boundary | Turn |
| --- | --- | --- | --- |
| $u_0=0$ | Positive time $T_v$ at positive $x_v$ | Contact limit at finite $T_c$, with unbounded speed | No later turn |
| $0<u_0<1$ | Positive time $T_v$ at positive $x_v$ | Contact limit at finite $T_c$, with unbounded speed | None |
| $u_0=1$ | At the initial instant | Contact limit at finite $T_c$, with unbounded speed | None |
| $u_0>1$ | Already above one; no later equality | Contact limit at finite $T_c$, with unbounded speed | None |

The formulas for $T_c$ and the parametric solution apply to every finite $u_0\ge0$. The positive-time $T_v$ formula as a future event applies only to $u_0<1$.

## Reference invariance and exact example

The reference $r_0$ disappears on differentiating the receiver scalar. It therefore cannot change the reduced equation, trajectory, or either event time. The invariant initial scale in the first integral is $x_0$, not an imposed zero-potential radius. Changing a dimensional coupling while moving $r_0$ would be a separate physical change.

For the normalized example $c_f=1$, $x_0=1$, $K=1$, $u_0=0$,

$$
x_v=e^{-1},\qquad d_v=2e^{-1},\qquad
T_v=\sqrt{\pi}\operatorname{erf}(1),\qquad
T_c=\sqrt{\pi}.
$$

Thus each constituent reaches speed one when separation is $e^{-1}$ times its initial value. This exact example selects no physical preferred length and introduces no fitted parameter.

## Relation to the delayed research

The instantaneous result proves that a logarithmic radial response alone supplies neither a speed ceiling nor finite-velocity contact in this approach. It does not prove that the proposed causal equation reaches the same events: that equation reads past source positions, transmitter weighting, complete histories, and any admitted self roots. Those ingredients are absent here.

The [inherited inverse-distance obstructions](inverse-distance-collinear-obstructions.md) remain separate conditional results. Their finite-speed contact assumptions and monotone self-birth geometry must not be substituted for the unbounded-speed instantaneous endpoint derived here. In particular, this model has no causal-root fold or self-birth event to classify.

The result is falsifiable by direct substitution in the two receiver equations, by the first-integral derivative, or by an independently reconstructed event clock. A factor-of-two discrepancy, a changed trajectory under a pure $r_0$ shift, or a finite contact-speed limit under these same assumptions would contradict the displayed derivation. The [independent calculation](instantaneous-collinear-independent-check.md) supplies a separate analytical route.
