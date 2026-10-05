# Final adversarial audit of radial and fixed-memory terminal selection

## Verdict and evidence boundary

**Derived assessment:** no decisive gap was found in the reviewed occurrence proofs or in the stated Cartesian robustness domains. For every separately fixed $1<p<3$, the unchanged compatible radial-power slow family contains both zero-terminal-speed and positive-terminal-speed launches arbitrarily close to zero launch parameter. The same conclusion holds separately for the unchanged unit uniform-memory family. Every fixed sufficiently small positive-speed member has the stated relative open neighborhood of complete compatible Cartesian histories with separated uniformly subfield scattering and distinct nonzero terminal velocities. The zero-speed occurrence proofs remain restricted to the mirror-planar families; they establish no open zero-speed neighborhood.

The conclusion rests on the explicit checks below, especially the phase determinant at fractional powers, the construction of a bounded-gradient approximate transport corrector, the conditional remaining-time bound at zero speed, and the retention of complete old-source and memory intervals. This is an adversarial reconstruction after disclosure of the subjects and their adjudications. It is not a blind reference, a new numerical certificate, or independent evidence merely because the earlier assessments agree. No external physical law, conservation principle, numerical trajectory, changed equation, or material from other comparison-law investigations enters the audit.

There are no quantitative launch thresholds or identified launch parameters. Constants and neighborhoods can depend on the fixed exponent and the fixed member. The conclusions do not establish density, ordering, isolation or genericity of either terminal alternative. Finite total angle concerns the generated future: the supplied infinite circular past already has infinite accumulated angle. Zero terminal speed with radius tending to infinity is dispersal, not binding.

## Fixed equations and complete compatible preparations

The radial equation uses opposite polarities, $K=R_*=c_f=1$, and the sharp ordinary received acceleration

$$
A_i(T)=-\frac{n_i}{R_i^pD_i},\qquad
R_i=T-S_i=|X_i(T)-X_j(S_i)|,\qquad
D_i=1-n_i\cdot V_j(S_i),\quad j\ne i.
$$

Here $V_i=X_i'$, $A_i=X_i''$ in physical time, and $n_i=[X_i(T)-X_j(S_i)]/R_i$ is the received unit direction. The single-partner form is justified by the complete census below, rather than imposed as a channel restriction.

The mirror family has $X_1=q=-X_2$, $q=r_0Y(s)$,

$$
r_0=(2^p\epsilon^2)^{-1/(p-1)},\qquad s=\epsilon T/r_0.
$$

Its complete old path is the circle $Y_c=(\cos s,\sin s)$ with the prescribed final correction $\phi_dB_p$ on $[-d,0]$, where

$$
d=\epsilon/16,\quad \phi_d=\frac{d^2}{2}\zeta^3(1-\zeta)^2,\quad
\zeta=1+s/d,\quad
B_p=e_1-\frac{(\cos\xi,-\sin\xi)}{\cos^p\xi(1+\epsilon\sin\xi)},\quad
\xi=\epsilon\cos\xi.
$$

The patch has zero jets through order two at its old seam and release jets $(0,0,1)$. The release partner time is $-2\xi<-\epsilon<-d$ for the admitted small range, so changing the endpoint acceleration does not change the sampled source. This verifies exact compatibility without assuming that the prescribed old circle solves the future equation. The same normalization and patch are retained for the above-two extension; its exponent-dependent estimates supply that extension, rather than an automatic transfer of the lower-power constants.

The memory equation instead retains the canonical received contribution $F_i$ and selects exactly

$$
A_i=F_i-\int_0^1[V_i(T)-V_i(T-\vartheta)]\,d\vartheta,
\qquad K=c_f=\lambda=\tau=1.
$$

The exact identities

$$
H_i=-V_i(T)+X_i(T)-X_i(T-1)
=-\int_0^1(1-\vartheta)A_i(T-\vartheta)\,d\vartheta
$$

separate ordinary position-velocity evolution from a useful acceleration estimate. No independent acceleration history is appended to the initial data. Its mirror family has $r_0=(6\epsilon^2)^{-1}$, $s=\epsilon T/r_0$, $\mu=6\epsilon^3$, and the same polynomial with scaled width $d=\mu/2$. Its physical width is $1/2$. The release partner source and the sample at physical time $-1$ precede the patch; unchanged release position and velocity therefore permit exact correction of the received endpoint acceleration.

For either law, a complete common speed bound $b<1$ and positive simultaneous gap $d(T)$ imply

$$
\frac{d(T)}{1+b}\le R_i(T)\le\frac{d(T)}{1-b},\qquad D_i\ge1-b.
\tag{1}
$$

Indeed the delay residual $u-|X_i(T)-X_j(T-u)|$ starts negative and increases with modulus at least $1-b$ all the way to the infinite supplied past. It tends to positive infinity and has one root. A same-label chord has length strictly less than $u$ at every positive delay, excluding positive-delay self roots geometrically. No self channel or remote partner source is deleted. This common root argument is also what makes the finite-prefix continuity and outgoing estimates below valid before sources have entered the generated future.

