# BP-011 Fold-Boundary Balance Correction

Status: first post-leading balance coefficient derived with uniform growing-lattice control; integer $A_n^{-5}$ balance coefficient remains open

## Result

The next balance term is not the odd-fold coefficient $-83/240$. The complete old-root background has a fold-boundary correction of order $eta_q^{-3/2}$, so the first correction to the balance-to-fold displacement has the fractional order $eta_q^{-9/2}$. For odd fold $q=2n-1$, let

$$
h=\frac\pi6,
\qquad
A_n=\frac{\pi(n+1)}3,
\qquad
\eta\!\left(\frac12\right)=\sum_{j=1}^{\infty}\frac{(-1)^{j+1}}{\sqrt j}.
$$

Then the prescribed equal-radius regular-phase balance satisfies

$$
\boxed{
\beta_n-eta_q
=\frac1{18\beta_q^3}
-\frac{\eta(1/2)}{27\sqrt{\pi/3}}\,\beta_q^{-9/2}
+o(\beta_q^{-9/2})
}.
$$

Combining this result with the already derived odd-fold series gives

$$
\boxed{
\beta_n
=A_n-\frac1{2A_n}-\frac{17}{72A_n^3}
-\frac{\eta(1/2)}{27\sqrt{\pi/3}}A_n^{-9/2}
+o(A_n^{-9/2})
}.
$$

The coefficient is approximately $-0.0218929627127761$. The balance expansion therefore contains a proved term strictly between the previously known $A_n^{-3}$ term and the fold's $A_n^{-5}$ term.

Plainly: the next correction comes from the growing collection of old roots closest to the causal fold. It has a half-integer power, so copying the fold boundary's $-83/(240A_n^5)$ into the balance would skip the actual next term.

## Exact background decomposition

Use the accepted shifted-endpoint notation

$$
D_\beta(X)=A_{-,\beta}(X)-A_{+,\beta}(X),
\qquad
L(X)=-\frac1{2X^2},
\qquad
Q_\beta(X)=D_\beta(X)-L(X).
$$

At the odd fold $M(\beta_q)=qh$, the old background is exactly

$$
B_q(\beta_q)
=\sum_{k=1}^{q-1}(-1)^kD_{\beta_q}(kh)
-\sum_{k=q}^{q+5}(-1)^kA_{+,\beta_q}(kh).
$$

The extracted $L$ lattice sums to $3/2$ up to an alternating tail of order $O(\beta_q^{-2})$. The existing outward-rounded global-tail shape theorem proves that $Q_\beta(X)$ is positive and increasing in $X$ throughout the required high-speed chart. That theorem is unchanged here and supplies the monotone alternating-tail control needed below.

Plainly: the constant $3/2$ is removed exactly first. What remains is a regularized alternating sequence plus six explicit endpoint terms, so the fold boundary can be analyzed without summing a nonuniform fixed-level expansion term by term.

## Fold-boundary lattice limit

Reverse the regularized sum by writing $k=q-j$. For every fixed $j\geq1$, the two relevant endpoint deficits tend to $jh$ and $(j+6)h$. Direct expansion of the two implicit increasing-branch roots at their simple quadratic maxima gives

$$
\beta_q^{3/2}Q_{\beta_q}((q-j)h)
\longrightarrow
\frac1{4\sqrt{2h}}
\left(\frac1{\sqrt j}+\frac1{\sqrt{j+6}}\right).
$$

For the six terminal plus-branch terms, with $j=1,\ldots,6$ measured backward from their fold,

$$
A_{+,\beta_q}((q+6-j)h)
=\frac1{4\beta_q}
-\frac1{4\sqrt{2jh}}\beta_q^{-3/2}
+o(\beta_q^{-3/2}).
$$

The six $1/(4\beta_q)$ terms cancel exactly because their signs alternate. Since $q$ is odd, the reversed interior signs are $(-1)^{j+1}$. The terminal six coefficients cancel the first six terms introduced by shifting $j$ to $j+6$, leaving

$$
\begin{aligned}
\lim_{q\to\infty\atop q\text{ odd}}
\beta_q^{3/2}\left(B_q(\beta_q)-\frac32\right)
&=\frac1{4\sqrt{2h}}
\left[
2\eta\!\left(\frac12\right)
\right]\\
&=\frac{\eta(1/2)}{2\sqrt{\pi/3}}.
\end{aligned}
$$

