# Independent adjudication of accumulating zero terminal speeds

## Verdict and preparation scope

**Claim grade: derived.** The [terminal-speed subject](alternatives-screen-2026-10-05-terminal-speed-selection.md) establishes its stated existence theorem for each of the two fixed complete compatible families. For the three-halves radial law, and separately for canonical reception plus the fixed unit uniform-memory response, zero-terminal-speed launch parameters accumulate at zero. The argument does not establish that any launch has positive terminal speed, identify a particular zero-speed parameter, prove discreteness of the zero set, or certify a numerical smallness threshold.

The reason is a topological obstruction with quantitative analytical premises. An integer records completed turns of a nonvanishing auxiliary coordinate. That integer diverges as the launch parameter tends to zero. Near any positive-speed endpoint, finite-time continuous dependence and a uniform transverse terminal strip make the integer locally constant. If all sufficiently small launches had positive speed, connectedness of their parameter interval would force a constant integer, contradicting its divergence. Neither continuity at a zero-speed endpoint nor a limit interchange at parameter zero is used.

| Selected family | Independent verdict | Inherited zero-speed growth |
| --- | --- | --- |
| Radial power $p=3/2$, $K=R_*=c_f=1$, $r_0=(8\epsilon^4)^{-1}$, unchanged circular tail and compatible polynomial patch | Accepted at derived grade for an existential sufficiently small range of positive $\epsilon$ | Physical member radius is comparable to $T^{4/5}$ for each selected zero-speed member |
| Canonical plus unit uniform memory, $K=c_f=\lambda=\tau=1$, $r_0=(6\epsilon^2)^{-1}$, unchanged complete compatible family | Accepted independently at derived grade on its own existential sufficiently small range | Physical member radius is comparable to $T^{2/3}$ for each selected zero-speed member |

The comparison constants in the last column may depend on the fixed member. They are not a uniform joint asymptotic in $T$ and $\epsilon$. The two accumulating sequences need not agree. The exact all-root convention remains unchanged: one ordinary partner root and no positive-delay self root follow from the proved complete subfield speed bounds, rather than from deleting a channel.

This is an independent after-disclosure reconstruction using the analysis and well-posedness lens. The two earlier global adjudications are inspected for their exact admitted hypotheses and error bounds; their conclusions are not used to endorse the new topological step without proof. No Weber or Darwin material is used. The falsifiers for this verdict are the specific failures listed below in the continuity, radial-phase and memory-seed arguments.

## Fixed state and the bounds inherited from the global theorems

Let $q(T)$ be one member of the planar mirror pair $q,-q$, let $q=r_0Y(s)$ and $s=\epsilon T/r_0$, and use primes for $s$ derivatives. Set $r=|Y|$, $n=Y/r$, $t$ its positive quarter-turn, $u=Y'\cdot n$, and $h=Y\times Y'$. The signed cross product here is geometric areal rate, not an imported physical conserved quantity. All numerical units have $c_f=1$.

For the radial law define $a=h^{4/3}$, $z=\sqrt{a/r}$, $y=a^{1/4}u$, $\delta=\epsilon a^{-1/4}$, and $d\chi/ds=a^{-5/4}z^3$. The [radial global proof](alternatives-screen-2026-10-05-radial-global-dispersal.md), with the supplied-past restriction in its [independent assessment](../../analysis/alternatives-screen-2026-10-05-global-adjudication.md), gives the uniform generated-future rows

$$
z_\chi=-y/2+(2/3)\delta z+R_z,\quad |R_z|\le C\delta^2z,
$$

$$
y_\chi=z^3-1-\delta y/6+R_y,\quad |R_y|\le C\delta^2,
\qquad
\delta_\chi=-\delta^2/3+R_\delta,\quad |R_\delta|\le C\delta^3.
$$

They hold in a fixed box $0<z<4$, $|y|<4$, with $a\ge1$ at generated times. The latter bound is not asserted on every point of the supplied negative-time patch. That patch has its own complete speed and regularity bounds, and late source windows are entirely generated. The inherited endpoint satisfies $\chi_\infty<\infty$, $z\to0$, $y\to y_\infty\ge0$, and $0<a_\infty<\infty$.