## Radial phase winding and the fractional boundary

Write $r=|Y|$, $u=r'$, and let $h=Y\times Y'$ denote the positive scalar areal rate in the mirror plane, with primes denoting $s$ derivatives. Let $n=Y/r$ and $t$ be its positive quarter-turn. Set

$$
\beta=p-1,\quad m=3-p,\quad \alpha=\beta/2,\quad
k=2/m,\quad d=\beta/m,\quad c=\beta(p-2)/m,\quad
\gamma=p\beta/m>0,
$$

$$
a=h^{2/m},\quad x=r/a,\quad y=a^\alpha u,\quad
\delta=\epsilon a^{-\alpha},\quad z=x^{-\beta},\quad
\frac{d\chi}{ds}=a^{-(p+1)/2}x^{-p},\quad \nu=m/\beta.
$$

Here $d$ is a coefficient; the preparation width has already been specified separately. Reconstructing the signed response and the scale derivatives gives the actual complete-history rows

$$
z_\chi=-\beta y+\beta k\delta z+O_p(\delta^2z),\qquad
y_\chi=z^\nu-1+c\delta y+O_p(\delta^2),\qquad
\delta_\chi=-d\delta^2+O_p(\delta^3).
\tag{2}
$$

The first error must retain its factor $z$. The late-source proof obtains the transverse received acceleration as $\epsilon vr^{-p}[1+O_p(\delta)]$, retaining $v=h/r$, before dividing by the weighted clock. It first compares radii on the entire source interval using (1), then uses positive torque to establish $|\log[h(S)/h(T)]|\le C_p\delta^2z$. Reintegration improves the full-window radius comparison to $1+O_p(\delta)$. The nested source windows are generated sufficiently late, before the fixed-amplitude transition for small enough launch parameter. This closes the potential error caused by using a compact near-circle Taylor estimate at arbitrarily large relative radius.

The finite-transition coordinate $w=y-k\delta x^{1-p}$ has a corrected radial minimum $x_\delta=1+O_p(\delta^2)$, with $\partial_\delta x_\delta=O_p(\delta)$. Its positive amplitude $J$ starts at $k\epsilon/\sqrt2+O_p(\epsilon^3)$ and obeys a seed-preserving inequality. With the transition clock $d\eta/ds=a^{-(p+1)/2}$, direct phase differentiation yields

$$
\frac{d}{d\eta}\arg\{\sqrt m(x-x_\delta)+iw\}
=-\sqrt m+O_p(J+\delta+\delta^3/J)<-b_p<0.
\tag{3}
$$

The seed floor $J\ge c_p\epsilon$ and $\delta\le\epsilon$ justify the last inequality on the entire prefix, not only on the final fixed-amplitude band. That band's duration is comparable to $\epsilon^{-(p+2)/p}$. Thus an earlier positive phase contribution cannot cancel the diverging negative turn count.

The extension through large radius uses $\ell=1/\beta>1/2$, $Z=z^\ell$, $b=x_\delta$ and

$$
\mathcal W=\sqrt m(1-bZ)+iZ(y-k\delta z).
\tag{4}
$$

It is the transition coordinate multiplied by the positive factor $Z$. After transition its possible zero would require $z=1+O_p(\delta^2)$ and $y=O_p(\delta)$, forbidden by the fixed gap above the central scalar minimum. The global proofs retain that gap through their final comparison segment. Hence (4) never vanishes.

The most important adverse check is at $2<p<3$, where $1/2<\ell<1$. A componentwise estimate that uses $z^{2\ell-1}\le C z^\ell$ would fail. Write $w=y-k\delta z$ and the real and imaginary parts of (4) as $U,V$. The exact cancellation is

$$
\frac{UV_\chi-VU_\chi}{\sqrt m}
=Z_\chi w+Z(1-bZ)w_\chi+b_\chi Z^2w.
\tag{5}
$$

Substituting (2), using $\beta\ell=1$ and $b_\chi=O_p(\delta^3)$, gives

$$
\operatorname{Im}(\overline{\mathcal W}\mathcal W_\chi)
=-\sqrt m\left[z^{\ell-1}y^2+z^\ell(z^\ell-1)(z^\nu-1)\right]
+O_p(\delta z^\ell).
\tag{6}
$$

The singular factor $z^{\ell-1}$ multiplies the retained negative square. Its correction from $w-y=-k\delta z$ has an additional factor $z$ and is harmless. At small $z$, the second product is bounded below by a positive constant times $z^\ell$; away from zero the scalar gap excludes the only central zero. Equation (6) is therefore strictly negative for sufficiently small fixed-power launches. No derivative of an actual history-dependent remainder is used.

At the terminal coordinate boundary $z\to0$, bounded $y,\delta$ give $\mathcal W\to\sqrt m>0$. An eventual small disk around this value excludes further complete turns. The lifted phase consequently has a finite limit $2\pi N_p$, with

