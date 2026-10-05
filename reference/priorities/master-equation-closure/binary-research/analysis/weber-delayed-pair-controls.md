# Delayed Weber pair controls

## Selected law and scope

The [frozen Section 9a](../../equation-variants/manuscript.md#9a-selected-delayed-weber-adaptation) sets $K=c_f=1$, $\lambda=-1/2$, $\mu=1$, all ordinary positive-delay partner and self roots, and no boundary response. This document provides closed-form controls on prescribed complete paths, followed by the algebraic present-acceleration solve where appropriate. A stationary or affine path is a control input, not a claimed coupled solution. The [separately authored reference](../../braid-program/analysis/weber-delayed-ring-independent-reference.md#closed-form-stationary-and-affine-controls) confirms the derivative formulas independently.

## Stationary controls

For two distinct stationary positions separated by $r>0$, the sole partner root is $S=T-r$; $D_t=1$, $p=S'=1$, $\dot{\mathscr R}=\ddot{\mathscr R}=0$. The evaluated hit is $\sigma\mathbf n/r^2$, and a stationary self history has no positive-delay root. For $r=2$ the magnitude is $1/4$; this is a known input for the Cartesian subject. A stationary source with a moving receiver is different: $S=T-r(T)$, $\mathscr R=r(T)$, $D_t=1$ and $\ddot{\mathscr R}=\mathbf n\cdot\mathbf A_i+\|\mathbf V_{i,\perp}\|^2/r$. The response is implicit in the receiver acceleration; holding both paths is not a solution unless other prescribed sources supply balance. Grade: derived. Falsifier: a second partner root on a separated stationary complete source/receiver pair or a disagreement with direct differentiation.

## Affine-source controls in closed form

Let the transmitter be $\mathbf X_j(S)=\mathbf b+\mathbf vS$, and let $\mathbf d(T)=\mathbf X_i(T)-\mathbf X_j(T)$. With $\tau=T-S>0$, the arrival condition is $\|\mathbf d+\mathbf v\tau\|=\tau$. Every root is a positive solution of

$$
(1-\|\mathbf v\|^2)\tau^2-2(\mathbf d\cdot\mathbf v)\tau-\|\mathbf d\|^2=0.
$$

For a subfield affine source there is exactly one positive root,

$$
\tau=\frac{\mathbf d\cdot\mathbf v+\sqrt{(\mathbf d\cdot\mathbf v)^2+(1-\|\mathbf v\|^2)\|\mathbf d\|^2}}{1-\|\mathbf v\|^2}.
$$

At equality or above unit source speed, the quadratic or its linear limit must be inspected for all positive roots; a double root is nonordinary and supplies no continuation. With a stationary receiver, $p=1/D_t$ and

$$
\dot{\mathscr R}=-\frac{\mathbf n\cdot\mathbf v}{D_t},\qquad
\ddot{\mathscr R}=\frac{\|\mathbf v_\perp\|^2}{\mathscr R D_t^3},\qquad
B=1-\frac{(\mathbf n\cdot\mathbf v)^2}{2D_t^2}+\frac{\|\mathbf v_\perp\|^2}{D_t^3}.
$$

Thus a radial affine source has zero second range derivative; a transverse source has $D_t=1$, zero first derivative and $B=1+\|\mathbf v\|^2$. The subject known case fixes receiver $(1,0)$ and source $\mathbf X_j(S)=(0,0.3(S+1))$ at $T=0$, $S=-1$: the exact causal quadratic gives $\ddot{\mathscr R}=0.09$, reproduced by central differences before target use. Two general affine paths use the same quadratic with their present displacement; their kinematics are $p=D_r/D_t$, $\dot{\mathscr R}=1-p$ and $\ddot{\mathscr R}=\|\mathbf V_i-p\mathbf v\|_\perp^2/(\mathscr R D_t)$ when both prescribed accelerations vanish. The bracket need not be one.

A complete affine self path satisfies $\|\mathbf v\|\tau=\tau$: below or above unit speed there is no positive self root, whereas at exactly unit speed every positive lag is a root and $D_t=0$. That equality self channel is undefined on this ordinary-root specification, not a selectable zero contribution. Grade: derived. Falsifier: an ordinary affine root that violates the quadratic or the total derivatives.

## Instantaneous invariants do not transfer

Common translation at a fixed velocity leaves a pair's present separation fixed but changes the causal range, direction and transmitter weight; Galilean boost invariance therefore fails. For two affine prescribed paths with common velocity $\mathbf v$, the two ranges have constant lag and bracket one, but the reciprocal directions are $(\pm\mathbf d+\mathbf v\tau_\pm)/\tau_\pm$, which generally are not opposite. The present-acceleration solve for opposite polarity and delayed source acceleration zero rescales each radial hit by $[1+1/(R D_t^2)]^{-1}$; it does not restore present equal-and-opposite coupling. For $\mathbf d$ perpendicular to nonzero $\mathbf v$, both directions have the same nonzero projection along $\mathbf v$, and both solved contributions have the same sign there. Thus the algebraic identity $\sum_i\mathbf A_i=0$ fails on admissible ordinary hit data. For $\mathbf d$ oblique to $\mathbf v$, the unequal causal ranges also leave a relative contribution outside the present-separation line, so the instantaneous angular-momentum proof fails. No local energy-like first integral or new conserved account is established. Spatial/time translations and rotations are preserved geometrical symmetries; they are not conservation proofs without an action and its hypotheses. Grade: derived failure of the instantaneous identities, not a classification of every possible conserved functional. Falsifier: an algebraic cancellation valid on all ordinary delayed hit data, including the common-velocity oblique control.

## Known-case record

The [Cartesian subject known receipt](../../braid-program/evidence/weber-delayed-subject-known.json) and independent reference known receipts record passes before their target use. The affine and stationary calculations are closed forms; floating differences merely test their implementation. No pair evolution, bound history, nonlinear fate, coefficient fit or canonical promotion was run in this first screen.
