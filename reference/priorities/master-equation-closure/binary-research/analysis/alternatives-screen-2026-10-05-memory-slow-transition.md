# Exact-memory slow expansion and a fixed-amplitude transition

## Result and unchanged specification

The [frozen compatible memory preparation](alternatives-screen-2026-10-05-memory-formulation.md) admits controlled expansion on every fixed secular interval and, for each sufficiently small fixed launch speed, reaches a fixed nonzero geometric eccentricity in finite time. The memory remains exact throughout the argument. Its contribution is bounded through its integral equation, including the supplied-history initial layer, rather than replaced by a local acceleration term.

**Grade:** derived in this subject, awaiting independent assessment. The law is the fixed canonical-plus-uniform-memory row, with $K=c_f=\lambda=\tau=1$, all ordinary self/partner roots retained, and the complete mirror-planar circle-tail patch already specified. In its notation $r_0=(6\epsilon^2)^{-1}$, $s=\epsilon T/r_0$, $\mu=6\epsilon^3$, $Y=q/r_0$, and

$$
A+K_\mu A=\frac32F[Y],\qquad
A=Y'',\quad F=-\frac{4N}{R_d^2D},\quad
(K_\mu f)(s)=\int_0^1(1-\theta)f(s-\mu\theta)\,d\theta.
$$

No numerical smallness threshold is certified. The canonical signed-row proof supplies algebraic control formulas only; its law-specific continuation theorem and numerical thresholds are not used as fate premises.

For each fixed $L>0$, sufficiently small family members satisfy

$$
\frac{|q(T)|}{r_0}=\sqrt{1+4\tau}+O_L(\epsilon),\qquad
\tau=\frac{\epsilon^2T}{r_0}\in[0,L].
$$

The stronger fixed-launch result uses the algebraic eccentricity vector

$$
h=Y\times Y',\qquad e=Y'\times(h\hat z)-n,\qquad n=Y/|Y|.
$$

For some fixed $e_*>0$ and $\epsilon_*>0$, every $0<\epsilon\le\epsilon_*$ reaches a first $|e|=e_*$ event, while separated and uniformly subfield. At that event

$$
h\asymp\epsilon^{-1},\qquad
r=|Y|\asymp\epsilon^{-2},\qquad
|q'|\asymp\epsilon^2,\qquad T\asymp\epsilon^{-8}.
$$

The constants in $\asymp$ are positive and independent of $\epsilon$, but may depend on the fixed threshold $e_*$. This is a regular geometric transition, not a stability spectrum about a delayed circle or a singular event. All-future continuation is addressed separately.

## Exact weighted memory estimates

Use radial velocity $u=Y'\cdot n$, transverse velocity $v=Y'\cdot t=h/r$, and provisionally work in

$$
h\ge\frac12,\qquad r\ge c h^2,\qquad |u|\le C/h,
$$

with fixed positive $c,C$. These bounds imply $|Y'|\le C_1/h\le2C_1$ and permit arbitrarily large radius. They hold for the supplied past when constants are enlarged once. Choose $\epsilon$ sufficiently small that the complete physical speed bound is below $1/2$. The complete root argument gives one partner root, no positive-delay self root and a fixed positive root-factor margin. The actual source delay is comparable to $\epsilon r$; it is not held fixed during continuation.

The acceleration equation itself gives $|A|\le C_2/r^2$. To close this bound, multiply the integral equation by current $r^2$. Across the much shorter memory interval of length $\mu$, the velocity bounds and positive radius floor give $r(s)/r(s-\mu\theta)=1+O(\mu)$. Thus the weighted memory kernel has norm below a fixed $q<1$, for example $q=3/4$ after decreasing the smallness threshold. The canonical forcing is bounded by $C/r^2$ from its complete root factors, and the supplied acceleration has the same bound. Taking a running supremum proves the acceleration bound with a finite constant depending only on the provisional domain and preparation. This argument uses the exact kernel norm $1/2$ and does not require a derivative of acceleration.

On a whole causal source interval, radii are comparable by the complete speed chord bound. Integrating $|h'|=|Y\times A|\le C/r$ over its length $O(\epsilon r)$ gives

$$
|h(q)-h(s)|\le C\epsilon,\qquad h(q)/h(s)=1+O(\epsilon/h).
$$

Monotonic torque has not been assumed. The supplied patch obeys the same absolute bound, so the estimate also covers the original seam. The source velocity is consequently $O(1/h)$, and its transverse component in the receiving axes is $O(h/r)$. Put $\delta=\epsilon/h$. Angular change over a causal interval is $O(\epsilon h/r)$, because $h(q)\asymp h$ and $r(q)\asymp r$.