$$
N_p(\epsilon)\in\mathbb Z,\qquad
N_p(\epsilon)\longrightarrow-\infty\quad(\epsilon\downarrow0).
\tag{7}
$$

The underlying global extension for $p>2$ also survives its own regularity test. Its central field $F_0=(-\beta y,g(z))$, where $g=\operatorname{sgn}(z)|z|^\nu-1$, is only continuous at zero. When $y\ne0$, use $z$ as time in $dy/dz=-g(z)/(\beta y)$, which is locally Lipschitz in its dependent variable. At $(z,y)=(0,0)$, the potential $W(z)=|z|^{2/\beta}/2-z/\beta$ has $W'(0)=-1/\beta$; invert it locally and use $y$ as time, whose derivative is nonzero. This proves uniqueness at the fractional point without differentiating $g$. Compactness of integral equations and uniqueness then give uniform finite-time comparison. The positive cycle increment is $\delta[\gamma I(e)+o(1)]$, with bounded return times; the divergent lower harmonic sum of $\delta$ rules out indefinite confinement. No unproved Lipschitz flow is needed.

At a zero-speed endpoint, (2) gives $y\asymp\Delta$ and, by backward integration of $z_\chi=-\beta y+b_0(\chi)z$ with bounded $b_0$, $z\asymp\Delta^2$, where $\Delta=\chi_\infty-\chi$. At a positive-speed endpoint, $z\asymp\Delta$. The exact physical-time integral diverges in both cases. For $p>2$, the angular integrand is $z^{-\rho}$ with $\rho=(p-2)/(p-1)<1/2$. It is unbounded but integrable even in the zero-speed case, where it is comparable to $\Delta^{-2\rho}$. This verifies the finite future angle without extending a bounded-integrand argument beyond its domain.

## Continuity and the two distinct selection arguments

Fix a positive launch parameter inside its sufficiently small admitted interval. Nearby complete circle-plus-patch histories converge in $C^2$ on each compact old physical-time interval. Moving patch seams preserve this convergence because the patch jets through order two vanish at the seam. Uniform convergence over the infinite circular past is generally false and is not used.

On any fixed finite receiving interval, (1), the common speed ceiling and locally bounded current positions put every partner source in a common compact old interval. A positive pair gap gives a positive delay floor. A positional discrepancy $E$ moves a root by at most $2E/(1-b)$. Compare source velocities at a common time first, then shift only the reference velocity, using its bounded acceleration on that compact interval. Thus the received acceleration is locally Lipschitz in compact position-velocity discrepancies. Causal steps and the integral difference inequality give finite-prefix continuity. The memory identity adds only a current position-velocity term and the retained sample one unit earlier. It does not require a neutral evolution theorem or an independent acceleration datum.

For either radial or memory weighted rows, near a positive terminal value $Y_*>0$ one has

$$
z_\xi=-c_0y+b_0(\xi)z,\quad |b_0|\le C\epsilon,\quad |y_\xi|\le M,
$$

where $\xi$ is $\chi$ or the polar angle. Observe the fixed member late enough that $y>3Y_*/4$ and $z=\zeta$ is small. Finite-prefix continuity gives neighboring members with $y>2Y_*/3$, $z<2\zeta$. Choose $\zeta$ so that $z_\xi\le-c_0Y_*/4$ while $y\ge Y_*/2$ and

$$
M\frac{8\zeta}{c_0Y_*}<Y_*/6.
\tag{8}
$$

Then the terminal boundary occurs before $y$ can leave that positive strip. The whole remaining radial winding coordinate lies in its right-half-plane argument chart. In the memory case the remaining angle and terminal variables are similarly controlled. The integer is locally constant on the positive-speed set, and that set is open. If all sufficiently small parameters were positive-speed, connectedness would make the integer constant, contradicting its divergence. This proves zero-speed occurrence, without assuming terminal continuity at zero speed.

The reverse occurrence statement needs a different estimate. In the radial case set $e=y^2/2+W(z)$, an algebraic comparison scalar rather than a physical conserved energy. The action $I(e)=\oint y^2d\chi$ is $C^1$ with $I'=Q$, the continuous positive period of its regular central oval. The exact identity obtained by integrating $(zy)_\chi$ is

$$
\oint F\,d\chi=\gamma I(e),\qquad
F=cy^2+k(|z|^{2/\beta}-z).
\tag{9}
$$

Consequently $G=QF-\gamma I$ has zero orbit integral and a continuous single-valued orbit primitive $B$ with continuous flow derivative $G$. A full $C^1$ primitive cannot simply be assumed; for $7/3\le p<3$ the period derivative is singular at the zero scalar level. The reviewed proof explicitly avoids that assumption.

