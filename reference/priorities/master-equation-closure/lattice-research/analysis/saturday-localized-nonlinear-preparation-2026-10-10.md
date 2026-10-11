# A spatially localized self-consistent disturbance of the alternating lattice: a nonlinear complete-past construction at $g=16$ (2026-10-10)

## Result

**A spatially localized disturbance with a self-consistent complete past exists.** For the unit alternating cubic lattice at coupling $g=16$, with every site free to move and every delayed row retained, this note constructs nonzero solutions of the unchanged Master Equation on the whole past $T\le0$ that tend to the resting lattice as $T\to-\infty$ and whose displacements, velocities and accelerations fall off in space faster than any power of the distance from a centre. They are obtained from the localized solutions of the linearized equation by a contraction argument; the correction is of second order in the amplitude. It is a hand proof written in one session. An [independent review](saturday-localized-nonlinear-preparation-codex-review-2026-10-10.md) by Codex rederived the reduction, the linear inverse, the seed and the fixed-weight contraction separately and supports them; it certified no numerical result, and its five corrections are incorporated below.

1. **Reconstruction of the linear foothold (derived again; one linear relation also measured against the nonlinear rows).** The linear equation about the resting lattice, its spatial-mode matrix, the exact staggered control, the unique positive staggered rate, the neighbouring band of real growth rates and the contour construction of localized linear histories in the [general-wavevector note](checkerboard-linear-wavevectors.md) were derived again. No error was found. Four clarifications are recorded, none of which changes that note's statements. The [weak-coupling estimate](checkerboard-weak-coupling-rate.md) was checked at its centred-cube scope and agrees with a separately computed sum.
2. **A measured fact about the spectrum.** At $g=16$ the staggered rate is $\lambda_g=2.79523$ (float, with the known bracket and two hand bounds, $2.7<\lambda_g<3$). It is not the largest real growth rate: on a $13^3$ grid of wavevectors the largest real root found is $3.028$, at wavevectors of the type $(0,0,\pi)$. The band used here is the one around the staggered wavevector.
3. **The inverse that makes the construction work (derived).** For histories that decay into the past at least as fast as $e^{\nu T}$, the linear delayed operator of the lattice is invertible by a convergent series whenever $q(\nu)=g\,[2S_3(\nu)+\nu S_2(\nu)]/\nu^2<1$, where $S_p(\nu)=\sum_{d\ne0}e^{-\nu\lvert d\rvert}/\lvert d\rvert^p$. At $g=16$ a hand bound gives $q\le0.2003$ for all $\nu\ge5.3$ with spatial weights included, which is what the proof uses; without weights the float value of the threshold where $q=1$ is $\nu=3.84$ (measured, not certified). Twice the staggered rate is $5.59$. Every nonlinear term of a disturbance built from rates near $\lambda_g$ therefore decays into the past faster than any rate at which the linear operator can fail to be invertible. No resonance condition has to be checked.
4. **The preparation theorem (derived).** With that inverse, an explicit second-order bound on the nonlinear remainder of the delayed rows, and the localized linear seeds, a contraction on complete past histories gives the solutions described above, with one causal root per distinct source, no own-history root, speeds at most $3/16$, transmitter factors at least $13/16$ and separations at least $7/8$ throughout.
5. **What this does not establish.** The amplitude threshold is not evaluated numerically. The construction says nothing about what the disturbance does after it stops being small: no later evolution, stability, decay, wake-speed event, retained constituent or typicality follows. The solutions have rapidly decaying tails, not compact support. Seeds from other parts of the spectrum are not treated. For other couplings the same proof applies whenever twice the staggered rate exceeds the threshold of the series inverse, which float values indicate for sampled couplings from $0.5$ to $128$ and not for $0.1$ or below; only $g=16$ is carried through with hand-checkable bounds.