The radial uniformity can be traced directly to the actual source interval. Its length is $O(\epsilon r)$; radii on it are comparable to the receiving radius. Positive torque and the causal half-plane geometry give $h'/h\le C\epsilon r^{-3/2}$, hence $h(q)/h(s)=1+O(\delta^2z)$ on the entire interval. Its source velocity is therefore $O(a^{-1/4})$. The chord direction has transverse component $N_t=-\epsilon v[1+O(\delta)]$, where $v=h/r=a^{-1/4}z^2$. This retains the factor that vanishes in the large-radius tail. The received radial and transverse accelerations are consequently $-r^{-3/2}[1+\epsilon u/2+O(\delta^2)]$ and $\epsilon v r^{-3/2}[1+O(\delta)]$. Differentiating the exact coordinate definitions gives the displayed bounded rows; no bare isotropic remainder has been divided by a vanishing clock.

For the memory law define $z=h^2/r$, $y=hu$, $\delta=\epsilon/h$ and retain the physical polar angle $\theta$, with $d\theta/ds=h/r^2>0$. The [memory global proof](alternatives-screen-2026-10-05-memory-global-dispersal.md) and its [assessment](../../analysis/alternatives-screen-2026-10-05-memory-adjudication.md) give $h\ge1/2$, $0<z<4$, $|y|<4$, and a finite endpoint with $z\to0$, $y\to y_\infty\ge0$, $0<h_\infty<\infty$. The stronger signed rows from its [transition proof](alternatives-screen-2026-10-05-memory-slow-transition.md) are available on this whole box:

$$
\begin{aligned}
z_\theta&=-y+2\delta z+2\delta^2yz+O(\delta^3z),\\
y_\theta&=z-1+\delta^2(y^2+z^2/2)+O(\delta^3),\\
h_\theta/h&=\delta+\delta^2y+O(\delta^3).
\end{aligned}
$$

Here the exact finite-memory equation is $A+K_\mu A=3F/2$, with $A=Y''$, $\mu=6\epsilon^3$ and $K_\mu f=\int_0^1(1-\vartheta)f(s-\mu\vartheta)\,d\vartheta$. Its kernel mass is $1/2$. The complete-window estimates first give $|A|\le C/r^2$, $|h(q)-h(s)|\le C\epsilon$, $|F'|\le C/(hr^3)$ and $|F'_t|\le Ch/r^4$. Weighted convolution comparison with weights $h^3r^2$ and $r^4/h$ gives, after $s_*=10\epsilon$,

$$
|A-F|\le\frac{C\epsilon^3}{h^3r^2},\qquad
|(A-F)_t|\le\frac{C\epsilon^3h}{r^4}.
$$

The transient before that time is bounded by an $O(\epsilon)$ supplied defect times a decaying exponential on scale $\mu$. Rotation of the axes in the transverse convolution costs at most $C\mu h/r^2$, controlled first by the norm estimate. Thus the transverse estimate survives as $z\to0$ and does not require small eccentricity. The signed acceleration remainders are $|Q_r|\le C\epsilon^3/(r^2h^3)$ and $|Q_t|\le C\epsilon^3v/(r^2h^2)$. Multiplying the latter by $r^3/h$ gives $O(\epsilon^3/h^2)$ in $h_\theta$; multiplying the former by $r^2$ gives $O(\delta^3)$ in $y_\theta$. These factors verify the stronger regularized rows without an unbounded tail error.

These are law-specific actual-history bounds. They do not turn either delayed equation into an autonomous ordinary differential equation: all remainder functions may depend on the full actual history, and no remainder is differentiated below.

## Complete-history parameter continuity at positive parameters