Where $g\ne0$, $(e,y)$ is a $C^1$ chart and $\partial_yB=G/g$ is continuous. Where $y\ne0$, $(e,z)$ is a $C^1$ chart and $\partial_zB=-G/(\beta y)$ is continuous. These charts cover the compact annulus away from its sole equilibrium. Mollification in each chart approximates both the continuous function and its existing derivative along the flow. A finite $C^1$ partition $\rho_j$ gives $\widetilde B=\sum\rho_jB_j$, with the exact error identity

$$
F_0\cdot\nabla\widetilde B-G
=\sum_j\rho_j(F_0\cdot\nabla B_j-G)
+\sum_j(F_0\cdot\nabla\rho_j)(B_j-B).
\tag{10}
$$

Both sums can be made smaller than a prescribed fixed $\eta>0$. The full gradient of this fixed approximation is bounded, though not uniformly as $\eta\downarrow0$. First fix $\eta<\gamma\min I/4$, then reduce the launch threshold to absorb its gradient-dependent quadratic error. This order prevents a hidden uniform-smoothness assumption.

The terminal-normalized scalar is

$$
\mathcal A=I(e)-I(0)-\delta[\widetilde B(z,y)-\widetilde B(0,0)],
\qquad \mathcal A_\chi\ge c_A\delta>0.
\tag{11}
$$

For a zero-speed endpoint $z,y\to0$ and $\delta_\infty>0$, so $\mathcal A_\infty=0$ exactly. With $\delta_\chi\ge-C_\delta\delta^2$, integration from a late observation gives the conditional remaining weighted-time bound

$$
L\le\frac{\exp[C_\delta(-\mathcal A_0)/c_A]-1}{C_\delta\delta_0}.
\tag{12}
$$

This follows from $-\mathcal A_0\ge c_A\int_0^L\delta\,d\chi$ and $\delta\ge\delta_0/(1+C_\delta\delta_0\chi)$. It applies only to members known to end at zero speed. For one fixed zero-speed member, its right-hand side tends to zero as the observation advances. Finite-prefix continuity makes the bound uniformly small for nearby zero-speed members, since their $\delta_0$ stays bounded away from zero. Bounded $|z_\chi|$ confines their entire remaining paths to the small-$z$ argument chart. Hence $N_p$ is locally constant relative to the zero-speed set. If an entire initial parameter interval were zero-speed, that relative statement would become ordinary local constancy on a connected interval, again contradicting (7). Positive-speed members therefore also accumulate at zero.

These two arguments are consistent. They do not prove continuity of the integer across a zero-speed boundary through arbitrary positive-speed neighbors; such neighbors need not satisfy (12) and can acquire further turns. Neither argument proves that the zero set has empty interior. The complement of the open positive set is relatively closed, but its detailed topology remains undetermined.

## Memory-specific seed, winding and positive occurrence

The memory selection proof does not import the radial-power winding. In scaled variables, with $A=Y''$, its exact filter is

$$
A+K_\mu A=\tfrac32F,\quad F=-\frac{4N}{R_d^2D},\quad
(K_\mu f)(s)=\int_0^1(1-\vartheta)f(s-\mu\vartheta)d\vartheta.
$$

On the complete provisional domain $h\ge1/2$, $r\ge c_*h^2$, $|u|\le C/h$, with fixed $c_*>0$, the weighted running-supremum estimate first gives $|A|\le C/r^2$. This proves full-source areal-rate comparability without assuming a memory torque sign. Differentiating the canonical received input with its actual source clock and source acceleration gives $|F'|\le C/(hr^3)$ and the stronger fixed-axis transverse bound $|F'_t|\le Ch/r^4$. For $E=A-F$, the defect equation $E+K_\mu E=F/2-K_\mu F$ then gives weighted bounds with weights $h^3r^2$ and $r^4/h$. Rotating source axes contribute an angle at most $C\mu h/r^2$ and are controlled by the already established norm estimate. After the supplied transient, this yields

$$
|E|\le\frac{C\epsilon^3}{h^3r^2},\qquad
|E_t|\le\frac{C\epsilon^3h}{r^4}.
\tag{13}
$$

The transient has total scaled impulse $O(\epsilon\mu)=O(\epsilon^4)$. The weights remain valid at arbitrarily large radius; thus the signed angle-clock equations hold on the full global box, not only at small eccentricity. With $z=h^2/r$, $y=hu$, $\delta=\epsilon/h$ and the actual polar angle satisfying $d\theta/ds=h/r^2$, they are

$$
z_\theta=-y+2\delta z+2\delta^2yz+O(\delta^3z),\quad
y_\theta=z-1+\delta^2(y^2+z^2/2)+O(\delta^3),\quad
h_\theta/h=\delta+\delta^2y+O(\delta^3).
\tag{14}
$$

The order-$\delta y$ terms cancel in $y_\theta$: one comes from differentiating $h$ in $hu$, the other from the signed radial acceleration. Omitting either would change the selection argument.

Now let $e=(z-1)n-yt$ be the algebraic eccentricity vector, $e_n=e\cdot n$, $e_t=e\cdot t$, $x=e/h$, and $M=2nn^{\mathsf T}-I$. Direct differentiation of (14) gives

