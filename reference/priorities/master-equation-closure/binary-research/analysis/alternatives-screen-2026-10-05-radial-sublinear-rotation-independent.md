# Sublinear rotating pairs: speed-margin obstruction and controlled expansion

## Results and selected problem

**Claim grade: derived candidates, requiring independent assessment.** Fix $0<p<1$, $K=R_*=c_f=1$, and the sharp ordinary radial acceleration $-N/(R^pD)$ for the opposite mirror planar pair $q,-q$. Two conclusions are proved below.

First, no global separated positively rotating future can retain one complete speed bound $b<1$. More precisely, every fixed speed level above the complete preparation speed and below one is attained in finite time on the maximal ordinary strict-subfield future. The proof uses the actual delayed radial acceleration and geometric areal rate, without a near-circle assumption.

Second, the [frozen compatible circle-tail family](alternatives-screen-2026-10-05-radial-sublinear-preparation-independent.md) admits a controlled near-circular expansion from launch speed $\epsilon$ to any sufficiently small fixed speed level $b$. The physical radius grows and the relative oscillation remains small. A corrected amplitude estimate controls the full retained history, including the patch and each source's own source interval. No delayed circle is treated as an equilibrium.

These results do not determine whether unit speed is attained at finite time. The remaining exact alternatives are a finite unit-speed endpoint at positive separation, or a global strict-subfield future whose speeds approach one along a sequence and whose radius is unbounded. The constants in the expansion are allowed to depend on the fixed exponent; no threshold uniform as $p$ approaches either endpoint is asserted.

The preparation was frozen as SHA-256 06323905616fea6a84ccc368aaffa492d411bab5b0e1d04b092d746aac4f55da before this future analysis was saved. This analysis was developed without reading a new coordinator sublinear-binary reference. Existing positive-response and general-power sources were inspected, and their required identities are reconstructed here with the changed sign and increasing speed scale.

## Exact roots, rotation and continuation

For the first theorem, supply a complete separated mirror planar locally $C^{2,1}$ past with speed at most $b_0<1$, nonnegative signed geometric areal rate, and strictly positive release value $H_0$. Write

$$
r=|q|,\qquad H=q\times q',\qquad
R=T-S=|q(T)+q(S)|,\qquad
N=\frac{q(T)+q(S)}R,\qquad D=1+N\cdot q'(S).
$$

The cross product is its signed component normal to the plane. These are physical variables in this section. Compatibility means the supplied release acceleration equals the ordinary received acceleration. The past need not satisfy the future equation.

Whenever the complete speed is bounded by $b<1$, the partner residual as a function of delay has monotonicity modulus at least $1-b$, starts at $-2r$, and tends to positive infinity in the complete past. Thus there is exactly one positive partner root. Every positive-delay self root is excluded by the strict speed chord inequality. In particular

$$
\frac{2r}{1+b}\le R\le\frac{2r}{1-b},\qquad
1-b\le D\le1+b.
$$

The causal interval also fixes the actual angular lift. Put $C=[q(S)+q(T)]/2$. At every $u\in[S,T]$,

$$
2|q(u)-C|
\le |q(u)-q(S)|+|q(u)-q(T)|
\le\int_S^T|q'(t)|\,dt<2|C|.
$$

Thus the path lies in one open half-plane through the origin and cannot wind there. The endpoint chord inequality gives $q(S)\cdot q(T)>0$. While rotation is nonnegative, its actual angle increment is therefore $0<\Delta\theta<\pi/2$, and

$$
H'=\frac{r\,r_S\sin\Delta\theta}{R^{p+1}D}>0.
$$

A first loss of positivity is excluded by this identity. Hence $H\ge H_0$, and on a speed-$b$ chart

$$
r\ge H_0/b>0.
$$

At a finite endpoint with speed bounded below one, position is bounded and the displayed radius and delay floors stay positive. The complete old-past speed bound bounds source times below; the delay floor bounds them away from the proposed endpoint. Source velocities and accelerations lie in a compact already supplied or generated interval. The implicit root has positive transmitter derivative, and velocity evaluation is locally Lipschitz there. Position-velocity steps shorter than the delay floor give ordinary local uniqueness and continuation. No other finite ordinary-domain failure precedes the first speed-$b$ event.

