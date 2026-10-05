# Global dispersal for each fixed radial power between one and two

## Fixed-power conclusion and dependency boundary

**Claim grade: derived candidate, pending independent assessment of this source and its general-power transition dependency.** For each fixed $p\in(1,2]$, every sufficiently small positive launch in the [frozen compatible family](alternatives-screen-2026-10-05-radial-power-family-preparation.md) has a unique ordinary mirror-planar continuation for all physical future time under its unchanged $R^{-p}$ delayed acceleration law. The complete solution remains uniformly subfield and separated, its member radius tends to infinity, total polar angle is finite, and its velocity tends to an outward radial vector of nonnegative magnitude. Zero terminal speed is allowed.

For a fixed member, the two possible asymptotic growth classes are

$$
|q(T)|\asymp T\quad\text{if terminal speed is positive},\qquad
|q(T)|\asymp T^{2/(p+1)}\quad\text{if terminal speed is zero}.
$$

The constants may depend on that fixed member and exponent. These are two-sided comparisons, not exact asymptotic coefficients or uniform joint limits in time and power. The proof does not determine which alternative any parameter selects. It supplies no new numerical admission threshold, arbitrary-history robustness, nonmirror fate or uniform result as $p\downarrow1$.

At $p=2$, [all-future dispersal is already owned by the canonical wider theorem](slow-binary-wider-regime.md) and its [assessment](slow-binary-wider-regime-independent-adjudication.md), on a broader history class with an explicit threshold. At $p=3/2$, [global dispersal is separately derived](alternatives-screen-2026-10-05-radial-global-dispersal.md) and [independently assessed](../../analysis/alternatives-screen-2026-10-05-global-adjudication.md). The new contribution here is the direct fixed-power extension of the delayed tail bounds and the orbit-action sign across $1<p\le2$, together with an explicit noninteger-power comparison. Neither endpoint proof nor interpolation between them substitutes for these calculations.

The [general-power transition](alternatives-screen-2026-10-05-radial-power-family-transition.md) supplies the actual finite-amplitude entry for the same complete launch. Its asserted finite transition is a new dependency requiring independent review. The present proof can also be read conditionally from that exact entry and its already generated history; it never prescribes a replacement old path there.

## Coordinates that retain a finite boundary at infinite radius

Fix $p\in(1,2]$ and write

$$
\beta=p-1\in(0,1],\quad m=3-p=2-\beta,\quad
\alpha=\beta/2,\quad k=2/m,\quad d=\beta/m.
$$

Use $q=r_0Y$, $s=\epsilon T/r_0$, $r=|Y|$, $u=Y'\cdot n$, $h=Y\times Y'$, $a=h^{2/m}$ and $x=r/a$ as in the frozen family and transition. Introduce

$$
z=x^{-\beta},\qquad y=a^\alpha u,\qquad
\delta=\epsilon a^{-\alpha},\qquad
\frac{d\chi}{ds}=a^{-(p+1)/2}x^{-p}.
$$

The coordinate $z$ is positive reciprocal relative radius, with $z\to0$ representing unbounded $r/a$. Its exponent is chosen so the central radial equation has a finite nonzero derivative at that boundary. Exact reconstruction gives

$$
\begin{aligned}
r&=az^{-1/\beta},& v&=a^{-\alpha}z^{1/\beta},\\
|q'|&=\delta\sqrt{y^2+z^{2/\beta}},&
\frac{ds}{d\chi}&=a^{(p+1)/2}z^{-p/\beta},\\
\frac{d\theta}{d\chi}&=z^{(2-p)/\beta}.&&
\end{aligned}
$$

The last exponent is nonnegative throughout the selected interval. Thus bounded $z$ and a finite weighted time interval will imply finite physical angular advance. Nothing in the definition makes a finite-$\chi$ boundary a finite physical-time event.

The transition supplies a first fixed $J=j_*(p)>0$ event, with $a_b\asymp\epsilon^{-4/[p(p-1)]}$, $s_b\asymp\epsilon^{-(p+3)/(p-1)}$ and $\delta_b\asymp\epsilon^{(p+2)/p}$. The central scalar in the new coordinates is

$$
e=\frac12y^2+W_p(z),\qquad
W_p(z)=\frac12z^{2/\beta}-\frac z\beta\quad(z\ge0),
\qquad e_{\min}=W_p(1)=\frac12-\frac1\beta.
$$

It is not a conserved quantity for the delayed law. On the transition's fixed neighborhood, $e-e_{\min}=y^2/2+V_p(x)$ differs from its corrected squared amplitude $J^2$ by $O_p(\delta J+\delta J^2+\delta^2)$. Hence the actual entry lies in a fixed scalar annulus