$$
x_\theta=\frac{2\epsilon}{h^2}n+\frac\epsilon h Mx+
\frac{\epsilon^2}{h^3}\left[-e_t(2+e_n)n-\frac{(1+e_n)^2}{2}t\right]
+O(\epsilon^3/h^4).
$$

For $b=x+2\epsilon t/h^2+(5/2)\epsilon^2n/h^3$, the constant second-order tangential terms sum to $2-4-1/2+5/2=0$. In fixed plane axes, $C(\theta)=\tfrac12\left(\begin{smallmatrix}\sin2\theta&-\cos2\theta\\-\cos2\theta&-\sin2\theta\end{smallmatrix}\right)$ is bounded and satisfies $C_\theta=M$. Set $Z=(I-\epsilon C/h)b$. Then

$$
|Z_\theta|\le C_0\epsilon^2h^{-2}|Z|+C_0\epsilon^3h^{-4}.
$$

Because $h_\theta\in[\epsilon/2,2\epsilon]$, both integrals are bounded by $O(\epsilon)$ and $O(\epsilon^2)$ respectively after changing variable to $h$. The release seed survives as $Z=2\epsilon t(0)+O(\epsilon^2)$ on the entire admitted future. At the endpoint $e_\infty=-n_\infty-y_\infty t_\infty$, so $1\le|e_\infty|\le C$; first obtaining $h_\infty\ge c/\epsilon$ makes the endpoint correctors negligible and then gives $h_\infty\le C/\epsilon$. Thus $\theta_\infty\asymp\epsilon^{-2}$ and the terminal eccentricity direction has a fixed argument $\varphi$ near $\pi/2$.

The exact terminal identity consequently defines

$$
N_m=\frac{\theta_\infty+\pi+\arctan y_\infty-\varphi}{2\pi}\in\mathbb Z,
\qquad N_m\longrightarrow+\infty.
\tag{15}
$$

Positive terminal strips establish zero occurrence as above. For positive occurrence, the memory-specific polynomial suffices:

$$
E_0=\tfrac12[(z-1)^2+y^2],\qquad
\mathcal A=E_0-\tfrac12-\delta(z+1)y.
$$

For the memory comparison field $F_0=(-y,z-1)$, one has $F_0\cdot\nabla[(z+1)y]=z^2-1-y^2$. Thus (14) gives $\mathcal A_\theta=2\delta E_0+O(\delta^2)\ge c_A\delta$ on the full post-transition gap. It tends exactly to zero at a zero-speed endpoint. Equation (12), now for remaining angle, proves relative continuity of $\theta_\infty$ on the zero-speed set. There $y_\infty=0$ and $e_\infty=-n_\infty$, so (15) is relatively locally constant. An all-zero initial interval contradicts its divergence. This closes positive occurrence using the actual fixed-memory equation.

## Exact memory zero-speed coefficient

This section returns to physical variables $r=|q|$, $u=dr/dT$ and $H=q\times q'$. The reviewed asymptotic proof is memberwise. Its premises are the admitted zero-speed future, $r\asymp T^{2/3}$, eventual $u>0$, $u\to0$, finite positive physical areal-rate limit $H_\infty$, and finite future angle. By (1), $R=O(r)=o(T)$, hence the actual source satisfies $S/T\to1$ and eventually lies in the generated future. The supremum of speed on $[S,T]$ tends to zero, yielding

$$
F(T)=-f(T)[n_\infty+o(1)],\qquad f(T)=\frac1{4r(T)^2}\asymp T^{-4/3}.
$$

For each fixed $L$, $f(T-s)/f(T)\to1$ uniformly on $0\le s\le L$. The exact convolution equation is $A+k*A=F$, with $k(s)=1-s$ on $[0,1]$ and mass $1/2$. Its running-supremum bound gives globally bounded acceleration from the retained supplied interval and bounded received input.

Iterate the identity $N=\lfloor T/2\rfloor$ times. Every argument remains at least $T/2>0$, so the equation is used only at generated times. The remainder is bounded by $2^{-N}\sup|A|$ and is negligible relative to $f(T)$. For fixed $j$, $(k^{*j}*F)/f(T)\to-2^{-j}n_\infty$; for all $j<N$ the two-sided polynomial bound gives domination by $C2^{-j}$. Passing first through a finite sum and then through its geometric tail proves

$$
A/f\longrightarrow-\tfrac23n_\infty.
$$

The value $2/3$ is therefore a proved asymptotic of this exact filter on this class, not a local replacement in the equation. The polar identity gives $r''=H^2/r^3+n\cdot A\sim-1/(6r^2)$. Integrating $d(u^2)/dr=2r''$ to infinity gives $u^2\sim1/(3r)$ and hence