The same reasoning with strict speed on compact intervals gives the usual finite-endpoint alternative at unit speed: positive $H$ excludes contact, sources stay a positive time earlier, and the received acceleration and velocity have finite limits there. No post-unit continuation is selected.

## A radius bound on every fixed speed-margin chart

The exact radial acceleration of the received vector is

$$
A_r=-\frac{r+r_S\cos\Delta\theta}{R^{p+1}D}.
$$

Since $\cos\Delta\theta>0$ and the complete range bounds hold,

$$
A_r\le-c_b r^{-p},\qquad
c_b=\frac{(1-b)^{p+1}}{2^{p+1}(1+b)}>0.
$$

The polar radial equation and $H/r\le b$ consequently give

$$
r''=\frac{H^2}{r^3}+A_r
\le\frac{b^2}{r}-c_b r^{-p}.
$$

For $p<1$ the inward term dominates at large radius. Define

$$
L=\max\left\{r(0),\left(\frac{2b^2}{c_b}\right)^{1/(1-p)}\right\},
\qquad
M=\left[L^{1-p}+\frac{(1-p)b^2}{c_b}\right]^{1/(1-p)}.
$$

On $r\ge L$, one has $r''\le-(c_b/2)r^{-p}<0$. During any outward segment beginning at $r=L$, multiplication by the positive $r'$ and integration give