$$
e_{\min}+\nu_p\le e_b\le-\nu_p
$$

for some fixed $\nu_p>0$ after choosing $j_*$ small and reducing the launch threshold. The scalar symbol $\nu_p$ here denotes this positive entry gap only; it is not the amplitude exponent used in the transition source. The entry is above the central minimum by a fixed amount and below zero. Its full preceding generated trajectory and complete supplied past remain part of every subsequent source window.

## Complete causal-window bounds without an upper radius limit

Choose provisional constants $Z_p,Y_p$ large enough to contain the transition neighborhood and a strict neighborhood of the full central scalar set $e\le2$ introduced below. Work at generated times in

$$
0<z<Z_p,\qquad |y|<Y_p,\qquad a\ge1.
$$

The radius floor is $r>aZ_p^{-1/\beta}\ge Z_p^{-1/\beta}>0$, and scaled speed is bounded by a fixed $M_p$ because $a^{-\alpha}\le1$. The supplied negative-time circle and patch have their separate speed bound below two. Thus the complete physical history has speed at most $M_p'\epsilon$, and small enough $\epsilon$ makes it less than $1/2$. Complete root monotonicity gives exactly one partner root and no positive-delay self root, with a fixed source-factor margin. If $\ell=s-\sigma=\epsilon R_d$, then

$$
R_d\asymp_p r,\qquad D\ge1-M_p'\epsilon,\qquad |Y''|\le C_pr^{-p},\qquad \ell\le C_p\epsilon r.
$$

The global speed bound gives $r(s)\le1+M_ps$. Taking $\epsilon$ small enough therefore makes $\ell<s/2$ for $s\ge1$, and also ensures the source's own source is positive. The actual transition has $s_b>1$ for sufficiently small launches. Every subsequent receiving window and its source's window are generated. This removes the old patch from late sampling by a complete delay estimate; it does not delete an old root.

On any such source interval, the global speed and delay bound first give $r(q)/r(s)=1+O_p(\epsilon)$. Exact positive torque remains available for the fixed positive radial response. Its lifted angular increment obeys $0<\Delta\theta<\pi/2$ and

$$
\Delta\theta=\int_\sigma^s\frac{h(q)}{r(q)^2}\,dq
\le\frac{C_ph(s)\ell}{r(s)^2},
$$

because $h$ is increasing at generated times. Substitution in the exact torque formula gives

