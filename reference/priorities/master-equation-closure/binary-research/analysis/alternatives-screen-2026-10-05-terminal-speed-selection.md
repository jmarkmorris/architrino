# Terminal-speed selection: zero-speed launches accumulate in both admitted families

## Fixed families and new result

**Derived candidate, pending fresh independent assessment:** for each of the two unchanged compatible launch families below, there are arbitrarily small positive launch parameters whose terminal outward speed is zero. In particular, no theorem can make that speed strictly positive for every sufficiently small member of either family. The existing global dispersal conclusions remain intact.

| Selected complete family | New conclusion | What remains unresolved |
| --- | --- | --- |
| $p=3/2$, $K=R_*=c_f=1$, the exact circular-tail/compatible-patch mirror family, $r_0=(8\epsilon^4)^{-1}$ | A sequence $\epsilon_n\downarrow0$ has zero terminal speed; its physical radius is comparable to $T^{4/5}$ by the admitted endpoint reconstruction | Which specified parameter has zero speed, existence or density of positive-speed parameters, and any numerical admission threshold |
| Canonical plus unit uniform memory, $K=c_f=\lambda=\tau=1$, the exact family with $r_0=(6\epsilon^2)^{-1}$ | A sequence $\epsilon_n\downarrow0$ has zero terminal speed; its physical radius is comparable to $T^{2/3}$ | The same parameter-selection and numerical questions |

The two sequences need not coincide. No equation coefficient, preparation shape or root convention is changed. Every sufficiently small family member already has a complete separated all-future uniformly subfield solution with finite angular advance and a nonnegative terminal radial velocity, by the admitted [radial global theorem](alternatives-screen-2026-10-05-radial-global-dispersal.md) and [memory global theorem](alternatives-screen-2026-10-05-memory-global-dispersal.md), with their [radial](../../analysis/alternatives-screen-2026-10-05-global-adjudication.md) and [memory](../../analysis/alternatives-screen-2026-10-05-memory-adjudication.md) independent assessments. Those results are premises here. Their finite-amplitude entries and complete-history bounds are retained, rather than reproved by numerical endpoints.

The new argument has two ingredients: a uniform finite-time neighborhood of every positive-speed terminal branch, and an integer winding count that cannot stay constant as $\epsilon\downarrow0$. A zero-speed endpoint is not forbidden by the local regularized equations; it is where the integer can change without violating finite-time continuous dependence. No assertion about the behavior at such a change is required.

## Why local endpoint signs alone do not select positive speed

For the radial law use the global theorem's $z=\sqrt{a/r}$, $y=a^{1/4}u$, $\delta=\epsilon a^{-1/4}$ and weighted time $\chi$. Its actual equations have uniform errors

$$
z_\chi=-\frac y2+\frac23\delta z+O(\delta^2z),\qquad
y_\chi=z^3-1-\frac16\delta y+O(\delta^2),\qquad
\delta_\chi=-\frac13\delta^2+O(\delta^3).
$$

For memory use $z=h^2/r$, $y=hu$, $\delta=\epsilon/h$ and angle $\theta$:

$$
z_\theta=-y+2\delta z+O(\delta^2z),\qquad
y_\theta=z-1+O(\delta^2),\qquad
\delta_\theta=-\delta^2+O(\delta^3).
$$

At $z=y=0$ both have a strictly negative $y$ derivative and a first-row error proportional to $z$. A positive path may therefore approach with $y\asymp\xi_\infty-\xi$ and $z\asymp(\xi_\infty-\xi)^2$, where $\xi$ is the respective clock. This is exactly the allowed zero-speed alternative already reconstructed. Increasing corrected orbit scalars do not by themselves exclude it: those scalars differ from the uncorrected boundary quantity by phase-dependent terms. The following parameter argument, rather than a pointwise positivity inference, determines that zero cases must actually occur.

## Parameter continuity and transverse terminal neighborhoods

Both complete old histories are explicitly smooth functions of the positive parameter away from $\epsilon=0$. In physical time they are circular tails with smooth parameter-dependent radii and frequencies, joined to polynomial patches whose position, velocity and acceleration jets match at their old seam. For memory the physical patch width is exactly $1/2$; for the radial family it is $r_0/16$. Both widths vary continuously near any fixed $\epsilon_0>0$. The implicit circular angle solves $\xi=\epsilon\cos\xi$ with a derivative bounded away from zero. Thus the complete supplied paths vary continuously in $C^2$ on every compact physical-time interval near each positive parameter. Uniform convergence on the whole infinite circular tail is neither true in general nor needed.

