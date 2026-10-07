# Independent D reference: angular motion on a linear dispersing tail

Derived conditional reference, frozen before any new D tail subject. The [angular/spatial reference](authorized-cases-followup-reference-d-angular-spatial.md) and the previously accepted [affine control](authorized-cases-ten-hour-d-common-center-control.md) are known. The current derivation retains distinct terminal member velocities. No assertion is made that the literal nominal member has this tail, and no affine history is substituted for its physical past.

Assume an actual unchanged canonical opposite pair with fixed $K>0$, $c_f=1$, complete supplied/generated speed at most $\beta<1$, and $d(t)=|X_+(t)-X_-(t)|\ge c_0t$ eventually, where $c_0>0$. Complete strict speed gives the unique two partner clocks and no self hits. The chord bounds and $D\ge1-\beta$ imply $|A_\pm(t)|=O(t^{-2})$. Thus terminal member velocities $v_\pm$ exist with $V_\pm(t)=v_\pm+O(t^{-1})$, and

$$
X_\pm(t)=v_\pm t+O(\log t),\qquad
U_\infty=v_+-v_-=uN_\infty,\quad u>0,
$$

$$
d(t)=ut+O(\log t),\qquad N(t)=N_\infty+O(\log t/t).
$$

The nonzero $u$ follows from the assumed linear lower bound and time averaging. Set $c=(v_++v_-)/2$, $a=c\cdot N_\infty$, $b=c-aN_\infty$ and $g=\sqrt{1-|b|^2}>0$.

Both sampled times tend to infinity proportionally to reception time. Indeed, for any fixed $\alpha<(1-\beta)/(1+\beta)$ the norm clock gap at $s=\alpha t$ is positive for sufficiently large $t$, since $|X_i(t)-X_j(\alpha t)|\le\beta(1+\alpha)t+O(\log t)$. Its unique zero therefore satisfies $s>\alpha t$. This step protects the entire generated source window rather than assuming a short delay.

On those windows acceleration is $O(t^{-2})$. Replacing each actual source path by its affine tangent at the current reception produces $O(1)$ position error and $O(t^{-1})$ velocity error throughout the length-$O(t)$ window. Gap monotonicity transfers these to an $O(1)$ root shift and hence an $O(t^{-3})$ canonical row error. The constants depend on the actual tail and $\beta$, but are finite. No source-acceleration derivative is needed. Replacing the current velocities and direction by their limits then costs $O(\log t/t^3)$ in the row.

For the positive receiver the limiting affine source velocity is $c-uN_\infty/2$; for the negative receiver it is $c+uN_\infty/2$. Their radial components are $a-u/2$ and $a+u/2$, with the same transverse component $b$ and factor $g$. Substituting their separate roots into the exact affine row gives

$$
A_+(t)=-\frac K{d^2}\left[(g-a+u/2)N_\infty+
\left(1-\frac{a-u/2}{g}\right)b\right]
+O(\log t/t^3),
$$

$$
A_-(t)=\frac K{d^2}(g+a+u/2)N_\infty-
\frac K{d^2}\left(1+\frac{a+u/2}{g}\right)b
+O(\log t/t^3).
$$

Equivalently, when $d^{-2}$ is replaced by $(ut)^{-2}$ the remainder has the same order. In particular the current radial relative velocity survives in the radial row and midpoint transverse row:

$$
U'=-\frac K{d^2}\left[(2g+u)N_\infty-\frac{2a}{g}b\right]
+O(\log t/t^3),
$$

$$
W'=\frac K{d^2}\left[aN_\infty-\left(1+\frac{u}{2g}\right)b\right]
+O(\log t/t^3).
$$

Omitting $u$ would be wrong even though it cancels from the leading torque. For the actual angular vector $H=Z\times U$ the result is

$$
H'(t)=\frac Lt+O(\log t/t^2),\qquad
L=\frac{2Ka}{ug}\,N_\infty\times c.
$$

The remainder is integrable, so a fixed vector $H_c$ exists with

$$
\boxed{H(t)=L\log t+H_c+O(\log t/t).}
$$

This identifies the first nonintegrable angular term. It is not controlled by smallness of $c$ alone. In a fixed plane with chosen positive normal $\ell$, maintaining the positive signed floor $\ell\cdot H>H_*$ forever requires $\ell\cdot L\ge0$. If that coefficient is negative the conditional linear tail must eventually violate the floor. If it is positive the tail itself eventually has positive growing signed angular motion, but earlier loss is not excluded. If it vanishes, the limiting constant must obey $\ell\cdot H_c\ge H_*$; equality is not a strict sufficient margin.

Static-center and purely radial or purely transverse terminal-center controls all give $L=0$, as the exact affine torque requires. A mixed center has the signed product of its radial and transverse components. In three dimensions the vector can grow logarithmically while its magnitude remains above a floor; a signed planar obstruction does not by itself settle the spatial magnitude or midpoint region. These are necessary terminal-geometry conditions for a hypothesized actual tail, not selection of that tail or of the nominal member's terminal geometry.

Falsifiers are failure of either complete source-window lower bound, omission of the distinct radial terminal source velocities, a nonintegrable actual-minus-affine row remainder under the stated linear growth and strict speed hypotheses, or a signed floor persisting with $\ell\cdot L<0$. No numerical or symbolic target was run.