Fix $\epsilon_0>0$ strictly inside a common sufficiently small admission range. The [radial preparation](alternatives-screen-2026-10-05-radial-rotating-fate.md#complete-compatible-preparation) has physical patch width $r_0/16$; the [memory preparation](alternatives-screen-2026-10-05-memory-formulation.md#exact-compatible-complete-past) has physical width $1/2$. The circular-tail radii, frequencies and patch coefficients vary smoothly near $\epsilon_0$. Their circular source angle solves $\xi=\epsilon\cos\xi$ with derivative in $\xi$ equal to $1+\epsilon\sin\xi>0$. The patch and its first two derivatives vanish at its old seam, while its endpoint jets enforce the exact received acceleration. A moving seam therefore does not spoil continuity in the $C^2$ norm on any fixed compact interval of physical old time. No uniform convergence over the infinite circular past is assumed.

The complete global bounds give a common physical speed $b<1$ for nearby family members. For a fixed finite reception interval $0\le T\le T_1$, the radii and release radii are locally uniformly bounded in parameter. Every partner delay $\ell=T-S$ obeys

$$
\frac{2|q(T)|}{1+b}\le\ell\le\frac{2|q(T)|}{1-b}.
$$

Thus all sources lie in one compact interval $[-M,T_1]$; the unit-memory sample lies in a possibly enlarged interval of the same kind. Monotonicity of the complete partner gap excludes additional remote roots. Separation and the same inequalities give a positive delay floor on this compact reception interval.

For two histories on that compact source interval, a position discrepancy at most $d$ changes the partner residual at fixed source time by at most $2d$. Its source-time derivative has magnitude at least $1-b$, so the root displacement is at most $2d/(1-b)$. Evaluating a source velocity at the displaced root adds at most its bounded acceleration times this displacement. Together with the direct velocity discrepancy, this makes the delayed acceleration row locally Lipschitz in the $C^1$ histories on the compact regular chart. Source acceleration bounds include the supplied patch. The memory identity

$$
H(T)=-q'(T)+q(T)-q(T-1)
$$

adds only a locally Lipschitz position/velocity term; it introduces no acceleration-history initial variable.

Integrating the difference of the two position/velocity equations and applying the elementary integral inequality $d(T)\le d(0)+C\int_0^T d(t)\,dt$ on successive intervals shorter than the positive delay floor proves continuous dependence through $T_1$. The constants need be finite only near the chosen positive parameter and finite reception time. The parameter-dependent scales, lifted angle with $\theta(0)=0$, and positive weighted radial clock then inherit finite-time continuity. In particular, no uniform estimate as $\epsilon\downarrow0$ has been smuggled into this argument.

**Falsifier:** a missing root outside the common compact source interval, a zero source slope or delay floor on a separated compact interval, or loss of compact $C^1$ continuity for the displayed complete histories would invalidate this step. Whole-past uniform convergence is not a required condition and its failure is not a counterexample.

## A uniform terminal strip around each positive-speed endpoint

Both rows have the exact bounded-coefficient form

$$
z_\xi=-c_0y+b(\xi)z,\qquad |b|\le C\epsilon,\qquad |y_\xi|\le M,
$$

where $(\xi,c_0)=(\chi,1/2)$ for the radial law and $(\theta,1)$ for memory. Since the terminal scale is finite and positive for each fixed parameter, positive physical terminal speed is equivalent to $y_\infty>0$.

Suppose $y_\infty(\epsilon_0)=Y_*>0$. Choose a finite physical time $T_0$ sufficiently late that $y(T_0)>3Y_*/4$ and $z(T_0)=\zeta$ is arbitrarily small. Finite-time continuity gives, for nearby parameters, $y(T_0)>2Y_*/3$ and $0<z(T_0)<2\zeta$. Choose $\zeta$ so that $2C\epsilon\zeta<c_0Y_*/8$ throughout that neighborhood and

$$
M\frac{8\zeta}{c_0Y_*}<\frac{Y_*}{6}.
$$

As long as $y\ge Y_*/2$ and $z\le2\zeta$, one has $z_\xi\le-c_0Y_*/4$. The coordinate must tend to zero within weighted duration $8\zeta/(c_0Y_*)$, before $y$ can fall to $Y_*/2$. The inherited global theorem excludes a competing ordinary-domain termination. Every nearby launch therefore has positive terminal speed. This proves openness of the positive-speed set within the admitted parameter interval.

The same strip proves continuity of its terminal variables, not merely persistence of their signs. Tail changes in $y$ are bounded by $M$ times that short duration. In the radial case $\theta_\chi=z$ and $(\log a)_\chi=O(\delta)$ bound the changes in angle and scale; in memory $h_\theta=O(\epsilon)$ and the short angle interval do so directly. Given any desired error, take $T_0$ later, then shrink its finite-time parameter neighborhood. The terminal differences are bounded by the two small tails plus the finite-prefix difference. This proves continuity at every positive-speed parameter without extending the delayed equation through $z=0$ or assuming continuity of its history-dependent errors there.

**Falsifier:** an additive first-row error that does not vanish with $z$, an unbounded second-row derivative, or another domain exit before the strip ends would defeat the proof. None occurs in the inherited rows. The argument intentionally supplies no uniform strip around a zero-speed endpoint.

## Radial law: nonvanishing coordinate and irreversible phase winding

The [radial transition](alternatives-screen-2026-10-05-radial-rotating-transition.md) uses $x=r/a=z^{-2}$, shifted velocity $w=y-(4/3)\delta z$, and a smooth corrected-potential minimum $x_\delta=1+(35/54)\delta^2+O(\delta^4)$ with $x_\delta'=O(\delta)$. Let $\kappa=\sqrt{3/2}$ and define a complex coordinate on every finite positive-radius time by

$$
\mathcal W=\kappa(1-x_\delta z^2)+i[z^2y-(4/3)\delta z^3]
=z^2[\kappa(x-x_\delta)+iw].
$$

Before its first fixed-amplitude event $J=j_*$, the transition's positive-definite amplitude satisfies $J\asymp|(x-x_\delta,w)|$ and $J\ge J(0)\asymp\epsilon>0$. Hence $\mathcal W$ never vanishes there. At release its imaginary part is $-4\epsilon/3$ and its real part is $O(\epsilon^2)$, permitting one continuous initial argument near $-\pi/2$ for all small parameters.

At and after entry the global orbit-corrector argument retains a fixed gap

$$
e=\tfrac12y^2+\tfrac12z^4-2z\ge-\tfrac32+\nu_0,
\qquad \nu_0>0.
$$

Before a possible $e=1$ event this follows from the increasing corrected orbit integral and its bounded $O(\delta)$ difference from the central orbit integral. On the final fixed-duration comparison from $e=1$, the central scalar is exactly one and the actual state differs by $O(\epsilon)$, so the same lower gap is retained after reducing the launch threshold. This accounts for the whole post-entry interval. A zero of $\mathcal W$ would have $z=x_\delta^{-1/2}=1+O(\delta^2)$ and $y=(4/3)\delta z$, giving $e+3/2=O(\delta^2)$, incompatible with that gap. Thus the coordinate is nonzero on the entire generated future.

To check the direction of winding independently, first set $\delta=0$ and write $A_0=\kappa(1-z^2)$, $B_0=z^2y$. Under $z_\chi=-y/2$, $y_\chi=z^3-1$,

$$
(A_0)_\chi=\kappa zy,\qquad
(B_0)_\chi=-zy^2+z^2(z^3-1).
$$

Their determinant therefore is

$$
A_0(B_0)_\chi-B_0(A_0)_\chi
=-\kappa\{zy^2+z^2(z^2-1)(z^3-1)\}.
$$

The expression in braces is positive for $z>0$ except at $(1,0)$, since $z^2-1$ and $z^3-1$ have the same sign. This proves the central phase sign without a graphical or numerical phase count.

For the actual coordinate put $A=\operatorname{Re}\mathcal W$, $B=\operatorname{Im}\mathcal W$. On the fixed global box the changes from the central expressions satisfy

$$
\begin{aligned}
A-A_0&=O(\delta^2z^2),& B-B_0&=O(\delta z^3),\\
A_\chi-(A_0)_\chi\big|_{F_0}&=O(\delta z^2+\delta^2z|y|),&
B_\chi-(B_0)_\chi\big|_{F_0}&=O(\delta z^2|y|+\delta^2z^2).
\end{aligned}
$$

The vertical bar means the central derivative just computed; the actual coordinate derivatives themselves use the actual rows. These estimates follow by product differentiation using $x_\delta'=O(\delta)$ and $\delta_\chi=O(\delta^2)$. Products in $AB_\chi-BA_\chi$ then yield

$$
\operatorname{Im}(\overline{\mathcal W}\mathcal W_\chi)
=-\kappa\{zy^2+z^2(z^2-1)(z^3-1)\}+O(\delta z^2).
$$

For example, the seemingly weaker term $O(\delta^2z|y|)$ in $A_\chi$ is multiplied by $B=O(z^2|y|+\delta z^3)$ and remains bounded by $C\delta z^2$ on the box. No derivative of a remainder is required.

When $0<z\le1/2$, $(1-z^2)(1-z^3)\ge21/32$, so the leading positive quantity dominates $(21/32)z^2+zy^2$. Its $z^2$ factor matches the error and makes the sign uniform arbitrarily close to zero radius coordinate. On $z\ge1/2$, compactness and the fixed scalar gap exclude the only zero $(1,0)$ and give a positive lower bound. Thus the lifted phase $\psi=\arg\mathcal W$ is strictly decreasing throughout the post-entry future for every sufficiently small launch.

Before entry, multiplication by positive $z^2$ leaves the transition phase unchanged. Its actual bound $\psi_\eta=-\kappa+O(J+\delta+\delta^3/J)<-c$ and final fixed-amplitude band of duration comparable to $\epsilon^{-7/3}$ give

$$
\psi_b\le C-c\epsilon^{-7/3}.
$$

The initial phase is uniformly bounded and the earlier phase also decreases, so an unbounded positive contribution before that band is impossible. At the terminal boundary $\mathcal W\to\kappa>0$. A small disk about this nonzero number admits a single continuous argument and excludes further full turns; consequently the finite lifted limit exists and is $\psi_\infty=2\pi N_r(\epsilon)$ for an integer $N_r$. The preceding inequalities prove $N_r(\epsilon)\to-\infty$.

Near a positive-speed parameter, the finite prefix of $\mathcal W$ stays uniformly away from zero by compactness and continuous dependence. Its lift varies continuously. The uniform transverse strip keeps the entire remaining path in a disk about $\kappa$ with no additional winding. Therefore $N_r$ is locally constant at every positive-speed parameter.

**Falsifiers:** a canceled transition seed, failure of the scalar gap on the final $e=1$ comparison, a zero of $\mathcal W$ outside the excluded near-center state, or a determinant error larger than $C\delta z^2$ near zero would break the radial proof. A plain $O(\delta)$ determinant bound would be insufficient, but it is not the bound reconstructed here.

## Memory law: global preservation of the signed vector

Define the algebraic vector $e=(z-1)n-yt$, whose components are $e_n=z-1$ and $e_t=-y$, and let $M=2nn^{\mathsf T}-I$. This vector is bounded on the whole global box, although it is no longer small. Since $n_\theta=t$ and $t_\theta=-n$, the cubic rows give directly

$$
e_\theta=2\delta z n+\delta^2[2yz n-(y^2+z^2/2)t]+O(\delta^3).
$$

Writing $x=e/h$ and subtracting $(h_\theta/h)x$ yields

$$
x_\theta=\frac{2\epsilon}{h^2}n+\frac\epsilon hMx
+\frac{\epsilon^2}{h^3}P(e)+O(\epsilon^3/h^4),
$$

$$
P(e)=-e_t(2+e_n)n-\tfrac12(1+e_n)^2t.
$$

For a direct coefficient check, the second-order normal component is $2yz-y(z-1)=y(z+1)=-e_t(2+e_n)$; the tangential component is $-(y^2+z^2/2)+y^2=-z^2/2$. Thus there is no missing quadratic term hidden by a small-eccentricity assumption. On every fixed bounded $e$ set, $|P(e)+t/2|\le C|e|$.

Use the exact same corrections as the transition:

$$
b=\frac eh+\frac{2\epsilon}{h^2}t+\frac{5\epsilon^2}{2h^3}n,
\qquad
B(\theta)=\frac12\begin{pmatrix}\sin2\theta&-\cos2\theta\\-\cos2\theta&-\sin2\theta\end{pmatrix},
\qquad Z=(I-\epsilon B/h)b.
$$

The matrix satisfies $B_\theta=M$ and is uniformly bounded. Differentiating $2\epsilon t/h^2$ removes $2\epsilon n/h^2$ and contributes $-4\epsilon^2t/h^3$ at the next order. Substituting $x=b-2\epsilon t/h^2+O(\epsilon^2/h^3)$ into $(\epsilon/h)Mx$ contributes $+2\epsilon^2t/h^3$, since $Mt=-t$. The polynomial constant contributes $-\epsilon^2t/(2h^3)$. Their sum is canceled by the derivative of $5\epsilon^2n/(2h^3)$. The remaining polynomial is bounded by $C|e|$, so

$$
b_\theta=(\epsilon/h)Mb+O(\epsilon^2h^{-2}|b|)+O(\epsilon^3h^{-4}).
$$

Differentiating $Z$ cancels the displayed matrix term. The parameter derivative of $\epsilon/h$ and all matrix products have size $O(\epsilon^2/h^2)$. The inverse matrix is uniformly bounded for small $\epsilon$, because $h\ge1/2$. Hence

$$
|Z_\theta|\le C\epsilon^2h^{-2}|Z|+C\epsilon^3h^{-4}
$$

throughout the whole global chart after the initial layer. This calculation is valid for bounded eccentricity, not only for the small transition neighborhood.

The actual layer gives $Z(\theta_*)=2\epsilon t(0)+O(\epsilon^2)$, $h(\theta_*)=1+O(\epsilon^2)$ and $\theta_*=O(\epsilon)$. The signed row gives $\epsilon/2\le h_\theta\le2\epsilon$ globally afterward. Changing variable to $h$ proves

$$
\int_{\theta_*}^{\theta_\infty}\frac{\epsilon^2}{h^2}\,d\theta\le C\epsilon,
\qquad
\int_{\theta_*}^{\theta_\infty}\frac{\epsilon^3}{h^4}\,d\theta\le C\epsilon^2.
$$

The upper limits may even be replaced by $h=\infty$ in these estimates. The elementary integral bound first gives $\sup|Z|\le C\epsilon$ and then, by integrating $|Z_\theta|$, gives

$$
Z(\theta)=2\epsilon t(0)+O(\epsilon^2)
$$

uniformly to the endpoint. An interval of very large angle has not multiplied an unweighted error by its length: the two changing-scale integrals are the necessary uniform controls.

At the endpoint $e_\infty=-n_\infty-y_\infty t_\infty$, so $1\le|e_\infty|\le C$. The correction formula and $|Z_\infty|\le C\epsilon$ first give $|e_\infty|/h_\infty\le C\epsilon$ using only $h\ge1/2$, hence $h_\infty\ge c/\epsilon$. At that improved scale, the additive correctors and matrix difference between $e_\infty/h_\infty$ and $Z_\infty$ are $O(\epsilon^3)$. Since $|Z_\infty|\ge\epsilon$ for small launches, one obtains the reverse bound $h_\infty\le C/\epsilon$. Thus

$$
h_\infty\asymp\epsilon^{-1},\qquad
\theta_\infty\asymp\epsilon^{-2},\qquad
e_\infty/|e_\infty|=t(0)+O(\epsilon).
$$

The angle estimate follows by integrating the two-sided bound for $h_\theta$ from $h(\theta_*)\asymp1$ to $h_\infty\asymp\epsilon^{-1}$. These estimates hold for both terminal-speed alternatives.

Choose $t(0)=(0,1)$, as in the fixed family. The last orientation bound defines a unique ordinary argument $\varphi(\epsilon)$ of $e_\infty$ in one fixed small interval about $\pi/2$ for all sufficiently small parameters. In complex notation,

$$
e_\infty=-(1+iy_\infty)e^{i\theta_\infty},\qquad
N_m(\epsilon)=\frac{\theta_\infty+\pi+\arctan y_\infty-\varphi(\epsilon)}{2\pi}\in\mathbb Z.
$$

The bounded arctangent and chosen argument give $N_m\to+\infty$ as $\epsilon\downarrow0$. At each positive-speed parameter the transverse-strip argument makes $\theta_\infty$, $y_\infty$ and $e_\infty$ continuous, and the fixed argument branch makes $\varphi$ continuous there. Thus $N_m$ is locally constant on the positive-speed set.

**Falsifiers:** loss of either weighted memory factor, a further quadratic term in the displayed $P$, a nonintegrable coefficient in the $Z$ inequality, or loss of the initial $2\epsilon t(0)$ seed would invalidate this argument. Merely observing that $e$ becomes order one does not invalidate it, because the polynomial estimate is explicitly uniform on the bounded box.

## Connectedness, endpoint growth and rejected extensions

For either law let $I=(0,\epsilon_*)$ be a connected interval contained in all of its required smallness ranges. Its terminal normalized radial velocity is nonnegative for every parameter. Suppose some interval $(0,\epsilon_1)\subset I$ contained no zero-speed member. Every member there would have positive speed, and the corresponding integer $N_r$ or $N_m$ would be locally constant everywhere on the interval. A locally constant function on a connected interval is constant: the set on which it equals its value at one point is both open and closed. This contradicts its proved divergence at zero. Therefore every such interval contains a zero-speed parameter. Choosing one below half the preceding choice produces a strictly decreasing positive sequence tending to zero.

This reasoning needs no compactness of the parameter interval, no terminal continuity at its excluded endpoint zero, and no terminal continuity at a zero-speed launch. It allows the entire sufficiently small family to have zero terminal speed. In particular, it does not establish positive-speed existence by claiming that zeros are isolated or that winding changes generically.

At a zero-speed radial endpoint, the inherited row gives $y\asymp\Delta$ and $z\asymp\Delta^2$ for $\Delta=\chi_\infty-\chi$, since $y_\chi$ stays between negative constants and $z_\chi=-y/2+O(z)$. Then $ds/d\chi=a^{5/4}z^{-3}\asymp\Delta^{-6}$ and $r=az^{-2}\asymp\Delta^{-4}$, giving $r\asymp s^{4/5}$. At a memory zero-speed endpoint the analogous estimates in $\Delta=\theta_\infty-\theta$ give $ds/d\theta=h^3z^{-2}\asymp\Delta^{-4}$ and $r=h^2/z\asymp\Delta^{-2}$, giving $r\asymp s^{2/3}$. Multiplication by the fixed member's physical scales produces the stated powers of $T$. Both endpoints lie at infinite physical time, so no continuation prescription at infinity is added.

The following extensions are not supported and are excluded from this verdict: a specified finite launch with certified zero or positive speed; a numerical admission threshold; density, discreteness or ordering of the zero set; a common sequence for the two laws; arbitrary-history or nonmirror persistence; an exact asymptotic coefficient; or a conclusion for the unchanged canonical law without the selected memory term. These are additional mathematical questions, not consequences of the integer argument.

## Frozen sources and validation record

The following source identities were measured with `shasum -a 256` before this assessment was written. The reviewed terminal-speed source matched the assignment's frozen identity.

| Source | SHA-256 |
| --- | --- |
| [Terminal-speed selection](alternatives-screen-2026-10-05-terminal-speed-selection.md) | `9736cccba1d7b7309dc4200c09f8dd831872b4c990846606cf67003030b64557` |
| [Radial preparation](alternatives-screen-2026-10-05-radial-rotating-fate.md) | `3adf1ae06c06fb0240ed5a4bf662f779eb7a704f87f64eacb68b8bd4371f09e0` |
| [Radial transition](alternatives-screen-2026-10-05-radial-rotating-transition.md) | `6e8b6ea6fe9659d71a3ce5bc312ed8d8cce70bff8cd5dd805fedd864ce4b4488` |
| [Radial global proof](alternatives-screen-2026-10-05-radial-global-dispersal.md) | `41120b7ca5d34d33c2ce17c3a0ab9ea6ad298730cda0f2083397d41733057404` |
| [Radial global assessment](../../analysis/alternatives-screen-2026-10-05-global-adjudication.md) | `1032c3f189f50f9c1f55c3776644503abf2a8fc77be5378a65cd2adeff3bb026` |
| [Memory preparation](alternatives-screen-2026-10-05-memory-formulation.md) | `e77ae06dccda7f06f0f11302d0d50dd270be5192b88f989d3e3cfa3424103d3a` |
| [Memory transition](alternatives-screen-2026-10-05-memory-slow-transition.md) | `ae31d20710478746566688d25d8e2d1e86e21d3af10789bf06e6f3156fadee22` |
| [Memory global proof](alternatives-screen-2026-10-05-memory-global-dispersal.md) | `b8066d75120561fe0ded282d6ccc34a9f525d7e526dd1073696b0f13d2936a71` |
| [Memory assessment](../../analysis/alternatives-screen-2026-10-05-memory-adjudication.md) | `a21180e917b6eb7034abbcc951067997f60085a7e6a86c3293e4b6b13f90ee16` |

Validation is analytical: the independent determinant calculation, the component calculation of $P$, the corrector cancellations, weighted tail integrals, finite-history difference estimate and connectedness proof are written above. No target trajectory, numerical threshold, new test instrument or Python computation was used. Only this new assessment is authored; source subjects, earlier evidence and shared integration owners remain unchanged by this review. Git publication and regeneration are outside its scope.