Fix one family member and a finite future time. Its separated subfield solution has positive separation and source-factor margins on that compact interval. The complete uniform speed bound places every relevant source in a common finite preceding interval for nearby parameters; remote earlier roots are excluded by the same monotone-gap argument. On this finite history set, implicit partner roots vary Lipschitz-continuously with the paths. Evaluating source velocity at a moved root is locally Lipschitz in the $C^1$ path norm because the actual source accelerations are bounded on the compact interval. Positive minimum partner delay allows successive local causal steps. In the memory case use the exact position/velocity identity $H=-V(T)+X(T)-X(T-1)$, so no acceleration-history variable or neutral initial datum is introduced. The usual difference-of-integral-equations estimate, followed over finitely many such steps, proves continuous dependence of positions and velocities on $\epsilon$ at every finite physical time. This argument uses complete old data on the needed compact window, not a newly prescribed evolved history.

The rescalings $r_0(\epsilon)$, $s=\epsilon T/r_0$, and the algebraic definitions of $a,h,z,y,\delta$ are smooth at every $\epsilon_0>0$ on positive radius and positive areal rate. Finite-time continuity therefore passes to these coordinates. The lifted physical angle is fixed by $\theta(0)=0$ and varies continuously on finite intervals. The weighted radial clock likewise varies continuously on finite intervals; its speed is positive before the endpoint.

Here is the additional terminal lemma needed below. Suppose one parameter has $y_\infty=Y_*>0$. In its final regularized strip, write

$$
z_\xi=-c_0y+b(\xi)z,\qquad |b|\le C\epsilon,
$$

where $(\xi,c_0)=(\chi,1/2)$ for the radial law and $(\theta,1)$ for memory. Both global theorems also give a uniform bound $|y_\xi|\le M$ on their fixed boxes. Choose a finite physical time sufficiently late that $y>3Y_*/4$ and $z=\zeta$ is small. Nearby parameters at this same physical time have $y>2Y_*/3$ and $0<z<2\zeta$. Take $\zeta$ small enough that $|b|z<c_0Y_*/8$ and that the maximum exit duration $8\zeta/(c_0Y_*)$, multiplied by $M$, is less than $Y_*/6$.

A first-exit argument then keeps $y>Y_*/2$ and makes $z_\xi<-c_0Y_*/4$ until the $z=0$ limit. This takes at most the displayed small regularized time. The inherited global theorem excludes any competing domain failure and supplies the endpoint. Every nearby parameter therefore also has positive terminal speed. On this short tail, the changes in $y$, physical angle and the finite scale variable are $O(\zeta)$: for the radial law use $\theta_\chi=z$ and $(\log a)_\chi=O(\delta)$; for memory use $h_\theta=O(\epsilon)$. The constants can be fixed in a neighborhood of $\epsilon_0$.

By choosing the finite reception later and then its parameter neighborhood smaller, these tail estimates prove continuity of the terminal variables at every positive-speed parameter. They also prove that no additional winding can appear in its final small-$z$ strip. This is not continuity asserted at a grazing zero-speed endpoint, nor an interchange of a limit with an uncontrolled infinite physical-time interval.

## Three-halves law: a global nonzero oscillation coordinate

Use the [admitted radial transition](alternatives-screen-2026-10-05-radial-rotating-transition.md). Its local variables are $x=r/a=z^{-2}$ and the shifted velocity

$$
w=y-\frac43\delta x^{-1/2}=y-\frac43\delta z.
$$

Let $x_\delta$ be the unique nearby minimum of its corrected potential. It is a smooth function for small $\delta$, with $x_\delta=1+35\delta^2/54+O(\delta^4)$ and $x_\delta'=O(\delta)$. Set $\kappa=\sqrt{3/2}$ and define on the whole actual positive-radius future

$$
\mathcal W=\kappa(1-x_\delta z^2)+i\left(z^2y-\frac43\delta z^3\right).
$$

Before the transition this is exactly

$$
\mathcal W=z^2\{\kappa(x-x_\delta)+iw\}.
$$

The admitted positive-definite amplitude $J$ never falls below its nonzero release value and is comparable to the norm of $(x-x_\delta,w)$ up to the first $J=j_*$ event. Thus $\mathcal W$ is nonzero there. Its release imaginary part is $-4\epsilon/3$ and its real part is $O(\epsilon^2)$, so choose its initial argument continuously near $-\pi/2$.

After the transition the admitted corrected orbit gain keeps

$$
e=\frac12y^2+\frac12z^4-2z\ge-\frac32+\nu_0
$$

