# Planar Three-Binary Global Tail Calculus Reduction

Status: derived exact reduction; global theorem remains open

Claim grade: derived identities and sufficient-condition theorem route

## Decision

The infinite equal-radius regular-phase ladder is not closed by extending the finite interval census. Its remaining proof can be stated on one fixed fold-cell coordinate. Exact shifted-endpoint reindexing extracts the $3/2$ background term, proves that the newborn pair decreases throughout every post-T200 cell, and bounds that pair below $0.01$ at every right edge. The unresolved proof is now a uniform shape bound for the regularized old-root lattice followed by a quantitative endpoint derivative comparison. This packet states those remaining sufficient inequalities without claiming that they have been proved uniformly.

Plainly: every later topology cell now has the same mathematical coordinate system. The newborn sign and far-edge size are settled; the missing work is a genuine all-index bound on the older roots, not another finite run.

## Integer-level ledger

Let

$$
h=\frac{\pi}{6},
\qquad
F_\beta(v)=\beta\sin v-v,
\qquad
M(\beta)=\max_{0<v<\pi}F_\beta(v).
$$

For $\beta>1$, the maximizer is $\xi=\arccos(1/\beta)$ and

$$
M(\beta)
=
\sqrt{\beta^2-1}-\arccos\left(\frac1\beta\right),
\qquad
M'(\beta)=\frac{\sqrt{\beta^2-1}}{\beta}.
$$

The ordinary fold $q$ is the unique solution of $M(\beta_q)=qh$. In topology cell $\mathrm T_{q+1}$, the newest integer level is $q$, and the exact fixed cell coordinate is

$$
\varepsilon=M(\beta)-qh\in(0,h).
$$

Equivalently, $z=\varepsilon/h$ maps every later topology cell onto the same open interval $(0,1)$ without an asymptotic approximation.

Plainly: the topology index moves the fold location, while $z$ always measures the same fractional progress from one fold to the next.

## Exact pair-derivative lemma

Fix $\beta$ and a level coordinate $x\in(0,M(\beta))$. Let $u_\beta(x)<\xi<v_\beta(x)$ be the two roots of $F_\beta(v)=x$, and write

$$
J_-(x)=F_\beta'(u_\beta(x))>0,
\qquad
J_+(x)=-F_\beta'(v_\beta(x))>0.
$$

The polarity-free tangential contribution of this rising-descending pair is

$$
P_\beta(x)
=
\frac14
\left[
\frac{\cos u_\beta(x)}{\sin^2u_\beta(x)J_-(x)}
+
\frac{\cos v_\beta(x)}{\sin^2v_\beta(x)J_+(x)}
\right].
$$

Implicit differentiation gives $\partial_xu_\beta=1/J_-$ and $\partial_xv_\beta=-1/J_+$. Since $d(-\csc v)/dv=\cos v/\sin^2v$, the pair satisfies the exact identity

$$
P_\beta(x)
=
\frac14\frac{\partial}{\partial x}
\left[
\csc v_\beta(x)-\csc u_\beta(x)
\right].
$$

For the integer level $x=mh$, this is equivalently

$$
P_\beta(mh)
=
\frac{3}{2\pi}
\frac{d}{dm}
\left[
\csc v_\beta(mh)-\csc u_\beta(mh)
\right].
$$

The corresponding polarity-free radial pair has the exact logarithmic derivative form

$$
R_\beta(x)
=
\frac14\frac{\partial}{\partial x}
\left[
\log\tan\frac{u_\beta(x)}2
-
\log\tan\frac{v_\beta(x)}2
\right].
$$

The tangential pair is strictly positive. Indeed, the shared level equation gives

$$
\sin v_\beta(x)-\sin u_\beta(x)
=
\frac{v_\beta(x)-u_\beta(x)}{\beta}
>0.
$$

Using $\beta\cos u=J_-+1$ and $\beta\cos v=1-J_+$ rewrites the pair as

