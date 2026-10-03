# Independent adjudication of the finite slow-binary secular comparison

The [controlled secular theorem](slow-binary-controlled-secular-comparison.md) is accepted for its stated complete supplied histories and $0<\epsilon\le10^{-9}$. The true delayed mirror pair remains regular through a finite interval of order inverse squared initial speed. Its geometric slow radius increases at a rate whose square is close to $K/c_f$, while the actual member radius stays close to that slow radius. This is a controlled finite outward-drift result; infinite-future escape remains unproved.

**Claim grade: derived, conditional on the unchanged inverse-square Master Equation and the preparation bounds restated below.** This independent review reconstructs the dimensionless delayed row, bounds its local defect, differentiates the eccentricity coordinates by their radial and transverse components, and closes the continuation tube. It does not use a replay of any numerical trajectory. The [local kernel adjudication](slow-binary-independent-adjudication-2026-10-03.md) and [original local subject](slow-binary-first-order-drift.md) are read-only references for this assignment; neither their authorship nor their agreement constitutes this theorem's independent proof.

## Preparation and accepted statement

Let $K=\kappa|q_+q_-|>0$, choose an initial member-radius scale $R_0$, and define $v_0^2=K/(4R_0)$. Set $c_f=1$ in the proof, $\epsilon=v_0/c_f$, $s=v_0T/R_0$ and $Y(s)=X_+(T)/R_0$. The complete supplied histories are planar and mirror opposite-polarity histories $X_-=-X_+$. Their positions and velocities are continuous, with velocities given by differentiation of the paths, and their member speeds are at most $2v_0$ throughout the complete past.

On the recent interval $[-7\epsilon,0]$, require $Y\in W^{2,\infty}$, which means its velocity is Lipschitz with bounded almost-everywhere acceleration. Require $3/4\le|Y|\le5/4$, $|Y'|\le2$ and $|Y''|\le8$. The same position and velocity traces are used at release; its acceleration can change by a bounded amount to the equation-prescribed right value. Define