for some fixed $\nu_0>0$, while $z,y$ stay in a fixed bounded box. The final comparison following a possible $e=1$ event also retains this gap after reducing the common launch threshold: its central scalar remains one and the comparison error is uniformly small. A zero of $\mathcal W$ would require $z=x_\delta^{-1/2}=1+O(\delta^2)$ and $y=4\delta z/3$, which gives $e+3/2=O(\delta^2)$. This contradicts the fixed gap for sufficiently small launches. Hence $\mathcal W$ never vanishes at any generated time.

The transition's continuous phase satisfies

$$
\frac{d}{d\eta}\arg\mathcal W=-\kappa+O(J+\delta+\delta^3/J)<-c<0.
$$

Its final fixed-amplitude band has duration comparable to $\epsilon^{-7/3}$ in $\eta$. The continuously lifted phase $\psi$ therefore obeys $\psi_b\le C-c\epsilon^{-7/3}$ at the actual transition. This uses the surviving signed seed and actual phase theorem for the same complete launch, not a guessed number of comparison cycles.

## The radial phase cannot unwind in the large-radius tail

For $\delta=0$, write $\mathcal W_0=\kappa(1-z^2)+iz^2y$. Along the actual zero-order polynomial field $z_\chi=-y/2$, $y_\chi=z^3-1$, direct differentiation gives

$$
\operatorname{Im}(\overline{\mathcal W_0}(\mathcal W_0)_\chi)
=-\kappa\{zy^2+z^2(z^2-1)(z^3-1)\}.
$$

The expression in braces is positive for every $z>0$ except $(z,y)=(1,0)$. This is a known algebraic control for the phase sign.

The actual uniform rows and $x_\delta'=O(\delta)$ give, on the bounded global box,

$$
\operatorname{Im}(\overline{\mathcal W}\mathcal W_\chi)
=-\kappa\{zy^2+z^2(z^2-1)(z^3-1)\}
+\mathcal R,\qquad |\mathcal R|\le C\delta z^2.
$$

The near-boundary factor is important. To verify it directly, the real and imaginary parts differ from those of $\mathcal W_0$ by $O(\delta^2z^2)$ and $O(\delta z^3)$. Their derivative differences are respectively $O(\delta z^2+\delta^2z|y|)$ and $O(\delta z^2|y|+\delta^2z^2)$, using the factor $z$ in the first-row error and $\delta_\chi=O(\delta^2)$. Multiplying by the bounded real part and the $O(z^2|y|+\delta z^3)$ imaginary part gives the stated $C\delta z^2$ bound. No derivative of a remainder is taken.

For $0<z\le1/2$, the leading braces are at least $zy^2+(21/32)z^2$, since $(1-z^2)(1-z^3)\ge21/32$. Thus the error cannot reverse the sign when $\epsilon$, hence $\delta$, is sufficiently small. On the remaining compact region $z\ge1/2$, the scalar gap excludes $(1,0)$, so the leading braces have a fixed positive minimum. Again the small error cannot reverse their sign. Therefore $\psi_\chi<0$ throughout the post-transition future.

At the inherited terminal boundary $z\to0$, with bounded $y$ and positive finite limiting scale, $\mathcal W\to\kappa>0$. The continuous nonzero path thus has a finite lifted terminal argument

$$
\psi_\infty(\epsilon)=2\pi N(\epsilon),\qquad N(\epsilon)\in\mathbb Z,
\qquad N(\epsilon)\longrightarrow-\infty\quad(\epsilon\downarrow0).
$$

The last conclusion follows from $\psi_\infty\le\psi_b\le C-c\epsilon^{-7/3}$. A nonzero limiting complex value also ensures that its final argument has a unique local lift, rather than an unobserved infinite sequence of turns near the endpoint.

At every positive-speed parameter, the transverse-tail lemma and finite-prefix continuity make $N$ locally constant: the prefix stays nonzero and its lift varies continuously, while the final small-$z$ strip stays near the positive real value $\kappa$ and permits no additional winding. Suppose all sufficiently small launches had positive speed. Then this integer-valued locally constant function would be constant on their connected interval $(0,\epsilon_1)$, contradicting its divergence. Hence every such interval contains a zero-speed launch. Taking successively smaller intervals gives a sequence tending to zero.

## Memory: extend the signed seed through the full bounded global chart

The memory argument uses its own exact-filter estimates, not the radial phase theorem. On the entire admitted global box $h\ge1/2$, $0<z<4$, $|y|<4$, the weighted complete-source and memory estimates retain the signed row with cubic remainders. Exact differentiation therefore sharpens the displayed global rows to