$$
P_\beta(x)
=
\frac{1}{4\beta}
\left[
\csc^2u-\csc^2v
+\frac{\csc^2u}{J_-}
+\frac{\csc^2v}{J_+}
\right]
>0.
$$

This proof remains valid after the descending root crosses $\pi/2$ because it uses the two-root relation and positive branch transversality rather than the sign of $\cos v$ alone.

Plainly: the paired ledger is not an arbitrary list of root terms. It samples derivatives of two explicit endpoint-gap functions, which is the structure needed for a uniform alternating-sum estimate and explains why logarithms can enter the radial correction.

## Old-background and newborn decomposition

Let $E(\beta)$ denote the six fixed descending contributions from levels $m=-5,-4,-3,-2,-1,0$. For $q\geq1$ and $\beta\in(\beta_q,\beta_{q+1})$, define the old-root background

$$
B_q(\beta)
=
E(\beta)
+
\sum_{m=1}^{q-1}(-1)^mP_\beta(mh),
$$

and the newest pair

$$
N_q(\beta)=(-1)^qP_\beta(qh).
$$

The complete tangential ledger in $\mathrm T_{q+1}$ is exactly

$$
S_{q+1}(\beta)=B_q(\beta)+N_q(\beta).
$$

No continuum approximation enters this decomposition. The earlier derived limit $B_q\to3/2$ becomes a quantitative alternating-sum problem for samples of the exact cosecant-gap derivative.

Plainly: all older roots form one finite alternating background, and the fold adds exactly one signed pair. Those two pieces are the only quantities the global sign proof must control.

## Shifted-endpoint lattice lemma

The six fixed descending levels complete an exact shifted lattice. Put $h=\pi/6$ as above. For $\sigma\in\{-1,+1\}$ and an admitted level $X>0$, let $\theta_{\sigma,\beta}(X)$ be the root on the increasing branch of

$$
\beta\sin\theta+\sigma\theta=X,
$$

and define

$$
A_{\sigma,\beta}(X)
=
\frac{\cos\theta_{\sigma,\beta}(X)}
{4\sin^2\theta_{\sigma,\beta}(X)
\left(\beta\cos\theta_{\sigma,\beta}(X)+\sigma\right)}.
$$

Implicit differentiation gives the exact derivative form

$$
A_{\sigma,\beta}(X)
=
-\frac14\frac{\partial}{\partial X}
\csc\theta_{\sigma,\beta}(X).
$$

The rising root at original level $m=k$ is $\theta_{-,\beta}(kh)$. For a descending root at original level $m=k-6$, write $y=\pi-v$. Since $6h=\pi$, its root equation becomes

$$
\beta\sin y+y=kh,
$$

so $y=\theta_{+,\beta}(kh)$. Its polarity-free tangential term is $-A_{+,\beta}(kh)$, while $(-1)^{k-6}=(-1)^k$. Therefore the complete old background has the exact shifted-endpoint representation

$$
B_q(\beta)
=
\sum_{k=1}^{q-1}(-1)^k
\left[A_{-,\beta}(kh)-A_{+,\beta}(kh)\right]
-
\sum_{k=q}^{q+5}(-1)^kA_{+,\beta}(kh).
$$

This identity absorbs all six formerly separate levels $m=-5,\ldots,0$; it introduces no omitted branch and no asymptotic replacement.

Plainly: the fixed descending terms are exactly the first six members of the same endpoint lattice as the later descending roots. After the index shift, the large rising and descending endpoint terms cancel pairwise before any estimate is made.

Define

$$
D_\beta(X)=A_{-,\beta}(X)-A_{+,\beta}(X),
\qquad
L(X)=-\frac{1}{2X^2},
\qquad
Q_\beta(X)=D_\beta(X)-L(X).
$$

For fixed $X$, the small-angle implicit expansions give

$$
\csc\theta_{\sigma,\beta}(X)
=
\frac{\beta+\sigma}{X}+O(\beta^{-1}),
$$