The canonical forcing is differentiable wherever needed, or satisfies the equivalent integrated Lipschitz estimates at seams. Differentiating the implicit root gives

$$
\sigma'(s)=\frac{1-\epsilon N\cdot Y'(s)}{1+\epsilon N\cdot Y'(\sigma)}.
$$

It stays bounded. In fixed receiving axes, the numerator chord's transverse derivative is $O(h/r)$, hence $N'_t=O(h/r^2)$. Since $N$ has unit norm and $N_t=O(\epsilon h/r)$, its full derivative is also $O(h/r^2)$. The denominator derivative is $O(\epsilon/r^2)$, using the actual source acceleration bound. Differentiation of $F=-4N/(R_d^2D)$ then gives

$$
|F'|\le\frac C{hr^3},\qquad |F'_t|\le\frac{Ch}{r^4}.
$$

The second bound retains a transverse factor and is stronger than projecting the first norm bound. Rotating its axes across a memory interval adds a smaller term, since that interval's angle is $O(\mu h/r^2)$.

Set $E=A-F$. The exact identity is

$$
E+K_\mu E=R,\qquad
R=\frac12F-K_\mu F
=\int_0^1(1-\theta)[F(s)-F(s-\mu\theta)]\,d\theta.
$$

The preceding derivative bounds give $|R|\le C\mu/(hr^3)$ and $|R_t|\le C\mu h/r^4$. To retain changing-scale decay, use weights $h^3r^2$ for the norm and $r^4/h$ for the transverse component. Their ratios across one memory interval are $1+O(\mu)$, because $|h'/h|+|r'/r|\le C/(hr)$ and the provisional domain has fixed positive lower bounds. The weighted kernels again have norm below a fixed $q<1$.

For the norm, the weighted forcing is at most $C\mu h^2/r\le C\mu$. A positive Volterra comparison makes the transient estimate explicit. Choose a fixed $\kappa>0$ small enough that the weighted kernel satisfies $\int_0^1(1-\theta)[1+O(\mu)]e^{\kappa\theta}\,d\theta<1$. Then $C_3\mu+C_4\epsilon e^{-\kappa s/\mu}$ is a supersolution for the weighted absolute-value inequality, with constants covering the supplied past. The integral has no atom at zero, so the usual first-contact argument, or its strict supersolution limit, proves the bound. This avoids an invalid recurrence that would put the whole current interval on both sides of a supremum inequality. For the transverse component, project the exact convolution in the current axes. Its radial-to-transverse coupling is at most $|E_r(s-\mu\theta)|\,C\mu h/r^2$. The already obtained norm estimate bounds this contribution after multiplication by $r^4/h$ by $C\mu[\mu+\epsilon e^{-\kappa s/\mu}]/h^3$, hence by $C\mu$. The complete supplied weighted defect is $O(\epsilon)$ in both cases. Applying the same comparison and writing $q=e^{-\kappa}\in(0,1)$ gives

$$
\begin{aligned}
|E(s)|&\le\frac{C\mu+C\epsilon q^{\lfloor s/\mu\rfloor}}{h^3r^2},\\
|E_t(s)|&\le\frac h{r^4}\left[C\mu+C\epsilon q^{\lfloor s/\mu\rfloor}\right].
\end{aligned}
$$

Only a fixed enlargement of $C$ or $q$ is needed to include the first interval. These estimates include the exact finite memory and its initial transient. After $s_*=10\epsilon$, the exponential term is smaller than $C\epsilon^3$ for sufficiently small $\epsilon$, because $\mu=6\epsilon^3$. Thus

$$
|A-F|\le\frac{C\epsilon^3}{h^3r^2},\qquad
|(A-F)_t|\le\frac{C\epsilon^3h}{r^4},\qquad s\ge s_*.
$$

The proof continues to apply on an elongated excursion: it requires a lower radius bound in terms of $h^2$, not an upper radius bound.

## Release layer and sign of rotation

On $0\le s\le s_*$, the exact compact memory bound and the ordinary root bound construct a solution with $r=1+O(\epsilon)$ and bounded scaled velocity. The canonical tangential row is $O(\epsilon)$ there. The transient memory impulse is $O(\epsilon\mu)=O(\epsilon^4)$, so direct integration improves the areal-rate change to $h=1+O(\epsilon^2)$ and gives $e=O(\epsilon^2)$. The radial and transverse coordinates are continuous, and the supplied positive areal rate therefore persists across this layer.

After it, exact canonical chord geometry under positive $h$ gives

$$
F_t=\frac{\epsilon h}{r^3}[1+O(\delta)].
$$

The preceding transverse memory defect is smaller relative to this term by $C\mu/(\epsilon r)\le C\delta^2$, since $r\ge ch^2$. Consequently $A_t>0$ and $h'>0$ on the provisional domain for sufficiently small $\epsilon$. This proves the sign needed for continuation. It is not a transfer of the pure-radial equation's exact torque theorem to a memory acceleration.

## Signed row retained through second order

The canonical forcing must be expanded using the actual memory-driven source acceleration. The weighted bound gives $A=-n/r^2+O(\delta/r^2)$ throughout every evolved causal window after the layer. Windows reaching the original short layer or supplied patch satisfy the same leading bound, since their scales remain near one and their acceleration mismatch is $O(\epsilon)$. Thus integral Taylor formulas give the actual implicit-root expansion

$$
\begin{aligned}
L&=1-\epsilon u+\epsilon^2(u^2-r^{-1}+v^2/2)+O(\delta^3),\qquad L=R_d/(2r),\\
D&=1+\epsilon u+\epsilon^2(2r^{-1}-v^2)+O(\delta^3),\\
N_t&=-\epsilon v+O(\epsilon v\delta^2),\qquad
N_r=1-\epsilon^2v^2/2+O(\delta^3).
\end{aligned}
$$

The transverse remainder follows by integrating the fixed-axis source transverse acceleration, which is $O(\epsilon v/r^2)$: canonical angle geometry supplies this factor, and the exact memory estimate preserves it. Substituting in the norm equation bounds its residual by $O(\delta^3)$ with a uniformly positive derivative, so $L$ is the actual root. Multiplication gives the algebraic cancellation $L^{-2}D^{-1}=1+\epsilon u+O(\delta^3)$.

Adding the exact memory defect yields the actual row

$$
\begin{aligned}
A_r&=-\frac{1+\epsilon u-\epsilon^2v^2/2}{r^2}+Q_r,
&|Q_r|&\le\frac{C\epsilon^3}{r^2h^3},\\
A_t&=\frac{\epsilon v+\epsilon^2uv}{r^2}+Q_t,
&|Q_t|&\le\frac{C\epsilon^3v}{r^2h^2}.
\end{aligned}
$$

For the last bound the memory contribution satisfies $\epsilon^3h/r^4\le C\epsilon^3v/(r^2h^2)$ because $h^2/r$ is bounded. These signed coefficients agree with the independent canonical algebraic control in [the wider-regime source](slow-binary-wider-regime.md#3-an-implicit-root-residual-and-the-signed-cubic-constants). Their validity here was proved through the exact memory filter; no canonical solution theorem has been assumed.

## Controlled finite secular expansion

On a fixed compact interval of circular scales put $a=h^2$ and $w=u-2\epsilon/a$. Define

$$
U(r,h)=\frac{h^2}{2r^2}-\frac1r,\qquad
\mathcal E=\frac12w^2+U(r,h)-U(a,h).
$$

The potential minimum is at $r=a$, with $U_{rr}(a,h)=a^{-3}>0$. The derivative's linear displacement terms cancel: their coefficient is $(2\epsilon/a)a^{-3}+(-2h/a^3)(\epsilon h/a^2)=0$. The exact memory estimates and the first-order row therefore give

$$
\frac d{ds}\sqrt{\mathcal E}
\le C\epsilon\sqrt{\mathcal E}+C\epsilon^2+C\epsilon q^{\lfloor s/\mu\rfloor}.
$$

The initial value is $\sqrt2\epsilon$, and the last term has integral $O(\epsilon\mu)$. A first-exit argument on each fixed interval $0\le\epsilon s\le L$ gives $|r-a|+|u|=O_L(\epsilon)$. In turn,

$$
(a^2)'=4\epsilon(a/r)^2+O_L(\epsilon^2)+O_L(\epsilon q^{\lfloor s/\mu\rfloor}),
$$

so $a^2=1+4\epsilon s+O_L(\epsilon)$ and the claimed actual radius formula follows. The same argument keeps root factors and physical speed uniformly away from their boundaries through the interval. It also yields

$$
|q'|=\epsilon(1+4\tau)^{-1/4}+O_L(\epsilon^2),\qquad
\epsilon[\theta(T)-\theta(0)]=(1+4\tau)^{1/4}-1+O_L(\epsilon).
$$

No pointwise monotonic-radius conclusion follows from these estimates.

## Preservation of a nonzero geometric seed

For the fixed-launch transition, work in $|e|\le e_*$, with $e_*$ fixed and small. The algebraic identities

$$
r=\frac{h^2}{1+e\cdot n},\qquad hu=-e\cdot t,\qquad hv=1+e\cdot n
$$

put this interval inside the weighted-filter domain. Let $\theta'=h/r^2$. Direct differentiation of the actual signed row gives

$$
h_\theta=\epsilon+\epsilon^2u+O(\epsilon^3/h^2),
$$

$$
e_\theta=\frac{2\epsilon}{h}(1+e_n)n
+\epsilon^2\{2uvn-(u^2+v^2/2)t\}+O(\epsilon^3/h^3).
$$

Here $e_n=e\cdot n$ and $e_t=e\cdot t$. In the derivative of $e/h$, the quadratic polynomial is $-e_t(2+e_n)n-(1+e_n)^2t/2$. Its constant term is $-t/2$. This fixes the second corrector below, rather than leaving a seed-sized unspecified forcing.

Define

$$
b=\frac eh+\frac{2\epsilon}{h^2}t+\frac{5\epsilon^2}{2h^3}n,\qquad
B(\theta)=\frac12\begin{pmatrix}\sin2\theta&-\cos2\theta\\-\cos2\theta&-\sin2\theta\end{pmatrix},\qquad
Z=(I-\epsilon B/h)b.
$$

The identities $B_\theta=2nn^{\mathsf T}-I$, $n_\theta=t$ and $t_\theta=-n$ show the cancellations directly: the first corrector removes the rotating order-$\epsilon$ drive; its derivative and the polynomial constant combine to $-5\epsilon^2t/(2h^3)$; the second corrector removes that term; the matrix removes the remaining zero-mean order-$\epsilon/h$ coefficient. The residual satisfies

$$
|Z_\theta|\le C\frac{\epsilon^2}{h^2}|Z|+C\frac{\epsilon^3}{h^4}.
$$

At $s_*$ the release-layer bounds give $Z=2\epsilon t(0)+O(\epsilon^2)$. Meanwhile $h_\theta$ lies between $\epsilon/2$ and $2\epsilon$ for sufficiently small $\epsilon$. The integrated coefficient and forcing are respectively $O(\epsilon)$ and $O(\epsilon^2)$ even if $h$ grows without bound. Therefore

$$
Z(\theta)=2\epsilon t(0)+O(\epsilon^2)
$$

uniformly up to the first $|e|=e_*$ event. The nonzero initial geometric component survives the exact-memory remainder.

## The transition must occur

While $|e|\le e_*$, the identities give $r\asymp h^2$, $|Y'|\asymp1/h$ and $(h^4)'\asymp\epsilon$. The weighted filter and root bounds exclude any finite ordinary-domain termination. If the eccentricity boundary never occurred, $h$ would tend to infinity. The two explicit correctors and matrix correction would then vanish relative to $Z$, giving $|e|/h\asymp\epsilon$ and hence unbounded $|e|$, a contradiction.

Thus the first fixed boundary occurs at finite time. At it the same two-sided estimates give $h\asymp\epsilon^{-1}$, $r\asymp\epsilon^{-2}$ and physical speed $\asymp\epsilon^2$. Integrating $(h^4)'\asymp\epsilon$ gives $s\asymp\epsilon^{-5}$; with $T=r_0s/\epsilon$ this is $T\asymp\epsilon^{-8}$. The history remains separated and ordinary, with local continuation beyond the boundary. This supplies an actual finite-eccentricity entry for a separate global argument.

## Scope, falsifiers and ownership

The memory law's negative coefficient was not used as a physical damping claim. The load-bearing mechanism is the exact norm-$1/2$ filter, its weighted radial and transverse estimates, the independently reconstructed signed row and the surviving geometric seed. The proof's falsifiers are a violated weighted convolution estimate on a declared causal history; loss of the transverse factor in $F'_t$ or the memory defect; a missing signed polar term; or cancellation of the seed despite its uniform error bound. The finite secular theorem alone does not imply this fixed-launch transition, and the transition alone does not imply escape.

Only this new source is authored here. The formulation, earlier radial subjects and all references remain unchanged. No numerical instrument, target trajectory, production solver or regular test was run or added, and no owned process is active. Independent assessment is pending before scientific integration; all thresholds here are existential.