$$
0<\frac{h'}h\le C_p\epsilon r^{-p}.
$$

Applying that bound throughout the receiving interval, whose own sources are generated, and integrating over its length $O_p(\epsilon r)$ yields

$$
\left|\log\frac{h(q)}{h(s)}\right|\le C_p\epsilon^2r^{1-p}
=C_p\delta^2z.
$$

Since $z$ has a fixed upper bound, the scales $a(q)=h(q)^{2/m}$ and $a(s)$ are comparable even on an arbitrarily elongated excursion. The provisional coordinates now give source speed $O_p(a^{-\alpha})$. Reintegration sharpens the radius ratio to $1+O_p(\delta)$ on the entire causal interval. These are history estimates on the actual generated path, not conclusions drawn from a single receiving state alone.

## The transverse factor pays for the weighted-clock division

The sharpened window estimates give

$$
\Delta\theta=\frac{h\ell}{r^2}[1+O_p(\delta)],\qquad
N_t=-\frac{r_\sigma}{R_d}\sin\Delta\theta
=-\epsilon v[1+O_p(\delta)].
$$

The relative sine error is $O_p((\epsilon v)^2)=O_p(\delta^2)$ on the fixed box. Hence the entire transverse response retains the current factor $v$, which tends to zero in the large-radius tail. Also $N_r=1+O_p(\delta^2)$. Integral Taylor estimates give

$$
\frac{R_d}{2r}=1-\epsilon u+O_p(\delta^2),\qquad
D=1+\epsilon u+O_p(\delta^2).
$$

The acceleration contribution to these normalized remainders is bounded by $C_p\epsilon^2r^{1-p}=C_p\delta^2z$, and the bounded $z$ factor is harmless. Thus the actual delayed radial and transverse rows obey

$$
A_r=-r^{-p}[1+\beta\epsilon u+O_p(\delta^2)],\qquad
A_t=\epsilon v r^{-p}[1+O_p(\delta)].
$$

No isotropic remainder has been substituted for the second formula. Its factor $v$ is essential to dividing by the vanishing weighted clock.

Differentiating the exact coordinate definitions gives the uniform global rows

$$
\begin{aligned}
z_\chi&=-\beta y+\beta k\delta z+R_z,& |R_z|&\le C_p\delta^2z,\\
y_\chi&=z^{m/\beta}-1+c\delta y+R_y,& |R_y|&\le C_p\delta^2,\\
\delta_\chi&=-d\delta^2+R_\delta,& |R_\delta|&\le C_p\delta^3,\\
a_\chi/a&=k\delta+O_p(\delta^2),& c&=\frac{\beta(p-2)}m.
\end{aligned}
$$

For example, $h_\chi/h=\delta[1+O_p(\delta)]$ follows from the transverse row, so $a_\chi/a=k\delta+O_p(\delta^2)$. The geometric identity $z=x^{-\beta}$ then forces the first remainder to contain $z$. In $y_\chi$, the direct radial term $-\beta\delta y$ combines with the changing velocity unit's $+\alpha k\delta y$, giving the displayed $c$. The factor $r^{-p}$ cancels the weighted clock in the radial equation. These calculations leave no negative power of $z$ in a remainder.

The errors may depend on the complete delayed history. The subsequent proof uses only their stated bounds and does not assume differentiability of them or replace them by a new autonomous physical law.

## A noninteger-power central comparison and its action sign

For the comparison alone, extend $z$ to the real line by

$$
\widehat W_p(z)=\frac12|z|^{2/\beta}-\frac z\beta,\qquad
F_0(z,y)=\left(-\beta y,\ \operatorname{sgn}(z)|z|^{m/\beta}-1\right),
$$

with the signed power defined as zero at $z=0$. Because $m/\beta=2/\beta-1\ge1$, the vector field is continuously differentiable, locally Lipschitz and has bounded first derivatives on each compact box. The potential is twice continuously differentiable. At noninteger exponents it is not called a polynomial or assumed arbitrarily differentiable. The stated regularity is sufficient for the flow, finite-time comparison and continuously differentiable orbit corrector used below.

The potential has a unique nondegenerate minimum at $z=1$, tends to positive infinity at both ends, and has derivative $\widehat W_p'=[\operatorname{sgn}(z)|z|^{m/\beta}-1]/\beta$. Direct differentiation gives $e=y^2/2+\widehat W_p(z)$ constant along $F_0$. Every level $e>e_{\min}$ is a smooth closed oval with simple turning points and nonzero flow. In particular, the level $e=0$ meets $z=0$ at a simple potential turning point, since $\widehat W_p'(0)=-1/\beta\ne0$; there is no central saddle or infinite comparison period there. Negative comparison radius coordinate is only an auxiliary mathematical extension.

Let $z_-(e)<z_+(e)$ be the two turning points. Define the positive orbit action and period by

$$
I(e)=\oint y^2\,d\chi=\frac2\beta\int_{z_-}^{z_+}\sqrt{2[e-\widehat W_p(z)]}\,dz,
$$

$$
Q(e)=\oint d\chi=\frac2\beta\int_{z_-}^{z_+}\frac{dz}{\sqrt{2[e-\widehat W_p(z)]}}=I'(e).
$$

On a compact annulus bounded away from the minimum, $I,Q$ are positive and bounded. The return time is continuously differentiable in the level: use the smooth transversal $z=1,y>0$, the continuously differentiable flow, and the nonzero crossing derivative. This also gives continuously differentiable orbit parametrizations and the regularity needed for $Q$ and the corrector. The equality $I'=Q$ follows by differentiating the action integral; the vanishing action integrand at each simple turning point removes endpoint terms, and the square-root period singularities are integrable.

The actual first-order scalar derivative on positive $z$ is

$$
e_\chi=\delta F(z,y)+O_p(\delta^2),\qquad
F(z,y)=c y^2+k(z^{2/\beta}-z).
$$

Extend this comparison function as $F=c y^2+k(|z|^{2/\beta}-z)$. On any full central oval, integration by parts using $z_\chi=-\beta y$ gives

$$
\oint(|z|^{2/\beta}-z)\,d\chi
=\oint z y_\chi\,d\chi
=\beta\oint y^2\,d\chi=\beta I(e).
$$

Consequently

$$
\oint F\,d\chi=(c+k\beta)I(e)=\gamma_p I(e),
\qquad \gamma_p=\frac{p(p-1)}{3-p}>0.
$$

This independently derived full-orbit coefficient agrees with the local squared-amplitude coefficient. It is a property of the comparison, not an unqualified finite increment of the delayed solution. Its averaged ratio to $\log a$ would give $d\log I/d\log a=\gamma_p/k=p(p-1)/2$, and hence half that exponent for amplitude, exactly the local value. The actual continuation below uses a bounded corrector rather than iterating this averaged statement.

## Corrected action on the actual delayed path

Choose $e_-=e_{\min}+\nu_p/2$. On the compact full central annulus $e\in[e_-,2]$, the function $Q(e)F-\gamma_p I(e)$ has zero integral around each orbit, because $\oint F=\gamma_p I$ and $\oint1=Q$. Integrating it along each central oval from the transversal $z=1,y>0$ therefore gives a single-valued continuously differentiable function $B(z,y)$ satisfying

$$
\nabla B\cdot F_0=Q(e)F(z,y)-\gamma_p I(e).
$$

One may subtract the orbit mean to fix its additive level-dependent constant. The closed annulus is away from the only equilibrium, and its flow and periods have the regularity just established; $B$ and its first derivatives are bounded there. Its definition on the negative-$z$ segment does not prescribe a physical continuation through infinity.

On the actual positive-$z$ path, set $\mathcal I=I(e)-\delta B(z,y)$. Chain differentiation, the bounded actual perturbation of $F_0$ and $\delta_\chi=O_p(\delta^2)$ give

$$
\mathcal I_\chi
=Q(e)[\delta F+O_p(\delta^2)]-\delta\nabla B\cdot[F_0+O_p(\delta)]-\delta_\chi B
=\gamma_p\delta I(e)+O_p(\delta^2)>c_p\delta>0
$$

for sufficiently small fixed-power launches. This is a pointwise differential inequality for the actual delayed solution. The positive lower bound of $I$ on the annulus is indispensable.

At entry $e_b\ge e_{\min}+\nu_p$, whereas the lower annular boundary is lower by the fixed gap $\nu_p/2$. Since $|\mathcal I-I(e)|\le C_p\delta\le C_p\delta_b$ and $I$ is strictly increasing, monotonicity of $\mathcal I$ excludes a first exit through $e=e_-$. While $e\le1$, its scalar sublevel bounds $z,y$ strictly inside the provisional box, chosen with margins above the central $e\le2$ set.

If the weighted interval were infinite in this annulus with $z>0$, the bounds $-C_p\delta^2\le\delta_\chi\le-c_p\delta^2$ would imply $\int\delta\,d\chi=\infty$. The displayed positive derivative would force unbounded $\mathcal I$, contradicting its bounded range. Thus either $z\to0$ at finite weighted time or the actual scalar first reaches $e=1$ at finite weighted time.

There is no omitted finite weighted endpoint with positive limiting $z$. Bounded derivatives give limits of $z,y,\delta$ there, and $\delta_\chi\ge-C_p\delta^2$ keeps $\delta$ strictly positive on a finite interval, hence $a=(\epsilon/\delta)^{1/\alpha}$ finite. If $z$ also stays positive, physical time is finite and all ordinary root, separation and history margins stay regular; local continuation extends the solution.

## The positive scalar level forces a finite boundary

On the central comparison level $e=1$, every point on its positive-$z$ arc reaches $z=0$ with outgoing $y=\sqrt2$ within a bounded comparison time, and then reaches a fixed negative value of $z$. The whole closed oval is compact. Its period and crossing derivative $z_\chi=-\beta\sqrt2$ are finite and nonzero for the fixed exponent. Therefore this passage has uniform positive time and transversality constants over the positive arc, including its endpoints.

The actual rows differ from $F_0$ by $O_p(\delta_b)$ on the larger fixed box. Since the comparison field is locally Lipschitz, subtracting the actual and comparison integral equations and applying Gronwall gives an $O_p(\delta_b)$ path discrepancy on the fixed comparison interval, as long as the actual $z$ remains positive. This argument estimates the actual history-dependent error along its path; it does not require an autonomous error function.

For sufficiently small launches the discrepancy excludes outer-box exit, and remaining positive through the central negative-$z$ sample would be impossible. Thus the actual positive-coordinate path has an endpoint at $z=0$ within that finite interval. Near any central zero on this level, $|y|$ is bounded below; positivity of the approaching actual coordinate selects the outgoing sign. Hence a branch reaching $e=1$ has positive $y_\infty$. An earlier boundary from the annulus may have $y_\infty=0$ and is not discarded.

Combining the two routes gives a finite maximal weighted time $\chi_\infty$ with

$$
z\to0,\qquad y\to y_\infty\ge0,\qquad
\delta\to\delta_\infty>0,\qquad a\to a_\infty\in(0,\infty).
$$

Bounded weighted derivatives give the limits. The differential lower bound on $\delta$ gives its positive limit. If $y_\infty<0$, the first row would make $z_\chi$ strictly positive near the endpoint, impossible for a positive path tending to zero. The scalar bound and comparison keep all artificial outer chart boundaries excluded throughout this argument.

## Physical continuation and both endpoint reconstructions

At every finite physical time the constructed solution has positive radius, bounded speed strictly below one, a positive delay floor and fixed root-factor margins; relevant old source times are bounded below on its compact interval. Ordinary local continuation therefore cannot end there. Bounded physical speed also prevents radius from diverging at a finite physical time. The reciprocal-radius endpoint occurs only at infinite physical time, as the explicit reconstructions confirm.

If $y_\infty>0$, the first row gives $z_\chi\to-\beta y_\infty<0$. With $\Delta=\chi_\infty-\chi$, one has $z\asymp\Delta$, and

$$
\frac{ds}{d\chi}\asymp\Delta^{-p/\beta},\qquad
s\asymp\Delta^{-1/\beta},\qquad
r\asymp\Delta^{-1/\beta}\asymp s.
$$

The exponent $p/\beta=1+1/\beta>1$ makes physical time divergent. In the zero-speed case, the second row is bounded between two negative constants near the boundary, because $z,y\to0$ and its uniform $O_p(\delta^2)$ error is made small by the launch threshold. Thus $y\asymp\Delta>0$ there. The first row has the exact form

$$
z_\chi=-\beta y+b(\chi)z,\qquad |b|\le C_p\epsilon.
$$

Its backward integrating-factor formula from the zero terminal value gives $z\asymp\Delta^2$, with positive bounded exponential factors. Consequently

$$
\frac{ds}{d\chi}\asymp\Delta^{-2p/\beta},\qquad
s\asymp\Delta^{-(p+1)/\beta},\qquad
r\asymp\Delta^{-2/\beta}\asymp s^{2/(p+1)}.
$$

No limiting value or derivative of the history-dependent remainder is needed. In both cases $s$ and $T=r_0s/\epsilon$ tend to infinity. The bounded nonnegative power in $\theta_\chi=z^{(2-p)/\beta}$ and the finite weighted interval give a finite polar-angle limit. Finally,

$$
q'(T)=\epsilon a^{-\alpha}\left[y\,n(\theta)+z^{1/\beta}t(\theta)\right]
\longrightarrow\epsilon a_\infty^{-\alpha}y_\infty n(\theta_\infty).
$$

The partner has the opposite limiting vector. This proves the all-future separated subfield dispersal and terminal classification for the stated preparation, conditional only on the new transition entry and the explicit estimates above. No event or response law at infinity is introduced.

## Falsifiers, exclusions and source freeze

The load-bearing falsifiers are: loss of the complete relative torque estimate on an elongated causal window; an additive transverse error lacking its factor $v$; an unbounded normalized remainder as $z\to0$; failure of the continuously differentiable auxiliary extension or orbit primitive; a different value or sign of the orbit integral $\oint F$; a lower annular exit despite the corrected-action inequality; or a finite physical-time endpoint contradicting bounded speed and the displayed reconstructions. The transition's nonzero seed and fixed entry remain separate load-bearing dependencies. An independent assessment must check them rather than assume them from this global argument.

The proof does not claim positive-speed existence or zero-speed existence for any general fixed exponent, isolated exceptional parameters, a common threshold over powers, nonmirror stability, or a physical conserved quantity. It makes no $p=1$ extension: that exponent does not admit the selected small-speed family with fixed normalization. It also makes no assertion for $p>2$, where the present regularization and angular reconstruction require a different domain analysis.

Before this global source was authored, `shasum -a 256` measured the frozen preparation identity `5bb3bf495cdb40975f86d1c7ff8e14398848f3e094bfcd6a739a8ef215beed04` and transition identity `5974cc0f89a7597dd6f765d166735f627361225ac8cafd4de23326d82c37fbb3`. The exponent and preparation were not adjusted against any target outcome. The independent general-power orbit integral was calculated directly here, with the two known endpoint coefficients used only as algebraic controls.

Validation is analytical: complete root and torque geometry, weighted actual source bounds, explicit coordinate differentiation, a continuously differentiable full-orbit extension, integration by parts for the action sign, and both endpoint time integrals. No numerical instrument, target trajectory, Python process or background job was used. Only this new source is authored; earlier subjects and shared integration owners remain untouched by this work. Fresh independent review is required before integrating this general-power theorem.