and hence $D_\beta(X)=L(X)+O(\beta^{-2})$. More importantly, the extracted leading lattice sums exactly:

$$
\sum_{k=1}^{\infty}(-1)^kL(kh)
=
\frac{1}{2h^2}\sum_{k=1}^{\infty}\frac{(-1)^{k+1}}{k^2}
=
\frac{1}{2h^2}\frac{\pi^2}{12}
=
\frac32.
$$

Thus the previously derived constant $3/2$ is the exact alternating endpoint-lattice term, and the complete finite-cell remainder is

$$
\begin{aligned}
B_q(\beta)-\frac32
={}&
\sum_{k=1}^{q-1}(-1)^kQ_\beta(kh)
-\sum_{k=q}^{q+5}(-1)^kA_{+,\beta}(kh)\\
&
-\sum_{k=q}^{\infty}(-1)^kL(kh).
\end{aligned}
$$

Plainly: the constant background no longer has to be recovered from a delicate cancellation of large raw root terms. It is removed exactly, leaving a small regularized lattice remainder, six endpoint terms, and an elementary alternating-square tail.

## Alternating-sequence reduction

For any finite nonnegative nondecreasing sequence $a_1,\ldots,a_n$, reversing the order and pairing adjacent terms proves

$$
\left|\sum_{k=1}^n(-1)^ka_k\right|\leq a_n.
$$

Consequently, if $Q_\beta(kh)$ is nonnegative and nondecreasing for $1\leq k\leq q-1$, then the exact remainder above obeys

$$
\left|B_q(\beta)-\frac32\right|
\leq
Q_\beta((q-1)h)
+\sum_{k=q}^{q+5}|A_{+,\beta}(kh)|
+\frac{1}{2q^2h^2}.
$$

The endpoint size in this conditional bound is already explicit. At $X=(q-1)h$, the minus-branch deficit lies in $(h,2h)$, so the fold estimates below give $|A_{-,\beta}(X)|<0.0043$. The plus-branch deficit lies in $(7h,8h)$, giving $|A_{+,\beta}(X)|<0.0035$. Since $X>99.5$, this proves

$$
0\leq Q_\beta((q-1)h)<0.008
$$

whenever the remaining nonnegativity claim holds. Each of the six terminal terms has deficit greater than $h$ and obeys $|A_{+,\beta}(kh)|<0.0091$, while the alternating-square tail is below $0.000051$. Therefore the remaining $Q_\beta$ shape lemma immediately implies

$$
\left|B_q(\beta)-\frac32\right|<0.064,
\qquad
B_q(\beta)>1.43.
$$

In particular, that one shape lemma supplies a background lower bound far above the already proved right-edge newborn bound $0.01$.

The same reindexing removes the $\beta$-independent leading term from the derivative. If $-\partial_\beta D_\beta(kh)$ and $\partial_\beta A_{+,\beta}(kh)$ are nonnegative and nondecreasing on their respective admitted integer ranges, then

$$
|\partial_\beta B_q(\beta)|
\leq
-\partial_\beta D_\beta((q-1)h)
+\partial_\beta A_{+,\beta}((q+5)h).
$$

The same-level newborn pair has the shifted-endpoint form

$$
P_\beta(qh)
=
A_{-,\beta}(qh)-A_{+,\beta}((q+6)h),
$$

and therefore

$$
-\partial_\beta P_\beta(qh)
=
-\partial_\beta A_{-,\beta}(qh)
+\partial_\beta A_{+,\beta}((q+6)h).
$$

Under the stated monotonicity hypotheses, newborn derivative dominance follows from the single endpoint inequality

$$
-\partial_\beta A_{-,\beta}(qh)
+\partial_\beta A_{+,\beta}((q+6)h)
>
-\partial_\beta D_\beta((q-1)h)
+\partial_\beta A_{+,\beta}((q+5)h).
$$

This is a sufficient reduction, not yet a proof that the required shape inequalities hold uniformly for every $q\geq200$.