$$
r\sim C_MT^{2/3},\quad u\sim\tfrac23C_MT^{-1/3},\quad
\theta_\infty-\theta\sim\frac{3H_\infty}{C_M^2}T^{-1/3},\qquad
C_M=(3/4)^{1/3}.
\tag{16}
$$

The coefficient is for one member's radius; pair separation has twice that coefficient. The tail sandwich justifying each integration needs no derivative of an $o(1)$ term. None of these limits is asserted uniformly as the launch parameter tends to zero.

## Complete-history Cartesian robustness and its exact domains

For the radial law, (1) gives $|A_i|\le C_b d^{-p}$, $C_b=(1+b)^p/(1-b)$. At a finite entry retain the entire past with speed at most $b_0<b<1$. For a fixed unit vector $e$, put $z_0=e\cdot(X_1-X_2)>0$, $w_0=e\cdot(V_1-V_2)$, choose $v>0$, and set

$$
I=\frac{C_bz_0^{1-p}}{v(p-1)}.
$$

The strict inequalities $I<b-b_0$ and $2I<w_0-v$ close the joint bootstrap $|V_i|<b$, $e\cdot(V_1-V_2)>v$, since $d\ge z_0+vT$ and the entire future acceleration impulse per label is at most $I$. They prove continuation, integrable acceleration and distinct terminal velocities. Around a fixed positive mirror member, sufficiently late entry makes $I$ smaller than its speed and terminal-velocity margins, so both individual terminal velocities also stay nonzero. The general criterion alone guarantees distinct velocities, not nonzero individual velocities.

The radial history neighborhood is relative to separated compatible, bounded-position and bounded-velocity complete histories, locally $C^{2,1}$, in the uniform complete-past position-velocity norm

$$
\|H-\bar H\|_{1,\infty}
=\max_i\sup_{S\le0}\max\{|H_i-\bar H_i|,|H_i'-\bar H_i'|\}.
\tag{17}
$$

Its finite-prefix continuity estimate needs only the reference acceleration bound on the compact accessible interval: compare velocities at one source time and shift the reference afterward. It does not require acceleration closeness in (17). A Gronwall tube bound transfers the fixed member to the late outgoing region, and a locally uniform $O(T^{1-p})$ velocity tail gives continuity of terminal velocities. This topology does not admit a nonzero affine remote-past drift or arbitrary frequency dephasing. It is different from the compact-old topology used for continuity of the launch-parameter family; the proofs do not confuse the two.

For memory, the full old transient appears explicitly. At entry let $e=(X_1-X_2)/d_0$, $U=e\cdot(V_1-V_2)>\sigma>0$ and

$$
J_i=\int_{-1}^0(1+s)^2|A_i(s)|\,ds,\qquad
\Lambda_i=J_i+\frac{2C_b}{\sigma d_0},\qquad C_b=\frac{(1+b)^2}{1-b}.
$$

Changing integration order in the exact convolution gives

$$
\int_0^L|A_i|\,dT\le2\int_0^L|F_i|\,dT+J_i.
\tag{18}
$$

The old integration triangle contributes $J_i/2$ before moving the generated half-mass to the left. Consequently the strict entry inequalities

$$
|V_i(0)|+\Lambda_i<b,\qquad \Lambda_1+\Lambda_2<U-\sigma
\tag{19}
$$

close both speed and projected-separation margins. They retain every old field source through (1) and every old memory sample through $J_i$. For a positive mirror member, bounded acceleration and the exact convolution imply $A_i\to0$ from $F_i\to0$ by finite iteration and a geometric remainder; hence $J_i\to0$ at late entry. The growing gap makes the other contribution small. This proves entry without presuming that the memory has already disappeared.

The memory topology is compact-old $C^2$ convergence within a class with a common complete-past speed ceiling $b_{\rm past}<b<1$, local $C^{2,1}$ regularity, separation and compatibility. The global speed restriction is essential even though position convergence is only compact. The compact unit acceleration integral makes $J_i$ continuous. Root bounds again reduce every finite future to a common compact old interval. For a locally uniform late bound, the weight $(d_0+\sigma T)^2$ has ratio at most $16/9$ across a unit interval once $d_0+\sigma T\ge4\sigma$; the weighted kernel mass is at most $8/9$. Thus $A_i=O(T^{-2})$ and $V_i-U_i=O(T^{-1})$ with locally uniform constants. Finite-prefix continuity and this tail establish continuity of terminal velocities.

Both neighborhoods contain genuinely nonmirror and noncoplanar complete compatible histories. Small independent compactly supported bumps can avoid release and its source times. Alternatively, after a small memory-history perturbation, a final acceleration patch shorter than one and shorter than each release delay corrects compatibility while preserving endpoint position and velocity and all sampled release source values. The unchanged circular tail together with a normal bump on one label excludes a common plane. No symmetry constraint is imposed on the perturbed evolution, and no Galilean invariance is invoked.

