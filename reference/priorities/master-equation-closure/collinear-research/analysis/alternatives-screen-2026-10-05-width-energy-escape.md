# A stronger finite-width escape criterion from an integrating factor

The [first escape criterion](alternatives-screen-2026-10-05-width-escape-criterion.md) controls the self input at a hypothetical speed-floor crossing. A simpler sufficient condition follows by integrating the partner braking bound. The scalar used below is a mathematical comparison function; no physical mass, mechanical energy or conservation premise is introduced.

## Complete hypotheses

Use exactly the complete mirror finite-width law in the first criterion: fixed positive $h,\rho$, $c_f=K_{ij}=1$, triangular reception, softened radial kernel, and both full self and opposite-polarity partner channels. Let an actual release solution have a complete continuously differentiable nonincreasing past through a time $t_0$, with $x(s)\le a$ for every $s\le t_0$. Put $y=-x$, $u=-x'$, and assume

$$
y_0=y(t_0)>a,\qquad u_0=u(t_0)>0,\qquad
E_0:=\frac{u_0^2}{2}-\frac1{y_0-a}>0.
$$

Unlike the earlier criterion, this condition needs no chosen recent-window length, pre-entry acceleration bound, or superfield speed floor.

## Derived invariant and fate

While $u>0$, the complete path remains nonincreasing. Its self contribution to $u'$ is nonnegative, denoted $S\ge0$. Since $x(t)+x(s)\le-y(t)+a<0$, its entire partner channel is braking, denoted $P\ge0$. The complete partner clock $Q(s)=s-x(s)$ has derivative $1+u(s)\ge1$. Its triangular reception mass is at most one, and each displacement magnitude is at least $y-a$. Consequently

$$
u'=S-P,\qquad 0\le P\le\frac1{(y-a)^2}.
$$

Define the comparison function

$$
E(t)=\frac{u(t)^2}{2}-\frac1{y(t)-a}.
$$

Direct differentiation, using $y'=u$, gives

$$
E'=u\left[S-P+\frac1{(y-a)^2}\right]\ge uS\ge0.
$$

A first zero of $u$ is impossible, since it would give $E=-1/(y-a)<0$ despite $E\ge E_0>0$. More strongly $u(t)\ge U_0:=\sqrt{2E_0}>0$ at every future time. The global positive-width Volterra theorem supplies continuation for all finite times, so

$$
y(t)\ge y_0+U_0(t-t_0),\qquad
\int_{t_0}^\infty P(t)\,dt\le\frac1{U_0(y_0-a)}<\infty.
$$

Now $u+\int P$ is nondecreasing with derivative $S$. Thus $u$ has a finite positive or infinite limit. If its limit were $L\ge U_0>0$, its finite-age self integrand would converge to the affine-speed integrand. The complete-age tail is uniformly bounded by $4/(hw^2)$ for $w\ge2h$, so dominated convergence applies independently of the old-past range. The limit self input is

$$
S_{\rm aff}(L)=
\begin{cases}
\dfrac1{hL\rho}\left[1-\dfrac{\operatorname{arsinh}z}{z}\right],
&L\ne1,\quad z=\dfrac{Lh}{\rho|1-L|},\\
\dfrac1{h\rho},&L=1.
\end{cases}
$$

It is strictly positive for every $L>0$, while $P\to0$. Hence $u'\to S_{\rm aff}(L)>0$, a contradiction. Therefore

$$
u(t)\longrightarrow+\infty,\qquad y(t)/t\longrightarrow+\infty.
$$

The history never turns or recontacts. This theorem covers each of the four fixed selected $(h,\rho)$ pairs and, as a mathematical class statement, every fixed positive pair with the same full kernel.

## Scope and application boundary

This stronger criterion includes the separately constructed [compatible escaping preparations](alternatives-screen-2026-10-05-width-compatible-escape.md): their exact release values satisfy $y_0\ge10$, $u_0\ge20$, $a=1/2$, so $E_0\ge200-2/19>0$. For the original approaching preparations, reaching $y>a$ with positive $E$ still needs an analytical or rigorously bounded continuous-history entry argument. The measured finite trajectories are candidates, not such a proof.

> Claim grade: derived, independent assessment requested. Falsifiers are a failure of the full partner mass bound, an incorrect sign in $E'$, or a complete nonincreasing history satisfying the entry inequalities whose actual future turns or has a finite terminal speed. The comparison function is not an imported physical account and is not claimed conserved.