Plainly: a full Euler-Boole expansion is no longer the only route. If the regularized endpoint sequences have the stated monotone shapes, elementary alternating pairing bounds the entire old lattice by its last term, proves the old background exceeds $1.43$, and reduces derivative dominance to the final shifted levels.

## Global newborn derivative sign

The endpoint terms have an exact parameter derivative. With $\theta=\theta_{\sigma,\beta}(X)$ and $J_\sigma=\beta\cos\theta+\sigma>0$, differentiating first in $\beta$ and then in $X$ gives

$$
\partial_\beta A_{\sigma,\beta}(X)
=
\frac{\beta\cos^3\theta+\sigma}
{4\sin^2\theta\,J_\sigma^3}.
$$

To control the rising newborn term, define

$$
\theta_0(\beta)=\arccos(\beta^{-1/3}),
\qquad
H(\beta)=M(\beta)-F_\beta(\theta_0(\beta)).
$$

For $\beta\geq8$, put $x=\beta^{-2/3}\leq1/4$. Direct differentiation yields

$$
H'(\beta)
=
\sqrt{1-x^3}-\sqrt{1-x}
-\frac{x-x^2}{3\sqrt{1-x}}.
$$

The first difference can be rationalized. After dividing by $x(1-x)>0$, the inequality $H'(\beta)>0$ is equivalent to

$$
(2+3x)\sqrt{1-x}>\sqrt{1-x^3}.
$$

Its square is strict on $0<x\leq1/4$ because

$$
(2+3x)^2(1-x)
\geq4\left(1-\frac14\right)
=3
>1-x^3.
$$

At the exact anchor $\beta=8$,

$$
H(8)-h
=
3\sqrt7-4\sqrt3-\frac\pi3+\arcsin\frac18
>
\frac{83}{1050}
>0,
$$

where the strict rational lower bound uses $\sqrt7>529/200$, $\sqrt3<26/15$, $\pi<22/7$, and $\arcsin(1/8)>1/8$. Hence $H(\beta)>h$ for every $\beta\geq8$.

Now let $u=\theta_{-,\beta}(qh)$ be a newborn rising root in any fold cell with $\varepsilon=M(\beta)-qh\in(0,h)$. Since

$$
F_\beta(\theta_0)=M(\beta)-H(\beta)
<M(\beta)-h
<qh,
$$

strict increase on the rising branch gives $u>\theta_0$. Therefore $\beta\cos^3u-1<0$, and the exact derivative formula proves

$$
\partial_\beta A_{-,\beta}(qh)<0.
$$

For the transformed descending root $y=\theta_{+,\beta}((q+6)h)$, the increasing branch ends at $\arccos(-1/\beta)$, so $\cos y>-1/\beta$. Thus $\beta\cos^3y+1>1-1/\beta^2>0$ and

$$
\partial_\beta A_{+,\beta}((q+6)h)>0.
$$

The shifted newborn identity consequently gives the strict global sign

$$
\partial_\beta P_\beta(qh)
=
\partial_\beta A_{-,\beta}(qh)
-\partial_\beta A_{+,\beta}((q+6)h)
<0
$$

for every admitted fold cell with $\beta\geq8$, in particular for the entire unresolved post-T200 tail.

Plainly: the newborn pair always weakens as speed moves away from its fold. This sign is now proved globally, not inferred from the first two hundred cells; only the quantitative comparison with the old-background derivative remains open.

## Uniform right-edge clearance

At the right edge of cell $q$, where $M(\beta_{q+1})=(q+1)h$, the level-$qh$ newborn pair lies exactly $h$ below the fold maximum. Write its roots as $u=\xi-s$ and $v=\xi+t$. On the unresolved tail, $\beta>100$. Also $\pi/2-\xi=\arcsin(1/\beta)<0.011$. For $0\leq r\leq1/5$, the elementary bounds $\sin x\geq x-x^3/6$ and $\cos x\geq1-x^2/2$ give