The robustness statement is member-dependent and relative to the compatible-history class. It is not openness among arbitrary endpoint jets, all complete histories, or zero-speed members. It need not have a radius uniform as terminal speed approaches zero. For $1<p\le2$, integrable acceleration does not imply a finite asymptotic position intercept: the admitted radial bounds are $O(T^{2-p})$ for $p<2$ and $O(\log T)$ for $p=2$. The memory bound is likewise logarithmic. Distinct nonzero terminal velocities and linear separation remain the supported scattering assertions.

## Quantifiers, falsifiers and disposition

The exact occurrence quantifier is: for each fixed law in this audit there is an existential sufficiently small interval $(0,\epsilon_*)$, and every $(0,\epsilon_1)$ inside it contains at least one launch of each terminal type. For the radial law $\epsilon_*$ can depend on $p$. The family speed bounds are $O_p(\epsilon)$ or $O(\epsilon)$, so the positive terminal magnitudes along such a sequence also tend to zero. No common sequence across laws or exponents follows. The positive parameter set is open; the zero set is relatively closed. Further topology of those sets remains unresolved.

The reconstructed implications would fail under any of the following checkable changes or counterexamples:

1. A release source inside its endpoint patch, an incorrect patch jet, or an additional partner root despite the complete strict speed bound would invalidate the preparation and continuity premises.
2. A late radial transverse remainder without its vanishing velocity factor, or an additive first-row error without $z$ in (2), would invalidate the uniform boundary and phase estimates.
3. Failure of the scalar gap in the final comparison segment, a zero of (4), or a determinant term not controlled after the exact cancellation (5) would invalidate the winding divergence argument.
4. A missing fractional-flow chart, failure of uniqueness at the zero turning point, or failure of the partition error identity (10) would invalidate the general-power positive-occurrence extension. An unbounded derivative of the exact period alone is not a falsifier: the proof deliberately avoids needing it.
5. A nonzero endpoint value of (11), or a zero-speed member violating (12) while retaining its differential inequalities, would invalidate relative zero-set continuity. Applying (12) to arbitrary positive neighbors is itself outside the proof.
6. Failure of the fixed-axis transverse memory bound (13), an omitted axis-rotation term, or an uncancelled order-$\delta y$ term in (14) would invalidate the signed seed and memory winding.
7. Failure of the convolution support or mass, the polynomial tail domination, or the retained acceleration bound would invalidate (16). A numerical slow trajectory alone cannot certify its coefficient.
8. Omitting a complete old source or the old triangle in (18), dropping the common past speed ceiling, or claiming a neighborhood uniform at zero terminal speed would exceed the Cartesian robustness proofs.

No such failure was found in the reviewed mathematical chains. The audit supports the scoped statements above and finds no correction required to the frozen sources. It supplies no stable binding claim, no classification of arbitrary complete preparations, no nonmirror zero-speed selection theorem, and no practical threshold or numerical member.

## Reviewed identities and validation record

The following SHA-256 identities were measured with `shasum -a 256` on the exact reviewed paths. All rows except the last are in `../binary-research/analysis/` and have the prefix `alternatives-screen-2026-10-05-`. The linked sources and their stated domains, rather than their assessment labels, were the objects of the reconstruction above.

