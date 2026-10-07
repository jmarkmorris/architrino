# Blind reference for the common-center tangent of an accepted slow mirror pair

**Derived linear-grade reference, frozen before opening the new D-primary subject.** Use the actual canonical $p=2$, $K=c_f=1$ mirror continuation in the [accepted wider slow regime](slow-binary-wider-regime-independent-adjudication.md). It has complete strict speed margin $\beta<1$, exactly one partner root and no positive-delay self root, positive radius and angular lower bounds, finite total angle and integrable acceleration. Its admissible supplied recent history is $W^{2,\infty}$ with continuous position and velocity; acceleration seams are retained. These premises concern the theorem's actual preparation class, not membership of a separately saved historical source.

Use physical normalized variables $X_\pm=\pm x(t)$, $v=x'$, $a=x''$, $R=t-s=|x(t)+x(s)|$, $n=[x(t)+x(s)]/R$, and $D=1+n\cdot v_s$. The base row is $a=-n/(R^2D)$. Consider a common Cartesian position variation $\delta X_+=\delta X_-=c(t)$, with physical velocity variation $w=c'$. No planarity restriction is imposed on $c$.

## Both source clocks and the exact tensor

Let $d=c(t)-c(s)$. The two source-time variations are opposite:

$$
\delta s_+=-\frac{n\cdot d}{D},\qquad
\delta s_-=+\frac{n\cdot d}{D}.
$$

Their different base source velocities make the total separation variations equal. Define

$$
P=I-\frac{v_sn^{\mathsf T}}D,\qquad B=(I-nn^{\mathsf T})P.
$$

Then both separation variations are $Pd$, both normal variations are $Bd/R$, while range variations are opposite: $\delta R_+=n\cdot d/D=-\delta R_-$. The total source-velocity variations are equal to $w(s)+a_s(n\cdot d)/D$. Therefore

$$
\delta D_+=\frac{v_s^{\mathsf T}Bd}{R}-n\cdot w(s)
-\frac{(n\cdot a_s)(n\cdot d)}D,
\qquad \delta D_-=-\delta D_+.
$$

Differentiating both opposite-polarity acceleration rows gives equal results, so the common-center sector is invariant at first order. Its exact equation is

$$
c''(t)=T(t)[c(t)-c(s(t))]+U(t)c'(s(t)), \tag{1}
$$

$$
T=-\frac{B}{R^3D}+\frac{2nn^{\mathsf T}}{R^3D^2}
+\frac{n v_s^{\mathsf T}B}{R^3D^2}
-\frac{(n\cdot a_s)nn^{\mathsf T}}{R^2D^3},
\qquad U=-\frac{nn^{\mathsf T}}{R^2D^2}. \tag{2}
$$

Every delayed-source acceleration here is a coefficient produced by differentiating delayed velocity; it is not an extra term in the original law. The opposite clock variations cannot be replaced by one common perturbed clock.

## Independent controls

A constant translation $c$ has $d=w=0$ and solves (1), as required by translation covariance. For the instantaneous static parallel-affine control $v_s=a_s=0$, (2) gives $T=(3nn^{\mathsf T}-I)/R^3$ and $U=-nn^{\mathsf T}/R^2$. Substituting $c(t)=bt$, so $d=Rb$, yields $c''=(2nn^{\mathsf T}-I)b/R^2$. This is precisely the separately derived common-center differential of the exact parallel-affine prescribed-history control. A uniform center boost is consequently not an equation symmetry. The control is not asserted to be a coupled solution.

## Integrable coefficient and global velocity tangent

Put $d_\beta=1-\beta$. Since $\|P\|,\|B\|\le d_\beta^{-1}$, direct termwise estimates in (2) give

$$
R\|T\|+\|U\|
\le k(t):=d_\beta^{-3}\left(\frac4{R^2}+\frac{|a_s|}{R}\right). \tag{3}
$$

Physical kinematics supplies $c(t)-c(s)=\int_s^tw(u)\,du$. Thus (1) implies $|w'|\le k(t)\sup_{s(t)\le u\le t}|w(u)|$ almost everywhere. The coefficient is integrable. Indeed complete subfield chord comparison gives $R\ge2r/(1+\beta)$ and a positive delay floor. Finite total angle and positive angular lower bound give $\int r^{-2}dt<\infty$. The clock satisfies $s'\ge d_\beta/(1+\beta)$, so

$$
\int_0^\infty\frac{|a(s(t))|}{R(t)}dt
\le\frac{1+\beta}{d_\beta R_{\min}}
\int_{s(0)}^\infty|a(u)|du<\infty.
$$

The finite old interval uses only the supplied almost-everywhere acceleration bound; the generated part uses the accepted integrable acceleration. This proves $I=\int_0^\infty k<\infty$ without a positive terminal-speed hypothesis.

Let $M_0=\sup_{s(0)\le u\le0}|w(u)|$. The causal integral equation and Gronwall give

$$
\sup_{t\ge0}|w(t)|\le M_0e^I,
\qquad \int_0^\infty|w'(t)|dt\le M_0e^I I.
$$

Consequently $w(t)\to w_\infty$ and $c(t)=c(0)+tw_\infty+o(t)$. The tail estimate is $|w(t)-w_\infty|\le M_0e^I\int_t^\infty k$. No finite center-position offset or integrable velocity error is asserted without an additional time-weighted coefficient estimate.

## Seams and claim boundary

The coefficient $a_s$ is defined almost everywhere across permitted supplied seams. Under the fixed complete speed margin, the source clock is bi-Lipschitz, so its pullback preserves null sets. The variational equation is a well-defined Caratheodory equation with locally bounded coefficients and strict delay. It has a unique causal solution for compatible continuous velocity history. For actual finite-prefix directional variations, position evaluation and root differentiation are regular because the position is $C^1$; delayed Lipschitz velocity has its displayed derivative almost everywhere. Bounded difference quotients and the bi-Lipschitz clock give dominated convergence in the integral equation. This supports the finite-prefix physical first variation without silently imposing continuous supplied acceleration or jerk. It is not a blanket assertion of a $C^1$ semiflow in a topology unsuited to those seams.

This controls the linear common-center velocity tangent globally, including around a member whose terminal radial speed is zero. It proves neither nonlinear full-Cartesian scattering robustness nor bounded absolute center displacement, a nonmirror trajectory's global fate, or membership of a historical record in the accepted preparation class. The exact linear row and integrable kernel are the deliverables. Falsifiers are an incorrect clock sign, a missing source-acceleration transport term, failure of the affine control, or a nonintegrable term omitted from (3). No numerical target or process was launched.
