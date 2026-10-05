# Independent cubic-power fate of the complete compatible circle-tail family

## Derived candidate and exact scope

**Claim grade: derived candidate, requiring separate independent assessment.** Set the selected radial exponent to $p=3$ and retain $K=R_*=c_f=1$, the original transmitter factor, every ordinary self/partner root, and exactly the circle-tail preparation formula with its compatible polynomial patch. Every sufficiently small positive launch parameter $\epsilon$ has a unique separated uniformly subfield mirror-planar continuation for all physical time. It eventually moves outward, its member radius tends to infinity, its polar angle has a finite limit, and its physical terminal velocity is strictly positive and radial.

More sharply, let $V_\infty(\epsilon)$ be the terminal physical speed. Then, as the family parameter tends to zero,

$$
V_\infty(\epsilon)
=\frac{12^{2/3}}4\,\epsilon^{4/3}+O(\epsilon^{5/3})>0.
$$

The areal-rate variable introduced below reaches a fixed finite transition in physical time comparable to $\epsilon^{-7/3}$. The total polar angle is finite for each fixed launch and is comparable to $\epsilon^{-1/3}$ as launch speed tends to zero. Thus this sufficiently slow cubic family has no zero-terminal-speed members. This conclusion is specific to the complete preparation; it is not a theorem about every cubic-law history.

This proof was derived before reading any new coordinator cubic analysis. It uses no limit of the singular scale $h^{2/(3-p)}$, no conserved central energy, no assumed delayed circular solution and no result about cubic fate transferred from smaller exponents. The analytical role is a lens, not an acceptance authority. No numerical threshold, finite parameter location, nonmirror robustness, stable binding or unit-event continuation is established.

## Fixed equation, units and complete compatible past

Let the opposite-polarity mirror pair be $q(T),-q(T)$ in a plane. The selected physical law on its complete ordinary chart is

$$
q''(T)=-\frac{N(T)}{R(T)^3D(T)},\qquad
R=T-S=|q(T)+q(S)|,\quad
N=\frac{q(T)+q(S)}R,\quad
D=1+N\cdot q'(S).
$$

