# A release seam prevents a uniform pointwise quadratic relative estimate

**Grade: derived candidate regularity obstruction, awaiting independent assessment.** Exact reflection makes the relative acceleration functional even under reversal of the entire midpoint history. Evenness alone does not give a quadratic bound in the midpoint perturbation for the locally $W^{2,\infty}$ histories admitted by the [slow mirror theorem](slow-binary-wider-regime.md). The following complete prescribed-history control gives a nonzero absolute-linear term at an acceleration seam. It is a control of the unchanged canonical row, not a coupled trajectory, a new admitted physical preparation, or a counterexample to dispersal.

The [nonlinear midpoint estimate](authorized-cases-ten-hour-d-primary-nonlinear-center.md) needs only first-order Lipschitz dependence and survives this obstruction. The present issue concerns the relative equation required to close an all-future nonmirror transfer.

## A complete subfield source control

Work on a fixed unit direction $e$ with $c_f=1$, fixed $K>0$, and length $d>0$. Choose $a>0$, a smooth cutoff $\chi$ equal to one in a neighborhood of zero and supported in $(-\ell,\ell)$, with $0<\ell<d/4$. Define complete scalar paths

$$
x(u)=\frac d2+\frac a2\chi(u)(u_+)^2,
\qquad C_\lambda(u)=\lambda c u,
\qquad X_\pm^\lambda(u)=(C_\lambda(u)\pm x(u))e,
\tag{1}
$$

where $u_+=\max(u,0)$ and $c>0$. Choose $a,\ell,c$ so that $\sup|x'|+c<\beta<1$. Such positive choices exist because $\sup|x'|$ scales linearly with $a$. These are complete $C^1\cap W^{2,\infty}_{\mathrm{loc}}$ histories, have a bounded acceleration jump at $u=0$, and retain strict subfield speed for $|\lambda|\le1$. Taking a nonnegative cutoff keeps their separation positive. Complete-past monotonicity gives one partner root per receiver, and the strict chord inequality gives no positive-delay self root.

Receive at $t=d$. Then $x(t)=d/2$ and $x'(t)=0$. For sufficiently small $|\lambda|$, both source clocks lie in the interval where $\chi=1$. At $\lambda=0$ the positive partner clock is exactly $s=0$. The positive line-of-action direction is $e$, its source velocity is $\lambda c-a s_+$, and its root equation is

$$
R=d-s=d+\lambda cR+\frac a2(s_+)^2.
\tag{2}
$$

Set $z=\lambda c>0$. For the positive parameter $\lambda$, the root is on the negative side of the seam:

$$
R_\lambda=\frac d{1-z},\qquad
s_\lambda=-\frac{dz}{1-z}<0,\qquad
F_+(\lambda)=-\frac K{d^2}(1-z)e.
\tag{3}
$$

For the negative parameter $-\lambda$, the root lies on the positive side. It is the small positive solution of

$$
\frac a2s^2+(1+z)s-dz=0,
\qquad s=dz+O(z^2).
\tag{4}
$$

The positive acceleration row at that parameter is therefore

$$
F_+(-\lambda)
=-\frac K{(d-s)^2(1+z+as)}e
=-\frac K{d^2}\{1+(1-ad)z+O(z^2)\}e.
\tag{5}
$$

The $O(z^2)$ remainder is an ordinary one-sided analytic remainder at fixed positive $a,d$; equation (4)'s square root has a strictly positive argument near zero. No dynamical approximation has entered this row calculation.

Reflection and label exchange give $F_-(\lambda)=-F_+(-\lambda)$. Combining (3) and (5) hence gives the full relative acceleration output

$$
F_+(\lambda)-F_-(\lambda)
=-\frac{2K}{d^2}e+\frac{Ka}{d}|\lambda c|e+O(\lambda^2).
\tag{6}
$$

It is even in $\lambda$ but not differentiable at zero. In particular its deviation from the centered relative row cannot be bounded by a fixed constant times $\lambda^2$ on this history class. The perturbation itself changes no source acceleration: $\partial_u^2 C_\lambda=0$. Controlling the perturbation in a norm that also bounds its second derivative does not remove the base history's seam.

The same control does not invalidate the accepted time-integrated first variation or the finite nonlinear midpoint estimate. Those statements do not assume a pointwise twice-differentiable relative row at a sampled acceleration jump. Equation (6) is a failure of one proposed estimate, not evidence of nonlinear separation failure.

## Why an integrated estimate can still be quadratic

The scalar velocity-seam identity supplies a useful independent regularity control. For $v(s)=a s_+$ and constant $h>0$,

$$
v(s+h)+v(s-h)-2v(s)=a(h-|s|)_+.
\tag{7}
$$

Its supremum is $ah$, but its integral over $s\in\mathbb R$ is $ah^2$. A first-order pointwise defect occupies only a first-order-width seam layer. This is the mechanism a correct integrated clock calculation must retain.

More generally let $v'=b$ on an interval large enough for the shifted arguments. Extend $b$ outside that interval by a specified bounded-variation extension if a whole-line norm is used. Direct integration gives

$$
v(s+h)+v(s-h)-2v(s)
=\int_0^h\{b(s+r)-b(s-r)\}\,dr.
\tag{8}
$$

If $b$ has finite total variation, the elementary translation estimate yields

$$
\int_{\mathbb R}|v(s+h)+v(s-h)-2v(s)|\,ds
\le h^2\operatorname{TV}(b).
\tag{9}
$$

Indeed, $\|b(\cdot+r)-b(\cdot-r)\|_1\le2r\operatorname{TV}(b)$, whose integral from zero to $h$ is the right side. For the single step in (7), $\operatorname{TV}(b)=a$ and equality holds. These are known analytical controls before any proposed application to the actual moving-clock row.

For merely bounded measurable $b$ on a finite interval, translation continuity gives only

$$
\int_0^h\|b(\cdot+r)-b(\cdot-r)\|_1\,dr=o(h).
\tag{10}
$$

A uniform quadratic rate does not follow from the $L^\infty$ acceleration bound alone. The source seam is not a reason to assume a jerk which the preparation never supplied.

## Exact remaining obligation

Equation (9) is not yet the required nonlinear pair estimate: the two source-clock shifts depend on reception time and on $\lambda$, have different denominators, and are not exactly symmetric. A successful application must bound their asymmetric second-order part, their change-of-variable Jacobians, the position and transmitter factors, and the total variation of the sampled actual acceleration. The original recent $W^{2,\infty}$ preparation does not supply that variation bound uniformly. A smaller complete-history class with explicitly controlled acceleration variation is a legitimate theorem hypothesis, but it must be declared; it cannot silently be attributed to every preparation covered by the existing mirror theorem.

For the fixed nominal circular metadata, the prescribed circular part is smooth, and a single release acceleration jump has finite variation locally if the generated row supplies the required subsequent regularity. Establishing and propagating that generated variation bound remains part of the actual coupled proof. Neither the saved phase token nor the finite certificate is changed by this observation.

The primary dispersal question remains unresolved. The derived obstruction is precisely to a uniform pointwise quadratic relative remainder on the broad admitted seam class. It does not rule out an integrated quadratic remainder, a different relative account, or a nonmirror dispersal theorem. Falsifiers are an incorrect ordinary root in (2)–(4), an omitted transmitter term in (5), cancellation of the nonzero coefficient in (6), or an error in the elementary translation bound (9). No target trajectory, numerical instrument, new physical history, source replacement or reference edit was used.