| Reviewed source suffix | SHA-256 |
| --- | --- |
| [radial-power-family-preparation.md](../binary-research/analysis/alternatives-screen-2026-10-05-radial-power-family-preparation.md) | `5bb3bf495cdb40975f86d1c7ff8e14398848f3e094bfcd6a739a8ef215beed04` |
| [radial-power-family-transition.md](../binary-research/analysis/alternatives-screen-2026-10-05-radial-power-family-transition.md) | `5974cc0f89a7597dd6f765d166735f627361225ac8cafd4de23326d82c37fbb3` |
| [radial-power-family-global.md](../binary-research/analysis/alternatives-screen-2026-10-05-radial-power-family-global.md) | `5eb796ea43033ce243560a0220a5e00614a8fc856ed3ac1bc7556b64e1e9b3b1` |
| [radial-power-family-adjudication.md](../binary-research/analysis/alternatives-screen-2026-10-05-radial-power-family-adjudication.md) | `32bfecc1e93228140377cbd385726b35c20e3a7a6e67d4de59ffcbc949079365` |
| [radial-power-family-zero-speed.md](../binary-research/analysis/alternatives-screen-2026-10-05-radial-power-family-zero-speed.md) | `359f1e30d08863028bbf76d56d372f94874eee8fcb8d5a47fd72f23035830ac5` |
| [radial-power-family-zero-speed-adjudication.md](../binary-research/analysis/alternatives-screen-2026-10-05-radial-power-family-zero-speed-adjudication.md) | `6ec12814ac6563d5e7d97ee7a5e32e2d7f77f07e40ee844bfdaa02e626efb9b4` |
| [radial-power-above-two-independent.md](../binary-research/analysis/alternatives-screen-2026-10-05-radial-power-above-two-independent.md) | `3cacef09ab24ae778300d0f94309155d7c940afcf31e2466468caaad1bb98b8e` |
| [radial-power-above-two-adjudication.md](../binary-research/analysis/alternatives-screen-2026-10-05-radial-power-above-two-adjudication.md) | `73e0987f47c5c5548e7e4738bff841e41ed695cce666bace7d0e3843fbc92e68` |
| [radial-positive-terminal-general-independent.md](../binary-research/analysis/alternatives-screen-2026-10-05-radial-positive-terminal-general-independent.md) | `9c18b4efec99eda3d7ec62503f95fb409590b549c1bc3813d9878a04b26ae08e` |
| [radial-positive-terminal-general-adjudication.md](../binary-research/analysis/alternatives-screen-2026-10-05-radial-positive-terminal-general-adjudication.md) | `15166d0eb79f8798d3ee3e0c2a85f0def892d6f322277b8fb099018811313fa2` |
| [memory-formulation.md](../binary-research/analysis/alternatives-screen-2026-10-05-memory-formulation.md) | `e77ae06dccda7f06f0f11302d0d50dd270be5192b88f989d3e3cfa3424103d3a` |
| [memory-slow-transition.md](../binary-research/analysis/alternatives-screen-2026-10-05-memory-slow-transition.md) | `ae31d20710478746566688d25d8e2d1e86e21d3af10789bf06e6f3156fadee22` |
| [memory-global-dispersal.md](../binary-research/analysis/alternatives-screen-2026-10-05-memory-global-dispersal.md) | `b8066d75120561fe0ded282d6ccc34a9f525d7e526dd1073696b0f13d2936a71` |
| [terminal-speed-selection.md](../binary-research/analysis/alternatives-screen-2026-10-05-terminal-speed-selection.md) | `9736cccba1d7b7309dc4200c09f8dd831872b4c990846606cf67003030b64557` |
| [terminal-speed-adjudication.md](../binary-research/analysis/alternatives-screen-2026-10-05-terminal-speed-adjudication.md) | `747a6a263ce9f8f07478cb4b593ea4d6f8099d8227bd1fbc6b274a2daabd2797` |
| [memory-positive-terminal-existence-independent.md](../binary-research/analysis/alternatives-screen-2026-10-05-memory-positive-terminal-existence-independent.md) | `df3617b3d8429d75e6af2f364ecc01f33171be0c1b12d648b89cf8ad74be6819` |
| [memory-positive-terminal-existence-adjudication.md](../binary-research/analysis/alternatives-screen-2026-10-05-memory-positive-terminal-existence-adjudication.md) | `41185132ff6c6e9d95d4bd175c370b3105bb5d6c52a17bbd2f060205a16483ed` |
| [memory-zero-speed-asymptotics.md](../binary-research/analysis/alternatives-screen-2026-10-05-memory-zero-speed-asymptotics.md) | `951b93e827d25bfef8d861647412de11ec2bd18682b715ab8b8c56cb8e3d8b6d` |
| [memory-zero-speed-asymptotics-adjudication.md](../binary-research/analysis/alternatives-screen-2026-10-05-memory-zero-speed-asymptotics-adjudication.md) | `91fe589800baeace30bbafa9e689a09ec154989b9db89a9b9bae76525673a078` |
| [radial-general-scattering-robustness-independent.md](../binary-research/analysis/alternatives-screen-2026-10-05-radial-general-scattering-robustness-independent.md) | `18f55f0e58467bacf7ea64b80e0296ba2925aaa65e9d60f71991f66e73a02a48` |
| [radial-general-scattering-adjudication.md](../binary-research/analysis/alternatives-screen-2026-10-05-radial-general-scattering-adjudication.md) | `499274cb5a265dc16f988a5a55c29ee41127f3be7b037af91a832dee9fa7e28d` |
| [memory-scattering-robustness-independent.md](../binary-research/analysis/alternatives-screen-2026-10-05-memory-scattering-robustness-independent.md) | `d20ade9ec8aedfa6e44813793d480b5bee7944463b0aa631c88f474f955d5721` |
| [memory-scattering-robustness-adjudication.md](../binary-research/analysis/alternatives-screen-2026-10-05-memory-scattering-robustness-adjudication.md) | `37093816dd0826b40e5301538c68502974496fbb8dc82f12de974494bd77691f` |
| [Parent memory adjudication](alternatives-screen-2026-10-05-memory-adjudication.md) | `a21180e917b6eb7034abbcc951067997f60085a7e6a86c3293e4b6b13f90ee16` |

Mathematical validation consists of the displayed reconstruction, with the unchanged preparations and exact equations as its domain. No target computation or executable scientific instrument was run. Repository validation: `git diff --no-index --check /dev/null` on this audit returned no whitespace diagnostics, and `rg -n '[[:cntrl:]]'` on this audit found no control characters. These are source-format checks, not mathematical evidence. This audit is the only file authored for the assignment; frozen subjects, prior references and shared integration owners were not edited. The bounded audit is complete. Further integration remains with the coordinator; no owned scientific computation or background process remains active.
