# A controlled radial-oscillation transition for the three-halves law

## The fixed-launch conclusion

The compatible near-circular radial-power preparation develops a growing radial oscillation even while its characteristic speed decreases. For every sufficiently small fixed launch speed, the actual delayed solution reaches a fixed small oscillation amplitude in finite time, with positive separation, one partner root, no positive-delay self root and a uniform subfield speed margin. During the last part of this interval, the member radius undergoes alternating ordinary maxima and minima. Its radius does not increase pointwise.

This is a derived nonlinear transition theorem for the actual equation, subject to independent assessment. It supplies a regular boundary of a controlled near-circular regime, not an all-future fate or a singular event. The selected law remains $p=3/2$, $K=R_*=c_f=1$ in [equation-variants §15](../../equation-variants/manuscript.md#15-other-radial-response-powers), with complete self/partner root conventions and opposite mirror polarity. No standard-physics conservation law is used. The completed [finite secular theorem](alternatives-screen-2026-10-05-radial-rotating-fate.md) is preserved unchanged; the argument here reconstructs the changing-scale response and retains its signed second-order terms.

Here are the theorem's quantifiers. There exist a fixed small amplitude $j_*>0$ and a fixed $\epsilon_*>0$ such that every preparation in the family below with $0<\epsilon\le\epsilon_*$ has a first finite time $T_b$ at which its amplitude $J$ equals $j_*$. Neither constant is assigned a numerical value in this analytical proof. A finite-speed simulation is therefore not admitted by it. Unlike a collection of fixed-duration asymptotic estimates, this statement applies to each one of its sufficiently small launches until its specified transition occurs.

Write $f\asymp g$ when their ratio is bounded above and below by positive constants independent of $\epsilon$ as $\epsilon\downarrow0$; those constants may depend on $j_*$. At the transition,

$$
\frac{|q(T_b)|}{r_0}\asymp\epsilon^{-16/3},\qquad
|q'(T_b)|\asymp\epsilon^{7/3},\qquad
T_b\asymp\epsilon^{-14},\qquad r_0=\frac1{8\epsilon^4}.
$$

The growing coordinate is an oscillation relative to an expanding circular scale. It is not a stability spectrum about a circular delayed solution: a subfield uniform circle is not such a solution. After this regular transition, the selected launch's all-future fate remains unresolved.

## Preparation, normalization and exact geometry

Retain the complete preparation exactly as defined in the [finite theorem](alternatives-screen-2026-10-05-radial-rotating-fate.md#complete-compatible-preparation). To specify it here, put $s=\epsilon T/r_0$, $Y=q/r_0$, $d=\epsilon/16$, and let $\xi\in(0,\epsilon)$ solve $\xi=\epsilon\cos\xi$. Define

$$
Y_c(s)=(\cos s,\sin s),\qquad
B=(1,0)-\frac{(\cos\xi,-\sin\xi)}{\cos^{3/2}\xi(1+\epsilon\sin\xi)}.
$$

For every $s\le-d$, supply $Y=Y_c$. For $-d\le s\le0$, supply

$$
Y(s)=Y_c(s)+\frac{d^2}{2}z_p^3(1-z_p)^2B,\qquad z_p=1+s/d.
$$

The other member is exactly $-Y$. The complete history is separated and locally $C^{2,1}$, has positive signed areal rate, physical speed at most $\epsilon(1+2\epsilon^2)$, and endpoint $Y(0)=(1,0)$, $Y'(0)=(0,1)$. The exact receiving root at zero is $s=-2\epsilon\cos\xi<-d$, so the patch is acceleration-compatible without changing the sampled circular source. These facts were proved for $\epsilon\le1/16$ in the preserved source. All smallness thresholds below are also bounded above by $1/16$.

The scaled equation, with derivatives in $s$, is

$$
Y''=-\frac{2^{3/2}N}{R_d^{3/2}D},\quad
R_d=|Y(s)+Y(\sigma)|,\quad s-\sigma=\epsilon R_d,\quad
N=\frac{Y(s)+Y(\sigma)}{R_d},\quad D=1+\epsilon N\cdot Y'(\sigma).
$$

Set $r=|Y|$, $n=Y/r$, $t$ equal to the positively rotated unit vector, $u=Y'\cdot n$, $v=Y'\cdot t$, and $h=Y\times Y'=rv$. The cross product means its signed normal component. It is geometric and carries no physical angular-momentum premise.

The [radial rotating-class theorem](alternatives-screen-2026-10-05-radial-rotating-class.md), independently reconstructed in the [escape supplement](../../analysis/alternatives-screen-2026-10-05-adjudication-escape-supplement.md#rotating-mirror-radial-class), applies to this complete preparation. On the maximal strict-subfield future it gives $h'>0$, hence $h\ge1$. Its load-bearing geometry is that the entire causal segment lies in an open half-plane, its actual angular increment is between zero and $\pi/2$, and the delayed attractive radial acceleration therefore has positive geometric torque. This exact statement, rather than a truncated torque expansion, excludes a loss of $h$ in the continuation below.

Define the changing circular scale and its local speed parameter by

$$
a=h^{4/3},\qquad \delta=\epsilon a^{-1/4},\qquad
x=r/a,\qquad y=a^{1/4}u,\qquad
\frac{d\eta}{ds}=a^{-5/4}.
$$

Here $a$ is the zero-delay circular radius having the current $h$, $x$ is actual radius divided by that scale, $y$ is radial velocity in its circular-speed units, and $\eta$ is a monotonically increasing time coordinate. These are coordinates on the actual delayed solution. The identities $a\ge1$, $\delta\le\epsilon$ and $v=a^{-1/4}/x$ are exact.

## Uniform response bounds on the changing scale

Provisionally restrict $|x-1|<\eta_0$ and $|y|<\eta_0$ for a fixed small neighbourhood, allowing harmless enlargement of the velocity bound to include the release. Constants in this section depend on that fixed neighbourhood and the given preparation, but not on $a$, time or $\epsilon$. Current scaled speed is at most $C a^{-1/4}\le C$, so for $\epsilon$ sufficiently small the complete history's physical speed is below $1/2$. The monotone complete partner-gap argument gives exactly one partner root, and the strict speed chord inequality excludes every positive-delay self root. In particular,

$$
\frac{2r}{1+b}\le R_d\le\frac{2r}{1-b},\qquad
|Y''|\le\frac{(1+b)^{3/2}}{1-b}r^{-3/2},\qquad b<\frac12.
$$

These bounds retain the remote supplied past and do not impose a fixed memory horizon. Initially the global speed bound gives $|r(q)-r(s)|\le C\epsilon r(s)$ throughout the receiving source window. On its generated portion, $r(q)\asymp a(q)$ then implies $a(q)\asymp a(s)$ and $|Y'(q)|\le C a(s)^{-1/4}$. Integrating this sharper speed bound gives the refined estimate

$$
|r(q)/r(s)-1|\le C\delta,\qquad
|Y'(q)|\le C a^{-1/4},\qquad |Y''(q)|\le C a^{-3/2}.
$$

If a window reaches negative time, its delay bound and the global scaled speed bound give $s\le C\epsilon[1+Cs]$, hence $s=O(\epsilon)$ and $a,r=1+O(\epsilon)$. The supplied circle and compact patch then supply the same acceleration bound. A source's own window is treated by the same argument; no renewed circular history is assumed at an evolved time.

At a future point in this window, the exact row differs from the central acceleration $-r(q)^{-3/2}n(q)$ by $O(\delta a^{-3/2})$: the causal chord direction differs from the current radial direction by $O(\delta)$, the range ratio from two by $O(\delta)$, and the transmitter factor from one by $O(\delta)$. The required local source velocities follow from the preceding window bounds, also for the source's own window. On the negative-time piece, the untouched circle has its central acceleration exactly, while the patch changes it by $O(\epsilon)$ on $a\asymp1$; the explicit bound $100\epsilon$ in the preparation is sufficient. Thus, in the fixed axes at reception, the entire source interval satisfies

$$
Y''(q)=-r^{-3/2}n+O(\delta a^{-3/2}).
$$

Integral Taylor formulas consequently determine the signed response through second order without any jerk bound. If $\ell=s-\sigma=2\epsilon r L$ and $L=R_d/(2r)$, their components are

$$
\begin{aligned}
[Y(s)+Y(\sigma)]_r&=2r-\ell u-\tfrac12\ell^2r^{-3/2}+O(\delta^3a),\\
[Y(s)+Y(\sigma)]_t&=-\ell v+O(\delta^3a),\\
Y'_r(\sigma)&=u+\ell r^{-3/2}+O(\delta^2a^{-1/4}),\\
Y'_t(\sigma)&=v+O(\delta^2a^{-1/4}).
\end{aligned}
$$

The transverse acceleration estimate above can be sharpened to $O(\delta a^{-3/2})$, which is already enough for the displayed cubic direction remainder. The factors $\epsilon$ multiplying the source velocities make both velocity remainders cubic in the transmitter factor. Solving the implicit norm equation gives

$$
\begin{aligned}
L&=1-\epsilon u+\epsilon^2\left(u^2-r^{-1/2}+v^2/2\right)+O(\delta^3),\\
N_t&=-\epsilon v+O(\delta^3),\qquad N_r=1-\epsilon^2v^2/2+O(\delta^3),\\
D&=1+\epsilon u+\epsilon^2\left(2r^{-1/2}-v^2\right)+O(\delta^3).
\end{aligned}
$$

For clarity, the radial implicit equation before its substitution is $L(N_r+\epsilon u)+\epsilon^2L^2r^{-1/2}=1+O(\delta^3)$. Its derivative in $L$ stays uniformly positive on this neighbourhood, so substitution with a cubic residual bounds the actual root error. It is not a freely chosen approximate delay.

Expanding $L^{-3/2}D^{-1}$ and retaining the direction terms now gives the signed row

$$
\begin{aligned}
A_r&=-r^{-3/2}\left[1+\frac{\epsilon u}{2}
-\epsilon^2\left(\frac{u^2}{8}+\frac{r^{-1/2}}2+\frac{v^2}{4}\right)\right]+Q_r,\\
A_t&=r^{-3/2}\left[\epsilon v+\frac{\epsilon^2uv}{2}\right]+Q_t,
\qquad |Q_r|+|Q_t|\le C\delta^3a^{-3/2}.
\end{aligned}
$$

This cubic bound is uniform on the changing-scale neighbourhood. It includes actual source acceleration and the old preparation seam. The sign of its quadratic radial terms is essential below.

As an algebraic control, doing the same expansion at $p=2$ removes the $\epsilon^2u^2$ and $\epsilon^2r^{1-p}$ amplitude terms and gives $A_r=-r^{-2}(1+\epsilon u-\epsilon^2v^2/2)$ and $A_t=r^{-2}(\epsilon v+\epsilon^2uv)$ through the retained order. These are the separately proved canonical signed terms in [the wider slow-binary theorem](slow-binary-wider-regime.md#3-an-implicit-root-residual-and-the-signed-cubic-constants). Its numerical threshold and Runge–Lenz coordinate are not transferred to the three-halves law.

## The radial oscillation and its second-order displacement

Substituting the row in the exact polar equations $r''=h^2/r^3+A_r$, $h'=rA_t$, and applying the coordinate definitions gives

$$
\begin{aligned}
x_\eta&=y-\frac43\delta x^{-1/2}-\frac23\delta^2yx^{-1/2}+O(\delta^3),\\
y_\eta&=f(x)-\frac16\delta yx^{-3/2}
+\delta^2x^{-3/2}\left(\frac7{24}y^2+\frac12x^{-1/2}+\frac14x^{-2}\right)+O(\delta^3),\\
\delta_\eta&=-\frac13\delta^2x^{-3/2}-\frac16\delta^3yx^{-3/2}+O(\delta^4),
\qquad f(x)=x^{-3}-x^{-3/2}.
\end{aligned}
$$

The remainders are bounded, time-dependent contributions from the actual delayed history. They are not assumed to be autonomous functions of $x,y,\delta$, and none is differentiated. Define

$$
z=y-\frac43\delta x^{-1/2},\qquad
G_0(x)=\frac{13}{18}x^{-2}+\frac14x^{-7/2}.
$$

The shifted radial variable subtracts the leading outward drift of the circular scale. Direct product differentiation, retaining the $\delta_\eta$ term, gives

$$
\begin{aligned}
x_\eta&=z-\frac23\delta^2x^{-1/2}z+O(\delta^3),\\
z_\eta&=f(x)+\frac12\delta x^{-3/2}z
+\delta^2\left[\frac7{24}x^{-3/2}z^2+G_0(x)\right]+O(\delta^3).
\end{aligned}
$$

The coefficient $+\delta/2$ at $x=1$ amplifies the radial oscillation. The remaining constant quadratic input cannot be ignored: over a long interval an absolute order-$\delta^2$ input could compete with the initial order-$\epsilon$ oscillation. The following correction removes it before any conclusion about that initial oscillation is made.

Use the auxiliary scalar functions

$$
V(x)=\frac1{2x^2}-2x^{-1/2}+\frac32,\qquad
G(x)=\frac{13}{18}(1-x^{-1})+\frac1{10}(1-x^{-5/2}),\qquad
V_\delta(x)=V(x)-\delta^2G(x).
$$

They obey $V'=-f$, $G'=G_0$, $V(1)=V'(1)=0$ and $V''(1)=3/2$. The unique nearby minimum $x_\delta$ of $V_\delta$ satisfies

$$
x_\delta=1+\frac{35}{54}\delta^2+O(\delta^4),\qquad
\frac{dx_\delta}{d\delta}=O(\delta).
$$

These facts follow from the positive second derivative and substitution in $V'(x_\delta)=\delta^2G_0(x_\delta)$; $G_0(1)=35/36$. No physical energy account is assigned to $V_\delta$. It is a scalar device for retaining the nonlinear radial restoring acceleration.

Put $X=x-x_\delta$ and define

$$
E=\frac12z^2+V_\delta(x)-V_\delta(x_\delta),\qquad
\mathcal L=E-\frac\delta4Xz,\qquad J=\sqrt{\mathcal L}.
$$

For a fixed sufficiently small neighbourhood and $\delta$ sufficiently small, $\mathcal L$ is positive definite in $(X,z)$ and comparable to $X^2+z^2$. Therefore $J$ measures the radial oscillation amplitude independently of its phase. At the actual release $x=1$, $y=0$, $\delta=\epsilon$, $z=-4\epsilon/3$, so

$$
J(0)=\frac{2\sqrt2}{3}\epsilon+O(\epsilon^3).
$$

The patch preserves this value because it preserves release position and velocity exactly.

## An inequality that preserves and amplifies the initial oscillation

Differentiate $E$ directly. The constant $\delta^2G_0$ term cancels against the derivative of $-\delta^2G$, including its moving minimum. The remaining terms give

$$
E_\eta=\frac12\delta x^{-3/2}z^2
+O(\delta^2 E)+O(\delta^3\sqrt E).
$$

For completeness, the bounded second-order terms before estimating are $(7/24)\delta^2x^{-3/2}z^3-(2/3)\delta^2x^{-1/2}V_\delta'(x)z$. The parameter derivative is $-2\delta[G(x)-G(x_\delta)]\delta_\eta=O(\delta^3|X|)$. The cubic response remainders are multiplied by $z$ or $V_\delta'(x)$ and are likewise $O(\delta^3\sqrt E)$. There is no state-independent term of order $\delta^3$ in the energy derivative.

The cross correction in $\mathcal L$ removes the phase dependence of the leading quadratic term. Indeed, with $\kappa^2=3/2$,

$$
(Xz)_\eta=z^2-\kappa^2X^2+O(J^3+\delta J^2+\delta^3J).
$$

Here $x_\delta'(\delta)\delta_\eta=O(\delta^3)$ is included. Combining the two derivatives and their positive-definite equivalences yields one uniform constant $C$ such that

$$
\left|\mathcal L_\eta-\frac\delta2\mathcal L\right|
\le C\delta(J+\delta)\mathcal L+C\delta^3J.
$$

The first error includes the departure of $x^{-3/2}$ from one and the nonlinear restoring term. The second is the remaining signed-row defect. Equivalently, wherever $J>0$,

$$
\left|\frac{J_\eta}{J}-\frac\delta4\right|
\le C\delta(J+\delta)+C\frac{\delta^3}{J}.
$$

Choose a fixed $j_*>0$ sufficiently small that $Cj_*$ is small, then choose $\epsilon_*>0$ sufficiently small. These choices depend only on the fixed neighbourhood and preparation. On a provisional interval with $J\le j_*$ and $J\ge\epsilon/2$, the exact $\delta\le\epsilon$ makes the last error divided by $\delta$ at most $2C\epsilon$. The choices can therefore ensure

$$
\frac\delta8\le\frac{J_\eta}{J}\le\frac{3\delta}8.
$$

Since $J(0)>\epsilon/2$, the positive lower derivative excludes a first downward crossing of that floor. The bound is thus self-consistent throughout the interval before $J=j_*$. The initial oscillation cannot be canceled by the controlled remainder. This is the step that an isotropic second-order error bound alone could not supply.

## Continuation to a finite regular transition

Small fixed $j_*$ ensures that the positive-definite amplitude bound keeps $x,z$, and hence $y$, strictly inside the provisional neighbourhood. The speed remains bounded by $C\epsilon a^{-1/4}\le C\epsilon<1/2$. The exact root census and the supplied past remain valid. Moreover,

$$
\frac{a_\eta}{a}=\frac43\delta x^{-3/2}\left(1+\frac{\delta y}{2}\right)+O(\delta^3),\qquad
c\epsilon\le\frac d{ds}a^{3/2}\le C\epsilon,
\qquad
-C\delta^2\le\delta_\eta\le-c\delta^2
$$

for positive constants $c,C$. The first formula is the actual torque expansion; the identity $\delta=\epsilon a^{-1/4}$ links the other two. Thus $a$ stays bounded on every finite $s$ interval, while radius and source delay have positive lower bounds and root factors have positive margins. The ordinary delayed equation continues unless the amplitude boundary is reached.

Suppose that boundary were never reached. The preceding continuation bounds would give a global ordinary future and $a^{3/2}\asymp1+\epsilon s$. Consequently $\eta(s)=\int_0^s a^{-5/4}\,ds$ tends to infinity. The differential bounds on $\delta$ then imply $\int_0^\infty\delta\,d\eta=\infty$. Integrating $J_\eta/J\ge\delta/8$ contradicts $J<j_*$. Therefore a first finite boundary time exists. It is reached by a separated uniformly subfield solution and is not a singularity. The ordinary equation has a local continuation beyond it.

The transition is precisely the first $J=j_*$ event, with $J$ defined from the actual $h,r,u$ above. No inference is made from a numerical loss of precision or from the failure of an error bound.

## Radius, speed and time at the transition

The leading exponent can be determined without replacing the oscillation by an averaged trajectory. Since $|x-1|\le C(J+\delta^2)$ and $|y|\le C(J+\delta)$,

$$
\frac{a_\eta}{a}=\frac43\delta+O(\delta J+\delta^2).
$$

Subtracting three-sixteenths of this equation from the logarithmic amplitude equation gives

$$
\left|\frac d{d\eta}\left(\log J-\frac3{16}\log a\right)\right|
\le C\delta J+C\delta^2+C\frac{\delta^3}{J}.
$$

Each error has a uniform integral up to the transition. The proved positive amplitude rate gives $\int\delta J\,d\eta\le8j_*$. The decreasing-parameter bound gives $\int\delta^2\,d\eta\le C\epsilon$ and $\int\delta^3\,d\eta\le C\epsilon^2$. Since $J\ge J(0)\asymp\epsilon$, the last logarithmic error also integrates to $O(\epsilon)$. Hence

$$
\left|\log\frac{J}{J(0)}-\frac3{16}\log a\right|\le C(j_*+\epsilon).
$$

At $J=j_*$ this proves $a_b\asymp\epsilon^{-16/3}$. Because $x_b$ is bounded away from zero and infinity, $r_b\asymp a_b$. The transverse velocity identity supplies a lower as well as upper speed bound, so

$$
|q'(T_b)|=\epsilon a_b^{-1/4}\sqrt{y_b^2+x_b^{-2}}\asymp\epsilon^{7/3}.
$$

The scale-growth inequality gives $s_b\asymp a_b^{3/2}/\epsilon\asymp\epsilon^{-9}$. Restoring the specified $r_0$ and $T=r_0s/\epsilon$ gives $T_b\asymp\epsilon^{-14}$ and absolute radius $|q(T_b)|\asymp\epsilon^{-28/3}$. These are family asymptotics with constants depending on the fixed amplitude boundary, not numerical estimates for a chosen finite speed.

The same argument holds at every fixed intermediate amplitude, in particular $j_*/2$. Between its first occurrence and $j_*$, the logarithmic growth bounds give a duration in $\eta$ comparable to $1/\delta_b\asymp\epsilon^{-7/3}$. Throughout that band $J$ has a fixed positive lower bound, while $\delta$ tends uniformly to zero as the launch speed tends to zero.

## Actual radial turns before the transition

Let $\psi=\arg(\kappa X+iz)$ be a continuous phase of the nonzero radial oscillation, with $\kappa=\sqrt{3/2}$. This phase is an auxiliary radial-oscillation coordinate, distinct from the member's orbital angle. Differentiating it with the displayed actual equations gives

$$
\psi_\eta=-\kappa+O(J+\delta+\delta^3/J).
$$

For the same fixed sufficiently small $j_*$ and sufficiently small $\epsilon_*$, its derivative is strictly negative and bounded away from zero. In the final band $j_*/2\le J\le j_*$, every complete phase revolution contains a point with $z\ge c j_*$ and a point with $z\le-c j_*$. Since

$$
u=a^{-1/4}y=a^{-1/4}\left(z+\frac43\delta x^{-1/2}\right),
$$

and $\delta$ is uniformly small there, the actual radial velocity $u=dr/ds$ has both signs on each such revolution. Its zeros are transverse: at $y=0$, $z=O(\delta)$ and the fixed lower amplitude forces $|X|\ge c j_*$. Thus $y_\eta=f(x)+O(\delta^2)$ is bounded away from zero with sign opposite to $X$. The solution has alternating regular radial maxima and minima.

The final band's phase duration grows as $\epsilon^{-7/3}$ and its phase rate stays bounded above and below. It therefore contains at least $c\epsilon^{-7/3}$ completed radial oscillations for sufficiently small $\epsilon$, with a constant $c>0$ depending on $j_*$. This is a statement about actual radial reversals before the transition, not a sign inferred from a circular torque residual. It does not identify the first reversal time or claim periodic returns to the same state. The circular scale $a$ continues to grow through these oscillations.

## Remaining fate and evidence boundary

The result settles a concrete continuation event for each sufficiently small fixed launch: the initially order-$\epsilon$ radial oscillation grows to a fixed amplitude after a controlled large expansion, with repeated radial turns and a decreasing speed scale. It rules out indefinitely renewing an order-$\delta$ near-circular preparation for this launch. It does not select what happens after the fixed small-amplitude boundary.

The exact positive radial rotating-class theorem continues to apply beyond this artificial comparison boundary while the actual solution is strictly subfield. It still excludes contact as the first finite obstruction, excludes an all-future bounded strict-subfield orbit, and gives dispersal if a common future speed margin is independently established. The present response estimates require $x$ near one and bounded normalized radial velocity; they do not supply that all-future margin after large eccentric excursions. The next mathematical burden is a shape-uniform bound through those excursions or a rigorously entered outward escape region. An extension must retain the growing complete causal window and the actual signed radial response.

**Falsifiers:** an admissible causal window violating the claimed scale-uniform cubic remainder; a missing coefficient in the second-order polar equations; failure of the moving-minimum or cross-term cancellation; a compatible sufficiently small family whose initial oscillation is canceled despite the derived differential inequality; indefinite confinement below $J=j_*$; or absence of the predicted alternating radial signs in a rigorously admitted final amplitude band. A finite-speed numerical disagreement without an admitted threshold and controlled errors is not such a falsifier. The threshold is existential, and no finite numerical trajectory has been certified.

**Ownership and checks:** this successor is a new subject authored by the assigned geometry/dynamics specialist. The finite secular source and existing canonical subjects remain unchanged by this work. The paper derivation reconstructs the root normalization, the two signed row coefficients, the shifted radial system, the positive amplitude functional and the physical-scale exponents; the preserved inverse-square signed row is a control for its local algebra, not an independent proof of this theorem. Independent assessment remains required. No numerical instrument, new production solver or target trajectory was run, and no owned process remains active. Shared manuscripts, queues, ledgers, frozen sources, the Git index and commits, and generated artifacts are outside this write scope.
