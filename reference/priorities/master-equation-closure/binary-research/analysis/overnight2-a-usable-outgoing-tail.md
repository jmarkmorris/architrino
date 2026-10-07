# Explicit error bounds throughout the canonical outgoing tail

**Status: derived subject awaiting independent assessment.** The [accepted speed-scale theorem](overnight2-a-reference-terminal-speed-scale.md) gives all-future dispersal, an outward first account-zero entry, a positive terminal relative speed and a controlled account derivative for the unchanged nominal pair and its original complete spatial history neighborhood. This companion converts those facts into usable bounds at every later separation. It does not run a longer orbit or introduce another physical case.

Use exactly that theorem's notation, coefficients, complete histories, ordinary roots and $c_f=1$. Let $T_e$ be the actual first auxiliary-account zero, $d_e=d(T_e)$, $\delta=|U_\infty|$, $\chi=K/d$, $k=K/d^2$ and $c_\beta=441/380$. The inherited strict bounds are

$$
2\times10^6<d_e<4\times10^7,
\quad 2\times10^{-11}<\delta<5\times10^{-10},
\quad \chi\le\chi_e<2.25\times10^{-13},
$$
$$
u>\frac43\sqrt\chi,\quad |V_i|<2\times10^{-6},
\quad \Lambda=|v|^2/\chi<3,
\quad 1.99k\chi<\mathcal J'<2.01k\chi,
\quad \mathcal J_\infty=\delta^2/2.
\tag{1}
$$

The prior source histories retain their own declared speed bounds. The number $c_\beta$ still comes from the whole accessible generated ceiling $1/20$, so the error estimates do not assign a smaller speed to an earlier source window.

## The radial speed stays above its terminal value

Integrating the account derivative from any current $T\ge T_e$, using $u>(4/3)\sqrt\chi$, gives

$$
0<\mathcal J_\infty-\mathcal J(T)<1.005\chi(T)^{3/2}.
\tag{2}
$$

The exact scalar identity is

$$
u^2=2\mathcal J+(4g+2u-\Lambda)\chi.
$$

In the lower estimate use (2), $g\ge1-(2\times10^{-6})^2$, $\Lambda<3$ and $u>0$. In the upper estimate use $\mathcal J\le\mathcal J_\infty$, $g\le1$, $\Lambda\ge0$ and $u\le4\times10^{-6}$. Since $2.01\sqrt{\chi_e}<1.01\times10^{-6}$, these yield

$$
\boxed{\delta^2+.99\chi<u^2<\delta^2+4.01\chi.}
\tag{3}
$$

Thus $u>\delta$ holds on the entire outgoing tail, not only eventually. This is not a claim that $u$ is decreasing at every time; the existing terminal expansion supplies eventual decrease separately. Subtracting the positive square roots also gives

$$
0<u-\delta<\frac{2.005\chi}{\delta}.
\tag{4}
$$

## Explicit terminal-velocity and position enclosures

The stronger radial lower bound in (3) makes the remaining acceleration weight satisfy

$$
\int_T^\infty k\,dt<\frac1\delta\int_{d(T)}^\infty\frac K{r^2}\,dr
=\frac{\chi(T)}\delta.
$$

The original complete-source acceleration estimate $|A_i|\le c_\beta k$ therefore proves

$$
|V_i(T)-v_i|<\frac{c_\beta\chi(T)}\delta,
\qquad
|U(T)-U_\infty|<\frac{2c_\beta\chi(T)}\delta.
\tag{5}
$$

These are actual vector-ball enclosures of the terminal velocities around a current state, conditional only on that state belonging to this already proved continuation. The speed interval in (1) can replace the unknown $\delta$ by its lower endpoint for a weaker entirely numerical coefficient. A current state belonging to another history is not admitted by these formulas.

For $\tau=T-T_e\ge0$, one has $d(T)>d_e+\delta\tau$ when $\tau>0$. Integrating (5) from entry gives

$$
\left|X_i(T)-X_i(T_e)-v_i\tau\right|
\le\frac{c_\beta K}{\delta^2}
\log\left(1+\frac{\delta\tau}{d_e}\right).
\tag{6}
$$

The non-strict sign includes $\tau=0$. This is an explicit logarithmic position-error bound. It is compatible with, and weaker in coefficient information than, the separately accepted exact terminal expansion $X_i=v_iT-B_i\log T+C_i+O(\log T/T)$. It does not set $B_i$ or $C_i$ to zero.

An additional tail-account estimate follows from $u>\delta$:

$$
0<\mathcal J_\infty-\mathcal J(T)
<\frac{1.005\chi(T)^2}{\delta}.
\tag{7}
$$

Both (2) and (7) hold, so their minimum is available without guessing a transition time.

## Passage-time bounds with an elementary primitive

For any $D>d_e$, let $T_D$ be its unique attained time after entry. Monotone unbounded separation guarantees this actual event. Define, for $c>0$ and $r>0$,

$$
F_c(r)=\frac{\sqrt{r(\delta^2r+cK)}}{\delta^2}
-\frac{cK}{\delta^3}\operatorname{arsinh}
\left(\delta\sqrt{\frac r{cK}}\right).
$$

Direct differentiation gives $F_c'(r)=1/\sqrt{\delta^2+cK/r}$. Inserting (3) in $dt=dd/u$ yields

$$
F_{4.01}(D)-F_{4.01}(d_e)
<T_D-T_e
<F_{.99}(D)-F_{.99}(d_e).
\tag{8}
$$

The primitive is a calculus identity, not an imported physical trajectory. These bounds cover the entire outward passage between the two attained radii, including the change from the square-root speed scale to the positive terminal speed. They give time since the first zero; they do not calculate the absolute value of $T_e$.

## A quantitative limiting-direction bound

Put $N_\infty=U_\infty/\delta$, which exists because $\delta>0$. From (5),

$$
N\cdot U_\infty\ge u-|U-U_\infty|
>\delta-\frac{2c_\beta\chi}\delta.
$$

Thus $N\cdot N_\infty>0$ whenever $\chi\le\delta^2/10$, since $2c_\beta<2.322<10$. Projecting the integrated relative position onto the plane perpendicular to $N_\infty$ and using (5), $dt<dd/\delta$ gives

$$
|\Pi_\infty Z(T)|
\le d_e+\frac{2c_\beta K}{\delta^2}\log\frac{d(T)}{d_e}.
$$

For two unit vectors in the same open hemisphere their chord distance is at most twice the sine of their angle. Therefore

$$
|N(T)-N_\infty|
\le\frac2{d(T)}\left[d_e+
\frac{2c_\beta K}{\delta^2}\log\frac{d(T)}{d_e}\right]
\quad\text{if }\chi(T)\le\delta^2/10.
\tag{9}
$$

This explicit $\log(d)/d$ estimate concerns the relative separation direction, not the orbital-plane normal. It remains valid if the physical angular vector has the previously identified logarithmic growth or a degenerate limiting direction. It does not evaluate $N_\infty$ in the initial coordinate axes.

The proofs use only the accepted all-future account and source bounds, exact vector identities and elementary integrals. Falsifiers are a reversed radius-integral inequality, use of a terminal-vector direction before proving $\delta>0$, an incorrect derivative of $F_c$, application of the chord bound outside the same hemisphere, or substitution of a current velocity sample for the inherited complete-history admission. No numerical endpoint, new source preparation, instrument or scientific process is introduced. The [main A report](overnight2-a-followup-and-research-2026-10-07.md) retains this companion as provisional until independent assessment.