$$
\sin(\xi\pm r)>\frac{97}{100}=:c.
$$

The exact fold integrals then show that neither offset reaches $1/5$, because

$$
H_\pm\left(\frac15;\beta\right)
\geq
\frac{\beta c}{2}\left(\frac15\right)^2
>
\frac{97}{50}
>h.
$$

Using $H_\pm(s;\beta)=h$, with $s$ standing for either admitted offset, gives

$$
\sqrt{\frac{2h}{\beta}}
\leq s
\leq
\sqrt{\frac{2h}{\beta c}},
\qquad
J_\pm\geq c\sqrt{2h\beta},
$$

while

$$
|\cos(\xi\pm s)|
\leq
\frac1\beta+\sqrt{\frac{2h}{\beta c}}.
$$

Bounding the two tangential terms separately therefore yields

$$
0<P_{\beta_{q+1}}(qh)
\leq
\frac{\beta^{-1}+\sqrt{2h/(\beta c)}}
{2c^3\sqrt{2h\beta}}
<\frac{1}{100}
$$

for every $q\geq200$. For the final strict inequality, the right-hand side decreases with $\beta$, while at $\beta=100$ one may use $1/2<h<11/21$ to bound its numerator below $0.115$ and its denominator above $18$ in the required directions.

Plainly: by the far edge of every later cell, the newborn contribution is below one hundredth. Therefore any uniform old-background lower bound greater than $0.01$ automatically supplies the right-edge sign change needed in every one-zero cell.

## Terminal descending-derivative monotonicity

One of the shape conditions in the alternating derivative bound can also be proved directly. Let $y=\theta_{+,\beta}(X)$ lie among the six terminal descending indices $q\leq k\leq q+5$, so $X=kh$. If $\zeta=\arccos(-1/\beta)$ is the maximizer of $\beta\sin y+y$ and $y=\zeta-r$, then its fold deficit satisfies

$$
0<\delta=M(\beta)+\pi-X<7h.
$$

On the post-T200 tail, $\beta>100$ and $\zeta-\pi/2=\arcsin(1/\beta)<0.011$. For $0\leq r\leq0.3$,

$$
\sin(\zeta-r)>0.95.
$$

The exact fold integral at $r=0.3$ is therefore greater than $100(0.95)(0.3)^2/2=4.275>7h$, so every admitted terminal root has $r<0.3$. The same integral gives

$$
r^2<\frac{2\delta}{0.95\beta}
<\frac{440}{57\beta}.
$$

Writing $C=\cos y$ and using $|C|\leq1/\beta+r$ yields the convenient uniform bounds

$$
|C|<0.31,
\qquad
\beta C^2<16.
$$

Differentiate the exact expression for $\partial_\beta A_{+,\beta}$ with respect to $X$. After clearing positive factors, its sign is the sign of

$$
T(\beta,C)
=
-2\beta^2C^5+\beta C^4-8\beta C^2+3\beta-2C.
$$

If $C<0$, the only negative term is $-8\beta C^2$, and $T>3\beta-8(16)>172$. If $C\geq0$, the bounds above give

$$
T
>
300-2(16)^2(0.31)-8(16)-2(0.31)
>12.
$$

Hence

$$
\partial_X\partial_\beta A_{+,\beta}(X)>0
$$

throughout every six-term terminal range used in the old-background derivative bound.

Plainly: the six transformed descending derivative terms grow steadily as their levels approach their fold. Their alternating sum is therefore rigorously bounded by the final one; this part of the old-background derivative estimate is closed.

## Quantitative endpoint derivative comparison

The endpoint inequality can be written entirely in the fold deficit. Let

$$
K_\beta(\delta)
=
-\partial_\beta A_{-,\beta}(M(\beta)-\delta)
+\partial_\beta A_{+,\beta}(M(\beta)+\pi-\delta),
$$

