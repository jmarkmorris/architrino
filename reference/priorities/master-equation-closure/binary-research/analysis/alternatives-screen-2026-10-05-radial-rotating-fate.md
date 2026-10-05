# Controlled expansion of a compatible radial-power binary

## Result and fixed scope

For the selected radial exponent $p=3/2$, a complete compatible near-circular preparation has a controlled outward change in its member radius over a time interval containing order $1/\epsilon$ revolutions. More precisely, for every fixed $L>0$, there are positive constants $C_L$ and $\epsilon_L$ such that its actual delayed solution satisfies

$$
\left|\frac{|X_+(T)|}{r_0}-(1+2\tau)^{2/3}\right|\le C_L\epsilon,
\qquad
\tau=\frac{\epsilon^2T}{r_0}\in[0,L],
\qquad r_0=\frac1{8\epsilon^4},
\qquad 0<\epsilon\le\epsilon_L.
$$

The proof below constructs the preparation and controls the solution, including its radial oscillation, throughout this secular interval. Here “secular” means that the elapsed time is long enough for a small acceleration correction to produce a radius change independent of $\epsilon$. This is a derived asymptotic family theorem with a uniform error bound on each declared interval. The constants are obtained from compact derivative bounds in the proof; no finite numerical value of $\epsilon_L$ is certified. The statement therefore admits no separately chosen finite-speed trajectory. It also does not assert global existence, all-future dispersal, pointwise increasing member radius, a periodic return or stable binding.