$$
\begin{aligned}
z_\theta&=-y+2\delta z+2\delta^2yz+O(\delta^3z),\\
y_\theta&=z-1+\delta^2(y^2+z^2/2)+O(\delta^3),\\
h_\theta/h&=\delta+\delta^2y+O(\delta^3),\qquad \delta=\epsilon/h.
\end{aligned}
$$

For example, multiplying the retained transverse remainder by $r^3/h$ gives $O(\epsilon^3/h^2)$ in $h_\theta$ because $v=h/r$. Multiplying the radial remainder by $r^2$ gives $O(\epsilon^3/h^3)$ in $y_\theta$. Hence the cubic bounds survive uniformly as $z\to0$; they do not require small eccentricity. The original supplied and generated source windows and the exact finite-memory transient remain covered by the inherited weighted theorem from $s_*=10\epsilon$ onward.

Define the geometric vector $e=(z-1)n-yt$, now with $|e|$ bounded by a fixed constant on the entire box, and put $M=2nn^{\mathsf T}-I$. With $x=e/h$, differentiation gives

$$
x_\theta=\frac{2\epsilon}{h^2}n+\frac\epsilon h Mx
+\frac{\epsilon^2}{h^3}P(e)+O(\epsilon^3/h^4),
$$

$$
P(e)=-e_t(2+e_n)n-\frac{(1+e_n)^2}{2}t.
$$

Its constant term is $P(0)=-t/2$. On any fixed bounded $e$ set, $|P(e)+t/2|\le C|e|$; small eccentricity is unnecessary for this polynomial bound.

Retain exactly the transition's correctors

$$
b=\frac eh+\frac{2\epsilon}{h^2}t+\frac{5\epsilon^2}{2h^3}n,
\qquad
B(\theta)=\frac12\begin{pmatrix}\sin2\theta&-\cos2\theta\\-\cos2\theta&-\sin2\theta\end{pmatrix},
\qquad Z=(I-\epsilon B/h)b.
$$

Here $B_\theta=M$. Differentiating the first corrector contributes $-4\epsilon^2t/h^3$ at second order; replacing $x$ inside $Mx$ contributes $+2\epsilon^2t/h^3$; the polynomial constant contributes $-\epsilon^2t/(2h^3)$. The $5/2$ corrector cancels their sum. The remaining polynomial is bounded by $C|e|$, and $e/h=b+O(\epsilon/h^2)$. Removing $M$ with the displayed bounded matrix therefore yields on the **whole** global box

$$
|Z_\theta|\le C\frac{\epsilon^2}{h^2}|Z|+C\frac{\epsilon^3}{h^4}.
$$

The inherited initial layer gives $Z(\theta_*)=2\epsilon t(0)+O(\epsilon^2)$ and $h(\theta_*)=1+O(\epsilon^2)$. Also $\epsilon/2\le h_\theta\le2\epsilon$ on the entire subsequent bounded chart after reducing the common threshold. Changing integration variable from angle to $h$ gives

$$
\int_{\theta_*}^{\theta_\infty}\frac{\epsilon^2}{h^2}\,d\theta\le C\epsilon,
\qquad
\int_{\theta_*}^{\theta_\infty}\frac{\epsilon^3}{h^4}\,d\theta\le C\epsilon^2.
$$

An integral Grönwall bound, followed by integration of the derivative bound, proves

$$
Z(\theta)=2\epsilon t(0)+O(\epsilon^2)
$$

uniformly through the complete global future and its finite angle endpoint. The constants do not grow with its long angle interval. This is the needed global extension of the signed seed, with the original fixed orientation $t(0)=(0,1)$.

## Memory terminal matching and its integer obstruction

At the boundary, $z\to0$ and $y\to y_\infty\ge0$, so $e_\infty=-n_\infty-y_\infty t_\infty$ and $1\le|e_\infty|\le C$. The relation between $e/h$ and $Z$ and the global seed give first

$$
|e_\infty|/h_\infty\le C\epsilon,
$$

using $h\ge1/2$, hence $h_\infty\ge c/\epsilon$. At that scale all corrector differences are $O(\epsilon^3)$, and $|Z_\infty|\ge\epsilon$ gives the reverse bound $h_\infty\le C/\epsilon$. Therefore

$$
h_\infty\asymp\epsilon^{-1},\qquad
\theta_\infty\asymp\epsilon^{-2},\qquad
\frac{e_\infty}{|e_\infty|}=t(0)+O(\epsilon).
$$