> Claim grade: derived for items 3 and 4 and for the reconstruction in item 1, by the hand arguments below, which the separate derivation in the Codex review supports; measured for item 2 and for every number quoted from the session scripts named under [Instruments](#instruments-and-what-they-can-establish), which separate float error from truncation-tail bounds; the inequalities on which the theorem's hypotheses rest, $2.7<\lambda_g<3$ and $q^\omega\le0.2003$ at rates of at least $5.3$, are given as hand-checkable bounds as well as shell sums; the unweighted threshold $3.84$ is a float measurement and is not used by the proof. Falsifier: an error in the second-order bound of the nonlinear remainder, in the series inverse, or in the weighted bounds of the linear seed defeats the theorem; a correct evaluation with $\lambda_g\le2.65$ or with weighted $q(5.3)\ge1$ at $g=16$ removes its hypotheses.

## Setting, population and summation prescription

Units are $c_f=1$ and unit lattice spacing; the coupling is $g=16$ throughout unless a statement says otherwise. One architrino sits near each site $j$ of $\mathbb Z^3$, with polarity sign $\sigma_j=(-1)^{j_1+j_2+j_3}$, at position $X_j(T)=j+u_j(T)$. Every site is dynamical; none is held fixed. For a receiver $i$ and a source $j\ne i$ write $d=i-j$, $r=\lvert d\rvert$, $n=d/r$ and $\sigma_d=(-1)^{d_1+d_2+d_3}=\sigma_i\sigma_j$.

**Rows.** Receiver $i$ at time $T$ receives from source $j$ the wake emitted at $s=T-\tau$, where the causal delay $\tau>0$ solves $\tau=\lvert X_i(T)-X_j(T-\tau)\rvert$. With $R=X_i(T)-X_j(s)$, the vector from the emission point to the receiver, the [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) gives the acceleration contribution $g\,\sigma_d\,\Psi(R,u_j'(s))$ with

$$
\Psi(R,v)=\frac{R}{\lvert R\rvert^2\,(\lvert R\rvert-R\cdot v)} ,
$$

which is the inverse-square row along $R$ divided by the transmitter factor $D=1-(R/\lvert R\rvert)\cdot v$. Like polarities give a contribution along $R$ and unlike polarities against it.

**Summation prescription.** The total acceleration of a receiver is the sum of its rows over all sources, taken with the lane's stationary prescription: sources are grouped into the fixed eight-site blocks $\{2m+\epsilon:\epsilon\in\{0,1\}^3\}$ and the block contributions are summed. For the resting lattice this grouped sum is zero at every anchor, as established in the lane [manuscript](../manuscript.md#11-what-the-stationary-lattice-establishes). The prescription is not changed here; the next section shows that for the histories considered everything beyond the resting contribution converges absolutely, so that the prescription enters only through two facts about the resting lattice.

**History class.** Fix a rate $a>0$, an integer $m\ge0$ and the spatial weight $w_j=(1+\lvert j\rvert/(4m))^m$ for $m\ge1$, or $w_j=1$ for $m=0$. A history is a family of twice continuously differentiable functions $u_j$ on $T\le0$. Its norm at rate $a$ is

$$
\lVert u\rVert_a=\sup_{T\le0}\ \sup_{j}\ w_j\,e^{-aT}\max\Bigl\{\lvert u_j(T)\rvert,\ \frac{\lvert u_j'(T)\rvert}{a},\ \frac{\lvert u_j''(T)\rvert}{a^2}\Bigr\},
$$

and $X_a$ denotes the histories for which it is finite. A history in $X_a$ is at rest in the infinite past, and at each time its displacement, velocity and acceleration are bounded by a multiple of $1/w_j$. This is what spatial localization means in this note: decay like the inverse $m$-th power of the distance from the origin, uniformly over the whole past, for the chosen $m$; the final statement has it for every $m$ at once. For a family $f_j$ of continuous functions the companion norm is $\lVert f\rVert_{0,\nu}=\sup_{T\le0}\sup_jw_je^{-\nu T}\lvert f_j(T)\rvert$.

Two properties of the weight are used. It is at least $1$, and $w_i\le w_{i-d}\,\omega_d$ with $\omega_d=(1+r/(4m))^m\le e^{r/4}$, because $1+\lvert i\rvert/(4m)\le(1+\lvert i-d\rvert/(4m))(1+r/(4m))$. The bound $e^{r/4}$ does not depend on $m$.

## The equation in the history class

Write $\lVert u\rVert_a^{(0)}$ for the norm with weight $1$; it is at most the norm with any of the weights above. Let $u$ be a history with $\lVert u\rVert_a^{(0)}\le\rho_0$, where $\rho_0=1/16$ and $a\le3$. Then every displacement is at most $1/16$, every speed at most $3/16$ and every acceleration at most $9/16$. Everything in this section, the root census, the regularity of the rows and the reduction of the equation, depends only on this smallness without weight. The weighted norm of the history may be large, or merely finite.

**Root census (derived).** For $j\ne i$ the function $\tau\mapsto\tau-\lvert X_i(T)-X_j(T-\tau)\rvert$ is strictly increasing, because the source moves slower than the wake; it is negative at $\tau=0$, where the two sites are at least $7/8$ apart, and positive for large $\tau$. There is exactly one root, and $\lvert\tau-r\rvert\le\lvert u_i(T)\rvert+\lvert u_j(s)\rvert\le1/8$. A receiver has no root on its own history, since it moves slower than its own wake. The transmitter factor satisfies $D\ge13/16$ and the emission-to-receiver distance satisfies $7r/8\le\lvert R\rvert\le9r/8$. Every row is therefore regular, and each receiver has exactly one row per distinct source.

**Splitting a row.** With $\alpha=u_i(T)$, $y=u_j$ and $s=T-\tau$,

$$
\sigma_d\Psi\bigl(d+\alpha-y(s),y'(s)\bigr)=\sigma_d\Bigl\{\frac{d}{r^3}-T_d\alpha+f_d(\alpha)+\bigl[\Psi\bigl(d+\alpha-y(s),y'(s)\bigr)-\Psi(d+\alpha,0)\bigr]\Bigr\},
$$

$$
T_d=\frac{3nn^{\mathsf T}-I}{r^3},\qquad f_d(\alpha)=\frac{d+\alpha}{\lvert d+\alpha\rvert^3}-\frac{d}{r^3}+T_d\alpha .
$$

The first term is the resting row. The second is the first-order effect of moving the receiver in the resting lattice. The third is the rest of that effect and is bounded by a constant times $\lvert\alpha\rvert^2/r^4$, which is absolutely summable over $d$. The bracket is the effect of the source's motion; it is bounded by a constant times $\lvert y(s)\rvert/r^3+\lvert y'(s)\rvert/r^2$, and since $s\le T-r+1/8$ and the history decays into the past, by a constant times $e^{aT}e^{-ar}(r^{-3}+r^{-2})$, which is absolutely summable over $d$ whatever the spatial behaviour of the history. This is the mechanism already used for the coherent branch in the manuscript: decay into the past turns into decay with distance, because a distant source is seen as it was long ago.

**The two facts about the resting lattice.** The block sum of the resting rows is zero at an anchor (manuscript, as cited). The block sum of $\sigma_dT_d$ is zero as well. To see this, note that the block series for this quantity converges absolutely, a block at distance $\varrho$ contributing $O(\varrho^{-6})$, so it may be summed over the blocks inside growing cubes. Such a union of blocks differs from a cube centred on the receiver by a boundary layer of bounded thickness at distance of order $N$, holding $O(N^2)$ sites that each contribute $O(N^{-3})$; and over a cube centred on the receiver the sum vanishes identically, because $\sum\sigma_dT_d$ over a set invariant under the cubic group is a symmetric, trace-free matrix invariant under that group, and the only such matrix is zero. The polarity sign is invariant because permutations and sign changes of the coordinates preserve the parity of $d_1+d_2+d_3$.

**The equation.** Summing the split rows with the block prescription, the first two terms drop out by these two facts and the other two are absolutely convergent, so the grouping no longer matters for them. For histories with $\lVert u\rVert_a^{(0)}\le\rho_0$ the Master Equation with the stationary prescription is therefore exactly

$$
u_i''(T)=g\Bigl\{E\bigl(u_i(T)\bigr)+\sum_{d\ne0}\sigma_d\bigl[\Psi\bigl(d+u_i(T)-u_{i-d}(s),u_{i-d}'(s)\bigr)-\Psi\bigl(d+u_i(T),0\bigr)\bigr]\Bigr\},\qquad E(\alpha)=\sum_{d\ne0}\sigma_df_d(\alpha).
$$

$E$ is the field of the resting lattice at a displaced receiver. It vanishes with its first derivative at the anchor; by inversion symmetry it is in fact of third order, and the script gives $\lvert E(\alpha)\rvert/\lvert\alpha\rvert^3$ between $3.6$ and $14.4$ for $\lvert\alpha\rvert\le1/16$ along the three symmetry directions (measured). Only the second-order bound $\lvert E(\alpha)\rvert\le c_E\lvert\alpha\rvert^2$ is used below.

**Linear part and remainder.** Differentiating $\Psi$ at the resting configuration gives $\partial_R\Psi(d,0)[h]=-T_dh$ and $\partial_v\Psi(d,0)[h]=B_dh$ with $B_d=nn^{\mathsf T}/r^2$. The first-order change of the emission time contributes nothing at first order, because the resting source does not move. The linear part of the right side is therefore $g\,(\mathcal Ku)_i(T)$ with

$$
(\mathcal Ku)_i(T)=\sum_{d\ne0}\sigma_d\bigl[T_d\,u_{i-d}(T-r)+B_d\,u_{i-d}'(T-r)\bigr],
$$

which is the linear equation of the general-wavevector note. Write $\mathcal N[u]$ for the rest, so that the Master Equation reads $u''=g\,\mathcal Ku+\mathcal N[u]$:

$$
\mathcal N_i[u]\,(T)=g\,E\bigl(u_i(T)\bigr)+g\sum_{d\ne0}\sigma_d\,\mathcal R_d,\qquad
\mathcal R_d=\Psi\bigl(d+\alpha-y(s),y'(s)\bigr)-\Psi(d+\alpha,0)-T_d\,y(T-r)-B_d\,y'(T-r).
$$

## The inverse of the linear operator on rapidly decaying histories

For a family $f$ with $\lVert f\rVert_{0,\nu}<\infty$ put $(\mathcal Jf)_j(T)=\int_{-\infty}^T(T-t)f_j(t)\,dt$, the twice-integrated $f$ that vanishes in the infinite past. Since $\int_{-\infty}^T(T-t)e^{\nu t}dt=e^{\nu T}/\nu^2$ and $\int_{-\infty}^Te^{\nu t}dt=e^{\nu T}/\nu$, each of the three quantities in the norm of $\mathcal Jf$ is at most $\lVert f\rVert_{0,\nu}/\nu^2$, so

$$
\lVert\mathcal Jf\rVert_\nu\le\frac{\lVert f\rVert_{0,\nu}}{\nu^2}.
$$

For $v$ in $X_\nu$, the delayed values obey $\lvert v_{i-d}(T-r)\rvert\le\lVert v\rVert_\nu e^{\nu T}e^{-\nu r}\omega_d/w_i$ and $\lvert v_{i-d}'(T-r)\rvert\le\nu\lVert v\rVert_\nu e^{\nu T}e^{-\nu r}\omega_d/w_i$. The matrices have norms $\lvert T_d\rvert=2/r^3$ and $\lvert B_d\rvert=1/r^2$. Hence

$$
\lVert\mathcal Kv\rVert_{0,\nu}\le\Bigl[2S_3^\omega(\nu)+\nu S_2^\omega(\nu)\Bigr]\lVert v\rVert_\nu,\qquad S_p^\omega(\nu)=\sum_{d\ne0}\frac{e^{-\nu r}\,\omega_d}{r^p}\le S_p\bigl(\nu-\tfrac14\bigr),
$$

and the operator $\mathcal Jg\mathcal K$ on $X_\nu$ has norm at most

$$
q^\omega(\nu)=\frac{g\,[2S_3^\omega(\nu)+\nu S_2^\omega(\nu)]}{\nu^2}.
$$

**Lemma 1 (series inverse; derived).** If $q^\omega(\nu)<1$, then for every $f$ with $\lVert f\rVert_{0,\nu}<\infty$ there is exactly one $v$ in $X_\nu$ with $v''=g\,\mathcal Kv+f$ on $T\le0$, namely $v=\sum_{n\ge0}(\mathcal Jg\mathcal K)^n\mathcal Jf$, and $\lVert v\rVert_\nu\le C_L\lVert f\rVert_{0,\nu}$ with $C_L=1/(\nu^2(1-q^\omega(\nu)))$.

*Proof.* A history in $X_\nu$ and its first derivative vanish in the infinite past, so $v=\mathcal J(v'')$, and the equation is equivalent to $v=\mathcal Jg\mathcal Kv+\mathcal Jf$ in $X_\nu$. The series converges in the complete space $X_\nu$ and gives the only solution. $\qquad\blacksquare$

**Numbers at $g=16$.** Without weights $q(\nu)=1$ at $\nu=3.837$ and $q(5.3)=0.139$ (shell sums to radius $1000$; the tail bound is zero in double precision). With the weight bound, $q^\omega(5.3)\le16\,[2S_3(5.05)+5.3\,S_2(5.05)]/5.3^2=0.180$. A bound that can be checked by hand uses the first three shells exactly and, for the remaining sites, $r\ge2$ and $r\ge(\lvert d_1\rvert+\lvert d_2\rvert+\lvert d_3\rvert)/\sqrt3$:

$$
S_p(x)\le6e^{-x}+\frac{12\,e^{-\sqrt2x}}{2^{p/2}}+\frac{8\,e^{-\sqrt3x}}{3^{p/2}}+2^{-p}\Bigl[\Bigl(\frac{1+e^{-x/\sqrt3}}{1-e^{-x/\sqrt3}}\Bigr)^3-\bigl(1+2e^{-x/\sqrt3}\bigr)^3\Bigr],
$$

which gives $S_2(5.05)\le0.04938$, $S_3(5.05)\le0.04494$ and $q^\omega(5.3)\le0.2003$. For $\nu\ge5.3$ the same bound with $S_p(5.05)$ kept is decreasing in $\nu$, so $q^\omega(\nu)\le0.2003$ for every $\nu\ge5.3$, and with that bound $C_L\le1/(5.3^2\times0.7997)<0.0446$. The rounded figure $0.21$ alone would give only $0.0451$.

**Why this is enough.** A product of two seed factors decays into the past like $e^{2aT}$ with $2a$ at least $5.3$, and at every such rate the weighted inverse exists with the explicit norm just given. That is the whole of what the proof needs from the linear operator. For orientation only: $q(\nu)<1$ also implies that no mode grows like $e^{\lambda T}$ with $\operatorname{Re}\lambda\ge\nu$, and the float values, an unweighted threshold of $3.84$ against a largest real rate of $3.028$ on the grid, show that the series condition is cruder than the spectrum.

## The second-order bound on the remainder

**Derivative bounds for a row.** $\Psi(R,v)$ is homogeneous of degree $-2$ in $R$ and smooth for $R\ne0$, $\lvert v\rvert<1$. On the set $\lvert v\rvert\le3/16$ there are constants $c_{20},c_{11},c_{02}$, depending on nothing else, with $\lvert\partial_R^2\Psi\rvert\le c_{20}/\lvert R\rvert^4$, $\lvert\partial_R\partial_v\Psi\rvert\le c_{11}/\lvert R\rvert^3$ and $\lvert\partial_v^2\Psi\rvert\le c_{02}/\lvert R\rvert^2$. With $\lvert R\rvert\ge7r/8$ these become bounds in powers of $1/r$. The constants are not evaluated here.

**One row.** Put $H(\alpha,p,v)=\Psi(d+\alpha-p,v)-\Psi(d+\alpha,0)$, so that $H(\alpha,0,0)=0$ for every $\alpha$, $\partial_pH(0)=T_d$ and $\partial_vH(0)=B_d$. With $p=y(s)$ and $v=y'(s)$,

$$
\mathcal R_d=\bigl[H(\alpha,p,v)-T_dp-B_dv\bigr]+T_d\bigl[y(s)-y(T-r)\bigr]+B_d\bigl[y'(s)-y'(T-r)\bigr].
$$

For the first bracket, write $H(\alpha,p,v)=\int_0^1\frac{d}{d\theta}H(\alpha,\theta p,\theta v)\,d\theta$ and subtract the derivative at the origin under the integral. The mean value theorem and the derivative bounds give

$$
\bigl\lvert H(\alpha,p,v)-T_dp-B_dv\bigr\rvert\le c\Bigl[\frac{(\lvert\alpha\rvert+\lvert p\rvert)\lvert p\rvert}{r^4}+\frac{(\lvert\alpha\rvert+\lvert p\rvert)\lvert v\rvert}{r^3}+\frac{\lvert v\rvert^2}{r^2}\Bigr],
$$

with $c$ a fixed multiple of $\max\{c_{20},c_{11},c_{02}\}$. Every term contains a factor from the source. For the other two brackets, $\lvert s-(T-r)\rvert=\lvert\tau-r\rvert\le\lvert\alpha\rvert+\lvert p\rvert$, so they are bounded by $(2/r^3)\,\sup\lvert y'\rvert\,(\lvert\alpha\rvert+\lvert p\rvert)$ and $(1/r^2)\,\sup\lvert y''\rvert\,(\lvert\alpha\rvert+\lvert p\rvert)$, the suprema being over times within $1/8$ of $T-r$. These two terms are the price of the state-dependent delay; they are of second order because the delay differs from $r$ only by a first-order amount, and they use the second derivative of the history, which is why the norm contains it.

**Insertion of the history bounds.** Let $A_0=\lVert u\rVert_a^{(0)}$ and $A_w=\lVert u\rVert_a$, the norms without and with the weight, and suppose only that $A_0\le\rho_0$ and $A_w<\infty$; $A_w$ need not be small. Put $\eta=e^{a/8}$. By the previous section the row is regular, the delay is within $1/8$ of $r$, and every Taylor segment used above stays in $\lvert v\rvert\le3/16$, $\lvert R\rvert\ge7r/8$, because these depend on $A_0$ alone. At every time within $1/8$ of $T-r$ the source obeys two bounds, $\lvert y\rvert\le A_0\,\eta\,e^{aT}e^{-ar}$ and $\lvert y\rvert\le A_w\,\eta\,e^{aT}e^{-ar}\omega_d/w_i$, with factors $a$ and $a^2$ for $y'$ and $y''$; the receiver obeys $\lvert\alpha\rvert\le A_0e^{aT}$ and $\lvert\alpha\rvert\le A_we^{aT}/w_i$. Every term of the bound for $\mathcal R_d$ is a product of two such factors, at least one of them from the source. Bound one factor with its weight and the other without, choosing the source factor for the weighted bound whenever the product contains the receiver. Each product is then at most $A_0A_we^{2aT}/w_i$ times a function of $d$:

$$
w_i\,e^{-2aT}\lvert\mathcal R_d\rvert\le A_0A_w\,\omega_d\,e^{-ar}\,\eta\,P(r),\qquad P(r)=c'\Bigl[\frac1{r^4}+\frac{a}{r^3}+\frac{a^2}{r^2}\Bigr],
$$

where $c'$ collects $c$, the factors $2$ and $1$ of the delay terms and powers of $\eta\le e^{3/8}$. Since $\omega_d\le e^{r/4}$ and $a>1/4$, the sum over $d$ converges; call it $C_{\rm src}$. It does not depend on the weight exponent. The receiver term obeys $w_ie^{-2aT}\lvert E(u_i(T))\rvert\le c_E\,w_ie^{-2aT}\lvert u_i(T)\rvert^2\le c_EA_0A_w$. The same computation holds for any weight that is at least $1$ and satisfies $w_i\le w_{i-d}\,\omega_d$ with $\omega_d\le e^{r/4}$, in particular for a truncated weight.

**Lemma 2 (remainder; derived).** Let $1/4<a\le3$, and let the weight be at least $1$ with $w_i\le w_{i-d}\omega_d$, $\omega_d\le e^{r/4}$.

(a) *Product bound.* For every history with $\lVert u\rVert_a^{(0)}\le\rho_0$ and $\lVert u\rVert_a<\infty$,

$$
\lVert\mathcal N[u]\rVert_{0,2a}\le C_N\,\lVert u\rVert_a^{(0)}\,\lVert u\rVert_a ,\qquad C_N=g\,(c_E+C_{\rm src}),
$$

with $C_N$ independent of the weight. The weighted norm on the right is not required to be small.

(b) *Lipschitz bound.* For histories with $\lVert u_k\rVert_a\le\rho_0$, $k=1,2$,

$$
\lVert\mathcal N[u_1]-\mathcal N[u_2]\rVert_{0,2a}\le C_N'\,\bigl(\lVert u_1\rVert_a+\lVert u_2\rVert_a\bigr)\lVert u_1-u_2\rVert_a ,
$$

with a constant $C_N'$ of the same kind.

*Proof.* Part (a) is the computation above, which used smallness only of the unweighted norm. For part (b), apply the same steps to differences. The first bracket of $\mathcal R_d$ is a smooth function of $z=(\alpha,p,v)$ whose derivative vanishes at the origin, so its difference at $z_1,z_2$ is at most the same quadratic form evaluated on $(\lvert z_1\rvert+\lvert z_2\rvert)$ and $\lvert z_1-z_2\rvert$. Here $p_1-p_2=(y_1-y_2)(s_1)+[y_2(s_1)-y_2(s_2)]$ and $v_1-v_2=(y_1'-y_2')(s_1)+[y_2'(s_1)-y_2'(s_2)]$, and the two delays satisfy $\lvert\tau_1-\tau_2\rvert\,(1-\tfrac3{16})\le\lvert\alpha_1-\alpha_2\rvert+\lvert(y_1-y_2)(s_1)\rvert$, which follows from $\tau_k=\lvert d+\alpha_k-y_k(T-\tau_k)\rvert$ and the speed bound. The delay brackets are $-T_d\int_r^{\tau}y'(T-t)\,dt$ and $-B_d\int_r^{\tau}y''(T-t)\,dt$; their differences are bounded by $\sup\lvert y_1'-y_2'\rvert\,\lvert\tau_1-r\rvert+\sup\lvert y_2'\rvert\,\lvert\tau_1-\tau_2\rvert$ and the same with one more derivative. Every term is a product of a first-order quantity of $u_1$ or $u_2$ and a difference measured in the norm of $X_a$, which includes second derivatives, and the same weight bookkeeping applies; in part (b) both histories are small in the weighted norm, which is all the contraction needs. The difference of second derivatives enters only through the norm of $u_1-u_2$; no derivative is lost, because the delayed second derivative of one history is multiplied by a difference of delays, not differentiated again. $\qquad\blacksquare$

## The localized linear seeds

This section is the reconstruction of the general-wavevector note's construction, in the form the theorem needs.

**Mode matrix.** For a wavevector $k$ in the torus and $\operatorname{Re}\lambda>0$ put $Q=(\pi,\pi,\pi)$ and

$$
F(k,\lambda)=\lambda^2I-g\,M(k,\lambda),\qquad M(k,\lambda)=\sum_{d\ne0}e^{-\lambda r-i(k+Q)\cdot d}\,[T_d+\lambda B_d].
$$

A history $Ue^{\lambda T+ik\cdot j}$ solves the linear equation exactly when $F(k,\lambda)U=0$, because $\sigma_de^{-ik\cdot d}=e^{-i(k+Q)\cdot d}$. The series and all its derivatives in $k$ and $\lambda$ converge absolutely and locally uniformly on $\operatorname{Re}\lambda>0$, so $F$ is analytic in $\lambda$ and smooth in $k$. Pairing $d$ with $-d$ shows three symmetries used below: $F$ is a real symmetric matrix for real $\lambda>0$; $\overline{F(k,\lambda)}=F(k,\bar\lambda)$; and $F(-k,\lambda)=F(k,\lambda)$, the last because $2Q\cdot d$ is a multiple of $2\pi$.

**Exact control at the staggered wavevector.** At $k=Q$ the phase is $1$ and cubic symmetry gives $\sum_{\text{shell}}T_d=0$ and $\sum_{\text{shell}}B_d=(\#\text{shell})\,I/(3r^2)$ on every shell, so

$$
F(Q,\lambda)=\lambda\,h(\lambda)\,I,\qquad h(\lambda)=\lambda-\frac g3\Sigma(\lambda),\qquad\Sigma=S_2 .
$$

On the positive axis $\Sigma$ is positive and strictly decreasing, tends to zero at infinity and to infinity at zero, so $h$ has exactly one positive zero $\lambda_g$, and $h'(\lambda_g)>1$. At $g=16$ the first three shells give $(16/3)[6e^{-2.7}+6e^{-2.7\sqrt2}+\tfrac83e^{-2.7\sqrt3}]=2.986>2.7$, so $h(2.7)<0$ and $\lambda_g>2.7$; the hand majorant for $S_2$ displayed in the previous section, evaluated at $3$, gives $\Sigma(3)\le0.5103<0.511$ and so $(16/3)\Sigma(3)<2.726<3$, hence $h(3)>0$ and $\lambda_g<3$. The shell sum gives the sharper float value $(16/3)\Sigma(3)=2.203$, which is not needed. The float value is $\lambda_g=2.7952306901$ with $h'(\lambda_g)=4.280$.

**Contour and neighbourhood.** The zero $\lambda_g$ of the analytic function $h$ is isolated. Choose a radius $\varrho_\Gamma$ with $0<\varrho_\Gamma\le\lambda_g-2.65$ such that $\lambda_g$ is the only zero of $\lambda h(\lambda)$ in the closed disc of that radius about $\lambda_g$, and let $\Gamma$ be its boundary circle. Put $a=\lambda_g-\varrho_\Gamma$, the smallest real part on $\Gamma$; then $2.65\le a<\lambda_g<3$ and $2a\ge5.3$. On $\Gamma$ the matrix $F(Q,\lambda)$ is invertible. By continuity and compactness there is a neighbourhood $\mathcal U$ of $Q$ in the torus, which may be taken symmetric under $k\mapsto-k$, such that $F(k,\lambda)$ is invertible for every $k$ in the closure of $\mathcal U$ and every $\lambda$ on $\Gamma$. On that set $F(k,\lambda)^{-1}$ is smooth in $k$, with every $k$-derivative bounded uniformly in $\lambda$ on $\Gamma$. The proof needs only that such a radius and neighbourhood exist. As an illustration, the residue script finds that the radius $0.12$, which gives $a=2.675$, encloses the one pole at $Q$ and all three real roots at the six sampled wavevectors with $\lvert k-Q\rvert\le0.25$ (measured; not a certified choice).

**Seed.** Choose a smooth vector function $V(k)$ with compact support in $\mathcal U$, with $V(-k)=\overline{V(k)}$ and $V(Q)\ne0$; for example a real, even bump function about $Q$ times a fixed real vector. Define

$$
\hat\phi(k,T)=\frac1{2\pi i}\oint_\Gamma e^{\lambda T}F(k,\lambda)^{-1}V(k)\,d\lambda,\qquad\phi_j(T)=\frac1{(2\pi)^3}\int e^{ik\cdot j}\,\hat\phi(k,T)\,dk .
$$

**Lemma 3 (seed; derived).** The history $\phi$ is real, is not identically zero at any time, solves $\phi''=g\,\mathcal K\phi$ at every $T$, and belongs to $X_a$ for every weight exponent $m$.

*Proof.* Bounds. For $T\le0$, $\lvert e^{\lambda T}\rvert\le e^{aT}$ on $\Gamma$. The variable $\lambda$ is an integration variable and does not depend on $k$, so derivatives in $k$ fall only on $F^{-1}V$, and derivatives in $T$ multiply the integrand by powers of $\lambda$, which are bounded on $\Gamma$. Hence every $k$-derivative of $\partial_T^n\hat\phi$ is bounded by a constant times $e^{aT}$, and $\hat\phi(\cdot,T)$ is smooth with support in the support of $V$. Integrating by parts in $k$ any number of times gives $(1+\lvert j\rvert)^{M}\lvert\phi_j^{(n)}(T)\rvert\le C_{M,n}e^{aT}$ for $n=0,1,2$ and every $M$.

Equation. Insert the Fourier and contour representation into $\mathcal K\phi$. The delayed values are $\phi_{i-d}(T-r)$, which puts the factor $e^{-\lambda r-ik\cdot d}$ under the integrals, and the sum over $d$ may be taken inside because $\sum_de^{-ar}(2r^{-3}+\lvert\lambda\rvert r^{-2})$ converges. This gives $M(k,\lambda)$ under the integrals, so $\phi''-g\mathcal K\phi$ has the integrand $e^{\lambda T}F(k,\lambda)F(k,\lambda)^{-1}V(k)=e^{\lambda T}V(k)$, which is entire in $\lambda$ and integrates to zero around $\Gamma$.

Reality. $\Gamma$ is symmetric about the real axis. Conjugating the contour integral and using $\overline{F(k,\lambda)}=F(k,\bar\lambda)$ gives $\overline{\hat\phi(k,T)}=\frac1{2\pi i}\oint_\Gamma e^{\lambda T}F(k,\lambda)^{-1}\overline{V(k)}\,d\lambda$, and $F(-k,\lambda)=F(k,\lambda)$ with $V(-k)=\overline{V(k)}$ shows this equals $\hat\phi(-k,T)$. So $\phi_j$ is real.

Not zero. At $k=Q$, $F^{-1}=I/(\lambda h(\lambda))$ has the single simple pole $\lambda_g$ inside $\Gamma$, so $\hat\phi(Q,T)=e^{\lambda_gT}V(Q)/(\lambda_gh'(\lambda_g))\ne0$. A continuous function of $k$ that is nonzero at one point has nonzero Fourier coefficients. $\qquad\blacksquare$

## The preparation theorem

**Theorem (derived).** Let $g=16$, and let $a$, $\Gamma$, $\mathcal U$, $V$ and the seed $\phi$ be as above, so that $2.65\le a<3$. Fix a weight exponent $m\ge0$. There are $\varepsilon_0>0$ and $C>0$ such that for every $0<\varepsilon\le\varepsilon_0$ there is a history $u^\varepsilon$ on $T\le0$ with the following properties.

1. It satisfies the unchanged Master Equation with the stationary block prescription at every $T\le0$, for every site of $\mathbb Z^3$, with exactly one row from each distinct source and none from its own history.
2. $u^\varepsilon=\varepsilon\phi+v^\varepsilon$ with $\lVert v^\varepsilon\rVert_{2a}\le C\varepsilon^2$. In particular $u^\varepsilon$ is not identically zero, tends to the resting lattice as $T\to-\infty$ at the rate $e^{aT}$, and satisfies $\sup_jw_j\,(\lvert u_j\rvert+\lvert u_j'\rvert+\lvert u_j''\rvert)\le C\varepsilon e^{aT}$.
3. Speeds are at most $3/16$, transmitter factors at least $13/16$, distances between distinct sites at least $7/8$, and each delay differs from the anchor distance by at most $1/8$.
4. $v^\varepsilon$ is the only correction with $\lVert v\rVert_{2a}\le C\varepsilon^2$ for which $\varepsilon\phi+v$ solves the equation.

Moreover $\varepsilon_0$ may be chosen so that, for $0<\varepsilon\le\varepsilon_0$, the solution obtained with $m=0$ has finite norm for every weight exponent: its displacement, velocity and acceleration decay in space faster than any power, uniformly over the past after division by $e^{aT}$.

*Proof.* Work in $X_{2a}$ with the chosen weight. Since $2a\ge5.3$, Lemma 1 applies at $\nu=2a$ with $C_L\le0.0446$. Let $\Lambda=\lVert\phi\rVert_a$, finite by Lemma 3. For $v$ in $X_{2a}$, $\lVert v\rVert_a\le4\lVert v\rVert_{2a}$ on $T\le0$, because $e^{-aT}=e^{aT}e^{-2aT}\le e^{-2aT}$ and the derivative normalisations differ by factors $2$ and $4$. Define

$$
\Phi(v)=(I-\mathcal Jg\mathcal K)^{-1}\mathcal J\,\mathcal N[\varepsilon\phi+v]
$$

on the ball $\lVert v\rVert_{2a}\le\varrho$, with $\varrho=2C_LC_N\Lambda^2\varepsilon^2$. For $\varepsilon$ small, $\varepsilon\Lambda+4\varrho\le\rho_0$, so both parts of Lemma 2 apply to $\varepsilon\phi+v$, and $\mathcal N[\varepsilon\phi+v]$ is a continuous family with finite $\lVert\cdot\rVert_{0,2a}$. By Lemma 1 and Lemma 2(a), $\lVert\Phi(v)\rVert_{2a}\le C_LC_N(\varepsilon\Lambda+4\varrho)^2\le\varrho$ once $4\varrho\le(\sqrt2-1)\varepsilon\Lambda$, and by Lemma 2(b) $\lVert\Phi(v_1)-\Phi(v_2)\rVert_{2a}\le8C_LC_N'(\varepsilon\Lambda+4\varrho)\lVert v_1-v_2\rVert_{2a}$, which is a contraction for $\varepsilon$ small. The ball is complete, so $\Phi$ has exactly one fixed point $v^\varepsilon$ in it. By Lemma 1 the fixed point satisfies $v''=g\mathcal Kv+\mathcal N[\varepsilon\phi+v]$; adding $\varepsilon\phi''=g\mathcal K\varepsilon\phi$ gives $u''=g\mathcal Ku+\mathcal N[u]$ for $u=\varepsilon\phi+v$, which is the Master Equation in the form derived above. Item 3 is the root census for histories of unweighted norm at most $\rho_0$. Item 2 follows from $\varrho=O(\varepsilon^2)$ and Lemma 3, and $u\ne0$ because $\varepsilon\phi$ is nonzero and the correction is of higher order.

For the last statement, take the solution $u=\varepsilon\phi+v$ obtained with $m=0$ and let $A_0=\lVert u\rVert_a^{(0)}\le2\varepsilon\Lambda^{(0)}\le\rho_0$. Fix an exponent $m$ and a cutoff $L$. The truncated weight $w^L_j=\min\{w_j,L\}$ is bounded, at least $1$, and satisfies $w^L_i\le w^L_{i-d}\omega_d$, so Lemma 1 and Lemma 2(a) hold for it with the same constants. In the truncated norms $u$ and $v$ are finite, because the weight is bounded and the unweighted norms are finite; they are not known to be small, and Lemma 2(a) does not ask for that: it needs $A_0\le\rho_0$, which holds, and a finite weighted norm. The fixed-point equation $v=(I-\mathcal Jg\mathcal K)^{-1}\mathcal J\mathcal N[u]$ is an identity between functions and holds in every one of these norms. Lemma 1 and Lemma 2(a) therefore give

$$
\lVert v\rVert_{2a}^L\le C_LC_N\,A_0\,\lVert u\rVert_a^L\le C_LC_NA_0\,\bigl(\varepsilon\Lambda_m+4\lVert v\rVert_{2a}^L\bigr),
$$

where $\Lambda_m$ is the seed's norm with exponent $m$, which bounds its truncated norm. If $4C_LC_NA_0\le1/2$, which is a condition on $\varepsilon$ that does not involve $m$ or $L$, the last term can be absorbed because $\lVert v\rVert_{2a}^L$ is finite, and $\lVert v\rVert_{2a}^L\le2C_LC_NA_0\,\varepsilon\Lambda_m$ for every $L$. Letting $L\to\infty$ gives a finite norm with the full weight of exponent $m$. Lemma 2(b) is not used in this step. $\qquad\blacksquare$

**The map and the smallness domain, in one place.** The unknown is the correction $v$ to a given linear seed. The map is $\Phi$: evaluate the exact nonlinear remainder of all delayed rows on $\varepsilon\phi+v$, integrate twice from the infinite past, and apply the series inverse of the linear delayed operator at rate $2a$. The domain is the ball of radius $\varrho=O(\varepsilon^2)$ in the weighted norm at rate $2a$, inside the region where every displacement is at most $1/16$ and every speed at most $3/16$. Sources are sampled at times within $1/8$ of $T-r$. The row sum has three parts with three different tails, and they should not be confused. The delayed-source remainder of a source at distance $r$ is at most a multiple of $e^{-ar}\omega_d(r^{-4}+ar^{-3}+a^2r^{-2})$ with $a\ge2.65$ and $\omega_d\le e^{r/4}$, so the part of that remainder from sources beyond a distance $\varrho'$ is bounded by a multiple of $e^{-2.4\varrho'}$; the linear source terms $T_du_{i-d}+B_du_{i-d}'$ have the same exponential factor. The receiver term $E$ has no such factor: the available absolute estimate $\lvert f_d(\alpha)\rvert\le c\lvert\alpha\rvert^2/r^4$ bounds its part beyond $\varrho'$ only by a multiple of $\lvert\alpha\rvert^2/\varrho'$. The resting rows and the receiver-linear rows are not absolutely summable at all; they vanish as block sums, with the block tails of the stationary prescription. No sharper estimate of these two tails is needed for the theorem. The threshold $\varepsilon_0$ is determined by $C_L\le0.0446$, by $\Lambda$, and by $C_N$ and $C_N'$, which depend on the derivative constants of $\Psi$; these last are not evaluated, so $\varepsilon_0$ is not given as a number.

**Time translation.** If $u(T)$ is a solution on $T\le0$, so is $u(T-T_1)$ on $T\le T_1$. The family is therefore one of ancient solutions that can be placed so that a prescribed small size is reached at a prescribed time. The parameter $\varepsilon$ sets the size at $T=0$.

## The two controls

**The coherent branch.** The exact ancient staggered branch of the [manuscript](../manuscript.md#127-self-consistent-incoming-growth-and-its-stability-consequence) has $u_j=\sigma_jq(T)e_3$, which is the single wavevector $k=Q$. It is in $X_a$ only for the weight exponent $m=0$: every site moves by the same amount. It solves the same equation with the same root census, and its construction uses the same three steps, an integrated linear operator of small norm on faster-decaying corrections and a second-order remainder. It is a separate control at a single wavevector and is not a localized history. No limit relating it to the present family is claimed: shrinking the support of a fixed bump seed towards $Q$ makes the seed tend to zero, not to the coherent mode, and no normalised or nonlinear limit has been examined. The script confirms on that mode that the nonlinear remainder of the linear history is of third order in the amplitude at the receiver, the quadratic terms cancelling by symmetry (measured: residual divided by the cube of the amplitude equals $437$ for amplitudes from $10^{-2}$ to $10^{-5}$).

**The supplied two-target pulse.** The lane's two-target preparation changes two labels and prescribes their past; it is valid forward data but is not a solution throughout its supplied past. The present histories differ in both respects: every label moves, by an amount decaying rapidly with distance, and the equation holds at every past time with no onset and no prescribed segment. Neither control is used as a premise here.

## Reconstruction of the linear foothold: verdicts

| Statement of the general-wavevector note | Outcome here |
| --- | --- |
| Linear equation $u_i''=g\sum\sigma_d[T_du_{i-d}(T-r)+B_du_{i-d}'(T-r)]$; receiver-position term absent; no first-order emission-time term | Derived again from $\Psi$. Measured against the full nonlinear rows: for ten real modes at four wavevectors off $Q$ the acceleration residual of the linear history is of second order in the amplitude (residual over amplitude squared stable to within $1$ percent between amplitudes $10^{-3}$ and $10^{-4}$ in nine cases and within $15$ percent in the tenth), while a history with a wrong rate leaves a first-order residual |
| Mode matrix $F=\lambda^2I-gM$ and its analyticity; real symmetric for real $k,\lambda$ | Derived again; the largest imaginary part of $F$ at real arguments in the runs was $2\times10^{-14}$ |
| $M(Q,\lambda)=(\lambda/3)\Sigma(\lambda)I$ | Derived again; measured to $9\times10^{-14}$ for real and complex $\lambda$, with cube-truncation tail bounds from $10^{-10}$ down to $10^{-19}$ |
| Unique positive root $\lambda_g$ for every $g>0$; $2<\lambda_g<4$ at $g=16$; $\partial_\lambda F(Q,\lambda_g)=\lambda_gh'(\lambda_g)I>0$ | Derived again; $h(2)=-5.41$, $h(4)=+3.28$, $\lambda_g=2.7952306901$, $\lambda_gh'(\lambda_g)=11.964$, equal to the smallest eigenvalue of the numerical $\partial_\lambda F$ |
| Open band of three positive real roots near $Q$ | Derived again by the same monotonicity argument; measured along three directions for $\lvert k-Q\rvert$ up to $0.5$, with $\partial_\lambda F$ positive definite at the top root |
| Contour construction of localized linear histories; reality; equation at every time; rapid spatial decay; exponential past decay | Derived again as Lemma 3 |
| Positive semidefinite residues and growth for $T\ge0$ | Derived again: at a real root where $\partial_\lambda F$ is positive definite the pole of $F^{-1}$ is simple with residue $K(K^{\mathsf T}\partial_\lambda FK)^{-1}K^{\mathsf T}$. Measured at six wavevectors with $\lvert k-Q\rvert\le0.25$: the contour integral of $F^{-1}$ on the circle of radius $0.12$ about $\lambda_g$ equals the sum of these residues to $10^{-11}$, is real to $10^{-16}$, and has eigenvalues between $0.0835$ and $0.0859$, against $1/(\lambda_gh'(\lambda_g))=0.08359$ at $Q$. Not needed for the preparation theorem and not used in it |

Clarifications, none of which changes the earlier note's claims. (1) The weighted bounds of the seed are uniform over the past because the contour variable does not depend on $k$; this is the property that makes the seed usable in a nonlinear norm. (2) Non-vanishing of the seed follows at once from $V(Q)\ne0$ and the simple pole at $Q$, without the residue argument. (3) Reality needs the neighbourhood and the seed to be symmetric under $k\mapsto-k$, and uses $F(-k,\lambda)=F(k,\lambda)$ and $\overline{F(k,\lambda)}=F(k,\bar\lambda)$. (4) The vanishing of the receiver-position term under the block prescription, as distinct from shell grouping, needs the boundary-layer estimate given above. In addition, at $g=16$ two of the three branches through the staggered root increase as $k$ leaves $Q$ along a lattice axis (measured: $2.7967$ at $\lvert k-Q\rvert=0.2$, $2.8041$ at $0.5$, $2.8603$ at $1.5$), and the largest real root on the grid is $3.028$ at $(0,0,\pi)$. The earlier note does not claim the staggered rate is the largest, and says the whole spectrum was not computed; this measurement adds that it is not.

**Weak-coupling estimate.** The centred-cube argument was read step by step: the vanishing first-order term, the Hessian eigenvalues $f_s''$ and $f_s'/r$, the bound with $\lvert x\rvert\ge\lvert d\rvert/2$, the shell count and the three sums are correct as written, and the conclusion $\Sigma(s)=4\pi/s+E(s)$ with $E$ bounded on $0<s\le1$ follows. Measured with the shell census to radius $1000$: $E(1)=-6.532$, $E(0.5)=-7.614$, $E(0.2)=-8.366$, $E(0.1)=-8.635$, $E(0.05)=-8.773$, $E(0.03)=-8.829$, with tail bounds below $10^{-9}$. The ratio $s_g^2/g$ is $3.654$, $3.879$ and $4.005$ at $g=0.01$, $0.003$ and $0.001$, against $4\pi/3=4.189$, and $(s_g^2/g-4\pi/3)/\sqrt g$ is $-5.35$, $-5.65$ and $-5.83$, consistent with the stated relative error of order $\sqrt g$ and with the value $\tfrac13\sqrt{4\pi/3}\,E(0^+)$ that the proof predicts for the limit. No correction is proposed. The estimate plays no part in the $g=16$ theorem.

## What other couplings and other seeds would need

The proof used two facts at $g=16$: a band of real roots around the staggered rate $\lambda_g$, and $q^\omega(2a)<1$ for a rate $a$ slightly below it. The first holds at every coupling by the earlier note. For the second, let $\lambda_*(g)$ be the rate at which the unweighted factor $q$ equals $1$; $q$ is strictly decreasing in $\nu$, so $q(\nu)<1$ exactly for $\nu>\lambda_*$.

**Remark (derived, conditional on one inequality).** If $2\lambda_g>\lambda_*(g)$, the theorem holds at that coupling with the same proof, the weight being $w_j=(1+\theta\lvert j\rvert/m)^m$ with $\theta>0$ small enough that $q$ evaluated with $S_p(\nu-\theta)$ in place of $S_p(\nu)$ is still below $1$ at $\nu=2a$, and the contour radius small enough that $2a$ stays above that threshold. Nothing else in the argument refers to the value $16$; the bounds $1/16$, $3/16$ and $a\le3$ are replaced by any $\rho_0$ with $a\rho_0<1/4$.

**The inequality at sampled couplings (measured).**

| $g$ | 0.01 | 0.1 | 0.5 | 1 | 4 | 8 | 16 | 32 | 64 | 128 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $\lambda_g$ | 0.191 | 0.534 | 1.002 | 1.276 | 1.957 | 2.359 | 2.795 | 3.263 | 3.757 | 4.274 |
| $\lambda_*$ | 0.518 | 1.123 | 1.781 | 2.127 | 2.923 | 3.367 | 3.837 | 4.332 | 4.847 | 5.380 |
| $2\lambda_g/\lambda_*$ | 0.74 | 0.95 | 1.13 | 1.20 | 1.34 | 1.40 | 1.46 | 1.51 | 1.55 | 1.59 |

At the sampled couplings from $0.5$ to $128$ the inequality holds, with a margin that grows with the coupling; at $0.1$ and $0.01$ it fails. These are float values from the shell census, not certified bounds, and only $g=16$ has the hand bounds given above. A failure of the inequality is a failure of this sufficient condition and of the series inverse at the needed rate. It is not an obstruction to a localized preparation at small coupling. An inverse at rate $2a$ requires, at the least, that no root of the mode determinant has real part at or above $2a$; that is a necessary spectral condition and has not been shown to be sufficient, because the spatially weighted bounds of the inverse do not follow from the absence of roots alone. The float values at $g=16$, a threshold of $3.84$ against a largest real root of $3.03$ on the grid, show only that the series condition leaves room. Deciding small couplings would need an inverse built on the Fourier side together with its bounds in the weighted norms, and was not attempted.

**Other seeds.** A seed taken from the fastest part of the spectrum, near $(0,0,\pi)$ at $g=16$, would satisfy the condition with more room, but its band and contour were not constructed here.

## Instruments and what they can establish

All scripts were written in this session and run on the shared environment in double precision. They are retained with their outputs in the ignored scratch directory `.tmp/saturday-serial/i2/`. They are not repository instruments and have no independent review. Each runs its known cases first and stops if one fails.

- **`lattice_linear.py`** computes the shell census by convolution, the sums $S_p$ with an explicit tail bound, the mode matrix on a cube of half-width $14$ with a truncation bound, real roots by sign changes of the eigenvalues of the real symmetric $F$, and the factor $q$. Known cases, all passed before any target run: the separable sum $\sum e^{-s(\lvert d_1\rvert+\lvert d_2\rvert+\lvert d_3\rvert)}$ against its closed form (omitted part $4\times10^{-11}$ and $10^{-15}$); the census against direct enumeration for squared radius up to $400$ (no difference); the staggered identity; and the bracket $2<\lambda_g<4$. Float error and truncation tails are printed separately. It establishes float values of sums and roots at the sampled arguments; the grid scan of the spectrum is a scan, not a proof of a maximum.
- **`nonlinear_residual.py`** evaluates the full nonlinear acceleration of a receiver, with one root per source found by iteration on a cube of half-width $12$, on prescribed linear mode histories in which every site moves. Known cases, passed first: the resting field at a displaced receiver agrees between cubes of half-width $12$ and $24$ to $3\times10^{-10}$; a history with rate $1.05\lambda_g$ leaves a residual of first order ($1.644$ times the amplitude at two amplitudes). It establishes that the linear equation is the first-order part of the delayed rows for the tested modes, and the size of the second-order residual there. It does not test the theorem's fixed point.
- **`coupling_scan.py`** solves for $\lambda_g$ and $\lambda_*$ at fifteen couplings with the same shell sums, after the known cases of the first script.
- **`constants.py`** evaluates the hand bound for $S_p$ beside the shell sums and prints the numbers quoted for $q^\omega$ and $C_L$.
- **`inverse_check.py`** tests the inequality behind Lemma 1 on the Fourier side, without weights. Known case, passed first: at $k=Q$ the smallest singular value of $F$ equals $\lvert\lambda h(\lambda)\rvert$ to ten figures. On 304 wavevectors and seven points of each line $\operatorname{Re}\lambda=\nu$, for $\nu=3.9$, $4.5$, $5.3$ and $5.59$, the norm of $M$ never exceeded $0.42$ of the bound $2S_3+\lvert\lambda\rvert S_2$, and the smallest singular value of $F$ was never below $\lvert\lambda\rvert^2-g(2S_3+\lvert\lambda\rvert S_2)$. This is a sampled consistency check of the bound, not a proof of it.
- **`residue_check.py`** integrates $F^{-1}$ numerically round a circle and compares with the residue formula. Known case, passed first: at $k=Q$ the integral equals $I/(\lambda_gh'(\lambda_g))$ to $2\times10^{-16}$.

Regeneration is a matter of rerunning the six scripts, about one minute in total. Nothing heavy was produced, so nothing was placed under `.local-data/`.

## Limits

The theorem is carried through for $g=16$, unit spacing, the full alternating population, the stationary block prescription and seeds from the band around the staggered wavevector. It is a hand proof; the Codex review supports its steps by a separate derivation and certifies no number. The derivative constants of $\Psi$, and so $C_N$, $C_N'$ and the amplitude threshold, are not evaluated; the theorem asserts that a positive threshold exists. The neighbourhood $\mathcal U$ and the contour radius are obtained by continuity and are not quantified. The solutions are constructed on $T\le0$ while they are small; nothing is proved about their continuation. They are not compactly supported in space at any time, and whether a compactly supported self-consistent ancient disturbance can exist is not addressed. The history class is one in which the disturbance decays exponentially into the past; disturbances that decay more slowly, or that are assembled from modes with rates below half the threshold, are outside the method, and for those a failure of this method would not be an impossibility. The two facts taken from the lane's accepted results are the vanishing of the resting block sum at an anchor and the regular one-root geometry of small histories; the first was not rederived here.

## Falsifiers

- A history in the ball of norm $1/16$ at a rate $a\le3$ with two roots from one source, an own-history root, or a transmitter factor below $13/16$ refutes the root census.
- A history in that ball for which the absolutely convergent form of the equation differs from the block-grouped row sum refutes the reduction; in particular a nonzero block sum of $\sigma_dT_d$ at an anchor does.
- A family of histories with unweighted norm at most $1/16$ for which $\lVert\mathcal N[u]\rVert_{0,2a}/(\lVert u\rVert_a^{(0)}\lVert u\rVert_a)$ is unbounded, or a pair violating the Lipschitz bound on the weighted-small ball, refutes Lemma 2.
- A value $q^\omega(\nu)\ge1$ at some $\nu\ge5.3$ for $g=16$ and the stated weights, or a family $f$ for which the series of Lemma 1 fails to solve the linear equation, refutes the inverse.
- A seed constructed as above that fails the linear equation at some time, is not real, or has an unbounded weighted norm refutes Lemma 3.
- For the fixed point: a seed and an $\varepsilon$ within the stated smallness conditions for which the map $\Phi$ fails to send the ball $\lVert v\rVert_{2a}\le\varrho$ into itself, or fails the stated Lipschitz bound there, refutes the contraction; a constructed history $\varepsilon\phi+v^\varepsilon$ whose correction violates $\lVert v^\varepsilon\rVert_{2a}\le C\varepsilon^2$, or which fails the equation at some past time, refutes the theorem. A run started at a finite time from the linear seed alone is a different history and does not test these statements; it would need its own protocol for the error of its starting history and for convergence, and none is proposed here.
- For the measurements: a rerun of the retained scripts that does not reproduce the tabulated values withdraws them.

## Proposed tracker text (not applied)

The shared lattice trackers are in use by another session, so nothing was written to `work-queue.md`, `priorities.md` or `work-log.md`. The following is offered for whoever next holds the write turn.

- **Queue item "Specify a spatially localized self-consistent lattice preparation", status line:** ◐ Partial — a [nonlinear complete-past construction at $g=16$](saturday-localized-nonlinear-preparation-2026-10-10.md) (link to be made relative to the tracker when applied) was written on 2026-10-10 under the Saturday serial campaign, with an independent Codex review; other couplings, a numerical amplitude threshold and all later evolution remain open.
- **Queue item, result line:** At $g=16$ the localized linear seeds around the staggered wavevector extend to exact solutions of the unchanged Master Equation on the whole past, with every site dynamical, one root per distinct source, speeds at most $3/16$ and spatial decay faster than any power. The step that makes this possible is that the linear delayed operator, in the spatially weighted norms, is inverted by a convergent series on histories decaying at least as fast as $e^{5.3T}$ (hand bound: series factor at most $0.2003$), which is the rate at which products of seed factors decay. The staggered rate $2.795$ is not the largest real rate at $g=16$; the largest found on a grid is $3.028$ near $(0,0,\pi)$ (measured).
- **Work-log entry:** 2026-10-10, Saturday campaign stage 2: linear foothold reconstructed with no error found and four clarifications; weak-coupling remainder checked numerically; preparation theorem written as a hand proof and supported by a separate Codex derivation after five corrections of hypothesis and scope; session scripts retained in `.tmp/saturday-serial/i2/`; shared trackers not edited because of the concurrent boundary-reproduction task.
