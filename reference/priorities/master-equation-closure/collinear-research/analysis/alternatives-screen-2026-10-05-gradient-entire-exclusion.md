# Entire separated uniformly subfield histories are excluded for the gradient law

The [collinear gradient identities](alternatives-screen-2026-10-05-collinear.md) imply conditional future dispersal for a prepared solution that remains uniformly subfield. Requiring the same equation on the entire real line yields a stronger nonexistence theorem. This does not negate forward solutions from externally specified compatible pasts: those pasts need not solve the equation before release.

## Selected equation and exact identities

Use the selected Section 6 amplitude-gradient law with $K=c_f=1$, two opposite-polarity labels, every original self/partner root, complete compatible $C^{2,1}_{\rm loc}$ histories, and

$$
x_1(t)>x_2(t),\qquad |v_i(t)|\le1-\eta,\qquad \eta>0,
\qquad t\in\mathbb R.
$$

Require the equation at every real time. Each receiver has one past partner root and no self root; let its range and transmitter factor be $R_i>0$, $D_i\ge\eta$. Define

$$
\Psi_i=\frac1{R_iD_i},\quad
F(v)=v-\frac{v^2}2,\quad H(v)=v+\frac{v^2}2,
$$

$$
L=F(v_1)+\Psi_1,\qquad J=H(v_2)-\Psi_2.
$$

The separately derived total-path identities give

$$
L'=-D_1\Psi_1^2=-\frac1{R_1^2D_1}<0,
\qquad
J'=D_2\Psi_2^2=\frac1{R_2^2D_2}>0.
$$

The elementary velocity bounds on $[-1,1]$ are $-3/2\le F\le1/2$ and $-1/2\le H\le3/2$.

## Backward Riccati bound

An entire solution must satisfy $L\le1/2$ at every time. Otherwise $z=L-1/2$ is positive at some $t_0$ and remains positive for every earlier time by monotonicity. Since $\Psi_1=L-F(v_1)\ge z$,

$$
z'\le-\eta z^2,\qquad (1/z)'\ge\eta.
$$

For $t<t_0$ this implies $1/z(t)\le1/z(t_0)-\eta(t_0-t)$, impossible sufficiently far in the past. Likewise if $J<-1/2$, the positive function $z=-1/2-J$ satisfies the same backward Riccati contradiction because $\Psi_2=H(v_2)-J\ge z$. Therefore every proposed entire solution obeys

$$
-3/2<L\le1/2,\qquad -1/2\le J<3/2.
$$

Both monotone functions consequently have finite limits at both temporal infinities, and

$$
0<I_i:=\int_{-\infty}^{\infty}\frac{dt}{R_i(t)^2D_i(t)}<\infty.
$$

## Two-ended separation gives incompatible velocity ordering

Let $r=x_1-x_2>0$. Complete uniform subfield geometry gives $R_i\le r/\eta$ and $D_i\le2-\eta$, so the positive integral controls $\int_{\mathbb R}r^{-2}\,dt<\infty$. Also $r$ is globally Lipschitz. If it had a bounded subsequence toward either temporal infinity, uniformly sized disjoint neighborhoods of that subsequence would make this integral diverge. Thus

$$
r(t)\longrightarrow\infty\quad\text{as }t\to\pm\infty.
$$

The opposite root bound $R_i\ge r/(2-\eta)$ and $D_i\ge\eta$ now give $\Psi_i\to0$ at both ends. The monotone $L,J$ limits and the strictly increasing maps $F,H$ on the uniformly subfield velocity interval establish finite individual velocity limits $v_i^\pm$. Integrating the exact identities over the whole line gives

$$
F(v_1^+)-F(v_1^-)=-I_1<0,\qquad
H(v_2^+)-H(v_2^-)=I_2>0.
$$

Hence $v_1^+<v_1^-$ and $v_2^+>v_2^-$. The terminal relative velocities therefore satisfy

$$
w^+:=v_1^+-v_2^+<v_1^--v_2^-=:w^-.
$$

But positivity of $r$ on the entire line, together with existence of these derivative limits, requires $w^-\le0$ and $w^+\ge0$: a positive past limit of $r'$ would drive $r$ negative backward, and a negative future limit would drive it negative forward. This contradicts $w^+<w^-$. No proposed entire solution exists.

> Claim grade: derived, independent assessment requested. This excludes the complete all-time separated uniformly subfield two-label gradient solution class. It does not exclude compatible prepared forward histories, solutions losing a uniform speed margin at temporal infinity, contact-bearing histories, or more labels. Checkable falsifiers are failure of the backward Riccati inequality, the two-ended inverse-square integrability argument, or an entire solution satisfying every stated assumption.
