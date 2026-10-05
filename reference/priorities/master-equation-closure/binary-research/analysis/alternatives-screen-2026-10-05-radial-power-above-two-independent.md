# Independent extension of the compatible radial-power family to powers below three

## Result and independence boundary

**Claim grade: derived candidate for independent assessment.** For every fixed $2<p<3$, the explicit circle-tail preparation and compatibility patch of the [fixed-power family](alternatives-screen-2026-10-05-radial-power-family-preparation.md), evaluated at that exponent without changing any coefficient or history formula, have the following properties for every sufficiently small positive launch parameter $\epsilon$:

1. The actual delayed future has a unique ordinary mirror-planar continuation for all physical time. It remains separated and uniformly below $c_f=1$, with the complete one-partner/no-positive-delay-self root census.
2. Member radius tends to infinity, physical areal rate has a finite positive limit, polar angle has a finite limit, and physical velocity tends to a nonnegative outward radial vector.
3. Zero-terminal-speed launch parameters accumulate at zero. No particular parameter or numerical admission threshold is determined.

For a fixed member, positive terminal speed gives radius comparable to $T$, and zero terminal speed gives radius comparable to $T^{2/(p+1)}$. The constants and admission threshold may depend on the fixed exponent and member. No threshold uniform as $p\uparrow3$, positive-speed parameter, discrete zero set, nonmirror stability, arbitrary-history fate or stable binding is established.

This derivation was developed independently from the frozen preparation, transition, global and terminal-selection sources for $1<p\le2$, before reading any new coordinator extension source. Those earlier statements do not themselves assert the present extension. Three changes are proved here: continuous unique auxiliary flow and discrete full-cycle increments replace the differentiable orbit-corrector argument; an integrable singular angular clock replaces the earlier bounded angular clock; and an exact determinant cancellation replaces the earlier restriction on the winding exponent. The Hale role is an analytical lens, not an acceptance authority. The new proof requires separate assessment before scientific integration.

## Scenario, compatible preparation and complete roots