The angle estimate follows by integrating $\epsilon/2\le h_\theta\le2\epsilon$ from the short initial layer, whose angle is $O(\epsilon)$. It is uniform for either endpoint-speed alternative.

Let $\varphi(\epsilon)$ be the unique argument of $e_\infty$ in a fixed small interval about $\pi/2$. The fixed seed orientation makes that choice possible for every sufficiently small parameter. Since $e_\infty=-(1+iy_\infty)e^{i\theta_\infty}$ in complex notation,

$$
N(\epsilon)=\frac{\theta_\infty+\pi+\arctan y_\infty-\varphi(\epsilon)}{2\pi}\in\mathbb Z.
$$

At every positive-speed parameter, the transverse-tail lemma proves continuity of $\theta_\infty,y_\infty,e_\infty$, hence local constancy of $N$. On the other hand $\theta_\infty\asymp\epsilon^{-2}$ while $\arctan y_\infty$ and $\varphi$ stay bounded, so $N(\epsilon)\to+\infty$ as $\epsilon\downarrow0$. If all sufficiently small parameters had positive terminal speed, connectedness of their interval would force this integer to be constant, a contradiction. Thus the memory family also has zero-terminal-speed parameters arbitrarily close to zero.

## What is and is not selected

For each law, the argument proves existence of an accumulating zero-speed sequence in its **same** explicit compatible family. It does not locate any member of that sequence, show that zeros are isolated, prove a positive-speed parameter exists, or give the density or ordering of the two alternatives. It supplies no positive terminal-speed lower bound for a prescribed finite launch. The global solutions, full root coverage, speed margin and finite total angle are inherited unchanged. At the zero-speed parameters the previously admitted physical-time reconstructions give $r\asymp T^{4/5}$ or $r\asymp T^{2/3}$ respectively; no new event or continuation rule at infinity is imposed.

The current result is a derived mathematical candidate for independent review. Its most specific falsifiers are: failure of compact-time parameter dependence for the explicit complete histories; a positive terminal branch that lacks the proved uniform transverse strip; a radial $\mathcal W$ zero despite the nonzero seed and scalar gap; an error term near radial $z=0$ larger than $C\delta z^2$; loss of the memory cubic weights on the large-radius chart; or accumulation of an order-$\epsilon$ error that destroys the fixed global seed orientation. A counterexample showing strictly positive terminal speeds for every sufficiently small member would directly refute one of these steps. Parameter winding without these continuity, nonvanishing and uniformity estimates would only be a heuristic; those estimates are explicit here.

## Frozen dependencies, validation and ownership

Source identities were measured with `shasum -a 256` before this source was written:

| Dependency | SHA-256 |
| --- | --- |
| [Radial transition](alternatives-screen-2026-10-05-radial-rotating-transition.md) | `6e8b6ea6fe9659d71a3ce5bc312ed8d8cce70bff8cd5dd805fedd864ce4b4488` |
| [Radial global theorem](alternatives-screen-2026-10-05-radial-global-dispersal.md) | `41120b7ca5d34d33c2ce17c3a0ab9ea6ad298730cda0f2083397d41733057404` |
| [Radial global adjudication](../../analysis/alternatives-screen-2026-10-05-global-adjudication.md) | `1032c3f189f50f9c1f55c3776644503abf2a8fc77be5378a65cd2adeff3bb026` |
| [Memory transition](alternatives-screen-2026-10-05-memory-slow-transition.md) | `ae31d20710478746566688d25d8e2d1e86e21d3af10789bf06e6f3156fadee22` |
| [Memory global theorem](alternatives-screen-2026-10-05-memory-global-dispersal.md) | `b8066d75120561fe0ded282d6ccc34a9f525d7e526dd1073696b0f13d2936a71` |
| [Memory adjudication](../../analysis/alternatives-screen-2026-10-05-memory-adjudication.md) | `a21180e917b6eb7034abbcc951067997f60085a7e6a86c3293e4b6b13f90ee16` |

The complete preparations were also read in their live formulation sources. Validation is analytical: the radial zero-$\delta$ phase numerator and the memory polynomial/corrector cancellation are the displayed controls. No numerical target, new model coefficient, solver, background process, Git publication or shared-source edit is used. Only this new investigation source is authored; independent assessment precedes any shared promotion.

Textual validation: `git diff --no-index --check /dev/null` on this new source emitted no whitespace diagnostics; exit status 1 denotes its new-file difference. This check is formatting evidence only and does not replace the requested fresh mathematical review.
