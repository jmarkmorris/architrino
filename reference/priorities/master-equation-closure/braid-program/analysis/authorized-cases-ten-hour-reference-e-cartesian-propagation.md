# Independent Cartesian propagation reference for E+M

**Derived reference, frozen before the new propagation subject.** The selected preparation and finite-history method remain those of the [E reference](authorized-cases-ten-hour-reference-e-method.md), with its [weighted-comparison correction](authorized-cases-ten-hour-reference-e-comparison-correction.md). This note sharpens only current receiving-variable propagation. All delayed source errors remain explicit completed-history inputs. No target coefficient has been evaluated.

## Fixed trial source and exact current Jacobians

Fix reception time and a completed trial source curve. At its ordinary root write source velocity, acceleration and jerk as $b,a,j$, range $R$, unit ray $n$, $D=1-n\cdot b$, and receiver velocity $u$. For a current-position direction $h$, implicit differentiation gives

$$
\dot S=-\frac{n\cdot h}{D},\quad
\dot R=\frac{n\cdot h}{D},\quad
\dot n=\frac{I-nn^{\mathsf T}}R
\left(I+\frac{bn^{\mathsf T}}D\right)h,
\quad \dot b=a\dot S,\quad \dot a=j\dot S,
\quad \dot D=-b\cdot\dot n-n\cdot\dot b.
$$

The dot here denotes the directional derivative, not physical time. Define

$$
H=(1-|b|^2)(n-b),\qquad
K=(n-b)(n\cdot a)-Da,\qquad E=\frac{H+RK}{R^2D^3}.
$$

Then

$$
\dot H=-2(b\cdot\dot b)(n-b)+(1-|b|^2)(\dot n-\dot b),
$$

$$
\dot K=(\dot n-\dot b)(n\cdot a)
 +(n-b)(\dot n\cdot a+n\cdot\dot a)-\dot D\,a-D\dot a,
$$

$$
\dot E=\frac{\dot H+R\dot K+K\dot R}{R^2D^3}
-E\left(\frac{2\dot R}R+\frac{3\dot D}D\right).
$$

With $L_u=(1-u\cdot n)I+nu^{\mathsf T}$, the exact receiving-position Jacobian acts by

$$
A h=L_u\dot E+\big[(u\cdot E)I-Eu^{\mathsf T}\big]\dot n.
$$

The receiving-velocity Jacobian is especially simple:

$$
S=nE^{\mathsf T}-En^{\mathsf T},\qquad S^{\mathsf T}=-S.
$$

Sum both matrices over all three hits with their actual polarity products. The sum of the velocity matrices remains skew-symmetric. This cancellation is exact in three dimensions, includes nonzero delayed acceleration, and uses no magnetic or energy premise. It is simply an identity of the selected E+M row.

Trial jerk may jump at a quintic seam. On a line segment of current positions the root is Lipschitz and the response is locally Lipschitz; the above derivative exists almost everywhere. Integrating it gives the exact difference, with every source piece touched by the segment included. No single smooth derivative is assigned across a seam. A uniform piecewise jerk bound makes these formulas legitimate for the $C^{2,1}$ trial.

## Separating completed-source errors

Let $F_{\widehat X}(t,x,u)$ denote the full row using the fixed trial source curves at their own clocks for the indicated current receiver. Split the actual-minus-trial acceleration as

$$
F_X(t,x,u)-F_{\widehat X}(t,\widehat x,\widehat u)
=\big[F_{\widehat X}(t,x,u)-F_{\widehat X}(t,\widehat x,\widehat u)\big]
+\big[F_X(t,x,u)-F_{\widehat X}(t,x,u)\big].
$$

The first bracket has the exact form $\overline A\,\xi+\overline S\,\eta$, where $\xi=x-\widehat x$, $\eta=u-\widehat u$, and bars are averages of the displayed Jacobians over the current-variable line segment. In particular $\overline S$ is skew. Only trial jerk is needed to enclose $\overline A$.