the positive magnitude of the same-level pair derivative at deficit $\delta$. In a cell with $\varepsilon=M(\beta)-qh$, the left side of the endpoint inequality is $K_\beta(\varepsilon)$. Reindexing its right side gives exactly

$$
K_\beta(\varepsilon+h)
+partial_\beta A_{+,\beta}(M(\beta)-(\varepsilon+h)).
$$

The last term lies $\pi+\varepsilon+h=\varepsilon+7h$ below the maximum of the plus branch.

For either near-fold side at deficit $0<\delta\leq2h$, the exact fold integrals give offsets below $0.2$, $\sin\theta>c_n:=0.97$, and

$$
c_n\sqrt{2\beta\delta}
\leq J
\leq
\sqrt{\frac{2\beta\delta}{c_n}}.
$$

With $w=\beta^{-1/2}\leq0.1$, the cosine bound $|\cos\theta|\leq\beta^{-1}+r$ gives

$$
\beta|\cos\theta|^3
\leq
w\left(\sqrt{\frac{2\delta}{c_n}}+w\right)^3.
$$

For $0<\delta\leq h$, the right side is below $0.15$; for $0<\delta\leq2h$, it is below $0.39$. Applying these bounds to the exact derivative formula on both fold sides yields

$$
K_\beta(\delta)
\geq
\frac{0.85c_n^{3/2}}
{2(2\beta\delta)^{3/2}},
$$

and

$$
K_\beta(\delta+h)
\leq
\frac{1.39}
{2c_n^5(2\beta(\delta+h))^{3/2}}.
$$

Since $\delta/(\delta+h)\leq1/2$, $c_n^{-13/2}<1.27$, and $2\sqrt2>2.8$, these estimates imply

$$
K_\beta(\delta+h)<\frac34K_\beta(\delta).
$$

For the far plus-branch term, its deficit $\delta_f=\delta+7h$ lies in $(7h,8h)$. The bounds from the preceding section give $\sin\theta>c_f:=0.95$, while the same $w$ estimate gives $\beta|\cos\theta|^3<2.9$. Therefore

$$
\partial_\beta A_{+,\beta}(M(\beta)-(\delta+h))
\leq
\frac{3.9}
{4c_f^5(2\beta\delta_f)^{3/2}}.
$$

Comparing this with the lower bound for $K_\beta(\delta)$, and using $\delta/\delta_f\leq1/8$, $c_f^{-5}<4/3$, $c_n^{-3/2}<20/19$, and $\sqrt2>1.4$, gives

$$
\partial_\beta A_{+,\beta}(M(\beta)-(\delta+h))
<\frac{3}{20}K_\beta(\delta).
$$

The two bounds combine to prove the strict endpoint comparison with explicit slack:

$$
K_\beta(\delta+h)
+\partial_\beta A_{+,\beta}(M(\beta)-(\delta+h))
<\frac9{10}K_\beta(\delta).
$$

Thus the quantitative endpoint inequality required for newborn derivative dominance holds throughout the post-T200 tail. Turning that endpoint comparison into a bound on the complete old derivative now requires only the remaining monotonicity of $-\partial_\beta D_\beta(kh)$.

Plainly: the newborn derivative at one fold distance is at least ten percent stronger than the two endpoint terms that can bound the old derivative. Once the regularized paired old-root derivative is proved to grow monotonically along its lattice, the full derivative-dominance argument closes automatically.

## Exact fold-local coordinate

Write the newborn roots as $u_q=\xi-s$ and $v_q=\xi+t$, with $s,t>0$. They are the unique solutions of

$$
H_-(s;\beta)=\varepsilon,
\qquad
H_+(t;\beta)=\varepsilon,
$$

where

$$
H_-(s;\beta)=M(\beta)-F_\beta(\xi-s),
\qquad
H_+(t;\beta)=M(\beta)-F_\beta(\xi+t).
$$

Both functions are strictly increasing on their admitted sides of the maximum. Their exact integral forms are

