# Planar disturbances of the sharp capped circular binary

**Date:** 2026-09-16. **Grade:** derived first variation on the active speed-boundary branch and exact initial radial-response calculation. No stability spectrum, evolved perturbed orbit, or ellipse solution is claimed. Only the sharp Master Equation with zero self response and the stated ceiling projection is used; $c_f=c_a=1$.

## Base solution and admissible disturbance

Use the [certified circle](circular-binary-all-root-certificate.md), whose exact history has the [local circular continuation](regular-chart-history-to-ledger-well-posedness.md#7-specialized-circular-binary-corollary-and-route-comparison). Write its radius as $R_\ast=K/[4D(1+\sin D)]$, where $D=\cos D$. This is a solution of the capped equation, not a configuration with an unbalanced residual. Its raw forward tangential acceleration is strictly positive. Its sole partner root has positive range and transmitter factor; self response is zero.

First restrict to smooth planar variations that stay on the unit-speed boundary and retain that positive forward component and root census. If $\mathbf u_i$ is a position variation, unit speed requires $\mathbf v_i\cdot\dot{\mathbf u}_i=0$ to first order. These restrictions define the branch on which differentiation below is valid. Speed reductions into the interior require a separate one-sided constrained-evolution analysis because the pointwise cap response is discontinuous across that boundary. Antipodal variations additionally impose $\mathbf u_2=-\mathbf u_1$; the row formulas below also display what is required for more general planar variations.

## Exact linearized delayed row

Fix receiver time $t$ and let $s$ be its base partner emission time. All quantities on the right below are evaluated on the exact circle. Put $\mathbf r=\mathbf X_i(t)-\mathbf X_j(s)$, $r=|\mathbf r|$, $\mathbf n=\mathbf r/r$, and $J=1-\mathbf n\cdot\mathbf v_j(s)>0$. Differentiating the sharp causal equality gives

$$
\delta s=-\frac{\mathbf n\cdot[\mathbf u_i(t)-\mathbf u_j(s)]}{J}.
$$

The variation must include this change of emission time, not merely move the two positions at a fixed delay. Define

$$
\delta\mathbf r=\mathbf u_i(t)-\mathbf u_j(s)-\mathbf v_j(s)\delta s,
\quad \delta r=\mathbf n\cdot\delta\mathbf r,
\quad \delta\mathbf n=\frac{(I-\mathbf n\mathbf n^{\mathsf T})\delta\mathbf r}{r},
$$

$$
\delta J=-\delta\mathbf n\cdot\mathbf v_j(s)
-\mathbf n\cdot[\dot{\mathbf u}_j(s)+\mathbf a_j(s)\delta s].
$$

Here $\mathbf a_j$ is the actual base path acceleration. It appears because a velocity is evaluated at a shifted past time, not because acceleration is an added emission input. For opposite polarities the raw row and its variation are

$$
\mathbf a=-\frac{K\mathbf n}{r^2J},\qquad
\delta\mathbf a=-\frac{K}{r^2J}
\left[\delta\mathbf n-\mathbf n\left(\frac{2\delta r}{r}+\frac{\delta J}{J}\right)\right].
$$

At the active ceiling, the complete effective acceleration is $(I-\mathbf v_i\mathbf v_i^{\mathsf T})\mathbf a$. Its variation is therefore

$$
\ddot{\mathbf u}_i=(I-\mathbf v_i\mathbf v_i^{\mathsf T})\delta\mathbf a
-[\dot{\mathbf u}_i\mathbf v_i^{\mathsf T}+\mathbf v_i\dot{\mathbf u}_i^{\mathsf T}]\mathbf a.
$$

This is the necessary variational equation for differentiable solution families in the declared boundary branch. It is not itself a proof that every nearby history has a differentiable solution map. That admission and the constrained interior branch remain part of the perturbative continuation problem.

## First concrete sharp response: a slightly wider or narrower history

Supply a unit-speed antipodal circular *input history* of radius $R$ close to $R_\ast$, with its angular speed $1/R$, and release its future to the sharp capped equation at time zero. This supplied history need not solve the equation before zero; it is a history-to-ledger test, not a second equilibrium about which to linearize. A left/right acceleration mismatch means it cannot be claimed to satisfy a stronger compatible-trace theorem without additional work.

The exact partner-root equation remains $D=\cos D$. Its raw tangential component remains positive, and the initial capped acceleration is

$$
\ddot{\mathbf X}(0^+)=-\frac{R_\ast}{R^2}\mathbf e_r.
$$

For distance $\rho=|\mathbf X|$ from the fixed antipodal midpoint, $\dot\rho(0)=0$ and $|\dot{\mathbf X}(0)|=1$. Differentiating $\rho$ gives the exact required right curvature

$$
\ddot\rho(0^+)=\frac1R-\frac{R_\ast}{R^2}
=\frac{R-R_\ast}{R^2}.
$$

Thus the initially wider circular history has an outward radial response; the narrower one has an inward response. At $R=R_\ast$ it vanishes, recovering the exact base circle. For $R=R_\ast+\delta R$ the response is $\delta R/R_\ast^2+O(\delta R^2)$. This is locally non-restoring for this supplied-history perturbation. It is a useful adverse sign, not a proof of exponential instability: future partner roots sample the changing emitted history, so this initial formula cannot be reused as a closed radial evolution equation.

## Verification and next mathematical object

The causal variation is checked by substituting it into $\delta g=0$. A common constant translation has $\mathbf u_i=\mathbf u_j$, zero velocity variation, and yields $\delta s=\delta\mathbf r=\delta\mathbf a=0$, as required by spatial translation symmetry. The radial calculation independently recovers zero radial-distance acceleration at the certified radius. These are analytic consistency checks, not an independent computed stability certificate. No numerical instrument was run.

The next object is the rotating-frame delayed variational system with the constant base delay $2R_\ast D$, its phase/translation neutral directions removed where appropriate, and a declared admissible perturbation space. Its modes must be analyzed with the boundary-speed constraint and then connected to a justified local evolution map before a nonlinear stability verdict. An ellipse is neither assumed nor certified by this first variation. The strongest present result is the exact initial radial response plus the explicit delayed linear operator on the active boundary branch.

**Falsifiers:** an error in the root variation, the transmitter-weight derivative, or the complete cap derivative would invalidate the operator. A sharp initial row for the declared circular input history that disagrees with $(R-R_\ast)/R^2$ would overturn the radial response. Later restoring dynamics would not contradict an initial outward response; a long-time verdict has not been made.