$$
r=|Y|,\quad n=Y/r,\quad t=\hat z\times n,\quad
h=(Y\times Y')\cdot\hat z,
\quad e=Y'\times(h\hat z)-n,
$$

where $\hat z$ is the fixed plane normal. At release require $h>0$, $|h-1|\le\epsilon$ and $|e|\le\epsilon$. The eccentricity vector $e$ is an algebraic coordinate for departure from a central comparison circle; it assumes no physical mass, energy account or external conservation law. A supplied complete circular history is an allowed preparation and is not asserted to solve the delayed equation before release.

The accepted continuation interval is

$$
0\le T\le T_*:=\frac{R_0c_f}{4v_0^2}.
$$

For $\mathcal R(T)=R_0h(s)^2$, the accepted estimates are

$$
\left|\frac{d\mathcal R^2}{dT}-\frac K{c_f}\right|
\le4\times10^6\epsilon\frac K{c_f},
\qquad
\left|\frac{|X_+(T)|}{\mathcal R(T)}-1\right|
\le1.8\times10^6\epsilon.
$$

The derivative estimate holds almost everywhere and therefore integrates to the subject's stated uniform estimate. Every distinct-source root is ordinary, there is exactly one partner root per member, and no positive-delay self root occurs. The statement is limited to this finite interval and these preparations.

## Root geometry and the ordinary continuation map

Use the temporary future tube $1/2\le r\le3$, $1/2\le h\le2$, $|Y'|\le2$. Combined with the complete past speed bound, this gives a global subfield speed bound $2\epsilon<1$. The same-label chord is strictly shorter than the wake radius for every positive delay, so no ordinary self root exists. No self channel is deleted.

The partner delay $u=s-\sigma$ satisfies

$$
u=\epsilon|Y(s)+Y(s-u)|.
$$

Its residual is negative at zero delay and has derivative at least $1-2\epsilon$ with respect to $u$. The global past speed bound also makes it tend to positive infinity. It has exactly one root. Comparing its delayed displacement with $2Y(s)$ gives

$$
\frac{2\epsilon r}{1+2\epsilon}\le u\le
\frac{2\epsilon r}{1-2\epsilon}.
$$

For $\epsilon\le1/32$, the temporary tube implies $\epsilon/2<u<7\epsilon$. Both normalized source and receiver root factors are at least $1-2\epsilon$. Therefore all sampled source points lie in the declared recent supplied history or in the already constructed future; the uncontrolled remote past supplies root existence but is not sampled by these actual roots.

Choose a method-of-steps interval shorter than $\epsilon/4$. Every source point on that interval predates its beginning. Root subtraction and the positive transmitter slope make the root locally Lipschitz in the current receiver position. Retained source velocity is Lipschitz, and range has a positive floor, so the row is a locally Lipschitz current-position acceleration with continuous time dependence. The ordinary position–velocity integral map is a contraction on a sufficiently short closed ball. This proves local existence and uniqueness without using a cap response. The same argument applies to the full two-member system; inversion and reflection then preserve the supplied mirror relation and plane by uniqueness.

The constants in the tube bound the range, slopes, root-window acceleration and row Lipschitz constants uniformly for fixed positive $\epsilon$. Thus the steps cannot accumulate at a finite time while the solution remains strictly inside that tube. It suffices to prove that no tube exit occurs before $s=1/(4\epsilon)$. Position and velocity are continuous across release and method-of-steps seams; a bounded acceleration step at release does not defeat the Lipschitz-history estimates.

## Independent local defect estimate

The exact scaled partner row is

$$
Y''=-\frac{4n_d}{R_d^2[1+\epsilon n_d\cdot Y'(\sigma)]},
\qquad R_d=|Y(s)+Y(\sigma)|,
\quad n_d=(Y(s)+Y(\sigma))/R_d.
$$

The root bounds imply

$$
|Y''|\le\frac{(1+2\epsilon)^2}{r^2(1-2\epsilon)}<5
$$

on the temporary tube for $\epsilon\le1/32$. Together with the supplied bound $8$, this establishes a root-window acceleration bound $8$ on the actual delayed trajectory, including intervals crossing release. The acceleration term in a velocity expansion is therefore controlled rather than assumed small independently of the solution.

For completeness, the local row estimate can be reconstructed directly. At one dimensional reception, let present separation be $d_0n$ with $d_0>0$, let $a$ be the source speed bound divided by $c_f$, and let $\eta=A_*d_0/c_f^2$. Put $p=[X_j(T)-X_j(S)]/d_0$, $w=V_j(S)/c_f$ and $w_0=V_j(T)/c_f$. Source-velocity integration and the delay bounds give

$$
|p|\le\frac a{1-a},\quad
|p-w_0|\le\frac{a^2}{1-a}+\frac{\eta}{2(1-a)^2},
\quad |w-w_0|\le\frac{\eta}{1-a}.
$$

The dimensionless row is $G(p,w)=(n+p)/[|n+p|^3(1-n(p)\cdot w)]$. Its differential at zero is $(I-3nn^{\mathsf T})p+n(n\cdot w)$. Combining equal present-velocity arguments gives $n+w_0-2(n\cdot w_0)n$.

An independent conservative Hessian estimate verifies the retained constant. For $a\le1/8$, along the line segment in the joint norm $|p|+|w|$, put $H(z)=z/|z|^3$ and $b=1-n(z)\cdot w$. One has $|z|\ge6/7$, $b\ge7/8$, and

$$
\|H\|\le(7/6)^2,\quad \|DH\|\le2(7/6)^3,
\quad\|D^2H\|\le24(7/6)^4,
\quad\|Db\|\le1,\quad\|D^2b\|\le3.
$$

The product rule for $G=H/b$ therefore gives

$$
\|D^2G\|
\le\frac{9604}{189}+\frac{224}{27}
+\frac{256}{63}+\frac{16}{3}<70.
$$

Taylor's remainder is at most $35(15a/7)^2$. Replacing $p,w$ by $w_0$ in the differential adds at most $2|p-w_0|+|w-w_0|$. Their sum is bounded by $163a^2+(120/49)\eta$, hence by $256(a^2+\eta)$. This reconstructs the acceleration-dependent estimate without invoking the prior author's acceptance as proof.

For the mirror pair, the source present velocity is the negative of the receiver velocity. Here $a=2\epsilon$, $A_*\le8v_0^2/R_0$ and $d_0=2R_0r$, so $\eta\le16r\epsilon^2\le48\epsilon^2$. Acceleration rescaling therefore gives

$$
Y''=-\frac n{r^2}
+\frac\epsilon{r^2}(Y'-2v_rn)+Q,
\qquad |Q|\le C_0\epsilon^2,
\qquad C_0=53248,
$$

where $v_r=Y'\cdot n$. Indeed, $256r^{-2}(4+48)\le53248$ on the tube. This local estimate is applied afresh to actual retained history at each reception and assumes no fixed-circle phase accuracy over the secular interval.

## Independent differentiation of the corrected eccentricity

Let $v_t=Y'\cdot t=h/r$. The eccentricity components are

$$
e_n=e\cdot n=hv_t-1=h^2/r-1,
\qquad e_t=e\cdot t=-hv_r.
$$

For a perturbing acceleration $F=F_rn+F_tt$ added to $-n/r^2$, polar differentiation gives

$$
h'=rF_t,\quad
v_r'=v_t^2/r-1/r^2+F_r,\quad
n'=\frac h{r^2}t,\quad t'=-\frac h{r^2}n.
$$

Differentiate $e_n n+e_t t$, including basis rotation. The central terms cancel and the remaining components are

$$
e'=2hF_t n+(-rF_tv_r-hF_r)t.
$$

For $F_r=-\epsilon v_r/r^2$ and $F_t=\epsilon h/r^3$, the transverse term is zero exactly. The defect contributes $q_e$, with $|q_e|\le(h+r|Y'|)|Q|\le8C_0\epsilon^2$. Thus

$$
h'=\frac{\epsilon h}{r^2}+\delta_h,
\quad |\delta_h|\le3C_0\epsilon^2,
\qquad
e'=\frac{2\epsilon h^2}{r^3}n+q_e.
$$

This verifies the load-bearing oscillatory cancellation by a different component calculation. Define $b=e+(2\epsilon/h)t$. Direct differentiation gives

$$
b'=\frac{2\epsilon}{r^2}(b\cdot n)n
-\frac{2\epsilon h'}{h^2}t+q_e.
$$

The identity follows because $t'=-(h/r^2)n$ and $h^2/r-1=e_n=b_n$. The temporary tube gives $|h'|\le8\epsilon+3C_0\epsilon^2$, hence

$$
|b'|\le8\epsilon|b|+C_1\epsilon^2,
\qquad C_1=64+9C_0=479296.
$$

The term $24C_0\epsilon^3$ is absorbed using $\epsilon\le1/32$; together with $8C_0\epsilon^2$ it is below $9C_0\epsilon^2$. Also $|b(0)|\le5\epsilon$. Multiplying the differential inequality by $\exp(-8\epsilon s)$ and integrating yields $|b(s)|\le\exp(2)(5+C_1/4)\epsilon$ through $s\le1/(4\epsilon)$. Since $\exp(2)<15/2$,

$$
|e(s)|\le\left[\frac{15}{2}(119829)+4\right]\epsilon
<900000\epsilon=:C_e\epsilon.
$$

The estimate $\exp(2)<15/2$ follows, for example, by summing its exponential series through order seven and bounding the remaining terms by a geometric series with ratio $2/9$. The large but explicit $C_e$ is sufficient for the stated parameter regime.

## Radius law, closed tube and dimensional scaling

The algebraic identity $r=h^2/(1+e_n)$ and the angular equation give

$$
(h^4)'=4\epsilon(1+e_n)^2+4h^3\delta_h.
$$

For $|e|\le1$, its deviation from $4\epsilon$ is at most

$$
(12C_e+96C_0)\epsilon^2
=15911808\epsilon^2<16000000\epsilon^2=:C_2\epsilon^2.
$$

At $\epsilon\le10^{-9}$, $|e|\le0.0009$. The integrated radius defect is at most $C_2\epsilon/4\le0.004$ by the terminal time. Since $(1-\epsilon)^4\le h(0)^4\le(1+\epsilon)^4$, the resulting bounds are $0.995<h^4<2.005$, hence $0.99<h<1.20$. They give $0.9<r<1.5$ and

$$
|Y'|\le|v_r|+|v_t|
\le\frac{1+2|e|}{h}<1.1.
$$

Each value lies strictly inside its temporary tube boundary. The history coverage, source acceleration bound, positive root factors and positive delay floor consequently persist. A first exit before the terminal time contradicts these strict improvements, and the local step construction therefore continues uniquely through the whole interval.

Restore symbolic $c_f$ only to express physical dimensions. Since $\mathcal R^2=R_0^2h^4$, $ds/dT=v_0/R_0$, and $4\epsilon R_0v_0=K/c_f$, the deviation of $(h^4)'$ rescales to $(C_2/4)\epsilon K/c_f=4\times10^6\epsilon K/c_f$. Also $|r/h^2-1|\le|e|/(1-|e|)\le2C_e\epsilon$. These are exactly the theorem's two dimensional estimates. The stated interval corresponds to $s\le1/(4\epsilon)$.

For the circular supplied preparation, $h(0)=1$. At $T_*$, $KT_*/c_f=R_0^2$, so $\mathcal R(T_*)^2$ differs from $2R_0^2$ by at most $0.004R_0^2$ in the full allowed parameter range. The actual radius is within $0.0018$ relative error of it. Since $1.996(0.9982)^2>1.96$, these bounds imply $|X_+(T_*)|>1.4R_0$, a finite appreciable expansion, while all motion remains subfield. The conclusion follows from the displayed inequalities, not a numerical trajectory.

## Verdict and limits

The complete finite theorem is accepted, including its coarse constants, root census, retained-history coverage and physical rescaling. The positive slow-radius derivative is a geometric statement; it does not require the actual radial velocity to be positive at every instant. A small higher-order radial dip is compatible with increasing $\mathcal R$ and the stated radius error.

**Claim grade: derived.** Falsifiers are a preparation satisfying the complete bounds for which the method-of-steps root leaves its covered history window, the local defect exceeds its bound, independent differentiation produces a different corrected-eccentricity term, a tube exit occurs before the stated endpoint, or the dimensional slow-radius inequalities fail. A test outside $\epsilon\le10^{-9}$ is not a counterexample to this theorem. A trajectory replay is unnecessary for these analytical assertions and would not replace their proof.

The theorem does not establish a solution of the unchanged equation before release, a general non-mirror binary, uniform orbital phase accuracy, infinite-future escape, BP-001's frozen campaign fate, the historical run's tiny radial sign change or a total physical-energy account. Iterating the finite interval requires verifying renewed preparation, changing-scale delay coverage and eccentricity hypotheses; it is a separate theorem. The historical speed ratio is outside the conservative admissible range and receives no trajectory certification from this proof.

The only durable edit in this assignment is this independent report. Before drafting, the subject and two existing local references were inventoried by `shasum -a 256` in `.tmp/logarithmic-collective-adjudication/binary-frozen.sha256`. The post-edit digest check matches the secular subject and original local subject. The local adjudication companion changed concurrently from `e4d7293fb7fc8e3afd77ae4bde752759059cac75c0736b0dbb6ec3796a903493` to `8b13123929981427af6d08258e2944d6ed2162c21ae64a0525ed3a130a11e334`; this report records the measured exception without attributing it. No edit to that companion was made by this assignment, and the independent row reconstruction above does not rely on its acceptance. Markdown/KaTeX validation checks document syntax only; the separate analytic constructions above supply the mathematical adjudication. No numerical target, subject, reference, instrument, shared queue, corpus or equation assumption was changed by this assignment.