The full [Master Equation root convention](../../../../../content/markdown/aaa/dynamics/master-equation.md#per-hit-acceleration) is retained; the scalar form follows only after the complete strict-speed root census below. It changes the radial magnitude to $R^{-3}$ and adds no receiver response or memory term.

For the same circular balance normalization as the [frozen family](alternatives-screen-2026-10-05-radial-power-family-preparation.md), set

$$
r_0=(8\epsilon^2)^{-1/2}=\frac1{2\sqrt2\,\epsilon},\qquad
s=\frac\epsilon{r_0}T,\qquad q(T)=r_0Y(s).
$$

Primes on $Y$ and other scaled quantities below denote $s$ derivatives unless another variable is specified. Physical velocity is $q'(T)=\epsilon Y'(s)$; scaled velocity is not physical speed. The actual scaled equation is

$$
Y''=-\frac{8N}{R_d^3D},\qquad
R_d=|Y(s)+Y(\sigma)|,\quad s-\sigma=\epsilon R_d,
\quad D=1+\epsilon N\cdot Y'(\sigma).
$$

Supply the unchanged circle $Y_c(s)=(\cos s,\sin s)$ for $s\le-d_0$, where $d_0=\epsilon/16$. On $[-d_0,0]$ supply

$$
Y(s)=Y_c(s)+\phi(s)B_3,\qquad
\phi(s)=\frac{d_0^2}{2}z_p^3(1-z_p)^2,\quad z_p=1+s/d_0,
$$

$$
B_3=(1,0)+A_{c,3},\qquad
A_{c,3}=-\frac{(\cos\xi,-\sin\xi)}{\cos^3\xi(1+\epsilon\sin\xi)},
\qquad \xi=\epsilon\cos\xi\in(0,\epsilon).
$$

The other label has the exact negative history. For $0<\epsilon\le1/16$, the radial discrepancy of $B_3$ is at most $2\epsilon^2$ and its transverse component at most $2\epsilon$, by $\cos\xi\ge1-\epsilon^2/2$ and $1\le1+\epsilon\sin\xi\le1+\epsilon^2$. Thus $|B_3|\le4\epsilon$. The original polynomial estimates retain supplied scaled speed below two, radius in $[3/4,5/4]$, acceleration below eight and positive signed areal rate. The complete supplied history is locally $C^{2,1}$.

The patch and its first two derivatives vanish at the old seam; its release jets are $(0,0,1)$. Thus $Y(0)=(1,0)$, $Y'(0)=(0,1)$ and $Y''(0-)=A_{c,3}$. The release partner source $\sigma=-2\xi<-\epsilon<-d_0$ lies in the untouched circle. Under a complete physical speed bound $b<1$, the delay residual $\ell-|q(T)+q(T-\ell)|$ increases at least at rate $1-b$, starts negative and tends to positive infinity. It has exactly one positive root. The strict speed chord inequality excludes all positive-delay self roots. Therefore patching creates no additional root, and the received acceleration at release is exactly $A_{c,3}$: compatibility is exact.

The complete past is prescribed data, not a circular solution of the released equation. In fact the release radial acceleration is slightly inward. With $r=|Y|$, $u=r'$ and $h=Y\times Y'$, the release values are $r=1,u=0,h=1$. Using $\epsilon\sin\xi=\xi\tan\xi$ gives

$$
u'(0)=1-\frac{\sec^2\xi}{1+\xi\tan\xi}
=-\frac{\tan\xi(\tan\xi-\xi)}{1+\xi\tan\xi}<0.
$$

The theorem will prove eventual outward motion, allowing this initial regular inward displacement.

## Exact rotation and the new cubic scale

Write $n=Y/r$, let $t$ be its positive quarter-turn, and put $v=Y'\cdot t=h/r$. Exact polar kinematics gives

$$
r'=u,\qquad u'=\frac{h^2}{r^3}+A_r,\qquad h'=rA_t,
\qquad \theta'=\frac h{r^2},
$$

where $A_r=Y''\cdot n$ and $A_t=Y''\cdot t$. The geometric areal rate $h$ is not a physical conserved quantity.

Positive rotation is retained by the full causal geometry. For a partner window, every intermediate path point lies in the open ball centered at the midpoint of its source and receiving positions with radius half the partner range: add the two strict subfield path-length bounds. The ball lies in one open half-plane through the origin, and the two endpoint directions have positive dot product. A nonnegative prior areal rate with positive present value therefore gives a lifted angular increment in $(0,\pi/2)$. The exact radial response has

$$
h'=\frac{8r r_\sigma\sin(\theta-\theta_\sigma)}{R_d^4D}>0.
$$

A first-loss argument preserves positive rotation. In particular $h\ge1$ at generated times. This reconstructs the relevant geometry of the [rotating-class analysis](alternatives-screen-2026-10-05-radial-rotating-class.md) for the actual cubic response; it supplies no global speed claim by itself.

At $p=3$, the central geometric term and central radial magnitude have the same $r^{-3}$ factor. Their leading difference is $(h^2-1)r^{-3}$. Meanwhile positive delayed torque changes $h$ at order $\epsilon r^{-3}$. The resulting transition has radial speed of order $\epsilon^{1/3}$ in scaled units. Define, without using any singular power of $h$,

$$
\eta=\epsilon^{1/3},\qquad
Q=\frac{h^2-1}{\eta^2},\qquad
U=\frac u\eta,\qquad z=r^{-2}.
$$

The variable $Q$ is strictly increasing on the ordinary chart because $h'>0$; it will be used as an independent coordinate. Initially $(Q,U,z)=(0,0,1)$. This construction follows from the actual polar and torque equations, not from an assumed conserved central scalar.

## Complete-window estimates uniform toward infinite radius

Use the provisional domain

$$
0\le Q<3,\qquad |U|<4,\qquad 0<z<4.
$$

For sufficiently small $\eta$, it gives $r>1/2$, $1\le h=\sqrt{1+\eta^2Q}<2$ and $|u|<4\eta$. Scaled speed is at most a fixed constant, for example five after further reducing $\eta$. Together with the supplied past this yields a complete physical speed bound $b\le5\epsilon<1/2$. The complete source census and transmitter margin therefore persist on every such interval.

Let $\ell=s-\sigma=\epsilon R_d$. The complete chord bounds give

$$
\frac{2r}{1+b}\le R_d\le\frac{2r}{1-b},\qquad
D\ge1-b,\qquad \ell\le C\epsilon r.
$$

Every intermediate source radius differs from the receiving radius by at most a fixed speed bound times $\ell$, so its ratio to $r(s)$ is $1+O(\epsilon)$. These estimates hold for the entire causal interval and are uniform as $r\to\infty$.

For an initial coarse angular bound, generated areal rates before reception do not exceed $h(s)$, while supplied values are $1+O(\epsilon^2)$ and thus at most a fixed multiple of $h(s)$. Integration of $\theta'=h/r^2$ over the complete receiving window gives $\Delta\theta\le C h(s)\ell/r(s)^2$. The exact torque formula then gives

$$
0<\frac{h'}h\le C\epsilon r^{-3}
$$

at generated times. If the entire receiving window is generated, integration of this estimate and the radius comparison yields $h(q)/h(s)=1+O(\epsilon^2/r(s)^2)$ on the window. If it meets supplied time, then $r(s)\le1+4\eta s$ and $s\le\ell\le C\epsilon r(s)$ imply $s=O(\epsilon)$ and $r(s)=1+O(\epsilon\eta)$. The bounded early torque and the supplied estimate $h=1+O(\epsilon^2)$ then give the same sufficient uniform comparison $h(q)/h(s)=1+O(\epsilon^2)$. Thus no old history is replaced or discarded.

Reintegrating the angular derivative now gives

$$
\Delta\theta=\frac{h(s)\ell}{r(s)^2}[1+O(\epsilon)],\qquad
N_t=-\frac{r_\sigma}{R_d}\sin\Delta\theta
=-\epsilon\frac h r[1+O(\epsilon)].
$$

The sine has a relative error $O(\epsilon^2)$ because $\Delta\theta\le C\epsilon h/r\le C\epsilon$. Also $N_r=1+O(\epsilon^2)$, $R_d/(2r)=1+O(\epsilon)$ and $D=1+O(\epsilon)$. Consequently the exact cubic response has the uniform representation

$$
A_r=-r^{-3}(1+e_r),\qquad
h'=\epsilon h r^{-3}(1+e_t),\qquad
|e_r|+|e_t|\le C\epsilon.
$$

The constants are independent of time and radial upper extent on the provisional domain. In particular the torque error is relative to its actual factor $h r^{-3}$, not an additive isotropic error. The functions $e_r,e_t$ depend on the complete actual history; they are neither autonomous nor differentiated in what follows.

## Exact areal-rate equations and finite transition

Define

$$
a(Q)=\frac{1}{(1+\eta^2Q)(1+e_t)},\qquad
b(Q)=-\frac{e_r}{\eta^2}.
$$

This $a$ is a bounded reciprocal coefficient, unrelated to the singular scale used for $p<3$. The uniform response bounds give $a=1+O(\eta^2)$ and $b=O(\eta)$, because $\epsilon=\eta^3$. Dividing the exact radial and reciprocal-radius derivatives by the exact positive derivative of $Q$ yields

$$
\frac{dU}{dQ}=\frac12a(Q)[Q+b(Q)],\qquad
\frac{dz}{dQ}=-a(Q)U,
$$

$$
\frac{dQ}{ds}=2\eta(1+\eta^2Q)z^{3/2}(1+e_t).
$$

For example, $u'=r^{-3}(h^2-1-e_r)$ and $Q'=2\epsilon h^2r^{-3}(1+e_t)/\eta^2$ give the first identity directly. These equations are exact with bounded history-dependent coefficients. Their unperturbed limits have the explicit algebraic solution

$$
U_0(Q)=\frac{Q^2}{4},\qquad z_0(Q)=1-\frac{Q^3}{12}.
$$

Direct differentiation verifies this comparison solution before it is used. It is not a physical conservation law.

Integrating the actual equations from the release data on $0\le Q<3$ gives the uniform estimates

$$
U(Q)=\frac{Q^2}{4}+O(\eta Q),\qquad
z(Q)=1-\frac{Q^3}{12}+O(\eta Q^2).
$$

The first follows from $a=1+O(\eta^2)$ and $b=O(\eta)$; substitution into the second equation and integration gives the second. No limit of a history-dependent remainder is required.

On $0\le Q\le1$, these estimates keep $z$ bounded above and below by positive constants. Hence $Q'\asymp\eta$ and the event $Q=1$ occurs at finite scaled time $s_1\asymp\eta^{-1}$, provided no earlier ordinary termination occurs. Such termination is impossible: the estimates keep position and velocity in a regular compact chart, complete partner delay and source factors have positive floors, and accessible old source times stay in a compact portion of the supplied history. Ordinary position-velocity continuation applies. Thus the fixed event is actual and finite.

At that event,

$$
h^2=1+\eta^2,\qquad
U=\frac14+O(\eta)>0,\qquad
z=\frac{11}{12}+O(\eta).
$$

Physical time is $T_1=(r_0/\epsilon)s_1\asymp\epsilon^{-7/3}$. The physical radial speed is $\epsilon\eta U\asymp\epsilon^{4/3}$; the total physical speed at this finite transition is still comparable to $\epsilon$, since the transverse scaled speed $h/r$ remains of order one. These two speed statements must not be conflated.

For $Q\ge1$ in the provisional box, $dU/dQ>0$ for sufficiently small $\eta$. Radial speed consequently remains positive and increases after this event. The initial inward release acceleration is confined to the earlier regular evolution and does not obstruct this conclusion.

## Closing the global domain and identifying the terminal values

The integrated bounds give $|U|<3$ and $z<2$ throughout any surviving part of $0\le Q<3$ after choosing $\eta$ small enough. They exclude the artificial boundaries $|U|=4$ and $z=4$. Reaching $Q=3$ with $z>0$ is impossible because

$$
z(3)=1-\frac{27}{12}+O(\eta)<0.
$$

Thus the positive-radius-coordinate path has a maximal upper $Q$ value $Q_*<3$. Its lower bound exceeds one by the finite transition estimates. The derivatives of $U,z$ with respect to $Q$ are bounded, so they have finite limits there. If the limit of $z$ were positive, $ds/dQ$ would stay bounded and positive, the physical time would be finite and the separated strict-speed chart would continue. Therefore

$$
z\to0,\qquad U\to U_\infty>0,
\qquad Q\uparrow Q_*,\qquad h\to h_\infty=\sqrt{1+\eta^2Q_*}.
$$

Substituting $z(Q_*)=0$ in the uniform estimates gives

$$
Q_*=12^{1/3}+O(\eta),\qquad
U_\infty=\frac{12^{2/3}}4+O(\eta).
$$

In particular $U_\infty$ has a positive lower bound independent of sufficiently small launch parameter. The reciprocal coefficient $a$ stays between fixed positive constants and $U$ stays positive near the endpoint, so the exact equation $z_Q=-aU$ gives

$$
z(Q)\asymp Q_*-Q.
$$

It follows that

$$
\frac{ds}{dQ}
=\frac{z^{-3/2}}{2\eta(1+\eta^2Q)(1+e_t)}
\asymp_\epsilon(Q_*-Q)^{-3/2}.
$$

Scaled and physical time therefore tend to infinity at this endpoint. No finite physical-time source singularity, contact or speed event is hidden by the change of variable. At every finite time the complete speed margin and separation permit continuation; bounded physical speed also independently prevents divergence of radius at finite time. The actual solution is global and has $r=z^{-1/2}\to\infty$.

## Finite angular advance and physical terminal velocity

The exact angular derivative in the increasing $Q$ coordinate is

$$
\frac{d\theta}{dQ}
=\frac{1}{2\eta h(1+e_t)\sqrt z}.
$$

It is bounded on every compact pre-endpoint interval and has an integrable $(Q_*-Q)^{-1/2}$ singularity at the endpoint. Thus $\theta\to\theta_\infty<\infty$ for each fixed small launch. Because

$$
q'(T)=\epsilon\left[\eta U\,n(\theta)+h\sqrt z\,t(\theta)\right],
$$

the physical velocity tends to $V_\infty n(\theta_\infty)$, where

$$
V_\infty=\epsilon\eta U_\infty
=\frac{12^{2/3}}4\epsilon^{4/3}+O(\epsilon^{5/3})>0.
$$

The physical member radius $\mathcal R(T)=|q(T)|=r_0r(s)$ therefore satisfies $\mathcal R(T)\sim V_\infty T$. This is linear escape with positive terminal speed. The partner has the opposite limiting Cartesian velocity.

The physical areal rate is

$$
H(T)=q(T)\times q'(T)=\epsilon r_0h(s)
=\frac{h(s)}{2\sqrt2}
\longrightarrow H_\infty=\frac{\sqrt{1+\eta^2Q_*}}{2\sqrt2}>0.
$$

It is finite but not conserved. From $\theta'=H/\mathcal R^2$ in physical time, the radius and areal-rate limits yield the exact fixed-member angular tail

$$
\theta_\infty-\theta(T)\sim\frac{H_\infty}{V_\infty^2T}.
$$

This follows by integrating eventual two-sided bounds on $H/\mathcal R^2$; no differentiated asymptotic remainder is assumed.

The family dependence of total angle can also be determined. Let $Q_0=12^{1/3}$. The integrated coordinate estimates converge uniformly to $z_0(Q)$ away from its endpoint, while $h(1+e_t)\to1$. Near the endpoint, the uniform bounds on $aU$ give $z\ge c(Q_*-Q)$. Rescale $Q=Q_*t$ to a fixed interval. On $t\le1-\rho$, the integrand converges uniformly; on the remaining interval it is bounded by $C(1-t)^{-1/2}$, whose integral tends to zero with $\rho$. Hence

$$
\epsilon^{1/3}\theta_\infty(\epsilon)
\longrightarrow
\frac12\int_0^{Q_0}\frac{dQ}{\sqrt{1-Q^3/12}}\in(0,\infty),
$$

with the release angle fixed to zero. Large angular advance as $\epsilon\downarrow0$ is compatible with finite angle for every fixed launch. No winding argument can force zero-speed members here: the directly derived terminal speed is positive throughout a sufficiently small parameter interval.

## Falsifiers, limitations and source identities

The theorem would be overturned by loss of exact compatibility at $p=3$; an omitted root under the complete speed bound; failure of the causal half-plane rotation sign; a complete-window estimate that loses its uniformity as radius grows; a torque error without the factor $\epsilon h r^{-3}$; an error in the exact $Q$-coordinate equations; a finite regular endpoint with positive limiting $z$; or failure of the endpoint angular integrability. Each potential failure has an explicit formula above. The result relies only on $O(\epsilon)$ relative acceleration/torque estimates; a higher-order signed expansion or an assumed conserved energy is not needed.

The leading small-launch constants are analytical family limits, not measurements from simulated trajectories. The comparison pair $U_0=Q^2/4$, $z_0=1-Q^3/12$ is a directly checked mathematical reference for the exact perturbation estimates. It does not replace the delayed future or imply a fixed finite numerical admission threshold.

The proof establishes neither arbitrary-history scattering nor the absence of other cubic zero-speed solutions. It establishes no stable assembly, perturbative stability, superfield continuation or conclusion for $p>3$. The failure of the earlier $h^{2/(3-p)}$ coordinate at $p=3$ was a limitation of that coordinate; the direct cubic analysis supplies the actual preparation-scoped fate here.

Measured source identities, obtained with `shasum -a 256` before authoring this proof:

| Frozen source | SHA-256 |
| --- | --- |
| [Preparation formula](alternatives-screen-2026-10-05-radial-power-family-preparation.md) | `5bb3bf495cdb40975f86d1c7ff8e14398848f3e094bfcd6a739a8ef215beed04` |
| [Rotating-class geometry](alternatives-screen-2026-10-05-radial-rotating-class.md) | `aa271d167786273f8c040c3eda5e116888b7f40df68317dbb9270682f30c1c9a` |

The frozen preparation was originally stated for smaller exponents; the present proof explicitly verifies the same formula, source root and compatibility at the newly selected fixed exponent rather than silently extending its old claim. The cubic equation remains a selected radial variant of the live canonical root-weight owner.

Validation is analytical: preparation jets and root position, complete-root monotonicity, causal half-plane geometry, uniform full-window estimates, exact areal-rate coordinate differentiation, the explicitly checked polynomial comparison, bootstrap closure, physical-time reconstruction and angular tail integration. No executable checker, numerical target, Python process or background computation was used. Only this new independent cubic analysis was authored; previous subjects, assessments and shared owners were preserved. Whitespace validation and final identity checks are reported after creation. Separate independent assessment remains required before scientific integration.
