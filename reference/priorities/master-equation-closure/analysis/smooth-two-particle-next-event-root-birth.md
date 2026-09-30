# A transverse arrival at wake speed and the first own-history root

## Scope

This conditional result identifies one event that could end the regular continuation being investigated in the two-target lattice experiment. It does not establish that the supplied lattice history reaches the event. The [accepted continuation](../lattice-research/analysis/smooth-two-particle-beyond-class-boundary-independent-adjudication.md) reaches $81/16$; later event candidates require their own trajectory and error certificates. All speeds below use $c_f=1$, and the acceleration coefficient of an own-history row is $g>0$.

The relevant condition is stronger than speed merely equaling one. The speed must arrive at one while increasing at a strictly positive rate. Under that condition, a hypothetical smooth continuation would immediately receive a wake emitted from its own recent past. The delay and the transmitter denominator both approach zero, making this acceleration contribution unbounded. The derivation applies to curved paths in three dimensions and assumes no collinear reduction.

## 1. Conditional obstruction theorem

**Claim grade: derived, conditional.** Let $X(t)$ be a $C^3$ path up to a candidate endpoint $t_*$, with a stationary sufficiently distant past. Assume

$$
|X'(s)|<1\quad(s<t_*),\qquad v_*=X'(t_*),\qquad |v_*|=1,
\qquad \alpha=v_*\cdot X''(t_*)>0.
\tag{1}
$$

Suppose also that the sum of all contributions from other identities remains bounded near the endpoint for a hypothetical $C^3$ extension. A finite changed population, a regular stationary background, positive cross ranges and transmitter denominators bounded away from zero are sufficient for this last condition. It must be checked for the particular evolution; it is not supplied by (1).

There is no $C^3$ extension of this path across $t_*$ satisfying the unchanged Master Equation with all positive own-history roots included and this bounded cross contribution. The obstruction concerns classical smooth continuation under these hypotheses. It asserts neither a speed prohibition nor a result about arbitrary weak, nonsmooth or changed-law continuations.

At $t_*$ itself there is no positive own-history root. For any hypothetical smooth extension and sufficiently small $h=t-t_*>0$, exactly one positive own-history root occurs near zero delay. Its delay $\tau$, emission time $s$, line-of-action unit vector $n$ and transmitter denominator $D_t$ satisfy

$$
\begin{aligned}
\tau(h)&=2h+O(h^2),&s(h)&=t_*-h+O(h^2),\\
n(h)&=v_*+O(h^2),&D_t(h)&=\alpha h+O(h^2).
\end{aligned}
\tag{2}
$$

Consequently its acceleration contribution is

$$
A_{\rm self}(t_*+h)
=\frac{g\,n(h)}{\tau(h)^2|D_t(h)|}
=\frac{g\,v_*}{4\alpha h^3}+O(h^{-2}).
\tag{3}
$$

The component along $v_*$ is positive and nonintegrable at $h=0$. In particular it cannot equal a bounded continuous acceleration after adding the bounded cross contribution. This proves the stated smooth-continuation obstruction. Nonintegrability of this hypothetical smooth-path row is not a proof excluding every less regular continuation.

## 2. Derivation from the causal equation

Translate the endpoint to time zero for the calculation. For a candidate positive delay define the average chord velocity

$$
W(h,\tau)=\int_0^1X'(h-u\tau)\,du.
\tag{4}
$$

For $\tau>0$, the own-history causal equation $|X(h)-X(h-\tau)|=\tau$ is equivalent to $|W(h,\tau)|^2=1$. Formula (4) also defines the smooth extension of this equation to $\tau=0$, which is useful for locating a root born from the excluded diagonal. It does not add a diagonal contribution to the Master Equation.

Taylor expansion at $(h,\tau)=(0,0)$ gives

$$
\begin{aligned}
W(h,\tau)&=v_*+a_*\left(h-\frac\tau2\right)+O((|h|+|\tau|)^2),\\
|W(h,\tau)|^2-1&=2\alpha h-\alpha\tau+O((|h|+|\tau|)^2),
\end{aligned}
\tag{5}
$$