The second bracket compares actual and trial completed histories at the same current receiver. Its clock error therefore needs only the completed source position error: $|S-\widehat S|\le x_p/(1-b)$. Its transported velocity/acceleration errors are $v_p+A_0x_p/(1-b)$ and $a_p+J_0x_p/(1-b)$. Apply the full-row difference coefficients from the independent method on the complete tube. This supplies an additive bound $f_p$ without introducing an unknown actual jerk or folding current receiver-position error into the source forcing. Both actual and virtual trial roots must remain behind the completed-history face.

After including the trial residual $\rho$, each receiver error obeys

$$
\xi'=\eta,\qquad \eta'=\overline A\xi+\overline S\eta+f,
\qquad |f|\le f_p+\rho.
$$

All four receivers remain independent current blocks only because every partner source in this finite step is strictly earlier completed data. Their past errors are coupled and must still be propagated.

## A signed matrix bound

For a fixed $\kappa>0$ on the receiving block, set $z=(\sqrt\kappa\,\xi,\eta)$ and $W=|z|$. Its homogeneous matrix is

$$
M_\kappa=\begin{pmatrix}0&\sqrt\kappa I\\
\overline A/\sqrt\kappa&\overline S\end{pmatrix}.
$$

The symmetric part has zero diagonal blocks. Its largest eigenvalue is exactly

$$
\mu_2(M_\kappa)=\frac12\left\|\sqrt\kappa I+
\frac{\overline A}{\sqrt\kappa}\right\|_2.
$$

Consequently any uniform enclosure $\gamma$ of this quantity gives

$$
W'\le\gamma W+f_p+\rho,\qquad |\xi|\le W/\sqrt\kappa,\qquad |\eta|\le W.
$$

This removes the absolute receiver-velocity Lipschitz penalty and retains signed restoring entries in $\overline A$. An interval enclosure may bound the indicated norm by Frobenius or row/column norms, but must retain the added $\kappa I$ before taking magnitudes. Since the norm is convex, a uniform bound for each Jacobian along the current tube also bounds its average. For a maximum over the four receiver norms, use the maximum coefficient and additive forcing bounds. A changed $\kappa$ at a block boundary requires the transfer factor $\max\{1,\sqrt{\kappa_{\rm new}/\kappa_{\rm old}}\}$; otherwise one must keep $\kappa$ fixed. No contraction of this scalar norm is asserted.

A simpler consequence is the upper Dini derivative $D^+|\eta|\le\|\overline A\|\,|\xi|+|f|$, because $\eta\cdot\overline S\eta=0$. The earlier corrected weighted comparison then has no current-velocity coefficient. This is weaker than retaining the signed matrix but remains a valid fallback.

## Independent controls and limits

For a stationary source, $E=n/R^2$ and $u=0$, the unsigned position Jacobian is $(I-3nn^{\mathsf T})/R^3$ and the velocity Jacobian is zero. For the nonzero transverse-acceleration control already frozen, at $T=R$, source $b=0$, $a=ae_2$, $j=0$, receiver $u=0$ and ray $e_1$, direct differentiation gives

$$
A=\begin{pmatrix}-2/R^3&a/R^2&0\\2a/R^2&1/R^3&0\\0&0&1/R^3\end{pmatrix},
\qquad
S=\begin{pmatrix}0&-a/R&0\\a/R&0&0\\0&0&0\end{pmatrix}.
$$

These are exact rational controls at $R=2,a=1/20$. They test acceleration transport through the moving root as well as the skew receiver term. The abstract control $A=-\kappa I$ with any skew $S$ has $\mu_2(M_\kappa)=0$; it tests the matrix norm rule without asserting a new physical case. A stationary-source response, by contrast, is not this abstract isotropic restoring control.

The formulas are derived analytical references. Before a target, independently verify their implementation on these controls and a source with nonzero jerk, and freeze all geometry, source pieces, residual and recurrence constants. A lost source window, omitted jerk, false skew cancellation, or a norm evaluated after discarding restoring signs falsifies the corresponding claim. No numerical feasibility, actual departure or new computation is asserted here.