The selected acceleration law changes only the radial magnitude of the [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#per-hit-acceleration) to $R^{-p}$. It retains $K=R_*=c_f=1$, opposite-polarity mirror labels $q,-q$, the original transmitter factor and all ordinary self/partner roots. No receiver multiplier, memory term, speed cap, physical energy law or event prescription is added.

Set

$$
r_0=(2^p\epsilon^2)^{-1/(p-1)},\qquad
s=\epsilon T/r_0,\qquad q(T)=r_0Y(s).
$$

The identity $\epsilon^2/r_0=(2r_0)^{-p}$ gives the exact scaled future equation

$$
Y''=-\frac{2^pN}{R_d^pD},\qquad
R_d=|Y(s)+Y(\sigma)|,\quad s-\sigma=\epsilon R_d,
\quad D=1+\epsilon N\cdot Y'(\sigma).
$$

Primes here denote $s$ derivatives. Use precisely the old circle $Y_c=(\cos s,\sin s)$, the source angle $\xi=\epsilon\cos\xi$, the patch width $d_0=\epsilon/16$, and the polynomial

$$
\phi(s)=\frac{d_0^2}{2}z_p^3(1-z_p)^2,\qquad z_p=1+s/d_0.
$$

For $s\le-d_0$ supply $Y_c$; on $[-d_0,0]$ supply $Y_c+\phi B_p$, where

$$
A_{c,p}=-\frac{(\cos\xi,-\sin\xi)}{\cos^p\xi(1+\epsilon\sin\xi)},
\qquad B_p=(1,0)+A_{c,p}.
$$

This is the same formula as the frozen family, now at the selected exponent. For $2<p<3$ and $0<\epsilon\le1/16$, its radial discrepancy is at most $2\epsilon^2$: use $1/(1+\epsilon^2)\le\cos^{1-p}\xi/(1+\epsilon\sin\xi)\le(1-\epsilon^2/2)^{-2}$. Its transverse component is at most $\epsilon(1-\epsilon^2/2)^{-3}<2\epsilon$. Thus $|B_p|\le4\epsilon$ still holds. The original polynomial bounds consequently retain complete supplied speed below two in scaled units, radius between $3/4$ and $5/4$, acceleration below eight, and positive supplied areal rate. The physical speed is strictly below one for small launches.

The old-seam jets of $\phi$ are zero through second derivative; at release the jets are $(0,0,1)$. The complete history is locally $C^{2,1}$, with $Y(0)=(1,0)$, $Y'(0)=(0,1)$ and $Y''(0-)=A_{c,p}$. The release root $\sigma=-2\xi<-\epsilon<-d_0$ still lies in the unchanged old circle. It remains the only root: the complete partner residual in physical delay has slope at least $1-b>0$ for a complete speed bound $b<1$, starts negative and tends to positive infinity. The strict speed chord inequality excludes every positive-delay self root. This verifies exact release compatibility and complete source coverage without requiring the supplied past to solve the released equation.

On any compact separated strict-speed chart, partner delay and transmitter factor have positive floors. The implicit root estimate and bounded source acceleration make the delayed acceleration locally Lipschitz in current position and known source data. Ordinary position-velocity steps shorter than the delay floor give existence, uniqueness and continuation. Mirror symmetry follows from uniqueness and the complete reflected preparation.

The exact torque remains positive. The causal path lies in the open ball centered at the midpoint of its source and receiving positions with radius half the partner range, by adding its two strict path-length bounds. This ball lies in an open half-plane through the origin. Positive prior areal rate therefore gives a lifted source-to-reception angle in $(0,\pi/2)$; the radial partner contribution has positive torque. A first-loss argument retains this sign, so $h=Y\times Y'\ge1$ at generated times. This conclusion uses the unchanged radial law and complete geometry, not a physical angular-momentum premise.

## Why the finite transition survives

Define the fixed constants

$$
\beta=p-1\in(1,2),\quad m=3-p\in(0,1),\quad
\alpha=\beta/2,\quad k=2/m,\quad d=\beta/m,
\quad c=\beta(p-2)/m,
$$

and the actual coordinates

$$
r=|Y|,\quad u=Y'\cdot n,\quad v=h/r,\quad
a=h^{2/m},\quad x=r/a,\quad y=a^\alpha u,
\quad\delta=\epsilon a^{-\alpha},\quad d\eta/ds=a^{-(p+1)/2}.
$$

All local expressions are smooth near $x=1$. The load-bearing restrictions in the [finite transition](alternatives-screen-2026-10-05-radial-power-family-transition.md) are $\beta>0$, $m>0$ and fixed $p$; none of its local root expansions or scalar estimates needs $p\le2$. This assertion can be checked directly from the following reconstruction.

On a fixed small $(x-1,y)$ neighborhood, the complete speed bound gives $R_d\asymp r$, $D\ge1-b$ and causal-window length $O_p(\epsilon r)$. Coarse comparison of source and receiving radii gives $1+O_p(\epsilon)$ and hence comparable $a$ on generated segments. Reintegration with source speed $O_p(a^{-\alpha})$ improves this to $1+O_p(\delta)$. A window reaching supplied time has $s=O_p(\epsilon)$ and scales near one; the circle and patch have acceleration defect $O_p(\epsilon)$. These facts justify the integrated Taylor expansion on complete receiving and nested source intervals without a jerk bound. Multiplying the implicit range, transmitter and direction expansions gives

$$
\begin{aligned}
A_r&=-r^{-p}\left[1+\beta\epsilon u+\epsilon^2\left(\frac{\beta(p-2)}2u^2+(p-2)r^{1-p}-\frac\beta2v^2\right)\right]+O_p(\delta^3a^{-p}),\\
A_t&=r^{-p}(\epsilon v+\beta\epsilon^2uv)+O_p(\delta^3a^{-p}).
\end{aligned}
$$

These formulas are algebraic expansions in the small complete-window displacement for a fixed real $p$; changing the sign of $p-2$ alters coefficients but not their remainder order. Differentiating the scales contributes $+\alpha k$ to the first radial-velocity coefficient $-\beta$, giving $c=\beta(p-2)/m$. After subtracting scale drift with $w=y-k\delta x^{1-p}$, the growth coefficient is

$$
\gamma_p=c+k\beta=\frac{p\beta}{m}>0.
$$

The constant quadratic input is

$$
G_{0,p}(x)=\left[\frac{2\beta^2}{m^2}+2-p\right]x^{1-2p}
+\frac\beta2x^{-p-2}.
$$

The $+kd$ contribution from differentiating $\delta$ is included here. The central potential $V_p=1/(2x^2)-x^{1-p}/\beta+1/\beta-1/2$ has $V_p''(1)=m>0$. Subtracting $\delta^2G_p$, with $G_p'=G_{0,p}$ and $G_p(1)=0$, gives a nearby smooth minimum $x_\delta=1+O_p(\delta^2)$, with $dx_\delta/d\delta=O_p(\delta)$. Put $X=x-x_\delta$ and

$$
\mathcal L=\frac12w^2+V_p(x)-\delta^2G_p(x)
-V_p(x_\delta)+\delta^2G_p(x_\delta)
-\frac{\gamma_p}{2}\delta Xw,\qquad J=\sqrt{\mathcal L}.
$$

Positive definiteness for sufficiently small fixed neighborhood and parameter follows from $m>0$. At release $w=-k\epsilon$ and $X=O_p(\epsilon^2)$, so $J(0)=k\epsilon/\sqrt2+O_p(\epsilon^3)$. Direct differentiation cancels the constant quadratic input and gives

$$
|\mathcal L_\eta-\gamma_p\delta\mathcal L|
\le C_p\delta(J+\delta)\mathcal L+C_p\delta^3J.
$$

The last factor $J$ is retained: response defects pair with $w$ or the potential gradient, and the moving minimum contributes $O_p(\delta^3|X|)$. No differentiated history-dependent remainder is used. On the seed floor $J\ge k\epsilon/(2\sqrt2)$, choose fixed $j_*(p)>0$ and then small enough $\epsilon$ to obtain $\gamma_p\delta/4\le J_\eta/J\le3\gamma_p\delta/4$. The floor cannot be crossed downward.

While $J<j_*$, $(a^p)'\asymp_p\epsilon$ and $\delta_\eta\asymp_p-\delta^2$. If the event never occurred, the regular chart would continue with $a^p\asymp1+\epsilon s$, $\eta\to\infty$ and $\int\delta\,d\eta=\infty$, contradicting bounded $J$. Thus the fixed event is finite. Integration of the logarithmic errors $\delta J$, $\delta^2$ and $\delta^3/J$ gives

$$
\log[J/J(0)]-\frac{p\beta}{4}\log a=O_p(j_*+\epsilon).
$$

Consequently $a_b\asymp\epsilon^{-4/(p\beta)}$, $\delta_b\asymp\epsilon^{(p+2)/p}$ and $s_b\asymp\epsilon^{-(p+3)/\beta}\to\infty$. The actual nonzero phase obeys $\arg(\sqrt m X+iw)_\eta=-\sqrt m+O_p(J+\delta+\delta^3/J)<-b_p<0$. Its last fixed-amplitude band lasts a time comparable to $\epsilon^{-(p+2)/p}$. These are the entry and phase estimates needed below; their constants are allowed to deteriorate as $p\uparrow3$.

## Actual global rows on complete source windows

Introduce

$$
z=x^{-\beta}>0,\qquad d\chi/ds=a^{-(p+1)/2}x^{-p}.
$$

On a provisional fixed box $0<z<Z_p$, $|y|<Y_p$, $a\ge1$, scaled speed is bounded because $|Y'|=a^{-\alpha}\sqrt{y^2+z^{2/\beta}}$. Including the supplied past gives complete physical speed $O_p(\epsilon)<1/2$. The radius has a positive floor. The complete root estimates give $R_d\asymp_p r$, $|Y''|\le C_pr^{-p}$ and causal-window length $O_p(\epsilon r)$.

Since $r(s)\le1+M_ps$, sufficiently small $\epsilon$ makes the receiving window and its source's own window generated for $s\ge1$. The actual transition has $s_b\to\infty$, so late sampling needs no deletion of old history. Coarse source-radius comparison gives $1+O_p(\epsilon)$. Positive torque bounds the actual lifted angle by $C_ph(s)\epsilon/r(s)$, which yields $0<h'/h\le C_p\epsilon r^{-p}$. Integrating on the entire receiving window gives

$$
\left|\log\frac{h(q)}{h(s)}\right|\le C_p\epsilon^2r^{1-p}
=C_p\delta^2z.
$$

Thus the source scale is comparable even at arbitrarily large relative radius. Source speed is $O_p(a^{-\alpha})$, the radius comparison improves to $1+O_p(\delta)$, and the direction retains its transverse factor: $N_t=-\epsilon v[1+O_p(\delta)]$. Integral range and transmitter expansion consequently gives the uniform actual rows

$$
A_r=-r^{-p}[1+\beta\epsilon u+O_p(\delta^2)],\qquad
A_t=\epsilon vr^{-p}[1+O_p(\delta)].
$$

No sign or smoothness restriction at $p=2$ entered these estimates. The actual coordinate equations are therefore

$$
\begin{aligned}
z_\chi&=-\beta y+\beta k\delta z+E_z,& |E_z|&\le C_p\delta^2z,\\
y_\chi&=z^{m/\beta}-1+c\delta y+E_y,& |E_y|&\le C_p\delta^2,\\
\delta_\chi&=-d\delta^2+E_\delta,& |E_\delta|&\le C_p\delta^3,\\
a_\chi/a&=k\delta+O_p(\delta^2).
\end{aligned}
$$

The errors remain functions of the actual complete delayed history; no autonomy or differentiability of them is assumed. The factor $z$ in $E_z$ is retained exactly. For small launches $\delta$ decreases and $-C_p\delta^2\le\delta_\chi\le-c_p\delta^2$.

The central scalar $e=y^2/2+W(z)$, where $W(z)=z^{2/\beta}/2-z/\beta$ for $z\ge0$, has minimum $e_{\min}=1/2-1/\beta<0$ at $(1,0)$. The finite transition and its fixed nonzero amplitude give an entry gap

$$
e_{\min}+g_p\le e_b\le-g_p
$$

for a fixed $g_p>0$, after reducing $j_*$ and the launch threshold. Indeed $e-e_{\min}$ is the local positive radial scalar, while its difference from $J^2$ is $O_p(\delta J+\delta J^2+\delta^2)$.

## Continuous auxiliary flow at the fractional turning point

Extend the comparison only to real $z$ by

$$
W(z)=\frac12|z|^{2/\beta}-\frac z\beta,\qquad
F_0(z,y)=(-\beta y,g(z)),\qquad
g(z)=\operatorname{sgn}(z)|z|^\nu-1,
\quad\nu=\frac m\beta\in(0,1).
$$

This vector field is continuous, generally not locally Lipschitz at $z=0$. The earlier $C^1$ flow or bounded differentiable orbit-corrector proof is therefore not invoked. The potential is $C^1$, strictly convex, coercive, and satisfies $W'=g/\beta$. Along every classical solution the chain rule gives $d(y^2/2+W)/d\chi=0$.

Nevertheless the comparison has unique trajectories. Away from $z=0$ its field is smooth. At $z=0,y\ne0$, $z_\chi\ne0$, so taking $z$ as the independent variable gives $dy/dz=-g(z)/(\beta y)$, locally Lipschitz in $y$ on a nonzero-$y$ neighborhood. At $(0,0)$, $W'(0)=-1/\beta\ne0$, so $W$ has a local $C^1$ inverse. On the fixed energy level $e$, write $z=W^{-1}(e-y^2/2)$. The scalar equation

$$
y_\chi=g\bigl(W^{-1}(e-y^2/2)\bigr)
$$

has a continuous right-hand side bounded away from zero near the point, and hence a unique local solution by direct separation of variables. There is no waiting solution: $y_\chi=-1$ at the point itself. This proves uniqueness at the only nonsmooth locations without claiming differentiable dependence on initial data.

Every level $e>e_{\min}$ is a closed regular oval with simple turning points. Its period $Q(e)$ is finite and continuous on a compact energy annulus away from the minimum. To verify continuity even at $e=0$, split the period integral into neighborhoods of the two turning points and their complement. Near a turning point $W'$ is bounded away from zero, uniformly for nearby levels, and the change of variable from $z$ to $W(z)$ leaves an integrable square-root endpoint factor times a continuous bounded reciprocal derivative. The complement is an ordinary continuous integral. In particular the turning point $z=0$ on $e=0$ has $W'(0)\ne0$ and causes no infinite period. Positive lower and finite upper period bounds follow by compactness. No derivative $Q'(e)$ is needed.

The same continuous field and uniqueness give uniform finite-time comparison on compact sets for approximate trajectories whose residual tends uniformly to zero. A direct proof is by contradiction: bounded fields and vanishing residuals make a putative counterexample sequence equicontinuous; a convergent subsequence satisfies the central integral equation; uniqueness identifies its limit with the central trajectory from the limiting initial point. Continuous dependence of that central trajectory follows by the same argument. This proves a uniform closeness modulus tending to zero. It supplies no linear error rate and uses no Gronwall estimate across the fractional point.

If an actual positive-$z$ trajectory ends at $z=0$ before the comparison time, the desired boundary has already been reached. Otherwise the compactness argument applies to its entire existing interval. The negative-$z$ comparison segment has only this mathematical role; it is never an outgoing physical continuation.

## Full-cycle increments replace the orbit corrector

The actual scalar derivative on positive $z$ is

$$
e_\chi=\delta F(z,y)+O_p(\delta^2),\qquad
F(z,y)=cy^2+k(z^{2/\beta}-z).
$$

Extend $F$ to real $z$ using $|z|^{2/\beta}$. It is continuous and bounded on a fixed comparison box. On a central full oval, direct integration of $(zy)_\chi$ gives

$$
\oint(|z|^{2/\beta}-z)\,d\chi
=\beta\oint y^2\,d\chi.
$$

Thus, with $I(e)=\oint y^2\,d\chi>0$,

$$
\oint F\,d\chi=(c+k\beta)I(e)=\gamma_pI(e)>0.
$$

The integral $I$ is continuous and has a positive minimum on any compact annulus away from the central minimum. These statements need only the continuous unique flow and continuous periods proved above, not differentiability of an action or orbit primitive.

Use the transverse section $\Sigma=\{z=1,y>0\}$, with energies in the compact annulus $[e_{\min}+g_p/2,1]$, enlarged slightly for comparisons. Central crossings are uniformly transverse because $y=\sqrt{2(e-e_{\min})}$ has a positive lower bound there. Uniform finite-time comparison implies the following alternative for an actual section point with small $\delta_n$: before a uniformly bounded time, it either reaches the physical coordinate boundary $z=0$, reaches the scalar boundary $e=1$, or returns to $\Sigma$ after one turn. In the last case its return time tends uniformly to $Q(e_n)$ as $\delta_n\to0$. Uniformly positive lower return times follow as well. To see the return assertion, compare on a time interval slightly longer than the central period and bracket the central transverse crossing by points with opposite signs of $z-1$ and positive $y$. Outside the crossing neighborhoods the central orbit stays away from this section. A positive actual path can be compared with a central orbit having a negative segment only if it remains close; if that comparison becomes impossible, it has already met a boundary.

During a surviving cycle, $\delta=\delta_n+O_p(\delta_n^2)$ and $|e-e_n|=O_p(\delta_n)$. The approximate path converges uniformly to its central orbit, and the continuous function $F$ and return time converge with it. Integrating the actual scalar derivative therefore gives the uniform estimate

$$
e_{n+1}-e_n
=\delta_n\left[\gamma_pI(e_n)+o_p(1)\right]
\ge c_p\delta_n>0.
$$

The $o_p(1)$ tends uniformly to zero with $\delta_n$ over the compact annulus. This is a finite-trajectory estimate, not an assumed averaging law: it follows from an exact scalar derivative and the compactness comparison. The weaker unspecified closeness rate is sufficient because it is multiplied by $\delta_n$.

From the actual transition point, the same comparison gives either a boundary or a first section crossing in uniformly bounded time, with scalar change $O_p(\delta_b)$. Choose the launch small enough that this loss and all within-cycle fluctuations are much smaller than $g_p$. The scalar at successive sections then increases, while each intermediate value stays above $e_{\min}+g_p/2$. Thus no lower-annulus exit can occur. The condition $e\le1$ keeps $z,y$ strictly within the provisional box if that box contains a neighborhood of the full central sublevel $e\le2$.

If an infinite weighted-time trajectory stayed inside the annulus with positive $z$ and below $e=1$, it would have infinitely many section returns. Their durations lie between fixed positive bounds. The differential inequality $\delta_\chi\ge-C_p\delta^2$ gives

$$
\delta_n\ge\frac{1}{\delta_0^{-1}+C_p(\chi_n-\chi_0)}
\ge\frac{1}{\delta_0^{-1}+C_p n Q_{\max}}.
$$

Hence $\sum_n\delta_n=\infty$. Summing the positive scalar increments contradicts bounded $e_n$. Infinite confinement is impossible.

If the scalar instead reaches $e=1$, every central point on the compact positive-$z$ arc of that level reaches a strictly negative comparison coordinate within a uniformly bounded time; its crossings of zero have nonzero $y$. Compactness comparison then excludes an actual path remaining positive through that interval for sufficiently small $\delta$. Bounded $e_\chi$ retains its gap from the minimum and prevents artificial box exit on this final interval. Thus the actual coordinate reaches its boundary $z=0$ at finite weighted time in either case.

## Physical endpoint and the integrable angular clock

The actual rows have bounded derivatives on the positive box, despite the unbounded derivative of $z^\nu$ at zero. At a finite maximal weighted endpoint they give limits of $z,y,\delta$. The differential lower bound for $\delta$ implies $\delta_\infty>0$, so $a_\infty=(\epsilon/\delta_\infty)^{1/\alpha}$ is finite and positive. A positive limiting $z$ would give finite physical time and an ordinary continuation point with complete regular root margins. Hence

$$
\chi\uparrow\chi_\infty<\infty,\qquad
z\to0,\quad y\to y_\infty\ge0,\quad
a\to a_\infty\in(0,\infty).
$$

The sign follows from $z_\chi=-\beta y+O(z)$: a negative $y_\infty$ would make $z$ increase near a zero approached from positive values.

Put $\Delta=\chi_\infty-\chi$. If $y_\infty>0$, then $z\asymp\Delta$. If $y_\infty=0$, the second row is bounded between two negative constants near the endpoint, because $z^\nu\to0$ and the uniformly small error is $O_p(\delta^2)$. Backward integration gives $y\asymp\Delta>0$. The exact first-row factorization $z_\chi=-\beta y+b(\chi)z$, with bounded $b$, and its backward integrating-factor formula then give $z\asymp\Delta^2$.

The reconstruction formulas remain

$$
r=az^{-1/\beta},\qquad
\frac{ds}{d\chi}=a^{(p+1)/2}z^{-p/\beta},\qquad
\frac{d\theta}{d\chi}=z^{-\rho},\qquad
\rho=\frac{p-2}{p-1}\in(0,1/2).
$$

In the positive-speed case, $s\asymp\Delta^{-1/\beta}$ and $r\asymp s$. In the zero-speed case, $s\asymp\Delta^{-(p+1)/\beta}$ and $r\asymp s^{2/(p+1)}$. Thus physical time $T=r_0s/\epsilon$ diverges in both cases. The angular integral is finite: its integrand is comparable to $\Delta^{-\rho}$ or $\Delta^{-2\rho}$, and both exponents are strictly below one. The angular clock is unbounded near zero here, but integrable; calling it bounded would be incorrect.

The exact physical velocity is

$$
q'(T)=\epsilon a^{-\alpha}
\left[y\,n(\theta)+z^{1/\beta}t(\theta)\right]
\longrightarrow\epsilon a_\infty^{-\alpha}y_\infty n(\theta_\infty).
$$

Also $H=q\times q'=\epsilon r_0h\to\epsilon r_0a_\infty^{m/2}>0$. At every finite physical time the complete speed margin, positive separation and compact accessible source history permit ordinary continuation. Bounded speed itself prevents infinite radius at finite time. This establishes global physical dispersal and both terminal alternatives for the same complete preparation, without a law at the reciprocal-radius boundary.

## Exact cancellation in the winding derivative

It remains to prove actual zero-speed existence. Define

$$
\ell=1/\beta\in(1/2,1),\qquad \nu=2\ell-1\in(0,1),\qquad
\kappa=\sqrt m,
$$

and retain the smooth local comparison minimum $b(\delta)=x_\delta=1+O_p(\delta^2)$. Use $b$ only in this section; it is not the complete speed bound. Put

$$
Z=z^\ell,\qquad w=y-k\delta z,\qquad
\mathcal W=U+iV=\kappa(1-bZ)+iZw.
$$

Before transition, $\mathcal W=z^\ell[\kappa(x-x_\delta)+iw]$ is nonzero by the surviving amplitude. After transition, the scalar gap proved by the section increments and final comparison excludes a zero: $U=V=0$ would give $z=b^{-1/\ell}=1+O_p(\delta^2)$ and $y=k\delta z=O_p(\delta)$, within $O_p(\delta^2)$ of the central minimum in scalar value. Thus $\mathcal W$ remains nonzero throughout the generated future.

Bounding the separate component errors too early would produce apparently troublesome powers $z^{2\ell-1}$. The exact determinant cancels those terms before estimation:

$$
\frac{UV_\chi-VU_\chi}{\kappa}
=Z_\chi w+Z(1-bZ)w_\chi+b_\chi Z^2w.
$$

Indeed the two terms containing $bZZ_\chi w$ cancel identically. From the actual rows, using $\beta\ell=1$ and $E_z=O_p(\delta^2z)$,

$$
Z_\chi=-z^{\ell-1}y+k\delta z^\ell+O_p(\delta^2z^\ell),
\qquad b_\chi=O_p(\delta^3),
$$

$$
w_\chi=g(z)+\gamma_p\delta y-kd\delta^2z+E_y
-k\delta E_z-kzE_\delta.
$$

In the last formula $g(z)=z^\nu-1$ on the actual positive domain; $\gamma_p=c+k\beta$ and $d=\beta/m$. Substitution into the exact determinant gives

$$
\operatorname{Im}(\overline{\mathcal W}\mathcal W_\chi)
=-\kappa\left[z^{\ell-1}y^2
+z^\ell(z^\ell-1)(z^\nu-1)\right]
+O_p(\delta z^\ell).
$$

Every remainder has the displayed weight even when $\ell<1$. The only singular derivative $-z^{\ell-1}y$ multiplies $w=y-k\delta z$: its leading product is the retained negative square, and its correction has weight $\delta z^\ell y$. All remaining factors involve bounded $z,y,g,b$ with powers at least $z^\ell$. This verifies the required cancellation directly rather than assuming the previous exponent comparison.

For $0<z\le1/2$, the positive central bracket dominates

$$
z^{\ell-1}y^2+c_pz^\ell,\qquad
c_p=(1-2^{-\ell})(1-2^{-\nu})>0.
$$

On $z\ge1/2$ in the compact box, the scalar gap excludes its only zero $(1,0)$ and gives a positive lower bound. Thus small enough fixed-power launches make the actual determinant strictly negative after transition. Differentiation takes place only at positive $z$; bounded differentiability at the terminal boundary is neither assumed nor required.

## Terminal integer and accumulation of zero speeds

The initial argument of $\mathcal W$ lies near $-\pi/2$, since its imaginary part is $-k\epsilon$ and real part $O_p(\epsilon^2)$. Before transition, positive multiplication by $z^\ell$ leaves the earlier local phase unchanged. Its negative rate and long final amplitude band give

$$
\psi_b\le C_p-b_p\epsilon^{-(p+2)/p}.
$$

The determinant just proved prevents subsequent phase increase. At the terminal endpoint, $z\to0$ and bounded $y,\delta$ give $\mathcal W\to\kappa>0$. A small disk about that positive number has one continuous argument chart, so the lifted phase has a finite limit and no further complete turns. Hence

$$
\psi_\infty=2\pi N_p(\epsilon),\qquad N_p(\epsilon)\in\mathbb Z,
\qquad N_p(\epsilon)\to-\infty\quad(\epsilon\downarrow0).
$$

For any fixed positive launch parameter, complete supplied histories vary continuously in $C^2$ on compact old physical-time intervals. Their moving patch seam has zero correction jets through second derivative. Complete root bounds place all sources for a finite reception interval in one compact old interval; positive separation gives a delay floor, and the transmitter margin bounds the implicit root displacement. Bounded source acceleration then controls evaluation at the displaced root. Successive ordinary integral difference estimates prove finite-time parameter continuity. This is a statement about the actual delayed equation, whose finite-radius kernel is smooth, not about the auxiliary fractional flow at zero.

At a parameter with $y_\infty=Y_*>0$, choose a late finite physical time with $y>3Y_*/4$ and small $z=\zeta$. Nearby parameters have $y>2Y_*/3$ and $z<2\zeta$. The exact form $z_\chi=-\beta y+b_1(\chi)z$, with bounded $b_1$, and bounded $|y_\chi|\le M_p$ give $z_\chi\le-\beta Y_*/4$ while $y\ge Y_*/2$, once $\zeta$ is small. Choose it also so that $M_p8\zeta/(\beta Y_*)<Y_*/6$. Then the entire remaining path reaches $z=0$ within that bounded weighted duration while retaining $y>Y_*/2$. This proves openness of the positive-speed set without terminal continuity at zero-speed parameters.

Shrink the strip so $U>\kappa/2$ throughout it. The nonvanishing finite prefix has continuously varying lifted phase, and the remaining path lies in one right-half-plane chart and adds no integer turn. Therefore $N_p$ is locally constant at every positive-speed parameter. If an interval $(0,\epsilon_1)$ had no zero-speed member, all its members would have positive speed, and this integer would be constant on the connected interval. Its divergence at zero contradicts that conclusion. Every such interval contains a zero-speed parameter; selecting successively smaller ones yields accumulation at zero.

This argument neither orders trajectories by launch parameter nor requires differentiability of the terminal data. It allows a whole interval of zero-speed parameters and proves no positive-speed member.

## Exact asymptotic corollary and the endpoint exclusion

For the zero-speed members just established, the conditional [radial asymptotic calculation](alternatives-screen-2026-10-05-radial-zero-speed-asymptotics.md) now has all its hypotheses: complete strict speed margin, unbounded eventually increasing radius, velocity tending to zero and finite positive physical areal-rate limit. Its calculation can also be checked directly: the complete source interval moves into the late slow tail, so $R/(2|q|)\to1$ and $D\to1$; the geometric term $H^2/|q|^3$ is smaller than $|q|^{-p}$ because $p<3$. Integrating the squared radial-speed equation to infinity gives the same physical leading constants

$$
|q(T)|\sim C_pT^{2/(p+1)},\qquad
C_p=\left[\frac{p+1}{2}\sqrt{\frac{2^{1-p}}{p-1}}\right]^{2/(p+1)}.
$$

The remaining angle has the corresponding coefficient $H_\infty/[(4/(p+1)-1)C_p^2]$ multiplying $T^{1-4/(p+1)}$. This corollary rests on the new existence proof above; it is not used to prove that existence or the finite-angle endpoint.

The argument excludes $p=3$ at several load-bearing steps: $m=0$ removes the nondegenerate local radial minimum and makes the scale $a=h^{2/m}$ undefined; $\nu=0$ destroys the fractional comparison structure used here; the zero-speed angular exponent reaches its integrability boundary; and the geometric transverse term has the same radial order as the selected acceleration. These are limitations of this derivation, not a proof of any physical obstruction or fate at $p=3$.

## Falsifiers, source identities and scoped validation

The extension would fail if the unchanged patch lost compatibility or complete root coverage; if a local source-window remainder required $p\le2$; if the finite transition seed or positive growth estimate failed for fixed $m>0$; if the global transverse row lost its factor $v$; if the continuous central comparison had nonunique trajectories at its fractional point; if its full-cycle scalar increment failed to be uniformly positive; if a hidden lower-annulus or artificial-box exit occurred; if the zero-speed endpoint failed to have $z\asymp\Delta^2$; or if the determinant cancellation left a larger error than $O_p(\delta z^\ell)$. Each proposed failure is localized by a displayed equation or comparison argument above. Numerical disagreement at a parameter without a quantified admission certificate would not alone refute the existential small-launch theorem.

The following source identities were measured by `shasum -a 256` before this new derivation was written. All are sibling files with prefix `alternatives-screen-2026-10-05-radial-power-family-`:

| Source suffix | SHA-256 |
| --- | --- |
| `preparation.md` | `5bb3bf495cdb40975f86d1c7ff8e14398848f3e094bfcd6a739a8ef215beed04` |
| `transition.md` | `5974cc0f89a7597dd6f765d166735f627361225ac8cafd4de23326d82c37fbb3` |
| `global.md` | `5eb796ea43033ce243560a0220a5e00614a8fc856ed3ac1bc7556b64e1e9b3b1` |
| `zero-speed.md` | `359f1e30d08863028bbf76d56d372f94874eee8fcb8d5a47fd72f23035830ac5` |
| `adjudication.md` | `32bfecc1e93228140377cbd385726b35c20e3a7a6e67d4de59ffcbc949079365` |
| `zero-speed-adjudication.md` | `6ec12814ac6563d5e7d97ee7a5e32e2d7f77f07e40ee844bfdaa02e626efb9b4` |

Validation is analytical: direct patch bounds and jets, complete root and source-window estimates, local changing-scale differentiation, continuous-flow uniqueness, compactness comparison, the explicit full-cycle integral, endpoint reconstruction, exact determinant cancellation and parameter-space connectedness. No numerical target, new executable checker, Python process or background computation was used. Only this new independent analysis was authored; frozen subjects, assessments and shared owners were preserved. Whitespace validation and final source-identity checks are reported after creation. This new extension remains subject to independent assessment by the coordinating investigation.