$$
(r')^2\le b^2-\frac{c_b}{1-p}
\left(r^{1-p}-L^{1-p}\right).
$$

Thus $r\le M$. If a segment above $L$ is already inward, its strictly negative radial second derivative prevents a new outward turn there. The same bound therefore holds on the whole speed-$b$ chart. This is an integral inequality for the actual delayed equation, not a conserved central energy.

## Finite attainment of every fixed subfield speed level

Suppose speed stayed below a fixed $b$ with $b_0<b<1$. The preceding continuation and radius bound would give a global future with $H_0/b\le r\le M$. Old negative-time sources disappear after $T>M+r(0)$: if $S\le0$, the supplied speed bound implies

$$
T-S\le M+r(0)-b_0S,
$$

and hence $T\le M+r(0)$. At all later receptions the entire causal interval is generated, $H\ge H_0$, $r,r_S\ge H_0$, and $R\le2M$. Therefore

$$
\Delta\theta=\int_S^T\frac{H(u)}{r(u)^2}\,du
\ge\frac{H_0R}{M^2}.
$$

Using $\sin z\ge2z/\pi$ on $[0,\pi/2]$ yields the fixed positive bound

$$
H'\ge \kappa_b,\qquad
\kappa_b=\frac{2H_0^3}{\pi(1+b)M^2(2M)^p}>0.
$$

This contradicts $H\le br\le bM$. In particular the first speed-$b$ event occurs no later than

$$
T_b\le M+r(0)+\frac{bM}{\kappa_b}.
$$

The bound is conservative, history-scoped and finite. All roots and coefficients remain regular at this event, and separation is positive. The conclusion excludes a global uniform speed margin, not a global strict-subfield future whose supremum speed is one. The constants $c_b$, $M$ and $\kappa_b$ degenerate as $b\uparrow1$, so their finite-level bounds do not imply a finite unit-speed time.

A global strict-subfield future cannot remain bounded even without a common speed margin: if $r\le M$, old sources again disappear, $r>H_0$, $D<2$ and $R\le2M$ give the same positive torque floor with $1+b$ replaced by two. This contradicts $H<r\le M$. It proves unbounded radius in the remaining global alternative, without asserting convergence of the radius to infinity.

## Frozen circle-tail family and increasing local speed scale

Now restrict to the frozen family, with physical radius scale $r_0=(2^p\epsilon^2)^{1/(1-p)}$, scaled clock $s=\epsilon T/r_0$, and $q=r_0Y$. In the rest of the proof $r=|Y|$, $u=Y'\cdot n$, $v=Y'\cdot t$, $h=Y\times Y'=rv$ are scaled variables; $n=Y/r$ and $t$ is its positive quarter-turn. Physical signed areal rate is $H=\epsilon r_0h$.

Set

$$
\beta=p-1<0,\quad m=3-p>2,\quad
\alpha=\beta/2,\quad k=2/m,\quad d_+=(1-p)/m>0,
$$

$$
a=h^{2/m},\quad x=r/a,\quad y=a^\alpha u,\quad
\delta=\epsilon a^{-\alpha},\qquad
\frac{d\eta}{ds}=a^{-(p+1)/2}.
$$

The exact identities are $h^2=a^m$, $v=a^{-\alpha}/x$, and

$$
|q'(T)|=\delta\sqrt{y^2+x^{-2}}.
$$

Positive torque gives $a\ge1$ and now $\delta\ge\epsilon$, increasing with time. The speed scale grows; the decreasing-$\delta$ argument for $p>1$ cannot be reused. Work provisionally in a fixed small neighborhood of $(x,y)=(1,0)$ with $\delta\le\delta_*(p)$, to be chosen small. Current physical speed is at most $C_p\delta$. The entire generated past has no larger $\delta$, so the frozen supplied history and generated future share a speed bound $C_p\delta_*<1/2$.

## Uniform control of the complete source windows

The complete root estimate gives $R_d\asymp r\asymp a$, scaled delay $\ell=s-\sigma=O_p(\epsilon a)$, and $D$ bounded away from zero. Generated earlier scales satisfy $a(q)\le a(s)$. Since $-\alpha=(1-p)/2>0$, their velocities satisfy

$$
|Y'(q)|\le C_pa(q)^{-\alpha}\le C_pa(s)^{-\alpha}.
$$

The supplied circle and patch obey the same upper bound because $a(s)\ge1$. Integrating over the actual receiving interval gives

$$
|Y(q)-Y(s)|\le C_p\epsilon a^{1-\alpha}=C_p\delta a.
$$

Hence every radius in the window is comparable to the receiving $a$, and generated scales there are comparable as well. The exact acceleration is bounded by $C_pa^{-p}$. A source's own source interval satisfies the same estimates, by applying the complete root bound again; the finite enlargement of the interval changes only the fixed constant.

If a receiving window intersects supplied time, its source radius is bounded by the circle-tail preparation. Since $s\le\epsilon(r+r_\sigma)$ and the physical speed is small, the displacement from release gives $r\le1+C_p\delta_*(r+2)$. Thus $r$ and $a$ are bounded there, $s=O_p(\epsilon)$, and integrating the bounded torque gives $a=1+O_p(\epsilon^2)$ and $\delta=\epsilon[1+O_p(\epsilon^2)]$. The original circle and patch supply bounded acceleration and a central-acceleration discrepancy $O_p(\epsilon)$ on precisely this initial window.

At every generated point in a window, the exact chord and transmitter estimates give an acceleration discrepancy $O_p(\delta a^{-p})$ from the receiving vector $-r^{-p}n$. Changes of that central vector across the window have the same order. Together with the supplied-segment observation, this proves the integrated second-order expansions below over the entire actual retained interval. No jerk bound, renewed circular source, or periodic-history replacement is used.

## Signed acceleration expansion and shifted radial equation

Write $\ell=2\epsilon rL$, $L=R_d/(2r)$. Integral Taylor expansion in the receiving axes gives

$$
\begin{aligned}
[Y(s)+Y(\sigma)]_r&=2r-\ell u-\tfrac12\ell^2r^{-p}+O_p(\delta^3a),\\
[Y(s)+Y(\sigma)]_t&=-\ell v+O_p(\delta^3a),\\
Y'_r(\sigma)&=u+\ell r^{-p}+O_p(\delta^2a^{-\alpha}),\\
Y'_t(\sigma)&=v+O_p(\delta^2a^{-\alpha}).
\end{aligned}
$$

The implicit norm equation has a derivative bounded away from zero. Substitution with a cubic residual therefore proves

$$
\begin{aligned}
L&=1-\epsilon u+\epsilon^2(u^2-r^{1-p}+v^2/2)+O_p(\delta^3),\\
N_t&=-\epsilon v+O_p(\delta^3),\qquad N_r=1-\epsilon^2v^2/2+O_p(\delta^3),\\
D&=1+\epsilon u+\epsilon^2(2r^{1-p}-v^2)+O_p(\delta^3).
\end{aligned}
$$

Multiplication of $L^{-p}$, $D^{-1}$ and the direction gives the actual signed components

$$
\begin{aligned}
A_r={}&-r^{-p}\left\{1+\beta\epsilon u+
\epsilon^2\left[\frac{\beta(p-2)}2u^2+(p-2)r^{1-p}-\frac\beta2v^2\right]\right\}
O_p(\delta^3a^{-p}),\\
A_t={}&r^{-p}[\epsilon v+\beta\epsilon^2uv]+O_p(\delta^3a^{-p}).
\end{aligned}
$$

These formulae follow from the full-delay expansion, not from a change of exponent in a claimed future theorem. They agree algebraically with the previously fixed $p=2$ and $p=3/2$ rows when evaluated there, providing checks of the coefficients.

Define

$$
f(x)=x^{-3}-x^{-p},\quad
\gamma=\frac{p\beta}{m}<0,\quad
q_p=\frac{\beta^2}{m}-\frac{\beta(p-2)}2,\quad
w=y-k\delta x^{1-p}.
$$

Direct differentiation of $a=h^{2/m}$ and the polar equations gives

$$
\begin{aligned}
x_\eta&=w-k\beta\delta^2x^{1-p}w+O_p(\delta^3),\\
w_\eta&=f(x)+\gamma\delta x^{-p}w
+\delta^2[q_px^{-p}w^2+G_0(x)]+O_p(\delta^3),\\
\delta_\eta&=d_+\delta^2x^{-p}(1+\beta\delta y)+O_p(\delta^4),\\
a_\eta/a&=k\delta x^{-p}(1+\beta\delta y)+O_p(\delta^3),
\end{aligned}
$$

where

$$
G_0(x)=A_px^{1-2p}+\frac{\beta}{2}x^{-p-2},
\qquad A_p=\frac{2\beta^2}{m^2}+2-p.
$$

For a check on the sign change, the coefficient of the linear $y$ term before drift subtraction is $\beta(p-2)/m$. Subtraction adds $k\beta$, giving $\gamma=p\beta/m<0$. The positive $\delta$ derivative must also be retained when differentiating $w$; dropping it changes $G_0$. All remainders are bounded actual history contributions and are not differentiated.

## A damped amplitude estimate with increasing parameter

Introduce the analytical potential

$$
V(x)=\frac1{2x^2}-\frac{x^{1-p}}\beta+\frac1\beta-\frac12,
\qquad V'=-f,\quad V(1)=V'(1)=0,\quad V''(1)=m,
$$

and

$$
G(x)=\frac{A_p}{2\beta}(1-x^{-2\beta})
+\frac{\beta}{2(p+1)}(1-x^{-p-1}),\qquad G'=G_0.
$$

For small $\delta$, $V_\delta=V-\delta^2G$ has a unique nearby minimum $x_\delta=1+O_p(\delta^2)$ with derivative $dx_\delta/d\delta=O_p(\delta)$. Set

$$
X=x-x_\delta,\quad
E=\tfrac12w^2+V_\delta(x)-V_\delta(x_\delta),\quad
\mathcal L=E-\frac{\gamma}{2}\delta Xw,\quad J=\sqrt{\mathcal L}.
$$

In the fixed neighborhood, $\mathcal L\asymp X^2+w^2$. These are proof devices, not a conserved physical energy. At release $x=1$, $y=0$, $\delta=\epsilon$, so

$$
J(0)=\frac{k}{\sqrt2}\epsilon+O_p(\epsilon^3).
$$

Differentiating $E$ cancels the constant term $\delta^2G_0$ against the corrected potential. The moving parameter contributes $O_p(\delta^3J)$; its sign is not used. Multiplying the actual cubic response remainders by the displacement or velocity also gives $O_p(\delta^3J)$. Consequently

$$
E_\eta=\gamma\delta x^{-p}w^2+O_p(\delta^2E)+O_p(\delta^3J),
$$

while

$$
(Xw)_\eta=w^2-mX^2+O_p(J^3+\delta J^2+\delta^3J).
$$

The cross correction removes the leading phase dependence and proves

$$
\left|\mathcal L_\eta-\gamma\delta\mathcal L\right|
\le C_p\delta(J+\delta)\mathcal L+C_p\delta^3J.
$$

For $J>0$ this yields

$$
J_\eta\le\frac{\gamma}{2}\delta J
+C_p\delta(J+\delta)J+C_p\delta^3.
$$

The same upper estimate holds for the upper right derivative at $J=0$, by the underlying smooth positive quadratic norm. No positive amplitude floor or logarithm of $J$ is needed.

Choose a fixed $M_p>k/\sqrt2$, then choose $\delta_*(p)$ sufficiently small. At a proposed first boundary $J=M_p\delta$, the last inequality is negative to leading order, whereas $(M_p\delta)_\eta>0$. Thus

$$
J\le M_p\delta
$$

throughout the chart. This closes the small neighborhood of $x,y$ and the complete speed bound by making $\delta_*$ smaller once. In particular $\delta_\eta=d_+\delta^2[1+O_p(J+\delta^2)]>0$.

Dividing the amplitude upper inequality by this positive derivative and using the barrier gives

$$
\frac{dJ}{d\delta}\le-\frac p2\,\frac J\delta+C_pJ+C_p\delta.
$$

Multiplication by the positive integrating factor $\delta^{p/2}e^{-C_p\delta}$ and integration from $\epsilon$ prove the sharper estimate

$$
J(\delta)\le C_p\left[
\epsilon\left(\frac{\epsilon}{\delta}\right)^{p/2}
+\delta^2\right],
\qquad \epsilon\le\delta\le\delta_*.
$$

Thus the launch oscillation decays relative to the increasing radius scale. The $\delta^2$ term is a controlled upper bound on the residual driven displacement. This does not claim exact damping to a circle or determine a coefficient hidden in that bound.

## Finite passage, physical radius, velocity, time and angle

For fixed $\epsilon>0$, the condition $\delta\le\delta_*$ bounds $a\le(\delta_*/\epsilon)^{2/(1-p)}$. Radius is bounded above and away from zero, complete speed is below $1/2$, and the source windows have the ordinary margins already proved. Continuation therefore applies until $\delta=\delta_*$. Since $\delta_\eta\ge c_p\delta^2$, that event takes finite $\eta$; the bounded factor $ds/d\eta=a^{(p+1)/2}$ makes its scaled and physical times finite as well.

Let

$$
\mathcal E_\epsilon(\delta)=
\epsilon(\epsilon/\delta)^{p/2}+\delta^2,\qquad
n_p=\frac2{1-p},\quad \lambda_p=\frac{2p}{1-p},\quad
C_r=2^{p/(1-p)}.
$$

The exact scale identities and amplitude estimate give, uniformly to that event,

$$
\begin{aligned}
x&=1+O_p(\mathcal E_\epsilon),&
y&=k\delta+O_p(\mathcal E_\epsilon),\\
|q(T)|&=C_r\delta^{n_p}[1+O_p(\mathcal E_\epsilon)],&
|q'(T)|&=\delta[1+O_p(\mathcal E_\epsilon)],\\
\frac{d|q|}{dT}&=k\delta^2+O_p(\delta\mathcal E_\epsilon),&
H(T)&=C_r\delta^{m/(1-p)}.
\end{aligned}
$$

The last identity is exact. The radial derivative estimate proves outward motion at a fixed small $\delta$ once $\epsilon$ is sufficiently smaller; it does not assert monotone radius at every earlier phase.

The scale equation in $s$ is

$$
\frac{d(a^p)}{ds}=pk\epsilon[1+O_p(J+\delta^2)].
$$

Because $J+\delta^2\le C_p(\epsilon+\delta^2)$ along the entire earlier interval, its integrated inverse gives the physical arrival time at scale $\delta$:

$$
T(\delta)=\frac{C_r}{pk}
\left(\delta^{\lambda_p}-\epsilon^{\lambda_p}\right)
\left[1+O_p(\epsilon+\delta^2)\right].
$$

This is the elapsed time since release, retaining the dependence on the singularly small initial radius.

For the angle, $\theta_\eta=x^{-2}$ exactly, so

$$
\frac{d\theta}{d\delta}
=\frac1{d_+\delta^2}\left[1+O_p(J+\delta^2)\right].
$$

The oscillatory contribution integrates to a bounded error because

$$
\int_\epsilon^\delta
\epsilon^{1+p/2}z^{-2-p/2}\,dz\le C_p.
$$

It follows that

$$
\theta(\delta)-\theta(0)
=\frac{3-p}{1-p}\left(\frac1\epsilon-\frac1\delta\right)+O_p(1).
$$

Every fixed-$\epsilon$ passage has finite angle. The number of turns before a fixed small speed grows as $\epsilon^{-1}$ across this family; no terminal-angle claim for the full future follows.

To state the result at an actual speed rather than an auxiliary coordinate, choose a fixed sufficiently small $b>0$ with $2b\le\delta_*$, and then sufficiently small $\epsilon<b/4$. Speed at $\delta=b/2$ is below $b$, while at $\delta=2b$ it exceeds $b$. The first speed-$b$ time therefore occurs in this controlled chart, with

$$
\delta(T_b)=b[1+O_p(\epsilon+b^2)],\qquad
|q(T_b)|=C_rb^{n_p}[1+O_p(\epsilon+b^2)],
$$

$$
T_b=\frac{C_r}{pk}(b^{\lambda_p}-\epsilon^{\lambda_p})
[1+O_p(\epsilon+b^2)],
\qquad
\theta(T_b)-\theta(0)
=\frac{3-p}{1-p}\left(\frac1\epsilon-\frac1b\right)+O_p(1).
$$

The constants are independent of $\epsilon$ and the sufficiently small chosen $b$, for this fixed exponent. These estimates are two-small-parameter bounds, not exact fixed-$b$ limits after discarding an $O_p(b^2)$ error. For example, taking $\epsilon/b\to0$ and then $b\to0$ gives the displayed leading coefficients. No finite numerical admission threshold has been established.

## Remaining fate question, falsifiers and independent validation

The exact speed-level theorem applies after this controlled passage as long as the ordinary strict-subfield solution continues. It proves that every subsequent fixed level below one must be attained. It does not bound their arrival times uniformly as those levels approach one. Hence finite unit arrival, infinite-time approach to unit speed, detailed large-speed radius behavior and total future angle remain unresolved by this source.

Load-bearing falsifiers are: an extra ordinary root under the complete speed bound; a violation of the causal half-plane inequality; failure of the radial projection bound; an excursion past the displayed $M$; a bounded global rotating future despite the fixed torque floor; a source or source-of-source interval violating the scale estimates; a wrong signed coefficient in the cubic row; failure of the moving-minimum cancellation; or a first exit from $J\le M_p\delta$ before the selected $\delta_*$ event. A finite-speed computation without an independently certified admission threshold is not a theorem-level counterexample.

Independent assessment can reconstruct the complete root geometry and the radius-excursion bound without the local expansion, and separately derive the signed Taylor row and the damped norm inequality from the frozen patch. This separates the global obstruction from the local approximation. Neither a tangent sign nor agreement with the $p>1$ source is used as an acceptance premise.

Source identities were measured with shasum -a 256:

| Source | SHA-256 |
| --- | --- |
| Frozen sublinear preparation | 06323905616fea6a84ccc368aaffa492d411bab5b0e1d04b092d746aac4f55da |
| [Positive radial rotating geometry](alternatives-screen-2026-10-05-radial-rotating-class.md) | aa271d167786273f8c040c3eda5e116888b7f40df68317dbb9270682f30c1c9a |
| [Earlier general-power preparation](alternatives-screen-2026-10-05-radial-power-family-preparation.md) | 5bb3bf495cdb40975f86d1c7ff8e14398848f3e094bfcd6a739a8ef215beed04 |
| [Earlier signed general-power row](alternatives-screen-2026-10-05-radial-power-family-transition.md) | 5974cc0f89a7597dd6f765d166735f627361225ac8cafd4de23326d82c37fbb3 |
| [Master Equation root-weight owner](../../../../../content/markdown/aaa/dynamics/master-equation.md) | 8a106d615611efe5b6baf8705a47f03edcf53ffe13d7998fb7af86432c139f7f |

Only the new sublinear preparation and this independent analysis were authored. Validation consists of the displayed analytical reconstruction and a scoped whitespace check after creation. No new executable instrument, numerical target, Python process, background computation, regeneration or existing-source edit was used. Scientific integration remains subject to independent assessment.