This passage is uniform rather than a fixed-level interchange. For a fixed reverse cutoff $J$, the finite endpoint expansions are uniform. Beyond $J$, the accepted $Q$ monotonicity and the quadratic fold estimate bound the scaled alternating remainder by $C/\sqrt J$, uniformly for all sufficiently large odd $q$. The extracted $L$ tail is $O(\beta_q^{-2})$, and the same endpoint estimate handles the six explicit plus terms. Taking $q\to\infty$ first and then $J\to\infty$ proves

$$
B_q(\beta_q)
=\frac32
+\frac{\eta(1/2)}{2\sqrt{\pi/3}}\beta_q^{-3/2}
+o(\beta_q^{-3/2}).
$$

Plainly: only a finite number of levels near the fold are expanded at once; the rest are bounded as one alternating tail. This is the control that the earlier fixed-$X$ series lacked.

## Transfer from background to balance

Put $\mu=M(\beta_n)-qh$. The local newborn pair has the uniform quadratic-fold expansion

$$
P_q(\beta_n)
=\frac1{2\sqrt2\,\beta_q^{3/2}\sqrt\mu}
\left[1+O(\beta_q^{-2})\right]
$$

when $\mu=O(\beta_q^{-3})$. The absence of a relative $\beta_q^{-3/2}$ term follows from expanding both roots about the same stationary maximum: the odd root-displacement terms cancel in their sum, while the first surviving geometric correction is relative order $\beta_q^{-2}$. The old background changes by $o(\beta_q^{-3/2})$ across the already proved $O(\beta_q^{-3})$ balance offset.

Tangential balance is $P_q=B_q$. Therefore

$$
\begin{aligned}
\mu
&=\frac1{8\beta_q^3B_q^2}\left[1+O(\beta_q^{-2})\right]\\
&=\frac1{18\beta_q^3}
-\frac{\eta(1/2)}{27\sqrt{\pi/3}}\beta_q^{-9/2}
+o(\beta_q^{-9/2}).
\end{aligned}
$$

Since $M'(\beta_q)=\sqrt{\beta_q^2-1}/\beta_q=1+O(\beta_q^{-2})$, replacing $\mu$ by $\beta_n-\beta_q$ changes the expansion only at order $O(\beta_q^{-5})$. This proves the displayed balance law.

Plainly: the positive boundary correction makes the old background slightly larger than $3/2$. The negative newborn pair must therefore remain slightly closer to its divergent fold value, which produces the negative $A_n^{-9/2}$ shift.

## Reproducibility and claim boundary

The tracked checker [check_bp011_fold_boundary_balance.py](../../../../scripts/equation-mapping/check_bp011_fold_boundary_balance.py) verifies the finite index-shift cancellation, the Dirichlet-eta coefficient, and the algebra transferring the background coefficient into the balance displacement. It is a consistency checker, not an independent numerical oracle. The independent mathematical support is the previously accepted and unchanged outward-rounded global-tail shape theorem, which supplies the uniform monotonicity and complement control used in the alternating remainder.

Derived: the $\beta_q^{-3/2}$ background coefficient, the $\beta_q^{-9/2}$ balance-to-fold coefficient, and the displayed $A_n^{-9/2}$ balance term. Open: a sharp remainder at order $A_n^{-5}$, the integer $A_n^{-5}$ balance coefficient, the corresponding next spacing term, and the compatible-radius correction at the same precision. A proof through $A_n^{-5}$ must retain the next fold-boundary term and the first surviving newborn correction; the fold's exact $-83/240$ contributes but is not the complete balance coefficient.

This prescribed acceleration balance establishes no evolution, retention, stability, binding, physical identity, score, or scientific acceptance. The result is falsified by a valid root inventory changing the exact shifted-endpoint decomposition, a failure of the cited outward-rounded shape sign, a fold-boundary sequence whose scaled background does not approach $\eta(1/2)/(2\sqrt{\pi/3})$, or an independently certified balance sequence whose scaled displacement violates the boxed coefficient.

Closure goal: derive the complete order-$A_n^{-5}$ balance coefficient with a sharp uniform remainder that retains both the next fold-boundary term and the newborn-pair correction.