where $a_*=X''(0)$. The derivative of the second expression with respect to $\tau$ at the origin is $-\alpha\ne0$. The implicit function theorem therefore supplies one local root branch through the origin, with $\tau'(0)=2$. For $h>0$ it is a legal positive-delay root, whereas for $h<0$ its continuation has negative delay and is excluded. Substitution into the first line of (5) gives $n=W=v_*+O(h^2)$, because $|W|=1$ on the causal root. The source velocity is

$$
X'(h-\tau(h))=v_*-a_*h+O(h^2).
\tag{6}
$$

Taking the scalar product with $n$ proves $D_t=1-n\cdot X'(h-\tau)=\alpha h+O(h^2)$, and (3) follows directly from the canonical own-history acceleration row. The polarity product for the same persistent identity is positive.

## 3. Exclusion of additional roots and cancellation

At the endpoint, every positive-delay chord lies strictly inside the wake cone:

$$
|X(t_*)-X(t_*-\tau)|
\le\int_{t_*-\tau}^{t_*}|X'(u)|\,du<\tau.
\tag{7}
$$

The strict inequality holds for every $\tau>0$ despite equality of the endpoint speed, since all earlier speeds are strictly smaller than one. On any compact delay interval bounded away from zero, continuity makes this a uniform negative residual margin, which persists for sufficiently small positive $h$. A stationary sufficiently distant past excludes all sufficiently large delays uniformly. Every possible root near the endpoint must therefore lie in the small-delay neighborhood already covered by the implicit-function argument. This proves uniqueness of the positive root immediately after the endpoint for the hypothetical extension.

Thus no additional own-history row cancels (3), and the stipulated bounded cross contribution cannot cancel its divergent projection along $v_*$. Continuity of $X''$ in a $C^3$ extension supplies the contradiction. No assumption about mass, damping, magnetic acceleration or a relativistic speed ceiling enters the argument.

### First event across a finite disturbed population

For this lattice investigation, the bounded cross contribution can itself follow from verified geometric conditions. Suppose $t_*$ is the first speed-one event across the entire population, all relevant causal cross ranges have a uniform positive lower bound $r_0$, the finitely many disturbed sources have continuous velocity histories, and the unchanged stationary complement remains regular in the receiving neighborhood. Restrict a hypothetical extension to receptions before $t_*+r_0/2$. Every cross emission then precedes $t_*-r_0/2$. On the compact portion of these earlier histories containing nonstationary motion, strict subunit speed and finiteness give a common speed bound $w<1$. The stationary remote past also obeys this bound. Therefore every cross transmitter denominator is at least $1-w>0$, and each changed cross contribution is bounded by a constant depending on $r_0$ and $w$. There are finitely many such contributions, while the stationary complement is bounded by assumption.

This argument also permits several identities to reach speed one simultaneously: their current velocities are not the velocities sampled by their cross emissions. It supplies the bounded cross remainder needed by the theorem once the first-global-event, positive-range and stationary-field hypotheses have actually been certified. It does not infer these hypotheses from a target-only trace.

## 4. An exact curved-path control

For the explicit local comparison path

$$
X(t)=\left(t+\frac\alpha2t^2,\frac\beta2t^2,0\right),
\qquad \alpha>0,\quad\beta\ne0,
\tag{8}
$$

the path bends, but its chord between $-h$ and $h$ is exactly $(2h,0,0)$. Hence $\tau=2h$, $n=(1,0,0)$, $D_t=\alpha h$ and $A_{\rm self}=g(1,0,0)/(4\alpha h^3)$ exactly. This independently checkable local example verifies the coefficient and sign in (3). The polynomial is a control of the local calculation; its remote past is not the supplied lattice preparation, and it is not an EOM solution.

## 5. What the lattice event certificate must still establish

Applying this theorem requires an actual first speed-one event, its identity or a rigorously controlled finite set of possible identities, a strictly positive lower bound for $v\cdot a$ there, and bounded cross-history contributions. A target maximum could precede that event, so a proof deciding event order must also retain continuous signs for the selected targets. A numerical speed-one crossing, an auxiliary displacement ceiling, or a failed error enclosure supplies none of those conclusions by itself.

The result is falsified by an error in the local root expansion, an omitted older own-history root under the complete-past assumptions, or an applicable smooth unchanged-law continuation satisfying all the stated premises. Failure to prove the lattice premises leaves applicability open; it does not falsify the conditional theorem or establish an actual obstruction.