The selected law is [equation-variants §15](../../equation-variants/manuscript.md#15-other-radial-response-powers), with $p=3/2$ and $K=R_*=c_f=1$, unchanged all-root conventions and opposite mirror polarity. For $X_+=q$, $X_-=-q$ on a complete strictly subfield history, the unique partner source time $S<T$ gives

$$
R=T-S=|q(T)+q(S)|,\qquad n=\frac{q(T)+q(S)}R,\qquad D=1+n\cdot q'(S),\qquad q''=-\frac{n}{R^{3/2}D}.
$$

There are no positive-delay self roots on this domain. These facts will be proved for the preparation and retained throughout the finite theorem, rather than imposed by deleting roots. No receiver multiplier, speed ceiling, core, external constraint or physical conserved account is added.

## Complete compatible preparation

Fix the whole family before using it. Choose $0<\epsilon\le1/16$, put $r_0=1/(8\epsilon^4)$, $\omega=\epsilon/r_0$, and use the scaled time and position

$$
s=\epsilon T/r_0,\qquad Y(s)=q(T)/r_0.
$$

A prime on $Y$ denotes differentiation in $s$. A physical speed is $\epsilon|Y'|$. Let $Y_c(s)=(\cos s,\sin s)$, let $\xi$ be the unique solution in $(0,\epsilon)$ of $\xi=\epsilon\cos\xi$, and define

$$
A_c=-\frac{(\cos\xi,-\sin\xi)}{\cos^{3/2}\xi\,(1+\epsilon\sin\xi)},\qquad
B=A_c+(1,0),\qquad d=\epsilon/16.
$$

The vector $A_c$ is the exact scaled acceleration received at zero from the complete unpatched circle. It is not the circle's kinematic acceleration. Set

$$
\phi(s)=\frac{d^2}{2}z^3(1-z)^2,\qquad z=1+s/d,\qquad -d\le s\le0,
$$

and supply the complete past

$$
Y(s)=\begin{cases}Y_c(s),&s\le-d,\\Y_c(s)+\phi(s)B,&-d\le s\le0.\end{cases}
$$

The second member is its exact negative. In physical variables this is precisely an endpoint patch of width $r_0/16$ with coefficient equal to the exact received circle acceleration minus its kinematic acceleration. This entire past is supplied data; it is not claimed to solve the future equation at negative times.

The elementary bounds $0<\xi<\epsilon$, $\cos\xi\ge1-\epsilon^2/2$ and $1\le1+\epsilon\sin\xi\le1+\epsilon^2$ give $|B_x|\le2\epsilon^2$, $|B_y|\le2\epsilon$, and $|B|\le4\epsilon$. Writing $f(z)=z^3-2z^4+z^5$, its coefficient bounds on $[0,1]$ give $|f|\le1$, $|f'|\le16$ and $|f''|\le50$. Consequently

$$
|Y-Y_c|\le\epsilon^3/128,\qquad
|Y'-Y_c'|\le2\epsilon^2,\qquad
|Y''-Y_c''|\le100\epsilon.
$$

Thus the complete past is separated, its scaled speed is below two, its scaled acceleration is below eight, and its physical speed is at most $\epsilon(1+2\epsilon^2)<1$. Its signed areal rate $h=Y\times Y'$ is positive: the difference from the circular value one is bounded by $\epsilon^3/128+2\epsilon^2+\epsilon^5/64<1/100$. The scalar cross product is perpendicular to the fixed plane and is a geometric coordinate only.

The patch has $\phi=\phi'=\phi''=0$ at $-d$, while at zero it has $\phi=\phi'=0$ and $\phi''=1$. Therefore the supplied past is locally $C^{2,1}$, including the patch seam, and retains $Y(0)=(1,0)$ and $Y'(0)=(0,1)$.

It remains to check that its endpoint acceleration is compatible with the actual patched history. For any uniformly subfield complete history the partner gap as a function of physical delay $u$ is $u-|q(T)+q(T-u)|$. It is strictly increasing with slope at least one minus the complete speed bound, is negative at zero for a separated pair, and tends to positive infinity. The unique unpatched-circle root at zero has scaled source time $-2\epsilon\cos\xi<-\epsilon<-d$, inside the untouched tail. It is still a root for the patched history and is therefore its unique root. The strict speed chord bound also excludes every positive-delay self root. Hence $Y''(0-)=-(1,0)+B=A_c$ is exactly the selected equation's response at release. The future joins with a continuous acceleration; no incompatible circular release is used.

## Root control and the local expansion

In scaled variables the ordinary equation is

$$
Y''=-\frac{2^{3/2}N}{R_d^{3/2}D},\qquad
R_d=|Y(s)+Y(\sigma)|,\quad s-\sigma=\epsilon R_d,\quad
N=\frac{Y(s)+Y(\sigma)}{R_d},\quad D=1+\epsilon N\cdot Y'(\sigma).
$$

If the supplied and generated physical speeds are bounded by $b<1$, the exact delay and acceleration bounds are

$$
\frac{2r}{1+b}\le R_d\le\frac{2r}{1-b},\qquad
|Y''|\le\frac{(1+b)^{3/2}}{1-b}\,r^{-3/2},\qquad r=|Y|.
$$

The delay inequality follows by subtracting the current position from the source position and using the speed chord bound. It retains the complete past. The acceleration inequality follows from $D\ge1-b$. On a compact separated region with bounded scaled velocity and $\epsilon$ sufficiently small, it gives a uniform scaled acceleration bound, including windows crossing the supplied seam. The past acceleration estimate above supplies the other side of that seam.

On such a compact region, Taylor's formula with an integral acceleration remainder yields, uniformly on every source window,

$$
\begin{aligned}
Y(\sigma)&=Y(s)-uY'(s)+O(u^2),\\
Y'(\sigma)&=Y'(s)+O(u),\\
u&=2\epsilon r+O(\epsilon^2),\qquad u=s-\sigma.
\end{aligned}
$$

Every remainder constant depends only on the compact radius, velocity and acceleration bounds, not on elapsed time or $\epsilon$. No jerk estimate or differentiation of a remainder is used. Let $n=Y/r$, let $t$ be its positively rotated unit vector, and let $u_r=Y'\cdot n$, $v_t=Y'\cdot t$. Direct norm and direction expansion gives

$$
R_d=2r(1-\epsilon u_r)+O(\epsilon^2),\qquad
N=n-\epsilon v_t t+O(\epsilon^2),\qquad
D=1+\epsilon u_r+O(\epsilon^2).
$$

Thus, for the fixed power,

$$
Y''=-r^{-3/2}n+\epsilon r^{-3/2}\left(v_t t-\tfrac12u_r n\right)+Q,
\qquad |Q|\le C\epsilon^2.
$$

This is an actual local remainder bound on the compact region. The same calculation at the separately known algebraic control $p=2$ gives $-r^{-2}n+\epsilon r^{-2}(v_t t-u_r n)+O(\epsilon^2)$, which is the established first-order inverse-square row in the [slow-binary theorem](slow-binary-wider-regime.md#1-exact-row-complete-roots-and-the-release-layer). That control tests the exponent and transmitter-factor signs; it does not independently verify the new long-time proof.

Writing $h=Y\times Y'=rv_t$, the exact polar equations and these bounded remainders give

$$
r'=u_r,\qquad
u_r'=\frac{h^2}{r^3}-r^{-3/2}-\frac{\epsilon u_r}{2r^{3/2}}+\rho_r,
\qquad
h'=\frac{\epsilon h}{r^{3/2}}+\rho_h,
\qquad |\rho_r|+|\rho_h|\le C\epsilon^2.
$$

Both remainder bounds hold simultaneously. The constants may enlarge when multiplied by the compact radius bound. These equations are consequences of the delayed solution, not a replacement evolution law.

## A moving circular radius and a controlled oscillator

The zero-delay radial acceleration vanishes when $h^2=r^{3/2}$. Define the moving circular radius $a=h^{4/3}$ and its leading drift

$$
F(h)=\frac43\epsilon a^{-1/2},\qquad w=u_r-F(h).
$$

The quantity $a$ is a coordinate computed from the actual areal rate, not an assertion that the trajectory is a circle. The exact polar equations imply

$$
a'=\frac43\epsilon\frac{a}{r^{3/2}}+O(\epsilon^2).
$$

A useful positive measure of the radial departure is constructed directly from the zero-delay radial equation. Define

$$
U(r,h)=\frac{h^2}{2r^2}-2r^{-1/2},\qquad
W(r,h)=U(r,h)-U(a,h),\qquad
\mathcal E=\frac12w^2+W(r,h).
$$

This $U$ is an auxiliary scalar antiderivative of the radial acceleration. It is not an imported physical energy, nor is it conserved by the delayed equation. At $r=a$, $U_r=0$ and

$$
U_{rr}(a,h)=\frac32a^{-5/2}>0.
$$

On any compact range of positive $a$, choose a fixed sufficiently small relative neighbourhood of $r=a$. Taylor's formula then gives positive constants $c,C$ for which

$$
c\big[(r-a)^2+w^2\big]\le\mathcal E\le C\big[(r-a)^2+w^2\big].
$$

All derivatives used below are bounded on this compact neighbourhood. Differentiating the exact expression for $\mathcal E$, without differentiating $\rho_r$ or $\rho_h$, gives

$$
\mathcal E'=F U_r+[U_h(r,h)-U_h(a,h)]h'
+w\left[-\frac{\epsilon u_r}{2r^{3/2}}+\rho_r-F_hh'\right].
$$

The apparent order-$\epsilon|r-a|$ drive in the first two terms cancels. To see the cancellation explicitly, replace $h'$ there by $\epsilon h/a^{3/2}$. At $r=a$ both factors vanish, and the coefficient of $r-a$ is

$$
\frac43\epsilon a^{-1/2}\frac32a^{-5/2}
+\left(-\frac{2h}{a^3}\right)\frac{\epsilon h}{a^{3/2}}
=2\epsilon a^{-3}-2\epsilon a^{-3}=0.
$$

Taylor's formula bounds the remaining part by $C\epsilon(r-a)^2$. Restoring the actual $h'$ changes it by at most $C\epsilon(r-a)^2+C\epsilon^2|r-a|$, since $h'-\epsilon h/a^{3/2}=O(\epsilon|r-a|+\epsilon^2)$. Also $F_h=O(\epsilon)$, $h'=O(\epsilon)$, and $u_r=w+O(\epsilon)$. Therefore

$$
\mathcal E'\le C\epsilon\mathcal E+C\epsilon^2\sqrt{\mathcal E}.
$$

This inequality preserves the nonlinear radial restoring term inside $W$. Replacing that term by a linear oscillator with an uncontrolled quadratic error over the long interval would not suffice. For $J=\sqrt{\mathcal E}$, regularization by $\sqrt{\mathcal E+\eta}$ followed by $\eta\downarrow0$ gives

$$
J(s)\le e^{C\epsilon s}\big[J(0)+C\epsilon^2s\big].
$$

At release $a=r=h=1$, $u_r=0$ and $w=-4\epsilon/3$, so $J(0)=2\sqrt2\epsilon/3$. For $0\le\epsilon s\le L$ the bound is $J\le C_L\epsilon$. It follows that

$$
|r-a|+|u_r|\le C_L\epsilon.
$$

These are bounds for the actual delayed solution over a secular interval; no averaging theorem or numerical trajectory is used.

## Closing the interval and extracting the drift

The compact bounds used above can be selected before continuation. Let $A=(1+2L)^{2/3}$ and provisionally take $a\in[1/2,A+1]$, $|r/a-1|<\eta$ for a sufficiently small fixed $\eta>0$ making $U_{rr}>0$, and $|w|<1$. The associated scaled velocities are bounded independently of $\epsilon$. Choose $\epsilon$ small enough that their physical speeds and the complete supplied past speeds are below $1/2$. The root and response bounds then give all constants used in the preceding proof on this single compact region.

By the oscillator bound, $|r-a|+|u_r|\le C_L\epsilon$. Differentiating $a^{3/2}$ and retaining the actual remainders gives

$$
\frac d{ds}a^{3/2}=2\epsilon\left(\frac ar\right)^{3/2}+O(\epsilon^2)
=2\epsilon+O_L(\epsilon^2).
$$

Since $a(0)=1$, integration through $s\le L/\epsilon$ yields

$$
a^{3/2}=1+2\epsilon s+O_L(\epsilon),\qquad
a=(1+2\epsilon s)^{2/3}+O_L(\epsilon).
$$

For sufficiently small $\epsilon$, these estimates place $a,r,w$ strictly inside the provisional compact region. The ordinary method of steps supplies a unique continuation because the source delay has a positive lower bound on this region and the complete root factors remain bounded away from zero. No compact exit or speed event can occur first. A first-exit argument therefore extends the actual solution through the entire claimed interval. This construction defines positive constants $C_L,\epsilon_L$ from finitely many compact bounds and strict inequalities; it does not assign them numerical values.

The leading geometric consequences, uniformly for $0\le\tau=\epsilon s\le L$, are

$$
\begin{aligned}
r&=(1+2\tau)^{2/3}+O_L(\epsilon),\\
h&=(1+2\tau)^{1/2}+O_L(\epsilon),\\
|q'(T)|&=\epsilon(1+2\tau)^{-1/6}+O_L(\epsilon^2),\\
\epsilon\,[\theta(T)-\theta(0)]&=3\big[(1+2\tau)^{1/6}-1\big]+O_L(\epsilon).
\end{aligned}
$$

The angle follows by integrating $d\theta/ds=h/r^2=(1+2\epsilon s)^{-5/6}+O_L(\epsilon)$. Its unscaled error is $O_L(1)$, so this theorem does not certify a detailed orbital phase or the timing of individual radial extrema. The physical radial speed is only bounded by $O_L(\epsilon^2)$, while the physical transverse speed is order $\epsilon$.

For every fixed enlargement factor $M>1$, choose $L$ with $(1+2L)^{2/3}>M$. The theorem then implies that every sufficiently small member of this fixed preparation family reaches member radius greater than $Mr_0$ while remaining separated and uniformly subfield through that time. The complete root census remains one partner and no self root. This is an actual controlled expansion statement, substantially beyond an instantaneous tangential residual. The allowed speed threshold depends on $M$; taking $M\to\infty$ at one fixed $\epsilon$ is not licensed.

## Later fate and first unresolved obstruction

The preparation satisfies all initial hypotheses of the independently reconstructed [positive radial rotating-class theorem](alternatives-screen-2026-10-05-radial-rotating-class.md), assessed in the [escape supplement](../../analysis/alternatives-screen-2026-10-05-adjudication-escape-supplement.md#rotating-mirror-radial-class): complete separated uniformly subfield past, nonnegative past areal rate and strictly positive release areal rate. The exact causal-half-plane argument consequently preserves positive areal rate on the maximal strict-subfield future. Contact cannot be its first finite obstruction. Any finite maximal strict-subfield endpoint must instead be unit speed at positive clearance; a global future cannot remain bounded; a global future with one uniform speed margin disperses.

The finite theorem above supplies that uniform margin only on each separately controlled finite secular interval. Its compact constants grow with $L$, and the proof does not prevent accumulated radial oscillation from eventually leaving the near-circular neighbourhood. That proof-chart exit would not itself be a physical event. For one fixed sufficiently small launch, its all-future choice among global uniformly subfield dispersal, loss of a common margin, and finite unit-speed endpoint remains unresolved. No physical branch selector or superfield continuation is supplied.

## Evidence, falsifiers and ownership

**Grade:** derived by the assigned geometry/dynamics specialist, awaiting independent assessment. The derivation uses the fixed equation, exact root geometry, a compatible complete supplied past, integral acceleration remainders and an auxiliary positive scalar function. It uses no simulation, numerical target, new production solver or externally imported physical conservation law. The $p=2$ local row is an analytic sign/control comparison with a preserved existing subject, not a second independent proof of the $p=3/2$ theorem.

A falsifier is a failure of the exact endpoint patch compatibility, a positive-delay self root or additional partner root under the retained uniform speed bound, an order-$\epsilon$ term missing from the local row, failure of the displayed first-order cancellation in $\mathcal E'$, or a family of actual solutions violating the uniform $O_L(\epsilon)$ radius bound on some fixed $L$ as $\epsilon\downarrow0$. Finite-speed numerical disagreement cannot by itself falsify the theorem without an admitted threshold and controlled solution errors. Conversely, this proof cannot certify such a finite-speed calculation merely because it follows the displayed curve.

Only this newly assigned source was written. Shared manuscripts, existing references, ledgers, frozen evidence, the Git index/commits and generators were not modified by this specialist. A scoped `git diff --no-index --check /dev/null` on this new source emitted no whitespace diagnostics (exit 1 indicates the new-file difference). The equations and proof steps were reread in the source; this is author checking, not independent adjudication. No owned computation was launched or left running. Independent review should reconstruct the moving-radius cancellation and the uniform first-exit argument; no numerical instrument is required to reproduce the present claim.