$$
H_-(s;\beta)=\int_0^sF_\beta'(\xi-r)\,dr,
\qquad
H_+(t;\beta)=\int_0^t-F_\beta'(\xi+r)\,dr.
$$

Because $\varepsilon\in(0,h)$ and $\beta\geq\beta_{200}$ on the unresolved tail, these formulas confine both fold offsets to a uniformly small neighborhood of $\xi$. Taylor bounds may therefore be applied with explicit remainders on one fixed $z$ domain rather than separately fitted in every topology cell.

Plainly: the square-root fold behavior can be bounded from exact integrals over one small angular interval. The cell index appears only through the large parameter $\beta_q$.

## Sufficient uniform inequalities

The following estimate package, when completed for every $q\geq200$ and every $\beta\in(\beta_q,\beta_{q+1})$, proves the alternating zero count:

1. **Positive old background:** find an explicit $b_0>0$ such that $B_q(\beta)\geq b_0$.
2. **Right-edge clearance:** find $b_1<b_0$ such that $P_q(\beta_{q+1}^-):=P_{\beta_{q+1}}(qh)\leq b_1$. The uniform right-edge argument below proves $b_1=0.01$; it remains to prove $b_0>0.01$.
3. **Odd-fold derivative dominance:** for odd $q$, the global newborn derivative argument below proves $\partial_\beta P_\beta(qh)<0$. It remains to prove the quantitative inequality

$$
-\partial_\beta P_\beta(qh)
>
|\partial_\beta B_q(\beta)|.
$$

For even $q$, $N_q=P_\beta(qh)>0$, so the first inequality gives $S_{q+1}>0$ and no zero in the intervening odd topology cell. For odd $q$, the newborn term is negative and diverges at the left fold, the first two inequalities make $S_{q+1}$ positive at the right edge, and derivative dominance makes $S_{q+1}$ strictly increasing. Hence exactly one simple zero occurs in the even topology cell.

Plainly: background positivity settles every no-zero cell. In each one-zero cell, the negative newborn spike is now known to rise and to finish below $0.01$ in magnitude; the remaining derivative bound must prove that the complete ledger rises without turning back.

## First remaining lemma

The next proof object is the remaining uniform shifted-endpoint shape lemma. On every cell $q\geq200$, it must establish the declared nonnegativity and monotonicity of $Q_\beta$ and $-\partial_\beta D_\beta$ on $h\leq X\leq(q-1)h$. Terminal monotonicity of $\partial_\beta A_{+,\beta}$, the endpoint-size bounds, and the quantitative endpoint derivative inequality are already proved. The first remaining shape statement then gives $B_q>1.43>0.01$, and the second turns the proved endpoint slack into strict newborn derivative dominance. A direct Euler-Boole remainder with explicit endpoint terms remains a valid fallback if either remaining monotonicity statement is false; nonuniform endpoint expansions must still retain their remainders rather than fit away logarithmic corrections.

Plainly: the remaining global burden is now a small set of uniform one-variable shape inequalities plus one endpoint comparison. Proving them closes the all-later-cells sign argument; finding one certified violation falsifies this simplified route without disturbing the exact shifted-lattice identity or the finite T200 theorem.

## Boundary and falsifier

This packet derives the fixed-cell map, pair-derivative identities, shifted-endpoint lattice, exact extraction of the $3/2$ term, exact ledger decomposition, and sufficient-condition routes. It does not prove the uniform shape, background, or derivative bounds, does not establish any zero count in T201 or later, and does not enlarge the accepted finite ladder. A failed implicit derivative, incorrect index shift, incorrect sign or multiplicity in the decomposition, invalid fixed-cell mapping, or a later certified ledger that violates the stated sufficient-condition logic falsifies the corresponding derived reduction.

Closure goal: prove or falsify the uniform shifted-endpoint shape lemma and endpoint derivative inequality, then join the resulting explicit bounds to the accepted T02-through-T200 finite certificate.
