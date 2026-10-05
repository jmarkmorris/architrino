# Collinear analytical screen of the selected alternatives

This investigation compares six expressly selected mathematical laws, with wake speed $c_f=1$. Its strongest initial conclusions concern the equation's domain: positive radial powers retain a divergent self arrival at a transverse unit-speed crossing; a positive reception width and spatial core permit regular forward evolution through contact; and the collinear amplitude-gradient equation has an exact monotone quantity that constrains any globally regular separated future. These are mathematical statements about the selected laws, not adoption of an alternative into the canonical theory.

The definitions are the [shared equation manuscript](../../equation-variants/manuscript.md), the [selected regular amplitude-gradient owner](../../analysis/amplitude-gradient-regular-pair-investigation.md), and the [repaired linear owner](multiplier-free-linear-delayed-comparison.md). The [daily specification](../../brainstorming.md#codex-collinear-and-binary-alternatives-for-2026-10-05) supplies the comparison choices, selected for execution by the operator after that proposal. The canonical law remains the baseline. No receiver multiplier, projection, root deletion, impulse, or outgoing selector is added here.

## Complete histories and ordinary collinear roots

Let $x_i(t)$ and $v_i(t)=x_i'(t)$ denote the position and velocity of persistent label $i$. A causal arrival from $j$ has emission time $s<t$, range $R=|x_i(t)-x_j(s)|=t-s>0$, direction $n=\operatorname{sgn}(x_i(t)-x_j(s))$, and transmitter factor $D=1-nv_j(s)$. Polarity is $\sigma_{ii}=+1$ for self reception and $\sigma_{ij}=-1$ for the opposite-polarity partner. Every ordinary positive-delay root is retained. The zero-delay endpoint is excluded for the sharp-root laws; an endpoint of measure zero changes no finite-width integral.

Suppose the complete supplied history and the examined future have $|v_j|\le1-\eta$ for a fixed $\eta>0$. For distinct present positions, the causal residual is strictly increasing in source time, has exactly one zero, and its factor satisfies $D\ge\eta$. If $r=|x_i(t)-x_j(t)|$, triangle inequalities give

$$
\frac{r}{2-\eta}\le R\le\frac r\eta.
$$

The root direction equals the present separation direction: if their signs differed, the source would need to travel distance at least $R$ in time $R$, contrary to the complete strict speed bound. The same chord bound excludes every positive-delay self root. These census statements require complete source support, not only a finite stored segment.

On separated charts with a common speed margin and bounded finite-window regularity, the radial-power, repaired-linear and memory equations have a local method-of-steps solution. Their source positions and velocities are already known over a step shorter than the minimum partner delay. The amplitude-gradient law additionally samples delayed acceleration and uses the compatible $C^{2,1}$ histories and local theorem in its live owner. No contraction of its delayed-acceleration coefficient is required for that local result. A bounded scalar estimate failing to close would not imply a dynamical obstruction.

> Claim grade: derived. These are geometric and local-domain statements under the declared margins. Falsifier: a second partner root, a positive-delay self root, or a root of reversed direction satisfying the complete speed bound; for the local theorem, failure of the named regularity or compatibility is a failed hypothesis rather than a counterexample.

## Radial powers: first unit arrival before contact

The selected family has $K=R_*=1$ and per-hit response $\sigma n/(R^p|D|)$, with $p=3/2$ as target and $p=1,2$ as dimensionally matched controls. The following incoming theorem holds for every $p\ge1$.

Supply the complete held histories $x_+(t)=a$, $x_-(t)=-a$ for $t\le0$, with $a>0$, then release them at rest. This is a prescribed preparation, not an equilibrium before release. Mirror symmetry of the local solution gives $x_+(t)=x(t)>0$, $x_-(t)=-x(t)$ until contact or unit speed. Write $u(t)=-x'(t)$. On the complete subfield incoming chart the sole partner source time solves

$$
t-s=x(t)+x(s)=R(t),\qquad
u'(t)=\frac1{R(t)^p[1-u(s)]}.
$$

Set $u(s)=0$ and $x(s)=a$ on the held past. The response is strictly inward, so $u$ increases. While $0\le u<1$ and $0<x\le a$, one has $R\le2a$ and hence $u'\ge(2a)^{-p}$. A regular incoming solution therefore cannot remain on this chart beyond $(2a)^p$ without either contact or unit speed. If position, speed and separation retain strict margins on a finite interval, the local theorem continues it; there is no additional finite-time breakdown inside that chart.

Assume for contradiction that first contact occurs at finite $t_*$ while $u(t)\le1$. The source time tends to $t_*$: an earlier limiting source time would imply a positive interval on which the path travelled at average speed one, inconsistent with its strictly subfield interior. Differentiate the root equation to obtain

$$
\frac{ds}{dt}=\frac{1+u(t)}{1-u(s)},\qquad
\frac{du}{ds}=\frac1{[1+u(t)]R^p}.
$$

Near contact, $R=t-s\le t_*-s$ and $1+u(t)\le2$. Consequently

$$
du\ge\frac{ds}{2(t_*-s)^p}.
$$

Its integral diverges as $s\uparrow t_*$ for every $p\ge1$, contradicting $u\le1$. Therefore first unit speed occurs at strictly positive separation, within time $(2a)^p$. The endpoint partner root has positive delay and samples an earlier strictly subfield source velocity, so its inward acceleration has a finite positive limit. This theorem supplies the first actual event for all three selected exponents, without numerical trajectory extrapolation.

On the first interval whose source root remains in the held past, the exact independent control is

$$
u^2=
\begin{cases}
\displaystyle\frac{2}{p-1}\big[(x+a)^{1-p}-(2a)^{1-p}\big],&p\ne1,\\[4pt]
\displaystyle2\log\frac{2a}{x+a},&p=1.
\end{cases}
$$

It follows by integrating $u\,du/dx=-(x+a)^{-p}$ from $x=a$, $u=0$. This control ends when $t=x(t)+a$, when the source root reaches release time. It must not be continued as a held-source replacement beyond that event.

> Claim grade: derived. The selected $p=3/2$ encounter reaches unit speed before contact; $p=1,2$ satisfy the same class theorem. Falsifier: a regular held-release solution with $p\ge1$ reaching contact while $u\le1$, or remaining separated and strictly subfield for longer than $(2a)^p$, would violate the displayed inequalities. No assertion for $0<p<1$ follows from the divergent-integral argument.

### Transverse self birth does not soften with positive radial power

Use a coordinate in the crossing direction, with event time zero and incoming unit velocity. Suppose a candidate $C^2$ continuation has

$$
y(t)=y(0)+t+\tfrac12 A t^2+o(t^2),\qquad A>0.
$$

For $t>0$, its near-event self root is given by $y(t)-y(s)=t-s$. Dividing by $t-s$ and using the nonzero acceleration yields $s=-t+o(t)$, $R=2t+o(t)$, and $D=1-y'(s)=At+o(t)$. Its positive self acceleration is therefore

$$
A_{\rm self}(t)=\frac{1+o(1)}{2^p A}\,t^{-(p+1)}.
$$

This is not locally integrable for any $p\ge0$. In the held-release pair the partner acceleration remains finite and points in the same inward direction, so it cannot cancel the divergence. In particular no unchanged-law $C^2$ continuation can cross the first unit event for $p=1,3/2,2$. This is a classical-crossing obstruction; extending it to every continuous-velocity or measure solution requires a separate argument and is not claimed by this expansion.

For the selected $p\ge1$ cases, the separate [accepted class-level adjudication](class-level-first-exit-independent-adjudication-2026-10-03.md#assessment-of-the-three-subjects) already supplies that stronger argument for a distance numerator $R^n$ with $n\le-1$. Its translation is $n=-p$. The complete held-release past at first unit speed is monotone inward, the partner root is isolated and regular at positive separation, and the equation holds before the event, so the theorem's hypotheses apply. Its self-measure identity is $A_s\,dt=R^{-p}dR/(w_-+w_+)$, where $w_-=1-u(s)$ and $w_+=u(t)-1$. Bounded velocity gaps give a divergent lower integral for $p\ge1$; its no-atom argument excludes a velocity jump. Consequently the selected $p=3/2$ encounter, like its $p=1,2$ controls, has no bounded-variation collinear velocity continuation satisfying the unchanged measure equation. This is an application of that existing independently assessed class result, not a new independence claim for the present derivation.

> Claim grade: derived, conditional on the transverse $C^2$ crossing hypothesis. Falsifier: an all-root candidate with that jet and a finite self acceleration integral. A nonsmooth outgoing candidate lies outside this theorem and is not thereby admitted.

## Amplitude gradient: an exact collinear monotone quantity

The selected law uses a finite opposite-polarity pair with complete separated compatible uniformly subfield histories and $K=1$. Fix label ordering $x_1(t)>x_2(t)$. At a root of member $i$, put $u=v_i(t)$, $v=v_j(s)$, $a=v_j'(s)$, and $\Psi=1/(RD)$. Here $n=+1$ for member 1 and $n=-1$ for member 2. The exact collinear reduction of the gradient row is

$$
A_i=\sigma\left[\frac{n}{R^2D^2}+\frac{a}{RD^3}\right].
$$

Indeed its original numerator is $(1-v^2)n-Dv+Ra=nD+Ra$. The acceleration term can change the response sign, even though the partner has opposite polarity. For an affine source it vanishes and $RD=r$, so the exact response is $\sigma n/r^2$, independently of the affine source speed in the strict subfield domain. The stationary control is its $v=0$ specialization. At a prescribed accelerated-source jet with $v=0$, $R=d$, the response is $\sigma(n/d^2+a/d)$; this is a prescribed input control, not a mutually coupled solution.

Along the receiver path, implicit differentiation gives

$$
s'=\frac{1-nu}{D},\qquad
R'=\frac{n(u-v)}D,\qquad
\Psi'=-\frac{n(u-v)}{R^2D^2}+\frac{na(1-nu)}{RD^3}.
$$

Substitution eliminates the sampled acceleration exactly:

$$
(1-nu)A_i=\sigma n\left[\Psi'+\frac1{R^2D}\right].
$$

For the right member, $\sigma=-1$, $n=1$. Its quantity

$$
L_1(t)=u(t)-\tfrac12u(t)^2+\Psi_1(t)
$$

satisfies

$$
L_1'(t)=-\frac1{R_1(t)^2D_1(t)}<0.
$$

This is a mathematical monotonicity identity, not a physical energy law. It makes no symmetry assumption about the other member, source clocks, centre motion, or acceleration sign. The corresponding left-member identity is $[v_2+v_2^2/2-\Psi_2]'=1/(R_2^2D_2)$.

### Conditional all-future dispersal without mirror symmetry

Suppose a solution exists regularly for every $t\ge0$, retains strict ordering, and its complete joined histories obey one fixed speed bound $|v_i|\le1-\eta$. Since $\Psi_1>0$ and $u-u^2/2\ge-3/2$ for $|u|<1$, integration of the identity gives

$$
\int_0^\infty\frac{dt}{R_1^2D_1}\le L_1(0)+\frac32<\infty.
$$

The causal range bound $R_1\le r/\eta$ and $D_1\le2$ then imply $\int_0^\infty r(t)^{-2}\,dt<\infty$. Present separation is Lipschitz, with $|r'|\le2(1-\eta)$. If it visited $r\le M$ at arbitrarily large times, intervals of fixed positive duration around a disjoint subsequence of those visits would have uniformly bounded $r$ and contribute a fixed positive amount to this integral. That contradicts finiteness. Thus

$$
\lim_{t\to\infty}r(t)=\infty.
$$

This theorem enlarges the symmetry class of a necessary all-future conclusion. It does not establish the existence of such a future for arbitrary compatible preparations, a practical speed threshold, a terminal speed, or regular passage through contact. A preparation can instead lose separation, its uniform speed margin, or required regularity. Its significance is that any globally regular uniformly subfield separated collinear future must disperse, even when centre motion and the two source clocks differ.

An immediate corollary excludes complete separated periodic solutions and solutions periodic up to a common constant translation in this domain. Their velocities and $\Psi$ would be periodic, whereas $L_1$ strictly decreases over each period. No linear stability calculation about such a nonexistent collinear periodic solution is warranted.

> Claim grade: derived from the exact identity and the stated all-future hypotheses; independent assessment pending. Falsifier: a compatible all-future separated uniformly subfield solution whose separation does not tend to infinity, or a direct differentiation giving a different sign/coefficient in $L_1'$. Finite trajectories alone cannot test the all-future premise.

### A complete compatible incoming family reaches the speed boundary

The conditional dispersal theorem does not mean every compatible preparation disperses. The following explicit preparation instead reaches unit speed at positive separation. It stays inside the originally selected regular-history class at release.

Set $a=1/2$, $\delta=1/16$, and let $r_0$ be the unique zero in $(99/100,1)$ of

$$
r_0^3-r_0^2+\frac1{1536}=0.
$$

Existence follows from opposite endpoint signs; uniqueness follows from $3r_0^2-2r_0>0$ on this interval. Set $A=r_0^{-2}$. Prescribe the right-member history

$$
x(t)=
\begin{cases}
1/2,&t\le-\delta,\\
\displaystyle\frac12-\frac{A(t+\delta)^3}{6\delta},&-\delta\le t\le0,
\end{cases}
\qquad x_-(t)=-x(t).
$$

It is complete $C^{2,1}$, with nonnegative increasing inward speed $u=-x'$ and nonnegative inward acceleration $u'$. Its release values are $x(0)=1/2-A\delta^2/6$, $u(0)=A\delta/2<1/25$, and $u'(0)=A$. The partner root at release is $s=-r_0<-\delta$ and samples the stationary tail. Since $x(0)+1/2=r_0$, its amplitude-gradient acceleration magnitude is exactly $r_0^{-2}=A$. Thus both endpoint acceleration compatibility conditions hold. This is a fixed complete preparation, not a prescribed future.

On the incoming mirror branch, the exact coupled equation is

$$
u'(t)=\frac1{R^2[1-u(s)]^2}
+\frac{u'(s)}{R[1-u(s)]^3},\qquad R=x(t)+x(s)=t-s.
$$

Past $u'\ge0$ propagates by positive delay, so $u'>0$ until contact or unit speed. All prior positions then lie between the current position and $a$, giving $R\le1$ and $u'\ge1$. Unit speed must occur by time $1-u(0)$ unless contact occurs first or a regularity boundary is encountered.

Contact before or together with that first unit event is impossible. At contact, the partner root must tend to the reception time by strict-subfield chord geometry, so $R\downarrow0$ and $\Psi=1/[R(1-u(s))]\to\infty$. But the exact identity gives $\Psi=L_1+u+u^2/2\le L_1(0)+3/2$ while $u\le1$, a contradiction. On any shorter interval with positive separation and strict speed margin, the positive delay and bounded source coefficients propagate finite $C^{2,1}$ norms by the method of steps. Thus no earlier regularity loss can evade the argument.

The first unit endpoint has strictly positive separation and a finite positive incoming acceleration, because its partner root remains at a strictly earlier regular emission. The selected amplitude-gradient law supplies no boundary response or self-diagonal extension there. Hence this compatible preparation has a finite speed-domain endpoint, not an admitted contact, dispersal or outgoing continuation. This result is distinct from the conditional all-future theorem: it identifies an actual first endpoint for one compatible family.

> Claim grade: derived, independent assessment pending. Falsifier: failure of endpoint compatibility for the explicit polynomial history, an earlier nonregular event with separation and speed margins intact, or a continuation of this incoming solution that avoids unit speed through time $1-u(0)$. The selected law does not authorize using an extrapolated formula above unit speed.

## Finite width and spatial core: a complete forward equation

For each separate fixed pair $(h,\rho)\in\{1/16,1/32\}\times\{1/32,1/64\}$, use

$$
x_i''(t)=\sum_{j=1}^2\sigma_{ij}\int_{-\infty}^{t}
f_\rho(x_i(t)-x_j(s))\,\delta_h(|x_i(t)-x_j(s)|-(t-s))\,ds,
$$

where $f_\rho(z)=z/(z^2+\rho^2)^{3/2}$ and $\delta_h(z)=h^{-1}(1-|z|/h)_+$. All self and partner channels have $K_{ij}=1$. This integral law contains no transmitter denominator because it integrates the complete reception band directly; no sharp-root census is substituted for the integral.

### Complete affine self response

For a complete affine self history $x(s)=bs+c$, put $q=|b|$. On writing $w=t-s\ge0$, its self response is

$$
S_{h,\rho}(b)=\frac b h\int_0^{h/|1-q|}
\frac{w(1-|1-q|w/h)}{(q^2w^2+\rho^2)^{3/2}}\,dw
$$

when $q\ne1$. Direct integration gives, for $b\ne0$ and $q\ne1$,

$$
S_{h,\rho}(b)=\frac{\operatorname{sgn}(b)}{h q\rho}
\left[1-\frac{\operatorname{arsinh}z}{z}\right],
\qquad z=\frac{qh}{\rho|1-q|}.
$$

At $b=0$ the value is zero. At $q=1$ the reception gap is zero for the entire past, but the positive spatial core gives the convergent integral $S_{h,\rho}(b)=b/(h\rho)$. Thus finite width produces nonzero self input on every nonzero affine path, including strictly subfield paths that have no sharp positive-delay self root. Its direction agrees with $b$, since $0<\operatorname{arsinh}z<z$ for $z>0$. The affine history alone is a prescribed control, not a solution with that constant velocity unless other contributions cancel it.

The $q\to0$ expansion is $S_{h,\rho}(b)=bh/[6\rho^3(1-q)^2]+O(bq^2h^3/[\rho^5(1-q)^4])$ at fixed positive $h,\rho$. The response is continuous at $q=1$ by the exact expression. Deleting it on the ground that a sharp self root is absent would change the selected law.

### Complete-past convergence and global forward existence

Supply complete $C^1$ pasts on $(-\infty,0]$ with $|x_j'(s)|\le1-\eta$, and present position and velocity matching those pasts. Higher seam compatibility can be imposed if a globally $C^2$ joined history is desired. For any finite reception $(t,x)$ with $t\ge0$, the old-past residual

$$
g(s)=|x-x_j(s)|-(t-s),\qquad s\le0,
$$

is increasing with slope at least $\eta$ in the Lipschitz sense. Hence its reception support has length at most $2h/\eta$, and the change-of-variable bound is $\int_{-\infty}^0\delta_h(g(s))ds\le1/\eta$. The infinite old past is therefore absolutely integrable. This is stronger than merely truncating it at a convenient time.

The softened spatial response is bounded by

$$
M_\rho=\sup_z|f_\rho(z)|=\frac{2}{3\sqrt3\rho^2}.
$$

The generated future portion, $0\le s\le t$, has finite measure regardless of its speed. For two channels per receiver,

$$
|x_i''(t)|\le 2M_\rho\left(\frac1\eta+\frac t h\right).
$$

This estimate bounds velocity and position on every finite future interval and requires no future speed ceiling. It also includes self reception, folds, coincidence and any number of sharp-root births.

For local uniqueness, $f_\rho$ and $\delta_h$ are bounded Lipschitz functions; $|z|$ is Lipschitz as well. On a finite future interval the future integral is locally Lipschitz in the sup norm of the candidate position histories. For the old-past integral, two nearby reception positions shift $g$ by at most their distance; the union of their supports lies in a band of length at most $(2h+2\epsilon)/\eta$. The product Lipschitz bound on that finite band controls the difference by a constant times the reception-position difference. Thus the twice-integrated Volterra equation is a contraction on a sufficiently short position/velocity ball. Its solution is unique, has continuous acceleration, and can be restarted. The displayed finite-time bounds prevent blowup of position or velocity; the same Lipschitz bounds on each finite interval prevent failure of local continuation. Iteration gives a unique solution for every $t\ge0$.

This is a global forward existence theorem for the four selected positive-width/core laws and the stated complete-past class. It supplies a defined continuation through contact, including label passage when relative velocity is nonzero. It does not prove bounded motion, capture, dispersal, a physical conservation account, or a limit as $h,\rho\downarrow0$. A domain-only speed ceiling can still stop admissibility when the unrestricted solution crosses one; it does not change the theorem's acceleration or enforce the ceiling.

> Claim grade: derived; independent assessment pending. Falsifier: a divergent old-past integral under its global speed margin, a finite-time blowup violating the acceleration bound, or two Volterra solutions with the same complete preparation. A claimed bound independent of $h,\rho$ would be false and is not asserted.

### Stationary and coincidence controls

For a stationary distinct source at present range $r$, its exact response is $\sigma f_\rho(nr)W_h(r)$, where

$$
W_h(r)=
\begin{cases}
\tfrac12+r/h-r^2/(2h^2),&0\le r<h,\\
1,&r\ge h.
\end{cases}
$$

This follows by integrating the normalized window over $t-s\ge0$. It reproduces the shared stationary control for $r\ge h$ and specifies the partial reception band near contact. Two stationary separated opposite-polarity histories have nonzero inward acceleration, so they are not equilibria. At complete coincident stationary histories every integrand vanishes. More generally, coincident identical complete affine paths give exact cancellation between self and partner integrals; all integrals converge by the affine calculation, including unit affine speed. Such coincident solutions establish mathematical solution identity, not separated binding.

## Uniform memory on the canonical baseline

The selected additional response is exactly

$$
H_i(t)=-\int_0^1[v_i(t)-v_i(t-\theta)]\,d\theta
=-v_i(t)+x_i(t)-x_i(t-1).
$$

The baseline is the complete ordinary canonical sum, including every positive-delay self root. Memory does not replace that sum. Constant velocity gives $H=0$; constant acceleration over the full memory window gives $H=-a/2$. For a harmonic velocity $v(t)=\Re(Ve^{i\omega t})$, the exact multiplier is $-1+(1-e^{-i\omega})/(i\omega)$, with its continuous value zero at $\omega=0$. These are prescribed-history algebraic controls.

For a continuous $P$-periodic velocity, the period-averaged input has the exact identity

$$
\int_0^P v(t)H(t)\,dt
=-\frac12\int_0^1\int_0^P[v(t)-v(t-\theta)]^2\,dt\,d\theta\le0.
$$

Periodicity makes the integrals of $v(t)^2$ and $v(t-\theta)^2$ identical; expanding the square proves the formula. Equality for continuous periodic histories requires constant velocity, because the difference must vanish for every lag in a nonempty interval. This is a mathematical quadratic input identity for the added term only. It is not dissipation of an independently defined physical account, and the pointwise product can be positive when present and recent velocities differ appropriately.

An ordered complete uniformly subfield pair cannot be periodic up to common translation under this law. The right member's canonical partner acceleration is strictly negative at every time; no self roots exist in this domain. The memory integral over a period is zero, as is the acceleration integral. Integrating its equation would therefore equate zero to a strictly negative number. This excludes the stated boundary solution class, without claiming a fate for arbitrary released histories.

A finite memory term cannot cancel the radial self-birth divergence of a transverse $C^2$ unit crossing: bounded velocity on a unit window makes $H$ bounded. The canonical baseline retains the $p=2$ self response derived above. The same local classical-crossing obstruction therefore remains under the stated event hypothesis. Memory may change whether and when a preparation reaches that event; the next construction supplies one compatible first-event case.

### An explicit compatible memory preparation reaches unit speed first

Use the same polynomial history template with $a=1/2$ and $\delta=1/16$, but select its coefficient separately for this law. Let $A$ be the root in $(9/10,1)$ of

$$
A\left(1+\frac\delta2-\frac{\delta^2}{6}\right)
\left(1-\frac{A\delta^2}{6}\right)^2=1.
$$

The left side is strictly increasing on the stated interval, is below one at $A=9/10$ and above one at $A=1$, so this root is unique. Put $x(t)=1/2$ for $t\le-\delta$ and $x(t)=1/2-A(t+\delta)^3/(6\delta)$ on $[-\delta,0]$, with the other member its reflection. At release the inward speed is $u_0=A\delta/2$ and the mean inward speed over the last unit interval is $A\delta^2/6$. The sole partner root samples the held tail at range $R_0=1-A\delta^2/6$. The displayed coefficient equation is exactly the compatibility condition

$$
u'(0)=A=R_0^{-2}-u_0+\int_{-1}^0u(s)\,ds.
$$

As long as the solution remains separated and subfield, it has one partner root and no self root. Its inward equation is

$$
u'=F-u+\overline u,\qquad
F=\frac1{R^2[1-u(s)]},\qquad
\overline u(t)=\int_{t-1}^t u(q)\,dq.
$$

The half-line $u\ge0$ is invariant: at a first prospective zero the right side is positive. Consequently all past and future positions before contact satisfy $0<x\le1/2$, so $R\le1$, $F\ge1$ and $\overline u\ge0$. Therefore $u'\ge1-u$, and

$$
u(t)\ge1-(1-u_0)e^{-t},\qquad
x(t)\le x(0)-t+(1-u_0)(1-e^{-t}).
$$

If unit speed were never reached, the second bound forces contact before time two. Such contact is impossible: transform the positive canonical input using $ds/dt=(1+u(t))/(1-u(s))$ to obtain $F\,dt=R^{-2}ds/(1+u(t))$. At a putative contact endpoint, $s\uparrow t_*$ and $R\le t_*-s$, so its integral diverges. The memory term is bounded by one in inward magnitude while $0\le u\le1$ and cannot cancel that divergence. Thus first unit speed occurs at positive separation before time two.

At that endpoint $R<1$, so $F>1$ and $u'=F-1+\overline u>0$. The event is transverse. The same no-atom and positive-self-measure reasoning as the radial class theorem excludes a bounded-variation continuation for this preparation: a jump would require an atom absent from both the canonical arrival measure and the bounded memory integral; a continuous trace has a strictly positive regular partner-plus-memory part near the endpoint and creates the divergent self contribution. No outgoing response is selected.

> Claim grade: derived, independent assessment pending. Falsifier: a failed compatibility equality, a complete all-root solution of this preparation that remains subfield and separated through time two, or a locally finite measure continuation through its endpoint. The argument applies to this fixed preparation and its stated sign bounds, not every possible memory history.

> Claim grade: derived. Falsifiers are a nonzero constant-velocity response, a positive period integral for the displayed memory operator, or a complete separated periodic-up-to-translation subfield pair satisfying the canonical-plus-memory equation. An actual nonperiodic trajectory is outside the periodic exclusion.

## Equal past/future radial response: a boundary exclusion

Use canonical inverse-square radial response, $K=1$ and equal weights $\alpha=1/2$. Freeze the complete boundary class

$$
x_i(t)=Ut+q_i(t),\qquad q_i(t+P)=q_i(t),\qquad
q_1(t)-q_2(t)\ge d>0,\qquad |x_i'(t)|\le1-\eta
$$

for every real $t$. The declared perturbation class consists of periodic $C^2$ changes of $q_i$, at fixed $U$ and $P$, retaining positive separation and the speed margin. This is a complete boundary problem. It is not evolution from a past preparation. Time-reflection-symmetric candidates are the $U=0$ subclass with $q_i(-t)=q_i(t)$ about a chosen origin.

Complete uniform subfield speed gives exactly one past and one future partner root, no self roots of either support, and positive transmitter factors $1-nv_j(s)$ and $1+nv_j(s)$. For the future root the direction again equals the present ordering direction by the same chord argument. Consequently every contribution to the right member's acceleration is strictly negative, while every contribution to the left member's acceleration is strictly positive. But the integral of each periodic acceleration over a period is zero. Hence no solution exists in this separated collinear boundary class, including its time-reflection-symmetric subclass and the declared periodic perturbations.

This is a complete class exclusion rather than a failed numerical solve. It does not exclude contact-bearing periodic histories, superfield histories with different roots, added labels, noncollinear periodic paths, or other future-boundary data. It supplies no initial-value uniqueness or physical-selection claim.

The exact stationary control has identical past and future contributions $\sigma n/r^2$. For a common affine source and receiver with velocity $U$ and nonzero fixed present separation $r$, the past range is $r/(1-nU)$ and future range is $r/(1+nU)$; after their Jacobian factors the half-sum is exactly $\sigma n/r^2$. The nonzero response excludes separated common affine motion as a solution, while verifying the weighting signs.

> Claim grade: derived. Falsifier: a complete separated uniformly subfield periodic-up-to-common-translation collinear pair satisfying both-root support and the equation, or a root of reversed direction under the same chord bound.

## Repaired linear law: retained control and unresolved robustness

The selected coupling is $k=0.2862286103053385$ and the response is $\sigma k(x_i(t)-x_j(s))/|D|$ over every self and partner root. The [exact-release and continuation owners](../priorities.md#work-and-dependencies) retain the already established held-release events and branch-selection obstruction. They are controls; this screen does not redo their measured passages or silently select an outgoing trace.

On the initial held-source interval, the mirror member solves $x''=-k(x+a)$, hence $x+a=2a\cos(\sqrt{k}t)$ and $v=-2a\sqrt{k}\sin(\sqrt{k}t)$ until its source root reaches release time. The instantaneous matched two-member control instead solves $x''=-2kx$. These distinct frequencies test whether a claimed control respects the delayed held-source history.

The radial self-birth calculation above does not apply with positive $p$ to this law: its numerator vanishes linearly in $R$. On a transverse crossing with acceleration $A>0$, the newborn self response tends to $2k/A$, a finite nonzero value. This explains why the linear model's outgoing acceleration solve is qualitatively different from positive inverse powers. It does not prove uniqueness, select a trace, or supersede the complete existing event analysis. A new robustness statement must carry the whole source history and show which local event hypotheses persist.

## Working record and independent-check needs

Initial analytical checkpoint frozen on 2026-10-05 before reading any new binary worker result. The proofs above are separately derived in this collinear assignment. They have not yet received independent adjudication and no new target numerical calculation has been run. The requested role lens is `jack-k-hale`; that role supplies no mathematical authority.

Status markers: ✓ Done, ◐ Partial or in progress, ○ Not done.

| Status | Scientific item | Independent assessment needed |
| --- | --- | --- |
| ◐ Derived, assessment pending | Radial $p\ge1$ first unit event before contact and positive-power self-birth obstruction | Audit the source-time contact inequality, complete root census and crossing regularity |
| ◐ Derived, assessment pending | Exact amplitude-gradient monotonicity and conditional asymmetric all-future dispersal | Independently derive the total-path derivative and test the global integral argument |
| ◐ Derived, assessment pending | Finite-width affine self formula and global Volterra existence for each fixed positive pair | Audit the $q=1$ limit, complete old-past support and Lipschitz continuation argument |
| ◐ Derived, assessment pending | Memory cycle identity and ordered periodic exclusion | Verify time shifts, equality class and baseline sign |
| ◐ Derived, assessment pending | Equal past/future complete periodic collinear exclusion | Verify future root direction and Jacobian signs under complete support |
| ○ Not done | New repaired-linear robustness theorem beyond retained exact-release findings | Choose a precise whole-history perturbation class without an outgoing selector |

No long-running producer is active. No Git publication, generated rewrite, production solver change, shared registry edit or earlier evidence edit is part of this worker's scope. The coordinator owns scientific integration and any shared-document propagation.
